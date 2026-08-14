type Props={src:string;region:string;district:string};

export default function RegionHeroImage({src,region,district}:Props){
  const isGangnam=region==="서울"&&district==="강남구";
  const resolvedSrc=isGangnam?"/images/regions/gangnam-moving.webp":src;

  if(!resolvedSrc){
    return <div className="region-image-placeholder" role="img" aria-label={`${district} 대표 이미지 준비중`}><strong>{district} 대표 이미지 영역</strong><span>지역별 이미지를 등록하면 이 위치에 표시됩니다.</span></div>;
  }

  if(isGangnam){
    return <div className="gangnam-animated-hero" role="img" aria-label="서울 강남구 올바른이사 박스 적재와 트럭 출발 애니메이션">
      <img className="gangnam-scene-base" src={resolvedSrc} alt="서울 강남구 올바른이사 3D 이사 서비스 일러스트" width="720" height="480" loading="eager" fetchPriority="high" decoding="async"/>
      <span className="gangnam-box gangnam-box-one" aria-hidden="true"/>
      <span className="gangnam-box gangnam-box-two" aria-hidden="true"/>
      <span className="gangnam-load-glow" aria-hidden="true"/>
      <span className="gangnam-truck-mask" aria-hidden="true"/>
      <span className="gangnam-truck-layer" aria-hidden="true"/>
      <span className="gangnam-motion-line line-one" aria-hidden="true"/>
      <span className="gangnam-motion-line line-two" aria-hidden="true"/>
    </div>;
  }

  return <img className="region-hero-image" src={resolvedSrc} alt={`${region} ${district} 이사 서비스 일러스트`} width="720" height="480" loading="eager" fetchPriority="high" decoding="async"/>;
}
