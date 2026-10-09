---
id: method-options
title: मेथड विकल्प
description: "विज़ुअल टेस्टिंग मेथड्स के लिए प्रति-मेथड save, compare और folder विकल्प सेट करें, जो सर्विस-स्तर के विकल्पों को ओवरराइड करते हैं।"
---

मेथड विकल्प वे विकल्प हैं जिन्हें प्रति [मेथड](./methods) सेट किया जा सकता है। यदि किसी विकल्प की key वही है जो प्लगइन के इंस्टेंशिएशन के दौरान सेट किए गए किसी विकल्प की है, तो यह मेथड विकल्प प्लगइन विकल्प के मान को ओवरराइड कर देगा।

:::info नोट

-   [Save Options](#save-options) के सभी विकल्पों का उपयोग [Compare](#compare-check-options) मेथड्स के लिए किया जा सकता है
-   सभी compare विकल्पों का उपयोग सर्विस इंस्टेंशिएशन के दौरान __या__ प्रत्येक check मेथड के लिए किया जा सकता है। यदि किसी मेथड विकल्प की key वही है जो सर्विस के इंस्टेंशिएशन के दौरान सेट किए गए किसी विकल्प की है, तो मेथड compare विकल्प सर्विस compare विकल्प के मान को ओवरराइड कर देगा।
- जब तक अन्यथा उल्लेख न किया गया हो, सभी विकल्पों का उपयोग नीचे दिए गए एप्लिकेशन संदर्भों के लिए किया जा सकता है:
    - Web
    - Hybrid App
    - Native App
- नीचे दिए गए उदाहरण `save*`-मेथड्स के साथ हैं, लेकिन इनका उपयोग `check*`-मेथड्स के साथ भी किया जा सकता है

:::

# Save Options

## डिस्प्ले और रेंडरिंग

---

### `hideScrollBars`

<Option type="boolean" default="true" required="No">

- **इसके साथ उपयोग:** सभी [मेथड्स](./methods)
- **समर्थित एप्लिकेशन संदर्भ:** Web, Hybrid App (Webview)

एप्लिकेशन में स्क्रॉलबार छिपाएँ। यदि true पर सेट किया गया है, तो स्क्रीनशॉट लेने से पहले सभी स्क्रॉलबार अक्षम कर दिए जाएँगे। अतिरिक्त समस्याओं से बचने के लिए यह डिफ़ॉल्ट रूप से `true` पर सेट है।

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideScrollBars: false
    }
)
```

</Option>
### `disableBlinkingCursor`

<Option type="boolean" default="false" required="No">

- **इसके साथ उपयोग:** सभी [मेथड्स](./methods)
- **समर्थित एप्लिकेशन संदर्भ:** Web, Hybrid App (Webview)

एप्लिकेशन में सभी `input`, `textarea`, `[contenteditable]` के कैरेट की "ब्लिंकिंग" को सक्षम/अक्षम करें। यदि `true` पर सेट किया गया है, तो स्क्रीनशॉट लेने से पहले कैरेट को `transparent` पर सेट कर दिया जाएगा
और काम पूरा होने पर रीसेट कर दिया जाएगा।

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableBlinkingCursor: true
    }
)
```

</Option>
### `disableCSSAnimation`

<Option type="boolean" default="false" required="No">

- **इसके साथ उपयोग:** सभी [मेथड्स](./methods)
- **समर्थित एप्लिकेशन संदर्भ:** Web, Hybrid App (Webview)

एप्लिकेशन में सभी CSS एनिमेशन को सक्षम/अक्षम करें। यदि `true` पर सेट किया गया है, तो स्क्रीनशॉट लेने से पहले सभी एनिमेशन अक्षम कर दिए जाएँगे
और काम पूरा होने पर रीसेट कर दिए जाएँगे

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableCSSAnimation: true
    }
)
```

</Option>
### `enableLayoutTesting`

<Option type="boolean" default="false" required="No">

- **इसके साथ उपयोग:** सभी [मेथड्स](./methods)
- **समर्थित एप्लिकेशन संदर्भ:** Web, Hybrid App (Webview)

यह पेज के सभी टेक्स्ट को छिपा देगा ताकि तुलना के लिए केवल लेआउट का उपयोग किया जाए। छिपाने का काम __प्रत्येक__ एलिमेंट में स्टाइल `'color': 'transparent !important'` जोड़कर किया जाएगा।

आउटपुट के लिए [Test Output](./test-output#enablelayouttesting) देखें।

:::info
इस फ़्लैग का उपयोग करने से टेक्स्ट वाले प्रत्येक एलिमेंट (केवल `p, h1, h2, h3, h4, h5, h6, span, a, li` ही नहीं, बल्कि `div|button|..` भी) को यह प्रॉपर्टी मिलेगी। इसे अनुकूलित करने का __कोई__ विकल्प नहीं है।
:::

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLayoutTesting: true
    }
)
```

