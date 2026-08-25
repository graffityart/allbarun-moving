import { regionProfiles } from "@/lib/regions";

const titlePatterns=[
(r:string,d:string)=>`${d} 포장이사·이사업체 비교 | ${r} 지역 이사 정보`,
(r:string,d:string)=>`${r} ${d} 이사 준비 | 견적·손없는날·날씨`,
(r:string,d:string)=>`${d} 이사 견적 비교 | 지역특징·포장이사 체크`,
(r:string,d:string)=>`${d} 이사업체 찾기 | 이사비용·생활정보`
];

function hash(s:string){return[...s].reduce((a,c)=>a+c.charCodeAt(0),0)}

export function getRegionalMeta(region:string,district:string){
 const seed=hash(region+district);
 const i=seed%titlePatterns.length;
 const title=titlePatterns[i](region,district);
 const openings=[`${region} ${district} 이사를 준비한다면`,`${district}에서 이사업체를 비교할 때는`,`${region} ${district}의 이사 조건은`,`${district} 포장이사를 알아보기 전`];
 const middles=[`주거 형태와 차량 접근, 주차거리부터 확인하는 것이 좋습니다.`,`아파트·오피스텔·주택 등 건물 형태와 작업 동선을 함께 살펴보세요.`,`짐의 양뿐 아니라 엘리베이터와 도로·주차 환경이 작업시간에 영향을 줄 수 있습니다.`,`출발지와 도착지의 층수, 차량 정차 위치와 생활권 특성을 함께 확인하세요.`];
 const endings=[`지역별 체크포인트와 손없는날·날씨, 전입신고와 생활서비스 이전 정보를 정리했습니다.`,`견적 비교 기준부터 날짜 선택, 이사 전후 생활정보까지 실제 준비 순서에 맞춰 확인할 수 있습니다.`,`포장이사 비교 항목과 이사 날짜, 행정·생활요금 이전까지 한 페이지에서 확인하세요.`,`현장조건과 날짜별 준비사항, 이사 후 필요한 생활정보를 함께 안내합니다.`];
 const description=`${openings[seed%openings.length]} ${middles[Math.floor(seed/3)%middles.length]} ${endings[Math.floor(seed/7)%endings.length]}`;
 return{title,description};
}

// 지역 상세 페이지 상단 소개문. 지역명+이사/포장이사 검색 의도를 앞쪽에 두되
// 문장 조합을 분산해 전국 페이지의 동일 문구 반복을 줄입니다.
export function getRegionalHeroDescription(region:string,district:string){
 const seed=hash(`${district}-${region}-hero`);
 const openings=[
  `${district} 포장이사를 준비한다면 이사업체를 정하기 전에 비용과 견적 조건부터 비교해 보세요.`,
  `${district} 이사를 계획하고 있다면 포장이사 업체의 가격뿐 아니라 실제 작업 조건도 함께 살펴보는 것이 좋습니다.`,
  `${district} 포장이사 업체를 알아볼 때는 단순 견적 금액보다 포함 서비스와 현장 조건을 먼저 확인해 보세요.`,
  `${district} 이사업체를 비교하고 있다면 포장이사 비용과 작업 범위를 같은 조건으로 확인하는 것이 중요합니다.`,
  `${district} 포장이사를 알아보는 중이라면 업체별 견적과 추가비 발생 조건을 먼저 비교해 보세요.`,
  `${district} 이사 준비를 시작했다면 포장이사 견적과 함께 차량·인원·작업 범위를 확인해 보세요.`
 ];
 const localPoints=[
  `${region} ${district}의 주거 형태와 차량 접근, 주차 여건`,
  `${district}의 아파트·주택 환경과 이사차량 진입 조건`,
  `${district} 생활권의 도로·주차 환경과 건물별 작업 여건`,
  `${region} ${district}의 주거환경과 엘리베이터·차량 접근 조건`,
  `${district}에서 이사할 때 확인할 층수·주차·운반 동선`,
  `${district}의 지역 특성과 실제 이사 현장에서 달라질 수 있는 조건`
 ];
 const endings=[
  `손없는날과 날씨, 이사 체크리스트까지 필요한 정보를 순서대로 정리했습니다.`,
  `이사 날짜 선택부터 손없는날·날씨와 준비 체크사항까지 한곳에서 확인할 수 있습니다.`,
  `손없는날, 지역 날씨, 견적 비교 포인트와 이사 전후 준비사항을 함께 확인하세요.`,
  `날짜별 준비사항과 손없는날·날씨, 이사 비용을 비교할 때 볼 항목까지 안내합니다.`,
  `이사 전 확인할 체크리스트와 날짜·날씨 정보까지 실제 준비 흐름에 맞춰 살펴볼 수 있습니다.`,
  `포장이사 비교 기준부터 이삿날 선택과 생활정보까지 필요한 내용을 모아 안내합니다.`
 ];
 return `${openings[seed%openings.length]} ${localPoints[Math.floor(seed/5)%localPoints.length]}을 살펴보고, ${endings[Math.floor(seed/11)%endings.length]}`;
}

export function getNearbyDistricts(slug:string,district:string,limit=6){const region=regionProfiles.find(r=>r.slug===slug);if(!region)return[];const idx=region.districts.indexOf(district);if(idx<0)return region.districts.slice(0,limit);const out:string[]=[];for(let step=1;out.length<Math.min(limit,region.districts.length-1);step++){const right=region.districts[(idx+step)%region.districts.length];const left=region.districts[(idx-step+region.districts.length)%region.districts.length];if(right!==district&&!out.includes(right))out.push(right);if(out.length<limit&&left!==district&&!out.includes(left))out.push(left)}return out.slice(0,limit)}

export const movingTimeline=[{day:"D-30",title:"이사 조건과 예산 정리",items:["출발·도착 주소의 층수, 엘리베이터와 주차 위치 확인","포장이사·일반이사 등 필요한 서비스 범위 결정","손없는날·주말 등 선호 날짜라면 여러 업체 견적을 일찍 비교"]},{day:"D-14",title:"업체·건물 예약 확정",items:["계약서에 차량 톤수, 인원, 사다리차·추가비 기준 확인","아파트·오피스텔 관리사무소에 이사시간과 엘리베이터 예약","버릴 가구·가전과 이전설치가 필요한 품목 구분"]},{day:"D-7",title:"주소·생활서비스 이전 준비",items:["전기·도시가스·인터넷 등 이전 또는 해지 일정 확인","우편물과 금융·쇼핑몰 등 주요 배송주소 변경 준비","귀중품·계약서·등기 관련 서류는 별도 가방에 보관"]},{day:"D-1",title:"이삿날 동선 최종 확인",items:["최신 날씨와 강수확률 확인 후 방수포·박스 보강 여부 결정","냉장고 음식과 세탁기 잔수, 쓰레기·폐기물 최종 정리","업체 도착시간, 차량 정차 위치, 새집 출입방법 다시 공유"]},{day:"D-DAY",title:"정산과 상태 확인",items:["출발지 계량기·시설 상태와 남은 짐 확인","도착 후 가구·가전 파손 여부와 배치 상태 확인","추가비가 있다면 계약한 기준과 작업내용을 확인한 뒤 정산"]},{day:"D+1",title:"전입·계약 후속 절차",items:["전입신고 기한과 임차인의 확정일자 등 권리보호 절차 확인","전기·가스·관리비 명의와 요금 정산 상태 확인","분실·파손 문제가 있으면 사진과 계약서를 기준으로 업체에 신속히 문의"]}];
