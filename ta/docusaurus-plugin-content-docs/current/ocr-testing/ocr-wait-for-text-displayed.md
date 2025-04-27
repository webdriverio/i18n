---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
---

திரையில் ஒரு குறிப்பிட்ட உரை காட்டப்படும் வரை காத்திருக்கவும்.

## பயன்பாடு

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
});
```

## வெளியீடு

### பதிவுகள்

```log
[0-0] 2024-05-26T04:32:52.005Z INFO webdriver: COMMAND ocrWaitForTextDisplayed(<object>)
......................
# ocrWaitForTextDisplayed uses ocrGetElementPositionByText under the hood, that is why you see the command ocrGetElementPositionByText in the logs
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## விருப்பங்கள்

### `text`

-   **வகை:** `string`
-   **கட்டாயம்:** ஆம்

நீங்கள் கிளிக் செய்ய தேட விரும்பும் உரை.

#### எடுத்துக்காட்டு

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** 18000 (18 வினாடிகள்)

மில்லி வினாடிகளில் நேரம். OCR செயல்முறை சிறிது நேரம் எடுக்கலாம் என்பதை நினைவில் கொள்ளுங்கள், எனவே அதை மிகக் குறைவாக அமைக்க வேண்டாம்.

#### எடுத்துக்காட்டு

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // 25 வினாடிகள் காத்திருக்கவும்
});
```

### `timeoutMsg`

-   **வகை:** `string`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `Could not find the text "{selector}" within the requested time.`

இது இயல்புநிலை பிழை செய்தியை மாற்றுகிறது.

#### எடுத்துக்காட்டு

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `0.25`

மாறுபாடு அதிகமாக இருந்தால், படம் இருண்டதாகவும், குறைவாக இருந்தால் வெளிச்சமாகவும் இருக்கும். இது படத்தில் உரையைக் கண்டுபிடிக்க உதவலாம். இது `-1` மற்றும் `1` இடையே உள்ள மதிப்புகளை ஏற்றுக்கொள்கிறது.

#### எடுத்துக்காட்டு

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

-   **வகை:** `number`
-   **கட்டாயம்:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

இது திரையில் OCR உரையைத் தேட வேண்டிய தேடல் பகுதியாகும். இது ஒரு உறுப்பாகவோ அல்லது `x`, `y`, `width` மற்றும் `height` கொண்ட செவ்வகமாகவோ இருக்கலாம்.

#### எடுத்துக்காட்டு

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: $("elementSelector"),
});

// அல்லது
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: await $("elementSelector"),
});

// அல்லது
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

-   **வகை:** `string`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `eng`

Tesseract அங்கீகரிக்கும் மொழி. மேலும் தகவல் [இங்கே](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) காணலாம் மற்றும் ஆதரிக்கப்படும் மொழிகளை [இங்கே](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts) காணலாம்.

#### எடுத்துக்காட்டு

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    // டச்சு மொழியைப் பயன்படுத்தவும்
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

பின்வரும் விருப்பங்களைக் கொண்டு உரையைக் கண்டுபிடிக்க fuzzy தர்க்கத்தை மாற்றலாம். இது சிறந்த பொருத்தத்தைக் கண்டுபிடிக்க உதவலாம்.

#### `fuzzyFindOptions.distance`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** 100

மாறுபட்ட இருப்பிடத்திற்கு (location மூலம் குறிப்பிடப்பட்டுள்ளது) எவ்வளவு நெருக்கமாக பொருத்தம் இருக்க வேண்டும் என்பதைத் தீர்மானிக்கிறது. மாறுபட்ட இருப்பிடத்திலிருந்து தூரமான எழுத்துக்கள் முற்றிலும் பொருந்தாததாக மதிப்பெண் பெறும். 0 தூரம் குறிப்பிட்ட சரியான இடத்தில் பொருந்துவதை வேண்டும். 0.8 threshold பயன்படுத்தி, 1000 தூரம் சரியான பொருத்தத்தை இருப்பிடத்திலிருந்து 800 எழுத்துக்களுக்குள் இருக்க வேண்டும்.

##### எடுத்துக்காட்டு

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** 0

உரையில் எங்கே வடிவம் காணப்படும் என்பதை தோராயமாக தீர்மானிக்கிறது.

##### எடுத்துக்காட்டு

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** 0.6

எந்த நிலையில் பொருத்தும் அல்காரிதம் விட்டுவிடும். 0 threshold ஒரு சரியான பொருத்தத்தை (எழுத்துக்கள் மற்றும் இடம் இரண்டிலும்) தேவைப்படுத்துகிறது, 1.0 threshold எதையும் பொருத்தும்.

##### எடுத்துக்காட்டு

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

-   **வகை:** `boolean`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** false

தேடலானது case sensitive ஆக இருக்க வேண்டுமா.

##### எடுத்துக்காட்டு

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** 2

இந்த மதிப்பை மீறும் நீளமுடைய பொருத்தங்கள் மட்டுமே திருப்பப்படும். (உதாரணமாக, முடிவில் ஒற்றை எழுத்து பொருத்தங்களைப் புறக்கணிக்க விரும்பினால், அதை 2 ஆக அமைக்கவும்)

##### எடுத்துக்காட்டு

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** false

`true` என்றால், சரத்தில் ஒரு சரியான பொருத்தம் ஏற்கனவே கண்டறியப்பட்டிருந்தாலும், பொருத்தும் செயல்பாடு தேடல் வடிவத்தின் முடிவு வரை தொடரும்.

##### எடுத்துக்காட்டு

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```