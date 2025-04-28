---
id: svelte
title: اسولت (Svelte)
---

[Svelte](https://svelte.dev/) رویکردی رادیکال جدید برای ساخت رابط‌های کاربری است. در حالی که فریم‌ورک‌های سنتی مانند React و Vue بخش عمده کار خود را در مرورگر انجام می‌دهند، Svelte این کار را به مرحله کامپایل که هنگام ساخت برنامه اتفاق می‌افتد، منتقل می‌کند. شما می‌توانید کامپوننت‌های Svelte را مستقیماً در یک مرورگر واقعی با استفاده از WebdriverIO و [اجراکننده مرورگر](/docs/runner#browser-runner) آن تست کنید.

## راه‌اندازی

برای راه‌اندازی WebdriverIO در پروژه Svelte خود، [دستورالعمل‌ها](/docs/component-testing#set-up) را در مستندات تست کامپوننت ما دنبال کنید. اطمینان حاصل کنید که `svelte` را به عنوان پیش‌تنظیم در گزینه‌های اجراکننده خود انتخاب کرده‌اید، به عنوان مثال:

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

اگر قبلاً از [Vite](https://vitejs.dev/) به عنوان سرور توسعه استفاده می‌کنید، می‌توانید پیکربندی خود را در `vite.config.ts` در پیکربندی WebdriverIO مجدداً استفاده کنید. برای اطلاعات بیشتر، به `viteConfig` در [گزینه‌های اجراکننده](/docs/runner#runner-options) مراجعه کنید.

:::

پیش‌تنظیم Svelte نیاز به نصب `@sveltejs/vite-plugin-svelte` دارد. همچنین ما استفاده از [Testing Library](https://testing-library.com/) را برای رندر کردن کامپوننت در صفحه تست توصیه می‌کنیم. بنابراین، شما باید وابستگی‌های اضافی زیر را نصب کنید:

```sh npm2yarn
npm install --save-dev @testing-library/svelte @sveltejs/vite-plugin-svelte
```

سپس می‌توانید تست‌ها را با اجرای دستور زیر شروع کنید:

```sh
npx wdio run ./wdio.conf.js
```

## نوشتن تست‌ها

با فرض اینکه شما کامپوننت Svelte زیر را دارید:

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

در تست خود از روش `render` از `@testing-library/svelte` استفاده کنید تا کامپوننت را به صفحه تست متصل کنید. برای تعامل با کامپوننت، ما توصیه می‌کنیم از دستورات WebdriverIO استفاده کنید زیرا آنها رفتاری نزدیک‌تر به تعاملات واقعی کاربر دارند، به عنوان مثال:

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

شما می‌توانید یک نمونه کامل از مجموعه تست کامپوننت WebdriverIO برای Svelte را در [مخزن مثال](https://github.com/webdriverio/component-testing-examples/tree/main/svelte-typescript-vite) ما پیدا کنید.