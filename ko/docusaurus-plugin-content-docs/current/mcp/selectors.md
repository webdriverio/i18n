---
id: selectors
title: 셀렉터
---

WebdriverIO MCP 서버는 웹 페이지와 모바일 앱에서 요소를 찾기 위한 다양한 셀렉터 전략을 지원합니다.

:::info

모든 WebdriverIO 셀렉터 전략을 포함한 포괄적인 셀렉터 문서는 주요 [셀렉터](/docs/selectors) 가이드를 참조하세요. 이 페이지는 MCP 서버에서 일반적으로 사용되는 셀렉터에 중점을 둡니다.

:::

## 웹 셀렉터

브라우저 자동화를 위해 MCP 서버는 모든 표준 WebdriverIO 셀렉터를 지원합니다. 가장 일반적으로 사용되는 것들은 다음과 같습니다:

| 셀렉터 | 예시 | 설명 |
|----------|---------|-------------|
| CSS | `#login-button`, `.submit-btn` | 표준 CSS 셀렉터 |
| XPath | `//button[@id='submit']` | XPath 표현식 |
| 텍스트 | `button=Submit`, `a*=Click` | WebdriverIO 텍스트 셀렉터 |
| ARIA | `aria/Submit Button` | 접근성 이름 셀렉터 |
| 테스트 ID | `[data-testid="submit"]` | 테스트에 권장됨 |

자세한 예시와 모범 사례는 [셀렉터](/docs/selectors) 문서를 참조하세요.

---

## 모바일 셀렉터

모바일 셀렉터는 Appium을 통해 iOS 및 Android 플랫폼 모두에서 작동합니다.

### 접근성 ID (권장)

접근성 ID는 **가장 신뢰할 수 있는 크로스 플랫폼 셀렉터**입니다. iOS와 Android 모두에서 작동하며 앱 업데이트에도 안정적입니다.

```
# 구문
~accessibilityId

# 예시
~loginButton
~submitForm
~usernameField
```

:::tip 모범 사례
가능한 경우 항상 접근성 ID를 선호하세요. 다음과 같은 이점이 있습니다:
- 크로스 플랫폼 호환성(iOS + Android)
- UI 변경에도 안정성 유지
- 더 나은 테스트 유지보수성
- 앱의 접근성 향상
:::

### Android 셀렉터

#### UiAutomator

UiAutomator 셀렉터는 Android에서 강력하고 빠릅니다.

```
# 텍스트로 찾기
android=new UiSelector().text("Login")

# 부분 텍스트로 찾기
android=new UiSelector().textContains("Log")

# 리소스 ID로 찾기
android=new UiSelector().resourceId("com.example:id/login_button")

# 클래스 이름으로 찾기
android=new UiSelector().className("android.widget.Button")

# 설명(접근성)으로 찾기
android=new UiSelector().description("Login button")

# 조건 결합
android=new UiSelector().className("android.widget.Button").text("Login")

# 스크롤 가능한 컨테이너
android=new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().text("Item"))
```

#### 리소스 ID

리소스 ID는 Android에서 안정적인 요소 식별을 제공합니다.

```
# 전체 리소스 ID
id=com.example.app:id/login_button

# 부분 ID(앱 패키지 추론)
id=login_button
```

#### XPath (Android)

XPath는 Android에서 작동하지만 UiAutomator보다 느립니다.

```
# 클래스와 텍스트로 찾기
//android.widget.Button[@text='Login']

# 리소스 ID로 찾기
//android.widget.EditText[@resource-id='com.example:id/username']

# 콘텐츠 설명으로 찾기
//android.widget.ImageButton[@content-desc='Menu']

# 계층 구조로 찾기
//android.widget.LinearLayout/android.widget.Button[1]
```

### iOS 셀렉터

#### Predicate String

iOS Predicate String은 iOS 자동화에서 빠르고 강력합니다.

