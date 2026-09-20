import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MovingCalendar from "@/components/MovingCalendar";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RegionHeroImage from "@/components/RegionHeroImage";
import { getDistrictRegion, regionProfiles } from "@/lib/regions";
import { getDistrictGuide } from "@/lib/district-content";
import { getSmartRegionFallback } from "@/lib/smart-region-fallback";
import { getGyeonggiGuide } from "@/lib/gyeonggi-content";
import { getIncheonGuide } from "@/lib/incheon-content";
import { getBusanGuide } from "@/lib/busan-content";
import { getDaeguGuide } from "@/lib/daegu-content";
import { getDaejeonGuide } from "@/lib/daejeon-content";
import { getGwangjuGuide } from "@/lib/gwangju-content";
import { getUlsanGuide } from "@/lib/ulsan-content";
import { getRemainingRegionGuide } from "@/lib/remaining-regions-content";
import { getRegionalOverride } from "@/lib/regional-overrides";
import { getRegionalMeta,getNearbyDistricts,movingTimeline } from "@/lib/moving-page-tools";
import { getRegionHeroImage,getRegionHeroVideo } from "@/lib/region-assets";
import { getRegionFaq } from "@/lib/region-faq";
import { getLocalAdminOffice } from "@/lib/local-admin-office";
import { ESTIMATE_INQUIRY_URL } from "@/lib/external-links";

type Props={params:Promise<{sido:string;sigungu:string}>};
const SITE_URL=(process.env.NEXT_PUBLIC_SITE_URL||"https://5km.kr").replace(/\/$/,"");

function resolveLocalGuide(regionName:string,district:string){
 const researched=getRegionalOverride(regionName,district);
 const special=researched??(regionName==="경기"?getGyeonggiGuide(district):regionName==="인천"?getIncheonGuide(district):regionName==="부산"?getBusanGuide(district):regionName==="대구"?getDaeguGuide(district):regionName==="대전"?getDaejeonGuide(district):regionName==="광주"?getGwangjuGuide(district):regionName==="울산"?getUlsanGuide(district):getRemainingRegionGuide(regionName,district));
 return special??(regionName==="서울"?getDistrictGuide(regionName,district):getSmartRegionFallback(regionName,district));
}

export async function generateStaticParams(){return regionProfiles.flatMap(r=>r.districts.map(d=>({sido:r.slug,sigungu:d})))}

export async function generateMetadata({params}:Props):Promise<Metadata>{
 const{sido,sigungu}=await params;
 const data=getDistrictRegion(sido,sigungu);
 if(!data)return{};
 const{region,district}=data;
 const meta=getRegionalMeta(region.name,district);
 const local=resolveLocalGuide(region.name,district);
 const hasResearchedLocalGuide=Boolean(getRegionalOverride(region.name,district)??(region.name==="서울"?getDistrictGuide(region.name,district):region.name==="경기"?getGyeonggiGuide(district):region.name==="인천"?getIncheonGuide(district):region.name==="부산"?getBusanGuide(district):region.name==="대구"?getDaeguGuide(district):region.name==="대전"?getDaejeonGuide(district):region.name==="광주"?getGwangjuGuide(district):region.name==="울산"?getUlsanGuide(district):getRemainingRegionGuide(region.name,district)));
 const primaryArea=local.neighborhoods?.[0]?.name;
 const secondaryArea=local.neighborhoods?.[1]?.name;
 const localAreas=[primaryArea,secondaryArea].filter(Boolean).join("·");
 const title=`${district} 포장이사·이사업체 | ${localAreas?`${localAreas} `:""}지역 이사정보`;
 const description=`${local.localIntro} ${localAreas?`${localAreas} 등 ${district} 생활권의 `:`${district} `}차량 접근·주거형태·운반동선과 포장이사 견적 비교사항을 확인하세요.`;
 const url=`${SITE_URL}/moving/${encodeURIComponent(sido)}/${encodeURIComponent(district)}`;
 return{...meta,title,description,robots:hasResearchedLocalGuide?{index:true,follow:true}:{index:false,follow:true},alternates:{canonical:url},openGraph:{title,description,type:"website",url,siteName:"올바른이사",locale:"ko_KR"}};
}

