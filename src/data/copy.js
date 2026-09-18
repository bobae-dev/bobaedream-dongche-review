/**
 * 화면별 고정 문구(UI 텍스트) 모음.
 *
 * 마크업에서 한국어 문자열을 분리해 두는 곳이다. 나중에 다국어가 필요해지면
 * 이 파일만 교체하면 되도록, 컴포넌트는 리터럴 대신 여기를 참조한다.
 *
 * localizedCopy.navigation 은 상단 탭 순서의 원본이기도 하다.
 * (components/SourceNavigation.jsx 가 이 배열을 그대로 렌더링한다)
 *
 * NOTE: 아직 일부 화면에는 이 파일을 거치지 않은 리터럴 문구가 남아 있다.
 *       예) QuestionScreen 의 "질문 내용을 자세히 작성해 주세요"
 */
export const localizedCopy = {
  title: "리뷰 작성",
  publish: "게시",
  vehicleInfo: "차량 정보",
  overallScore: "종합 점수",
  owner: "차주입니다",
  addCover: "대표 사진 추가",
  navigation: [
    "소식",
    "차량 점수",
    "질문",
    "영상",
    "긴 글",
    "판매글",
    "차주가",
    "에너지",
  ],
};

export const newsCopy = {
  imageCard: "AI로 이미지 만들기",
  imageCardAction: "사진을 올려 노출 늘리기",
  titlePlaceholder: "제목을 추가하면 추천되기 쉬워요 (선택)",
  bodyPlaceholder:
    "본문을 입력해 차량 구매·이용 경험과 자동차 생활을 공유해 보세요",
  aiHelp: "AI 도와줘",
  shareHint: "이런 내용을 공유하면 더 인기가 많아요~",
  shareLink: "실용적인 정보",
  checkInTitle: "체크인 장소",
  topicTitle: "주제 추가",
  vehicle: "AMG GT",
};

export const questionCopy = {
  photoAction: "사진 추가",
  videoAction: "영상 추가",
  titlePlaceholder: "궁금한 점이 있나요? 빠르게 해결해 보세요!",
  topicTitle: "주제 추가",
  vehicle: "AMG GT",
};

export const longPostCopy = {
  titlePlaceholder: "제목을 추가하면 추천되기 쉬워요 (선택)",
  bodyPlaceholder:
    "본문을 입력해 차량 구매·이용 경험과 자동차 생활을 공유해 보세요",
  shareHint: "이런 내용을 공유하면 더 인기가 많아요~",
  shareLink: "실용적인 정보",
  topicTitle: "주제 추가",
  vehicle: "AMG GT",
  bottomActions: ["표정", "사진", "가격", "정비"],
};

export const saleCopy = {
  header: "판매글",
  publish: "게시",
  photoHint: "사진을 한 장 이상 추가하면 게시할 수 있어요",
  vehiclePhoto: "우수 차량 사진",
  vehicle: "드림카 05 2024년형 프리미엄 DM-i 55KM 럭셔리형",
  bodyPlaceholder: "차량과 함께한 이야기를 공유하면 더 많은 사람에게 노출돼요",
  aiHelp: "AI 도와줘",
  clear: "초기화",
  location: "위치",
};

export const ownerCopy = {
  rewardTitle: "보상 안내",
  receiptUpload: "구매 영수증 업로드",
  otherInfo: "기타 정보",
  location: "구매 지역",
  model: "브랜드·차종",
  barePrice: "차량 가격",
  totalPrice: "실구매 가격",
  purchaseTime: "구매 시기",
  note: "비고",
};

export const energyCopy = {
  tab: "에너지",
  notice: "차량을 선택하면 아래에 연비·전비 입력란이 자동으로 표시돼요",
  photoAction: "에너지 사진 추가",
  titlePlaceholder: "제목을 추가하면 추천되기 쉬워요 (선택)",
  bodyPlaceholder: "차량의 연비·전비와 충전 경험을 공유해 주세요",
  bindVehicle: "차량 연결",
  vehicle: "차량 연결",
};
