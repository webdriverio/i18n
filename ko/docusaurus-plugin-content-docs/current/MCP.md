---
id: mcp
title: MCP (모델 컨텍스트 프로토콜)
---

## 무엇을 할 수 있나요?

WebdriverIO MCP는 Claude Desktop 및 Claude Code와 같은 AI 어시스턴트가 웹 브라우저 및 모바일 애플리케이션을 자동화하고 상호작용할 수 있게 해주는 **모델 컨텍스트 프로토콜(MCP) 서버**입니다.

### WebdriverIO MCP를 사용하는 이유?

-   **모바일 우선**: 브라우저 전용 MCP 서버와 달리, WebdriverIO MCP는 Appium을 통한 iOS 및 Android 네이티브 앱 자동화를 지원합니다
-   **크로스 플랫폼 셀렉터**: 스마트 요소 감지 기능이 여러 위치 지정 전략(접근성 ID, XPath, UiAutomator, iOS predicates)을 자동으로 생성합니다
-   **WebdriverIO 생태계**: 풍부한 서비스 및 리포터 생태계를 갖춘 검증된 WebdriverIO 프레임워크를 기반으로 구축되었습니다

다음에 대한 통합 인터페이스를 제공합니다:

-   🖥️ **데스크톱 브라우저**(Chrome - 헤드 또는 헤드리스 모드)
-   📱 **네이티브 모바일 앱**(Appium을 통한 iOS 시뮬레이터 / Android 에뮬레이터 / 실제 기기)
-   📳 **하이브리드 모바일 앱**(Appium을 통한 네이티브 + WebView 컨텍스트 전환)

