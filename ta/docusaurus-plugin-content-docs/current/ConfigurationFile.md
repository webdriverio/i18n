---
id: configurationfile
title: உள்ளமைவு கோப்பு
description: "ஆதரிக்கப்படும் ஒவ்வொரு testrunner விருப்பம், capability மற்றும் hook ஆகியவற்றை விளக்கங்களுடன் பட்டியலிடும், குறிப்புரைகள் சேர்க்கப்பட்ட wdio.conf.js உதாரணத்தைப் பாருங்கள்."
---

உங்கள் டெஸ்ட் சூட்டை இயக்கத் தேவையான அனைத்து தகவல்களும் உள்ளமைவு கோப்பில் உள்ளன. இது ஒரு JSON-ஐ ஏற்றுமதி செய்யும் NodeJS மாட்யூல் ஆகும்.

ஆதரிக்கப்படும் அனைத்து பண்புகள் மற்றும் கூடுதல் தகவல்களுடன் கூடிய ஒரு உதாரண உள்ளமைவு இதோ:

```js
export const config = {

    // ==================================
    // உங்கள் டெஸ்ட் எங்கே தொடங்கப்பட வேண்டும்
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // சர்வர் உள்ளமைவுகள்
    // =====================
    // இயங்கும் Selenium சர்வரின் ஹோஸ்ட் முகவரி. WebdriverIO தானாகவே localhost-உடன் இணைவதால்,
    // இந்தத் தகவல் பொதுவாகத் தேவையற்றது. மேலும் Sauce Labs, Browserstack, Testing Bot அல்லது
    // TestMu AI (முன்னர் LambdaTest) போன்ற ஆதரிக்கப்படும் கிளவுட் சேவைகளில் ஒன்றைப் பயன்படுத்தினால்,
    // host மற்றும் port தகவலை வரையறுக்கத் தேவையில்லை (ஏனெனில் உங்கள் user மற்றும் key தகவலிலிருந்து
    // WebdriverIO அதைக் கண்டறிய முடியும்). இருப்பினும், நீங்கள் ஒரு தனிப்பட்ட Selenium
    // பின்தளத்தைப் பயன்படுத்தினால், `hostname`, `port`, மற்றும் `path` ஆகியவற்றை இங்கே வரையறுக்க வேண்டும்.
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // நெறிமுறை: http | https
    // protocol: 'http',
    //
    // =================
    // சேவை வழங்குநர்கள்
    // =================
    // WebdriverIO, Sauce Labs, Browserstack, Testing Bot மற்றும் TestMu AI (முன்னர் LambdaTest) ஆகியவற்றை ஆதரிக்கிறது. (மற்ற கிளவுட் வழங்குநர்களும்
    // வேலை செய்ய வேண்டும்.) இந்தச் சேவைகளுடன் இணைய, அவை வரையறுக்கும் குறிப்பிட்ட `user` மற்றும் `key` (அல்லது access key)
    // மதிப்புகளை நீங்கள் இங்கே அமைக்க வேண்டும்.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // நீங்கள் Sauce Labs-இல் டெஸ்ட்களை இயக்கினால், `region` பண்பின் மூலம் உங்கள் டெஸ்ட்களை இயக்க
    // விரும்பும் பிராந்தியத்தைக் குறிப்பிடலாம். பிராந்தியங்களுக்கான கிடைக்கும் சுருக்கங்கள் `us` (இயல்புநிலை) மற்றும் `eu`.
    // இந்தப் பிராந்தியங்கள் Sauce Labs VM கிளவுட் மற்றும் Sauce Labs Real Device Cloud-க்குப் பயன்படுத்தப்படுகின்றன.
    // நீங்கள் பிராந்தியத்தை வழங்காவிட்டால், இயல்புநிலையாக `us` பயன்படுத்தப்படும்.
    region: 'us',
    //
    // Sauce Labs ஒரு [headless சேவையை](https://saucelabs.com/products/web-testing/sauce-headless-testing) வழங்குகிறது,
    // இது Chrome மற்றும் Firefox டெஸ்ட்களை headless முறையில் இயக்க அனுமதிக்கிறது.
    //
    headless: false,
    //
    // ==================
    // டெஸ்ட் கோப்புகளைக் குறிப்பிடுதல்
    // ==================
    // எந்த டெஸ்ட் spec-கள் இயங்க வேண்டும் என்பதை வரையறுக்கவும். இந்த pattern, இயக்கப்படும்
    // உள்ளமைவு கோப்பின் கோப்பகத்தைச் சார்ந்தது.
    //
    // spec-கள் spec கோப்புகளின் array-ஆக வரையறுக்கப்படுகின்றன (விருப்பமாக, விரிவாக்கப்படும்
    // wildcard-களைப் பயன்படுத்தலாம்). ஒவ்வொரு spec கோப்பிற்கான டெஸ்ட்டும் தனி
    // worker செயல்முறையில் இயக்கப்படும். ஒரு குழு spec கோப்புகளை ஒரே worker
    // செயல்முறையில் இயக்க, அவற்றை specs array-க்குள் ஒரு array-இல் இணைக்கவும்.
    //
    // spec கோப்புகளின் path முழுமையானதாக (absolute) இல்லாவிட்டால், அது
    // உள்ளமைவு கோப்பின் கோப்பகத்திலிருந்து சார்பாகத் தீர்மானிக்கப்படும்.
    //
    specs: [
        'test/spec/**',
        ['group/spec/**']
    ],
    // விலக்க வேண்டிய pattern-கள்.
    exclude: [
        'test/spec/multibrowser/**',
        'test/spec/mobile/**'
    ],
    //
    // ============
    // Capabilities
    // ============
    // உங்கள் capabilities-ஐ இங்கே வரையறுக்கவும். WebdriverIO ஒரே நேரத்தில் பல capabilities-ஐ
    // இயக்க முடியும். capabilities-இன் எண்ணிக்கையைப் பொறுத்து, WebdriverIO பல டெஸ்ட்
    // அமர்வுகளைத் தொடங்கும். உங்கள் `capabilities`-க்குள், குறிப்பிட்ட spec-களை ஒரு குறிப்பிட்ட capability-க்குக்
    // குழுவாக்க `wdio:specs` மற்றும் `wdio:exclude` மூலம் எந்தக் கோப்புகள் இயங்கும் என்பதை மேலெழுதலாம்.
    //
    // முதலில், ஒரே நேரத்தில் எத்தனை instance-கள் தொடங்கப்பட வேண்டும் என்பதை வரையறுக்கலாம். உதாரணமாக,
    // உங்களிடம் 3 வெவ்வேறு capabilities (Chrome, Firefox, மற்றும் Safari) உள்ளன, மேலும்
    // `maxInstances`-ஐ 1 ஆக அமைத்துள்ளீர்கள் என்று வைத்துக்கொள்வோம். wdio 3 செயல்முறைகளை உருவாக்கும்.
    //
    // எனவே, உங்களிடம் 10 spec கோப்புகள் இருந்து `maxInstances`-ஐ 10 ஆக அமைத்தால், அனைத்து spec கோப்புகளும்
    // ஒரே நேரத்தில் சோதிக்கப்படும், மேலும் 30 செயல்முறைகள் உருவாக்கப்படும்.
    //
    // ஒரே டெஸ்டிலிருந்து எத்தனை capabilities டெஸ்ட்களை இயக்க வேண்டும் என்பதை இந்தப் பண்பு கையாளுகிறது.
    //
    maxInstances: 10,
    //
    // அல்லது ஒரு குறிப்பிட்ட capability-உடன் டெஸ்ட்களை இயக்க ஒரு வரம்பை அமைக்கவும்.
    maxInstancesPerCapability: 10,
    //
    // WebdriverIO-வின் globals-ஐ (எ.கா. `browser`, `$` மற்றும் `$$`) global சூழலில் செருகுகிறது.
    // நீங்கள் `false` என அமைத்தால், `@wdio/globals`-இலிருந்து import செய்ய வேண்டும். குறிப்பு: WebdriverIO
    // டெஸ்ட் framework-க்குரிய globals-ஐச் செருகுவதைக் கையாளாது.
    //
    injectGlobals: true,
    //
    // அனைத்து முக்கியமான capabilities-ஐயும் ஒன்றாகச் சேர்ப்பதில் சிக்கல் இருந்தால்,
    // Sauce Labs platform configurator-ஐப் பாருங்கள் - உங்கள் capabilities-ஐ உள்ளமைக்க ஒரு சிறந்த கருவி:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // chrome-ஐ headless முறையில் இயக்க பின்வரும் flags தேவை
        // (பார்க்க https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // சில அல்லது அனைத்து இயல்புநிலை flags-ஐ புறக்கணிப்பதற்கான அளவுரு
        // - மதிப்பு true எனில்: அனைத்து DevTools 'default flags' மற்றும் Puppeteer 'default arguments'-ஐ புறக்கணிக்கும்
        // - மதிப்பு ஒரு array எனில்: DevTools கொடுக்கப்பட்ட இயல்புநிலை arguments-ஐ வடிகட்டும்
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstances-ஐ ஒவ்வொரு capability-க்கும் மேலெழுதலாம். எனவே உங்களிடம் 5 firefox instance-கள் மட்டுமே
        // கிடைக்கும் உள்ளக Selenium grid இருந்தால், ஒரே நேரத்தில் 5-க்கும் மேற்பட்ட
        // instance-கள் தொடங்கப்படாமல் இருப்பதை உறுதிசெய்யலாம்.
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // Firefox headless முறையைச் செயல்படுத்துவதற்கான flag (moz:firefoxOptions பற்றிய கூடுதல் விவரங்களுக்கு https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities பார்க்கவும்)
          // args: ['-headless']
        },
        // outputDir வழங்கப்பட்டால், WebdriverIO driver அமர்வு logs-ஐப் பதிவுசெய்ய முடியும்
        // எந்த logTypes-ஐ விலக்க வேண்டும் என்பதை உள்ளமைக்க முடியும்.
        // excludeDriverLogs: ['*'], // அனைத்து driver அமர்வு logs-ஐயும் விலக்க '*' அனுப்பவும்
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // சில அல்லது அனைத்து Puppeteer இயல்புநிலை arguments-ஐ புறக்கணிப்பதற்கான அளவுரு
        // ignoreDefaultArgs: ['-foreground'], // அனைத்து இயல்புநிலை arguments-ஐயும் புறக்கணிக்க மதிப்பை true என அமைக்கவும்
    }],
    //
    // child செயல்முறைகளைத் தொடங்கும்போது பயன்படுத்த வேண்டிய node arguments-இன் கூடுதல் பட்டியல்
    execArgv: [],
    //
    // ===================
    // டெஸ்ட் உள்ளமைவுகள்
    // ===================
    // WebdriverIO instance-க்குத் தொடர்புடைய அனைத்து விருப்பங்களையும் இங்கே வரையறுக்கவும்
    //
    // logging விவர நிலை: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // ஒவ்வொரு logger-க்கும் குறிப்பிட்ட log நிலைகளை அமைக்கவும்
    // logger-ஐ முடக்க 'silent' நிலையைப் பயன்படுத்தவும்
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // அனைத்து logs-ஐயும் சேமிக்க கோப்பகத்தை அமைக்கவும்
    outputDir: __dirname,
    //
    // குறிப்பிட்ட எண்ணிக்கையிலான டெஸ்ட்கள் தோல்வியடையும் வரை மட்டுமே டெஸ்ட்களை இயக்க விரும்பினால்
    // bail-ஐப் பயன்படுத்தவும் (இயல்புநிலை 0 - bail செய்யாது, அனைத்து டெஸ்ட்களையும் இயக்கும்).
    bail: 0,
    //
    // `url()` கட்டளை அழைப்புகளைச் சுருக்க ஒரு base URL-ஐ அமைக்கவும். உங்கள் `url` அளவுரு
    // `/` உடன் தொடங்கினால், `baseUrl`-இன் path பகுதியைச் சேர்க்காமல் `baseUrl` முன்னொட்டாகச் சேர்க்கப்படும்.
    //
    // உங்கள் `url` அளவுரு scheme அல்லது `/` இல்லாமல் தொடங்கினால் (`some/path` போல), `baseUrl`
    // நேரடியாக முன்னொட்டாகச் சேர்க்கப்படும்.
    baseUrl: 'http://localhost:8080',
    //
    // அனைத்து waitForXXX கட்டளைகளுக்குமான இயல்புநிலை timeout.
    waitforTimeout: 1000,
    //
    // `--watch` flag உடன் `wdio` கட்டளையை இயக்கும்போது கண்காணிக்க வேண்டிய கோப்புகளைச் சேர்க்கவும்
    // (எ.கா. பயன்பாட்டுக் குறியீடு அல்லது page objects). Globbing ஆதரிக்கப்படுகிறது.
    filesToWatch: [
        // எ.கா. எனது பயன்பாட்டுக் குறியீட்டை மாற்றினால் டெஸ்ட்களை மீண்டும் இயக்கு
        // './app/**/*.js'
    ],
    //
    // உங்கள் spec-களை இயக்க விரும்பும் framework.
    // பின்வருபவை ஆதரிக்கப்படுகின்றன: 'mocha', 'jasmine', மற்றும் 'cucumber'
    // மேலும் பார்க்க: https://webdriver.io/docs/frameworks.html
    //
    // எந்த டெஸ்ட்களையும் இயக்கும் முன், குறிப்பிட்ட framework-க்கான wdio adapter தொகுப்பு நிறுவப்பட்டுள்ளதா என்பதை உறுதிசெய்யவும்.
    framework: 'mocha',
    //
    // முழு specfile-உம் தோல்வியடையும்போது அதை மீண்டும் முயற்சிக்க வேண்டிய எண்ணிக்கை
    specFileRetries: 1,
    // spec கோப்பு மறுமுயற்சிகளுக்கு இடையிலான தாமதம் (வினாடிகளில்)
    specFileRetriesDelay: 0,
    // மறுமுயற்சி செய்யப்படும் spec கோப்புகள் உடனடியாக மீண்டும் முயற்சிக்கப்பட வேண்டுமா அல்லது வரிசையின் இறுதிக்குத் தள்ளிவைக்கப்பட வேண்டுமா
    specFileRetriesDeferred: false,
    //
    // stdout-க்கான டெஸ்ட் reporter.
    // இயல்புநிலையாக ஆதரிக்கப்படுவது 'dot' மட்டுமே
    // மேலும் பார்க்க: https://webdriver.io/docs/dot-reporter.html , மேலும் இடது நெடுவரிசையில் "Reporters" என்பதைக் கிளிக் செய்யவும்
    reporters: [
        'dot',
        ['allure', {
            //
            // நீங்கள் "allure" reporter-ஐப் பயன்படுத்தினால், WebdriverIO அனைத்து allure அறிக்கைகளையும்
            // சேமிக்க வேண்டிய கோப்பகத்தை வரையறுக்க வேண்டும்.
            outputDir: './'
        }]
    ],
    //
    // Mocha-க்கு அனுப்பப்பட வேண்டிய விருப்பங்கள்.
    // முழுப் பட்டியலை இங்கே பார்க்கவும்: http://mochajs.org
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // Jasmine-க்கு அனுப்பப்பட வேண்டிய விருப்பங்கள்.
    // மேலும் பார்க்க: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // Jasmine இயல்புநிலை timeout
        defaultTimeoutInterval: 5000,
        //
        // முடிவைப் பொறுத்து பயன்பாடு அல்லது இணையதளத்தின் நிலையைப் பதிவுசெய்ய, ஒவ்வொரு assertion-ஐயும்
        // இடைமறிக்க Jasmine framework அனுமதிக்கிறது. உதாரணமாக, ஒவ்வொரு முறையும் assertion
        // தோல்வியடையும்போது screenshot எடுப்பது மிகவும் பயனுள்ளதாக இருக்கும்.
        expectationResultHandler: function(passed, assertion) {
            // ஏதாவது செய்யவும்
        },
        //
        // Jasmine-க்குரிய grep செயல்பாட்டைப் பயன்படுத்தவும்
        grep: null,
        invertGrep: null
    },
    //
    // நீங்கள் Cucumber-ஐப் பயன்படுத்தினால், உங்கள் step definitions எங்கே உள்ளன என்பதைக் குறிப்பிட வேண்டும்.
    // மேலும் பார்க்க: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (file/dir) features-ஐ இயக்கும் முன் கோப்புகளை require செய்யவும்
        backtrace: false,   // <boolean> பிழைகளுக்கான முழு backtrace-ஐக் காட்டு
        compiler: [],       // <string[]> ("extension:module") MODULE-ஐ require செய்த பிறகு கொடுக்கப்பட்ட EXTENSION கொண்ட கோப்புகளை require செய் (மீண்டும் பயன்படுத்தலாம்)
        dryRun: false,      // <boolean> steps-ஐ இயக்காமல் formatters-ஐ அழை
        failFast: false,    // <boolean> முதல் தோல்வியிலேயே இயக்கத்தை நிறுத்து
        snippets: true,     // <boolean> நிலுவையிலுள்ள steps-க்கான step definition snippets-ஐ மறை
        source: true,       // <boolean> source URI-களை மறை
        strict: false,      // <boolean> வரையறுக்கப்படாத அல்லது நிலுவையிலுள்ள steps இருந்தால் தோல்வியடை
        tags: '',           // <string> (expression) expression-உடன் பொருந்தும் tags கொண்ட features அல்லது scenarios-ஐ மட்டும் இயக்கு
        timeout: 20000,     // <number> step definitions-க்கான timeout
        ignoreUndefinedDefinitions: false, // <boolean> வரையறுக்கப்படாத definitions-ஐ எச்சரிக்கைகளாகக் கருத இந்த config-ஐ இயக்கவும்.
        scenarioLevelReporter: false // steps அல்லாமல் scenarios-ஏ டெஸ்ட்கள் என்பது போல webdriver.io செயல்பட இதை இயக்கவும்.
    },
    // தனிப்பயன் tsconfig path-ஐக் குறிப்பிடவும் - TypeScript கோப்புகளை compile செய்ய WDIO `tsx`-ஐப் பயன்படுத்துகிறது
    // உங்கள் TSConfig தற்போதைய working directory-இலிருந்து தானாகக் கண்டறியப்படுகிறது
    // ஆனால் இங்கே அல்லது TSX_TSCONFIG_PATH env var-ஐ அமைப்பதன் மூலம் தனிப்பயன் path-ஐக் குறிப்பிடலாம்
    // `tsx` ஆவணங்களைப் பார்க்கவும்: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // குறிப்பு: TSX_TSCONFIG_PATH env var மற்றும்/அல்லது cli --tsConfigPath argument குறிப்பிடப்பட்டிருந்தால், இந்த அமைப்பு அவற்றால் மேலெழுதப்படும்.
    // tsx-இன் உதவியின்றி node உங்கள் wdio.conf.ts கோப்பை parse செய்ய முடியாவிட்டால் இந்த அமைப்பு புறக்கணிக்கப்படும், எ.கா. tsconfig.json-இல்
    // path aliases அமைத்து, அந்த path aliases-ஐ உங்கள் wdio.config.ts கோப்பினுள் பயன்படுத்தினால்.
    // நீங்கள் .js config கோப்பைப் பயன்படுத்தினால் அல்லது உங்கள் .ts config கோப்பு சரியான JavaScript ஆக இருந்தால் மட்டுமே இதைப் பயன்படுத்தவும்.
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // Hooks
    // =====
    // டெஸ்ட் செயல்முறையை மேம்படுத்தவும் அதைச் சுற்றி சேவைகளை உருவாக்கவும், அதில் தலையிட நீங்கள் பயன்படுத்தக்கூடிய
    // பல hooks-ஐ WebdriverIO வழங்குகிறது. நீங்கள் அதற்கு ஒரு தனிச் செயல்பாட்டையோ அல்லது methods-இன்
    // array-ஐயோ பயன்படுத்தலாம். அவற்றில் ஒன்று promise-ஐத் திருப்பினால், தொடர்வதற்கு முன் அந்த promise
    // resolve ஆகும் வரை WebdriverIO காத்திருக்கும்.
    //
    /**
     * அனைத்து workers-உம் தொடங்கப்படுவதற்கு முன் ஒருமுறை இயக்கப்படும்.
     * @param {object} config wdio உள்ளமைவு object
     * @param {Array.<Object>} capabilities capabilities விவரங்களின் பட்டியல்
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * ஒரு worker செயல்முறை உருவாக்கப்படுவதற்கு முன் இயக்கப்படும், மேலும் அந்த worker-க்கான குறிப்பிட்ட சேவையைத்
     * தொடங்கவும், runtime சூழல்களை async முறையில் மாற்றவும் பயன்படுத்தலாம்.
     * @param  {string} cid      capability id (எ.கா 0-0)
     * @param  {object} caps     worker-இல் உருவாக்கப்படும் அமர்வுக்கான capabilities கொண்ட object
     * @param  {object} specs    worker செயல்முறையில் இயக்கப்பட வேண்டிய specs
     * @param  {object} args     worker தொடங்கப்பட்டவுடன் முதன்மை உள்ளமைவுடன் இணைக்கப்படும் object
     * @param  {object} execArgv worker செயல்முறைக்கு அனுப்பப்படும் string arguments-இன் பட்டியல்
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * ஒரு worker செயல்முறை வெளியேறிய பிறகு இயக்கப்படும்.
     * @param  {string} cid      capability id (எ.கா 0-0)
     * @param  {number} exitCode 0 - வெற்றி, 1 - தோல்வி
     * @param  {object} specs    worker செயல்முறையில் இயக்கப்பட வேண்டிய specs
     * @param  {number} retries  பயன்படுத்தப்பட்ட மறுமுயற்சிகளின் எண்ணிக்கை
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * webdriver அமர்வு மற்றும் டெஸ்ட் framework-ஐத் தொடங்குவதற்கு முன் இயக்கப்படும். capability அல்லது spec-ஐப்
     * பொறுத்து உள்ளமைவுகளை மாற்ற இது உங்களை அனுமதிக்கிறது.
     * @param {object} config wdio உள்ளமைவு object
     * @param {Array.<Object>} capabilities capabilities விவரங்களின் பட்டியல்
     * @param {Array.<String>} specs இயக்கப்பட வேண்டிய spec கோப்பு paths-இன் பட்டியல்
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * டெஸ்ட் இயக்கம் தொடங்குவதற்கு முன் இயக்கப்படும். இந்த நேரத்தில் `browser` போன்ற அனைத்து global
     * மாறிகளையும் அணுகலாம். தனிப்பயன் கட்டளைகளை வரையறுக்க இது சரியான இடம்.
     * @param {Array.<Object>} capabilities capabilities விவரங்களின் பட்டியல்
     * @param {Array.<String>} specs        இயக்கப்பட வேண்டிய spec கோப்பு paths-இன் பட்டியல்
     * @param {object}         browser      உருவாக்கப்பட்ட browser/device அமர்வின் instance
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * suite தொடங்குவதற்கு முன் இயக்கப்படும் (Mocha/Jasmine-இல் மட்டும்).
     * @param {object} suite suite விவரங்கள்
     */
    beforeSuite: function (suite) {
    },
    /**
     * suite-க்குள் உள்ள ஒவ்வொரு hook-உம் தொடங்குவதற்கு _முன்_ இந்த hook இயக்கப்படும்.
     * (உதாரணமாக, Mocha-வில் `before`, `beforeEach`, `after`, `afterEach` ஆகியவற்றை அழைப்பதற்கு முன் இது இயங்கும்.). Cucumber-இல் `context` என்பது World object ஆகும்.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * suite-க்குள் உள்ள ஒவ்வொரு hook-உம் முடிந்த _பிறகு_ இயக்கப்படும் hook.
     * (உதாரணமாக, Mocha-வில் `before`, `beforeEach`, `after`, `afterEach` ஆகியவற்றை அழைத்த பிறகு இது இயங்கும்.). Cucumber-இல் `context` என்பது World object ஆகும்.
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * ஒரு டெஸ்ட்டுக்கு முன் இயக்கப்பட வேண்டிய செயல்பாடு (Mocha/Jasmine-இல் மட்டும்)
     * @param {object} test    test object
     * @param {object} context டெஸ்ட் இயக்கப்பட்ட scope object
     */
    beforeTest: function (test, context) {
    },
    /**
     * ஒரு WebdriverIO கட்டளை இயக்கப்படுவதற்கு முன் இயங்கும்.
     * @param {string} commandName hook கட்டளையின் பெயர்
     * @param {Array} args கட்டளை பெறும் arguments
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * ஒரு WebdriverIO கட்டளை இயக்கப்பட்ட பிறகு இயங்கும்
     * @param {string} commandName hook கட்டளையின் பெயர்
     * @param {Array} args கட்டளை பெறும் arguments
     * @param {*} result கட்டளையின் முடிவு
     * @param {Error} error பிழை object, ஏதேனும் இருந்தால்
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * ஒரு டெஸ்ட்டுக்குப் பிறகு இயக்கப்பட வேண்டிய செயல்பாடு (Mocha/Jasmine-இல் மட்டும்)
     * @param {object}  test             test object
     * @param {object}  context          டெஸ்ட் இயக்கப்பட்ட scope object
     * @param {Error}   result.error     டெஸ்ட் தோல்வியடைந்தால் பிழை object, இல்லையெனில் `undefined`
     * @param {*}       result.result    test செயல்பாட்டின் return object
     * @param {number}  result.duration  டெஸ்ட்டின் கால அளவு
     * @param {boolean} result.passed    டெஸ்ட் வெற்றியடைந்தால் true, இல்லையெனில் false
     * @param {object}  result.retries   spec தொடர்பான மறுமுயற்சிகள் பற்றிய தகவல், எ.கா. `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * suite முடிந்த பிறகு இயக்கப்படும் hook (Mocha/Jasmine-இல் மட்டும்).
     * @param {object} suite suite விவரங்கள்
     */
    afterSuite: function (suite) {
    },
    /**
     * அனைத்து டெஸ்ட்களும் முடிந்த பிறகு இயக்கப்படும். டெஸ்டிலிருந்து அனைத்து global மாறிகளையும் நீங்கள்
     * இன்னும் அணுகலாம்.
     * @param {number} result 0 - டெஸ்ட் வெற்றி, 1 - டெஸ்ட் தோல்வி
     * @param {Array.<Object>} capabilities capabilities விவரங்களின் பட்டியல்
     * @param {Array.<String>} specs இயக்கப்பட்ட spec கோப்பு paths-இன் பட்டியல்
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * webdriver அமர்வை முடித்த உடனேயே இயக்கப்படும்.
     * @param {object} config wdio உள்ளமைவு object
     * @param {Array.<Object>} capabilities capabilities விவரங்களின் பட்டியல்
     * @param {Array.<String>} specs இயக்கப்பட்ட spec கோப்பு paths-இன் பட்டியல்
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * அனைத்து workers-உம் நிறுத்தப்பட்டு, செயல்முறை வெளியேறவிருக்கும்போது இயக்கப்படும்.
     * `onComplete` hook-இல் எறியப்படும் பிழை, டெஸ்ட் இயக்கம் தோல்வியடைய வழிவகுக்கும்.
     * @param {object} exitCode 0 - வெற்றி, 1 - தோல்வி
     * @param {object} config wdio உள்ளமைவு object
     * @param {Array.<Object>} capabilities capabilities விவரங்களின் பட்டியல்
     * @param {<Object>} results டெஸ்ட் முடிவுகளைக் கொண்ட object
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * புதுப்பித்தல் (refresh) நிகழும்போது இயக்கப்படும்.
    * @param {string} oldSessionId பழைய அமர்வின் session ID
    * @param {string} newSessionId புதிய அமர்வின் session ID
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * Cucumber Hooks
     *
     * ஒரு Cucumber Feature-க்கு முன் இயங்கும்.
     * @param {string}                   uri      feature கோப்பிற்கான path
     * @param {GherkinDocument.IFeature} feature  Cucumber feature object
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * ஒரு Cucumber Scenario-க்கு முன் இயங்கும்.
     * @param {ITestCaseHookParameter} world    pickle மற்றும் test step பற்றிய தகவல்களைக் கொண்ட world object
     * @param {object}                 context  Cucumber World object
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * ஒரு Cucumber Step-க்கு முன் இயங்கும்.
     * @param {Pickle.IPickleStep} step     step தரவு
     * @param {IPickle}            scenario scenario pickle
     * @param {object}             context  Cucumber World object
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * ஒரு Cucumber Step-க்குப் பிறகு இயங்கும்.
     * @param {Pickle.IPickleStep} step             step தரவு
     * @param {IPickle}            scenario         scenario pickle
     * @param {object}             result           scenario முடிவுகளைக் கொண்ட results object
     * @param {boolean}            result.passed    scenario வெற்றியடைந்தால் true
     * @param {string}             result.error     scenario தோல்வியடைந்தால் error stack
     * @param {number}             result.duration  scenario-வின் கால அளவு மில்லிவினாடிகளில்
     * @param {object}             context          Cucumber World object
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * ஒரு Cucumber Scenario-க்குப் பிறகு இயங்கும்.
     * @param {ITestCaseHookParameter} world            pickle மற்றும் test step பற்றிய தகவல்களைக் கொண்ட world object
     * @param {object}                 result           scenario முடிவுகளைக் கொண்ட results object `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    scenario வெற்றியடைந்தால் true
     * @param {string}                 result.error     scenario தோல்வியடைந்தால் error stack
     * @param {number}                 result.duration  scenario-வின் கால அளவு மில்லிவினாடிகளில்
     * @param {object}                 context          Cucumber World object
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * ஒரு Cucumber Feature-க்குப் பிறகு இயங்கும்.
     * @param {string}                   uri      feature கோப்பிற்கான path
     * @param {GherkinDocument.IFeature} feature  Cucumber feature object
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * WebdriverIO assertion library ஒரு assertion செய்வதற்கு முன் இயங்கும்.
     * @param {object} params                 assertion தகவல்
     * @param {string} params.matcherName     டெஸ்ட் அழைத்த matcher-இன் பெயர் (alias எனில், alias பெயர்)
     * @param {*}      params.expectedValue   matcher-க்கு அனுப்பப்படும் மதிப்பு
     * @param {object} params.options         assertion விருப்பங்கள்
     */
    beforeAssertion: function (params) {
    },
    /**
     * WebdriverIO assertion library ஒரு assertion செய்த பிறகு இயங்கும்.
     * @param {object} params                 assertion தகவல், `beforeAssertion`-இல் உள்ளதைப் போலவே
     * @param {object} params.result          `pass` (boolean) மற்றும் `message()` கொண்ட matcher-இன் முடிவு.
     *                                        மதிப்பு பொருந்தும்போது `pass` true ஆகும், `.not` உடனும் கூட
     */
    afterAssertion: function (params) {
    }
}
```

சாத்தியமான அனைத்து விருப்பங்கள் மற்றும் வகைகளைக் கொண்ட கோப்பை [example folder](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js)-இலும் காணலாம்.