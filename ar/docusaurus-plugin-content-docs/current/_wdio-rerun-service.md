---
id: wdio-rerun-service
title: خدمة إعادة التشغيل
custom_edit_url: https://github.com/jwplayer/wdio-rerun-service/edit/master/README.md
---


> wdio-rerun-service هي حزمة من الطرف الثالث، لمزيد من المعلومات يرجى الاطلاع على [GitHub](https://github.com/jwplayer/wdio-rerun-service) | [npm](https://www.npmjs.com/package/wdio-rerun-service)

[![wdio-rerun-service CI](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml/badge.svg)](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml)
![npm](https://img.shields.io/npm/dm/wdio-rerun-service)
![npm bundle size](https://img.shields.io/bundlephobia/min/wdio-rerun-service)
![GitHub issues](https://img.shields.io/github/issues/webdriverio-community/wdio-rerun-service)

تقوم هذه الخدمة بتتبع اختبارات Mocha أو Jasmine الفاشلة وسيناريوهات Cucumber التي يتم تنفيذها ضمن إطار اختبار [WebdriverIO](https://webdriver.io). وستسمح بإعادة تشغيل الاختبارات أو السيناريوهات الفاشلة أو غير المستقرة.

_ملاحظة_: يجب على مستخدمي إطار Cucumber الذين يشغلون إصدارات WebdriverIO `5.x` و`6.x` استخدام الإصدار `1.6.x`. إذا كنت تستخدم أحدث إصدار رئيسي من `7.x`، فاستخدم أحدث إصدار `1.7.x` من هذه الخدمة.

## إعادة التشغيل مقابل إعادة المحاولة

منطق `إعادة المحاولة` المدمج في WebdriverIO لـ Cucumber و Mocha/Jasmine مفيد للتعامل مع الخطوات غير المستقرة في Cucumber و Mocha/Jasmine. إعادة المحاولة في كل إطار لها محاذير:
* Cucumber: لا يأخذ في الاعتبار أن بعض الخطوات قد لا تكون قابلة لإعادة المحاولة في وسط الاختبار. تشغيل خطوة مرتين قد يكسر بقية السيناريو أو قد لا يكون ممكناً في سياق الاختبار.
* Mocha/Jasmine: يمكن تطبيق منطق `إعادة المحاولة` على اختبار فردي، ومع ذلك، يتم ذلك في الوقت الفعلي وربما لا يأخذ في الاعتبار المشكلات المؤقتة أو مشاكل اتصال الشبكة.

الاختلافات الرئيسية لـ `إعادة التشغيل`:
* ستعيد تشغيل سيناريو Cucumber كامل وليس خطوة واحدة فقط
* تمكن إعادة تشغيل ملف مواصفات بأكمله بعد اكتمال تنفيذ الاختبار الرئيسي
* يمكن نسخها وتنفيذها محلياً (`إعادة المحاولة` لا يمكن ذلك)
* لا يزال بالإمكان استخدامها بالتزامن مع أساليب `إعادة المحاولة`
* لا تتطلب أي تغيير في الكود لتطبيق منطق `إعادة المحاولة` على الاختبارات غير المستقرة أو المشكلة

يوصى بتخصيص بعض الوقت لتقييم الخيارات المتاحة. قد يكون الحل الهجين هو الأفضل لتوفير أفضل نتائج اختبار حقيقية وقابلة للتنفيذ.

## التثبيت

أسهل طريقة هي إضافة `wdio-rerun-service` إلى `devDependencies` في ملف `package.json` الخاص بك.

```json
{
    "devDependencies": {
        "wdio-rerun-service": "^1.6.2"
    }
}
```

يمكن تثبيتها باستخدام `npm`:

```bash
npm install wdio-rerun-service
```

بعد اكتمال تثبيت الحزمة، أضفها إلى مصفوفة `services` في `wdio.conf.js`:

```js
// wdio.conf.js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [RerunService, {
        // ...
    }]
};
```

يمكن العثور على تعليمات حول كيفية تثبيت `WebdriverIO` [هنا.](https://webdriver.io/docs/gettingstarted.html)

## التكوين

يمكن إضافة الخيارات التالية إلى ملف wdio.conf.js. لتحديد خيارات للخدمة، تحتاج إلى إضافة الخدمة إلى قائمة `services` بالطريقة التالية:

```js
// wdio.conf.js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            // خيارات خدمة إعادة التشغيل هنا...
        }]
    ],
    // ...
};
```

### rerunDataDir
الدليل حيث سيتم الاحتفاظ بجميع بيانات JSON لإعادة التشغيل أثناء التنفيذ.

النوع: `String`

الافتراضي: `./results/rerun`

مثال:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            rerunDataDir: './custom-rerun-directory'
        }]
    ],
    // ...
}
```

### rerunScriptPath
المسار لكتابة نص Bash لإعادة التشغيل.

النوع: `String`

الافتراضي: `./rerun.sh`

مثال:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            rerunScriptPath: './custom-path-for-rerun.sh'
        }]
    ],
    // ...
}
```

### ignoredTags
(Cucumber فقط) مجموعة من علامات Cucumber لاستبعادها. إذا كان السيناريو يحتوي على علامة، فإن خدمة إعادة التشغيل ستتخطى التحليل.

النوع: `Array`

الافتراضي: `[]`

مثال:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            ignoredTags: ['@known_bug']
        }]
    ],
    // ...
}
```

### commandPrefix
البادئة التي سيتم إضافتها إلى أمر إعادة التشغيل الذي يتم إنشاؤه.

النوع: `String`

الافتراضي: `''`

مثال:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            commandPrefix: "VARIABLE=true"
        }]
    ],
    // ...
}
```
----