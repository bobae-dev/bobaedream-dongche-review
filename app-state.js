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

export const ratingLabels = {
  '외관': ['매우 못생김', '간신히 받아들일 만함', '특별할 것 없이 무난함', '외관이 강점', '외관의 정점'],
  '내장': ['받아들이기 어려움', '간신히 받아들일 만함', '수수하고 꾸밈없음', '보기 좋고 만족스러움', '디자인이 완벽함'],
  '공간': ['좁고 답답함', '공간이 제한적임', '딱 필요한 만큼임', '비교적 넉넉함', '매우 넉넉함'],
  '옵션': ['기본 옵션도 부족함', '간단한 기본 구성', '일상에 충분함', '편안하고 만족스러움', '옵션이 매우 풍부함'],
  '주행감': ['견디기 어려움', '다소 부족함', '무난하고 평균적임', '주행에 자신감을 줌', '차와 완벽하게 하나가 됨'],
  '연비·전비': ['기름을 삼키는 수준', '연료를 많이 먹음', '보통 수준', '연비가 우수함', '절약적이고 효율적임']
};

export function ratingDescription(category, rating) {
  if (!rating || !ratingLabels[category]) return '';
  const index = Math.min(ratingLabels[category].length - 1, Math.max(0, Math.ceil(rating) - 1));
  return ratingLabels[category][index];
}

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
