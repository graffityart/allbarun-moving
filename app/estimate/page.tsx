import type { Metadata } from "next";
import EstimateForm from "@/components/EstimateForm";

export const metadata: Metadata = {
  title: "이사 비교견적 신청 | 올바른이사",
  description: "포장이사·원룸이사·일반이사·사무실이사의 지역, 일정, 작업 조건을 입력하고 비교견적을 준비하세요.",
};

export default function EstimatePage() {
  return (
    <>
      <header className="site-header">
        <div className="wrap header-inner">
          <a href="/" className="brand">올바른이사</a>
          <nav className="nav"><a href="/">홈</a><a href="/#calendar">손없는날·날씨</a><a href="/#region">지역별 이사</a></nav>
        </div>
      </header>
      <main>
        <section className="sub-hero">
          <div className="wrap narrow">
            <span className="eyebrow">무료 비교견적</span>
            <h1>이사 조건을 입력하면<br/>비교하기 쉬워집니다.</h1>
            <p>금액만 묻기보다 이사 유형, 지역, 날짜와 작업 조건을 같이 전달하면 업체별 견적 차이를 더 정확하게 비교할 수 있습니다.</p>
          </div>
        </section>
        <section className="section">
          <div className="wrap narrow">
            <EstimateForm />
            <div className="notice-box">
              <strong>견적 신청 전 확인하세요</strong>
              <p>현장 짐 양, 주차거리, 사다리차 사용, 엘리베이터 예약, 대형가전·가구 분해조립 여부에 따라 최종 비용은 달라질 수 있습니다. 계약 전에는 포함 항목과 추가금 기준을 서면으로 확인하는 것이 좋습니다.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer"><div className="wrap"><strong>올바른이사</strong><p>전국 지역별 이사업체와 이사 준비 정보를 비교하기 위한 정보·견적 플랫폼입니다.</p></div></footer>
    </>
  );
}
