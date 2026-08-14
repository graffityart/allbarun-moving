# 올바른이사 Supabase 운영 연결

## 필요한 Vercel 환경변수

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

두 값은 서버 전용입니다. `NEXT_PUBLIC_` 접두사를 붙이지 않습니다.

## DB 생성 순서

1. Supabase 프로젝트를 생성합니다.
2. SQL Editor에서 `supabase/schema.sql` 전체를 실행합니다.
3. Table Editor에서 `moving_estimates` 테이블이 생성됐는지 확인합니다.
4. Vercel 프로젝트 Settings → Environment Variables에 위 두 값을 등록합니다.
5. Production / Preview 중 필요한 환경을 선택해 저장합니다.
6. 재배포 후 `/estimate`에서 테스트 접수를 1건 진행합니다.
7. Supabase `moving_estimates`에 접수번호와 상태 `new`가 저장되는지 확인합니다.

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
- 실제 운영 전 개인정보처리방침의 수집 목적, 보관기간, 제3자 제공 여부를 운영 구조에 맞게 최종 확정합니다.

## 다음 단계

관리자 인증을 연결한 뒤 서버 전용 API를 통해 접수 목록 조회, 상태 변경, 관리자 메모 기능을 활성화합니다.
