"use client";

import { useState } from "react";

type Props={src:string;videoSrc?:string;region:string;district:string};

export default function RegionHeroImage({src,videoSrc="",region,district}:Props){
  const [videoFailed,setVideoFailed]=useState(false);

  if(videoSrc&&!videoFailed){
    return <div className="gangnam-video-hero" aria-label={`${region} ${district} 이사 현장 안내`}>
      {src?<img className="gangnam-video-fallback" src={src} alt={`${region} ${district} 이사 지역 대표 이미지`} width="720" height="480" loading="eager" fetchPriority="high" decoding="async"/>:null}
      <video className="gangnam-hero-video" autoPlay muted loop playsInline preload="metadata" poster={src||undefined} aria-label={`${region} ${district} 이사 지역 안내 영상`} onError={()=>setVideoFailed(true)}>
        <source src={videoSrc} type="video/mp4"/>
      </video>
    </div>;
  }

  if(src)return <img className="region-hero-image" src={src} alt={`${region} ${district} 이사 지역 대표 이미지`} width="720" height="480" loading="eager" fetchPriority="high" decoding="async"/>;

  return <div className="region-media-placeholder" role="img" aria-label={`${region} ${district} 지역 이사 정보`}>
    <span>{region} 지역 이사</span><strong>{district}</strong><p>생활권 · 차량 접근 · 건물 조건</p>
  </div>;
}
