"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./artwork-layers.css";

export default function ArtworkLayers({ artwork }) {
  const stageId = useId();
  const stack = useRef(null);
  const [status, setStatus] = useState("loading");
  const [hiddenParts, setHiddenParts] = useState([]);

  useEffect(() => {
    let active = true;
    Promise.all(Array.from(stack.current.querySelectorAll("img"), image => image.decode()))
      .then(() => { if (active) setStatus("ready"); })
      .catch(() => { if (active) setStatus("unavailable"); });
    return () => { active = false; };
  }, [artwork]);

  const changed = hiddenParts.length > 0;
  function toggle(id) {
    setHiddenParts(current => current.includes(id) ? current.filter(part => part !== id) : [...current, id]);
  }

  return <div className="artwork-layers">
    <div className="artwork-stage" id={stageId} style={{ aspectRatio: artwork.width + " / " + artwork.height }}>
      <img src={artwork.poster} alt={artwork.alt} width={artwork.width} height={artwork.height} loading="lazy" />
      <div className="artwork-stack" ref={stack} aria-hidden="true" hidden={!changed}>
        {artwork.layers.map(layer => <img key={layer.src} src={layer.src} alt="" width={artwork.width} height={artwork.height}
          hidden={hiddenParts.includes(layer.part)} />)}
      </div>
    </div>
    {status === "unavailable"
      ? <p className="artwork-unavailable" role="status">暂时无法拆分。下方原作仍可打开。</p>
      : <div className="artwork-controls" role="group" aria-label="显示或隐藏画中的部件">
        {artwork.parts.map(part => {
          const shown = !hiddenParts.includes(part.id);
          const Icon = shown ? Eye : EyeOff;
          return <button key={part.id} type="button" aria-pressed={shown} aria-controls={stageId}
            disabled={status !== "ready"} onClick={() => toggle(part.id)}>
            <Icon size={16} aria-hidden="true" />{part.label}
          </button>;
        })}
        <button type="button" className="artwork-reset" disabled={!changed} onClick={() => setHiddenParts([])}>复原</button>
      </div>}
  </div>;
}
