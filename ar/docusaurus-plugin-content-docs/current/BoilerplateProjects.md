---
id: boilerplates
title: مشاريع نموذجية (Boilerplate)
---

بمرور الوقت، قامت مجتمعنا بتطوير العديد من المشاريع التي يمكنك استخدامها كإلهام لإعداد مجموعة الاختبارات الخاصة بك.

# مشاريع نموذجية للإصدار التاسع (v9)

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

النموذج الخاص بنا لمجموعات اختبار Cucumber. قمنا بإنشاء أكثر من 150 تعريفًا مسبقًا للخطوات من أجلك، حتى تتمكن من البدء في كتابة ملفات الميزات في مشروعك على الفور.

- إطار العمل:
    - Cucumber
    - WebdriverIO
- الميزات:
    - أكثر من 150 خطوة محددة مسبقًا تغطي تقريبًا كل ما تحتاجه
    - يدمج وظيفة Multiremote في WebdriverIO
    - تطبيق تجريبي خاص

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
مشروع نموذجي لتشغيل اختبارات WebdriverIO مع Jasmine باستخدام ميزات Babel ونمط الكائنات الصفحية.

- أطر العمل
    - WebdriverIO
    - Jasmine
- الميزات
    - نمط الكائنات الصفحية (Page Object Pattern)
    - تكامل مع Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
مشروع نموذجي لتشغيل اختبارات WebdriverIO على تطبيق Electron بسيط.

- أطر العمل
    - WebdriverIO
    - Mocha
- الميزات
    - محاكاة واجهة برمجة تطبيقات Electron

## [amiya-pattnaik/gherkin-to-webdriverIO-test-generator](https://github.com/amiya-pattnaik/gherkin-to-webdriverIO-test-generator)
توليد فئات الكائنات الصفحية في WebdriverIO ومواصفات اختبار Mocha تلقائيًا من ملفات Gherkin .feature - مما يقلل من الجهد اليدوي، ويحسن الاتساق، ويسرع أتمتة ضمان الجودة. هذا المشروع لا ينتج أكوادًا متوافقة مع webdriver.io فحسب، بل يعزز أيضًا جميع وظائف webdriver.io.

***كيف يعمل؟***
- تتبع العملية خطوتين من الأتمتة:
- الخطوة 1: من Gherkin إلى stepMap (إنشاء ملفات stepMap.json)
  - إنشاء ملفات stepMap.json:
    - تحليل ملفات .feature المكتوبة بصيغة Gherkin.
    - استخراج السيناريوهات والخطوات.
    - إنتاج ملف .stepMap.json منظم يحتوي على:
      - الإجراء الذي يجب تنفيذه (مثل النقر، وتعيين نص، والتأكد من الرؤية)
      - اسم المحدد للتخطيط المنطقي
      - محدد لعنصر DOM
      - ملاحظة للقيم أو التأكيد
- الخطوة 2: من stepMap إلى كود (إنشاء كود WebdriverIO).
  يستخدم stepMap.json لإنشاء:
  - إنشاء فئة base page.js مع طرق مشتركة وإعداد browser.url().
  - إنشاء فئات نموذج الكائن الصفحي (POM) متوافقة مع WebdriverIO لكل ميزة داخل test/pageobjects/.
  - إنشاء مواصفات اختبار تعتمد على Mocha.
