---
id: wdio-testrail-reporter
title: مُشغل تقارير Testrail
custom_edit_url: https://github.com/webdriverio-community/wdio-testrail-reporter/edit/main/README.md
---


> @wdio/testrail-reporter هو حزمة من طرف ثالث، لمزيد من المعلومات يرجى زيارة [GitHub](https://github.com/webdriverio-community/wdio-testrail-reporter) | [npm](https://www.npmjs.com/package/@wdio/testrail-reporter)

يقوم هذا المُشغل بإنشاء تقارير TestRail. أول شيء تحتاجه هو تمكين واجهة برمجة تطبيقات TestRail حتى يتمكن التقرير من التواصل مع TestRail ودفع نتائج الاختبار. للقيام بذلك، قم بتسجيل الدخول إلى حساب TestRail الخاص بك واذهب إلى الإدارة > إعدادات الموقع > API وتأكد من النقر على مربع الاختيار بجوار تمكين API.

أضف معرف حالة اختبار TestRail إلى وصف الاختبار. على سبيل المثال:
```javascript
it("C123456 Page loads correctly", async () => {
```
هذا يدعم أيضًا معرفات حالة متعددة. على سبيل المثال:
```javascript
it("C123456 C678910 Page loads correctly", async () => {
```

## التثبيت

لاستخدام المُشغل، أضفه إلى ملف `package.json` الخاص بك:

```sh
npm i --save-dev @wdio/testrail-reporter
```

## الاستخدام

أضف المُشغل إلى ملف تكوين WDIO الخاص بك.

مثال عندما تريد إنشاء تشغيل اختبار جديد:

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: 1,
                suiteId: 1,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                runName: 'name for the test run',
                oneReport: true,
                includeAll: false,
                caseIdTagPrefix: '' // used only for multi-platform Cucumber Scenarios
            }
        ]
    ],
    // ...
}
```

مثال عندما تريد تحديث تشغيل اختبار موجود:

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: 1,
                suiteId: 1,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                existingRunId: 2345,
                oneReport: true,
                includeAll: false
            }
        ]
    ],
    // ...
}
```

مثال عندما تحتاج إلى معرفات مشروع و/أو مجموعة مختلفة بناءً على مجموعة الاختبار المراد تنفيذها:

```javascript
export const config = {
    // ...
    reporters:
        [
            ['testrail', {
                projectId: process.env.TESTRAIL_PROJECT_NAME == 'PROJECT_A' ? 1 : 2,
                suiteId: process.env.TESTRAIL_SUITE_NAME == 'SUITE_A' ? 10 : 20,
                domain: 'xxxxx.testrail.io',
                username: process.env.TESTRAIL_USERNAME,
                apiToken: process.env.TESTRAIL_API_TOKEN,
                runName: 'name for the test run',
                oneReport: true,
                includeAll: false
            }
        ]
    ],
    // ...
}
```


## الخيارات

### `projectId`

معرف مشروع testrail.

النوع: `string`

### `suiteId`

معرف المجموعة، المجموعة 1 هي الافتراضية.

النوع: `string`

### `domain`

نطاق مثيل testrail الخاص بك، مثل `your-domain.testrail.io`.

النوع: `string`

### `username`

اسم المستخدم لمثيل testrail الخاص بك.

النوع: `string`

### `apiToken`

رمز API لمثيل testrail الخاص بك.

النوع: `string`

### `runName`

اسم مخصص لتشغيل الاختبار.

النوع: `string`

### `existingRunId`

معرف تشغيل اختبار موجود للتحديث.

النوع: `string`

### `oneReport`

إنشاء تشغيل اختبار واحد.

النوع: `boolean`

### `includeAll`

تضمين جميع الاختبارات في المجموعة في تشغيل الاختبار.

النوع: `boolean`

### `caseIdTagPrefix`

البادئة المستخدمة للعثور على معرف الحالة في علامات Cucumber، مفيدة لتنفيذات سيناريو Cucumber متعددة المنصات

النوع: `string`

### `useCucumber`

يشير إلى ما إذا كانت الاختبارات مكتوبة باستخدام إطار Cucumber. بشكل افتراضي، يتم تعيينها على `false`.

النوع: `boolean`

---

لمزيد من المعلومات حول WebdriverIO، راجع [الصفحة الرئيسية](https://webdriver.io).