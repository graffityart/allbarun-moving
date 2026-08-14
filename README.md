# 올바른이사

전국 지역별 이사 정보, 손없는날·날씨, 이사 준비 가이드와 외부 비교견적 연결을 제공하는 Next.js 기반 플랫폼입니다.

## 개발

```bash
pnpm install
pnpm dev
```

사이트 구조와 SEO 기본 설정 점검:

```bash
pnpm check:site
```

프로덕션 빌드 확인:

```bash
pnpm build
```

## 배포

GitHub 저장소를 Vercel에 연결하여 자동 배포합니다.

운영 도메인:

```text
https://olbarun.kr
```

필요한 경우 Vercel 환경변수에 다음 값을 등록합니다.

```env
NEXT_PUBLIC_SITE_URL=https://olbarun.kr
```

코드에서도 환경변수가 없는 경우 `https://olbarun.kr`을 기본 canonical 도메인으로 사용합니다.

## 비교견적 연결

현재 자체 견적폼은 임시 비활성화되어 있으며, 견적 관련 CTA는 `lib/external-links.ts`의 `ESTIMATE_INQUIRY_URL`로 통합 관리합니다.

## 지역 콘텐츠

지역 상세 URL은 다음 계층을 사용합니다.

```text
/moving
/moving/{sido}
/moving/{sido}/{sigungu}
```

지역별 조사 콘텐츠는 기존 시·도별 데이터와 `regional-overrides*.ts` 파일을 통해 확장합니다. 지역을 추가한 뒤 `pnpm check:site`로 연결 상태와 SEO 기본 설정을 점검합니다.
