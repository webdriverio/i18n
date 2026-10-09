---
id: svelte
title: Svelte
description: "قم بإعداد مشغل المتصفح الخاص بـ WebdriverIO لمشروع Svelte باستخدام الإعداد المسبق svelte واكتب اختبارات المكونات باستخدام Testing Library."
---

[Svelte](https://svelte.dev/) هو نهج جديد جذري لبناء واجهات المستخدم. فبينما تقوم أطر العمل التقليدية مثل React وVue بالجزء الأكبر من عملها في المتصفح، ينقل Svelte هذا العمل إلى خطوة تصريف (compile) تحدث عند بناء تطبيقك. يمكنك اختبار مكونات Svelte مباشرة في متصفح حقيقي باستخدام WebdriverIO و[مشغل المتصفح](/docs/runner#browser-runner) الخاص به.

## الإعداد

لإعداد WebdriverIO داخل مشروع Svelte الخاص بك، اتبع [التعليمات](/docs/component-testing#set-up) الموجودة في وثائق اختبار المكونات لدينا. تأكد من تحديد `svelte` كإعداد مسبق (preset) ضمن خيارات المشغل، على سبيل المثال:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'svelte'
    }],
    // ...
}
```

:::info

إذا كنت تستخدم بالفعل [Vite](https://vitejs.dev/) كخادم تطوير، يمكنك أيضًا ببساطة إعادة استخدام إعداداتك الموجودة في `vite.config.ts` ضمن إعدادات WebdriverIO الخاصة بك. لمزيد من المعلومات، راجع `viteConfig` في [خيارات المشغل](/docs/runner#runner-options).

:::

يتطلب الإعداد المسبق لـ Svelte تثبيت `@sveltejs/vite-plugin-svelte`. كما نوصي باستخدام [Testing Library](https://testing-library.com/) لعرض المكون في صفحة الاختبار. لذلك ستحتاج إلى تثبيت التبعيات الإضافية التالية:

```sh npm2yarn
npm install --save-dev @testing-library/svelte @sveltejs/vite-plugin-svelte
```

يمكنك بعد ذلك بدء الاختبارات عن طريق تشغيل:

```sh
npx wdio run ./wdio.conf.js
```

## كتابة الاختبارات

بافتراض أن لديك مكون Svelte التالي:

```html title="./components/Component.svelte"
<script>
    export let name

    let buttonText = 'Button'

    function handleClick() {
      buttonText = 'Button Clicked'
    }
</script>

<h1>Hello {name}!</h1>
<button on:click="{handleClick}">{buttonText}</button>
```

في اختبارك، استخدم الدالة `render` من `@testing-library/svelte` لإرفاق المكون بصفحة الاختبار. للتفاعل مع المكون، نوصي باستخدام أوامر WebdriverIO لأنها تتصرف بشكل أقرب إلى تفاعلات المستخدم الفعلية، على سبيل المثال:

```ts title="svelte.test.js"
import expect from 'expect'

import { render, fireEvent, screen } from '@testing-library/svelte'
import '@testing-library/jest-dom'

import Component from './components/Component.svelte'

describe('Svelte Component Testing', () => {
    it('changes button text on click', async () => {
        render(Component, { name: 'World' })
        const button = await $('button')
        await expect(button).toHaveText('Button')
        await button.click()
        await expect(button).toHaveText('Button Clicked')
    })
})
```

يمكنك العثور على مثال كامل لمجموعة اختبارات مكونات WebdriverIO لـ Svelte في [مستودع الأمثلة](https://github.com/webdriverio/component-testing-examples/tree/main/svelte-typescript-vite) الخاص بنا.