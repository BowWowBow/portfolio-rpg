from pathlib import Path
p=Path('src/App.jsx'); s=p.read_text()
about='''  {
    id: "aboutj", icon: "", title: "About J",
    badges: [{ text: "개인 프로젝트", class: "badge-work" }, { text: "콘텐츠 웹서비스", class: "badge-service" }],
    type: "영상 콘텐츠 검색·시청 서비스", level: 20,
    url: "http://about.jkyungsoo.com/", github: null, demo: null,
    meta: ["개인 개발", "영상 검색·시청 UI", "서비스 홈페이지 연결"],
    accounts: [],
    summary: "About J\\n\\n영상 콘텐츠를 찾아보고 시청하는 YouTube 형태의 웹서비스",
    stacks: ["Web UI", "JavaScript", "영상 콘텐츠", "검색·시청 UX"],
    features: ["영상 콘텐츠 탐색", "키워드 기반 검색 화면", "선택한 콘텐츠의 시청 화면", "검색에서 시청까지 이어지는 사용자 동선", "콘텐츠 정보 표시"],
    flow: ["홈페이지 진입", "영상 탐색·검색", "콘텐츠 선택", "영상 시청"],
    codes: [], integrations: [], troubleshooting: [
      { title: "탐색과 시청 동선", problem: "검색 목록과 영상 시청 화면의 목적이 서로 다릅니다.", solve: "검색·탐색 후 콘텐츠를 선택해 시청하도록 화면 흐름을 구분했습니다." },
      { title: "영상 서비스의 외부 의존성", problem: "원본 영상이나 외부 데이터 제공 방식이 바뀌면 표시가 달라질 수 있습니다.", solve: "영상과 메타데이터를 화면에 표시하는 경계를 기준으로 예외 상황을 점검하는 방향으로 설계했습니다." },
    ],
  },
'''
needle='\n];\n\nconst otherProjects = ['
assert needle in s
s=s.replace(needle,'\n'+about+'];\n\nconst otherProjects = [',1)
# app specific data: existing cards retained, extended precise descriptions / model as design examples
extra='''
// 모바일 앱의 데이터 모델은 포트폴리오 설명용 논리 설계입니다. 실제 DB 테이블 구현과 동일하다고 단정하지 않습니다.
const appCaseStudies = {
  "JKS MAKER": {
    goal: "음악 제작에 필요한 생성·편집·파일 관리를 모바일 화면에서 이어 사용하는 것을 목표로 구성했습니다.",
    requirements: ["음원 생성·편집 작업 분리", "보컬 분리 등 오디오 작업", "작업 결과 파일 관리", "작업 단계별 진행 결과 확인"],
    flow: ["프로젝트 선택", "음원 생성·불러오기", "편집·오디오 처리", "결과 확인", "파일 저장"],
    entities: [["Project", "id, name, created_at"], ["GenerationHistory", "id, project_id, task_type, status"], ["AudioFile", "id, project_id, file_path, file_type"]],
    relations: [["Project", "1 : N", "GenerationHistory", "프로젝트별 음원 작업 기록"], ["Project", "1 : N", "AudioFile", "프로젝트에 속한 결과 음원"]],
    architecture: ["Flutter UI", "오디오 작업 요청", "FastAPI · Python", "AI Audio 처리", "결과 파일"],
    verification: "음원 처리 요청·결과 표시·파일 저장 등 사용자 흐름을 중심으로 점검하는 프로젝트입니다.",
    challenges: [["작업의 단계 구분", "음원 생성, 편집, 결과 저장은 서로 다른 단계입니다.", "작업 단계와 결과 파일을 분리하여 흐름을 설명했습니다."], ["파일 추적", "여러 결과물이 발생하면 출처를 파악하기 어렵습니다.", "프로젝트-작업기록-파일의 논리 관계를 정리했습니다."]],
  },
  "스다스 작업관리": {
    goal: "택배 물량에 맞춰 공정별 작업 인원과 시간을 배정하고, 작업자별 일정과 예상 임금을 한 화면에서 확인하도록 기획했습니다.",
    requirements: ["공정별 작업량·기준 시간 입력", "기준에 따른 인원 비례 계산", "작업자별 시작 시간·점심·휴식 배치", "중복 배정 방지 및 분할 작업", "기본 시급과 잔업 1.5배 계산", "관리자 승인과 진행 상태 확인"],
    flow: ["물량·공정 등록", "작업자 선택", "인원·시간 배정", "타임라인 확인", "승인·완료"],
    entities: [["Worker", "id, name, hourly_wage"], ["Process", "id, name, standard_qty, standard_time"], ["Assignment", "id, worker_id, process_id, start_at, end_at"], ["WorkLog", "id, assignment_id, status, approved_at"]],
    relations: [["Worker", "1 : N", "Assignment", "작업자별 여러 공정 배정"], ["Process", "1 : N", "Assignment", "공정에 여러 작업자 배치"], ["Assignment", "1 : N", "WorkLog", "배정별 상태 이력 설계"]],
    architecture: ["Flutter 작업 화면", "공정·작업자 설정", "인원·시간 산식", "타임라인", "저장·승인"],
    verification: "작업 겹침, 점심 이동, 인원 수 변경에 따른 기준 시간, 분할 배정과 잔업 계산을 중심으로 검증했습니다.",
    challenges: [["작업자 일정 충돌", "한 사람이 같은 시간대에 두 공정에 중복 배정될 수 있습니다.", "배정 구간의 시작·종료 시간을 비교하여 겹치는 배정을 제한하도록 구성했습니다."], ["점심시간 고정 문제", "현장 일정에 따라 점심시간이 이동합니다.", "점심·휴식을 일반 작업 사이에 배치할 수 있도록 일정을 구성했습니다."], ["기준과 실적 비교", "물량과 인원 수가 달라지면 공정 기준 시간이 달라집니다.", "100건당 기준과 배정 인원을 활용해 시간 비례 산식을 적용했습니다."]],
  },
  "JoWalking": {
    goal: "GPS 경로와 걸음 수를 함께 기록하고, 화면이 꺼져도 이동 흐름을 최대한 유지하도록 설계했습니다.",
    requirements: ["위치 좌표·걸음 수 수집", "화면 꺼짐 중 위치 기록 유지", "수신 누락 구간 경로 연결", "운동 기록의 일자별 조회", "저장된 이동 경로 시각화"],
    flow: ["기록 시작", "GPS·걸음 센서 수집", "좌표 누적", "경로 연결", "기록 종료·조회"],
    entities: [["WalkingSession", "id, started_at, ended_at, steps"], ["RoutePoint", "id, session_id, latitude, longitude, recorded_at"], ["DailyStat", "id, day, total_steps, distance"]],
    relations: [["WalkingSession", "1 : N", "RoutePoint", "세션별 시간순 GPS 좌표"], ["DailyStat", "1 : N", "WalkingSession", "일별 세션 집계용 논리 설계"]],
    architecture: ["Flutter 화면", "위치·걸음 센서", "백그라운드 수집", "좌표 저장", "지도 경로 표시"],
    verification: "화면 꺼짐·위치 수신 누락·재개 상황에서 기록이 이어지는지와 경로 표시를 점검했습니다.",
    challenges: [["백그라운드 위치 누락", "화면을 끄면 기기 정책에 따라 GPS 수신이 제한될 수 있습니다.", "백그라운드 위치 수집을 유지하고 누락된 구간은 마지막·다음 유효 좌표를 선으로 연결하도록 개선했습니다."], ["경로 화면 겹침", "하단 시스템 영역과 경로 저장 화면이 겹칠 수 있습니다.", "모바일 안전 영역을 고려해 표시 영역을 조정했습니다."]],
  },
  "TranSu": {
    goal: "사용자 좌표를 기준으로 가까운 버스정류장을 조회하고 공공데이터 응답 장애를 구분할 수 있도록 만든 모바일 앱입니다.",
    requirements: ["현재 위치 사용", "주변 정류장 API 요청", "정류장 목록과 위치 표시", "인증키·좌표·응답 상태 점검", "API 실패 시 오류 상태 안내"],
    flow: ["위치 권한 확인", "현재 좌표 확보", "공공 API 호출", "응답 해석", "정류장 결과 표시"],
    entities: [["StopCache", "stop_id, name, latitude, longitude, cached_at"], ["FavoriteStop", "id, stop_id, saved_at"], ["SearchHistory", "id, searched_at, keyword"]],
    relations: [["StopCache", "1 : N", "FavoriteStop", "저장된 정류장 참조에 관한 논리 설계"], ["StopCache", "1 : N", "SearchHistory", "정류장 조회 이력 연결 설계"]],
    architecture: ["Flutter UI", "GPS 좌표", "국토교통부 버스정류장 API", "응답 파싱", "목록·지도"],
    verification: "위도·경도 전달값, 공공데이터 인증키 유형, 실제 API 응답과 앱 처리 문제를 구분해 점검했습니다.",
    challenges: [["외부 API 장애", "근접 정류장 호출이 실패하면 앱 오류와 제공 기관 응답 실패를 구분하기 어렵습니다.", "동일 좌표로 API 주소를 직접 호출해 외부 응답 여부와 클라이언트 동작을 분리해 확인했습니다."], ["검색 결과 누락", "좌표나 응답 형식이 올바르지 않으면 인근 정류장 목록을 만들 수 없습니다.", "입력 좌표·요청 파라미터·응답 상태를 단계별로 확인하도록 정리했습니다."]],
  },
  "J-Battery": {
    goal: "배터리 캐릭터와 홈·잠금 배경을 선택하고 화면별로 독립적으로 꾸밀 수 있게 만든 Android 앱입니다.",
    requirements: ["홈·잠금 화면 설정 분리", "캐릭터·배경 이미지 선택", "이미지 크기·위치 개별 조절", "미리보기와 실제 적용 비율 일치", "중복·손상된 리소스 정리", "상단 배터리 아이콘 표시 옵션"],
    flow: ["홈·잠금 선택", "배경 선택", "캐릭터 배치", "크기·위치 미리보기", "적용·저장"],
    entities: [["HomeConfig", "id, background_id, scale_x, scale_y"], ["LockConfig", "id, background_id, character_id, scale"], ["AssetPreference", "id, asset_id, enabled, order_no"]],
    relations: [["HomeConfig", "1 : N", "AssetPreference", "홈 화면 선택 이미지 참조 설계"], ["LockConfig", "1 : N", "AssetPreference", "잠금 화면 선택 이미지 참조 설계"]],
    architecture: ["Flutter UI", "이미지 미리보기", "Android 홈·잠금 적용", "설정 저장", "사용자 화면"],
    verification: "캐릭터 중복 표시, 배경 잘림, 이미지 비율 차이, 잠금·홈 설정 간 간섭을 반복 확인했습니다.",
    challenges: [["미리보기와 실제 화면 비율 불일치", "선택 썸네일과 실제 홈 화면의 크롭 비율이 달라 이미지가 잘렸습니다.", "적용 대상 화면을 기준으로 미리보기를 구성하고 가로·세로 배율을 독립적으로 조정하도록 개선했습니다."], ["홈·잠금 설정 연동", "한쪽 화면을 변경하면 다른 쪽에도 설정이 반영되는 문제가 있었습니다.", "화면별 설정 상태를 분리하는 방향으로 개선했습니다."], ["이미지 리소스 중복", "깨지거나 중복된 캐릭터·배경이 선택 화면을 복잡하게 했습니다.", "기본 이미지와 사용자 다운로드 이미지 중심으로 리소스를 정리했습니다."]],
  },
  "World Radio": {
    goal: "국가·장르를 기준으로 인터넷 라디오 방송을 탐색하고 선택한 방송을 스트리밍 재생하는 앱입니다.",
    requirements: ["방송국 검색·분류", "방송국 선택·재생", "스트리밍 오류 처리", "즐겨찾기 관리", "최근 청취 목록 설계"],
    flow: ["국가·장르 선택", "방송국 검색", "스트림 선택", "재생", "즐겨찾기"],
    entities: [["Station", "id, name, country, genre, stream_url"], ["Favorite", "id, station_id, saved_at"], ["ListenHistory", "id, station_id, listened_at"], ["Cache", "id, station_id, updated_at"]],
    relations: [["Station", "1 : N", "Favorite", "방송국별 즐겨찾기 참조"], ["Station", "1 : N", "ListenHistory", "방송국별 청취 기록"], ["Station", "1 : N", "Cache", "방송 정보 캐시 설계"]],
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
      <article className="wide design-stage-section"><h3>프로젝트 설계 단계</h3><div className="design-steps"><section><span>01</span><h4>문제 정의</h4><p>{study.goal}</p></section><section><span>02</span><h4>요구사항 정리</h4><ul>{study.requirements.map(x => <li key={x}>{x}</li>)}</ul></section><section><span>03</span><h4>ERD · 데이터 설계</h4><p className="erd-version-note">포트폴리오 논리 모델 · 실제 저장소 구현 및 물리 테이블명과 다를 수 있습니다.</p><div className="erd-entity-grid">{study.entities.map(([name, cols]) => <article className="erd-entity" key={name}><strong>{name}</strong><code>{cols}</code></article>)}</div><h5>테이블 관계 · 1:N</h5><div className="erd-relation-list">{study.relations.map(([from, ratio, to, desc], i) => <div className="erd-relation" key={`${from}-${to}`} style={{"--relation-color": relationColors[i % relationColors.length]}}><strong><em className="erd-relation-code">R{i+1}</em>{from}</strong><span>{ratio}</span><strong>{to}</strong><p>{desc}</p></div>)}</div></section><section><span>04</span><h4>전체 시스템 구조</h4><div className="architecture-diagram">{study.architecture.map((layer,i) => <div className="architecture-node" key={layer}><strong>{layer}</strong>{i < study.architecture.length-1 && <span>→</span>}</div>)}</div></section><section><span>05</span><h4>구현 및 검증</h4><p>{study.verification}</p></section></div></article>
      <article className="wide"><h3>트러블슈팅 · 설계 포인트</h3><div className="trouble-grid">{study.challenges.map(([title,problem,solve]) => <div className="trouble-card" key={title}><strong>{title}</strong><p><b>문제</b>{problem}</p><p><b>대응·설계</b>{solve}</p></div>)}</div></article>
    </div>
  </section>;
}
'''
needle='\nconst resumeSections = ['; assert needle in s;s=s.replace(needle,'\n'+extra+needle,1)
# about design
aboutDesign='''  aboutj: {
    goal: "영상 콘텐츠를 찾는 과정과 시청 화면을 하나의 자연스러운 사용자 동선으로 이어 주기 위해 구성했습니다.",
    requirements: ["영상 목록 탐색", "검색 결과 확인", "영상 선택 후 시청", "영상 메타데이터 표시", "빈 검색 결과 및 외부 영상 응답 예외 고려"],
    erd: [["콘텐츠", "Video", "영상 제목·설명·식별자 중심의 논리 모델"], ["검색", "SearchQuery / SearchResult", "검색어와 반환된 영상 목록을 구분"], ["사용자 동선", "WatchHistory", "선택 영상과 시청 시점을 연결하는 확장 설계"]],
    entities: [["Video", "id, title, description, thumbnail_url, video_url"], ["SearchQuery", "id, keyword, searched_at"], ["SearchResult", "id, query_id, video_id, position"], ["WatchHistory", "id, video_id, watched_at"]],
    layout: {Video:[0,0],SearchQuery:[1,0],SearchResult:[1,1],WatchHistory:[2,0]},
    relations: [["SearchQuery","1 : N","SearchResult","검색어 하나의 여러 결과"], ["Video","1 : N","SearchResult","영상 하나가 여러 검색 결과에 포함될 수 있음"], ["Video","1 : N","WatchHistory","영상별 시청 이력의 논리 모델"]],
    diagramGroups: [{title:"검색과 영상 연결 · 논리 설계",entities:["Video","SearchQuery","SearchResult","WatchHistory"],relationIndexes:[0,1,2],layout:{Video:[0,0],SearchQuery:[2,0],SearchResult:[1,1],WatchHistory:[0,1]}}],
    architecture: ["사용자 브라우저", "탐색·검색 UI", "콘텐츠 데이터", "영상 상세·시청 화면"],
    verification: "홈페이지 주소와 검색·영상 선택 동선에 맞춰 소개를 구성했습니다. 하단 ERD는 실제 운영 DB를 확인한 물리 스키마가 아닌 포트폴리오용 논리 설계입니다.",
  },
'''
needle='const projectDesigns = {\n';assert needle in s;s=s.replace(needle,needle+aboutDesign,1)
# remove about card
start=s.index('            <article className="project-card project-card-about">');end=s.index('            </article>',start)+len('            </article>');s=s[:start]+s[end:]
# app selected state and active card click
needle='  const [selectedProject, setSelectedProject] = useState(projects[0]);';assert needle in s;s=s.replace(needle,needle+'\n  const [selectedApp, setSelectedApp] = useState(otherProjects[0]);',1)
s=s.replace('className="project-card app-project-card" key={project.title}', 'className={`project-card app-project-card ${selectedApp.title === project.title ? "active" : ""}`} key={project.title} onClick={() => setSelectedApp(project)} role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setSelectedApp(project); }} aria-pressed={selectedApp.title === project.title}')
needle='''            <p className="project-count-note">
              WEB 6 · APP 6 · TOTAL 12
            </p>''';assert needle in s;s=s.replace(needle,'''            <p className="app-detail-instruction">프로젝트 카드를 선택하면 아래에서 상세 설계와 트러블슈팅을 확인할 수 있습니다.</p>
            <AppCaseStudy project={selectedApp} />
'''+needle,1)
# about no credential card empty, no dead link or empty code
s=s.replace('''                <a
                    className="visit-btn"
                    href={selectedProject.github}''','''                {selectedProject.github && <a
                    className="visit-btn"
                    href={selectedProject.github}''',1).replace('''                  README
                </a>''','''                  README
                </a>}''',1)
