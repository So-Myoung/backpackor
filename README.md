# BackpacKOR [ 국내 여행 코스 추천 플랫폼 ]

<h3 align="left">"Be a Backpacker with backpacKOR!"</h3>

BackpacKOR는 배낭여행자(Backpacker)에서 영감을 받아 Backpack과 Korea의 합성어로 탄생한,  
국내 여행자를 위한 **맞춤형 여행 코스 추천 플랫폼**입니다.

AI가 나만의 여행 코스를 자동으로 제안해주며, 버튼 한 번으로 모든 일정을 손쉽게 생성할 수 있습니다.  
가고 싶은 지역과 여행 성향만 알려주시면, 복잡한 검색 없이 경로를 한눈에 확인하고 최적 동선을 설정할 수 있어요!

사용자는 추천받은 여행지를 확인하고, 리뷰와 평점을 참고하며 나만의 여행 일정을 쉽게 구성할 수 있습니다.

편리함과 즐거움을 동시에 잡은, 국내 여행의 든든한 동반자 **백팩코**와 함께 지금 당장 떠나보세요!

<br>

## 팀원 및 담당 기능

| 이름 | 주요 담당 기능 |
|------|----------------|
| **김소명** | 소셜 로그인/인증, 마이페이지, 카카오맵 경로 데이터화, LLM 응답 품질 고도화, 페이지네이션/캐싱 |
| **박형민** | 별점·리뷰 시스템 |
| **서희수** | 메인 화면, 여행지, 찜 시스템 |
| **승명배** | 일정 계획 시스템, LLM 기반 일정 추천, 내 일정 시스템 |
| **장창용** | 여행지 상세 페이지, 모달, 찜 시스템, 리뷰 도움 시스템 |

<br>

## 주요 기능

### 공통
| 메인 화면 | 여행지 목록 | 검색 기능 | LLM 코스 추천 | 소셜 로그인 |
|:---:|:---:|:---:|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/7b33c51f-43bb-4841-80f0-12373b7d0340" width="200"> | <img src="https://github.com/user-attachments/assets/81c01d7b-ea96-4ddd-b1ce-0aa5320d1c85" width="200"> | <img src="https://github.com/user-attachments/assets/a1537882-4a7c-4fec-acba-ffa075d72d34" width="200"> | <img src="https://github.com/user-attachments/assets/3e4086ba-06e8-4b5a-932a-80a15dbb07a4" width="200"> | <img src="https://github.com/user-attachments/assets/2ce54773-3a98-4d45-ab98-7f5b87f6bbb9" width="200"> |
#### 공통 핵심 기능
| 기능 분류 | 상세 설명 |
|:---:|:---|
| **여행지 검색 / 필터 / 정렬** | 사용자가 원하는 여행지를 **키워드로 검색**하고, **지역/카테고리/평점순** 등 다양한 기준으로 **필터링 및 정렬**할 수 있습니다. |
| **피드 형태의 여행지 목록** | 인스타그램 **피드처럼 스크롤**하며 다양한 여행지 정보를 **한눈에 탐색**할 수 있는 UI를 제공합니다. |
| **비로그인 정보 열람** | 회원가입이나 **로그인 없이도** 서비스의 **핵심 기능**인 여행지 정보, 리뷰 등을 **자유롭게 열람**할 수 있습니다. |
| **회원 전용 기능 (찜, 리뷰)** | **로그인한 사용자**는 마음에 드는 여행지를 **'찜'**하여 보관하거나, 직접 경험한 여행지에 대한 **별점과 리뷰를 작성**할 수 있습니다. |
| **AI 기반 여행 코스 자동 추천** | 사용자의 **선호도나 트렌드**를 기반으로 **AI**가 **최적의 여행 동선**을 포함한 코스를 **자동으로 생성**하고 추천합니다. |

<br>

