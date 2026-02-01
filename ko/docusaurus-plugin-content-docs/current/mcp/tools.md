---
id: tools
title: 도구
---

다음 도구들은 WebdriverIO MCP 서버를 통해 사용할 수 있습니다. 이 도구들을 통해 AI 어시스턴트가 브라우저와 모바일 애플리케이션을 자동화할 수 있습니다.

## 세션 관리

### `start_browser`

Chrome 브라우저 세션을 시작합니다.

#### 매개변수

| 매개변수 | 타입 | 필수 | 기본값 | 설명 |
|-----------|------|-----------|---------|-------------|
| `headless` | boolean | 아니오 | `false` | 헤드리스 모드로 Chrome 실행 |
| `windowWidth` | number | 아니오 | `1920` | 브라우저 창 너비 (400-3840) |
| `windowHeight` | number | 아니오 | `1080` | 브라우저 창 높이 (400-2160) |
| `navigationUrl` | string | 아니오 | - | 브라우저 시작 후 이동할 URL |

#### 예제

```
Start a browser with 1920x1080 resolution and navigate to webdriver.io
```

#### 지원

- 데스크톱 브라우저

---

### `start_app_session`

Appium을 통해 iOS 또는 Android에서 모바일 앱 세션을 시작합니다.

#### 매개변수

| 매개변수 | 타입 | 필수 | 기본값 | 설명 |
|-----------|------|-----------|---------|-------------|
| `platform` | string | 예 | - | 자동화할 플랫폼: `iOS` 또는 `Android` |
| `deviceName` | string | 예 | - | 기기 또는 시뮬레이터/에뮬레이터 이름 |
| `appPath` | string | 아니오* | - | 앱 파일 경로 (.app, .ipa, 또는 .apk) |
| `platformVersion` | string | 아니오 | - | OS 버전 (예: `17.0`, `14`) |
| `automationName` | string | 아니오 | 자동 | `XCUITest` (iOS), `UiAutomator2` 또는 `Espresso` (Android) |
| `udid` | string | 아니오 | - | 고유 기기 식별자 (실제 iOS 기기에 필요) |
| `noReset` | boolean | 아니오 | `false` | 세션 간 앱 상태 유지 |
| `fullReset` | boolean | 아니오 | `true` | 세션 전에 앱 제거 및 재설치 |
| `autoGrantPermissions` | boolean | 아니오 | `true` | 자동으로 앱 권한 부여 |
| `autoAcceptAlerts` | boolean | 아니오 | `true` | 자동으로 시스템 알림 수락 |
| `autoDismissAlerts` | boolean | 아니오 | `false` | 알림 수락 대신 무시 |
| `appWaitActivity` | string | 아니오 | - | 시작 시 기다릴 활동 (Android만 해당) |
| `newCommandTimeout` | number | 아니오 | `60` | 비활성으로 인한 세션 타임아웃 전 시간(초) |
| `appiumHost` | string | 아니오 | `127.0.0.1` | Appium 서버 호스트명 |
| `appiumPort` | number | 아니오 | `4723` | Appium 서버 포트 |
| `appiumPath` | string | 아니오 | `/` | Appium 서버 경로 |

*`appPath`를 제공하거나 이미 실행 중인 앱에 연결하기 위해 `noReset: true`가 필요합니다.

#### 예제

```
Start an iOS app session on iPhone 15 simulator with my app at /path/to/app.app
```

#### 지원

- iOS 시뮬레이터
- iOS 실제 기기
- Android 에뮬레이터
- Android 실제 기기

---

### `close_session`

현재 브라우저 또는 앱 세션을 종료합니다.

#### 매개변수

| 매개변수 | 타입 | 필수 | 기본값 | 설명 |
|-----------|------|-----------|---------|-------------|
| `detach` | boolean | 아니오 | `false` | 세션 종료 대신 분리 (브라우저/앱 실행 상태 유지) |

#### 참고

`noReset: true` 또는 `appPath` 없이 시작된 세션은 상태 보존을 위해 종료 시 자동으로 분리됩니다.

