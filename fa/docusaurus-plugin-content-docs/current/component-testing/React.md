---
id: react
title: React
description: "راه‌اندازی اجراکننده مرورگر WebdriverIO برای یک پروژه React با پیش‌تنظیم react و نوشتن تست‌های کامپوننت با Testing Library."
---

[React](https://reactjs.org/) ساخت رابط‌های کاربری تعاملی را بسیار آسان می‌کند. نماهای ساده‌ای برای هر وضعیت در برنامه خود طراحی کنید و React هنگام تغییر داده‌ها، دقیقاً همان کامپوننت‌های مورد نیاز را به‌طور کارآمد به‌روزرسانی و رندر می‌کند. شما می‌توانید کامپوننت‌های React را مستقیماً در یک مرورگر واقعی با استفاده از WebdriverIO و [اجراکننده مرورگر](/docs/runner#browser-runner) آن تست کنید.

## راه‌اندازی

برای راه‌اندازی WebdriverIO در پروژه React خود، [دستورالعمل‌های](/docs/component-testing#set-up) موجود در مستندات تست کامپوننت ما را دنبال کنید. مطمئن شوید که `react` را به‌عنوان پیش‌تنظیم (preset) در گزینه‌های اجراکننده خود انتخاب کرده‌اید، به‌عنوان مثال:

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

اگر در حال حاضر از [Vite](https://vitejs.dev/) به‌عنوان سرور توسعه استفاده می‌کنید، می‌توانید به‌سادگی پیکربندی خود در `vite.config.ts` را در پیکربندی WebdriverIO دوباره استفاده کنید. برای اطلاعات بیشتر، `viteConfig` را در [گزینه‌های اجراکننده](/docs/runner#runner-options) ببینید.

:::

پیش‌تنظیم React نیاز دارد که `@vitejs/plugin-react` نصب شده باشد. همچنین توصیه می‌کنیم برای رندر کردن کامپوننت در صفحه تست از [Testing Library](https://testing-library.com/) استفاده کنید. بنابراین باید وابستگی‌های اضافی زیر را نصب کنید:

```sh npm2yarn
npm install --save-dev @testing-library/react @vitejs/plugin-react
```

سپس می‌توانید تست‌ها را با اجرای دستور زیر شروع کنید:

```sh
npx wdio run ./wdio.conf.js
```

## نوشتن تست‌ها

فرض کنید کامپوننت React زیر را دارید:

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

در تست خود از متد `render` از `@testing-library/react` برای متصل کردن کامپوننت به صفحه تست استفاده کنید. برای تعامل با کامپوننت، توصیه می‌کنیم از دستورات WebdriverIO استفاده کنید، زیرا رفتار آن‌ها به تعاملات واقعی کاربر نزدیک‌تر است، به‌عنوان مثال:

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

می‌توانید یک نمونه کامل از مجموعه تست کامپوننت WebdriverIO برای React را در [مخزن نمونه‌های](https://github.com/webdriverio/component-testing-examples/tree/main/react-typescript-vite) ما پیدا کنید.