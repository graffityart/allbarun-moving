type Props={src:string;region:string;district:string};
export default function RegionHeroImage({src,region,district}:Props){
  // 강남구 대표 이미지는 로컬 public 자산을 직접 사용해 매핑/인코딩 차이에도 항상 노출합니다.
  const resolvedSrc=region==="서울"&&district==="강남구"?"/images/regions/gangnam-moving.webp":src;
  if(!resolvedSrc)return <div className="region-image-placeholder" role="img" aria-label={`${district} 대표 이미지 준비중`}><strong>{district} 대표 이미지 영역</strong><span>지역별 이미지를 등록하면 이 위치에 표시됩니다.</span></div>;
  return <img className="region-hero-image" src={resolvedSrc} alt={`${region} ${district} 이사 서비스 일러스트`} width="720" height="480" loading="eager" fetchPriority="high" decoding="async"/>;
}
