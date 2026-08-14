import { redirect } from "next/navigation";
import { ESTIMATE_INQUIRY_URL } from "@/lib/external-links";

/*
 * 기존 내부 비교견적 페이지는 임시 비활성화합니다.
 * 아래 기능과 소스는 삭제하지 않고 그대로 보존합니다.
 * - components/EstimateForm.tsx
 * - app/api/estimate/route.ts
 * - supabase/schema.sql
 * - 관리자 접수/상태관리 준비 코드
 *
 * 향후 자체 비교견적 기능을 다시 사용할 때 이 페이지에
 * SiteHeader + Suspense + EstimateForm + SiteFooter 구성을 복원하면 됩니다.
 */
export default function EstimatePage(){
  redirect(ESTIMATE_INQUIRY_URL);
}
