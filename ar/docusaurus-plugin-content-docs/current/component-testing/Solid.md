---
id: solid
title: SolidJS
description: "قم بإعداد مشغّل المتصفح في WebdriverIO لمشروع SolidJS باستخدام الإعداد المسبق solid، واكتب اختبارات مكونات تُعرض داخل الصفحة."
---

[SolidJS](https://www.solidjs.com/) هو إطار عمل لبناء واجهات المستخدم بتفاعلية بسيطة وعالية الأداء. يمكنك اختبار مكونات SolidJS مباشرةً في متصفح حقيقي باستخدام WebdriverIO و[مشغّل المتصفح](/docs/runner#browser-runner) الخاص به.

## الإعداد

لإعداد WebdriverIO ضمن مشروع SolidJS الخاص بك، اتبع [التعليمات](/docs/component-testing#set-up) الموجودة في توثيق اختبار المكونات لدينا. تأكد من اختيار `solid` كإعداد مسبق (preset) ضمن خيارات المشغّل، على سبيل المثال:

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

إذا كنت تستخدم [Vite](https://vitejs.dev/) بالفعل كخادم تطوير، فيمكنك أيضاً إعادة استخدام إعداداتك الموجودة في `vite.config.ts` ضمن إعدادات WebdriverIO. لمزيد من المعلومات، راجع `viteConfig` في [خيارات المشغّل](/docs/runner#runner-options).

:::

يتطلب الإعداد المسبق لـ SolidJS تثبيت `vite-plugin-solid`:

```sh npm2yarn
npm install --save-dev vite-plugin-solid
```

يمكنك بعد ذلك بدء الاختبارات عن طريق تشغيل:

```sh
npx wdio run ./wdio.conf.js
```

## كتابة الاختبارات

لنفترض أن لديك مكون SolidJS التالي:

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

في اختبارك، استخدم الدالة `render` من `solid-js/web` لإرفاق المكون بصفحة الاختبار. للتفاعل مع المكون، نوصي باستخدام أوامر WebdriverIO لأنها تتصرف بشكل أقرب إلى تفاعلات المستخدم الفعلية، على سبيل المثال:

```ts title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from 'solid-js/web'

import App from './components/Component.jsx'

describe('Solid Component Testing', () => {
    /**
     * تأكد من عرض المكون لكل اختبار في
     * حاوية جذر جديدة
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

يمكنك العثور على مثال كامل لمجموعة اختبارات مكونات WebdriverIO لـ SolidJS في [مستودع الأمثلة](https://github.com/webdriverio/component-testing-examples/tree/main/solidjs-typescript-vite) الخاص بنا.