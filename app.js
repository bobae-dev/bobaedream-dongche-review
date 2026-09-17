import { brands, initialState, reduce, reviewCategories, starFillPercent } from './app-state.js';

let state = structuredClone(initialState);
const app = document.querySelector('#app');
const cityGroups = [
  ['A', ['阿拉善', '鞍山', '安庆', '安阳', '阿坝', '安顺', '阿里', '安康', '阿克苏', '阿勒泰', '阿拉尔', '澳门']],
  ['B', ['北京', '保定', '包头', '巴彦淖尔']]
];

function renderStars(category, index) {
  const rating = state.ratings[category] || 0;
  return `<div class="stars" role="group" aria-label="${category}评分">${[1, 2, 3, 4, 5].map((value) => {
    const percent = starFillPercent(rating, value);
    const id = `star-clip-${index}-${value}`;
    const points = '50,5 61,38 95,38 68,58 79,91 50,71 21,91 32,58 5,38 39,38';
    return `<span class="star-wrap"><svg class="star-visual" viewBox="0 0 100 100" aria-hidden="true"><defs><clipPath id="${id}"><rect width="${percent}" height="100" /></clipPath></defs><polygon points="${points}" fill="#e2e6ef"/><polygon points="${points}" fill="#ffc928" clip-path="url(#${id})" /></svg><button class="star-half left" aria-label="${value - 0.5}分" data-rating="${value - 0.5}" data-category="${category}"></button><button class="star-half right" aria-label="${value}分" data-rating="${value}" data-category="${category}"></button></span>`;
  }).join('')}</div>`;
}

function renderModelCard() {
  if (!state.model) return `<section class="card model-card"><h2>选择车型 <em>*</em></h2><button class="add-model" data-action="open-model-picker"><strong>＋</strong><span>添加车型</span></button></section>`;
  const info = state.ownerInfo;
  return `<section class="card selected-model-card"><div class="model-summary"><div><h2>问界 M8</h2><p>2025款 增程 Ultra 六座四驱版(896线激光雷达)</p></div><div class="car-placeholder">🚙</div></div><button class="owner-row" data-action="toggle-owner"><span class="checkbox ${state.isOwner ? 'checked' : ''}">${state.isOwner ? '✓' : ''}</span><strong>我是车主</strong><span>填购车信息有机会获得超级精华</span></button>${state.isOwner ? `<div class="owner-fields"><label>提车时间<em>*</em><input data-action="open-date-picker" value="${info.deliveryTime}" placeholder="选择提车的时间" readonly /><b>›</b></label><label>购买地点<em>*</em><input data-action="open-city-picker" value="${info.city}" placeholder="选择购车的城市" readonly /><b>›</b></label><label>裸车价格<em>*</em><input data-owner-field="barePrice" value="${info.barePrice}" placeholder="保留两位小数" inputmode="decimal" /><span>万元</span></label><label>落地价格<input data-owner-field="totalPrice" value="${info.totalPrice}" placeholder="保留两位小数" inputmode="decimal" /><span>万元</span></label><label>车辆油耗<em>*</em><input data-owner-field="mileage" value="${info.mileage}" placeholder="输入平均油耗" inputmode="decimal" /><span>L/100km</span></label></div>` : '<div class="hint">填写车主信息有助于提升评论的可信度! <button aria-label="关闭提示">×</button></div>'}</section>`;
}

function renderCityPicker() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  return `<section class="city-picker-screen"><header class="city-picker-header"><button class="back-button" data-action="back" aria-label="返回">‹</button></header><main class="city-list">${cityGroups.map(([letter, cities]) => `<div class="city-group"><div class="city-letter">${letter}</div>${cities.map((city) => `<button class="city-row" data-city="${city}">${city}</button>`).join('')}</div>`).join('')}</main><nav class="city-index">${letters.map((letter) => `<span>${letter}</span>`).join('')}</nav></section>`;
}

function renderDatePicker() {
  if (!state.datePicker.open) return '';
  const years = [2024, 2025, 2026, 2027, 2028];
  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  return `<div class="date-picker-backdrop"><section class="date-picker" role="dialog" aria-label="选择提车时间"><div class="date-actions"><button data-action="cancel-date-picker">取消</button><span></span><button data-action="confirm-date-picker">确定</button></div><div class="date-columns"><div class="date-column">${years.map((year) => `<button class="date-option ${year === state.datePicker.year ? 'selected' : ''}" data-date-part="year" data-date-value="${year}">${year}年</button>`).join('')}</div><div class="date-column">${months.map((month) => `<button class="date-option ${month === state.datePicker.month ? 'selected' : ''}" data-date-part="month" data-date-value="${month}">${month}月</button>`).join('')}</div></div></section></div>`;
}

