---
id: v6-migration
title: از نسخه ۵ به نسخه ۶
description: "ارتقای یک پروژه WebdriverIO از نسخه ۵ به نسخه ۶ با به‌روزرسانی وابستگی‌ها، تبدیل فایل پیکربندی و به‌روزرسانی فایل‌های spec و page objectها."
---

این آموزش برای کسانی است که هنوز از نسخه `v5` WebdriverIO استفاده می‌کنند و می‌خواهند به `v6` یا آخرین نسخه WebdriverIO مهاجرت کنند. همان‌طور که در [پست وبلاگ انتشار](https://webdriver.io/blog/2020/03/26/webdriverio-v6-released) ما ذکر شد، تغییرات این ارتقای نسخه را می‌توان به شرح زیر خلاصه کرد:

- پارامترهای برخی از دستورات (مانند `newWindow`، `react$`، `react$$`، `waitUntil`، `dragAndDrop`، `moveTo`، `waitForDisplayed`، `waitForEnabled`، `waitForExist`) را یکپارچه کردیم و تمام پارامترهای اختیاری را به یک شیء واحد منتقل کردیم، به عنوان مثال:

    ```js
    // v5
    browser.newWindow(
        'https://webdriver.io',
        'WebdriverIO window',
        'width=420,height=230,resizable,scrollbars=yes,status=1'
    )
    // v6
    browser.newWindow('https://webdriver.io', {
        windowName: 'WebdriverIO window',
        windowFeature: 'width=420,height=230,resizable,scrollbars=yes,status=1'
    })
    ```

- پیکربندی‌های سرویس‌ها به داخل لیست سرویس‌ها منتقل شدند، به عنوان مثال:

    ```js
    // v5
    exports.config = {
        services: ['sauce'],
        sauceConnect: true,
        sauceConnectOpts: { foo: 'bar' },
    }
    // v6
    exports.config = {
        services: [['sauce', {
            sauceConnect: true,
            sauceConnectOpts: { foo: 'bar' }
        }]],
    }
    ```

- نام برخی از گزینه‌های سرویس‌ها به منظور ساده‌سازی تغییر کرد
- نام دستور `launchApp` را برای نشست‌های Chrome WebDriver به `launchChromeApp` تغییر دادیم

:::info

اگر از WebdriverIO نسخه `v4` یا پایین‌تر استفاده می‌کنید، لطفاً ابتدا به `v5` ارتقا دهید.

:::

اگرچه دوست داشتیم یک فرآیند کاملاً خودکار برای این کار داشته باشیم، اما واقعیت متفاوت است. هر کس تنظیمات متفاوتی دارد. هر مرحله باید به عنوان راهنمایی در نظر گرفته شود و کمتر به عنوان دستورالعمل گام به گام. اگر در مهاجرت با مشکلی مواجه شدید، در [تماس با ما](https://github.com/webdriverio/codemod/discussions/new) تردید نکنید.

## راه‌اندازی

مشابه سایر مهاجرت‌ها، می‌توانیم از [codemod](https://github.com/webdriverio/codemod) WebdriverIO استفاده کنیم. برای نصب codemod، دستور زیر را اجرا کنید:

```sh
npm install jscodeshift @wdio/codemod
```

## ارتقای وابستگی‌های WebdriverIO

با توجه به اینکه تمام نسخه‌های WebdriverIO به یکدیگر وابسته هستند، بهتر است همیشه به یک تگ مشخص، مثلاً `6.12.0`، ارتقا دهید. اگر تصمیم دارید مستقیماً از `v5` به `v7` ارتقا دهید، می‌توانید تگ را حذف کرده و آخرین نسخه‌های تمام بسته‌ها را نصب کنید. برای این کار، تمام وابستگی‌های مرتبط با WebdriverIO را از `package.json` خود کپی کرده و آن‌ها را از طریق دستور زیر دوباره نصب می‌کنیم:

```sh
npm i --save-dev @wdio/allure-reporter@6 @wdio/cli@6 @wdio/cucumber-framework@6 @wdio/local-runner@6 @wdio/spec-reporter@6 @wdio/sync@6 wdio-chromedriver-service@6 webdriverio@6
```

معمولاً وابستگی‌های WebdriverIO بخشی از وابستگی‌های توسعه (dev dependencies) هستند، اما بسته به پروژه شما این ممکن است متفاوت باشد. پس از این کار، `package.json` و `package-lock.json` شما باید به‌روزرسانی شده باشند. __توجه:__ این‌ها وابستگی‌های نمونه هستند و وابستگی‌های شما ممکن است متفاوت باشند. مطمئن شوید که آخرین نسخه v6 را پیدا می‌کنید، به عنوان مثال با فراخوانی:

```sh
npm show webdriverio versions
```

سعی کنید آخرین نسخه ۶ موجود را برای تمام بسته‌های اصلی WebdriverIO نصب کنید. برای بسته‌های جامعه (community) این موضوع ممکن است از بسته‌ای به بسته دیگر متفاوت باشد. در اینجا توصیه می‌کنیم changelog را برای اطلاع از اینکه کدام نسخه هنوز با v6 سازگار است بررسی کنید.

## تبدیل فایل پیکربندی

یک قدم اول خوب، شروع با فایل پیکربندی است. تمام تغییرات ناسازگار (breaking changes) را می‌توان با استفاده از codemod به‌طور کاملاً خودکار برطرف کرد:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./wdio.conf.js
```

:::caution

codemod هنوز از پروژه‌های TypeScript پشتیبانی نمی‌کند. به [`@webdriverio/codemod#10`](https://github.com/webdriverio/codemod/issues/10) مراجعه کنید. ما در تلاش هستیم تا به زودی پشتیبانی از آن را پیاده‌سازی کنیم. اگر از TypeScript استفاده می‌کنید، لطفاً مشارکت کنید!

:::

## به‌روزرسانی فایل‌های Spec و Page Objectها

برای به‌روزرسانی تمام تغییرات دستورات، codemod را روی تمام فایل‌های e2e خود که حاوی دستورات WebdriverIO هستند اجرا کنید، به عنوان مثال:

```sh
npx jscodeshift -t ./node_modules/@wdio/codemod/v6 ./e2e/*
```

همین! تغییر دیگری لازم نیست 🎉

## نتیجه‌گیری

امیدواریم این آموزش شما را کمی در فرآیند مهاجرت به WebdriverIO `v6` راهنمایی کرده باشد. اکیداً توصیه می‌کنیم ارتقا به آخرین نسخه را ادامه دهید، چرا که به‌روزرسانی به `v7` به دلیل تقریباً نبود تغییرات ناسازگار، بسیار ساده است. لطفاً راهنمای مهاجرت [برای ارتقا به v7](v7-migration) را بررسی کنید.

جامعه همچنان در حال بهبود codemod است و آن را با تیم‌های مختلف در سازمان‌های مختلف آزمایش می‌کند. اگر بازخوردی دارید، در [ثبت یک issue](https://github.com/webdriverio/codemod/issues/new) تردید نکنید، یا اگر در طول فرآیند مهاجرت با مشکل مواجه شدید، [یک بحث را آغاز کنید](https://github.com/webdriverio/codemod/discussions/new).