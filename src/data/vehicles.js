/**
 * 차량 선택(브랜드 → 차종 → 세부 모델) 데이터.
 *
 * 실제 앱(懂车帝 '选择品牌 · 选择车系 · 选择车型' 화면)을 uiautomator 로 읽어
 * 순서 그대로 옮긴 더미 데이터다 (2026-09-29). 이 파일은 스크립트로 만들었다.
 *
 *   brandGroups     : 브랜드. 앱에는 26그룹 646개가 있는데, 그룹마다 앱이 앞에
 *                     두는 인기 브랜드를 최대 10개씩만 옮겼다. 그룹 머리글자는
 *                     앱과 같이 중국어 병음 기준이라 한글 이름과 맞지 않을 수 있다.
 *   seriesByBrand   : 차종. 실제 데이터는 아우디·벤츠뿐이다 (지도가가 있는 것만).
 *   trimsBySeries   : 세부 모델. 실제 데이터는 아우디 A4L·벤츠 A-클래스의
 *                     최근 3개 연식뿐이다.
 *
 * 실제 데이터가 없는 브랜드·차종은 seriesOf / trimsOf 가 "샘플" 이 붙은
 * 대체 목록을 돌려준다. 화면 흐름을 끝까지 눌러 볼 수 있게 하려는 것이다.
 *
 * 가격 단위 '만'은 앱의 '万'(만 위안)을 그대로 옮긴 것이다.
 */

