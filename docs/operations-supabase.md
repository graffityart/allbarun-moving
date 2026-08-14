# 올바른이사 Supabase 운영 연결

현재 올바른이사 공개 사이트의 비교견적 CTA는 `lib/external-links.ts`의 외부 견적 페이지로 연결됩니다. 자체 견적폼과 Supabase 접수 기능은 보존만 하고 기본 비활성 상태입니다.

## 현재 운영 상태

- 공개 견적 CTA: 외부 비교견적 페이지 사용
- `/estimate`: 외부 페이지로 redirect
- `/api/estimate`: `ENABLE_INTERNAL_ESTIMATE=true`가 없는 한 접수 거부
- Supabase: 향후 자체 접수를 다시 사용할 때만 연결
- 관리자 접수 화면: 인증 전 개인정보 목록 비공개

## 기본 Vercel 환경변수

운영 도메인:

```env
NEXT_PUBLIC_SITE_URL=https://olbarun.kr
```

자체 견적 기능을 사용하지 않는 현재 상태에서는 `ENABLE_INTERNAL_ESTIMATE`를 등록하지 않거나 `false`로 유지합니다.

## 자체 견적 기능을 다시 활성화할 때

다음 서버 전용 환경변수가 필요합니다.

```env
ENABLE_INTERNAL_ESTIMATE=true
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

`SUPABASE_SERVICE_ROLE_KEY`에는 절대 `NEXT_PUBLIC_` 접두사를 붙이지 않습니다.

## DB 생성 순서

1. Supabase 프로젝트를 생성합니다.
2. SQL Editor에서 `supabase/schema.sql` 전체를 실행합니다.
3. Table Editor에서 `moving_estimates` 테이블이 생성됐는지 확인합니다.
4. Vercel 프로젝트 Settings → Environment Variables에 서버 환경변수를 등록합니다.
5. 자체 견적 UI를 다시 활성화하기 전에 개인정보처리방침과 실제 동의 문구를 운영구조에 맞게 확정합니다.
6. `ENABLE_INTERNAL_ESTIMATE=true`를 설정한 뒤 별도 테스트 환경에서 API 저장을 확인합니다.
7. 관리자 인증까지 완료된 뒤 실서비스 자체 접수를 활성화합니다.

## 상태값

- `new`: 신규 접수
- `contacting`: 상담 진행중
- `quoted`: 견적 안내 완료
- `completed`: 처리 완료
- `cancelled`: 취소

## 개인정보 보호 원칙

- 브라우저에서 Supabase 테이블을 직접 조회하지 않습니다.
- `SUPABASE_SERVICE_ROLE_KEY`는 서버 API에서만 사용합니다.
- 관리자 인증이 완료되기 전에는 고객 이름·전화번호 목록을 공개 페이지에 출력하지 않습니다.
- 실제 자체 접수 운영 전 수집 목적, 보관기간, 제3자 제공 여부, 문의창구를 최종 확정합니다.

## 현재 권장 운영

외부 비교견적 연결 방식을 유지하는 동안에는 Supabase 관련 환경변수를 굳이 등록하지 않아도 됩니다. 사이트 콘텐츠·지역 페이지·SEO 기능은 Supabase 없이 정상 동작해야 합니다.