s=s.replace('''                <a
                    className="demo-btn"
                    href={selectedProject.demo}''','''                {selectedProject.demo && <a
                    className="demo-btn"
                    href={selectedProject.demo}''',1).replace('''                  DEMO
                </a>''','''                  DEMO
                </a>}''',1)
needle='''            <div className="account-card">''';assert needle in s;s=s.replace(needle,'''            {selectedProject.accounts?.length > 0 && <div className="account-card">''',1)
needle='''            </div>

            <div className="detail-grid">''';assert needle in s;s=s.replace(needle,'''            </div>}

            <div className="detail-grid">''',1)
# hide unsupported code and deployment descriptions for about; preserve existing web details
s=s.replace('''              <article className="wide">
                <h3>핵심 구현 코드</h3>''','''              {selectedProject.codes?.length > 0 && <article className="wide">
                <h3>핵심 구현 코드</h3>''',1)
s=s.replace('''              <article className="wide">
                <h3>API / 자동화 연동</h3>''','''              {selectedProject.integrations?.length > 0 && <article className="wide">
                <h3>API / 자동화 연동</h3>''',1)
s=s.replace('''              <article className="wide">
                <h3>Docker / AWS 배포</h3>''','''              {selectedProject.id !== "aboutj" && <article className="wide">
                <h3>Docker / AWS 배포</h3>''',1)