export default async function DistrictPage({params}:Props){
 const{sido,sigungu}=await params;
 const data=getDistrictRegion(sido,sigungu);
 if(!data)notFound();
 const{region,district}=data;
 const local=resolveLocalGuide(region.name,district);
 const adminOffice=getLocalAdminOffice(region.name,district);
 const heroImage=getRegionHeroImage(sido,district);
 const heroVideo=getRegionHeroVideo(sido,district);
 const faqs=getRegionFaq(region.name,district,local);
 const nearby=getNearbyDistricts(sido,district);
 const factors=Array.from(new Set((local.neighborhoods??[]).flatMap(i=>i.tags??[]))).slice(0,8);
 const primaryArea=local.neighborhoods?.[0]?.name;
 const secondaryArea=local.neighborhoods?.[1]?.name;
 const areaNames=(local.neighborhoods??[]).map(x=>x.name);
 const pageUrl=`${SITE_URL}/moving/${encodeURIComponent(sido)}/${encodeURIComponent(district)}`;
 const pageTitle=getRegionalMeta(region.name,district).title;
 const isGangnam=region.name==="서울"&&district==="강남구";
 const breadcrumb={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"홈",item:SITE_URL},{"@type":"ListItem",position:2,name:"지역별 이사",item:`${SITE_URL}/moving`},{"@type":"ListItem",position:3,name:region.name,item:`${SITE_URL}/moving/${sido}`},{"@type":"ListItem",position:4,name:`${district} 이사`,item:pageUrl}]};
 const faqLd={"@context":"https://schema.org","@type":"FAQPage",mainEntity:faqs.map(f=>({"@type":"Question",name:f.question,acceptedAnswer:{"@type":"Answer",text:f.answer}}))};
 const webPageLd={"@context":"https://schema.org","@type":"WebPage",name:pageTitle,url:pageUrl,inLanguage:"ko-KR",description:local.localIntro,isPartOf:{"@type":"WebSite",name:"올바른이사",url:SITE_URL},about:[{"@type":"Place",name:`${region.name} ${district}`},{"@type":"Service",name:`${district} 포장이사·이사업체 비교`,areaServed:`${region.name} ${district}`} ]};
 return <div className="region-page"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumb)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqLd)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(webPageLd)}}/><SiteHeader/><main>
