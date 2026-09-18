import { useRef } from "react";

import ChipRow from "../components/ChipRow.jsx";
import ComposerFooter from "../components/ComposerFooter.jsx";
import SourceNavigation from "../components/SourceNavigation.jsx";
import { newsCopy } from "../data/copy.js";
import { NEWS_PLACES, SHARED_TOPICS } from "../data/topics.js";
import {
  DRAG_SCROLLER_CLASS,
  useDragScroll,
} from "../hooks/useDragScroll.js";

/**
 * 소식 작성 화면 (탭 0번).
 *
 * 구성: 탭 바 → 이미지 도구 카드 → 제목/본문 → 체크인 장소 → 주제 추가 → 푸터.
 *
 * 제목/본문 입력과 사진 첨부가 동작하고, 나머지 버튼과 칩(체크인 장소·주제)은
 * 아직 표시 전용이다. AI 이미지 카드도 아직 동작하지 않는다.
 *
 * 사진이 늘면 도구 카드가 가로로 넘치므로 끌어서 스크롤할 수 있게 해 두었다.
 * 카드 안의 버튼들이 드래그 끝의 클릭에 반응하지 않도록 shouldIgnoreStripClick()
 * 으로 한 번 걸러낸다 (안 그러면 끌다 놓은 자리의 사진이 삭제된다).
 *
 * 사진은 '사진을 올려 노출 늘리기' 버튼으로 고른다. 파일 input 자체는 숨겨 두고
 * (sr-only) 버튼 클릭을 ref 로 위임하는데, 기본 파일 input 의 생김새를 쓰지 않고
 * 디자인대로 그리기 위해서다. 고른 사진의 임시 URL 수명은 App 의
 * useMediaPicker 가 관리하며, 이 화면은 받은 목록을 그리기만 한다.
 * (탭을 옮겼다 돌아와도 사진이 남아야 해서 상태를 화면 바깥에 둔다)
 *
 * main 의 pb-[170px] 은 fixed 로 떠 있는 ComposerFooter 에 본문이
 * 가려지지 않도록 비워 둔 공간이다.
 */
