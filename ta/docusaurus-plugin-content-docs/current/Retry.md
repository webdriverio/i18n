---
id: retry
title: பிடிவாதமான சோதனைகளை மறுசோதனை செய்தல்
---

WebdriverIO டெஸ்ட்ரன்னர் மூலம் சில குறிப்பிட்ட சோதனைகளை மீண்டும் இயக்கலாம், குறிப்பாக பிடிவாதமான நெட்வொர்க் அல்லது ரேஸ் நிலைகள் போன்ற காரணங்களால் அவை நிலையற்றதாக மாறினால். (இருப்பினும், சோதனைகள் நிலையற்றதாக மாறும்போது வெறுமனே மறுசோதனை விகிதத்தை அதிகரிப்பது பரிந்துரைக்கப்படவில்லை!)

## Mocha இல் சோதனை தொகுப்புகளை மறுசோதனை செய்தல்

Mocha இன் பதிப்பு 3 முதல், முழு சோதனை தொகுப்புகளை மீண்டும் இயக்கலாம் (ஒரு `describe` பிளாக்கிற்குள் உள்ள எல்லாம்). Mocha பயன்படுத்துகிறீர்கள் எனில், குறிப்பிட்ட சோதனை பிளாக்குகளை மட்டுமே மீண்டும் இயக்க அனுமதிக்கும் WebdriverIO செயல்முறைக்கு பதிலாக இந்த மறுசோதனை நுட்பத்தை முன்னுரிமைப்படுத்த வேண்டும் (ஒரு `it` பிளாக்கிற்குள் உள்ள எல்லாம்). `this.retries()` முறையைப் பயன்படுத்த, சோதனை தொகுப்பு பிளாக் `describe` ஆனது [Mocha ஆவணங்களில்](https://mochajs.org/#arrow-functions) விவரிக்கப்பட்டுள்ளபடி, arrow function `() => {}` க்கு பதிலாக unbound function `function(){}` ஐப் பயன்படுத்த வேண்டும். Mocha பயன்படுத்தி, உங்கள் `wdio.conf.js` இல் `mochaOpts.retries` பயன்படுத்தி அனைத்து specs க்கும் மறுசோதனை எண்ணிக்கையை அமைக்கலாம்.

இதோ ஒரு உதாரணம்:

```js
describe('retries', function () {
    // Retry all tests in this suite up to 4 times
    this.retries(4)

    beforeEach(async () => {
        await browser.url('http://www.yahoo.com')
    })

    it('should succeed on the 3rd try', async function () {
        // Specify this test to only retry up to 2 times
        this.retries(2)
        console.log('run')
        await expect($('.foo')).toBeDisplayed()
    })
})
```

## Jasmine அல்லது Mocha இல் தனிப்பட்ட சோதனைகளை மறுசோதனை செய்தல்

ஒரு குறிப்பிட்ட சோதனை பிளாக்கை மீண்டும் இயக்க, சோதனை பிளாக் செயல்பாட்டிற்குப் பிறகு கடைசி அளவுருவாக மறுசோதனைகளின் எண்ணிக்கையைப் பயன்படுத்தலாம்:

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
  ]
}>
<TabItem value="mocha">

```js
describe('my flaky app', () => {
    /**
     * spec that runs max 4 times (1 actual run + 3 reruns)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // returns number of retries
        // ...
    }, 3)
})
```

இது hooks க்கும் செயல்படுகிறது:

```js
describe('my flaky app', () => {
    /**
     * hook that runs max 2 times (1 actual run + 1 rerun)
     */
    beforeEach(async () => {
        // ...
    }, 1)

    // ...
})
```

</TabItem>
<TabItem value="jasmine">

```js
describe('my flaky app', () => {
    /**
     * spec that runs max 4 times (1 actual run + 3 reruns)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // returns number of retries
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 3)
})
```

இது hooks க்கும் செயல்படுகிறது:

```js
describe('my flaky app', () => {
    /**
     * hook that runs max 2 times (1 actual run + 1 rerun)
     */
    beforeEach(async () => {
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 1)

    // ...
})
```

நீங்கள் Jasmine ஐப் பயன்படுத்தினால், இரண்டாவது அளவுரு timeout க்காக ஒதுக்கப்பட்டுள்ளது. மறுசோதனை அளவுருவைப் பயன்படுத்த, timeout ஐ அதன் இயல்புநிலை மதிப்பு `jasmine.DEFAULT_TIMEOUT_INTERVAL` க்கு அமைத்து, பின்னர் உங்கள் மறுசோதனை எண்ணிக்கையைப் பயன்படுத்த வேண்டும்.

</TabItem>
</Tabs>

