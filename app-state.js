export const categories = ['외관', '내장', '공간', '옵션', '주행감', '연비·전비'];
export const selectedCategories = ['외관', '내장', '공간', '옵션', '주행감', '연비·전비'];

export const localizedCopy = {
  title: '리뷰 작성',
  publish: '게시',
  vehicleInfo: '차량 정보',
  overallScore: '종합 점수',
  owner: '차주입니다',
  addCover: '대표 사진 추가'
};

export const brands = [
  '아우디', 'AITO 아이토', '아이안', '아바타', '아우디 AUDI', '애스턴 마틴',
  '알파 로메오', 'AIVA', '아이츠', '안카 버스', 'AUXUN 아오쉔', 'ALPINA'
];

export const initialState = {
  screen: 'review',
  model: null,
  isOwner: false,
  ownerInfo: { deliveryTime: '', city: '', barePrice: '', totalPrice: '', mileage: '' },
  datePicker: { open: false, year: 2026, month: 9 },
  ratings: Object.fromEntries(categories.map((category) => [category, 0])),
  comment: '',
  brandQuery: ''
};

export function starFillPercent(rating, starValue) {
  if (rating >= starValue) return 100;
  if (rating >= starValue - 0.5) return 50;
  return 0;
}

export function reviewCategories(model) {
  return model ? selectedCategories : categories;
}

export function reduce(state, action) {
  switch (action.type) {
    case 'OPEN_MODEL_PICKER':
      return { ...state, screen: 'brand-picker' };
    case 'OPEN_CITY_PICKER':
      return { ...state, screen: 'city-picker' };
    case 'BACK':
      return { ...state, screen: 'review' };
    case 'SELECT_MODEL':
      return { ...state, screen: 'review', model: { name: action.model, trim: action.trim } };
    case 'SELECT_CITY':
      return { ...state, screen: 'review', ownerInfo: { ...state.ownerInfo, city: action.value } };
    case 'TOGGLE_OWNER':
      return { ...state, isOwner: !state.isOwner };
    case 'OPEN_DATE_PICKER':
      return {
        ...state,
        datePicker: {
          open: true,
          year: state.ownerInfo.deliveryTime ? Number(state.ownerInfo.deliveryTime.slice(0, 4)) : 2026,
          month: state.ownerInfo.deliveryTime ? Number(state.ownerInfo.deliveryTime.match(/(\d+)월/)?.[1]) : 9
        }
      };
    case 'SET_DATE_PART':
      return { ...state, datePicker: { ...state.datePicker, [action.part]: action.value } };
    case 'CANCEL_DATE_PICKER':
      return { ...state, datePicker: { ...state.datePicker, open: false } };
    case 'CONFIRM_DATE_PICKER':
      return {
        ...state,
        datePicker: { ...state.datePicker, open: false },
        ownerInfo: {
          ...state.ownerInfo,
          deliveryTime: `${state.datePicker.year}년 ${state.datePicker.month}월`
        }
      };
    case 'SET_OWNER_FIELD':
      return { ...state, ownerInfo: { ...state.ownerInfo, [action.field]: action.value } };
    case 'SET_RATING':
      return { ...state, ratings: { ...state.ratings, [action.category]: action.value } };
    case 'SET_COMMENT':
      return { ...state, comment: action.value };
    case 'SET_BRAND_QUERY':
      return { ...state, brandQuery: action.value };
    default:
      return state;
  }
}