<section className="sub-hero region-hero"><div className="wrap region-hero-grid"><div className="region-hero-copy"><div className="breadcrumb"><a href="/">홈</a><span>›</span><a href="/moving">지역별 이사</a><span>›</span><a href={`/moving/${sido}`}>{region.name}</a><span>›</span><strong>{district}</strong></div><span className="eyebrow">{region.name} {district} 지역 이사</span><h1>{district} 포장이사,<br/>{primaryArea?`${primaryArea}${secondaryArea?`·${secondaryArea}`:""} 생활권까지 확인하세요.`:"현장 조건부터 비교하세요."}</h1><p>{local.localIntro}</p><div className="hero-actions"><a className="primary-link" href={ESTIMATE_INQUIRY_URL}>{district} 무료 비교견적</a><a className="secondary-link" href="#local-calendar">{district} 손없는날·날씨</a></div></div><div className="region-hero-media"><RegionHeroImage src={heroImage} videoSrc={heroVideo} region={region.name} district={district}/></div></div></section>
<section className="section white"><div className="wrap"><span className="eyebrow">{primaryArea?`${primaryArea}부터 보는 현장 정보`:"지역 현장 정보"}</span><h2 className="section-title">{district} 이사에서 먼저 확인할 {factors[0]??"현장 조건"}</h2><p className="section-desc">{local.movingNote}</p><div className="tips-grid region-tips"><div className="card"><strong>주거 형태</strong><p>{region.housing}</p></div><div className="card"><strong>차량 접근</strong><p>{region.access}</p></div><div className="card"><strong>이동 시간</strong><p>{region.traffic}</p></div></div><div className="local-note"><strong>{district} 현장 체크</strong><ul className="check-list">{local.localChecklist.map(x=><li key={x}>{x}</li>)}</ul></div></div></section>
{local.neighborhoods?.length?<section className="section local-area-section"><div className="wrap"><div className="local-area-head"><div><span className="eyebrow">생활권별 차이</span><h2 className="section-title">{primaryArea}{secondaryArea?`·${secondaryArea}`:""} 등 {district} 생활권 비교</h2><p className="section-desc">{areaNames.join(" · ")}처럼 생활권에 따라 차량 진입과 작업시간, 건물 규정이 달라질 수 있습니다.</p></div><div className="factor-pills">{factors.map(x=><span key={x}>{x}</span>)}</div></div><div className="neighborhood-grid">{local.neighborhoods.map((x,i)=><article className="neighborhood-card" key={x.name}><span>{String(i+1).padStart(2,"0")}</span><strong>{x.name}</strong><p>{x.note}</p><div className="factor-pills">{x.tags.map(t=><span key={t}>{t}</span>)}</div></article>)}</div></div></section>:null}
{isGangnam?<section className="section white"><div className="wrap"><span className="eyebrow">강남구 이사업체 비교</span><h2 className="section-title">강남구 포장이사 견적은 건물·주차·운반동선부터 비교하세요</h2><p className="section-desc">강남구는 대단지 아파트, 오피스텔, 업무시설과 이면도로 상권이 함께 있어 같은 평형이라도 현장 조건에 따라 작업 방식이 달라질 수 있습니다. 업체별 총액만 비교하기보다 아래 조건을 같은 기준으로 전달한 뒤 견적을 확인하는 편이 정확합니다.</p><div className="tips-grid region-tips"><div className="card"><strong>대치·도곡</strong><p>대단지 아파트는 관리사무소의 이사시간, 엘리베이터 예약, 지하주차장 높이와 사다리차 작업 가능 위치를 먼저 확인하세요.</p></div><div className="card"><strong>역삼·삼성</strong><p>오피스텔과 업무시설은 출퇴근 시간대 교통, 건물 하역공간, 화물용 엘리베이터 이용시간이 실제 작업시간에 영향을 줄 수 있습니다.</p></div><div className="card"><strong>논현·신사</strong><p>이면도로와 상업시설이 섞인 구간은 이사차량 정차 위치에서 출입구까지의 운반거리와 주차 가능시간을 견적 전에 확인하는 것이 좋습니다.</p></div></div><div className="local-note"><strong>강남구 업체 비교 전에 전달할 5가지</strong><ul className="check-list"><li>출발지와 도착지의 정확한 층수·엘리베이터 유무</li><li>지하주차장 진입 높이와 이사차량 정차 가능 위치</li><li>관리사무소 이사시간·엘리베이터·사다리차 예약 조건</li><li>대형가전·가구의 분해조립과 폐기물 처리 여부</li><li>작업 인원·차량 톤수·추가비 발생 조건을 포함한 최종 견적</li></ul></div></div></section>:null}
<section className="section white district-compare-section"><div className="wrap"><span className="eyebrow">{district} 이사업체 비교</span><h2 className="section-title">{district} 지역에서 이사업체를 비교할 때 먼저 볼 조건</h2><p className="section-desc">{local.movingNote}</p><div className="tips-grid region-tips"><div className="card"><strong>생활권·건물 조건</strong><p>{primaryArea?`${primaryArea}${secondaryArea?`·${secondaryArea}`:""} 등 ${district} 생활권은 건물 형태와 관리규정이 다를 수 있습니다.`:`${district}의 건물 형태와 관리규정을 먼저 확인하세요.`}</p></div><div className="card"><strong>차량·운반 동선</strong><p>{region.access}</p></div><div className="card"><strong>시간대·교통</strong><p>{region.traffic}</p></div></div><div className="local-note"><strong>{district} 견적 요청 전에 전달할 현장정보</strong><ul className="check-list"><li>출발지·도착지의 층수와 엘리베이터 사용 여부</li><li>이사차량 정차 위치와 현관까지 실제 운반거리</li><li>{factors[0]??"주차"}·{factors[1]??"차량 진입"} 등 이 지역에서 확인할 조건</li><li>대형가구·가전 분해조립과 사다리차 필요 여부</li><li>작업 인원·차량 톤수·추가비 기준이 포함된 최종 견적</li></ul></div></div></section>
<section className="section region-calendar-section" id="local-calendar"><div className="wrap"><span className="eyebrow">{district} 이삿날 선택</span><h2 className="section-title">{district} 손없는날과 {region.name} 지역 날씨</h2><p className="section-desc">{primaryArea?`${primaryArea}을 포함한 ${district} 생활권은 `:""}날짜만 고르기보다 강수확률과 기온, 지역 교통 특성을 함께 확인하면 실제 이사 준비에 도움이 됩니다.</p><MovingCalendar regionName={region.name} districtName={district} lockRegion/><div className="region-source-note"><strong>안내:</strong> 손없는날은 전통적 음력 기준 참고 정보이며 날씨는 단기예보입니다. 이사 직전 최신 예보를 다시 확인하세요.</div></div></section>
<section className="section white"><div className="wrap two-col-info"><div><span className="eyebrow">견적 비교 포인트</span><h2 className="section-title">{district} 포장이사 견적에서 놓치기 쉬운 조건</h2><p>{local.movingNote}</p><ul className="check-list"><li>작업 인원과 차량 톤수</li><li>사다리차·엘리베이터 비용</li><li>차량 정차지에서 현관까지 운반거리</li><li>대형가구·가전 분해조립 범위</li><li>장거리·도서·외곽 추가비 기준</li></ul></div><div className="highlight-card"><strong>{primaryArea?`${primaryArea} 포함 ${district} 이사 팁`:`${district} 이사 팁`}</strong><p>{region.tip}</p><a href={ESTIMATE_INQUIRY_URL}>비교견적 문의하기 →</a></div></div></section>
<section className="section moving-timeline-section" id="moving-timeline"><div className="wrap"><span className="eyebrow">날짜별 준비</span><h2 className="section-title">{district} 이사 일정별 체크리스트</h2><p className="section-desc">{local.localChecklist[0]?`${local.localChecklist[0]}. `:""}이사 한 달 전부터 이사 다음 날까지 해야 할 일을 순서대로 확인하세요.</p><div className="moving-timeline">{movingTimeline.map(step=><article className="timeline-card" key={step.day}><div className="timeline-day">{step.day}</div><div><strong>{step.title}</strong><ul>{step.items.map(x=><li key={x}>{x}</li>)}</ul></div></article>)}</div><div className="official-links"><a href="/guide/moving-checklist">전체 이사 체크리스트 보기 →</a></div></div></section>
<section className="section white"><div className="wrap"><span className="eyebrow">공통 이사 절차</span><h2 className="section-title">{district} 이사 후 필요한 행정·생활 절차</h2><p className="section-desc">{primaryArea?`${primaryArea}${secondaryArea?`·${secondaryArea}`:""} 등 ${district} 현장조건을 확인했다면 `:""}전입신고·등기 확인·생활요금 이전처럼 전국 공통 절차는 아래 전문 가이드에서 별도로 확인하세요.</p><div className="guide-grid"><a className="guide-card" href="/guide/address-change"><span className="guide-step">행정</span><strong>전입신고·확정일자</strong><p>이사 후 주소 이전과 임차인이 함께 확인할 기본 절차를 정리했습니다.</p></a><a className="guide-card" href="/guide/registry"><span className="guide-step">계약</span><strong>등기사항증명서 확인</strong><p>소유자와 권리관계를 어떤 순서로 보면 되는지 확인하세요.</p></a><a className="guide-card" href="/guide/utilities"><span className="guide-step">생활</span><strong>전기·도시가스 이전</strong><p>출발지 정산과 도착지 연결을 준비하는 기본 순서를 확인하세요.</p></a><a className="guide-card" href={adminOffice.homepage} target="_blank" rel="noopener noreferrer"><span className="guide-step">관할</span><strong>{adminOffice.officeName}</strong><p>{adminOffice.address}</p><small>{adminOffice.homepageLabel} →</small></a></div><p className="section-desc" style={{marginTop:"18px"}}>{adminOffice.note}</p></div></section>
<section className="section"><div className="wrap"><span className="eyebrow">이사 유형</span><h2 className="section-title">{district}에서 비교할 이사 유형과 작업범위</h2><div className="service-grid"><a className="card" href="/service/packing-moving"><strong>포장이사</strong><p>포장·운반·정리와 추가서비스 포함범위를 비교하세요.</p></a><a className="card" href="/service/studio-moving"><strong>원룸이사</strong><p>짐 양, 차량 크기, 계단·엘리베이터와 기사 도움범위를 확인하세요.</p></a><a className="card" href="/service/general-moving"><strong>일반이사</strong><p>직접 포장할 경우 차량과 운반인력 범위를 명확히 하세요.</p></a><a className="card" href="/service/office-moving"><strong>사무실이사</strong><p>{local.officeNote}</p></a></div></div></section>
{nearby.length>0?<section className="section white nearby-section"><div className="wrap"><span className="eyebrow">주변 지역</span><h2 className="section-title">{district}에서 함께 확인할 {nearby.slice(0,2).join("·")} 이사 정보</h2><p className="section-desc">출발지와 도착지가 다른 시·군·구라면 양쪽 지역의 차량 접근과 이사 조건을 함께 확인하세요.</p><div className="nearby-links">{nearby.map(n=><a key={n} href={`/moving/${sido}/${encodeURIComponent(n)}`}>{n} 포장이사·이사 정보 <span>→</span></a>)}</div></div></section>:null}
<section className="section region-faq-section"><div className="wrap"><span className="eyebrow">{district} 현장 질문</span><h2 className="section-title">{primaryArea?`${primaryArea} 생활권까지 반영한 `:""}{district} 이사 FAQ</h2><div className="region-faq-list">{faqs.map((f,i)=><details className="region-faq-item" key={f.question} open={i===0}><summary><span>Q</span>{f.question}</summary><div className="region-faq-answer"><span>A</span><p>{f.answer}</p></div></details>)}</div></div></section>
<section className="section white"><div className="wrap"><div className="cta"><div><h2>{district} 이사를 준비하고 계신가요?</h2><p>{primaryArea?`${primaryArea}${secondaryArea?`·${secondaryArea}`:""} 등 `:""}출발·도착지 조건과 날짜를 정리한 뒤 비교견적 신청 페이지에서 문의해보세요.</p></div><a href={ESTIMATE_INQUIRY_URL}>무료 비교견적 시작</a></div></div></section>
</main><SiteFooter/></div>}
