---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
---

화면에 특정 텍스트가 표시될 때까지 기다립니다.

## 사용법

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
});
```

## 출력

### 로그

```log
[0-0] 2024-05-26T04:32:52.005Z INFO webdriver: COMMAND ocrWaitForTextDisplayed(<object>)
......................
# ocrWaitForTextDisplayed uses ocrGetElementPositionByText under the hood, that is why you see the command ocrGetElementPositionByText in the logs
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## 옵션

### `text`

-   **타입:** `string`
-   **필수 여부:** 예

클릭하기 위해 검색하려는 텍스트입니다.

#### 예시

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

-   **타입:** `number`
-   **필수 여부:** 아니오
-   **기본값:** 18000 (18초)

밀리초 단위의 시간입니다. OCR 처리에는 시간이 걸릴 수 있으므로 너무 낮게 설정하지 마세요.

#### 예시

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // 25초 동안 대기
});
```

### `timeoutMsg`

-   **타입:** `string`
-   **필수 여부:** 아니오
-   **기본값:** `Could not find the text "{selector}" within the requested time.`

기본 오류 메시지를 재정의합니다.

#### 예시

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

-   **타입:** `number`
-   **필수 여부:** 아니오
-   **기본값:** `0.25`

대비가 높을수록 이미지가 더 어두워지고 그 반대도 마찬가지입니다. 이는 이미지에서 텍스트를 찾는 데 도움이 될 수 있습니다. `-1`과 `1` 사이의 값을 허용합니다.

#### 예시

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

-   **타입:** `number`
-   **필수 여부:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

OCR이 텍스트를 찾아야 하는 화면의 검색 영역입니다. 이는 요소나 `x`, `y`, `width` 및 `height`를 포함하는 직사각형일 수 있습니다.

#### 예시

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: $("elementSelector"),
});

// 또는
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: await $("elementSelector"),
});

// 또는
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
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
-   **필수 여부:** 아니오
-   **기본값:** `eng`

Tesseract가 인식할 언어입니다. 더 많은 정보는 [여기](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions)에서 찾을 수 있으며 지원되는 언어는 [여기](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts)에서 찾을 수 있습니다.

#### 예시

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    // 네덜란드어를 언어로 사용
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

다음 옵션으로 텍스트를 찾는 퍼지 로직을 변경할 수 있습니다. 이는 더 나은 일치를 찾는 데 도움이 될 수 있습니다.

#### `fuzzyFindOptions.distance`

-   **타입:** `number`
-   **필수 여부:** 아니오
-   **기본값:** 100

일치 항목이 퍼지 위치(location으로 지정됨)에 얼마나 가까워야 하는지 결정합니다. 퍼지 위치에서 distance 문자만큼 떨어진 정확한 문자 일치는 완전히 불일치로 점수가 매겨집니다. 0의 거리는 일치가 지정된 정확한 위치에 있어야 함을 요구합니다. 1000의 거리는 0.8의 임계값을 사용하여 위치에서 800자 이내에 완벽한 일치가 있어야 함을 요구합니다.

##### 예시

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

-   **타입:** `number`
-   **필수 여부:** 아니오
-   **기본값:** 0

텍스트에서 패턴이 발견될 것으로 예상되는 대략적인 위치를 결정합니다.

##### 예시

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

-   **타입:** `number`
-   **필수 여부:** 아니오
-   **기본값:** 0.6

매칭 알고리즘이 포기하는 시점입니다. 0의 임계값은 완벽한 일치(글자와 위치 모두)를 요구하며, 1.0의 임계값은 모든 것과 일치합니다.

##### 예시

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

-   **타입:** `boolean`
-   **필수 여부:** 아니오
-   **기본값:** false

검색이 대소문자를 구분해야 하는지 여부입니다.

##### 예시

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

-   **타입:** `number`
-   **필수 여부:** 아니오
-   **기본값:** 2

길이가 이 값을 초과하는 일치 항목만 반환됩니다. (예를 들어, 결과에서 단일 문자 일치를 무시하려면 2로 설정하세요.)

##### 예시

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

-   **타입:** `number`
-   **필수 여부:** 아니오
-   **기본값:** false

`true`일 때, 문자열에서 완벽한 일치가 이미 발견되었더라도 매칭 함수는 검색 패턴의 끝까지 계속됩니다.

##### 예시

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```