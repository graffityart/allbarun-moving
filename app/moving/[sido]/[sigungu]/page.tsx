import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MovingCalendar from "@/components/MovingCalendar";
import { getDistrictRegion, regionProfiles } from "@/lib/regions";
import { getDistrictGuide } from "@/lib/district-content";
import { getGyeonggiGuide } from "@/lib/gyeonggi-content";
import { getIncheonGuide } from "@/lib/incheon-content";
import { getBusanGuide } from "@/lib/busan-content";
import { getDaeguGuide } from "@/lib/daegu-content";
import { getDaejeonGuide } from "@/lib/daejeon-content";
import { getGwangjuGuide } from "@/lib/gwangju-content";
import { getUlsanGuide } from "@/lib/ulsan-content";
import { getRegionHeroImage } from "@/lib/region-assets";
import { getRegionFaq } from "@/lib/region-faq";

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
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com").replace(/\/$/, "");
  const canonical = `${base}/moving/${encodeURIComponent(sido)}/${encodeURIComponent(district)}`;

  return {
    title: `${district} 이사업체 비교견적 | 손없는날·날씨·이사 준비 | 올바른이사`,
    description: `${region.name} ${district}의 생활권별 이사 특징, 차량 접근, 손없는날, 지역 날씨, 전입신고, 등기부 확인, 전기·도시가스 이전과 포장이사 비교 정보를 확인하세요.`,
    alternates: { canonical },
  };
}

