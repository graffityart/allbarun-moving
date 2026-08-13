import MovingCalendar from "@/components/MovingCalendar";

const services = [
  ["📦", "포장이사", "포장부터 운반·정리까지 한 번에 비교"],
  ["🏠", "원룸이사", "소형 이사에 맞는 비용과 차량 조건 비교"],
  ["🚚", "일반이사", "직접 포장하고 운송 중심으로 간단하게"],
  ["🏢", "사무실이사", "업무 공백을 줄이는 일정·장비 중심 비교"],
];

const regions = ["서울", "경기", "인천", "부산", "대구", "대전", "광주", "울산", "세종", "제주"];

export default function Home() {
  return (
    <>
      <header className="site-header">
        <div className="wrap header-inner">
          <a href="/" className="brand">올바른이사</a>
          <nav className="nav" aria-label="주요 메뉴">
            <a href="#service">이사 종류</a>
            <a href="#calendar">손없는날·날씨</a>
            <a href="#region">지역별 이사</a>
            <a href="#estimate">비교견적</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <span className="eyebrow">전국 이사업체 비교</span>
              <h1>내 지역 이사업체,<br />조건부터 비교하고 선택하세요.</h1>
              <p>포장이사·원룸이사·일반이사·사무실이사를 지역과 일정에 맞춰 비교하고, 이사 날짜를 정할 때 필요한 손없는날과 날씨까지 한곳에서 확인하세요.</p>
            </div>
            <div className="estimate-box" id="estimate">
              <h2>무료 비교견적 시작하기</h2>
              <div className="field-grid">
                <select className="field" defaultValue="">
                  <option value="" disabled>출발 지역</option>
                  {regions.map((r) => <option key={r}>{r}</option>)}
                </select>
                <select className="field" defaultValue="">
                  <option value="" disabled>이사 종류</option>
                  <option>포장이사</option><option>원룸이사</option><option>일반이사</option><option>사무실이사</option>
                </select>
              </div>
              <button className="primary-btn">무료 비교견적 받기</button>
              <p className="small" style={{ margin: "10px 2px 0" }}>현재는 1차 화면이며 다음 단계에서 실제 견적 신청 폼과 연결됩니다.</p>
            </div>
          </div>
        </section>

        <section className="section white" id="service">
          <div className="wrap">
            <h2 className="section-title">어떤 이사를 준비하시나요?</h2>
            <p className="section-desc">이사 형태가 달라지면 필요한 인원·차량·포장 범위도 달라집니다. 먼저 이사 유형을 선택하면 비교가 쉬워집니다.</p>
            <div className="service-grid">
              {services.map(([icon, title, desc]) => <div className="card" key={title}><div className="service-icon">{icon}</div><strong>{title}</strong><p>{desc}</p></div>)}
            </div>
          </div>
        </section>

        <section className="section" id="calendar">
          <div className="wrap">
            <h2 className="section-title">이사 날짜, 손없는날과 날씨를 같이 보세요</h2>
            <p className="section-desc">손없는날만 보고 날짜를 결정하기보다 예상 강수확률과 기온을 함께 보면 실제 이사 준비에 더 도움이 됩니다.</p>
            <MovingCalendar />
          </div>
        </section>

        <section className="section white">
          <div className="wrap">
            <h2 className="section-title">이사 전에 많이 확인하는 것</h2>
            <p className="section-desc">견적 금액만 비교하면 놓치기 쉬운 항목을 먼저 확인해 두세요.</p>
            <div className="tips-grid">
              <div className="card"><strong>견적에 무엇이 포함됐나요?</strong><p>인건비, 차량, 포장재, 사다리차, 엘리베이터 사용료와 추가 작업 비용이 별도인지 확인합니다.</p></div>
              <div className="card"><strong>이사 당일 추가금은 언제 생기나요?</strong><p>짐 양 증가, 작업층 변경, 주차 거리, 대형 가전·가구 분해조립 같은 조건이 달라지면 추가 비용이 생길 수 있습니다.</p></div>
              <div className="card"><strong>어떤 날짜가 더 저렴한가요?</strong><p>주말·월말·손없는날처럼 수요가 몰리는 날은 예약이 빨리 차고 비용 차이가 생길 수 있어 여러 날짜를 함께 비교하는 것이 좋습니다.</p></div>
            </div>
          </div>
        </section>

        <section className="section" id="region">
          <div className="wrap">
            <h2 className="section-title">지역별 이사업체 찾기</h2>
            <p className="section-desc">지역마다 주거 형태, 도로, 주차와 사다리차 작업 조건이 다릅니다. 이후 시·군·구별 특징을 반영한 전용 페이지로 확장합니다.</p>
            <div className="region-grid">{regions.map((r) => <a className="region-btn" href="#estimate" key={r}>{r} 이사</a>)}</div>
          </div>
        </section>

        <section className="section white">
          <div className="wrap">
            <h2 className="section-title">비교견적은 이렇게 진행됩니다</h2>
            <div className="steps-grid">
              <div className="card"><strong>01. 이사 조건 입력</strong><p>출발지·도착지, 날짜, 이사 종류와 필요한 작업을 입력합니다.</p></div>
              <div className="card"><strong>02. 조건에 맞는 업체 비교</strong><p>가능 지역과 서비스 조건이 맞는 업체를 확인합니다.</p></div>
              <div className="card"><strong>03. 견적 확인 후 선택</strong><p>비용뿐 아니라 포함 항목과 작업 조건까지 비교해 결정합니다.</p></div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="cta">
              <div><h2>이사 날짜가 정해졌다면?</h2><p>지역과 이사 종류를 입력하고 여러 업체의 조건을 비교해보세요.</p></div>
              <a href="#estimate">무료 비교견적 시작</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap"><strong>올바른이사</strong><p>전국 지역별 이사업체와 이사 준비 정보를 비교하기 위한 정보·견적 플랫폼입니다.</p><p>※ 업체별 실제 견적과 서비스 조건은 신청 시점과 현장 조건에 따라 달라질 수 있습니다.</p></div>
      </footer>
    </>
  );
}
