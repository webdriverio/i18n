---
id: concise-reporter
title: گزارشگر مختصر
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-concise-reporter/README.md
---


> یک افزونه WebdriverIO برای گزارش دهی به سبک مختصر.

## نصب

ساده‌ترین راه این است که `@wdio/concise-reporter` را به عنوان یک devDependency در `package.json` خود نگه دارید، از طریق:

```sh
npm install @wdio/concise-reporter --save-dev
```

دستورالعمل‌های نصب `WebdriverIO` را می‌توانید [اینجا](https://webdriver.io/docs/gettingstarted) پیدا کنید.

## پیکربندی

کد زیر پیکربندی پیش‌فرض اجراکننده آزمون wdio را نشان می‌دهد. فقط کافی است `'concise'` را به عنوان یک گزارشگر به آرایه اضافه کنید.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'concise'],
  // ...
};
```