export const brandGroups = [
  [
    "A",
    [
      "아우디",
      "AITO 아이토",
      "아이안",
      "아바타",
      "아우디 AUDI",
      "애스턴 마틴",
      "알파 로메오",
      "AIVA",
      "아이츠",
      "안카 버스"
    ]
  ],
  [
    "B",
    [
      "BYD",
      "벤츠",
      "BMW",
      "혼다",
      "뷰익",
      "포르쉐",
      "베이징 오프로드",
      "베이징자동차",
      "벤텅",
      "벤틀리"
    ]
  ],
  [
    "C",
    [
      "창안",
      "창안 치위안",
      "그레이트월",
      "창안 오상",
      "창안 카이청",
      "창안 콰웨",
      "스카이웰",
      "청궁자동차",
      "청스",
      "처츠자동차"
    ]
  ],
  [
    "D",
    [
      "폭스바겐",
      "둥펑",
      "둥펑 펑싱",
      "둥펑 펑선",
      "맥서스",
      "둥펑 나노",
      "닷지",
      "DS",
      "둥난",
      "둥펑 펑광"
    ]
  ],
  [
    "E",
    [
      "212",
      "Electra Meccanica",
      "Elektron",
      "e.GO",
      "Elemental",
      "Edsel",
      "E-Legend",
      "EdisonFuture"
    ]
  ],
  [
    "F",
    [
      "토요타",
      "포드",
      "페이판",
      "팡청바오",
      "페라리",
      "포톤",
      "포톤 카원",
      "피아트",
      "푸디",
      "페이뎨"
    ]
  ],
  [
    "G",
    [
      "GAC 트럼치",
      "GAC 하이퍼",
      "GAC 그룹",
      "궈진자동차",
      "하이파이",
      "궈지즈쥔",
      "궈신 신에너지",
      "코로스",
      "광퉁 버스",
      "GAC 지아오"
    ]
  ],
  [
    "H",
    [
      "하발",
      "훙치",
      "화징",
      "허촹",
      "하이마",
      "한텅",
      "화천신르",
      "화타이",
      "화타이 신에너지",
      "헝츠"
    ]
  ],
  [
    "I",
    [
      "iCAR",
      "Icona",
      "Italdesign",
      "Inferno",
      "IED",
      "INKAS",
      "IZERA",
      "International Harvester",
      "Isotta Fraschini",
      "INDI"
    ]
  ],
  [
    "J",
    [
      "지리자동차",
      "지리 인허",
      "지커",
      "제투어",
      "제투어 산하이",
      "ARCFOX",
      "지리 지오메트리",
      "제타",
      "지프",
      "재규어"
    ]
  ],
  [
    "K",
    [
      "캐딜락",
      "크라이슬러",
      "카이이",
      "카이루이",
      "카웨이",
      "카성",
      "KTM",
      "쿤츠",
      "칼슨",
      "카이윈"
    ]
  ],
  [
    "L",
    [
      "랜드로버",
      "렉서스",
      "링컨",
      "리오토",
      "링크앤코",
      "립모터",
      "온보",
      "보야",
      "롤스로이스",
      "람보르기니"
    ]
  ],
  [
    "M",
    [
      "마쓰다",
      "MG",
      "MINI",
      "멍스",
      "마세라티",
      "맥라렌",
      "마이마이",
      "마이샤루이",
      "모건",
      "민안"
    ]
  ],
  [
    "N",
    [
      "네타",
      "럭스젠",
      "NEVS",
      "노블",
      "nanoFLOWCELL",
      "Neuron EV",
      "니콜라",
      "NamX",
      "Napier",
      "Novitec"
    ]
  ],
  [
    "O",
    [
      "오라",
      "어큐라",
      "오랑",
      "오펠",
      "오롄"
    ]
  ],
  [
    "P",
    [
      "펑크",
      "파가니",
      "페키오",
      "Puritalia",
      "Piëch",
      "폰티악",
      "푸만 뎬펑",
      "Pogea Racing",
      "패커드",
      "Posaidon"
    ]
  ],
  [
    "Q",
    [
      "체리",
      "체리 펑윈",
      "체리 신에너지",
      "체리 QQ",
      "치징",
      "기아",
      "치천",
      "첸투",
      "글로벌 호크",
      "조지 패튼"
    ]
  ],
  [
    "R",
    [
      "닛산",
      "로위",
      "루이란",
      "루이츠",
      "룽다즈짜오",
      "루후",
      "리치",
      "램",
      "Rezvani",
      "리막"
    ]
  ],
  [
    "S",
    [
      "디프블루",
      "스코다",
      "스마트",
      "상제",
      "스제",
      "스바루",
      "스지",
      "프리랜더",
      "SWM",
      "살롱"
    ]
  ],
  [
    "T",
    [
      "테슬라",
      "탱크",
      "덴자",
      "톈지",
      "타이카터",
      "타타",
      "테크루스",
      "TVR",
      "Tramontana",
      "TOGG"
    ]
  ],
  [
    "U",
    [
      "Ultima",
      "Uniti"
    ]
  ],
  [
    "V",
    [
      "벤투리",
      "빈패스트",
      "VLF Automotive",
      "VANTAS",
      "Vanda Electric",
      "Vega Innovations",
      "Vanwall",
      "VIRITECH",
      "Vanderhal",
      "비르트펜"
    ]
  ],
  [
    "W",
    [
      "우링",
      "볼보",
      "니오",
      "웨이",
      "웰트마이스터",
      "이스즈",
      "WALD",
      "웨이린",
      "웨이하오",
      "비스만"
    ]
  ],
  [
    "X",
    [
      "샤오미",
      "샤오펑",
      "샹제",
      "쉐보레",
      "현대",
      "시트로엥",
      "엑시드",
      "신카이",
      "싱츠",
      "샤오아오"
    ]
  ],
  [
    "Y",
    [
      "양왕",
      "FAW",
      "파이어플라이",
      "이징",
      "인피니티",
      "예",
      "이네오스",
      "예마",
      "윈두",
      "이베코"
    ]
  ],
  [
    "Z",
    [
      "IM",
      "즈제",
      "쭌제",
      "중싱",
      "쭝헝",
      "중화",
      "시노트럭 VGV",
      "즈더우",
      "즈눠",
      "정다오"
    ]
  ]
];