### 여행지
| 여행지 목록 | 여행지 상세 | 여행지 리뷰 | 찜하기 | 카카오맵 경로 |
|:---:|:---:|:---:|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/81c01d7b-ea96-4ddd-b1ce-0aa5320d1c85" width="200"> | <img src="https://github.com/user-attachments/assets/b61509ad-3d4b-419b-8331-b3d0ce518912" width="200"> | <img src="https://github.com/user-attachments/assets/a4f64e36-2add-44c6-9e00-c570ce383027" width="200"> | <img src="https://github.com/user-attachments/assets/a455cd1b-3dbb-4a20-88a8-4010506d6d51" width="200"> | <img src="https://github.com/user-attachments/assets/4d66c537-72b8-47ca-a463-09e18517dc9d" width="200"> |
#### 여행지 핵심 기능
| 기능 분류 | 상세 설명 |
|:---:|:---|
| **여행지 상세 정보** | 여행지의 **이름, 지역, 카테고리** 등 기본 정보와 **운영 시간, 비용** 등 방문에 필요한 **상세 정보를 제공**합니다. |
| **여행지 이미지 갤러리** | 사용자가 여행지 분위기를 미리 파악할 수 있도록 **최대 6장**의 이미지를 **슬라이드 형태의 갤러리**로 제공합니다. |
| **리뷰 (별점 + 댓글)** | 사용자가 남긴 **별점과 댓글을 열람**할 수 있으며, 로그인 시 **직접 작성**도 가능합니다. |
| **찜하기 / 평점 / 조회수** | **'찜하기'**, **평점**, **조회수**를 **기록**하고 표시하여 사용자의 반응과 **인기 여행지를 직관적으로 파악**할 수 있습니다. |
| **카카오맵 API 연동** | **카카오맵 API**를 연동하여 여행지의 **정확한 위치를 지도에 표시**하고, **경로 시각화** 기능을 제공합니다. |

<br>

### 내 일정 & 일정 계획
| 내 일정 목록 | 일정 상세 | AI 일정 추천 | 직접 일정 계획 |
|:---:|:---:|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/7b12622e-181f-4766-9a0f-158f123cff58" width="200"> | <img src="https://github.com/user-attachments/assets/5d94e413-c092-42a8-ab45-f36d7ed604f7" width="200"> | <img src="https://github.com/user-attachments/assets/3e4086ba-06e8-4b5a-932a-80a15dbb07a4" width="200"> | <img src="https://github.com/user-attachments/assets/d98f59a2-f1b9-493b-acb8-99dd08f76217" width="200"> |

#### 일정계획 & 내 일정 기능 상세
| 기능 분류 | 상세 설명 |
|:---:|:---|
| **일정 초기 설정** | 사용자가 **AI 자동 추천** 또는 여행지를 **직접 추가**하는 방식 중 하나를 선택하여 새로운 여행 일정을 생성함. 효율적인 자동 생성과 사용자 선호 기반의 수동 생성을 동시에 제공함. |
| **일정 추천 최적화** | **카테고리 기반 추천 알고리즘을 활용**하여 여행 동선이 가장 효율적인 방향으로 여행지 목록을 AI가 자동으로 구성함. 사용자는 최적화된 동선과 테마에 맞는 여행지 목록을 즉시 제공받음. |
| **일정 관리** | 여행 기간을 자유롭게 설정하고, 확정된 여행지 목록의 순서를 **드래그 앤 드롭(Drag & Drop)으로 간편하게 수정**함. 사용자가 일정의 시간적, 지역적 흐름을 유연하게 통제할 수 있게 함. |
| **일정 상세** | **'내 일정 목록'에서 특정 일정을 선택**하면, 해당 일정에 포함된 **확정된 모든 여행지 목록, 시간, 그리고 지도 기반의 동선 세부 정보**를 직관적으로 재확인하고 수정함. |

<br>

