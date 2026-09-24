import type { MetadataRoute } from "next";
import { regionProfiles } from "@/lib/regions";
import { getDistrictGuide } from "@/lib/district-content";
import { getGyeonggiGuide } from "@/lib/gyeonggi-content";
import { getIncheonGuide } from "@/lib/incheon-content";
import { getBusanGuide } from "@/lib/busan-content";
import { getDaeguGuide } from "@/lib/daegu-content";
import { getDaejeonGuide } from "@/lib/daejeon-content";
import { getGwangjuGuide } from "@/lib/gwangju-content";
import { getUlsanGuide } from "@/lib/ulsan-content";
import { getRemainingRegionGuide } from "@/lib/remaining-regions-content";
import { getRegionalOverride } from "@/lib/regional-overrides";

function hasLocalGuide(region:string,district:string){
 return Boolean(getRegionalOverride(region,district)??(region==="서울"?getDistrictGuide(region,district):region==="경기"?getGyeonggiGuide(district):region==="인천"?getIncheonGuide(district):region==="부산"?getBusanGuide(district):region==="대구"?getDaeguGuide(district):region==="대전"?getDaejeonGuide(district):region==="광주"?getGwangjuGuide(district):region==="울산"?getUlsanGuide(district):getRemainingRegionGuide(region,district)));
}

const SITE_UPDATED=new Date("2026-09-25T00:00:00+09:00");
const REGION_UPDATED=new Date("2026-09-25T00:00:00+09:00");
const GUIDE_UPDATED=new Date("2026-08-25T00:00:00+09:00");

export default function sitemap():MetadataRoute.Sitemap{
 const base=(process.env.NEXT_PUBLIC_SITE_URL||"https://5km.kr").replace(/\/$/,"");
 const core:MetadataRoute.Sitemap=[
  {url:base,lastModified:SITE_UPDATED,changeFrequency:"weekly",priority:1},
  {url:`${base}/moving`,lastModified:REGION_UPDATED,changeFrequency:"weekly",priority:.9},
  {url:`${base}/service`,lastModified:GUIDE_UPDATED,changeFrequency:"monthly",priority:.88},
  {url:`${base}/guide`,lastModified:GUIDE_UPDATED,changeFrequency:"monthly",priority:.86},
  {url:`${base}/guide/moving-checklist`,lastModified:GUIDE_UPDATED,changeFrequency:"monthly",priority:.82},
  {url:`${base}/guide/address-change`,lastModified:GUIDE_UPDATED,changeFrequency:"monthly",priority:.82},
  {url:`${base}/guide/registry`,lastModified:GUIDE_UPDATED,changeFrequency:"monthly",priority:.82},
  {url:`${base}/guide/utilities`,lastModified:GUIDE_UPDATED,changeFrequency:"monthly",priority:.8},
  {url:`${base}/service/packing-moving`,lastModified:GUIDE_UPDATED,changeFrequency:"monthly",priority:.86},
  {url:`${base}/service/studio-moving`,lastModified:GUIDE_UPDATED,changeFrequency:"monthly",priority:.84},
  {url:`${base}/service/general-moving`,lastModified:GUIDE_UPDATED,changeFrequency:"monthly",priority:.82},
  {url:`${base}/service/office-moving`,lastModified:GUIDE_UPDATED,changeFrequency:"monthly",priority:.84},
  {url:`${base}/privacy`,lastModified:GUIDE_UPDATED,changeFrequency:"yearly",priority:.25},
  {url:`${base}/terms`,lastModified:GUIDE_UPDATED,changeFrequency:"yearly",priority:.2},
 ];
 const provinceHubs:MetadataRoute.Sitemap=regionProfiles.map(region=>({url:`${base}/moving/${region.slug}`,lastModified:REGION_UPDATED,changeFrequency:"weekly" as const,priority:.84}));
 const regional:MetadataRoute.Sitemap=regionProfiles.flatMap(region=>region.districts.filter(district=>hasLocalGuide(region.name,district)).map(district=>({url:`${base}/moving/${region.slug}/${encodeURIComponent(district)}`,lastModified:REGION_UPDATED,changeFrequency:"weekly" as const,priority:.78})));
 return [...core,...provinceHubs,...regional];
}
