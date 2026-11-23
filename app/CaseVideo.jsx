"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { pauseOtherMedia } from "./media-playback";
import "./case-video.css";

const LOAD_TIMEOUT_MS = 15_000;

function formatDuration(duration) {
  if (typeof duration === "string") return duration;
  if (!Number.isFinite(duration) || duration <= 0) return "";
  const seconds = Math.round(duration);
  return Math.floor(seconds / 60) + ":" + String(seconds % 60).padStart(2, "0");
}

function Player({ media }) {
  const { src, poster, sourceUrl, label, duration, startAt, endAt, previewSeconds,
    previewStart = 0, muted = false, eager = false, aspect = "16 / 9" } = media;
  const previewEnd = previewSeconds ? previewStart + previewSeconds : Infinity;
  const previewFragment = "#t=" + previewStart + "," + previewEnd;
  const previewSource = media.previewSource ?? src;
  const teaser = media.teaser ?? (previewSeconds ? previewSource + previewFragment : undefined);
  const needsSeekablePreview = !media.teaser && previewStart > 0 && previewSource.startsWith("/") && !previewSource.startsWith("//");
  const [state, setState] = useState("idle");
  const [previewVisible, setPreviewVisible] = useState(false);
  const videoRef = useRef(null);
  const teaserRef = useRef(null);
  const triggerRef = useRef(null);
  const timeoutRef = useRef(null);
  const attemptRef = useRef(0);
  const focusRetry = useRef(false);

  useEffect(() => {
    const video = teaserRef.current;
    if (!video || !teaser || !window.IntersectionObserver) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    let unavailable = false;
    let finished = false;
    let pendingPreview;
    let previewObjectUrl;

    function finishPreview() {
      if (finished) return;
      finished = true;
      video.pause();
      setPreviewVisible(false);
    }

    function limitPreview() {
      if (video.currentTime >= previewEnd ||
        (video.paused && video.currentTime >= previewEnd - .1)) finishPreview();
    }

    function updatePreview() {
      if (!inView || document.hidden || reducedMotion.matches || navigator.connection?.saveData) {
        video.pause();
        setPreviewVisible(false);
        return;
      }
      if (unavailable || finished || video.ended || !video.paused) return;
      if (!video.hasAttribute("src")) {
        if (needsSeekablePreview && !previewObjectUrl) {
          loadSeekablePreview();
          return;
        }
        video.src = previewObjectUrl ? previewObjectUrl + previewFragment : teaser;
      }
      video.play().catch(error => {
        if (error.name !== "AbortError") unavailable = true;
      });
    }

    // The public asset host may serve a whole file even for a range request.
    // A local Blob keeps the original bytes and makes its time offset seekable.
    function loadSeekablePreview() {
      if (pendingPreview) return;
      pendingPreview = new AbortController();
      const { signal } = pendingPreview;
      fetch(previewSource, { signal }).then(response => {
        if (!response.ok) throw new Error("Unable to load video preview");
        return response.blob();
      }).then(blob => {
        if (signal.aborted) return;
        previewObjectUrl = URL.createObjectURL(blob);
        updatePreview();
      }).catch(() => {
        unavailable = true;
      });
    }

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.intersectionRatio >= .5;
      updatePreview();
    }, { threshold: .5 });
    observer.observe(video);
    video.addEventListener("timeupdate", limitPreview);
    video.addEventListener("pause", limitPreview);
    video.addEventListener("ended", finishPreview);
    document.addEventListener("visibilitychange", updatePreview);
    reducedMotion.addEventListener("change", updatePreview);
    return () => {
      observer.disconnect();
      video.removeEventListener("timeupdate", limitPreview);
      video.removeEventListener("pause", limitPreview);
      video.removeEventListener("ended", finishPreview);
      document.removeEventListener("visibilitychange", updatePreview);
      reducedMotion.removeEventListener("change", updatePreview);
      video.pause();
      pendingPreview?.abort();
      if (previewObjectUrl) URL.revokeObjectURL(previewObjectUrl);
    };
  }, [teaser, needsSeekablePreview, previewFragment, previewEnd, previewSource, state]);

  useEffect(() => () => {
    attemptRef.current++;
    clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    if (state === "failed" && focusRetry.current) {
      focusRetry.current = false;
      triggerRef.current?.focus({ preventScroll: true });
    }
  }, [state]);

  function finish(next) {
    clearTimeout(timeoutRef.current);
    setState(current => current === "loading" || (next === "playing" && current === "ready") ? next : current);
  }

  function fail(attempt) {
    if (attempt !== attemptRef.current) return;
    attemptRef.current++;
    clearTimeout(timeoutRef.current);
    const video = videoRef.current;
    focusRetry.current = video === document.activeElement;
    video.removeAttribute("src");
    video.load();
    setPreviewVisible(false);
    setState("failed");
  }

  function play() {
    const video = videoRef.current;
    const attempt = ++attemptRef.current;
    teaserRef.current?.pause();
    setState("loading");
    const url = new URL(src, window.location.href);
    if (Number.isFinite(startAt) && startAt > 0) {
      url.hash = "t=" + startAt + (Number.isFinite(endAt) && endAt > startAt ? "," + endAt : "");
    }
    video.src = url.href;
    video.focus({ preventScroll: true });
    timeoutRef.current = setTimeout(() => fail(attempt), LOAD_TIMEOUT_MS);

    // Call play during the original gesture so browsers can allow audible media.
    video.play().then(() => {
      if (attempt === attemptRef.current) finish("playing");
    }).catch(error => {
      if (attempt !== attemptRef.current) return;
      if (error.name === "NotAllowedError") finish("ready");
      else fail(attempt);
    });
  }

  const cover = state === "idle" || state === "failed";
  const durationLabel = formatDuration(duration);
  return (
    <div className="case-video" data-state={state}>
      <div className="case-video-frame" style={{ aspectRatio: aspect }}>
        <video
          ref={videoRef}
          aria-label={label}
          aria-hidden={cover}
          tabIndex={cover ? -1 : 0}
          controls={!cover}
          muted={muted}
          playsInline
          preload="none"
          onPlaying={event => { pauseOtherMedia(event.currentTarget); finish("playing"); }}
          onError={() => {
            if (videoRef.current.hasAttribute("src")) fail(attemptRef.current);
          }}
        />
        {cover && (
          <button
            type="button"
            className="case-video-trigger"
            data-preview={previewVisible}
            ref={triggerRef}
            aria-label={(state === "failed" ? "重试播放 " : "播放 ") + label + (durationLabel ? "，时长 " + durationLabel : "")}
            onClick={play}
          >
            {poster && <img src={poster} alt="" loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : undefined} />}
            {teaser && state === "idle" && <video ref={teaserRef} className="case-video-teaser"
              muted playsInline tabIndex={-1} aria-hidden="true" preload="none"
              onPlaying={() => setPreviewVisible(true)} onError={() => setPreviewVisible(false)} />}
            <span className="case-video-play" aria-hidden="true"><Play size={22} fill="currentColor" strokeWidth={1.25} /></span>
            {durationLabel && <span className="case-video-duration" aria-hidden="true">
              {previewVisible && <Play size={12} fill="currentColor" />} {durationLabel}
            </span>}
          </button>
        )}
        {state === "loading" && <span className="case-video-pending" aria-hidden="true">正在加载</span>}
      </div>
      <p className={state === "failed" || state === "ready" ? "case-video-notice" : "case-video-sr"} role="status">
        {state === "loading" && "正在加载视频。"}
        {state === "playing" && "视频已开始播放。"}
        {state === "ready" && "视频已加载，请使用播放器的播放按钮。"}
        {state === "failed" && "暂时无法播放，可以重试或查看原始作品。"}
      </p>
      {state === "failed" && <a className="case-video-source" href={sourceUrl} target="_blank" rel="noreferrer">
        查看原始作品 <ArrowUpRight size={15} aria-hidden="true" />
      </a>}
    </div>
  );
}

export default function CaseVideo({ media }) {
  return <Player key={media.src} media={media} />;
}
