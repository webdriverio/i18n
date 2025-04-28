---
id: boilerplates
title: مشاريع البوابة الجاهزة
---

بمرور الوقت، قامت مجتمعنا بتطوير عدة مشاريع يمكنك استخدامها كإلهام لإعداد مجموعة الاختبارات الخاصة بك.

# مشاريع البوابة الجاهزة v8

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

البوابة الجاهزة الخاصة بنا لمجموعات اختبار Cucumber. قمنا بإنشاء أكثر من 150 تعريفًا مسبقًا للخطوات لك، حتى تتمكن من البدء في كتابة ملفات الميزات في مشروعك على الفور.

- الإطار:
    - Cucumber
    - WebdriverIO
- الميزات:
    - أكثر من 150 خطوة محددة مسبقًا تغطي تقريبًا كل ما تحتاجه
    - يدمج وظيفة Multiremote من WebdriverIO
    - تطبيق تجريبي خاص

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
مشروع بوابة جاهزة لتشغيل اختبارات WebdriverIO مع Jasmine باستخدام ميزات Babel ونمط كائنات الصفحة.

- أطر العمل
    - WebdriverIO
    - Jasmine
- الميزات
    - نمط كائنات الصفحة
    - تكامل Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
مشروع بوابة جاهزة لتشغيل اختبارات WebdriverIO على تطبيق Electron بسيط.

- أطر العمل
    - WebdriverIO
    - Mocha
- الميزات
    - محاكاة واجهة برمجة Electron

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

مشروع البوابة الجاهزة هذا يحتوي على اختبارات WebdriverIO 8 مع cucumber و typescript، متبعة نمط كائنات الصفحة.

- أطر العمل:
    - WebdriverIO v8
    - Cucumber v8

