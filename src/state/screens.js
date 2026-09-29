/**
 * 화면 목록과 화면 사이의 관계를 한곳에 모은 모듈.
 *
 * 화면을 추가·변경할 때 고칠 곳은 여기와 App.jsx 의 화면 분기 두 군데다.
 *   - TABS         : 상단 탭 순서와 각 탭이 여는 화면
 *   - parentScreen : 뒤로 가면 돌아갈 화면. 앱 안의 ‹ 버튼(BACK)과
 *                    브라우저 뒤로가기(HISTORY_BACK)가 모두 이걸 따른다.
 *   - historyDepth : 브라우저 히스토리에 쌓아 둘 단계 수 (useHistoryBack)
 *
 * 리뷰 화면('review')이 뿌리다. 탭 화면은 리뷰 화면의 자식이다. 탭끼리
 * 옮겨 다녀도 부모는 그대로 리뷰 화면이라 단계가 늘지 않는다.
 * 선택 화면은 연 화면의 자식이다.
 *   지역 선택     ← state.cityPickerFrom
 *   브랜드 선택   ← state.modelPicker.from  → 차종 선택 → 세부 모델 선택
 *   대리점 선택   ← 차주가
 */

/**
 * 상단 탭. 순서가 곧 탭 바의 순서다.
 * screen 이 null 인 탭은 아직 화면이 없어서 눌러도 아무 일이 없다.
 */
export const TABS = [
  { label: "소식", screen: "news" },
  { label: "차량 점수", screen: "review" },
  { label: "질문", screen: "question" },
  { label: "영상", screen: null },
  { label: "긴 글", screen: "long-post" },
  { label: "판매글", screen: "sale" },
  { label: "차주가", screen: "owner" },
  { label: "에너지", screen: "energy" },
];

/** 뒤로 가면 돌아갈 화면. 뿌리(리뷰 화면)면 null. */
export function parentScreen(state, screen = state.screen) {
  if (screen === "review") return null;
  switch (screen) {
    case "city-picker":
      return state.cityPickerFrom;
    case "brand-picker":
      return state.modelPicker.from;
    case "series-picker":
      return "brand-picker";
    case "trim-picker":
      return "series-picker";
    case "dealer-picker":
      return "owner";
    default:
      return "review";
  }
}

/** 뿌리에서 몇 단계 들어와 있는지. 예: 차주가 → 지역 선택 = 2 */
export function screenDepth(state, screen = state.screen) {
  const parent = parentScreen(state, screen);
  return parent ? 1 + screenDepth(state, parent) : 0;
}

/**
 * 브라우저 히스토리에 쌓아 둘 단계 수 = 화면 단계 + 떠 있는 시트·모달(1).
 * reducer 의 HISTORY_BACK 은 이 값을 정확히 1 줄이는 동작이어야 한다.
 */
export function historyDepth(state) {
  const overlayDepth =
    state.datePicker.open || state.saleSheet || state.ownerDateSheet ? 1 : 0;
  return screenDepth(state) + overlayDepth;
}