[`@wdio/mcp`](https://www.npmjs.com/package/@wdio/mcp) 패키지를 통해 제공됩니다.

이를 통해 AI 어시스턴트는 다음을 수행할 수 있습니다:

-   **브라우저 실행 및 제어** - 구성 가능한 크기, 헤드리스 모드, 선택적 초기 탐색 기능 제공
-   **웹사이트 탐색** 및 요소와 상호작용(클릭, 입력, 스크롤)
-   **페이지 콘텐츠 분석** - 접근성 트리와 페이지네이션 지원이 있는 가시적 요소 감지
-   **스크린샷 촬영** - 자동 최적화(크기 조정, 최대 1MB로 압축)
-   **세션 처리를 위한 쿠키 관리**
-   **모바일 기기 제어** - 제스처 포함(탭, 스와이프, 드래그 앤 드롭)
-   **하이브리드 앱에서 네이티브와 웹뷰 간 컨텍스트 전환**
-   **스크립트 실행** - 브라우저에서 JavaScript, 기기에서 Appium 모바일 명령
-   **회전, 키보드, 지오로케이션과 같은 기기 기능 처리**
-   그리고 더 많은 기능은 [도구](./mcp/tools)와 [구성](./mcp/configuration) 옵션을 참조하세요

:::info

모바일 앱 참고사항
모바일 자동화는 적절한 드라이버가 설치된 실행 중인 Appium 서버가 필요합니다. 설정 지침은 [전제 조건](#prerequisites)을 참조하세요.

:::

## 설치

`@wdio/mcp`를 사용하는 가장 쉬운 방법은 로컬 설치 없이 npx를 통하는 것입니다:

```sh
npx @wdio/mcp
```

또는 전역으로 설치:

```sh
npm install -g @wdio/mcp
```

## Claude에서 사용하기

Claude에서 WebdriverIO MCP를 사용하려면 구성 파일을 수정하세요:

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"]
        }
    }
}
```

구성을 추가한 후 Claude를 재시작하세요. WebdriverIO MCP 도구를 브라우저 및 모바일 자동화 작업에 사용할 수 있게 됩니다.

### Claude Code에서 사용하기

Claude Code는 자동으로 MCP 서버를 감지합니다. 프로젝트의 `.claude/settings.json` 또는 `.mcp.json`에서 구성할 수 있습니다.

또는 다음을 실행하여 .claude.json에 전역으로 추가하세요:
```bash
claude mcp add --transport stdio wdio-mcp -- npx -y @wdio/mcp
```
claude code 내에서 `/mcp` 명령을 실행하여 검증하세요.

## 빠른 시작 예제

### 브라우저 자동화

Claude에게 브라우저 작업을 자동화하도록 요청하세요:

```
"Chrome을 열고 https://webdriver.io로 이동"
"'Get Started' 버튼 클릭"
"페이지 스크린샷 촬영"
"페이지의 모든 보이는 링크 찾기"
```

### 모바일 앱 자동화

Claude에게 모바일 앱 자동화를 요청하세요:

```
"iPhone 15 시뮬레이터에서 iOS 앱 시작"
"로그인 버튼 탭하기"
"위로 스와이프하여 아래로 스크롤"
"현재 화면의 스크린샷 촬영"
```

## 기능

### 브라우저 자동화(Chrome)

| 기능 | 설명 |
|---------|-------------|
| **세션 관리** | 헤드/헤드리스 모드로 Chrome 실행, 사용자 정의 크기 및 선택적 탐색 URL 지원 |
| **탐색** | URL로 이동 |
| **요소 상호작용** | 요소 클릭, 텍스트 입력, 다양한 셀렉터로 요소 찾기 |
| **페이지 분석** | 보이는 요소 가져오기(페이지네이션 포함), 접근성 트리(필터링 포함) |
| **스크린샷** | 스크린샷 캡처(최대 1MB로 자동 최적화) |
| **스크롤링** | 구성 가능한 픽셀 양만큼 위/아래로 스크롤 |
| **쿠키 관리** | 쿠키 가져오기, 설정, 삭제 |
| **스크립트 실행** | 브라우저 컨텍스트에서 사용자 정의 JavaScript 실행 |

### 모바일 앱 자동화(iOS/Android)

| 기능 | 설명 |
|---------|-------------|
| **세션 관리** | 시뮬레이터, 에뮬레이터 또는 실제 기기에서 앱 시작 |
| **터치 제스처** | 탭, 스와이프, 드래그 앤 드롭 |
| **요소 감지** | 여러 위치 지정 전략과 페이지네이션을 갖춘 스마트 요소 감지 |
| **앱 수명 주기** | 앱 상태 확인(`execute_script`를 통한 활성화/종료) |
| **컨텍스트 전환** | 하이브리드 앱에서 네이티브와 웹뷰 컨텍스트 간 전환 |
| **기기 제어** | 기기 회전, 키보드 제어 |
| **지오로케이션** | 기기 GPS 좌표 가져오기 및 설정 |
| **권한** | 자동 권한 및 알림 처리 |
| **스크립트 실행** | Appium 모바일 명령(pressKey, deepLink, shell 등) 실행 |

## 전제 조건

### 브라우저 자동화

-   **Chrome**이 시스템에 설치되어 있어야 합니다
-   WebdriverIO는 자동 ChromeDriver 관리를 처리합니다

### 모바일 자동화

#### iOS

1. **Xcode** Mac App Store에서 설치
2. **Xcode 커맨드 라인 도구 설치**:
   ```sh
   xcode-select --install
   ```
3. **Appium 설치**:
   ```sh
   npm install -g appium
   ```
4. **XCUITest 드라이버 설치**:
   ```sh
   appium driver install xcuitest
   ```
5. **Appium 서버 시작**:
   ```sh
   appium
   ```
6. **시뮬레이터의 경우**: Xcode → Window → Devices and Simulators에서 시뮬레이터 생성/관리
7. **실제 기기의 경우**: 기기 UDID(40자 고유 식별자)가 필요합니다

#### Android

1. **Android Studio** 설치 및 Android SDK 설정
2. **환경 변수 설정**:
   ```sh
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```
3. **Appium 설치**:
   ```sh
   npm install -g appium
   ```
4. **UiAutomator2 드라이버 설치**:
   ```sh
   appium driver install uiautomator2
   ```
5. **Appium 서버 시작**:
   ```sh
   appium
   ```
6. **에뮬레이터 생성** Android Studio → Virtual Device Manager를 통해
7. **테스트 실행 전 에뮬레이터 시작**

## 아키텍처

### 작동 방식

WebdriverIO MCP는 AI 어시스턴트와 브라우저/모바일 자동화 사이의 브리지 역할을 합니다:

```
┌─────────────────┐     MCP Protocol      ┌─────────────────┐
│  Claude Desktop │ ◄──────────────────►  │    @wdio/mcp    │
│  or Claude Code │      (stdio)          │     Server      │
└─────────────────┘                       └────────┬────────┘
                                                   │
                                             WebDriverIO API
                                                   │
                    ┌──────────────────────────────┼──────────────────────────────┐
                    │                              │                              │
            ┌───────▼───────┐             ┌───────▼───────┐             ┌───────▼───────┐
            │    Chrome     │             │    Appium     │             │    Appium     │
            │   (Browser)   │             │     (iOS)     │             │   (Android)   │
            └───────────────┘             └───────────────┘             └───────────────┘
