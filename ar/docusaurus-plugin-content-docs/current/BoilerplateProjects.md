---
id: boilerplates
title: مشاريع القوالب الجاهزة
description: "تصفح مشاريع القوالب الجاهزة التي طورها المجتمع لـ WebdriverIO مع إعدادات Mocha وJasmine وCucumber وElectron والأجهزة المحمولة لبدء مجموعة الاختبارات الخاصة بك."
---

مع مرور الوقت، طوّر مجتمعنا العديد من المشاريع التي يمكنك استخدامها كمصدر إلهام لإعداد مجموعة الاختبارات الخاصة بك.

# مشاريع القوالب الجاهزة للإصدار v9

## [webdriverio/cucumber-boilerplate](https://github.com/webdriverio/cucumber-boilerplate)

القالب الجاهز الخاص بنا لمجموعات اختبارات Cucumber. لقد أنشأنا أكثر من 150 تعريفًا مسبقًا للخطوات (step definitions) من أجلك، حتى تتمكن من البدء في كتابة ملفات الميزات (feature files) في مشروعك على الفور.

- إطار العمل:
    - Cucumber
    - WebdriverIO
- الميزات:
    - أكثر من 150 خطوة محددة مسبقًا تغطي كل ما تحتاجه تقريبًا
    - يدمج وظيفة multi-remote الخاصة بـ WebdriverIO
    - تطبيق تجريبي خاص

## [webdriverio/jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate)
مشروع قالب جاهز لتشغيل اختبارات WebdriverIO باستخدام Jasmine مع الاستفادة من ميزات Babel ونمط كائنات الصفحة (page objects).

- أطر العمل
    - WebdriverIO
    - Jasmine
- الميزات
    - نمط كائن الصفحة (Page Object Pattern)
    - التكامل مع Sauce Labs

## [webdriverio/electron-boilerplate](https://github.com/webdriverio/electron-boilerplate)
مشروع قالب جاهز لتشغيل اختبارات WebdriverIO على تطبيق Electron بسيط.

- أطر العمل
    - WebdriverIO
    - Mocha
- الميزات
    - محاكاة (mocking) واجهة برمجة تطبيقات Electron

## [syamphaneendra/webdriverio9-boilerplate](https://github.com/syamphaneendra/webdriverio9-boilerplate)

يحتوي مشروع القالب الجاهز هذا على اختبارات WebdriverIO 9 للأجهزة المحمولة باستخدام Cucumber وTypeScript وAppium لمنصتي Android وiOS، باتباع نمط نموذج كائن الصفحة (Page Object Model). يتميز بتسجيل شامل للسجلات، وإعداد التقارير، وإيماءات الأجهزة المحمولة، والتنقل من التطبيق إلى الويب، والتكامل مع CI/CD.

- أطر العمل:
    - WebdriverIO v9
    - Cucumber v9
    - Appium v2.5
    - TypeScript v5

- الميزات:
    - دعم منصات متعددة
      - Android (UiAutomator2)
      - iOS (XCUITest)
    - إيماءات الأجهزة المحمولة
      - التمرير (Scroll)
      - السحب (Swipe)
      - الضغط المطوّل (Long press)
      - إخفاء لوحة المفاتيح
    - التنقل من التطبيق إلى الويب
      - تبديل السياق (Context switching)
      - دعم WebView
      - أتمتة المتصفح (Chrome/Safari)
    - حالة تطبيق جديدة
      - إعادة تعيين التطبيق تلقائيًا بين السيناريوهات
      - سلوك إعادة تعيين قابل للتهيئة (noReset، fullReset)
    - تهيئة الأجهزة
      - إدارة مركزية للأجهزة
      - تبديل سهل بين المنصات
    - مثال على بنية المجلدات لـ JavaScript / TypeScript. ما يلي خاص بإصدار JS، ولإصدار TS نفس البنية أيضًا.

## [amiya-pattnaik/wdio-testgen-from-gherkin-js](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-js)
## [amiya-pattnaik/wdio-testgen-from-gherkin-ts](https://github.com/amiya-pattnaik/wdio-testgen-from-gherkin-ts)
توليد فئات كائنات الصفحة (Page Object) الخاصة بـ WebdriverIO ومواصفات اختبارات Mocha تلقائيًا من ملفات Gherkin ذات الامتداد ‎.feature — مما يقلل الجهد اليدوي، ويحسّن الاتساق، ويسرّع أتمتة ضمان الجودة. لا ينتج هذا المشروع أكوادًا متوافقة مع webdriver.io فحسب، بل يعزز أيضًا جميع وظائف webdriver.io. لقد أنشأنا نسختين، واحدة لمستخدمي JavaScript والأخرى لمستخدمي TypeScript. لكن كلا المشروعين يعملان بالطريقة نفسها.

