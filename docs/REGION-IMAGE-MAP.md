# 지역 대표 이미지 URL 관리 가이드

지역 페이지 상단 오른쪽의 대표 이미지는 `lib/region-assets.ts`에서 URL로 관리합니다.

## 기본 입력 형식
```ts
export const regionHeroImages: Record<string, string> = {
  "seoul/강남구": "https://example.com/images/seoul-gangnam.webp",
  "seoul/송파구": "https://example.com/images/seoul-songpa.webp",
  "gyeonggi/수원시": "https://example.com/images/gyeonggi-suwon.webp",
};
```

## 파일명 권장 규칙
- 서울 강남구: `seoul-gangnam-moving.webp`
- 경기 수원시: `gyeonggi-suwon-moving.webp`
- 부산 해운대구: `busan-haeundae-moving.webp`

## 이미지 선정 기준
페이지 내용과 이미지가 같은 지역 맥락을 보여주는 것이 좋습니다.

- 아파트 밀집지역: 공동주택 단지·이사차량 진입 환경
- 원도심: 골목·저층주거 환경
- 신도시: 고층 아파트·계획도로
- 산업도시: 산업단지 배후 주거지와 도로
- 해안/관광지역: 해안 고층주거 또는 관광교통이 드러나는 장면
- 읍면지역: 단독주택·외곽 도로 접근성

이미지에 과도한 텍스트를 넣기보다 실제 지역 분위기가 느껴지는 사진이나 자연스러운 일러스트가 적합합니다.

## 권장 크기
- 1200×800px 전후
- WebP
- 3:2 또는 4:3에 가까운 가로형
- 가능하면 300KB 이하로 최적화

## 중복 최소화
같은 이미지를 수십 개 지역 페이지에서 반복하기보다 핵심 지역부터 개별 이미지를 넣고, 중요도가 낮은 지역은 이미지가 준비될 때까지 현재 플레이스홀더를 유지하는 편이 낫습니다.
