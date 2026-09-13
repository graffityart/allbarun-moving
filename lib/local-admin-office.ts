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
