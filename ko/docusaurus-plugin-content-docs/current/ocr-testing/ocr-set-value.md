---
id: ocr-set-value
title: ocrSetValue
---

요소에 키 입력 시퀀스를 보냅니다. 이 기능은:

-   자동으로 요소를 감지합니다
-   요소를 클릭하여 포커스를 맞춥니다
-   필드에 값을 설정합니다

이 명령은 제공된 텍스트를 검색하고 [Fuse.js](https://fusejs.io/)의 퍼지 로직을 기반으로 일치하는 항목을 찾으려고 시도합니다. 이는 선택자에 오타가 있거나 발견된 텍스트가 100% 일치하지 않더라도 여전히 요소를 반환하려고 시도함을 의미합니다. 아래 [로그](#logs)를 참조하세요.

## 사용법

```js
await brower.ocrSetValue({
    text: "docs",
    value: "specfileretries",
});
```

## 출력

### 로그

```log
[0-0] 2024-05-26T04:17:51.355Z INFO webdriver: COMMAND ocrSetValue(<object>)
......................
[0-0] 2024-05-26T04:17:52.356Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "docs" and found one match "docs" with score "100%"
```

## 옵션

### `text`

-   **타입:** `string`
-   **필수:** 예

클릭하기 위해 검색하려는 텍스트입니다.

#### 예시

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

-   **타입:** `string`
-   **필수:** 예

추가할 값입니다.

#### 예시

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `submitValue`

-   **타입:** `boolean`
-   **필수:** 아니오
-   **기본값:** `false`

값이 입력 필드에 제출되어야 하는지 여부입니다. 이는 문자열 끝에 "ENTER" 키가 전송됨을 의미합니다.

#### 예시

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

-   **타입:** `number`
-   **필수:** 아니오
-   **기본값:** `500` 밀리초

클릭 지속 시간입니다. 시간을 늘려 "긴 클릭"을 만들 수도 있습니다.

#### 예시

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    clickDuration: 3000, // 3초입니다
});
```

### `contrast`

-   **타입:** `number`
-   **필수:** 아니오
-   **기본값:** `0.25`

대비가 높을수록 이미지가 어두워지고 반대로 대비가 낮을수록 밝아집니다. 이미지에서 텍스트를 찾는 데 도움이 될 수 있습니다. `-1`과 `1` 사이의 값을 허용합니다.

#### 예시

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    contrast: 0.5,
});
```

### `haystack`

-   **타입:** `number`
-   **필수:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

OCR이 텍스트를 찾아야 하는 화면의 검색 영역입니다. 이는 요소나 `x`, `y`, `width`, `height`를 포함하는 직사각형일 수 있습니다.

#### 예시

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: $("elementSelector"),
});

// 또는
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: await $("elementSelector"),
});

// 또는
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    // 네덜란드어를 언어로 사용
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **타입:** `object`
-   **필수:** 아니오

일치하는 요소를 기준으로 화면의 상대적 위치를 클릭할 수 있습니다. 이는 일치하는 요소를 기준으로 상대적 픽셀 `above`, `right`, `below` 또는 `left`에 따라 수행할 수 있습니다.

:::note

다음 조합이 허용됩니다

-   단일 속성
-   `above` + `left` 또는 `above` + `right`
-   `below` + `left` 또는 `below` + `right`

다음 조합은 **허용되지 않습니다**

-   `above`와 `below`
-   `left`와 `right`

:::

#### `relativePosition.above`

-   **타입:** `number`
-   **필수:** 아니오

일치하는 요소의 `위쪽`으로 x 픽셀 클릭합니다.

##### 예시

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        above: 100,
    },
});
```

#### `relativePosition.right`

-   **타입:** `number`
-   **필수:** 아니오

일치하는 요소에서 `오른쪽`으로 x 픽셀 클릭합니다.

##### 예시

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        right: 100,
    },
});
```

#### `relativePosition.below`

-   **타입:** `number`
-   **필수:** 아니오

일치하는 요소의 `아래쪽`으로 x 픽셀 클릭합니다.

##### 예시

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        below: 100,
    },
});
```

#### `relativePosition.left`

-   **타입:** `number`
-   **필수:** 아니오

일치하는 요소에서 `왼쪽`으로 x 픽셀 클릭합니다.

##### 예시

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        left: 100,
    },
});
```

### `fuzzyFindOptions`

다음 옵션을 사용하여 텍스트를 찾기 위한 퍼지 로직을 변경할 수 있습니다. 이는 더 나은 일치를 찾는 데 도움이 될 수 있습니다.

#### `fuzzyFindOptions.distance`

-   **타입:** `number`
-   **필수:** 아니오
-   **기본값:** 100

일치가 퍼지 위치(location으로 지정됨)에 얼마나 가까워야 하는지 결정합니다. 퍼지 위치에서 distance 문자 떨어진 정확한 글자 일치는 완전히 불일치로 점수가 매겨집니다. 거리가 0이면 일치가 지정된 정확한 위치에 있어야 합니다. 1000의 거리는 0.8의 임계값을 사용하여 완벽한 일치가 위치에서 800자 이내에 있어야 발견됩니다.

##### 예시

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

-   **타입:** `number`
-   **필수:** 아니오
-   **기본값:** 0

텍스트에서 패턴이 발견될 것으로 예상되는 대략적인 위치를 결정합니다.

##### 예시

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

-   **타입:** `number`
-   **필수:** 아니오
-   **기본값:** 0.6

매칭 알고리즘이 포기하는 지점을 설정합니다. 0의 임계값은 완벽한 일치(글자와 위치 모두)를 요구하고, 1.0의 임계값은 무엇이든 일치시킵니다.

##### 예시

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

-   **타입:** `number`
-   **필수:** 아니오
-   **기본값:** 2

이 값을 초과하는 길이를 가진 일치 항목만 반환됩니다. (예를 들어, 결과에서 단일 문자 일치를 무시하려면 2로 설정합니다)

##### 예시

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

-   **타입:** `number`
-   **필수:** 아니오
-   **기본값:** false

`true`일 때, 문자열에서 완벽한 일치가 이미 발견되었더라도 일치 함수는 검색 패턴의 끝까지 계속합니다.

##### 예시

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```