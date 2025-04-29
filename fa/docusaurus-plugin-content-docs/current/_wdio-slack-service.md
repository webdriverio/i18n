---
id: wdio-slack-service
title: سرویس اسلک
custom_edit_url: https://github.com/carmenmitru/wdio-slack-service/edit/master/README.md
---


> wdio-slack-service is a 3rd party package, for more information please see [GitHub](https://github.com/carmenmitru/wdio-slack-service) | [npm](https://www.npmjs.com/package/wdio-slack-service)
Webdriverio library to send test results as a slack notification/message to channels

## نصب

آسان‌ترین راه این است که `wdio-slack-service` را به عنوان یک devDependency در `package.json` خود نگه دارید.

```json
{
  "devDependencies": {
    "wdio-slack-service": "2.0.8"
  }
}
```

به سادگی می‌توانید با دستور زیر آن را نصب کنید:

```bash
npm install wdio-slack-service --save-dev
```

دستورالعمل‌های نصب `WebdriverIO` را می‌توانید [اینجا](https://webdriver.io/docs/gettingstarted.html) پیدا کنید.

## پیکربندی

ابتدا، سرویس را در فایل پیکربندی wdio وارد کنید `wdio.conf.js`

```js
// wdio.conf.js
const slack = require('wdio-slack-service');
```

برای استفاده از این سرویس، شما به آدرس webhook اسلک نیاز دارید تا اعلان‌ها را ارسال کنید و باید `slack` را به آرایه `services` خود اضافه کنید

مثال:

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        [slack, {
            webHookUrl: "<SLACK_WEBHOOK_URL>", // Used to post notification to a particular channel
            notifyOnlyOnFailure: true, // Send notification only on test failure
            messageTitle: "<NOTIFICATION_TITLE>" // Name of the notification
        }]
]
```
## ویژگی‌ها

- ارسال اعلان بدون توجه به نتایج آزمون
- ارسال اعلان فقط در صورت شکست آزمون
- پشتیبانی از `mocha`، `jasmine` و `cucumber`
- آزمون‌های تکراری/اجرای مجدد با اطلاعات اضافی ثبت می‌شوند
- اطلاعات مدت زمان آزمون
- جزئیات خطا
- گزارش سناریو/مرحله Cucumber
- اطلاعات مرورگر و نسخه

## نحوه کارکرد
برای `mocha`/`jasmine`، اعلان در سطح spec ارسال می‌شود و برای `cucumber`، در سطح feature خواهد بود. اگر ۱۰ فایل spec/feature داشته باشید، ۱۰ اعلان دریافت خواهید کرد زیرا در قلاب `after` فعال می‌شود

## گزینه‌ها

برای ارسال اعلان، باید آدرس webhook اسلک داشته باشید. برای اطلاع از نحوه ایجاد آدرس webhook اسلک، [این صفحه](https://api.slack.com/messaging/webhooks) را ببینید

### webHookUrl

این آدرس برای شناسایی/احراز هویت پیام ارسالی استفاده می‌شود و آن را به یک کانال اسلک ارسال می‌کند

نوع: `String` <br/>
اختیاری: `NO` <br/>
پیش‌فرض: `NA`

### notifyOnlyOnFailure

اگر می‌خواهید اعلان‌های اسلک را فقط در صورت شکست آزمون دریافت کنید، این گزینه را روی `true` تنظیم کنید. در غیر این صورت، برای تمام اجراهای آزمون صرف نظر از قبولی/شکست، اعلان ارسال می‌کند

نوع: `Boolean` <br/>
اختیاری: `YES` <br/>
پیش‌فرض: `false`

### messageTitle

عنوان اعلان

نوع: `String` <br/>
اختیاری: `YES` <br/>
پیش‌فرض: `Webdriverio Slack Reporter`

## تصاویر

### قبولی/شکست Cucumber

![Cucumber Pass/fail](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/Cucumber.PNG)

### تلاش مجدد Cucumber

![Cucumber Retry](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/Cucumberretry.PNG)

### همه قبول

![All Pass](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/allpass.PNG)

### قبولی شکست

![Fail Pass](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/failpass.PNG)

### شکست در تلاش مجدد

![Retry Failed](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/retryfail.PNG)

### قبولی در تلاش مجدد

![Retry Passed](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/retrypassed.PNG)

---

برای اطلاعات بیشتر در مورد WebdriverIO به [صفحه اصلی](https://webdriver.io) مراجعه کنید.