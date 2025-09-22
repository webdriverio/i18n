---
id: method-options
title: विधि विकल्प
---

विधि विकल्प वे विकल्प हैं जिन्हें प्रति [विधि](./methods) सेट किया जा सकता है। यदि विकल्प के पास वही कुंजी है जो प्लगइन के आरंभीकरण के दौरान सेट की गई है, तो यह विधि विकल्प प्लगइन विकल्प मान को ओवरराइड कर देगा।

:::info ध्यान दें

-   [सेव विकल्प](#save-options) से सभी विकल्पों का उपयोग [तुलना](#compare-check-options) विधियों के लिए किया जा सकता है
-   सभी तुलना विकल्पों का उपयोग सेवा की शुरुआत के दौरान __या__ हर एकल जांच विधि के लिए किया जा सकता है। यदि किसी विधि विकल्प के पास वही कुंजी है जो सेवा की शुरुआत के दौरान सेट की गई है, तो विधि तुलना विकल्प सेवा तुलना विकल्प मान को ओवरराइड कर देगा।
- सभी विकल्प निम्न एप्लिकेशन संदर्भों के लिए उपयोग किए जा सकते हैं जब तक कि अन्यथा न कहा गया हो:
    - वेब
    - हाइब्रिड ऐप
    - नेटिव ऐप
- नीचे दिए गए नमूने `save*`-विधियों के साथ हैं, लेकिन `check*`-विधियों के साथ भी उपयोग किए जा सकते हैं

:::

## सेव विकल्प

### `disableBlinkingCursor`

- **प्रकार:** `boolean`
- **अनिवार्य:** नहीं
- **डिफ़ॉल्ट:** `false`
- **के साथ उपयोग किया जाता है:** सभी [विधियां](./methods)
- **समर्थित एप्लिकेशन संदर्भ:** वेब, हाइब्रिड ऐप (वेबव्यू)

एप्लिकेशन में सभी `input`, `textarea`, `[contenteditable]` कैरेट "ब्लिंकिंग" को सक्षम/अक्षम करें। यदि `true` पर सेट किया जाता है, तो स्क्रीनशॉट लेने से पहले कैरेट को `transparent` पर सेट किया जाएगा और पूरा होने पर रीसेट कर दिया जाएगा।

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableBlinkingCursor: true
    }
)
```

### `disableCSSAnimation`

- **प्रकार:** `boolean`
- **अनिवार्य:** नहीं
- **डिफ़ॉल्ट:** `false`
- **के साथ उपयोग किया जाता है:** सभी [विधियां](./methods)
- **समर्थित एप्लिकेशन संदर्भ:** वेब, हाइब्रिड ऐप (वेबव्यू)

एप्लिकेशन में सभी CSS एनिमेशन को सक्षम/अक्षम करें। यदि `true` पर सेट किया जाता है, तो स्क्रीनशॉट लेने से पहले सभी एनिमेशन अक्षम कर दिए जाएंगे और पूरा होने पर रीसेट कर दिए जाएंगे।

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableCSSAnimation: true
    }
)
```

### `enableLegacyScreenshotMethod`

- **प्रकार:** `boolean`
- **अनिवार्य:** नहीं
- **डिफ़ॉल्ट:** `false`
- **के साथ उपयोग किया जाता है:** सभी [विधियां](./methods)
- **समर्थित एप्लिकेशन संदर्भ:** वेब, हाइब्रिड ऐप (वेबव्यू)

