import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./App.css";
import profilePhoto from "./assets/profile.jpg";


const projectLinks = {
  tannus: "https://mes.jkyungsoo.com",
  autoorder: "https://auto.jkyungsoo.com",
  toyshop: "https://toy.jkyungsoo.com",
  whisperme: "https://whisper.jkyungsoo.com",
};

const excelLinks = {
  tannus: "/excel/포장지시서.xlsx",
};

const githubLinks = {
  tannus: "https://github.com/BowWowBow/Tannus-MES",
  autoorder: "https://github.com/BowWowBow/Auto-Order",
  toyshop: "https://github.com/BowWowBow/ToyShop",
  whisperme: "https://github.com/BowWowBow/WhisperMe",
};

const demoLinks = {
  tannus: "/videos/tannus.mp4",
  autoorder: "/videos/autoorder.mp4",
  toyshop: "/videos/toyshop.mp4",
  whisperme: "/videos/whisperme.mp4",
};

const projects = [
  {
    id: "tannus",
    icon: "",
    title: "Tannus MES",

    badges: [
      { text: "현장 경험 기반 개인 프로젝트", class: "badge-work" },
      { text: "데모 계정 제공", class: "badge-service" },
      { text: "AWS 배포", class: "badge-deploy" },
      { text: "Docker", class: "badge-docker" },
      { text: "GitHub", class: "badge-github" },
    ],

    type: "제조 / 물류 관리 시스템",
    level: 40,
    url: projectLinks.tannus,
    github: githubLinks.tannus,
    demo: demoLinks.tannus,
    excel: excelLinks.tannus,
    meta: ["개인 개발", "기획·DB·백엔드·화면·배포 담당", "AWS EC2 배포"],
    accounts: [
      { role: "관리자", id: "admin", pw: "1234" },
      { role: "포장팀", id: "pack", pw: "1234" },
      { role: "물류팀", id: "logi", pw: "1234" },
    ],
    summary:
        "Tannus MES\n" +
        "\n" +
        "실제 제조·물류 프로세스를 디지털화한 MES 시스템",
    stacks: ["Java", "Spring Boot", "JSP", "MyBatis", "MySQL", "Docker", "AWS"],
    features: [
      "관리자 / 물류팀 / 포장팀 권한 분리",
      "포장 지시 → QR 스캔 → 출고 완료 → 입고 확정 흐름",
      "재고 조회와 재고 히스토리 기록",
      "수정 요청 승인 / 반려 프로세스",
      "AWS EC2와 Docker 기반 배포",
    ],
    flow: ["관리자 지시", "포장팀 QR 스캔", "출고 완료", "물류팀 입고", "재고 반영"],

    codes: [
      {
        title: "QR 상태값 검증",
        code: `if (status.equals("READY_TO_SHIP")) {
    packingService.scanQr(qrId);
}`
      },
      {
        title: "부분 스캔 처리",
        code: `scanQty++;

if (scanQty >= orderQty) {
    packingMapper.updateStatus(
        packingId,
        "READY_TO_SHIP"
    );
}`
      },
      {
        title: "입고 확정 및 재고 반영",
        code: `@Transactional
public void confirmReceive(...) {

    stockMapper.increaseStock(
        itemId,
        receiveQty
    );

    stockHistoryMapper.insert(
        itemId,
        "IN",
        receiveQty
    );
}`
      },
      {
        title: "권한(Role) 검증",
        code: `if (!loginRole.equals("PACKING")) {
    throw new AccessDeniedException(
        "권한이 없습니다."
    );
}`
      },
    ],
    integrations: [
      {
        title: "QR 스캔 처리",
        desc: "html5-qrcode를 활용해 현장에서 QR을 스캔하고 상태값을 변경했습니다.",
        code: `Html5QrcodeScanner scanner =
new Html5QrcodeScanner("reader", config);

scanner.render(onScanSuccess);`
      },
      {
        title: "재고 히스토리 기록",
        desc: "입고/출고/조정 이력을 DB에 저장하여 재고 변동을 추적했습니다.",
        code: `stockHistoryMapper.insert(
    itemId,
    "IN",
    qty,
    loginUser
);`
      },
    ],

    troubleshooting: [
      {
        title: "역할별 화면 분리",
        problem: "관리자, 물류팀, 포장팀이 같은 화면을 보면 업무 흐름이 섞이는 문제가 있었습니다.",
        solve: "세션의 role 값을 기준으로 메뉴, 버튼, 접근 가능 화면을 분리했습니다.",
      },
      {
        title: "QR 상태값 관리",
        problem: "이미 처리된 QR을 다시 스캔할 때 상태값이 꼬일 수 있었습니다.",
        solve: "상태별 허용 동작을 분리하고, 이미 완료된 작업은 재처리되지 않도록 막았습니다.",
      },
      {
        title: "재고 이력 추적",
        problem: "현재 재고만 보면 입고/출고가 언제 왜 변경됐는지 추적하기 어려웠습니다.",
        solve: "IN / OUT / ADJUST 타입으로 재고 히스토리를 기록해 변경 이력을 확인할 수 있게 했습니다.",
      },
      {
        title: "무발주 입고 처리",
        problem: "현장에서는 발주 없이 입고되는 예외 상황이 있어 기존 포장/입고 흐름만으로 처리하기 어려웠습니다.",
        solve: "무발주 요청 상태를 따로 두고 승인 후 입고 확정 시 재고에 반영되도록 분리했습니다.",
      },
    ],
  },
  {
    id: "autoorder",
    icon: "",
    title: "AutoOrder",

    badges: [
      { text: "현장 경험 기반 개인 프로젝트", class: "badge-work" },
      { text: "데모 계정 제공", class: "badge-service" },
      { text: "AWS 배포", class: "badge-deploy" },
      { text: "Docker", class: "badge-docker" },
      { text: "GitHub", class: "badge-github" },
    ],
    type: "소매 자동발주 시스템",
    level: 32,
    url: projectLinks.autoorder,
    github: githubLinks.autoorder,
    demo: demoLinks.autoorder,
    meta: ["개인 개발", "기획·DB·백엔드·화면·배포 담당", "AWS EC2 배포"],
    accounts: [
      { role: "관리자", id: "admin", pw: "1234" },
      { role: "직원", id: "staff", pw: "1111" },
    ],
    summary:
        "AutoOrder\n" +
        "\n" +
        "재고를 분석하여 자동으로 발주를 생성하는 시스템",
    stacks: ["Java", "Spring Boot", "JSP", "MyBatis", "MySQL", "Scheduler", "Docker", "AWS"],
    features: [
      "현재고와 최소재고 비교",
      "업체별 발주 요일 관리",
      "추천 발주 수량 자동 계산",
      "판매 데이터 등록 및 현재고 반영",
      "발주 상태 WAITING / CONFIRMED 관리",
    ],
    flow: ["상품 재고 확인", "최소재고 비교", "발주 수량 계산", "발주 생성", "판매 데이터 반영"],

    codes: [
      {
        title: "박스 단위 발주 계산",
        code: `int shortage = minQty - currentQty;

int orderQty =
    (int) Math.ceil(
        (double) shortage / unit
    ) * unit;`
      },
      {
        title: "중복 발주 방지",
        code: `int count =
    orderMapper.countTodayOrder(productId);

if (count == 0) {

    orderMapper.insertAutoOrder(productId);

}`
      },
    ],
    integrations: [
      {
        title: "자동발주 스케줄러",
        desc: "매일 정해진 시간에 업체 발주일과 재고 조건을 확인해 자동발주를 생성했습니다.",
        code: `@Scheduled(cron = "0 0 9 * * *")
public void createAutoOrders() {
    autoOrderService.createTodayOrders();
}`
      },
      {
        title: "판매 데이터 등록",
        desc: "판매수량을 등록하면 현재고에 반영되고 판매 이력으로 남도록 구성했습니다.",
        code: `product.setCurrentQty(
    product.getCurrentQty() - saleQty
);`
      },
    ],
    troubleshooting: [
      {
        title: "중복 발주 방지",
        problem: "같은 상품이 같은 날짜에 여러 번 자동발주될 수 있었습니다.",
        solve: "상품 ID와 날짜 기준으로 중복 여부를 체크한 뒤 발주를 생성했습니다.",
      },
      {
        title: "발주 단위 계산",
        problem: "부족 수량 그대로 발주하면 박스 단위와 맞지 않았습니다.",
        solve: "부족 수량을 발주 단위로 올림 계산하여 실제 업무에 맞게 처리했습니다.",
      },
      {
        title: "스케줄러 시간 검증",
        problem: "자동발주가 실행되지 않을 때 서버 시간과 실행 로그 확인이 필요했습니다.",
        solve: "서버 시간, 스케줄러 로그, DB 반영 결과를 함께 확인했습니다.",
      },
      {
        title: "업체별 발주 요일 관리",
        problem: "모든 상품을 매일 발주하면 실제 업체별 납품 주기와 맞지 않았습니다.",
        solve: "업체별 발주 요일을 기준으로 오늘 발주 대상만 자동 생성되도록 처리했습니다.",
      },
    ],
  },
  {
    id: "toyshop",
    icon: "",
    title: "ToyShop",
    badges: [
      { text: "개인 프로젝트", class: "badge-personal" },
      { text: "데모 계정 제공", class: "badge-service" },
      { text: "AWS 배포", class: "badge-deploy" },
      { text: "Docker", class: "badge-docker" },
      { text: "GitHub", class: "badge-github" },
    ],

    type: "쇼핑몰 프로젝트",
    level: 25,
    url: projectLinks.toyshop,
    github: githubLinks.toyshop,
    demo: demoLinks.toyshop,
    meta: ["개인 개발", "기획·DB·백엔드·화면·배포 담당", "AWS EC2 배포"],
    accounts: [
      { role: "관리자", id: "admin", pw: "1234" },
      { role: "일반회원", id: "staff1", pw: "1234" },
      { role: "일반회원", id: "staff2", pw: "1234" },
      { role: "일반회원", id: "staff3", pw: "1234" },
    ],
    summary:
        "ToyShop\n" +
        "\n" +
        "회원부터 결제까지 구현한 쇼핑몰 프로젝트",
    stacks: ["Java", "Spring Boot", "Thymeleaf", "MyBatis", "MySQL", "Toss Payments", "Docker", "AWS"],
    features: [
      "회원가입 / 로그인 / 회원정보 수정",
      "상품 목록 / 상세 / 검색",
      "장바구니 / 바로구매 / 주문",
      "무통장 입금과 Toss Payments 테스트 결제",
      "관리자 상품 / 주문 / 회원 관리",
    ],
    flow: ["상품 선택", "장바구니", "주문서 작성", "결제 검증", "주문 완료"],

    codes: [
      {
        title: "결제 금액 검증",
        code: `if (orderAmount != paidAmount) {
    throw new IllegalStateException("결제 금액 불일치");
}`
      },
      {
        title: "주문 상태 관리",
        code: `order.setOrderStatus("ORDER_COMPLETE");
order.setPaymentStatus("PAID");`
      },
    ],
    integrations: [
      {
        title: "Toss Payments 결제",
        desc: "Toss Payments 테스트 결제를 연동하고 결제 금액 검증을 처리했습니다.",
        code: `confirmPayment(
    paymentKey,
    orderId,
    amount
);`
      },
      {
        title: "Naver SMTP 이메일",
        desc: "아이디/비밀번호 찾기 기능에서 이메일 인증 흐름을 구현했습니다.",
        code: `mailSender.send(message);`
      },
    ],
    troubleshooting: [
      {
        title: "결제 검증",
        problem: "결제 성공 후 실제 주문 금액과 결제 금액 검증이 필요했습니다.",
        solve: "paymentKey, orderId, amount 값을 기준으로 결제 승인 로직을 구성했습니다.",
      },
      {
        title: "재고 차감 타이밍",
        problem: "주문 생성 시점과 결제 완료 시점 중 언제 재고를 차감할지 기준이 필요했습니다.",
        solve: "결제 방식과 주문 상태를 분리하여 재고 반영 시점을 명확히 했습니다.",
      },
      {
        title: "이메일 인증 흐름",
        problem: "아이디/비밀번호 찾기에서 인증 메일 전송과 검증 흐름이 필요했습니다.",
        solve: "Naver SMTP를 연결하고 인증 코드 생성, 메일 발송, 사용자 검증 단계를 분리했습니다.",
      },
      {
        title: "주문 상태 되돌리기",
        problem: "관리자에서 결제확인, 상품준비, 배송중 상태를 잘못 변경했을 때 복구할 기준이 필요했습니다.",
        solve: "주문 상태와 배송 정보를 분리하고 단계별 되돌리기 로직을 만들어 이전 상태로 복구할 수 있게 했습니다.",
      },
      {
        title: "대표 이미지 예외 처리",
        problem:
            "상품 이미지가 없거나 잘못된 경로일 경우 깨진 이미지가 표시되어 화면 품질이 떨어지는 문제가 있었습니다.",
        solve:
            "기본 이미지(no-image.png)를 제공하고 이미지가 없으면 자동으로 대체 이미지를 출력하도록 처리했습니다.",
      },
      {
        title: "기본 배송지 관리",
        problem:
            "배송지를 여러 개 등록한 회원은 주문할 때마다 배송지를 다시 선택해야 하는 불편함이 있었습니다.",
        solve:
            "기본 배송지 기능을 추가하여 주문 페이지 진입 시 기본 배송지가 자동으로 선택되도록 구현했습니다.",
      },
    ],
  },
  {
    id: "whisperme",
    icon: "",
    title: "WhisperMe",
    badges: [
      { text: "개인 프로젝트", class: "badge-personal" },
      { text: "Memory + RAG", class: "badge-ai" },
      { text: "LLM 라우팅", class: "badge-service" },
      { text: "AWS 배포", class: "badge-deploy" },
      { text: "Docker", class: "badge-docker" },
      { text: "GitHub", class: "badge-github" },
    ],
    type: "Memory · RAG 기반 AI 상담/생산성 웹앱",
    level: 42,
    url: projectLinks.whisperme,
    github: githubLinks.whisperme,
    demo: demoLinks.whisperme,
    meta: ["개인 개발", "사용자/대화방 메모리", "RAG + Web Search + LLM", "Docker Compose"],
    accounts: [
      { role: "일반회원", id: "test", pw: "1234" },
      { role: "일반회원", id: "test1", pw: "1234" },
    ],
    summary:
        "WhisperMe\n" +
        "\n" +
        "사용자 장기 메모리·대화방 맥락·RAG·웹검색을 결합한 LLM 상담/생산성 서비스",
    stacks: [
      "React", "Vite", "Spring Boot", "MyBatis", "MySQL",
      "OpenAI API", "OpenAI Embedding", "Cosine Similarity", "Naver Search API",
      "Docker Compose", "Nginx", "AWS EC2"
    ],
    features: [
      "질문 의도 기반 LLM 라우팅: 상담 / 일반 대화 / 최신 정보 검색 경로 분리",
      "대화방 맥락 메모리와 사용자 공통 장기 메모리를 분리해 다음 답변에 활용",
      "TXT·MD·CSV 문서를 Chunk로 분할하고 OpenAI Embedding 생성 후 MySQL에 저장",
      "질문 Embedding과 문서 Chunk를 Cosine Similarity로 비교해 상위 관련 문서를 RAG Context로 전달",
      "RAG 사용 여부·참조 출처 수를 화면에 표시하고 문서 등록/목록/삭제 지원",
      "네이버 검색 + LLM, 이미지 분석, 파일 첨부, 음성 입력, 채팅 검색·즐겨찾기",
      "Todo·날씨·운세와 전체화면 채팅 UI, Docker Compose 기반 Frontend/Backend/MySQL 통합 실행",
    ],
    flow: [
      "사용자 질문",
      "사용자 공통 메모리 + 대화방 메모리 조회",
      "RAG Chunk 유사도 검색",
      "Question Router 의도 분류",
      "상담 LLM / 일반 LLM / Naver Search + LLM",
      "답변 및 RAG 출처 표시",
      "대화·메모리 갱신",
    ],
    codes: [
      {
        title: "LLM 라우팅 + Memory/RAG Context",
        code: `String roomMemory = conversationMemoryService.getSummary(chatHistory.getRoomId());
String userMemory = userMemoryService.getSummary(chatHistory.getMemberId());
List<RagSearchResult> ragResults = ragService.search(chatHistory.getMemberId(), question, 4);
String context = buildCombinedContext(userMemory, roomMemory, ragService.buildContext(ragResults));

if (questionRouterService.isCounselingIntent(question)) {
    answer = openAIService.askWithCounselingHistory(history, context);
} else if (questionRouterService.needSearch(question)) {
    answer = openAIService.askWithSearchResult(history, question, searchResult, context);
} else {
    answer = openAIService.askWithHistory(history, context);
}`
      },
      {
        title: "RAG Chunk Embedding · 유사도 검색",
        code: `List<Double> queryEmbedding = openAIService.createEmbedding(query);

double score = cosineSimilarity(queryEmbedding, vector);

return results.stream()
    .sorted(Comparator.comparingDouble(RagSearchResult::getScore).reversed())
    .filter(r -> r.getScore() >= 0.20)
    .limit(Math.max(1, topK))
    .toList();`
      },
      {
        title: "사용자/대화방 메모리 갱신",
        code: `String updatedRoomMemory = openAIService.summarizeConversationMemory(
    roomMemory, history, answer
);
conversationMemoryService.saveSummary(roomId, updatedRoomMemory);

String updatedUserMemory = openAIService.summarizeUserMemory(
    userMemory, history, answer
);
userMemoryService.saveSummary(memberId, updatedUserMemory);`
      },
    ],
    integrations: [
      {
        title: "OpenAI LLM API",
        desc: "일반 대화·상담형 응답·검색 결과 정리와 메모리 요약에 활용합니다.",
        code: `openAIService.askWithHistory(history, context);`
      },
      {
        title: "OpenAI Embedding",
        desc: "업로드 문서 Chunk와 사용자 질문을 벡터로 변환해 의미 기반 RAG 검색에 사용합니다.",
        code: `List<Double> embedding = openAIService.createEmbedding(chunk);`
      },
      {
        title: "Naver Search API",
        desc: "최신 정보가 필요한 질문만 별도 검색 경로로 보내 검색 결과와 LLM을 결합합니다.",
        code: `String searchResult = naverSearchService.searchSmart(question, keyword);`
      },
      {
        title: "날씨 / 위치 · Web Speech",
        desc: "현재 위치 기반 날씨와 한국어 음성 입력 등 생산성 보조 기능을 제공합니다.",
        code: `navigator.geolocation.getCurrentPosition(successCallback, errorCallback);`
      },
    ],
    troubleshooting: [
      {
        title: "프론트·백엔드 API 연결",
        problem: "Vite 개발 서버와 Docker/Nginx 실행 환경에서 API 경로가 달라 로그인·회원가입 요청이 백엔드에 전달되지 않는 문제가 있었습니다.",
        solve: "개발 환경에서는 Vite Proxy, Docker 환경에서는 Nginx /api Reverse Proxy를 구성해 실행 방식별 요청 경로를 통일했습니다.",
      },
      {
        title: "대화가 길어질수록 Context 증가",
        problem: "대화 전체를 계속 전달하면 토큰 사용량과 불필요한 과거 정보가 증가할 수 있었습니다.",
        solve: "현재 대화방 요약 메모리와 사용자 공통 메모리를 별도로 저장하고 핵심 맥락만 다음 요청 Context에 전달하도록 분리했습니다.",
      },
      {
        title: "새 채팅방에서 사용자 조건 소실",
        problem: "대화방 메모리만 사용할 때 새 채팅방에서는 장기 선호나 목표를 기억하지 못했습니다.",
        solve: "member_id 기준 user_memory를 추가해 새 채팅방에서도 공통 사용자 맥락을 불러오도록 확장했습니다.",
      },
      {
        title: "문서 기반 답변 근거 부족",
        problem: "일반 LLM만으로는 사용자가 제공한 면접 자료나 내부 문서를 직접 근거로 답하기 어려웠습니다.",
        solve: "문서를 900자 기준 Chunk와 140자 Overlap으로 나누고 Embedding을 저장한 뒤 Cosine Similarity 상위 결과를 LLM Context로 전달하는 RAG를 구현했습니다.",
      },
    ],
  },
  {
    id: "aboutj", icon: "", title: "About J",
    badges: [{ text: "개인 프로젝트", class: "badge-work" }, { text: "콘텐츠 웹서비스", class: "badge-service" }],
    type: "영상 콘텐츠 탐색 · AI Shorts 제작 서비스", level: 20,
    url: "http://about.jkyungsoo.com/", github: null, demo: null,
    meta: ["개인 개발", "콘텐츠 제작·검색·시청", "AWS 배포 경험"],
    accounts: [{ role: "관리자", id: "admin", pw: "aboutj1234!" }, { role: "일반", id: "zzangmait@naver.com", pw: "aboutj1234!" }],
    summary: "About J\n\n영상 콘텐츠 탐색·시청과 AI 기반 Shorts 제작·YouTube 업로드 흐름을 연결한 웹서비스",
    stacks: ["Java", "Spring Boot", "Thymeleaf", "MySQL", "OpenAI API", "Gemini API", "Pexels API", "YouTube Data API", "AWS"],
    features: ["영상 콘텐츠 검색·시청 화면", "관리자·일반 사용자 인증", "AI 기반 콘텐츠 생성", "이미지 검색·소재 수집", "Shorts 결과물 제작", "YouTube OAuth 연동 업로드", "개발·운영 환경설정 분리"],
    flow: ["로그인·콘텐츠 탐색", "주제 선택", "AI 콘텐츠 생성", "이미지 소재 수집", "Shorts 제작", "YouTube 업로드·이력"],
    codes: [],
    integrations: [
      { title: "OpenAI · Gemini", desc: "주제 기반 AI 콘텐츠 생성 단계에 사용하는 외부 서비스입니다.", code: "주제 입력 → 생성 요청 → 생성 결과 확인\n※ 기능 흐름 개요 · 원본 코드 아님" },
      { title: "Pexels 이미지 API", desc: "Shorts 제작에 필요한 이미지 소재 검색·수집에 사용합니다.", code: "검색어 → 이미지 API → 소재 선택\n※ 기능 흐름 개요 · 원본 코드 아님" },
      { title: "YouTube Data API · OAuth", desc: "인증과 Shorts 업로드 및 업로드 결과 확인 흐름을 분리합니다.", code: "OAuth 인증 → 영상 업로드 → 결과·이력 확인\n※ 기능 흐름 개요 · 원본 코드 아님" },
    ],
    troubleshooting: [
      { title: "로컬·운영 설정 분리", problem: "로컬 프로필이 지정되지 않아 환경변수 오류가 발생했습니다.", solve: "application-local과 운영 환경변수를 분리해 설정을 정리했습니다." },
      { title: "외부 API 환경변수", problem: "DB_URL이나 API Key에 placeholder가 남으면 외부 연동이 실패했습니다.", solve: "개발·운영 설정의 변수와 API 키 입력 지점을 분리해 점검했습니다." },
      { title: "YouTube OAuth 설정", problem: "로컬과 서버에서 인증 토큰·환경설정 경로가 달라질 수 있습니다.", solve: "OAuth 토큰과 운영 환경 설정을 분리해 관리하도록 정리했습니다." },
    ],
  },
];

