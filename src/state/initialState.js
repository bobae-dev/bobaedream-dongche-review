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
  ownerPage: {
    model: "",
    barePrice: "",
    totalPrice: "",
    purchaseTime: "",
    city: "양천구",
    note: "",
  },
  energy: { title: "", body: "" },
};
