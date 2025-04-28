---
id: integrate-with-percy
title: برای برنامه وب
---

## ادغام تست‌های WebdriverIO خود با Percy

قبل از ادغام، می‌توانید [آموزش نمونه ساخت Percy برای WebdriverIO](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) را بررسی کنید.
تست‌های خودکار WebdriverIO خود را با BrowserStack Percy ادغام کنید و در اینجا مروری بر مراحل ادغام آمده است:

### مرحله ۱: ایجاد یک پروژه Percy
به [Percy وارد شوید](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation). در Percy، یک پروژه از نوع Web ایجاد کنید و سپس پروژه را نام‌گذاری کنید. پس از ایجاد پروژه، Percy یک توکن تولید می‌کند. آن را یادداشت کنید. شما باید از آن برای تنظیم متغیر محیطی خود در مرحله بعدی استفاده کنید.

برای جزئیات بیشتر در مورد ایجاد پروژه، به [ایجاد یک پروژه Percy](https://www.browserstack.com/docs/percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) مراجعه کنید.

### مرحله ۲: تنظیم توکن پروژه به عنوان یک متغیر محیطی

دستور زیر را برای تنظیم PERCY_TOKEN به عنوان یک متغیر محیطی اجرا کنید:

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"   // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### مرحله ۳: نصب وابستگی‌های Percy

اجزای مورد نیاز برای ایجاد محیط ادغام برای مجموعه تست خود را نصب کنید.

برای نصب وابستگی‌ها، دستور زیر را اجرا کنید:

```sh
npm install --save-dev @percy/cli @percy/webdriverio
```

### مرحله ۴: به‌روزرسانی اسکریپت تست خود

کتابخانه Percy را وارد کنید تا از متد و ویژگی‌های مورد نیاز برای گرفتن اسکرین‌شات استفاده کنید.
مثال زیر از تابع percySnapshot() در حالت async استفاده می‌کند:

```sh
import percySnapshot from '@percy/webdriverio';
describe('webdriver.io page', () => {
  it('should have the right title', async () => {
    await browser.url('https://webdriver.io');
    await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js');
    await percySnapshot('webdriver.io page');
  });
});
```

هنگام استفاده از WebdriverIO در [حالت مستقل](https://webdriver.io/docs/setuptypes.html/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)، شیء مرورگر را به عنوان اولین آرگومان به تابع `percySnapshot` ارائه دهید:

```sh
import { remote } from 'webdriverio'

import percySnapshot from '@percy/webdriverio';

const browser = await remote({
  logLevel: 'trace',
  capabilities: {
    browserName: 'chrome'
  }
});

await browser.url('https://duckduckgo.com');
const inputElem = await browser.$('#search_form_input_homepage');
await inputElem.setValue('WebdriverIO');
const submitBtn = await browser.$('#search_button_homepage');
await submitBtn.click();
// the browser object is required in standalone mode
percySnapshot(browser, 'WebdriverIO at DuckDuckGo');
await browser.deleteSession();
```
آرگومان‌های متد اسنپ‌شات عبارتند از:

```sh
percySnapshot(name[, options])
```
### حالت مستقل

```sh
percySnapshot(browser, name[, options])
```

- browser (الزامی) - شیء مرورگر WebdriverIO
- name (الزامی) - نام اسنپ‌شات؛ باید برای هر اسنپ‌شات منحصر به فرد باشد
- options - به گزینه‌های پیکربندی هر اسنپ‌شات مراجعه کنید

برای یادگیری بیشتر، به [اسنپ‌شات Percy](https://www.browserstack.com/docs/percy/take-percy-snapshots/overview/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) مراجعه کنید.

### مرحله ۵: اجرای Percy
تست‌های خود را با استفاده از دستور `percy exec` به شرح زیر اجرا کنید:

اگر قادر به استفاده از دستور `percy:exec` نیستید یا ترجیح می‌دهید با استفاده از گزینه‌های اجرای IDE تست‌های خود را اجرا کنید، می‌توانید از دستورات `percy:exec:start` و `percy:exec:stop` استفاده کنید. برای کسب اطلاعات بیشتر، به [اجرای Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) مراجعه کنید.

```sh
percy exec -- wdio wdio.conf.js
```

```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Running "wdio wdio.conf.js"
...
[...] webdriver.io page
[percy] Snapshot taken "webdriver.io page"
[...]    ✓ should have the right title
...
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!

```

## برای جزئیات بیشتر به صفحات زیر مراجعه کنید:
- [ادغام تست‌های WebdriverIO خود با Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [صفحه متغیر محیطی](https://www.browserstack.com/docs/percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [ادغام با استفاده از BrowserStack SDK](https://www.browserstack.com/docs/percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) اگر از BrowserStack Automate استفاده می‌کنید.


| منبع                                                                                                                                                               | توضیحات                                  |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------|
| [مستندات رسمی](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | مستندات WebdriverIO Percy                 |
| [نمونه ساخت - آموزش](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | آموزش WebdriverIO Percy                    |
| [ویدیوی رسمی](https://youtu.be/1Sr_h9_3MI0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | تست بصری با Percy                        |
| [وبلاگ](https://www.browserstack.com/blog/introducing-visual-reviews-2-0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | معرفی بررسی‌های بصری 2.0                 |