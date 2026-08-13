import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { regionProfiles } from "@/lib/regions";

export const metadata: Metadata = {
  title: "전국 지역별 이사 정보 | 시·군·구 이사업체 비교 | 올바른이사",
  description: "서울·경기·인천·부산·대구 등 전국 17개 시·도와 시·군·구별 이사 특징, 손없는날, 날씨, 전입신고와 생활정보를 확인하세요.",
  alternates: { canonical: "/moving" },
};

export default function MovingHub(){return <><SiteHeader/><main><section className="sub-hero"><div className="wrap narrow"><span className="eyebrow">전국 지역별 이사</span><h1>지역마다 다른 이사 조건을<br/>한곳에서 확인하세요.</h1><p>아파트 밀집지역, 구도심, 산업단지, 관광지, 외곽 생활권은 차량 접근과 작업시간이 서로 다릅니다. 출발지와 도착지의 지역 특성을 먼저 확인하면 견적 비교가 더 정확해집니다.</p></div></section><section className="section white"><div className="wrap"><div className="all-region-grid">{regionProfiles.map(region=><article className="home-region-card" key={region.slug}><div className="home-region-head"><strong>{region.name}</strong><span>{region.districts.length}개 지역</span></div><p>{region.summary}</p><div className="home-district-links">{region.districts.map(d=><a key={d} href={`/moving/${region.slug}/${encodeURIComponent(d)}`}>{d}</a>)}</div></article>)}</div></div></section><section className="section"><div className="wrap"><div className="cta"><div><h2>출발지와 도착지가 정해졌나요?</h2><p>지역과 날짜, 현장조건을 입력해 견적 비교를 시작하세요.</p></div><a href="/estimate">무료 비교견적 시작</a></div></div></section></main><SiteFooter/></>}
