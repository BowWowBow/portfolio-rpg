# v4.4 PIN Lock Update

- Portfolio entry PIN: 9999
- 4-digit numeric gate added
- Unlock state is kept for the current browser tab session

# 정경수 개발자 포트폴리오

현장 경험을 바탕으로 업무 문제를 웹서비스로 구현한 풀스택 개발 포트폴리오입니다.

## 대표 웹 프로젝트

| 프로젝트 | 설명 | 주요 기술 |
| --- | --- | --- |
| Tannus MES | 포장 지시, QR 스캔, 출고, 입고, 재고를 연결한 제조·물류 관리 시스템 | Java, Spring Boot, JSP, MyBatis, MySQL |
| AutoOrder | 현재고와 최소재고, 업체별 발주일, 박스 단위를 반영한 자동발주 시스템 | Java, Spring Boot, Scheduler, MyBatis, MySQL |
| ToyShop | 회원, 상품, 장바구니, 주문, 결제와 관리자 기능을 구현한 쇼핑몰 | Java, Spring Boot, Thymeleaf, Toss Payments |
| WhisperMe | AI 채팅, 이미지 분석, 일정, 날씨와 음성 입력을 제공하는 웹서비스 | React, Spring Boot, OpenAI API, MySQL |
| About J | 영상 콘텐츠 탐색과 AI Shorts 제작·YouTube 업로드를 연결한 웹서비스 | Spring Boot, Thymeleaf, MySQL, YouTube Data API |

각 프로젝트는 개인 개발로 진행했으며 기획, 데이터 설계, 백엔드, 화면 구현과 AWS 배포를 담당했습니다.

## 포트폴리오 구성

- 프로젝트별 주요 기능과 서비스 흐름
- 핵심 구현 코드와 외부 API 연동
- 문제 해결 과정
- 요구사항, 논리 ERD와 시스템 구조
- 데모 계정, GitHub README와 시연 영상

## 포트폴리오 기술

- React 19
- Vite 8
- CSS
- AWS EC2
- Nginx

## 실행

```bash
npm install
npm run dev
```

배포용 빌드와 코드 검사는 다음 명령으로 확인합니다.

```bash
npm run lint
npm run build
```

## 공개 주소

- 포트폴리오: https://jkyungsoo.com
- GitHub: https://github.com/BowWowBow

전체 구성은 웹 5개와 앱 6개, 총 11개 프로젝트입니다. ERD 관계도에 엔터티·필드를 표시하고, 관계별 설계 의도는 펼쳐보기로 제공합니다. 앱 ERD는 실제 DB 구현과 다를 수 있는 논리 모델입니다.
