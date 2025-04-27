---
id: more-test-optimization
title: परीक्षण निष्पादन समय
---

डिफ़ॉल्ट रूप से, यह मॉड्यूल जांच करेगा कि आपके मशीन/आपके पाइपलाइन में Tesseract का स्थानीय इंस्टॉलेशन है या नहीं। यदि आपके पास स्थानीय इंस्टॉलेशन नहीं है, तो यह स्वचालित रूप से [NodeJS](https://github.com/naptha/tesseract.js) संस्करण का उपयोग करेगा। इससे कुछ धीमापन हो सकता है क्योंकि छवि प्रोसेसिंग Node.js द्वारा की जाएगी। NodeJS भारी प्रोसेसिंग करने के लिए सबसे अच्छा सिस्टम नहीं है।

**लेकिन....**, निष्पादन समय को अनुकूलित करने के तरीके हैं। निम्नलिखित टेस्ट स्क्रिप्ट को देखें

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

जब आप इसे पहली बार निष्पादित करते हैं, तो आप निम्नलिखित परिणाम देख सकते हैं जहां परीक्षण को पूरा करने में 5.9 सेकंड लगे।

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

## स्क्रीन के खोज क्षेत्र को क्रॉप करना

आप OCR को निष्पादित करने के लिए क्रॉप किए गए क्षेत्र प्रदान करके निष्पादन समय को अनुकूलित कर सकते हैं।

यदि आप स्क्रिप्ट को इस प्रकार बदलते हैं:

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

तब आप एक अलग निष्पादन समय देखेंगे।

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

:::tip छवियों को क्रॉप करना
इसने स्थानीय निष्पादन समय को **5.9** से **4.8 सेकंड** तक कम कर दिया। यह लगभग **19%** की कमी है। कल्पना करें कि यह अधिक डेटा वाली बड़ी स्क्रिप्ट के लिए क्या कर सकता है।
:::

## Tesseract के स्थानीय इंस्टॉलेशन का उपयोग करना

यदि आपके स्थानीय मशीन पर और आपके पाइपलाइन में Tessarect का स्थानीय इंस्टॉलेशन है (अपने स्थानीय सिस्टम पर Tesseract को इंस्टॉल करने के बारे में अधिक जानकारी [यहां](https://tesseract-ocr.github.io/tessdoc/Installation.html) पाई जा सकती है) तो आप अपने निष्पादन समय को और भी कम कर सकते हैं। आप Tesseract के स्थानीय इंस्टॉलेशन का उपयोग करके समान स्क्रिप्ट के निष्पादन समय को नीचे देख सकते हैं।

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

:::tip स्थानीय इंस्टॉलेशन
इसने स्थानीय निष्पादन समय को **5.9** से **3.9 सेकंड** तक कम कर दिया। यह लगभग **34%** की कमी है। कल्पना करें कि यह अधिक डेटा वाली बड़ी स्क्रिप्ट के लिए क्या कर सकता है।
:::