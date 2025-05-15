---
id: ocr-get-element-position-by-text
title: ocrGetElementPositionByText
---

화면에서 텍스트의 위치를 가져옵니다. 이 명령은 제공된 텍스트를 검색하고 [Fuse.js](https://fusejs.io/)의 퍼지 로직을 기반으로 일치하는 항목을 찾으려고 시도합니다. 이는 선택자에 오타가 있거나 찾은 텍스트가 100% 일치하지 않더라도 여전히 요소를 반환하려고 시도한다는 것을 의미합니다. 아래 [로그](#logs)를 참조하세요.

## 사용법

```js
const result = await browser.ocrGetElementPositionByText("Username");

console.log("result = ", JSON.stringify(result, null, 2));
```

## 출력

### 결과

```logs
result = {
  "dprPosition": {
    "left": 373,
    "top": 606,
    "right": 439,
    "bottom": 620
  },
  "filePath": ".tmp/ocr/desktop-1716658199410.png",
  "matchedString": "Started",
  "originalPosition": {
    "left": 373,
    "top": 606,
    "right": 439,
    "bottom": 620
  },
  "score": 85.71,
  "searchValue": "Start3d"
}
```

### 로그

```log
# "Start3d"를 검색했지만 찾은 텍스트가 "Started"였음에도 일치 항목을 찾았습니다
[0-0] 2024-05-25T17:29:59.179Z INFO webdriver: COMMAND ocrGetElementPositionByText(<object>)
......................
[0-0] 2024-05-25T17:29:59.993Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

## 옵션

### `text`

-   **타입:** `string`
-   **필수:** 예

클릭하기 위해 검색하려는 텍스트입니다.

#### 예시

```js
await browser.ocrGetElementPositionByText({ text: "WebdriverIO" });
```

### `contrast`

-   **타입:** `number`
-   **필수:** 아니오
-   **기본값:** `0.25`

대비가 높을수록 이미지가 어두워지고 그 반대도 마찬가지입니다. 이는 이미지에서 텍스트를 찾는 데 도움이 될 수 있습니다. `-1`과 `1` 사이의 값을 허용합니다.

#### 예시

```js
await browser.ocrGetElementPositionByText({
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
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// 또는
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// 또는
await browser.ocrGetElementPositionByText({
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

Tesseract가 인식할 언어입니다. 자세한 정보는 [여기](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions)에서 찾을 수 있으며 지원되는 언어는 [여기](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts)에서 확인할 수 있습니다.

#### 예시

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    // 네덜란드어를 언어로 사용
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

다음 옵션으로 텍스트를 찾기 위한 퍼지 로직을 변경할 수 있습니다. 이는 더 나은 일치 항목을 찾는 데 도움이 될 수 있습니다.

#### `fuzzyFindOptions.distance`

-   **타입:** `number`
-   **필수:** 아니오
-   **기본값:** 100

일치 항목이 퍼지 위치(location으로 지정됨)에 얼마나 가까워야 하는지 결정합니다. 퍼지 위치에서 distance 문자 멀리 있는 정확한 문자 일치는 완전히 불일치로 점수가 매겨집니다. 거리가 0이면 일치 항목이 지정된 정확한 위치에 있어야 합니다. 거리가 1000이면 0.8의 임계값을 사용하여 완벽한 일치가 위치에서 800자 이내에 있어야 합니다.

##### 예시

```js
await browser.ocrGetElementPositionByText({
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

텍스트 내에서 패턴이 발견될 것으로 예상되는 대략적인 위치를 결정합니다.

##### 예시

```js
await browser.ocrGetElementPositionByText({
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

매칭 알고리즘이 언제 포기할지 결정합니다. 임계값이 0이면 완벽한 일치(문자와 위치 모두)가 필요하고, 임계값이 1.0이면 무엇이든 일치할 수 있습니다.

##### 예시

```js
await browser.ocrGetElementPositionByText({
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
await browser.ocrGetElementPositionByText({
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
await browser.ocrGetElementPositionByText({
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

`true`일 때, 문자열에서 완벽한 일치가 이미 발견되었더라도 매칭 함수는 검색 패턴의 끝까지 계속됩니다.

##### 예시

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```