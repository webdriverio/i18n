---
id: configurationfile
title: ملف التكوين
---

يحتوي ملف التكوين على جميع المعلومات الضرورية لتشغيل مجموعة الاختبارات الخاصة بك. إنه وحدة NodeJS تصدر JSON.

فيما يلي مثال على التكوين مع جميع الخصائص المدعومة ومعلومات إضافية:

```js
export const config = {

    // ==================================
    // أين يجب إطلاق الاختبار الخاص بك
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // إعدادات الخادم
    // =====================
    // عنوان المضيف لخادم Selenium قيد التشغيل. هذه المعلومات عادة ما تكون زائدة عن الحاجة، حيث
    // يتصل WebdriverIO تلقائيًا بـ localhost. أيضًا إذا كنت تستخدم إحدى
    // خدمات السحابة المدعومة مثل Sauce Labs أو Browserstack أو Testing Bot أو LambdaTest، فأنت أيضًا لا
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
    // مزودي الخدمة
    // =================
    // يدعم WebdriverIO خدمات Sauce Labs وBrowserstack وTesting Bot وLambdaTest. (مزودو السحابة الآخرون
    // يجب أن يعملوا أيضًا.) تحدد هذه الخدمات قيم `user` و `key` (أو مفتاح الوصول)
    // المحددة التي يجب عليك وضعها هنا للاتصال بهذه الخدمات.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // إذا كنت تقوم بتشغيل اختباراتك على Sauce Labs، يمكنك تحديد المنطقة التي تريد تشغيل اختباراتك
    // فيها عبر خاصية `region`. المقابض القصيرة المتاحة للمناطق هي `us` (الافتراضي) و `eu`.
    // يتم استخدام هذه المناطق لسحابة Sauce Labs VM وSauce Labs Real Device Cloud.
    // إذا لم تقدم المنطقة، فإنها ستكون `us` افتراضيًا.
    region: 'us',
    //
    // توفر Sauce Labs [عرضًا بدون واجهة مستخدم](https://saucelabs.com/products/web-testing/sauce-headless-testing)
    // يتيح لك تشغيل اختبارات Chrome وFirefox بدون واجهة مستخدم.
    //
    headless: false,
    //
    // ==================
    // تحديد ملفات الاختبار
    // ==================
    // حدد أي مواصفات اختبار يجب تشغيلها. النمط نسبي إلى الدليل
    // لملف التكوين الذي يتم تشغيله.
    //
    // يتم تعريف المواصفات كمصفوفة من ملفات المواصفات (مع إمكانية استخدام أحرف البدل
    // التي سيتم توسيعها). سيتم تشغيل الاختبار لكل ملف مواصفات في عملية
    // عامل منفصلة. لكي تتمكن من تشغيل مجموعة من ملفات المواصفات في نفس عملية
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
    // اختبار. ضمن `capabilities`، يمكنك تجاوز خيارات `spec` و `exclude`
    // من أجل تجميع مواصفات محددة لقدرة محددة.
    //
    // أولاً، يمكنك تحديد عدد النسخ التي يجب بدؤها في نفس الوقت. لنفترض
    // أن لديك 3 قدرات مختلفة (Chrome وFirefox وSafari) وقمت بتعيين
    // `maxInstances` إلى 1. سيطلق wdio 3 عمليات.
    //
    // لذلك، إذا كان لديك 10 ملفات مواصفات وقمت بتعيين `maxInstances` إلى 10، فسيتم اختبار جميع ملفات المواصفات
    // في نفس الوقت وسيتم إطلاق 30 عملية.
    //
    // تتعامل الخاصية مع عدد القدرات من نفس الاختبار التي يجب أن تقوم بتشغيل الاختبارات.
    //
    maxInstances: 10,
    //
    // أو قم بتعيين حد لتشغيل الاختبارات بقدرة معينة.
    maxInstancesPerCapability: 10,
    //
    // يقوم بإدراج عناصر WebdriverIO العامة (مثل `browser` و `$` و `$$`) في البيئة العامة.
    // إذا قمت بالتعيين إلى `false`، فيجب عليك الاستيراد من `@wdio/globals`. ملاحظة: لا يقوم WebdriverIO
    // بالتعامل مع حقن العناصر العامة الخاصة بإطار الاختبار.
    //
    injectGlobals: true,
    //
    // إذا كنت تواجه مشكلة في جمع كل القدرات المهمة معًا، تحقق من
    // أداة تكوين منصة Sauce Labs - أداة رائعة لتكوين قدراتك:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // لتشغيل chrome بدون واجهة مستخدم، الأعلام التالية مطلوبة
        // (انظر https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // معلمة لتجاهل بعض أو كل الأعلام الافتراضية
        // - إذا كانت القيمة true: تجاهل جميع 'الأعلام الافتراضية' لـ DevTools و 'الوسيطات الافتراضية' لـ Puppeteer
        // - إذا كانت القيمة مصفوفة: DevTools يقوم بترشيح الوسيطات الافتراضية المحددة
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // يمكن تجاوز maxInstances لكل قدرة. لذلك إذا كان لديك شبكة Selenium داخلية
        // بها 5 نسخ فقط من firefox متاحة، يمكنك التأكد من عدم بدء أكثر من
        // 5 نسخ في المرة الواحدة.
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // علامة لتنشيط وضع Firefox بدون واجهة مستخدم (انظر https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities لمزيد من التفاصيل حول moz:firefoxOptions)
          // args: ['-headless']
        },
        // إذا تم توفير outputDir، يمكن لـ WebdriverIO التقاط سجلات جلسة السائق
        // من الممكن تكوين أنواع السجلات التي سيتم استبعادها.
        // excludeDriverLogs: ['*'], // مرر '*' لاستبعاد جميع سجلات جلسة السائق
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // معلمة لتجاهل بعض أو كل وسيطات Puppeteer الافتراضية
        // ignoreDefaultArgs: ['-foreground'], // اضبط القيمة على true لتجاهل جميع الوسيطات الافتراضية
    }],
    //
    // قائمة إضافية من وسيطات node لاستخدامها عند بدء العمليات الفرعية
    execArgv: [],
    //
    // ===================
    // تكوينات الاختبار
    // ===================
    // حدد جميع الخيارات المتعلقة بنسخة WebdriverIO هنا
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
    // إذا كنت تريد فقط تشغيل اختباراتك حتى يفشل عدد معين من الاختبارات استخدم
    // bail (الافتراضي هو 0 - لا bail، تشغيل جميع الاختبارات).
    bail: 0,
    //
    // قم بتعيين عنوان URL أساسي لتقصير استدعاءات أمر `url()`. إذا كان معلمة `url` الخاصة بك تبدأ
    // بـ `/`، فسيتم إضافة `baseUrl` مسبقًا، دون تضمين جزء المسار من `baseUrl`.
    //
    // إذا كانت معلمة `url` الخاصة بك تبدأ بدون مخطط أو `/` (مثل `some/path`)، فسيتم
    // إضافة `baseUrl` بشكل مباشر.
    baseUrl: 'http://localhost:8080',
    //
    // المهلة الافتراضية لجميع أوامر waitForXXX.
    waitforTimeout: 1000,
    //
    // أضف ملفات للمراقبة (مثل كود التطبيق أو كائنات الصفحة) عند تشغيل أمر `wdio`
    // مع علامة `--watch`. يتم دعم استخدام الأحرف البدلية.
    filesToWatch: [
        // على سبيل المثال، أعد تشغيل الاختبارات إذا قمت بتغيير كود التطبيق الخاص بي
        // './app/**/*.js'
    ],
    //
    // إطار العمل الذي تريد تشغيل المواصفات الخاصة بك معه.
    // الإطارات المدعومة هي: 'mocha' و 'jasmine' و 'cucumber'
    // انظر أيضًا: https://webdriver.io/docs/frameworks.html
    //
    // تأكد من تثبيت حزمة محول wdio للإطار المحدد قبل تشغيل أي اختبارات.
    framework: 'mocha',
    //
    // عدد مرات إعادة محاولة ملف المواصفات بالكامل عندما يفشل ككل
    specFileRetries: 1,
    // التأخير بالثواني بين محاولات إعادة ملف المواصفات
    specFileRetriesDelay: 0,
    // ما إذا كان يجب إعادة محاولة ملفات المواصفات المعاد محاولتها على الفور أو تأجيلها إلى نهاية الطابور
    specFileRetriesDeferred: false,
    //
    // مراقب الاختبار لـ stdout.
    // المراقب الوحيد المدعوم افتراضيًا هو 'dot'
    // انظر أيضًا: https://webdriver.io/docs/dot-reporter.html ، وانقر على "Reporters" في العمود الأيسر
    reporters: [
        'dot',
        ['allure', {
            //
            // إذا كنت تستخدم مراقب "allure"، يجب عليك تحديد الدليل الذي
            // يجب أن يحفظ فيه WebdriverIO جميع تقارير allure.
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
        // أو موقع الويب اعتمادًا على النتيجة. على سبيل المثال، من المفيد جدًا التقاط لقطة شاشة في كل مرة
        // يفشل فيها التأكيد.
        expectationResultHandler: function(passed, assertion) {
            // قم بعمل شيء ما
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
        require: [],        // <string[]> (ملف/دليل) طلب الملفات قبل تنفيذ الميزات
        backtrace: false,   // <boolean> عرض تتبع كامل للأخطاء
        compiler: [],       // <string[]> ("extension:module") طلب الملفات ذات الامتداد المحدد بعد طلب MODULE (قابل للتكرار)
        dryRun: false,      // <boolean> استدعاء المنسقين دون تنفيذ الخطوات
        failFast: false,    // <boolean> إلغاء التشغيل عند أول فشل
        snippets: true,     // <boolean> إخفاء مقتطفات تعريف الخطوة للخطوات المعلقة
        source: true,       // <boolean> إخفاء عناوين URI المصدر
        strict: false,      // <boolean> الفشل إذا كانت هناك أي خطوات غير محددة أو معلقة
        tagExpression: '',  // <string> (تعبير) تنفيذ الميزات أو السيناريوهات فقط مع علامات تطابق التعبير
        timeout: 20000,     // <number> مهلة لتعريفات الخطوة
        ignoreUndefinedDefinitions: false, // <boolean> تمكين هذا التكوين لمعاملة التعريفات غير المحددة كتحذيرات.
        scenarioLevelReporter: false // تمكين هذا لجعل webdriver.io يتصرف كما لو كانت السيناريوهات وليس الخطوات هي الاختبارات.
    },
    // تحديد مسار tsconfig مخصص - يستخدم WDIO `tsx` لتجميع ملفات TypeScript
    // يتم اكتشاف TSConfig الخاص بك تلقائيًا من دليل العمل الحالي
    // ولكن يمكنك تحديد مسار مخصص هنا أو عن طريق تعيين متغير بيئة TSX_TSCONFIG_PATH
    // راجع وثائق `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // Hooks
    // =====
    // يوفر WebdriverIO العديد من الـ hooks التي يمكنك استخدامها للتدخل في عملية الاختبار لتحسينها
    // وبناء خدمات حولها. يمكنك إما تطبيق وظيفة واحدة عليها أو مصفوفة من
    // الطرق. إذا عاد أحدها بوعد، فسينتظر WebdriverIO حتى يتم حل هذا الوعد
    // للمتابعة.
    //
    /**
     * يتم تنفيذه مرة واحدة قبل إطلاق جميع العمال.
     * @param {object} config كائن تكوين wdio
     * @param {Array.<Object>} capabilities قائمة تفاصيل القدرات
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * يتم تنفيذه قبل إنشاء عملية عامل ويمكن استخدامه لتهيئة خدمة محددة
     * لهذا العامل وكذلك تعديل بيئات التشغيل بطريقة غير متزامنة.
     * @param  {string} cid      معرف القدرة (مثل 0-0)
     * @param  {object} caps     كائن يحتوي على قدرات الجلسة التي سيتم إنشاؤها في العامل
     * @param  {object} specs    المواصفات التي سيتم تشغيلها في عملية العامل
     * @param  {object} args     كائن سيتم دمجه مع التكوين الرئيسي بمجرد تهيئة العامل
     * @param  {object} execArgv قائمة وسيطات السلسلة الممررة إلى عملية العامل
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
     * بمعالجة التكوينات اعتمادًا على القدرة أو المواصفات.
     * @param {object} config كائن تكوين wdio
     * @param {Array.<Object>} capabilities قائمة تفاصيل القدرات
     * @param {Array.<String>} specs قائمة مسارات ملفات المواصفات التي سيتم تشغيلها
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * يتم تنفيذه قبل بدء تنفيذ الاختبار. في هذه النقطة يمكنك الوصول إلى جميع المتغيرات العالمية
     * مثل `browser`. إنه المكان المثالي لتعريف الأوامر المخصصة.
     * @param {Array.<Object>} capabilities قائمة تفاصيل القدرات
     * @param {Array.<String>} specs        قائمة مسارات ملفات المواصفات التي سيتم تشغيلها
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
     * يتم تنفيذ هذا الـ hook _قبل_ كل hook داخل المجموعة.
     * (على سبيل المثال، يتم تشغيل هذا قبل استدعاء `before` و `beforeEach` و `after` و `afterEach` في Mocha). في Cucumber، `context` هو كائن World.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * Hook يتم تنفيذه _بعد_ كل hook داخل المجموعة.
     * (على سبيل المثال، يتم تشغيل هذا بعد استدعاء `before` و `beforeEach` و `after` و `afterEach` في Mocha). في Cucumber، `context` هو كائن World.
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * الوظيفة التي سيتم تنفيذها قبل الاختبار (في Mocha/Jasmine فقط)
     * @param {object} test    كائن الاختبار
     * @param {object} context كائن النطاق الذي تم تنفيذ الاختبار معه
     */
    beforeTest: function (test, context) {
    },
    /**
     * يتم تشغيله قبل تنفيذ أمر WebdriverIO.
     * @param {string} commandName اسم أمر الـ hook
     * @param {Array} args الوسيطات التي سيتلقاها الأمر
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * يتم تشغيله بعد تنفيذ أمر WebdriverIO
     * @param {string} commandName اسم أمر الـ hook
     * @param {Array} args الوسيطات التي سيتلقاها الأمر
     * @param {number} result 0 - نجاح الأمر، 1 - خطأ في الأمر
     * @param {object} error كائن الخطأ، إن وجد
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * الوظيفة التي سيتم تنفيذها بعد الاختبار (في Mocha/Jasmine فقط)
     * @param {object}  test             كائن الاختبار
     * @param {object}  context          كائن النطاق الذي تم تنفيذ الاختبار معه
     * @param {Error}   result.error     كائن الخطأ في حالة فشل الاختبار، وإلا `undefined`
     * @param {*}       result.result    كائن إرجاع وظيفة الاختبار
     * @param {number}  result.duration  مدة الاختبار
     * @param {boolean} result.passed    true إذا نجح الاختبار، وإلا false
     * @param {object}  result.retries   معلومات حول إعادة محاولات المواصفات، مثل `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * Hook يتم تنفيذه بعد انتهاء المجموعة (في Mocha/Jasmine فقط).
     * @param {object} suite تفاصيل المجموعة
     */
    afterSuite: function (suite) {
    },
    /**
     * يتم تنفيذه بعد اكتمال جميع الاختبارات. لا يزال لديك حق الوصول إلى جميع المتغيرات العالمية من
     * الاختبار.
     * @param {number} result 0 - نجاح الاختبار، 1 - فشل الاختبار
     * @param {Array.<Object>} capabilities قائمة تفاصيل القدرات
     * @param {Array.<String>} specs قائمة مسارات ملفات المواصفات التي تم تشغيلها
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * يتم تنفيذه بعد إنهاء جلسة webdriver مباشرة.
     * @param {object} config كائن تكوين wdio
     * @param {Array.<Object>} capabilities قائمة تفاصيل القدرات
     * @param {Array.<String>} specs قائمة مسارات ملفات المواصفات التي تم تشغيلها
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * يتم تنفيذه بعد توقف جميع العمال وعلى وشك الخروج من العملية.
     * سيؤدي الخطأ المطروح في hook `onComplete` إلى فشل تشغيل الاختبار.
     * @param {object} exitCode 0 - نجاح، 1 - فشل
     * @param {object} config كائن تكوين wdio
     * @param {Array.<Object>} capabilities قائمة تفاصيل القدرات
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
     * Cucumber Hooks
     *
     * يتم تشغيله قبل ميزة Cucumber.
     * @param {string}                   uri      مسار إلى ملف الميزة
     * @param {GherkinDocument.IFeature} feature  كائن ميزة Cucumber
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * يتم تشغيله قبل سيناريو Cucumber.
     * @param {ITestCaseHookParameter} world    كائن العالم الذي يحتوي على معلومات حول pickle وخطوة الاختبار
     * @param {object}                 context  كائن Cucumber World
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * يتم تشغيله قبل خطوة Cucumber.
     * @param {Pickle.IPickleStep} step     بيانات الخطوة
     * @param {IPickle}            scenario pickle السيناريو
     * @param {object}             context  كائن Cucumber World
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * يتم تشغيله بعد خطوة Cucumber.
     * @param {Pickle.IPickleStep} step             بيانات الخطوة
     * @param {IPickle}            scenario         pickle السيناريو
     * @param {object}             result           كائن النتائج الذي يحتوي على نتائج السيناريو
     * @param {boolean}            result.passed    true إذا نجح السيناريو
     * @param {string}             result.error     كومة الخطأ إذا فشل السيناريو
     * @param {number}             result.duration  مدة السيناريو بالمللي ثانية
     * @param {object}             context          كائن Cucumber World
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * يتم تشغيله بعد سيناريو Cucumber.
     * @param {ITestCaseHookParameter} world            كائن العالم الذي يحتوي على معلومات حول pickle وخطوة الاختبار
     * @param {object}                 result           كائن النتائج الذي يحتوي على نتائج السيناريو `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    true إذا نجح السيناريو
     * @param {string}                 result.error     كومة الخطأ إذا فشل السيناريو
     * @param {number}                 result.duration  مدة السيناريو بالمللي ثانية
     * @param {object}                 context          كائن Cucumber World
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * يتم تشغيله بعد ميزة Cucumber.
     * @param {string}                   uri      مسار إلى ملف الميزة
     * @param {GherkinDocument.IFeature} feature  كائن ميزة Cucumber
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * يتم تشغيله قبل أن تقوم مكتبة تأكيد WebdriverIO بإجراء تأكيد.
     * @param commandName اسم الأمر
     * @param args        الوسيطات التي سيتلقاها الأمر
     */
    beforeAssertion: function (params) {
    },
    /**
     * يتم تشغيله بعد تنفيذ أمر WebdriverIO
     * @param commandName  اسم الأمر
     * @param args         الوسيطات التي سيتلقاها الأمر
     * @param result       نتيجة الأمر
     * @param error        خطأ في حالة حدوث خطأ ما
     */
    afterAssertion: function (params) {
    }
}
```

يمكنك أيضًا العثور على ملف بجميع الخيارات والتغييرات الممكنة في [مجلد الأمثلة](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js).