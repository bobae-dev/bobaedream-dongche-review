/**
 * 왼쪽에 노란 막대가 붙은 목록 구분 제목.
 *
 * 차종 선택의 제조사 묶음('FAW-아우디')과 세부 모델 선택의 엔진 묶음
 * ('2.0T 190마력 L4')이 쓴다. 실제 앱 측정값: 높이 41 · 막대 3×14 #ffcc32
 * (왼쪽 16) · 글자 15px #1f2129 (왼쪽 24). 내용은 가운데보다 4~5px 아래
 * (위 9px 여백)에 있다 — 앱이 그렇다.
 *
 * @param children  제목 문구
 * @param sticky    스크롤해도 위에 붙을지. top 은 style 로 준다.
 * @param style     sticky 일 때의 top 등
 */
function BarHeading({ children, sticky = false, style }) {
  return (
    <h2
      className={`h-[41px] pl-[16px] pt-[9px] flex items-center gap-[5px] bg-white text-[15px] font-normal text-[#1f2129] ${
        sticky ? "sticky z-[2]" : ""
      }`}
      style={style}
    >
      <i
        className="w-[3px] h-[14px] rounded-[1px] bg-[#ffcc32]"
        aria-hidden="true"
      ></i>
      {children}
    </h2>
  );
}

export default BarHeading;
