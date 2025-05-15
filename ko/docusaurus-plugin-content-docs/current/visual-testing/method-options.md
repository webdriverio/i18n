---
id: method-options
title: 메소드 옵션
---

메소드 옵션은 [메소드](./methods)별로 설정할 수 있는 옵션입니다. 만약 옵션이 플러그인 인스턴스화 중에 설정된 옵션과 같은 키를 가지고 있다면, 이 메소드 옵션은 플러그인 옵션 값을 재정의합니다.

## 저장 옵션

### `disableBlinkingCursor`

-   **타입:** `boolean`
-   **필수:** 아니오
-   **기본값:** `false`
-   **지원:** 웹, 하이브리드 앱(웹뷰)

애플리케이션에서 모든 `input`, `textarea`, `[contenteditable]`의 커서 "깜박임"을 활성화/비활성화합니다. `true`로 설정하면 스크린샷을 찍기 전에 커서가 `transparent`로 설정되고 작업이 완료되면 재설정됩니다.

### `disableCSSAnimation`

-   **타입:** `boolean`
-   **필수:** 아니오
-   **기본값:** `false`
-   **지원:** 웹, 하이브리드 앱(웹뷰)

애플리케이션에서 모든 CSS 애니메이션을 활성화/비활성화합니다. `true`로 설정하면 스크린샷을 찍기 전에 모든 애니메이션이 비활성화되고 작업이 완료되면 재설정됩니다.

### `enableLegacyScreenshotMethod`

-   **타입:** `boolean`
-   **필수:** 아니오
-   **기본값:** `false`
-   **지원:** 웹, 하이브리드 앱(웹뷰)

W3C-WebDriver 프로토콜을 기반으로 한 "이전" 스크린샷 방식으로 전환하려면 이 옵션을 사용하세요. 테스트가 기존 기준 이미지에 의존하거나 BiDi 기반 스크린샷을 완전히 지원하지 않는 환경에서 실행 중인 경우 유용할 수 있습니다.
이 기능을 활성화하면 해상도나 품질이 약간 다른 스크린샷이 생성될 수 있습니다.

### `enableLayoutTesting`

-   **타입:** `boolean`
-   **필수:** 아니오
-   **기본값:** `false`
-   **사용:** 모든 [메소드](./methods)
-   **지원:** 웹

페이지의 모든 텍스트를 숨겨서 레이아웃만 비교에 사용됩니다. 숨김 처리는 __각__ 요소에 `'color': 'transparent !important'` 스타일을 추가하여 수행됩니다.