### 리뷰
#### 리뷰 기능 상세
| 기능 분류 | 상세 설명 |	
|:---:|:---|
| **리뷰를 통한 작성** | 사용자가 다녀온 여행지의 **경험**을 자유롭게 작성합니다.  |
| **작성한 리뷰 조회** | 모든 사용자들의 다녀온 여행지들의 **경험**들을 자유롭게 조회합니다.|
| **작성한 리뷰 수정 & 관리** | 사용자가 다녀온 여행지의 리뷰를 **수정 또는 삭제** 할 수 있습니다. |
| **리뷰 필터링 상세 조회 기능** | 최신순,별점순 등 **다양한 기준으로 리뷰를 정렬**하여 사용자가 필요한 리뷰를 쉽게 찾을 수 있게 합니다. |
| **도움됐어요 시스템 기능** | 우수한 리뷰를 지정하여 사용자들의 **좋은 리뷰들을 선정**할 수 있습니다.|

<br>

### 마이페이지
| 프로필 관리 | 찜한 여행지 | 내 일정 관리 | 내가 쓴 리뷰 조회 |
|:---:|:---:|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/1a77dff1-b86b-420b-af12-ad5a65e60924" width="200"> | <img src="https://github.com/user-attachments/assets/e1a858a2-7f7d-4bac-acce-23be8a310346" width="200"> | <img src="https://github.com/user-attachments/assets/ea1e1477-2a8b-47ec-a197-d4dcd7e3e183" width="200"> | <img src="https://github.com/user-attachments/assets/494e879b-80a5-4005-80f7-674e1094f8da" width="200"> |

#### 마이페이지 기능 상세
| 기능 분류 | 상세 설명 |
|:---:|:---|
| **프로필 관리** | **소셜 로그인을 통해 등록된 계정 정보(닉네임, 프로필 사진 등)를 확인하고 수정**하는 기능을 제공함. 사용자의 개인 정보를 최신 상태로 관리함. |
| **찜한 여행지** | 사용자가 **'찜하기'를 눌러 저장한 모든 여행지 목록을 한눈에 조회**함. 다시 방문하고 싶거나 관심 있는 여행지를 쉽게 찾아볼 수 있도록 함. |
| **내 일정 관리** | 사용자가 **작성한 모든 여행 일정 목록을 확인하고, 필요에 따라 해당 일정을 수정하거나 완전히 삭제**할 수 있도록 함. 계획된 여행 관리를 용이하게 함. |
| **내가 쓴 리뷰 조회** | 사용자가 **작성한 모든 여행지 리뷰 목록을 모아 보여줌**. 작성한 리뷰를 확인하고, 내용 수정 및 삭제를 통해 피드백 내용을 관리할 수 있음. |

<br>

## 기술 스택

| 항목 | 기술 |
|------|------|
| **프론트엔드** | TypeScript, React, TailwindCSS |
| **백엔드** | Next.js, Node.js |
| **데이터베이스** | Supabase (PostgreSQL) |
| **인증** | Supabase Auth |
| **LLM** | Gemini 2.5 Flash |
| **외부 API** | Kakao 지도 API |
| **정적 분석** | Prettier, ESLint |
| **배포** | Vercel |
| **협업** | GitHub, Notion, Slack |

<br>

## 📁 프로젝트 파일 구조
```
  AIBE4_Project1_Team5/
  ├── backpackor/
  │   ├── app/                      # Next.js App Router
  │   │   ├── page.tsx              # 메인 페이지
  │   │   ├── login/                # 로그인
  │   │   ├── place/                # 여행지
  │   │   │   └── [placeId]/        # 여행지 상세
  │   │   ├── planner/              # 일정 계획
  │   │   ├── my-planner/           # 내 일정
  │   │   │   └── [tripId]/         
  │   │   ├── my-page/              # 마이페이지
  │   │   ├── review/               # 리뷰
  │   │   └── apis/                 # 서버 API 라우트
  │   │
  │   ├── components/               # React 컴포넌트
  │   │   ├── auth/                 # 인증
  │   │   ├── map/                  # 지도(Kakao Maps)
  │   │   ├── place/                # 여행지
  │   │   ├── planner/              # 일정 계획
  │   │   ├── my-planner/           # 내 일정
  │   │   ├── common/               # 공통 컴포넌트
  │   │   ├── navbar/
  │   │   └── profile/
  │   │
  │   ├── apis/                     # 클라이언트 API 함수
  │   ├── hooks/                    # 커스텀 React 훅
  │   ├── types/                    # TypeScript 타입 정의
  │   ├── utils/                    # 유틸리티
  │   ├── lib/                      # 라이브러리
  │   │   └── supabaseClient.ts     # Supabase 클라이언트
  │   └── constants/                # 상수 정의

```

