import type { LocalAdminOffice } from "@/lib/local-admin-office";

export const jeonnamAdminOffices: Record<string, LocalAdminOffice> = {
  "전남|무안군": {
    officeName: "무안읍사무소",
    address: "전라남도 무안군 무안읍 성내1길 2",
    homepage: "https://www.muan.go.kr/",
    homepageLabel: "무안군 공식 홈페이지",
    note: "무안군은 무안읍·일로읍·삼향읍과 각 면별 관할 행정기관이 다르므로 실제 전입 주소 기준으로 확인하세요.",
  },
  "전남|해남군": {
    officeName: "해남읍사무소",
    address: "전라남도 해남군 해남읍 남부순환로 114",
    homepage: "https://www.haenam.go.kr/",
    homepageLabel: "해남군 공식 홈페이지",
    note: "해남군 안에서도 해남읍이 아닌 면 지역으로 전입하는 경우 해당 면사무소를 별도로 확인하세요.",
  },
};
