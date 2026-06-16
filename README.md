# 🛋️ roomit (루밋)

> **"내 공간을 나만의 스타일로"**  
> 도면이나 치수를 입력하면 공간에 맞는 가구를 추천하고, 마우스 드래그 앤 드롭으로 실시간 가구 배치 및 스타일링을 지원하는 SaaS형 2D 인테리어 솔루션입니다.
https://roomit-ten.vercel.app/
---

## 🚀 주요 기능 (Features)

- **도면 업로드 & 미리보기:** JPG, PNG 평면도 이미지를 드래그 앤 드롭으로 손쉽게 업로드하고 대시보드에서 관리합니다.
- **실시간 2D 가구 배치 에디터:** HTML5 Pointer Events 기반의 경량화된 드래그 앤 드롭 컴포넌트를 통해 브라우저 새로고침 없이 부드럽게 가구를 배치하고 회전할 수 있습니다.
- **정밀 치수 편집:** 가구를 선택하면 활성화되는 속성 패널을 통해 가로/세로 길이를 mm 단위로 정밀하게 조정 가능합니다.
- **현대적인 SaaS UI/UX:** 왼쪽 내비게이션 바(LNB)와 상단 헤더(GNB), 그리고 상황별로 전환되는 스마트 우측 패널을 통해 쾌적한 작업 동선을 제공합니다.

---

## 🛠️ 기술 스택 (Tech Stack)

- **Framework:** Next.js 15+ (App Router)
- **Library:** React 19
- **Compiler:** React Compiler (자동 메모이제이션 및 렌더링 최적화 활성화)
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React

---

## 📂 프로젝트 구조 (Directory Structure)

프로젝트 아키텍처는 가독성과 스케일업을 고려하여 기능별로 명확하게 분리되어 있습니다.

```text
src/
├── app/                  # Next.js App Router (페이지 및 라우팅)
│   ├── page.tsx          # 메인 대시보드 화면
│   ├── upload/           # 도면 업로드 페이지
│   └── editor/           # 가구 배치 캔버스 에디터 페이지
├── components/           # 재사용 가능한 UI 컴포넌트
│   ├── common/           # 버튼, 인풋 등 공통 요소 (추후 분리 예정)
│   └── features/         # 특정 도메인 기능 컴포넌트
└── types/                # 가구 데이터 모델링을 위한 TypeScript 정의 파일
```

## 💻 시작하기 (Getting Started)
1. 저장소 클론 및 패키지 설치
```
# 패키지 설치
npm install
```

2. 로컬 개발 서버 실행
```angular2html
npm run dev
```
서버가 실행되면 브라우저에서 아래 주소로 접속할 수 있습니다.

- 메인 대시보드: http://localhost:3000
- 도면 업로드: http://localhost:3000/upload
- 2D 배치 에디터: http://localhost:3000/editor

## 💡 개발 노트 (Design & Code Convention)
- Font Theme: 전체 UI에 국내 웹 표준에 최적화된 Pretendard(프리텐다드) 폰트가 전역 적용되어 있습니다. 
- Styling Guide: Tailwind CSS v4 설정을 활용하여 인라인 아키텍처를 최소화하고, 컴포넌트 단위의 직관적인 유틸리티 클래스 조화를 지향합니다.
- Performance: React Compiler가 활성화되어 있어 불필요한 useMemo나 useCallback 선언 없이도 캔버스 드래그 발생 시 최적의 프레임을 유지합니다.