#### 지원

- 데스크톱 브라우저
- 모바일 앱

---

## 탐색

### `navigate`

URL로 이동합니다.

#### 매개변수

| 매개변수 | 타입 | 필수 | 설명 |
|-----------|------|-----------|-------------|
| `url` | string | 예 | 이동할 URL |

#### 예제

```
Navigate to https://webdriver.io
```

#### 지원

- 데스크톱 브라우저

---

## 요소 상호작용

### `click_element`

선택자로 식별된 요소를 클릭합니다.

#### 매개변수

| 매개변수 | 타입 | 필수 | 기본값 | 설명 |
|-----------|------|-----------|---------|-------------|
| `selector` | string | 예 | - | CSS 선택자, XPath, 또는 모바일 선택자 |
| `scrollToView` | boolean | 아니오 | `true` | 클릭하기 전 요소를 화면에 표시 |
| `timeout` | number | 아니오 | `3000` | 요소 대기 최대 시간 (ms) |

#### 참고

- WebdriverIO 텍스트 선택자 지원: `button=Exact text` 또는 `a*=Contains text`
- 스크롤 위치 지정에 중앙 정렬 사용

#### 예제

```
Click the element with selector "#submit-button"
```

#### 지원

- 데스크톱 브라우저
- 모바일 네이티브 앱

---

### `set_value`

입력 필드에 텍스트를 입력합니다.

#### 매개변수

| 매개변수 | 타입 | 필수 | 기본값 | 설명 |
|-----------|------|-----------|---------|-------------|
| `selector` | string | 예 | - | 입력 요소의 선택자 |
| `value` | string | 예 | - | 입력할 텍스트 |
| `scrollToView` | boolean | 아니오 | `true` | 입력하기 전 요소를 화면에 표시 |
| `timeout` | number | 아니오 | `3000` | 요소 대기 최대 시간 (ms) |

#### 참고

새 텍스트를 입력하기 전 기존 값을 지웁니다.

#### 예제

```
Set the value "john@example.com" in the element with selector "#email"
```

#### 지원

- 데스크톱 브라우저
- 모바일 네이티브 앱

---

## 페이지 분석

### `get_visible_elements`

현재 페이지나 화면에서 보이고 상호작용 가능한 요소들을 가져옵니다. 이는 상호작용 가능한 요소를 찾는 주요 도구입니다.

#### 매개변수

| 매개변수 | 타입 | 필수 | 기본값 | 설명 |
|-----------|------|-----------|---------|-------------|
| `elementType` | string | 아니오 | `interactable` | 요소 유형: `interactable` (버튼/링크/입력), `visual` (이미지/SVG), 또는 `all` |
| `inViewportOnly` | boolean | 아니오 | `true` | 뷰포트에 보이는 요소만 반환 |
| `includeContainers` | boolean | 아니오 | `false` | 레이아웃 컨테이너(ViewGroup, ScrollView 등) 포함 |
| `includeBounds` | boolean | 아니오 | `false` | 요소 좌표(x, y, width, height) 포함 |
| `limit` | number | 아니오 | `0` | 반환할 최대 요소 수 (0 = 무제한) |
| `offset` | number | 아니오 | `0` | 건너뛸 요소 수 (페이지네이션용) |

#### 반환값

