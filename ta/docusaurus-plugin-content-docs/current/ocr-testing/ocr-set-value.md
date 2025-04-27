---
id: ocr-set-value
title: ocrSetValue
---

ஒரு உறுப்புக்கு key strokes வரிசையை அனுப்புகிறது. இது:

-   தானாகவே உறுப்பைக் கண்டறியும்
-   அதன் மீது கிளிக் செய்வதன் மூலம் புலத்தில் கவனம் செலுத்தும்
-   புலத்தில் மதிப்பை அமைக்கும்

கட்டளை வழங்கப்பட்ட உரையைத் தேடி, [Fuse.js](https://fusejs.io/) இலிருந்து Fuzzy Logic அடிப்படையில் பொருத்தத்தைக் கண்டறிய முயற்சிக்கும். இதன் பொருள் நீங்கள் ஒரு தவறான தேர்வியை வழங்கினாலும், அல்லது கண்டறியப்பட்ட உரை 100% பொருந்தாவிட்டாலும், அது இன்னும் உங்களுக்கு ஒரு உறுப்பைத் திருப்பித் தர முயற்சிக்கும். கீழே உள்ள [பதிவுகளைப்](#logs) பார்க்கவும்.

## பயன்பாடு

```js
await brower.ocrSetValue({
    text: "docs",
    value: "specfileretries",
});
```

## வெளியீடு

### பதிவுகள்

```log
[0-0] 2024-05-26T04:17:51.355Z INFO webdriver: COMMAND ocrSetValue(<object>)
......................
[0-0] 2024-05-26T04:17:52.356Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "docs" and found one match "docs" with score "100%"
```

## விருப்பங்கள்

### `text`

-   **வகை:** `string`
-   **கட்டாயம்:** ஆம்

நீங்கள் கிளிக் செய்ய விரும்பும் தேடுவதற்கான உரை.

#### உதாரணம்

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

-   **வகை:** `string`
-   **கட்டாயம்:** ஆம்

சேர்க்க வேண்டிய மதிப்பு.

#### உதாரணம்

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `submitValue`

-   **வகை:** `boolean`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `false`

மதிப்பு உள்ளீட்டுப் புலத்தில் சமர்ப்பிக்கப்பட வேண்டுமா. இதன் பொருள் சரத்தின் இறுதியில் "ENTER" அனுப்பப்படும்.

#### உதாரணம்

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `500` மில்லிவினாடிகள்

இது கிளிக்கின் கால அளவு. நீங்கள் விரும்பினால் நேரத்தை அதிகரிப்பதன் மூலம் "நீண்ட கிளிக்" ஐயும் உருவாக்கலாம்.

#### உதாரணம்

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    clickDuration: 3000, // இது 3 வினாடிகள்
});
```

### `contrast`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `0.25`

கான்ட்ராஸ்ட் அதிகமாக இருந்தால், படம் இருண்டதாக மாறும், அதற்கு நேர்மாறாகவும். இது படத்தில் உரையைக் கண்டறிய உதவும். இது `-1` மற்றும் `1` இடையே உள்ள மதிப்புகளை ஏற்றுக்கொள்கிறது.

#### உதாரணம்

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    contrast: 0.5,
});
```

### `haystack`

-   **வகை:** `number`
-   **கட்டாயம்:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

இது OCR உரையைத் தேட வேண்டிய திரையில் உள்ள தேடல் பகுதி. இது ஒரு உறுப்பு அல்லது `x`, `y`, `width` மற்றும் `height` கொண்ட செவ்வகமாக இருக்கலாம்.

#### உதாரணம்

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: $("elementSelector"),
});

// அல்லது
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: await $("elementSelector"),
});

// அல்லது
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

-   **வகை:** `string`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `eng`

Tesseract அங்கீகரிக்கும் மொழி. மேலும் தகவலை [இங்கே](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) காணலாம் மற்றும் ஆதரிக்கப்படும் மொழிகளை [இங்கே](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts) காணலாம்.

#### உதாரணம்

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    // டச்சு மொழியைப் பயன்படுத்தவும்
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **வகை:** `object`
-   **கட்டாயம்:** இல்லை

