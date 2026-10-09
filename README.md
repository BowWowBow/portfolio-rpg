# Portfolio v5.5 — WhisperMe Memory + RAG Update

- v5.2의 모든 피드백 반영 내용 유지
- Web 5 + App 6 Overview의 `기술 활용`을 `기술명 — 실제 사용 용도` 형식으로 상세화
- 각 카드의 `선택 이유` 유지
- 프로젝트 상세의 SCREENSHOTS 자리, 기술 선택 이유, 아키텍처, ERD, 트러블슈팅, 향후 개선 계획 유지
- JoWalking의 Foreground Service는 향후 개선안과 구분되도록 Overview의 현재 구현 표현을 `이동 좌표 기록`으로 정리

로컬 확인: `npm install` 후 `npm run dev`


## v5.4
- PROJECT OVERVIEW 강조 프로젝트: Tannus MES, ToyShop, WhisperMe, 스다스 작업관리, JoWalking, TranSu
- 강조 방식: 옅은 네이비 계열 배경 + 상단 포인트 라인. 기존 내용/스크린샷 자리 유지.


## v5.5
- WhisperMe를 Memory + RAG 기반 LLM 서비스로 갱신
- 사용자 공통 메모리 / 대화방 메모리 구조 반영
- OpenAI Embedding + Cosine Similarity 기반 RAG 설명 추가
- Question Router, Naver Search + LLM 흐름 반영
- WhisperMe DB/ERD에 ConversationMemory, UserMemory, RagDocument, RagChunk 추가
- RAG 출처 표시 및 Docker Compose 통합 실행 내용 반영


## V6.12 업데이트
- 스다스 작업관리, JoWalking 실제 화면 캡처 추가
- 앱 상세 화면 이미지 클릭 시 확대 기능 연결
