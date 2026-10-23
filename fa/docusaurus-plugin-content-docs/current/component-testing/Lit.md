---
id: lit
title: Lit
description: "اجراکننده مرورگر WebdriverIO را برای کامپوننت‌های وب Lit راه‌اندازی کنید و تست‌هایی بنویسید که عناصر درون shadow rootهای تودرتو را جستجو می‌کنند."
---

Lit یک کتابخانه ساده برای ساخت کامپوننت‌های وب سریع و سبک است. تست کامپوننت‌های وب Lit با WebdriverIO به لطف [انتخابگرهای shadow DOM](/docs/selectors#deep-selectors) در WebdriverIO بسیار آسان است؛ شما می‌توانید عناصر تودرتو در shadow rootها را تنها با یک دستور جستجو کنید.

## راه‌اندازی

برای راه‌اندازی WebdriverIO در پروژه Lit خود، [دستورالعمل‌های](/docs/component-testing#set-up) موجود در مستندات تست کامپوننت ما را دنبال کنید. برای Lit نیازی به preset ندارید، زیرا کامپوننت‌های وب Lit نیازی به اجرا شدن از طریق یک کامپایلر ندارند و صرفاً بهبودهایی بر پایه کامپوننت‌های وب خالص هستند.

پس از راه‌اندازی، می‌توانید تست‌ها را با اجرای دستور زیر شروع کنید:

```sh
npx wdio run ./wdio.conf.js
```

## نوشتن تست‌ها

فرض کنید کامپوننت Lit زیر را دارید:

```ts title="./components/Component.ts"
import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
    @property()
    name?: string = 'World'

    // رابط کاربری را به عنوان تابعی از وضعیت کامپوننت رندر کنید
    render() {
        return html`<p>Hello, ${this.name}!</p>`
    }
}
```

برای تست کامپوننت، باید آن را قبل از شروع تست در صفحه تست رندر کنید و اطمینان حاصل کنید که پس از آن پاک‌سازی می‌شود:

```ts title="lit.test.js"
import expect from 'expect'
import { waitFor } from '@testing-library/dom'

// وارد کردن کامپوننت Lit
import './components/Component.ts'

describe('Lit Component testing', () => {
    let elem: HTMLElement

    beforeEach(() => {
        elem = document.createElement('simple-greeting')
    })

    it('should render component', async () => {
        elem.setAttribute('name', 'WebdriverIO')
        document.body.appendChild(elem)

        await waitFor(() => {
            expect(elem.shadowRoot.textContent).toBe('Hello, WebdriverIO!')
        })
    })

    afterEach(() => {
        elem.remove()
    })
})
```

می‌توانید یک نمونه کامل از مجموعه تست کامپوننت WebdriverIO برای Lit را در [مخزن نمونه‌های](https://github.com/webdriverio/component-testing-examples/tree/main/lit-typescript-vite) ما پیدا کنید.