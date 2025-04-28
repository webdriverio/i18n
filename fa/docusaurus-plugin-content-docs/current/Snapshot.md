---
id: snapshot
title: اسنپ‌شات
---

تست‌های اسنپ‌شات می‌توانند برای بررسی طیف گسترده‌ای از جنبه‌های کامپوننت یا منطق شما به طور همزمان بسیار مفید باشند. در WebdriverIO می‌توانید از هر شیء اختیاری و همچنین ساختار DOM یک WebElement یا نتایج دستورات WebdriverIO اسنپ‌شات بگیرید.

مشابه چارچوب‌های تست دیگر، WebdriverIO یک اسنپ‌شات از مقدار داده شده می‌گیرد، سپس آن را با فایل اسنپ‌شات مرجع که در کنار تست ذخیره شده مقایسه می‌کند. اگر دو اسنپ‌شات مطابقت نداشته باشند، تست شکست می‌خورد: یا تغییر غیرمنتظره است، یا اسنپ‌شات مرجع نیاز به به‌روزرسانی به نسخه جدید نتیجه دارد.

:::info پشتیبانی از پلتفرم‌های مختلف

این قابلیت‌های اسنپ‌شات هم برای اجرای تست‌های end-to-end در محیط Node.js و هم برای اجرای تست‌های [واحد و کامپوننت](/docs/component-testing) در مرورگر یا دستگاه‌های موبایل در دسترس هستند.

:::

## استفاده از اسنپ‌شات‌ها
برای گرفتن اسنپ‌شات از یک مقدار، می‌توانید از `toMatchSnapshot()` از API [`expect()`](/docs/api/expect-webdriverio) استفاده کنید:

```ts
import { browser, expect } from '@wdio/globals'

it('can take a DOM snapshot', () => {
    await browser.url('https://guinea-pig.webdriver.io/')
    await expect($('.findme')).toMatchSnapshot()
})
```

اولین باری که این تست اجرا می‌شود، WebdriverIO یک فایل اسنپ‌شات به شکل زیر ایجاد می‌کند:

```js
// Snapshot v1

exports[`main suite 1 > can take a DOM snapshot 1`] = `"<h1 class="findme">Test CSS Attributes</h1>"`;
```

آرتیفکت اسنپ‌شات باید همراه با تغییرات کد کامیت شود و به عنوان بخشی از فرآیند بررسی کد مورد بازبینی قرار گیرد. در اجراهای بعدی تست، WebdriverIO خروجی رندر شده را با اسنپ‌شات قبلی مقایسه می‌کند. اگر آنها مطابقت داشته باشند، تست موفق خواهد شد. اگر مطابقت نداشته باشند، یا اجراکننده تست یک باگ در کد شما پیدا کرده که باید رفع شود، یا پیاده‌سازی تغییر کرده و اسنپ‌شات نیاز به به‌روزرسانی دارد.

برای به‌روزرسانی اسنپ‌شات، پرچم `-s` (یا `--updateSnapshot`) را به دستور `wdio` پاس دهید، مثلاً:

```sh
npx wdio run wdio.conf.js -s
```

__نکته:__ اگر تست‌ها را با چندین مرورگر به صورت موازی اجرا می‌کنید، فقط یک اسنپ‌شات ایجاد و مقایسه می‌شود. اگر می‌خواهید برای هر قابلیت یک اسنپ‌شات جداگانه داشته باشید، لطفاً [یک مشکل را گزارش دهید](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Idea+%F0%9F%92%A1%2CNeeds+Triaging+%E2%8F%B3&projects=&template=feature-request.yml&title=%5B%F0%9F%92%A1+Feature%5D%3A+%3Ctitle%3E) و مورد استفاده خود را به ما اطلاع دهید.

## اسنپ‌شات‌های درون‌خطی

به طور مشابه، می‌توانید از `toMatchInlineSnapshot()` برای ذخیره اسنپ‌شات به صورت درون‌خطی در فایل تست استفاده کنید.

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

به جای ایجاد یک فایل اسنپ‌شات، Vitest فایل تست را مستقیماً اصلاح می‌کند تا اسنپ‌شات را به عنوان یک رشته به‌روز کند:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
    const elem = $('.container')
    await expect(elem.getCSSProperty()).toMatchInlineSnapshot(`
        {
            "parsed": {
                "alpha": 0,
                "hex": "#000000",
                "rgba": "rgba(0,0,0,0)",
                "type": "color",
            },
            "property": "background-color",
            "value": "rgba(0,0,0,0)",
        }
    `)
})
```

این به شما امکان می‌دهد خروجی مورد انتظار را مستقیماً ببینید بدون اینکه بین فایل‌های مختلف جابجا شوید.

## اسنپ‌شات‌های بصری

گرفتن اسنپ‌شات DOM از یک المان ممکن است ایده خوبی نباشد، به خصوص اگر ساختار DOM بسیار بزرگ باشد و حاوی ویژگی‌های المان پویا باشد. در این موارد، توصیه می‌شود برای المان‌ها به اسنپ‌شات‌های بصری متکی باشید.

برای فعال‌سازی اسنپ‌شات‌های بصری، `@wdio/visual-service` را به تنظیمات خود اضافه کنید. می‌توانید دستورالعمل‌های تنظیم را در [مستندات](/docs/visual-testing#installation) تست بصری دنبال کنید.

سپس می‌توانید با استفاده از `toMatchElementSnapshot()` یک اسنپ‌شات بصری بگیرید، به عنوان مثال:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

سپس یک تصویر در دایرکتوری پایه ذخیره می‌شود. برای اطلاعات بیشتر به [تست بصری](/docs/visual-testing) مراجعه کنید.