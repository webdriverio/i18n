---
id: parallel-tests
title: एक Spec फ़ाइल में समानांतर टेस्ट
description: "mochaOpts.parallelMode या cucumberOpts.parallelMode के साथ एक spec फ़ाइल के Mocha टेस्ट या Cucumber परिदृश्यों को एक ही समय पर चलाएँ, हर एक अपने WebDriver BiDi ब्राउज़िंग कॉन्टेक्स्ट में। यह ब्राउज़र पूलिंग का एक रूप है, जो Playwright के fullyParallel जैसा है।"
---

v10 से, WebdriverIO एक spec फ़ाइल के टेस्ट एक ही समय पर चला सकता है। हर Mocha `it()` या Cucumber परिदृश्य को एक worker और एक ब्राउज़र सेशन के अंदर अपनी ब्राउज़र विंडो (एक WebDriver BiDi [browsing context](https://w3c.github.io/webdriver-bidi/#browsing-context)) मिलती है। इसका उपयोग कई स्वतंत्र टेस्ट वाली spec फ़ाइलों के लिए करें: वे जल्दी पूरी होती हैं, और आपको अधिक worker प्रोसेस या ब्राउज़र सेशन की ज़रूरत नहीं पड़ती, क्योंकि हर टेस्ट को केवल एक विंडो खोलने की लागत चुकानी पड़ती है।

यह ब्राउज़र पूलिंग का एक रूप है: टेस्ट एक ब्राउज़र में विंडो का पूल साझा करते हैं, ब्राउज़रों का पूल नहीं। अगर आप Playwright से आ रहे हैं, तो `parallelMode: 'userContexts'` [`fullyParallel: true`](https://playwright.dev/docs/test-parallel#parallelize-tests-in-a-single-file) के सबसे करीब है: हर टेस्ट को अपना अलग (isolated) कॉन्टेक्स्ट मिलता है। अंतर यह है कि Playwright एक फ़ाइल के टेस्ट को कई worker प्रोसेस में बाँटता है, जिनमें से हर एक का अपना ब्राउज़र होता है, जबकि WebdriverIO उन्हें एक worker और एक ब्राउज़र में एक ही समय पर चलाता है।

यह [`maxInstances`](./OrganizingTestSuites.md) से अलग है, जो पूरी spec फ़ाइलों को समानांतर में चलाता है, हर spec के लिए एक worker और एक सेशन। आप दोनों को साथ में उपयोग कर सकते हैं: `maxInstances` तय करता है कि कितनी spec फ़ाइलें एक ही समय पर चलेंगी, और `maxParallelContexts` तय करता है कि उनमें से हर फ़ाइल के अंदर कितने टेस्ट एक ही समय पर चलेंगे।

:::warning प्रायोगिक
Parallel mode के लिए प्रायोगिक `'wdio:experimentalBiDiCommands'` capability ज़रूरी है, जो हर टेस्ट में element कमांड्स के लागू होने का तरीका बदल देती है, केवल समानांतर टेस्ट में नहीं। देखें [BiDi element कमांड्स के व्यवहार में बदलाव](#behavior-changes-of-the-bidi-element-commands)।
:::

## Parallel mode सक्षम करें

आपको इनकी ज़रूरत है:

- एक WebDriver BiDi सेशन (डिफ़ॉल्ट, जब तक आप `'wdio:enforceWebDriverClassic': true` सेट नहीं करते),
- `'wdio:experimentalBiDiCommands': true` capability,
- `@wdio/mocha-framework` या `@wdio/cucumber-framework`। Jasmine parallel mode का समर्थन नहीं करता।

अगर सेशन BiDi का उपयोग नहीं करता, या capability मौजूद नहीं है, तो WebdriverIO एक चेतावनी लॉग करता है और टेस्ट को एक के बाद एक चलाता है। `parallelMode` के बिना, कुछ नहीं बदलता।

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

दोनों टेस्ट एक ही समय पर चलते हैं, हर एक अपनी विंडो में। `browser.url()`, `$()` और `expect()` उस टेस्ट की विंडो पर काम करते हैं जो उन्हें कॉल करता है।

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

एक feature फ़ाइल का हर परिदृश्य अपनी विंडो में चलता है। Profiles (`cucumberOpts.profiles`, `cucumberOpts.file`), लाइन नंबर वाले specs (`--spec ./features/login.feature:5`) और `tags`, `name`, `order`, `strict`, `dryRun`, `failFast`, `retry` और `retryTagFilter` विकल्प क्रमिक (sequential) रन की तरह काम करते हैं। Features, परिदृश्य, steps और hooks क्रमिक रन की तरह ही रिपोर्ट किए जाते हैं, `ignoreUndefinedDefinitions`, `failAmbiguousDefinitions`, `tagsInTitle` और `scenarioLevelReporter` के साथ भी।

## विकल्प

| विकल्प | मान | डिफ़ॉल्ट | विवरण |
| --- | --- | --- | --- |
| `parallelMode` | `'contexts'`, `'userContexts'` | सेट नहीं (क्रमिक) | Parallel mode चालू करता है और तय करता है कि टेस्ट कितना साझा करते हैं। |
| `maxParallelContexts` | संख्या | `os.cpus().length` | कितने टेस्ट एक ही समय पर चलते हैं। |

दोनों को `mochaOpts` या `cucumberOpts` में सेट करें।

`maxParallelContexts` स्लॉट की संख्या तय करता है। हर स्लॉट एक समय में एक टेस्ट चलाता है, मौजूदा टेस्ट चलते समय अपने अगले टेस्ट के लिए विंडो खोलता है, और पिछली विंडो को बैकग्राउंड में बंद करता है। इसलिए थोड़े समय के लिए 3 × `maxParallelContexts` तक विंडो, साथ ही सेशन की पहली विंडो, खुली रह सकती हैं: हर स्लॉट में एक सक्रिय, एक पहले से खोली गई (prefetched) और एक बंद हो रही विंडो हो सकती है। Parallel mode केवल वही विंडो बंद करता है जो उसने खोली थीं।

## `contexts` और `userContexts` में से चुनें

| | `'contexts'` | `'userContexts'` |
| --- | --- | --- |
| हर टेस्ट के लिए विंडो | हाँ | हाँ |
| Cookies, `localStorage`, service workers | सभी टेस्ट द्वारा साझा | हर टेस्ट के लिए अलग ([user context](https://w3c.github.io/webdriver-bidi/#user-context)) |
| लॉगिन | एक बार, अगर टेस्ट सेशन cookie का फिर से उपयोग करते हैं | हर टेस्ट में |
| ड्राइवर समर्थन | कोई भी BiDi ब्राउज़र | `browser.createUserContext()` समर्थन चाहिए, वरना रन विफल होता है |

डिफ़ॉल्ट रूप से `'contexts'` चुनें। `'userContexts'` तब चुनें जब टेस्ट को एक-दूसरे की cookies या storage नहीं देखनी चाहिए, उदाहरण के लिए ऐसे टेस्ट जो अलग-अलग उपयोगकर्ताओं के रूप में लॉगिन करते हैं। `'contexts'` की तरह, `'userContexts'` भी चेतावनी के साथ क्रमिक रन पर लौट आता है जब सेशन WebDriver BiDi नहीं है या capabilities में `'wdio:experimentalBiDiCommands'` मौजूद नहीं है। अगर ड्राइवर `browser.createUserContext` का समर्थन नहीं करता, तो रन क्रमिक रन पर लौटने के बजाय विफल हो जाता है।

कोई टैब या विंडो जिसे टेस्ट `browser.newWindow(url)` से खोलता है, वह टेस्ट की विंडो से खुलती है, इसलिए उसमें टेस्ट की cookies और storage होते हैं। टेस्ट की cookie और storage पृथक्करण (isolation) के बाहर विंडो खोलने के लिए, उसे `browser.browsingContextCreate()` से बनाएँ, और उसका browsing context `browser.browsingContexts()` से प्राप्त करें:

```js
const { context } = await browser.browsingContextCreate({ type: 'window' })
await browser.browsingContextNavigate({ context, url: 'https://example.com', wait: 'complete' })
const outside = (await browser.browsingContexts()).find((c) => c.contextId === context)
await outside.$('h1').getText()
```

## हर टेस्ट के पास क्या होता है

एक समानांतर टेस्ट के अंदर, ये कमांड्स टेस्ट की अपनी विंडो पर काम करती हैं:

- नेविगेशन: `url`, `back`, `forward`, `refresh`, `getUrl`, `getTitle`
- element कमांड्स: `$`, `$$`, `shadow$`, `click`, `setValue`, `getText`, `waitFor*` कमांड्स, और अन्य
- `execute`, `actions`, `addInitScript`
- cookies: `getCookies`, `setCookies`, `deleteCookies` टेस्ट के cookie partition का उपयोग करते हैं
- `mock()`: समानांतर टेस्ट में बनाया गया mock केवल उस टेस्ट की विंडो और उसके frames के requests को intercept और रिकॉर्ड करता है, इसलिए दो टेस्ट एक ही URL को mock कर सकते हैं
- स्क्रीनशॉट: `saveScreenshot`, `takeElementScreenshot`

## Parallel mode में error देने वाली कमांड्स

कुछ कमांड्स पूरे ब्राउज़र या पूरे सेशन पर काम करती हैं, इसलिए वे किसी एक टेस्ट की विंडो को लक्षित नहीं कर सकतीं। एक समानांतर टेस्ट के अंदर वे किसी दूसरे टेस्ट को प्रभावित करने के बजाय error देती हैं:

| कमांड्स | क्यों | इसके बजाय उपयोग करें |
| --- | --- | --- |
| `getWindowSize`, `setWindowSize` | OS विंडो साझा है | किसी टेस्ट के पेज का आकार तय करने के लिए `browser.setViewport()` का उपयोग करें। समानांतर टेस्ट एक OS विंडो साझा करते हैं |
| `throttleNetwork`, `throttleCPU` | वे पूरे ब्राउज़र पर लागू होती हैं | उन टेस्ट को parallel mode के बिना चलाएँ |
| `closeWindow`, `switchToParentFrame` | वे फ़ोकस की गई विंडो बदलती हैं, जिसे सभी टेस्ट साझा करते हैं | हर टेस्ट को उसकी अपनी विंडो में रखें |
| `reloadSession`, `setTimeout` | वे उस सेशन को बदलती हैं जिसे सभी टेस्ट साझा करते हैं | उन्हें `wdio.conf.ts` के `before` hook में कॉल करें |
| `acceptAlert`, `dismissAlert`, `getAlertText`, `sendAlertText` | alerts किसी browsing context से संबंधित होते हैं | उन्हें उस context पर कॉल करें जो `browser.url()` लौटाता है: `const page = await browser.url('https://webdriver.io'); await page.acceptAlert()`। `sendAlertText(text)` के बजाय `page.acceptAlert(text)` का उपयोग करें। `dismissAlert()` और `getAlertText()` भी context पर काम करती हैं |
| `getComputedRole`, `getComputedLabel` | WebDriver BiDi उन्हें पढ़ नहीं सकता | उन टेस्ट को parallel mode के बिना चलाएँ |

`switchWindow` को v10 में सभी WebDriver BiDi सेशन के लिए हटा दिया गया था, केवल parallel mode में नहीं। यह ``switchWindow` was removed for WebDriver BiDi sessions in WebdriverIO v10. Hold the browsing context returned by `browser.url()` or `browser.newWindow()`, or find one with `browser.browsingContexts()`.`` error देता है। Context पर स्विच करने के बजाय context ऑब्जेक्ट को रखें।

WebdriverIO prompts को अपने आप dismiss कर देता है जब तक कोई `dialog` event को सुन नहीं रहा हो, इसलिए किसी टेस्ट से prompt का उत्तर देने से पहले एक listener (`browser.on('dialog', () => {})`) रजिस्टर करें।

हर दूसरी WebDriver Classic कमांड भी error देती है। केवल `status`, `getTimeouts` और `getWindowHandles` की अनुमति है। अगर parallel mode में कोई WebdriverIO कमांड आपके किसी Classic कमांड को कॉल किए बिना WebDriver Classic पर लौट जाती है, तो कृपया [इसकी रिपोर्ट करें](https://github.com/webdriverio/webdriverio/issues/new/choose)।

## Hooks और timeouts

### Mocha

- किसी spec फ़ाइल में `before()` और `after()` **हर टेस्ट के लिए एक बार** चलते हैं, हर `describe` के लिए एक बार नहीं, क्योंकि हर टेस्ट की अपनी विंडो होती है। हर टेस्ट अपनी विंडो में `before`, `beforeEach`, टेस्ट, `afterEach` और `after` चलाता है। जो setup हर spec फ़ाइल के लिए एक बार चलना चाहिए, उसे `wdio.conf.ts` के `beforeSuite` / `afterSuite` hooks में रखें। ये किसी भी टेस्ट विंडो के बाहर, एक बार चलते हैं।
- क्योंकि हर टेस्ट अपने hooks चलाता है, विफल होने वाला hook केवल अपने टेस्ट को प्रभावित करता है। विफल `before()` हर टेस्ट के लिए एक बार रिपोर्ट होता है, `describe` के लिए एक बार नहीं। विफल `beforeEach()` या `afterEach()` उसी `describe` के दूसरे टेस्ट को नहीं रोकता। क्रमिक रन में, Mocha उन्हें छोड़ देता है। `failHookAffectedTests` (डिफ़ॉल्ट) के साथ, जिस टेस्ट को विफल `before()` या `beforeEach()` छोड़ देता है, वह क्रमिक रन जैसे ही टेक्स्ट के साथ विफल होता है। केवल hook का शीर्षक अलग हो सकता है: विफल `beforeEach()` अपनी विंडो के टेस्ट का नाम देता है (`"before each" hook for "t2"`), जबकि क्रमिक रन उन सभी के लिए पहले टेस्ट का नाम देता है।
- केवल `mochaOpts.timeout` लागू होता है। किसी टेस्ट या hook में `this.timeout()` error देता है, और `it(...).timeout()` या `describe` timeout को चेतावनी के साथ अनदेखा किया जाता है। देखें [Mocha timeouts और WebdriverIO hooks](./Timeouts.md#mocha-timeouts-and-the-webdriverio-hooks)।
- `mochaOpts.bail` और Mocha retries समर्थित नहीं हैं और रन को विफल करते हैं: `mochaOpts.retries`, `describe` में `this.retries(n)` और `it(...).retries(n)`। किसी टेस्ट या hook में `this.retries()` error देता है। [WebdriverIO retries](./Retry.md) (`it(title, fn, retries)`) parallel mode में काम करते हैं।
- `.only()`, `this.skip()`, `grep`, `fgrep` और `invert` क्रमिक रन की तरह काम करते हैं।
- ऐसा error जिसे कोई टेस्ट await नहीं करता (उदाहरण के लिए error देने वाला timer) उस विंडो के टेस्ट या hook को विफल करता है जहाँ से वह आता है, और दूसरे टेस्ट चलते रहते हैं। क्रमिक रन की तरह, एक unhandled rejection किसी टेस्ट को विफल नहीं करता, और `mochaOpts.allowUncaught` के साथ error worker को समाप्त कर देता है। ऐसा error जो अपने टेस्ट के समाप्त होने के बाद आता है, जबकि दूसरे टेस्ट अभी चल रहे हों, रन को विफल करता है और लॉग होता है, लेकिन कोई टेस्ट उसे नहीं दिखाता (क्रमिक रन इसे उस टेस्ट पर दिखाता है जो उस समय चल रहा होता है)। आख़िरी विंडो बंद होने के बाद, ऐसा error worker को समाप्त कर देता है, जैसे क्रमिक रन में। यही बात उस event emitter से आए error पर भी लागू होती है जिसे आपके कोड ने किसी टेस्ट के बाहर बनाया हो, और Node.js 22 पर `queueMicrotask()` से आए error पर भी, क्योंकि वहाँ टेस्ट की विंडो ज्ञात नहीं होती।
- `mochaOpts.dryRun`, `forbidPending` और `checkLeaks` अभी parallel mode में लागू नहीं होते: टेस्ट चलते हैं, pending टेस्ट विफल नहीं होता, और global leak रिपोर्ट नहीं होता।

### Cucumber

- `BeforeAll` / `AfterAll` और `wdio.conf.ts` के `beforeFeature` / `afterFeature` hooks हर worker के लिए एक बार चलते हैं, हर feature के लिए एक बार नहीं। `beforeFeature` / `afterFeature` केवल पहली feature फ़ाइल का uri और feature प्राप्त करते हैं, जो तब मायने रखता है जब एक worker कई feature फ़ाइलें चलाता है, उदाहरण के लिए grouped specs। वे किसी भी परिदृश्य की विंडो के बाहर चलते हैं, इसलिए उन्हें ऐसी कमांड्स का उपयोग नहीं करना चाहिए जिन्हें विंडो की ज़रूरत हो।
- `Before` / `After`, `BeforeStep` / `AfterStep` और `wdio.conf.ts` के scenario और step hooks हर परिदृश्य के लिए, उस परिदृश्य की विंडो में चलते हैं।
- WebdriverIO में `cucumberOpts.strict` का डिफ़ॉल्ट `false` है। Pending step परिदृश्य को केवल `strict: true` के साथ विफल करता है।
- `failFast` के साथ, जो परिदृश्य पहले से दूसरी विंडो में चल रहे हैं, वे पहली विफलता के बाद पूरे होते हैं। जो परिदृश्य शुरू नहीं हुए, वे skipped के रूप में रिपोर्ट होते हैं, जैसे क्रमिक रन में।
- `ignoreUndefinedDefinitions: true` के साथ, एक ambiguous step (`failAmbiguousDefinitions: false` के साथ), या `strict: true` के साथ एक pending step, रन को विफल करता है। ऐसे में क्रमिक रन पास हो जाता है।
- Cucumber formatters (`format`, `formatOptions`, `publish`) नहीं चलते, इसलिए वे कोई फ़ाइल नहीं लिखते।

### दोनों frameworks

टेस्ट समाप्त होते ही उसकी विंडो बंद हो जाती है। ऐसे timers या promises शुरू न करें जो टेस्ट समाप्त होने के बाद भी चलते रहें।

## BiDi element कमांड्स के व्यवहार में बदलाव

`'wdio:experimentalBiDiCommands': true` सेशन के हर टेस्ट में, क्रमिक हो या समानांतर, कई element कमांड्स का implementation बदल देता है:

- `addValue` और `clearValue` कृत्रिम (synthetic) DOM events भेजते हैं, trusted key events नहीं।
- `getAttribute` property और attribute मानों के लिए WebDriver नियमों का पालन करता है।
- `click` Actions API के माध्यम से भेजा जाता है।

Classic व्यवहार पर निर्भर टेस्ट खोजने के लिए अपने suite को एक बार इस capability के साथ और `parallelMode` के बिना चलाएँ।

## Reporters

जो reporters [`@wdio/reporter`](./CustomReporter.md) को extend करते हैं, वे समानांतर टेस्ट को सही suite के अंतर्गत रिपोर्ट करते हैं, और किसी कमांड को उस टेस्ट से जोड़ते हैं जिसके browsing context ने उसे भेजा।

`@wdio/allure-reporter` Mocha के साथ parallel mode का समर्थन करता है। यह किसी टेस्ट का परिणाम तब लिखता है जब टेस्ट और उसके `afterEach()` और `after()` hooks समाप्त होते हैं। Parallel mode में `before()` और `after()` hooks हर टेस्ट के लिए एक बार चलते हैं, इसलिए रिपोर्ट उनके fixtures हर टेस्ट के लिए एक बार दिखाती है। Cucumber के साथ, Allure अभी parallel mode का समर्थन नहीं करता: एक साथ चल रहे परिदृश्यों के परिणाम, steps और attachments गलत परिदृश्य के अंतर्गत जा सकते हैं, इसलिए इसका उपयोग क्रमिक रन के साथ करें।

`@wdio/spec-reporter` अभी parallel mode का समर्थन नहीं करता: एक Mocha `describe` block जो किसी दूसरे के बाद आता है, या एक Cucumber परिदृश्य जो किसी दूसरे के चलते समय शुरू होता है, उसके अंदर nested दिखाया जाता है, और Cucumber `retry` के साथ पास होने वालों की गिनती गलत हो सकती है। टेस्ट के परिणाम और exit code सही होते हैं।

`@wdio/cucumberjs-json-reporter` अभी parallel mode का समर्थन नहीं करता: एक साथ चल रहे परिदृश्यों के steps और attachments गलत परिदृश्य में जा सकते हैं, और reporter एक चेतावनी लॉग करता है। इसका उपयोग क्रमिक रन के साथ करें।

`@wdio/html-reporter` अभी parallel mode का समर्थन नहीं करता: कोई टेस्ट दूसरे टेस्ट के शुरू होने के बाद जो logs, screenshots और videos भेजता है, वे गलत टेस्ट के अंतर्गत जा सकते हैं। इसका उपयोग क्रमिक रन के साथ करें।

`@wdio/video-reporter` हर समानांतर टेस्ट को उसके अपने video में रिकॉर्ड करता है। Cucumber के साथ, यह videos को Allure से नहीं जोड़ता।

एक custom reporter को यह नहीं मानना चाहिए कि अगला टेस्ट शुरू होने से पहले एक टेस्ट समाप्त हो जाता है। देखें [Reporters और समानांतर टेस्ट](./CustomReporter.md#reporters-and-parallel-tests)।

## Cloud vendors

Cloud vendors हर ब्राउज़र सेशन के लिए एक video, logs का एक सेट और एक टेस्ट स्टेटस रिकॉर्ड करते हैं। Parallel mode में, कई टेस्ट उस सेशन को साझा करते हैं, इसलिए vendor dashboard video, logs या pass/fail स्टेटस को टेस्ट के अनुसार अलग नहीं कर सकता। `userContexts` के लिए vendor के grid को `browser.createUserContext` (और Mocha के साथ `browser.removeUserContext`) का समर्थन भी करना होगा। Parallel mode को अभी तक किसी cloud vendor पर टेस्ट नहीं किया गया है।

हम अनुशंसा करते हैं कि cloud vendor पर चलाते समय आप parallel mode बंद रखें और spec फ़ाइलों को समानांतर में चलाने के लिए [`maxInstances`](./OrganizingTestSuites.md) का उपयोग करें। इसे बंद करने के लिए, framework विकल्पों से `parallelMode` हटा दें। अगर आप केवल `'wdio:experimentalBiDiCommands'` हटाते हैं, तो टेस्ट एक के बाद एक चलते हैं और हर रन एक चेतावनी लॉग करता है।

## समस्या निवारण

### `parallelMode: "contexts" requires 'wdio:experimentalBiDiCommands': true to be set in capabilities`

Capability में `'wdio:experimentalBiDiCommands': true` जोड़ें। इसके बिना, टेस्ट एक के बाद एक चलते हैं। Cucumber के साथ, संदेश इस प्रकार होता है: `Parallel mode (cucumberOpts.parallelMode: "contexts") requires "wdio:experimentalBiDiCommands" to be set in capabilities`।

### `... is set but the browser session does not support WebDriver Bidi`

सेशन WebDriver Classic का उपयोग करता है। Capability से `'wdio:enforceWebDriverClassic': true` हटाएँ, या WebDriver BiDi समर्थन वाले ब्राउज़र और ड्राइवर का उपयोग करें। Cucumber के साथ, संदेश इस प्रकार होता है: `Parallel mode (cucumberOpts.parallelMode: "contexts") requires a WebDriver Bidi session. Falling back to sequential execution.`

### `parallelMode: "userContexts" requires browser.createUserContext and browser.removeUserContext, which this driver does not support`

ड्राइवर user contexts नहीं बना सकता। `parallelMode: 'contexts'` का उपयोग करें या ब्राउज़र और ड्राइवर को अपडेट करें। Cucumber के साथ, संदेश इस प्रकार होता है: `cucumberOpts.parallelMode "userContexts" requires browser.createUserContext, which this driver does not provide. Use a driver with BiDi user context support or set parallelMode to "contexts" (shares cookies and storage between scenarios).`

### `... is not supported inside parallel mode tests because ...` या `... is not supported in parallel mode`

टेस्ट ने [Parallel mode में error देने वाली कमांड्स](#commands-that-throw-in-parallel-mode) में से किसी कमांड को कॉल किया। तालिका में दिए गए विकल्प का उपयोग करें।

### `bail is not supported in parallel mode` / `retries is not supported in parallel mode`

`mochaOpts.bail` या `mochaOpts.retries` हटाएँ, या उस टेस्ट का `this.retries(n)` / `.retries(n)` हटाएँ जिसका नाम error में है, या spec फ़ाइल को `parallelMode` के बिना चलाएँ। Parallel mode में किसी टेस्ट को फिर से चलाने के लिए, [WebdriverIO retries](./Retry.md) (`it(title, fn, retries)`) का उपयोग करें।

### `Suite-level hooks (before()/after()) run once per test in parallel mode`

Spec फ़ाइल में `before()` या `after()` hooks हैं। वे हर टेस्ट के लिए चलते हैं। जो setup केवल एक बार चलना चाहिए, उसे `wdio.conf.ts` में `beforeSuite` / `afterSuite` में ले जाएँ।

## संबंधित पेज

- [Test Suites को व्यवस्थित करना](./OrganizingTestSuites.md): `maxInstances` के साथ spec फ़ाइलों को समानांतर में चलाएँ
- [Sharding](./Sharding.md): suite को कई मशीनों में बाँटें
- [Frameworks](./Frameworks.md): सभी Mocha और Cucumber विकल्प
- [Automation Protocols](./AutomationProtocols.md): WebDriver BiDi और WebDriver Classic