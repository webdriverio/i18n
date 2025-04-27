---
id: more-test-optimization
title: சோதனை செயல்படுத்தும் நேரம்
---

இயல்பாக, இந்த தொகுதி உங்கள் கணினியில்/உங்கள் பைப்லைனில் Tesseract இன் உள்ளூர் நிறுவல் உள்ளதா என்பதைச் சரிபார்க்கும். உங்களிடம் உள்ளூர் நிறுவல் இல்லையெனில், அது தானாகவே [NodeJS](https://github.com/naptha/tesseract.js) பதிப்பைப் பயன்படுத்தும். படச் செயலாக்கம் Node.js மூலம் செய்யப்படுவதால் இது சிறிது மெதுவாக இருக்கலாம். கனமான செயலாக்கத்தைச் செய்ய NodeJS சிறந்த அமைப்பு அல்ல.

**ஆனால்....**, செயல்படுத்தும் நேரத்தை உகந்ததாக்க வழிகள் உள்ளன. பின்வரும் சோதனை ஸ்கிரிப்டைப் பார்ப்போம்

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

இதை முதல் முறையாக இயக்கும் போது, சோதனையை முடிக்க 5.9 விநாடிகள் எடுத்துக்கொண்டதைக் காணலாம்.

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

## திரையின் தேடல் பகுதியை வெட்டுதல்

OCR செயல்படுத்த வெட்டப்பட்ட பகுதியை வழங்குவதன் மூலம் செயல்படுத்தும் நேரத்தை உகந்ததாக்கலாம்.

நீங்கள் ஸ்கிரிப்டை இப்படி மாற்றினால்:

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

பின்னர் நீங்கள் வித்தியாசமான செயல்படுத்தும் நேரத்தைக் காண்பீர்கள்.

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

:::tip படங்களை வெட்டுதல்
இது உள்ளூர் செயல்படுத்தும் நேரத்தை **5.9** இலிருந்து **4.8 விநாடிகளுக்கு** குறைத்தது. இது கிட்டத்தட்ட **19%** குறைப்பாகும். அதிக தரவுகளுடன் கூடிய பெரிய ஸ்கிரிப்டுக்கு இது என்ன செய்யக்கூடும் என்பதை கற்பனை செய்து பாருங்கள்.
:::

## Tesseract இன் உள்ளூர் நிறுவலைப் பயன்படுத்துதல்

உங்கள் உள்ளூர் கணினியில் மற்றும்/அல்லது உங்கள் பைப்லைனில் Tessarect இன் உள்ளூர் நிறுவல் இருந்தால், செயல்படுத்தும் நேரத்தை ஒரு நிமிடத்திற்கும் குறைவாக வேகப்படுத்தலாம் (உங்கள் உள்ளூர் கணினியில் Tesseract ஐ நிறுவுவது பற்றிய கூடுதல் தகவலை [இங்கே](https://tesseract-ocr.github.io/tessdoc/Installation.html) காணலாம்). Tesseract இன் உள்ளூர் நிறுவலைப் பயன்படுத்தி அதே ஸ்கிரிப்டின் செயல்படுத்தும் நேரத்தை கீழே காணலாம்.

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

:::tip உள்ளூர் நிறுவல்
இது உள்ளூர் செயல்படுத்தும் நேரத்தை **5.9** இலிருந்து **3.9 விநாடிகளுக்கு** குறைத்தது. இது கிட்டத்தட்ட **34%** குறைப்பாகும். அதிக தரவுகளுடன் கூடிய பெரிய ஸ்கிரிப்டுக்கு இது என்ன செய்யக்கூடும் என்பதை கற்பனை செய்து பாருங்கள்.
:::