இந்த மறுசோதனை நுட்பம் தனிப்பட்ட hooks அல்லது சோதனை பிளாக்குகளை மட்டுமே மீண்டும் இயக்க அனுமதிக்கிறது. உங்கள் சோதனையுடன் உங்கள் பயன்பாட்டை அமைக்க ஒரு hook இருந்தால், இந்த hook இயக்கப்படவில்லை. [Mocha வழங்குகிறது](https://mochajs.org/#retry-tests) இந்த நடத்தையை வழங்கும் native சோதனை மறுசோதனைகள், ஆனால் Jasmine வழங்கவில்லை. `afterTest` hook இல் செயல்படுத்தப்பட்ட மறுசோதனைகளின் எண்ணிக்கையை அணுகலாம்.

## Cucumber இல் மறுசோதனை செய்தல்

### Cucumber இல் முழு சோதனை தொகுப்புகளை மறுசோதனை செய்தல்

Cucumber >=6 க்கு, நீங்கள் தோல்வியடையும் அனைத்து அல்லது சில scenarios களை வெற்றி பெறும் வரை கூடுதல் மறுசோதனைகள் பெற [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) கட்டமைப்பு விருப்பத்தை `retryTagFilter` விருப்ப அளவுருவுடன் வழங்கலாம். இந்த அம்சம் செயல்பட, நீங்கள் `scenarioLevelReporter` ஐ `true` க்கு அமைக்க வேண்டும்.

### Cucumber இல் Step Definitions மறுசோதனை செய்தல்

ஒரு குறிப்பிட்ட step definition க்கான மறுசோதனை விகிதத்தை வரையறுக்க, அதற்கு retry விருப்பத்தைப் பயன்படுத்தவும், போன்ற:

```js
export default function () {
    /**
     * step definition that runs max 3 times (1 actual run + 2 reruns)
     */
    this.Given(/^some step definition$/, { wrapperOptions: { retry: 2 } }, async () => {
        // ...
    })
    // ...
})
```

மறுசோதனைகளை உங்கள் step definitions கோப்பில் மட்டுமே வரையறுக்க முடியும், உங்கள் feature கோப்பில் இல்லை.

## specfile அடிப்படையில் மறுசோதனைகளைச் சேர்த்தல்

முன்பு, சோதனை மற்றும் சூட்-நிலை மறுசோதனைகள் மட்டுமே கிடைத்தன, அவை பெரும்பாலான சந்தர்ப்பங்களில் சரியாக உள்ளன.

ஆனால் நிலை சம்பந்தப்பட்ட எந்த சோதனைகளிலும் (சர்வரில் அல்லது தரவுத்தளத்தில் போன்றவை) முதல் சோதனை தோல்வியடைந்த பிறகு நிலை செல்லாததாக விடப்படலாம். அவை தொடங்கும் செல்லாத நிலை காரணமாக, அடுத்தடுத்த மறுசோதனைகள் வெற்றி பெறுவதற்கான வாய்ப்பு இல்லாமல் போகலாம்.

ஒவ்வொரு specfile க்கும் ஒரு புதிய `browser` instance உருவாக்கப்படுகிறது, இது வேறு எந்த நிலைகளையும் (சர்வர், தரவுத்தளங்கள்) hook செய்து அமைக்க இது ஒரு சிறந்த இடமாக உள்ளது. இந்த நிலையில் மறுசோதனைகள் என்பது முழு அமைப்பு செயல்முறையும் வெறுமனே புதிய specfile க்கு இருப்பதைப் போலவே மீண்டும் செய்யப்படும்.

```js title="wdio.conf.js"
export const config = {
    // ...
    /**
     * The number of times to retry the entire specfile when it fails as a whole
     */
    specFileRetries: 1,
    /**
     * Delay in seconds between the spec file retry attempts
     */
    specFileRetriesDelay: 0,
    /**
     * Retried specfiles are inserted at the beginning of the queue and retried immediately
     */
    specFileRetriesDeferred: false
}
```

## ஒரு குறிப்பிட்ட சோதனையை பல முறை இயக்கவும்

கோட்பேஸில் பிடிவாதமான சோதனைகள் அறிமுகப்படுத்தப்படுவதைத் தடுக்க இது உதவுகிறது. `--repeat` cli விருப்பத்தைச் சேர்ப்பதன் மூலம், குறிப்பிட்ட specs அல்லது suites களை N முறை இயக்கும். இந்த cli flag ஐப் பயன்படுத்தும்போது, `--spec` அல்லது `--suite` flag ஐயும் குறிப்பிட வேண்டும்.

CI/CD செயல்முறை மூலம் கோட்பேஸுக்கு புதிய சோதனைகளைச் சேர்க்கும்போது, சோதனைகள் தேர்ச்சி பெற்று இணைக்கப்படலாம், ஆனால் பின்னர் பிடிவாதமாக மாறலாம். இந்த பிடிவாதத்தன்மை நெட்வொர்க் சிக்கல்கள், சர்வர் சுமை, தரவுத்தள அளவு போன்ற பல விஷயங்களிலிருந்து வரலாம். உங்கள் CD/CD செயல்முறையில் `--repeat` flag ஐப் பயன்படுத்துவது, இந்த பிடிவாதமான சோதனைகள் முக்கிய கோட்பேஸுடன் இணைக்கப்படுவதற்கு முன் அவற்றைக் கண்டுபிடிக்க உதவும்.

பயன்படுத்த ஒரு உத்தி என்னவென்றால், உங்கள் CI/CD செயல்முறையில் உங்கள் சோதனைகளை வழக்கமான போல் இயக்கலாம், ஆனால் நீங்கள் ஒரு புதிய சோதனையை அறிமுகப்படுத்தினால், `--spec` இல் குறிப்பிடப்பட்ட புதிய specக்குடன் `--repeat` உடன் இன்னொரு தொகுப்பு சோதனைகளை இயக்கலாம், இதனால் அது புதிய சோதனையை x முறை இயக்கும். சோதனை எந்த நேரத்திலும் தோல்வியடைந்தால், அது ஏன் தோல்வியடைந்தது என்பதை ஆராய வேண்டியிருக்கும் மற்றும் சோதனை இணைக்கப்படாது.

```sh
# This will run the example.e2e.js spec 5 times
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```