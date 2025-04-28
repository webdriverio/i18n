---
id: concise-reporter
title: مُراسل موجز
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-concise-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> إضافة WebdriverIO للإبلاغ بأسلوب موجز.

## التثبيت

الطريقة الأسهل هي الاحتفاظ بـ `@wdio/concise-reporter` كاعتماد تطويري في ملف `package.json` الخاص بك، عبر:

```sh
npm install @wdio/concise-reporter --save-dev
```

يمكن العثور على تعليمات حول كيفية تثبيت `WebdriverIO` [هنا](https://webdriver.io/docs/gettingstarted).

## التكوين

يوضح الكود التالي التكوين الافتراضي لمشغل اختبار wdio. ما عليك سوى إضافة `'concise'` كمراسل
إلى المصفوفة.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot', 'concise'],
  // ...
};
```