</Option>
### `enableLegacyScreenshotMethod`

<Option type="boolean" default="false" required="No">

- **इसके साथ उपयोग:** सभी [मेथड्स](./methods)
- **समर्थित एप्लिकेशन संदर्भ:** Web, Hybrid App (Webview)

W3C-WebDriver प्रोटोकॉल पर आधारित "पुराने" स्क्रीनशॉट मेथड पर वापस जाने के लिए इस विकल्प का उपयोग करें। यह तब मददगार हो सकता है जब आपके टेस्ट मौजूदा बेसलाइन इमेज पर निर्भर हों या आप ऐसे वातावरण में चला रहे हों जो नए BiDi-आधारित स्क्रीनशॉट का पूरी तरह से समर्थन नहीं करते।
ध्यान दें कि इसे सक्षम करने से थोड़े अलग रिज़ॉल्यूशन या गुणवत्ता वाले स्क्रीनशॉट बन सकते हैं।

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLegacyScreenshotMethod: true
    }
)
```

</Option>
### `ignoreRegionPadding`

<Option type="number" default="1" required="No">

- **इसके साथ उपयोग:** सभी [मेथड्स](./methods)
- **समर्थित एप्लिकेशन संदर्भ:** Web, Hybrid App (Webview)

ignore क्षेत्रों के प्रत्येक तरफ़ डिवाइस पिक्सेल में जोड़ी गई पैडिंग, जिससे प्रत्येक क्षेत्र इस मान के 2× जितना चौड़ा और ऊँचा हो जाता है। यह उच्च-DPR डिस्प्ले पर या BiDi स्क्रीनशॉट प्रोटोकॉल के साथ दिखाई देने वाले 1 px सीमा अंतरों से बचने में मदद करता है। अक्षम करने के लिए `0` पर सेट करें।

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        ignoreRegionPadding: 0
    }
)
```

</Option>
### `waitForFontsLoaded`

<Option type="boolean" default="true" required="No">

- **इसके साथ उपयोग:** सभी [मेथड्स](./methods)
- **समर्थित एप्लिकेशन संदर्भ:** Web, Hybrid App (Webview)

