---
id: methods
title: 메서드
---

다음 메서드들은 글로벌 WebdriverIO [`browser`](/docs/api/browser)-객체에 추가됩니다.

## 저장 메서드

:::info 팁
화면을 비교하지 않고 요소/스크린샷만 저장하고 싶을 때만 저장 메서드를 사용하세요.
:::

### `saveElement`

요소의 이미지를 저장합니다.

#### 사용법

```ts
await browser.saveElement(
    // element
    await $('#element-selector'),
    // tag
    'your-reference',
    // saveElementOptions
    {
        // ...
    }
);
```

#### 지원

- 데스크톱 브라우저
- 모바일 브라우저
- 모바일 하이브리드 앱
- 모바일 네이티브 앱

#### 매개변수

-   **`element`:**
    -   **필수:** 예
    -   **타입:** WebdriverIO Element
-   **`tag`:**
    -   **필수:** 예
    -   **타입:** string
-   **`saveElementOptions`:**
    -   **필수:** 아니오
    -   **타입:** 옵션 객체, [저장 옵션](./method-options#save-options) 참조

#### 출력:

[테스트 출력](./test-output#savescreenelementfullpagescreen) 페이지를 참조하세요.

### `saveScreen`

뷰포트의 이미지를 저장합니다.

#### 사용법

```ts
await browser.saveScreen(
    // tag
    'your-reference',
    // saveScreenOptions
    {
        // ...
    }
);
```

#### 지원

- 데스크톱 브라우저
- 모바일 브라우저
- 모바일 하이브리드 앱
- 모바일 네이티브 앱

#### 매개변수
-   **`tag`:**
    -   **필수:** 예
    -   **타입:** string
-   **`saveScreenOptions`:**
    -   **필수:** 아니오
    -   **타입:** 옵션 객체, [저장 옵션](./method-options#save-options) 참조

#### 출력:

[테스트 출력](./test-output#savescreenelementfullpagescreen) 페이지를 참조하세요.

### `saveFullPageScreen`

#### 사용법

전체 화면의 이미지를 저장합니다.

```ts
await browser.saveFullPageScreen(
    // tag
    'your-reference',
    // saveFullPageScreenOptions
    {
        // ...
    }
);
```

#### 지원

- 데스크톱 브라우저
- 모바일 브라우저

#### 매개변수
-   **`tag`:**
    -   **필수:** 예
    -   **타입:** string
-   **`saveFullPageScreenOptions`:**
    -   **필수:** 아니오
    -   **타입:** 옵션 객체, [저장 옵션](./method-options#save-options) 참조

#### 출력:

[테스트 출력](./test-output#savescreenelementfullpagescreen) 페이지를 참조하세요.

### `saveTabbablePage`

탭 가능한 선과 점이 표시된 전체 화면의 이미지를 저장합니다.

#### 사용법

```ts
await browser.saveTabbablePage(
    // tag
    'your-reference',
    // saveTabbableOptions
    {
        // ...
    }
);
```

#### 지원

- 데스크톱 브라우저

#### 매개변수
-   **`tag`:**
    -   **필수:** 예
    -   **타입:** string
-   **`saveTabbableOptions`:**
    -   **필수:** 아니오
    -   **타입:** 옵션 객체, [저장 옵션](./method-options#save-options) 참조

#### 출력:

[테스트 출력](./test-output#savescreenelementfullpagescreen) 페이지를 참조하세요.

## 확인 메서드

:::info 팁
`check`-메서드를 처음 사용할 때 아래와 같은 경고가 로그에 표시됩니다. 기준 이미지를 생성하려는 경우 `save`- 및 `check`-메서드를 함께 사용할 필요가 없다는 의미입니다.

```shell
#####################################################################################
 Baseline image not found, save the actual image manually to the baseline.
 The image can be found here:
 /Users/wswebcreation/project/.tmp/actual/desktop_chrome/examplePage-chrome-latest-1366x768.png
 If you want the module to auto save a non existing image to the baseline you
 can provide 'autoSaveBaseline: true' to the options.
#####################################################################################
```

:::

### `checkElement`

요소의 이미지를 기준 이미지와 비교합니다.

#### 사용법

```ts
await browser.checkElement(
    // element
    '#element-selector',
    // tag
    'your-reference',
    // checkElementOptions
    {
        // ...
    }
);
```

#### 지원

- 데스크톱 브라우저
- 모바일 브라우저
- 모바일 하이브리드 앱
- 모바일 네이티브 앱

#### 매개변수
-   **`element`:**
    -   **필수:** 예
    -   **타입:** WebdriverIO Element
-   **`tag`:**
    -   **필수:** 예
    -   **타입:** string
-   **`checkElementOptions`:**
    -   **필수:** 아니오
    -   **타입:** 옵션 객체, [비교/확인 옵션](./method-options#compare-check-options) 참조

#### 출력:

[테스트 출력](./test-output#checkscreenelementfullpagescreen) 페이지를 참조하세요.

### `checkScreen`

뷰포트의 이미지를 기준 이미지와 비교합니다.

#### 사용법

```ts
await browser.checkScreen(
    // tag
    'your-reference',
    // checkScreenOptions
    {
        // ...
    }
);
```

#### 지원

- 데스크톱 브라우저
- 모바일 브라우저
- 모바일 하이브리드 앱
- 모바일 네이티브 앱

#### 매개변수
-   **`tag`:**
    -   **필수:** 예
    -   **타입:** string
-   **`checkScreenOptions`:**
    -   **필수:** 아니오
    -   **타입:** 옵션 객체, [비교/확인 옵션](./method-options#compare-check-options) 참조

#### 출력:

[테스트 출력](./test-output#checkscreenelementfullpagescreen) 페이지를 참조하세요.

### `checkFullPageScreen`

전체 화면의 이미지를 기준 이미지와 비교합니다.

#### 사용법

```ts
await browser.checkFullPageScreen(
    // tag
    'your-reference',
    // checkFullPageOptions
    {
        // ...
    }
);
```

#### 지원

- 데스크톱 브라우저
- 모바일 브라우저

#### 매개변수
-   **`tag`:**
    -   **필수:** 예
    -   **타입:** string
-   **`checkFullPageOptions`:**
    -   **필수:** 아니오
    -   **타입:** 옵션 객체, [비교/확인 옵션](./method-options#compare-check-options) 참조

#### 출력:

[테스트 출력](./test-output#checkscreenelementfullpagescreen) 페이지를 참조하세요.

### `checkTabbablePage`

탭 가능한 선과 점이 표시된 전체 화면 이미지를 기준 이미지와 비교합니다.

#### 사용법

```ts
await browser.checkTabbablePage(
    // tag
    'your-reference',
    // checkTabbableOptions
    {
        // ...
    }
);
```

#### 지원

- 데스크톱 브라우저

#### 매개변수
-   **`tag`:**
    -   **필수:** 예
    -   **타입:** string
-   **`checkTabbableOptions`:**
    -   **필수:** 아니오
    -   **타입:** 옵션 객체, [비교/확인 옵션](./method-options#compare-check-options) 참조

#### 출력:

[테스트 출력](./test-output#checkscreenelementfullpagescreen) 페이지를 참조하세요.