---
id: lit
title: لیت
---

لیت (Lit) یک کتابخانه ساده برای ساخت کامپوننت‌های وب سریع و سبک است. تست کامپوننت‌های وب لیت با WebdriverIO به لطف [سلکتورهای شادو DOM](/docs/selectors#deep-selectors) بسیار آسان است. شما می‌توانید عناصر تو در تو در ریشه‌های شادو را با تنها یک دستور واحد پرس‌وجو کنید.

## راه‌اندازی

برای راه‌اندازی WebdriverIO در پروژه لیت خود، [دستورالعمل‌ها](/docs/component-testing#set-up) در مستندات تست کامپوننت ما را دنبال کنید. برای لیت نیازی به پیش‌تنظیمات ندارید زیرا کامپوننت‌های وب لیت نیازی به اجرا از طریق کامپایلر ندارند، آن‌ها بهبودهای خالص کامپوننت وب هستند.

پس از راه‌اندازی، می‌توانید تست‌ها را با اجرای دستور زیر شروع کنید:

```sh
npx wdio run ./wdio.conf.js
```

## نوشتن تست‌ها

فرض کنید کامپوننت لیت زیر را دارید:

```ts title="./components/Component.ts"
import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
    @property()
    name?: string = 'World'

    // Render the UI as a function of component state
    render() {
        return html`<p>Hello, ${this.name}!</p>`
    }
}
```

برای تست کامپوننت، باید آن را قبل از شروع تست در صفحه تست رندر کنید و اطمینان حاصل کنید که پس از آن پاکسازی می‌شود:

```ts title="lit.test.js"
import expect from 'expect'
import { waitFor } from '@testing-library/dom'

// import Lit component
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

شما می‌توانید یک نمونه کامل از مجموعه تست کامپوننت WebdriverIO برای لیت را در [مخزن نمونه](https://github.com/webdriverio/component-testing-examples/tree/main/lit-typescript-vite) ما پیدا کنید.