import "server-only";
import fs from "node:fs";
import path from "node:path";

// 지역 상세 페이지 미디어 파일명 규칙
// 이미지: public/images/regions/{sido}/{district}/hero.webp
// 영상:   public/images/regions/{sido}/{district}/hero.mp4
// 앞으로 main 브랜치의 위 폴더 구조만 사용합니다.

const CHOSEONG=["g","kk","n","d","tt","r","m","b","pp","s","ss","","j","jj","ch","k","t","p","h"];
const JUNGSEONG=["a","ae","ya","yae","eo","e","yeo","ye","o","wa","wae","oe","yo","u","wo","we","wi","yu","eu","ui","i"];
const JONGSEONG=["","g","kk","gs","n","nj","nh","d","l","lg","lm","lb","ls","lt","lp","lh","m","b","bs","s","ss","ng","j","ch","k","t","p","h"];

function romanizeHangul(value:string){
  let out="";
  for(const ch of value.normalize("NFC")){
    const code=ch.charCodeAt(0);
    if(code>=0xac00&&code<=0xd7a3){
      const syllable=code-0xac00;
      const initial=Math.floor(syllable/588);
      const medial=Math.floor((syllable%588)/28);
      const final=syllable%28;
      out+=CHOSEONG[initial]+JUNGSEONG[medial]+JONGSEONG[final];
    }else if(/[a-zA-Z0-9]/.test(ch)) out+=ch.toLowerCase();
    else out+="-";
  }
  return out.replace(/-+/g,"-").replace(/^-|-$/g,"");
}

const districtSlugOverrides:Record<string,string>={
  "강남구":"gangnam","강동구":"gangdong","강북구":"gangbuk","강서구":"gangseo","관악구":"gwanak","광진구":"gwangjin","구로구":"guro","금천구":"geumcheon","노원구":"nowon","도봉구":"dobong","동대문구":"dongdaemun","동작구":"dongjak","마포구":"mapo","서대문구":"seodaemun","서초구":"seocho","성동구":"seongdong","성북구":"seongbuk","송파구":"songpa","양천구":"yangcheon","영등포구":"yeongdeungpo","용산구":"yongsan","은평구":"eunpyeong","종로구":"jongno","중구":"junggu","중랑구":"jungnang",
  "수원시":"suwon","성남시":"seongnam","고양시":"goyang","용인시":"yongin","부천시":"bucheon","안산시":"ansan","안양시":"anyang","남양주시":"namyangju","화성시":"hwaseong","평택시":"pyeongtaek","의정부시":"uijeongbu","시흥시":"siheung","파주시":"paju","김포시":"gimpo","광명시":"gwangmyeong","광주시":"gwangju","군포시":"gunpo","이천시":"icheon","양주시":"yangju","오산시":"osan","구리시":"guri","안성시":"anseong","포천시":"pocheon","의왕시":"uiwang","하남시":"hanam","여주시":"yeoju","동두천시":"dongducheon","과천시":"gwacheon","가평군":"gapyeong","양평군":"yangpyeong","연천군":"yeoncheon",
  "해운대구":"haeundae","제주시":"jeju","서귀포시":"seogwipo","세종시":"sejong"
};

export function getDistrictAssetSlug(district:string){return districtSlugOverrides[district]||romanizeHangul(district).replace(/(si|gun|gu)$/,'')}

function publicFileExists(relativePath:string){return fs.existsSync(path.join(process.cwd(),"public",relativePath.replace(/^\//,"")))}

export function getRegionHeroImage(sido:string,district:string){
  const slug=getDistrictAssetSlug(district);
  const standard=`/images/regions/${sido}/${slug}/hero.webp`;
  return publicFileExists(standard)?standard:"";
}

export function getRegionHeroVideo(sido:string,district:string){
  const slug=getDistrictAssetSlug(district);
  const standard=`/images/regions/${sido}/${slug}/hero.mp4`;
  return publicFileExists(standard)?standard:"";
}
