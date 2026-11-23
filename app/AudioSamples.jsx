"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { pauseOtherMedia, registerPendingMediaLoad } from "./media-playback";

function timeLabel(seconds) {
  const wholeSeconds = Math.floor(seconds);
  return Math.floor(wholeSeconds / 60) + ":" + String(wholeSeconds % 60).padStart(2, "0");
}

function WaveformTrack({ track }) {
  const audio = useRef(null);
  const localUrl = useRef(null);
  const loadRequest = useRef(null);
  const seekPosition = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(track.duration);
  const progress = time / duration;

  useEffect(() => () => {
    loadRequest.current?.abort();
    if (localUrl.current) URL.revokeObjectURL(localUrl.current);
  }, []);

  async function toggle() {
    const player = audio.current;
    if (!player.paused) {
      player.pause();
      return;
    }
    if (loading) return;
    pauseOtherMedia(player);
    setFailed(false);
    try {
      if (track.loadForSeeking && !localUrl.current) {
        const controller = new AbortController();
        loadRequest.current = controller;
        registerPendingMediaLoad(player, controller);
        setLoading(true);
        try {
          const response = await fetch(track.src, { signal: controller.signal });
          if (!response.ok) throw new Error("Audio unavailable");
          const data = await response.blob();
          controller.signal.throwIfAborted();
          localUrl.current = URL.createObjectURL(data);
          player.src = localUrl.current;
          player.currentTime = seekPosition.current;
        } finally {
          loadRequest.current = null;
          if (audio.current) setLoading(false);
        }
      } else if (failed) player.load();
      await player.play();
    } catch (error) {
      if (error.name !== "AbortError") setFailed(true);
    }
  }

  function seek(event) {
    const next = Number(event.currentTarget.value);
    seekPosition.current = next;
    if (!track.loadForSeeking || localUrl.current) audio.current.currentTime = next;
    setTime(next);
  }

  return <div className="waveform-track">
    <audio ref={audio} aria-label={track.label} src={track.loadForSeeking ? undefined : track.src} preload="none"
      onLoadedMetadata={event => {
        if (Number.isFinite(event.currentTarget.duration)) setDuration(event.currentTarget.duration);
      }}
      onPlay={event => {
        pauseOtherMedia(event.currentTarget);
        setPlaying(true);
      }}
      onPause={() => setPlaying(false)}
      onEnded={() => setPlaying(false)}
      onError={() => { setFailed(true); setPlaying(false); }}
      onTimeUpdate={event => setTime(event.currentTarget.currentTime)} />
    <span className="track-label">{track.label}</span>
    <button type="button" disabled={loading} aria-busy={loading} aria-label={(playing ? "暂停 " : "播放 ") + track.label} onClick={toggle}>
      {playing ? <Pause size={17} fill="currentColor" aria-hidden="true" /> : <Play size={17} fill="currentColor" aria-hidden="true" />}
    </button>
    <div className="track-timeline">
      <div className="track-waveform" aria-hidden="true">
        {track.peaks.map((peak, index) => <span key={index} style={{height: peak + "%"}}
          data-played={index / track.peaks.length < progress} />)}
      </div>
      <input className="track-seek" type="range" min={0} max={duration} step={0.1}
        aria-label={track.label + "的播放进度"} aria-valuetext={timeLabel(time) + " / " + timeLabel(duration)}
        value={Math.min(time, duration)} onChange={seek} />
    </div>
    <span className="track-time" aria-hidden="true">{timeLabel(time)} / {timeLabel(duration)}</span>
    {loading && <p className="track-error" role="status">正在加载音轨。</p>}
    {failed && <p className="track-error" role="status">暂时无法播放，可以重试。</p>}
  </div>;
}

export default function AudioSamples({ audio, tracks, text }) {
  return <div className="audio-output">
    {text && <p lang="en">{text}</p>}
    {(tracks ?? [audio]).map(track => track.peaks ? <WaveformTrack key={track.src} track={track} /> : <div key={track.src}>
      {tracks && <span className="track-label">{track.label}</span>}
      <audio aria-label={track.label} src={track.src} controls preload="metadata" onPlay={event => pauseOtherMedia(event.currentTarget)} />
    </div>)}
  </div>;
}