const otherProjects = [
  {
    category: "APP",
    title: "JKS MAKER",
    description: "AI 음악 생성·편집과 보컬 분리를 지원하는 제작 앱",
    stacks: ["Flutter", "FastAPI", "Python", "AI Audio"],
    dataDesign: "Project · GenerationHistory · AudioFile",
  },
  {
    category: "APP",
    title: "스다스 작업관리",
    description: "물량에 따른 공정 인원·시간·급여를 계산하는 현장 작업관리 앱",
    stacks: ["Flutter", "SQLite", "Timeline"],
    dataDesign: "Worker · Process · Assignment · WorkLog",
  },
  {
    category: "APP",
    title: "JoWalking",
    description: "GPS와 걸음 센서로 일상·운동 경로와 기간별 통계를 기록하는 앱",
    stacks: ["Flutter", "GPS", "Mapbox", "Supabase"],
    dataDesign: "WalkingSession · RoutePoint · DailyStat",
  },
  {
    category: "APP",
    title: "TranSu",
    description: "현재 위치 기반 주변 버스정류장 검색과 API 장애 대응을 적용한 앱",
    stacks: ["Flutter", "공공데이터 API", "GPS", "Cache"],
    dataDesign: "StopCache · FavoriteStop · SearchHistory",
  },
  {
    category: "APP",
    title: "J-Battery",
    description: "캐릭터·배경·배터리 상태를 조합해 홈과 잠금화면을 꾸미는 앱",
    stacks: ["Flutter", "Android", "Kotlin", "Local Storage"],
    dataDesign: "HomeConfig · LockConfig · AssetPreference",
  },
  {
    category: "APP",
    title: "World Radio",
    description: "전 세계 인터넷 라디오를 국가·장르별로 찾고 실시간 재생하는 앱",
    stacks: ["Flutter", "Radio API", "Audio", "Local Storage"],
    dataDesign: "Station · Favorite · ListenHistory · Cache",
  },
];


// 모바일 앱의 데이터 모델은 포트폴리오 설명용 논리 설계입니다. 실제 DB 테이블 구현과 동일하다고 단정하지 않습니다.
const appCaseStudies = {
  "JKS MAKER": {
    goal: "음악 제작에 필요한 생성·편집·파일 관리를 모바일 화면에서 이어 사용하는 것을 목표로 구성했습니다.",
    requirements: ["음원 생성·편집 작업 분리", "보컬 분리 등 오디오 작업", "작업 결과 파일 관리", "작업 단계별 진행 결과 확인"],
    flow: ["프로젝트 선택", "음원 생성·불러오기", "편집·오디오 처리", "결과 확인", "파일 저장"],
    entities: [["Project", "id, name, created_at"], ["GenerationHistory", "id, project_id, task_type, status"], ["AudioFile", "id, project_id, file_path, file_type"]],
    layout: { Project: [1, 0], GenerationHistory: [0, 1], AudioFile: [2, 1] },
    relations: [["Project", "1 : N", "GenerationHistory", "프로젝트별 음원 작업 기록"], ["Project", "1 : N", "AudioFile", "프로젝트에 속한 결과 음원"]],
    diagramGroups: [{ title: "프로젝트·파일 흐름", entities: ["Project", "GenerationHistory", "AudioFile"], relationIndexes: [0, 1], layout: { Project: [1, 0], GenerationHistory: [0, 1], AudioFile: [2, 1] }, labelOffsets: { 0: [-72, 0], 1: [72, 0] } }],
    architecture: ["Flutter UI", "오디오 작업 요청", "FastAPI · Python", "AI Audio 처리", "결과 파일"],
    verification: "음원 처리 요청·결과 표시·파일 저장 등 사용자 흐름을 중심으로 점검하는 프로젝트입니다.",
    challenges: [["작업의 단계 구분", "음원 생성, 편집, 결과 저장은 서로 다른 단계입니다.", "작업 단계와 결과 파일을 분리하여 흐름을 설명했습니다."], ["파일 추적", "여러 결과물이 발생하면 출처를 파악하기 어렵습니다.", "프로젝트-작업기록-파일의 논리 관계를 정리했습니다."]],
  },
  "스다스 작업관리": {
    goal: "택배 물량에 맞춰 공정별 작업 인원과 시간을 배정하고, 작업자별 일정과 예상 임금을 한 화면에서 확인하도록 기획했습니다.",
    requirements: ["공정별 작업량·기준 시간 입력", "기준에 따른 인원 비례 계산", "작업자별 시작 시간·점심·휴식 배치", "중복 배정 방지 및 분할 작업", "기본 시급과 잔업 1.5배 계산", "관리자 승인과 진행 상태 확인"],
    flow: ["물량·공정 등록", "작업자 선택", "인원·시간 배정", "타임라인 확인", "승인·완료"],
    entities: [["Worker", "id, name, hourly_wage"], ["Process", "id, name, standard_qty, standard_time"], ["Assignment", "id, worker_id, process_id, start_at, end_at"], ["WorkLog", "id, assignment_id, status, approved_at"]],
    layout: { Worker: [0, 0], Process: [2, 0], Assignment: [1, 1], WorkLog: [1, 2] },
    relations: [["Worker", "1 : N", "Assignment", "작업자별 여러 공정 배정"], ["Process", "1 : N", "Assignment", "공정에 여러 작업자 배치"], ["Assignment", "1 : N", "WorkLog", "배정별 상태 이력 설계"]],
    diagramGroups: [{ title: "작업 배정·상태 흐름", entities: ["Worker", "Process", "Assignment", "WorkLog"], relationIndexes: [0, 1, 2], layout: { Worker: [0, 0], Process: [2, 0], Assignment: [1, 1], WorkLog: [1, 2] }, labelOffsets: { 0: [-74, 0], 1: [74, 0], 2: [68, 0] } }],
    architecture: ["Flutter 작업 화면", "공정·작업자 설정", "인원·시간 산식", "타임라인", "저장·승인"],
    verification: "작업 겹침, 점심 이동, 인원 수 변경에 따른 기준 시간, 분할 배정과 잔업 계산을 중심으로 검증했습니다.",
    challenges: [["작업자 일정 충돌", "한 사람이 같은 시간대에 두 공정에 중복 배정될 수 있습니다.", "배정 구간의 시작·종료 시간을 비교하여 겹치는 배정을 제한하도록 구성했습니다."], ["점심시간 고정 문제", "현장 일정에 따라 점심시간이 이동합니다.", "점심·휴식을 일반 작업 사이에 배치할 수 있도록 일정을 구성했습니다."], ["기준과 실적 비교", "물량과 인원 수가 달라지면 공정 기준 시간이 달라집니다.", "100건당 기준과 배정 인원을 활용해 시간 비례 산식을 적용했습니다."]],
  },
  "JoWalking": {
    goal: "GPS 경로와 걸음 수를 함께 기록하고, 화면이 꺼져도 이동 흐름을 최대한 유지하도록 설계했습니다.",
    requirements: ["위치 좌표·걸음 수 수집", "화면 꺼짐 중 위치 기록 유지", "수신 누락 구간 경로 연결", "운동 기록의 일자별 조회", "저장된 이동 경로 시각화"],
    flow: ["기록 시작", "GPS·걸음 센서 수집", "좌표 누적", "경로 연결", "기록 종료·조회"],
    entities: [["WalkingSession", "id, started_at, ended_at, steps"], ["RoutePoint", "id, session_id, latitude, longitude, recorded_at"], ["DailyStat", "id, day, total_steps, distance"]],
    layout: { DailyStat: [0, 0], WalkingSession: [1, 0], RoutePoint: [2, 0] },
    relations: [["WalkingSession", "1 : N", "RoutePoint", "세션별 시간순 GPS 좌표"], ["DailyStat", "1 : N", "WalkingSession", "일별 세션 집계용 논리 설계"]],
    diagramGroups: [{
      title: "이동 기록·집계 흐름",
      entities: ["DailyStat", "WalkingSession", "RoutePoint"],
      relationIndexes: [0, 1],
      // JoWalking은 3개 테이블을 삼각형으로 넓게 배치해 관계 라벨이 노드에 가려지지 않게 함
      layout: { DailyStat: [0, 0], WalkingSession: [1, 1], RoutePoint: [2, 0] },
      labelOffsets: { 0: [0, -8], 1: [0, -8] },
      safeRelationLabelClamp: true,
      spaciousLayout: true,
    }],
    architecture: ["Flutter 화면", "위치·걸음 센서", "백그라운드 수집", "좌표 저장", "지도 경로 표시"],
    verification: "화면 꺼짐·위치 수신 누락·재개 상황에서 기록이 이어지는지와 경로 표시를 점검했습니다.",
    challenges: [["백그라운드 위치 누락", "화면을 끄면 기기 정책에 따라 GPS 수신이 제한될 수 있습니다.", "백그라운드 위치 수집을 유지하고 누락된 구간은 마지막·다음 유효 좌표를 선으로 연결하도록 개선했습니다."], ["경로 화면 겹침", "하단 시스템 영역과 경로 저장 화면이 겹칠 수 있습니다.", "모바일 안전 영역을 고려해 표시 영역을 조정했습니다."]],
  },
  "TranSu": {
    goal: "사용자 좌표를 기준으로 가까운 버스정류장을 조회하고 공공데이터 응답 장애를 구분할 수 있도록 만든 모바일 앱입니다.",
    requirements: ["현재 위치 사용", "주변 정류장 API 요청", "정류장 목록과 위치 표시", "인증키·좌표·응답 상태 점검", "API 실패 시 오류 상태 안내"],
    flow: ["위치 권한 확인", "현재 좌표 확보", "공공 API 호출", "응답 해석", "정류장 결과 표시"],
    entities: [["StopCache", "stop_id, name, latitude, longitude, cached_at"], ["FavoriteStop", "id, stop_id, saved_at"], ["SearchHistory", "id, searched_at, keyword"]],
    layout: { StopCache: [1, 0], FavoriteStop: [0, 1], SearchHistory: [2, 1] },
    relations: [["StopCache", "1 : N", "FavoriteStop", "저장된 정류장 참조에 관한 논리 설계"], ["StopCache", "1 : N", "SearchHistory", "정류장 조회 이력 연결 설계"]],
    diagramGroups: [{ title: "정류장 캐시·조회 흐름", entities: ["StopCache", "FavoriteStop", "SearchHistory"], relationIndexes: [0, 1], layout: { StopCache: [1, 0], FavoriteStop: [0, 1], SearchHistory: [2, 1] }, labelOffsets: { 0: [-72, 0], 1: [72, 0] } }],
    architecture: ["Flutter UI", "GPS 좌표", "국토교통부 버스정류장 API", "응답 파싱", "목록·지도"],
    verification: "위도·경도 전달값, 공공데이터 인증키 유형, 실제 API 응답과 앱 처리 문제를 구분해 점검했습니다.",
    challenges: [["외부 API 장애", "근접 정류장 호출이 실패하면 앱 오류와 제공 기관 응답 실패를 구분하기 어렵습니다.", "동일 좌표로 API 주소를 직접 호출해 외부 응답 여부와 클라이언트 동작을 분리해 확인했습니다."], ["검색 결과 누락", "좌표나 응답 형식이 올바르지 않으면 인근 정류장 목록을 만들 수 없습니다.", "입력 좌표·요청 파라미터·응답 상태를 단계별로 확인하도록 정리했습니다."]],
  },
  "J-Battery": {
    goal: "배터리 캐릭터와 홈·잠금 배경을 선택하고 화면별로 독립적으로 꾸밀 수 있게 만든 Android 앱입니다.",
    requirements: ["홈·잠금 화면 설정 분리", "캐릭터·배경 이미지 선택", "이미지 크기·위치 개별 조절", "미리보기와 실제 적용 비율 일치", "중복·손상된 리소스 정리", "상단 배터리 아이콘 표시 옵션"],
    flow: ["홈·잠금 선택", "배경 선택", "캐릭터 배치", "크기·위치 미리보기", "적용·저장"],
    entities: [["HomeConfig", "id, background_id, scale_x, scale_y"], ["LockConfig", "id, background_id, character_id, scale"], ["AssetPreference", "id, asset_id, enabled, order_no"]],
    layout: { HomeConfig: [0, 0], AssetPreference: [1, 1], LockConfig: [2, 0] },
    relations: [["HomeConfig", "1 : N", "AssetPreference", "홈 화면 선택 이미지 참조 설계"], ["LockConfig", "1 : N", "AssetPreference", "잠금 화면 선택 이미지 참조 설계"]],
    diagramGroups: [{ title: "홈·잠금 설정 흐름", entities: ["HomeConfig", "AssetPreference", "LockConfig"], relationIndexes: [0, 1], layout: { HomeConfig: [0, 0], AssetPreference: [1, 1], LockConfig: [2, 0] }, labelOffsets: { 0: [-72, 0], 1: [72, 0] } }],
    architecture: ["Flutter UI", "이미지 미리보기", "Android 홈·잠금 적용", "설정 저장", "사용자 화면"],
    verification: "캐릭터 중복 표시, 배경 잘림, 이미지 비율 차이, 잠금·홈 설정 간 간섭을 반복 확인했습니다.",
    challenges: [["미리보기와 실제 화면 비율 불일치", "선택 썸네일과 실제 홈 화면의 크롭 비율이 달라 이미지가 잘렸습니다.", "적용 대상 화면을 기준으로 미리보기를 구성하고 가로·세로 배율을 독립적으로 조정하도록 개선했습니다."], ["홈·잠금 설정 연동", "한쪽 화면을 변경하면 다른 쪽에도 설정이 반영되는 문제가 있었습니다.", "화면별 설정 상태를 분리하는 방향으로 개선했습니다."], ["이미지 리소스 중복", "깨지거나 중복된 캐릭터·배경이 선택 화면을 복잡하게 했습니다.", "기본 이미지와 사용자 다운로드 이미지 중심으로 리소스를 정리했습니다."]],
  },
  "World Radio": {
    goal: "국가·장르를 기준으로 인터넷 라디오 방송을 탐색하고 선택한 방송을 스트리밍 재생하는 앱입니다.",
    requirements: ["방송국 검색·분류", "방송국 선택·재생", "스트리밍 오류 처리", "즐겨찾기 관리", "최근 청취 목록 설계"],
    flow: ["국가·장르 선택", "방송국 검색", "스트림 선택", "재생", "즐겨찾기"],
    entities: [["Station", "id, name, country, genre, stream_url"], ["Favorite", "id, station_id, saved_at"], ["ListenHistory", "id, station_id, listened_at"], ["Cache", "id, station_id, updated_at"]],
    layout: { Station: [1, 0], Favorite: [0, 1], ListenHistory: [1, 1], Cache: [2, 1] },
    relations: [["Station", "1 : N", "Favorite", "방송국별 즐겨찾기 참조"], ["Station", "1 : N", "ListenHistory", "방송국별 청취 기록"], ["Station", "1 : N", "Cache", "방송 정보 캐시 설계"]],
    diagramGroups: [{ title: "방송국·청취 데이터 흐름", entities: ["Station", "Favorite", "ListenHistory", "Cache"], relationIndexes: [0, 1, 2], layout: { Station: [1, 0], Favorite: [0, 1], ListenHistory: [1, 1], Cache: [2, 1] }, labelOffsets: { 0: [-76, 0], 1: [0, 50], 2: [76, 0] } }],
    architecture: ["Flutter UI", "방송국 목록 API", "검색·필터", "오디오 플레이어", "로컬 설정"],
    verification: "방송국 선택·재생·중단과 연결되지 않는 스트림의 예외 흐름을 중심으로 설명합니다.",
    challenges: [["스트림 주소의 변동", "인터넷 방송국이 스트림 주소를 변경하거나 연결을 종료할 수 있습니다.", "방송 정보와 플레이어 상태를 분리하고 연결 실패를 안내하는 방향으로 설계했습니다."], ["탐색 편의", "국가와 방송국 수가 많으면 원하는 방송을 찾기 어렵습니다.", "국가·장르·검색 조건을 중심으로 탐색 흐름을 구성했습니다."]],
  },
};

function AppCaseStudy({ project }) {
  const study = appCaseStudies[project.title];
  return <section className="app-case-study project-detail" aria-label={`${project.title} 상세 설명`}>
    <div className="detail-head"><div><p className="section-label">APP PROJECT DETAIL</p><h2>{project.title}</h2><p>{project.description}</p><div className="project-meta"><span>개인 프로젝트</span><span>모바일 앱</span><span>논리 데이터 설계 포함</span></div></div></div>
    <div className="detail-grid">
      <article><h3>기술 스택</h3><div className="chip-wrap">{project.stacks.map(x => <span key={x}>{x}</span>)}</div></article>
      <article><h3>주요 기능 · 요구사항</h3><ul>{study.requirements.map(x => <li key={x}>{x}</li>)}</ul></article>
      <article className="wide"><h3>서비스 흐름도</h3><div className="flow-line">{study.flow.map((x, i) => <div className="flow-item" key={x}><span>{x}</span>{i < study.flow.length-1 && <b>→</b>}</div>)}</div></article>
      <article className="wide feedback-block"><h3>실제 구현 화면</h3><p className="feedback-block-note">대표 사용자 흐름을 확인할 수 있는 실제 앱 화면을 넣을 자리입니다.</p><ScreenshotSlots items={appFeedbackEnhancements[project.title].screenshots} projectId={project.title} /></article>
      <article className="wide feedback-block"><h3>기술 선택 이유</h3><TechReasonList items={appFeedbackEnhancements[project.title].techReasons} /><p className="implementation-boundary">※ Flutter를 공통으로 사용했지만 GPS·오디오·배경 적용처럼 플랫폼 기능이 필요한 부분은 각 앱의 목적에 맞춰 API/Android 연동을 분리했습니다.</p></article>
      <article className="wide design-stage-section"><h3>프로젝트 설계 단계</h3><div className="design-steps"><section><span>01</span><h4>문제 정의</h4><p>{study.goal}</p></section><section><span>02</span><h4>요구사항 정리</h4><ul>{study.requirements.map(x => <li key={x}>{x}</li>)}</ul></section><section><span>03</span><h4>ERD · 데이터 설계</h4><p className="erd-version-note">포트폴리오 논리 모델 · 실제 저장소 구현 및 물리 테이블명과 다를 수 있습니다.</p><LogicalErdDiagram design={study} /><details className="erd-details"><summary>관계별 설계 의도 자세히 보기 ({study.relations.length}건)</summary><div className="erd-relation-list">{study.relations.map(([from, ratio, to, desc], i) => <div className="erd-relation" key={`${from}-${to}`} style={{"--relation-color": relationColors[i % relationColors.length]}}><strong><em className="erd-relation-code">R{i+1}</em>{from}</strong><span>{ratio}</span><strong>{to}</strong><p>{desc}</p></div>)}</div></details></section><section><span>04</span><h4>전체 시스템 구조</h4><div className="architecture-diagram">{study.architecture.map((layer,i) => <div className="architecture-node" key={layer}><strong>{layer}</strong>{i < study.architecture.length-1 && <span>→</span>}</div>)}</div></section><section><span>05</span><h4>구현 및 검증</h4><p>{study.verification}</p></section></div></article>
      <article className="wide"><h3>트러블슈팅 · 설계 포인트</h3><div className="trouble-grid">{study.challenges.map(([title,problem,solve]) => <div className="trouble-card" key={title}><strong>{title}</strong><p><b>문제</b>{problem}</p><p><b>대응·설계</b>{solve}</p></div>)}</div></article>
      <article className="wide feedback-block future-plan-block"><h3>향후 개선 계획</h3><p className="feedback-block-note">현재 구현과 구분되는 다음 단계의 기술 과제입니다.</p><FuturePlanList items={appFeedbackEnhancements[project.title].future} /></article>
    </div>
  </section>;
}



