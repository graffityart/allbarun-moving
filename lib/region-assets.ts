// 지역 페이지 상단 대표 이미지 URL 관리
// 지역별 전용 이미지가 준비되면 아래 객체에 추가합니다.
export const regionHeroImages: Record<string, string> = {
  "seoul/강남구": "/images/regions/gangnam-moving.webp",
};

export function getRegionHeroImage(sido: string, district: string) {
  return regionHeroImages[`${sido}/${district}`] || "";
}
