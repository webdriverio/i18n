---
id: service-options
title: सर्विस विकल्प
description: "विज़ुअल सर्विस के लिए डिफ़ॉल्ट विकल्प कॉन्फ़िगर करें, जिनमें स्क्रीनशॉट कैप्चर, फ़ुल-पेज स्क्रीनशॉट, बेसलाइन, फ़ोल्डर और रिपोर्टिंग शामिल हैं।"
---

सर्विस विकल्प वे विकल्प हैं जिन्हें सर्विस के इंस्टेंशिएट होते समय सेट किया जा सकता है। ये हर मेथड कॉल में इस्तेमाल होंगे।

```js
// wdio.conf.(js|ts)
export const config = {
    // ...
    // =====
    // सेटअप
    // =====
    services: [
        [
            "visual",
            {
                // विकल्प
            },
        ],
    ],
    // ...
};
```

# डिफ़ॉल्ट विकल्प

## स्क्रीनशॉट कैप्चर

---

### `hideScrollBars`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

एप्लिकेशन में स्क्रॉलबार छिपाएँ। `true` पर सेट करने पर स्क्रीनशॉट लेने से पहले सभी स्क्रॉलबार डिसेबल कर दिए जाएँगे। अतिरिक्त समस्याओं से बचने के लिए इसका डिफ़ॉल्ट मान `true` है।

</Option>
### `disableBlinkingCursor`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview)">

एप्लिकेशन में सभी `input`, `textarea`, `[contenteditable]` के कैरेट की "ब्लिंकिंग" को एनेबल/डिसेबल करें। `true` पर सेट करने पर स्क्रीनशॉट लेने से पहले कैरेट को `transparent` कर दिया जाएगा
और काम पूरा होने पर पहले जैसा कर दिया जाएगा।

</Option>
### `disableCSSAnimation`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview)">

एप्लिकेशन में सभी CSS एनिमेशन को एनेबल/डिसेबल करें। `true` पर सेट करने पर स्क्रीनशॉट लेने से पहले सभी एनिमेशन डिसेबल कर दिए जाएँगे
और काम पूरा होने पर पहले जैसा कर दिए जाएँगे।

</Option>
### `enableLayoutTesting`

<Option type="boolean" default="false" required="No" contexts="Web">

यह पेज का सारा टेक्स्ट छिपा देगा, ताकि तुलना के लिए केवल लेआउट का उपयोग हो। टेक्स्ट छिपाने के लिए **हर** एलिमेंट में स्टाइल `'color': 'transparent !important'` जोड़ी जाती है।

