---
id: service-options
title: सेवा विकल्प
---

सेवा विकल्प वे विकल्प हैं जिन्हें सेवा को आरंभ करते समय सेट किया जा सकता है और प्रत्येक विधि कॉल के लिए उपयोग किया जाएगा।

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

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** `6`
-   **समर्थित:** वेब

iOS और Android पर व्यूपोर्ट के उचित कटआउट के लिए एड्रेस बार में पैडिंग जोड़ने की आवश्यकता होती है।

### `autoElementScroll`

-   **प्रकार:** `boolean`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** `true`
-   **समर्थित:** वेब, हाइब्रिड ऐप (वेबव्यू)

यह विकल्प आपको एलिमेंट स्क्रीनशॉट बनाते समय एलिमेंट को दृश्य में स्वचालित रूप से स्क्रॉल करने को अक्षम करने की अनुमति देता है।

### `addIOSBezelCorners`

-   **प्रकार:** `boolean`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** `false`
-   **समर्थित:** वेब, हाइब्रिड ऐप (वेबव्यू), नेटिव ऐप

iOS डिवाइस के लिए स्क्रीनशॉट में बेज़ेल कोने और नॉच/डायनामिक आइलैंड जोड़ें।

:::info नोट
यह केवल तभी किया जा सकता है जब डिवाइस नाम **स्वचालित रूप से** निर्धारित किया जा सकता है और सामान्यीकृत डिवाइस नामों की निम्नलिखित सूची से मेल खाता है। सामान्यीकरण इस मॉड्यूल द्वारा किया जाएगा।
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
-   **डिफ़ॉल्ट:** `true`
-   **समर्थित:** वेब, हाइब्रिड ऐप (वेबव्यू), नेटिव ऐप

यदि तुलना के दौरान कोई बेसलाइन छवि नहीं मिली है तो छवि स्वचालित रूप से बेसलाइन फ़ोल्डर में कॉपी की जाती है।

### `baselineFolder`

-   **प्रकार:** `string|()=> string`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** `.path/to/testfile/__snapshots__/`
-   **समर्थित:** वेब, हाइब्रिड ऐप (वेबव्यू), नेटिव ऐप

निर्देशिका जो तुलना के दौरान उपयोग की जाने वाली सभी बेसलाइन छवियों को रखेगी। यदि सेट नहीं किया गया है, तो डिफ़ॉल्ट मान का उपयोग किया जाएगा जो उन स्पेक के बगल में `__snapshots__/`-फ़ोल्डर में फ़ाइलों को स्टोर करेगा जो विज़ुअल टेस्ट निष्पादित करता है। `baselineFolder` मान सेट करने के लिए एक फ़ंक्शन जो `string` लौटाता है का भी उपयोग किया जा सकता है:

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
-   **डिफ़ॉल्ट:** `false`
-   **समर्थित:** वेब, हाइब्रिड ऐप (वेबव्यू), नेटिव ऐप

प्रारंभीकरण पर रनटाइम फ़ोल्डर (`actual` & `diff`) हटाएं

