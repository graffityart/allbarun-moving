type Props = {
  regionName: string;
  regionSlug: string;
  district: string;
};

type FAQ = { question: string; answer: string };

function getFaqs(regionName: string, district: string): FAQ[] {
  return [
    {
      question: `${district} 포장이사 견적은 무엇을 기준으로 비교해야 하나요?`,
      answer: `${district}에서는 총액만 보기보다 작업 인원, 차량 톤수, 엘리베이터·사다리차 사용, 주차 위치에서 현관까지의 운반거리, 대형가구 분해·조립, 추가요금 기준을 나누어 비교하는 것이 좋습니다.`,
    },
    {
      question: `${district} 이사 날짜를 정할 때 손없는날만 보면 되나요?`,
      answer: `손없는날은 전통적인 참고 기준입니다. 실제 이사 준비에서는 ${district}의 강수확률과 기온, 주말·월말 수요, 관리사무소 예약 가능시간, 출발지와 도착지의 작업조건을 함께 확인하는 것이 실용적입니다.`,
    },
    {
      question: `${district} 아파트 이사 전에 무엇을 확인해야 하나요?`,
      answer: `관리사무소에 이사 가능시간, 승강기 예약, 보양비, 사다리차 설치 가능 여부, 이사차량 주차 위치를 확인하세요. 단지마다 규정이 다를 수 있어 업체 예약 전에 확인하면 현장 변경을 줄이는 데 도움이 됩니다.`,
    },
    {
      question: `${district} 원룸이사는 어떤 조건에서 비용 차이가 생기나요?`,
      answer: `짐 양과 차량 크기 외에도 계단 작업, 엘리베이터 유무, 주차거리, 기사 도움 범위, 출발지와 도착지 사이 이동거리에서 차이가 생길 수 있습니다. 골목과 계단 사진을 미리 전달하면 견적 정확도를 높이기 좋습니다.`,
    },
    {
      question: `${district}로 이사한 뒤 전입신고는 어디서 하나요?`,
      answer: `온라인은 정부24에서 신청할 수 있고 방문은 새 주소지 관할 주민센터에서 할 수 있습니다. 전입 후 14일 이내 신고가 원칙이며, 임차인이라면 확정일자와 계약 주택의 권리관계도 함께 확인하는 것이 좋습니다.`,
    },
    {
      question: `${district} 이사할 때 전기와 도시가스는 어떻게 처리하나요?`,
      answer: `전기는 한국전력 고객센터 123 또는 한전 서비스를 통해 이사 정산과 관련 상담을 확인할 수 있습니다. 도시가스는 주소별 공급회사가 다를 수 있으므로 관할 도시가스 고객센터를 확인해 전출 정산과 전입 연결을 예약하세요.`,
    },
  ];
}

export default function RegionFAQ({ regionName, regionSlug, district }: Props) {
  const faqs = getFaqs(regionName, district);
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const pageUrl = `${base}/moving/${regionSlug}/${encodeURIComponent(district)}`;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "올바른이사", item: base },
      { "@type": "ListItem", position: 2, name: `${regionName} 이사`, item: `${base}/#region` },
      { "@type": "ListItem", position: 3, name: `${district} 이사`, item: pageUrl },
    ],
  };

  return (
    <section className="section white region-faq-section" id="faq">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="wrap">
        <span className="eyebrow">자주 묻는 질문</span>
        <h2 className="section-title">{district} 이사 준비 FAQ</h2>
        <p className="section-desc">{regionName} {district}에서 이사 날짜와 견적을 준비할 때 자주 확인하는 내용을 간단히 정리했습니다.</p>
        <div className="region-faq-list">
          {faqs.map((item, index) => (
            <details className="region-faq-item" key={item.question} open={index === 0}>
              <summary><span>Q</span>{item.question}</summary>
              <div className="region-faq-answer"><span>A</span><p>{item.answer}</p></div>
            </details>
          ))}
        </div>
        <p className="region-faq-note">※ 실제 비용과 행정·생활 서비스 절차는 계약 조건과 기관 정책에 따라 달라질 수 있으므로 신청 전 최신 내용을 확인하세요.</p>
      </div>
    </section>
  );
}
