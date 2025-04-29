---
id: modules
title: मॉड्यूल
---

WebdriverIO विभिन्न मॉड्यूल NPM और अन्य रजिस्ट्रियों पर प्रकाशित करता है जिनका उपयोग आप अपना स्वयं का ऑटोमेशन फ्रेमवर्क बनाने के लिए कर सकते हैं। WebdriverIO सेटअप प्रकारों पर अधिक दस्तावेज़ीकरण [यहां](/docs/setuptypes) देखें।

## `webdriver` और `devtools`

प्रोटोकॉल पैकेज ([`webdriver`](https://www.npmjs.com/package/webdriver) और [`devtools`](https://www.npmjs.com/package/devtools)) एक क्लास को एक्सपोज़ करते हैं जिसमें निम्नलिखित स्थैतिक फंक्शन संलग्न हैं जो आपको सत्र शुरू करने की अनुमति देते हैं:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

विशिष्ट क्षमताओं के साथ एक नया सत्र शुरू करता है। सत्र प्रतिक्रिया के आधार पर विभिन्न प्रोटोकॉल से कमांड प्रदान किए जाएंगे।

##### पैरामीटर्स

- `options`: [WebDriver विकल्प](/docs/configuration#webdriver-options)
- `modifier`: फ़ंक्शन जो क्लाइंट इंस्टेंस को वापस करने से पहले संशोधित करने की अनुमति देता है
- `userPrototype`: प्रॉपर्टीज़ ऑब्जेक्ट जो इंस्टेंस प्रोटोटाइप को विस्तारित करने की अनुमति देता है
- `customCommandWrapper`: फ़ंक्शन जो फ़ंक्शन कॉल के चारों ओर फंक्शनैलिटी को रैप करने की अनुमति देता है

##### रिटर्न्स

- [ब्राउज़र](/docs/api/browser) ऑब्जेक्ट

##### उदाहरण

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

एक चल रहे WebDriver या DevTools सत्र से जुड़ता है।

##### पैरामीटर्स

- `attachInstance`: इंस्टेंस जिससे सत्र से जुड़ना है या कम से कम एक ऑब्जेक्ट जिसमें `sessionId` प्रॉपर्टी है (जैसे `{ sessionId: 'xxx' }`)
- `modifier`: फ़ंक्शन जो क्लाइंट इंस्टेंस को वापस करने से पहले संशोधित करने की अनुमति देता है
- `userPrototype`: प्रॉपर्टीज़ ऑब्जेक्ट जो इंस्टेंस प्रोटोटाइप को विस्तारित करने की अनुमति देता है
- `customCommandWrapper`: फ़ंक्शन जो फ़ंक्शन कॉल के चारों ओर फंक्शनैलिटी को रैप करने की अनुमति देता है

##### रिटर्न्स

- [ब्राउज़र](/docs/api/browser) ऑब्जेक्ट

##### उदाहरण

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

प्रदान किए गए इंस्टेंस के आधार पर सत्र को पुनः लोड करता है।

##### पैरामीटर्स

- `instance`: पैकेज इंस्टेंस जिसे पुनः लोड करना है

##### उदाहरण

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

प्रोटोकॉल पैकेज (`webdriver` और `devtools`) के समान आप WebdriverIO पैकेज APIs का उपयोग सत्रों को प्रबंधित करने के लिए भी कर सकते हैं। APIs को `import { remote, attach, multiremote } from 'webdriverio` का उपयोग करके आयात किया जा सकता है और इसमें निम्नलिखित कार्यक्षमता शामिल है:

#### `remote(options, modifier)`

WebdriverIO सत्र शुरू करता है। इंस्टेंस में प्रोटोकॉल पैकेज के सभी कमांड होते हैं, लेकिन अतिरिक्त उच्च-क्रम फ़ंक्शन के साथ, [API दस्तावेज़](/docs/api) देखें।

##### पैरामीटर्स

- `options`: [WebdriverIO विकल्प](/docs/configuration#webdriverio)
- `modifier`: फ़ंक्शन जो क्लाइंट इंस्टेंस को वापस करने से पहले संशोधित करने की अनुमति देता है

##### रिटर्न्स

- [ब्राउज़र](/docs/api/browser) ऑब्जेक्ट

##### उदाहरण

```js
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: { browserName: 'chrome' }
})
```

#### `attach(attachOptions)`

एक चल रहे WebdriverIO सत्र से जुड़ता है।

##### पैरामीटर्स

- `attachOptions`: इंस्टेंस जिससे सत्र से जुड़ना है या कम से कम एक ऑब्जेक्ट जिसमें `sessionId` प्रॉपर्टी है (जैसे `{ sessionId: 'xxx' }`)

##### रिटर्न्स

- [ब्राउज़र](/docs/api/browser) ऑब्जेक्ट

##### उदाहरण

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiremote(multiremoteOptions)`

एक multiremote इंस्टेंस शुरू करता है जो आपको एक ही इंस्टेंस के भीतर कई सत्रों को नियंत्रित करने की अनुमति देता है। ठोस उपयोग के मामलों के लिए हमारे [multiremote उदाहरण](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) देखें।

##### पैरामीटर्स

- `multiremoteOptions`: एक ऑब्जेक्ट जिसकी कीज़ ब्राउज़र नाम और उनके [WebdriverIO विकल्प](/docs/configuration#webdriverio) का प्रतिनिधित्व करती हैं।

##### रिटर्न्स

- [ब्राउज़र](/docs/api/browser) ऑब्जेक्ट

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

`wdio` कमांड को कॉल करने के बजाय, आप टेस्ट रनर को मॉड्यूल के रूप में शामिल कर सकते हैं और इसे किसी भी वातावरण में चला सकते हैं। इसके लिए, आपको मॉड्यूल के रूप में `@wdio/cli` पैकेज को आवश्यक होगा, जैसे:

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

`Launcher` क्लास कंस्ट्रक्टर कॉन्फिग फ़ाइल का URL और एक `opts` ऑब्जेक्ट अपेक्षित करता है जिसमें ऐसी सेटिंग्स होती हैं जो कॉन्फिग में मौजूद सेटिंग्स को ओवरराइट करेंगी।

##### पैरामीटर्स

- `configPath`: चलाने के लिए `wdio.conf.js` का पथ
- `opts`: आर्ग्युमेंट्स ([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77)) जो कॉन्फिग फ़ाइल से मान ओवरराइट करते हैं

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

`run` कमांड एक [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) वापस करता है। यह रिज़ॉल्व किया जाता है यदि टेस्ट सफलतापूर्वक चलते हैं या फेल होते हैं, और यह रिजेक्ट किया जाता है यदि लॉन्चर टेस्ट चलाने में असमर्थ था।

## `@wdio/browser-runner`

WebdriverIO के [ब्राउज़र रनर](/docs/runner#browser-runner) का उपयोग करके यूनिट या कंपोनेंट टेस्ट चलाते समय आप अपने टेस्ट के लिए मॉकिंग यूटिलिटीज़ इम्पोर्ट कर सकते हैं, उदाहरण के लिए:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

निम्नलिखित नेम्ड एक्सपोर्ट्स उपलब्ध हैं:

#### `fn`

मॉक फंक्शन, आधिकारिक [Vitest दस्तावेज़](https://vitest.dev/api/mock.html#mock-functions) में अधिक देखें।

#### `spyOn`

स्पाई फंक्शन, आधिकारिक [Vitest दस्तावेज़](https://vitest.dev/api/mock.html#mock-functions) में अधिक देखें।

#### `mock`

फ़ाइल या डिपेंडेंसी मॉड्यूल को मॉक करने की मेथड।

##### पैरामीटर्स

- `moduleName`: या तो मॉक करने के लिए फ़ाइल का रिलेटिव पथ या मॉड्यूल नाम।
- `factory`: मॉक किए गए मान को वापस करने के लिए फ़ंक्शन (वैकल्पिक)

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