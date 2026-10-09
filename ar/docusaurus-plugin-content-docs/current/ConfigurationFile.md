---
id: configurationfile
title: ملف الإعدادات
description: "تصفح مثالاً مشروحاً لملف wdio.conf.js يسرد جميع خيارات مشغل الاختبارات والقدرات والخطافات المدعومة مع شرح لكل منها."
---

يحتوي ملف الإعدادات على جميع المعلومات اللازمة لتشغيل مجموعة اختباراتك. وهو وحدة NodeJS تُصدِّر كائن JSON.

فيما يلي مثال على الإعدادات يتضمن جميع الخصائص المدعومة ومعلومات إضافية:

```js
export const config = {

    // ==================================
    // أين يجب تشغيل اختبارك
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // إعدادات الخادم
    // =====================
    // عنوان المضيف لخادم Selenium قيد التشغيل. هذه المعلومة غالباً غير ضرورية، لأن
    // WebdriverIO يتصل تلقائياً بـ localhost. كذلك إذا كنت تستخدم إحدى
    // الخدمات السحابية المدعومة مثل Sauce Labs أو Browserstack أو Testing Bot أو TestMu AI (المعروفة سابقاً بـ LambdaTest)، فلن تحتاج أيضاً
    // إلى تحديد معلومات المضيف والمنفذ (لأن WebdriverIO يستطيع استنتاجها
    // من معلومات المستخدم والمفتاح الخاصة بك). أما إذا كنت تستخدم واجهة Selenium
    // خلفية خاصة، فيجب عليك تحديد `hostname` و`port` و`path` هنا.
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // البروتوكول: http | https
    // protocol: 'http',
    //
    // =================
    // مزودو الخدمات
    // =================
    // يدعم WebdriverIO كلاً من Sauce Labs وBrowserstack وTesting Bot وTestMu AI (المعروفة سابقاً بـ LambdaTest). (من المفترض
    // أن يعمل مزودو الخدمات السحابية الآخرون أيضاً.) تُحدد هذه الخدمات قيم `user` و`key` (أو مفتاح الوصول)
    // خاصة يجب عليك وضعها هنا من أجل الاتصال بهذه الخدمات.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // إذا كنت تشغل اختباراتك على Sauce Labs فيمكنك تحديد المنطقة التي تريد تشغيل اختباراتك
    // فيها عبر الخاصية `region`. الاختصارات المتاحة للمناطق هي `us` (الافتراضية) و`eu`.
    // تُستخدم هذه المناطق لسحابة الأجهزة الافتراضية في Sauce Labs وسحابة الأجهزة الحقيقية في Sauce Labs.
    // إذا لم تحدد المنطقة، فستكون القيمة الافتراضية `us`.
    region: 'us',
    //
    // توفر Sauce Labs [خدمة التشغيل بدون واجهة](https://saucelabs.com/products/web-testing/sauce-headless-testing)
    // التي تتيح لك تشغيل اختبارات Chrome وFirefox بدون واجهة رسومية.
    //
    headless: false,
    //
    // ==================
    // تحديد ملفات الاختبار
    // ==================
    // حدد ملفات مواصفات الاختبار التي يجب تشغيلها. النمط نسبي إلى مجلد
    // ملف الإعدادات الذي يتم تشغيله.
    //
    // تُعرَّف المواصفات كمصفوفة من ملفات المواصفات (مع إمكانية استخدام أحرف البدل
    // التي سيتم توسيعها). سيتم تشغيل اختبار كل ملف مواصفات في عملية عامل
    // منفصلة. لتشغيل مجموعة من ملفات المواصفات في نفس عملية العامل
    // ضعها داخل مصفوفة ضمن مصفوفة specs.
    //
    // سيتم حل مسار ملفات المواصفات نسبةً إلى مجلد
    // ملف الإعدادات ما لم يكن مساراً مطلقاً.
    //
    specs: [
        'test/spec/**',
        ['group/spec/**']
    ],
    // الأنماط المراد استبعادها.
    exclude: [
        'test/spec/multibrowser/**',
        'test/spec/mobile/**'
    ],
    //
    // ============
    // القدرات
    // ============
    // حدد قدراتك هنا. يمكن لـ WebdriverIO تشغيل عدة قدرات في نفس
    // الوقت. بناءً على عدد القدرات، يُطلق WebdriverIO عدة جلسات
    // اختبار. ضمن `capabilities` الخاصة بك، يمكنك تجاوز الملفات التي يتم تشغيلها باستخدام
    // `wdio:specs` و`wdio:exclude` من أجل تجميع مواصفات معينة لقدرة معينة.
    //
    // أولاً، يمكنك تحديد عدد النسخ التي يجب تشغيلها في نفس الوقت. لنفترض
    // أن لديك 3 قدرات مختلفة (Chrome وFirefox وSafari) وقمت
    // بتعيين `maxInstances` إلى 1. سيُنشئ wdio ثلاث عمليات.
    //
    // وبالتالي، إذا كان لديك 10 ملفات مواصفات وعيّنت `maxInstances` إلى 10، فسيتم اختبار جميع ملفات المواصفات
    // في نفس الوقت وسيتم إنشاء 30 عملية.
    //
    // تتحكم هذه الخاصية في عدد القدرات من نفس الاختبار التي يجب أن تشغل الاختبارات.
    //
    maxInstances: 10,
    //
    // أو عيّن حداً لتشغيل الاختبارات بقدرة معينة.
    maxInstancesPerCapability: 10,
    //
    // يُدرج المتغيرات العامة لـ WebdriverIO (مثل `browser` و`$` و`$$`) في البيئة العامة.
    // إذا عيّنتها إلى `false`، فيجب عليك الاستيراد من `@wdio/globals`. ملاحظة: لا يتولى WebdriverIO
    // حقن المتغيرات العامة الخاصة بإطار الاختبار.
    //
    injectGlobals: true,
    //
    // إذا واجهت صعوبة في تجميع كل القدرات المهمة معاً، فاطلع على
    // أداة تهيئة المنصة من Sauce Labs - وهي أداة رائعة لتهيئة قدراتك:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // لتشغيل chrome بدون واجهة، يجب استخدام العلامات التالية
        // (راجع https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // معامل لتجاهل بعض أو كل العلامات الافتراضية
        // - إذا كانت القيمة true: تجاهل جميع 'العلامات الافتراضية' لـ DevTools و'المعاملات الافتراضية' لـ Puppeteer
        // - إذا كانت القيمة مصفوفة: يقوم DevTools بتصفية المعاملات الافتراضية المحددة
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // يمكن تجاوز maxInstances لكل قدرة. لذا إذا كانت لديك شبكة Selenium
        // داخلية لا يتوفر فيها سوى 5 نسخ من firefox، يمكنك التأكد من عدم تشغيل أكثر من
        // 5 نسخ في المرة الواحدة.
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // علامة لتفعيل وضع Firefox بدون واجهة (راجع https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities لمزيد من التفاصيل حول moz:firefoxOptions)
          // args: ['-headless']
        },
        // إذا تم توفير outputDir، يمكن لـ WebdriverIO التقاط سجلات جلسة المشغل
        // ومن الممكن تحديد أنواع السجلات (logTypes) المراد استبعادها.
        // excludeDriverLogs: ['*'], // مرر '*' لاستبعاد جميع سجلات جلسة المشغل
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // معامل لتجاهل بعض أو كل المعاملات الافتراضية لـ Puppeteer
        // ignoreDefaultArgs: ['-foreground'], // عيّن القيمة إلى true لتجاهل جميع المعاملات الافتراضية
    }],
    //
    // قائمة إضافية بمعاملات node لاستخدامها عند بدء العمليات الفرعية
    execArgv: [],
    //
    // ===================
    // إعدادات الاختبار
    // ===================
    // حدد هنا جميع الخيارات ذات الصلة بنسخة WebdriverIO
    //
    // مستوى تفصيل السجلات: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // تعيين مستويات سجلات محددة لكل مسجِّل
    // استخدم المستوى 'silent' لتعطيل المسجِّل
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // تعيين المجلد الذي ستُخزَّن فيه جميع السجلات
    outputDir: __dirname,
    //
    // إذا كنت تريد تشغيل اختباراتك فقط حتى يفشل عدد معين من الاختبارات، فاستخدم
    // bail (القيمة الافتراضية 0 - لا توقف، شغّل جميع الاختبارات).
    bail: 0,
    //
    // عيّن عنوان URL أساسياً لاختصار استدعاءات الأمر `url()`. إذا كان المعامل `url` يبدأ
    // بـ `/`، فسيُضاف `baseUrl` في البداية، دون تضمين جزء المسار من `baseUrl`.
    //
    // إذا كان المعامل `url` يبدأ بدون مخطط أو `/` (مثل `some/path`)، فسيُضاف `baseUrl`
    // في البداية مباشرةً.
    baseUrl: 'http://localhost:8080',
    //
    // المهلة الافتراضية لجميع أوامر waitForXXX.
    waitforTimeout: 1000,
    //
    // أضف ملفات لمراقبتها (مثل كود التطبيق أو كائنات الصفحات) عند تشغيل الأمر `wdio`
    // مع العلامة `--watch`. أنماط Glob مدعومة.
    filesToWatch: [
        // مثال: أعد تشغيل الاختبارات إذا غيّرت كود تطبيقي
        // './app/**/*.js'
    ],
    //
    // الإطار الذي تريد تشغيل مواصفاتك به.
    // الأطر المدعومة هي: 'mocha' و'jasmine' و'cucumber'
    // راجع أيضاً: https://webdriver.io/docs/frameworks.html
    //
    // تأكد من تثبيت حزمة محوّل wdio للإطار المحدد قبل تشغيل أي اختبارات.
    framework: 'mocha',
    //
    // عدد مرات إعادة محاولة ملف المواصفات بالكامل عندما يفشل ككل
    specFileRetries: 1,
    // التأخير بالثواني بين محاولات إعادة تشغيل ملف المواصفات
    specFileRetriesDelay: 0,
    // ما إذا كان يجب إعادة محاولة ملفات المواصفات فوراً أم تأجيلها إلى نهاية قائمة الانتظار
    specFileRetriesDeferred: false,
    //
    // مُعِدّ تقارير الاختبار للمخرجات القياسية stdout.
    // المُعِدّ الوحيد المدعوم افتراضياً هو 'dot'
    // راجع أيضاً: https://webdriver.io/docs/dot-reporter.html ، وانقر على "Reporters" في العمود الأيسر
    reporters: [
        'dot',
        ['allure', {
            //
            // إذا كنت تستخدم مُعِدّ التقارير "allure" فيجب عليك تحديد المجلد الذي
            // يجب أن يحفظ فيه WebdriverIO جميع تقارير allure.
            outputDir: './'
        }]
    ],
    //
    // الخيارات التي سيتم تمريرها إلى Mocha.
    // راجع القائمة الكاملة على: http://mochajs.org
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // الخيارات التي سيتم تمريرها إلى Jasmine.
    // راجع أيضاً: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // المهلة الافتراضية لـ Jasmine
        defaultTimeoutInterval: 5000,
        //
        // يتيح إطار Jasmine اعتراض كل تأكيد من أجل تسجيل حالة التطبيق
        // أو الموقع بناءً على النتيجة. على سبيل المثال، من المفيد جداً التقاط لقطة شاشة في كل مرة
        // يفشل فيها تأكيد.
        expectationResultHandler: function(passed, assertion) {
            // افعل شيئاً ما
        },
        //
        // الاستفادة من وظيفة grep الخاصة بـ Jasmine
        grep: null,
        invertGrep: null
    },
    //
    // إذا كنت تستخدم Cucumber فيجب عليك تحديد مكان تعريفات الخطوات الخاصة بك.
    // راجع أيضاً: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (ملف/مجلد) استدعاء الملفات قبل تنفيذ الميزات
        backtrace: false,   // <boolean> عرض تتبع كامل للأخطاء
        compiler: [],       // <string[]> ("extension:module") استدعاء الملفات ذات الامتداد EXTENSION بعد استدعاء الوحدة MODULE (قابل للتكرار)
        dryRun: false,      // <boolean> استدعاء المنسقات دون تنفيذ الخطوات
        failFast: false,    // <boolean> إيقاف التشغيل عند أول فشل
        snippets: true,     // <boolean> إخفاء مقتطفات تعريفات الخطوات للخطوات المعلقة
        source: true,       // <boolean> إخفاء عناوين URI للمصدر
        strict: false,      // <boolean> الفشل إذا كانت هناك أي خطوات غير معرّفة أو معلقة
        tags: '',           // <string> (تعبير) تنفيذ الميزات أو السيناريوهات ذات الوسوم المطابقة للتعبير فقط
        timeout: 20000,     // <number> المهلة لتعريفات الخطوات
        ignoreUndefinedDefinitions: false, // <boolean> فعّل هذا الإعداد لمعاملة التعريفات غير المعرّفة كتحذيرات.
        scenarioLevelReporter: false // فعّل هذا لجعل webdriver.io يتصرف كما لو كانت السيناريوهات وليس الخطوات هي الاختبارات.
    },
    // حدد مساراً مخصصاً لملف tsconfig - يستخدم WDIO أداة `tsx` لترجمة ملفات TypeScript
    // يتم اكتشاف ملف TSConfig الخاص بك تلقائياً من مجلد العمل الحالي
    // ولكن يمكنك تحديد مسار مخصص هنا أو عن طريق تعيين متغير البيئة TSX_TSCONFIG_PATH
    // راجع توثيق `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // ملاحظة: سيتم تجاوز هذا الإعداد بواسطة متغير البيئة TSX_TSCONFIG_PATH و/أو معامل سطر الأوامر --tsConfigPath إذا تم تحديدهما.
    // سيتم تجاهل هذا الإعداد إذا لم يتمكن node من تحليل ملف wdio.conf.ts الخاص بك دون مساعدة من tsx، على سبيل المثال إذا كانت لديك
    // أسماء مستعارة للمسارات معرّفة في tsconfig.json وتستخدم هذه الأسماء المستعارة داخل ملف wdio.config.ts الخاص بك.
    // استخدم هذا فقط إذا كنت تستخدم ملف إعدادات .js أو كان ملف إعدادات .ts الخاص بك كود JavaScript صالحاً.
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // الخطافات
    // =====
    // يوفر WebdriverIO عدة خطافات يمكنك استخدامها للتدخل في عملية الاختبار من أجل تحسينها
    // وبناء خدمات حولها. يمكنك إما تطبيق دالة واحدة عليها أو مصفوفة من
    // الدوال. إذا أعادت إحداها وعداً (promise)، فسينتظر WebdriverIO حتى يتم حل ذلك الوعد
    // للمتابعة.
    //
    /**
     * يُنفَّذ مرة واحدة قبل إطلاق جميع العمال.
     * @param {object} config كائن إعدادات wdio
     * @param {Array.<Object>} capabilities قائمة بتفاصيل القدرات
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * يُنفَّذ قبل إنشاء عملية العامل ويمكن استخدامه لتهيئة خدمة محددة
     * لذلك العامل وكذلك تعديل بيئات التشغيل بطريقة غير متزامنة.
     * @param  {string} cid      معرّف القدرة (مثل 0-0)
     * @param  {object} caps     كائن يحتوي على القدرات للجلسة التي سيتم إنشاؤها في العامل
     * @param  {object} specs    المواصفات التي سيتم تشغيلها في عملية العامل
     * @param  {object} args     كائن سيتم دمجه مع الإعدادات الرئيسية بمجرد تهيئة العامل
     * @param  {object} execArgv قائمة بالمعاملات النصية الممررة إلى عملية العامل
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * يُنفَّذ بعد خروج عملية العامل.
     * @param  {string} cid      معرّف القدرة (مثل 0-0)
     * @param  {number} exitCode 0 - نجاح، 1 - فشل
     * @param  {object} specs    المواصفات التي سيتم تشغيلها في عملية العامل
     * @param  {number} retries  عدد مرات إعادة المحاولة المستخدمة
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * يُنفَّذ قبل تهيئة جلسة webdriver وإطار الاختبار. يتيح لك
     * تعديل الإعدادات بناءً على القدرة أو المواصفات.
     * @param {object} config كائن إعدادات wdio
     * @param {Array.<Object>} capabilities قائمة بتفاصيل القدرات
     * @param {Array.<String>} specs قائمة بمسارات ملفات المواصفات التي سيتم تشغيلها
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * يُنفَّذ قبل بدء تنفيذ الاختبار. في هذه المرحلة يمكنك الوصول إلى جميع المتغيرات
     * العامة مثل `browser`. إنه المكان المثالي لتعريف الأوامر المخصصة.
     * @param {Array.<Object>} capabilities قائمة بتفاصيل القدرات
     * @param {Array.<String>} specs        قائمة بمسارات ملفات المواصفات التي سيتم تشغيلها
     * @param {object}         browser      نسخة من جلسة المتصفح/الجهاز التي تم إنشاؤها
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * يُنفَّذ قبل بدء المجموعة (في Mocha/Jasmine فقط).
     * @param {object} suite تفاصيل المجموعة
     */
    beforeSuite: function (suite) {
    },
    /**
     * يُنفَّذ هذا الخطاف _قبل_ بدء كل خطاف داخل المجموعة.
     * (على سبيل المثال، يعمل هذا قبل استدعاء `before` و`beforeEach` و`after` و`afterEach` في Mocha.). في Cucumber يكون `context` هو كائن World.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * خطاف يُنفَّذ _بعد_ انتهاء كل خطاف داخل المجموعة.
     * (على سبيل المثال، يعمل هذا بعد استدعاء `before` و`beforeEach` و`after` و`afterEach` في Mocha.). في Cucumber يكون `context` هو كائن World.
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * دالة تُنفَّذ قبل الاختبار (في Mocha/Jasmine فقط)
     * @param {object} test    كائن الاختبار
     * @param {object} context كائن النطاق الذي تم تنفيذ الاختبار به
     */
    beforeTest: function (test, context) {
    },
    /**
     * يعمل قبل تنفيذ أمر WebdriverIO.
     * @param {string} commandName اسم أمر الخطاف
     * @param {Array} args المعاملات التي سيتلقاها الأمر
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * يعمل بعد تنفيذ أمر WebdriverIO
     * @param {string} commandName اسم أمر الخطاف
     * @param {Array} args المعاملات التي سيتلقاها الأمر
     * @param {*} result نتيجة الأمر
     * @param {Error} error كائن الخطأ، إن وُجد
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * دالة تُنفَّذ بعد الاختبار (في Mocha/Jasmine فقط)
     * @param {object}  test             كائن الاختبار
     * @param {object}  context          كائن النطاق الذي تم تنفيذ الاختبار به
     * @param {Error}   result.error     كائن الخطأ في حالة فشل الاختبار، وإلا `undefined`
     * @param {*}       result.result    الكائن المُعاد من دالة الاختبار
     * @param {number}  result.duration  مدة الاختبار
     * @param {boolean} result.passed    true إذا نجح الاختبار، وإلا false
     * @param {object}  result.retries   معلومات حول إعادة المحاولات المتعلقة بالمواصفات، مثل `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * خطاف يُنفَّذ بعد انتهاء المجموعة (في Mocha/Jasmine فقط).
     * @param {object} suite تفاصيل المجموعة
     */
    afterSuite: function (suite) {
    },
    /**
     * يُنفَّذ بعد انتهاء جميع الاختبارات. لا يزال بإمكانك الوصول إلى جميع المتغيرات العامة من
     * الاختبار.
     * @param {number} result 0 - نجاح الاختبار، 1 - فشل الاختبار
     * @param {Array.<Object>} capabilities قائمة بتفاصيل القدرات
     * @param {Array.<String>} specs قائمة بمسارات ملفات المواصفات التي تم تشغيلها
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * يُنفَّذ مباشرة بعد إنهاء جلسة webdriver.
     * @param {object} config كائن إعدادات wdio
     * @param {Array.<Object>} capabilities قائمة بتفاصيل القدرات
     * @param {Array.<String>} specs قائمة بمسارات ملفات المواصفات التي تم تشغيلها
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * يُنفَّذ بعد إيقاف جميع العمال وعندما تكون العملية على وشك الخروج.
     * سيؤدي الخطأ الذي يُطرح في الخطاف `onComplete` إلى فشل تشغيل الاختبار.
     * @param {object} exitCode 0 - نجاح، 1 - فشل
     * @param {object} config كائن إعدادات wdio
     * @param {Array.<Object>} capabilities قائمة بتفاصيل القدرات
     * @param {<Object>} results كائن يحتوي على نتائج الاختبار
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * يُنفَّذ عند حدوث تحديث.
    * @param {string} oldSessionId معرّف الجلسة القديمة
    * @param {string} newSessionId معرّف الجلسة الجديدة
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * خطافات Cucumber
     *
     * يعمل قبل ميزة Cucumber.
     * @param {string}                   uri      مسار ملف الميزة
     * @param {GherkinDocument.IFeature} feature  كائن ميزة Cucumber
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * يعمل قبل سيناريو Cucumber.
     * @param {ITestCaseHookParameter} world    كائن world يحتوي على معلومات حول pickle وخطوة الاختبار
     * @param {object}                 context  كائن World الخاص بـ Cucumber
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * يعمل قبل خطوة Cucumber.
     * @param {Pickle.IPickleStep} step     بيانات الخطوة
     * @param {IPickle}            scenario pickle السيناريو
     * @param {object}             context  كائن World الخاص بـ Cucumber
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * يعمل بعد خطوة Cucumber.
     * @param {Pickle.IPickleStep} step             بيانات الخطوة
     * @param {IPickle}            scenario         pickle السيناريو
     * @param {object}             result           كائن النتائج يحتوي على نتائج السيناريو
     * @param {boolean}            result.passed    true إذا نجح السيناريو
     * @param {string}             result.error     مكدس الخطأ إذا فشل السيناريو
     * @param {number}             result.duration  مدة السيناريو بالمللي ثانية
     * @param {object}             context          كائن World الخاص بـ Cucumber
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * يعمل بعد سيناريو Cucumber.
     * @param {ITestCaseHookParameter} world            كائن world يحتوي على معلومات حول pickle وخطوة الاختبار
     * @param {object}                 result           كائن النتائج يحتوي على نتائج السيناريو `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    true إذا نجح السيناريو
     * @param {string}                 result.error     مكدس الخطأ إذا فشل السيناريو
     * @param {number}                 result.duration  مدة السيناريو بالمللي ثانية
     * @param {object}                 context          كائن World الخاص بـ Cucumber
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * يعمل بعد ميزة Cucumber.
     * @param {string}                   uri      مسار ملف الميزة
     * @param {GherkinDocument.IFeature} feature  كائن ميزة Cucumber
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * يعمل قبل أن تُجري مكتبة التأكيدات في WebdriverIO تأكيداً.
     * @param {object} params                 معلومات التأكيد
     * @param {string} params.matcherName     اسم المُطابِق الذي استدعاه الاختبار (في حالة الاسم المستعار، اسم الاسم المستعار)
     * @param {*}      params.expectedValue   القيمة التي يتم تمريرها إلى المُطابِق
     * @param {object} params.options         خيارات التأكيد
     */
    beforeAssertion: function (params) {
    },
    /**
     * يعمل بعد أن تُجري مكتبة التأكيدات في WebdriverIO تأكيداً.
     * @param {object} params                 معلومات التأكيد، نفس ما في `beforeAssertion`
     * @param {object} params.result          نتيجة المُطابِق، مع `pass` (قيمة منطقية) و`message()`.
     *                                        تكون `pass` بقيمة true عندما تتطابق القيمة، وكذلك مع `.not`
     */
    afterAssertion: function (params) {
    }
}
```

يمكنك أيضاً العثور على ملف يحتوي على جميع الخيارات والتنويعات الممكنة في [مجلد الأمثلة](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js).