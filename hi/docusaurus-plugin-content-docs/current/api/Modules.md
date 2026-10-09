---
id: modules
title: मॉड्यूल्स
---

WebdriverIO NPM और अन्य रजिस्ट्रियों पर विभिन्न मॉड्यूल प्रकाशित करता है जिनका उपयोग आप अपना स्वयं का ऑटोमेशन फ्रेमवर्क बनाने के लिए कर सकते हैं। WebdriverIO सेटअप प्रकारों पर अधिक दस्तावेज़ीकरण [यहाँ](/docs/setuptypes) देखें।

## `webdriver` और `devtools`

प्रोटोकॉल पैकेज ([`webdriver`](https://www.npmjs.com/package/webdriver) और [`devtools`](https://www.npmjs.com/package/devtools)) एक क्लास प्रदान करते हैं जिसके साथ निम्नलिखित स्टैटिक फ़ंक्शन जुड़े होते हैं जो आपको सेशन शुरू करने की अनुमति देते हैं:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

विशिष्ट क्षमताओं (capabilities) के साथ एक नया सेशन शुरू करता है। सेशन रिस्पॉन्स के आधार पर विभिन्न प्रोटोकॉल से कमांड प्रदान किए जाएंगे।

##### पैरामीटर्स

- `options`: [WebDriver विकल्प](/docs/configuration#webdriver-options)
- `modifier`: फ़ंक्शन जो क्लाइंट इंस्टेंस को वापस किए जाने से पहले उसे संशोधित करने की अनुमति देता है
- `userPrototype`: प्रॉपर्टीज़ ऑब्जेक्ट जो इंस्टेंस प्रोटोटाइप को विस्तारित करने की अनुमति देता है
- `customCommandWrapper`: फ़ंक्शन जो फ़ंक्शन कॉल्स के चारों ओर कार्यक्षमता को रैप करने की अनुमति देता है

##### रिटर्न करता है

- [Browser](/docs/api/browser) ऑब्जेक्ट

##### उदाहरण

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

किसी चल रहे WebDriver या DevTools सेशन से जुड़ता है।

##### पैरामीटर्स

- `attachInstance`: वह इंस्टेंस जिससे सेशन जोड़ना है या कम से कम `sessionId` प्रॉपर्टी वाला एक ऑब्जेक्ट (जैसे `{ sessionId: 'xxx' }`)
- `modifier`: फ़ंक्शन जो क्लाइंट इंस्टेंस को वापस किए जाने से पहले उसे संशोधित करने की अनुमति देता है
- `userPrototype`: प्रॉपर्टीज़ ऑब्जेक्ट जो इंस्टेंस प्रोटोटाइप को विस्तारित करने की अनुमति देता है
- `customCommandWrapper`: फ़ंक्शन जो फ़ंक्शन कॉल्स के चारों ओर कार्यक्षमता को रैप करने की अनुमति देता है

##### रिटर्न करता है

- [Browser](/docs/api/browser) ऑब्जेक्ट

##### उदाहरण

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

प्रदान किए गए इंस्टेंस के आधार पर एक सेशन को रीलोड करता है।

##### पैरामीटर्स

- `instance`: रीलोड करने के लिए पैकेज इंस्टेंस

##### उदाहरण

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

प्रोटोकॉल पैकेज (`webdriver` और `devtools`) की तरह ही आप सेशन प्रबंधित करने के लिए WebdriverIO पैकेज APIs का भी उपयोग कर सकते हैं। APIs को `import { remote, attach, multiRemote } from 'webdriverio` का उपयोग करके इम्पोर्ट किया जा सकता है और इनमें निम्नलिखित कार्यक्षमता शामिल है:

#### `remote(options, modifier)`

एक WebdriverIO सेशन शुरू करता है। इंस्टेंस में प्रोटोकॉल पैकेज के सभी कमांड होते हैं लेकिन अतिरिक्त हायर ऑर्डर फ़ंक्शन के साथ, [API दस्तावेज़](/docs/api) देखें।

##### पैरामीटर्स

- `options`: [WebdriverIO विकल्प](/docs/configuration#webdriverio)
- `modifier`: फ़ंक्शन जो क्लाइंट इंस्टेंस को वापस किए जाने से पहले उसे संशोधित करने की अनुमति देता है

##### रिटर्न करता है

- [Browser](/docs/api/browser) ऑब्जेक्ट

##### उदाहरण

```js
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: { browserName: 'chrome' }
})
```

#### `attach(attachOptions)`

किसी चल रहे WebdriverIO सेशन से जुड़ता है।

##### पैरामीटर्स

- `attachOptions`: वह इंस्टेंस जिससे सेशन जोड़ना है या कम से कम `sessionId` प्रॉपर्टी वाला एक ऑब्जेक्ट (जैसे `{ sessionId: 'xxx' }`)

##### रिटर्न करता है

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

- `multiRemoteOptions`: एक ऑब्जेक्ट जिसकी keys ब्राउज़र के नाम और उनके [WebdriverIO विकल्पों](/docs/configuration#webdriverio) को दर्शाती हैं।

##### रिटर्न करता है

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
// ['Google', 'JSON'] रिटर्न करता है
```

#### `Key`

[`browser.keys`](/docs/api/browser/keys) कमांड के साथ उपयोग के लिए विशेष कैरेक्टर कॉन्स्टेंट्स वाला एक ऑब्जेक्ट। ये कॉन्स्टेंट्स उन विशेष keys को दर्शाते हैं जिन्हें ब्राउज़र को भेजा जा सकता है, जैसे `Enter`, `Tab`, `Escape`, एरो keys, फ़ंक्शन keys, और भी बहुत कुछ।

##### उदाहरण

```js
import { Key } from 'webdriverio'

// Enter key दबाएं
await browser.keys(Key.Enter)

// सब कुछ चुनने के लिए Ctrl+A का उपयोग करें (क्रॉस-प्लेटफ़ॉर्म काम करता है)
await browser.keys([Key.Ctrl, 'a'])

// एरो keys से नेविगेट करें
await browser.keys([Key.ArrowDown, Key.ArrowDown, Key.Enter])
```

##### उपलब्ध Keys

`Key` ऑब्जेक्ट के माध्यम से निम्नलिखित विशेष keys उपलब्ध हैं:

**मॉडिफ़ायर Keys:**

| कॉन्स्टेंट | विवरण |
|----------|-------------|
| `Key.Ctrl` | क्रॉस-प्लेटफ़ॉर्म कंट्रोल key (Mac पर Command, Windows/Linux पर Control) |
| `Key.Control` | Control key |
| `Key.Shift` | Shift key |
| `Key.Alt` | Alt key |
| `Key.Command` | Command key (Mac) |
| `Key.NULL` | Null/रिलीज़ key — वर्तमान में दबाई गई सभी मॉडिफ़ायर keys को रिलीज़ करती है |

**नेविगेशन Keys:**

| कॉन्स्टेंट | विवरण |
|----------|-------------|
| `Key.Cancel` | Cancel key |
| `Key.Help` | Help key |
| `Key.Backspace` | Backspace key |
| `Key.Tab` | Tab key |
| `Key.Clear` | Clear key |
| `Key.Return` | Return key |
| `Key.Enter` | Enter key |
| `Key.Pause` | Pause key |
| `Key.Escape` | Escape key |
| `Key.Space` | Space key |
| `Key.PageUp` | Page Up key |
| `Key.PageDown` | Page Down key |
| `Key.End` | End key |
| `Key.Home` | Home key |
| `Key.ArrowLeft` | Left Arrow key |
| `Key.ArrowUp` | Up Arrow key |
| `Key.ArrowRight` | Right Arrow key |
| `Key.ArrowDown` | Down Arrow key |
| `Key.Insert` | Insert key |
| `Key.Delete` | Delete key |

**कैरेक्टर Keys:**

| कॉन्स्टेंट | विवरण |
|----------|-------------|
| `Key.Semicolon` | Semicolon key |
| `Key.Equals` | Equals key |

**न्यूमपैड Keys:**

| कॉन्स्टेंट | विवरण |
|----------|-------------|
| `Key.Numpad0` - `Key.Numpad9` | Numpad 0-9 |
| `Key.Multiply` | Numpad Multiply |
| `Key.Add` | Numpad Add |
| `Key.Separator` | Numpad Separator |
| `Key.Subtract` | Numpad Subtract |
| `Key.Decimal` | Numpad Decimal |
| `Key.Divide` | Numpad Divide |

**फ़ंक्शन Keys:**

| कॉन्स्टेंट | विवरण |
|----------|-------------|
| `Key.F1` - `Key.F12` | फ़ंक्शन keys F1 से F12 तक |

**अन्य Keys:**

| कॉन्स्टेंट | विवरण |
|----------|-------------|
| `Key.ZenkakuHankaku` | Zenkaku/Hankaku key (जापानी) |

:::info क्रॉस-प्लेटफ़ॉर्म मॉडिफ़ायर Keys

`Key.Ctrl` कॉन्स्टेंट विभिन्न ऑपरेटिंग सिस्टम पर "control" मॉडिफ़ायर का उपयोग करने का एक सुविधाजनक तरीका प्रदान करता है। macOS पर, यह `Command` key से मैप होता है, जबकि Windows और Linux पर यह `Control` key से मैप होता है। यह तब उपयोगी है जब ऐसे टेस्ट लिखे जा रहे हों जिन्हें कई प्लेटफ़ॉर्म पर काम करना हो, जैसे सब कुछ चुनना (`Ctrl+A`), कॉपी (`Ctrl+C`), या पेस्ट (`Ctrl+V`) ऑपरेशन के लिए।

:::

## `@wdio/cli`

`wdio` कमांड को कॉल करने के बजाय, आप टेस्ट रनर को मॉड्यूल के रूप में भी शामिल कर सकते हैं और इसे किसी भी मनचाहे वातावरण में चला सकते हैं। इसके लिए, आपको `@wdio/cli` पैकेज को मॉड्यूल के रूप में require करना होगा, इस तरह:

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

`Launcher` क्लास कंस्ट्रक्टर कॉन्फ़िग फ़ाइल का URL, और सेटिंग्स वाला एक `opts` ऑब्जेक्ट अपेक्षित करता है जो कॉन्फ़िग में मौजूद सेटिंग्स को ओवरराइट करेगा।

##### पैरामीटर्स

- `configPath`: चलाने के लिए `wdio.conf.js` का पाथ
- `opts`: कॉन्फ़िग फ़ाइल के मानों को ओवरराइट करने के लिए आर्गुमेंट्स ([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77))

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

`run` कमांड एक [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) रिटर्न करता है। यह तब resolve होता है जब टेस्ट सफलतापूर्वक चले हों या विफल हुए हों, और यह तब reject होता है जब लॉन्चर टेस्ट चलाना शुरू करने में असमर्थ रहा हो।

## `@wdio/browser-runner`

WebdriverIO के [ब्राउज़र रनर](/docs/runner#browser-runner) का उपयोग करके यूनिट या कंपोनेंट टेस्ट चलाते समय आप अपने टेस्ट के लिए मॉकिंग यूटिलिटीज़ इम्पोर्ट कर सकते हैं, जैसे:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

निम्नलिखित नेम्ड एक्सपोर्ट्स उपलब्ध हैं:

#### `fn`

मॉक फ़ंक्शन, आधिकारिक [Vitest दस्तावेज़](https://vitest.dev/api/mock.html#mock-functions) में और देखें।

#### `spyOn`

स्पाई फ़ंक्शन, आधिकारिक [Vitest दस्तावेज़](https://vitest.dev/api/mock.html#mock-functions) में और देखें।

#### `mock`

फ़ाइल या डिपेंडेंसी मॉड्यूल को मॉक करने की मेथड।

##### पैरामीटर्स

- `moduleName`: मॉक की जाने वाली फ़ाइल का रिलेटिव पाथ या एक मॉड्यूल का नाम।
- `factory`: मॉक की गई वैल्यू रिटर्न करने वाला फ़ंक्शन (वैकल्पिक)

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