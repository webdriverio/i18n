---
id: dot-reporter
title: مُقرر النقطة
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-dot-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> إضافة WebdriverIO للتقارير بنمط النقاط.

![Dot Reporter](/img/dot.png "Dot Reporter")

## التثبيت

الطريقة الأسهل هي الاحتفاظ بـ `@wdio/dot-reporter` كاعتماد تطويري في ملف `package.json` الخاص بك، عبر:

```sh
npm install @wdio/dot-reporter --save-dev
```

يمكن العثور على تعليمات حول كيفية تثبيت `WebdriverIO` [هنا](/docs/gettingstarted).

## الإعداد

يُظهر الكود التالي إعداد مشغل اختبار wdio الافتراضي. فقط أضف `'dot'` كمقرر إلى المصفوفة.

```js
// wdio.conf.js
module.exports = {
  // ...
  reporters: ['dot'],
  // ...
};
```

----

لمزيد من المعلومات حول WebdriverIO، راجع [الصفحة الرئيسية](https://webdriver.io).