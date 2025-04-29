---
id: wdio-eslinter-service
title: الكشف التلقائي عن الاستيرادات المفقودة باستخدام خدمة eslint
custom_edit_url: https://github.com/jamesmortensen/wdio-eslinter-service/edit/main/README.md
---


> wdio-eslinter-service هي حزمة طرف ثالث، لمزيد من المعلومات يرجى مراجعة [GitHub](https://github.com/jamesmortensen/wdio-eslinter-service) | [npm](https://www.npmjs.com/package/wdio-eslinter-service)

هل سبق لك أن قمت بتشغيل اختبارات e2e، لتكتشف بعد 10 أو 15 أو 30 دقيقة أن هناك استيرادًا مفقودًا/خطأ إملائي، والذي لم يظهر إلا في منتصف تشغيل الاختبار؟ عندما يحدث هذا، يقوم مشغل الاختبار بالإبلاغ عن هذه الاختبارات على أنها معطلة.

eslint هي أداة رائعة لاكتشاف الأخطاء المختلفة قبل وقت التشغيل، وتقوم هذه الخدمة بتشغيل أداة eslint، قبل تنفيذ اختبارات WebdriverIO، كخطوة آلية بدلاً من خطوة يدوية.

من الأفضل في كثير من الأحيان الفشل بشكل أسرع حتى نتمكن من إصلاح المشكلات في وقت مبكر بدلاً من وقت متأخر.

التكوين الموصى به هو استخدام مشغل unresolved للتحقق من الاستيرادات المفقودة فقط، ولكن إذا رغبت في ذلك، يمكنك أيضًا تكوين الخدمة لتشغيل eslinter في مشروعك باستخدام مشغل npm أو yarn، أو عن طريق تمرير علامة تخبر النظام باستخدام تكوين .eslintrc الخاص بك أيضًا.

## التثبيت

قم بتثبيت wdio-eslinter-service:

```
$ npm i wdio-eslinter-service --save-dev 
```


### البدء السريع - التحقق من الاستيرادات المفقودة أو غير المحلولة فقط

بشكل افتراضي، هذا التكوين الأدنى، مشغل "unresolved"، يتحقق من استيرادات require غير المحلولة ويعرض خطأ إذا تم العثور على استيرادات غير محلولة. ثم تتوقف الخدمة عن التنفيذ. يمكنك تخصيص .eslintrc.js لإجراء المزيد من الفحوصات باستخدام مشغلات "npm" أو "yarn"، إذا رغبت في ذلك. راجع [eslint](https://www.npmjs.com/package/eslint) لمزيد من التفاصيل.

إذا لم يكن لديك تكوين `.eslintrc.js` في مشروعك، فيمكن تكوين wdio-eslinter-service لاستخدام تكوين افتراضي يتحقق فقط من الاستيرادات المفقودة قبل تشغيل الاختبارات. هذا مفيد حتى تكتشف الاستيرادات غير الصحيحة في وقت مبكر بدلاً من وقت متأخر. لتكوين هذا، أضف تكوين eslinter التالي إلى مصفوفة الخدمات الخاصة بك (بافتراض أنك تستخدم بالفعل خدمة chromedriver؛ وإلا، اترك هذا الجزء):

**wdio.conf.js:**
```
    services: ['chromedriver', [
        'eslinter',
        {
            runnerType: 'unresolved'
        }
    ]],
```

في هذه المرحلة، ابدأ تشغيل الاختبارات، وإذا كان هناك استيراد مفقود أو غير صحيح، سيقوم WebdriverIO بتسجيله وإنهاء تشغيل الاختبار على الفور:

```
$ npx wdio
```


#### اختياري - إذا كنت تستخدم module-alias

إذا كنت تستخدم وحدة [module-alias](https://www.npmjs.com/package/module-alias)، والتي تتيح لك تكوين أسماء مستعارة لاستبدال المسارات النسبية، فستحتاج إلى تمريرها إلى تكوين eslinter باستخدام المكون الإضافي eslint-import-resolver-custom-alias. فيما يلي مثال:

```
    services: ['chromedriver', [
        'eslinter',
        {
            runnerType: 'unresolved',
            eslintOverride: {
                "settings": {
                    "import/resolver": {
                        "eslint-import-resolver-custom-alias": {
                            "alias": {
                                "@utils": "./utils",
                                "@specs": "./test-sync/specs",
                                "@pageobjects": "./test-sync/pageobjects",
                                "@": "./"
                            }
                        }
                    }
                }
            }
        }
    ]],
```

قم بتثبيت المكون الإضافي في مشروعك:

```
$ npm i eslint-import-resolver-custom-alias
```

قم بتشغيل الاختبارات والتحقق من أن النظام سيجد الاستيرادات غير الصحيحة التي تستخدم أسماء مستعارة للوحدات:

```
$ npx wdio
```

#### تجريبي - استخدامه إلى جانب تكوين eslintrc موجود في مشروعك

لجعل خدمة eslinter تستخدم أيضًا تكوين eslintrc موجود في مشروعك، قم بتعيين `includeProjectEslintrc` إلى true في مصفوفة خدمات تكوين wdio.conf.js.

لقد واجهت مشاكل مع المكونات الإضافية المتضاربة. إذا كان إعداد eslint في مشروعك يبحث أيضًا عن استيرادات غير محلولة، فقد لا يعمل هذا وقد يتطلب تعديلات على ملف .eslintrc.js الخاص بك. هذا غير موصى به في الوقت الحالي.


### بدائل متقدمة - استخدام مشغلات npm و yarn

تساعد مشغلات npm و yarn في منحك تحكمًا إضافيًا في تشغيل إعداد eslinter موجود في مشروعك. مع هذا التكوين، يمكنك تحديد أوامر إضافية لتشغيلها في قسم run-scripts في package.json الخاص بك:

داخل ملف `package.json` الخاص بك، أضف هذا الإدخال إلى نصوص التشغيل الخاصة بك:

```json
{
    "scripts": {
        "eslint": "eslint ."
    }
}
```

**ملاحظة: إضافة eslint إلى package.json مطلوب لعمل الخدمة عند استخدام مشغلات npm أو yarn.**

إذا لم يكن لديك eslint مثبت ومكوّن بالفعل، فستحتاج إلى تثبيته وتكوينه في مشروعك، بالإضافة إلى أي مكونات إضافية تستخدمها، مثل eslint-plugin-import:

```
$ npm i eslint eslint-plugin-import
```

إذا كنت تستخدم المكون الإضافي eslint-import-resolver-custom-alias لتعيين أسماء مستعارة للوحدات إلى مساراتها الحقيقية، فستحتاج أيضًا إلى تثبيته:

```
$ npm i eslint-import-resolver-custom-alias
```

ستحتاج أيضًا إلى إنشاء ملف `.eslintrc.js`، إذا لم يكن لديك بالفعل أحد ملفات تكوين eslintrc في مشروعك. فيما يلي إعداد أساسي للبحث عن الاستيرادات غير المحلولة فقط، ويمكنك توسيع هذا التكوين للتحقق من فحوصات جودة الكود الأخرى قبل تشغيل الاختبارات:

```
// .eslintrc.js
module.exports = {
    "parserOptions": {
        "ecmaVersion": 2022
    },
    "plugins": [
        "import"
    ],
    "rules": {
        "import/no-unresolved": [
            2,
            {
                "commonjs": true,
                "amd": false,
                "caseSensitive": true
            }
        ]
    }
}
```

أخيرًا، أضف خدمة `eslinter` إلى مصفوفة الخدمات في `wdio.conf.js`:

```javascript
    services: ['eslinter']
```

قم بتشغيل `npm run eslint` للتحقق والبحث عن الأخطاء.

إذا كنت تستخدم `yarn`، يمكنك تكوين خيار الخدمة `runnerType`:

```javascript
    services: [
        ['eslinter', { runnerType: 'yarn' }]
    ]
```

إذا كان لديك بالفعل نص linter ترغب في إعادة استخدامه (بدلاً من `eslint`)، يمكنك تكوين خيار الخدمة `scriptName`:

```javascript
    services: [
        ['eslinter', { scriptName: 'eslint:check' }]
    ]
```

## الاستخدام في WebdriverIO

ابدأ مشغل اختبار WebdriverIO كالمعتاد. سيتحقق eslint من الكود. إذا تم العثور على أخطاء، يتوقف التنفيذ فورًا.

```bash
$ npx wdio
```


**مثال:**

```bash
$ npx wdio --spec ./test/specs/example.e2e.js 

Execution of 1 spec files started at 2021-05-15T12:04:05.388Z

2021-05-15T12:04:05.793Z WARN wdio-eslinter-service: initialize wdio-eslint-service using npm runner.
Deleted files and directories:
 /Users/jem/Dev/wdio-example/allure-results

/Users/jem/Dev/wdio-example/test/specs/login.js
  1:22  error  Unable to resolve path to module '.../pageObjects/Auth.page'  import/no-unresolved

✖ 1 problem (1 error, 0 warnings)

2021-05-15T12:04:08.581Z ERROR wdio-eslinter-service: SEVERE: Code contains eslint errors or eslint not installed.
```