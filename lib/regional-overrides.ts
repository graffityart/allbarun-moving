import type { LocalGuide } from "@/lib/district-content";
import { getRegionalOverrideExtra } from "@/lib/regional-overrides-extra";
import { getRegionalOverrideThird } from "@/lib/regional-overrides-third";
import { getRegionalOverrideExtra3 } from "@/lib/regional-overrides-extra3";
import { getChungbukExtraGuide } from "@/lib/regional-overrides-chungbuk-extra";

const overrides:Record<string,Record<string,LocalGuide>>={
"강원":{"속초시":{localIntro:"속초시는 설악산과 동해, 청초호·영랑호가 가까운 관광도시라 도심 공동주택과 관광·숙박 생활권, 외곽 저층주거의 이동조건이 서로 다릅니다. 이사 날짜가 주말·휴가철과 겹치면 관광교통이 늘 수 있어 도착시간을 넉넉하게 잡고, 해안권은 강풍·비 예보도 함께 확인하는 편이 좋습니다.",localChecklist:["노학·조양권 아파트는 관리사무소 이사시간과 엘리베이터 예약 확인","중앙·청호·대포 등 관광·상업생활권은 주말 차량정체와 정차 가능 위치 확인","설악동·외곽권은 대형차 진입도로와 회차공간 확인","해안권은 강풍·강수 예보와 가구 방수 포장 여부 확인"],movingNote:"속초는 산·바다·호수가 가까워 도심 이동거리는 길지 않아도 관광 성수기와 주말에는 주요 도로 체감 이동시간이 달라질 수 있습니다. 견적을 받을 때는 평일·주말 작업시간, 차량 정차 위치와 현관까지의 운반거리, 고층 공동주택의 엘리베이터 예약 여부를 함께 전달하세요.",officeNote:"숙박·관광·상업시설 이전은 영업시간과 고객 동선을 피하고, 장비 반입을 위한 정차 위치와 화물 이동경로를 사전에 확인하는 것이 좋습니다.",neighborhoods:[{name:"조양·청호 생활권",note:"공동주택과 해안 생활권이 가까워 단지 차량동선과 주말 관광교통을 함께 확인하세요.",tags:["공동주택","해안","주말교통"]},{name:"교동·노학 생활권",note:"도심 주거와 상업시설이 섞여 있어 주차 위치와 엘리베이터 사용시간을 미리 확인하는 편이 좋습니다.",tags:["도심","주차","엘리베이터"]},{name:"중앙·동명 생활권",note:"관광객과 상업시설 이용이 많은 구간은 차량 정차시간과 상하차 위치가 작업시간에 영향을 줄 수 있습니다.",tags:["상업권","관광","정차"]},{name:"설악·외곽 생활권",note:"산지·외곽 주거는 도로 폭, 경사와 대형차 회차 가능 여부를 견적 전에 확인하세요.",tags:["외곽","경사","진입로"]}]}}
};
export function getRegionalOverride(region:string,district:string):LocalGuide|undefined{return overrides[region]?.[district]??getRegionalOverrideExtra(region,district)??getRegionalOverrideThird(region,district)??getRegionalOverrideExtra3(region,district)??getChungbukExtraGuide(region,district);}