// v5.3 피드백 반영: 실제 구현 범위와 향후 개선안을 분리해서 보여줍니다.
// CQRS, Observer 등 실제 적용 여부가 확인되지 않은 패턴은 의도적으로 표기하지 않습니다.
const webFeedbackEnhancements = {
  tannus: {
    techReasons: [
      ["Spring Boot", "Java 기반으로 업무 로직을 계층화하고 트랜잭션이 필요한 입고·재고 처리 흐름을 구성하기 위해 사용했습니다."],
      ["MyBatis · MySQL", "재고·이력·상태 변경 SQL을 직접 확인하고 제어할 수 있도록 명시적인 SQL 매핑 방식을 사용했습니다."],
      ["JSP", "관리자·포장팀·물류팀처럼 역할별 업무 화면을 서버 렌더링 방식으로 빠르게 구성했습니다."],
      ["Docker · AWS EC2", "개발 환경과 배포 환경의 차이를 줄이고 실제 외부 접속 가능한 형태로 서비스를 검증하기 위해 사용했습니다."],
    ],
    architecture: [
      ["USER", "관리자 · 포장팀 · 물류팀", "역할별 메뉴와 허용 동작 분리"],
      ["PRESENTATION", "JSP · QR Scanner UI", "포장지시·QR 스캔·입고·재고 화면"],
      ["BACKEND", "Controller → Service → Mapper", "상태 검증·권한 검증·입고/출고 업무 로직"],
      ["DATA", "MyBatis → MySQL", "지시·포장·출고·입고·재고·이력 저장"],
      ["INFRA", "Docker → AWS EC2", "컨테이너 기반 배포 및 외부 접속"],
    ],
    screenshots: ["포장 지시 목록", "포장 QR 스캔", "QR 스캔 후 입고 확인", "재고 조회"],
    future: [
      "QR 처리와 재고 변경을 더 강한 트랜잭션 경계로 묶어 동시 처리 상황의 정합성을 검증할 계획입니다.",
      "작업량·처리시간을 집계해 관리자 대시보드에서 공정 병목을 확인할 수 있도록 지표를 확장할 계획입니다.",
      "권한 검증을 화면 제어뿐 아니라 서버 요청 단위에서도 일관되게 관리하는 구조를 보강할 계획입니다.",
    ],
  },
  autoorder: {
    techReasons: [
      ["Spring Boot", "재고 비교·발주 생성·판매 데이터 반영을 서비스 계층으로 분리하고 스케줄러를 함께 운영하기 위해 사용했습니다."],
      ["Scheduler", "정해진 시각에 재고와 발주 조건을 확인하는 반복 업무를 자동화하기 위해 사용했습니다."],
      ["MyBatis · MySQL", "업체별 발주요일, 재고, 발주 상세와 이력을 SQL로 명확하게 관리하기 위해 사용했습니다."],
      ["Docker · AWS EC2", "자동화 로직이 로컬이 아닌 실제 서버 환경에서도 동작하는지 확인하기 위해 배포했습니다."],
    ],
    architecture: [
      ["USER", "관리자 · 직원", "상품·업체·재고·발주 상태 확인"],
      ["PRESENTATION", "JSP", "상품·업체·발주·판매 데이터 관리 화면"],
      ["BACKEND", "Controller → Service", "재고 비교·발주수량 계산·중복발주 검증"],
      ["AUTOMATION", "Spring Scheduler", "정해진 시각에 발주 대상 자동 탐색"],
      ["DATA", "MyBatis → MySQL", "상품·업체·발주·재고이력 저장"],
      ["INFRA", "Docker → AWS EC2", "서버 배포 및 스케줄러 실행 확인"],
    ],
    screenshots: ["상품 목록", "업체 정보 수정", "발주서 목록", "판매 데이터 등록"],
    future: [
      "매 실행마다 전체 DB를 비교하는 방식은 데이터가 커질수록 비용이 증가할 수 있어, 발주 기준 데이터를 캐시하고 변경 시 갱신하는 구조를 검토합니다.",
      "발주 생성 작업을 배치 단위로 분리하고 실패 건 재처리·실행 이력 저장을 추가해 운영 추적성을 높일 계획입니다.",
      "동시 실행 시 중복 발주가 발생하지 않도록 DB 제약과 트랜잭션/락 전략을 추가 검증할 계획입니다.",
    ],
  },
  toyshop: {
    techReasons: [
      ["Spring Boot", "회원·상품·주문·결제처럼 도메인이 나뉘는 웹서비스를 계층 구조로 관리하기 위해 사용했습니다."],
      ["Thymeleaf", "Spring MVC와 연결해 상품·주문·관리자 화면을 서버 렌더링 방식으로 구성했습니다."],
      ["MyBatis · MySQL", "주문·상품·회원의 관계와 상태 변경 SQL을 직접 확인하며 구현하기 위해 사용했습니다."],
      ["Toss Payments", "실제 커머스 흐름에 가까운 결제 승인·금액 검증 과정을 경험하기 위해 테스트 결제를 연동했습니다."],
    ],
    architecture: [
      ["USER", "일반회원 · 관리자", "상품 탐색/주문과 운영 기능 분리"],
      ["PRESENTATION", "Thymeleaf", "상품·장바구니·주문·관리자 화면"],
      ["BACKEND", "Controller → Service → Mapper", "회원·주문·결제·배송 상태 로직"],
      ["EXTERNAL", "Toss Payments · Naver SMTP", "결제 승인 및 이메일 인증"],
      ["DATA", "MyBatis → MySQL", "회원·상품·주문·결제 관련 데이터"],
      ["INFRA", "Docker → AWS EC2", "외부 접속 가능한 서비스 배포"],
    ],
    screenshots: ["메인 상품 목록", "장바구니", "주문 · 결제", "관리자 주문 상세"],
    future: [
      "주문/결제/재고 차감의 트랜잭션 경계를 더 명확히 하고 결제 실패·취소 시 보상 흐름을 보강할 계획입니다.",
      "상품 목록 조회에 페이징·검색 인덱스·캐시 전략을 적용해 데이터 증가 시 조회 성능을 개선할 계획입니다.",
      "관리자 주문 상태 변경 이력을 별도 이벤트/이력 테이블로 남겨 운영 추적성을 높일 계획입니다.",
    ],
  },
  whisperme: {
    techReasons: [
      ["React · Vite", "채팅·메모리 상태·RAG 문서 관리·Todo처럼 상태 변화가 많은 화면을 컴포넌트 단위로 구성하기 위해 사용했습니다."],
      ["Spring Boot", "회원·채팅·메모리·RAG·외부 AI/검색 호출을 서비스 계층에서 분리하고 질문 라우팅 흐름을 관리하기 위해 사용했습니다."],
      ["MyBatis · MySQL", "회원·대화·Todo뿐 아니라 conversation_memory, user_memory, rag_document, rag_chunk 데이터를 관계형 구조로 직접 관리하기 위해 사용했습니다."],
      ["OpenAI API", "일반 대화·상담형 답변·검색 결과 정리와 메모리 요약을 생성하기 위해 사용했습니다."],
      ["OpenAI Embedding", "문서 Chunk와 질문을 의미 벡터로 변환해 RAG 검색 입력으로 사용했습니다."],
      ["Cosine Similarity", "질문 벡터와 최대 500개 문서 Chunk 벡터의 의미 유사도를 Java에서 계산해 상위 관련 Chunk를 선택했습니다."],
      ["Naver Search API", "최신성이 필요한 질문만 웹검색 경로로 분기해 검색 결과를 LLM Context와 결합했습니다."],
      ["Docker Compose · Nginx", "MySQL·Spring Boot·React/Nginx를 한 번에 실행하고 /api Reverse Proxy로 프론트와 백엔드를 연결했습니다."],
    ],
    architecture: [
      ["CLIENT", "React · Vite", "채팅·메모리·RAG·Todo·전체화면 UI"],
      ["GATEWAY", "Nginx", "정적 파일 제공 · /api Reverse Proxy"],
      ["BACKEND", "Spring Boot REST API", "회원·채팅·Todo·RAG 문서 관리"],
      ["ROUTER", "QuestionRouterService", "상담 / 최신 검색 / 일반 질문 분기"],
      ["CONTEXT", "User Memory + Room Memory + RAG", "장기 사용자 정보·현재 대화 맥락·관련 문서 결합"],
      ["AI/SEARCH", "OpenAI LLM · Embedding · Naver Search", "답변 생성·벡터화·최신 정보 검색"],
      ["DATA", "MyBatis · MySQL", "회원·메시지·Todo·Memory·RAG Document/Chunk"],
      ["INFRA", "Docker Compose · AWS EC2", "통합 실행 및 외부 서비스 배포"],
    ],
    screenshots: [
      "RAG 문서 관리",
      "RAG 문서 기반 답변 생성",
      "위치 기반 정보 · 일정 관리",
      "여러 채팅방 생성 · 검색",
    ],
    future: [
      "현재 MySQL JSON/Text 기반 Embedding 저장과 Java Cosine Similarity 검색을 pgvector·Qdrant 같은 Vector DB로 전환해 데이터 증가 시 검색 성능을 비교할 계획입니다.",
      "RAG 출처 개수뿐 아니라 실제 문서명·관련 Chunk·유사도 점수를 사용자가 펼쳐볼 수 있도록 출처 상세 UI를 보강할 계획입니다.",
      "Chunk 크기·Overlap·Top-K·유사도 임계값을 테스트 데이터로 평가해 검색 정확도를 조정할 계획입니다.",
      "사용자 공통 메모리를 항목 단위로 조회·수정·삭제할 수 있는 관리 기능과 최대 길이/자동 정리 정책을 추가할 계획입니다.",
      "LLM·Embedding·검색 호출의 응답시간, Token 사용량, 실패율을 기록해 품질과 비용을 함께 관찰할 계획입니다.",
    ],
  },
  aboutj: {
    techReasons: [
      ["Spring Boot · Thymeleaf", "콘텐츠 생성 기능과 관리자/일반 사용자 화면을 하나의 서버 애플리케이션에서 연결하기 위해 사용했습니다."],
      ["OpenAI · Gemini", "주제 기반 텍스트/콘텐츠 생성 단계를 비교·활용할 수 있도록 외부 생성형 AI API를 연동했습니다."],
      ["Pexels API", "Shorts 제작에 필요한 이미지 소재를 검색·수집하기 위해 사용했습니다."],
      ["YouTube Data API · OAuth", "생성된 결과물을 인증된 사용자 계정으로 업로드하는 흐름을 구현하기 위해 사용했습니다."],
    ],
    architecture: [
      ["USER", "일반회원 · 관리자", "콘텐츠 탐색/생성과 운영 기능 분리"],
      ["PRESENTATION", "Thymeleaf", "검색·생성·결과·관리 화면"],
      ["BACKEND", "Spring Boot", "콘텐츠 생성 요청과 외부 API 흐름 조정"],
      ["EXTERNAL", "OpenAI · Gemini · Pexels · YouTube", "생성·이미지 검색·업로드"],
      ["CONFIG", "Local / Production Profile", "API Key·OAuth·DB 환경 분리"],
      ["INFRA", "AWS EC2", "운영 환경 배포"],
    ],
    screenshots: ["콘텐츠 탐색 화면", "AI 콘텐츠 생성", "이미지 검색·소재 선택", "Shorts 결과·YouTube 업로드"],
    future: [
      "생성 작업의 상태를 QUEUED/RUNNING/SUCCESS/FAIL처럼 분리해 긴 작업의 진행상태를 사용자에게 명확히 표시할 계획입니다.",
      "외부 API별 실패 원인과 재시도 정책을 분리하고 생성 이력을 저장해 운영 추적성을 높일 계획입니다.",
      "콘텐츠 생성 비용과 처리시간을 비교해 모델 선택 기준을 명확히 하는 운영 지표를 추가할 계획입니다.",
    ],
  },
};

const appFeedbackEnhancements = {
  "JKS MAKER": {
    techReasons: [
      ["Flutter", "음악 설정·생성 결과·파일 관리 화면을 하나의 코드베이스에서 빠르게 반복 개발하기 위해 사용했습니다."],
      ["FastAPI · Python", "ACE-Step 등 Python 기반 오디오/AI 처리를 모바일 앱과 연결하는 얇은 API 브리지로 사용했습니다."],
      ["AI Audio", "보컬 포함 완성곡 생성과 오디오 후처리 기능을 실험·연결하기 위해 사용했습니다."],
      ["구현 범위 주의", "FastAPI 내부의 Pydantic/ORM 사용 여부는 현재 포트폴리오에서 검증되지 않아 사용 기술로 단정하지 않습니다."],
    ],
    screenshots: ["곡 생성 설정", "AI Full Song 결과", "가사·구간 UI", "WAV 저장·라이브러리"],
    future: ["장르 프롬프트가 실제 생성 결과에 더 강하게 반영되도록 스타일 파라미터를 정리합니다.", "생성된 WAV의 영구 저장·재생 경로를 안정화하고 파일 수명주기를 명확히 합니다.", "사용자가 보유한 참고 음원을 선택해 분위기·구성을 참고하는 생성 흐름을 검토합니다."],
  },
  "스다스 작업관리": {
    techReasons: [["Flutter", "공정·사람별 타임라인과 드래그 기반 배정 UI를 반복적으로 조정하기 위해 사용했습니다."], ["SQLite", "현장 네트워크 상태와 관계없이 작업 기준·배정 결과를 로컬에서 유지하기 위한 저장 방식으로 사용했습니다."], ["Timeline UI", "물량과 인원 배치 결과를 시간축으로 한눈에 비교하기 위해 적용했습니다."]],
    screenshots: ["물량·공정 입력", "작업자 배정", "개인별 타임라인", "잔업·급여 계산"],
    future: ["다중 기기 동기화가 필요해지면 서버 DB와 인증을 추가해 관리자·작업자 데이터를 공유하는 구조를 검토합니다.", "실적 데이터를 누적해 공정별 기준시간을 실제 기록으로 보정하는 기능을 추가할 계획입니다.", "배정 충돌과 지연을 더 빠르게 찾을 수 있도록 자동 추천 로직을 고도화할 계획입니다."],
  },
  "JoWalking": {
    techReasons: [["Flutter", "지도·기록·통계 화면을 하나의 모바일 코드베이스에서 구성하기 위해 사용했습니다."], ["GPS · Mapbox", "실제 이동 좌표를 수집하고 경로를 지도 위에 시각화하기 위해 사용했습니다."], ["Supabase", "기록 데이터를 원격에 저장·조회하는 구조를 빠르게 구성하기 위한 백엔드 서비스로 활용했습니다."]],
    screenshots: ["기록 시작 화면", "이동 경로 지도", "선택 날짜 운동 기록", "기록 요약 대시보드"],
    future: ["Android Foreground Service를 적용해 화면이 꺼진 상태에서도 위치 수집이 안정적으로 유지되는 구조를 검토합니다.", "배터리 소비와 GPS 정확도 사이의 균형을 위해 수집 주기와 거리 필터를 조정할 계획입니다.", "장시간 기록에서 누락 좌표·비정상 점을 보정하는 경로 정제 로직을 개선할 계획입니다."],
  },
  "TranSu": {
    techReasons: [["Flutter", "위치 권한·정류장 목록·지도 UI를 빠르게 구성하고 Android에서 반복 테스트하기 위해 사용했습니다."], ["공공데이터 API", "실제 버스정류장 데이터를 받아 서비스 기능을 구성하기 위해 사용했습니다."], ["GPS · Cache", "현재 위치 기반 탐색과 외부 API 장애/지연 시 사용자 경험을 보완하기 위해 적용했습니다."]],
    screenshots: ["정류장 표시", "버스 노선 표시", "버스검색", "시외버스 검색"],
    future: ["외부 API 장애 시 마지막 정상 응답을 활용하는 캐시 정책과 만료시간을 명확히 할 계획입니다.", "노선 변경·정류장 데이터 갱신 주기를 확인해 최신성 관리 전략을 보강할 계획입니다.", "실시간 도착정보 API가 제공되는 지역과 그렇지 않은 지역을 구분해 사용자에게 데이터 범위를 명확히 안내할 계획입니다."],
  },
  "J-Battery": {
    techReasons: [["Flutter", "배경·캐릭터 선택과 크기/위치 조절 UI를 빠르게 반복 개발하기 위해 사용했습니다."], ["Android · Kotlin 연동", "홈/잠금화면·배터리 관련 기능처럼 플랫폼 고유 기능이 필요한 부분을 Android 영역과 연결하기 위해 사용했습니다."], ["Local Storage", "화면별 설정값과 사용자가 선택한 리소스를 기기에서 유지하기 위해 사용했습니다."]],
    screenshots: ["캐릭터 선택", "배경 선택", "캐릭터 크기·위치 조절", "적용 결과"],
    future: ["Flutter로 유지할 UI와 Android 네이티브로 분리할 기능의 경계를 더 명확히 정리할 계획입니다.", "기기 해상도·비율별 미리보기와 실제 적용 결과의 차이를 자동 테스트할 수 있는 기준을 마련할 계획입니다.", "이미지 리소스의 중복·용량을 줄이고 사용자 다운로드 리소스 관리 기능을 개선할 계획입니다."],
  },
  "World Radio": {
    techReasons: [["Flutter", "국가·장르 탐색과 플레이어 UI를 하나의 모바일 코드베이스로 구성하기 위해 사용했습니다."], ["Radio API", "전 세계 방송국 메타데이터와 스트림 주소를 받아 탐색 기능을 제공하기 위해 사용했습니다."], ["Audio · Local Storage", "스트리밍 재생 상태와 즐겨찾기/최근 청취 정보를 기기에서 관리하기 위해 사용했습니다."]],
    screenshots: ["국가·장르 탐색", "방송국 검색", "플레이어", "즐겨찾기"],
    future: ["끊어진 스트림을 주기적으로 검사하고 대체 스트림을 제공하는 검증 로직을 추가할 계획입니다.", "백그라운드 재생과 미디어 알림 제어를 플랫폼별 정책에 맞게 안정화할 계획입니다.", "방송국 수가 많아질 때 검색·필터 성능을 유지하도록 캐시와 로컬 인덱싱을 검토할 계획입니다."],
  },
};

const portfolioSkillOverview = [
  ["Backend", 4, "Spring Boot 중심 · REST/Service/Mapper 구조"],
  ["Database", 4, "MySQL · MyBatis · ERD 설계"],
  ["Deployment", 4, "Docker · AWS EC2 실제 배포"],
  ["Frontend", 3, "React · JSP · Thymeleaf"],
  ["Mobile", 3, "Flutter · GPS · Android 연동"],
  ["AI-assisted", 4, "OpenAI/Gemini API · 구현 보조·검증"],
];

function TechExperienceRadar() {
  const size = 360;
  const center = size / 2;
  const radius = 118;
  const count = portfolioSkillOverview.length;
  const point = (index, scale = 1) => {
    const angle = -Math.PI / 2 + index * (Math.PI * 2 / count);
    return [center + Math.cos(angle) * radius * scale, center + Math.sin(angle) * radius * scale];
  };
  const polygon = portfolioSkillOverview.map(([, level], index) => point(index, level / 5).join(",")).join(" ");
  return <div className="tech-radar-wrap">
    <svg className="tech-radar" viewBox={`0 0 ${size} ${size}`} role="img" aria-label="프로젝트 활용 경험 레이더 차트">
      {[1,2,3,4,5].map(step => <polygon key={step} className="tech-radar-grid" points={portfolioSkillOverview.map((_, index) => point(index, step/5).join(",")).join(" ")} />)}
      {portfolioSkillOverview.map((_, index) => { const [x,y]=point(index,1); return <line key={index} className="tech-radar-axis" x1={center} y1={center} x2={x} y2={y}/>; })}
      <polygon className="tech-radar-value" points={polygon}/>
      {portfolioSkillOverview.map(([name], index) => { const [x,y]=point(index,1.22); return <text key={name} x={x} y={y} textAnchor="middle" dominantBaseline="middle">{name}</text>; })}
    </svg>
    <div className="tech-radar-list">
      {portfolioSkillOverview.map(([name, level, desc]) => <div key={name}><strong>{name}</strong><span>{"●".repeat(level)}{"○".repeat(5-level)}</span><p>{desc}</p></div>)}
      <small>※ 프로젝트 활용 경험을 기준으로 정리한 자가 지표이며, 객관적 숙련도 점수는 아닙니다.</small>
    </div>
  </div>;
}

