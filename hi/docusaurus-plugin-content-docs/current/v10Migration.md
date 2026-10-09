---
id: v10-migration
title: v9 से v10 तक
description: किसी WebdriverIO v9 प्रोजेक्ट को v10 में अपडेट करें। इसमें हर breaking change और इस गाइड को लागू करने वाली एक coding-agent skill शामिल है।
---

यह गाइड WebdriverIO `v10` के breaking changes और उनके लिए आपको क्या करना है, यह बताती है।

पिछले major संस्करणों के विपरीत, इनमें से ज़्यादातर बदलाव WebdriverIO [codemod](https://github.com/webdriverio/codemod) से लागू नहीं हो सकते, क्योंकि वे इस पर निर्भर करते हैं कि आपके टेस्ट का असल मतलब क्या है। नीचे दिए गए [पुराने कमांड सिग्नेचर](#legacy-command-signatures) सीधे-सीधे बदले जा सकते हैं। बाकी हर सेक्शन बताता है कि अपने suite में प्रभावित जगहें कैसे ढूँढें।

## कोडिंग एजेंट के साथ माइग्रेट करें {#migrate-with-a-coding-agent}

अपने एजेंट को v10 migration skill दें और उससे कहें कि इस पेज के अनुसार suite को WebdriverIO v10 में माइग्रेट करे। Skill प्रक्रिया बताती है: क्या खोजना है, कौन-सा codemod चलाना है, और कब रुकना है। हर breaking change के लिए यह पेज ही अंतिम स्रोत है।

इसे उस प्रोजेक्ट से इंस्टॉल करें जिसे आप अपग्रेड कर रहे हैं। [skills CLI](https://skills.sh) इस रिपॉज़िटरी से [`.agents/skills/wdio-v10-migration/SKILL.md`](https://github.com/webdriverio/webdriverio/blob/main/.agents/skills/wdio-v10-migration/SKILL.md) पढ़ता है और इसे आपके चुने हुए एजेंट्स की skill डायरेक्टरी में लिख देता है:

```sh
npx skills add webdriverio/webdriverio --skill wdio-v10-migration
```

`--skill wdio-v10-migration` यही skill इंस्टॉल करता है। WebdriverIO रिपॉज़िटरी पर काम करने वाली skills internal के रूप में चिह्नित हैं और पेश नहीं की जातीं। CLI पूछता है कि किन एजेंट्स के लिए इंस्टॉल करना है और skill को हर एजेंट की प्रोजेक्ट डायरेक्टरी में लिख देता है। आप उस फ़ाइल को चैट में अटैच भी कर सकते हैं।

Strict selectors और capability में बिना prefix वाली `specs` / `exclude` सूचियाँ केवल suite चलने पर ही सामने आती हैं। Skill अकेले source code से इनका फ़ैसला नहीं कर सकती।

## Node.js

WebdriverIO v10 को Node.js 22.19.0 या बाद का संस्करण चाहिए। Node.js 18 और 20 अब समर्थित नहीं हैं। CI Node.js 22, 24 और 26 को कवर करता है।

## Component tests

Browser runner अब भी Chrome 90, Edge 90, Firefox 90 और Safari 14.1 या नए संस्करणों में चलता है। देखें [Browser support](/docs/component-testing#browser-support)।

`browser.execute` को दिया गया कोड ES2021 पर ही रहता है, ताकि वह टेस्ट किए जा रहे पुराने ब्राउज़र्स में चल सके। यह न्यूनतम स्तर नहीं बदला।

## Mocha

`@wdio/mocha-framework` और `@wdio/browser-runner` [Mocha 12](https://mochajs.org/blog/mocha-12-stable/) पर निर्भर हैं। Mocha 12 को Node.js `^20.19.0 || >=22.12.0` चाहिए, जो v10 के न्यूनतम स्तर 22.19.0 से कवर हो जाता है।

```diff
- mochaOpts: { compilers: ['ts:ts-node/register'] }
+ mochaOpts: { require: ['ts-node/register'] }
```

`mochaOpts.compilers` हटा दिया गया है। Mocha ने लंबे समय से deprecated `--compilers` फ़्लैग हटा दिया है, इसलिए बचे हुए compiler mappings अनदेखे कर दिए जाते हैं। Transpilers या दूसरी setup फ़ाइलें `mochaOpts.require` से लोड करें।

`failHookAffectedTests` का डिफ़ॉल्ट `true` है। कोई विफल `before` या `beforeEach` hook उन टेस्ट्स को विफल कर देता है जिन्हें उस hook ने स्किप किया। केवल hook को रिपोर्ट करने के लिए `mochaOpts.failHookAffectedTests` को `false` पर सेट करें।

`expect-webdriverio` 8 का उपयोग करें, देखें [expect-webdriverio 8](#expect-webdriverio-8)। Mocha एक ही प्रोसेस में उस पैकेज को दो बार लोड कर सकता है; यह उन प्रतियों के बीच assertion state साझा करता है ([expect-webdriverio#2221](https://github.com/webdriverio/expect-webdriverio/pull/2221))।

Mocha 12 के वे बदलाव जो `mochaOpts` के ज़रिए असर डाल सकते हैं:

- `grep` आधुनिक RegExp flags स्वीकार करता है।
- `ui` अब भी `bdd`, `tdd`, `qunit` या `exports` है। Custom interfaces को `*-bdd`, `*-tdd` या `*-qunit` suffix रखना चाहिए।
- `parallel` अब भी असमर्थित है। Spec parallelism WDIO संभालता है; अगर आप इसे सक्षम करते हैं तो Mocha का worker pool error देगा।

Mocha 12 ESM-first (`"type": "module"`) है। Programmatic `require('mocha')` अब भी Node 22 पर `require(esm)` के ज़रिए काम करता है। WDIO Mocha CLI (`wdio run … --mochaOpts.*`) नहीं बदला; Mocha का अपना CLI अब yargs के बजाय `util.parseArgs` का उपयोग करता है।

## Cucumber

`@wdio/cucumber-framework` [`@cucumber/cucumber` 13](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300) पर निर्भर है।

Cucumber 13 को Node.js 22, 24 या 26 या बाद का संस्करण चाहिए। यह Node.js 20, 23 या 25 पर नहीं चलता। Framework पैकेज भी यही रेंज घोषित करता है, जो v10 के न्यूनतम स्तर 22.19.0 से शुरू होती है।

```diff
- cucumberOpts: { tagExpression: '@smoke' }
+ cucumberOpts: { tags: '@smoke' }
```

`tagExpression` का कोई alias नहीं है। इसे सेट करने पर error throw होता है, ताकि बचा हुआ filter चुपचाप हर scenario न चला दे।

Cucumber 13 अब `Cli` export नहीं करता। Programmatic runs `@cucumber/cucumber/api` के `runCucumber` से होते हैं, जिसका adapter पहले से उपयोग करता है।

Cucumber 13 के अन्य breaking changes (ambiguous formatter paths, parallel workers, `BeforeAll` / `AfterAll`) [Cucumber की upgrade guide](https://github.com/cucumber/cucumber-js/blob/main/UPGRADING.md#1300) में बताए गए हैं।

## Jasmine

`@wdio/jasmine-framework` [Jasmine 6](https://jasmine.github.io/upgrade-guides/6.0) पर निर्भर है। Jasmine 6 Node.js 20, 22 और 24 पर टेस्ट किया गया है। v10 का न्यूनतम स्तर 22.19.0 पहले से इस रेंज को कवर करता है।

`jasmineNodeOpts` हटा दिया गया है। Jasmine को `jasmineOpts` से कॉन्फ़िगर करें। `jasmineNodeOpts` सेट करने पर error throw होता है:

```text
The option "jasmineNodeOpts" was removed in WebdriverIO v10. Use "jasmineOpts" instead.
```

```diff
- jasmineNodeOpts: { defaultTimeoutInterval: 60000 }
+ jasmineOpts: { defaultTimeoutInterval: 60000 }
```

`jasmineOpts.failFast` अब पढ़ा नहीं जाता। `jasmineOpts.stopOnSpecFailure` का उपयोग करें। बचा हुआ `failFast` suite को नहीं रोकता। Cucumber का `failFast` एक अलग विकल्प है और अब भी काम करता है।

```diff
- jasmineOpts: { failFast: true }
+ jasmineOpts: { stopOnSpecFailure: true }
```

`jasmineOpts.stopSpecOnExpectationFailure` हटा दिया गया है। `jasmineOpts.oneFailurePerSpec` का उपयोग करें। पुरानी key सेट करने पर error throw होता है:

```text
The option "jasmineOpts.stopSpecOnExpectationFailure" was removed in WebdriverIO v10. Use "jasmineOpts.oneFailurePerSpec" instead.
```

```diff
- jasmineOpts: { stopSpecOnExpectationFailure: true }
+ jasmineOpts: { oneFailurePerSpec: true }
```

Jasmine के sync matchers फिर से synchronous हैं। v9 में global `expect` Jasmine का `expectAsync` था, इसलिए `expect(1).toBe(1)` एक promise लौटाता था। v10 में Jasmine के built-in matchers और `jasmine.addMatchers` से जोड़े गए matchers `undefined` लौटाते हैं। WebdriverIO matchers, Jasmine के async matchers और `jasmine.addAsyncMatchers` वाले matchers अब भी promise लौटाते हैं, इसलिए उन्हें `await` करते रहें। आपको `await expect($('#logo')).toBeDisplayed()` को `expectAsync()` में बदलने की ज़रूरत नहीं है: global `expect` WebdriverIO matchers को आपके लिए `expectAsync` पर भेज देता है। `await expect(1).toBe(1)` काम करता रहता है।

बिना `await` के विफल sync assertion अब spec को विफल कर देता है। v9 में यह एक rejected promise था: अगर किसी ने उसे await नहीं किया, तो spec पास हो सकता था, और log में केवल एक unhandled rejection दिखता था। अपग्रेड के बाद, उन specs को देखें जो विफल होने लगते हैं। उनमें v9 में एक छिपी हुई विफलता थी, और सुधार टेस्ट या एप्लिकेशन में करना है, `expect` कॉल में नहीं:

```js
it('saves the form', async () => {
    const onSave = jasmine.createSpy('onSave')
    await submitForm(onSave)
    // v9: `onSave` कॉल न होने पर भी पास हो जाता था
    // v10: `onSave` कॉल न होने पर विफल होता है
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

- `oneFailurePerSpec` अब spec को उसके पहले विफल assertion पर रोक देता है: sync matcher के लिए तुरंत, और awaited async matcher के लिए जब promise settle हो जाए।
- Jasmine के spy matchers बिना `await` के काम करते हैं। v9 में `toHaveBeenCalled`, `toHaveSpyInteractions` और `toHaveNoOtherSpyInteractions` "Does not take arguments" के साथ विफल होते थे, और बिना `await` के एक बिना-कॉल हुआ spy पास हो जाता था।
- `jasmine.addMatchers` अब बदला नहीं जाता, इसलिए Jasmine अब अपनी "Monkey patching detected" चेतावनी नहीं दिखाता।

`toHaveSize` के दो अर्थ हैं। किसी WebdriverIO value पर, यह WebdriverIO matcher है और element का आकार जाँचता है: एक element, एक element array (`$$().filter()` के परिणाम सहित), एक `Element[]`, एक multi-remote element, एक browser, एक browsing context, एक mock, `some()` wrapper, या chainable `$()` जैसा कोई promise। किसी भी अन्य value पर, यह Jasmine का matcher है और length जाँचता है। v9 में हमेशा Jasmine का matcher चलता था।

```js
expect([1, 2]).toHaveSize(2)                                   // Jasmine, sync
await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO, async
```

Types भी इन्हीं नियमों का पालन करते हैं। `@wdio/jasmine-framework` अब global `expect` को Jasmine के matchers, साथ ही WebdriverIO matchers और Jasmine async matchers के साथ type करता है, जो promise लौटाते हैं। अपनी `tsconfig.json` के `types` से `expect-webdriverio/jasmine-wdio-expect-async` हटा दें, क्योंकि यह हर matcher को async के रूप में type करता है। अगर `jasmine` वहाँ नहीं है तो उसे जोड़ें:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
-        "types": ["node", "@wdio/globals/types", "expect-webdriverio/jasmine-wdio-expect-async", "@wdio/jasmine-framework"]
+        "types": ["node", "jasmine", "@wdio/globals/types", "@wdio/jasmine-framework"]
     }
 }
```

`expect.oneOf()` और `expect.multiRemote()` अब Jasmine specs में भी काम करते हैं। पहले, runtime पर वे Jasmine के `expect` पर मौजूद नहीं थे।

## expect-webdriverio 8

`@wdio/globals`, `@wdio/runner` और `@wdio/browser-runner` को peer dependency के रूप में `expect-webdriverio` 8 चाहिए। v9 में यह `expect-webdriverio` 7 था। अगर आपकी `package.json` में `expect-webdriverio` सूचीबद्ध है, तो उसे `@wdio/*` पैकेजों वाले बदलाव में ही संस्करण 8 पर अपडेट करें।

`expect-webdriverio` 8 के अपने breaking changes हैं। इसकी [v7 से v8 migration guide](https://github.com/webdriverio/expect-webdriverio/blob/main/docs/Migrations.md#migration-guide-v7-to-v8) हर बदलाव और उसका विकल्प बताती है। इन बदलावों का किसी test suite पर असर पड़ने की सबसे ज़्यादा संभावना है:

- `$$()` पर `toHaveText` elements की तुलना index-दर-index करता है। पेज से अलग क्रम में दी गई expected array विफल होती है। पेज वाला क्रम, `expect.oneOf()` या `expect.arrayContaining()` का उपयोग करें।
- किसी एक element पर expected values की array देने पर `toHaveText`, `toHaveHTML`, `toHaveComputedLabel` और `toHaveComputedRole` विफल होते हैं। `expect.oneOf()` का उपयोग करें।
- `setFeatureFlags()` और `featureFlags` विकल्प हटा दिए गए हैं।
- ये deprecated APIs हटा दिए गए हैं: `setOptions` (`setDefaultOptions` का उपयोग करें), `getConfig` (`getDefaultOptions` का उपयोग करें), `matchers` (`wdioCustomMatchers` का उपयोग करें), `toHaveAttr` (`toHaveAttribute` का उपयोग करें), `toHaveClass` (`toHaveElementClass` का उपयोग करें), `toBeRequestedWithResponse()` (`toBeRequestedWith({ response })` का उपयोग करें), और `expect-webdriverio/types` (`expect-webdriverio/expect-global` का उपयोग करें)।
- `beforeAssertion` और `afterAssertion` hooks को उस alias का नाम मिलता है जिसे टेस्ट ने कॉल किया, `toBeExisting`, `toBePresent`, `toHaveLink`, `toHaveValue` और `toBeRequested` के लिए। v9 में उन्हें alias के पीछे वाले matcher का नाम मिलता था, उदाहरण के लिए `toBeExisting` के लिए `toExist`।
- Multi-remote browser पर, `$$()` का परिणाम `expect` को दें। `[...elements]` या `Array.from(elements)` जैसी साधारण array को elements के रूप में पहचाना नहीं जाता, और assertion विफल हो जाता है।

Multi-remote browser पर, एक assertion हर instance की जाँच करता है, और `expect.multiRemote()` हर instance के लिए एक expected value देता है। देखें [Multiremote assertions](/docs/multiremote#assertions)।

## Multi-remote Global

Lowercase `multiremotebrowser` global हटा दिया गया है, `@wdio/globals` से और `eslint-plugin-wdio` के globals से भी। `multiRemoteBrowser` का उपयोग करें।

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

Top-level config keys `specs` और `exclude` ही रहती हैं। किसी capability पर बची हुई बिना prefix वाली सूची उस capability के लिए फ़ाइलें नहीं चुनती। तब capability top-level `specs` और `exclude` का उपयोग करती है।

Sauce Labs options types से `tunnelIdentifier` और `parentTunnel` aliases हटा दिए गए हैं। `tunnelName` और `tunnelOwner` का उपयोग करें।

## TypeScript

`webdriverio` द्वारा export किए गए `Element`, `MultiRemoteBrowser` और `MultiRemoteElement` types हटा दिए गए हैं। Global `WebdriverIO` namespace का उपयोग करें।

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

दोनों chainable types अब `T extends PromiseLike<unknown>` से मेल खाते हैं। `PromiseLike` की जाँच करने वाला कोई conditional type `$()` और `$$()` के लिए v9 से अलग branch लेता है। उदाहरण के लिए, `Awaited<ChainablePromiseElement>` अब `WebdriverIO.Element` है, और `Awaited<ChainablePromiseArray>` `WebdriverIO.ElementArray` है।

बिना await किए `$$()` की properties का type बदल गया है। वे query resolve होने से पहले ही तुरंत उपलब्ध हैं, इसलिए उन्हें बिना `await` या `.then()` के पढ़ें:

| Property | v9 | v10 |
|---|---|---|
| `selector` | `Promise<Selector>` | `Selector \| undefined` |
| `parent` | `Promise<...>` | parent, promise नहीं (नीचे देखें) |
| `foundWith` | कोई नहीं | वह कमांड जिसने सूची ढूँढी, जैसे `$$` या `custom$$` |
| `props` | कोई नहीं | उस कमांड के अतिरिक्त arguments |

```diff
- const selector = await $$('li').selector
+ const selector = $$('li').selector
```

`$('form').$$('input')` जैसी chained query पर, `parent` सूची resolve होने तक chainable `$('form')` है, और उसके बाद resolved element। `parent` को element के रूप में उपयोग करने से पहले सूची को await करें।

Runtime पर, `$$()` सूची पर `filter()`, `filterSeries()` और `slice()` एक element सूची लौटाते हैं, साधारण array नहीं। परिणाम source सूची के `selector`, `foundWith`, `parent` और `props` बनाए रखता है। v9 में `filter()` इन properties के बिना एक साधारण array लौटाता था। Types अभी यह नहीं दिखाते: `filter()` और `filterSeries()` को `Promise<WebdriverIO.Element[]>` लौटाने वाला घोषित किया गया है, और `slice()` `WebdriverIO.Element[]` लौटाता है, इसलिए परिणाम पर इन properties को पढ़ने पर TypeScript error रिपोर्ट करता है।

WebdriverIO derived सूची के लिए query फिर से नहीं चलाता: उसके अंत से आगे का index और matches का इंतज़ार नहीं करता, और यह कभी ऐसा element नहीं लौटाता जिसे filter ने बाहर कर दिया हो। इसके सदस्य अब भी source query के elements हैं, अपने मूल `selector` और `index` के साथ। अगर कोई सदस्य stale हो जाता है, तो WebdriverIO उसे source query से उसी index पर फिर से लाता है, जो पेज बदलने पर कोई दूसरा element हो सकता है। जो कोड सूची की properties से उसकी query फिर से चलाता है, उदाहरण के लिए `parent[foundWith](selector, ...props)`, उसे पूरी सूची मिलती है, filter की हुई नहीं।

Published पैकेज `typeScriptVersion` को 6.0.3 पर सेट करते हैं, जो उस TypeScript संस्करण से मेल खाता है जिससे यह रिपॉज़िटरी compile होती है।

`browser.mock()` `urlpattern-polyfill` का `URLPattern` और native `URLPattern` (Node.js 24 में global, और TypeScript 6 की `dom` library द्वारा typed) दोनों स्वीकार करता है।

TypeScript 6 `"moduleResolution": "node"` और `"baseUrl"` को deprecate करता है, और `strict` को डिफ़ॉल्ट बनाता है। `create-wdio` अब ESM प्रोजेक्ट्स के लिए `"moduleResolution": "bundler"` और CommonJS प्रोजेक्ट्स के लिए `"NodeNext"` जनरेट करता है। अगर आप किसी मौजूदा प्रोजेक्ट में TypeScript अपडेट करते हैं, तो अपनी `tsconfig.json` में ये विकल्प बदलें।

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

TypeScript 6 `types` का डिफ़ॉल्ट भी `[]` कर देता है, इसलिए यह अब हर इंस्टॉल किए गए `@types/*` पैकेज को लोड नहीं करता। अगर आपकी `tsconfig.json` में कोई `types` सूची नहीं है, तो Mocha के `describe` और `it` जैसे globals `Cannot find name` के साथ विफल होते हैं। अपने टेस्ट्स द्वारा उपयोग किए जाने वाले type पैकेज सूचीबद्ध करें, जैसा `create-wdio` करता है। उदाहरण के लिए, Mocha के साथ:

```diff title="tsconfig.json"
 {
     "compilerOptions": {
+        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
     }
 }
```

`npm create wdio@latest` `compilerOptions.target` और `compilerOptions.lib` को `es2024` के रूप में लिखता है। उस फ़ाइल को type-check करने के लिए TypeScript 5.7 या नया चाहिए। `tsx`, जो config और टेस्ट्स चलाता है, type-check नहीं करता, इसलिए पुराना compiler तभी मायने रखता है जब आप ख़ुद `tsc` चलाते हैं।

मौजूदा `tsconfig.json` दोबारा नहीं लिखी जाती। जनरेट की गई config जो किसी दूसरी config को extend करती है, parent का `target` और `lib` बनाए रखती है।

`afterAssertion` hook में, `params.result` का type अब `{ pass, message }` है, जैसा matchers देते हैं। v9 में type `{ result, message }` था, लेकिन runtime पर `params.result.result` हमेशा `undefined` होता था। `params.result.pass` पढ़ें:

```diff
  afterAssertion (params) {
-     console.log(params.matcherName, params.result.result)
+     console.log(params.matcherName, params.result.pass)
  }
```

`pass` तब `true` होता है जब value expected value से मेल खाती है, `.not` के साथ भी। इसलिए `.not` के साथ, assertion तब पास होता है जब `pass` `false` हो। Hook यह नहीं बताता कि टेस्ट ने `.not` का उपयोग किया या नहीं।

## Reporters

Browser का `result` event reporters को `client:afterCommand` के रूप में आगे भेजा जाता है। उस payload और `AfterCommandArgs` type में अब `name` property नहीं है। इसके बजाय `command` पढ़ें। Custom commands पहले से `command` भेजते थे।

```diff
  onAfterCommand(args) {
-     console.log(args.name)
+     console.log(args.command)
  }
```

### Allure

`@wdio/allure-reporter` पर `addEnvironment(name, value)` हटा दिया गया है। इसका कोई प्रभाव नहीं था। Allure reporter options में [`reportedEnvironmentVars`](/docs/allure-reporter) से environment rows सेट करें।

## `$` strict है

`$` अब __ठीक एक__ element को दर्शाता है। अगर selector एक से अधिक elements पर resolve होता है, तो कमांड चुपचाप पहले match का उपयोग करने के बजाय `StrictSelectorError` throw करता है:

```js
// v9 — पहले बटन पर क्लिक करता है, भले ही 12 बटन हों
await $('button').click()

// v10
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
// Use `$$("button")` to work with all matches, `$$("button")[0]` if you explicitly want the first one,
// or narrow down the selector so it matches a single element.
```

यह [Playwright locators](https://playwright.dev/docs/locators#strictness) से मेल खाता है। Cypress अलग है: उसकी queries कई elements पर resolve हो सकती हैं, और [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn) जैसे action commands डिफ़ॉल्ट रूप से multi-element subject को अस्वीकार करते हैं। जो selector चुपचाप कई elements पर resolve होता है, वह लगभग हमेशा एक छिपा हुआ bug होता है: वह आज पास होता है और जैसे ही कोई पेज पर दूसरा बटन जोड़ता है, ग़लत element से interact करने लगता है।

यह नियम chain के हर चरण (`$('form').$('input')`) पर और `$` द्वारा स्वीकार किए जाने वाले हर selector type पर लागू होता है — string selectors (shadow DOM को भेदने वाले selectors सहित), JS functions, mobile selectors और custom strategy references।

### क्या नहीं बदला

- `$$` अब भी शून्य या कई elements लौटाता है। v10 से वह सूची एक [`ElementArray`](/docs/api/browser/$$) है: एक असली array जिसे आप `await` कर सकते हैं, जिसमें resolve होने से पहले `for await` और async `map` / `filter` उपलब्ध हैं। `await $$('button').length` गिनती है। `$$('button').length > 0` नहीं, क्योंकि सूची resolve होने तक `length` एक promise है। `for (const el of $$('button'))` तब तक throw करता है जब तक आपने सूची को await नहीं किया; `for await` का उपयोग करें, या `await` के बाद `for...of`।
- समर्पित helper commands `custom$`, `shadow$` और `react$` strict नहीं हैं — वे अब भी अपना पहला match लौटाते हैं, जैसे उनके `$$` समकक्ष।
- जो selector किसी से मेल नहीं खाता, वह अब भी lazily-resolved element लौटाता है, इसलिए `waitForExist` और [auto-waiting](/docs/autowait) पहले जैसे ही व्यवहार करते हैं।
- Element reference पास करना, जैसे `$(await browser.getActiveElement())`, हमेशा एक ही node को संदर्भित करता है और इसकी कभी जाँच नहीं होती।

### अपने suite का ऑडिट कैसे करें

इसके लिए कोई codemod नहीं है: केवल आप ही बता सकते हैं कि दूसरा match bug है या जानबूझकर है। दो व्यावहारिक तरीके:

1. __अपना suite चलाएँ।__ हर उल्लंघन selector और matches की संख्या के साथ throw होता है, जो आमतौर पर उसे तुरंत ठीक करने के लिए काफ़ी है।
2. __व्यापक selectors की पहले से जाँच करें।__ अपने page objects में हर सामान्य `$(...)` के लिए, print करें कि वह असल में कितने elements से मेल खाता है:

   ```js
   console.log(await $$('button').length) // 12 → `$('button')` बहुत व्यापक है
   ```

फिर या तो selector को संकीर्ण करें — आदर्श रूप से `$('button=Submit')` या `$('aria/Submit')` जैसी user-facing query की ओर, देखें [Selectors](/docs/selectors) — या स्पष्ट रूप से बताएँ कि आप पहला match चाहते हैं:

```js
await $('button[type="submit"]').click()
// ...या, अगर सच में आपका मतलब पहले वाले से ही है
await $$('button')[0].click()
```

### Opt out करना

एक query के लिए:

```js
await $('button', { strict: false }).click()
```

पूरे प्रोजेक्ट के लिए, v9 का व्यवहार वापस लाने हेतु:

```js title="wdio.conf.js"
export const config = {
    // ...
    strictSelectors: false
}
```

एक element याद रखता है कि उसे कैसे query किया गया था, इसलिए उसे फिर से लाने पर — stale element reference के बाद, या `waitForExist` के ज़रिए — मूल कॉल की strictness बनी रहती है।

:::info

अंदरूनी तौर पर strict `$` `findElement` के बजाय `findElements` request भेजता है, क्योंकि matches गिनना ही इस नियम को लागू करने का एकमात्र तरीका है। दोनों ही तरीकों में यह एक ही round trip है, लेकिन यह उन custom services और WebDriver mocks को दिखाई देता है जो `findElement` कमांड पर निर्भर करते हैं।

:::

## पुराने कमांड सिग्नेचर {#legacy-command-signatures}

v9 अब भी पुराने positional रूप स्वीकार करता था और चेतावनी देता था। v10 केवल options object स्वीकार करता है।

v10 [codemod](https://github.com/webdriverio/codemod) `addCommand` और `overwriteCommand` को तब दोबारा लिखता है जब तीसरा argument boolean हो, `getHTML(true)` और `getHTML(false)` को, और `getCookies` को तब जब filter एक string या एक-element वाली array हो। एक से अधिक नाम वाली `getCookies` कॉल बिना बदले छोड़ दी जाती है, क्योंकि एक filter एक नाम से मेल खाता है।

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

Boolean तीसरा argument एक TypeScript error है। Runtime पर यह throw करता है:

```
Passing a boolean as the third argument to `addCommand` was removed in WebdriverIO v10. Use `addCommand(name, fn, { attachToElement: true })`.
```

`proto` और `instances` उसी options object में आते हैं। किसी कमांड को browser से जोड़ने के लिए तीसरा argument छोड़ दें।

### `getCookies`

String और string-array filters अस्वीकार किए जाते हैं। एक [cookie filter object](https://w3c.github.io/webdriver-bidi/#type-storage-CookieFilter) पास करें। एक कॉल एक नाम को filter करती है; दूसरे नाम के लिए इसे फिर से कॉल करें।

```diff
- await browser.getCookies('session')
- await browser.getCookies(['session', 'auth'])
+ await browser.getCookies({ name: 'session' })
+ await browser.getCookies({ name: 'auth' })
```

बिना arguments के `getCookies()` अब भी पेज को दिखाई देने वाली हर cookie लौटाता है।

### `getHTML`

```diff
- await $('h1').getHTML(false)
+ await $('h1').getHTML({ includeSelectorTag: false })
```

बिना arguments के `getHTML()` अब भी element का अपना tag शामिल करता है।

### `newWindow`

`windowName` और `windowFeatures` हटा दिए गए हैं। वे केवल WebDriver Classic पर लागू होते थे। कमांड अब भी `type` स्वीकार करता है:

```diff
- await browser.newWindow('https://webdriver.io', {
-     windowName: 'WebdriverIO window',
-     windowFeatures: 'width=420,height=230,resizable,scrollbars=yes,status=1',
- })
+ await browser.newWindow('https://webdriver.io', { type: 'window' })
```

Tab खोलने के लिए `type: 'tab'` का उपयोग करें।

### `startActivity`

केवल options object स्वीकार किया जाता है। `appWaitPackage`, `appWaitActivity` और `optionalIntentArguments` हटा दिए गए हैं। वे केवल हटाए गए Appium HTTP endpoint पर लागू होते थे। `mobile: startActivity` उन्हें स्वीकार नहीं करता, और उन्हें पास करने पर throw होता है।

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

`browser.throttle` और deprecated `touchAction` commands हटा दिए गए हैं।

| v9 | v10 |
| --- | --- |
| `browser.throttle('Regular3G')` | [`browser.throttleNetwork('Regular3G')`](/docs/api/browser/throttleNetwork) |
| `browser.touchAction(...)` / `element.touchAction(...)` | touch pointer के साथ [Actions API](/docs/api/browser/action), या mobile commands [`tap`](/docs/api/mobile/tap) और [`swipe`](/docs/api/mobile/swipe) |

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

`setFiles` को BiDi session चाहिए। Paths browser द्वारा खोले जाते हैं। Relative path `process.cwd()` के सापेक्ष resolve होता है। Selenium Grid file staging v10 का हिस्सा नहीं है। जो suite किसी node पर bytes भेजने के लिए `uploadFile` पर निर्भर था, उसे फ़ाइल वहाँ रखनी होगी जहाँ browser उसे पढ़ सके, फिर `setFiles` कॉल करना होगा।

Classic local session पर, `element.setValue('/local/path')` अब भी ऐसा path टाइप करता है जिसे local browser पहले से देख सकता है। Raw Selenium endpoint उन Grid उपयोगकर्ताओं के लिए `browser.file()` के रूप में बना रहता है जो इसे सीधे कॉल करते हैं।

## `executeAsync`

`browser.executeAsync` और `element.executeAsync` हटा दिए गए हैं। [`execute`](/docs/api/browser/execute) को एक `async` function पास करें। Function की return value, लौटाए गए promise सहित, कमांड का परिणाम है। `script` timeout अब भी लागू होता है।

```ts
const result = await browser.execute(async (a, b) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return a + b
}, 1, 2)
```

WebDriver का `done` callback हटा दें। जो string script अपने अंतिम argument के रूप में उस callback की अपेक्षा करती थी, उसे इसके बजाय एक promise लौटाना होगा। Runtime पर, `executeAsync` एक function नहीं है।

## `switchToFrame`

`browser.switchToFrame` अब public कमांड नहीं है।

WebDriver BiDi session में, `switchFrame` और `switchWindow` throw करते हैं। एक tab, एक window और एक frame एक `WebdriverIO.BrowsingContext` हैं जिसे आप अपने पास रखते हैं। `browser.url()` session के शुरुआती top-level context को navigate करता है और उसे लौटाता है। `browser.newWindow()` नया context लौटाता है और उस पर switch नहीं करता। `context.frame()` एक child frame लौटाता है। `context.parent` वह frame है जिससे आपने इसे खोला।

```ts
const page = await browser.url('https://example.com')
const other = await browser.newWindow('https://webdriver.io', { type: 'tab' })
console.log(await page.getTitle())
const frame = await page.frame('iframe')
console.log(await frame.$('h1').getText())
const pages = await browser.browsingContexts()
```

`context.url` document URL string है। अपने पास रखे context को `context.navigate(url)` से navigate करें। `browser.url()` से load metadata `context.request` है।

Classic session में, `switchFrame` को element के साथ, या top frame के लिए `null` के साथ कॉल करते रहें। वहाँ string या function अस्वीकार किया जाता है।

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

`implicit` और `script` नहीं बदले।

## Multi-remote instance access

Multi-remote browser अब हर session को अपनी property के रूप में नहीं रखता। Multi-remote element के लिए भी यही सच है। किसी एक session को संबोधित करने के लिए `getInstance` और `select` का उपयोग होता है।

```diff
- await browser.myChromeBrowser.url('https://webdriver.io')
- await (await browser.$('button')).myChromeBrowser.click()
+ await browser.getInstance('myChromeBrowser').url('https://webdriver.io')
+ await (await browser.$('button')).getInstance('myChromeBrowser').click()
```

जो TypeScript augmentation `WebdriverIO.MultiRemoteBrowser` में `myChromeBrowser: WebdriverIO.Browser` जोड़ता है, वह अब किसी runtime property से मेल नहीं खाता। उस augmentation को हटाएँ और `getInstance` कॉल करें।

Testrunner के साथ और `injectGlobals` चालू रहने पर, instance का नाम अब भी एक global है (`myChromeBrowser.url(...)`)। वह global एकल session है। यह `browser.myChromeBrowser` नहीं है।

Command results capability क्रम में रहते हैं: पहली entry capabilities object की पहली key की होती है।

Multi-remote browser पर `browser.$$()` एक `WebdriverIO.MultiRemoteElementArray` लौटाता है, साधारण `MultiRemoteElement[]` नहीं। यह अब भी एक array है, इसलिए `elements[0]` जैसा index read काम करता रहता है।

इसके `map`, `filter`, `forEach`, `find`, `findIndex`, `some`, `every` और `reduce` methods async हैं, जैसे `WebdriverIO.ElementArray` पर, और `await` के बाद भी एक promise लौटाते हैं। `custom$$()`, `react$$()` और `shadow$$()` द्वारा लौटाई गई सूचियों के लिए भी यही सच है। v9 में ये साधारण array के sync methods थे:

```diff
  const items = await browser.$$('li')
- const ids = items.map((item) => item.selector)
+ const ids = await items.map((item) => item.selector)
```

`custom$()`, `react$()` और, element पर, `shadow$()`, `nextElement()`, `previousElement()` और `parentElement()` एक `WebdriverIO.MultiRemoteElement` लौटाते हैं, जैसे `$()` करता है। v9 में वे एक साधारण array में हर instance के लिए एक element लौटाते थे। किसी एक browser का element `getInstance` से पढ़ें:

```diff
- const [chromeHost, firefoxHost] = await browser.custom$('byTestId', 'host')
- await chromeHost.click()
+ const host = await browser.custom$('byTestId', 'host')
+ await host.getInstance('myChromeBrowser').click()
```

`custom$$()`, `react$$()` और, element पर, `shadow$$()` एक `WebdriverIO.MultiRemoteElementArray` लौटाते हैं, जैसे `$$()` करता है। v9 में वे एक साधारण array में हर instance के लिए एक सूची लौटाते थे। हर entry हर instance को संबोधित करती है। जो instance कम elements ढूँढता है, उसके पास उस index पर कोई element नहीं होता:

```diff
- const [chromeItems, firefoxItems] = await browser.custom$$('byTestId', 'item')
- await chromeItems[0].click()
+ const items = await browser.custom$$('byTestId', 'item')
+ await items[0].getInstance('myChromeBrowser').click()
```

`WebdriverIO.MultiRemoteElement['selector']` का type `Selector` है, जैसा `WebdriverIO.Element['selector']` का है। v9 में इसका type `string` था, लेकिन value एक function या custom strategy reference भी हो सकती थी। जो TypeScript कोड इसे string के रूप में उपयोग करता है, उदाहरण के लिए `element.selector.includes('…')`, उसे पहले type की जाँच करनी होगी।

`WDIO_ENABLE_MULTI_REMOTE_SELECT` और `WDIO_ENABLE_MULTI_REMOTE_ELEMENT_ARRAY` हटा दिए गए हैं। `select()` हमेशा उपलब्ध है, और `$$()` हमेशा ऊपर वाला element array लौटाता है। दोनों variables हटा दें।

## Binary mock responses

`mock.respond()` और `mock.respondOnce()` `Uint8Array` और `ArrayBuffer` payloads स्वीकार करते हैं, जिसमें बिना global `Buffer` वाले component tests में polyfilled `Buffer` भी शामिल है।

`mock.getBinaryResponse()` अब `Uint8Array | null` के रूप में typed है। यह Node.js में अब भी `Buffer` लौटाता है, लेकिन browser में `Uint8Array` लौटाता है। Node.js में Buffer-विशिष्ट methods का उपयोग करने के लिए, पहले non-null परिणाम को convert करें:

```diff
- const base64 = mock.getBinaryResponse(requestId)?.toString('base64')
+ const bytes = mock.getBinaryResponse(requestId)
+ const base64 = bytes === null ? undefined : Buffer.from(bytes).toString('base64')
```

## Multi-remote network mocks

Multi-remote browser पर `browser.mock()` एक `WebdriverIO.MultiRemoteMock` लौटाता है, mocks की array नहीं। `respond`, `restore` और अन्य mock methods हर instance पर चलते हैं। Captured requests किसी एक browser के mock से पढ़ें। Global `WebdriverIO` namespace से `WebdriverIO.MultiRemoteMock` type का उपयोग करें।

```diff
- const [chromeMock, firefoxMock] = await browser.mock('*/api')
- expect(chromeMock.calls).toHaveLength(1)
+ const mock = await browser.mock('*/api')
+ mock.respond({ ok: true })
+ expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
+ expect(mock.instances).toEqual(['myChromeBrowser', 'myFirefoxBrowser'])
```

जब नाम `instances` में से एक नहीं होता, तो `getInstance` `Multi-remote object has no instance named "<name>"` throw करता है। `browser.select('myFirefoxBrowser', 'myChromeBrowser')` से बना mock उन instances को उसी क्रम में सूचीबद्ध करता है, जो `browser.instances` से अलग हो सकता है। यह न मानें कि `mocks[0]` कोई विशेष browser है।

## Backend को छोड़ने वाले mock responses

`mock.respond(..., { fetchResponse: false })` backend को कॉल नहीं करता। v9 में, जो mock `statusCode` या `responseHeaders` पर भी filter करता था, वह उस filter को अनदेखा करता था और फिर भी हर मेल खाने वाली request का जवाब देता था। v10 में `respond()` और `respondOnce()` throw करते हैं, क्योंकि उन filters का फ़ैसला केवल backend response से ही हो सकता है।

```diff
- const mock = await browser.mock('**/users', { statusCode: 200 })
- mock.respond({ name: 'Ada' }, { fetchResponse: false })
+ const mock = await browser.mock('**/users')
+ mock.respond({ name: 'Ada' }, { fetchResponse: false })
```

Filter बनाए रखने के लिए, `fetchResponse` छोड़ दें ताकि mock response fetch करे, status या headers जाँचे, और फिर body बदले।

## Element references {#element-references}

Element ids W3C WebDriver key `element-6066-11e4-a52e-4f735466cecf` और `elementId` property का उपयोग करते हैं। JSON Wire Protocol field `ELEMENT` अब element contract का हिस्सा नहीं है।

`WebdriverIO.Element` अब `ELEMENT` घोषित नहीं करता। `element.elementId` पढ़ें, जिसे element instances पहले से expose करते हैं।

`browser.execute`, और पेज में element भेजने वाली built-in scripts (`getHTML`, `isClickable`, `isDisplayed`, `scrollIntoView`, आदि), केवल W3C reference पास करती हैं:

```diff
- await browser.execute((el) => el.ELEMENT, elem)
+ await browser.execute(
+     (el) => el['element-6066-11e4-a52e-4f735466cecf'],
+     elem
+ )
```

जिस find-element body में केवल `{ ELEMENT: '...' }` हो, वह element नहीं है। W3C key शामिल करें। अगर दोनों keys मौजूद हैं, तो WebdriverIO W3C id का उपयोग करता है।

Jasmine chained `$()` परिणाम को `toJSON` के ज़रिए print करता है। वह value वही W3C reference है, `{ 'element-6066-11e4-a52e-4f735466cecf': elementId }`।

WebDriver BiDi के साथ, जो script `NodeList` (उदाहरण के लिए `querySelectorAll` से) या `HTMLCollection` (उदाहरण के लिए `element.children`) लौटाती है, वह अब element references की सूची देती है, जैसा WebDriver Classic करता है। v9 में यह raw BiDi values देती थी, इसलिए `browser.execute` ऐसे objects लौटाता था जो elements नहीं हैं, और `querySelectorAll(...)` लौटाने वाली `custom$` या `custom$$` strategy को कोई element नहीं मिलता था। `Array.from(document.querySelectorAll(...))` जैसा workaround अब भी काम करता है, और आप इसे हटा सकते हैं:

```diff
  browser.addLocatorStrategy('byCss', (selector) =>
-     Array.from(document.querySelectorAll(selector))
+     document.querySelectorAll(selector)
  )
```

## React selectors

`react$` और `react$$` अब React 16 से 19 के साथ काम करते हैं, उस app के लिए जो `createRoot` या `ReactDOM.render` से शुरू होता है। पहले, `browser.react$` और `browser.react$$` React 18 और बाद के संस्करणों के साथ विफल होते थे (`Could not find the root element of your application`), और हर संस्करण में परिणाम अंतिम update से पहले के render से आ सकता था, इसलिए state change से जोड़ा गया component नहीं मिलता था।

जिस पेज पर React ने अभी तक root render नहीं किया है, वहाँ commands अब विफल होने से पहले उसके लिए 5 सेकंड तक इंतज़ार करते हैं। पहले, वे तुरंत विफल हो जाते थे, इसलिए देर से शुरू होने वाला app नहीं मिलता था।

Commands अब [resq](https://github.com/baruchvlz/resq) library का उपयोग नहीं करते, और WebdriverIO अब इसे इंस्टॉल नहीं करता। Selector नियम नहीं बदलते (देखें [React Selectors](/docs/selectors#react-selectors)), इन अपवादों के साथ:

- `props` और `state` दोनों के साथ `react$` ऐसा component ढूँढता है जो दोनों से मेल खाए। पहले, `state` दिए जाने पर यह `props` को अनदेखा करता था।
- `react$$` हर DOM node को एक बार देता है। पहले, कुछ browsers में एक higher-order component और उसका child एक ही element दो बार देते थे।
- Fragment के अंदर का fragment nodes की एक सपाट सूची देता है। पहले, `react$` एक सूची लौटा सकता था।
- `null` value वाला filter काम करता है। पहले, यह `Cannot convert undefined or null to object` के साथ विफल होता था।
- Element scope के बिना, commands पेज के सभी React roots को document के क्रम में खोजते हैं, दूसरे roots के अंदर के roots और open shadow roots में मौजूद roots को भी। `react$` पहला match देता है। पहले, वे केवल पहला root खोजते थे, वह भी जिसे React ने अभी तक render नहीं किया था या unmount कर दिया था, और shadow roots नहीं खोजते थे। एक से अधिक root वाले पेज पर, `react$$` अब अधिक elements दे सकता है: केवल एक root खोजने के लिए, उसके container पर कमांड कॉल करें, उदाहरण के लिए `$('#root').react$$('MyComponent')`।
- किसी दूसरे root के अंदर के root के container पर, commands अंदर वाला root खोजते हैं। पहले, वे बाहर वाला root खोजते थे।
- किसी frame के browsing context पर, और किसी frame के element पर, commands काम करते हैं। पहले, context कमांड `this.executeScript is not a function` के साथ विफल होता था, और element कमांड `Could not find instance of React in given element` के साथ विफल होता था।

Internal script `webdriverio/scripts/resq` हटा दी गई है।

## Component testing

`@wdio/browser-runner` `@vitest/spy` 5 (पहले 3) से `fn`, `spyOn` और mock types को re-export करता है। जिस mock को आपका कोड `new` के साथ कॉल करता है, उसे `function` या `class` implementation चाहिए। Arrow function `is not a constructor` throw करता है, और `new` के साथ mock कॉल होने पर `mockReturnValue` throw करता है।

```diff
- const Client = fn(() => ({ close: fn() }))
+ const Client = fn(function () { return { close: fn() } })
```

अन्य spy बदलावों के लिए, [Vitest migration guide](https://vitest.dev/guide/migration) देखें।

## Puppeteer

`webdriverio` `puppeteer-core` `>=24 <26` स्वीकार करता है, जिसमें Puppeteer 25 शामिल है। `getPuppeteer()` और `@wdio/lighthouse-service` उसी line के विरुद्ध टेस्ट किए गए हैं।

## ESLint

`eslint-plugin-wdio` को ESLint 10 चाहिए। ESLint 9 2026-08-06 को [end of life](https://eslint.org/version-support/) पर पहुँच गया और अब समर्थित नहीं है। TypeScript के साथ, `typescript-eslint` 8.56.0 या बाद का संस्करण उपयोग करें।

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

जब `typescript-eslint` पैकेज इंस्टॉल होता है, तो recommended config `wdio/await-expect` की जगह type-aware `wdio/no-floating-promise` rule पर switch कर जाती है। केवल `@typescript-eslint/eslint-plugin` इंस्टॉल करना काफ़ी नहीं है।

```sh
npm install --save-dev typescript typescript-eslint
```

उस mode में, config अपने द्वारा मेल खाने वाली हर फ़ाइल को TypeScript project service से parse करती है। इसे TypeScript फ़ाइलों तक सीमित करें, और सुनिश्चित करें कि वे किसी `tsconfig.json` का हिस्सा हों:

```js
import { configs as wdioConfig } from 'eslint-plugin-wdio'

export default [
    { files: ['**/*.{ts,mts,cts,tsx}'], ...wdioConfig['flat/recommended'] },
]
```

मेल खाने वाली JavaScript फ़ाइल जो TypeScript project में नहीं है, जैसे `wdio.conf.js`, "was not found by the project service" के साथ विफल होती है। JavaScript फ़ाइलों को भी lint करने के लिए, `"allowJs": true` सेट करें, उन्हें `tsconfig.json` में `include` में जोड़ें, और pattern को `**/*.{js,mjs,cjs,ts,mts,cts,tsx}` तक बढ़ाएँ।

## Custom frameworks

Custom framework adapter पर `setupExpect` अब matchers का `Map` स्वीकार नहीं करता, और runner अब matchers object में `entries` method नहीं जोड़ता। `Object.entries(wdioMatchers)` से iterate करें।

## Firefox profile

`@wdio/firefox-profile-service` अब `legacy` को service option नहीं मानता। वह flag केवल Firefox 55 और पुराने संस्करणों पर लागू होता था। इसे हटा दें। बचा हुआ `legacy: true` profile में `legacy` नाम की preference के रूप में लिख दिया जाता है।

## WebDriver protocol

हर session एक [W3C WebDriver](https://w3c.github.io/webdriver/) session है। WebdriverIO JSON Wire Protocol या Mobile JSON Wire Protocol नहीं बोलता। v9 ने वे commands हटा दिए थे। v10 उन protocols द्वारा उपयोग किया जाने वाला response envelope भी हटा देता है, इसलिए जो server अब भी उसे लौटाता है, वह session शुरू नहीं कर सकता।

`browser.isW3C` हटा दिया गया है, जिसमें worker `sessionStarted` message पर पहले आगे भेजी जाने वाली value भी शामिल है। `attach` को `isW3C` पास करना अनदेखा किया जाता है। BiDi command set client पर बना रहता है। Live BiDi connection अब भी `webSocketUrl` पर निर्भर है।

### BiDi पर `browser.back()` और `browser.forward()`

Call sites `await browser.back()` और `await browser.forward()` ही रहती हैं। कोई भी कमांड न तो argument लेता है और न ही value लौटाता है।

BiDi session पर ये commands top-level browsing context पर `delta` `-1` या `1` के साथ `browsingContext.traverseHistory` कॉल करते हैं, फिर उस document readiness का इंतज़ार करते हैं जिससे `pageLoadStrategy` map होता है। `none` तब लौटता है जब traversal कमांड स्वीकार हो जाता है। `eager` `browsingContext.domContentLoaded` का इंतज़ार करता है। `normal`, जो डिफ़ॉल्ट है, `browsingContext.load` का इंतज़ार करता है। Back-forward cache restore वे events emit नहीं करता; कमांड तब लौटता है जब committed document का `readyState` पहले से strategy से मेल खाता है। इंतज़ार session page-load timeout (`timeouts.pageLoad`, unset होने पर 300000 ms) का उपयोग करता है। Classic sessions अब भी `POST /session/:sessionId/back` और `POST /session/:sessionId/forward` पर post करते हैं।

History entry न होने पर अब भी reject होता है। BiDi पर message `browsingContext.traverseHistory` से आता है और उसमें classic WebDriver error text के बजाय `no such history entry` होता है। जो traversal कभी अपेक्षित readiness तक नहीं पहुँचता, वह `History traversal timed out after <ms>ms waiting for browsingContext.domContentLoaded` या `browsingContext.load` के साथ reject होता है।

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

JSON Wire Protocol body अस्वीकार की जाती है। वह body `sessionId` और `status` को `value` के बगल में रखती है, और capabilities को ख़ुद `value` में रखती है:

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

तब session creation `WebDriver new session response is missing a session id or capabilities. WebdriverIO requires a W3C WebDriver server.` throw करता है। यही error तब भी आता है जब `value.capabilities` मौजूद न हो, भले ही `value.sessionId` मौजूद हो।

आपकी config में flat capability object अब भी मान्य है। WebdriverIO request भेजने से पहले `{ browserName: 'chrome' }` को `alwaysMatch` में wrap कर देता है। W3C capability set से बाहर की keys के साथ मिली vendor-prefixed keys अब भी अस्वीकार की जाती हैं। Vendor settings को `sauce:options`, `bstack:options`, `appium:options`, या किसी अन्य prefixed key में रखें।

### Command responses

Command का परिणाम `{ "value": … }` है। `value` में बिना `error` के HTTP 200 सफलता है। Missing element HTTP 404 है जिसमें `value.error` `"no such element"` पर सेट होता है, जो अब भी lazy element lookup की अनुमति देता है। Body पर numeric `status` अनदेखा किया जाता है, जिसमें `status: 0` और पुराना `status: 7` ("no such element") code शामिल है। इसके बजाय W3C error object भेजें।

Exported error type `JSONWPCommandError` अब `SessionRequestError` है।

### Servers

जिन drivers के विरुद्ध WebdriverIO चलता है, वे client connection पर पहले से W3C बोलते हैं:

- ChromeDriver Chrome 75 से डिफ़ॉल्ट रूप से W3C है। Chromium-based Edge इससे मेल खाता है। मौजूदा ChromeDriver अब भी `goog:chromeOptions.w3c: false` स्वीकार करता है, जो उस एक session को वापस legacy protocol पर switch कर देता है। WebdriverIO उस switch का समर्थन नहीं करता।
- geckodriver और Apple का safaridriver केवल W3C हैं। जो Safari response `platformName` या `browserVersion` छोड़ देता है, वह भी W3C ही है।
- Selenium 4 और Grid 4 W3C बोलते हैं। Grid ने 4.9 में JSON Wire Protocol का अनुवाद बंद कर दिया।
- Appium 2 ने JSON Wire Protocol और Mobile JSON Wire Protocol हटा दिए। Appium 3 ने बचे हुए parameter shapes भी हटा दिए। v10 को Appium 3 चाहिए, जिसके बारे में नीचे बताया गया है। जो mobile session `setWindowRect` छोड़ देता है, वह भी W3C ही है; उस capability का अर्थ है कि device window का आकार नहीं बदल सकता।

ये servers अब भी JSON Wire Protocol बोलते हैं और समर्थित नहीं हैं: Selenium 3, PhantomJS, EdgeHTML (`--jwp`), और सीधे जुड़ा हुआ WinAppDriver। Appium Windows driver W3C client के रूप में समर्थित रहता है। यह commands को WinAppDriver के लिए translate करता है, जिसमें Get Element Property को attribute endpoint पर भेजना शामिल है। WebdriverIO को Appium की ओर point करें, WinAppDriver के port की ओर नहीं।

[`@wdio/jsonwp-service`](https://www.npmjs.com/package/@wdio/jsonwp-service) उन servers को v10 के साथ काम करने लायक नहीं बनाता। Session startup को अब भी ऊपर वाली W3C body चाहिए, और command results अब भी numeric `status` को अनदेखा करते हैं। अगर वह server अब भी ज़रूरी है तो WebdriverIO 9 पर बने रहें।

`webdriver.remote.sessionid` अब Selenium standalone session को चिह्नित नहीं करता। Selenium Grid 4 अब भी `se:cdp` से पहचाना जाता है।

`page load` timeout key [`setTimeout`](#settimeout) में कवर की गई है। Element ids [Element references](#element-references) में कवर किए गए हैं। Desktop पर, `[name="..."]` एक CSS selector है। `name` locator strategy mobile sessions के लिए बनी रहती है।

## Appium

WebdriverIO 10 को **Appium 3** और मौजूदा official drivers (UiAutomator2, XCUITest, Espresso, Windows, Mac2, आदि) चाहिए। Appium 1.x और 2.x असमर्थित हैं। अगर आप server अपग्रेड नहीं कर सकते तो WebdriverIO 9 पर बने रहें।

```sh
npm i -D appium@^3
appium driver update installed
```

`@wdio/appium-service` `>=3` का एक optional `appium` peer घोषित करता है और पुराने server को launch करने से मना करता है। जब Appium मौजूद न हो या 3 से पुराना हो, तो `create-wdio` `appium@^3` इंस्टॉल करता है।

जो cloud vendors अब भी Appium 2 देते हैं, उन्हें Appium 3 image चाहिए, या आपको WebdriverIO 9 पर बने रहना होगा।

### Mobile commands अब HTTP पर fall back नहीं करते

v9 में, कई mobile helpers `browser.execute('mobile: …')` आज़माते थे और unknown-method error पर, एक हटाए गए Appium HTTP endpoint पर fall back करते थे। v10 में वह fallback हटा दिया गया है: वही error आपको Appium 3 में अपग्रेड करने को कहता है। WebdriverIO mobile commands (`browser.lock()`, `browser.shake()`, …) या सीधे `browser.execute('mobile: …')` को प्राथमिकता दें।

### हटाए गए protocol commands

Appium 3 ने [कई deprecated base-driver endpoints हटा दिए](https://appium.io/docs/en/latest/guides/migrating-2-to-3/)। WebdriverIO अब उनमें से ज़्यादातर routes के लिए client methods expose नहीं करता (उदाहरण के लिए `appiumLock`, `touchPerform`, और Mobile JSON Wire Protocol map)। इसके बजाय W3C Actions, संबंधित mobile कमांड, या driver का `mobile:` execute method उपयोग करें।

### Appium `--allow-insecure` scope

Appium 3 को `--allow-insecure` features पर driver या `*` scope prefix चाहिए, उदाहरण के लिए `uiautomator2:adb_shell` या `*:adb_shell`।

### बिना prefix वाली Appium capabilities अब Appium session नहीं चुनतीं

`appium:` prefix के बिना `automationName`, `deviceName` और `appiumVersion` अब WebdriverIO को browser driver छोड़ने और Appium service जोड़ने के लिए नहीं कहते। Prefixed capability का उपयोग करें, या इसे `appium:options` के अंदर रखें:

```diff
- capabilities: { platformName: 'Android', automationName: 'UiAutomator2', deviceName: 'emulator' }
+ capabilities: {
+     platformName: 'Android',
+     'appium:automationName': 'UiAutomator2',
+     'appium:deviceName': 'emulator'
+ }
```

`wdio repl` अब वे prefixed keys emit करता है, जिनमें `appium:app`, `appium:platformVersion` और `appium:udid` शामिल हैं।

### Mobile पर `getValue` element property पढ़ता है

`element.getValue()` हर session पर Get Element Property कॉल करता है, Appium 3 सहित। Mobile session पर यह पहले Get Element Attribute कॉल करता था।

### `stopRecordingScreen` signature `startRecordingScreen` के अनुरूप

`driver.stopRecordingScreen` अब पिछले 4 arguments के बजाय केवल एक `options` argument स्वीकार करता है, जो `driver.startRecordingScreen` के अनुरूप है। अलग-अलग arguments को एक object के अंदर रखें:

```diff
- driver.stopRecordingScreen('webdriver.io', undefined, undefined, 'POST')
+ driver.stopRecordingScreen({ remotePath: 'webdriver.io', method: 'POST' })
```

## Multi-remote naming

`multiremote` या `Multiremote` लिखे गए APIs अब camelCase / PascalCase में `multiRemote` / `MultiRemote` हैं। पुराने नामों का कोई alias नहीं है।

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

`@wdio/xvfb` की जगह `@wdio/display-server` ने ले ली है। हर worker को `xvfb-run` में wrap करने के बजाय, testrunner किसी भी service के `onPrepare` hook से पहले पूरे run के लिए एक display server शुरू करता है। यह headless mode में Weston को प्राथमिकता देता है और Xvfb पर fall back करता है। विवरण के लिए [Headless & Display Servers](/docs/headless-and-display-servers) देखें।

विकल्पों के नाम बदल दिए गए हैं। पुराने नाम v10 में अब भी काम करते हैं लेकिन deprecation चेतावनी log करते हैं, और v11 में हटा दिए जाएँगे। अगर आप दोनों नाम सेट करते हैं, तो नया नाम प्रभावी होता है:

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

`xvfbMaxRetries` और `xvfbRetryDelay` का कोई प्रभाव नहीं है, और ये भी v11 में हटा दिए जाएँगे। Startup अब दोबारा आज़माया नहीं जाता: अगर Weston शुरू होने में विफल रहता है, तो testrunner Xvfb आज़माता है, और अगर कोई भी शुरू नहीं होता, तो run बिना display के जारी रहता है।

जो config चार बदले गए विकल्पों में से किसी एक को उसके विकल्प के बिना सेट करती है, और `displayServer` सेट नहीं करती, वह v9 की तरह Xvfb का उपयोग करती रहती है। जब तक वह display server बंद नहीं करती, वह `Preferring Xvfb, as v9 did, because the config sets v9 display keys` भी log करती है। विकल्पों के नाम बदलने के बाद, Xvfb बनाए रखने के लिए `displayServer: 'xvfb'` जोड़ें, या Weston को प्राथमिकता देने के लिए इसे छोड़ दें। Auto mode में custom install command पहले Weston के लिए चलता है, और Xvfb के लिए फिर से केवल तभी जब Weston अब भी उपलब्ध न हो या शुरू होने में विफल रहे और Xvfb अब भी missing हो, इसलिए दूसरे server के प्रयास को छोड़ने के लिए `displayServer` को उस server पर सेट करें जिसे वह command इंस्टॉल करता है।

Auto-install अब `yum` का समर्थन नहीं करता, जिसका उपयोग v9 बिना `dnf` वाले hosts पर करता था। v10 केवल `apt-get`, `dnf`, `zypper`, `pacman`, `apk` और `xbps-install` का पता लगाता है, इसलिए केवल-`yum` वाले host पर Xvfb ख़ुद इंस्टॉल करें।

v9 में `xvfbAutoInstallCommand` array एक shell के ज़रिए चलती थी, इसलिए `&&` या `VAR=value` जैसे elements काम करते थे। Arrays अब किसी भी विकल्प नाम के तहत बिना shell के चलती हैं, इसलिए shell syntax के लिए string का उपयोग करें।

अन्य बदलाव जो आप देख सकते हैं:

- सभी workers एक display साझा करते हैं। v9 में हर worker का अपना display होता था। Chrome और Edge pages में अब focus नहीं हो सकता, देखें [Window focus](/docs/headless-and-display-servers#window-focus)।
- Xvfb display number निश्चित नहीं है। `:99` मानने के बजाय इसे `DISPLAY` से पढ़ें।
- केवल `WAYLAND_DISPLAY` सेट वाला host अब display वाला माना जाता है। v9 वहाँ workers को Xvfb के तहत चलाता था, क्योंकि `DISPLAY` unset था। v10 कुछ भी शुरू नहीं करता, browser windows को आपके compositor पर खोलता है, और run के लिए `XDG_SESSION_TYPE`, `GDK_BACKEND` और `ELECTRON_OZONE_PLATFORM_HINT` को `wayland` पर सेट करता है। उन्हें पहले की तरह Xvfb के तहत चलाने के लिए, `WAYLAND_DISPLAY` unset करें और `displayServer: 'xvfb'` सेट करें।
- डिफ़ॉल्ट screen 1920x1080 है। v9 `xvfb-run` के डिफ़ॉल्ट का उपयोग करता था, जो Debian और Ubuntu पर 1280x1024 और Fedora, RHEL और Arch पर 640x480 है। आपकी baselines द्वारा उपयोग किया जाने वाला आकार बनाए रखने के लिए, `displayServerWidth` और `displayServerHeight` को उस पर सेट करें।
- Browsers display server द्वारा सेट किए गए `XDG_SESSION_TYPE` से Wayland या X11 चुनते हैं। Weston के तहत, WebdriverIO अपने द्वारा launch किए गए Chrome और Edge में `--ozone-platform=wayland` भी जोड़ता है, क्योंकि 140 से पहले के Chrome और Edge (135 से पहले के Chrome for Testing) `XDG_SESSION_TYPE` को अनदेखा करते हैं। Weston कोई `DISPLAY` प्रदान नहीं करता, इसलिए अगर आपके टेस्ट्स या tools को X11 चाहिए, तो `displayServer: 'xvfb'` सेट करें।
- अगर आपने `XvfbManager` या `@wdio/xvfb` के `xvfb` instance का सीधे उपयोग किया था, तो इसके बजाय `@wdio/display-server` के `DisplayServerManager` का उपयोग करें। जहाँ आप `xvfb.init()` चलाते थे और commands को `xvfb-run` में wrap करते थे, या `ProcessFactory` के ज़रिए processes spawn करते थे, वहाँ एक display शुरू करें और उसका environment उन processes को पास करें जिन्हें इसकी ज़रूरत है। उदाहरण 1280x1024 पर Xvfb का उपयोग करता है, जैसा v9 Debian और Ubuntu पर करता था। जिस host पर केवल `WAYLAND_DISPLAY` सेट है, वहाँ पहले उसे unset करें, वरना `startDaemon()` कुछ भी शुरू नहीं करता:

  ```js
  import { spawn } from 'node:child_process'
  import { once } from 'node:events'
  import { DisplayServerManager } from '@wdio/display-server'

  const manager = new DisplayServerManager({ displayServer: 'xvfb' })
  const daemon = await manager.startDaemon({ width: 1280, height: 1024 })
  // जब display पहले से मौजूद हो, तब भी startDaemon() null लौटाता है
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

`browser.emulate()` मौजूदा top-level browsing context के लिए WebDriver BiDi emulation module चलाता है। v9 एक preload script inject करता था जो `navigator.geolocation.getCurrentPosition`, `navigator.userAgent`, `window.matchMedia` और `navigator.onLine` को patch करती थी। वे scripts हटा दी गई हैं। `browser.emulate('clock', …)` अब भी मौजूदा पेज में और बाद में खोले गए पेजों में fake timers इंस्टॉल करता है।

BiDi scopes के लिए अब reload ज़रूरी नहीं है।

```diff
  await browser.emulate('onLine', false)
- // केवल `navigator.onLine` बदलता था; traffic फिर भी चलता रहता था
+ // browsing context offline है, जिसमें fetch, WebSocket और WebTransport शामिल हैं
```

- `onLine: false` `{ type: 'offline' }` के साथ `emulation.setNetworkConditions` कॉल करता है। `true` और scope को restore करना इसे clear करते हैं। Throughput और latency `browser.throttleNetwork()` पर ही रहते हैं।
- `colorScheme` `prefers-color-scheme` media feature सेट करता है, इसलिए CSS `@media (prefers-color-scheme)` `matchMedia` का अनुसरण करता है।
- `userAgent` browser का user-agent override है, patch की गई `navigator.userAgent` property नहीं।
- `geolocation` browser के geolocation stack का उपयोग करता है। किसी पेज को अब भी `browser.setPermissions({ name: 'geolocation' }, 'granted')` की ज़रूरत हो सकती है। `{ error: 'positionUnavailable' }` coordinates के बजाय वह error रिपोर्ट करता है।
- `colorScheme` और `media` एक media-feature map साझा करते हैं। बाद वाली कॉल पूरे map को बदल देती है, और किसी भी scope को restore करना इसे clear कर देता है।
- `device` device descriptor से user agent, viewport, touch, mobile text layout और viewport meta सेट करता है। यह `screen` या `orientation` नहीं बदलता।

नए scopes हैं `media`, `locale`, `timezone`, `touch`, `orientation`, `screen`, `viewportMeta`, `textLayout`, `scripting`, `scrollbar` और `forcedColors`। जो browser कोई कमांड implement नहीं करता, वह कॉल को अपने error (`unknown command` या `unsupported operation`) के साथ reject करता है। WebdriverIO preload script या CDP पर fall back नहीं करता। अगर `device` बीच में reject होता है, तो पिछला user agent, viewport, touch, text layout और viewport meta वापस लगा दिए जाते हैं।

`wdio session emulate` वही scopes स्वीकार करता है। यह अब तुरंत लागू होने वाले override के लिए reload करने को नहीं कहता। `emulate network` presets और `emulate cpu` नहीं बदले और केवल Chromium के लिए ही रहते हैं। देखें [Emulation](/docs/emulation)।

## अगले कदम

- [migration skill](#migrate-with-a-coding-agent) को प्रोजेक्ट में कॉपी करें और किसी एजेंट से इसे लागू करने को कहें।
- नए v10 टेस्ट लिखने के लिए [WebdriverIO for Coding Agents](/docs/ai-agents)।
- जब suite Linux पर चलता हो, तब [Headless and Display Servers](/docs/headless-and-display-servers)।