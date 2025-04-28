---
id: assertion
title: تأیید (اسرشن)
---

[WDIO testrunner](https://webdriver.io/docs/clioptions) دارای یک کتابخانه تأیید داخلی است که به شما امکان می‌دهد تأییدهای قدرتمندی روی جنبه‌های مختلف مرورگر یا عناصر داخل برنامه (وب) خود انجام دهید. این کتابخانه عملکرد [Jests Matchers](https://jestjs.io/docs/en/using-matchers) را با تطبیق‌دهنده‌های اضافی بهینه‌سازی شده برای تست e2e گسترش می‌دهد، مثلاً:

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

## مهاجرت از Chai

[Chai](https://www.chaijs.com/) و [expect-webdriverio](https://github.com/webdriverio/expect-webdriverio#readme) می‌توانند همزیستی داشته باشند و با برخی تنظیمات جزئی، انتقال آسان به expect-webdriverio امکان‌پذیر است. اگر به WebdriverIO v6 ارتقا داده‌اید، به صورت پیش‌فرض به تمام تأییدهای `expect-webdriverio` دسترسی خواهید داشت. این بدان معناست که در هر جایی که از `expect` استفاده می‌کنید، یک تأیید `expect-webdriverio` را فراخوانی می‌کنید. این در صورتی است که [`injectGlobals`](/docs/configuration#injectglobals) را روی `false` تنظیم نکرده باشید یا به طور صریح `expect` جهانی را برای استفاده از Chai بازنویسی نکرده باشید. در این حالت، بدون وارد کردن صریح بسته expect-webdriverio در جایی که به آن نیاز دارید، به هیچ یک از تأییدهای expect-webdriverio دسترسی نخواهید داشت.

این راهنما نمونه‌هایی از نحوه مهاجرت از Chai را نشان می‌دهد، چه در حالتی که به صورت محلی بازنویسی شده باشد و چه در حالتی که به صورت جهانی بازنویسی شده باشد.

### محلی

فرض کنید Chai به صورت صریح در یک فایل وارد شده است، به عنوان مثال:

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

برای مهاجرت این کد، واردسازی Chai را حذف کنید و به جای آن از روش تأیید جدید expect-webdriverio به نام `toHaveUrl` استفاده کنید:

```js
// myfile.js - migrated code
describe('Homepage', () => {
    it('should assert', async () => {
        await browser.url('./')
        await expect(browser).toHaveUrl('/login') // new expect-webdriverio API method https://webdriver.io/docs/api/expect-webdriverio.html#tohaveurl
    });
});
```

اگر می‌خواهید هم از Chai و هم از expect-webdriverio در یک فایل استفاده کنید، واردسازی Chai را حفظ کنید و `expect` به طور پیش‌فرض به تأیید expect-webdriverio اشاره خواهد کرد، مثلاً:

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

### جهانی

فرض کنید `expect` به صورت جهانی برای استفاده از Chai بازنویسی شده است. برای استفاده از تأییدهای expect-webdriverio باید یک متغیر جهانی در هوک "before" تنظیم کنیم، مثلاً:

```js
// wdio.conf.js
before: async () => {
    await import('expect-webdriverio');
    global.wdioExpect = global.expect;
    const chai = await import('chai');
    global.expect = chai.expect;
}
```

اکنون می‌توان Chai و expect-webdriverio را در کنار یکدیگر استفاده کرد. در کد خود، از تأییدهای Chai و expect-webdriverio به شرح زیر استفاده می‌کنید، مثلاً:

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

برای مهاجرت، باید به تدریج هر تأیید Chai را به expect-webdriverio منتقل کنید. پس از جایگزینی تمام تأییدهای Chai در سراسر پایگاه کد، می‌توان هوک "before" را حذف کرد. یک جستجو و جایگزینی جهانی برای جایگزینی تمام نمونه‌های `wdioExpect` با `expect` مهاجرت را به پایان می‌رساند.