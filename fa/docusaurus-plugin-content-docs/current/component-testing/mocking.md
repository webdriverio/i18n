---
id: mocking
title: ماک کردن
description: "ماک کردن توابع، ماژول‌ها و درخواست‌های شبکه در تست‌های کامپوننت browser runner با استفاده از fn، spyOn و mock از @wdio/browser-runner."
---

هنگام نوشتن تست‌ها، دیر یا زود نیاز پیدا می‌کنید که یک نسخه «جعلی» از یک سرویس داخلی — یا خارجی — ایجاد کنید. این کار معمولاً ماک کردن (mocking) نامیده می‌شود. WebdriverIO توابع کمکی برای این کار فراهم می‌کند. برای دسترسی به آن‌ها می‌توانید از `import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'` استفاده کنید. اطلاعات بیشتر درباره ابزارهای ماک کردن موجود را در [مستندات API](/docs/api/modules#wdiobrowser-runner) ببینید.

## توابع

برای اعتبارسنجی اینکه آیا handlerهای تابع خاصی به عنوان بخشی از تست‌های کامپوننت شما فراخوانی می‌شوند یا خیر، ماژول `@wdio/browser-runner` ابزارهای پایه ماک کردن را export می‌کند که می‌توانید از آن‌ها برای تست فراخوانی شدن این توابع استفاده کنید. می‌توانید این متدها را به این صورت import کنید:

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

با import کردن `fn` می‌توانید یک تابع spy (ماک) ایجاد کنید تا اجرای آن را ردیابی کنید و با `spyOn` یک متد را روی یک شیء از قبل ایجاد شده ردیابی کنید.

<Tabs
  defaultValue="mocks"
  values={[
    {label: 'Mocks', value: 'mocks'},
    {label: 'Spies', value: 'spies'}
  ]
}>
<TabItem value="mocks">

مثال کامل را می‌توانید در مخزن [Component Testing Example](https://github.com/webdriverio/component-testing-examples/blob/main/react-typescript-vite/src/tests/LoginForm.test.tsx) پیدا کنید.

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
         * بررسی اینکه handler فراخوانی شده است
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

مثال کامل را می‌توانید در پوشه [examples](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio/browser-runner/lit.test.js) پیدا کنید.

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

WebdriverIO در اینجا صرفاً [`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy) را دوباره export می‌کند که یک پیاده‌سازی سبک spy سازگار با Jest است و می‌توان از آن همراه با matcherهای [`expect`](/docs/api/expect-webdriverio) در WebdriverIO استفاده کرد. مستندات بیشتر درباره این توابع ماک را می‌توانید در [صفحه پروژه Vitest](https://vitest.dev/api/mock.html) پیدا کنید.

البته، شما می‌توانید هر فریم‌ورک spy دیگری، مانند [SinonJS](https://sinonjs.org/)، را نیز نصب و import کنید، به شرطی که از محیط مرورگر پشتیبانی کند.

## ماژول‌ها

ماژول‌های محلی را ماک کنید یا کتابخانه‌های شخص ثالث را که در کدهای دیگر فراخوانی می‌شوند زیر نظر بگیرید، تا بتوانید آرگومان‌ها، خروجی را تست کنید یا حتی پیاده‌سازی آن‌ها را دوباره تعریف کنید.

دو روش برای ماک کردن توابع وجود دارد: یا با ایجاد یک تابع ماک برای استفاده در کد تست، یا با نوشتن یک ماک دستی برای بازنویسی یک وابستگی ماژول.

### ماک کردن Importهای فایل

فرض کنید کامپوننت ما یک متد کمکی را از یک فایل برای مدیریت یک کلیک import می‌کند.

```js title=utils.js
export function handleClick () {
    // پیاده‌سازی handler
}
```

در کامپوننت ما، handler کلیک به این صورت استفاده می‌شود:

```ts title=LitComponent.js
import { handleClick } from './utils.js'

@customElement('simple-button')
export class SimpleButton extends LitElement {
    render() {
        return html`<button @click="${handleClick}">Click me!</button>`
    }
}
```

برای ماک کردن `handleClick` از `utils.js` می‌توانیم از متد `mock` در تست خود به این صورت استفاده کنیم:

```js title=LitComponent.test.js
import { expect, $ } from '@wdio/globals'
import { mock, fn } from '@wdio/browser-runner'
import { html, render } from 'lit'

import { SimpleButton } from './LitComponent.ts'
import { handleClick } from './utils.js'

/**
 * ماک کردن export نام‌گذاری شده "handleClick" از فایل `utils.ts`
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

### ماک کردن وابستگی‌ها

فرض کنید کلاسی داریم که کاربران را از API ما دریافت می‌کند. این کلاس از [`axios`](https://github.com/axios/axios) برای فراخوانی API استفاده می‌کند و سپس ویژگی data را که شامل همه کاربران است برمی‌گرداند:

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

اکنون، برای تست این متد بدون اینکه واقعاً به API درخواست بزنیم (و در نتیجه تست‌های کند و شکننده ایجاد کنیم)، می‌توانیم از تابع `mock(...)` برای ماک کردن خودکار ماژول axios استفاده کنیم.

پس از ماک کردن ماژول، می‌توانیم یک [`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue) برای `.get` فراهم کنیم که داده‌ای را که می‌خواهیم تست ما روی آن assertion انجام دهد برگرداند. در واقع، ما می‌گوییم که می‌خواهیم `axios.get('/users.json')` یک پاسخ جعلی برگرداند.

```js title=users.test.js
import axios from 'axios'; // ماک تعریف شده را import می‌کند
import { mock, fn } from '@wdio/browser-runner'

import Users from './users.js'

/**
 * ماک کردن export پیش‌فرض وابستگی `axios`
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

        // یا بسته به مورد استفاده‌تان می‌توانید از روش زیر استفاده کنید:
        // axios.get.mockImplementation(() => Promise.resolve(resp))

        const data = await Users.all()
        expect(data).toEqual(users)
    })
})
```

## ماک‌های جزئی

می‌توان زیرمجموعه‌هایی از یک ماژول را ماک کرد و بقیه ماژول پیاده‌سازی واقعی خود را حفظ کند:

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

ماژول اصلی به factory ماک ارسال می‌شود که می‌توانید از آن برای مثال برای ماک کردن جزئی یک وابستگی استفاده کنید:

```js
import { mock, fn } from '@wdio/browser-runner'
import defaultExport, { bar, foo } from './foo-bar-baz.js';

mock('./foo-bar-baz.js', async (originalModule) => {
    // ماک کردن export پیش‌فرض و export نام‌گذاری شده 'foo'
    // و انتقال export نام‌گذاری شده از ماژول اصلی
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

## ماک‌های دستی

ماک‌های دستی با نوشتن یک ماژول در زیرپوشه `__mocks__/` (همچنین گزینه `automockDir` را ببینید) تعریف می‌شوند. اگر ماژولی که ماک می‌کنید یک ماژول Node باشد (مثلاً: `lodash`)، ماک باید در پوشه `__mocks__` قرار گیرد و به‌طور خودکار ماک خواهد شد. نیازی به فراخوانی صریح `mock('module_name')` نیست.

ماژول‌های scoped (که با نام پکیج‌های scoped نیز شناخته می‌شوند) را می‌توان با ایجاد یک فایل در ساختار پوشه‌ای که با نام ماژول scoped مطابقت دارد ماک کرد. برای مثال، برای ماک کردن یک ماژول scoped به نام `@scope/project-name`، یک فایل در `__mocks__/@scope/project-name.js` ایجاد کنید و پوشه `@scope/` را نیز متناسب با آن بسازید.

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

هنگامی که یک ماک دستی برای یک ماژول مشخص وجود دارد، WebdriverIO هنگام فراخوانی صریح `mock('moduleName')` از آن ماژول استفاده خواهد کرد. با این حال، وقتی automock روی true تنظیم شده باشد، پیاده‌سازی ماک دستی به جای ماکی که به‌طور خودکار ایجاد می‌شود استفاده خواهد شد، حتی اگر `mock('moduleName')` فراخوانی نشده باشد. برای غیرفعال کردن این رفتار، باید در تست‌هایی که باید از پیاده‌سازی واقعی ماژول استفاده کنند، `unmock('moduleName')` را به‌طور صریح فراخوانی کنید، برای مثال:

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## Hoisting

برای اینکه ماک کردن در مرورگر کار کند، WebdriverIO فایل‌های تست را بازنویسی می‌کند و فراخوانی‌های ماک را بالاتر از همه چیز قرار می‌دهد (hoist می‌کند) (همچنین [این پست وبلاگ](https://www.coolcomputerclub.com/posts/jest-hoist-await/) درباره مشکل hoisting در Jest را ببینید). این موضوع نحوه ارسال متغیرها به resolver ماک را محدود می‌کند، برای مثال:

```js title=component.test.js
import dep from 'dependency'
const variable = 'foobar'

/**
 * ❌ این کار نمی‌کند زیرا `dep` و `variable` درون resolver ماک تعریف نشده‌اند
 */
mock('./some/module.ts', () => ({
    exportA: dep,
    exportB: variable
}))
```

برای رفع این مشکل باید همه متغیرهای مورد استفاده را درون resolver تعریف کنید، برای مثال:

```js title=component.test.js
/**
 * ✔️ این کار می‌کند زیرا همه متغیرها درون resolver تعریف شده‌اند
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

## درخواست‌ها

اگر به دنبال ماک کردن درخواست‌های مرورگر، مانند فراخوانی‌های API، هستید، به بخش [Request Mock and Spies](/docs/mocksandspies) مراجعه کنید.

در تست‌های کامپوننت، برای `browser.mock()` از یک الگوی URL مطلق با پروتکل و hostname ثابت استفاده کنید، مانند `https://api.webdriver.io/api/*`. یک الگوی بدون host مانند `*/api/*` همه درخواست‌های صفحه، از جمله ترافیک Vite و driver خود browser runner را رهگیری می‌کند.

یک `*` تکی اسلش‌ها را نیز تطبیق می‌دهد. در یک الگوی رشته‌ای، `**` همان `*` است؛ در یک شیء `URLPattern`، از یک `*` تکی استفاده کنید. بخش [ایجاد یک ماک](/docs/mocksandspies#creating-a-mock) را ببینید.