```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

**웹 요소 포함:** tagName, type, id, className, textContent, value, placeholder, href, ariaLabel, role, cssSelector, isInViewport

**모바일 요소 포함:** 여러 로케이터 전략(accessibility ID, resource ID, XPath, UiAutomator/predicates), 요소 타입, 텍스트, 선택적 바운드

#### 참고

- **웹**: 빠른 요소 감지를 위한 최적화된 브라우저 스크립트 사용
- **모바일**: 효율적인 XML 페이지 소스 파싱(요소 쿼리를 위한 600개 이상이 아닌 단 2개의 HTTP 호출)
- 큰 페이지에서는 토큰 사용량을 줄이기 위해 페이지네이션(`limit`과 `offset`) 사용

#### 예제

```
Get all visible elements on the page with their coordinates
```

#### 지원

- 데스크톱 브라우저
- 모바일 앱

---

### `get_accessibility`

현재 페이지의 접근성 트리를 역할, 이름, 상태에 관한 의미론적 정보와 함께 가져옵니다.

#### 매개변수

| 매개변수 | 타입 | 필수 | 기본값 | 설명 |
|-----------|------|-----------|---------|-------------|
| `limit` | number | 아니오 | `100` | 반환할 최대 노드 수 (0 = 무제한) |
| `offset` | number | 아니오 | `0` | 건너뛸 노드 수 (페이지네이션용) |
| `roles` | string[] | 아니오 | 모두 | 특정 역할로 필터링 (예: `["button", "link", "textbox"]`) |
| `namedOnly` | boolean | 아니오 | `true` | 이름/레이블이 있는 노드만 반환 |

#### 반환값

```json
{
  "total": 85,
  "showing": 100,
  "hasMore": false,
  "nodes": [
    { "role": "button", "name": "Submit" },
    { "role": "link", "name": "Home" }
  ]
}
```

#### 참고

- 브라우저 전용. 모바일 앱은 대신 `get_visible_elements` 사용
- `get_visible_elements`가 예상 요소를 반환하지 않을 때 유용함
- `namedOnly: true`는 익명 컨테이너를 필터링하고 노이즈를 줄임

#### 지원

- 데스크톱 브라우저

---

## 스크린샷

### `take_screenshot`

현재 뷰포트의 스크린샷을 캡처합니다.

#### 매개변수

| 매개변수 | 타입 | 필수 | 설명 |
|-----------|------|-----------|-------------|
| `outputPath` | string | 아니오 | 스크린샷 파일 저장 경로. 생략 시 base64 데이터 반환 |

#### 반환값

Base64로 인코딩된 이미지 데이터(PNG 또는 JPEG)와 크기 정보.

#### 참고

스크린샷은 자동으로 최적화됩니다:
- 최대 치수: 2000px (더 큰 경우 축소)
- 최대 파일 크기: 1MB
- 형식: 최대 압축의 PNG, 또는 크기 제한을 맞추기 위해 필요한 경우 JPEG

#### 지원

- 데스크톱 브라우저
- 모바일 앱

---

## 스크롤

### `scroll`

페이지를 지정된 픽셀만큼 위 또는 아래로 스크롤합니다.

#### 매개변수

| 매개변수 | 타입 | 필수 | 기본값 | 설명 |
|-----------|------|-----------|---------|-------------|
| `direction` | string | 예 | - | 스크롤 방향: `up` 또는 `down` |
| `pixels` | number | 아니오 | `500` | 스크롤할 픽셀 수 |

#### 참고

브라우저 전용. 모바일 스크롤링은 대신 `swipe` 도구를 사용하세요.

#### 지원

- 데스크톱 브라우저

---

## 쿠키 관리

### `get_cookies`

현재 세션의 쿠키를 가져옵니다.

#### 매개변수

| 매개변수 | 타입 | 필수 | 설명 |
|-----------|------|-----------|-------------|
| `name` | string | 아니오 | 가져올 특정 쿠키 이름 (생략 시 모든 쿠키) |

#### 반환값

name, value, domain, path, expiry, secure, httpOnly 속성이 있는 쿠키 객체.

#### 지원

- 데스크톱 브라우저

---

### `set_cookie`

현재 세션에 쿠키를 설정합니다.

#### 매개변수

| 매개변수 | 타입 | 필수 | 기본값 | 설명 |
|-----------|------|-----------|---------|-------------|
| `name` | string | 예 | - | 쿠키 이름 |
| `value` | string | 예 | - | 쿠키 값 |
| `domain` | string | 아니오 | 현재 | 쿠키 도메인 |
| `path` | string | 아니오 | `/` | 쿠키 경로 |
| `expiry` | number | 아니오 | - | Unix 타임스탬프(초) 형식의 만료 시간 |
| `secure` | boolean | 아니오 | - | 보안 플래그 |
| `httpOnly` | boolean | 아니오 | - | HttpOnly 플래그 |
| `sameSite` | string | 아니오 | - | SameSite 속성: `strict`, `lax`, 또는 `none` |

#### 지원

- 데스크톱 브라우저

---

### `delete_cookies`

현재 세션에서 쿠키를 삭제합니다.

#### 매개변수

| 매개변수 | 타입 | 필수 | 설명 |
|-----------|------|-----------|-------------|
| `name` | string | 아니오 | 삭제할 특정 쿠키 이름 (생략 시 모든 쿠키 삭제) |

#### 지원

- 데스크톱 브라우저

---

## 터치 제스처 (모바일)

### `tap_element`

요소 또는 화면 좌표를 탭합니다.

#### 매개변수

| 매개변수 | 타입 | 필수 | 설명 |
|-----------|------|-----------|-------------|
| `selector` | string | 아니오* | 탭할 요소의 선택자 |
| `x` | number | 아니오* | 탭할 X 좌표 |
| `y` | number | 아니오* | 탭할 Y 좌표 |

*`selector` 또는 `x`와 `y` 둘 다 필요합니다.

#### 지원

- 모바일 앱

---

### `swipe`

지정된 방향으로 스와이프 제스처를 수행합니다.

#### 매개변수

| 매개변수 | 타입 | 필수 | 기본값 | 설명 |
|-----------|------|-----------|---------|-------------|
| `direction` | string | 예 | - | 스와이프 방향: `up`, `down`, `left`, `right` |
| `duration` | number | 아니오 | `500` | 스와이프 지속 시간(밀리초) (100-5000) |
| `percent` | number | 아니오 | 0.5/0.95 | 스와이프할 화면 비율 (0-1) |

#### 참고

- 기본 비율: 수직 스와이프 0.5, 수평 스와이프 0.95
- 방향은 컨텐츠 이동을 나타냄: "위로 스와이프"는 컨텐츠를 위로 스크롤

#### 예제

```
Swipe up to scroll down the screen
```

#### 지원

- 모바일 앱

---

### `drag_and_drop`

요소를 다른 요소나 좌표로 드래그합니다.

#### 매개변수

| 매개변수 | 타입 | 필수 | 설명 |
|-----------|------|-----------|-------------|
| `sourceSelector` | string | 예 | 드래그할 소스 요소 선택자 |
| `targetSelector` | string | 아니오* | 드롭할 대상 요소 선택자 |
| `x` | number | 아니오* | 대상 X 오프셋 (targetSelector 없을 경우) |
| `y` | number | 아니오* | 대상 Y 오프셋 (targetSelector 없을 경우) |
| `duration` | number | 아니오 | 기본값 | 드래그 지속 시간(밀리초) (100-5000) |

*`targetSelector` 또는 `x`와 `y` 둘 다 필요합니다.

#### 지원

- 모바일 앱

---

## 앱 생명주기 (모바일)

### `get_app_state`

앱의 현재 상태를 가져옵니다.

#### 매개변수

| 매개변수 | 타입 | 필수 | 설명 |
|-----------|------|-----------|-------------|
| `bundleId` | string | 예 | 앱 식별자 (iOS의 번들 ID, Android의 패키지 이름) |

#### 반환값

앱 상태: `not installed`, `not running`, `running in background (suspended)`, `running in background` 또는 `running in foreground`.

#### 지원

- 모바일 앱

---

## 컨텍스트 전환 (하이브리드 앱)

### `get_contexts`

사용 가능한 모든 컨텍스트(네이티브 및 웹뷰)를 나열합니다.

#### 매개변수

없음

#### 반환값

컨텍스트 이름 배열 (예: `["NATIVE_APP", "WEBVIEW_com.example.app"]`).

#### 지원

- 모바일 하이브리드 앱

---

### `get_current_context`

현재 활성화된 컨텍스트를 가져옵니다.

#### 매개변수

없음

#### 반환값

현재 컨텍스트 이름 (예: `NATIVE_APP` 또는 `WEBVIEW_*`).

#### 지원

- 모바일 하이브리드 앱

---

### `switch_context`

네이티브와 웹뷰 컨텍스트 간 전환합니다.

#### 매개변수

| 매개변수 | 타입 | 필수 | 설명 |
|-----------|------|-----------|-------------|
| `context` | string | 예 | `get_contexts`에서 얻은 컨텍스트 이름 또는 인덱스(1부터 시작) |

#### 예제

```
Switch to the WEBVIEW_com.example.app context
```

#### 지원

- 모바일 하이브리드 앱

---

## 기기 제어 (모바일)

### `rotate_device`

기기를 특정 방향으로 회전합니다.

#### 매개변수

| 매개변수 | 타입 | 필수 | 설명 |
|-----------|------|-----------|-------------|
| `orientation` | string | 예 | `PORTRAIT` 또는 `LANDSCAPE` |

#### 지원

- 모바일 앱

---

### `hide_keyboard`

화면 키보드를 숨깁니다.

#### 매개변수

없음

#### 지원

- 모바일 앱

---

### `get_geolocation`

현재 GPS 좌표를 가져옵니다.

#### 매개변수

없음

#### 반환값

`latitude`, `longitude`, `altitude` 속성을 가진 객체.

#### 지원

- 모바일 앱

---

### `set_geolocation`

기기 GPS 좌표를 설정합니다.

#### 매개변수

| 매개변수 | 타입 | 필수 | 설명 |
|-----------|------|-----------|-------------|
| `latitude` | number | 예 | 위도 좌표 (-90에서 90) |
| `longitude` | number | 예 | 경도 좌표 (-180에서 180) |
| `altitude` | number | 아니오 | 고도(미터) |

#### 예제

```
Set geolocation to San Francisco (37.7749, -122.4194)
```

#### 지원

- 모바일 앱

---

## 스크립트 실행

### `execute_script`

브라우저에서 JavaScript를 실행하거나 Appium을 통해 모바일 명령을 실행합니다.

#### 매개변수

| 매개변수 | 타입 | 필수 | 설명 |
|-----------|------|-----------|-------------|
| `script` | string | 예 | JavaScript 코드(브라우저) 또는 모바일 명령(예: `mobile: pressKey`) |
| `args` | array | 아니오 | 스크립트용 인수 |

#### 브라우저 예제

```javascript
// Get page title
execute_script({ script: "return document.title" })

