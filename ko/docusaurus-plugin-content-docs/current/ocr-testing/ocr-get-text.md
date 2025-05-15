---
id: ocr-get-text
title: ocrGetText
---

이미지에서 텍스트를 가져옵니다.

### Usage

```js
const result = await browser.ocrGetText();

console.log("result = ", JSON.stringify(result, null, 2));
```

## Output

### Result

```logs
result = "VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube"
```

### Logs

```log
[0-0] 2024-05-25T17:38:25.970Z INFO webdriver: COMMAND ocrGetText()
......................
[0-0] 2024-05-25T17:38:26.738Z INFO webdriver: RESULT VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube
```

## Options

### `contrast`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** `0.25`

대비가 높을수록 이미지가 어두워지고 그 반대도 마찬가지입니다. 이는 이미지에서 텍스트를 찾는 데 도움이 될 수 있습니다. `-1`과 `1` 사이의 값을 허용합니다.

#### Example

```js
await browser.ocrGetText({ contrast: 0.5 });
```

### `haystack`

-   **Type:** `number`
-   **Mandatory:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

OCR이 텍스트를 찾아야 하는 화면 내 검색 영역입니다. 이는 요소나 `x`, `y`, `width`, `height`를 포함하는 사각형일 수 있습니다.

#### Example

```js
await browser.ocrGetText({ haystack: $("elementSelector") });

// OR
await browser.ocrGetText({ haystack: await $("elementSelector") });

// OR
await browser.ocrGetText({
    haystack: {
        x: 10,
        y: 50,
        width: 300,
        height: 75,
    },
});
```

### `language`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** `eng`

Tesseract가 인식할 언어입니다. 더 많은 정보는 [여기](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions)에서 찾을 수 있으며 지원되는 언어는 [여기](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts)에서 확인할 수 있습니다.

#### Example

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetText({
    // Use Dutch as a language
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```