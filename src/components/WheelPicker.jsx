import { useEffect, useRef } from "react";

/** 한 행의 높이와 한 번에 보이는 행 수. 실제 앱 측정값(37px × 5행 = 185px). */
const ROW_HEIGHT = 37;
const VISIBLE_ROWS = 5;
const WHEEL_HEIGHT = ROW_HEIGHT * VISIBLE_ROWS;
/** 첫·마지막 항목도 가운데 줄에 올 수 있도록 위아래를 비워 두는 높이. */
const EDGE_PAD = ROW_HEIGHT * Math.floor(VISIBLE_ROWS / 2);

/**
 * 앱에는 모양이 조금 다른 휠이 두 가지 있다. 둘 다 실제 앱을 재서 맞췄다.
 *   sale : 판매글 시트. 좌우 여백 36, 밴드 선 #f2f3f9, 글자 17px,
 *          가운데서 멀수록 #797b86 → #c8c9ce
 *   date : 날짜 시트(구매 시기). 좌우 여백 12, 밴드 선 #e6e6e6, 글자 18px,
 *          가운데가 아닌 줄은 모두 옅은 회색 #bbbcbe → #c8c8ca
 */
const VARIANTS = {
  sale: {
    inset: "px-[36px]",
    band: "left-[36px] right-[36px] border-[#f2f3f9]",
    text: "text-[17px]",
    tones: ["text-[#1f2129]", "text-[#797b86]", "text-[#c8c9ce]"],
  },
  date: {
    inset: "px-[12px]",
    band: "left-[12px] right-[12px] border-[#e6e6e6]",
    text: "text-[18px]",
    tones: ["text-[#1f2129]", "text-[#bbbcbe]", "text-[#c8c8ca]"],
  },
};

/**
 * 가운데 줄에 있는 값이 선택되는 드럼식 선택기.
 *
 * 선택 표시는 항목마다 테두리를 주는 게 아니라, 휠 전체를 가로지르는
 * 가로선 두 줄로 그린다. 실제 앱이 그렇고, 컬럼이 여럿일 때 선이 끊기지
 * 않으려면 이 방식이어야 한다. 그래서 선은 컬럼 바깥의 겹침 레이어에 둔다.
 *
 * 값 선택은 스크롤 위치로 결정한다 — 스크롤이 멎으면 가운데 칸에 온 항목을
 * onChange 로 올려 보낸다. 항목을 직접 눌러도 선택된다(마우스 편의).
 * 글자색은 가운데에서 멀어질수록 흐려진다(#1f2129 → #797b86 → #c8c9ce).
 *
 * @param columns   [{ key, items: string[], value: string }] 컬럼 정의
 * @param unit      오른쪽에 고정으로 붙는 단위 라벨 (주행거리의 'km'). 선택 대상이 아니다.
 * @param onChange  (columnKey, value)
 * @param variant   "sale"(기본) | "date" — 위 VARIANTS 참고
 */
function WheelPicker({ columns, unit, onChange, variant = "sale" }) {
  const look = VARIANTS[variant];
  return (
    <div
      className="relative overflow-hidden"
      style={{ height: WHEEL_HEIGHT }}
      role="group"
    >
      {/* 선택 밴드 — 컬럼 위에 겹쳐 그려서 가로로 끊김 없이 이어진다. */}
      <div
        className={`absolute pointer-events-none border-y ${look.band}`}
        style={{ top: EDGE_PAD, height: ROW_HEIGHT }}
        aria-hidden="true"
      ></div>
      <div className={`h-full flex ${look.inset}`}>
        {columns.map((column) => (
          <WheelColumn
            key={column.key}
            items={column.items}
            value={column.value}
            look={look}
            onSelect={(value) => onChange(column.key, value)}
          />
        ))}
        {unit && (
          <div className="flex-1 flex items-start justify-center">
            <span
              className="flex items-center text-[17px] text-[#1f2129]"
              style={{ height: ROW_HEIGHT, marginTop: EDGE_PAD }}
            >
              {unit}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function WheelColumn({ items, value, look, onSelect }) {
  const listRef = useRef(null);
  const settleRef = useRef(null);
  const index = Math.max(0, items.indexOf(value));

  // 바깥에서 값이 바뀌면(열릴 때 포함) 그 항목을 가운데로 맞춘다.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const target = index * ROW_HEIGHT;
    if (Math.abs(list.scrollTop - target) > 1) list.scrollTop = target;
  }, [index]);

  // 스크롤이 멎은 뒤 가운데 칸에 온 항목을 선택값으로 삼는다.
  // 스크롤 중에는 값이 계속 바뀌지 않도록 멎을 때까지 기다린다.
  function handleScroll(event) {
    const { scrollTop } = event.currentTarget;
    clearTimeout(settleRef.current);
    settleRef.current = setTimeout(() => {
      const next = Math.min(
        items.length - 1,
        Math.max(0, Math.round(scrollTop / ROW_HEIGHT)),
      );
      if (items[next] !== value) onSelect(items[next]);
    }, 90);
  }

  useEffect(() => () => clearTimeout(settleRef.current), []);

  return (
    <div
      ref={listRef}
      onScroll={handleScroll}
      className="flex-1 h-full overflow-y-auto overscroll-contain [scroll-snap-type:y_mandatory] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      style={{ paddingTop: EDGE_PAD, paddingBottom: EDGE_PAD }}
    >
      {items.map((item, itemIndex) => {
        const distance = Math.abs(itemIndex - index);
        const tone = look.tones[Math.min(distance, 2)];
        return (
          <button
            key={item}
            className={`block w-full [scroll-snap-align:center] ${look.text} ${tone}`}
            style={{ height: ROW_HEIGHT }}
            aria-current={distance === 0}
            onClick={() => onSelect(item)}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

export default WheelPicker;
