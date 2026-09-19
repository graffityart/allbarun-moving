import type { MetadataRoute } from "next";
import { regionProfiles } from "@/lib/regions";

const SITE_UPDATED = new Date("2026-09-13T00:00:00+09:00");
const REGION_UPDATED = new Date("2026-09-20T00:00:00+09:00");
const GUIDE_UPDATED = new Date("2026-08-25T00:00:00+09:00");

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://5km.kr").replace(/\/$/, "");

  const core: MetadataRoute.Sitemap = [
    { url: base, lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/moving`, lastModified: REGION_UPDATED, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/service`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.88 },
    { url: `${base}/guide`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.86 },
    { url: `${base}/guide/moving-checklist`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.82 },
    { url: `${base}/guide/address-change`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.82 },
    { url: `${base}/guide/registry`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.82 },
    { url: `${base}/guide/utilities`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/service/packing-moving`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.86 },
    { url: `${base}/service/studio-moving`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.84 },
    { url: `${base}/service/general-moving`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.82 },
    { url: `${base}/service/office-moving`, lastModified: GUIDE_UPDATED, changeFrequency: "monthly", priority: 0.84 },
    { url: `${base}/privacy`, lastModified: GUIDE_UPDATED, changeFrequency: "yearly", priority: 0.25 },
    { url: `${base}/terms`, lastModified: GUIDE_UPDATED, changeFrequency: "yearly", priority: 0.2 },
  ];

  const provinceHubs: MetadataRoute.Sitemap = regionProfiles.map((region) => ({
    url: `${base}/moving/${region.slug}`,
    lastModified: REGION_UPDATED,
    changeFrequency: "monthly" as const,
    priority: 0.82,
  }));

  const regional: MetadataRoute.Sitemap = regionProfiles.flatMap((region) =>
    region.districts.map((district) => ({
      url: `${base}/moving/${region.slug}/${encodeURIComponent(district)}`,
      lastModified: REGION_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
  );

  return [...core, ...provinceHubs, ...regional];
}
