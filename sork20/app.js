import { brands, initialState, reduce, reviewCategories, starFillPercent, ratingDescription, localizedCopy, newsCopy, questionCopy, longPostCopy, saleCopy, ownerCopy, energyCopy } from './app-state.js';

let state = structuredClone(initialState);
const app = document.querySelector('#app');
let activeRatingPopup = null;
let ratingPopupTimer;
let selectedCover = null;
let navDrag = null;
let suppressNavClick = false;
const cityGroups = [
  ['A', ['아라산', '안산', '안칭', '안양', '아바', '안순', '아리', '안캉', '악쑤', '아러타이', '아라얼', '마카오']],
  ['B', ['베이징', '바오딩', '바오터우', '바옌나오얼']]
];

function renderStars(category, index) {
  const rating = state.ratings[category] || 0;
  const popup = activeRatingPopup?.category === category ? activeRatingPopup : null;
  const popupBase = popup ? Math.min(5, Math.floor(popup.value * 2) / 2) : 0;
  const popupValues = popup ? [popupBase, Math.min(5, popupBase + 0.5)] : [];
  return `<div class="rating-control"><div class="stars" role="group" aria-label="${category} 점수">${[1, 2, 3, 4, 5].map((value) => {
    const percent = starFillPercent(rating, value);
    const id = `star-clip-${index}-${value}`;
    const points = '50,5 61,38 95,38 68,58 79,91 50,71 21,91 32,58 5,38 39,38';
    return `<span class="star-wrap"><svg class="star-visual" viewBox="0 0 100 100" aria-hidden="true"><defs><clipPath id="${id}"><rect width="${percent}" height="100" /></clipPath></defs><polygon points="${points}" fill="#e2e6ef"/><polygon points="${points}" fill="#ffc928" clip-path="url(#${id})" /></svg><button class="star-half left" aria-label="${value - 0.5}점" data-rating="${value - 0.5}" data-category="${category}"></button><button class="star-half right" aria-label="${value}점" data-rating="${value}" data-category="${category}"></button></span>`;
  }).join('')}</div>${popup ? `<div class="rating-popover">${popupValues.map((value) => `<button data-popup-rating="${value}" data-category="${category}" class="${value === rating ? 'selected' : ''}"><span class="mini-star">★</span>${value.toFixed(1)}점</button>`).join('')}</div>` : ''}</div>`;
}

function renderModelCard() {
  if (!state.model) return `<section class="card model-card"><h2>차량 선택 <em>*</em></h2><button class="add-model" data-action="open-model-picker"><strong>＋</strong><span>차량 추가</span></button></section>`;
  const info = state.ownerInfo;
  return `<section class="card selected-model-card"><div class="model-summary"><div><h2>AITO M8</h2><p>2025년형 레인지 익스텐더 Ultra 6인승 AWD</p></div><div class="car-placeholder">🚙</div></div><button class="owner-row" data-action="toggle-owner"><span class="checkbox ${state.isOwner ? 'checked' : ''}">${state.isOwner ? '✓' : ''}</span><strong>차주입니다</strong><span>구매 정보를 입력하면 베스트 리뷰에 선정될 수 있어요</span></button>${state.isOwner ? `<div class="owner-fields"><label>인도 시기<em>*</em><input data-action="open-date-picker" value="${info.deliveryTime}" placeholder="인도 시기를 선택하세요" readonly /><b>›</b></label><label>구매 지역<em>*</em><input data-action="open-city-picker" value="${info.city}" placeholder="구매 지역을 선택하세요" readonly /><b>›</b></label><label>차량 가격<em>*</em><input data-owner-field="barePrice" value="${info.barePrice}" placeholder="소수점 둘째 자리까지 입력" inputmode="decimal" /><span>만원</span></label><label>실구매 가격<input data-owner-field="totalPrice" value="${info.totalPrice}" placeholder="소수점 둘째 자리까지 입력" inputmode="decimal" /><span>만원</span></label><label>차량 연비<em>*</em><input data-owner-field="mileage" value="${info.mileage}" placeholder="평균 연비를 입력하세요" inputmode="decimal" /><span>L/100km</span></label></div>` : '<div class="hint">차주 정보를 입력하면 리뷰의 신뢰도를 높일 수 있어요! <button aria-label="안내 닫기">×</button></div>'}</section>`;
}

