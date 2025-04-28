---
id: configurationfile
title: ملف التكوين
---

يحتوي ملف التكوين على جميع المعلومات الضرورية لتشغيل مجموعة اختباراتك. وهو عبارة عن وحدة NodeJS تقوم بتصدير JSON.

فيما يلي مثال على التكوين مع جميع الخصائص المدعومة ومعلومات إضافية:

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
    // عنوان المضيف لخادم Selenium قيد التشغيل. هذه المعلومات عادة ما تكون قديمة، لأن
    // WebdriverIO يتصل تلقائيًا بـ localhost. أيضًا إذا كنت تستخدم واحدة من
    // الخدمات السحابية المدعومة مثل Sauce Labs أو Browserstack أو Testing Bot أو LambdaTest، فأنت أيضًا لا
    // تحتاج إلى تحديد معلومات المضيف والمنفذ (لأن WebdriverIO يمكنه معرفة ذلك
    // من معلومات المستخدم والمفتاح الخاصة بك). ومع ذلك، إذا كنت تستخدم خلفية Selenium
    // خاصة، فيجب عليك تحديد `hostname` و`port` و`path` هنا.
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
    // يدعم WebdriverIO Sauce Labs و Browserstack و Testing Bot و LambdaTest. (يجب أن تعمل
    // مزودو السحابة الآخرون أيضًا.) تحدد هذه الخدمات قيمًا محددة لـ`user` و`key` (أو مفتاح الوصول)
    // يجب عليك وضعها هنا، لكي تتصل بهذه الخدمات.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // إذا كنت تقوم بتشغيل اختباراتك على Sauce Labs فيمكنك تحديد المنطقة التي تريد تشغيل اختباراتك
    // فيها عبر خاصية `region`. المقابض القصيرة المتاحة للمناطق هي `us` (الافتراضي) و`eu`.
    // تُستخدم هذه المناطق لـ Sauce Labs VM cloud و Sauce Labs Real Device Cloud.
    // إذا لم تقدم المنطقة، فإنها ستكون `us` افتراضيًا.
    region: 'us',
    //
    // توفر Sauce Labs [عرضًا بلا رأس](https://saucelabs.com/products/web-testing/sauce-headless-testing)
    // يسمح لك بتشغيل اختبارات Chrome و Firefox بدون رأس.
    //
    headless: false,
    //
    // ==================
    // تحديد ملفات الاختبار
    // ==================
    // حدد أي مواصفات اختبار يجب تشغيلها. النمط نسبي إلى الدليل
    // لملف التكوين الذي يتم تشغيله.
    //
    // يتم تعريف المواصفات كمصفوفة من ملفات المواصفات (اختياريًا باستخدام أحرف البدل
    // التي سيتم توسيعها). سيتم تشغيل الاختبار لكل ملف مواصفات في عملية
    // عامل منفصلة. لكي يكون لديك مجموعة من ملفات المواصفات تعمل في نفس عملية
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
    // الوقت. اعتمادًا على عدد القدرات، يُطلق WebdriverIO العديد من جلسات الاختبار.
    // ضمن `capabilities` الخاصة بك، يمكنك تجاوز خيارات `spec` و`exclude`
    // من أجل تجميع مواصفات محددة لقدرة محددة.
    //
    // أولاً، يمكنك تحديد عدد الحالات التي يجب بدؤها في نفس الوقت. لنقل
    // أن لديك 3 قدرات مختلفة (Chrome وFirefox وSafari) وقمت بتعيين
    // `maxInstances` إلى 1. سيقوم wdio بإطلاق 3 عمليات.
    //
    // لذلك، إذا كان لديك 10 ملفات مواصفات وقمت بتعيين `maxInstances` إلى 10، فستتم اختبار جميع ملفات المواصفات
    // في نفس الوقت وسيتم إطلاق 30 عملية.
    //
    // تتعامل الخاصية مع عدد القدرات من نفس الاختبار التي يجب أن تقوم بتشغيل الاختبارات.
    //
    maxInstances: 10,
    //
    // أو قم بتعيين حد لتشغيل الاختبارات بقدرة محددة.
    maxInstancesPerCapability: 10,
    //
    // يُدخل المتغيرات العالمية لـ WebdriverIO (مثل `browser` و`$` و`$$`) في البيئة العالمية.
    // إذا قمت بتعيينها إلى `false`، فيجب عليك الاستيراد من `@wdio/globals`. ملاحظة: لا يقوم WebdriverIO بـ
    // التعامل مع حقن المتغيرات العالمية الخاصة بإطار الاختبار.
    //
    injectGlobals: true,
    //
    // إذا كنت تواجه مشكلة في جمع كل القدرات المهمة معًا، فتحقق من
    // أداة تكوين منصة Sauce Labs - أداة رائعة لتكوين قدراتك:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // لتشغيل chrome بدون رأس، تكون الأعلام التالية مطلوبة
        // (انظر https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // معلمة لتجاهل بعض أو كل الأعلام الافتراضية
        // - إذا كانت القيمة true: تجاهل كل أعلام DevTools 'الافتراضية' ووسائط Puppeteer 'الافتراضية'
        // - إذا كانت القيمة مصفوفة: تقوم DevTools بتصفية الوسائط الافتراضية المعطاة
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // يمكن أن يتم تجاوز maxInstances لكل قدرة. لذلك إذا كان لديك شبكة Selenium داخلية
        // مع 5 حالات firefox فقط متاحة، يمكنك التأكد من عدم بدء أكثر من
        // 5 حالات في وقت واحد.
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // علامة لتنشيط وضع Firefox بدون رأس (انظر https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities لمزيد من التفاصيل حول moz:firefoxOptions)
          // args: ['-headless']
        },
        // إذا تم توفير outputDir، يمكن لـ WebdriverIO التقاط سجلات جلسة السائق
        // من الممكن تكوين أنواع السجلات التي يتم استبعادها.
        excludeDriverLogs: ['*'], // قم بتمرير '*' لاستبعاد جميع سجلات جلسة السائق
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // معلمة لتجاهل بعض أو كل وسائط Puppeteer الافتراضية
        // ignoreDefaultArgs: ['-foreground'], // قم بتعيين القيمة إلى true لتجاهل جميع الوسائط الافتراضية
    }],
    //
    // قائمة إضافية من وسائط node لاستخدامها عند بدء العمليات الفرعية
    execArgv: [],
    //
    // ===================
    // تكوينات الاختبار
    // ===================
    // تحديد جميع الخيارات ذات الصلة بحالة WebdriverIO هنا
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
    // إذا كنت تريد فقط تشغيل اختباراتك حتى فشل عدد معين من الاختبارات، استخدم
    // bail (الافتراضي هو 0 - لا تتوقف، قم بتشغيل جميع الاختبارات).
    bail: 0,
    //
    // قم بتعيين عنوان URL أساسي لتقصير استدعاءات أمر `url()`. إذا بدأت معلمة `url` الخاصة بك
    // بـ `/`، يتم إلحاق `baseUrl`، باستثناء جزء المسار من `baseUrl`.
    //
    // إذا بدأت معلمة `url` الخاصة بك بدون مخطط أو `/` (مثل `some/path`)، يتم
    // إلحاق `baseUrl` مباشرة.
    baseUrl: 'http://localhost:8080',
    //
    // المهلة الافتراضية لجميع أوامر waitForXXX.
    waitforTimeout: 1000,
    //
    // إضافة ملفات للمراقبة (مثل رمز التطبيق أو كائنات الصفحة) عند تشغيل أمر `wdio`
    // مع علامة `--watch`. يتم دعم التوسيع.
    filesToWatch: [
        // على سبيل المثال، إعادة تشغيل الاختبارات إذا قمت بتغيير رمز التطبيق الخاص بي
        // './app/**/*.js'
    ],
    //
    // الإطار الذي تريد تشغيل المواصفات الخاصة بك معه.
    // الإطارات المدعومة هي: 'mocha' و'jasmine' و'cucumber'
    // انظر أيضًا: https://webdriver.io/docs/frameworks.html
    //
    // تأكد من تثبيت حزمة محول wdio للإطار المحدد قبل تشغيل أي اختبارات.
    framework: 'mocha',
    //
    // عدد المرات التي يتم فيها إعادة محاولة ملف المواصفات بأكمله عندما يفشل ككل
    specFileRetries: 1,
    // التأخير بالثواني بين محاولات إعادة ملف المواصفات
    specFileRetriesDelay: 0,
    // ما إذا كان يجب إعادة محاولة ملفات المواصفات المعاد تشغيلها على الفور أو تأجيلها إلى نهاية الطابور
    specFileRetriesDeferred: false,
    //
    // مراسل الاختبار لـ stdout.
    // الوحيد المدعوم افتراضيًا هو 'dot'
    // انظر أيضًا: https://webdriver.io/docs/dot-reporter.html ، وانقر على "Reporters" في العمود الأيسر
    reporters: [
        'dot',
        ['allure', {
            //
            // إذا كنت تستخدم مراسل "allure"، يجب عليك تحديد الدليل حيث
            // يجب أن يحفظ WebdriverIO جميع تقارير allure.
            outputDir: './'
        }]
    ],
    //
    // الخيارات التي يتم تمريرها إلى Mocha.
    // راجع القائمة الكاملة على: http://mochajs.org
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // الخيارات التي يتم تمريرها إلى Jasmine.
    // انظر أيضًا: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // المهلة الافتراضية لـ Jasmine
        defaultTimeoutInterval: 5000,
        //
        // يسمح إطار عمل Jasmine باعتراض كل تأكيد من أجل تسجيل حالة التطبيق
        // أو موقع الويب اعتمادًا على النتيجة. على سبيل المثال، من المفيد جدًا التقاط لقطة شاشة في كل مرة
        // يفشل فيها تأكيد.
        expectationResultHandler: function(passed, assertion) {
            // افعل شيئًا
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
        require: [],        // <string[]> (file/dir) طلب الملفات قبل تنفيذ الميزات
        backtrace: false,   // <boolean> إظهار تتبع كامل للأخطاء
        compiler: [],       // <string[]> ("extension:module") طلب الملفات ذات الامتداد المعطى بعد طلب MODULE (قابل للتكرار)
        dryRun: false,      // <boolean> استدعاء المنسقين دون تنفيذ الخطوات
        failFast: false,    // <boolean> إلغاء التشغيل عند حدوث الفشل الأول
        snippets: true,     // <boolean> إخفاء مقتطفات تعريف الخطوة للخطوات المعلقة
        source: true,       // <boolean> إخفاء عناوين URI المصدر
        strict: false,      // <boolean> الفشل إذا كانت هناك أي خطوات غير معرفة أو معلقة
        tagExpression: '',  // <string> (expression) تنفيذ الميزات أو السيناريوهات فقط مع العلامات التي تطابق التعبير
        timeout: 20000,     // <number> المهلة لتعريفات الخطوة
        ignoreUndefinedDefinitions: false, // <boolean> تمكين هذا التكوين لمعاملة التعريفات غير المحددة كتحذيرات.
        scenarioLevelReporter: false // تمكين هذا لجعل webdriver.io يتصرف كما لو كانت السيناريوهات وليس الخطوات هي الاختبارات.
    },
    // تحديد مسار tsconfig مخصص - يستخدم WDIO `tsx` لتجميع ملفات TypeScript
    // يتم اكتشاف TSConfig الخاص بك تلقائيًا من دليل العمل الحالي
    // ولكن يمكنك تحديد مسار مخصص هنا أو عن طريق تعيين متغير البيئة TSX_TSCONFIG_PATH
    // راجع وثائق `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // الخطافات
    // =====
    // يوفر WebdriverIO العديد من الخطافات التي يمكنك استخدامها للتدخل في عملية الاختبار من أجل تحسينها
    // وبناء خدمات حولها. يمكنك إما تطبيق وظيفة واحدة عليها أو مجموعة من
    // الطرق. إذا عاد أحدهم بوعد، فسينتظر WebdriverIO حتى يتم حل هذا الوعد
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
     * @param  {object} execArgv قائمة وسائط السلسلة الممررة إلى عملية العامل
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
     * يتم تنفيذه قبل بدء تنفيذ الاختبار. في هذه النقطة يمكنك الوصول إلى جميع المتغيرات العالمية
     * مثل `browser`. إنه المكان المثالي لتعريف الأوامر المخصصة.
     * @param {Array.<Object>} capabilities قائمة بتفاصيل القدرات
     * @param {Array.<String>} specs        قائمة بمسارات ملفات المواصفات التي سيتم تشغيلها
     * @param {object}         browser      حالة من جلسة المتصفح/الجهاز التي تم إنشاؤها
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
     * (على سبيل المثال، يتم تشغيل هذا قبل استدعاء `before` و`beforeEach` و`after` و`afterEach` في Mocha.). في Cucumber، `context` هو كائن World.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * خطاف يتم تنفيذه _بعد_ كل خطاف داخل المجموعة ينتهي.
     * (على سبيل المثال، يتم تشغيل هذا بعد استدعاء `before` و`beforeEach` و`after` و`afterEach` في Mocha.). في Cucumber، `context` هو كائن World.
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * وظيفة يتم تنفيذها قبل الاختبار (في Mocha/Jasmine فقط)
     * @param {object} test    كائن الاختبار
     * @param {object} context كائن النطاق الذي تم تنفيذ الاختبار به
     */
    beforeTest: function (test, context) {
    },
    /**
     * يتم تشغيله قبل تنفيذ أمر WebdriverIO.
     * @param {string} commandName اسم أمر الخطاف
     * @param {Array} args وسائط التي سيتلقاها الأمر
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * يتم تشغيله بعد تنفيذ أمر WebdriverIO
     * @param {string} commandName اسم أمر الخطاف
     * @param {Array} args وسائط التي سيتلقاها الأمر
     * @param {number} result 0 - نجاح الأمر، 1 - خطأ في الأمر
     * @param {object} error كائن الخطأ، إن وجد
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
     * يتم تنفيذه بعد اكتمال جميع الاختبارات. لا يزال لديك إمكانية الوصول إلى جميع المتغيرات العالمية من
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
     * يتم تنفيذه بعد أن يتم إيقاف تشغيل جميع العمال وتوشك العملية على الخروج.
     * سيؤدي الخطأ المُلقى في خطاف `onComplete` إلى فشل تشغيل الاختبار.
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
     * يتم التشغيل قبل ميزة Cucumber.
     * @param {string}                   uri      المسار إلى ملف الميزة
     * @param {GherkinDocument.IFeature} feature  كائن ميزة Cucumber
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * يتم التشغيل قبل سيناريو Cucumber.
     * @param {ITestCaseHookParameter} world    كائن world يحتوي على معلومات حول pickle وخطوة الاختبار
     * @param {object}                 context  كائن Cucumber World
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * يتم التشغيل قبل خطوة Cucumber.
     * @param {Pickle.IPickleStep} step     بيانات الخطوة
     * @param {IPickle}            scenario pickle السيناريو
     * @param {object}             context  كائن Cucumber World
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * يتم التشغيل بعد خطوة Cucumber.
     * @param {Pickle.IPickleStep} step             بيانات الخطوة
     * @param {IPickle}            scenario         pickle السيناريو
     * @param {object}             result           كائن النتائج الذي يحتوي على نتائج السيناريو
     * @param {boolean}            result.passed    صحيح إذا نجح السيناريو
     * @param {string}             result.error     مكدس الخطأ إذا فشل السيناريو
     * @param {number}             result.duration  مدة السيناريو بالميلي ثانية
     * @param {object}             context          كائن Cucumber World
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * يتم التشغيل بعد سيناريو Cucumber.
     * @param {ITestCaseHookParameter} world            كائن world يحتوي على معلومات حول pickle وخطوة الاختبار
     * @param {object}                 result           كائن النتائج الذي يحتوي على نتائج السيناريو `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    صحيح إذا نجح السيناريو
     * @param {string}                 result.error     مكدس الخطأ إذا فشل السيناريو
     * @param {number}                 result.duration  مدة السيناريو بالميلي ثانية
     * @param {object}                 context          كائن Cucumber World
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * يتم التشغيل بعد ميزة Cucumber.
     * @param {string}                   uri      المسار إلى ملف الميزة
     * @param {GherkinDocument.IFeature} feature  كائن ميزة Cucumber
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * يتم تشغيله قبل أن تقوم مكتبة تأكيد WebdriverIO بإجراء تأكيد.
     * @param commandName اسم الأمر
     * @param args        وسائط التي سيتلقاها الأمر
     */
    beforeAssertion: function (params) {
    },
    /**
     * يتم تشغيله بعد تنفيذ أمر WebdriverIO
     * @param commandName  اسم الأمر
     * @param args         وسائط التي سيتلقاها الأمر
     * @param result       نتيجة الأمر
     * @param error        خطأ في حالة حدوث خطأ ما
     */
    afterAssertion: function (params) {
    }
}
```

يمكنك أيضًا العثور على ملف به جميع الخيارات والتغييرات الممكنة في [مجلد الأمثلة](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js).