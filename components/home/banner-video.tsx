"use client";

import { useState } from "react";

const clips = [
  "https://videos.pexels.com/video-files/7475333/7475333-hd_1920_1080_25fps.mp4",
  "https://videos.pexels.com/video-files/31972591/13623727_1920_1080_30fps.mp4",
];

export function BannerVideo() {
  const [clipIndex, setClipIndex] = useState(0);

  return (
    <video
      key={clips[clipIndex]}
      className="absolute inset-0 size-full object-cover motion-reduce:hidden"
      src={clips[clipIndex]}
      autoPlay
      muted
      loop={false}
      playsInline
      preload="metadata"
      poster="/images/banner-01.jpg"
      aria-hidden="true"
      onEnded={() => setClipIndex((index) => (index + 1) % clips.length)}
      onError={() => setClipIndex((index) => (index + 1) % clips.length)}
    />
  );
}
