---
id: modules
title: मॉड्यूल्स
---

WebdriverIO NPM और अन्य रजिस्ट्री पर विभिन्न मॉड्यूल्स प्रकाशित करता है जिन्हें आप अपना स्वयं का ऑटोमेशन फ्रेमवर्क बनाने के लिए उपयोग कर सकते हैं। WebdriverIO सेटअप प्रकारों के बारे में अधिक दस्तावेज़ीकरण [यहां](/docs/setuptypes) देखें।

## `webdriver` और `devtools`

प्रोटोकॉल पैकेज ([`webdriver`](https://www.npmjs.com/package/webdriver) और [`devtools`](https://www.npmjs.com/package/devtools)) एक क्लास को एक्सपोज़ करते हैं जिसमें निम्नलिखित स्टैटिक फंक्शन अटैच किए गए हैं जो आपको सेशन शुरू करने की अनुमति देते हैं:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

विशिष्ट क्षमताओं के साथ एक नया सेशन शुरू करता है। सेशन प्रतिक्रिया के आधार पर विभिन्न प्रोटोकॉल से कमांड प्रदान की जाएंगी।

##### पैरामीटर्स

- `options`: [WebDriver Options](/docs/configuration#webdriver-options)
- `modifier`: फंक्शन जो क्लाइंट इंस्टेंस को वापस करने से पहले उसे संशोधित करने की अनुमति देता है
- `userPrototype`: प्रॉपर्टीज ऑब्जेक्ट जो इंस्टेंस प्रोटोटाइप को विस्तारित करने की अनुमति देता है
- `customCommandWrapper`: फंक्शन जो फंक्शन कॉल के आसपास फंक्शनैलिटी को रैप करने की अनुमति देता है

##### रिटर्न्स

- [Browser](/docs/api/browser) ऑब्जेक्ट

##### उदाहरण

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

चलते हुए WebDriver या DevTools सेशन से जुड़ता है।

##### पैरामीटर्स

- `attachInstance`: सेशन से जुड़ने के लिए इंस्टेंस या कम से कम एक ऑब्जेक्ट जिसमें `sessionId` प्रॉपर्टी है (जैसे `{ sessionId: 'xxx' }`)
- `modifier`: फंक्शन जो क्लाइंट इंस्टेंस को वापस करने से पहले उसे संशोधित करने की अनुमति देता है
- `userPrototype`: प्रॉपर्टीज ऑब्जेक्ट जो इंस्टेंस प्रोटोटाइप को विस्तारित करने की अनुमति देता है
- `customCommandWrapper`: फंक्शन जो फंक्शन कॉल के आसपास फंक्शनैलिटी को रैप करने की अनुमति देता है

##### रिटर्न्स

- [Browser](/docs/api/browser) ऑब्जेक्ट

##### उदाहरण

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

दिए गए इंस्टेंस के साथ सेशन को रीलोड करता है।

##### पैरामीटर्स

- `instance`: रीलोड करने के लिए पैकेज इंस्टेंस

##### उदाहरण

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

प्रोटोकॉल पैकेजेस (`webdriver` और `devtools`) के समान, आप सेशन प्रबंधित करने के लिए WebdriverIO पैकेज API का भी उपयोग कर सकते हैं। API को `import { remote, attach, multiremote } from 'webdriverio` का उपयोग करके आयात किया जा सकता है और इसमें निम्नलिखित कार्यक्षमता होती है:

#### `remote(options, modifier)`

एक WebdriverIO सेशन शुरू करता है। इंस्टेंस में प्रोटोकॉल पैकेज के समान सभी कमांड होते हैं, लेकिन अतिरिक्त उच्च स्तरीय फंक्शन के साथ, [API डॉक्स](/docs/api) देखें।

##### पैरामीटर्स

- `options`: [WebdriverIO Options](/docs/configuration#webdriverio)
- `modifier`: फंक्शन जो क्लाइंट इंस्टेंस को वापस करने से पहले उसे संशोधित करने की अनुमति देता है

##### रिटर्न्स

- [Browser](/docs/api/browser) ऑब्जेक्ट

##### उदाहरण

```js
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: { browserName: 'chrome' }
})
```

#### `attach(attachOptions)`

चलते हुए WebdriverIO सेशन से जुड़ता है।

##### पैरामीटर्स

- `attachOptions`: सेशन से जुड़ने के लिए इंस्टेंस या कम से कम एक ऑब्जेक्ट जिसमें `sessionId` प्रॉपर्टी है (जैसे `{ sessionId: 'xxx' }`)

##### रिटर्न्स

- [Browser](/docs/api/browser) ऑब्जेक्ट

##### उदाहरण

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiremote(multiremoteOptions)`

एक multiremote इंस्टेंस शुरू करता है जो आपको एक ही इंस्टेंस के भीतर कई सेशन को नियंत्रित करने की अनुमति देता है। विशिष्ट उपयोग मामलों के लिए हमारे [multiremote उदाहरण](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) देखें।

##### पैरामीटर्स

- `multiremoteOptions`: एक ऑब्जेक्ट जिसकी कीज़ ब्राउज़र नाम और उनके [WebdriverIO Options](/docs/configuration#webdriverio) को दर्शाती हैं।

##### रिटर्न्स

- [Browser](/docs/api/browser) ऑब्जेक्ट

##### उदाहरण

```js
import { multiremote } from 'webdriverio'

const matrix = await multiremote({
    myChromeBrowser: {
        capabilities: { browserName: 'chrome' }
    },
    myFirefoxBrowser: {
        capabilities: { browserName: 'firefox' }
    }
})
await matrix.url('http://json.org')
await matrix.getInstance('browserA').url('https://google.com')

console.log(await matrix.getTitle())
// returns ['Google', 'JSON']
```

## `@wdio/cli`

`wdio` कमांड को कॉल करने के बजाय, आप टेस्ट रनर को मॉड्यूल के रूप में भी शामिल कर सकते हैं और इसे एक अनिवार्य पर्यावरण में चला सकते हैं। इसके लिए, आपको `@wdio/cli` पैकेज को मॉड्यूल के रूप में आयात करना होगा, इस तरह:

<Tabs
  defaultValue="esm"
  values={[
    {label: 'EcmaScript Modules', value: 'esm'},
    {label: 'CommonJS', value: 'cjs'}
  ]
}>
<TabItem value="esm">

```js
import Launcher from '@wdio/cli'
```

</TabItem>
<TabItem value="cjs">

```js
const Launcher = require('@wdio/cli').default
```

</TabItem>
</Tabs>

इसके बाद, लॉन्चर का एक इंस्टेंस बनाएं, और टेस्ट चलाएं।

#### `Launcher(configPath, opts)`

`Launcher` क्लास कंस्ट्रक्टर कॉन्फिग फाइल का URL और एक `opts` ऑब्जेक्ट अपेक्षित करता है जिसमें सेटिंग्स होती हैं जो कॉन्फिग में मौजूद सेटिंग्स को ओवरराइट करेंगी।

##### पैरामीटर्स

- `configPath`: चलाने के लिए `wdio.conf.js` का पथ
- `opts`: आर्ग्युमेंट्स ([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77)) कॉन्फिग फाइल से वैल्यू को ओवरराइट करने के लिए

##### उदाहरण

```js
const wdio = new Launcher(
    '/path/to/my/wdio.conf.js',
    { spec: '/path/to/a/single/spec.e2e.js' }
)

wdio.run().then((exitCode) => {
    process.exit(exitCode)
}, (error) => {
    console.error('Launcher failed to start the test', error.stacktrace)
    process.exit(1)
})
```

`run` कमांड एक [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) वापस करता है। यह समाधान किया जाता है यदि टेस्ट सफलतापूर्वक चलते हैं या विफल होते हैं, और यह अस्वीकार किया जाता है यदि लॉन्चर टेस्ट चलाने में असमर्थ था।

## `@wdio/browser-runner`

WebdriverIO के [ब्राउज़र रनर](/docs/runner#browser-runner) का उपयोग करके यूनिट या कंपोनेंट टेस्ट चलाते समय आप अपने टेस्ट के लिए मॉकिंग यूटिलिटी आयात कर सकते हैं, उदाहरण के लिए:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

निम्नलिखित नेम्ड एक्सपोर्ट उपलब्ध हैं:

#### `fn`

मॉक फंक्शन, आधिकारिक [Vitest डॉक्स](https://vitest.dev/api/mock.html#mock-functions) में अधिक देखें।

#### `spyOn`

स्पाई फंक्शन, आधिकारिक [Vitest डॉक्स](https://vitest.dev/api/mock.html#mock-functions) में अधिक देखें।

#### `mock`

फाइल या डिपेंडेंसी मॉड्यूल को मॉक करने की विधि।

##### पैरामीटर्स

- `moduleName`: या तो मॉक की जाने वाली फाइल का रिलेटिव पथ या मॉड्यूल नाम।
- `factory`: मॉक की गई वैल्यू को वापस करने के लिए फंक्शन (वैकल्पिक)

##### उदाहरण

```js
mock('../src/constants.ts', () => ({
    SOME_DEFAULT: 'mocked out'
}))

mock('lodash', (origModuleFactory) => {
    const origModule = await origModuleFactory()
    return {
        ...origModule,
        pick: fn()
    }
})
```

#### `unmock`

मैनुअल मॉक (`__mocks__`) डायरेक्टरी के भीतर परिभाषित डिपेंडेंसी को अनमॉक करें।

##### पैरामीटर्स

- `moduleName`: अनमॉक किए जाने वाले मॉड्यूल का नाम।

##### उदाहरण

```js
unmock('lodash')
```