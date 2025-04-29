---
id: json-reporter
title: گزارشگر Json
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-json-reporter/README.md
---



## نصب

```bash
npm install @wdio/json-reporter --save-dev
```

## پیکربندی

### ارسال نتایج به `stdout`

```js
reporters: [
    'dot',
    ['json', { stdout: true }]
],
```

### ارسال نتایج به فایل

```js
reporters: [
    'dot',
    ['json',{
        outputDir: './results'
    }]
],
```

### ارسال نتایج به فایل با نام سفارشی

```js
reporters: [
    'dot',
    ['json',{
        outputDir: './results',
        outputFileFormat: (opts) => {
            return `results-${opts.cid}.${opts.capabilities.browserName}.json`
        }
    }]
],
```

## فایل‌های نتیجه

با نسخه ۵ به بالای WDIO، گزارش‌دهی از یک فرآیند متمرکز به فرآیندی تغییر کرده است که توسط هرکدام از "نشست‌ها" که برای اجرای موازی تست راه‌اندازی می‌شوند، مدیریت می‌شود. این تغییر باعث کاهش حجم ارتباطات در طول اجرای تست WDIO شده و در نتیجه عملکرد را بهبود بخشیده است. نقطه منفی این است که دیگر امکان دریافت یک گزارش واحد برای تمام اجرای تست وجود ندارد.

`@wdio/json-reporter` یک تابع کمکی برای ادغام چندین فایل json در یک فایل واحد ارائه می‌دهد. برای استفاده از این قابلیت، مراحل زیر را دنبال کنید.

شما می‌توانید این کار را در [`onComplete`](https://webdriver.io/docs/configuration#oncomplete) فایل `wdio.conf.js` خود اجرا کنید:

```javascript
// wdio.conf.js
import mergeResults from '@wdio/json-reporter/mergeResults'

export const config = {
    // ...
    onComplete: function (exitCode, config, capabilities, results) {
        mergeResults('./results', 'wdio-.*-json-reporter.json', 'wdio-custom-filename.json')
    }
    // ...
}
```

_نکته:_ پارامتر `wdio-custom-filename.json` اختیاری است، اگر این پارامتر ارائه نشود، مقدار پیش‌فرض `wdio-merged.json` خواهد بود.

## مشارکت

کد منبع این گزارشگر به شدت از گزارشگر جامعه [`wdio-json-reporter`](https://github.com/fijijavis/wdio-json-reporter) توسط [Jim Davis](https://github.com/fijijavis) الهام گرفته شده است. از تمام زحمات برای نگهداری این پروژه سپاسگزاریم!

---

برای اطلاعات بیشتر درباره WebdriverIO، به [صفحه اصلی](http://webdriver.io) مراجعه کنید.