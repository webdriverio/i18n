---
id: browser
title: ब्राउज़र ऑब्जेक्ट
---

__Extends:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

ब्राउज़र ऑब्जेक्ट वह सेशन इंस्टेंस है जिसका उपयोग आप ब्राउज़र या मोबाइल डिवाइस को नियंत्रित करने के लिए करते हैं। यदि आप WDIO टेस्ट रनर का उपयोग करते हैं, तो आप WebDriver इंस्टेंस तक ग्लोबल `browser` या `driver` ऑब्जेक्ट के माध्यम से या [`@wdio/globals`](/docs/api/globals) का उपयोग करके इम्पोर्ट कर सकते हैं। यदि आप स्टैंडअलोन मोड में WebdriverIO का उपयोग करते हैं, तो ब्राउज़र ऑब्जेक्ट [`remote`](/docs/api/modules#remoteoptions-modifier) मेथड द्वारा रिटर्न किया जाता है।

सेशन टेस्ट रनर द्वारा इनिशियलाइज़ किया जाता है। सेशन को समाप्त करने के लिए भी यही लागू होता है। यह भी टेस्ट रनर प्रोसेस द्वारा किया जाता है।

## प्रॉपर्टीज़

एक ब्राउज़र ऑब्जेक्ट में निम्नलिखित प्रॉपर्टीज़ होती हैं:

| नाम | प्रकार | विवरण |
| ---- | ---- | ------- |
| `capabilities` | `Object` | रिमोट सर्वर से असाइन की गई कैपेबिलिटीज़।<br /><b>उदाहरण:</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | रिमोट सर्वर से अनुरोधित कैपेबिलिटीज़।<br /><b>उदाहरण:</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | रिमोट सर्वर से असाइन किया गया सेशन आईडी। |
| `options` | `Object` | WebdriverIO [options](/docs/configuration) ब्राउज़र ऑब्जेक्ट कैसे बनाया गया था इस पर निर्भर करता है। अधिक [setup types](/docs/setuptypes) देखें। |
| `commandList` | `String[]` | ब्राउज़र इंस्टेंस के लिए पंजीकृत कमांड्स की सूची |
| `isW3C` | `Boolean` | इंगित करता है कि यह एक W3C सेशन है |
| `isChrome` | `Boolean` | इंगित करता है कि यह Chrome इंस्टेंस है |
| `isFirefox` | `Boolean` | इंगित करता है कि यह Firefox इंस्टेंस है |
| `isBidi` | `Boolean` | इंगित करता है कि यह सेशन Bidi का उपयोग करता है |
| `isSauce` | `Boolean` | इंगित करता है कि यह सेशन Sauce Labs पर चल रहा है |
| `isMacApp` | `Boolean` | इंगित करता है कि यह सेशन नेटिव Mac ऐप के लिए चल रहा है |
| `isWindowsApp` | `Boolean` | इंगित करता है कि यह सेशन नेटिव Windows ऐप के लिए चल रहा है |
| `isMobile` | `Boolean` | मोबाइल सेशन को इंगित करता है। [Mobile Flags](#mobile-flags) के अंतर्गत अधिक देखें। |
| `isIOS` | `Boolean` | iOS सेशन को इंगित करता है। [Mobile Flags](#mobile-flags) के अंतर्गत अधिक देखें। |
| `isAndroid` | `Boolean` | Android सेशन को इंगित करता है। [Mobile Flags](#mobile-flags) के अंतर्गत अधिक देखें। |
| `isNativeContext` | `Boolean`  | इंगित करता है कि मोबाइल `NATIVE_APP` कांटेक्स्ट में है। [Mobile Flags](#mobile-flags) के अंतर्गत अधिक देखें। |
| `mobileContext` | `string`  | यह **वर्तमान** कांटेक्स्ट प्रदान करेगा जिसमें ड्राइवर है, उदाहरण के लिए Android के लिए `NATIVE_APP`, `WEBVIEW_<packageName>` या iOS के लिए `WEBVIEW_<pid>`। यह `driver.getContext()` को एक अतिरिक्त WebDriver को सहेजेगा। [Mobile Flags](#mobile-flags) के अंतर्गत अधिक देखें। |


## मेथड्स

आपके सेशन के लिए उपयोग किए जाने वाले ऑटोमेशन बैकेंड के आधार पर, WebdriverIO पहचानता है कि कौन से [Protocol Commands](/docs/api/protocols) [browser object](/docs/api/browser) से जुड़े होंगे। उदाहरण के लिए, यदि आप Chrome में एक ऑटोमेटेड सेशन चलाते हैं, तो आपके पास Chromium विशिष्ट कमांड्स जैसे [`elementHover`](/docs/api/chromium#elementhover) तक पहुंच होगी, लेकिन [Appium commands](/docs/api/appium) में से कोई भी नहीं।

इसके अलावा WebdriverIO सुविधाजनक मेथड्स का एक सेट प्रदान करता है जिनका उपयोग करने की सिफारिश की जाती है, [browser](/docs/api/browser) या पेज पर [elements](/docs/api/element) के साथ इंटरैक्ट करने के लिए।

इसके अतिरिक्त निम्नलिखित कमांड्स उपलब्ध हैं:

| नाम | पैरामीटर्स | विवरण |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (प्रकार: `String`)<br />- `fn` (प्रकार: `Function`)<br />- `attachToElement` (प्रकार: `boolean`) | कस्टम कमांड्स को परिभाषित करने की अनुमति देता है जिन्हें कंपोजिशन उद्देश्यों के लिए ब्राउज़र ऑब्जेक्ट से कॉल किया जा सकता है। [Custom Command](/docs/customcommands) गाइड में अधिक पढ़ें। |
| `overwriteCommand` | - `commandName` (प्रकार: `String`)<br />- `fn` (प्रकार: `Function`)<br />- `attachToElement` (प्रकार: `boolean`) | किसी भी ब्राउज़र कमांड को कस्टम फंक्शनैलिटी के साथ ओवरराइट करने की अनुमति देता है। सावधानी से उपयोग करें क्योंकि यह फ्रेमवर्क उपयोगकर्ताओं को भ्रमित कर सकता है। [Custom Command](/docs/customcommands#overwriting-native-commands) गाइड में अधिक पढ़ें। |
| `addLocatorStrategy` | - `strategyName` (प्रकार: `String`)<br />- `fn` (प्रकार: `Function`) | एक कस्टम सिलेक्टर स्ट्रैटेजी को परिभाषित करने की अनुमति देता है, [Selectors](/docs/selectors#custom-selector-strategies) गाइड में अधिक पढ़ें। |

## टिप्पणियां

### मोबाइल फ्लैग्स

यदि आपको अपने टेस्ट को इस आधार पर संशोधित करने की आवश्यकता है कि आपका सेशन मोबाइल डिवाइस पर चल रहा है या नहीं, तो आप जांच के लिए मोबाइल फ्लैग्स का उपयोग कर सकते हैं।

उदाहरण के लिए, इस कॉन्फिग के आधार पर:

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

आप अपने टेस्ट में इन फ्लैग्स तक इस प्रकार एक्सेस कर सकते हैं:

```js
// नोट: `driver` `browser` ऑब्जेक्ट के समान है, लेकिन शब्दार्थ रूप से अधिक सही है
// आप चुन सकते हैं कि आप किस ग्लोबल वेरिएबल का उपयोग करना चाहते हैं
console.log(driver.isMobile) // आउटपुट: true
console.log(driver.isIOS) // आउटपुट: true
console.log(driver.isAndroid) // आउटपुट: false
```

यह उपयोगी हो सकता है, उदाहरण के लिए, यदि आप डिवाइस के प्रकार के आधार पर अपने [page objects](../pageobjects) में सिलेक्टर्स को परिभाषित करना चाहते हैं, इस प्रकार:

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

आप इन फ्लैग्स का उपयोग केवल कुछ निश्चित डिवाइस प्रकारों के लिए कुछ टेस्ट चलाने के लिए भी कर सकते हैं:

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
ब्राउज़र ऑब्जेक्ट एक EventEmitter है और आपके उपयोग के लिए कुछ इवेंट्स एमिट किए जाते हैं।

यहां इवेंट्स की एक सूची है। ध्यान रखें कि यह उपलब्ध इवेंट्स की पूरी सूची नहीं है।
दस्तावेज़ को अपडेट करने के लिए योगदान करें और यहां अधिक इवेंट्स के विवरण जोड़ें।

#### `command`

यह इवेंट तब एमिट किया जाता है जब WebdriverIO एक WebDriver क्लासिक कमांड भेजता है। इसमें निम्न जानकारी शामिल है:

- `command`: कमांड का नाम, जैसे `navigateTo`
- `method`: कमांड अनुरोध भेजने के लिए उपयोग की जाने वाली HTTP मेथड, जैसे `POST`
- `endpoint`: कमांड एंडपॉइंट, जैसे `/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body`: कमांड पेलोड, जैसे `{ url: 'https://webdriver.io' }`

#### `result`

यह इवेंट तब एमिट किया जाता है जब WebdriverIO WebDriver क्लासिक कमांड का परिणाम प्राप्त करता है। इसमें `command` इवेंट के समान जानकारी के साथ निम्न अतिरिक्त जानकारी शामिल है:

- `result`: कमांड का परिणाम

#### `bidiCommand`

यह इवेंट तब एमिट किया जाता है जब WebdriverIO ब्राउज़र ड्राइवर को WebDriver Bidi कमांड भेजता है। इसमें निम्न जानकारी शामिल है:

- `method`: WebDriver Bidi कमांड मेथड
- `params`: संबंधित कमांड पैरामीटर (देखें [API](/docs/api/webdriverBidi))

#### `bidiResult`

सफल कमांड निष्पादन के मामले में, इवेंट पेलोड होगा:

- `type`: `success`
- `id`: कमांड आईडी
- `result`: कमांड का परिणाम (देखें [API](/docs/api/webdriverBidi))

कमांड त्रुटि के मामले में, इवेंट पेलोड होगा:

- `type`: `error`
- `id`: कमांड आईडी
- `error`: त्रुटि कोड, जैसे `invalid argument`
- `message`: त्रुटि के बारे में विवरण
- `stacktrace`: स्टैक ट्रेस

#### `request.start`
यह इवेंट ड्राइवर को WebDriver अनुरोध भेजने से पहले फायर किया जाता है। इसमें अनुरोध और उसके पेलोड के बारे में जानकारी शामिल है।

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
यह इवेंट तब फायर किया जाता है जब ड्राइवर को अनुरोध प्रतिक्रिया प्राप्त होती है। इवेंट ऑब्जेक्ट में या तो परिणाम के रूप में प्रतिक्रिया बॉडी शामिल होती है या एक त्रुटि शामिल होती है यदि WebDriver कमांड विफल हो गया।

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
रिट्राई इवेंट आपको सूचित कर सकता है जब WebdriverIO कमांड को फिर से चलाने का प्रयास करता है, उदाहरण के लिए नेटवर्क समस्या के कारण। इसमें उस त्रुटि के बारे में जानकारी शामिल है जिसके कारण रिट्राई हुआ और पहले से किए गए रिट्राई की संख्या।

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
यह WebDriver स्तर के ऑपरेशन्स को मापने के लिए एक इवेंट है। जब भी WebdriverIO WebDriver बैकेंड को एक अनुरोध भेजता है, यह इवेंट कुछ उपयोगी जानकारी के साथ एमिट किया जाएगा:

- `durationMillisecond`: अनुरोध की समय अवधि मिलीसेकंड में।
- `error`: त्रुटि ऑब्जेक्ट यदि अनुरोध विफल हुआ।
- `request`: अनुरोध ऑब्जेक्ट। आप url, method, headers, आदि पा सकते हैं।
- `retryCount`: यदि यह `0` है, तो अनुरोध पहला प्रयास था। यह बढ़ेगा जब WebDriverIO अंदर ही रिट्राई करता है।
- `success`: अनुरोध सफल हुआ या नहीं, इसका प्रतिनिधित्व करने के लिए बूलियन। यदि यह `false` है, तो `error` प्रॉपर्टी भी प्रदान की जाएगी।

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

आप ब्राउज़र स्कोप पर कस्टम कमांड्स सेट कर सकते हैं ताकि आमतौर पर उपयोग किए जाने वाले वर्कफ़्लोज़ को अलग कर सकें। अधिक जानकारी के लिए हमारे [Custom Commands](/docs/customcommands#adding-custom-commands) गाइड को देखें।