import { jeonbukAdminOffices } from "@/lib/local-admin-office-jeonbuk";

export type LocalAdminOffice = {
  officeName: string;
  address: string;
  homepage: string;
  homepageLabel: string;
  note?: string;
};

const GOVERNMENT_DIRECTORY = "https://www.gov.kr/portal/orgSite";

const overrides: Record<string, LocalAdminOffice> = {
  "경남|하동군": {
    officeName: "하동읍사무소",
    address: "경상남도 하동군 하동읍 중앙로 70",
    homepage: "https://www.hadong.go.kr/intro/00668.web",
    homepageLabel: "하동군 공식 읍면 안내",
    note: "하동군 안에서도 실제 전입 주소에 따라 관할 읍·면사무소가 달라질 수 있습니다.",
  },
  "경남|산청군": {
    officeName: "산청읍행정복지센터",
    address: "경상남도 산청군 산청읍 산엔청로 42",
    homepage: "https://www.sancheong.go.kr/edu/courseView.do?course=326&key=51",
    homepageLabel: "산청군 공식 산청읍행정복지센터 정보",
    note: "산청군 내 전입 주소가 산청읍이 아닌 경우 해당 면사무소·행정복지센터를 별도로 확인하세요.",
  },
  "경남|거창군": {
    officeName: "거창읍행정복지센터",
    address: "경상남도 거창군 거창읍 거열로 90",
    homepage: "https://www.geochang.go.kr/00314/01468/01494.web",
    homepageLabel: "거창군 공식 거창읍 누리집",
    note: "거창군은 읍·면별 관할 행정기관이 다르므로 실제 전입 주소 기준으로 확인하세요.",
  },
  "경남|합천군": {
    officeName: "합천읍사무소",
    address: "경상남도 합천군 합천읍 중앙로 61",
    homepage: "https://gpki.hc.go.kr/CLRecords/Files/FileAppendix/a7/A004299.pdf",
    homepageLabel: "합천군 공식 읍·면사무소 소재지 안내",
    note: "합천군 내 전입 주소가 합천읍이 아닌 경우 실제 읍·면사무소 주소를 공식 안내에서 확인하세요.",
  },
  "경남|남해군": {
    officeName: "남해읍행정복지센터",
    address: "경상남도 남해군 남해읍 망운로9번길 12",
    homepage: "https://www.namhae.go.kr/portal/Index.do?c=WW0512010403",
    homepageLabel: "남해군 공식 남해읍행정복지센터 안내",
    note: "남해군의 실제 관할 센터는 남해읍·이동면·상주면 등 전입 주소에 따라 달라집니다.",
  },
  "경남|의령군": {
    officeName: "의령읍사무소",
    address: "경상남도 의령군 의령읍 의병로19길 15",
    homepage: "https://uiryeong.go.kr/index.uiryeong?menuCd=DOM_000000205007001010",
    homepageLabel: "의령군 공식 의령읍사무소 안내",
    note: "의령군 안에서도 실제 전입 주소가 다른 면이면 해당 면사무소를 이용해야 합니다.",
  },
  ...jeonbukAdminOffices,
};

export function getLocalAdminOffice(regionName: string, district: string): LocalAdminOffice {
  const key = `${regionName}|${district}`;
  const matched = overrides[key];
  if (matched) return matched;

  return {
    officeName: `${district} 관할 행정복지센터`,
    address: "전입할 읍·면·동에 따라 관할 센터 주소가 달라집니다.",
    homepage: GOVERNMENT_DIRECTORY,
    homepageLabel: "정부24 지자체·기관 누리집 찾기",
    note: `${district} 페이지에서는 대표 주소를 임의로 표시하지 않고, 실제 전입 주소 기준 관할 행정복지센터를 공식 기관 안내에서 확인하도록 연결합니다.`,
  };
}