:::info नोट
यह केवल तभी काम करेगा जब [`screenshotPath`](#screenshotpath) प्लगइन विकल्पों के माध्यम से सेट किया गया हो, और **काम नहीं करेगा** जब आप विधियों में फ़ोल्डर सेट करते हैं
:::

### `createJsonReportFiles` **(NEW)**

-   **प्रकार:** `boolean`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** `false`

अब आपके पास तुलना परिणामों को JSON रिपोर्ट फ़ाइल में निर्यात करने का विकल्प है। विकल्प `createJsonReportFiles: true` प्रदान करके, प्रत्येक `actual` छवि परिणाम के बगल में, `actual` फोल्डर में संग्रहीत एक रिपोर्ट बनाई जाएगी। आउटपुट इस प्रकार दिखेगा:

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

जब सभी परीक्षण निष्पादित हो जाते हैं, तो तुलनाओं के संग्रह के साथ एक नई JSON फ़ाइल उत्पन्न की जाएगी और आपके `actual` फ़ोल्डर के रूट में पाई जा सकती है। डेटा को इसके अनुसार समूहित किया गया है:

-   Jasmine/Mocha के लिए `describe` या CucumberJS के लिए `Feature`
-   Jasmine/Mocha के लिए `it` या CucumberJS के लिए `Scenario`
    और फिर इसके अनुसार सॉर्ट किया गया:
-   `commandName`, जो छवियों की तुलना करने के लिए उपयोग किए जाने वाले तुलना विधि नाम हैं
-   `instanceData`, पहले ब्राउज़र, फिर डिवाइस, फिर प्लेटफॉर्म
    यह इस प्रकार दिखेगा

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

रिपोर्ट डेटा आपको बिना सारी जादुई और डेटा संग्रह के स्वयं करने के अवसर देगा अपनी खुद की विज़ुअल रिपोर्ट बनाने का।

:::info नोट
आपको `@wdio/visual-testing` संस्करण `5.2.0` या उससे अधिक का उपयोग करने की आवश्यकता है
:::

### `disableBlinkingCursor`

-   **प्रकार:** `boolean`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** `false`
-   **समर्थित:** वेब, हाइब्रिड ऐप (वेबव्यू)

एप्लिकेशन में सभी `input`, `textarea`, `[contenteditable]` कैरेट "ब्लिंकिंग" को सक्षम/अक्षम करें। यदि `true` पर सेट किया गया है, तो स्क्रीनशॉट लेने से पहले कैरेट को `transparent` पर सेट किया जाएगा और पूरा होने पर रीसेट किया जाएगा

### `disableCSSAnimation`

-   **प्रकार:** `boolean`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** `false`
-   **समर्थित:** वेब, हाइब्रिड ऐप (वेबव्यू)

एप्लिकेशन में सभी CSS एनिमेशन को सक्षम/अक्षम करें। यदि `true` पर सेट किया गया है, तो स्क्रीनशॉट लेने से पहले सभी एनिमेशन अक्षम कर दिए जाएंगे और पूरा होने पर रीसेट कर दिए जाएंगे

### `enableLayoutTesting`

-   **प्रकार:** `boolean`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** `false`
-   **समर्थित:** वेब

यह पेज पर सभी टेक्स्ट को छिपा देगा ताकि केवल लेआउट का उपयोग तुलना के लिए किया जाए। छिपाने का काम **प्रत्येक** एलिमेंट में `'color': 'transparent !important'` स्टाइल जोड़कर किया जाएगा।

आउटपुट के लिए [टेस्ट आउटपुट](/docs/visual-testing/test-output#enablelayouttesting) देखें

:::info
इस फ्लैग का उपयोग करके प्रत्येक एलिमेंट जिसमें टेक्स्ट होता है (इसलिए न केवल `p, h1, h2, h3, h4, h5, h6, span, a, li`, बल्कि `div|button|..` भी) को यह प्रॉपर्टी मिलेगी। इसे अनुकूलित करने का कोई विकल्प **नहीं** है।
:::

### `formatImageName`

-   **प्रकार:** `string`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **समर्थित:** वेब, हाइब्रिड ऐप (वेबव्यू), नेटिव ऐप

सहेजी गई छवियों के नाम को निम्न जैसे एक फॉर्मेट स्ट्रिंग के साथ `formatImageName` पैरामीटर पास करके अनुकूलित किया जा सकता है:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

स्ट्रिंग को फॉर्मेट करने के लिए निम्नलिखित वेरिएबल्स पास किए जा सकते हैं और स्वचालित रूप से इंस्टेंस क्षमताओं से पढ़े जाएंगे।
यदि वे निर्धारित नहीं किए जा सकते हैं तो डिफ़ॉल्ट का उपयोग किया जाएगा।

-   `browserName`: क्षमताओं में प्रदान किए गए ब्राउज़र का नाम
-   `browserVersion`: क्षमताओं में प्रदान किए गए ब्राउज़र का वर्जन
-   `deviceName`: क्षमताओं से डिवाइस का नाम
-   `dpr`: डिवाइस पिक्सेल अनुपात
-   `height`: स्क्रीन की ऊंचाई
-   `logName`: क्षमताओं से logName
-   `mobile`: यह ऐप स्क्रीनशॉट को ब्राउज़र स्क्रीनशॉट से अलग करने के लिए `deviceName` के बाद `_app`, या ब्राउज़र नाम जोड़ेगा
-   `platformName`: क्षमताओं में प्रदान किए गए प्लेटफ़ॉर्म का नाम
-   `platformVersion`: क्षमताओं में प्रदान किए गए प्लेटफ़ॉर्म का वर्जन
-   `tag`: वह टैग जो कॉल की जा रही विधियों में प्रदान किया गया है
-   `width`: स्क्रीन की चौड़ाई

:::info

आप `formatImageName` में कस्टम पाथ/फोल्डर प्रदान नहीं कर सकते। यदि आप पाथ बदलना चाहते हैं तो कृपया निम्नलिखित विकल्प बदलने की जांच करें:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- प्रति विधि [`folderOptions`](/docs/visual-testing/method-options#folder-options)

:::

### `fullPageScrollTimeout`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** `1500`
-   **समर्थित:** वेब

स्क्रॉल के बाद प्रतीक्षा करने के लिए मिलीसेकंड में टाइमआउट। यह आलसी लोडिंग वाले पृष्ठों की पहचान करने में मदद कर सकता है।

:::info

यह केवल तभी काम करेगा जब सेवा/विधि विकल्प `userBasedFullPageScreenshot` को `true` पर सेट किया गया हो, [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot) भी देखें

:::

### `hideScrollBars`

-   **प्रकार:** `boolean`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** `true`
-   **समर्थित:** वेब, हाइब्रिड ऐप (वेबव्यू)

एप्लिकेशन में स्क्रॉलबार छिपाएं। यदि true पर सेट किया गया है, तो स्क्रीनशॉट लेने से पहले सभी स्क्रॉलबार अक्षम कर दिए जाएंगे। यह अतिरिक्त मुद्दों को रोकने के लिए डिफ़ॉल्ट रूप से `true` पर सेट है।

### `logLevel`

-   **प्रकार:** `string`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** `info`
-   **समर्थित:** वेब, हाइब्रिड ऐप (वेबव्यू), नेटिव ऐप

अतिरिक्त लॉग जोड़ता है, विकल्प हैं `debug | info | warn | silent`

त्रुटियां हमेशा कंसोल पर लॉग की जाती हैं।

### `savePerInstance`

-   **प्रकार:** `boolean`
-   **डिफ़ॉल्ट:** `false`
-   **अनिवार्य:** नहीं
-   **समर्थित:** वेब, हाइब्रिड ऐप (वेबव्यू), नेटिव ऐप

प्रति इंस्टेंस छवियों को एक अलग फ़ोल्डर में सहेजें, उदाहरण के लिए सभी Chrome स्क्रीनशॉट `desktop_chrome` जैसे Chrome फ़ोल्डर में सहेजे जाएंगे।

### `screenshotPath`

-   **प्रकार:** `string | () => string`
-   **डिफ़ॉल्ट:** `.tmp/`
-   **अनिवार्य:** नहीं
-   **समर्थित:** वेब, हाइब्रिड ऐप (वेबव्यू), नेटिव ऐप

निर्देशिका जो सभी वास्तविक/अलग स्क्रीनशॉट रखेगी। यदि सेट नहीं किया गया है, तो डिफ़ॉल्ट मान का उपयोग किया जाएगा। screenshotPath मान सेट करने के लिए एक स्ट्रिंग लौटाने वाले फ़ंक्शन का भी उपयोग किया जा सकता है:

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
-   **डिफ़ॉल्ट:** Android के लिए `6` और iOS के लिए `15` (डिफ़ॉल्ट रूप से `6` और नॉच या होम बार वाले आईफोन के लिए संभावित होम बार के लिए `9` स्वचालित रूप से जोड़ा जाएगा)
-   **समर्थित:** वेब

व्यूपोर्ट के उचित कटआउट के लिए iOS और Android पर टूलबार बार में जोड़े जाने वाले पैडिंग।

### `userBasedFullPageScreenshot`

-   **प्रकार:** `boolean`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** `false`
-   **समर्थित:** वेब, हाइब्रिड ऐप (वेबव्यू) **visual-service@7.0.0 में पेश किया गया**

डिफ़ॉल्ट रूप से, डेस्कटॉप वेब पर पूर्ण-पृष्ठ स्क्रीनशॉट WebDriver BiDi प्रोटोकॉल का उपयोग करके कैप्चर किए जाते हैं, जो स्क्रॉलिंग के बिना तेज़, स्थिर और सुसंगत स्क्रीनशॉट सक्षम करता है।
जब userBasedFullPageScreenshot को true पर सेट किया जाता है, तो स्क्रीनशॉट प्रक्रिया एक वास्तविक उपयोगकर्ता का अनुकरण करती है: पृष्ठ के माध्यम से स्क्रॉल करना, व्यूपोर्ट-आकार के स्क्रीनशॉट कैप्चर करना, और उन्हें एक साथ जोड़ना। यह विधि उन पृष्ठों के लिए उपयोगी है जिनमें आलसी लोड किया गया सामग्री या गतिशील रेंडरिंग होती है जो स्क्रॉल स्थिति पर निर्भर करती है।

इस विकल्प का उपयोग करें यदि आपका पृष्ठ स्क्रॉलिंग के दौरान सामग्री लोड करने पर निर्भर करता है या यदि आप पुराने स्क्रीनशॉट विधियों के व्यवहार को बनाए रखना चाहते हैं।

### `waitForFontsLoaded`

-   **प्रकार:** `boolean`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** `true`
-   **समर्थित:** वेब, हाइब्रिड ऐप (वेबव्यू)

फ़ॉन्ट्स, जिनमें तृतीय-पक्ष फ़ॉन्ट्स भी शामिल हैं, सिंक्रोनस या एसिंक्रोनस रूप से लोड किए जा सकते हैं। एसिंक्रोनस लोडिंग का मतलब है कि फ़ॉन्ट्स WebdriverIO के निर्धारित करने के बाद लोड हो सकते हैं कि कोई पृष्ठ पूरी तरह से लोड हो गया है। फ़ॉन्ट रेंडरिंग समस्याओं को रोकने के लिए, यह मॉड्यूल, डिफ़ॉल्ट रूप से, स्क्रीनशॉट लेने से पहले सभी फ़ॉन्ट्स के लोड होने का इंतज़ार करेगा।

## Tabbable विकल्प

:::info नोट

यह मॉड्यूल एक उपयोगकर्ता अपने कीबोर्ड का उपयोग वेबसाइट पर _टैब_ करने के लिए करेगा, उस तरीके से रेखाएँ और बिंदु आरेखित करके tabbable एलिमेंट से tabbable एलिमेंट तक का समर्थन भी करता है।<br/>
यह कार्य [Viv Richards](https://github.com/vivrichards600) के ब्लॉग पोस्ट ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript) से प्रेरित है।<br/>
tabbable एलिमेंट्स का चयन करने का तरीका [tabbable](https://github.com/davidtheclark/tabbable) मॉड्यूल पर आधारित है। यदि टैबिंग के संबंध में कोई समस्या है, तो कृपया [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) और विशेष रूप से [More details section](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details) देखें।

:::

### `tabbableOptions`

-   **प्रकार:** `object`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** सभी डिफ़ॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) देखें
-   **समर्थित:** वेब

विकल्प जो रेखाओं और बिंदुओं के लिए बदले जा सकते हैं यदि आप `{save|check}Tabbable`-विधियों का उपयोग करते हैं। विकल्प नीचे समझाए गए हैं।

#### `tabbableOptions.circle`

-   **प्रकार:** `object`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** सभी डिफ़ॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) देखें
-   **समर्थित:** वेब

सर्कल को बदलने के विकल्प।

##### `tabbableOptions.circle.backgroundColor`

-   **प्रकार:** `string`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** सभी डिफ़ॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) देखें
-   **समर्थित:** वेब

सर्कल का बैकग्राउंड कलर।

##### `tabbableOptions.circle.borderColor`

-   **प्रकार:** `string`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** सभी डिफ़ॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) देखें
-   **समर्थित:** वेब

सर्कल का बॉर्डर कलर।

##### `tabbableOptions.circle.borderWidth`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** सभी डिफ़ॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) देखें
-   **समर्थित:** वेब

सर्कल की बॉर्डर चौड़ाई।

##### `tabbableOptions.circle.fontColor`

-   **प्रकार:** `string`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** सभी डिफ़ॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) देखें
-   **समर्थित:** वेब

