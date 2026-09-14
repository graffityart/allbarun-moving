"use client";

import { useState } from "react";

type Props={src:string;videoSrc?:string;region:string;district:string};

const SHARED_FALLBACK="/images/regions/gangnam-moving.webp";

export default function RegionHeroImage({src,videoSrc="",region,district}:Props){
  const [videoFailed,setVideoFailed]=useState(false);
  const imageSrc=src||SHARED_FALLBACK;

  if(videoSrc&&!videoFailed){
    return <div className="gangnam-video-hero" aria-label={`${region} ${district} 이사 애니메이션`}>
      <img className="gangnam-video-fallback" src={imageSrc} alt={`${region} ${district} 이사 서비스 대표 이미지`} width="720" height="480" loading="eager" fetchPriority="high" decoding="async"/>
      <video
        className="gangnam-hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={imageSrc}
        aria-label={`${district} 이사 서비스 3D 애니메이션`}
        onError={()=>setVideoFailed(true)}
      >
        <source src={videoSrc} type="video/mp4"/>
      </video>
    </div>;
  }

  return <img className="region-hero-image" src={imageSrc} alt={`${region} ${district} 이사 서비스 대표 이미지`} width="720" height="480" loading="eager" fetchPriority="high" decoding="async"/>;
}
