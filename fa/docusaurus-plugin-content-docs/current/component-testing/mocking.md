---
id: mocking
title: مسدودسازی
---

هنگام نوشتن تست‌ها، تنها مسئله زمان است قبل از اینکه نیاز داشته باشید نسخه "جعلی" از یک سرویس داخلی یا خارجی ایجاد کنید. این معمولاً به عنوان مسدودسازی شناخته می‌شود. WebdriverIO توابع کمکی را برای کمک به شما ارائه می‌دهد. شما می‌توانید `import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'` را برای دسترسی به آن وارد کنید. اطلاعات بیشتر در مورد ابزارهای مسدودسازی موجود در [مستندات API](/docs/api/modules#wdiobrowser-runner) ببینید.

## توابع

برای اینکه بتوانید بررسی کنید آیا توابع خاصی به عنوان بخشی از تست‌های مؤلفه شما فراخوانی شده‌اند، ماژول `@wdio/browser-runner` ابزارهای اولیه مسدودسازی را صادر می‌کند که می‌توانید از آن‌ها استفاده کنید. شما می‌توانید این روش‌ها را از طریق زیر وارد کنید:

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

با وارد کردن `fn` می‌توانید یک تابع جاسوس (مسدودساز) برای پیگیری اجرای آن ایجاد کنید و با `spyOn` یک متد را روی یک شیء ایجاد شده پیگیری کنید.

<Tabs
  defaultValue="mocks"
  values={[
    {label: 'Mocks', value: 'mocks'},
    {label: 'Spies', value: 'spies'}
  ]
}>
<TabItem value="mocks">

نمونه کامل را می‌توانید در مخزن [Component Testing Example](https://github.com/webdriverio/component-testing-examples/blob/main/react-typescript-vite/src/tests/LoginForm.test.tsx) پیدا کنید.

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

نمونه کامل را می‌توانید در دایرکتوری [examples](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio/browser-runner/lit.test.js) پیدا کنید.

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

WebdriverIO در اینجا فقط [`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy) را مجدداً صادر می‌کند که یک پیاده‌سازی جاسوس سبک سازگار با Jest است که می‌تواند با تطبیق‌دهنده‌های [`expect`](/docs/api/expect-webdriverio) WebdriverIO استفاده شود. می‌توانید مستندات بیشتری در مورد این توابع مسدودسازی در [صفحه پروژه Vitest](https://vitest.dev/api/mock.html) پیدا کنید.

البته، شما همچنین می‌توانید هر چارچوب جاسوسی دیگری را نصب و وارد کنید، مانند [SinonJS](https://sinonjs.org/)، تا زمانی که از محیط مرورگر پشتیبانی کند.

## ماژول‌ها

ماژول‌های محلی را مسدود کنید یا کتابخانه‌های شخص ثالث را که در برخی از کدهای دیگر فراخوانی می‌شوند، مشاهده کنید، این به شما امکان می‌دهد آرگومان‌ها، خروجی یا حتی پیاده‌سازی آن را بازتعریف کنید.

دو روش برای مسدودسازی توابع وجود دارد: یا با ایجاد یک تابع مسدودساز برای استفاده در کد تست، یا نوشتن یک مسدودسازی دستی برای لغو وابستگی ماژول.

### مسدودسازی واردات فایل

تصور کنید مؤلفه ما یک متد کمکی را از یک فایل برای مدیریت کلیک وارد می‌کند.

```js title=utils.js
export function handleClick () {
    // handler implementation
}
```

در مؤلفه ما، مدیریت کننده کلیک به صورت زیر استفاده می‌شود:

```ts title=LitComponent.js
import { handleClick } from './utils.js'

@customElement('simple-button')
export class SimpleButton extends LitElement {
    render() {
        return html`<button @click="${handleClick}">Click me!</button>`
    }
}
```

برای مسدودسازی `handleClick` از `utils.js` می‌توانیم از متد `mock` در تست خود به صورت زیر استفاده کنیم:

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

### مسدودسازی وابستگی‌ها

فرض کنید کلاسی داریم که کاربران را از API ما دریافت می‌کند. این کلاس از [`axios`](https://github.com/axios/axios) برای فراخوانی API استفاده می‌کند و سپس ویژگی data را که شامل تمام کاربران است برمی‌گرداند:

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

حالا، برای تست این متد بدون اینکه واقعاً با API تماس بگیریم (و بنابراین ایجاد تست‌های کند و شکننده)، می‌توانیم از تابع `mock(...)` برای مسدودسازی خودکار ماژول axios استفاده کنیم.

وقتی ماژول را مسدود می‌کنیم، می‌توانیم یک [`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue) برای `.get` ارائه دهیم که داده‌هایی را که می‌خواهیم تست ما در مقابل آن تأیید کند، برگرداند. در واقع، ما می‌گوییم که می‌خواهیم `axios.get('/users.json')` یک پاسخ جعلی برگرداند.

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

## بخشی‌ها

زیرمجموعه‌هایی از یک ماژول می‌توانند مسدود شوند و بقیه ماژول می‌توانند پیاده‌سازی واقعی خود را حفظ کنند:

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

ماژول اصلی به کارخانه مسدودسازی منتقل می‌شود که می‌توانید از آن استفاده کنید تا مثلاً به صورت جزئی یک وابستگی را مسدود کنید:

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

## مسدودسازی‌های دستی

مسدودسازی‌های دستی با نوشتن یک ماژول در زیرمجموعه `__mocks__/` (همچنین گزینه `automockDir` را ببینید) تعریف می‌شوند. اگر ماژولی که در حال مسدودسازی آن هستید یک ماژول Node است (مانند: `lodash`)، مسدودسازی باید در دایرکتوری `__mocks__` قرار گیرد و به صورت خودکار مسدود خواهد شد. نیازی به فراخوانی صریح `mock('module_name')` نیست.

ماژول‌های محدود شده (همچنین به عنوان بسته‌های محدود شده شناخته می‌شوند) می‌توانند با ایجاد فایلی در ساختار دایرکتوری که با نام ماژول محدود شده مطابقت دارد، مسدود شوند. به عنوان مثال، برای مسدودسازی یک ماژول محدود شده به نام `@scope/project-name`، فایلی در `__mocks__/@scope/project-name.js` ایجاد کنید و دایرکتوری `@scope/` را به طور مناسب ایجاد کنید.

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

وقتی یک مسدودسازی دستی برای یک ماژول معین وجود داشته باشد، WebdriverIO از آن ماژول هنگام فراخوانی صریح `mock('moduleName')` استفاده می‌کند. با این حال، وقتی automock روی true تنظیم شده باشد، پیاده‌سازی مسدودسازی دستی به جای مسدودسازی ایجاد شده به صورت خودکار استفاده می‌شود، حتی اگر `mock('moduleName')` فراخوانی نشود. برای عدم استفاده از این رفتار، شما باید به صراحت `unmock('moduleName')` را در تست‌هایی که باید از پیاده‌سازی ماژول واقعی استفاده کنند، فراخوانی کنید، به عنوان مثال:

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## بالابری

برای اینکه مسدودسازی در مرورگر کار کند، WebdriverIO فایل‌های تست را بازنویسی کرده و فراخوانی‌های مسدودسازی را بالاتر از همه چیز قرار می‌دهد (همچنین به [این پست وبلاگ](https://www.coolcomputerclub.com/posts/jest-hoist-await/) در مورد مشکل بالابری در Jest مراجعه کنید). این امر محدودیت‌هایی را برای نحوه انتقال متغیرها به تفکیک‌کننده مسدودساز ایجاد می‌کند، به عنوان مثال:

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

برای رفع این مشکل، باید تمام متغیرهای مورد استفاده را درون تفکیک‌کننده تعریف کنید، به عنوان مثال:

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

## درخواست‌ها

اگر به دنبال مسدودسازی درخواست‌های مرورگر هستید، مانند فراخوانی‌های API، به بخش [درخواست‌های مسدودسازی و جاسوسی](/docs/mocksandspies) مراجعه کنید.