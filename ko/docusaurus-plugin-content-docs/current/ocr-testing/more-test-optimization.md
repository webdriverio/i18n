---
id: more-test-optimization
title: 테스트 실행 시간
---

기본적으로 이 모듈은 로컬 시스템이나 파이프라인에 Tesseract가 설치되어 있는지 확인합니다. 로컬 설치가 없으면 자동으로 [NodeJS](https://github.com/naptha/tesseract.js) 버전을 사용합니다. 이는 이미지 처리가 Node.js에 의해 수행되기 때문에 속도 저하를 초래할 수 있습니다. NodeJS는 무거운 처리를 수행하기에 최적의 시스템이 아닙니다.

**하지만...**, 실행 시간을 최적화하는 방법이 있습니다. 다음 테스트 스크립트를 살펴보겠습니다.

```ts
import { browser } from "@wdio/globals";

describe("Search", () => {
    it("be able to search for a value", async () => {
        await browser.url("https://webbrowser.io");
        await browser.ocrClickOnText({
            text: "Search",
        });
        await browser.ocrSetValue({
            text: "docs",
            value: "specfileretries",
        });
        await browser.ocrWaitForTextDisplayed({
            text: "specFileRetries",
        });
    });
});
```

이것을 처음 실행할 때 테스트 완료에 5.9초가 걸리는 다음과 같은 결과를 볼 수 있습니다.

```log
npm run wdio -- --logLevel=silent

> ocr-demo@1.0.0 wdio
> wdio run ./wdio.conf.ts --logLevel=silent


Execution of 1 workers started at 2024-05-26T04:52:53.405Z

[0-0] RUNNING in chrome - file:///test/specs/test.e2e.ts
[0-0] Estimating resolution as 182
[0-0] Estimating resolution as 124
[0-0] Estimating resolution as 126
[0-0] PASSED in chrome - file:///test/specs/test.e2e.ts

 "spec" Reporter:
------------------------------------------------------------------
[chrome 125.0.6422.78 mac #0-0] Running: chrome (v125.0.6422.78) on mac
[chrome 125.0.6422.78 mac #0-0] Session ID: d281dcdc43962b95835aea8f64cab6c7
[chrome 125.0.6422.78 mac #0-0]
[chrome 125.0.6422.78 mac #0-0] » /test/specs/test.e2e.ts
[chrome 125.0.6422.78 mac #0-0] Search
[chrome 125.0.6422.78 mac #0-0]    ✓ be able to search for a value
[chrome 125.0.6422.78 mac #0-0]
[chrome 125.0.6422.78 mac #0-0] 1 passing (5.9s)


Spec Files:      1 passed, 1 total (100% completed) in 00:00:08
```

## 화면의 검색 영역 자르기

OCR을 실행할 영역을 잘라서 제공하여 실행 시간을 최적화할 수 있습니다.

스크립트를 다음과 같이 변경하면:

```ts
import { browser } from "@wdio/globals";

describe("Search", () => {
    it("be able to search for a value", async () => {
        await browser.url("https://webdriver.io");
        await driver.ocrClickOnText({
            haystack: $(".DocSearch"),
            text: "Search",
        });
        await driver.ocrSetValue({
            haystack: $(".DocSearch-Form"),
            text: "docs",
            value: "specfileretries",
        });
        await driver.ocrWaitForTextDisplayed({
            haystack: $(".DocSearch-Dropdown"),
            text: "specFileRetries",
        });
    });
});
```

다른 실행 시간을 볼 수 있습니다.

```log
npm run wdio -- --logLevel=silent

> ocr-demo@1.0.0 wdio
> wdio run ./wdio.conf.ts --logLevel=silent


Execution of 1 workers started at 2024-05-26T04:56:55.326Z

[0-0] RUNNING in chrome - file:///test/specs/test.e2e.ts
[0-0] Estimating resolution as 182
[0-0] Estimating resolution as 124
[0-0] Estimating resolution as 124
[0-0] PASSED in chrome - file:///test/specs/test.e2e.ts

 "spec" Reporter:
------------------------------------------------------------------
[chrome 125.0.6422.78 mac #0-0] Running: chrome (v125.0.6422.78) on mac
[chrome 125.0.6422.78 mac #0-0] Session ID: c6cb1843535bda3ee3af07920ce232b8
[chrome 125.0.6422.78 mac #0-0]
[chrome 125.0.6422.78 mac #0-0] » /test/specs/test.e2e.ts
[chrome 125.0.6422.78 mac #0-0] Search
[chrome 125.0.6422.78 mac #0-0]    ✓ be able to search for a value
[chrome 125.0.6422.78 mac #0-0]
[chrome 125.0.6422.78 mac #0-0] 1 passing (4.8s)


Spec Files:      1 passed, 1 total (100% completed) in 00:00:08
```

:::tip 이미지 자르기
이렇게 하면 로컬 실행 시간이 **5.9**초에서 **4.8초**로 줄어듭니다. 이는 거의 **19%**의 감소입니다. 더 많은 데이터가 있는 더 큰 스크립트에서는 어떤 효과가 있을지 상상해 보세요.
:::

## Tesseract의 로컬 설치 사용하기

로컬 시스템이나 파이프라인에 Tesseract가 로컬로 설치되어 있다면 실행 시간을 1분도 안 되게 단축할 수 있습니다(로컬 시스템에 Tesseract 설치에 대한 자세한 정보는 [여기](https://tesseract-ocr.github.io/tessdoc/Installation.html)에서 찾을 수 있습니다). 아래에서 Tesseract의 로컬 설치를 사용한 동일한 스크립트의 실행 시간을 확인할 수 있습니다.

```log
npm run wdio -- --logLevel=silent

> ocr-demo@1.0.0 wdio
> wdio run ./wdio.conf.ts --logLevel=silent


Execution of 1 workers started at 2024-05-26T04:59:11.620Z

[0-0] RUNNING in chrome - file:///test/specs/test.e2e.ts
[0-0] PASSED in chrome - file:///test/specs/test.e2e.ts

 "spec" Reporter:
------------------------------------------------------------------
[chrome 125.0.6422.78 mac #0-0] Running: chrome (v125.0.6422.78) on mac
[chrome 125.0.6422.78 mac #0-0] Session ID: 87f8c1e949e15a383b902e4d59b1f738
[chrome 125.0.6422.78 mac #0-0]
[chrome 125.0.6422.78 mac #0-0] » /test/specs/test.e2e.ts
[chrome 125.0.6422.78 mac #0-0] Search
[chrome 125.0.6422.78 mac #0-0]    ✓ be able to search for a value
[chrome 125.0.6422.78 mac #0-0]
[chrome 125.0.6422.78 mac #0-0] 1 passing (3.9s)


Spec Files:      1 passed, 1 total (100% completed) in 00:00:06
```

:::tip 로컬 설치
이렇게 하면 로컬 실행 시간이 **5.9**초에서 **3.9초**로 줄어듭니다. 이는 거의 **34%**의 감소입니다. 더 많은 데이터가 있는 더 큰 스크립트에서는 어떤 효과가 있을지 상상해 보세요.
:::