export const seriesByBrand = {
  "아우디": [
    {
      "maker": "FAW-아우디",
      "series": [
        {
          "name": "아우디 A3",
          "price": "16.59-20.99만"
        },
        {
          "name": "아우디 A4L",
          "price": "28.98-36.28만"
        },
        {
          "name": "아우디 A5L",
          "price": "25.58-34.68만"
        },
        {
          "name": "아우디 A6L",
          "price": "32.29-55.89만"
        },
        {
          "name": "아우디 A6L e-tron",
          "price": "30.98-43.98만"
        },
        {
          "name": "아우디 Q2L",
          "price": "17.18-18.58만"
        },
        {
          "name": "아우디 Q3",
          "price": "25.18-29.68만"
        },
        {
          "name": "아우디 Q3 Sportback",
          "price": "26.38-30.18만"
        },
        {
          "name": "아우디 Q4 e-tron",
          "price": "28.99-36.71만"
        },
        {
          "name": "아우디 Q5L",
          "price": "30.98-39.98만"
        },
        {
          "name": "아우디 Q5L Sportback",
          "price": "37.98-42.98만"
        },
        {
          "name": "아우디 Q6L e-tron",
          "price": "27.98-39.98만"
        },
        {
          "name": "아우디 Q6L Sportback e-tron",
          "price": "29.98-41.98만"
        },
        {
          "name": "아우디 A4",
          "price": "27.10-56.65만"
        },
        {
          "name": "아우디 A6",
          "price": "29.80-85.59만"
        },
        {
          "name": "아우디 A6L PHEV",
          "price": "45.48-50.80만"
        },
        {
          "name": "아우디 Q2L e-tron",
          "price": "22.68-24.38만"
        },
        {
          "name": "아우디 Q5",
          "price": "35.85-57.17만"
        },
        {
          "name": "아우디 e-tron",
          "price": "54.68-64.88만"
        }
      ]
    },
    {
      "maker": "SAIC-아우디",
      "series": [
        {
          "name": "아우디 A5L Sportback",
          "price": "27.99-39.99만"
        },
        {
          "name": "아우디 A7L",
          "price": "41.87-66.62만"
        },
        {
          "name": "아우디 Q6",
          "price": "46.76-61.06만"
        },
        {
          "name": "아우디 Q5 e-tron",
          "price": "29.85-43.55만"
        }
      ]
    },
    {
      "maker": "아우디(수입)",
      "series": [
        {
          "name": "아우디 A4(수입)",
          "price": "35.98-43.08만"
        },
        {
          "name": "아우디 A5",
          "price": "37.98-48.48만"
        },
        {
          "name": "아우디 A6(수입)",
          "price": "50.68-58.48만"
        },
        {
          "name": "아우디 A7",
          "price": "58.98-78.88만"
        },
        {
          "name": "아우디 A8",
          "price": "78.98-207.68만"
        },
        {
          "name": "아우디 S4",
          "price": "48.88-52.18만"
        },
        {
          "name": "아우디 S5",
          "price": "57.18-70.88만"
        },
        {
          "name": "아우디 S6",
          "price": "85.88만"
        },
        {
          "name": "아우디 S7",
          "price": "103.28만"
        },
        {
          "name": "아우디 S8",
          "price": "207.68만"
        },
        {
          "name": "아우디 Q7",
          "price": "60.98-80.48만"
        },
        {
          "name": "아우디 Q8",
          "price": "78.68-108.48만"
        },
        {
          "name": "아우디 SQ5",
          "price": "59.88만"
        },
        {
          "name": "아우디 SQ5 Sportback",
          "price": "63.88만"
        },
        {
          "name": "아우디 SQ7",
          "price": "109.88만"
        },
        {
          "name": "아우디 SQ8",
          "price": "113.98만"
        },
        {
          "name": "아우디 A1",
          "price": "18.98-31.18만"
        },
        {
          "name": "아우디 A3 PHEV(수입)",
          "price": "39.98-40.78만"
        },
        {
          "name": "아우디 A8 PHEV",
          "price": "108.88-111.78만"
        },
        {
          "name": "아우디 e-tron GT",
          "price": "99.98만"
        },
        {
          "name": "아우디 S3",
          "price": "32.50-39.98만"
        },
        {
          "name": "아우디 e-tron(수입)",
          "price": "69.28-82.86만"
        },
        {
          "name": "아우디 e-tron Sportback(수입)",
          "price": "65.88-73.58만"
        },
        {
          "name": "아우디 TT",
          "price": "45.38-73.00만"
        },
        {
          "name": "아우디 TTS",
          "price": "59.78-72.98만"
        }
      ]
    },
    {
      "maker": "Audi Sport",
      "series": [
        {
          "name": "아우디 RS 3",
          "price": "63.68만"
        },
        {
          "name": "아우디 RS 4",
          "price": "82.88만"
        },
        {
          "name": "아우디 RS 5",
          "price": "85.28-87.48만"
        },
        {
          "name": "아우디 RS 6",
          "price": "145.38-190.66만"
        },
        {
          "name": "아우디 RS 7",
          "price": "146.88만"
        },
        {
          "name": "아우디 RS Q8",
          "price": "146.89만"
        },
        {
          "name": "아우디 RS e-tron GT",
          "price": "124.78만"
        },
        {
          "name": "아우디 TT RS",
          "price": "46.60-76.98만"
        },
        {
          "name": "아우디 R8",
          "price": "182.30-275.34만"
        }
      ]
    }
  ],
  "벤츠": [
    {
      "maker": "베이징 벤츠",
      "series": [
        {
          "name": "벤츠 A-클래스",
          "price": "25.13-27.57만"
        },
        {
          "name": "벤츠 EQA",
          "price": "32.20만"
        },
        {
          "name": "벤츠 GLA",
          "price": "29.99-34.69만"
        },
        {
          "name": "벤츠 A-클래스 AMG",
          "price": "41.66만"
        },
        {
          "name": "벤츠 EQB",
          "price": "35.20-42.80만"
        },
        {
          "name": "벤츠 GLB",
          "price": "27.39-31.19만"
        },
        {
          "name": "벤츠 C-클래스",
          "price": "29.99-34.56만"
        },
        {
          "name": "벤츠 CLA EV",
          "price": "22.90-29.99만"
        },
        {
          "name": "벤츠 GLC",
          "price": "35.18-46.28만"
        },
        {
          "name": "벤츠 GLC PHEV",
          "price": "51.80만"
        },
        {
          "name": "벤츠 GLC EV",
          "price": "33.98만"
        },
        {
          "name": "벤츠 EQE SUV",
          "price": "48.60-63.06만"
        },
        {
          "name": "벤츠 E-클래스",
          "price": "37.88-59.98만"
        },
        {
          "name": "벤츠 E-클래스 PHEV",
          "price": "53.86만"
        },
        {
          "name": "벤츠 EQE",
          "price": "47.80-62.70만"
        },
        {
          "name": "벤츠 GLE",
          "price": "59.98-76.78만"
        },
        {
          "name": "벤츠 C-클래스 PHEV",
          "price": "40.65-59.90만"
        },
        {
          "name": "벤츠 EQC",
          "price": "49.19-62.28만"
        },
        {
          "name": "벤츠 GLK-클래스",
          "price": "37.80-55.80만"
        }
      ]
    },
    {
      "maker": "벤츠(수입)",
      "series": [
        {
          "name": "벤츠 CLA(수입)",
          "price": "30.92-39.44만"
        },
        {
          "name": "벤츠 GLC 쿠페",
          "price": "43.08-49.78만"
        },
        {
          "name": "벤츠 E-클래스(수입)",
          "price": "40.38-50.18만"
        },
        {
          "name": "벤츠 CLE-클래스",
          "price": "45.76-59.98만"
        },
        {
          "name": "벤츠 S-클래스",
          "price": "89.88-128.83만"
        },
        {
          "name": "벤츠 S-클래스 PHEV",
          "price": "130.83만"
        },
        {
          "name": "벤츠 GLE(수입)",
          "price": "69.98-88.98만"
        },
        {
          "name": "벤츠 GLE 쿠페",
          "price": "79.98-94.78만"
        },
        {
          "name": "벤츠 GLE PHEV",
          "price": "82.48만"
        },
        {
          "name": "벤츠 GLE 쿠페 PHEV",
          "price": "84.60만"
        },
        {
          "name": "벤츠 G-클래스",
          "price": "186.80만"
        },
        {
          "name": "벤츠 GLS",
          "price": "96.80-139.82만"
        },
        {
          "name": "벤츠 A-클래스(수입)",
          "price": "21.98-54.00만"
        },
        {
          "name": "벤츠 B-클래스",
          "price": "22.08-36.80만"
        },
        {
          "name": "벤츠 C-클래스(수입)",
          "price": "30.00-82.80만"
        },
        {
          "name": "벤츠 CLS",
          "price": "57.68-149.80만"
        },
        {
          "name": "벤츠 GLA(수입)",
          "price": "28.98-39.80만"
        },
        {
          "name": "벤츠 R-클래스",
          "price": "54.88-124.80만"
        },
        {
          "name": "벤츠 SLC-클래스",
          "price": "50.68-68.80만"
        },
        {
          "name": "벤츠 SL-클래스",
          "price": "99.38-256.80만"
        },
        {
          "name": "벤츠 GLK-클래스(수입)",
          "price": "44.80-72.80만"
        },
        {
          "name": "벤츠 M-클래스",
          "price": "71.80-195.80만"
        },
        {
          "name": "벤츠 GL-클래스",
          "price": "103.80-189.80만"
        },
        {
          "name": "비아노(수입)",
          "price": "53.00-89.00만"
        },
        {
          "name": "Sprinter",
          "price": "99.80-148.00만"
        },
        {
          "name": "벤츠 CL-클래스",
          "price": "176.00-249.80만"
        },
        {
          "name": "벤츠 SLR-클래스",
          "price": "888.00만"
        },
        {
          "name": "벤츠 SLK-클래스",
          "price": "56.00-90.80만"
        },
        {
          "name": "벤츠 CLK-클래스",
          "price": "64.00-160.00만"
        }
      ]
    },
    {
      "maker": "메르세데스-AMG",
      "series": [
        {
          "name": "벤츠 A-클래스 AMG(수입)",
          "price": "40.51-59.46만"
        },
        {
          "name": "벤츠 CLA AMG",
          "price": "45.47-62.59만"
        },
        {
          "name": "벤츠 C-클래스 AMG",
          "price": "54.90-70.08만"
        },
        {
          "name": "벤츠 C-클래스 AMG PHEV",
          "price": "119.18만"
        },
        {
          "name": "벤츠 CLE-클래스 AMG",
          "price": "72.08-78.00만"
        },
        {
          "name": "벤츠 EQE AMG",
          "price": "86.20만"
        },
        {
          "name": "벤츠 S-클래스 AMG PHEV",
          "price": "267.48만"
        },
        {
          "name": "벤츠 EQS AMG",
          "price": "156.60만"
        },
        {
          "name": "벤츠 GLA AMG",
          "price": "44.55만"
        },
        {
          "name": "벤츠 GLB AMG",
          "price": "46.91만"
        },
        {
          "name": "벤츠 GLC AMG",
          "price": "58.90만"
        },
        {
          "name": "벤츠 GLC 쿠페 AMG",
          "price": "69.90만"
        },
        {
          "name": "벤츠 EQE SUV AMG",
          "price": "86.34만"
        },
        {
          "name": "벤츠 GLE AMG",
          "price": "99.88-162.68만"
        },
        {
          "name": "벤츠 GLE 쿠페 AMG",
          "price": "117.08만"
        },
        {
          "name": "벤츠 G-클래스 AMG",
          "price": "259.55만"
        },
        {
          "name": "벤츠 GLS AMG",
          "price": "247.10만"
        },
        {
          "name": "AMG GT",
          "price": "99.80-192.48만"
        },
        {
          "name": "AMG GT PHEV",
          "price": "228.55만"
        },
        {
          "name": "벤츠 SL-클래스 AMG",
          "price": "199.98만"
        },
        {
          "name": "벤츠 E-클래스 AMG",
          "price": "89.58-162.98만"
        },
        {
          "name": "벤츠 S-클래스 AMG",
          "price": "227.88-361.80만"
        },
        {
          "name": "벤츠 M-클래스 AMG",
          "price": "155.00-210.00만"
        },
        {
          "name": "벤츠 GL-클래스 AMG",
          "price": "198.00-214.80만"
        },
        {
          "name": "벤츠 CL-클래스 AMG",
          "price": "226.00-350.00만"
        },
        {
          "name": "벤츠 SLK-클래스 AMG",
          "price": "129.90-130.00만"
        },
        {
          "name": "벤츠 SLS-클래스 AMG",
          "price": "308.00-380.00만"
        }
      ]
    },
    {
      "maker": "메르세데스-마이바흐",
      "series": [
        {
          "name": "마이바흐 S-클래스",
          "price": "139.80-364.30만"
        },
        {
          "name": "마이바흐 S-클래스 PHEV",
          "price": "201.60만"
        },
        {
          "name": "마이바흐 GLS",
          "price": "149.80-278.80만"
        },
        {
          "name": "마이바흐 EQS SUV",
          "price": "148.60-159.50만"
        }
      ]
    },
    {
      "maker": "푸젠 벤츠",
      "series": [
        {
          "name": "벤츠 V-클래스",
          "price": "49.68-66.98만"
        },
        {
          "name": "비토",
          "price": "33.68-38.68만"
        },
        {
          "name": "비아노",
          "price": "39.80-68.90만"
        },
        {
          "name": "스프린터",
          "price": "31.80-49.30만"
        }
      ]
    },
    {
      "maker": "메르세데스-EQ",
      "series": [
        {
          "name": "벤츠 EQS",
          "price": "88.10만"
        },
        {
          "name": "벤츠 전기 G-클래스",
          "price": "217.00만"
        },
        {
          "name": "벤츠 EQS SUV",
          "price": "91.05만"
        }
      ]
    }
  ]
};

