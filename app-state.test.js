import test from 'node:test';
import assert from 'node:assert/strict';
import { initialState, reduce, starFillPercent, reviewCategories } from '../app-state.js';

test('차량 추가를 누르면 브랜드 선택 화면으로 이동한다', () => {
  const next = reduce(initialState, { type: 'OPEN_MODEL_PICKER' });
  assert.equal(next.screen, 'brand-picker');
});

test('브랜드 선택 화면에서 뒤로가면 리뷰 작성 화면으로 돌아간다', () => {
  const picker = reduce(initialState, { type: 'OPEN_MODEL_PICKER' });
  const next = reduce(picker, { type: 'BACK' });
  assert.equal(next.screen, 'review');
});

test('별점을 선택하면 해당 평가 항목의 점수가 저장된다', () => {
  const next = reduce(initialState, { type: 'SET_RATING', category: '外观', value: 4 });
  assert.equal(next.ratings['外观'], 4);
});

test('의견 입력은 현재 의견으로 저장된다', () => {
  const next = reduce(initialState, { type: 'SET_COMMENT', value: '测试评论' });
  assert.equal(next.comment, '测试评论');
});

test('모델을 선택하면 모델 선택 상태가 저장된다', () => {
  const next = reduce(initialState, { type: 'SELECT_MODEL', model: '问界M8', trim: '2025款 增程 Ultra 六座四驱版(896线激光雷达)' });
  assert.equal(next.model.name, '问界M8');
  assert.equal(next.model.trim, '2025款 增程 Ultra 六座四驱版(896线激光雷达)');
});

test('별점은 0.5 단위로 저장된다', () => {
  const next = reduce(initialState, { type: 'SET_RATING', category: '外观', value: 1.5 });
  assert.equal(next.ratings['外观'], 1.5);
});

test('1.5점은 두 번째 별을 정확히 50% 채운다', () => {
  assert.equal(starFillPercent(1.5, 2), 50);
});

test('모델 선택 후 평가 항목은 원본의 운전·续航 명칭을 사용한다', () => {
  assert.deepEqual(reviewCategories({ name: '问界M8' }).slice(-2), ['驾驶感受', '续航能耗']);
});

test('차주 체크를 켜면 차주 정보 입력 상태가 열린다', () => {
  const next = reduce(initialState, { type: 'TOGGLE_OWNER' });
  assert.equal(next.isOwner, true);
});

test('차주 정보 입력값을 수정할 수 있다', () => {
  const next = reduce(initialState, { type: 'SET_OWNER_FIELD', field: 'city', value: '北京' });
  assert.equal(next.ownerInfo.city, '北京');
});

test('인도 시기를 누르면 날짜 선택기가 열린다', () => {
  const next = reduce(initialState, { type: 'OPEN_DATE_PICKER' });
  assert.equal(next.datePicker.open, true);
});

test('날짜 선택 후 확인하면 인도 시기에 선택한 연월이 저장된다', () => {
  let next = reduce(initialState, { type: 'OPEN_DATE_PICKER' });
  next = reduce(next, { type: 'SET_DATE_PART', part: 'year', value: 2025 });
  next = reduce(next, { type: 'SET_DATE_PART', part: 'month', value: 8 });
  next = reduce(next, { type: 'CONFIRM_DATE_PICKER' });
  assert.equal(next.ownerInfo.deliveryTime, '2025年 8月');
  assert.equal(next.datePicker.open, false);
});

test('구매 장소를 누르면 도시 선택 화면으로 이동한다', () => {
  const next = reduce(initialState, { type: 'OPEN_CITY_PICKER' });
  assert.equal(next.screen, 'city-picker');
});

test('도시를 선택하면 구매 장소에 저장되고 리뷰 화면으로 돌아온다', () => {
  let next = reduce(initialState, { type: 'OPEN_CITY_PICKER' });
  next = reduce(next, { type: 'SELECT_CITY', value: '北京' });
  assert.equal(next.ownerInfo.city, '北京');
  assert.equal(next.screen, 'review');
});
