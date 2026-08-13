import { NextResponse } from "next/server";
import { isSupabaseConfigured, supabaseRequest } from "@/lib/supabase-rest";

function makeReceipt(){
  const now=new Date();
  const date=`${now.getFullYear()}${String(now.getMonth()+1).padStart(2,"0")}${String(now.getDate()).padStart(2,"0")}`;
  return `MV-${date}-${Math.random().toString(36).slice(2,8).toUpperCase()}`;
}

export async function POST(request:Request){
  try{
    const body=await request.json();
    const phone=String(body.phone||"").replace(/\s/g,"");
    if(!body.movingType||!body.originSido||!body.originDistrict||!body.destinationSido||!body.destinationDistrict||!body.movingDate||!String(body.name||"").trim()||!/^01[0-9]-?\d{3,4}-?\d{4}$/.test(phone)||body.privacyAgreed!==true){
      return NextResponse.json({ok:false,message:"필수 입력값을 확인해주세요."},{status:400});
    }
    if(!isSupabaseConfigured()){
      return NextResponse.json({ok:false,code:"DB_NOT_CONFIGURED",message:"접수 저장 기능 설정이 아직 완료되지 않았습니다."},{status:503});
    }
    const receipt=makeReceipt();
    const rows=await supabaseRequest("moving_estimates",{method:"POST",body:JSON.stringify({receipt_no:receipt,moving_type:body.movingType,origin_sido:body.originSido,origin_district:body.originDistrict,destination_sido:body.destinationSido,destination_district:body.destinationDistrict,moving_date:body.movingDate,options:Array.isArray(body.options)?body.options:[],customer_name:String(body.name).trim(),phone:String(body.phone).trim(),memo:String(body.memo||""),privacy_agreed:true,source:"website",page_path:String(body.pagePath||""),status:"new"})});
    return NextResponse.json({ok:true,receiptNo:rows?.[0]?.receipt_no||receipt});
  }catch(error){
    console.error("estimate-api-error",error);
    return NextResponse.json({ok:false,message:"접수 중 오류가 발생했습니다."},{status:500});
  }
}
