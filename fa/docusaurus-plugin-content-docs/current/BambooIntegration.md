---
id: bamboo
title: بامبو
---

WebdriverIO ادغام نزدیکی با سیستم‌های CI مانند [Bamboo](https://www.atlassian.com/software/bamboo) ارائه می‌دهد. با گزارش‌دهنده [JUnit](https://webdriver.io/docs/junit-reporter.html) یا [Allure](https://webdriver.io/docs/allure-reporter.html)، شما می‌توانید به راحتی تست‌های خود را اشکال‌زدایی کرده و همچنین نتایج آزمون خود را پیگیری کنید. ادغام بسیار آسان است.

1. نصب گزارش‌دهنده تست JUnit: `$ npm install @wdio/junit-reporter --save-dev`)
1. پیکربندی خود را به‌روزرسانی کنید تا نتایج JUnit خود را در جایی ذخیره کنید که Bamboo بتواند آن‌ها را پیدا کند (و گزارش‌دهنده `junit` را مشخص کنید):

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
توجه: *همیشه استاندارد خوبی است که نتایج آزمون را در پوشه جداگانه به جای پوشه ریشه نگه دارید.*

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

گزارش‌ها برای تمام فریم‌ورک‌ها مشابه خواهند بود و شما می‌توانید از هر کدام استفاده کنید: Mocha، Jasmine یا Cucumber.

تا این زمان، ما معتقدیم که شما تست‌ها را نوشته‌اید و نتایج در پوشه ```./testresults/``` تولید شده‌اند، و Bamboo شما در حال اجرا است.

## ادغام تست‌های خود در Bamboo

1. پروژه Bamboo خود را باز کنید
    > یک طرح جدید ایجاد کنید، مخزن خود را پیوند دهید (مطمئن شوید که همیشه به جدیدترین نسخه مخزن شما اشاره می‌کند) و مراحل خود را ایجاد کنید

    ![Plan Details](/img/bamboo/plancreation.png "Plan Details")

    من با مرحله و کار پیش‌فرض پیش می‌روم. در مورد شما، می‌توانید مراحل و کارهای خود را ایجاد کنید

    ![Default Stage](/img/bamboo/defaultstage.png "Default Stage")
2. کار آزمایشی خود را باز کنید و وظایفی برای اجرای آزمون‌های خود در Bamboo ایجاد کنید
    >**وظیفه 1:** بررسی کد منبع

    >**وظیفه 2:** اجرای تست‌های خود ```npm i && npm run test```. می‌توانید از وظیفه *Script* و *Shell Interpreter* برای اجرای دستورات بالا استفاده کنید (این کار نتایج تست را تولید کرده و آن‌ها را در پوشه ```./testresults/``` ذخیره می‌کند)

    ![Test Run](/img/bamboo/testrun.png "Test Run")

    >**وظیفه: 3** افزودن وظیفه *jUnit Parser* برای تجزیه نتایج آزمون ذخیره شده. لطفاً دایرکتوری نتایج آزمون را در اینجا مشخص کنید (همچنین می‌توانید از الگوهای سبک Ant استفاده کنید)

    ![jUnit Parser](/img/bamboo/junitparser.png "jUnit Parser")

    توجه: *مطمئن شوید که وظیفه تجزیه‌کننده نتایج را در بخش *Final* نگه می‌دارید، به طوری که همیشه حتی اگر وظیفه آزمون شما شکست خورده باشد، اجرا شود*

    >**وظیفه: 4** (اختیاری) برای اطمینان از اینکه نتایج آزمون شما با فایل‌های قدیمی مخلوط نشده‌اند، می‌توانید وظیفه‌ای برای حذف پوشه ```./testresults/``` پس از تجزیه موفق به Bamboo ایجاد کنید. می‌توانید یک اسکریپت شل مانند ```rm -f ./testresults/*.xml``` برای حذف نتایج یا ```rm -r testresults``` برای حذف کامل پوشه اضافه کنید

پس از انجام *علم موشکی* فوق، لطفاً طرح را فعال کرده و آن را اجرا کنید. خروجی نهایی شما مانند موارد زیر خواهد بود:

## تست موفق

![Successful Test](/img/bamboo/successfulltest.png "Successful Test")

## تست ناموفق

![Failed Test](/img/bamboo/failedtest.png "Failed Test")

## ناموفق و تعمیر شده

![Failed and Fixed](/img/bamboo/failedandfixed.png "Failed and Fixed")

هورا!! همین است. شما با موفقیت تست‌های WebdriverIO خود را در Bamboo ادغام کرده‌اید.