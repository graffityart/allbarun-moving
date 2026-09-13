import type { LocalGuide } from "@/lib/district-content";
import { getRegionalOverrideExtra2 } from "@/lib/regional-overrides-extra2";
import { getSouthernRegionalOverride } from "@/lib/regional-overrides-south";

export function getRegionalOverrideThird(region:string,district:string):LocalGuide|undefined{
  const existing=getRegionalOverrideExtra2(region,district);
  if(existing)return existing;
  return getSouthernRegionalOverride(region,district);
}
