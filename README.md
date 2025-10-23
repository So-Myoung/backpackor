# BackpacKOR [ 국내 여행 코스 추천 플랫폼 ]

<h3 align="left">"Be a Backpacker with backpacKOR!"</h3>

BackpacKOR는 배낭여행자(Backpacker)에서 영감을 받아 Backpack과 Korea의 합성어로 탄생한,  
국내 여행자를 위한 **맞춤형 여행 코스 추천 플랫폼**입니다.

AI가 나만의 여행 코스를 자동으로 제안해주며, 버튼 한 번으로 모든 일정을 손쉽게 생성할 수 있습니다.  
가고 싶은 지역과 여행 성향만 알려주시면, 복잡한 검색 없이 경로를 한눈에 확인하고 최적 동선을 설정할 수 있어요!

사용자는 추천받은 여행지를 확인하고, 리뷰와 평점을 참고하며 나만의 여행 일정을 쉽게 구성할 수 있습니다.

편리함과 즐거움을 동시에 잡은, 국내 여행의 든든한 동반자 **백팩코**와 함께 지금 당장 떠나보세요! 🎒

<br>

## 개발 기간
**2025.09 ~ 2025.10**

<br>

## 배포 링크
[![백팩코 바로가기](https://rlnpoyrapczrsgmxtlrr.supabase.co/storage/v1/object/public/logo/brand/red.png)](https://backpackor.vercel.app/)
<br>
[![백팩코 바로가기](https://rlnpoyrapczrsgmxtlrr.supabase.co/storage/v1/object/public/logo/brand/black.png)](https://backpackor.vercel.app/)

<br>

## 주요 기능

### 공통
| 메인 화면 | 여행지 목록 | 검색 기능 | AI 코스 추천 | 소셜 로그인 |
|:---:|:---:|:---:|:---:|:---:|
| *(이미지 삽입)* | *(이미지 삽입)* | *(이미지 삽입)* | *(이미지 삽입)* | *(이미지 삽입)* |

- **여행지 검색 / 필터 / 정렬 기능**  
  - 지역, 카테고리, 평점 기준 검색 및 필터링
- **피드 형태의 여행지 목록 제공**
- **로그인 없이도 여행지 정보 열람 가능**
- **로그인 시 찜, 리뷰 작성 기능 사용 가능**
- **AI 기반 여행 코스 자동 추천**

<br>

### 여행지
| 여행지 목록 | 여행지 상세 | 여행지 리뷰 | 찜하기 | 카카오맵 경로 |
|:---:|:---:|:---:|:---:|:---:|
| *(이미지 삽입)* | *(이미지 삽입)* | *(이미지 삽입)* | *(이미지 삽입)* | *(이미지 삽입)* |

- **여행지 이름, 지역, 카테고리, 운영시간, 비용 정보 제공**
- **여행지 이미지 갤러리 (최대 6장)**
- **리뷰(별점 + 댓글) 작성 및 열람**
- **찜하기 / 평점 / 조회수 기록**
- **카카오맵 API 연동 경로 시각화**

<br>

### 일정 계획
| 내 일정 목록 | 일정 상세 | AI 일정 추천 | 일정 공유 |
|:---:|:---:|:---:|:---:|
| *(이미지 삽입)* | *(이미지 삽입)* | *(이미지 삽입)* | *(이미지 삽입)* |

- **여행 일정 생성 및 여행지 추가**
- **날짜별 일정 구성 및 순서 지정**
- **AI 기반 맞춤형 일정 자동 생성**
- **총 비용, 방문 지역, 체류 시간 등 요약 정보 표시**
- **일정 공유 기능 (링크 복사)**

<br>

### 마이페이지
| 내 프로필 | 내가 찜한 여행지 | 내 일정 관리 | 내가 쓴 리뷰 |
|:---:|:---:|:---:|:---:|
| *(이미지 삽입)* | *(이미지 삽입)* | *(이미지 삽입)* | *(이미지 삽입)* |

- **소셜 로그인을 통한 프로필 관리**
- **내가 찜한 여행지 목록 조회**
- **내가 작성한 일정 목록 조회 및 수정/삭제**
- **내가 작성한 리뷰 관리**

<br>

## 프로젝트 폴더 구조
```
📦 BackpacKOR
├── 📁 app                     # App Router 기반 페이지 디렉토리
│   ├── 📁 auth                # 소셜 로그인 및 인증
│   ├── 📁 mypage              # 마이페이지
│   ├── 📁 places              # 여행지 관련 페이지
│   │   └── 📁 [id]            # 여행지 상세 페이지
│   ├── 📁 schedules           # 일정 관련 페이지
│   │   ├── 📁 [id]            # 일정 상세 페이지
│   │   └── 📁 create          # 일정 생성 페이지
│   └── 📁 api                 # API Routes
├── 📁 components              # 공통 UI 컴포넌트
│   ├── 📁 auth                # 인증 관련 컴포넌트
│   ├── 📁 modal               # 모달 관련 컴포넌트
│   ├── 📁 places              # 여행지 컴포넌트
│   ├── 📁 schedules           # 일정 컴포넌트
│   └── 📁 mypage              # 마이페이지 컴포넌트
├── 📁 hooks                   # 커스텀 훅
├── 📁 lib                     # Supabase, 유틸 함수 등
├── 📁 types                   # TypeScript 타입 정의
└── 📁 utils                   # 유틸리티 함수
```

<br>

## 기술 스택

| 항목 | 기술 |
|------|------|
| **프론트엔드** | TypeScript, React, TailwindCSS |
| **백엔드** | Next.js, Node.js |
| **데이터베이스** | Supabase (PostgreSQL) |
| **인증** | Supabase Auth (Google, Kakao 소셜 로그인) |
| **AI 서비스** | Gemini 2.5 Flash (AI 기반 일정 추천) |
| **외부 API** | Kakao 지도 API (경로 시각화) |
| **정적 분석** | Prettier, ESLint |
| **배포** | Vercel (CI/CD 자동 배포) |
| **협업** | GitHub, Notion, Slack |

<br>

## ERD

*(ERD 이미지를 삽입해주세요)*

👉 [ERD 전체 보기](#) *(ERD 링크를 입력해주세요)*

**주요 테이블 구조:**
- **users**: 사용자 프로필 정보 (auth.users 확장)
- **places**: 여행지 정보 (이름, 지역, 카테고리, 운영시간, 비용 등)
- **schedules**: 여행 일정 (제목, 날짜, 여행지 목록 등)
- **schedule_places**: 일정과 여행지 연결 테이블 (M:N 관계)
- **reviews**: 리뷰 및 별점 (여행지별)
- **favorites**: 찜하기 (사용자별)
- **view_logs**: 조회수 기록

각 테이블 간 외래키(FK) 제약조건을 활용해 참조 무결성을 유지합니다.

<br>

## 🏗 시스템 아키텍처

| 개발 & 배포 | 서비스 구성 |
|:---:|:---:|
| *(아키텍처 다이어그램 이미지 삽입)* | *(서비스 구성도 이미지 삽입)* |

<br>

## 팀 협업 방식

### Git 브랜치 전략
- **GitHub Flow** 전략 사용
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

## 주요 이슈 및 해결
*(개발 중 발생한 주요 이슈와 해결 방법을 작성해주세요)*

예시:
- **카카오맵 API 렌더링 이슈** → useEffect 의존성 배열 최적화로 해결
- **Supabase Auth 연동** → 소셜 로그인 리다이렉트 URL 설정으로 해결
- **조회수 중복 증가** → StrictMode 비활성화 및 배포 환경에서 해결

<br>

## 팀원 및 담당 역할

| 이름 | 역할 | 주요 담당 기능 |
|------|------|----------------|
| **김소명** | 풀스택 개발<br/>프로젝트 매니저(PM) | 소셜 로그인/인증, 마이페이지, 카카오맵 경로 시각화, 평점 시스템, 리팩토링 |
| **박형민** | 풀스택 개발<br/>QA 오너 | 별점·리뷰 시스템 |
| **서희수** | 풀스택 개발<br/>팀장 | 메인 화면, 여행지, 찜 시스템 |
| **승명배** | 풀스택 개발<br/>AI 오너 | 일정 계획, AI 기반 일정 추천, 내 일정 |
| **장창용** | 풀스택 개발<br/>문서 오너 | 여행지 상세 페이지, 모달, 찜 시스템, 리뷰 도움 시스템 |

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
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_KAKAO_MAP_KEY=your-kakao-map-key
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key
```

<br>

## 참고자료 및 관련 링크

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Supabase 공식 문서](https://supabase.com/docs)
- [Kakao 지도 API](https://apis.map.kakao.com/)
- [Gemini API](https://ai.google.dev/)
- [TailwindCSS 공식 문서](https://tailwindcss.com/docs)
