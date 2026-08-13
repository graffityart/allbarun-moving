"use client";

import { useEffect, useMemo, useState } from "react";
import KoreanLunarCalendar from "korean-lunar-calendar";

const LOCATIONS = [
  { name: "서울", lat: 37.5665, lon: 126.978 },
  { name: "인천", lat: 37.4563, lon: 126.7052 },
  { name: "수원", lat: 37.2636, lon: 127.0286 },
  { name: "대전", lat: 36.3504, lon: 127.3845 },
  { name: "대구", lat: 35.8714, lon: 128.6014 },
  { name: "부산", lat: 35.1796, lon: 129.0756 },
  { name: "광주", lat: 35.1595, lon: 126.8526 },
  { name: "울산", lat: 35.5384, lon: 129.3114 },
  { name: "제주", lat: 33.4996, lon: 126.5312 },
];

type WeatherDay = {
  date: string;
  min: number;
  max: number;
  rain: number;
  code: number;
};

function weatherText(code: number) {
  if (code === 0) return "맑음";
  if ([1, 2].includes(code)) return "대체로 맑음";
  if (code === 3) return "흐림";
  if ([45, 48].includes(code)) return "안개";
  if ([51, 53, 55, 56, 57].includes(code)) return "이슬비";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "비";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "눈";
  if ([95, 96, 99].includes(code)) return "뇌우";
  return "변동 가능";
}

function isHandsFreeDay(date: Date) {
  const calendar = new KoreanLunarCalendar();
  const ok = calendar.setSolarDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
  if (!ok) return false;
  const lunar = calendar.getLunarCalendar();
  return lunar.day % 10 === 9 || lunar.day % 10 === 0;
}

export default function MovingCalendar() {
  const today = useMemo(() => new Date(), []);
  const [monthOffset, setMonthOffset] = useState(0);
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [weather, setWeather] = useState<WeatherDay[]>([]);
  const [loading, setLoading] = useState(true);

  const viewDate = useMemo(
    () => new Date(today.getFullYear(), today.getMonth() + monthOffset, 1),
    [today, monthOffset]
  );

  const days = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const cells: Array<Date | null> = Array.from({ length: firstDay }, () => null);
    for (let day = 1; day <= lastDate; day++) cells.push(new Date(year, month, day));
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [viewDate]);

  useEffect(() => {
    const controller = new AbortController();
    async function loadWeather() {
      setLoading(true);
      try {
        const url = new URL("https://api.open-meteo.com/v1/forecast");
        url.searchParams.set("latitude", String(location.lat));
        url.searchParams.set("longitude", String(location.lon));
        url.searchParams.set(
          "daily",
          "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max"
        );
        url.searchParams.set("timezone", "Asia/Seoul");
        url.searchParams.set("forecast_days", "16");

        const res = await fetch(url.toString(), { signal: controller.signal });
        if (!res.ok) throw new Error("weather request failed");
        const data = await res.json();
        const next: WeatherDay[] = data.daily.time.map((date: string, i: number) => ({
          date,
          min: Math.round(data.daily.temperature_2m_min[i]),
          max: Math.round(data.daily.temperature_2m_max[i]),
          rain: data.daily.precipitation_probability_max[i] ?? 0,
          code: data.daily.weather_code[i],
        }));
        setWeather(next);
      } catch (error) {
        if ((error as Error).name !== "AbortError") setWeather([]);
      } finally {
        setLoading(false);
      }
    }
    loadWeather();
    return () => controller.abort();
  }, [location]);

  const goodDays = days.filter((d): d is Date => Boolean(d && isHandsFreeDay(d)));

  return (
    <div className="calendar-shell">
      <div className="calendar-card">
        <div className="calendar-head">
          <div>
            <div className="small">이사 날짜 고르기</div>
            <h3>{viewDate.getFullYear()}년 {viewDate.getMonth() + 1}월 손없는날</h3>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button className="field" style={{ width: 44, padding: 0 }} onClick={() => setMonthOffset((v) => v - 1)} aria-label="이전 달">‹</button>
            <button className="field" style={{ width: 44, padding: 0 }} onClick={() => setMonthOffset((v) => v + 1)} aria-label="다음 달">›</button>
          </div>
        </div>
        <div className="calendar-grid">
          {["일", "월", "화", "수", "목", "금", "토"].map((d) => <div className="dow" key={d}>{d}</div>)}
          {days.map((date, index) => {
            if (!date) return <div className="day muted" key={`empty-${index}`} />;
            const good = isHandsFreeDay(date);
            const isToday = date.toDateString() === today.toDateString();
            return (
              <div className={`day ${good ? "good" : ""} ${isToday ? "today" : ""}`} key={date.toISOString()}>
                <div className="day-number">{date.getDate()}</div>
                {good && <span className="good-label">손없는날</span>}
              </div>
            );
          })}
        </div>
        <div className="legend">
          <span><i className="dot" />손없는날 {goodDays.length}일</span>
          <span>※ 전통적으로 음력 날짜 끝자리가 9·0인 날을 표시합니다.</span>
        </div>
      </div>

      <div className="weather-card">
        <div className="weather-top">
          <div>
            <div className="small">이사 날씨 미리보기</div>
            <strong style={{ fontSize: 23 }}>{location.name} 16일 예보</strong>
          </div>
          <select className="field" style={{ width: 110 }} value={location.name} onChange={(e) => setLocation(LOCATIONS.find((l) => l.name === e.target.value) || LOCATIONS[0])}>
            {LOCATIONS.map((item) => <option key={item.name}>{item.name}</option>)}
          </select>
        </div>
        <div className="weather-list">
          {loading && <div className="weather-meta">날씨 정보를 불러오는 중입니다.</div>}
          {!loading && weather.length === 0 && <div className="weather-meta">현재 날씨 정보를 불러올 수 없습니다.</div>}
          {weather.slice(0, 8).map((item) => {
            const d = new Date(`${item.date}T00:00:00`);
            return (
              <div className="weather-row" key={item.date}>
                <div>
                  <div className="weather-date">{d.getMonth() + 1}/{d.getDate()} ({["일","월","화","수","목","금","토"][d.getDay()]})</div>
                  <div className="weather-meta">{weatherText(item.code)}</div>
                </div>
                <strong>{item.min}° / {item.max}°</strong>
                <span className="weather-meta">비 {item.rain}%</span>
              </div>
            );
          })}
        </div>
        <div className="weather-note">날씨 예보는 시간이 가까워질수록 정확도가 높아집니다. 16일 이후의 이사 예정일은 예보가 제공되는 시점에 다시 확인하도록 안내합니다.</div>
      </div>
    </div>
  );
}
