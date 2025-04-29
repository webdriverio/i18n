---
id: browserstack-service
title: خدمة براوزرستاك
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-browserstack-service/README.md
---


> خدمة WebdriverIO تدير النفق المحلي وبيانات الوصف للوظائف لمستخدمي BrowserStack.

## التثبيت


الطريقة الأسهل هي الاحتفاظ بـ `@wdio/browserstack-service` كـ devDependency في ملف `package.json` الخاص بك، عبر:

```sh
npm install @wdio/browserstack-service --save-dev
```

يمكن العثور على تعليمات حول كيفية تثبيت `WebdriverIO` [هنا.](https://webdriver.io/docs/gettingstarted)


## التكوين

يدعم WebdriverIO خدمة BrowserStack بشكل افتراضي. يجب عليك تعيين `user` و `key` في ملف `wdio.conf.js` الخاص بك. توفر هذه الخدمة الإضافية دعمًا لـ [BrowserStack Tunnel](https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/local-testing). قم بتعيين `browserstackLocal: true` أيضًا لتفعيل هذه الميزة.
سيحترم تقرير حالة الجلسة على BrowserStack إعداد `strict` لخيارات Cucumber.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    services: [
        ['browserstack', {
            testObservability: true,
            testObservabilityOptions: {
                projectName: "Your project name goes here",
                buildName: "The static build job name goes here e.g. Nightly regression"
            },
            browserstackLocal: true
        }]
    ],
    // ...
};
```

## الخيارات

من أجل التصريح لخدمة BrowserStack، يجب أن يحتوي ملف التكوين الخاص بك على خيار [`user`](https://webdriver.io/docs/options#user) و [`key`](https://webdriver.io/docs/options#key).

### testObservability

مراقبة الاختبار هي أداة متقدمة لتقارير الاختبار توفر رؤى لتحسين اختبارات الأتمتة الخاصة بك وتساعدك على تصحيح الأخطاء بشكل أسرع. يتم تمكينها افتراضيًا عن طريق تعيين علامة `testObservability` كـ `true` لجميع مستخدمي خدمة browserstack. يمكنك تعطيل هذا عن طريق تعيين علامة `testObservability` إلى `false`.

بمجرد انتهاء اختباراتك، يمكنك زيارة [Test Observability](https://observability.browserstack.com/) لتصحيح الأخطاء في عمليات البناء الخاصة بك مع رؤى إضافية مثل تحليل الأخطاء الفريدة، واكتشاف اختبارات الخلل التلقائي، والمزيد.

يمكنك استخدام Test Observability حتى إذا لم تقم بتشغيل اختباراتك على بنية BrowserStack. حتى إذا قمت بتشغيل اختباراتك على CI، أو جهاز محلي، أو حتى على مزودي خدمة سحابية أخرى، فلا يزال بإمكان Test Observability إنشاء تقارير اختبار ذكية وتحليلات متقدمة لاختباراتك.

إذا كنت ترغب في استخدام Test Observability دون تشغيل اختباراتك على بنية BrowserStack، يمكنك تعيين التكوين الخاص بك على النحو التالي:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['browserstack', {
            testObservability: true,
            testObservabilityOptions: {
                user: process.env.BROWSERSTACK_USERNAME,
                key: process.env.BROWSERSTACK_ACCESS_KEY,
                projectName: "Your project name goes here",
                buildName: "The static build job name goes here e.g. Nightly regression"
            }
        }]
    ],
    // ...
};
```

