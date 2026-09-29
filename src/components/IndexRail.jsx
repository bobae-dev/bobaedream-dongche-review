/**
 * 목록 화면 오른쪽에 세로로 붙는 A~Z 바로가기 레일.
 *
 * 실제 앱(지역 선택)을 재서 맞췄다: 글자 한 칸 17 × 18, 글자 10px #606370,
 * 현재 그룹은 지름 16 의 검은 원(#1f2129)에 흰 글자.
 *
 * 누르거나 손가락으로 끌면 지나가는 글자마다 onJump 를 부른다. 끌기는
 * 포인터 아래 요소를 찾아 판정하므로 touch-none 으로 스크롤 제스처를 막는다.
 *
 * 위치는 화면 위 고정 머리글(top) 아래 영역의 세로 가운데보다 10px 위다
 * (앱 측정값, 아래 여백 20px 로 맞춘다). 앱 프레임(--app-width) 오른쪽 끝에
 * 붙도록 바깥 여백만큼 안쪽으로 민다.
 *
 * useGroupIndex 훅과 짝으로 쓴다.
 *
 * @param letters       레일에 그릴 머리글자 배열
 * @param activeLetter  현재 그룹
 * @param onJump        (letter) 그 그룹으로 이동
 * @param top           고정 머리글 높이(px)
 */
function IndexRail({ letters, activeLetter, onJump, top }) {
  function handlePointer(event) {
    if (event.type === "pointermove" && event.buttons === 0) return;
    const letter = document
      .elementFromPoint(event.clientX, event.clientY)
      ?.closest("[data-letter]")?.dataset.letter;
    if (letter && letter !== activeLetter) onJump(letter);
  }

  return (
    <div
      className="fixed right-[max(calc((100%-var(--app-width))/2+2px),2px)] bottom-0 z-[4] pb-[20px] flex items-center pointer-events-none"
      style={{ top }}
    >
      <nav
        className="flex flex-col pointer-events-auto touch-none select-none"
        aria-label="그룹 바로가기"
        onPointerDown={handlePointer}
        onPointerMove={handlePointer}
      >
        {letters.map((letter) => (
          <button
            key={letter}
            data-letter={letter}
            className="w-[17px] h-[18px] flex items-center justify-center"
            aria-label={`${letter} 그룹으로 이동`}
            aria-current={letter === activeLetter}
          >
            <span
              className={`w-[16px] h-[16px] flex items-center justify-center rounded-full text-[10px] ${
                letter === activeLetter
                  ? "bg-[#1f2129] text-white"
                  : "text-[#606370]"
              }`}
            >
              {letter}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default IndexRail;
