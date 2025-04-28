---
id: boilerplates
title: مشاريع قوالب جاهزة
---

بمرور الوقت، طورت مجتمعنا العديد من المشاريع التي يمكن استخدامها كمصدر إلهام لإعداد مجموعة الاختبارات الخاصة بك.

# مشاريع قوالب جاهزة للإصدار الثامن

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

القالب الجاهز الخاص بنا لمجموعات اختبار Cucumber. قمنا بإنشاء أكثر من 150 تعريفًا مسبقًا للخطوات لك، حتى تتمكن من البدء في كتابة ملفات الميزات في مشروعك على الفور.

- إطار العمل:
    - Cucumber
    - WebdriverIO
- الميزات:
    - أكثر من 150 خطوة معرفة مسبقًا تغطي تقريبًا كل ما تحتاجه
    - يدمج وظيفة Multiremote الخاصة بـ WebdriverIO
    - تطبيق تجريبي خاص

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
مشروع قالب جاهز لتشغيل اختبارات WebdriverIO مع Jasmine باستخدام ميزات Babel ونمط كائنات الصفحة.

- أطر العمل
    - WebdriverIO
    - Jasmine
- الميزات
    - نمط كائن الصفحة
    - تكامل Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
مشروع قالب جاهز لتشغيل اختبارات WebdriverIO على تطبيق Electron بسيط.

- أطر العمل
    - WebdriverIO
    - Mocha
- الميزات
    - محاكاة واجهة برمجة تطبيقات Electron

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

يحتوي مشروع القالب الجاهز هذا على اختبارات WebdriverIO 8 مع cucumber و typescript، متبوعة بنمط كائنات الصفحة.

- أطر العمل:
    - WebdriverIO v8
    - Cucumber v8