इस विकल्प का उपयोग W3C-WebDriver प्रोटोकॉल पर आधारित "पुराने" स्क्रीनशॉट विधि पर वापस स्विच करने के लिए करें। यह सहायक हो सकता है यदि आपके परीक्षण मौजूदा बेसलाइन छवियों पर निर्भर करते हैं या यदि आप ऐसे वातावरण में चल रहे हैं जो नए BiDi-आधारित स्क्रीनशॉट का पूरी तरह से समर्थन नहीं करते हैं।
ध्यान दें कि इसे सक्षम करने से स्क्रीनशॉट थोड़े अलग रेज़ोल्यूशन या गुणवत्ता के साथ उत्पन्न हो सकते हैं।

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLegacyScreenshotMethod: true
    }
)
```

### `enableLayoutTesting`

- **प्रकार:** `boolean`
- **अनिवार्य:** नहीं
- **डिफ़ॉल्ट:** `false`
- **के साथ उपयोग किया जाता है:** सभी [विधियां](./methods)
- **समर्थित एप्लिकेशन संदर्भ:** वेब, हाइब्रिड ऐप (वेबव्यू)

यह पेज पर सभी टेक्स्ट को छिपा देगा ताकि केवल लेआउट का उपयोग तुलना के लिए किया जाए। छिपाने का काम __प्रत्येक__ तत्व को `'color': 'transparent !important'` शैली जोड़कर किया जाएगा।

आउटपुट के लिए [टेस्ट आउटपुट](./test-output#enablelayouttesting) देखें।

:::info
इस ध्वज का उपयोग करके प्रत्येक तत्व जिसमें टेक्स्ट शामिल है (तो केवल `p, h1, h2, h3, h4, h5, h6, span, a, li` ही नहीं, बल्कि `div|button|..` भी) इस प्रॉपर्टी को प्राप्त करेगा। इसे अनुकूलित करने का __कोई__ विकल्प नहीं है।
:::

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLayoutTesting: true
    }
)
```

### `hideScrollBars`

- **प्रकार:** `boolean`
- **अनिवार्य:** नहीं
- **डिफ़ॉल्ट:** `true`
- **के साथ उपयोग किया जाता है:** सभी [विधियां](./methods)
- **समर्थित एप्लिकेशन संदर्भ:** वेब, हाइब्रिड ऐप (वेबव्यू)

एप्लिकेशन में स्क्रॉलबार को छिपाएं। यदि `true` पर सेट किया जाता है, तो स्क्रीनशॉट लेने से पहले सभी स्क्रॉलबार अक्षम कर दिए जाएंगे। यह डिफ़ॉल्ट रूप से `true` पर सेट है ताकि अतिरिक्त समस्याओं को रोका जा सके।

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideScrollBars: false
    }
)
```

### `hideElements`

- **प्रकार:** `array`
- **अनिवार्य:** नहीं
- **के साथ उपयोग किया जाता है:** सभी [विधियां](./methods)
- **समर्थित एप्लिकेशन संदर्भ:** वेब, हाइब्रिड ऐप (वेबव्यू)

यह विधि तत्वों की एक सरणी प्रदान करके उनमें `visibility: hidden` गुण जोड़कर 1 या अधिक तत्वों को छिपा सकती है।

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

### `removeElements`

- **प्रकार:** `array`
- **अनिवार्य:** नहीं
- **के साथ उपयोग किया जाता है:** सभी [विधियां](./methods)
- **समर्थित एप्लिकेशन संदर्भ:** वेब, हाइब्रिड ऐप (वेबव्यू)

यह विधि तत्वों की एक सरणी प्रदान करके उनमें `display: none` गुण जोड़कर 1 या अधिक तत्वों को _हटा_ सकती है।

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

### `resizeDimensions`

- **प्रकार:** `object`
- **अनिवार्य:** नहीं
- **डिफ़ॉल्ट:** `{ top: 0, right: 0, bottom: 0, left: 0}`
- **के साथ उपयोग किया जाता है:** केवल [`saveElement`](./methods#saveelement) या [`checkElement`](./methods#checkelement) के लिए
- **समर्थित एप्लिकेशन संदर्भ:** वेब, हाइब्रिड ऐप (वेबव्यू), नेटिव ऐप

एक ऑब्जेक्ट जिसमें `top`, `right`, `bottom` और `left` पिक्सेल की मात्रा होनी चाहिए जो तत्व कट-आउट को बड़ा बनाने की आवश्यकता है।

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

### `userBasedFullPageScreenshot`

- **प्रकार:** `boolean`
- **अनिवार्य:** नहीं
- **डिफ़ॉल्ट:** `false`
- **के साथ उपयोग किया जाता है:** केवल [`saveFullPageScreen`](./methods#savefullpagescreen), [`saveTabbablePage`](./methods#savetabbablepage), [`checkFullPageScreen`](./methods#checkfullpagescreen) या [`checkTabbablePage`](./methods#checktabbablepage) के लिए
- **समर्थित एप्लिकेशन संदर्भ:** वेब, हाइब्रिड ऐप (वेबव्यू)

जब `true` पर सेट किया जाता है, तो यह विकल्प पूर्ण-पृष्ठ स्क्रीनशॉट कैप्चर करने के लिए **स्क्रॉल-और-स्टिच रणनीति** को सक्षम करता है।
ब्राउज़र की मूल स्क्रीनशॉट क्षमताओं का उपयोग करने के बजाय, यह पृष्ठ के माध्यम से मैन्युअल रूप से स्क्रॉल करता है और कई स्क्रीनशॉट को एक साथ जोड़ता है।
यह विधि विशेष रूप से **लेजी-लोडेड सामग्री** वाले पृष्ठों या जटिल लेआउट के लिए उपयोगी है जिन्हें पूरी तरह से रेंडर करने के लिए स्क्रॉलिंग की आवश्यकता होती है।

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        userBasedFullPageScreenshot: true
    }
)
```

