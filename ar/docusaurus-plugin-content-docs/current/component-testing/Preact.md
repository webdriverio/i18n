---
id: preact
title: بريآكت
---

[Preact](https://preactjs.com/) هو بديل سريع بحجم 3 كيلوبايت لـ React مع نفس واجهة البرمجة الحديثة. يمكنك اختبار مكونات Preact مباشرة في متصفح حقيقي باستخدام WebdriverIO و [browser runner](/docs/runner#browser-runner) الخاص به.

## الإعداد

لإعداد WebdriverIO ضمن مشروع Preact الخاص بك، اتبع [التعليمات](/docs/component-testing#set-up) في وثائق اختبار المكونات لدينا. تأكد من اختيار `preact` كإعداد مسبق ضمن خيارات المشغل الخاص بك، على سبيل المثال:

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

إذا كنت تستخدم بالفعل [Vite](https://vitejs.dev/) كخادم تطوير، يمكنك أيضًا إعادة استخدام التكوين الخاص بك في `vite.config.ts` ضمن تكوين WebdriverIO الخاص بك. لمزيد من المعلومات، راجع `viteConfig` في [خيارات المشغل](/docs/runner#runner-options).

:::

يتطلب الإعداد المسبق لـ Preact تثبيت `@preact/preset-vite`. نوصي أيضًا باستخدام [Testing Library](https://testing-library.com/) لعرض المكون في صفحة الاختبار. لذلك ستحتاج إلى تثبيت التبعيات الإضافية التالية:

```sh npm2yarn
npm install --save-dev @testing-library/preact @preact/preset-vite
```

يمكنك بعد ذلك بدء الاختبارات عن طريق تشغيل:

```sh
npx wdio run ./wdio.conf.js
```

## كتابة الاختبارات

بافتراض أن لديك مكون Preact التالي:

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

في اختبارك، استخدم طريقة `render` من `@testing-library/preact` لإرفاق المكون بصفحة الاختبار. للتفاعل مع المكون، نوصي باستخدام أوامر WebdriverIO لأنها تتصرف بشكل أقرب إلى تفاعلات المستخدم الفعلية، على سبيل المثال:

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

يمكنك العثور على مثال كامل لمجموعة اختبار مكونات WebdriverIO لـ Preact في [مستودع الأمثلة](https://github.com/webdriverio/component-testing-examples/tree/main/preact-typescript-vite) الخاص بنا.