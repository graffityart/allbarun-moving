import type { LocalGuide } from "@/lib/district-content";

export type RegionFaq = { question: string; answer: string };

function hash(text:string){return[...text].reduce((sum,ch)=>sum+ch.charCodeAt(0),0)}
function districtType(district:string){if(district.endsWith("군"))return"군";if(district.endsWith("구"))return"구";if(district.endsWith("시"))return"시";return"기타"}

export function getRegionFaq(regionName:string,district:string,local?:LocalGuide):RegionFaq[]{
  const h=hash(`${regionName}-${district}-faq`);
  const type=districtType(district);
  const areas=(local?.neighborhoods??[]).map(x=>x.name).filter(Boolean);
  const areaA=areas[0];
  const areaB=areas[1];
  const localCheck=local?.localChecklist?.[0];
  const localMove=local?.movingNote;
  const localIntro=local?.localIntro;

  const quoteQuestions=[`${district} 포장이사 견적은 어떤 항목부터 비교해야 하나요?`,`${district} 이사업체 견적을 받을 때 가격 외에 무엇을 봐야 하나요?`,`${district}에서 포장이사 업체를 비교할 때 중요한 조건은 무엇인가요?`];
  const extraQuestions=[`${district} 이사에서 추가비용이 생기기 쉬운 경우는 언제인가요?`,`${district} 이사 견적이 현장에서 달라지는 이유는 무엇인가요?`,`${district} 이삿날 예상하지 못한 추가작업을 줄이려면 어떻게 하나요?`];
  const dateQuestions=[`${district} 손없는날에 꼭 이사해야 하나요?`,`${district} 이사 날짜는 손없는날과 날씨 중 무엇을 먼저 봐야 하나요?`,`${district} 이사 날짜를 정할 때 함께 확인할 조건은 무엇인가요?`];

  const quote:RegionFaq={
    question:quoteQuestions[h%quoteQuestions.length],
    answer:localMove?`${localMove} 여기에 작업 인원, 차량 톤수, 사다리차·엘리베이터 비용과 당일 추가금 기준을 같은 조건으로 비교하세요.`:`${district} 이사는 총액만 보기보다 작업 인원, 차량 톤수, 포장·정리 범위, 사다리차 또는 엘리베이터 비용, 차량 정차 위치에서 현관까지의 운반거리와 당일 추가금 기준을 나눠 확인하는 것이 좋습니다.`
  };
  const extra:RegionFaq={
    question:extraQuestions[(h+1)%extraQuestions.length],
    answer:localCheck?`${district}에서는 특히 ${localCheck} 항목을 미리 확인해 두는 것이 좋습니다. 계약 당시보다 짐이 늘거나 차량 진입·계단 작업 조건이 달라지면 추가비가 생길 수 있으므로 출발지와 도착지 사진을 함께 전달하세요.`:`계약 당시보다 짐이 늘거나 차량이 건물 가까이 진입하지 못하는 경우, 계단 작업이나 대형가구 분해·조립이 새로 필요한 경우에는 비용이 달라질 수 있습니다. ${district} 출발지와 도착지의 실제 작업조건을 사진과 함께 미리 전달하면 비교가 쉬워집니다.`
  };

  const dateAnswers=[
    `손없는날은 전통적인 날짜 선택 기준으로 참고할 수 있지만 반드시 그날 이사해야 하는 것은 아닙니다. 예약 가능 여부, 견적, ${district} 지역 날씨와 교통상황을 함께 비교해 날짜를 정하는 것이 실용적입니다.`,
    `${district} 이사 날짜는 손없는날보다 건물 예약시간과 업체 가능 일정, 강수·기온 예보를 함께 보는 편이 좋습니다. ${areaA?`${areaA} 같은 주요 생활권은 `:""}주차와 교통조건도 당일 작업시간에 영향을 줄 수 있습니다.`,
    `날짜를 먼저 고정하기보다 ${district}의 주말·월말 수요와 날씨를 확인한 뒤 업체 일정을 비교해 보세요. 공동주택이라면 엘리베이터 예약 가능시간도 같은 날에 맞춰야 합니다.`
  ];
  const date:RegionFaq={question:dateQuestions[(h+2)%dateQuestions.length],answer:dateAnswers[h%dateAnswers.length]};

  const moveInAnswers=[
    `온라인 신청은 정부24의 최신 안내를 확인할 수 있고 방문이 필요한 경우 새 주소지 관할 행정복지센터의 준비사항을 확인하는 것이 좋습니다. 임차인이라면 계약 주소와 등기사항증명서의 권리관계도 함께 확인하세요.`,
    `${district}로 전입한 뒤에는 전입신고 가능 시점과 준비서류를 정부24 또는 관할 행정복지센터에서 확인하세요. 임차인이라면 확정일자와 계약서 주소가 실제 전입주소와 일치하는지도 함께 살펴보는 것이 좋습니다.`,
    `이사 후 주소 변경은 미루지 말고 새 주소지 기준으로 전입신고 절차를 확인하세요. 온라인 신청 가능 여부와 방문 준비물은 정부24 또는 관할 행정복지센터의 최신 안내를 기준으로 보는 것이 안전합니다.`
  ];
  const moveIn:RegionFaq={question:`${district}로 이사한 뒤 전입신고는 어떻게 준비하나요?`,answer:moveInAnswers[Math.floor(h/3)%moveInAnswers.length]};

  const utilityAnswers=[
    `전기는 한국전력의 공식 이사 관련 안내를, 도시가스는 ${regionName} ${district} 새 주소를 기준으로 실제 공급회사를 확인하는 것이 먼저입니다. 출발지 정산과 도착지 연결 예약이 필요한지 이사 전에 각 공식 고객센터에서 확인하세요.`,
    `${district} 새 주소에서 이용할 전기·도시가스 공급 주체를 먼저 확인한 뒤 이전·해지 일정을 잡는 것이 좋습니다. 출발지 최종 검침과 도착지 사용개시가 같은 날 처리되는지 공식 고객센터에서 확인하세요.`,
    `이사 직전에는 전기 사용종료·개시와 도시가스 방문예약 여부를 따로 확인하세요. 특히 도시가스는 지역별 공급회사가 다를 수 있으므로 ${regionName} ${district} 주소를 기준으로 공식 안내를 확인하는 것이 좋습니다.`
  ];
  const utility:RegionFaq={question:`${district} 이사 전 전기와 도시가스는 언제 신청하는 것이 좋나요?`,answer:utilityAnswers[Math.floor(h/5)%utilityAnswers.length]};

  const localAreaFaq:RegionFaq|undefined=areaA&&areaB?{
    question:`${district} ${areaA}와 ${areaB}는 이사 조건이 많이 다른가요?`,
    answer:localIntro?`${localIntro} 특히 ${areaA}와 ${areaB}처럼 생활권이 달라지면 주차 위치와 건물 형태, 차량 접근조건도 달라질 수 있어 양쪽 주소를 각각 확인하는 것이 좋습니다.`:`같은 ${district} 안에서도 ${areaA}와 ${areaB}처럼 생활권이 달라지면 주거형태, 차량 정차 위치, 도로 폭과 작업시간 조건이 달라질 수 있습니다. 주소만 전달하기보다 건물 형태와 주차 위치, 엘리베이터·계단 여부를 각각 확인하는 것이 좋습니다.`
  }:undefined;

  const countyAnswers=[
    `군 지역은 같은 ${district} 안에서도 실제 주행거리와 도로 폭, 대형차 회차공간이 달라질 수 있습니다. 차량이 집 앞까지 들어갈 수 있는지와 추가 운반거리를 사진으로 업체에 미리 전달하는 것이 좋습니다.`,
    `${district} 읍·면권은 생활권 사이 이동거리가 길어질 수 있어 주소 간 거리만 보기보다 실제 진입도로와 회차공간을 확인해야 합니다. 외곽주택은 5톤 차량 접근 가능 여부도 미리 확인하세요.`,
    `${district} 외곽 이사는 도심 공동주택과 달리 좁은 농로·경사·마당 진입이 작업시간에 영향을 줄 수 있습니다. 출발지와 도착지 진입사진을 각각 준비하면 견적 비교가 쉬워집니다.`
  ];
  const districtAnswers=[
    `공동주택이나 오피스텔은 이사 가능시간, 엘리베이터 예약, 보양, 이사차량 지정 위치와 지하주차장 높이 제한이 건물마다 다를 수 있습니다. ${district}의 출발지와 도착지 관리주체에 각각 확인하세요.`,
    `${district} 아파트 이사는 관리사무소 예약시간과 차량 정차구역을 먼저 확인하는 것이 좋습니다. 엘리베이터 보양비나 사용료, 지하주차장 높이 제한도 단지마다 달라질 수 있습니다.`,
    `${district} 오피스텔·아파트는 같은 지역이라도 건물 규정 차이가 큽니다. 이사 가능시간, 화물엘리베이터 이용 여부와 차량 진입 위치를 출발지·도착지 모두 확인하세요.`
  ];
  const cityAnswers=[
    `같은 ${district} 안에서도 도심과 외곽, 공동주택과 저층주거처럼 건물과 도로조건이 달라질 수 있습니다. 이동거리가 짧더라도 양쪽 주소의 층수, 주차와 차량 접근조건을 각각 확인하는 것이 좋습니다.`,
    `${district} 내 이사라도 생활권이 달라지면 이동시간과 주차조건이 달라질 수 있습니다. 출발지와 도착지의 건물 형태와 차량 정차 위치를 같은 기준으로 비교하세요.`,
    `${district} 안에서 가까운 거리로 옮기더라도 운반거리와 엘리베이터·계단 조건이 다르면 작업시간이 크게 달라질 수 있습니다. 두 주소의 현장조건을 따로 확인하는 것이 좋습니다.`
  ];
  const typeList=type==="군"?countyAnswers:type==="구"?districtAnswers:cityAnswers;
  const typeQuestion=type==="군"?`${district} 읍·면이나 외곽으로 이사할 때 무엇을 더 확인해야 하나요?`:type==="구"?`${district} 아파트·오피스텔 이사는 관리사무소에 무엇을 확인해야 하나요?`:`${district} 안에서 이동하는 이사도 지역 조건을 따로 봐야 하나요?`;
  const typeFaq:RegionFaq={question:typeQuestion,answer:typeList[Math.floor(h/7)%typeList.length]};

  const common=[quote,extra,date,moveIn,utility];
  const shift=h%common.length;
  const rotated=[...common.slice(shift),...common.slice(0,shift)];
  return [typeFaq,...(localAreaFaq?[localAreaFaq]:[]),...rotated].slice(0,6);
}
