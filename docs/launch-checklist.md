# 올바른이사 출시 체크리스트

## 코드에서 완료된 항목

- 운영 도메인 기본값 `https://olbarun.kr`
- 메인 / 서비스 / 지역 / 가이드 / 개인정보 / 약관 구조
- 전국 → 시·도 → 시·군·구 지역 계층
- 지역별 canonical / sitemap / robots
- 지역 Breadcrumb 구조화 데이터
- 지역별 손없는날 달력
- 지역 날씨 8일 예보 및 API 실패 fallback
- 모바일 주요 메뉴 접근 가능
- 외부 비교견적 URL 통합 관리
- `/estimate` 외부 비교견적 redirect
- 자체 견적 API 기본 비활성화
- 관리자/API 검색엔진 차단
- 개인정보처리방침·이용약관을 외부 견적 구조에 맞게 정리
- 기본 보안 응답 헤더
- 지역 조사 데이터 + 시·군·구별 스마트 fallback
- 사이트 구조 점검 명령 `pnpm check:site`

## 도메인 연결 시 확인

1. Vercel 프로젝트의 Domains에 `olbarun.kr`을 추가합니다.
2. Vercel이 표시하는 DNS 레코드를 도메인 관리업체에 등록합니다.
3. `www.olbarun.kr`도 사용할 경우 Vercel에 함께 추가하고 대표 도메인으로 redirect 정책을 정합니다.
4. DNS 연결 완료 후 `https://olbarun.kr`에서 SSL이 정상 적용되는지 확인합니다.
5. `/robots.txt`와 `/sitemap.xml`이 `https://olbarun.kr` 기준으로 출력되는지 확인합니다.

## Vercel 환경변수

권장:

```env
NEXT_PUBLIC_SITE_URL=https://olbarun.kr
ENABLE_INTERNAL_ESTIMATE=false
```

현재 외부 견적 연결을 사용하는 동안 Supabase 관련 값은 필요하지 않습니다.

## 공개 운영 전에 운영자가 확정할 항목

- 실제 운영 사업자 정보 표시 여부
- 공식 문의 연락처 또는 이메일
- 개인정보 관련 문의창구
- 외부 비교견적 페이지의 개인정보 수집·제3자 제공 고지 확인
- 외부 견적 링크 최종 테스트

## 검색엔진 등록

도메인 연결 후 다음을 진행합니다.

- Google Search Console 도메인 또는 URL-prefix 등록
- `https://olbarun.kr/sitemap.xml` 제출
- 네이버 서치어드바이저 사이트 소유확인
- 네이버에 sitemap / robots 상태 확인
- 메인, 서비스 허브, 지역 허브, 주요 지역 페이지의 색인 요청

## 최종 화면 확인

모바일:

- 375px
- 390px
- 430px

태블릿/PC:

- 768px
- 1024px
- 1440px

확인 항목:

- 가로 스크롤 없음
- 헤더 메뉴 모두 접근 가능
- 외부 비교견적 버튼 정상 이동
- 지역 대표 이미지 미등록 상태에서도 레이아웃 유지
- 날씨 API 실패 시 오류 대신 안내 문구 표시
- 지역 상세에서 인근지역/가이드/서비스 내부링크 정상
- 404 페이지 정상

## 지역 대표 이미지

현재 지역 대표 이미지는 `lib/region-assets.ts`에서 URL을 등록하는 방식입니다. 이미지가 없으면 placeholder가 표시됩니다. 운영 이미지를 추가할 때는 WebP/AVIF와 일정한 화면 비율을 권장합니다.
