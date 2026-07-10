import { useState } from "react";
import "./App.css";
import profilePhoto from "./assets/profile.jpg";
import robot from "./assets/robot.png";

const projectLinks = {
  tannus: "http://43.203.123.217:8080",
  autoorder: "http://43.203.123.217:8081",
  toyshop: "http://43.203.123.217:8082",
  whisperme: "http://43.203.123.217:5173",
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
    icon: "🏭",
    title: "Tannus MES",

    badges: [
      { text: "🏅 개인 실무 프로젝트", class: "badge-work" },
      { text: "🖥 모든 기능 사용 가능", class: "badge-service" },
      { text: "🟢 AWS 배포", class: "badge-deploy" },
      { text: "🐳 Docker", class: "badge-docker" },
      { text: "💻 GitHub", class: "badge-github" },
    ],

    type: "제조 / 물류 관리 시스템",
    level: 40,
    url: projectLinks.tannus,
    github: githubLinks.tannus,
    demo: demoLinks.tannus,
    summary:
        "🏭 Tannus MES\n" +
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
    icon: "📦",
    title: "AutoOrder",

    badges: [
      { text: "🏅 개인 실무 프로젝트", class: "badge-work" },
      { text: "🖥 모든 기능 사용 가능", class: "badge-service" },
      { text: "🟢 AWS 배포", class: "badge-deploy" },
      { text: "🐳 Docker", class: "badge-docker" },
      { text: "💻 GitHub", class: "badge-github" },
    ],
    type: "소매 자동발주 시스템",
    level: 32,
    url: projectLinks.autoorder,
    github: githubLinks.autoorder,
    demo: demoLinks.autoorder,
    summary:
        "📦 AutoOrder\n" +
        "\n" +
        "재고를 분석하여 자동으로 발주를 생성하는 시스템",
    stacks: ["Java", "Spring Boot", "JSP", "MyBatis", "MySQL", "Scheduler", "Docker", "AWS"],
    features: [
      "현재고와 최소재고 비교",
      "업체별 발주 요일 관리",
      "추천 발주 수량 자동 계산",
      "입고 완료 시 재고 자동 반영",
      "발주 상태 WAITING / CONFIRMED 관리",
    ],
    flow: ["상품 재고 확인", "최소재고 비교", "발주 수량 계산", "발주 생성", "입고 후 재고 반영"],

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
        title: "입고 후 재고 자동 반영",
        desc: "발주 확정 후 입고 처리 시 상품 재고를 자동으로 증가시켰습니다.",
        code: `product.setCurrentQty(
    product.getCurrentQty() + receivedQty
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
        solve: "업체별 발주 요일과 입고 요일을 기준으로 오늘 발주 대상만 자동 생성되도록 처리했습니다.",
      },
    ],
  },
  {
    id: "toyshop",
    icon: "🧸",
    title: "ToyShop",
    badges: [
      { text: "🏅 개인 프로젝트", class: "badge-personal" },
      { text: "🖥 모든 기능 사용 가능", class: "badge-service" },
      { text: "🟢 AWS 배포", class: "badge-deploy" },
      { text: "🐳 Docker", class: "badge-docker" },
      { text: "💻 GitHub", class: "badge-github" },
    ],

    type: "쇼핑몰 프로젝트",
    level: 25,
    url: projectLinks.toyshop,
    github: githubLinks.toyshop,
    demo: demoLinks.toyshop,
    summary:
        "🧸 ToyShop\n" +
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
    icon: "🐳",
    title: "WhisperMe",
    badges: [
      { text: "🏅 개인 프로젝트", class: "badge-personal" },
      { text: "🖥 모든 기능 사용 가능", class: "badge-service" },
      { text: "🤖 AI 서비스", class: "badge-ai" },
      { text: "🟢 AWS 배포", class: "badge-deploy" },
      { text: "🐳 Docker", class: "badge-docker" },
      { text: "💻 GitHub", class: "badge-github" },
    ],
    type: "AI 상담 웹앱",
    level: 35,
    url: projectLinks.whisperme,
    github: githubLinks.whisperme,
    demo: demoLinks.whisperme,
    summary:
        "🐳 WhisperMe\n" +
        "\n" +
        "OpenAI 기반 AI 상담 및 생산성 웹서비스",
    stacks: ["React", "Spring Boot", "MyBatis", "MySQL", "OpenAI API", "Docker", "AWS"],
    features: [
      "AI 채팅과 대화방 관리",
      "이미지 업로드 및 AI 분석",
      "오늘 할 일 / 미래 일정 / 지난 내역 관리",
      "날씨와 운세 기능",
      "React 프론트와 Spring Boot 백엔드 분리 배포",
    ],
    flow: ["채팅방 생성", "메시지 입력", "AI 요청", "답변 저장", "대화 기록 조회"],

    codes: [
      {
        title: "OpenAI 대화 요청",
        code: `String answer = openAiService.askWithHistory(messages);

chatMessageMapper.insertAssistantMessage(roomId, answer);`
      },
      {
        title: "이미지 분석 요청",
        code: `String result = openAiService.askWithImage(
    prompt,
    imageBase64
);`
      },
    ],
    integrations: [
      {
        title: "OpenAI API",
        desc: "OpenAI API를 활용해 텍스트 대화와 이미지 분석 답변을 생성했습니다.",
        code: `openAiService.askWithHistory(messages);`
      },
      {
        title: "날씨 / 위치 API",
        desc: "브라우저 위치 정보를 기반으로 날씨 정보를 불러와 사용자에게 표시했습니다.",
        code: `navigator.geolocation.getCurrentPosition(
    successCallback,
    errorCallback
);`
      },
      {
        title: "음성 인식",
        desc: "Web Speech API를 활용해 한국어 음성 입력 기능을 구현했습니다.",
        code: `recognition.lang = "ko-KR";
recognition.start();`
      },
      {
        title: "네이버 뉴스 검색 API",
        desc: "최신 정보가 필요한 질문은 Naver Search API로 검색 후 AI 답변에 반영했습니다.",
        code: `if (questionRouter.needSearch(question)) {
    List<NewsDto> news =
        naverSearchService.search(keyword);

    return aiService.answerWithNews(question, news);
}`
      },
    ],
    troubleshooting: [
      {
        title: "localhost API 문제",
        problem: "AWS 배포 후 프론트에서 localhost로 API를 호출해 백엔드 연결이 실패했습니다.",
        solve: "API 주소를 EC2 퍼블릭 IP 기준으로 변경하여 외부 브라우저에서도 정상 호출되게 했습니다.",
      },
      {
        title: "모바일 채팅창 깨짐",
        problem: "모바일에서 100vh와 fixed 입력창 때문에 채팅 입력창이 잘렸습니다.",
        solve: "100dvh와 flex column 구조를 적용하고 safe-area를 고려했습니다.",
      },
      {
        title: "이미지 분석 요청 처리",
        problem: "이미지와 텍스트를 함께 보낼 때 AI 요청 형식이 맞지 않아 분석이 실패했습니다.",
        solve: "이미지를 Base64로 변환하고 텍스트 프롬프트와 함께 요청하도록 구조를 분리했습니다.",
      },
      {
        title: "대화방 자동 선택",
        problem: "새 채팅방을 만든 뒤 바로 선택되지 않아 사용자가 다시 방을 클릭해야 했습니다.",
        solve: "채팅방 생성 응답을 받은 후 selectedRoom을 즉시 갱신하고 메시지 입력 화면으로 연결했습니다.",
      },
    ],
  },
];

const resumeSections = [

  {
    tag: "INTRO",

    title: "안녕하세요. 개발자 정경수입니다.",

    text: `

저는 약 11년 동안 물류, 재고, 입출고, 매장 운영 등 
다양한 현장을 경험했습니다.

현장에서 직접 부딪히며 업무의 흐름과 사용자의 불편함,
그리고 시스템이 업무를 얼마나 바꿀 수 있는지를
몸소 경험했습니다.
>>> 그 경험은 '사용하는 사람'에서 '직접 만드는 사람'으로
>>> 도전하는 계기가 되었습니다.

새로운 기술을 배우는 것을 즐기며 현장의 경험을 기술로 연결하고
사용자에게 더 나은 가치를 제공하는 개발자가 되기 위해
오늘도 성장하고 있습니다.

`,
  },
  {
    tag: "MOTIVATION",

    title: "왜 개발자를 하려고 하는가?",

    text: `

저는 약 11년 동안 물류와 유통 현장에서 근무했습니다.

현장에서 근무하며 산업 환경이 빠르게 변화하는 모습을 직접 경험했습니다.
온라인 시장과 자동화 시스템이 발전할수록, 오프라인시장은 줄어드는
시기인 만큼 저 역시 변화를 해야겠다는 생각이 들었습니다.

그런 생각을 하고 있을 때 시스템이라는 것이 눈에 들어왔습니다.

잘 구축된 시스템은 단순히 업무를 편하게 만드는 것이 아니라,
실수를 줄이고 업무 효율을 높이며 회사의 경쟁력을 높이는 중요한 요소라고 생각합니다
특히 현장에서 근무할수록 시스템 하나가 업무의 정확성과 생산성,
그리고 사용자 편의성을 얼마나 크게 바꿀 수 있는지 직접 경험했습니다.

>>> 그러나 무엇보다 사용자의 중심이 아닌 개발자의 중심 그리고 
>>> 커뮤니케이션의 부재로 개발시간이 길어지는 경우를 많이 보았습니니다.
>>> '조금만 개선되면 더 편할 텐데'라는 생각을 자주 했고,
>>> 언젠가는 직접 그런 서비스를 만들어 보고 싶다는 목표를 
>>> 가지게  되었습니다.

적지 않은 나이에 새로운 도전을 시작하는 것이 쉽지는 않았지만,
지금이 가장 늦지 않은 시기라고 생각했습니다.
K-Digital 교육을 수료하며 개발을 시작했고,
프로젝트를 직접 만들고 AI를 적극 활용하면서 개발 역량을 키워왔습니다.

아직 부족한 점은 분명 있지만, 배우는 것을 두려워하지 않고 끝까지 
해결하려는 책임감과 실행력은 자신 있습니다.
앞으로도 꾸준히 성장하며 사용자에게 도움이 되는 서비스를 만드는 개발자가 되고 싶습니다.

`,
  },
  {
    tag: "SERVICE BUILDER",

    title: "아이디어를 현실의 서비스로 만드는 개발자",

    text: `

제가 현장검험이 필요한 부분에 대해서는 적극 반영을 하고 
기술로 해결하는 서비스를 만드는 것을 목표로 합니다.

>>>11년간의 물류·재고·현장 경험을 바탕으로 그리고 AI기반으로
>>>MES
>>>자동발주
>>>ToyShop
>>>WhisperMe
>>>총 4개의 프로젝트를 직접 기획하고 개발했습니다.

개발은 많은 것들을 포함하고 있습니다.
개발을 하다보면 이런저런 기능들을 필요하곤 합니다.
사용자의 측면에서 보면 기능 기능 마다의 위치 그리고 기능을 
최적화하게 만듭니다.
위치기반, 결제시스템, 메일송수신, QR 바코드, AI기반 등 
단순히 알고 있는 것 보다는 구현을 해봐야지 나의 것이 됩니다.
그리고 도커, AWS 배포 역시 마찬가지입니다.

>>>특히 MES같은 경우 정형화된 시스템이 아니기에 사용자와 
>>>개발자간의 신뢰가 중요하다고 생각됩니다.
>>>개발자는 어떻게하면 사용자가 편하게 시스템을 쓸수 있을까,
>>>사용자는 복잡한 것 보단 간소화와 시각적으로 한눈에 들어와야 할겁니다.

그 다음은 AI를 접목한 AI Memory, AI Agent등 AI를 이용한 것을 하고
싶으며, AI를 적극 활용하여 좀 더 빠른 개발과 빠른 습득을 하는 것을 목표로 하고 있습니다.
AI를 활용 잘 활용 하는 방법도 경쟁력이며, 이 역시 공부를 철저히 해야된다고 생각됩니다.



`,
  },
  {
    tag: "ABOUT ME",

    title: "성장은 습관이라고 생각합니다.",

    text: `

한번 목표를 세우면 끝까지 해내는 실행력이 저의 가장 큰 강점입니다.
K-Digital 교육 수료 이후
'SQLD 
ADSP
리눅스마스터 2급
정보처리기사(실기 준비중)
프로젝트 개발'
등 꾸준히 공부하며 스스로 성장해왔습니다.
현재도 대부분의 시간을 프로젝트 개발 , 새로운 기술 학습, 포트폴리오 개선에 투자하고 있습니다.

전 회사에서의 경험을 통한 
MES(사용자 맞춤) 개발
발주시스템(자동발주) 개발
기본적인 결제시스템 구조를 통한 쇼핑몰 개발
AI를 기반 소통앱 개발을 하였습니다.
추후에는 AI 여행 플래너, 회사 그룹웨어 등을 만들어 볼 예정입니다.

>>>1. 나이에 상관하지 않고 관계형성 자신있습니다.
>>>2. 밤 잠이 많이 없고 맡은 바 책임은 끝까지 질때 까지 합니다.
>>>3. 실력을 빠른 시일 내에 쌓도록 약속 하겠습니다.
>>>4. 일이 많을 수록 배울 수 있는 좋은 기회이기에 
>>>일을 나누지 않겠습니다.
`,
  },
  {
    tag: "FINAL MESSAGE",

    title: "책임감 있는 유능한 개발자가 되기 위한 노력",

    text: `

지난 회사들을 생각하면 사용자 중심보다는 
 개발자 위주의 편함을 통한 설득이었던거 같습니다.
 이거 바꾸려면 오래걸려 '로직에 맞지 않아', '이렇게 하는게 어때?' 
 라는 것을 많이 들었습니다.
 현장을 오래 있었지만 제가 한번 해보고 싶었습니다.
 언제까지 현장에만 있을 수 없다라고 생각했기에
 좀 더 직관적인 업무를 하고 싶어서 뛰어들었습니다.
 적은 나이는 아니지만 해보고 싶음과 동시에 제가 할 수 있다는
 일념하에 도전하게 되었습니다.

k-디지털 이후 회사를 다니면서 자격증을 꾸준히 공부하였고
이후 개발에 돌입하게 되었는데 AI와 함께 개발을 하면서 배운다는 느낌이 상당히 컸습니다.
여기서 저는 공부를 하고 난 뒤 개발을 하는 것이 아니라
개발을 AI와 먼저 하고 그 다음 코드를 분석하고 나아가는 방법을 택했습니다.

AI는 현재 지금 시대에 필수적이라고 생각합니다.
AI를 잘 쓰는 것도 능력이라고 생각하기에
만약 제가 입사를 한다면 당연히 실력을 위해서 계속 노력을 할 것이며
배운 다는 자세도 언젠든 준비되어있습니다.

>>>현재 당장의 계획은 7월 2차 정보처리기사 실기를 보고
>>>제가 한 프로젝트에 대한 코드 분석을 하면서 제가 해보고 싶은 
>>>그런 것 들을 생각대로 구현하는게 제 목표입니다.

>>>그리고 제가 구현하였던 큰 계획은 
>>>Spring Boot, postman, React, Docker, AWS 을 
>>>다시 되돌아보고, 또 다른 툴 역시 다루고 싶고
>>>언제나 생각하는 대로 구현 할 수 있는 그런 개발자가 되겠습니다.
>>>감사합니다.

`,
  },
];

const profileInfo = [
  { label: "이름", value: "정경수" },
  { label: "출생", value: "1987년" },
  { label: "거주지", value: "경남 김해시 삼계동" },
  { label: "학력", value: "창원대학교(4년제)" },
  { label: "전공", value: "신소재공학" },
  { label: "희망직무", value: "AI 활용 풀스택 개발자" },
  { label: "강점", value: "현장 경험 + 서비스 구현 + 배포" },
];

const skillGroups = [
  {
    title: "Backend",
    icon: "💻",
    items: ["Java", "Spring Boot", "REST API", "MyBatis", "JSP", "Thymeleaf"],
  },
  {
    title: "Frontend",
    icon: "⚛",
    items: ["React", "JavaScript", "HTML5", "CSS3", "Vite"],
  },
  {
    title: "Database",
    icon: "🗄️",
    items: ["MySQL"],
  },
  {
    title: "DevOps",
    icon: "☁",
    items: ["Docker", "AWS EC2", "GitHub"],
  },
  {
    title: "AI",
    icon: "🤖",
    items: ["OpenAI API", "AI-assisted Development", "Prompt Engineering"],
  },
  {
    title: "Tools",
    icon: "🛠",
    items: ["Swagger", "Postman", "IntelliJ", "VS Code"],
  },
  {
    title: "API / Integration",
    icon: "🔗",
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

function App() {
  const [screen, setScreen] = useState("intro");
  const [battle, setBattle] = useState(false);
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [resumeIndex, setResumeIndex] = useState(0);

  const startBattle = () => {
    setBattle(true);
    setTimeout(() => setBattle(false), 1700);
    setTimeout(() => {
      document.getElementById("project-zone")?.scrollIntoView({ behavior: "smooth" });
    }, 1200);
  };

  if (screen === "intro") {
    return (
        <main className="intro-screen">
          <div className="stars"></div>
          <div className="intro-gate gate-left"></div>
          <div className="intro-gate gate-right"></div>

          <section className="intro-box">
            <p className="pixel-small">DEVELOPER QUEST</p>
            <h1>Full Stack Developer</h1>
            <h2>JUNG KYUNG SU</h2>
            <p className="intro-sub">AI를 활용해 아이디어를 현실의 서비스로 만드는 개발자</p>
            <button className="press-start" onClick={() => setScreen("select")}>
              PRESS START
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
            <p className="pixel-small">⚔ PROJECT MODE</p>
            <h1>SELECT MODE</h1>
            <div className="mode-grid">
              <button
                  type="button"
                  className="mode-card"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setScreen("portfolio");
                  }}
              >
                <span className="mode-icon">⚔</span>
                <strong>PORTFOLIO</strong>
                <p>프로젝트, 기능, 트러블슈팅, 배포 과정을 탐험합니다.</p>
                <em>ENTER</em>
              </button>

              <button
                  type="button"
                  className="mode-card"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setScreen("resume");
                  }}
              >
                <span className="mode-icon">📜</span>
                <strong>RESUME</strong>
                <p>자기소개, 경력, 기술스택, 성장 방향을 확인합니다.</p>
                <em>ENTER</em>
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
            <button onClick={() => setScreen("select")}>← MODE</button>
            <button onClick={() => setScreen("portfolio")}>PORTFOLIO</button>
          </nav>

          <section className="resume-hero">
            <div className="avatar-card">
              <div className="profile-photo-wrap">
                <img src={profilePhoto} alt="정경수 프로필 사진" className="profile-photo" />
              </div>
              <p className="level-badge">LV.35</p>
              <h1>JEONG KYUNGSOO</h1>
              <span className="job-title">AI-Assisted Full Stack Developer</span>

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
              <p className="dialog-tag">{current.tag}</p>
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
                  NEXT ▶
                </button>
              </div>
            </div>
          </section>

          <section className="resume-section">
            <p className="section-label">PLAYER STATUS</p>
            <h2>실무 경험 기반 역량</h2>

            <div className="status-board">
              {[
                ["🏭 Manufacturing", "★★★★★", "full"],
                ["📦 Logistics", "★★★★★", "full"],

                ["💻 Spring Boot", "★★★☆☆", "sixty"],

                ["⚛ React", "★★☆☆☆", "forty"],

                ["☁ Docker · AWS", "★★★☆☆", "sixty"],

                ["🤖 AI Development", "★★★★☆", "eighty"],
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
                      <span>{group.icon}</span>
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
                <span>현재</span>
                <h3>풀스택 개발 포트폴리오</h3>
                <p>
                  AI Full Stack Developer<br />
                  • MES<br />
                  • 자동발주<br />
                  • ToyShop<br />
                  • WhisperMe<br />
                  • Docker<br />
                  • AWS
                </p>
              </article>
            </div>
          </section>


          <section className="resume-section">
            <p className="section-label">CERTIFICATE</p>
            <h2>자격 / 어학 / 수상</h2>

            <div className="certificate-list">
              {[
                {
                  icon: "📊",
                  title: "데이터분석준전문가(ADsP)",
                  org: "한국데이터산업진흥원(K-DATA)",
                  date: "2026.03",
                  major: true,
                },
                {
                  icon:"🗄️",
                  title:"SQL 개발자(SQLD)",
                  org:"한국데이터산업진흥원",
                  date:"2025.12",
                  major:true,
                },
                { icon: "🚜", title: "지게차운전기능사", org: "한국산업인력공단", date: "2025.12" },
                {
                  icon:"🐧",
                  title:"리눅스마스터 2급",
                  org:"한국정보통신인재개발센터",
                  date:"2025.10",
                  major:true,
                },
                { icon: "💻", title: "정보처리기사(필기) 실기 7월 시험 예정", org: "한국산업인력공단", date: "2025.05",major:true, },
                {
                  icon:"🇯🇵",
                  title:"JLPT N4",
                  org:"N4 취득",
                  date:"2024.12",
                  major:true,
                },
                { icon: "🪟", title: "MOS Master", org: "Microsoft", date: "2014.04" },
                { icon: "🏅", title: "학생 포트폴리오경진대회 장려상", org: "창원대학교 공학교육혁신센터", date: "2013.06" },
                {
                  icon: "⌨️",
                  title: "워드프로세서 1급",
                  org: "대한상공회의소",
                  date: "2013.05",
                },
                {
                  icon: "🇰🇷",
                  title: "한자능력검정 3급",
                  org: "한국어문회",
                  date: "2012.10",
                },
                {
                  icon: "🚓",
                  title: "1종 보통운전면허",
                  org: "경찰청(운전면허시험관리단)",
                  date: "2010.07",
                },
                {
                  icon: "🤝",
                  title: "로타랙트 클럽 표창장",
                  org: "국제로타리",
                  date: "2010.04",
                },

              ].map((c) => (
                  <article
                      className={`cert-card ${c.major ? "major-cert" : ""}`}
                      key={c.title}
                  >
                    <div className="cert-icon">{c.icon}</div>

                    <div className="cert-info">
                      <h3>
                        {c.title}

                        {c.major && (
                            <span className="major-badge">
            IT
        </span>
                        )}
                      </h3>
                      <p>{c.org}</p>
                    </div>

                    <span>{c.date}</span>
                  </article>
              ))}
            </div>
          </section>

          <section className="ending">
            <p className="section-label">MISSION COMPLETE</p>
            <h2>READY FOR NEXT MISSION</h2>
            <p>
              현장을 이해하고 AI를 활용하여 아이디어를 현실의 서비스로 만드는 개발자
            </p>
          </section>
        </main>
    );
  }

  return (
      <main className={`page portfolio-page ${battle ? "shake" : ""}`}>
        <nav className="top-bar">
          <button onClick={() => setScreen("select")}>← MODE</button>
          <button onClick={() => setScreen("resume")}>RESUME</button>
          <button onClick={() => document.getElementById("project-zone")?.scrollIntoView({ behavior: "smooth" })}>
            PROJECTS
          </button>
        </nav>

        <section className="hero-section">
          <div className={`battle-stage ${battle ? "battle-on" : ""}`}>
            <div className="bug">🐞</div>
            <div className="impact impact-a">💥</div>
            <div className="impact impact-b">⚡</div>
            <div className="slash"></div>

            <div className="hero-character">
              <img src={robot} alt="AI Robot" className="robot-image" />
            </div>

            <div className="battle-text">BUG FIX!</div>
          </div>

          <div className="hero-copy">
            <p className="section-label">DEVELOPER QUEST</p>
            <h1>
              AI-Assisted
              <br />
              Full Stack Developer
            </h1>
            <h2>AI를 활용해 아이디어를 현실의 서비스로 만드는 개발자</h2>
            <p>
              현장에서 얻은 경험을 바탕으로 실제 업무의 문제를 서비스로 구현합니다.
              AI를 개발 도구로 활용하여 아이디어를 빠르게 검증하고,
              프론트엔드, 백엔드, 데이터베이스, Docker, AWS 배포까지 직접 경험했습니다.
            </p>
            <div className="hero-buttons">
              <button className="main-btn" onClick={startBattle}>
                👊 START ACTION
              </button>
            </div>
          </div>
        </section>

        <section className="project-zone" id="project-zone">
          <p className="section-label">PROJECT DUNGEON</p>
          <h2>실제 경험을 서비스로 구현한 프로젝트</h2>

          <div className="project-grid">
            {projects.map((project) => (
                <article
                    className={`project-card ${selectedProject.id === project.id ? "active" : ""}`}
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
                    홈페이지 이동 ↗
                  </a>
                </article>
            ))}
          </div>

          <div className="project-detail">
            <div className="detail-head">
              <div>
                <p className="section-label">Project</p>
                <h2>
                  {selectedProject.icon} {selectedProject.title}
                </h2>
                <p>{selectedProject.summary}</p>
              </div>
              <div className="detail-buttons">
                <a
                    className="visit-btn"
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  📖README ↗
                </a>

                <a
                    className="demo-btn"
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  🎥DEMO ▶
                </a>
              </div>
            </div>

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

              <article className="wide">
                <h3>핵심 구현 코드</h3>
                <div className="code-grid">
                  {(selectedProject.codes ?? []).map((item) => (
                      <div key={item.title}>
                        <strong>{item.title}</strong>
                        <pre>{item.code}</pre>
                      </div>
                  ))}
                </div>
              </article>

              <article className="wide">
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
              </article>

              <article className="wide">
                <h3>Docker / AWS 배포</h3>
                <p>
                  Spring Boot 프로젝트는 jar 빌드 후 Docker 컨테이너로 실행했고,
                  React 프로젝트는 Vite 빌드 후 정적 파일을 서비스했습니다.
                  AWS EC2 보안그룹에서 프로젝트별 포트를 열고 실제 외부 접속까지 확인했습니다.
                </p>
                <pre>{`docker ps
docker logs container-name --tail=100
docker compose up -d --build`}</pre>
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
            </div>
          </div>
        </section>

        <section className="ending">
          <p className="section-label">GAME CLEAR</p>
          <h2>THINK LOAD</h2>
          <p>사용자의 문제를 이해하고
            기술로 해결하는 개발자가 되겠습니다.</p>
        </section>
      </main>
  );
}

export default App;
