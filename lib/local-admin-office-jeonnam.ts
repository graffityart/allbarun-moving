import type { LocalAdminOffice } from "@/lib/local-admin-office";

export const jeonnamAdminOffices: Record<string, LocalAdminOffice> = {
  "전남|무안군": {officeName:"무안읍사무소",address:"전라남도 무안군 무안읍 성내1길 2",homepage:"https://www.muan.go.kr/",homepageLabel:"무안군 공식 홈페이지",note:"무안군은 무안읍·일로읍·삼향읍과 각 면별 관할 행정기관이 다르므로 실제 전입 주소 기준으로 확인하세요."},
  "전남|해남군": {officeName:"해남읍사무소",address:"전라남도 해남군 해남읍 남부순환로 114",homepage:"https://www.haenam.go.kr/",homepageLabel:"해남군 공식 홈페이지",note:"해남군 안에서도 해남읍이 아닌 면 지역으로 전입하는 경우 해당 면사무소를 별도로 확인하세요."},
  "전남|화순군": {officeName:"화순읍행정복지센터",address:"전라남도 화순군 화순읍 중앙로 20-4",homepage:"https://www.hwasun.go.kr/contents.do?S=S01&M=070201010000",homepageLabel:"화순군 공식 화순읍 안내",note:"화순군의 실제 전입 주소가 화순읍이 아닌 경우 해당 면 행정복지센터를 확인하세요."},
  "전남|담양군": {officeName:"담양읍사무소",address:"전라남도 담양군 담양읍 중앙로 83",homepage:"https://www.damyang.go.kr/",homepageLabel:"담양군 공식 홈페이지",note:"담양군은 담양읍과 각 면별 관할 행정기관이 다르므로 실제 전입 주소를 기준으로 확인하세요."},
  "전남|장흥군": {officeName:"장흥읍행정복지센터",address:"전라남도 장흥군 장흥읍 칠거리예양로 83",homepage:"https://www.jangheung.go.kr/www/organization/introduction/organization_chart?view=list&part=33",homepageLabel:"장흥군 공식 장흥읍 조직 안내",note:"장흥군 내 장평·장동·유치·회진 등 다른 면으로 전입하는 경우 해당 행정복지센터를 확인하세요."}
};
