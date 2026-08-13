import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDistrictRegion, regionProfiles } from "@/lib/regions";

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
    title: `${district} 이사업체 비교견적 | 포장이사·원룸이사 | 올바른이사`,
    description: `${region.name} ${district} 이사 준비 시 확인할 주거환경, 차량 접근, 교통, 추가비용 조건과 포장이사·원룸이사 비교견적 정보를 확인하세요.`,
  };
}

export default async function DistrictPage({ params }: Props) {
  const { sido, sigungu } = await params;
  const data = getDistrictRegion(sido, sigungu);
  if (!data) notFound();
  const { region, district } = data;

  return (
    <>
      <header className="site-header">
        <div className="wrap header-inner">
          <a href="/" className="brand">올바른이사</a>
          <nav className="nav"><a href="/estimate">비교견적</a><a href="/#calendar">손없는날·날씨</a><a href="/#region">지역별 이사</a></nav>
        </div>
      </header>
      <main>
        <section className="sub-hero region-hero">
          <div className="wrap">
            <div className="breadcrumb"><a href="/">홈</a><span>›</span><span>{region.name}</span><span>›</span><strong>{district}</strong></div>
            <span className="eyebrow">{region.name} 지역별 이사</span>
            <h1>{district} 이사업체,<br/>가격보다 조건부터 비교하세요.</h1>
            <p>{region.summary}</p>
            <div className="hero-actions"><a className="primary-link" href={`/estimate?region=${encodeURIComponent(region.name)}&district=${encodeURIComponent(district)}`}>{district} 무료 비교견적</a><a className="secondary-link" href="/#calendar">손없는날·날씨 보기</a></div>
          </div>
        </section>

        <section className="section white">
          <div className="wrap">
            <h2 className="section-title">{district} 이사에서 먼저 볼 조건</h2>
            <p className="section-desc">같은 지역에서도 건물 형태와 차량 접근 조건에 따라 필요한 인원과 작업시간이 달라질 수 있습니다.</p>
            <div className="tips-grid region-tips">
              <div className="card"><strong>주거 형태</strong><p>{region.housing}</p></div>
              <div className="card"><strong>차량 접근</strong><p>{region.access}</p></div>
              <div className="card"><strong>이동 시간</strong><p>{region.traffic}</p></div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap two-col-info">
            <div>
              <span className="eyebrow">견적 비교 포인트</span>
              <h2 className="section-title">{district} 포장이사 견적에서 확인할 항목</h2>
              <p>포장이사는 단순히 총액만 비교하기보다 기본 인원, 차량 톤수, 포장재, 정리 범위, 사다리차와 엘리베이터 비용이 포함됐는지 나눠서 보는 것이 좋습니다.</p>
              <ul className="check-list"><li>작업 인원과 차량 톤수</li><li>사다리차 또는 엘리베이터 비용</li><li>주차 위치에서 현관까지 운반거리</li><li>에어컨·TV·대형가구 분해조립</li><li>당일 발생 가능한 추가금 기준</li></ul>
            </div>
            <div className="highlight-card"><strong>{district} 이사 팁</strong><p>{region.tip}</p><a href="/estimate">조건 입력하고 비교견적 받기 →</a></div>
          </div>
        </section>

        <section className="section white">
          <div className="wrap">
            <h2 className="section-title">이사 종류별로 비교해보세요</h2>
            <div className="service-grid">
              <div className="card"><strong>{district} 포장이사</strong><p>포장·운반·정리 범위와 작업 인원, 추가 서비스 포함 여부를 중심으로 비교합니다.</p></div>
              <div className="card"><strong>{district} 원룸이사</strong><p>짐 양과 차량 크기, 엘리베이터 유무, 기사 도움 범위를 중심으로 비교합니다.</p></div>
              <div className="card"><strong>{district} 일반이사</strong><p>직접 포장 후 운송 중심으로 진행할 때 차량·운반 인력 비용을 비교합니다.</p></div>
              <div className="card"><strong>{district} 사무실이사</strong><p>집기·OA기기·보안자료와 업무 중단시간을 고려해 작업계획을 비교합니다.</p></div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap"><div className="cta"><div><h2>{district} 이사를 준비하고 계신가요?</h2><p>날짜와 작업조건을 함께 입력하면 업체별 견적을 비교하기 쉬워집니다.</p></div><a href="/estimate">무료 비교견적 시작</a></div></div>
        </section>
      </main>
      <footer className="footer"><div className="wrap"><strong>올바른이사</strong><p>{region.name} {district} 지역의 이사 준비 정보와 비교견적을 제공하는 안내 페이지입니다.</p></div></footer>
    </>
  );
}
