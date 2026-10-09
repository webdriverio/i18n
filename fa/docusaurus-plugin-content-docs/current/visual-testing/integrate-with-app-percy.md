---
id: integrate-with-app-percy
title: برای اپلیکیشن موبایل
description: "تست‌های اپلیکیشن موبایل WebdriverIO را برای تست بصری با BrowserStack App Percy یکپارچه کنید، با شروع از تنظیم PERCY_TOKEN."
---

## تست‌های WebdriverIO خود را با App Percy یکپارچه کنید

پیش از یکپارچه‌سازی، می‌توانید [آموزش نمونه بیلد App Percy برای WebdriverIO](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) را بررسی کنید.
مجموعه تست خود را با BrowserStack App Percy یکپارچه کنید. در ادامه مروری بر مراحل یکپارچه‌سازی آمده است:

### مرحله ۱: ایجاد یک پروژه اپلیکیشن جدید در داشبورد Percy

وارد Percy [شوید](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) و [یک پروژه جدید از نوع app ایجاد کنید](https://www.browserstack.com/docs/app-percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation). پس از ایجاد پروژه، یک متغیر محیطی `PERCY_TOKEN` به شما نمایش داده می‌شود. Percy از `PERCY_TOKEN` استفاده می‌کند تا بداند اسکرین‌شات‌ها را در کدام سازمان و پروژه بارگذاری کند. در مراحل بعدی به این `PERCY_TOKEN` نیاز خواهید داشت.

### مرحله ۲: تنظیم توکن پروژه به‌عنوان متغیر محیطی

دستور زیر را برای تنظیم PERCY_TOKEN به‌عنوان متغیر محیطی اجرا کنید:

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"    // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### مرحله ۳: نصب پکیج‌های Percy

اجزای لازم برای ایجاد محیط یکپارچه‌سازی مجموعه تست خود را نصب کنید.
برای نصب وابستگی‌ها، دستور زیر را اجرا کنید:

```sh
npm install --save-dev @percy/cli
```

### مرحله ۴: نصب وابستگی‌ها

اپلیکیشن Percy Appium را نصب کنید

```sh
npm install --save-dev @percy/appium-app
```

### مرحله ۵: به‌روزرسانی اسکریپت تست
حتماً @percy/appium-app را در کد خود import کنید.

در زیر نمونه‌ای از یک تست با استفاده از تابع percyScreenshot آمده است. هر جا که نیاز به گرفتن اسکرین‌شات دارید از این تابع استفاده کنید.

```sh
import percyScreenshot from '@percy/appium-app';
describe('Appium webdriverio test example', function() {
  it('takes a screenshot', async () => {
    await percyScreenshot('Appium JS example');
  });
});
```
ما آرگومان‌های لازم را به متد percyScreenshot ارسال می‌کنیم.

آرگومان‌های متد اسکرین‌شات عبارت‌اند از:

```sh
percyScreenshot(driver, name[, options])
```
### مرحله ۶: اجرای اسکریپت تست

تست‌های خود را با استفاده از `percy app:exec` اجرا کنید.

اگر نمی‌توانید از دستور percy app:exec استفاده کنید یا ترجیح می‌دهید تست‌های خود را با گزینه‌های اجرای IDE اجرا کنید، می‌توانید از دستورات percy app:exec:start و percy app:exec:stop استفاده کنید. برای اطلاعات بیشتر، به [اجرای Percy](https://www.browserstack.com/docs/app-percy/references/commands/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) مراجعه کنید.

```sh
$ percy app:exec -- appium test command
```
این دستور Percy را راه‌اندازی می‌کند، یک بیلد جدید Percy ایجاد می‌کند، اسنپ‌شات‌ها را می‌گیرد و آن‌ها را در پروژه شما بارگذاری می‌کند و سپس Percy را متوقف می‌کند:


```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Snapshot taken "Appium WebdriverIO Example"
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!
```

## برای جزئیات بیشتر به صفحات زیر مراجعه کنید:
- [تست‌های WebdriverIO خود را با Percy یکپارچه کنید](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [صفحه متغیرهای محیطی](https://www.browserstack.com/docs/app-percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [یکپارچه‌سازی با استفاده از BrowserStack SDK](https://www.browserstack.com/docs/app-percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) اگر از BrowserStack Automate استفاده می‌کنید.


| منبع                                                                                                                                                            | توضیحات                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [مستندات رسمی](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | مستندات WebdriverIO در App Percy |
| [نمونه بیلد - آموزش](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | آموزش WebdriverIO در App Percy      |
| [ویدیوی رسمی](https://youtu.be/a4I_RGFdwvc/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | تست بصری با App Percy         |
| [وبلاگ](https://www.browserstack.com/blog/product-launch-app-percy/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | با App Percy آشنا شوید: پلتفرم تست بصری خودکار مبتنی بر هوش مصنوعی برای اپلیکیشن‌های نیتیو    |