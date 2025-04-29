---
id: wdio-video-reporter
title: مسجل الفيديو
custom_edit_url: https://github.com/presidenten/wdio-video-reporter/edit/main/README.md
---


> wdio-video-reporter هو حزمة خارجية، لمزيد من المعلومات يرجى الاطلاع على [GitHub](https://github.com/presidenten/wdio-video-reporter) | [npm](https://www.npmjs.com/package/wdio-video-reporter)

![Logo](https://raw.githubusercontent.com/presidenten/wdio-video-reporter-example-report/master/wdio-video-reporter.png)

هذا مسجل لـ [Webdriver IO v6 وأعلى](https://webdriver.io/) يقوم بإنشاء مقاطع فيديو لتنفيذ اختبارات wdio الخاصة بك. إذا كنت تستخدم allure، فإن حالات الاختبار تتزين تلقائيًا بمقاطع الفيديو أيضًا. (لـ Webdriver IO v5، يرجى استخدام wdio-video-reporter الإصدار ^2.0.0.)

تنتهي مقاطع الفيديو في `wdio.config.outputDir`

تحقق من تقرير Allure المثال مع مقاطع الفيديو المضمنة في الاختبارات الفاشلة هنا:
https://presidenten.github.io/wdio-video-reporter-example-report/

![example-allure-report](https://media.giphy.com/media/7Fgle7bHGrxR3zY6Gw/giphy.gif)

المزايا:
- مقاطع فيديو جميلة في تقارير allure الخاصة بك
- مقاطع فيديو بسرعة بشرية جميلة، حتى مع أن الاختبارات سريعة
- يعمل مع Selenium grid
- يعمل مع جميع برامج تشغيل الويب التي تدعم `saveScreenshot`
- تم التحقق على متصفحات سطح المكتب التالية باستخدام Selenium 3.141.59:
  - Chrome
  - Firefox
  - Safari
  - Internet Explorer 11
  - Microsoft Edge
- تم التحقق على أجهزة ios وandroid التالية مع [Appium](http://appium.io/docs/en/about-appium/getting-started/) 1.13.0-beta3:
  - Iphone 8
  - Ipad Gen 6
  - Samsung galaxy S9
  - Samsung galaxy tab A10

العيوب:
- يعمل عن طريق التقاط لقطات شاشة بعد "الإجراءات"، مما يجعل الاختبارات أبطأ قليلاً. يتم تخفيف ذلك من خلال اختيار بعناية أي رسائل [jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol) التي يجب أن تؤدي إلى لقطة شاشة
- لا تتضمن برامج تشغيل Selenium مربعات التنبيه والنوافذ المنبثقة في لقطات الشاشة، لذلك لا تكون مرئية في مقاطع الفيديو


البدء السريع
===========

تحقق من القالب البسيط في [wdio-template](https://github.com/presidenten/wdio-template) للحصول على السرعة بسرعة.

قم باستنساخ أحد المستودعات وتثبيت التبعيات باستخدام `yarn` أو `npm install`. ثم قم بتشغيل `yarn e2e` أو `npm run e2e` في دليل العرض التوضيحي وأخيرًا `yarn report` أو `npm run report` لرؤية تقرير allure.


التثبيت
============

تثبيت المسجل
--------------------

`yarn add wdio-video-reporter`
أو
`npm install wdio-video-reporter`


إضافة المسجل إلى التكوين
--------------------------

في أعلى ملف `wdio.conf.js`، قم باستدعاء المكتبة:
```
const video = require('wdio-video-reporter');
```

ثم أضف مسجل الفيديو إلى التكوين في خاصية reporters:

```
 reporters: [
    [video, {
      saveAllVideos: false,       // If true, also saves videos for successful test cases
      videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
    }],
  ],
```


الاستخدام مع Allure
-----------------

إضافة مسجل Allure أيضًا، يقوم تلقائيًا بتحديث التقارير بمقاطع الفيديو دون الحاجة إلى تكوين أي شيء :-)

```
 reporters: [
    [video, {
      saveAllVideos: false,       // If true, also saves videos for successful test cases
      videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
    }],
  ],
```


التكوين
=============

معلمات التكوين العادية
-------------------------------

قد يرغب معظم المستخدمين في تعيين هذه

- `saveAllVideos` قم بتعيينه على true لحفظ مقاطع الفيديو للاختبارات الناجحة. `الافتراضي: false`
- `videoSlowdownMultiplier` عدد صحيح بين [1-100]. زِد إذا كانت مقاطع الفيديو تشغل بسرعة كبيرة. `الافتراضي: 3`
- `videoRenderTimeout` الحد الأقصى للثواني للانتظار حتى يتم عرض الفيديو. `الافتراضي: 5`
- `outputDir` إذا لم يتم تعيينه، فإنه يستخدم wdio.config.outputDir. `الافتراضي: undefined`
- `outputDir` إذا لم يتم تعيينه، فإنه يستخدم wdio.config.outputDir. `الافتراضي: undefined`
- `maxTestNameCharacters` الحد الأقصى لطول اسم الاختبار. `الافتراضي: 250`

معلمات التكوين المتقدمة
---------------------------------

يمكن للمستخدمين المتقدمين الذين يرغبون في تغيير وقت التقاط المحرك للشاشة تعديل هذه. يمكن ملء هذه المصفوفات بالكلمة الأخيرة من رسالة [jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol)، أي /session/:sessionId/`buttondown`.

- `addExcludedActions` أضف الإجراءات التي لا ضرورة للقطات الشاشة فيها. `الافتراضي: []`
- `addJsonWireActions` أضف الإجراءات التي تفتقد للقطات الشاشة. `الافتراضي: []`
- `recordAllActions` تخطي التصفية والتقاط كل شيء. (غير موصى به) `الافتراضي: false`

لرؤية الرسائل المعالجة، قم بتعيين `wdio.config.logLevel: 'debug'` وتحقق من `outputDir/wdio-X-Y-Video-reporter.log`. سيؤدي ذلك أيضًا إلى ترك دليل إخراج لقطات الشاشة سليمًا للمراجعة

لتجنب التسجيل الإضافي تمامًا والحصول على ملفات الفيديو فقط، قم بتعيين `wdio.config.logLevel: 'silent'`.

دعم Cucumber
----------------

إذا كنت تستخدم مسجل Allure، فيجب عليك التأكد من القيام بما يلي:

- استخدم `chai` بدلاً من استخدام التأكيدات المدمجة في node وإلا فإن الاختبارات الفاشلة يتم الإبلاغ عنها على أنها معطلة في تعريفات خطواتك
- أضف `useCucumberStepReporter: true` إلى خيار Allure في ملف `wdio.conf.js`، سيبدو التكوين النموذجي كالتالي:
```
  reporters: [
    [video, {
      saveAllVideos: false,       // If true, also saves videos for successful test cases
      videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
      useCucumberStepReporter: true
    }],
  ],
```
للحصول على مثال كامل، تحقق من فرع cucumber في [wdio-template](https://github.com/presidenten/wdio-template/tree/cucumber)


إعداد Appium
------------

منذ `wdio-video-reporter` v1.2.4 هناك دعم لمساعدة Allure على التمييز بين متصفحات safari وchrome على سطح المكتب والأجهزة.
يستخدم المسجل خاصية مخصصة `deviceType` لتحديد الأجهزة المختلفة.
القيم الموصى بها هي `phone` و `tablet`.
يوصى بتضمين `browserVersion` أيضًا لـ _جميع_ المتصفحات لتجنب خلل في برنامج تشغيل Chrome عند استخدام الأجهزة في نفس Selenium grid كمتصفحات Chrome لسطح المكتب.

ستحصل ملفات الفيديو التي تم إنشاؤها أيضًا على `deviceType` مضافًا إلى اسم المتصفح.

مثال على تكوين appium:
```
  "capabilities": [
    {
      ...
      "deviceType": "phone",
      "browserVersion": "73.0-phone-1",
      ...
    }
  ],
```

و `wdio-config.json`:
```
  "capabilities": [
    {
      ...
      "appium:deviceType": "phone",
      "browserVersion": "73.0-phone-1",
      ...
    },
  ],
```


المساهمة
============

افترق، قم بإجراء التغييرات، اكتب بعض الاختبارات، قم بالتنسيق، قم بتشغيل الاختبارات، قم بالبناء، وتحقق في العرض التوضيحي من أن التغييرات تعمل كما ينبغي، ثم قم بعمل PR.

يعمل مجلد العرض التوضيحي مع النسخة المبنية من المكتبة، لذا تأكد من البناء إذا أضفت ميزات جديدة وتريد تجربتها.


شكر
======

شكرًا لـ [Johnson E](https://github.com/jonn-set) لإصلاح دعم Cucumber الذي طلبه الكثير من المستخدمين.