export const trimsBySeries = {
  "아우디 A4L": {
    "years": [
      "2026",
      "2025",
      "2024"
    ],
    "trims": [
      {
        "year": "2026",
        "engine": "2.0T 190마력 L4",
        "name": "2026년형 200만 대 기념 에디션 40 TFSI 패션 다이내믹",
        "gearbox": "7단 DCT",
        "price": "28.98만"
      },
      {
        "year": "2026",
        "engine": "2.0T 190마력 L4",
        "name": "2026년형 200만 대 기념 에디션 40 TFSI 럭셔리 다이내믹",
        "gearbox": "7단 DCT",
        "price": "30.98만"
      },
      {
        "year": "2026",
        "engine": "2.0T 190마력 L4",
        "name": "2026년형 200만 대 기념 에디션 40 TFSI Bang&Olufsen Night Edition",
        "gearbox": "7단 DCT",
        "price": "32.98만"
      },
      {
        "year": "2025",
        "engine": "2.0T 245마력 L4",
        "name": "2025년형 200만 대 기념 에디션 45 TFSI quattro 프리미엄 다이내믹",
        "gearbox": "7단 DCT",
        "price": "36.28만"
      },
      {
        "year": "2025",
        "engine": "2.0T 190마력 L4",
        "name": "2025년형 200만 대 기념 에디션 40 TFSI 패션 다이내믹",
        "gearbox": "7단 DCT",
        "price": "28.98만"
      },
      {
        "year": "2025",
        "engine": "2.0T 190마력 L4",
        "name": "2025년형 200만 대 기념 에디션 40 TFSI 럭셔리 다이내믹",
        "gearbox": "7단 DCT",
        "price": "30.98만"
      },
      {
        "year": "2025",
        "engine": "2.0T 190마력 L4",
        "name": "2025년형 200만 대 기념 에디션 40 TFSI 럭셔리 다이내믹 B&O 나이트 에디션",
        "gearbox": "7단 DCT",
        "price": "32.98만"
      },
      {
        "year": "2024",
        "engine": "2.0T 245마력 L4",
        "name": "2024년형 45 TFSI quattro 프리미엄 다이내믹",
        "gearbox": "7단 DCT",
        "price": "40.08만"
      },
      {
        "year": "2024",
        "engine": "2.0T 190마력 L4",
        "name": "2024년형 40 TFSI quattro RS 패키지 스피드",
        "gearbox": "7단 DCT",
        "price": "36.88만"
      },
      {
        "year": "2024",
        "engine": "2.0T 190마력 L4",
        "name": "2024년형 40 TFSI 패션 다이내믹",
        "gearbox": "7단 DCT",
        "price": "32.18만"
      },
      {
        "year": "2024",
        "engine": "2.0T 190마력 L4",
        "name": "2024년형 40 TFSI 럭셔리 다이내믹",
        "gearbox": "7단 DCT",
        "price": "34.38만"
      },
      {
        "year": "2024",
        "engine": "2.0T 190마력 L4",
        "name": "2024년형 40 TFSI 럭셔리 다이내믹 나이트 에디션",
        "gearbox": "7단 DCT",
        "price": "36.58만"
      }
    ]
  },
  "벤츠 A-클래스": {
    "years": [
      "2025",
      "2024",
      "2023"
    ],
    "trims": [
      {
        "year": "2025",
        "engine": "1.3T 163마력 L4",
        "name": "2025년형 A 200 L 패션",
        "gearbox": "7단 습식 DCT",
        "price": "27.57만"
      },
      {
        "year": "2025",
        "engine": "1.3T 136마력 L4",
        "name": "2025년형 A 180 L",
        "gearbox": "7단 습식 DCT",
        "price": "25.13만"
      },
      {
        "year": "2024",
        "engine": "1.3T 163마력 L4",
        "name": "2024년형 A 200 L 다이내믹",
        "gearbox": "7단 습식 DCT",
        "price": "26.08만"
      },
      {
        "year": "2024",
        "engine": "1.3T 163마력 L4",
        "name": "2024년형 A 200 L 패션",
        "gearbox": "7단 습식 DCT",
        "price": "27.22만"
      },
      {
        "year": "2024",
        "engine": "1.3T 163마력 L4",
        "name": "2024년형 부분변경 A 200 L 다이내믹",
        "gearbox": "7단 습식 DCT",
        "price": "26.16만"
      },
      {
        "year": "2024",
        "engine": "1.3T 163마력 L4",
        "name": "2024년형 부분변경 A 200 L 패션",
        "gearbox": "7단 습식 DCT",
        "price": "27.30만"
      },
      {
        "year": "2024",
        "engine": "1.3T 163마력 L4",
        "name": "2024년형 2차 부분변경 A 200 L 패션",
        "gearbox": "7단 습식 DCT",
        "price": "27.57만"
      },
      {
        "year": "2024",
        "engine": "1.3T 136마력 L4",
        "name": "2024년형 A 180 L",
        "gearbox": "7단 습식 DCT",
        "price": "24.95만"
      },
      {
        "year": "2024",
        "engine": "1.3T 136마력 L4",
        "name": "2024년형 부분변경 A 180 L",
        "gearbox": "7단 습식 DCT",
        "price": "25.03만"
      },
      {
        "year": "2024",
        "engine": "1.3T 136마력 L4",
        "name": "2024년형 2차 부분변경 A 180 L",
        "gearbox": "7단 습식 DCT",
        "price": "25.13만"
      },
      {
        "year": "2023",
        "engine": "1.3T 163마력 L4",
        "name": "2023년형 A 200 L 스포츠 세단 다이내믹",
        "gearbox": "7단 DCT",
        "price": "25.38만"
      },
      {
        "year": "2023",
        "engine": "1.3T 163마력 L4",
        "name": "2023년형 A 200 L 스포츠 세단 패션",
        "gearbox": "7단 DCT",
        "price": "26.48만"
      },
      {
        "year": "2023",
        "engine": "1.3T 136마력 L4",
        "name": "2023년형 A 180 L",
        "gearbox": "7단 DCT",
        "price": "21.48만"
      },
      {
        "year": "2023",
        "engine": "1.3T 136마력 L4",
        "name": "2023년형 A 180 L 스포츠 세단",
        "gearbox": "7단 DCT",
        "price": "23.68만"
      }
    ]
  }
};

/** 브랜드의 차종 목록 [{ maker, series: [{ name, price }] }]. 없으면 샘플. */
export function seriesOf(brand) {
  return (
    seriesByBrand[brand] ?? [
      {
        maker: brand,
        series: [1, 2, 3].map((n) => ({
          name: `${brand} 샘플 차종 ${n}`,
          price: null,
        })),
      },
    ]
  );
}

/** 차종의 세부 모델 { years, trims: [{ year, engine, name, gearbox, price }] }. 없으면 샘플. */
export function trimsOf(series) {
  if (trimsBySeries[series]) return trimsBySeries[series];
  const years = ["2026", "2025"];
  return {
    years,
    trims: years.flatMap((year) =>
      ["기본형", "고급형"].map((grade) => ({
        year,
        engine: "샘플 파워트레인",
        name: `${year}년형 샘플 ${grade}`,
        gearbox: "자동",
        price: null,
      })),
    ),
  };
}
