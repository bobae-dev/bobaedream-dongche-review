import {
  categories,
  ratingLabels,
  selectedCategories,
} from "../data/categories.js";

/**
 * 상태에서 화면에 필요한 값을 끌어내는 순수 함수 모음.
 *
 * 리듀서에 넣기엔 저장할 값이 아니고, 컴포넌트에 두기엔 여러 화면이
 * 공유하는 계산들을 모아 둔다. 전부 부수효과가 없다.
 */

/**
 * 별 하나의 채움 비율(%)을 구한다. 0.5점 단위라 100 / 50 / 0 세 가지뿐이다.
 * components/StarRating.jsx 가 SVG clipPath 너비로 사용한다.
 */
export function starFillPercent(rating, starValue) {
  if (rating >= starValue) return 100;
  if (rating >= starValue - 0.5) return 50;
  return 0;
}

/**
 * 차량 선택 여부에 따라 평가 항목 배열을 고른다.
 * (지금은 두 배열의 내용이 같지만, 차종별 항목 분기를 염두에 둔 자리다)
 */
export function reviewCategories(model) {
  return model ? selectedCategories : categories;
}

/**
 * 점수(0.5~5)를 항목별 설명 문구로 바꾼다.
 * 올림 처리라 4.5점과 5점은 같은 문구("외관의 정점" 등)를 쓴다.
 * 점수가 0이면 빈 문자열 — 아직 평가하지 않은 상태다.
 */
export function ratingDescription(category, rating) {
  if (!rating || !ratingLabels[category]) return "";
  const index = Math.min(
    ratingLabels[category].length - 1,
    Math.max(0, Math.ceil(rating) - 1),
  );
  return ratingLabels[category][index];
}

/**
 * 현재 화면이 리뷰 화면(뿌리)에서 몇 단계 들어와 있는지.
 * hooks/useHistoryBack.js 가 이 값만큼 브라우저 히스토리 항목을 쌓아 둔다.
 *
 *   리뷰 화면                         0
 *   그 밖의 화면(탭·차량/지역 선택)   1  — 탭끼리 옮겨도 늘지 않는다.
 *   위에 시트·모달이 떠 있으면       +1
 *
 * 탭 전환이 단계를 늘리지 않는 건 앱 안의 ‹ 버튼과 맞추기 위해서다.
 * 어느 탭에서든 ‹ 는 리뷰 화면으로 돌아간다(reducer 의 BACK).
 * reducer 의 HISTORY_BACK 은 이 값을 정확히 1 줄이는 동작이어야 한다.
 */
export function historyDepth(state) {
  const screenDepth = state.screen === "review" ? 0 : 1;
  const overlayDepth = state.datePicker.open || state.saleSheet ? 1 : 0;
  return screenDepth + overlayDepth;
}
