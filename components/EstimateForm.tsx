"use client";

import { FormEvent, useMemo, useState } from "react";
import { regionProfiles } from "@/lib/regions";

const movingTypes = ["포장이사", "원룸이사", "일반이사", "사무실이사"];

export default function EstimateForm() {
  const [sido, setSido] = useState("");
  const [sigungu, setSigungu] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const districts = useMemo(() => regionProfiles.find((r) => r.slug === sido)?.districts ?? [], [sido]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className="estimate-form" onSubmit={onSubmit}>
      <div className="form-section">
        <span className="form-step">01</span>
        <div><h2>어떤 이사를 준비하시나요?</h2><p>이사 유형에 따라 필요한 차량·인원·포장 범위가 달라집니다.</p></div>
      </div>
      <div className="choice-grid">
        {movingTypes.map((type) => <label className="choice-card" key={type}><input type="radio" name="movingType" value={type} required/><span>{type}</span></label>)}
      </div>

      <div className="form-section form-gap">
        <span className="form-step">02</span>
        <div><h2>출발 지역을 알려주세요</h2><p>지역별 도로·주차·엘리베이터 조건을 견적 비교에 반영하기 위한 정보입니다.</p></div>
      </div>
      <div className="field-grid wide-fields">
        <select className="field" value={sido} onChange={(e) => { setSido(e.target.value); setSigungu(""); }} required>
          <option value="">시·도 선택</option>
          {regionProfiles.map((r) => <option key={r.slug} value={r.slug}>{r.name}</option>)}
        </select>
        <select className="field" value={sigungu} onChange={(e) => setSigungu(e.target.value)} required disabled={!sido}>
          <option value="">시·군·구 선택</option>
          {districts.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      <div className="form-section form-gap">
        <span className="form-step">03</span>
        <div><h2>이사 일정과 도착지를 입력하세요</h2><p>정확한 주소는 업체 상담 단계에서 확인하고, 여기서는 비교에 필요한 기본 정보만 받습니다.</p></div>
      </div>
      <div className="field-grid wide-fields">
        <input className="field" type="date" name="movingDate" required />
        <input className="field" type="text" name="destination" placeholder="도착 지역 예: 경기 성남시" required />
      </div>

      <div className="form-section form-gap">
        <span className="form-step">04</span>
        <div><h2>작업 조건을 선택하세요</h2><p>해당되는 항목만 선택해도 업체가 예상 작업환경을 파악하는 데 도움이 됩니다.</p></div>
      </div>
      <div className="check-grid">
        {["엘리베이터 있음", "사다리차 필요", "대형가전 있음", "피아노·대형가구", "에어컨 이전", "보관이사 필요"].map((item) => <label key={item}><input type="checkbox" name="options" value={item}/><span>{item}</span></label>)}
      </div>

      <div className="form-section form-gap">
        <span className="form-step">05</span>
        <div><h2>연락받을 정보를 입력하세요</h2><p>비교견적 안내를 위해 필요한 최소 정보입니다.</p></div>
      </div>
      <div className="field-grid wide-fields">
        <input className="field" type="text" name="name" placeholder="이름" required />
        <input className="field" type="tel" name="phone" placeholder="휴대폰 번호" required />
      </div>
      <label className="agree-line"><input type="checkbox" required /> 개인정보 수집 및 비교견적 안내에 동의합니다.</label>
      <button className="primary-btn submit-large" type="submit">무료 비교견적 신청하기</button>
      {submitted && <div className="form-success"><strong>입력 내용 확인이 완료되었습니다.</strong><p>현재 단계에서는 실제 업체 전송 전 프론트 화면까지만 연결되어 있습니다. 다음 단계에서 DB 저장과 관리자 접수 기능을 연결합니다.</p></div>}
    </form>
  );
}
