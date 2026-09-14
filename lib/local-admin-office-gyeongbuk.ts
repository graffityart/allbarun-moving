import type { LocalAdminOffice } from "@/lib/local-admin-office";

const GB_DIRECTORY="https://www.gb.go.kr/Main/open_contents/section/archive/page.do?high_dept=5230000&mnu_uid=6864&type=dept";

export const gyeongbukAdminOffices:Record<string,LocalAdminOffice>={
 "경북|예천군":{officeName:"예천읍 행정기관",address:"경상북도 예천군 예천읍 군청앞길 2 (서본리 1-6)",homepage:GB_DIRECTORY,homepageLabel:"경상북도 공식 예천군 읍·면 연락처",note:"예천군은 예천읍·호명읍과 각 면별 관할 기관이 다르므로 실제 전입 주소 기준으로 확인하세요."},
 "경북|의성군":{officeName:"의성읍 행정기관",address:"경상북도 의성군 의성읍 후죽3길 5",homepage:"https://www.gb.go.kr/Main/open_contents/section/archive/page.do?high_dept=5150000&mnu_uid=6864&type=dept",homepageLabel:"경상북도 공식 의성군 읍·면 연락처",note:"의성군은 읍·면별 행정기관이 구분되어 있으므로 의성읍 외 지역은 실제 전입 주소의 면사무소를 확인하세요."},
 "경북|청송군":{officeName:"청송읍 행정기관",address:"경상북도 청송군 청송읍 중앙로 253",homepage:"https://www.gb.go.kr/Main/open_contents/section/archive/page.do?high_dept=5160000&mnu_uid=6864&type=dept",homepageLabel:"경상북도 공식 청송군 읍·면 연락처",note:"청송군은 청송읍·진보면·주왕산면 등 주소지에 따라 담당 행정기관이 달라집니다."},
};
