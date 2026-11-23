"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import "./image-comparison.css";

function splitLabel(position, before, after) {
  if (position === 0) return "只显示" + after;
  if (position === 100) return "只显示" + before;
  return `左侧 ${position}% 为${before}，右侧 ${100 - position}% 为${after}`;
}

export default function ImageComparison({ media, eager = false }) {
  const { width = 628, height = 1000, references = true, beforeLabel = "编辑前", afterLabel = "编辑后" } = media;
  const sizes = "(max-width: 660px) 94vw, (max-width: 1376px) 48vw, 640px";
  const instructions = useId();
  const beforeImage = useRef(null);
  const afterImage = useRef(null);
  const range = useRef(null);
  const gesture = useRef(null);
  const [position, setPosition] = useState(50);
  const [failed, setFailed] = useState({});
  const unavailable = failed.before || failed.after;

  function markFailed(side) {
    setFailed(current => current[side] ? current : { ...current, [side]: true });
  }

  useEffect(() => {
    // A server-rendered image may already have failed before React attaches its error handler.
    if (beforeImage.current?.complete && !beforeImage.current.naturalWidth) markFailed("before");
    if (afterImage.current?.complete && !afterImage.current.naturalWidth) markFailed("after");
  }, [media.before, media.after]);

  function setFromPointer(event) {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    setPosition(Math.round(Math.max(0, Math.min(1, (event.clientX - left) / width)) * 100));
  }

  function start(event) {
    if (!event.isPrimary || event.button !== 0) return;
    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, dragging: event.pointerType === "mouse" };
    event.currentTarget.setPointerCapture(event.pointerId);
    if (gesture.current.dragging) {
      event.preventDefault();
      range.current.focus({ preventScroll: true });
      setFromPointer(event);
    }
  }

  function move(event) {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    if (!current.dragging) {
      const x = Math.abs(event.clientX - current.x);
      const y = Math.abs(event.clientY - current.y);
      if (y >= 8 && y > x) {
        gesture.current = null;
        return;
      }
      if (x < 8 || x <= y) return;
      current.dragging = true;
    }
    setFromPointer(event);
  }

  function end(event) {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    gesture.current = null;
    if (current.dragging || Math.hypot(event.clientX - current.x, event.clientY - current.y) < 8) setFromPointer(event);
  }

  return <div className={"image-comparison" + (references ? "" : " image-comparison-wide")}>
    {!unavailable && <div className="comparison-stage" style={{ "--split": position + "%", aspectRatio: width + " / " + height }}
      onPointerDown={start} onPointerMove={move} onPointerUp={end}
      onPointerCancel={() => { gesture.current = null; }} onLostPointerCapture={() => { gesture.current = null; }}>
      <img ref={beforeImage} src={media.before} srcSet={media.beforeSrcSet} sizes={media.beforeSrcSet ? sizes : undefined} width={width} height={height} alt={references ? "" : media.beforeAlt} fetchPriority={eager ? "high" : undefined} draggable={false} onError={() => markFailed("before")} />
      <img ref={afterImage} className="comparison-after" src={media.after} srcSet={media.afterSrcSet} sizes={media.afterSrcSet ? sizes : undefined} width={width} height={height} alt={references ? "" : media.afterAlt} fetchPriority={eager ? "high" : undefined} draggable={false} onError={() => markFailed("after")} />
      {media.beforeLabel && position >= 25 && <span className="comparison-side comparison-left" aria-hidden="true">{beforeLabel}</span>}
      {media.afterLabel && position <= 75 && <span className="comparison-side comparison-right" aria-hidden="true">{afterLabel}</span>}
      {position > 0 && position < 100 && <div className="comparison-seam" aria-hidden="true" />}
      <div className="comparison-handle" aria-hidden="true"><ChevronsLeftRight size={22} strokeWidth={2} /></div>
      <input className="comparison-range" ref={range} type="range" min="0" max="100" value={position}
        aria-label="编辑前后对比" aria-describedby={instructions} aria-valuetext={splitLabel(position, beforeLabel, afterLabel)}
        onChange={event => setPosition(event.currentTarget.valueAsNumber)} />
    </div>}
    {(references || unavailable) && <div className="comparison-reference" style={{ "--reference-aspect": width + " / " + height }}>
      {!failed.before && <figure><img src={media.before} width={width} height={height} alt={media.beforeAlt} onError={() => markFailed("before")} /><figcaption>{beforeLabel}</figcaption></figure>}
      {!failed.after && <figure><img src={media.after} width={width} height={height} alt={media.afterAlt} onError={() => markFailed("after")} /><figcaption>{afterLabel}</figcaption></figure>}
    </div>}
    <p id={instructions} className={unavailable ? "comparison-instructions" : "sr-only"} role={unavailable ? "status" : undefined}>
      {unavailable ? "对比图暂时无法完整显示，可打开下方来源查看原始样张。" : "用左右方向键移动分隔线。"}
    </p>
  </div>;
}
