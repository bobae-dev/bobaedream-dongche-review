import SourceNavigation from "../components/SourceNavigation.jsx";
import { energyCopy } from "../data/copy.js";

/**
 * 에너지(연비·전비) 작성 화면 (탭 7번).
 *
 * 구성: 안내 문구 → 사진 카드 → 제목/본문 → 차량 연결 버튼.
 *
 * 사진 카드의 '참고 예시' 썸네일 두 개는 이미지 파일이 아니라
 * CSS 그라디언트로 그린 계기판 모형이다. 각각 주유 계기판과
 * 원형 전비 게이지를 흉내 낸 것으로, 실제 예시 이미지가 준비되면
 * <img> 로 교체될 자리다.
 */
function EnergyScreen({ state, dispatch, onNavigate, onBack }) {
  const info = state.energy;
  return (
    <>
      <SourceNavigation
        selectedIndex={7}
        onNavigate={onNavigate}
        onBack={onBack}
      />
      <main className="min-h-[calc(100vh-58px)] px-[9px] pt-[9px] pb-[170px] bg-[#eef1f8]">
        <p className="mx-[5px] mb-[13px] text-[#8f96a8] text-[16px]">
          <span className="mr-[5px] text-[20px]">ⓘ</span>
          {energyCopy.notice}
        </p>
        <section className="rounded-[14px] bg-white h-[126px] px-[9px] py-[10px] flex gap-[8px] overflow-hidden">
          <button className="flex-[0_0_96px] h-[106px] border border-dashed border-[#d8dce7] text-[#9ca2b2] flex flex-col items-center justify-center gap-[5px]">
            <strong className="text-[39px] font-light leading-none">＋</strong>
            <span className="text-[13px]">{energyCopy.photoAction}</span>
          </button>
          <div className="relative flex-[0_0_96px] h-[106px] overflow-hidden rounded-[8px] bg-[linear-gradient(#66777a_0_36%,#b9c2c3_37%_48%,#41494f_49%)] after:content-[''] after:absolute after:left-[10px] after:right-[10px] after:bottom-[15px] after:h-[28px] after:rounded-full after:bg-[linear-gradient(170deg,transparent_45%,#d6dce0_46%_55%,transparent_56%)] after:opacity-80">
            <b className="absolute top-0 left-0 right-0 z-[1] px-[7px] py-[4px] bg-[rgba(0,0,0,0.65)] text-white text-[13px]">
              참고 예시
            </b>
          </div>
          <div className="relative flex-[0_0_96px] h-[106px] overflow-hidden rounded-[8px] bg-[radial-gradient(circle_at_50%_59%,#333b40_0_30%,#64dc75_31%_42%,#3c464a_43%_62%,#22282c_63%)] after:content-[''] after:absolute after:left-[10px] after:right-[10px] after:bottom-[15px] after:h-[28px] after:rounded-full after:bg-[linear-gradient(170deg,transparent_45%,#d6dce0_46%_55%,transparent_56%)] after:opacity-80">
            <b className="absolute top-0 left-0 right-0 z-[1] px-[7px] py-[4px] bg-[rgba(0,0,0,0.65)] text-white text-[13px]">
              참고 예시
            </b>
            <span className="absolute left-0 right-0 top-[59px] z-[2] text-white text-center text-[15px]">
              300.7
            </span>
          </div>
        </section>
        <section className="rounded-[14px] bg-white h-[245px] mt-[10px] px-[14px] py-[17px]">
          <input
            className="w-full border-0 outline-none bg-transparent text-[#343741] h-[40px] pb-[10px] border-b border-[#e2e5ec] text-[20px] font-bold placeholder:text-[#c8ccd8] placeholder:opacity-100"
            value={info.title}
            placeholder={energyCopy.titlePlaceholder}
            aria-label="에너지 제목"
            onChange={(e) =>
              dispatch({
                type: "SET_ENERGY_FIELD",
                field: "title",
                value: e.target.value,
              })
            }
          />
          <textarea
            className="w-full border-0 outline-none bg-transparent text-[#343741] min-h-[165px] pt-[16px] pb-[8px] resize-none text-[16px] leading-[1.55] placeholder:text-[#c8ccd8] placeholder:opacity-100"
            value={info.body}
            placeholder={energyCopy.bodyPlaceholder}
            aria-label="에너지 본문"
            onChange={(e) =>
              dispatch({
                type: "SET_ENERGY_FIELD",
                field: "body",
                value: e.target.value,
              })
            }
          />
        </section>
        <button className="rounded-[14px] bg-white w-full h-[56px] mt-[10px] px-[14px] flex items-center gap-[8px] text-[#242731] text-left">
          <span className="text-[22px]">▱</span>
          <strong className="flex-1 text-[17px]">
            {energyCopy.bindVehicle}
            <em className="ml-[3px]">*</em>
          </strong>
          <b className="text-[25px] font-normal">›</b>
        </button>
      </main>
    </>
  );
}

export default EnergyScreen;
