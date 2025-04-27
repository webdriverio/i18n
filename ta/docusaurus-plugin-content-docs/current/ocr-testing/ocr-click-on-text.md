---
id: ocr-click-on-text
title: ocrClickOnText
---

கொடுக்கப்பட்ட உரைகளின் அடிப்படையில் ஒரு உறுப்பைக் கிளிக் செய்யவும். இந்த கட்டளை கொடுக்கப்பட்ட உரையைத் தேடும் மற்றும் [Fuse.js](https://fusejs.io/) இலிருந்து ஃபஜி லாஜிக் அடிப்படையில் ஒரு பொருத்தத்தைக் கண்டறிய முயற்சிக்கும். இதன் பொருள் நீங்கள் தட்டச்சுப் பிழையுடன் தேர்வாளரை வழங்கினால், அல்லது கண்டறியப்பட்ட உரை 100% பொருத்தமாக இல்லாவிட்டாலும், அது இன்னும் உங்களுக்கு ஒரு உறுப்பை வழங்க முயற்சிக்கும். கீழே உள்ள [பதிவுகளைப்](#logs) பார்க்கவும்.

## பயன்பாடு

```js
await browser.ocrClickOnText({ text: "Start3d" });
```

## வெளியீடு

### பதிவுகள்

```log
# Still finding a match even though we searched for "Start3d" and the found text was "Started"
[0-0] 2024-05-25T05:05:20.096Z INFO webdriver: COMMAND ocrClickOnText(<object>)
......................
[0-0] 2024-05-25T05:05:21.022Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

### படம்

உங்கள் (இயல்புநிலை)[`imagesFolder`](./getting-started#imagesfolder) இல் தொகுதி எங்கு கிளிக் செய்துள்ளது என்பதைக் காட்ட ஒரு இலக்குடன் ஒரு படத்தைக் காண்பீர்கள்.

![Process steps](/img/ocr/ocr-click-on-text-target.jpg)

## விருப்பங்கள்

### `text`

-   **வகை:** `string`
-   **கட்டாயம்:** ஆம்

நீங்கள் கிளிக் செய்ய விரும்பும் உரையைத் தேடுகிறது.

#### எடுத்துக்காட்டு

```js
await browser.ocrClickOnText({ text: "WebdriverIO" });
```

### `clickDuration`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `500` மில்லிவினாடிகள்

இது கிளிக் செய்வதன் கால அளவு. நீங்கள் விரும்பினால் நேரத்தை அதிகரிப்பதன் மூலம் "நீண்ட கிளிக்" ஐயும் உருவாக்கலாம்.

#### எடுத்துக்காட்டு

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // இது 3 வினாடிகள்
});
```

### `contrast`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** `0.25`

கான்ட்ராஸ்ட் அதிகமாக இருந்தால், படம் இருண்டுவிடும், அதைப் போலவே குறைந்தால் வெளிர்ந்துவிடும். இது ஒரு படத்தில் உரையைக் கண்டுபிடிக்க உதவும். இது `-1` மற்றும் `1` க்கு இடையில் மதிப்புகளை ஏற்றுக்கொள்கிறது.

#### எடுத்துக்காட்டு

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

-   **வகை:** `number`
-   **கட்டாயம்:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

இது திரையில் OCR உரையைத் தேட வேண்டிய தேடல் பகுதியாகும். இது ஒரு உறுப்பு அல்லது `x`, `y`, `width` மற்றும் `height` கொண்ட ஒரு செவ்வகமாக இருக்கலாம்

#### எடுத்துக்காட்டு

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// அல்லது
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// அல்லது
await browser.ocrClickOnText({
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

Tesseract அங்கீகரிக்கும் மொழி. மேலும் தகவல்களை [இங்கே](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) காணலாம் மற்றும் ஆதரிக்கப்படும் மொழிகளை [இங்கே](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts) காணலாம்.

#### எடுத்துக்காட்டு

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrClickOnText({
    text: "WebdriverIO",
    // டச்சு மொழியைப் பயன்படுத்தவும்
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **வகை:** `object`
-   **கட்டாயம்:** இல்லை

பொருந்தும் உறுப்புக்கு தொடர்புடைய திரையில் கிளிக் செய்யலாம். இது பொருந்தும் உறுப்பிலிருந்து தொடர்புடைய பிக்சல்கள் `above`, `right`, `below` அல்லது `left` அடிப்படையில் செய்யப்படலாம்

:::note

பின்வரும் கலவைகள் அனுமதிக்கப்படுகின்றன

-   தனிப்பட்ட பண்புகள்
-   `above` + `left` அல்லது `above` + `right`
-   `below` + `left` அல்லது `below` + `right`

பின்வரும் கலவைகள் **அனுமதிக்கப்படவில்லை**

-   `above` மற்றும் `below`
-   `left` மற்றும் `right`

:::

#### `relativePosition.above`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை

பொருந்தும் உறுப்புக்கு x பிக்சல்கள் `above` கிளிக் செய்யவும்.

##### எடுத்துக்காட்டு

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        above: 100,
    },
});
```

#### `relativePosition.right`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை

பொருந்தும் உறுப்பிலிருந்து x பிக்சல்கள் `right` கிளிக் செய்யவும்.

##### எடுத்துக்காட்டு

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        right: 100,
    },
});
```

#### `relativePosition.below`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை

பொருந்தும் உறுப்புக்கு x பிக்சல்கள் `below` கிளிக் செய்யவும்.

##### எடுத்துக்காட்டு

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        below: 100,
    },
});
```

#### `relativePosition.left`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை

பொருந்தும் உறுப்பிலிருந்து x பிக்சல்கள் `left` கிளிக் செய்யவும்.

##### எடுத்துக்காட்டு

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        left: 100,
    },
});
```