फ़ॉन्ट, जिनमें थर्ड-पार्टी फ़ॉन्ट भी शामिल हैं, सिंक्रोनस या एसिंक्रोनस रूप से लोड किए जा सकते हैं। एसिंक्रोनस लोडिंग का अर्थ है कि WebdriverIO द्वारा यह निर्धारित करने के बाद कि पेज पूरी तरह से लोड हो गया है, फ़ॉन्ट लोड हो सकते हैं। फ़ॉन्ट रेंडरिंग समस्याओं से बचने के लिए, यह मॉड्यूल डिफ़ॉल्ट रूप से स्क्रीनशॉट लेने से पहले सभी फ़ॉन्ट के लोड होने की प्रतीक्षा करेगा।

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        waitForFontsLoaded: true
    }
)
```

</Option>
## एलिमेंट दृश्यता

---

### `hideElements`

<Option type="array" required="No">

- **इसके साथ उपयोग:** सभी [मेथड्स](./methods)
- **समर्थित एप्लिकेशन संदर्भ:** Web, Hybrid App (Webview)

यह मेथड एलिमेंट्स की एक array प्रदान करके, उनमें प्रॉपर्टी `visibility: hidden` जोड़कर 1 या अधिक एलिमेंट्स को छिपा सकता है।

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideElements: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

</Option>
### `removeElements`

<Option type="array" required="No">

- **इसके साथ उपयोग:** सभी [मेथड्स](./methods)
- **समर्थित एप्लिकेशन संदर्भ:** Web, Hybrid App (Webview)

यह मेथड एलिमेंट्स की एक array प्रदान करके, उनमें प्रॉपर्टी `display: none` जोड़कर 1 या अधिक एलिमेंट्स को _हटा_ सकता है।

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        removeElements: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

</Option>
## एलिमेंट-विशिष्ट

---

### `resizeDimensions`

<Option type="object" default={`{ top: 0, right: 0, bottom: 0, left: 0}`} required="No">

- **इसके साथ उपयोग:** केवल [`saveElement`](./methods#saveelement) या [`checkElement`](./methods#checkelement) के लिए
- **समर्थित एप्लिकेशन संदर्भ:** Web, Hybrid App (Webview), Native App

एक ऑब्जेक्ट जिसमें `top`, `right`, `bottom` और `left` पिक्सेल की मात्रा होनी चाहिए, जो एलिमेंट कटआउट को बड़ा बनाने के लिए आवश्यक है।

```typescript
await browser.saveElement(
    'sample-tag',
    {
        resizeDimensions: {
            top: 50,
            left: 100,
            right: 10,
            bottom: 90,
        },
    }
)
```

</Option>
### `biDiOrigin`

<Option type="'document' | 'viewport'" default="'document'" required="No">

- **इसके साथ उपयोग:** केवल [`saveElement`](./methods#saveelement) या [`checkElement`](./methods#checkelement) के लिए
- **समर्थित एप्लिकेशन संदर्भ:** Web, Hybrid App (Webview)

केवल-BiDi विकल्प जो नियंत्रित करता है कि WebDriver BiDi प्रोटोकॉल के माध्यम से एलिमेंट स्क्रीनशॉट कैप्चर करते समय किस कोऑर्डिनेट ओरिजिन का उपयोग किया जाता है।

- `'document'` _(डिफ़ॉल्ट)_: डॉक्यूमेंट लेआउट को रेंडर करता है। किसी भी एलिमेंट स्थिति के लिए काम करता है लेकिन composited layers (जैसे स्क्रॉलबार, fixed/sticky ओवरले, `will-change` एलिमेंट्स) को कैप्चर **नहीं** करता।
- `'viewport'`: composited फ़्रेम को पेंट किए गए रूप में कैप्चर करता है, जिसमें स्क्रॉलबार और ओवरले शामिल हैं। इसके लिए एलिमेंट का viewport में **पूरी तरह से दिखाई देना** आवश्यक है; जब एलिमेंट viewport से बाहर हो या उससे बड़ा हो, तो यह एक वर्णनात्मक त्रुटि देता है।

```typescript
await browser.saveElement(
    await $('#my-element'),
    'sample-tag',
    {
        biDiOrigin: 'viewport'
    }
)
```

</Option>
## फ़ुल-पेज विशिष्ट

---

### `userBasedFullPageScreenshot`

<Option type="boolean" default="false" required="No">

- **इसके साथ उपयोग:** केवल [`saveFullPageScreen`](./methods#savefullpagescreen), [`saveTabbablePage`](./methods#savetabbablepage), [`checkFullPageScreen`](./methods#checkfullpagescreen) या [`checkTabbablePage`](./methods#checktabbablepage) के लिए
- **समर्थित एप्लिकेशन संदर्भ:** Web, Hybrid App (Webview)

जब `true` पर सेट किया जाता है, तो यह विकल्प फ़ुल-पेज स्क्रीनशॉट कैप्चर करने के लिए **scroll-and-stitch रणनीति** को सक्षम करता है।
ब्राउज़र की नेटिव स्क्रीनशॉट क्षमताओं का उपयोग करने के बजाय, यह पेज को मैन्युअल रूप से स्क्रॉल करता है और कई स्क्रीनशॉट को एक साथ जोड़ता है।
यह मेथड विशेष रूप से **lazy-loaded कंटेंट** वाले पेजों या जटिल लेआउट के लिए उपयोगी है जिन्हें पूरी तरह से रेंडर होने के लिए स्क्रॉलिंग की आवश्यकता होती है।

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        userBasedFullPageScreenshot: true
    }
)
```

