---
id: bamboo
title: Bamboo
description: "تست‌های WebdriverIO را در Atlassian Bamboo اجرا کنید و نتایج JUnit را منتشر کنید تا بتوانید تست‌های موفق، ناموفق و اصلاح‌شده را در هر بیلد پیگیری کنید."
---

WebdriverIO یکپارچگی دقیقی با سیستم‌های CI مانند [Bamboo](https://www.atlassian.com/software/bamboo) ارائه می‌دهد. با استفاده از گزارشگر [JUnit](https://webdriver.io/docs/junit-reporter.html) یا [Allure](https://webdriver.io/docs/allure-reporter.html)، می‌توانید به‌راحتی تست‌های خود را دیباگ کنید و همچنین نتایج تست‌های خود را پیگیری کنید. این یکپارچه‌سازی بسیار آسان است.

1. گزارشگر تست JUnit را نصب کنید: `$ npm install @wdio/junit-reporter --save-dev`)
1. پیکربندی خود را به‌روزرسانی کنید تا نتایج JUnit در جایی ذخیره شوند که Bamboo بتواند آن‌ها را پیدا کند، (و گزارشگر `junit` را مشخص کنید):

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './testresults/'
        }]
    ],
    // ...
}
```
توجه: *همیشه یک استاندارد خوب این است که نتایج تست را به جای پوشه ریشه، در یک پوشه جداگانه نگه دارید.*

```js
// wdio.conf.js - For tests running in parallel
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './testresults/',
            outputFileFormat: function (options) {
                return `results-${options.cid}.xml`;
            }
        }]
    ],
    // ...
}
```

گزارش‌ها برای همه فریم‌ورک‌ها مشابه خواهند بود و می‌توانید از هر کدام استفاده کنید: Mocha، Jasmine یا Cucumber.

تا این مرحله، فرض بر این است که تست‌های خود را نوشته‌اید و نتایج در پوشه ```./testresults/``` تولید می‌شوند و Bamboo شما نیز راه‌اندازی شده و در حال اجراست.

## تست‌های خود را در Bamboo یکپارچه کنید

1. پروژه Bamboo خود را باز کنید
    > یک plan جدید ایجاد کنید، مخزن خود را متصل کنید (مطمئن شوید که همیشه به جدیدترین نسخه مخزن شما اشاره می‌کند) و stageهای خود را ایجاد کنید

    ![Plan Details](/img/bamboo/plancreation.png "Plan Details")

    من از stage و job پیش‌فرض استفاده می‌کنم. شما می‌توانید stageها و jobهای خود را ایجاد کنید

    ![Default Stage](/img/bamboo/defaultstage.png "Default Stage")
2. job تست خود را باز کنید و taskهایی برای اجرای تست‌های خود در Bamboo ایجاد کنید
    >**Task 1:** دریافت کد منبع (Source Code Checkout)

    >**Task 2:** تست‌های خود را اجرا کنید ```npm i && npm run test```. می‌توانید از task نوع *Script* و *Shell Interpreter* برای اجرای دستورات بالا استفاده کنید (این کار نتایج تست را تولید کرده و آن‌ها را در پوشه ```./testresults/``` ذخیره می‌کند)

    ![Test Run](/img/bamboo/testrun.png "Test Run")

    >**Task: 3** یک task از نوع *jUnit Parser* اضافه کنید تا نتایج تست ذخیره‌شده را تجزیه کند. لطفاً مسیر پوشه نتایج تست را در اینجا مشخص کنید (می‌توانید از الگوهای سبک Ant نیز استفاده کنید)

    ![jUnit Parser](/img/bamboo/junitparser.png "jUnit Parser")

    توجه: *مطمئن شوید که task تجزیه‌کننده نتایج را در بخش *Final* قرار می‌دهید، تا همیشه اجرا شود حتی اگر task تست شما ناموفق باشد*

    >**Task: 4** (اختیاری) برای اطمینان از اینکه نتایج تست شما با فایل‌های قدیمی مخلوط نمی‌شوند، می‌توانید یک task ایجاد کنید تا پس از تجزیه موفق در Bamboo، پوشه ```./testresults/``` را حذف کند. می‌توانید یک اسکریپت shell مانند ```rm -f ./testresults/*.xml``` برای حذف نتایج یا ```rm -r testresults``` برای حذف کامل پوشه اضافه کنید

پس از انجام این *کار پیچیده* بالا، لطفاً plan را فعال کرده و اجرا کنید. خروجی نهایی شما به این شکل خواهد بود:

## تست موفق

![Successful Test](/img/bamboo/successfulltest.png "Successful Test")

## تست ناموفق

![Failed Test](/img/bamboo/failedtest.png "Failed Test")

## ناموفق و اصلاح‌شده

![Failed and Fixed](/img/bamboo/failedandfixed.png "Failed and Fixed")

هورا!! همین بود. شما با موفقیت تست‌های WebdriverIO خود را در Bamboo یکپارچه کردید.