function NewsScreen({
  state,
  dispatch,
  photos,
  onAddPhotos,
  onRemovePhoto,
  onNavigate,
  onBack,
}) {
  const fileInputRef = useRef(null);
  const {
    ref: stripRef,
    onMouseDown: handleStripMouseDown,
    isDragging: isStripDragging,
    shouldIgnoreClick: shouldIgnoreStripClick,
  } = useDragScroll();

  return (
    <>
      <SourceNavigation
        selectedIndex={0}
        onNavigate={onNavigate}
        onBack={onBack}
      />
      <main className="min-h-[calc(100vh-58px-150px)] px-[9px] pt-[10px] pb-[170px] bg-[#eef1f8]">
        <section
          ref={stripRef}
          onMouseDown={handleStripMouseDown}
          className={`rounded-[14px] bg-white h-[112px] px-[9px] py-[10px] flex gap-[5px] ${DRAG_SCROLLER_CLASS} ${
            isStripDragging
              ? "cursor-grabbing [scroll-behavior:auto]"
              : "cursor-grab scroll-smooth"
          }`}
          aria-label="콘텐츠 도구"
        >
          <button className="flex-[0_0_96px] h-[92px] border border-dashed rounded-[10px] flex flex-col items-center justify-center gap-[4px] text-[13px] whitespace-nowrap border-[#c7bdfb] bg-[linear-gradient(145deg,#fff8ff,#f0f7ff)] text-[#6564e8]">
            <span className="text-[#6b64ee] text-[30px] leading-none">✦</span>
            <strong className="text-[13px] font-medium">
              {newsCopy.imageCard}
            </strong>
          </button>
          <button
            className="flex-[0_0_96px] h-[92px] border border-dashed border-[#d8dce7] rounded-[10px] flex flex-col items-center justify-center gap-[4px] text-[#8f96a8] text-[13px] whitespace-nowrap"
            onClick={() => {
              if (shouldIgnoreStripClick()) return;
              fileInputRef.current?.click();
            }}
          >
            <span className="text-[34px] leading-none text-[#a0a5b5] font-light">
              ＋
            </span>
            <strong className="text-[13px] font-medium text-[#b27d16]">
              {newsCopy.imageCardAction}
            </strong>
            {photos.length > 0 && (
              <small className="text-[11px] text-[#9ba1b0]">
                {photos.length}장 선택됨
              </small>
            )}
          </button>
          {photos.map((photo) => (
            <div
              className="relative flex-[0_0_92px] h-[92px] rounded-[10px] overflow-hidden bg-[#f3f5fa]"
              key={photo.id}
            >
              {/* draggable=false 가 없으면 썸네일을 끌 때 브라우저의 이미지
                  드래그가 시작되어 카드 가로 스크롤이 도중에 끊긴다. */}
              <img
                className="w-full h-full object-cover block"
                src={photo.url}
                alt={photo.name}
                draggable={false}
              />
              <button
                className="absolute top-[3px] right-[3px] w-[22px] h-[22px] rounded-full bg-[rgba(0,0,0,0.6)] text-white text-[17px] leading-[18px]"
                aria-label={`${photo.name} 삭제`}
                onClick={() => {
                  if (shouldIgnoreStripClick()) return;
                  onRemovePhoto(photo.id);
                }}
              >
                ×
              </button>
            </div>
          ))}
          <input
            ref={fileInputRef}
            className="sr-only"
            type="file"
            accept="image/*"
            multiple
            aria-label="사진 추가"
            onChange={onAddPhotos}
          />
        </section>
        <section className="rounded-[14px] bg-white min-h-[345px] mt-[10px] px-[14px] pt-[16px] pb-[12px]">
          <input
            className="w-full border-0 outline-none bg-transparent text-[#30333b] h-[38px] pb-[10px] border-b border-[#e2e5ec] text-[21px] font-bold placeholder:text-[#c8ccd8] placeholder:opacity-100"
            value={state.news.title}
            placeholder={newsCopy.titlePlaceholder}
            aria-label="게시글 제목"
            onChange={(e) =>
              dispatch({
                type: "SET_NEWS_FIELD",
                field: "title",
                value: e.target.value,
              })
            }
          />
          <textarea
            className="w-full border-0 outline-none bg-transparent text-[#30333b] min-h-[190px] pt-[16px] pb-[8px] resize-none text-[17px] leading-[1.55] placeholder:text-[#c8ccd8] placeholder:opacity-100"
            value={state.news.body}
            placeholder={newsCopy.bodyPlaceholder}
            aria-label="게시글 본문"
            onChange={(e) =>
              dispatch({
                type: "SET_NEWS_FIELD",
                field: "body",
                value: e.target.value,
              })
            }
          />
          <button className="px-[12px] py-[8px] rounded-[7px] bg-[linear-gradient(100deg,#fff1ff,#e9f8ff)] text-[#5b61db] text-[16px] font-bold">
            <span className="mr-[3px] italic text-[17px]">AI</span>
            {newsCopy.aiHelp}
          </button>
          <p className="mt-[14px] text-[#9fa5b5] text-[15px] whitespace-nowrap">
            <span className="mr-[4px] text-[#9ba1b0] text-[20px]">♧</span>
            {newsCopy.shareHint}
            <a className="text-[#2451c8] no-underline" href="#">
              {newsCopy.shareLink}
            </a>
          </p>
        </section>
        <ChipRow
          icon="⌖"
          title={newsCopy.checkInTitle}
          items={NEWS_PLACES}
        />
        <ChipRow icon="#" title={newsCopy.topicTitle} items={SHARED_TOPICS} />
      </main>
      <ComposerFooter vehicleLabel={newsCopy.vehicle} />
    </>
  );
}

export default NewsScreen;
