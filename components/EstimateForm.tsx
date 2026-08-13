"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { regionProfiles } from "@/lib/regions";
import { EstimateRequest, MovingType, initialEstimateRequest } from "@/lib/estimate-types";

const movingTypes: { value: MovingType; title: string; desc: string }[] = [
  { value: "포장이사", title: "포장이사", desc: "포장·운반·정리까지 한 번에" },
  { value: "원룸이사", title: "원룸이사", desc: "소형 짐과 1톤 차량 중심" },
  { value: "일반이사", title: "일반이사", desc: "직접 포장하고 운송 중심" },
  { value: "사무실이사", title: "사무실이사", desc: "업무시설 반입·장비까지 고려" },
];

const optionItems = ["엘리베이터 있음", "사다리차 필요", "대형가전 있음", "피아노·대형가구", "에어컨 이전", "보관이사 필요"];
const stepLabels = ["이사 종류", "출발·도착", "이사 날짜", "작업 조건", "연락처"];

export default function EstimateForm() {
  const params = useSearchParams();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<EstimateRequest>(initialEstimateRequest);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const regionName = params.get("region");
    const district = params.get("district");
    if (!regionName) return;
    const matched = regionProfiles.find((r) => r.name === regionName);
    if (!matched) return;
    setData((prev) => ({
      ...prev,
      originSido: matched.slug,
      originDistrict: district && matched.districts.includes(district) ? district : "",
    }));
  }, [params]);

  const originDistricts = useMemo(() => regionProfiles.find((r) => r.slug === data.originSido)?.districts ?? [], [data.originSido]);
  const destinationDistricts = useMemo(() => regionProfiles.find((r) => r.slug === data.destinationSido)?.districts ?? [], [data.destinationSido]);
  const selectedOrigin = regionProfiles.find((r) => r.slug === data.originSido);
  const selectedDestination = regionProfiles.find((r) => r.slug === data.destinationSido);

  const setField = <K extends keyof EstimateRequest>(key: K, value: EstimateRequest[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setError("");
  };

  function validateCurrentStep() {
    if (step === 1 && !data.movingType) return "이사 종류를 선택해주세요.";
    if (step === 2 && (!data.originSido || !data.originDistrict || !data.destinationSido || !data.destinationDistrict)) return "출발지역과 도착지역을 모두 선택해주세요.";
    if (step === 3 && !data.movingDate) return "이사 예정일을 선택해주세요.";
    if (step === 5) {
      if (!data.name.trim()) return "이름을 입력해주세요.";
      if (!/^01[0-9]-?\d{3,4}-?\d{4}$/.test(data.phone.replace(/\s/g, ""))) return "휴대폰 번호를 정확히 입력해주세요.";
      if (!data.privacyAgreed) return "개인정보 수집 및 견적 안내에 동의해주세요.";
    }
    return "";
  }

  function nextStep() {
    const message = validateCurrentStep();
    if (message) return setError(message);
    setStep((current) => Math.min(5, current + 1));
  }

  function submitEstimate() {
    const message = validateCurrentStep();
    if (message) return setError(message);
    const payload = {
      ...data,
      source: "website" as const,
      pagePath: window.location.pathname + window.location.search,
      submittedAt: new Date().toISOString(),
    };
    console.info("estimate-request-ready", payload);
    setSubmitted(true);
  }

  function toggleOption(item: string) {
    setData((prev) => ({ ...prev, options: prev.options.includes(item) ? prev.options.filter((x) => x !== item) : [...prev.options, item] }));
  }

  if (submitted) {
    return (
      <div className="estimate-complete">
        <div className="complete-icon">✓</div>
        <span className="mini-label">입력 완료</span>
        <h2>비교견적 정보를 확인했습니다.</h2>
        <p>현재는 실제 업체 전송 전 단계입니다. 다음 개발 단계에서 이 입력값을 DB에 저장하고 관리자에게 접수 알림이 가도록 연결할 수 있습니다.</p>
        <div className="estimate-summary compact">
          <div><span>이사 종류</span><strong>{data.movingType}</strong></div>
          <div><span>출발</span><strong>{selectedOrigin?.name} {data.originDistrict}</strong></div>
          <div><span>도착</span><strong>{selectedDestination?.name} {data.destinationDistrict}</strong></div>
          <div><span>이사일</span><strong>{data.movingDate}</strong></div>
        </div>
        <button className="secondary-action" onClick={() => { setSubmitted(false); setStep(1); }}>내용 다시 확인하기</button>
      </div>
    );
  }

  return (
    <div className="estimate-flow">
      <div className="estimate-progress" aria-label={`견적 신청 ${step}단계`}>
        <div className="progress-head"><strong>{step} / 5 단계</strong><span>{stepLabels[step - 1]}</span></div>
        <div className="progress-track"><span style={{ width: `${step * 20}%` }} /></div>
        <div className="progress-labels">{stepLabels.map((label, index) => <button key={label} type="button" className={index + 1 === step ? "active" : index + 1 < step ? "done" : ""} onClick={() => index + 1 < step && setStep(index + 1)}>{index + 1}. {label}</button>)}</div>
      </div>

      <div className="estimate-step-card">
        {step === 1 && <>
          <div className="step-heading"><span className="form-step">01</span><div><h2>어떤 이사를 준비하시나요?</h2><p>서비스 범위가 다르기 때문에 이사 유형을 먼저 정하면 견적 비교가 쉬워집니다.</p></div></div>
          <div className="estimate-type-grid">{movingTypes.map((item) => <button type="button" key={item.value} className={data.movingType === item.value ? "estimate-type selected" : "estimate-type"} onClick={() => setField("movingType", item.value)}><strong>{item.title}</strong><span>{item.desc}</span></button>)}</div>
        </>}

        {step === 2 && <>
          <div className="step-heading"><span className="form-step">02</span><div><h2>어디에서 어디로 이사하시나요?</h2><p>출발지와 도착지의 주차·엘리베이터·이동거리가 견적에 영향을 줍니다.</p></div></div>
          <div className="route-box"><div className="route-block"><span>출발지역</span><div className="field-grid"><select className="field" value={data.originSido} onChange={(e) => { setField("originSido", e.target.value); setField("originDistrict", ""); }}><option value="">시·도 선택</option>{regionProfiles.map((r) => <option key={r.slug} value={r.slug}>{r.name}</option>)}</select><select className="field" value={data.originDistrict} onChange={(e) => setField("originDistrict", e.target.value)} disabled={!data.originSido}><option value="">시·군·구 선택</option>{originDistricts.map((d) => <option key={d} value={d}>{d}</option>)}</select></div></div><div className="route-arrow">↓</div><div className="route-block"><span>도착지역</span><div className="field-grid"><select className="field" value={data.destinationSido} onChange={(e) => { setField("destinationSido", e.target.value); setField("destinationDistrict", ""); }}><option value="">시·도 선택</option>{regionProfiles.map((r) => <option key={r.slug} value={r.slug}>{r.name}</option>)}</select><select className="field" value={data.destinationDistrict} onChange={(e) => setField("destinationDistrict", e.target.value)} disabled={!data.destinationSido}><option value="">시·군·구 선택</option>{destinationDistricts.map((d) => <option key={d} value={d}>{d}</option>)}</select></div></div></div>
        </>}

        {step === 3 && <>
          <div className="step-heading"><span className="form-step">03</span><div><h2>이사 예정일을 알려주세요.</h2><p>주말·월말·손없는날처럼 예약이 몰리는 시기에는 여러 날짜를 함께 비교하는 것도 좋습니다.</p></div></div>
          <div className="date-focus"><label><span>이사 예정일</span><input className="field" type="date" value={data.movingDate} min={new Date().toISOString().slice(0,10)} onChange={(e) => setField("movingDate", e.target.value)} /></label><div className="date-tip"><strong>날짜 선택 팁</strong><p>날씨는 이사일이 가까워졌을 때 다시 확인하세요. 지역 페이지에서는 손없는날과 단기예보를 함께 볼 수 있습니다.</p>{data.originSido && data.originDistrict && <a href={`/moving/${data.originSido}/${encodeURIComponent(data.originDistrict)}#local-calendar`}>출발지역 손없는날·날씨 보기 →</a>}</div></div>
        </>}

        {step === 4 && <>
          <div className="step-heading"><span className="form-step">04</span><div><h2>현장 작업 조건을 알려주세요.</h2><p>정확히 몰라도 괜찮습니다. 지금 알고 있는 항목만 선택하고 추가사항은 메모에 적어주세요.</p></div></div>
          <div className="estimate-options">{optionItems.map((item) => <button type="button" key={item} className={data.options.includes(item) ? "selected" : ""} onClick={() => toggleOption(item)}><span>{data.options.includes(item) ? "✓" : "+"}</span>{item}</button>)}</div>
          <label className="memo-field"><span>추가로 알려줄 내용</span><textarea value={data.memo} onChange={(e) => setField("memo", e.target.value)} placeholder="예: 출발지 4층 엘리베이터 없음, 냉장고 2대, 붙박이장 분해 필요" /></label>
        </>}

        {step === 5 && <>
          <div className="step-heading"><span className="form-step">05</span><div><h2>견적 안내를 받을 정보를 입력하세요.</h2><p>필요한 최소 정보만 입력받도록 구성했습니다.</p></div></div>
          <div className="field-grid contact-fields"><input className="field" value={data.name} onChange={(e) => setField("name", e.target.value)} placeholder="이름" /><input className="field" type="tel" value={data.phone} onChange={(e) => setField("phone", e.target.value)} placeholder="휴대폰 번호 예: 010-1234-5678" /></div>
          <label className="agree-line"><input type="checkbox" checked={data.privacyAgreed} onChange={(e) => setField("privacyAgreed", e.target.checked)} /> 개인정보 수집 및 비교견적 안내에 동의합니다.</label>
          <div className="estimate-summary"><div><span>이사 종류</span><strong>{data.movingType || "미선택"}</strong></div><div><span>이동</span><strong>{selectedOrigin?.name} {data.originDistrict} → {selectedDestination?.name} {data.destinationDistrict}</strong></div><div><span>날짜</span><strong>{data.movingDate || "미선택"}</strong></div><div><span>현장 조건</span><strong>{data.options.length ? `${data.options.length}개 선택` : "선택 없음"}</strong></div></div>
        </>}

        {error && <div className="estimate-error" role="alert">{error}</div>}
        <div className="estimate-actions">{step > 1 && <button className="secondary-action" type="button" onClick={() => { setStep(step - 1); setError(""); }}>이전</button>}{step < 5 ? <button className="primary-action" type="button" onClick={nextStep}>다음 단계</button> : <button className="primary-action" type="button" onClick={submitEstimate}>무료 비교견적 신청하기</button>}</div>
      </div>
    </div>
  );
}
