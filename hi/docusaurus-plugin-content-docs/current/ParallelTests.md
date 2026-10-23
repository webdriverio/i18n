---
id: parallel-tests
title: एक Spec फ़ाइल में Parallel Tests
description: "एक spec फ़ाइल के Mocha tests या Cucumber scenarios को एक ही समय पर चलाएँ, हर एक को उसके अपने WebDriver BiDi browsing context में, mochaOpts.parallelMode या cucumberOpts.parallelMode के साथ। यह browser pooling का एक रूप है, जो Playwright के fullyParallel के समान है।"
---

v10 से, WebdriverIO एक spec फ़ाइल के tests को एक ही समय पर चला सकता है। हर Mocha `it()` या Cucumber scenario को एक worker और एक browser session में उसकी अपनी browser window (एक WebDriver BiDi [browsing context](https://w3c.github.io/webdriver-bidi/#browsing-context)) मिलती है। इसका उपयोग उन spec फ़ाइलों के लिए करें जिनमें कई स्वतंत्र tests हैं: वे तेज़ी से पूरे होते हैं, और आपको अधिक worker processes या browser sessions की ज़रूरत नहीं होती, क्योंकि हर test को केवल एक window खोलने की लागत चुकानी पड़ती है।

यह browser pooling का एक रूप है: tests एक browser में windows का एक pool साझा करते हैं, browsers का pool नहीं। यदि आप Playwright से आ रहे हैं, तो `parallelMode: 'userContexts'` [`fullyParallel: true`](https://playwright.dev/docs/test-parallel#parallelize-tests-in-a-single-file) के सबसे निकट समतुल्य है: हर test को उसका अपना isolated context मिलता है। अंतर यह है कि Playwright एक फ़ाइल के tests को worker processes में बाँटता है, जिनमें से हर एक का अपना browser होता है, जबकि WebdriverIO उन्हें एक worker और एक browser में एक ही समय पर चलाता है।

यह [`maxInstances`](./OrganizingTestSuites.md) से अलग है, जो पूरी spec फ़ाइलों को parallel में चलाता है, हर spec के लिए एक worker और एक session। आप दोनों को मिला सकते हैं: `maxInstances` तय करता है कि कितनी spec फ़ाइलें एक ही समय पर चलें, और `maxParallelContexts` तय करता है कि उनमें से हर फ़ाइल के अंदर कितने tests एक ही समय पर चलें।

:::warning Experimental
Parallel mode के लिए experimental `'wdio:experimentalBiDiCommands'` capability आवश्यक है, जो हर test में element commands के implementation को बदल देती है, केवल parallel tests में नहीं। देखें [BiDi element commands के व्यवहार में बदलाव](#behavior-changes-of-the-bidi-element-commands)।
:::

## Parallel mode सक्षम करें

आपको चाहिए:

- एक WebDriver BiDi session (डिफ़ॉल्ट, जब तक आप `'wdio:enforceWebDriverClassic': true` सेट नहीं करते),
- `'wdio:experimentalBiDiCommands': true` capability,
- `@wdio/mocha-framework` या `@wdio/cucumber-framework`। Jasmine parallel mode को support नहीं करता।

यदि session BiDi का उपयोग नहीं करता, या capability मौजूद नहीं है, तो WebdriverIO एक warning log करता है और tests को एक के बाद एक चलाता है। `parallelMode` के बिना कुछ भी नहीं बदलता।

### Mocha

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    specs: ['./test/specs/**/*.e2e.ts'],
    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome',
        'wdio:experimentalBiDiCommands': true
    }],
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
        parallelMode: 'contexts',
        maxParallelContexts: 4
    }
}
```

Spec फ़ाइल में किसी बदलाव की ज़रूरत नहीं है:

```ts title="test/specs/pages.e2e.ts"
import { browser, $, expect } from '@wdio/globals'

