---
id: integrate-with-app-percy
title: برای اپلیکیشن موبایل
---

## ادغام تست‌های WebdriverIO خود با App Percy

قبل از ادغام، می‌توانید [آموزش نمونه ساخت App Percy برای WebdriverIO](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) را بررسی کنید.
مجموعه تست خود را با BrowserStack App Percy ادغام کنید، در ادامه مروری بر مراحل ادغام آمده است:

### مرحله ۱: ایجاد پروژه اپلیکیشن جدید در داشبورد Percy

به [Percy وارد شوید](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) و [یک پروژه جدید از نوع اپلیکیشن ایجاد کنید](https://www.browserstack.com/docs/app-percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation). پس از ایجاد پروژه، یک متغیر محیطی `PERCY_TOKEN` به شما نشان داده می‌شود. Percy از `PERCY_TOKEN` برای شناسایی سازمان و پروژه‌ای که باید اسکرین‌شات‌ها به آن آپلود شوند استفاده می‌کند. شما به این `PERCY_TOKEN` در مراحل بعدی نیاز خواهید داشت.

### مرحله ۲: تنظیم توکن پروژه به عنوان متغیر محیطی

دستور زیر را برای تنظیم PERCY_TOKEN به عنوان متغیر محیطی اجرا کنید:

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"    // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### مرحله ۳: نصب بسته‌های Percy

اجزای مورد نیاز برای ایجاد محیط ادغام برای مجموعه تست خود را نصب کنید.
برای نصب وابستگی‌ها، دستور زیر را اجرا کنید:

```sh
npm install --save-dev @percy/cli
```

### مرحله ۴: نصب وابستگی‌ها

Percy Appium app را نصب کنید

```sh
npm install --save-dev @percy/appium-app
```

### مرحله ۵: به‌روزرسانی اسکریپت تست
مطمئن شوید که @percy/appium-app را در کد خود وارد کرده‌اید.

در زیر نمونه‌ای از یک تست با استفاده از تابع percyScreenshot آمده است. از این تابع هر جا که نیاز به گرفتن اسکرین‌شات دارید استفاده کنید.

```sh
import percyScreenshot from '@percy/appium-app';
describe('Appium webdriverio test example', function() {
  it('takes a screenshot', async () => {
    await percyScreenshot('Appium JS example');
  });
});
```
ما آرگومان‌های مورد نیاز را به متد percyScreenshot ارسال می‌کنیم.

آرگومان‌های متد اسکرین‌شات عبارتند از:

```sh
percyScreenshot(driver, name[, options])
```
### مرحله ۶: اجرای اسکریپت تست

تست‌های خود را با استفاده از `percy app:exec` اجرا کنید.

اگر نمی‌توانید از دستور percy app:exec استفاده کنید یا ترجیح می‌دهید تست‌های خود را با استفاده از گزینه‌های اجرای IDE اجرا کنید، می‌توانید از دستورات percy app:exec:start و percy app:exec:stop استفاده کنید. برای کسب اطلاعات بیشتر، به [اجرای Percy](https://www.browserstack.com/docs/app-percy/references/commands/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) مراجعه کنید.

```sh
$ percy app:exec -- appium test command
```
این دستور Percy را شروع می‌کند، یک ساخت جدید Percy ایجاد می‌کند، اسکرین‌شات‌ها را می‌گیرد و آن‌ها را به پروژه شما آپلود می‌کند، و سپس Percy را متوقف می‌کند:


```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Snapshot taken "Appium WebdriverIO Example"
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!
```

## برای جزئیات بیشتر به صفحات زیر مراجعه کنید:
- [ادغام تست‌های WebdriverIO خود با Percy](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [صفحه متغیر محیطی](https://www.browserstack.com/docs/app-percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [ادغام با استفاده از BrowserStack SDK](https://www.browserstack.com/docs/app-percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) اگر از BrowserStack Automate استفاده می‌کنید.


| منبع                                                                                                                                                            | توضیحات                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [مستندات رسمی](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | مستندات WebdriverIO مربوط به App Percy |
| [ساخت نمونه - آموزش](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | آموزش WebdriverIO مربوط به App Percy      |
| [ویدیوی رسمی](https://youtu.be/a4I_RGFdwvc/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | تست بصری با App Percy         |
| [بلاگ](https://www.browserstack.com/blog/product-launch-app-percy/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | با App Percy آشنا شوید: پلتفرم تست بصری خودکار مبتنی بر هوش مصنوعی برای اپلیکیشن‌های بومی    |