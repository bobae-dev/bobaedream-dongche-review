import BarHeading from "../../components/BarHeading.jsx";
import PickerHeader from "../../components/PickerHeader.jsx";
import { modelPickerCopy } from "../../data/copy.js";
import { seriesOf } from "../../data/vehicles.js";

/** 고정 머리글(헤더) 높이. 제조사 머리글이 이 아래에 붙는다. */
const TOP_HEIGHT = 42;

/**
 * 차량 선택 2단계 — 차종 선택 (실제 앱의 '选择车系').
 *
 * 고른 브랜드(state.modelPicker.brand)의 차종을 제조사별로 묶어 보여 주고,
 * 차종을 고르면 세부 모델 선택으로 넘어간다(SELECT_SERIES).
 *
 * 치수는 실제 앱(device px ÷ 3)을 재서 맞췄다.
 *   제조사 머리글 41 (노란 막대, BarHeading) · 차종 행 83
 *   차량 사진 100 × 67 (왼쪽 16, 배경 #f7f8fc) · 이름 16px · 권장가 13px #979aa8
 *   구분선 #e6e8f2 는 글자 시작(132)부터 오른쪽 여백 28 앞까지
 *   방금 고른 차종은 이름이 주황(#d18700)이다.
 *
 * 차량 사진은 쓸 수 있는 이미지가 없어서 앱이 사진을 불러오기 전 모습
 * (빈 회색 상자)으로 둔다.
 */
function SeriesPickerScreen({ state, dispatch }) {
  const { brand, series: selected } = state.modelPicker;
  const groups = seriesOf(brand);

  return (
    <section className="min-h-dvh bg-white">
      <div className="sticky top-0 z-[3]">
        <PickerHeader
          title={modelPickerCopy.seriesTitle}
          onBack={() => dispatch({ type: "BACK" })}
        />
      </div>
      <main className="pb-[24px]">
        {groups.map(({ maker, series }) => (
          <div key={maker}>
            <BarHeading sticky style={{ top: TOP_HEIGHT }}>
              {maker}
            </BarHeading>
            {series.map(({ name, price }) => (
              <button
                key={name}
                className="w-full h-[83px] flex items-center pl-[16px] pr-[28px] text-left"
                onClick={() => dispatch({ type: "SELECT_SERIES", series: name })}
              >
                <span
                  className="w-[100px] h-[67px] flex-none bg-[#f7f8fc]"
                  aria-hidden="true"
                ></span>
                <span className="self-stretch flex-1 min-w-0 ml-[16px] flex flex-col justify-center border-b-[0.5px] border-[#e6e8f2]">
                  <span
                    className={`text-[16px] leading-[22px] truncate ${
                      name === selected ? "text-[#d18700]" : "text-[#1f2129]"
                    }`}
                  >
                    {name}
                  </span>
                  <span className="mt-[2px] text-[13px] leading-[18px] text-[#979aa8]">
                    {price
                      ? `${modelPickerCopy.guidePrice}: ${price}`
                      : modelPickerCopy.noPrice}
                  </span>
                </span>
              </button>
            ))}
          </div>
        ))}
      </main>
    </section>
  );
}

export default SeriesPickerScreen;
