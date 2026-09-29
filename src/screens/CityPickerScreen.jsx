import { useState } from "react";

import IndexRail from "../components/IndexRail.jsx";
import { cityPickerCopy } from "../data/copy.js";
import { cityGroups } from "../data/cities.js";
import { useGroupIndex } from "../hooks/useGroupIndex.js";

/**
 * 머리글(헤더 42 + 간격 6 + 검색창 32 + 간격 4)이 차지하는 높이.
 * 그룹 머리글이 이 아래에 붙어 고정되고, 레일로 이동할 때도 이만큼 띄운다.
 */
const TOP_HEIGHT = 84;

/**
 * 지역 선택 화면 (전체 화면 전환형) — 실제 앱의 '选择城市' 화면.
 *
 * 치수는 실제 앱(기기 1220px, 상태바 102px 제외, device px ÷ 3 = CSS px)을
 * 재서 맞췄다.
 *   헤더 42 · 검색창 32(좌우 16, 배경 #f7f8fc, 모서리 2)
 *   그룹 머리글 28 · 도시 행 54 · 구분선 #e6e8f2 (왼쪽 16 부터 레일 앞까지)
 *   레일: 글자 한 칸 18, 현재 그룹은 지름 16 의 검은 원
 *
 * 스크롤해도 머리글과 현재 그룹 머리글은 위에 붙어 있다(sticky).
 * 오른쪽 레일(IndexRail)은 누르거나 끌면 그 그룹으로 이동하고, 스크롤하면
 * 현재 보이는 그룹이 레일에 표시된다(useGroupIndex).
 *
 * 도시를 고르면 SELECT_CITY 가 연 화면(state.cityPickerFrom)의 필드를 채우고
 * 그 화면으로 돌아간다.
 *
 * 이 화면은 페이지(document) 스크롤을 그대로 쓴다. 열 때 맨 위로 올리고
 * 닫을 때 연 화면의 위치로 되돌리는 일은 App 의 useScreenScroll 이 맡는다.
 */
function CityPickerScreen({ dispatch }) {
  const [query, setQuery] = useState("");
  const keyword = query.trim();
  const visibleGroups = keyword
    ? cityGroups
        .map(([letter, cities]) => [
          letter,
          cities.filter((city) => city.includes(keyword)),
        ])
        .filter(([, cities]) => cities.length > 0)
    : cityGroups;
  const letters = visibleGroups.map(([letter]) => letter);
  const { activeLetter, groupRef, jumpTo } = useGroupIndex(letters, TOP_HEIGHT);

  return (
    <section className="min-h-dvh bg-white">
      <div className="sticky top-0 z-[3] bg-white pb-[4px]">
        <header className="relative h-[42px] flex items-center justify-center">
          <button
            className="absolute left-[10px] top-1/2 -translate-y-1/2 p-[4px]"
            aria-label="뒤로"
            onClick={() => dispatch({ type: "BACK" })}
          >
            <BackArrowIcon />
          </button>
          <h1 className="text-[18px] font-semibold text-[#1f2129]">
            {cityPickerCopy.title}
          </h1>
        </header>
        <label className="mt-[6px] mx-[16px] h-[32px] flex items-center gap-[10px] pl-[10px] pr-[10px] rounded-[2px] bg-[#f7f8fc]">
          <SearchIcon />
          {/* 앱은 안내 문구가 14px 이지만 입력 글자는 16px 로 둔다.
              iOS 는 16px 미만 입력창에 포커스가 가면 화면을 확대한다. */}
          <input
            className="flex-1 min-w-0 h-full border-0 outline-none bg-transparent text-[16px] text-[#1f2129] placeholder:text-[14px] placeholder:text-[#979aa8]"
            type="text"
            enterKeyHint="search"
            value={query}
            placeholder={cityPickerCopy.searchPlaceholder}
            aria-label={cityPickerCopy.searchPlaceholder}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>

      <main className="pr-[28px] pb-[24px]">
        {visibleGroups.length === 0 && (
          <p className="pt-[40px] text-center text-[15px] text-[#979aa8]">
            {cityPickerCopy.noResult}
          </p>
        )}
        {visibleGroups.map(([letter, cities]) => (
          <div
            key={letter}
            ref={groupRef(letter)}
          >
            <h2
              className="sticky z-[2] h-[28px] pl-[16px] flex items-center bg-white text-[14px] font-normal text-[#1f2129]"
              style={{ top: TOP_HEIGHT }}
            >
              {letter}
            </h2>
            {cities.map((city) => (
              <button
                key={city}
                className="block w-full pl-[16px] text-left"
                onClick={() => dispatch({ type: "SELECT_CITY", value: city })}
              >
                <span className="h-[54px] flex items-center border-b-[0.5px] border-[#e6e8f2] text-[16px] text-[#1f2129]">
                  {city}
                </span>
              </button>
            ))}
          </div>
        ))}
      </main>

      <IndexRail
        letters={letters}
        activeLetter={activeLetter}
        onJump={jumpTo}
        top={TOP_HEIGHT}
      />
    </section>
  );
}

/** 헤더 왼쪽 ← 화살표. 앱 측정값: 폭 20 · 높이 약 15, 색 #1f2129. */
function BackArrowIcon() {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      stroke="#1f2129"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 8H1.5M8 1.5 1.5 8 8 14.5" />
    </svg>
  );
}

/** 검색창 돋보기. 앱 측정값: 약 12.5px, 검색창 왼쪽에서 10px. */
function SearchIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      stroke="#1f2129"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="5.6" cy="5.6" r="4.6" />
      <path d="m9.1 9.1 3 3" />
    </svg>
  );
}

export default CityPickerScreen;
