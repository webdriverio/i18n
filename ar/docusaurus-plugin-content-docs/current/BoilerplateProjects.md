---
id: boilerplates
title: مشاريع نموذجية جاهزة
---

على مر الزمن، طور مجتمعنا العديد من المشاريع التي يمكنك استخدامها كمصدر إلهام لإعداد مجموعة الاختبارات الخاصة بك.

# مشاريع نموذجية لـ v9

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

مشروعنا النموذجي الخاص بمجموعات اختبار Cucumber. لقد أنشأنا أكثر من 150 تعريفًا مسبقًا للخطوات من أجلك، بحيث يمكنك البدء في كتابة ملفات الميزات في مشروعك على الفور.

- إطار العمل:
    - Cucumber
    - WebdriverIO
- الميزات:
    - أكثر من 150 خطوة محددة مسبقًا تغطي تقريبًا كل ما تحتاجه
    - يدمج وظيفة Multiremote في WebdriverIO
    - تطبيق تجريبي خاص

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
مشروع نموذجي لتشغيل اختبارات WebdriverIO مع Jasmine باستخدام ميزات Babel ونمط كائنات الصفحة.

- أطر العمل
    - WebdriverIO
    - Jasmine
- الميزات
    - نمط كائن الصفحة
    - تكامل Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
مشروع نموذجي لتشغيل اختبارات WebdriverIO على تطبيق Electron البسيط.

- أطر العمل
    - WebdriverIO
    - Mocha
- الميزات
    - محاكاة واجهة برمجة تطبيقات Electron

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
إنشاء فئات Page Object و مواصفات اختبار Mocha تلقائيًا من ملفات Gherkin .feature - مما يقلل الجهد اليدوي، ويحسن الاتساق، ويسرع أتمتة ضمان الجودة. هذا المشروع لا ينتج فقط أكواد متوافقة مع webdriver.io ولكنه يعزز أيضًا جميع وظائف webdriver.io. لقد أنشأنا نوعين واحد لمستخدمي JavaScript والآخر لمستخدمي TypeScript. لكن كلا المشروعين يعملان بنفس الطريقة.

***كيف يعمل؟***
- تتبع العملية خطوتين للأتمتة:
- الخطوة 1: Gherkin إلى stepMap (إنشاء ملفات stepMap.json)
  - إنشاء ملفات stepMap.json:
    - يحلل ملفات .feature المكتوبة بصيغة Gherkin.
    - يستخرج السيناريوهات والخطوات.
    - ينتج ملف .stepMap.json منظم يحتوي على:
      - الإجراء المراد تنفيذه (مثل النقر، setText، assertVisible)
      - selectorName للتعيين المنطقي
      - محدد لعنصر DOM
      - ملاحظة للقيم أو التأكيدات
- الخطوة 2: stepMap إلى الكود (إنشاء كود WebdriverIO).
  يستخدم stepMap.json لإنشاء:
  - إنشاء فئة base page.js مع طرق مشتركة وإعداد browser.url().
  - إنشاء فئات Page Object Model (POM) متوافقة مع WebdriverIO لكل ميزة داخل test/pageobjects/.
  - إنشاء مواصفات اختبار تعتمد على Mocha.
