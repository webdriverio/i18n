---
id: assertion
title: اعتبارسنجی (Assertion)
description: "با کتابخانه‌ی داخلی expect-webdriverio برای وضعیت مرورگر و عناصر اعتبارسنجی بنویسید، از اعتبارسنجی‌های نرم (soft assertions) استفاده کنید و از Chai مهاجرت کنید."
---

[اجراکننده‌ی تست WDIO](https://webdriver.io/docs/clioptions) یک کتابخانه‌ی اعتبارسنجی داخلی دارد که به شما امکان می‌دهد اعتبارسنجی‌های قدرتمندی روی جنبه‌های مختلف مرورگر یا عناصر درون برنامه‌ی (وب) خود انجام دهید. این کتابخانه قابلیت‌های [Jests Matchers](https://jestjs.io/docs/en/using-matchers) را با matcherهای اضافی که برای تست e2e بهینه شده‌اند گسترش می‌دهد، برای مثال:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

یا

```js
const selectOptions = await $$('form select>option')

// اطمینان حاصل کنید که حداقل یک گزینه در select وجود دارد
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

برای مشاهده‌ی فهرست کامل، [مستندات API مربوط به expect](/docs/api/expect-webdriverio) را ببینید.

:::info Jasmine

در فریم‌ورک Jasmine، `expect` ترکیبی از matcherهای Jasmine و matcherهای WebdriverIO است. matcherهای همگام (sync) در Jasmine نیازی به `await` ندارند و بخش‌های مربوط به Jest در `expect`، مانند `expect.soft()`، در دسترس نیستند. [استفاده از Jasmine](/docs/frameworks#assertions) را ببینید.

:::

## اعتبارسنجی‌های نرم (Soft Assertions)

WebdriverIO به‌طور پیش‌فرض اعتبارسنجی‌های نرم را از `expect-webdriverio` (از نسخه‌ی 5.2.0) در اختیار دارد. اعتبارسنجی‌های نرم به تست‌های شما اجازه می‌دهند حتی در صورت شکست یک اعتبارسنجی، به اجرای خود ادامه دهند. همه‌ی شکست‌ها جمع‌آوری شده و در پایان تست گزارش می‌شوند.

### نحوه‌ی استفاده

```js
// این‌ها در صورت شکست، بلافاصله خطا پرتاب نمی‌کنند
await expect.soft(await $('h1').getText()).toEqual('Basketball Shoes');
await expect.soft(await $('#price').getText()).toMatch(/€\d+/);

// اعتبارسنجی‌های معمولی همچنان بلافاصله خطا پرتاب می‌کنند
await expect(await $('.add-to-cart').isClickable()).toBe(true);
```

## مهاجرت از Chai

[Chai](https://www.chaijs.com/) و [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) می‌توانند در کنار هم وجود داشته باشند و با چند تغییر جزئی می‌توان به‌آسانی به expect-webdriverio منتقل شد. اگر به WebdriverIO v6 ارتقا داده‌اید، به‌طور پیش‌فرض از همان ابتدا به تمام اعتبارسنجی‌های `expect-webdriverio` دسترسی خواهید داشت. این یعنی در هر جایی که به‌صورت سراسری از `expect` استفاده کنید، یک اعتبارسنجی `expect-webdriverio` را فراخوانی می‌کنید. مگر آنکه [`injectGlobals`](/docs/configuration#injectglobals) را روی `false` تنظیم کرده باشید یا `expect` سراسری را به‌صراحت برای استفاده از Chai بازنویسی کرده باشید. در این صورت، بدون import صریح بسته‌ی expect-webdriverio در جایی که به آن نیاز دارید، به هیچ‌یک از اعتبارسنجی‌های expect-webdriverio دسترسی نخواهید داشت.

این راهنما مثال‌هایی از نحوه‌ی مهاجرت از Chai را در حالتی که به‌صورت محلی بازنویسی شده و در حالتی که به‌صورت سراسری بازنویسی شده است، نشان می‌دهد.

### محلی

فرض کنید Chai به‌صراحت در یک فایل import شده است، برای مثال:

```js
// myfile.js - کد اصلی
import { expect as expectChai } from 'chai'

describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        expectChai(await browser.getUrl()).to.include('/login')
    })
})
```

برای مهاجرت این کد، import مربوط به Chai را حذف کنید و به‌جای آن از متد اعتبارسنجی جدید expect-webdriverio یعنی `toHaveUrl` استفاده کنید:

```js
// myfile.js - کد مهاجرت‌داده‌شده
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // متد جدید API در expect-webdriverio https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

اگر بخواهید از Chai و expect-webdriverio هر دو در یک فایل استفاده کنید، import مربوط به Chai را نگه می‌دارید و `expect` به‌طور پیش‌فرض به اعتبارسنجی expect-webdriverio اشاره خواهد کرد، برای مثال:

```js
// myfile.js
import { expect as expectChai } from 'chai'
import { expect as expectWDIO } from '@wdio/globals'

describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expectChai(isDisplayed).to.equal(true); // اعتبارسنجی Chai
    })
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWDIO($("#element")).not.toBeDisplayed(); // اعتبارسنجی expect-webdriverio
    })
})
```

### سراسری

فرض کنید `expect` به‌صورت سراسری برای استفاده از Chai بازنویسی شده است. برای استفاده از اعتبارسنجی‌های expect-webdriverio باید یک متغیر را به‌صورت سراسری در هوک "before" تنظیم کنیم، برای مثال:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

اکنون Chai و expect-webdriverio می‌توانند در کنار یکدیگر استفاده شوند. در کد خود، اعتبارسنجی‌های Chai و expect-webdriverio را به شکل زیر به کار می‌برید، برای مثال:

```js
// myfile.js
describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expect(isDisplayed).to.equal(true); // اعتبارسنجی Chai
    });
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWdio($("#element")).not.toBeDisplayed(); // اعتبارسنجی expect-webdriverio
    });
});
```

برای مهاجرت، به‌تدریج هر اعتبارسنجی Chai را به expect-webdriverio منتقل می‌کنید. پس از اینکه همه‌ی اعتبارسنجی‌های Chai در سراسر کد جایگزین شدند، می‌توان هوک "before" را حذف کرد. سپس یک جست‌وجو و جایگزینی سراسری برای تبدیل همه‌ی موارد `wdioExpect` به `expect`، مهاجرت را به پایان می‌رساند.