</Option>
### `fullPageScrollTimeout`

<Option type="number" default="1500" required="No">

- **इसके साथ उपयोग:** केवल [`saveFullPageScreen`](./methods#savefullpagescreen) या [`saveTabbablePage`](./methods#savetabbablepage) के लिए
- **समर्थित एप्लिकेशन संदर्भ:** Web, Hybrid App (Webview)

स्क्रॉल के बाद प्रतीक्षा करने के लिए मिलीसेकंड में टाइमआउट। यह lazy loading वाले पेजों की पहचान करने में मदद कर सकता है।

> **नोट:** यह केवल तभी काम करता है जब `userBasedFullPageScreenshot` को `true` पर सेट किया गया हो

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        fullPageScrollTimeout: 3 * 1000
    }
)
```

</Option>
### `hideAfterFirstScroll`

<Option type="array" required="No">

- **इसके साथ उपयोग:** केवल [`saveFullPageScreen`](./methods#savefullpagescreen) या [`saveTabbablePage`](./methods#savetabbablepage) के लिए
- **समर्थित एप्लिकेशन संदर्भ:** Web, Hybrid App (Webview)

यह मेथड एलिमेंट्स की एक array प्रदान करके, उनमें प्रॉपर्टी `visibility: hidden` जोड़कर एक या अधिक एलिमेंट्स को छिपा देगा।
यह तब उपयोगी होगा जब किसी पेज में उदाहरण के लिए sticky एलिमेंट्स हों जो पेज स्क्रॉल होने पर पेज के साथ स्क्रॉल होंगे, लेकिन फ़ुल-पेज स्क्रीनशॉट बनाते समय एक परेशान करने वाला प्रभाव देंगे

> **नोट:** यह केवल तभी काम करता है जब `userBasedFullPageScreenshot` को `true` पर सेट किया गया हो

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        hideAfterFirstScroll: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

# Compare (Check) Options

Compare विकल्प वे विकल्प हैं जो तुलना के निष्पादित होने के तरीके को प्रभावित करते हैं।

</Option>
## विज़ुअल संवेदनशीलता

---

:::info `ignore*` विकल्पों का संस्करण इतिहास
इन प्रीसेट्स का व्यवहार एक बार, एक ब्रेकिंग चेंज के रूप में बदला, जब तुलना इंजन ResembleJS (v9 और उससे नीचे) से Pixelmatch (v10 और ऊपर) पर स्विच हुआ। विवरण के लिए Compare Options पेज पर [संस्करण इतिहास तालिका](./compare-options#visual-sensitivity) देखें। v10.0.0 के बाद से कुछ भी नीचे संबंधित विकल्प पर "Since" नोट के साथ बताया गया है।
:::

**Last-wins क्रम:** जब एक से अधिक `ignore*` फ़्लैग एक साथ सक्षम होते हैं, तो केवल एक प्रीसेट लागू होता है, इस क्रम के अनुसार (बाद वाला जीतता है): `ignoreAlpha` → `ignoreAntialiasing` → `ignoreColors` → `ignoreLess` → `ignoreNothing`। `v10.1.0` से, एक चेतावनी लॉग की जाती है जिसमें बताया जाता है कि कौन सा प्रीसेट जीता।

### `ignoreColors`

<Option type="boolean" default="false" required="No">

- **इसके साथ उपयोग:** सभी [Check मेथड्स](./methods#check-methods)
- **समर्थित एप्लिकेशन संदर्भ:** सभी
- **Since:** `v10.1.0`: resemble luma weights (`0.3/0.59/0.11`) का उपयोग करके केवल-ब्राइटनेस तुलना।

hue/रंग के अंतरों को अनदेखा करते हुए केवल ब्राइटनेस की तुलना करता है (resemble luma weights `0.3/0.59/0.11`)। इसका उपयोग तब करें जब रंग स्वयं बदलने की उम्मीद हो लेकिन आप फिर भी लेआउट या ब्राइटनेस परिवर्तनों को पकड़ना चाहते हों।

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreColors: true
    }
)
```

</Option>
### `ignoreAlpha`

<Option type="boolean" default="false" required="No">

