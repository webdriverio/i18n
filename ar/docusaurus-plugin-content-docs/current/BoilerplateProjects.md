---
id: boilerplates
title: مشاريع قوالب جاهزة
---

بمرور الوقت، قامت مجتمعنا بتطوير العديد من المشاريع التي يمكنك استخدامها كمصدر إلهام لإعداد مجموعة الاختبارات الخاصة بك.

# مشاريع قوالب v9

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

قالبنا الخاص لمجموعات اختبار Cucumber. قمنا بإنشاء أكثر من 150 تعريفًا للخطوات المحددة مسبقًا لك، حتى تتمكن من البدء في كتابة ملفات الميزات في مشروعك على الفور.

- الإطار:
    - Cucumber
    - WebdriverIO
- الميزات:
    - أكثر من 150 خطوة محددة مسبقًا تغطي تقريبًا كل ما تحتاجه
    - يدمج وظيفة Multiremote من WebdriverIO
    - تطبيق تجريبي خاص

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
مشروع قالب لتشغيل اختبارات WebdriverIO مع Jasmine باستخدام ميزات Babel ونمط كائنات الصفحة.

- الأطر
    - WebdriverIO
    - Jasmine
- الميزات
    - نمط كائن الصفحة
    - تكامل Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
مشروع قالب لتشغيل اختبارات WebdriverIO على تطبيق Electron بسيط.

- الأطر
    - WebdriverIO
    - Mocha
- الميزات
    - محاكاة Electron API

## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

يحتوي مشروع القالب هذا على اختبارات WebdriverIO 9 للأجهزة المحمولة مع Cucumber وTypeScript وAppium لمنصات Android وiOS، متبعًا نمط كائن الصفحة. يتميز بتسجيل شامل، وتقارير، وإيماءات الجوال، وتصفح من التطبيق إلى الويب، وتكامل CI/CD.

- الأطر:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- الميزات:
    - دعم منصات متعددة
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - إيماءات الجوال
      - التمرير
      - السحب
      - الضغط المطول
      - إخفاء لوحة المفاتيح
    - التنقل من التطبيق إلى الويب
      - تبديل السياق
      - دعم WebView
      - أتمتة المتصفح (Chrome/Safari)
    - حالة التطبيق الجديدة
      - إعادة ضبط التطبيق تلقائيًا بين السيناريوهات
      - سلوك إعادة الضبط قابل للتكوين (noReset, fullReset)
    - تكوين الجهاز
      - إدارة الأجهزة مركزية
      - تبديل المنصات بسهولة
    - مثال على هيكل الدليل لـ JavaScript / TypeScript. فيما يلي إصدار JS، إصدار TS له نفس الهيكل أيضًا.

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
إنشاء فئات صفحة WebdriverIO ومواصفات اختبار Mocha تلقائيًا من ملفات Gherkin .feature — مما يقلل الجهد اليدوي، ويحسن الاتساق، ويسرع أتمتة ضمان الجودة. لا ينتج هذا المشروع رموزًا متوافقة مع webdriver.io فحسب، بل يعزز أيضًا جميع وظائف webdriver.io. لقد أنشأنا نكهتين، واحدة لمستخدمي JavaScript والأخرى لمستخدمي TypeScript. لكن كلا المشروعين يعملان بنفس الطريقة.

***كيف تعمل؟***
- تتبع العملية أتمتة من خطوتين:
- الخطوة 1: Gherkin إلى stepMap (إنشاء ملفات stepMap.json)
  - إنشاء ملفات stepMap.json:
    - تحليل ملفات .feature المكتوبة بصيغة Gherkin.
    - استخراج السيناريوهات والخطوات.
    - إنتاج ملف .stepMap.json منظم يحتوي على:
      - الإجراء المراد تنفيذه (مثل النقر، وضبط النص، والتأكيد من الرؤية)
      - selectorName للتعيين المنطقي
      - المحدد لعنصر DOM
      - ملاحظة للقيم أو التأكيد
- الخطوة 2: stepMap إلى الكود (إنشاء كود WebdriverIO).
  يستخدم stepMap.json لإنشاء:
  - إنشاء فئة base page.js مع الطرق المشتركة وإعداد browser.url().
  - إنشاء فئات نموذج كائن الصفحة (POM) متوافقة مع WebdriverIO لكل ميزة داخل test/pageobjects/.
  - إنشاء مواصفات اختبار تعتمد على Mocha.