- مثال على هيكل الدليل لـ JavaScript / TypeScript. أدناه للإصدار JS، إصدار TS له نفس الهيكل أيضًا.
```
project-root/
├── features/                   # Gherkin .feature files (user input / source file)
├── stepMaps/                   # Auto-generated .stepMap.json files
├── test/                 
│   ├── pageobjects/            # Auto-generated WebdriverIO tests Page Object Model classes
│   └── specs/                  # Auto-generated Mocha test specs
├── src/
│   ├── cli.js                  # Main CLI logic
│   ├── generateStepsMap.js     # Feature-to-stepMap generator
│   ├── generateTestsFromMap.js # stepMap-to-page/spec generator
│   ├── utils.js                # Helper methods
│   └── config.js               # Paths, fallback selectors, aliases
│   └── __tests__/              # Unit tests (Vitest)
├── testgen.js                  # CLI entry point
│── wdio.config.js              # WebdriverIO configuration
├── package.json                # Scripts and dependencies
├── selector-aliases.json       # Optional user-defined selector overrides the primary selector
```
---
# مشاريع نموذجية لـ v8

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- إطار العمل: WDIO-V8 مع Cucumber (V8x).
- الميزات:
    - نموذج كائنات الصفحة يستخدم مع نهج فئة ES6 /ES7 ودعم TypeScript
    - أمثلة على خيار المحدد المتعدد للاستعلام عن العنصر بأكثر من محدد واحد في وقت واحد
    - أمثلة على تنفيذ المتصفح المتعدد والمتصفح بدون واجهة باستخدام - Chrome و Firefox
    - تكامل اختبار السحابة مع BrowserStack و Sauce Labs و LambdaTest
    - أمثلة على قراءة/كتابة البيانات من MS-Excel لإدارة بيانات الاختبار بسهولة من مصادر البيانات الخارجية مع أمثلة
    - دعم قاعدة البيانات لأي RDBMS (Oracle، MySql، TeraData، Vertica إلخ)، وتنفيذ أي استعلامات / جلب مجموعة النتائج وما إلى ذلك مع أمثلة لاختبار E2E
    - تقارير متعددة (Spec، Xunit/Junit، Allure، JSON) واستضافة تقارير Allure و Xunit/Junit على WebServer.
    - أمثلة مع تطبيق تجريبي https://search.yahoo.com/ و http://the-internet.herokuapp.com.
    - ملف `.config` خاص بـ BrowserStack و Sauce Labs و LambdaTest و Appium (للتشغيل على الأجهزة المحمولة). لإعداد Appium بنقرة واحدة على الآلة المحلية لنظامي iOS و Android، راجع [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- إطار العمل: WDIO-V8 مع Mocha (V10x).
- الميزات:
    -  نموذج كائنات الصفحة يستخدم مع نهج فئة ES6 /ES7 ودعم TypeScript
    -  أمثلة مع تطبيق تجريبي https://search.yahoo.com و http://the-internet.herokuapp.com
    -  أمثلة على تنفيذ المتصفح المتعدد والمتصفح بدون واجهة باستخدام - Chrome و Firefox
    -  تكامل اختبار السحابة مع BrowserStack و Sauce Labs و LambdaTest
    -  تقارير متعددة (Spec، Xunit/Junit، Allure، JSON) واستضافة تقارير Allure و Xunit/Junit على WebServer.
    -  أمثلة على قراءة/كتابة البيانات من MS-Excel لإدارة بيانات الاختبار بسهولة من مصادر البيانات الخارجية مع أمثلة
    -  أمثلة على الاتصال بقاعدة البيانات لأي RDBMS (Oracle، MySql، TeraData، Vertica إلخ)، وتنفيذ أي استعلام / جلب مجموعة النتائج وما إلى ذلك مع أمثلة لاختبار E2E
    -  ملف `.config` خاص بـ BrowserStack و Sauce Labs و LambdaTest و Appium (للتشغيل على الأجهزة المحمولة). لإعداد Appium بنقرة واحدة على الآلة المحلية لنظامي iOS و Android، راجع [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- إطار العمل: WDIO-V8 مع Jasmine (V4x).
- الميزات:
    -  نموذج كائنات الصفحة يستخدم مع نهج فئة ES6 /ES7 ودعم TypeScript
    -  أمثلة مع تطبيق تجريبي https://search.yahoo.com و http://the-internet.herokuapp.com
    -  أمثلة على تنفيذ المتصفح المتعدد والمتصفح بدون واجهة باستخدام - Chrome و Firefox
    -  تكامل اختبار السحابة مع BrowserStack و Sauce Labs و LambdaTest
    -  تقارير متعددة (Spec، Xunit/Junit، Allure، JSON) واستضافة تقارير Allure و Xunit/Junit على WebServer.
    -  أمثلة على قراءة/كتابة البيانات من MS-Excel لإدارة بيانات الاختبار بسهولة من مصادر البيانات الخارجية مع أمثلة
    -  أمثلة على الاتصال بقاعدة البيانات لأي RDBMS (Oracle، MySql، TeraData، Vertica إلخ)، وتنفيذ أي استعلام / جلب مجموعة النتائج وما إلى ذلك مع أمثلة لاختبار E2E
    -  ملف `.config` خاص بـ BrowserStack و Sauce Labs و LambdaTest و Appium (للتشغيل على الأجهزة المحمولة). لإعداد Appium بنقرة واحدة على الآلة المحلية لنظامي iOS و Android، راجع [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

هذا المشروع النموذجي يحتوي على اختبارات WebdriverIO 8 مع cucumber و typescript، متبوعًا بنمط كائنات الصفحة.

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
    - تنفيذ متوازٍ عبر المتصفحات
    - Appium
    - تكامل اختبار السحابة مع BrowserStack و Sauce Labs
    - خدمة Docker
    - خدمة مشاركة البيانات
    - ملفات تكوين منفصلة لكل خدمة
    - إدارة بيانات الاختبار والقراءة حسب نوع المستخدم
    - التقارير
      - Dot
      - Spec
      - تقرير cucumber HTML متعدد مع لقطات الفشل
    - خطوط أنابيب Gitlab لمستودع Gitlab
    - إجراءات Github لمستودع Github
    - Docker compose لإعداد مركز docker
    - اختبار إمكانية الوصول باستخدام AXE
    - اختبار مرئي باستخدام Applitools
    - آلية السجل


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- أطر العمل
    - WebdriverIO (v8)
    - Cucumber (v8)

- الميزات
    - يحتوي على سيناريو اختبار عينة في cucumber
    - تقارير html مدمجة مع cucumber مع مقاطع فيديو مضمنة عند الفشل
    - خدمات Lambdatest و CircleCI مدمجة
    - اختبار مرئي وإمكانية الوصول واختبار API مدمج
    - وظائف البريد الإلكتروني المدمجة
    - دلو s3 مدمج لتخزين تقارير الاختبار واسترجاعها

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

مشروع قالب [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) لمساعدتك على البدء في اختبار قبول تطبيقات الويب الخاصة بك باستخدام أحدث إصدارات WebdriverIO و Mocha و Serenity/JS.

- أطر العمل
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - تقارير Serenity BDD

- الميزات
    - [نمط السيناريو](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - لقطات شاشة تلقائية عند فشل الاختبار، مدمجة في التقارير
    - إعداد التكامل المستمر (CI) باستخدام [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [تقارير Serenity BDD التجريبية](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) منشورة على صفحات GitHub
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
    - لقطات شاشة تلقائية عند فشل الاختبار، مدمجة في التقارير
    - إعداد التكامل المستمر (CI) باستخدام [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [تقارير Serenity BDD التجريبية](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) منشورة على صفحات GitHub
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
مشروع نموذجي لتشغيل اختبارات WebdriverIO في سحابة Headspin (https://www.headspin.io/) باستخدام ميزات Cucumber ونمط كائنات الصفحة.
- أطر العمل
    - WebdriverIO (v8)
    - Cucumber (v8)

- الميزات
    - تكامل سحابي مع [Headspin](https://www.headspin.io/)
    - يدعم نموذج كائن الصفحة
    - يحتوي على سيناريوهات عينة مكتوبة بأسلوب BDD التصريحي
    - تقارير cucumber html مدمجة

# مشاريع نموذجية لـ v7
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

مشروع نموذجي لتشغيل اختبارات Appium باستخدام WebdriverIO لـ:

- تطبيقات iOS/Android الأصلية
- تطبيقات iOS/Android الهجينة
- متصفح Android Chrome و iOS Safari

يشمل هذا المشروع النموذجي ما يلي:

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
اختبارات ATDD WEB مع Mocha و WebdriverIO v6 مع PageObject

- أطر العمل
  - WebdriverIO (v7)
  - Mocha
- الميزات
  - نموذج [كائن الصفحة](pageobjects)
  - تكامل Sauce Labs مع [خدمة Sauce](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - تقرير Allure
  - التقاط لقطات الشاشة تلقائيًا للاختبارات الفاشلة
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
    -   [اختبارات الانحدار المرئي](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   نمط كائن الصفحة
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) و [Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   مثال على إجراءات Github
    -   تقرير Allure (لقطات شاشة عند الفشل)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

مشروع نموذجي لتشغيل اختبارات **WebdriverIO v7** لما يلي:

[نصوص WDIO 7 مع TypeScript في إطار Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[نصوص WDIO 7 مع TypeScript في إطار Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[تشغيل نص WDIO 7 في Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[سجلات الشبكة](https://github.com/17thSep/MonitorNetworkLogs/)

مشروع نموذجي لـ:

- التقاط سجلات الشبكة
- التقاط جميع مكالمات GET/POST أو واجهة برمجة تطبيقات REST محددة
- التأكد من معلمات الطلب
- التأكد من معلمات الاستجابة
- تخزين جميع الاستجابات في ملف منفصل

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

مشروع نموذجي لتشغيل اختبارات appium للتطبيقات الأصلية ومتصفح الجوال باستخدام cucumber v7 و wdio v7 مع نمط كائن الصفحة.

- أطر العمل
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- الميزات
    - تطبيقات Android و iOS الأصلية
    - متصفح Android Chrome
    - متصفح iOS Safari
    - نموذج كائن الصفحة
    - يحتوي على سيناريوهات اختبار عينة في cucumber
    - متكامل مع تقارير cucumber html متعددة

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

هذا مشروع قالب لمساعدتك على إظهار كيفية تشغيل اختبار webdriverio من تطبيقات الويب باستخدام أحدث WebdriverIO وإطار Cucumber. يهدف هذا المشروع إلى العمل كصورة أساسية يمكنك استخدامها لفهم كيفية تشغيل اختبارات WebdriverIO في docker

يتضمن هذا المشروع:

- DockerFile
- مشروع cucumber

اقرأ المزيد على: [مدونة Medium](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

هذا مشروع قالب لمساعدتك على إظهار كيفية تشغيل اختبارات electronJS باستخدام WebdriverIO. يهدف هذا المشروع إلى العمل كصورة أساسية يمكنك استخدامها لفهم كيفية تشغيل اختبارات WebdriverIO electronJS.

يتضمن هذا المشروع:

- تطبيق electronjs عينة
- نصوص اختبار cucumber عينة

اقرأ المزيد على: [مدونة Medium](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

هذا مشروع قالب لمساعدتك على إظهار كيفية أتمتة تطبيق Windows باستخدام winappdriver و WebdriverIO. يهدف هذا المشروع إلى العمل كصورة أساسية يمكنك استخدامها لفهم كيفية تشغيل اختبارات windappdriver و WebdriverIO.

اقرأ المزيد على: [مدونة Medium](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


هذا مشروع قالب لمساعدتك على إظهار كيفية تشغيل قدرة multiremote لـ webdriverio مع أحدث WebdriverIO وإطار Jasmine. يهدف هذا المشروع إلى العمل كصورة أساسية يمكنك استخدامها لفهم كيفية تشغيل اختبارات WebdriverIO في docker

يستخدم هذا المشروع:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

مشروع قالب لتشغيل اختبارات appium على أجهزة Roku الحقيقية باستخدام mocha مع نمط كائن الصفحة.

- أطر العمل
    - WebdriverIO Async v7
    - Appium 2.0
    - Mocha v7
    - تقارير Allure

- الميزات
    - نموذج كائن الصفحة
    - Typescript
    - لقطة شاشة عند الفشل
    - اختبارات مثال باستخدام قناة Roku عينة

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

مشروع PoC لاختبارات Cucumber لـ E2E Multiremote واختبارات Mocha التي تعتمد على البيانات

- إطار العمل:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- الميزات:
    - اختبارات E2E القائمة على Cucumber
    - اختبارات Mocha القائمة على البيانات
    - اختبارات الويب فقط - في المنصات المحلية وكذلك السحابية
    - اختبارات الجوال فقط - محاكيات محلية وبعيدة سحابية (أو أجهزة)
    - اختبارات الويب + الجوال - Multiremote - منصات محلية وسحابية
    - تم دمج تقارير متعددة بما في ذلك Allure
    - تتم معالجة بيانات الاختبار (JSON / XLSX) عالميًا بحيث يتم كتابة البيانات (التي تم إنشاؤها على الفور) في ملف بعد تنفيذ الاختبار
    - سير عمل Github لتشغيل الاختبار وتحميل تقرير allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

هذا مشروع نموذجي للمساعدة في إظهار كيفية تشغيل webdriverio متعدد الاتصال عن بُعد باستخدام خدمة appium و chromedriver مع أحدث WebdriverIO.

- أطر العمل
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- الميزات
  - نموذج [كائن الصفحة](pageobjects)
  - Typescript
  - اختبارات الويب + الجوال - Multiremote
  - تطبيقات Android و iOS الأصلية
  - Appium
  - Chromedriver
  - ESLint
  - أمثلة اختبارات لتسجيل الدخول في http://the-internet.herokuapp.com و [تطبيق WebdriverIO التجريبي الأصلي](https://github.com/webdriverio/native-demo-app)