function renderCityPicker() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  return `<section class="city-picker-screen"><header class="city-picker-header"><button class="back-button" data-action="back" aria-label="뒤로">‹</button><h1>구매 지역 선택</h1></header><main class="city-list">${cityGroups.map(([letter, cities]) => `<div class="city-group"><div class="city-letter">${letter}</div>${cities.map((city) => `<button class="city-row" data-city="${city}">${city}</button>`).join('')}</div>`).join('')}</main><nav class="city-index">${letters.map((letter) => `<span>${letter}</span>`).join('')}</nav></section>`;
}

function renderDatePicker() {
  if (!state.datePicker.open) return '';
  const years = [2024, 2025, 2026, 2027, 2028];
  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  return `<div class="date-picker-backdrop"><section class="date-picker" role="dialog" aria-label="인도 시기 선택"><div class="date-actions"><button data-action="cancel-date-picker">취소</button><span></span><button data-action="confirm-date-picker">확인</button></div><div class="date-columns"><div class="date-column">${years.map((year) => `<button class="date-option ${year === state.datePicker.year ? 'selected' : ''}" data-date-part="year" data-date-value="${year}">${year}년</button>`).join('')}</div><div class="date-column">${months.map((month) => `<button class="date-option ${month === state.datePicker.month ? 'selected' : ''}" data-date-part="month" data-date-value="${month}">${month}월</button>`).join('')}</div></div></section></div>`;
}

function renderSourceNavigation(selectedIndex) {
  return `<nav class="source-navigation" aria-label="주요 메뉴"><button class="nav-back" data-action="back" aria-label="뒤로">‹</button><div class="nav-tabs">${localizedCopy.navigation.map((item, index) => `<button class="nav-tab ${index === selectedIndex ? 'selected' : ''}" data-nav-item="${item}">${item}</button>`).join('')}</div><button class="nav-publish">➤ 게시</button></nav>`;
}

function renderReview() {
  const categories = reviewCategories(state.model);
  const average = (categories.reduce((sum, category) => sum + (state.ratings[category] || 0), 0) / categories.length).toFixed(2);
  return `${renderSourceNavigation(1)}
    <header class="topbar review-topbar"><button class="icon-button" data-action="noop" aria-label="닫기">×</button><strong class="brand-title">리뷰 작성</strong><span class="swap-icon">⇄</span><button class="publish">◁ 게시</button></header>
    <section class="exposure-banner"><div class="speech">300자 이상 작성하면 더 많은 사람에게 노출돼요</div><div class="progress-line"><span class="car-dot">▰</span><span></span><span class="gift">♢</span></div><div class="progress-labels"><span>리뷰 선정 기회</span><span>베스트 리뷰 선정 시 더 많은 혜택</span></div></section>
    ${renderModelCard()}
    <section class="card rating-card"><div class="section-heading"><h2>종합 점수 ${state.model ? `<b class="overall-score">${average}점</b>` : ''}</h2><button class="help">ⓘ 점수 안내</button></div><div class="hint">점수는 어떻게 매기면 좋을까요? 한 번에 쉽게 작성해 보세요! <button aria-label="안내 닫기">×</button></div><div class="rating-list">${categories.map((category, index) => `<div class="rating-row"><label>${category}<em>*</em></label><span class="rating-description">${ratingDescription(category, state.ratings[category] || 0)}</span>${renderStars(category, index)}</div>`).join('')}</div></section>
    <section class="card comment-card"><h2>한줄 리뷰 <em>*</em></h2><textarea data-action="comment" placeholder="차량의 특징과 실제 경험을 간단하게 작성해 주세요. 4.5점 이상 또는 3점 이하로 평가한 항목은 구체적인 이유를 함께 적어주시면 좋아요.">${state.comment}</textarea><div class="comment-meta"><span><b>30</b>자 이상 작성해야 게시할 수 있어요</span><button>ⓘ 리뷰 작성 가이드</button></div><div class="guide-banner">작성 가이드를 참고하면 더 좋은 리뷰를 쉽게 완성할 수 있어요! <button aria-label="안내 닫기">×</button></div></section>
    <section class="card photo-card">${selectedCover ? `<div class="cover-preview"><img src="${selectedCover.url}" alt="${selectedCover.name}"><div class="cover-status">✓ 사진 1장 선택됨</div><button class="cover-remove" data-action="remove-cover" aria-label="사진 삭제">×</button></div>` : `<button class="add-cover" data-action="open-cover-picker"><strong>＋</strong><span>대표 사진 추가</span></button>`}<input id="cover-file-input" class="visually-hidden" type="file" accept="image/*" /></section><div class="upload-error">ⓘ 차량 사진을 추가해 주세요</div>`;
}

