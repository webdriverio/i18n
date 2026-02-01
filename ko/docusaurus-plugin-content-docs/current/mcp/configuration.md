---
id: configuration
title: 환경 설정
---

이 페이지는 WebdriverIO MCP 서버의 모든 환경 설정 옵션을 문서화합니다.

## MCP 서버 환경 설정

MCP 서버는 Claude Desktop 또는 Claude Code 환경 설정 파일을 통해 구성됩니다.

### 기본 환경 설정

#### macOS

`~/Library/Application Support/Claude/claude_desktop_config.json` 편집:

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

#### Windows

`%APPDATA%\Claude\claude_desktop_config.json` 편집:

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

#### Claude Code

프로젝트의 `.claude/settings.json` 편집:

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

---

## 환경 변수

환경 변수를 통해 Appium 서버 연결 및 기타 설정을 구성합니다.

### Appium 연결

| 변수 | 타입 | 기본값 | 설명 |
|----------|------|---------|-------------|
| `APPIUM_URL` | string | `127.0.0.1` | Appium 서버 호스트명 |
| `APPIUM_URL_PORT` | number | `4723` | Appium 서버 포트 |
| `APPIUM_PATH` | string | `/` | Appium 서버 경로 |

### 환경 변수를 사용한 예제

```json
{
    "mcpServers": {
        "wdio-mcp": {
            "command": "npx",
            "args": ["-y", "@wdio/mcp"],
            "env": {
                "APPIUM_URL": "192.168.1.100",
                "APPIUM_URL_PORT": "4724",
                "APPIUM_PATH": "/wd/hub"
            }
        }
    }
}
```

---

## 브라우저 세션 옵션

`start_browser` 도구를 통해 브라우저 세션을 시작할 때 사용할 수 있는 옵션입니다.

### `headless`

-   **타입:** `boolean`
-   **필수:** 아니오
-   **기본값:** `false`

Chrome을 헤드리스 모드로 실행합니다(브라우저 창이 보이지 않음). CI/CD 환경이나 브라우저를 볼 필요가 없을 때 유용합니다.

### `windowWidth`

-   **타입:** `number`
-   **필수:** 아니오
-   **기본값:** `1920`
-   **범위:** `400` - `3840`

브라우저 창의 초기 너비(픽셀).

### `windowHeight`

-   **타입:** `number`
-   **필수:** 아니오
-   **기본값:** `1080`
-   **범위:** `400` - `2160`

브라우저 창의 초기 높이(픽셀).

### `navigationUrl`

-   **타입:** `string`
-   **필수:** 아니오

브라우저 시작 직후 이동할 URL. `start_browser` 다음에 `navigate`를 별도로 호출하는 것보다 더 효율적입니다.

**예제:** 한 번의 호출로 브라우저 시작 및 탐색:
```
Start Chrome and navigate to https://webdriver.io
```

---

## 모바일 세션 옵션

`start_app_session` 도구를 통해 모바일 앱 세션을 시작할 때 사용할 수 있는 옵션입니다.

### 플랫폼 옵션

#### `platform`

-   **타입:** `string`
-   **필수:** 예
-   **값:** `iOS` | `Android`

자동화할 모바일 플랫폼.

#### `platformVersion`

-   **타입:** `string`
-   **필수:** 아니오

기기/시뮬레이터/에뮬레이터의 OS 버전(예: iOS의 경우 `17.0`, Android의 경우 `14`).

#### `automationName`

-   **타입:** `string`
-   **필수:** 아니오
-   **값:** `XCUITest` (iOS), `UiAutomator2` | `Espresso` (Android)

사용할 자동화 드라이버. iOS의 경우 기본값은 `XCUITest`, Android의 경우 기본값은 `UiAutomator2`입니다.

### 기기 옵션

#### `deviceName`

-   **타입:** `string`
-   **필수:** 예

사용할 기기, 시뮬레이터 또는 에뮬레이터의 이름.

**예제:**
-   iOS 시뮬레이터: `iPhone 15 Pro`, `iPad Air (5th generation)`
-   Android 에뮬레이터: `Pixel 7`, `Nexus 5X`
-   실제 기기: 시스템에 표시된 기기 이름

#### `udid`

-   **타입:** `string`
-   **필수:** 아니오(실제 iOS 기기의 경우 필수)

고유 기기 식별자. 실제 iOS 기기(40자 식별자)에 필요하며 실제 Android 기기에도 권장됩니다.

**UDID 찾는 방법:**
-   **iOS:** 기기 연결 후 Finder/iTunes 열기, 기기 클릭 → 일련 번호(UDID 확인을 위해 클릭)
-   **Android:** 터미널에서 `adb devices` 실행

### 앱 옵션

#### `appPath`

