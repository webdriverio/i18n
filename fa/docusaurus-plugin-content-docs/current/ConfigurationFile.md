---
id: configurationfile
title: فایل پیکربندی
---

فایل پیکربندی حاوی تمام اطلاعات لازم برای اجرای مجموعه تست شماست. این یک ماژول NodeJS است که یک JSON را صادر می‌کند.

در اینجا یک نمونه پیکربندی با تمام ویژگی‌های پشتیبانی شده و اطلاعات اضافی آمده است:

```js
export const config = {

    // ==================================
    // تست شما کجا باید اجرا شود
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // پیکربندی‌های سرور
    // =====================
    // آدرس میزبان سرور Selenium در حال اجرا. این اطلاعات معمولاً منسوخ است، زیرا
    // WebdriverIO به طور خودکار به localhost متصل می‌شود. همچنین اگر از یکی از
    // سرویس‌های ابری پشتیبانی شده مانند Sauce Labs، Browserstack، Testing Bot یا LambdaTest استفاده می‌کنید،
    // نیازی به تعریف اطلاعات میزبان و پورت ندارید (زیرا WebdriverIO می‌تواند آن را
    // از اطلاعات کاربر و کلید شما تشخیص دهد). با این حال، اگر از یک Selenium
    // خصوصی استفاده می‌کنید، باید `hostname`، `port` و `path` را اینجا تعریف کنید.
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // پروتکل: http | https
    // protocol: 'http',
    //
    // =================
    // ارائه‌دهندگان سرویس
    // =================
    // WebdriverIO از Sauce Labs، Browserstack، Testing Bot و LambdaTest پشتیبانی می‌کند. (سایر ارائه‌دهندگان ابری
    // نیز باید کار کنند.) این سرویس‌ها مقادیر خاص `user` و `key` (یا کلید دسترسی)
    // را تعریف می‌کنند که باید اینجا قرار دهید تا به این سرویس‌ها متصل شوید.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // اگر تست‌های خود را روی Sauce Labs اجرا می‌کنید، می‌توانید منطقه‌ای را که می‌خواهید تست‌های خود را در آن اجرا کنید
    // از طریق ویژگی `region` مشخص کنید. دستگیره‌های کوتاه در دسترس برای مناطق `us` (پیش‌فرض) و `eu` هستند.
    // این مناطق برای VM ابری Sauce Labs و Sauce Labs Real Device Cloud استفاده می‌شوند.
    // اگر منطقه را ارائه ندهید، به طور پیش‌فرض `us` خواهد بود.
    region: 'us',
    //
    // Sauce Labs یک [ارائه بدون سر](https://saucelabs.com/products/web-testing/sauce-headless-testing)
    // را فراهم می‌کند که به شما امکان می‌دهد تست‌های Chrome و Firefox را به صورت بدون سر اجرا کنید.
    //
    headless: false,
    //
    // ==================
    // مشخص کردن فایل‌های تست
    // ==================
    // تعریف کنید کدام مشخصات تست باید اجرا شوند. الگو نسبت به دایرکتوری
    // فایل پیکربندی در حال اجرا نسبی است.
    //
    // مشخصات به عنوان آرایه‌ای از فایل‌های مشخصات تعریف می‌شوند (به صورت اختیاری با استفاده از کاراکترهای وحشی
    // که گسترش خواهند یافت). تست برای هر فایل مشخصات در یک فرآیند کارگر جداگانه اجرا می‌شود. 
    // برای داشتن گروهی از فایل‌های مشخصات که در همان فرآیند کارگر اجرا می‌شوند،
    // آنها را در یک آرایه درون آرایه‌ی مشخصات قرار دهید.
    //
    // مسیر فایل‌های مشخصات نسبت به دایرکتوری فایل پیکربندی حل می‌شود
    // مگر اینکه مطلق باشد.
    //
    specs: [
        'test/spec/**',
        ['group/spec/**']
    ],
    // الگوهایی برای استثنا.
    exclude: [
        'test/spec/multibrowser/**',
        'test/spec/mobile/**'
    ],
    //
    // ============
    // قابلیت‌ها
    // ============
    // قابلیت‌های خود را اینجا تعریف کنید. WebdriverIO می‌تواند چندین قابلیت را همزمان
    // اجرا کند. بسته به تعداد قابلیت‌ها، WebdriverIO چندین جلسه تست را راه‌اندازی می‌کند.
    // در داخل `capabilities` خود، می‌توانید گزینه‌های `spec` و `exclude` را
    // بازنویسی کنید تا مشخصات خاصی را به یک قابلیت خاص گروه‌بندی کنید.
    //
    // ابتدا، می‌توانید تعریف کنید چند نمونه باید همزمان شروع شوند. فرض کنید
    // شما 3 قابلیت مختلف دارید (Chrome، Firefox و Safari) و
    // `maxInstances` را روی 1 تنظیم کرده‌اید. wdio 3 فرآیند را راه‌اندازی می‌کند.
    //
    // بنابراین، اگر 10 فایل مشخصات دارید و `maxInstances` را روی 10 تنظیم کرده‌اید، همه فایل‌های مشخصات
    // همزمان تست می‌شوند و 30 فرآیند راه‌اندازی خواهد شد.
    //
    // این ویژگی مشخص می‌کند چند قابلیت از همان تست باید تست‌ها را اجرا کنند.
    //
    maxInstances: 10,
    //
    // یا یک محدودیت برای اجرای تست‌ها با یک قابلیت خاص تنظیم کنید.
    maxInstancesPerCapability: 10,
    //
    // گلوبال‌های WebdriverIO (مانند `browser`، `$` و `$$`) را در محیط جهانی وارد می‌کند.
    // اگر آن را روی `false` تنظیم کنید، باید از `@wdio/globals` وارد کنید. توجه: WebdriverIO
    // تزریق گلوبال‌های مختص چارچوب تست را مدیریت نمی‌کند.
    //
    injectGlobals: true,
    //
    // اگر در جمع‌آوری همه قابلیت‌های مهم مشکل دارید، پیکربندی پلتفرم Sauce Labs را بررسی کنید -
    // ابزار عالی برای پیکربندی قابلیت‌های شما:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // برای اجرای chrome بدون سر پرچم‌های زیر مورد نیاز است
        // (به https://developers.google.com/web/updates/2017/04/headless-chrome مراجعه کنید)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // پارامتر برای نادیده گرفتن برخی یا همه پرچم‌های پیش‌فرض
        // - اگر مقدار true باشد: همه 'پرچم‌های پیش‌فرض' DevTools و 'آرگومان‌های پیش‌فرض' Puppeteer را نادیده می‌گیرد
        // - اگر مقدار یک آرایه باشد: DevTools آرگومان‌های پیش‌فرض داده شده را فیلتر می‌کند
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstances می‌تواند برای هر قابلیت بازنویسی شود. بنابراین اگر یک شبکه Selenium داخلی
        // با تنها 5 نمونه firefox در دسترس دارید، می‌توانید مطمئن شوید که بیش از
        // 5 نمونه همزمان شروع نمی‌شود.
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // پرچم برای فعال کردن حالت بدون سر Firefox (برای جزئیات بیشتر در مورد moz:firefoxOptions به https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities مراجعه کنید)
          // args: ['-headless']
        },
        // اگر outputDir ارائه شود، WebdriverIO می‌تواند لاگ‌های جلسه درایور را ضبط کند
        // امکان پیکربندی نوع‌های لاگی که باید مستثنی شوند وجود دارد.
        excludeDriverLogs: ['*'], // '*' را برای مستثنی کردن همه لاگ‌های جلسه درایور ارسال کنید
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // پارامتر برای نادیده گرفتن برخی یا همه آرگومان‌های پیش‌فرض Puppeteer
        // ignoreDefaultArgs: ['-foreground'], // مقدار را روی true تنظیم کنید تا همه آرگومان‌های پیش‌فرض را نادیده بگیرید
    }],
    //
    // لیست اضافی آرگومان‌های node برای استفاده هنگام شروع فرآیندهای فرزند
    execArgv: [],
    //
    // ===================
    // پیکربندی‌های تست
    // ===================
    // همه گزینه‌هایی را که برای نمونه WebdriverIO مرتبط هستند اینجا تعریف کنید
    //
    // سطح لاگ‌گذاری: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // تنظیم سطوح لاگ خاص برای هر لاگر
    // از سطح 'silent' برای غیرفعال کردن لاگر استفاده کنید
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // تنظیم دایرکتوری برای ذخیره همه لاگ‌ها
    outputDir: __dirname,
    //
    // اگر فقط می‌خواهید تست‌های خود را تا زمانی که تعداد مشخصی از تست‌ها شکست بخورند اجرا کنید،
    // از bail استفاده کنید (پیش‌فرض 0 است - عدم توقف، اجرای همه تست‌ها).
    bail: 0,
    //
    // یک URL پایه تنظیم کنید تا فراخوانی‌های دستور `url()` را کوتاه کنید. اگر پارامتر `url` شما با
    // `/` شروع می‌شود، `baseUrl` اضافه می‌شود، اما بخش مسیر `baseUrl` شامل نمی‌شود.
    //
    // اگر پارامتر `url` شما بدون یک طرح یا `/` شروع می‌شود (مانند `some/path`)، `baseUrl`
    // مستقیماً اضافه می‌شود.
    baseUrl: 'http://localhost:8080',
    //
    // زمان انتظار پیش‌فرض برای همه دستورات waitForXXX.
    waitforTimeout: 1000,
    //
    // افزودن فایل‌ها برای تماشا (مثلاً کد برنامه یا اشیاء صفحه) هنگام اجرای دستور `wdio`
    // با پرچم `--watch`. الگوسازی پشتیبانی می‌شود.
    filesToWatch: [
        // به عنوان مثال تست‌ها را دوباره اجرا کنید اگر کد برنامه خود را تغییر دهم
        // './app/**/*.js'
    ],
    //
    // چارچوبی که می‌خواهید مشخصات خود را با آن اجرا کنید.
    // موارد زیر پشتیبانی می‌شوند: 'mocha'، 'jasmine' و 'cucumber'
    // همچنین ببینید: https://webdriver.io/docs/frameworks.html
    //
    // قبل از اجرای هر تستی، مطمئن شوید که بسته آداپتور wdio را برای چارچوب خاص نصب کرده‌اید.
    framework: 'mocha',
    //
    // تعداد دفعاتی که کل فایل مشخصات را وقتی به طور کلی شکست می‌خورد، دوباره تلاش می‌کند
    specFileRetries: 1,
    // تأخیر به ثانیه بین تلاش‌های فایل مشخصات
    specFileRetriesDelay: 0,
    // آیا فایل‌های مشخصات تکراری باید فوراً دوباره تلاش شوند یا به انتهای صف موکول شوند
    specFileRetriesDeferred: false,
    //
    // گزارشگر تست برای stdout.
    // تنها موردی که به طور پیش‌فرض پشتیبانی می‌شود 'dot' است
    // همچنین ببینید: https://webdriver.io/docs/dot-reporter.html ، و روی "Reporters" در ستون سمت چپ کلیک کنید
    reporters: [
        'dot',
        ['allure', {
            //
            // اگر از گزارشگر "allure" استفاده می‌کنید، باید دایرکتوری را تعریف کنید که
            // WebdriverIO باید همه گزارش‌های allure را در آن ذخیره کند.
            outputDir: './'
        }]
    ],
    //
    // گزینه‌هایی که باید به Mocha ارسال شوند.
    // لیست کامل را در: http://mochajs.org ببینید
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // گزینه‌هایی که باید به Jasmine ارسال شوند.
    // همچنین ببینید: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // زمان انتظار پیش‌فرض Jasmine
        defaultTimeoutInterval: 5000,
        //
        // چارچوب Jasmine به آن اجازه می‌دهد هر تاییدی را برای ثبت وضعیت برنامه
        // یا وب‌سایت بسته به نتیجه متوقف کند. برای مثال، گرفتن عکس هر زمان
        // که یک تایید شکست می‌خورد بسیار مفید است.
        expectationResultHandler: function(passed, assertion) {
            // کاری انجام دهید
        },
        //
        // استفاده از عملکرد grep مخصوص Jasmine
        grep: null,
        invertGrep: null
    },
    //
    // اگر از Cucumber استفاده می‌کنید، باید مشخص کنید که تعاریف مراحل شما کجا قرار دارند.
    // همچنین ببینید: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (file/dir) قبل از اجرای ویژگی‌ها، فایل‌ها را لازم می‌داند
        backtrace: false,   // <boolean> نمایش کامل backtrace برای خطاها
        compiler: [],       // <string[]> ("extension:module") فایل‌ها را با EXTENSION مشخص شده بعد از نیاز به MODULE لازم می‌داند (قابل تکرار)
        dryRun: false,      // <boolean> فرمت‌کننده‌ها را بدون اجرای مراحل فرا می‌خواند
        failFast: false,    // <boolean> اجرا را در اولین شکست لغو می‌کند
        snippets: true,     // <boolean> تکه‌های تعریف مرحله را برای مراحل در انتظار پنهان می‌کند
        source: true,       // <boolean> URIهای منبع را پنهان می‌کند
        strict: false,      // <boolean> اگر مراحل تعریف نشده یا در انتظار وجود داشته باشد، شکست می‌خورد
        tagExpression: '',  // <string> (عبارت) فقط ویژگی‌ها یا سناریوهایی را اجرا می‌کند که برچسب‌هایشان با عبارت مطابقت دارند
        timeout: 20000,     // <number> زمان انتظار برای تعاریف مرحله
        ignoreUndefinedDefinitions: false, // <boolean> این پیکربندی را فعال کنید تا تعاریف تعریف نشده را به عنوان هشدار در نظر بگیرید.
        scenarioLevelReporter: false // این را فعال کنید تا webdriver.io طوری رفتار کند که گویی سناریوها و نه مراحل، تست‌ها بوده‌اند.
    },
    // مسیر tsconfig سفارشی را مشخص کنید - WDIO از `tsx` برای کامپایل فایل‌های TypeScript استفاده می‌کند
    // TSConfig شما به طور خودکار از دایرکتوری کاری فعلی تشخیص داده می‌شود
    // اما می‌توانید یک مسیر سفارشی را اینجا مشخص کنید یا با تنظیم متغیر محیطی TSX_TSCONFIG_PATH
    // مستندات `tsx` را ببینید: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // هوک‌ها
    // =====
    // WebdriverIO چندین هوک ارائه می‌دهد که می‌توانید از آنها برای مداخله در فرآیند تست استفاده کنید
    // و خدماتی را در اطراف آن ایجاد کنید. می‌توانید یک تابع واحد یا آرایه‌ای از
    // روش‌ها را به آن اعمال کنید. اگر یکی از آنها با یک قول برگردد، WebdriverIO تا زمانی که آن قول
    // حل شود منتظر می‌ماند تا ادامه دهد.
    //
    /**
     * یک بار قبل از راه‌اندازی همه کارگران اجرا می‌شود.
     * @param {object} config شیء پیکربندی wdio
     * @param {Array.<Object>} capabilities لیست جزئیات قابلیت‌ها
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * قبل از اینکه یک فرآیند کارگر راه‌اندازی شود اجرا می‌شود و می‌تواند برای مقداردهی اولیه سرویس خاص
     * برای آن کارگر و همچنین تغییر محیط‌های زمان اجرا به صورت ناهمگام استفاده شود.
     * @param  {string} cid      شناسه قابلیت (مثلاً 0-0)
     * @param  {object} caps     شیء حاوی قابلیت‌ها برای جلسه‌ای که در کارگر راه‌اندازی خواهد شد
     * @param  {object} specs    مشخصاتی که در فرآیند کارگر اجرا می‌شوند
     * @param  {object} args     شیئی که با پیکربندی اصلی ادغام خواهد شد پس از مقداردهی اولیه کارگر
     * @param  {object} execArgv لیست آرگومان‌های رشته‌ای ارسال شده به فرآیند کارگر
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * پس از خروج یک فرآیند کارگر اجرا می‌شود.
     * @param  {string} cid      شناسه قابلیت (مثلاً 0-0)
     * @param  {number} exitCode 0 - موفقیت، 1 - شکست
     * @param  {object} specs    مشخصاتی که در فرآیند کارگر اجرا می‌شوند
     * @param  {number} retries  تعداد تلاش‌های مجدد استفاده شده
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * قبل از مقداردهی اولیه جلسه webdriver و چارچوب تست اجرا می‌شود. به شما اجازه می‌دهد
     * پیکربندی‌ها را بر اساس قابلیت یا مشخصات دستکاری کنید.
     * @param {object} config شیء پیکربندی wdio
     * @param {Array.<Object>} capabilities لیست جزئیات قابلیت‌ها
     * @param {Array.<String>} specs لیست مسیرهای فایل مشخصاتی که باید اجرا شوند
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * قبل از شروع اجرای تست اجرا می‌شود. در این نقطه می‌توانید به همه متغیرهای جهانی
     * مانند `browser` دسترسی داشته باشید. این مکان مناسبی برای تعریف دستورات سفارشی است.
     * @param {Array.<Object>} capabilities لیست جزئیات قابلیت‌ها
     * @param {Array.<String>} specs        لیست مسیرهای فایل مشخصاتی که باید اجرا شوند
     * @param {object}         browser      نمونه‌ای از جلسه مرورگر/دستگاه ایجاد شده
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * قبل از شروع مجموعه تست اجرا می‌شود (فقط در Mocha/Jasmine).
     * @param {object} suite جزئیات مجموعه تست
     */
    beforeSuite: function (suite) {
    },
    /**
     * این هوک _قبل_ از هر هوک درون مجموعه تست اجرا می‌شود.
     * (برای مثال، این قبل از فراخوانی `before`، `beforeEach`، `after`، `afterEach` در Mocha اجرا می‌شود.) در Cucumber، `context` شیء World است.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * هوکی که _بعد_ از هر هوک درون مجموعه تست اجرا می‌شود.
     * (برای مثال، این بعد از فراخوانی `before`، `beforeEach`، `after`، `afterEach` در Mocha اجرا می‌شود.) در Cucumber، `context` شیء World است.
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * تابعی که قبل از یک تست اجرا می‌شود (فقط در Mocha/Jasmine)
     * @param {object} test    شیء تست
     * @param {object} context شیء محدوده‌ای که تست با آن اجرا شده است
     */
    beforeTest: function (test, context) {
    },
    /**
     * قبل از اجرای یک دستور WebdriverIO اجرا می‌شود.
     * @param {string} commandName نام دستور هوک
     * @param {Array} args آرگومان‌هایی که دستور دریافت می‌کند
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * بعد از اجرای یک دستور WebdriverIO اجرا می‌شود
     * @param {string} commandName نام دستور هوک
     * @param {Array} args آرگومان‌هایی که دستور دریافت می‌کند
     * @param {number} result 0 - موفقیت دستور، 1 - خطای دستور
     * @param {object} error شیء خطا، در صورت وجود
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * تابعی که بعد از یک تست اجرا می‌شود (فقط در Mocha/Jasmine)
     * @param {object}  test             شیء تست
     * @param {object}  context          شیء محدوده‌ای که تست با آن اجرا شده است
     * @param {Error}   result.error     شیء خطا در صورت شکست تست، در غیر این صورت `undefined`
     * @param {*}       result.result    شیء برگشتی تابع تست
     * @param {number}  result.duration  مدت زمان تست
     * @param {boolean} result.passed    اگر تست موفق بوده true، در غیر این صورت false
     * @param {object}  result.retries   اطلاعات در مورد تلاش‌های مجدد مرتبط با مشخصات، مثلاً `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * هوکی که بعد از پایان مجموعه تست اجرا می‌شود (فقط در Mocha/Jasmine).
     * @param {object} suite جزئیات مجموعه تست
     */
    afterSuite: function (suite) {
    },
    /**
     * بعد از اتمام همه تست‌ها اجرا می‌شود. شما هنوز به همه متغیرهای جهانی از
     * تست دسترسی دارید.
     * @param {number} result 0 - موفقیت تست، 1 - شکست تست
     * @param {Array.<Object>} capabilities لیست جزئیات قابلیت‌ها
     * @param {Array.<String>} specs لیست مسیرهای فایل مشخصاتی که اجرا شده‌اند
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * بلافاصله بعد از پایان جلسه webdriver اجرا می‌شود.
     * @param {object} config شیء پیکربندی wdio
     * @param {Array.<Object>} capabilities لیست جزئیات قابلیت‌ها
     * @param {Array.<String>} specs لیست مسیرهای فایل مشخصاتی که اجرا شده‌اند
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * بعد از اینکه همه کارگران خاموش شدند و فرآیند در حال خروج است اجرا می‌شود.
     * خطای پرتاب شده در هوک `onComplete` منجر به شکست اجرای تست خواهد شد.
     * @param {object} exitCode 0 - موفقیت، 1 - شکست
     * @param {object} config شیء پیکربندی wdio
     * @param {Array.<Object>} capabilities لیست جزئیات قابلیت‌ها
     * @param {<Object>} results شیء حاوی نتایج تست
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * هنگامی که یک تازه‌سازی اتفاق می‌افتد اجرا می‌شود.
    * @param {string} oldSessionId شناسه جلسه قدیمی
    * @param {string} newSessionId شناسه جلسه جدید
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * هوک‌های Cucumber
     *
     * قبل از یک ویژگی Cucumber اجرا می‌شود.
     * @param {string}                   uri      مسیر به فایل ویژگی
     * @param {GherkinDocument.IFeature} feature  شیء ویژگی Cucumber
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * قبل از یک سناریوی Cucumber اجرا می‌شود.
     * @param {ITestCaseHookParameter} world    شیء جهانی حاوی اطلاعات در مورد pickle و مرحله تست
     * @param {object}                 context  شیء Cucumber World
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * قبل از یک مرحله Cucumber اجرا می‌شود.
     * @param {Pickle.IPickleStep} step     داده‌های مرحله
     * @param {IPickle}            scenario pickle سناریو
     * @param {object}             context  شیء Cucumber World
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * بعد از یک مرحله Cucumber اجرا می‌شود.
     * @param {Pickle.IPickleStep} step             داده‌های مرحله
     * @param {IPickle}            scenario         pickle سناریو
     * @param {object}             result           شیء نتایج حاوی نتایج سناریو
     * @param {boolean}            result.passed    اگر سناریو موفق بوده true
     * @param {string}             result.error     پشته خطا اگر سناریو شکست خورده باشد
     * @param {number}             result.duration  مدت زمان سناریو به میلی‌ثانیه
     * @param {object}             context          شیء Cucumber World
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * بعد از یک سناریوی Cucumber اجرا می‌شود.
     * @param {ITestCaseHookParameter} world            شیء جهانی حاوی اطلاعات در مورد pickle و مرحله تست
     * @param {object}                 result           شیء نتایج حاوی نتایج سناریو `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    اگر سناریو موفق بوده true
     * @param {string}                 result.error     پشته خطا اگر سناریو شکست خورده باشد
     * @param {number}                 result.duration  مدت زمان سناریو به میلی‌ثانیه
     * @param {object}                 context          شیء Cucumber World
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * بعد از یک ویژگی Cucumber اجرا می‌شود.
     * @param {string}                   uri      مسیر به فایل ویژگی
     * @param {GherkinDocument.IFeature} feature  شیء ویژگی Cucumber
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * قبل از اینکه یک کتابخانه تایید WebdriverIO یک تایید انجام دهد اجرا می‌شود.
     * @param commandName نام دستور
     * @param args آرگومان‌هایی که دستور دریافت می‌کند
     */
    beforeAssertion: function (params) {
    },
    /**
     * بعد از اجرای یک دستور WebdriverIO اجرا می‌شود
     * @param commandName نام دستور
     * @param args آرگومان‌هایی که دستور دریافت می‌کند
     * @param result نتیجه دستور
     * @param error خطا در صورت بروز مشکل
     */
    afterAssertion: function (params) {
    }
}
```

شما همچنین می‌توانید فایلی با تمام گزینه‌ها و تغییرات ممکن را در [پوشه مثال](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js) پیدا کنید.