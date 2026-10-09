---
id: frameworks
title: फ्रेमवर्क
description: "WDIO टेस्टरनर के लिए टेस्ट फ्रेमवर्क के रूप में Mocha, Jasmine या Cucumber.js को कॉन्फ़िगर करें, या Serenity/JS जैसे थर्ड-पार्टी फ्रेमवर्क को इंटीग्रेट करें।"
---

WebdriverIO Runner में [Mocha](http://mochajs.org/), [Jasmine](http://jasmine.github.io/) और [Cucumber.js](https://cucumber.io/) के लिए बिल्ट-इन सपोर्ट है। आप इसे [Serenity/JS](#using-serenityjs) जैसे थर्ड-पार्टी ओपन-सोर्स फ्रेमवर्क के साथ भी इंटीग्रेट कर सकते हैं।

:::tip WebdriverIO को टेस्ट फ्रेमवर्क के साथ इंटीग्रेट करना
WebdriverIO को किसी टेस्ट फ्रेमवर्क के साथ इंटीग्रेट करने के लिए, आपको NPM पर उपलब्ध एक एडॉप्टर पैकेज की आवश्यकता होती है।
ध्यान दें कि एडॉप्टर पैकेज उसी स्थान पर इंस्टॉल होना चाहिए जहाँ WebdriverIO इंस्टॉल है।
इसलिए, यदि आपने WebdriverIO को ग्लोबली इंस्टॉल किया है, तो एडॉप्टर पैकेज को भी ग्लोबली इंस्टॉल करना सुनिश्चित करें।
:::

WebdriverIO को किसी टेस्ट फ्रेमवर्क के साथ इंटीग्रेट करने से आप अपनी spec फ़ाइलों या step definitions में ग्लोबल `browser` वेरिएबल का उपयोग करके WebDriver इंस्टेंस तक पहुँच सकते हैं।
ध्यान दें कि WebdriverIO Selenium सेशन को शुरू करने और समाप्त करने का काम भी संभालता है, इसलिए आपको इसे
स्वयं करने की आवश्यकता नहीं है।

## Mocha का उपयोग करना

सबसे पहले, NPM से एडॉप्टर पैकेज इंस्टॉल करें:

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

डिफ़ॉल्ट रूप से WebdriverIO एक बिल्ट-इन [assertion library](assertion) प्रदान करता है जिसका उपयोग आप तुरंत शुरू कर सकते हैं:

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

WebdriverIO v10 [Mocha 12](https://mochajs.org/) के साथ आता है और Mocha के `BDD` (डिफ़ॉल्ट), `TDD` और `QUnit` [इंटरफ़ेस](https://mochajs.org/#interfaces) को सपोर्ट करता है।

यदि आप अपने specs को TDD स्टाइल में लिखना चाहते हैं, तो अपने `mochaOpts` कॉन्फ़िग में `ui` प्रॉपर्टी को `tdd` पर सेट करें। अब आपकी टेस्ट फ़ाइलें इस प्रकार लिखी जानी चाहिए:

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

यदि आप अन्य Mocha-विशिष्ट सेटिंग्स परिभाषित करना चाहते हैं, तो आप इसे अपनी कॉन्फ़िगरेशन फ़ाइल में `mochaOpts` की के साथ कर सकते हैं। सभी विकल्पों की सूची [Mocha प्रोजेक्ट वेबसाइट](https://mochajs.org/api/mocha) पर पाई जा सकती है।

__नोट:__ WebdriverIO Mocha में `done` कॉलबैक के डेप्रिकेटेड उपयोग को सपोर्ट नहीं करता है:

```js
it('should test something', (done) => {
    done() // "done is not a function" एरर थ्रो करता है
})
```

### Mocha विकल्प

अपने Mocha एनवायरनमेंट को कॉन्फ़िगर करने के लिए निम्नलिखित विकल्प आपकी `wdio.conf.js` में लागू किए जा सकते हैं। __नोट:__ सभी Mocha विकल्प सपोर्टेड नहीं हैं। `parallel` अभी भी Mocha के अपने worker pool से संबंधित है और यहाँ एरर देगा — WDIO टेस्टरनर पहले से ही specs को capabilities और workers में पैरेलल चलाता है। Mocha 12 का CLI भी yargs से हटकर Node के `util.parseArgs` पर चला गया है; यह केवल सीधे `mocha` इनवोकेशन को प्रभावित करता है, `wdio` के माध्यम से पास किए गए `mochaOpts` को नहीं। आप इन फ्रेमवर्क विकल्पों को आर्गुमेंट्स के रूप में पास कर सकते हैं, उदाहरण के लिए:

```sh
wdio run wdio.conf.ts --mochaOpts.grep "my test" --mochaOpts.bail --no-mochaOpts.checkLeaks
```

यह निम्नलिखित Mocha विकल्पों को पास करेगा:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

निम्नलिखित Mocha विकल्प सपोर्टेड हैं:

#### require

<Option type="string|string[]" default="[]">

`require` विकल्प तब उपयोगी होता है जब आप कुछ बुनियादी कार्यक्षमता जोड़ना या विस्तारित करना चाहते हैं (WebdriverIO फ्रेमवर्क विकल्प)।

</Option>

#### allowUncaught

<Option type="boolean" default="false">

अनकॉट एरर्स को प्रोपेगेट करें।

</Option>

#### bail

<Option type="boolean" default="false">

पहले टेस्ट फेल होने के बाद रुक जाएँ।

</Option>

#### checkLeaks

<Option type="boolean" default="false">

ग्लोबल वेरिएबल लीक्स की जाँच करें।

</Option>

#### delay

<Option type="boolean" default="false">

रूट suite के एक्ज़िक्यूशन में देरी करें।

</Option>

#### failHookAffectedTests

<Option type="boolean" default="true">

किसी फेल होने वाले `before` या `beforeEach` हुक द्वारा स्किप किए गए प्रत्येक टेस्ट को फेलियर के रूप में रिपोर्ट करें। WebdriverIO इसे सक्षम करता है ताकि एक टूटा हुआ सेटअप हुक उसके द्वारा स्किप किए गए हर spec पर दिखाई दे। केवल हुक को रिपोर्ट करने के लिए इसे `false` पर सेट करें।

</Option>

#### fgrep

<Option type="string" default="null">

दिए गए स्ट्रिंग के अनुसार टेस्ट फ़िल्टर करें।

</Option>

#### forbidOnly

<Option type="boolean" default="false">

`only` से चिह्नित टेस्ट suite को फेल कर देते हैं।

</Option>

#### forbidPending

<Option type="boolean" default="false">

पेंडिंग टेस्ट suite को फेल कर देते हैं।

</Option>

#### fullTrace

<Option type="boolean" default="false">

फेलियर पर पूरा stacktrace दिखाएँ।

</Option>

#### global

<Option type="string[]" default="[]">

ग्लोबल स्कोप में अपेक्षित वेरिएबल्स।

</Option>

#### grep

<Option type="RegExp|string" default="null">

दिए गए रेगुलर एक्सप्रेशन के अनुसार टेस्ट फ़िल्टर करें। Mocha 12 इस फ़िल्टर में आधुनिक RegExp फ़्लैग्स (उदाहरण के लिए `s` या `d`) स्वीकार करता है।

</Option>

#### invert

<Option type="boolean" default="false">

टेस्ट फ़िल्टर मैचों को उलट दें।

</Option>

#### retries

<Option type="number" default="0">

फेल हुए टेस्ट को कितनी बार पुनः प्रयास करना है।

</Option>

#### timeout

<Option type="number" default="30000">

टाइमआउट थ्रेशोल्ड मान (ms में)।

</Option>

## Jasmine का उपयोग करना

सबसे पहले, NPM से एडॉप्टर पैकेज इंस्टॉल करें:

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

फिर आप अपने कॉन्फ़िग में `jasmineOpts` प्रॉपर्टी सेट करके अपने Jasmine एनवायरनमेंट को कॉन्फ़िगर कर सकते हैं। सभी विकल्पों की सूची [Jasmine प्रोजेक्ट वेबसाइट](https://jasmine.github.io/api/edge/Configuration.html) पर पाई जा सकती है।

### Jasmine विकल्प

`jasmineOpts` प्रॉपर्टी का उपयोग करके अपने Jasmine एनवायरनमेंट को कॉन्फ़िगर करने के लिए निम्नलिखित विकल्प आपकी `wdio.conf.js` में लागू किए जा सकते हैं। इन कॉन्फ़िगरेशन विकल्पों के बारे में अधिक जानकारी के लिए, [Jasmine docs](https://jasmine.github.io/api/edge/Configuration) देखें। आप इन फ्रेमवर्क विकल्पों को आर्गुमेंट्स के रूप में पास कर सकते हैं, उदाहरण के लिए:

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "my test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

यह निम्नलिखित Jasmine विकल्पों को पास करेगा:

```ts
{
    grep: 'my test',
    failSpecWithNoExpectations: true,
    random: false
}
```

निम्नलिखित Jasmine विकल्प सपोर्टेड हैं:

#### defaultTimeoutInterval

<Option type="number" default="60000">

Jasmine ऑपरेशंस के लिए डिफ़ॉल्ट टाइमआउट इंटरवल।

</Option>

#### helpers

<Option type="string[]" default="[]">

spec_dir के सापेक्ष फ़ाइलपाथ्स (और globs) का ऐरे, जिन्हें jasmine specs से पहले शामिल करना है।

</Option>

#### requires

<Option type="string[]" default="[]">

`requires` विकल्प तब उपयोगी होता है जब आप कुछ बुनियादी कार्यक्षमता जोड़ना या विस्तारित करना चाहते हैं।

</Option>

#### random

<Option type="boolean" default="false">

क्या spec एक्ज़िक्यूशन के क्रम को रैंडम करना है। Jasmine का अपना डिफ़ॉल्ट `true` है, लेकिन WebdriverIO specs को क्रम में चलाता है जब तक कि आप यह विकल्प सेट न करें।

</Option>

#### seed

<Option type="Function" default="null">

रैंडमाइज़ेशन के आधार के रूप में उपयोग किया जाने वाला seed। Null होने पर एक्ज़िक्यूशन की शुरुआत में seed रैंडम रूप से निर्धारित होता है।

</Option>

#### failSpecWithNoExpectations

<Option type="boolean" default="false">

क्या spec को फेल करना है यदि उसमें कोई expectation नहीं चला। डिफ़ॉल्ट रूप से जिस spec में कोई expectation नहीं चला उसे पास के रूप में रिपोर्ट किया जाता है। इसे true पर सेट करने से ऐसे spec को फेलियर के रूप में रिपोर्ट किया जाएगा।

</Option>

#### oneFailurePerSpec

<Option type="boolean" default="false">

किसी spec को उसके पहले फेल हुए expectation पर रोक दें। एक फेल हुआ sync matcher spec को तुरंत रोक देता है, और एक awaited async matcher उसे तब रोकता है जब उसका promise settle हो जाता है। अन्य specs चलते रहते हैं।

</Option>

#### specFilter

<Option type="Function" default="(spec) => true">

specs को फ़िल्टर करने के लिए उपयोग किया जाने वाला फ़ंक्शन।

</Option>

#### grep

<Option type="string|Regexp" default="null">

केवल इस स्ट्रिंग या regexp से मेल खाने वाले टेस्ट चलाएँ। (केवल तभी लागू जब कोई कस्टम `specFilter` फ़ंक्शन सेट न हो)

</Option>

#### invertGrep

<Option type="boolean" default="false">

यदि true है तो यह मेल खाने वाले टेस्ट को उलट देता है और केवल वही टेस्ट चलाता है जो `grep` में उपयोग किए गए एक्सप्रेशन से मेल नहीं खाते। (केवल तभी लागू जब कोई कस्टम `specFilter` फ़ंक्शन सेट न हो)

</Option>

#### stopOnSpecFailure

<Option type="boolean" default="false">

spec फ़ाइल को उसके पहले फेल हुए spec (`it`) पर रोक दें: फ़ाइल के अन्य specs नहीं चलते, अन्य `describe` ब्लॉक्स में भी नहीं। अन्य spec फ़ाइलें अपने स्वयं के workers में चलती हैं और जारी रहती हैं।

</Option>

#### cleanStack

<Option type="boolean" default="true">

फेलियर के stack traces से `node_modules` पैकेजों की लाइनें हटा दें।

</Option>

#### expectationResultHandler

<Option type="Function" default="null">

प्रत्येक expectation के लिए `(passed, assertion)` के साथ कॉल किया जाता है, उदाहरण के लिए जब कोई expectation फेल हो तो स्क्रीनशॉट लेने के लिए। यदि फ़ंक्शन किसी पास हुए expectation के लिए एरर थ्रो करता है, तो वह expectation उस एरर के साथ फेल हो जाता है।

</Option>

### Assertions

Jasmine के साथ, ग्लोबल `expect` Jasmine के matchers और [WebdriverIO matchers](/docs/api/expect-webdriverio) को जोड़ता है:

- Jasmine के matchers (`toBe`, `toEqual`, `toHaveBeenCalled`, …) और वे matchers जिन्हें आप `jasmine.addMatchers` के साथ जोड़ते हैं, सिंक्रोनस होते हैं। वे `undefined` लौटाते हैं, इसलिए आपको `await` की आवश्यकता नहीं है।
- WebdriverIO matchers, Jasmine के async matchers (`toBeResolved`, `toBeRejectedWith`, …) और वे matchers जिन्हें आप `jasmine.addAsyncMatchers` के साथ जोड़ते हैं, एक promise लौटाते हैं। उन्हें हमेशा `await` करें।

दोनों प्रकारों के लिए `expect()` का उपयोग करें: यह आपके लिए प्रत्येक matcher को Jasmine के `expect` या `expectAsync` पर भेजता है। `await expectAsync($('#logo')).toBeDisplayed()` भी काम करता है। TypeScript के लिए, `types` में `@wdio/jasmine-framework` `expectAsync()` को भी WebdriverIO matchers देता है।

```js
it('checks the page', async () => {
    expect([1, 2]).toHaveSize(2)                                   // Jasmine, सिंक
    await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO, एसिंक
    await expect(loadData()).toBeResolved()                        // Jasmine async matcher
})
```

`toHaveSize` दोनों लाइब्रेरीज़ में मौजूद है। WebdriverIO matcher WebdriverIO मानों पर चलता है: एक element, एक element array या `Element[]` (उदाहरण के लिए `$$().filter()` का परिणाम), एक multi-remote element, एक browser, एक browsing context, एक mock, `some()` wrapper, या एक promise जैसे chainable `$()`। Jasmine का matcher हर अन्य मान पर चलता है।

दोनों लाइब्रेरीज़ के asymmetric matchers Jasmine में और WebdriverIO matchers में काम करते हैं: `jasmine.any()`, `jasmine.objectContaining()`, `jasmine.stringMatching()`, … और `expect.any()`, `expect.stringContaining()`, `expect.oneOf()`, `expect.multiRemote()`, `expect.not.stringContaining()`, …। `some()` का उपयोग करने के लिए, इसे import करें:

```js
import { some } from 'expect-webdriverio/api'

await expect(some($$('li'))).toHaveAttribute('data-state', 'on')
```

`expect` के Jest भाग Jasmine के साथ उपलब्ध नहीं हैं: Jest-only matchers जैसे `toStrictEqual` या `toHaveLength`, और `expect.soft()`। कस्टम matcher जोड़ने के लिए, किसी spec फ़ाइल या `before` हुक में `expect.extend()` का उपयोग करें ([Custom Matchers](/docs/custommatchers) देखें), या sync matcher के लिए `jasmine.addMatchers` और async matcher के लिए `jasmine.addAsyncMatchers` का उपयोग करें।

TypeScript के लिए, `types` में `jasmine` जोड़ें, [TypeScript Setup](/docs/typescript) देखें।

## Cucumber का उपयोग करना

सबसे पहले, NPM से एडॉप्टर पैकेज इंस्टॉल करें:

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

यदि आप Cucumber का उपयोग करना चाहते हैं, तो [कॉन्फ़िग फ़ाइल](configurationfile) में `framework: 'cucumber'` जोड़कर `framework` प्रॉपर्टी को `cucumber` पर सेट करें।

Cucumber के लिए विकल्प कॉन्फ़िग फ़ाइल में `cucumberOpts` के साथ दिए जा सकते हैं। विकल्पों की पूरी सूची [यहाँ](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options) देखें। एडॉप्टर Cucumber 13 का उपयोग करता है। `tagExpression` हटा दिया गया है; `tags` के साथ फ़िल्टर करें। [v10 माइग्रेशन गाइड](v10-migration#cucumber) देखें।

Cucumber के साथ जल्दी से शुरुआत करने के लिए, हमारे [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate) प्रोजेक्ट पर एक नज़र डालें जो शुरू करने के लिए आवश्यक सभी step definitions के साथ आता है, और आप तुरंत feature फ़ाइलें लिखना शुरू कर देंगे।

### Cucumber विकल्प

`cucumberOpts` प्रॉपर्टी का उपयोग करके अपने Cucumber एनवायरनमेंट को कॉन्फ़िगर करने के लिए निम्नलिखित विकल्प आपकी `wdio.conf.js` में लागू किए जा सकते हैं:

:::tip कमांड लाइन के माध्यम से विकल्प समायोजित करना
`cucumberOpts`, जैसे टेस्ट फ़िल्टर करने के लिए कस्टम `tags`, कमांड लाइन के माध्यम से निर्दिष्ट किए जा सकते हैं। यह `cucumberOpts.{optionName}="value"` फ़ॉर्मेट का उपयोग करके किया जाता है।

उदाहरण के लिए, यदि आप केवल उन टेस्ट को चलाना चाहते हैं जो `@smoke` से टैग किए गए हैं, तो आप निम्नलिखित कमांड का उपयोग कर सकते हैं:

```sh
# जब आप केवल वे टेस्ट चलाना चाहते हैं जिनमें "@smoke" टैग है
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

यह कमांड `cucumberOpts` में `tags` विकल्प को `@smoke` पर सेट करता है, जिससे यह सुनिश्चित होता है कि केवल इस टैग वाले टेस्ट ही एक्ज़िक्यूट हों।

:::

#### backtrace

<Option type="Boolean" default="true">

एरर्स के लिए पूरा backtrace दिखाएँ।

</Option>

#### requireModule

<Option type="string[]" default="[]">

किसी भी support फ़ाइल को require करने से पहले मॉड्यूल्स को require करें।

</Option>
उदाहरण:

```js
cucumberOpts: {
    requireModule: ['@babel/register']
    // या
    requireModule: [
        [
            '@babel/register',
            {
                rootMode: 'upward',
                ignore: ['node_modules']
            }
        ]
    ]
 }
 ```

#### failFast

<Option type="boolean" default="false">

पहले फेलियर पर रन को रोक दें।

</Option>

#### name

<Option type="RegExp[]" default="[]">

केवल उन scenarios को एक्ज़िक्यूट करें जिनका नाम एक्सप्रेशन से मेल खाता है (दोहराने योग्य)।

</Option>

#### require

<Option type="string[]" default="[]">

features को एक्ज़िक्यूट करने से पहले आपकी step definitions वाली फ़ाइलों को require करें। आप अपनी step definitions के लिए एक glob भी निर्दिष्ट कर सकते हैं।

</Option>
उदाहरण:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import

<Option type="String[]" default="[]">

ESM के लिए, आपके support कोड के पाथ।

</Option>
उदाहरण:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict

<Option type="boolean" default="false">

यदि कोई undefined या pending steps हैं तो फेल करें।

</Option>

#### tags

<Option type="String" default="">

केवल उन features या scenarios को एक्ज़िक्यूट करें जिनके टैग एक्सप्रेशन से मेल खाते हैं।
अधिक जानकारी के लिए कृपया [Cucumber दस्तावेज़ीकरण](https://docs.cucumber.io/cucumber/api/#tag-expressions) देखें।

</Option>

#### timeout

<Option type="Number" default="30000">

step definitions के लिए मिलीसेकंड में टाइमआउट।

</Option>

#### retry

<Option type="Number" default="0">

फेल होने वाले टेस्ट केस को कितनी बार पुनः प्रयास करना है, यह निर्दिष्ट करें।

</Option>

#### retryTagFilter

<Option type="RegExp">

केवल उन features या scenarios को पुनः प्रयास करता है जिनके टैग एक्सप्रेशन से मेल खाते हैं (दोहराने योग्य)। इस विकल्प के लिए '--retry' निर्दिष्ट करना आवश्यक है।

</Option>

#### language

<Option type="String" default="en">

आपकी feature फ़ाइलों के लिए डिफ़ॉल्ट भाषा

</Option>

#### order

<Option type="String" default="defined">

टेस्ट को defined / random क्रम में चलाएँ

</Option>

#### format

<Option type="string[]">

उपयोग किए जाने वाले formatter का नाम और आउटपुट फ़ाइल पाथ।
WebdriverIO मुख्य रूप से केवल उन [Formatters](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md) को सपोर्ट करता है जो आउटपुट को फ़ाइल में लिखते हैं।

</Option>

#### formatOptions

<Option type="object">

formatters को दिए जाने वाले विकल्प

</Option>

#### tagsInTitle

<Option type="Boolean" default="false">

feature या scenario नाम में cucumber टैग जोड़ें

</Option>
***कृपया ध्यान दें कि यह एक @wdio/cucumber-framework विशिष्ट विकल्प है और cucumber-js स्वयं इसे नहीं पहचानता है***<br/>

#### ignoreUndefinedDefinitions

<Option type="Boolean" default="false">

undefined definitions को चेतावनियों के रूप में मानें।

</Option>
***कृपया ध्यान दें कि यह एक @wdio/cucumber-framework विशिष्ट विकल्प है और cucumber-js स्वयं इसे नहीं पहचानता है***<br/>

#### failAmbiguousDefinitions

<Option type="Boolean" default="false">

ambiguous definitions को एरर्स के रूप में मानें।

</Option>
***कृपया ध्यान दें कि यह एक @wdio/cucumber-framework विशिष्ट विकल्प है और cucumber-js स्वयं इसे नहीं पहचानता है***<br/>

#### profile

<Option type="string[]" default="[]">

उपयोग की जाने वाली profile निर्दिष्ट करें।

</Option>
***कृपया ध्यान दें कि profiles के भीतर केवल विशिष्ट मान (worldParameters, name, retryTagFilter) सपोर्टेड हैं, क्योंकि `cucumberOpts` को प्राथमिकता दी जाती है। इसके अतिरिक्त, profile का उपयोग करते समय, सुनिश्चित करें कि उल्लिखित मान `cucumberOpts` के भीतर घोषित न हों।***

### Cucumber में टेस्ट स्किप करना

ध्यान दें कि यदि आप `cucumberOpts` में उपलब्ध सामान्य cucumber टेस्ट फ़िल्टरिंग क्षमताओं का उपयोग करके किसी टेस्ट को स्किप करना चाहते हैं, तो आप इसे capabilities में कॉन्फ़िगर किए गए सभी browsers और devices के लिए करेंगे। केवल विशिष्ट capabilities संयोजनों के लिए scenarios को स्किप करने में सक्षम होने के लिए, और अनावश्यक होने पर सेशन शुरू किए बिना, webdriverio cucumber के लिए निम्नलिखित विशिष्ट टैग सिंटैक्स प्रदान करता है:

`@skip([condition])`

जहाँ condition capabilities प्रॉपर्टीज़ और उनके मानों का एक वैकल्पिक संयोजन है, जो **सभी** मेल खाने पर टैग किए गए scenario या feature को स्किप कर देगा। बेशक आप कई अलग-अलग शर्तों के तहत टेस्ट को स्किप करने के लिए scenarios और features में कई टैग जोड़ सकते हैं।

आप `tags` बदले बिना टेस्ट को स्किप करने के लिए '@skip' एनोटेशन का भी उपयोग कर सकते हैं। इस मामले में स्किप किए गए टेस्ट टेस्ट रिपोर्ट में दिखाई देंगे।

यहाँ इस सिंटैक्स के कुछ उदाहरण हैं:
- `@skip` या `@skip()`: टैग किए गए आइटम को हमेशा स्किप करेगा
- `@skip(browserName="chrome")`: टेस्ट chrome browsers पर एक्ज़िक्यूट नहीं होगा।
- `@skip(browserName="firefox";platformName="linux")`: linux पर firefox एक्ज़िक्यूशन में टेस्ट को स्किप करेगा।
- `@skip(browserName=["chrome","firefox"])`: टैग किए गए आइटम chrome और firefox दोनों browsers के लिए स्किप किए जाएँगे।
- `@skip(browserName=/i.*explorer/)`: regexp से मेल खाने वाले browsers वाली capabilities स्किप की जाएँगी (जैसे `iexplorer`, `internet explorer`, `internet-explorer`, ...)।

### Step Definition Helper इम्पोर्ट करना

`Given`, `When` या `Then` जैसे step definition helper या hooks का उपयोग करने के लिए, आपको उन्हें `@cucumber/cucumber` से import करना होगा, उदाहरण के लिए इस तरह:

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

अब, यदि आप पहले से ही WebdriverIO से असंबंधित अन्य प्रकार के टेस्ट के लिए Cucumber का उपयोग करते हैं, जिसके लिए आप एक विशिष्ट वर्ज़न का उपयोग करते हैं, तो आपको अपने e2e टेस्ट में इन helpers को WebdriverIO Cucumber पैकेज से import करना होगा, उदाहरण के लिए:

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

यह सुनिश्चित करता है कि आप WebdriverIO फ्रेमवर्क के भीतर सही helpers का उपयोग करें और आपको अन्य प्रकार के टेस्टिंग के लिए एक स्वतंत्र Cucumber वर्ज़न का उपयोग करने की अनुमति देता है।

### रिपोर्ट प्रकाशित करना

Cucumber आपकी टेस्ट रन रिपोर्ट्स को `https://reports.cucumber.io/` पर प्रकाशित करने की सुविधा प्रदान करता है, जिसे `cucumberOpts` में `publish` फ़्लैग सेट करके या `CUCUMBER_PUBLISH_TOKEN` एनवायरनमेंट वेरिएबल को कॉन्फ़िगर करके नियंत्रित किया जा सकता है। हालाँकि, जब आप टेस्ट एक्ज़िक्यूशन के लिए `WebdriverIO` का उपयोग करते हैं, तो इस दृष्टिकोण में एक सीमा है। यह प्रत्येक feature फ़ाइल के लिए रिपोर्ट्स को अलग-अलग अपडेट करता है, जिससे एक समेकित रिपोर्ट देखना कठिन हो जाता है।

इस सीमा को दूर करने के लिए, हमने `@wdio/cucumber-framework` के भीतर `publishCucumberReport` नामक एक promise-आधारित मेथड पेश किया है। इस मेथड को `onComplete` हुक में कॉल किया जाना चाहिए, जो इसे इनवोक करने के लिए सबसे उपयुक्त स्थान है। `publishCucumberReport` को उस रिपोर्ट डायरेक्टरी के इनपुट की आवश्यकता होती है जहाँ cucumber message रिपोर्ट्स संग्रहीत होती हैं।

आप अपने `cucumberOpts` में `format` विकल्प को कॉन्फ़िगर करके `cucumber message` रिपोर्ट्स जनरेट कर सकते हैं। रिपोर्ट्स को ओवरराइट होने से रोकने और यह सुनिश्चित करने के लिए कि प्रत्येक टेस्ट रन सटीक रूप से रिकॉर्ड हो, `cucumber message` फ़ॉर्मेट विकल्प के भीतर एक डायनामिक फ़ाइल नाम प्रदान करने की अत्यधिक अनुशंसा की जाती है।

इस फ़ंक्शन का उपयोग करने से पहले, निम्नलिखित एनवायरनमेंट वेरिएबल्स सेट करना सुनिश्चित करें:
- CUCUMBER_PUBLISH_REPORT_URL: वह URL जहाँ आप Cucumber रिपोर्ट प्रकाशित करना चाहते हैं। यदि प्रदान नहीं किया गया, तो डिफ़ॉल्ट URL 'https://messages.cucumber.io/api/reports' का उपयोग किया जाएगा।
- CUCUMBER_PUBLISH_REPORT_TOKEN: रिपोर्ट प्रकाशित करने के लिए आवश्यक ऑथराइज़ेशन टोकन। यदि यह टोकन सेट नहीं है, तो फ़ंक्शन रिपोर्ट प्रकाशित किए बिना बाहर निकल जाएगा।

यहाँ कार्यान्वयन के लिए आवश्यक कॉन्फ़िगरेशन और कोड सैंपल्स का एक उदाहरण है:

```javascript
import { v4 as uuidv4 } from 'uuid'
import { publishCucumberReport } from '@wdio/cucumber-framework';

export const config = {
    // ... अन्य कॉन्फ़िगरेशन विकल्प
    cucumberOpts: {
        // ... Cucumber विकल्प कॉन्फ़िगरेशन
        format: [
            ['message', `./reports/${uuidv4()}.ndjson`],
            ['json', './reports/test-report.json']
        ]
    },
    async onComplete() {
        await publishCucumberReport('./reports');
    }
}
```

कृपया ध्यान दें कि `./reports/` वह डायरेक्टरी है जहाँ `cucumber message` रिपोर्ट्स संग्रहीत की जाएँगी।

## Serenity/JS का उपयोग करना

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) एक ओपन-सोर्स फ्रेमवर्क है जिसे जटिल सॉफ़्टवेयर सिस्टम्स की acceptance और regression टेस्टिंग को तेज़, अधिक सहयोगात्मक और स्केल करने में आसान बनाने के लिए डिज़ाइन किया गया है।

WebdriverIO टेस्ट suites के लिए, Serenity/JS प्रदान करता है:
- [उन्नत रिपोर्टिंग](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) - आप Serenity/JS का उपयोग
  किसी भी बिल्ट-इन WebdriverIO फ्रेमवर्क के drop-in replacement के रूप में करके अपने प्रोजेक्ट की विस्तृत टेस्ट एक्ज़िक्यूशन रिपोर्ट्स और living documentation तैयार कर सकते हैं।
- [Screenplay Pattern APIs](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - आपके टेस्ट कोड को प्रोजेक्ट्स और टीमों में पोर्टेबल और पुन: उपयोग योग्य बनाने के लिए,
  Serenity/JS आपको नेटिव WebdriverIO APIs के ऊपर एक वैकल्पिक [abstraction layer](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io) देता है।
- [इंटीग्रेशन लाइब्रेरीज़](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) - Screenplay Pattern का पालन करने वाले टेस्ट suites के लिए,
  Serenity/JS वैकल्पिक इंटीग्रेशन लाइब्रेरीज़ भी प्रदान करता है जो आपको [API टेस्ट](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io) लिखने,
  [लोकल सर्वर प्रबंधित करने](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io), [assertions करने](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io), और बहुत कुछ करने में मदद करती हैं!

![Serenity BDD Report Example](/img/serenity-bdd-reporter.png)

### Serenity/JS इंस्टॉल करना

किसी [मौजूदा WebdriverIO प्रोजेक्ट](https://webdriver.io/docs/gettingstarted) में Serenity/JS जोड़ने के लिए, NPM से निम्नलिखित Serenity/JS मॉड्यूल्स इंस्टॉल करें:

```sh npm2yarn
npm install @serenity-js/{core,web,webdriverio,assertions,console-reporter,serenity-bdd} --save-dev
```

Serenity/JS मॉड्यूल्स के बारे में और जानें:
- [`@serenity-js/core`](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/web`](https://serenity-js.org/api/web/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/webdriverio`](https://serenity-js.org/api/webdriverio/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/assertions`](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/console-reporter`](https://serenity-js.org/api/console-reporter/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)

### Serenity/JS कॉन्फ़िगर करना

Serenity/JS के साथ इंटीग्रेशन सक्षम करने के लिए, WebdriverIO को इस प्रकार कॉन्फ़िगर करें:

<Tabs>
<TabItem value="wdio-conf-typescript" label="TypeScript" default>

```typescript title="wdio.conf.ts"
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

export const config: WebdriverIOConfig = {

    // WebdriverIO को Serenity/JS फ्रेमवर्क का उपयोग करने के लिए कहें
    framework: '@serenity-js/webdriverio',

    // Serenity/JS कॉन्फ़िगरेशन
    serenity: {
        // Serenity/JS को अपने टेस्ट रनर के लिए उपयुक्त एडॉप्टर का उपयोग करने के लिए कॉन्फ़िगर करें
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Serenity/JS रिपोर्टिंग सेवाएँ, यानी "stage crew", रजिस्टर करें
        crew: [
            // वैकल्पिक, टेस्ट एक्ज़िक्यूशन परिणामों को standard output पर प्रिंट करें
            '@serenity-js/console-reporter',

            // वैकल्पिक, Serenity BDD रिपोर्ट्स और living documentation (HTML) तैयार करें
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // वैकल्पिक, इंटरैक्शन फेल होने पर स्वचालित रूप से स्क्रीनशॉट कैप्चर करें
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // अपने Cucumber रनर को कॉन्फ़िगर करें
    cucumberOpts: {
        // नीचे Cucumber कॉन्फ़िगरेशन विकल्प देखें
    },

    // ... या Jasmine रनर
    jasmineOpts: {
        // नीचे Jasmine कॉन्फ़िगरेशन विकल्प देखें
    },

    // ... या Mocha रनर
    mochaOpts: {
        // नीचे Mocha कॉन्फ़िगरेशन विकल्प देखें
    },

    runner: 'local',

    // कोई अन्य WebdriverIO कॉन्फ़िगरेशन
};
```

</TabItem>
<TabItem value="wdio-conf-javascript" label="JavaScript">

```typescript title="wdio.conf.js"
export const config = {

    // WebdriverIO को Serenity/JS फ्रेमवर्क का उपयोग करने के लिए कहें
    framework: '@serenity-js/webdriverio',

    // Serenity/JS कॉन्फ़िगरेशन
    serenity: {
        // Serenity/JS को अपने टेस्ट रनर के लिए उपयुक्त एडॉप्टर का उपयोग करने के लिए कॉन्फ़िगर करें
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Serenity/JS रिपोर्टिंग सेवाएँ, यानी "stage crew", रजिस्टर करें
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // अपने Cucumber रनर को कॉन्फ़िगर करें
    cucumberOpts: {
        // नीचे Cucumber कॉन्फ़िगरेशन विकल्प देखें
    },

    // ... या Jasmine रनर
    jasmineOpts: {
        // नीचे Jasmine कॉन्फ़िगरेशन विकल्प देखें
    },

    // ... या Mocha रनर
    mochaOpts: {
        // नीचे Mocha कॉन्फ़िगरेशन विकल्प देखें
    },

    runner: 'local',

    // कोई अन्य WebdriverIO कॉन्फ़िगरेशन
};
```

</TabItem>
</Tabs>

इनके बारे में और जानें:
- [Serenity/JS Cucumber कॉन्फ़िगरेशन विकल्प](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Serenity/JS Jasmine कॉन्फ़िगरेशन विकल्प](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Serenity/JS Mocha कॉन्फ़िगरेशन विकल्प](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [WebdriverIO कॉन्फ़िगरेशन फ़ाइल](configurationfile)

### Serenity BDD रिपोर्ट्स और living documentation तैयार करना

[Serenity BDD रिपोर्ट्स और living documentation](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports) [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli) द्वारा जनरेट किए जाते हैं,
जो एक Java प्रोग्राम है जिसे [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io) मॉड्यूल द्वारा डाउनलोड और प्रबंधित किया जाता है।

Serenity BDD रिपोर्ट्स तैयार करने के लिए, आपके टेस्ट suite को:
- `serenity-bdd update` कॉल करके Serenity BDD CLI डाउनलोड करना होगा, जो CLI `jar` को लोकली कैश करता है
- [कॉन्फ़िगरेशन निर्देशों](#configuring-serenityjs) के अनुसार [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) को रजिस्टर करके intermediate Serenity BDD `.json` रिपोर्ट्स तैयार करनी होंगी
- जब आप रिपोर्ट तैयार करना चाहें, तब `serenity-bdd run` कॉल करके Serenity BDD CLI को इनवोक करना होगा

सभी [Serenity/JS Project Templates](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio) द्वारा उपयोग किया जाने वाला पैटर्न
इनके उपयोग पर निर्भर करता है:
- Serenity BDD CLI डाउनलोड करने के लिए एक [`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order) NPM स्क्रिप्ट
- [`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe) ताकि रिपोर्टिंग प्रक्रिया तब भी चले जब टेस्ट suite स्वयं फेल हो गया हो (जो ठीक वही समय है जब आपको टेस्ट रिपोर्ट्स की सबसे अधिक आवश्यकता होती है...)।
- [`rimraf`](https://www.npmjs.com/package/rimraf) पिछले रन से बची हुई किसी भी टेस्ट रिपोर्ट को हटाने के एक सुविधाजनक तरीके के रूप में

```json title="package.json"
{
  "scripts": {
    "postinstall": "serenity-bdd update",
    "clean": "rimraf target",
    "test": "failsafe clean test:execute test:report",
    "test:execute": "wdio wdio.conf.ts",
    "test:report": "serenity-bdd run"
  }
}
```

`SerenityBDDReporter` के बारे में और जानने के लिए, कृपया देखें:
- [`@serenity-js/serenity-bdd` दस्तावेज़ीकरण](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io) में इंस्टॉलेशन निर्देश,
- [`SerenityBDDReporter` API docs](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) में कॉन्फ़िगरेशन उदाहरण,
- [GitHub पर Serenity/JS उदाहरण](https://github.com/serenity-js/serenity-js/tree/main/examples)।

### Serenity/JS Screenplay Pattern APIs का उपयोग करना

[Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) उच्च-गुणवत्ता वाले स्वचालित acceptance टेस्ट लिखने का एक नवीन, उपयोगकर्ता-केंद्रित दृष्टिकोण है। यह आपको abstraction की परतों के प्रभावी उपयोग की ओर ले जाता है,
आपके टेस्ट scenarios को आपके डोमेन की व्यावसायिक शब्दावली को दर्शाने में मदद करता है, और आपकी टीम में अच्छी टेस्टिंग और सॉफ़्टवेयर इंजीनियरिंग आदतों को प्रोत्साहित करता है।

डिफ़ॉल्ट रूप से, जब आप `@serenity-js/webdriverio` को अपने WebdriverIO `framework` के रूप में रजिस्टर करते हैं,
तो Serenity/JS [actors](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io) का एक डिफ़ॉल्ट [cast](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io) कॉन्फ़िगर करता है,
जहाँ हर actor:
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

कर सकता है।

यह आपको Screenplay Pattern का पालन करने वाले टेस्ट scenarios को किसी मौजूदा टेस्ट suite में भी शामिल करने के साथ शुरुआत करने में मदद करने के लिए पर्याप्त होना चाहिए, उदाहरण के लिए:

```typescript title="specs/example.spec.ts"
import { actorCalled } from '@serenity-js/core'
import { Navigate, Page } from '@serenity-js/web'
import { Ensure, equals } from '@serenity-js/assertions'

describe('My awesome website', () => {
    it('can have test scenarios that follow the Screenplay Pattern', async () => {
        await actorCalled('Alice').attemptsTo(
            Navigate.to(`https://webdriver.io`),
            Ensure.that(
                Page.current().title(),
                equals(`WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO`)
            ),
        )
    })

    it('can have non-Screenplay scenarios too', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser)
            .toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Screenplay Pattern के बारे में और जानने के लिए, देखें:
- [The Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Serenity/JS के साथ वेब टेस्टिंग](https://serenity-js.org/handbook/web-testing/?pk_campaign=wdio8&pk_source=webdriver.io)
- ["BDD in Action, Second Edition"](https://www.manning.com/books/bdd-in-action-second-edition)