### `fullPageScrollTimeout`

- **प्रकार:** `number`
- **अनिवार्य:** नहीं
- **डिफ़ॉल्ट:** `1500`
- **के साथ उपयोग किया जाता है:** केवल [`saveFullPageScreen`](./methods#savefullpagescreen) या [`saveTabbablePage`](./methods#savetabbablepage) के लिए
- **समर्थित एप्लिकेशन संदर्भ:** वेब, हाइब्रिड ऐप (वेबव्यू)

स्क्रॉल के बाद प्रतीक्षा करने के लिए मिलीसेकंड में टाइमआउट। यह लेजी लोडिंग वाले पृष्ठों की पहचान करने में मदद कर सकता है।

> **नोट:** यह केवल तभी काम करता है जब `userBasedFullPageScreenshot` को `true` पर सेट किया गया हो

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        fullPageScrollTimeout: 3 * 1000
    }
)
```

### `hideAfterFirstScroll`

- **प्रकार:** `array`
- **अनिवार्य:** नहीं
- **के साथ उपयोग किया जाता है:** केवल [`saveFullPageScreen`](./methods#savefullpagescreen) या [`saveTabbablePage`](./methods#savetabbablepage) के लिए
- **समर्थित एप्लिकेशन संदर्भ:** वेब, हाइब्रिड ऐप (वेबव्यू)

यह विधि तत्वों की एक सरणी प्रदान करके उनमें `visibility: hidden` गुण जोड़कर एक या अधिक तत्वों को छिपा देगी।
यह तब उपयोगी होगा जब एक पृष्ठ, उदाहरण के लिए, स्टिकी तत्व रखता है जो पृष्ठ के स्क्रॉल होने पर पृष्ठ के साथ स्क्रॉल करेंगे लेकिन पूर्ण-पृष्ठ स्क्रीनशॉट बनाते समय परेशान करने वाला प्रभाव देंगे।

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

### `waitForFontsLoaded`

- **प्रकार:** `boolean`
- **अनिवार्य:** नहीं
- **डिफ़ॉल्ट:** `true`
- **के साथ उपयोग किया जाता है:** सभी [विधियां](./methods)
- **समर्थित एप्लिकेशन संदर्भ:** वेब, हाइब्रिड ऐप (वेबव्यू)

फॉन्ट, जिसमें तृतीय-पक्ष फॉन्ट शामिल हैं, सिंक्रोनस या असिंक्रोनस रूप से लोड किए जा सकते हैं। असिंक्रोनस लोडिंग का मतलब है कि फॉन्ट वेबड्राइवरआईओ द्वारा यह निर्धारित करने के बाद लोड हो सकते हैं कि पृष्ठ पूरी तरह से लोड हो गया है। फॉन्ट रेंडरिंग समस्याओं को रोकने के लिए, यह मॉड्यूल, डिफ़ॉल्ट रूप से, स्क्रीनशॉट लेने से पहले सभी फॉन्ट के लोड होने की प्रतीक्षा करेगा।

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        waitForFontsLoaded: true
    }
)
```

## तुलना (जांच) विकल्प

तुलना विकल्प वे विकल्प हैं जो [ResembleJS](https://github.com/Huddle/Resemble.js) द्वारा तुलना के निष्पादन के तरीके को प्रभावित करते हैं।

### `ignoreAlpha`

- **प्रकार:** `boolean`
- **डिफ़ॉल्ट:** `false`
- **अनिवार्य:** नहीं
- **के साथ उपयोग किया जाता है:** सभी [जांच विधियां](./methods#check-methods)
- **समर्थित एप्लिकेशन संदर्भ:** सभी

छवियों की तुलना करें और अल्फा को छोड़ दें।

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAlpha: true
    }
)
```

### `blockOutSideBar`

- **प्रकार:** `boolean`
- **डिफ़ॉल्ट:** `true`
- **अनिवार्य:** नहीं
- **के साथ उपयोग किया जाता है:** _केवल `checkScreen()` के साथ उपयोग किया जा सकता है। यह **केवल iPad** के लिए है_
- **समर्थित एप्लिकेशन संदर्भ:** सभी

तुलना के दौरान लैंडस्केप मोड में iPad के लिए साइडबार को स्वचालित रूप से ब्लॉक आउट करें। यह टैब/प्राइवेट/बुकमार्क नेटिव कंपोनेंट पर विफलताओं को रोकता है।

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutSideBar: true
    }
)
```

