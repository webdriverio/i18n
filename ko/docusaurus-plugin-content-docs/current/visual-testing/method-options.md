---
id: method-options
title: 메소드 옵션
---

메소드 옵션은 [메소드](./methods)별로 설정할 수 있는 옵션입니다. 옵션의 키가 플러그인 인스턴스화 중에 설정된 옵션과 동일한 경우, 이 메소드 옵션은 플러그인 옵션 값을 재정의합니다.

:::info 참고

-   [저장 옵션](#save-options)의 모든 옵션은 [비교](#compare-check-options) 메소드에서도 사용할 수 있습니다
-   모든 비교 옵션은 서비스 인스턴스화 시점 __또는__ 개별 검사 메소드마다 사용할 수 있습니다. 메소드 옵션의 키가 서비스 인스턴스화 중에 설정된 옵션과 동일한 경우, 메소드 비교 옵션이 서비스 비교 옵션 값을 재정의합니다.
- 달리 명시되지 않는 한 모든 옵션은 다음 애플리케이션 컨텍스트에서 사용할 수 있습니다:
    - 웹
    - 하이브리드 앱
    - 네이티브 앱
- 아래 예제는 `save*`-메소드를 사용하지만 `check*`-메소드에서도 사용할 수 있습니다

:::

## 저장 옵션

### `disableBlinkingCursor`

- **타입:** `boolean`
- **필수:** 아니오
- **기본값:** `false`
- **사용 가능한 메소드:** 모든 [메소드](./methods)
- **지원되는 애플리케이션 컨텍스트:** 웹, 하이브리드 앱(웹뷰)

애플리케이션에서 모든 `input`, `textarea`, `[contenteditable]` 캐럿 "깜박임"을 활성화/비활성화합니다. `true`로 설정하면 스크린샷을 찍기 전에 캐럿이 `transparent`로 설정되고 완료 시 재설정됩니다.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableBlinkingCursor: true
    }
)
```

### `disableCSSAnimation`

- **타입:** `boolean`
- **필수:** 아니오
- **기본값:** `false`
- **사용 가능한 메소드:** 모든 [메소드](./methods)
- **지원되는 애플리케이션 컨텍스트:** 웹, 하이브리드 앱(웹뷰)

애플리케이션의 모든 CSS 애니메이션을 활성화/비활성화합니다. `true`로 설정하면 스크린샷을 찍기 전에 모든 애니메이션이 비활성화되고 완료 시 재설정됩니다.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableCSSAnimation: true
    }
)
```

### `enableLegacyScreenshotMethod`

- **타입:** `boolean`
- **필수:** 아니오
- **기본값:** `false`
- **사용 가능한 메소드:** 모든 [메소드](./methods)
- **지원되는 애플리케이션 컨텍스트:** 웹, 하이브리드 앱(웹뷰)

W3C-WebDriver 프로토콜 기반의 "이전" 스크린샷 메소드로 돌아가려면 이 옵션을 사용하세요. 테스트가 기존 기준 이미지에 의존하거나 최신 BiDi 기반 스크린샷을 완전히 지원하지 않는 환경에서 실행 중인 경우 유용할 수 있습니다.
이 옵션을 활성화하면 약간 다른 해상도나 품질의 스크린샷이 생성될 수 있습니다.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLegacyScreenshotMethod: true
    }
)
```

### `enableLayoutTesting`

- **타입:** `boolean`
- **필수:** 아니오
- **기본값:** `false`
- **사용 가능한 메소드:** 모든 [메소드](./methods)
- **지원되는 애플리케이션 컨텍스트:** 웹, 하이브리드 앱(웹뷰)

이 옵션은 페이지의 모든 텍스트를 숨겨 비교에 레이아웃만 사용합니다. 숨김은 __각__ 요소에 `'color': 'transparent !important'` 스타일을 추가하여 수행됩니다.

출력 결과는 [테스트 출력](./test-output#enablelayouttesting)을 참조하세요.

:::info
이 플래그를 사용하면 텍스트가 포함된 각 요소(`p, h1, h2, h3, h4, h5, h6, span, a, li`뿐만 아니라 `div|button|..` 포함)가 이 속성을 갖게 됩니다. 이를 조정할 수 있는 옵션은 __없습니다__.
:::

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLayoutTesting: true
    }
)
```

### `hideScrollBars`

- **타입:** `boolean`
- **필수:** 아니오
- **기본값:** `true`
- **사용 가능한 메소드:** 모든 [메소드](./methods)
- **지원되는 애플리케이션 컨텍스트:** 웹, 하이브리드 앱(웹뷰)