- الميزات:
    - Typescript v5
    - نمط كائنات الصفحة
    - Prettier
    - دعم متعدد المتصفحات
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - تنفيذ متوازي عبر المتصفحات
    - Appium
    - تكامل الاختبار السحابي مع BrowserStack و Sauce Labs
    - خدمة Docker
    - خدمة مشاركة البيانات
    - ملفات تكوين منفصلة لكل خدمة
    - إدارة بيانات الاختبار والقراءة حسب نوع المستخدم
    - إعداد التقارير
      - Dot
      - Spec
      - تقارير html متعددة لـ cucumber مع لقطات فشل
    - خطوط أنابيب Gitlab لمستودع Gitlab
    - إجراءات Github لمستودع Github
    - Docker compose لإعداد مركز docker
    - اختبار سهولة الوصول باستخدام AXE
    - اختبار بصري باستخدام Applitools
    - آلية السجل

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- إطار العمل: WDIO-V8 مع Cucumber (V8x).
- الميزات:
    - يستخدم نموذج كائنات الصفحة مع نهج قائم على الفئة بأسلوب ES6 /ES7 ودعم TypeScript
    - أمثلة على خيار محدد متعدد للاستعلام عن العنصر بأكثر من محدد في وقت واحد
    - أمثلة على تنفيذ متصفح متعدد ومتصفح بدون رأس باستخدام - Chrome و Firefox
    - تكامل الاختبار السحابي مع BrowserStack و Sauce Labs و LambdaTest
    - أمثلة على قراءة/كتابة البيانات من MS-Excel لسهولة إدارة بيانات الاختبار من مصادر البيانات الخارجية مع أمثلة
    - دعم قاعدة البيانات لأي RDBMS (Oracle، MySql، TeraData، Vertica إلخ)، وتنفيذ أي استعلامات / جلب مجموعة النتائج إلخ. مع أمثلة للاختبار E2E
    - تقارير متعددة (Spec، Xunit/Junit، Allure، JSON) واستضافة تقارير Allure و Xunit/Junit على خادم الويب.
    - أمثلة مع تطبيق تجريبي https://search.yahoo.com/ و http://the-internet.herokuapp.com.
    - ملف تكوين `.config` محدد لـ BrowserStack و Sauce Labs و LambdaTest و Appium (للتشغيل على الأجهزة المحمولة). لإعداد Appium بنقرة واحدة على الجهاز المحلي لـ iOS و Android، راجع [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- إطار العمل: WDIO-V8 مع Mocha (V10x).
- الميزات:
    -  يستخدم نموذج كائنات الصفحة مع نهج قائم على الفئة بأسلوب ES6 /ES7 ودعم TypeScript
    -  أمثلة مع تطبيق تجريبي https://search.yahoo.com و http://the-internet.herokuapp.com
    -  أمثلة على تنفيذ متصفح متعدد ومتصفح بدون رأس باستخدام - Chrome و Firefox
    -  تكامل الاختبار السحابي مع BrowserStack و Sauce Labs و LambdaTest
    -  تقارير متعددة (Spec، Xunit/Junit، Allure، JSON) واستضافة تقارير Allure و Xunit/Junit على خادم الويب.
    -  أمثلة على قراءة/كتابة البيانات من MS-Excel لسهولة إدارة بيانات الاختبار من مصادر البيانات الخارجية مع أمثلة
    -  أمثلة على اتصال قاعدة البيانات بأي RDBMS (Oracle، MySql، TeraData، Vertica إلخ)، وتنفيذ أي استعلام / جلب مجموعة النتائج إلخ. مع أمثلة للاختبار E2E
    -  ملف تكوين `.config` محدد لـ BrowserStack و Sauce Labs و LambdaTest و Appium (للتشغيل على الأجهزة المحمولة). لإعداد Appium بنقرة واحدة على الجهاز المحلي لـ iOS و Android، راجع [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- إطار العمل: WDIO-V8 مع Jasmine (V4x).
- الميزات:
    -  يستخدم نموذج كائنات الصفحة مع نهج قائم على الفئة بأسلوب ES6 /ES7 ودعم TypeScript
    -  أمثلة مع تطبيق تجريبي https://search.yahoo.com و http://the-internet.herokuapp.com
    -  أمثلة على تنفيذ متصفح متعدد ومتصفح بدون رأس باستخدام - Chrome و Firefox
    -  تكامل الاختبار السحابي مع BrowserStack و Sauce Labs و LambdaTest
    -  تقارير متعددة (Spec، Xunit/Junit، Allure، JSON) واستضافة تقارير Allure و Xunit/Junit على خادم الويب.
    -  أمثلة على قراءة/كتابة البيانات من MS-Excel لسهولة إدارة بيانات الاختبار من مصادر البيانات الخارجية مع أمثلة
    -  أمثلة على اتصال قاعدة البيانات بأي RDBMS (Oracle، MySql، TeraData، Vertica إلخ)، وتنفيذ أي استعلام / جلب مجموعة النتائج إلخ. مع أمثلة للاختبار E2E
    -  ملف تكوين `.config` محدد لـ BrowserStack و Sauce Labs و LambdaTest و Appium (للتشغيل على الأجهزة المحمولة). لإعداد Appium بنقرة واحدة على الجهاز المحلي لـ iOS و Android، راجع [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- أطر العمل
    - WebdriverIO (v8)
    - Cucumber (v8)

- الميزات
    - تحتوي على سيناريو اختبار نموذجي في cucumber
    - تقارير html لـ cucumber متكاملة مع مقاطع فيديو مضمنة عند الفشل
    - خدمات Lambdatest و CircleCI متكاملة
    - اختبارات مرئية وسهولة الوصول و API متكاملة
    - وظائف البريد الإلكتروني المتكاملة
    - دلو s3 متكامل لتخزين تقارير الاختبار واسترجاعها

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

مشروع قالب [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) لمساعدتك على البدء في اختبار القبول لتطبيقات الويب الخاصة بك باستخدام أحدث WebdriverIO و Mocha و Serenity/JS.

- أطر العمل
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - تقارير Serenity BDD

- الميزات
    - [نمط Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - لقطات شاشة تلقائية عند فشل الاختبار، مضمنة في التقارير
    - إعداد التكامل المستمر (CI) باستخدام [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [تقارير Serenity BDD التجريبية](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) منشورة على صفحات GitHub
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

مشروع قالب [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) لمساعدتك على البدء في اختبار القبول لتطبيقات الويب الخاصة بك باستخدام أحدث WebdriverIO و Cucumber و Serenity/JS.

- أطر العمل
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - تقارير Serenity BDD

- الميزات
    - [نمط Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - لقطات شاشة تلقائية عند فشل الاختبار، مضمنة في التقارير
    - إعداد التكامل المستمر (CI) باستخدام [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [تقارير Serenity BDD التجريبية](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) منشورة على صفحات GitHub
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
مشروع بوابة جاهزة لتشغيل اختبارات WebdriverIO في سحابة Headspin (https://www.headspin.io/) باستخدام ميزات Cucumber، ونمط كائنات الصفحة.
- أطر العمل
    - WebdriverIO (v8)
    - Cucumber (v8)

- الميزات
    - تكامل سحابي مع [Headspin](https://www.headspin.io/)
    - يدعم نموذج كائنات الصفحة
    - يحتوي على سيناريوهات نموذجية مكتوبة بأسلوب BDD التصريحي
    - تقارير html لـ cucumber متكاملة

# مشاريع البوابة الجاهزة v7

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

مشروع بوابة جاهزة لتشغيل اختبارات Appium مع WebdriverIO لـ:

- تطبيقات iOS/Android الأصلية
- تطبيقات iOS/Android الهجينة
- متصفح Android Chrome و iOS Safari

تتضمن هذه البوابة الجاهزة ما يلي:

- إطار العمل: Mocha
- الميزات:
    - تكوينات لـ:
        - تطبيق iOS و Android
        - متصفحات iOS و Android
    - مساعدون لـ:
        - WebView
        - الإيماءات
        - التنبيهات الأصلية
        - أدوات الانتقاء
     - أمثلة اختبارات لـ:
        - WebView
        - تسجيل الدخول
        - النماذج
        - السحب
        - المتصفحات

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
اختبارات ATDD WEB مع Mocha و WebdriverIO v6 مع PageObject

- أطر العمل
  - WebdriverIO (v7)
  - Mocha
- الميزات
  - نموذج [كائنات الصفحة](pageobjects)
  - تكامل Sauce Labs مع [خدمة Sauce](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - تقرير Allure
  - التقاط تلقائي للقطات الشاشة للاختبارات الفاشلة
  - مثال CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

مشروع بوابة جاهزة لتشغيل اختبارات E2E مع Mocha.

- أطر العمل:
    - WebdriverIO (v7)
    - Mocha
- الميزات:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [اختبارات انحدار مرئية](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   نمط كائنات الصفحة
    -   [فحص الالتزام](https://github.com/conventional-changelog/commitlint) و [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   مثال إجراءات Github
    -   تقرير Allure (لقطات عند الفشل)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

مشروع بوابة جاهزة لتشغيل اختبارات **WebdriverIO v7** للتالي:

[نصوص WDIO 7 مع TypeScript في إطار Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[نصوص WDIO 7 مع TypeScript في إطار Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[تشغيل نص WDIO 7 في Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[سجلات الشبكة](https://github.com/17thSep/MonitorNetworkLogs/)

مشروع بوابة جاهزة لـ:

- التقاط سجلات الشبكة
- التقاط جميع مكالمات GET/POST أو API REST محدد
- التأكد من معلمات الطلب
- التأكد من معلمات الاستجابة
- تخزين جميع الاستجابات في ملف منفصل

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

مشروع بوابة جاهزة لتشغيل اختبارات appium للتطبيقات الأصلية ومتصفح الجوال باستخدام cucumber v7 و wdio v7 مع نمط كائنات الصفحة.

- أطر العمل
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- الميزات
    - تطبيقات Android و iOS الأصلية
    - متصفح Android Chrome
    - متصفح iOS Safari
    - نموذج كائنات الصفحة
    - يحتوي على سيناريوهات اختبار نموذجية في cucumber
    - متكامل مع تقارير html متعددة لـ cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

هذا مشروع قالب لمساعدتك على إظهار كيفية تشغيل اختبار webdriverio من تطبيقات الويب باستخدام أحدث WebdriverIO، وإطار Cucumber. يهدف هذا المشروع إلى العمل كصورة أساسية يمكنك استخدامها لفهم كيفية تشغيل اختبارات WebdriverIO في docker

يتضمن هذا المشروع:

- DockerFile
- مشروع cucumber

اقرأ المزيد في: [مدونة Medium](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

هذا مشروع قالب لمساعدتك على إظهار كيفية تشغيل اختبارات electronJS باستخدام WebdriverIO. يهدف هذا المشروع إلى العمل كصورة أساسية يمكنك استخدامها لفهم كيفية تشغيل اختبارات WebdriverIO electronJS.

يتضمن هذا المشروع:

- تطبيق electronjs نموذجي
- نصوص اختبار cucumber نموذجية

اقرأ المزيد في: [مدونة Medium](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

هذا مشروع قالب لمساعدتك على إظهار كيفية أتمتة تطبيق Windows باستخدام winappdriver و WebdriverIO. يهدف هذا المشروع إلى العمل كصورة أساسية يمكنك استخدامها لفهم كيفية تشغيل اختبارات windappdriver و WebdriverIO.

اقرأ المزيد في: [مدونة Medium](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


هذا مشروع قالب لمساعدتك على إظهار كيفية تشغيل قدرة multiremote لـ webdriverio مع أحدث WebdriverIO، وإطار Jasmine. يهدف هذا المشروع إلى العمل كصورة أساسية يمكنك استخدامها لفهم كيفية تشغيل اختبارات WebdriverIO في docker

يستخدم هذا المشروع:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

مشروع قالب لتشغيل اختبارات appium على أجهزة Roku حقيقية باستخدام mocha مع نمط كائنات الصفحة.

- أطر العمل
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - تقارير Allure

- الميزات
    - نموذج كائنات الصفحة
    - Typescript
    - لقطة شاشة عند الفشل
    - اختبارات نموذجية باستخدام قناة Roku نموذجية

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

مشروع PoC لاختبارات Cucumber متعددة عن بُعد E2E وكذلك اختبارات Mocha المدفوعة بالبيانات

- إطار العمل:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- الميزات:
    - اختبارات E2E المستندة إلى Cucumber
    - اختبارات Mocha المدفوعة بالبيانات
    - اختبارات الويب فقط - في النظام المحلي وكذلك منصات سحابية
    - اختبارات الجوال فقط - محاكيات محلية وعن بعد (أو أجهزة)
    - اختبارات الويب + الجوال - عن بعد متعدد - منصات محلية وسحابية
    - تقارير متعددة متكاملة بما في ذلك Allure
    - تتم معالجة بيانات الاختبار (JSON / XLSX) عالميًا لكتابة البيانات (التي تم إنشاؤها على الطاير) إلى ملف بعد تنفيذ الاختبار
    - سير عمل Github لتشغيل الاختبار وتحميل تقرير allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

هذا هو مشروع بوابة جاهزة للمساعدة في إظهار كيفية تشغيل webdriverio متعدد المصادر باستخدام خدمة appium و chromedriver مع أحدث WebdriverIO.

- أطر العمل
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- الميزات
  - نموذج [كائنات الصفحة](pageobjects)
  - Typescript
  - اختبارات الويب + الجوال - متعدد المصادر
  - تطبيقات Android و iOS الأصلية
  - Appium
  - Chromedriver
  - ESLint
  - أمثلة اختبارات لتسجيل الدخول في http://the-internet.herokuapp.com و [تطبيق WebdriverIO التجريبي الأصلي](https://github.com/webdriverio/native-demo-app)