```

### 세션 관리

-   **단일 세션 모델**: 한 번에 하나의 브라우저 또는 앱 세션만 활성화 가능
-   **세션 상태**는 도구 호출 전반에 걸쳐 전역적으로 유지됨
-   **자동 분리**: 보존된 상태(`noReset: true`)를 가진 세션은 종료 시 자동으로 분리됨

### 요소 감지

#### 브라우저(웹)

-   최적화된 브라우저 스크립트를 사용하여 모든 보이는 상호작용 가능한 요소를 찾음
-   CSS 셀렉터, ID, 클래스 및 ARIA 정보가 있는 요소를 반환
-   기본적으로 뷰포트에 보이는 요소만 필터링

#### 모바일(네이티브 앱)

-   효율적인 XML 페이지 소스 파싱 사용(기존 쿼리의 600+회 대비 2회의 HTTP 호출)
-   Android 및 iOS용 플랫폼별 요소 분류
-   요소당 여러 위치 지정 전략 생성:
    -   접근성 ID(크로스 플랫폼, 가장 안정적)
    -   리소스 ID / 이름 속성
    -   텍스트 / 레이블 매칭
    -   XPath(전체 및 단순화)
    -   UiAutomator(Android) / Predicates(iOS)

## 셀렉터 구문

MCP 서버는 여러 셀렉터 전략을 지원합니다. 자세한 내용은 [셀렉터](./mcp/selectors) 문서를 참조하세요.

### 웹(CSS/XPath)

```
# CSS 셀렉터
button.my-class
#element-id
[data-testid="login"]

# XPath
//button[@class='submit']
//a[contains(text(), 'Click')]

# 텍스트 셀렉터(WebdriverIO 특화)
button=Exact Button Text
a*=Partial Link Text
```

### 모바일(크로스 플랫폼)

```
# 접근성 ID(권장 - iOS 및 Android에서 작동)
~loginButton

# Android UiAutomator
android=new UiSelector().text("Login")

# iOS Predicate 문자열
-ios predicate string:label == "Login"

# iOS 클래스 체인
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# XPath(두 플랫폼 모두 작동)
//android.widget.Button[@text="Login"]
//XCUIElementTypeButton[@label="Login"]
```

## 사용 가능한 도구

MCP 서버는 브라우저 및 모바일 자동화를 위한 25개의 도구를 제공합니다. 전체 참조는 [도구](./mcp/tools)를 참조하세요.

### 브라우저 도구

| 도구 | 설명 |
|------|-------------|
| `start_browser` | Chrome 브라우저 실행(선택적 초기 URL 포함) |
| `close_session` | 세션 종료 또는 분리 |
| `navigate` | URL로 이동 |
| `click_element` | 요소 클릭 |
| `set_value` | 입력 필드에 텍스트 입력 |
| `get_visible_elements` | 보이는/상호작용 가능한 요소 가져오기(페이지네이션 포함) |
| `get_accessibility` | 접근성 트리 가져오기(필터링 포함) |
| `take_screenshot` | 스크린샷 캡처(자동 최적화) |
| `scroll` | 페이지를 위/아래로 스크롤 |
| `get_cookies` / `set_cookie` / `delete_cookies` | 쿠키 관리 |
| `execute_script` | 브라우저에서 JavaScript 실행 |

### 모바일 도구

| 도구 | 설명 |
|------|-------------|
| `start_app_session` | iOS/Android 앱 실행 |
| `tap_element` | 요소 또는 좌표 탭 |
| `swipe` | 방향으로 스와이프 |
| `drag_and_drop` | 위치 간 드래그 |
| `get_app_state` | 앱 실행 상태 확인 |
| `get_contexts` / `switch_context` | 하이브리드 앱 컨텍스트 전환 |
| `rotate_device` | 세로/가로 모드로 회전 |
| `get_geolocation` / `set_geolocation` | GPS 좌표 가져오기 또는 설정 |
| `hide_keyboard` | 화면 키보드 숨기기 |
| `execute_script` | Appium 모바일 명령 실행 |

## 자동 처리

### 권한

기본적으로 MCP 서버는 자동으로 앱 권한을 부여(`autoGrantPermissions: true`)하므로 자동화 중에 권한 대화 상자를 수동으로 처리할 필요가 없습니다.

### 시스템 알림

시스템 알림("알림 허용?" 등)은 기본적으로 자동 수락됩니다(`autoAcceptAlerts: true`). `autoDismissAlerts: true`로 거부하도록 구성할 수도 있습니다.

## 구성

### 환경 변수

Appium 서버 연결 구성:

| 변수 | 기본값 | 설명 |
|----------|---------|-------------|
| `APPIUM_URL` | `127.0.0.1` | Appium 서버 호스트명 |
| `APPIUM_URL_PORT` | `4723` | Appium 서버 포트 |
| `APPIUM_PATH` | `/` | Appium 서버 경로 |

### 사용자 정의 Appium 서버 예제

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"],
            "env": {
                "APPIUM_URL": "192.168.1.100",
                "APPIUM_URL_PORT": "4724"
            }
        }
    }
}
```

