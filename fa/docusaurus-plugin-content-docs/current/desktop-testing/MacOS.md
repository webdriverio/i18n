---
id: macos
title: MacOS
description: "خودکارسازی برنامه‌های بومی macOS با WebdriverIO با استفاده از Appium و درایور Mac2، با شروع از ویزارد راه‌اندازی پروژه."
---

WebdriverIO می‌تواند هر برنامه دلخواه MacOS را با استفاده از [Appium](https://appium.io/) خودکارسازی کند. تنها چیزی که نیاز دارید این است که [XCode](https://developer.apple.com/xcode/) روی سیستم شما نصب باشد، Appium و [Mac2 Driver](https://appium.github.io/appium-mac2-driver/) به‌عنوان وابستگی نصب شده باشند و capabilities صحیح تنظیم شده باشند.

## شروع به کار

برای ایجاد یک پروژه جدید WebdriverIO، دستور زیر را اجرا کنید:

```sh
npm create wdio@latest ./
```

یک ویزارد نصب شما را در طول فرآیند راهنمایی می‌کند. هنگامی که از شما می‌پرسد چه نوع تستی می‌خواهید انجام دهید، حتماً گزینه _"Desktop Testing - of MacOS Applications"_ را انتخاب کنید. پس از آن، فقط مقادیر پیش‌فرض را نگه دارید یا بر اساس ترجیح خود آن‌ها را تغییر دهید.

ویزارد پیکربندی تمام بسته‌های مورد نیاز Appium را نصب می‌کند و یک فایل `wdio.conf.js` یا `wdio.conf.ts` با پیکربندی لازم برای تست روی MacOS ایجاد می‌کند. اگر با تولید خودکار برخی فایل‌های تست موافقت کرده باشید، می‌توانید اولین تست خود را از طریق `npm run wdio` اجرا کنید.

<CreateMacOSProjectAnimation />

همین 🎉

## مثال

یک تست ساده که برنامه Calculator را باز می‌کند، یک محاسبه انجام می‌دهد و نتیجه آن را بررسی می‌کند، می‌تواند به این شکل باشد:

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

__نکته:__ برنامه ماشین‌حساب در ابتدای جلسه به‌طور خودکار باز شد، زیرا `'appium:bundleId': 'com.apple.calculator'` به‌عنوان گزینه capability تعریف شده بود. شما می‌توانید در هر زمانی در طول جلسه بین برنامه‌ها جابه‌جا شوید.

## اطلاعات بیشتر

برای کسب اطلاعات درباره جزئیات تست روی MacOS، توصیه می‌کنیم پروژه [Appium Mac2 Driver](https://appium.github.io/appium-mac2-driver/) را بررسی کنید.