// Get scroll position
execute_script({ script: "return window.scrollY" })

// Click element by selector
execute_script({ script: "arguments[0].click()", args: ["#myButton"] })
```

#### 모바일 (Appium) 예제

```javascript
// Press back key (Android)
execute_script({ script: "mobile: pressKey", args: [{ keycode: 4 }] })

// Activate app
execute_script({ script: "mobile: activateApp", args: [{ appId: "com.example" }] })

// Terminate app
execute_script({ script: "mobile: terminateApp", args: [{ appId: "com.example" }] })

// Deep link
execute_script({ script: "mobile: deepLink", args: [{ url: "myapp://screen", package: "com.example" }] })

// Shell command (Android)
execute_script({ script: "mobile: shell", args: [{ command: "dumpsys", args: ["battery"] }] })
```

#### 일반적인 Android 키 코드

| 키 | 코드 |
|-----|------|
| BACK | 4 |
| HOME | 3 |
| ENTER | 66 |
| MENU | 82 |
| SEARCH | 84 |

#### 더 많은 모바일 명령

사용 가능한 Appium 모바일 명령의 전체 목록은 다음을 참조하세요:
- [XCUITest Mobile Commands](https://appium.github.io/appium-xcuitest-driver/latest/reference/execute-methods/) (iOS)
- [UiAutomator2 Mobile Commands](https://github.com/appium/appium-uiautomator2-driver#mobile-commands) (Android)

#### 지원

- 데스크톱 브라우저
- 모바일 앱 (Appium 모바일 명령을 통해)