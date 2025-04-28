---
id: preact
title: پریکت
---

[Preact](https://preactjs.com/) یک جایگزین سریع ۳ کیلوبایتی برای React با همان API مدرن است. شما می‌توانید کامپوننت‌های Preact را مستقیماً در یک مرورگر واقعی با استفاده از WebdriverIO و [اجراکننده مرورگر](/docs/runner#browser-runner) آن تست کنید.

## راه‌اندازی

برای راه‌اندازی WebdriverIO در پروژه Preact خود، [دستورالعمل‌ها](/docs/component-testing#set-up) در مستندات تست کامپوننت ما را دنبال کنید. اطمینان حاصل کنید که `preact` را به عنوان پیش‌تنظیم در گزینه‌های اجراکننده خود انتخاب کرده‌اید، به عنوان مثال:

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

اگر شما قبلاً از [Vite](https://vitejs.dev/) به عنوان سرور توسعه استفاده می‌کنید، می‌توانید پیکربندی خود را در `vite.config.ts` در پیکربندی WebdriverIO خود مجدداً استفاده کنید. برای اطلاعات بیشتر، به `viteConfig` در [گزینه‌های اجراکننده](/docs/runner#runner-options) مراجعه کنید.

:::

پیش‌تنظیم Preact نیاز به نصب `@preact/preset-vite` دارد. همچنین ما استفاده از [Testing Library](https://testing-library.com/) را برای رندر کردن کامپوننت در صفحه تست توصیه می‌کنیم. بنابراین شما نیاز به نصب وابستگی‌های اضافی زیر دارید:

```sh npm2yarn
npm install --save-dev @testing-library/preact @preact/preset-vite
```

سپس می‌توانید آزمایش‌ها را با اجرای دستور زیر شروع کنید:

```sh
npx wdio run ./wdio.conf.js
```

## نوشتن تست‌ها

با فرض اینکه شما کامپوننت Preact زیر را دارید:

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

در تست خود از متد `render` از `@testing-library/preact` برای اتصال کامپوننت به صفحه تست استفاده کنید. برای تعامل با کامپوننت، ما توصیه می‌کنیم از دستورات WebdriverIO استفاده کنید زیرا آنها رفتار نزدیک‌تری به تعاملات واقعی کاربر دارند، به عنوان مثال:

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

شما می‌توانید یک نمونه کامل از مجموعه تست کامپوننت WebdriverIO برای Preact را در [مخزن مثال](https://github.com/webdriverio/component-testing-examples/tree/main/preact-typescript-vite) ما پیدا کنید.