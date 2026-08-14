import type { LocalGuide } from "@/lib/district-content";
import { getRegionalOverrideExtra2 } from "@/lib/regional-overrides-extra2";

export function getRegionalOverrideThird(region:string,district:string):LocalGuide|undefined{
  return getRegionalOverrideExtra2(region,district);
}
