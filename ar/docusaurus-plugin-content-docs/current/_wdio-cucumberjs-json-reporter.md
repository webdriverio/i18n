---
id: wdio-cucumberjs-json-reporter
title: مُسجل CucumberJS JSON
custom_edit_url: https://github.com/wswebcreation/wdio-cucumberjs-json-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-cucumberjs-json-reporter هو حزمة من طرف ثالث، لمزيد من المعلومات يرجى الاطلاع على [GitHub](https://github.com/wswebcreation/wdio-cucumberjs-json-reporter) | [npm](https://nodei.co/npm/wdio-cucumberjs-json-reporter)

مُسجل WDIO يقوم بإنشاء ملفات CucumberJS JSON لـ WebdriverIO v8 وما فوق.

[![NPM](https://nodei.co/npm/wdio-cucumberjs-json-reporter.png)](https://nodei.co/npm/wdio-cucumberjs-json-reporter/)

## ماذا يفعل
سيقوم هذا المُسجل بإنشاء **ملف Cucumber JSON** لكل ميزة يتم اختبارها. يمكن استخدام ملف JSON مع أي تقرير ترغب في استخدامه مثل [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter).

سيقوم أيضًا بإضافة البيانات الوصفية حول مثيل التشغيل إلى ملف الميزة، وأخيرًا وليس آخرًا، سيمنحك فرصة إضافة مرفقات إلى مخرجات JSON.

## التثبيت
الطريقة الأسهل هي الاحتفاظ بـ `wdio-cucumberjs-json-reporter` كتبعية تطوير في ملف `package.json` الخاص بك.

```json
{
  "devDependencies": {
    "wdio-cucumberjs-json-reporter": "^5.0.0"
  }
}
```

يمكنك القيام بذلك ببساطة عن طريق:

```bash
npm install wdio-cucumberjs-json-reporter --save-dev
```

وبذلك ستتم إضافته تلقائيًا إلى ملف `package.json` الخاص بك

يمكن العثور على تعليمات حول كيفية تثبيت `WebdriverIO` [هنا](https://webdriver.io/docs/gettingstarted).

## التكوين
قم بتكوين دليل الإخراج واللغة في ملف wdio.conf.js الخاص بك:

```js
export const config = {
    // ...
    reporters: [
        // هكذا مع الخيارات الافتراضية، انظر الخيارات أدناه
        'cucumberjs-json',

        // أو هكذا إذا كنت تريد تعيين المجلد واللغة
        [ 'cucumberjs-json', {
                jsonFolder: '.tmp/new/',
                language: 'en',
            },
        ],
    ],
  // ...
}
```

> لا تستخدم كلا الطريقتين لإضافة المُسجل، هذا مجرد مثال!

## الخيارات
### `jsonFolder`
- **النوع:** `String`
- **إلزامي:** لا
- **الافتراضي:** `.tmp/json/`

الدليل الذي سيتم تخزين ملفات JSON التي ينشئها هذا التقرير فيه، بالنسبة إلى المكان الذي يتم فيه بدء البرنامج النصي.

**ملاحظة:** إذا كنت تستخدم نصًا من npm من سطر الأوامر، مثل `npm run test` فسيكون `jsonFolder` نسبيًا من المسار حيث يتم تنفيذ البرنامج النصي. سيؤدي تنفيذه من جذر مشروعك أيضًا إلى إنشاء `jsonFolder` في جذر مشروعك.

### `language`
- **النوع:** `String`
- **إلزامي:** لا
- **الافتراضي:** `en`

اللغة التي تُكتب بها سيناريوهات Gherkin (الافتراضية هي الإنجليزية). يمكن العثور على قائمة رموز اللغة وكلماتها الرئيسية [هنا](https://cucumber.io/docs/gherkin/reference/#overview).

### `disableHooks`
- **النوع:** `boolean`
- **إلزامي:** لا
- **الافتراضي:** `false`

لن تكون تفاصيل Hook جزءًا من الإنشاء إذا تم تعيين هذه الخاصية إلى `true`.

### `reportFilePerRetry`
- **النوع:** `boolean`
- **إلزامي:** لا
- **الافتراضي:** `true`

عندما تتم إعادة محاولة المواصفات، سيتم إضافة التقرير إلى ملف التقرير الحالي من المحاولات السابقة إذا تم تعيين هذه الخاصية إلى `false`.

**مثال**:
`['cucumberjs-json', { jsonFolder: '.tmp/new/', language: 'en', disableHooks:true}]`

## البيانات الوصفية

> **ملاحظة:**\
> هذا غير مدعوم حاليًا إذا كنت تستخدم WebdriverIO V6، لا يزال WebdriverIO V5 يدعم هذا و WebdriverIO V7 يدعمه مرة أخرى

كما قيل، يمكن لهذا التقرير تخزين البيانات الوصفية للجهاز / الآلة الحالية التي تم تنفيذ الميزة عليها تلقائيًا.

لتخصيص ذلك يمكنك إضافته عن طريق إضافة الكائن التالي إلى `capabilities` الخاص بك

```js
// مثال wdio.conf.js
export const config = {
    //..
    capabilities: [
        {
            browserName: 'chrome',
            // أضف هذا
            'cjson:metadata': {
                // للمتصفح
                browser: {
                    name: 'chrome',
                    version: '58',
                },
                // للتطبيق
                app: {
                  name: 'name.of.app.ipa',
                  version: '1.2.3',
                },
                device: 'MacBook Pro 15',
                platform: {
                    name: 'OSX',
                    version: '10.12.6'
                }
            },
        },
    ],
};
```

> يجب أن يحتوي كائن البيانات الوصفية على بادئة `cjson`، وإلا فلن يعمل!

### قيم البيانات الوصفية
#### `metadata.app.name`
- **النوع:** `string`

**مثال:** اسم التطبيق.

#### `metadata.app.version`
- **النوع:** `string`

**مثال:** إصدار التطبيق.

#### `metadata.browser.name`
- **النوع:** `string`
- **القيم الممكنة:** `internet explorer | edge | chrome | firefox | safari`

#### `metadata.browser.version`
- **النوع:** `string`

**مثال:** إصدار المتصفح، يمكن إضافة هذا يدويًا أو استرداده أثناء تنفيذ الاختبارات للحصول على رقم الإصدار الدقيق.

#### `metadata.device`
- **النوع:** `string`

**مثال:** اسم يمثل نوع الجهاز. على سبيل المثال، إذا قمت بتشغيله على جهاز افتراضي، يمكنك وضعه هنا `Virtual Machine`،
أو اسم الجوال، مثل `iPhone 7 Plus`.

#### `metadata.platform.name`
- **النوع:** `string`
- **القيم الممكنة:** `windows | osx | linux | ubuntu | android | ios`

#### `metadata.platform.version`
- **النوع:** `string`

**مثال:** إصدار المنصة

> إذا لم تقدم كائن `browser` في البيانات الوصفية، ستقوم هذه الوحدة بتحديده تلقائيًا لك. **ستقوم دائمًا باستبدالها بأحدث قيمة يمكنها تحديدها.**

> إذا لم تقدم `device` و/أو كائن `platform` سيتم تعيينه افتراضيًا لك إلى `not known`

> إذا لم تقدم `browser.name` أو `browser.version` ستحاول الوحدة تحديد ذلك تلقائيًا.

## المرفقات
لديك خيار إرفاق البيانات بملف JSON في كل هذه الخطافات / الخطوات:

- Before(All)
- After(All)
- Given
- When
- Then
- And

الشيء الوحيد الذي تحتاج إلى توفيره هو الكود التالي في ملفات الخطوات الخاصة بك.

لوحدات ES (ESM)
```js
import cucumberJson from 'wdio-cucumberjs-json-reporter';

// إرفاق سلسلة (إذا لم يتم توفير نوع ، فستكون افتراضيًا `text/plain`)
cucumberJson.attach('just a string');
cucumberJson.attach('just a second string', 'text/plain');

// إرفاق JSON
cucumberJson.attach({"json-string": true}, 'application/json');

// إرفاق لقطة شاشة في خطاف قبل
cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
```
لـ CommonJS (CJS)
```js
const { attach } = require("wdio-cucumberjs-json-reporter");

// إرفاق سلسلة (إذا لم يتم توفير نوع ، فستكون افتراضيًا `text/plain`)
attach('just a string');
attach('just a second string', 'text/plain');

// إرفاق JSON
attach({"json-string": true}, 'application/json');

// إرفاق لقطة شاشة في خطاف قبل
attach(await browser.takeScreenshot(), 'image/png');
```

## استخدامه مع multiple-cucumber-html-reporter
الوحدة السابقة لـ WebdriverIO V4، [wdio-multiple-cucumber-html-reporter](https://github.com/webdriverio-community/wdio-multiple-cucumber-html-reporter)،
كان لديها اتصال مدمج مع وحدة [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter). **هذا ليس هو الحال مع هذا
المُسجل** لأن الإعداد الجديد لـ WebdriverIO V5 يعتمد على مثيل لا يسمح لي باستخدام الخطاف `onPrepare` و `onComplete`.

إذا كنت لا تزال ترغب في استخدام وحدة [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter) يمكنك إضافة ما يلي إلى ملف التكوين الخاص بك.

- قم بتثبيت الوحدة باستخدام

    ```bash
    npm install multiple-cucumber-html-reporter --save-dev
    ```

- أضف هذا إلى ملف التكوين الخاص بك

    ```js
    import fs from 'node:fs/promises'
    // قم باستيراد الوحدة
    import { generate } from 'multiple-cucumber-html-reporter'

    // مثال wdio.conf.js
    export const config = {
      //..

      // =====
      // Hooks
      // =====
      /**
       * يتم تنفيذه مرة واحدة قبل إطلاق جميع العمال.
       */
      onPrepare: () => {
        // إزالة مجلد `.tmp/` الذي يحتوي على ملفات json والتقارير
        return fs.rm('.tmp/', { recursive: true });
      },
      /**
       * يتم تنفيذه بعد إغلاق جميع العمال وعلى وشك الخروج من العملية.
       */
      onComplete: () => {
        // إنشاء التقرير عند الانتهاء من جميع الاختبارات
        generate({
          // مطلوب
          // يجب أن يكون هذا الجزء هو نفس المسار الذي تخزن فيه ملفات JSON
          // الافتراضي = '.tmp/json/'
          jsonDir: '.tmp/json/',
          reportPath: '.tmp/report/',
          // لمزيد من الخيارات راجع https://github.com/wswebcreation/multiple-cucumber-html-reporter#options
        });
      }
    }
    ```

## إصدارات WebdriverIO القديمة

> **هذه الوحدة يمكنها العمل فقط مع WebdriverIO V8+!**\
> **للإصدار V6 يرجى التحقق من الوثائق [هنا](https://github.com/webdriverio-community/wdio-cucumberjs-json-reporter/tree/v6) واستخدام الإصدار 2.0.4**\
> **للإصدار V5 يرجى التحقق من الوثائق [هنا](https://github.com/webdriverio-community/wdio-cucumberjs-json-reporter/tree/v5) واستخدام الإصدار 1.3.0**

> **هذه الوحدة ليست بديلاً عن [wdio-multiple-cucumber-html-reporter](https://github.com/wswebcreation/wdio-multiple-cucumber-html-reporter). تلك الوحدة تدعم فقط WEBDRIVERIO V4 وتنشئ أيضًا تقريرًا. هذه الوحدة تنشئ فقط JSON، وليس تقريرًا!!**