function renderReview() {
  const categories = reviewCategories(state.model);
  const average = (categories.reduce((sum, category) => sum + (state.ratings[category] || 0), 0) / categories.length).toFixed(2);
  return `<header class="topbar review-topbar"><button class="icon-button" data-action="noop" aria-label="关闭">×</button><strong class="brand-title">懂车分</strong><span class="swap-icon">⇄</span><button class="publish">◁ 发布</button></header>
    <section class="exposure-banner"><div class="speech">多写300字，可获更多曝光机会</div><div class="progress-line"><span class="car-dot">▰</span><span></span><span class="gift">♢</span></div><div class="progress-labels"><span>通过即有机会评为精华</span><span>评为超级精华，获得更多曝光机会</span></div></section>
    ${renderModelCard()}
    <section class="card rating-card"><div class="section-heading"><h2>综合评分 ${state.model ? `<b class="overall-score">${average}分</b>` : ''}</h2><button class="help">ⓘ 评分说明</button></div><div class="hint">懂车分怎么评才合理？一篇教你轻松搞定！ <button aria-label="关闭提示">×</button></div><div class="rating-list">${categories.map((category, index) => `<div class="rating-row"><label>${category}<em>*</em></label>${renderStars(category, index)}</div>`).join('')}</div></section>
    <section class="card comment-card"><h2>观点综述 <em>*</em></h2><textarea data-action="comment" placeholder="语言简洁、对车型进行描述和评价。如果您的分项评分有4.5分以上或3分以下，建议对该分项进行重点描述。">${state.comment}</textarea><div class="comment-meta"><span>写满<b>30</b>字，才能发布成功哦~</span><button>ⓘ 精华攻略</button></div><div class="guide-banner">看精华攻略，写精华懂车分，轻松赚取上万积分！ <button aria-label="关闭提示">×</button></div></section>
    <section class="card photo-card"><button class="add-cover"><strong>＋</strong><span>添加优质首图</span></button></section><div class="upload-error">ⓘ 请上传爱车的图片</div>`;
}

function renderBrandPicker() {
  const visibleBrands = brands.filter((brand) => brand.toLowerCase().includes(state.brandQuery.toLowerCase()));
  return `<header class="picker-header"><button class="back-button" data-action="back">←</button><h1>3步选车</h1></header><label class="search"><span>⌕</span><input data-action="brand-query" value="${state.brandQuery}" placeholder="请输入搜索内容" /><b>▣</b></label><div class="brand-index">A<br>B<br>C<br>D<br>E<br>F<br>G<br>H<br>I<br>J<br>K<br>L<br>M<br>N<br>O<br>P<br>Q<br>R<br>S<br>T<br>U<br>V<br>W<br>X<br>Y<br>Z</div><div class="brand-list"><div class="letter">A</div>${visibleBrands.map((brand) => `<button class="brand-row"><span class="brand-logo">◉</span><span>${brand}</span></button>`).join('')}</div>`;
}

function render() { app.innerHTML = state.screen === 'review' ? `${renderReview()}${renderDatePicker()}` : state.screen === 'city-picker' ? renderCityPicker() : renderBrandPicker(); }

app.addEventListener('click', (event) => {
  const target = event.target.closest('[data-action], [data-rating], [data-date-part], [data-city], .brand-row');
  if (!target) return;
  if (target.dataset.action === 'open-model-picker') state = reduce(state, { type: 'OPEN_MODEL_PICKER' });
  if (target.dataset.action === 'back') state = reduce(state, { type: 'BACK' });
  if (target.dataset.action === 'toggle-owner') state = reduce(state, { type: 'TOGGLE_OWNER' });
  if (target.dataset.action === 'open-date-picker') state = reduce(state, { type: 'OPEN_DATE_PICKER' });
  if (target.dataset.action === 'open-city-picker') state = reduce(state, { type: 'OPEN_CITY_PICKER' });
  if (target.dataset.action === 'cancel-date-picker') state = reduce(state, { type: 'CANCEL_DATE_PICKER' });
  if (target.dataset.action === 'confirm-date-picker') state = reduce(state, { type: 'CONFIRM_DATE_PICKER' });
  if (target.dataset.datePart) state = reduce(state, { type: 'SET_DATE_PART', part: target.dataset.datePart, value: Number(target.dataset.dateValue) });
  if (target.dataset.city) state = reduce(state, { type: 'SELECT_CITY', value: target.dataset.city });
  if (target.dataset.rating) state = reduce(state, { type: 'SET_RATING', category: target.dataset.category, value: Number(target.dataset.rating) });
  if (target.classList.contains('brand-row')) state = reduce(state, { type: 'SELECT_MODEL', model: '问界M8', trim: '2025款 增程 Ultra 六座四驱版(896线激光雷达)' });
  render();
});

app.addEventListener('input', (event) => {
  if (event.target.dataset.action === 'comment') state = reduce(state, { type: 'SET_COMMENT', value: event.target.value });
  if (event.target.dataset.action === 'brand-query') state = reduce(state, { type: 'SET_BRAND_QUERY', value: event.target.value });
  if (event.target.dataset.ownerField) state = reduce(state, { type: 'SET_OWNER_FIELD', field: event.target.dataset.ownerField, value: event.target.value });
});

render();
