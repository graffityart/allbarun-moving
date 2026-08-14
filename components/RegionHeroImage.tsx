type Props={src:string;region:string;district:string};
export default function RegionHeroImage({src,region,district}:Props){
  const isGangnam=region==="서울"&&district==="강남구";
  const resolvedSrc=isGangnam?"/images/regions/gangnam-moving.webp?v=20260814":src;
  if(!resolvedSrc)return <div className="region-image-placeholder" role="img" aria-label={`${district} 대표 이미지 준비중`}><strong>{district} 대표 이미지 영역</strong><span>지역별 이미지를 등록하면 이 위치에 표시됩니다.</span></div>;
  return <img className="region-hero-image" src={resolvedSrc} alt={isGangnam?"서울 강남구 올바른이사 3D 이사 서비스 일러스트":`${region} ${district} 이사 서비스 일러스트`} width="720" height="480" loading="eager" fetchPriority="high" decoding="async"/>;
}
