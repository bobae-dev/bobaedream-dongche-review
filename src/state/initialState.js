import { categories } from "../data/categories.js";

/**
 * useReducer 의 초기 상태.
 *
 * screen 을 제외한 나머지 키는 대부분 "화면 하나 = 키 하나" 구조다.
 *   news / question / longPost / sale / ownerPage / energy
 * 이 대응 관계는 state/reducer.js 의 SET_*_FIELD 액션들과 짝을 이룬다.
 *
 * - screen     : 현재 화면. App.jsx 의 라우팅 분기 기준값.
 * - model      : 선택한 차량. null 이면 리뷰 화면이 '차량 추가' 상태로 그려진다.
 * - ownerInfo  : 리뷰 화면 안의 차주 정보 (차주가 화면의 ownerPage 와는 별개)
 * - datePicker : 인도 시기 모달의 열림 여부 + 현재 선택 중인 연/월
 * - cityPickerFrom : 지역 선택 화면을 연 화면("review" | "owner").
 *                    고르거나 뒤로 가면 이 화면으로 돌아가고, 고른 값도
 *                    이 화면의 필드(ownerInfo.city / ownerPage.city)에 들어간다.
 * - ratings    : 평가 항목별 점수(0~5, 0.5 단위)
 */
export const initialState = {
  screen: "review",
  model: null,
  isOwner: false,
  ownerInfo: {
    deliveryTime: "",
    city: "",
    barePrice: "",
    totalPrice: "",
    mileage: "",
  },
  datePicker: { open: false, year: 2026, month: 9 },
  cityPickerFrom: "review",
  ratings: Object.fromEntries(categories.map((category) => [category, 0])),
  comment: "",
  brandQuery: "",
  news: { title: "", body: "" },
  question: { title: "", body: "" },
  longPost: { title: "", body: "" },
  sale: {
    delivery: "2024년 4월",
    mileage: "",
    color: "흰색",
    transfers: "0회",
    price: "0.00",
    title: "",
    body: "",
  },
  // 판매글에서 열려 있는 선택 시트. null 이면 닫힌 상태다.
  // draft 는 '확정' 전까지의 임시 값이라, 닫기로 나가면 그대로 버려진다.
  saleSheet: null,
  ownerPage: {
    model: "",
    barePrice: "",
    totalPrice: "",
    purchaseTime: "",
    // 실제 앱은 현재 위치로 채워 두지만, 여기서는 목록에서 고르게 비워 둔다.
    city: "",
    note: "",
    // '기타 정보' 안의 항목들. 이 묶음은 접었다 펼 수 있고, 기본은 펼침이다.
    payment: "할부",
    dealer: "",
    extraOpen: true,
  },
  energy: { title: "", body: "" },
};
