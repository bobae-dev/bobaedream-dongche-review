/**
 * 인도 시기(연/월) 선택 바텀시트.
 *
 * 연도와 월을 각각 세로 스크롤 목록으로 띄우고 scroll-snap 으로 고정한다.
 * 위아래 py-[112px] 여백은 첫/마지막 항목도 가운데 줄에 맞출 수 있게 하는 장치다.
 *
 * 값이 확정되는 시점이 두 단계다.
 *   - SET_DATE_PART     : 목록에서 고르는 즉시 datePicker 임시값만 갱신
 *   - CONFIRM_DATE_PICKER: '확인'을 눌러야 ownerInfo.deliveryTime 에 반영
 * 그래서 '취소'로 닫으면 원래 값이 그대로 남는다.
 *
 * 렌더링 위치가 ReviewScreen 내부가 아니라 App.jsx 인 이유는
 * 화면 전체를 덮는 오버레이라서다.
 */
function DatePickerModal({ state, dispatch }) {
  const years = [2024, 2025, 2026, 2027, 2028];
  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  return (
    <div className="fixed inset-0 z-20 bg-[rgba(0,0,0,0.5)] flex items-end">
      <section
        className="w-[min(100%,430px)] mx-auto bg-white rounded-t-[16px] overflow-hidden"
        role="dialog"
        aria-label="인도 시기 선택"
      >
        <div className="h-[62px] flex items-center justify-between px-[18px] border-b border-[#e6e8ed]">
          <button
            className="text-[20px] text-[#aeb2bc]"
            onClick={() => dispatch({ type: "CANCEL_DATE_PICKER" })}
          >
            취소
          </button>
          <span></span>
          <button
            className="text-[20px] text-[#22252d]"
            onClick={() => dispatch({ type: "CONFIRM_DATE_PICKER" })}
          >
            확인
          </button>
        </div>
        <div className="h-[300px] flex overflow-hidden">
          <div className="flex-1 overflow-y-auto [scroll-snap-type:y_mandatory] py-[112px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {years.map((year) => (
              <button
                key={year}
                className={`block w-full h-[56px] [scroll-snap-align:center] text-[21px] font-normal ${
                  year === state.datePicker.year
                    ? "text-[#171a20] border-y border-[#d6d9df]"
                    : "text-[#dfe2e8]"
                }`}
                onClick={() =>
                  dispatch({ type: "SET_DATE_PART", part: "year", value: year })
                }
              >
                {year}년
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-y-auto [scroll-snap-type:y_mandatory] py-[112px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {months.map((month) => (
              <button
                key={month}
                className={`block w-full h-[56px] [scroll-snap-align:center] text-[21px] font-normal ${
                  month === state.datePicker.month
                    ? "text-[#171a20] border-y border-[#d6d9df]"
                    : "text-[#dfe2e8]"
                }`}
                onClick={() =>
                  dispatch({
                    type: "SET_DATE_PART",
                    part: "month",
                    value: month,
                  })
                }
              >
                {month}월
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default DatePickerModal;
