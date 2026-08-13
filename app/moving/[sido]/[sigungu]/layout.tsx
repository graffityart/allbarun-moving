import type { ReactNode } from "react";
import { getDistrictRegion } from "@/lib/regions";
import { getRegionFaq } from "@/lib/region-faq";

type Props = {
  children: ReactNode;
  params: Promise<{ sido: string; sigungu: string }>;
};

export default async function DistrictLayout({ children, params }: Props) {
  const { sido, sigungu } = await params;
  const data = getDistrictRegion(sido, sigungu);
  if (!data) return children;

  const { region, district } = data;
  const faqs = getRegionFaq(region.name, district);
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com").replace(/\/$/, "");
  const pageUrl = `${base}/moving/${encodeURIComponent(sido)}/${encodeURIComponent(district)}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "홈", item: base },
      { "@type": "ListItem", position: 2, name: `${region.name} 이사`, item: `${base}/#region` },
      { "@type": "ListItem", position: 3, name: `${district} 이사`, item: pageUrl },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {children}
      <section className="section region-faq-section" aria-labelledby="region-faq-title">
        <div className="wrap">
          <span className="eyebrow">자주 묻는 질문</span>
          <h2 className="section-title" id="region-faq-title">{district} 이사 준비 FAQ</h2>
          <p className="section-desc">{region.name} {district}에서 이사 날짜와 업체를 비교할 때 자주 확인하는 내용을 간단히 정리했습니다.</p>
          <div className="region-faq-list">
            {faqs.map((faq, index) => (
              <details className="region-faq-item" key={faq.question} open={index === 0}>
                <summary><span>Q</span>{faq.question}</summary>
                <div className="region-faq-answer"><span>A</span><p>{faq.answer}</p></div>
              </details>
            ))}
          </div>
          <div className="region-faq-cta">
            <div><strong>{district} 이사 조건을 확인하셨나요?</strong><p>날짜·출발지·도착지·작업조건을 입력해 비교견적을 시작할 수 있습니다.</p></div>
            <a href={`/estimate?region=${encodeURIComponent(region.name)}&district=${encodeURIComponent(district)}`}>{district} 비교견적 받기</a>
          </div>
        </div>
      </section>
    </>
  );
}