<br>

## ERD
<img width="2200" height="1052" alt="BackpacKOR(백팩코)" src="https://github.com/user-attachments/assets/6cad834f-c470-4aee-a41f-bb729ba5aadd" />

[🔗 ERD Cloud 원본 보기](https://www.erdcloud.com/d/g6hhENEjwNEGPmXF3)

<br>

## 시스템 아키텍처

| 개발 & 배포 | 서비스 구성 |
|:---:|:---:|
| <img width="282" height="529" alt="Image" src="https://github.com/user-attachments/assets/828c2f0e-210d-4250-982d-be453e677138" /> | <img width="586" height="477" alt="Image" src="https://github.com/user-attachments/assets/9bb16fcf-a709-4066-8c4b-d0d2e7d80a18" /> |

<br>

## 팀 협업 방식

### Git 브랜치 전략
**GitHub Flow** 전략 사용
1. 브랜치 생성 (규칙 준수)
2. 기능 개발
3. PR 작성 (PR 템플릿 기반)
4. 코드 리뷰 및 승인
5. `main` 브랜치로 merge → Vercel 자동 배포

### 커밋 컨벤션
#### 커밋 메시지 유형
| 유형 | 의미 |
|------|------|
| `FEAT` | 새로운 기능 추가 |
| `FIX` | 버그 수정 |
| `DOCS` | 문서 수정 |
| `STYLE` | 코드 formatting, 세미콜론 누락 등 |
| `REFACTOR` | 코드 리팩토링 |
| `TEST` | 테스트 코드 추가 |
| `CHORE` | 패키지 매니저 수정, 기타 수정 |
| `DESIGN` | CSS 등 UI 디자인 변경 |
| `COMMENT` | 주석 추가 및 변경 |
| `RENAME` | 파일/폴더명 수정 또는 이동 |
| `REMOVE` | 파일 삭제 |
| `!BREAKING CHANGE` | 커다란 API 변경 |
| `!HOTFIX` | 급한 버그 수정 |
| `ASSETS` | 에셋 파일 추가 |

#### 커밋 메시지 형식
**제목:**
```
[YYMMDD] TYPE: 커밋메시지
```
**내용:**
```markdown
### 작업 내용
- 작업 내용 1
- 작업 내용 2
- 작업 내용 3
```

### PR 템플릿
**제목:**
```
[YYMMDD] PR메시지
```
**내용:**
```markdown
## 이슈 번호
#이슈번호

## 작업 내용
- 작업 내용 1
- 작업 내용 2
- 작업 내용 3
```

<br>

## 로컬 실행 방법
```bash
# 저장소 클론
git clone https://github.com/your-repo/backpackor.git

# 디렉토리 이동
cd backpackor

# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

**환경 변수 설정:**
`.env.local` 파일을 생성하고 아래 내용을 입력해주세요.
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your_project_id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 배포 시에는 배포 주소
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Kakao Map API Key
NEXT_PUBLIC_KAKAO_MAP_API_KEY=your_kakao_map_api_key

# Gemini API Key
GEMINI_API_KEY=your_gemini_api_key
```

<br>

## 참고자료 및 관련 링크

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Supabase 공식 문서](https://supabase.com/docs)
- [Kakao 지도 API](https://apis.map.kakao.com/)
- [Gemini API](https://ai.google.dev/)
- [TailwindCSS 공식 문서](https://tailwindcss.com/docs)