### `blockOutStatusBar`

- **प्रकार:** `boolean`
- **डिफ़ॉल्ट:** `true`
- **अनिवार्य:** नहीं
- **के साथ उपयोग किया जाता है:** _यह **केवल मोबाइल** के लिए है_
- **समर्थित एप्लिकेशन संदर्भ:** हाइब्रिड (नेटिव भाग) और नेटिव ऐप्स

तुलना के दौरान स्टेटस और एड्रेस बार को स्वचालित रूप से ब्लॉक आउट करें। यह समय, वाई-फाई या बैटरी स्थिति पर विफलताओं को रोकता है।

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutStatusBar: true
    }
)
```

### `blockOutToolBar`

- **प्रकार:** `boolean`
- **डिफ़ॉल्ट:** `true`
- **अनिवार्य:** नहीं
- **के साथ उपयोग किया जाता है:** _यह **केवल मोबाइल** के लिए है_
- **समर्थित एप्लिकेशन संदर्भ:** हाइब्रिड (नेटिव भाग) और नेटिव ऐप्स

स्वचालित रूप से टूलबार को ब्लॉक आउट करें।

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutToolBar: true
    }
)
```

### `ignoreAntialiasing`

- **प्रकार:** `boolean`
- **डिफ़ॉल्ट:** `false`
- **अनिवार्य:** नहीं
- **के साथ उपयोग किया जाता है:** सभी [जांच विधियां](./methods#check-methods)
- **समर्थित एप्लिकेशन संदर्भ:** सभी

छवियों की तुलना करें और एंटी-एलियासिंग को छोड़ दें।

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAntialiasing: true
    }
)
```

### `ignoreColors`

- **प्रकार:** `boolean`
- **डिफ़ॉल्ट:** `false`
- **अनिवार्य:** नहीं
- **के साथ उपयोग किया जाता है:** सभी [जांच विधियां](./methods#check-methods)
- **समर्थित एप्लिकेशन संदर्भ:** सभी

भले ही छवियां रंग में हों, तुलना 2 काले/सफेद छवियों की तुलना करेगी

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreColors: true
    }
)
```

### `ignoreLess`

- **प्रकार:** `boolean`
- **डिफ़ॉल्ट:** `false`
- **अनिवार्य:** नहीं
- **के साथ उपयोग किया जाता है:** सभी [जांच विधियां](./methods#check-methods)
- **समर्थित एप्लिकेशन संदर्भ:** सभी

छवियों की तुलना करें और `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240` के साथ तुलना करें

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreLess: true
    }
)
```

### `ignoreNothing`

- **प्रकार:** `boolean`
- **डिफ़ॉल्ट:** `false`
- **अनिवार्य:** नहीं
- **के साथ उपयोग किया जाता है:** सभी [जांच विधियां](./methods#check-methods)
- **समर्थित एप्लिकेशन संदर्भ:** सभी

छवियों की तुलना करें और `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255` के साथ तुलना करें

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreNothing: true
    }
)
```

### `rawMisMatchPercentage`

- **प्रकार:** `boolean`
- **डिफ़ॉल्ट:** `false`
- **अनिवार्य:** नहीं
- **के साथ उपयोग किया जाता है:** सभी [जांच विधियां](./methods#check-methods)
- **समर्थित एप्लिकेशन संदर्भ:** सभी

यदि सत्य है तो वापसी प्रतिशत `0.12345678` जैसा होगा, डिफ़ॉल्ट `0.12` है

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        rawMisMatchPercentage: true
    }
)
```

### `returnAllCompareData`

- **प्रकार:** `boolean`
- **डिफ़ॉल्ट:** `false`
- **अनिवार्य:** नहीं
- **के साथ उपयोग किया जाता है:** सभी [जांच विधियां](./methods#check-methods)
- **समर्थित एप्लिकेशन संदर्भ:** सभी

यह सभी तुलना डेटा वापस करेगा, न कि केवल बेमेल प्रतिशत, [कंसोल आउटपुट](./test-output#console-output-1) भी देखें

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        returnAllCompareData: true
    }
)
```

