---
id: stencil
title: استنسیل
---

[Stencil](https://stenciljs.com/) یک کتابخانه برای ساخت کتابخانه‌های مؤلفه قابل استفاده مجدد و مقیاس‌پذیر است. شما می‌توانید مؤلفه‌های Stencil را مستقیماً در یک مرورگر واقعی با استفاده از WebdriverIO و [اجراکننده مرورگر](/docs/runner#browser-runner) آن آزمایش کنید.

## راه‌اندازی

برای راه‌اندازی WebdriverIO در پروژه Stencil خود، [دستورالعمل‌ها](/docs/component-testing#set-up) را در مستندات آزمایش مؤلفه ما دنبال کنید. اطمینان حاصل کنید که `stencil` را به عنوان پیش‌تنظیم در گزینه‌های اجراکننده خود انتخاب کرده‌اید، به عنوان مثال:

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

در صورتی که از Stencil با یک فریم‌ورک مانند React یا Vue استفاده می‌کنید، باید پیش‌تنظیم مربوط به آن فریم‌ورک را حفظ کنید.

:::

سپس می‌توانید آزمایش‌ها را با اجرای دستور زیر شروع کنید:

```sh
npx wdio run ./wdio.conf.ts
```

## نوشتن آزمایش‌ها

با فرض اینکه شما مؤلفه‌های Stencil زیر را دارید:

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

در آزمایش خود از متد `render` از `@wdio/browser-runner/stencil` برای اتصال مؤلفه به صفحه آزمایش استفاده کنید. برای تعامل با مؤلفه، ما استفاده از دستورات WebdriverIO را توصیه می‌کنیم زیرا رفتار آنها به تعاملات واقعی کاربر نزدیک‌تر است، به عنوان مثال:

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

آرایه‌ای از مؤلفه‌ها برای آزمایش. کلاس‌های مؤلفه می‌توانند به فایل spec وارد شوند، سپس مرجع آنها باید به آرایه `component` اضافه شود تا در سراسر آزمایش استفاده شود.

__نوع:__ `CustomElementConstructor[]`<br />
__پیش‌فرض:__ `[]`

##### `flushQueue`

اگر `false` باشد، صف رندر در راه‌اندازی اولیه آزمایش تخلیه نمی‌شود.

__نوع:__ `boolean`<br />
__پیش‌فرض:__ `true`

##### `template`

JSX اولیه که برای تولید آزمایش استفاده می‌شود. از `template` زمانی استفاده کنید که می‌خواهید مؤلفه را با استفاده از ویژگی‌های آن، به جای صفات HTML آن، مقداردهی اولیه کنید. این الگوی مشخص شده (JSX) را در `document.body` رندر می‌کند.

__نوع:__ `JSX.Template`

##### `html`

HTML اولیه مورد استفاده برای تولید آزمایش. این می‌تواند برای ساخت مجموعه‌ای از مؤلفه‌ها که با هم کار می‌کنند و تعیین صفات HTML مفید باشد.

__نوع:__ `string`

##### `language`

صفت `lang` ساختگی را روی `<html>` تنظیم می‌کند.

__نوع:__ `string`

##### `autoApplyChanges`

به طور پیش‌فرض، هر تغییری در ویژگی‌ها و صفات مؤلفه باید با `env.waitForChanges()` برای آزمایش به‌روزرسانی‌ها همراه باشد. به عنوان یک گزینه، `autoApplyChanges` به طور مداوم صف را در پس‌زمینه تخلیه می‌کند.

__نوع:__ `boolean`<br />
__پیش‌فرض:__ `false`

##### `attachStyles`

به طور پیش‌فرض، سبک‌ها به DOM متصل نمی‌شوند و در HTML سریالی شده منعکس نمی‌شوند. تنظیم این گزینه به `true` سبک‌های مؤلفه را در خروجی قابل سریال‌سازی شامل می‌کند.

__نوع:__ `boolean`<br />
__پیش‌فرض:__ `false`

#### محیط Render

متد `render` یک شیء محیط را برمی‌گرداند که کمک‌کننده‌های خاصی را برای مدیریت محیط مؤلفه ارائه می‌دهد.

##### `flushAll`

پس از ایجاد تغییرات در یک مؤلفه، مانند به‌روزرسانی یک ویژگی یا صفت، صفحه آزمایش به طور خودکار تغییرات را اعمال نمی‌کند. برای انتظار و اعمال به‌روزرسانی، `await flushAll()` را فراخوانی کنید.

__نوع:__ `() => void`

##### `unmount`

عنصر ظرف را از DOM حذف می‌کند.

__نوع:__ `() => void`

##### `styles`

تمام سبک‌های تعریف شده توسط مؤلفه‌ها.

__نوع:__ `Record<string, string>`

##### `container`

عنصر ظرفی که قالب در آن رندر می‌شود.

__نوع:__ `HTMLElement`

##### `$container`

عنصر ظرف به عنوان یک عنصر WebdriverIO.

__نوع:__ `WebdriverIO.Element`

##### `root`

مؤلفه ریشه قالب.

__نوع:__ `HTMLElement`

##### `$root`

مؤلفه ریشه به عنوان یک عنصر WebdriverIO.

__نوع:__ `WebdriverIO.Element`

### `waitForChanges`

متد کمکی برای انتظار تا مؤلفه آماده شود.

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

## به‌روزرسانی‌های عناصر

اگر در مؤلفه Stencil خود ویژگی‌ها یا وضعیت‌ها تعریف می‌کنید، باید مدیریت کنید که چه زمانی این تغییرات باید به مؤلفه اعمال شوند تا دوباره رندر شود.


## نمونه‌ها

شما می‌توانید یک نمونه کامل از مجموعه آزمایش مؤلفه WebdriverIO برای Stencil را در [مخزن نمونه](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter) ما پیدا کنید.