---
id: assertion
title: اثبات (Assertion)
---

[تست‌رانر WDIO](https://webdriver.io/docs/clioptions) دارای یک کتابخانه اثبات داخلی است که به شما امکان می‌دهد اثبات‌های قدرتمندی روی جنبه‌های مختلف مرورگر یا عناصر داخل برنامه (وب) خود انجام دهید. این کتابخانه، قابلیت [Jests Matchers](https://jestjs.io/docs/en/using-matchers) را با تطبیق‌دهنده‌های بیشتر، بهینه‌سازی شده برای آزمایش e2e، گسترش می‌دهد، مثلاً:

```js
const $button = await $('button')
await expect($button).toBeDisplayed()
```

یا

```js
const selectOptions = await $$('form select>option')

// make sure there is at least one option in select
await expect(selectOptions).toHaveChildren({ gte: 1 })
```

برای لیست کامل، به [مستندات API expect](/docs/api/expect-webdriverio) مراجعه کنید.

## اثبات‌های نرم (Soft Assertions)

WebdriverIO از اثبات‌های نرم به صورت پیش‌فرض از expect-webdriver(5.2.0) پشتیبانی می‌کند. اثبات‌های نرم به آزمون‌های شما اجازه می‌دهند حتی زمانی که یک اثبات شکست می‌خورد، به اجرا ادامه دهند. تمام شکست‌ها جمع‌آوری و در پایان آزمون گزارش می‌شوند.

### استفاده

```js
// These won't throw immediately if they fail
await expect.soft(await $('h1').getText()).toEqual('Basketball Shoes');
await expect.soft(await $('#price').getText()).toMatch(/€\d+/);

// Regular assertions still throw immediately
await expect(await $('.add-to-cart').isClickable()).toBe(true);
```

## مهاجرت از Chai

[Chai](https://www.chaijs.com/) و [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) می‌توانند همزیستی داشته باشند و با برخی تغییرات جزئی، انتقال روان به expect-webdriverio امکان‌پذیر است. اگر به WebdriverIO v6 ارتقا داده‌اید، به طور پیش‌فرض به همه اثبات‌های `expect-webdriverio` از ابتدا دسترسی خواهید داشت. این بدان معناست که به طور کلی هر جا که از `expect` استفاده می‌کنید، یک اثبات `expect-webdriverio` را فراخوانی می‌کنید. البته، مگر اینکه [`injectGlobals`](/docs/configuration#injectglobals) را روی `false` تنظیم کرده باشید یا به صراحت `expect` سراسری را برای استفاده از Chai بازنویسی کرده باشید. در این صورت، بدون وارد کردن صریح بسته expect-webdriverio در جایی که به آن نیاز دارید، به هیچ یک از اثبات‌های expect-webdriverio دسترسی نخواهید داشت.

این راهنما نمونه‌هایی را نشان می‌دهد که چگونه از Chai مهاجرت کنید اگر به صورت محلی بازنویسی شده باشد و چگونه از Chai مهاجرت کنید اگر به صورت سراسری بازنویسی شده باشد.

### محلی

فرض کنید Chai به صورت صریح در یک فایل وارد شده است، مثلاً:

```js
// myfile.js - original code
import { expect as expectChai } from 'chai'

describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        expectChai(await browser.getUrl()).to.include('/login')
    })
})
```

برای مهاجرت این کد، واردات Chai را حذف کنید و از روش اثبات جدید expect-webdriverio `toHaveUrl` استفاده کنید:

```js
// myfile.js - migrated code
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // new expect-webdriverio API method https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

اگر می‌خواهید از هر دو Chai و expect-webdriverio در یک فایل استفاده کنید، باید واردات Chai را حفظ کنید و `expect` به طور پیش‌فرض به اثبات expect-webdriverio تبدیل می‌شود، مثلاً:

```js
// myfile.js
import { expect as expectChai } from 'chai'
import { expect as expectWDIO } from '@wdio/globals'

describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expectChai(isDisplayed).to.equal(true); // Chai assertion
    })
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWDIO($("#element")).not.toBeDisplayed(); // expect-webdriverio assertion
    })
})
```

### سراسری

فرض کنید `expect` به صورت سراسری برای استفاده از Chai بازنویسی شده است. برای استفاده از اثبات‌های expect-webdriverio، باید یک متغیر سراسری را در هوک "before" تنظیم کنیم، مثلاً:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

اکنون می‌توان از Chai و expect-webdriverio در کنار هم استفاده کرد. در کد خود از اثبات‌های Chai و expect-webdriverio به شرح زیر استفاده می‌کنید، مثلاً:

```js
// myfile.js
describe('Element', () => {
    it('should be displayed', async () => {
        const isDisplayed = await $("#element").isDisplayed()
        expect(isDisplayed).to.equal(true); // Chai assertion
    });
});

describe('Other element', () => {
    it('should not be displayed', async () => {
        await expectWdio($("#element")).not.toBeDisplayed(); // expect-webdriverio assertion
    });
});
```

برای مهاجرت، به تدریج هر اثبات Chai را به expect-webdriverio منتقل کنید. پس از جایگزینی همه اثبات‌های Chai در سراسر پایگاه کد، می‌توان هوک "before" را حذف کرد. یک جستجو و جایگزینی سراسری برای جایگزینی همه نمونه‌های `wdioExpect` با `expect` مهاجرت را به پایان می‌رساند.