export const categories = ['外观', '内饰', '空间', '配置', '动力操控', '油耗'];
export const selectedCategories = ['外观', '内饰', '空间', '配置', '驾驶感受', '续航能耗'];

export const brands = [
  '奥迪', 'AITO问界', '埃安', '阿维塔', '奥迪AUDI', '阿斯顿·马丁',
  '阿尔法·罗密欧', 'AIVA', '爱驰', '安凯客车', 'AUXUN傲旋', 'ALPINA'
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
          deliveryTime: `${state.datePicker.year}年 ${state.datePicker.month}月`
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