function renderNews() {
  const places = ['TOWN HOUSE카페', '천 송이 장미 정원', '묘봉산 숲 공원'];
  const topics = ['자주 묻는 배터리 질문', '차량 내비게이션·스마트폰', '주말 드라이브'];
  return `${renderSourceNavigation(0)}
    <main class="news-screen">
      <section class="news-media-card" aria-label="콘텐츠 도구">
        <button class="news-tool news-ai-tool"><span class="tool-icon">✦</span><strong>${newsCopy.imageCard}</strong></button>
        <button class="news-tool news-upload-tool"><span class="tool-plus">＋</span><strong>${newsCopy.imageCardAction}</strong></button>
      </section>
      <section class="news-editor-card">
        <input class="news-title-input" data-news-field="title" value="${state.news.title}" placeholder="${newsCopy.titlePlaceholder}" aria-label="게시글 제목" />
        <textarea class="news-body-input" data-news-field="body" placeholder="${newsCopy.bodyPlaceholder}" aria-label="게시글 본문">${state.news.body}</textarea>
        <button class="ai-help-button"><span>AI</span>${newsCopy.aiHelp}</button>
        <p class="news-share-hint"><span class="hint-bulb">♧</span>${newsCopy.shareHint}<a href="#">${newsCopy.shareLink}</a></p>
      </section>
      <section class="news-chip-row" aria-label="체크인 장소"><button class="news-row-label"><span>⌖</span><strong>${newsCopy.checkInTitle}</strong><b>›</b></button><div class="news-chips">${places.map((place) => `<button class="news-chip">${place}</button>`).join('')}</div></section>
      <section class="news-chip-row" aria-label="주제 추가"><button class="news-row-label"><span>#</span><strong>${newsCopy.topicTitle}</strong><b>›</b></button><div class="news-chips">${topics.map((topic) => `<button class="news-chip">${topic}</button>`).join('')}</div></section>
    </main>
    <footer class="news-footer"><div class="news-vehicle"><span class="vehicle-mark">C</span><strong>${newsCopy.vehicle}</strong><i></i><button aria-label="차량 닫기">×</button></div><nav class="news-bottom-nav" aria-label="하단 메뉴"><button aria-label="표정">☺</button><button aria-label="통계">▥</button><button aria-label="위치">⌖</button></nav></footer>`;
}

