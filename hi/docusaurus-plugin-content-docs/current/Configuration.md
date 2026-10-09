---
id: configuration
title: कॉन्फ़िगरेशन
description: "WebDriver, स्टैंडअलोन WebdriverIO और WDIO टेस्टरनर के सभी कॉन्फ़िगरेशन विकल्प देखें, जिनमें सभी टेस्टरनर हुक्स भी शामिल हैं।"
---

[सेटअप प्रकार](/docs/setuptypes) के आधार पर (जैसे रॉ प्रोटोकॉल बाइंडिंग्स, स्टैंडअलोन पैकेज के रूप में WebdriverIO या WDIO टेस्टरनर का उपयोग करना) वातावरण को नियंत्रित करने के लिए विकल्पों का एक अलग सेट उपलब्ध होता है।

## WebDriver विकल्प

[`webdriver`](https://www.npmjs.com/package/webdriver) प्रोटोकॉल पैकेज का उपयोग करते समय निम्नलिखित विकल्प परिभाषित होते हैं:

### protocol

<Option type="String" default="http">

ड्राइवर सर्वर के साथ संचार करते समय उपयोग किया जाने वाला प्रोटोकॉल।

</Option>

### hostname

<Option type="String" default="0.0.0.0">

आपके ड्राइवर सर्वर का होस्ट।

</Option>

### port

<Option type="Number" default="undefined">

वह पोर्ट जिस पर आपका ड्राइवर सर्वर चल रहा है।

</Option>

### path

<Option type="String" default="/">

ड्राइवर सर्वर एंडपॉइंट का पाथ।

</Option>

### queryParams

<Option type="Object" default="undefined">

क्वेरी पैरामीटर्स जो ड्राइवर सर्वर तक भेजे जाते हैं।

</Option>

### user

<Option type="String" default="undefined">

आपकी क्लाउड सेवा का यूज़रनेम (केवल [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) या [TestMu AI](https://www.testmuai.com/) खातों के लिए काम करता है)। यदि सेट किया गया है, तो WebdriverIO आपके लिए कनेक्शन विकल्प स्वचालित रूप से सेट कर देगा। यदि आप किसी क्लाउड प्रोवाइडर का उपयोग नहीं करते हैं, तो इसका उपयोग किसी अन्य WebDriver बैकएंड को प्रमाणित करने के लिए किया जा सकता है।

</Option>

### key

<Option type="String" default="undefined">

आपकी क्लाउड सेवा की एक्सेस की या सीक्रेट की (केवल [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) या [TestMu AI](https://www.testmuai.com/) खातों के लिए काम करता है)। यदि सेट किया गया है, तो WebdriverIO आपके लिए कनेक्शन विकल्प स्वचालित रूप से सेट कर देगा। यदि आप किसी क्लाउड प्रोवाइडर का उपयोग नहीं करते हैं, तो इसका उपयोग किसी अन्य WebDriver बैकएंड को प्रमाणित करने के लिए किया जा सकता है।

</Option>

### capabilities

<Option type="Object" default="null">

उन capabilities को परिभाषित करता है जिन्हें आप अपने WebDriver सेशन में चलाना चाहते हैं। अधिक जानकारी के लिए [WebDriver Protocol](https://w3c.github.io/webdriver/#capabilities) देखें।

WebDriver आधारित capabilities के अलावा, आप ब्राउज़र और वेंडर विशिष्ट विकल्प लागू कर सकते हैं जो रिमोट ब्राउज़र या डिवाइस के गहन कॉन्फ़िगरेशन की अनुमति देते हैं। ये संबंधित वेंडर डॉक्स में प्रलेखित हैं, जैसे:

- `goog:chromeOptions`: [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106) के लिए
- `moz:firefoxOptions`: [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html) के लिए
- `ms:edgeOptions`: [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class) के लिए
- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional) के लिए
- `bstack:options`: [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#) के लिए
- `selenoid:options`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc) के लिए

इसके अतिरिक्त, एक उपयोगी टूल Sauce Labs का [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) है, जो आपकी इच्छित capabilities को क्लिक करके चुनने के माध्यम से यह ऑब्जेक्ट बनाने में आपकी मदद करता है।

</Option>
**उदाहरण:**

```js
{
    browserName: 'chrome', // विकल्प: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // ब्राउज़र संस्करण
    platformName: 'Windows 10' // OS प्लेटफ़ॉर्म
}
```

यदि आप मोबाइल डिवाइसों पर वेब या नेटिव टेस्ट चला रहे हैं, तो `capabilities` WebDriver प्रोटोकॉल से भिन्न होती हैं। अधिक जानकारी के लिए [Appium Docs](https://appium.io/docs/en/latest/guides/caps/) देखें।

### logLevel

<Option type="String" default="info" values="trace | debug | info | warn | error | silent">

लॉगिंग विस्तार का स्तर।

</Option>

### outputDir

<Option type="String" default="null">

सभी टेस्टरनर लॉग फ़ाइलों (रिपोर्टर लॉग और `wdio` लॉग सहित) को संग्रहीत करने के लिए डायरेक्टरी। यदि सेट नहीं है, तो सभी लॉग `stdout` पर स्ट्रीम किए जाते हैं। चूंकि अधिकांश रिपोर्टर `stdout` पर लॉग करने के लिए बनाए गए हैं, इसलिए इस विकल्प का उपयोग केवल उन विशिष्ट रिपोर्टर्स के लिए करने की सलाह दी जाती है जहां रिपोर्ट को फ़ाइल में भेजना अधिक उपयुक्त हो (उदाहरण के लिए, `junit` रिपोर्टर)।

स्टैंडअलोन मोड में चलाने पर, WebdriverIO द्वारा उत्पन्न एकमात्र लॉग `wdio` लॉग होगा।

</Option>

### connectionRetryTimeout

<Option type="Number" default="120000">

किसी ड्राइवर या ग्रिड को भेजे गए किसी भी WebDriver अनुरोध के लिए टाइमआउट।

</Option>

### connectionRetryCount

<Option type="Number" default="3">

Selenium सर्वर को अनुरोध दोबारा भेजने की अधिकतम संख्या।

</Option>

### bidiResponseTimeout

<Option type="Number" default="180000">

किसी WebDriver Bidi कमांड को ब्राउज़र से प्रतिक्रिया प्राप्त करने के लिए टाइमआउट (ms में)। यदि आप ऐसी कमांड चलाते हैं, जैसे [`execute`](/docs/api/browser/execute), जिन्हें पूरा होने में वास्तव में डिफ़ॉल्ट से अधिक समय लगता है, तो इसे बढ़ाएं, अन्यथा WebdriverIO ब्राउज़र के काम पूरा करने से पहले ही प्रतीक्षा करना छोड़ देगा।

</Option>

### agent

<Option type="Object" default={`{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}`}>

अनुरोध करने के लिए आपको एक कस्टम ` http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) का उपयोग करने की अनुमति देता है।

</Option>

### headers

<Option type="Object" default={`{}`}>

प्रत्येक WebDriver अनुरोध में भेजने के लिए कस्टम `headers` निर्दिष्ट करें। यदि आपके Selenium Grid को Basic Authentication की आवश्यकता है, तो हम आपके WebDriver अनुरोधों को प्रमाणित करने के लिए इस विकल्प के माध्यम से एक `Authorization` हेडर भेजने की सलाह देते हैं, जैसे:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// एनवायरनमेंट वेरिएबल्स से यूज़रनेम और पासवर्ड पढ़ें
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// यूज़रनेम और पासवर्ड को कोलन विभाजक के साथ जोड़ें
const credentials = `${username}:${password}`;
// Base64 का उपयोग करके क्रेडेंशियल्स को एन्कोड करें
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

</Option>

### transformRequest

<Option type="(RequestOptions) => RequestOptions" default="none">

WebDriver अनुरोध किए जाने से पहले [HTTP request options](https://github.com/sindresorhus/got#options) को इंटरसेप्ट करने वाला फ़ंक्शन

</Option>

### transformResponse

<Option type="(Response, RequestOptions) => Response" default="none">

WebDriver प्रतिक्रिया आने के बाद HTTP response ऑब्जेक्ट्स को इंटरसेप्ट करने वाला फ़ंक्शन। इस फ़ंक्शन को पहले आर्गुमेंट के रूप में मूल response ऑब्जेक्ट और दूसरे आर्गुमेंट के रूप में संबंधित `RequestOptions` दिया जाता है।

</Option>

### strictSSL

<Option type="Boolean" default="true">

क्या SSL सर्टिफ़िकेट का वैध होना आवश्यक नहीं है।
इसे एनवायरनमेंट वेरिएबल्स `STRICT_SSL` या `strict_ssl` के माध्यम से सेट किया जा सकता है।

</Option>

### enableDirectConnect

<Option type="Boolean" default="true">

क्या [Appium direct connection feature](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) को सक्षम करना है।
यदि फ़्लैग सक्षम होने पर प्रतिक्रिया में उचित keys नहीं हैं, तो यह कुछ नहीं करता।

</Option>

### cacheDir

<Option type="String" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

कैश डायरेक्टरी के रूट का पाथ। इस डायरेक्टरी का उपयोग उन सभी ड्राइवरों को संग्रहीत करने के लिए किया जाता है जो सेशन शुरू करने का प्रयास करते समय डाउनलोड किए जाते हैं।

</Option>

### maskingPatterns

<Option type="String" default="undefined">

अधिक सुरक्षित लॉगिंग के लिए, `maskingPatterns` के साथ सेट किए गए रेगुलर एक्सप्रेशन लॉग से संवेदनशील जानकारी को छिपा सकते हैं।
 - स्ट्रिंग फ़ॉर्मेट फ़्लैग्स के साथ या बिना (जैसे `/.../i`) एक रेगुलर एक्सप्रेशन है, और कई रेगुलर एक्सप्रेशन के लिए कॉमा से अलग किया जाता है।
 - मास्किंग पैटर्न्स के बारे में अधिक जानकारी के लिए, [WDIO Logger README में Masking Patterns अनुभाग](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns) देखें।

</Option>
**उदाहरण:**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

## WebdriverIO

निम्नलिखित विकल्प (ऊपर सूचीबद्ध विकल्पों सहित) स्टैंडअलोन WebdriverIO के साथ उपयोग किए जा सकते हैं:

### automationProtocol

<Option type="String" default="webdriver">

वह प्रोटोकॉल परिभाषित करें जिसे आप अपने ब्राउज़र ऑटोमेशन के लिए उपयोग करना चाहते हैं। वर्तमान में केवल [`webdriver`](https://www.npmjs.com/package/webdriver) समर्थित है, क्योंकि यह मुख्य ब्राउज़र ऑटोमेशन तकनीक है जिसका WebdriverIO उपयोग करता है।

यदि आप किसी अलग ऑटोमेशन तकनीक का उपयोग करके ब्राउज़र को ऑटोमेट करना चाहते हैं, तो सुनिश्चित करें कि आप इस प्रॉपर्टी को एक ऐसे पाथ पर सेट करें जो एक ऐसे मॉड्यूल को रिज़ॉल्व करता हो जो निम्नलिखित इंटरफ़ेस का पालन करता है:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * एक ऑटोमेशन सेशन शुरू करें और संबंधित ऑटोमेशन कमांड्स के साथ एक WebdriverIO [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * लौटाएं। संदर्भ कार्यान्वयन के रूप में [webdriver](https://www.npmjs.com/package/webdriver) पैकेज
     * देखें
     *
     * @param {Capabilities.RemoteConfig} options WebdriverIO विकल्प
     * @param {Function} hook जो क्लाइंट को फ़ंक्शन से रिलीज़ होने से पहले संशोधित करने की अनुमति देता है
     * @param {PropertyDescriptorMap} userPrototype उपयोगकर्ता को कस्टम प्रोटोकॉल कमांड्स जोड़ने की अनुमति देता है
     * @param {Function} customCommandWrapper कमांड निष्पादन को संशोधित करने की अनुमति देता है
     * @returns एक WebdriverIO संगत क्लाइंट इंस्टेंस
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * उपयोगकर्ता को मौजूदा सेशन्स से जुड़ने की अनुमति देता है
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * नए सेशन के लिए इंस्टेंस की session id और ब्राउज़र capabilities को
     * सीधे पास किए गए browser ऑब्जेक्ट में बदलता है
     *
     * @optional
     * @param   {object} instance  नए ब्राउज़र सेशन से प्राप्त ऑब्जेक्ट।
     * @returns {string}           ब्राउज़र की नई session id
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

</Option>

### baseUrl

<Option type="String" default="null">

एक बेस URL सेट करके `url` कमांड कॉल्स को छोटा करें।
- यदि आपका `url` पैरामीटर `/` से शुरू होता है, तो `baseUrl` आगे जोड़ा जाता है (`baseUrl` पाथ को छोड़कर, यदि उसमें कोई है)।
- यदि आपका `url` पैरामीटर किसी स्कीम या `/` के बिना शुरू होता है (जैसे `some/path`), तो पूरा `baseUrl` सीधे आगे जोड़ा जाता है।

</Option>

### waitforTimeout

<Option type="Number" default="5000">

सभी `waitFor*` कमांड्स के लिए डिफ़ॉल्ट टाइमआउट। (विकल्प के नाम में छोटे अक्षर `f` पर ध्यान दें।) यह टाइमआउट __केवल__ `waitFor*` से शुरू होने वाली कमांड्स और उनके डिफ़ॉल्ट प्रतीक्षा समय को प्रभावित करता है।

किसी _टेस्ट_ के लिए टाइमआउट बढ़ाने हेतु, कृपया फ़्रेमवर्क डॉक्स देखें।

</Option>

### waitforInterval

<Option type="Number" default="100">

सभी `waitFor*` कमांड्स के लिए डिफ़ॉल्ट अंतराल, यह जांचने के लिए कि कोई अपेक्षित स्थिति (जैसे, दृश्यता) बदली है या नहीं।

</Option>

### strictSelectors

<Option type="Boolean" default="true">

जब दिया गया सेलेक्टर एक से अधिक एलिमेंट्स पर रिज़ॉल्व होता है, तो पहले मिलान का चुपचाप उपयोग करने के बजाय [`$`](/docs/api/browser/$) कमांड को `StrictSelectorError` थ्रो करने देता है। `$$` इससे अप्रभावित रहता है।

आप दूसरे आर्गुमेंट के रूप में `{ strict: false }` पास करके किसी एक क्वेरी के लिए इससे बाहर निकल सकते हैं, जैसे `$('button', { strict: false })`।

विवरण के लिए [Selectors](/docs/selectors#strict-mode) गाइड देखें।

</Option>

### maxSpyCollectedBodySize

<Option type="Number" default="10485760 (10MB)">

[`mock`](/docs/api/browser/mock) कमांड का उपयोग करते समय लौटाई जा सकने वाली response body का अधिकतम आकार (बाइट्स में)। स्पाई किए गए पेलोड के डेटा संग्रह को अक्षम करने के लिए `0` का उपयोग करें।

</Option>

### region

<Option type="String" default="us" values="us | eu | us-west-1 | eu-central-1 | us-east-4 | asia-south-2 | staging">

यदि Sauce Labs पर चला रहे हैं, तो आप विभिन्न डेटा सेंटरों के बीच टेस्ट चलाने का विकल्प चुन सकते हैं।
छोटे रीजन हैंडल `us` (डिफ़ॉल्ट, `us-west-1` से मैप होता है) या `eu` (`eu-central-1` से मैप होता है) का उपयोग करें, या सीधे पूरे रीजन नामों का उपयोग करें।

__नोट:__ इसका प्रभाव केवल तभी होता है जब आप `user` और `key` विकल्प प्रदान करते हैं जो आपके Sauce Labs खाते से जुड़े हैं।

</Option>
*(केवल vm और या em/simulators के लिए, `us-east-4` और `asia-south-2` को छोड़कर जो केवल रियल डिवाइस होस्ट करते हैं)*

## टेस्टरनर विकल्प

निम्नलिखित विकल्प (ऊपर सूचीबद्ध विकल्पों सहित) केवल WDIO टेस्टरनर के साथ WebdriverIO चलाने के लिए परिभाषित हैं:

### specs

<Option type="(String | String[])[]" default="[]">

टेस्ट निष्पादन के लिए specs परिभाषित करें। आप एक साथ कई फ़ाइलों से मिलान करने के लिए एक glob पैटर्न निर्दिष्ट कर सकते हैं, या किसी glob या पाथ्स के सेट को एक array में रैप कर सकते हैं ताकि उन्हें एक ही वर्कर प्रोसेस में चलाया जा सके। सभी पाथ्स को कॉन्फ़िग फ़ाइल पाथ के सापेक्ष माना जाता है।

</Option>

### exclude

<Option type="String[]" default="[]">

टेस्ट निष्पादन से specs को बाहर रखें। सभी पाथ्स को कॉन्फ़िग फ़ाइल पाथ के सापेक्ष माना जाता है।

</Option>

### suites

<Option type="Object" default={`{}`}>

विभिन्न suites का वर्णन करने वाला एक ऑब्जेक्ट, जिन्हें आप फिर `wdio` CLI पर `--suite` विकल्प के साथ निर्दिष्ट कर सकते हैं।

</Option>

### capabilities

<Option type="Object|Object[]" default={`[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`}>

ऊपर वर्णित `capabilities` अनुभाग के समान, सिवाय इसके कि इसमें या तो एक [multi-remote](/docs/multiremote) ऑब्जेक्ट, या समानांतर निष्पादन के लिए एक array में कई WebDriver सेशन्स निर्दिष्ट करने का विकल्प है।

आप [ऊपर](/docs/configuration#capabilities) परिभाषित वेंडर और ब्राउज़र विशिष्ट capabilities को ही लागू कर सकते हैं।

</Option>

### maxInstances

<Option type="Number" default="100">

समानांतर रूप से चलने वाले कुल वर्कर्स की अधिकतम संख्या।

__नोट:__ जब टेस्ट कुछ बाहरी वेंडर्स जैसे Sauce Labs की मशीनों पर किए जा रहे हों, तो यह `100` जितनी बड़ी संख्या हो सकती है। वहां, टेस्ट एक ही मशीन पर नहीं, बल्कि कई VMs पर चलाए जाते हैं। यदि टेस्ट एक स्थानीय डेवलपमेंट मशीन पर चलाए जाने हैं, तो अधिक उचित संख्या का उपयोग करें, जैसे `3`, `4`, या `5`। मूल रूप से, यह उन ब्राउज़रों की संख्या है जो एक साथ शुरू होंगे और एक ही समय पर आपके टेस्ट चलाएंगे, इसलिए यह इस पर निर्भर करता है कि आपकी मशीन में कितनी RAM है, और आपकी मशीन पर कितने अन्य ऐप्स चल रहे हैं।

आप `wdio:maxInstances` capability का उपयोग करके अपने capability ऑब्जेक्ट्स के भीतर भी `maxInstances` लागू कर सकते हैं। यह उस विशेष capability के लिए समानांतर सेशन्स की संख्या को सीमित करेगा।

</Option>

### maxInstancesPerCapability

<Option type="Number" default="100">

प्रति capability समानांतर रूप से चलने वाले कुल वर्कर्स की अधिकतम संख्या।

</Option>

### injectGlobals

<Option type="Boolean" default="true">

WebdriverIO के globals (जैसे `browser`, `$` और `$$`) को ग्लोबल एनवायरनमेंट में डालता है।
यदि आप इसे `false` पर सेट करते हैं, तो आपको `@wdio/globals` से इम्पोर्ट करना चाहिए, जैसे:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

नोट: WebdriverIO टेस्ट फ़्रेमवर्क विशिष्ट globals के इंजेक्शन को संभालता नहीं है।

</Option>

### bail

<Option type="Number" default="0 (don't bail; run all tests)">

यदि आप चाहते हैं कि टेस्ट विफलताओं की एक विशिष्ट संख्या के बाद आपका टेस्ट रन रुक जाए, तो `bail` का उपयोग करें।
(इसका डिफ़ॉल्ट `0` है, जो हर स्थिति में सभी टेस्ट चलाता है।) **नोट:** इस संदर्भ में एक टेस्ट का अर्थ है एक ही spec फ़ाइल के भीतर सभी टेस्ट (Mocha या Jasmine का उपयोग करते समय) या एक feature फ़ाइल के भीतर सभी steps (Cucumber का उपयोग करते समय)। यदि आप एक ही टेस्ट फ़ाइल के टेस्ट्स के भीतर bail व्यवहार को नियंत्रित करना चाहते हैं, तो उपलब्ध [framework](frameworks) विकल्प देखें।

</Option>

### specFileRetries

<Option type="Number" default="0">

जब कोई पूरी specfile विफल हो जाए, तो उसे दोबारा चलाने की संख्या।

</Option>

### specFileRetriesDelay

<Option type="Number" default="0">

spec फ़ाइल के पुनः प्रयासों के बीच सेकंड में विलंब

</Option>

### specFileRetriesDeferred

<Option type="Boolean" default="true">

क्या पुनः प्रयास की जाने वाली spec फ़ाइलों को तुरंत दोबारा चलाया जाना चाहिए या कतार के अंत तक स्थगित किया जाना चाहिए।

</Option>

### groupLogsByTestSpec

<Option type="Boolean" default="false">

लॉग आउटपुट व्यू चुनें।

यदि `false` पर सेट है, तो विभिन्न टेस्ट फ़ाइलों के लॉग रियल-टाइम में प्रिंट किए जाएंगे। कृपया ध्यान दें कि समानांतर रूप से चलाने पर इससे विभिन्न फ़ाइलों के लॉग आउटपुट आपस में मिल सकते हैं।

यदि `true` पर सेट है, तो लॉग आउटपुट Test Spec के अनुसार समूहीकृत किए जाएंगे और केवल तभी प्रिंट किए जाएंगे जब Test Spec पूरा हो जाएगा।

डिफ़ॉल्ट रूप से, यह `false` पर सेट है ताकि लॉग रियल-टाइम में प्रिंट हों।

</Option>

### autoAssertOnTestEnd

<Option type="Boolean" default="true">

नियंत्रित करता है कि क्या WebdriverIO प्रत्येक टेस्ट के अंत में सभी soft assertions को स्वचालित रूप से assert करता है। `true` पर सेट होने पर, कोई भी संचित soft assertions स्वचालित रूप से जांचे जाएंगे और यदि कोई assertion विफल हुआ तो टेस्ट विफल हो जाएगा। `false` पर सेट होने पर, soft assertions की जांच के लिए आपको assert मेथड को मैन्युअल रूप से कॉल करना होगा।

</Option>

### services

<Option type="String[]|Object[]" default="[]">

Services एक विशिष्ट कार्य संभाल लेती हैं जिसकी आप देखभाल नहीं करना चाहते। वे लगभग बिना किसी प्रयास के आपके टेस्ट सेटअप को बेहतर बनाती हैं।

</Option>

### framework

<Option type="String" default="mocha" values="mocha | jasmine | cucumber">

WDIO टेस्टरनर द्वारा उपयोग किए जाने वाले टेस्ट फ़्रेमवर्क को परिभाषित करता है।

</Option>

### mochaOpts, jasmineOpts and cucumberOpts

<Option type="Object" default={`{ timeout: 10000 }`}>

फ़्रेमवर्क से संबंधित विशिष्ट विकल्प। कौन से विकल्प उपलब्ध हैं, इसके लिए फ़्रेमवर्क एडॉप्टर दस्तावेज़ देखें। इसके बारे में [Frameworks](frameworks) में और पढ़ें।

</Option>

### cucumberFeaturesWithLineNumbers

<Option type="String[]" default="[]">

लाइन नंबरों के साथ cucumber features की सूची (जब [cucumber फ़्रेमवर्क का उपयोग कर रहे हों](./Frameworks.md#using-cucumber))।

</Option>

### reporters

<Option type="String[]|Object[]" default="[]">

उपयोग किए जाने वाले रिपोर्टर्स की सूची। एक रिपोर्टर या तो एक स्ट्रिंग हो सकता है, या
`['reporterName', { /* reporter options */}]` का एक array, जहां पहला एलिमेंट रिपोर्टर के नाम वाली एक स्ट्रिंग है और दूसरा एलिमेंट रिपोर्टर विकल्पों वाला एक ऑब्जेक्ट है।

</Option>
उदाहरण:

```js
reporters: [
    'dot',
    'spec'
    ['junit', {
        outputDir: `${__dirname}/reports`,
        otherOption: 'foobar'
    }]
]
```

### reporterSyncInterval

<Option type="Number" default="100 (ms)">

यह निर्धारित करता है कि यदि रिपोर्टर अपने लॉग एसिंक्रोनस रूप से रिपोर्ट करते हैं (जैसे यदि लॉग किसी तृतीय-पक्ष वेंडर को स्ट्रीम किए जाते हैं), तो उन्हें किस अंतराल में जांचना चाहिए कि वे सिंक्रनाइज़ हैं या नहीं।

</Option>

### reporterSyncTimeout

<Option type="Number" default="5000 (ms)">

यह अधिकतम समय निर्धारित करता है जो रिपोर्टर्स के पास अपने सभी लॉग अपलोड पूरा करने के लिए होता है, जिसके बाद टेस्टरनर द्वारा एक त्रुटि थ्रो की जाती है।

</Option>

### execArgv

<Option type="String[]" default="null">

चाइल्ड प्रोसेस लॉन्च करते समय निर्दिष्ट किए जाने वाले Node आर्गुमेंट्स।

</Option>

### cpuProf

<Option type="Boolean" default="false">

वर्कर प्रोसेस के लिए CPU प्रोफ़ाइलिंग सक्षम करें। वर्कर प्रोसेस के बाहर निकलने पर प्रोफ़ाइल स्वचालित रूप से उत्पन्न हो जाएगी।

</Option>

### heapProf

<Option type="Boolean" default="false">

वर्कर प्रोसेस के लिए Heap प्रोफ़ाइलिंग सक्षम करें। वर्कर प्रोसेस के बाहर निकलने पर स्नैपशॉट स्वचालित रूप से उत्पन्न हो जाएगा (sampling heap profiler का उपयोग करता है)।

</Option>

### profileOutputDir

<Option type="String" default="./profiles">

वह डायरेक्टरी जहां CPU प्रोफ़ाइल्स (`.cpuprofile`) और Heap प्रोफ़ाइल्स (`.heapprofile`) सहेजी जाएंगी।

</Option>

### filesToWatch

<Option type="String[]" default="[]">

glob समर्थित स्ट्रिंग पैटर्न्स की एक सूची जो टेस्टरनर को `--watch` फ़्लैग के साथ चलाते समय अतिरिक्त रूप से अन्य फ़ाइलों, जैसे एप्लिकेशन फ़ाइलों, पर नज़र रखने के लिए कहती है। डिफ़ॉल्ट रूप से टेस्टरनर पहले से ही सभी spec फ़ाइलों पर नज़र रखता है।

</Option>

### updateSnapshots

<Option type="'new' | 'all' | 'none'" default="none if not provided and tests run in CI, new if not provided, otherwise what's been provided">

यदि आप अपने स्नैपशॉट्स अपडेट करना चाहते हैं तो इसे true पर सेट करें। आदर्श रूप से इसका उपयोग CLI पैरामीटर के भाग के रूप में किया जाता है, जैसे `wdio run wdio.conf.js --s`।

</Option>

### resolveSnapshotPath

<Option type="(testPath: string, snapExtension: string) => string" default="stores snapshot files in __snapshots__ directory next to test file">

डिफ़ॉल्ट स्नैपशॉट पाथ को ओवरराइड करता है। उदाहरण के लिए, स्नैपशॉट्स को टेस्ट फ़ाइलों के बगल में संग्रहीत करने के लिए।

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

</Option>

### tsConfigPath

<Option type="String" default="null">

WDIO TypeScript फ़ाइलों को कंपाइल करने के लिए `tsx` का उपयोग करता है। आपका TSConfig वर्तमान वर्किंग डायरेक्टरी से स्वचालित रूप से पहचाना जाता है, लेकिन आप यहां या TSX_TSCONFIG_PATH एनवायरनमेंट वेरिएबल सेट करके एक कस्टम पाथ निर्दिष्ट कर सकते हैं।

`tsx` डॉक्स देखें: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

</Option>

### displayServerEnabled

<Option type="Boolean" default="true">

Linux पर रन के लिए एक वर्चुअल डिस्प्ले शुरू करें जब न तो `DISPLAY` और न ही `WAYLAND_DISPLAY` सेट हो। जब आप headless या केवल किसी क्लाउड सेवा या रिमोट ग्रिड पर चलाते हैं, तो इसे `false` पर सेट करें। यह केवल यह नियंत्रित करता है कि डिस्प्ले सर्वर शुरू होता है या नहीं: केवल `WAYLAND_DISPLAY` सेट होने पर भी, टेस्टरनर रन के लिए `XDG_SESSION_TYPE`, `GDK_BACKEND` और `ELECTRON_OZONE_PLATFORM_HINT` को `wayland` पर सेट करता है। [Headless & Display Servers](/docs/headless-and-display-servers) देखें।

</Option>

### displayServer

<Option type="String" default="auto" values="auto | wayland | xvfb">

कौन सा डिस्प्ले सर्वर शुरू करना है। `auto` Weston को आज़माता है और Weston के न होने या शुरू होने में विफल होने पर Xvfb पर वापस चला जाता है। `wayland` और `xvfb` केवल उसी सर्वर को आज़माते हैं।

</Option>

### displayServerAutoInstall

<Option type="Boolean" default="false">

जब कोई इंस्टॉल किया गया डिस्प्ले सर्वर शुरू नहीं होता, तो सिस्टम पैकेज मैनेजर के साथ एक अनुपलब्ध डिस्प्ले सर्वर इंस्टॉल करें।

</Option>

### displayServerAutoInstallMode

<Option type="String" default="sudo" values="root | sudo">

बिल्ट-इन इंस्टॉल कैसे चलता है: `root` केवल root के रूप में चलने पर इंस्टॉल करता है, `sudo` root न होने पर non-interactive `sudo -n` का उपयोग करता है, या `sudo` इंस्टॉल न होने पर उसके बिना इंस्टॉल करता है।

</Option>

### displayServerAutoInstallCommand

<Option type="String | String[]">

बिल्ट-इन इंस्टॉल के बजाय चलाने के लिए एक कमांड, जैसी है वैसी और `sudo` के बिना। यह केवल `displayServerAutoInstall: true` के साथ चलती है। एक स्ट्रिंग shell में चलती है, एक array बिना shell के चलता है। `auto` के साथ, यह पहले Weston के लिए चलती है, और फिर Xvfb के लिए केवल तभी चलती है जब Weston अभी भी उपलब्ध न हो या शुरू होने में विफल हो, और Xvfb अभी भी अनुपलब्ध हो। दूसरे सर्वर के प्रयास को छोड़ने के लिए `displayServer` को उस सर्वर पर सेट करें जिसे यह इंस्टॉल करती है।

</Option>

### displayServerWidth

<Option type="Number" default="1920">

वर्चुअल डिस्प्ले की स्क्रीन चौड़ाई पिक्सेल में।

</Option>

### displayServerHeight

<Option type="Number" default="1080">

वर्चुअल डिस्प्ले की स्क्रीन ऊंचाई पिक्सेल में।

</Option>

### displayServerDepth

<Option type="Number" default="24">

वर्चुअल डिस्प्ले की कलर डेप्थ। केवल Xvfb के लिए।

</Option>

## हुक्स

WDIO टेस्टरनर आपको टेस्ट लाइफ़साइकल के विशिष्ट समय पर ट्रिगर होने वाले हुक्स सेट करने की अनुमति देता है। इससे कस्टम क्रियाएं संभव होती हैं (जैसे यदि कोई टेस्ट विफल होता है तो स्क्रीनशॉट लेना)।

प्रत्येक हुक के पैरामीटर में लाइफ़साइकल के बारे में विशिष्ट जानकारी होती है (जैसे टेस्ट suite या टेस्ट के बारे में जानकारी)। सभी हुक प्रॉपर्टीज़ के बारे में [हमारे उदाहरण कॉन्फ़िग](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326) में और पढ़ें।

**नोट:** कुछ हुक्स (`onPrepare`, `onWorkerStart`, `onWorkerEnd` और `onComplete`) एक अलग प्रोसेस में निष्पादित होते हैं और इसलिए वर्कर प्रोसेस में मौजूद अन्य हुक्स के साथ कोई ग्लोबल डेटा साझा नहीं कर सकते।

### onPrepare

सभी वर्कर्स लॉन्च होने से पहले एक बार निष्पादित होता है।

पैरामीटर्स:

- `config` (`object`): WebdriverIO कॉन्फ़िगरेशन ऑब्जेक्ट
- `param` (`object[]`): capabilities विवरणों की सूची

### onWorkerStart

एक वर्कर प्रोसेस के spawn होने से पहले निष्पादित होता है और इसका उपयोग उस वर्कर के लिए विशिष्ट सेवा को इनिशियलाइज़ करने के साथ-साथ async तरीके से रनटाइम एनवायरनमेंट को संशोधित करने के लिए किया जा सकता है।

पैरामीटर्स:

- `cid` (`string`): capability id (जैसे 0-0)
- `caps` (`object`): वर्कर में spawn होने वाले सेशन के लिए capabilities युक्त
- `specs` (`string[]`): वर्कर प्रोसेस में चलाए जाने वाले specs
- `args` (`object`): ऑब्जेक्ट जो वर्कर के इनिशियलाइज़ होने के बाद मुख्य कॉन्फ़िगरेशन के साथ मर्ज किया जाएगा
- `execArgv` (`string[]`): वर्कर प्रोसेस को पास किए गए स्ट्रिंग आर्गुमेंट्स की सूची

### onWorkerEnd

किसी वर्कर प्रोसेस के बाहर निकलने के ठीक बाद निष्पादित होता है।

पैरामीटर्स:

- `cid` (`string`): capability id (जैसे 0-0)
- `exitCode` (`number`): 0 - सफलता, 1 - विफलता। किसी सिग्नल द्वारा समाप्त किया गया वर्कर इसके बजाय `128` + सिग्नल नंबर रिपोर्ट करता है, जैसे `SIGSEGV` के लिए `139`
- `specs` (`string[]`): वर्कर प्रोसेस में चलाए जाने वाले specs
- `retries` (`number`): [_"Add retries on a per-specfile basis"_](./Retry.md#add-retries-on-a-per-specfile-basis) में परिभाषित अनुसार उपयोग किए गए spec स्तर के पुनः प्रयासों की संख्या
- `signal` (`string`): वह सिग्नल जिसने वर्कर को समाप्त किया, जैसे `SIGSEGV`, या `null` यदि यह स्वयं बाहर निकला

### beforeSession

webdriver सेशन और टेस्ट फ़्रेमवर्क को इनिशियलाइज़ करने से ठीक पहले निष्पादित होता है। यह आपको capability या spec के आधार पर कॉन्फ़िगरेशन में बदलाव करने की अनुमति देता है।

पैरामीटर्स:

- `config` (`object`): WebdriverIO कॉन्फ़िगरेशन ऑब्जेक्ट
- `caps` (`object`): वर्कर में spawn होने वाले सेशन के लिए capabilities युक्त
- `specs` (`string[]`): वर्कर प्रोसेस में चलाए जाने वाले specs

### before

टेस्ट निष्पादन शुरू होने से पहले निष्पादित होता है। इस बिंदु पर आप `browser` जैसे सभी ग्लोबल वेरिएबल्स तक पहुंच सकते हैं। यह कस्टम कमांड्स परिभाषित करने के लिए सबसे उपयुक्त स्थान है।

पैरामीटर्स:

- `caps` (`object`): वर्कर में spawn होने वाले सेशन के लिए capabilities युक्त
- `specs` (`string[]`): वर्कर प्रोसेस में चलाए जाने वाले specs
- `browser` (`object`): बनाए गए browser/device सेशन का इंस्टेंस

### beforeSuite

हुक जो suite शुरू होने से पहले निष्पादित होता है (केवल Mocha/Jasmine में)

पैरामीटर्स:

- `suite` (`object`): suite विवरण

### beforeHook

हुक जो suite के भीतर किसी हुक के शुरू होने से *पहले* निष्पादित होता है (जैसे Mocha में beforeEach को कॉल करने से पहले चलता है)

पैरामीटर्स:

- `test` (`object`): टेस्ट विवरण
- `context` (`object`): टेस्ट context (Cucumber में World ऑब्जेक्ट का प्रतिनिधित्व करता है)

### afterHook

हुक जो suite के भीतर किसी हुक के समाप्त होने के *बाद* निष्पादित होता है (जैसे Mocha में afterEach को कॉल करने के बाद चलता है)

पैरामीटर्स:

- `test` (`object`): टेस्ट विवरण
- `context` (`object`): टेस्ट context (Cucumber में World ऑब्जेक्ट का प्रतिनिधित्व करता है)
- `result` (`object`): हुक परिणाम (`error`, `result`, `duration`, `passed`, `retries` प्रॉपर्टीज़ युक्त)

### beforeTest

किसी टेस्ट से पहले निष्पादित होने वाला फ़ंक्शन (केवल Mocha/Jasmine में)।

पैरामीटर्स:

- `test` (`object`): टेस्ट विवरण
- `context` (`object`): वह scope ऑब्जेक्ट जिसके साथ टेस्ट निष्पादित किया गया था

### beforeCommand

किसी WebdriverIO कमांड के निष्पादित होने से पहले चलता है।

पैरामीटर्स:

- `commandName` (`string`): कमांड का नाम
- `args` (`*`): वे आर्गुमेंट्स जो कमांड को प्राप्त होंगे

### afterCommand

किसी WebdriverIO कमांड के निष्पादित होने के बाद चलता है।

पैरामीटर्स:

- `commandName` (`string`): कमांड का नाम
- `args` (`*`): वे आर्गुमेंट्स जो कमांड को प्राप्त होंगे
- `result` (`*`): कमांड का परिणाम
- `error` (`Error`): त्रुटि ऑब्जेक्ट, यदि कोई हो

### afterTest

किसी टेस्ट (Mocha/Jasmine में) के समाप्त होने के बाद निष्पादित होने वाला फ़ंक्शन।

पैरामीटर्स:

- `test` (`object`): टेस्ट विवरण
- `context` (`object`): वह scope ऑब्जेक्ट जिसके साथ टेस्ट निष्पादित किया गया था
- `result.error` (`Error`): टेस्ट विफल होने की स्थिति में त्रुटि ऑब्जेक्ट, अन्यथा `undefined`
- `result.result` (`Any`): टेस्ट फ़ंक्शन का रिटर्न ऑब्जेक्ट
- `result.duration` (`Number`): टेस्ट की अवधि
- `result.passed` (`Boolean`): यदि टेस्ट पास हुआ है तो true, अन्यथा false
- `result.retries` (`Object`): [Mocha और Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) के साथ-साथ [Cucumber](./Retry.md#rerunning-in-cucumber) के लिए परिभाषित अनुसार एकल टेस्ट से संबंधित पुनः प्रयासों के बारे में जानकारी, जैसे `{ attempts: 0, limit: 0 }`, देखें
- `result` (`object`): हुक परिणाम (`error`, `result`, `duration`, `passed`, `retries` प्रॉपर्टीज़ युक्त)

### afterSuite

हुक जो suite समाप्त होने के बाद निष्पादित होता है (केवल Mocha/Jasmine में)

पैरामीटर्स:

- `suite` (`object`): suite विवरण

### after

सभी टेस्ट पूरे होने के बाद निष्पादित होता है। आपके पास अभी भी टेस्ट के सभी ग्लोबल वेरिएबल्स तक पहुंच होती है।

पैरामीटर्स:

- `result` (`number`): 0 - टेस्ट पास, 1 - टेस्ट विफल
- `caps` (`object`): वर्कर में spawn होने वाले सेशन के लिए capabilities युक्त
- `specs` (`string[]`): वर्कर प्रोसेस में चलाए जाने वाले specs

### afterSession

webdriver सेशन समाप्त करने के ठीक बाद निष्पादित होता है।

पैरामीटर्स:

- `config` (`object`): WebdriverIO कॉन्फ़िगरेशन ऑब्जेक्ट
- `caps` (`object`): वर्कर में spawn होने वाले सेशन के लिए capabilities युक्त
- `specs` (`string[]`): वर्कर प्रोसेस में चलाए जाने वाले specs

### onComplete

सभी वर्कर्स के बंद हो जाने और प्रोसेस के बाहर निकलने वाला होने के बाद निष्पादित होता है। onComplete हुक में थ्रो की गई त्रुटि के परिणामस्वरूप टेस्ट रन विफल हो जाएगा।

पैरामीटर्स:

- `exitCode` (`number`): 0 - सफलता, 1 - विफलता
- `config` (`object`): WebdriverIO कॉन्फ़िगरेशन ऑब्जेक्ट
- `caps` (`object`): वर्कर में spawn होने वाले सेशन के लिए capabilities युक्त
- `result` (`object`): टेस्ट परिणामों युक्त परिणाम ऑब्जेक्ट

### onReload

रिफ़्रेश होने पर निष्पादित होता है।

पैरामीटर्स:

- `oldSessionId` (`string`): पुराने सेशन की session ID
- `newSessionId` (`string`): नए सेशन की session ID

### beforeFeature

किसी Cucumber Feature से पहले चलता है।

पैरामीटर्स:

- `uri` (`string`): feature फ़ाइल का पाथ
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumber feature ऑब्जेक्ट

### afterFeature

किसी Cucumber Feature के बाद चलता है।

पैरामीटर्स:

- `uri` (`string`): feature फ़ाइल का पाथ
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumber feature ऑब्जेक्ट

### beforeScenario

किसी Cucumber Scenario से पहले चलता है।

पैरामीटर्स:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): pickle और test step की जानकारी युक्त world ऑब्जेक्ट
- `context` (`object`): Cucumber World ऑब्जेक्ट

### afterScenario

किसी Cucumber Scenario के बाद चलता है।

पैरामीटर्स:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): pickle और test step की जानकारी युक्त world ऑब्जेक्ट
- `result` (`object`): scenario परिणामों युक्त परिणाम ऑब्जेक्ट
- `result.passed` (`boolean`): यदि scenario पास हुआ है तो true
- `result.error` (`string`): यदि scenario विफल हुआ तो error stack
- `result.duration` (`number`): मिलीसेकंड में scenario की अवधि
- `context` (`object`): Cucumber World ऑब्जेक्ट

### beforeStep

किसी Cucumber Step से पहले चलता है।

पैरामीटर्स:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber step ऑब्जेक्ट
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber scenario ऑब्जेक्ट
- `context` (`object`): Cucumber World ऑब्जेक्ट

### afterStep

किसी Cucumber Step के बाद चलता है।

पैरामीटर्स:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber step ऑब्जेक्ट
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber scenario ऑब्जेक्ट
- `result`: (`object`): step परिणामों युक्त परिणाम ऑब्जेक्ट
- `result.passed` (`boolean`): यदि scenario पास हुआ है तो true
- `result.error` (`string`): यदि scenario विफल हुआ तो error stack
- `result.duration` (`number`): मिलीसेकंड में scenario की अवधि
- `context` (`object`): Cucumber World ऑब्जेक्ट

### beforeAssertion

हुक जो किसी WebdriverIO assertion के होने से पहले निष्पादित होता है।

पैरामीटर्स:

- `params`: assertion जानकारी
- `params.matcherName` (`string`): उस matcher का नाम जिसे टेस्ट ने कॉल किया (जैसे `toHaveTitle`)। किसी alias के लिए, यह alias का नाम होता है (जैसे `toBeExisting`, न कि `toExist`)।
- `params.expectedValue`: वह मान जो matcher में पास किया जाता है
- `params.options`: assertion विकल्प

### afterAssertion

हुक जो किसी WebdriverIO assertion के होने के बाद निष्पादित होता है।

पैरामीटर्स:

- `params`: assertion जानकारी
- `params.matcherName` (`string`): उस matcher का नाम जिसे टेस्ट ने कॉल किया (जैसे `toHaveTitle`)। किसी alias के लिए, यह alias का नाम होता है (जैसे `toBeExisting`, न कि `toExist`)।
- `params.expectedValue`: वह मान जो matcher में पास किया जाता है
- `params.options`: assertion विकल्प
- `params.result` (`object`): matcher का परिणाम, `pass` (`boolean`) और `message()` के साथ। जब मान अपेक्षित मान से मेल खाता है तो `pass` `true` होता है, `.not` के साथ भी: `.not` के साथ, assertion तब पास होता है जब `pass` `false` होता है।