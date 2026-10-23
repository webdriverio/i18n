---
id: visual-testing
title: विज़ुअल टेस्टिंग
description: "@wdio/visual-service के साथ स्क्रीन, एलिमेंट्स या फुल पेज के स्क्रीनशॉट्स की बेसलाइन से तुलना करें, जिसमें इंस्टॉलेशन और उपयोग शामिल है।"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## यह क्या कर सकता है?

WebdriverIO स्क्रीन, एलिमेंट्स या फुल-पेज पर इमेज तुलना प्रदान करता है

-   🖥️ डेस्कटॉप ब्राउज़र्स (Chrome / Firefox / Safari / Microsoft Edge)
-   📱 मोबाइल / टैबलेट ब्राउज़र्स (Android एमुलेटर्स पर Chrome / iOS सिमुलेटर्स पर Safari / सिमुलेटर्स / रियल डिवाइसेज़) Appium के माध्यम से
-   📱 नेटिव ऐप्स (Android एमुलेटर्स / iOS सिमुलेटर्स / रियल डिवाइसेज़) Appium के माध्यम से (🌟 **नया** 🌟)
-   📳 हाइब्रिड ऐप्स Appium के माध्यम से

[`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service) के माध्यम से, जो एक हल्की WebdriverIO सर्विस है।

इससे आप:

-   **स्क्रीन/एलिमेंट्स/फुल-पेज** स्क्रीन्स को बेसलाइन के विरुद्ध सेव या तुलना कर सकते हैं
-   जब कोई बेसलाइन न हो तो स्वचालित रूप से **बेसलाइन बना सकते हैं**
-   तुलना के दौरान **कस्टम क्षेत्रों को ब्लॉक कर सकते हैं** और यहां तक कि स्टेटस और/या टूलबार्स को **स्वचालित रूप से बाहर** कर सकते हैं (केवल मोबाइल)
-   एलिमेंट स्क्रीनशॉट्स के आयाम बढ़ा सकते हैं
-   वेबसाइट तुलना के दौरान **टेक्स्ट छिपा सकते हैं** ताकि:
    -   **स्थिरता में सुधार** हो और फ़ॉन्ट रेंडरिंग की अस्थिरता से बचा जा सके
    -   केवल वेबसाइट के **लेआउट** पर ध्यान केंद्रित किया जा सके
-   बेहतर पठनीय टेस्ट्स के लिए **विभिन्न तुलना विधियों** और **अतिरिक्त मैचर्स** के एक सेट का उपयोग कर सकते हैं
-   सत्यापित कर सकते हैं कि आपकी वेबसाइट **आपके कीबोर्ड से टैबिंग को कैसे सपोर्ट करेगी)**, यह भी देखें [वेबसाइट के माध्यम से टैबिंग](#tabbing-through-a-website)
-   और भी बहुत कुछ, [सर्विस](./visual-testing/service-options) और [मेथड](./visual-testing/method-options) विकल्प देखें

यह सर्विस सभी ब्राउज़र्स/डिवाइसेज़ के लिए आवश्यक डेटा और स्क्रीनशॉट्स प्राप्त करने के लिए एक हल्का मॉड्यूल है। तुलना की शक्ति [Pixelmatch](https://github.com/mapbox/pixelmatch) से आती है, जो एक तेज़ और सटीक perceptual इमेज तुलना लाइब्रेरी है। v11 से, यह OKLab कलर स्पेस में HyAB distance (pixelmatch 8) के साथ रंग के अंतर को मापता है, जो लोगों के रंग देखने के तरीके के अधिक करीब है। इमेजेज़ को [fast-png](https://github.com/image-js/fast-png) के साथ प्रोसेस किया जाता है, जो शून्य नेटिव डिपेंडेंसी वाला PNG कोडेक है।

:::info नेटिव/हाइब्रिड ऐप्स के लिए नोट
मेथड्स `saveScreen`, `saveElement`, `checkScreen`, `checkElement` और मैचर्स `toMatchScreenSnapshot` और `toMatchElementSnapshot` का उपयोग नेटिव ऐप्स/कॉन्टेक्स्ट के लिए किया जा सकता है।

जब आप इसे हाइब्रिड ऐप्स के लिए उपयोग करना चाहते हैं तो कृपया अपनी सर्विस सेटिंग्स में प्रॉपर्टी `isHybridApp:true` का उपयोग करें।
:::

:::caution v10 से अपग्रेड कर रहे हैं?

`@wdio/visual-service` **v11** केवल **WebdriverIO v10** (और Node.js 22.19 या बाद के संस्करण) को सपोर्ट करता है। WebdriverIO v9 के साथ, `@wdio/visual-service@10` पर बने रहें।

v11 रंगों की तुलना YIQ के बजाय pixelmatch 8 (OKLab कलर स्पेस, HyAB distance) से करता है। थ्रेशोल्ड स्केल और `ignore*` प्रीसेट्स नहीं बदले हैं, लेकिन समान इमेजेज़ के लिए **mismatch प्रतिशत v10 से थोड़ा भिन्न हो सकते हैं**। आपके टेस्ट कोड को बदलने की आवश्यकता नहीं है। यदि कोई चेक किसी सटीक mismatch प्रतिशत या कड़ी tolerance पर निर्भर करता है, तो अपग्रेड के बाद उसे फिर से जांचें।

v11 में कुछ सुधार एक बार बेसलाइन को भी बदल सकते हैं:

-   **बड़े एलिमेंट्स के iOS एलिमेंट स्क्रीनशॉट्स:** ऐसे एलिमेंट के लिए जो पूरी तरह से viewport के अंदर नहीं है, इमेज का आकार पूरे एलिमेंट के बराबर होता था, लेकिन viewport के बाहर का हिस्सा काला होता था ([appium/appium#22939](https://github.com/appium/appium/issues/22939))। अब इमेज में एलिमेंट का केवल दिखाई देने वाला हिस्सा होता है, जैसा कि Android पर होता है।
-   **`biDiOrigin: 'viewport'` के साथ एलिमेंट स्क्रीनशॉट्स:** WebDriver BiDi सेशन में, स्क्रीनशॉट अब स्वयं एलिमेंट को काटता है, तब भी जब पेज स्क्रॉल किया गया हो।
-   **वापस स्क्रॉल करना:** एलिमेंट चेक्स (`autoElementScroll` के साथ) और फुल पेज चेक्स अब पेज को वापस वहीं स्क्रॉल करते हैं जहां वह था। उनके तुरंत बाद चलने वाला viewport चेक एक अलग इमेज दे सकता है।

सभी बदलावों के लिए [v11 माइग्रेशन गाइड](https://github.com/webdriverio/visual-testing/blob/main/docs/v11-migration.md) देखें।

:::

:::caution v9 (या उससे कम) से अपग्रेड कर रहे हैं?

`@wdio/visual-service` **v10** ने तुलना इंजन को **ResembleJS** से **[Pixelmatch](https://github.com/mapbox/pixelmatch)** में बदल दिया। Pixelmatch raw RGB के बजाय एक perceptual (YIQ) कलर मॉडल का उपयोग करता है, इसलिए mismatch प्रतिशत v9 से भिन्न होंगे। इसका मतलब है:

-   **आपके टेस्ट कोड को बदलने की आवश्यकता नहीं है।** सभी मेथड नाम, विकल्प नाम और मैचर्स समान हैं।
-   **आपकी बेसलाइन इमेजेज़ को अपडेट करने की आवश्यकता हो सकती है।** अपग्रेड करने के बाद, अपना टेस्ट सूट चलाएं और किसी भी विज़ुअल डिफ़ की समीक्षा करें। आप `--update-visual-baseline` के साथ व्यक्तिगत विफल बेसलाइन्स को अपडेट कर सकते हैं, या अपना पूरा बेसलाइन फ़ोल्डर हटा सकते हैं और `autoSaveBaseline` को इसे शुरू से फिर से बनाने दें। विवरण के लिए [FAQ](/docs/visual-testing/faq#my-visual-tests-fail-with-a-difference-how-can-i-update-my-baseline) देखें।

:::

## इंस्टॉलेशन

सबसे आसान तरीका है `@wdio/visual-service` को अपने `package.json` में dev-dependency के रूप में रखना, इसके माध्यम से:

```sh
npm install --save-dev @wdio/visual-service
```

यह v11 इंस्टॉल करता है, जिसके लिए WebdriverIO v10 की आवश्यकता होती है। WebdriverIO v9 प्रोजेक्ट के लिए, सर्विस का v10 इंस्टॉल करें:

```sh
npm install --save-dev @wdio/visual-service@10
```

## उपयोग

`@wdio/visual-service` का उपयोग एक सामान्य सर्विस के रूप में किया जा सकता है। आप इसे अपनी कॉन्फ़िगरेशन फ़ाइल में निम्नलिखित के साथ सेट अप कर सकते हैं:

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // कुछ विकल्प, अधिक के लिए डॉक्स देखें
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                formatImageName: "{tag}-{logName}-{width}x{height}",
                screenshotPath: path.join(process.cwd(), "tmp"),
                savePerInstance: true,
                // ... और विकल्प
            },
        ],
    ],
    // ...
};
```

अधिक सर्विस विकल्प [यहां](/docs/visual-testing/service-options) मिल सकते हैं।

एक बार आपकी WebdriverIO कॉन्फ़िगरेशन में सेट अप हो जाने के बाद, आप [अपने टेस्ट्स](/docs/visual-testing/writing-tests) में विज़ुअल assertions जोड़ सकते हैं।

### Capabilities
विज़ुअल टेस्टिंग मॉड्यूल का उपयोग करने के लिए, **आपको अपनी capabilities में कोई अतिरिक्त विकल्प जोड़ने की आवश्यकता नहीं है**। हालांकि, कुछ मामलों में, आप अपने विज़ुअल टेस्ट्स में अतिरिक्त मेटाडेटा जोड़ना चाह सकते हैं, जैसे `logName`।

`logName` आपको प्रत्येक capability को एक कस्टम नाम असाइन करने की अनुमति देता है, जिसे फिर इमेज फ़ाइलनामों में शामिल किया जा सकता है। यह विशेष रूप से विभिन्न ब्राउज़र्स, डिवाइसेज़ या कॉन्फ़िगरेशन में लिए गए स्क्रीनशॉट्स को अलग करने के लिए उपयोगी है।

इसे सक्षम करने के लिए, आप `capabilities` सेक्शन में `logName` को परिभाषित कर सकते हैं और सुनिश्चित कर सकते हैं कि विज़ुअल टेस्टिंग सर्विस में `formatImageName` विकल्प इसे संदर्भित करता है। आप इसे इस प्रकार सेट अप कर सकते हैं:

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Setup
    // =====
    capabilities: [
        {
            browserName: 'chrome',
            'wdio-ics:options': {
                logName: 'chrome-mac-15', // Chrome के लिए कस्टम लॉग नाम
            },
        }
        {
            browserName: 'firefox',
            'wdio-ics:options': {
                logName: 'firefox-mac-15', // Firefox के लिए कस्टम लॉग नाम
            },
        }
    ],
    services: [
        [
            "visual",
            {
                // कुछ विकल्प, अधिक के लिए डॉक्स देखें
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                screenshotPath: path.join(process.cwd(), "tmp"),
                // नीचे दिया गया फ़ॉर्मेट capabilities से `logName` का उपयोग करेगा
                formatImageName: "{tag}-{logName}-{width}x{height}",
                // ... और विकल्प
            },
        ],
    ],
    // ...
};
```

#### यह कैसे काम करता है
1. `logName` सेट अप करना:

    - `capabilities` सेक्शन में, प्रत्येक ब्राउज़र या डिवाइस को एक अद्वितीय `logName` असाइन करें। उदाहरण के लिए, `chrome-mac-15` macOS संस्करण 15 पर Chrome पर चलने वाले टेस्ट्स की पहचान करता है।

2. कस्टम इमेज नामकरण:

    - `formatImageName` विकल्प `logName` को स्क्रीनशॉट फ़ाइलनामों में एकीकृत करता है। उदाहरण के लिए, यदि `tag` homepage है और रिज़ॉल्यूशन `1920x1080` है, तो परिणामी फ़ाइलनाम कुछ इस तरह दिख सकता है:

        `homepage-chrome-mac-15-1920x1080.png`

3. कस्टम नामकरण के लाभ:

    - विभिन्न ब्राउज़र्स या डिवाइसेज़ के स्क्रीनशॉट्स के बीच अंतर करना बहुत आसान हो जाता है, विशेष रूप से बेसलाइन्स को प्रबंधित करते समय और विसंगतियों को डीबग करते समय।

4. डिफ़ॉल्ट्स पर नोट:

    -यदि capabilities में `logName` सेट नहीं है, तो `formatImageName` विकल्प इसे फ़ाइलनामों में एक खाली स्ट्रिंग के रूप में दिखाएगा (`homepage--15-1920x1080.png`)

### WebdriverIO मल्टी-रिमोट

हम [मल्टी-रिमोट](https://webdriver.io/docs/multiremote/) को भी सपोर्ट करते हैं। इसे ठीक से काम करने के लिए सुनिश्चित करें कि आप अपनी
capabilities में `wdio-ics:options` जोड़ें जैसा कि आप नीचे देख सकते हैं। इससे यह सुनिश्चित होगा कि प्रत्येक स्क्रीनशॉट का अपना अद्वितीय नाम होगा।

[अपने टेस्ट्स लिखना](/docs/visual-testing/writing-tests) [टेस्टरनर](https://webdriver.io/docs/testrunner) का उपयोग करने की तुलना में कोई अलग नहीं होगा

```js
// wdio.conf.js
export const config = {
    capabilities: {
        chromeBrowserOne: {
            capabilities: {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: ["disable-infobars"],
                },
                // यह!!!
                "wdio-ics:options": {
                    logName: "chrome-latest-one",
                },
            },
        },
        chromeBrowserTwo: {
            capabilities: {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: ["disable-infobars"],
                },
                // यह!!!
                "wdio-ics:options": {
                    logName: "chrome-latest-two",
                },
            },
        },
    },
};
```

### प्रोग्रामेटिक रूप से चलाना

यहां `remote` विकल्पों के माध्यम से `@wdio/visual-service` का उपयोग करने का एक न्यूनतम उदाहरण है:

```js
import { remote } from "webdriverio";
import VisualService from "@wdio/visual-service";

