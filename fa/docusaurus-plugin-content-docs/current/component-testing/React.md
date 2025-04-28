---
id: react
title: ری‌اکت
---

[React](https://reactjs.org/) ایجاد رابط‌های کاربری تعاملی را بدون درد می‌کند. طرح‌های ساده‌ای برای هر وضعیت در برنامه خود طراحی کنید، و React فقط مؤلفه‌های مناسب را هنگام تغییر داده‌ها به‌طور کارآمد به‌روزرسانی و رندر می‌کند. شما می‌توانید مؤلفه‌های React را مستقیماً در یک مرورگر واقعی با استفاده از WebdriverIO و [اجراکننده مرورگر](/docs/runner#browser-runner) آن آزمایش کنید.

## راه‌اندازی

برای راه‌اندازی WebdriverIO در پروژه React خود، [دستورالعمل‌های](/docs/component-testing#set-up) موجود در مستندات آزمایش مؤلفه‌های ما را دنبال کنید. مطمئن شوید که `react` را به‌عنوان پیش‌تنظیم در گزینه‌های اجراکننده خود انتخاب کنید، به عنوان مثال:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'react'
    }],
    // ...
}
```

:::info

اگر شما از قبل از [Vite](https://vitejs.dev/) به‌عنوان سرور توسعه استفاده می‌کنید، می‌توانید پیکربندی خود را در `vite.config.ts` درون تنظیمات WebdriverIO خود نیز استفاده کنید. برای اطلاعات بیشتر، به `viteConfig` در [گزینه‌های اجراکننده](/docs/runner#runner-options) مراجعه کنید.

:::

پیش‌تنظیم React نیاز به نصب `@vitejs/plugin-react` دارد. همچنین ما استفاده از [Testing Library](https://testing-library.com/) را برای رندر کردن مؤلفه در صفحه آزمایش توصیه می‌کنیم. بنابراین، شما باید وابستگی‌های زیر را نصب کنید:

```sh npm2yarn
npm install --save-dev @testing-library/react @vitejs/plugin-react
```

سپس می‌توانید آزمایش‌ها را با اجرای دستور زیر شروع کنید:

```sh
npx wdio run ./wdio.conf.js
```

## نوشتن آزمایش‌ها

فرض کنید مؤلفه React زیر را دارید:

```tsx title="./components/Component.jsx"
import React, { useState } from 'react'

function App() {
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(nextTheme)
    }

    return <button onClick={toggleTheme}>
        Current theme: {theme}
    </button>
}

export default App
```

در آزمایش خود از متد `render` از `@testing-library/react` برای الحاق مؤلفه به صفحه آزمایش استفاده کنید. برای تعامل با مؤلفه، ما توصیه می‌کنیم از دستورات WebdriverIO استفاده کنید زیرا رفتاری نزدیک‌تر به تعاملات واقعی کاربر دارند، به عنوان مثال:

```ts title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

import App from './components/Component.jsx'

describe('React Component Testing', () => {
    it('Test theme button toggle', async () => {
        render(<App />)
        const buttonEl = screen.getByText(/Current theme/i)

        await $(buttonEl).click()
        expect(buttonEl).toContainHTML('dark')
    })
})
```

شما می‌توانید یک نمونه کامل از مجموعه آزمایش مؤلفه WebdriverIO برای React را در [مخزن نمونه](https://github.com/webdriverio/component-testing-examples/tree/main/react-typescript-vite) ما پیدا کنید.