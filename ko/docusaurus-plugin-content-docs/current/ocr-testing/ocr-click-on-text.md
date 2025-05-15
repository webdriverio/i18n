---
id: ocr-click-on-text
title: ocrClickOnText
---

제공된 텍스트를 기반으로 요소를 클릭합니다. 이 명령은 제공된 텍스트를 검색하고 [Fuse.js](https://fusejs.io/)의 퍼지 로직을 기반으로 일치하는 항목을 찾으려고 시도합니다. 이는 선택자에 오타가 있거나 찾은 텍스트가 100% 일치하지 않더라도 여전히 요소를 반환하려고 시도한다는 의미입니다. 아래 [로그](#logs)를 참조하세요.

## 사용법

```js
await browser.ocrClickOnText({ text: "Start3d" });
```

## 출력

### 로그

```log
# Still finding a match even though we searched for "Start3d" and the found text was "Started"
[0-0] 2024-05-25T05:05:20.096Z INFO webdriver: COMMAND ocrClickOnText(<object>)
......................
[0-0] 2024-05-25T05:05:21.022Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

### 이미지

기본 [`imagesFolder`](./getting-started#imagesfolder)에서 모듈이 클릭한 위치를 보여주는 대상이 포함된 이미지를 찾을 수 있습니다.

![Process steps](/img/ocr/ocr-click-on-text-target.jpg)

## 옵션

### `text`

-   **타입:** `string`
-   **필수:** 예

클릭하기 위해 검색할 텍스트입니다.

#### 예시

```js
await browser.ocrClickOnText({ text: "WebdriverIO" });
```

### `clickDuration`

-   **타입:** `number`
-   **필수:** 아니오
-   **기본값:** `500` 밀리초

클릭 지속 시간입니다. 원하는 경우 시간을 늘려 "긴 클릭"을 만들 수도 있습니다.

#### 예시

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // 이는 3초입니다
});
```

### `contrast`

-   **타입:** `number`
-   **필수:** 아니오
-   **기본값:** `0.25`

대비가 높을수록 이미지가 어두워지고 그 반대도 마찬가지입니다. 이미지에서 텍스트를 찾는 데 도움이 될 수 있습니다. `-1`과 `1` 사이의 값을 허용합니다.

#### 예시

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

-   **타입:** `number`
-   **필수:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

OCR이 텍스트를 찾아야 하는 화면의 검색 영역입니다. 이는 요소이거나 `x`, `y`, `width`, `height`를 포함하는 직사각형일 수 있습니다.

#### 예시

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// 또는
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// 또는
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: {
        x: 10,
        y: 50,
        width: 300,
        height: 75,
    },
});
```

### `language`

-   **타입:** `string`
-   **필수:** 아니오
-   **기본값:** `eng`

Tesseract가 인식할 언어입니다. 자세한 정보는 [여기](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions)에서 확인할 수 있으며 지원되는 언어는 [여기](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts)에서 찾을 수 있습니다.

#### 예시

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrClickOnText({
    text: "WebdriverIO",
    // 네덜란드어를 언어로 사용
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **타입:** `object`
-   **필수:** 아니오

일치하는 요소를 기준으로 화면에서 상대적으로 클릭할 수 있습니다. 이는 일치하는 요소로부터 상대적 픽셀 `above`, `right`, `below` 또는 `left`를 기준으로 수행할 수 있습니다.

:::note

다음 조합이 허용됩니다

-   단일 속성
-   `above` + `left` 또는 `above` + `right`
-   `below` + `left` 또는 `below` + `right`

다음 조합은 **허용되지 않습니다**

-   `above`와 `below` 함께 사용
-   `left`와 `right` 함께 사용

:::

#### `relativePosition.above`

-   **타입:** `number`
-   **필수:** 아니오

일치하는 요소로부터 x픽셀 `위`를 클릭합니다.

##### 예시

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        above: 100,
    },
});
```

#### `relativePosition.right`

-   **타입:** `number`
-   **필수:** 아니오

일치하는 요소로부터 x픽셀 `오른쪽`을 클릭합니다.

##### 예시

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        right: 100,
    },
});
```

#### `relativePosition.below`

-   **타입:** `number`
-   **필수:** 아니오

일치하는 요소로부터 x픽셀 `아래`를 클릭합니다.

##### 예시

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        below: 100,
    },
});
```

#### `relativePosition.left`

-   **타입:** `number`
-   **필수:** 아니오

일치하는 요소로부터 x픽셀 `왼쪽`을 클릭합니다.

##### 예시

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        left: 100,
    },
});
```

### `fuzzyFindOptions`

다음 옵션으로 텍스트를 찾기 위한 퍼지 로직을 변경할 수 있습니다. 이는 더 나은 일치를 찾는 데 도움이 될 수 있습니다.

#### `fuzzyFindOptions.distance`

-   **타입:** `number`
-   **필수:** 아니오
-   **기본값:** 100

일치 항목이 퍼지 위치(location에 의해 지정됨)와 얼마나 가까워야 하는지 결정합니다. 퍼지 위치에서 distance 문자 떨어진 정확한 글자 일치는 완전히 불일치로 평가됩니다. 거리가 0이면 정확한 위치에서 일치해야 합니다. 거리가 1000이면 0.8의 임계값을 사용하여 완벽한 일치가 위치에서 800자 이내에 있어야 찾을 수 있습니다.

##### 예시

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

-   **타입:** `number`
-   **필수:** 아니오
-   **기본값:** 0

텍스트에서 패턴이 어디쯤에서 발견될 것으로 예상되는지 대략적으로 결정합니다.

##### 예시

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

-   **타입:** `number`
-   **필수:** 아니오
-   **기본값:** 0.6

매칭 알고리즘이 언제 포기하는지를 결정합니다. 임계값이 0이면 완벽한 일치(문자와 위치 모두)가 필요하고, 임계값이 1.0이면 모든 것이 일치할 수 있습니다.

##### 예시

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

-   **타입:** `boolean`
-   **필수:** 아니오
-   **기본값:** false

검색이 대소문자를 구분해야 하는지 여부입니다.

##### 예시

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

-   **타입:** `number`
-   **필수:** 아니오
-   **기본값:** 2

길이가 이 값을 초과하는 일치 항목만 반환됩니다. (예를 들어, 결과에서 단일 문자 일치를 무시하려면 2로 설정하세요)

##### 예시

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

-   **타입:** `number`
-   **필수:** 아니오
-   **기본값:** false

`true`일 때, 매칭 함수는 문자열에서 완벽한 일치가 이미 발견되었더라도 검색 패턴의 끝까지 계속합니다.

##### 예시

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```