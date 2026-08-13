// 지역 페이지 상단 대표 이미지 URL 관리
// 실제 이미지가 준비되면 아래 객체에 "sido/district": "https://..." 형식으로 추가하세요.
// 예: "seoul/강남구": "https://example.com/gangnam-moving.webp"
export const regionHeroImages: Record<string, string> = {
  // "seoul/강남구": "",
};

export function getRegionHeroImage(sido: string, district: string) {
  return regionHeroImages[`${sido}/${district}`] || "";
}
