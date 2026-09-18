import { ALPHABET } from "../data/alphabet.js";
import { cityGroups } from "../data/cities.js";

/**
 * 구매 지역 선택 화면 (전체 화면 전환형).
 *
 * 도시를 고르면 SELECT_CITY 액션이 ownerInfo.city 를 채우고
 * 동시에 리뷰 화면으로 돌아간다. (리듀서에서 screen 까지 함께 바꾼다)
 *
 * 우측 A~Z 레일은 아직 표시 전용이다 — 눌러도 해당 그룹으로 이동하지 않는다.
 * 레일 위치의 right 계산식은 폰 프레임(최대 430px)의 바깥 여백을 감안해
 * 화면이 넓어져도 프레임에 붙어 있게 만드는 장치다.
 */
function CityPickerScreen({ dispatch }) {
  return (
    <section className="min-h-screen relative bg-white">
      <header className="h-[76px] bg-white relative">
        <button
          className="absolute top-[14px] left-[20px] leading-none text-[42px] text-[#1c2029]"
          aria-label="뒤로"
          onClick={() => dispatch({ type: "BACK" })}
        >
          ‹
        </button>
        <h1 className="text-[2em] my-[0.67em]">구매 지역 선택</h1>
      </header>
      <main className="pb-[24px]">
        {cityGroups.map(([letter, cities]) => (
          <div key={letter}>
            <div className="h-[54px] px-[17px] py-[12px] bg-[#f4f6fb] text-[#969cac] text-[18px]">
              {letter}
            </div>
            {cities.map((city) => (
              <button
                key={city}
                className="w-[calc(100%-34px)] mx-[17px] h-[72px] block border-b border-[#e1e4eb] text-left text-[21px] text-[#242731]"
                onClick={() => dispatch({ type: "SELECT_CITY", value: city })}
              >
                {city}
              </button>
            ))}
          </div>
        ))}
      </main>
      <nav className="fixed right-[max(calc((100vw-430px)/2+7px),7px)] top-[38%] flex flex-col gap-[5px] text-[#707685] text-[14px] text-center">
        {ALPHABET.map((letter) => (
          <span key={letter}>{letter}</span>
        ))}
      </nav>
    </section>
  );
}

export default CityPickerScreen;