```
# 레이블로 찾기
-ios predicate string:label == "Login"

# 부분 레이블로 찾기
-ios predicate string:label CONTAINS "Log"

# 이름으로 찾기
-ios predicate string:name == "loginButton"

# 타입으로 찾기
-ios predicate string:type == "XCUIElementTypeButton"

# 값으로 찾기
-ios predicate string:value == "ON"

# 조건 결합
-ios predicate string:type == "XCUIElementTypeButton" AND label == "Login"

# 가시성 확인
-ios predicate string:label == "Login" AND visible == 1

# 대소문자 구분 없음
-ios predicate string:label ==[c] "login"
```

**Predicate 연산자:**

| 연산자 | 설명 |
|----------|-------------|
| `==` | 같음 |
| `!=` | 같지 않음 |
| `CONTAINS` | 부분 문자열 포함 |
| `BEGINSWITH` | ~로 시작함 |
| `ENDSWITH` | ~로 끝남 |
| `LIKE` | 와일드카드 일치 |
| `MATCHES` | 정규식 일치 |
| `AND` | 논리 AND |
| `OR` | 논리 OR |

#### Class Chain

iOS Class Chain은 계층적 요소 위치 지정을 좋은 성능으로 제공합니다.

```
# 직접 자식
-ios class chain:**/XCUIElementTypeButton[`label == "Login"`]

# 모든 하위 항목
-ios class chain:**/XCUIElementTypeButton

# 인덱스로 찾기
-ios class chain:**/XCUIElementTypeCell[3]

# Predicate와 결합
-ios class chain:**/XCUIElementTypeButton[`name == "submit" AND visible == 1`]

# 계층 구조
-ios class chain:**/XCUIElementTypeTable/XCUIElementTypeCell[`label == "Settings"`]

# 마지막 요소
-ios class chain:**/XCUIElementTypeButton[-1]
```

#### XPath (iOS)

XPath는 iOS에서 작동하지만 predicate string보다 느립니다.

```
# 타입과 레이블로 찾기
//XCUIElementTypeButton[@label='Login']

# 이름으로 찾기
//XCUIElementTypeTextField[@name='username']

# 값으로 찾기
//XCUIElementTypeSwitch[@value='1']

# 계층 구조
//XCUIElementTypeTable/XCUIElementTypeCell[1]
```

---

## 크로스 플랫폼 셀렉터 전략

iOS와 Android 모두에서 작동해야 하는 테스트를 작성할 때는 다음 우선 순위를 사용하세요:

### 1. 접근성 ID (최선)

```
# 두 플랫폼 모두에서 작동
~loginButton
```

### 2. 플랫폼별 셀렉터와 조건부 로직

접근성 ID를 사용할 수 없는 경우 플랫폼별 셀렉터를 사용하세요:

**Android:**
```
android=new UiSelector().text("Login")
```

**iOS:**
```
-ios predicate string:label == "Login"
```

### 3. XPath (최후의 수단)

XPath는 두 플랫폼 모두에서 작동하지만 요소 유형이 다릅니다:

**Android:**
```
//android.widget.Button[@text='Login']
```

**iOS:**
```
//XCUIElementTypeButton[@label='Login']
```

---

## 요소 유형 참조

### Android 요소 유형

| 유형 | 설명 |
|------|-------------|
| `android.widget.Button` | 버튼 |
| `android.widget.EditText` | 텍스트 입력 |
| `android.widget.TextView` | 텍스트 라벨 |
| `android.widget.ImageView` | 이미지 |
| `android.widget.ImageButton` | 이미지 버튼 |
| `android.widget.CheckBox` | 체크박스 |
| `android.widget.RadioButton` | 라디오 버튼 |
| `android.widget.Switch` | 토글 스위치 |
| `android.widget.Spinner` | 드롭다운 |
| `android.widget.ListView` | 리스트 뷰 |
| `android.widget.RecyclerView` | 리사이클러 뷰 |
| `android.widget.ScrollView` | 스크롤 컨테이너 |

### iOS 요소 유형

