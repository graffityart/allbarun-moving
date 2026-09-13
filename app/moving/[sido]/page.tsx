import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { regionProfiles } from "@/lib/regions";
import { ESTIMATE_INQUIRY_URL } from "@/lib/external-links";

type Props={params:Promise<{sido:string}>};
const SITE_URL=(process.env.NEXT_PUBLIC_SITE_URL||"https://5km.kr").replace(/\/$/,"");

function makeProvinceMeta(region:(typeof regionProfiles)[number]){
 const seed=[...region.slug].reduce((a,c)=>a+c.charCodeAt(0),0);
 const titles=[
  `${region.name} 포장이사·이사업체 | 지역별 견적·이사정보`,
  `${region.name} 이사업체 비교 | 포장이사 지역 가이드`,
  `${region.name} 포장이사 지역정보 | 시·군·구 이사견적`,
  `${region.name} 이사 준비 | 포장이사·이사업체 비교`
 ];
 const descriptions=[
  `${region.summary} ${region.districts.length}개 시·군·구별 주거형태와 차량 접근, 포장이사 견적 비교 포인트를 확인하세요.`,
  `${region.name}은 ${region.housing} ${region.access} 지역별 이사업체 비교 전에 시·군·구별 작업조건을 확인하세요.`,
  `${region.traffic} ${region.districts.length}개 지역의 포장이사·원룸이사·사무실이사 준비정보와 견적 체크사항을 정리했습니다.`,
  `${region.name} 이사를 준비한다면 ${region.tip} 시·군·구별 지역 특성과 손없는날·날씨, 견적 비교정보를 확인할 수 있습니다.`
 ];
 return{title:titles[seed%titles.length],description:descriptions[Math.floor(seed/3)%descriptions.length]};
}

export async function generateStaticParams(){return regionProfiles.map(r=>({sido:r.slug}))}

export async function generateMetadata({params}:Props):Promise<Metadata>{
 const{sido}=await params;
 const region=regionProfiles.find(r=>r.slug===sido);
 if(!region)return{};
 const{title,description}=makeProvinceMeta(region);
 const url=`${SITE_URL}/moving/${region.slug}`;
 return{title,description,robots:{index:true,follow:true},alternates:{canonical:url},openGraph:{title,description,url,type:"website",siteName:"올바른이사",locale:"ko_KR"}}
}

export default async function ProvinceHub({params}:Props){
 const{sido}=await params;
 const region=regionProfiles.find(r=>r.slug===sido);
 if(!region)notFound();
 const pageUrl=`${SITE_URL}/moving/${region.slug}`;
 const breadcrumb={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"홈",item:SITE_URL},{"@type":"ListItem",position:2,name:"전국 지역별 이사",item:`${SITE_URL}/moving`},{"@type":"ListItem",position:3,name:`${region.name} 이사`,item:pageUrl}]};
 const itemList={"@context":"https://schema.org","@type":"ItemList",name:`${region.name} 시·군·구별 포장이사·이사업체`,numberOfItems:region.districts.length,itemListElement:region.districts.map((d,index)=>({"@type":"ListItem",position:index+1,name:`${d} 포장이사·이사업체`,url:`${SITE_URL}/moving/${region.slug}/${encodeURIComponent(d)}`}))};
 return <><SiteHeader/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumb)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(itemList)}}/><main><section className="sub-hero"><div className="wrap narrow"><div className="breadcrumb"><a href="/">홈</a><span>›</span><a href="/moving">지역별 이사</a><span>›</span><strong>{region.name}</strong></div><span className="eyebrow">{region.name} 포장이사·이사업체</span><h1>{region.name} 안에서도<br/>이사 조건은 지역마다 다릅니다.</h1><p>{region.summary}</p></div></section><section className="section white"><div className="wrap"><div className="tips-grid"><article className="card"><strong>주거 형태</strong><p>{region.housing}</p></article><article className="card"><strong>차량 접근</strong><p>{region.access}</p></article><article className="card"><strong>이동 시간</strong><p>{region.traffic}</p></article></div></div></section><section className="section"><div className="wrap"><span className="eyebrow">시·군·구 선택</span><h2 className="section-title">{region.name} 지역별 포장이사·이사업체 정보</h2><p className="section-desc">{region.tip}</p><div className="province-district-grid">{region.districts.map(d=><a key={d} href={`/moving/${region.slug}/${encodeURIComponent(d)}`} className="province-district-card"><strong>{d} 포장이사</strong><span>{d} 이사업체·이사 정보 보기 →</span></a>)}</div></div></section><section className="section white"><div className="wrap two-col-info"><div><span className="eyebrow">견적 전에</span><h2 className="section-title">{region.name} 이사에서 공통으로 확인할 것</h2><ul className="check-list"><li>출발지·도착지의 층수와 엘리베이터 사용 가능 여부</li><li>이사차량 정차 위치와 현관까지 실제 운반거리</li><li>관리사무소의 이사시간·사다리차·보양 관련 규정</li><li>주말·월말·손없는날 등 선호 날짜의 예약 여유</li><li>대형가전·가구 분해조립과 추가비 기준</li></ul></div><div className="highlight-card"><strong>{region.name} 이사 팁</strong><p>{region.tip}</p><a href={ESTIMATE_INQUIRY_URL}>무료 비교견적 시작 →</a></div></div></section></main><SiteFooter/></>}
