import type { LocalGuide } from "@/lib/district-content";
import { getRegionalOverrideExtra2 } from "@/lib/regional-overrides-extra2";
import { getSouthernRegionalOverride } from "@/lib/regional-overrides-south";
import { getCentralRegionalOverride } from "@/lib/regional-overrides-central";

export function getRegionalOverrideThird(region:string,district:string):LocalGuide|undefined{
  const existing=getRegionalOverrideExtra2(region,district);
  if(existing)return existing;
  const southern=getSouthernRegionalOverride(region,district);
  if(southern)return southern;
  return getCentralRegionalOverride(region,district);
}