출력 결과는 [테스트 출력](./test-output#enablelayouttesting)을 참조하세요.

:::info
이 플래그를 사용하면 텍스트가 포함된 모든 요소(즉, `p, h1, h2, h3, h4, h5, h6, span, a, li`뿐만 아니라 `div|button|..` 등)에 이 속성이 적용됩니다. 이를 조정하는 옵션은 __없습니다__.
:::

### `hideScrollBars`

-   **타입:** `boolean`
-   **필수:** 아니오
-   **기본값:** `true`
-   **사용:** 모든 [메소드](./methods)
-   **지원:** 웹, 하이브리드 앱(웹뷰)

애플리케이션에서 스크롤바를 숨깁니다. `true`로 설정하면 스크린샷을 찍기 전에 모든 스크롤바가 비활성화됩니다. 추가 문제를 방지하기 위해 기본값은 `true`입니다.

### `hideElements`

-   **타입:** `array`
-   **필수:** 아니오
-   **사용:** 모든 [메소드](./methods)
-   **지원:** 웹, 하이브리드 앱(웹뷰), 네이티브 앱

이 메소드는 요소 배열을 제공하여 하나 또는 여러 요소에 `visibility: hidden` 속성을 추가하여 숨길 수 있습니다.

### `removeElements`

-   **타입:** `array`
-   **필수:** 아니오
-   **사용:** 모든 [메소드](./methods)
-   **지원:** 웹, 하이브리드 앱(웹뷰), 네이티브 앱

이 메소드는 요소 배열을 제공하여 하나 또는 여러 요소에 `display: none` 속성을 추가하여 _제거_할 수 있습니다.

### `resizeDimensions`

-   **타입:** `object`
-   **필수:** 아니오
-   **기본값:** `{ top: 0, right: 0, bottom: 0, left: 0}`
-   **사용:** [`saveElement`](./methods#saveelement) 또는 [`checkElement`](./methods#checkelement)에만 사용
-   **지원:** 웹, 하이브리드 앱(웹뷰), 네이티브 앱

요소 컷아웃을 더 크게 만들기 위해 필요한 픽셀 수의 `top`, `right`, `bottom`, `left`를 포함하는 객체입니다.

### `userBasedFullPageScreenshot`

* **타입:** `boolean`
* **필수:** 아니오
* **기본값:** `false`
* **지원:** 웹, 하이브리드 앱(웹뷰)

`true`로 설정하면 이 옵션은 전체 페이지 스크린샷을 캡처하기 위한 **스크롤 및 스티치 전략**을 활성화합니다.
브라우저의 기본 스크린샷 기능을 사용하는 대신, 페이지를 수동으로 스크롤하고 여러 스크린샷을 함께 연결합니다.
이 방법은 특히 **지연 로드된 콘텐츠**나 렌더링을 위해 스크롤이 필요한 복잡한 레이아웃이 있는 페이지에 유용합니다.

### `fullPageScrollTimeout`

-   **타입:** `number`
-   **필수:** 아니오
-   **기본값:** `1500`
-   **사용:** [`saveFullPageScreen`](./methods#savefullpagescreen) 또는 [`saveTabbablePage`](./methods#savetabbablepage)에만 사용
-   **지원:** 웹

스크롤 후 대기 시간(밀리초)입니다. 지연 로딩이 있는 페이지를 식별하는 데 도움이 될 수 있습니다.

> **참고:** 이는 `userBasedFullPageScreenshot`이 `true`로 설정된 경우에만 작동합니다

### `hideAfterFirstScroll`

-   **타입:** `array`
-   **필수:** 아니오
-   **사용:** [`saveFullPageScreen`](./methods#savefullpagescreen) 또는 [`saveTabbablePage`](./methods#savetabbablepage)에만 사용
-   **지원:** 웹

이 메소드는 요소 배열을 제공하여 하나 또는 여러 요소에 `visibility: hidden` 속성을 추가하여 숨깁니다.
페이지가 스크롤될 때 페이지와 함께 스크롤되는 고정 요소가 있지만 전체 페이지 스크린샷을 만들 때 성가신 효과를 주는 경우에 유용합니다.

> **참고:** 이는 `userBasedFullPageScreenshot`이 `true`로 설정된 경우에만 작동합니다

### `waitForFontsLoaded`

-   **타입:** `boolean`
-   **필수:** 아니오
-   **기본값:** `true`
-   **사용:** 모든 [메소드](./methods)
-   **지원:** 웹, 하이브리드 앱(웹뷰)

서드파티 폰트를 포함한 폰트는 동기식 또는 비동기식으로 로드될 수 있습니다. 비동기식 로딩은 WebdriverIO가 페이지가 완전히 로드됐다고 판단한 후에도 폰트가 로드될 수 있음을 의미합니다. 폰트 렌더링 문제를 방지하기 위해 이 모듈은 기본적으로 스크린샷을 찍기 전에 모든 폰트가 로드될 때까지 기다립니다.

## 비교(검사) 옵션

비교 옵션은 [ResembleJS](https://github.com/Huddle/Resemble.js)에 의한 비교 방식에 영향을 미치는 옵션입니다.

:::info 참고

-   [저장 옵션](#저장-옵션)의 모든 옵션은 비교 메소드에서도 사용할 수 있습니다
-   모든 비교 옵션은 서비스 인스턴스화 중에 __또는__ 모든 단일 검사 메소드에 사용할 수 있습니다. 메소드 옵션이 서비스 인스턴스화 중에 설정된 옵션과 동일한 키를 가지고 있다면, 메소드 비교 옵션이 서비스 비교 옵션 값을 재정의합니다.
- 모든 옵션은 다음에 사용할 수 있습니다:
    - 웹
    - 하이브리드 앱
    - 네이티브 앱

:::

### `ignoreAlpha`

-   **타입:** `boolean`
-   **기본값:** `false`
-   **필수:** 아니오

이미지를 비교하고 알파 채널을 무시합니다.

### `blockOutSideBar`

-   **타입:** `boolean`
-   **기본값:** `true`
-   **필수:** 아니오
-   **참고:** _`checkScreen()`에만 사용할 수 있습니다. 이는 **iPad에만** 해당됩니다_

가로 모드의 iPad에서 비교 중에 사이드바를 자동으로 차단합니다. 이는 탭/개인/북마크 네이티브 컴포넌트에서의 실패를 방지합니다.

### `blockOutStatusBar`

-   **타입:** `boolean`
-   **기본값:** `true`
-   **필수:** 아니오
-   **참고:** _이는 **모바일에만** 해당됩니다_

비교 중에 상태 바와 주소 표시줄을 자동으로 차단합니다. 이는 시간, 와이파이 또는 배터리 상태에 대한 실패를 방지합니다.

### `blockOutToolBar`

-   **타입:** `boolean`
-   **기본값:** `true`
-   **필수:** 아니오
-   **참고:** _이는 **모바일에만** 해당됩니다_

툴바를 자동으로 차단합니다.

### `ignoreAntialiasing`

-   **타입:** `boolean`
-   **기본값:** `false`
-   **필수:** 아니오

이미지를 비교하고 안티앨리어싱을 무시합니다.

### `ignoreColors`

-   **타입:** `boolean`
-   **기본값:** `false`
-   **필수:** 아니오

이미지가 컬러이더라도 비교는 2개의 흑백 이미지를 비교합니다.

### `ignoreLess`

-   **타입:** `boolean`
-   **기본값:** `false`
-   **필수:** 아니오

이미지를 비교하고 `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`로 비교합니다.

### `ignoreNothing`

-   **타입:** `boolean`
-   **기본값:** `false`
-   **필수:** 아니오

이미지를 비교하고 `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`로 비교합니다.

### `rawMisMatchPercentage`

-   **타입:** `boolean`
-   **기본값:** `false`
-   **필수:** 아니오

true로 설정하면 반환 백분율이 `0.12345678`와 같이 표시되며, 기본값은 `0.12`입니다.

### `returnAllCompareData`

-   **타입:** `boolean`
-   **기본값:** `false`
-   **필수:** 아니오

모든 비교 데이터를 반환하며, 불일치 백분율만 반환하지 않습니다.

### `saveAboveTolerance`

-   **타입:** `number`
-   **기본값:** `0`
-   **필수:** 아니오

차이가 있는 이미지 저장을 방지하는 `misMatchPercentage`의 허용 가능한 값입니다.

### `largeImageThreshold`

-   **타입:** `number`
-   **기본값:** `0`
-   **필수:** 아니오

큰 이미지 비교는 성능 문제를 일으킬 수 있습니다.
여기에 픽셀 수(0보다 큰)를 제공하면, 이미지 너비나 높이가 `largeImageThreshold` 픽셀보다 클 때 비교 알고리즘이 픽셀을 건너뜁니다.

### `scaleImagesToSameSize`

-   **타입:** `boolean`
-   **기본값:** `false`
-   **필수:** 아니오

비교 실행 전에 2개의 이미지를 동일한 크기로 조정합니다. `ignoreAntialiasing`과 `ignoreAlpha`를 활성화하는 것을 적극 권장합니다.

## 폴더 옵션

기준 폴더와 스크린샷 폴더(실제, 차이)는 플러그인 인스턴스화 또는 메소드 중에 설정할 수 있는 옵션입니다. 특정 메소드에 폴더 옵션을 설정하려면 메소드 옵션 객체에 폴더 옵션을 전달하세요. 다음에 사용할 수 있습니다:

- 웹
- 하이브리드 앱
- 네이티브 앱

```ts
import path from 'node:path'

const methodOptions = {
    actualFolder: path.join(process.cwd(), 'customActual'),
    baselineFolder: path.join(process.cwd(), 'customBaseline'),
    diffFolder: path.join(process.cwd(), 'customDiff'),
}

// 모든 메소드에 사용할 수 있습니다
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

### `actualFolder`

-   **타입:** `string`
-   **필수:** 아니오

테스트에서 캡처된 스냅샷을 위한 폴더입니다.

### `baselineFolder`

-   **타입:** `string`
-   **필수:** 아니오

비교 대상으로 사용되는 기준 이미지를 위한 폴더입니다.

### `diffFolder`

-   **타입:** `string`
-   **필수:** 아니오

ResembleJS에 의해 렌더링된 이미지 차이를 위한 폴더입니다.