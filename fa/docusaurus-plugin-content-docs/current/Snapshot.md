---
id: snapshot
title: اسنپ‌شات
---

تست‌های اسنپ‌شات می‌توانند برای اطمینان از طیف گسترده‌ای از جنبه‌های کامپوننت یا منطق شما به‌طور همزمان بسیار مفید باشند. در WebdriverIO شما می‌توانید از هر شیء دلخواه، ساختار DOM عنصر وب، یا نتایج دستورات WebdriverIO اسنپ‌شات بگیرید.

مشابه دیگر فریم‌ورک‌های تست، WebdriverIO از مقدار داده شده اسنپ‌شات می‌گیرد، سپس آن را با فایل اسنپ‌شات مرجع که در کنار تست ذخیره شده مقایسه می‌کند. اگر دو اسنپ‌شات مطابقت نداشته باشند، تست شکست می‌خورد: یا تغییر غیرمنتظره است، یا اسنپ‌شات مرجع نیاز به به‌روزرسانی به نسخه جدید نتیجه دارد.

:::info پشتیبانی از پلتفرم‌های مختلف

این قابلیت‌های اسنپ‌شات هم برای اجرای تست‌های انتها به انتها در محیط Node.js و هم برای اجرای [تست‌های واحد و کامپوننت](/docs/component-testing) در مرورگر یا روی دستگاه‌های موبایل در دسترس هستند.

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

اولین باری که این تست اجرا می‌شود، WebdriverIO یک فایل اسنپ‌شات ایجاد می‌کند که شبیه به این است:

```js
// Snapshot v1

exports[`main suite 1 > can take a DOM snapshot 1`] = `"<h1 class="findme">Test CSS Attributes</h1>"`;
```

آرتیفکت اسنپ‌شات باید همراه با تغییرات کد کامیت شود و به عنوان بخشی از فرآیند بررسی کد بازبینی شود. در اجراهای بعدی تست، WebdriverIO خروجی ارائه شده را با اسنپ‌شات قبلی مقایسه می‌کند. اگر آنها مطابقت داشته باشند، تست موفق خواهد بود. اگر مطابقت نداشته باشند، یا اجراکننده تست یک باگ در کد شما پیدا کرده که باید رفع شود، یا پیاده‌سازی تغییر کرده و اسنپ‌شات نیاز به به‌روزرسانی دارد.

برای به‌روزرسانی اسنپ‌شات، پرچم `-s` (یا `--updateSnapshot`) را به دستور `wdio` ارسال کنید، مثلاً:

```sh
npx wdio run wdio.conf.js -s
```

__نکته:__ اگر تست‌ها را با چندین مرورگر به صورت موازی اجرا می‌کنید، فقط یک اسنپ‌شات ایجاد می‌شود و با آن مقایسه می‌شود. اگر می‌خواهید برای هر قابلیت یک اسنپ‌شات جداگانه داشته باشید، لطفاً [یک مسئله ایجاد کنید](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Idea+%F0%9F%92%A1%2CNeeds+Triaging+%E2%8F%B3&projects=&template=feature-request.yml&title=%5B%F0%9F%92%A1+Feature%5D%3A+%3Ctitle%3E) و ما را از مورد استفاده خود مطلع کنید.

## اسنپ‌شات‌های درون‌خطی

به طور مشابه، می‌توانید از `toMatchInlineSnapshot()` برای ذخیره اسنپ‌شات به صورت درون‌خطی در فایل تست استفاده کنید.

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

به جای ایجاد یک فایل اسنپ‌شات، Vitest فایل تست را مستقیماً برای به‌روزرسانی اسنپ‌شات به عنوان یک رشته تغییر می‌دهد:

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

این به شما امکان می‌دهد خروجی مورد انتظار را مستقیماً بدون جابجایی بین فایل‌های مختلف مشاهده کنید.

## اسنپ‌شات‌های بصری

گرفتن یک اسنپ‌شات DOM از یک عنصر ممکن است ایده خوبی نباشد، به خصوص اگر ساختار DOM بسیار بزرگ باشد و شامل ویژگی‌های عنصر پویا باشد. در این موارد، توصیه می‌شود برای عناصر به اسنپ‌شات‌های بصری تکیه کنید.

برای فعال‌سازی اسنپ‌شات‌های بصری، `@wdio/visual-service` را به تنظیمات خود اضافه کنید. می‌توانید دستورالعمل‌های راه‌اندازی را در [مستندات](/docs/visual-testing#installation) تست بصری دنبال کنید.

سپس می‌توانید از طریق `toMatchElementSnapshot()` یک اسنپ‌شات بصری بگیرید، مثلاً:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

سپس یک تصویر در دایرکتوری پایه ذخیره می‌شود. برای اطلاعات بیشتر به [تست بصری](/docs/visual-testing) مراجعه کنید.