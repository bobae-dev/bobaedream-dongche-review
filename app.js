import { brands, initialState, reduce, reviewCategories, starFillPercent, ratingDescription } from './app-state.js';

let state = structuredClone(initialState);
const app = document.querySelector('#app');
let activeRatingPopup = null;
let ratingPopupTimer;
let selectedCover = null;
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

function renderReview() {
  const categories = reviewCategories(state.model);
  const average = (categories.reduce((sum, category) => sum + (state.ratings[category] || 0), 0) / categories.length).toFixed(2);
  return `<header class="topbar review-topbar"><button class="icon-button" data-action="noop" aria-label="닫기">×</button><strong class="brand-title">리뷰 작성</strong><span class="swap-icon">⇄</span><button class="publish">◁ 게시</button></header>
    <section class="exposure-banner"><div class="speech">300자 이상 작성하면 더 많은 사람에게 노출돼요</div><div class="progress-line"><span class="car-dot">▰</span><span></span><span class="gift">♢</span></div><div class="progress-labels"><span>리뷰 선정 기회</span><span>베스트 리뷰 선정 시 더 많은 혜택</span></div></section>
    ${renderModelCard()}
    <section class="card rating-card"><div class="section-heading"><h2>종합 점수 ${state.model ? `<b class="overall-score">${average}점</b>` : ''}</h2><button class="help">ⓘ 점수 안내</button></div><div class="hint">점수는 어떻게 매기면 좋을까요? 한 번에 쉽게 작성해 보세요! <button aria-label="안내 닫기">×</button></div><div class="rating-list">${categories.map((category, index) => `<div class="rating-row"><label>${category}<em>*</em></label><span class="rating-description">${ratingDescription(category, state.ratings[category] || 0)}</span>${renderStars(category, index)}</div>`).join('')}</div></section>
    <section class="card comment-card"><h2>한줄 리뷰 <em>*</em></h2><textarea data-action="comment" placeholder="차량의 특징과 실제 경험을 간단하게 작성해 주세요. 4.5점 이상 또는 3점 이하로 평가한 항목은 구체적인 이유를 함께 적어주시면 좋아요.">${state.comment}</textarea><div class="comment-meta"><span><b>30</b>자 이상 작성해야 게시할 수 있어요</span><button>ⓘ 리뷰 작성 가이드</button></div><div class="guide-banner">작성 가이드를 참고하면 더 좋은 리뷰를 쉽게 완성할 수 있어요! <button aria-label="안내 닫기">×</button></div></section>
    <section class="card photo-card">${selectedCover ? `<div class="cover-preview"><img src="${selectedCover.url}" alt="${selectedCover.name}"><div class="cover-status">✓ 사진 1장 선택됨</div><button class="cover-remove" data-action="remove-cover" aria-label="사진 삭제">×</button></div>` : `<button class="add-cover" data-action="open-cover-picker"><strong>＋</strong><span>대표 사진 추가</span></button>`}<input id="cover-file-input" class="visually-hidden" type="file" accept="image/*" /></section><div class="upload-error">ⓘ 차량 사진을 추가해 주세요</div>`;
}

function renderBrandPicker() {
  const visibleBrands = brands.filter((brand) => brand.toLowerCase().includes(state.brandQuery.toLowerCase()));
  return `<header class="picker-header"><button class="back-button" data-action="back" aria-label="뒤로">←</button><h1>차량 선택</h1></header><label class="search"><span>⌕</span><input data-action="brand-query" value="${state.brandQuery}" placeholder="차량 브랜드를 검색하세요" /><b>▣</b></label><div class="brand-index">A<br>B<br>C<br>D<br>E<br>F<br>G<br>H<br>I<br>J<br>K<br>L<br>M<br>N<br>O<br>P<br>Q<br>R<br>S<br>T<br>U<br>V<br>W<br>X<br>Y<br>Z</div><div class="brand-list"><div class="letter">A</div>${visibleBrands.map((brand) => `<button class="brand-row"><span class="brand-logo">◉</span><span>${brand}</span></button>`).join('')}</div>`;
}

function render() { app.innerHTML = state.screen === 'review' ? `${renderReview()}${renderDatePicker()}` : state.screen === 'city-picker' ? renderCityPicker() : renderBrandPicker(); }

app.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action], [data-rating], [data-popup-rating], [data-date-part], [data-city], .brand-row');
  if (!target) return;
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

app.addEventListener('input', (event) => {
  if (event.target.dataset.action === 'comment') state = reduce(state, { type: 'SET_COMMENT', value: event.target.value });
  if (event.target.dataset.action === 'brand-query') state = reduce(state, { type: 'SET_BRAND_QUERY', value: event.target.value });
  if (event.target.dataset.ownerField) state = reduce(state, { type: 'SET_OWNER_FIELD', field: event.target.dataset.ownerField, value: event.target.value });
});

app.addEventListener('change', (event) => {
  if (event.target.id !== 'cover-file-input' || !event.target.files?.[0]) return;
  if (selectedCover) URL.revokeObjectURL(selectedCover.url);
  const file = event.target.files[0];
  selectedCover = { name: file.name, url: URL.createObjectURL(file) };
  render();
});

render();