describe('webdriver.io', () => {
    it('shows the API page', async () => {
        await browser.url('https://webdriver.io/docs/api')
        await expect($('h1')).toHaveText('Introduction')
    })

    it('shows the getting started page', async () => {
        await browser.url('https://webdriver.io/docs/gettingstarted')
        await expect($('h1')).toHaveText('Getting Started')
    })
})
```

दोनों tests एक ही समय पर चलते हैं, हर एक अपनी window में। `browser.url()`, `$()` और `expect()` उस test की window पर काम करते हैं जो उन्हें call करता है।

### Cucumber

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    specs: ['./features/**/*.feature'],
    capabilities: [{
        browserName: 'chrome',
        'wdio:experimentalBiDiCommands': true
    }],
    framework: 'cucumber',
    cucumberOpts: {
        require: ['./features/step-definitions/**/*.ts'],
        parallelMode: 'contexts',
        maxParallelContexts: 4
    }
}
```

किसी feature फ़ाइल का हर scenario अपनी window में चलता है। Profiles (`cucumberOpts.profiles`, `cucumberOpts.file`), line numbers वाले specs (`--spec ./features/login.feature:5`) और `tags`, `name`, `order`, `strict`, `dryRun`, `failFast`, `retry` तथा `retryTagFilter` options sequential run की तरह ही काम करते हैं। Features, scenarios, steps और hooks sequential run की तरह ही report किए जाते हैं, `ignoreUndefinedDefinitions`, `failAmbiguousDefinitions`, `tagsInTitle` और `scenarioLevelReporter` के साथ भी।

## Options

| Option | मान | डिफ़ॉल्ट | विवरण |
| --- | --- | --- | --- |
| `parallelMode` | `'contexts'`, `'userContexts'` | सेट नहीं (sequential) | Parallel mode चालू करता है और तय करता है कि tests कितना साझा करें। |
| `maxParallelContexts` | number | `os.cpus().length` | कितने tests एक ही समय पर चलें। |

दोनों को `mochaOpts` या `cucumberOpts` में सेट करें।

`maxParallelContexts` slots की संख्या तय करता है। हर slot एक समय में एक test चलाता है, वर्तमान test के चलते समय अपने अगले test के लिए window खोलता है, और पिछली window को background में बंद करता है। इसलिए थोड़े समय के लिए 3 × `maxParallelContexts` तक windows, साथ में session की पहली window, खुली रह सकती हैं: हर slot में एक live, एक prefetched और एक बंद हो रही window हो सकती है। Parallel mode केवल उन्हीं windows को बंद करता है जिन्हें उसने खोला था।

## `contexts` और `userContexts` में से चुनें