function renderQuestion() {
  const topics = ['자주 묻는 배터리 질문', '차량 내비게이션·스마트폰', '주말 드라이브'];
  const bodyLength = state.question.body.length;
  return `${renderSourceNavigation(2)}
    <main class="question-screen">
      <section class="question-media-card" aria-label="질문 첨부 도구">
        <button class="question-tool"><span class="question-image-icon">▱</span><strong>${questionCopy.photoAction}</strong></button>
        <button class="question-tool"><span class="question-video-icon">▻</span><strong>${questionCopy.videoAction}</strong></button>
      </section>
      <section class="question-editor-card">
        <input class="question-title-input" data-question-field="title" value="${state.question.title}" placeholder="${questionCopy.titlePlaceholder}" aria-label="질문 제목" />
        <textarea class="question-body-input" data-question-field="body" placeholder="질문 내용을 자세히 작성해 주세요" aria-label="질문 본문">${state.question.body}</textarea>
        <p class="question-count">${bodyLength}/2000</p>
      </section>
      <section class="news-chip-row question-topic-row" aria-label="주제 추가"><button class="news-row-label"><span>#</span><strong>${questionCopy.topicTitle}</strong><b>›</b></button><div class="news-chips">${topics.map((topic) => `<button class="news-chip">${topic}</button>`).join('')}</div></section>
    </main>
    <footer class="news-footer"><div class="news-vehicle"><span class="vehicle-mark">C</span><strong>${questionCopy.vehicle}</strong><i></i><button aria-label="차량 닫기">×</button></div><nav class="news-bottom-nav" aria-label="하단 메뉴"><button aria-label="표정">☺</button><button aria-label="통계">▥</button><button aria-label="위치">⌖</button></nav></footer>`;
}

function renderLongPost() {
  const topics = ['자주 묻는 배터리 질문', '차량 내비게이션·스마트폰', '주말 드라이브'];
  return `${renderSourceNavigation(4)}
    <main class="long-post-screen">
      <section class="long-post-editor-card">
        <input class="long-post-title-input" data-long-post-field="title" value="${state.longPost.title}" placeholder="${longPostCopy.titlePlaceholder}" aria-label="긴 글 제목" />
        <textarea class="long-post-body-input" data-long-post-field="body" placeholder="${longPostCopy.bodyPlaceholder}" aria-label="긴 글 본문">${state.longPost.body}</textarea>
        <p class="long-post-share-hint"><span>♧</span>${longPostCopy.shareHint}<a href="#">${longPostCopy.shareLink}</a></p>
      </section>
      <section class="news-chip-row long-post-topic-row" aria-label="주제 추가"><button class="news-row-label"><span>#</span><strong>${longPostCopy.topicTitle}</strong><b>›</b></button><div class="news-chips">${topics.map((topic) => `<button class="news-chip">${topic}</button>`).join('')}</div></section>
    </main>
    <footer class="news-footer"><div class="news-vehicle"><span class="vehicle-mark">C</span><strong>${longPostCopy.vehicle}</strong><i></i><button aria-label="차량 닫기">×</button></div><nav class="news-bottom-nav long-post-bottom-nav" aria-label="하단 메뉴">${longPostCopy.bottomActions.map((label) => `<button aria-label="${label}">${label === '표정' ? '☺' : label === '사진' ? '▱' : label === '가격' ? '￥' : '⌕'}</button>`).join('')}</nav></footer>`;
}

function renderSale() {
  const info = state.sale;
  const vehicleRows = [
    ['인도 연월', 'delivery', info.delivery, true],
    ['현재 주행거리(만 km)', 'mileage', info.mileage, true],
    ['차량 색상', 'color', info.color, true],
    ['소유권 이전 횟수', 'transfers', info.transfers, true],
    ['희망 판매가(만원)', 'price', info.price, true]
  ];
  return `<main class="sale-screen">
    <header class="sale-header"><button class="sale-close" data-action="back" aria-label="닫기">×</button><strong>${saleCopy.header}</strong><span class="sale-swap">⇄</span><button class="sale-publish">◁ ${saleCopy.publish}</button></header>
    <p class="sale-photo-hint">${saleCopy.photoHint}, 여러 각도의 외관과 실내 사진을 추가하면<br />노출을 크게 높일 수 있어요!</p>
    <section class="sale-photo-card"><button class="sale-photo-add"><strong>＋</strong><span>${saleCopy.vehiclePhoto}</span></button></section>
    <section class="sale-info-card"><div class="sale-vehicle-heading"><span class="vehicle-outline">▱</span><strong>${saleCopy.vehicle}</strong><button aria-label="차량 변경">⇄</button></div><div class="sale-fields">${vehicleRows.map(([label, field, value, required]) => `<label class="sale-field"><span>${label}${required ? '<em>*</em>' : ''}</span><input data-sale-field="${field}" value="${value}" placeholder="${field === 'mileage' ? '선택' : ''}" ${field === 'delivery' || field === 'color' || field === 'transfers' ? 'readonly' : ''} /><b>›</b></label>`).join('')}</div></section>
    <section class="sale-editor-card"><input class="sale-title-input" data-sale-field="title" value="${info.title}" placeholder="제목을 추가하면 추천되기 쉬워요 (선택)" aria-label="판매글 제목" /><textarea class="sale-body-input" data-sale-field="body" placeholder="${saleCopy.bodyPlaceholder}" aria-label="판매글 본문">${info.body}</textarea><div class="sale-tools"><button class="ai-help-button"><span>AI</span>${saleCopy.aiHelp}</button><button class="sale-tool-button">${saleCopy.clear}</button><button class="sale-tool-button">⌖ ${saleCopy.location}</button><span class="sale-count">${info.body.length}/2000</span></div></section>
  </main>`;
}

