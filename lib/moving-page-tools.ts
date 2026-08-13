import { regionProfiles } from "@/lib/regions";

const titlePatterns = [
  (r:string,d:string)=>`${d} 포장이사·이사업체 비교 | 손없는날·날씨 | 올바른이사`,
  (r:string,d:string)=>`${r} ${d} 이사 준비 가이드 | 견적·날씨·전입신고 | 올바른이사`,
  (r:string,d:string)=>`${d} 이사 견적 비교 | 지역특징·포장이사 체크 | 올바른이사`,
  (r:string,d:string)=>`${d} 이사업체 찾기 | 이사비용·손없는날·생활정보 | 올바른이사`,
];

function hash(s:string){return [...s].reduce((a,c)=>a+c.charCodeAt(0),0)}
export function getRegionalMeta(region:string,district:string){const i=hash(region+district)%titlePatterns.length;const title=titlePatterns[i](region,district);const descs=[`${region} ${district}에서 이사를 준비할 때 확인할 생활권별 차량 접근, 포장이사 견적 항목, 손없는날과 날씨, 전입신고·등기부·전기·도시가스 정보를 한곳에 정리했습니다.`,`${district} 이사를 준비한다면 짐 양만 보지 말고 주차거리와 엘리베이터, 지역 교통을 함께 확인하세요. ${region} 지역특징부터 날짜 선택, 행정·생활요금 이전까지 실제 이사 순서에 맞춰 안내합니다.`,`${region} ${district}의 주거·도로 특성을 반영한 이사 준비 안내입니다. 생활권별 체크포인트와 포장이사 비교 기준, 손없는날·단기예보, 전입신고와 생활요금 이전 정보를 확인할 수 있습니다.`];return{title,description:descs[i%descs.length]}}

export function getNearbyDistricts(slug:string,district:string,limit=6){const region=regionProfiles.find(r=>r.slug===slug);if(!region)return[];const idx=region.districts.indexOf(district);if(idx<0)return region.districts.slice(0,limit);const out:string[]=[];for(let step=1;out.length<Math.min(limit,region.districts.length-1);step++){const right=region.districts[(idx+step)%region.districts.length];const left=region.districts[(idx-step+region.districts.length)%region.districts.length];if(right!==district&&!out.includes(right))out.push(right);if(out.length<limit&&left!==district&&!out.includes(left))out.push(left)}return out.slice(0,limit)}

export const movingTimeline=[
  {day:"D-30",title:"이사 조건과 예산 정리",items:["출발·도착 주소의 층수, 엘리베이터와 주차 위치 확인","포장이사·일반이사 등 필요한 서비스 범위 결정","손없는날·주말 등 선호 날짜라면 여러 업체 견적을 일찍 비교"]},
  {day:"D-14",title:"업체·건물 예약 확정",items:["계약서에 차량 톤수, 인원, 사다리차·추가비 기준 확인","아파트·오피스텔 관리사무소에 이사시간과 엘리베이터 예약","버릴 가구·가전과 이전설치가 필요한 품목 구분"]},
  {day:"D-7",title:"주소·생활서비스 이전 준비",items:["전기·도시가스·인터넷 등 이전 또는 해지 일정 확인","우편물과 금융·쇼핑몰 등 주요 배송주소 변경 준비","귀중품·계약서·등기 관련 서류는 별도 가방에 보관"]},
  {day:"D-1",title:"이삿날 동선 최종 확인",items:["최신 날씨와 강수확률 확인 후 방수포·박스 보강 여부 결정","냉장고 음식과 세탁기 잔수, 쓰레기·폐기물 최종 정리","업체 도착시간, 차량 정차 위치, 새집 출입방법 다시 공유"]},
  {day:"D-DAY",title:"정산과 상태 확인",items:["출발지 계량기·시설 상태와 남은 짐 확인","도착 후 가구·가전 파손 여부와 배치 상태 확인","추가비가 있다면 계약한 기준과 작업내용을 확인한 뒤 정산"]},
  {day:"D+1",title:"전입·계약 후속 절차",items:["전입신고 기한과 임차인의 확정일자 등 권리보호 절차 확인","전기·가스·관리비 명의와 요금 정산 상태 확인","분실·파손 문제가 있으면 사진과 계약서를 기준으로 업체에 신속히 문의"]}
];
