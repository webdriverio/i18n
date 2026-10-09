---
id: configurationfile
title: कॉन्फ़िगरेशन फ़ाइल
description: "एक एनोटेटेड उदाहरण wdio.conf.js देखें, जिसमें हर समर्थित testrunner विकल्प, capability और hook को स्पष्टीकरण के साथ सूचीबद्ध किया गया है।"
---

कॉन्फ़िगरेशन फ़ाइल में आपके टेस्ट सूट को चलाने के लिए सभी आवश्यक जानकारी होती है। यह एक NodeJS मॉड्यूल है जो एक JSON एक्सपोर्ट करता है।

यहाँ सभी समर्थित प्रॉपर्टीज़ और अतिरिक्त जानकारी के साथ एक उदाहरण कॉन्फ़िगरेशन दिया गया है:

```js
export const config = {

    // ==================================
    // आपका टेस्ट कहाँ लॉन्च होना चाहिए
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // सर्वर कॉन्फ़िगरेशन
    // =====================
    // चल रहे Selenium सर्वर का होस्ट एड्रेस। यह जानकारी आमतौर पर अनावश्यक होती है, क्योंकि
    // WebdriverIO अपने आप localhost से कनेक्ट हो जाता है। साथ ही, यदि आप Sauce Labs, Browserstack, Testing Bot या TestMu AI (पूर्व में LambdaTest) जैसी
    // समर्थित क्लाउड सेवाओं में से किसी एक का उपयोग कर रहे हैं, तो भी आपको
    // host और port की जानकारी परिभाषित करने की आवश्यकता नहीं है (क्योंकि WebdriverIO इसे
    // आपकी user और key जानकारी से पता लगा सकता है)। हालाँकि, यदि आप एक निजी Selenium
    // बैकएंड का उपयोग कर रहे हैं, तो आपको यहाँ `hostname`, `port`, और `path` परिभाषित करना चाहिए।
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // प्रोटोकॉल: http | https
    // protocol: 'http',
    //
    // =================
    // सेवा प्रदाता
    // =================
    // WebdriverIO, Sauce Labs, Browserstack, Testing Bot और TestMu AI (पूर्व में LambdaTest) को सपोर्ट करता है। (अन्य क्लाउड प्रदाताओं
    // को भी काम करना चाहिए।) ये सेवाएँ विशिष्ट `user` और `key` (या access key)
    // मान परिभाषित करती हैं, जिन्हें इन सेवाओं से कनेक्ट करने के लिए आपको यहाँ डालना होगा।
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // यदि आप अपने टेस्ट Sauce Labs पर चलाते हैं, तो आप `region` प्रॉपर्टी के माध्यम से वह region निर्दिष्ट कर सकते हैं
    // जिसमें आप अपने टेस्ट चलाना चाहते हैं। regions के लिए उपलब्ध शॉर्ट हैंडल `us` (डिफ़ॉल्ट) और `eu` हैं।
    // ये regions Sauce Labs VM क्लाउड और Sauce Labs Real Device Cloud के लिए उपयोग किए जाते हैं।
    // यदि आप region प्रदान नहीं करते हैं, तो यह डिफ़ॉल्ट रूप से `us` होता है।
    region: 'us',
    //
    // Sauce Labs एक [headless offering](https://saucelabs.com/products/web-testing/sauce-headless-testing) प्रदान करता है
    // जो आपको Chrome और Firefox टेस्ट headless मोड में चलाने की अनुमति देता है।
    //
    headless: false,
    //
    // ==================
    // टेस्ट फ़ाइलें निर्दिष्ट करें
    // ==================
    // परिभाषित करें कि कौन से टेस्ट specs चलने चाहिए। पैटर्न चलाई जा रही कॉन्फ़िगरेशन फ़ाइल की
    // डायरेक्टरी के सापेक्ष होता है।
    //
    // specs को spec फ़ाइलों के एक array के रूप में परिभाषित किया जाता है (वैकल्पिक रूप से wildcards का उपयोग करके
    // जिन्हें विस्तारित किया जाएगा)। प्रत्येक spec फ़ाइल का टेस्ट एक अलग
    // worker प्रोसेस में चलाया जाएगा। spec फ़ाइलों के एक समूह को एक ही worker
    // प्रोसेस में चलाने के लिए, उन्हें specs array के भीतर एक array में रखें।
    //
    // spec फ़ाइलों का path कॉन्फ़िग फ़ाइल की डायरेक्टरी के सापेक्ष resolve किया जाएगा,
    // जब तक कि वह absolute न हो।
    //
    specs: [
        'test/spec/**',
        ['group/spec/**']
    ],
    // बाहर रखने के लिए पैटर्न।
    exclude: [
        'test/spec/multibrowser/**',
        'test/spec/mobile/**'
    ],
    //
    // ============
    // Capabilities
    // ============
    // अपनी capabilities यहाँ परिभाषित करें। WebdriverIO एक ही समय में कई capabilities चला सकता है।
    // capabilities की संख्या के आधार पर, WebdriverIO कई टेस्ट
    // सेशन लॉन्च करता है। अपनी `capabilities` के भीतर, आप `wdio:specs` और `wdio:exclude` के साथ यह ओवरराइट कर सकते हैं
    // कि कौन सी फ़ाइलें चलें, ताकि विशिष्ट specs को किसी विशिष्ट capability के साथ समूहित किया जा सके।
    //
    // सबसे पहले, आप परिभाषित कर सकते हैं कि एक ही समय में कितने instances शुरू होने चाहिए। मान लीजिए
    // आपके पास 3 अलग-अलग capabilities (Chrome, Firefox, और Safari) हैं और आपने
    // `maxInstances` को 1 पर सेट किया है। wdio 3 प्रोसेस शुरू करेगा।
    //
    // इसलिए, यदि आपके पास 10 spec फ़ाइलें हैं और आप `maxInstances` को 10 पर सेट करते हैं, तो सभी spec फ़ाइलें
    // एक ही समय में टेस्ट की जाएँगी और 30 प्रोसेस शुरू होंगे।
    //
    // यह प्रॉपर्टी नियंत्रित करती है कि एक ही टेस्ट की कितनी capabilities टेस्ट चलाएँ।
    //
    maxInstances: 10,
    //
    // या किसी विशिष्ट capability के साथ टेस्ट चलाने के लिए एक सीमा निर्धारित करें।
    maxInstancesPerCapability: 10,
    //
    // WebdriverIO के globals (जैसे `browser`, `$` और `$$`) को global environment में डालता है।
    // यदि आप इसे `false` पर सेट करते हैं, तो आपको `@wdio/globals` से import करना चाहिए। नोट: WebdriverIO
    // टेस्ट फ्रेमवर्क-विशिष्ट globals के injection को हैंडल नहीं करता है।
    //
    injectGlobals: true,
    //
    // यदि आपको सभी महत्वपूर्ण capabilities को एक साथ जोड़ने में परेशानी हो रही है, तो
    // Sauce Labs platform configurator देखें - यह आपकी capabilities को कॉन्फ़िगर करने के लिए एक बेहतरीन टूल है:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // chrome को headless चलाने के लिए निम्नलिखित flags आवश्यक हैं
        // (देखें https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // कुछ या सभी डिफ़ॉल्ट flags को अनदेखा करने के लिए पैरामीटर
        // - यदि मान true है: सभी DevTools 'default flags' और Puppeteer 'default arguments' को अनदेखा करें
        // - यदि मान एक array है: DevTools दिए गए डिफ़ॉल्ट arguments को फ़िल्टर करता है
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstances को प्रति capability ओवरराइट किया जा सकता है। इसलिए यदि आपके पास एक in-house Selenium
        // grid है जिसमें केवल 5 firefox instances उपलब्ध हैं, तो आप सुनिश्चित कर सकते हैं कि एक समय में
        // 5 से अधिक instances शुरू न हों।
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // Firefox headless मोड सक्रिय करने के लिए flag (moz:firefoxOptions के बारे में अधिक जानकारी के लिए https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities देखें)
          // args: ['-headless']
        },
        // यदि outputDir प्रदान किया गया है, तो WebdriverIO driver session logs कैप्चर कर सकता है
        // यह कॉन्फ़िगर करना संभव है कि किन logTypes को बाहर रखा जाए।
        // excludeDriverLogs: ['*'], // सभी driver session logs को बाहर रखने के लिए '*' पास करें
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // कुछ या सभी Puppeteer डिफ़ॉल्ट arguments को अनदेखा करने के लिए पैरामीटर
        // ignoreDefaultArgs: ['-foreground'], // सभी डिफ़ॉल्ट arguments को अनदेखा करने के लिए मान true पर सेट करें
    }],
    //
    // child processes शुरू करते समय उपयोग किए जाने वाले node arguments की अतिरिक्त सूची
    execArgv: [],
    //
    // ===================
    // टेस्ट कॉन्फ़िगरेशन
    // ===================
    // WebdriverIO instance के लिए प्रासंगिक सभी विकल्प यहाँ परिभाषित करें
    //
    // लॉगिंग verbosity का स्तर: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // प्रति logger विशिष्ट log levels सेट करें
    // logger को अक्षम करने के लिए 'silent' level का उपयोग करें
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // सभी logs संग्रहीत करने के लिए डायरेक्टरी सेट करें
    outputDir: __dirname,
    //
    // यदि आप अपने टेस्ट केवल तब तक चलाना चाहते हैं जब तक कि एक निश्चित संख्या में टेस्ट विफल न हो जाएँ, तो
    // bail का उपयोग करें (डिफ़ॉल्ट 0 है - bail न करें, सभी टेस्ट चलाएँ)।
    bail: 0,
    //
    // `url()` कमांड कॉल को छोटा करने के लिए एक base URL सेट करें। यदि आपका `url` पैरामीटर
    // `/` से शुरू होता है, तो `baseUrl` आगे जोड़ा जाता है, `baseUrl` के path भाग को शामिल किए बिना।
    //
    // यदि आपका `url` पैरामीटर बिना scheme या `/` के शुरू होता है (जैसे `some/path`), तो `baseUrl`
    // सीधे आगे जोड़ दिया जाता है।
    baseUrl: 'http://localhost:8080',
    //
    // सभी waitForXXX कमांड्स के लिए डिफ़ॉल्ट timeout।
    waitforTimeout: 1000,
    //
    // `--watch` flag के साथ `wdio` कमांड चलाते समय watch करने के लिए फ़ाइलें जोड़ें (जैसे application code या page objects)।
    // Globbing सपोर्टेड है।
    filesToWatch: [
        // उदा. यदि मैं अपना application code बदलूँ तो टेस्ट फिर से चलाएँ
        // './app/**/*.js'
    ],
    //
    // वह फ्रेमवर्क जिसके साथ आप अपने specs चलाना चाहते हैं।
    // निम्नलिखित सपोर्टेड हैं: 'mocha', 'jasmine', और 'cucumber'
    // यह भी देखें: https://webdriver.io/docs/frameworks.html
    //
    // कोई भी टेस्ट चलाने से पहले सुनिश्चित करें कि आपने विशिष्ट फ्रेमवर्क के लिए wdio adapter पैकेज इंस्टॉल किया है।
    framework: 'mocha',
    //
    // पूरी specfile के समग्र रूप से विफल होने पर उसे दोबारा चलाने की संख्या
    specFileRetries: 1,
    // spec फ़ाइल retry प्रयासों के बीच सेकंड में देरी
    specFileRetriesDelay: 0,
    // retry की गई spec फ़ाइलों को तुरंत retry किया जाए या queue के अंत तक टाल दिया जाए
    specFileRetriesDeferred: false,
    //
    // stdout के लिए टेस्ट reporter।
    // डिफ़ॉल्ट रूप से केवल 'dot' सपोर्टेड है
    // यह भी देखें: https://webdriver.io/docs/dot-reporter.html , और बाएँ कॉलम में "Reporters" पर क्लिक करें
    reporters: [
        'dot',
        ['allure', {
            //
            // यदि आप "allure" reporter का उपयोग कर रहे हैं, तो आपको वह डायरेक्टरी परिभाषित करनी चाहिए जहाँ
            // WebdriverIO को सभी allure रिपोर्ट्स सहेजनी चाहिए।
            outputDir: './'
        }]
    ],
    //
    // Mocha को पास किए जाने वाले विकल्प।
    // पूरी सूची यहाँ देखें: http://mochajs.org
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // Jasmine को पास किए जाने वाले विकल्प।
    // यह भी देखें: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // Jasmine डिफ़ॉल्ट timeout
        defaultTimeoutInterval: 5000,
        //
        // Jasmine फ्रेमवर्क परिणाम के आधार पर application या वेबसाइट की स्थिति को लॉग करने के लिए
        // प्रत्येक assertion को intercept करने की अनुमति देता है। उदाहरण के लिए, हर बार
        // assertion विफल होने पर screenshot लेना काफी उपयोगी होता है।
        expectationResultHandler: function(passed, assertion) {
            // कुछ करें
        },
        //
        // Jasmine-विशिष्ट grep कार्यक्षमता का उपयोग करें
        grep: null,
        invertGrep: null
    },
    //
    // यदि आप Cucumber का उपयोग कर रहे हैं, तो आपको निर्दिष्ट करना होगा कि आपकी step definitions कहाँ स्थित हैं।
    // यह भी देखें: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (file/dir) features को execute करने से पहले फ़ाइलें require करें
        backtrace: false,   // <boolean> errors के लिए पूरा backtrace दिखाएँ
        compiler: [],       // <string[]> ("extension:module") MODULE को require करने के बाद दिए गए EXTENSION वाली फ़ाइलें require करें (दोहराने योग्य)
        dryRun: false,      // <boolean> steps को execute किए बिना formatters को invoke करें
        failFast: false,    // <boolean> पहली विफलता पर रन रोक दें
        snippets: true,     // <boolean> pending steps के लिए step definition snippets छिपाएँ
        source: true,       // <boolean> source URIs छिपाएँ
        strict: false,      // <boolean> यदि कोई undefined या pending steps हैं तो विफल करें
        tags: '',           // <string> (expression) केवल उन features या scenarios को execute करें जिनके tags expression से मेल खाते हैं
        timeout: 20000,     // <number> step definitions के लिए timeout
        ignoreUndefinedDefinitions: false, // <boolean> undefined definitions को warnings के रूप में मानने के लिए इस config को सक्षम करें।
        scenarioLevelReporter: false // webdriver.io को ऐसा व्यवहार करने के लिए सक्षम करें मानो steps नहीं बल्कि scenarios ही टेस्ट थे।
    },
    // एक कस्टम tsconfig path निर्दिष्ट करें - WDIO TypeScript फ़ाइलों को compile करने के लिए `tsx` का उपयोग करता है
    // आपका TSConfig वर्तमान working directory से स्वचालित रूप से पता लगाया जाता है
    // लेकिन आप यहाँ या TSX_TSCONFIG_PATH env var सेट करके एक कस्टम path निर्दिष्ट कर सकते हैं
    // `tsx` docs देखें: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // नोट: यदि TSX_TSCONFIG_PATH env var और/या cli --tsConfigPath argument निर्दिष्ट हैं, तो यह सेटिंग उनके द्वारा ओवरराइड हो जाएगी।
    // यदि node, tsx की सहायता के बिना आपकी wdio.conf.ts फ़ाइल को parse करने में असमर्थ है, तो यह सेटिंग अनदेखी कर दी जाएगी, उदा. यदि आपने
    // tsconfig.json में path aliases सेटअप किए हैं और आप उन path aliases का उपयोग अपनी wdio.config.ts फ़ाइल के अंदर करते हैं।
    // इसका उपयोग केवल तभी करें जब आप .js config फ़ाइल का उपयोग कर रहे हों या आपकी .ts config फ़ाइल वैध JavaScript हो।
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO कई hooks प्रदान करता है जिनका उपयोग आप टेस्ट प्रक्रिया में हस्तक्षेप करने के लिए कर सकते हैं, ताकि उसे बेहतर बनाया जा सके
    // और उसके इर्द-गिर्द services बनाई जा सकें। आप इस पर या तो एक single function लागू कर सकते हैं या methods का
    // एक array। यदि उनमें से कोई एक promise लौटाता है, तो WebdriverIO जारी रखने के लिए उस promise के
    // resolve होने तक प्रतीक्षा करेगा।
    //
    /**
     * सभी workers के लॉन्च होने से पहले एक बार execute होता है।
     * @param {object} config wdio कॉन्फ़िगरेशन ऑब्जेक्ट
     * @param {Array.<Object>} capabilities capabilities विवरणों की सूची
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * किसी worker प्रोसेस के spawn होने से पहले execute होता है और इसका उपयोग उस worker के लिए विशिष्ट service
     * को initialize करने के साथ-साथ async तरीके से runtime environments को संशोधित करने के लिए किया जा सकता है।
     * @param  {string} cid      capability id (उदा. 0-0)
     * @param  {object} caps     वह ऑब्जेक्ट जिसमें उस सेशन के लिए capabilities हैं जो worker में spawn होगा
     * @param  {object} specs    worker प्रोसेस में चलाए जाने वाले specs
     * @param  {object} args     वह ऑब्जेक्ट जो worker के initialize होने के बाद मुख्य कॉन्फ़िगरेशन के साथ merge किया जाएगा
     * @param  {object} execArgv worker प्रोसेस को पास किए गए string arguments की सूची
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * किसी worker प्रोसेस के exit होने के बाद execute होता है।
     * @param  {string} cid      capability id (उदा. 0-0)
     * @param  {number} exitCode 0 - सफल, 1 - विफल
     * @param  {object} specs    worker प्रोसेस में चलाए जाने वाले specs
     * @param  {number} retries  उपयोग किए गए retries की संख्या
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * webdriver सेशन और टेस्ट फ्रेमवर्क को initialize करने से पहले execute होता है। यह आपको
     * capability या spec के आधार पर कॉन्फ़िगरेशन में बदलाव करने की अनुमति देता है।
     * @param {object} config wdio कॉन्फ़िगरेशन ऑब्जेक्ट
     * @param {Array.<Object>} capabilities capabilities विवरणों की सूची
     * @param {Array.<String>} specs चलाई जाने वाली spec फ़ाइल paths की सूची
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * टेस्ट execution शुरू होने से पहले execute होता है। इस बिंदु पर आप `browser` जैसे सभी global
     * variables तक पहुँच सकते हैं। यह कस्टम कमांड्स परिभाषित करने के लिए एकदम सही जगह है।
     * @param {Array.<Object>} capabilities capabilities विवरणों की सूची
     * @param {Array.<String>} specs        चलाई जाने वाली spec फ़ाइल paths की सूची
     * @param {object}         browser      बनाए गए browser/device सेशन का instance
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * suite शुरू होने से पहले execute होता है (केवल Mocha/Jasmine में)।
     * @param {object} suite suite विवरण
     */
    beforeSuite: function (suite) {
    },
    /**
     * यह hook suite के भीतर हर hook के शुरू होने से _पहले_ execute होता है।
     * (उदाहरण के लिए, यह Mocha में `before`, `beforeEach`, `after`, `afterEach` को कॉल करने से पहले चलता है।)। Cucumber में `context` World ऑब्जेक्ट है।
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * वह hook जो suite के भीतर हर hook के समाप्त होने के _बाद_ execute होता है।
     * (उदाहरण के लिए, यह Mocha में `before`, `beforeEach`, `after`, `afterEach` को कॉल करने के बाद चलता है।)। Cucumber में `context` World ऑब्जेक्ट है।
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * किसी टेस्ट से पहले execute किया जाने वाला function (केवल Mocha/Jasmine में)
     * @param {object} test    टेस्ट ऑब्जेक्ट
     * @param {object} context वह scope ऑब्जेक्ट जिसके साथ टेस्ट execute किया गया था
     */
    beforeTest: function (test, context) {
    },
    /**
     * किसी WebdriverIO कमांड के execute होने से पहले चलता है।
     * @param {string} commandName hook कमांड का नाम
     * @param {Array} args वे arguments जो कमांड को प्राप्त होंगे
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * किसी WebdriverIO कमांड के execute होने के बाद चलता है
     * @param {string} commandName hook कमांड का नाम
     * @param {Array} args वे arguments जो कमांड को प्राप्त होंगे
     * @param {*} result कमांड का परिणाम
     * @param {Error} error error ऑब्जेक्ट, यदि कोई हो
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * किसी टेस्ट के बाद execute किया जाने वाला function (केवल Mocha/Jasmine में)
     * @param {object}  test             टेस्ट ऑब्जेक्ट
     * @param {object}  context          वह scope ऑब्जेक्ट जिसके साथ टेस्ट execute किया गया था
     * @param {Error}   result.error     टेस्ट विफल होने की स्थिति में error ऑब्जेक्ट, अन्यथा `undefined`
     * @param {*}       result.result    टेस्ट function का return ऑब्जेक्ट
     * @param {number}  result.duration  टेस्ट की अवधि
     * @param {boolean} result.passed    यदि टेस्ट पास हुआ है तो true, अन्यथा false
     * @param {object}  result.retries   spec से संबंधित retries के बारे में जानकारी, उदा. `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * वह hook जो suite के समाप्त होने के बाद execute होता है (केवल Mocha/Jasmine में)।
     * @param {object} suite suite विवरण
     */
    afterSuite: function (suite) {
    },
    /**
     * सभी टेस्ट पूरे होने के बाद execute होता है। आपके पास अभी भी टेस्ट के सभी global variables
     * तक पहुँच होती है।
     * @param {number} result 0 - टेस्ट पास, 1 - टेस्ट फ़ेल
     * @param {Array.<Object>} capabilities capabilities विवरणों की सूची
     * @param {Array.<String>} specs चलाई गई spec फ़ाइल paths की सूची
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * webdriver सेशन समाप्त करने के ठीक बाद execute होता है।
     * @param {object} config wdio कॉन्फ़िगरेशन ऑब्जेक्ट
     * @param {Array.<Object>} capabilities capabilities विवरणों की सूची
     * @param {Array.<String>} specs चलाई गई spec फ़ाइल paths की सूची
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * सभी workers के बंद होने और प्रोसेस के exit होने वाला होने के बाद execute होता है।
     * `onComplete` hook में throw की गई error के परिणामस्वरूप टेस्ट रन विफल हो जाएगा।
     * @param {object} exitCode 0 - सफल, 1 - विफल
     * @param {object} config wdio कॉन्फ़िगरेशन ऑब्जेक्ट
     * @param {Array.<Object>} capabilities capabilities विवरणों की सूची
     * @param {<Object>} results टेस्ट परिणामों वाला ऑब्जेक्ट
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * refresh होने पर execute होता है।
    * @param {string} oldSessionId पुराने सेशन का session ID
    * @param {string} newSessionId नए सेशन का session ID
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * Cucumber Hooks
     *
     * किसी Cucumber Feature से पहले चलता है।
     * @param {string}                   uri      feature फ़ाइल का path
     * @param {GherkinDocument.IFeature} feature  Cucumber feature ऑब्जेक्ट
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * किसी Cucumber Scenario से पहले चलता है।
     * @param {ITestCaseHookParameter} world    pickle और test step की जानकारी वाला world ऑब्जेक्ट
     * @param {object}                 context  Cucumber World ऑब्जेक्ट
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * किसी Cucumber Step से पहले चलता है।
     * @param {Pickle.IPickleStep} step     step डेटा
     * @param {IPickle}            scenario scenario pickle
     * @param {object}             context  Cucumber World ऑब्जेक्ट
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * किसी Cucumber Step के बाद चलता है।
     * @param {Pickle.IPickleStep} step             step डेटा
     * @param {IPickle}            scenario         scenario pickle
     * @param {object}             result           scenario परिणामों वाला results ऑब्जेक्ट
     * @param {boolean}            result.passed    यदि scenario पास हुआ है तो true
     * @param {string}             result.error     यदि scenario विफल हुआ है तो error stack
     * @param {number}             result.duration  मिलीसेकंड में scenario की अवधि
     * @param {object}             context          Cucumber World ऑब्जेक्ट
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * किसी Cucumber Scenario के बाद चलता है।
     * @param {ITestCaseHookParameter} world            pickle और test step की जानकारी वाला world ऑब्जेक्ट
     * @param {object}                 result           scenario परिणामों वाला results ऑब्जेक्ट `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    यदि scenario पास हुआ है तो true
     * @param {string}                 result.error     यदि scenario विफल हुआ है तो error stack
     * @param {number}                 result.duration  मिलीसेकंड में scenario की अवधि
     * @param {object}                 context          Cucumber World ऑब्जेक्ट
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * किसी Cucumber Feature के बाद चलता है।
     * @param {string}                   uri      feature फ़ाइल का path
     * @param {GherkinDocument.IFeature} feature  Cucumber feature ऑब्जेक्ट
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * WebdriverIO assertion library द्वारा assertion करने से पहले चलता है।
     * @param {object} params                 assertion जानकारी
     * @param {string} params.matcherName     उस matcher का नाम जिसे टेस्ट ने कॉल किया (alias के लिए, alias का नाम)
     * @param {*}      params.expectedValue   वह मान जो matcher में पास किया जाता है
     * @param {object} params.options         assertion विकल्प
     */
    beforeAssertion: function (params) {
    },
    /**
     * WebdriverIO assertion library द्वारा assertion करने के बाद चलता है।
     * @param {object} params                 assertion जानकारी, `beforeAssertion` के समान
     * @param {object} params.result          matcher का परिणाम, `pass` (boolean) और `message()` के साथ।
     *                                        जब मान मेल खाता है तो `pass` true होता है, `.not` के साथ भी
     */
    afterAssertion: function (params) {
    }
}
```

आप [example folder](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js) में सभी संभावित विकल्पों और विविधताओं वाली एक फ़ाइल भी पा सकते हैं।