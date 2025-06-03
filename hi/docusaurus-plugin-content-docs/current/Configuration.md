---
id: configuration
title: कॉन्फिगरेशन
---

[सेटअप प्रकार](/docs/setuptypes) (जैसे कि रॉ प्रोटोकॉल बाइंडिंग का उपयोग करना, स्टैंडअलोन पैकेज के रूप में WebdriverIO या WDIO टेस्टरनर) के आधार पर पर्यावरण को नियंत्रित करने के लिए विकल्पों का एक अलग सेट उपलब्ध है।

## WebDriver विकल्प

निम्नलिखित विकल्प [`webdriver`](https://www.npmjs.com/package/webdriver) प्रोटोकॉल पैकेज का उपयोग करते समय परिभाषित किए जाते हैं:

### protocol

ड्राइवर सर्वर के साथ संवाद करने के लिए उपयोग किया जाने वाला प्रोटोकॉल।

प्रकार: `String`<br />
डिफॉल्ट: `http`

### hostname

आपके ड्राइवर सर्वर का होस्ट।

प्रकार: `String`<br />
डिफॉल्ट: `0.0.0.0`

### port

आपका ड्राइवर सर्वर जिस पोर्ट पर है।

प्रकार: `Number`<br />
डिफॉल्ट: `undefined`

### path

ड्राइवर सर्वर एंडपॉइंट का पथ।

प्रकार: `String`<br />
डिफॉल्ट: `/`

### queryParams

क्वेरी पैरामीटर जो ड्राइवर सर्वर को प्रचारित किए जाते हैं।

प्रकार: `Object`<br />
डिफॉल्ट: `undefined`

### user

आपका क्लाउड सेवा उपयोगकर्ता नाम (केवल [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) या [LambdaTest](https://www.lambdatest.com) खातों के लिए काम करता है)। यदि सेट है, तो WebdriverIO स्वचालित रूप से आपके लिए कनेक्शन विकल्प सेट करेगा। यदि आप क्लाउड प्रदाता का उपयोग नहीं करते हैं, तो इसका उपयोग किसी अन्य WebDriver बैकएंड को प्रमाणित करने के लिए किया जा सकता है।

प्रकार: `String`<br />
डिफॉल्ट: `undefined`

### key

आपकी क्लाउड सेवा एक्सेस कुंजी या गुप्त कुंजी (केवल [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) या [LambdaTest](https://www.lambdatest.com) खातों के लिए काम करता है)। यदि सेट है, तो WebdriverIO स्वचालित रूप से आपके लिए कनेक्शन विकल्प सेट करेगा। यदि आप क्लाउड प्रदाता का उपयोग नहीं करते हैं, तो इसका उपयोग किसी अन्य WebDriver बैकएंड को प्रमाणित करने के लिए किया जा सकता है।

प्रकार: `String`<br />
डिफॉल्ट: `undefined`

### capabilities

उन क्षमताओं को परिभाषित करता है जिन्हें आप अपने WebDriver सत्र में चलाना चाहते हैं। अधिक विवरण के लिए [WebDriver प्रोटोकॉल](https://w3c.github.io/webdriver/#capabilities) देखें। यदि आप एक पुराना ड्राइवर चला रहे हैं जो WebDriver प्रोटोकॉल का समर्थन नहीं करता है, तो आपको सत्र को सफलतापूर्वक चलाने के लिए [JSONWireProtocol क्षमताओं](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) का उपयोग करने की आवश्यकता होगी।

WebDriver आधारित क्षमताओं के अलावा आप ब्राउज़र और विक्रेता विशिष्ट विकल्प लागू कर सकते हैं जो रिमोट ब्राउज़र या डिवाइस को गहराई से कॉन्फिगर करने की अनुमति देते हैं। ये संबंधित विक्रेता दस्तावेजों में दस्तावेज किए गए हैं, उदाहरण के लिए:

- `goog:chromeOptions`: [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106) के लिए
- `moz:firefoxOptions`: [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html) के लिए
- `ms:edgeOptions`: [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class) के लिए
- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional) के लिए
- `bstack:options`: [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#) के लिए
- `selenoid:options`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc) के लिए

इसके अतिरिक्त, एक उपयोगी उपकरण Sauce Labs [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) है, जो आपको अपनी वांछित क्षमताओं को क्लिक करके इस ऑब्जेक्ट को बनाने में मदद करता है।

प्रकार: `Object`<br />
डिफॉल्ट: `null`

**उदाहरण:**

```js
{
    browserName: 'chrome', // विकल्प: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // ब्राउज़र संस्करण
    platformName: 'Windows 10' // OS प्लेटफॉर्म
}
```

यदि आप मोबाइल डिवाइस पर वेब या नेटिव टेस्ट चला रहे हैं, तो `capabilities` WebDriver प्रोटोकॉल से अलग होता है। अधिक विवरण के लिए [Appium डॉक्स](https://appium.io/docs/en/latest/guides/caps/) देखें।

### logLevel

लॉगिंग वर्बोसिटी का स्तर।

प्रकार: `String`<br />
डिफॉल्ट: `info`<br />
विकल्प: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

सभी टेस्टरनर लॉग फाइलों (रिपोर्टर लॉग और `wdio` लॉग सहित) को स्टोर करने के लिए डायरेक्टरी। यदि सेट नहीं है, तो सभी लॉग `stdout` पर स्ट्रीम किए जाते हैं। चूंकि अधिकांश रिपोर्टर `stdout` पर लॉग करने के लिए बनाए गए हैं, इसलिए यह अनुशंसा की जाती है कि इस विकल्प का उपयोग केवल विशिष्ट रिपोर्टरों के लिए करें जहां रिपोर्ट को फाइल में पुश करना अधिक समझ में आता है (जैसे `junit` रिपोर्टर, उदाहरण के लिए)।

स्टैंडअलोन मोड में चलते समय, WebdriverIO द्वारा उत्पन्न एकमात्र लॉग `wdio` लॉग होगा।

प्रकार: `String`<br />
डिफॉल्ट: `null`

### connectionRetryTimeout

किसी ड्राइवर या ग्रिड के लिए किसी भी WebDriver अनुरोध का टाइमआउट।

प्रकार: `Number`<br />
डिफॉल्ट: `120000`

### connectionRetryCount

सेलेनियम सर्वर के लिए अनुरोध पुनः प्रयासों की अधिकतम संख्या।

प्रकार: `Number`<br />
डिफॉल्ट: `3`

### agent

आपको अनुरोध करने के लिए कस्टम `http`/`https`/`http2` [एजेंट](https://www.npmjs.com/package/got#agent) का उपयोग करने की अनुमति देता है।

प्रकार: `Object`<br />
डिफॉल्ट:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

हर WebDriver अनुरोध में पास करने के लिए कस्टम `headers` निर्दिष्ट करें। यदि आपके सेलेनियम ग्रिड को बेसिक ऑथेंटिकेशन की आवश्यकता है, तो हम आपके WebDriver अनुरोधों को प्रमाणित करने के लिए इस विकल्प के माध्यम से `Authorization` हेडर पास करने की अनुशंसा करते हैं, उदाहरण के लिए:

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

प्रकार: `Object`<br />
डिफॉल्ट: `{}`

### transformRequest

WebDriver अनुरोध किए जाने से पहले [HTTP अनुरोध विकल्पों](https://github.com/sindresorhus/got#options) को इंटरसेप्ट करने वाला फंक्शन

प्रकार: `(RequestOptions) => RequestOptions`<br />
डिफॉल्ट: *कोई नहीं*

### transformResponse

WebDriver प्रतिक्रिया आने के बाद HTTP प्रतिक्रिया ऑब्जेक्ट्स को इंटरसेप्ट करने वाला फंक्शन। फंक्शन को मूल प्रतिक्रिया ऑब्जेक्ट पहले आर्गुमेंट के रूप में और संबंधित `RequestOptions` को दूसरे आर्गुमेंट के रूप में पास किया जाता है।

प्रकार: `(Response, RequestOptions) => Response`<br />
डिफॉल्ट: *कोई नहीं*

### strictSSL

क्या यह SSL सर्टिफिकेट के वैध होने की आवश्यकता नहीं है।
इसे पर्यावरण चर `STRICT_SSL` या `strict_ssl` के माध्यम से सेट किया जा सकता है।

प्रकार: `Boolean`<br />
डिफॉल्ट: `true`

### enableDirectConnect

क्या [Appium डायरेक्ट कनेक्शन फीचर](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) सक्षम करें।
अगर फ्लैग सक्षम होने के बावजूद रिस्पांस में उचित कुंजियां नहीं थीं तो यह कुछ नहीं करता है।

प्रकार: `Boolean`<br />
डिफॉल्ट: `true`

### cacheDir

कैश डायरेक्टरी के रूट का पथ। इस डायरेक्टरी का उपयोग सभी ड्राइवरों को स्टोर करने के लिए किया जाता है जो सत्र शुरू करने का प्रयास करते समय डाउनलोड किए जाते हैं।

प्रकार: `String`<br />
डिफॉल्ट: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

अधिक सुरक्षित लॉगिंग के लिए, `maskingPatterns` के साथ सेट किए गए रेगुलर एक्सप्रेशन लॉग से संवेदनशील जानकारी को अस्पष्ट कर सकते हैं।
 - स्ट्रिंग फॉर्मेट फ्लैग के साथ या बिना (जैसे `/.../i`) रेगुलर एक्सप्रेशन है, और एकाधिक रेगुलर एक्सप्रेशन के लिए अल्पविराम से अलग किया गया है।
 - मास्किंग पैटर्न के बारे में अधिक जानकारी के लिए, [WDIO लॉगर README में मास्किंग पैटर्न अनुभाग](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns) देखें।

प्रकार: `String`<br />
डिफॉल्ट: `undefined`

**उदाहरण:**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

---

## WebdriverIO

निम्नलिखित विकल्प (ऊपर सूचीबद्ध विकल्पों सहित) स्टैंडअलोन में WebdriverIO के साथ उपयोग किए जा सकते हैं:

### automationProtocol

उस प्रोटोकॉल को परिभाषित करें जिसे आप अपने ब्राउज़र ऑटोमेशन के लिए उपयोग करना चाहते हैं। वर्तमान में केवल [`webdriver`](https://www.npmjs.com/package/webdriver) समर्थित है, क्योंकि यह मुख्य ब्राउज़र ऑटोमेशन तकनीक है जिसे WebdriverIO उपयोग करता है।

यदि आप किसी अलग ऑटोमेशन तकनीक का उपयोग करके ब्राउज़र को ऑटोमेट करना चाहते हैं, तो आप इस प्रॉपर्टी को एक पथ पर सेट करें जो निम्नलिखित इंटरफेस का पालन करने वाले मॉड्यूल को हल करे:

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

प्रकार: `String`<br />
डिफॉल्ट: `webdriver`

### baseUrl

बेस URL सेट करके `url` कमांड कॉल को छोटा करें।
- अगर आपका `url` पैरामीटर `/` से शुरू होता है, तो `baseUrl` पहले जोड़ा जाता है (सिवाय `baseUrl` पथ के, अगर उसमें कोई है)।
- अगर आपका `url` पैरामीटर बिना किसी स्कीम या `/` (जैसे `some/path`) के शुरू होता है, तो पूरा `baseUrl` सीधे पहले जोड़ा जाता है।

प्रकार: `String`<br />
डिफॉल्ट: `null`

### waitforTimeout

सभी `waitFor*` कमांड्स के लिए डिफॉल्ट टाइमआउट। (ध्यान दें कि विकल्प नाम में लोअरकेस `f` है।) यह टाइमआउट __केवल__ `waitFor*` से शुरू होने वाले कमांड्स और उनके डिफॉल्ट प्रतीक्षा समय को प्रभावित करता है।

किसी _परीक्षण_ के लिए टाइमआउट बढ़ाने के लिए, कृपया फ्रेमवर्क दस्तावेज़ देखें।

प्रकार: `Number`<br />
डिफॉल्ट: `5000`

### waitforInterval

सभी `waitFor*` कमांड्स के लिए डिफॉल्ट अंतराल, यह जांचने के लिए कि अपेक्षित स्थिति (जैसे, दृश्यता) बदल दी गई है या नहीं।

प्रकार: `Number`<br />
डिफॉल्ट: `100`

### region

यदि Sauce Labs पर चल रहे हैं, तो आप विभिन्न डेटा सेंटरों के बीच परीक्षण चलाने का चयन कर सकते हैं: US या EU।
अपने क्षेत्र को EU में बदलने के लिए, अपने कॉन्फिग में `region: 'eu'` जोड़ें।

__नोट:__ इसका प्रभाव केवल तभी पड़ता है जब आप `user` और `key` विकल्प प्रदान करते हैं जो आपके Sauce Labs खाते से जुड़े हों।

प्रकार: `String`<br />
डिफॉल्ट: `us`

*(केवल vm और या em/सिम्युलेटर्स के लिए)*

---

## टेस्टरनर विकल्प

निम्नलिखित विकल्प (ऊपर सूचीबद्ध विकल्पों सहित) केवल WDIO टेस्टरनर के साथ WebdriverIO चलाने के लिए परिभाषित किए गए हैं:

### specs

परीक्षण निष्पादन के लिए specs परिभाषित करें। आप या तो एक ग्लोब पैटर्न निर्दिष्ट कर सकते हैं जो एक ही समय में कई फाइलों से मेल खाता है या एक ग्लोब या पथों के सेट को एक सरणी में लपेट सकते हैं ताकि उन्हें एक ही वर्कर प्रक्रिया के भीतर चलाया जा सके। सभी पथ कॉन्फिग फाइल पथ से सापेक्ष माने जाते हैं।

प्रकार: `(String | String[])[]`<br />
डिफॉल्ट: `[]`

### exclude

परीक्षण निष्पादन से specs को बाहर करें। सभी पथ कॉन्फिग फाइल पथ से सापेक्ष माने जाते हैं।

प्रकार: `String[]`<br />
डिफॉल्ट: `[]`

### suites

विभिन्न सूट का वर्णन करने वाला एक ऑब्जेक्ट, जिसे आप फिर `wdio` CLI पर `--suite` विकल्प के साथ निर्दिष्ट कर सकते हैं।

प्रकार: `Object`<br />
डिफॉल्ट: `{}`

### capabilities

ऊपर वर्णित `capabilities` अनुभाग के समान, लेकिन समांतर निष्पादन के लिए या तो [`multiremote`](/docs/multiremote) ऑब्जेक्ट, या सरणी में एकाधिक WebDriver सत्र निर्दिष्ट करने के विकल्प के साथ।

आप [ऊपर](/docs/configuration#capabilities) परिभाषित समान विक्रेता और ब्राउज़र विशिष्ट क्षमताओं को लागू कर सकते हैं।

प्रकार: `Object`|`Object[]`<br />
डिफॉल्ट: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

कुल समानांतर चलने वाले वर्कर्स की अधिकतम संख्या।

__नोट:__ यह संख्या `100` जितनी अधिक हो सकती है, जब परीक्षण किसी बाहरी विक्रेता जैसे Sauce Labs की मशीनों पर किए जा रहे हों। वहां, परीक्षण एक ही मशीन पर नहीं, बल्कि कई वीएम पर किए जाते हैं। यदि परीक्षण स्थानीय विकास मशीन पर चलाए जाने हैं, तो `3`, `4`, या `5` जैसी अधिक उचित संख्या का उपयोग करें। अनिवार्य रूप से, यह एक ही समय में शुरू होने वाले और आपके परीक्षणों को चलाने वाले ब्राउज़रों की संख्या है, इसलिए यह इस बात पर निर्भर करता है कि आपकी मशीन पर कितना RAM है, और आपकी मशीन पर कितने अन्य ऐप्स चल रहे हैं।

आप अपनी क्षमता ऑब्जेक्ट्स के भीतर `wdio:maxInstances` क्षमता का उपयोग करके `maxInstances` भी लागू कर सकते हैं। यह उस विशेष क्षमता के लिए समानांतर सत्रों की मात्रा को सीमित करेगा।

प्रकार: `Number`<br />
डिफॉल्ट: `100`

### maxInstancesPerCapability

प्रति क्षमता अधिकतम कुल समानांतर चलने वाले वर्कर्स।

प्रकार: `Number`<br />
डिफॉल्ट: `100`

### injectGlobals

WebdriverIO के ग्लोबल्स (जैसे `browser`, `$` और `$$`) को ग्लोबल पर्यावरण में डालता है।
यदि आप `false` पर सेट करते हैं, तो आपको `@wdio/globals` से इम्पोर्ट करना चाहिए, उदाहरण के लिए:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

नोट: WebdriverIO टेस्ट फ्रेमवर्क विशिष्ट ग्लोबल्स के इंजेक्शन को संभालता नहीं है।

प्रकार: `Boolean`<br />
डिफॉल्ट: `true`

### bail

यदि आप चाहते हैं कि आपका परीक्षण रन परीक्षण विफलताओं की एक विशिष्ट संख्या के बाद रुक जाए, तो `bail` का उपयोग करें।
(यह डिफॉल्ट रूप से `0` होता है, जो चाहे जो भी हो सभी परीक्षण चलाता है।) **नोट:** इस संदर्भ में एक परीक्षण एक एकल स्पेक फाइल (Mocha या Jasmine का उपयोग करते समय) के भीतर सभी परीक्षण हैं या फीचर फाइल (Cucumber का उपयोग करते समय) के भीतर सभी स्टेप्स हैं। यदि आप एकल परीक्षण फाइल के परीक्षणों के भीतर bail व्यवहार को नियंत्रित करना चाहते हैं, तो उपलब्ध [फ्रेमवर्क](frameworks) विकल्पों पर एक नज़र डालें।

प्रकार: `Number`<br />
डिफॉल्ट: `0` (bail न करें; सभी परीक्षण चलाएं)

### specFileRetries

जब पूरी specfile एक साथ विफल होती है तो पूरी specfile को पुनः प्रयास करने की संख्या।

प्रकार: `Number`<br />
डिफॉल्ट: `0`

### specFileRetriesDelay

स्पेक फाइल पुनः प्रयास प्रयासों के बीच सेकंड में देरी

प्रकार: `Number`<br />
डिफॉल्ट: `0`

### specFileRetriesDeferred

क्या पुनः प्रयास की गई स्पेक फाइलों को तुरंत पुनः प्रयास किया जाना चाहिए या कतार के अंत तक स्थगित किया जाना चाहिए।

प्रकार: `Boolean`<br />
डिफॉल्ट: `true`

### groupLogsByTestSpec

लॉग आउटपुट व्यू चुनें।

यदि `false` पर सेट है, तो विभिन्न परीक्षण फाइलों से लॉग वास्तविक समय में प्रिंट किए जाएंगे। कृपया ध्यान दें कि समानांतर चलाते समय यह विभिन्न फाइलों से लॉग आउटपुट के मिश्रण का कारण हो सकता है।

यदि `true` पर सेट है, तो लॉग आउटपुट टेस्ट स्पेक द्वारा समूहीकृत किए जाएंगे और केवल तभी प्रिंट किए जाएंगे जब टेस्ट स्पेक पूरा हो जाता है।

डिफॉल्ट रूप से, यह `false` पर सेट है ताकि लॉग वास्तविक समय में प्रिंट किए जाएं।

प्रकार: `Boolean`<br />
डिफॉल्ट: `false`

### services

सेवाएं एक विशिष्ट कार्य लेती हैं जिसकी आप देखभाल नहीं करना चाहते हैं। वे आपके परीक्षण सेटअप को लगभग बिना किसी प्रयास के बढ़ाते हैं।

प्रकार: `String[]|Object[]`<br />
डिफॉल्ट: `[]`

### framework

WDIO टेस्टरनर द्वारा उपयोग किए जाने वाले परीक्षण फ्रेमवर्क को परिभाषित करता है।

प्रकार: `String`<br />
डिफॉल्ट: `mocha`<br />
विकल्प: `mocha` | `jasmine`

### mochaOpts, jasmineOpts और cucumberOpts

विशिष्ट फ्रेमवर्क-संबंधित विकल्प। देखें कि कौन से विकल्प उपलब्ध हैं, फ्रेमवर्क एडाप्टर दस्तावेज़ीकरण। [फ्रेमवर्क्स](frameworks) में इस पर अधिक पढ़ें।

प्रकार: `Object`<br />
डिफॉल्ट: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

लाइन नंबरों के साथ किकंबर फीचर्स की सूची (जब [cucumber फ्रेमवर्क का उपयोग करते समय](./Frameworks.md#using-cucumber))।

प्रकार: `String[]`
डिफॉल्ट: `[]`

### reporters

उपयोग करने के लिए रिपोर्टरों की सूची। एक रिपोर्टर या तो एक स्ट्रिंग हो सकता है, या
`['reporterName', { /* reporter options */}]` की सरणी जहां पहला तत्व रिपोर्टर नाम के साथ एक स्ट्रिंग है और दूसरा तत्व रिपोर्टर विकल्पों के साथ एक ऑब्जेक्ट है।

प्रकार: `String[]|Object[]`<br />
डिफॉल्ट: `[]`

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

निर्धारित करता है कि रिपोर्टर को किस अंतराल पर यह जांचना चाहिए कि क्या वे सिंक्रनाइज़ हैं यदि वे अपने लॉग को असिंक्रोनस रूप से रिपोर्ट करते हैं (जैसे, यदि लॉग किसी 3rd पार्टी विक्रेता पर स्ट्रीम किए जाते हैं)।

प्रकार: `Number`<br />
डिफॉल्ट: `100` (ms)

### reporterSyncTimeout

निर्धारित करता है कि रिपोर्टरों के पास अपने सभी लॉग अपलोड करने के लिए अधिकतम समय है जब तक कि टेस्टरनर द्वारा एक त्रुटि नहीं फेंकी जाती है।

प्रकार: `Number`<br />
डिफॉल्ट: `5000` (ms)

### execArgv

चाइल्ड प्रोसेस लॉन्च करते समय निर्दिष्ट करने के लिए नोड आर्गुमेंट्स।

प्रकार: `String[]`<br />
डिफॉल्ट: `null`

### filesToWatch

ग्लोब समर्थित स्ट्रिंग पैटर्न की एक सूची जो टेस्टरनर को बताती है कि `--watch` फ्लैग के साथ चलाते समय अतिरिक्त रूप से अन्य फाइलों को देखना है, जैसे एप्लिकेशन फाइलें। डिफॉल्ट रूप से टेस्टरनर पहले से ही सभी स्पेक फाइलों को देखता है।

प्रकार: `String[]`<br />
डिफॉल्ट: `[]`

### updateSnapshots

यदि आप अपने स्नैपशॉट को अपडेट करना चाहते हैं तो true पर सेट करें। आदर्श रूप से CLI पैरामीटर के भाग के रूप में उपयोग किया जाता है, जैसे `wdio run wdio.conf.js --s`।

प्रकार: `'new' | 'all' | 'none'`<br />
डिफॉल्ट: `none` यदि प्रदान नहीं किया गया है और परीक्षण CI में चलते हैं, `new` यदि प्रदान नहीं किया गया है, अन्यथा जो प्रदान किया गया है

### resolveSnapshotPath

डिफॉल्ट स्नैपशॉट पथ को ओवरराइड करता है। उदाहरण के लिए, स्नैपशॉट को परीक्षण फाइलों के बगल में स्टोर करने के लिए।

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

प्रकार: `(testPath: string, snapExtension: string) => string`<br />
डिफॉल्ट: परीक्षण फाइल के बगल में `__snapshots__` डायरेक्टरी में स्नैपशॉट फाइलें स्टोर करता है

### tsConfigPath

WDIO TypeScript फाइलों को कंपाइल करने के लिए `tsx` का उपयोग करता है। आपका TSConfig वर्तमान कार्यशील निर्देशिका से स्वचालित रूप से पता लगाया जाता है लेकिन आप यहां एक कस्टम पथ निर्दिष्ट कर सकते हैं या TSX_TSCONFIG_PATH पर्यावरण चर सेट कर सकते हैं।

`tsx` दस्तावेज़ देखें: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

प्रकार: `String`<br />
डिफॉल्ट: `null`<br />

## हुक्स

WDIO टेस्टरनर आपको हुक्स सेट करने की अनुमति देता है जो परीक्षण जीवनचक्र के विशिष्ट समय पर ट्रिगर होने के लिए हैं। यह कस्टम क्रियाओं (जैसे यदि कोई परीक्षण विफल होता है तो स्क्रीनशॉट लें) की अनुमति देता है।

प्रत्येक हुक के पास पैरामीटर के रूप में जीवनचक्र के बारे में विशिष्ट जानकारी है (जैसे परीक्षण सूट या परीक्षण के बारे में जानकारी)। [हमारे उदाहरण कॉन्फिग](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326) में सभी हुक प्रॉपर्टीज के बारे में अधिक पढ़ें।

**नोट:** कुछ हुक्स (`onPrepare`, `onWorkerStart`, `onWorkerEnd` और `onComplete`) एक अलग प्रक्रिया में निष्पादित किए जाते हैं और इसलिए अन्य हुक्स के साथ कोई वैश्विक डेटा साझा नहीं कर सकते जो वर्कर प्रक्रिया में रहते हैं।

### onPrepare

सभी वर्कर्स को लॉन्च करने से पहले एक बार निष्पादित होता है।

पैरामीटर्स:

- `config` (`object`): WebdriverIO कॉन्फिगरेशन ऑब्जेक्ट
- `param` (`object[]`): क्षमताओं के विवरण की सूची

### onWorkerStart

एक वर्कर प्रक्रिया के स्पॉन होने से पहले निष्पादित होता है और उस वर्कर के लिए विशिष्ट सेवा को प्रारंभ करने के लिए और साथ ही एसिंक फैशन में रनटाइम पर्यावरण को संशोधित करने के लिए उपयोग किया जा सकता है।

पैरामीटर्स:

- `cid` (`string`): क्षमता आईडी (जैसे 0-0)
- `caps` (`object`): वर्कर में स्पॉन होने वाले सत्र के लिए क्षमताएं
- `specs` (`string[]`): वर्कर प्रक्रिया में चलाए जाने वाले स्पेक्स
- `args` (`object`): ऑब्जेक्ट जो मुख्य कॉन्फिगरेशन के साथ मर्ज किया जाएगा एक बार वर्कर प्रारंभ हो जाने के बाद
- `execArgv` (`string[]`): वर्कर प्रक्रिया को पास किए गए स्ट्रिंग आर्गुमेंट्स की सूची

### onWorkerEnd

एक वर्कर प्रक्रिया के बाहर निकलने के ठीक बाद निष्पादित होता है।

पैरामीटर्स:

- `cid` (`string`): क्षमता आईडी (जैसे 0-0)
- `exitCode` (`number`): 0 - सफलता, 1 - विफलता
- `specs` (`string[]`): वर्कर प्रक्रिया में चलाए जाने वाले स्पेक्स
- `retries` (`number`): [_"एक प्रति-स्पेकफाइल आधार पर पुनः प्रयास जोड़ें"_](./Retry.md#add-retries-on-a-per-specfile-basis) में परिभाषित के रूप में उपयोग किए गए स्पेक स्तर के पुनः प्रयासों की संख्या

### beforeSession

वेबड्राइवर सत्र और परीक्षण फ्रेमवर्क को प्रारंभ करने से ठीक पहले निष्पादित होता है। यह आपको क्षमता या स्पेक के आधार पर कॉन्फिगरेशन में हेरफेर करने की अनुमति देता है।

पैरामीटर्स:

- `config` (`object`): WebdriverIO कॉन्फिगरेशन ऑब्जेक्ट
- `caps` (`object`): वर्कर में स्पॉन होने वाले सत्र के लिए क्षमताएं
- `specs` (`string[]`): वर्कर प्रक्रिया में चलाए जाने वाले स्पेक्स

### before

परीक्षण निष्पादन शुरू होने से पहले निष्पादित होता है। इस बिंदु पर आप `browser` जैसे सभी वैश्विक चर तक पहुंच सकते हैं। यह कस्टम कमांड्स को परिभाषित करने के लिए सही जगह है।

पैरामीटर्स:

- `caps` (`object`): वर्कर में स्पॉन होने वाले सत्र के लिए क्षमताएं
- `specs` (`string[]`): वर्कर प्रक्रिया में चलाए जाने वाले स्पेक्स
- `browser` (`object`): बनाए गए ब्राउज़र/डिवाइस सत्र का इंस्टेंस

### beforeSuite

हुक जो सूट शुरू होने से पहले निष्पादित होता है (केवल Mocha/Jasmine में)

पैरामीटर्स:

- `suite` (`object`): सूट विवरण

### beforeHook

हुक जो सूट के भीतर हुक शुरू होने से *पहले* निष्पादित होता है (जैसे Mocha में beforeEach को कॉल करने से पहले चलता है)

पैरामीटर्स:

- `test` (`object`): परीक्षण विवरण
- `context` (`object`): परीक्षण संदर्भ (Cucumber में World ऑब्जेक्ट का प्रतिनिधित्व करता है)

### afterHook

हुक जो सूट के भीतर हुक समाप्त होने के *बाद* निष्पादित होता है (जैसे Mocha में afterEach को कॉल करने के बाद चलता है)

पैरामीटर्स:

- `test` (`object`): परीक्षण विवरण
- `context` (`object`): परीक्षण संदर्भ (Cucumber में World ऑब्जेक्ट का प्रतिनिधित्व करता है)
- `result` (`object`): हुक परिणाम (इसमें `error`, `result`, `duration`, `passed`, `retries` प्रॉपर्टीज शामिल हैं)

### beforeTest

परीक्षण से पहले निष्पादित किया जाने वाला फंक्शन (केवल Mocha/Jasmine में)।

पैरामीटर्स:

- `test` (`object`): परीक्षण विवरण
- `context` (`object`): स्कोप ऑब्जेक्ट जिसके साथ परीक्षण निष्पादित किया गया था

### beforeCommand

WebdriverIO कमांड के निष्पादित होने से पहले चलता है।

पैरामीटर्स:

- `commandName` (`string`): कमांड नाम
- `args` (`*`): आर्गुमेंट्स जो कमांड प्राप्त करेगा

### afterCommand

WebdriverIO कमांड के निष्पादित होने के बाद चलता है।

पैरामीटर्स:

- `commandName` (`string`): कमांड नाम
- `args` (`*`): आर्गुमेंट्स जो कमांड प्राप्त करेगा
- `result` (`number`): 0 - कमांड सफलता, 1 - कमांड त्रुटि
- `error` (`Error`): त्रुटि ऑब्जेक्ट यदि कोई हो

### afterTest

परीक्षण (Mocha/Jasmine में) समाप्त होने के बाद निष्पादित किया जाने वाला फंक्शन।

पैरामीटर्स:

- `test` (`object`): परीक्षण विवरण
- `context` (`object`): स्कोप ऑब्जेक्ट जिसके साथ परीक्षण निष्पादित किया गया था
- `result.error` (`Error`): त्रुटि ऑब्जेक्ट यदि परीक्षण विफल होता है, अन्यथा `undefined`
- `result.result` (`Any`): परीक्षण फंक्शन का रिटर्न ऑब्जेक्ट
- `result.duration` (`Number`): परीक्षण की अवधि
- `result.passed` (`Boolean`): true यदि परीक्षण पास हो गया है, अन्यथा false
- `result.retries` (`Object`): [Mocha और Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) के साथ-साथ [Cucumber](./Retry.md#rerunning-in-cucumber) के लिए परिभाषित के रूप में एकल परीक्षण संबंधित पुनः प्रयासों के बारे में जानकारी, जैसे `{ attempts: 0, limit: 0 }`, देखें
- `result` (`object`): हुक परिणाम (इसमें `error`, `result`, `duration`, `passed`, `retries` प्रॉपर्टीज शामिल हैं)

### afterSuite

हुक जो सूट समाप्त होने के बाद निष्पादित होता है (केवल Mocha/Jasmine में)

पैरामीटर्स:

- `suite` (`object`): सूट विवरण

### after

सभी परीक्षण पूरे होने के बाद निष्पादित होता है। आपके पास अभी भी परीक्षण से सभी वैश्विक चर तक पहुंच है।

पैरामीटर्स:

- `result` (`number`): 0 - परीक्षण पास, 1 - परीक्षण विफल
- `caps` (`object`): वर्कर में स्पॉन होने वाले सत्र के लिए क्षमताएं
- `specs` (`string[]`): वर्कर प्रक्रिया में चलाए जाने वाले स्पेक्स

### afterSession

वेबड्राइवर सत्र को समाप्त करने के ठीक बाद निष्पादित होता है।

पैरामीटर्स:

- `config` (`object`): WebdriverIO कॉन्फिगरेशन ऑब्जेक्ट
- `caps` (`object`): वर्कर में स्पॉन होने वाले सत्र के लिए क्षमताएं
- `specs` (`string[]`): वर्कर प्रक्रिया में चलाए जाने वाले स्पेक्स

### onComplete

सभी वर्कर्स बंद होने के बाद और प्रक्रिया बाहर निकलने वाली होने के बाद निष्पादित होता है। onComplete हुक में फेंकी गई त्रुटि के परिणामस्वरूप परीक्षण रन विफल हो जाएगा।

पैरामीटर्स:

- `exitCode` (`number`): 0 - सफलता, 1 - विफलता
- `config` (`object`): WebdriverIO कॉन्फिगरेशन ऑब्जेक्ट
- `caps` (`object`): वर्कर में स्पॉन होने वाले सत्र के लिए क्षमताएं
- `result` (`object`): परीक्षण परिणाम युक्त परिणाम ऑब्जेक्ट

### onReload

रिफ्रेश होने पर निष्पादित होता है।

पैरामीटर्स:

- `oldSessionId` (`string`): पुराने सत्र की सत्र आईडी
- `newSessionId` (`string`): नए सत्र की सत्र आईडी

### beforeFeature

Cucumber फीचर से पहले चलता है।

पैरामीटर्स:

- `uri` (`string`): फीचर फाइल का पथ
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumber फीचर ऑब्जेक्ट

### afterFeature

Cucumber फीचर के बाद चलता है।

पैरामीटर्स:

- `uri` (`string`): फीचर फाइल का पथ
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): Cucumber फीचर ऑब्जेक्ट

### beforeScenario

Cucumber स्सीनारियो से पहले चलता है।

पैरामीटर्स:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): वर्ल्ड ऑब्जेक्ट जिसमें pickle और टेस्ट स्टेप पर जानकारी है
- `context` (`object`): Cucumber वर्ल्ड ऑब्जेक्ट

### afterScenario

Cucumber स्सीनारियो के बाद चलता है।

पैरामीटर्स:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): वर्ल्ड ऑब्जेक्ट जिसमें pickle और टेस्ट स्टेप पर जानकारी है
- `result` (`object`): स्सीनारियो परिणाम युक्त परिणाम ऑब्जेक्ट
- `result.passed` (`boolean`): true यदि स्सीनारियो पास हो गया है
- `result.error` (`string`): त्रुटि स्टैक यदि स्सीनारियो विफल हो गया
- `result.duration` (`number`): मिलीसेकंड में स्सीनारियो की अवधि
- `context` (`object`): Cucumber वर्ल्ड ऑब्जेक्ट

### beforeStep

Cucumber स्टेप से पहले चलता है।

पैरामीटर्स:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber स्टेप ऑब्जेक्ट
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber स्सीनारियो ऑब्जेक्ट
- `context` (`object`): Cucumber वर्ल्ड ऑब्जेक्ट

### afterStep

Cucumber स्टेप के बाद चलता है।

पैरामीटर्स:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber स्टेप ऑब्जेक्ट
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber स्सीनारियो ऑब्जेक्ट
- `result`: (`object`): स्टेप परिणाम युक्त परिणाम ऑब्जेक्ट
- `result.passed` (`boolean`): true यदि स्सीनारियो पास हो गया है
- `result.error` (`string`): त्रुटि स्टैक यदि स्सीनारियो विफल हो गया
- `result.duration` (`number`): मिलीसेकंड में स्सीनारियो की अवधि
- `context` (`object`): Cucumber वर्ल्ड ऑब्जेक्ट

### beforeAssertion

हुक जो WebdriverIO असर्शन होने से पहले निष्पादित होता है।

पैरामीटर्स:

- `params`: असर्शन जानकारी
- `params.matcherName` (`string`): मैचर का नाम (जैसे `toHaveTitle`)
- `params.expectedValue`: मान जो मैचर में पास किया जाता है
- `params.options`: असर्शन विकल्प

### afterAssertion

हुक जो WebdriverIO असर्शन होने के बाद निष्पादित होता है।

पैरामीटर्स:

- `params`: असर्शन जानकारी
- `params.matcherName` (`string`): मैचर का नाम (जैसे `toHaveTitle`)
- `params.expectedValue`: मान जो मैचर में पास किया जाता है
- `params.options`: असर्शन विकल्प
- `params.result`: असर्शन परिणाम