const projectScreenshotImages = {
  tannus: [
    "/screenshots/tannus/01-packing-list.png",
    "/screenshots/tannus/02-packing-qr-scan.png",
    "/screenshots/tannus/03-scan-confirm.png",
    "/screenshots/tannus/04-stock-list.png",
  ],
  autoorder: [
    "/screenshots/autoorder/01-product-list.png",
    "/screenshots/autoorder/02-supplier-edit.png",
    "/screenshots/autoorder/03-purchase-order-list.png",
    "/screenshots/autoorder/04-sales-data-entry.png",
  ],
  toyshop: [
    "/screenshots/toyshop/01-main-product-list.png",
    "/screenshots/toyshop/02-cart.png",
    "/screenshots/toyshop/03-payment.png",
    "/screenshots/toyshop/04-admin-order-detail.png",
  ],
  whisperme: [
    "/screenshots/whisperme/01-rag-document-management.png",
    "/screenshots/whisperme/02-rag-grounded-answer.png",
    "/screenshots/whisperme/03-location-schedule.png",
    "/screenshots/whisperme/04-chatroom-search.png",
  ],
  aboutj: [
    "/screenshots/aboutj/01-main-service.png",
    "/screenshots/aboutj/02-poster-maker.png",
    "/screenshots/aboutj/03-image-search.png",
    "/screenshots/aboutj/04-shorts-youtube.png",
  ],
  "JKS MAKER": [
    "/screenshots/jksmaker/01-create-settings.jpg",
    "/screenshots/jksmaker/02-full-song-result.jpg",
    "/screenshots/jksmaker/03-lyrics-segment-ui.jpg",
    "/screenshots/jksmaker/04-library-save.jpg",
  ],
  "스다스 작업관리": [
    "/screenshots/sudas/01-volume-input.jpg",
    "/screenshots/sudas/02-worker-assignment.jpg",
    "/screenshots/sudas/03-timeline-result.jpg",
    "/screenshots/sudas/04-monthly-summary.jpg",
  ],
  "JoWalking": [
    "/screenshots/jowalking/01-start-screen.jpg",
    "/screenshots/jowalking/02-route-map.jpg",
    "/screenshots/jowalking/03-date-records.jpg",
    "/screenshots/jowalking/04-summary-dashboard.jpg",
  ],
  "TranSu": [
    "/screenshots/transu/01-stop-markers.jpg",
    "/screenshots/transu/02-bus-route.jpg",
    "/screenshots/transu/03-bus-search.jpg",
    "/screenshots/transu/04-expressbus-search.jpg",
  ],
  "J-Battery": [
    "/screenshots/jbattery/01-character-select.jpg",
    "/screenshots/jbattery/02-background-select.jpg",
    "/screenshots/jbattery/03-character-position-size.jpg",
    "/screenshots/jbattery/04-apply-result.jpg",
  ],
  "World Radio": [
    "/screenshots/worldradio/01-browse.jpg",
    "/screenshots/worldradio/02-search.jpg",
    "/screenshots/worldradio/03-player.jpg",
    "/screenshots/worldradio/04-favorites.jpg",
  ],
};

function ScreenshotSlots({ items, projectId }) {
  const [zoomImage, setZoomImage] = useState(null);
  const images = projectScreenshotImages[projectId] ?? [];

  useEffect(() => {
    if (!zoomImage) return;
    const onKeyDown = (event) => { if (event.key === "Escape") setZoomImage(null); };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("screenshot-lightbox-open");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("screenshot-lightbox-open");
    };
  }, [zoomImage]);

  return <>
    <div className="screenshot-slot-grid">
      {items.map((item, index) => {
        const image = images[index];
        return <button
          type="button"
          className={`screenshot-slot ${image ? "has-image" : ""}`}
          key={`${item}-${index}`}
          onClick={() => image && setZoomImage({ src: image, title: item })}
          aria-label={image ? `${item} 크게 보기` : item}
        >
          {image ? <img src={image} alt={item} /> : null}
          <span>SCREEN {String(index + 1).padStart(2, "0")}</span>
          <strong>{item}</strong>
          <p>{image ? "클릭하면 크게 볼 수 있습니다" : "실제 서비스 화면 캡처 삽입 예정"}</p>
        </button>;
      })}
    </div>
    {zoomImage && createPortal(
      <div className="screenshot-lightbox" role="dialog" aria-modal="true" aria-label={`${zoomImage.title} 확대 이미지`} onClick={() => setZoomImage(null)}>
        <div className="screenshot-lightbox-inner" onClick={(event) => event.stopPropagation()}>
          <button type="button" className="screenshot-lightbox-close" onClick={() => setZoomImage(null)} aria-label="확대 이미지 닫기">×</button>
          <img src={zoomImage.src} alt={zoomImage.title} />
          <strong>{zoomImage.title}</strong>
        </div>
      </div>,
      document.body
    )}
  </>;
}

function ArchitectureDetail({ rows }) {
  return <div className="architecture-detail-grid">
    {rows.map(([layer, tech, role], index) => <div className="architecture-detail-row" key={`${layer}-${tech}`}>
      <span>{String(index + 1).padStart(2, "0")}</span><strong>{layer}</strong><b>{tech}</b><p>{role}</p>
    </div>)}
  </div>;
}

function TechReasonList({ items }) {
  return <div className="tech-reason-grid">
    {items.map(([tech, reason]) => <div className="tech-reason-card" key={tech}><strong>{tech}</strong><p>{reason}</p></div>)}
  </div>;
}

function OverviewTechList({ items }) {
  return <ul className="overview-tech-list">
    {items.map(([tech, role]) => <li key={tech}><strong>{tech}</strong><span>—</span><p>{role}</p></li>)}
  </ul>;
}

function FuturePlanList({ items }) {
  return <ol className="future-plan-list">{items.map((item, index) => <li key={item}><span>{String(index+1).padStart(2,"0")}</span><p>{item}</p></li>)}</ol>;
}

function AiAssistedProcess() {
  const steps = [
    ["01", "문제 정의", "구현하려는 기능과 사용자 흐름을 먼저 정리합니다."],
    ["02", "AI 활용", "코드 초안·대안 탐색·오류 원인 후보를 빠르게 얻습니다."],
    ["03", "직접 실행", "로컬에서 빌드·실행하고 실제 입력과 화면으로 동작을 확인합니다."],
    ["04", "오류 분석", "로그·네트워크·DB·API 응답을 확인해 원인을 좁힙니다."],
    ["05", "수정·검증", "코드를 수정하고 정상/예외 흐름을 다시 테스트합니다."],
    ["06", "코드 분석", "Controller→Service→Mapper/API 흐름을 다시 추적하며 이해를 보완합니다."],
  ];
  return <div className="ai-process-grid">{steps.map(([n,t,d]) => <div key={n}><span>{n}</span><strong>{t}</strong><p>{d}</p></div>)}</div>;
}

const resumeSections = [
  {
    tag: "INTRO",
    title: "자기소개",
    text: `
제가 개발자가 되려고 하는 이유는 오래 일할 수 있는 직업을 갖고 싶었기 때문입니다. 여러 직업 중에서도 개발자는 장소에 크게 구애받지 않고 언제 어디서든 일을 이어갈 수 있다는 점, 그리고 제가 직접 만든 결과물을 눈으로 확인할 수 있다는 점에서 큰 매력을 느꼈습니다. 하나의 아이디어가 실제 웹이나 앱으로 만들어지는 과정에서 느끼는 성취감도 제가 개발을 계속하고 싶은 이유입니다.

개발자를 준비하는 데 약 2년이 걸렸습니다. 처음 6개월 동안 디지털 개발자 과정을 수료했지만, 과정이 끝난 뒤 제 스스로 기본기가 부족하다고 느꼈습니다. 그래서 일을 병행하면서 약 1년 동안 SQLD, 리눅스마스터 2급, ADsP, 정보처리기사를 준비해 합격했고, 이후 약 6개월 동안 직접 웹과 앱을 만들며 실습 경험을 쌓았습니다.

포트폴리오만 만드는 것보다는 기본 지식이 필요하다고 생각했고, 반대로 자격증만 가지고는 실제 개발 경험이 부족하다고 생각했습니다. 그래서 이론과 실습을 모두 경험하면서 최대한 개발자로서의 기본을 갖춘 뒤 취업하고 싶었습니다.

누군가에게는 길지 않은 준비일 수 있지만, 저에게는 개발자의 꿈을 놓지 않고 꾸준히 이어온 시간이었습니다. 이제는 개발자의 길에서 첫걸음을 내디뎠다고 생각하며, 다음 단계로 나아가기 위해 취업의 문을 두드리고 있습니다.

취업이 끝이 아니라 시작이라고 생각합니다. 지금까지 그래왔듯 앞으로도 계속 배우고 직접 만들어보면서, 오래 일할 수 있고 꾸준히 성장하는 개발자가 되고 싶습니다.
`,
  },
  {
    tag: "STRENGTHS",
    title: "나의 장점",
    text: `
제 장점은 꾸준함과 실행력, 그리고 협업에 대한 책임감입니다.

개발은 시간과 장소에 비교적 구애받지 않고 꾸준히 이어갈 수 있는 직업이라고 생각합니다. 물론 업무 환경이나 일정의 제약이 전혀 없다는 의미는 아니지만, 저는 실제로도 시간이 날 때마다 개발 공부와 프로젝트를 이어오고 있습니다. 새로운 기술을 익히거나 부족한 부분을 보완해야 할 때도 특정 환경에 의존하기보다 스스로 시간을 만들어 계속 발전해 나가는 편입니다.

또한 팀으로 일할 때는 개인의 능력만큼이나 기한과 약속을 지키는 것이 중요하다고 생각합니다. 일정이 정해지면 제 담당 업무를 미리 나누어 진행하고, 진행 상황을 공유하며 문제가 생길 가능성이 있다면 늦기 전에 팀원에게 알리는 방식으로 협업하고자 합니다. 단순히 제 부분만 끝내는 것이 아니라 전체 일정에 차질이 생기지 않도록 준비된 상태를 유지하는 것을 중요하게 생각합니다.

저는 무언가 필요하다고 느끼거나 만들어보고 싶은 아이디어가 생기면 실제로 구현해보는 편입니다. 이전 업무 경험에서 느꼈던 불편함을 바탕으로 웹 프로젝트를 만들기도 했고, 평소 생각했던 기능들을 앱으로 직접 구현해보기도 했습니다. 아이디어를 생각하는 데서 끝내기보다 직접 만들면서 부족한 기술을 찾아 배우는 과정 자체를 좋아합니다.

사람을 대할 때는 나이나 연차보다 역할과 경험을 존중하는 태도를 중요하게 생각합니다. 최근 직장에서도 다양한 연령대의 사람들과 함께 일하면서, 나이와 관계없이 서로의 역할을 인정하고 배울 점은 배우는 자세가 협업에서 중요하다는 것을 느꼈습니다.

앞으로도 저는 새로운 환경이나 기술을 부담스럽게 생각하기보다, 필요한 것을 배우고 직접 만들어보며 팀 안에서는 맡은 역할을 책임감 있게 수행하는 개발자가 되고 싶습니다.
`,
  },
  {
    tag: "FIELD TO DEVELOPMENT",
    title: "현장 경험을 개발로 연결하다",
    text: `
저는 개발을 하면서 실제 업무에서 겪었던 경험을 프로그램으로 연결해보는 것을 중요하게 생각했습니다.

타누스에서 업무를 경험하면서 포장, 입고, 수출, 재고와 같은 업무 흐름을 보았고, 이를 바탕으로 Tannus MES를 직접 설계하고 구현했습니다. 단순히 기능을 만들어보는 것이 아니라 실제 업무에서는 어떤 정보가 필요하고, 사용자가 어떤 순서로 프로그램을 사용하게 되는지를 생각하면서 개발하려고 했습니다.

Auto-Order 역시 반복적으로 이루어지는 발주 업무를 보면서, 정해진 시간에 자동으로 처리할 수 있다면 업무를 줄일 수 있겠다는 생각에서 시작했습니다. 그래서 스케줄러를 이용해 자동 발주가 실행되는 구조를 직접 구현해보았습니다.

최근에는 물류 현장에서 작업량에 따라 인원을 배치하고 작업시간을 조정하는 과정을 경험하면서 스다스 작업관리 앱을 만들었습니다. 택배 물량, 작업 인원, 작업시간을 입력해 실제 현장에서 조금이라도 편하게 사용할 수 있는 방향으로 기능을 구성했습니다.

이런 경험을 통해 개발은 단순히 코드를 작성하는 일이 아니라, 현장에서 불편한 점이나 반복되는 일을 발견하고 그것을 프로그램으로 해결하는 과정이라는 생각을 하게 되었습니다. 앞으로도 업무를 하면서 개선할 수 있는 부분이 보인다면 그냥 지나치지 않고, 개발로 해결할 수 있는 방법을 고민하는 개발자가 되고 싶습니다.
`,
  },
  {
    tag: "AI PLAN",
    title: "AI 활용 계획 및 개발자로서의 목표",
    text: `
저는 AI를 단순히 코드를 대신 작성해주는 도구로 활용하고 싶지 않습니다.

개발자가 반드시 이해해야 할 요구사항 분석 → 설계 → 데이터 구조 파악 → API 구성 → 기능 구현 → 테스트 → 오류 분석 → 배포까지의 전체 개발 흐름은 스스로 반복해서 익히고, 어떤 프로젝트에서도 이 과정을 설명하고 재현할 수 있는 수준까지 숙달하는 것을 목표로 하고 있습니다.

그 위에서 세부 구현 방법이나 새로운 기술, 해결이 어려운 오류, 더 나은 구조를 고민할 때 AI를 적극적으로 활용하고자 합니다. AI가 제시한 코드를 그대로 사용하는 데서 끝나는 것이 아니라, 왜 이런 구조가 필요한지, 어떤 원리로 동작하는지, 다른 방법은 무엇인지 직접 분석하고 수정하면서 결국 제 지식과 경험으로 만드는 것이 제가 생각하는 AI 활용 방식입니다.

또한 같은 기능을 구현하더라도 어떤 기술을 선택하느냐에 따라 결과는 달라질 수 있다고 생각합니다. 예를 들어 같은 조회 기능이라도 매번 DB를 조회하는 방식과 Redis 같은 캐시를 활용하는 방식은 겉으로는 비슷한 결과를 만들 수 있지만, 실제로는 응답 속도와 서버 부하, 데이터 최신성 관리 방식이 달라집니다. 이런 차이를 이해하고 단순히 “돌아가는 코드”를 만드는 데서 끝나는 것이 아니라, 왜 이 기술을 써야 하는지까지 판단할 수 있는 개발자가 되고 싶습니다.

앞으로의 개발 환경에서는 모든 문법과 구현 방법을 암기하는 능력보다, 문제를 정확히 정의하고 필요한 기술을 선택하며 AI와 함께 빠르게 검증하고 완성할 수 있는 능력이 더욱 중요해질 것이라고 생각합니다. 따라서 저는 기본 원리와 전체 흐름에 대한 이해를 중심에 두고, AI를 개발 속도와 학습 깊이를 높여주는 협업 도구이자 기술 확장의 수단으로 활용할 계획입니다.

또한 특정 분야나 정해진 기술에만 머무르지 않고, 일상이나 업무 중 새로운 아이디어가 떠오르면 작은 기능이라도 직접 웹이나 앱으로 구현해보는 개발자가 되고 싶습니다. “이건 어렵다”, “이건 만들어본 적이 없다”에서 멈추기보다는 필요한 기술을 찾고, 설계하고, 실험하고, 부족한 부분은 AI와 함께 학습하면서 실제 동작하는 결과물로 만드는 경험을 계속 쌓아가고자 합니다.

제가 궁극적으로 지향하는 개발자는 주어진 기능만 구현하는 사람이 아니라, 아이디어를 실제 서비스로 바꾸는 사람입니다. 웹이든 앱이든, AI든 자동화든 분야에 제한을 두지 않고 필요한 기술을 배우며, 새로운 문제를 만날 때마다 해결 방법을 찾아가는 개발자가 되고 싶습니다.
`,
  },
  {
    tag: "AFTER JOINING",
    title: "입사 후 목표",
    text: `
입사 후 가장 먼저 해야 할 일은 회사가 사용하는 개발 언어와 프레임워크, 업무 방식, 기존 시스템의 구조를 빠르게 이해하는 것이라고 생각합니다. 제가 사용해본 기술만 고집하기보다는 회사에서 사용하는 기술을 우선적으로 익히고, 기존 코드를 읽고 업무 흐름을 파악하면서 맡은 일을 안정적으로 수행할 수 있는 개발자가 되는 것이 첫 번째 목표입니다.

그 이후에는 지금까지 해왔던 것처럼 꾸준히 개발을 이어가고 싶습니다. 새로운 기술을 단순히 공부하는 데서 끝내지 않고 직접 웹이나 앱에 적용해보면서 저만의 경험과 기술로 만들어갈 생각입니다. 업무 중 반복되거나 개선할 수 있는 부분이 있다면 작은 기능이라도 직접 고민해보고, 가능하다면 실제 업무 개선으로 연결해보고 싶습니다.

특히 앞으로는 LLM과 RAG를 단순히 사용하는 수준에서 끝내지 않고, 실제 서비스에 안정적으로 적용할 수 있는 수준까지 발전시키는 것이 목표입니다. 프롬프트 작성이나 API 연동에 그치지 않고, 문서 검색 구조, 임베딩, 벡터 검색, 메모리 관리, 응답 정확도, 비용과 속도까지 함께 고려하면서 보다 완성도 높은 AI 기능을 구현할 수 있는 개발자가 되고 싶습니다. 장기적으로는 기존 서비스에 AI를 붙이는 수준을 넘어, 어떤 문제에 어떤 방식의 LLM/RAG 구조가 적합한지 판단하고 직접 설계할 수 있는 수준까지 올라가는 것이 목표입니다.

자격증과 기본 지식에 대한 공부도 계속할 계획입니다. SQLD, ADsP, 리눅스마스터 2급, 정보처리기사에서 멈추지 않고 빅데이터분석기사처럼 데이터와 개발에 도움이 되는 분야도 계속 공부하면서 부족한 부분을 보완하고 싶습니다. 필요하다면 클라우드, 데이터베이스, AI 등 실제 업무와 연관된 기술도 추가로 학습할 생각입니다.

장기적으로는 단순히 주어진 기능을 구현하는 개발자보다, 업무를 이해하고 문제를 발견하며 필요한 기술을 선택해 해결할 수 있는 개발자가 되고 싶습니다. 회사와 함께 성장하면서 시간이 지날수록 더 많은 일을 믿고 맡길 수 있고, 새로운 기술도 실제 성과로 연결할 수 있는 개발자가 되는 것이 제 입사 후 목표입니다.
`,
  },
];

const profileInfo = [
  { label: "이름", value: "정경수" },
  { label: "출생", value: "1987년" },
  { label: "거주지", value: "경남 김해시 삼계동" },
  { label: "학력", value: "창원대학교(4년제)" },
  { label: "전공", value: "신소재공학" },
  { label: "희망직무", value: "풀스택 개발자 · AI 활용" },
  { label: "강점", value: "현장 경험 + 서비스 구현 + 배포" },
];

const skillGroups = [
  {
    title: "Backend",
    icon: "",
    items: ["Java", "Spring Boot", "REST API", "MyBatis", "JSP", "Thymeleaf"],
  },
  {
    title: "Frontend",
    icon: "",
    items: ["React", "JavaScript", "HTML5", "CSS3", "Vite"],
  },
  {
    title: "Database",
    icon: "",
    items: ["MySQL"],
  },
  {
    title: "DevOps",
    icon: "",
    items: ["Docker", "AWS EC2", "GitHub"],
  },
  {
    title: "AI 활용 / AI-assisted Development",
    icon: "",
    items: ["OpenAI API", "Gemini API", "AI-assisted Development", "Prompt 작성", "실행·오류 검증", "코드 분석"],
  },
  {
    title: "Tools",
    icon: "",
    items: ["Swagger", "Postman", "IntelliJ", "VS Code"],
  },
  {
    title: "API / Integration",
    icon: "",
    items: [
      "Toss Payments",
      "JavaMailSender",
      "Naver SMTP",
      "Geolocation API",
      "Weather API",
      "Speech Recognition API",
      "QR Code",
      "Scheduler",
      "File Upload",
      "Session Authentication",
    ],
  },
];

const relationColors = [
  "#e11d48", "#2563eb", "#059669", "#9333ea",
  "#ea580c", "#0891b2", "#db2777", "#4f46e5",
  "#ca8a04", "#0284c7", "#65a30d", "#be123c",
  "#7c3aed", "#0d9488", "#b45309", "#334155",
];

