import type { LocalGuide } from "@/lib/district-content";

type LocalSection={
  eyebrow:string;
  title:string;
  description:string;
  cards:{title:string;body:string}[];
  checklistTitle:string;
  checklist:string[];
};

function hash(text:string){return [...text].reduce((sum,ch)=>sum+ch.charCodeAt(0),0)}

function pick<T>(items:T[],seed:number,offset=0){return items[(seed+offset)%items.length]}

export function getLocalPagePresentation(region:string,district:string,local:LocalGuide,regionData:{housing:string;access:string;traffic:string}){
  const seed=hash(`${region}-${district}-presentation`);
  const areas=(local.neighborhoods??[]).map(x=>x.name);
  const tags=Array.from(new Set((local.neighborhoods??[]).flatMap(x=>x.tags??[])));
  const a=areas[0]??district,b=areas[1]??areas[0]??district;
  const f1=tags[0]??"차량 접근",f2=tags[1]??"주차·운반",f3=tags[2]??"건물 규정";

  const heroKickers=[`${region} ${district} 현장형 이사 가이드`,`${district} 생활권별 이사 준비`,`${region} ${district} 포장이사 현장정보`,`${district} 이사 전 확인 가이드`];
  const heroTitles=[
    `${district} 포장이사,\n${a}부터 현장조건을 확인하세요.`,
    `${a}·${b} 이사,\n같은 ${district}라도 조건은 다릅니다.`,
    `${district} 이사업체 비교 전,\n${f1}부터 확인하세요.`,
    `${district} 이사 준비,\n생활권과 건물조건을 함께 보세요.`
  ];

  const sectionTitles=[
    `${a}·${b}에서 달라지는 ${district} 이사 조건`,
    `${district} 견적 전에 확인할 ${f1}·${f2}`,
    `${district} 생활권에 맞춰 보는 이사 현장정보`,
    `${district}에서 작업시간을 바꾸는 세 가지 조건`
  ];
  const sectionDescriptions=[local.movingNote,`${local.localIntro} 견적 요청 전에는 출발지와 도착지의 조건을 나눠 전달하는 편이 비교에 유리합니다.`,`${a}와 ${b}처럼 생활권이 달라지면 정차 위치, 건물 출입 방식과 예상 운반시간도 달라질 수 있습니다. ${local.movingNote}`];
  const cardSets=[
    [{title:`${a} 주거·건물`,body:regionData.housing},{title:`${f1} 확인`,body:regionData.access},{title:"시간대·이동",body:regionData.traffic}],
    [{title:`${district} 건물 조건`,body:regionData.housing},{title:`${a} 차량 동선`,body:regionData.access},{title:`${b} 이동 계획`,body:regionData.traffic}],
    [{title:"출발지 체크",body:`${a}을 포함한 출발지의 층수, 엘리베이터와 차량 정차 위치를 먼저 확인하세요.`},{title:"도착지 체크",body:`${b}을 포함한 도착지의 건물 규정과 현관까지 운반동선을 따로 확인하세요.`},{title:`${f3}·교통`,body:`${regionData.traffic} ${f3} 관련 조건도 일정 확정 전에 확인하는 편이 좋습니다.`}]
  ];

  const localChecklist=local.localChecklist.slice(0,5);
  const compareChecklist=[
    `${a}·${b} 등 실제 출발·도착 생활권과 주소`,
    `양쪽 건물의 층수·엘리베이터·계단 여부`,
    `${f1}·${f2} 조건과 차량 정차 위치`,
    `대형가구·가전의 분해조립 또는 별도 작업 여부`,
    `작업인원·차량 톤수와 추가비가 생기는 조건`
  ];
  const section:LocalSection={
    eyebrow:pick([`${district} 현장 핵심`,`${a} 생활권부터 확인`,`${district} 견적 준비`,`${f1} 체크`],seed,1),
    title:pick(sectionTitles,seed,2),
    description:pick(sectionDescriptions,seed,3),
    cards:pick(cardSets,seed,4),
    checklistTitle:pick([`${district} 이사 전 현장 체크`,`${district} 견적 요청 때 함께 전달할 정보`,`${a}·${b} 이사 준비 체크`,`${district} 추가작업 예방 체크`],seed,5),
    checklist:seed%2===0?localChecklist:compareChecklist
  };

  const areaHeading=pick([`${areas.slice(0,2).join("·")||district} 등 생활권별 차이`,`${district} 안에서도 달라지는 작업조건`,`${district} 주요 생활권 현장 비교`,`${a}부터 ${b}까지 생활권 체크`],seed,6);
  const areaDescription=areas.length?`${areas.join(" · ")}을 기준으로 차량 진입, 건물 형태와 작업시간에 영향을 주는 조건을 나눠 확인해 보세요.`:`${district}의 주거형태와 차량 접근조건을 출발지·도착지별로 확인해 보세요.`;
  const officeHeading=pick([`${district} 사무실·상가 이전은 무엇이 다를까요?`,`${district} 업무시설 이전 체크포인트`,`${district} 사무실이사, 반입규정부터 확인하세요`],seed,7);
  const nearbyHeading=pick([`${district} 주변 지역도 함께 비교하기`,`${district} 인접 지역 이사정보`,`${district}에서 가까운 지역 가이드`],seed,8);

  return{
    heroKicker:pick(heroKickers,seed),
    heroTitle:pick(heroTitles,seed,1),
    section,
    areaHeading,
    areaDescription,
    officeHeading,
    nearbyHeading
  };
}
