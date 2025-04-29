---
id: dot-reporter
title: گزارشگر نقطه‌ای
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-dot-reporter/README.md
---


> یک افزونه WebdriverIO برای گزارش‌دهی به سبک نقطه‌ای.

![Dot Reporter](/img/dot.png "Dot Reporter")

## نصب

ساده‌ترین راه این است که `@wdio/dot-reporter` را به عنوان devDependency در فایل `package.json` خود نگه دارید:

```sh
npm install @wdio/dot-reporter --save-dev
```

دستورالعمل‌های نصب `WebdriverIO` را می‌توانید [اینجا](/docs/gettingstarted) پیدا کنید.

## پیکربندی

کد زیر تنظیمات پیش‌فرض اجراکننده آزمون wdio را نشان می‌دهد. فقط کافیست `'dot'` را به عنوان گزارشگر به آرایه اضافه کنید.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot'],
  // ...
};
```

----

برای اطلاعات بیشتر درباره WebdriverIO به [صفحه اصلی](https://webdriver.io) مراجعه کنید.