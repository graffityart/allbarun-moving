import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "올바른이사",
    short_name: "올바른이사",
    description: "전국 지역별 이사 준비 정보와 이사업체 비교견적 플랫폼",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f9fc",
    theme_color: "#155eef",
    lang: "ko-KR",
  };
}
