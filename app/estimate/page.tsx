import type { Metadata } from "next";
import { Suspense } from "react";
import EstimateForm from "@/components/EstimateForm";
import "./estimate.css";

export const metadata: Metadata = {
  title: "이사 비교견적 신청 | 올바른이사",
  description: "포장이사·원룸이사·일반이사·사무실이사의 출발지역, 도착지역, 날짜와 작업조건을 단계별로 입력하고 비교견적을 준비하세요.",
};

function EstimateFormFallback() {
  return (
    <div className="estimate-flow">
      <div className="estimate-step-card">
        <div className="step-heading">
          <span className="form-step">01</span>
          <div>
            <h2>비교견적 화면을 준비하고 있습니다.</h2>
            <p>지역과 이사 조건 입력 화면을 불러오는 중입니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

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
            <h1>한 번에 길게 쓰지 말고,<br/>5단계로 간단하게 입력하세요.</h1>
            <p>이사 종류 → 출발·도착지역 → 날짜 → 현장조건 → 연락처 순서로 필요한 정보만 받습니다. 지역 페이지에서 들어오면 출발지역은 자동으로 이어집니다.</p>
          </div>
        </section>
        <section className="section">
          <div className="wrap narrow">
            <Suspense fallback={<EstimateFormFallback />}>
              <EstimateForm />
            </Suspense>
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