आउटपुट के लिए [Test Output](/docs/visual-testing/test-output#enablelayouttesting) देखें।

:::info
इस फ़्लैग का उपयोग करने पर टेक्स्ट वाले हर एलिमेंट को यह प्रॉपर्टी मिलेगी। इसमें केवल `p, h1, h2, h3, h4, h5, h6, span, a, li` ही नहीं, बल्कि `div|button|..` भी शामिल हैं। इसे अपने हिसाब से बदलने का **कोई** विकल्प नहीं है।
:::

</Option>
### `ignoreRegionPadding`

<Option type="number" default="1" required="No" contexts="Web, Hybrid App (Webview)">

इग्नोर रीजन की हर तरफ़ जोड़ी जाने वाली पैडिंग, डिवाइस पिक्सेल में। इससे हर रीजन की चौड़ाई और ऊँचाई इस मान के 2× जितनी बढ़ जाती है। यह उन 1 px सीमा अंतरों से बचाता है जो हाई-DPR डिस्प्ले पर या BiDi स्क्रीनशॉट प्रोटोकॉल के साथ दिख सकते हैं। इसे डिसेबल करने के लिए `0` सेट करें।

</Option>
### `waitForFontsLoaded`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

फ़ॉन्ट, जिनमें थर्ड-पार्टी फ़ॉन्ट भी शामिल हैं, सिंक्रोनस या एसिंक्रोनस रूप से लोड हो सकते हैं। एसिंक्रोनस लोडिंग में फ़ॉन्ट तब भी लोड हो सकते हैं जब WebdriverIO पेज को पूरी तरह लोड मान चुका हो। फ़ॉन्ट रेंडरिंग की समस्याओं से बचने के लिए यह मॉड्यूल डिफ़ॉल्ट रूप से स्क्रीनशॉट लेने से पहले सभी फ़ॉन्ट लोड होने का इंतज़ार करता है।

</Option>
## फ़ुल-पेज स्क्रीनशॉट

---

### `userBasedFullPageScreenshot`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview) **Introduced in visual-service@7.0.0">

डिफ़ॉल्ट रूप से, डेस्कटॉप वेब पर फ़ुल-पेज स्क्रीनशॉट WebDriver BiDi प्रोटोकॉल से कैप्चर किए जाते हैं। इससे बिना स्क्रॉल किए तेज़, स्थिर और एक जैसे स्क्रीनशॉट मिलते हैं।
जब userBasedFullPageScreenshot को true पर सेट किया जाता है, तो स्क्रीनशॉट प्रक्रिया एक असली यूज़र की तरह काम करती है: यह पेज को स्क्रॉल करती है, व्यूपोर्ट के आकार के स्क्रीनशॉट लेती है और उन्हें आपस में जोड़ देती है। यह तरीका उन पेजों के लिए उपयोगी है जिनमें लेज़ी-लोडेड कंटेंट है या जिनकी डायनामिक रेंडरिंग स्क्रॉल पोज़िशन पर निर्भर करती है।

इस विकल्प का उपयोग तब करें जब आपके पेज का कंटेंट स्क्रॉल करते समय लोड होता हो, या जब आप पुराने स्क्रीनशॉट तरीकों वाला व्यवहार बनाए रखना चाहते हों।

</Option>
### `fullPageScrollTimeout`

<Option type="number" default="1500" required="No" contexts="Web">

स्क्रॉल के बाद इंतज़ार करने का टाइमआउट, मिलीसेकंड में। यह लेज़ी लोडिंग वाले पेजों को पहचानने में मदद कर सकता है।

:::info

यह केवल तभी काम करेगा जब सर्विस/मेथड विकल्प `userBasedFullPageScreenshot` को `true` पर सेट किया गया हो। [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedfullpagescreenshot) भी देखें।

:::

</Option>
## मोबाइल और डिवाइस

---

### `isHybridApp`

<Option type="boolean" default="false" required="No" contexts="Hybrid App (Webview)">

हाइब्रिड ऐप (एक या अधिक एम्बेडेड वेबव्यू वाला नेटिव शेल) की टेस्टिंग करते समय इसे `true` पर सेट करें। इससे वेबव्यू-आधारित स्क्रीनों के लिए स्टेटस बार और एड्रेस बार के कटआउट को संभालने का तरीका बदल जाता है। नेटिव डिवाइस रेक्टेंगल डेटा उपलब्ध न होने पर मॉड्यूल सुरक्षित डिफ़ॉल्ट मानों का उपयोग करता है।

</Option>
### `addIOSBezelCorners`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview), Native App">

iOS डिवाइसों के स्क्रीनशॉट में बेज़ल कॉर्नर और नॉच/डायनामिक आइलैंड जोड़ें।

:::info नोट
यह केवल तभी हो सकता है जब डिवाइस का नाम अपने-आप पता **लगाया जा सके** और वह नीचे दी गई नॉर्मलाइज़्ड डिवाइस नामों की सूची से मेल खाता हो। नॉर्मलाइज़ करने का काम यह मॉड्यूल करेगा।
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

</Option>
### `addressBarShadowPadding`

<Option type="number" default="6" required="No" contexts="Web">

iOS और Android पर व्यूपोर्ट का सही कटआउट करने के लिए एड्रेस बार में जोड़ी जाने वाली पैडिंग।

</Option>
### `toolBarShadowPadding`

<Option type="number" default={`6 for Android and \`15\` for iOS (\`6\` by default and \`9\` will be added automatically for the possible home bar on iPhones with a notch or iPads that have a home bar)`} required="No" contexts="Web">

iOS और Android पर व्यूपोर्ट का सही कटआउट करने के लिए टूलबार में जोड़ी जाने वाली पैडिंग।

</Option>
## फ़ाइल और फ़ोल्डर प्रबंधन

---

### `baselineFolder`

<Option type="string|()=> string" default=".path/to/testfile/__snapshots__/" required="No" contexts="Web, Hybrid App (Webview), Native App">

वह डायरेक्टरी जिसमें तुलना के दौरान उपयोग होने वाली सभी बेसलाइन इमेज रखी जाएँगी। अगर इसे सेट नहीं किया गया, तो डिफ़ॉल्ट मान का उपयोग होगा। ऐसे में फ़ाइलें विज़ुअल टेस्ट चलाने वाली spec के बगल में एक `__snapshots__/`-फ़ोल्डर में सेव होंगी। `baselineFolder` का मान सेट करने के लिए `string` लौटाने वाला फ़ंक्शन भी इस्तेमाल किया जा सकता है:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// या
{
    baselineFolder: () => {
        // यहाँ कुछ जादू करें
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

</Option>
### `screenshotPath`

<Option type="string | () => string" default=".tmp/" required="no" contexts="Web, Hybrid App (Webview), Native App">

वह डायरेक्टरी जिसमें सभी actual/different स्क्रीनशॉट रखे जाएँगे। अगर इसे सेट नहीं किया गया, तो डिफ़ॉल्ट मान का उपयोग होगा। screenshotPath का मान सेट करने के लिए
string लौटाने वाला फ़ंक्शन भी इस्तेमाल किया जा सकता है:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// या
{
    screenshotPath: () => {
        // यहाँ कुछ जादू करें
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

</Option>
### `clearRuntimeFolder`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview), Native App">

इनिशियलाइज़ेशन पर रनटाइम फ़ोल्डर (`actual` & `diff) डिलीट करें।

:::info नोट
यह केवल तभी काम करेगा जब [`screenshotPath`](#screenshotpath) को प्लगइन विकल्पों के ज़रिए सेट किया गया हो। अगर आप फ़ोल्डर मेथड्स में सेट करते हैं, तो यह **काम नहीं करेगा**।
:::

</Option>
### `savePerInstance`

<Option type="boolean" default="false" required="no" contexts="Web, Hybrid App (Webview), Native App">

हर इंस्टेंस की इमेज एक अलग फ़ोल्डर में सेव करें। उदाहरण के लिए, सभी Chrome स्क्रीनशॉट `desktop_chrome` जैसे Chrome फ़ोल्डर में सेव होंगे।

</Option>
### `formatImageName`

<Option type="string" default={`{tag}-{browserName}-{width}x{height}-dpr-{dpr}`} required="No" contexts="Web, Hybrid App (Webview), Native App">

सेव की गई इमेज का नाम पैरामीटर `formatImageName` में एक फ़ॉर्मेट स्ट्रिंग देकर कस्टमाइज़ किया जा सकता है, जैसे:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

स्ट्रिंग को फ़ॉर्मेट करने के लिए नीचे दिए गए वेरिएबल इस्तेमाल किए जा सकते हैं। इनके मान इंस्टेंस की capabilities से अपने-आप पढ़े जाएँगे।
अगर कोई मान पता नहीं चल पाता, तो डिफ़ॉल्ट मान का उपयोग होगा।

-   `browserName`: दी गई capabilities में ब्राउज़र का नाम
-   `browserVersion`: capabilities में दिया गया ब्राउज़र का वर्ज़न
-   `deviceName`: capabilities से डिवाइस का नाम
-   `dpr`: डिवाइस पिक्सेल रेशियो
-   `height`: स्क्रीन की ऊँचाई
-   `logName`: capabilities से logName
-   `mobile`: यह `deviceName` के बाद `_app` या ब्राउज़र का नाम जोड़ देगा, ताकि ऐप स्क्रीनशॉट और ब्राउज़र स्क्रीनशॉट में अंतर किया जा सके
-   `platformName`: दी गई capabilities में प्लेटफ़ॉर्म का नाम
-   `platformVersion`: capabilities में दिया गया प्लेटफ़ॉर्म का वर्ज़न
-   `tag`: कॉल की जा रही मेथड में दिया गया टैग
-   `width`: स्क्रीन की चौड़ाई

:::info

`formatImageName` में कस्टम पाथ/फ़ोल्डर नहीं दिए जा सकते। अगर आप पाथ बदलना चाहते हैं, तो इनमें से कोई विकल्प बदलें:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- हर मेथड के लिए [`folderOptions`](/docs/visual-testing/method-options#folder-options)

:::

</Option>
## बेसलाइन और सेव व्यवहार

---

### `autoSaveBaseline`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview), Native App">

अगर तुलना के दौरान कोई बेसलाइन इमेज नहीं मिलती, तो इमेज अपने-आप बेसलाइन फ़ोल्डर में कॉपी हो जाती है।

</Option>
### `autoElementScroll`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

एलिमेंट स्क्रीनशॉट बनाते समय एलिमेंट अपने-आप स्क्रॉल होकर व्यू में आ जाता है। इस विकल्प से आप यह ऑटोमैटिक स्क्रॉलिंग डिसेबल कर सकते हैं।

</Option>
### `alwaysSaveActualImage`

<Option type="boolean" default="true" required="No" contexts="All">

इस विकल्प को `false` पर सेट करने पर:

- **कोई** अंतर न होने पर actual इमेज सेव नहीं होगी
- `createJsonReportFiles` को `true` पर सेट करने पर भी jsonreport फ़ाइल स्टोर नहीं होगी। लॉग में यह चेतावनी भी दिखेगी कि `createJsonReportFiles` डिसेबल है

इससे परफ़ॉर्मेंस बेहतर होनी चाहिए, क्योंकि सिस्टम पर कोई फ़ाइल नहीं लिखी जाती। साथ ही `actual` फ़ोल्डर में बेवजह की फ़ाइलें भी जमा नहीं होंगी।

</Option>
## रिपोर्टिंग

---

### `createJsonReportFiles` **(नया)**

<Option type="boolean" default="false" required="No">

अब आप तुलना के परिणामों को एक JSON रिपोर्ट फ़ाइल में एक्सपोर्ट कर सकते हैं। विकल्प `createJsonReportFiles: true` देने पर, तुलना की गई हर इमेज के लिए एक रिपोर्ट बनेगी। यह रिपोर्ट `actual` फ़ोल्डर में हर `actual` इमेज परिणाम के बगल में स्टोर होगी। आउटपुट कुछ ऐसा दिखेगा:

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

सभी टेस्ट चलने के बाद, सभी तुलनाओं के संग्रह वाली एक नई JSON फ़ाइल बनेगी। यह फ़ाइल आपके `actual` फ़ोल्डर के रूट में मिलेगी। डेटा को इनके आधार पर समूहित किया जाता है:

-   Jasmine/Mocha के लिए `describe` या CucumberJS के लिए `Feature`
-   Jasmine/Mocha के लिए `it` या CucumberJS के लिए `Scenario`
    और फिर इनके आधार पर क्रमबद्ध किया जाता है:
-   `commandName`, यानी इमेज की तुलना के लिए इस्तेमाल हुई compare मेथड्स के नाम
-   `instanceData`, पहले ब्राउज़र, फिर डिवाइस, फिर प्लेटफ़ॉर्म
    यह कुछ ऐसा दिखेगा

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

इस रिपोर्ट डेटा से आप अपनी खुद की विज़ुअल रिपोर्ट बना सकते हैं। इसके लिए आपको सारा जादू और डेटा संग्रह खुद नहीं करना पड़ेगा।

:::info नोट
आपको `@wdio/visual-testing` का वर्ज़न `5.2.0` या उससे ऊपर इस्तेमाल करना होगा।
:::

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="No" contexts="Web, Hybrid App (Webview), Native App">

[`createJsonReportFiles`](#createjsonreportfiles) से बनी JSON रिपोर्ट में diff पिक्सेल्स को एक साथ समूहित करने के लिए इस्तेमाल होने वाली पिक्सेल निकटता। ज़्यादा मान रखने पर अधिक पिक्सेल कम बाउंडिंग बॉक्स में समूहित होते हैं। कम मान रखने पर बॉक्स ज़्यादा सटीक होते हैं, लेकिन उनकी संख्या भी ज़्यादा होती है।

</Option>
## सामान्य

---

### `logLevel`

<Option type="string" default="info" required="No" contexts="Web, Hybrid App (Webview), Native App">

अतिरिक्त लॉग जोड़ता है। विकल्प हैं `debug | info | warn | silent`

त्रुटियाँ हमेशा कंसोल में लॉग होती हैं।

</Option>
## Tabbable विकल्प

:::info नोट

यह मॉड्यूल यह भी दिखा सकता है कि यूज़र अपने कीबोर्ड से वेबसाइट में कैसे _tab_ करेगा। इसके लिए यह एक tabbable एलिमेंट से दूसरे tabbable एलिमेंट तक लाइनें और डॉट बनाता है।<br/>
यह काम [Viv Richards](https://github.com/vivrichards600) के ब्लॉग पोस्ट ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript) से प्रेरित है।<br/>
Tabbable एलिमेंट चुनने का तरीका मॉड्यूल [tabbable](https://github.com/davidtheclark/tabbable) पर आधारित है। टैबिंग से जुड़ी कोई समस्या हो, तो कृपया [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) और ख़ास तौर पर [More details section](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details) देखें।

:::

### `tabbableOptions`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

`{save|check}Tabbable`-मेथड्स का उपयोग करते समय लाइनों और डॉट्स के लिए बदले जा सकने वाले विकल्प। इन विकल्पों की जानकारी नीचे दी गई है।

</Option>
#### `tabbableOptions.circle`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

सर्कल बदलने के विकल्प।

</Option>
##### `tabbableOptions.circle.backgroundColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

सर्कल का बैकग्राउंड रंग।

</Option>
##### `tabbableOptions.circle.borderColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

सर्कल के बॉर्डर का रंग।

</Option>
##### `tabbableOptions.circle.borderWidth`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

सर्कल के बॉर्डर की चौड़ाई।

</Option>
##### `tabbableOptions.circle.fontColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

सर्कल में दिखने वाले टेक्स्ट के फ़ॉन्ट का रंग। यह केवल तभी दिखेगा जब [`showNumber`](./#tabbableoptionscircleshownumber) को `true` पर सेट किया गया हो।

</Option>
##### `tabbableOptions.circle.fontFamily`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

सर्कल में दिखने वाले टेक्स्ट की फ़ॉन्ट फ़ैमिली। यह केवल तभी दिखेगी जब [`showNumber`](./#tabbableoptionscircleshownumber) को `true` पर सेट किया गया हो।

ध्यान रखें कि आप वही फ़ॉन्ट सेट करें जो ब्राउज़र सपोर्ट करते हों।

</Option>
##### `tabbableOptions.circle.fontSize`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

सर्कल में दिखने वाले टेक्स्ट के फ़ॉन्ट का आकार। यह केवल तभी दिखेगा जब [`showNumber`](./#tabbableoptionscircleshownumber) को `true` पर सेट किया गया हो।

</Option>
##### `tabbableOptions.circle.size`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

सर्कल का आकार।

</Option>
##### `tabbableOptions.circle.showNumber`

<Option type="showNumber" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

सर्कल में टैब क्रम संख्या दिखाएँ।

</Option>
#### `tabbableOptions.line`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

लाइन बदलने के विकल्प।

</Option>
##### `tabbableOptions.line.color`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

लाइन का रंग।

</Option>
##### `tabbableOptions.line.width`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

लाइन की चौड़ाई।

</Option>
## Compare विकल्प

### `compareOptions`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) for all default values" required="No" contexts="Web, Hybrid App (Webview), Native App (See [Method Compare options](./method-options#compare-check-options) for more information)">

Compare विकल्पों को सर्विस विकल्पों के रूप में भी सेट किया जा सकता है। इनकी जानकारी [Method Compare options](/docs/visual-testing/method-options#compare-check-options) में दी गई है।

</Option>