يمكنك استكشاف جميع ميزات Test Observability في [هذه البيئة التجريبية](https://observability-demo.browserstack.com/) أو قراءة المزيد عنها [هنا](https://www.browserstack.com/docs/test-observability/overview/what-is-test-observability).

### browserstackLocal
قم بتعيين هذا إلى true لتمكين توجيه الاتصالات من سحابة BrowserStack عبر جهاز الكمبيوتر الخاص بك.

النوع: `Boolean`<br />
الافتراضي: `false`

### forcedStop
قم بتعيين هذا إلى true لإنهاء عملية BrowserStack Local عند الانتهاء، دون انتظار استدعاء إيقاف BrowserStack Local. هذا تجريبي ويجب ألا يستخدم من قبل الجميع. ضروري في الغالب كحل بديل لـ [هذه المشكلة](https://github.com/browserstack/browserstack-local-nodejs/issues/41).

النوع: `Boolean`<br />
الافتراضي: `false`

### app

[Appium](https://appium.io/) قم بتعيين هذا مع مسار ملف التطبيق المتاح محليًا على جهازك لاستخدام التطبيق كـ [تطبيق قيد الاختبار](https://www.browserstack.com/docs/app-automate/appium/set-up-tests/specify-app) لجلسات Appium.

النوع: `String` أو `JsonObject`<br />
الافتراضي: `undefined`

قائمة قيم التطبيق المتاحة:

#### path
استخدم مسار ملف التطبيق المتاح محليًا كتطبيق قيد الاختبار لـ Appium.

```js
services: [
  ['browserstack', {
    app: '/path/to/local/app.apk'
    // OR
    app: {
      path: '/path/to/local/app.apk'
    }
  }]
]
```

تمرير custom_id أثناء رفع التطبيق.

```js
services: [
  ['browserstack', {
    app: {
      path: '/path/to/local/app.apk',
      custom_id: 'custom_id'
    }
  }]
]
```

#### id
استخدم عنوان URL للتطبيق الذي تم إرجاعه بعد رفع التطبيق إلى BrowserStack.

```js
services: [
  ['browserstack', {
    app: 'bs://<app-id>'
    // OR
    app: {
      id: 'bs://<app-id>'
    }
  }]
]
```

#### custom_id

استخدم custom_id للتطبيقات التي تم رفعها بالفعل

```js
services: [
  ['browserstack', {
    app: 'custom_id'
    // OR
    app: {
      custom_id: 'custom_id'
    }
  }]
]
```

#### shareable_id

استخدم shareable_id للتطبيقات التي تم رفعها بالفعل

```js
services: [
  ['browserstack', {
    app: 'username/custom_id'
    // OR
    app: {
      shareable_id: 'username/custom_id'
    }
  }]
]
```

### preferScenarioName

خاص بـ Cucumber. قم بتعيين اسم جلسة BrowserStack Automate إلى اسم السيناريو إذا تم تشغيل سيناريو واحد فقط.
مفيد عند التشغيل بالتوازي مع [wdio-cucumber-parallel-execution](https://github.com/SimitTomar/wdio-cucumber-parallel-execution).

النوع: `Boolean`<br />
الافتراضي: `false`

### sessionNameFormat

تخصيص تنسيق اسم جلسة BrowserStack Automate.

النوع: `Function`<br />
الافتراضي (Cucumber/Jasmine): `(config, capabilities, suiteTitle) => suiteTitle`<br />
الافتراضي (Mocha): `(config, capabilities, suiteTitle, testTitle) => suiteTitle + ' - ' + testTitle`

### sessionNameOmitTestTitle

خاص بـ Mocha. لا تقم بإلحاق عنوان الاختبار باسم جلسة BrowserStack Automate.

النوع: `Boolean`<br />
الافتراضي: `false`

### sessionNamePrependTopLevelSuiteTitle

خاص بـ Mocha. إضافة عنوان المجموعة العلوية إلى اسم جلسة BrowserStack Automate.

النوع: `Boolean`<br />
الافتراضي: `false`

### setSessionName

تعيين اسم جلسة BrowserStack Automate تلقائيًا.

النوع: `Boolean`<br />
الافتراضي: `true`

### setSessionStatus

تعيين حالة جلسة BrowserStack Automate تلقائيًا (نجاح/فشل).

النوع: `Boolean`<br />
الافتراضي: `true`

### buildIdentifier

**buildIdentifier** هو معرف فريد لتمييز كل تنفيذ يتم إلحاقه بـ buildName. اختر تنسيق معرف البناء الخاص بك من التعبيرات المتاحة:
* `BUILD_NUMBER`: ينشئ عدادًا تزايديًا مع كل تنفيذ
* `DATE_TIME`: ينشئ طابع زمني مع كل تنفيذ. مثال: 05-Nov-19:30

```js
services: [
  ['browserstack', {
    buildIdentifier: '#${BUILD_NUMBER}'
  }]
]
```
يدعم معرف البناء استخدام أي من التعبيرات أو كليهما جنبًا إلى جنب مع أي أحرف أخرى مما يتيح خيارات تنسيق مخصصة.

### opts

خيارات BrowserStack Local.

النوع: `Object`<br />
الافتراضي: `{}`

قائمة بالمعدلات المتاحة للاختبار المحلي التي سيتم تمريرها كخيارات:

#### Local Identifier

إذا كنت تقوم بإجراء اتصالات اختبار محلية متعددة متزامنة، فقم بتعيين هذا بشكل فريد لعمليات مختلفة -

```js
opts = { localIdentifier: "randomstring" };
```

#### Verbose Logging

لتمكين التسجيل المفصل -

```js
opts = { verbose: "true" };
```

ملاحظة - القيم المحتملة لمعدل "verbose" هي "1"، "2"، "3" و "true"

#### Force Local

لتوجيه كل حركة المرور عبر الجهاز المحلي (جهازك) -

```js
opts = { forceLocal: "true" };
```

#### Folder Testing

لاختبار المجلد المحلي بدلاً من الخادم الداخلي، قم بتوفير المسار إلى المجلد كقيمة لهذا الخيار -

```js
opts = { f: "/my/awesome/folder" };
```

#### Force Start

لقتل مثيلات BrowserStack Local الأخرى قيد التشغيل -

```js
opts = { force: "true" };
```

#### Only Automate

لتعطيل الاختبار المحلي لـ Live و Screenshots، وتمكين Automate فقط -

```js
opts = { onlyAutomate: "true" };
```

#### Proxy

لاستخدام وكيل للاختبار المحلي -

- proxyHost: اسم المضيف/عنوان IP للوكيل، يتم تجاهل خيارات الوكيل المتبقية إذا كان هذا الخيار غائبًا
- proxyPort: منفذ للوكيل، يتم تعيينه افتراضيًا إلى 3128 عند استخدام -proxyHost
- proxyUser: اسم المستخدم للاتصال بالوكيل (المصادقة الأساسية فقط)
- proxyPass: كلمة المرور لـ USERNAME، سيتم تجاهلها إذا كان USERNAME فارغًا أو غير محدد

```js
opts = {
  proxyHost: "127.0.0.1",
  proxyPort: "8000",
  proxyUser: "user",
  proxyPass: "password",
};
```

#### Local Proxy

لاستخدام وكيل محلي في الاختبار المحلي -

- localProxyHost: اسم المضيف/عنوان IP للوكيل، يتم تجاهل خيارات الوكيل المتبقية إذا كان هذا الخيار غائبًا
- localProxyPort: منفذ للوكيل، يتم تعيينه افتراضيًا إلى 8081 عند استخدام -localProxyHost
- localProxyUser: اسم المستخدم للاتصال بالوكيل (المصادقة الأساسية فقط)
- localProxyPass: كلمة المرور لـ USERNAME، سيتم تجاهلها إذا كان USERNAME فارغًا أو غير محدد

```js
opts = {
  localProxyHost: "127.0.0.1",
  localProxyPort: "8000",
  localProxyUser: "user",
  localProxyPass: "password",
};
```

#### PAC (Proxy Auto-Configuration)

لاستخدام PAC (التكوين التلقائي للوكيل) في الاختبار المحلي -

- pac-file: المسار المطلق لملف PAC (التكوين التلقائي للوكيل)

```js
opts = { "pac-file": "<pac_file_abs_path>" };
```

#### Binary Path

بشكل افتراضي، تحاول مغلفات BrowserStack المحلية تنزيل وتنفيذ أحدث إصدار من ثنائي BrowserStack في ~/.browserstack أو دليل العمل الحالي أو مجلد tmp حسب الترتيب. ولكن يمكنك تجاوز هذه عن طريق تمرير وسيطة -binarypath.
المسار لتحديد مسار الثنائي المحلي -

```js
opts = { binarypath: "/path/to/binary" };
```

#### Logfile

لحفظ السجلات في ملف أثناء التشغيل باستخدام الوسيطة "-v"، يمكنك تحديد مسار الملف. بشكل افتراضي، يتم حفظ السجلات في ملف local.log في دليل العمل الحالي.
لتحديد المسار إلى الملف حيث سيتم حفظ السجلات -

```js
opts = { verbose: "true", logFile: "./local.log" };
```

----

لمزيد من المعلومات حول WebdriverIO، راجع [الصفحة الرئيسية](https://webdriver.io).