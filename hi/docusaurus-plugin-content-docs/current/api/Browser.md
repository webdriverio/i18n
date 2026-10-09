---
id: browser
title: ब्राउज़र ऑब्जेक्ट
---

__विस्तारित करता है:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

ब्राउज़र ऑब्जेक्ट वह सेशन इंस्टेंस है जिसका उपयोग आप ब्राउज़र या मोबाइल डिवाइस को नियंत्रित करने के लिए करते हैं। यदि आप WDIO टेस्ट रनर का उपयोग करते हैं, तो आप ग्लोबल `browser` या `driver` ऑब्जेक्ट के माध्यम से WebDriver इंस्टेंस तक पहुंच सकते हैं या इसे [`@wdio/globals`](/docs/api/globals) का उपयोग करके इम्पोर्ट कर सकते हैं। यदि आप WebdriverIO को स्टैंडअलोन मोड में उपयोग करते हैं तो ब्राउज़र ऑब्जेक्ट [`remote`](/docs/api/modules#remoteoptions-modifier) मेथड द्वारा लौटाया जाता है।

सेशन टेस्ट रनर द्वारा प्रारंभ किया जाता है। सेशन को समाप्त करने के लिए भी यही बात लागू होती है। यह भी टेस्ट रनर प्रोसेस द्वारा किया जाता है।

## प्रॉपर्टीज़

एक ब्राउज़र ऑब्जेक्ट में निम्नलिखित प्रॉपर्टीज़ होती हैं:

| नाम | प्रकार | विवरण |
| ---- | ---- | ------- |
| `capabilities` | `Object` | रिमोट सर्वर से निर्धारित कैपेबिलिटीज़।<br /><b>उदाहरण:</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | रिमोट सर्वर से अनुरोधित कैपेबिलिटीज़।<br /><b>उदाहरण:</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | रिमोट सर्वर से निर्धारित सेशन आईडी। |
| `options` | `Object` | ब्राउज़र ऑब्जेक्ट कैसे बनाया गया था, इसके आधार पर WebdriverIO [विकल्प](/docs/configuration)। अधिक [सेटअप प्रकार](/docs/setuptypes) देखें। |
| `commandList` | `String[]` | ब्राउज़र इंस्टेंस में पंजीकृत कमांड्स की सूची |
| `isChrome` | `Boolean` | दर्शाता है कि क्या यह Chrome इंस्टेंस है |
| `isFirefox` | `Boolean` | दर्शाता है कि क्या यह Firefox इंस्टेंस है |
| `isBidi` | `Boolean` | दर्शाता है कि क्या यह सेशन Bidi का उपयोग करता है |
| `isSauce` | `Boolean` | दर्शाता है कि क्या यह सेशन Sauce Labs पर चल रहा है |
| `isMacApp` | `Boolean` | दर्शाता है कि क्या यह सेशन नेटिव Mac ऐप के लिए चल रहा है |
| `isWindowsApp` | `Boolean` | दर्शाता है कि क्या यह सेशन नेटिव Windows ऐप के लिए चल रहा है |
| `isMobile` | `Boolean` | मोबाइल सेशन को दर्शाता है। [मोबाइल फ्लैग्स](#mobile-flags) के अंतर्गत और देखें। |
| `isIOS` | `Boolean` | iOS सेशन को दर्शाता है। [मोबाइल फ्लैग्स](#mobile-flags) के अंतर्गत और देखें। |
| `isAndroid` | `Boolean` | Android सेशन को दर्शाता है। [मोबाइल फ्लैग्स](#mobile-flags) के अंतर्गत और देखें। |
| `isNativeContext` | `Boolean`  | दर्शाता है कि क्या मोबाइल `NATIVE_APP` कॉन्टेक्स्ट में है। [मोबाइल फ्लैग्स](#mobile-flags) के अंतर्गत और देखें। |
| `mobileContext` | `string`  | यह वह **वर्तमान** कॉन्टेक्स्ट प्रदान करेगा जिसमें ड्राइवर है, उदाहरण के लिए `NATIVE_APP`, Android के लिए `WEBVIEW_<packageName>` या iOS के लिए `WEBVIEW_<pid>`। यह `driver.getContext()` के लिए एक अतिरिक्त WebDriver कॉल बचाएगा। [मोबाइल फ्लैग्स](#mobile-flags) के अंतर्गत और देखें। |


## मेथड्स

आपके सेशन के लिए उपयोग किए गए ऑटोमेशन बैकएंड के आधार पर, WebdriverIO पहचानता है कि कौन से [प्रोटोकॉल कमांड्स](/docs/api/protocols) [ब्राउज़र ऑब्जेक्ट](/docs/api/browser) से जोड़े जाएंगे। उदाहरण के लिए, यदि आप Chrome में एक स्वचालित सेशन चलाते हैं, तो आपके पास [`elementHover`](/docs/api/chromium#elementhover) जैसे Chromium विशिष्ट कमांड्स तक पहुंच होगी, लेकिन किसी भी [Appium कमांड्स](/docs/api/appium) तक नहीं।

इसके अलावा WebdriverIO सुविधाजनक मेथड्स का एक सेट प्रदान करता है जिनका उपयोग पेज पर [ब्राउज़र](/docs/api/browser) या [एलिमेंट्स](/docs/api/element) के साथ इंटरैक्ट करने के लिए करने की सलाह दी जाती है।

इसके अतिरिक्त निम्नलिखित कमांड्स उपलब्ध हैं:

| नाम | पैरामीटर्स | विवरण |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (प्रकार: `String`)<br />- `fn` (प्रकार: `Function`)<br />- `attachToElement` (प्रकार: `boolean`) | कंपोज़िशन उद्देश्यों के लिए ब्राउज़र ऑब्जेक्ट से कॉल किए जा सकने वाले कस्टम कमांड्स को परिभाषित करने की अनुमति देता है। [कस्टम कमांड](/docs/customcommands) गाइड में और पढ़ें। |
| `overwriteCommand` | - `commandName` (प्रकार: `String`)<br />- `fn` (प्रकार: `Function`)<br />- `attachToElement` (प्रकार: `boolean`) | किसी भी ब्राउज़र कमांड को कस्टम फंक्शनैलिटी से ओवरराइट करने की अनुमति देता है। सावधानी से उपयोग करें क्योंकि यह फ्रेमवर्क उपयोगकर्ताओं को भ्रमित कर सकता है। [कस्टम कमांड](/docs/customcommands#overwriting-native-commands) गाइड में और पढ़ें। |
| `addLocatorStrategy` | - `strategyName` (प्रकार: `String`)<br />- `fn` (प्रकार: `Function`) | एक कस्टम सेलेक्टर स्ट्रैटेजी परिभाषित करने की अनुमति देता है, [सेलेक्टर्स](/docs/selectors#custom-selector-strategies) गाइड में और पढ़ें। |

## टिप्पणियां

### मोबाइल फ्लैग्स

यदि आपको अपने टेस्ट को इस आधार पर संशोधित करने की आवश्यकता है कि आपका सेशन मोबाइल डिवाइस पर चलता है या नहीं, तो आप जांचने के लिए मोबाइल फ्लैग्स तक पहुंच सकते हैं।

उदाहरण के लिए, यह कॉन्फ़िगरेशन दिया गया है:

```js
// wdio.conf.js
export const config = {
    // ...
    capabilities: \\{
        platformName: 'iOS',
        app: 'net.company.SafariLauncher',
        udid: '123123123123abc',
        deviceName: 'iPhone',
        // ...
    }
    // ...
}
```

आप अपने टेस्ट में इन फ्लैग्स तक इस प्रकार पहुंच सकते हैं:

```js
// नोट: `driver` `browser` ऑब्जेक्ट के समतुल्य है लेकिन अर्थ की दृष्टि से अधिक सही है
// आप चुन सकते हैं कि आप कौन सा ग्लोबल वेरिएबल उपयोग करना चाहते हैं
console.log(driver.isMobile) // आउटपुट: true
console.log(driver.isIOS) // आउटपुट: true
console.log(driver.isAndroid) // आउटपुट: false
```

यह उपयोगी हो सकता है यदि, उदाहरण के लिए, आप डिवाइस प्रकार के आधार पर अपने [पेज ऑब्जेक्ट्स](../pageobjects) में सेलेक्टर्स परिभाषित करना चाहते हैं, इस तरह:

```js
// mypageobject.page.js
import Page from './page'

class LoginPage extends Page {
    // ...
    get username() {
        const selectorAndroid = 'new UiSelector().text("Cancel").className("android.widget.Button")'
        const selectorIOS = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
        const selectorType = driver.isAndroid ? 'android' : 'ios'
        const selector = driver.isAndroid ? selectorAndroid : selectorIOS
        return $(`${selectorType}=${selector}`)
    }
    // ...
}
```

आप इन फ्लैग्स का उपयोग कुछ विशेष डिवाइस प्रकारों के लिए केवल कुछ विशेष टेस्ट चलाने के लिए भी कर सकते हैं:

```js
// mytest.e2e.js
describe('my test', () => {
    // ...
    // केवल Android डिवाइसों के साथ टेस्ट चलाएं
    if (driver.isAndroid) {
        it('tests something only for Android', () => {
            // ...
        })
    }
    // ...
})
```

### इवेंट्स
ब्राउज़र ऑब्जेक्ट एक EventEmitter है और आपके उपयोग के मामलों के लिए कुछ इवेंट्स एमिट किए जाते हैं।

यहां इवेंट्स की एक सूची है। ध्यान रखें कि यह अभी तक उपलब्ध इवेंट्स की पूरी सूची नहीं है।
यहां और इवेंट्स के विवरण जोड़कर दस्तावेज़ को अपडेट करने में योगदान देने के लिए स्वतंत्र महसूस करें।

#### `command`

यह इवेंट तब एमिट होता है जब भी WebdriverIO एक WebDriver Classic कमांड भेजता है। इसमें निम्नलिखित जानकारी होती है:

- `command`: कमांड का नाम, उदा. `navigateTo`
- `method`: कमांड अनुरोध भेजने के लिए उपयोग की गई HTTP मेथड, उदा. `POST`
- `endpoint`: कमांड एंडपॉइंट, उदा. `/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body`: कमांड पेलोड, उदा. `{ url: 'https://webdriver.io' }`

#### `result`

यह इवेंट तब एमिट होता है जब भी WebdriverIO को WebDriver Classic कमांड का परिणाम प्राप्त होता है। इसमें `command` इवेंट जैसी ही जानकारी होती है, साथ ही निम्नलिखित अतिरिक्त जानकारी भी:

- `result`: कमांड का परिणाम

#### `bidiCommand`

यह इवेंट तब एमिट होता है जब भी WebdriverIO ब्राउज़र ड्राइवर को एक WebDriver Bidi कमांड भेजता है। इसमें निम्नलिखित के बारे में जानकारी होती है:

- `method`: WebDriver Bidi कमांड मेथड
- `params`: संबंधित कमांड पैरामीटर ([API](/docs/api/webdriverBidi) देखें)

#### `bidiResult`

सफल कमांड निष्पादन के मामले में, इवेंट पेलोड होगा:

- `type`: `success`
- `id`: कमांड आईडी
- `result`: कमांड का परिणाम ([API](/docs/api/webdriverBidi) देखें)

कमांड त्रुटि के मामले में, इवेंट पेलोड होगा:

- `type`: `error`
- `id`: कमांड आईडी
- `error`: त्रुटि कोड, उदा. `invalid argument`
- `message`: त्रुटि के बारे में विवरण
- `stacktrace`: एक स्टैक ट्रेस

#### `request.start`
यह इवेंट ड्राइवर को WebDriver अनुरोध भेजे जाने से पहले फायर होता है। इसमें अनुरोध और उसके पेलोड के बारे में जानकारी होती है।

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
यह इवेंट तब फायर होता है जब ड्राइवर को भेजे गए अनुरोध का रिस्पॉन्स प्राप्त हो जाता है। इवेंट ऑब्जेक्ट में या तो परिणाम के रूप में रिस्पॉन्स बॉडी होती है या WebDriver कमांड विफल होने पर एक त्रुटि होती है।

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
रीट्राई इवेंट आपको तब सूचित कर सकता है जब WebdriverIO कमांड को फिर से चलाने का प्रयास करता है, उदा. किसी नेटवर्क समस्या के कारण। इसमें उस त्रुटि के बारे में जानकारी होती है जिसके कारण रीट्राई हुआ और पहले से किए गए रीट्राई की संख्या होती है।

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
यह WebDriver स्तर के ऑपरेशंस को मापने के लिए एक इवेंट है। जब भी WebdriverIO WebDriver बैकएंड को अनुरोध भेजता है, यह इवेंट कुछ उपयोगी जानकारी के साथ एमिट होगा:

- `durationMillisecond`: मिलीसेकंड में अनुरोध की समय अवधि।
- `error`: यदि अनुरोध विफल हुआ तो Error ऑब्जेक्ट।
- `request`: Request ऑब्जेक्ट। आप url, method, headers, आदि पा सकते हैं।
- `retryCount`: यदि यह `0` है, तो अनुरोध पहला प्रयास था। जब WebDriverIO आंतरिक रूप से रीट्राई करता है तो यह बढ़ेगा।
- `success`: यह दर्शाने के लिए Boolean कि अनुरोध सफल हुआ या नहीं। यदि यह `false` है, तो `error` प्रॉपर्टी भी प्रदान की जाएगी।

एक उदाहरण इवेंट:
```js
Object {
  "durationMillisecond": 0.01770925521850586,
  "error": [Error: Timeout],
  "request": Object { ... },
  "retryCount": 0,
  "success": false,
},
```

### कस्टम कमांड्स

आप आमतौर पर उपयोग किए जाने वाले वर्कफ़्लो को सारगर्भित करने के लिए ब्राउज़र स्कोप पर कस्टम कमांड्स सेट कर सकते हैं। अधिक जानकारी के लिए [कस्टम कमांड्स](/docs/customcommands#adding-custom-commands) पर हमारी गाइड देखें।