- **इसके साथ उपयोग:** सभी [Check मेथड्स](./methods#check-methods)
- **समर्थित एप्लिकेशन संदर्भ:** सभी
- **Since:** `v10.1.0`: अन्य `ignore*` फ़्लैग से स्वतंत्र रूप से अपना स्वयं का threshold/AA नियम लागू करता है।

इमेज की तुलना करें और alpha-चैनल अंतरों को त्याग दें। इसका उपयोग तब करें जब transparency/opacity रेंडरिंग अस्थिर हो लेकिन नीचे के पिक्सेल रंग मायने रखते हों।

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAlpha: true
    }
)
```

</Option>
### `ignoreAntialiasing`

<Option type="boolean" default="true" required="No">

- **इसके साथ उपयोग:** सभी [Check मेथड्स](./methods#check-methods)
- **समर्थित एप्लिकेशन संदर्भ:** सभी
- **Since:** `v10`: डिफ़ॉल्ट को `true` में बदला गया (v9 और उससे नीचे में `false` था)।

तुलना के दौरान anti-aliased पिक्सेल को माफ़ करता है। सख़्त तुलना के लिए `false` पर सेट करें, जहाँ anti-aliased पिक्सेल को मिसमैच के रूप में गिना जाना चाहिए। यह विज़ुअल-टेस्ट की अस्थिरता के सबसे सामान्य स्रोत को हल करता है: कुछ भी न बदलने के बावजूद मशीनों में टेक्स्ट/आकृति के किनारों का थोड़े अलग anti-aliasing के साथ रेंडर होना।

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAntialiasing: true
    }
)
```

</Option>
### `ignoreLess`

<Option type="boolean" default="false" required="No">

- **इसके साथ उपयोग:** सभी [Check मेथड्स](./methods#check-methods)
- **समर्थित एप्लिकेशन संदर्भ:** सभी
- **Since:** `v10.1.0`: अन्य `ignore*` फ़्लैग से स्वतंत्र रूप से अपना स्वयं का threshold/AA नियम लागू करता है।

एक शिथिल RGB सहनशीलता (YIQ स्पेस में प्रति चैनल ~16/255) का उपयोग करके इमेज की तुलना करें। Anti-aliasing को माफ़ नहीं किया जाता। anti-aliasing को माफ़ किए बिना रेंडरिंग नॉइज़ (compression artifacts, रंग राउंडिंग) पर थोड़ी छूट के लिए इसका उपयोग करें।

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreLess: true
    }
)
```

</Option>
### `ignoreNothing`

<Option type="boolean" default="false" required="No">

- **इसके साथ उपयोग:** सभी [Check मेथड्स](./methods#check-methods)
- **समर्थित एप्लिकेशन संदर्भ:** सभी
- **Since:** `v10.1.0`: अन्य `ignore*` फ़्लैग से स्वतंत्र रूप से अपना स्वयं का threshold/AA नियम लागू करता है।

शून्य सहनशीलता का उपयोग करें: कोई भी पिक्सेल अंतर, anti-aliasing सहित, मिसमैच के रूप में गिना जाता है। इसका उपयोग तब करें जब आपको पिक्सेल-परफ़ेक्ट प्रमाण चाहिए कि कुछ भी नहीं बदला है।

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreNothing: true
    }
)
```

</Option>
### `pixelmatch`

<Option type="object" default="undefined" required="No">

