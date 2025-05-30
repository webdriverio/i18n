---
id: configuration
title: कॉन्फ़िगरेशन
---

[सेटअप प्रकार](/docs/setuptypes) (जैसे कि रॉ प्रोटोकॉल बाइंडिंग्स का उपयोग करना, स्टैंडअलोन पैकेज के रूप में WebdriverIO या WDIO टेस्टरनर) के आधार पर पर्यावरण को नियंत्रित करने के लिए विकल्पों का एक अलग सेट उपलब्ध है।

## WebDriver विकल्प

[`webdriver`](https://www.npmjs.com/package/webdriver) प्रोटोकॉल पैकेज का उपयोग करते समय निम्नलिखित विकल्प परिभाषित किए जाते हैं:

### protocol

ड्राइवर सर्वर के साथ संवाद करते समय उपयोग करने के लिए प्रोटोकॉल।

प्रकार: `String`<br />
डिफ़ॉल्ट: `http`

### hostname

आपके ड्राइवर सर्वर का होस्ट।

प्रकार: `String`<br />
डिफ़ॉल्ट: `0.0.0.0`

### port

आपका ड्राइवर सर्वर जिस पोर्ट पर है।

प्रकार: `Number`<br />
डिफ़ॉल्ट: `undefined`

### path

ड्राइवर सर्वर एंडपॉइंट का पथ।

प्रकार: `String`<br />
डिफ़ॉल्ट: `/`

### queryParams

क्वेरी पैरामीटर जो ड्राइवर सर्वर को प्रचारित किए जाते हैं।

प्रकार: `Object`<br />
डिफ़ॉल्ट: `undefined`

### user

आपका क्लाउड सेवा उपयोगकर्ता नाम (केवल [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) या [LambdaTest](https://www.lambdatest.com) खातों के लिए काम करता है)। यदि सेट है, तो WebdriverIO स्वचालित रूप से आपके लिए कनेक्शन विकल्प सेट करेगा। यदि आप क्लाउड प्रदाता का उपयोग नहीं करते हैं, तो इसका उपयोग किसी अन्य WebDriver बैकएंड को प्रमाणित करने के लिए किया जा सकता है।

प्रकार: `String`<br />
डिफ़ॉल्ट: `undefined`

### key

आपकी क्लाउड सेवा एक्सेस कुंजी या गुप्त कुंजी (केवल [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) या [LambdaTest](https://www.lambdatest.com) खातों के लिए काम करता है)। यदि सेट है, तो WebdriverIO स्वचालित रूप से आपके लिए कनेक्शन विकल्प सेट करेगा। यदि आप क्लाउड प्रदाता का उपयोग नहीं करते हैं, तो इसका उपयोग किसी अन्य WebDriver बैकएंड को प्रमाणित करने के लिए किया जा सकता है।

प्रकार: `String`<br />
डिफ़ॉल्ट: `undefined`

### capabilities

वे क्षमताएं परिभाषित करता है जिन्हें आप अपने WebDriver सत्र में चलाना चाहते हैं। अधिक विवरण के लिए [WebDriver प्रोटोकॉल](https://w3c.github.io/webdriver/#capabilities) देखें। यदि आप एक पुराने ड्राइवर को चलाते हैं जो WebDriver प्रोटोकॉल का समर्थन नहीं करता है, तो आपको सत्र को सफलतापूर्वक चलाने के लिए [JSONWireProtocol क्षमताओं](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) का उपयोग करने की आवश्यकता होगी।

WebDriver आधारित क्षमताओं के अलावा आप ब्राउज़र और विक्रेता-विशिष्ट विकल्प लागू कर सकते हैं जो रिमोट ब्राउज़र या डिवाइस के गहरे कॉन्फ़िगरेशन की अनुमति देते हैं। ये संबंधित विक्रेता दस्तावेज़ों में प्रलेखित हैं, उदाहरण के लिए:

- `goog:chromeOptions`: [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106) के लिए
- `moz:firefoxOptions`: [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html) के लिए
- `ms:edgeOptions`: [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class) के लिए
- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional) के लिए
- `bstack:options`: [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#) के लिए
- `selenoid:options`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc) के लिए

इसके अतिरिक्त, एक उपयोगी उपकरण Sauce Labs [स्वचालित टेस्ट कॉन्फ़िगरेटर](https://docs.saucelabs.com/basics/platform-configurator/) है, जो आपकी वांछित क्षमताओं को क्लिक करके इस ऑब्जेक्ट को बनाने में मदद करता है।

प्रकार: `Object`<br />
डिफ़ॉल्ट: `null`

**उदाहरण:**

```js
{
    browserName: 'chrome', // विकल्प: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // ब्राउज़र संस्करण
    platformName: 'Windows 10' // OS प्लेटफॉर्म
}
```

यदि आप मोबाइल डिवाइस पर वेब या नेटिव टेस्ट चला रहे हैं, तो `capabilities` WebDriver प्रोटोकॉल से भिन्न होता है। अधिक विवरण के लिए [Appium दस्तावेज़](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/) देखें।

### logLevel

लॉगिंग के वर्बोसिटी का स्तर।

प्रकार: `String`<br />
डिफ़ॉल्ट: `info`<br />
विकल्प: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

सभी टेस्टरनर लॉग फाइलों (रिपोर्टर लॉग और `wdio` लॉग सहित) को स्टोर करने के लिए डायरेक्टरी। यदि सेट नहीं है, तो सभी लॉग `stdout` पर स्ट्रीम किए जाते हैं। चूंकि अधिकांश रिपोर्टर `stdout` पर लॉग करने के लिए बनाए गए हैं, इसलिए यह अनुशंसा की जाती है कि इस विकल्प का उपयोग केवल विशिष्ट रिपोर्टरों के लिए करें जहां रिपोर्ट को फ़ाइल में पुश करना अधिक समझ में आता है (जैसे `junit` रिपोर्टर)।

स्टैंडअलोन मोड में चलते समय, WebdriverIO द्वारा उत्पन्न एकमात्र लॉग `wdio` लॉग होगा।

प्रकार: `String`<br />
डिफ़ॉल्ट: `null`

### connectionRetryTimeout

ड्राइवर या ग्रिड के लिए किसी भी WebDriver अनुरोध का टाइमआउट।

प्रकार: `Number`<br />
डिफ़ॉल्ट: `120000`

### connectionRetryCount

सेलेनियम सर्वर के लिए अनुरोध पुनःप्रयासों की अधिकतम गिनती।

प्रकार: `Number`<br />
डिफ़ॉल्ट: `3`

### agent

आपको अनुरोध करने के लिए एक कस्टम `http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) का उपयोग करने की अनुमति देता है।

प्रकार: `Object`<br />
डिफ़ॉल्ट:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

हर WebDriver अनुरोध में पास करने के लिए कस्टम `headers` निर्दिष्ट करें। यदि आपके सेलेनियम ग्रिड को बेसिक ऑथेंटिकेशन की आवश्यकता है, तो हम आपके WebDriver अनुरोधों को प्रमाणित करने के लिए इस विकल्प के माध्यम से एक `Authorization` हेडर पास करने की सलाह देते हैं, जैसे:

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
डिफ़ॉल्ट: `{}`

### transformRequest

WebDriver अनुरोध करने से पहले [HTTP अनुरोध विकल्पों](https://github.com/sindresorhus/got#options) को इंटरसेप्ट करने वाला फंक्शन

प्रकार: `(RequestOptions) => RequestOptions`<br />
डिफ़ॉल्ट: *कोई नहीं*

### transformResponse

WebDriver प्रतिक्रिया आने के बाद HTTP प्रतिक्रिया ऑब्जेक्ट्स को इंटरसेप्ट करने वाला फंक्शन। फंक्शन को मूल प्रतिक्रिया ऑब्जेक्ट पहले और संबंधित `RequestOptions` को दूसरे आर्गुमेंट के रूप में पारित किया जाता है।

प्रकार: `(Response, RequestOptions) => Response`<br />
डिफ़ॉल्ट: *कोई नहीं*

### strictSSL

क्या यह SSL प्रमाणपत्र के वैध होने की आवश्यकता नहीं करता है।
इसे `STRICT_SSL` या `strict_ssl` पर्यावरण चर के माध्यम से सेट किया जा सकता है।

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `true`

### enableDirectConnect

क्या [Appium डायरेक्ट कनेक्शन फीचर](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) सक्षम करें।
यदि फ्लैग सक्षम होने पर प्रतिक्रिया में उचित कुंजियां नहीं थीं, तो यह कुछ नहीं करता है।

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `true`

### cacheDir

कैश डायरेक्टरी के रूट का पथ। इस डायरेक्टरी का उपयोग सभी ड्राइवरों को स्टोर करने के लिए किया जाता है जो सत्र शुरू करने का प्रयास करते समय डाउनलोड किए जाते हैं।

प्रकार: `String`<br />
डिफ़ॉल्ट: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

अधिक सुरक्षित लॉगिंग के लिए, `maskingPatterns` के साथ सेट रेगुलर एक्सप्रेशन लॉग से संवेदनशील जानकारी को अस्पष्ट कर सकते हैं।
 - स्ट्रिंग फॉर्मेट फ्लैग के साथ या बिना एक रेगुलर एक्सप्रेशन है (जैसे `/.../i`) और कई रेगुलर एक्सप्रेशन के लिए कॉमा से अलग किया गया है।
 - मास्किंग पैटर्न के बारे में अधिक जानकारी के लिए, [WDIO लॉगर README में मास्किंग पैटर्न सेक्शन](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns) देखें।

प्रकार: `String`<br />
डिफ़ॉल्ट: `undefined`

**उदाहरण:**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

---

## WebdriverIO

निम्नलिखित विकल्प (ऊपर सूचीबद्ध विकल्पों सहित) WebdriverIO के साथ स्टैंडअलोन में उपयोग किए जा सकते हैं:

### automationProtocol

वह प्रोटोकॉल परिभाषित करें जिसे आप अपने ब्राउज़र ऑटोमेशन के लिए उपयोग करना चाहते हैं। वर्तमान में केवल [`webdriver`](https://www.npmjs.com/package/webdriver) समर्थित है, क्योंकि यह मुख्य ब्राउज़र ऑटोमेशन तकनीक है जिसका WebdriverIO उपयोग करता है।

यदि आप एक अलग ऑटोमेशन तकनीक का उपयोग करके ब्राउज़र को स्वचालित करना चाहते हैं, तो आप इस प्रॉपर्टी को एक ऐसे पथ पर सेट करें जो एक मॉड्यूल को हल करे जो निम्नलिखित इंटरफेस का पालन करता है:

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
डिफ़ॉल्ट: `webdriver`

### baseUrl

एक बेस URL सेट करके `url` कमांड कॉल्स को छोटा करें।
- यदि आपका `url` पैरामीटर `/` से शुरू होता है, तो `baseUrl` को आगे जोड़ा जाता है (सिवाय `baseUrl` पथ के, अगर इसमें कोई है)।
- यदि आपका `url` पैरामीटर बिना किसी स्कीम या `/` के शुरू होता है (जैसे `some/path`), तो पूरा `baseUrl` सीधे आगे जोड़ा जाता है।

प्रकार: `String`<br />
डिफ़ॉल्ट: `null`

### waitforTimeout

सभी `waitFor*` कमांड्स के लिए डिफॉल्ट टाइमआउट। (ध्यान दें कि विकल्प नाम में लोअरकेस `f` है।) यह टाइमआउट __केवल__ `waitFor*` से शुरू होने वाले कमांड्स और उनके डिफॉल्ट वेट टाइम को प्रभावित करता है।

_टेस्ट_ के लिए टाइमआउट बढ़ाने के लिए, कृपया फ्रेमवर्क दस्तावेज़ देखें।

प्रकार: `Number`<br />
डिफ़ॉल्ट: `5000`

### waitforInterval

सभी `waitFor*` कमांड्स के लिए डिफॉल्ट इंटरवल जो यह जांचने के लिए है कि क्या एक अपेक्षित स्थिति (जैसे, दृश्यता) को बदल दिया गया है।

प्रकार: `Number`<br />
डिफ़ॉल्ट: `100`

### region

यदि Sauce Labs पर चल रहा है, तो आप विभिन्न डेटा केंद्रों के बीच टेस्ट चलाने का चयन कर सकते हैं: US या EU।
अपने क्षेत्र को EU में बदलने के लिए, अपने कॉन्फिग में `region: 'eu'` जोड़ें।

__नोट:__ इसका प्रभाव केवल तभी पड़ता है जब आप `user` और `key` विकल्प प्रदान करते हैं जो आपके Sauce Labs खाते से जुड़े हैं।

प्रकार: `String`<br />
डिफ़ॉल्ट: `us`

*(केवल vm और या em/सिम्युलेटर्स के लिए)*

---

## टेस्टरनर विकल्प

निम्नलिखित विकल्प (ऊपर सूचीबद्ध विकल्पों सहित) केवल WDIO टेस्टरनर के साथ WebdriverIO चलाने के लिए परिभाषित किए गए हैं:

### specs

टेस्ट निष्पादन के लिए स्पेक्स परिभाषित करें। आप या तो एक साथ कई फाइलों से मेल खाने के लिए ग्लोब पैटर्न निर्दिष्ट कर सकते हैं या एक ग्लोब या पथों के सेट को एक सिंगल वर्कर प्रोसेस के भीतर चलाने के लिए एक ऐरे में लपेट सकते हैं। सभी पथ कॉन्फिग फाइल पथ से सापेक्ष माने जाते हैं।

प्रकार: `(String | String[])[]`<br />
डिफ़ॉल्ट: `[]`

### exclude

टेस्ट निष्पादन से स्पेक्स को बाहर रखें। सभी पथ कॉन्फिग फाइल पथ से सापेक्ष माने जाते हैं।

प्रकार: `String[]`<br />
डिफ़ॉल्ट: `[]`

### suites

विभिन्न सुइट्स का वर्णन करने वाला एक ऑब्जेक्ट, जिसे आप फिर `wdio` CLI पर `--suite` विकल्प के साथ निर्दिष्ट कर सकते हैं।

प्रकार: `Object`<br />
डिफ़ॉल्ट: `{}`

### capabilities

ऊपर वर्णित `capabilities` सेक्शन के समान, सिवाय इसके कि [`multiremote`](/docs/multiremote) ऑब्जेक्ट, या समानांतर निष्पादन के लिए एक ऐरे में कई WebDriver सत्र निर्दिष्ट करने का विकल्प है।

आप वही विक्रेता और ब्राउज़र विशिष्ट क्षमताएँ लागू कर सकते हैं जैसा कि [ऊपर](/docs/configuration#capabilities) परिभाषित है।

प्रकार: `Object`|`Object[]`<br />
डिफ़ॉल्ट: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

समानांतर चलने वाले कुल वर्कर्स की अधिकतम संख्या।

__नोट:__ यह एक ऐसी संख्या हो सकती है जो `100` जितनी अधिक हो, जब परीक्षण Sauce Labs जैसे कुछ बाहरी विक्रेताओं की मशीनों पर किए जा रहे हों। वहां, परीक्षण एक ही मशीन पर नहीं, बल्कि कई VM पर किए जाते हैं। यदि परीक्षण स्थानीय विकास मशीन पर चलाया जाना है, तो ऐसी संख्या का उपयोग करें जो अधिक उचित हो, जैसे `3`, `4`, या `5`। मूल रूप से, यह उन ब्राउज़रों की संख्या है जो एक साथ शुरू होंगे और एक ही समय में आपके परीक्षण चलाएंगे, इसलिए यह आपकी मशीन पर कितनी RAM है और आपकी मशीन पर कितने अन्य ऐप्स चल रहे हैं, इस पर निर्भर करता है।

आप `wdio:maxInstances` क्षमता का उपयोग करके अपनी क्षमता ऑब्जेक्ट्स के भीतर `maxInstances` भी लागू कर सकते हैं। यह उस विशेष क्षमता के लिए समानांतर सत्रों की मात्रा को सीमित करेगा।

प्रकार: `Number`<br />
डिफ़ॉल्ट: `100`

### maxInstancesPerCapability

प्रति क्षमता समानांतर चलने वाले कुल वर्कर्स की अधिकतम संख्या।

प्रकार: `Number`<br />
डिफ़ॉल्ट: `100`

### injectGlobals

WebdriverIO के ग्लोबल्स (जैसे `browser`, `$` और `$$`) को ग्लोबल पर्यावरण में डालता है।
यदि आप `false` पर सेट करते हैं, तो आपको `@wdio/globals` से इम्पोर्ट करना चाहिए, जैसे:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

नोट: WebdriverIO टेस्ट फ्रेमवर्क विशिष्ट ग्लोबल्स के इंजेक्शन को संभालता नहीं है।

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `true`

### bail

यदि आप चाहते हैं कि आपका टेस्ट रन परीक्षण विफलताओं की एक विशिष्ट संख्या के बाद रुक जाए, तो `bail` का उपयोग करें।
(यह डिफ़ॉल्ट रूप से `0` है, जो चाहे जो हो सभी परीक्षणों को चलाता है।) **नोट:** इस संदर्भ में एक परीक्षण एक ही स्पेक फ़ाइल के भीतर सभी परीक्षण हैं (जब Mocha या Jasmine का उपयोग करते हैं) या एक फीचर फ़ाइल के भीतर सभी स्टेप्स (जब Cucumber का उपयोग करते हैं)। यदि आप एक ही टेस्ट फाइल के परीक्षणों के भीतर बेल व्यवहार को नियंत्रित करना चाहते हैं, तो उपलब्ध [फ्रेमवर्क](frameworks) विकल्पों पर एक नजर डालें।

प्रकार: `Number`<br />
डिफ़ॉल्ट: `0` (बेल नहीं करता; सभी परीक्षण चलाता है)

### specFileRetries

पूरी specfile को पुनः प्रयास करने की संख्या जब यह एक पूरे के रूप में विफल हो जाती है।

प्रकार: `Number`<br />
डिफ़ॉल्ट: `0`

### specFileRetriesDelay

स्पेक फाइल पुनःप्रयास प्रयासों के बीच सेकंड में देरी

प्रकार: `Number`<br />
डिफ़ॉल्ट: `0`

### specFileRetriesDeferred

क्या पुनः प्रयास की गई स्पेक फाइलों को तुरंत पुनः प्रयास किया जाना चाहिए या कतार के अंत तक स्थगित किया जाना चाहिए।

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `true`

### groupLogsByTestSpec

लॉग आउटपुट व्यू चुनें।

यदि `false` पर सेट है, तो विभिन्न टेस्ट फाइलों से लॉग रियल-टाइम में प्रिंट किए जाएंगे। कृपया ध्यान दें कि समानांतर चलने पर अलग-अलग फाइलों से लॉग आउटपुट के मिश्रण के परिणामस्वरूप यह हो सकता है।

यदि `true` पर सेट है, तो लॉग आउटपुट टेस्ट स्पेक द्वारा समूहीकृत किए जाएंगे और केवल तभी प्रिंट किए जाएंगे जब टेस्ट स्पेक पूरा हो गया हो।

डिफॉल्ट रूप से, यह `false` पर सेट है ताकि लॉग रियल-टाइम में प्रिंट किए जाएं।

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `false`

### services

सेवाएं एक विशिष्ट कार्य लेती हैं जिसकी आप देखभाल नहीं करना चाहते हैं। वे लगभग बिना किसी प्रयास के आपके परीक्षण सेटअप को बढ़ाते हैं।

प्रकार: `String[]|Object[]`<br />
डिफ़ॉल्ट: `[]`

### framework

WDIO टेस्टरनर द्वारा उपयोग किए जाने वाले टेस्ट फ्रेमवर्क को परिभाषित करता है।

प्रकार: `String`<br />
डिफ़ॉल्ट: `mocha`<br />
विकल्प: `mocha` | `jasmine`

### mochaOpts, jasmineOpts और cucumberOpts

विशिष्ट फ्रेमवर्क से संबंधित विकल्प। कौन से विकल्प उपलब्ध हैं, इसके लिए फ्रेमवर्क एडाप्टर दस्तावेज़ देखें। इस पर [फ्रेमवर्क्स](frameworks) में और पढ़ें।

प्रकार: `Object`<br />
डिफ़ॉल्ट: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

लाइन नंबरों के साथ cucumber फीचर्स की सूची ([cucumber फ्रेमवर्क का उपयोग करते समय](./Frameworks.md#using-cucumber))।

प्रकार: `String[]`
डिफ़ॉल्ट: `[]`

### reporters

उपयोग करने के लिए रिपोर्टरों की सूची। एक रिपोर्टर या तो एक स्ट्रिंग हो सकता है, या
`['reporterName', { /* reporter options */}]` का एक ऐरे हो सकता है जहां पहला तत्व रिपोर्टर नाम के साथ एक स्ट्रिंग है और दूसरा तत्व रिपोर्टर विकल्पों के साथ एक ऑब्जेक्ट है।

प्रकार: `String[]|Object[]`<br />
डिफ़ॉल्ट: `[]`

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

यह निर्धारित करता है कि रिपोर्टर को किस अंतराल में यह जांचना चाहिए कि क्या वे सिंक्रनाइज़ हैं यदि वे अपने लॉग्स को असिंक्रोनस रूप से रिपोर्ट करते हैं (जैसे यदि लॉग्स को किसी तृतीय पक्ष विक्रेता को स्ट्रीम किया जाता है)।

प्रकार: `Number`<br />
डिफ़ॉल्ट: `100` (ms)

### reporterSyncTimeout

यह निर्धारित करता है कि रिपोर्टरों के पास अपने सभी लॉग्स को अपलोड करने के लिए अधिकतम समय होता है जब तक टेस्टरनर द्वारा एक त्रुटि नहीं फेंकी जाती है।

प्रकार: `Number`<br />
डिफ़ॉल्ट: `5000` (ms)

### execArgv

चाइल्ड प्रोसेस लॉन्च करते समय निर्दिष्ट करने के लिए Node आर्गुमेंट्स।

प्रकार: `String[]`<br />
डिफ़ॉल्ट: `null`

### filesToWatch

ग्लोब समर्थित स्ट्रिंग पैटर्न की एक सूची जो टेस्टरनर को बताती है कि जब इसे `--watch` फ्लैग के साथ चलाया जाए तो अतिरिक्त रूप से अन्य फाइलों को देखना है, जैसे एप्लिकेशन फाइलें। डिफॉल्ट रूप से टेस्टरनर पहले से ही सभी स्पेक फाइलों को देखता है।

प्रकार: `String[]`<br />
डिफ़ॉल्ट: `[]`

### updateSnapshots

यदि आप अपने स्नैपशॉट्स को अपडेट करना चाहते हैं तो true पर सेट करें। आदर्श रूप से CLI पैरामीटर के हिस्से के रूप में उपयोग किया जाता है, जैसे `wdio run wdio.conf.js --s`।

प्रकार: `'new' | 'all' | 'none'`<br />
डिफ़ॉल्ट: `none` यदि प्रदान नहीं किया गया है और टेस्ट CI में चलता है, `new` यदि प्रदान नहीं किया गया है, अन्यथा जो प्रदान किया गया है

### resolveSnapshotPath

डिफॉल्ट स्नैपशॉट पथ को ओवरराइड करता है। उदाहरण के लिए, टेस्ट फाइलों के बगल में स्नैपशॉट स्टोर करने के लिए।

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

प्रकार: `(testPath: string, snapExtension: string) => string`<br />
डिफ़ॉल्ट: टेस्ट फाइल के बगल में `__snapshots__` डायरेक्टरी में स्नैपशॉट फाइलें स्टोर करता है

### tsConfigPath

WDIO TypeScript फाइलों को कंपाइल करने के लिए `tsx` का उपयोग करता है। आपका TSConfig वर्तमान कार्य निर्देशिका से स्वचालित रूप से पहचाना जाता है लेकिन आप यहां एक कस्टम पथ निर्दिष्ट कर सकते हैं या TSX_TSCONFIG_PATH पर्यावरण चर सेट कर सकते हैं।

`tsx` डॉक्स देखें: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

प्रकार: `String`<br />
डिफ़ॉल्ट: `null`<br />

## हुक्स

WDIO टेस्टरनर आपको टेस्ट लाइफसाइकिल के विशिष्ट समय पर ट्रिगर होने के लिए हुक्स सेट करने की अनुमति देता है। यह कस्टम एक्शन्स की अनुमति देता है (जैसे यदि कोई टेस्ट विफल हो जाता है तो स्क्रीनशॉट लें)।

प्रत्येक हुक के पास लाइफसाइकिल के बारे में विशिष्ट जानकारी पैरामीटर के रूप में होती है (जैसे टेस्ट सूट या टेस्ट के बारे में जानकारी)। सभी हुक प्रॉपर्टीज के बारे में [हमारे उदाहरण कॉन्फिग](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326) में अधिक पढ़ें।

**नोट:** कुछ हुक्स (`onPrepare`, `onWorkerStart`, `onWorkerEnd` और `onComplete`) एक अलग प्रक्रिया में निष्पादित किए जाते हैं और इसलिए अन्य हुक्स के साथ कोई भी वैश्विक डेटा साझा नहीं कर सकते जो वर्कर प्रक्रिया में रहते हैं।

### onPrepare

सभी वर्कर्स के लॉन्च होने से पहले एक बार निष्पादित होता है।

पैरामीटर्स:

- `config` (`object`): WebdriverIO कॉन्फिगरेशन ऑब्जेक्ट
- `param` (`object[]`): क्षमताओं के विवरण की सूची

### onWorkerStart

एक वर्कर प्रक्रिया को स्पॉन करने से पहले निष्पादित होता है और उस वर्कर के लिए विशिष्ट सेवा को इनिशियलाइज़ करने के साथ-साथ रनटाइम पर्यावरण को एक असिंक्रोनस तरीके से संशोधित करने के लिए उपयोग किया जा सकता है।

पैरामीटर्स:

- `cid` (`string`): क्षमता आईडी (जैसे 0-0)
- `caps` (`object`): वर्कर में स्पॉन होने वाले सत्र के लिए क्षमताएं
- `specs` (`string[]`): वर्कर प्रक्रिया में चलाने के लिए स्पेक्स
- `args` (`object`): ऑब्जेक्ट जो वर्कर इनिशियलाइज़ होने के बाद मुख्य कॉन्फिगरेशन के साथ मर्ज किया जाएगा
- `execArgv` (`string[]`): वर्कर प्रक्रिया को पारित किए गए स्ट्रिंग आर्गुमेंट्स की सूची

### onWorkerEnd

एक वर्कर प्रक्रिया के बाहर निकलने के तुरंत बाद निष्पादित होता है।

पैरामीटर्स:

- `cid` (`string`): क्षमता आईडी (जैसे 0-0)
- `exitCode` (`number`): 0 - सफलता, 1 - विफल
- `specs` (`string[]`): वर्कर प्रक्रिया में चलाने के लिए स्पेक्स
- `retries` (`number`): [_"प्रति-स्पेकफाइल आधार पर पुनःप्रयास जोड़ें"_](./Retry.md#add-retries-on-a-per-specfile-basis) में परिभाषित के रूप में उपयोग किए गए स्पेक स्तर के पुनःप्रयासों की संख्या

### beforeSession

वेबड्राइवर सत्र और टेस्ट फ्रेमवर्क को इनिशियलाइज़ करने से ठीक पहले निष्पादित होता है। यह आपको क्षमता या स्पेक के आधार पर कॉन्फिगरेशन में हेरफेर करने की अनुमति देता है।

पैरामीटर्स:

- `config` (`object`): WebdriverIO कॉन्फिगरेशन ऑब्जेक्ट
- `caps` (`object`): वर्कर में स्पॉन होने वाले सत्र के लिए क्षमताएं
- `specs` (`string[]`): वर्कर प्रक्रिया में चलाने के लिए स्पेक्स

### before

टेस्ट निष्पादन शुरू होने से पहले निष्पादित होता है। इस बिंदु पर आप सभी वैश्विक वेरिएबल्स जैसे `browser` तक पहुंच सकते हैं। यह कस्टम कमांड्स को परिभाषित करने के लिए एकदम सही जगह है।

पैरामीटर्स:

- `caps` (`object`): वर्कर में स्पॉन होने वाले सत्र के लिए क्षमताएं
- `specs` (`string[]`): वर्कर प्रक्रिया में चलाने के लिए स्पेक्स
- `browser` (`object`): बनाए गए ब्राउज़र/डिवाइस सत्र का इंस्टेंस

### beforeSuite

वह हुक जो सूट शुरू होने से पहले निष्पादित होता है (केवल Mocha/Jasmine में)

पैरामीटर्स:

- `suite` (`object`): सूट विवरण

### beforeHook

वह हुक जो सूट के भीतर एक हुक से *पहले* निष्पादित होता है (जैसे Mocha में beforeEach कॉल करने से पहले चलता है)

पैरामीटर्स:

- `test` (`object`): टेस्ट विवरण
- `context` (`object`): टेस्ट कॉन्टेक्स्ट (Cucumber में World ऑब्जेक्ट का प्रतिनिधित्व करता है)

### afterHook

वह हुक जो सूट के भीतर एक हुक के *बाद* निष्पादित होता है (जैसे Mocha में afterEach कॉल करने के बाद चलता है)

पैरामीटर्स:

- `test` (`object`): टेस्ट विवरण
- `context` (`object`): टेस्ट कॉन्टेक्स्ट (Cucumber में World ऑब्जेक्ट का प्रतिनिधित्व करता है)
- `result` (`object`): हुक रिज़ल्ट (इसमें `error`, `result`, `duration`, `passed`, `retries` प्रॉपर्टीज़ शामिल हैं)

### beforeTest

टेस्ट से पहले निष्पादित किए जाने वाला फंक्शन (केवल Mocha/Jasmine में)।

पैरामीटर्स:

- `test` (`object`): टेस्ट विवरण
- `context` (`object`): स्कोप ऑब्जेक्ट जिसके साथ टेस्ट निष्पादित किया गया था

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
- `error` (`Error`): त्रुटि ऑब्जेक्ट यदि कोई है

### afterTest

टेस्ट (Mocha/Jasmine में) समाप्त होने के बाद निष्पादित किए जाने वाला फंक्शन।

पैरामीटर्स:

- `test` (`object`): टेस्ट विवरण
- `context` (`object`): स्कोप ऑब्जेक्ट जिसके साथ टेस्ट निष्पादित किया गया था
- `result.error` (`Error`): यदि टेस्ट विफल होता है तो त्रुटि ऑब्जेक्ट, अन्यथा `undefined`
- `result.result` (`Any`): टेस्ट फंक्शन का रिटर्न ऑब्जेक्ट
- `result.duration` (`Number`): टेस्ट की अवधि
- `result.passed` (`Boolean`): यदि टेस्ट पास हो गया है तो true, अन्यथा false
- `result.retries` (`Object`): [Mocha और Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) के साथ-साथ [Cucumber](./Retry.md#rerunning-in-cucumber) के लिए परिभाषित के रूप में सिंगल टेस्ट संबंधित रीट्राई के बारे में जानकारी, जैसे `{ attempts: 0, limit: 0 }`, देखें
- `result` (`object`): हुक रिज़ल्ट (इसमें `error`, `result`, `duration`, `passed`, `retries` प्रॉपर्टीज़ शामिल हैं)

### afterSuite

वह हुक जो सूट समाप्त होने के बाद निष्पादित होता है (केवल Mocha/Jasmine में)

पैरामीटर्स:

- `suite` (`object`): सूट विवरण

### after

सभी टेस्ट पूरे होने के बाद निष्पादित होता है। आपके पास अभी भी टेस्ट से सभी वैश्विक वेरिएबल्स तक पहुंच है।

पैरामीटर्स:

- `result` (`number`): 0 - टेस्ट पास, 1 - टेस्ट विफल
- `caps` (`object`): वर्कर में स्पॉन होने वाले सत्र के लिए क्षमताएं
- `specs` (`string[]`): वर्कर प्रक्रिया में चलाने के लिए स्पेक्स

### afterSession

वेबड्राइवर सत्र को समाप्त करने के ठीक बाद निष्पादित होता है।

पैरामीटर्स:

- `config` (`object`): WebdriverIO कॉन्फिगरेशन ऑब्जेक्ट
- `caps` (`object`): वर्कर में स्पॉन होने वाले सत्र के लिए क्षमताएं
- `specs` (`string[]`): वर्कर प्रक्रिया में चलाने के लिए स्पेक्स

### onComplete

सभी वर्कर्स के शट डाउन होने और प्रक्रिया के बाहर निकलने वाले होने के बाद निष्पादित होता है। onComplete हुक में फेंकी गई त्रुटि के परिणामस्वरूप टेस्ट रन विफल हो जाएगा।

पैरामीटर्स:

- `exitCode` (`number`): 0 - सफलता, 1 - विफल
- `config` (`object`): WebdriverIO कॉन्फिगरेशन ऑब्जेक्ट
- `caps` (`object`): वर्कर में स्पॉन होने वाले सत्र के लिए क्षमताएं
- `result` (`object`): रिज़ल्ट्स ऑब्जेक्ट जिसमें टेस्ट रिज़ल्ट्स शामिल हैं

### onReload

रिफ्रेश होने पर निष्पादित होता है।

पैरामीटर्स:

- `oldSessionId` (`string`): पुराने सत्र का सत्र आईडी
- `newSessionId` (`string`): नए सत्र का सत्र आईडी

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

Cucumber सिनेरियो से पहले चलता है।

पैरामीटर्स:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): वर्ल्ड ऑब्जेक्ट जिसमें पिकल और टेस्ट स्टेप पर जानकारी शामिल है
- `context` (`object`): Cucumber वर्ल्ड ऑब्जेक्ट

### afterScenario

Cucumber सिनेरियो के बाद चलता है।

पैरामीटर्स:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): वर्ल्ड ऑब्जेक्ट जिसमें पिकल और टेस्ट स्टेप पर जानकारी शामिल है
- `result` (`object`): रिज़ल्ट्स ऑब्जेक्ट जिसमें सिनेरियो रिज़ल्ट्स शामिल हैं
- `result.passed` (`boolean`): यदि सिनेरियो पास हो गया है तो true
- `result.error` (`string`): यदि सिनेरियो विफल हो गया तो त्रुटि स्टैक
- `result.duration` (`number`): मिलिसेकंड में सिनेरियो की अवधि
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
- `result`: (`object`): रिज़ल्ट्स ऑब्जेक्ट जिसमें स्टेप रिज़ल्ट्स शामिल हैं
- `result.passed` (`boolean`): यदि सिनेरियो पास हो गया है तो true
- `result.error` (`string`): यदि सिनेरियो विफल हो गया तो त्रुटि स्टैक
- `result.duration` (`number`): मिलिसेकंड में सिनेरियो की अवधि
- `context` (`object`): Cucumber वर्ल्ड ऑब्जेक्ट

### beforeAssertion

वह हुक जो WebdriverIO असर्शन होने से पहले निष्पादित होता है।

पैरामीटर्स:

- `params`: असर्शन जानकारी
- `params.matcherName` (`string`): मैचर का नाम (जैसे `toHaveTitle`)
- `params.expectedValue`: वैल्यू जो मैचर में पास की जाती है
- `params.options`: असर्शन विकल्प

### afterAssertion

वह हुक जो WebdriverIO असर्शन होने के बाद निष्पादित होता है।

पैरामीटर्स:

- `params`: असर्शन जानकारी
- `params.matcherName` (`string`): मैचर का नाम (जैसे `toHaveTitle`)
- `params.expectedValue`: वैल्यू जो मैचर में पास की जाती है
- `params.options`: असर्शन विकल्प
- `params.result`: असर्शन रिज़ल्ट्स