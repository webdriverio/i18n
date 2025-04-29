---
id: gmangiapelo-wdio-azure-devops-service
title: خدمة خطط اختبار Azure DevOps
custom_edit_url: https://github.com/gianlucamangiapelo/wdio-azure-devops-service/edit/main/README.md
---


> @gmangiapelo/wdio-azure-devops-service هي حزمة من طرف ثالث، لمزيد من المعلومات يرجى الاطلاع على [GitHub](https://github.com/gianlucamangiapelo/wdio-azure-devops-service) | [npm](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)

[![version](https://img.shields.io/npm/v/@gmangiapelo/wdio-azure-devops-service.svg)](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)
[![downloads](https://img.shields.io/npm/dt/@gmangiapelo/wdio-azure-devops-service.svg)](https://www.npmjs.com/package/@gmangiapelo/wdio-azure-devops-service)

تنشر نتائج [WebdriverIO](https://webdriver.io/) على خطط اختبار Azure DevOps.

الميزات الأساسية:

* دعم لأطر عمل Jasmine/Jest/Mocha وCucumber
* يتم تجميع نتائج الاختبار تحت نفس تشغيل الاختبار إذا كنت تقوم بتنفيذ المزيد من ملفات الاختبار (spec) وتنتمي إلى نفس المجموعة
* يتم الإبلاغ عن النتائج فور تنفيذ الاختبار الفردي (إعداد تقارير في الوقت الفعلي)
* يتم إغلاق تشغيل الاختبار بعد انتهاء آخر ملف اختبار
* دعم المجموعات المتعددة


## التثبيت

قم بتثبيت هذه الوحدة محليًا باستخدام الأمر التالي لاستخدامها كاعتماد (تطوير):

```shell
npm install --save @gmangiapelo/wdio-azure-devops-service
npm install --save-dev @gmangiapelo/wdio-azure-devops-service
```

يمكن العثور على تعليمات حول كيفية تثبيت `WebdriverIO` [هنا.](https://webdriver.io/docs/gettingstarted)

## الاستخدام

> _wdio-azure-devops-service_ تدعم **NodeJS 8 أو أعلى**

> _wdio-azure-devops-service_ تدعم **commonjs** و **esm**

### التكوين

نظرًا لأن `@gmangiapelo/wdio-azure-devops-service` عبارة عن خدمة، يمكنك إعدادها في ملف `wdio.conf.js` الخاص بك على النحو التالي

```js
import AzureDevopsService from "@gmangiapelo/wdio-azure-devops-service";
// wdio.conf.js
exports.config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
              AzureDevopsService,
              {
                  pat: '3qaPw0PnOyQ6mb8gwN7n9aIQtccn8FtsZ2s1tSIzo6yAt6eK9BInJQGJ99BDACAAAAAu9TDCAAASAZDO2Onn',
                  organizationUrl: 'https://dev.azure.com/gianlucamangiapelo',
                  projectId: '8b3c68ac-f69d-41c6-bbad-921d8bae9819',
                  planId: 263072,
                  suiteId: 263073,
                  caseIdRegex: '@?[ref](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/\\d+)',
                  runName: 'FE regression tests for TestPlan',
              },
          ],
    ],
    // ...
};
```

### إعداد حالة الاختبار

يجب أن تتضمن اختبارات WDIO الخاصة بك معرف حالة اختبار Azure. تأكد من أن معرفات حالة الاختبار الخاصة بك متميزة عن عناوين الاختبار الخاصة بك:

**نمط Mocha:**
```Javascript
// جيد:
it("C123 Can authenticate a valid user", ...

// سيء:
it("C123Can authenticate a valid user", ...
it("Can authenticate a valid user C123", ...
```

**نمط Cucumber:**
```Gherkin
## جيد:
@C123
Scenario Can authenticate a valid user
@c123
Scenario Can authenticate a valid user,

## سيء:
@c123stringTest
Scenario Can authenticate a valid user
```

### مثال تقرير Azure DevOps

هذا مثال للنتائج المدفوعة على خطط اختبار AZ، أثناء تشغيل الاختبار
![مثال خطط اختبار AzureDevops](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/./img/AZ-DevOps-example.png)

<br />

## خيارات الخدمة

### pat

رمز الوصول الشخصي المُنشأ في Azure DevOps مع تعيين إذن API.

مثال: `"3qaPw0PnOyQ6mb8gwN7n9aIQtccn8FtsZ2s1tSIzo6yAt6eK9BInJQGJ99BDACAAAAAu9TDCAAASAZDO2Onn"`

النوع: `string`

مطلوب: `true`

### organizationUrl

عنوان URL الأساسي لمثيل Azure DevOps الخاص بك.

مثال: `"https://dev.azure.com/gianlucamangiapelo"`

النوع: `string`

مطلوب: `true`

### projectId

معرف المشروع في Azure DevOps.

للعثور على projectId استخدم `GET {organizationUrl}/_apis/projects?api-version=6.0` وانسخ `id` المناسب.

مثال: `"3cf7dbc9-cb1e-4240-93f2-9a5960ab3945"`

النوع: `string`

مطلوب: `true`

### planId

معرف خطة الاختبار الذي يمكنك استرداده في قسم خطة اختبار Azure DevOps.

مثال: `124`

النوع: `integer`

مطلوب: `true`

### suiteId

معرف المجموعة الذي يمكنك استرداده في قسم خطة اختبار Azure DevOps، في حالة المجموعات المتداخلة، احصل على معرف المجموعة الجذر، ستتكرر الخدمة عبر جميع المجموعات الفرعية.

مثال: `21`

النوع: `integer`

مطلوب: `true`

### runName

اسم وصفي لتشغيل الاختبار.

مثال: `"FE regression tests run"`

النوع: `string`

مطلوب: `true`

### caseIdRegex

تعبير منتظم مخصص لمطابقة معرف حالة الاختبار من العلامة أو عنوان حالة الاختبار.

النوع: `string`

الافتراضي: `"@?[cC](https://github.com/gianlucamangiapelo/wdio-azure-devops-service/blob/main/\d+)"`

مطلوب: `false`

## المؤلف
Gianluca Mangiapelo - [github](https://github.com/gianlucamangiapelo)