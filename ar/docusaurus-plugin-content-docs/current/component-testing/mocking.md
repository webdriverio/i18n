---
id: mocking
title: المحاكاة (Mocking)
description: "محاكاة الدوال والوحدات وطلبات الشبكة في اختبارات المكونات باستخدام مشغل المتصفح عبر fn وspyOn وmock من @wdio/browser-runner."
---

عند كتابة الاختبارات، فإنها مسألة وقت فقط قبل أن تحتاج إلى إنشاء نسخة "مزيفة" من خدمة داخلية — أو خارجية. يُشار إلى هذا عادةً باسم المحاكاة (mocking). يوفر WebdriverIO دوال مساعدة لمساعدتك في ذلك. يمكنك استخدام `import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'` للوصول إليها. اطلع على مزيد من المعلومات حول أدوات المحاكاة المتاحة في [وثائق API](/docs/api/modules#wdiobrowser-runner).

## الدوال

من أجل التحقق مما إذا كانت معالجات دوال معينة تُستدعى كجزء من اختبارات المكونات الخاصة بك، تُصدِّر وحدة `@wdio/browser-runner` أدوات محاكاة أساسية يمكنك استخدامها لاختبار ما إذا كانت هذه الدوال قد استُدعيت. يمكنك استيراد هذه الطرق عبر:

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

باستيراد `fn` يمكنك إنشاء دالة تجسس (mock) لتتبع تنفيذها، وباستخدام `spyOn` يمكنك تتبع طريقة على كائن تم إنشاؤه مسبقًا.

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

يمكن العثور على المثال الكامل في مجلد [الأمثلة](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio/browser-runner/lit.test.js).

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

يقوم WebdriverIO هنا فقط بإعادة تصدير [`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy) وهو تطبيق تجسس خفيف الوزن متوافق مع Jest ويمكن استخدامه مع مُطابِقات [`expect`](/docs/api/expect-webdriverio) الخاصة بـ WebdriverIO. يمكنك العثور على مزيد من الوثائق حول دوال المحاكاة هذه في [صفحة مشروع Vitest](https://vitest.dev/api/mock.html).

بالطبع، يمكنك أيضًا تثبيت واستيراد أي إطار تجسس آخر، مثل [SinonJS](https://sinonjs.org/)، طالما أنه يدعم بيئة المتصفح.

## الوحدات

قم بمحاكاة الوحدات المحلية أو مراقبة مكتبات الطرف الثالث التي يتم استدعاؤها في كود آخر، مما يتيح لك اختبار الوسائط أو المخرجات أو حتى إعادة تعريف تطبيقها.

هناك طريقتان لمحاكاة الدوال: إما بإنشاء دالة محاكاة لاستخدامها في كود الاختبار، أو بكتابة محاكاة يدوية لتجاوز اعتمادية وحدة ما.

### محاكاة استيراد الملفات

لنتخيل أن المكون الخاص بنا يستورد طريقة مساعدة من ملف للتعامل مع النقر.

```js title=utils.js
export function handleClick () {
    // تطبيق المعالج
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

لنفترض أن لدينا فئة (class) تجلب المستخدمين من واجهة API الخاصة بنا. تستخدم الفئة [`axios`](https://github.com/axios/axios) لاستدعاء الواجهة ثم تُعيد سمة data التي تحتوي على جميع المستخدمين:

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

الآن، من أجل اختبار هذه الطريقة دون الاتصال الفعلي بالواجهة (وبالتالي إنشاء اختبارات بطيئة وهشة)، يمكننا استخدام الدالة `mock(...)` لمحاكاة وحدة axios تلقائيًا.

بمجرد محاكاة الوحدة، يمكننا توفير [`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue) لـ `.get` تُعيد البيانات التي نريد أن يتحقق منها اختبارنا. في الواقع، نحن نقول إننا نريد من `axios.get('/users.json')` أن تُعيد استجابة مزيفة.

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

يمكن محاكاة أجزاء من وحدة ما بينما يحتفظ باقي الوحدة بتطبيقه الفعلي:

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

سيتم تمرير الوحدة الأصلية إلى مصنع المحاكاة (mock factory) والذي يمكنك استخدامه، على سبيل المثال، لمحاكاة اعتمادية جزئيًا:

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

تُعرَّف المحاكاة اليدوية بكتابة وحدة في مجلد فرعي `__mocks__/` (انظر أيضًا خيار `automockDir`). إذا كانت الوحدة التي تحاكيها وحدة Node (مثل: `lodash`)، فيجب وضع المحاكاة في مجلد `__mocks__` وستتم محاكاتها تلقائيًا. لا حاجة لاستدعاء `mock('module_name')` بشكل صريح.

يمكن محاكاة الوحدات ذات النطاق (المعروفة أيضًا باسم الحزم ذات النطاق - scoped packages) عن طريق إنشاء ملف في بنية مجلدات تطابق اسم الوحدة ذات النطاق. على سبيل المثال، لمحاكاة وحدة ذات نطاق تسمى `@scope/project-name`، أنشئ ملفًا في `__mocks__/@scope/project-name.js`، مع إنشاء مجلد `@scope/` وفقًا لذلك.

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

عند وجود محاكاة يدوية لوحدة معينة، سيستخدم WebdriverIO تلك الوحدة عند استدعاء `mock('moduleName')` بشكل صريح. ومع ذلك، عند تعيين automock إلى true، سيتم استخدام تطبيق المحاكاة اليدوية بدلاً من المحاكاة المُنشأة تلقائيًا، حتى لو لم يتم استدعاء `mock('moduleName')`. لإلغاء هذا السلوك، ستحتاج إلى استدعاء `unmock('moduleName')` بشكل صريح في الاختبارات التي يجب أن تستخدم التطبيق الفعلي للوحدة، على سبيل المثال:

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## الرفع (Hoisting)

لكي تعمل المحاكاة في المتصفح، يعيد WebdriverIO كتابة ملفات الاختبار ويرفع استدعاءات المحاكاة فوق كل شيء آخر (انظر أيضًا [منشور المدونة هذا](https://www.coolcomputerclub.com/posts/jest-hoist-await/) حول مشكلة الرفع في Jest). هذا يحد من الطريقة التي يمكنك بها تمرير المتغيرات إلى محلّل المحاكاة (mock resolver)، على سبيل المثال:

```js title=component.test.js
import dep from 'dependency'
const variable = 'foobar'

/**
 * ❌ هذا يفشل لأن `dep` و `variable` غير معرّفين داخل محلّل المحاكاة
 */
mock('./some/module.ts', () => ({
    exportA: dep,
    exportB: variable
}))
```

لإصلاح ذلك، يجب عليك تعريف جميع المتغيرات المستخدمة داخل المحلّل، على سبيل المثال:

```js title=component.test.js
/**
 * ✔️ هذا يعمل لأن جميع المتغيرات معرّفة داخل المحلّل
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

إذا كنت تبحث عن محاكاة طلبات المتصفح، مثل استدعاءات API، فتوجه إلى قسم [محاكاة الطلبات والتجسس عليها](/docs/mocksandspies).

في اختبارات المكونات، استخدم نمط URL مطلقًا ذا بروتوكول واسم مضيف ثابتين مع `browser.mock()`، مثل `https://api.webdriver.io/api/*`. إن النمط الذي لا يحتوي على مضيف مثل `*/api/*` يعترض كل طلبات الصفحة، بما في ذلك حركة مرور Vite والمشغّل (driver) الخاصة بمشغل المتصفح نفسه.

استخدم `*` واحدة، والتي تطابق الشرطات المائلة أيضًا. يمكن لأحرف البدل المتتالية قبل نص ثابت، مثل `**/api/**` أو `**/data.json`، أن تسبب تراجعًا مفرطًا (backtracking) في التعبيرات النمطية على عناوين URL غير ذات صلة وتؤدي إلى تجميد الاختبار. راجع [issue #13548](https://github.com/webdriverio/webdriverio/issues/13548) و[issue #15739](https://github.com/webdriverio/webdriverio/issues/15739) و[تحذير أحرف البدل في URL](/docs/mocksandspies#creating-a-mock).