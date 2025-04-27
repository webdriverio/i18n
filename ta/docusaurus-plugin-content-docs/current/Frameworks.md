---
id: frameworks
title: திட்டரூபங்கள்
---

WebdriverIO Runner-க்கு [Mocha](http://mochajs.org/), [Jasmine](http://jasmine.github.io/), மற்றும் [Cucumber.js](https://cucumber.io/) ஆகியவற்றுக்கான உள்ளமைக்கப்பட்ட ஆதரவு உள்ளது. நீங்கள் [Serenity/JS](#using-serenityjs) போன்ற மூன்றாம் தரப்பு திறந்த மூல திட்டரூபங்களுடன் அதை ஒருங்கிணைக்கலாம்.

:::tip WebdriverIO-வை சோதனை திட்டரூபங்களுடன் ஒருங்கிணைத்தல்
WebdriverIO-வை ஒரு சோதனை திட்டரூபத்துடன் ஒருங்கிணைக்க, NPM-இல் கிடைக்கும் ஒரு அடாப்டர் தொகுப்பு தேவைப்படுகிறது.
அடாப்டர் தொகுப்பு WebdriverIO நிறுவப்பட்டிருக்கும் அதே இடத்தில் நிறுவப்பட வேண்டும் என்பதை நினைவில் கொள்ளவும்.
எனவே, நீங்கள் WebdriverIO-வை உலகளாவிய அளவில் நிறுவியிருந்தால், அடாப்டர் தொகுப்பையும் உலகளாவிய அளவில் நிறுவ உறுதிசெய்து கொள்ளுங்கள்.
:::

WebdriverIO-வை ஒரு சோதனை திட்டரூபத்துடன் ஒருங்கிணைப்பது உங்கள் spec கோப்புகள் அல்லது step definitions-இல் உலகளாவிய `browser` மாறி மூலம் WebDriver நிகழ்நிலையை அணுக அனுமதிக்கிறது.
WebdriverIO செலீனியம் அமர்வைத் தொடங்குவதற்கும் முடிப்பதற்கும் கவனித்துக்கொள்ளும், எனவே நீங்கள் அதைச் செய்ய வேண்டியதில்லை என்பதை நினைவில் கொள்ளவும்.

## Mocha-வைப் பயன்படுத்துதல்

முதலில், NPM இலிருந்து அடாப்டர் தொகுப்பை நிறுவவும்:

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

இயல்பாக WebdriverIO ஒரு [assertion library](assertion) வழங்குகிறது, இது உள்ளமைக்கப்பட்டுள்ளது மற்றும் நீங்கள் உடனடியாக தொடங்கலாம்:

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

WebdriverIO, Mocha-வின் `BDD` (இயல்பு), `TDD`, மற்றும் `QUnit` [interfaces](https://mochajs.org/#interfaces) ஆதரிக்கிறது.

நீங்கள் உங்கள் specs-ஐ TDD பாணியில் எழுத விரும்பினால், உங்கள் `mochaOpts` உள்ளமைவில் `ui` பண்புக்கு `tdd` என அமைக்கவும். இப்போது உங்கள் சோதனை கோப்புகள் இப்படி எழுதப்பட வேண்டும்:

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

நீங்கள் மற்ற Mocha-குறிப்பிட்ட அமைப்புகளை வரையறுக்க விரும்பினால், உங்கள் உள்ளமைவு கோப்பில் `mochaOpts` விசை மூலம் செய்யலாம். அனைத்து விருப்பங்களின் பட்டியலை [Mocha திட்ட இணையதளத்தில்](https://mochajs.org/api/mocha) காணலாம்.

__குறிப்பு:__ WebdriverIO Mocha-வில் `done` callbacks-இன் பழமையான பயன்பாட்டை ஆதரிக்காது:

```js
it('should test something', (done) => {
    done() // throws "done is not a function"
})
```

### Mocha விருப்பங்கள்

உங்கள் Mocha சூழலை உள்ளமைக்க பின்வரும் விருப்பங்களை உங்கள் `wdio.conf.js`-இல் பயன்படுத்தலாம். __குறிப்பு:__ அனைத்து விருப்பங்களும் ஆதரிக்கப்படவில்லை, எ.கா. `parallel` விருப்பத்தைப் பயன்படுத்துவது பிழையை ஏற்படுத்தும், ஏனெனில் WDIO சோதனை செயல்படுத்தி சோதனைகளை இணையாக இயக்க அதற்கென்று ஒரு வழி உள்ளது. நீங்கள் இந்த திட்டரூப விருப்பங்களை arguments-ஆக அனுப்பலாம், எ.கா.:

```sh
wdio run wdio.conf.ts --mochaOpts.grep "my test" --mochaOpts.bail --no-mochaOpts.checkLeaks
```

இது பின்வரும் Mocha விருப்பங்களை அனுப்பும்:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

பின்வரும் Mocha விருப்பங்கள் ஆதரிக்கப்படுகின்றன:

#### require
`require` விருப்பமானது சில அடிப்படை செயல்பாடுகளைச் சேர்க்க அல்லது விரிவாக்க விரும்பும்போது பயனுள்ளதாக இருக்கும் (WebdriverIO திட்டரூப விருப்பம்).

வகை: `string|string[]`<br />
இயல்பு: `[]`

#### compilers
கோப்புகளைத் தொகுக்க கொடுக்கப்பட்ட தொகுதி(களை)ப் பயன்படுத்தவும். requires-க்கு முன் Compilers சேர்க்கப்படும் (WebdriverIO திட்டரூப விருப்பம்).

வகை: `string[]`<br />
இயல்பு: `[]`

#### allowUncaught
கைப்பற்றப்படாத பிழைகளைப் பரப்பவும்.

வகை: `boolean`<br />
இயல்பு: `false`

#### bail
முதல் சோதனை தோல்வியடைந்த பிறகு bail ஆகும்.

வகை: `boolean`<br />
இயல்பு: `false`

#### checkLeaks
உலகளாவிய மாறி கசிவுகளை சரிபார்க்கவும்.

வகை: `boolean`<br />
இயல்பு: `false`

#### delay
மூல தொகுப்பு செயல்பாட்டைத் தாமதப்படுத்துங்கள்.

வகை: `boolean`<br />
இயல்பு: `false`

#### fgrep
கொடுக்கப்பட்ட சரத்தைக் கொண்டு சோதனை வடிகட்டி.

வகை: `string`<br />
இயல்பு: `null`

#### forbidOnly
`only` என குறிக்கப்பட்ட சோதனைகள் தொகுப்பைத் தோல்வியடையச் செய்யும்.

வகை: `boolean`<br />
இயல்பு: `false`

#### forbidPending
நிலுவையிலுள்ள சோதனைகள் தொகுப்பைத் தோல்வியடையச் செய்யும்.

வகை: `boolean`<br />
இயல்பு: `false`

#### fullTrace
தோல்வியின் போது முழு stacktrace.

வகை: `boolean`<br />
இயல்பு: `false`

#### global
உலகளாவிய நோக்கில் எதிர்பார்க்கப்படும் மாறிகள்.

வகை: `string[]`<br />
இயல்பு: `[]`

#### grep
கொடுக்கப்பட்ட வழக்கமான வெளிப்பாட்டைக் கொண்டு சோதனை வடிகட்டி.

வகை: `RegExp|string`<br />
இயல்பு: `null`

#### invert
சோதனை வடிகட்டி பொருத்தங்களை புரட்டவும்.

வகை: `boolean`<br />
இயல்பு: `false`

#### retries
தோல்வியடைந்த சோதனைகளை மறுமுயற்சி செய்வதற்கான எண்ணிக்கை.

வகை: `number`<br />
இயல்பு: `0`

#### timeout
நேர முடிவு வரம்பு மதிப்பு (மில்லிவினாடிகளில்).

வகை: `number`<br />
இயல்பு: `30000`

## Jasmine-ஐப் பயன்படுத்துதல்

முதலில், NPM இலிருந்து அடாப்டர் தொகுப்பை நிறுவவும்:

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

உங்கள் config-இல் `jasmineOpts` பண்பை அமைப்பதன் மூலம் நீங்கள் உங்கள் Jasmine சூழலை உள்ளமைக்கலாம். அனைத்து விருப்பங்களின் பட்டியலை [Jasmine திட்ட இணையதளத்தில்](https://jasmine.github.io/api/3.5/Configuration.html) காணலாம்.

### Jasmine விருப்பங்கள்

`jasmineOpts` பண்பைப் பயன்படுத்தி உங்கள் Jasmine சூழலை உள்ளமைக்க பின்வரும் விருப்பங்களை உங்கள் `wdio.conf.js` இல் பயன்படுத்தலாம். இந்த உள்ளமைவு விருப்பங்கள் பற்றிய கூடுதல் தகவலுக்கு, [Jasmine ஆவணங்களை](https://jasmine.github.io/api/edge/Configuration) பார்க்கவும். நீங்கள் இந்த திட்டரூப விருப்பங்களை arguments-ஆக அனுப்பலாம், எ.கா.:

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "my test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

இது பின்வரும் Mocha விருப்பங்களை அனுப்பும்:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

பின்வரும் Jasmine விருப்பங்கள் ஆதரிக்கப்படுகின்றன:

#### defaultTimeoutInterval
Jasmine செயல்பாடுகளுக்கான இயல்புநிலை நேர முடிவு இடைவெளி.

வகை: `number`<br />
இயல்பு: `60000`

#### helpers
Jasmine specs-க்கு முன் சேர்க்க spec_dir-க்கு தொடர்புடைய கோப்பு பாதைகளின் அணி (மற்றும் globs).

வகை: `string[]`<br />
இயல்பு: `[]`

#### requires
சில அடிப்படை செயல்பாடுகளைச் சேர்க்க அல்லது விரிவாக்க விரும்பும்போது `requires` விருப்பம் பயனுள்ளதாக இருக்கும்.

வகை: `string[]`<br />
இயல்பு: `[]`

#### random
spec செயல்படுத்துதல் வரிசையை சீரற்றதாக்க வேண்டுமா.

வகை: `boolean`<br />
இயல்பு: `true`

#### seed
சீரற்ற தன்மையின் அடிப்படையாகப் பயன்படுத்த seed. Null என்பது செயல்பாட்டின் தொடக்கத்தில் seed சீரற்றதாக தீர்மானிக்கப்படுவதற்கு காரணமாகிறது.

வகை: `Function`<br />
இயல்பு: `null`

#### failSpecWithNoExpectations
எந்த எதிர்பார்ப்புகளையும் இயக்காத spec-ஐ தோல்வியடையச் செய்ய வேண்டுமா. இயல்பாக எந்த எதிர்பார்ப்புகளையும் இயக்காத spec வெற்றியடைந்ததாக அறிக்கையிடப்படுகிறது. இதை true என அமைப்பது அத்தகைய spec-ஐ தோல்வியாக அறிக்கையிடும்.

வகை: `boolean`<br />
இயல்பு: `false`

#### oneFailurePerSpec
Specs-க்கு ஒரே ஒரு எதிர்பார்ப்பு தோல்வி மட்டுமே இருக்க வேண்டுமா.

வகை: `boolean`<br />
இயல்பு: `false`

#### specFilter
Specs-ஐ வடிகட்ட பயன்படுத்த வேண்டிய செயல்பாடு.

வகை: `Function`<br />
இயல்பு: `(spec) => true`

#### grep
இந்த சரம் அல்லது regexp-உடன் பொருந்தும் சோதனைகளை மட்டும் இயக்கவும். (தனிப்பயன் `specFilter` செயல்பாடு அமைக்கப்படவில்லை என்றால் மட்டுமே பொருந்தும்)

வகை: `string|Regexp`<br />
இயல்பு: `null`

#### invertGrep
இது உண்மையாக இருந்தால், அது பொருந்தும் சோதனைகளைத் தலைகீழாக்கி, `grep`-இல் பயன்படுத்தப்படும் வெளிப்பாட்டுடன் பொருந்தாத சோதனைகளை மட்டுமே இயக்குகிறது. (தனிப்பயன் `specFilter` செயல்பாடு அமைக்கப்படவில்லை என்றால் மட்டுமே பொருந்தும்)

வகை: `boolean`<br />
இயல்பு: `false`

## Cucumber-ஐப் பயன்படுத்துதல்

முதலில், NPM இலிருந்து அடாப்டர் தொகுப்பை நிறுவவும்:

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

நீங்கள் Cucumber-ஐப் பயன்படுத்த விரும்பினால், [config file](configurationfile)-க்கு `framework: 'cucumber'`-ஐச் சேர்ப்பதன் மூலம் `framework` பண்பை `cucumber` என அமைக்கவும்.

Cucumber-க்கான விருப்பங்களை `cucumberOpts`-உடன் உள்ளமைவு கோப்பில் வழங்கலாம். விருப்பங்களின் முழு பட்டியலை [இங்கே](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options) பார்க்கவும்.

Cucumber-உடன் விரைவாக இயங்கத் தொடங்க, நீங்கள் தொடங்குவதற்குத் தேவையான அனைத்து step definitions-உடனும் வரும் எங்களின் [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate) திட்டத்தைப் பார்வையிடவும், மேலும் நீங்கள் உடனடியாக அம்சக் கோப்புகளை எழுதத் தொடங்குவீர்கள்.

### Cucumber விருப்பங்கள்

`cucumberOpts` பண்பைப் பயன்படுத்தி உங்கள் Cucumber சூழலை உள்ளமைக்க, பின்வரும் விருப்பங்களை உங்கள் `wdio.conf.js` இல் பயன்படுத்தலாம்:

:::tip கட்டளை வரி மூலம் விருப்பங்களைச் சரிசெய்தல்
`cucumberOpts`, சோதனைகளை வடிகட்டுவதற்கான தனிப்பயன் `tags` போன்ற, கட்டளை வரி மூலமாக குறிப்பிடமுடியும். இது `cucumberOpts.{optionName}="value"` வடிவத்தைப் பயன்படுத்தி செய்யப்படுகிறது.

எடுத்துக்காட்டாக, நீங்கள் `@smoke` குறிச்சொல்லைக் கொண்ட சோதனைகளை மட்டும் இயக்க விரும்பினால், பின்வரும் கட்டளையைப் பயன்படுத்தலாம்:

```sh
# When you only want to run tests that hold the tag "@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

இந்த கட்டளை `cucumberOpts`-இல் `tags` விருப்பத்தை `@smoke` என அமைக்கிறது, இது இந்த குறிச்சொல் கொண்ட சோதனைகள் மட்டுமே இயக்கப்படுவதை உறுதிசெய்கிறது.

:::

#### backtrace
பிழைகளுக்கான முழு backtrace-ஐக் காட்டவும்.

வகை: `Boolean`<br />
இயல்பு: `true`

#### requireModule
ஏதேனும் ஆதரவு கோப்புகளைத் தேவைப்படுத்தும் முன் தொகுதிகளைத் தேவைப்படுத்துங்கள்.

வகை: `string[]`<br />
இயல்பு: `[]`<br />
உதாரணம்:

```js
cucumberOpts: {
    requireModule: ['@babel/register']
    // or
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
முதல் தோல்வியில் ஓட்டத்தை நிறுத்தவும்.

வகை: `boolean`<br />
இயல்பு: `false`

#### name
வெளிப்பாட்டுடன் பொருந்தும் பெயரைக் கொண்ட சிக்கல்களை மட்டும் இயக்கவும் (மீண்டும் செய்யக்கூடியது).

வகை: `RegExp[]`<br />
இயல்பு: `[]`

#### require
அம்சங்களைச் செயல்படுத்தும் முன் உங்கள் step definitions கொண்ட கோப்புகளைத் தேவைப்படுத்துங்கள். நீங்கள் உங்கள் step definitions-க்கு glob-ஐயும் குறிப்பிடலாம்.

வகை: `string[]`<br />
இயல்பு: `[]`
உதாரணம்:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import
ESM-க்காக உங்கள் ஆதரவு குறியீடு உள்ள இடங்களுக்கான பாதைகள்.

வகை: `String[]`<br />
இயல்பு: `[]`
உதாரணம்:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict
வரையறுக்கப்படாத அல்லது நிலுவையிலுள்ள எந்த படிகளும் இருந்தால் தோல்வியடையும்.

வகை: `boolean`<br />
இயல்பு: `false`

#### tags
வெளிப்பாட்டுடன் பொருந்தும் குறிச்சொற்களைக் கொண்ட அம்சங்கள் அல்லது சிக்கல்களை மட்டும் இயக்கவும்.
மேலும் விவரங்களுக்கு [Cucumber ஆவணங்களைப்](https://docs.cucumber.io/cucumber/api/#tag-expressions) பார்க்கவும்.

வகை: `String`<br />
இயல்பு: ``

#### timeout
Step definitions-க்கான நேர முடிவு மில்லிவினாடிகளில்.

வகை: `Number`<br />
இயல்பு: `30000`

#### retry
தோல்வியடையும் சோதனை வழக்குகளை எத்தனை முறை மறுமுயற்சி செய்ய வேண்டும் என்பதைக் குறிப்பிடவும்.

வகை: `Number`<br />
இயல்பு: `0`

#### retryTagFilter
வெளிப்பாட்டுடன் பொருந்தும் குறிச்சொற்களைக் கொண்ட அம்சங்கள் அல்லது சிக்கல்களை மட்டுமே மீண்டும் முயற்சிக்கவும் (மீண்டும் செய்யக்கூடியது). இந்த விருப்பத்திற்கு '--retry' குறிப்பிடப்பட வேண்டும்.

வகை: `RegExp`

#### language
உங்கள் அம்ச கோப்புகளுக்கான இயல்பு மொழி

வகை: `String`<br />
இயல்பு: `en`

#### order
சோதனைகளை வரையறுக்கப்பட்ட / சீரற்ற வரிசையில் இயக்கவும்

வகை: `String`<br />
இயல்பு: `defined`

#### format
பயன்படுத்த வடிவமைப்பாளரின் பெயர் மற்றும் வெளியீட்டு கோப்பு பாதை.
WebdriverIO முதன்மையாக ஒரு கோப்பில் வெளியீட்டை எழுதும் [Formatters](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md) மட்டுமே ஆதரிக்கிறது.

வகை: `string[]`<br />

#### formatOptions
வடிவமைப்பாளர்களுக்கு வழங்க வேண்டிய விருப்பங்கள்

வகை: `object`<br />

#### tagsInTitle
அம்சம் அல்லது சிக்கல் பெயருக்கு cucumber tags சேர்க்கவும்

வகை: `Boolean`<br />
இயல்பு: `false`

***இது ஒரு @wdio/cucumber-framework-குறிப்பிட்ட விருப்பம் என்பதையும், cucumber-js-ஆல் அங்கீகரிக்கப்படவில்லை என்பதையும் நினைவில் கொள்ளவும்***<br/>

#### ignoreUndefinedDefinitions
வரையறுக்கப்படாத வரையறைகளை எச்சரிக்கைகளாக நடத்துங்கள்.

வகை: `Boolean`<br />
இயல்பு: `false`

***இது ஒரு @wdio/cucumber-framework-குறிப்பிட்ட விருப்பம் என்பதையும், cucumber-js-ஆல் அங்கீகரிக்கப்படவில்லை என்பதையும் நினைவில் கொள்ளவும்***<br/>

#### failAmbiguousDefinitions
தெளிவற்ற வரையறைகளை பிழைகளாக நடத்துங்கள்.

வகை: `Boolean`<br />
இயல்பு: `false`

***இது ஒரு @wdio/cucumber-framework-குறிப்பிட்ட விருப்பம் என்பதையும், cucumber-js-ஆல் அங்கீகரிக்கப்படவில்லை என்பதையும் நினைவில் கொள்ளவும்***<br/>

#### tagExpression
வெளிப்பாட்டுடன் பொருந்தும் குறிச்சொற்களைக் கொண்ட அம்சங்கள் அல்லது சிக்கல்களை மட்டும் இயக்கவும்.
மேலும் விவரங்களுக்கு [Cucumber ஆவணங்களைப்](https://docs.cucumber.io/cucumber/api/#tag-expressions) பார்க்கவும்.

வகை: `String`<br />
இயல்பு: ``

***இந்த விருப்பம் எதிர்காலத்தில் மறுபயனாக்கப்படும் என்பதை நினைவில் கொள்ளவும். அதற்கு பதிலாக [`tags`](#tags) config property-ஐப் பயன்படுத்தவும்***

#### profile
பயன்படுத்த வேண்டிய சுயவிவரத்தைக் குறிப்பிடவும்.

வகை: `string[]`<br />
இயல்பு: `[]`

***`cucumberOpts` முன்னுரிமையைக் கொண்டிருப்பதால், சுயவிவரங்களுக்குள் குறிப்பிட்ட மதிப்புகள் (worldParameters, name, retryTagFilter) மட்டுமே ஆதரிக்கப்படுகின்றன என்பதை கவனமாக கவனிக்கவும். கூடுதலாக, ஒரு சுயவிவரத்தைப் பயன்படுத்தும்போது, குறிப்பிடப்பட்ட மதிப்புகள் `cucumberOpts`-க்குள் அறிவிக்கப்படவில்லை என்பதை உறுதிசெய்து கொள்ளுங்கள்.***

### Cucumber-இல் சோதனைகளைத் தவிர்த்தல்

`cucumberOpts` இல் கிடைக்கும் வழக்கமான cucumber சோதனை வடிகட்டல் திறன்களைப் பயன்படுத்தி ஒரு சோதனையைத் தவிர்க்க விரும்பினால், நீங்கள் உள்ளமைவில் உள்ள அனைத்து உலாவிகள் மற்றும் சாதனங்களுக்கும் அதைச் செய்வீர்கள் என்பதை கவனிக்கவும். தேவைப்பட்டால் ஒரு அமர்வைத் தொடங்காமல் குறிப்பிட்ட திறன்கள் சேர்க்கைகளுக்கு மட்டும் சிக்கல்களைத் தவிர்க்க முடியும்படி, webdriverio cucumber-க்கான பின்வரும் குறிப்பிட்ட குறிச்சொல் தொடரியலை வழங்குகிறது:

`@skip([condition])`

condition என்பது, **அனைத்தும்** பொருந்தும்போது, குறிக்கப்பட்ட சிக்கல் அல்லது அம்சத்தைத் தவிர்க்க காரணமாகும் capabilities பண்புகளின் விருப்பமான சேர்க்கை ஆகும். நிச்சயமாக நீங்கள் பல்வேறு நிபந்தனைகளின் கீழ் ஒரு சோதனைகளைத் தவிர்க்க, சிக்கல்கள் மற்றும் அம்சங்களுக்கு பல குறிச்சொற்களைச் சேர்க்கலாம்.

'tagExpression'-ஐ மாற்றாமல் சோதனைகளைத் தவிர்க்க '@skip' annotation-ஐயும் பயன்படுத்தலாம். இந்த நிகழ்வில் தவிர்க்கப்பட்ட சோதனைகள் சோதனை அறிக்கையில் காட்டப்படும்.

இந்த தொடரியலுக்கான சில உதாரணங்கள் இங்கே உள்ளன:
- `@skip` அல்லது `@skip()`: குறிக்கப்பட்ட உருப்படியை எப்போதும் தவிர்க்கும்
- `@skip(browserName="chrome")`: chrome உலாவிகளுக்கு எதிராக சோதனை இயக்கப்படாது.
- `@skip(browserName="firefox";platformName="linux")`: லினக்ஸ் இயக்கங்களில் firefox-இல் சோதனையைத் தவிர்க்கும்.
- `@skip(browserName=["chrome","firefox"])`: குறிக்கப்பட்ட உருப்படிகள் chrome மற்றும் firefox உலாவிகள் இரண்டிலும் தவிர்க்கப்படும்.
- `@skip(browserName=/i.*explorer/)`: regexp-உடன் பொருந்தும் உலாவிகள் கொண்ட திறன்கள் தவிர்க்கப்படும் (போன்ற `iexplorer`, `internet explorer`, `internet-explorer`, ...).

### Step Definition Helper ஐ இறக்குமதி செய்தல்

`Given`, `When` அல்லது `Then` போன்ற step definition helper அல்லது hooks-ஐப் பயன்படுத்த, நீங்கள் அவற்றை `@cucumber/cucumber`-இலிருந்து இறக்குமதி செய்ய வேண்டும், எ.கா. இப்படி:

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

இப்போது, WebdriverIO-வுடன் தொடர்பில்லாத பிற வகையான சோதனைகளுக்கு நீங்கள் ஏற்கனவே ஒரு குறிப்பிட்ட பதிப்பைப் பயன்படுத்தும் Cucumber-ஐப் பயன்படுத்தினால், உங்கள் e2e சோதனைகளில் இந்த helpers-ஐ WebdriverIO Cucumber தொகுப்பிலிருந்து இறக்குமதி செய்ய வேண்டும், எ.கா.:

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

இது WebdriverIO திட்டரூபத்திற்குள் நீங்கள் சரியான helpers-ஐப் பயன்படுத்துவதை உறுதிசெய்கிறது மற்றும் பிற வகையான சோதனைகளுக்கு ஒரு சுயாதீன Cucumber பதிப்பைப் பயன்படுத்த அனுமதிக்கிறது.

### அறிக்கையை வெளியிடுதல்

Cucumber உங்கள் சோதனை ஓட்ட அறிக்கைகளை `https://reports.cucumber.io/` இல் வெளியிடுவதற்கான அம்சத்தை வழங்குகிறது, இது `cucumberOpts` இல் `publish` கொடியை அமைப்பதன் மூலமாகவோ அல்லது `CUCUMBER_PUBLISH_TOKEN` சூழல் மாறியை உள்ளமைப்பதன் மூலமாகவோ கட்டுப்படுத்தப்படலாம். இருப்பினும், சோதனை நிறைவேற்றத்திற்கு `WebdriverIO` ஐப் பயன்படுத்தும்போது, இந்த அணுகுமுறையில் ஒரு வரம்பு உள்ளது. இது ஒவ்வொரு அம்ச கோப்புக்காகவும் தனித்தனியாக அறிக்கைகளைப் புதுப்பிக்கிறது, இது ஒரு ஒருங்கிணைந்த அறிக்கையைப் பார்ப்பதை கடினமாக்குகிறது.

இந்த வரம்பை சமாளிக்க, `@wdio/cucumber-framework` க்குள் `publishCucumberReport` என்ற promise அடிப்படையிலான முறையை அறிமுகப்படுத்தியுள்ளோம். இந்த முறையை `onComplete` hook இல் அழைக்க வேண்டும், இது அதை அழைப்பதற்கான சிறந்த இடமாகும். `publishCucumberReport` cucumber செய்தி அறிக்கைகள் சேமிக்கப்படும் அறிக்கை அடைவின் உள்ளீட்டைத் தேவைப்படுகிறது.

உங்கள் `cucumberOpts` இல் `format` விருப்பத்தை உள்ளமைப்பதன் மூலம் நீங்கள் `cucumber செய்தி` அறிக்கைகளை உருவாக்கலாம். அறிக்கைகளை மேலெழுதுவதைத் தடுக்க மற்றும் ஒவ்வொரு சோதனை ஓட்டமும் துல்லியமாக பதிவு செய்யப்படுவதை உறுதிசெய்ய `cucumber செய்தி` format விருப்பத்திற்குள் ஒரு dynamic கோப்பு பெயரை வழங்குவது பெரிதும் பரிந்துரைக்கப்படுகிறது.

இந்த செயல்பாட்டைப் பயன்படுத்துவதற்கு முன், பின்வரும் சூழல் மாறிகளை அமைக்கவும்:
- CUCUMBER_PUBLISH_REPORT_URL: நீங்கள் Cucumber அறிக்கையை வெளியிட விரும்பும் URL. வழங்கப்படவில்லை என்றால், இயல்பு URL 'https://messages.cucumber.io/api/reports' பயன்படுத்தப்படும்.
- CUCUMBER_PUBLISH_REPORT_TOKEN: அறிக்கையை வெளியிட தேவையான அங்கீகார டோக்கன். இந்த டோக்கன் அமைக்கப்படவில்லை என்றால், செயல்பாடு அறிக்கையை வெளியிடாமல் வெளியேறும்.

அமலாக்கத்திற்கான தேவையான உள்ளமைவுகள் மற்றும் குறியீடு மாதிரிகளின் உதாரணம் இங்கே:

```javascript
import { v4 as uuidv4 } from 'uuid'
import { publishCucumberReport } from '@wdio/cucumber-framework';

export const config = {
    // ... Other Configuration Options
    cucumberOpts: {
        // ... Cucumber Options Configuration
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

`./reports/` என்பது `cucumber செய்தி` அறிக்கைகள் சேமிக்கப்படும் அடைவு என்பதை நினைவில் கொள்ளவும்.

## Serenity/JS ஐப் பயன்படுத்துதல்

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) என்பது சிக்கலான மென்பொருள் அமைப்புகளின் ஏற்பு மற்றும் பின்னோக்கி சோதனைகளை வேகமாகவும், கூடுதல் ஒத்துழைப்புடனும், அளவிடவும் எளிதாக்கவும் வடிவமைக்கப்பட்ட ஒரு திறந்த மூல திட்டரூபமாகும்.

WebdriverIO சோதனை தொகுப்புகளுக்கு, Serenity/JS பின்வருவனவற்றை வழங்குகிறது:
- [Enhanced Reporting](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) - உங்கள் திட்டத்தின் ஆழமான சோதனை நிறைவேற்ற அறிக்கைகள் மற்றும் உயிருள்ள ஆவணங்களை உருவாக்க நீங்கள் உள்ளமைக்கப்பட்ட எந்த WebdriverIO திட்டரூபத்திற்கும் Serenity/JS-ஐ drop-in மாற்றாகப் பயன்படுத்தலாம்.
- [Screenplay Pattern APIs](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - உங்கள் சோதனை குறியீட்டை திட்டங்கள் மற்றும் குழுக்களில் சுமக்கக்கூடியதாகவும் மீண்டும் பயன்படுத்தக்கூடியதாகவும் மாற்ற, Serenity/JS உங்களுக்கு உள்ளார்ந்த WebdriverIO APIs மீது ஒரு விருப்பமான [abstraction layer](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io) வழங்குகிறது.
- [Integration Libraries](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) - Screenplay Pattern பின்பற்றும் சோதனை தொகுப்புகளுக்கு, [API சோதனைகள்](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io) எழுத, [உள்ளூர் சேவையகங்களை நிர்வகிக்க](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io), [உறுதிப்பாடுகளை செய்ய](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io), மற்றும் மேலும் பலவற்றிற்கு உதவ Serenity/JS விருப்பமான ஒருங்கிணைப்பு நூலகங்களையும் வழங்குகிறது!

![Serenity BDD Report Example](/img/serenity-bdd-reporter.png)

### Serenity/JS ஐ நிறுவுதல்

[ஏற்கனவே உள்ள WebdriverIO திட்டத்தில்](https://webdriver.io/docs/gettingstarted) Serenity/JS சேர்க்க, பின்வரும் Serenity/JS தொகுதிகளை NPM-இலிருந்து நிறுவவும்:

```sh npm2yarn
npm install @serenity-js/{core,web,webdriverio,assertions,console-reporter,serenity-bdd} --save-dev
```

Serenity/JS தொகுதிகளைப் பற்றி மேலும் அறிய:
- [`@serenity-js/core`](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/web`](https://serenity-js.org/api/web/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/webdriverio`](https://serenity-js.org/api/webdriverio/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/assertions`](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/console-reporter`](https://serenity-js.org/api/console-reporter/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)

### Serenity/JS ஐ உள்ளமைத்தல்

Serenity/JS உடனான ஒருங்கிணைப்பை இயக்க, WebdriverIO-வை பின்வருமாறு உள்ளமைக்கவும்:

<Tabs>
<TabItem value="wdio-conf-typescript" label="TypeScript" default>

```typescript title="wdio.conf.ts"
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

export const config: WebdriverIOConfig = {

    // Tell WebdriverIO to use Serenity/JS framework
    framework: '@serenity-js/webdriverio',

    // Serenity/JS configuration
    serenity: {
        // Configure Serenity/JS to use the appropriate adapter for your test runner
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Register Serenity/JS reporting services, a.k.a. the "stage crew"
        crew: [
            // Optional, print test execution results to standard output
            '@serenity-js/console-reporter',

            // Optional, produce Serenity BDD reports and living documentation (HTML)
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // Optional, automatically capture screenshots upon interaction failure
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Configure your Cucumber runner
    cucumberOpts: {
        // see Cucumber configuration options below
    },


    // ... or Jasmine runner
    jasmineOpts: {
        // see Jasmine configuration options below
    },

    // ... or Mocha runner
    mochaOpts: {
        // see Mocha configuration options below
    },

    runner: 'local',

    // Any other WebdriverIO configuration
};
```

</TabItem>
<TabItem value="wdio-conf-javascript" label="JavaScript">

```typescript title="wdio.conf.js"
export const config = {

    // Tell WebdriverIO to use Serenity/JS framework
    framework: '@serenity-js/webdriverio',

    // Serenity/JS configuration
    serenity: {
        // Configure Serenity/JS to use the appropriate adapter for your test runner
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Register Serenity/JS reporting services, a.k.a. the "stage crew"
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Configure your Cucumber runner
    cucumberOpts: {
        // see Cucumber configuration options below
    },


    // ... or Jasmine runner
    jasmineOpts: {
        // see Jasmine configuration options below
    },

    // ... or Mocha runner
    mochaOpts: {
        // see Mocha configuration options below
    },

    runner: 'local',

    // Any other WebdriverIO configuration
};
```

</TabItem>
</Tabs>

இவற்றைப் பற்றி மேலும் அறிக:
- [Serenity/JS Cucumber உள்ளமைவு விருப்பங்கள்](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Serenity/JS Jasmine உள்ளமைவு விருப்பங்கள்](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Serenity/JS Mocha உள்ளமைவு விருப்பங்கள்](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [WebdriverIO உள்ளமைவு கோப்பு](configurationfile)

### Serenity BDD அறிக்கைகளையும் உயிருள்ள ஆவணங்களையும் உருவாக்குதல்

[Serenity BDD அறிக்கைகள் மற்றும் உயிருள்ள ஆவணங்கள்](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports) [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli) மூலம் உருவாக்கப்படுகின்றன, இது [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io) தொகுதியால் பதிவிறக்கம் செய்யப்பட்டு நிர்வகிக்கப்படும் ஒரு Java நிரல்.

Serenity BDD அறிக்கைகளை உருவாக்க, உங்கள் சோதனை தொகுப்பு செய்ய வேண்டியவை:
- Serenity BDD CLI ஐப் பதிவிறக்கவும், `serenity-bdd update` என அழைப்பதன் மூலம், இது CLI `jar` ஐ உள்ளூரில் தற்காலிகமாக சேமிக்கிறது
- இடைநிலை Serenity BDD `.json` அறிக்கைகளை உருவாக்கவும், [உள்ளமைவு வழிமுறைகளின்படி](#configuring-serenityjs) [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) பதிவு செய்வதன் மூலம்
- நீங்கள் அறிக்கையை உருவாக்க விரும்பும்போது, Serenity BDD CLI ஐ அழைக்கவும், `serenity-bdd run` என அழைப்பதன் மூலம்

அனைத்து [Serenity/JS திட்ட Template-களாலும்](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio) பயன்படுத்தப்படும் முறை பின்வருவனவற்றைப் பயன்படுத்துவதை சார்ந்துள்ளது:
- Serenity BDD CLI பதிவிறக்க [`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order) NPM script
- சோதனை தொகுப்பு தோல்வியடைந்திருந்தாலும் (நீங்கள் சோதனை அறிக்கைகளை அதிகமாகத் தேவைப்படும் சரியான நேரத்தில்...) அறிக்கையிடும் செயல்முறையை இயக்க [`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe)
- முந்தைய இயக்கத்திலிருந்து மீதமுள்ள எந்த சோதனை அறிக்கைகளையும் நீக்குவதற்கான வசதி முறையாக [`rimraf`](https://www.npmjs.com/package/rimraf)

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

`SerenityBDDReporter` பற்றி மேலும் அறிய, தயவுசெய்து இவற்றைப் பார்க்கவும்:
- [`@serenity-js/serenity-bdd` ஆவணங்களில்](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io) நிறுவல் வழிமுறைகள்,
- [`SerenityBDDReporter` API ஆவணங்களில்](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) உள்ளமைவு உதாரணங்கள்,
- [GitHub-இல் உள்ள Serenity/JS உதாரணங்கள்](https://github.com/serenity-js/serenity-js/tree/main/examples).

### Serenity/JS Screenplay Pattern APIs பயன்படுத்துதல்

[Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) என்பது உயர் தரமான தானியங்கி ஏற்பு சோதனைகளை எழுதுவதற்கான ஒரு புதுமையான, பயனர் மையமான அணுகுமுறையாகும். இது அடுக்குகளை திறம்பட பயன்படுத்துவதற்கு உங்களை வழிநடத்துகிறது, உங்கள் சோதனை சிக்கல்கள் உங்கள் டொமைனின் வணிக வார்த்தையாடலைக் கைப்பற்ற உதவுகிறது, மேலும் உங்கள் குழுவில் நல்ல சோதனை மற்றும் மென்பொருள் பொறியியல் பழக்கங்களை ஊக்குவிக்கிறது.

இயல்பாக, `@serenity-js/webdriverio`-ஐ உங்கள் WebdriverIO `framework`-ஆக பதிவு செய்யும்போது, Serenity/JS ஒரு இயல்புநிலை [cast](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io) of [actors](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io) உள்ளமைக்கப்படும், இதில் ஒவ்வொரு நடிகரும் செய்யக்கூடியவை:
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

இது ஏற்கனவே உள்ள சோதனை தொகுப்புக்கும் கூட Screenplay Pattern பின்பற்றும் சோதனை சிக்கல்களை அறிமுகப்படுத்துவதற்கு உங்களுக்கு உதவ போதுமானதாக இருக்க வேண்டும், எடுத்துக்காட்டாக:

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

Screenplay Pattern பற்றி மேலும் அறிய, இவற்றைப் பார்க்கவும்:
- [The Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Web testing with Serenity/JS](https://serenity-js.org/handbook/web-testing/?pk_campaign=wdio8&pk_source=webdriver.io)
- ["BDD in Action, Second Edition"](https://www.manning.com/books/bdd-in-action-second-edition)