export default async function DistrictPage({ params }: Props) {
  const { sido, sigungu } = await params;
  const data = getDistrictRegion(sido, sigungu);
  if (!data) notFound();

  const { region, district } = data;
  const specialGuide =
    region.name === "경기" ? getGyeonggiGuide(district) :
    region.name === "인천" ? getIncheonGuide(district) :
    region.name === "부산" ? getBusanGuide(district) :
    region.name === "대구" ? getDaeguGuide(district) :
    region.name === "대전" ? getDaejeonGuide(district) :
    region.name === "광주" ? getGwangjuGuide(district) :
    region.name === "울산" ? getUlsanGuide(district) :
    undefined;
  const local = specialGuide ?? getDistrictGuide(region.name, district);
  const heroImage = getRegionHeroImage(sido, district);
  const faqs = getRegionFaq(region.name, district);
  const factors = Array.from(
    new Set((local.neighborhoods ?? []).flatMap((item) => item.tags ?? []))
  ).slice(0, 8);

  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com").replace(/\/$/, "");
  const pageUrl = `${base}/moving/${encodeURIComponent(sido)}/${encodeURIComponent(district)}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: base },
      { "@type": "ListItem", position: 2, name: `${region.name} 이사`, item: `${base}/#region` },
      { "@type": "ListItem", position: 3, name: `${district} 이사`, item: pageUrl },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <div className="region-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

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
              <div className="breadcrumb">
                <a href="/">홈</a><span>›</span><span>{region.name}</span><span>›</span><strong>{district}</strong>
              </div>
              <span className="eyebrow">{region.name} 지역별 이사</span>
              <h1>{district} 이사업체,<br />가격보다 조건부터 비교하세요.</h1>
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
              <ul className="check-list">
                {local.localChecklist.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        {local.neighborhoods && local.neighborhoods.length > 0 && (
          <section className="section local-area-section">
            <div className="wrap">
              <div className="local-area-head">
                <div>
                  <span className="eyebrow">생활권별 차이</span>
                  <h2 className="section-title">{district} 안에서도 이사 조건이 달라집니다</h2>
                  <p className="section-desc">아파트 밀집지역, 업무지구, 저층주택가는 차량 진입과 작업 방식이 서로 다릅니다.</p>
                </div>
                {factors.length > 0 && (
                  <div className="factor-pills">
                    {factors.map((item) => <span key={item}>{item}</span>)}
                  </div>
                )}
              </div>
              <div className="neighborhood-grid">
                {local.neighborhoods.map((item, index) => (
                  <article className="neighborhood-card" key={item.name}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{item.name}</strong>
                    <p>{item.note}</p>
                    <div className="factor-pills">
                      {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section region-calendar-section" id="local-calendar">
          <div className="wrap">
            <div className="region-calendar-heading">
              <span className="eyebrow">이사 날짜 선택</span>
              <h2 className="section-title">{district} 손없는날과 지역 날씨를 같이 확인하세요</h2>
              <p className="section-desc">손없는날과 {district}의 예상 강수확률·기온을 함께 확인해 이사 날짜를 준비해보세요.</p>
            </div>
            <MovingCalendar regionName={region.name} districtName={district} lockRegion />
            <div className="region-source-note"><strong>안내:</strong> 손없는날은 전통적인 음력 기준 참고 정보이며 날씨는 단기 예보입니다. 실제 이사 전 최신 예보를 다시 확인하세요.</div>
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
            <div className="highlight-card">
              <strong>{district} 이사 팁</strong>
              <p>{region.tip}</p>
              <a href="/estimate">조건 입력하고 비교견적 받기 →</a>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <span className="eyebrow">이사 후 행정</span>
            <h2 className="section-title">{district} 전입신고는 어떻게 하나요?</h2>
            <p className="section-desc">온라인은 정부24, 방문은 새 주소지 관할 주민센터에서 진행할 수 있습니다.</p>
            <div className="guide-grid">
              <article className="guide-card"><span className="guide-step">01</span><strong>정부24 또는 주민센터</strong><p>온라인 또는 {district} 내 새 주소지 관할 주민센터에서 신청할 수 있습니다.</p></article>
              <article className="guide-card"><span className="guide-step">02</span><strong>전입 후 14일 이내</strong><p>전입한 날부터 14일 이내 신고하는 것이 원칙입니다.</p></article>
              <article className="guide-card"><span className="guide-step">03</span><strong>임차인은 권리관계도 확인</strong><p>전입신고와 함께 확정일자, 선순위 권리와 계약 대상 주소를 확인하세요.</p></article>
            </div>
            <div className="official-links"><a href="https://www.gov.kr" target="_blank" rel="noreferrer">정부24 확인하기 ↗</a></div>
          </div>
        </section>

        <section className="section white">
          <div className="wrap">
            <span className="eyebrow">전세 계약 안전 확인</span>
            <h2 className="section-title">확정일자·전세권 설정은 무엇이 다른가요?</h2>
            <div className="compare-grid">
              <div className="card"><strong>전입신고 + 확정일자</strong><p>임차인의 보증금 보호를 준비할 때 일반적으로 함께 확인하는 절차입니다.</p></div>
              <div className="card"><strong>전세권 설정등기</strong><p>등기부에 전세권을 설정하는 별도 등기 절차로 계약당사자의 협조가 필요할 수 있습니다.</p></div>
            </div>
            <div className="warning-box">보증금과 선순위 담보권 등 계약 조건에 따라 판단이 달라질 수 있으므로 중요한 계약은 전문가에게 확인하세요.</div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <span className="eyebrow">등기부 확인</span>
            <h2 className="section-title">등기사항증명서는 이 세 가지부터 보세요</h2>
            <div className="guide-grid">
              <article className="guide-card"><span className="guide-step">갑구</span><strong>소유자 확인</strong><p>계약 상대방과 소유자가 같은지, 압류·가압류 표시가 있는지 확인합니다.</p></article>
              <article className="guide-card"><span className="guide-step">을구</span><strong>근저당권 등 확인</strong><p>근저당권·전세권 등 소유권 외 권리를 확인합니다.</p></article>
              <article className="guide-card"><span className="guide-step">주소</span><strong>계약 대상 확인</strong><p>동·호수를 포함해 실제 계약할 집과 등기사항증명서가 일치하는지 확인합니다.</p></article>
            </div>
            <div className="official-links"><a href="https://www.iros.go.kr" target="_blank" rel="noreferrer">대한민국 법원 인터넷등기소 ↗</a></div>
          </div>
        </section>

        <section className="section white utility-section">
          <div className="wrap">
            <span className="eyebrow">이삿날 생활요금</span>
            <h2 className="section-title">전기·도시가스 이전도 미리 준비하세요</h2>
            <div className="utility-grid">
              <article className="utility-card"><div className="utility-number">123</div><strong>한국전력 고객센터</strong><p>전기 이사정산과 관련 상담은 국번 없이 123에서 확인할 수 있습니다.</p><a href="https://home.kepco.co.kr" target="_blank" rel="noreferrer">한전 확인하기 ↗</a></article>
              <article className="utility-card"><div className="utility-number small-number">주소별 확인</div><strong>{district} 도시가스 전출·전입</strong><p>도시가스 공급회사는 주소에 따라 달라질 수 있으므로 관할 고객센터를 확인하세요.</p><a href="https://www.citygas.or.kr/company/find/index.jsp" target="_blank" rel="noreferrer">도시가스 고객센터 찾기 ↗</a></article>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <h2 className="section-title">{district} 이사 종류별 비교</h2>
            <div className="service-grid">
              <div className="card"><strong>{district} 포장이사</strong><p>포장·운반·정리 범위와 작업 인원, 추가 서비스 포함 여부를 비교합니다.</p></div>
              <div className="card"><strong>{district} 원룸이사</strong><p>짐 양, 차량 크기, 엘리베이터와 기사 도움 범위를 비교합니다.</p></div>
              <div className="card"><strong>{district} 일반이사</strong><p>직접 포장 후 운송 중심으로 차량과 운반 인력 비용을 비교합니다.</p></div>
              <div className="card"><strong>{district} 사무실이사</strong><p>{local.officeNote}</p></div>
            </div>
          </div>
        </section>

        <section className="section region-faq-section" aria-labelledby="region-faq-title">
          <div className="wrap">
            <span className="eyebrow">자주 묻는 질문</span>
            <h2 className="section-title" id="region-faq-title">{district} 이사 준비 FAQ</h2>
            <div className="region-faq-list">
              {faqs.map((faq, index) => (
                <details className="region-faq-item" key={faq.question} open={index === 0}>
                  <summary><span>Q</span>{faq.question}</summary>
                  <div className="region-faq-answer"><span>A</span><p>{faq.answer}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section white">
          <div className="wrap">
            <div className="cta">
              <div><h2>{district} 이사를 준비하고 계신가요?</h2><p>날짜와 작업조건을 입력해 업체별 견적을 비교해보세요.</p></div>
              <a href={`/estimate?region=${encodeURIComponent(region.name)}&district=${encodeURIComponent(district)}`}>무료 비교견적 시작</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <strong>올바른이사</strong>
          <p>{region.name} {district} 지역의 이사 준비 정보와 비교견적을 제공하는 안내 페이지입니다.</p>
        </div>
      </footer>
    </div>
  );
}
