---
id: sumologic-reporter
title: گزارشگر Sumologic
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sumologic-reporter/README.md
---


> یک گزارشگر WebdriverIO که نتایج آزمون را برای تحلیل داده‌ها به [Sumologic](https://www.sumologic.com/) ارسال می‌کند

![Sumologic Dashboard](/img/sumologic.png "Sumologic Dashboard")

## نصب

ساده‌ترین راه، نگه داشتن `@wdio/sumologic-reporter` به عنوان devDependency در `package.json` است، از طریق:

```sh
npm install @wdio/sumologic-reporter --save-dev
```

دستورالعمل‌های نحوه نصب `WebdriverIO` را می‌توانید [اینجا](https://webdriver.io/docs/gettingstarted) پیدا کنید.

## پیکربندی

ابتدا باید یک جمع‌کننده (collector) جدید ایجاد کنیم که تمام لاگ‌های آزمون‌های شما را جمع‌آوری کند. برای انجام این کار، روی __Manage__ در نوار ناوبری کلیک کنید و به __Collection__ بروید. در آنجا باید یک "Hosted Collector" جدید اضافه کنید. یک نام مناسب، مانند "test integration logs"، توضیحات و یک دسته، مانند "wdio" را وارد کنید. برای ایجاد جمع‌کننده روی Save کلیک کنید.

![Add Collector](https://webdriver.io/images/sumo-collector.png "Add Collector")

گام بعدی افزودن یک منبع (source) است. منطقی است که برای هر یک از محیط‌های خود (مانند branch build، integration) یک منبع جداگانه داشته باشید. روی لینک "Add Source" در کنار جمع‌کننده خود کلیک کنید و یک __HTTP Source__ اضافه کنید. مجدداً یک نام و توضیحات مناسب وارد کنید و یک "Source Category" که منعکس‌کننده محیط است، تنظیم کنید. گزینه‌های دیگر را در حالت پیش‌فرض باقی بگذارید و روی save کلیک کنید.

![Add Source](https://webdriver.io/images/sumo-source.png "Add Source")

یک مودال با نقطه پایانی منبع (source endpoint) ظاهر می‌شود. آن URL را کپی کنید و در wdio.conf.js خود قرار دهید تا گزارشگر بداند داده‌ها را به کجا ارسال کند.

کد زیر پیکربندی پیش‌فرض آزمون‌کننده wdio را نشان می‌دهد. فقط `'sumologic'` را به عنوان گزارشگر به آرایه اضافه کنید و نقطه پایانی منبع خود را اضافه کنید:

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: [
    'spec',
    ['sumologic', {
        // define sync interval how often logs get pushed to Sumologic
        syncInterval: 100,
        // endpoint of collector source
        sourceAddress: process.env.SUMO_SOURCE_ADDRESS
    }]
  ],
  // ...
};
```

پس از اجرای اولین آزمون‌ها با گزارشگر، باید بتوانید لاگ‌های آزمون را با کوئری زیر بررسی کنید:

```
_source=wdio
| parse "\"type\":\"*:*\"" as type,status
| json auto
```

به زودی برخی قالب‌های داشبورد مفید برای Sumologic ارائه خواهم کرد.

----

برای اطلاعات بیشتر در مورد WebdriverIO، [صفحه اصلی](https://webdriver.io) را ببینید.