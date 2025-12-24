---
id: service-options
title: सेवा विकल्प
---

सेवा विकल्प वे विकल्प हैं जो तब सेट किए जा सकते हैं जब सेवा को प्रारंभ किया जाता है और प्रत्येक विधि कॉल के लिए उपयोग किया जाएगा।

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

## डिफ़ॉल्ट विकल्प

### `addressBarShadowPadding`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** `6`
-   **Supported Application Contexts:** Web

पैडिंग को iOS और Android पर एड्रेस बार में जोड़ा जाना चाहिए ताकि व्यूपोर्ट का उचित कटआउट किया जा सके।

### `autoElementScroll`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Supported Application Contexts:** Web, Hybrid App (Webview)

यह विकल्प आपको स्वचालित तत्व स्क्रॉलिंग को अक्षम करने की अनुमति देता है जब एक तत्व स्क्रीनशॉट बनाया जाता है।

### `addIOSBezelCorners`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

iOS उपकरणों के लिए स्क्रीनशॉट में बेज़ल कोने और नॉच/डायनामिक आइलैंड जोड़ें।

:::info नोट
यह केवल तभी किया जा सकता है जब डिवाइस का नाम **स्वचालित रूप से** निर्धारित किया जा सकता है और नॉर्मलाइज़्ड डिवाइस नामों की निम्नलिखित सूची से मेल खाता है। नॉर्मलाइज़िंग इस मॉड्यूल द्वारा किया जाएगा।
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

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

यदि तुलना के दौरान कोई बेसलाइन छवि नहीं मिलती है तो छवि स्वचालित रूप से बेसलाइन फ़ोल्डर में कॉपी कर दी जाती है।

### `alwaysSaveActualImage`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Supported Application Contexts:** All

इस विकल्प को `false` पर सेट करने पर यह:

- वास्तविक छवि को सहेज नहीं करेगा जब कोई अंतर **नहीं** होता
- जब `createJsonReportFiles` `true` पर सेट किया जाता है, तो jsonreport फ़ाइल को स्टोर नहीं करेगा। यह लॉग्स में यह चेतावनी भी दिखाएगा कि `createJsonReportFiles` अक्षम है

इससे बेहतर प्रदर्शन होना चाहिए क्योंकि सिस्टम में कोई फ़ाइल नहीं लिखी जाती है और यह सुनिश्चित करना चाहिए कि `actual` फ़ोल्डर में बहुत अधिक शोर न हो।

### `baselineFolder`

-   **Type:** `string|()=> string`
-   **Mandatory:** No
-   **Default:** `.path/to/testfile/__snapshots__/`
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

वह डायरेक्टरी जिसमें तुलना के दौरान उपयोग की जाने वाली सभी बेसलाइन छवियां होंगी। यदि सेट नहीं किया गया है, तो डिफ़ॉल्ट मान का उपयोग किया जाएगा जो फ़ाइल्स को स्पेक के बगल में `__snapshots__/`-फ़ोल्डर में स्टोर करेगा जो विज़ुअल टेस्ट को निष्पादित करता है। `baselineFolder` मान को सेट करने के लिए एक फ़ंक्शन जो `string` रिटर्न करता है का भी उपयोग किया जा सकता है:

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

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

इनिशियलाइजेशन पर रनटाइम फ़ोल्डर (`actual` और `diff`) हटाएँ