-   **타입:** `string`
-   **필수:** 아니오*

설치하고 실행할 애플리케이션 파일 경로.

**지원 형식:**
-   iOS 시뮬레이터: `.app` 디렉토리
-   iOS 실제 기기: `.ipa` 파일
-   Android: `.apk` 파일

*`appPath`를 제공하거나, 이미 실행 중인 앱에 연결하려면 `noReset: true`가 필요합니다.

#### `appWaitActivity`

-   **타입:** `string`
-   **필수:** 아니오 (Android만 해당)

앱 실행 시 기다릴 액티비티. 지정하지 않으면 앱의 메인/런처 액티비티가 사용됩니다.

**예제:** `com.example.app.MainActivity`

### 세션 상태 옵션

#### `noReset`

-   **타입:** `boolean`
-   **필수:** 아니오
-   **기본값:** `false`

세션 간 앱 상태를 유지합니다. `true`일 경우:
-   앱 데이터가 유지됩니다(로그인 상태, 환경설정 등)
-   세션이 종료 대신 **분리**됩니다(앱을 계속 실행 상태로 유지)
-   여러 세션에 걸친 사용자 여정 테스트에 유용합니다
-   이미 실행 중인 앱에 연결하기 위해 `appPath` 없이 사용할 수 있습니다

#### `fullReset`

-   **타입:** `boolean`
-   **필수:** 아니오
-   **기본값:** `true`

세션 시작 전 앱을 완전히 초기화합니다. `true`일 경우:
-   iOS: 앱 제거 후 재설치
-   Android: 앱 데이터와 캐시를 모두 지움
-   깨끗한 상태에서 시작하기에 유용함

앱 상태를 완전히 유지하려면 `fullReset: false`와 `noReset: true`를 함께 설정하세요.

### 세션 타임아웃

#### `newCommandTimeout`

-   **타입:** `number`
-   **필수:** 아니오
-   **기본값:** `60`

Appium이 클라이언트가 종료되었다고 가정하고 세션을 종료하기 전에 새 명령을 기다리는 시간(초). 디버깅 세션이 길어질 경우 이 값을 늘리세요.

**예제:**
-   `60` - 기본값, 대부분의 자동화에 적합
-   `300` - 5분, 디버깅이나 느린 작업에 적합
-   `600` - 10분, 매우 오래 실행되는 테스트용

### 자동 처리 옵션

#### `autoGrantPermissions`

-   **타입:** `boolean`
-   **필수:** 아니오
-   **기본값:** `true`

설치/실행 시 앱 권한을 자동으로 부여합니다. `true`일 경우:
-   카메라, 마이크, 위치 등의 권한이 자동으로 부여됩니다
-   수동 권한 대화 상자 처리가 필요하지 않습니다
-   권한 팝업을 피해 자동화를 간소화합니다

:::note Android 전용
이 옵션은 주로 Android에 영향을 미칩니다. iOS 권한은 시스템 제한으로 인해 다르게 처리해야 합니다.
:::

#### `autoAcceptAlerts`

-   **타입:** `boolean`
-   **필수:** 아니오
-   **기본값:** `true`

자동화 중에 나타나는 시스템 알림(대화 상자)을 자동으로 수락합니다.

**자동 수락되는 알림 예시:**
-   "알림을 허용하시겠습니까?"
-   "앱이 위치에 액세스하려고 합니다"
-   "앱이 사진에 액세스하도록 허용하시겠습니까?"

#### `autoDismissAlerts`

-   **타입:** `boolean`
-   **필수:** 아니오
-   **기본값:** `false`

시스템 알림을 수락하는 대신 닫습니다(취소). `true`로 설정하면 `autoAcceptAlerts`보다 우선합니다.

### Appium 서버 재정의

세션별로 Appium 서버 연결을 재정의할 수 있습니다:

#### `appiumHost`

-   **타입:** `string`
-   **필수:** 아니오

Appium 서버 호스트명. `APPIUM_URL` 환경 변수를 재정의합니다.

#### `appiumPort`

-   **타입:** `number`
-   **필수:** 아니오

Appium 서버 포트. `APPIUM_URL_PORT` 환경 변수를 재정의합니다.

#### `appiumPath`

-   **타입:** `string`
-   **필수:** 아니오

Appium 서버 경로. `APPIUM_PATH` 환경 변수를 재정의합니다.

---

## 요소 탐지 옵션

`get_visible_elements` 도구의 옵션입니다.

### `elementType`

-   **타입:** `string`
-   **필수:** 아니오
-   **기본값:** `interactable`
-   **값:** `interactable` | `visual` | `all`

