---
id: faq
title: 자주 묻는 질문
---

WebdriverIO MCP에 대한 자주 묻는 질문들입니다.

## 일반

### MCP란 무엇인가요?

MCP(Model Context Protocol)는 Claude와 같은 AI 어시스턴트가 외부 도구 및 서비스와 상호작용할 수 있게 해주는 오픈 프로토콜입니다. WebdriverIO MCP는 이 프로토콜을 구현하여 Claude Desktop과 Claude Code에 브라우저 및 모바일 자동화 기능을 제공합니다.

### WebdriverIO MCP로 무엇을 자동화할 수 있나요?

다음을 자동화할 수 있습니다:
-   **데스크톱 브라우저**(Chrome) - 탐색, 클릭, 입력, 스크린샷
-   **iOS 앱** - 시뮬레이터나 실제 기기에서
-   **Android 앱** - 에뮬레이터나 실제 기기에서
-   **하이브리드 앱** - 네이티브와 웹 컨텍스트 간 전환

### 코드를 작성해야 하나요?

아니요! 이것이 MCP의 주요 이점입니다. 자연어로 원하는 작업을 설명하면 Claude가 적절한 도구를 사용하여 작업을 수행합니다.

**예시 프롬프트:**
-   "Chrome을 열고 webdriver.io로 이동해줘"
-   "Get Started 버튼을 클릭해줘"
-   "현재 페이지의 스크린샷을 찍어줘"
-   "iOS 앱을 실행하고 테스트 사용자로 로그인해줘"

---

## 설치 및 설정

### WebdriverIO MCP를 어떻게 설치하나요?

별도로 설치할 필요가 없습니다. MCP 서버는 Claude Desktop이나 Claude Code에서 구성할 때 npx를 통해 자동으로 실행됩니다.

Claude Desktop 설정에 다음을 추가하세요:

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

### Claude Desktop 설정 파일은 어디에 있나요?

-   **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
-   **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

### 브라우저 자동화에 Appium이 필요한가요?

아니요. 브라우저 자동화는 Chrome만 설치되어 있으면 됩니다. WebdriverIO가 ChromeDriver를 자동으로 처리합니다.

### 모바일 자동화에 Appium이 필요한가요?

네. 모바일 자동화에는 다음이 필요합니다:
1. Appium 서버 실행 (`npm install -g appium && appium`)
2. 플랫폼 드라이버 설치 (iOS의 경우 `appium driver install xcuitest`, Android의 경우 `appium driver install uiautomator2`)
3. 적절한 개발 도구 (iOS의 경우 Xcode, Android의 경우 Android SDK)

---

## 브라우저 자동화

### 어떤 브라우저가 지원되나요?

현재는 **Chrome**만 지원됩니다. 다른 브라우저에 대한 지원은 향후 버전에서 추가될 수 있습니다.

### Chrome을 헤드리스 모드로 실행할 수 있나요?

네! Claude에게 헤드리스 모드로 브라우저를 시작하도록 요청하세요:

"헤드리스 모드로 Chrome 시작해줘"

또는 Claude가 적절한 상황(예: CI/CD 환경)에서 이 옵션을 사용할 것입니다.

### 브라우저 창 크기를 설정할 수 있나요?

네. 브라우저를 시작할 때 크기를 지정할 수 있습니다:

"1920x1080 창 크기로 Chrome을 시작해줘"

지원되는 치수: 400-3840픽셀 너비, 400-2160픽셀 높이. 기본값은 1920x1080입니다.

### 브라우저를 시작하고 한 번에 탐색할 수 있나요?

네! `navigationUrl` 매개변수를 사용하세요:

"Chrome을 시작하고 https://webdriver.io로 이동해줘"

브라우저를 시작한 다음 별도로 탐색하는 것보다 더 효율적입니다.

### 스크린샷은 어떻게 찍나요?

간단히 Claude에게 요청하세요:

"현재 페이지의 스크린샷을 찍어줘"

스크린샷은 자동으로 최적화됩니다:
- 최대 2000px 치수로 조정
- 최대 1MB 파일 크기로 압축
- 형식: PNG 또는 JPEG (최적의 품질을 위해 자동 선택)

### iframe과 상호작용할 수 있나요?

현재 MCP 서버는 메인 문서에서 작동합니다. iframe 상호작용은 향후 버전에서 추가될 수 있습니다.

### 커스텀 JavaScript를 실행할 수 있나요?

네! `execute_script` 도구를 사용하세요:

"페이지 제목을 가져오는 스크립트를 실행해줘"
"스크립트 실행: return document.querySelectorAll('button').length"

---

## 모바일 자동화

### iOS 앱을 어떻게 시작하나요?

필요한 정보와 함께 Claude에게 요청하세요:

"iPhone 15 시뮬레이터에서 /path/to/MyApp.app에 있는 iOS 앱을 실행해줘"

또는 이미 설치된 앱의 경우:

"iPhone 15 시뮬레이터에서 noReset을 활성화하여 앱을 실행해줘"

### Android 앱을 어떻게 시작하나요?

"Pixel 7 에뮬레이터에서 /path/to/app.apk에 있는 Android 앱을 실행해줘"

또는 이미 설치된 앱의 경우:

"Pixel 7 에뮬레이터에서 noReset을 활성화하여 앱을 실행해줘"

### 실제 기기에서 테스트할 수 있나요?

네! 실제 기기의 경우 기기 UDID가 필요합니다:

-   **iOS:** 기기 연결, Finder 열기, 기기 클릭, 시리얼 번호 클릭하여 UDID 확인
-   **Android:** 터미널에서 `adb devices` 실행

그런 다음 Claude에게 요청하세요:

"UDID abc123...인 실제 기기에서 iOS 앱을 실행해줘"

### 권한 대화상자는 어떻게 처리하나요?

기본적으로 권한은 자동으로 부여됩니다 (`autoGrantPermissions: true`). 권한 플로우를 테스트해야 하는 경우 이 기능을 비활성화할 수 있습니다:

"자동 권한 부여 없이 앱을 실행해줘"

### 어떤 제스처가 지원되나요?

-   **탭:** 요소나 좌표를 탭
-   **스와이프:** 위, 아래, 왼쪽, 오른쪽으로 스와이프
-   **드래그 앤 드롭:** 한 요소에서 다른 요소나 좌표로 드래그

참고: `long_press`는 Appium 모바일 명령으로 `execute_script`를 통해 사용 가능합니다.

### 모바일 앱에서 스크롤은 어떻게 하나요?

스와이프 제스처를 사용하세요:

"아래로 스크롤하기 위해 위로 스와이프해줘"
"위로 스크롤하기 위해 아래로 스와이프해줘"

### 기기를 회전시킬 수 있나요?

네:

"기기를 가로 모드로 회전해줘"
"기기를 세로 모드로 회전해줘"

### 하이브리드 앱은 어떻게 처리하나요?

웹뷰가 있는 앱의 경우 컨텍스트를 전환할 수 있습니다:

"사용 가능한 컨텍스트를 가져와줘"
"웹뷰 컨텍스트로 전환해줘"
"네이티브 컨텍스트로 돌아가줘"

### Appium 모바일 명령을 실행할 수 있나요?

네! `execute_script` 도구를 사용하세요:

```
"mobile: pressKey" 스크립트를 [{ keycode: 4 }] 인자로 실행해줘  // Android에서 BACK 키 누르기
"mobile: activateApp" 스크립트를 [{ appId: "com.example.app" }] 인자로 실행해줘
"mobile: terminateApp" 스크립트를 [{ bundleId: "com.example.app" }] 인자로 실행해줘
```

---

## 요소 선택

### Claude는 어떤 요소와 상호작용할지 어떻게 알 수 있나요?

Claude는 `get_visible_elements` 도구를 사용하여 페이지/화면의 상호작용 가능한 요소를 식별합니다. 각 요소에는 여러 선택자 전략이 포함됩니다.

### 페이지에 요소가 너무 많으면 어떻게 하나요?

페이지네이션을 사용하여 대량의 요소 목록을 관리하세요:

"처음 20개의 보이는 요소를 가져와줘"
"오프셋 20과 한도 20으로 보이는 요소를 가져와줘"

응답에는 요소 탐색을 돕기 위한 `total`, `showing`, `hasMore`가 포함됩니다.

### 특정 유형의 요소만 가져올 수 있나요?

네! `elementType` 매개변수를 사용하세요:

-   `interactable` (기본값): 버튼, 링크, 입력 필드
-   `visual`: 이미지, SVG
-   `all`: 두 유형 모두

"페이지에서 시각적 요소를 가져와줘"

### Claude가 잘못된 요소를 클릭하면 어떻게 하나요?

더 구체적으로 지정할 수 있습니다:

-   정확한 텍스트 제공: "'주문 제출'이라고 쓰여진 버튼을 클릭해줘"
-   선택자 제공: "#submit-btn 선택자가 있는 요소를 클릭해줘"
-   접근성 ID 제공: "loginButton 접근성 ID가 있는 요소를 클릭해줘"

### 모바일에서 가장 좋은 선택자 전략은 무엇인가요?

1. **접근성 ID** (최선) - `~loginButton`
2. **리소스 ID** (Android) - `id=login_button`
3. **조건 문자열** (iOS) - `-ios predicate string:label == "Login"`
4. **XPath** (최후 수단) - 더 느리지만 어디서나 작동함

### 접근성 트리란 무엇이며 언제 사용해야 하나요?

접근성 트리는 페이지 요소에 대한 의미론적 정보(역할, 이름, 상태)를 제공합니다. 다음과 같은 경우 `get_accessibility`를 사용하세요:
- `get_visible_elements`가 예상된 요소를 반환하지 않을 때
- 접근성 역할(버튼, 링크, 텍스트박스 등)로 요소를 찾아야 할 때
- 요소에 대한 자세한 의미론적 정보가 필요할 때

"버튼 및 링크 역할로 필터링된 접근성 트리를 가져와줘"

---

## 세션 관리

### 여러 세션을 동시에 가질 수 있나요?

아니요. MCP 서버는 단일 세션 모델을 사용합니다. 한 번에 하나의 브라우저 또는 앱 세션만 활성화할 수 있습니다.

### 세션을 닫으면 어떻게 되나요?

세션 유형 및 설정에 따라 다릅니다:

-   **브라우저:** Chrome이 완전히 종료됨
-   **모바일 (`noReset: false` 사용):** 앱이 종료됨
-   **모바일 (`noReset: true` 또는 `appPath` 없음):** 앱이 열린 상태로 유지됨 (세션이 자동으로 분리됨)

### 세션 간에 앱 상태를 유지할 수 있나요?

네! `noReset` 옵션을 사용하세요:

"noReset을 활성화하여 앱을 실행해줘"

이렇게 하면 로그인 상태, 환경 설정 및 기타 앱 데이터가 유지됩니다.

### close와 detach의 차이점은 무엇인가요?

-   **Close:** 브라우저/앱을 완전히 종료함
-   **Detach:** 자동화는 연결 해제하지만 브라우저/앱은 계속 실행됨

Detach는 자동화 후 상태를 수동으로 검사하고 싶을 때 유용합니다.

### 디버깅 중에 세션이 계속 시간 초과됩니다

명령 시간 초과를 늘리세요:

"newCommandTimeout을 300초로 설정하여 앱을 실행해줘"

기본값은 60초입니다. 긴 디버깅 세션의 경우 300-600초를 시도해보세요.

---

## 문제 해결

### "Session not found" 오류

활성 세션이 없다는 의미입니다. 먼저 브라우저나 앱 세션을 시작하세요:

"Chrome을 시작하고 google.com으로 이동해줘"

### "Element not found" 오류

요소가 보이지 않거나 다른 선택자를 가질 수 있습니다. 다음을 시도해보세요:

1. 먼저 Claude에게 모든 보이는 요소를 가져오도록 요청하기
2. 더 구체적인 선택자 제공하기
3. 페이지/앱이 완전히 로드될 때까지 기다리기
4. 화면 밖 요소를 찾기 위해 `inViewportOnly: false` 사용하기

### 브라우저가 시작되지 않습니다

1. Chrome이 설치되어 있는지 확인하세요
2. 다른 프로세스가 디버깅 포트(9222)를 사용하고 있는지 확인하세요
3. 헤드리스 모드를 시도해보세요

### Appium 연결 실패

이는 모바일 자동화를 시작할 때 가장 흔한 문제입니다.

1. **Appium이 실행 중인지 확인**: `curl http://localhost:4723/status`
2. 필요한 경우 Appium 시작: `appium`
3. Appium URL 구성이 서버와 일치하는지 확인
4. 드라이버가 설치되어 있는지 확인: `appium driver list --installed`

:::tip
MCP 서버는 모바일 세션을 시작하기 전에 Appium이 실행 중이어야 합니다. 먼저 Appium을 시작해야 합니다:
```sh
appium
```
향후 버전에서는 자동 Appium 서비스 관리가 포함될 수 있습니다.
:::

### iOS 시뮬레이터가 시작되지 않습니다

1. Xcode가 설치되어 있는지 확인: `xcode-select --install`
2. 사용 가능한 시뮬레이터 나열: `xcrun simctl list devices`
3. Console.app에서 특정 시뮬레이터 오류 확인