### `fuzzyFindOptions`

பின்வரும் விருப்பங்களுடன் உரையைக் கண்டறிய ஃபஜி லாஜிக்கை மாற்றலாம். இது சிறந்த பொருத்தத்தைக் கண்டறிய உதவலாம்

#### `fuzzyFindOptions.distance`

-   **வகை:** `number`
-   **கட்டாயம்:** இல்லை
-   **இயல்புநிலை:** 100

ஃபஜி இருப்பிடத்திற்கு (இருப்பிடத்தால் குறிப்பிடப்பட்டுள்ளது) எவ்வளவு நெருக்கமாக பொருத்தம் இருக்க வேண்டும் என்பதைத் தீர்மானிக்கிறது. ஃபஜி இருப்பிடத்திலிருந்து தூர எழுத்துக்கள் தொலைவில் உள்ள துல்லியமான கடித பொருத்தம் முற்றிலும் பொருந்தாததாக மதிப்பெண் பெறும். 0 தூரம் குறிப்பிட்ட துல்லியமான இருப்பிடத்தில் பொருத்தம் இருக்க வேண்டும். 0.8 தடை உடன் 1000 தூரம் பரிபூரண பொருத்தம் காணப்படுவதற்கு இருப்பிடத்திலிருந்து 800 எழுத்துக்களுக்குள் இருக்க வேண்டும்.

##### எடுத்துக்காட்டு

```js
await browser.ocrClickOnText({
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

உரையில் எங்கே வடிவம் காணப்படும் என்று எதிர்பார்க்கப்படுகிறது என்பதை தோராயமாக தீர்மானிக்கிறது.

##### எடுத்துக்காட்டு

```js
await browser.ocrClickOnText({
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

பொருத்தும் அல்காரிதம் எந்த புள்ளியில் விட்டுவிடுகிறது. 0 என்ற தடை ஒரு பரிபூரண பொருத்தத்தை (எழுத்துக்கள் மற்றும் இருப்பிடம் இரண்டிலும்) தேவைப்படுத்துகிறது, 1.0 என்ற தடை எதையும் பொருத்தும்.

##### எடுத்துக்காட்டு

```js
await browser.ocrClickOnText({
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

தேடல் பெரிய எழுத்து மற்றும் சிறிய எழுத்து வேறுபாட்டை உணரும் வகையில் இருக்க வேண்டுமா.

##### எடுத்துக்காட்டு

```js
await browser.ocrClickOnText({
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
await browser.ocrClickOnText({
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

`true` என்றால், சரத்தில் ஒரு பரிபூரண பொருத்தம் ஏற்கனவே கண்டறியப்பட்டிருந்தாலும், பொருத்தும் செயல்பாடு தேடல் வடிவத்தின் முடிவு வரை தொடரும்.

##### எடுத்துக்காட்டு

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```