***كيف يعمل؟***
- تتبع العملية أتمتة من خطوتين:
- الخطوة 1: من Gherkin إلى stepMap (توليد ملفات stepMap.json)
  - توليد ملفات stepMap.json:
    - يحلل ملفات ‎.feature المكتوبة بصيغة Gherkin.
    - يستخرج السيناريوهات والخطوات.
    - ينتج ملف ‎.stepMap.json منظمًا يحتوي على:
      - action: الإجراء المراد تنفيذه (مثل click، setText، assertVisible)
      - selectorName: للربط المنطقي
      - selector: لعنصر DOM
      - note: للقيم أو التحقق (assertion)
- الخطوة 2: من stepMap إلى الكود (توليد كود WebdriverIO).
  يستخدم stepMap.json لتوليد:
  - توليد فئة أساسية page.js تحتوي على توابع مشتركة وإعداد browser.url()‎.
  - توليد فئات نموذج كائن الصفحة (POM) متوافقة مع WebdriverIO لكل ميزة داخل test/pageobjects/.
  - توليد مواصفات اختبار مبنية على Mocha.
- مثال على بنية المجلدات لـ JavaScript / TypeScript. ما يلي خاص بإصدار JS، ولإصدار TS نفس البنية أيضًا.
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
# مشاريع القوالب الجاهزة للإصدار v8

## [amiya-pattnaik/webdriverIO-with-cucumberBDD](https://github.com/amiya-pattnaik/webdriverIO-with-cucumberBDD)