function renderOwner() {
  const info = state.ownerPage;
  const fields = [
    [ownerCopy.model, 'model', info.model, '차종을 선택하세요', false],
    [ownerCopy.barePrice, 'barePrice', info.barePrice, '소수점 둘째 자리까지 입력 · 만원', false],
    [ownerCopy.totalPrice, 'totalPrice', info.totalPrice, '소수점 둘째 자리까지 입력 · 만원', false],
    [ownerCopy.purchaseTime, 'purchaseTime', info.purchaseTime, '시간을 선택하세요', false],
    [ownerCopy.location, 'city', info.city, '', true]
  ];
  return `${renderSourceNavigation(6)}
    <main class="owner-screen">
      <section class="owner-reward-card"><h2>${ownerCopy.rewardTitle}<span>?</span></h2><p><b>✓</b> 차주 인증이 완료되면, 차종별 친구들에게 <strong>기여 포인트</strong>를 드려요</p><p><b>✓</b> 구매 영수증 인증이 완료되면, <strong>300~500 코인</strong>을 드려요</p><button class="owner-receipt-upload"><span>＋</span><strong>${ownerCopy.receiptUpload}</strong><small>자동으로 인식해 드려요</small></button></section>
      <section class="owner-fields-card">${fields.map(([label, field, value, placeholder, readonly]) => `<label class="owner-page-field"><strong>${label}<em>*</em></strong><input data-owner-page-field="${field}" value="${value}" placeholder="${placeholder}" ${readonly ? 'readonly' : ''} /><b>›</b></label>`).join('')}</section>
      <section class="owner-note-card"><h2>${ownerCopy.note}</h2><textarea data-owner-page-field="note" placeholder="예: 서비스 비용 3,000원, 추가 장착 내비게이션 1,280원, 연간 주행거리와 정비 기록을 적어 주세요.">${info.note}</textarea></section>
      <button class="owner-other-info"><strong>${ownerCopy.otherInfo}</strong><span>(추가로 작성할수록 검토가 빨라져요) ▼</span></button>
    </main>`;
}

function renderEnergy() {
  const info = state.energy;
  return `${renderSourceNavigation(7)}
    <main class="energy-screen">
      <p class="energy-notice"><span>ⓘ</span>${energyCopy.notice}</p>
      <section class="energy-photo-card"><button class="energy-photo-add"><strong>＋</strong><span>${energyCopy.photoAction}</span></button><div class="energy-reference energy-reference-drive"><b>참고 예시</b></div><div class="energy-reference energy-reference-gauge"><b>참고 예시</b><span>300.7</span></div></section>
      <section class="energy-editor-card"><input class="energy-title-input" data-energy-field="title" value="${info.title}" placeholder="${energyCopy.titlePlaceholder}" aria-label="에너지 제목" /><textarea class="energy-body-input" data-energy-field="body" placeholder="${energyCopy.bodyPlaceholder}" aria-label="에너지 본문">${info.body}</textarea></section>
      <button class="energy-bind-row"><span>▱</span><strong>${energyCopy.bindVehicle}<em>*</em></strong><b>›</b></button>
    </main>`;
}

