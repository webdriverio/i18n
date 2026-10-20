---
id: mocking
title: المحاكاة (Mocking)
description: "محاكاة الدوال والوحدات وطلبات الشبكة في اختبارات المكونات باستخدام browser runner عبر fn وspyOn وmock من @wdio/browser-runner."
---

عند كتابة الاختبارات، إنها مسألة وقت فقط قبل أن تحتاج إلى إنشاء نسخة "مزيفة" من خدمة داخلية — أو خارجية —. ويُشار إلى ذلك عادةً بالمحاكاة (mocking). يوفر WebdriverIO دوال مساعدة لمساعدتك في ذلك. يمكنك استخدام `import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'` للوصول إليها. اطلع على مزيد من المعلومات حول أدوات المحاكاة المتاحة في [وثائق API](/docs/api/modules#wdiobrowser-runner).

## الدوال

من أجل التحقق مما إذا كانت معالجات دوال معينة تُستدعى كجزء من اختبارات المكونات الخاصة بك، تُصدِّر وحدة `@wdio/browser-runner` أدوات محاكاة أساسية يمكنك استخدامها لاختبار ما إذا كانت هذه الدوال قد استُدعيت. يمكنك استيراد هذه الطرق عبر:

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

من خلال استيراد `fn` يمكنك إنشاء دالة تجسس (mock) لتتبع تنفيذها، ومن خلال `spyOn` يمكنك تتبع طريقة على كائن تم إنشاؤه مسبقًا.

<Tabs
  defaultValue="mocks"
  values={[
    {label: 'Mocks', value: 'mocks'},
    {label: 'Spies', value: 'spies'}
  ]
}>
<TabItem value="mocks">

يمكن العثور على المثال الكامل في مستودع [Component Testing Example](https://github.com/webdriverio/component-testing-examples/blob/main/react-typescript-vite/src/tests/LoginForm.test.tsx).

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
         * التحقق من أن المعالج قد تم استدعاؤه
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

يمكن العثور على المثال الكامل في مجلد [examples](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio/browser-runner/lit.test.js).

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

يقوم WebdriverIO هنا فقط بإعادة تصدير [`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy) وهو تطبيق تجسس خفيف الوزن ومتوافق مع Jest يمكن استخدامه مع مطابقات [`expect`](/docs/api/expect-webdriverio) الخاصة بـ WebdriverIO. يمكنك العثور على مزيد من الوثائق حول دوال المحاكاة هذه على [صفحة مشروع Vitest](https://vitest.dev/api/mock.html).

بالطبع، يمكنك أيضًا تثبيت واستيراد أي إطار تجسس آخر، مثل [SinonJS](https://sinonjs.org/)، طالما أنه يدعم بيئة المتصفح.

## الوحدات

قم بمحاكاة الوحدات المحلية أو راقب مكتبات الطرف الثالث التي يتم استدعاؤها في شيفرة أخرى، مما يتيح لك اختبار الوسائط أو المخرجات أو حتى إعادة تعريف تنفيذها.

هناك طريقتان لمحاكاة الدوال: إما بإنشاء دالة محاكاة لاستخدامها في شيفرة الاختبار، أو بكتابة محاكاة يدوية لتجاوز اعتمادية وحدة ما.

### محاكاة استيراد الملفات

لنتخيل أن المكون الخاص بنا يستورد طريقة مساعدة من ملف للتعامل مع النقر.

```js title=utils.js
export function handleClick () {
    // تنفيذ المعالج
}
```

في المكون الخاص بنا، يُستخدم معالج النقر على النحو التالي:

```ts title=LitComponent.js
import { handleClick } from './utils.js'

@customElement('simple-button')
export class SimpleButton extends LitElement {
    render() {
        return html`<button @click="${handleClick}">Click me!</button>`
    }
}
```

لمحاكاة `handleClick` من `utils.js` يمكننا استخدام طريقة `mock` في اختبارنا على النحو التالي:

```js title=LitComponent.test.js
import { expect, $ } from '@wdio/globals'
import { mock, fn } from '@wdio/browser-runner'
import { html, render } from 'lit'

import { SimpleButton } from './LitComponent.ts'
import { handleClick } from './utils.js'

/**
 * محاكاة التصدير المسمى "handleClick" من ملف `utils.ts`
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

### محاكاة الاعتماديات

لنفترض أن لدينا فئة تجلب المستخدمين من واجهة API الخاصة بنا. تستخدم الفئة [`axios`](https://github.com/axios/axios) لاستدعاء API ثم تُرجع سمة data التي تحتوي على جميع المستخدمين:

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

الآن، من أجل اختبار هذه الطريقة دون الوصول فعليًا إلى API (وبالتالي إنشاء اختبارات بطيئة وهشة)، يمكننا استخدام الدالة `mock(...)` لمحاكاة وحدة axios تلقائيًا.

بمجرد محاكاة الوحدة، يمكننا توفير [`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue) لـ `.get` يُرجع البيانات التي نريد أن يتحقق منها اختبارنا. في الواقع، نحن نقول إننا نريد أن يُرجع `axios.get('/users.json')` استجابة مزيفة.

```js title=users.test.js
import axios from 'axios'; // يستورد المحاكاة المعرّفة
import { mock, fn } from '@wdio/browser-runner'

import Users from './users.js'

/**
 * محاكاة التصدير الافتراضي لاعتمادية `axios`
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

        // أو يمكنك استخدام ما يلي حسب حالة الاستخدام الخاصة بك:
        // axios.get.mockImplementation(() => Promise.resolve(resp))

        const data = await Users.all()
        expect(data).toEqual(users)
    })
})
```

## المحاكاة الجزئية

يمكن محاكاة أجزاء من وحدة ما مع احتفاظ بقية الوحدة بتنفيذها الفعلي:

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

سيتم تمرير الوحدة الأصلية إلى مصنع المحاكاة الذي يمكنك استخدامه، على سبيل المثال، لمحاكاة اعتمادية جزئيًا:

```js
import { mock, fn } from '@wdio/browser-runner'
import defaultExport, { bar, foo } from './foo-bar-baz.js';

mock('./foo-bar-baz.js', async (originalModule) => {
    // محاكاة التصدير الافتراضي والتصدير المسمى 'foo'
    // وتمرير التصدير المسمى من الوحدة الأصلية
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

تُعرَّف المحاكاة اليدوية عن طريق كتابة وحدة في مجلد فرعي `__mocks__/` (انظر أيضًا خيار `automockDir`). إذا كانت الوحدة التي تحاكيها وحدة Node (مثل: `lodash`)، فيجب وضع المحاكاة في مجلد `__mocks__` وستتم محاكاتها تلقائيًا. لا حاجة لاستدعاء `mock('module_name')` بشكل صريح.

يمكن محاكاة الوحدات ذات النطاق (المعروفة أيضًا بالحزم ذات النطاق) عن طريق إنشاء ملف في بنية مجلدات تطابق اسم الوحدة ذات النطاق. على سبيل المثال، لمحاكاة وحدة ذات نطاق تسمى `@scope/project-name`، أنشئ ملفًا في `__mocks__/@scope/project-name.js`، مع إنشاء مجلد `@scope/` وفقًا لذلك.

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

عند وجود محاكاة يدوية لوحدة معينة، سيستخدم WebdriverIO تلك الوحدة عند استدعاء `mock('moduleName')` بشكل صريح. ومع ذلك، عند تعيين automock إلى true، سيتم استخدام تنفيذ المحاكاة اليدوية بدلاً من المحاكاة المنشأة تلقائيًا، حتى لو لم يتم استدعاء `mock('moduleName')`. لإلغاء هذا السلوك، ستحتاج إلى استدعاء `unmock('moduleName')` بشكل صريح في الاختبارات التي يجب أن تستخدم التنفيذ الفعلي للوحدة، على سبيل المثال:

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## الرفع (Hoisting)

لكي تعمل المحاكاة في المتصفح، يعيد WebdriverIO كتابة ملفات الاختبار ويرفع استدعاءات المحاكاة فوق كل شيء آخر (انظر أيضًا [منشور المدونة هذا](https://www.coolcomputerclub.com/posts/jest-hoist-await/) حول مشكلة الرفع في Jest). يحد هذا من طريقة تمرير المتغيرات إلى محلل المحاكاة، على سبيل المثال:

```js title=component.test.js
import dep from 'dependency'
const variable = 'foobar'

/**
 * ❌ هذا يفشل لأن `dep` و`variable` غير معرّفين داخل محلل المحاكاة
 */
mock('./some/module.ts', () => ({
    exportA: dep,
    exportB: variable
}))
```

لإصلاح ذلك، يجب عليك تعريف جميع المتغيرات المستخدمة داخل المحلل، على سبيل المثال:

```js title=component.test.js
/**
 * ✔️ هذا يعمل لأن جميع المتغيرات معرّفة داخل المحلل
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

إذا كنت تبحث عن محاكاة طلبات المتصفح، مثل استدعاءات API، فانتقل إلى قسم [محاكاة الطلبات والتجسس عليها](/docs/mocksandspies).

في اختبارات المكونات، استخدم نمط URL مطلقًا ببروتوكول واسم مضيف ثابتين مع `browser.mock()`، مثل `https://api.webdriver.io/api/*`. فالنمط الذي لا يحتوي على مضيف مثل `*/api/*` يعترض كل طلب في الصفحة، بما في ذلك حركة مرور Vite وبرنامج التشغيل الخاصة بـ browser runner نفسه.

تطابق علامة `*` المفردة الشرطات المائلة أيضًا. في نمط نصي، يكون `**` مماثلاً لـ `*`؛ أما في كائن `URLPattern`، فاستخدم `*` مفردة. انظر [إنشاء محاكاة](/docs/mocksandspies#creating-a-mock).