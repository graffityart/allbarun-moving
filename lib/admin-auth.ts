import { timingSafeEqual } from "node:crypto";

export function isAdminApiConfigured(){return Boolean(process.env.ADMIN_API_KEY)}

export function verifyAdminRequest(request:Request){
  const expected=process.env.ADMIN_API_KEY;
  if(!expected)return false;
  const supplied=request.headers.get("x-admin-key")||"";
  const a=Buffer.from(expected);const b=Buffer.from(supplied);
  if(a.length!==b.length)return false;
  return timingSafeEqual(a,b);
}