- مثال على هيكل الدليل لـ JavaScript / TypeScript. فيما يلي إصدار JS، إصدار TS له نفس الهيكل أيضًا.
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
# مشاريع قوالب v8

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- الإطار: WDIO-V8 مع Cucumber (V8x).
- الميزات:
    - نموذج كائنات الصفحة يستخدم مع نهج فئة ES6 /ES7 ودعم TypeScript
    - أمثلة لخيار المحدد المتعدد للاستعلام عن عنصر بأكثر من محدد واحد في وقت واحد
    - أمثلة على تنفيذ متصفح متعدد ومتصفح بدون واجهة باستخدام Chrome و Firefox
    - تكامل الاختبار السحابي مع BrowserStack و Sauce Labs و TestMu AI (سابقًا LambdaTest)
    - أمثلة على قراءة/كتابة البيانات من MS-Excel لسهولة إدارة بيانات الاختبار من مصادر البيانات الخارجية مع أمثلة
    - دعم قاعدة البيانات لأي RDBMS (Oracle، MySql، TeraData، Vertica إلخ)، وتنفيذ أي استعلامات / جلب مجموعة النتائج وما إلى ذلك مع أمثلة لاختبار E2E
    - تقارير متعددة (Spec، Xunit/Junit، Allure، JSON) واستضافة تقارير Allure و Xunit/Junit على WebServer.
    - أمثلة مع تطبيق تجريبي https://search.yahoo.com/ و http://the-internet.herokuapp.com.
    - ملفات `.config` خاصة بـ BrowserStack و Sauce Labs و TestMu AI (سابقًا LambdaTest) و Appium (للتشغيل على الأجهزة المحمولة). لإعداد Appium بنقرة واحدة على الجهاز المحلي لنظامي iOS و Android، راجع [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- الإطار: WDIO-V8 مع Mocha (V10x).
- الميزات:
    -  نموذج كائنات الصفحة يستخدم مع نهج فئة ES6 /ES7 ودعم TypeScript
    -  أمثلة مع تطبيق تجريبي https://search.yahoo.com و http://the-internet.herokuapp.com
    -  أمثلة على تنفيذ متصفح متعدد ومتصفح بدون واجهة باستخدام Chrome و Firefox
    -  تكامل الاختبار السحابي مع BrowserStack و Sauce Labs و TestMu AI (سابقًا LambdaTest)
    -  تقارير متعددة (Spec، Xunit/Junit، Allure، JSON) واستضافة تقارير Allure و Xunit/Junit على WebServer.
    -  أمثلة على قراءة/كتابة البيانات من MS-Excel لسهولة إدارة بيانات الاختبار من مصادر البيانات الخارجية مع أمثلة
    -  أمثلة على اتصال قاعدة البيانات بأي RDBMS (Oracle، MySql، TeraData، Vertica إلخ)، وتنفيذ أي استعلام / جلب مجموعة نتائج وما إلى ذلك مع أمثلة لاختبار E2E
    -  ملفات `.config` خاصة بـ BrowserStack و Sauce Labs و TestMu AI (سابقًا LambdaTest) و Appium (للتشغيل على الأجهزة المحمولة). لإعداد Appium بنقرة واحدة على الجهاز المحلي لنظامي iOS و Android، راجع [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- الإطار: WDIO-V8 مع Jasmine (V4x).
- الميزات:
    -  نموذج كائنات الصفحة يستخدم مع نهج فئة ES6 /ES7 ودعم TypeScript
    -  أمثلة مع تطبيق تجريبي https://search.yahoo.com و http://the-internet.herokuapp.com
    -  أمثلة على تنفيذ متصفح متعدد ومتصفح بدون واجهة باستخدام Chrome و Firefox
    -  تكامل الاختبار السحابي مع BrowserStack و Sauce Labs و TestMu AI (سابقًا LambdaTest)
    -  تقارير متعددة (Spec، Xunit/Junit، Allure، JSON) واستضافة تقارير Allure و Xunit/Junit على WebServer.
    -  أمثلة على قراءة/كتابة البيانات من MS-Excel لسهولة إدارة بيانات الاختبار من مصادر البيانات الخارجية مع أمثلة
    -  أمثلة على اتصال قاعدة البيانات بأي RDBMS (Oracle، MySql، TeraData، Vertica إلخ)، وتنفيذ أي استعلام / جلب مجموعة نتائج وما إلى ذلك مع أمثلة لاختبار E2E
    -  ملفات `.config` خاصة بـ BrowserStack و Sauce Labs و TestMu AI (سابقًا LambdaTest) و Appium (للتشغيل على الأجهزة المحمولة). لإعداد Appium بنقرة واحدة على الجهاز المحلي لنظامي iOS و Android، راجع [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

يحتوي مشروع القالب هذا على اختبارات WebdriverIO 8 مع cucumber وtypescript، متبوعًا بنمط كائنات الصفحة.

- الأطر:
    - WebdriverIO v8
    - Cucumber v8

- الميزات:
    - Typescript v5
    - نمط كائن الصفحة
    - Prettier
    - دعم متصفحات متعددة
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
      - تقرير html متعدد لـ cucumber مع لقطات شاشة للفشل
    - خطوط أنابيب Gitlab لمستودع Gitlab
    - إجراءات Github لمستودع Github
    - Docker compose لإعداد مركز Docker
    - اختبار إمكانية الوصول باستخدام AXE
    - الاختبار المرئي باستخدام Applitools
    - آلية السجل


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- الأطر
    - WebdriverIO (v8)
    - Cucumber (v8)

- الميزات
    - يحتوي على سيناريو اختبار عينة في cucumber
    - تقارير html لـ cucumber متكاملة مع مقاطع فيديو مضمنة عند الفشل
    - خدمات Lambdatest و CircleCI متكاملة
    - اختبار مرئي، وإمكانية الوصول، واختبار API مدمج
    - وظائف البريد الإلكتروني المتكاملة
    - تخزين تقارير اختبار s3 bucket واسترجاعها متكاملة

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

مشروع قالب [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) لمساعدتك على البدء باختبار قبول تطبيقات الويب الخاصة بك باستخدام أحدث إصدارات WebdriverIO و Mocha و Serenity/JS.

- الأطر
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - تقارير Serenity BDD

- الميزات
    - [نمط السيناريو](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - لقطات شاشة تلقائية عند فشل الاختبار، مضمنة في التقارير
    - إعداد التكامل المستمر (CI) باستخدام [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [تقارير Serenity BDD التجريبية](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) منشورة على صفحات GitHub
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

مشروع قالب [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) لمساعدتك على البدء باختبار قبول تطبيقات الويب الخاصة بك باستخدام أحدث إصدارات WebdriverIO و Cucumber و Serenity/JS.

- الأطر
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - تقارير Serenity BDD

- الميزات
    - [نمط السيناريو](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - لقطات شاشة تلقائية عند فشل الاختبار، مضمنة في التقارير
    - إعداد التكامل المستمر (CI) باستخدام [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [تقارير Serenity BDD التجريبية](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) منشورة على صفحات GitHub
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
مشروع قالب لتشغيل اختبارات WebdriverIO في سحابة Headspin (https://www.headspin.io/) باستخدام ميزات Cucumber ونمط كائنات الصفحة.
- الأطر
    - WebdriverIO (v8)
    - Cucumber (v8)

- الميزات
    - تكامل سحابي مع [Headspin](https://www.headspin.io/)
    - يدعم نموذج كائن الصفحة
    - يحتوي على سيناريوهات نموذجية مكتوبة بأسلوب BDD التصريحي
    - تقارير html متكاملة لـ cucumber

# مشاريع قوالب v7
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

مشروع قالب لتشغيل اختبارات Appium مع WebdriverIO لـ:

- تطبيقات iOS/Android الأصلية
- تطبيقات iOS/Android الهجينة
- متصفحات Android Chrome و iOS Safari

يشمل هذا القالب ما يلي:

- الإطار: Mocha
- الميزات:
    - إعدادات لـ:
        - تطبيقات iOS و Android
        - متصفحات iOS و Android
    - مساعدات لـ:
        - WebView
        - الإيماءات
        - التنبيهات الأصلية
        - أدوات الاختيار
     - أمثلة اختبار لـ:
        - WebView
        - تسجيل الدخول
        - النماذج
        - السحب
        - المتصفحات

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
اختبارات ATDD للويب باستخدام Mocha و WebdriverIO v6 مع PageObject

- الأطر
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

مشروع قالب لتشغيل اختبارات E2E مع Mocha.

- الأطر:
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
    -   مثال إجراءات Github
    -   تقرير Allure (لقطات شاشة عند الفشل)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

مشروع قالب لتشغيل اختبارات **WebdriverIO v7** لما يلي:

[WDIO 7 scripts with TypeScript in Cucumber Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[WDIO 7 scripts with TypeScript in Mocha Framework](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[Run WDIO 7 script in Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[Network logs](https://github.com/17thSep/MonitorNetworkLogs/)

مشروع قالب لـ:

- التقاط سجلات الشبكة
- التقاط جميع مكالمات GET/POST أو واجهة برمجة تطبيقات REST محددة
- تأكيد معلمات الطلب
- تأكيد معلمات الاستجابة
- تخزين كل الاستجابات في ملف منفصل

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

مشروع قالب لتشغيل اختبارات appium للتطبيقات الأصلية ومتصفح الجوال باستخدام cucumber v7 و wdio v7 مع نمط كائن الصفحة.

- الأطر
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

هذا مشروع قالب لمساعدتك على إظهار كيفية تشغيل اختبار webdriverio من تطبيقات الويب باستخدام أحدث WebdriverIO وإطار Cucumber. يهدف هذا المشروع إلى العمل كصورة أساسية يمكنك استخدامها لفهم كيفية تشغيل اختبارات WebdriverIO في docker

يتضمن هذا المشروع:

- DockerFile
- مشروع cucumber

اقرأ المزيد على: [Medium Blog](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

هذا مشروع قالب لمساعدتك على إظهار كيفية تشغيل اختبارات electronJS باستخدام WebdriverIO. يهدف هذا المشروع إلى العمل كصورة أساسية يمكنك استخدامها لفهم كيفية تشغيل اختبارات WebdriverIO electronJS.

يتضمن هذا المشروع:

- تطبيق electronjs نموذجي
- نصوص اختبار cucumber نموذجية

اقرأ المزيد على: [Medium Blog](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

هذا مشروع قالب لمساعدتك على إظهار كيفية أتمتة تطبيقات Windows باستخدام winappdriver و WebdriverIO. يهدف هذا المشروع إلى العمل كصورة أساسية يمكنك استخدامها لفهم كيفية تشغيل اختبارات windappdriver و WebdriverIO.

اقرأ المزيد على: [Medium Blog](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


هذا مشروع قالب لمساعدتك على إظهار كيفية تشغيل قدرة multiremote في webdriverio مع أحدث WebdriverIO وإطار Jasmine. يهدف هذا المشروع إلى العمل كصورة أساسية يمكنك استخدامها لفهم كيفية تشغيل اختبارات WebdriverIO في docker

يستخدم هذا المشروع:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

مشروع قالب لتشغيل اختبارات appium على أجهزة Roku حقيقية باستخدام mocha مع نمط كائن الصفحة.

- الأطر
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

مشروع PoC لاختبارات Cucumber E2E Multiremote بالإضافة إلى اختبارات Mocha المدفوعة بالبيانات

- الإطار:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- الميزات:
    - اختبارات E2E المستندة إلى Cucumber
    - اختبارات Mocha المدفوعة بالبيانات
    - اختبارات الويب فقط - في منصات محلية وكذلك سحابية
    - اختبارات الجوال فقط - محاكيات محلية وعن بعد في السحابة (أو أجهزة)
    - اختبارات الويب + الجوال - Multiremote - منصات محلية وكذلك سحابية
    - تقارير متعددة متكاملة بما في ذلك Allure
    - بيانات الاختبار (JSON / XLSX) معالجة عالميًا بحيث يتم كتابة البيانات (التي تم إنشاؤها على الفور) في ملف بعد تنفيذ الاختبار
    - سير عمل Github لتشغيل الاختبار وتحميل تقرير Allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

هذا هو مشروع قالب لمساعدتك على إظهار كيفية تشغيل webdriverio متعدد عن بعد باستخدام خدمة appium و chromedriver مع أحدث WebdriverIO.

- الأطر
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
  - أمثلة اختبارات لتسجيل الدخول في http://the-internet.herokuapp.com و [تطبيق WebdriverIO التجريبي الأصلي](https://github.com/webdriverio/native-demo-app)