---
id: preact
title: Preact
description: "اجراکنندهٔ مرورگر WebdriverIO را برای یک پروژهٔ Preact با پیش‌تنظیم preact راه‌اندازی کنید و تست‌های کامپوننت را با Testing Library بنویسید."
---

[Preact](https://preactjs.com/) یک جایگزین سریع ۳ کیلوبایتی برای React با همان API مدرن است. شما می‌توانید کامپوننت‌های Preact را مستقیماً در یک مرورگر واقعی با استفاده از WebdriverIO و [اجراکنندهٔ مرورگر](/docs/runner#browser-runner) آن تست کنید.

## راه‌اندازی

برای راه‌اندازی WebdriverIO در پروژهٔ Preact خود، [دستورالعمل‌ها](/docs/component-testing#set-up) را در مستندات تست کامپوننت ما دنبال کنید. مطمئن شوید که `preact` را به‌عنوان پیش‌تنظیم (preset) در گزینه‌های اجراکنندهٔ خود انتخاب کرده‌اید، به‌عنوان مثال:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'preact'
    }],
    // ...
}
```

:::info

اگر در حال حاضر از [Vite](https://vitejs.dev/) به‌عنوان سرور توسعه استفاده می‌کنید، می‌توانید به‌سادگی پیکربندی خود در `vite.config.ts` را در پیکربندی WebdriverIO نیز دوباره استفاده کنید. برای اطلاعات بیشتر، `viteConfig` را در [گزینه‌های اجراکننده](/docs/runner#runner-options) ببینید.

:::

پیش‌تنظیم Preact نیاز دارد که `@preact/preset-vite` نصب شده باشد. همچنین توصیه می‌کنیم از [Testing Library](https://testing-library.com/) برای رندر کردن کامپوننت در صفحهٔ تست استفاده کنید. بنابراین باید وابستگی‌های اضافی زیر را نصب کنید:

```sh npm2yarn
npm install --save-dev @testing-library/preact @preact/preset-vite
```

سپس می‌توانید تست‌ها را با اجرای دستور زیر شروع کنید:

```sh
npx wdio run ./wdio.conf.js
```

## نوشتن تست‌ها

فرض کنید کامپوننت Preact زیر را دارید:

```tsx title="./components/Component.jsx"
import { h } from 'preact'
import { useState } from 'preact/hooks'

interface Props {
    initialCount: number
}

export function Counter({ initialCount }: Props) {
    const [count, setCount] = useState(initialCount)
    const increment = () => setCount(count + 1)

    return (
        <div>
            Current value: {count}
            <button onClick={increment}>Increment</button>
        </div>
    )
}

```

در تست خود از متد `render` از `@testing-library/preact` برای متصل کردن کامپوننت به صفحهٔ تست استفاده کنید. برای تعامل با کامپوننت، توصیه می‌کنیم از دستورات WebdriverIO استفاده کنید، زیرا رفتار آن‌ها به تعاملات واقعی کاربر نزدیک‌تر است، به‌عنوان مثال:

```ts title="app.test.tsx"
import { expect } from 'expect'
import { render, screen } from '@testing-library/preact'

import { Counter } from './components/PreactComponent.js'

describe('Preact Component Testing', () => {
    it('should increment after "Increment" button is clicked', async () => {
        const component = await $(render(<Counter initialCount={5} />))
        await expect(component).toHaveText(expect.stringContaining('Current value: 5'))

        const incrElem = await $(screen.getByText('Increment'))
        await incrElem.click()
        await expect(component).toHaveText(expect.stringContaining('Current value: 6'))
    })
})
```

می‌توانید یک نمونهٔ کامل از مجموعهٔ تست کامپوننت WebdriverIO برای Preact را در [مخزن نمونه‌های](https://github.com/webdriverio/component-testing-examples/tree/main/preact-typescript-vite) ما پیدا کنید.