function renderBrandPicker() {
  const visibleBrands = brands.filter((brand) => brand.toLowerCase().includes(state.brandQuery.toLowerCase()));
  return `<header class="picker-header"><button class="back-button" data-action="back" aria-label="뒤로">←</button><h1>차량 선택</h1></header><label class="search"><span>⌕</span><input data-action="brand-query" value="${state.brandQuery}" placeholder="차량 브랜드를 검색하세요" /><b>▣</b></label><div class="brand-index">A<br>B<br>C<br>D<br>E<br>F<br>G<br>H<br>I<br>J<br>K<br>L<br>M<br>N<br>O<br>P<br>Q<br>R<br>S<br>T<br>U<br>V<br>W<br>X<br>Y<br>Z</div><div class="brand-list"><div class="letter">A</div>${visibleBrands.map((brand) => `<button class="brand-row"><span class="brand-logo">◉</span><span>${brand}</span></button>`).join('')}</div>`;
}

function render() {
  app.innerHTML = state.screen === 'review' ? `${renderReview()}${renderDatePicker()}` : state.screen === 'news' ? renderNews() : state.screen === 'question' ? renderQuestion() : state.screen === 'long-post' ? renderLongPost() : state.screen === 'sale' ? renderSale() : state.screen === 'owner' ? renderOwner() : state.screen === 'energy' ? renderEnergy() : state.screen === 'city-picker' ? renderCityPicker() : renderBrandPicker();
  app.querySelector('.nav-tab.selected')?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'auto' });
}

app.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action], [data-rating], [data-popup-rating], [data-date-part], [data-city], [data-nav-item], .brand-row');
  if (!target) return;
  if (target.dataset.navItem && suppressNavClick) {
    suppressNavClick = false;
    return;
  }
  if (target.dataset.navItem === '소식') state = reduce(state, { type: 'OPEN_NEWS' });
  if (target.dataset.navItem === '차량 점수') state = reduce(state, { type: 'OPEN_REVIEW' });
  if (target.dataset.navItem === '질문') state = reduce(state, { type: 'OPEN_QUESTION' });
  if (target.dataset.navItem === '긴 글') state = reduce(state, { type: 'OPEN_LONG_POST' });
  if (target.dataset.navItem === '판매글') state = reduce(state, { type: 'OPEN_SALE' });
  if (target.dataset.navItem === '차주가') state = reduce(state, { type: 'OPEN_OWNER' });
  if (target.dataset.navItem === '에너지') state = reduce(state, { type: 'OPEN_ENERGY' });
  if (target.dataset.action === 'open-model-picker') state = reduce(state, { type: 'OPEN_MODEL_PICKER' });
  if (target.dataset.action === 'back') state = reduce(state, { type: 'BACK' });
  if (target.dataset.action === 'toggle-owner') state = reduce(state, { type: 'TOGGLE_OWNER' });
  if (target.dataset.action === 'open-date-picker') state = reduce(state, { type: 'OPEN_DATE_PICKER' });
  if (target.dataset.action === 'open-city-picker') state = reduce(state, { type: 'OPEN_CITY_PICKER' });
  if (target.dataset.action === 'cancel-date-picker') state = reduce(state, { type: 'CANCEL_DATE_PICKER' });
  if (target.dataset.action === 'confirm-date-picker') state = reduce(state, { type: 'CONFIRM_DATE_PICKER' });
  if (target.dataset.action === 'open-cover-picker') {
    app.querySelector('#cover-file-input')?.click();
    return;
  }
  if (target.dataset.action === 'remove-cover') {
    if (selectedCover) URL.revokeObjectURL(selectedCover.url);
    selectedCover = null;
  }
  if (target.dataset.datePart) state = reduce(state, { type: 'SET_DATE_PART', part: target.dataset.datePart, value: Number(target.dataset.dateValue) });
  if (target.dataset.city) state = reduce(state, { type: 'SELECT_CITY', value: target.dataset.city });
  if (target.dataset.popupRating) {
    state = reduce(state, { type: 'SET_RATING', category: target.dataset.category, value: Number(target.dataset.popupRating) });
    activeRatingPopup = null;
  } else if (target.dataset.rating) {
    const value = Number(target.dataset.rating);
    state = reduce(state, { type: 'SET_RATING', category: target.dataset.category, value });
    activeRatingPopup = { category: target.dataset.category, value };
    clearTimeout(ratingPopupTimer);
    ratingPopupTimer = setTimeout(() => { activeRatingPopup = null; render(); }, 1200);
  }
  if (target.classList.contains('brand-row')) state = reduce(state, { type: 'SELECT_MODEL', model: 'AITO M8', trim: '2025년형 레인지 익스텐더 Ultra 6인승 AWD' });
  render();
});