## 성능 최적화

MCP 서버는 효율적인 AI 어시스턴트 통신을 위해 최적화되어 있습니다:

-   **TOON 형식**: 최소한의 토큰 사용을 위한 토큰 지향 객체 표기법 사용
-   **XML 파싱**: 모바일 요소 감지는 2회의 HTTP 호출 사용(기존 600+회 대비)
-   **스크린샷 압축**: Sharp를 사용하여 이미지 최대 1MB로 자동 압축
-   **뷰포트 필터링**: 기본적으로 보이는 요소만 반환
-   **페이지네이션**: 큰 요소 목록은 응답 크기를 줄이기 위해 페이지네이션 가능

## TypeScript 지원

MCP 서버는 TypeScript로 작성되었으며 전체 타입 정의를 포함합니다. 서버를 확장하거나 프로그래매틱하게 통합하는 경우 자동 완성 및 타입 안전성의 이점을 얻을 수 있습니다.

## 오류 처리

모든 도구는 강력한 오류 처리 기능을 갖추고 있습니다:

-   오류는 텍스트 콘텐츠로 반환되며(절대 throw되지 않음), MCP 프로토콜 안정성 유지
-   자세한 오류 메시지로 문제 진단 지원
-   개별 작업이 실패해도 세션 상태 유지

## 사용 사례

### 품질 보증

-   AI 기반 테스트 케이스 실행
-   스크린샷을 통한 시각적 회귀 테스팅
-   접근성 트리 분석을 통한 접근성 감사

### 웹 스크래핑 및 데이터 추출

-   복잡한 다중 페이지 흐름 탐색
-   동적 콘텐츠에서 구조화된 데이터 추출
-   인증 및 세션 관리 처리

### 모바일 앱 테스트

-   크로스 플랫폼 테스트 자동화(iOS + Android)
-   온보딩 흐름 검증
-   딥 링크 및 탐색 테스트

### 통합 테스트

-   엔드투엔드 워크플로우 테스트
-   API + UI 통합 검증
-   다중 플랫폼 일관성 확인

## 문제 해결

### 브라우저가 시작되지 않음

-   Chrome이 설치되어 있는지 확인
-   다른 프로세스가 기본 디버깅 포트(9222)를 사용하고 있지 않은지 확인
-   디스플레이 문제가 발생하면 헤드리스 모드 시도

### Appium 연결 실패

-   Appium 서버가 실행 중인지 확인(`appium`)
-   Appium URL 및 포트 구성 확인
-   적절한 드라이버가 설치되어 있는지 확인(`appium driver list`)

### iOS 시뮬레이터 문제

-   Xcode가 설치되고 최신 상태인지 확인
-   시뮬레이터를 사용할 수 있는지 확인(`xcrun simctl list devices`)
-   실제 기기의 경우 UDID가 올바른지 확인

### Android 에뮬레이터 문제

-   Android SDK가 올바르게 구성되어 있는지 확인
-   에뮬레이터가 실행 중인지 확인(`adb devices`)
-   `ANDROID_HOME` 환경 변수가 설정되어 있는지 확인

## 리소스

-   [도구 참조](./mcp/tools) - 사용 가능한 도구의 전체 목록
-   [셀렉터 가이드](./mcp/selectors) - 셀렉터 구문 문서
-   [구성](./mcp/configuration) - 구성 옵션
-   [FAQ](./mcp/faq) - 자주 묻는 질문
-   [GitHub 저장소](https://github.com/webdriverio/mcp) - 소스 코드 및 이슈
-   [NPM 패키지](https://www.npmjs.com/package/@wdio/mcp) - npm의 패키지
-   [모델 컨텍스트 프로토콜](https://modelcontextprotocol.io/) - MCP 사양