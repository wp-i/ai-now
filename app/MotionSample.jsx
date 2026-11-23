"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";

export default function MotionSample({ item }) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  return <div className="motion-sample">
    <img src={playing ? item.motion : item.poster} alt={item.alt} loading="lazy" referrerPolicy="no-referrer" onError={() => {
      if (playing) { setPlaying(false); setFailed(true); }
    }} />
    <button type="button" aria-pressed={playing} onClick={() => { setFailed(false); setPlaying(!playing); }}>
      {playing ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
      {playing ? "停止动图" : "播放动图"}
    </button>
    {failed && <p role="status">动图暂时无法加载，可从原始示例查看。</p>}
  </div>;
}