app.addEventListener('mousedown', (event) => {
  const nav = event.target.closest('.nav-tabs');
  if (!nav || event.button !== 0) return;
  navDrag = { nav, startX: event.clientX, startScroll: nav.scrollLeft, moved: false };
  nav.classList.add('dragging');
});

window.addEventListener('mousemove', (event) => {
  if (!navDrag) return;
  const distance = event.clientX - navDrag.startX;
  if (Math.abs(distance) > 4) navDrag.moved = true;
  if (!navDrag.moved) return;
  event.preventDefault();
  navDrag.nav.scrollLeft = navDrag.startScroll - distance;
});

function finishNavDrag() {
  if (!navDrag) return;
  if (navDrag.moved) suppressNavClick = true;
  navDrag.nav.classList.remove('dragging');
  navDrag = null;
  if (suppressNavClick) setTimeout(() => { suppressNavClick = false; }, 120);
}

window.addEventListener('mouseup', finishNavDrag);

app.addEventListener('input', (event) => {
  if (event.target.dataset.action === 'comment') state = reduce(state, { type: 'SET_COMMENT', value: event.target.value });
  if (event.target.dataset.action === 'brand-query') state = reduce(state, { type: 'SET_BRAND_QUERY', value: event.target.value });
  if (event.target.dataset.ownerField) state = reduce(state, { type: 'SET_OWNER_FIELD', field: event.target.dataset.ownerField, value: event.target.value });
  if (event.target.dataset.newsField) state = reduce(state, { type: 'SET_NEWS_FIELD', field: event.target.dataset.newsField, value: event.target.value });
  if (event.target.dataset.questionField) {
    state = reduce(state, { type: 'SET_QUESTION_FIELD', field: event.target.dataset.questionField, value: event.target.value });
    if (event.target.dataset.questionField === 'body') {
      const count = app.querySelector('.question-count');
      if (count) count.textContent = `${state.question.body.length}/2000`;
    }
  }
  if (event.target.dataset.longPostField) state = reduce(state, { type: 'SET_LONG_POST_FIELD', field: event.target.dataset.longPostField, value: event.target.value });
  if (event.target.dataset.saleField) {
    state = reduce(state, { type: 'SET_SALE_FIELD', field: event.target.dataset.saleField, value: event.target.value });
    if (event.target.dataset.saleField === 'body') {
      const count = app.querySelector('.sale-count');
      if (count) count.textContent = `${state.sale.body.length}/2000`;
    }
  }
  if (event.target.dataset.ownerPageField) state = reduce(state, { type: 'SET_OWNER_PAGE_FIELD', field: event.target.dataset.ownerPageField, value: event.target.value });
  if (event.target.dataset.energyField) state = reduce(state, { type: 'SET_ENERGY_FIELD', field: event.target.dataset.energyField, value: event.target.value });
});

app.addEventListener('change', (event) => {
  if (event.target.id !== 'cover-file-input' || !event.target.files?.[0]) return;
  if (selectedCover) URL.revokeObjectURL(selectedCover.url);
  const file = event.target.files[0];
  selectedCover = { name: file.name, url: URL.createObjectURL(file) };
  render();
});

render();