### Android 에뮬레이터가 시작되지 않습니다

1. `ANDROID_HOME` 설정: `export ANDROID_HOME=$HOME/Library/Android/sdk`
2. 에뮬레이터 확인: `emulator -list-avds`
3. 에뮬레이터 수동 시작: `emulator -avd <avd-name>`
4. 기기 연결 확인: `adb devices`

### 스크린샷이 작동하지 않습니다

1. 모바일의 경우 세션이 활성 상태인지 확인
2. 브라우저의 경우 다른 페이지를 시도해보세요 (일부 페이지는 스크린샷을 차단함)
3. Claude Desktop 로그에서 오류 확인

스크린샷은 자동으로 최대 1MB로 압축되므로, 큰 스크린샷은 작동하지만 품질이 낮을 수 있습니다.

---

## 성능

### 모바일 자동화가 느린 이유는 무엇인가요?

모바일 자동화에는 다음이 포함됩니다:
1. Appium 서버와의 네트워크 통신
2. Appium이 기기/시뮬레이터와 통신
3. 기기 렌더링 및 응답

자동화 속도 향상 팁:
-   개발 시 실제 기기 대신 에뮬레이터/시뮬레이터 사용
-   XPath 대신 접근성 ID 사용
-   요소 감지를 위해 `inViewportOnly: true` 활성화
-   토큰 사용을 줄이기 위해 페이지네이션 (`limit`) 사용

### 요소 감지 속도를 높이려면 어떻게 해야 하나요?

MCP 서버는 XML 페이지 소스 파싱을 사용하여 요소 감지를 이미 최적화했습니다(전통적인 요소 쿼리의 경우 600+ 대신 2개의 HTTP 호출). 추가 팁:

-   `inViewportOnly: true` 유지 (기본값)
-   `includeContainers: false` 설정 (기본값)
-   큰 화면에서 페이지네이션을 위해 `limit`와 `offset` 사용
-   모든 요소를 찾는 대신 특정 선택자 사용

### 스크린샷이 느리거나 실패합니다

스크린샷은 자동으로 최적화됩니다:
- 2000px보다 큰 경우 크기 조정
- 1MB 이하로 압축
- PNG가 너무 큰 경우 JPEG로 변환

이 최적화는 처리 시간을 줄이고 Claude가 이미지를 처리할 수 있도록 합니다.

---

## 제한 사항

### 현재 제한 사항은 무엇인가요?

-   **단일 세션:** 한 번에 하나의 브라우저/앱만 가능
-   **브라우저 지원:** Chrome만 지원 (현재까지)
-   **iframe 지원:** iframe에 대한 제한된 지원
-   **파일 업로드:** 도구를 통해 직접 지원되지 않음
-   **오디오/비디오:** 미디어 재생과 상호작용할 수 없음
-   **브라우저 확장 프로그램:** 지원되지 않음

### 이를 프로덕션 테스트에 사용할 수 있나요?

WebdriverIO MCP는 대화형 AI 지원 자동화용으로 설계되었습니다. 프로덕션 CI/CD 테스트의 경우 완전한 프로그래밍 제어가 가능한 WebdriverIO의 전통적인 테스트 러너를 사용하는 것이 좋습니다.

---

## 보안

### 내 데이터는 안전한가요?

MCP 서버는 사용자의 컴퓨터에서 로컬로 실행됩니다. 모든 자동화는 로컬 브라우저/Appium 연결을 통해 이루어집니다. 명시적으로 탐색하는 대상 외에는 외부 서버로 데이터가 전송되지 않습니다.

### Claude가 내 비밀번호에 접근할 수 있나요?

Claude는 페이지 내용을 보고 요소와 상호작용할 수 있지만:
-   `<input type="password">` 필드의 비밀번호는 마스킹 처리됨
-   민감한 자격 증명 자동화는 피해야 함
-   자동화에는 테스트 계정을 사용할 것

---

## 기여하기

### 어떻게 기여할 수 있나요?

[GitHub 저장소](https://github.com/webdriverio/mcp)를 방문하여:
-   버그 신고하기
-   기능 요청하기
-   풀 리퀘스트 제출하기

### 어디서 도움을 받을 수 있나요?

-   [WebdriverIO Discord](https://discord.webdriver.io/)
-   [GitHub Issues](https://github.com/webdriverio/mcp/issues)
-   [WebdriverIO Documentation](https://webdriver.io/)