सर्कल में टेक्स्ट के फॉन्ट का कलर। यह केवल तभी दिखाया जाएगा जब [`showNumber`](./#tabbableoptionscircleshownumber) को `true` पर सेट किया गया हो।

##### `tabbableOptions.circle.fontFamily`

-   **प्रकार:** `string`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** सभी डिफ़ॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) देखें
-   **समर्थित:** वेब

सर्कल में टेक्स्ट के फॉन्ट का परिवार। यह केवल तभी दिखाया जाएगा जब [`showNumber`](./#tabbableoptionscircleshownumber) को `true` पर सेट किया गया हो।

सुनिश्चित करें कि ऐसे फोंट सेट करें जो ब्राउज़र द्वारा समर्थित हों।

##### `tabbableOptions.circle.fontSize`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** सभी डिफ़ॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) देखें
-   **समर्थित:** वेब

सर्कल में टेक्स्ट के फॉन्ट का आकार। यह केवल तभी दिखाया जाएगा जब [`showNumber`](./#tabbableoptionscircleshownumber) को `true` पर सेट किया गया हो।

##### `tabbableOptions.circle.size`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** सभी डिफ़ॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) देखें
-   **समर्थित:** वेब

सर्कल का आकार।

##### `tabbableOptions.circle.showNumber`

-   **प्रकार:** `showNumber`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** सभी डिफ़ॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) देखें
-   **समर्थित:** वेब

सर्कल में टैब अनुक्रम संख्या दिखाएं।

#### `tabbableOptions.line`

-   **प्रकार:** `object`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** सभी डिफ़ॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) देखें
-   **समर्थित:** वेब

लाइन को बदलने के विकल्प।

##### `tabbableOptions.line.color`

-   **प्रकार:** `string`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** सभी डिफ़ॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) देखें
-   **समर्थित:** वेब

लाइन का कलर।

##### `tabbableOptions.line.width`

-   **प्रकार:** `number`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** सभी डिफ़ॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) देखें
-   **समर्थित:** वेब

लाइन की चौड़ाई।

## तुलना विकल्प

### `compareOptions`

-   **प्रकार:** `object`
-   **अनिवार्य:** नहीं
-   **डिफ़ॉल्ट:** सभी डिफ़ॉल्ट मानों के लिए [यहां](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) देखें
-   **समर्थित:** वेब, हाइब्रिड ऐप (वेबव्यू), नेटिव ऐप (अधिक जानकारी के लिए [विधि तुलना विकल्प](./method-options#compare-check-options) देखें)

तुलना विकल्प सेवा विकल्प के रूप में भी सेट किए जा सकते हैं, वे [विधि तुलना विकल्प](/docs/visual-testing/method-options#compare-check-options) में वर्णित हैं