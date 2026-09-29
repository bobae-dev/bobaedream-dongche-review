import BottomSheet from "../../components/BottomSheet.jsx";
import WheelPicker from "../../components/WheelPicker.jsx";

/** 고를 수 있는 기간: 오늘부터 이만큼 전까지 (실제 앱 확인값). */
const YEARS_BACK = 5;

/**
 * 차주가 화면의 구매 시기(연·월·일) 시트 — 실제 앱의 '购买时间' 선택기.
 *
 * 앱은 오늘부터 정확히 5년 전까지만 고르게 한다. 그래서 끝 연도에서는 월·일
 * 후보도 잘린다 — 올해는 이번 달까지, 5년 전 해는 그 달부터만 나온다.
 * 연·월을 바꿔서 지금 고른 월·일이 범위를 벗어나면 가장 가까운 값으로 옮긴다.
 *
 * 연도는 오래된 것이 위, 올해가 아래다(앱과 같다). 모양은 BottomSheet 의
 * 'actions' 변형(취소/확정 글자 버튼)과 WheelPicker 의 'date' 변형이다.
 *
 * @param value      { year, month, day } 숫자. 확정 전 임시 값.
 * @param today      { year, month, day } 오늘. 범위 계산 기준.
 * @param onChange   새 { year, month, day }
 * @param onConfirm  확정
 * @param onClose    취소 · 바깥 · Esc
 */
function PurchaseDateSheet({ value, today, onChange, onConfirm, onClose }) {
  const min = { ...today, year: today.year - YEARS_BACK };
  const max = today;

  function monthRange(year) {
    const from = year === min.year ? min.month : 1;
    const to = year === max.year ? max.month : 12;
    return range(from, to);
  }
  function dayRange(year, month) {
    const last = new Date(year, month, 0).getDate();
    const from = year === min.year && month === min.month ? min.day : 1;
    const to = year === max.year && month === max.month ? max.day : last;
    return range(from, to);
  }

  // 바꾼 칸에 맞춰 나머지 칸을 범위 안으로 옮긴다.
  function change(part, label) {
    const next = { ...value, [part]: parseInt(label, 10) };
    next.month = clamp(next.month, monthRange(next.year));
    next.day = clamp(next.day, dayRange(next.year, next.month));
    onChange(next);
  }

  return (
    <BottomSheet
      variant="actions"
      title="구매 시기"
      confirmLabel="확정"
      onClose={onClose}
      onConfirm={onConfirm}
    >
      <WheelPicker
        variant="date"
        columns={[
          {
            key: "year",
            items: range(min.year, max.year).map((y) => `${y}년`),
            value: `${value.year}년`,
          },
          {
            key: "month",
            items: monthRange(value.year).map((m) => `${m}월`),
            value: `${value.month}월`,
          },
          {
            key: "day",
            items: dayRange(value.year, value.month).map((d) => `${d}일`),
            value: `${value.day}일`,
          },
        ]}
        onChange={change}
      />
    </BottomSheet>
  );
}

function range(from, to) {
  return Array.from({ length: to - from + 1 }, (_, i) => from + i);
}

function clamp(n, list) {
  return Math.min(list.at(-1), Math.max(list[0], n));
}

export default PurchaseDateSheet;
