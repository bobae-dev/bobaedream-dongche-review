/**
 * 판매글 화면의 선택 필드들이 쓰는 후보 목록.
 *
 * 값과 범위는 실제 앱(scrcpy)을 조작해 확인한 것 그대로다.
 *   인도 연월   : 2026년 → 2000년 (내림차순), 1~12월
 *   주행거리    : 0~99만 × 0~9천, 단위 'km' 는 고정 표시
 *   이전 횟수   : 0~4회 + '5회 이상'
 *   차량 색상   : 12색 + 기타
 */

const range = (from, to) =>
  Array.from({ length: Math.abs(to - from) + 1 }, (_, i) =>
    from <= to ? from + i : from - i,
  );

/** 인도 연월 — 최신 연도가 위로 오도록 내림차순이다. */
export const DELIVERY_YEARS = range(2026, 2000).map((y) => `${y}년`);
export const DELIVERY_MONTHS = range(1, 12).map((m) => `${m}월`);

/** 주행거리 — 만 자리와 천 자리를 따로 고른다. */
export const MILEAGE_MAN = range(0, 99).map((n) => `${n}만`);
export const MILEAGE_CHEON = range(0, 9).map((n) => `${n}천`);
export const MILEAGE_UNIT = "km";

/** 소유권 이전 횟수 — 마지막 항목만 '이상'으로 묶인다. */
export const TRANSFER_COUNTS = [...range(0, 4).map((n) => `${n}회`), "5회 이상"];

/** 차량 색상 — 3열 그리드로 그린다. */
export const CAR_COLORS = [
  "흰색",
  "검정",
  "진회색",
  "은회색",
  "커피색",
  "빨강",
  "파랑",
  "샴페인",
  "주황",
  "노랑",
  "초록",
  "보라",
  "기타",
];
