const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

export function isSupabaseConfigured(){return Boolean(url && key)}

export async function supabaseRequest(path:string, init:RequestInit={}){
  if(!url || !key) throw new Error("SUPABASE_NOT_CONFIGURED");
  const response = await fetch(`${url.replace(/\/$/,"")}/rest/v1/${path}`, {
    ...init,
    headers:{
      apikey:key,
      Authorization:`Bearer ${key}`,
      "Content-Type":"application/json",
      Prefer:"return=representation",
      ...(init.headers||{})
    },
    cache:"no-store"
  });
  const text=await response.text();
  const data=text?JSON.parse(text):null;
  if(!response.ok) throw new Error(data?.message || data?.hint || `SUPABASE_${response.status}`);
  return data;
}
