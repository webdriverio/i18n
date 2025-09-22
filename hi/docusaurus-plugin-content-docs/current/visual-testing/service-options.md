---
id: service-options
title: सेवा विकल्प
---

सेवा विकल्प वे विकल्प हैं जिन्हें सेवा की शुरुआत के समय सेट किया जा सकता है और प्रत्येक मेथड कॉल के लिए उपयोग किया जाएगा।

```js
// wdio.conf.(js|ts)
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // The options
            },
        ],
    ],
    // ...
};
```

## डिफॉल्ट विकल्प

### `addressBarShadowPadding`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** `6`
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब

iOS और Android पर एड्रेस बार में पैडिंग जोड़ने की आवश्यकता होती है ताकि व्यूपोर्ट का उचित कट आउट किया जा सके।

### `autoElementScroll`

-   **प्रकार:** `boolean`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** `true`
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब, हाइब्रिड ऐप (वेबव्यू)

यह विकल्प आपको स्वचालित रूप से तत्व को दृश्य में स्क्रॉल करने को अक्षम करने की अनुमति देता है जब एक तत्व का स्क्रीनशॉट बनाया जाता है।

### `addIOSBezelCorners`

-   **प्रकार:** `boolean`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** `false`
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब, हाइब्रिड ऐप (वेबव्यू), नेटिव ऐप

iOS डिवाइस के स्क्रीनशॉट के लिए बेज़ल कॉर्नर और नॉच/डायनेमिक आइलैंड जोड़ें।

:::info नोट
यह केवल तभी किया जा सकता है जब डिवाइस का नाम **स्वचालित रूप से** निर्धारित किया जा सकता है और सामान्यीकृत डिवाइस नामों की निम्नलिखित सूची से मेल खाता है। सामान्यीकरण इस मॉड्यूल द्वारा किया जाएगा।
**iPhone:**

-   iPhone X: `iphonex`
-   iPhone XS: `iphonexs`
-   iPhone XS Max: `iphonexsmax`
-   iPhone XR: `iphonexr`
-   iPhone 11: `iphone11`
-   iPhone 11 Pro: `iphone11pro`
-   iPhone 11 Pro Max: `iphone11promax`
-   iPhone 12: `iphone12`
-   iPhone 12 Mini: `iphone12mini`
-   iPhone 12 Pro: `iphone12pro`
-   iPhone 12 Pro Max: `iphone12promax`
-   iPhone 13: `iphone13`
-   iPhone 13 Mini: `iphone13mini`
-   iPhone 13 Pro: `iphone13pro`
-   iPhone 13 Pro Max: `iphone13promax`
-   iPhone 14: `iphone14`
-   iPhone 14 Plus: `iphone14plus`
-   iPhone 14 Pro: `iphone14pro`
-   iPhone 14 Pro Max: `iphone14promax`
    **iPads:**
-   iPad Mini 6th Generation: `ipadmini`
-   iPad Air 4th Generation: `ipadair`
-   iPad Air 5th Generation: `ipadair`
-   iPad Pro (11-inch) 1st Generation: `ipadpro11`
-   iPad Pro (11-inch) 2nd Generation: `ipadpro11`
-   iPad Pro (11-inch) 3rd Generation: `ipadpro11`
-   iPad Pro (12.9-inch) 3rd Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 4th Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 5th Generation: `ipadpro129`

:::

### `autoSaveBaseline`

-   **प्रकार:** `boolean`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** `true`
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब, हाइब्रिड ऐप (वेबव्यू), नेटिव ऐप

यदि तुलना के दौरान कोई बेसलाइन छवि नहीं मिली है तो छवि को स्वचालित रूप से बेसलाइन फोल्डर में कॉपी किया जाता है।

### `baselineFolder`

-   **प्रकार:** `string|()=> string`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** `.path/to/testfile/__snapshots__/`
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब, हाइब्रिड ऐप (वेबव्यू), नेटिव ऐप