- بنية الدليل
```
project-root/
├── features/               # ملفات Gherkin للميزات المدخلة
├── stepMaps/               # خرائط الخطوات المنشأة (JSON)
├── test/
│   ├── pageobjects/        # فئة الصفحة الأساسية المنشأة، فئات الكائن الصفحي
│   └── specs/              # مواصفات الاختبار المنشأة
├── generateStepMap.js      # سكريبت مولد StepMap
├── generateTestsFromMap.js # مولد PageObject + مواصفات الاختبار
├── package.json
├── README.md
└── wdio.conf.js
```
---
# مشاريع نموذجية للإصدار الثامن (v8)

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- إطار العمل: WDIO-V8 مع Cucumber (V8x).
- الميزات:
    - نموذج الكائنات الصفحية يستخدم نهج الفئة المستند إلى ES6/ES7 ودعم TypeScript
    - أمثلة على خيار محدد متعدد للاستعلام عن عنصر بأكثر من محدد واحد في وقت واحد
    - أمثلة على تنفيذ متصفح متعدد وتنفيذ متصفح بدون واجهة باستخدام - Chrome و Firefox
    - تكامل اختبار سحابي مع BrowserStack و Sauce Labs و LambdaTest
    - أمثلة على قراءة/كتابة البيانات من MS-Excel لإدارة بيانات الاختبار بسهولة من مصادر البيانات الخارجية مع أمثلة
    - دعم قاعدة البيانات لأي RDBMS (Oracle، MySql، TeraData، Vertica إلخ)، وتنفيذ أي استعلامات / جلب مجموعة النتائج إلخ مع أمثلة للاختبار من طرف إلى طرف
    - تقارير متعددة (Spec، Xunit/Junit، Allure، JSON) واستضافة تقارير Allure و Xunit/Junit على خادم الويب.
    - أمثلة مع تطبيق تجريبي https://search.yahoo.com/ و http://the-internet.herokuapp.com.
    - ملفات .config خاصة بـ BrowserStack و Sauce Labs و LambdaTest و Appium (للتشغيل على الأجهزة المحمولة). لإعداد Appium بنقرة واحدة على الجهاز المحلي لنظامي iOS و Android، راجع [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- إطار العمل: WDIO-V8 مع Mocha (V10x).
- الميزات:
    - نموذج الكائنات الصفحية يستخدم نهج الفئة المستند إلى ES6/ES7 ودعم TypeScript
    - أمثلة مع تطبيق تجريبي https://search.yahoo.com و http://the-internet.herokuapp.com
    - أمثلة على تنفيذ متصفح متعدد وتنفيذ متصفح بدون واجهة باستخدام - Chrome و Firefox
    - تكامل اختبار سحابي مع BrowserStack و Sauce Labs و LambdaTest
    - تقارير متعددة (Spec، Xunit/Junit، Allure، JSON) واستضافة تقارير Allure و Xunit/Junit على خادم الويب.
    - أمثلة على قراءة/كتابة البيانات من MS-Excel لإدارة بيانات الاختبار بسهولة من مصادر البيانات الخارجية مع أمثلة
    - أمثلة على الاتصال بقاعدة البيانات مع أي RDBMS (Oracle، MySql، TeraData، Vertica إلخ)، وتنفيذ أي استعلام / جلب مجموعة النتائج إلخ. مع أمثلة للاختبار من طرف إلى طرف
    - ملفات .config خاصة بـ BrowserStack و Sauce Labs و LambdaTest و Appium (للتشغيل على الأجهزة المحمولة). لإعداد Appium بنقرة واحدة على الجهاز المحلي لنظامي iOS و Android، راجع [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- إطار العمل: WDIO-V8 مع Jasmine (V4x).
- الميزات:
    - نموذج الكائنات الصفحية يستخدم نهج الفئة المستند إلى ES6/ES7 ودعم TypeScript
    - أمثلة مع تطبيق تجريبي https://search.yahoo.com و http://the-internet.herokuapp.com
    - أمثلة على تنفيذ متصفح متعدد وتنفيذ متصفح بدون واجهة باستخدام - Chrome و Firefox
    - تكامل اختبار سحابي مع BrowserStack و Sauce Labs و LambdaTest
    - تقارير متعددة (Spec، Xunit/Junit، Allure، JSON) واستضافة تقارير Allure و Xunit/Junit على خادم الويب.
    - أمثلة على قراءة/كتابة البيانات من MS-Excel لإدارة بيانات الاختبار بسهولة من مصادر البيانات الخارجية مع أمثلة
    - أمثلة على الاتصال بقاعدة البيانات مع أي RDBMS (Oracle، MySql، TeraData، Vertica إلخ)، وتنفيذ أي استعلام / جلب مجموعة النتائج إلخ. مع أمثلة للاختبار من طرف إلى طرف
    - ملفات .config خاصة بـ BrowserStack و Sauce Labs و LambdaTest و Appium (للتشغيل على الأجهزة المحمولة). لإعداد Appium بنقرة واحدة على الجهاز المحلي لنظامي iOS و Android، راجع [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

يحتوي هذا المشروع النموذجي على اختبارات WebdriverIO 8 مع cucumber و typescript، متبعًا نمط الكائنات الصفحية.

- أطر العمل:
    - WebdriverIO v8
    - Cucumber v8

- الميزات:
    - Typescript v5
    - نمط الكائن الصفحي
    - Prettier
    - دعم متعدد المتصفحات
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - تنفيذ متوازي عبر المتصفحات
    - Appium
    - تكامل اختبار سحابي مع BrowserStack و Sauce Labs
    - خدمة Docker
    - خدمة مشاركة البيانات
    - ملفات تكوين منفصلة لكل خدمة
    - إدارة بيانات الاختبار والقراءة حسب نوع المستخدم
    - التقارير
      - Dot
      - Spec
      - تقرير cucumber html متعدد مع لقطات شاشة للفشل
    - خطوط أنابيب Gitlab لمستودع Gitlab
    - إجراءات Github لمستودع Github
    - تركيب Docker لإعداد مركز Docker
    - اختبار إمكانية الوصول باستخدام AXE
    - اختبار مرئي باستخدام Applitools
    - آلية السجلات


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- أطر العمل
    - WebdriverIO (v8)
    - Cucumber (v8)

- الميزات
    - يحتوي على سيناريو اختبار نموذجي في cucumber
    - تقارير html مدمجة مع مقاطع فيديو مضمنة في حالة الفشل
    - خدمات Lambdatest و CircleCI المتكاملة
    - اختبار مرئي وإمكانية الوصول واختبار API متكامل
    - وظائف البريد الإلكتروني المتكاملة
    - دلو s3 متكامل لتخزين تقارير الاختبار واسترجاعها

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

مشروع قالب [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) لمساعدتك على البدء في اختبار قبول تطبيقات الويب الخاصة بك باستخدام أحدث إصدارات WebdriverIO و Mocha و Serenity/JS.

- أطر العمل
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - تقارير Serenity BDD

- الميزات
    - [نمط السيناريو](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - لقطات شاشة تلقائية عند فشل الاختبار، مضمنة في التقارير
    - إعداد التكامل المستمر (CI) باستخدام [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [تقارير Serenity BDD التجريبية](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) المنشورة على GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

مشروع قالب [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) لمساعدتك على البدء في اختبار قبول تطبيقات الويب الخاصة بك باستخدام أحدث إصدارات WebdriverIO و Cucumber و Serenity/JS.

- أطر العمل
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - تقارير Serenity BDD

- الميزات
    - [نمط السيناريو](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - لقطات شاشة تلقائية عند فشل الاختبار، مضمنة في التقارير
    - إعداد التكامل المستمر (CI) باستخدام [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [تقارير Serenity BDD التجريبية](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) المنشورة على GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
مشروع نموذجي لتشغيل اختبارات WebdriverIO في سحابة Headspin (https://www.headspin.io/) باستخدام ميزات Cucumber، ونمط الكائنات الصفحية.
- أطر العمل
    - WebdriverIO (v8)
    - Cucumber (v8)

- الميزات
    - تكامل سحابي مع [Headspin](https://www.headspin.io/)
    - يدعم نموذج الكائن الصفحي
    - يحتوي على سيناريوهات نموذجية مكتوبة بأسلوب تصريحي لـ BDD
    - تقارير cucumber html مدمجة

# مشاريع نموذجية للإصدار السابع (v7)
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

مشروع نموذجي لتشغيل اختبارات Appium مع WebdriverIO لـ:

- تطبيقات iOS/Android الأصلية
- تطبيقات iOS/Android الهجينة
- متصفحات Android Chrome و iOS Safari

يتضمن هذا النموذج ما يلي:

- إطار العمل: Mocha
- الميزات:
    - تكوينات لـ:
        - تطبيق iOS و Android
        - متصفحات iOS و Android
    - مساعدات لـ:
        - WebView
        - الإيماءات
        - التنبيهات الأصلية
        - منتقي البيانات
     - أمثلة اختبارات لـ:
        - WebView
        - تسجيل الدخول
        - النماذج
        - التمرير
        - المتصفحات

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
اختبارات ATDD WEB مع Mocha و WebdriverIO v6 مع نمط PageObject

- أطر العمل
  - WebdriverIO (v7)
  - Mocha
- الميزات
  - نموذج [الكائن الصفحي](pageobjects)
  - تكامل Sauce Labs مع [خدمة Sauce](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - تقرير Allure
  - التقاط تلقائي للقطات الشاشة للاختبارات الفاشلة
  - مثال CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

مشروع نموذجي لتشغيل اختبارات E2E مع Mocha.

- أطر العمل:
    - WebdriverIO (v7)
    - Mocha
- الميزات:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [اختبارات تراجع مرئي](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   نمط الكائن الصفحي
    -   [ضبط الالتزامات](https://github.com/conventional-changelog/commitlint) و [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   مثال على إجراءات Github
    -   تقرير Allure (لقطات شاشة عند الفشل)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

مشروع نموذجي لتشغيل اختبارات **WebdriverIO v7** للتالي:

[سكريبتات WDIO 7 مع TypeScript في إطار Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[سكريبتات WDIO 7 مع TypeScript في إطار Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[تشغيل سكريبت WDIO 7 في Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[سجلات الشبكة](https://github.com/17thSep/MonitorNetworkLogs/)

مشروع نموذجي لـ:

- التقاط سجلات الشبكة
- التقاط جميع مكالمات GET/POST أو REST API محدد
- تأكيد معلمات الطلب
- تأكيد معلمات الاستجابة
- تخزين جميع الاستجابات في ملف منفصل

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

مشروع نموذجي لتشغيل اختبارات appium للتطبيقات الأصلية ومتصفح الجوال باستخدام cucumber v7 و wdio v7 مع نمط الكائن الصفحي.

- أطر العمل
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- الميزات
    - تطبيقات Android و iOS الأصلية
    - متصفح Android Chrome
    - متصفح iOS Safari
    - نموذج الكائن الصفحي
    - يحتوي على سيناريوهات اختبار نموذجية في cucumber
    - متكامل مع تقارير cucumber html متعددة

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

هذا مشروع قالب يساعدك على إظهار كيفية تشغيل اختبار webdriverio من تطبيقات الويب باستخدام أحدث WebdriverIO وإطار Cucumber. يهدف هذا المشروع إلى أن يكون صورة أساسية يمكنك استخدامها لفهم كيفية تشغيل اختبارات WebdriverIO في docker

يتضمن هذا المشروع:

- DockerFile
- مشروع cucumber

اقرأ المزيد على: [مدونة Medium](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

هذا مشروع قالب يساعدك على إظهار كيفية تشغيل اختبارات electronJS باستخدام WebdriverIO. يهدف هذا المشروع إلى أن يكون صورة أساسية يمكنك استخدامها لفهم كيفية تشغيل اختبارات WebdriverIO لـ electronJS.

يتضمن هذا المشروع:

- تطبيق electronjs نموذجي
- سكريبتات اختبار cucumber نموذجية

اقرأ المزيد على: [مدونة Medium](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

هذا مشروع قالب يساعدك على إظهار كيفية أتمتة تطبيق Windows باستخدام winappdriver و WebdriverIO. يهدف هذا المشروع إلى أن يكون صورة أساسية يمكنك استخدامها لفهم كيفية تشغيل اختبارات windappdriver و WebdriverIO.

اقرأ المزيد على: [مدونة Medium](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


هذا مشروع قالب يساعدك على إظهار كيفية تشغيل إمكانية multiremote في webdriverio مع أحدث WebdriverIO، وإطار Jasmine. يهدف هذا المشروع إلى أن يكون صورة أساسية يمكنك استخدامها لفهم كيفية تشغيل اختبارات WebdriverIO في docker

يستخدم هذا المشروع:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

مشروع قالب لتشغيل اختبارات appium على أجهزة Roku حقيقية باستخدام mocha مع نمط الكائن الصفحي.

- أطر العمل
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - تقارير Allure

- الميزات
    - نموذج الكائن الصفحي
    - Typescript
    - لقطة شاشة عند الفشل
    - اختبارات مثال باستخدام قناة Roku نموذجية

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

مشروع تجريبي لاختبارات Cucumber من طرف إلى طرف متعددة المراسلات بالإضافة إلى اختبارات Mocha المدفوعة بالبيانات

- إطار العمل:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- الميزات:
    - اختبارات E2E قائمة على Cucumber
    - اختبارات مدفوعة بالبيانات قائمة على Mocha
    - اختبارات الويب فقط - في المنصات المحلية وكذلك السحابية
    - اختبارات الجوال فقط - محاكيات محلية وكذلك سحابية عن بعد (أو أجهزة)
    - اختبارات الويب + الجوال - متعدد المراسلات - منصات محلية وكذلك سحابية
    - تقارير متعددة متكاملة بما في ذلك Allure
    - بيانات الاختبار (JSON / XLSX) يتم التعامل معها عالميًا بحيث يمكن كتابة البيانات (التي تم إنشاؤها على الفور) إلى ملف بعد تنفيذ الاختبار
    - سير عمل Github لتشغيل الاختبار وتحميل تقرير allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

هذا مشروع نموذجي للمساعدة في إظهار كيفية تشغيل webdriverio متعدد المراسلات باستخدام خدمة appium و chromedriver مع أحدث WebdriverIO.

- أطر العمل
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- الميزات
  - نموذج [الكائن الصفحي](pageobjects)
  - Typescript
  - اختبارات الويب + الجوال - متعدد المراسلات
  - تطبيقات Android و iOS الأصلية
  - Appium
  - Chromedriver
  - ESLint
  - أمثلة اختبارات لتسجيل الدخول في http://the-internet.herokuapp.com و [تطبيق WebdriverIO الأصلي التجريبي](https://github.com/webdriverio/native-demo-app)