# targeted close articles, via sections
for nextstr in ['API / 자동화 연동','Docker / AWS 배포','트러블슈팅']:
 idx=s.index('<h3>'+nextstr+'</h3>'); prev=s.rfind('              </article>',0,idx); assert prev>0;s=s[:prev]+s[prev:].replace('              </article>','              </article>}',1)
# fix About J entry no fake social graph claims; note models
s=s.replace('''<p className="erd-version-note">ERD v3.1 · 업무 영역별 엔터티 배치와 정렬된 R번호·1:N 관계도</p>''','''<p className="erd-version-note">{selectedProject.id === "aboutj" ? "영상 서비스 구조 설명을 위한 논리 ERD · 운영 DB 테이블 확정 정보가 아닙니다." : "ERD v3.1 · 업무 영역별 엔터티 배치와 정렬된 R번호·1:N 관계도"}</p>''')
p.write_text(s)
css=Path('src/App.css');css.write_text(css.read_text()+'''
/* v3.8: app detail additions only; all existing project/resume styles retained. */
.app-project-card { cursor: pointer !important; }
.app-project-card:focus-visible { outline: 3px solid #23364d; outline-offset: -4px; }
.app-project-card.active { background: #f2f0ea !important; box-shadow: inset 0 0 0 2px #23364d; }
.app-detail-instruction { text-align: center; margin: 26px auto 0; font-size: 14px; color: #4b5056; }
.app-case-study { margin: 30px 0 0; border-top: 1px solid var(--line); }
.app-case-study .detail-head { padding: 28px 0 !important; }
.app-case-study .detail-head h2 { font-size: clamp(30px, 4vw, 54px) !important; }
.app-case-study .erd-entity-grid { margin: 18px 0 24px; }
.app-case-study .detail-grid { margin-top: 26px; }
@media(max-width:700px) { .app-case-study { padding: 0 8px !important; } }
''')
print('modified App.jsx and App.css')