:::info नोट
यह केवल तभी काम करेगा जब प्लगइन विकल्पों के माध्यम से [`screenshotPath`](#screenshotpath) सेट किया गया हो, और **काम नहीं करेगा** जब आप मेथड्स में फ़ोल्डर सेट करते हैं
:::

### `createJsonReportFiles` **(नया)**

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`

अब आपके पास तुलना परिणामों को JSON रिपोर्ट फ़ाइल में निर्यात करने का विकल्प है। `createJsonReportFiles: true` विकल्प प्रदान करके, प्रत्येक छवि जिसकी तुलना की जाती है, एक रिपोर्ट बनाएगी जो प्रत्येक `actual` छवि परिणाम के बगल में `actual` फ़ोल्डर में संग्रहित होगी। आउटपुट इस तरह दिखेगा:

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

जब सभी परीक्षण निष्पादित हो जाते हैं, तो तुलनाओं के संग्रह के साथ एक नई JSON फ़ाइल जनरेट की जाएगी और इसे आपके `actual` फ़ोल्डर के रूट में देखा जा सकता है। डेटा निम्न द्वारा समूहीकृत है:

-   Jasmine/Mocha के लिए `describe` या CucumberJS के लिए `Feature`
-   Jasmine/Mocha के लिए `it` या CucumberJS के लिए `Scenario`
    और फिर निम्नानुसार सॉर्ट किया गया:
-   `commandName`, जो छवियों की तुलना करने के लिए उपयोग किए गए तुलना विधि नाम हैं
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

रिपोर्ट डेटा आपको सभी जादू और डेटा संग्रह को स्वयं किए बिना अपनी खुद की विज़ुअल रिपोर्ट बनाने का अवसर देगा।

:::info नोट
आपको `@wdio/visual-testing` संस्करण `5.2.0` या उच्चतर का उपयोग करने की आवश्यकता है
:::

### `disableBlinkingCursor`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported Application Contexts:** Web, Hybrid App (Webview)

एप्लिकेशन में सभी `input`, `textarea`, `[contenteditable]` कैरेट "ब्लिंकिंग" सक्षम/अक्षम करें। यदि `true` पर सेट किया गया है, तो स्क्रीनशॉट लेने से पहले कैरेट को `transparent` पर सेट किया जाएगा और होने पर रीसेट किया जाएगा

### `disableCSSAnimation`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported Application Contexts:** Web, Hybrid App (Webview)

एप्लिकेशन में सभी CSS एनिमेशन सक्षम/अक्षम करें। यदि `true` पर सेट किया गया है, तो स्क्रीनशॉट लेने से पहले सभी एनिमेशन अक्षम कर दिए जाएंगे और होने पर रीसेट किया जाएगा

### `enableLayoutTesting`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported Application Contexts:** Web

यह पेज पर सभी टेक्स्ट को छिपा देगा ताकि तुलना के लिए केवल लेआउट का उपयोग किया जाए। छिपाने का कार्य **प्रत्येक** एलिमेंट में स्टाइल `'color': 'transparent !important'` जोड़कर किया जाएगा।

आउटपुट के लिए [टेस्ट आउटपुट](/docs/visual-testing/test-output#enablelayouttesting) देखें

:::info
इस फ्लैग का उपयोग करके प्रत्येक एलिमेंट जिसमें टेक्स्ट होता है (इसलिए न केवल `p, h1, h2, h3, h4, h5, h6, span, a, li`, बल्कि `div|button|..`) को यह प्रॉपर्टी मिलेगी। इसे अनुकूलित करने का कोई विकल्प **नहीं** है।
:::

### `formatImageName`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

सहेजी गई छवियों के नाम को इस तरह के फॉर्मेट स्ट्रिंग के साथ `formatImageName` पैरामीटर पास करके अनुकूलित किया जा सकता है:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

स्ट्रिंग को फॉर्मेट करने के लिए निम्नलिखित वेरिएबल्स पास किए जा सकते हैं और स्वचालित रूप से इंस्टेंस कैपेबिलिटीज से पढ़े जाएंगे।
यदि उन्हें निर्धारित नहीं किया जा सकता है, तो डिफ़ॉल्ट का उपयोग किया जाएगा।

-   `browserName`: प्रदान की गई क्षमताओं में ब्राउज़र का नाम
-   `browserVersion`: क्षमताओं में प्रदान किया गया ब्राउज़र का संस्करण
-   `deviceName`: क्षमताओं से डिवाइस का नाम
-   `dpr`: डिवाइस पिक्सेल अनुपात
-   `height`: स्क्रीन की ऊंचाई
-   `logName`: क्षमताओं से logName
-   `mobile`: यह ब्राउज़र स्क्रीनशॉट से ऐप स्क्रीनशॉट को अलग करने के लिए `deviceName` के बाद `_app`, या ब्राउज़र नाम जोड़ेगा
-   `platformName`: प्रदान की गई क्षमताओं में प्लेटफ़ॉर्म का नाम
-   `platformVersion`: क्षमताओं में प्रदान किया गया प्लेटफ़ॉर्म का संस्करण
-   `tag`: टैग जो उन मेथड्स में प्रदान किया जाता है जिन्हें कॉल किया जा रहा है
-   `width`: स्क्रीन की चौड़ाई

:::info

आप `formatImageName` में कस्टम पाथ/फ़ोल्डर प्रदान नहीं कर सकते। यदि आप पाथ बदलना चाहते हैं तो कृपया निम्न विकल्पों को बदलने की जांच करें:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- प्रति मेथड [`folderOptions`](/docs/visual-testing/method-options#folder-options)

:::

### `fullPageScrollTimeout`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** `1500`
-   **Supported Application Contexts:** Web

स्क्रॉल के बाद प्रतीक्षा करने के लिए मिलीसेकंड में टाइमआउट। यह आलसी लोडिंग वाले पृष्ठों की पहचान करने में मदद कर सकता है।

:::info

यह केवल तभी काम करेगा जब सर्विस/मेथड विकल्प `userBasedFullPageScreenshot` को `true` पर सेट किया गया हो, [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot) भी देखें

:::

### `hideScrollBars`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Supported Application Contexts:** Web, Hybrid App (Webview)

एप्लिकेशन में स्क्रॉलबार छिपाएं। यदि true पर सेट किया गया है, तो स्क्रीनशॉट लेने से पहले सभी स्क्रॉलबार अक्षम कर दिए जाएंगे। यह अतिरिक्त समस्याओं को रोकने के लिए डिफ़ॉल्ट `true` पर सेट है।

### `logLevel`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** `info`
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

अतिरिक्त लॉग जोड़ता है, विकल्प हैं `debug | info | warn | silent`

त्रुटियां हमेशा कंसोल में लॉग की जाती हैं।

### `savePerInstance`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

इंस्टेंस के अनुसार छवियों को एक अलग फ़ोल्डर में सहेजें, उदाहरण के लिए सभी Chrome स्क्रीनशॉट एक Chrome फ़ोल्डर जैसे `desktop_chrome` में सहेजे जाएंगे।

### `screenshotPath`

-   **Type:** `string | () => string`
-   **Default:** `.tmp/`
-   **Mandatory:** no
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

वह डायरेक्टरी जिसमें सभी वास्तविक/अलग स्क्रीनशॉट होंगे। यदि सेट नहीं किया गया है, तो डिफ़ॉल्ट मान का उपयोग किया जाएगा। screenshotPath मान सेट करने के लिए एक स्ट्रिंग रिटर्न करने वाले फंक्शन का भी उपयोग किया जा सकता है:

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

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** Android के लिए `6` और iOS के लिए `15` (डिफॉल्ट रूप से `6` और नॉच या होम बार वाले iPads वाले iPhones पर संभावित होम बार के लिए `9` स्वचालित रूप से जोड़ा जाएगा)
-   **Supported Application Contexts:** Web

पैडिंग जिसे iOS और Android पर टूलबार बार में जोड़ने की आवश्यकता होती है ताकि व्यूपोर्ट का उचित कटआउट किया जा सके।

### `userBasedFullPageScreenshot`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported Application Contexts:** Web, Hybrid App (Webview) **visual-service@7.0.0 में प्रस्तुत किया गया**

डिफ़ॉल्ट रूप से, डेस्कटॉप वेब पर पूर्ण-पेज स्क्रीनशॉट WebDriver BiDi प्रोटोकॉल का उपयोग करके कैप्चर किए जाते हैं, जो तेज़, स्थिर, और स्क्रॉलिंग के बिना स्थिर स्क्रीनशॉट को सक्षम करता है।
जब userBasedFullPageScreenshot को true पर सेट किया जाता है, तो स्क्रीनशॉट प्रक्रिया एक वास्तविक उपयोगकर्ता का अनुकरण करती है: पेज के माध्यम से स्क्रॉल करना, व्यूपोर्ट-आकार के स्क्रीनशॉट कैप्चर करना, और उन्हें एक साथ जोड़ना। यह विधि उन पेजों के लिए उपयोगी है जिनमें आलसी लोड की गई सामग्री या स्क्रॉल स्थिति पर निर्भर डायनामिक रेंडरिंग होती है।

इस विकल्प का उपयोग करें यदि आपका पेज स्क्रॉलिंग के दौरान लोड होने वाली सामग्री पर निर्भर करता है या यदि आप पुराने स्क्रीनशॉट विधियों के व्यवहार को बनाए रखना चाहते हैं।

### `waitForFontsLoaded`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Supported Application Contexts:** Web, Hybrid App (Webview)

फ़ॉन्ट्स, जिनमें थर्ड-पार्टी फ़ॉन्ट्स भी शामिल हैं, को सिंक्रोनस या एसिंक्रोनस रूप से लोड किया जा सकता है। एसिंक्रोनस लोडिंग का मतलब है कि फ़ॉन्ट्स तब लोड हो सकते हैं जब WebdriverIO यह निर्धारित करता है कि एक पेज पूरी तरह से लोड हो गया है। फ़ॉन्ट रेंडरिंग समस्याओं को रोकने के लिए, यह मॉड्यूल, डिफ़ॉल्ट रूप से, स्क्रीनशॉट लेने से पहले सभी फ़ॉन्ट्स के लोड होने तक प्रतीक्षा करेगा।

## Tabbable विकल्प

:::info नोट

यह मॉड्यूल उस तरीके को भी दर्शाता है जिस तरह से एक उपयोगकर्ता अपने कीबोर्ड का उपयोग करके वेबसाइट को _tab_ करेगा, टैब करने योग्य तत्व से टैब करने योग्य तत्व तक रेखाएँ और बिंदु खींचकर।<br/>
यह कार्य [Viv Richards](https://github.com/vivrichards600) के ब्लॉग पोस्ट ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript) से प्रेरित है।<br/>
टैब करने योग्य तत्वों का चयन करने का तरीका [tabbable](https://github.com/davidtheclark/tabbable) मॉड्यूल पर आधारित है। यदि टैबिंग के संबंध में कोई समस्या है, तो कृपया [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) और विशेष रूप से [More details section](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details) की जांच करें।

:::

### `tabbableOptions`

-   **Type:** `object`
-   **Mandatory:** No
-   **Default:** सभी डिफ़ॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) देखें
-   **Supported Application Contexts:** Web

विकल्प जिन्हें लाइनों और बिंदुओं के लिए बदला जा सकता है यदि आप `{save|check}Tabbable`-मेथड्स का उपयोग करते हैं। विकल्प नीचे समझाए गए हैं।

#### `tabbableOptions.circle`

-   **Type:** `object`
-   **Mandatory:** No
-   **Default:** सभी डिफ़ॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) देखें
-   **Supported Application Contexts:** Web

सर्कल को बदलने के विकल्प।

##### `tabbableOptions.circle.backgroundColor`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** सभी डिफ़ॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) देखें
-   **Supported Application Contexts:** Web

सर्कल का बैकग्राउंड कलर।

##### `tabbableOptions.circle.borderColor`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** सभी डिफ़ॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) देखें
-   **Supported Application Contexts:** Web

सर्कल का बॉर्डर कलर।

##### `tabbableOptions.circle.borderWidth`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** सभी डिफ़ॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) देखें
-   **Supported Application Contexts:** Web

सर्कल का बॉर्डर विड्थ।

##### `tabbableOptions.circle.fontColor`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** सभी डिफ़ॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) देखें
-   **Supported Application Contexts:** Web

सर्कल में टेक्स्ट के फॉन्ट का कलर। यह केवल तभी दिखाया जाएगा जब [`showNumber`](./#tabbableoptionscircleshownumber) को `true` पर सेट किया गया हो।

##### `tabbableOptions.circle.fontFamily`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** सभी डिफ़ॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) देखें
-   **Supported Application Contexts:** Web

सर्कल में टेक्स्ट के फॉन्ट का फैमिली। यह केवल तभी दिखाया जाएगा जब [`showNumber`](./#tabbableoptionscircleshownumber) को `true` पर सेट किया गया हो।

सुनिश्चित करें कि ब्राउज़रों द्वारा समर्थित फॉन्ट सेट करें।

##### `tabbableOptions.circle.fontSize`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** सभी डिफ़ॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) देखें
-   **Supported Application Contexts:** Web

सर्कल में टेक्स्ट के फॉन्ट का साइज़। यह केवल तभी दिखाया जाएगा जब [`showNumber`](./#tabbableoptionscircleshownumber) को `true` पर सेट किया गया हो।

##### `tabbableOptions.circle.size`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** सभी डिफ़ॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) देखें
-   **Supported Application Contexts:** Web

सर्कल का साइज़।

##### `tabbableOptions.circle.showNumber`

-   **Type:** `showNumber`
-   **Mandatory:** No
-   **Default:** सभी डिफ़ॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) देखें
-   **Supported Application Contexts:** Web

सर्कल में टैब क्रम संख्या दिखाएं।

#### `tabbableOptions.line`

-   **Type:** `object`
-   **Mandatory:** No
-   **Default:** सभी डिफ़ॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) देखें
-   **Supported Application Contexts:** Web

लाइन को बदलने के विकल्प।

##### `tabbableOptions.line.color`

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** सभी डिफ़ॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) देखें
-   **Supported Application Contexts:** Web

लाइन का कलर।

##### `tabbableOptions.line.width`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** सभी डिफ़ॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) देखें
-   **Supported Application Contexts:** Web

लाइन की विड्थ।

## तुलना विकल्प

### `compareOptions`

-   **Type:** `object`
-   **Mandatory:** No
-   **Default:** सभी डिफ़ॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) देखें
-   **Supported Application Contexts:** Web, Hybrid App (Webview), Native App (अधिक जानकारी के लिए [मेथड तुलना विकल्प](./method-options#compare-check-options) देखें)

तुलना विकल्पों को सर्विस विकल्प के रूप में भी सेट किया जा सकता है, उन्हें [मेथड तुलना विकल्प](/docs/visual-testing/method-options#compare-check-options) में वर्णित किया गया है