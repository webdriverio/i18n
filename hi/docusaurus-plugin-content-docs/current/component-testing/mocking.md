---
id: mocking
title: मॉकिंग
---

जब टेस्ट लिखते हैं तो ऐसा समय आता है जब आपको आंतरिक — या बाहरी — सेवा का एक "नकली" संस्करण बनाने की आवश्यकता होती है। इसे आमतौर पर मॉकिंग कहा जाता है। WebdriverIO आपकी मदद के लिए उपयोगिता फ़ंक्शन प्रदान करता है। आप इसका उपयोग करने के लिए `import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'` आयात कर सकते हैं। उपलब्ध मॉकिंग उपयोगिताओं के बारे में अधिक जानकारी [API डॉक्स](/docs/api/modules#wdiobrowser-runner) में देखें।

## फ़ंक्शन्स

अपने कंपोनेंट टेस्ट के हिस्से के रूप में निश्चित फ़ंक्शन हैंडलर्स को कॉल किए जाने की पुष्टि करने के लिए, `@wdio/browser-runner` मॉड्यूल मॉकिंग प्रिमिटिव्स निर्यात करता है जिन्हें आप यह परीक्षण करने के लिए उपयोग कर सकते हैं कि इन फ़ंक्शन्स को कॉल किया गया है या नहीं। आप इन मेथड्स को निम्न तरीके से आयात कर सकते हैं:

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

`fn` को आयात करके आप एक स्पाई फ़ंक्शन (मॉक) बना सकते हैं ताकि उसके निष्पादन को ट्रैक किया जा सके और `spyOn` के साथ पहले से बनाए गए ऑब्जेक्ट पर मेथड को ट्रैक किया जा सके।

<Tabs
  defaultValue="mocks"
  values={[
    {label: 'Mocks', value: 'mocks'},
    {label: 'Spies', value: 'spies'}
  ]
}>
<TabItem value="mocks">

पूरा उदाहरण [Component Testing Example](https://github.com/webdriverio/component-testing-examples/blob/main/react-typescript-vite/src/tests/LoginForm.test.tsx) रिपॉजिटरी में पाया जा सकता है।

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
         * verify the handler was called
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

WebdriverIO यहां केवल [`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy) को पुनः निर्यात करता है, जो एक हल्का Jest संगत स्पाई कार्यान्वयन है जिसे WebdriverIO के [`expect`](/docs/api/expect-webdriverio) मैचर्स के साथ उपयोग किया जा सकता है। आप इन मॉक फ़ंक्शन्स पर अधिक दस्तावेज़ीकरण [Vitest प्रोजेक्ट पेज](https://vitest.dev/api/mock.html) पर पा सकते हैं।

बेशक, आप किसी अन्य स्पाई फ्रेमवर्क, जैसे [SinonJS](https://sinonjs.org/) को भी स्थापित और आयात कर सकते हैं, जब तक कि वह ब्राउज़र वातावरण का समर्थन करता है।

## मॉड्यूल्स

लोकल मॉड्यूल्स को मॉक करें या थर्ड-पार्टी-लाइब्रेरीज़ का निरीक्षण करें, जो किसी अन्य कोड में उपयोग की जाती हैं, जिससे आप आर्गुमेंट्स, आउटपुट या यहां तक कि उनके कार्यान्वयन को फिर से परिभाषित कर सकते हैं।

फ़ंक्शन्स को मॉक करने के दो तरीके हैं: या तो टेस्ट कोड में उपयोग करने के लिए एक मॉक फ़ंक्शन बनाकर, या मॉड्यूल निर्भरता को ओवरराइड करने के लिए मैन्युअल मॉक लिखकर।

### फाइल इम्पोर्ट्स को मॉक करना

कल्पना करें कि हमारा कंपोनेंट क्लिक को संभालने के लिए एक फाइल से उपयोगिता विधि आयात कर रहा है।

```js title=utils.js
export function handleClick () {
    // handler implementation
}
```

हमारे कंपोनेंट में क्लिक हैंडलर का उपयोग निम्नानुसार किया जाता है:

```ts title=LitComponent.js
import { handleClick } from './utils.js'

@customElement('simple-button')
export class SimpleButton extends LitElement {
    render() {
        return html`<button @click="${handleClick}">Click me!</button>`
    }
}
```

`utils.js` से `handleClick` को मॉक करने के लिए हम अपने टेस्ट में `mock` मेथड का उपयोग निम्नानुसार कर सकते हैं:

```js title=LitComponent.test.js
import { expect, $ } from '@wdio/globals'
import { mock, fn } from '@wdio/browser-runner'
import { html, render } from 'lit'

import { SimpleButton } from './LitComponent.ts'
import { handleClick } from './utils.js'

/**
 * mock named export "handleClick" of `utils.ts` file
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

मान लीजिए हमारे पास एक क्लास है जो हमारे API से उपयोगकर्ताओं को प्राप्त करती है। क्लास API को कॉल करने के लिए [`axios`](https://github.com/axios/axios) का उपयोग करती है, फिर डेटा एट्रिब्यूट को वापस करती है जिसमें सभी उपयोगकर्ता होते हैं:

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

अब, इस मेथड का परीक्षण करने के लिए बिना वास्तव में API से संपर्क किए (और इस प्रकार धीमे और नाजुक टेस्ट बनाए), हम axios मॉड्यूल को स्वचालित रूप से मॉक करने के लिए `mock(...)` फ़ंक्शन का उपयोग कर सकते हैं।

एक बार जब हम मॉड्यूल को मॉक कर लेते हैं, तो हम `.get` के लिए एक [`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue) प्रदान कर सकते हैं जो वह डेटा वापस करता है जिसके खिलाफ हमारा परीक्षण सत्यापित करना चाहता है। प्रभावी रूप से, हम कह रहे हैं कि हम चाहते हैं कि `axios.get('/users.json')` एक नकली प्रतिक्रिया वापस करे।

```js title=users.test.js
import axios from 'axios'; // imports defined mock
import { mock, fn } from '@wdio/browser-runner'

import Users from './users.js'

/**
 * mock default export of `axios` dependency
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

        // or you could use the following depending on your use case:
        // axios.get.mockImplementation(() => Promise.resolve(resp))

        const data = await Users.all()
        expect(data).toEqual(users)
    })
})
```

## पार्शियल्स

मॉड्यूल के सबसेट्स को मॉक किया जा सकता है और बाकी मॉड्यूल अपने वास्तविक कार्यान्वयन को बनाए रख सकते हैं:

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

मूल मॉड्यूल को मॉक फैक्टरी में पास किया जाएगा जिसका उपयोग आप आंशिक रूप से निर्भरता का मॉक बनाने के लिए कर सकते हैं:

```js
import { mock, fn } from '@wdio/browser-runner'
import defaultExport, { bar, foo } from './foo-bar-baz.js';

mock('./foo-bar-baz.js', async (originalModule) => {
    // Mock the default export and named export 'foo'
    // and propagate named export from the original module
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

## मैनुअल मॉक्स

मैनुअल मॉक्स को `__mocks__/` (देखें `automockDir` विकल्प) सबडायरेक्टरी में एक मॉड्यूल लिखकर परिभाषित किया जाता है। यदि आप जिस मॉड्यूल को मॉक कर रहे हैं वह एक Node मॉड्यूल है (जैसे: `lodash`), तो मॉक को `__mocks__` डायरेक्टरी में रखा जाना चाहिए और यह स्वचालित रूप से मॉक किया जाएगा। `mock('module_name')` को स्पष्ट रूप से कॉल करने की कोई आवश्यकता नहीं है।

स्कोप्ड मॉड्यूल्स (जिन्हें स्कोप्ड पैकेज के रूप में भी जाना जाता है) को एक डायरेक्टरी स्ट्रक्चर में फाइल बनाकर मॉक किया जा सकता है जो स्कोप्ड मॉड्यूल के नाम से मेल खाता है। उदाहरण के लिए, `@scope/project-name` नामक स्कोप्ड मॉड्यूल को मॉक करने के लिए, `__mocks__/@scope/project-name.js` पर एक फाइल बनाएं, जिसमें `@scope/` डायरेक्टरी तदनुसार बनाई गई हो।

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

जब किसी दिए गए मॉड्यूल के लिए एक मैनुअल मॉक मौजूद होता है, तो WebdriverIO स्पष्ट रूप से `mock('moduleName')` कॉल करते समय उस मॉड्यूल का उपयोग करेगा। हालांकि, जब automock को true पर सेट किया जाता है, तो स्वचालित रूप से बनाए गए मॉक के बजाय मैनुअल मॉक कार्यान्वयन का उपयोग किया जाएगा, भले ही `mock('moduleName')` कॉल न किया गया हो। इस व्यवहार से बाहर निकलने के लिए आपको उन परीक्षणों में स्पष्ट रूप से `unmock('moduleName')` कॉल करना होगा जिन्हें वास्तविक मॉड्यूल कार्यान्वयन का उपयोग करना चाहिए, उदाहरण के लिए:

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## हॉइस्टिंग

ब्राउज़र में मॉकिंग को काम करने के लिए, WebdriverIO टेस्ट फाइलों को पुनर्लिखित करता है और मॉक कॉल्स को सब कुछ के ऊपर होइस्ट करता है (Jest में होइस्टिंग समस्या पर [इस ब्लॉग पोस्ट](https://www.coolcomputerclub.com/posts/jest-hoist-await/) भी देखें)। यह मॉक रिज़ॉल्वर में वेरिएबल्स पास करने के तरीके को सीमित करता है, उदाहरण के लिए:

```js title=component.test.js
import dep from 'dependency'
const variable = 'foobar'

/**
 * ❌ this fails as `dep` and `variable` are not defined inside the mock resolver
 */
mock('./some/module.ts', () => ({
    exportA: dep,
    exportB: variable
}))
```

इसे ठीक करने के लिए आपको रिज़ॉल्वर के अंदर सभी उपयोग किए गए वेरिएबल्स को परिभाषित करना होगा, उदाहरण के लिए:

```js title=component.test.js
/**
 * ✔️ this works as all variables are defined within the resolver
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

## रिक्वेस्ट्स

यदि आप ब्राउज़र रिक्वेस्ट्स, जैसे API कॉल्स, को मॉक करने की तलाश में हैं, तो [Request Mock and Spies](/docs/mocksandspies) सेक्शन पर जाएं।