let visualService = new VisualService({
    autoSaveBaseline: true,
});

const browser = await remote({
    logLevel: "silent",
    capabilities: {
        browserName: "chrome",
    },
});

// `browser` में कस्टम कमांड्स जोड़ने के लिए सर्विस को "शुरू" करें
visualService.remoteSetup(browser);

await browser.url("https://webdriver.io/");

// या केवल स्क्रीनशॉट सेव करने के लिए इसका उपयोग करें
await browser.saveFullPageScreen("examplePaged", {});

// या सत्यापन के लिए इसका उपयोग करें। दोनों मेथड्स को एक साथ उपयोग करने की आवश्यकता नहीं है, FAQ देखें
await browser.checkFullPageScreen("examplePaged", {});

await browser.deleteSession();
```

### वेबसाइट के माध्यम से टैबिंग

आप कीबोर्ड <kbd>TAB</kbd>-की का उपयोग करके जांच सकते हैं कि कोई वेबसाइट सुलभ है या नहीं। एक्सेसिबिलिटी के इस हिस्से का परीक्षण करना हमेशा एक समय लेने वाला (मैन्युअल) काम रहा है और ऑटोमेशन के माध्यम से करना काफी कठिन रहा है।
`saveTabbablePage` और `checkTabbablePage` मेथड्स के साथ, अब आप टैबिंग क्रम को सत्यापित करने के लिए अपनी वेबसाइट पर रेखाएं और बिंदु बना सकते हैं।

इस तथ्य से अवगत रहें कि यह केवल डेस्कटॉप ब्राउज़र्स के लिए उपयोगी है और मोबाइल डिवाइसेज़ के लिए **नहीं\*\***। सभी डेस्कटॉप ब्राउज़र्स इस फ़ीचर को सपोर्ट करते हैं।

:::note

यह काम [Viv Richards](https://github.com/vivrichards600) के ब्लॉग पोस्ट ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript) से प्रेरित है।

टैब करने योग्य एलिमेंट्स को चुनने का तरीका [tabbable](https://github.com/davidtheclark/tabbable) मॉड्यूल पर आधारित है। यदि टैबिंग के संबंध में कोई समस्या है तो कृपया [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) और विशेष रूप से [More ](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details)Details सेक्शन देखें।

:::

#### यह कैसे काम करता है

दोनों मेथड्स आपकी वेबसाइट पर एक `canvas` एलिमेंट बनाएंगे और रेखाएं और बिंदु खींचेंगे ताकि आपको दिखाया जा सके कि यदि कोई एंड-यूज़र TAB का उपयोग करे तो वह कहां जाएगा। उसके बाद, यह आपको फ़्लो का एक अच्छा अवलोकन देने के लिए एक फुल-पेज स्क्रीनशॉट बनाएगा।

:::important

**`saveTabbablePage` का उपयोग केवल तब करें जब आपको स्क्रीनशॉट बनाने की आवश्यकता हो और आप इसकी तुलना **किसी **बेसलाइन** इमेज से नहीं करना चाहते।\*\*\*\*

:::

जब आप टैबिंग फ़्लो की तुलना बेसलाइन से करना चाहते हैं, तो आप `checkTabbablePage`-मेथड का उपयोग कर सकते हैं। आपको दोनों मेथड्स को एक साथ उपयोग करने की **आवश्यकता नहीं** है। यदि पहले से ही एक बेसलाइन इमेज बनाई गई है, जो सर्विस को इंस्टेंशिएट करते समय `autoSaveBaseline: true` प्रदान करके स्वचालित रूप से की जा सकती है,
तो `checkTabbablePage` पहले _वास्तविक_ इमेज बनाएगा और फिर उसकी तुलना बेसलाइन से करेगा।

##### विकल्प

दोनों मेथड्स `saveFullPageScreen` या `compareFullPageScreen` के समान विकल्पों का उपयोग करते हैं।

#### उदाहरण

यह एक उदाहरण है कि हमारी [guinea pig वेबसाइट](https://guinea-pig.webdriver.io/image-compare.html) पर टैबिंग कैसे काम करती है:

![WDIO tabbing example](/img/visual/tabbable-chrome-latest-1366x768.png)

### विफल विज़ुअल स्नैपशॉट्स को स्वचालित रूप से अपडेट करें

कमांड लाइन के माध्यम से आर्गुमेंट `--update-visual-baseline` जोड़कर बेसलाइन इमेजेज़ को अपडेट करें। यह

-   लिए गए वास्तविक स्क्रीनशॉट को स्वचालित रूप से कॉपी करेगा और उसे बेसलाइन फ़ोल्डर में रखेगा
-   यदि अंतर हैं तो यह टेस्ट को पास होने देगा क्योंकि बेसलाइन अपडेट हो गई है

**उपयोग:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

info/debug मोड में लॉग्स चलाते समय आपको निम्नलिखित लॉग्स जुड़े हुए दिखेंगे

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

## Typescript सपोर्ट

इस मॉड्यूल में TypeScript सपोर्ट शामिल है, जो आपको विज़ुअल टेस्टिंग सर्विस का उपयोग करते समय ऑटो-कम्प्लीशन, टाइप सेफ्टी और बेहतर डेवलपर अनुभव का लाभ उठाने की अनुमति देता है।

### चरण 1: टाइप डेफ़िनिशन्स जोड़ें
यह सुनिश्चित करने के लिए कि TypeScript मॉड्यूल टाइप्स को पहचानता है, अपनी tsconfig.json में types फ़ील्ड में निम्नलिखित एंट्री जोड़ें:

```json
{
    "compilerOptions": {
        "types": ["@wdio/visual-service"]
    }
}
```

### चरण 2: सर्विस विकल्पों के लिए टाइप सेफ्टी सक्षम करें
सर्विस विकल्पों पर टाइप चेकिंग लागू करने के लिए, अपनी WebdriverIO कॉन्फ़िगरेशन को अपडेट करें:

```ts
// wdio.conf.ts
import { join } from 'node:path';
// टाइप डेफ़िनिशन इम्पोर्ट करें
import type { VisualServiceOptions } from '@wdio/visual-service';