- إطار العمل: WDIO-V8 مع Cucumber (V8x).
- الميزات:
    - يستخدم نموذج كائنات الصفحة نهجًا قائمًا على الفئات بأسلوب ES6 /ES7 مع دعم TypeScript
    - أمثلة على خيار المحددات المتعددة للاستعلام عن عنصر بأكثر من محدد في آن واحد
    - أمثلة على التنفيذ على متصفحات متعددة ومتصفحات بدون واجهة (headless) باستخدام - Chrome وFirefox
    - التكامل مع الاختبار السحابي عبر BrowserStack وSauce Labs وTestMu AI (المعروف سابقًا باسم LambdaTest)
    - أمثلة على قراءة/كتابة البيانات من MS-Excel لإدارة سهلة لبيانات الاختبار من مصادر بيانات خارجية مع أمثلة
    - دعم قواعد البيانات لأي نظام RDBMS (Oracle وMySql وTeraData وVertica وغيرها)، وتنفيذ أي استعلامات / جلب مجموعة النتائج وغير ذلك مع أمثلة لاختبار E2E
    - تقارير متعددة (Spec، Xunit/Junit، Allure، JSON) واستضافة تقارير Allure وXunit/Junit على خادم ويب.
    - أمثلة مع التطبيق التجريبي https://search.yahoo.com/  وhttp://the-internet.herokuapp.com.
    - ملف `.config` خاص بـ BrowserStack وSauce Labs وTestMu AI (المعروف سابقًا باسم LambdaTest) وAppium (للتشغيل على جهاز محمول). لإعداد Appium بنقرة واحدة على الجهاز المحلي لنظامي iOS وAndroid، راجع [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-mochaBDD](https://github.com/amiya-pattnaik/webdriverIO-with-mochaBDD)

- إطار العمل: WDIO-V8 مع Mocha (V10x).
- الميزات:
    -  يستخدم نموذج كائنات الصفحة نهجًا قائمًا على الفئات بأسلوب ES6 /ES7 مع دعم TypeScript
    -  أمثلة مع التطبيق التجريبي https://search.yahoo.com  وhttp://the-internet.herokuapp.com
    -  أمثلة على التنفيذ على متصفحات متعددة ومتصفحات بدون واجهة (headless) باستخدام - Chrome وFirefox
    -  التكامل مع الاختبار السحابي عبر BrowserStack وSauce Labs وTestMu AI (المعروف سابقًا باسم LambdaTest)
    -  تقارير متعددة (Spec، Xunit/Junit، Allure، JSON) واستضافة تقارير Allure وXunit/Junit على خادم ويب.
    -  أمثلة على قراءة/كتابة البيانات من MS-Excel لإدارة سهلة لبيانات الاختبار من مصادر بيانات خارجية مع أمثلة
    -  أمثلة على الاتصال بقاعدة بيانات لأي نظام RDBMS (Oracle وMySql وTeraData وVertica وغيرها)، وتنفيذ أي استعلام / جلب مجموعة النتائج وغير ذلك مع أمثلة لاختبار E2E
    -  ملف `.config` خاص بـ BrowserStack وSauce Labs وTestMu AI (المعروف سابقًا باسم LambdaTest) وAppium (للتشغيل على جهاز محمول). لإعداد Appium بنقرة واحدة على الجهاز المحلي لنظامي iOS وAndroid، راجع [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [amiya-pattnaik/webdriverIO-with-jasmineBDD](https://github.com/amiya-pattnaik/webdriverIO-with-jasmineBDD)

- إطار العمل: WDIO-V8 مع Jasmine (V4x).
- الميزات:
    -  يستخدم نموذج كائنات الصفحة نهجًا قائمًا على الفئات بأسلوب ES6 /ES7 مع دعم TypeScript
    -  أمثلة مع التطبيق التجريبي https://search.yahoo.com  وhttp://the-internet.herokuapp.com
    -  أمثلة على التنفيذ على متصفحات متعددة ومتصفحات بدون واجهة (headless) باستخدام - Chrome وFirefox
    -  التكامل مع الاختبار السحابي عبر BrowserStack وSauce Labs وTestMu AI (المعروف سابقًا باسم LambdaTest)
    -  تقارير متعددة (Spec، Xunit/Junit، Allure، JSON) واستضافة تقارير Allure وXunit/Junit على خادم ويب.
    -  أمثلة على قراءة/كتابة البيانات من MS-Excel لإدارة سهلة لبيانات الاختبار من مصادر بيانات خارجية مع أمثلة
    -  أمثلة على الاتصال بقاعدة بيانات لأي نظام RDBMS (Oracle وMySql وTeraData وVertica وغيرها)، وتنفيذ أي استعلام / جلب مجموعة النتائج وغير ذلك مع أمثلة لاختبار E2E
    -  ملف `.config` خاص بـ BrowserStack وSauce Labs وTestMu AI (المعروف سابقًا باسم LambdaTest) وAppium (للتشغيل على جهاز محمول). لإعداد Appium بنقرة واحدة على الجهاز المحلي لنظامي iOS وAndroid، راجع [appium-setup-made-easy-OSX](https://github.com/amiya-pattnaik/appium-setup-made-easy-OSX).

## [syamphaneendra/webdriverio-web-mobile-boilerplate](https://github.com/syamphaneendra/webdriverio-web-mobile-boilerplate)

يحتوي مشروع القالب الجاهز هذا على اختبارات WebdriverIO 8 باستخدام cucumber وtypescript، مع اتباع نمط كائنات الصفحة.

- أطر العمل:
    - WebdriverIO v8
    - Cucumber v8

- الميزات:
    - Typescript v5
    - نمط كائن الصفحة (Page Object Pattern)
    - Prettier
    - دعم متصفحات متعددة
      - Chrome
      - Firefox
      - Edge
      - Safari
      - Standalone
    - تنفيذ متوازٍ عبر المتصفحات
    - Appium
    - التكامل مع الاختبار السحابي عبر BrowserStack وSauce Labs
    - خدمة Docker
    - خدمة مشاركة البيانات
    - ملفات تهيئة منفصلة لكل خدمة
    - إدارة بيانات الاختبار وقراءتها حسب نوع المستخدم
    - التقارير
      - Dot
      - Spec
      - تقرير cucumber html متعدد مع لقطات شاشة للإخفاقات
    - خطوط أنابيب Gitlab لمستودع Gitlab
    - إجراءات Github لمستودع Github
    - Docker compose لإعداد docker hub
    - اختبار إمكانية الوصول باستخدام AXE
    - الاختبار المرئي باستخدام Applitools
    - آلية تسجيل السجلات


## [klassijs/klassi-js (cucumber-template)](https://github.com/klassijs/klassi-example-test-suite.git)

- أطر العمل
    - WebdriverIO (v8)
    - Cucumber (v8)

- الميزات
    - يحتوي على سيناريو اختبار نموذجي في cucumber
    - تقارير cucumber html مدمجة مع مقاطع فيديو مضمّنة عند الإخفاقات
    - خدمات Lambdatest وCircleCI مدمجة
    - اختبارات مرئية وإمكانية الوصول وواجهات API مدمجة
    - وظيفة البريد الإلكتروني مدمجة
    - حاوية s3 مدمجة لتخزين تقارير الاختبار واسترجاعها

## [serenity-js/serenity-js-mocha-webdriverio-template/](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/)

مشروع قالب [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) لمساعدتك على البدء في اختبار القبول لتطبيقات الويب الخاصة بك باستخدام أحدث إصدارات WebdriverIO وMocha وSerenity/JS.

- أطر العمل
    - WebdriverIO (v8)
    - Mocha (v10)
    - Serenity/JS (v3)
    - تقارير Serenity BDD

- الميزات
    - [نمط Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - لقطات شاشة تلقائية عند فشل الاختبار، مضمّنة في التقارير
    - إعداد التكامل المستمر (CI) باستخدام [GitHub Actions](https://github.com/serenity-js/serenity-js-mocha-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [تقارير Serenity BDD تجريبية](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) منشورة على GitHub Pages
    - TypeScript
    - ESLint

## [serenity-js/serenity-js-cucumber-webdriverio-template/](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/)

مشروع قالب [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) لمساعدتك على البدء في اختبار القبول لتطبيقات الويب الخاصة بك باستخدام أحدث إصدارات WebdriverIO وCucumber وSerenity/JS.

- أطر العمل
    - WebdriverIO (v8)
    - Cucumber (v9)
    - Serenity/JS (v3)
    - تقارير Serenity BDD

- الميزات
    - [نمط Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
    - لقطات شاشة تلقائية عند فشل الاختبار، مضمّنة في التقارير
    - إعداد التكامل المستمر (CI) باستخدام [GitHub Actions](https://github.com/serenity-js/serenity-js-cucumber-webdriverio-template/blob/main/.github/workflows/main.yml)
    - [تقارير Serenity BDD تجريبية](https://serenity-js.github.io/serenity-js-mocha-webdriverio-template/) منشورة على GitHub Pages
    - TypeScript
    - ESLint

## [Muralijc/wdio-headspin-boilerplate](https://github.com/Muralijc/Wdio-Headspin-boilerplate/)
مشروع قالب جاهز لتشغيل اختبارات WebdriverIO في سحابة Headspin ‏(https://www.headspin.io/) باستخدام ميزات Cucumber ونمط كائنات الصفحة.
- أطر العمل
    - WebdriverIO (v8)
    - Cucumber (v8)

- الميزات
    - التكامل السحابي مع [Headspin](https://www.headspin.io/)
    - يدعم نموذج كائن الصفحة (Page Object Model)
    - يحتوي على سيناريوهات نموذجية مكتوبة بالأسلوب التصريحي لـ BDD
    - تقارير cucumber html مدمجة

# مشاريع القوالب الجاهزة للإصدار v7
---

## [webdriverio/appium-boilerplate](https://github.com/webdriverio/appium-boilerplate/)

مشروع قالب جاهز لتشغيل اختبارات Appium باستخدام WebdriverIO لـ:

- تطبيقات iOS/Android الأصلية (Native)
- تطبيقات iOS/Android الهجينة (Hybrid)
- متصفح Chrome على Android ومتصفح Safari على iOS

يتضمن هذا القالب الجاهز ما يلي:

- إطار العمل: Mocha
- الميزات:
    - إعدادات لـ:
        - تطبيقات iOS وAndroid
        - متصفحات iOS وAndroid
    - أدوات مساعدة لـ:
        - WebView
        - الإيماءات
        - التنبيهات الأصلية
        - أدوات الاختيار (Pickers)
     - أمثلة اختبارات لـ:
        - WebView
        - تسجيل الدخول
        - النماذج
        - السحب (Swipe)
        - المتصفحات

## [serhatbolsu/webdriverio-mocha-uiautomation-boiler](https://github.com/serhatbolsu/webdriverio-mocha-uiautomation-boiler)
اختبارات ويب ATDD باستخدام Mocha وWebdriverIO v6 مع PageObject

- أطر العمل
  - WebdriverIO (v7)
  - Mocha
- الميزات
  - نموذج [كائن الصفحة](pageobjects)
  - التكامل مع Sauce Labs عبر [Sauce Service](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sauce-service/README.md)
  - تقرير Allure
  - التقاط لقطات شاشة تلقائيًا للاختبارات الفاشلة
  - مثال CircleCI
  - ESLint

## [WarleyGabriel/demo-webdriverio-mocha](https://github.com/WarleyGabriel/demo-webdriverio-mocha)

مشروع قالب جاهز لتشغيل اختبارات E2E باستخدام Mocha.

- أطر العمل:
    - WebdriverIO (v7)
    - Mocha
- الميزات:
    -   TypeScript
    -   [Expect-webdriverio](https://github.com/webdriverio/expect-webdriverio)
    -   [اختبارات الانحدار المرئي](https://github.com/wswebcreation/wdio-image-comparison-service)
    -   نمط كائن الصفحة (Page Object Pattern)
    -   [Commit lint](https://github.com/conventional-changelog/commitlint) و[Commitizen](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly)
    -   ESlint
    -   Prettier
    -   Husky
    -   مثال Github Actions
    -   تقرير Allure (لقطات شاشة عند الفشل)

## [17thSep/WebdriverIO_Master](https://github.com/17thSep/WebdriverIO_Master)

مشروع قالب جاهز لتشغيل اختبارات **WebdriverIO v7** لما يلي:

[سكربتات WDIO 7 باستخدام TypeScript في إطار عمل Cucumber](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Cucumber)
[سكربتات WDIO 7 باستخدام TypeScript في إطار عمل Mocha](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Mocha)
[تشغيل سكربت WDIO 7 في Docker](https://github.com/17thSep/WebdriverIO_Master/tree/master/TypeScript/Docker)
[سجلات الشبكة](https://github.com/17thSep/MonitorNetworkLogs/)

مشروع قالب جاهز لـ:

- التقاط سجلات الشبكة
- التقاط جميع استدعاءات GET/POST أو واجهة REST API محددة
- التحقق من معاملات الطلب
- التحقق من معاملات الاستجابة
- تخزين جميع الاستجابات في ملف منفصل

## [Arjun-Ar91/Wdio7-appium-cucumber](https://github.com/Arjun-Ar91/Wdio7-appium-cucumber.git)

مشروع قالب جاهز لتشغيل اختبارات appium للتطبيقات الأصلية ومتصفحات الأجهزة المحمولة باستخدام cucumber v7 وwdio v7 مع نمط كائنات الصفحة.

- أطر العمل
    - WebdriverIO v7
    - Cucumber v7
    - Appium

- الميزات
    - تطبيقات Android وiOS الأصلية
    - متصفح Chrome على Android
    - متصفح Safari على iOS
    - نموذج كائن الصفحة (Page Object Model)
    - يحتوي على سيناريوهات اختبار نموذجية في cucumber
    - مدمج مع تقارير cucumber html متعددة

## [praveendvd/webdriverIODockerBoilerplate/](https://github.com/praveendvd/webdriverIODockerBoilerplate)

هذا مشروع قالب يساعدك على معرفة كيفية تشغيل اختبارات webdriverio لتطبيقات الويب باستخدام أحدث إصدار من WebdriverIO وإطار عمل Cucumber. يهدف هذا المشروع إلى أن يكون صورة أساسية يمكنك استخدامها لفهم كيفية تشغيل اختبارات WebdriverIO في docker

يتضمن هذا المشروع:

- DockerFile
- مشروع cucumber

اقرأ المزيد على: [مدونة Medium](https://praveendavidmathew.medium.com/running-webdriverio-in-wsl2-windows-91d3a0dc7746)

## [praveendvd/WebdriverIO_electronAppAutomation_boilerplate/](https://github.com/praveendvd/WebdriverIO_electronAppAutomation_boilerplate)

هذا مشروع قالب يساعدك على معرفة كيفية تشغيل اختبارات electronJS باستخدام WebdriverIO. يهدف هذا المشروع إلى أن يكون صورة أساسية يمكنك استخدامها لفهم كيفية تشغيل اختبارات WebdriverIO لـ electronJS.

يتضمن هذا المشروع:

- تطبيق electronjs نموذجي
- سكربتات اختبار cucumber نموذجية

اقرأ المزيد على: [مدونة Medium](https://praveendavidmathew.medium.com/first-step-into-automation-of-electronjs-applications-ef89b7423ddd)

## [praveendvd/webdriverIO_winappdriver_boilerplate/](https://github.com/praveendvd/webdriverIO_winappdriver_boilerplate)

هذا مشروع قالب يساعدك على معرفة كيفية أتمتة تطبيقات windows باستخدام winappdriver وWebdriverIO. يهدف هذا المشروع إلى أن يكون صورة أساسية يمكنك استخدامها لفهم كيفية تشغيل اختبارات windappdriver وWebdriverIO.

اقرأ المزيد على: [مدونة Medium](https://praveendavidmathew.medium.com/winappdriver-first-step-into-windows-app-test-automation-using-webdriverio-and-winappdriver-46320d89570b)

## [praveendvd/appium-chromedriver-multiremote-wdio-boilerplate/](https://github.com/praveendvd/appium-chromedriver-multiremote-wdio-boilerplate)


هذا مشروع قالب يساعدك على معرفة كيفية تشغيل إمكانية multi-remote في webdriverio باستخدام أحدث إصدار من WebdriverIO وإطار عمل Jasmine. يهدف هذا المشروع إلى أن يكون صورة أساسية يمكنك استخدامها لفهم كيفية تشغيل اختبارات WebdriverIO في docker

يستخدم هذا المشروع:
     - chromedriver
     - jasmine
     - appium

## [webdriverio-roku-appium-boilerplate](https://github.com/AntonKostenko/webdriverIO-roku-appium)

مشروع قالب لتشغيل اختبارات appium على أجهزة Roku حقيقية باستخدام mocha مع نمط كائنات الصفحة.

- أطر العمل
    - WebdriverIO Async v7
    - Appium 3.0
    - Mocha v7
    - تقارير Allure

- الميزات
    - نموذج كائن الصفحة (Page Object Model)
    - Typescript
    - لقطة شاشة عند الفشل
    - أمثلة اختبارات باستخدام قناة Roku نموذجية

## [krishnapollu/wdio-cucumber-poc](https://github.com/krishnapollu/wdio-cucumber-poc)

مشروع إثبات مفهوم (PoC) لاختبارات Cucumber متعددة الأجهزة البعيدة (multi-remote) من طرف إلى طرف (E2E) بالإضافة إلى اختبارات Mocha المعتمدة على البيانات

- إطار العمل:
    - Cucumber (v8)
    - WebdriverIO (v8)
    - Mocha (v8)

- الميزات:
    - اختبارات E2E مبنية على Cucumber
    - اختبارات معتمدة على البيانات مبنية على Mocha
    - اختبارات الويب فقط - محليًا وكذلك على المنصات السحابية
    - اختبارات الأجهزة المحمولة فقط - محليًا وكذلك على المحاكيات (أو الأجهزة) السحابية البعيدة
    - اختبارات الويب + الأجهزة المحمولة - multi-remote - محليًا وكذلك على المنصات السحابية
    - تقارير متعددة مدمجة بما في ذلك Allure
    - بيانات الاختبار ( JSON / XLSX ) تُعالج بشكل عام بحيث يمكن كتابة البيانات (المُنشأة أثناء التشغيل) إلى ملف بعد تنفيذ الاختبار
    - سير عمل Github لتشغيل الاختبار ورفع تقرير allure

## [Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate](https://github.com/Rondleysg/wdio-multiremote-appium-chromedriver-boilerplate)

هذا مشروع قالب جاهز يساعد على توضيح كيفية تشغيل webdriverio multi-remote باستخدام خدمة appium وchromedriver مع أحدث إصدار من WebdriverIO.

- أطر العمل
  - WebdriverIO (v9)
  - Appium (v2)
  - Mocha

- الميزات
  - نموذج [كائن الصفحة](pageobjects)
  - Typescript
  - اختبارات الويب + الأجهزة المحمولة - multi-remote
  - تطبيقات Android وiOS الأصلية
  - Appium
  - Chromedriver
  - ESLint
  - أمثلة اختبارات لتسجيل الدخول في http://the-internet.herokuapp.com و[تطبيق WebdriverIO التجريبي الأصلي](https://github.com/webdriverio/native-demo-app)