const projectDesigns = {
  aboutj: {
    goal: "영상 탐색·시청과 AI 콘텐츠 생성부터 Shorts 결과물 제작·YouTube 업로드까지 이어지는 콘텐츠 서비스 흐름을 구성했습니다.",
    requirements: ["관리자·사용자 인증", "영상 콘텐츠 탐색·검색·시청", "AI 기반 주제·콘텐츠 생성", "이미지 소재 검색", "Shorts 결과물 관리", "YouTube OAuth 업로드·이력", "로컬·운영 환경 설정 분리"],
    erd: [["계정", "Account", "사용자 ID·권한·인증 정보"], ["제작 작업", "ContentJob / ContentAsset", "작업 주제·상태와 이미지·출력물 분리"], ["업로드", "UploadHistory", "업로드 결과·시점·상태 기록"], ["인증", "OAuthToken", "사용자 계정에 연결된 인증 정보 논리 모델"]],
    entities: [["Account", "id, login_id, role, status"], ["ContentJob", "id, account_id, topic, status, created_at"], ["ContentAsset", "id, job_id, asset_type, file_path"], ["UploadHistory", "id, job_id, platform, status, uploaded_at"], ["OAuthToken", "id, account_id, provider, token_ref"]],
    layout: {Account:[1,0],ContentJob:[1,1],ContentAsset:[0,2],UploadHistory:[2,2],OAuthToken:[2,0]},
    relations: [["Account","1 : N","ContentJob","계정별 여러 콘텐츠 제작 작업"], ["ContentJob","1 : N","ContentAsset","제작 작업별 이미지·결과 파일"], ["ContentJob","1 : N","UploadHistory","한 작업에 대한 업로드 시도·결과"], ["Account","1 : N","OAuthToken","계정별 외부 서비스 인증 정보"]],
    diagramGroups: [{title:"계정·콘텐츠 제작·업로드 · 논리 설계",entities:["Account","ContentJob","ContentAsset","UploadHistory","OAuthToken"],relationIndexes:[0,1,2,3],layout:{Account:[1,0],ContentJob:[1,1],ContentAsset:[0,2],UploadHistory:[2,2],OAuthToken:[2,0]},labelOffsets:{0:[0,44]}}],
    architecture: ["웹 UI · Thymeleaf", "Spring Boot Controller", "Content · Auth Service", "MySQL", "OpenAI · Gemini · Pexels", "YouTube Data API · OAuth", "AWS EC2"],
    verification: "로컬 프로필·API 환경변수·YouTube OAuth 설정과 콘텐츠 생성·업로드 단계의 실패 지점을 구분하여 점검했습니다. 이 ERD는 프로젝트 설명용 논리 모델로 물리 DB 테이블명을 단정하지 않습니다.",
  },
  tannus: {
    goal: "제조·물류 현장에서 포장 지시, 출고, 입고, 재고가 각각 분리되어 발생하던 업무를 하나의 상태 흐름으로 연결하는 것을 목표로 설계했습니다.",
    requirements: ["관리자·포장팀·물류팀 권한 분리", "QR 기반 작업 수량 확인", "출고 완료 후 입고 대상 자동 연결", "재고와 변경 이력 동시 관리", "수정 요청과 무발주 입고 예외 처리"],
    erd: [
      ["포장 지시", "packing_order / packing_order_detail", "포장 지시 헤더와 품목별 상세 수량 분리"],
      ["수출 지시", "export_order / export_order_detail", "수출 지시 헤더와 품목별 상세 수량 분리"],
      ["스캔", "packing_*_scan / export_outbound_scan", "지시·상세 단위 QR 작업 기록"],
      ["재고·예외", "item / stock_history / change_request / unplanned_*", "현재고·변동 이력·수정 및 무계획 작업 관리"],
    ],
    entities: [
      ["PackingOrder", "id, request_date, requested_by, status, completed_at"],
      ["PackingOrderDetail", "id, packing_order_id, model_name, total_qty, inbound_status"],
      ["PackingInboundScan", "id, packing_order_id, detail_id, qty, scan_status"],
      ["PackingOutboundScan", "id, packing_order_id, detail_id, qty, status"],
      ["PackingChangeRequest", "id, packing_order_id, request_reason, status"],
      ["ExportOrder", "id, request_date, worker_name, status, stock_applied"],
      ["ExportOrderDetail", "id, export_order_id, model_name, total_qty, outbound_status"],
      ["ExportOutboundScan", "id, export_order_id, detail_id, qty, scan_status"],
      ["ExportChangeRequest", "id, export_order_id, request_reason, status"],
      ["UnplannedExport", "id, export_order_id, model_name, total_qty, status"],
      ["Item", "id, product_type, model_name, current_qty, location"],
      ["StockHistory", "id, item_id, history_type, model_name, change_qty, after_qty"],
      ["UnplannedPurchase", "id, packing_order_id, model_name, qty, status"],
    ],
    layout: {
      PackingOrder: [1, 0], PackingOrderDetail: [1, 1], PackingInboundScan: [0, 1],
      PackingOutboundScan: [2, 1], PackingChangeRequest: [0, 2], UnplannedPurchase: [2, 2],
      ExportOrder: [1, 3], ExportOrderDetail: [1, 4], ExportOutboundScan: [0, 4],
      ExportChangeRequest: [2, 4], UnplannedExport: [2, 3],
      Item: [0, 5], StockHistory: [2, 5],
    },
    relations: [
      ["PackingOrder", "1 : N", "PackingOrderDetail", "포장 지시별 여러 품목 상세"],
      ["PackingOrderDetail", "1 : N", "PackingInboundScan", "포장 상세 품목별 입고 스캔"],
      ["PackingOrderDetail", "1 : N", "PackingOutboundScan", "포장 상세 품목별 출고 스캔"],
      ["PackingOrder", "1 : N", "PackingChangeRequest", "포장 지시별 수정 요청"],
      ["PackingOrder", "1 : N", "UnplannedPurchase", "포장 지시별 무계획 입고 요청"],
      ["ExportOrder", "1 : N", "ExportOrderDetail", "수출 지시별 여러 품목 상세"],
      ["ExportOrderDetail", "1 : N", "ExportOutboundScan", "수출 상세 품목별 출고 스캔"],
      ["ExportOrder", "1 : N", "ExportChangeRequest", "수출 지시별 수정 요청"],
      ["ExportOrder", "1 : N", "UnplannedExport", "수출 지시별 무계획 출고 요청"],
      ["Item", "1 : N", "StockHistory", "품목별 재고 변동 이력"],
    ],
    diagramGroups: [
      { title: "포장·입고 흐름", entities: ["PackingOrder", "PackingOrderDetail", "PackingInboundScan", "PackingOutboundScan", "PackingChangeRequest", "UnplannedPurchase"], relationIndexes: [0, 1, 2, 3, 4], layout: { PackingOrder: [1, 0], PackingOrderDetail: [1, 1], PackingInboundScan: [0, 2], PackingOutboundScan: [2, 2], PackingChangeRequest: [0, 1], UnplannedPurchase: [2, 1] }, labelOffsets: { 0: [0, 66] } },
      { title: "수출·예외 흐름", entities: ["ExportOrder", "ExportOrderDetail", "ExportOutboundScan", "ExportChangeRequest", "UnplannedExport"], relationIndexes: [5, 6, 7, 8], layout: { ExportOrder: [1, 0], ExportOrderDetail: [1, 1], ExportOutboundScan: [0, 2], ExportChangeRequest: [2, 2], UnplannedExport: [2, 1] }, labelOffsets: { 5: [0, 66] } },
      { title: "재고·변동 이력", entities: ["Item", "StockHistory"], relationIndexes: [9], layout: { Item: [0, 0], StockHistory: [1, 0] }, labelOffsets: { 9: [66, 0] } },
    ],
    architecture: ["사용자 브라우저", "JSP 화면", "Spring Boot MVC", "Service · MyBatis", "MySQL", "Docker · AWS EC2"],
    verification: "역할별 계정으로 지시 생성부터 QR 스캔, 출고, 입고 확정, 재고 반영까지 전체 흐름을 반복 검증했습니다.",
  },
  autoorder: {
    goal: "현재고와 최소재고를 기준으로 발주 필요 상품을 찾고, 업체별 발주 일정과 박스 단위를 반영해 실제 사용 가능한 발주 수량을 생성하도록 설계했습니다.",
    requirements: ["현재고·최소재고 비교", "업체별 발주 요일 관리", "박스 단위 발주 수량 계산", "동일 상품 중복 발주 방지", "판매 데이터 등록 및 현재고 반영"],
    erd: [
      ["업체·상품", "supplier / item", "업체의 일정 정보와 공급 상품·재고 기준 관리"],
      ["발주", "purchase_order / purchase_order_detail", "업체별 발주서와 상품별 발주 수량 분리"],
      ["판매·재고 이력", "sale_history / stock_io_history", "판매 및 재고 조정에 따른 품목별 변동 기록"],
      ["조정·계정", "stock_adjust_history / user_account", "수동 재고 조정 사유와 사용자 권한 관리"],
    ],
    entities: [
      ["Supplier", "id, supplier_code, supplier_name, order_days, inbound_days"],
      ["Item", "id, supplier_id, item_name, current_stock, min_stock"],
      ["PurchaseOrder", "id, supplier_id, order_date, status, created_at"],
      ["PurchaseOrderDetail", "id, purchase_order_id, item_id, order_qty"],
      ["SaleHistory", "id, item_id, sale_qty, sale_date"],
      ["StockIoHistory", "id, item_id, io_type, qty, after_stock"],
      ["StockAdjustHistory", "id, item_id, before_stock, after_stock, reason"],
      ["UserAccount", "id, login_id, user_name, role, use_yn"],
    ],
    layout: {
      Supplier: [0, 0], Item: [1, 0], PurchaseOrder: [2, 0],
      SaleHistory: [0, 1], PurchaseOrderDetail: [1, 1], StockIoHistory: [2, 1],
      StockAdjustHistory: [1, 2], UserAccount: [2, 2],
    },
    relations: [
      ["Supplier", "1 : N", "Item", "한 업체가 여러 상품을 공급"],
      ["Supplier", "1 : N", "PurchaseOrder", "한 업체에 여러 발주서가 생성"],
      ["PurchaseOrder", "1 : N", "PurchaseOrderDetail", "발주서에 여러 상품 상세를 포함"],
      ["Item", "1 : N", "PurchaseOrderDetail", "상품이 여러 발주 상세에 기록"],
      ["Item", "1 : N", "SaleHistory", "상품별 판매 이력을 누적"],
      ["Item", "1 : N", "StockIoHistory", "상품별 재고 변동 이력을 누적"],
      ["Item", "1 : N", "StockAdjustHistory", "상품별 수동 조정 이력을 누적"],
    ],
    diagramGroups: [
      { title: "업체·발주 흐름", entities: ["Supplier", "Item", "PurchaseOrder", "PurchaseOrderDetail"], relationIndexes: [0, 1, 2, 3], layout: { Supplier: [0, 0], PurchaseOrder: [2, 0], Item: [0, 1], PurchaseOrderDetail: [2, 1] }, labelOffsets: { 0: [0, 66] } },
      { title: "상품·재고 이력", entities: ["Item", "SaleHistory", "StockIoHistory", "StockAdjustHistory"], relationIndexes: [4, 5, 6], layout: { Item: [1, 0], SaleHistory: [0, 1], StockIoHistory: [1, 1], StockAdjustHistory: [2, 1] } },
    ],
    architecture: ["관리자 · 직원", "JSP 화면", "Spring Boot", "자동발주 Scheduler", "MyBatis · MySQL", "Docker · AWS EC2"],
    verification: "재고 경계값, 발주 단위 올림, 중복 생성, 업체별 요일과 서버 스케줄러 실행 결과를 확인했습니다.",
  },
  toyshop: {
    goal: "회원이 상품을 찾고 주문·결제하는 과정과 관리자가 상품·주문·회원을 운영하는 과정을 하나의 전자상거래 흐름으로 구성했습니다.",
    requirements: ["회원·배송지 관리", "상품 검색·상세·장바구니", "무통장·카드 결제 상태 분리", "주문 상태 변경과 되돌리기", "마일리지·후기·문의 관리"],
    erd: [
      ["회원", "member / address", "회원과 복수 배송지·기본 배송지 관리"],
      ["상품 활동", "cart / wishlist / recent_product", "회원과 상품의 N:M 관계를 연결 테이블로 해소"],
      ["주문", "orders / order_detail / product", "주문과 상품의 N:M 관계 및 결제 정보를 orders에 저장"],
      ["구매 전후", "mileage_history / review / product_qna / inquiry", "적립·후기·상품문의·일반문의 기록"],
    ],
    entities: [
      ["Member", "id, login_id, password, mileage, status"],
      ["Address", "id, member_id, receiver_name, address, default_yn"],
      ["Product", "id, product_name, category, price, stock_qty"],
      ["Cart", "id, member_id, product_id, qty, created_at"],
      ["Orders", "id, member_id, order_no, final_price, payment_status"],
      ["OrderDetail", "id, order_id, product_id, price, qty"],
      ["Wishlist", "id, member_id, product_id, created_at"],
      ["RecentProduct", "id, member_id, product_id, viewed_at"],
      ["MileageHistory", "id, member_id, amount, type, created_at"],
      ["Review", "id, member_id, product_id, rating, content"],
      ["ProductQna", "id, member_id, product_id, answer_status"],
      ["Inquiry", "id, member_id, category, title, answer_status"],
    ],
    layout: {
      Member: [1, 0], Address: [0, 0], MileageHistory: [2, 0],
      Cart: [0, 1], Product: [1, 1], Wishlist: [2, 1],
      RecentProduct: [0, 2], OrderDetail: [1, 2], Orders: [2, 2],
      Review: [0, 3], ProductQna: [1, 3], Inquiry: [2, 3],
    },
    relations: [
      ["Member", "1 : N", "Address", "회원별 복수 배송지 관리"],
      ["Member", "1 : N", "MileageHistory", "회원별 마일리지 이력"],
      ["Member", "1 : N", "Inquiry", "회원별 일반 문의"],
      ["Member", "1 : N", "Cart", "회원별 장바구니 항목"],
      ["Product", "1 : N", "Cart", "상품별 장바구니 포함 이력"],
      ["Member", "1 : N", "Wishlist", "회원별 찜 항목"],
      ["Product", "1 : N", "Wishlist", "상품별 찜 항목"],
      ["Member", "1 : N", "RecentProduct", "회원별 최근 본 상품"],
      ["Product", "1 : N", "RecentProduct", "상품별 최근 조회 기록"],
      ["Member", "1 : N", "Orders", "회원별 주문 내역"],
      ["Orders", "1 : N", "OrderDetail", "주문별 상품 상세"],
      ["Product", "1 : N", "OrderDetail", "상품별 주문 상세"],
      ["Member", "1 : N", "Review", "회원별 작성 후기"],
      ["Product", "1 : N", "Review", "상품별 후기"],
      ["Member", "1 : N", "ProductQna", "회원별 상품 문의"],
      ["Product", "1 : N", "ProductQna", "상품별 문의"],
    ],
    diagramGroups: [
      { title: "회원·배송·마일리지", entities: ["Member", "Address", "MileageHistory", "Inquiry"], relationIndexes: [0, 1, 2], layout: { Member: [1, 0], Address: [0, 1], MileageHistory: [1, 1], Inquiry: [2, 1] } },
      { title: "장바구니·관심 상품", entities: ["Member", "Product", "Cart", "Wishlist", "RecentProduct"], relationIndexes: [3, 4, 5, 6, 7, 8], layout: { Member: [0, 1], Product: [2, 1], Cart: [1, 0], Wishlist: [1, 1], RecentProduct: [1, 2] } },
      { title: "주문·상품 상세", entities: ["Member", "Orders", "OrderDetail", "Product"], relationIndexes: [9, 10, 11], layout: { Member: [0, 0], Product: [2, 0], Orders: [0, 1], OrderDetail: [2, 1] }, labelOffsets: { 9: [0, 66] } },
      { title: "후기·상품 문의", entities: ["Member", "Product", "Review", "ProductQna"], relationIndexes: [12, 13, 14, 15], layout: { Member: [0, 1], Product: [2, 1], Review: [1, 0], ProductQna: [1, 2] } },
    ],
    architecture: ["사용자 · 관리자", "Thymeleaf 화면", "Spring Boot", "Service · MyBatis", "MySQL", "Toss Payments · Naver SMTP", "Docker · AWS EC2"],
    verification: "주문 금액과 결제 금액 검증, 결제 방식별 재고 차감, 주문 상태 되돌리기, 기본 배송지와 이미지 예외 처리를 확인했습니다.",
  },
  whisperme: {
    goal: "단순 OpenAI API 호출형 챗봇을 넘어, 사용자 장기 메모리·대화방 맥락 메모리·RAG 문서 검색·웹검색을 질문 유형에 따라 결합하는 LLM 서비스 구조를 설계했습니다.",
    requirements: [
      "회원별 채팅방·메시지·Todo 데이터 분리",
      "대화방 단위 요약 메모리와 회원 단위 장기 메모리 분리",
      "TXT·MD·CSV 문서 등록 후 Chunk·Embedding 저장",
      "질문 Embedding과 문서 Chunk의 Cosine Similarity 기반 Top-K 검색",
      "상담 / 일반 / 최신 정보 질문을 Question Router로 분기",
      "RAG 사용 여부와 출처 개수를 프론트 화면에서 확인",
      "React·Spring Boot·MySQL을 Docker Compose로 통합 실행",
    ],
    erd: [
      ["회원", "Member", "로그인과 사용자 프로필 관리"],
      ["대화", "ChatRoom / ChatMessage", "회원별 채팅방과 USER·ASSISTANT 메시지 관리"],
      ["대화 메모리", "ConversationMemory", "room_id별 핵심 대화 요약 저장"],
      ["사용자 메모리", "UserMemory", "member_id별 채팅방 공통 장기 요약 저장"],
      ["RAG 문서", "RagDocument", "회원이 등록한 문서 파일 정보"],
      ["RAG Chunk", "RagChunk", "문서 분할 내용과 Embedding 벡터 저장"],
      ["일정", "Todo", "회원별 일정과 완료 상태 관리"],
    ],
    entities: [
      ["Member", "id, login_id, password, nickname, birth_date"],
      ["ChatRoom", "id, member_id, title, created_at, deleted_yn"],
      ["ChatMessage", "id, room_id, role, content, message_type"],
      ["ConversationMemory", "id, room_id, summary, created_at, updated_at"],
      ["UserMemory", "id, member_id, summary, created_at, updated_at"],
      ["RagDocument", "id, member_id, file_name, created_at"],
      ["RagChunk", "id, document_id, member_id, chunk_index, content, embedding"],
      ["Todo", "id, member_id, content, todo_date, completed"],
    ],
    layout: {
      Member: [1, 0],
      UserMemory: [0, 1], ChatRoom: [1, 1], Todo: [2, 1],
      ConversationMemory: [0, 2], ChatMessage: [1, 2], RagDocument: [2, 2],
      RagChunk: [2, 3],
    },
    relations: [
      ["Member", "1 : N", "ChatRoom", "회원별 여러 채팅방 관리"],
      ["ChatRoom", "1 : N", "ChatMessage", "대화방별 USER·ASSISTANT 메시지 저장"],
      ["ChatRoom", "1 : 1", "ConversationMemory", "채팅방별 최신 핵심 맥락 요약 1건 유지"],
      ["Member", "1 : 1", "UserMemory", "회원별 채팅방 공통 장기 메모리 1건 유지"],
      ["Member", "1 : N", "RagDocument", "회원별 여러 RAG 문서 등록"],
      ["RagDocument", "1 : N", "RagChunk", "문서별 여러 Chunk와 Embedding 저장"],
      ["Member", "1 : N", "Todo", "회원별 일정과 완료 상태 관리"],
    ],
    diagramGroups: [
      {
        title: "AI 대화 · 메모리",
        safeRelationLabelClamp: true,
        entities: ["Member", "UserMemory", "ChatRoom", "ConversationMemory", "ChatMessage"],
        relationIndexes: [0, 1, 2, 3],
        layout: { Member: [0, 0], UserMemory: [0, 1], ChatRoom: [1, 0], ConversationMemory: [1, 1], ChatMessage: [2, 0] },
        // R1/R2 라벨을 테이블 밖의 실제 관계선 중앙으로 이동해 노드에 가려지지 않게 함
        labelOffsets: { 0: [72, 0], 1: [46, 0] },
      },
      {
        title: "RAG 문서 · Embedding",
        safeRelationLabelClamp: true,
        entities: ["Member", "RagDocument", "RagChunk"],
        relationIndexes: [4, 5],
        layout: { Member: [0, 0], RagDocument: [1, 0], RagChunk: [2, 0] },
        // R5/R6도 각 테이블 사이 중앙에 배치
        labelOffsets: { 4: [72, 0], 5: [46, 0] },
      },
      {
        title: "회원 일정 관리",
        safeRelationLabelClamp: true,
        entities: ["Member", "Todo"],
        relationIndexes: [6],
        layout: { Member: [0, 0], Todo: [2, 0] },
      },
    ],
    architecture: [
      "React · Vite",
      "Nginx Reverse Proxy",
      "Spring Boot REST API",
      "Question Router",
      "User Memory + Room Memory + RAG Context",
      "OpenAI LLM · Embedding · Naver Search",
      "MyBatis · MySQL",
      "Docker Compose · AWS EC2",
    ],
    verification: "Docker Compose에서 Frontend·Backend·MySQL을 함께 실행하고, 사용자/대화방 메모리 ON 상태, RAG 문서 1개 등록, RAG + LLM 응답과 출처 표시까지 로컬에서 확인했습니다.",
  },
};