- الميزات:
    - Typescript v5
    - نمط كائن الصفحة
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
    - إدارة بيانات الاختبار وقراءتها حسب نوع المستخدم
    - إعداد التقارير
      - Dot
      - Spec
      - تقارير متعددة لـ cucumber بصيغة HTML مع لقطات الشاشة للفشل
    - خطوط أنابيب Gitlab لمستودع Gitlab
    - إجراءات Github لمستودع Github
    - Docker compose لإعداد مركز Docker
    - اختبار إمكانية الوصول باستخدام AXE
    - اختبار مرئي باستخدام Applitools
    - آلية السجلات

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- إطار العمل: WDIO-V8 مع Cucumber (V8x).
- الميزات:
    - نموذج كائنات الصفحة يستخدم مع نهج الفئة المستند إلى أسلوب ES6 / ES7 ودعم TypeScript
    - أمثلة على خيار محدد متعدد للاستعلام عن العنصر بأكثر من محدد واحد في وقت واحد
    - أمثلة على تنفيذ متصفح متعدد وتنفيذ متصفح بدون واجهة باستخدام - Chrome و Firefox
    - تكامل الاختبار السحابي مع BrowserStack و Sauce Labs و LambdaTest
    - أمثلة على قراءة/كتابة البيانات من MS-Excel لسهولة إدارة بيانات الاختبار من مصادر البيانات الخارجية مع أمثلة
    - دعم قاعدة البيانات لأي RDBMS (Oracle و MySql و TeraData و Vertica وغيرها)، وتنفيذ أي استعلامات / جلب مجموعة النتائج وما إلى ذلك مع أمثلة لاختبار E2E
    - تقارير متعددة (Spec و Xunit/Junit و Allure و JSON) واستضافة تقارير Allure و Xunit/Junit على خادم الويب.
    - أمثلة مع تطبيق تجريبي https://search.yahoo.com/ و http://the-internet.herokuapp.com.
    - ملفات `.config` خاصة بـ BrowserStack و Sauce Labs و LambdaTest و Appium (للتشغيل على الأجهزة المحمولة). للحصول على إعداد Appium بنقرة واحدة على الجهاز المحلي لنظامي iOS و Android، راجع [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- إطار العمل: WDIO-V8 مع Mocha (V10x).
- الميزات:
    -  نموذج كائنات الصفحة يستخدم مع نهج الفئة المستند إلى أسلوب ES6 / ES7 ودعم TypeScript
    -  أمثلة مع تطبيق تجريبي https://search.yahoo.com و http://the-internet.herokuapp.com
    -  أمثلة على تنفيذ متصفح متعدد وتنفيذ متصفح بدون واجهة باستخدام - Chrome و Firefox
    -  تكامل الاختبار السحابي مع BrowserStack و Sauce Labs و LambdaTest
    -  تقارير متعددة (Spec و Xunit/Junit و Allure و JSON) واستضافة تقارير Allure و Xunit/Junit على خادم الويب.
    -  أمثلة على قراءة/كتابة البيانات من MS-Excel لسهولة إدارة بيانات الاختبار من مصادر البيانات الخارجية مع أمثلة
    -  أمثلة على الاتصال بقاعدة البيانات لأي RDBMS (Oracle و MySql و TeraData و Vertica وغيرها)، وتنفيذ أي استعلام / جلب مجموعة النتائج وما إلى ذلك مع أمثلة لاختبار E2E
    -  ملفات `.config` خاصة بـ BrowserStack و Sauce Labs و LambdaTest و Appium (للتشغيل على الأجهزة المحمولة). للحصول على إعداد Appium بنقرة واحدة على الجهاز المحلي لنظامي iOS و Android، راجع [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- إطار العمل: WDIO-V8 مع Jasmine (V4x).
- الميزات:
    -  نموذج كائنات الصفحة يستخدم مع نهج الفئة المستند إلى أسلوب ES6 / ES7 ودعم TypeScript
    -  أمثلة مع تطبيق تجريبي https://search.yahoo.com و http://the-internet.herokuapp.com
    -  أمثلة على تنفيذ متصفح متعدد وتنفيذ متصفح بدون واجهة باستخدام - Chrome و Firefox
    -  تكامل الاختبار السحابي مع BrowserStack و Sauce Labs و LambdaTest
    -  تقارير متعددة (Spec و Xunit/Junit و Allure و JSON) واستضافة تقارير Allure و Xunit/Junit على خادم الويب.
    -  أمثلة على قراءة/كتابة البيانات من MS-Excel لسهولة إدارة بيانات الاختبار من مصادر البيانات الخارجية مع أمثلة
    -  أمثلة على الاتصال بقاعدة البيانات لأي RDBMS (Oracle و MySql و TeraData و Vertica وغيرها)، وتنفيذ أي استعلام / جلب مجموعة النتائج وما إلى ذلك مع أمثلة لاختبار E2E
    -  ملفات `.config` خاصة بـ BrowserStack و Sauce Labs و LambdaTest و Appium (للتشغيل على الأجهزة المحمولة). للحصول على إعداد Appium بنقرة واحدة على الجهاز المحلي لنظامي iOS و Android، راجع [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- أطر العمل
    - WebdriverIO (v8)
    - Cucumber (v8)

- الميزات
    - يحتوي على سيناريو اختبار نموذجي في cucumber
    - تقارير html متكاملة لـ cucumber مع مقاطع فيديو مضمنة عند الفشل
    - خدمات Lambdatest و CircleCI المتكاملة
    - اختبارات مرئية ومتكاملة لإمكانية الوصول واختبار API
    - وظائف البريد الإلكتروني المتكاملة
    - تكامل حاوية s3 لتخزين تقارير الاختبار واسترجاعها

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

مشروع قالب [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) لمساعدتك على البدء في اختبار القبول لتطبيقات الويب الخاصة بك باستخدام أحدث WebdriverIO و Mocha و Serenity/JS.

- أطر العمل
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - تقارير Serenity BDD

- الميزات
    - [نمط السيناريو](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - لقطات شاشة تلقائية عند فشل الاختبار، مضمنة في التقارير
    - إعداد التكامل المستمر (CI) باستخدام [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [تقارير عرض Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) منشورة على صفحات GitHub
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
    - [نمط السيناريو](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - لقطات شاشة تلقائية عند فشل الاختبار، مضمنة في التقارير
    - إعداد التكامل المستمر (CI) باستخدام [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [تقارير عرض Serenity BDD](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) منشورة على صفحات GitHub
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
مشروع قالب جاهز لتشغيل اختبارات WebdriverIO في سحابة Headspin (https://www.headspin.io/) باستخدام ميزات Cucumber ونمط كائنات الصفحة.
- أطر العمل
    - WebdriverIO (v8)
    - Cucumber (v8)

- الميزات
    - تكامل سحابي مع [Headspin](https://www.headspin.io/)
    - يدعم نموذج كائن الصفحة
    - يحتوي على سيناريوهات نموذجية مكتوبة بأسلوب BDD التصريحي
    - تقارير html متكاملة لـ cucumber

# مشاريع قوالب جاهزة للإصدار السابع

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

مشروع قالب جاهز لتشغيل اختبارات Appium مع WebdriverIO لـ:

- تطبيقات iOS/Android الأصلية
- تطبيقات iOS/Android الهجينة
- متصفح Android Chrome و iOS Safari

يتضمن هذا القالب الجاهز ما يلي:

- إطار العمل: Mocha
- الميزات:
    - إعدادات لـ:
        - تطبيق iOS و Android
        - متصفحات iOS و Android
    - مساعدات لـ:
        - WebView
        - الإيماءات
        - التنبيهات الأصلية
        - أدوات الاختيار
     - أمثلة اختبارات لـ:
        - WebView
        - تسجيل الدخول
        - النماذج
        - السحب
        - المتصفحات

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
اختبارات ATDD للويب مع Mocha و WebdriverIO v6 مع PageObject

- أطر العمل
  - WebdriverIO (v7)
  - Mocha
- الميزات
  - نموذج [Page Object](pageobjects)
  - تكامل Sauce Labs مع [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - تقرير Allure
  - التقاط تلقائي للقطات الشاشة للاختبارات الفاشلة
  - مثال CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

مشروع قالب جاهز لتشغيل اختبارات E2E مع Mocha.

- أطر العمل:
    - WebdriverIO (v7)
    - Mocha
- الميزات:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [اختبارات انحدار مرئي](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   نمط كائن الصفحة
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) و [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   مثال على إجراءات Github
    -   تقرير Allure (لقطات الشاشة عند الفشل)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

مشروع قالب جاهز لتشغيل اختبارات **WebdriverIO v7** للتالي:

[نصوص WDIO 7 مع TypeScript في إطار عمل Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[نصوص WDIO 7 مع TypeScript في إطار عمل Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[تشغيل نص WDIO 7 في Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[سجلات الشبكة](https://github.com/17thSep/MonitorNetworkLogs/)

مشروع قالب جاهز لـ:

- التقاط سجلات الشبكة
- التقاط جميع مكالمات GET/POST أو واجهة برمجة تطبيقات REST محددة
- التحقق من معلمات الطلب
- التحقق من معلمات الاستجابة
- تخزين جميع الاستجابات في ملف منفصل

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

مشروع قالب جاهز لتشغيل اختبارات appium للتطبيقات الأصلية ومتصفح الهاتف المحمول باستخدام cucumber v7 و wdio v7 مع نمط كائنات الصفحة.

- أطر العمل
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- الميزات
    - تطبيقات Android و iOS الأصلية
    - متصفح Android Chrome
    - متصفح iOS Safari
    - نموذج كائن الصفحة
    - يحتوي على سيناريوهات اختبار نموذجية في cucumber
    - متكامل مع تقارير html متعددة لـ cucumber

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

هذا مشروع قالب لمساعدتك على إظهار كيفية تشغيل اختبار webdriverio من تطبيقات الويب باستخدام أحدث WebdriverIO وإطار عمل Cucumber. يهدف هذا المشروع إلى العمل كصورة أساسية يمكنك استخدامها لفهم كيفية تشغيل اختبارات WebdriverIO في docker

يتضمن هذا المشروع:

- DockerFile
- مشروع cucumber

اقرأ المزيد على: [مدونة Medium](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

هذا مشروع قالب لمساعدتك على إظهار كيفية تشغيل اختبارات electronJS باستخدام WebdriverIO. يهدف هذا المشروع إلى العمل كصورة أساسية يمكنك استخدامها لفهم كيفية تشغيل اختبارات WebdriverIO لـ electronJS.

يشمل هذا المشروع:

- تطبيق electronjs نموذجي
- نصوص اختبار نموذجية لـ cucumber

اقرأ المزيد على: [مدونة Medium](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

هذا مشروع قالب لمساعدتك على إظهار كيفية أتمتة تطبيق Windows باستخدام winappdriver و WebdriverIO. يهدف هذا المشروع إلى العمل كصورة أساسية يمكنك استخدامها لفهم كيفية تشغيل اختبارات windappdriver و WebdriverIO.

اقرأ المزيد على: [مدونة Medium](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


هذا مشروع قالب لمساعدتك على إظهار كيفية تشغيل إمكانية multiremote في webdriverio مع أحدث WebdriverIO وإطار عمل Jasmine. يهدف هذا المشروع إلى العمل كصورة أساسية يمكنك استخدامها لفهم كيفية تشغيل اختبارات WebdriverIO في docker

يستخدم هذا المشروع:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

مشروع قالب لتشغيل اختبارات appium على أجهزة Roku الحقيقية باستخدام mocha مع نمط كائنات الصفحة.

- أطر العمل
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - تقارير Allure

- الميزات
    - نموذج كائن الصفحة
    - Typescript
    - لقطة شاشة عند الفشل
    - اختبارات نموذجية باستخدام قناة Roku نموذجية

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

مشروع إثبات المفهوم لاختبارات Cucumber متعددة عن بعد E2E بالإضافة إلى اختبارات Mocha المعتمدة على البيانات

- إطار العمل:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- الميزات:
    - اختبارات E2E قائمة على Cucumber
    - اختبارات Mocha معتمدة على البيانات
    - اختبارات الويب فقط - في المنصات المحلية والسحابية
    - اختبارات الجوال فقط - محاكيات محلية وسحابية عن بعد (أو أجهزة)
    - اختبارات الويب + الجوال - متعددة عن بعد - منصات محلية وسحابية
    - تقارير متعددة متكاملة بما في ذلك Allure
    - تتم معالجة بيانات الاختبار (JSON / XLSX) عالميًا بحيث يمكن كتابة البيانات (التي تم إنشاؤها على الفور) إلى ملف بعد تنفيذ الاختبار
    - سير عمل Github لتشغيل الاختبار وتحميل تقرير allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

هذا مشروع قالب جاهز للمساعدة في إظهار كيفية تشغيل multiremote في webdriverio باستخدام خدمة appium و chromedriver مع أحدث WebdriverIO.

- أطر العمل
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- الميزات
  - نموذج [Page Object](pageobjects)
  - Typescript
  - اختبارات الويب + الجوال - Multiremote
  - تطبيقات Android و iOS الأصلية
  - Appium
  - Chromedriver
  - ESLint
  - أمثلة اختبارات لتسجيل الدخول في http://the-internet.herokuapp.com و [تطبيق WebdriverIO الأصلي التجريبي](https://github.com/webdriverio/native-demo-app)