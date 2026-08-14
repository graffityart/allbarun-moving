export type RegionFaq = { question: string; answer: string };

function hash(text:string){return[...text].reduce((sum,ch)=>sum+ch.charCodeAt(0),0)}
function districtType(district:string){if(district.endsWith("군"))return"군";if(district.endsWith("구"))return"구";if(district.endsWith("시"))return"시";return"기타"}

export function getRegionFaq(regionName: string, district: string): RegionFaq[] {
  const h=hash(`${regionName}-${district}-faq`);const type=districtType(district);
  const quoteQuestions=[`${district} 포장이사 견적은 어떤 항목부터 비교해야 하나요?`,`${district} 이사업체 견적을 받을 때 가격 외에 무엇을 봐야 하나요?`,`${district}에서 포장이사 업체를 비교할 때 중요한 조건은 무엇인가요?`];
  const extraQuestions=[`${district} 이사에서 추가비용이 생기기 쉬운 경우는 언제인가요?`,`${district} 이사 견적이 현장에서 달라지는 이유는 무엇인가요?`,`${district} 이삿날 예상하지 못한 추가작업을 줄이려면 어떻게 하나요?`];
  const dateQuestions=[`${district} 손없는날에 꼭 이사해야 하나요?`,`${district} 이사 날짜는 손없는날과 날씨 중 무엇을 먼저 봐야 하나요?`,`${district} 이사 날짜를 정할 때 함께 확인할 조건은 무엇인가요?`];
  const quote:RegionFaq={question:quoteQuestions[h%quoteQuestions.length],answer:`${district} 이사는 총액만 보기보다 작업 인원, 차량 톤수, 포장·정리 범위, 사다리차 또는 엘리베이터 비용, 차량 정차 위치에서 현관까지의 운반거리와 당일 추가금 기준을 나눠 확인하는 것이 좋습니다.`};
  const extra:RegionFaq={question:extraQuestions[(h+1)%extraQuestions.length],answer:`계약 당시보다 짐이 늘거나 차량이 건물 가까이 진입하지 못하는 경우, 계단 작업이나 대형가구 분해·조립이 새로 필요한 경우에는 비용이 달라질 수 있습니다. ${district} 출발지와 도착지의 실제 작업조건을 사진과 함께 미리 전달하면 비교가 쉬워집니다.`};
  const date:RegionFaq={question:dateQuestions[(h+2)%dateQuestions.length],answer:`손없는날은 전통적인 날짜 선택 기준으로 참고할 수 있지만 반드시 그날 이사해야 하는 것은 아닙니다. 예약 가능 여부, 견적, ${district} 지역 날씨, 엘리베이터 예약시간과 교통상황을 함께 비교해 날짜를 정하는 것이 실용적입니다.`};
  const moveIn:RegionFaq={question:`${district}로 이사한 뒤 전입신고는 어떻게 준비하나요?`,answer:`온라인 신청은 정부24의 최신 안내를 확인할 수 있고 방문이 필요한 경우 새 주소지 관할 행정복지센터의 준비사항을 확인하는 것이 좋습니다. 임차인이라면 전입신고와 함께 계약 주소와 등기사항증명서의 권리관계도 별도로 확인하세요.`};
  const utility:RegionFaq={question:`${district} 이사 전 전기와 도시가스는 언제 신청하는 것이 좋나요?`,answer:`전기는 한국전력의 공식 이사 관련 안내를, 도시가스는 ${regionName} ${district} 새 주소를 기준으로 실제 공급회사를 확인하는 것이 먼저입니다. 출발지 정산과 도착지 연결 예약이 필요한지 이사 전에 각 공식 고객센터에서 확인하세요.`};
  const typeFaq:RegionFaq=type==="군"?{question:`${district} 읍·면이나 외곽으로 이사할 때 무엇을 더 확인해야 하나요?`,answer:`군 지역은 같은 ${district} 안에서도 실제 주행거리와 도로 폭, 대형차 회차공간이 달라질 수 있습니다. 차량이 집 앞까지 들어갈 수 있는지, 정차지에서 현관까지 추가 운반이 필요한지를 사진으로 업체에 미리 전달하는 것이 좋습니다.`}:type==="구"?{question:`${district} 아파트·오피스텔 이사는 관리사무소에 무엇을 확인해야 하나요?`,answer:`공동주택이나 오피스텔은 이사 가능시간, 엘리베이터 예약, 보양, 이사차량 지정 위치와 지하주차장 높이 제한이 건물마다 다를 수 있습니다. ${district}의 출발지와 도착지 관리주체에 각각 확인하세요.`}:{question:`${district} 안에서 이동하는 이사도 지역 조건을 따로 봐야 하나요?`,answer:`같은 ${district} 안에서도 도심과 외곽, 공동주택과 저층주거처럼 건물과 도로조건이 달라질 수 있습니다. 이동거리가 짧더라도 양쪽 주소의 층수, 주차와 차량 접근조건을 각각 확인하는 것이 좋습니다.`};
  const common=[quote,extra,date,moveIn,utility];const shift=h%common.length;const rotated=[...common.slice(shift),...common.slice(0,shift)];return[typeFaq,...rotated].slice(0,6);
}
