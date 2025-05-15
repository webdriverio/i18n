---
id: getting-started
title: 시작하기
---

## 설치

`@wdio/ocr-service`를 당신의 `package.json`에 의존성으로 유지하는 가장 쉬운 방법입니다.

```bash npm2yarn
npm install @wdio/ocr-service --save-dev
```

`WebdriverIO` 설치 방법은 [여기서](../gettingstarted) 찾을 수 있습니다.

:::note
이 모듈은 OCR 엔진으로 Tesseract를 사용합니다. 기본적으로 시스템에 Tesseract가 로컬로 설치되어 있는지 확인하고, 있다면 그것을 사용합니다. 없다면 자동으로 설치되는 [Node.js Tesseract.js](https://github.com/naptha/tesseract.js) 모듈을 사용합니다.

이미지 처리 속도를 높이려면 로컬에 설치된 Tesseract 버전을 사용하는 것이 좋습니다. [테스트 실행 시간](./more-test-optimization#using-a-local-installation-of-tesseract)도 참조하세요.
:::

로컬 시스템에 Tesseract를 시스템 의존성으로 설치하는 방법은 [여기서](https://tesseract-ocr.github.io/tessdoc/Installation.html) 찾을 수 있습니다.

:::caution
Tesseract 설치 관련 질문/오류는 [Tesseract](https://github.com/tesseract-ocr/tesseract) 프로젝트를 참조하세요.
:::

## 타입스크립트 지원

`@wdio/ocr-service`를 `tsconfig.json` 설정 파일에 추가해야 합니다.

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/ocr-service"]
    }
}
```

## 설정

이 서비스를 사용하려면 `wdio.conf.ts`의 services 배열에 `ocr`을 추가해야 합니다.

```js
// wdio.conf.js
exports.config = {
    //...
    services: [
        // your other services
        [
            "ocr",
            {
                contrast: 0.25,
                imagesFolder: ".tmp/",
                language: "eng",
            },
        ],
    ],
};
```

### 설정 옵션

#### `contrast`

-   **타입:** `number`
-   **필수:** 아니오
-   **기본값:** `0.25`

대비가 높을수록 이미지가 더 어두워지고 반대로 낮을수록 밝아집니다. 이는 이미지에서 텍스트를 찾는 데 도움이 될 수 있습니다. `-1`과 `1` 사이의 값을 받습니다.

#### `imagesFolder`

-   **타입:** `string`
-   **필수:** 아니오
-   **기본값:** `{project-root}/.tmp/ocr`

OCR 결과가 저장되는 폴더입니다.

:::note
사용자 정의 `imagesFolder`를 제공하면 서비스는 자동으로 `ocr` 하위 폴더를 추가합니다.
:::

#### `language`

-   **타입:** `string`
-   **필수:** 아니오
-   **기본값:** `eng`

Tesseract가 인식할 언어입니다. 더 많은 정보는 [여기서](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) 찾을 수 있으며 지원되는 언어는 [여기서](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts) 확인할 수 있습니다.

## 로그

이 모듈은 WebdriverIO 로그에 추가 로그를 자동으로 추가합니다. `@wdio/ocr-service` 이름으로 `INFO`와 `WARN` 로그에 작성합니다.
아래에 예시가 있습니다.

```log
...............
[0-0] 2024-05-24T06:55:12.739Z INFO @wdio/ocr-service: Adding commands to global browser
[0-0] 2024-05-24T06:55:12.750Z INFO @wdio/ocr-service: Adding browser command "ocrGetText" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrGetElementPositionByText" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrWaitForTextDisplayed" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrClickOnText" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrSetValue" to browser object
...............
[0-0] 2024-05-24T06:55:13.667Z INFO @wdio/ocr-service:getData: Using system installed version of Tesseract
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:getData: It took '0.351s' to process the image.
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:getData: The following text was found through OCR:
[0-0]
[0-0] IQ Docs API Blog Contribute Community Sponsor Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:getData: OCR Image with found text can be found here:
[0-0]
[0-0] .tmp/ocr/desktop-1716533713585.png
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "Get Started" and found one match "Started" with score "63.64
...............
```