import { parentScreen } from "./screens.js";

/**
 * 앱 전체의 단일 리듀서.
 *
 * 액션은 크게 세 갈래다.
 *   1) OPEN_* / BACK        : 화면 전환. 탭 화면은 OPEN_SCREEN 하나로 연다.
 *   2) SELECT_* / TOGGLE_*  : 값 선택 + 화면 복귀를 함께 처리한다.
 *   3) SET_*_FIELD          : 각 화면 폼의 필드 수정.
 *                             action.field 로 키를 받는 공통 패턴이라,
 *                             화면이 늘어도 case 하나만 추가하면 된다.
 *
 * BACK 은 부모 화면(state/screens.js 의 parentScreen)으로 돌아간다.
 * HISTORY_BACK 은 브라우저 뒤로가기용이다. 가장 위에 떠 있는 것 하나만
 * 닫는다(시트·모달 → 화면 순). screens.js 의 historyDepth 를 1 줄인다.
 */
export function reduce(state, action) {
  switch (action.type) {
    // 차량 선택: 브랜드 → 차종 → 세부 모델. 세부 모델을 고르면 연 화면으로 돌아간다.
    case "OPEN_MODEL_PICKER":
      return {
        ...state,
        screen: "brand-picker",
        modelPicker: { from: action.from ?? "review", brand: null, series: null },
      };
    case "SELECT_BRAND":
      return {
        ...state,
        screen: "series-picker",
        modelPicker: { ...state.modelPicker, brand: action.brand, series: null },
      };
    case "SELECT_SERIES":
      return {
        ...state,
        screen: "trim-picker",
        modelPicker: { ...state.modelPicker, series: action.series },
      };
    case "SELECT_TRIM": {
      const { from, brand, series } = state.modelPicker;
      if (from === "owner") {
        return {
          ...state,
          screen: "owner",
          ownerPage: {
            ...state.ownerPage,
            model: `${series} ${action.trim}`,
            brand,
            // 대리점은 브랜드마다 다르므로 차량이 바뀌면 다시 고르게 한다.
            dealer: state.ownerPage.brand === brand ? state.ownerPage.dealer : "",
          },
        };
      }
      return {
        ...state,
        screen: "review",
        model: { name: series, trim: action.trim },
      };
    }
    case "OPEN_DEALER_PICKER":
      return { ...state, screen: "dealer-picker" };
    case "SELECT_DEALER":
      return {
        ...state,
        screen: "owner",
        ownerPage: { ...state.ownerPage, dealer: action.value },
      };
    // 차주가 구매 시기 시트. 이미 고른 값("2026년 9월 29일")이 있으면 그 날짜에서,
    // 없으면 오늘(action.today)에서 연다. 오늘은 화면이 넘겨 준다(리듀서는 순수하게).
    case "OPEN_OWNER_DATE": {
      const parts = state.ownerPage.purchaseTime.match(/\d+/g)?.map(Number);
      const [year, month, day] = parts?.length === 3
        ? parts
        : [action.today.year, action.today.month, action.today.day];
      return { ...state, ownerDateSheet: { year, month, day } };
    }
    case "SET_OWNER_DATE":
      return { ...state, ownerDateSheet: action.value };
    case "CLOSE_OWNER_DATE":
      return { ...state, ownerDateSheet: null };
    case "CONFIRM_OWNER_DATE": {
      const { year, month, day } = state.ownerDateSheet;
      return {
        ...state,
        ownerDateSheet: null,
        ownerPage: {
          ...state.ownerPage,
          purchaseTime: `${year}년 ${month}월 ${day}일`,
        },
      };
    }
    case "OPEN_SCREEN":
      return { ...state, screen: action.screen };
    case "OPEN_CITY_PICKER":
      return {
        ...state,
        screen: "city-picker",
        cityPickerFrom: action.from ?? "review",
      };
    case "BACK": {
      const parent = parentScreen(state);
      return parent ? { ...state, screen: parent } : state;
    }
    case "HISTORY_BACK": {
      if (state.saleSheet) return { ...state, saleSheet: null };
      if (state.ownerDateSheet) return { ...state, ownerDateSheet: null };
      if (state.datePicker.open) {
        return { ...state, datePicker: { ...state.datePicker, open: false } };
      }
      const parent = parentScreen(state);
      return parent ? { ...state, screen: parent } : state;
    }
    case "SELECT_CITY":
      if (state.cityPickerFrom === "owner") {
        return {
          ...state,
          screen: "owner",
          ownerPage: { ...state.ownerPage, city: action.value },
        };
      }
      return {
        ...state,
        screen: "review",
        ownerInfo: { ...state.ownerInfo, city: action.value },
      };
    case "TOGGLE_OWNER":
      return { ...state, isOwner: !state.isOwner };
    // 이미 고른 값("2026년 9월")이 있으면 그 위치에서 휠을 연다.
    case "OPEN_DATE_PICKER": {
      const [year, month] = state.ownerInfo.deliveryTime.split(" ");
      return {
        ...state,
        datePicker: { open: true, year: year || "2026년", month: month || "9월" },
      };
    }
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
          deliveryTime: `${state.datePicker.year} ${state.datePicker.month}`,
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
    // 시트를 열 때 현재 값을 draft 초기값으로 옮겨 담는다. 필드마다 값의
    // 형태가 달라서(휠은 컬럼별 객체, 색상·가격은 문자열) 여기서 풀어 준다.
    case "OPEN_SALE_SHEET": {
      const sale = state.sale;
      const draft = {
        delivery: () => {
          const [year, month] = sale.delivery.split(" ");
          return { year: year || "2026년", month: month || "1월" };
        },
        mileage: () => {
          const [man, cheon] = sale.mileage.split(" ");
          return { man: man || "0만", cheon: cheon || "0천" };
        },
        transfers: () => ({ count: sale.transfers || "0회" }),
        color: () => sale.color,
        price: () => (sale.price === "0.00" ? "" : sale.price),
      }[action.field];
      return { ...state, saleSheet: { field: action.field, draft: draft() } };
    }
    case "SET_SALE_SHEET_DRAFT":
      return {
        ...state,
        saleSheet: { ...state.saleSheet, draft: action.value },
      };
    case "CLOSE_SALE_SHEET":
      return { ...state, saleSheet: null };
    // draft 를 필드에 맞는 표시 문자열로 합쳐 넣는다.
    case "CONFIRM_SALE_SHEET": {
      const { field, draft } = state.saleSheet;
      const value = {
        delivery: () => `${draft.year} ${draft.month}`,
        mileage: () => `${draft.man} ${draft.cheon}`,
        transfers: () => draft.count,
        color: () => draft,
        price: () => (draft === "" ? "0.00" : draft),
      }[field]();
      return { ...state, sale: { ...state.sale, [field]: value }, saleSheet: null };
    }
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
