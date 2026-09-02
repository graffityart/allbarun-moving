import type { Metadata } from "next";
import "./globals.css";
import "./footer.css";
import "./region.css";
import "./region-faq.css";
import "./home.css";
import "./mobile-polish.css";
import "./hub-polish.css";
import "./region-hub.css";
import "./gangnam-animation.css";
const siteUrl=(process.env.NEXT_PUBLIC_SITE_URL||"https://5km.kr").replace(/\/$/,"");
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:"올바른이사 | 전국 이사업체 비교견적",template:"%s | 올바른이사"},description:"포장이사, 원룸이사, 일반이사, 사무실이사를 지역별 특성과 함께 비교하고 손없는날, 날씨, 전입신고, 생활요금 이전 등 실제 이사 준비 정보를 확인하세요.",applicationName:"올바른이사",category:"이사 비교견적",verification:{google:"xPb0wgUa5IcVIicnc-AxGeq0oz5NPejG3odGfHUPlTI",other:{"naver-site-verification":"f57283eb011d0b1e8a65af9001de43292c180a3d"}},robots:{index:true,follow:true},alternates:{canonical:"/"},openGraph:{title:"올바른이사 | 전국 이사업체 비교견적",description:"지역별 이사 조건과 손없는날·날씨, 생활정보까지 함께 확인하고 이사업체 견적을 비교하세요.",url:siteUrl,type:"website",locale:"ko_KR",siteName:"올바른이사"},twitter:{card:"summary_large_image",title:"올바른이사 | 전국 이사업체 비교견적",description:"지역별 이사 조건과 손없는날·날씨, 생활정보를 확인하고 이사업체 견적을 비교하세요."}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){const website={"@context":"https://schema.org","@type":"WebSite",name:"올바른이사",url:siteUrl,inLanguage:"ko-KR",description:"전국 지역별 이사 준비 정보와 이사업체 비교견적 플랫폼"};const org={"@context":"https://schema.org","@type":"Organization",name:"올바른이사",url:siteUrl};return <html lang="ko"><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(website)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(org)}}/>{children}</body></html>}