반환할 요소 유형:
-   `interactable`: 버튼, 링크, 입력 필드 및 기타 클릭 가능한 요소
-   `visual`: 이미지, SVG 및 시각적 요소
-   `all`: 상호작용 가능한 요소와 시각적 요소 모두

### `inViewportOnly`

-   **타입:** `boolean`
-   **필수:** 아니오
-   **기본값:** `true`

현재 뷰포트 내에 보이는 요소만 반환합니다. `false`인 경우 뷰 계층 구조의 모든 요소를 반환합니다(화면 밖 요소를 찾는 데 유용).

### `includeContainers`

-   **타입:** `boolean`
-   **필수:** 아니오
-   **기본값:** `false`

결과에 컨테이너/레이아웃 요소를 포함합니다. `true`일 경우:

**포함되는 Android 컨테이너:**
-   `ViewGroup`, `FrameLayout`, `LinearLayout`
-   `RelativeLayout`, `ConstraintLayout`
-   `ScrollView`, `RecyclerView`

**포함되는 iOS 컨테이너:**
-   `View`, `StackView`, `CollectionView`
-   `ScrollView`, `TableView`

레이아웃 문제 디버깅이나 뷰 계층 구조 이해에 유용합니다.

### `includeBounds`

-   **타입:** `boolean`
-   **필수:** 아니오
-   **기본값:** `false`

응답에 요소 경계/좌표(x, y, width, height)를 포함합니다. 다음 경우에 `true`로 설정하세요:
-   좌표 기반 상호작용
-   레이아웃 디버깅
-   시각적 요소 위치 파악

### 페이지네이션 옵션

많은 요소가 있는 큰 페이지의 경우 토큰 사용량을 줄이기 위해 페이지네이션을 사용하세요:

#### `limit`

-   **타입:** `number`
-   **필수:** 아니오
-   **기본값:** `0` (무제한)

반환할 최대 요소 수.

#### `offset`

-   **타입:** `number`
-   **필수:** 아니오
-   **기본값:** `0`

결과를 반환하기 전에 건너뛸 요소 수.

**예제:** 21-40번째 요소 가져오기:
```
Get visible elements with limit 20 and offset 20
```

---

## 접근성 트리 옵션

`get_accessibility` 도구의 옵션(브라우저 전용).

### `limit`

-   **타입:** `number`
-   **필수:** 아니오
-   **기본값:** `100`

반환할 최대 노드 수. 무제한은 `0`을 사용(큰 페이지에는 권장하지 않음).

### `offset`

-   **타입:** `number`
-   **필수:** 아니오
-   **기본값:** `0`

페이지네이션을 위해 건너뛸 노드 수.

### `roles`

-   **타입:** `string[]`
-   **필수:** 아니오
-   **기본값:** 모든 역할

특정 접근성 역할로 필터링.

**일반적인 역할:** `button`, `link`, `textbox`, `checkbox`, `radio`, `heading`, `img`, `listitem`

**예제:** 버튼과 링크만 가져오기:
```
Get accessibility tree filtered to button and link roles
```

### `namedOnly`

-   **타입:** `boolean`
-   **필수:** 아니오
-   **기본값:** `true`

이름/레이블이 있는 노드만 반환합니다. 익명 컨테이너를 필터링하고 결과의 노이즈를 줄입니다.

---

## 스크린샷 옵션

`take_screenshot` 도구의 옵션.

### `outputPath`

-   **타입:** `string`
-   **필수:** 아니오

스크린샷 파일을 저장할 경로. 제공하지 않으면 base64로 인코딩된 이미지 데이터를 반환합니다.

### 자동 최적화

스크린샷은 LLM 소비를 위해 자동으로 처리됩니다:

| 최적화 | 값 | 설명 |
|--------------|-------|-------------|
| 최대 크기 | 2000px | 2000px보다 큰 이미지는 축소됨 |
| 최대 파일 크기 | 1MB | 이미지는 1MB 미만으로 압축됨 |
| 형식 | PNG/JPEG | 최대 압축의 PNG; 크기를 위해 필요한 경우 JPEG |

이 최적화는 토큰 제한을 초과하지 않고 스크린샷을 효율적으로 처리할 수 있도록 합니다.

---

## 세션 동작

### 세션 유형

MCP 서버는 적절한 도구와 동작을 제공하기 위해 세션 유형을 추적합니다:

| 유형 | 설명 | 자동 분리 |
|------|-------------|-------------|
| `browser` | Chrome 브라우저 세션 | 아니오 |
| `ios` | iOS 앱 세션 | 예(`noReset: true` 또는 `appPath` 없는 경우) |
| `android` | Android 앱 세션 | 예(`noReset: true` 또는 `appPath` 없는 경우) |

### 단일 세션 모델

MCP 서버는 **단일 세션 모델**로 작동합니다:

