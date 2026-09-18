/**
 * 앱 전체의 단일 리듀서.
 *
 * 액션은 크게 세 갈래다.
 *   1) OPEN_* / BACK        : 화면 전환. screen 키만 바꾼다.
 *   2) SELECT_* / TOGGLE_*  : 값 선택 + 화면 복귀를 함께 처리한다.
 *   3) SET_*_FIELD          : 각 화면 폼의 필드 수정.
 *                             action.field 로 키를 받는 공통 패턴이라,
 *                             화면이 늘어도 case 하나만 추가하면 된다.
 *
 * BACK 은 항상 'review' 로 돌아간다 — 히스토리 스택이 없는 단순 구조다.
 */
export function reduce(state, action) {
  switch (action.type) {
    case "OPEN_MODEL_PICKER":
      return { ...state, screen: "brand-picker" };
    case "OPEN_NEWS":
      return { ...state, screen: "news" };
    case "OPEN_QUESTION":
      return { ...state, screen: "question" };
    case "OPEN_LONG_POST":
      return { ...state, screen: "long-post" };
    case "OPEN_SALE":
      return { ...state, screen: "sale" };
    case "OPEN_OWNER":
      return { ...state, screen: "owner" };
    case "OPEN_ENERGY":
      return { ...state, screen: "energy" };
    case "OPEN_REVIEW":
      return { ...state, screen: "review" };
    case "OPEN_CITY_PICKER":
      return { ...state, screen: "city-picker" };
    case "BACK":
      return { ...state, screen: "review" };
    case "SELECT_MODEL":
      return {
        ...state,
        screen: "review",
        model: { name: action.model, trim: action.trim },
      };
    case "SELECT_CITY":
      return {
        ...state,
        screen: "review",
        ownerInfo: { ...state.ownerInfo, city: action.value },
      };
    case "TOGGLE_OWNER":
      return { ...state, isOwner: !state.isOwner };
    case "OPEN_DATE_PICKER":
      return {
        ...state,
        datePicker: {
          open: true,
          year: state.ownerInfo.deliveryTime
            ? Number(state.ownerInfo.deliveryTime.slice(0, 4))
            : 2026,
          month: state.ownerInfo.deliveryTime
            ? Number(state.ownerInfo.deliveryTime.match(/(\d+)월/)?.[1])
            : 9,
        },
      };
    case "SET_DATE_PART":
      return {
        ...state,
        datePicker: { ...state.datePicker, [action.part]: action.value },
      };
    case "CANCEL_DATE_PICKER":
      return { ...state, datePicker: { ...state.datePicker, open: false } };
    case "CONFIRM_DATE_PICKER":
      return {
        ...state,
        datePicker: { ...state.datePicker, open: false },
        ownerInfo: {
          ...state.ownerInfo,
          deliveryTime: `${state.datePicker.year}년 ${state.datePicker.month}월`,
        },
      };
    case "SET_OWNER_FIELD":
      return {
        ...state,
        ownerInfo: { ...state.ownerInfo, [action.field]: action.value },
      };
    case "SET_RATING":
      return {
        ...state,
        ratings: { ...state.ratings, [action.category]: action.value },
      };
    case "SET_COMMENT":
      return { ...state, comment: action.value };
    case "SET_BRAND_QUERY":
      return { ...state, brandQuery: action.value };
    case "SET_NEWS_FIELD":
      return {
        ...state,
        news: { ...state.news, [action.field]: action.value },
      };
    case "SET_QUESTION_FIELD":
      return {
        ...state,
        question: { ...state.question, [action.field]: action.value },
      };
    case "SET_LONG_POST_FIELD":
      return {
        ...state,
        longPost: { ...state.longPost, [action.field]: action.value },
      };
    case "SET_SALE_FIELD":
      return {
        ...state,
        sale: { ...state.sale, [action.field]: action.value },
      };
    case "SET_OWNER_PAGE_FIELD":
      return {
        ...state,
        ownerPage: { ...state.ownerPage, [action.field]: action.value },
      };
    case "SET_ENERGY_FIELD":
      return {
        ...state,
        energy: { ...state.energy, [action.field]: action.value },
      };
    default:
      return state;
  }
}