export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // सर्विस विकल्प
                baselineFolder: join(process.cwd(), './__snapshots__/'),
                formatImageName: '{tag}-{logName}-{width}x{height}',
                screenshotPath: join(process.cwd(), '.tmp/'),
            } satisfies VisualServiceOptions, // टाइप सेफ्टी सुनिश्चित करता है
        ],
    ],
    // ...
};
```

## सिस्टम आवश्यकताएं

### संस्करण 10 और उससे ऊपर (वर्तमान)

संस्करण 10 और उससे ऊपर के लिए, इस मॉड्यूल में सामान्य [प्रोजेक्ट आवश्यकताओं](/docs/gettingstarted#system-requirements) के अलावा कोई अतिरिक्त सिस्टम डिपेंडेंसी नहीं है। यह perceptual इमेज तुलना के लिए [Pixelmatch](https://github.com/mapbox/pixelmatch) और इमेज एन्कोडिंग/डिकोडिंग के लिए [fast-png](https://github.com/image-js/fast-png) का उपयोग करता है। दोनों शुद्ध JavaScript हैं जिनमें शून्य नेटिव डिपेंडेंसी हैं।

संस्करण 11 को WebdriverIO v10 और Node.js 22.19 या बाद के संस्करण की आवश्यकता है, जो WebdriverIO v10 के समान है। संस्करण 10 WebdriverIO v9 (9.29.1 या बाद के) और v10 के साथ काम करता है।

### संस्करण 5 से 9 (लीगेसी)

संस्करण 5 से 9 तक [Jimp](https://github.com/jimp-dev/jimp) का उपयोग किया जाता था, जो Node के लिए पूरी तरह से JavaScript में लिखी गई एक इमेज प्रोसेसिंग लाइब्रेरी है, जिसमें शून्य नेटिव डिपेंडेंसी हैं। किसी अतिरिक्त सिस्टम डिपेंडेंसी की आवश्यकता नहीं थी।

### संस्करण 4 और उससे कम

संस्करण 4 और उससे कम के लिए, यह मॉड्यूल [Canvas](https://github.com/Automattic/node-canvas) पर निर्भर करता है, जो Node.js के लिए एक canvas इम्प्लीमेंटेशन है। Canvas [Cairo](https://cairographics.org/) पर निर्भर करता है।

#### इंस्टॉलेशन विवरण

डिफ़ॉल्ट रूप से, आपके प्रोजेक्ट के `npm install` के दौरान macOS, Linux और Windows के लिए बाइनरीज़ डाउनलोड की जाएंगी। यदि आपके पास समर्थित OS या प्रोसेसर आर्किटेक्चर नहीं है, तो मॉड्यूल आपके सिस्टम पर कंपाइल किया जाएगा। इसके लिए Cairo और Pango सहित कई डिपेंडेंसीज़ की आवश्यकता होती है।

विस्तृत इंस्टॉलेशन जानकारी के लिए, [node-canvas wiki](https://github.com/Automattic/node-canvas/wiki/_pages) देखें। नीचे सामान्य ऑपरेटिंग सिस्टम्स के लिए एक-पंक्ति इंस्टॉलेशन निर्देश दिए गए हैं। ध्यान दें कि `libgif/giflib`, `librsvg`, और `libjpeg` वैकल्पिक हैं और केवल क्रमशः GIF, SVG और JPEG सपोर्ट के लिए आवश्यक हैं। Cairo v1.10.0 या बाद का संस्करण आवश्यक है।

<Tabs
defaultValue="osx"
values={[
{label: 'OS', value: 'osx'},
{label: 'Ubuntu', value: 'ubuntu'},
{label: 'Fedora', value: 'fedora'},
{label: 'Solaris', value: 'solaris'},
{label: 'OpenBSD', value: 'openbsd'},
{label: 'Window', value: 'windows'},
{label: 'Others', value: 'others'},
]}

> <TabItem value="osx">

     [Homebrew](https://brew.sh/) का उपयोग करके:

     ```sh
     brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
     ```

    **Mac OS X v10.11+:** यदि आपने हाल ही में Mac OS X v10.11+ में अपडेट किया है और कंपाइल करते समय समस्या का सामना कर रहे हैं, तो निम्नलिखित कमांड चलाएं: `xcode-select --install`। इस समस्या के बारे में [Stack Overflow पर](http://stackoverflow.com/a/32929012/148072) और पढ़ें।
    यदि आपके पास Xcode 10.0 या उससे ऊपर इंस्टॉल है, तो सोर्स से बिल्ड करने के लिए आपको NPM 6.4.1 या उससे ऊपर की आवश्यकता है।

</TabItem>
<TabItem value="ubuntu">

    ```sh
    sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
    ```

</TabItem>
<TabItem value="fedora">

    ```sh
    sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel
    ```

</TabItem>
<TabItem value="solaris">

    ```sh
    pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto
    ```

</TabItem>
<TabItem value="openbsd">

    ```sh
    doas pkg_add cairo pango png jpeg giflib
    ```

</TabItem>
<TabItem value="windows">

    [wiki](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows) देखें

</TabItem>
<TabItem value="others">

    [wiki](https://github.com/Automattic/node-canvas/wiki) देखें

</TabItem>
</Tabs>