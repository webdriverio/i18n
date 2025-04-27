---
id: timeouts
title: டைம்அவுட்கள்
---

ஒவ்வொரு WebdriverIO கட்டளையும் ஒரு அசைங்கரோனஸ் செயல்பாடாகும். செலினியம் சேவையகத்திற்கு (அல்லது [Sauce Labs](https://saucelabs.com) போன்ற கிளவுட் சேவைக்கு) ஒரு கோரிக்கை அனுப்பப்படுகிறது, மற்றும் அதன் பதில் செயல் முடிந்ததும் அல்லது தோல்வியடைந்ததும் முடிவைக் கொண்டிருக்கும்.

எனவே, நேரம் முழு சோதனை செயல்முறையிலும் ஒரு முக்கியமான கூறாகும். ஒரு குறிப்பிட்ட செயல் வேறொரு செயலின் நிலையைச் சார்ந்திருக்கும்போது, அவை சரியான வரிசையில் செயல்படுத்தப்படுகின்றன என்பதை உறுதிசெய்ய வேண்டும். இந்த சிக்கல்களைக் கையாளும்போது டைம்அவுட்கள் ஒரு முக்கிய பங்கு வகிக்கின்றன.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## WebDriver டைம்அவுட்கள்

### அமர்வு ஸ்கிரிப்ட் டைம்அவுட்

ஒரு அமர்வானது அசைங்கரோனஸ் ஸ்கிரிப்ட்கள் இயங்க காத்திருக்க வேண்டிய நேரத்தைக் குறிப்பிடும் அமர்வு ஸ்கிரிப்ட் டைம்அவுட்டைக் கொண்டுள்ளது. வேறு விதமாகக் குறிப்பிடப்படாவிட்டால், இது 30 வினாடிகள். இந்த டைம்அவுட்டை இவ்வாறு அமைக்கலாம்:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.executeAsync((done) => {
    console.log('this should not fail')
    setTimeout(done, 59000)
})
```

### அமர்வு பக்க ஏற்றுதல் டைம்அவுட்

ஒரு அமர்வானது பக்க ஏற்றுதல் முடிவடைய காத்திருக்க வேண்டிய நேரத்தைக் குறிப்பிடும் அமர்வு பக்க ஏற்றுதல் டைம்அவுட்டைக் கொண்டுள்ளது. வேறு விதமாகக் குறிப்பிடப்படாவிட்டால், இது 300,000 மில்லிவினாடிகள்.

இந்த டைம்அவுட்டை இவ்வாறு அமைக்கலாம்:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> `pageLoad` கீவோர்டு அதிகாரப்பூர்வ WebDriver [விவரக்குறிப்பின்](https://www.w3.org/TR/webdriver/#set-timeouts) ஒரு பகுதியாகும், ஆனால் உங்கள் உலாவியால் [ஆதரிக்கப்படாமல்](https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/687) இருக்கலாம் (முந்தைய பெயர் `page load`).

### அமர்வு மறைமுக காத்திருப்பு டைம்அவுட்

ஒரு அமர்வானது தொடர்புடைய அமர்வு மறைமுக காத்திருப்பு டைம்அவுட்டைக் கொண்டுள்ளது. இது [`findElement`](/docs/api/webdriver#findelement) அல்லது [`findElements`](/docs/api/webdriver#findelements) கட்டளைகளைப் ([`$`](/docs/api/browser/$) அல்லது [`$$`](/docs/api/browser/$$), முறையே, WebdriverIO-ஐ WDIO டெஸ்ட்ரன்னருடன் அல்லது இல்லாமல் இயக்கும்போது) பயன்படுத்தி உறுப்புகளைக் கண்டறியும் போது மறைமுக உறுப்பு இருப்பிட உத்திக்காகக் காத்திருக்க வேண்டிய நேரத்தைக் குறிப்பிடுகிறது. வேறு விதமாகக் குறிப்பிடப்படாவிட்டால், இது 0 மில்லிவினாடிகள்.

இந்த டைம்அவுட்டை இவ்வாறு அமைக்கலாம்:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## WebdriverIO தொடர்பான டைம்அவுட்கள்

### `WaitFor*` டைம்அவுட்

WebdriverIO உறுப்புகள் ஒரு குறிப்பிட்ட நிலையை அடைய காத்திருக்க பல கட்டளைகளை வழங்குகிறது (எ.கா. செயல்படுத்தப்பட்டது, காணக்கூடியது, இருப்பது). இந்த கட்டளைகள் ஒரு தேர்வி மற்றும் ஒரு டைம்அவுட் எண்ணை எடுத்துக்கொள்கின்றன, அந்த உறுப்பு அந்த நிலையை அடைய நிகழ்வு எவ்வளவு நேரம் காத்திருக்க வேண்டும் என்பதை தீர்மானிக்கிறது. `waitforTimeout` விருப்பம் அனைத்து `waitFor*` கட்டளைகளுக்கும் உலகளாவிய டைம்அவுட்டை அமைக்க அனுமதிக்கிறது, எனவே ஒரே டைம்அவுட்டை மீண்டும் மீண்டும் அமைக்க வேண்டியதில்லை. _(சிறிய எழுத்து `f`-ஐ கவனிக்கவும்!)_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

உங்கள் சோதனைகளில், இப்போது இதைச் செய்யலாம்:

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// தேவைப்பட்டால் இயல்புநிலை டைம்அவுட்டை மாற்றமும் செய்யலாம்
await myElem.waitForDisplayed({ timeout: 10000 })
```

## ஃபிரேம்வொர்க் தொடர்பான டைம்அவுட்கள்

WebdriverIO உடன் நீங்கள் பயன்படுத்தும் சோதனை ஃபிரேம்வொர்க் டைம்அவுட்களைக் கையாள வேண்டும், குறிப்பாக அனைத்தும் அசைங்கரோனஸாக இருப்பதால். ஏதாவது தவறாகிவிட்டால் சோதனை செயல்முறை சிக்கிக்கொள்ளாமல் இருப்பதை உறுதிசெய்கிறது.

இயல்பாக, டைம்அவுட் 10 வினாடிகள், அதாவது ஒரு தனி சோதனை அதை விட அதிக நேரம் எடுக்கக்கூடாது.

Mocha-வில் ஒரு தனி சோதனை இவ்வாறு இருக்கும்:

```js
it('should login into the application', async () => {
    await browser.url('/login')

    const form = await $('form')
    const username = await $('#username')
    const password = await $('#password')

    await username.setValue('userXY')
    await password.setValue('******')
    await form.submit()

    expect(await browser.getTitle()).to.be.equal('Admin Area')
})
```

Cucumber-இல், டைம்அவுட் ஒரு தனி படி வரையறைக்குப் பொருந்தும். இருப்பினும், உங்கள் சோதனை இயல்புநிலை மதிப்பை விட அதிக நேரம் எடுப்பதால் டைம்அவுட்டை அதிகரிக்க விரும்பினால், அதை ஃபிரேம்வொர்க் விருப்பங்களில் அமைக்க வேண்டும்.

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
    {label: 'Cucumber', value: 'cucumber'}
  ]
}>
<TabItem value="mocha">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'mocha',
    mochaOpts: {
        timeout: 20000
    },
    // ...
}
```

</TabItem>
<TabItem value="jasmine">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'jasmine',
    jasmineOpts: {
        defaultTimeoutInterval: 20000
    },
    // ...
}
```

</TabItem>
<TabItem value="cucumber">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'cucumber',
    cucumberOpts: {
        timeout: 20000
    },
    // ...
}
```

</TabItem>
</Tabs>