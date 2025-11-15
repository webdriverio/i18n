---
id: configurationfile
title: ملف التكوين
---

يحتوي ملف التكوين على جميع المعلومات الضرورية لتشغيل مجموعة الاختبار الخاصة بك. إنه وحدة NodeJS تصدر ملف JSON.

فيما يلي مثال للتكوين مع جميع الخصائص المدعومة ومعلومات إضافية:

```js
export const config = {

    // ==================================
    // أين يجب إطلاق الاختبار الخاص بك
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // تكوينات الخادم
    // =====================
    // عنوان المضيف لخادم Selenium قيد التشغيل. هذه المعلومات عادة ما تكون زائدة عن الحاجة، لأن
    // WebdriverIO يتصل تلقائيًا بـ localhost. أيضًا إذا كنت تستخدم أحد
    // الخدمات السحابية المدعومة مثل Sauce Labs أو Browserstack أو Testing Bot أو LambdaTest، فأنت أيضًا لا
    // تحتاج إلى تحديد معلومات المضيف والمنفذ (لأن WebdriverIO يمكنه معرفة ذلك
    // من معلومات المستخدم والمفتاح الخاصة بك). ومع ذلك، إذا كنت تستخدم خلفية Selenium
    // خاصة، فيجب عليك تحديد `hostname` و `port` و `path` هنا.
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // البروتوكول: http | https
    // protocol: 'http',
    //
    // =================
    // مزودو الخدمة
    // =================
    // يدعم WebdriverIO Sauce Labs و Browserstack و Testing Bot و LambdaTest. (مزودو السحابة الآخرون
    // يجب أن يعملوا أيضًا.) تحدد هذه الخدمات قيم `user` و `key` (أو مفتاح الوصول)
    // المحددة التي يجب وضعها هنا، من أجل الاتصال بهذه الخدمات.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // إذا كنت تقوم بتشغيل اختباراتك على Sauce Labs، يمكنك تحديد المنطقة التي تريد تشغيل اختباراتك
    // فيها عبر خاصية `region`. الاختصارات المتاحة للمناطق هي `us` (افتراضي) و `eu`.
    // تستخدم هذه المناطق لسحابة Sauce Labs VM وسحابة أجهزة Sauce Labs الحقيقية.
    // إذا لم تقدم المنطقة، فإنها تكون افتراضيًا `us`.
    region: 'us',
    //
    // يوفر Sauce Labs [عرضًا بلا رأس](https://saucelabs.com/products/web-testing/sauce-headless-testing)
    // يتيح لك تشغيل اختبارات Chrome و Firefox بدون رأس.
    //
    headless: false,
    //
    // ==================
    // تحديد ملفات الاختبار
    // ==================
    // حدد أي ملفات اختبار يجب تشغيلها. النمط نسبي إلى الدليل
    // لملف التكوين الذي يتم تشغيله.
    //
    // يتم تعريف المواصفات كمصفوفة من ملفات المواصفات (اختياريًا باستخدام أحرف البدل
    // التي سيتم توسيعها). سيتم تشغيل الاختبار لكل ملف مواصفات في عملية
    // عامل منفصلة. من أجل الحصول على مجموعة من ملفات المواصفات لتشغيلها في نفس عملية
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
    // الوقت. اعتمادًا على عدد القدرات، يطلق WebdriverIO عدة جلسات
    // اختبار. ضمن `capabilities`، يمكنك الكتابة فوق خيارات `spec` و `exclude`
    // من أجل تجميع مواصفات محددة لقدرة محددة.
    //
    // أولاً، يمكنك تحديد عدد المثيلات التي يجب بدؤها في نفس الوقت. لنقل
    // أن لديك 3 قدرات مختلفة (Chrome و Firefox و Safari) وقد
    // قمت بتعيين `maxInstances` إلى 1. سيقوم wdio بإنشاء 3 عمليات.
    //
    // لذلك، إذا كان لديك 10 ملفات مواصفات وقمت بتعيين `maxInstances` إلى 10، فسيتم اختبار جميع ملفات المواصفات
    // في نفس الوقت وسيتم إنشاء 30 عملية.
    //
    // تتحكم الخاصية في عدد القدرات من نفس الاختبار التي يجب أن تشغل الاختبارات.
    //
    maxInstances: 10,
    //
    // أو حدد حدًا لتشغيل الاختبارات باستخدام قدرة محددة.
    maxInstancesPerCapability: 10,
    //
    // يدخل متغيرات WebdriverIO العالمية (مثل `browser` و `$` و `$$`) في البيئة العالمية.
    // إذا قمت بالتعيين إلى `false`، يجب عليك الاستيراد من `@wdio/globals`. ملاحظة: WebdriverIO لا
    // يتعامل مع حقن المتغيرات العالمية الخاصة بإطار الاختبار.
    //
    injectGlobals: true,
    //
    // إذا كنت تواجه مشكلة في الحصول على جميع القدرات المهمة معًا، فتحقق من
    // أداة تكوين منصة Sauce Labs - وهي أداة رائعة لتكوين قدراتك:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // لتشغيل chrome بدون رأس، الأعلام التالية مطلوبة
        // (انظر https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // معلمة لتجاهل بعض أو كل الأعلام الافتراضية
        // - إذا كانت القيمة صحيحة: تجاهل جميع 'الأعلام الافتراضية' لـ DevTools و'الوسائط الافتراضية' لـ Puppeteer
        // - إذا كانت القيمة مصفوفة: DevTools يصفي الوسائط الافتراضية المعطاة
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // يمكن أن يتم الكتابة فوق maxInstances لكل قدرة. لذلك إذا كان لديك شبكة Selenium داخلية
        // مع 5 مثيلات firefox فقط متاحة، يمكنك التأكد من عدم بدء أكثر من
        // 5 مثيلات في وقت واحد.
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // علامة لتنشيط وضع Firefox بدون رأس (انظر https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities لمزيد من التفاصيل حول moz:firefoxOptions)
          // args: ['-headless']
        },
        // إذا تم توفير outputDir، فيمكن لـ WebdriverIO التقاط سجلات جلسة برنامج التشغيل
        // من الممكن تكوين أنواع السجلات التي سيتم استبعادها.
        excludeDriverLogs: ['*'], // مرر '*' لاستبعاد جميع سجلات جلسة برنامج التشغيل
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // معلمة لتجاهل بعض أو كل وسائط Puppeteer الافتراضية
        // ignoreDefaultArgs: ['-foreground'], // قم بتعيين القيمة إلى true لتجاهل جميع الوسائط الافتراضية
    }],
    //
    // قائمة إضافية بوسائط node لاستخدامها عند بدء العمليات الفرعية
    execArgv: [],
    //
    // ===================
    // تكوينات الاختبار
    // ===================
    // حدد جميع الخيارات ذات الصلة بمثيل WebdriverIO هنا
    //
    // مستوى التفصيل في السجلات: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // تعيين مستويات سجل محددة لكل مسجل
    // استخدم مستوى 'silent' لتعطيل المسجل
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // تعيين الدليل لتخزين جميع السجلات فيه
    outputDir: __dirname,
    //
    // إذا كنت تريد فقط تشغيل اختباراتك حتى يفشل عدد محدد من الاختبارات، استخدم
    // bail (الافتراضي هو 0 - لا تتوقف، قم بتشغيل جميع الاختبارات).
    bail: 0,
    //
    // قم بتعيين عنوان URL أساسي من أجل تقصير استدعاءات أمر `url()`. إذا كان معلمة `url` تبدأ
    // بـ `/`، يتم إلحاق `baseUrl` بها، دون تضمين جزء المسار من `baseUrl`.
    //
    // إذا كانت معلمة `url` تبدأ بدون مخطط أو `/` (مثل `some/path`)، فإن `baseUrl`
    // تُلحق مباشرةً.
    baseUrl: 'http://localhost:8080',
    //
    // المهلة الافتراضية لجميع أوامر waitForXXX.
    waitforTimeout: 1000,
    //
    // إضافة ملفات للمراقبة (مثل كود التطبيق أو كائنات الصفحة) عند تشغيل أمر `wdio`
    // باستخدام علامة `--watch`. يتم دعم استخدام Globbing.
    filesToWatch: [
        // على سبيل المثال إعادة تشغيل الاختبارات إذا قمت بتغيير كود التطبيق الخاص بي
        // './app/**/*.js'
    ],
    //
    // إطار العمل الذي تريد تشغيل مواصفاتك معه.
    // الإطارات المدعومة هي: 'mocha' و 'jasmine' و 'cucumber'
    // انظر أيضًا: https://webdriver.io/docs/frameworks.html
    //
    // تأكد من تثبيت حزمة محول wdio للإطار المحدد قبل تشغيل أي اختبارات.
    framework: 'mocha',
    //
    // عدد مرات إعادة محاولة ملف المواصفات بأكمله عندما يفشل ككل
    specFileRetries: 1,
    // التأخير بالثواني بين محاولات إعادة ملف المواصفات
    specFileRetriesDelay: 0,
    // ما إذا كانت ملفات المواصفات التي تمت إعادة محاولتها يجب إعادة محاولتها على الفور أو تأجيلها إلى نهاية قائمة الانتظار
    specFileRetriesDeferred: false,
    //
    // مراسل الاختبار لـ stdout.
    // المراسل الوحيد المدعوم افتراضيًا هو 'dot'
    // انظر أيضًا: https://webdriver.io/docs/dot-reporter.html ، وانقر على "Reporters" في العمود الأيسر
    reporters: [
        'dot',
        ['allure', {
            //
            // إذا كنت تستخدم مراسل "allure"، فيجب عليك تحديد الدليل حيث
            // يجب أن يحفظ WebdriverIO جميع تقارير allure.
            outputDir: './'
        }]
    ],
    //
    // الخيارات التي سيتم تمريرها إلى Mocha.
    // انظر القائمة الكاملة على: http://mochajs.org
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // الخيارات التي سيتم تمريرها إلى Jasmine.
    // انظر أيضًا: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // المهلة الافتراضية لـ Jasmine
        defaultTimeoutInterval: 5000,
        //
        // يسمح إطار Jasmine باعتراض كل تأكيد من أجل تسجيل حالة التطبيق
        // أو موقع الويب حسب النتيجة. على سبيل المثال، من المفيد جدًا التقاط لقطة شاشة في كل مرة
        // يفشل فيها تأكيد.
        expectationResultHandler: function(passed, assertion) {
            // افعل شيئًا ما
        },
        //
        // استخدام وظيفة grep الخاصة بـ Jasmine
        grep: null,
        invertGrep: null
    },
    //
    // إذا كنت تستخدم Cucumber، فأنت بحاجة إلى تحديد مكان تعريفات الخطوات الخاصة بك.
    // انظر أيضًا: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (ملف/دليل) يتطلب الملفات قبل تنفيذ الميزات
        backtrace: false,   // <boolean> عرض تتبع كامل للأخطاء
        compiler: [],       // <string[]> ("extension:module") يتطلب ملفات بالامتداد المعطى بعد طلب MODULE (قابل للتكرار)
        dryRun: false,      // <boolean> استدعاء المنسقين دون تنفيذ الخطوات
        failFast: false,    // <boolean> إلغاء التشغيل عند الفشل الأول
        snippets: true,     // <boolean> إخفاء مقتطفات تعريف الخطوات للخطوات المعلقة
        source: true,       // <boolean> إخفاء عناوين URI المصدر
        strict: false,      // <boolean> الفشل إذا كانت هناك أي خطوات غير محددة أو معلقة
        tagExpression: '',  // <string> (تعبير) تنفيذ الميزات أو السيناريوهات فقط مع العلامات التي تطابق التعبير
        timeout: 20000,     // <number> المهلة لتعريفات الخطوات
        ignoreUndefinedDefinitions: false, // <boolean> تمكين هذا التكوين لمعاملة التعريفات غير المحددة كتحذيرات.
        scenarioLevelReporter: false // تمكين هذا لجعل webdriver.io يتصرف كما لو كانت السيناريوهات وليست الخطوات هي الاختبارات.
    },
    // حدد مسار tsconfig مخصص - يستخدم WDIO `tsx` لتجميع ملفات TypeScript
    // يتم اكتشاف TSConfig الخاص بك تلقائيًا من دليل العمل الحالي
    // ولكن يمكنك تحديد مسار مخصص هنا أو عن طريق تعيين متغير البيئة TSX_TSCONFIG_PATH
    // انظر مستندات `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // ملاحظة: سيتم تجاوز هذا الإعداد بواسطة متغير البيئة TSX_TSCONFIG_PATH و/أو وسيطة الأوامر --tsConfigPath إذا تم تحديدهما.
    // سيتم تجاهل هذا الإعداد إذا كانت node غير قادرة على تحليل ملف wdio.conf.ts الخاص بك دون مساعدة من tsx، على سبيل المثال إذا كان لديك
    // أسماء مستعارة للمسار معدة في tsconfig.json وتستخدم تلك الأسماء المستعارة للمسار داخل ملف wdio.config.ts الخاص بك.
    // استخدم هذا فقط إذا كنت تستخدم ملف تكوين .js أو كان ملف التكوين .ts الخاص بك JavaScript صالحًا.
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // الخطافات
    // =====
    // يوفر WebdriverIO عدة خطافات يمكنك استخدامها للتداخل في عملية الاختبار من أجل تحسينها
    // وبناء خدمات حولها. يمكنك إما تطبيق دالة واحدة عليها أو مصفوفة من
    // الطرق. إذا أعاد أحدهم بوعد، فسينتظر WebdriverIO حتى يتم حل هذا الوعد
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
     * @param  {string} cid      معرف القدرة (على سبيل المثال 0-0)
     * @param  {object} caps     كائن يحتوي على قدرات للجلسة التي سيتم إنشاؤها في العامل
     * @param  {object} specs    المواصفات التي سيتم تشغيلها في عملية العامل
     * @param  {object} args     كائن سيتم دمجه مع التكوين الرئيسي بمجرد تهيئة العامل
     * @param  {object} execArgv قائمة بوسائط السلسلة التي تم تمريرها إلى عملية العامل
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * يتم تنفيذه بعد خروج عملية عامل.
     * @param  {string} cid      معرف القدرة (على سبيل المثال 0-0)
     * @param  {number} exitCode 0 - نجاح، 1 - فشل
     * @param  {object} specs    المواصفات التي سيتم تشغيلها في عملية العامل
     * @param  {number} retries  عدد إعادة المحاولات المستخدمة
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * يتم تنفيذه قبل تهيئة جلسة webdriver وإطار الاختبار. يتيح لك
     * التلاعب بالتكوينات اعتمادًا على القدرة أو المواصفات.
     * @param {object} config كائن تكوين wdio
     * @param {Array.<Object>} capabilities قائمة بتفاصيل القدرات
     * @param {Array.<String>} specs قائمة بمسارات ملفات المواصفات التي سيتم تشغيلها
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * يتم تنفيذه قبل بدء تنفيذ الاختبار. في هذه النقطة يمكنك الوصول إلى جميع المتغيرات العالمية
     * مثل `browser`. إنه المكان المثالي لتحديد الأوامر المخصصة.
     * @param {Array.<Object>} capabilities قائمة بتفاصيل القدرات
     * @param {Array.<String>} specs        قائمة بمسارات ملفات المواصفات التي سيتم تشغيلها
     * @param {object}         browser      مثيل جلسة المتصفح/الجهاز التي تم إنشاؤها
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
     * (على سبيل المثال، يتم تشغيل هذا قبل استدعاء `before` و `beforeEach` و `after` و `afterEach` في Mocha.). في Cucumber، `context` هو كائن World.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * يتم تنفيذ الخطاف _بعد_ كل خطاف داخل المجموعة ينتهي.
     * (على سبيل المثال، يتم تشغيل هذا بعد استدعاء `before` و `beforeEach` و `after` و `afterEach` في Mocha.). في Cucumber، `context` هو كائن World.
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * وظيفة يتم تنفيذها قبل الاختبار (في Mocha/Jasmine فقط)
     * @param {object} test    كائن الاختبار
     * @param {object} context كائن النطاق الذي تم تنفيذ الاختبار معه
     */
    beforeTest: function (test, context) {
    },
    /**
     * يتم تشغيله قبل تنفيذ أمر WebdriverIO.
     * @param {string} commandName اسم أمر الخطاف
     * @param {Array} args الوسائط التي سيتلقاها الأمر
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * يتم تشغيله بعد تنفيذ أمر WebdriverIO
     * @param {string} commandName اسم أمر الخطاف
     * @param {Array} args الوسائط التي سيتلقاها الأمر
     * @param {*} result نتيجة الأمر
     * @param {Error} error كائن الخطأ، إن وجد
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * وظيفة يتم تنفيذها بعد الاختبار (في Mocha/Jasmine فقط)
     * @param {object}  test             كائن الاختبار
     * @param {object}  context          كائن النطاق الذي تم تنفيذ الاختبار معه
     * @param {Error}   result.error     كائن الخطأ في حالة فشل الاختبار، وإلا `undefined`
     * @param {*}       result.result    كائن إرجاع دالة الاختبار
     * @param {number}  result.duration  مدة الاختبار
     * @param {boolean} result.passed    صحيح إذا نجح الاختبار، وإلا خطأ
     * @param {object}  result.retries   معلومات حول إعادة المحاولات المتعلقة بالمواصفات، على سبيل المثال `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * يتم تنفيذ الخطاف بعد انتهاء المجموعة (في Mocha/Jasmine فقط).
     * @param {object} suite تفاصيل المجموعة
     */
    afterSuite: function (suite) {
    },
    /**
     * يتم تنفيذه بعد الانتهاء من جميع الاختبارات. لا يزال لديك حق الوصول إلى جميع المتغيرات العالمية من
     * الاختبار.
     * @param {number} result 0 - نجح الاختبار، 1 - فشل الاختبار
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
     * يتم تنفيذه بعد إغلاق جميع العمال وعندما تكون العملية على وشك الخروج.
     * سيؤدي الخطأ المرمي في خطاف `onComplete` إلى فشل تشغيل الاختبار.
     * @param {object} exitCode 0 - نجاح، 1 - فشل
     * @param {object} config كائن تكوين wdio
     * @param {Array.<Object>} capabilities قائمة بتفاصيل القدرات
     * @param {<Object>} results كائن يحتوي على نتائج الاختبار
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * يتم تنفيذه عند حدوث تحديث.
    * @param {string} oldSessionId معرف الجلسة للجلسة القديمة
    * @param {string} newSessionId معرف الجلسة للجلسة الجديدة
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * خطافات Cucumber
     *
     * تشغيل قبل ميزة Cucumber.
     * @param {string}                   uri      مسار إلى ملف الميزة
     * @param {GherkinDocument.IFeature} feature  كائن ميزة Cucumber
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * تشغيل قبل سيناريو Cucumber.
     * @param {ITestCaseHookParameter} world    كائن عالمي يحتوي على معلومات حول pickle وخطوة الاختبار
     * @param {object}                 context  كائن Cucumber World
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * تشغيل قبل خطوة Cucumber.
     * @param {Pickle.IPickleStep} step     بيانات الخطوة
     * @param {IPickle}            scenario pickle السيناريو
     * @param {object}             context  كائن Cucumber World
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * تشغيل بعد خطوة Cucumber.
     * @param {Pickle.IPickleStep} step             بيانات الخطوة
     * @param {IPickle}            scenario         pickle السيناريو
     * @param {object}             result           كائن النتائج الذي يحتوي على نتائج السيناريو
     * @param {boolean}            result.passed    صحيح إذا نجح السيناريو
     * @param {string}             result.error     سلسلة الخطأ إذا فشل السيناريو
     * @param {number}             result.duration  مدة السيناريو بالميلي ثانية
     * @param {object}             context          كائن Cucumber World
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * تشغيل بعد سيناريو Cucumber.
     * @param {ITestCaseHookParameter} world            كائن عالمي يحتوي على معلومات حول pickle وخطوة الاختبار
     * @param {object}                 result           كائن النتائج الذي يحتوي على نتائج السيناريو `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    صحيح إذا نجح السيناريو
     * @param {string}                 result.error     سلسلة الخطأ إذا فشل السيناريو
     * @param {number}                 result.duration  مدة السيناريو بالميلي ثانية
     * @param {object}                 context          كائن Cucumber World
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * تشغيل بعد ميزة Cucumber.
     * @param {string}                   uri      مسار إلى ملف الميزة
     * @param {GherkinDocument.IFeature} feature  كائن ميزة Cucumber
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * يتم تشغيله قبل أن تقوم مكتبة تأكيد WebdriverIO بإجراء تأكيد.
     * @param commandName اسم الأمر
     * @param args        الوسائط التي سيتلقاها الأمر
     */
    beforeAssertion: function (params) {
    },
    /**
     * يتم تشغيله بعد تنفيذ أمر WebdriverIO
     * @param commandName  اسم الأمر
     * @param args         الوسائط التي سيتلقاها الأمر
     * @param result       نتيجة الأمر
     * @param error        خطأ في حالة حدوث خطأ ما
     */
    afterAssertion: function (params) {
    }
}
```

يمكنك أيضًا العثور على ملف يحتوي على جميع الخيارات والتنوعات الممكنة في [مجلد الأمثلة](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js).