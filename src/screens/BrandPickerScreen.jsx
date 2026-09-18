import { Fragment } from "react";
import { ALPHABET } from "../data/alphabet.js";
import { brands } from "../data/brands.js";

/**
 * 차량 브랜드 선택 화면 (전체 화면 전환형).
 *
 * 검색어(state.brandQuery)로 목록을 걸러 보여 준다. 필터링은 여기서 하고
 * 검색어 자체는 리듀서(SET_BRAND_QUERY)가 들고 있다.
 *
 * NOTE: 어느 브랜드를 눌러도 SELECT_MODEL 이 항상 같은 차량
 *       ('AITO M8')을 고정으로 넘긴다. 디자인 재현용 임시 동작이며,
 *       실제 차종 목록이 붙으면 눌린 brand 를 넘기도록 바꿔야 한다.
 *
 * 구분 헤더 'A' 도 마찬가지로 고정값이다 — 현재 데이터가 A 그룹뿐이라
 * 그룹 분할 로직 없이 한 덩어리로 그린다.
 */
function BrandPickerScreen({ state, dispatch }) {
  const visibleBrands = brands.filter((brand) =>
    brand.toLowerCase().includes(state.brandQuery.toLowerCase()),
  );

  return (
    <>
      <header className="h-[88px] flex items-center justify-center relative bg-white">
        <button
          className="absolute left-[16px] text-[42px] text-[#1c2029]"
          aria-label="뒤로"
          onClick={() => dispatch({ type: "BACK" })}
        >
          ←
        </button>
        <h1 className="m-0 text-[24px]">차량 선택</h1>
      </header>
      <label className="h-[53px] mx-[17px] mb-[10px] px-[14px] flex items-center gap-[10px] border border-[#f0b927] rounded-[8px] bg-white text-[#999eaa]">
        <span className="text-[35px] leading-none">⌕</span>
        <input
          className="flex-1 border-0 outline-none text-[18px]"
          value={state.brandQuery}
          placeholder="차량 브랜드를 검색하세요"
          onChange={(e) =>
            dispatch({ type: "SET_BRAND_QUERY", value: e.target.value })
          }
        />
        <b className="text-[22px]">▣</b>
      </label>
      <div className="fixed right-[max(calc((100vw-430px)/2+8px),8px)] top-[250px] z-[2] text-[#707685] text-center leading-[1.65] text-[12px]">
        {ALPHABET.map((letter, index) => (
          <Fragment key={letter}>
            {letter}
            {index < ALPHABET.length - 1 && <br />}
          </Fragment>
        ))}
      </div>
      <div className="bg-white min-h-[calc(100vh-151px)] px-[17px] pb-[28px]">
        <div className="mx-[-17px] px-[17px] py-[10px] bg-[#f4f6fb] text-[#969cac] text-[18px] font-bold">
          A
        </div>
        {visibleBrands.map((brand) => (
          <button
            className="w-full min-h-[69px] flex items-center gap-[25px] text-left text-[20px] text-[#242731]"
            key={brand}
            onClick={() =>
              dispatch({
                type: "SELECT_MODEL",
                model: "AITO M8",
                trim: "2025년형 레인지 익스텐더 Ultra 6인승 AWD",
              })
            }
          >
            <span className="w-[68px] h-[28px] p-[3px] inline-flex items-center justify-center bg-[#d9ff22] border-2 border-[#a8c900] text-[#12151b] text-[9px] font-extrabold">
              ◉
            </span>
            <span>{brand}</span>
          </button>
        ))}
      </div>
    </>
  );
}

export default BrandPickerScreen;
