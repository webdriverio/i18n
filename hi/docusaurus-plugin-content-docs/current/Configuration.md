---
id: configuration
title: कॉन्फ़िगरेशन
---

[सेटअप प्रकार](/docs/setuptypes) (जैसे रॉ प्रोटोकॉल बाइंडिंग, स्टैंडअलोन पैकेज के रूप में WebdriverIO, या WDIO टेस्टरनर का उपयोग) के आधार पर पर्यावरण को नियंत्रित करने के लिए विकल्पों का एक अलग सेट उपलब्ध है।

## WebDriver विकल्प

निम्नलिखित विकल्प तब परिभाषित किए जाते हैं जब [`webdriver`](https://www.npmjs.com/package/webdriver) प्रोटोकॉल पैकेज का उपयोग किया जाता है:

### protocol

ड्राइवर सर्वर के साथ संवाद करते समय उपयोग करने के लिए प्रोटोकॉल।

Type: `String`<br />
Default: `http`

### hostname

आपके ड्राइवर सर्वर का होस्ट।

Type: `String`<br />
Default: `0.0.0.0`

### port

आपका ड्राइवर सर्वर जिस पोर्ट पर है।

Type: `Number`<br />
Default: `undefined`

### path

ड्राइवर सर्वर एंडपॉइंट का पथ।

Type: `String`<br />
Default: `/`

### queryParams

क्वेरी पैरामीटर जो ड्राइवर सर्वर को प्रसारित किए जाते हैं।

Type: `Object`<br />
Default: `undefined`

### user

आपका क्लाउड सर्विस यूजरनेम (केवल [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) या [LambdaTest](https://www.lambdatest.com) खातों के लिए काम करता है)। यदि सेट है, तो WebdriverIO आपके लिए स्वचालित रूप से कनेक्शन विकल्प सेट करेगा। यदि आप क्लाउड प्रदाता का उपयोग नहीं करते हैं तो इसका उपयोग किसी अन्य WebDriver बैकेंड को प्रमाणित करने के लिए किया जा सकता है।

Type: `String`<br />
Default: `undefined`

### key

आपकी क्लाउड सर्विस एक्सेस की या सीक्रेट की (केवल [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) या [LambdaTest](https://www.lambdatest.com) खातों के लिए काम करती है)। यदि सेट है, तो WebdriverIO आपके लिए स्वचालित रूप से कनेक्शन विकल्प सेट करेगा। यदि आप क्लाउड प्रदाता का उपयोग नहीं करते हैं तो इसका उपयोग किसी अन्य WebDriver बैकेंड को प्रमाणित करने के लिए किया जा सकता है।

Type: `String`<br />
Default: `undefined`

### capabilities

उन क्षमताओं को परिभाषित करता है जिन्हें आप अपने WebDriver सत्र में चलाना चाहते हैं। अधिक विवरण के लिए [WebDriver प्रोटोकॉल](https://w3c.github.io/webdriver/#capabilities) देखें। यदि आप एक पुराने ड्राइवर को चला रहे हैं जो WebDriver प्रोटोकॉल का समर्थन नहीं करता है, तो आपको सत्र को सफलतापूर्वक चलाने के लिए [JSONWireProtocol क्षमताओं](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) का उपयोग करने की आवश्यकता होगी।

WebDriver आधारित क्षमताओं के अलावा आप ब्राउज़र और विक्रेता-विशिष्ट विकल्प लागू कर सकते हैं जो रिमोट ब्राउज़र या डिवाइस के गहन कॉन्फ़िगरेशन की अनुमति देते हैं। इन्हें संबंधित विक्रेता दस्तावेज़ों में प्रलेखित किया गया है, जैसे:

- `goog:chromeOptions`: [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106) के लिए
- `moz:firefoxOptions`: [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html) के लिए
- `ms:edgeOptions`: [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class) के लिए
- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional) के लिए
- `bstack:options`: [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#) के लिए
- `selenoid:options`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc) के लिए

इसके अतिरिक्त, एक उपयोगी उपकरण Sauce Labs [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) है, जो आपको अपनी वांछित क्षमताओं को क्लिक करके इस ऑब्जेक्ट को बनाने में मदद करता है।

Type: `Object`<br />
Default: `null`

**उदाहरण:**

```js
{
    browserName: 'chrome', // विकल्प: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // ब्राउज़र संस्करण
    platformName: 'Windows 10' // ओएस प्लेटफॉर्म
}
```

यदि आप मोबाइल डिवाइस पर वेब या नेटिव टेस्ट चला रहे हैं, तो `capabilities` WebDriver प्रोटोकॉल से भिन्न होता है। अधिक जानकारी के लिए [Appium दस्तावेज़](https://appium.io/docs/en/latest/guides/caps/) देखें।

### logLevel

लॉगिंग शब्दों के स्तर।

Type: `String`<br />
Default: `info`<br />
Options: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

सभी टेस्टरनर लॉग फ़ाइलें (रिपोर्टर लॉग और `wdio` लॉग सहित) को स्टोर करने के लिए डायरेक्टरी। यदि सेट नहीं है, तो सभी लॉग `stdout` पर स्ट्रीम किए जाते हैं। चूंकि अधिकांश रिपोर्टर `stdout` पर लॉग करने के लिए बनाए गए हैं, इसलिए यह अनुशंसा की जाती है कि इस विकल्प का उपयोग केवल विशिष्ट रिपोर्टरों के लिए करें जहां रिपोर्ट को फ़ाइल में पुश करना अधिक समझ में आता है (जैसे `junit` रिपोर्टर, उदाहरण के लिए)।

स्टैंडअलोन मोड में चलाते समय, WebdriverIO द्वारा उत्पन्न एकमात्र लॉग `wdio` लॉग होगा।

Type: `String`<br />
Default: `null`

### connectionRetryTimeout

ड्राइवर या ग्रिड के लिए किसी भी WebDriver अनुरोध का टाइमआउट।

Type: `Number`<br />
Default: `120000`

### connectionRetryCount

Selenium सर्वर पर अनुरोध पुनः प्रयासों की अधिकतम संख्या।

Type: `Number`<br />
Default: `3`

### agent

आपको अनुरोध करने के लिए एक कस्टम `http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) का उपयोग करने की अनुमति देता है।

Type: `Object`<br />
Default:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

प्रत्येक WebDriver अनुरोध में पास करने के लिए कस्टम `headers` निर्दिष्ट करें। यदि आपके Selenium ग्रिड को बेसिक ऑथेंटिकेशन की आवश्यकता है, तो हम आपके WebDriver अनुरोधों को प्रमाणित करने के लिए इस विकल्प के माध्यम से एक `Authorization` हेडर पास करने की अनुशंसा करते हैं, उदाहरण के लिए:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Read the username and password from environment variables
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Combine the username and password with a colon separator
const credentials = `${username}:${password}`;
// Encode the credentials using Base64
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

Type: `Object`<br />
Default: `{}`

### transformRequest

WebDriver अनुरोध करने से पहले [HTTP अनुरोध विकल्पों](https://github.com/sindresorhus/got#options) को अवरोधित करने वाला फ़ंक्शन

Type: `(RequestOptions) => RequestOptions`<br />
Default: *कोई नहीं*

### transformResponse

WebDriver प्रतिक्रिया आने के बाद HTTP प्रतिक्रिया ऑब्जेक्ट को अवरोधित करने वाला फ़ंक्शन। फ़ंक्शन को मूल प्रतिक्रिया ऑब्जेक्ट पहले और संबंधित `RequestOptions` को दूसरे आर्गुमेंट के रूप में पास किया जाता है।

Type: `(Response, RequestOptions) => Response`<br />
Default: *कोई नहीं*

### strictSSL

क्या यह SSL प्रमाणपत्र का वैध होना आवश्यक नहीं है।
इसे `STRICT_SSL` या `strict_ssl` के रूप में पर्यावरण चर के माध्यम से सेट किया जा सकता है।

Type: `Boolean`<br />
Default: `true`

### enableDirectConnect

क्या [Appium डायरेक्ट कनेक्शन फीचर](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) सक्षम करें।
यदि फ्लैग सक्षम होने पर प्रतिक्रिया में उचित कुंजियां नहीं थीं तो यह कुछ नहीं करता है।

Type: `Boolean`<br />
Default: `true`

### cacheDir

कैश डायरेक्टरी के रूट का पथ। इस डायरेक्टरी का उपयोग उन सभी ड्राइवरों को स्टोर करने के लिए किया जाता है जो सत्र शुरू करने का प्रयास करते समय डाउनलोड किए जाते हैं।

Type: `String`<br />
Default: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

अधिक सुरक्षित लॉगिंग के लिए, `maskingPatterns` के साथ सेट रेगुलर एक्सप्रेशन संवेदनशील जानकारी को लॉग से छिपा सकते हैं।
 - स्ट्रिंग प्रारूप फ्लैग के साथ या बिना फ्लैग के एक रेगुलर एक्सप्रेशन है (जैसे `/.../i`) और एकाधिक रेगुलर एक्सप्रेशन के लिए कॉमा से अलग किया गया है।
 - मास्किंग पैटर्न पर अधिक विवरण के लिए, [WDIO लॉगर README में मास्किंग पैटर्न अनुभाग](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns) देखें।

Type: `String`<br />
Default: `undefined`

**उदाहरण:**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

---

## WebdriverIO

निम्नलिखित विकल्पों (ऊपर सूचीबद्ध लोगों सहित) का उपयोग स्टैंडअलोन में WebdriverIO के साथ किया जा सकता है:

### automationProtocol

वह प्रोटोकॉल परिभाषित करें जिसे आप अपने ब्राउज़र ऑटोमेशन के लिए उपयोग करना चाहते हैं। वर्तमान में केवल [`webdriver`](https://www.npmjs.com/package/webdriver) समर्थित है, क्योंकि यह मुख्य ब्राउज़र ऑटोमेशन तकनीक है जिसका उपयोग WebdriverIO करता है।

यदि आप किसी भिन्न ऑटोमेशन तकनीक का उपयोग करके ब्राउज़र को स्वचालित करना चाहते हैं, तो आप इस प्रॉपर्टी को ऐसे पथ पर सेट करें जो एक ऐसे मॉड्यूल को हल करे जो निम्नलिखित इंटरफ़ेस का पालन करता हो:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Start a automation session and return a WebdriverIO [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * with respective automation commands. See the [webdriver](https://www.npmjs.com/package/webdriver) package
     * as a reference implementation
     *
     * @param {Capabilities.RemoteConfig} options WebdriverIO options
     * @param {Function} hook that allows to modify the client before it gets released from the function
     * @param {PropertyDescriptorMap} userPrototype allows user to add custom protocol commands
     * @param {Function} customCommandWrapper allows to modify the command execution
     * @returns a WebdriverIO compatible client instance
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * allows user to attach to existing sessions
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * Changes The instance session id and browser capabilities for the new session
     * directly into the passed in browser object
     *
     * @optional
     * @param   {object} instance  the object we get from a new browser session.
     * @returns {string}           the new session id of the browser
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

Type: `String`<br />
Default: `webdriver`

### baseUrl

बेस URL सेट करके `url` कमांड कॉल को छोटा करें।
- यदि आपका `url` पैरामीटर `/` से शुरू होता है, तो `baseUrl` पूर्व में जोड़ा जाता है (सिवाय `baseUrl` पथ के, यदि इसमें कोई हो)।
- यदि आपका `url` पैरामीटर स्कीम या `/` के बिना शुरू होता है (जैसे `some/path`), तो पूरा `baseUrl` सीधे पहले जोड़ा जाता है।

Type: `String`<br />
Default: `null`

### waitforTimeout

सभी `waitFor*` कमांड के लिए डिफ़ॉल्ट टाइमआउट। (विकल्प नाम में लोअरकेस `f` पर ध्यान दें।) यह टाइमआउट __केवल__ उन कमांड को प्रभावित करता है जो `waitFor*` से शुरू होते हैं और उनके डिफ़ॉल्ट प्रतीक्षा समय।

_टेस्ट_ के लिए टाइमआउट बढ़ाने के लिए, कृपया फ्रेमवर्क दस्तावेज़ देखें।

Type: `Number`<br />
Default: `5000`

### waitforInterval

सभी `waitFor*` कमांड के लिए डिफ़ॉल्ट अंतराल यह जांचने के लिए कि क्या एक अपेक्षित स्थिति (जैसे, दृश्यता) बदल दी गई है।

Type: `Number`<br />
Default: `100`

### region

यदि Sauce Labs पर चल रहे हैं, तो आप विभिन्न डेटा सेंटरों के बीच टेस्ट चलाने का चुनाव कर सकते हैं: US या EU।
अपने क्षेत्र को EU में बदलने के लिए, अपने कॉन्फ़िग में `region: 'eu'` जोड़ें।

__नोट:__ इसका प्रभाव केवल तभी होता है जब आप `user` और `key` विकल्प प्रदान करते हैं जो आपके Sauce Labs खाते से जुड़े हों।

Type: `String`<br />
Default: `us`

*(केवल vm और या em/simulators के लिए)*

---

## Testrunner विकल्प

निम्नलिखित विकल्प (ऊपर सूचीबद्ध लोगों सहित) केवल WDIO टेस्टरनर के साथ WebdriverIO चलाने के लिए परिभाषित किए गए हैं:

### specs

टेस्ट निष्पादन के लिए स्पेक्स को परिभाषित करें। आप या तो एक साथ कई फ़ाइलों से मेल खाने के लिए एक ग्लोब पैटर्न निर्दिष्ट कर सकते हैं या एक ग्लोब या पथों के सेट को एक सिंगल वर्कर प्रोसेस के भीतर चलाने के लिए एक ऐरे में रैप कर सकते हैं। सभी पथ कॉन्फ़िग फ़ाइल पथ से सापेक्ष माने जाते हैं।

Type: `(String | String[])[]`<br />
Default: `[]`

### exclude

टेस्ट निष्पादन से स्पेक्स को बाहर रखें। सभी पथ कॉन्फ़िग फ़ाइल पथ से सापेक्ष माने जाते हैं।

Type: `String[]`<br />
Default: `[]`

### suites

विभिन्न सूट्स का वर्णन करने वाला एक ऑब्जेक्ट, जिसे आप फिर `wdio` CLI पर `--suite` विकल्प के साथ निर्दिष्ट कर सकते हैं।

Type: `Object`<br />
Default: `{}`

### capabilities

ऊपर वर्णित `capabilities` अनुभाग के समान, एकमात्र अंतर यह है कि एक [`multiremote`](/docs/multiremote) ऑब्जेक्ट, या समानांतर निष्पादन के लिए एक ऐरे में कई WebDriver सत्र निर्दिष्ट करने का विकल्प है।

आप [ऊपर](/docs/configuration#capabilities) परिभाषित के रूप में समान विक्रेता और ब्राउज़र विशिष्ट क्षमताओं को लागू कर सकते हैं।

Type: `Object`|`Object[]`<br />
Default: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

कुल समानांतर चलने वाले वर्कर्स की अधिकतम संख्या।

__नोट:__ यह एक ऐसी संख्या हो सकती है जितनी अधिक `100` हो सकती है, जब परीक्षण Sauce Labs के मशीनों जैसे कुछ बाहरी विक्रेताओं पर किए जा रहे हों। वहां, परीक्षण एक ही मशीन पर नहीं, बल्कि कई VM पर किए जाते हैं। यदि परीक्षण स्थानीय विकास मशीन पर चलाए जाने हैं, तो ऐसी संख्या का उपयोग करें जो अधिक उचित हो, जैसे `3`, `4`, या `5`। अनिवार्य रूप से, यह उन ब्राउज़रों की संख्या है जो एक साथ शुरू होंगे और एक ही समय में आपके परीक्षण चलाएंगे, इसलिए यह आपकी मशीन पर कितनी RAM है और आपकी मशीन पर कितने अन्य ऐप चल रहे हैं, इस पर निर्भर करता है।

आप अपनी क्षमता ऑब्जेक्ट के भीतर `wdio:maxInstances` क्षमता का उपयोग करके `maxInstances` भी लागू कर सकते हैं। यह उस विशेष क्षमता के लिए समानांतर सत्रों की मात्रा को सीमित करेगा।

Type: `Number`<br />
Default: `100`

### maxInstancesPerCapability

प्रति क्षमता के कुल समानांतर चलने वाले वर्कर्स की अधिकतम संख्या।

Type: `Number`<br />
Default: `100`

### injectGlobals

WebdriverIO के ग्लोबल्स (जैसे `browser`, `$` और `$$`) को ग्लोबल एनवायरनमेंट में डालता है।
यदि आप `false` पर सेट करते हैं, तो आपको `@wdio/globals` से इम्पोर्ट करना चाहिए, उदाहरण के लिए:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

नोट: WebdriverIO टेस्ट फ्रेमवर्क विशिष्ट ग्लोबल्स के इंजेक्शन को हैंडल नहीं करता है।

Type: `Boolean`<br />
Default: `true`

### bail

यदि आप चाहते हैं कि आपका टेस्ट रन टेस्ट विफलताओं की एक निश्चित संख्या के बाद रुक जाए, तो `bail` का उपयोग करें।
(यह डिफ़ॉल्ट रूप से `0` है, जो सभी टेस्ट चलाता है चाहे कुछ भी हो।) **नोट:** इस संदर्भ में एक टेस्ट एक सिंगल स्पेक फ़ाइल (Mocha या Jasmine का उपयोग करते समय) के भीतर सभी टेस्ट या एक फीचर फ़ाइल (Cucumber का उपयोग करते समय) के भीतर सभी स्टेप्स हैं। यदि आप एक सिंगल टेस्ट फ़ाइल के टेस्ट के भीतर बेल व्यवहार को नियंत्रित करना चाहते हैं, तो उपलब्ध [फ्रेमवर्क](frameworks) विकल्पों पर एक नज़र डालें।

Type: `Number`<br />
Default: `0` (bail नहीं करता; सभी टेस्ट चलाता है)

### specFileRetries

एक पूरी specfile को पुनः प्रयास करने की संख्या जब यह पूरी तरह से विफल होती है।

Type: `Number`<br />
Default: `0`

### specFileRetriesDelay

स्पेक फ़ाइल पुनः प्रयास प्रयासों के बीच सेकंड में देरी

Type: `Number`<br />
Default: `0`

### specFileRetriesDeferred

क्या पुनः प्रयास की गई स्पेक फ़ाइलों को तुरंत पुनः प्रयास किया जाना चाहिए या कतार के अंत तक स्थगित किया जाना चाहिए।

Type: `Boolean`<br />
Default: `true`

### groupLogsByTestSpec

लॉग आउटपुट व्यू चुनें।

यदि `false` पर सेट है, तो विभिन्न टेस्ट फ़ाइलों से लॉग रियल-टाइम में प्रिंट किए जाएंगे। कृपया ध्यान दें कि समानांतर में चलाते समय विभिन्न फ़ाइलों से लॉग आउटपुट के मिश्रण में परिणाम हो सकता है।

यदि `true` पर सेट है, तो लॉग आउटपुट टेस्ट स्पेक द्वारा समूहीकृत किए जाएंगे और केवल तब प्रिंट किए जाएंगे जब टेस्ट स्पेक पूरा हो जाएगा।

डिफ़ॉल्ट रूप से, यह `false` पर सेट है ताकि लॉग रियल-टाइम में प्रिंट किए जाएं।

Type: `Boolean`<br />
Default: `false`

### autoAssertOnTestEnd

नियंत्रित करता है कि क्या WebdriverIO प्रत्येक टेस्ट के अंत में स्वचालित रूप से सभी सॉफ्ट असर्शन को जांचता है। जब `true` पर सेट किया जाता है, तो कोई भी संचित सॉफ्ट असर्शन स्वचालित रूप से जांचे जाएंगे और टेस्ट को विफल कर देंगे यदि कोई असर्शन विफल हो गया। जब `false` पर सेट किया जाता है, तो आपको सॉफ्ट असर्शन की जांच करने के लिए मैन्युअल रूप से असर्ट मेथड को कॉल करना होगा।

Type: `Boolean`<br />
Default: `true`

### services

सर्विसेज एक विशिष्ट काम को संभालती हैं जिसकी आप देखभाल नहीं करना चाहते। वे लगभग बिना किसी प्रयास के आपके टेस्ट सेटअप को बढ़ाते हैं।

Type: `String[]|Object[]`<br />
Default: `[]`

### framework

WDIO टेस्टरनर द्वारा उपयोग किए जाने वाले टेस्ट फ्रेमवर्क को परिभाषित करता है।

Type: `String`<br />
Default: `mocha`<br />
Options: `mocha` | `jasmine`

### mochaOpts, jasmineOpts and cucumberOpts

विशिष्ट फ्रेमवर्क-संबंधित विकल्प। कौन से विकल्प उपलब्ध हैं, इस बारे में फ्रेमवर्क एडाप्टर दस्तावेज़ देखें। [फ्रेमवर्क्स](frameworks) में इस पर अधिक पढ़ें।

Type: `Object`<br />
Default: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

लाइन नंबरों के साथ कुकंबर फीचर्स की सूची (जब [कुकंबर फ्रेमवर्क का उपयोग करते समय](./Frameworks.md#using-cucumber))।

Type: `String[]`
Default: `[]`

### reporters

उपयोग करने के लिए रिपोर्टरों की सूची। एक रिपोर्टर या तो एक स्ट्रिंग हो सकती है, या `['reporterName', { /* reporter options */}]` का एक ऐरे हो सकता है जहां पहला एलिमेंट रिपोर्टर नाम के साथ एक स्ट्रिंग है और दूसरा एलिमेंट रिपोर्टर विकल्पों के साथ एक ऑब्जेक्ट है।

Type: `String[]|Object[]`<br />
Default: `[]`

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

निर्धारित करता है कि किस अंतराल में रिपोर्टर यह जांच करेंगे कि क्या वे सिंक्रनाइज़ हैं यदि वे अपने लॉग को अतुल्यकालिक रूप से रिपोर्ट करते हैं (जैसे यदि लॉग को एक तृतीय पक्ष विक्रेता में स्ट्रीम किया जाता है)।

Type: `Number`<br />
Default: `100` (ms)

### reporterSyncTimeout

निर्धारित करता है कि रिपोर्टर्स के पास अपने सभी लॉग अपलोड करने के लिए अधिकतम समय है जब तक कि टेस्टरनर द्वारा एक त्रुटि नहीं फेंकी जाती है।

Type: `Number`<br />
Default: `5000` (ms)

### execArgv

चाइल्ड प्रोसेस लॉन्च करते समय निर्दिष्ट करने के लिए नोड आर्गुमेंट।

Type: `String[]`<br />
Default: `null`

### filesToWatch

ग्लोब समर्थन स्ट्रिंग पैटर्न की एक सूची जो टेस्टरनर को बताती है कि जब इसे `--watch` फ्लैग के साथ चलाते हैं, तो अन्य फ़ाइलों को अतिरिक्त रूप से देखना है, उदाहरण के लिए एप्लिकेशन फ़ाइलें। डिफ़ॉल्ट रूप से टेस्टरनर पहले से ही सभी स्पेक फ़ाइलों को देखता है।

Type: `String[]`<br />
Default: `[]`

### updateSnapshots

यदि आप अपने स्नैपशॉट अपडेट करना चाहते हैं तो `true` पर सेट करें। आदर्श रूप से CLI पैरामीटर के हिस्से के रूप में उपयोग किया जाता है, उदाहरण के लिए `wdio run wdio.conf.js --s`।

Type: `'new' | 'all' | 'none'`<br />
Default: यदि प्रदान नहीं किया गया है और टेस्ट CI में चलते हैं, तो `none`, यदि प्रदान नहीं किया गया है, तो `new`, अन्यथा जो प्रदान किया गया है

### resolveSnapshotPath

डिफ़ॉल्ट स्नैपशॉट पथ को ओवरराइड करता है। उदाहरण के लिए, टेस्ट फ़ाइलों के बगल में स्नैपशॉट स्टोर करने के लिए।

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

Type: `(testPath: string, snapExtension: string) => string`<br />
Default: टेस्ट फ़ाइल के बगल में `__snapshots__` डायरेक्टरी में स्नैपशॉट फ़ाइलें स्टोर करता है

### tsConfigPath

WDIO टाइपस्क्रिप्ट फ़ाइलों को कंपाइल करने के लिए `tsx` का उपयोग करता है। आपका TSConfig स्वचालित रूप से वर्तमान वर्किंग डायरेक्टरी से पता लगाया जाता है, लेकिन आप यहां या TSX_TSCONFIG_PATH एनवायरनमेंट वेरिएबल सेट करके एक कस्टम पथ निर्दिष्ट कर सकते हैं।

`tsx` दस्तावेज़ देखें: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Type: `String`<br />
Default: `null`<br />

## हुक्स

WDIO टेस्टरनर आपको हुक्स सेट करने की अनुमति देता है जिन्हें टेस्ट जीवनचक्र के विशिष्ट समय पर ट्रिगर किया जाएगा। यह कस्टम कार्यों की अनुमति देता है (जैसे, यदि कोई टेस्ट विफल होता है तो स्क्रीनशॉट लें)।

प्रत्येक हुक के पास जीवनचक्र के बारे में विशिष्ट जानकारी पैरामीटर के रूप में होती है (जैसे, टेस्ट सूट या टेस्ट के बारे में जानकारी)। सभी हुक प्रॉपर्टीज के बारे में [हमारे उदाहरण कॉन्फ़िग](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326) में अधिक पढ़ें।

**नोट:** कुछ हुक्स (`onPrepare`, `onWorkerStart`, `onWorkerEnd` और `onComplete`) एक अलग प्रक्रिया में निष्पादित किए जाते हैं और इसलिए अन्य हुक्स के साथ कोई वैश्विक डेटा साझा नहीं कर सकते जो वर्कर प्रक्रिया में रहते हैं।

### onPrepare

सभी वर्कर्स लॉन्च होने से पहले एक बार निष्पादित होता है।

पैरामीटर्स:

- `config` (`object`): WebdriverIO कॉन्फ़िगरेशन ऑब्जेक्ट
- `param` (`object[]`): क्षमताओं के विवरण की सूची

### onWorkerStart

एक वर्कर प्रोसेस के स्पॉन होने से पहले निष्पादित होता है और इसका उपयोग उस वर्कर के लिए विशिष्ट सेवा को इनिशियलाइज करने के साथ-साथ एक अतुल्यकालिक तरीके से रनटाइम वातावरण को संशोधित करने के लिए किया जा सकता है।

पैरामीटर्स:

- `cid` (`string`): क्षमता id (जैसे 0-0)
- `caps` (`object`): वर्कर में स्पॉन होने वाले सत्र के लिए क्षमताएँ
- `specs` (`string[]`): वर्कर प्रोसेस में चलाई जाने वाली स्पेक्स
- `args` (`object`): ऑब्जेक्ट जो मुख्य कॉन्फ़िगरेशन के साथ मर्ज किया जाएगा जब वर्कर इनिशियलाइज हो जाता है
- `execArgv` (`string[]`): वर्कर प्रोसेस को पास किए गए स्ट्रिंग आर्गुमेंट की सूची

### onWorkerEnd

एक वर्कर प्रोसेस के बाहर निकलने के तुरंत बाद निष्पादित होता है।

पैरामीटर्स:

- `cid` (`string`): क्षमता id (जैसे 0-0)
- `exitCode` (`number`): 0 - सफलता, 1 - विफलता
- `specs` (`string[]`): वर्कर प्रोसेस में चलाई जाने वाली स्पेक्स
- `retries` (`number`): [_"प्रति-स्पेकफाइल आधार पर रिट्रायज जोड़ें"_](./Retry.md#add-retries-on-a-per-specfile-basis) में परिभाषित के रूप में उपयोग किए गए स्पेक स्तर रिट्रायज की संख्या

### beforeSession

webdriver सत्र और टेस्ट फ्रेमवर्क को इनिशियलाइज करने से ठीक पहले निष्पादित होता है। यह आपको क्षमता या स्पेक के आधार पर कॉन्फ़िगरेशन में हेरफेर करने की अनुमति देता है।

पैरामीटर्स:

- `config` (`object`): WebdriverIO कॉन्फ़िगरेशन ऑब्जेक्ट
- `caps` (`object`): वर्कर में स्पॉन होने वाले सत्र के लिए क्षमताएँ
- `specs` (`string[]`): वर्कर प्रोसेस में चलाई जाने वाली स्पेक्स

### before

टेस्ट निष्पादन शुरू होने से पहले निष्पादित होता है। इस बिंदु पर आप `browser` जैसे सभी ग्लोबल वेरिएबल तक पहुंच सकते हैं। यह कस्टम कमांड को परिभाषित करने के लिए एक आदर्श स्थान है।

पैरामीटर्स:

- `caps` (`object`): वर्कर में स्पॉन होने वाले सत्र के लिए क्षमताएँ
- `specs` (`string[]`): वर्कर प्रोसेस में चलाई जाने वाली स्पेक्स
- `browser` (`object`): बनाए गए ब्राउज़र/डिवाइस सत्र का इंस्टेंस

### beforeSuite

हुक जो सूट शुरू होने से पहले निष्पादित होता है (केवल Mocha/Jasmine में)

पैरामीटर्स:

- `suite` (`object`): सूट विवरण

### beforeHook

हुक जो सूट के भीतर एक हुक से *पहले* निष्पादित होता है (जैसे Mocha में beforeEach को कॉल करने से पहले चलता है)

पैरामीटर्स:

- `test` (`object`): टेस्ट विवरण
- `context` (`object`): टेस्ट कॉन्टेक्स्ट (Cucumber में World ऑब्जेक्ट का प्रतिनिधित्व करता है)

### afterHook

हुक जो सूट के भीतर एक हुक के *बाद* निष्पादित होता है (जैसे Mocha में afterEach को कॉल करने के बाद चलता है)

पैरामीटर्स:

- `test` (`object`): टेस्ट विवरण
- `context` (`object`): टेस्ट कॉन्टेक्स्ट (Cucumber में World ऑब्जेक्ट का प्रतिनिधित्व करता है)
- `result` (`object`): हुक परिणाम (`error`, `result`, `duration`, `passed`, `retries` प्रॉपर्टीज को शामिल करता है)

### beforeTest

एक टेस्ट से पहले निष्पादित की जाने वाली फंक्शन (केवल Mocha/Jasmine में)।

पैरामीटर्स:

- `test` (`object`): टेस्ट विवरण
- `context` (`object`): स्कोप ऑब्जेक्ट जिसके साथ टेस्ट निष्पादित किया गया था

### beforeCommand

WebdriverIO कमांड के निष्पादित होने से पहले चलता है।

पैरामीटर्स:

- `commandName` (`string`): कमांड नाम
- `args` (`*`): आर्गुमेंट जो कमांड प्राप्त करेगा

### afterCommand

WebdriverIO कमांड के निष्पादित होने के बाद चलता है।

पैरामीटर्स:

- `commandName` (`string`): कमांड नाम
- `args` (`*`): आर्गुमेंट जो कमांड प्राप्त करेगा
- `result` (`*`): कमांड का परिणाम
- `error` (`Error`): त्रुटि ऑब्जेक्ट यदि कोई हो

### afterTest

एक टेस्ट (Mocha/Jasmine में) समाप्त होने के बाद निष्पादित की जाने वाली फंक्शन।

पैरामीटर्स:

- `test` (`object`): टेस्ट विवरण
- `context` (`object`): स्कोप ऑब्जेक्ट जिसके साथ टेस्ट निष्पादित किया गया था
- `result.error` (`Error`): त्रुटि ऑब्जेक्ट यदि टेस्ट विफल होता है, अन्यथा `undefined`
- `result.result` (`Any`): टेस्ट फंक्शन का रिटर्न ऑब्जेक्ट
- `result.duration` (`Number`): टेस्ट की अवधि
- `result.passed` (`Boolean`): यदि टेस्ट पास हो गया है तो true, अन्यथा false
- `result.retries` (`Object`): [Mocha और Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) के साथ-साथ [Cucumber](./Retry.md#rerunning-in-cucumber) के लिए परिभाषित के रूप में सिंगल टेस्ट संबंधित रिट्रायज के बारे में जानकारी, उदाहरण के लिए `{ attempts: 0, limit: 0 }`, देखें
- `result` (`object`): हुक परिणाम (`error`, `result`, `duration`, `passed`, `retries` प्रॉपर्टीज शामिल करता है)

### afterSuite

हुक जो सूट के समाप्त होने के बाद निष्पादित होता है (केवल Mocha/Jasmine में)

पैरामीटर्स:

- `suite` (`object`): सूट विवरण

### after

सभी टेस्ट के पूरा होने के बाद निष्पादित होता है। आपके पास अभी भी टेस्ट से सभी ग्लोबल वेरिएबल तक पहुंच है।

पैरामीटर्स:

- `result` (`number`): 0 - टेस्ट पास, 1 - टेस्ट फेल
- `caps` (`object`): वर्कर में स्पॉन होने वाले सत्र के लिए क्षमताएँ
- `specs` (`string[]`): वर्कर प्रोसेस में चलाई जाने वाली स्पेक्स

### afterSession

webdriver सत्र को समाप्त करने के ठीक बाद निष्पादित होता है।

पैरामीटर्स:

- `config` (`object`): WebdriverIO कॉन्फ़िगरेशन ऑब्जेक्ट
- `caps` (`object`): वर्कर में स्पॉन होने वाले सत्र के लिए क्षमताएँ
- `specs` (`string[]`): वर्कर प्रोसेस में चलाई जाने वाली स्पेक्स

### onComplete

सभी वर्कर्स के बंद होने और प्रक्रिया के बाहर निकलने की स्थिति में निष्पादित होता है। onComplete हुक में फेंकी गई त्रुटि के परिणामस्वरूप टेस्ट रन विफल हो जाएगा।

पैरामीटर्स:

- `exitCode` (`number`): 0 - सफलता, 1 - विफलता
- `config` (`object`): WebdriverIO कॉन्फ़िगरेशन ऑब्जेक्ट
- `caps` (`object`): वर्कर में स्पॉन होने वाले सत्र के लिए क्षमताएँ
- `result` (`object`): टेस्ट परिणामों वाला परिणाम ऑब्जेक्ट

### onReload

रिफ्रेश होने पर निष्पादित होता है।

पैरामीटर्स:

- `oldSessionId` (`string`): पुराने सत्र का ID
- `newSessionId` (`string`): नए सत्र का ID

### beforeFeature

Cucumber फीचर से पहले चलता है।

पैरामीटर्स:

- `uri` (`string`): फीचर फ़ाइल का पथ
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumber फीचर ऑब्जेक्ट

### afterFeature

Cucumber फीचर के बाद चलता है।

पैरामीटर्स:

- `uri` (`string`): फीचर फ़ाइल का पथ
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumber फीचर ऑब्जेक्ट

### beforeScenario

Cucumber सिनेरियो से पहले चलता है।

पैरामीटर्स:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): वर्ल्ड ऑब्जेक्ट जिसमें पिकल और टेस्ट स्टेप पर जानकारी शामिल है
- `context` (`object`): Cucumber वर्ल्ड ऑब्जेक्ट

### afterScenario

Cucumber सिनेरियो के बाद चलता है।

पैरामीटर्स:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): वर्ल्ड ऑब्जेक्ट जिसमें पिकल और टेस्ट स्टेप पर जानकारी शामिल है
- `result` (`object`): सिनेरियो परिणामों वाला परिणाम ऑब्जेक्ट
- `result.passed` (`boolean`): यदि सिनेरियो पास हो गया है तो true
- `result.error` (`string`): यदि सिनेरियो विफल हो गया है तो त्रुटि स्टैक
- `result.duration` (`number`): मिलीसेकंड में सिनेरियो की अवधि
- `context` (`object`): Cucumber वर्ल्ड ऑब्जेक्ट

### beforeStep

Cucumber स्टेप से पहले चलता है।

पैरामीटर्स:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber स्टेप ऑब्जेक्ट
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber सिनेरियो ऑब्जेक्ट
- `context` (`object`): Cucumber वर्ल्ड ऑब्जेक्ट

### afterStep

Cucumber स्टेप के बाद चलता है।

पैरामीटर्स:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber स्टेप ऑब्जेक्ट
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber सिनेरियो ऑब्जेक्ट
- `result`: (`object`): स्टेप परिणामों वाला परिणाम ऑब्जेक्ट
- `result.passed` (`boolean`): यदि सिनेरियो पास हो गया है तो true
- `result.error` (`string`): यदि सिनेरियो विफल हो गया है तो त्रुटि स्टैक
- `result.duration` (`number`): मिलीसेकंड में सिनेरियो की अवधि
- `context` (`object`): Cucumber वर्ल्ड ऑब्जेक्ट

### beforeAssertion

हुक जो WebdriverIO असर्शन होने से पहले निष्पादित होता है।

पैरामीटर्स:

- `params`: असर्शन जानकारी
- `params.matcherName` (`string`): मैचर का नाम (जैसे `toHaveTitle`)
- `params.expectedValue`: वैल्यू जो मैचर में पास की जाती है
- `params.options`: असर्शन विकल्प

### afterAssertion

हुक जो WebdriverIO असर्शन के होने के बाद निष्पादित होता है।

पैरामीटर्स:

- `params`: असर्शन जानकारी
- `params.matcherName` (`string`): मैचर का नाम (जैसे `toHaveTitle`)
- `params.expectedValue`: वैल्यू जो मैचर में पास की जाती है
- `params.options`: असर्शन विकल्प
- `params.result`: असर्शन परिणाम