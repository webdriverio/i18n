---
id: sumologic-reporter
title: مراسل سوموجيك
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sumologic-reporter/README.md
---


> مراسل WebdriverIO يرسل نتائج الاختبار إلى [Sumologic](https://www.sumologic.com/) لتحليل البيانات

![لوحة معلومات سوموجيك](/img/sumologic.png "لوحة معلومات سوموجيك")

## التثبيت

الطريقة الأسهل هي الاحتفاظ بـ `@wdio/sumologic-reporter` كتبعية تطوير في ملف `package.json` الخاص بك، عبر:

```sh
npm install @wdio/sumologic-reporter --save-dev
```

يمكن العثور على تعليمات حول كيفية تثبيت `WebdriverIO` [هنا](https://webdriver.io/docs/gettingstarted).

## التكوين

أولاً، علينا إنشاء جامع جديد يجمع جميع سجلات اختباراتك. للقيام بذلك، انقر على __Manage__ في شريط التنقل وانتقل إلى __Collection__. هناك تحتاج إلى إضافة "Hosted Collector" جديد. قم بتطبيق اسم مناسب، على سبيل المثال، "test integration logs"، ووصف وفئة، مثل "wdio". انقر على حفظ لإنشاء المجمع.

![إضافة مجمع](https://webdriver.io/images/sumo-collector.png "إضافة مجمع")

الخطوة التالية هي إضافة مصدر. من المنطقي أن يكون لديك مصدر خاص لكل بيئة من بيئاتك (مثل بناء الفرع، التكامل). انقر على رابط "Add Source" بجوار المجمع الخاص بك وأضف __HTTP Source__. قم بتطبيق اسم ووصف مناسبين مرة أخرى وعيّن "Source Category" التي تعكس البيئة. اترك الخيارات الأخرى في الحالة الافتراضية وانقر على حفظ.

![إضافة مصدر](https://webdriver.io/images/sumo-source.png "إضافة مصدر")

ستظهر نافذة منبثقة بنقطة نهاية المصدر. انسخ عنوان URL هذا والصقه في ملف wdio.conf.js حتى يعرف المراسل إلى أين يرسل البيانات.

يُظهر الكود التالي تكوين مشغل اختبار wdio الافتراضي. ما عليك سوى إضافة `'sumologic'` كمراسل إلى المصفوفة وإضافة نقطة نهاية المصدر الخاصة بك:

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

بعد تشغيل الاختبارات الأولى باستخدام المراسل، يجب أن تكون قادرًا على التحقق من سجلات الاختبارات باستخدام الاستعلام التالي:

```
_source=wdio
| parse "\"type\":\"*:*\"" as type,status
| json auto
```

سأقوم بتوفير بعض قوالب لوحة المعلومات المفيدة لـ Sumologic قريبًا.

----

لمزيد من المعلومات حول WebdriverIO، راجع [الصفحة الرئيسية](https://webdriver.io).