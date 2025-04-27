---
id: getContext
title: getContext
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContext.ts
---

वर्तमान सत्र का संदर्भ (context) प्राप्त करें।

यह विधि डिफॉल्ट Appium `context`/WebdriverIO `getContext` कमांड को बढ़ाती है, विस्तृत संदर्भ जानकारी वापस करने का विकल्प प्रदान करके, जिससे वेबव्यू का उपयोग करने वाले हाइब्रिड ऐप्स के साथ काम करना आसान हो जाता है।

### संदर्भ (Contexts) कैसे काम करते हैं
अधिक जानकारी के लिए [हाइब्रिड ऐप्स दस्तावेज़](/docs/api/mobile#hybrid-apps) देखें। नीचे `getContext` कमांड से जुड़ी चुनौतियों का विवरण दिया गया है:

#### Android के लिए:
- वेबव्यू में कई पेज (ब्राउज़र टैब्स की तरह) हो सकते हैं, और सही पेज की पहचान करने के लिए अतिरिक्त मेटाडेटा जैसे `title` या `url` की आवश्यकता होती है।
- डिफॉल्ट Appium विधियां केवल बुनियादी संदर्भ नाम (जैसे `WEBVIEW_{packageName}`) प्रदान करती हैं, वेबव्यू के अंदर के पेजों के बारे में विस्तृत जानकारी के बिना।

#### iOS के लिए:
- प्रत्येक वेबव्यू को एक सामान्य `WEBVIEW_{id}` स्ट्रिंग द्वारा पहचाना जाता है, जो इसकी सामग्री या इससे संबंधित ऐप स्क्रीन नहीं दर्शाती है।

### इस विधि का उपयोग क्यों करें?
- **डिफॉल्ट व्यवहार**:
  - वर्तमान संदर्भ को एक स्ट्रिंग के रूप में वापस करता है (जैसे `NATIVE_APP` या `WEBVIEW_{id}`)।
- **विस्तृत संदर्भ**:
  - जब `returnDetailedContext` सक्षम है, तो निम्न मेटाडेटा प्राप्त करता है:
    - **Android**: `packageName`, `title`, `url`, और `webviewPageId`।
    - **iOS**: `bundleId`, `title`, और `url`।
- **Android-विशिष्ट विकल्प**:
  - वेबव्यू इनिशियलाइज़ेशन में देरी को संभालने के लिए रीट्राई अंतराल और टाइमआउट को अनुकूलित किया जा सकता है।

:::info नोट्स और सीमाएँ

- अगर `returnDetailedContext` सक्षम नहीं है, तो विधि डिफॉल्ट Appium `getContext` विधि की तरह व्यवहार करती है।
- अगर आप "डिफॉल्ट" Appium `context` विधि का उपयोग करना चाहते हैं, तो आप `driver.getAppiumContext()` विधि का उपयोग कर सकते हैं, 
[Appium Contexts](/docs/api/appium#getappiumcontext) कमांड भी देखें।
- **Android:** Android-विशिष्ट विकल्प (`androidWebviewConnectionRetryTime` और `androidWebviewConnectTimeout`) का iOS पर कोई प्रभाव नहीं पड़ता है।
- अगर एकाधिक या कोई विस्तृत संदर्भ नहीं मिलते हैं तो चेतावनी लॉग करता है:
  - `We found more than 1 detailed context for the current context '{context}'. We will return the first context.`
  - `We did not get back any detailed context for the current context '{context}'. We will return the current context as a string.`

:::

##### पैरामीटर्स

<table>
  <thead>
    <tr>
      <th>नाम</th><th>प्रकार</th><th>विवरण</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`GetContextsOptions`</td>
      <td>`getContext` विकल्प (वैकल्पिक)</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContext</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`boolean`</td>
      <td>डिफॉल्ट रूप से, हम केवल डिफॉल्ट Appium `context` API के आधार पर संदर्भ नाम वापस करते हैं, जो केवल एक स्ट्रिंग है। यदि आप विस्तृत संदर्भ जानकारी प्राप्त करना चाहते हैं, तो इसे `true` पर सेट करें। डिफॉल्ट `false` है (वैकल्पिक)।</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`number`</td>
      <td>वेबव्यू से कनेक्ट करने के प्रत्येक प्रयास के बीच मिलीसेकंड में प्रतीक्षा का समय। डिफॉल्ट `500` ms है (वैकल्पिक)। <br /><strong>केवल-ANDROID</strong></td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">वैकल्पिक</span></td>
      <td>`number`</td>
      <td>वेब व्यू पेज का पता लगाने के लिए प्रतीक्षा करने का अधिकतम समय मिलीसेकंड में। डिफॉल्ट `5000` ms है (वैकल्पिक)। <br /><strong>केवल-ANDROID</strong></td>
    </tr>
  </tbody>
</table>

##### उदाहरण

```js title="default.test.js"
it('should return the current context with the default Appium `context` method', async () => {
    // For Android
    await driver.getContext()
    // Returns 'WEBVIEW_com.wdiodemoapp' or 'NATIVE_APP'
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContext()
    // Returns 'WEBVIEW_94703.19' or 'NATIVE_APP'
})

```

```js title="detailed.test.js"
it('should return the context of the current session with more detailed information', async () => {
    // For Android
    await driver.getContext({ returnDetailedContext: true})
    // Returns or `NATIVE_APP`, or
    // {
    //   id: 'WEBVIEW_com.wdiodemoapp',
    //   title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //   url: 'https://webdriver.io/',
    //   packageName: 'com.wdiodemoapp',
    //   webviewPageId: '5C0425CF67E9B169245F48FF21172912'
    // }
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContext({ returnDetailedContext: true})
    // Returns or `NATIVE_APP`, or
    // {
    //   id: 'WEBVIEW_64981.1',
    //   title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //   url: 'https://webdriver.io/',
    //   bundleId: 'org.reactjs.native.example.wdiodemoapp'
    // }
})

```

```js title="customize.retry.test.js"
it('should be able to cusomize the retry intervals and timeouts to handle delayed webview initialization', async () => {
    // For Android
    await driver.getContext({
        returnDetailedContext: true,
        // NOTE: The following options are Android-specific
        // For Android we might need to wait a bit longer to connect to the webview, so we can provide some additional options
        androidWebviewConnectionRetryTime: 1*1000,  // Retry every 1 second
        androidWebviewConnectTimeout: 10*1000,      // Timeout after 10 seconds
    })
})
```