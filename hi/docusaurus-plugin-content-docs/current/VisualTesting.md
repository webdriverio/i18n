---
id: visual-testing
title: विज़ुअल टेस्टिंग
description: "@wdio/visual-service के साथ स्क्रीन, एलिमेंट्स या फुल पेज के स्क्रीनशॉट की बेसलाइन से तुलना करें, जिसमें इंस्टॉलेशन और उपयोग शामिल है।"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## यह क्या कर सकता है?

WebdriverIO स्क्रीन, एलिमेंट्स या फुल-पेज पर इमेज तुलना प्रदान करता है, निम्नलिखित के लिए

-   🖥️ डेस्कटॉप ब्राउज़र (Chrome / Firefox / Safari / Microsoft Edge)
-   📱 मोबाइल / टैबलेट ब्राउज़र (Android एमुलेटर पर Chrome / iOS सिमुलेटर पर Safari / सिमुलेटर / वास्तविक डिवाइस) Appium के माध्यम से
-   📱 नेटिव ऐप्स (Android एमुलेटर / iOS सिमुलेटर / वास्तविक डिवाइस) Appium के माध्यम से (🌟 **नया** 🌟)
-   📳 हाइब्रिड ऐप्स Appium के माध्यम से

[`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service) के माध्यम से, जो एक हल्की WebdriverIO सर्विस है।

यह आपको निम्नलिखित करने की अनुमति देता है:

-   **स्क्रीन/एलिमेंट्स/फुल-पेज** स्क्रीन को बेसलाइन के विरुद्ध सहेजना या तुलना करना
-   जब कोई बेसलाइन मौजूद न हो तो स्वचालित रूप से **बेसलाइन बनाना**
-   तुलना के दौरान **कस्टम क्षेत्रों को ब्लॉक करना** और यहां तक कि स्टेटस बार और/या टूलबार को **स्वचालित रूप से बाहर करना** (केवल मोबाइल)
-   एलिमेंट स्क्रीनशॉट के आयाम बढ़ाना
-   वेबसाइट तुलना के दौरान **टेक्स्ट छिपाना** ताकि:
    -   **स्थिरता में सुधार** हो और फ़ॉन्ट रेंडरिंग की अस्थिरता को रोका जा सके
    -   केवल वेबसाइट के **लेआउट** पर ध्यान केंद्रित किया जा सके
-   बेहतर पठनीय टेस्ट के लिए **विभिन्न तुलना विधियों** और **अतिरिक्त मैचर्स** के एक सेट का उपयोग करना
-   सत्यापित करना कि आपकी वेबसाइट **आपके कीबोर्ड से टैबिंग को कैसे सपोर्ट करेगी)**, यह भी देखें [वेबसाइट के माध्यम से टैबिंग](#tabbing-through-a-website)
-   और भी बहुत कुछ, [सर्विस](./visual-testing/service-options) और [मेथड](./visual-testing/method-options) विकल्प देखें

यह सर्विस सभी ब्राउज़र/डिवाइस के लिए आवश्यक डेटा और स्क्रीनशॉट प्राप्त करने के लिए एक हल्का मॉड्यूल है। तुलना की शक्ति [Pixelmatch](https://github.com/mapbox/pixelmatch) से आती है, जो YIQ कलर स्पेस का उपयोग करने वाली एक तेज़ और सटीक पर्सेप्चुअल इमेज तुलना लाइब्रेरी है। इमेज को [fast-png](https://github.com/image-js/fast-png) के साथ प्रोसेस किया जाता है, जो शून्य नेटिव डिपेंडेंसी वाला एक PNG कोडेक है।

:::info नेटिव/हाइब्रिड ऐप्स के लिए नोट
मेथड `saveScreen`, `saveElement`, `checkScreen`, `checkElement` और मैचर्स `toMatchScreenSnapshot` और `toMatchElementSnapshot` का उपयोग नेटिव ऐप्स/कॉन्टेक्स्ट के लिए किया जा सकता है।

जब आप इसे हाइब्रिड ऐप्स के लिए उपयोग करना चाहते हैं तो कृपया अपनी सर्विस सेटिंग्स में प्रॉपर्टी `isHybridApp:true` का उपयोग करें।
:::

:::caution v9 (या उससे कम) से अपग्रेड कर रहे हैं?

`@wdio/visual-service` **v10** ने तुलना इंजन को **ResembleJS** से **[Pixelmatch](https://github.com/mapbox/pixelmatch)** में बदल दिया है। Pixelmatch रॉ RGB के बजाय एक पर्सेप्चुअल (YIQ) कलर मॉडल का उपयोग करता है, इसलिए मिसमैच प्रतिशत v9 से भिन्न होंगे। इसका अर्थ है:

-   **आपके टेस्ट कोड को बदलने की आवश्यकता नहीं है।** सभी मेथड नाम, विकल्प नाम और मैचर्स समान हैं।
-   **आपकी बेसलाइन इमेज को अपडेट करने की आवश्यकता हो सकती है।** अपग्रेड करने के बाद, अपना टेस्ट सूट चलाएं और किसी भी विज़ुअल डिफ़ की समीक्षा करें। आप `--update-visual-baseline` के साथ व्यक्तिगत विफल बेसलाइन को अपडेट कर सकते हैं, या अपना पूरा बेसलाइन फ़ोल्डर हटा सकते हैं और `autoSaveBaseline` को इसे शुरू से फिर से बनाने दे सकते हैं। विवरण के लिए [FAQ](/docs/visual-testing/faq#my-visual-tests-fail-with-a-difference-how-can-i-update-my-baseline) देखें।

:::

## इंस्टॉलेशन

सबसे आसान तरीका है `@wdio/visual-service` को अपने `package.json` में dev-dependency के रूप में रखना, इसके माध्यम से:

```sh
npm install --save-dev @wdio/visual-service
```

## उपयोग

`@wdio/visual-service` का उपयोग एक सामान्य सर्विस के रूप में किया जा सकता है। आप इसे अपनी कॉन्फ़िगरेशन फ़ाइल में निम्नलिखित के साथ सेट कर सकते हैं:

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

एक बार अपने WebdriverIO कॉन्फ़िगरेशन में सेट करने के बाद, आप आगे बढ़कर [अपने टेस्ट](/docs/visual-testing/writing-tests) में विज़ुअल असर्शन जोड़ सकते हैं।

### Capabilities
विज़ुअल टेस्टिंग मॉड्यूल का उपयोग करने के लिए, **आपको अपनी capabilities में कोई अतिरिक्त विकल्प जोड़ने की आवश्यकता नहीं है**। हालांकि, कुछ मामलों में, आप अपने विज़ुअल टेस्ट में अतिरिक्त मेटाडेटा जोड़ना चाह सकते हैं, जैसे कि `logName`।

`logName` आपको प्रत्येक capability को एक कस्टम नाम असाइन करने की अनुमति देता है, जिसे फिर इमेज फ़ाइलनामों में शामिल किया जा सकता है। यह विशेष रूप से विभिन्न ब्राउज़र, डिवाइस या कॉन्फ़िगरेशन में लिए गए स्क्रीनशॉट को अलग करने के लिए उपयोगी है।

इसे सक्षम करने के लिए, आप `capabilities` सेक्शन में `logName` को परिभाषित कर सकते हैं और सुनिश्चित कर सकते हैं कि विज़ुअल टेस्टिंग सर्विस में `formatImageName` विकल्प इसका संदर्भ देता है। यहां बताया गया है कि आप इसे कैसे सेट कर सकते हैं:

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
1. `logName` सेट करना:

    - `capabilities` सेक्शन में, प्रत्येक ब्राउज़र या डिवाइस को एक अद्वितीय `logName` असाइन करें। उदाहरण के लिए, `chrome-mac-15` macOS संस्करण 15 पर Chrome पर चल रहे टेस्ट की पहचान करता है।

2. कस्टम इमेज नामकरण:

    - `formatImageName` विकल्प `logName` को स्क्रीनशॉट फ़ाइलनामों में एकीकृत करता है। उदाहरण के लिए, यदि `tag` homepage है और रिज़ॉल्यूशन `1920x1080` है, तो परिणामी फ़ाइलनाम कुछ इस तरह दिख सकता है:

        `homepage-chrome-mac-15-1920x1080.png`

3. कस्टम नामकरण के लाभ:

    - विभिन्न ब्राउज़र या डिवाइस के स्क्रीनशॉट के बीच अंतर करना बहुत आसान हो जाता है, विशेष रूप से बेसलाइन प्रबंधित करते समय और विसंगतियों को डीबग करते समय।

4. डिफ़ॉल्ट पर नोट:

    -यदि capabilities में `logName` सेट नहीं है, तो `formatImageName` विकल्प फ़ाइलनामों में इसे एक खाली स्ट्रिंग के रूप में दिखाएगा (`homepage--15-1920x1080.png`)

### WebdriverIO मल्टी-रिमोट

हम [मल्टी-रिमोट](https://webdriver.io/docs/multiremote/) को भी सपोर्ट करते हैं। इसे ठीक से काम करने के लिए सुनिश्चित करें कि आप अपनी
capabilities में `wdio-ics:options` जोड़ें जैसा कि आप नीचे देख सकते हैं। यह सुनिश्चित करेगा कि प्रत्येक स्क्रीनशॉट का अपना अद्वितीय नाम होगा।

[अपने टेस्ट लिखना](/docs/visual-testing/writing-tests) [टेस्टरनर](https://webdriver.io/docs/testrunner) का उपयोग करने की तुलना में कोई अलग नहीं होगा

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

// `browser` में कस्टम कमांड जोड़ने के लिए सर्विस को "Start" करें
visualService.remoteSetup(browser);

await browser.url("https://webdriver.io/");

// या केवल स्क्रीनशॉट सहेजने के लिए इसका उपयोग करें
await browser.saveFullPageScreen("examplePaged", {});

// या सत्यापन के लिए इसका उपयोग करें। दोनों मेथड को एक साथ उपयोग करने की आवश्यकता नहीं है, FAQ देखें
await browser.checkFullPageScreen("examplePaged", {});

await browser.deleteSession();
```

### वेबसाइट के माध्यम से टैबिंग

आप कीबोर्ड की <kbd>TAB</kbd>-की का उपयोग करके जांच सकते हैं कि कोई वेबसाइट सुलभ है या नहीं। एक्सेसिबिलिटी के इस हिस्से का परीक्षण हमेशा एक समय लेने वाला (मैनुअल) काम रहा है और ऑटोमेशन के माध्यम से करना काफी कठिन रहा है।
`saveTabbablePage` और `checkTabbablePage` मेथड के साथ, अब आप टैबिंग क्रम को सत्यापित करने के लिए अपनी वेबसाइट पर रेखाएं और बिंदु बना सकते हैं।

इस तथ्य से अवगत रहें कि यह केवल डेस्कटॉप ब्राउज़र के लिए उपयोगी है और मोबाइल डिवाइस के लिए **नहीं\*\***। सभी डेस्कटॉप ब्राउज़र इस सुविधा को सपोर्ट करते हैं।

:::note

यह काम [Viv Richards](https://github.com/vivrichards600) के ब्लॉग पोस्ट ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript) से प्रेरित है।

टैब करने योग्य एलिमेंट्स को चुनने का तरीका मॉड्यूल [tabbable](https://github.com/davidtheclark/tabbable) पर आधारित है। यदि टैबिंग के संबंध में कोई समस्या है तो कृपया [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) और विशेष रूप से [More ](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details)Details सेक्शन देखें।

:::

#### यह कैसे काम करता है

दोनों मेथड आपकी वेबसाइट पर एक `canvas` एलिमेंट बनाएंगे और रेखाएं और बिंदु बनाएंगे ताकि आपको दिखाया जा सके कि यदि कोई एंड-यूज़र TAB का उपयोग करता है तो वह कहां जाएगा। उसके बाद, यह आपको फ्लो का एक अच्छा अवलोकन देने के लिए एक फुल-पेज स्क्रीनशॉट बनाएगा।

:::important

**`saveTabbablePage` का उपयोग केवल तभी करें जब आपको स्क्रीनशॉट बनाने की आवश्यकता हो और आप इसकी तुलना **किसी **बेसलाइन** इमेज से नहीं करना चाहते।\*\*\*\*

:::

जब आप टैबिंग फ्लो की तुलना बेसलाइन से करना चाहते हैं, तो आप `checkTabbablePage`-मेथड का उपयोग कर सकते हैं। आपको दोनों मेथड को एक साथ उपयोग करने की **आवश्यकता नहीं** है। यदि पहले से ही एक बेसलाइन इमेज बनाई गई है, जो सर्विस को इंस्टेंशिएट करते समय `autoSaveBaseline: true` प्रदान करके स्वचालित रूप से की जा सकती है,
तो `checkTabbablePage` पहले _वास्तविक_ इमेज बनाएगा और फिर इसकी तुलना बेसलाइन से करेगा।

##### विकल्प

दोनों मेथड `saveFullPageScreen` या `compareFullPageScreen` के समान विकल्पों का उपयोग करते हैं।

#### उदाहरण

यह एक उदाहरण है कि हमारी [गिनी पिग वेबसाइट](https://guinea-pig.webdriver.io/image-compare.html) पर टैबिंग कैसे काम करती है:

![WDIO tabbing example](/img/visual/tabbable-chrome-latest-1366x768.png)

### विफल विज़ुअल स्नैपशॉट को स्वचालित रूप से अपडेट करें

`--update-visual-baseline` आर्गुमेंट जोड़कर कमांड लाइन के माध्यम से बेसलाइन इमेज को अपडेट करें। यह

-   लिए गए वास्तविक स्क्रीनशॉट को स्वचालित रूप से कॉपी करेगा और इसे बेसलाइन फ़ोल्डर में रखेगा
-   यदि अंतर हैं तो यह टेस्ट को पास होने देगा क्योंकि बेसलाइन अपडेट हो गई है

**उपयोग:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

info/debug मोड में लॉग चलाते समय आपको निम्नलिखित लॉग जोड़े गए दिखाई देंगे

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

### चरण 1: टाइप डेफ़िनिशन जोड़ें
यह सुनिश्चित करने के लिए कि TypeScript मॉड्यूल टाइप्स को पहचाने, अपनी tsconfig.json में types फ़ील्ड में निम्नलिखित एंट्री जोड़ें:

```json
{
    "compilerOptions": {
        "types": ["@wdio/visual-service"]
    }
}
```

### चरण 2: सर्विस विकल्पों के लिए टाइप सेफ्टी सक्षम करें
सर्विस विकल्पों पर टाइप चेकिंग लागू करने के लिए, अपने WebdriverIO कॉन्फ़िगरेशन को अपडेट करें:

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

### संस्करण 10 और ऊपर (वर्तमान)

संस्करण 10 और ऊपर के लिए, इस मॉड्यूल की सामान्य [प्रोजेक्ट आवश्यकताओं](/docs/gettingstarted#system-requirements) के अलावा कोई अतिरिक्त सिस्टम डिपेंडेंसी नहीं है। यह पर्सेप्चुअल इमेज तुलना के लिए [Pixelmatch](https://github.com/mapbox/pixelmatch) और इमेज एन्कोडिंग/डिकोडिंग के लिए [fast-png](https://github.com/image-js/fast-png) का उपयोग करता है। दोनों शून्य नेटिव डिपेंडेंसी के साथ शुद्ध JavaScript हैं।

### संस्करण 5 से 9 (लीगेसी)

संस्करण 5 से 9 ने [Jimp](https://github.com/jimp-dev/jimp) का उपयोग किया, जो पूरी तरह से JavaScript में लिखी गई Node के लिए एक इमेज प्रोसेसिंग लाइब्रेरी है, जिसमें शून्य नेटिव डिपेंडेंसी हैं। किसी अतिरिक्त सिस्टम डिपेंडेंसी की आवश्यकता नहीं थी।

### संस्करण 4 और उससे कम

संस्करण 4 और उससे कम के लिए, यह मॉड्यूल [Canvas](https://github.com/Automattic/node-canvas) पर निर्भर करता है, जो Node.js के लिए एक canvas इम्प्लीमेंटेशन है। Canvas [Cairo](https://cairographics.org/) पर निर्भर करता है।

#### इंस्टॉलेशन विवरण

डिफ़ॉल्ट रूप से, आपके प्रोजेक्ट के `npm install` के दौरान macOS, Linux और Windows के लिए बाइनरी डाउनलोड की जाएंगी। यदि आपके पास समर्थित OS या प्रोसेसर आर्किटेक्चर नहीं है, तो मॉड्यूल आपके सिस्टम पर कंपाइल किया जाएगा। इसके लिए Cairo और Pango सहित कई डिपेंडेंसी की आवश्यकता होती है।

विस्तृत इंस्टॉलेशन जानकारी के लिए, [node-canvas wiki](https://github.com/Automattic/node-canvas/wiki/_pages) देखें। नीचे सामान्य ऑपरेटिंग सिस्टम के लिए एक-पंक्ति इंस्टॉलेशन निर्देश दिए गए हैं। ध्यान दें कि `libgif/giflib`, `librsvg`, और `libjpeg` वैकल्पिक हैं और केवल क्रमशः GIF, SVG और JPEG सपोर्ट के लिए आवश्यक हैं। Cairo v1.10.0 या उसके बाद का संस्करण आवश्यक है।

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
    यदि आपके पास Xcode 10.0 या उससे अधिक इंस्टॉल है, तो सोर्स से बिल्ड करने के लिए आपको NPM 6.4.1 या उससे अधिक की आवश्यकता है।

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