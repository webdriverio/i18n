---
id: configuration
title: कॉन्फ़िगरेशन
---

[सेटअप प्रकार](/docs/setuptypes) (जैसे कि रॉ प्रोटोकॉल बाइंडिंग्स का उपयोग करना, स्टैंडअलोन पैकेज के रूप में WebdriverIO या WDIO टेस्टरनर) के आधार पर पर्यावरण को नियंत्रित करने के लिए विकल्पों का एक अलग सेट उपलब्ध है।

## WebDriver विकल्प

निम्नलिखित विकल्प [`webdriver`](https://www.npmjs.com/package/webdriver) प्रोटोकॉल पैकेज का उपयोग करते समय परिभाषित किए जाते हैं:

### protocol

ड्राइवर सर्वर के साथ संवाद करते समय उपयोग किया जाने वाला प्रोटोकॉल।

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

क्वेरी पैरामीटर्स जो ड्राइवर सर्वर तक प्रचारित होते हैं।

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

उन क्षमताओं को परिभाषित करता है जिन्हें आप अपने WebDriver सत्र में चलाना चाहते हैं। अधिक विवरण के लिए [WebDriver प्रोटोकॉल](https://w3c.github.io/webdriver/#capabilities) देखें। यदि आप एक पुराने ड्राइवर को चलाते हैं जो WebDriver प्रोटोकॉल का समर्थन नहीं करता है, तो आपको सफलतापूर्वक सत्र चलाने के लिए [JSONWireProtocol क्षमताओं](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) का उपयोग करने की आवश्यकता होगी।

WebDriver आधारित क्षमताओं के अलावा, आप ब्राउज़र और विक्रेता विशिष्ट विकल्प लागू कर सकते हैं जो रिमोट ब्राउज़र या डिवाइस में गहरे कॉन्फ़िगरेशन की अनुमति देते हैं। ये संबंधित विक्रेता दस्तावेज़ों में प्रलेखित हैं, उदाहरण के लिए:

- `goog:chromeOptions`: [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106) के लिए
- `moz:firefoxOptions`: [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html) के लिए
- `ms:edgeOptions`: [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class) के लिए
- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional) के लिए
- `bstack:options`: [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#) के लिए
- `selenoid:options`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc) के लिए

इसके अतिरिक्त, एक उपयोगी उपकरण Sauce Labs [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) है, जो आपकी वांछित क्षमताओं को एक साथ क्लिक करके इस ऑब्जेक्ट को बनाने में मदद करता है।

प्रकार: `Object`<br />
डिफ़ॉल्ट: `null`

**उदाहरण:**

```js
{
    browserName: 'chrome', // विकल्प: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // ब्राउज़र संस्करण
    platformName: 'Windows 10' // ओएस प्लेटफ़ॉर्म
}
```

यदि आप मोबाइल डिवाइस पर वेब या नेटिव टेस्ट चला रहे हैं, तो `capabilities` WebDriver प्रोटोकॉल से अलग होता है। अधिक विवरण के लिए [Appium दस्तावेज़](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/) देखें।

### logLevel

लॉगिंग वर्बोसिटी का स्तर।

प्रकार: `String`<br />
डिफ़ॉल्ट: `info`<br />
विकल्प: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

सभी टेस्टरनर लॉग फाइलों (रिपोर्टर लॉग और `wdio` लॉग सहित) को स्टोर करने के लिए डिरेक्टरी। यदि सेट नहीं है, तो सभी लॉग `stdout` पर स्ट्रीम किए जाते हैं। चूंकि अधिकांश रिपोर्टर `stdout` पर लॉग करने के लिए बनाए गए हैं, इसलिए यह अनुशंसा की जाती है कि इस विकल्प का उपयोग केवल विशिष्ट रिपोर्टरों के लिए करें जहां लॉग को फ़ाइल में पुश करना अधिक समझ में आता है (जैसे `junit` रिपोर्टर)।

स्टैंडअलोन मोड में चलते समय, WebdriverIO द्वारा उत्पन्न एकमात्र लॉग `wdio` लॉग होगा।

प्रकार: `String`<br />
डिफ़ॉल्ट: `null`

### connectionRetryTimeout

ड्राइवर या ग्रिड के लिए किसी भी WebDriver अनुरोध का टाइमआउट।

प्रकार: `Number`<br />
डिफ़ॉल्ट: `120000`

### connectionRetryCount

सेलेनियम सर्वर के लिए अनुरोध रीट्राई की अधिकतम संख्या।

प्रकार: `Number`<br />
डिफ़ॉल्ट: `3`

### agent

आपको अनुरोध करने के लिए कस्टम `http`/`https`/`http2` [एजेंट](https://www.npmjs.com/package/got#agent) का उपयोग करने की अनुमति देता है।

प्रकार: `Object`<br />
डिफ़ॉल्ट:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

हर WebDriver अनुरोध में पास करने के लिए कस्टम `headers` निर्दिष्ट करें। यदि आपके सेलेनियम ग्रिड को बेसिक ऑथेंटिकेशन की आवश्यकता है, तो हम आपके WebDriver अनुरोधों को प्रमाणित करने के लिए इस विकल्प के माध्यम से एक `Authorization` हेडर पास करने की सिफारिश करते हैं, उदाहरण के लिए:

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

WebDriver प्रतिक्रिया आने के बाद HTTP प्रतिक्रिया ऑब्जेक्ट को इंटरसेप्ट करने वाला फंक्शन। फंक्शन को पहले आर्गुमेंट के रूप में मूल प्रतिक्रिया ऑब्जेक्ट और दूसरे आर्गुमेंट के रूप में संबंधित `RequestOptions` पास किया जाता है।

प्रकार: `(Response, RequestOptions) => Response`<br />
डिफ़ॉल्ट: *कोई नहीं*

### strictSSL

क्या यह SSL प्रमाणपत्र का मान्य होना आवश्यक नहीं है।
इसे `STRICT_SSL` या `strict_ssl` के रूप में एक पर्यावरण चर के माध्यम से सेट किया जा सकता है।

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `true`

### enableDirectConnect

क्या [Appium डायरेक्ट कनेक्शन फीचर](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) को सक्षम किया जाए।
यदि ध्वज सक्षम है तो यह कुछ नहीं करता है अगर प्रतिक्रिया में उचित कुंजियां नहीं थीं।

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `true`

### cacheDir

कैश डिरेक्टरी के रूट का पथ। इस डिरेक्टरी का उपयोग उन सभी ड्राइवरों को स्टोर करने के लिए किया जाता है जो सत्र शुरू करने का प्रयास करते समय डाउनलोड किए जाते हैं।

प्रकार: `String`<br />
डिफ़ॉल्ट: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

---

## WebdriverIO

निम्नलिखित विकल्पों (ऊपर सूचीबद्ध विकल्पों सहित) का उपयोग स्टैंडअलोन में WebdriverIO के साथ किया जा सकता है:

### automationProtocol

वह प्रोटोकॉल परिभाषित करें जिसका उपयोग आप अपने ब्राउज़र ऑटोमेशन के लिए करना चाहते हैं। वर्तमान में केवल [`webdriver`](https://www.npmjs.com/package/webdriver) समर्थित है, क्योंकि यह मुख्य ब्राउज़र ऑटोमेशन तकनीक है जिसका उपयोग WebdriverIO करता है।

यदि आप किसी अलग ऑटोमेशन तकनीक का उपयोग करके ब्राउज़र को स्वचालित करना चाहते हैं, तो आप इस प्रॉपर्टी को ऐसे पथ पर सेट करें जो एक मॉड्यूल को हल करता है जो निम्न इंटरफेस का पालन करता है:

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

बेस URL सेट करके `url` कमांड कॉल को छोटा करें।
- यदि आपका `url` पैरामीटर `/` से शुरू होता है, तो `baseUrl` पहले जोड़ा जाता है (सिवाय `baseUrl` पथ के, अगर उसमें एक है)।
- यदि आपका `url` पैरामीटर स्कीम या `/` (जैसे `some/path`) के बिना शुरू होता है, तो पूरा `baseUrl` सीधे पहले जोड़ा जाता है।

प्रकार: `String`<br />
डिफ़ॉल्ट: `null`

### waitforTimeout

सभी `waitFor*` कमांड के लिए डिफॉल्ट टाइमआउट। (ध्यान दें कि विकल्प नाम में लोअरकेस `f` है।) यह टाइमआउट __केवल__ `waitFor*` से शुरू होने वाले कमांड और उनके डिफॉल्ट प्रतीक्षा समय को प्रभावित करता है।

_टेस्ट_ के लिए टाइमआउट बढ़ाने के लिए, कृपया फ्रेमवर्क दस्तावेज़ देखें।

प्रकार: `Number`<br />
डिफ़ॉल्ट: `5000`

### waitforInterval

सभी `waitFor*` कमांड के लिए डिफॉल्ट इंटरवल यह जांचने के लिए कि क्या एक अपेक्षित स्थिति (जैसे, दृश्यता) बदल दी गई है।

प्रकार: `Number`<br />
डिफ़ॉल्ट: `100`

### region

यदि Sauce Labs पर चल रहे हैं, तो आप अलग-अलग डेटा सेंटरों के बीच टेस्ट चलाने का चुनाव कर सकते हैं: US या EU।
अपने क्षेत्र को EU में बदलने के लिए, अपने कॉन्फ़िग में `region: 'eu'` जोड़ें।

__नोट:__ इसका प्रभाव केवल तभी होता है जब आप `user` और `key` विकल्प प्रदान करते हैं जो आपके Sauce Labs खाते से जुड़े हैं।

प्रकार: `String`<br />
डिफ़ॉल्ट: `us`

*(केवल vm और या em/सिम्युलेटर्स के लिए)*

---

## टेस्टरनर विकल्प

निम्नलिखित विकल्प (ऊपर सूचीबद्ध लोगों सहित) केवल WDIO टेस्टरनर के साथ WebdriverIO चलाने के लिए परिभाषित किए गए हैं:

### specs

टेस्ट निष्पादन के लिए स्पेक्स परिभाषित करें। आप या तो एक ग्लोब पैटर्न निर्दिष्ट कर सकते हैं जो एक साथ कई फाइलों से मेल खाता है या एक ग्लोब या पथों के सेट को एक एरे में लपेट सकते हैं ताकि उन्हें एक ही वर्कर प्रोसेस के भीतर चलाया जा सके। सभी पथों को कॉन्फ़िग फ़ाइल पथ से सापेक्ष माना जाता है।

प्रकार: `(String | String[])[]`<br />
डिफ़ॉल्ट: `[]`

### exclude

टेस्ट निष्पादन से स्पेक्स को बाहर रखें। सभी पथों को कॉन्फ़िग फ़ाइल पथ से सापेक्ष माना जाता है।

प्रकार: `String[]`<br />
डिफ़ॉल्ट: `[]`

### suites

विभिन्न स्यूट्स का वर्णन करने वाला एक ऑब्जेक्ट, जिसे आप फिर `wdio` CLI पर `--suite` विकल्प के साथ निर्दिष्ट कर सकते हैं।

प्रकार: `Object`<br />
डिफ़ॉल्ट: `{}`

### capabilities

ऊपर वर्णित `capabilities` सेक्शन के समान, सिवाय इसके कि या तो [`multiremote`](/docs/multiremote) ऑब्जेक्ट, या समानांतर निष्पादन के लिए एक एरे में एकाधिक WebDriver सत्र निर्दिष्ट करने का विकल्प है।

आप [ऊपर](/docs/configuration#capabilities) परिभाषित एक ही विक्रेता और ब्राउज़र विशिष्ट क्षमताओं को लागू कर सकते हैं।

प्रकार: `Object`|`Object[]`<br />
डिफ़ॉल्ट: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

समानांतर चलने वाले वर्कर्स की अधिकतम कुल संख्या।

__नोट:__ यह संख्या `100` जितनी अधिक हो सकती है, जब टेस्ट Sauce Labs के मशीनों जैसे कुछ बाहरी विक्रेताओं पर किए जा रहे हों। वहां, टेस्ट एक ही मशीन पर नहीं, बल्कि कई VM पर किए जाते हैं। यदि टेस्ट एक स्थानीय विकास मशीन पर चलाए जाने हैं, तो ऐसी संख्या का उपयोग करें जो अधिक उचित है, जैसे `3`, `4`, या `5`। अनिवार्य रूप से, यह उन ब्राउज़रों की संख्या है जो एक साथ शुरू होंगे और एक साथ आपके टेस्ट चलाएंगे, इसलिए यह इस बात पर निर्भर करता है कि आपकी मशीन पर कितना RAM है, और आपकी मशीन पर कितने अन्य ऐप्स चल रहे हैं।

आप `wdio:maxInstances` क्षमता का उपयोग करके अपनी क्षमता ऑब्जेक्ट्स के भीतर `maxInstances` भी लागू कर सकते हैं। यह उस विशेष क्षमता के लिए समानांतर सत्रों की मात्रा को सीमित करेगा।

प्रकार: `Number`<br />
डिफ़ॉल्ट: `100`

### maxInstancesPerCapability

प्रति क्षमता समानांतर चलने वाले वर्कर्स की अधिकतम कुल संख्या।

प्रकार: `Number`<br />
डिफ़ॉल्ट: `100`

### injectGlobals

वैश्विक वातावरण में WebdriverIO के ग्लोबल्स (जैसे `browser`, `$` और `$$`) को डालता है।
यदि आप `false` पर सेट करते हैं, तो आपको `@wdio/globals` से इम्पोर्ट करना चाहिए, उदाहरण के लिए:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

नोट: WebdriverIO टेस्ट फ्रेमवर्क विशिष्ट ग्लोबल्स के इंजेक्शन को संभालता नहीं है।

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `true`

### bail

यदि आप चाहते हैं कि आपका टेस्ट रन टेस्ट विफलताओं की एक विशिष्ट संख्या के बाद रुक जाए, तो `bail` का उपयोग करें।
(यह डिफ़ॉल्ट रूप से `0` है, जो सभी टेस्ट को चाहे जो भी हो चलाता है।) **नोट:** इस संदर्भ में एक टेस्ट एक स्पेक फाइल (Mocha या Jasmine का उपयोग करते समय) के भीतर सभी टेस्ट या फीचर फाइल (Cucumber का उपयोग करते समय) के भीतर सभी स्टेप्स हैं। यदि आप एक टेस्ट फाइल के टेस्ट के भीतर bail व्यवहार को नियंत्रित करना चाहते हैं, तो उपलब्ध [फ्रेमवर्क](frameworks) विकल्पों पर एक नज़र डालें।

प्रकार: `Number`<br />
डिफ़ॉल्ट: `0` (बेल मत करो; सभी टेस्ट चलाएं)

### specFileRetries

जब पूरी स्पेकफाइल एक पूरे के रूप में विफल हो जाती है, तो उसे रीट्राई करने की संख्या।

प्रकार: `Number`<br />
डिफ़ॉल्ट: `0`

### specFileRetriesDelay

स्पेक फ़ाइल रीट्राई प्रयासों के बीच सेकंड में देरी

प्रकार: `Number`<br />
डिफ़ॉल्ट: `0`

### specFileRetriesDeferred

क्या रीट्राई की गई स्पेक फाइलों को तुरंत रीट्राई किया जाना चाहिए या कतार के अंत तक आस्थगित किया जाना चाहिए।

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `true`

### groupLogsByTestSpec

लॉग आउटपुट व्यू चुनें।

यदि `false` पर सेट है, तो विभिन्न टेस्ट फाइलों से लॉग रीयल-टाइम में प्रिंट किए जाएंगे। कृपया ध्यान दें कि समानांतर चलाते समय विभिन्न फाइलों से लॉग आउटपुट का मिश्रण हो सकता है।

यदि `true` पर सेट है, तो लॉग आउटपुट टेस्ट स्पेक द्वारा समूहीकृत किए जाएंगे और केवल तभी प्रिंट किए जाएंगे जब टेस्ट स्पेक पूरा हो जाए।

डिफ़ॉल्ट रूप से, यह `false` पर सेट है ताकि लॉग रीयल-टाइम में प्रिंट किए जाएं।

प्रकार: `Boolean`<br />
डिफ़ॉल्ट: `false`

### services

सेवाएं एक विशिष्ट कार्य लेती हैं जिसकी आप देखभाल नहीं करना चाहते। वे लगभग बिना किसी प्रयास के आपके टेस्ट सेटअप को बढ़ाते हैं।

प्रकार: `String[]|Object[]`<br />
डिफ़ॉल्ट: `[]`

### framework

WDIO टेस्टरनर द्वारा उपयोग किए जाने वाले टेस्ट फ्रेमवर्क को परिभाषित करता है।

प्रकार: `String`<br />
डिफ़ॉल्ट: `mocha`<br />
विकल्प: `mocha` | `jasmine`

### mochaOpts, jasmineOpts और cucumberOpts

विशिष्ट फ्रेमवर्क-संबंधित विकल्प। कौन से विकल्प उपलब्ध हैं, इसके लिए फ्रेमवर्क एडाप्टर दस्तावेज़ देखें। इस पर [Frameworks](frameworks) में अधिक पढ़ें।

प्रकार: `Object`<br />
डिफ़ॉल्ट: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

लाइन नंबरों के साथ cucumber फीचर्स की सूची (जब [cucumber फ्रेमवर्क का उपयोग करते हुए](./Frameworks.md#using-cucumber))।

प्रकार: `String[]`
डिफ़ॉल्ट: `[]`

### reporters

उपयोग करने के लिए रिपोर्टरों की सूची। एक रिपोर्टर या तो एक स्ट्रिंग हो सकता है, या
`['reporterName', { /* reporter options */}]` का एक एरे जहां पहला एलिमेंट रिपोर्टर नाम के साथ एक स्ट्रिंग है और दूसरा एलिमेंट रिपोर्टर विकल्पों के साथ एक ऑब्जेक्ट है।

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

यह निर्धारित करता है कि रिपोर्टर को कितने अंतराल में यह जांचना चाहिए कि क्या वे सिंक्रनाइज़ हैं यदि वे अपने लॉग को अतुल्यकालिक रूप से रिपोर्ट करते हैं (जैसे, यदि लॉग एक तीसरे पक्ष के विक्रेता में स्ट्रीम किए जाते हैं)।

प्रकार: `Number`<br />
डिफ़ॉल्ट: `100` (ms)

### reporterSyncTimeout

वह अधिकतम समय निर्धारित करता है जो रिपोर्टरों के पास अपने सभी लॉग अपलोड करने के लिए होता है जब तक कि टेस्टरनर द्वारा एक त्रुटि नहीं फेंकी जाती है।

प्रकार: `Number`<br />
डिफ़ॉल्ट: `5000` (ms)

### execArgv

चाइल्ड प्रोसेस लॉन्च करते समय निर्दिष्ट करने के लिए Node आर्गुमेंट्स।

प्रकार: `String[]`<br />
डिफ़ॉल्ट: `null`

### filesToWatch

ग्लोब समर्थन करने वाले स्ट्रिंग पैटर्न की एक सूची जो टेस्टरनर को बताती है कि `--watch` फ्लैग के साथ चलाते समय अन्य फाइलों, जैसे एप्लिकेशन फाइलों, को अतिरिक्त रूप से देखना है। डिफॉल्ट रूप से टेस्टरनर पहले से ही सभी स्पेक फाइलों को देखता है।

प्रकार: `String[]`<br />
डिफ़ॉल्ट: `[]`

### updateSnapshots

`true` पर सेट करें यदि आप अपने स्नैपशॉट अपडेट करना चाहते हैं। आदर्श रूप से CLI पैरामीटर के हिस्से के रूप में उपयोग किया जाता है, जैसे `wdio run wdio.conf.js --s`।

प्रकार: `'new' | 'all' | 'none'`<br />
डिफ़ॉल्ट: `none` यदि प्रदान नहीं किया गया है और टेस्ट CI में चलते हैं, `new` यदि प्रदान नहीं किया गया है, अन्यथा जो प्रदान किया गया है

### resolveSnapshotPath

डिफॉल्ट स्नैपशॉट पथ को ओवरराइड करता है। उदाहरण के लिए, स्नैपशॉट को टेस्ट फाइलों के बगल में स्टोर करने के लिए।

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

प्रकार: `(testPath: string, snapExtension: string) => string`<br />
डिफ़ॉल्ट: टेस्ट फाइल के बगल में `__snapshots__` डिरेक्टरी में स्नैपशॉट फाइलें स्टोर करता है

### tsConfigPath

WDIO TypeScript फ़ाइलों को कंपाइल करने के लिए `tsx` का उपयोग करता है। आपका TSConfig स्वचालित रूप से वर्तमान कार्य निर्देशिका से पहचाना जाता है, लेकिन आप यहां एक कस्टम पथ निर्दिष्ट कर सकते हैं या TSX_TSCONFIG_PATH पर्यावरण चर सेट कर सकते हैं।

`tsx` दस्तावेज़ देखें: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

प्रकार: `String`<br />
डिफ़ॉल्ट: `null`<br />

## हुक्स

WDIO टेस्टरनर आपको टेस्ट जीवनचक्र के विशिष्ट समय पर ट्रिगर होने के लिए हुक्स सेट करने की अनुमति देता है। यह कस्टम कार्यों की अनुमति देता है (जैसे, यदि कोई टेस्ट विफल हो जाता है तो स्क्रीनशॉट लें)।

प्रत्येक हुक में जीवनचक्र के बारे में विशिष्ट जानकारी होती है (जैसे, टेस्ट स्यूट या टेस्ट के बारे में जानकारी)। सभी हुक प्रॉपर्टीज के बारे में [हमारे उदाहरण कॉन्फ़िग](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326) में अधिक पढ़ें।

**नोट:** कुछ हुक्स (`onPrepare`, `onWorkerStart`, `onWorkerEnd` और `onComplete`) एक अलग प्रक्रिया में निष्पादित किए जाते हैं और इसलिए अन्य हुक के साथ कोई वैश्विक डेटा साझा नहीं कर सकते जो वर्कर प्रोसेस में रहते हैं।

### onPrepare

सभी वर्कर्स के लॉन्च होने से पहले एक बार निष्पादित होता है।

पैरामीटर्स:

- `config` (`object`): WebdriverIO कॉन्फ़िगरेशन ऑब्जेक्ट
- `param` (`object[]`): क्षमताओं के विवरण की सूची

### onWorkerStart

एक वर्कर प्रोसेस के शुरू होने से पहले निष्पादित होता है और उस वर्कर के लिए विशिष्ट सेवा को इनिशियलाइज़ करने के लिए उपयोग किया जा सकता है और एक अतुल्यकालिक तरीके से रनटाइम पर्यावरणों को संशोधित कर सकता है।

पैरामीटर्स:

- `cid` (`string`): क्षमता आईडी (जैसे 0-0)
- `caps` (`object`): वर्कर में स्पॉन होने वाले सत्र के लिए क्षमताएं
- `specs` (`string[]`): वर्कर प्रोसेस में चलाए जाने वाले स्पेक्स
- `args` (`object`): ऑब्जेक्ट जो मुख्य कॉन्फ़िगरेशन के साथ मर्ज किया जाएगा जब वर्कर इनिशियलाइज़ हो जाएगा
- `execArgv` (`string[]`): वर्कर प्रोसेस को पास किए गए स्ट्रिंग आर्गुमेंट्स की सूची

### onWorkerEnd

एक वर्कर प्रोसेस के बाहर निकलने के तुरंत बाद निष्पादित होता है।

पैरामीटर्स:

- `cid` (`string`): क्षमता आईडी (जैसे 0-0)
- `exitCode` (`number`): 0 - सफलता, 1 - विफलता
- `specs` (`string[]`): वर्कर प्रोसेस में चलाए जाने वाले स्पेक्स
- `retries` (`number`): [_"प्रति-स्पेकफाइल आधार पर रीट्राई जोड़ें"_](./Retry.md#add-retries-on-a-per-specfile-basis) में परिभाषित अनुसार उपयोग किए गए स्पेक स्तर रीट्राई की संख्या

### beforeSession

webdriver सत्र और टेस्ट फ्रेमवर्क को इनिशियलाइज़ करने से ठीक पहले निष्पादित होता है। यह आपको क्षमता या स्पेक के आधार पर कॉन्फ़िगरेशन को मैनिपुलेट करने की अनुमति देता है।

पैरामीटर्स:

- `config` (`object`): WebdriverIO कॉन्फ़िगरेशन ऑब्जेक्ट
- `caps` (`object`): वर्कर में स्पॉन होने वाले सत्र के लिए क्षमताएं
- `specs` (`string[]`): वर्कर प्रोसेस में चलाए जाने वाले स्पेक्स

### before

टेस्ट निष्पादन शुरू होने से पहले निष्पादित होता है। इस बिंदु पर आप `browser` जैसे सभी वैश्विक चर तक पहुंच सकते हैं। यह कस्टम कमांड को परिभाषित करने के लिए एकदम सही जगह है।

पैरामीटर्स:

- `caps` (`object`): वर्कर में स्पॉन होने वाले सत्र के लिए क्षमताएं
- `specs` (`string[]`): वर्कर प्रोसेस में चलाए जाने वाले स्पेक्स
- `browser` (`object`): बनाए गए ब्राउज़र/डिवाइस सत्र का इंस्टेंस

### beforeSuite

वह हुक जो स्यूट शुरू होने से पहले निष्पादित होता है (केवल Mocha/Jasmine में)

पैरामीटर्स:

- `suite` (`object`): स्यूट विवरण

### beforeHook

वह हुक जो स्यूट के भीतर हुक से *पहले* निष्पादित होता है (जैसे, Mocha में beforeEach को कॉल करने से पहले चलता है)

पैरामीटर्स:

- `test` (`object`): टेस्ट विवरण
- `context` (`object`): टेस्ट कॉन्टेक्स्ट (Cucumber में World ऑब्जेक्ट का प्रतिनिधित्व करता है)

### afterHook

वह हुक जो स्यूट के भीतर हुक के *बाद* निष्पादित होता है (जैसे, Mocha में afterEach को कॉल करने के बाद चलता है)

पैरामीटर्स:

- `test` (`object`): टेस्ट विवरण
- `context` (`object`): टेस्ट कॉन्टेक्स्ट (Cucumber में World ऑब्जेक्ट का प्रतिनिधित्व करता है)
- `result` (`object`): हुक रिजल्ट (इसमें `error`, `result`, `duration`, `passed`, `retries` प्रॉपर्टीज शामिल हैं)

### beforeTest

टेस्ट से पहले निष्पादित होने वाला फंक्शन (केवल Mocha/Jasmine में)।

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

टेस्ट (Mocha/Jasmine में) समाप्त होने के बाद निष्पादित होने वाला फंक्शन।

पैरामीटर्स:

- `test` (`object`): टेस्ट विवरण
- `context` (`object`): स्कोप ऑब्जेक्ट जिसके साथ टेस्ट निष्पादित किया गया था
- `result.error` (`Error`): यदि टेस्ट विफल होता है तो त्रुटि ऑब्जेक्ट, अन्यथा `undefined`
- `result.result` (`Any`): टेस्ट फंक्शन का रिटर्न ऑब्जेक्ट
- `result.duration` (`Number`): टेस्ट की अवधि
- `result.passed` (`Boolean`): true अगर टेस्ट पास हो गया है, अन्यथा false
- `result.retries` (`Object`): [Mocha और Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) के साथ-साथ [Cucumber](./Retry.md#rerunning-in-cucumber) के लिए परिभाषित सिंगल टेस्ट संबंधित रीट्राई के बारे में जानकारी, जैसे `{ attempts: 0, limit: 0 }`, देखें
- `result` (`object`): हुक रिजल्ट (इसमें `error`, `result`, `duration`, `passed`, `retries` प्रॉपर्टीज शामिल हैं)

### afterSuite

वह हुक जो स्यूट समाप्त होने के बाद निष्पादित होता है (केवल Mocha/Jasmine में)

पैरामीटर्स:

- `suite` (`object`): स्यूट विवरण

### after

सभी टेस्ट पूरे होने के बाद निष्पादित होता है। आपके पास अभी भी टेस्ट से सभी वैश्विक चर तक पहुंच है।

पैरामीटर्स:

- `result` (`number`): 0 - टेस्ट पास, 1 - टेस्ट विफल
- `caps` (`object`): वर्कर में स्पॉन होने वाले सत्र के लिए क्षमताएं
- `specs` (`string[]`): वर्कर प्रोसेस में चलाए जाने वाले स्पेक्स

### afterSession

webdriver सत्र को समाप्त करने के तुरंत बाद निष्पादित होता है।

पैरामीटर्स:

- `config` (`object`): WebdriverIO कॉन्फ़िगरेशन ऑब्जेक्ट
- `caps` (`object`): वर्कर में स्पॉन होने वाले सत्र के लिए क्षमताएं
- `specs` (`string[]`): वर्कर प्रोसेस में चलाए जाने वाले स्पेक्स

### onComplete

सभी वर्कर्स बंद होने और प्रक्रिया के बाहर निकलने के बारे में होने के बाद निष्पादित होता है। onComplete हुक में फेंकी गई त्रुटि के परिणामस्वरूप टेस्ट रन विफल हो जाएगा।

पैरामीटर्स:

- `exitCode` (`number`): 0 - सफलता, 1 - विफलता
- `config` (`object`): WebdriverIO कॉन्फ़िगरेशन ऑब्जेक्ट
- `caps` (`object`): वर्कर में स्पॉन होने वाले सत्र के लिए क्षमताएं
- `result` (`object`): टेस्ट परिणाम युक्त परिणाम ऑब्जेक्ट

### onReload

एक रीफ्रेश होने पर निष्पादित होता है।

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

Cucumber सीनारियो से पहले चलता है।

पैरामीटर्स:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): वर्ल्ड ऑब्जेक्ट जिसमें पिकल और टेस्ट स्टेप पर जानकारी है
- `context` (`object`): Cucumber वर्ल्ड ऑब्जेक्ट

### afterScenario

Cucumber सीनारियो के बाद चलता है।

पैरामीटर्स:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): वर्ल्ड ऑब्जेक्ट जिसमें पिकल और टेस्ट स्टेप पर जानकारी है
- `result` (`object`): सीनारियो परिणाम वाला परिणाम ऑब्जेक्ट
- `result.passed` (`boolean`): true अगर सीनारियो पास हो गया है
- `result.error` (`string`): त्रुटि स्टैक अगर सीनारियो विफल हो गया
- `result.duration` (`number`): मिलीसेकंड में सीनारियो की अवधि
- `context` (`object`): Cucumber वर्ल्ड ऑब्जेक्ट

### beforeStep

Cucumber स्टेप से पहले चलता है।

पैरामीटर्स:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber स्टेप ऑब्जेक्ट
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber सीनारियो ऑब्जेक्ट
- `context` (`object`): Cucumber वर्ल्ड ऑब्जेक्ट

### afterStep

Cucumber स्टेप के बाद चलता है।

पैरामीटर्स:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): Cucumber स्टेप ऑब्जेक्ट
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): Cucumber सीनारियो ऑब्जेक्ट
- `result`: (`object`): स्टेप परिणाम वाला परिणाम ऑब्जेक्ट
- `result.passed` (`boolean`): true अगर सीनारियो पास हो गया है
- `result.error` (`string`): त्रुटि स्टैक अगर सीनारियो विफल हो गया
- `result.duration` (`number`): मिलीसेकंड में सीनारियो की अवधि
- `context` (`object`): Cucumber वर्ल्ड ऑब्जेक्ट

### beforeAssertion

वह हुक जो WebdriverIO एसर्शन होने से पहले निष्पादित होता है।

पैरामीटर्स:

- `params`: एसर्शन जानकारी
- `params.matcherName` (`string`): मैचर का नाम (जैसे `toHaveTitle`)
- `params.expectedValue`: वह मान जो मैचर में पास किया जाता है
- `params.options`: एसर्शन विकल्प

### afterAssertion

वह हुक जो WebdriverIO एसर्शन होने के बाद निष्पादित होता है।

पैरामीटर्स:

- `params`: एसर्शन जानकारी
- `params.matcherName` (`string`): मैचर का नाम (जैसे `toHaveTitle`)
- `params.expectedValue`: वह मान जो मैचर में पास किया जाता है
- `params.options`: एसर्शन विकल्प
- `params.result`: एसर्शन परिणाम