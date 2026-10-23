---
id: v10-migration
title: v9 से v10 तक
description: किसी WebdriverIO v9 प्रोजेक्ट को v10 में अपडेट करें, जिसमें हर ब्रेकिंग चेंज और इस गाइड को लागू करने वाला एक coding-agent skill शामिल है।
---

यह गाइड WebdriverIO `v10` के ब्रेकिंग चेंज और उनके लिए आपको क्या करना है, यह एक जगह बताती है।

पिछले major वर्ज़न के विपरीत, इनमें से ज़्यादातर बदलाव WebdriverIO [codemod](https://github.com/webdriverio/codemod) से लागू नहीं किए जा सकते, क्योंकि वे इस पर निर्भर करते हैं कि आपके टेस्ट का असल में मतलब क्या है। नीचे दिए गए [legacy command signatures](#legacy-command-signatures) यांत्रिक रूप से बदले जा सकते हैं। बाकी हर सेक्शन बताता है कि आपके सुइट में प्रभावित जगहें कैसे ढूंढें।

## coding agent के साथ माइग्रेट करें {#migrate-with-a-coding-agent}

अपने agent को v10 migration skill दें और उससे कहें कि वह इस पेज का पालन करते हुए सुइट को WebdriverIO v10 में माइग्रेट करे। skill एक प्रक्रिया है: क्या खोजना है, कौन-सा codemod चलाना है, और कब रुकना है। हर ब्रेकिंग चेंज के लिए यह पेज ही सत्य का स्रोत है।

इसे उस प्रोजेक्ट से इंस्टॉल करें जिसे आप अपग्रेड कर रहे हैं। [skills CLI](https://skills.sh) इस रिपॉज़िटरी से [`.agents/skills/wdio-v10-migration/SKILL.md`](https://github.com/webdriverio/webdriverio/blob/main/.agents/skills/wdio-v10-migration/SKILL.md) पढ़ता है और उसे आपके चुने हुए agents की skill डायरेक्टरी में लिख देता है:

```sh
npx skills add webdriverio/webdriverio --skill wdio-v10-migration
```

`--skill wdio-v10-migration` यह skill इंस्टॉल करता है। WebdriverIO रिपॉज़िटरी पर काम करने वाली skills internal के रूप में चिह्नित हैं और ऑफ़र नहीं की जातीं। CLI पूछता है कि किन agents के लिए इंस्टॉल करना है और skill को हर agent की प्रोजेक्ट डायरेक्टरी में लिख देता है। आप उस फ़ाइल को चैट में अटैच भी कर सकते हैं।

Strict selectors और capability में बिना prefix वाली `specs` / `exclude` सूचियाँ केवल सुइट चलने पर ही सामने आती हैं। skill केवल सोर्स से इनके बारे में निर्णय नहीं ले सकती।

## Node.js

WebdriverIO v10 को Node.js 22.19.0 या बाद का वर्ज़न चाहिए। Node.js 18 और 20 अब समर्थित नहीं हैं। CI में Node.js 22, 24 और 26 शामिल हैं।

## Component tests

browser runner अब भी Chrome 90, Edge 90, Firefox 90 और Safari 14.1 या नए वर्ज़न में चलता है। [Browser support](/docs/component-testing#browser-support) देखें।

`browser.execute` को दिया गया कोड ES2021 पर ही रहता है, ताकि वह टेस्ट किए जा रहे पुराने ब्राउज़र में चल सके। यह न्यूनतम सीमा नहीं बदली।

## Mocha

`@wdio/mocha-framework` और `@wdio/browser-runner` [Mocha 12](https://mochajs.org/blog/mocha-12-stable/) पर निर्भर करते हैं। Mocha 12 को Node.js `^20.19.0 || >=22.12.0` चाहिए, जो v10 की न्यूनतम सीमा 22.19.0 में शामिल है।

```diff
- mochaOpts: { compilers: ['ts:ts-node/register'] }
+ mochaOpts: { require: ['ts-node/register'] }
```

`mochaOpts.compilers` हटा दिया गया है। Mocha ने लंबे समय से deprecated `--compilers` फ़्लैग हटा दिया है, इसलिए बचे हुए compiler mappings को अनदेखा किया जाता है। transpilers या अन्य setup फ़ाइलें `mochaOpts.require` से लोड करें।

WebdriverIO Mocha timeout का पालन करता है: टेस्ट या hook में `this.timeout()`, और `mochaOpts.timeout: 0`, जो timeout बंद कर देता है। v9 में, WebdriverIO टेस्ट में `this.timeout()` को अनदेखा करता था, और 9.22 से `mochaOpts.timeout: 0` हर टेस्ट को फ़ेल कर देता था ("Timeout after -3ms")। WebdriverIO का `retry` आर्ग्युमेंट timeout के बाद टेस्ट को दोबारा नहीं चलाता। [Mocha timeouts and the WebdriverIO hooks](./Timeouts.md#mocha-timeouts-and-the-webdriverio-hooks) देखें, `mochaOpts.parallelMode` के लिए भी। v10 में नया: `mochaOpts.parallelMode` या `cucumberOpts.parallelMode` के साथ [एक spec फ़ाइल में parallel tests](./ParallelTests.md)।

`failHookAffectedTests` का डिफ़ॉल्ट `true` है। फ़ेल होने वाला `before` या `beforeEach` hook उन टेस्ट को फ़ेल कर देता है जिन्हें उस hook ने स्किप किया। केवल hook को रिपोर्ट करने के लिए `mochaOpts.failHookAffectedTests` को `false` पर सेट करें।

`expect-webdriverio` 8 का उपयोग करें, [expect-webdriverio 8](#expect-webdriverio-8) देखें। Mocha उस पैकेज को एक प्रोसेस में दो बार लोड कर सकता है; वह उन कॉपियों के बीच assertion state साझा करता है ([expect-webdriverio#2221](https://github.com/webdriverio/expect-webdriverio/pull/2221))।

Mocha 12 के वे बदलाव जो `mochaOpts` के ज़रिए असर डाल सकते हैं:

- `grep` आधुनिक RegExp फ़्लैग स्वीकार करता है।
- `ui` अब भी `bdd`, `tdd`, `qunit` या `exports` है। Custom interfaces को `*-bdd`, `*-tdd` या `*-qunit` suffix रखना चाहिए।
- `parallel` अब भी असमर्थित है। spec parallelism WDIO संभालता है; अगर आप इसे सक्षम करते हैं तो Mocha का worker pool error देगा।

Mocha 12 ESM-first (`"type": "module"`) है। प्रोग्रामैटिक `require('mocha')` Node 22 पर `require(esm)` के ज़रिए अब भी काम करता है। WDIO Mocha CLI (`wdio run … --mochaOpts.*`) अपरिवर्तित है; Mocha का अपना CLI अब yargs की जगह `util.parseArgs` का उपयोग करता है।

## Cucumber

`@wdio/cucumber-framework` [`@cucumber/cucumber` 13](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300) पर निर्भर करता है।

Cucumber 13 को Node.js 22, 24, या 26 या बाद का वर्ज़न चाहिए। यह Node.js 20, 23 या 25 पर नहीं चलता। framework पैकेज भी यही रेंज घोषित करता है, जो v10 की न्यूनतम सीमा 22.19.0 से शुरू होती है।

```diff
- cucumberOpts: { tagExpression: '@smoke' }
+ cucumberOpts: { tags: '@smoke' }
```

`tagExpression` का कोई alias नहीं है। इसे सेट करने पर error आता है, ताकि बचा हुआ फ़िल्टर चुपचाप हर scenario न चला दे।

Cucumber 13 अब `Cli` export नहीं करता। प्रोग्रामैटिक रन `@cucumber/cucumber/api` के `runCucumber` से होते हैं, जिसका adapter पहले से उपयोग करता है।

Cucumber 13 के अन्य ब्रेकिंग चेंज (अस्पष्ट formatter paths, parallel workers, `BeforeAll` / `AfterAll`) [Cucumber की upgrade guide](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300) में बताए गए हैं।

### Feature uid

Cucumber feature का uid `rootDir` से feature फ़ाइल का path है, फ़ाइल का नाम नहीं: `login.feature:1:1` की जगह `features/admin/login.feature:1:1`। अलग-अलग फ़ोल्डरों में एक ही नाम वाली दो feature फ़ाइलें अब एक uid साझा नहीं करतीं। scenario का `parent` और `fullTitle` इसी uid का उपयोग करते हैं। path में `%`, `:` और `#` को `%25`, `%3A` और `%23` के रूप में encode किया जाता है, इसलिए `uid.split(':')[1]` अब भी line है और `#` केवल part number शुरू करता है। random क्रम वाले grouped specs में, दोबारा शुरू होने वाले feature का suite uid `<uid>#2` होता है।

`scenarioLevelReporter: true` के साथ, Allure `historyId` `fullTitle` से आता है, इसलिए इस बदलाव के साथ हर scenario की Allure history फिर से शुरू होती है। यह तब भी फिर से शुरू होती है जब `rootDir` या feature फ़ाइल का path बदलता है। अलग-अलग फ़ोल्डरों की config फ़ाइलों के लिए एक ही history रखने के लिए, उन सभी में एक ही `rootDir` सेट करें।

## Jasmine

`@wdio/jasmine-framework` [Jasmine 6](https://jasmine.github.io/upgrade-guides/6.0) पर निर्भर करता है। Jasmine 6 Node.js 20, 22 और 24 पर टेस्ट किया गया है। v10 की न्यूनतम सीमा 22.19.0 पहले से इस रेंज में आती है।

`jasmineNodeOpts` हटा दिया गया है। Jasmine को `jasmineOpts` से कॉन्फ़िगर करें। `jasmineNodeOpts` सेट करने पर error आता है:

```text
The option "jasmineNodeOpts" was removed in WebdriverIO v10. Use "jasmineOpts" instead.
```

```diff
- jasmineNodeOpts: { defaultTimeoutInterval: 60000 }
+ jasmineOpts: { defaultTimeoutInterval: 60000 }
```

`jasmineOpts.failFast` अब पढ़ा नहीं जाता। `jasmineOpts.stopOnSpecFailure` का उपयोग करें। बचा हुआ `failFast` सुइट को नहीं रोकता। Cucumber का `failFast` एक अलग विकल्प है और अब भी काम करता है।

```diff
- jasmineOpts: { failFast: true }
+ jasmineOpts: { stopOnSpecFailure: true }
```

`jasmineOpts.stopSpecOnExpectationFailure` हटा दिया गया है। `jasmineOpts.oneFailurePerSpec` का उपयोग करें। पुरानी key सेट करने पर error आता है:

```text
The option "jasmineOpts.stopSpecOnExpectationFailure" was removed in WebdriverIO v10. Use "jasmineOpts.oneFailurePerSpec" instead.
```

```diff
- jasmineOpts: { stopSpecOnExpectationFailure: true }
+ jasmineOpts: { oneFailurePerSpec: true }
```

Jasmine के sync matchers फिर से synchronous हैं। v9 में, global `expect` Jasmine का `expectAsync` था, इसलिए `expect(1).toBe(1)` एक promise लौटाता था। v10 में, Jasmine के built-in matchers और `jasmine.addMatchers` से जोड़े गए matchers `undefined` लौटाते हैं। WebdriverIO matchers, Jasmine के async matchers और `jasmine.addAsyncMatchers` वाले matchers अब भी promise लौटाते हैं, इसलिए उन्हें `await` करते रहें। आपको `await expect($('#logo')).toBeDisplayed()` को `expectAsync()` में बदलने की ज़रूरत नहीं है: global `expect` आपके लिए WebdriverIO matchers को `expectAsync` पर भेज देता है। `await expect(1).toBe(1)` काम करता रहता है।

बिना `await` के फ़ेल होने वाला sync assertion अब spec को फ़ेल कर देता है। v9 में, यह एक rejected promise था: अगर किसी ने उसे await नहीं किया, तो spec पास हो सकता था, और लॉग में केवल एक unhandled rejection दिखता था। अपग्रेड के बाद, उन specs को देखें जो फ़ेल होने लगते हैं। v9 में उनमें एक छिपी हुई विफलता थी, और समाधान टेस्ट में या एप्लिकेशन में है, `expect` कॉल में नहीं:

```js
it('saves the form', async () => {
    const onSave = jasmine.createSpy('onSave')
    await submitForm(onSave)
    // v9: `onSave` कॉल न होने पर भी पास हो जाता था
    // v10: `onSave` कॉल न होने पर फ़ेल होता है
    expect(onSave).toHaveBeenCalled()
})
```

sync matcher का परिणाम अब `undefined` है, इसलिए उस पर `.then()` या `.catch()` एक `TypeError` फेंकता है:

```diff
- expect(total).toBe(3).then(() => log('ok'))
+ expect(total).toBe(3)
+ log('ok')
```

इस बदलाव के अन्य प्रभाव:

- `oneFailurePerSpec` अब spec को उसके पहले फ़ेल assertion पर रोक देता है: sync matcher के लिए तुरंत, और awaited async matcher के लिए जब promise settle हो।
- Jasmine के spy matchers बिना `await` के काम करते हैं। v9 में, `toHaveBeenCalled`, `toHaveSpyInteractions` और `toHaveNoOtherSpyInteractions` "Does not take arguments" के साथ फ़ेल होते थे, और बिना `await` के एक uncalled spy पास हो जाता था।
- `jasmine.addMatchers` अब बदला नहीं जाता, इसलिए Jasmine अब अपनी "Monkey patching detected" चेतावनी नहीं दिखाता।

`toHaveSize` के दो अर्थ हैं। WebdriverIO value पर, यह WebdriverIO matcher है और element का आकार जाँचता है: एक element, एक element array (जिसमें `$$().filter()` का परिणाम शामिल है), एक `Element[]`, एक multi-remote element, एक browser, एक browsing context, एक mock, `some()` wrapper, या chainable `$()` जैसा कोई promise। किसी अन्य value पर, यह Jasmine का matcher है और length जाँचता है। v9 में, हमेशा Jasmine का matcher चलता था।

```js
expect([1, 2]).toHaveSize(2)                                   // Jasmine, sync
await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO, async
```

types भी इन्हीं नियमों का पालन करते हैं। `@wdio/jasmine-framework` अब global `expect` को Jasmine के matchers के साथ type करता है, साथ ही WebdriverIO matchers और Jasmine async matchers के साथ, जो promise लौटाते हैं। अपनी `tsconfig.json` में `types` से `expect-webdriverio/jasmine-wdio-expect-async` हटा दें, क्योंकि यह हर matcher को async के रूप में type करता है। अगर `jasmine` मौजूद नहीं है तो उसे जोड़ें:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "types": ["node", "@wdio/globals/types", "expect-webdriverio/jasmine-wdio-expect-async", "@wdio/jasmine-framework"]
+        "types": ["node", "jasmine", "@wdio/globals/types", "@wdio/jasmine-framework"]
     }
 }
```

`expect.oneOf()` और `expect.multiRemote()` अब Jasmine specs में भी काम करते हैं। पहले, वे runtime पर Jasmine `expect` पर मौजूद नहीं थे।

## expect-webdriverio 8

`@wdio/globals`, `@wdio/runner` और `@wdio/browser-runner` को peer dependency के रूप में `expect-webdriverio` 8 चाहिए। v9 में, यह `expect-webdriverio` 5, 6 या 7 था। अगर आपकी `package.json` में `expect-webdriverio` सूचीबद्ध है, तो इसे `@wdio/*` पैकेजों वाले बदलाव में ही वर्ज़न 8 पर अपडेट करें।

`expect-webdriverio` 8 के अपने ब्रेकिंग चेंज हैं। इसकी [v7 से v8 migration guide](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v7-to-v8) हर बदलाव और उसके विकल्प की सूची देती है। `expect-webdriverio` 5 या 6 से आ रहे हैं, तो इसकी [v5 से v6 migration guide](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v5-to-v6) भी पढ़ें: वर्ज़न 8 उन APIs को हटाता है जिन्हें 5.6.9 से 6.0.0 ने deprecated किया था। वर्ज़न 7 की कोई migration guide नहीं है। यह multi-remote सपोर्ट जोड़ता है, और `$$()` पर `toMatchSnapshot()` और `toMatchInlineSnapshot()` अब हर element का `outerHTML` स्टोर करते हैं: उन snapshots को अपडेट करें। ये बदलाव किसी टेस्ट सुइट को सबसे अधिक प्रभावित करने की संभावना रखते हैं:

- `$$()` पर `toHaveText` elements की तुलना index दर index करता है। पेज से अलग क्रम में expected array फ़ेल होता है। पेज वाला क्रम, `expect.oneOf()` या `expect.arrayContaining()` का उपयोग करें।
- एक ही element पर expected values का array `toHaveText`, `toHaveHTML`, `toHaveComputedLabel`, `toHaveComputedRole` और `toHaveElementClass` को फ़ेल करता है। `expect.oneOf()` का उपयोग करें। `toHaveElementClass` के लिए, array का अर्थ था "इनमें से कोई भी class है": `expect.oneOf()` का उपयोग करें, या जब element में सभी classes होनी चाहिए तो हर class के लिए एक assertion।
- एक ही element पर, या `some()` के साथ, list matcher (`expect.arrayContaining()`, `expect.arrayOf()`) error फेंकता है। `$$()` पर, यह सभी elements की values की एक साथ तुलना करता है।
- अनुपस्थित attribute या property कभी मेल नहीं खाती, उस matcher से भी नहीं जो कोई value नहीं स्वीकारता, जैसे `expect.not.stringContaining()`।
- `URL`, `Set`, `Map` और binary values की तुलना उनकी सामग्री से की जाती है। जो assertion गलती से पास हो रहा था, वह अब फ़ेल हो सकता है।
- helper types अब global नहीं हैं। जो फ़ाइल बिना import के `Test`, `TestResult`, `Scenario` या `WdioCustomMatchers` का उपयोग करती है, वह `Cannot find name` के साथ फ़ेल होती है: `@wdio/types` से `Frameworks.Test`, `Frameworks.TestResult` और `Frameworks.Scenario`, और `ExpectWebdriverIO.Matchers` का उपयोग करें।
- `setFeatureFlags()` और `featureFlags` विकल्प हटा दिए गए हैं।
- ये deprecated APIs हटा दिए गए हैं: `setOptions` (`setDefaultOptions` का उपयोग करें), `getConfig` (`getDefaultOptions` का उपयोग करें), `matchers` (`wdioCustomMatchers` का उपयोग करें), `toHaveAttr` (`toHaveAttribute` का उपयोग करें), `toHaveClass` (`toHaveElementClass` का उपयोग करें), `toBeRequestedWithResponse()` (`toBeRequestedWith({ response })` का उपयोग करें), और `expect-webdriverio/types` (`expect-webdriverio/expect-global` का उपयोग करें)।
- `beforeAssertion` और `afterAssertion` hooks को उस alias का नाम मिलता है जिसे टेस्ट ने कॉल किया, `toBeExisting`, `toBePresent`, `toHaveLink`, `toHaveValue` और `toBeRequested` के लिए। v9 में, उन्हें alias के पीछे के matcher का नाम मिलता था, उदाहरण के लिए `toBeExisting` के लिए `toExist`।
- multi-remote browser पर, `$$()` का परिणाम `expect` को दें। `[...elements]` या `Array.from(elements)` जैसा साधारण array elements के रूप में पहचाना नहीं जाता, और assertion फ़ेल होता है।

multi-remote browser पर, एक assertion हर instance की जाँच करता है, और `expect.multiRemote()` हर instance के लिए एक expected value देता है। [Multiremote assertions](/docs/multiremote#assertions) देखें।

## Driver पैकेज

WebdriverIO v10 Firefox, Edge और Safari को `geckodriver` 8, `edgedriver` 8 और `safaridriver` 3 के साथ शुरू करता है। v9 में, यह `geckodriver` और `edgedriver` 6 या 7, और `safaridriver` 1 या 2 का उपयोग करता था। WebdriverIO इन्हें इंस्टॉल करता है, इसलिए आपको इन्हें स्वयं सूचीबद्ध नहीं करना पड़ता। अगर आपकी `package.json` में इनमें से कोई सूचीबद्ध है, तो उसे `@wdio/*` पैकेजों वाले बदलाव में ही अपडेट करें।

`geckodriver` और `edgedriver` `@wdio/logger` को peer dependency के रूप में लेते हैं, इसलिए वे आपके WebdriverIO install के logger के ज़रिए लॉग करते हैं। v9 में, `geckodriver` और `edgedriver` `@wdio/logger` की अपनी कॉपी लाते थे, और वह दूसरी कॉपी `outputDir` में लॉग फ़ाइल को खाली कर देती थी। `npm ls @wdio/logger` चलाएँ: हर कॉपी वर्ज़न 10 की होनी चाहिए। कोई plugin या service जो अब भी वर्ज़न 9 पर निर्भर है, उसका भी यही प्रभाव होता है।

[driver upgrade notes](https://github.com/webdriverio/driver#upgrading-to-geckodriver-8-edgedriver-8-and-safaridriver-3) हर बदलाव की सूची देते हैं। ये बदलाव किसी WebdriverIO प्रोजेक्ट को प्रभावित कर सकते हैं:

- driver डाउनलोड `HTTPS_PROXY` और `HTTP_PROXY` का उपयोग करते हैं। v9 में, `geckodriver` और `edgedriver` डाउनलोड इन्हें अनदेखा करते थे। अगर आपके environment में proxy सेट है लेकिन driver CDN तक सीधे पहुँचना ज़रूरी है, तो उसका host `NO_PROXY` में जोड़ें।
- `geckodriver` अब `GECKODRIVER_FILEPATH` नहीं पढ़ता। `GECKODRIVER_PATH` का उपयोग करें।
- `wdio:edgedriverOptions` और `wdio:safaridriverOptions` `spawnOpts` स्वीकार करते हैं, जैसे `wdio:chromedriverOptions` करता है।

## Browser डाउनलोड

v9 में, WebdriverIO Chrome, Chromium और Chromedriver zip फ़ाइलों को स्वयं extract करता था। v10 में यह Linux और macOS पर system `unzip` कमांड का उपयोग करता है (Windows पर `tar.exe` या PowerShell)। `node:24-slim` जैसी slim Docker images में यह नहीं होता: इसे इंस्टॉल करें, [Docker](/docs/docker#images-where-webdriverio-downloads-the-browser) देखें।

v9 में, Chrome, Chromium, Firefox और Chromedriver डाउनलोड `HTTPS_PROXY` और `HTTP_PROXY` का उपयोग करते थे। v10 में वे इनका उपयोग केवल तब करते हैं जब आपके प्रोजेक्ट में `proxy-agent` इंस्टॉल हो, या जब Node.js `NODE_USE_ENV_PROXY=1` के साथ चले (Node.js 22.21.0 / 24.5.0 या बाद का)। जब कोई proxy variable सेट हो लेकिन डाउनलोड उसे अनदेखा करेगा, तो WebdriverIO एक चेतावनी लॉग करता है। [Proxy For Browser And Driver Downloads](/docs/proxy#proxy-for-browser-and-driver-downloads) देखें।

## Multi-remote Global

lowercase `multiremotebrowser` global हटा दिया गया है, `@wdio/globals` से और `eslint-plugin-wdio` के globals से भी। `multiRemoteBrowser` का उपयोग करें।

```diff
- import { multiremotebrowser } from '@wdio/globals'
+ import { multiRemoteBrowser } from '@wdio/globals'
```

## Capabilities

capabilities में `specs` और `exclude` अब पढ़े नहीं जाते। `wdio:specs` और `wdio:exclude` का उपयोग करें।

```diff
  capabilities: [{
      browserName: 'chrome',
-     specs: ['./test/specs/chrome/**/*.js'],
-     exclude: ['./test/specs/chrome/skip.js']
+     'wdio:specs': ['./test/specs/chrome/**/*.js'],
+     'wdio:exclude': ['./test/specs/chrome/skip.js']
  }]
```

top-level config keys `specs` और `exclude` ही रहती हैं। किसी capability पर बची हुई बिना prefix वाली सूची उस capability के लिए फ़ाइलें नहीं चुनती। तब वह capability top-level `specs` और `exclude` का उपयोग करती है।

`tunnelIdentifier` और `parentTunnel` aliases Sauce Labs options types से हटा दिए गए हैं। `tunnelName` और `tunnelOwner` का उपयोग करें।

## TypeScript

`webdriverio` द्वारा export किए गए `Element`, `MultiRemoteBrowser` और `MultiRemoteElement` types हटा दिए गए हैं। global `WebdriverIO` namespace का उपयोग करें।

```diff
- import type { Element } from 'webdriverio'
- const elem: Element = await $('#foo')
+ const elem: WebdriverIO.Element = await $('#foo')
```

`ChainablePromiseElement` अब `then` घोषित करता है, और `ChainablePromiseArray` `then`, `catch` और `finally` घोषित करता है। chainable types `await` से पहले की value का वर्णन करते हैं। वे अब awaited value में फ़िट नहीं होते:

```ts
let elem: ChainablePromiseElement
elem = await $('h1')
// TS2741: Property 'then' is missing in type 'Element' but required in type 'ChainablePromiseElement'.

let elems: ChainablePromiseArray
elems = await $$('li')
// TS2322: Type 'ElementArray' is not assignable to type 'ChainablePromiseArray'.
```

awaited value को `WebdriverIO.Element` या `WebdriverIO.ElementArray` के रूप में type करें:

```diff
- let elem: ChainablePromiseElement = await $('h1')
- let elems: ChainablePromiseArray = await $$('li')
+ let elem: WebdriverIO.Element = await $('h1')
+ let elems: WebdriverIO.ElementArray = await $$('li')
```

दोनों chainable types अब `T extends PromiseLike<unknown>` से मेल खाते हैं। `PromiseLike` की जाँच करने वाला conditional type `$()` और `$$()` के लिए v9 की तुलना में दूसरी branch लेता है। उदाहरण के लिए, `Awaited<ChainablePromiseElement>` अब `WebdriverIO.Element` है, और `Awaited<ChainablePromiseArray>` `WebdriverIO.ElementArray` है।

non-awaited `$$()` की properties का type बदल गया है। वे query resolve होने से पहले ही तुरंत उपलब्ध हैं, इसलिए उन्हें बिना `await` या `.then()` के पढ़ें:

| प्रॉपर्टी | v9 | v10 |
|---|---|---|
| `selector` | `Promise<Selector>` | `Selector \| undefined` |
| `parent` | `Promise<...>` | पैरेंट, promise नहीं (नीचे देखें) |
| `foundWith` | कोई नहीं | वह कमांड जिसने सूची ढूंढी, जैसे `$$` या `custom$$` |
| `props` | कोई नहीं | उस कमांड के अतिरिक्त आर्ग्युमेंट |

```diff
- const selector = await $$('li').selector
+ const selector = $$('li').selector
```

`$('form').$$('input')` जैसी chained query पर, `parent` सूची resolve होने तक chainable `$('form')` है, और उसके बाद resolved element। `parent` को element के रूप में उपयोग करने से पहले सूची को await करें।

runtime पर, `$$()` सूची पर `filter()`, `filterSeries()` और `slice()` एक element सूची लौटाते हैं, साधारण array नहीं। परिणाम source सूची के `selector`, `foundWith`, `parent` और `props` को बनाए रखता है। v9 में, `filter()` इन properties के बिना एक साधारण array लौटाता था। types अभी यह नहीं दिखाते: `filter()` और `filterSeries()` को `Promise<WebdriverIO.Element[]>` लौटाने वाला घोषित किया गया है, और `slice()` `WebdriverIO.Element[]` लौटाता है, इसलिए जब आप परिणाम पर ये properties पढ़ते हैं तो TypeScript error रिपोर्ट करता है।

WebdriverIO derived सूची के लिए query दोबारा नहीं चलाता: उसके अंत से आगे का index और मैचों की प्रतीक्षा नहीं करता, और यह कभी ऐसा element नहीं लौटाता जिसे filter ने बाहर रखा हो। इसके सदस्य अब भी source query के elements हैं, अपने मूल `selector` और `index` के साथ। अगर कोई सदस्य stale हो जाता है, तो WebdriverIO उसे उसी index पर source query से फिर से fetch करता है, जो पेज बदलने पर कोई दूसरा element हो सकता है। जो कोड सूची की properties से उसकी query दोबारा चलाता है, उदाहरण के लिए `parent[foundWith](selector, ...props)`, उसे पूरी सूची मिलती है, filtered सूची नहीं।

प्रकाशित पैकेज `typeScriptVersion` को 6.0.3 पर सेट करते हैं, जो उस TypeScript वर्ज़न से मेल खाता है जिससे यह रिपॉज़िटरी compile होती है।

`browser.mock()` `urlpattern-polyfill` का `URLPattern` और native `URLPattern` (Node.js 24 में global, और TypeScript 6 की `dom` library द्वारा typed) स्वीकार करता है।

TypeScript 6 `"moduleResolution": "node"` और `"baseUrl"` को deprecate करता है, और `strict` को डिफ़ॉल्ट बनाता है। `create-wdio` अब ESM प्रोजेक्ट के लिए `"moduleResolution": "bundler"` और CommonJS प्रोजेक्ट के लिए `"NodeNext"` बनाता है। अगर आप किसी मौजूदा प्रोजेक्ट में TypeScript अपडेट करते हैं, तो अपनी `tsconfig.json` में ये विकल्प बदलें।

ESM प्रोजेक्ट के लिए:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "moduleResolution": "node",
+        "moduleResolution": "bundler",
         "module": "ESNext"
     }
 }
```

CommonJS प्रोजेक्ट के लिए, दोनों विकल्पों के लिए `NodeNext` का उपयोग करें, जैसा `create-wdio` करता है:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "moduleResolution": "node",
-        "module": "CommonJS"
+        "moduleResolution": "NodeNext",
+        "module": "NodeNext"
     }
 }
```

TypeScript 6 `types` का डिफ़ॉल्ट भी `[]` में बदल देता है, इसलिए यह अब हर इंस्टॉल किए गए `@types/*` पैकेज को लोड नहीं करता। अगर आपकी `tsconfig.json` में कोई `types` सूची नहीं है, तो Mocha के `describe` और `it` जैसे globals `Cannot find name` के साथ फ़ेल होते हैं। उन type पैकेजों को सूचीबद्ध करें जिनका आपके टेस्ट उपयोग करते हैं, जैसा `create-wdio` करता है। उदाहरण के लिए, Mocha के साथ:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
+        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
     }
 }
```

`npm create wdio@latest` `compilerOptions.target` और `compilerOptions.lib` को `es2024` के रूप में लिखता है। उस फ़ाइल की type-checking के लिए TypeScript 5.7 या नया चाहिए। `tsx`, जो config और टेस्ट चलाता है, type-check नहीं करता, इसलिए पुराना compiler केवल तब मायने रखता है जब आप स्वयं `tsc` चलाते हैं।

मौजूदा `tsconfig.json` को दोबारा नहीं लिखा जाता। कोई generated config जो दूसरे config को extend करता है, पैरेंट के `target` और `lib` को बनाए रखता है।

`afterAssertion` hook में, `params.result` का type अब `{ pass, message }` है, जैसा matchers देते हैं। v9 में, type `{ result, message }` था, लेकिन runtime पर `params.result.result` हमेशा `undefined` था। `params.result.pass` पढ़ें:

```diff
  afterAssertion (params) {
-     console.log(params.matcherName, params.result.result)
+     console.log(params.matcherName, params.result.pass)
  }
```

`pass` तब `true` होता है जब value expected value से मेल खाती है, `.not` के साथ भी। इस प्रकार `.not` के साथ, assertion तब पास होता है जब `pass` `false` हो। hook यह नहीं बताता कि टेस्ट ने `.not` का उपयोग किया या नहीं।

## Command hooks

एक element कमांड `beforeCommand` और `afterCommand` hooks को एक बार, कमांड के आर्ग्युमेंट के साथ चलाता है। v9 में, यह उन्हें 2 या 3 बार चलाता था, और पहली कॉल को `args` के रूप में `[]` मिलता था। जो कमांड किसी दूसरे कमांड के अंदर चलता है (उदाहरण के लिए `getText` में `getElementText`), उसकी अब भी अपनी जोड़ी होती है। hooks `emit` event function के लिए नहीं चलते। जो hook कमांड गिनता है या उनका समय मापता है, वह हर कमांड को एक बार देखता है।

element कमांड के लिए, `beforeCommand` WebdriverIO के element की प्रतीक्षा करने से पहले चलता है, इसलिए वहाँ element अब भी अनुपस्थित हो सकता है। `afterCommand` प्रतीक्षा और किसी भी retry के बाद चलता है, अंतिम प्रयास के परिणाम या error के साथ। जिस hook को मिला हुआ element चाहिए, वह `afterCommand` का उपयोग करता है।

`overwriteCommand()` से बदला गया कमांड, और promise पर chained query (`$('a').$('b')`), अब भी hooks को एक से अधिक बार चला सकते हैं।

## Reporters

browser का `result` event reporters को `client:afterCommand` के रूप में आगे भेजा जाता है। उस payload और `AfterCommandArgs` type में अब `name` property नहीं है। इसकी जगह `command` पढ़ें। Custom commands पहले से `command` भेजते थे।

```diff
  onAfterCommand(args) {
-     console.log(args.name)
+     console.log(args.command)
  }
```

### Allure

`@wdio/allure-reporter` पर `addEnvironment(name, value)` हटा दिया गया है। इसका कोई प्रभाव नहीं था। Allure reporter options में [`reportedEnvironmentVars`](/docs/allure-reporter) से environment rows सेट करें।

### Cucumber JSON reporter

`wdio-cucumberjs-json-reporter` WebdriverIO रिपॉज़िटरी में [`@wdio/cucumberjs-json-reporter`](/docs/cucumberjs-json-reporter) के रूप में आ गया है। community पैकेज केवल v9 के लिए है: यह `@wdio/reporter` 9 और `@wdio/logger` 9 इंस्टॉल करता है।

```sh
npm uninstall wdio-cucumberjs-json-reporter
npm install @wdio/cucumberjs-json-reporter --save-dev
```

`reporters: ['cucumberjs-json']` वैसा ही रहता है: WebdriverIO उस नाम के लिए `@wdio/cucumberjs-json-reporter` लोड करता है। अपनी step फ़ाइलों में imports बदलें:

```diff
- import cucumberJson from 'wdio-cucumberjs-json-reporter'
+ import cucumberJson from '@wdio/cucumberjs-json-reporter'
```

विकल्प वही हैं। JSON फ़ाइलें Cucumber JSON format का अधिक बारीकी से पालन करती हैं। उन्हें पढ़ने वाले tools और scripts जाँचें:

- scenario `id` `<feature id>;<scenario id>` है, और `Rule:` में किसी scenario के लिए `<feature id>;<rule id>;<scenario id>`, जैसा Cucumber JSON format में है। पहले, हिस्सों के बीच कोई separator नहीं था।
- feature `id` `:` और `/` जैसे characters को बनाए रखता है (केवल spaces `-` बनते हैं), जैसा Cucumber JSON format में है। JSON फ़ाइलों के नाम नहीं बदलते, लेकिन 200 bytes से अधिक का feature हिस्सा (उदाहरण के लिए कई non-ASCII characters) काट दिया जाता है और एक hash पर समाप्त होता है (Linux फ़ाइल नाम में 255 bytes की अनुमति देता है), और `con` जैसा Windows device name `_` से शुरू होता है।
- feature और scenario `keyword` फ़ाइल के keywords हैं, उदाहरण के लिए `Scenario Outline` या `Fonctionnalité`, जैसा Cucumber JSON format में है। पहले, वे हमेशा `Feature` और `Scenario` होते थे।
- Scenarios और steps में एक `line` होती है।
- Tags `{ name, line }` हैं, जैसा Cucumber JSON format में है; scenario के tags को feature फ़ाइल की line मिलती है। पहले, वे `location`, `id` या `astNodeId` (हर रन पर random) वाले internal Cucumber objects थे, और scenario के tags की कोई line नहीं होती थी।
- Hooks `hidden: true` वाले और बिना `name` वाले steps हैं। पहले, hook का `name` खाली होता था।
- doc string आर्ग्युमेंट `{ content, line }` है। पहले, यह doc string का टेक्स्ट था।
- जिस hook को Cucumber स्किप करता है (फ़ेल hook के बाद, या `'skipped'` लौटाने वाला hook) उसका status `skipped` है, और `'pending'` लौटाने वाले hook का `pending` है, जैसा Cucumber JSON format में है। पहले, ये `passed` होते थे।
- ambiguous step का status `ambiguous` है, जैसा Cucumber JSON format में है, और इसका `error_message` मेल खाने वाली step definitions की सूची देता है। पहले, यह बिना कारण `skipped` था, या `cucumberOpts.failAmbiguousDefinitions` के साथ `failed`।
- undefined step का status `undefined` है। पहले, यह `failed` था, या `cucumberOpts.ignoreUndefinedDefinitions` के साथ `pending`।
- जिस scenario को Cucumber दोबारा चलाता है (`cucumberOpts.retry`) उसमें केवल उसके अंतिम प्रयास के steps होते हैं। पहले, उसमें सभी प्रयासों के steps होते थे।
- `cucumberOpts.tagsInTitle` के साथ, feature और scenario के नाम, ids और फ़ाइल नामों में tags नहीं होते।
- जब कोई worker कई feature फ़ाइलें चलाता है (grouped specs), तो reporter हर feature के लिए एक फ़ाइल लिखता है। पहले, सभी scenarios पहले feature की फ़ाइल में जाते थे।
- multi-remote session में, metadata पहले instance से आता है।

ये पहले अनुपस्थित या गलत थे: `*` steps, `But` steps का keyword, WebdriverIO `before` hook से attachments, `text/plain` के रूप में attach किया गया object (यह JSON टेक्स्ट है, `[object Object]` नहीं), और `application/json` के रूप में attach की गई JSON string (यह जैसी है वैसी रहती है, इसे दूसरी बार encode नहीं किया जाता)। step keywords feature फ़ाइल के `# language:` header का पालन करते हैं, फिर `cucumberOpts.language` का (reporter का `language` विकल्प केवल तब जब `cucumberOpts.language` सेट न हो)। `cucumberOpts.scenarioLevelReporter: true` के साथ, reporter कोई फ़ाइल नहीं लिखता और एक चेतावनी लॉग करता है: format को steps चाहिए।

### Video reporter

`wdio-video-reporter` WebdriverIO रिपॉज़िटरी में [`@wdio/video-reporter`](/docs/video-reporter) के रूप में आ गया है। community पैकेज केवल v9 के लिए है: यह `@wdio/reporter` 9 और `@wdio/logger` 9 इंस्टॉल करता है।

```sh
npm uninstall wdio-video-reporter
npm install @wdio/video-reporter --save-dev
```

community पैकेज ffmpeg स्वयं इंस्टॉल करता था। `@wdio/video-reporter` ऐसा नहीं करता: टेस्ट चलाने वाली हर मशीन पर [ffmpeg इंस्टॉल करें](/docs/video-reporter#install-ffmpeg), CI और Docker images में भी, या `ffmpegPath` विकल्प या `FFMPEG_PATH` environment variable सेट करें। ffmpeg के बिना, reporter एक चेतावनी लॉग करता है और कोई वीडियो नहीं बनाता।

```sh
brew install ffmpeg                                         # macOS
sudo apt-get update && sudo apt-get install -y ffmpeg       # Ubuntu, Debian
winget install --id Gyan.FFmpeg -e                          # Windows
```

`reporters: ['video']` वैसा ही रहता है: WebdriverIO उस नाम के लिए `@wdio/video-reporter` लोड करता है। `wdio-video-reporter` से imports को `@wdio/video-reporter` से बदलें। विकल्प वही हैं, इन बदलावों के साथ:

- `snapshotCommands` W3C WebDriver endpoints के अंतिम हिस्से का उपयोग करता है। पुराने डिफ़ॉल्ट में `buttonup`, `moveto`, `keys` या `accept_alert` जैसे JSON Wire Protocol नाम भी सूचीबद्ध थे। ये नाम कभी किसी v10 कमांड से मेल नहीं खाते। [default list](/docs/video-reporter#snapshotcommands) के नामों का उपयोग करें, उदाहरण के लिए `actions`, `value` या `accept`।
- WebDriver BiDi session में, reporter `url`, `back`, `forward`, `refresh` और `actions` के बाद भी एक frame लेता है।
- WebDriver BiDi session में, reporter WebDriver BiDi से frames लेता है, और अगला कमांड उससे पहले वाले कमांड के frame की प्रतीक्षा करता है (Chrome में लगभग 50 से 70 ms), ताकि हर frame अपने कमांड का पेज दिखाए। पहले, Chrome में, WebDriver BiDi navigation की शुरुआत में लिया गया screenshot टेस्ट को 10 सेकंड तक प्रतीक्षा करा सकता था।
- multi-remote session में, केवल पहले instance के कमांड frame लेते हैं। पहले, हर instance के कमांड पहले instance का frame लेते थे।
- `GET` कमांड केवल पेज पढ़ता है, इसलिए यह कोई frame नहीं देता, `recordAllActions` के अलावा। पहले, `getUrl`, `getSize` या `getValue` एक frame देते थे, क्योंकि उनके endpoint का अंतिम हिस्सा (`url`, `rect`, `value`) `snapshotCommands` में है।
- वीडियो फ़ाइल नामों में तारीख हर मशीन पर `YYYY-MM-DD--HH-MM-SS-mmm` है। पहले, यह मशीन के locale का उपयोग करती थी।
- `videoFormat` `webm` (डिफ़ॉल्ट) और `mp4` स्वीकार करता है। पहले, `videoFormat: 'default'` mp4 वीडियो बनाता था; अब यह एक चेतावनी लॉग करता है और webm वीडियो बनाता है। `videoFormat: 'mp4'` का उपयोग करें।
- Allure reporter के साथ, बिना वीडियो वाले टेस्ट को अब खाली वीडियो attachment नहीं मिलता।

### HTML reporter

`wdio-html-nice-reporter` WebdriverIO रिपॉज़िटरी में [`@wdio/html-reporter`](/docs/html-reporter) के रूप में आ गया है। पुराना पैकेज केवल v9 के लिए है।

```sh
npm uninstall wdio-html-nice-reporter
npm install @wdio/html-reporter --save-dev
```

reporter का नाम `html` है। `reporters` में नाम और imports बदलें:

```diff
- import { ReportAggregator } from 'wdio-html-nice-reporter'
+ import { ReportAggregator } from '@wdio/html-reporter'

  reporters: [
-     ['html-nice', { outputDir: './reports/html-reports/' }]
+     ['html', { outputDir: './reports/html-reports/' }]
  ]
```

विकल्प वही हैं। इन्हें भी बदलें:

- `ReportEvents` `@wdio/html-reporter` से आता है। जो टेस्ट अब भी `@rpii/wdio-report-events` का उपयोग करते हैं वे काम करते हैं, क्योंकि दोनों वही events भेजते हैं।
- command line script `node_modules/@wdio/html-reporter/build/makeReport.js` है। यह `node_modules/wdio-html-nice-reporter/lib/makeReport.js` था।
- Cucumber के साथ, रिपोर्ट steps नहीं बल्कि scenarios गिनती है, और retry किए गए scenario का केवल अंतिम प्रयास गिनती है।

## `$` strict है

`$` अब __ठीक एक__ element को दर्शाता है। अगर selector एक से अधिक element पर resolve होता है, तो कमांड चुपचाप पहले मैच का उपयोग करने की बजाय `StrictSelectorError` फेंकता है:

```js
// v9 — पहले बटन पर क्लिक करता है, भले ही 12 बटन हों
await $('button').click()

// v10
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
// Use `$$("button")` to work with all matches, `$$("button")[0]` if you explicitly want the first one,
// or narrow down the selector so it matches a single element.
```

यह [Playwright locators](https://playwright.dev/docs/locators#strictness) से मेल खाता है। Cypress अलग है: इसकी queries कई elements पर resolve हो सकती हैं, और [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn) जैसे action कमांड डिफ़ॉल्ट रूप से multi-element subject को अस्वीकार करते हैं। जो selector चुपचाप कई elements पर resolve होता है, वह लगभग हमेशा एक छिपा हुआ bug होता है: यह आज पास होता है और जैसे ही कोई पेज पर दूसरा बटन जोड़ता है, गलत element से interact करता है।

यह नियम chain के हर step (`$('form').$('input')`) और `$` द्वारा स्वीकार किए जाने वाले हर selector type पर लागू होता है — string selectors (shadow DOM को भेदने वाले सहित), JS functions, mobile selectors और custom strategy references।

### क्या नहीं बदला

- `$$` अब भी शून्य या कई elements लौटाता है।
- समर्पित helper कमांड `custom$`, `shadow$` और `react$` strict नहीं हैं — वे अब भी अपना पहला मैच लौटाते हैं, जैसे उनके `$$` समकक्ष करते हैं।
- जो selector कुछ भी मेल नहीं खाता, वह अब भी lazily-resolved element लौटाता है, इसलिए `waitForExist` और [auto-waiting](/docs/autowait) पहले जैसा व्यवहार करते हैं।
- element reference पास करना, जैसे `$(await browser.getActiveElement())`, हमेशा एक ही node को संदर्भित करता है और कभी जाँचा नहीं जाता।

### अपने सुइट का audit कैसे करें

इसके लिए कोई codemod नहीं है: केवल आप बता सकते हैं कि दूसरा मैच bug है या जानबूझकर है। दो व्यावहारिक तरीके:

1. __अपना सुइट चलाएँ।__ हर उल्लंघन selector और मैचों की संख्या के साथ error फेंकता है, जो आमतौर पर उसे तुरंत ठीक करने के लिए पर्याप्त होता है।
2. __व्यापक selectors की पहले से जाँच करें।__ अपने page objects में हर सामान्य `$(...)` के लिए, प्रिंट करें कि वह वास्तव में कितने elements से मेल खाता है:

   ```js
   console.log(await $$('button').length) // 12 → `$('button')` बहुत व्यापक है
   ```

फिर या तो selector को सीमित करें — आदर्श रूप से `$('button=Submit')` या `$('aria/Submit')` जैसी user-facing query की ओर, [Selectors](/docs/selectors) देखें — या स्पष्ट रूप से बताएँ कि आप पहला मैच चाहते हैं:

```js
await $('button[type="submit"]').click()
// ...या, अगर आपका मतलब सच में पहला वाला ही है
await $$('button')[0].click()
```

### Opt out करना

एक query के लिए:

```js
await $('button', { strict: false }).click()
```

पूरे प्रोजेक्ट के लिए, v9 का व्यवहार वापस लाते हुए:

```js title="wdio.conf.js"
export const config = {
    // ...
    strictSelectors: false
}
```

element याद रखता है कि उसे कैसे query किया गया था, इसलिए उसे दोबारा fetch करना — stale element reference के बाद, या `waitForExist` के ज़रिए — मूल कॉल की strictness बनाए रखता है।

:::info

अंदरूनी रूप से strict `$` `findElement` की जगह `findElements` request भेजता है, क्योंकि मैचों की गिनती ही नियम लागू करने का एकमात्र तरीका है। दोनों तरह से यह एक ही round trip है, लेकिन यह उन custom services और WebDriver mocks को दिखाई देता है जो `findElement` कमांड पर आधारित हैं।

:::

## `await` से पहले Element सूचियाँ

v10 से, `$$()` एक [`ElementArray`](/docs/api/browser/$$) लौटाता है: एक वास्तविक array जिसे आप `await` कर सकते हैं। v9 में, जिस `$$()` को आपने await नहीं किया वह एक promise था।

| `await` से पहले `$$('li')` | v9 | v10 |
| --- | --- | --- |
| `instanceof Promise` | `true` | `false` |
| `Array.isArray()` | `false` | `true` |
| `then`, `catch`, `finally` | फ़ंक्शन | फ़ंक्शन, जब तक सूची लोड नहीं हो जाती |

जब तक सूची लोड नहीं होती, `length` एक promise है, और `[...list]`, `Array.from(list)` और `for...of` `Cannot synchronously iterate over an element list that has not resolved yet` फेंकते हैं।

यही बात `custom$$`, `shadow$$` और `react$$` के लिए, और multi-remote browser पर `$$()` के लिए भी सही है। जिस `$()` को आपने await नहीं किया वह अब भी एक promise है।

`await` वही सूची देता है, लोड की हुई और बिना `then` के। तब `length` एक number है, और `for...of`, `[...list]` और `Array.from()` काम करते हैं। `await` से पहले, आप `for await`, एक index (`$$('li')[0]`), `at()`, `slice()` और async iteration methods (`map`, `filter`, `forEach`, ...) का उपयोग कर सकते हैं। ये methods एक promise देते हैं: index पढ़ने से पहले `filter()` के परिणाम को `await` करें।

`$$(selector)` सूची के अंत से आगे का index `undefined` नहीं है, `await` के बाद भी। यह एक element है जो सूची के उस index तक पहुँचने की प्रतीक्षा करता है, जैसा `$$('li')[5]` `await` से पहले करता है: `isExisting()` `false` देता है और `getText()` जैसा कमांड `Index out of bounds` फेंकता है, दोनों `waitforTimeout` के बाद। v9 में, `(await $$('li'))[5]` `undefined` था। इसलिए `if (list[5])` हमेशा true है, और `list.at(5)` कभी `undefined` नहीं है। index की तुलना `length` से करें, जो प्रतीक्षा नहीं करता:

```diff
  const list = await $$('li')
- if (list[5]) {
+ if (list.length > 5) {
```

`await` के बाद, negative index, और `slice()` या `filter()` से मिली सूची, अंत से आगे `undefined` देते हैं। `await` से पहले, 0 या अधिक के integer index के साथ `list[i]`, और `at()`, एक promise देते हैं, जो हमेशा truthy होता है।

जो कोड किसी value को केवल तब await करता है जब वह `Promise` हो, या जो बिना `await` के `length` पढ़ता है, वह error नहीं फेंकता। वह length के रूप में एक promise पढ़ता है: `list.length > 0` और `for (let i = 0; i < list.length; i++)` जैसा loop `false` देखते हैं, लेकिन `if (list.length)` और `list.length !== 0` `true` देखते हैं। value को हमेशा `await` करें। पहले से लोड value पर `await` वही value देता है:

```diff
- if (value instanceof Promise) {
-     value = await value
- }
+ value = await value
```

```diff
- if ($$('button').length > 0) {
+ if (await $$('button').length > 0) {
```

## Legacy command signatures {#legacy-command-signatures}

v9 अब भी पुराने positional रूप स्वीकार करता था और चेतावनी देता था। v10 केवल options object स्वीकार करता है।

v10 [codemod](https://github.com/webdriverio/codemod) `addCommand` और `overwriteCommand` को तब दोबारा लिखता है जब तीसरा आर्ग्युमेंट boolean हो, `getHTML(true)` और `getHTML(false)` को, और `getCookies` को जब filter एक string या एक-element array हो। एक से अधिक नाम वाली `getCookies` कॉल अपरिवर्तित छोड़ दी जाती है, क्योंकि एक filter एक नाम से मेल खाता है।

पहले codemod इंस्टॉल करें। WebdriverIO इस पर निर्भर नहीं है।

```sh
npm install jscodeshift @wdio/codemod
npx jscodeshift -t ./node_modules/@wdio/codemod/v10 ./e2e/
```

TypeScript फ़ाइलों के लिए `--parser=tsx` का उपयोग करें।

### `addCommand` और `overwriteCommand`

```diff
- browser.addCommand('myFn', fn, true)
+ browser.addCommand('myFn', fn, { attachToElement: true })

- browser.overwriteCommand('click', fn, true)
+ browser.overwriteCommand('click', fn, { attachToElement: true })
```

boolean तीसरा आर्ग्युमेंट TypeScript error है। runtime पर यह फेंकता है:

```
Passing a boolean as the third argument to `addCommand` was removed in WebdriverIO v10. Use `addCommand(name, fn, { attachToElement: true })`.
```

`proto` और `instances` उसी options object पर आते हैं। कमांड को browser से जोड़ने के लिए तीसरा आर्ग्युमेंट छोड़ दें।

### `getCookies`

String और string-array filters अस्वीकार किए जाते हैं। एक [cookie filter object](https://w3c.github.io/webdriver-bidi/#type-storage-CookieFilter) पास करें। एक कॉल एक नाम को filter करती है; दूसरे नाम के लिए इसे फिर से कॉल करें।

```diff
- await browser.getCookies('session')
- await browser.getCookies(['session', 'auth'])
+ await browser.getCookies({ name: 'session' })
+ await browser.getCookies({ name: 'auth' })
```

बिना आर्ग्युमेंट के `getCookies()` अब भी पेज को दिखाई देने वाली हर cookie लौटाता है।

### `getHTML`

```diff
- await $('h1').getHTML(false)
+ await $('h1').getHTML({ includeSelectorTag: false })
```

बिना आर्ग्युमेंट के `getHTML()` अब भी element का अपना tag शामिल करता है।

### `newWindow`

`windowName` और `windowFeatures` हटा दिए गए हैं। वे केवल WebDriver Classic पर लागू होते थे। कमांड अब भी `type` स्वीकार करता है:

```diff
- await browser.newWindow('https://webdriver.io', {
-     windowName: 'WebdriverIO window',
-     windowFeatures: 'width=420,height=230,resizable,scrollbars=yes,status=1',
- })
+ await browser.newWindow('https://webdriver.io', { type: 'window' })
```

tab खोलने के लिए `type: 'tab'` का उपयोग करें।

WebDriver BiDi session में, `newWindow()` नया [browsing context](/docs/api/browsingContext) लौटाता है और उस पर switch नहीं करता। v9 में यह switch करता था। इस प्रकार `newWindow()` के बाद `browser.closeWindow()` अब नए tab को नहीं, बल्कि पहले tab को बंद करता है। नए tab के लिए कमांड उस context पर चलाएँ जो `newWindow()` लौटाता है, और उस context पर `closeWindow()` से उसे बंद करें:

```diff
- await browser.newWindow('https://webdriver.io', { type: 'tab' })
- console.log(await browser.getTitle())
- await browser.closeWindow()
+ const tab = await browser.newWindow('https://webdriver.io', { type: 'tab' })
+ console.log(await tab.getTitle())
+ await tab.closeWindow()
```

TypeScript में, परिणाम type `WebdriverIO.BrowsingContext | { handle, type }` है, क्योंकि WebDriver Classic session window handle लौटाता है। BiDi session में, इसे narrow करें: `await browser.newWindow(url, { type: 'tab' }) as WebdriverIO.BrowsingContext`।

browser पहले tab पर ही रहता है। उस पर वापस जाने वाली `switchWindow()` कॉल हटा दें: `switchWindow` BiDi session में error फेंकता है। browsing context model के लिए [`switchToFrame`](#switchtoframe) देखें।

### `startActivity`

केवल options object स्वीकार किया जाता है। `appWaitPackage`, `appWaitActivity` और `optionalIntentArguments` हटा दिए गए हैं। वे केवल हटाए गए Appium HTTP endpoint पर लागू होते थे। `mobile: startActivity` उन्हें स्वीकार नहीं करता, और उन्हें पास करने पर error आता है।

```diff
- await browser.startActivity('com.example.app', '.MainActivity')
- await browser.startActivity({
-     appPackage: 'com.example.app',
-     appActivity: '.MainActivity',
-     appWaitPackage: 'com.example.app',
-     appWaitActivity: '.MainActivity',
-     optionalIntentArguments: '--ez extra true',
- })
+ await browser.startActivity({
+     appPackage: 'com.example.app',
+     appActivity: '.MainActivity',
+ })
```

## हटाए गए कमांड

`browser.throttle` और deprecated `touchAction` कमांड हटा दिए गए हैं।

| v9 | v10 |
| --- | --- |
| `browser.throttle('Regular3G')` | [`browser.throttleNetwork('Regular3G')`](/docs/api/browser/throttleNetwork) |
| `browser.touchAction(...)` / `element.touchAction(...)` | touch pointer के साथ [Actions API](/docs/api/browser/action), या mobile कमांड [`tap`](/docs/api/mobile/tap) और [`swipe`](/docs/api/mobile/swipe) |

Actions API के साथ एक touch gesture:

```js
await browser.action('pointer', { parameters: { pointerType: 'touch' } })
    .move({ x: 100, y: 500 })
    .down()
    .move({ x: 100, y: 100, duration: 300 })
    .up()
    .perform()
```

## `uploadFile`

`browser.uploadFile()` हटा दिया गया है। यह एक local फ़ाइल को zip करके Selenium `file` endpoint पर post करता था, जो WebDriver या WebDriver BiDi का हिस्सा नहीं है। file input को [`element.setFiles()`](/docs/api/element/setFiles) से सेट करें।

```diff
- const remotePath = await browser.uploadFile('/path/to/file.png')
- await $('#file-upload').setValue(remotePath)
+ await $('#file-upload').setFiles('/path/to/file.png')
+ await $('#file-upload').setFiles(['/path/to/a.png', '/path/to/b.png'])
```

`setFiles` को BiDi session चाहिए। paths browser द्वारा खोले जाते हैं। relative path को `process.cwd()` के सापेक्ष resolve किया जाता है। Selenium Grid file staging v10 का हिस्सा नहीं है। जो सुइट किसी node पर bytes भेजने के लिए `uploadFile` पर निर्भर था, उसे फ़ाइल वहाँ रखनी होगी जहाँ browser उसे पढ़ सके, फिर `setFiles` कॉल करना होगा।

classic local session पर, `element.setValue('/local/path')` अब भी एक ऐसा path टाइप करता है जिसे local browser पहले से देख सकता है। सीधे इसे कॉल करने वाले Grid users के लिए raw Selenium endpoint `browser.file()` बना रहता है।

## `executeAsync`

`browser.executeAsync` और `element.executeAsync` हटा दिए गए हैं। [`execute`](/docs/api/browser/execute) को एक `async` function पास करें। function की return value, जिसमें लौटाया गया promise शामिल है, कमांड का परिणाम है। `script` timeout अब भी लागू होता है, WebDriver BiDi session में भी: जो script अधिक समय तक चलती है वह `script timeout` error के साथ फ़ेल होती है। [`bidiResponseTimeout`](/docs/configuration#bidiresponsetimeout) (डिफ़ॉल्ट रूप से 180 सेकंड) से लंबे `script` timeout के लिए, दोनों बढ़ाएँ।

```ts
const result = await browser.execute(async (a, b) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return a + b
}, 1, 2)
```

WebDriver `done` callback हटा दें। जो string script अपने अंतिम आर्ग्युमेंट के रूप में उस callback की अपेक्षा करती थी, उसे इसकी जगह एक promise लौटाना होगा। runtime पर, `executeAsync` एक function नहीं है।

## `switchToFrame`

`browser.switchToFrame` अब public कमांड नहीं है।

WebDriver BiDi session में, `switchFrame` और `switchWindow` error फेंकते हैं। एक tab, एक window और एक frame एक `WebdriverIO.BrowsingContext` है जिसे आप रखते हैं। `browser.url()` session के प्रारंभिक top-level context को navigate करता है और उसे लौटाता है। `browser.newWindow()` नया context लौटाता है और उस पर switch नहीं करता। `context.frame()` एक child frame लौटाता है। `context.parent` वह frame है जिससे आपने इसे खोला।

```ts
const page = await browser.url('https://example.com')
const other = await browser.newWindow('https://webdriver.io', { type: 'tab' })
console.log(await page.getTitle())
const frame = await page.frame('iframe')
console.log(await frame.$('h1').getText())
const pages = await browser.browsingContexts()
```

`context.url` document URL string है। रखे गए context को `context.navigate(url)` से navigate करें। `browser.url()` से load metadata `context.request` है।

Classic session में, element के साथ, या top frame के लिए `null` के साथ `switchFrame` कॉल करते रहें। वहाँ string या function अस्वीकार किया जाता है।

```diff
- await browser.switchToFrame(await $('iframe'))
- await browser.switchToFrame(null)
+ await browser.switchFrame($('iframe'))
+ await browser.switchFrame(null)
```

## `setTimeout`

JSON Wire Protocol key `page load` अस्वीकार की जाती है। `pageLoad` का उपयोग करें।

```diff
- await browser.setTimeout({ 'page load': 10000 })
+ await browser.setTimeout({ pageLoad: 10000 })
```

`implicit` और `script` अपरिवर्तित हैं।

## Multi-remote instance access

multi-remote browser अब हर session को अपनी property के रूप में स्टोर नहीं करता। multi-remote element के लिए भी यही सही है। एक session को संबोधित करने का तरीका `getInstance` और `select` है।

```diff
- await browser.myChromeBrowser.url('https://webdriver.io')
- await (await browser.$('button')).myChromeBrowser.click()
+ await browser.getInstance('myChromeBrowser').url('https://webdriver.io')
+ await (await browser.$('button')).getInstance('myChromeBrowser').click()
```

जो TypeScript augmentation `WebdriverIO.MultiRemoteBrowser` में `myChromeBrowser: WebdriverIO.Browser` जोड़ता है, वह अब किसी runtime property से मेल नहीं खाता। उस augmentation को हटाएँ और `getInstance` कॉल करें।

testrunner और `injectGlobals` चालू रहने पर, instance का नाम अब भी एक global है (`myChromeBrowser.url(...)`)। वह global एकल session है। यह `browser.myChromeBrowser` नहीं है।

कमांड के परिणाम capability क्रम में रहते हैं: पहली entry capabilities object की पहली key की होती है।

multi-remote browser पर `browser.$$()` एक `WebdriverIO.MultiRemoteElementArray` लौटाता है, साधारण `MultiRemoteElement[]` नहीं। यह अब भी एक array है, इसलिए `elements[0]` जैसा index read काम करता रहता है।

इसके `map`, `filter`, `forEach`, `find`, `findIndex`, `some`, `every` और `reduce` methods async हैं, जैसे `WebdriverIO.ElementArray` पर, और एक promise लौटाते हैं, `await` के बाद भी। यही बात `custom$$()`, `react$$()` और `shadow$$()` द्वारा लौटाई गई सूचियों के लिए सही है। v9 में ये साधारण array के sync methods थे:

```diff
  const items = await browser.$$('li')
- const ids = items.map((item) => item.selector)
+ const ids = await items.map((item) => item.selector)
```

`custom$()`, `react$()` और, element पर, `shadow$()`, `nextElement()`, `previousElement()` और `parentElement()` एक `WebdriverIO.MultiRemoteElement` लौटाते हैं, जैसा `$()` करता है। v9 में वे एक साधारण array में हर instance के लिए एक element लौटाते थे। एक browser का element `getInstance` से पढ़ें:

```diff
- const [chromeHost, firefoxHost] = await browser.custom$('byTestId', 'host')
- await chromeHost.click()
+ const host = await browser.custom$('byTestId', 'host')
+ await host.getInstance('myChromeBrowser').click()
```

`custom$$()`, `react$$()` और, element पर, `shadow$$()` एक `WebdriverIO.MultiRemoteElementArray` लौटाते हैं, जैसा `$$()` करता है। v9 में वे एक साधारण array में हर instance के लिए एक सूची लौटाते थे। हर entry हर instance को संबोधित करती है। जो instance कम elements ढूंढता है, उसके पास उस index पर कोई element नहीं होता:

```diff
- const [chromeItems, firefoxItems] = await browser.custom$$('byTestId', 'item')
- await chromeItems[0].click()
+ const items = await browser.custom$$('byTestId', 'item')
+ await items[0].getInstance('myChromeBrowser').click()
```

`WebdriverIO.MultiRemoteElement['selector']` का type `Selector` है, जैसा `WebdriverIO.Element['selector']` का है। v9 में इसका type `string` था, लेकिन value एक function या custom strategy reference भी हो सकती थी। जो TypeScript कोड इसे string के रूप में उपयोग करता है, उदाहरण के लिए `element.selector.includes('…')`, उसे पहले type की जाँच करनी होगी।

`WDIO_ENABLE_MULTI_REMOTE_SELECT` और `WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY` हटा दिए गए हैं। `select()` हमेशा उपलब्ध है, और `$$()` हमेशा ऊपर वाला element array लौटाता है। दोनों variables हटा दें।

## Binary mock responses

`mock.respond()` और `mock.respondOnce()` `Uint8Array` और `ArrayBuffer` payloads स्वीकार करते हैं, जिसमें global `Buffer` के बिना component tests में polyfilled `Buffer` शामिल है।

`mock.getBinaryResponse()` अब `Uint8Array | null` के रूप में typed है। यह Node.js में अब भी `Buffer` लौटाता है, लेकिन browser में `Uint8Array` लौटाता है। Node.js में Buffer-specific methods का उपयोग करने के लिए, पहले non-null परिणाम को convert करें:

```diff
- const base64 = mock.getBinaryResponse(requestId)?.toString('base64')
+ const bytes = mock.getBinaryResponse(requestId)
+ const base64 = bytes === null ? undefined : Buffer.from(bytes).toString('base64')
```

## Multi-remote network mocks

multi-remote browser पर `browser.mock()` एक `WebdriverIO.MultiRemoteMock` लौटाता है, mocks का array नहीं। `respond`, `restore` और अन्य mock methods हर instance पर चलते हैं। captured requests एक browser के mock से पढ़ें। global `WebdriverIO` namespace से `WebdriverIO.MultiRemoteMock` type का उपयोग करें।

```diff
- const [chromeMock, firefoxMock] = await browser.mock('*/api')
- expect(chromeMock.calls).toHaveLength(1)
+ const mock = await browser.mock('*/api')
+ mock.respond({ ok: true })
+ expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
+ expect(mock.instances).toEqual(['myChromeBrowser', 'myFirefoxBrowser'])
```

जब नाम `instances` में से एक नहीं होता, तो `getInstance` `Multi-remote object has no instance named "<name>"` फेंकता है। `browser.select('myFirefoxBrowser', 'myChromeBrowser')` से मिला mock उन instances को उसी क्रम में सूचीबद्ध करता है, जो `browser.instances` से अलग हो सकता है। यह न मानें कि `mocks[0]` कोई विशेष browser है।

## Backend को छोड़ने वाले mock responses

`mock.respond(..., { fetchResponse: false })` backend को कॉल नहीं करता। v9 में, जो mock `statusCode` या `responseHeaders` पर भी filter करता था, वह उस filter को अनदेखा करता था और फिर भी हर मेल खाने वाले request का जवाब देता था। v10 में, `respond()` और `respondOnce()` error फेंकते हैं, क्योंकि उन filters का निर्णय केवल backend response से लिया जा सकता है।

```diff
- const mock = await browser.mock('**/users', { statusCode: 200 })
- mock.respond({ name: 'Ada' }, { fetchResponse: false })
+ const mock = await browser.mock('**/users')
+ mock.respond({ name: 'Ada' }, { fetchResponse: false })
```

filter बनाए रखने के लिए, `fetchResponse` छोड़ दें ताकि mock response fetch करे, status या headers जाँचे, और फिर body बदले।

## Element references {#element-references}

Element ids W3C WebDriver key `element-6066-11e4-a52e-4f735466cecf` और `elementId` property का उपयोग करते हैं। JSON Wire Protocol field `ELEMENT` अब element contract का हिस्सा नहीं है।

`WebdriverIO.Element` अब `ELEMENT` घोषित नहीं करता। `element.elementId` पढ़ें, जिसे element instances पहले से expose करते हैं।

`browser.execute`, और पेज में element भेजने वाली built-in scripts (`getHTML`, `isClickable`, `isDisplayed`, `scrollIntoView`, और बाकी), केवल W3C reference पास करती हैं:

```diff
- await browser.execute((el) => el.ELEMENT, elem)
+ await browser.execute(
+     (el) => el['element-6066-11e4-a52e-4f735466cecf'],
+     elem
+ )
```

जिस find-element body में केवल `{ ELEMENT: '...' }` होता है, वह element नहीं है। W3C key शामिल करें। अगर दोनों keys मौजूद हैं, तो WebdriverIO W3C id का उपयोग करता है।

Jasmine chained `$()` परिणाम को `toJSON` के ज़रिए प्रिंट करता है। वह value वही W3C reference है, `{ 'element-6066-11e4-a52e-4f735466cecf': elementId }`।

WebDriver BiDi के साथ, जो script `NodeList` (उदाहरण के लिए `querySelectorAll` से) या `HTMLCollection` (उदाहरण के लिए `element.children`) लौटाती है, वह अब element references की सूची देती है, जैसा WebDriver Classic करता है। v9 में यह raw BiDi values देती थी, इसलिए `browser.execute` ऐसे objects लौटाता था जो elements नहीं हैं, और `querySelectorAll(...)` लौटाने वाली `custom$` या `custom$$` strategy को कोई element नहीं मिलता था। `Array.from(document.querySelectorAll(...))` जैसा workaround अब भी काम करता है, और आप इसे हटा सकते हैं:

```diff
  browser.addLocatorStrategy('byCss', (selector) =>
-     Array.from(document.querySelectorAll(selector))
+     document.querySelectorAll(selector)
  )
```

## React selectors

`react$` और `react$$` अब React 16 से 19 के साथ काम करते हैं, उस app के लिए जो `createRoot` या `ReactDOM.render` से शुरू होता है। पहले, `browser.react$` और `browser.react$$` React 18 और बाद के वर्ज़न के साथ फ़ेल होते थे (`Could not find the root element of your application`), और हर वर्ज़न में परिणाम अंतिम update से पहले के render से आ सकता था, इसलिए state change द्वारा जोड़ा गया component नहीं मिलता था।

जिस पेज पर React ने अभी तक root render नहीं किया है, वहाँ कमांड अब फ़ेल होने से पहले उसके लिए 5 सेकंड तक प्रतीक्षा करते हैं। पहले, वे तुरंत फ़ेल हो जाते थे, इसलिए देर से शुरू होने वाला app नहीं मिलता था।

कमांड अब [resq](https://github.com/baruchvlz/resq) library का उपयोग नहीं करते, और WebdriverIO अब इसे इंस्टॉल नहीं करता। selector नियम नहीं बदलते ([React Selectors](/docs/selectors#react-selectors) देखें), इन अपवादों के साथ:

- `props` और `state` दोनों के साथ `react$` वह component ढूंढता है जो दोनों से मेल खाता है। पहले, जब `state` भी दिया गया हो तो यह `props` को अनदेखा करता था।
- `react$$` हर DOM node को एक बार देता है। पहले, कुछ browsers में higher-order component और उसका child एक ही element को दो बार देते थे।
- fragment वाला fragment nodes की एक flat सूची देता है। पहले, `react$` एक सूची लौटा सकता था।
- `null` value वाला filter काम करता है। पहले, यह `Cannot convert undefined or null to object` के साथ फ़ेल होता था।
- element scope के बिना, कमांड पेज के सभी React roots को document के क्रम में खोजते हैं, दूसरे roots के अंदर के roots और open shadow roots के roots भी। `react$` पहला मैच देता है। पहले, वे केवल पहले root को खोजते थे, उसे भी जिसे React ने अभी render नहीं किया था या unmount कर दिया था, और shadow roots को नहीं खोजते थे। एक से अधिक root वाले पेज पर, `react$$` अब अधिक elements दे सकता है: केवल एक root खोजने के लिए, उसके container पर कमांड कॉल करें, उदाहरण के लिए `$('#root').react$$('MyComponent')`।
- दूसरे root के अंदर के root के container पर, कमांड inner root को खोजते हैं। पहले, वे outer root को खोजते थे।
- frame के browsing context पर, और frame के element पर, कमांड काम करते हैं। पहले, context कमांड `this.executeScript is not a function` के साथ फ़ेल होता था, और element कमांड `Could not find instance of React in given element` के साथ फ़ेल होता था।

internal script `webdriverio/scripts/resq` हटा दी गई है।

## Component testing

`@wdio/browser-runner` `@vitest/spy` 5 (पहले 3) से `fn`, `spyOn` और mock types को re-export करता है। जिस mock को आपका कोड `new` के साथ कॉल करता है, उसे `function` या `class` implementation चाहिए। arrow function `is not a constructor` फेंकता है, और जब mock को `new` के साथ कॉल किया जाता है तो `mockReturnValue` error फेंकता है।

```diff
- const Client = fn(() => ({ close: fn() }))
+ const Client = fn(function () { return { close: fn() } })
```

अन्य spy बदलावों के लिए, [Vitest migration guide](https://vitest.dev/guide/migration) देखें।

## Puppeteer

`webdriverio` `puppeteer-core` `>=24 <26` स्वीकार करता है, जिसमें Puppeteer 25 शामिल है। `getPuppeteer()` और `@wdio/lighthouse-service` उसी line के विरुद्ध टेस्ट किए गए हैं।

## ESLint

`eslint-plugin-wdio` को ESLint 10 चाहिए। ESLint 9 2026-08-06 को [end of life](https://eslint.org/version-support/) पर पहुँच गया और अब समर्थित नहीं है। TypeScript के साथ, `typescript-eslint` 8.56.0 या बाद का उपयोग करें।

```sh
npm install --save-dev eslint@10 eslint-plugin-wdio
```

`eslint-plugin-wdio` केवल flat config `flat/recommended` export करता है। eslintrc नाम `plugin:wdio/recommended` हटा दिया गया है।

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    wdioConfig['flat/recommended'],
]
```

जब `typescript-eslint` पैकेज इंस्टॉल होता है, तो recommended config `wdio/await-expect` की जगह type-aware `wdio/no-floating-promise` rule पर switch करता है। केवल `@typescript-eslint/eslint-plugin` इंस्टॉल करना पर्याप्त नहीं है।

```sh
npm install --save-dev typescript typescript-eslint
```

उस mode में, config हर मेल खाने वाली फ़ाइल को TypeScript project service से parse करता है। इसे TypeScript फ़ाइलों तक सीमित रखें, और सुनिश्चित करें कि वे किसी `tsconfig.json` का हिस्सा हों:

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    { files: ['**/*.{ts,mts,cts,tsx}'], ...wdioConfig['flat/recommended'] },
]
```

जो मेल खाने वाली JavaScript फ़ाइल TypeScript project में नहीं है, जैसे `wdio.conf.js`, वह "was not found by the project service" के साथ फ़ेल होती है। JavaScript फ़ाइलों को भी lint करने के लिए, `"allowJs": true` सेट करें, उन्हें `tsconfig.json` में `include` में जोड़ें, और pattern को `**/*.{js,mjs,cjs,ts,mts,cts,tsx}` तक बढ़ाएँ।

## Custom frameworks

custom framework adapter पर `setupExpect` अब matchers का `Map` स्वीकार नहीं करता, और runner अब matchers object में `entries` method नहीं जोड़ता। `Object.entries(wdioMatchers)` से iterate करें।

## Firefox profile

`@wdio/firefox-profile-service` अब `legacy` को service विकल्प के रूप में नहीं मानता। वह flag केवल Firefox 55 और पुराने पर लागू होता था। इसे हटा दें। बचा हुआ `legacy: true` profile में `legacy` नाम की preference के रूप में लिखा जाता है।

## WebDriver protocol

हर session एक [W3C WebDriver](https://w3c.github.io/webdriver/) session है। WebdriverIO JSON Wire Protocol या Mobile JSON Wire Protocol नहीं बोलता। v9 ने वे कमांड हटा दिए थे। v10 उन protocols द्वारा उपयोग किए जाने वाले response envelope को भी हटा देता है, इसलिए जो server अब भी इसे लौटाता है वह session शुरू नहीं कर सकता।

`browser.isW3C` हटा दिया गया है, जिसमें worker `sessionStarted` message पर पहले आगे भेजी जाने वाली value शामिल है। `attach` को `isW3C` पास करना अनदेखा किया जाता है। BiDi command set client पर रहता है। live BiDi connection अब भी `webSocketUrl` पर निर्भर करता है।

### BiDi पर `browser.back()` और `browser.forward()`

कॉल साइट्स `await browser.back()` और `await browser.forward()` ही रहती हैं। कोई भी कमांड न तो आर्ग्युमेंट लेता है और न ही value लौटाता है।

BiDi session पर ये कमांड top-level browsing context पर `delta` `-1` या `1` के साथ `browsingContext.traverseHistory` कॉल करते हैं, फिर उस document readiness की प्रतीक्षा करते हैं जिससे `pageLoadStrategy` map होता है। `none` तब लौटता है जब traversal कमांड स्वीकार हो जाता है। `eager` `browsingContext.domContentLoaded` की प्रतीक्षा करता है। `normal`, जो डिफ़ॉल्ट है, `browsingContext.load` की प्रतीक्षा करता है। back-forward cache restore वे events emit नहीं करता; कमांड तब लौटता है जब committed document का `readyState` पहले से strategy से मेल खाता है। प्रतीक्षा session page-load timeout का उपयोग करती है (`timeouts.pageLoad`, सेट न होने पर 300000 ms)। Classic sessions अब भी `POST /session/:sessionId/back` और `POST /session/:sessionId/forward` पर post करते हैं।

अनुपस्थित history entry अब भी reject होती है। BiDi पर message `browsingContext.traverseHistory` से आता है और उसमें classic WebDriver error टेक्स्ट की बजाय `no such history entry` होता है। जो traversal कभी अपेक्षित readiness तक नहीं पहुँचता, वह `History traversal timed out after <ms>ms waiting for browsingContext.domContentLoaded` या `browsingContext.load` के साथ reject होता है।

### New session response

Create Session को W3C body लौटानी होगी। WebdriverIO `value.sessionId` और `value.capabilities` पढ़ता है:

```json
{
  "value": {
    "sessionId": "8e8a5c2e",
    "capabilities": {
      "browserName": "chrome",
      "browserVersion": "131.0.6778.85"
    }
  }
}
```

JSON Wire Protocol body अस्वीकार की जाती है। वह body `sessionId` और `status` को `value` के बगल में रखती है, और capabilities को `value` में ही रखती है:

```json
{
  "sessionId": "8e8a5c2e",
  "status": 0,
  "value": {
    "browserName": "chrome",
    "version": "131.0"
  }
}
```

तब session creation `WebDriver new session response is missing a session id or capabilities. WebdriverIO requires a W3C WebDriver server.` फेंकता है। यही error तब उठता है जब `value.capabilities` अनुपस्थित हो, भले ही `value.sessionId` मौजूद हो।

आपकी config में flat capability object अब भी मान्य है। WebdriverIO request भेजने से पहले `{ browserName: 'chrome' }` को `alwaysMatch` में wrap करता है। W3C capability set के बाहर की keys के साथ मिली vendor-prefixed keys अब भी अस्वीकार की जाती हैं। vendor settings को `sauce:options`, `bstack:options`, `appium:options`, या किसी अन्य prefixed key में रखें।

### Command responses

कमांड का परिणाम `{ "value": … }` है। `value` में बिना `error` के HTTP 200 सफलता है। अनुपस्थित element HTTP 404 है जिसमें `value.error` `"no such element"` पर सेट है, जो अब भी lazy element lookup की अनुमति देता है। body पर numeric `status` अनदेखा किया जाता है, जिसमें `status: 0` और पुराना `status: 7` ("no such element") code शामिल है। इसकी जगह W3C error object भेजें।

export किया गया error type `JSONWPCommandError` अब `SessionRequestError` है।

### Servers

जिन drivers के विरुद्ध WebdriverIO चलता है, वे client connection पर पहले से W3C बोलते हैं:

- ChromeDriver Chrome 75 से डिफ़ॉल्ट रूप से W3C है। Chromium-based Edge इससे मेल खाता है। वर्तमान ChromeDriver अब भी `goog:chromeOptions.w3c: false` स्वीकार करता है, जो उस एक session को legacy protocol पर वापस switch कर देता है। WebdriverIO उस switch का समर्थन नहीं करता।
- geckodriver और Apple का safaridriver केवल W3C हैं। जो Safari response `platformName` या `browserVersion` छोड़ देता है, वह अब भी W3C है।
- Selenium 4 और Grid 4 W3C बोलते हैं। Grid ने 4.9 में JSON Wire Protocol का translation बंद कर दिया।
- Appium 2 ने JSON Wire Protocol और Mobile JSON Wire Protocol हटा दिए। Appium 3 ने बचे हुए parameter shapes भी हटा दिए। v10 को Appium 3 चाहिए, जो नीचे बताया गया है। जो mobile session `setWindowRect` छोड़ देता है, वह अब भी W3C है; उस capability का अर्थ है कि device window का आकार नहीं बदल सकता।

ये servers अब भी JSON Wire Protocol बोलते हैं और समर्थित नहीं हैं: Selenium 3, PhantomJS, EdgeHTML (`--jwp`), और सीधे जुड़ा WinAppDriver। Appium Windows driver W3C client के रूप में समर्थित रहता है। यह कमांड को WinAppDriver में translate करता है, जिसमें Get Element Property को attribute endpoint में translate करना शामिल है। WebdriverIO को Appium की ओर point करें, WinAppDriver के port की ओर नहीं।

[`@wdio/jsonwp-service`](https://www.npmjs.com/package/@wdio/jsonwp-service) उन servers को v10 के साथ काम करने लायक नहीं बनाता। session startup को अब भी ऊपर वाली W3C body चाहिए, और कमांड परिणाम अब भी numeric `status` को अनदेखा करते हैं। अगर वह server अब भी ज़रूरी है, तो WebdriverIO 9 पर बने रहें।

`webdriver.remote.sessionid` अब Selenium standalone session को चिह्नित नहीं करता। Selenium Grid 4 अब भी `se:cdp` से पहचाना जाता है।

`page load` timeout key [`setTimeout`](#settimeout) के अंतर्गत बताई गई है। Element ids [Element references](#element-references) के अंतर्गत बताए गए हैं। desktop पर, `[name="..."]` एक CSS selector है। `name` locator strategy mobile sessions के लिए बनी रहती है।

## Appium

WebdriverIO 10 को **Appium 3** और वर्तमान official drivers (UiAutomator2, XCUITest, Espresso, Windows, Mac2, आदि) चाहिए। Appium 1.x और 2.x असमर्थित हैं। अगर आप server अपग्रेड नहीं कर सकते, तो WebdriverIO 9 पर बने रहें।

```sh
npm i -D appium@^3
appium driver update installed
```

`@wdio/appium-service` `>=3` का एक optional `appium` peer घोषित करता है और पुराना server launch करने से मना करता है। जब Appium अनुपस्थित हो या 3 से पुराना हो, तो `create-wdio` `appium@^3` इंस्टॉल करता है।

जो cloud vendors अब भी Appium 2 expose करते हैं, उन्हें Appium 3 image चाहिए, या आपको WebdriverIO 9 पर बने रहना होगा।

### Mobile कमांड अब HTTP पर fallback नहीं करते

v9 में, कई mobile helpers `browser.execute('mobile: …')` आज़माते थे और, unknown-method error पर, हटाए गए Appium HTTP endpoint पर fallback करते थे। v10 में वह fallback हटा दिया गया है: वही error आपको Appium 3 पर अपग्रेड करने के लिए कहता है। WebdriverIO mobile कमांड (`browser.lock()`, `browser.shake()`, …) या सीधे `browser.execute('mobile: …')` को प्राथमिकता दें।

### हटाए गए protocol कमांड

Appium 3 ने [कई deprecated base-driver endpoints हटा दिए](https://appium.io/docs/en/latest/guides/migrating-2-to-3/)। WebdriverIO अब उनमें से अधिकांश routes के लिए client methods expose नहीं करता (उदाहरण के लिए `appiumLock`, `touchPerform`, और Mobile JSON Wire Protocol map)। इसकी जगह W3C Actions, संबंधित mobile कमांड, या driver `mobile:` execute method का उपयोग करें।

### Appium `--allow-insecure` scope

Appium 3 को `--allow-insecure` features पर driver या `*` scope prefix चाहिए, उदाहरण के लिए `uiautomator2:adb_shell` या `*:adb_shell`।

### बिना prefix वाली Appium capabilities अब Appium session नहीं चुनतीं

`appium:` prefix के बिना `automationName`, `deviceName` और `appiumVersion` अब WebdriverIO को browser driver छोड़कर Appium service attach करने के लिए नहीं कहते। prefixed capability का उपयोग करें, या इसे `appium:options` के अंतर्गत nest करें:

```diff
- capabilities: { platformName: 'Android', automationName: 'UiAutomator2', deviceName: 'emulator' }
+ capabilities: {
+     platformName: 'Android',
+     'appium:automationName': 'UiAutomator2',
+     'appium:deviceName': 'emulator'
+ }
```

`wdio repl` अब वे prefixed keys emit करता है, जिनमें `appium:app`, `appium:platformVersion` और `appium:udid` शामिल हैं।

### mobile पर `getValue` element property पढ़ता है

`element.getValue()` हर session पर Get Element Property कॉल करता है, Appium 3 सहित। mobile session पर यह पहले Get Element Attribute कॉल करता था।

### `stopRecordingScreen` signature `startRecordingScreen` के अनुरूप

`driver.stopRecordingScreen` अब पिछले 4 आर्ग्युमेंट की जगह केवल एक `options` आर्ग्युमेंट स्वीकार करता है, जो `driver.startRecordingScreen` के अनुरूप है। अलग-अलग आर्ग्युमेंट को एक object के अंदर ले जाएँ:

```diff
- driver.stopRecordingScreen('webdriver.io', undefined, undefined, 'POST')
+ driver.stopRecordingScreen({ remotePath: 'webdriver.io', method: 'POST' })
```

## Multi-remote नामकरण

`multiremote` या `Multiremote` वर्तनी वाले APIs अब camelCase / PascalCase में `multiRemote` / `MultiRemote` हैं। पुराने नामों के alias नहीं हैं।

| v9 | v10 |
|----|-----|
| `multiremote()` (`webdriverio`) | `multiRemote()` |
| `WebdriverIO.MultiremoteConfig` | `WebdriverIO.MultiRemoteConfig` |
| browser, `$` और `$$` परिणामों पर `isMultiremote` | `isMultiRemote` |
| `Capabilities.RequestedMultiremoteCapabilities` | `Capabilities.RequestedMultiRemoteCapabilities` |
| `Capabilities.WithRequestedMultiremoteCapabilities` | `Capabilities.WithRequestedMultiRemoteCapabilities` |
| `runner.isMultiremote` (reporters) | `runner.isMultiRemote` |
| `Launcher#isMultiremote`, `Launcher#isParallelMultiremote` (`@wdio/cli`) | `isMultiRemote`, `isParallelMultiRemote` |
| `Workers.WorkerMessage`, `WorkerInstance` (`@wdio/local-runner`) और `SpecReporter#getTestLink()` में `isMultiremote` | `isMultiRemote` |
| `browser.multiremoteFetch()` (`@wdio/webdriver-mock-service`) | `browser.multiRemoteFetch()` |

`multiremote` और `Multiremote` (case-sensitive) खोजें और हर मैच को बदलें। Allure reports भी multi-remote टेस्ट को `isMultiremote` की जगह `isMultiRemote` से label करती हैं।

## Linux पर Virtual displays

`@wdio/xvfb` को `@wdio/display-server` से बदल दिया गया है। हर worker को `xvfb-run` में wrap करने की बजाय, testrunner पूरे रन के लिए एक display server शुरू करता है, किसी भी service के `onPrepare` hook से पहले। यह headless mode में Weston को प्राथमिकता देता है और Xvfb पर fallback करता है। विवरण के लिए [Headless & Display Servers](/docs/headless-and-display-servers) देखें।

विकल्पों के नाम बदल दिए गए हैं। पुराने नाम v10 में अब भी काम करते हैं लेकिन deprecation चेतावनी लॉग करते हैं, और v11 में हटा दिए जाएँगे। अगर आप दोनों नाम सेट करते हैं, तो नया वाला लागू होता है:

```diff
- autoXvfb: false,
+ displayServerEnabled: false,
- xvfbAutoInstall: true,
+ displayServerAutoInstall: true,
- xvfbAutoInstallMode: 'sudo',
+ displayServerAutoInstallMode: 'sudo',
- xvfbAutoInstallCommand: 'my-install-command',
+ displayServerAutoInstallCommand: 'my-install-command',
```

`xvfbMaxRetries` और `xvfbRetryDelay` का कोई प्रभाव नहीं है, और ये भी v11 में हटा दिए जाएँगे। Startup अब retry नहीं होता: अगर Weston शुरू होने में विफल होता है, तो testrunner Xvfb आज़माता है, और अगर दोनों में से कोई शुरू नहीं होता, तो रन बिना display के जारी रहता है।

जो config चार नाम बदले गए विकल्पों में से किसी एक को उसके विकल्प के बिना सेट करता है, और `displayServer` सेट नहीं करता, वह v9 की तरह Xvfb का उपयोग करता रहता है। जब तक वह display server बंद नहीं करता, वह `Preferring Xvfb, as v9 did, because the config sets v9 display keys` भी लॉग करता है। विकल्पों के नाम बदलने के बाद, Xvfb रखने के लिए `displayServer: 'xvfb'` जोड़ें, या Weston को प्राथमिकता देने के लिए इसे छोड़ दें। auto mode में custom install command पहले Weston के लिए चलता है, और Xvfb के लिए दोबारा केवल तब जब Weston अब भी उपलब्ध न हो या शुरू होने में विफल हो और Xvfb अब भी अनुपस्थित हो, इसलिए दूसरे server के प्रयास को छोड़ने के लिए `displayServer` को उस server पर सेट करें जिसे यह इंस्टॉल करता है।

Auto-install अब `yum` का समर्थन नहीं करता, जिसका v9 `dnf` के बिना वाले hosts पर उपयोग करता था। v10 केवल `apt-get`, `dnf`, `zypper`, `pacman`, `apk` और `xbps-install` का पता लगाता है, इसलिए केवल `yum` वाले host पर Xvfb स्वयं इंस्टॉल करें।

v9 में `xvfbAutoInstallCommand` array एक shell के ज़रिए चलता था, इसलिए `&&` या `VAR=value` जैसे elements काम करते थे। अब arrays किसी भी विकल्प नाम के अंतर्गत बिना shell के चलते हैं, इसलिए shell syntax के लिए string का उपयोग करें।

अन्य बदलाव जो आप देख सकते हैं:

- सभी workers एक display साझा करते हैं। v9 में, हर worker का अपना display होता था। Chrome और Edge पेज में अब focus की कमी हो सकती है, [Window focus](/docs/headless-and-display-servers#window-focus) देखें।
- Xvfb display number निश्चित नहीं है। `:99` मानने की बजाय इसे `DISPLAY` से पढ़ें।
- केवल `WAYLAND_DISPLAY` सेट वाले host को अब display वाला माना जाता है। v9 वहाँ workers को Xvfb के अंतर्गत चलाता था, क्योंकि `DISPLAY` सेट नहीं था। v10 कुछ भी शुरू नहीं करता, आपके compositor पर browser windows खोलता है, और रन के लिए `XDG_SESSION_TYPE`, `GDK_BACKEND` और `ELECTRON_OZONE_PLATFORM_HINT` को `wayland` पर सेट करता है। उन्हें पहले की तरह Xvfb के अंतर्गत चलाने के लिए, `WAYLAND_DISPLAY` unset करें और `displayServer: 'xvfb'` सेट करें।
- डिफ़ॉल्ट screen 1920x1080 है। v9 `xvfb-run` के डिफ़ॉल्ट का उपयोग करता था, जो Debian और Ubuntu पर 1280x1024 और Fedora, RHEL और Arch पर 640x480 है। आपकी baselines जिस आकार का उपयोग करती हैं उसे बनाए रखने के लिए, `displayServerWidth` और `displayServerHeight` को उस पर सेट करें।
- Browsers display server द्वारा सेट किए गए `XDG_SESSION_TYPE` से Wayland या X11 चुनते हैं। Weston के अंतर्गत, WebdriverIO अपने द्वारा launch किए गए Chrome और Edge में `--ozone-platform=wayland` भी जोड़ता है, क्योंकि 140 से पहले के Chrome और Edge (135 से पहले का Chrome for Testing) `XDG_SESSION_TYPE` को अनदेखा करते हैं। Weston कोई `DISPLAY` प्रदान नहीं करता, इसलिए अगर आपके टेस्ट या tools को X11 चाहिए, तो `displayServer: 'xvfb'` सेट करें।
- अगर आपने `@wdio/xvfb` से `XvfbManager` या `xvfb` instance का सीधे उपयोग किया था, तो इसकी जगह `@wdio/display-server` से `DisplayServerManager` का उपयोग करें। जहाँ आपने `xvfb.init()` चलाया और कमांड को `xvfb-run` में wrap किया, या `ProcessFactory` के ज़रिए processes spawn किए, वहाँ एक display शुरू करें और उसका environment उन processes को पास करें जिन्हें इसकी ज़रूरत है। उदाहरण 1280x1024 पर Xvfb का उपयोग करता है, जैसा v9 Debian और Ubuntu पर करता था। जिस host पर केवल `WAYLAND_DISPLAY` सेट है, वहाँ पहले इसे unset करें, वरना `startDaemon()` कुछ भी शुरू नहीं करता:

  ```js
  import { spawn } from 'node:child_process'
  import { once } from 'node:events'
  import { DisplayServerManager } from '@wdio/display-server'

  const manager = new DisplayServerManager({ displayServer: 'xvfb' })
  const daemon = await manager.startDaemon({ width: 1280, height: 1024 })
  // जब display पहले से मौजूद हो तब भी startDaemon() null लौटाता है
  if (!daemon && manager.shouldRun()) {
      throw new Error('Xvfb could not be started')
  }
  try {
      const child = spawn('your-command', { shell: true, stdio: 'inherit', env: { ...process.env, ...daemon?.env } })
      const [code] = await once(child, 'exit')
      process.exitCode = code ?? 1
  } finally {
      await daemon?.stop()
  }
  ```

## Emulation

`browser.emulate()` वर्तमान top-level browsing context के लिए WebDriver BiDi emulation module चलाता है। v9 एक preload script inject करता था जो `navigator.geolocation.getCurrentPosition`, `navigator.userAgent`, `window.matchMedia` और `navigator.onLine` को patch करती थी। वे scripts हटा दी गई हैं। `browser.emulate('clock', …)` अब भी वर्तमान पेज और बाद में खोले गए पेजों में fake timers इंस्टॉल करता है।

BiDi scopes के लिए अब reload ज़रूरी नहीं है।

```diff
  await browser.emulate('onLine', false)
- // केवल `navigator.onLine` बदला; ट्रैफ़िक फिर भी चलता रहा
+ // browsing context ऑफ़लाइन है, जिसमें fetch, WebSocket और WebTransport शामिल हैं
```

- `onLine: false` `{ type: 'offline' }` के साथ `emulation.setNetworkConditions` कॉल करता है। `true` और scope को restore करना इसे clear कर देते हैं। Throughput और latency `browser.throttleNetwork()` पर रहते हैं।
- `colorScheme` `prefers-color-scheme` media feature सेट करता है, इसलिए CSS `@media (prefers-color-scheme)` `matchMedia` का पालन करता है।
- `userAgent` browser user-agent override है, patched `navigator.userAgent` property नहीं।
- `geolocation` browser geolocation stack का उपयोग करता है। किसी पेज को अब भी `browser.setPermissions({ name: 'geolocation' }, 'granted')` की ज़रूरत हो सकती है। `{ error: 'positionUnavailable' }` coordinates की जगह वह error रिपोर्ट करता है।
- `colorScheme` और `media` एक media-feature map साझा करते हैं। बाद वाली कॉल पूरे map को बदल देती है, और किसी भी scope को restore करना इसे clear कर देता है।
- `device` device descriptor से user agent, viewport, touch, mobile text layout और viewport meta सेट करता है। यह `screen` या `orientation` नहीं बदलता।

नए scopes हैं `media`, `locale`, `timezone`, `touch`, `orientation`, `screen`, `viewportMeta`, `textLayout`, `scripting`, `scrollbar` और `forcedColors`। जो browser किसी कमांड को implement नहीं करता, वह कॉल को अपने error (`unknown command` या `unsupported operation`) के साथ reject करता है। WebdriverIO preload script या CDP पर fallback नहीं करता। अगर `device` बीच में reject होता है, तो पिछले user agent, viewport, touch, text layout और viewport meta वापस रख दिए जाते हैं।

`wdio session emulate` वही scopes स्वीकार करता है। यह अब तुरंत लागू होने वाले override के लिए reload करने को नहीं कहता। `emulate network` presets और `emulate cpu` अपरिवर्तित हैं और केवल Chromium के लिए रहते हैं। [Emulation](/docs/emulation) देखें।

## अगले कदम

- [migration skill](#migrate-with-a-coding-agent) को प्रोजेक्ट में कॉपी करें और किसी agent से इसे लागू करने के लिए कहें।
- नए v10 टेस्ट लिखने के लिए [WebdriverIO for Coding Agents](/docs/ai-agents)।
- जब सुइट Linux पर चलता है, तो [Headless and Display Servers](/docs/headless-and-display-servers)।