function LogicalErdGroup({ design, group }) {
  const canvasWidth = group.spaciousLayout ? 1480 : 1280;
  const boxWidth = group.spaciousLayout ? 310 : 290;
  const boxHeight = group.spaciousLayout ? 136 : 128;
  const diagramRelations = group.relationIndexes.map((globalIndex) => [
    ...design.relations[globalIndex],
    globalIndex,
  ]);
  const groupEntities = group.entities
      .map((name) => design.entities.find((entity) => entity[0] === name))
      .filter(Boolean);
  const maxColumn = Math.max(...groupEntities.map((entity, index) => group.layout?.[entity[0]]?.[0] ?? (index % 3)), 1);
  const columnGap = (canvasWidth - 120 - boxWidth) / maxColumn;
  const positions = groupEntities.map((entity, index) => ({
    name: entity[0],
    columns: entity[1].split(",").map((column) => column.trim()),
    x: 60 + (group.layout?.[entity[0]]?.[0] ?? (index % 3)) * columnGap,
    y: 58 + (group.layout?.[entity[0]]?.[1] ?? Math.floor(index / 3)) * (group.spaciousLayout ? 300 : 270),
  }));

  const nodeMap = Object.fromEntries(positions.map((node) => [node.name, node]));
  const rowGap = group.spaciousLayout ? 300 : 270;
  const rowCount = Math.max(...positions.map((node) => Math.round((node.y - 58) / rowGap))) + 1;
  const canvasHeight = Math.max(group.spaciousLayout ? 660 : 360, rowCount * rowGap + 40);
  const routedRelations = diagramRelations.map(([from, cardinality, to, , globalIndex], relationIndex) => {
    const source = nodeMap[from];
    const target = nodeMap[to];
    if (!source || !target) return null;
    const sameTargetRelations = diagramRelations.filter((relation) => relation[2] === to);
    const targetRelationIndex = sameTargetRelations.findIndex(
        (relation) => relation[0] === from && relation[1] === cardinality
    );
    const targetOffset = (targetRelationIndex - (sameTargetRelations.length - 1) / 2) * 40;
    const sameRow = source.y === target.y;
    const longHorizontal = sameRow && Math.abs(target.x - source.x) > 500;
    const horizontal = !longHorizontal && Math.abs(target.x - source.x) >= Math.abs(target.y - source.y);
    const laneOffset = ((relationIndex % 7) - 3) * 22;
    if (longHorizontal) {
      const sourceX = source.x + boxWidth / 2;
      const targetX = target.x + boxWidth / 2;
      const edgeY = source.y + boxHeight;
      const channelY = edgeY + 58 + laneOffset;
      return {
        key: `${from}-${cardinality}-${to}`,
        cardinality,
        relationCode: `R${globalIndex + 1}`,
        color: relationColors[globalIndex % relationColors.length],
        route: `M ${sourceX} ${edgeY} V ${channelY} H ${targetX} V ${edgeY}`,
        labelX: (sourceX + targetX) / 2 + targetOffset,
        labelY: channelY,
      };
    }
    const x1 = horizontal ? source.x + (target.x > source.x ? boxWidth : 0) : source.x + boxWidth / 2;
    const y1 = horizontal ? source.y + boxHeight / 2 : source.y + (target.y > source.y ? boxHeight : 0);
    const x2 = horizontal ? target.x + (target.x > source.x ? 0 : boxWidth) : target.x + boxWidth / 2;
    const y2 = horizontal ? target.y + boxHeight / 2 : target.y + (target.y > source.y ? 0 : boxHeight);
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    return {
      key: `${from}-${cardinality}-${to}`,
      cardinality,
      relationCode: `R${globalIndex + 1}`,
      color: relationColors[globalIndex % relationColors.length],
      route: horizontal
          ? `M ${x1} ${y1} H ${midX + laneOffset} V ${y2} H ${x2}`
          : `M ${x1} ${y1} V ${midY + laneOffset} H ${x2} V ${y2}`,
      labelX: horizontal ? midX + laneOffset : (x1 + x2) / 2 + targetOffset,
      labelY: horizontal ? (y1 + y2) / 2 + targetOffset : midY + laneOffset,
    };
  }).filter(Boolean);

  routedRelations.forEach((relation) => {
    const relationNumber = Number(relation.relationCode.slice(1)) - 1;
    const [offsetX = 0, offsetY = 0] = group.labelOffsets?.[relationNumber] ?? [];
    relation.labelX += offsetX;
    relation.labelY += offsetY;

    if (group.safeRelationLabelClamp) {
      const safeX = 66;
      const safeY = 24;
      relation.labelX = Math.max(safeX, Math.min(canvasWidth - safeX, relation.labelX));
      relation.labelY = Math.max(safeY, Math.min(canvasHeight - safeY, relation.labelY));
    }
  });

  // 여러 관계가 같은 엔터티로 모일 때 1:N 배지끼리 겹치지 않도록
  // 가까운 배지를 좌우·상하 레인으로 분산한다.
  routedRelations.forEach((relation, index) => {
    const originX = relation.labelX;
    const originY = relation.labelY;
    const candidates = [
      [0, 0], [0, -38], [0, 38], [-82, 0], [82, 0],
      [-82, -38], [82, -38], [-82, 38], [82, 38],
      [0, -76], [0, 76], [-164, 0], [164, 0],
    ];
    let candidateIndex = 0;
    while (
      routedRelations.slice(0, index).some(
        (placed) => Math.abs(placed.labelX - relation.labelX) < 104
          && Math.abs(placed.labelY - relation.labelY) < 34
      )
      && candidateIndex < candidates.length - 1
    ) {
      candidateIndex += 1;
      relation.labelX = Math.max(42, Math.min(canvasWidth - 42, originX + candidates[candidateIndex][0]));
      relation.labelY = Math.max(22, Math.min(canvasHeight - 22, originY + candidates[candidateIndex][1]));
    }
  });

  return (
      <div className="erd-domain-group">
        <h6>{group.title}</h6>
        <div className="erd-visual-wrap" aria-label={`${group.title} 논리 ERD 관계도`}>
        <svg
            className="erd-visual"
            viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
            role="img"
            aria-label="테이블과 관계선을 표시한 논리 ERD"
        >
          <g className="erd-connectors">
            {routedRelations.map((relation) => (
                <path
                    key={`${relation.key}-line`}
                    d={relation.route}
                    vectorEffect="non-scaling-stroke"
                    style={{ "--relation-color": relation.color }}
                />
            ))}
          </g>

          <g className="erd-nodes">
            {positions.map((node) => (
                <g key={node.name} transform={`translate(${node.x} ${node.y})`}>
                  <rect className="erd-node-body" width={boxWidth} height={boxHeight} rx="3" />
                  <rect className="erd-node-head" width={boxWidth} height="34" rx="3" />
                  <text className="erd-node-title" x="14" y="23">{node.name}</text>
                  {node.columns.slice(0, 5).map((column, columnIndex) => (
                      <text
                          className="erd-node-column"
                          x="15"
                          y={54 + columnIndex * 14}
                          key={column}
                      >
                        {columnIndex === 0 ? "PK  " : "     "}{column}
                      </text>
                  ))}
                </g>
            ))}
          </g>


          <g className="erd-relation-labels">
            {routedRelations.map((relation) => (
                <g
                    key={`${relation.key}-label`}
                    style={{ "--relation-color": relation.color }}
                >
                  <rect
                      className={`erd-relation-label-bg ${group.emphasizeRelationLabels ? "whisper-relation-label-bg" : ""}`}
                      x={relation.labelX - (group.emphasizeRelationLabels ? 58 : 43)}
                      y={relation.labelY - (group.emphasizeRelationLabels ? 17 : 13)}
                      width={group.emphasizeRelationLabels ? 116 : 86}
                      height={group.emphasizeRelationLabels ? 34 : 26}
                      rx={group.emphasizeRelationLabels ? 5 : 3}
                  />
                  <text
                      className={`erd-relation-label ${group.emphasizeRelationLabels ? "whisper-relation-label" : ""}`}
                      x={relation.labelX}
                      y={relation.labelY + (group.emphasizeRelationLabels ? 5 : 4)}
                      textAnchor="middle"
                  >
                    {relation.relationCode} · {relation.cardinality}
                  </text>
                </g>
            ))}
          </g>
        </svg>
        </div>
      </div>
  );
}

function ClearErdGroup({ design, group }) {
  const entityMap = Object.fromEntries(design.entities.map(([name, columns]) => [name, columns]));
  const relations = group.relationIndexes.map((relationIndex) => {
    const [from, cardinality, to, description] = design.relations[relationIndex];
    return {
      from,
      cardinality,
      to,
      description,
      relationCode: `R${relationIndex + 1}`,
      color: relationColors[relationIndex % relationColors.length],
    };
  });

  const renderEntityCard = (entityName) => {
    const columns = (entityMap[entityName] ?? "").split(",").map((column) => column.trim()).filter(Boolean);
    return (
        <article className="erd-crow-entity">
          <strong>{entityName}</strong>
          <div>
            {columns.map((column, columnIndex) => {
              const keyType = columnIndex === 0 ? "PK" : column.endsWith("_id") ? "FK" : "";
              return (
                  <code key={column}>
                    <b>{keyType}</b>
                    <span>{column}</span>
                  </code>
              );
            })}
          </div>
        </article>
    );
  };

  return (
      <section className="erd-domain-group erd-clear-group">
        <h6>{group.title}</h6>
        <div className="erd-clear-relations">
          {relations.map((relation) => (
              <div
                  className="erd-clear-relation"
                  key={`${relation.relationCode}-${relation.from}-${relation.to}`}
                  style={{ "--relation-color": relation.color }}
              >
                {renderEntityCard(relation.from)}
                <div className="erd-crow-connector">
                  <svg viewBox="0 0 340 76" role="img" aria-label={`${relation.from} 일대다 ${relation.to}`}>
                    <text x="170" y="15" textAnchor="middle">{relation.relationCode} · 비식별 관계</text>
                    <line className="erd-crow-main" x1="48" y1="40" x2="292" y2="40" />
                    <line className="erd-crow-mark" x1="38" y1="27" x2="38" y2="53" />
                    <line className="erd-crow-mark" x1="48" y1="27" x2="48" y2="53" />
                    <line className="erd-crow-mark" x1="292" y1="27" x2="292" y2="53" />
                    <line className="erd-crow-mark" x1="292" y1="40" x2="314" y2="22" />
                    <line className="erd-crow-mark" x1="292" y1="40" x2="314" y2="40" />
                    <line className="erd-crow-mark" x1="292" y1="40" x2="314" y2="58" />
                    <text className="erd-crow-cardinality" x="20" y="44">1</text>
                    <text className="erd-crow-cardinality" x="324" y="44">N</text>
                  </svg>
                </div>
                {renderEntityCard(relation.to)}
                <p>{relation.description}</p>
              </div>
          ))}
        </div>
      </section>
  );
}

function LogicalErdDiagram({ design }) {
  return (
      <div className="erd-domain-groups">
        {design.diagramGroups.map((group) => (
            <LogicalErdGroup key={group.title} design={design} group={group} />
        ))}
        <p className="erd-visual-note">
          업무 영역별로 엔터티를 분리 배치했습니다. 선의 색상과 R번호는 아래 테이블 관계표와 연결됩니다.
        </p>
      </div>
  );
}