- **इसके साथ उपयोग:** सभी [Check मेथड्स](./methods#check-methods)
- **समर्थित एप्लिकेशन संदर्भ:** सभी
- **इसमें जोड़ा गया:** `v10.1.0`

किसी `ignore*` प्रीसेट के बजाय, सीधे [pixelmatch](https://github.com/mapbox/pixelmatch) सेटिंग्स (`threshold`, `includeAA`, `diffColor`, `aaColor`, `diffColorAlt`, `alpha`, `diffMask`, `checkerboard`) के साथ एकल `check*` कॉल के लिए compare मोड को ओवरराइड करता है। इसका उपयोग तब करें जब प्रीसेट किसी एक विशिष्ट टेस्ट के लिए बहुत मोटे हों, उदाहरण के लिए उसे अपने स्वयं के threshold मान की आवश्यकता हो, या ऐसे diff रंग की जो आपकी रिपोर्ट में वास्तव में अलग दिखे। पूर्ण फ़ील्ड संदर्भ और प्रत्येक फ़ील्ड क्या हल करता है, इसके लिए [Direct pixelmatch control](./compare-options#direct-pixelmatch-control) देखें।

इसे उसी कॉल के options ऑब्जेक्ट में `ignore*` विकल्पों के साथ नहीं जोड़ा जा सकता: ऐसा करने पर `CompareOptionsConflictError` थ्रो होता है। हालाँकि, यह `ignore*` प्रीसेट का उपयोग करने वाले सर्विस कॉन्फ़िग को ओवरराइड कर सकता है (या इसके विपरीत); जब कोई मेथड कॉल इस तरह से compare मोड को स्विच करता है तो एक चेतावनी लॉग की जाती है।

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        pixelmatch: { threshold: 0.05 }
    }
)
```

</Option>
### `scaleImagesToSameSize`

<Option type="boolean" default="false" required="No">

- **इसके साथ उपयोग:** सभी [Check मेथड्स](./methods#check-methods)
- **समर्थित एप्लिकेशन संदर्भ:** सभी

तुलना के निष्पादन से पहले 2 इमेज को समान आकार में स्केल करता है। `ignoreAntialiasing` और `ignoreAlpha` को सक्षम करने की अत्यधिक अनुशंसा की जाती है

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        scaleImagesToSameSize: true
    }
)
```

</Option>
## मोबाइल ब्लॉक-आउट

---

### `blockOutStatusBar`

<Option type="boolean" default="true" required="No">

- **इसके साथ उपयोग:** _यह **केवल मोबाइल** के लिए है_
- **समर्थित एप्लिकेशन संदर्भ:** Hybrid (नेटिव भाग) और Native Apps

तुलना के दौरान स्टेटस और एड्रेस बार को स्वचालित रूप से ब्लॉक आउट करें। यह समय, वाईफ़ाई या बैटरी स्टेटस के कारण होने वाली विफलताओं को रोकता है।

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutStatusBar: true
    }
)
```

</Option>
### `blockOutToolBar`

<Option type="boolean" default="true" required="No">

- **इसके साथ उपयोग:** _यह **केवल मोबाइल** के लिए है_
- **समर्थित एप्लिकेशन संदर्भ:** Hybrid (नेटिव भाग) और Native Apps

टूलबार को स्वचालित रूप से ब्लॉक आउट करें।

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutToolBar: true
    }
)
```

</Option>
### `blockOutSideBar`

<Option type="boolean" default="true" required="No">

- **इसके साथ उपयोग:** _केवल `checkScreen()` के लिए उपयोग किया जा सकता है। यह **केवल iPad** के लिए है_
- **समर्थित एप्लिकेशन संदर्भ:** सभी

तुलना के दौरान landscape मोड में iPads के लिए साइडबार को स्वचालित रूप से ब्लॉक आउट करें। यह tab/private/bookmark नेटिव कंपोनेंट के कारण होने वाली विफलताओं को रोकता है।

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutSideBar: true
    }
)
```

</Option>
## क्षेत्र प्रबंधन

---

### `blockOut`

<Option type="array" required="No">

- **इसके साथ उपयोग:** सभी [Check मेथड्स](./methods#check-methods)
- **समर्थित एप्लिकेशन संदर्भ:** सभी

तुलना से पहले ब्लॉक आउट करने के लिए आयताकार क्षेत्रों की एक array। प्रत्येक प्रविष्टि `x`, `y`, `width`, और `height` मानों (पिक्सेल में) वाला एक ऑब्जेक्ट होना चाहिए। diff की गणना से पहले ब्लॉक-आउट किए गए क्षेत्रों पर पेंट कर दिया जाता है, जिससे वे क्षेत्र मिसमैच प्रतिशत में योगदान नहीं करते।

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOut: [
            { x: 0, y: 0, width: 100, height: 50 },
            { x: 300, y: 200, width: 80, height: 80 },
        ]
    }
)
```

</Option>
### `ignore`

<Option type="array" required="No">

- **इसके साथ उपयोग:** केवल `checkScreen`-मेथड के साथ, `checkElement`-मेथड के साथ **नहीं**
- **समर्थित एप्लिकेशन संदर्भ:** Native App

