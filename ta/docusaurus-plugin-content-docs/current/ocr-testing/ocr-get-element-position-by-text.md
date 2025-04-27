---
id: ocr-get-element-position-by-text
title: ocrGetElementPositionByText
---

திரையில் உரையின் நிலையைப் பெறுங்கள். இந்த கட்டளை வழங்கப்பட்ட உரையைத் தேடி, [Fuse.js](https://fusejs.io/)-இல் இருந்து ஃபஸி லாஜிக் அடிப்படையில் பொருத்தத்தைக் கண்டறிய முயற்சிக்கும். இதன் பொருள் நீங்கள் தவறான எழுத்துக்களுடன் தேர்வியை வழங்கினாலும், அல்லது கண்டுபிடிக்கப்பட்ட உரை 100% பொருந்தாவிட்டாலும், அது இன்னும் உங்களுக்கு ஒரு கூறை திருப்பித் தர முயற்சிக்கும். கீழே உள்ள [பதிவுகளை](#logs) பார்க்கவும்.

## பயன்பாடு

```js
const result = await browser.ocrGetElementPositionByText("Username");

console.log("result = ", JSON.stringify(result, null, 2));
```

## வெளியீடு

### முடிவு

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

### பதிவுகள்

```log
# Still finding a match even though we searched for "Start3d" and the found text was "Started"
[0-0] 2024-05-25T17:29:59.179Z INFO webdriver: COMMAND ocrGetElementPositionByText(<object>)
......................
[0-0] 2024-05-25T17:29:59.993Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

## விருப்பங்கள்

### `text`

-   **வகை:** `string`
-   **கட்டாயம்:** ஆம்

நீங்கள் கிளிக் செய்ய தேட விரும்பும் உரை.

#### எடுத்துக்காட்டு

```js
await browser.ocrGetElementPositionByText({ text: "WebdriverIO" });
```

### `contrast`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `0.25`

கான்ட்ராஸ்ட் அதிகமாக இருக்கும்போது, படம் இருண்டதாகவும், மாறாக இருக்கும்போது வெளிச்சமாகவும் இருக்கும். இது படத்தில் உரையைக் கண்டுபிடிக்க உதவும். இது `-1` மற்றும் `1` க்கு இடையில் மதிப்புகளை ஏற்றுக்கொள்கிறது.

#### எடுத்துக்காட்டு

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

-   **வகை:** `number`
-   **கட்டாயம்:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

இது OCR உரையைத் தேட வேண்டிய திரையில் உள்ள தேடல் பகுதியாகும். இது ஒரு கூறாகவோ அல்லது `x`, `y`, `width` மற்றும் `height` கொண்ட செவ்வகமாகவோ இருக்கலாம்

#### எடுத்துக்காட்டு

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// OR
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// OR
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

-   **வகை:** `string`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `eng`

டெசரேக்ட் அங்கீகரிக்கும் மொழி. மேலும் தகவல் [இங்கு](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) காணலாம் மற்றும் ஆதரிக்கப்படும் மொழிகளை [இங்கு](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts) காணலாம்.

#### எடுத்துக்காட்டு

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    // Use Dutch as a language
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

உரையைக் கண்டுபிடிக்க ஃபஸி லாஜிக்கை பின்வரும் விருப்பங்களுடன் மாற்றலாம். இது சிறந்த பொருத்தத்தைக் கண்டுபிடிக்க உதவும்

#### `fuzzyFindOptions.distance`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** 100

பொருத்தம் ஃபஸி இருப்பிடத்திற்கு (இருப்பிடத்தால் குறிப்பிடப்பட்டுள்ளது) எவ்வளவு அருகிலிருக்க வேண்டும் என்பதைத் தீர்மானிக்கிறது. ஃபஸி இருப்பிடத்திலிருந்து தூர எழுத்துக்களாக இருக்கும் துல்லியமான எழுத்துப் பொருத்தம் முழுமையான பொருத்தமின்மையாகக் கணிக்கப்படும். 0 தூரம் குறிப்பிட்ட துல்லியமான இருப்பிடத்தில் பொருத்தம் இருக்க வேண்டும் என்று கோருகிறது. 0.8 என்ற வரம்பைப் பயன்படுத்தி 1000 தூரம் சரியான பொருத்தம் இருப்பிடத்திலிருந்து 800 எழுத்துகளுக்குள் இருக்க வேண்டும்.

##### எடுத்துக்காட்டு

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** 0

உரையில் எங்கு முறை காணப்படும் என்பதை தோராயமாக தீர்மானிக்கிறது.

##### எடுத்துக்காட்டு

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** 0.6

பொருத்துதல் அல்காரிதம் எந்த புள்ளியில் கைவிடுகிறது. 0 என்ற வரம்பு ஒரு முழுமையான பொருத்தத்தை (எழுத்துகள் மற்றும் இருப்பிடம் இரண்டிலும்) கோருகிறது, 1.0 என்ற வரம்பு எதையும் பொருத்தும்.

##### எடுத்துக்காட்டு

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

-   **வகை:** `boolean`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** false

தேடல் கேஸ் உணர்திறன் கொண்டதாக இருக்க வேண்டுமா.

##### எடுத்துக்காட்டு

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** 2

நீளம் இந்த மதிப்பை மீறும் பொருத்தங்கள் மட்டுமே திருப்பப்படும். (உதாரணமாக, முடிவில் ஒற்றை எழுத்து பொருத்தங்களை புறக்கணிக்க விரும்பினால், அதை 2 ஆக அமைக்கவும்)

##### எடுத்துக்காட்டு

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** false

`true` என்றால், சிறந்த பொருத்தம் ஏற்கனவே சரத்தில் கண்டறியப்பட்டிருந்தாலும், பொருத்தும் செயல்பாடு தேடல் முறையின் முடிவு வரை தொடரும்.

##### எடுத்துக்காட்டு

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```