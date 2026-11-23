"use client";

import { useId, useState } from "react";

export default function SeriesViewer({ images, eager }) {
  const name = useId();
  const [index, setIndex] = useState(0);
  const { label, ...photo } = images[index];
  return <div className="series-viewer">
    <a className="still-link" href={photo.src} target="_blank" rel="noopener noreferrer"
      aria-label={label + "，" + photo.alt + "，查看大图（新窗口）"}>
      <img key={photo.src} {...photo} sizes="(max-width: 660px) 94vw, (max-width: 1376px) 65vw, 860px"
        loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : undefined} />
    </a>
    <fieldset className="series-choices">
      <legend className="sr-only">同一提示词的三张生成图，选择模型</legend>
      {images.map((option, i) => <label key={option.src}>
        <input type="radio" name={name} checked={i === index} onChange={() => setIndex(i)} />
        <span>{option.label}</span>
      </label>)}
    </fieldset>
  </div>;
}
