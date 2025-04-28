---
id: wdio-timeline-reporter
title: مراسل الجدول الزمني
custom_edit_url: https://github.com/QualityOps/wdio-timeline-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-timeline-reporter هي حزمة من طرف ثالث، لمزيد من المعلومات يرجى الاطلاع على [GitHub](https://github.com/QualityOps/wdio-timeline-reporter) | [npm](https://www.npmjs.com/package/wdio-timeline-reporter)


> متجر واحد لمراسل WebdriverIO لتصور مجمع لنتائج الاختبار الخاصة بك لأن "الرؤية هي التصديق"

![example.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/example.png)

## لماذا

لأننا نقضي الكثير من الوقت في تصحيح الاختبارات الفاشلة بالتبديل من إخراج المحطة الطرفية إلى عرض لقطات شاشة الخطأ وما إلى ذلك. يجمع هذا المراسل جميع المعلومات النموذجية التي ستحتاجها في تقرير واحد. قم بتشغيل الاختبارات واحصل على جدول زمني لطيف للأحداث يمكنك النظر إليها للتحقق بشكل أكبر من أن كل شيء يبدو على ما يرام.

#### تتضمن الميزات:

- يعمل بشكل رائع مع أطر Mocha و Jasmine. يعمل أيضًا مع Cucumber ولكن سيتم الإبلاغ عن كل خطوة كاختبار
- ملخص صاخب لنتائج الاختبار.
- تفاصيل كل اختبار يتم تشغيله بما في ذلك جميع لقطات الشاشة الملتقطة أثناء تنفيذ الاختبار.
- تصفية نتائج الاختبار. رائع للتركيز على الاختبارات الفاشلة
- تتبع مكدس الأخطاء مرفق بالاختبار.
- القدرة على إضافة معلومات إضافية للاختبار في وقت التشغيل.
- لا تتطلب معالجة ما بعد. عند الانتهاء من عملية اختبار wdio، سيتم إنشاء ملف تقرير html ثابت.
- خدمة الجدول الزمني لإدارة التقاط لقطات الشاشة بما في ذلك تغيير حجم الصور.

يمكن العثور على مثال لتقرير html [هنا](http://htmlpreview.github.io/?https://github.com/QualityOps/wdio-timeline-reporter/blob/master/images/example-timeline-report.html)

يمكن العثور على تعليمات حول كيفية تثبيت `WebdriverIO` [هنا](http://webdriver.io/guide/getstarted/install.html).

## التثبيت

**للإصدار المتوافق مع WEBDRIVERIO V4 انظر [هنا](https://github.com/QualityOps/wdio-timeline-reporter/tree/v4)**

```shell
npm install --save wdio-timeline-reporter
```

سيتم إضافة تبعية إلى ملف `package.json` الخاص بك

```json
{
  "dependencies": {
    "wdio-timeline-reporter": "^5.1.0"
  }
}
```

### الاستخدام

أضف `timeline` إلى مصفوفة المراسلين في ملف تكوين wdio الخاص بك.

قم أيضًا باستيراد وإضافة `TimelineService` من wdio-timeline-reporter.

الخدمة إلزامية لدمج التقارير وإنشاء html حيث يتم الآن تهيئة المراسلين لكل مثيل مشغل في webdriverio 5. [انظر المناقشة المفتوحة على webdriverio](https://github.com/webdriverio/webdriverio/issues/3780)

يمكن أيضًا لـ TimelineService إدارة التقاط لقطات الشاشة أثناء تنفيذ الاختبارات. لديك خيار تقليل حجم وجودة الصور وتضمين الصور في التقرير كـ base64. هذه قابلة للتكوين باستخدام [خيارات المراسل.](#reporter-options)

```js
// wdio.conf.js
const { TimelineService } = require('wdio-timeline-reporter/timeline-service');
exports.config = {
  // ...
  reporters: [['timeline', { outputDir: './desired_location' }]],
  // ...
  services: [[TimelineService]]
};
```

### خيارات المراسل

إذا كنت ترغب في تجاوز تكوين المراسل الافتراضي، أضف كائن حرفي reporterOptions إلى مصفوفة timeline ضمن reporters كما هو موضح أدناه.

![reporter-options.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/reporter-options.png)

| المؤشر | الوصف                                                                                                                                                                                   |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.    | الدليل الذي سيتم إنشاء ملف html ولقطات الشاشة فيه. خيار إلزامي                                                                                                                           |
| 2.    | اسم ملف تقرير html. القيمة الافتراضية هي `timeline-report.html`                                                                                                                          |
| 3.    | تضمين الصور كـ base64 في ملف html. القيمة الافتراضية هي `false`                                                                                                                          |
| 4.    | خيارات الكائن لمعالجة الصور                                                                                                                                                              |
| 5.    | تعيين جودة JPEG. ذات صلة فقط إذا كان خيار `resize` هو `true`. كلما كانت القيمة أصغر، كان حجم الصورة وجودتها أصغر. القيمة الافتراضية هي `70`. أقصى قيمة مسموح بها هي `100`             |
| 6.    | تغيير حجم الصورة. القيمة الافتراضية هي `false`                                                                                                                                           |
| 7.    | قيمة لتقليل العدد الإجمالي للبكسل. ذات صلة فقط إذا كان خيار `resize` صحيحًا. الافتراضي إلى `1` القيم الصالحة `1 - 5`                                                                    |
| 8.    | عدد مرات التقاط لقطات الشاشة. القيم المدعومة هي `on:error`، `before:click`، `none`. الافتراضي إلى `none`. `before:click` هو خيار رائع لإنشاء جدول زمني للقطات الشاشة للتطبيق قيد الاختبار. |

### إضافة معلومات إضافية إلى سياق الاختبار

من الممكن إضافة معلومات إضافية إلى اختبار باستخدام الطريقة الثابتة `addContext`. يمكن أن يكون هذا مفيدًا لإضافة معلومات مهمة يمكن أن تساعد في تصحيح الاختبارات الفاشلة، على سبيل المثال، مستخدم تم إنشاؤه أثناء تشغيل الاختبار باسم مستخدم ديناميكي

#### الاستخدام الأساسي

تقبل الطريقة الثابتة `TimelineReporter.addContext` إما معلمة سلسلة أو معلمة مكتوبة حرفيًا بخاصيتين `title` و `value` مثل

```js
{ title: 'sessionId', value: 'b59bb9ec-ab15-475e-9ce6-de8a14ca0cd3' }
```

يمكن أن تكون القيمة أيضًا رابطًا

##### مثال Mocha

```js
const TimelineReporter = require('wdio-timeline-reporter').default;

describe('Suite', function() {
  it('Test', function() {
    // object literal parameter
    TimelineReporter.addContext({
      title: 'Test User',
      value: 'user id created during the test'
    });

    // value as anchor tag
    TimelineReporter.addContext({
      title: 'Dynamic link',
      value: '<a href="">Some important link related to test</a>'
    });

    // string parameter
    TimelineReporter.addContext('This test might be flaky');
  });
});
```

## شكر وتقدير

أود أن أوجه صيحة إلى مؤلفي ومشرفي [wdio-json-reporter](https://github.com/fijijavis/wdio-json-reporter) مرورًا بحل v5 الخاص بهم ساعد في تسريع عملي