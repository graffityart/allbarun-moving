"use client";

import { useState } from "react";

type Props={src:string;region:string;district:string};

export default function RegionHeroImage({src,region,district}:Props){
  const [videoFailed,setVideoFailed]=useState(false);
  const isGangnam=region==="서울"&&district==="강남구";
  const resolvedSrc=isGangnam?"/images/regions/gangnam-moving.webp":src;

  if(!resolvedSrc){
    return <div className="region-image-placeholder" role="img" aria-label={`${district} 대표 이미지 준비중`}><strong>{district} 대표 이미지 영역</strong><span>지역별 이미지를 등록하면 이 위치에 표시됩니다.</span></div>;
  }

  if(isGangnam){
    return <div className={`gangnam-video-hero${videoFailed?" video-failed":""}`} aria-label="서울 강남구 이사 3D 애니메이션">
      <img className="gangnam-video-fallback" src={resolvedSrc} alt="서울 강남구 올바른이사 3D 이사 서비스 일러스트" width="720" height="480" loading="eager" fetchPriority="high" decoding="async"/>
      {!videoFailed&&<video
        className="gangnam-hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={resolvedSrc}
        aria-label="강남구 이사업체 직원이 박스를 옮기고 트럭이 이동하는 3D 애니메이션"
        onError={()=>setVideoFailed(true)}
      >
        <source src="/videos/gangnam-moving.mp4" type="video/mp4"/>
      </video>}
    </div>;
  }

  return <img className="region-hero-image" src={resolvedSrc} alt={`${region} ${district} 이사 서비스 일러스트`} width="720" height="480" loading="eager" fetchPriority="high" decoding="async"/>;
}
