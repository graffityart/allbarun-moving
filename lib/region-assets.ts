// 지역 상세 페이지 미디어 파일명 규칙
// 이미지: public/images/regions/{sido}-{district}-moving.webp
// 영상:   public/videos/{sido}-{district}-moving.mp4
//
// 예: seoul-gangnam-moving.webp / seoul-gangnam-moving.mp4
// 기존 강남 파일은 호환성을 위해 별도 경로를 유지합니다.

const districtSlugs: Record<string,string> = {
  "강남구":"gangnam","강동구":"gangdong","강북구":"gangbuk","강서구":"gangseo","관악구":"gwanak","광진구":"gwangjin","구로구":"guro","금천구":"geumcheon","노원구":"nowon","도봉구":"dobong","동대문구":"dongdaemun","동작구":"dongjak","마포구":"mapo","서대문구":"seodaemun","서초구":"seocho","성동구":"seongdong","성북구":"seongbuk","송파구":"songpa","양천구":"yangcheon","영등포구":"yeongdeungpo","용산구":"yongsan","은평구":"eunpyeong","종로구":"jongno","중랑구":"jungnang",
};

function fallbackDistrictSlug(district:string){
  return district
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9가-힣]+/g,"-")
    .replace(/^-+|-+$/g,"")
    .toLowerCase();
}

export function getDistrictAssetSlug(district:string){return districtSlugs[district]||fallbackDistrictSlug(district)}
export function getRegionHeroFilename(sido:string,district:string){return `${sido}-${getDistrictAssetSlug(district)}-moving.webp`}
export function getRegionVideoFilename(sido:string,district:string){return `${sido}-${getDistrictAssetSlug(district)}-moving.mp4`}

// 현재 실제 업로드된 대표 이미지 목록입니다. 새 파일을 올린 뒤 여기에 경로를 추가하면 노출됩니다.
// 파일이 없는 지역은 placeholder를 유지해 깨진 이미지가 노출되지 않도록 합니다.
export const regionHeroImages:Record<string,string>={
  "seoul/강남구":"/images/regions/gangnam-moving.webp",
};

export function getRegionHeroImage(sido:string,district:string){return regionHeroImages[`${sido}/${district}`]||""}
