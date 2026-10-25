---
id: modules
title: मॉड्यूल्स
---

WebdriverIO विभिन्न मॉड्यूल्स को NPM और अन्य रजिस्ट्रियों पर प्रकाशित करता है जिनका उपयोग आप अपना स्वयं का ऑटोमेशन फ्रेमवर्क बनाने के लिए कर सकते हैं। WebdriverIO सेटअप प्रकारों पर अधिक दस्तावेज़ीकरण [यहाँ](/docs/setuptypes) देखें।

## `webdriver` और `devtools`

प्रोटोकॉल पैकेज ([`webdriver`](https://www.npmjs.com/package/webdriver) और [`devtools`](https://www.npmjs.com/package/devtools)) एक क्लास प्रदान करते हैं जिसमें निम्नलिखित स्टैटिक फ़ंक्शन जुड़े होते हैं जो आपको सेशन शुरू करने की अनुमति देते हैं:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

विशिष्ट क्षमताओं (capabilities) के साथ एक नया सेशन शुरू करता है। सेशन रिस्पॉन्स के आधार पर विभिन्न प्रोटोकॉल के कमांड प्रदान किए जाएंगे।

##### पैरामीटर्स

- `options`: [WebDriver Options](/docs/configuration#webdriver-options)
- `modifier`: फ़ंक्शन जो क्लाइंट इंस्टेंस को लौटाए जाने से पहले उसे संशोधित करने की अनुमति देता है
- `userPrototype`: प्रॉपर्टीज़ ऑब्जेक्ट जो इंस्टेंस प्रोटोटाइप को विस्तारित करने की अनुमति देता है
- `customCommandWrapper`: फ़ंक्शन जो फ़ंक्शन कॉल्स के चारों ओर कार्यक्षमता को रैप करने की अनुमति देता है

##### रिटर्न्स

- [Browser](/docs/api/browser) ऑब्जेक्ट

##### उदाहरण

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

चल रहे WebDriver या DevTools सेशन से जुड़ता है।

##### पैरामीटर्स

- `attachInstance`: वह इंस्टेंस जिससे सेशन को जोड़ना है या कम से कम `sessionId` प्रॉपर्टी वाला एक ऑब्जेक्ट (उदा. `{ sessionId: 'xxx' }`)
- `modifier`: फ़ंक्शन जो क्लाइंट इंस्टेंस को लौटाए जाने से पहले उसे संशोधित करने की अनुमति देता है
- `userPrototype`: प्रॉपर्टीज़ ऑब्जेक्ट जो इंस्टेंस प्रोटोटाइप को विस्तारित करने की अनुमति देता है
- `customCommandWrapper`: फ़ंक्शन जो फ़ंक्शन कॉल्स के चारों ओर कार्यक्षमता को रैप करने की अनुमति देता है

##### रिटर्न्स

- [Browser](/docs/api/browser) ऑब्जेक्ट

##### उदाहरण

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

प्रदान किए गए इंस्टेंस के आधार पर सेशन को रीलोड करता है।

##### पैरामीटर्स

- `instance`: रीलोड करने के लिए पैकेज इंस्टेंस

##### उदाहरण

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

प्रोटोकॉल पैकेजों (`webdriver` और `devtools`) की तरह ही आप सेशन प्रबंधित करने के लिए WebdriverIO पैकेज APIs का भी उपयोग कर सकते हैं। APIs को `import { remote, attach, multiRemote } from 'webdriverio` का उपयोग करके इम्पोर्ट किया जा सकता है और इनमें निम्नलिखित कार्यक्षमता शामिल है:

#### `remote(options, modifier)`

एक WebdriverIO सेशन शुरू करता है। इंस्टेंस में प्रोटोकॉल पैकेज के सभी कमांड शामिल होते हैं, लेकिन अतिरिक्त हायर ऑर्डर फ़ंक्शंस के साथ, [API docs](/docs/api) देखें।

##### पैरामीटर्स

- `options`: [WebdriverIO Options](/docs/configuration#webdriverio)
- `modifier`: फ़ंक्शन जो क्लाइंट इंस्टेंस को लौटाए जाने से पहले उसे संशोधित करने की अनुमति देता है

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

चल रहे WebdriverIO सेशन से जुड़ता है।

##### पैरामीटर्स

- `attachOptions`: वह इंस्टेंस जिससे सेशन को जोड़ना है या कम से कम `sessionId` प्रॉपर्टी वाला एक ऑब्जेक्ट (उदा. `{ sessionId: 'xxx' }`)

##### रिटर्न्स

- [Browser](/docs/api/browser) ऑब्जेक्ट

##### उदाहरण

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiRemote(multiRemoteOptions)`

एक मल्टी-रिमोट इंस्टेंस शुरू करता है जो आपको एक ही इंस्टेंस के भीतर कई सेशन नियंत्रित करने की अनुमति देता है। ठोस उपयोग के मामलों के लिए हमारे [मल्टी-रिमोट उदाहरण](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) देखें।

##### पैरामीटर्स

- `multiRemoteOptions`: एक ऑब्जेक्ट जिसकी कीज़ ब्राउज़र नाम और उनके [WebdriverIO Options](/docs/configuration#webdriverio) को दर्शाती हैं।

##### रिटर्न्स

- [Browser](/docs/api/browser) ऑब्जेक्ट

##### उदाहरण

```js
import { multiRemote } from 'webdriverio'

const matrix = await multiRemote({
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
// ['Google', 'JSON'] लौटाता है
```

#### `Key`

[`browser.keys`](/docs/api/browser/keys) कमांड के साथ उपयोग के लिए विशेष कैरेक्टर कॉन्स्टेंट्स वाला एक ऑब्जेक्ट। ये कॉन्स्टेंट्स उन विशेष कीज़ को दर्शाते हैं जिन्हें ब्राउज़र को भेजा जा सकता है, जैसे `Enter`, `Tab`, `Escape`, ऐरो कीज़, फ़ंक्शन कीज़, और भी बहुत कुछ।

##### उदाहरण

```js
import { Key } from 'webdriverio'

// Enter की दबाएँ
await browser.keys(Key.Enter)

// सब कुछ चुनने के लिए Ctrl+A का उपयोग करें (क्रॉस-प्लेटफ़ॉर्म काम करता है)
await browser.keys([Key.Ctrl, 'a'])

// ऐरो कीज़ से नेविगेट करें
await browser.keys([Key.ArrowDown, Key.ArrowDown, Key.Enter])
```

##### उपलब्ध कीज़

निम्नलिखित विशेष कीज़ `Key` ऑब्जेक्ट के माध्यम से उपलब्ध हैं:

**मॉडिफ़ायर कीज़:**

| कॉन्स्टेंट | विवरण |
|----------|-------------|
| `Key.Ctrl` | क्रॉस-प्लेटफ़ॉर्म कंट्रोल की (Mac पर Command, Windows/Linux पर Control) |
| `Key.Control` | Control की |
| `Key.Shift` | Shift की |
| `Key.Alt` | Alt की |
| `Key.Command` | Command की (Mac) |
| `Key.NULL` | Null/रिलीज़ की — वर्तमान में दबाई गई सभी मॉडिफ़ायर कीज़ को रिलीज़ करती है |

**नेविगेशन कीज़:**

| कॉन्स्टेंट | विवरण |
|----------|-------------|
| `Key.Cancel` | Cancel की |
| `Key.Help` | Help की |
| `Key.Backspace` | Backspace की |
| `Key.Tab` | Tab की |
| `Key.Clear` | Clear की |
| `Key.Return` | Return की |
| `Key.Enter` | Enter की |
| `Key.Pause` | Pause की |
| `Key.Escape` | Escape की |
| `Key.Space` | Space की |
| `Key.PageUp` | Page Up की |
| `Key.PageDown` | Page Down की |
| `Key.End` | End की |
| `Key.Home` | Home की |
| `Key.ArrowLeft` | Left Arrow की |
| `Key.ArrowUp` | Up Arrow की |
| `Key.ArrowRight` | Right Arrow की |
| `Key.ArrowDown` | Down Arrow की |
| `Key.Insert` | Insert की |
| `Key.Delete` | Delete की |

**कैरेक्टर कीज़:**

| कॉन्स्टेंट | विवरण |
|----------|-------------|
| `Key.Semicolon` | Semicolon की |
| `Key.Equals` | Equals की |

**न्यूमपैड कीज़:**

| कॉन्स्टेंट | विवरण |
|----------|-------------|
| `Key.Numpad0` - `Key.Numpad9` | Numpad 0-9 |
| `Key.Multiply` | Numpad Multiply |
| `Key.Add` | Numpad Add |
| `Key.Separator` | Numpad Separator |
| `Key.Subtract` | Numpad Subtract |
| `Key.Decimal` | Numpad Decimal |
| `Key.Divide` | Numpad Divide |

**फ़ंक्शन कीज़:**

| कॉन्स्टेंट | विवरण |
|----------|-------------|
| `Key.F1` - `Key.F12` | फ़ंक्शन कीज़ F1 से F12 तक |

**अन्य कीज़:**

| कॉन्स्टेंट | विवरण |
|----------|-------------|
| `Key.ZenkakuHankaku` | Zenkaku/Hankaku की (जापानी) |

:::info क्रॉस-प्लेटफ़ॉर्म मॉडिफ़ायर कीज़

`Key.Ctrl` कॉन्स्टेंट विभिन्न ऑपरेटिंग सिस्टम में "control" मॉडिफ़ायर का उपयोग करने का एक सुविधाजनक तरीका प्रदान करता है। macOS पर, यह `Command` की से मैप होता है, जबकि Windows और Linux पर यह `Control` की से मैप होता है। यह तब उपयोगी है जब ऐसे टेस्ट लिख रहे हों जिन्हें कई प्लेटफ़ॉर्म पर काम करना हो, उदा., सब चुनें (`Ctrl+A`), कॉपी (`Ctrl+C`), या पेस्ट (`Ctrl+V`) ऑपरेशंस के लिए।

:::

## `@wdio/cli`

`wdio` कमांड को कॉल करने के बजाय, आप टेस्ट रनर को मॉड्यूल के रूप में शामिल करके उसे किसी भी वातावरण में चला सकते हैं। इसके लिए, आपको `@wdio/cli` पैकेज को मॉड्यूल के रूप में require करना होगा, इस तरह:

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

इसके बाद, लॉन्चर का एक इंस्टेंस बनाएँ, और टेस्ट चलाएँ।

#### `Launcher(configPath, opts)`

`Launcher` क्लास कंस्ट्रक्टर कॉन्फ़िग फ़ाइल का URL, और सेटिंग्स वाला एक `opts` ऑब्जेक्ट अपेक्षित करता है जो कॉन्फ़िग में मौजूद सेटिंग्स को ओवरराइट करेगा।

##### पैरामीटर्स

- `configPath`: चलाने के लिए `wdio.conf.js` का पाथ
- `opts`: कॉन्फ़िग फ़ाइल से मानों को ओवरराइट करने के लिए आर्गुमेंट्स ([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77))

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

`run` कमांड एक [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) लौटाता है। यह resolve होता है यदि टेस्ट सफलतापूर्वक चले या विफल हुए, और यह reject होता है यदि लॉन्चर टेस्ट चलाना शुरू करने में असमर्थ रहा।

## `@wdio/browser-runner`

WebdriverIO के [ब्राउज़र रनर](/docs/runner#browser-runner) का उपयोग करके यूनिट या कंपोनेंट टेस्ट चलाते समय आप अपने टेस्ट के लिए मॉकिंग यूटिलिटीज़ इम्पोर्ट कर सकते हैं, उदा.:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

निम्नलिखित नेम्ड एक्सपोर्ट्स उपलब्ध हैं:

#### `fn`

मॉक फ़ंक्शन, अधिक जानकारी के लिए आधिकारिक [Vitest docs](https://vitest.dev/api/mock.html#mock-functions) देखें।

#### `spyOn`

स्पाई फ़ंक्शन, अधिक जानकारी के लिए आधिकारिक [Vitest docs](https://vitest.dev/api/mock.html#mock-functions) देखें।

#### `mock`

फ़ाइल या डिपेंडेंसी मॉड्यूल को मॉक करने की मेथड।

##### पैरामीटर्स

- `moduleName`: या तो मॉक की जाने वाली फ़ाइल का रिलेटिव पाथ या मॉड्यूल का नाम।
- `factory`: मॉक की गई वैल्यू लौटाने वाला फ़ंक्शन (वैकल्पिक)

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

उस डिपेंडेंसी को अनमॉक करें जो मैनुअल मॉक (`__mocks__`) डायरेक्टरी के भीतर परिभाषित है।

##### पैरामीटर्स

- `moduleName`: अनमॉक किए जाने वाले मॉड्यूल का नाम।

##### उदाहरण

```js
unmock('lodash')
```