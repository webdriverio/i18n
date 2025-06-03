---
id: macos
title: مک‌او‌اس
---

WebdriverIO می‌تواند برنامه‌های مک‌او‌اس را به صورت خودکار با استفاده از [Appium](https://appium.io/) آزمایش کند. تمام چیزی که نیاز دارید این است که [XCode](https://developer.apple.com/xcode/) روی سیستم شما نصب شده باشد، Appium و [Mac2 Driver](https://github.com/appium/appium-mac2-driver) به عنوان وابستگی نصب شده باشند و قابلیت‌های درست تنظیم شده باشند.

## شروع به کار

برای ایجاد یک پروژه جدید WebdriverIO، اجرا کنید:

```sh
npm create wdio@latest ./
```

یک ویزارد نصب شما را در این فرآیند راهنمایی خواهد کرد. اطمینان حاصل کنید که _"Desktop Testing - of MacOS Applications"_ را هنگامی که از شما در مورد نوع تستی که می‌خواهید انجام دهید، انتخاب کنید. بعد از آن فقط تنظیمات پیش‌فرض را نگه دارید یا بر اساس ترجیح خود تغییر دهید.

ویزارد پیکربندی تمام بسته‌های Appium مورد نیاز را نصب می‌کند و یک `wdio.conf.js` یا `wdio.conf.ts` با پیکربندی لازم برای تست در مک‌او‌اس ایجاد می‌کند. اگر با تولید خودکار برخی از فایل‌های تست موافقت کردید، می‌توانید اولین تست خود را از طریق `npm run wdio` اجرا کنید.

<CreateMacOSProjectAnimation />

همین! 🎉

## مثال

این نمونه یک تست ساده است که برنامه ماشین حساب را باز می‌کند، یک محاسبه انجام می‌دهد و نتیجه آن را تأیید می‌کند:

```js
describe('My Login application', () => {
    it('should set a text to a text view', async function () {
        await $('//XCUIElementTypeButton[@label="seven"]').click()
        await $('//XCUIElementTypeButton[@label="multiply"]').click()
        await $('//XCUIElementTypeButton[@label="six"]').click()
        await $('//XCUIElementTypeButton[@title="="]').click()
        await expect($('//XCUIElementTypeStaticText[@label="main display"]')).toHaveText('42')
    });
})
```

__نکته:__ برنامه ماشین حساب در ابتدای جلسه به طور خودکار باز شد زیرا `'appium:bundleId': 'com.apple.calculator'` به عنوان گزینه قابلیت تعریف شده بود. شما می‌توانید در هر زمان در طول جلسه بین برنامه‌ها جابجا شوید.

## اطلاعات بیشتر

برای کسب اطلاعات بیشتر در مورد خصوصیات تست روی مک‌او‌اس، توصیه می‌کنیم پروژه [Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver) را بررسی کنید.