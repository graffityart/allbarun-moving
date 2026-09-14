import { jeonbukAdminOffices } from "@/lib/local-admin-office-jeonbuk";
import { jeonnamAdminOffices } from "@/lib/local-admin-office-jeonnam";
import { gyeongbukAdminOffices } from "@/lib/local-admin-office-gyeongbuk";
import { gangwonAdminOffices } from "@/lib/local-admin-office-gangwon";
import { gangwonNorthAdminOffices } from "@/lib/local-admin-office-gangwon-north";
import { gangwonEastAdminOffices } from "@/lib/local-admin-office-gangwon-east";
import { gangwonCoastAdminOffices } from "@/lib/local-admin-office-gangwon-coast";
import { chungbukAdminOffices } from "@/lib/local-admin-office-chungbuk";

export type LocalAdminOffice={officeName:string;address:string;homepage:string;homepageLabel:string;note?:string};
const GOVERNMENT_DIRECTORY="https://www.gov.kr/portal/orgSite";
const overrides:Record<string,LocalAdminOffice>={...jeonbukAdminOffices,...jeonnamAdminOffices,...gyeongbukAdminOffices,...gangwonAdminOffices,...gangwonNorthAdminOffices,...gangwonEastAdminOffices,...gangwonCoastAdminOffices,...chungbukAdminOffices};
export function getLocalAdminOffice(regionName:string,district:string):LocalAdminOffice{const matched=overrides[`${regionName}|${district}`];if(matched)return matched;return{officeName:`${district} 관할 행정복지센터`,address:"전입할 읍·면·동에 따라 관할 센터 주소가 달라집니다.",homepage:GOVERNMENT_DIRECTORY,homepageLabel:"정부24 지자체·기관 누리집 찾기",note:`${district} 페이지에서는 실제 전입 주소 기준 관할 행정복지센터를 공식 기관 안내에서 확인하세요.`};}