function App() {

  const PORTFOLIO_PIN = "9999";
  const secretResumeMode = window.location.hash === "#resume";
  const MAINTENANCE = false;

  const [isUnlocked, setIsUnlocked] = useState(
      () => sessionStorage.getItem("portfolio-unlocked") === "1"
  );
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [screen, setScreen] = useState(secretResumeMode ? "select" : "intro");
  const [battle] = useState(false);
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [selectedApp, setSelectedApp] = useState(otherProjects[0]);
  const [resumeIndex, setResumeIndex] = useState(0);

  // ⭐ 여기 추가
  const copyToClipboard = async (text, message) => {

    try {

      await navigator.clipboard.writeText(text);

      alert(message);

    } catch {

      alert("복사에 실패했습니다.");

    }

  };

  const scrollTopHard = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  useEffect(() => {
    scrollTopHard();
  }, [screen]);

  const submitPin = (event) => {
    event.preventDefault();

    if (pin === PORTFOLIO_PIN) {
      sessionStorage.setItem("portfolio-unlocked", "1");
      setIsUnlocked(true);
      setPinError("");
      return;
    }

    setPin("");
    setPinError("비밀번호가 올바르지 않습니다.");
  };

  if (!isUnlocked) {
    return (
        <div className="pin-screen">
          <div className="stars" aria-hidden="true"></div>
          <form className="pin-card" onSubmit={submitPin}>
            <div className="pin-site-name">DOCUMENT</div>
            <h1>포트폴리오</h1>
            <p className="pin-guide">비밀번호 4자리를 입력해 주세요.</p>

            <input
                className="pin-input"
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                value={pin}
                onChange={(event) => {
                  const value = event.target.value.replace(/\D/g, "").slice(0, 4);
                  setPin(value);
                  setPinError("");
                }}
                placeholder="0000"
                autoFocus
                aria-label="4자리 비밀번호"
            />

            {pinError && <div className="pin-error">{pinError}</div>}

            <button className="pin-button" type="submit" disabled={pin.length !== 4}>
              확인
            </button>
          </form>
        </div>
    );
  }

  if (MAINTENANCE) {
    return (
        <div className="maintenance">
          <div className="maintenance-card">
            <div className="maintenance-title-row">
              <h1
                  className="secret-resume-title"
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    window.location.hash = "resume";
                    window.location.reload();
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      window.location.hash = "resume";
                      window.location.reload();
                    }
                  }}
              >
                현재는 본업에 집중하고 있습니다.
              </h1>
            </div>
            <p>
              현재 진행 중인 프로젝트와 업무에 집중하고 있어
              <br />
              포트폴리오는 잠시 비공개 상태입니다.
            </p>
            <p className="maintenance-sub">
              더 좋은 서비스와 프로젝트로 다시 찾아뵙겠습니다.
              <br />
              감사합니다.
            </p>
          </div>
        </div>
    );
  }

  const moveScreen = (target) => {
    if (target === screen) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    setScreen(target);

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  const moveToProjects = () => {
    document.getElementById("project-zone")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  if (screen === "intro") {
    return (
        <main className="intro-screen">
          <div className="stars"></div>
          <div className="intro-gate gate-left"></div>
          <div className="intro-gate gate-right"></div>

          <section className="intro-box">
            <p className="pixel-small">DEVELOPER PORTFOLIO</p>
            <h1>Full Stack Developer</h1>
            <h2>JUNG KYUNG SU</h2>
            <p className="intro-sub">생각을 구현하는 개발자</p>
            <button className="press-start" onClick={() => setScreen("select")}>
              포트폴리오 열기
            </button>
          </section>
        </main>
    );
  }

  if (screen === "select") {
    return (
        <main className="select-screen">
          <div className="stars"></div>
          <section className="select-wrap">
            <p className="pixel-small">DOCUMENT</p>
            <h1>자료 선택</h1>
            <div className="mode-grid">
              <button
                  type="button"
                  className="mode-card"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setScreen("portfolio-select");
                  }}
              >
                <span className="mode-icon">01</span>
                <strong>PORTFOLIO</strong>
                <p>프로젝트의 설계, 기능, 구현, 문제 해결과 배포 과정을 확인합니다.</p>
                <em>열기</em>
              </button>

              <button
                  type="button"
                  className="mode-card"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setScreen("resume");
                  }}
              >
                <span className="mode-icon">02</span>
                <strong>RESUME</strong>
                <p>자기소개, 경력, 기술스택, 성장 방향을 확인합니다.</p>
                <em>열기</em>
              </button>

              <button
                  type="button"
                  className="mode-card"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setScreen("download");
                  }}
              >
                <span className="mode-icon">03</span>
                <strong>DOWNLOAD</strong>
                <p>지원용 포트폴리오 PDF와 자기소개서 PDF를 바로 다운로드합니다.</p>
                <em>다운로드</em>
              </button>
            </div>
          </section>
        </main>
    );
  }

  if (screen === "download") {
    return (
        <main className="page download-page">
          <nav className="top-bar">
            <button onClick={() => moveScreen("select")}>MODE</button>
            <button onClick={() => moveScreen("portfolio-select")}>PORTFOLIO</button>
            <button onClick={() => moveScreen("resume")}>RESUME</button>
          </nav>

          <section className="download-wrap">
            <p className="section-label">DOWNLOAD</p>
            <h1>지원 자료 다운로드</h1>
            <p className="download-intro">
              포트폴리오 전체 프로젝트 자료와 자기소개서를 PDF로 확인할 수 있습니다.
            </p>

            <div className="download-grid">
              <a className="download-card" href="/downloads/정경수_포트폴리오.pdf?v=20261005c" download="정경수_포트폴리오.pdf">
                <span className="download-num">01</span>
                <div>
                  <small>포트폴리오 PDF</small>
                  <h2>포트폴리오</h2>
                  <p>웹 5개 · 앱 6개 · 기능 · 권한 · DB/ERD · 기술스택 · 문제 해결</p>
                  <strong>PDF DOWNLOAD ↓</strong>
                </div>
              </a>

              <a className="download-card" href="/downloads/정경수_자기소개서.pdf?v=20261005" download="정경수_자기소개서.pdf">
                <span className="download-num">02</span>
                <div>
                  <small>자기소개서 PDF · 7페이지</small>
                  <h2>자기소개서</h2>
                  <p>자기소개 · 나의 장점 · 현장 경험 · AI 활용 계획 · 입사 후 목표 · 경력 · 자격·수상</p>
                  <strong>PDF DOWNLOAD ↓</strong>
                </div>
              </a>
            </div>
          </section>
        </main>
    );
  }

  if (screen === "portfolio-select") {
    return (
        <main className="page portfolio-page overview-page">
          <nav className="top-bar overview-top-bar">
            <button onClick={() => moveScreen("select")}>MODE</button>
            <button onClick={() => moveScreen("resume")}>RESUME</button>
            <button onClick={() => moveScreen("download")}>DOWNLOAD</button>
          </nav>

        <section className="portfolio-profile-snapshot">
          <div>
            <p className="section-label">PROFILE SNAPSHOT</p>
            <h2>현장을 이해하고, 직접 구현하고, 배포까지 확인합니다.</h2>
            <p>약 11년의 리테일·물류 운영 경험을 바탕으로 개발로 전환했습니다. 현장에서 느낀 불편을 서비스 요구사항으로 바꾸고, 웹 5개·앱 6개를 기획·구현하며 DB 설계와 API 연동, Docker·AWS 배포까지 경험했습니다.</p>
          </div>
          <dl>
            <div><dt>ROLE</dt><dd>Full Stack Developer</dd></div>
            <div><dt>FOCUS</dt><dd>Spring Boot · Flutter · Service Implementation</dd></div>
            <div><dt>CERT</dt><dd>정보처리기사 · SQLD · ADsP · 리눅스마스터 2급</dd></div>
            <div><dt>WORK STYLE</dt><dd>구현 → 실행 → 오류 확인 → 수정 → 코드 분석</dd></div>
          </dl>
        </section>

        <section className="feedback-summary-section">
          <p className="section-label">TECH EXPERIENCE · AT A GLANCE</p>
          <h2>프로젝트를 열기 전에 기술 활용 범위를 먼저 보여드립니다.</h2>
          <p className="feedback-summary-lead">웹 5개와 앱 6개에서 실제로 사용한 기술을 프로젝트 활용 경험 기준으로 정리했습니다. 숫자 자체를 숙련도 점수로 해석하지 않도록 사용 범위와 함께 표시합니다.</p>
          <TechExperienceRadar />
        </section>

        <section className="feedback-summary-section">
          <p className="section-label">AI-ASSISTED DEVELOPMENT</p>
          <h2>AI는 결과물이 아니라 개발 과정의 보조 도구로 사용합니다.</h2>
          <p className="feedback-summary-lead">모델 학습·분류·추론을 직접 수행하는 전통적인 AI 엔지니어링과 구분하기 위해, 이 포트폴리오에서는 생성형 AI API 연동과 개발 보조를 <b>AI 활용 / AI-assisted Development</b>로 표기합니다.</p>
          <AiAssistedProcess />
        </section>

        <section className="overview-zone" id="project-overview">
          <div className="overview-head">
            <p className="section-label">PROJECT OVERVIEW</p>
            <h2>웹 5개 · 앱 6개, 구현 범위를 한눈에</h2>
            <p>
              현장 경험을 바탕으로 제조·물류, 자동화, 커머스, AI, 콘텐츠, 위치 기반 서비스까지
              직접 기획하고 구현했습니다. 아래에서는 각 프로젝트의 사용자 권한과 핵심 기능 범위를 먼저 요약하고,
              이어지는 상세 영역에서 DB 설계·ERD·기술 스택·문제 해결 과정을 확인할 수 있습니다.
            </p>
          </div>

          <div className="overview-block">
            <div className="overview-block-title">
              <span>01</span>
              <div><strong>WEB PROJECTS</strong><small>5 PROJECTS</small></div>
            </div>
            <div className="overview-list">
              <article className="overview-card overview-card-featured">
                <div className="overview-card-head"><span>WEB 01</span><h3>Tannus MES</h3></div>
                <p className="overview-desc">제조·물류 현장의 포장, 출고, 입고, 재고 흐름을 디지털화한 MES 시스템</p>
                <div className="overview-row"><b>권한</b><p>관리자 · 포장팀 · 물류팀</p></div>
                <div className="overview-row"><b>관리자</b><p>작업 현황 확인 · 재고 조회 · 수정 요청 승인/반려 · 무발주 예외 처리</p></div>
                <div className="overview-row"><b>포장/물류</b><p>포장지시 · QR 스캔 · 중복 처리 방지 · 출고 완료 · 입고 확정 · 재고 반영</p></div>
                                <div className="overview-project-tech">
                  <div className="overview-row overview-tech-row"><b>기술 활용</b><OverviewTechList items={[
                    ["Spring Boot", "백엔드 요청 처리와 입고·출고·재고 비즈니스 로직 구성"],
                    ["MyBatis", "재고·입출고·이력 SQL을 직접 작성하고 매핑"],
                    ["MySQL", "상품·포장지시·입출고·재고·이력 데이터 관리"],
                    ["JSP", "관리자·포장팀·물류팀 업무 화면 구성"],
                    ["Docker", "개발/배포 실행 환경을 컨테이너로 통일"],
                    ["AWS EC2", "외부 접속 가능한 실제 서비스 배포"],
                  ]} /></div>
                  <div className="overview-row overview-reason-row"><b>선택 이유</b><p>업무 로직과 SQL을 명확히 분리하고 재고·입출고 흐름을 직접 제어하며 실제 서버 배포까지 검증하기 위해 구성했습니다.</p></div>
                </div>
<div className="overview-tags"><span>권한 제어</span><span>QR</span><span>재고 이력</span><span>승인 프로세스</span><span>AWS</span></div>
              </article>

              <article className="overview-card">
                <div className="overview-card-head"><span>WEB 02</span><h3>AutoOrder</h3></div>
                <p className="overview-desc">현재고와 최소재고를 비교해 발주가 필요한 상품을 자동으로 생성하는 시스템</p>
                <div className="overview-row"><b>권한</b><p>관리자 · 직원</p></div>
                <div className="overview-row"><b>관리</b><p>상품·업체·현재고 관리 · 최소재고 · 업체별 발주요일 · 판매 데이터 등록</p></div>
                <div className="overview-row"><b>자동화</b><p>부족수량 계산 · 박스단위 올림 · 중복발주 방지 · 스케줄러 · 발주 상태 관리</p></div>
                                <div className="overview-project-tech">
                  <div className="overview-row overview-tech-row"><b>기술 활용</b><OverviewTechList items={[
                    ["Spring Boot", "재고 비교·발주 생성·판매 데이터 반영 비즈니스 로직 구성"],
                    ["MyBatis", "상품·업체·발주·재고 관련 SQL 직접 제어"],
                    ["MySQL", "현재고·최소재고·업체·발주·판매 이력 관리"],
                    ["JSP", "상품·업체·발주·판매 데이터 관리 화면 구성"],
                    ["Spring Scheduler", "정해진 시간의 자동발주 작업 실행"],
                    ["Docker", "실행 환경 표준화"],
                    ["AWS EC2", "서버 환경에서 스케줄러와 서비스 동작 검증"],
                  ]} /></div>
                  <div className="overview-row overview-reason-row"><b>선택 이유</b><p>재고 비교와 발주 생성 로직을 서비스로 분리하고 정해진 시각의 반복 발주 업무를 Scheduler로 자동화하기 위해 구성했습니다.</p></div>
                </div>
<div className="overview-tags"><span>Scheduler</span><span>자동발주</span><span>재고</span><span>중복 방지</span><span>Docker</span></div>
              </article>

              <article className="overview-card overview-card-featured">
                <div className="overview-card-head"><span>WEB 03</span><h3>ToyShop</h3></div>
                <p className="overview-desc">회원가입부터 상품 주문·결제·배송까지 연결한 전자상거래 서비스</p>
                <div className="overview-row"><b>권한</b><p>일반 회원 · 관리자</p></div>
                <div className="overview-row"><b>회원</b><p>회원가입/로그인 · 상품 조회 · 장바구니 · 주문 · 결제 · 주문내역 확인</p></div>
                <div className="overview-row"><b>관리자</b><p>상품 관리 · 주문 조회 · 주문/배송 상태 관리 · 운영 화면</p></div>
                                <div className="overview-project-tech">
                  <div className="overview-row overview-tech-row"><b>기술 활용</b><OverviewTechList items={[
                    ["Spring Boot", "회원·상품·주문·결제 비즈니스 로직 구성"],
                    ["Thymeleaf", "상품·장바구니·주문·관리자 화면 서버 렌더링"],
                    ["MyBatis", "회원·상품·주문 데이터 SQL 매핑 및 직접 제어"],
                    ["MySQL", "회원·상품·주문·결제·배송 데이터 관리"],
                    ["Toss Payments", "테스트 결제 승인과 결제 금액 검증"],
                    ["Docker", "실행 환경 통일"],
                    ["AWS EC2", "쇼핑몰 서비스 실제 배포"],
                  ]} /></div>
                  <div className="overview-row overview-reason-row"><b>선택 이유</b><p>회원·상품·주문·결제 영역을 계층 구조로 관리하고 실제 커머스 흐름에 가까운 결제 검증까지 구현하기 위해 구성했습니다.</p></div>
                </div>
<div className="overview-tags"><span>회원</span><span>장바구니</span><span>Toss 결제</span><span>주문</span><span>배송</span></div>
              </article>

              <article className="overview-card overview-card-featured">
                <div className="overview-card-head"><span>WEB 04</span><h3>WhisperMe</h3></div>
                <p className="overview-desc">사용자 장기 메모리·대화방 맥락·RAG·웹검색을 결합한 LLM 상담/생산성 서비스</p>
                <div className="overview-row"><b>LLM</b><p>상담형 LLM · 일반 LLM · Naver Search + LLM 질문 의도별 라우팅</p></div>
                <div className="overview-row"><b>Memory</b><p>사용자 공통 장기 메모리 · 대화방 맥락 메모리 분리 저장/초기화</p></div>
                <div className="overview-row"><b>RAG</b><p>TXT·MD·CSV → Chunk → Embedding → Cosine Similarity → 관련 문서 Context</p></div>
                <div className="overview-row"><b>서비스</b><p>이미지/파일 · 음성 입력 · 검색/즐겨찾기 · Todo · 날씨 · 전체화면 채팅</p></div>
                <div className="overview-project-tech">
                  <div className="overview-row overview-tech-row"><b>기술 활용</b><OverviewTechList items={[
                    ["React / Vite", "채팅·Memory·RAG 상태와 문서 관리 UI 구성"],
                    ["Spring Boot", "LLM 라우팅·메모리·RAG·외부 API 비즈니스 로직"],
                    ["MyBatis / MySQL", "회원·대화·Todo·Memory·RAG 문서/Chunk 데이터 관리"],
                    ["OpenAI API", "일반/상담 답변·검색 결과 정리·메모리 요약"],
                    ["OpenAI Embedding", "문서 Chunk와 질문의 의미 벡터 생성"],
                    ["Cosine Similarity", "질문과 문서 Chunk 유사도 계산·Top-K 선택"],
                    ["Naver Search API", "최신 정보 질문의 외부 검색"],
                    ["Docker Compose / Nginx", "Frontend·Backend·MySQL 통합 실행과 /api Proxy"],
                  ]} /></div>
                  <div className="overview-row overview-reason-row"><b>선택 이유</b><p>단순 AI API 호출을 넘어 사용자/대화방 메모리와 외부 문서 RAG를 직접 연결하고, 최신 정보는 별도 검색 경로로 분리해 질문 성격에 맞는 LLM Context를 구성하기 위해 설계했습니다.</p></div>
                </div>
                <div className="overview-tags"><span>LLM Routing</span><span>User Memory</span><span>Room Memory</span><span>RAG</span><span>Embedding</span><span>Web Search</span></div>
              </article>

              <article className="overview-card">
                <div className="overview-card-head"><span>WEB 05</span><h3>About J</h3></div>
                <p className="overview-desc">콘텐츠 탐색부터 AI Shorts 제작·YouTube 업로드까지 연결한 웹서비스</p>
                <div className="overview-row"><b>권한</b><p>관리자 · 일반 사용자</p></div>
                <div className="overview-row"><b>콘텐츠</b><p>영상 탐색/시청 · 이미지 검색 · AI 콘텐츠 생성 · Shorts 결과물 제작</p></div>
                <div className="overview-row"><b>연동</b><p>OpenAI/Gemini · Pexels · YouTube OAuth · 업로드 결과 확인</p></div>
                                <div className="overview-project-tech">
                  <div className="overview-row overview-tech-row"><b>기술 활용</b><OverviewTechList items={[
                    ["Spring Boot", "콘텐츠 생성 요청과 외부 API 흐름 제어"],
                    ["Thymeleaf", "검색·생성·결과·관리 화면 구성"],
                    ["MySQL", "사용자·생성 결과 등 서비스 데이터 관리"],
                    ["OpenAI / Gemini", "AI 기반 콘텐츠 생성 기능 연동"],
                    ["Pexels API", "Shorts 제작용 이미지 소재 검색"],
                    ["YouTube Data API / OAuth", "사용자 인증과 결과물 업로드 흐름 구현"],
                    ["AWS EC2", "웹서비스 운영 환경 배포"],
                  ]} /></div>
                  <div className="overview-row overview-reason-row"><b>선택 이유</b><p>콘텐츠 탐색·생성과 외부 AI/이미지/YouTube API 연동을 하나의 서비스 흐름으로 연결하기 위해 구성했습니다.</p></div>
                </div>
<div className="overview-tags"><span>AI 활용</span><span>Pexels</span><span>Shorts</span><span>YouTube OAuth</span><span>AWS</span></div>
              </article>
            </div>
          </div>

          <div className="overview-block overview-app-block">
            <div className="overview-block-title">
              <span>02</span>
              <div><strong>APP PROJECTS</strong><small>6 PROJECTS</small></div>
            </div>
            <div className="overview-list">
              <article className="overview-card">
                <div className="overview-card-head"><span>APP 01</span><h3>JKS MAKER</h3></div>
                <p className="overview-desc">Flutter 앱과 PC AI 서버를 연결한 AI 음악 생성·편집 앱</p>
                <div className="overview-row"><b>생성</b><p>AI 보컬 완성곡 · 장르/분위기/BPM/길이 설정 · 랜덤곡/설정 기반 생성</p></div>
                <div className="overview-row"><b>편집/파일</b><p>가사·싱크 · 미리듣기 · WAV 저장 · 라이브러리 · Remix/이어 만들기 구조</p></div>
                <div className="overview-row"><b>연동</b><p>Flutter · FastAPI · ACE-Step · Tailscale · 로컬 GPU 서버</p></div>
                                <div className="overview-project-tech">
                  <div className="overview-row overview-tech-row"><b>기술 활용</b><OverviewTechList items={[
                    ["Flutter", "음악 생성 설정·결과·파일 관리 모바일 UI 구성"],
                    ["FastAPI", "모바일 앱과 PC의 Python AI 서버를 연결하는 API 브리지"],
                    ["Python", "오디오·AI 처리 서버 로직 실행"],
                    ["AI Audio / ACE-Step", "보컬 포함 음악 생성 기능 연동"],
                    ["Tailscale", "모바일과 로컬 GPU PC를 사설 네트워크로 연결"],
                  ]} /></div>
                  <div className="overview-row overview-reason-row"><b>선택 이유</b><p>모바일 UI는 Flutter로 구성하고 Python 기반 오디오·AI 처리를 FastAPI 브리지와 연결해 로컬 GPU 서버까지 연동하기 위해 구성했습니다.</p></div>
                </div>
<div className="overview-tags"><span>Flutter</span><span>FastAPI</span><span>AI Audio</span><span>WAV</span><span>Tailscale</span></div>
              </article>

              <article className="overview-card overview-card-featured">
                <div className="overview-card-head"><span>APP 02</span><h3>스다스 작업관리</h3></div>
                <p className="overview-desc">택배 물량을 기준으로 공정별 인원·시간·급여를 계획하는 현장 작업관리 앱</p>
                <div className="overview-row"><b>관리</b><p>공정 등록 · 기준수량/시간 · 작업자 선택 · 시작시간 · 인원 배정 · 승인</p></div>
                <div className="overview-row"><b>일정</b><p>개인별 타임라인 · 작업 분할 · 중복배정 방지 · 점심/휴식/셋팅시간</p></div>
                <div className="overview-row"><b>계산</b><p>물량·인원 비례 시간 · 기준 초과/미달 · 잔업 1.5배 · 작업자별 임금</p></div>
                                <div className="overview-project-tech">
                  <div className="overview-row overview-tech-row"><b>기술 활용</b><OverviewTechList items={[
                    ["Flutter", "공정·작업자 배정과 시간표 UI를 모바일에서 구성"],
                    ["SQLite", "작업 기준·배정 결과를 기기 로컬에 저장"],
                    ["Timeline UI", "사람별·공정별 작업을 시간축으로 시각화"],
                  ]} /></div>
                  <div className="overview-row overview-reason-row"><b>선택 이유</b><p>현장 작업 배정과 시간축 UI를 빠르게 반복 개발하고 네트워크와 관계없이 작업 기준·배정 결과를 유지하기 위해 구성했습니다.</p></div>
                </div>
<div className="overview-tags"><span>Flutter</span><span>SQLite</span><span>Timeline</span><span>작업 배정</span><span>급여 계산</span></div>
              </article>

              <article className="overview-card overview-card-featured">
                <div className="overview-card-head"><span>APP 03</span><h3>JoWalking</h3></div>
                <p className="overview-desc">GPS와 걸음 센서로 이동 경로와 활동 기록을 저장·조회하는 앱</p>
                <div className="overview-row"><b>기록</b><p>GPS 위치 · 걸음 수 · 거리 · 이동 세션 · 날짜별 활동 기록</p></div>
                <div className="overview-row"><b>지도</b><p>경로 시각화 · 이동 좌표 기록 · 누락 구간 연결</p></div>
                <div className="overview-row"><b>데이터</b><p>세션별 RoutePoint · 일별 통계 · 저장된 이동 경로 조회</p></div>
                                <div className="overview-project-tech">
                  <div className="overview-row overview-tech-row"><b>기술 활용</b><OverviewTechList items={[
                    ["Flutter", "이동 기록·통계·지도 화면을 하나의 모바일 앱으로 구성"],
                    ["GPS", "사용자 위치와 이동 좌표 수집"],
                    ["Mapbox", "수집한 위치 데이터를 지도와 이동 경로로 시각화"],
                    ["Supabase", "세션·경로 등 원격 활동 기록 저장"],
                  ]} /></div>
                  <div className="overview-row overview-reason-row"><b>선택 이유</b><p>모바일에서 위치·기록·통계 화면을 구성하고 실제 이동 좌표를 수집·시각화하며 원격 기록을 저장하기 위해 구성했습니다.</p></div>
                </div>
<div className="overview-tags"><span>GPS</span><span>Mapbox</span><span>Background</span><span>Route</span><span>통계</span></div>
              </article>

              <article className="overview-card overview-card-featured">
                <div className="overview-card-head"><span>APP 04</span><h3>TranSu</h3></div>
                <p className="overview-desc">현재 위치를 기준으로 주변 버스정류장을 조회하는 공공데이터 기반 앱</p>
                <div className="overview-row"><b>위치</b><p>위치 권한 · 현재 좌표 · 근접 정류장 탐색 · 정류장 위치 표시</p></div>
                <div className="overview-row"><b>API</b><p>공공데이터 호출 · 인증키/좌표/응답 검증 · 오류 상태 구분</p></div>
                <div className="overview-row"><b>안정성</b><p>응답 파싱 · 캐시 구조 · API 장애와 앱 오류 분리 확인</p></div>
                                <div className="overview-project-tech">
                  <div className="overview-row overview-tech-row"><b>기술 활용</b><OverviewTechList items={[
                    ["Flutter", "위치 기반 정류장 검색 모바일 화면 구성"],
                    ["공공데이터 API", "주변 버스정류장 정보 조회"],
                    ["GPS", "현재 위치 좌표를 기준으로 근접 정류장 탐색"],
                    ["Cache", "반복 요청과 일시적인 API 지연을 고려한 데이터 처리"],
                  ]} /></div>
                  <div className="overview-row overview-reason-row"><b>선택 이유</b><p>현재 위치 기반 정류장 탐색과 외부 공공 API 호출을 연결하고 장애·지연 상황을 구분해 처리하기 위해 구성했습니다.</p></div>
                </div>
<div className="overview-tags"><span>공공 API</span><span>GPS</span><span>Cache</span><span>Error Handling</span></div>
              </article>

              <article className="overview-card">
                <div className="overview-card-head"><span>APP 05</span><h3>J-Battery</h3></div>
                <p className="overview-desc">홈·잠금화면의 배경과 배터리 캐릭터를 독립적으로 꾸미는 Android 앱</p>
                <div className="overview-row"><b>화면</b><p>홈/잠금 설정 분리 · 정지/움직이는 배경 · 사용자 이미지 적용</p></div>
                <div className="overview-row"><b>캐릭터</b><p>배터리/상단 캐릭터 선택 · 크기 · 위치 · 가로/세로 배율 조절</p></div>
                <div className="overview-row"><b>설정</b><p>미리보기 · 개별 저장 · 리소스 정리 · 배터리 아이콘 표시 옵션</p></div>
                                <div className="overview-project-tech">
                  <div className="overview-row overview-tech-row"><b>기술 활용</b><OverviewTechList items={[
                    ["Flutter", "배경·캐릭터 선택과 크기/위치 조절 UI 구성"],
                    ["Android / Kotlin 연동", "홈·잠금화면 등 Android 고유 기능 연결"],
                    ["Local Storage", "사용자가 선택한 배경·캐릭터·표시 설정 저장"],
                  ]} /></div>
                  <div className="overview-row overview-reason-row"><b>선택 이유</b><p>설정 UI는 Flutter로 빠르게 반복하고 홈·잠금화면 등 Android 고유 기능은 플랫폼 연동으로 처리하기 위해 구성했습니다.</p></div>
                </div>
<div className="overview-tags"><span>Flutter</span><span>Android</span><span>Wallpaper</span><span>Local Storage</span></div>
              </article>

              <article className="overview-card">
                <div className="overview-card-head"><span>APP 06</span><h3>World Radio</h3></div>
                <p className="overview-desc">국가·장르별 인터넷 라디오를 탐색하고 실시간 재생하는 스트리밍 앱</p>
                <div className="overview-row"><b>탐색</b><p>국가/장르 선택 · 방송국 검색 · 필터 · 방송국 정보 조회</p></div>
                <div className="overview-row"><b>재생</b><p>실시간 스트리밍 · 재생/정지 · 연결 실패 처리 · 플레이어 상태 관리</p></div>
                <div className="overview-row"><b>저장</b><p>즐겨찾기 · 최근 청취/캐시 논리 설계 · 로컬 설정</p></div>
                                <div className="overview-project-tech">
                  <div className="overview-row overview-tech-row"><b>기술 활용</b><OverviewTechList items={[
                    ["Flutter", "국가·장르·방송국 탐색과 플레이어 UI 구성"],
                    ["Radio API", "인터넷 라디오 방송국·스트림 정보 조회"],
                    ["Audio", "실시간 스트리밍 재생과 플레이어 상태 제어"],
                    ["Local Storage", "즐겨찾기와 사용자 설정 저장"],
                  ]} /></div>
                  <div className="overview-row overview-reason-row"><b>선택 이유</b><p>국가·장르 탐색과 스트리밍 플레이어를 하나의 앱으로 구성하고 재생 상태와 즐겨찾기 정보를 기기에서 관리하기 위해 구성했습니다.</p></div>
                </div>
<div className="overview-tags"><span>Flutter</span><span>Radio API</span><span>Audio</span><span>Favorites</span><span>Cache</span></div>
              </article>
            </div>
          </div>

          <div className="overview-core">
            <strong>CORE IMPLEMENTATION</strong>
            <div>
              <span>로그인/권한 분리</span><span>관리자 기능</span><span>CRUD</span><span>승인 프로세스</span>
              <span>재고/입출고</span><span>주문/결제/배송</span><span>자동화 스케줄러</span><span>공공 API</span>
              <span>AI API</span><span>GPS/지도</span><span>파일 저장</span><span>스트리밍</span><span>Docker/AWS</span>
            </div>
            <p>아래에서 WEB 또는 APP을 선택하면 프로젝트별 설계 배경, DB·ERD, 서비스 흐름, 기술 스택, 트러블슈팅을 자세히 확인할 수 있습니다.</p>
          </div>
        </section>

          <section className="overview-project-choice">
            <p className="section-label">SELECT PROJECT TYPE</p>
            <h2>상세 프로젝트 보기</h2>
            <p>전체 구현 범위를 확인했다면, 보고 싶은 프로젝트 유형을 선택해 주세요.</p>

            <div className="overview-choice-grid">
              <button
                  type="button"
                  className="overview-choice-card"
                  onClick={() => moveScreen("portfolio")}
              >
                <span>01</span>
                <strong>WEB</strong>
                <p>웹 서비스 5개의 DB 설계, ERD, 기능 구현, 트러블슈팅과 배포 과정을 확인합니다.</p>
                <em>WEB PROJECTS →</em>
              </button>

              <button
                  type="button"
                  className="overview-choice-card"
                  onClick={() => moveScreen("apps")}
              >
                <span>02</span>
                <strong>APP</strong>
                <p>모바일 앱 6개의 기능 설계, 데이터 구조, 구현 과정과 문제 해결 내용을 확인합니다.</p>
                <em>APP PROJECTS →</em>
              </button>
            </div>
          </section>
        </main>
    );
  }

  if (screen === "resume") {
    const current = resumeSections[resumeIndex];

    return (
        <main className="page resume-page">
          <nav className="top-bar">
            <button onClick={() => moveScreen("select")}>MODE</button>
            <button onClick={() => moveScreen("portfolio-select")}>PORTFOLIO</button>
            <button onClick={() => moveScreen("download")}>DOWNLOAD</button>
          </nav>

          <section className="resume-hero">
            <div className="avatar-card">
              <div className="profile-photo-wrap">
                <img src={profilePhoto} alt="정경수 프로필 사진" className="profile-photo" />
              </div>
              <p className="level-badge">PROFILE</p>
              <h1>JEONG KYUNGSOO</h1>
              <span className="job-title">Full Stack Developer</span>

              <div className="profile-info">
                {profileInfo.map((item) => (
                    <div className="profile-row" key={item.label}>
                      <strong>{item.label}</strong>
                      <span>{item.value}</span>
                    </div>
                ))}
              </div>
            </div>

            <div className="dialog-box">
              <h2>{current.title}</h2>
              <div className="dialog-text">

                {current.text.split("\n").map((line, index) => {

                  if(line.startsWith(">>>")){

                    return(
                        <p className="highlight-text" key={index}>
                          {line.replace(">>>", "")}
                        </p>
                    );

                  }

                  if(line===""){

                    return <br key={index}/>;

                  }

                  return <p key={index}>{line}</p>;

                })}

              </div>
              <div className="dialog-actions">
                <button onClick={() => setResumeIndex(Math.max(0, resumeIndex - 1))}>
                  PREV
                </button>

                <span className="page-indicator">
    {resumeIndex + 1} / {resumeSections.length}
  </span>

                <button onClick={() => setResumeIndex((resumeIndex + 1) % resumeSections.length)}>
                  NEXT
                </button>
              </div>
            </div>
          </section>

          <section className="resume-section">
            <p className="section-label">CORE COMPETENCIES</p>
            <h2>실무 경험 기반 역량</h2>

            <div className="status-board">
              {[
                ["Manufacturing", "11년 현장 경험", "full"],
                ["Logistics", "11년 현장 경험", "full"],

                ["Spring Boot", "프로젝트 적용", "sixty"],

                ["React", "프로젝트 적용", "forty"],

                ["Docker · AWS", "배포 경험", "sixty"],

                ["AI 활용", "API 연동·개발 보조", "eighty"],
              ].map(([name, star, level]) => (
                  <div className="status-row" key={name}>
                    <span>{name}</span>

                    <div className="status-bar">
                      <div className={`fill ${level}`}></div>
                    </div>

                    <strong>{star}</strong>
                  </div>
              ))}
            </div>
          </section>

          <section className="resume-section">
            <p className="section-label">EXPERIENCE</p>
            <h2>실제 구현 기반 기술</h2>

            <div className="skill-category-grid">
              {skillGroups.map((group) => (
                  <article className="skill-category-card" key={group.title}>
                    <h3>
                      {group.title}
                    </h3>

                    <div className="skill-grid">
                      {group.items.map((skill) => (
                          <span key={skill}>{skill}</span>
                      ))}
                    </div>
                  </article>
              ))}
            </div>
          </section>

          <section className="resume-section">
            <p className="section-label">CAREER TIMELINE</p>
            <h2>현장 경험에서 개발자로</h2>

            <div className="timeline">
              <article>
                <span>2013.11 ~ 2014.03</span>
                <h3>BNP</h3>
                <p>
                  CATIA 활용 장갑차(K200) 설계 보조<br />
                  • 조립 설계 지원<br />
                  • 스케치 및 어셈블리 작업<br />
                  • 제조·조립 공정 이해<br />
                </p>
              </article>

              <article>
                <span>2014.10 ~ 2024.08</span>
                <h3>트라이얼코리아</h3>
                <p>
                  10년간 점장 · 슈퍼바이저 근무<br />
                  • 재고 및 발주 관리<br />
                  • 일 매출 2~3천만 원 규모 운영<br />
                  • 직원 채용 및 교육<br />
                  • 고객 응대 및 클레임 관리<br />
                  • 손익 및 운영 전략 수립<br />
                  • 다점포 관리 경험
                </p>
              </article>
            </div>

            <div className="k-digital-line">
              <strong>K-디지털 트레이닝 6개월 과정</strong>
              <span>2024.08 ~2025.02</span>
              <em>Java · python · Spring Boot · MySQL</em>
            </div>

            <div className="timeline">
              <article>
                <span>2025.03 ~ 2026.04</span>
                <h3>타누스</h3>
                <p>
                  물류 · 출고 관리<br />
                  • 입·출고 관리<br />
                  • 재고 현황 관리<br />
                  • 지게차 상·하차<br />
                  • 국내 거래처 출고<br />
                  • 물류 프로세스 개선
                </p>
              </article>

              <article>
                <span>2026.07 ~ 2026.08</span>
                <h3>스다스</h3>
                <p>
                  물류 · 출고 관리<br />
                  • 생산 인원 셋팅 및 관리<br />
                  • 택배 출고량 조정 및 출고<br />
                  • 재고 현황 관리<br />
                  • 지게차 상·하차<br />
                  • 물류 프로세스 개선
                </p>
              </article>
            </div>

            <div className="timeline">
              <article className="career-wide">
                <span>2026.09 ~ 현재</span>
                <h3>한누리시스템</h3>
                <p>
                  정보통신 기술자 초급<br />
                  • 컴퓨터 유지보수<br />
                  • 통신장비 설치 및 보수
                </p>
              </article>
            </div>

            <p className="career-transition-note">
              다양한 현장 경험을 통해 업무 흐름과 사용자 관점을 익혔으며, 이제 이 경험을 개발 직무에서 활용하고자 합니다.
            </p>
          </section>


          <section className="resume-section">
            <p className="section-label">CERTIFICATE</p>
            <h2>자격 / 어학 / 수상</h2>

            <div className="certificate-list">
              {[
                { title: "정보처리기사", org: "한국산업인력공단", date: "2026.09", major: true },
                { title: "데이터분석준전문가(ADsP)", org: "한국데이터산업진흥원(K-DATA)", date: "2026.03", major: true },
                { title: "SQL 개발자(SQLD)", org: "한국데이터산업진흥원", date: "2025.12", major: true },
                { title: "지게차운전기능사", org: "한국산업인력공단", date: "2025.12" },
                { title: "리눅스마스터 2급", org: "한국정보통신인재개발센터", date: "2025.10", major: true },
                { title: "JLPT N4", org: "N4 취득", date: "2024.12" },
              ].map((c, index) => (
                <article className={`cert-card ${c.major ? "major-cert" : ""}`} key={c.title}>
                  <div className="cert-icon">{String(index + 1).padStart(2, "0")}</div>
                  <div className="cert-info">
                    <h3>
                      {c.title}
                      {c.major && <span className="major-badge">IT</span>}
                    </h3>
                    <p>{c.org}</p>
                  </div>
                  <span>{c.date}</span>
                </article>
              ))}

              <details className="older-certs">
                <summary>이전 자격 · 수상 펼쳐보기 <span>2014년 이전 6건</span></summary>
                <div className="older-certs-list">
                  {[
                    { title: "MOS Master", org: "Microsoft", date: "2014.04" },
                    { title: "학생 포트폴리오경진대회 장려상", org: "창원대학교 공학교육혁신센터", date: "2013.06" },
                    { title: "워드프로세서 1급", org: "대한상공회의소", date: "2013.05" },
                    { title: "한자능력검정 3급", org: "한국어문회", date: "2012.10" },
                    { title: "1종 보통운전면허", org: "경찰청(운전면허시험관리단)", date: "2010.07" },
                    { title: "로타랙트 클럽 표창장", org: "국제로타리", date: "2010.04" },
                  ].map((c, index) => (
                    <article className="cert-card" key={c.title}>
                      <div className="cert-icon">{String(index + 7).padStart(2, "0")}</div>
                      <div className="cert-info">
                        <h3>{c.title}</h3>
                        <p>{c.org}</p>
                      </div>
                      <span>{c.date}</span>
                    </article>
                  ))}
                </div>
              </details>
            </div>
          </section>

          <section className="ending">
            <div className="contact-card">

              <h3>CONTACT</h3>

              <p
                  className="contact-copy"
                  onClick={() =>
                      copyToClipboard(
                          "zzangmait1524@gmail.com",
                          "이메일이 복사되었습니다."
                      )
                  }
              >
                zzangmait1524@gmail.com
              </p>

              <p
                  className="contact-copy"
                  onClick={() =>
                      copyToClipboard(
                          "01072101527",
                          "전화번호가 복사되었습니다."
                      )
                  }
              >
                010-7210-1527
              </p>

              <a
                  href="https://github.com/BowWowBow"
                  target="_blank"
                  rel="noopener noreferrer"
              >
                github.com/BowWowBow
              </a>

              <p>Gimhae, Republic of Korea</p>

            </div>

          </section>
        </main>
    );
  }

  if (screen === "apps") {
    return (
        <main className="page portfolio-page app-portfolio-page">
          <nav className="top-bar">
            <button onClick={() => moveScreen("select")}>MODE</button>
            <button onClick={() => moveScreen("resume")}>RESUME</button>
            <button onClick={() => moveScreen("portfolio-select")}>PORTFOLIO</button>
            <button onClick={() => moveScreen("portfolio")}>WEB</button>
            <button onClick={() => moveScreen("download")}>DOWNLOAD</button>
          </nav>

          <section className="project-zone app-project-zone">
            <p className="section-label">APP PROJECTS</p>
            <h2>모바일 앱 프로젝트</h2>
            <p className="app-project-intro">
              생활과 현장 업무에서 발견한 문제를 모바일 앱 6개로 직접 기획하고 구현했습니다.
            </p>

            <div className="project-grid app-project-grid">
              {otherProjects.map((project, index) => (
                  <article className={`project-card app-project-card ${["스다스 작업관리", "JoWalking", "TranSu"].includes(project.title) ? "core-project" : ""} ${selectedApp.title === project.title ? "active" : ""}`} key={project.title} onClick={() => setSelectedApp(project)} role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setSelectedApp(project); }} aria-pressed={selectedApp.title === project.title}>
                    <span>APP {String(index + 1).padStart(2, "0")}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="other-project-stacks">
                      {project.stacks.map((stack) => (
                          <span key={stack}>{stack}</span>
                      ))}
                    </div>
                    <div className="app-data-design">
                      <strong>DATA DESIGN</strong>
                      <span>{project.dataDesign}</span>
                    </div>
                  </article>
              ))}
            </div>

            <p className="app-detail-instruction">프로젝트 카드를 선택하면 아래에서 상세 설계와 트러블슈팅을 확인할 수 있습니다.</p>
            <AppCaseStudy project={selectedApp} />
            <p className="project-count-note">
              WEB 5 · APP 6 · TOTAL 11
            </p>
          </section>

        </main>
    );
  }

  return (
      <main className={`page portfolio-page ${battle ? "shake" : ""}`}>
        <nav className="top-bar">
          <button onClick={() => moveScreen("select")}>MODE</button>
          <button onClick={() => moveScreen("resume")}>RESUME</button>
          <button onClick={() => moveScreen("apps")}>APP</button>
          <button onClick={() => moveScreen("download")}>DOWNLOAD</button>
          <button onClick={moveToProjects}>PROJECTS</button>
        </nav>

        <section className="hero-section">
          <div className={`battle-stage ${battle ? "battle-on" : ""}`} aria-hidden="true">
            <div className="bug"></div>
            <div className="impact impact-a"></div>
            <div className="impact impact-b"></div>
            <div className="slash"></div>

            <div className="battle-text">BUG FIX!</div>
          </div>

          <div className="hero-copy">
            <p className="section-label">PORTFOLIO</p>
            <h1>
              Full Stack Developer
            </h1>
            <h2>생각을 구현하는 개발자</h2>
            <p>
              현장에서 얻은 경험을 바탕으로 실제 업무의 문제를 서비스로 구현합니다.
              프론트엔드, 백엔드, 데이터베이스, Docker, AWS 배포까지 직접 경험했습니다.
            </p>
            <div className="hero-buttons">
              <button className="main-btn" onClick={moveToProjects}>
                프로젝트 보기
              </button>
            </div>
          </div>
        </section>



        <section className="project-zone" id="project-zone">
          <p className="section-label">PROJECTS · DETAIL</p>
          <h2>실제 경험을 서비스로 구현한 프로젝트</h2>

          <div className="project-grid">
            {projects.map((project) => (
                <article
                    className={`project-card ${["tannus", "toyshop", "whisperme"].includes(project.id) ? "core-project" : ""} ${selectedProject.id === project.id ? "active" : ""}`}
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                >
                  <div className="project-icon">{project.icon}</div>
                  <span>LV.{project.level}</span>

                  <div className="project-medals">
                    {project.badges.map((badge) => (
                        <div key={badge.text} className={`medal ${badge.class}`}>
                          {badge.text}
                        </div>
                    ))}
                  </div>

                  <h3>{project.title}</h3>

                  <p>{project.type}</p>

                  <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                  >
                    홈페이지 이동
                  </a>
                </article>
            ))}

          </div>

          <div className="project-detail">
            <div className={`detail-head ${selectedProject.id === "aboutj" ? "detail-head-aboutj" : ""}`}>
              <div>
                <p className="section-label">Project</p>
                <h2>
                  {selectedProject.title}
                </h2>
                <p>{selectedProject.summary}</p>
                <div className="project-meta" aria-label="프로젝트 개발 정보">
                  {(selectedProject.meta ?? []).map((item) => (
                      <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
              <div className="detail-buttons">
                {selectedProject.excel && (
                    <a
                        className="excel-btn"
                        href={selectedProject.excel}
                        download
                    >
                      Excel
                    </a>
                )}
                {selectedProject.github && <a
                    className="visit-btn"
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  README
                </a>}

                {selectedProject.demo && <a
                    className="demo-btn"
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  DEMO
                </a>}
              </div>
            </div>

            <section className="project-download-box">
              <div className="project-download-copy">
                <span>DOCUMENTS</span>
                <h3>지원 자료 다운로드</h3>
                <p>포트폴리오 PDF와 자기소개서 PDF는 상단 DOWNLOAD 메뉴에서 받을 수 있습니다.</p>
              </div>
            </section>

            {selectedProject.accounts?.length > 0 && <div className={`account-card${selectedProject.id === "aboutj" ? " account-card-aboutj" : ""}`}> 

              <h3>Demo Account</h3>

              {(selectedProject.accounts ?? []).map((account) => (

                  <div className="account-row" key={account.id}>

                    <strong>{account.role}</strong>

                    <span>ID : {account.id}</span>

                    <span>PW : {account.pw}</span>

                  </div>

              ))}

              {(selectedProject.id === "toyshop" ||
                  selectedProject.id === "whisperme") && (

                  <p className="join-text">
                    회원가입도 가능합니다.
                  </p>

              )}

            </div>}

            <div className="detail-grid">
              <article>
                <h3>기술 스택</h3>
                <div className="chip-wrap">
                  {selectedProject.stacks.map((stack) => (
                      <span key={stack}>{stack}</span>
                  ))}
                </div>
              </article>

              <article>
                <h3>주요 기능</h3>
                <ul>
                  {selectedProject.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </article>

              <article className="wide">
                <h3>서비스 흐름도</h3>
                <div className="flow-line">
                  {(selectedProject.flow ?? []).map((item, index) => (
                      <div className="flow-item" key={item}>
                        <span>{item}</span>
                        {index < (selectedProject.flow ?? []).length - 1 && <b>→</b>}
                      </div>
                  ))}
                </div>
              </article>

              <article className="wide feedback-block">
                <h3>실제 구현 화면</h3>
                <p className="feedback-block-note">완료된 서비스 화면을 한눈에 확인할 수 있도록 영역을 먼저 확보했습니다. 실제 캡처 이미지는 프로젝트별 대표 흐름에 맞춰 순서대로 교체합니다.</p>
                <ScreenshotSlots items={webFeedbackEnhancements[selectedProject.id].screenshots} projectId={selectedProject.id} />
              </article>

              <article className="wide feedback-block">
                <h3>기술 선택 이유</h3>
                <TechReasonList items={webFeedbackEnhancements[selectedProject.id].techReasons} />
                <p className="implementation-boundary">※ 실제 적용이 확인되지 않은 CQRS·Observer·JPA/ORM 등의 패턴은 포트폴리오에 임의로 추가하지 않았습니다.</p>
              </article>

              <article className="wide feedback-block">
                <h3>시스템 아키텍처 · 모듈 관계</h3>
                <p className="feedback-block-note">단순 파이프라인보다 요청이 어느 계층을 지나고 어떤 데이터/외부 서비스와 연결되는지 보여주는 구성입니다.</p>
                <ArchitectureDetail rows={webFeedbackEnhancements[selectedProject.id].architecture} />
              </article>

              <article className="wide design-stage-section">
                <h3>프로젝트 설계 단계</h3>
                <div className="design-steps">
                  <section>
                    <span>01</span>
                    <h4>문제 정의</h4>
                    <p>{projectDesigns[selectedProject.id].goal}</p>
                  </section>
                  <section>
                    <span>02</span>
                    <h4>요구사항 정리</h4>
                    <ul>
                      {projectDesigns[selectedProject.id].requirements.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </section>
                  <section>
                    <span>03</span>
                    <h4>ERD · 데이터 설계</h4>
                    <div className="erd-design-table">
                      {projectDesigns[selectedProject.id].erd.map(([domain, entities, description]) => (
                          <div key={domain}>
                            <strong>{domain}</strong>
                            <code>{entities}</code>
                            <p>{description}</p>
                          </div>
                      ))}
                    </div>

                    <h5>논리 ERD · 핵심 엔터티</h5>
                    <p className="erd-version-note">{selectedProject.id === "aboutj" ? "콘텐츠 제작·업로드 구조 설명을 위한 논리 ERD · 운영 DB 테이블 확정 정보가 아닙니다." : selectedProject.id === "whisperme" ? "WhisperMe v3 · 실제 Memory/RAG 저장 구조를 반영한 논리 ERD" : "ERD v3.1 · 업무 영역별 엔터티 배치와 정렬된 R번호·1:N 관계도"}</p>
                    <LogicalErdDiagram design={projectDesigns[selectedProject.id]} />
                    <details className="erd-details">
                      <summary>관계별 설계 의도 자세히 보기 ({projectDesigns[selectedProject.id].relations.length}건)</summary>
                      <div className="erd-relation-list">
                      {projectDesigns[selectedProject.id].relations.map(([from, cardinality, to, description], relationIndex) => (
                          <div
                              className="erd-relation"
                              key={`${from}-${to}`}
                              style={{ "--relation-color": relationColors[relationIndex % relationColors.length] }}
                          >
                            <strong><em className="erd-relation-code">R{relationIndex + 1}</em>{from}</strong>
                            <span>{cardinality}</span>
                            <strong>{to}</strong>
                            <p>{description}</p>
                          </div>
                      ))}
                      </div>
                    </details>
                  </section>
                  <section>
                    <span>04</span>
                    <h4>전체 시스템 구조</h4>
                    <div className="architecture-diagram">
                      {projectDesigns[selectedProject.id].architecture.map((layer, index) => (
                          <div className="architecture-node" key={layer}>
                            <strong>{layer}</strong>
                            {index < projectDesigns[selectedProject.id].architecture.length - 1 && <span>→</span>}
                          </div>
                      ))}
                    </div>
                  </section>
                  <section>
                    <span>05</span>
                    <h4>구현 및 검증</h4>
                    <p>{projectDesigns[selectedProject.id].verification}</p>
                  </section>
                </div>
              </article>

              {selectedProject.codes?.length > 0 && <article className="wide">
                <h3>핵심 구현 코드</h3>
                <div className="code-grid">
                  {(selectedProject.codes ?? []).map((item) => (
                      <div key={item.title}>
                        <strong>{item.title}</strong>
                        <pre>{item.code}</pre>
                      </div>
                  ))}
                </div>
              </article>}

              {selectedProject.integrations?.length > 0 && <article className="wide">
                <h3>API / 자동화 연동</h3>
                <div className="integration-grid">
                  {(selectedProject.integrations ?? []).map((item) => (
                      <div className="integration-card" key={item.title}>
                        <strong>{item.title}</strong>
                        <p>{item.desc}</p>
                        <pre>{item.code}</pre>
                      </div>
                  ))}
                </div>
              </article>}

              <article className="wide">
                <h3>{selectedProject.id === "aboutj" ? "AWS · 환경 설정" : "Docker / AWS 배포"}</h3>
                {selectedProject.id === "aboutj" ? <p>Spring Boot 기반 서비스를 AWS EC2에 배포하고, 로컬 프로필과 운영 환경변수·OAuth 인증 구성을 분리했습니다. 비밀번호·API 키·토큰은 포트폴리오에 노출하지 않습니다.</p> : <p>
                  Spring Boot 프로젝트는 jar 빌드 후 Docker 컨테이너로 실행했고,
                  React 프로젝트는 Vite 빌드 후 정적 파일을 서비스했습니다.
                  AWS EC2 보안그룹에서 프로젝트별 포트를 열고 실제 외부 접속까지 확인했습니다.
                </p>}
                {selectedProject.id !== "aboutj" && <pre>{`docker ps
docker logs container-name --tail=100
docker compose up -d --build`}</pre>}
              </article>

              <article className="wide">
                <h3>트러블슈팅</h3>

                <div className="trouble-grid">
                  {(selectedProject.troubleshooting ?? []).map((item) => (
                      <div className="trouble-card" key={item.title}>
                        <strong>{item.title}</strong>

                        <p>
                          <b>문제</b>
                          {item.problem}
                        </p>

                        <p>
                          <b>해결</b>
                          {item.solve}
                        </p>
                      </div>
                  ))}
                </div>
              </article>

              <article className="wide feedback-block future-plan-block">
                <h3>향후 개선 계획</h3>
                <p className="feedback-block-note">현재 구현을 기준으로 다음 단계에서 개선할 수 있는 기술적 과제를 정리했습니다. 이미 구현된 기능과 향후 계획을 구분해 표기합니다.</p>
                <FuturePlanList items={webFeedbackEnhancements[selectedProject.id].future} />
              </article>
            </div>
          </div>
        </section>

        <section className="ending">
          <div className="contact-card">

            <h3>CONTACT</h3>

            <p
                className="contact-copy"
                onClick={() =>
                    copyToClipboard(
                        "zzangmait1524@gmail.com",
                        "이메일이 복사되었습니다."
                    )
                }
            >
              zzangmait1524@gmail.com
            </p>

            <p
                className="contact-copy"
                onClick={() =>
                    copyToClipboard(
                        "01072101527",
                        "전화번호가 복사되었습니다."
                    )
                }
            >
              010-7210-1527
            </p>

            <a
                href="https://github.com/BowWowBow"
                target="_blank"
                rel="noopener noreferrer"
            >
              github.com/BowWowBow
            </a>

            <p>Gimhae, Republic of Korea</p>

          </div>

        </section>
      </main>
  );
}

export default App;