वह डायरेक्टरी जिसमें सभी बेसलाइन छवियां होंगी जिनका उपयोग तुलना के दौरान किया जाता है। यदि सेट नहीं किया गया है, तो डिफॉल्ट मान का उपयोग किया जाएगा जो स्पेक के बगल में `__snapshots__/`-फोल्डर में फाइलों को स्टोर करेगा जो विजुअल टेस्ट को एग्जीक्यूट करता है। एक फंक्शन जो एक `string` रिटर्न करता है, का भी उपयोग `baselineFolder` मान सेट करने के लिए किया जा सकता है:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// OR
{
    baselineFolder: () => {
        // Do some magic here
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **प्रकार:** `boolean`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** `false`
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब, हाइब्रिड ऐप (वेबव्यू), नेटिव ऐप

इनिशियलाइजेशन पर रनटाइम फोल्डर (`actual` और `diff`) को डिलीट करें

:::info नोट
यह केवल तभी काम करेगा जब [`screenshotPath`](#screenshotpath) प्लगइन विकल्पों के माध्यम से सेट किया गया हो, और जब आप फोल्डर को मेथड्स में सेट करते हैं तो यह **काम नहीं करेगा**
:::

### `createJsonReportFiles` **(नया)**

-   **प्रकार:** `boolean`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** `false`

अब आपके पास तुलना परिणामों को JSON रिपोर्ट फाइल में निर्यात करने का विकल्प है। `createJsonReportFiles: true` विकल्प प्रदान करके, प्रत्येक छवि जिसकी तुलना की जाती है, उससे एक रिपोर्ट बनेगी जो `actual` फोल्डर में, प्रत्येक `actual` छवि परिणाम के बगल में संग्रहीत होगी। आउटपुट इस प्रकार दिखेगा:

```json
{
    "parent": "check methods",
    "test": "should fail comparing with a baseline",
    "tag": "examplePageFail",
    "instanceData": {
        "browser": {
            "name": "chrome-headless-shell",
            "version": "126.0.6478.183"
        },
        "platform": {
            "name": "mac",
            "version": "not-known"
        }
    },
    "commandName": "checkScreen",
    "boundingBoxes": {
        "diffBoundingBoxes": [
            {
                "left": 1088,
                "top": 717,
                "right": 1186,
                "bottom": 730
            }
            //....
        ],
        "ignoredBoxes": [
            {
                "left": 159,
                "top": 652,
                "right": 356,
                "bottom": 703
            }
            //...
        ]
    },
    "fileData": {
        "actualFilePath": "/Users/wdio/visual-testing/.tmp/actual/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "baselineFilePath": "/Users/wdio/visual-testing/localBaseline/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "diffFilePath": "/Users/wdio/visual-testing/.tmp/diff/desktop_chrome-headless-shell/examplePageFail-local-chrome-latest-1366x768png",
        "fileName": "examplePageFail-local-chrome-latest-1366x768.png",
        "size": {
            "actual": {
                "height": 768,
                "width": 1366
            },
            "baseline": {
                "height": 768,
                "width": 1366
            },
            "diff": {
                "height": 768,
                "width": 1366
            }
        }
    },
    "misMatchPercentage": "12.90",
    "rawMisMatchPercentage": 12.900729014153246
}
```

जब सभी परीक्षण निष्पादित हो जाते हैं, तो तुलनाओं के संग्रह के साथ एक नई JSON फाइल उत्पन्न की जाएगी और आपके `actual` फोल्डर के रूट में पाई जा सकती है। डेटा को इस प्रकार समूहीकृत किया गया है:

-   Jasmine/Mocha के लिए `describe` या CucumberJS के लिए `Feature`
-   Jasmine/Mocha के लिए `it` या CucumberJS के लिए `Scenario`
    और फिर इस क्रम में सॉर्ट किया गया:
-   `commandName`, जो छवियों की तुलना के लिए उपयोग किए गए तुलना विधि नाम हैं
-   `instanceData`, पहले ब्राउज़र, फिर डिवाइस, फिर प्लेटफॉर्म
    यह इस तरह दिखेगा

```json
[
    {
        "description": "check methods",
        "data": [
            {
                "test": "should fail comparing with a baseline",
                "data": [
                    {
                        "tag": "examplePageFail",
                        "instanceData": {},
                        "commandName": "checkScreen",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "14.34",
                        "rawMisMatchPercentage": 14.335403703025868
                    },
                    {
                        "tag": "exampleElementFail",
                        "instanceData": {},
                        "commandName": "checkElement",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "1.34",
                        "rawMisMatchPercentage": 1.335403703025868
                    }
                ]
            }
        ]
    }
]
```

रिपोर्ट डेटा आपको अपनी खुद की विजुअल रिपोर्ट बनाने का अवसर देगा बिना सभी जादू और डेटा संग्रह स्वयं करने की आवश्यकता के।

:::info नोट
आपको `@wdio/visual-testing` संस्करण `5.2.0` या उच्चतर का उपयोग करने की आवश्यकता है
:::

### `disableBlinkingCursor`

-   **प्रकार:** `boolean`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** `false`
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब, हाइब्रिड ऐप (वेबव्यू)

एप्लिकेशन में सभी `input`, `textarea`, `[contenteditable]` कैरेट "ब्लिंकिंग" को सक्षम/अक्षम करें। यदि `true` पर सेट है तो स्क्रीनशॉट लेने से पहले कैरेट को `transparent` पर सेट किया जाएगा और पूरा होने पर रीसेट किया जाएगा

### `disableCSSAnimation`

-   **प्रकार:** `boolean`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** `false`
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब, हाइब्रिड ऐप (वेबव्यू)

एप्लिकेशन में सभी CSS एनिमेशन को सक्षम/अक्षम करें। यदि `true` पर सेट है तो स्क्रीनशॉट लेने से पहले सभी एनिमेशन अक्षम कर दिए जाएंगे और पूरा होने पर रीसेट किए जाएंगे

### `enableLayoutTesting`

-   **प्रकार:** `boolean`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** `false`
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब

यह पेज पर सभी टेक्स्ट को छुपा देगा ताकि केवल लेआउट का उपयोग तुलना के लिए किया जाएगा। छिपाना `'color': 'transparent !important'` स्टाइल को **प्रत्येक** तत्व में जोड़कर किया जाएगा।

आउटपुट के लिए देखें [Test Output](/docs/visual-testing/test-output#enablelayouttesting)

:::info
इस फ्लैग का उपयोग करके प्रत्येक तत्व जिसमें टेक्स्ट होता है (यानी न केवल `p, h1, h2, h3, h4, h5, h6, span, a, li`, बल्कि `div|button|..` भी) को यह गुण प्राप्त होगा। इसे अनुकूलित करने का **कोई** विकल्प नहीं है।
:::

### `formatImageName`

-   **प्रकार:** `string`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब, हाइब्रिड ऐप (वेबव्यू), नेटिव ऐप

सहेजी गई छवियों का नाम इस तरह के स्ट्रिंग फॉर्मेट के साथ `formatImageName` पैरामीटर पास करके कस्टमाइज़ किया जा सकता है:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

निम्नलिखित वेरिएबल्स स्ट्रिंग को फॉर्मेट करने के लिए पास किए जा सकते हैं और स्वचालित रूप से इंस्टेंस क्षमताओं से पढ़े जाएंगे।
यदि वे निर्धारित नहीं किए जा सकते हैं तो डिफ़ॉल्ट का उपयोग किया जाएगा।

-   `browserName`: दी गई क्षमताओं में ब्राउज़र का नाम
-   `browserVersion`: क्षमताओं में प्रदान किए गए ब्राउज़र का वर्शन
-   `deviceName`: क्षमताओं से डिवाइस का नाम
-   `dpr`: डिवाइस पिक्सेल अनुपात
-   `height`: स्क्रीन की ऊंचाई
-   `logName`: क्षमताओं से logName
-   `mobile`: यह ऐप स्क्रीनशॉट को ब्राउज़र स्क्रीनशॉट से अलग करने के लिए `deviceName` के बाद `_app`, या ब्राउज़र नाम जोड़ देगा
-   `platformName`: दी गई क्षमताओं में प्लेटफॉर्म का नाम
-   `platformVersion`: क्षमताओं में प्रदान किए गए प्लेटफॉर्म का वर्शन
-   `tag`: वह टैग जो उस मेथड में प्रदान किया जाता है जिसे कॉल किया जा रहा है
-   `width`: स्क्रीन की चौड़ाई

:::info

आप `formatImageName` में कस्टम पाथ/फोल्डर प्रदान नहीं कर सकते। यदि आप पाथ बदलना चाहते हैं तो कृपया निम्न विकल्पों को बदलने की जांच करें:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- प्रति मेथड [`folderOptions`](/docs/visual-testing/method-options#folder-options)

:::

### `fullPageScrollTimeout`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** `1500`
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब

स्क्रॉल के बाद प्रतीक्षा करने के लिए मिलीसेकंड में टाइमआउट। यह आलसी लोडिंग वाले पृष्ठों की पहचान करने में मदद कर सकता है।

:::info

यह केवल तभी काम करेगा जब सेवा/विधि विकल्प `userBasedFullPageScreenshot` `true` पर सेट हो, [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot) भी देखें

:::

### `hideScrollBars`

-   **प्रकार:** `boolean`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** `true`
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब, हाइब्रिड ऐप (वेबव्यू)

एप्लिकेशन में स्क्रॉलबार छुपाएं। यदि true पर सेट है तो स्क्रीनशॉट लेने से पहले सभी स्क्रॉलबार अक्षम कर दिए जाएंगे। यह डिफॉल्ट `true` पर सेट है ताकि अतिरिक्त मुद्दों को रोका जा सके।

### `logLevel`

-   **प्रकार:** `string`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** `info`
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब, हाइब्रिड ऐप (वेबव्यू), नेटिव ऐप

अतिरिक्त लॉग जोड़ता है, विकल्प हैं `debug | info | warn | silent`

त्रुटियां हमेशा कंसोल पर लॉग की जाती हैं।

### `savePerInstance`

-   **प्रकार:** `boolean`
-   **डिफॉल्ट:** `false`
-   **अनिवार्य:** नहीं
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब, हाइब्रिड ऐप (वेबव्यू), नेटिव ऐप

छवियों को अलग फोल्डर में प्रति इंस्टेंस सहेजें, जैसे सभी Chrome स्क्रीनशॉट `desktop_chrome` जैसे Chrome फोल्डर में सहेजे जाएंगे।

### `screenshotPath`

-   **प्रकार:** `string | () => string`
-   **डिफॉल्ट:** `.tmp/`
-   **अनिवार्य:** नहीं
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब, हाइब्रिड ऐप (वेबव्यू), नेटिव ऐप

वह डायरेक्टरी जो सभी वास्तविक/अलग स्क्रीनशॉट रखेगी। यदि सेट नहीं किया गया है, तो डिफॉल्ट मान का उपयोग किया जाएगा। एक स्ट्रिंग रिटर्न करने वाले फंक्शन का भी उपयोग screenshotPath मान सेट करने के लिए किया जा सकता है:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// OR
{
    screenshotPath: () => {
        // Do some magic here
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** Android के लिए `6` और iOS के लिए `15` (डिफॉल्ट रूप से `6` और `9` स्वचालित रूप से नॉच वाले आईफोन या होम बार वाले आईपैड पर संभावित होम बार के लिए जोड़ा जाएगा)
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब

iOS और Android पर टूलबार बार में जिस पैडिंग को जोड़ने की आवश्यकता है ताकि व्यूपोर्ट का उचित कट आउट किया जा सके।

### `userBasedFullPageScreenshot`

-   **प्रकार:** `boolean`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** `false`
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब, हाइब्रिड ऐप (वेबव्यू) **visual-service@7.0.0 में शुरू किया गया**

डिफॉल्ट रूप से, डेस्कटॉप वेब पर फुल-पेज स्क्रीनशॉट WebDriver BiDi प्रोटोकॉल का उपयोग करके कैप्चर किए जाते हैं, जो स्क्रॉल किए बिना तेज़, स्थिर और सुसंगत स्क्रीनशॉट को सक्षम बनाता है।
जब userBasedFullPageScreenshot को true पर सेट किया जाता है, तो स्क्रीनशॉट प्रक्रिया एक वास्तविक उपयोगकर्ता का अनुकरण करती है: पेज के माध्यम से स्क्रॉल करना, व्यूपोर्ट-आकार के स्क्रीनशॉट कैप्चर करना, और उन्हें एक साथ जोड़ना। यह विधि आलसी-लोड की गई सामग्री या गतिशील रेंडरिंग वाले पेजों के लिए उपयोगी है जो स्क्रॉल पोजीशन पर निर्भर करती है।

इस विकल्प का उपयोग करें यदि आपका पेज स्क्रॉल करते समय सामग्री लोड करने पर निर्भर करता है या यदि आप पुराने स्क्रीनशॉट विधियों के व्यवहार को बनाए रखना चाहते हैं।

### `waitForFontsLoaded`

-   **प्रकार:** `boolean`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** `true`
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब, हाइब्रिड ऐप (वेबव्यू)

फ़ॉन्ट्स, जिनमें थर्ड-पार्टी फ़ॉन्ट्स भी शामिल हैं, सिंक्रोनस या असिंक्रोनस रूप से लोड किए जा सकते हैं। असिंक्रोनस लोडिंग का मतलब है कि फ़ॉन्ट्स WebdriverIO के यह निर्धारित करने के बाद लोड हो सकते हैं कि पेज पूरी तरह से लोड हो गया है। फ़ॉन्ट रेंडरिंग समस्याओं को रोकने के लिए, यह मॉड्यूल, डिफ़ॉल्ट रूप से, स्क्रीनशॉट लेने से पहले सभी फ़ॉन्ट्स के लोड होने तक प्रतीक्षा करेगा।

## Tabbable विकल्प

:::info नोट

यह मॉड्यूल उस तरीके को दर्शाने का भी समर्थन करता है जिससे उपयोगकर्ता वेबसाइट पर _tab_ करने के लिए अपना कीबोर्ड का उपयोग करेगा, टैब करने योग्य तत्व से टैब करने योग्य तत्व तक रेखाएं और बिंदु बनाकर।<br/>
कार्य [Viv Richards](https://github.com/vivrichards600) के ब्लॉग पोस्ट ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript) से प्रेरित है।<br/>
जिस तरह से टैब करने योग्य तत्वों का चयन किया जाता है वह मॉड्यूल [tabbable](https://github.com/davidtheclark/tabbable) पर आधारित है। यदि टैबिंग के संबंध में कोई समस्या है, तो कृपया [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) और विशेष रूप से [More details section](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details) देखें।

:::

### `tabbableOptions`

-   **प्रकार:** `object`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** सभी डिफॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) देखें
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब

वे विकल्प जिन्हें आप `{save|check}Tabbable`-मेथड्स का उपयोग करते हैं तो लाइनों और डॉट्स के लिए बदल सकते हैं। विकल्पों को नीचे समझाया गया है।

#### `tabbableOptions.circle`

-   **प्रकार:** `object`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** सभी डिफॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) देखें
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब

सर्कल बदलने के विकल्प।

##### `tabbableOptions.circle.backgroundColor`

-   **प्रकार:** `string`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** सभी डिफॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) देखें
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब

सर्कल का बैकग्राउंड कलर।

##### `tabbableOptions.circle.borderColor`

-   **प्रकार:** `string`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** सभी डिफॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) देखें
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब

सर्कल का बॉर्डर कलर।

##### `tabbableOptions.circle.borderWidth`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** सभी डिफॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) देखें
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब

सर्कल की बॉर्डर विड्थ।

##### `tabbableOptions.circle.fontColor`

-   **प्रकार:** `string`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** सभी डिफॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) देखें
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब

सर्कल में टेक्स्ट के फॉन्ट का कलर। यह केवल तभी दिखाया जाएगा जब [`showNumber`](./#tabbableoptionscircleshownumber) `true` पर सेट हो।

##### `tabbableOptions.circle.fontFamily`

-   **प्रकार:** `string`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** सभी डिफॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) देखें
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब

सर्कल में टेक्स्ट के फॉन्ट का परिवार। यह केवल तभी दिखाया जाएगा जब [`showNumber`](./#tabbableoptionscircleshownumber) `true` पर सेट हो।

सुनिश्चित करें कि वे फॉन्ट सेट करें जो ब्राउज़रों द्वारा समर्थित हैं।

##### `tabbableOptions.circle.fontSize`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** सभी डिफॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) देखें
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब

सर्कल में टेक्स्ट के फॉन्ट का आकार। यह केवल तभी दिखाया जाएगा जब [`showNumber`](./#tabbableoptionscircleshownumber) `true` पर सेट हो।

##### `tabbableOptions.circle.size`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** सभी डिफॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) देखें
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब

सर्कल का आकार।

##### `tabbableOptions.circle.showNumber`

-   **प्रकार:** `showNumber`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** सभी डिफॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) देखें
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब

सर्कल में टैब अनुक्रम संख्या दिखाएं।

#### `tabbableOptions.line`

-   **प्रकार:** `object`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** सभी डिफॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) देखें
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब

लाइन बदलने के विकल्प।

##### `tabbableOptions.line.color`

-   **प्रकार:** `string`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** सभी डिफॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) देखें
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब

लाइन का रंग।

##### `tabbableOptions.line.width`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** सभी डिफॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) देखें
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब

लाइन की चौड़ाई।

## तुलना विकल्प

### `compareOptions`

-   **प्रकार:** `object`
-   **अनिवार्य:** नहीं
-   **डिफॉल्ट:** सभी डिफॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) देखें
-   **समर्थित एप्लिकेशन कॉन्टेक्स्ट:** वेब, हाइब्रिड ऐप (वेबव्यू), नेटिव ऐप (अधिक जानकारी के लिए [Method Compare options](./method-options#compare-check-options) देखें)

तुलना विकल्पों को सेवा विकल्पों के रूप में भी सेट किया जा सकता है, वे [Method Compare options](/docs/visual-testing/method-options#compare-check-options) में वर्णित हैं