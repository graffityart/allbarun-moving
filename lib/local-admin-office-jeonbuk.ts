import type { LocalAdminOffice } from "@/lib/local-admin-office";

export const jeonbukAdminOffices: Record<string, LocalAdminOffice> = {
  "전북|순창군": {
    officeName: "순창읍행정복지센터",
    address: "전북특별자치도 순창군 순창읍 장류로 407-7",
    homepage: "https://www.sunchang.go.kr/town",
    homepageLabel: "순창군 공식 읍면 포털",
    note: "순창군 안에서도 실제 전입 주소에 따라 관할 읍·면 행정복지센터가 달라집니다.",
  },
  "전북|무주군": {
    officeName: "무주읍행정복지센터",
    address: "전북특별자치도 무주군 무주읍 향학로 49",
    homepage: "https://tour.muju.go.kr/tour/contents.do?key=114",
    homepageLabel: "무주군 공식 행정복지센터 안내",
    note: "무주군 내 전입 주소가 무주읍이 아닌 경우 해당 면 행정복지센터를 확인하세요.",
  },
  "전북|진안군": {
    officeName: "진안읍행정복지센터",
    address: "전북특별자치도 진안군 진안읍 대성길 3",
    homepage: "https://www.jinan.go.kr/town/index.jinan?menuCd=DOM_000000301001005000",
    homepageLabel: "진안군 공식 진안읍행정복지센터 안내",
    note: "진안군 내 실제 전입 주소가 다른 면이면 해당 면 행정복지센터를 이용해야 합니다.",
  },
  "전북|완주군": {
    officeName: "용진읍행정복지센터",
    address: "전북특별자치도 완주군 용진읍 완주로 210",
    homepage: "https://www.wanju.go.kr/index.9is?contentUid=ff8080818b024d8e018b274f82502d20",
    homepageLabel: "완주군 공식 읍·면 안내",
    note: "완주군은 삼례읍·봉동읍·용진읍·이서면 등 전입 주소에 따라 관할 행정복지센터가 달라집니다.",
  },
  "전북|고창군": {
    officeName: "고창읍행정복지센터",
    address: "전북특별자치도 고창군 고창읍 중앙로 330",
    homepage: "https://www.gochang.go.kr/",
    homepageLabel: "고창군 공식 홈페이지",
    note: "고창군 안에서도 실제 전입 주소가 고창읍이 아닌 경우 해당 면 행정복지센터를 확인하세요.",
  },
  "전북|부안군": {
    officeName: "부안읍행정복지센터",
    address: "전북특별자치도 부안군 부안읍 석정로 182",
    homepage: "https://www.buan.go.kr/town/",
    homepageLabel: "부안군 공식 읍·면 홈페이지",
    note: "부안군은 부안읍과 각 면별 관할 행정복지센터가 다르므로 실제 전입 주소 기준으로 확인하세요.",
  },
};
