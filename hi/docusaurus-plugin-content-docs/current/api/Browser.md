---
id: browser
title: ब्राउज़र ऑब्जेक्ट
---

__विस्तारित करता है:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

ब्राउज़र ऑब्जेक्ट वह सेशन इंस्टेंस है जिसका उपयोग आप ब्राउज़र या मोबाइल डिवाइस को नियंत्रित करने के लिए करते हैं। यदि आप WDIO टेस्ट रनर का उपयोग करते हैं, तो आप WebDriver इंस्टेंस को ग्लोबल `browser` या `driver` ऑब्जेक्ट के माध्यम से एक्सेस कर सकते हैं या [`@wdio/globals`](/docs/api/globals) का उपयोग करके इसे इम्पोर्ट कर सकते हैं। यदि आप WebdriverIO को स्टैंडअलोन मोड में उपयोग करते हैं, तो ब्राउज़र ऑब्जेक्ट [`remote`](/docs/api/modules#remoteoptions-modifier) मेथड द्वारा लौटाया जाता है।

सेशन टेस्ट रनर द्वारा प्रारंभ किया जाता है। सेशन को समाप्त करने के लिए भी यही बात लागू होती है। यह भी टेस्ट रनर प्रोसेस द्वारा किया जाता है।

## प्रॉपर्टीज़

एक ब्राउज़र ऑब्जेक्ट में निम्नलिखित प्रॉपर्टीज़ होती हैं:

| नाम | प्रकार | विवरण |
| ---- | ---- | ------- |
| `capabilities` | `Object` | रिमोट सर्वर से असाइन की गई कैपेबिलिटीज़।<br /><b>उदाहरण:</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | रिमोट सर्वर से अनुरोधित कैपेबिलिटीज़।<br /><b>उदाहरण:</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | रिमोट सर्वर से असाइन की गई सेशन आईडी। |
| `options` | `Object` | WebdriverIO [विकल्प](/docs/configuration), जो इस पर निर्भर करते हैं कि ब्राउज़र ऑब्जेक्ट कैसे बनाया गया था। अधिक [सेटअप प्रकार](/docs/setuptypes) देखें। |
| `commandList` | `String[]` | ब्राउज़र इंस्टेंस पर रजिस्टर किए गए कमांड्स की सूची |
| `isChrome` | `Boolean` | इंगित करता है कि क्या यह Chrome इंस्टेंस है |
| `isFirefox` | `Boolean` | इंगित करता है कि क्या यह Firefox इंस्टेंस है |
| `isBidi` | `Boolean` | इंगित करता है कि क्या यह सेशन Bidi का उपयोग करता है |
| `isSauce` | `Boolean` | इंगित करता है कि क्या यह सेशन Sauce Labs पर चल रहा है |
| `isMacApp` | `Boolean` | इंगित करता है कि क्या यह सेशन किसी नेटिव Mac ऐप के लिए चल रहा है |
| `isWindowsApp` | `Boolean` | इंगित करता है कि क्या यह सेशन किसी नेटिव Windows ऐप के लिए चल रहा है |
| `isMobile` | `Boolean` | मोबाइल सेशन को इंगित करता है। [मोबाइल फ्लैग्स](#mobile-flags) के अंतर्गत अधिक देखें। |
| `isIOS` | `Boolean` | iOS सेशन को इंगित करता है। [मोबाइल फ्लैग्स](#mobile-flags) के अंतर्गत अधिक देखें। |
| `isAndroid` | `Boolean` | Android सेशन को इंगित करता है। [मोबाइल फ्लैग्स](#mobile-flags) के अंतर्गत अधिक देखें। |
| `isNativeContext` | `Boolean`  | इंगित करता है कि क्या मोबाइल `NATIVE_APP` कॉन्टेक्स्ट में है। [मोबाइल फ्लैग्स](#mobile-flags) के अंतर्गत अधिक देखें। |
| `mobileContext` | `string`  | यह वह **वर्तमान** कॉन्टेक्स्ट प्रदान करेगा जिसमें ड्राइवर है, उदाहरण के लिए Android के लिए `NATIVE_APP`, `WEBVIEW_<packageName>` या iOS के लिए `WEBVIEW_<pid>`। यह `driver.getContext()` के लिए एक अतिरिक्त WebDriver कॉल बचाएगा। [मोबाइल फ्लैग्स](#mobile-flags) के अंतर्गत अधिक देखें। |


## मेथड्स

आपके सेशन के लिए उपयोग किए गए ऑटोमेशन बैकएंड के आधार पर, WebdriverIO यह पहचानता है कि कौन से [प्रोटोकॉल कमांड्स](/docs/api/protocols) [ब्राउज़र ऑब्जेक्ट](/docs/api/browser) से जोड़े जाएंगे। उदाहरण के लिए, यदि आप Chrome में एक ऑटोमेटेड सेशन चलाते हैं, तो आपके पास [`elementHover`](/docs/api/chromium#elementhover) जैसे Chromium विशिष्ट कमांड्स तक पहुंच होगी, लेकिन किसी भी [Appium कमांड्स](/docs/api/appium) तक नहीं।

इसके अलावा, WebdriverIO सुविधाजनक मेथड्स का एक सेट प्रदान करता है जिनका उपयोग पेज पर [ब्राउज़र](/docs/api/browser) या [एलिमेंट्स](/docs/api/element) के साथ इंटरैक्ट करने के लिए करने की सिफारिश की जाती है।

इसके अतिरिक्त निम्नलिखित कमांड्स उपलब्ध हैं:

| नाम | पैरामीटर्स | विवरण |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (प्रकार: `String`)<br />- `fn` (प्रकार: `Function`)<br />- `attachToElement` (प्रकार: `boolean`) | कंपोज़िशन उद्देश्यों के लिए ब्राउज़र ऑब्जेक्ट से कॉल किए जा सकने वाले कस्टम कमांड्स को परिभाषित करने की अनुमति देता है। [कस्टम कमांड](/docs/customcommands) गाइड में अधिक पढ़ें। |
| `overwriteCommand` | - `commandName` (प्रकार: `String`)<br />- `fn` (प्रकार: `Function`)<br />- `attachToElement` (प्रकार: `boolean`) | किसी भी ब्राउज़र कमांड को कस्टम फंक्शनैलिटी के साथ ओवरराइट करने की अनुमति देता है। सावधानी से उपयोग करें क्योंकि यह फ्रेमवर्क उपयोगकर्ताओं को भ्रमित कर सकता है। [कस्टम कमांड](/docs/customcommands#overwriting-native-commands) गाइड में अधिक पढ़ें। |
| `addLocatorStrategy` | - `strategyName` (प्रकार: `String`)<br />- `fn` (प्रकार: `Function`) | एक कस्टम सेलेक्टर स्ट्रैटेजी को परिभाषित करने की अनुमति देता है, [सेलेक्टर्स](/docs/selectors#custom-selector-strategies) गाइड में अधिक पढ़ें। |

## टिप्पणियाँ

### मोबाइल फ्लैग्स

यदि आपको अपने टेस्ट को इस आधार पर संशोधित करने की आवश्यकता है कि आपका सेशन मोबाइल डिवाइस पर चलता है या नहीं, तो आप जांचने के लिए मोबाइल फ्लैग्स का उपयोग कर सकते हैं।

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

आप अपने टेस्ट में इन फ्लैग्स को इस प्रकार एक्सेस कर सकते हैं:

```js
// नोट: `driver` `browser` ऑब्जेक्ट के समतुल्य है लेकिन सिमेंटिक रूप से अधिक सही है
// आप चुन सकते हैं कि आप कौन सा ग्लोबल वेरिएबल उपयोग करना चाहते हैं
console.log(driver.isMobile) // आउटपुट: true
console.log(driver.isIOS) // आउटपुट: true
console.log(driver.isAndroid) // आउटपुट: false
```

यह उपयोगी हो सकता है यदि, उदाहरण के लिए, आप डिवाइस प्रकार के आधार पर अपने [पेज ऑब्जेक्ट्स](../pageobjects) में सेलेक्टर्स परिभाषित करना चाहते हैं, जैसे:

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

आप इन फ्लैग्स का उपयोग केवल कुछ डिवाइस प्रकारों के लिए कुछ विशेष टेस्ट चलाने के लिए भी कर सकते हैं:

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

यहां इवेंट्स की एक सूची है। ध्यान रखें कि यह अभी उपलब्ध इवेंट्स की पूरी सूची नहीं है।
यहां और इवेंट्स के विवरण जोड़कर दस्तावेज़ को अपडेट करने में योगदान देने के लिए स्वतंत्र महसूस करें।

#### `command`

यह इवेंट तब एमिट होता है जब भी WebdriverIO एक WebDriver Classic कमांड भेजता है। इसमें निम्नलिखित जानकारी होती है:

- `command`: कमांड का नाम, उदा. `navigateTo`
- `method`: कमांड रिक्वेस्ट भेजने के लिए उपयोग की गई HTTP मेथड, उदा. `POST`
- `endpoint`: कमांड एंडपॉइंट, उदा. `/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body`: कमांड पेलोड, उदा. `{ url: 'https://webdriver.io' }`

#### `result`

यह इवेंट तब एमिट होता है जब भी WebdriverIO को किसी WebDriver Classic कमांड का परिणाम प्राप्त होता है। इसमें `command` इवेंट जैसी ही जानकारी होती है, साथ ही निम्नलिखित अतिरिक्त जानकारी भी:

- `result`: कमांड का परिणाम

#### `bidiCommand`

यह इवेंट तब एमिट होता है जब भी WebdriverIO ब्राउज़र ड्राइवर को एक WebDriver Bidi कमांड भेजता है। इसमें निम्नलिखित के बारे में जानकारी होती है:

- `method`: WebDriver Bidi कमांड मेथड
- `params`: संबंधित कमांड पैरामीटर ([API](/docs/api/webdriverBidi) देखें)
- `id`: कमांड आईडी, जो इस कमांड के `bidiResult` इवेंट में भी समान होती है

#### `bidiResult`

कमांड के सफल निष्पादन की स्थिति में, इवेंट पेलोड यह होगा:

- `type`: `success`
- `id`: कमांड आईडी
- `result`: कमांड का परिणाम ([API](/docs/api/webdriverBidi) देखें)

कमांड त्रुटि की स्थिति में, इवेंट पेलोड यह होगा:

- `type`: `error`
- `id`: कमांड आईडी
- `error`: त्रुटि कोड, उदा. `invalid argument`
- `message`: त्रुटि के बारे में विवरण
- `stacktrace`: एक स्टैक ट्रेस

#### `request.start`
यह इवेंट ड्राइवर को WebDriver रिक्वेस्ट भेजे जाने से पहले फायर होता है। इसमें रिक्वेस्ट और उसके पेलोड के बारे में जानकारी होती है।

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
यह इवेंट तब फायर होता है जब ड्राइवर को भेजी गई रिक्वेस्ट का रिस्पॉन्स प्राप्त हो जाता है। इवेंट ऑब्जेक्ट में या तो परिणाम के रूप में रिस्पॉन्स बॉडी होती है या यदि WebDriver कमांड विफल हो गया हो तो एक त्रुटि होती है।

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
रीट्राई इवेंट आपको सूचित कर सकता है जब WebdriverIO कमांड को फिर से चलाने का प्रयास करता है, उदा. किसी नेटवर्क समस्या के कारण। इसमें उस त्रुटि के बारे में जानकारी होती है जिसके कारण रीट्राई हुआ और पहले से किए गए रीट्राई की संख्या होती है।

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
यह WebDriver स्तर के ऑपरेशंस को मापने के लिए एक इवेंट है। जब भी WebdriverIO, WebDriver बैकएंड को एक रिक्वेस्ट भेजता है, यह इवेंट कुछ उपयोगी जानकारी के साथ एमिट होगा:

- `durationMillisecond`: मिलीसेकंड में रिक्वेस्ट की समय अवधि।
- `error`: यदि रिक्वेस्ट विफल हुई तो त्रुटि ऑब्जेक्ट।
- `request`: रिक्वेस्ट ऑब्जेक्ट। आप url, method, headers, आदि पा सकते हैं।
- `retryCount`: यदि यह `0` है, तो रिक्वेस्ट पहला प्रयास थी। जब WebDriverIO आंतरिक रूप से रीट्राई करता है तो यह बढ़ेगा।
- `success`: यह दर्शाने के लिए बूलियन कि रिक्वेस्ट सफल हुई या नहीं। यदि यह `false` है, तो `error` प्रॉपर्टी भी प्रदान की जाएगी।

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

आप आमतौर पर उपयोग किए जाने वाले वर्कफ़्लो को एब्स्ट्रैक्ट करने के लिए ब्राउज़र स्कोप पर कस्टम कमांड्स सेट कर सकते हैं। अधिक जानकारी के लिए [कस्टम कमांड्स](/docs/customcommands#adding-custom-commands) पर हमारी गाइड देखें।