| | `'contexts'` | `'userContexts'` |
| --- | --- | --- |
| हर test के लिए window | हाँ | हाँ |
| Cookies, `localStorage`, service workers | सभी tests द्वारा साझा | हर test के लिए isolated ([user context](https://w3c.github.io/webdriver-bidi/#user-context)) |
| Login | एक बार, यदि tests session cookie का पुनः उपयोग करते हैं | हर test में |
| Driver support | कोई भी BiDi browser | `browser.createUserContext()` support आवश्यक, अन्यथा run fail हो जाता है |

डिफ़ॉल्ट रूप से `'contexts'` चुनें। `'userContexts'` तब चुनें जब tests को एक-दूसरे की cookies या storage नहीं देखनी चाहिए, उदाहरण के लिए ऐसे tests जो अलग-अलग users के रूप में log in करते हैं। `'contexts'` की तरह, `'userContexts'` भी warning के साथ sequential run पर वापस आ जाता है जब session WebDriver BiDi नहीं है या capabilities में `'wdio:experimentalBiDiCommands'` मौजूद नहीं है। यदि driver `browser.createUserContext` को support नहीं करता, तो run वापस आने के बजाय fail हो जाता है।

`browser.newWindow()` window को डिफ़ॉल्ट user context में खोलता है, इसलिए इस तरह खोली गई window test के cookie और storage isolation से बाहर होती है।

## हर test के पास क्या होता है

किसी parallel test के अंदर, ये commands test की अपनी window पर काम करते हैं:

- navigation: `url`, `back`, `forward`, `refresh`, `getUrl`, `getTitle`
- element commands: `$`, `$$`, `shadow$`, `click`, `setValue`, `getText`, `waitFor*` commands, और अन्य
- `execute`, `actions`, `addInitScript`
- cookies: `getCookies`, `setCookies`, `deleteCookies` test के cookie partition का उपयोग करते हैं
- `mock()`: किसी parallel test में बनाया गया mock केवल उस test की window और उसके frames के requests को intercept और record करता है, इसलिए दो tests एक ही URL को mock कर सकते हैं
- screenshots: `saveScreenshot`, `takeElementScreenshot`

## Parallel mode में throw करने वाले Commands

कुछ commands पूरे browser या पूरे session पर काम करते हैं, इसलिए वे किसी एक test की window को target नहीं कर सकते। किसी parallel test के अंदर वे किसी दूसरे test को प्रभावित करने के बजाय throw करते हैं:

| Commands | क्यों | इसके बजाय उपयोग करें |
| --- | --- | --- |
| `getWindowSize`, `setWindowSize` | OS window साझा है | किसी test के page का आकार तय करने के लिए `browser.setViewport()` का उपयोग करें। Parallel tests एक OS window साझा करते हैं |
| `throttleNetwork`, `throttleCPU` | वे पूरे browser पर लागू होते हैं | उन tests को parallel mode के बिना चलाएँ |
| `closeWindow`, `switchToParentFrame` | वे focused window बदलते हैं, जिसे सभी tests साझा करते हैं | हर test को उसकी अपनी window में रखें |
| `reloadSession`, `setTimeout` | वे उस session को बदलते हैं जिसे सभी tests साझा करते हैं | उन्हें `wdio.conf.ts` के `before` hook में call करें |
| `acceptAlert`, `dismissAlert`, `getAlertText`, `sendAlertText` | alerts एक browsing context से संबंधित होते हैं | उन्हें उस context पर call करें जो `browser.url()` लौटाता है: `const page = await browser.url('https://webdriver.io'); await page.acceptAlert()`। `sendAlertText(text)` के बजाय `page.acceptAlert(text)` का उपयोग करें। `dismissAlert()` और `getAlertText()` भी context पर काम करते हैं |
| `getComputedRole`, `getComputedLabel` | WebDriver BiDi उन्हें पढ़ नहीं सकता | उन tests को parallel mode के बिना चलाएँ |

v10 में `switchWindow` को सभी WebDriver BiDi sessions के लिए हटा दिया गया था, केवल parallel mode में नहीं। यह ``switchWindow` was removed for WebDriver BiDi sessions in WebdriverIO v10. Hold the browsing context returned by `browser.url()` or `browser.newWindow()`, or find one with `browser.browsingContexts()`.`` throw करता है। Context पर switch करने के बजाय context object को रखें।

WebdriverIO prompts को स्वचालित रूप से dismiss कर देता है जब तक कि कोई `dialog` event को सुन न रहा हो, इसलिए किसी test से prompt का उत्तर देने से पहले एक listener register करें (`browser.on('dialog', () => {})`)।

हर अन्य WebDriver Classic command भी throw करता है। केवल `status`, `getTimeouts` और `getWindowHandles` की अनुमति है। यदि parallel mode में कोई WebdriverIO command आपके किसी Classic command को call किए बिना WebDriver Classic पर वापस चला जाता है, तो कृपया [इसकी रिपोर्ट करें](https://github.com/webdriverio/webdriverio/issues/new/choose)।

## Hooks और timeouts

### Mocha

- किसी spec फ़ाइल में `before()` और `after()` **हर test के लिए एक बार** चलते हैं, हर `describe` के लिए एक बार नहीं, क्योंकि हर test की अपनी window होती है। हर test अपनी window में `before`, `beforeEach`, test, `afterEach` और `after` चलाता है। जो setup हर spec फ़ाइल के लिए एक बार चलना चाहिए, उसे `wdio.conf.ts` के `beforeSuite` / `afterSuite` hooks में रखें। ये किसी भी test window के बाहर एक बार चलते हैं।
- केवल `mochaOpts.timeout` लागू होता है। किसी test या hook में `this.timeout()` throw करता है, और `it(...).timeout()` या किसी `describe` का timeout warning के साथ ignore कर दिया जाता है। देखें [Mocha timeouts और WebdriverIO hooks](./Timeouts.md#mocha-timeouts-and-the-webdriverio-hooks)।
- `mochaOpts.bail` और `mochaOpts.retries` supported नहीं हैं और run को fail कर देते हैं। `this.retries()` throw करता है।
- `.only()`, `this.skip()`, `grep`, `fgrep` और `invert` sequential run की तरह ही काम करते हैं।

### Cucumber

- `BeforeAll` / `AfterAll` और `wdio.conf.ts` के `beforeFeature` / `afterFeature` hooks हर worker के लिए एक बार चलते हैं, हर feature के लिए एक बार नहीं। `beforeFeature` / `afterFeature` को केवल पहली feature फ़ाइल का uri और feature मिलता है, जो तब मायने रखता है जब एक worker कई feature फ़ाइलें चलाता है, उदाहरण के लिए grouped specs। वे किसी भी scenario की window के बाहर चलते हैं, इसलिए उन्हें ऐसे commands का उपयोग नहीं करना चाहिए जिन्हें window की ज़रूरत हो।
- `Before` / `After`, `BeforeStep` / `AfterStep` और `wdio.conf.ts` के scenario और step hooks हर scenario के लिए, उस scenario की window में चलते हैं।
- WebdriverIO में `cucumberOpts.strict` का डिफ़ॉल्ट `false` है। कोई pending step scenario को केवल `strict: true` के साथ fail करता है।
- `failFast` के साथ, जो scenarios पहले से दूसरी windows में चल रहे हैं वे पहली failure के बाद पूरे होते हैं। जो scenarios शुरू नहीं हुए वे skipped के रूप में report किए जाते हैं, जैसे sequential run में।
- `ignoreUndefinedDefinitions: true` के साथ, एक ambiguous step (`failAmbiguousDefinitions: false` के साथ), या `strict: true` के साथ एक pending step, run को fail कर देता है। Sequential run तब pass होता है।
- Cucumber formatters (`format`, `formatOptions`, `publish`) नहीं चलते, इसलिए वे कोई फ़ाइल नहीं लिखते।

### दोनों frameworks

किसी test की window test पूरा होते ही बंद हो जाती है। ऐसे timers या promises शुरू न करें जो test समाप्त होने के बाद भी चलते रहें।

## BiDi element commands के व्यवहार में बदलाव

`'wdio:experimentalBiDiCommands': true` session के हर test में, sequential हो या parallel, कई element commands के implementation को बदल देता है:

- `addValue` और `clearValue` synthetic DOM events dispatch करते हैं, trusted key events नहीं।
- `getAttribute` property और attribute values के लिए WebDriver नियमों का पालन करता है।
- `click` Actions API के माध्यम से भेजा जाता है।

Classic व्यवहार पर निर्भर tests का पता लगाने के लिए अपनी suite को एक बार capability के साथ और `parallelMode` के बिना चलाएँ।

## Reporters

जो reporters [`@wdio/reporter`](./CustomReporter.md) को extend करते हैं, वे parallel tests को सही suite के अंतर्गत report करते हैं, और किसी command को उस test से जोड़ते हैं जिसके browsing context ने उसे भेजा था।

`@wdio/allure-reporter` Mocha के साथ parallel mode को support करता है। यह किसी test का परिणाम test समाप्त होने पर लिखता है। Parallel mode में `before()` और `after()` hooks हर test के लिए एक बार चलते हैं, इसलिए report उनके fixtures को हर test के लिए एक बार दिखाती है। Cucumber के साथ, Allure अभी parallel mode को support नहीं करता: overlapping scenarios के results, steps और attachments गलत scenario के अंतर्गत आ सकते हैं, इसलिए इसका उपयोग sequential runs के साथ करें।

`@wdio/spec-reporter` अभी parallel mode को support नहीं करता: एक Mocha `describe` block जो किसी दूसरे के बाद आता है, या एक Cucumber scenario जो किसी दूसरे के चलते समय शुरू होता है, उसके अंतर्गत nested दिखाया जाता है, और Cucumber `retry` के साथ passing count गलत हो सकता है। Tests के परिणाम और exit code सही होते हैं।

`@wdio/cucumberjs-json-reporter` अभी parallel mode को support नहीं करता: overlapping scenarios के steps और attachments गलत scenario में आ सकते हैं, और reporter एक warning log करता है। इसका उपयोग sequential runs के साथ करें।

`@wdio/html-reporter` अभी parallel mode को support नहीं करता: किसी दूसरे test के शुरू होने के बाद कोई test जो logs, screenshots और videos भेजता है, वे गलत test के अंतर्गत आ सकते हैं। इसका उपयोग sequential runs के साथ करें।

किसी custom reporter को यह नहीं मानना चाहिए कि कोई test अगले test के शुरू होने से पहले समाप्त हो जाता है। देखें [Reporters और parallel tests](./CustomReporter.md#reporters-and-parallel-tests)।

## Cloud vendors

Cloud vendors हर browser session के लिए एक video, logs का एक set और एक test status record करते हैं। Parallel mode में, कई tests उस session को साझा करते हैं, इसलिए vendor dashboard video, logs या pass/fail status को test के अनुसार विभाजित नहीं कर सकता। `userContexts` के लिए vendor के grid को `browser.createUserContext` (और Mocha के साथ `browser.removeUserContext`) को support करना भी आवश्यक है। Parallel mode को अभी तक किसी भी cloud vendor पर test नहीं किया गया है।

हम अनुशंसा करते हैं कि cloud vendor पर चलाते समय आप parallel mode को बंद रखें और spec फ़ाइलों को parallel में चलाने के लिए [`maxInstances`](./OrganizingTestSuites.md) का उपयोग करें। इसे बंद करने के लिए, framework options से `parallelMode` हटा दें। यदि आप केवल `'wdio:experimentalBiDiCommands'` हटाते हैं, तो tests एक के बाद एक चलते हैं और हर run एक warning log करता है।

## समस्या निवारण

### `parallelMode: "contexts" requires 'wdio:experimentalBiDiCommands': true to be set in capabilities`

Capability में `'wdio:experimentalBiDiCommands': true` जोड़ें। इसके बिना, tests एक के बाद एक चलते हैं। Cucumber के साथ, संदेश `Parallel mode (cucumberOpts.parallelMode: "contexts") requires "wdio:experimentalBiDiCommands" to be set in capabilities` होता है।

### `... is set but the browser session does not support WebDriver Bidi`

Session WebDriver Classic का उपयोग करता है। Capability से `'wdio:enforceWebDriverClassic': true` हटा दें, या WebDriver BiDi support वाले browser और driver का उपयोग करें। Cucumber के साथ, संदेश `Parallel mode (cucumberOpts.parallelMode: "contexts") requires a WebDriver Bidi session. Falling back to sequential execution.` होता है।

### `parallelMode: "userContexts" requires browser.createUserContext and browser.removeUserContext, which this driver does not support`

Driver user contexts नहीं बना सकता। `parallelMode: 'contexts'` का उपयोग करें या browser और driver को update करें। Cucumber के साथ, संदेश `cucumberOpts.parallelMode "userContexts" requires browser.createUserContext, which this driver does not provide. Use a driver with BiDi user context support or set parallelMode to "contexts" (shares cookies and storage between scenarios).` होता है।

### `... is not supported inside parallel mode tests because ...` या `... is not supported in parallel mode`

Test ने [Parallel mode में throw करने वाले Commands](#commands-that-throw-in-parallel-mode) में से किसी command को call किया। तालिका में दिए गए विकल्प का उपयोग करें।

### `bail is not supported in parallel mode` / `retries is not supported in parallel mode`

`mochaOpts.bail` या `mochaOpts.retries` हटा दें, या spec फ़ाइल को `parallelMode` के बिना चलाएँ।

### `Suite-level hooks (before()/after()) run once per test in parallel mode`

Spec फ़ाइल में `before()` या `after()` hooks हैं। वे हर test के लिए चलते हैं। जो setup केवल एक बार चलना चाहिए, उसे `wdio.conf.ts` में `beforeSuite` / `afterSuite` में ले जाएँ।

## संबंधित पेज

- [Test Suites को व्यवस्थित करना](./OrganizingTestSuites.md): `maxInstances` के साथ spec फ़ाइलों को parallel में चलाएँ
- [Sharding](./Sharding.md): suite को कई machines में विभाजित करें
- [Frameworks](./Frameworks.md): सभी Mocha और Cucumber options
- [Automation Protocols](./AutomationProtocols.md): WebDriver BiDi और WebDriver Classic