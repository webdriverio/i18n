---
id: mocking
title: المحاكاة
---

عند كتابة الاختبارات، فإنه مسألة وقت فقط قبل أن تحتاج إلى إنشاء نسخة "مزيفة" من خدمة داخلية — أو خارجية. غالباً ما يشار إلى هذا باسم المحاكاة (mocking). يوفر WebdriverIO وظائف مساعدة لمساعدتك. يمكنك استيراد هذه الدوال `import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'` للوصول إليها. راجع مزيداً من المعلومات حول أدوات المحاكاة المتاحة في [وثائق واجهة برمجة التطبيقات](/docs/api/modules#wdiobrowser-runner).

## الدوال

من أجل التحقق مما إذا كانت بعض معالجات الوظائف قد تم استدعاؤها كجزء من اختبارات المكونات الخاصة بك، تصدر وحدة `@wdio/browser-runner` أدوات أساسية للمحاكاة يمكنك استخدامها لاختبار ما إذا كانت هذه الدوال قد تم استدعاؤها. يمكنك استيراد هذه الطرق عبر:

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

من خلال استيراد `fn` يمكنك إنشاء دالة تجسس (محاكاة) لتتبع تنفيذها، ومع `spyOn` تتبع طريقة على كائن تم إنشاؤه بالفعل.

<Tabs
  defaultValue="mocks"
  values={[
    {label: 'Mocks', value: 'mocks'},
    {label: 'Spies', value: 'spies'}
  ]
}>
<TabItem value="mocks">

يمكن العثور على المثال الكامل في مستودع [مثال اختبار المكونات](https://github.com/webdriverio/component-testing-examples/blob/main/react-typescript-vite/src/tests/LoginForm.test.tsx).

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

يمكن العثور على المثال الكامل في دليل [الأمثلة](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio/browser-runner/lit.test.js).

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

يعيد WebdriverIO تصدير [`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy) هنا، وهو تنفيذ خفيف للتجسس متوافق مع Jest يمكن استخدامه مع مطابقات [`expect`](/docs/api/expect-webdriverio) الخاصة بـ WebdriverIO. يمكنك العثور على مزيد من الوثائق حول دوال المحاكاة هذه على [صفحة مشروع Vitest](https://vitest.dev/api/mock.html).

بالطبع، يمكنك أيضاً تثبيت واستيراد أي إطار عمل آخر للتجسس، على سبيل المثال [SinonJS](https://sinonjs.org/)، طالما أنه يدعم بيئة المتصفح.

## الوحدات

قم بمحاكاة الوحدات المحلية أو مراقبة مكتبات الطرف الثالث، التي يتم استدعاؤها في بعض الشفرات الأخرى، مما يسمح لك باختبار الوسائط، المخرجات أو حتى إعادة تعريف تنفيذها.

هناك طريقتان لمحاكاة الدوال: إما بإنشاء دالة محاكاة لاستخدامها في كود الاختبار، أو كتابة محاكاة يدوية لتجاوز اعتمادية الوحدة.

### محاكاة استيرادات الملفات

لنتخيل أن مكوننا يستورد طريقة مساعدة من ملف للتعامل مع النقر.

```js title=utils.js
export function handleClick () {
    // handler implementation
}
```

في مكوننا يتم استخدام معالج النقر كالتالي:

```ts title=LitComponent.js
import { handleClick } from './utils.js'

@customElement('simple-button')
export class SimpleButton extends LitElement {
    render() {
        return html`<button @click="${handleClick}">Click me!</button>`
    }
}
```

لمحاكاة `handleClick` من `utils.js` يمكننا استخدام طريقة `mock` في اختبارنا كالتالي:

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

### محاكاة التبعيات

لنفترض أن لدينا فئة تجلب المستخدمين من واجهة برمجة التطبيقات الخاصة بنا. تستخدم الفئة [`axios`](https://github.com/axios/axios) لاستدعاء واجهة برمجة التطبيقات ثم تعيد سمة البيانات التي تحتوي على جميع المستخدمين:

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

الآن، من أجل اختبار هذه الطريقة دون الوصول فعلياً إلى واجهة برمجة التطبيقات (وبالتالي إنشاء اختبارات بطيئة وهشة)، يمكننا استخدام الدالة `mock(...)` لمحاكاة وحدة axios تلقائياً.

بمجرد محاكاة الوحدة، يمكننا توفير [`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue) لـ `.get` التي تعيد البيانات التي نريد أن يؤكد اختبارنا عليها. في الواقع، نحن نقول أننا نريد أن يعيد `axios.get('/users.json')` استجابة مزيفة.

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

## الأجزاء

يمكن محاكاة مجموعات فرعية من وحدة ويمكن للباقي من الوحدة الاحتفاظ بتنفيذها الفعلي:

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

سيتم تمرير الوحدة الأصلية إلى مصنع المحاكاة الذي يمكنك استخدامه على سبيل المثال لمحاكاة جزء من التبعية:

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

## المحاكاة اليدوية

يتم تعريف المحاكاة اليدوية عن طريق كتابة وحدة في دليل فرعي `__mocks__/` (انظر أيضاً خيار `automockDir`). إذا كانت الوحدة التي تقوم بمحاكاتها هي وحدة Node (مثل: `lodash`)، فيجب وضع المحاكاة في دليل `__mocks__` وسيتم محاكاتها تلقائياً. ليست هناك حاجة لاستدعاء `mock('module_name')` بشكل صريح.

يمكن محاكاة الوحدات النطاقية (المعروفة أيضاً باسم الحزم ذات النطاق) عن طريق إنشاء ملف في هيكل دليل يطابق اسم الوحدة النطاقية. على سبيل المثال، لمحاكاة وحدة نطاقية تسمى `@scope/project-name`، قم بإنشاء ملف في `__mocks__/@scope/project-name.js`، مع إنشاء دليل `@scope/` وفقاً لذلك.

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

عندما توجد محاكاة يدوية لوحدة معينة، سيستخدم WebdriverIO هذه الوحدة عند استدعاء `mock('moduleName')` بشكل صريح. ومع ذلك، عندما يتم تعيين automock إلى true، سيتم استخدام تنفيذ المحاكاة اليدوية بدلاً من المحاكاة التي تم إنشاؤها تلقائياً، حتى إذا لم يتم استدعاء `mock('moduleName')`. للخروج من هذا السلوك ستحتاج إلى استدعاء `unmock('moduleName')` بشكل صريح في الاختبارات التي يجب أن تستخدم تنفيذ الوحدة الفعلي، على سبيل المثال:

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## الرفع

من أجل جعل المحاكاة تعمل في المتصفح، يعيد WebdriverIO كتابة ملفات الاختبار ويرفع استدعاءات المحاكاة فوق كل شيء آخر (انظر أيضاً [هذا المنشور](https://www.coolcomputerclub.com/posts/jest-hoist-await/) حول مشكلة الرفع في Jest). هذا يحد من الطريقة التي يمكنك بها تمرير المتغيرات إلى محلل المحاكاة، على سبيل المثال:

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

لإصلاح هذا، عليك تعريف جميع المتغيرات المستخدمة داخل المحلل، على سبيل المثال:

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

## الطلبات

إذا كنت تبحث عن محاكاة طلبات المتصفح، مثل استدعاءات واجهة برمجة التطبيقات، فانتقل إلى قسم [محاكاة الطلبات والتجسس](/docs/mocksandspies).