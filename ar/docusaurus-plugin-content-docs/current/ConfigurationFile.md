---
id: configurationfile
title: ملف التكوين
---

يحتوي ملف التكوين على جميع المعلومات الضرورية لتشغيل مجموعة اختباراتك. إنه وحدة NodeJS تقوم بتصدير JSON.

فيما يلي مثال للتكوين مع جميع الخصائص المدعومة ومعلومات إضافية:

```js
export const config = {

    // ==================================
    // أين يجب إطلاق اختبارك
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // إعدادات الخادم
    // =====================
    // عنوان مضيف خادم Selenium قيد التشغيل. هذه المعلومات عادة ما تكون زائدة عن الحاجة، حيث
    // يتصل WebdriverIO تلقائيًا بـ localhost. أيضًا إذا كنت تستخدم إحدى
    // خدمات السحابة المدعومة مثل Sauce Labs أو Browserstack أو Testing Bot أو TestMu AI (سابقًا LambdaTest)، فأنت أيضًا لا
    // تحتاج إلى تحديد معلومات المضيف والمنفذ (لأن WebdriverIO يمكنه معرفة ذلك
    // من معلومات المستخدم والمفتاح الخاصة بك). ومع ذلك، إذا كنت تستخدم خلفية Selenium
    // خاصة، فيجب عليك تحديد `hostname` و `port` و `path` هنا.
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // Protocol: http | https
    // protocol: 'http',
    //
    // =================
    // مزودي الخدمة
    // =================
    // يدعم WebdriverIO Sauce Labs و Browserstack و Testing Bot و TestMu AI (سابقًا LambdaTest). (يجب أن تعمل
    // مزودو السحابة الآخرون أيضًا.) تحدد هذه الخدمات قيم `user` و `key` (أو مفتاح الوصول)
    // محددة يجب وضعها هنا، من أجل الاتصال بهذه الخدمات.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // إذا كنت تقوم بتشغيل اختباراتك على Sauce Labs، يمكنك تحديد المنطقة التي تريد تشغيل اختباراتك
    // فيها عبر خاصية `region`. الاختصارات المتاحة للمناطق هي `us` (افتراضي) و `eu`.
    // يتم استخدام هذه المناطق لسحابة الأجهزة الافتراضية من Sauce Labs وسحابة الأجهزة الحقيقية من Sauce Labs.
    // إذا لم تقدم المنطقة، فإنها ستكون افتراضيًا `us`.
    region: 'us',
    //
    // يوفر Sauce Labs [عرضًا بدون واجهة](https://saucelabs.com/products/web-testing/sauce-headless-testing)
    // يتيح لك تشغيل اختبارات Chrome و Firefox بدون واجهة.
    //
    headless: false,
    //
    // ==================
    // حدد ملفات الاختبار
    // ==================
    // حدد أي مواصفات اختبار يجب تشغيلها. النمط نسبي إلى الدليل
    // لملف التكوين الذي يتم تشغيله.
    //
    // يتم تحديد المواصفات كمصفوفة من ملفات المواصفات (اختياريًا باستخدام أحرف البدل
    // التي سيتم توسيعها). سيتم تشغيل الاختبار لكل ملف مواصفات في عملية
    // عامل منفصلة. من أجل الحصول على مجموعة من ملفات المواصفات تعمل في نفس عملية
    // العامل، قم بتضمينها في مصفوفة داخل مصفوفة المواصفات.
    //
    // سيتم حل مسار ملفات المواصفات نسبيًا من دليل
    // ملف التكوين ما لم يكن مطلقًا.
    //
    specs: [
        'test/spec/**',
        ['group/spec/**']
    ],
    // أنماط للاستبعاد.
    exclude: [
        'test/spec/multibrowser/**',
        'test/spec/mobile/**'
    ],
    //
    // ============
    // القدرات
    // ============
    // حدد قدراتك هنا. يمكن لـ WebdriverIO تشغيل قدرات متعددة في نفس
    // الوقت. اعتمادًا على عدد القدرات، يطلق WebdriverIO العديد من جلسات الاختبار.
    // ضمن `capabilities` الخاصة بك، يمكنك تجاوز خيارات `spec` و `exclude`
    // من أجل تجميع مواصفات محددة لقدرة محددة.
    //
    // أولاً، يمكنك تحديد عدد النسخ التي يجب بدء تشغيلها في نفس الوقت. لنفترض
    // أن لديك 3 قدرات مختلفة (Chrome و Firefox و Safari) وقمت بتعيين
    // `maxInstances` إلى 1. سيقوم wdio بإنشاء 3 عمليات.
    //
    // لذلك، إذا كان لديك 10 ملفات مواصفات وقمت بتعيين `maxInstances` إلى 10، فسيتم اختبار جميع ملفات المواصفات
    // في نفس الوقت وسيتم إنشاء 30 عملية.
    //
    // تتعامل الخاصية مع عدد القدرات من نفس الاختبار التي يجب أن تقوم بتشغيل الاختبارات.
    //
    maxInstances: 10,
    //
    // أو قم بتعيين حد لتشغيل الاختبارات بقدرة محددة.
    maxInstancesPerCapability: 10,
    //
    // يدرج الدوال العالمية لـ WebdriverIO (مثل `browser` و `$` و `$$`) في البيئة العالمية.
    // إذا قمت بالتعيين إلى `false`، فيجب عليك الاستيراد من `@wdio/globals`. ملاحظة: WebdriverIO لا
    // يتعامل مع حقن الدوال العالمية الخاصة بإطار الاختبار.
    //
    injectGlobals: true,
    //
    // إذا كنت تواجه مشكلة في الحصول على جميع القدرات المهمة معًا، تحقق من
    // أداة تكوين منصة Sauce Labs - وهي أداة رائعة لتكوين قدراتك:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // لتشغيل chrome بدون واجهة، الأعلام التالية مطلوبة
        // (انظر https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // معلمة لتجاهل بعض أو كل الأعلام الافتراضية
        // - إذا كانت القيمة صحيحة: تجاهل جميع 'الأعلام الافتراضية' لـ DevTools و 'الوسيطات الافتراضية' لـ Puppeteer
        // - إذا كانت القيمة مصفوفة: يقوم DevTools بتصفية الوسيطات الافتراضية المعطاة
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // يمكن تجاوز maxInstances لكل قدرة. لذلك إذا كان لديك شبكة Selenium داخلية
        // مع 5 نسخ فقط من firefox متاحة يمكنك التأكد من عدم بدء أكثر من
        // 5 نسخ في وقت واحد.
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // علم لتنشيط وضع Firefox بدون واجهة (انظر https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities للمزيد من التفاصيل حول moz:firefoxOptions)
          // args: ['-headless']
        },
        // إذا تم توفير outputDir، يمكن لـ WebdriverIO التقاط سجلات جلسة السائق
        // من الممكن تكوين أنواع السجلات التي يتم استبعادها.
        excludeDriverLogs: ['*'], // قم بتمرير '*' لاستبعاد جميع سجلات جلسة السائق
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // معلمة لتجاهل بعض أو كل الوسيطات الافتراضية لـ Puppeteer
        // ignoreDefaultArgs: ['-foreground'], // قم بتعيين القيمة إلى true لتجاهل جميع الوسيطات الافتراضية
    }],
    //
    // قائمة إضافية من وسيطات node لاستخدامها عند بدء العمليات الفرعية
    execArgv: [],
    //
    // ===================
    // تكوينات الاختبار
    // ===================
    // تعريف جميع الخيارات ذات الصلة بنسخة WebdriverIO هنا
    //
    // مستوى التسجيل: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // تعيين مستويات تسجيل محددة لكل مسجل
    // استخدم مستوى 'silent' لتعطيل المسجل
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // تعيين الدليل لتخزين جميع السجلات فيه
    outputDir: __dirname,
    //
    // إذا كنت تريد فقط تشغيل اختباراتك حتى يفشل عدد معين من الاختبارات، استخدم
    // bail (الافتراضي هو 0 - لا تقم بالإنقاذ، قم بتشغيل جميع الاختبارات).
    bail: 0,
    //
    // قم بتعيين عنوان URL أساسي لتقصير استدعاءات الأمر `url()`. إذا بدأت معلمة `url` الخاصة بك
    // بـ `/`، يتم إلحاق `baseUrl`، بدون تضمين جزء المسار من `baseUrl`.
    //
    // إذا كانت معلمة `url` الخاصة بك تبدأ بدون مخطط أو `/` (مثل `some/path`)، فإن `baseUrl`
    // يتم إلحاقه مباشرةً.
    baseUrl: 'http://localhost:8080',
    //
    // المهلة الافتراضية لجميع أوامر waitForXXX.
    waitforTimeout: 1000,
    //
    // إضافة ملفات للمراقبة (مثل كود التطبيق أو كائنات الصفحة) عند تشغيل أمر `wdio`
    // مع علامة `--watch`. يتم دعم التوسيع العام.
    filesToWatch: [
        // على سبيل المثال، إعادة تشغيل الاختبارات إذا قمت بتغيير كود التطبيق الخاص بي
        // './app/**/*.js'
    ],
    //
    // إطار العمل الذي تريد تشغيل مواصفاتك به.
    // الإطارات التالية مدعومة: 'mocha' و 'jasmine' و 'cucumber'
    // راجع أيضًا: https://webdriver.io/docs/frameworks.html
    //
    // تأكد من تثبيت حزمة محول wdio للإطار المحدد قبل تشغيل أي اختبارات.
    framework: 'mocha',
    //
    // عدد المرات التي يتم فيها إعادة محاولة ملف المواصفات بأكمله عندما يفشل ككل
    specFileRetries: 1,
    // التأخير بالثواني بين محاولات إعادة ملف المواصفات
    specFileRetriesDelay: 0,
    // ما إذا كان ينبغي إعادة محاولة ملفات المواصفات المعاد محاولتها على الفور أو تأجيلها إلى نهاية الطابور
    specFileRetriesDeferred: false,
    //
    // مراسل اختبار لـ stdout.
    // الوحيد المدعوم افتراضيًا هو 'dot'
    // راجع أيضًا: https://webdriver.io/docs/dot-reporter.html ، وانقر على "Reporters" في العمود الأيسر
    reporters: [
        'dot',
        ['allure', {
            //
            // إذا كنت تستخدم مراسل "allure"، فيجب عليك تحديد الدليل حيث
            // يجب على WebdriverIO حفظ جميع تقارير allure.
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
    // راجع أيضًا: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // مهلة Jasmine الافتراضية
        defaultTimeoutInterval: 5000,
        //
        // يسمح إطار Jasmine باعتراض كل تأكيد من أجل تسجيل حالة التطبيق
        // أو موقع الويب اعتمادًا على النتيجة. على سبيل المثال، من المفيد جدًا التقاط لقطة شاشة في كل مرة
        // يفشل فيها التأكيد.
        expectationResultHandler: function(passed, assertion) {
            // افعل شيئًا
        },
        //
        // الاستفادة من وظيفة grep الخاصة بـ Jasmine
        grep: null,
        invertGrep: null
    },
    //
    // إذا كنت تستخدم Cucumber، فأنت بحاجة إلى تحديد مكان تعريفات خطواتك.
    // راجع أيضًا: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (ملف/دليل) طلب الملفات قبل تنفيذ الميزات
        backtrace: false,   // <boolean> عرض التتبع الكامل للأخطاء
        compiler: [],       // <string[]> ("extension:module") طلب الملفات ذات الامتداد المعطى بعد طلب MODULE (قابل للتكرار)
        dryRun: false,      // <boolean> استدعاء المنسقات بدون تنفيذ الخطوات
        failFast: false,    // <boolean> إحباط التشغيل عند الفشل الأول
        snippets: true,     // <boolean> إخفاء مقتطفات تعريف الخطوة للخطوات المعلقة
        source: true,       // <boolean> إخفاء عناوين URI المصدر
        strict: false,      // <boolean> الفشل إذا كانت هناك أي خطوات غير معرفة أو معلقة
        tagExpression: '',  // <string> (تعبير) تنفيذ الميزات أو السيناريوهات فقط ذات العلامات المطابقة للتعبير
        timeout: 20000,     // <number> مهلة لتعريفات الخطوة
        ignoreUndefinedDefinitions: false, // <boolean> تمكين هذا التكوين لمعالجة التعريفات غير المحددة كتحذيرات.
        scenarioLevelReporter: false // تمكين هذا لجعل webdriver.io يتصرف كما لو كانت السيناريوهات وليست الخطوات هي الاختبارات.
    },
    // تحديد مسار tsconfig مخصص - يستخدم WDIO `tsx` لتجميع ملفات TypeScript
    // يتم اكتشاف TSConfig الخاص بك تلقائيًا من دليل العمل الحالي
    // ولكن يمكنك تحديد مسار مخصص هنا أو عن طريق تعيين متغير البيئة TSX_TSCONFIG_PATH
    // راجع وثائق `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // ملاحظة: سيتم تجاوز هذا الإعداد بواسطة متغير البيئة TSX_TSCONFIG_PATH و/أو وسيطة سطر الأوامر --tsConfigPath إذا تم تحديدهما.
    // سيتم تجاهل هذا الإعداد إذا كانت node غير قادرة على تحليل ملف wdio.conf.ts الخاص بك بدون مساعدة من tsx، على سبيل المثال إذا كان لديك
    // إعداد أسماء مستعارة للمسار في tsconfig.json وأنت تستخدم تلك الأسماء المستعارة للمسار داخل ملف wdio.config.ts الخاص بك.
    // استخدم هذا فقط إذا كنت تستخدم ملف تكوين .js أو كان ملف التكوين .ts الخاص بك JavaScript صالحًا.
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // الخطافات
    // =====
    // يوفر WebdriverIO العديد من الخطافات التي يمكنك استخدامها للتدخل في عملية الاختبار من أجل تحسينها
    // وبناء خدمات حولها. يمكنك إما تطبيق وظيفة واحدة عليها أو مصفوفة من
    // الطرق. إذا عاد أحدها بوعد، فسينتظر WebdriverIO حتى يتم حل هذا الوعد
    // للمتابعة.
    //
    /**
     * يتم تنفيذه مرة واحدة قبل إطلاق جميع العمال.
     * @param {object} config كائن تكوين wdio
     * @param {Array.<Object>} capabilities قائمة بتفاصيل القدرات
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * يتم تنفيذه قبل إنشاء عملية عامل ويمكن استخدامه لتهيئة خدمة محددة
     * لذلك العامل وكذلك تعديل بيئات التشغيل بطريقة غير متزامنة.
     * @param  {string} cid      معرف القدرة (مثل 0-0)
     * @param  {object} caps     كائن يحتوي على قدرات للجلسة التي سيتم إنشاؤها في العامل
     * @param  {object} specs    المواصفات التي سيتم تشغيلها في عملية العامل
     * @param  {object} args     كائن سيتم دمجه مع التكوين الرئيسي بمجرد تهيئة العامل
     * @param  {object} execArgv قائمة بوسيطات السلسلة التي يتم تمريرها إلى عملية العامل
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * يتم تنفيذه بعد خروج عملية العامل.
     * @param  {string} cid      معرف القدرة (مثل 0-0)
     * @param  {number} exitCode 0 - نجاح، 1 - فشل
     * @param  {object} specs    المواصفات التي سيتم تشغيلها في عملية العامل
     * @param  {number} retries  عدد إعادة المحاولات المستخدمة
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * يتم تنفيذه قبل تهيئة جلسة webdriver وإطار الاختبار. يسمح لك
     * بالتلاعب بالتكوينات اعتمادًا على القدرة أو المواصفات.
     * @param {object} config كائن تكوين wdio
     * @param {Array.<Object>} capabilities قائمة بتفاصيل القدرات
     * @param {Array.<String>} specs قائمة بمسارات ملفات المواصفات التي سيتم تشغيلها
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * يتم تنفيذه قبل بدء تنفيذ الاختبار. في هذه المرحلة يمكنك الوصول إلى جميع المتغيرات العالمية
     * مثل `browser`. إنه المكان المثالي لتعريف الأوامر المخصصة.
     * @param {Array.<Object>} capabilities قائمة بتفاصيل القدرات
     * @param {Array.<String>} specs        قائمة بمسارات ملفات المواصفات التي سيتم تشغيلها
     * @param {object}         browser      نسخة من جلسة المتصفح/الجهاز التي تم إنشاؤها
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * يتم تنفيذه قبل بدء المجموعة (في Mocha/Jasmine فقط).
     * @param {object} suite تفاصيل المجموعة
     */
    beforeSuite: function (suite) {
    },
    /**
     * يتم تنفيذ هذا الخطاف _قبل_ كل خطاف داخل المجموعة يبدأ.
     * (على سبيل المثال، يعمل هذا قبل استدعاء `before` و`beforeEach` و`after` و`afterEach` في Mocha.). في Cucumber `context` هو كائن العالم.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * خطاف يتم تنفيذه _بعد_ كل خطاف داخل المجموعة ينتهي.
     * (على سبيل المثال، يعمل هذا بعد استدعاء `before` و`beforeEach` و`after` و`afterEach` في Mocha.). في Cucumber `context` هو كائن العالم.
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * وظيفة يتم تنفيذها قبل اختبار (في Mocha/Jasmine فقط)
     * @param {object} test    كائن الاختبار
     * @param {object} context كائن النطاق الذي تم تنفيذ الاختبار به
     */
    beforeTest: function (test, context) {
    },
    /**
     * يعمل قبل تنفيذ أمر WebdriverIO.
     * @param {string} commandName اسم أمر الخطاف
     * @param {Array} args الوسيطات التي سيتلقاها الأمر
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * يعمل بعد تنفيذ أمر WebdriverIO
     * @param {string} commandName اسم أمر الخطاف
     * @param {Array} args الوسيطات التي سيتلقاها الأمر
     * @param {*} result نتيجة الأمر
     * @param {Error} error كائن الخطأ، إن وجد
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * وظيفة يتم تنفيذها بعد اختبار (في Mocha/Jasmine فقط)
     * @param {object}  test             كائن الاختبار
     * @param {object}  context          كائن النطاق الذي تم تنفيذ الاختبار به
     * @param {Error}   result.error     كائن الخطأ في حالة فشل الاختبار، وإلا `undefined`
     * @param {*}       result.result    كائن إرجاع وظيفة الاختبار
     * @param {number}  result.duration  مدة الاختبار
     * @param {boolean} result.passed    صحيح إذا نجح الاختبار، وإلا خطأ
     * @param {object}  result.retries   معلومات حول إعادة المحاولات المتعلقة بالمواصفات، مثل `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * خطاف يتم تنفيذه بعد انتهاء المجموعة (في Mocha/Jasmine فقط).
     * @param {object} suite تفاصيل المجموعة
     */
    afterSuite: function (suite) {
    },
    /**
     * يتم تنفيذه بعد الانتهاء من جميع الاختبارات. لا يزال لديك إمكانية الوصول إلى جميع المتغيرات العالمية من
     * الاختبار.
     * @param {number} result 0 - نجاح الاختبار، 1 - فشل الاختبار
     * @param {Array.<Object>} capabilities قائمة بتفاصيل القدرات
     * @param {Array.<String>} specs قائمة بمسارات ملفات المواصفات التي تم تشغيلها
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * يتم تنفيذه مباشرة بعد إنهاء جلسة webdriver.
     * @param {object} config كائن تكوين wdio
     * @param {Array.<Object>} capabilities قائمة بتفاصيل القدرات
     * @param {Array.<String>} specs قائمة بمسارات ملفات المواصفات التي تم تشغيلها
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * يتم تنفيذه بعد إيقاف تشغيل جميع العمال وعلى وشك الخروج من العملية.
     * سيؤدي الخطأ المطروح في خطاف `onComplete` إلى فشل تشغيل الاختبار.
     * @param {object} exitCode 0 - نجاح، 1 - فشل
     * @param {object} config كائن تكوين wdio
     * @param {Array.<Object>} capabilities قائمة بتفاصيل القدرات
     * @param {<Object>} results كائن يحتوي على نتائج الاختبار
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * يتم تنفيذه عند حدوث تحديث.
    * @param {string} oldSessionId معرف الجلسة القديمة
    * @param {string} newSessionId معرف الجلسة الجديدة
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * خطافات Cucumber
     *
     * تعمل قبل ميزة Cucumber.
     * @param {string}                   uri      المسار إلى ملف الميزة
     * @param {GherkinDocument.IFeature} feature  كائن ميزة Cucumber
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * تعمل قبل سيناريو Cucumber.
     * @param {ITestCaseHookParameter} world    كائن العالم الذي يحتوي على معلومات حول pickle وخطوة الاختبار
     * @param {object}                 context  كائن عالم Cucumber
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * تعمل قبل خطوة Cucumber.
     * @param {Pickle.IPickleStep} step     بيانات الخطوة
     * @param {IPickle}            scenario مخلل السيناريو
     * @param {object}             context  كائن عالم Cucumber
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * تعمل بعد خطوة Cucumber.
     * @param {Pickle.IPickleStep} step             بيانات الخطوة
     * @param {IPickle}            scenario         مخلل السيناريو
     * @param {object}             result           كائن النتائج الذي يحتوي على نتائج السيناريو
     * @param {boolean}            result.passed    صحيح إذا نجح السيناريو
     * @param {string}             result.error     مكدس الخطأ إذا فشل السيناريو
     * @param {number}             result.duration  مدة السيناريو بالمللي ثانية
     * @param {object}             context          كائن عالم Cucumber
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * تعمل بعد سيناريو Cucumber.
     * @param {ITestCaseHookParameter} world            كائن العالم الذي يحتوي على معلومات حول pickle وخطوة الاختبار
     * @param {object}                 result           كائن النتائج الذي يحتوي على نتائج السيناريو `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    صحيح إذا نجح السيناريو
     * @param {string}                 result.error     مكدس الخطأ إذا فشل السيناريو
     * @param {number}                 result.duration  مدة السيناريو بالمللي ثانية
     * @param {object}                 context          كائن عالم Cucumber
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * تعمل بعد ميزة Cucumber.
     * @param {string}                   uri      المسار إلى ملف الميزة
     * @param {GherkinDocument.IFeature} feature  كائن ميزة Cucumber
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * يعمل قبل أن تقوم مكتبة تأكيد WebdriverIO بإجراء تأكيد.
     * @param commandName اسم الأمر
     * @param args        الوسيطات التي سيتلقاها الأمر
     */
    beforeAssertion: function (params) {
    },
    /**
     * يعمل بعد تنفيذ أمر WebdriverIO
     * @param commandName  اسم الأمر
     * @param args         الوسيطات التي سيتلقاها الأمر
     * @param result       نتيجة الأمر
     * @param error        خطأ في حالة حدوث خطأ ما
     */
    afterAssertion: function (params) {
    }
}
```

يمكنك أيضًا العثور على ملف يحتوي على جميع الخيارات والاختلافات الممكنة في [مجلد الأمثلة](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js).