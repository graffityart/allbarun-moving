import { ESTIMATE_INQUIRY_URL } from "@/lib/external-links";

export default function SiteFooter(){
  return (
    <footer className="footer site-footer">
      <div className="wrap footer-grid footer-grid-modern">
        <div className="footer-company">
          <div className="footer-brand-row">
            <span className="footer-brand-icon" aria-hidden="true">⌂🚚</span>
            <strong className="footer-brand-name">올바른<span>이사</span></strong>
          </div>
          <p className="footer-tagline">이사 준비, 더 쉽게! 올바른 선택으로 편안한 이사를 경험하세요.</p>
          <div className="footer-company-info">
            <strong>비교 분석 전문 플랫폼 올바른(이사스토리(주))</strong>
            <p>대표 : 정일권 <span className="footer-separator">|</span> 사업자등록번호 : 237-86-01565</p>
            <p>주소 : 인천광역시 남동구 호구포로 194 3층 332호</p>
          </div>
        </div>

        <div className="footer-links footer-link-column">
          <strong>이사 비교</strong>
          <a href={ESTIMATE_INQUIRY_URL}>무료 비교견적</a>
          <a href="/service">이사 종류 전체</a>
          <a href="/service/packing-moving">포장이사</a>
          <a href="/service/studio-moving">원룸이사</a>
          <a href="/service/general-moving">일반이사</a>
          <a href="/service/office-moving">사무실이사</a>
        </div>

        <div className="footer-links footer-link-column">
          <strong>이사 정보</strong>
          <a href="/moving">전국 지역별 이사</a>
          <a href="/guide">이사 준비 가이드</a>
          <a href="/guide/moving-checklist">이사 체크리스트</a>
          <a href="/guide/utilities">전기·도시가스 이전</a>
          <a href="/privacy">개인정보처리방침</a>
          <a href="/terms">이용약관</a>
        </div>
      </div>
      <div className="wrap footer-bottom footer-bottom-modern">© {new Date().getFullYear()} 올바른이사 (이사스토리(주)). All rights reserved.</div>
    </footer>
  );
}