### `saveAboveTolerance`

- **प्रकार:** `number`
- **डिफ़ॉल्ट:** `0`
- **अनिवार्य:** नहीं
- **के साथ उपयोग किया जाता है:** सभी [जांच विधियां](./methods#check-methods)
- **समर्थित एप्लिकेशन संदर्भ:** सभी

`misMatchPercentage` का अनुमेय मान जो अंतर वाली छवियों को सहेजने से रोकता है

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        saveAboveTolerance: 0.25
    }
)
```

### `largeImageThreshold`

- **प्रकार:** `number`
- **डिफ़ॉल्ट:** `0`
- **अनिवार्य:** नहीं
- **के साथ उपयोग किया जाता है:** सभी [जांच विधियां](./methods#check-methods)
- **समर्थित एप्लिकेशन संदर्भ:** सभी

बड़ी छवियों की तुलना से प्रदर्शन में समस्याएँ हो सकती हैं।
जब यहां पिक्सेल की संख्या के लिए एक संख्या प्रदान की जाती है (0 से अधिक), तो तुलना एल्गोरिथ्म पिक्सेल को छोड़ देता है जब छवि की चौड़ाई या ऊँचाई `largeImageThreshold` पिक्सेल से अधिक होती है।

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        largeImageThreshold: 1500
    }
)
```

### `scaleImagesToSameSize`

- **प्रकार:** `boolean`
- **डिफ़ॉल्ट:** `false`
- **अनिवार्य:** नहीं
- **के साथ उपयोग किया जाता है:** सभी [जांच विधियां](./methods#check-methods)
- **समर्थित एप्लिकेशन संदर्भ:** सभी

तुलना के निष्पादन से पहले 2 छवियों को एक ही आकार में स्केल करता है। `ignoreAntialiasing` और `ignoreAlpha` को सक्षम करने की अत्यधिक अनुशंसा की जाती है

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        scaleImagesToSameSize: true
    }
)
```

### `ignore`

- **प्रकार:** `array`
- **अनिवार्य:** नहीं
- **के साथ उपयोग किया जाता है:** केवल `checkScreen`-विधि के साथ, `checkElement`-विधि के साथ **नहीं**
- **समर्थित एप्लिकेशन संदर्भ:** नेटिव ऐप

यह विधि तत्वों की एक सरणी या `x|y|width|height` की एक ऑब्जेक्ट के आधार पर स्क्रीन पर स्वचालित रूप से तत्वों या एक क्षेत्र को ब्लॉकआउट करेगी।

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

## फोल्डर विकल्प

बेसलाइन फोल्डर और स्क्रीनशॉट फोल्डर (वास्तविक, अंतर) विकल्प हैं जिन्हें प्लगइन या विधि के आरंभीकरण के दौरान सेट किया जा सकता है। किसी विशेष विधि पर फोल्डर विकल्प सेट करने के लिए, विधि विकल्प ऑब्जेक्ट में फोल्डर विकल्प पास करें। इसका उपयोग किया जा सकता है:

- वेब
- हाइब्रिड ऐप
- नेटिव ऐप

```ts
import path from 'node:path'

const methodOptions = {
    actualFolder: path.join(process.cwd(), 'customActual'),
    baselineFolder: path.join(process.cwd(), 'customBaseline'),
    diffFolder: path.join(process.cwd(), 'customDiff'),
}

// आप इसे सभी विधियों के लिए उपयोग कर सकते हैं
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

### `actualFolder`

- **प्रकार:** `string`
- **अनिवार्य:** नहीं
- **समर्थित एप्लिकेशन संदर्भ:** सभी

परीक्षण में कैप्चर किए गए स्नैपशॉट के लिए फोल्डर।

### `baselineFolder`

- **प्रकार:** `string`
- **अनिवार्य:** नहीं
- **समर्थित एप्लिकेशन संदर्भ:** सभी

बेसलाइन छवि के लिए फोल्डर जिसका उपयोग तुलना के लिए किया जा रहा है।

### `diffFolder`

- **प्रकार:** `string`
- **अनिवार्य:** नहीं
- **समर्थित एप्लिकेशन संदर्भ:** सभी

ResembleJS द्वारा रेंडर की गई छवि अंतर के लिए फोल्डर।