# 감정 일기 — React + Supabase

> 실습 절차는 [`guide.md`](./guide.md)를 참고하세요.

## 소개

하루의 감정과 짧은 기록을 남기고, 어느 기기에서 열어도 같은 기록을 볼 수 있는 감정 일기입니다.

- 감정 5가지(😊 기쁨 · 😌 평온 · 😢 슬픔 · 😠 화남 · 😰 불안) 중 하나를 고르고 내용을 적어 저장
- 기록을 최신순으로 표시 (감정 이모지, 내용, 작성 날짜·시간, 삭제 버튼)
- 전체 / 감정별 필터 탭
- 불러오는 중, 저장 중(중복 저장 방지), 오류, 빈 상태 표시
- 감정 미선택 또는 내용이 비어 있으면 저장 불가

기술 스택: Vite, React, Tailwind CSS(`@tailwindcss/vite`), Supabase(`@supabase/supabase-js`)

## 어떻게 만들었나요

1. Copilot Plan 모드에 PRD(목표, 데이터 정의, 화면, 상태, 구조 요구사항)를 주고 구현 계획을 세웠습니다.
2. 계획을 승인한 뒤 Agent가 순서대로 구현했습니다.
   - Tailwind CSS 설정 및 Vite 템플릿 예시 화면 정리
   - `src/lib/supabase.js`: Supabase 클라이언트를 한 곳에서만 생성
   - `src/api/diaries.js`: 조회·추가·삭제 함수 (컴포넌트는 이 함수만 호출)
   - `App.jsx`와 `DiaryForm`, `FilterTabs`, `DiaryList` 컴포넌트
3. `npm run lint`, `npm run build`로 검증했습니다.

```
src/
├─ lib/supabase.js        # Supabase 클라이언트
├─ api/diaries.js         # fetchDiaries / addDiary / deleteDiary
├─ emotions.js            # 감정 목록(이모지·라벨)
├─ components/            # DiaryForm, FilterTabs, DiaryList
└─ App.jsx                # 상태 관리(로딩·저장 중·오류·필터)
```

## 데이터는 어디에 저장되나요

Supabase의 `diaries` 테이블에 저장됩니다.

| 컬럼 | 타입 | 설명 |
|---|---|---|
| `id` | bigint | DB가 자동 생성 |
| `content` | text | 필수, 일기 내용 |
| `emotion` | text | 필수, `joy` / `calm` / `sad` / `angry` / `anxious` 중 하나 |
| `created_at` | timestamptz | DB가 자동 생성 |

6주차 To-Do는 브라우저의 localStorage에 저장해서 다른 기기·브라우저에서는 목록이 비어 있었습니다. 이번에는 온라인 DB에 저장하므로 어느 기기·브라우저에서 열어도 같은 기록이 보입니다.

## 보안에서 확인한 것

- Supabase URL과 publishable 키는 `.env.local`에 보관하고 코드에는 직접 적지 않았습니다. `.env*` 파일은 `.gitignore`에 등록되어 GitHub에 올라가지 않습니다. 형식은 [`.env.example`](./.env.example)을 참고하세요.
- publishable 키는 브라우저로 전달되는 값이라 개발자 도구에서 볼 수 있습니다. 그래서 키 자체가 아니라 Supabase의 RLS(Row Level Security) 정책이 데이터를 지켜줍니다.
- 한계: 이 앱에는 로그인이 없으므로, RLS 정책이 익명 접근을 허용하면 키를 가진 누구나 모든 기록을 읽고 지울 수 있습니다. 사용자별로 기록을 분리하려면 인증을 추가하고 `user_id` 기반 정책이 필요합니다.

## 실행 방법

```bash
npm install
cp .env.example .env.local   # 값을 본인의 Supabase 프로젝트 정보로 채우기
npm run dev
```

- 빌드: `npm run build`, 린트: `npm run lint`
- 배포 링크 (Netlify): _배포 후 여기에 추가_

## 커스터마이징한 부분

- 필터는 전체 기록을 한 번 불러온 뒤 화면에서 처리합니다.
- 저장에 성공하면 입력창과 선택한 감정을 초기화합니다.