பொருந்தும் உறுப்புக்கு தொடர்புடைய திரையில் கிளிக் செய்யலாம். இது தொடர்புடைய பிக்செல்கள் `above`, `right`, `below` அல்லது `left` இல் இருந்து பொருந்தும் உறுப்பு அடிப்படையில் செய்யப்படலாம்.

:::note

பின்வரும் சேர்க்கைகள் அனுமதிக்கப்படுகின்றன

-   ஒற்றை பண்புகள்
-   `above` + `left` அல்லது `above` + `right`
-   `below` + `left` அல்லது `below` + `right`

பின்வரும் சேர்க்கைகள் **அனுமதிக்கப்படவில்லை**

-   `above` மற்றும் `below`
-   `left` மற்றும் `right`

:::

#### `relativePosition.above`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை

பொருந்தும் உறுப்புக்கு x பிக்செல்கள் `above` கிளிக் செய்யவும்.

##### உதாரணம்

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

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை

பொருந்தும் உறுப்பில் இருந்து x பிக்செல்கள் `right` கிளிக் செய்யவும்.

##### உதாரணம்

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

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை

பொருந்தும் உறுப்புக்கு x பிக்செல்கள் `below` கிளிக் செய்யவும்.

##### உதாரணம்

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

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை

பொருந்தும் உறுப்பில் இருந்து x பிக்செல்கள் `left` கிளிக் செய்யவும்.

##### உதாரணம்

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

பின்வரும் விருப்பங்களுடன் உரையைக் கண்டறிய புஸி லாஜிக்கை மாற்றலாம். இது சிறந்த பொருத்தத்தைக் கண்டறிய உதவலாம்.

#### `fuzzyFindOptions.distance`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** 100

பொருத்தம் fuzzy இருப்பிடத்திற்கு (இருப்பிடத்தால் குறிப்பிடப்பட்டுள்ளது) எவ்வளவு நெருக்கமாக இருக்க வேண்டும் என்பதைத் தீர்மானிக்கிறது. fuzzy இருப்பிடத்திலிருந்து தூரத்தில் உள்ள எழுத்துகள் முழுமையான பொருத்தமின்மையாக மதிப்பெண் பெறும். 0 தூரம் குறிப்பிடப்பட்ட சரியான இருப்பிடத்தில் பொருத்தத்தை தேவைப்படுத்துகிறது. 1000 தூரம் ஒரு முழுமையான பொருத்தத்தை 0.8 என்ற வரம்பைப் பயன்படுத்தி கண்டறியப்பட 800 எழுத்துகளுக்குள் இருக்க வேண்டும்.

##### உதாரணம்

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

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** 0

உரையில் வடிவம் கண்டறியப்பட வேண்டும் என்று எதிர்பார்க்கப்படுகிறது என்பதை தோராயமாக தீர்மானிக்கிறது.

##### உதாரணம்

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

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** 0.6

எந்த புள்ளியில் பொருத்தும் அல்காரிதம் விட்டுவிடுகிறது. 0 என்ற வரம்பு ஒரு முழுமையான பொருத்தத்தை (எழுத்துகள் மற்றும் இருப்பிடம் இரண்டிலும்) தேவைப்படுத்துகிறது, 1.0 என்ற வரம்பு எதையும் பொருத்தும்.

##### உதாரணம்

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

-   **வகை:** `boolean`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** false

தேடல் case sensitive ஆக இருக்க வேண்டுமா.

##### உதாரணம்

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

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** 2

நீளம் இந்த மதிப்பை மீறும் பொருத்தங்கள் மட்டுமே திருப்பித் தரப்படும். (உதாரணமாக, முடிவில் ஒற்றை எழுத்து பொருத்தங்களை புறக்கணிக்க விரும்பினால், அதை 2 ஆக அமைக்கவும்)

##### உதாரணம்

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

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** false

`true` எனில், ஸ்ட்ரிங்கில் ஒரு முழுமையான பொருத்தம் ஏற்கனவே கண்டறியப்பட்டிருந்தாலும், பொருத்தும் செயல்பாடு தேடல் வடிவத்தின் முடிவு வரை தொடரும்.

##### உதாரணம்

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```