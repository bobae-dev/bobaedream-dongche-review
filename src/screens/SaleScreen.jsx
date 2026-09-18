import { saleCopy } from "../data/copy.js";

/**
 * 판매글 작성 화면 (탭 5번).
 *
 * 다른 작성 화면과 달리 SourceNavigation(탭 바)이 없고 자체 헤더만 쓴다.
 * 그래서 App.jsx 도 이 화면에는 onNavigate 를 넘기지 않는다.
 *
 * 차량 정보는 vehicleRows 배열을 돌려 한 번에 그린다.
 * 각 항목은 [라벨, 상태 필드명, 값, 필수여부] 튜플이다.
 *   - readOnlyFields 에 든 필드(인도 연월·색상·이전 횟수)는 수정 불가.
 *     차량 데이터에서 내려오는 값이라 직접 입력 대상이 아니다.
 *   - 'price' 행만 빨간 굵은 글씨로 강조한다.
 *
 * NOTE: vehicleRows 의 required 가 전부 true 라서 튜플의 4번째 자리가
 *       사실상 상수다. 실제로 선택 항목이 생기면 의미가 살아난다.
 */
function SaleScreen({ state, dispatch, onBack }) {
  const info = state.sale;
  const readOnlyFields = new Set(["delivery", "color", "transfers"]);
  const vehicleRows = [
    ["인도 연월", "delivery", info.delivery, true],
    ["현재 주행거리(만 km)", "mileage", info.mileage, true],
    ["차량 색상", "color", info.color, true],
    ["소유권 이전 횟수", "transfers", info.transfers, true],
    ["희망 판매가(만원)", "price", info.price, true],
  ];

  return (
    <main className="min-h-screen px-[9px] pb-[24px] bg-[#eef1f8]">
      <header className="h-[76px] flex items-center bg-[#f5f6fb]">
        <button
          className="w-[45px] text-[#171a22] text-[42px] leading-none"
          aria-label="닫기"
          onClick={onBack}
        >
          ×
        </button>
        <strong className="text-[27px]">{saleCopy.header}</strong>
        <span className="ml-[14px] text-[29px]">⇄</span>
        <button className="ml-auto px-[18px] py-[13px] rounded-[11px] bg-[#ffedba] text-[#cbd0dc] text-[18px] font-bold">
          ◁ {saleCopy.publish}
        </button>
      </header>
      <p className="mx-[5px] my-[14px] text-[#979dac] text-[19px] leading-[1.45]">
        {saleCopy.photoHint}, 여러 각도의 외관과 실내 사진을 추가하면
        <br />
        노출을 크게 높일 수 있어요!
      </p>
      <section className="rounded-[14px] bg-white h-[112px] px-[9px] py-[10px]">
        <button className="w-[96px] h-[92px] border border-dashed border-[#d8dce7] flex flex-col items-center justify-center gap-[5px] text-[#9ca2b2]">
          <strong className="text-[39px] font-light leading-none">＋</strong>
          <span className="text-[14px]">{saleCopy.vehiclePhoto}</span>
        </button>
      </section>
      <section className="rounded-[14px] bg-white mt-[10px] px-[12px] pt-[17px] pb-[13px]">
        <div className="flex items-center gap-[7px] h-[34px] text-[#31343c]">
          <span className="text-[23px]">▱</span>
          <strong className="flex-1 text-[17px] whitespace-nowrap overflow-hidden text-ellipsis">
            {saleCopy.vehicle}
          </strong>
          <button className="text-[#aeb4c2] text-[24px]" aria-label="차량 변경">
            ⇄
          </button>
        </div>
        <div className="mt-[10px] px-[9px] py-[5px] rounded-[8px] bg-[#f7f8fc]">
          {vehicleRows.map(([label, field, value, required]) => (
            <label
              className="min-h-[44px] flex items-center gap-[5px] text-[#242731] text-[17px]"
              key={field}
            >
              <span className="flex-none">
                {label}
                {required && <em className="ml-[3px]">*</em>}
              </span>
              <input
                className={`flex-1 min-w-0 border-0 outline-none bg-transparent [font:inherit] text-right placeholder:text-[#c7cbd7] ${
                  field === "price"
                    ? "text-[#ed492d] text-[21px] font-bold"
                    : "text-[#282b34]"
                }`}
                value={value}
                placeholder={field === "mileage" ? "선택" : ""}
                readOnly={readOnlyFields.has(field)}
                onChange={(e) =>
                  dispatch({
                    type: "SET_SALE_FIELD",
                    field,
                    value: e.target.value,
                  })
                }
              />
              <b className="text-[#aeb4c2] text-[25px] font-normal">›</b>
            </label>
          ))}
        </div>
      </section>
      <section className="rounded-[14px] bg-white min-h-[286px] mt-[10px] px-[14px] pt-[17px] pb-[13px]">
        <input
          className="w-full border-0 outline-none bg-transparent text-[#343741] h-[40px] pb-[10px] border-b border-[#e2e5ec] text-[20px] font-bold placeholder:text-[#c8ccd8] placeholder:opacity-100"
          value={info.title}
          placeholder="제목을 추가하면 추천되기 쉬워요 (선택)"
          aria-label="판매글 제목"
          onChange={(e) =>
            dispatch({
              type: "SET_SALE_FIELD",
              field: "title",
              value: e.target.value,
            })
          }
        />
        <textarea
          className="w-full border-0 outline-none bg-transparent text-[#343741] min-h-[175px] pt-[16px] pb-[8px] resize-none text-[16px] leading-[1.55] placeholder:text-[#c8ccd8] placeholder:opacity-100"
          value={info.body}
          placeholder={saleCopy.bodyPlaceholder}
          aria-label="판매글 본문"
          onChange={(e) =>
            dispatch({
              type: "SET_SALE_FIELD",
              field: "body",
              value: e.target.value,
            })
          }
        />
        <div className="flex items-center gap-[8px]">
          <button className="px-[12px] py-[8px] rounded-[7px] bg-[linear-gradient(100deg,#fff1ff,#e9f8ff)] text-[#5b61db] text-[16px] font-bold">
            <span className="mr-[3px] italic text-[17px]">AI</span>
            {saleCopy.aiHelp}
          </button>
          <button className="px-[11px] py-[8px] rounded-[7px] bg-[#f2f4fa] text-[#c2c7d3] text-[15px]">
            {saleCopy.clear}
          </button>
          <button className="px-[11px] py-[8px] rounded-[7px] bg-[#f2f4fa] text-[#c2c7d3] text-[15px]">
            ⌖ {saleCopy.location}
          </button>
          <span className="text-[#c2c7d3] text-[15px]">
            {info.body.length}/2000
          </span>
        </div>
      </section>
    </main>
  );
}

export default SaleScreen;
