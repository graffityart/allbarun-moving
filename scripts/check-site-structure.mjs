import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const required=[
  'app/page.tsx','app/estimate/page.tsx','app/moving/page.tsx','app/moving/[sido]/page.tsx','app/moving/[sido]/[sigungu]/page.tsx',
  'app/service/page.tsx','app/service/[slug]/page.tsx','app/guide/page.tsx','app/guide/moving-checklist/page.tsx','app/guide/address-change/page.tsx',
  'app/guide/registry/page.tsx','app/guide/utilities/page.tsx','app/privacy/page.tsx','app/terms/page.tsx','app/sitemap.ts','app/robots.ts'
];
const missing=required.filter(p=>!fs.existsSync(path.join(root,p)));
const issues=[];
if(missing.length) issues.push(`필수 라우트 누락: ${missing.join(', ')}`);

const sitemap=fs.readFileSync(path.join(root,'app/sitemap.ts'),'utf8');
const sitemapExpected=['/estimate','/moving','/service','/guide','/guide/moving-checklist','/guide/address-change','/guide/registry','/guide/utilities','/service/packing-moving','/service/studio-moving','/service/general-moving','/service/office-moving'];
for(const route of sitemapExpected){if(!sitemap.includes(route))issues.push(`sitemap 누락 가능성: ${route}`)}

const robots=fs.readFileSync(path.join(root,'app/robots.ts'),'utf8');
for(const route of ['/admin/','/api/']){if(!robots.includes(route))issues.push(`robots 차단 누락: ${route}`)}

const service=fs.readFileSync(path.join(root,'lib/service-content.ts'),'utf8');
for(const slug of ['packing-moving','studio-moving','general-moving','office-moving']){if(!service.includes(`"${slug}"`))issues.push(`서비스 데이터 누락: ${slug}`)}

if(issues.length){console.error('\n사이트 구조 점검 실패\n- '+issues.join('\n- '));process.exit(1)}
console.log('사이트 구조 점검 통과: 주요 라우트, sitemap, robots, 서비스 데이터가 확인되었습니다.');
