import IndexRail from "../components/IndexRail.jsx";
import PickerHeader from "../components/PickerHeader.jsx";
import { modelPickerCopy } from "../data/copy.js";
import { brandGroups } from "../data/vehicles.js";
import { useGroupIndex } from "../hooks/useGroupIndex.js";

/** 고정 머리글(헤더) 높이. 그룹 머리글이 이 아래에 붙는다. */
const TOP_HEIGHT = 42;

/**
 * 차량 선택 1단계 — 브랜드 선택 (실제 앱의 '选择品牌').
 *
 * 브랜드를 고르면 차종 선택으로 넘어간다(SELECT_BRAND). 리뷰 화면과 차주가
 * 화면이 같이 쓰고, 어느 쪽에서 열었는지는 state.modelPicker.from 이 안다.
 *
 * 치수는 실제 앱(device px ÷ 3)을 재서 맞췄다.
 *   헤더 42 · 그룹 머리글 29 · 브랜드 행 60 (구분선 없음)
 *   로고 29 × 29 (왼쪽 21) · 이름 16px (왼쪽 72)
 *   방금 고른 브랜드는 이름이 주황(#d18700)이다 — 뒤로 돌아왔을 때 보인다.
 * 지역 선택과 달리 검색창이 없고, 레일은 A~Z 26글자가 모두 있다.
 *
 * 로고는 실제 앱의 브랜드 로고 이미지 자리다. 로고 파일을 쓸 수 없어서
 * 브랜드 첫 글자를 넣은 회색 원으로 대신한다.
 */
function BrandPickerScreen({ state, dispatch }) {
  const letters = brandGroups.map(([letter]) => letter);
  const { activeLetter, groupRef, jumpTo } = useGroupIndex(letters, TOP_HEIGHT);
  const selected = state.modelPicker.brand;

  return (
    <section className="min-h-dvh bg-white">
      <div className="sticky top-0 z-[3]">
        <PickerHeader
          title={modelPickerCopy.brandTitle}
          onBack={() => dispatch({ type: "BACK" })}
        />
      </div>

      <main className="pr-[28px] pb-[24px]">
        {brandGroups.map(([letter, brands]) => (
          <div key={letter} ref={groupRef(letter)}>
            <h2
              className="sticky z-[2] h-[29px] pl-[16px] flex items-center bg-white text-[14px] font-normal text-[#1f2129]"
              style={{ top: TOP_HEIGHT }}
            >
              {letter}
            </h2>
            {brands.map((brand) => (
              <button
                key={brand}
                className="w-full h-[60px] flex items-center pl-[21px] text-left"
                onClick={() => dispatch({ type: "SELECT_BRAND", brand })}
              >
                <BrandMark name={brand} />
                <span
                  className={`ml-[22px] text-[16px] ${
                    brand === selected ? "text-[#d18700]" : "text-[#1f2129]"
                  }`}
                >
                  {brand}
                </span>
              </button>
            ))}
          </div>
        ))}
      </main>

      <IndexRail
        letters={letters}
        activeLetter={activeLetter}
        onJump={jumpTo}
        top={TOP_HEIGHT}
      />
    </section>
  );
}

/** 브랜드 로고 자리. 이름 첫 글자를 넣은 29px 회색 원. */
function BrandMark({ name }) {
  return (
    <span
      className="w-[29px] h-[29px] flex-none flex items-center justify-center rounded-full bg-[#f2f3f7] text-[#979aa8] text-[11px] font-semibold"
      aria-hidden="true"
    >
      {[...name][0]}
    </span>
  );
}

export default BrandPickerScreen;
