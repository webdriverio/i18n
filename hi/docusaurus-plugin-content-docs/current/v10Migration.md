---
id: v10-migration
title: v9 से v10 तक
description: किसी WebdriverIO v9 प्रोजेक्ट को v10 में अपडेट करें, जिसमें हर breaking change और इस गाइड को लागू करने वाली एक coding-agent skill शामिल है।
---

यह गाइड WebdriverIO `v10` के breaking changes को एक जगह इकट्ठा करती है और बताती है कि आपको उनके बारे में क्या करना है।

पिछले major versions के विपरीत, इनमें से ज़्यादातर बदलाव WebdriverIO [codemod](https://github.com/webdriverio/codemod) से लागू नहीं किए जा सकते, क्योंकि वे इस पर निर्भर करते हैं कि आपके tests वास्तव में क्या करना चाहते हैं। नीचे दिए गए [legacy command signatures](#legacy-command-signatures) यांत्रिक बदलाव हैं। बाकी हर section बताता है कि अपने suite में प्रभावित जगहों को कैसे ढूँढें।

## Coding agent के साथ migrate करें {#migrate-with-a-coding-agent}

अपने agent को v10 migration skill दें और उससे कहें कि इस पेज का पालन करते हुए suite को WebdriverIO v10 में migrate करे। Skill एक प्रक्रिया है: क्या खोजना है, कौन सा codemod चलाना है, और कब रुकना है। हर break के लिए यह पेज सत्य का स्रोत है।

इसे उस प्रोजेक्ट से install करें जिसे आप upgrade कर रहे हैं। [skills CLI](https://skills.sh) इस repository से [`.agents/skills/wdio-v10-migration/SKILL.md`](https://github.com/webdriverio/webdriverio/blob/main/.agents/skills/wdio-v10-migration/SKILL.md) पढ़ता है और उसे आपके चुने गए agents की skill directory में लिख देता है:

```sh
npx skills add webdriverio/webdriverio --skill wdio-v10-migration
```

`--skill wdio-v10-migration` यह skill install करता है। WebdriverIO repository पर काम करने वाली skills internal के रूप में चिह्नित हैं और पेश नहीं की जातीं। CLI पूछता है कि किन agents के लिए install करना है और skill को हर agent की project directory में लिख देता है। आप उस फ़ाइल को chat में attach भी कर सकते हैं।

Strict selectors और capability की bare `specs` / `exclude` lists केवल तभी सामने आती हैं जब suite चलता है। Skill केवल source से इनका निर्णय नहीं ले सकती।

## Node.js

WebdriverIO v10 को Node.js 22.23.4, 24.22.1 या 26.12.1, या इन lines की कोई बाद की release चाहिए। eMudhra intermediate CA compromise के लिए [updated CA store](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases) वाली ये पहली releases हैं। Node.js 18 और 20 अब समर्थित नहीं हैं, और Node.js 23 और 25 समर्थित नहीं हैं। CI Node.js 22, 24, और 26 को कवर करता है।

## Component tests

Browser runner अभी भी Chrome 90, Edge 90, Firefox 90 और Safari 14.1 या नए में चलता है। [Browser support](/docs/component-testing#browser-support) देखें।

`browser.execute` को दिया गया code ES2021 पर ही रहता है, ताकि वह test किए जा रहे पुराने browsers में चल सके। यह न्यूनतम सीमा नहीं बदली।

## Mocha

`@wdio/mocha-framework` और `@wdio/browser-runner` [Mocha 12](https://mochajs.org/blog/mocha-12-stable/) पर निर्भर हैं। Mocha 12 को Node.js `^20.19.0 || >=22.12.0` चाहिए, जो Node.js 22.23.4 की v10 न्यूनतम सीमा से कवर होता है।

```diff
- mochaOpts: { compilers: ['ts:ts-node/register'] }
+ mochaOpts: { require: ['ts-node/register'] }
```

`mochaOpts.compilers` हटा दिया गया है। Mocha ने लंबे समय से deprecated `--compilers` flag हटा दिया है, इसलिए बचे हुए compiler mappings को अनदेखा किया जाता है। Transpilers या अन्य setup फ़ाइलें `mochaOpts.require` से load करें।

WebdriverIO, Mocha के timeout का पालन करता है: किसी test या hook में `this.timeout()`, और `mochaOpts.timeout: 0`, जो timeout को बंद कर देता है। v9 में, WebdriverIO किसी test में `this.timeout()` को अनदेखा करता था, और 9.22 से `mochaOpts.timeout: 0` हर test को fail कर देता था ("Timeout after -3ms")। WebdriverIO का `retry` argument timeout के बाद test को दोबारा नहीं चलाता। [Mocha timeouts and the WebdriverIO hooks](./Timeouts.md#mocha-timeouts-and-the-webdriverio-hooks) देखें, `mochaOpts.parallelMode` के लिए भी। v10 में नया: `mochaOpts.parallelMode` या `cucumberOpts.parallelMode` के साथ [एक spec फ़ाइल में parallel tests](./ParallelTests.md)।

`failHookAffectedTests` का default `true` है। एक fail होने वाला `before` या `beforeEach` hook उन tests को fail कर देता है जिन्हें उस hook ने skip किया। केवल hook को report करने के लिए `mochaOpts.failHookAffectedTests` को `false` पर सेट करें।

Hook के title में hook function का description या नाम होता है, जैसे Mocha में: `beforeEach('login', fn)` या `beforeEach(function login () {})` के लिए `"before each" hook: login for "my test"`, या anonymous hook के लिए कोई नाम नहीं: `"before each" hook for "my test"`। v9 में इसमें `wrappedHook` होता था, जो WebdriverIO wrapper का नाम है। आप यह title किसी failed hook द्वारा skip किए गए test की error में, और root-level hooks के नामों में देखते हैं, उदाहरण के लिए Allure में।

`expect-webdriverio` 8 का उपयोग करें, [expect-webdriverio 8](#expect-webdriverio-8) देखें। Mocha उस package को एक process में दो बार load कर सकता है; यह उन copies के बीच assertion state साझा करता है ([expect-webdriverio#2221](https://github.com/webdriverio/expect-webdriverio/pull/2221))।

Mocha 12 के बदलाव जो `mochaOpts` के माध्यम से असर डाल सकते हैं:

- `grep` आधुनिक RegExp flags स्वीकार करता है।
- `ui` अभी भी `bdd`, `tdd`, `qunit`, या `exports` है। Custom interfaces को `*-bdd`, `*-tdd`, या `*-qunit` suffix रखना चाहिए।
- `parallel` अभी भी असमर्थित है। Spec parallelism का नियंत्रण WDIO के पास है; यदि आप इसे enable करते हैं तो Mocha का worker pool error देगा।

Mocha 12 ESM-first (`"type": "module"`) है। Programmatic `require('mocha')` Node 22 पर `require(esm)` के ज़रिए अभी भी काम करता है। WDIO Mocha CLI (`wdio run … --mochaOpts.*`) अपरिवर्तित है; Mocha का अपना CLI अब yargs के बजाय `util.parseArgs` का उपयोग करता है।

## Cucumber

`@wdio/cucumber-framework` [`@cucumber/cucumber` 13](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300) पर निर्भर है।

Cucumber 13 को Node.js 22, 24, या 26 या बाद का version चाहिए। यह Node.js 20, 23, या 25 पर नहीं चलता। Framework package v10 range घोषित करता है, जो Node.js 23 और 25 को भी बाहर रखती है।

```diff
- cucumberOpts: { tagExpression: '@smoke' }
+ cucumberOpts: { tags: '@smoke' }
```

`tagExpression` का कोई alias नहीं है। इसे सेट करने पर error throw होती है, ताकि बचा हुआ filter चुपचाप हर scenario न चला दे।

Cucumber 13 अब `Cli` export नहीं करता। Programmatic runs `@cucumber/cucumber/api` के `runCucumber` से होते हैं, जिसका adapter पहले से उपयोग करता है।

Cucumber 13 के अन्य breaks (ambiguous formatter paths, parallel workers, `BeforeAll` / `AfterAll`) [Cucumber की upgrade guide](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300) में वर्णित हैं।

### Feature uid

Cucumber feature का uid, `rootDir` से feature फ़ाइल का path है, फ़ाइल का नाम नहीं: `login.feature:1:1` के बजाय `features/admin/login.feature:1:1`। अलग-अलग folders में एक ही नाम वाली दो feature फ़ाइलें अब एक uid साझा नहीं करतीं। किसी scenario का `parent` और `fullTitle` इस uid का उपयोग करते हैं। Path में `%`, `:` और `#` को `%25`, `%3A` और `%23` के रूप में encode किया जाता है, इसलिए `uid.split(':')[1]` अभी भी line है और `#` केवल part number शुरू करता है। Random order वाले grouped specs में, जो feature फिर से शुरू होता है उसका suite uid `<uid>#2` होता है।

`scenarioLevelReporter: true` के साथ, Allure `historyId` `fullTitle` से आता है, इसलिए इस बदलाव के साथ हर scenario का Allure history फिर से शुरू होता है। यह तब भी फिर से शुरू होता है जब `rootDir` या feature फ़ाइल का path बदलता है। अलग-अलग folders में config फ़ाइलों के लिए एक ही history रखने के लिए, उनमें से हर एक में एक ही `rootDir` सेट करें।

## Jasmine

`@wdio/jasmine-framework` [Jasmine 6](https://jasmine.github.io/upgrade-guides/6.0) पर निर्भर है। Jasmine 6 को Node.js 20, 22, और 24 पर test किया गया है। Node.js 22.23.4 की v10 न्यूनतम सीमा पहले से उस range को कवर करती है।

`jasmineNodeOpts` हटा दिया गया। Jasmine को `jasmineOpts` से configure करें। `jasmineNodeOpts` सेट करने पर error throw होती है:

```text
The option "jasmineNodeOpts" was removed in WebdriverIO v10. Use "jasmineOpts" instead.
```

```diff
- jasmineNodeOpts: { defaultTimeoutInterval: 60000 }
+ jasmineOpts: { defaultTimeoutInterval: 60000 }
```

`jasmineOpts.failFast` अब पढ़ा नहीं जाता। `jasmineOpts.stopOnSpecFailure` का उपयोग करें। बचा हुआ `failFast` suite को नहीं रोकता। Cucumber का `failFast` एक अलग option है और अभी भी काम करता है।

```diff
- jasmineOpts: { failFast: true }
+ jasmineOpts: { stopOnSpecFailure: true }
```

`jasmineOpts.stopSpecOnExpectationFailure` हटा दिया गया। `jasmineOpts.oneFailurePerSpec` का उपयोग करें। पुरानी key सेट करने पर error throw होती है:

```text
The option "jasmineOpts.stopSpecOnExpectationFailure" was removed in WebdriverIO v10. Use "jasmineOpts.oneFailurePerSpec" instead.
```

```diff
- jasmineOpts: { stopSpecOnExpectationFailure: true }
+ jasmineOpts: { oneFailurePerSpec: true }
```

Jasmine के sync matchers फिर से synchronous हैं। v9 में, global `expect` Jasmine का `expectAsync` था, इसलिए `expect(1).toBe(1)` एक promise लौटाता था। v10 में, Jasmine के built-in matchers और `jasmine.addMatchers` से जोड़े गए matchers `undefined` लौटाते हैं। WebdriverIO matchers, Jasmine के async matchers और `jasmine.addAsyncMatchers` matchers अभी भी एक promise लौटाते हैं, इसलिए उन्हें `await` करते रहें। आपको `await expect($('#logo')).toBeDisplayed()` को `expectAsync()` में बदलने की ज़रूरत नहीं है: global `expect` आपके लिए WebdriverIO matchers को `expectAsync` पर भेजता है। `await expect(1).toBe(1)` काम करता रहता है।

`await` के बिना एक failed sync assertion अब spec को fail कर देता है। v9 में, यह एक rejected promise था: यदि किसी ने उसे await नहीं किया, तो spec pass हो सकता था, log में केवल एक unhandled rejection के साथ। Upgrade के बाद, उन specs को देखें जो fail होने लगते हैं। v9 में उनमें एक छिपी हुई failure थी, और समाधान test में या application में है, `expect` call में नहीं:

```js
it('saves the form', async () => {
    const onSave = jasmine.createSpy('onSave')
    await submitForm(onSave)
    // v9: `onSave` call न होने पर भी pass होता था
    // v10: `onSave` call न होने पर fail होता है
    expect(onSave).toHaveBeenCalled()
})
```

Sync matcher का परिणाम अब `undefined` है, इसलिए उस पर `.then()` या `.catch()` एक `TypeError` throw करता है:

```diff
- expect(total).toBe(3).then(() => log('ok'))
+ expect(total).toBe(3)
+ log('ok')
```

इस बदलाव के अन्य प्रभाव:

- `oneFailurePerSpec` अब spec को उसके पहले failed assertion पर रोक देता है: sync matcher के लिए तुरंत, और awaited async matcher के लिए जब promise settle होता है।
- Jasmine के spy matchers `await` के बिना काम करते हैं। v9 में, `toHaveBeenCalled`, `toHaveSpyInteractions` और `toHaveNoOtherSpyInteractions` "Does not take arguments" के साथ fail होते थे, और `await` के बिना एक uncalled spy pass हो जाता था।
- `jasmine.addMatchers` अब बदला नहीं जाता, इसलिए Jasmine अब अपनी "Monkey patching detected" warning नहीं दिखाता।

`toHaveSize` के दो अर्थ हैं। WebdriverIO value पर, यह WebdriverIO matcher है और element का size जाँचता है: एक element, एक element array (`$$().filter()` के परिणाम सहित), एक `Element[]`, एक multi-remote element, एक browser, एक browsing context, एक mock, `some()` wrapper, या एक promise जैसे chainable `$()`। किसी अन्य value पर, यह Jasmine का matcher है और length जाँचता है। v9 में, हमेशा Jasmine का matcher चलता था।

```js
expect([1, 2]).toHaveSize(2)                                   // Jasmine, sync
await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO, async
```

Types भी इन्हीं नियमों का पालन करते हैं। `@wdio/jasmine-framework` अब global `expect` को Jasmine के matchers के साथ, साथ ही WebdriverIO matchers और Jasmine async matchers के साथ type करता है, जो एक promise लौटाते हैं। अपने `tsconfig.json` में `types` से `expect-webdriverio/jasmine-wdio-expect-async` हटा दें, क्योंकि यह हर matcher को async के रूप में type करता है। यदि `jasmine` मौजूद नहीं है तो उसे जोड़ें:

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

`@wdio/globals`, `@wdio/runner` और `@wdio/browser-runner` को peer dependency के रूप में `expect-webdriverio` 8 चाहिए। v9 में, यह `expect-webdriverio` 5, 6 या 7 था। यदि आपकी `package.json` में `expect-webdriverio` सूचीबद्ध है, तो उसे `@wdio/*` packages वाले ही बदलाव में version 8 पर अपडेट करें।

`expect-webdriverio` 8 के अपने breaking changes हैं। इसकी [v7 to v8 migration guide](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v7-to-v8) हर बदलाव और उसके विकल्प की सूची देती है। `expect-webdriverio` 5 या 6 से आ रहे हैं तो इसकी [v5 to v6 migration guide](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v5-to-v6) भी पढ़ें: version 8 उन APIs को हटा देता है जिन्हें 5.6.9 से 6.0.0 ने deprecate किया था। Version 7 की कोई migration guide नहीं है। यह multi-remote support जोड़ता है, और `$$()` पर `toMatchSnapshot()` और `toMatchInlineSnapshot()` अब हर element का `outerHTML` store करते हैं: उन snapshots को अपडेट करें। इन बदलावों का test suite पर असर पड़ने की सबसे अधिक संभावना है:

- `$$()` पर `toHaveText` elements की index-दर-index तुलना करता है। पेज से अलग क्रम में दिया गया expected array fail होता है। पेज का क्रम, `expect.oneOf()` या `expect.arrayContaining()` का उपयोग करें।
- एक single element पर expected values का array `toHaveText`, `toHaveHTML`, `toHaveComputedLabel`, `toHaveComputedRole` और `toHaveElementClass` को fail करता है। `expect.oneOf()` का उपयोग करें। `toHaveElementClass` के लिए, array का अर्थ था "इनमें से कोई भी class है": `expect.oneOf()` का उपयोग करें, या जब element में सभी classes होनी चाहिए तो हर class के लिए एक assertion।
- Single element पर, या `some()` के साथ, एक list matcher (`expect.arrayContaining()`, `expect.arrayOf()`) error throw करता है। `$$()` पर, यह सभी elements की values की एक साथ तुलना करता है।
- एक missing attribute या property कभी match नहीं करता, उस matcher से भी नहीं जो कोई value स्वीकार नहीं करता, जैसे `expect.not.stringContaining()`।
- `URL`, `Set`, `Map` और binary values की तुलना उनकी सामग्री से की जाती है। जो assertion गलती से pass हो जाता था, वह अब fail हो सकता है।
- Helper types अब global नहीं हैं। जो फ़ाइल बिना import के `Test`, `TestResult`, `Scenario` या `WdioCustomMatchers` का उपयोग करती है वह `Cannot find name` के साथ fail होती है: `@wdio/types` से `Frameworks.Test`, `Frameworks.TestResult` और `Frameworks.Scenario`, और `ExpectWebdriverIO.Matchers` का उपयोग करें।
- `setFeatureFlags()` और `featureFlags` option हटा दिए गए।
- ये deprecated APIs हटा दिए गए: `setOptions` (`setDefaultOptions` का उपयोग करें), `getConfig` (`getDefaultOptions` का उपयोग करें), `matchers` (`wdioCustomMatchers` का उपयोग करें), `toHaveAttr` (`toHaveAttribute` का उपयोग करें), `toHaveClass` (`toHaveElementClass` का उपयोग करें), `toBeRequestedWithResponse()` (`toBeRequestedWith({ response })` का उपयोग करें), और `expect-webdriverio/types` (`expect-webdriverio/expect-global` का उपयोग करें)।
- `beforeAssertion` और `afterAssertion` hooks को उस alias का नाम मिलता है जिसे test ने call किया, `toBeExisting`, `toBePresent`, `toHaveLink`, `toHaveValue` और `toBeRequested` के लिए। v9 में, उन्हें alias के पीछे वाले matcher का नाम मिलता था, उदाहरण के लिए `toBeExisting` के लिए `toExist`।
- Multi-remote browser पर, `$$()` का परिणाम `expect` को दें। `[...elements]` या `Array.from(elements)` जैसा plain array elements के रूप में पहचाना नहीं जाता, और assertion fail होता है।

Multi-remote browser पर, एक assertion हर instance की जाँच करता है, और `expect.multiRemote()` हर instance के लिए एक expected value देता है। [Multiremote assertions](/docs/multiremote#assertions) देखें।

## Driver packages

WebdriverIO v10 Firefox, Edge और Safari को `geckodriver` 8, `edgedriver` 8 और `safaridriver` 3 के साथ शुरू करता है। v9 में, यह `geckodriver` और `edgedriver` 6 या 7, और `safaridriver` 1 या 2 का उपयोग करता था। WebdriverIO इन्हें install करता है, इसलिए आपको इन्हें स्वयं सूचीबद्ध नहीं करना पड़ता। यदि आपकी `package.json` में इनमें से कोई सूचीबद्ध है, तो उसे `@wdio/*` packages वाले ही बदलाव में अपडेट करें।

`geckodriver` और `edgedriver` `@wdio/logger` को peer dependency के रूप में लेते हैं, इसलिए वे आपके WebdriverIO install के logger के माध्यम से log करते हैं। v9 में, `geckodriver` और `edgedriver` `@wdio/logger` की अपनी copy लाते थे, और वह दूसरी copy `outputDir` में log फ़ाइल को खाली कर देती थी। `npm ls @wdio/logger` चलाएँ: हर copy version 10 की होनी चाहिए। कोई plugin या service जो अभी भी version 9 पर निर्भर है, उसका भी यही असर होता है।

[Driver upgrade notes](https://github.com/webdriverio/driver#upgrading-to-geckodriver-8-edgedriver-8-and-safaridriver-3) हर बदलाव की सूची देते हैं। ये बदलाव किसी WebdriverIO प्रोजेक्ट को प्रभावित कर सकते हैं:

- Driver downloads `HTTPS_PROXY` और `HTTP_PROXY` का उपयोग करते हैं। v9 में, `geckodriver` और `edgedriver` downloads इन्हें अनदेखा करते थे। यदि आपके environment में proxy सेट है लेकिन driver CDN तक सीधे पहुँचना ज़रूरी है, तो उसका host `NO_PROXY` में जोड़ें।
- `geckodriver` अब `GECKODRIVER_FILEPATH` नहीं पढ़ता। `GECKODRIVER_PATH` का उपयोग करें।
- `wdio:edgedriverOptions` और `wdio:safaridriverOptions` `spawnOpts` स्वीकार करते हैं, जैसे `wdio:chromedriverOptions` करता है।

## Browser downloads

v9 में, WebdriverIO Chrome, Chromium और Chromedriver की zip फ़ाइलें स्वयं extract करता था। v10 में यह Linux और macOS पर system के `unzip` command का उपयोग करता है (Windows पर `tar.exe` या PowerShell)। Slim Docker images, जैसे `node:24-slim`, में यह नहीं होता: इसे install करें, [Docker](/docs/docker#images-where-webdriverio-downloads-the-browser) देखें।

v9 में, Chrome, Chromium, Firefox और Chromedriver downloads `HTTPS_PROXY` और `HTTP_PROXY` का उपयोग करते थे। v10 में वे इनका उपयोग केवल तब करते हैं जब आपके प्रोजेक्ट में `proxy-agent` install हो, या जब Node.js `NODE_USE_ENV_PROXY=1` के साथ चलता हो। जब कोई proxy variable सेट हो लेकिन download उसे अनदेखा करेगा, तो WebdriverIO एक warning log करता है। [Proxy For Browser And Driver Downloads](/docs/proxy#proxy-for-browser-and-driver-downloads) देखें।

## Multi-remote Global

Lowercase `multiremotebrowser` global हटा दिया गया, `@wdio/globals` से और `eslint-plugin-wdio` के globals से भी। `multiRemoteBrowser` का उपयोग करें।

```diff
- import { multiremotebrowser } from '@wdio/globals'
+ import { multiRemoteBrowser } from '@wdio/globals'
```

## Capabilities

Capabilities में `specs` और `exclude` अब पढ़े नहीं जाते। `wdio:specs` और `wdio:exclude` का उपयोग करें।

```diff
  capabilities: [{
      browserName: 'chrome',
-     specs: ['./test/specs/chrome/**/*.js'],
-     exclude: ['./test/specs/chrome/skip.js']
+     'wdio:specs': ['./test/specs/chrome/**/*.js'],
+     'wdio:exclude': ['./test/specs/chrome/skip.js']
  }]
```

Top-level config keys `specs` और `exclude` ही रहती हैं। किसी capability पर बची हुई bare list उस capability के लिए फ़ाइलें नहीं चुनती। तब capability top-level `specs` और `exclude` का उपयोग करती है।

`tunnelIdentifier` और `parentTunnel` aliases Sauce Labs options types से हटा दिए गए। `tunnelName` और `tunnelOwner` का उपयोग करें।

## TypeScript

`webdriverio` द्वारा export किए गए `Element`, `MultiRemoteBrowser` और `MultiRemoteElement` types हटा दिए गए। Global `WebdriverIO` namespace का उपयोग करें।

```diff
- import type { Element } from 'webdriverio'
- const elem: Element = await $('#foo')
+ const elem: WebdriverIO.Element = await $('#foo')
```

`ChainablePromiseElement` अब `then` घोषित करता है, और `ChainablePromiseArray` `then`, `catch` और `finally` घोषित करता है। Chainable types `await` से पहले की value का वर्णन करते हैं। वे अब awaited value पर फ़िट नहीं होते:

```ts
let elem: ChainablePromiseElement
elem = await $('h1')
// TS2741: Property 'then' is missing in type 'Element' but required in type 'ChainablePromiseElement'.

let elems: ChainablePromiseArray
elems = await $$('li')
// TS2322: Type 'ElementArray' is not assignable to type 'ChainablePromiseArray'.
```

Awaited value को `WebdriverIO.Element` या `WebdriverIO.ElementArray` के रूप में type करें:

```diff
- let elem: ChainablePromiseElement = await $('h1')
- let elems: ChainablePromiseArray = await $$('li')
+ let elem: WebdriverIO.Element = await $('h1')
+ let elems: WebdriverIO.ElementArray = await $$('li')
```

दोनों chainable types अब `T extends PromiseLike<unknown>` से match करते हैं। `PromiseLike` की जाँच करने वाला conditional type `$()` और `$$()` के लिए v9 से अलग branch लेता है। उदाहरण के लिए, `Awaited<ChainablePromiseElement>` अब `WebdriverIO.Element` है, और `Awaited<ChainablePromiseArray>` `WebdriverIO.ElementArray` है।

Non-awaited `$$()` की properties का type बदल गया। वे query resolve होने से पहले ही तुरंत उपलब्ध होती हैं, इसलिए उन्हें `await` या `.then()` के बिना पढ़ें:

| Property | v9 | v10 |
|---|---|---|
| `selector` | `Promise<Selector>` | `Selector \| undefined` |
| `parent` | `Promise<...>` | parent, promise नहीं (नीचे देखें) |
| `foundWith` | कोई नहीं | वह command जिसने list ढूँढी, जैसे `$$` या `custom$$` |
| `props` | कोई नहीं | उस command के अतिरिक्त arguments |

```diff
- const selector = await $$('li').selector
+ const selector = $$('li').selector
```

`$('form').$$('input')` जैसी chained query पर, list resolve होने तक `parent` chainable `$('form')` होता है, और उसके बाद resolved element। `parent` को element के रूप में उपयोग करने से पहले list को await करें।

Runtime पर, `$$()` list पर `filter()`, `filterSeries()` और `slice()` एक element list लौटाते हैं, plain array नहीं। परिणाम source list के `selector`, `foundWith`, `parent` और `props` बनाए रखता है। v9 में, `filter()` इन properties के बिना एक plain array लौटाता था। Types अभी यह नहीं दिखाते: `filter()` और `filterSeries()` को `Promise<WebdriverIO.Element[]>` लौटाने वाला घोषित किया गया है, और `slice()` `WebdriverIO.Element[]` लौटाता है, इसलिए जब आप परिणाम पर ये properties पढ़ते हैं तो TypeScript error report करता है।

WebdriverIO derived list के लिए query दोबारा नहीं चलाता: उसके अंत से आगे का index अधिक matches की प्रतीक्षा नहीं करता, और यह कभी ऐसा element नहीं लौटाता जिसे filter ने बाहर रखा। इसके सदस्य अभी भी source query के elements हैं, अपने मूल `selector` और `index` के साथ। यदि कोई सदस्य stale हो जाता है, तो WebdriverIO उसे उस index पर source query से फिर से fetch करता है, जो पेज बदलने पर कोई दूसरा element हो सकता है। जो code list की properties से list की query दोबारा चलाता है, उदाहरण के लिए `parent[foundWith](selector, ...props)`, उसे पूरी list मिलती है, filtered list नहीं।

Published packages `typeScriptVersion` को 6.0.3 पर सेट करते हैं, जो उस TypeScript version से मेल खाता है जिससे यह repository compile होती है।

`browser.mock()` `urlpattern-polyfill` का `URLPattern` और native `URLPattern` (Node.js 24 में global, और TypeScript 6 की `dom` library द्वारा typed) स्वीकार करता है।

TypeScript 6 `"moduleResolution": "node"` और `"baseUrl"` को deprecate करता है, और `strict` को default बनाता है। `create-wdio` अब ESM प्रोजेक्ट्स के लिए `"moduleResolution": "bundler"` और CommonJS प्रोजेक्ट्स के लिए `"NodeNext"` generate करता है। यदि आप किसी मौजूदा प्रोजेक्ट में TypeScript अपडेट करते हैं, तो अपने `tsconfig.json` में ये options बदलें।

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

CommonJS प्रोजेक्ट के लिए, दोनों options के लिए `NodeNext` का उपयोग करें, जैसा `create-wdio` करता है:

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

TypeScript 6 `types` का default भी `[]` कर देता है, इसलिए यह अब हर installed `@types/*` package load नहीं करता। यदि आपके `tsconfig.json` में कोई `types` list नहीं है, तो Mocha के `describe` और `it` जैसे globals `Cannot find name` के साथ fail होते हैं। उन type packages की सूची दें जिनका आपके tests उपयोग करते हैं, जैसा `create-wdio` करता है। उदाहरण के लिए, Mocha के साथ:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
+        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
     }
 }
```

`npm create wdio@latest` `compilerOptions.target` और `compilerOptions.lib` को `es2024` के रूप में लिखता है। उस फ़ाइल को type-check करने के लिए TypeScript 5.7 या नया चाहिए। `tsx`, जो config और tests चलाता है, type-check नहीं करता, इसलिए पुराना compiler केवल तब मायने रखता है जब आप स्वयं `tsc` चलाते हैं।

मौजूदा `tsconfig.json` को दोबारा नहीं लिखा जाता। एक generated config जो किसी अन्य config को extend करता है, parent का `target` और `lib` बनाए रखता है।

`afterAssertion` hook में, `params.result` का type अब `{ pass, message }` है, जैसा matchers देते हैं। v9 में, type `{ result, message }` था, लेकिन runtime पर `params.result.result` हमेशा `undefined` होता था। `params.result.pass` पढ़ें:

```diff
  afterAssertion (params) {
-     console.log(params.matcherName, params.result.result)
+     console.log(params.matcherName, params.result.pass)
  }
```

`pass` तब `true` होता है जब value expected value से match करती है, `.not` के साथ भी। इसलिए `.not` के साथ, assertion तब pass होता है जब `pass` `false` हो। Hook यह नहीं बताता कि test ने `.not` का उपयोग किया या नहीं।

## Command hooks

एक element command `beforeCommand` और `afterCommand` hooks को command के arguments के साथ एक बार चलाता है। v9 में, यह उन्हें 2 या 3 बार चलाता था, और पहली call को `args` के रूप में `[]` मिलता था। किसी दूसरे command के भीतर चलने वाले command (उदाहरण के लिए `getText` में `getElementText`) की अभी भी अपनी जोड़ी होती है। Hooks `emit` event function के लिए नहीं चलते। Commands की गिनती करने या उनका समय मापने वाला hook हर command को एक बार देखता है।

Element command के लिए, `beforeCommand` WebdriverIO के element की प्रतीक्षा करने से पहले चलता है, इसलिए वहाँ element अभी भी missing हो सकता है। `afterCommand` प्रतीक्षा और किसी भी retry के बाद, अंतिम प्रयास के परिणाम या error के साथ चलता है। जिस hook को found element चाहिए वह `afterCommand` का उपयोग करता है।

`overwriteCommand()` से बदला गया command, और promise पर chained query (`$('a').$('b')`), अभी भी hooks को एक से अधिक बार चला सकते हैं।

## Reporters

Browser `result` event reporters को `client:afterCommand` के रूप में forward किया जाता है। उस payload और `AfterCommandArgs` type में अब `name` property नहीं है। इसके बजाय `command` पढ़ें। Custom commands पहले से `command` भेजते थे।

```diff
  onAfterCommand(args) {
-     console.log(args.name)
+     console.log(args.command)
  }
```

### Allure

`@wdio/allure-reporter` पर `addEnvironment(name, value)` हटा दिया गया। इसका कोई प्रभाव नहीं था। Allure reporter options में [`reportedEnvironmentVars`](/docs/allure-reporter) से environment rows सेट करें।

### Cucumber JSON reporter

`wdio-cucumberjs-json-reporter` WebdriverIO repository में [`@wdio/cucumberjs-json-reporter`](/docs/cucumberjs-json-reporter) के रूप में आ गया है। Community package केवल v9 के लिए है: यह `@wdio/reporter` 9 और `@wdio/logger` 9 install करता है।

```sh
npm uninstall wdio-cucumberjs-json-reporter
npm install @wdio/cucumberjs-json-reporter --save-dev
```

`reporters: ['cucumberjs-json']` वही रहता है: WebdriverIO उस नाम के लिए `@wdio/cucumberjs-json-reporter` load करता है। अपनी step फ़ाइलों में imports बदलें:

```diff
- import cucumberJson from 'wdio-cucumberjs-json-reporter'
+ import cucumberJson from '@wdio/cucumberjs-json-reporter'
```

Options वही हैं। JSON फ़ाइलें Cucumber JSON format का अधिक बारीकी से पालन करती हैं। उन्हें पढ़ने वाले tools और scripts की जाँच करें:

- Scenario `id` `<feature id>;<scenario id>` है, और `Rule:` में scenario के लिए `<feature id>;<rule id>;<scenario id>`, जैसा Cucumber JSON format में है। पहले, भागों के बीच कोई separator नहीं था।
- Feature `id` `:` और `/` जैसे characters बनाए रखता है (केवल spaces `-` बनते हैं), जैसा Cucumber JSON format में है। JSON फ़ाइलों के नाम नहीं बदलते, लेकिन 200 bytes से अधिक का feature भाग (उदाहरण के लिए कई non-ASCII characters) काटा जाता है और एक hash के साथ समाप्त होता है (Linux फ़ाइल नाम में 255 bytes की अनुमति देता है), और `con` जैसा Windows device नाम `_` से शुरू होता है।
- Feature और scenario `keyword` फ़ाइल के keywords हैं, उदाहरण के लिए `Scenario Outline` या `Fonctionnalité`, जैसा Cucumber JSON format में है। पहले, वे हमेशा `Feature` और `Scenario` होते थे।
- Scenarios और steps में `line` होती है।
- Tags `{ name, line }` हैं, जैसा Cucumber JSON format में है; scenario के tags को feature फ़ाइल की line मिलती है। पहले, वे `location`, `id` या `astNodeId` (हर run पर random) वाले internal Cucumber objects थे, और scenario के tags की कोई line नहीं थी।
- Hooks `hidden: true` और बिना `name` वाले steps हैं। पहले, hook का `name` खाली होता था।
- Doc string argument `{ content, line }` है। पहले, यह doc string का text था।
- जिस hook को Cucumber skip करता है (failed hook के बाद, या `'skipped'` लौटाने वाला hook) उसका status `skipped` है, और `'pending'` लौटाने वाले hook का `pending`, जैसा Cucumber JSON format में है। पहले, वे `passed` थे।
- Ambiguous step का status `ambiguous` है, जैसा Cucumber JSON format में है, और उसका `error_message` matching step definitions की सूची देता है। पहले, यह बिना कारण `skipped` था, या `cucumberOpts.failAmbiguousDefinitions` के साथ `failed`।
- Undefined step का status `undefined` है। पहले, यह `failed` था, या `cucumberOpts.ignoreUndefinedDefinitions` के साथ `pending`।
- जो scenario Cucumber दोबारा चलाता है (`cucumberOpts.retry`) उसमें केवल उसके अंतिम प्रयास के steps होते हैं। पहले, इसमें सभी प्रयासों के steps होते थे।
- `cucumberOpts.tagsInTitle` के साथ, feature और scenario नाम, ids और फ़ाइल नामों में tags नहीं होते।
- जब एक worker कई feature फ़ाइलें चलाता है (grouped specs), तो reporter हर feature के लिए एक फ़ाइल लिखता है। पहले, सभी scenarios पहले feature की फ़ाइल में जाते थे।
- Multi-remote session में, metadata पहले instance से आता है।

ये पहले missing या गलत थे: `*` steps, `But` steps का keyword, WebdriverIO `before` hook से attachments, `text/plain` के रूप में attach किया गया object (यह JSON text है, `[object Object]` नहीं), और `application/json` के रूप में attach की गई JSON string (यह जैसी है वैसी रहती है, दूसरी बार encode नहीं होती)। Step keywords feature फ़ाइल के `# language:` header का पालन करते हैं, फिर `cucumberOpts.language` का (reporter का `language` option केवल तब जब `cucumberOpts.language` सेट न हो)। `cucumberOpts.scenarioLevelReporter: true` के साथ, reporter कोई फ़ाइल नहीं लिखता और एक warning log करता है: format को steps चाहिए।

### Video reporter

`wdio-video-reporter` WebdriverIO repository में [`@wdio/video-reporter`](/docs/video-reporter) के रूप में आ गया है। Community package केवल v9 के लिए है: यह `@wdio/reporter` 9 और `@wdio/logger` 9 install करता है।

```sh
npm uninstall wdio-video-reporter
npm install @wdio/video-reporter --save-dev
```

Community package ffmpeg स्वयं install करता था। `@wdio/video-reporter` ऐसा नहीं करता: tests चलाने वाली हर machine पर [ffmpeg install करें](/docs/video-reporter#install-ffmpeg), CI और Docker images में भी, या `ffmpegPath` option या `FFMPEG_PATH` environment variable सेट करें। ffmpeg के बिना, reporter एक warning log करता है और कोई video नहीं बनाता।

```sh
brew install ffmpeg                                         # macOS
sudo apt-get update && sudo apt-get install -y ffmpeg       # Ubuntu, Debian
winget install --id Gyan.FFmpeg -e                          # Windows
```

`reporters: ['video']` वही रहता है: WebdriverIO उस नाम के लिए `@wdio/video-reporter` load करता है। `wdio-video-reporter` से imports को `@wdio/video-reporter` से बदलें। Options वही हैं, इन बदलावों के साथ:

- `snapshotCommands` W3C WebDriver endpoints के अंतिम भाग का उपयोग करता है। पुराने default में `buttonup`, `moveto`, `keys` या `accept_alert` जैसे JSON Wire Protocol नाम भी सूचीबद्ध थे। ये नाम कभी किसी v10 command से match नहीं करते। [Default list](/docs/video-reporter#snapshotcommands) के नामों का उपयोग करें, उदाहरण के लिए `actions`, `value` या `accept`।
- WebDriver BiDi session में, reporter `url`, `back`, `forward`, `refresh` और `actions` के बाद भी एक frame लेता है।
- WebDriver BiDi session में, reporter WebDriver BiDi से frames लेता है, और अगला command अपने पहले वाले command के frame की प्रतीक्षा करता है (Chrome में लगभग 50 से 70 ms), ताकि हर frame अपने command का पेज दिखाए। पहले, Chrome में, WebDriver BiDi navigation की शुरुआत में screenshot test को 10 सेकंड तक प्रतीक्षा करा सकता था।
- Multi-remote session में, केवल पहले instance के commands frame लेते हैं। पहले, हर instance के commands पहले instance का frame लेते थे।
- `GET` command केवल पेज पढ़ता है, इसलिए यह कोई frame नहीं देता, `recordAllActions` को छोड़कर। पहले, `getUrl`, `getSize` या `getValue` एक frame देते थे, क्योंकि उनके endpoint का अंतिम भाग (`url`, `rect`, `value`) `snapshotCommands` में है।
- Video फ़ाइल नामों में तारीख हर machine पर `YYYY-MM-DD--HH-MM-SS-mmm` है। पहले, यह machine के locale का उपयोग करती थी।
- `videoFormat` `webm` (default) और `mp4` स्वीकार करता है। पहले, `videoFormat: 'default'` mp4 videos बनाता था; अब यह एक warning log करता है और webm videos बनाता है। `videoFormat: 'mp4'` का उपयोग करें।
- Allure reporter के साथ, बिना video वाले test को अब खाली video attachment नहीं मिलता।

### HTML reporter

`wdio-html-nice-reporter` WebdriverIO repository में [`@wdio/html-reporter`](/docs/html-reporter) के रूप में आ गया है। पुराना package केवल v9 के लिए है।

```sh
npm uninstall wdio-html-nice-reporter
npm install @wdio/html-reporter --save-dev
```

Reporter का नाम `html` है। `reporters` में नाम और imports बदलें:

```diff
- import { ReportAggregator } from 'wdio-html-nice-reporter'
+ import { ReportAggregator } from '@wdio/html-reporter'

  reporters: [
-     ['html-nice', { outputDir: './reports/html-reports/' }]
+     ['html', { outputDir: './reports/html-reports/' }]
  ]
```

Options वही हैं। इन्हें भी बदलें:

- `ReportEvents` `@wdio/html-reporter` से आता है। जो tests अभी भी `@rpii/wdio-report-events` का उपयोग करते हैं वे काम करते हैं, क्योंकि दोनों एक ही events भेजते हैं।
- Command line script `node_modules/@wdio/html-reporter/build/makeReport.js` है। यह `node_modules/wdio-html-nice-reporter/lib/makeReport.js` था।
- Cucumber के साथ, report scenarios गिनती है, steps नहीं, और retried scenario के केवल अंतिम प्रयास को गिनती है।

## `$` strict है

`$` अब __ठीक एक__ element को दर्शाता है। यदि selector एक से अधिक element पर resolve होता है, तो command पहले match का चुपचाप उपयोग करने के बजाय `StrictSelectorError` throw करता है:

```js
// v9 — पहले button पर click करता है, भले ही 12 हों
await $('button').click()

// v10
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
// Use `$$("button")` to work with all matches, `$$("button")[0]` if you explicitly want the first one,
// or narrow down the selector so it matches a single element.
```

यह [Playwright locators](https://playwright.dev/docs/locators#strictness) से मेल खाता है। Cypress अलग है: इसकी queries कई elements पर resolve हो सकती हैं, और [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn) जैसे action commands default रूप से multi-element subject को अस्वीकार करते हैं। एक selector जो चुपचाप कई elements पर resolve होता है, लगभग हमेशा एक छिपा हुआ bug होता है: यह आज pass होता है और जैसे ही कोई पेज पर दूसरा button जोड़ता है, गलत element के साथ interact करता है।

यह नियम chain के हर step (`$('form').$('input')`) पर और `$` द्वारा स्वीकार किए जाने वाले हर selector type पर लागू होता है — string selectors (shadow DOM को pierce करने वाले सहित), JS functions, mobile selectors और custom strategy references।

### क्या नहीं बदला

- `$$` अभी भी शून्य या कई elements लौटाता है।
- समर्पित helper commands `custom$`, `shadow$` और `react$` strict नहीं हैं — वे अभी भी अपना पहला match लौटाते हैं, जैसे उनके `$$` समकक्ष।
- जो selector किसी से match नहीं करता वह अभी भी एक lazily-resolved element लौटाता है, इसलिए `waitForExist` और [auto-waiting](/docs/autowait) पहले जैसे व्यवहार करते हैं।
- Element reference देना, जैसे `$(await browser.getActiveElement())`, हमेशा एक single node को संदर्भित करता है और कभी जाँचा नहीं जाता।

### अपने suite का audit कैसे करें

इसके लिए कोई codemod नहीं है: केवल आप बता सकते हैं कि दूसरा match bug है या जानबूझकर है। दो व्यावहारिक तरीके:

1. __अपना suite चलाएँ।__ हर उल्लंघन selector और matches की संख्या के साथ throw होता है, जो आमतौर पर इसे तुरंत ठीक करने के लिए पर्याप्त है।
2. __व्यापक selectors की पहले से जाँच करें।__ अपने page objects में हर generic `$(...)` के लिए, print करें कि यह वास्तव में कितने elements से match करता है:

   ```js
   console.log(await $$('button').length) // 12 → `$('button')` बहुत व्यापक है
   ```

फिर या तो selector को संकीर्ण करें — आदर्श रूप से `$('button=Submit')` या `$('aria/Submit')` जैसी user-facing query की ओर, [Selectors](/docs/selectors) देखें — या स्पष्ट रूप से बताएँ कि आप पहला match चाहते हैं:

```js
await $('button[type="submit"]').click()
// ...या, यदि आपका मतलब वास्तव में पहला ही है
await $$('button')[0].click()
```

### Opt out करना

एक single query के लिए:

```js
await $('button', { strict: false }).click()
```

पूरे प्रोजेक्ट के लिए, v9 व्यवहार वापस लाते हुए:

```js title="wdio.conf.js"
export const config = {
    // ...
    strictSelectors: false
}
```

एक element याद रखता है कि उसे कैसे query किया गया था, इसलिए उसे फिर से fetch करना — stale element reference के बाद, या `waitForExist` के माध्यम से — मूल call की strictness बनाए रखता है।

:::info

अंदर से, एक strict `$` `findElement` के बजाय `findElements` request भेजता है, क्योंकि matches की गिनती ही नियम लागू करने का एकमात्र तरीका है। दोनों ही तरह से यह एक single round trip है, लेकिन यह उन custom services और WebDriver mocks को दिखाई देता है जो `findElement` command पर निर्भर हैं।

:::

## `await` से पहले element lists

v10 से, `$$()` एक [`ElementArray`](/docs/api/browser/$$) लौटाता है: एक वास्तविक array जिसे आप `await` कर सकते हैं। v9 में, जिस `$$()` को आपने await नहीं किया था वह एक promise था।

| `await` से पहले `$$('li')` | v9 | v10 |
| --- | --- | --- |
| `instanceof Promise` | `true` | `false` |
| `Array.isArray()` | `false` | `true` |
| `then`, `catch`, `finally` | functions | functions, list load होने तक |

List load होने तक, `length` एक promise है, और `[...list]`, `Array.from(list)` और `for...of` `Cannot synchronously iterate over an element list that has not resolved yet` throw करते हैं।

यही `custom$$`, `shadow$$` और `react$$` के लिए, और multi-remote browser पर `$$()` के लिए भी सच है। जिस `$()` को आपने await नहीं किया वह अभी भी एक promise है।

`await` वही list देता है, loaded और `then` के बिना। तब `length` एक number है, और `for...of`, `[...list]` और `Array.from()` काम करते हैं। `await` से पहले, आप `for await`, एक index (`$$('li')[0]`), `at()`, `slice()` और async iteration methods (`map`, `filter`, `forEach`, ...) का उपयोग कर सकते हैं। ये methods एक promise देते हैं: index पढ़ने से पहले `filter()` के परिणाम को `await` करें।

`$$(selector)` list के अंत से आगे का index `undefined` नहीं है, `await` के बाद भी। यह एक element है जो list के उस index तक पहुँचने की प्रतीक्षा करता है, जैसा `$$('li')[5]` `await` से पहले करता है: `isExisting()` `false` देता है और `getText()` जैसा command `Index out of bounds` throw करता है, दोनों `waitforTimeout` के बाद। v9 में, `(await $$('li'))[5]` `undefined` था। इसलिए `if (list[5])` हमेशा true है, और `list.at(5)` कभी `undefined` नहीं होता। Index की तुलना `length` से करें, जो प्रतीक्षा नहीं करता:

```diff
  const list = await $$('li')
- if (list[5]) {
+ if (list.length > 5) {
```

`await` के बाद, negative index, और `slice()` या `filter()` से मिली list, अंत से आगे `undefined` देते हैं। `await` से पहले, 0 या अधिक के integer index के साथ `list[i]`, और `at()`, एक promise देते हैं, जो हमेशा truthy होता है।

जो code किसी value को केवल तब await करता है जब वह `Promise` हो, या जो `await` के बिना `length` पढ़ता है, वह throw नहीं करता। वह length के रूप में एक promise पढ़ता है: `list.length > 0` और `for (let i = 0; i < list.length; i++)` जैसा loop `false` देखते हैं, लेकिन `if (list.length)` और `list.length !== 0` `true` देखते हैं। हमेशा value को `await` करें। पहले से loaded value पर `await` वही value देता है:

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

v9 अभी भी पुराने positional forms स्वीकार करता था और warning देता था। v10 केवल options object स्वीकार करता है।

v10 [codemod](https://github.com/webdriverio/codemod) `addCommand` और `overwriteCommand` को तब फिर से लिखता है जब तीसरा argument boolean हो, `getHTML(true)` और `getHTML(false)` को, और `getCookies` को जब filter एक string या one-element array हो। एक से अधिक नाम वाली `getCookies` call को अपरिवर्तित छोड़ दिया जाता है, क्योंकि एक filter एक नाम से match करता है।

पहले codemod install करें। WebdriverIO इस पर निर्भर नहीं है।

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

Boolean तीसरा argument एक TypeScript error है। Runtime पर यह throw करता है:

```
Passing a boolean as the third argument to `addCommand` was removed in WebdriverIO v10. Use `addCommand(name, fn, { attachToElement: true })`.
```

`proto` और `instances` उसी options object में आते हैं। Command को browser से attach करने के लिए तीसरा argument छोड़ दें।

### `getCookies`

String और string-array filters अस्वीकार किए जाते हैं। एक [cookie filter object](https://w3c.github.io/webdriver-bidi/#type-storage-CookieFilter) दें। एक call एक नाम को filter करती है; दूसरे नाम के लिए इसे फिर से call करें।

```diff
- await browser.getCookies('session')
- await browser.getCookies(['session', 'auth'])
+ await browser.getCookies({ name: 'session' })
+ await browser.getCookies({ name: 'auth' })
```

बिना arguments के `getCookies()` अभी भी पेज को दिखाई देने वाली हर cookie लौटाता है।

### `getHTML`

```diff
- await $('h1').getHTML(false)
+ await $('h1').getHTML({ includeSelectorTag: false })
```

बिना arguments के `getHTML()` अभी भी element का अपना tag शामिल करता है।

### `newWindow`

`windowName` और `windowFeatures` हटा दिए गए हैं। वे केवल WebDriver Classic पर लागू होते थे। Command अभी भी `type` स्वीकार करता है:

```diff
- await browser.newWindow('https://webdriver.io', {
-     windowName: 'WebdriverIO window',
-     windowFeatures: 'width=420,height=230,resizable,scrollbars=yes,status=1',
- })
+ await browser.newWindow('https://webdriver.io', { type: 'window' })
```

Tab खोलने के लिए `type: 'tab'` का उपयोग करें।

WebDriver BiDi session में, `newWindow()` नया [browsing context](/docs/api/browsingContext) लौटाता है और उस पर switch नहीं करता। v9 में यह switch करता था। इसलिए `newWindow()` के बाद `browser.closeWindow()` अब पहला tab बंद करता है, नया नहीं। नए tab के commands उस context पर चलाएँ जो `newWindow()` लौटाता है, और उसे उसी context पर `closeWindow()` से बंद करें:

```diff
- await browser.newWindow('https://webdriver.io', { type: 'tab' })
- console.log(await browser.getTitle())
- await browser.closeWindow()
+ const tab = await browser.newWindow('https://webdriver.io', { type: 'tab' })
+ console.log(await tab.getTitle())
+ await tab.closeWindow()
```

TypeScript में, परिणाम type `WebdriverIO.BrowsingContext | { handle, type }` है, क्योंकि WebDriver Classic session window handle लौटाता है। BiDi session में, इसे narrow करें: `await browser.newWindow(url, { type: 'tab' }) as WebdriverIO.BrowsingContext`।

Browser पहले tab पर ही रहता है। उस पर वापस जाने वाली `switchWindow()` call हटा दें: BiDi session में `switchWindow` throw करता है। Browsing context model के लिए [`switchToFrame`](#switchtoframe) देखें।

### `startActivity`

केवल options object स्वीकार किया जाता है। `appWaitPackage`, `appWaitActivity`, और `optionalIntentArguments` हटा दिए गए हैं। वे केवल हटाए गए Appium HTTP endpoint पर लागू होते थे। `mobile: startActivity` उन्हें स्वीकार नहीं करता, और उन्हें देने पर throw होता है।

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

## हटाए गए commands

`browser.throttle` और deprecated `touchAction` commands हटा दिए गए हैं।

| v9 | v10 |
| --- | --- |
| `browser.throttle('Regular3G')` | [`browser.throttleNetwork('Regular3G')`](/docs/api/browser/throttleNetwork) |
| `browser.touchAction(...)` / `element.touchAction(...)` | Touch pointer के साथ [Actions API](/docs/api/browser/action), या mobile commands [`tap`](/docs/api/mobile/tap) और [`swipe`](/docs/api/mobile/swipe) |

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

`browser.uploadFile()` हटा दिया गया है। यह एक local फ़ाइल को zip करके Selenium `file` endpoint पर post करता था, जो WebDriver या WebDriver BiDi का हिस्सा नहीं है। File input को [`element.setFiles()`](/docs/api/element/setFiles) से सेट करें।

```diff
- const remotePath = await browser.uploadFile('/path/to/file.png')
- await $('#file-upload').setValue(remotePath)
+ await $('#file-upload').setFiles('/path/to/file.png')
+ await $('#file-upload').setFiles(['/path/to/a.png', '/path/to/b.png'])
```

`setFiles` को BiDi session चाहिए। Paths browser द्वारा खोले जाते हैं। Relative path `process.cwd()` के सापेक्ष resolve होता है। Selenium Grid file staging v10 का हिस्सा नहीं है। जो suite किसी node पर bytes भेजने के लिए `uploadFile` पर निर्भर था, उसे फ़ाइल वहाँ रखनी होगी जहाँ browser उसे पढ़ सके, फिर `setFiles` call करना होगा।

Classic local session पर, `element.setValue('/local/path')` अभी भी एक ऐसा path type करता है जिसे local browser पहले से देख सकता है। जो Grid users raw Selenium endpoint को सीधे call करते हैं, उनके लिए वह `browser.file()` के रूप में बना रहता है।

## `executeAsync`

`browser.executeAsync` और `element.executeAsync` हटा दिए गए हैं। [`execute`](/docs/api/browser/execute) को एक `async` function दें। Function की return value, लौटाए गए promise सहित, command का परिणाम है। `script` timeout अभी भी लागू होता है, WebDriver BiDi session में भी: जो script अधिक समय तक चलती है वह `script timeout` error के साथ fail होती है। [`bidiResponseTimeout`](/docs/configuration#bidiresponsetimeout) (default रूप से 180 सेकंड) से लंबे `script` timeout के लिए, दोनों बढ़ाएँ।

```ts
const result = await browser.execute(async (a, b) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return a + b
}, 1, 2)
```

WebDriver `done` callback हटा दें। जो string script अपने अंतिम argument के रूप में उस callback की अपेक्षा करती थी, उसे इसके बजाय एक promise लौटाना होगा। Runtime पर, `executeAsync` एक function नहीं है।

## `switchToFrame`

`browser.switchToFrame` अब public command नहीं है।

WebDriver BiDi session में, `switchFrame` और `switchWindow` throw करते हैं। एक tab, एक window, और एक frame एक `WebdriverIO.BrowsingContext` हैं जिसे आप रखते हैं। `browser.url()` session के प्रारंभिक top-level context को navigate करता है और उसे लौटाता है। `browser.newWindow()` नया context लौटाता है और उस पर switch नहीं करता। `context.frame()` एक child frame लौटाता है। `context.parent` वह frame है जिससे आपने इसे खोला था।

```ts
const page = await browser.url('https://example.com')
const other = await browser.newWindow('https://webdriver.io', { type: 'tab' })
console.log(await page.getTitle())
const frame = await page.frame('iframe')
console.log(await frame.$('h1').getText())
const pages = await browser.browsingContexts()
```

`context.url` document URL string है। रखे गए context को `context.navigate(url)` से navigate करें। `browser.url()` से load metadata `context.request` है।

Classic session में, `switchFrame` को एक element के साथ, या top frame के लिए `null` के साथ call करते रहें। वहाँ string या function अस्वीकार किया जाता है।

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

Multi-remote browser अब हर session को अपनी property के रूप में store नहीं करता। यही multi-remote element के लिए भी सच है। `getInstance` और `select` से आप एक session को संबोधित करते हैं।

```diff
- await browser.myChromeBrowser.url('https://webdriver.io')
- await (await browser.$('button')).myChromeBrowser.click()
+ await browser.getInstance('myChromeBrowser').url('https://webdriver.io')
+ await (await browser.$('button')).getInstance('myChromeBrowser').click()
```

एक TypeScript augmentation जो `WebdriverIO.MultiRemoteBrowser` में `myChromeBrowser: WebdriverIO.Browser` जोड़ता है, अब किसी runtime property से match नहीं करता। उस augmentation को हटाएँ और `getInstance` call करें।

Testrunner के साथ और `injectGlobals` चालू रहने पर, instance का नाम अभी भी एक global है (`myChromeBrowser.url(...)`)। वह global single session है। यह `browser.myChromeBrowser` नहीं है।

Command परिणाम capability क्रम में रहते हैं: पहली entry capabilities object की पहली key की होती है।

Multi-remote browser पर `browser.$$()` एक `WebdriverIO.MultiRemoteElementArray` लौटाता है, plain `MultiRemoteElement[]` नहीं। यह अभी भी एक array है, इसलिए `elements[0]` जैसा index read काम करता रहता है।

इसकी `map`, `filter`, `forEach`, `find`, `findIndex`, `some`, `every` और `reduce` methods async हैं, जैसे `WebdriverIO.ElementArray` पर, और एक promise लौटाती हैं, `await` के बाद भी। यही `custom$$()`, `react$$()` और `shadow$$()` द्वारा लौटाई गई lists के लिए भी सच है। v9 में ये plain array की sync methods थीं:

```diff
  const items = await browser.$$('li')
- const ids = items.map((item) => item.selector)
+ const ids = await items.map((item) => item.selector)
```

`custom$()`, `react$()` और, element पर, `shadow$()`, `nextElement()`, `previousElement()` और `parentElement()` एक `WebdriverIO.MultiRemoteElement` लौटाते हैं, जैसे `$()` करता है। v9 में वे plain array में हर instance के लिए एक element लौटाते थे। एक browser का element `getInstance` से पढ़ें:

```diff
- const [chromeHost, firefoxHost] = await browser.custom$('byTestId', 'host')
- await chromeHost.click()
+ const host = await browser.custom$('byTestId', 'host')
+ await host.getInstance('myChromeBrowser').click()
```

`custom$$()`, `react$$()` और, element पर, `shadow$$()` एक `WebdriverIO.MultiRemoteElementArray` लौटाते हैं, जैसे `$$()` करता है। v9 में वे plain array में हर instance के लिए एक list लौटाते थे। हर entry हर instance को संबोधित करती है। जो instance कम elements ढूँढता है उसके पास उस index पर कोई element नहीं होता:

```diff
- const [chromeItems, firefoxItems] = await browser.custom$$('byTestId', 'item')
- await chromeItems[0].click()
+ const items = await browser.custom$$('byTestId', 'item')
+ await items[0].getInstance('myChromeBrowser').click()
```

`WebdriverIO.MultiRemoteElement['selector']` का type `Selector` है, जैसा `WebdriverIO.Element['selector']` का है। v9 में इसका type `string` था, लेकिन value एक function या custom strategy reference भी हो सकती थी। जो TypeScript code इसे string के रूप में उपयोग करता है, उदाहरण के लिए `element.selector.includes('…')`, उसे पहले type की जाँच करनी होगी।

`WDIO_ENABLE_MULTI_REMOTE_SELECT` और `WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY` हटा दिए गए हैं। `select()` हमेशा उपलब्ध है, और `$$()` हमेशा ऊपर वाला element array लौटाता है। दोनों variables हटा दें।

## Binary mock responses

`mock.respond()` और `mock.respondOnce()` `Uint8Array` और `ArrayBuffer` payloads स्वीकार करते हैं, जिसमें global `Buffer` के बिना component tests में polyfilled `Buffer` भी शामिल है।

`mock.getBinaryResponse()` अब `Uint8Array | null` के रूप में typed है। यह Node.js में अभी भी `Buffer` लौटाता है, लेकिन browser में `Uint8Array` लौटाता है। Node.js में Buffer-specific methods का उपयोग करने के लिए, पहले non-null परिणाम को convert करें:

```diff
- const base64 = mock.getBinaryResponse(requestId)?.toString('base64')
+ const bytes = mock.getBinaryResponse(requestId)
+ const base64 = bytes === null ? undefined : Buffer.from(bytes).toString('base64')
```

## Multi-remote network mocks

Multi-remote browser पर `browser.mock()` एक `WebdriverIO.MultiRemoteMock` लौटाता है, mocks का array नहीं। `respond`, `restore`, और अन्य mock methods हर instance पर चलती हैं। Captured requests एक browser के mock से पढ़ें। Global `WebdriverIO` namespace से `WebdriverIO.MultiRemoteMock` type का उपयोग करें।

```diff
- const [chromeMock, firefoxMock] = await browser.mock('*/api')
- expect(chromeMock.calls).toHaveLength(1)
+ const mock = await browser.mock('*/api')
+ mock.respond({ ok: true })
+ expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
+ expect(mock.instances).toEqual(['myChromeBrowser', 'myFirefoxBrowser'])
```

जब नाम `instances` में से एक नहीं होता तो `getInstance` `Multi-remote object has no instance named "<name>"` throw करता है। `browser.select('myFirefoxBrowser', 'myChromeBrowser')` से मिला mock उन instances को उसी क्रम में सूचीबद्ध करता है, जो `browser.instances` से अलग हो सकता है। यह न मानें कि `mocks[0]` कोई विशेष browser है।

## Backend को छोड़ने वाले mock responses

`mock.respond(..., { fetchResponse: false })` backend को call नहीं करता। v9 में, जो mock `statusCode` या `responseHeaders` पर भी filter करता था, वह उस filter को अनदेखा करता था और फिर भी हर matching request का उत्तर देता था। v10 में, `respond()` और `respondOnce()` throw करते हैं, क्योंकि उन filters का निर्णय केवल backend response से किया जा सकता है।

```diff
- const mock = await browser.mock('**/users', { statusCode: 200 })
- mock.respond({ name: 'Ada' }, { fetchResponse: false })
+ const mock = await browser.mock('**/users')
+ mock.respond({ name: 'Ada' }, { fetchResponse: false })
```

Filter रखने के लिए, `fetchResponse` छोड़ दें ताकि mock response fetch करे, status या headers की जाँच करे, और फिर body को बदल दे।

## Element references {#element-references}

Element ids W3C WebDriver key `element-6066-11e4-a52e-4f735466cecf` और `elementId` property का उपयोग करते हैं। JSON Wire Protocol field `ELEMENT` अब element contract का हिस्सा नहीं है।

`WebdriverIO.Element` अब `ELEMENT` घोषित नहीं करता। `element.elementId` पढ़ें, जिसे element instances पहले से expose करते हैं।

`browser.execute`, और पेज में element भेजने वाली built-in scripts (`getHTML`, `isClickable`, `isDisplayed`, `scrollIntoView`, और बाकी), केवल W3C reference भेजती हैं:

```diff
- await browser.execute((el) => el.ELEMENT, elem)
+ await browser.execute(
+     (el) => el['element-6066-11e4-a52e-4f735466cecf'],
+     elem
+ )
```

एक find-element body जिसमें केवल `{ ELEMENT: '...' }` हो, element नहीं है। W3C key शामिल करें। यदि दोनों keys मौजूद हैं, तो WebdriverIO W3C id का उपयोग करता है।

Jasmine chained `$()` परिणाम को `toJSON` के माध्यम से print करता है। वह value वही W3C reference है, `{ 'element-6066-11e4-a52e-4f735466cecf': elementId }`।

WebDriver BiDi के साथ, जो script एक `NodeList` (उदाहरण के लिए `querySelectorAll` से) या एक `HTMLCollection` (उदाहरण के लिए `element.children`) लौटाती है, वह अब element references की list देती है, जैसा WebDriver Classic करता है। v9 में यह raw BiDi values देती थी, इसलिए `browser.execute` ऐसे objects लौटाता था जो elements नहीं हैं, और `querySelectorAll(...)` लौटाने वाली `custom$` या `custom$$` strategy को कोई element नहीं मिलता था। `Array.from(document.querySelectorAll(...))` जैसा workaround अभी भी काम करता है, और आप इसे हटा सकते हैं:

```diff
  browser.addLocatorStrategy('byCss', (selector) =>
-     Array.from(document.querySelectorAll(selector))
+     document.querySelectorAll(selector)
  )
```

## React selectors

`react$` और `react$$` अब React 16 से 19 के साथ काम करते हैं, उस app के लिए जो `createRoot` या `ReactDOM.render` से शुरू होता है। पहले, `browser.react$` और `browser.react$$` React 18 और बाद में fail होते थे (`Could not find the root element of your application`), और हर version में परिणाम अंतिम update से पहले वाले render से आ सकता था, इसलिए state change द्वारा जोड़ा गया component नहीं मिलता था।

जिस पेज पर React ने अभी root render नहीं किया है, वहाँ commands अब fail होने से पहले 5 सेकंड तक उसकी प्रतीक्षा करते हैं। पहले, वे तुरंत fail होते थे, इसलिए देर से शुरू होने वाला app नहीं मिलता था।

Commands अब [resq](https://github.com/baruchvlz/resq) library का उपयोग नहीं करते, और WebdriverIO अब इसे install नहीं करता। Selector नियम नहीं बदलते ([React Selectors](/docs/selectors#react-selectors) देखें), इन अपवादों के साथ:

- `props` और `state` दोनों के साथ `react$` ऐसा component ढूँढता है जो दोनों से match करे। पहले, जब `state` भी दिया जाता था तो यह `props` को अनदेखा करता था।
- `react$$` हर DOM node को एक बार देता है। पहले, कुछ browsers में एक higher-order component और उसका child एक ही element दो बार देते थे।
- Fragment वाला fragment nodes की एक flat list देता है। पहले, `react$` एक list लौटा सकता था।
- `null` value वाला filter काम करता है। पहले, यह `Cannot convert undefined or null to object` के साथ fail होता था।
- Element scope के बिना, commands पेज के सभी React roots में document के क्रम में खोजते हैं, अन्य roots के भीतर के roots और open shadow roots के roots में भी। `react$` पहला match देता है। पहले, वे केवल पहले root में खोजते थे, ऐसे root में भी जिसे React ने अभी render नहीं किया था या unmount कर दिया था, और shadow roots में नहीं खोजते थे। एक से अधिक root वाले पेज पर, `react$$` अब अधिक elements दे सकता है: केवल एक root में खोजने के लिए, उसके container पर command call करें, उदाहरण के लिए `$('#root').react$$('MyComponent')`।
- किसी अन्य root के भीतर के root के container पर, commands भीतरी root में खोजते हैं। पहले, वे बाहरी root में खोजते थे।
- किसी frame के browsing context पर, और frame के element पर, commands काम करते हैं। पहले, context command `this.executeScript is not a function` के साथ fail होता था, और element command `Could not find instance of React in given element` के साथ fail होता था।

Internal script `webdriverio/scripts/resq` हटा दी गई है।

## Component testing

`@wdio/browser-runner` `@vitest/spy` 5 (पहले 3) से `fn`, `spyOn` और mock types को re-export करता है। जिस mock को आपका code `new` के साथ call करता है उसे `function` या `class` implementation चाहिए। Arrow function `is not a constructor` throw करता है, और जब mock को `new` के साथ call किया जाता है तो `mockReturnValue` throw करता है।

```diff
- const Client = fn(() => ({ close: fn() }))
+ const Client = fn(function () { return { close: fn() } })
```

अन्य spy बदलावों के लिए, [Vitest migration guide](https://vitest.dev/guide/migration) देखें।

## Puppeteer

`webdriverio` `puppeteer-core` `>=24 <26` स्वीकार करता है, Puppeteer 25 सहित। `getPuppeteer()` और `@wdio/lighthouse-service` उसी line के विरुद्ध test किए गए हैं।

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

जब `typescript-eslint` package install होता है, तो recommended config `wdio/await-expect` के स्थान पर type-aware `wdio/no-floating-promise` rule पर switch करता है। केवल `@typescript-eslint/eslint-plugin` install करना पर्याप्त नहीं है।

```sh
npm install --save-dev typescript typescript-eslint
```

उस mode में, config हर match होने वाली फ़ाइल को TypeScript project service से parse करता है। इसे TypeScript फ़ाइलों तक सीमित करें, और सुनिश्चित करें कि वे किसी `tsconfig.json` का हिस्सा हैं:

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    { files: ['**/*.{ts,mts,cts,tsx}'], ...wdioConfig['flat/recommended'] },
]
```

एक matched JavaScript फ़ाइल जो TypeScript project में नहीं है, जैसे `wdio.conf.js`, "was not found by the project service" के साथ fail होती है। JavaScript फ़ाइलों को भी lint करने के लिए, `"allowJs": true` सेट करें, उन्हें `tsconfig.json` में `include` में जोड़ें, और pattern को `**/*.{js,mjs,cjs,ts,mts,cts,tsx}` तक बढ़ाएँ।

## Custom frameworks

Custom framework adapter पर `setupExpect` अब matchers का `Map` स्वीकार नहीं करता, और runner अब matchers object में `entries` method नहीं जोड़ता। `Object.entries(wdioMatchers)` से iterate करें।

## Firefox profile

`@wdio/firefox-profile-service` अब `legacy` को service option के रूप में नहीं मानता। वह flag केवल Firefox 55 और पुराने पर लागू होता था। इसे हटा दें। बचा हुआ `legacy: true` profile में `legacy` नाम की preference के रूप में लिखा जाता है।

## WebDriver protocol

हर session एक [W3C WebDriver](https://w3c.github.io/webdriver/) session है। WebdriverIO JSON Wire Protocol या Mobile JSON Wire Protocol नहीं बोलता। v9 ने वे commands हटा दिए थे। v10 उन protocols द्वारा उपयोग किए जाने वाले response envelope को भी हटा देता है, इसलिए जो server अभी भी उसे लौटाता है वह session शुरू नहीं कर सकता।

`browser.isW3C` हटा दिया गया है, जिसमें worker `sessionStarted` message पर पहले forward की जाने वाली value भी शामिल है। `attach` को `isW3C` देने को अनदेखा किया जाता है। BiDi command set client पर रहता है। एक live BiDi connection अभी भी `webSocketUrl` पर निर्भर है।

### BiDi पर `browser.back()` और `browser.forward()`

Call sites `await browser.back()` और `await browser.forward()` ही रहती हैं। कोई भी command argument नहीं लेता या value नहीं लौटाता।

BiDi session पर ये commands top-level browsing context पर `delta` `-1` या `1` के साथ `browsingContext.traverseHistory` call करते हैं, फिर उस document readiness की प्रतीक्षा करते हैं जिससे `pageLoadStrategy` map होती है। `none` तब लौटता है जब traversal command स्वीकार हो जाता है। `eager` `browsingContext.domContentLoaded` की प्रतीक्षा करता है। `normal`, जो default है, `browsingContext.load` की प्रतीक्षा करता है। Back-forward cache restore वे events emit नहीं करता; command तब लौटता है जब committed document का `readyState` पहले से strategy से match करता है। प्रतीक्षा session page-load timeout (`timeouts.pageLoad`, सेट न होने पर 300000 ms) का उपयोग करती है। Classic sessions अभी भी `POST /session/:sessionId/back` और `POST /session/:sessionId/forward` पर post करते हैं।

Missing history entry अभी भी reject होती है। BiDi पर message `browsingContext.traverseHistory` से आता है और इसमें classic WebDriver error text के बजाय `no such history entry` होता है। जो traversal कभी अपेक्षित readiness तक नहीं पहुँचता वह `History traversal timed out after <ms>ms waiting for browsingContext.domContentLoaded` या `browsingContext.load` के साथ reject होता है।

### New session response

Create Session को W3C body लौटानी चाहिए। WebdriverIO `value.sessionId` और `value.capabilities` पढ़ता है:

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

JSON Wire Protocol body अस्वीकार की जाती है। वह body `sessionId` और `status` को `value` के बगल में रखती है, और capabilities को स्वयं `value` में रखती है:

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

तब session creation `WebDriver new session response is missing a session id or capabilities. WebdriverIO requires a W3C WebDriver server.` throw करता है। यही error तब भी आती है जब `value.capabilities` missing हो, भले ही `value.sessionId` मौजूद हो।

आपके config में flat capability object अभी भी मान्य है। WebdriverIO request भेजने से पहले `{ browserName: 'chrome' }` को `alwaysMatch` में wrap करता है। W3C capability set के बाहर की keys के साथ मिली vendor-prefixed keys अभी भी अस्वीकार की जाती हैं। Vendor settings को `sauce:options`, `bstack:options`, `appium:options`, या किसी अन्य prefixed key में रखें।

### Command responses

Command परिणाम `{ "value": … }` है। `value` में कोई `error` न होने के साथ HTTP 200 सफलता है। Missing element HTTP 404 है जिसमें `value.error` `"no such element"` पर सेट है, जो अभी भी lazy element lookup की अनुमति देता है। Body पर numeric `status` को अनदेखा किया जाता है, जिसमें `status: 0` और पुराना `status: 7` ("no such element") code शामिल है। इसके बजाय W3C error object भेजें।

Exported error type `JSONWPCommandError` अब `SessionRequestError` है।

### Servers

जिन drivers के विरुद्ध WebdriverIO चलता है वे client connection पर पहले से W3C बोलते हैं:

- ChromeDriver Chrome 75 से default रूप से W3C है। Chromium-आधारित Edge इससे मेल खाता है। मौजूदा ChromeDriver अभी भी `goog:chromeOptions.w3c: false` स्वीकार करता है, जो उस एक session को legacy protocol पर वापस switch कर देता है। WebdriverIO उस switch का समर्थन नहीं करता।
- geckodriver और Apple का safaridriver केवल W3C हैं। `platformName` या `browserVersion` छोड़ने वाला Safari response अभी भी W3C है।
- Selenium 4 और Grid 4 W3C बोलते हैं। Grid ने 4.9 में JSON Wire Protocol का अनुवाद करना बंद कर दिया।
- Appium 2 ने JSON Wire Protocol और Mobile JSON Wire Protocol हटा दिए। Appium 3 ने बचे हुए parameter shapes भी हटा दिए। v10 को Appium 3 चाहिए, जो नीचे कवर किया गया है। `setWindowRect` छोड़ने वाला mobile session अभी भी W3C है; उस capability का अर्थ है कि device window का आकार नहीं बदल सकता।

ये servers अभी भी JSON Wire Protocol बोलते हैं और समर्थित नहीं हैं: Selenium 3, PhantomJS, EdgeHTML (`--jwp`), और सीधे connect किया गया WinAppDriver। Appium Windows driver W3C client के रूप में समर्थित रहता है। यह commands को WinAppDriver में translate करता है, जिसमें Get Element Property को attribute endpoint में बदलना शामिल है। WebdriverIO को Appium पर point करें, WinAppDriver के port पर नहीं।

[`@wdio/jsonwp-service`](https://www.npmjs.com/package/@wdio/jsonwp-service) उन servers को v10 के साथ काम नहीं कराता। Session startup को अभी भी ऊपर वाली W3C body चाहिए, और command परिणाम अभी भी numeric `status` को अनदेखा करते हैं। यदि वह server अभी भी आवश्यक है तो WebdriverIO 9 पर रहें।

`webdriver.remote.sessionid` अब Selenium standalone session को चिह्नित नहीं करता। Selenium Grid 4 अभी भी `se:cdp` से पहचाना जाता है।

`page load` timeout key [`setTimeout`](#settimeout) के अंतर्गत कवर की गई है। Element ids [Element references](#element-references) के अंतर्गत कवर किए गए हैं। Desktop पर, `[name="..."]` एक CSS selector है। `name` locator strategy mobile sessions के लिए बनी रहती है।

## Appium

WebdriverIO 10 को **Appium 3** और मौजूदा official drivers (UiAutomator2, XCUITest, Espresso, Windows, Mac2, आदि) चाहिए। Appium 1.x और 2.x असमर्थित हैं। यदि आप server upgrade नहीं कर सकते तो WebdriverIO 9 पर रहें।

```sh
npm i -D appium@^3
appium driver update installed
```

`@wdio/appium-service` `>=3` का एक optional `appium` peer घोषित करता है और पुराना server launch करने से मना करता है। जब Appium missing हो या 3 से पुराना हो तो `create-wdio` `appium@^3` install करता है।

जो cloud vendors अभी भी Appium 2 expose करते हैं उन्हें Appium 3 image चाहिए, या आपको WebdriverIO 9 पर रहना होगा।

### Mobile commands अब HTTP पर fallback नहीं करते

v9 में, कई mobile helpers `browser.execute('mobile: …')` आज़माते थे और, unknown-method error पर, हटाए गए Appium HTTP endpoint पर fallback करते थे। v10 में वह fallback हटा दिया गया है: वही error आपको Appium 3 पर upgrade करने को कहती है। WebdriverIO mobile commands (`browser.lock()`, `browser.shake()`, …) या सीधे `browser.execute('mobile: …')` को प्राथमिकता दें।

### हटाए गए protocol commands

Appium 3 ने [कई deprecated base-driver endpoints हटा दिए](https://appium.io/docs/en/latest/guides/migrating-2-to-3/)। WebdriverIO अब उनमें से अधिकांश routes के लिए client methods expose नहीं करता (उदाहरण के लिए `appiumLock`, `touchPerform`, और Mobile JSON Wire Protocol map)। इसके बजाय W3C Actions, संबंधित mobile command, या driver `mobile:` execute method का उपयोग करें।

### Appium `--allow-insecure` scope

Appium 3 को `--allow-insecure` features पर driver या `*` scope prefix चाहिए, उदाहरण के लिए `uiautomator2:adb_shell` या `*:adb_shell`।

### बिना prefix वाली Appium capabilities अब Appium session नहीं चुनतीं

`appium:` prefix के बिना `automationName`, `deviceName`, और `appiumVersion` अब WebdriverIO को browser driver छोड़ने और Appium service attach करने के लिए नहीं कहते। Prefixed capability का उपयोग करें, या इसे `appium:options` के अंतर्गत nest करें:

```diff
- capabilities: { platformName: 'Android', automationName: 'UiAutomator2', deviceName: 'emulator' }
+ capabilities: {
+     platformName: 'Android',
+     'appium:automationName': 'UiAutomator2',
+     'appium:deviceName': 'emulator'
+ }
```

`wdio repl` अब वे prefixed keys emit करता है, जिनमें `appium:app`, `appium:platformVersion`, और `appium:udid` शामिल हैं।

### Mobile पर `getValue` element property पढ़ता है

`element.getValue()` हर session पर Get Element Property call करता है, Appium 3 सहित। Mobile session पर यह पहले Get Element Attribute call करता था।

### `stopRecordingScreen` signature को `startRecordingScreen` के अनुरूप किया गया

`driver.stopRecordingScreen` अब पिछले 4 arguments के बजाय केवल एक `options` argument स्वीकार करता है, `driver.startRecordingScreen` के अनुरूप। अलग-अलग arguments को एक object के भीतर ले जाएँ:

```diff
- driver.stopRecordingScreen('webdriver.io', undefined, undefined, 'POST')
+ driver.stopRecordingScreen({ remotePath: 'webdriver.io', method: 'POST' })
```

## Multi-remote naming

`multiremote` या `Multiremote` वर्तनी वाले APIs अब camelCase / PascalCase में `multiRemote` / `MultiRemote` हैं। पुराने नामों का कोई alias नहीं है।

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

`multiremote` और `Multiremote` (case-sensitive) खोजें और हर match को बदलें। Allure reports भी multi-remote tests को `isMultiremote` के बजाय `isMultiRemote` से label करती हैं।

## Linux पर virtual displays

`@wdio/xvfb` को `@wdio/display-server` से बदल दिया गया है। हर worker को `xvfb-run` में wrap करने के बजाय, testrunner पूरे run के लिए एक display server शुरू करता है, किसी भी service के `onPrepare` hook से पहले। यह headless mode में Weston को प्राथमिकता देता है और Xvfb पर fallback करता है। विवरण के लिए [Headless & Display Servers](/docs/headless-and-display-servers) देखें।

Options का नाम बदल दिया गया है। पुराने नाम v10 में अभी भी काम करते हैं लेकिन deprecation warning log करते हैं, और v11 में हटा दिए जाएँगे। यदि आप दोनों नाम सेट करते हैं, तो नया नाम मान्य होता है:

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

`xvfbMaxRetries` और `xvfbRetryDelay` का कोई प्रभाव नहीं है, और ये भी v11 में हटा दिए जाएँगे। Startup अब retry नहीं होता: यदि Weston शुरू होने में विफल होता है, तो testrunner Xvfb आज़माता है, और यदि कोई भी शुरू नहीं होता, तो run बिना display के जारी रहता है।

जो config नाम बदले गए चार options में से किसी एक को उसके विकल्प के बिना सेट करता है, और `displayServer` सेट नहीं करता, वह v9 की तरह Xvfb का उपयोग करता रहता है। जब तक वह display server बंद नहीं करता, वह `Preferring Xvfb, as v9 did, because the config sets v9 display keys` भी log करता है। Options का नाम बदलने के बाद, Xvfb रखने के लिए `displayServer: 'xvfb'` जोड़ें, या Weston को प्राथमिकता देने के लिए इसे छोड़ दें। Auto mode में custom install command पहले Weston के लिए चलता है, और Xvfb के लिए दोबारा केवल तब जब Weston अभी भी उपलब्ध न हो या शुरू होने में विफल हो और Xvfb अभी भी missing हो, इसलिए दूसरे server के प्रयास को छोड़ने के लिए `displayServer` को उस server पर सेट करें जिसे वह install करता है।

Auto-install अब `yum` का समर्थन नहीं करता, जिसका v9 `dnf` के बिना hosts पर उपयोग करता था। v10 केवल `apt-get`, `dnf`, `zypper`, `pacman`, `apk` और `xbps-install` का पता लगाता है, इसलिए केवल-`yum` वाले host पर Xvfb स्वयं install करें।

v9 में `xvfbAutoInstallCommand` array एक shell के माध्यम से चलता था, इसलिए `&&` या `VAR=value` जैसे elements काम करते थे। Arrays अब किसी भी option नाम के अंतर्गत बिना shell के चलते हैं, इसलिए shell syntax के लिए string का उपयोग करें।

अन्य बदलाव जो आप देख सकते हैं:

- सभी workers एक display साझा करते हैं। v9 में, हर worker का अपना display था। Chrome और Edge pages में अब focus की कमी हो सकती है, [Window focus](/docs/headless-and-display-servers#window-focus) देखें।
- Xvfb display number निश्चित नहीं है। `:99` मानने के बजाय इसे `DISPLAY` से पढ़ें।
- केवल `WAYLAND_DISPLAY` सेट वाला host अब display वाला माना जाता है। v9 वहाँ workers को Xvfb के अंतर्गत चलाता था, क्योंकि `DISPLAY` सेट नहीं था। v10 कुछ भी शुरू नहीं करता, browser windows को आपके compositor पर खोलता है, और run के लिए `XDG_SESSION_TYPE`, `GDK_BACKEND` और `ELECTRON_OZONE_PLATFORM_HINT` को `wayland` पर सेट करता है। उन्हें पहले की तरह Xvfb के अंतर्गत चलाने के लिए, `WAYLAND_DISPLAY` को unset करें और `displayServer: 'xvfb'` सेट करें।
- Default screen 1920x1080 है। v9 `xvfb-run` के default का उपयोग करता था, जो Debian और Ubuntu पर 1280x1024 और Fedora, RHEL और Arch पर 640x480 है। आपकी baselines जिस size का उपयोग करती हैं उसे बनाए रखने के लिए, `displayServerWidth` और `displayServerHeight` को उस पर सेट करें।
- Browsers display server द्वारा सेट किए गए `XDG_SESSION_TYPE` से Wayland या X11 चुनते हैं। Weston के अंतर्गत, WebdriverIO अपने द्वारा launch किए गए Chrome और Edge में `--ozone-platform=wayland` भी जोड़ता है, क्योंकि 140 से पहले के Chrome और Edge (135 से पहले का Chrome for Testing) `XDG_SESSION_TYPE` को अनदेखा करते हैं। Weston कोई `DISPLAY` प्रदान नहीं करता, इसलिए यदि आपके tests या tools को X11 चाहिए, तो `displayServer: 'xvfb'` सेट करें।
- यदि आपने `@wdio/xvfb` से `XvfbManager` या `xvfb` instance का सीधे उपयोग किया था, तो इसके बजाय `@wdio/display-server` से `DisplayServerManager` का उपयोग करें। जहाँ आपने `xvfb.init()` चलाया था और commands को `xvfb-run` में wrap किया था, या `ProcessFactory` के माध्यम से processes spawn किए थे, वहाँ एक display शुरू करें और उसका environment उन processes को दें जिन्हें इसकी आवश्यकता है। उदाहरण 1280x1024 पर Xvfb का उपयोग करता है, जैसा v9 Debian और Ubuntu पर करता था। जिस host पर केवल `WAYLAND_DISPLAY` सेट है, वहाँ पहले उसे unset करें, अन्यथा `startDaemon()` कुछ भी शुरू नहीं करता:

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

`browser.emulate()` मौजूदा top-level browsing context के लिए WebDriver BiDi emulation module को चलाता है। v9 एक preload script inject करता था जो `navigator.geolocation.getCurrentPosition`, `navigator.userAgent`, `window.matchMedia` और `navigator.onLine` को patch करती थी। वे scripts हटा दी गई हैं। `browser.emulate('clock', …)` अभी भी मौजूदा पेज में और बाद में खोले गए pages में fake timers install करता है।

BiDi scopes के लिए अब reload की आवश्यकता नहीं है।

```diff
  await browser.emulate('onLine', false)
- // केवल `navigator.onLine` बदला; traffic फिर भी चलता रहा
+ // browsing context offline है, जिसमें fetch, WebSocket और WebTransport शामिल हैं
```

- `onLine: false` `{ type: 'offline' }` के साथ `emulation.setNetworkConditions` call करता है। `true` और scope को restore करना इसे clear करते हैं। Throughput और latency `browser.throttleNetwork()` पर ही रहते हैं।
- `colorScheme` `prefers-color-scheme` media feature सेट करता है, इसलिए CSS `@media (prefers-color-scheme)` `matchMedia` का पालन करता है।
- `userAgent` browser user-agent override है, patched `navigator.userAgent` property नहीं।
- `geolocation` browser geolocation stack का उपयोग करता है। किसी पेज को अभी भी `browser.setPermissions({ name: 'geolocation' }, 'granted')` की आवश्यकता हो सकती है। `{ error: 'positionUnavailable' }` coordinates के बजाय वह error report करता है।
- `colorScheme` और `media` एक media-feature map साझा करते हैं। बाद वाली call पूरे map को बदल देती है, और किसी भी scope को restore करना इसे clear कर देता है।
- `device` device descriptor से user agent, viewport, touch, mobile text layout और viewport meta सेट करता है। यह `screen` या `orientation` नहीं बदलता।

नए scopes `media`, `locale`, `timezone`, `touch`, `orientation`, `screen`, `viewportMeta`, `textLayout`, `scripting`, `scrollbar` और `forcedColors` हैं। जो browser किसी command को implement नहीं करता वह call को अपनी error (`unknown command` या `unsupported operation`) के साथ reject करता है। WebdriverIO preload script या CDP पर fallback नहीं करता। यदि `device` बीच में reject होता है, तो पिछला user agent, viewport, touch, text layout और viewport meta वापस रख दिए जाते हैं।

`wdio session emulate` वही scopes स्वीकार करता है। यह अब तुरंत लागू होने वाले override के लिए आपको reload करने को नहीं कहता। `emulate network` presets और `emulate cpu` अपरिवर्तित हैं और केवल Chromium के लिए रहते हैं। [Emulation](/docs/emulation) देखें।

## अगले कदम

- [Migration skill](#migrate-with-a-coding-agent) को प्रोजेक्ट में copy करें और किसी agent से इसे लागू करने को कहें।
- नए v10 tests लिखने के लिए [WebdriverIO for Coding Agents](/docs/ai-agents)।
- जब suite Linux पर चलता है तो [Headless and Display Servers](/docs/headless-and-display-servers)।