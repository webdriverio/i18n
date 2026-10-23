---
id: frameworks
title: फ्रेमवर्क
description: "WDIO टेस्टरनर के लिए टेस्ट फ्रेमवर्क के रूप में Mocha, Jasmine या Cucumber.js को कॉन्फ़िगर करें, या Serenity/JS जैसे थर्ड-पार्टी फ्रेमवर्क को इंटीग्रेट करें।"
---

WebdriverIO Runner में [Mocha](http://mochajs.org/), [Jasmine](http://jasmine.github.io/), और [Cucumber.js](https://cucumber.io/) के लिए बिल्ट-इन सपोर्ट है। आप इसे [Serenity/JS](#using-serenityjs) जैसे थर्ड-पार्टी ओपन-सोर्स फ्रेमवर्क के साथ भी इंटीग्रेट कर सकते हैं।

:::tip WebdriverIO को टेस्ट फ्रेमवर्क के साथ इंटीग्रेट करना
WebdriverIO को किसी टेस्ट फ्रेमवर्क के साथ इंटीग्रेट करने के लिए, आपको NPM पर उपलब्ध एक एडाप्टर पैकेज की आवश्यकता होती है।
ध्यान दें कि एडाप्टर पैकेज उसी स्थान पर इंस्टॉल होना चाहिए जहाँ WebdriverIO इंस्टॉल है।
इसलिए, यदि आपने WebdriverIO को ग्लोबली इंस्टॉल किया है, तो एडाप्टर पैकेज को भी ग्लोबली इंस्टॉल करना सुनिश्चित करें।
:::

WebdriverIO को किसी टेस्ट फ्रेमवर्क के साथ इंटीग्रेट करने से आप अपनी स्पेक फ़ाइलों या स्टेप डेफ़िनिशन में ग्लोबल `browser` वेरिएबल
का उपयोग करके WebDriver इंस्टेंस तक पहुँच सकते हैं।
ध्यान दें कि WebdriverIO Selenium सेशन को इंस्टैंशिएट करने और समाप्त करने का भी ध्यान रखेगा, इसलिए आपको इसे
स्वयं करने की आवश्यकता नहीं है।

## Mocha का उपयोग

सबसे पहले, NPM से एडाप्टर पैकेज इंस्टॉल करें:

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

डिफ़ॉल्ट रूप से WebdriverIO एक बिल्ट-इन [असर्शन लाइब्रेरी](assertion) प्रदान करता है जिसका उपयोग आप तुरंत शुरू कर सकते हैं:

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

WebdriverIO v10 [Mocha 12](https://mochajs.org/) के साथ आता है और Mocha के `BDD` (डिफ़ॉल्ट), `TDD`, और `QUnit` [इंटरफ़ेस](https://mochajs.org/#interfaces) को सपोर्ट करता है।

यदि आप अपने स्पेक्स TDD स्टाइल में लिखना चाहते हैं, तो अपने `mochaOpts` कॉन्फ़िग में `ui` प्रॉपर्टी को `tdd` पर सेट करें। अब आपकी टेस्ट फ़ाइलें इस तरह लिखी जानी चाहिए:

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

यदि आप अन्य Mocha-विशिष्ट सेटिंग्स परिभाषित करना चाहते हैं, तो आप इसे अपनी कॉन्फ़िगरेशन फ़ाइल में `mochaOpts` की के साथ कर सकते हैं। सभी विकल्पों की सूची [Mocha प्रोजेक्ट वेबसाइट](https://mochajs.org/api/mocha) पर मिल सकती है।

__नोट:__ WebdriverIO Mocha में `done` कॉलबैक के डेप्रिकेटेड उपयोग को सपोर्ट नहीं करता है:

```js
it('should test something', (done) => {
    done() // "done is not a function" त्रुटि देता है
})
```

### Mocha विकल्प

आपके Mocha एनवायरनमेंट को कॉन्फ़िगर करने के लिए निम्नलिखित विकल्प आपकी `wdio.conf.js` में लागू किए जा सकते हैं। __नोट:__ सभी Mocha विकल्प सपोर्टेड नहीं हैं। `parallel` अभी भी Mocha के अपने वर्कर पूल से संबंधित है और यहाँ त्रुटि देगा — WDIO टेस्टरनर पहले से ही स्पेक्स को कैपेबिलिटीज़ और वर्कर्स में समानांतर रूप से चलाता है। एक स्पेक फ़ाइल के टेस्ट एक ही समय पर चलाने के लिए, [`parallelMode`](#parallelmode) का उपयोग करें। Mocha 12 का CLI भी yargs से हटकर Node के `util.parseArgs` पर चला गया है; यह केवल सीधे `mocha` इनवोकेशन को प्रभावित करता है, `wdio` के माध्यम से पास किए गए `mochaOpts` को नहीं। आप इन फ्रेमवर्क विकल्पों को आर्गुमेंट के रूप में पास कर सकते हैं, जैसे:

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

अनकॉट त्रुटियों को आगे प्रसारित करें।

</Option>

#### bail

<Option type="boolean" default="false">

पहली टेस्ट विफलता के बाद रुक जाएँ।

</Option>

#### checkLeaks

<Option type="boolean" default="false">

ग्लोबल वेरिएबल लीक की जाँच करें।

</Option>

#### delay

<Option type="boolean" default="false">

रूट सूट के निष्पादन में देरी करें।

</Option>

#### failHookAffectedTests

<Option type="boolean" default="true">

किसी विफल `before` या `beforeEach` हुक द्वारा स्किप किए गए प्रत्येक टेस्ट को विफलता के रूप में रिपोर्ट करें। WebdriverIO इसे सक्षम करता है ताकि एक टूटा हुआ सेटअप हुक उसके द्वारा स्किप किए गए हर स्पेक पर दिखाई दे। केवल हुक को रिपोर्ट करने के लिए इसे `false` पर सेट करें।

</Option>

#### fgrep

<Option type="string" default="null">

दिए गए स्ट्रिंग के आधार पर टेस्ट फ़िल्टर।

</Option>

#### forbidOnly

<Option type="boolean" default="false">

`only` चिह्नित टेस्ट सूट को विफल कर देते हैं।

</Option>

#### forbidPending

<Option type="boolean" default="false">

पेंडिंग टेस्ट सूट को विफल कर देते हैं।

</Option>

#### fullTrace

<Option type="boolean" default="false">

विफलता पर पूर्ण स्टैकट्रेस।

</Option>

#### global

<Option type="string[]" default="[]">

ग्लोबल स्कोप में अपेक्षित वेरिएबल।

</Option>

#### grep

<Option type="RegExp|string" default="null">

दिए गए रेगुलर एक्सप्रेशन के आधार पर टेस्ट फ़िल्टर। Mocha 12 इस फ़िल्टर में आधुनिक RegExp फ़्लैग (उदाहरण के लिए `s` या `d`) स्वीकार करता है।

</Option>

#### invert

<Option type="boolean" default="false">

टेस्ट फ़िल्टर मैचों को उलट दें।

</Option>

#### maxParallelContexts

<Option type="number" default="os.cpus().length">

[`parallelMode`](#parallelmode) सेट होने पर एक ही समय पर चलने वाले टेस्टों की संख्या। [एक स्पेक फ़ाइल में समानांतर टेस्ट](./ParallelTests.md#options) देखें।

</Option>

#### parallelMode

<Option type="'contexts' | 'userContexts'" default="undefined">

एक स्पेक फ़ाइल के टेस्टों को एक ही समय पर चलाएँ, प्रत्येक अपने स्वयं के WebDriver BiDi ब्राउज़िंग कॉन्टेक्स्ट में। `'contexts'` टेस्टों के बीच कुकीज़ और स्टोरेज साझा करता है, `'userContexts'` उन्हें अलग रखता है। इसके लिए `'wdio:experimentalBiDiCommands': true` कैपेबिलिटी आवश्यक है। इस मोड में `bail` और `retries` सपोर्टेड नहीं हैं। [एक स्पेक फ़ाइल में समानांतर टेस्ट](./ParallelTests.md) देखें।

</Option>

#### retries

<Option type="number" default="0">

विफल टेस्टों को पुनः प्रयास करने की संख्या।

</Option>

#### timeout

<Option type="number" default="30000">

टाइमआउट सीमा मान (ms में)।

</Option>

## Jasmine का उपयोग

सबसे पहले, NPM से एडाप्टर पैकेज इंस्टॉल करें:

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

फिर आप अपने कॉन्फ़िग में `jasmineOpts` प्रॉपर्टी सेट करके अपने Jasmine एनवायरनमेंट को कॉन्फ़िगर कर सकते हैं। सभी विकल्पों की सूची [Jasmine प्रोजेक्ट वेबसाइट](https://jasmine.github.io/api/edge/Configuration.html) पर मिल सकती है।

### Jasmine विकल्प

`jasmineOpts` प्रॉपर्टी का उपयोग करके अपने Jasmine एनवायरनमेंट को कॉन्फ़िगर करने के लिए निम्नलिखित विकल्प आपकी `wdio.conf.js` में लागू किए जा सकते हैं। इन कॉन्फ़िगरेशन विकल्पों के बारे में अधिक जानकारी के लिए, [Jasmine डॉक्स](https://jasmine.github.io/api/edge/Configuration) देखें। आप इन फ्रेमवर्क विकल्पों को आर्गुमेंट के रूप में पास कर सकते हैं, जैसे:

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

Jasmine ऑपरेशनों के लिए डिफ़ॉल्ट टाइमआउट इंटरवल।

</Option>

#### helpers

<Option type="string[]" default="[]">

Jasmine स्पेक्स से पहले शामिल करने के लिए spec_dir के सापेक्ष फ़ाइलपाथ (और ग्लोब) की ऐरे।

</Option>

#### requires

<Option type="string[]" default="[]">

`requires` विकल्प तब उपयोगी होता है जब आप कुछ बुनियादी कार्यक्षमता जोड़ना या विस्तारित करना चाहते हैं।

</Option>

#### random

<Option type="boolean" default="false">

क्या स्पेक निष्पादन क्रम को रैंडम करना है। Jasmine का अपना डिफ़ॉल्ट `true` है, लेकिन जब तक आप यह विकल्प सेट नहीं करते, WebdriverIO स्पेक्स को क्रम में चलाता है।

</Option>

#### seed

<Option type="Function" default="null">

रैंडमाइज़ेशन के आधार के रूप में उपयोग करने के लिए सीड। Null होने पर सीड निष्पादन की शुरुआत में रैंडम रूप से निर्धारित होता है।

</Option>

#### failSpecWithNoExpectations

<Option type="boolean" default="false">

क्या स्पेक को विफल करना है यदि उसमें कोई एक्सपेक्टेशन नहीं चला। डिफ़ॉल्ट रूप से, जिस स्पेक में कोई एक्सपेक्टेशन नहीं चला, उसे पास के रूप में रिपोर्ट किया जाता है। इसे true पर सेट करने से ऐसे स्पेक को विफलता के रूप में रिपोर्ट किया जाएगा।

</Option>

#### oneFailurePerSpec

<Option type="boolean" default="false">

किसी स्पेक को उसके पहले विफल एक्सपेक्टेशन पर रोक दें। एक विफल सिंक मैचर स्पेक को तुरंत रोक देता है, और एक awaited async मैचर उसे तब रोकता है जब उसका प्रॉमिस सेटल होता है। अन्य स्पेक्स चलते रहते हैं।

</Option>

#### specFilter

<Option type="Function" default="(spec) => true">

स्पेक्स को फ़िल्टर करने के लिए उपयोग किया जाने वाला फ़ंक्शन।

</Option>

#### grep

<Option type="string|Regexp" default="null">

केवल इस स्ट्रिंग या regexp से मेल खाने वाले टेस्ट चलाएँ। (केवल तभी लागू जब कोई कस्टम `specFilter` फ़ंक्शन सेट नहीं है)

</Option>

#### invertGrep

<Option type="boolean" default="false">

यदि true है, तो यह मेल खाने वाले टेस्टों को उलट देता है और केवल वही टेस्ट चलाता है जो `grep` में उपयोग किए गए एक्सप्रेशन से मेल नहीं खाते। (केवल तभी लागू जब कोई कस्टम `specFilter` फ़ंक्शन सेट नहीं है)

</Option>

#### stopOnSpecFailure

<Option type="boolean" default="false">

स्पेक फ़ाइल को उसके पहले विफल स्पेक (`it`) पर रोक दें: फ़ाइल के अन्य स्पेक्स नहीं चलते, अन्य `describe` ब्लॉकों में भी नहीं। अन्य स्पेक फ़ाइलें अपने स्वयं के वर्कर्स में चलती हैं और जारी रहती हैं।

</Option>

#### cleanStack

<Option type="boolean" default="true">

विफलताओं के स्टैक ट्रेस से `node_modules` पैकेजों की लाइनें हटा दें।

</Option>

#### expectationResultHandler

<Option type="Function" default="null">

प्रत्येक एक्सपेक्टेशन के लिए `(passed, assertion)` के साथ कॉल किया जाता है, उदाहरण के लिए जब कोई एक्सपेक्टेशन विफल हो तो स्क्रीनशॉट लेने के लिए। यदि फ़ंक्शन किसी पास हुए एक्सपेक्टेशन के लिए त्रुटि थ्रो करता है, तो एक्सपेक्टेशन उस त्रुटि के साथ विफल हो जाता है।

</Option>

### असर्शन

Jasmine के साथ, ग्लोबल `expect` Jasmine के मैचर्स और [WebdriverIO मैचर्स](/docs/api/expect-webdriverio) को संयोजित करता है:

- Jasmine के मैचर्स (`toBe`, `toEqual`, `toHaveBeenCalled`, …) और वे मैचर्स जो आप `jasmine.addMatchers` के साथ जोड़ते हैं, सिंक्रोनस होते हैं। वे `undefined` लौटाते हैं, इसलिए आपको `await` की आवश्यकता नहीं है।
- WebdriverIO मैचर्स, Jasmine के async मैचर्स (`toBeResolved`, `toBeRejectedWith`, …) और वे मैचर्स जो आप `jasmine.addAsyncMatchers` के साथ जोड़ते हैं, एक प्रॉमिस लौटाते हैं। उन्हें हमेशा `await` करें।

दोनों प्रकारों के लिए `expect()` का उपयोग करें: यह आपके लिए प्रत्येक मैचर को Jasmine के `expect` या `expectAsync` पर भेजता है। `await expectAsync($('#logo')).toBeDisplayed()` भी काम करता है। TypeScript के लिए, `types` में `@wdio/jasmine-framework` `expectAsync()` को भी WebdriverIO मैचर्स देता है।

```js
it('checks the page', async () => {
    expect([1, 2]).toHaveSize(2)                                   // Jasmine, सिंक
    await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO, async
    await expect(loadData()).toBeResolved()                        // Jasmine async मैचर
})
```

`toHaveSize` दोनों लाइब्रेरी में मौजूद है। WebdriverIO मैचर WebdriverIO मानों पर चलता है: एक एलिमेंट, एक एलिमेंट ऐरे या `Element[]` (उदाहरण के लिए `$$().filter()` का परिणाम), एक मल्टी-रिमोट एलिमेंट, एक ब्राउज़र, एक ब्राउज़िंग कॉन्टेक्स्ट, एक मॉक, `some()` रैपर, या चेनेबल `$()` जैसा कोई प्रॉमिस। Jasmine का मैचर बाकी सभी मानों पर चलता है।

दोनों लाइब्रेरी के एसिमेट्रिक मैचर्स Jasmine और WebdriverIO मैचर्स दोनों में काम करते हैं: `jasmine.any()`, `jasmine.objectContaining()`, `jasmine.stringMatching()`, … और `expect.any()`, `expect.stringContaining()`, `expect.oneOf()`, `expect.multiRemote()`, `expect.not.stringContaining()`, …। `some()` का उपयोग करने के लिए, इसे इम्पोर्ट करें:

```js
import { some } from 'expect-webdriverio/api'

await expect(some($$('li'))).toHaveAttribute('data-state', 'on')
```

`expect` के Jest भाग Jasmine के साथ उपलब्ध नहीं हैं: `toStrictEqual` या `toHaveLength` जैसे केवल-Jest मैचर्स, और `expect.soft()`। कस्टम मैचर जोड़ने के लिए, किसी स्पेक फ़ाइल या `before` हुक में `expect.extend()` का उपयोग करें ([कस्टम मैचर्स](/docs/custommatchers) देखें), या सिंक मैचर के लिए `jasmine.addMatchers` और async मैचर के लिए `jasmine.addAsyncMatchers` का उपयोग करें।

TypeScript के लिए, `types` में `jasmine` जोड़ें, [TypeScript सेटअप](/docs/typescript) देखें।

## Cucumber का उपयोग

सबसे पहले, NPM से एडाप्टर पैकेज इंस्टॉल करें:

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

यदि आप Cucumber का उपयोग करना चाहते हैं, तो [कॉन्फ़िग फ़ाइल](configurationfile) में `framework: 'cucumber'` जोड़कर `framework` प्रॉपर्टी को `cucumber` पर सेट करें।

Cucumber के विकल्प कॉन्फ़िग फ़ाइल में `cucumberOpts` के साथ दिए जा सकते हैं। विकल्पों की पूरी सूची [यहाँ](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options) देखें। एडाप्टर Cucumber 13 का उपयोग करता है। `tagExpression` हटा दिया गया है; `tags` के साथ फ़िल्टर करें। [v10 माइग्रेशन गाइड](v10-migration#cucumber) देखें।

Cucumber के साथ जल्दी से शुरुआत करने के लिए, हमारे [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate) प्रोजेक्ट पर एक नज़र डालें जो शुरुआत करने के लिए आवश्यक सभी स्टेप डेफ़िनिशन के साथ आता है, और आप तुरंत फ़ीचर फ़ाइलें लिखना शुरू कर देंगे।

### Cucumber विकल्प

`cucumberOpts` प्रॉपर्टी का उपयोग करके अपने Cucumber एनवायरनमेंट को कॉन्फ़िगर करने के लिए निम्नलिखित विकल्प आपकी `wdio.conf.js` में लागू किए जा सकते हैं:

:::tip कमांड लाइन के माध्यम से विकल्पों को समायोजित करना
`cucumberOpts`, जैसे टेस्टों को फ़िल्टर करने के लिए कस्टम `tags`, कमांड लाइन के माध्यम से निर्दिष्ट किए जा सकते हैं। यह `cucumberOpts.{optionName}="value"` फ़ॉर्मेट का उपयोग करके किया जाता है।

उदाहरण के लिए, यदि आप केवल उन टेस्टों को चलाना चाहते हैं जो `@smoke` से टैग किए गए हैं, तो आप निम्नलिखित कमांड का उपयोग कर सकते हैं:

```sh
# जब आप केवल वे टेस्ट चलाना चाहते हैं जिनमें "@smoke" टैग है
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

यह कमांड `cucumberOpts` में `tags` विकल्प को `@smoke` पर सेट करता है, यह सुनिश्चित करते हुए कि केवल इस टैग वाले टेस्ट निष्पादित हों।

:::

#### backtrace

<Option type="Boolean" default="false">

त्रुटियों के लिए पूर्ण बैकट्रेस दिखाएँ।

</Option>

#### requireModule

<Option type="string[]" default="[]">

किसी भी सपोर्ट फ़ाइल को require करने से पहले मॉड्यूल require करें।

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

पहली विफलता पर रन को रद्द करें।

</Option>

#### name

<Option type="RegExp[]" default="[]">

केवल उन सिनेरियो को निष्पादित करें जिनका नाम एक्सप्रेशन से मेल खाता है (दोहराने योग्य)।

</Option>

#### require

<Option type="string[]" default="[]">

फ़ीचर्स निष्पादित करने से पहले आपकी स्टेप डेफ़िनिशन वाली फ़ाइलों को require करें। आप अपनी स्टेप डेफ़िनिशन के लिए एक ग्लोब भी निर्दिष्ट कर सकते हैं।

</Option>
उदाहरण:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import

<Option type="String[]" default="[]">

ESM के लिए, आपके सपोर्ट कोड के पाथ।

</Option>
उदाहरण:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict

<Option type="boolean" default="false">

पेंडिंग स्टेप पर रन को विफल करें। एक अनडिफ़ाइंड स्टेप `strict` के बिना भी रन को विफल करता है, जब तक कि [`ignoreUndefinedDefinitions`](#ignoreundefineddefinitions) `true` न हो।

</Option>

#### tags

<Option type="String" default="">

केवल उन फ़ीचर्स या सिनेरियो को निष्पादित करें जिनके टैग एक्सप्रेशन से मेल खाते हैं। बिना किसी मेल खाने वाले सिनेरियो वाली फ़ीचर फ़ाइल को स्किप्ड के रूप में रिपोर्ट किया जाता है और कोई ब्राउज़र सेशन शुरू नहीं होता।
अधिक जानकारी के लिए कृपया [Cucumber डॉक्यूमेंटेशन](https://docs.cucumber.io/cucumber/api/#tag-expressions) देखें।

</Option>

#### timeout

<Option type="Number" default="60000">

स्टेप डेफ़िनिशन के लिए मिलीसेकंड में टाइमआउट।

</Option>

#### retry

<Option type="Number" default="0">

विफल टेस्ट केस को पुनः प्रयास करने की संख्या निर्दिष्ट करें।

</Option>

#### retryTagFilter

<Option type="String">

केवल उन सिनेरियो को पुनः प्रयास करें जिनके टैग टैग एक्सप्रेशन से मेल खाते हैं। [`retry`](#retry) आवश्यक है।

</Option>

#### language

<Option type="String" default="en">

आपकी फ़ीचर फ़ाइलों के लिए डिफ़ॉल्ट भाषा

</Option>

#### order

<Option type="String" default="defined">

सिनेरियो को फ़ीचर फ़ाइलों के क्रम में (`'defined'`) या रैंडम क्रम में (`'random'`) चलाएँ। `'random:<seed>'` के साथ, उदाहरण के लिए `'random:42'`, रैंडम क्रम प्रत्येक रन में समान रहता है। `'random'` के साथ, लॉग रन का सीड दिखाता है (`Random order using seed: 42`)।

</Option>

#### format

<Option type="string[]">

उपयोग किए जाने वाले फ़ॉर्मेटर का नाम और आउटपुट फ़ाइल पाथ।
WebdriverIO मुख्य रूप से केवल उन [फ़ॉर्मेटर्स](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md) को सपोर्ट करता है जो आउटपुट को फ़ाइल में लिखते हैं। फ़ॉर्मेटर्स [`parallelMode`](#parallelmode-1) के साथ नहीं चलते।

</Option>

#### formatOptions

<Option type="object">

फ़ॉर्मेटर्स को प्रदान किए जाने वाले विकल्प

</Option>

#### tagsInTitle

<Option type="Boolean" default="false">

फ़ीचर या सिनेरियो नाम में cucumber टैग जोड़ें

</Option>
***कृपया ध्यान दें कि यह एक @wdio/cucumber-framework विशिष्ट विकल्प है और cucumber-js द्वारा स्वयं पहचाना नहीं जाता***<br/>

#### ignoreUndefinedDefinitions

<Option type="Boolean" default="false">

अनडिफ़ाइंड स्टेप को पेंडिंग के रूप में रिपोर्ट करें, उसके शीर्षक के अंत में ` (undefined step)` के साथ, और इसके कारण रन को विफल न करें।

</Option>
***कृपया ध्यान दें कि यह एक @wdio/cucumber-framework विशिष्ट विकल्प है और cucumber-js द्वारा स्वयं पहचाना नहीं जाता***<br/>

#### failAmbiguousDefinitions

<Option type="Boolean" default="false">

एक अस्पष्ट स्टेप (एक स्टेप जो एक से अधिक स्टेप डेफ़िनिशन से मेल खाता है) को मेल खाने वाली स्टेप डेफ़िनिशन की सूची के साथ विफल के रूप में रिपोर्ट करें। `false` के साथ, स्टेप को स्किप्ड के रूप में रिपोर्ट किया जाता है, सूची को उसके कारण के रूप में। दोनों मामलों में, रन विफल होता है। अपवाद: `parallelMode` के बिना, `ignoreUndefinedDefinitions: true` और `failAmbiguousDefinitions: false` के साथ रन पास होता है।

</Option>
***कृपया ध्यान दें कि यह एक @wdio/cucumber-framework विशिष्ट विकल्प है और cucumber-js द्वारा स्वयं पहचाना नहीं जाता***<br/>

#### profiles

<Option type="string[]" default="[]">

उपयोग की जाने वाली Cucumber कॉन्फ़िगरेशन फ़ाइल की प्रोफ़ाइलें।

</Option>
***कृपया ध्यान दें कि प्रोफ़ाइलों के भीतर केवल विशिष्ट मान (worldParameters, name, retryTagFilter) सपोर्टेड हैं, क्योंकि `cucumberOpts` को प्राथमिकता मिलती है। इसके अतिरिक्त, प्रोफ़ाइल का उपयोग करते समय, सुनिश्चित करें कि उल्लिखित मान `cucumberOpts` के भीतर घोषित नहीं किए गए हैं।***

#### file

<Option type="string | false" default="undefined">

लोड की जाने वाली Cucumber कॉन्फ़िगरेशन फ़ाइल का पाथ, या कोई भी लोड न करने के लिए `false`। इसके बिना, Cucumber अपनी डिफ़ॉल्ट कॉन्फ़िगरेशन फ़ाइलें खोजता है।

</Option>

#### dryRun

<Option type="Boolean" default="false">

कोई स्टेप और कोई हुक न चलाएँ: Cucumber केवल प्रत्येक स्टेप को उसकी स्टेप डेफ़िनिशन से मिलाता है, इसलिए अनडिफ़ाइंड और अस्पष्ट स्टेप्स अभी भी रिपोर्ट किए जाते हैं। रन विफल नहीं होता।

</Option>

#### worldParameters

<Option type="object" default="{}">

आपके World के लिए पैरामीटर, `this.parameters` के रूप में।

</Option>

#### scenarioLevelReporter

<Option type="Boolean" default="false">

प्रत्येक सिनेरियो को एक टेस्ट के रूप में रिपोर्ट करें। इसके स्टेप्स और हुक्स रिपोर्ट नहीं किए जाते।

</Option>
***कृपया ध्यान दें कि यह एक @wdio/cucumber-framework विशिष्ट विकल्प है और cucumber-js द्वारा स्वयं पहचाना नहीं जाता***<br/>

#### parallelMode

<Option type="'contexts' | 'userContexts'" default="undefined">

एक फ़ीचर फ़ाइल के सिनेरियो को एक ही समय पर चलाएँ, प्रत्येक अपने स्वयं के WebDriver BiDi ब्राउज़िंग कॉन्टेक्स्ट में। `'contexts'` सिनेरियो के बीच कुकीज़ और स्टोरेज साझा करता है, `'userContexts'` उन्हें अलग रखता है। इसके लिए `'wdio:experimentalBiDiCommands': true` कैपेबिलिटी आवश्यक है। [एक स्पेक फ़ाइल में समानांतर टेस्ट](./ParallelTests.md) देखें।

</Option>
***कृपया ध्यान दें कि यह एक @wdio/cucumber-framework विशिष्ट विकल्प है और cucumber-js द्वारा स्वयं पहचाना नहीं जाता***<br/>

#### maxParallelContexts

<Option type="number" default="os.cpus().length">

[`parallelMode`](#parallelmode-1) सेट होने पर एक ही समय पर चलने वाले सिनेरियो की संख्या। [एक स्पेक फ़ाइल में समानांतर टेस्ट](./ParallelTests.md#options) देखें।

</Option>
***कृपया ध्यान दें कि यह एक @wdio/cucumber-framework विशिष्ट विकल्प है और cucumber-js द्वारा स्वयं पहचाना नहीं जाता***<br/>

### Cucumber में टेस्ट स्किप करना

ध्यान दें कि यदि आप `cucumberOpts` में उपलब्ध सामान्य cucumber टेस्ट फ़िल्टरिंग क्षमताओं का उपयोग करके किसी टेस्ट को स्किप करना चाहते हैं, तो आप इसे कैपेबिलिटीज़ में कॉन्फ़िगर किए गए सभी ब्राउज़रों और डिवाइसों के लिए करेंगे। अनावश्यक होने पर सेशन शुरू किए बिना केवल विशिष्ट कैपेबिलिटीज़ संयोजनों के लिए सिनेरियो स्किप करने में सक्षम होने के लिए, webdriverio cucumber के लिए निम्नलिखित विशिष्ट टैग सिंटैक्स प्रदान करता है:

`@skip([condition])`

जहाँ condition कैपेबिलिटीज़ प्रॉपर्टीज़ और उनके मानों का एक वैकल्पिक संयोजन है, जो **सभी** मेल खाने पर टैग किए गए सिनेरियो या फ़ीचर को स्किप करवा देगा। बेशक आप कई अलग-अलग स्थितियों में टेस्ट स्किप करने के लिए सिनेरियो और फ़ीचर्स में कई टैग जोड़ सकते हैं।

आप `tags` बदले बिना टेस्ट स्किप करने के लिए '@skip' एनोटेशन का भी उपयोग कर सकते हैं। इस मामले में स्किप किए गए टेस्ट टेस्ट रिपोर्ट में प्रदर्शित होंगे।

यहाँ इस सिंटैक्स के कुछ उदाहरण हैं:
- `@skip` या `@skip()`: टैग किए गए आइटम को हमेशा स्किप करेगा
- `@skip(browserName="chrome")`: टेस्ट chrome ब्राउज़रों पर निष्पादित नहीं होगा।
- `@skip(browserName="firefox";platformName="linux")`: linux पर firefox निष्पादनों में टेस्ट को स्किप करेगा।
- `@skip(browserName=["chrome","firefox"])`: टैग किए गए आइटम chrome और firefox दोनों ब्राउज़रों के लिए स्किप किए जाएँगे।
- `@skip(browserName=/i.*explorer/)`: regexp से मेल खाने वाले ब्राउज़रों वाली कैपेबिलिटीज़ स्किप की जाएँगी (जैसे `iexplorer`, `internet explorer`, `internet-explorer`, ...)।

### स्टेप डेफ़िनिशन हेल्पर इम्पोर्ट करना

`Given`, `When` या `Then` जैसे स्टेप डेफ़िनिशन हेल्पर या हुक्स का उपयोग करने के लिए, आपको उन्हें `@cucumber/cucumber` से इम्पोर्ट करना होगा, जैसे इस तरह:

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

अब, यदि आप पहले से ही WebdriverIO से असंबंधित अन्य प्रकार के टेस्टों के लिए Cucumber का उपयोग करते हैं, जिनके लिए आप एक विशिष्ट संस्करण का उपयोग करते हैं, तो आपको अपने e2e टेस्टों में इन हेल्पर्स को WebdriverIO Cucumber पैकेज से इम्पोर्ट करना होगा, जैसे:

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

यह सुनिश्चित करता है कि आप WebdriverIO फ्रेमवर्क के भीतर सही हेल्पर्स का उपयोग करें और आपको अन्य प्रकार के टेस्टिंग के लिए एक स्वतंत्र Cucumber संस्करण का उपयोग करने की अनुमति देता है।

### रिपोर्ट प्रकाशित करना

Cucumber आपकी टेस्ट रन रिपोर्ट को `https://reports.cucumber.io/` पर प्रकाशित करने की सुविधा प्रदान करता है, जिसे `cucumberOpts` में `publish` फ़्लैग सेट करके या `CUCUMBER_PUBLISH_TOKEN` एनवायरनमेंट वेरिएबल कॉन्फ़िगर करके नियंत्रित किया जा सकता है। हालाँकि, जब आप टेस्ट निष्पादन के लिए `WebdriverIO` का उपयोग करते हैं, तो इस दृष्टिकोण में एक सीमा है। यह प्रत्येक फ़ीचर फ़ाइल के लिए रिपोर्ट को अलग-अलग अपडेट करता है, जिससे एक समेकित रिपोर्ट देखना कठिन हो जाता है।

इस सीमा को दूर करने के लिए, हमने `@wdio/cucumber-framework` के भीतर `publishCucumberReport` नामक एक प्रॉमिस-आधारित मेथड प्रस्तुत किया है। इस मेथड को `onComplete` हुक में कॉल किया जाना चाहिए, जो इसे इनवोक करने के लिए सबसे उपयुक्त स्थान है। `publishCucumberReport` को उस रिपोर्ट डायरेक्टरी के इनपुट की आवश्यकता होती है जहाँ cucumber message रिपोर्ट संग्रहीत होती हैं।

आप अपने `cucumberOpts` में `format` विकल्प कॉन्फ़िगर करके `cucumber message` रिपोर्ट जनरेट कर सकते हैं। रिपोर्टों को ओवरराइट होने से रोकने और यह सुनिश्चित करने के लिए कि प्रत्येक टेस्ट रन सटीक रूप से रिकॉर्ड हो, `cucumber message` फ़ॉर्मेट विकल्प के भीतर एक डायनामिक फ़ाइल नाम प्रदान करने की अत्यधिक अनुशंसा की जाती है।

इस फ़ंक्शन का उपयोग करने से पहले, निम्नलिखित एनवायरनमेंट वेरिएबल सेट करना सुनिश्चित करें:
- CUCUMBER_PUBLISH_REPORT_URL: वह URL जहाँ आप Cucumber रिपोर्ट प्रकाशित करना चाहते हैं। यदि प्रदान नहीं किया गया, तो डिफ़ॉल्ट URL 'https://messages.cucumber.io/api/reports' का उपयोग किया जाएगा।
- CUCUMBER_PUBLISH_REPORT_TOKEN: रिपोर्ट प्रकाशित करने के लिए आवश्यक ऑथराइज़ेशन टोकन। यदि यह टोकन सेट नहीं है, तो फ़ंक्शन रिपोर्ट प्रकाशित किए बिना बाहर निकल जाएगा।

कार्यान्वयन के लिए आवश्यक कॉन्फ़िगरेशन और कोड सैंपल का एक उदाहरण यहाँ है:

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

कृपया ध्यान दें कि `./reports/` वह डायरेक्टरी है जहाँ `cucumber message` रिपोर्ट संग्रहीत की जाएँगी।

## Serenity/JS का उपयोग

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) एक ओपन-सोर्स फ्रेमवर्क है जिसे जटिल सॉफ़्टवेयर सिस्टम की एक्सेप्टेंस और रिग्रेशन टेस्टिंग को तेज़, अधिक सहयोगी और स्केल करने में आसान बनाने के लिए डिज़ाइन किया गया है।

WebdriverIO टेस्ट सूट के लिए, Serenity/JS प्रदान करता है:
- [उन्नत रिपोर्टिंग](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) - आप Serenity/JS का उपयोग
  किसी भी बिल्ट-इन WebdriverIO फ्रेमवर्क के ड्रॉप-इन रिप्लेसमेंट के रूप में करके अपने प्रोजेक्ट की गहन टेस्ट निष्पादन रिपोर्ट और लिविंग डॉक्यूमेंटेशन तैयार कर सकते हैं।
- [Screenplay Pattern APIs](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - आपके टेस्ट कोड को प्रोजेक्ट्स और टीमों में पोर्टेबल और पुन: प्रयोज्य बनाने के लिए,
  Serenity/JS आपको नेटिव WebdriverIO APIs के ऊपर एक वैकल्पिक [एब्स्ट्रैक्शन लेयर](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io) देता है।
- [इंटीग्रेशन लाइब्रेरी](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) - Screenplay Pattern का पालन करने वाले टेस्ट सूट के लिए,
  Serenity/JS वैकल्पिक इंटीग्रेशन लाइब्रेरी भी प्रदान करता है जो आपको [API टेस्ट](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io) लिखने,
  [लोकल सर्वर प्रबंधित करने](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io), [असर्शन करने](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io), और बहुत कुछ करने में मदद करती हैं!

![Serenity BDD Report Example](/img/serenity-bdd-reporter.png)

### Serenity/JS इंस्टॉल करना

किसी [मौजूदा WebdriverIO प्रोजेक्ट](https://webdriver.io/docs/gettingstarted) में Serenity/JS जोड़ने के लिए, NPM से निम्नलिखित Serenity/JS मॉड्यूल इंस्टॉल करें:

```sh npm2yarn
npm install @serenity-js/{core,web,webdriverio,assertions,console-reporter,serenity-bdd} --save-dev
```

Serenity/JS मॉड्यूल के बारे में और जानें:
- [`@serenity-js/core`](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/web`](https://serenity-js.org/api/web/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/webdriverio`](https://serenity-js.org/api/webdriverio/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/assertions`](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/console-reporter`](https://serenity-js.org/api/console-reporter/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)

### Serenity/JS कॉन्फ़िगर करना

Serenity/JS के साथ इंटीग्रेशन सक्षम करने के लिए, WebdriverIO को निम्नानुसार कॉन्फ़िगर करें:

<Tabs>
<TabItem value="wdio-conf-typescript" label="TypeScript" default>

```typescript title="wdio.conf.ts"
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

export const config: WebdriverIOConfig = {

    // WebdriverIO को Serenity/JS फ्रेमवर्क का उपयोग करने के लिए कहें
    framework: '@serenity-js/webdriverio',

    // Serenity/JS कॉन्फ़िगरेशन
    serenity: {
        // अपने टेस्ट रनर के लिए उपयुक्त एडाप्टर का उपयोग करने हेतु Serenity/JS को कॉन्फ़िगर करें
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Serenity/JS रिपोर्टिंग सेवाओं, यानी "stage crew", को रजिस्टर करें
        crew: [
            // वैकल्पिक, टेस्ट निष्पादन परिणामों को स्टैंडर्ड आउटपुट पर प्रिंट करें
            '@serenity-js/console-reporter',

            // वैकल्पिक, Serenity BDD रिपोर्ट और लिविंग डॉक्यूमेंटेशन (HTML) तैयार करें
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // वैकल्पिक, इंटरैक्शन विफलता पर स्वचालित रूप से स्क्रीनशॉट कैप्चर करें
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
        // अपने टेस्ट रनर के लिए उपयुक्त एडाप्टर का उपयोग करने हेतु Serenity/JS को कॉन्फ़िगर करें
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Serenity/JS रिपोर्टिंग सेवाओं, यानी "stage crew", को रजिस्टर करें
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

### Serenity BDD रिपोर्ट और लिविंग डॉक्यूमेंटेशन तैयार करना

[Serenity BDD रिपोर्ट और लिविंग डॉक्यूमेंटेशन](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports) [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli) द्वारा जनरेट किए जाते हैं,
जो [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io) मॉड्यूल द्वारा डाउनलोड और प्रबंधित एक Java प्रोग्राम है।

Serenity BDD रिपोर्ट तैयार करने के लिए, आपके टेस्ट सूट को:
- `serenity-bdd update` कॉल करके Serenity BDD CLI डाउनलोड करना होगा, जो CLI `jar` को लोकल रूप से कैश करता है
- [कॉन्फ़िगरेशन निर्देशों](#configuring-serenityjs) के अनुसार [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) को रजिस्टर करके इंटरमीडिएट Serenity BDD `.json` रिपोर्ट तैयार करनी होंगी
- जब आप रिपोर्ट तैयार करना चाहें, तब `serenity-bdd run` कॉल करके Serenity BDD CLI को इनवोक करना होगा

सभी [Serenity/JS प्रोजेक्ट टेम्पलेट्स](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio) द्वारा उपयोग किया जाने वाला पैटर्न
निम्नलिखित के उपयोग पर निर्भर करता है:
- Serenity BDD CLI डाउनलोड करने के लिए एक [`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order) NPM स्क्रिप्ट
- [`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe) ताकि रिपोर्टिंग प्रक्रिया तब भी चले जब टेस्ट सूट स्वयं विफल हो गया हो (जो ठीक वही समय है जब आपको टेस्ट रिपोर्ट की सबसे अधिक आवश्यकता होती है...)।
- [`rimraf`](https://www.npmjs.com/package/rimraf) पिछले रन से बची हुई किसी भी टेस्ट रिपोर्ट को हटाने के लिए एक सुविधाजनक मेथड के रूप में

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

`SerenityBDDReporter` के बारे में अधिक जानने के लिए, कृपया देखें:
- [`@serenity-js/serenity-bdd` डॉक्यूमेंटेशन](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io) में इंस्टॉलेशन निर्देश,
- [`SerenityBDDReporter` API डॉक्स](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) में कॉन्फ़िगरेशन उदाहरण,
- [GitHub पर Serenity/JS उदाहरण](https://github.com/serenity-js/serenity-js/tree/main/examples)।

### Serenity/JS Screenplay Pattern APIs का उपयोग

[Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) उच्च-गुणवत्ता वाले स्वचालित एक्सेप्टेंस टेस्ट लिखने के लिए एक नवीन, उपयोगकर्ता-केंद्रित दृष्टिकोण है। यह आपको एब्स्ट्रैक्शन की परतों के प्रभावी उपयोग की ओर ले जाता है,
आपके टेस्ट सिनेरियो को आपके डोमेन की व्यावसायिक शब्दावली को कैप्चर करने में मदद करता है, और आपकी टीम में अच्छी टेस्टिंग और सॉफ़्टवेयर इंजीनियरिंग आदतों को प्रोत्साहित करता है।

डिफ़ॉल्ट रूप से, जब आप `@serenity-js/webdriverio` को अपने WebdriverIO `framework` के रूप में रजिस्टर करते हैं,
तो Serenity/JS [एक्टर्स](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io) का एक डिफ़ॉल्ट [कास्ट](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io) कॉन्फ़िगर करता है,
जहाँ प्रत्येक एक्टर:
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

कर सकता है।

यह आपको Screenplay Pattern का पालन करने वाले टेस्ट सिनेरियो को किसी मौजूदा टेस्ट सूट में भी शामिल करना शुरू करने में मदद के लिए पर्याप्त होना चाहिए, उदाहरण के लिए:

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

Screenplay Pattern के बारे में अधिक जानने के लिए, देखें:
- [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Serenity/JS के साथ वेब टेस्टिंग](https://serenity-js.org/handbook/web-testing/?pk_campaign=wdio8&pk_source=webdriver.io)
- ["BDD in Action, Second Edition"](https://www.manning.com/books/bdd-in-action-second-edition)