यह मेथड एलिमेंट्स की एक array या `x|y|width|height` के ऑब्जेक्ट के आधार पर स्क्रीन पर एलिमेंट्स या किसी क्षेत्र को स्वचालित रूप से ब्लॉक आउट कर देगा।

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignore: [
            $('~element-1'),
            await $('~element-2'),
            {
                x: 150,
                y: 250,
                width: 100,
                height: 100,
            }
        ]
    }
)
```

</Option>
## परिणाम और रिपोर्टिंग

---

### `rawMisMatchPercentage`

<Option type="boolean" default="false" required="No">

- **इसके साथ उपयोग:** सभी [Check मेथड्स](./methods#check-methods)
- **समर्थित एप्लिकेशन संदर्भ:** सभी

यदि true है तो लौटाया गया प्रतिशत `0.12345678` जैसा होगा, डिफ़ॉल्ट `0.12` है

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        rawMisMatchPercentage: true
    }
)
```

</Option>
### `returnAllCompareData`

<Option type="boolean" default="false" required="No">

- **इसके साथ उपयोग:** सभी [Check मेथड्स](./methods#check-methods)
- **समर्थित एप्लिकेशन संदर्भ:** सभी

यह केवल मिसमैच प्रतिशत ही नहीं, बल्कि सभी compare डेटा लौटाएगा, [Console Output](./test-output#console-output-1) भी देखें

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        returnAllCompareData: true
    }
)
```

</Option>
### `saveAboveTolerance`

<Option type="number" default="0" required="No">

- **इसके साथ उपयोग:** सभी [Check मेथड्स](./methods#check-methods)
- **समर्थित एप्लिकेशन संदर्भ:** सभी

`misMatchPercentage` का अनुमेय मान जो अंतर वाली इमेज को सहेजने से रोकता है

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        saveAboveTolerance: 0.25
    }
)
```

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="No">

- **इसके साथ उपयोग:** सभी [Check मेथड्स](./methods#check-methods)
- **समर्थित एप्लिकेशन संदर्भ:** सभी

JSON रिपोर्ट में diff पिक्सेल को एक साथ समूहित करने के लिए उपयोग की जाने वाली पिक्सेल निकटता। उच्च मान अधिक पिक्सेल को कम bounding boxes में समूहित करते हैं; कम मान अधिक सटीक लेकिन अधिक संख्या में boxes बनाते हैं। केवल तभी प्रासंगिक है जब [`createJsonReportFiles`](/docs/visual-testing/service-options#createjsonreportfiles) सक्षम हो।

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        diffPixelBoundingBoxProximity: 10
    }
)
```

# Folder options

---

बेसलाइन फ़ोल्डर और स्क्रीनशॉट फ़ोल्डर (actual, diff) ऐसे विकल्प हैं जिन्हें प्लगइन या मेथड के इंस्टेंशिएशन के दौरान सेट किया जा सकता है। किसी विशेष मेथड पर फ़ोल्डर विकल्प सेट करने के लिए, मेथड के option ऑब्जेक्ट में फ़ोल्डर विकल्प पास करें। इसका उपयोग इनके लिए किया जा सकता है:

- Web
- Hybrid App
- Native App

```ts
import path from 'node:path'

const methodOptions = {
    actualFolder: path.join(process.cwd(), 'customActual'),
    baselineFolder: path.join(process.cwd(), 'customBaseline'),
    diffFolder: path.join(process.cwd(), 'customDiff'),
}

// आप इसका उपयोग सभी मेथड्स के लिए कर सकते हैं
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

</Option>
### `actualFolder`

<Option type="string" required="No" contexts="All">

टेस्ट में कैप्चर किए गए स्नैपशॉट के लिए फ़ोल्डर।

</Option>
### `baselineFolder`

<Option type="string" required="No" contexts="All">

उस बेसलाइन इमेज के लिए फ़ोल्डर जिसके विरुद्ध तुलना की जा रही है।

</Option>
### `diffFolder`

<Option type="string" required="No" contexts="All">

तुलना के दौरान रेंडर किए गए इमेज अंतर के लिए फ़ोल्डर।

</Option>