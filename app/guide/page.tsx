import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ESTIMATE_INQUIRY_URL } from "@/lib/external-links";
export const metadata:Metadata={title:"이사 준비 가이드 | 체크리스트·전입신고·생활요금",description:"이사 견적 비교부터 전입신고, 등기사항증명서 확인, 전기·도시가스 이전까지 이사 전후에 필요한 정보를 순서대로 확인하세요.",alternates:{canonical:"/guide"}};
const guides=[
 {href:"/guide/moving-checklist",tag:"준비 일정",title:"이사 체크리스트",desc:"D-30부터 이사 다음 날까지 무엇을 언제 준비해야 하는지 순서대로 확인합니다."},
 {href:"/guide/address-change",tag:"이사 후 행정",title:"전입신고·확정일자",desc:"전입신고 시기와 임차인이 함께 확인하면 좋은 확정일자·계약 주소 확인 항목을 정리합니다."},
 {href:"/guide/registry",tag:"계약 확인",title:"등기사항증명서 보는 순서",desc:"표제부·갑구·을구에서 계약 전에 우선 확인할 내용을 어렵지 않게 설명합니다."},
 {href:"/guide/utilities",tag:"생활서비스",title:"전기·도시가스 이전",desc:"이사 전후 전기 정산과 도시가스 철거·연결 예약을 준비하는 순서를 확인합니다."},
 {href:"/service",tag:"견적 비교",title:"이사 종류별 차이",desc:"포장이사·원룸이사·일반이사·사무실이사의 작업범위와 견적 비교 기준을 확인합니다."},
 {href:"/moving",tag:"지역 확인",title:"전국 지역별 이사",desc:"시·군·구별 주거 형태와 차량 접근, 교통 등 실제 이사 조건을 확인합니다."}
];
export default function GuideHub(){return <><SiteHeader/><main><section className="sub-hero"><div className="wrap narrow"><span className="eyebrow">올바른 이사 준비</span><h1>견적을 받기 전부터<br/>이사 후 정리까지.</h1><p>이사는 업체만 정한다고 끝나지 않습니다. 날짜와 건물 조건, 계약 확인, 전입신고와 생활서비스 이전까지 필요한 내용을 단계별로 확인하세요.</p></div></section><section className="section white"><div className="wrap"><div className="guide-hub-grid">{guides.map(g=><a className="guide-hub-card" href={g.href} key={g.href}><span>{g.tag}</span><strong>{g.title}</strong><p>{g.desc}</p><b>가이드 보기 →</b></a>)}</div></div></section><section className="section"><div className="wrap"><div className="cta"><div><h2>지역과 이사 날짜가 정해졌나요?</h2><p>실제 견적에서는 층수·주차·엘리베이터·사다리차 같은 현장조건도 함께 비교하세요.</p></div><a href={ESTIMATE_INQUIRY_URL}>무료 비교견적 시작</a></div></div></section></main><SiteFooter/></>}
