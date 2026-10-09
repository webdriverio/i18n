---
id: mocking
title: मॉकिंग
description: "@wdio/browser-runner से fn, spyOn और mock के साथ ब्राउज़र रनर कंपोनेंट टेस्ट में फ़ंक्शन, मॉड्यूल और नेटवर्क अनुरोधों को मॉक करें।"
---

टेस्ट लिखते समय यह केवल समय की बात है कि आपको किसी आंतरिक — या बाहरी — सेवा का "नकली" संस्करण बनाने की आवश्यकता पड़े। इसे आमतौर पर मॉकिंग कहा जाता है। WebdriverIO आपकी सहायता के लिए यूटिलिटी फ़ंक्शन प्रदान करता है। इसे एक्सेस करने के लिए आप `import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'` कर सकते हैं। उपलब्ध मॉकिंग यूटिलिटीज़ के बारे में अधिक जानकारी [API डॉक्स](/docs/api/modules#wdiobrowser-runner) में देखें।

## फ़ंक्शन

यह सत्यापित करने के लिए कि क्या कुछ फ़ंक्शन हैंडलर आपके कंपोनेंट टेस्ट के हिस्से के रूप में कॉल किए गए हैं, `@wdio/browser-runner` मॉड्यूल मॉकिंग प्रिमिटिव्स एक्सपोर्ट करता है जिनका उपयोग आप यह टेस्ट करने के लिए कर सकते हैं कि क्या ये फ़ंक्शन कॉल किए गए हैं। आप इन मेथड्स को इस प्रकार इम्पोर्ट कर सकते हैं:

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

`fn` इम्पोर्ट करके आप एक स्पाई फ़ंक्शन (मॉक) बना सकते हैं जो इसके निष्पादन को ट्रैक करता है, और `spyOn` के साथ पहले से बने ऑब्जेक्ट पर किसी मेथड को ट्रैक कर सकते हैं।

<Tabs
  defaultValue="mocks"
  values={[
    {label: 'Mocks', value: 'mocks'},
    {label: 'Spies', value: 'spies'}
  ]
}>
<TabItem value="mocks">

पूरा उदाहरण [Component Testing Example](https://github.com/webdriverio/component-testing-examples/blob/main/react-typescript-vite/src/tests/LoginForm.test.tsx) रिपॉज़िटरी में पाया जा सकता है।

```ts
import React from 'react'
import { $, expect } from '@wdio/globals'
import { fn } from '@wdio/browser-runner'
import { Key } from 'webdriverio'
import { render } from '@testing-library/react'

import LoginForm from '../components/LoginForm'

describe('LoginForm', () => {
    it('should call onLogin handler if username and password was provided', async () => {
        const onLogin = fn()
        render(<LoginForm onLogin={onLogin} />)
        await $('input[name="username"]').setValue('testuser123')
        await $('input[name="password"]').setValue('s3cret')
        await browser.keys(Key.Enter)

        /**
         * सत्यापित करें कि हैंडलर कॉल किया गया था
         */
        expect(onLogin).toBeCalledTimes(1)
        expect(onLogin).toBeCalledWith(expect.equal({
            username: 'testuser123',
            password: 's3cret'
        }))
    })
})
```

</TabItem>
<TabItem value="spies">

पूरा उदाहरण [examples](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio/browser-runner/lit.test.js) डायरेक्टरी में पाया जा सकता है।

```js
import { expect, $ } from '@wdio/globals'
import { spyOn } from '@wdio/browser-runner'
import { html, render } from 'lit'
import { SimpleGreeting } from './components/LitComponent.ts'

const getQuestionFn = spyOn(SimpleGreeting.prototype, 'getQuestion')

describe('Lit Component testing', () => {
    it('should render component', async () => {
        render(
            html`<simple-greeting name="WebdriverIO" />`,
            document.body
        )

        const innerElem = await $('simple-greeting').$('p')
        expect(await innerElem.getText()).toBe('Hello, WebdriverIO! How are you today?')
    })

    it('should render with mocked component function', async () => {
        getQuestionFn.mockReturnValue('Does this work?')
        render(
            html`<simple-greeting name="WebdriverIO" />`,
            document.body
        )

        const innerElem = await $('simple-greeting').$('p')
        expect(await innerElem.getText()).toBe('Hello, WebdriverIO! Does this work?')
    })
})
```

</TabItem>
</Tabs>

WebdriverIO यहाँ केवल [`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy) को री-एक्सपोर्ट करता है, जो एक हल्का Jest संगत स्पाई इम्प्लीमेंटेशन है और जिसका उपयोग WebdriverIO के [`expect`](/docs/api/expect-webdriverio) मैचर्स के साथ किया जा सकता है। इन मॉक फ़ंक्शन्स पर अधिक दस्तावेज़ीकरण आप [Vitest प्रोजेक्ट पेज](https://vitest.dev/api/mock.html) पर पा सकते हैं।

बेशक, आप कोई अन्य स्पाई फ़्रेमवर्क भी इंस्टॉल और इम्पोर्ट कर सकते हैं, जैसे [SinonJS](https://sinonjs.org/), बशर्ते वह ब्राउज़र एनवायरनमेंट का समर्थन करता हो।

## मॉड्यूल

लोकल मॉड्यूल को मॉक करें या थर्ड-पार्टी लाइब्रेरीज़ का अवलोकन करें, जो किसी अन्य कोड में इनवोक की जाती हैं, जिससे आप आर्गुमेंट्स, आउटपुट का परीक्षण कर सकते हैं या उनके इम्प्लीमेंटेशन को फिर से घोषित भी कर सकते हैं।

फ़ंक्शन्स को मॉक करने के दो तरीके हैं: या तो टेस्ट कोड में उपयोग करने के लिए एक मॉक फ़ंक्शन बनाकर, या किसी मॉड्यूल डिपेंडेंसी को ओवरराइड करने के लिए एक मैनुअल मॉक लिखकर।

### फ़ाइल इम्पोर्ट्स को मॉक करना

मान लीजिए कि हमारा कंपोनेंट क्लिक को हैंडल करने के लिए किसी फ़ाइल से एक यूटिलिटी मेथड इम्पोर्ट कर रहा है।

```js title=utils.js
export function handleClick () {
    // हैंडलर इम्प्लीमेंटेशन
}
```

हमारे कंपोनेंट में क्लिक हैंडलर का उपयोग इस प्रकार किया जाता है:

```ts title=LitComponent.js
import { handleClick } from './utils.js'

@customElement('simple-button')
export class SimpleButton extends LitElement {
    render() {
        return html`<button @click="${handleClick}">Click me!</button>`
    }
}
```

`utils.js` से `handleClick` को मॉक करने के लिए हम अपने टेस्ट में `mock` मेथड का उपयोग इस प्रकार कर सकते हैं:

```js title=LitComponent.test.js
import { expect, $ } from '@wdio/globals'
import { mock, fn } from '@wdio/browser-runner'
import { html, render } from 'lit'

import { SimpleButton } from './LitComponent.ts'
import { handleClick } from './utils.js'

/**
 * `utils.ts` फ़ाइल के नेम्ड एक्सपोर्ट "handleClick" को मॉक करें
 */
mock('./utils.ts', () => ({
    handleClick: fn()
}))

describe('Simple Button Component Test', () => {
    it('call click handler', async () => {
        render(html`<simple-button />`, document.body)
        await $('simple-button').$('button').click()
        expect(handleClick).toHaveBeenCalledTimes(1)
    })
})
```

### डिपेंडेंसीज़ को मॉक करना

मान लीजिए हमारे पास एक क्लास है जो हमारे API से उपयोगकर्ताओं को फ़ेच करती है। यह क्लास API को कॉल करने के लिए [`axios`](https://github.com/axios/axios) का उपयोग करती है और फिर data एट्रिब्यूट लौटाती है जिसमें सभी उपयोगकर्ता होते हैं:

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

अब, वास्तव में API को हिट किए बिना इस मेथड का परीक्षण करने के लिए (और इस प्रकार धीमे और नाज़ुक टेस्ट बनाने से बचने के लिए), हम axios मॉड्यूल को स्वचालित रूप से मॉक करने के लिए `mock(...)` फ़ंक्शन का उपयोग कर सकते हैं।

एक बार जब हम मॉड्यूल को मॉक कर लेते हैं, तो हम `.get` के लिए एक [`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue) प्रदान कर सकते हैं जो वह डेटा लौटाता है जिसके विरुद्ध हम अपने टेस्ट में असर्ट करना चाहते हैं। वास्तव में, हम कह रहे हैं कि हम चाहते हैं कि `axios.get('/users.json')` एक नकली रिस्पॉन्स लौटाए।

```js title=users.test.js
import axios from 'axios'; // परिभाषित मॉक को इम्पोर्ट करता है
import { mock, fn } from '@wdio/browser-runner'

import Users from './users.js'

/**
 * `axios` डिपेंडेंसी के डिफ़ॉल्ट एक्सपोर्ट को मॉक करें
 */
mock('axios', () => ({
    default: {
        get: fn()
    }
}))

describe('User API', () => {
    it('should fetch users', async () => {
        const users = [{name: 'Bob'}]
        const resp = {data: users}
        axios.get.mockResolvedValue(resp)

        // या आप अपने उपयोग के मामले के आधार पर निम्नलिखित का उपयोग कर सकते हैं:
        // axios.get.mockImplementation(() => Promise.resolve(resp))

        const data = await Users.all()
        expect(data).toEqual(users)
    })
})
```

## आंशिक मॉक

किसी मॉड्यूल के उपसमुच्चय को मॉक किया जा सकता है और मॉड्यूल का बाकी हिस्सा अपना वास्तविक इम्प्लीमेंटेशन बनाए रख सकता है:

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

मूल मॉड्यूल मॉक फ़ैक्टरी में पास किया जाएगा, जिसका उपयोग आप उदाहरण के लिए किसी डिपेंडेंसी को आंशिक रूप से मॉक करने के लिए कर सकते हैं:

```js
import { mock, fn } from '@wdio/browser-runner'
import defaultExport, { bar, foo } from './foo-bar-baz.js';

mock('./foo-bar-baz.js', async (originalModule) => {
    // डिफ़ॉल्ट एक्सपोर्ट और नेम्ड एक्सपोर्ट 'foo' को मॉक करें
    // और मूल मॉड्यूल से नेम्ड एक्सपोर्ट को आगे बढ़ाएँ
    return {
        __esModule: true,
        ...originalModule,
        default: fn(() => 'mocked baz'),
        foo: 'mocked foo',
    }
})

describe('partial mock', () => {
    it('should do a partial mock', () => {
        const defaultExportResult = defaultExport();
        expect(defaultExportResult).toBe('mocked baz');
        expect(defaultExport).toHaveBeenCalled();

        expect(foo).toBe('mocked foo');
        expect(bar()).toBe('bar');
    })
})
```

## मैनुअल मॉक

मैनुअल मॉक को `__mocks__/` (`automockDir` विकल्प भी देखें) सबडायरेक्टरी में एक मॉड्यूल लिखकर परिभाषित किया जाता है। यदि आप जिस मॉड्यूल को मॉक कर रहे हैं वह एक Node मॉड्यूल है (जैसे: `lodash`), तो मॉक को `__mocks__` डायरेक्टरी में रखा जाना चाहिए और वह स्वचालित रूप से मॉक हो जाएगा। `mock('module_name')` को स्पष्ट रूप से कॉल करने की कोई आवश्यकता नहीं है।

स्कोप्ड मॉड्यूल (जिन्हें स्कोप्ड पैकेज भी कहा जाता है) को एक ऐसी डायरेक्टरी संरचना में फ़ाइल बनाकर मॉक किया जा सकता है जो स्कोप्ड मॉड्यूल के नाम से मेल खाती हो। उदाहरण के लिए, `@scope/project-name` नामक स्कोप्ड मॉड्यूल को मॉक करने के लिए, `__mocks__/@scope/project-name.js` पर एक फ़ाइल बनाएँ, और उसके अनुसार `@scope/` डायरेक्टरी बनाएँ।

```
.
├── config
├── __mocks__
│   ├── axios.js
│   ├── lodash.js
│   └── @scope
│       └── project-name.js
├── node_modules
└── views
```

जब किसी दिए गए मॉड्यूल के लिए मैनुअल मॉक मौजूद होता है, तो WebdriverIO स्पष्ट रूप से `mock('moduleName')` कॉल करने पर उस मॉड्यूल का उपयोग करेगा। हालाँकि, जब automock को true पर सेट किया जाता है, तो स्वचालित रूप से बनाए गए मॉक के बजाय मैनुअल मॉक इम्प्लीमेंटेशन का उपयोग किया जाएगा, भले ही `mock('moduleName')` कॉल न किया गया हो। इस व्यवहार से बाहर निकलने के लिए आपको उन टेस्ट में स्पष्ट रूप से `unmock('moduleName')` कॉल करना होगा जिन्हें वास्तविक मॉड्यूल इम्प्लीमेंटेशन का उपयोग करना चाहिए, उदाहरण के लिए:

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## होइस्टिंग

ब्राउज़र में मॉकिंग को काम करने के लिए, WebdriverIO टेस्ट फ़ाइलों को फिर से लिखता है और मॉक कॉल्स को बाकी सब चीज़ों से ऊपर होइस्ट करता है (Jest में होइस्टिंग समस्या पर [यह ब्लॉग पोस्ट](https://www.coolcomputerclub.com/posts/jest-hoist-await/) भी देखें)। यह उस तरीके को सीमित करता है जिससे आप मॉक रिज़ॉल्वर में वेरिएबल्स पास कर सकते हैं, उदाहरण के लिए:

```js title=component.test.js
import dep from 'dependency'
const variable = 'foobar'

/**
 * ❌ यह विफल होता है क्योंकि `dep` और `variable` मॉक रिज़ॉल्वर के अंदर परिभाषित नहीं हैं
 */
mock('./some/module.ts', () => ({
    exportA: dep,
    exportB: variable
}))
```

इसे ठीक करने के लिए आपको सभी उपयोग किए गए वेरिएबल्स को रिज़ॉल्वर के अंदर परिभाषित करना होगा, उदाहरण के लिए:

```js title=component.test.js
/**
 * ✔️ यह काम करता है क्योंकि सभी वेरिएबल्स रिज़ॉल्वर के भीतर परिभाषित हैं
 */
mock('./some/module.ts', async () => {
    const dep = await import('dependency')
    const variable = 'foobar'

    return {
        exportA: dep,
        exportB: variable
    }
})
```

## अनुरोध

यदि आप ब्राउज़र अनुरोधों, जैसे API कॉल्स, को मॉक करना चाहते हैं, तो [Request Mock and Spies](/docs/mocksandspies) अनुभाग पर जाएँ।

कंपोनेंट टेस्ट में, `browser.mock()` के लिए एक निश्चित प्रोटोकॉल और होस्टनेम वाले एब्सोल्यूट URL पैटर्न का उपयोग करें, जैसे `https://api.webdriver.io/api/*`। `*/api/*` जैसा होस्ट-रहित पैटर्न पेज के हर अनुरोध को इंटरसेप्ट करता है, जिसमें ब्राउज़र रनर का अपना Vite और ड्राइवर ट्रैफ़िक भी शामिल है।

एकल `*` का उपयोग करें, जो स्लैश से भी मेल खाता है। निश्चित टेक्स्ट से पहले लगातार वाइल्डकार्ड, जैसे `**/api/**` या `**/data.json`, असंबंधित URLs पर अत्यधिक regex बैकट्रैकिंग का कारण बन सकते हैं और किसी टेस्ट को फ़्रीज़ कर सकते हैं। [issue #13548](https://github.com/webdriverio/webdriverio/issues/13548), [issue #15739](https://github.com/webdriverio/webdriverio/issues/15739), और [URL वाइल्डकार्ड चेतावनी](/docs/mocksandspies#creating-a-mock) देखें।