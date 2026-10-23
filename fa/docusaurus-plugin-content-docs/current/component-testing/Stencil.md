---
id: stencil
title: Stencil
description: "راه‌اندازی اجراکننده مرورگر WebdriverIO برای کامپوننت‌های Stencil، رندر کردن آن‌ها با تابع کمکی render و انتظار برای به‌روزرسانی عناصر."
---

[Stencil](https://stenciljs.com/) کتابخانه‌ای برای ساخت کتابخانه‌های کامپوننت قابل استفاده مجدد و مقیاس‌پذیر است. شما می‌توانید کامپوننت‌های Stencil را مستقیماً در یک مرورگر واقعی با استفاده از WebdriverIO و [اجراکننده مرورگر](/docs/runner#browser-runner) آن تست کنید.

## راه‌اندازی

برای راه‌اندازی WebdriverIO در پروژه Stencil خود، [دستورالعمل‌ها](/docs/component-testing#set-up) را در مستندات تست کامپوننت ما دنبال کنید. مطمئن شوید که `stencil` را به عنوان preset در گزینه‌های اجراکننده خود انتخاب کرده‌اید، به عنوان مثال:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'stencil'
    }],
    // ...
}
```

:::info

در صورتی که از Stencil همراه با فریم‌ورکی مانند React یا Vue استفاده می‌کنید، باید preset مربوط به همان فریم‌ورک‌ها را حفظ کنید.

:::

سپس می‌توانید تست‌ها را با اجرای دستور زیر شروع کنید:

```sh
npx wdio run ./wdio.conf.ts
```

## نوشتن تست‌ها

فرض کنید کامپوننت‌های Stencil زیر را دارید:

```tsx title="./components/Component.tsx"
import { Component, Prop, h } from '@stencil/core'

@Component({
    tag: 'my-name',
    shadow: true
})
export class MyName {
    @Prop() name: string

    normalize(name: string): string {
        if (name) {
            return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase()
        }
        return ''
    }

    render() {
        return (
            <div class="text">
                <p>Hello! My name is {this.normalize(this.name)}.</p>
            </div>
        )
    }
}
```

### `render`

در تست خود از متد `render` از `@wdio/browser-runner/stencil` برای متصل کردن کامپوننت به صفحه تست استفاده کنید. برای تعامل با کامپوننت، توصیه می‌کنیم از دستورات WebdriverIO استفاده کنید زیرا رفتار آن‌ها به تعاملات واقعی کاربر نزدیک‌تر است، به عنوان مثال:

```tsx title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from '@wdio/browser-runner/stencil'

import MyNameComponent from './components/Component.tsx'

describe('Stencil Component Testing', () => {
    it('should render component correctly', async () => {
        await render({
            components: [MyNameComponent],
            template: () => (
                <my-name name={'stencil'}></my-name>
            )
        })
        await expect($('.text')).toHaveText('Hello! My name is Stencil.')
    })
})
```

#### گزینه‌های رندر

متد `render` گزینه‌های زیر را ارائه می‌دهد:

##### `components`

آرایه‌ای از کامپوننت‌ها برای تست. کلاس‌های کامپوننت را می‌توان در فایل spec وارد (import) کرد، سپس مرجع آن‌ها باید به آرایه `component` اضافه شود تا در سراسر تست مورد استفاده قرار گیرند.

__نوع:__ `CustomElementConstructor[]`<br />
__پیش‌فرض:__ `[]`

##### `flushQueue`

اگر `false` باشد، صف رندر در راه‌اندازی اولیه تست تخلیه (flush) نمی‌شود.

__نوع:__ `boolean`<br />
__پیش‌فرض:__ `true`

##### `template`

JSX اولیه‌ای که برای تولید تست استفاده می‌شود. زمانی از `template` استفاده کنید که می‌خواهید یک کامپوننت را با استفاده از ویژگی‌های (properties) آن، به جای صفات (attributes) HTML آن مقداردهی اولیه کنید. این گزینه قالب مشخص‌شده (JSX) را در `document.body` رندر می‌کند.

__نوع:__ `JSX.Template`

##### `html`

HTML اولیه‌ای که برای تولید تست استفاده می‌شود. این گزینه می‌تواند برای ساخت مجموعه‌ای از کامپوننت‌هایی که با هم کار می‌کنند و اختصاص صفات HTML مفید باشد.

__نوع:__ `string`

##### `language`

صفت شبیه‌سازی‌شده `lang` را روی `<html>` تنظیم می‌کند.

__نوع:__ `string`

##### `autoApplyChanges`

به طور پیش‌فرض، برای تست به‌روزرسانی‌ها، هر تغییری در ویژگی‌ها و صفات کامپوننت باید با `env.waitForChanges()` همراه باشد. به عنوان یک گزینه، `autoApplyChanges` صف را به طور مداوم در پس‌زمینه تخلیه می‌کند.

__نوع:__ `boolean`<br />
__پیش‌فرض:__ `false`

##### `attachStyles`

به طور پیش‌فرض، استایل‌ها به DOM متصل نمی‌شوند و در HTML سریال‌شده منعکس نمی‌شوند. تنظیم این گزینه روی `true` باعث می‌شود استایل‌های کامپوننت در خروجی قابل سریال‌سازی گنجانده شوند.

__نوع:__ `boolean`<br />
__پیش‌فرض:__ `false`

#### محیط رندر

متد `render` یک شیء محیط برمی‌گرداند که توابع کمکی خاصی را برای مدیریت محیط کامپوننت فراهم می‌کند.

##### `flushAll`

پس از اعمال تغییرات در یک کامپوننت، مانند به‌روزرسانی یک ویژگی یا صفت، صفحه تست به طور خودکار تغییرات را اعمال نمی‌کند. برای انتظار و اعمال به‌روزرسانی، `await flushAll()` را فراخوانی کنید.

__نوع:__ `() => void`

##### `unmount`

عنصر نگهدارنده (container) را از DOM حذف می‌کند.

__نوع:__ `() => void`

##### `styles`

تمام استایل‌های تعریف‌شده توسط کامپوننت‌ها.

__نوع:__ `Record<string, string>`

##### `container`

عنصر نگهدارنده‌ای که قالب در آن رندر می‌شود.

__نوع:__ `HTMLElement`

##### `$container`

عنصر نگهدارنده به عنوان یک عنصر WebdriverIO.

__نوع:__ `WebdriverIO.Element`

##### `root`

کامپوننت ریشه قالب.

__نوع:__ `HTMLElement`

##### `$root`

کامپوننت ریشه به عنوان یک عنصر WebdriverIO.

__نوع:__ `WebdriverIO.Element`

### `waitForChanges`

متد کمکی برای انتظار تا آماده شدن کامپوننت.

```ts
import { render, waitForChanges } from '@wdio/browser-runner/stencil'
import { MyComponent } from './component.tsx'

const page = render({
    components: [MyComponent],
    html: '<my-component></my-component>'
})

expect(page.root.querySelector('div')).not.toBeDefined()
await waitForChanges()
expect(page.root.querySelector('div')).toBeDefined()
```

## به‌روزرسانی عناصر

اگر ویژگی‌ها یا وضعیت‌هایی (states) را در کامپوننت Stencil خود تعریف می‌کنید، باید مدیریت کنید که این تغییرات چه زمانی روی کامپوننت اعمال شوند تا دوباره رندر شود.


## مثال‌ها

می‌توانید یک مثال کامل از مجموعه تست کامپوننت WebdriverIO برای Stencil را در [مخزن مثال‌های](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter) ما پیدا کنید.