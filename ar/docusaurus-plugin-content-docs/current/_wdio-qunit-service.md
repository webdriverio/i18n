---
id: wdio-qunit-service
title: خدمة QUnit
custom_edit_url: https://github.com/mauriciolauffer/wdio-qunit-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-qunit-service هي حزمة طرف ثالث، لمزيد من المعلومات يرجى الاطلاع على [GitHub](https://github.com/mauriciolauffer/wdio-qunit-service) | [npm](https://www.npmjs.com/package/wdio-qunit-service)

[![npm](https://img.shields.io/npm/v/wdio-qunit-service)](https://www.npmjs.com/package/wdio-qunit-service) [![test](https://github.com/mauriciolauffer/wdio-qunit-service/actions/workflows/test.yml/badge.svg)](https://github.com/mauriciolauffer/wdio-qunit-service/actions/workflows/test.yml)

خدمة [WebdriverIO](https://webdriver.io/) (wdio) لتشغيل اختبارات [QUnit](https://qunitjs.com/) المستندة إلى المتصفح وتحويلها ديناميكيًا إلى مجموعات اختبار `wdio`.

## استبدال Karma

`QUnit Service` هي بديل مباشر لأولئك الذين يستخدمون [Karma JS](https://karma-runner.github.io/latest/index.html) لتشغيل اختبارات `QUnit` الخاصة بهم ([karma-qunit](https://github.com/karma-runner/karma-qunit/)، [karma-ui5](https://github.com/SAP/karma-ui5) أو أي مجموعة أخرى من Karma و QUnit). Karma [مُهملة](https://github.com/karma-runner/karma) ويجب على الناس الانتقال إلى بدائل حديثة!

إذا كنت ترغب في الاحتفاظ باختبارات QUnit الخاصة بك كما هي، بدون إعادة كتابة وبدون إعادة هيكلة، فإن `QUnit Service` هي كل ما تحتاجه. تقوم بتشغيل ملفات QUnit HTML في متصفح وتلتقط جميع النتائج بتنسيق `wdio`.

بسبب ذلك، يمكن للمطورين استخدام `QUnit Service` بالتزامن مع كل شيء آخر متاح في نظام `wdio`.

هل تريد تسجيل اختبار في [فيديو](https://webdriver.io/docs/wdio-video-reporter/)؟ ربما التقاط [لقطة شاشة](https://webdriver.io/docs/api/browser/saveScreenshot/) أو حفظه في [PDF](https://webdriver.io/docs/api/browser/savePDF/)؟ التحقق من [تغطية الكود](https://www.npmjs.com/package/wdio-monocart-service)؟ حفظ نتائج الاختبار بتنسيق [JUnit](https://webdriver.io/docs/junit-reporter)؟ افعل ذلك، `QUnit Service` لا تقف في طريقك.

## التثبيت

بعد تكوين `WebdriverIO`، قم بتثبيت `wdio-qunit-service` كتبعية تطوير في ملف `package.json` الخاص بك.

```shell
npm install wdio-qunit-service --save-dev
```

إذا لم تقم بعد بتكوين `WebdriverIO`، تحقق من [الوثائق](https://webdriver.io/docs/gettingstarted) الرسمية.

## التكوين

لاستخدام `QUnit Service` تحتاج فقط إلى إضافتها إلى قائمة `services` في ملف `wdio.conf.js` الخاص بك. وثائق wdio تحتوي على جميع المعلومات المتعلقة بـ [ملف التكوين](https://webdriver.io/docs/configurationfile):

```js
// wdio.conf.js
export const config = {
  // ...
  services: ["qunit"],
  // ...
};
```

## الاستخدام

تأكد من أن خادم الويب يعمل قبل تنفيذ الاختبارات. `wdio` لن يبدأ خادم الويب.

### مع ملفات .spec أو .test

في اختبار WebdriverIO الخاص بك، تحتاج إلى الانتقال إلى صفحة اختبار QUnit HTML، ثم استدعاء `browser.getQUnitResults()`.

```js
describe("QUnit test page", () => {
  it("should pass QUnit tests", async () => {
    await browser.url("http://localhost:8080/test/unit/unitTests.qunit.html");
    await browser.getQUnitResults();
  });
});
```

يُنصح بوجود ملف اختبار WebdriverIO واحد لكل صفحة اختبار QUnit HTML. هذا يضمن تشغيل الاختبارات بالتوازي وبشكل معزول تمامًا.

### التكوين فقط، بدون ملفات .spec أو .test

إذا كنت لا ترغب في إنشاء ملفات spec/test، يمكنك تمرير قائمة بملفات QUnit HTML إلى التكوين وسيتم إنشاء الاختبارات تلقائيًا.

```js
// wdio.conf.js
export const config = {
  // ...
  baseUrl: 'http://localhost:8080',
  services: [
    ['qunit', {
      paths: [
        'unit-tests.html',
        'integration-tests.html',
        'test/qunit.html'
      ]
    }],
  // ...
};
```

### نتائج الاختبار

قد تبدو نتائج الاختبار مثل:
![QUnit Service test results](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./wdio-qunit-service-results.png?raw=true)

## أمثلة

تحقق من مجلد [examples](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/) للحصول على عينات باستخدام `javascript`، `typescript` وأكثر.

### الاستخدام في تطبيقات SAP Fiori / UI5

مثال [مباشر](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/) باستخدام التطبيق المعروف [openui5-sample-app](https://github.com/SAP/openui5-sample-app):

- إنشاء ملف تكوين: [wdio.conf.js](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/wdio.conf.js)

- أخبر `wdio` أين يجد ملفات اختبار QUnit:

- - قم بتضمين ملفات QUnit في [تكوين الخدمة](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app-no-specs/webapp/test/wdio.conf.js)
- - أو
- - إنشاء ملف اختبار WebdriverIO لـ [اختبارات الوحدة](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/unit/unit.test.js) وآخر لـ [اختبارات OPA5](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/./examples/openui5-sample-app/webapp/test/integration/opa.test.js)

- يجب أن يكون خادم الويب قيد التشغيل قبل تنفيذ الاختبارات

- قم بتشغيله $ `wdio run webapp/test/wdio.conf.js`

## المؤلف

Mauricio Lauffer

- LinkedIn: [https://www.linkedin.com/in/mauriciolauffer](https://www.linkedin.com/in/mauriciolauffer)

## الترخيص

هذا المشروع مرخص بموجب رخصة MIT - راجع ملف [LICENSE](https://github.com/mauriciolauffer/wdio-qunit-service/blob/main/LICENSE) للحصول على التفاصيل.