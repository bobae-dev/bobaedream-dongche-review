export const categories = ['외관', '내장', '공간', '옵션', '주행감', '연비·전비'];
export const selectedCategories = ['외관', '내장', '공간', '옵션', '주행감', '연비·전비'];

export const localizedCopy = {
  title: '리뷰 작성',
  publish: '게시',
  vehicleInfo: '차량 정보',
  overallScore: '종합 점수',
  owner: '차주입니다',
  addCover: '대표 사진 추가',
  navigation: ['소식', '차량 점수', '질문', '영상', '긴 글', '판매글', '차주가', '에너지']
};

export const newsCopy = {
  imageCard: 'AI로 이미지 만들기',
  imageCardAction: '사진을 올려 노출 늘리기',
  titlePlaceholder: '제목을 추가하면 추천되기 쉬워요 (선택)',
  bodyPlaceholder: '본문을 입력해 차량 구매·이용 경험과 자동차 생활을 공유해 보세요',
  aiHelp: 'AI 도와줘',
  shareHint: '이런 내용을 공유하면 더 인기가 많아요~',
  shareLink: '실용적인 정보',
  checkInTitle: '체크인 장소',
  topicTitle: '주제 추가',
  vehicle: 'AMG GT'
};

export const questionCopy = {
  photoAction: '사진 추가',
  videoAction: '영상 추가',
  titlePlaceholder: '궁금한 점이 있나요? 빠르게 해결해 보세요!',
  topicTitle: '주제 추가',
  vehicle: 'AMG GT'
};

export const longPostCopy = {
  titlePlaceholder: '제목을 추가하면 추천되기 쉬워요 (선택)',
  bodyPlaceholder: '본문을 입력해 차량 구매·이용 경험과 자동차 생활을 공유해 보세요',
  shareHint: '이런 내용을 공유하면 더 인기가 많아요~',
  shareLink: '실용적인 정보',
  topicTitle: '주제 추가',
  vehicle: 'AMG GT',
  bottomActions: ['표정', '사진', '가격', '정비']
};

export const saleCopy = {
  header: '판매글',
  publish: '게시',
  photoHint: '사진을 한 장 이상 추가하면 게시할 수 있어요',
  vehiclePhoto: '우수 차량 사진',
  vehicle: '드림카 05 2024년형 프리미엄 DM-i 55KM 럭셔리형',
  bodyPlaceholder: '차량과 함께한 이야기를 공유하면 더 많은 사람에게 노출돼요',
  aiHelp: 'AI 도와줘',
  clear: '초기화',
  location: '양천구'
};

export const ownerCopy = {
  rewardTitle: '보상 안내',
  receiptUpload: '구매 영수증 업로드',
  otherInfo: '기타 정보',
  location: '구매 지역',
  model: '브랜드·차종',
  barePrice: '차량 가격',
  totalPrice: '실구매 가격',
  purchaseTime: '구매 시기',
  note: '비고'
};

export const energyCopy = {
  tab: '에너지',
  notice: '차량을 선택하면 아래에 연비·전비 입력란이 자동으로 표시돼요',
  photoAction: '에너지 사진 추가',
  titlePlaceholder: '제목을 추가하면 추천되기 쉬워요 (선택)',
  bodyPlaceholder: '차량의 연비·전비와 충전 경험을 공유해 주세요',
  bindVehicle: '차량 연결',
  vehicle: '차량 연결'
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
  brandQuery: '',
  news: { title: '', body: '' },
  question: { title: '', body: '' },
  longPost: { title: '', body: '' },
  sale: { delivery: '2024년 4월', mileage: '', color: '흰색', transfers: '0회', price: '0.00', title: '', body: '' },
  ownerPage: { model: '', barePrice: '', totalPrice: '', purchaseTime: '', city: '양천구', note: '' },
  energy: { title: '', body: '' }
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
    case 'OPEN_NEWS':
      return { ...state, screen: 'news' };
    case 'OPEN_QUESTION':
      return { ...state, screen: 'question' };
    case 'OPEN_LONG_POST':
      return { ...state, screen: 'long-post' };
    case 'OPEN_SALE':
      return { ...state, screen: 'sale' };
    case 'OPEN_OWNER':
      return { ...state, screen: 'owner' };
    case 'OPEN_ENERGY':
      return { ...state, screen: 'energy' };
    case 'OPEN_REVIEW':
      return { ...state, screen: 'review' };
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
    case 'SET_NEWS_FIELD':
      return { ...state, news: { ...state.news, [action.field]: action.value } };
    case 'SET_QUESTION_FIELD':
      return { ...state, question: { ...state.question, [action.field]: action.value } };
    case 'SET_LONG_POST_FIELD':
      return { ...state, longPost: { ...state.longPost, [action.field]: action.value } };
    case 'SET_SALE_FIELD':
      return { ...state, sale: { ...state.sale, [action.field]: action.value } };
    case 'SET_OWNER_PAGE_FIELD':
      return { ...state, ownerPage: { ...state.ownerPage, [action.field]: action.value } };
    case 'SET_ENERGY_FIELD':
      return { ...state, energy: { ...state.energy, [action.field]: action.value } };
    default:
      return state;
  }
}
