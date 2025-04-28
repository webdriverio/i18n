---
id: solid
title: سالید‌جی‌اس
---

[SolidJS](https://www.solidjs.com/) یک فریم‌ورک برای ساخت رابط‌های کاربری با واکنش‌پذیری ساده و کارآمد است. شما می‌توانید کامپوننت‌های SolidJS را مستقیماً در یک مرورگر واقعی با استفاده از WebdriverIO و [اجراکننده مرورگر](/docs/runner#browser-runner) آن تست کنید.

## راه‌اندازی

برای راه‌اندازی WebdriverIO در پروژه SolidJS خود، [دستورالعمل‌ها](/docs/component-testing#set-up) در مستندات تست کامپوننت ما را دنبال کنید. مطمئن شوید که `solid` را به عنوان پیش‌تنظیم در گزینه‌های اجراکننده خود انتخاب کرده‌اید، مثلاً:

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

اگر شما از قبل از [Vite](https://vitejs.dev/) به عنوان سرور توسعه استفاده می‌کنید، می‌توانید تنظیمات خود را در `vite.config.ts` نیز در پیکربندی WebdriverIO مجدداً استفاده کنید. برای اطلاعات بیشتر، به `viteConfig` در [گزینه‌های اجراکننده](/docs/runner#runner-options) مراجعه کنید.

:::

پیش‌تنظیم SolidJS نیاز به نصب `vite-plugin-solid` دارد:

```sh npm2yarn
npm install --save-dev vite-plugin-solid
```

سپس می‌توانید آزمایش‌ها را با اجرای این دستور شروع کنید:

```sh
npx wdio run ./wdio.conf.js
```

## نوشتن تست‌ها

فرض کنید شما کامپوننت SolidJS زیر را دارید:

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

در تست خود از متد `render` از `solid-js/web` برای پیوست کامپوننت به صفحه تست استفاده کنید. برای تعامل با کامپوننت، ما توصیه می‌کنیم از دستورات WebdriverIO استفاده کنید زیرا رفتار آنها به تعاملات واقعی کاربر نزدیک‌تر است، به عنوان مثال:

```ts title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from 'solid-js/web'

import App from './components/Component.jsx'

describe('Solid Component Testing', () => {
    /**
     * ensure we render the component for every test in a
     * new root container
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

شما می‌توانید نمونه کاملی از مجموعه تست کامپوننت WebdriverIO برای SolidJS را در [مخزن نمونه](https://github.com/webdriverio/component-testing-examples/tree/main/solidjs-typescript-vite) ما پیدا کنید.