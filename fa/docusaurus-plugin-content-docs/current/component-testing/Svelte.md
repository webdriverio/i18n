---
id: svelte
title: Svelte
description: "راه‌اندازی اجراکننده مرورگر WebdriverIO برای یک پروژه Svelte با پیش‌تنظیم svelte و نوشتن تست‌های کامپوننت با Testing Library."
---

[Svelte](https://svelte.dev/) یک رویکرد جدید و رادیکال برای ساخت رابط‌های کاربری است. در حالی که فریمورک‌های سنتی مانند React و Vue بخش عمده کار خود را در مرورگر انجام می‌دهند، Svelte این کار را به یک مرحله کامپایل منتقل می‌کند که هنگام ساخت برنامه شما اتفاق می‌افتد. شما می‌توانید کامپوننت‌های Svelte را مستقیماً در یک مرورگر واقعی با استفاده از WebdriverIO و [اجراکننده مرورگر](/docs/runner#browser-runner) آن تست کنید.

## راه‌اندازی

برای راه‌اندازی WebdriverIO در پروژه Svelte خود، [دستورالعمل‌های](/docs/component-testing#set-up) موجود در مستندات تست کامپوننت ما را دنبال کنید. مطمئن شوید که `svelte` را به عنوان پیش‌تنظیم (preset) در گزینه‌های اجراکننده خود انتخاب کرده‌اید، به عنوان مثال:

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

اگر در حال حاضر از [Vite](https://vitejs.dev/) به عنوان سرور توسعه استفاده می‌کنید، می‌توانید به سادگی پیکربندی خود در `vite.config.ts` را در پیکربندی WebdriverIO خود نیز مجدداً استفاده کنید. برای اطلاعات بیشتر، `viteConfig` را در [گزینه‌های اجراکننده](/docs/runner#runner-options) ببینید.

:::

پیش‌تنظیم Svelte نیاز به نصب `@sveltejs/vite-plugin-svelte` دارد. همچنین توصیه می‌کنیم از [Testing Library](https://testing-library.com/) برای رندر کردن کامپوننت در صفحه تست استفاده کنید. بنابراین باید وابستگی‌های اضافی زیر را نصب کنید:

```sh npm2yarn
npm install --save-dev @testing-library/svelte @sveltejs/vite-plugin-svelte
```

سپس می‌توانید تست‌ها را با اجرای دستور زیر شروع کنید:

```sh
npx wdio run ./wdio.conf.js
```

## نوشتن تست‌ها

فرض کنید کامپوننت Svelte زیر را دارید:

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

در تست خود از متد `render` از `@testing-library/svelte` برای اتصال کامپوننت به صفحه تست استفاده کنید. برای تعامل با کامپوننت، توصیه می‌کنیم از دستورات WebdriverIO استفاده کنید زیرا رفتار آن‌ها به تعاملات واقعی کاربر نزدیک‌تر است، به عنوان مثال:

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

می‌توانید یک نمونه کامل از مجموعه تست کامپوننت WebdriverIO برای Svelte را در [مخزن نمونه‌های](https://github.com/webdriverio/component-testing-examples/tree/main/svelte-typescript-vite) ما پیدا کنید.