---
id: react
title: رياكت
---

[React](https://reactjs.org/) يجعل إنشاء واجهات المستخدم التفاعلية أمرًا سهلاً. صمم عروضًا بسيطة لكل حالة في تطبيقك، وسيقوم React بتحديث وعرض المكونات المناسبة بكفاءة عندما تتغير بياناتك. يمكنك اختبار مكونات React مباشرة في متصفح حقيقي باستخدام WebdriverIO و[منفذ المتصفح](/docs/runner#browser-runner) الخاص به.

## الإعداد

لإعداد WebdriverIO ضمن مشروع React الخاص بك، اتبع [التعليمات](/docs/component-testing#set-up) في وثائق اختبار المكونات لدينا. تأكد من اختيار `react` كإعداد مسبق ضمن خيارات المشغل الخاص بك، على سبيل المثال:

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

إذا كنت تستخدم بالفعل [Vite](https://vitejs.dev/) كخادم تطوير، يمكنك أيضًا إعادة استخدام التكوين الخاص بك في `vite.config.ts` ضمن تكوين WebdriverIO الخاص بك. لمزيد من المعلومات، انظر `viteConfig` في [خيارات المشغل](/docs/runner#runner-options).

:::

يتطلب الإعداد المسبق لـ React تثبيت `@vitejs/plugin-react`. كما نوصي باستخدام [Testing Library](https://testing-library.com/) لعرض المكون في صفحة الاختبار. لذلك، ستحتاج إلى تثبيت التبعيات الإضافية التالية:

```sh npm2yarn
npm install --save-dev @testing-library/react @vitejs/plugin-react
```

يمكنك بعد ذلك بدء الاختبارات عن طريق تشغيل:

```sh
npx wdio run ./wdio.conf.js
```

## كتابة الاختبارات

بفرض أن لديك مكون React التالي:

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

في اختبارك، استخدم طريقة `render` من `@testing-library/react` لإرفاق المكون بصفحة الاختبار. للتفاعل مع المكون، نوصي باستخدام أوامر WebdriverIO لأنها تتصرف بشكل أقرب إلى تفاعلات المستخدم الفعلي، على سبيل المثال:

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

يمكنك العثور على مثال كامل لمجموعة اختبار مكونات WebdriverIO لـ React في [مستودع الأمثلة](https://github.com/webdriverio/component-testing-examples/tree/main/react-typescript-vite) الخاص بنا.