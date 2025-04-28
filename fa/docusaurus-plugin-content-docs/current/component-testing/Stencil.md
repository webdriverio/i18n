---
id: stencil
title: استنسیل
---

[Stencil](https://stenciljs.com/) یک کتابخانه برای ساخت کامپوننت‌های قابل استفاده مجدد و مقیاس‌پذیر است. شما می‌توانید کامپوننت‌های Stencil را مستقیماً در یک مرورگر واقعی با استفاده از WebdriverIO و [اجراگر مرورگر](/docs/runner#browser-runner) آن تست کنید.

## راه‌اندازی

برای راه‌اندازی WebdriverIO در پروژه Stencil خود، [دستورالعمل‌ها](/docs/component-testing#set-up) را در مستندات تست کامپوننت ما دنبال کنید. اطمینان حاصل کنید که `stencil` را به عنوان پیش‌تنظیم در گزینه‌های اجراگر خود انتخاب کرده‌اید، به عنوان مثال:

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

در صورتی که از Stencil با فریم‌ورکی مانند React یا Vue استفاده می‌کنید، باید پیش‌تنظیم مربوط به آن فریم‌ورک‌ها را حفظ کنید.

:::

سپس می‌توانید تست‌ها را با اجرای دستور زیر شروع کنید:

```sh
npx wdio run ./wdio.conf.ts
```

## نوشتن تست‌ها

با فرض اینکه کامپوننت‌های Stencil زیر را دارید:

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

در تست خود از متد `render` از `@wdio/browser-runner/stencil` برای اتصال کامپوننت به صفحه تست استفاده کنید. برای تعامل با کامپوننت، ما استفاده از دستورات WebdriverIO را توصیه می‌کنیم زیرا رفتار آنها به تعاملات واقعی کاربر نزدیک‌تر است، به عنوان مثال:

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

#### گزینه‌های Render

متد `render` گزینه‌های زیر را ارائه می‌دهد:

##### `components`

آرایه‌ای از کامپوننت‌های مورد آزمایش. کلاس‌های کامپوننت می‌توانند در فایل مشخصات وارد شوند، سپس مرجع آنها باید به آرایه `component` اضافه شود تا در سراسر تست استفاده شود.

__نوع:__ `CustomElementConstructor[]`<br />
__پیش‌فرض:__ `[]`

##### `flushQueue`

اگر `false` باشد، صف رندر در راه‌اندازی اولیه تست خالی نمی‌شود.

__نوع:__ `boolean`<br />
__پیش‌فرض:__ `true`

##### `template`

JSX اولیه که برای تولید تست استفاده می‌شود. از `template` هنگامی استفاده کنید که می‌خواهید یک کامپوننت را با استفاده از خواص آنها، به جای ویژگی‌های HTML، مقداردهی اولیه کنید. قالب مشخص شده (JSX) را در `document.body` رندر می‌کند.

__نوع:__ `JSX.Template`

##### `html`

HTML اولیه که برای تولید تست استفاده می‌شود. این می‌تواند برای ساخت مجموعه‌ای از کامپوننت‌هایی که با هم کار می‌کنند و تعیین ویژگی‌های HTML مفید باشد.

__نوع:__ `string`

##### `language`

ویژگی `lang` جعلی را روی `<html>` تنظیم می‌کند.

__نوع:__ `string`

##### `autoApplyChanges`

به طور پیش‌فرض، هر تغییری در خواص و ویژگی‌های کامپوننت باید با `env.waitForChanges()` منتظر بمانند تا بروزرسانی‌ها تست شوند. به عنوان یک گزینه، `autoApplyChanges` به طور مداوم صف را در پس‌زمینه خالی می‌کند.

__نوع:__ `boolean`<br />
__پیش‌فرض:__ `false`

##### `attachStyles`

به طور پیش‌فرض، استایل‌ها به DOM متصل نمی‌شوند و در HTML سریالی شده منعکس نمی‌شوند. تنظیم این گزینه به `true` سبک‌های کامپوننت را در خروجی قابل سریالی کردن شامل می‌کند.

__نوع:__ `boolean`<br />
__پیش‌فرض:__ `false`

#### محیط Render

متد `render` یک شی محیطی را برمی‌گرداند که ابزارهای کمکی خاصی را برای مدیریت محیط کامپوننت فراهم می‌کند.

##### `flushAll`

پس از ایجاد تغییرات در یک کامپوننت، مانند به‌روزرسانی یک خاصیت یا ویژگی، صفحه تست به طور خودکار تغییرات را اعمال نمی‌کند. برای انتظار و اعمال به‌روزرسانی، `await flushAll()` را فراخوانی کنید.

__نوع:__ `() => void`

##### `unmount`

عنصر محفظه را از DOM حذف می‌کند.

__نوع:__ `() => void`

##### `styles`

همه سبک‌های تعریف شده توسط کامپوننت‌ها.

__نوع:__ `Record<string, string>`

##### `container`

عنصر محفظه‌ای که در آن قالب رندر می‌شود.

__نوع:__ `HTMLElement`

##### `$container`

عنصر محفظه به عنوان یک المان WebdriverIO.

__نوع:__ `WebdriverIO.Element`

##### `root`

کامپوننت ریشه قالب.

__نوع:__ `HTMLElement`

##### `$root`

کامپوننت ریشه به عنوان یک المان WebdriverIO.

__نوع:__ `WebdriverIO.Element`

### `waitForChanges`

متد کمکی برای انتظار تا کامپوننت آماده شود.

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

## به‌روزرسانی‌های المان

اگر خواص یا وضعیت‌هایی را در کامپوننت Stencil خود تعریف می‌کنید، باید مدیریت کنید که چه زمانی این تغییرات باید به کامپوننت اعمال شوند تا مجدداً رندر شود.


## نمونه‌ها

شما می‌توانید یک نمونه کامل از مجموعه تست کامپوننت WebdriverIO برای Stencil را در [مخزن نمونه](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter) ما پیدا کنید.