애플리케이션에서 스크롤바를 숨깁니다. `true`로 설정하면 스크린샷을 찍기 전에 모든 스크롤바가 비활성화됩니다. 추가 문제를 방지하기 위해 기본값은 `true`로 설정되어 있습니다.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideScrollBars: false
    }
)
```

### `hideElements`

- **타입:** `array`
- **필수:** 아니오
- **사용 가능한 메소드:** 모든 [메소드](./methods)
- **지원되는 애플리케이션 컨텍스트:** 웹, 하이브리드 앱(웹뷰)

이 메소드는 요소 배열을 제공하여 하나 이상의 요소에 `visibility: hidden` 속성을 추가하여 숨길 수 있습니다.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideElements: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

### `removeElements`

- **타입:** `array`
- **필수:** 아니오
- **사용 가능한 메소드:** 모든 [메소드](./methods)
- **지원되는 애플리케이션 컨텍스트:** 웹, 하이브리드 앱(웹뷰)

이 메소드는 요소 배열을 제공하여 하나 이상의 요소에 `display: none` 속성을 추가하여 _제거_할 수 있습니다.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        removeElements: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

### `resizeDimensions`

- **타입:** `object`
- **필수:** 아니오
- **기본값:** `{ top: 0, right: 0, bottom: 0, left: 0}`
- **사용 가능한 메소드:** [`saveElement`](./methods#saveelement) 또는 [`checkElement`](./methods#checkelement)에서만 사용 가능
- **지원되는 애플리케이션 컨텍스트:** 웹, 하이브리드 앱(웹뷰), 네이티브 앱

요소 잘라내기를 더 크게 만들기 위해 필요한 픽셀 수를 `top`, `right`, `bottom` 및 `left`로 포함해야 하는 객체입니다.

```typescript
await browser.saveElement(
    'sample-tag',
    {
        resizeDimensions: {
            top: 50,
            left: 100,
            right: 10,
            bottom: 90,
        },
    }
)
```

### `userBasedFullPageScreenshot`

- **타입:** `boolean`
- **필수:** 아니오
- **기본값:** `false`
- **사용 가능한 메소드:** [`saveFullPageScreen`](./methods#savefullpagescreen), [`saveTabbablePage`](./methods#savetabbablepage), [`checkFullPageScreen`](./methods#checkfullpagescreen) 또는 [`checkTabbablePage`](./methods#checktabbablepage)에서만 사용 가능
- **지원되는 애플리케이션 컨텍스트:** 웹, 하이브리드 앱(웹뷰)

`true`로 설정하면 이 옵션은 전체 페이지 스크린샷을 캡처하기 위한 **스크롤 및 스티치 전략**을 활성화합니다.
브라우저의 기본 스크린샷 기능을 사용하는 대신, 페이지를 수동으로 스크롤하고 여러 스크린샷을 함께 결합합니다.
이 방법은 **지연 로딩 콘텐츠**가 있거나 완전히 렌더링하기 위해 스크롤이 필요한 복잡한 레이아웃이 있는 페이지에 특히 유용합니다.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        userBasedFullPageScreenshot: true
    }
)
```

### `fullPageScrollTimeout`

