---
id: integrate-with-percy
title: برای برنامه وب
description: "یکپارچه‌سازی تست‌های WebdriverIO برای برنامه‌های وب با BrowserStack Percy جهت تست بصری، از ایجاد پروژه تا اجرای بیلدها."
---

## تست‌های WebdriverIO خود را با Percy یکپارچه کنید

پیش از یکپارچه‌سازی، می‌توانید [آموزش بیلد نمونه Percy برای WebdriverIO](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) را بررسی کنید.
تست‌های خودکار WebdriverIO خود را با BrowserStack Percy یکپارچه کنید. در ادامه مروری بر مراحل یکپارچه‌سازی آمده است:

### مرحله ۱: ایجاد یک پروژه Percy
به Percy [وارد شوید](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation). در Percy، یک پروژه از نوع Web ایجاد کنید و سپس برای پروژه نامی تعیین کنید. پس از ایجاد پروژه، Percy یک توکن تولید می‌کند. آن را یادداشت کنید. باید از آن برای تنظیم متغیر محیطی خود در مرحله بعد استفاده کنید.

برای جزئیات درباره ایجاد پروژه، به [ایجاد یک پروژه Percy](https://www.browserstack.com/docs/percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) مراجعه کنید.

### مرحله ۲: تنظیم توکن پروژه به عنوان متغیر محیطی

دستور زیر را برای تنظیم PERCY_TOKEN به عنوان متغیر محیطی اجرا کنید:

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"   // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### مرحله ۳: نصب وابستگی‌های Percy

اجزای مورد نیاز برای ایجاد محیط یکپارچه‌سازی مجموعه تست خود را نصب کنید.

برای نصب وابستگی‌ها، دستور زیر را اجرا کنید:

```sh
npm install --save-dev @percy/cli @percy/webdriverio
```

### مرحله ۴: به‌روزرسانی اسکریپت تست

کتابخانه Percy را import کنید تا از متد و ویژگی‌های مورد نیاز برای گرفتن اسکرین‌شات استفاده کنید.
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

هنگام استفاده از WebdriverIO در [حالت standalone](https://webdriver.io/docs/setuptypes.html/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)، شیء browser را به عنوان اولین آرگومان به تابع `percySnapshot` ارسال کنید:

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
// شیء browser در حالت standalone الزامی است
percySnapshot(browser, 'WebdriverIO at DuckDuckGo');
await browser.deleteSession();
```
آرگومان‌های متد snapshot عبارت‌اند از:

```sh
percySnapshot(name[, options])
```
### حالت Standalone

```sh
percySnapshot(browser, name[, options])
```

- browser (الزامی) - شیء browser در WebdriverIO
- name (الزامی) - نام snapshot؛ باید برای هر snapshot یکتا باشد
- options - به گزینه‌های پیکربندی هر snapshot مراجعه کنید

برای اطلاعات بیشتر، به [Percy snapshot](https://www.browserstack.com/docs/percy/take-percy-snapshots/overview/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) مراجعه کنید.

### مرحله ۵: اجرای Percy
تست‌های خود را با استفاده از دستور `percy exec` مطابق زیر اجرا کنید:

اگر نمی‌توانید از دستور `percy:exec` استفاده کنید یا ترجیح می‌دهید تست‌های خود را با گزینه‌های اجرای IDE اجرا کنید، می‌توانید از دستورات `percy:exec:start` و `percy:exec:stop` استفاده کنید. برای اطلاعات بیشتر، به [اجرای Percy](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) مراجعه کنید.

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
- [تست‌های WebdriverIO خود را با Percy یکپارچه کنید](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [صفحه متغیرهای محیطی](https://www.browserstack.com/docs/percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [یکپارچه‌سازی با استفاده از BrowserStack SDK](https://www.browserstack.com/docs/percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) در صورتی که از BrowserStack Automate استفاده می‌کنید.


| منبع                                                                                                                                                            | توضیحات                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [مستندات رسمی](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | مستندات WebdriverIO در Percy |
| [بیلد نمونه - آموزش](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | آموزش WebdriverIO در Percy      |
| [ویدیوی رسمی](https://youtu.be/1Sr_h9_3MI0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | تست بصری با Percy         |
| [وبلاگ](https://www.browserstack.com/blog/introducing-visual-reviews-2-0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | معرفی Visual Reviews 2.0    |