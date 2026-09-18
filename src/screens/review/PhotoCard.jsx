import { useRef } from "react";

/**
 * 리뷰 화면의 대표 사진 카드.
 *
 * 실제 파일 input 은 숨겨 두고(sr-only) 점선 버튼 클릭을 ref 로 위임한다.
 * 선택된 파일의 미리보기 URL(createObjectURL)과 해제(revokeObjectURL)는
 * App.jsx 가 소유하며, 여기서는 받은 값을 그리기만 한다.
 *
 * @param selectedCover   { name, url } 또는 null
 * @param onCoverChange   파일 input 의 change 핸들러
 * @param onRemoveCover   우상단 '×' 삭제 버튼
 */
function PhotoCard({ selectedCover, onCoverChange, onRemoveCover }) {
  const fileInputRef = useRef(null);

  return (
    <section className="mx-[9px] mb-[10px] px-[14px] py-[18px] rounded-[14px] bg-white min-h-[155px]">
      {selectedCover ? (
        <div className="relative w-[124px] h-[124px] overflow-hidden rounded-[4px]">
          <img
            className="w-full h-full object-cover block"
            src={selectedCover.url}
            alt={selectedCover.name}
          />
          <div className="absolute left-0 right-0 bottom-0 px-[4px] py-[6px] bg-[rgba(0,0,0,0.62)] text-white text-center text-[12px]">
            ✓ 사진 1장 선택됨
          </div>
          <button
            className="absolute top-[3px] right-[3px] w-[25px] h-[25px] rounded-full bg-[rgba(0,0,0,0.6)] text-white text-[19px] leading-[20px]"
            aria-label="사진 삭제"
            onClick={onRemoveCover}
          >
            ×
          </button>
        </div>
      ) : (
        <button
          className="w-[102px] h-[120px] border-2 border-dashed border-[#d6dae6] flex flex-col items-center justify-center text-[#9ba1b2]"
          onClick={() => fileInputRef.current?.click()}
        >
          <strong className="text-[40px] font-light leading-none">＋</strong>
          <span className="text-[14px]">대표 사진 추가</span>
        </button>
      )}
      <input
        ref={fileInputRef}
        className="sr-only"
        type="file"
        accept="image/*"
        onChange={onCoverChange}
      />
    </section>
  );
}

export default PhotoCard;
