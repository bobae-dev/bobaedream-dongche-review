import BarHeading from "../../components/BarHeading.jsx";
import PickerHeader from "../../components/PickerHeader.jsx";
import { modelPickerCopy } from "../../data/copy.js";
import { trimsOf } from "../../data/vehicles.js";
import {
  DRAG_SCROLLER_CLASS,
  useDragScroll,
} from "../../hooks/useDragScroll.js";
import { useGroupIndex } from "../../hooks/useGroupIndex.js";

/** 고정 머리글 높이 = 헤더 42 + 연식 탭 줄 42. */
const TOP_HEIGHT = 84;

/**
 * 차량 선택 3단계 — 세부 모델 선택 (실제 앱의 '选择车型').
 *
 * 고른 차종(state.modelPicker.series)의 세부 모델을 연식별로 이어서 보여 준다.
 * 위쪽 연식 탭은 지역 선택의 A~Z 레일과 같은 역할이다 — 누르면 그 연식으로
 * 이동하고, 스크롤하면 지금 보고 있는 연식에 밑줄이 옮겨 간다(useGroupIndex).
 * 연식 안에서는 같은 엔진끼리 노란 막대 머리글(BarHeading)로 묶는다.
 *
 * 세부 모델을 고르면 SELECT_TRIM 이 연 화면(리뷰·차주가)의 차량 칸을 채우고
 * 그 화면으로 돌아간다.
 *
 * 치수는 실제 앱(device px ÷ 3)을 재서 맞췄다.
 *   연식 탭: 선택 18px · 나머지 16px, 밑줄 14 × 3 (#1f2129)
 *   세부 모델 행: 이름 16px → 변속기 칩(#f5f6fa, 13px) + 권장가 13px #979aa8,
 *   오른쪽에 가격 16px 빨강(#e53c22)
 */
function TrimPickerScreen({ state, dispatch }) {
  const { years, trims } = trimsOf(state.modelPicker.series);
  const { activeLetter: activeYear, groupRef, jumpTo } = useGroupIndex(
    years,
    TOP_HEIGHT,
  );
  const {
    ref: tabsRef,
    onMouseDown: handleTabsMouseDown,
    shouldIgnoreClick,
  } = useDragScroll();

  return (
    <section className="min-h-dvh bg-white">
      <div className="sticky top-0 z-[3] bg-white">
        <PickerHeader
          title={modelPickerCopy.trimTitle}
          onBack={() => dispatch({ type: "BACK" })}
        />
        <nav
          ref={tabsRef}
          onMouseDown={handleTabsMouseDown}
          className={`h-[42px] flex ${DRAG_SCROLLER_CLASS}`}
          aria-label="연식"
        >
          {years.map((year) => (
            <button
              key={year}
              className={`relative flex-none w-[56px] text-[#1f2129] ${
                year === activeYear ? "text-[18px]" : "text-[16px]"
              }`}
              aria-current={year === activeYear}
              onClick={() => {
                if (!shouldIgnoreClick()) jumpTo(year);
              }}
            >
              {year}
              {year === activeYear && (
                <i
                  className="absolute left-1/2 bottom-[8px] w-[14px] h-[3px] -translate-x-1/2 rounded-full bg-[#1f2129]"
                  aria-hidden="true"
                ></i>
              )}
            </button>
          ))}
        </nav>
      </div>

      <main className="pt-[2px] pb-[24px]">
        {years.map((year) => (
          <div key={year} ref={groupRef(year)}>
            {groupByEngine(trims.filter((trim) => trim.year === year)).map(
              ({ engine, items }, index) => (
                <div key={`${engine}-${index}`}>
                  <BarHeading>{engine}</BarHeading>
                  {items.map((trim) => (
                    <TrimRow
                      key={trim.name}
                      trim={trim}
                      onSelect={() =>
                        dispatch({ type: "SELECT_TRIM", trim: trim.name })
                      }
                    />
                  ))}
                </div>
              ),
            )}
          </div>
        ))}
      </main>
    </section>
  );
}

/** 이어진 같은 엔진끼리 묶는다. 앱도 연식 안에서 엔진이 바뀔 때마다 머리글을 단다. */
function groupByEngine(trims) {
  const groups = [];
  for (const trim of trims) {
    const last = groups.at(-1);
    if (last && last.engine === trim.engine) last.items.push(trim);
    else groups.push({ engine: trim.engine, items: [trim] });
  }
  return groups;
}

function TrimRow({ trim, onSelect }) {
  return (
    <button
      className="block w-full pl-[16px] pr-[28px] pt-[10px] pb-[22px] text-left"
      onClick={onSelect}
    >
      <span className="block text-[16px] leading-[23px] text-[#1f2129]">
        {trim.name}
      </span>
      <span className="mt-[9px] flex items-center">
        <span className="h-[20px] px-[6px] flex items-center rounded-[2px] bg-[#f5f6fa] text-[13px] text-[#1f2129]">
          {trim.gearbox}
        </span>
        <span className="ml-[9px] text-[13px] text-[#979aa8]">
          {trim.price
            ? `${modelPickerCopy.guidePrice}: ${trim.price}`
            : modelPickerCopy.noPrice}
        </span>
        {trim.price && (
          <span className="ml-auto text-[16px] text-[#e53c22]">{trim.price}</span>
        )}
      </span>
    </button>
  );
}

export default TrimPickerScreen;