- **타입:** `number`
- **필수:** 아니오
- **기본값:** `1500`
- **사용 가능한 메소드:** [`saveFullPageScreen`](./methods#savefullpagescreen) 또는 [`saveTabbablePage`](./methods#savetabbablepage)에서만 사용 가능
- **지원되는 애플리케이션 컨텍스트:** 웹, 하이브리드 앱(웹뷰)

스크롤 후 대기하는 시간(밀리초)입니다. 이는 지연 로딩이 있는 페이지를 식별하는 데 도움이 될 수 있습니다.

> **참고:** 이는 `userBasedFullPageScreenshot`이 `true`로 설정된 경우에만 작동합니다

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        fullPageScrollTimeout: 3 * 1000
    }
)
```

### `hideAfterFirstScroll`

- **타입:** `array`
- **필수:** 아니오
- **사용 가능한 메소드:** [`saveFullPageScreen`](./methods#savefullpagescreen) 또는 [`saveTabbablePage`](./methods#savetabbablepage)에서만 사용 가능
- **지원되는 애플리케이션 컨텍스트:** 웹, 하이브리드 앱(웹뷰)

이 메소드는 요소 배열을 제공하여 하나 이상의 요소에 `visibility: hidden` 속성을 추가하여 숨깁니다.
이는 예를 들어 페이지가 스티키 요소를 포함하고 있고, 페이지가 스크롤될 때 스크롤과 함께 이동하지만 전체 페이지 스크린샷을 만들 때 성가신 효과를 주는 경우에 유용합니다.

> **참고:** 이는 `userBasedFullPageScreenshot`이 `true`로 설정된 경우에만 작동합니다

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        hideAfterFirstScroll: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

### `waitForFontsLoaded`

- **타입:** `boolean`
- **필수:** 아니오
- **기본값:** `true`
- **사용 가능한 메소드:** 모든 [메소드](./methods)
- **지원되는 애플리케이션 컨텍스트:** 웹, 하이브리드 앱(웹뷰)

폰트(타사 폰트 포함)는 동기적으로 또는 비동기적으로 로드될 수 있습니다. 비동기 로딩은 WebdriverIO가 페이지가 완전히 로드되었다고 판단한 후에도 폰트가 로드될 수 있음을 의미합니다. 폰트 렌더링 문제를 방지하기 위해 이 모듈은 기본적으로 스크린샷을 찍기 전에 모든 폰트가 로드될 때까지 기다립니다.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        waitForFontsLoaded: true
    }
)
```

## 비교 (검사) 옵션

비교 옵션은 [ResembleJS](https://github.com/Huddle/Resemble.js)에 의해 실행되는 비교 방식에 영향을 미치는 옵션입니다.

### `ignoreAlpha`

- **타입:** `boolean`
- **기본값:** `false`
- **필수:** 아니오
- **사용 가능한 메소드:** 모든 [검사 메소드](./methods#check-methods)
- **지원되는 애플리케이션 컨텍스트:** 모두

이미지를 비교하고 알파 채널을 무시합니다.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAlpha: true
    }
)
```

### `blockOutSideBar`

- **타입:** `boolean`
- **기본값:** `true`
- **필수:** 아니오
- **사용 가능한 메소드:** _`checkScreen()`에서만 사용 가능. **iPad 전용**_
- **지원되는 애플리케이션 컨텍스트:** 모두

iPad의 가로 모드에서 비교 중에 사이드바를 자동으로 차단합니다. 이는 탭/개인/북마크 네이티브 컴포넌트에서의 오류를 방지합니다.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutSideBar: true
    }
)
```

### `blockOutStatusBar`

- **타입:** `boolean`
- **기본값:** `true`
- **필수:** 아니오
- **사용 가능한 메소드:** _**모바일 전용**_
- **지원되는 애플리케이션 컨텍스트:** 하이브리드(네이티브 부분) 및 네이티브 앱

비교 중에 상태 및 주소 표시줄을 자동으로 차단합니다. 이는 시간, 와이파이 또는 배터리 상태에 대한 오류를 방지합니다.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutStatusBar: true
    }
)
```

### `blockOutToolBar`

- **타입:** `boolean`
- **기본값:** `true`
- **필수:** 아니오
- **사용 가능한 메소드:** _**모바일 전용**_
- **지원되는 애플리케이션 컨텍스트:** 하이브리드(네이티브 부분) 및 네이티브 앱

툴바를 자동으로 차단합니다.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutToolBar: true
    }
)
```

### `ignoreAntialiasing`

- **타입:** `boolean`
- **기본값:** `false`
- **필수:** 아니오
- **사용 가능한 메소드:** 모든 [검사 메소드](./methods#check-methods)
- **지원되는 애플리케이션 컨텍스트:** 모두

이미지를 비교하고 안티앨리어싱을 무시합니다.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAntialiasing: true
    }
)
```

### `ignoreColors`

- **타입:** `boolean`
- **기본값:** `false`
- **필수:** 아니오
- **사용 가능한 메소드:** 모든 [검사 메소드](./methods#check-methods)
- **지원되는 애플리케이션 컨텍스트:** 모두

이미지가 컬러임에도 불구하고, 비교는 2개의 흑백 이미지를 비교합니다.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreColors: true
    }
)
```

### `ignoreLess`

- **타입:** `boolean`
- **기본값:** `false`
- **필수:** 아니오
- **사용 가능한 메소드:** 모든 [검사 메소드](./methods#check-methods)
- **지원되는 애플리케이션 컨텍스트:** 모두

이미지를 `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240` 설정으로 비교합니다.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreLess: true
    }
)
```

### `ignoreNothing`

- **타입:** `boolean`
- **기본값:** `false`
- **필수:** 아니오
- **사용 가능한 메소드:** 모든 [검사 메소드](./methods#check-methods)
- **지원되는 애플리케이션 컨텍스트:** 모두

이미지를 `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255` 설정으로 비교합니다.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreNothing: true
    }
)
```