-   한 번에 하나의 브라우저 또는 앱 세션만 활성화 가능
-   새 세션을 시작하면 현재 세션이 종료/분리됨
-   세션 상태는 도구 호출 전반에 걸쳐 전역적으로 유지됨

### 분리 vs 종료

| 동작 | `detach: false` (종료) | `detach: true` (분리) |
|--------|-------------------------|-------------------------|
| 브라우저 | Chrome을 완전히 종료 | Chrome을 실행 상태로 유지, WebDriver 연결 해제 |
| 모바일 앱 | 앱 종료 | 현재 상태로 앱 실행 유지 |
| 사용 사례 | 다음 세션을 위한 깨끗한 상태 | 상태 유지, 수동 검사 |

---

## 성능 고려사항

MCP 서버는 Claude에 데이터를 전송할 때 토큰 사용을 최소화하는 **TOON(Token-Oriented Object Notation)** 형식을 사용하여 효율적인 LLM 통신을 위해 최적화되어 있습니다.

### 브라우저 자동화

-   **헤드리스 모드**가 더 빠르지만 시각적 요소를 렌더링하지 않음
-   **작은 창 크기**는 스크린샷 캡처 시간 단축
-   **요소 탐지**는 단일 스크립트 실행으로 최적화됨
-   **스크린샷 최적화**는 효율적인 처리를 위해 이미지를 1MB 미만으로 유지
-   **`inViewportOnly: true`** (기본값)는 보이는 요소만 필터링

### 모바일 자동화

-   **XML 페이지 소스 파싱**은 단 2개의 HTTP 호출만 사용 (전통적인 요소 쿼리의 600개 이상과 비교)
-   **Accessibility ID 선택자**가 가장 빠르고 신뢰할 수 있음
-   **XPath 선택자**가 가장 느림 - 최후의 수단으로만 사용
-   **`inViewportOnly: true`** (기본값)는 요소 수를 크게 줄임
-   **페이지네이션** (`limit`과 `offset`)은 많은 요소가 있는 화면에서 토큰 사용량 감소
-   **`includeBounds: false`** (기본값)는 필요하지 않은 경우 좌표 데이터 생략

### 토큰 사용 팁

| 설정 | 영향 |
|---------|--------|
| `inViewportOnly: true` | 화면 밖 요소를 필터링하여 응답 크기 축소 |
| `includeContainers: false` | 레이아웃 요소(ViewGroup 등) 제외 |
| `includeBounds: false` | x/y/width/height 데이터 생략 |
| `limit`을 사용한 페이지네이션 | 한 번에 모든 요소가 아닌 배치로 처리 |
| `namedOnly: true` (접근성) | 익명 노드 필터링 |

---

## Appium 서버 설정

모바일 자동화를 사용하기 전에 Appium이 올바르게 구성되어 있는지 확인하세요.

### 기본 설정

```sh
# Appium 전역 설치
npm install -g appium

# 드라이버 설치
appium driver install xcuitest    # iOS
appium driver install uiautomator2  # Android

# 서버 시작
appium
```

### 사용자 지정 서버 구성

```sh
# 사용자 지정 호스트 및 포트로 시작
appium --address 0.0.0.0 --port 4724

# 로깅과 함께 시작
appium --log-level debug

# 특정 기본 경로로 시작
appium --base-path /wd/hub
```

### 설치 확인

```sh
# 설치된 드라이버 확인
appium driver list --installed

# Appium 버전 확인
appium --version

# 연결 테스트
curl http://localhost:4723/status
```

---

## 환경 설정 문제 해결

### MCP 서버가 시작되지 않음

1. npm/npx가 설치되어 있는지 확인: `npm --version`
2. 수동으로 실행 시도: `npx @wdio/mcp`
3. 오류를 확인하기 위해 Claude Desktop 로그 확인

### Appium 연결 문제

1. Appium이 실행 중인지 확인: `curl http://localhost:4723/status`
2. 환경 변수가 Appium 서버 설정과 일치하는지 확인
3. 방화벽이 Appium 포트에 대한 연결을 허용하는지 확인

### 세션이 시작되지 않음

1. **브라우저:** Chrome이 설치되어 있는지 확인
2. **iOS:** Xcode와 시뮬레이터를 사용할 수 있는지 확인
3. **Android:** `ANDROID_HOME`과 에뮬레이터가 실행 중인지 확인
4. 자세한 오류 메시지는 Appium 서버 로그 확인

### 세션 타임아웃

디버깅 중에 세션이 타임아웃되는 경우:
1. 세션 시작 시 `newCommandTimeout` 증가
2. 세션 간 상태를 유지하려면 `noReset: true` 사용
3. 앱을 계속 실행하려면 종료할 때 `detach: true` 사용