| 유형 | 설명 |
|------|-------------|
| `XCUIElementTypeButton` | 버튼 |
| `XCUIElementTypeTextField` | 텍스트 입력 |
| `XCUIElementTypeSecureTextField` | 비밀번호 입력 |
| `XCUIElementTypeStaticText` | 텍스트 라벨 |
| `XCUIElementTypeImage` | 이미지 |
| `XCUIElementTypeSwitch` | 토글 스위치 |
| `XCUIElementTypeSlider` | 슬라이더 |
| `XCUIElementTypePicker` | 피커 휠 |
| `XCUIElementTypeTable` | 테이블 뷰 |
| `XCUIElementTypeCell` | 테이블 셀 |
| `XCUIElementTypeCollectionView` | 컬렉션 뷰 |
| `XCUIElementTypeScrollView` | 스크롤 뷰 |

---

## 모범 사례

### 권장 사항

- **접근성 ID 사용** - 안정적인 크로스 플랫폼 셀렉터
- **웹 요소에 data-testid 속성 추가** - 테스트용
- **접근성 ID를 사용할 수 없는 경우 Android에서는 리소스 ID 사용**
- **iOS에서는 XPath보다 predicate string 선호**
- **셀렉터를 간단하고 명확하게 유지**

### 지양할 점

- **긴 XPath 표현식 피하기** - 느리고 불안정함
- **동적 리스트에서 인덱스에 의존하지 않기**
- **로컬라이즈된 앱에서 텍스트 기반 셀렉터 사용 지양**
- **절대 XPath 사용하지 않기** (루트에서 시작)

### 좋은 vs 나쁜 셀렉터 예시

```
# 좋음 - 안정적인 접근성 ID
~loginButton

# 나쁨 - 인덱스가 있는 불안정한 XPath
//div[3]/form/button[2]

# 좋음 - 테스트 ID가 있는 구체적인 CSS
[data-testid="submit-button"]

# 나쁨 - 변경될 수 있는 클래스
.btn-primary-lg-v2

# 좋음 - 리소스 ID가 있는 UiAutomator
android=new UiSelector().resourceId("com.app:id/submit")

# 나쁨 - 로컬라이즈될 수 있는 텍스트
android=new UiSelector().text("Submit")
```

---

## 셀렉터 디버깅

### 웹 (Chrome DevTools)

1. Chrome DevTools 열기 (F12)
2. Elements 패널에서 요소 검사
3. 요소 우클릭 → 복사 → 셀렉터 복사
4. 콘솔에서 셀렉터 테스트: `document.querySelector('your-selector')`

### 모바일 (Appium Inspector)

1. Appium Inspector 시작
2. 실행 중인 세션에 연결
3. 요소를 클릭하여 사용 가능한 모든 속성 확인
4. "Search for element" 기능을 사용하여 셀렉터 테스트

### `get_visible_elements` 사용

MCP 서버의 `get_visible_elements` 도구는 각 요소에 대해 여러 셀렉터 전략을 반환합니다:

```
Ask Claude: "Get all visible elements on the screen"
```

이것은 직접 사용할 수 있는 미리 생성된 셀렉터가 있는 요소를 반환합니다.

#### 고급 옵션

요소 탐색을 더 잘 제어하려면:

```
# 이미지와 시각적 요소만 가져오기
Get visible elements with elementType "visual"

# 레이아웃 디버깅을 위한 좌표가 있는 요소 가져오기
Get visible elements with includeBounds enabled

# 다음 20개 요소 가져오기 (페이지네이션)
Get visible elements with limit 20 and offset 20

# 디버깅을 위한 레이아웃 컨테이너 포함하기
Get visible elements with includeContainers enabled
```

이 도구는 페이지네이션된 응답을 반환합니다:
```json
{
  "total": 42,
  "showing": 20,
  "hasMore": true,
  "elements": [...]
}
```

### `get_accessibility` 사용 (브라우저만 해당)

브라우저 자동화의 경우, `get_accessibility` 도구는 페이지 요소에 대한 의미론적 정보를 제공합니다:

```
# 이름이 있는 모든 접근성 노드 가져오기
Get accessibility tree

# 버튼과 링크 역할만 필터링
Get accessibility tree filtered to button and link roles

# 결과의 다음 페이지 가져오기
Get accessibility tree with limit 50 and offset 50
```

이것은 `get_visible_elements`가 예상된 요소를 반환하지 않을 때 유용하며, 브라우저의 기본 접근성 API를 쿼리합니다.