### `rawMisMatchPercentage`

- **타입:** `boolean`
- **기본값:** `false`
- **필수:** 아니오
- **사용 가능한 메소드:** 모든 [검사 메소드](./methods#check-methods)
- **지원되는 애플리케이션 컨텍스트:** 모두

`true`이면 반환된 백분율이 `0.12345678`과 같이 표시되며, 기본값은 `0.12`입니다.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        rawMisMatchPercentage: true
    }
)
```

### `returnAllCompareData`

- **타입:** `boolean`
- **기본값:** `false`
- **필수:** 아니오
- **사용 가능한 메소드:** 모든 [검사 메소드](./methods#check-methods)
- **지원되는 애플리케이션 컨텍스트:** 모두

이는 불일치 백분율뿐만 아니라 모든 비교 데이터를 반환합니다. [콘솔 출력](./test-output#console-output-1)도 참조하세요.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        returnAllCompareData: true
    }
)
```

### `saveAboveTolerance`

- **타입:** `number`
- **기본값:** `0`
- **필수:** 아니오
- **사용 가능한 메소드:** 모든 [검사 메소드](./methods#check-methods)
- **지원되는 애플리케이션 컨텍스트:** 모두

차이가 있는 이미지 저장을 방지하는 `misMatchPercentage`의 허용 가능한 값입니다.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        saveAboveTolerance: 0.25
    }
)
```

### `largeImageThreshold`

- **타입:** `number`
- **기본값:** `0`
- **필수:** 아니오
- **사용 가능한 메소드:** 모든 [검사 메소드](./methods#check-methods)
- **지원되는 애플리케이션 컨텍스트:** 모두

큰 이미지를 비교하면 성능 문제가 발생할 수 있습니다.
여기에 픽셀 수(0보다 큰)를 제공하면, 이미지 너비나 높이가 `largeImageThreshold` 픽셀보다 클 때 비교 알고리즘이 픽셀을 건너뛰게 됩니다.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        largeImageThreshold: 1500
    }
)
```

### `scaleImagesToSameSize`

- **타입:** `boolean`
- **기본값:** `false`
- **필수:** 아니오
- **사용 가능한 메소드:** 모든 [검사 메소드](./methods#check-methods)
- **지원되는 애플리케이션 컨텍스트:** 모두

비교를 실행하기 전에 2개의 이미지를 동일한 크기로 조정합니다. `ignoreAntialiasing`과 `ignoreAlpha`를 활성화하는 것이 강력히 권장됩니다.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        scaleImagesToSameSize: true
    }
)
```

### `ignore`

- **타입:** `array`
- **필수:** 아니오
- **사용 가능한 메소드:** `checkScreen`-메소드에서만 사용 가능, `checkElement`-메소드에서는 **사용 불가**
- **지원되는 애플리케이션 컨텍스트:** 네이티브 앱

이 메소드는 요소 배열 또는 `x|y|width|height` 객체를 기반으로 화면에서 요소 또는 영역을 자동으로 차단합니다.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignore: [
            $('~element-1'),
            await $('~element-2'),
            {
                x: 150,
                y: 250,
                width: 100,
                height: 100,
            }
        ]
    }
)
```

## 폴더 옵션

기준 폴더와 스크린샷 폴더(실제, 차이)는 플러그인 인스턴스화 또는 메소드 중에 설정할 수 있는 옵션입니다. 특정 메소드에서 폴더 옵션을 설정하려면 메소드 옵션 객체에 폴더 옵션을 전달하세요. 다음에서 사용할 수 있습니다:

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

- **타입:** `string`
- **필수:** 아니오
- **지원되는 애플리케이션 컨텍스트:** 모두

테스트에서 캡처된 스냅샷을 위한 폴더입니다.

### `baselineFolder`

- **타입:** `string`
- **필수:** 아니오
- **지원되는 애플리케이션 컨텍스트:** 모두

비교에 사용되는 기준 이미지를 위한 폴더입니다.

### `diffFolder`

- **타입:** `string`
- **필수:** 아니오
- **지원되는 애플리케이션 컨텍스트:** 모두

ResembleJS에 의해 렌더링된 이미지 차이를 위한 폴더입니다.