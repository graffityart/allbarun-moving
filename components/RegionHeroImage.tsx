"use client";

import { useState } from "react";

type Props={src:string;videoSrc?:string;region:string;district:string};

export default function RegionHeroImage({src,videoSrc="",region,district}:Props){
  const [videoFailed,setVideoFailed]=useState(false);

  if(videoSrc&&!videoFailed){
    return <div className="gangnam-video-hero" aria-label={`${region} ${district} 이사 애니메이션`}>
      {src&&<img className="gangnam-video-fallback" src={src} alt={`${region} ${district} 이사 서비스 대표 이미지`} width="720" height="480" loading="eager" fetchPriority="high" decoding="async"/>}
      <video
        className="gangnam-hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={src||undefined}
        aria-label={`${district} 이사 서비스 3D 애니메이션`}
        onError={()=>setVideoFailed(true)}
      >
        <source src={videoSrc} type="video/mp4"/>
      </video>
    </div>;
  }

  if(src){
    return <img className="region-hero-image" src={src} alt={`${region} ${district} 이사 서비스 일러스트`} width="720" height="480" loading="eager" fetchPriority="high" decoding="async"/>;
  }

  return <div className="region-image-placeholder" role="img" aria-label={`${district} 대표 이미지 준비중`}><strong>{district} 대표 이미지 영역</strong><span>지역별 이미지를 등록하면 이 위치에 표시됩니다.</span></div>;
}
