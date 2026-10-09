---
id: configurationfile
title: فایل پیکربندی
description: "یک نمونه wdio.conf.js همراه با توضیحات را مرور کنید که تمام گزینه‌های testrunner، قابلیت‌ها (capabilities) و هوک‌های پشتیبانی‌شده را فهرست می‌کند."
---

فایل پیکربندی شامل تمام اطلاعات لازم برای اجرای مجموعه تست شماست. این فایل یک ماژول NodeJS است که یک JSON را export می‌کند.

در اینجا یک نمونه پیکربندی با تمام ویژگی‌های پشتیبانی‌شده و اطلاعات تکمیلی آمده است:

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
    // آدرس میزبان سرور Selenium در حال اجرا. این اطلاعات معمولاً غیرضروری است، زیرا
    // WebdriverIO به‌طور خودکار به localhost متصل می‌شود. همچنین اگر از یکی از
    // سرویس‌های ابری پشتیبانی‌شده مانند Sauce Labs، Browserstack، Testing Bot یا TestMu AI (قبلاً LambdaTest) استفاده می‌کنید، نیازی
    // به تعریف اطلاعات host و port ندارید (زیرا WebdriverIO می‌تواند آن را از
    // اطلاعات user و key شما تشخیص دهد). با این حال، اگر از یک بک‌اند خصوصی Selenium
    // استفاده می‌کنید، باید `hostname`، `port` و `path` را در اینجا تعریف کنید.
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
    // WebdriverIO از Sauce Labs، Browserstack، Testing Bot و TestMu AI (قبلاً LambdaTest) پشتیبانی می‌کند. (سایر ارائه‌دهندگان ابری
    // نیز باید کار کنند.) این سرویس‌ها مقادیر مشخص `user` و `key` (یا access key) را تعریف می‌کنند
    // که برای اتصال به این سرویس‌ها باید آن‌ها را در اینجا قرار دهید.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // اگر تست‌های خود را روی Sauce Labs اجرا می‌کنید، می‌توانید منطقه‌ای را که می‌خواهید تست‌ها در آن اجرا شوند
    // از طریق ویژگی `region` مشخص کنید. شناسه‌های کوتاه موجود برای مناطق `us` (پیش‌فرض) و `eu` هستند.
    // این مناطق برای ابر VM در Sauce Labs و ابر دستگاه‌های واقعی Sauce Labs استفاده می‌شوند.
    // اگر منطقه را مشخص نکنید، به‌طور پیش‌فرض `us` در نظر گرفته می‌شود.
    region: 'us',
    //
    // Sauce Labs یک [سرویس headless](https://saucelabs.com/products/web-testing/sauce-headless-testing) ارائه می‌دهد
    // که به شما امکان می‌دهد تست‌های Chrome و Firefox را به‌صورت headless اجرا کنید.
    //
    headless: false,
    //
    // ==================
    // مشخص کردن فایل‌های تست
    // ==================
    // مشخص کنید کدام spec های تست باید اجرا شوند. الگو نسبت به دایرکتوری
    // فایل پیکربندی در حال اجرا است.
    //
    // spec ها به‌صورت آرایه‌ای از فایل‌های spec تعریف می‌شوند (به‌صورت اختیاری با استفاده از wildcard ها
    // که گسترش داده می‌شوند). تست هر فایل spec در یک فرایند worker جداگانه
    // اجرا می‌شود. برای اینکه گروهی از فایل‌های spec در یک فرایند worker یکسان اجرا شوند،
    // آن‌ها را درون یک آرایه در داخل آرایه specs قرار دهید.
    //
    // مسیر فایل‌های spec نسبت به دایرکتوری
    // فایل پیکربندی تعیین می‌شود، مگر اینکه مطلق باشد.
    //
    specs: [
        'test/spec/**',
        ['group/spec/**']
    ],
    // الگوهایی که باید مستثنا شوند.
    exclude: [
        'test/spec/multibrowser/**',
        'test/spec/mobile/**'
    ],
    //
    // ============
    // قابلیت‌ها (Capabilities)
    // ============
    // قابلیت‌های خود را در اینجا تعریف کنید. WebdriverIO می‌تواند چندین capability را به‌طور همزمان
    // اجرا کند. بسته به تعداد capability ها، WebdriverIO چندین نشست تست
    // راه‌اندازی می‌کند. درون `capabilities` خود، می‌توانید با `wdio:specs` و `wdio:exclude`
    // مشخص کنید کدام فایل‌ها اجرا شوند تا spec های خاصی را به یک capability خاص اختصاص دهید.
    //
    // ابتدا می‌توانید تعیین کنید چند نمونه باید به‌طور همزمان شروع شوند. فرض کنید
    // ۳ capability مختلف (Chrome، Firefox و Safari) دارید و
    // `maxInstances` را روی ۱ تنظیم کرده‌اید. wdio سه فرایند ایجاد می‌کند.
    //
    // بنابراین، اگر ۱۰ فایل spec داشته باشید و `maxInstances` را روی ۱۰ تنظیم کنید، تمام فایل‌های spec
    // به‌طور همزمان تست می‌شوند و ۳۰ فرایند ایجاد خواهد شد.
    //
    // این ویژگی تعیین می‌کند که چند capability از یک تست یکسان باید تست‌ها را اجرا کنند.
    //
    maxInstances: 10,
    //
    // یا برای اجرای تست‌ها با یک capability خاص محدودیت تعیین کنید.
    maxInstancesPerCapability: 10,
    //
    // متغیرهای سراسری WebdriverIO (مثلاً `browser`، `$` و `$$`) را در محیط سراسری درج می‌کند.
    // اگر روی `false` تنظیم کنید، باید آن‌ها را از `@wdio/globals` ایمپورت کنید. توجه: WebdriverIO
    // تزریق متغیرهای سراسری مخصوص فریم‌ورک تست را مدیریت نمی‌کند.
    //
    injectGlobals: true,
    //
    // اگر در کنار هم قرار دادن تمام capability های مهم مشکل دارید،
    // پیکربندی‌کننده پلتفرم Sauce Labs را بررسی کنید - ابزاری عالی برای پیکربندی capability های شما:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // برای اجرای chrome به‌صورت headless، فلگ‌های زیر لازم هستند
        // (به https://developers.google.com/web/updates/2017/04/headless-chrome مراجعه کنید)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // پارامتری برای نادیده گرفتن برخی یا همه فلگ‌های پیش‌فرض
        // - اگر مقدار true باشد: تمام 'default flags' در DevTools و 'default arguments' در Puppeteer نادیده گرفته می‌شوند
        // - اگر مقدار یک آرایه باشد: DevTools آرگومان‌های پیش‌فرض داده‌شده را فیلتر می‌کند
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstances را می‌توان برای هر capability بازنویسی کرد. بنابراین اگر یک Selenium grid داخلی
        // دارید که تنها ۵ نمونه firefox در آن موجود است، می‌توانید مطمئن شوید که بیش از
        // ۵ نمونه به‌طور همزمان شروع نمی‌شوند.
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // فلگ برای فعال‌سازی حالت headless در Firefox (برای جزئیات بیشتر درباره moz:firefoxOptions به https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities مراجعه کنید)
          // args: ['-headless']
        },
        // اگر outputDir ارائه شود، WebdriverIO می‌تواند لاگ‌های نشست درایور را ثبت کند
        // امکان پیکربندی اینکه کدام logType ها مستثنا شوند وجود دارد.
        // excludeDriverLogs: ['*'], // برای مستثنا کردن تمام لاگ‌های نشست درایور '*' را ارسال کنید
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // پارامتری برای نادیده گرفتن برخی یا همه آرگومان‌های پیش‌فرض Puppeteer
        // ignoreDefaultArgs: ['-foreground'], // برای نادیده گرفتن تمام آرگومان‌های پیش‌فرض، مقدار را true قرار دهید
    }],
    //
    // فهرست اضافی از آرگومان‌های node برای استفاده هنگام شروع فرایندهای فرزند
    execArgv: [],
    //
    // ===================
    // پیکربندی‌های تست
    // ===================
    // تمام گزینه‌های مرتبط با نمونه WebdriverIO را در اینجا تعریف کنید
    //
    // سطح جزئیات لاگ: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // تنظیم سطوح لاگ مشخص برای هر logger
    // برای غیرفعال کردن logger از سطح 'silent' استفاده کنید
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // تنظیم دایرکتوری برای ذخیره تمام لاگ‌ها
    outputDir: __dirname,
    //
    // اگر فقط می‌خواهید تست‌ها را تا زمانی اجرا کنید که تعداد مشخصی از تست‌ها شکست بخورند، از
    // bail استفاده کنید (پیش‌فرض ۰ است - bail نکن، همه تست‌ها را اجرا کن).
    bail: 0,
    //
    // یک URL پایه تنظیم کنید تا فراخوانی‌های دستور `url()` کوتاه‌تر شوند. اگر پارامتر `url` شما
    // با `/` شروع شود، `baseUrl` به ابتدای آن اضافه می‌شود، بدون در نظر گرفتن بخش مسیر `baseUrl`.
    //
    // اگر پارامتر `url` شما بدون scheme یا `/` شروع شود (مانند `some/path`)، `baseUrl`
    // مستقیماً به ابتدای آن اضافه می‌شود.
    baseUrl: 'http://localhost:8080',
    //
    // مهلت زمانی پیش‌فرض برای تمام دستورات waitForXXX.
    waitforTimeout: 1000,
    //
    // فایل‌هایی را برای نظارت اضافه کنید (مثلاً کد برنامه یا page object ها) هنگام اجرای دستور `wdio`
    // با فلگ `--watch`. استفاده از الگوهای glob پشتیبانی می‌شود.
    filesToWatch: [
        // مثلاً اگر کد برنامه‌ام را تغییر دادم، تست‌ها دوباره اجرا شوند
        // './app/**/*.js'
    ],
    //
    // فریم‌ورکی که می‌خواهید spec های خود را با آن اجرا کنید.
    // موارد زیر پشتیبانی می‌شوند: 'mocha'، 'jasmine' و 'cucumber'
    // همچنین ببینید: https://webdriver.io/docs/frameworks.html
    //
    // قبل از اجرای هر تستی، مطمئن شوید که بسته آداپتور wdio برای فریم‌ورک مورد نظر را نصب کرده‌اید.
    framework: 'mocha',
    //
    // تعداد دفعاتی که کل فایل spec در صورت شکست کامل آن دوباره اجرا شود
    specFileRetries: 1,
    // تأخیر بر حسب ثانیه بین تلاش‌های مجدد فایل spec
    specFileRetriesDelay: 0,
    // آیا فایل‌های spec که دوباره اجرا می‌شوند باید بلافاصله اجرا شوند یا به انتهای صف منتقل شوند
    specFileRetriesDeferred: false,
    //
    // گزارشگر تست برای stdout.
    // تنها گزارشگری که به‌طور پیش‌فرض پشتیبانی می‌شود 'dot' است
    // همچنین ببینید: https://webdriver.io/docs/dot-reporter.html ، و روی "Reporters" در ستون سمت چپ کلیک کنید
    reporters: [
        'dot',
        ['allure', {
            //
            // اگر از گزارشگر "allure" استفاده می‌کنید، باید دایرکتوری‌ای را تعریف کنید که
            // WebdriverIO تمام گزارش‌های allure را در آن ذخیره کند.
            outputDir: './'
        }]
    ],
    //
    // گزینه‌هایی که باید به Mocha ارسال شوند.
    // فهرست کامل را در اینجا ببینید: http://mochajs.org
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // گزینه‌هایی که باید به Jasmine ارسال شوند.
    // همچنین ببینید: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // مهلت زمانی پیش‌فرض Jasmine
        defaultTimeoutInterval: 5000,
        //
        // فریم‌ورک Jasmine امکان رهگیری هر assertion را فراهم می‌کند تا وضعیت برنامه
        // یا وب‌سایت را بسته به نتیجه ثبت کنید. به‌عنوان مثال، گرفتن اسکرین‌شات در هر بار
        // شکست یک assertion بسیار کاربردی است.
        expectationResultHandler: function(passed, assertion) {
            // کاری انجام دهید
        },
        //
        // استفاده از قابلیت grep مخصوص Jasmine
        grep: null,
        invertGrep: null
    },
    //
    // اگر از Cucumber استفاده می‌کنید، باید مشخص کنید step definition های شما کجا قرار دارند.
    // همچنین ببینید: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (file/dir) فایل‌ها را قبل از اجرای feature ها require می‌کند
        backtrace: false,   // <boolean> نمایش backtrace کامل برای خطاها
        compiler: [],       // <string[]> ("extension:module") فایل‌هایی با EXTENSION داده‌شده را پس از require کردن MODULE، require می‌کند (قابل تکرار)
        dryRun: false,      // <boolean> فراخوانی formatter ها بدون اجرای step ها
        failFast: false,    // <boolean> توقف اجرا در اولین شکست
        snippets: true,     // <boolean> پنهان کردن قطعه‌کدهای step definition برای step های در انتظار
        source: true,       // <boolean> پنهان کردن URI های منبع
        strict: false,      // <boolean> شکست در صورت وجود هرگونه step تعریف‌نشده یا در انتظار
        tags: '',           // <string> (expression) فقط feature ها یا scenario هایی را اجرا کن که tag های آن‌ها با عبارت مطابقت دارد
        timeout: 20000,     // <number> مهلت زمانی برای step definition ها
        ignoreUndefinedDefinitions: false, // <boolean> این تنظیم را فعال کنید تا تعریف‌های undefined به‌عنوان هشدار در نظر گرفته شوند.
        scenarioLevelReporter: false // این را فعال کنید تا webdriver.io طوری رفتار کند که گویی scenario ها، و نه step ها، تست‌ها هستند.
    },
    // یک مسیر سفارشی برای tsconfig مشخص کنید - WDIO برای کامپایل فایل‌های TypeScript از `tsx` استفاده می‌کند
    // TSConfig شما به‌طور خودکار از دایرکتوری کاری فعلی تشخیص داده می‌شود
    // اما می‌توانید یک مسیر سفارشی را در اینجا یا با تنظیم متغیر محیطی TSX_TSCONFIG_PATH مشخص کنید
    // مستندات `tsx` را ببینید: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // توجه: این تنظیم توسط متغیر محیطی TSX_TSCONFIG_PATH و/یا آرگومان cli --tsConfigPath در صورت مشخص شدن، بازنویسی می‌شود.
    // این تنظیم در صورتی نادیده گرفته می‌شود که node نتواند فایل wdio.conf.ts شما را بدون کمک tsx تجزیه کند، مثلاً اگر
    // path alias هایی در tsconfig.json تنظیم کرده باشید و از آن path alias ها در فایل wdio.config.ts خود استفاده کنید.
    // فقط در صورتی از این استفاده کنید که از یک فایل پیکربندی .js استفاده می‌کنید یا فایل پیکربندی .ts شما JavaScript معتبر است.
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // هوک‌ها (Hooks)
    // =====
    // WebdriverIO چندین هوک ارائه می‌دهد که می‌توانید از آن‌ها برای مداخله در فرایند تست استفاده کنید تا
    // آن را بهبود دهید و سرویس‌هایی پیرامون آن بسازید. می‌توانید یک تابع واحد یا آرایه‌ای از
    // متدها را به آن اعمال کنید. اگر یکی از آن‌ها یک promise برگرداند، WebdriverIO منتظر می‌ماند تا آن promise
    // resolve شود و سپس ادامه می‌دهد.
    //
    /**
     * یک بار قبل از راه‌اندازی همه worker ها اجرا می‌شود.
     * @param {object} config شیء پیکربندی wdio
     * @param {Array.<Object>} capabilities فهرست جزئیات capability ها
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * قبل از ایجاد یک فرایند worker اجرا می‌شود و می‌توان از آن برای مقداردهی اولیه سرویس خاص
     * برای آن worker و همچنین تغییر محیط‌های اجرایی به‌صورت async استفاده کرد.
     * @param  {string} cid      شناسه capability (مثلاً 0-0)
     * @param  {object} caps     شیء حاوی capability ها برای نشستی که در worker ایجاد خواهد شد
     * @param  {object} specs    spec هایی که باید در فرایند worker اجرا شوند
     * @param  {object} args     شیئی که پس از مقداردهی اولیه worker با پیکربندی اصلی ادغام می‌شود
     * @param  {object} execArgv فهرست آرگومان‌های رشته‌ای ارسال‌شده به فرایند worker
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * پس از خروج یک فرایند worker اجرا می‌شود.
     * @param  {string} cid      شناسه capability (مثلاً 0-0)
     * @param  {number} exitCode 0 - موفقیت، 1 - شکست
     * @param  {object} specs    spec هایی که باید در فرایند worker اجرا شوند
     * @param  {number} retries  تعداد تلاش‌های مجدد استفاده‌شده
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * قبل از مقداردهی اولیه نشست webdriver و فریم‌ورک تست اجرا می‌شود. این امکان را به شما می‌دهد
     * که پیکربندی‌ها را بسته به capability یا spec تغییر دهید.
     * @param {object} config شیء پیکربندی wdio
     * @param {Array.<Object>} capabilities فهرست جزئیات capability ها
     * @param {Array.<String>} specs فهرست مسیرهای فایل‌های spec که باید اجرا شوند
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * قبل از شروع اجرای تست اجرا می‌شود. در این نقطه می‌توانید به تمام متغیرهای
     * سراسری مانند `browser` دسترسی داشته باشید. اینجا بهترین مکان برای تعریف دستورات سفارشی است.
     * @param {Array.<Object>} capabilities فهرست جزئیات capability ها
     * @param {Array.<String>} specs        فهرست مسیرهای فایل‌های spec که باید اجرا شوند
     * @param {object}         browser      نمونه نشست browser/device ایجادشده
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * قبل از شروع suite اجرا می‌شود (فقط در Mocha/Jasmine).
     * @param {object} suite جزئیات suite
     */
    beforeSuite: function (suite) {
    },
    /**
     * این هوک _قبل_ از شروع هر هوک درون suite اجرا می‌شود.
     * (به‌عنوان مثال، این قبل از فراخوانی `before`، `beforeEach`، `after`، `afterEach` در Mocha اجرا می‌شود.). در Cucumber، `context` همان شیء World است.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * هوکی که _پس_ از پایان هر هوک درون suite اجرا می‌شود.
     * (به‌عنوان مثال، این پس از فراخوانی `before`، `beforeEach`، `after`، `afterEach` در Mocha اجرا می‌شود.). در Cucumber، `context` همان شیء World است.
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * تابعی که قبل از یک تست اجرا می‌شود (فقط در Mocha/Jasmine)
     * @param {object} test    شیء تست
     * @param {object} context شیء scope که تست با آن اجرا شده است
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
     * پس از اجرای یک دستور WebdriverIO اجرا می‌شود
     * @param {string} commandName نام دستور هوک
     * @param {Array} args آرگومان‌هایی که دستور دریافت می‌کند
     * @param {*} result نتیجه دستور
     * @param {Error} error شیء خطا، در صورت وجود
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * تابعی که پس از یک تست اجرا می‌شود (فقط در Mocha/Jasmine)
     * @param {object}  test             شیء تست
     * @param {object}  context          شیء scope که تست با آن اجرا شده است
     * @param {Error}   result.error     شیء خطا در صورت شکست تست، در غیر این صورت `undefined`
     * @param {*}       result.result    شیء بازگشتی تابع تست
     * @param {number}  result.duration  مدت زمان تست
     * @param {boolean} result.passed    اگر تست موفق باشد true، در غیر این صورت false
     * @param {object}  result.retries   اطلاعات مربوط به تلاش‌های مجدد spec، مثلاً `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * هوکی که پس از پایان suite اجرا می‌شود (فقط در Mocha/Jasmine).
     * @param {object} suite جزئیات suite
     */
    afterSuite: function (suite) {
    },
    /**
     * پس از اتمام همه تست‌ها اجرا می‌شود. همچنان به تمام متغیرهای سراسری
     * تست دسترسی دارید.
     * @param {number} result 0 - تست موفق، 1 - تست ناموفق
     * @param {Array.<Object>} capabilities فهرست جزئیات capability ها
     * @param {Array.<String>} specs فهرست مسیرهای فایل‌های spec که اجرا شدند
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * بلافاصله پس از خاتمه نشست webdriver اجرا می‌شود.
     * @param {object} config شیء پیکربندی wdio
     * @param {Array.<Object>} capabilities فهرست جزئیات capability ها
     * @param {Array.<String>} specs فهرست مسیرهای فایل‌های spec که اجرا شدند
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * پس از خاموش شدن همه worker ها و زمانی که فرایند در آستانه خروج است اجرا می‌شود.
     * خطایی که در هوک `onComplete` پرتاب شود باعث شکست اجرای تست می‌شود.
     * @param {object} exitCode 0 - موفقیت، 1 - شکست
     * @param {object} config شیء پیکربندی wdio
     * @param {Array.<Object>} capabilities فهرست جزئیات capability ها
     * @param {<Object>} results شیء حاوی نتایج تست
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * هنگام وقوع یک refresh اجرا می‌شود.
    * @param {string} oldSessionId شناسه نشست قدیمی
    * @param {string} newSessionId شناسه نشست جدید
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * هوک‌های Cucumber
     *
     * قبل از یک Feature در Cucumber اجرا می‌شود.
     * @param {string}                   uri      مسیر فایل feature
     * @param {GherkinDocument.IFeature} feature  شیء feature در Cucumber
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * قبل از یک Scenario در Cucumber اجرا می‌شود.
     * @param {ITestCaseHookParameter} world    شیء world حاوی اطلاعات pickle و step تست
     * @param {object}                 context  شیء World در Cucumber
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * قبل از یک Step در Cucumber اجرا می‌شود.
     * @param {Pickle.IPickleStep} step     داده‌های step
     * @param {IPickle}            scenario pickle مربوط به scenario
     * @param {object}             context  شیء World در Cucumber
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * پس از یک Step در Cucumber اجرا می‌شود.
     * @param {Pickle.IPickleStep} step             داده‌های step
     * @param {IPickle}            scenario         pickle مربوط به scenario
     * @param {object}             result           شیء نتایج حاوی نتایج scenario
     * @param {boolean}            result.passed    اگر scenario موفق باشد true
     * @param {string}             result.error     پشته خطا در صورت شکست scenario
     * @param {number}             result.duration  مدت زمان scenario بر حسب میلی‌ثانیه
     * @param {object}             context          شیء World در Cucumber
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * پس از یک Scenario در Cucumber اجرا می‌شود.
     * @param {ITestCaseHookParameter} world            شیء world حاوی اطلاعات pickle و step تست
     * @param {object}                 result           شیء نتایج حاوی نتایج scenario `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    اگر scenario موفق باشد true
     * @param {string}                 result.error     پشته خطا در صورت شکست scenario
     * @param {number}                 result.duration  مدت زمان scenario بر حسب میلی‌ثانیه
     * @param {object}                 context          شیء World در Cucumber
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * پس از یک Feature در Cucumber اجرا می‌شود.
     * @param {string}                   uri      مسیر فایل feature
     * @param {GherkinDocument.IFeature} feature  شیء feature در Cucumber
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * قبل از اینکه کتابخانه assertion در WebdriverIO یک assertion انجام دهد اجرا می‌شود.
     * @param {object} params                 اطلاعات assertion
     * @param {string} params.matcherName     نام matcher که تست فراخوانی کرده است (برای یک alias، نام alias)
     * @param {*}      params.expectedValue   مقداری که به matcher ارسال می‌شود
     * @param {object} params.options         گزینه‌های assertion
     */
    beforeAssertion: function (params) {
    },
    /**
     * پس از اینکه کتابخانه assertion در WebdriverIO یک assertion انجام داد اجرا می‌شود.
     * @param {object} params                 اطلاعات assertion، همانند `beforeAssertion`
     * @param {object} params.result          نتیجه matcher، همراه با `pass` (boolean) و `message()`.
     *                                        `pass` زمانی true است که مقدار مطابقت داشته باشد، همچنین با `.not`
     */
    afterAssertion: function (params) {
    }
}
```

همچنین می‌توانید فایلی با تمام گزینه‌ها و حالت‌های ممکن را در [پوشه نمونه‌ها](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js) پیدا کنید.