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
function clean(text:string){return text.replace(/\s+/g," ").replace(/\.{2,}/g,".").trim()}
function short(text:string,max=72){const value=clean(text);return value.length>max?`${value.slice(0,max).replace(/[\s,·]+$/g,"")}…`:value}

export function getLocalPagePresentation(region:string,district:string,local:LocalGuide,_regionData:{housing:string;access:string;traffic:string}){
  const seed=hash(`${region}-${district}-presentation`);
  const neighborhoods=local.neighborhoods??[];
  const areas=neighborhoods.map(x=>x.name).filter(Boolean);
  const tags=Array.from(new Set(neighborhoods.flatMap(x=>x.tags??[]).filter(Boolean)));
  const a=areas[0]??district,b=areas[1]??areas[0]??district,c=areas[2];
  const f1=tags[0]??"차량 접근",f2=tags[1]??"주차·운반",f3=tags[2]??"건물 규정";
  const housing=clean(neighborhoods[0]?.note??local.localIntro);
  const access=clean(neighborhoods[1]?.note??local.localChecklist[0]??local.movingNote);
  const traffic=clean(local.localChecklist.find(x=>/교통|정체|시간|도로|진입|차량|주차/.test(x))??neighborhoods[2]?.note??local.localChecklist[1]??local.movingNote);
  const localPoint=clean(local.localChecklist[0]??local.movingNote);
  const areaLabel=areas.slice(0,3).join("·")||district;

  // 제목의 핵심어를 실제 생활권·현장 태그에서 생성해 전국 페이지의 템플릿 반복을 줄인다.
  const heroKickers=[
    `${region} ${district} · ${f1} 중심 이사 가이드`,
    `${areaLabel} 생활권 이사 준비`,
    `${district} ${f1}·${f2} 현장정보`,
    `${a} 생활권부터 보는 ${district} 이사`
  ];
  const heroTitles=[
    `${district} 포장이사,\n${a}의 ${f1}부터 확인하세요.`,
    `${a}${b!==a?`·${b}`:""} 이사,\n${f2} 조건이 견적을 바꿀 수 있습니다.`,
    `${district} 이사업체 비교 전,\n${areaLabel} 현장조건을 먼저 보세요.`,
    `${district} 이사 준비,\n${f1}와 ${f3}를 함께 확인하세요.`
  ];

  const sectionTitles=[
    `${areaLabel}에서 달라지는 ${district} 이사 조건`,
    `${district} ${f1}·${f2}, 견적 전에 확인할 것`,
    `${a}와 ${b} 생활권의 이사 동선은 어떻게 다를까요?`,
    `${district} 작업시간에 영향을 주는 ${f1}·${f3}`
  ];
  const sectionDescriptions=[
    clean(`${localPoint} ${local.movingNote}`),
    clean(`${local.localIntro} 특히 ${a}${b!==a?`와 ${b}`:""}에서는 ${f1}와 ${f2} 조건을 출발지·도착지별로 나눠 전달하는 것이 좋습니다.`),
    clean(`${a} 생활권은 ${short(housing,86)} ${b!==a?`${b} 쪽은 ${short(access,86)}`:""}`),
    clean(`${areaLabel}을 기준으로 보면 같은 ${district} 안에서도 차량 진입, 건물 출입과 예상 운반시간이 달라질 수 있습니다. ${localPoint}`)
  ];
  const cardSets=[
    [
      {title:`${a} 주거·건물`,body:housing},
      {title:`${b} ${f1}`,body:access},
      {title:`${c??district} 이동시간`,body:traffic}
    ],
    [
      {title:`${district} ${f1}`,body:access},
      {title:`${a} ${f2}`,body:housing},
      {title:`${b} 일정 계획`,body:traffic}
    ],
    [
      {title:`${a} 출발지 체크`,body:clean(`${housing} 견적 요청 때 층수와 실제 정차 위치도 함께 전달하세요.`)},
      {title:`${b} 도착지 체크`,body:clean(`${access} 도착지의 출입 방식과 운반동선은 출발지와 따로 확인하는 편이 좋습니다.`)},
      {title:`${f3}·교통`,body:clean(`${traffic} 일정 확정 전 ${f3} 관련 제한도 함께 확인하세요.`)}
    ]
  ];

  const localChecklist=local.localChecklist.slice(0,5).map(clean);
  const compareChecklist=[
    `${areaLabel} 중 실제 출발·도착 생활권과 상세 주소`,
    `${a}${b!==a?`·${b}`:""} 건물의 층수·엘리베이터·계단 여부`,
    `${f1}·${f2} 조건과 이사차량 실제 정차 위치`,
    `${f3} 관련 관리규정과 사다리차 사용 가능 여부`,
    `대형가구·가전 분해조립, 작업인원·차량 톤수와 추가비 조건`
  ];
  const section:LocalSection={
    eyebrow:pick([`${district} ${f1} 체크`,`${a} 생활권 현장정보`,`${district} 견적 준비`,`${areaLabel} 이사 포인트`],seed,1),
    title:pick(sectionTitles,seed,2),
    description:pick(sectionDescriptions,seed,3),
    cards:pick(cardSets,seed,4),
    checklistTitle:pick([`${district} 이사 전 ${f1} 체크`,`${district} 견적 요청 때 전달할 현장정보`,`${a}${b!==a?`·${b}`:""} 이사 준비 체크`,`${district} ${f2}·추가작업 예방 체크`],seed,5),
    checklist:seed%3===0&&localChecklist.length>=3?localChecklist:compareChecklist
  };

  const areaHeading=pick([
    `${areaLabel} 생활권별 이사 조건`,
    `${district} 안에서도 달라지는 ${f1}·${f2}`,
    `${a}${b!==a?`·${b}`:""} 현장조건 비교`,
    `${a}부터 ${c??b}까지 생활권 체크`
  ],seed,6);
  const areaDescription=areas.length
    ?clean(`${areaLabel} 생활권의 실제 설명을 기준으로 차량 진입, 건물 형태, 주차와 작업시간에 영향을 주는 조건을 나눠 확인합니다. ${localPoint}`)
    :clean(`${district}의 주거형태와 차량 접근조건을 출발지·도착지별로 확인해 보세요. ${localPoint}`);
  const officeHeading=pick([`${district} 사무실·상가 이전과 ${f1}`,`${district} 업무시설 이전, ${f3}부터 확인하세요`,`${district} 사무실이사에서 달라지는 반입·차량 조건`],seed,7);
  const nearbyHeading=pick([`${district} 출발·도착 때 함께 볼 인접 지역`,`${district}와 연결되는 주변 지역 이사정보`,`${district} 인접 지역의 현장조건도 비교하세요`],seed,8);

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
