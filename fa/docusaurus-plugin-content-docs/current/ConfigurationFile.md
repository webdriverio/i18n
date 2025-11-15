---
id: configurationfile
title: فایل پیکربندی
---

فایل پیکربندی شامل تمام اطلاعات لازم برای اجرای مجموعه آزمون‌های شماست. این یک ماژول NodeJS است که یک JSON را صادر می‌کند.

در اینجا یک مثال پیکربندی با تمام خصوصیات پشتیبانی شده و اطلاعات اضافی آمده است:

```js
export const config = {

    // ==================================
    // تست شما باید کجا اجرا شود
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // تنظیمات سرور
    // =====================
    // آدرس میزبان سرور Selenium در حال اجرا. این اطلاعات معمولاً منسوخ است، زیرا
    // WebdriverIO به طور خودکار به localhost متصل می‌شود. همچنین اگر از یکی از
    // سرویس‌های ابری پشتیبانی شده مانند Sauce Labs، Browserstack، Testing Bot یا LambdaTest استفاده می‌کنید،
    // نیازی به تعریف اطلاعات میزبان و پورت ندارید (زیرا WebdriverIO می‌تواند آن را
    // از اطلاعات کاربر و کلید شما تشخیص دهد). با این حال، اگر از یک Selenium
    // اختصاصی استفاده می‌کنید، باید `hostname`، `port`، و `path` را اینجا تعریف کنید.
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
    // را تعریف می‌کنند که باید در اینجا قرار دهید تا به این سرویس‌ها متصل شوید.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // اگر آزمون‌های خود را در Sauce Labs اجرا می‌کنید، می‌توانید منطقه‌ای را که می‌خواهید آزمون‌های خود را
    // در آن اجرا کنید از طریق خاصیت `region` مشخص کنید. دستگیره‌های کوتاه در دسترس برای مناطق عبارتند از `us` (پیش‌فرض) و `eu`.
    // این مناطق برای ابر VM Sauce Labs و ابر دستگاه واقعی Sauce Labs استفاده می‌شوند.
    // اگر منطقه را ارائه نکنید، به طور پیش‌فرض `us` خواهد بود.
    region: 'us',
    //
    // Sauce Labs یک [ارائه headless](https://saucelabs.com/products/web-testing/sauce-headless-testing) ارائه می‌دهد
    // که به شما امکان می‌دهد آزمون‌های Chrome و Firefox را به صورت headless اجرا کنید.
    //
    headless: false,
    //
    // ==================
    // مشخص کردن فایل‌های آزمون
    // ==================
    // تعریف کنید کدام مشخصات آزمون باید اجرا شود. الگو نسبت به دایرکتوری
    // فایل پیکربندی در حال اجرا نسبی است.
    //
    // مشخصات به عنوان آرایه‌ای از فایل‌های spec تعریف می‌شوند (اختیاری با استفاده از کاراکترهای جایگزین
    // که گسترش می‌یابند). آزمون برای هر فایل spec در یک فرآیند کارگر جداگانه اجرا می‌شود.
    // برای اجرای گروهی از فایل‌های spec در همان فرآیند کارگر، آنها را در آرایه‌ای
    // درون آرایه specs قرار دهید.
    //
    // مسیر فایل‌های spec نسبت به دایرکتوری فایل پیکربندی تعیین می‌شود
    // مگر اینکه مطلق باشد.
    //
    specs: [
        'test/spec/**',
        ['group/spec/**']
    ],
    // الگوهایی برای استثنا کردن.
    exclude: [
        'test/spec/multibrowser/**',
        'test/spec/mobile/**'
    ],
    //
    // ============
    // قابلیت‌ها
    // ============
    // قابلیت‌های خود را اینجا تعریف کنید. WebdriverIO می‌تواند چندین قابلیت را همزمان
    // اجرا کند. بسته به تعداد قابلیت‌ها، WebdriverIO چندین جلسه آزمون راه‌اندازی می‌کند.
    // در داخل `capabilities`، می‌توانید گزینه‌های `spec` و `exclude` را 
    // برای گروه‌بندی مشخصات خاص به یک قابلیت خاص بازنویسی کنید.
    //
    // ابتدا، می‌توانید تعریف کنید چند نمونه باید همزمان شروع شود. فرض کنید
    // شما 3 قابلیت مختلف دارید (Chrome، Firefox و Safari) و
    // `maxInstances` را روی 1 تنظیم کرده‌اید. wdio 3 فرآیند را راه‌اندازی خواهد کرد.
    //
    // بنابراین، اگر 10 فایل spec دارید و `maxInstances` را روی 10 تنظیم کرده‌اید، همه فایل‌های spec
    // همزمان آزمایش می‌شوند و 30 فرآیند راه‌اندازی می‌شود.
    //
    // این خاصیت تعیین می‌کند چند قابلیت از همان آزمون باید آزمون‌ها را اجرا کنند.
    //
    maxInstances: 10,
    //
    // یا محدودیتی برای اجرای آزمون‌ها با قابلیت خاص تنظیم کنید.
    maxInstancesPerCapability: 10,
    //
    // متغیرهای سراسری WebdriverIO (مانند `browser`، `$` و `$$`) را به محیط سراسری وارد می‌کند.
    // اگر آن را روی `false` تنظیم کنید، باید از `@wdio/globals` وارد کنید. توجه: WebdriverIO
    // مسئول تزریق متغیرهای سراسری خاص چارچوب آزمون نیست.
    //
    injectGlobals: true,
    //
    // اگر در جمع‌آوری تمام قابلیت‌های مهم مشکل دارید، پیکربندی پلتفرم Sauce Labs را
    // بررسی کنید - ابزاری عالی برای پیکربندی قابلیت‌های شما:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // برای اجرای chrome headless پرچم‌های زیر مورد نیاز است
        // (به https://developers.google.com/web/updates/2017/04/headless-chrome مراجعه کنید)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // پارامتر برای نادیده گرفتن برخی یا همه پرچم‌های پیش‌فرض
        // - اگر مقدار true باشد: همه پرچم‌های پیش‌فرض DevTools و آرگومان‌های پیش‌فرض Puppeteer را نادیده می‌گیرد
        // - اگر مقدار یک آرایه باشد: DevTools آرگومان‌های پیش‌فرض داده شده را فیلتر می‌کند
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstances می‌تواند به ازای هر قابلیت بازنویسی شود. بنابراین اگر یک شبکه Selenium داخلی
        // با فقط 5 نمونه firefox در دسترس دارید، می‌توانید اطمینان حاصل کنید که بیش از
        // 5 نمونه همزمان شروع نمی‌شود.
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // پرچم برای فعال‌سازی حالت headless Firefox (برای اطلاعات بیشتر درباره moz:firefoxOptions به https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities مراجعه کنید)
          // args: ['-headless']
        },
        // اگر outputDir ارائه شود، WebdriverIO می‌تواند لاگ‌های جلسه راننده را ثبت کند
        // می‌توان پیکربندی کرد که کدام logTypes حذف شوند.
        excludeDriverLogs: ['*'], // '*' را برای حذف همه لاگ‌های جلسه راننده ارسال کنید
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // پارامتر برای نادیده گرفتن برخی یا همه آرگومان‌های پیش‌فرض Puppeteer
        // ignoreDefaultArgs: ['-foreground'], // برای نادیده گرفتن همه آرگومان‌های پیش‌فرض، مقدار را به true تنظیم کنید
    }],
    //
    // لیست اضافی آرگومان‌های نود برای استفاده هنگام شروع فرآیندهای فرزند
    execArgv: [],
    //
    // ===================
    // پیکربندی‌های آزمون
    // ===================
    // همه گزینه‌هایی که برای نمونه WebdriverIO مرتبط هستند را اینجا تعریف کنید
    //
    // سطح جزئیات لاگ: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // تنظیم سطوح لاگ خاص برای هر لاگر
    // از سطح 'silent' برای غیرفعال کردن لاگر استفاده کنید
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // دایرکتوری را برای ذخیره همه لاگ‌ها تنظیم کنید
    outputDir: __dirname,
    //
    // اگر می‌خواهید آزمون‌های خود را فقط تا زمانی که تعداد مشخصی از آزمون‌ها شکست بخورند اجرا کنید، از
    // bail استفاده کنید (پیش‌فرض 0 است - bail نکنید، همه آزمون‌ها را اجرا کنید).
    bail: 0,
    //
    // یک URL پایه تنظیم کنید تا فراخوانی‌های دستور `url()` را کوتاه کنید. اگر پارامتر `url` شما با
    // `/` شروع شود، `baseUrl` پیشوند می‌شود، اما شامل بخش مسیر `baseUrl` نیست.
    //
    // اگر پارامتر `url` شما بدون طرح یا `/` شروع می‌شود (مانند `some/path`)، `baseUrl`
    // مستقیماً به عنوان پیشوند اضافه می‌شود.
    baseUrl: 'http://localhost:8080',
    //
    // زمان انتظار پیش‌فرض برای همه دستورات waitForXXX.
    waitforTimeout: 1000,
    //
    // افزودن فایل‌ها برای نظارت (مانند کد برنامه یا اشیاء صفحه) هنگام اجرای دستور `wdio`
    // با پرچم `--watch`. Globbing پشتیبانی می‌شود.
    filesToWatch: [
        // به عنوان مثال، اجرای مجدد آزمون‌ها در صورت تغییر کد برنامه
        // './app/**/*.js'
    ],
    //
    // چارچوبی که می‌خواهید مشخصات خود را با آن اجرا کنید.
    // موارد زیر پشتیبانی می‌شوند: 'mocha'، 'jasmine' و 'cucumber'
    // همچنین ببینید: https://webdriver.io/docs/frameworks.html
    //
    // مطمئن شوید که بسته آداپتور wdio برای چارچوب خاص را قبل از اجرای هر آزمون نصب کرده‌اید.
    framework: 'mocha',
    //
    // تعداد دفعات تلاش مجدد کل فایل مشخصات هنگامی که به طور کلی شکست می‌خورد
    specFileRetries: 1,
    // تأخیر به ثانیه بین تلاش‌های مجدد فایل مشخصات
    specFileRetriesDelay: 0,
    // آیا فایل‌های مشخصات تلاش مجدد باید فوراً مجدداً تلاش شوند یا به انتهای صف منتقل شوند
    specFileRetriesDeferred: false,
    //
    // گزارش‌دهنده آزمون برای stdout.
    // تنها مورد پشتیبانی شده به طور پیش‌فرض 'dot' است
    // همچنین ببینید: https://webdriver.io/docs/dot-reporter.html ، و روی "Reporters" در ستون سمت چپ کلیک کنید
    reporters: [
        'dot',
        ['allure', {
            //
            // اگر از گزارش‌دهنده "allure" استفاده می‌کنید، باید دایرکتوری را تعریف کنید که
            // WebdriverIO باید همه گزارش‌های allure را در آن ذخیره کند.
            outputDir: './'
        }]
    ],
    //
    // گزینه‌هایی که به Mocha ارسال می‌شود.
    // لیست کامل را در: http://mochajs.org ببینید
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // گزینه‌هایی که به Jasmine ارسال می‌شود.
    // همچنین ببینید: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // زمان انتظار پیش‌فرض Jasmine
        defaultTimeoutInterval: 5000,
        //
        // چارچوب Jasmine اجازه می‌دهد هر تأیید را برای ثبت وضعیت برنامه
        // یا وب‌سایت بسته به نتیجه رهگیری کند. برای مثال، گرفتن عکس هر بار
        // که یک تأیید شکست می‌خورد بسیار مفید است.
        expectationResultHandler: function(passed, assertion) {
            // کاری انجام دهید
        },
        //
        // استفاده از عملکرد grep خاص Jasmine
        grep: null,
        invertGrep: null
    },
    //
    // اگر از Cucumber استفاده می‌کنید، باید مشخص کنید که تعاریف مرحله شما کجا قرار دارند.
    // همچنین ببینید: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (file/dir) فایل‌ها را قبل از اجرای ویژگی‌ها نیاز دارند
        backtrace: false,   // <boolean> نمایش کامل backtrace برای خطاها
        compiler: [],       // <string[]> ("extension:module") فایل‌ها را با EXTENSION داده شده بعد از نیاز به MODULE (قابل تکرار)
        dryRun: false,      // <boolean> فراخوانی فرمت‌کننده‌ها بدون اجرای مراحل
        failFast: false,    // <boolean> ترک اجرا در اولین شکست
        snippets: true,     // <boolean> پنهان کردن اسنیپت‌های تعریف مرحله برای مراحل در انتظار
        source: true,       // <boolean> پنهان کردن URIهای منبع
        strict: false,      // <boolean> شکست در صورت وجود هرگونه مرحله تعریف نشده یا در انتظار
        tagExpression: '',  // <string> (expression) فقط ویژگی‌ها یا سناریوهایی با برچسب‌های مطابق با عبارت را اجرا کنید
        timeout: 20000,     // <number> زمان انتظار برای تعاریف مرحله
        ignoreUndefinedDefinitions: false, // <boolean> این پیکربندی را فعال کنید تا تعاریف تعریف نشده را به عنوان هشدار در نظر بگیرد.
        scenarioLevelReporter: false // این را فعال کنید تا webdriver.io طوری رفتار کند که انگار سناریوها و نه مراحل آزمون‌ها هستند.
    },
    // یک مسیر tsconfig سفارشی مشخص کنید - WDIO از `tsx` برای کامپایل فایل‌های TypeScript استفاده می‌کند
    // TSConfig شما به طور خودکار از دایرکتوری کاری فعلی شناسایی می‌شود
    // اما می‌توانید یک مسیر سفارشی را اینجا یا با تنظیم متغیر محیطی TSX_TSCONFIG_PATH مشخص کنید
    // مستندات `tsx` را ببینید: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // توجه: این تنظیم توسط متغیر محیطی TSX_TSCONFIG_PATH و/یا آرگومان cli --tsConfigPath اگر مشخص شده باشند، بازنویسی خواهد شد.
    // این تنظیم اگر نود نتواند فایل wdio.conf.ts شما را بدون کمک از tsx تجزیه کند، نادیده گرفته می‌شود، به عنوان مثال اگر
    // نام‌های مستعار مسیر در tsconfig.json تنظیم کرده‌اید و از آن نام‌های مستعار مسیر در فایل wdio.config.ts خود استفاده می‌کنید.
    // فقط در صورتی از این استفاده کنید که از فایل پیکربندی .js استفاده می‌کنید یا فایل پیکربندی .ts شما JavaScript معتبری است.
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // قلاب‌ها
    // =====
    // WebdriverIO چندین قلاب ارائه می‌دهد که می‌توانید برای مداخله در فرآیند آزمون استفاده کنید تا آن را ارتقا
    // دهید و خدماتی در اطراف آن ایجاد کنید. می‌توانید یک تابع واحد یا آرایه‌ای از
    // روش‌ها را اعمال کنید. اگر یکی از آنها با یک پرومیس برگردد، WebdriverIO منتظر می‌ماند تا آن پرومیس
    // حل شود و سپس ادامه می‌دهد.
    //
    /**
     * یک بار قبل از راه‌اندازی همه کارگران اجرا می‌شود.
     * @param {object} config شیء پیکربندی wdio
     * @param {Array.<Object>} capabilities لیست جزئیات قابلیت‌ها
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * قبل از ایجاد یک فرآیند کارگر اجرا می‌شود و می‌تواند برای مقداردهی اولیه سرویس خاص
     * برای آن کارگر و همچنین اصلاح محیط‌های اجرا به صورت ناهمگام استفاده شود.
     * @param  {string} cid      شناسه قابلیت (مانند 0-0)
     * @param  {object} caps     شیء حاوی قابلیت‌ها برای جلسه‌ای که در کارگر ایجاد می‌شود
     * @param  {object} specs    مشخصاتی که در فرآیند کارگر اجرا می‌شود
     * @param  {object} args     شیء که با پیکربندی اصلی پس از مقداردهی اولیه کارگر ادغام می‌شود
     * @param  {object} execArgv لیست آرگومان‌های رشته‌ای ارسال شده به فرآیند کارگر
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * پس از خروج یک فرآیند کارگر اجرا می‌شود.
     * @param  {string} cid      شناسه قابلیت (مانند 0-0)
     * @param  {number} exitCode 0 - موفقیت، 1 - شکست
     * @param  {object} specs    مشخصاتی که در فرآیند کارگر اجرا می‌شود
     * @param  {number} retries  تعداد تلاش‌های مجدد استفاده شده
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * قبل از مقداردهی اولیه جلسه webdriver و چارچوب آزمون اجرا می‌شود. به شما اجازه می‌دهد
     * پیکربندی‌ها را بسته به قابلیت یا مشخصات دستکاری کنید.
     * @param {object} config شیء پیکربندی wdio
     * @param {Array.<Object>} capabilities لیست جزئیات قابلیت‌ها
     * @param {Array.<String>} specs لیست مسیرهای فایل مشخصات که قرار است اجرا شوند
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * قبل از شروع اجرای آزمون اجرا می‌شود. در این نقطه می‌توانید به همه متغیرهای جهانی
     * مانند `browser` دسترسی داشته باشید. این مکان مناسبی برای تعریف دستورات سفارشی است.
     * @param {Array.<Object>} capabilities لیست جزئیات قابلیت‌ها
     * @param {Array.<String>} specs        لیست مسیرهای فایل مشخصات که قرار است اجرا شوند
     * @param {object}         browser      نمونه جلسه مرورگر/دستگاه ایجاد شده
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * قبل از شروع مجموعه اجرا می‌شود (فقط در Mocha/Jasmine).
     * @param {object} suite جزئیات مجموعه
     */
    beforeSuite: function (suite) {
    },
    /**
     * این قلاب _قبل_ از هر قلاب درون مجموعه اجرا می‌شود.
     * (برای مثال، این قبل از فراخوانی `before`، `beforeEach`، `after`، `afterEach` در Mocha اجرا می‌شود.). در Cucumber `context` شیء World است.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * قلابی که _بعد_ از هر قلاب درون مجموعه اجرا می‌شود.
     * (برای مثال، این بعد از فراخوانی `before`، `beforeEach`، `after`، `afterEach` در Mocha اجرا می‌شود.). در Cucumber `context` شیء World است.
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * تابعی که قبل از یک آزمون اجرا می‌شود (فقط در Mocha/Jasmine)
     * @param {object} test    شیء آزمون
     * @param {object} context شیء دامنه که آزمون با آن اجرا شده است
     */
    beforeTest: function (test, context) {
    },
    /**
     * قبل از اجرای یک دستور WebdriverIO اجرا می‌شود.
     * @param {string} commandName نام دستور قلاب
     * @param {Array} args آرگومان‌هایی که دستور دریافت می‌کند
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * بعد از اجرای یک دستور WebdriverIO اجرا می‌شود
     * @param {string} commandName نام دستور قلاب
     * @param {Array} args آرگومان‌هایی که دستور دریافت می‌کرد
     * @param {*} result نتیجه دستور
     * @param {Error} error شیء خطا، اگر وجود داشته باشد
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * تابعی که بعد از یک آزمون اجرا می‌شود (فقط در Mocha/Jasmine)
     * @param {object}  test             شیء آزمون
     * @param {object}  context          شیء دامنه که آزمون با آن اجرا شده است
     * @param {Error}   result.error     شیء خطا در صورتی که آزمون شکست بخورد، در غیر این صورت `undefined`
     * @param {*}       result.result    شیء بازگشتی از تابع آزمون
     * @param {number}  result.duration  مدت زمان آزمون
     * @param {boolean} result.passed    true اگر آزمون قبول شده باشد، در غیر این صورت false
     * @param {object}  result.retries   اطلاعات درباره تلاش‌های مجدد مرتبط با مشخصات، به عنوان مثال `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * قلابی که بعد از پایان مجموعه اجرا می‌شود (فقط در Mocha/Jasmine).
     * @param {object} suite جزئیات مجموعه
     */
    afterSuite: function (suite) {
    },
    /**
     * بعد از اتمام همه آزمون‌ها اجرا می‌شود. شما هنوز به همه متغیرهای جهانی از
     * آزمون دسترسی دارید.
     * @param {number} result 0 - آزمون قبول شده، 1 - آزمون شکست خورده
     * @param {Array.<Object>} capabilities لیست جزئیات قابلیت‌ها
     * @param {Array.<String>} specs لیست مسیرهای فایل مشخصات که اجرا شده است
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * بلافاصله پس از پایان جلسه webdriver اجرا می‌شود.
     * @param {object} config شیء پیکربندی wdio
     * @param {Array.<Object>} capabilities لیست جزئیات قابلیت‌ها
     * @param {Array.<String>} specs لیست مسیرهای فایل مشخصات که اجرا شده است
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * بعد از اینکه همه کارگران خاموش شده‌اند و فرآیند در حال خروج است، اجرا می‌شود.
     * یک خطای پرتاب شده در قلاب `onComplete` منجر به شکست اجرای آزمون خواهد شد.
     * @param {object} exitCode 0 - موفقیت، 1 - شکست
     * @param {object} config شیء پیکربندی wdio
     * @param {Array.<Object>} capabilities لیست جزئیات قابلیت‌ها
     * @param {<Object>} results شیء حاوی نتایج آزمون
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * هنگام تازه‌سازی اجرا می‌شود.
    * @param {string} oldSessionId شناسه جلسه قدیمی
    * @param {string} newSessionId شناسه جلسه جدید
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * Cucumber Hooks
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
     * @param {ITestCaseHookParameter} world    شیء world حاوی اطلاعات درباره pickle و مرحله آزمون
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
     * @param {boolean}            result.passed    true اگر سناریو قبول شده باشد
     * @param {string}             result.error     پشته خطا اگر سناریو شکست خورده باشد
     * @param {number}             result.duration  مدت زمان سناریو به میلی‌ثانیه
     * @param {object}             context          شیء Cucumber World
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * بعد از یک سناریوی Cucumber اجرا می‌شود.
     * @param {ITestCaseHookParameter} world            شیء world حاوی اطلاعات درباره pickle و مرحله آزمون
     * @param {object}                 result           شیء نتایج حاوی نتایج سناریو `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    true اگر سناریو قبول شده باشد
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
     * قبل از اینکه یک کتابخانه تأیید WebdriverIO یک تأیید انجام دهد، اجرا می‌شود.
     * @param commandName نام دستور
     * @param args        آرگومان‌هایی که دستور دریافت می‌کند
     */
    beforeAssertion: function (params) {
    },
    /**
     * بعد از اجرای یک دستور WebdriverIO اجرا می‌شود
     * @param commandName  نام دستور
     * @param args         آرگومان‌هایی که دستور دریافت می‌کرد
     * @param result       نتیجه دستور
     * @param error        خطا در صورتی که مشکلی پیش آمده باشد
     */
    afterAssertion: function (params) {
    }
}
```

همچنین می‌توانید فایلی با تمام گزینه‌ها و تغییرات ممکن را در [پوشه نمونه](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js) پیدا کنید.