---
id: react
title: ری‌اکت
---

[React](https://reactjs.org/) ساخت رابط‌های کاربری تعاملی را آسان می‌کند. طراحی نماهای ساده برای هر وضعیت در برنامه خود را انجام دهید، و ری‌اکت به طور کارآمد فقط کامپوننت‌های مناسب را هنگام تغییر داده‌ها به‌روزرسانی و رندر می‌کند. شما می‌توانید کامپوننت‌های ری‌اکت را مستقیماً در یک مرورگر واقعی با استفاده از WebdriverIO و [اجراکننده مرورگر](/docs/runner#browser-runner) آن تست کنید.

## راه‌اندازی

برای راه‌اندازی WebdriverIO در پروژه ری‌اکت خود، [دستورالعمل‌ها](/docs/component-testing#set-up) را در مستندات تست کامپوننت ما دنبال کنید. مطمئن شوید که `react` را به عنوان پیش‌تنظیم در گزینه‌های اجراکننده خود انتخاب کرده‌اید، به عنوان مثال:

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

اگر شما قبلاً از [Vite](https://vitejs.dev/) به عنوان سرور توسعه استفاده می‌کنید، می‌توانید پیکربندی خود را در `vite.config.ts` در پیکربندی WebdriverIO خود مجدداً استفاده کنید. برای اطلاعات بیشتر، به `viteConfig` در [گزینه‌های اجراکننده](/docs/runner#runner-options) مراجعه کنید.

:::

پیش‌تنظیم ری‌اکت نیاز به نصب `@vitejs/plugin-react` دارد. همچنین ما استفاده از [Testing Library](https://testing-library.com/) را برای رندر کردن کامپوننت در صفحه تست توصیه می‌کنیم. بنابراین شما نیاز به نصب وابستگی‌های اضافی زیر دارید:

```sh npm2yarn
npm install --save-dev @testing-library/react @vitejs/plugin-react
```

سپس می‌توانید تست‌ها را با اجرای دستور زیر شروع کنید:

```sh
npx wdio run ./wdio.conf.js
```

## نوشتن تست‌ها

با فرض اینکه شما کامپوننت ری‌اکت زیر را دارید:

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

در تست خود از متد `render` از `@testing-library/react` برای اتصال کامپوننت به صفحه تست استفاده کنید. برای تعامل با کامپوننت، ما استفاده از دستورات WebdriverIO را توصیه می‌کنیم زیرا رفتار آنها بیشتر شبیه به تعاملات واقعی کاربر است، به عنوان مثال:

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

شما می‌توانید یک نمونه کامل از مجموعه تست کامپوننت WebdriverIO برای ری‌اکت را در [مخزن نمونه](https://github.com/webdriverio/component-testing-examples/tree/main/react-typescript-vite) ما پیدا کنید.