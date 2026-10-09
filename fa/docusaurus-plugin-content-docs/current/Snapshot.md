---
id: snapshot
title: اسنپ‌شات
description: "اشیاء، ساختارهای DOM و نتایج دستورات را با تست‌های اسنپ‌شات و اسنپ‌شات درون‌خطی بررسی کنید و اسنپ‌شات‌های بصری را مقایسه کنید."
---

تست‌های اسنپ‌شات می‌توانند برای بررسی طیف گسترده‌ای از جنبه‌های کامپوننت یا منطق شما به‌طور همزمان بسیار مفید باشند. در WebdriverIO می‌توانید از هر شیء دلخواه و همچنین از ساختار DOM یک WebElement یا نتایج دستورات WebdriverIO اسنپ‌شات بگیرید.

مشابه سایر فریم‌ورک‌های تست، WebdriverIO از مقدار داده‌شده یک اسنپ‌شات می‌گیرد و سپس آن را با یک فایل اسنپ‌شات مرجع که در کنار تست ذخیره شده است مقایسه می‌کند. اگر دو اسنپ‌شات مطابقت نداشته باشند، تست شکست می‌خورد: یا تغییر غیرمنتظره است، یا اسنپ‌شات مرجع باید به نسخه جدید نتیجه به‌روزرسانی شود.

:::info پشتیبانی چندسکویی

این قابلیت‌های اسنپ‌شات برای اجرای تست‌های end-to-end در محیط Node.js و همچنین برای اجرای تست‌های [واحد و کامپوننت](/docs/component-testing) در مرورگر یا روی دستگاه‌های موبایل در دسترس هستند.

:::

## استفاده از اسنپ‌شات‌ها
برای گرفتن اسنپ‌شات از یک مقدار، می‌توانید از `toMatchSnapshot()` در API [`expect()`](/docs/api/expect-webdriverio) استفاده کنید:

```ts
import { browser, expect } from '@wdio/globals'

it('can take a DOM snapshot', () => {
    await browser.url('https://guinea-pig.webdriver.io/')
    await expect($('.findme')).toMatchSnapshot()
})
```

اولین باری که این تست اجرا می‌شود، WebdriverIO یک فایل اسنپ‌شات ایجاد می‌کند که به این شکل است:

```js
// Snapshot v1

exports[`main suite 1 > can take a DOM snapshot 1`] = `"<h1 class="findme">Test CSS Attributes</h1>"`;
```

فایل اسنپ‌شات باید همراه با تغییرات کد commit شود و به‌عنوان بخشی از فرآیند بازبینی کد شما بررسی شود. در اجراهای بعدی تست، WebdriverIO خروجی رندرشده را با اسنپ‌شات قبلی مقایسه می‌کند. اگر مطابقت داشته باشند، تست موفق می‌شود. اگر مطابقت نداشته باشند، یا اجراکننده تست باگی در کد شما پیدا کرده که باید رفع شود، یا پیاده‌سازی تغییر کرده و اسنپ‌شات باید به‌روزرسانی شود.

برای به‌روزرسانی اسنپ‌شات، فلگ `-s` (یا `--updateSnapshot`) را به دستور `wdio` بدهید، برای مثال:

```sh
npx wdio run wdio.conf.js -s
```

__نکته:__ اگر تست‌ها را با چندین مرورگر به‌صورت موازی اجرا کنید، تنها یک اسنپ‌شات ایجاد و مقایسه می‌شود. اگر مایلید برای هر capability یک اسنپ‌شات جداگانه داشته باشید، لطفاً [یک issue ثبت کنید](https://github.com/webdriverio/webdriverio/issues/new?assignees=&labels=Idea+%F0%9F%92%A1%2CNeeds+Triaging+%E2%8F%B3&projects=&template=feature-request.yml&title=%5B%F0%9F%92%A1+Feature%5D%3A+%3Ctitle%3E) و ما را از مورد استفاده خود مطلع کنید.

## اسنپ‌شات‌های درون‌خطی

به همین ترتیب، می‌توانید از `toMatchInlineSnapshot()` برای ذخیره اسنپ‌شات به‌صورت درون‌خطی در فایل تست استفاده کنید.

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

به‌جای ایجاد یک فایل اسنپ‌شات، Vitest فایل تست را مستقیماً تغییر می‌دهد تا اسنپ‌شات را به‌صورت یک رشته به‌روزرسانی کند:

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

این کار به شما اجازه می‌دهد خروجی مورد انتظار را مستقیماً و بدون جابه‌جایی بین فایل‌های مختلف ببینید.

## اسنپ‌شات‌های بصری

گرفتن اسنپ‌شات DOM از یک عنصر ممکن است بهترین ایده نباشد، به‌ویژه اگر ساختار DOM بیش از حد بزرگ باشد و شامل ویژگی‌های پویای عنصر باشد. در این موارد، توصیه می‌شود برای عناصر به اسنپ‌شات‌های بصری تکیه کنید.

برای فعال‌سازی اسنپ‌شات‌های بصری، `@wdio/visual-service` را به تنظیمات خود اضافه کنید. می‌توانید دستورالعمل‌های راه‌اندازی را در [مستندات](/docs/visual-testing#installation) تست بصری دنبال کنید.

سپس می‌توانید از طریق `toMatchElementSnapshot()` یک اسنپ‌شات بصری بگیرید، برای مثال:

```ts
import { expect, $ } from '@wdio/globals'

it('can take inline DOM snapshots', () => {
  const elem = $('.container')
  await expect(elem.getCSSProperty()).toMatchInlineSnapshot()
})
```

سپس یک تصویر در دایرکتوری baseline ذخیره می‌شود. برای اطلاعات بیشتر، [تست بصری](/docs/visual-testing) را بررسی کنید.