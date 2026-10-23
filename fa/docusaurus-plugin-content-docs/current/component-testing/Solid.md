---
id: solid
title: SolidJS
description: "اجراکنندهٔ مرورگر WebdriverIO را برای یک پروژهٔ SolidJS با پیش‌تنظیم solid راه‌اندازی کنید و تست‌های کامپوننتی بنویسید که در صفحه رندر می‌شوند."
---

[SolidJS](https://www.solidjs.com/) فریم‌ورکی برای ساخت رابط‌های کاربری با واکنش‌پذیری ساده و کارآمد است. شما می‌توانید کامپوننت‌های SolidJS را مستقیماً در یک مرورگر واقعی با استفاده از WebdriverIO و [اجراکنندهٔ مرورگر](/docs/runner#browser-runner) آن تست کنید.

## راه‌اندازی

برای راه‌اندازی WebdriverIO در پروژهٔ SolidJS خود، [دستورالعمل‌های](/docs/component-testing#set-up) موجود در مستندات تست کامپوننت ما را دنبال کنید. مطمئن شوید که `solid` را به‌عنوان پیش‌تنظیم (preset) در گزینه‌های اجراکنندهٔ خود انتخاب کرده‌اید، برای مثال:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'solid'
    }],
    // ...
}
```

:::info

اگر در حال حاضر از [Vite](https://vitejs.dev/) به‌عنوان سرور توسعه استفاده می‌کنید، می‌توانید به‌سادگی پیکربندی خود در `vite.config.ts` را در پیکربندی WebdriverIO خود مجدداً استفاده کنید. برای اطلاعات بیشتر، `viteConfig` را در [گزینه‌های اجراکننده](/docs/runner#runner-options) ببینید.

:::

پیش‌تنظیم SolidJS نیاز دارد که `vite-plugin-solid` نصب شده باشد:

```sh npm2yarn
npm install --save-dev vite-plugin-solid
```

سپس می‌توانید تست‌ها را با اجرای دستور زیر شروع کنید:

```sh
npx wdio run ./wdio.conf.js
```

## نوشتن تست‌ها

فرض کنید کامپوننت SolidJS زیر را دارید:

```html title="./components/Component.tsx"
import { createSignal } from 'solid-js'

function App() {
    const [theme, setTheme] = createSignal('light')

    const toggleTheme = () => {
        const nextTheme = theme() === 'light' ? 'dark' : 'light'
        setTheme(nextTheme)
    }

    return <button onClick={toggleTheme}>
        Current theme: {theme()}
    </button>
}

export default App
```

در تست خود از متد `render` از `solid-js/web` برای متصل کردن کامپوننت به صفحهٔ تست استفاده کنید. برای تعامل با کامپوننت، توصیه می‌کنیم از دستورات WebdriverIO استفاده کنید، زیرا رفتار آن‌ها به تعاملات واقعی کاربر نزدیک‌تر است، برای مثال:

```ts title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from 'solid-js/web'

import App from './components/Component.jsx'

describe('Solid Component Testing', () => {
    /**
     * اطمینان حاصل می‌کنیم که کامپوننت را برای هر تست در یک
     * کانتینر ریشهٔ جدید رندر می‌کنیم
     */
    let root: Element
    beforeEach(() => {
        if (root) {
            root.remove()
        }

        root = document.createElement('div')
        document.body.appendChild(root)
    })

    it('Test theme button toggle', async () => {
        render(<App />, root)
        const buttonEl = await $('button')

        await buttonEl.click()
        expect(buttonEl).toContainHTML('dark')
    })
})
```

می‌توانید یک نمونهٔ کامل از مجموعه تست کامپوننت WebdriverIO برای SolidJS را در [مخزن نمونه‌های](https://github.com/webdriverio/component-testing-examples/tree/main/solidjs-typescript-vite) ما پیدا کنید.