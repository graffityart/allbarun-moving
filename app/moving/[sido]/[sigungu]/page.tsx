import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MovingCalendar from "@/components/MovingCalendar";
import { getDistrictRegion, regionProfiles } from "@/lib/regions";
import { getDistrictGuide } from "@/lib/district-content";
import { getRegionHeroImage } from "@/lib/region-assets";

type Props = { params: Promise<{ sido: string; sigungu: string }> };

export async function generateStaticParams() {
  return regionProfiles.flatMap((region) =>
    region.districts.map((district) => ({ sido: region.slug, sigungu: district }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { sido, sigungu } = await params;
  const data = getDistrictRegion(sido, sigungu);
  if (!data) return {};
  const { region, district } = data;
  return {
    title: `${district} 이사업체 비교견적 | 손없는날·날씨·이사 준비 | 올바른이사`,
    description: `${region.name} ${district} 이사 준비 시 확인할 주거환경, 차량 접근, 손없는날, 지역 날씨, 전입신고, 등기부 확인, 전기·도시가스 이전과 포장이사 비교견적 정보를 확인하세요.`,
  };
}

export default async function DistrictPage({ params }: Props) {
  const { sido, sigungu } = await params;
  const data = getDistrictRegion(sido, sigungu);
  if (!data) notFound();
  const { region, district } = data;
  const local = getDistrictGuide(region.name, district);
  const heroImage = getRegionHeroImage(sido, district);

  return (
    <div className="region-page">
      <header className="site-header">
        <div className="wrap header-inner">
          <a href="/" className="brand">올바른이사</a>
          <nav className="nav">
            <a href="/estimate">비교견적</a>
            <a href="#local-calendar">손없는날·날씨</a>
            <a href="/#region">지역별 이사</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="sub-hero region-hero">
          <div className="wrap region-hero-grid">
            <div className="region-hero-copy">
              <div className="breadcrumb"><a href="/">홈</a><span>›</span><span>{region.name}</span><span>›</span><strong>{district}</strong></div>
              <span className="eyebrow">{region.name} 지역별 이사</span>
              <h1>{district} 이사업체,<br/>가격보다 조건부터 비교하세요.</h1>
              <p>{local.localIntro}</p>
              <div className="hero-actions">
                <a className="primary-link" href={`/estimate?region=${encodeURIComponent(region.name)}&district=${encodeURIComponent(district)}`}>{district} 무료 비교견적</a>
                <a className="secondary-link" href="#local-calendar">{district} 손없는날·날씨</a>
              </div>
            </div>

            <div className="region-hero-media" aria-label={`${district} 지역 대표 이미지`}>
              {heroImage ? (
                <img src={heroImage} alt={`${region.name} ${district} 이사 지역 이미지`} />
              ) : (
                <div className="region-image-placeholder">
                  <strong>{district} 대표 이미지 영역</strong>
                  <span>lib/region-assets.ts에 이미지 URL을 입력하세요.</span>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="section white">
          <div className="wrap">
            <span className="eyebrow">지역 현장 정보</span>
            <h2 className="section-title">{district} 이사에서 먼저 볼 조건</h2>
            <p className="section-desc">{region.summary}</p>
            <div className="tips-grid region-tips">
              <div className="card"><strong>주거 형태</strong><p>{region.housing}</p></div>
              <div className="card"><strong>차량 접근</strong><p>{region.access}</p></div>
              <div className="card"><strong>이동 시간</strong><p>{region.traffic}</p></div>
            </div>
            <div className="local-note">
              <strong>{district} 현장 체크</strong>
              <ul className="check-list">{local.localChecklist.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className="section region-calendar-section" id="local-calendar">
          <div className="wrap">
            <div className="region-calendar-heading">
              <div>
                <span className="eyebrow">이사 날짜 선택</span>
                <h2 className="section-title">{district} 손없는날과 지역 날씨를 같이 확인하세요</h2>
                <p className="section-desc">손없는날뿐 아니라 {district}의 예상 강수확률과 기온을 함께 보면 이사차량 진입, 포장재 준비, 작업시간을 정하는 데 더 도움이 됩니다.</p>
              </div>
            </div>
            <MovingCalendar regionName={region.name} districtName={district} lockRegion />
            <div className="region-source-note"><strong>안내:</strong> 손없는날은 전통적인 음력 기준 참고 정보이며, 날씨는 단기 예보입니다. 실제 이사 전에는 최신 예보와 현장 상황을 다시 확인하세요.</div>
          </div>
        </section>

        <section className="section white">
          <div className="wrap two-col-info">
            <div>
              <span className="eyebrow">견적 비교 포인트</span>
              <h2 className="section-title">{district} 포장이사 견적에서 확인할 항목</h2>
              <p>{local.movingNote}</p>
              <ul className="check-list">
                <li>작업 인원과 차량 톤수</li>
                <li>사다리차 또는 엘리베이터 비용</li>
                <li>주차 위치에서 현관까지 운반거리</li>
                <li>에어컨·TV·대형가구 분해조립</li>
                <li>당일 발생 가능한 추가금 기준</li>
              </ul>
            </div>
            <div className="highlight-card"><strong>{district} 이사 팁</strong><p>{region.tip}</p><a href="/estimate">조건 입력하고 비교견적 받기 →</a></div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <span className="eyebrow">이사 후 행정</span>
            <h2 className="section-title">{district} 전입신고는 어떻게 하나요?</h2>
            <p className="section-desc">온라인은 정부24, 방문은 새 주소지 관할 주민센터에서 진행할 수 있습니다. 전세·월세라면 확정일자와 보증금 보호 요건도 함께 확인하세요.</p>
            <div className="guide-grid">
              <article className="guide-card"><span className="guide-step">01</span><strong>정부24 또는 주민센터</strong><p>본인은 정부24에서 온라인 신청이 가능하며 방문 신청은 {district} 내 새 주소지 관할 주민센터에서 할 수 있습니다.</p></article>
              <article className="guide-card"><span className="guide-step">02</span><strong>전입 후 14일 이내</strong><p>전입한 날부터 14일 이내 신고하는 것이 원칙입니다. 방문 전 신분증과 세대 관계에 따른 필요서류를 확인하세요.</p></article>
              <article className="guide-card"><span className="guide-step">03</span><strong>임차인은 권리관계도 확인</strong><p>전입신고와 별개로 확정일자, 선순위 담보권, 실제 계약 대상 주소가 일치하는지 함께 확인하는 것이 좋습니다.</p></article>
            </div>
            <div className="official-links"><a href="https://www.gov.kr/mw/AA020InfoCappView.do?CappBizCD=13100000016" target="_blank" rel="noreferrer">정부24 전입신고 안내 ↗</a></div>
          </div>
        </section>

        <section className="section white">
          <div className="wrap">
            <span className="eyebrow">전세 계약 안전 확인</span>
            <h2 className="section-title">확정일자·전세권 설정은 무엇이 다른가요?</h2>
            <div className="compare-grid">
              <div className="card"><strong>전입신고 + 확정일자</strong><p>주택 임차인이 보증금 보호를 준비할 때 일반적으로 함께 확인하는 절차입니다. 실제 점유와 권리순위 등 여러 조건을 함께 봐야 합니다.</p></div>
              <div className="card"><strong>전세권 설정등기</strong><p>등기부에 전세권을 직접 설정하는 절차입니다. 계약당사자 협조와 등기 절차가 필요하므로 비용과 필요서류를 사전에 확인하세요.</p></div>
            </div>
            <div className="warning-box">보증금 규모, 선순위 담보권, 임대인의 권리관계에 따라 판단이 달라질 수 있으므로 중요한 계약은 공인중개사·법무사·변호사 등 전문가에게 확인하는 것이 안전합니다.</div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <span className="eyebrow">등기부 확인</span>
            <h2 className="section-title">등기사항증명서는 이 세 가지부터 보세요</h2>
            <div className="guide-grid">
              <article className="guide-card"><span className="guide-step">갑구</span><strong>소유자가 누구인지</strong><p>계약하려는 임대인과 등기부상 소유자가 같은지, 압류·가압류 같은 표시가 있는지 확인합니다.</p></article>
              <article className="guide-card"><span className="guide-step">을구</span><strong>근저당권 등 담보권</strong><p>은행 근저당권과 전세권 등 소유권 외 권리를 확인하고 채권최고액과 선순위 권리를 함께 봅니다.</p></article>
              <article className="guide-card"><span className="guide-step">주소</span><strong>계약할 집과 같은 물건인지</strong><p>동·호수와 집합건물 여부를 확인해 실제 계약 대상과 발급한 등기사항증명서가 일치하는지 확인합니다.</p></article>
            </div>
            <div className="official-links"><a href="https://www.iros.go.kr" target="_blank" rel="noreferrer">대한민국 법원 인터넷등기소 ↗</a></div>
          </div>
        </section>

        <section className="section white utility-section">
          <div className="wrap">
            <span className="eyebrow">이삿날 생활요금</span>
            <h2 className="section-title">전기·도시가스 이전도 미리 준비하세요</h2>
            <p className="section-desc">기존 주소 요금 정산과 새 주소 사용 신청·명의변경을 이사 전에 확인하면 당일 불편을 줄일 수 있습니다.</p>
            <div className="utility-grid">
              <article className="utility-card"><div className="utility-number">123</div><strong>한국전력 고객센터</strong><p>주택용 전기 이사정산과 전기 관련 상담은 국번 없이 123에서 확인할 수 있습니다. 공동주택은 관리사무소 정산방식을 먼저 확인하세요.</p><a href="https://home.kepco.co.kr" target="_blank" rel="noreferrer">한전 확인하기 ↗</a></article>
              <article className="utility-card"><div className="utility-number small-number">주소별 확인</div><strong>{district} 도시가스 전출·전입</strong><p>도시가스는 같은 {region.name} 안에서도 공급회사가 달라질 수 있습니다. 주소 기준 관할 고객센터를 확인해 전출 정산, 철거·연결, 명의변경을 예약하세요.</p><a href="https://www.citygas.or.kr/company/find/index.jsp" target="_blank" rel="noreferrer">도시가스 고객센터 찾기 ↗</a></article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <h2 className="section-title">{district} 이사 종류별 비교</h2>
            <div className="service-grid">
              <div className="card"><strong>{district} 포장이사</strong><p>포장·운반·정리 범위와 작업 인원, 추가 서비스 포함 여부를 중심으로 비교합니다.</p></div>
              <div className="card"><strong>{district} 원룸이사</strong><p>짐 양과 차량 크기, 엘리베이터 유무, 기사 도움 범위를 중심으로 비교합니다.</p></div>
              <div className="card"><strong>{district} 일반이사</strong><p>직접 포장 후 운송 중심으로 진행할 때 차량·운반 인력 비용을 비교합니다.</p></div>
              <div className="card"><strong>{district} 사무실이사</strong><p>{local.officeNote}</p></div>
            </div>
          </div>
        </section>

        <section className="section white">
          <div className="wrap"><div className="cta"><div><h2>{district} 이사를 준비하고 계신가요?</h2><p>날짜와 작업조건을 함께 입력해 업체별 견적을 비교해보세요.</p></div><a href="/estimate">무료 비교견적 시작</a></div></div>
        </section>
      </main>

      <footer className="footer"><div className="wrap"><strong>올바른이사</strong><p>{region.name} {district} 지역의 이사 준비 정보와 비교견적을 제공하는 안내 페이지입니다.</p><p>행정·등기·생활요금·날씨 정보는 변경될 수 있으므로 실제 신청과 이사 전에 최신 정보를 다시 확인하세요.</p></div></footer>
    </div>
  );
}
