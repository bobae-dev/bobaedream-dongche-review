import {
  CarIcon,
  CheckIcon,
  ChevronRightIcon,
  CloseIcon,
  PlusIcon,
} from "../../components/icons.jsx";

/**
 * 리뷰 화면 상단의 차량 카드.
 *
 * 상태가 둘로 갈린다.
 *   1) state.model === null : '차량 추가' 점선 버튼만 보여 준다.
 *   2) 차량 선택됨          : 차량 정보 + '차주입니다' 체크박스를 보여 주고,
 *                             체크하면 구매 정보 입력 폼이 펼쳐진다.
 *
 * 체크 해제 상태에서는 폼 대신 노란 안내 배너가 그 자리를 채운다.
 *
 * 인도 시기 / 구매 지역은 직접 입력이 아니라 readOnly 인풋을 눌러
 * 각각 모달(OPEN_DATE_PICKER)과 별도 화면(OPEN_CITY_PICKER)을 띄운다.
 *
 * 차량은 '차량 추가'를 누르면 브랜드 → 차종 → 세부 모델 순으로 고른다
 * (OPEN_MODEL_PICKER). 카드에는 state.model 의 차종(name)과 세부 모델(trim)을
 * 보여 주고, 세부 모델이 비어 있으면 그 줄을 생략한다.
 */
function ModelCard({ state, dispatch }) {
  if (!state.model) {
    return (
      <section className="mx-[9px] mb-[10px] px-[14px] py-[18px] rounded-[14px] bg-white">
        <h2 className="mb-[20px] text-[24px]">
          차량 선택 <em>*</em>
        </h2>
        <button
          className="w-full h-[116px] border-2 border-dashed border-[#d6dae6] flex flex-col items-center justify-center text-[#9ba1b2]"
          onClick={() => dispatch({ type: "OPEN_MODEL_PICKER" })}
        >
          <PlusIcon size={40} weight={1.4} />
          <span className="text-[17px]">차량 추가</span>
        </button>
      </section>
    );
  }

  const info = state.ownerInfo;
  return (
    <section className="mx-[9px] mb-[10px] px-[14px] pt-[18px] pb-[12px] rounded-[14px] bg-white">
      <div className="flex justify-between items-center pb-[16px] border-b border-[#e3e6ee]">
        {/* 세부 모델 이름이 길어서(예: '2026년형 200만 대 기념 에디션 …') 좁은
            폰에서는 줄어들 수 있어야 한다. min-w-0 이 없으면 카드 밖으로 밀린다. */}
        <div className="min-w-0">
          <h2 className="mb-[8px] text-[24px] truncate">{state.model.name}</h2>
          {state.model.trim && (
            <p className="m-0 max-w-[275px] text-[#6f7584] text-[17px] whitespace-nowrap overflow-hidden text-ellipsis">
              {state.model.trim}
            </p>
          )}
        </div>
        <CarIcon size={48} />
      </div>
      <button
        className="w-full min-h-[64px] flex items-center gap-[12px] text-[#9ba1b0] text-left"
        onClick={() => dispatch({ type: "TOGGLE_OWNER" })}
      >
        <span
          className={`w-[20px] h-[20px] border-2 rounded-[3px] inline-flex items-center justify-center ${
            state.isOwner
              ? "bg-[#ffca28] border-[#ffca28] text-[#222] font-extrabold"
              : "border-[#cfd4df]"
          }`}
        >
          {state.isOwner && <CheckIcon size={13} />}
        </span>
        <strong className="text-[#272a33] text-[20px] whitespace-nowrap">
          차주입니다
        </strong>
        <span className="flex-1 min-w-0 ml-auto text-[13px] leading-[1.35]">
          구매 정보를 입력하면 베스트 리뷰에 선정될 수 있어요
        </span>
      </button>
      {state.isOwner ? (
        <div className="pt-[3px] pb-[5px]">
          <label className="min-h-[60px] flex items-center gap-[7px] text-[#20232b] text-[18px]">
            인도 시기<em className="ml-[2px]">*</em>
            <input
              className="flex-1 min-w-0 border-0 outline-none text-[#343844] text-[17px] text-left placeholder:text-[#c6cad6]"
              value={info.deliveryTime}
              placeholder="인도 시기를 선택하세요"
              readOnly
              onClick={() => dispatch({ type: "OPEN_DATE_PICKER" })}
            />
            <span className="text-[#9da3b2]">
              <ChevronRightIcon size={16} />
            </span>
          </label>
          <label className="min-h-[60px] flex items-center gap-[7px] text-[#20232b] text-[18px]">
            구매 지역<em className="ml-[2px]">*</em>
            <input
              className="flex-1 min-w-0 border-0 outline-none text-[#343844] text-[17px] text-left placeholder:text-[#c6cad6]"
              value={info.city}
              placeholder="구매 지역을 선택하세요"
              readOnly
              onClick={() => dispatch({ type: "OPEN_CITY_PICKER" })}
            />
            <span className="text-[#9da3b2]">
              <ChevronRightIcon size={16} />
            </span>
          </label>
          <label className="min-h-[60px] flex items-center gap-[7px] text-[#20232b] text-[18px]">
            차량 가격<em className="ml-[2px]">*</em>
            <input
              className="flex-1 min-w-0 border-0 outline-none text-[#343844] text-[17px] text-left placeholder:text-[#c6cad6]"
              value={info.barePrice}
              placeholder="소수점 둘째 자리까지 입력"
              inputMode="decimal"
              onChange={(e) =>
                dispatch({
                  type: "SET_OWNER_FIELD",
                  field: "barePrice",
                  value: e.target.value,
                })
              }
            />
            <span className="text-[#9da3b2] text-[16px] font-normal">만원</span>
          </label>
          <label className="min-h-[60px] flex items-center gap-[7px] text-[#20232b] text-[18px]">
            실구매 가격
            <input
              className="flex-1 min-w-0 border-0 outline-none text-[#343844] text-[17px] text-left placeholder:text-[#c6cad6]"
              value={info.totalPrice}
              placeholder="소수점 둘째 자리까지 입력"
              inputMode="decimal"
              onChange={(e) =>
                dispatch({
                  type: "SET_OWNER_FIELD",
                  field: "totalPrice",
                  value: e.target.value,
                })
              }
            />
            <span className="text-[#9da3b2] text-[16px] font-normal">만원</span>
          </label>
          <label className="min-h-[60px] flex items-center gap-[7px] text-[#20232b] text-[18px]">
            차량 연비<em className="ml-[2px]">*</em>
            <input
              className="flex-1 min-w-0 border-0 outline-none text-[#343844] text-[17px] text-left placeholder:text-[#c6cad6]"
              value={info.mileage}
              placeholder="평균 연비를 입력하세요"
              inputMode="decimal"
              onChange={(e) =>
                dispatch({
                  type: "SET_OWNER_FIELD",
                  field: "mileage",
                  value: e.target.value,
                })
              }
            />
            <span className="text-[#9da3b2] text-[16px] font-normal">
              L/100km
            </span>
          </label>
        </div>
      ) : (
        <div className="px-[10px] py-[15px] bg-[#fff9e8] text-[#474a52] flex justify-between text-[14px] mb-[12px]">
          차주 정보를 입력하면 리뷰의 신뢰도를 높일 수 있어요!{" "}
          <button aria-label="안내 닫기" className="text-[#474a52]">
            <CloseIcon size={16} />
          </button>
        </div>
      )}
    </section>
  );
}

export default ModelCard;
