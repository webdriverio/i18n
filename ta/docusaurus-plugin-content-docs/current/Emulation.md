---
id: emulation
title: எமுலேஷன்
---

WebdriverIO உடன், வலை API-களை [`emulate`](/docs/api/browser/emulate) கட்டளையைப் பயன்படுத்தி உருமாற்றம் செய்து, சில உலாவி நடத்தைகளை உருமாற்றம் செய்ய உதவும் தனிப்பயன் மதிப்புகளை திருப்பி அனுப்பலாம். இதற்கு உங்கள் பயன்பாடு இந்த API-களை வெளிப்படையாகப் பயன்படுத்த வேண்டும் என்பதை கவனிக்கவும்.

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

இந்த அம்சம் உலாவிக்கான WebDriver Bidi ஆதரவைத் தேவைப்படுத்துகிறது. Chrome, Edge மற்றும் Firefox இன் சமீபத்திய பதிப்புகள் அத்தகைய ஆதரவைக் கொண்டிருந்தாலும், Safari __இல்லை__. புதுப்பிப்புகளுக்கு [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/script/add_preload_script/add_preload_script.py?label=experimental&label=master&aligned) ஐப் பின்பற்றவும். மேலும், உலாவிகளை இயக்க கிளவுட் வெண்டரைப் பயன்படுத்தினால், உங்கள் வெண்டர் WebDriver Bidi ஐ ஆதரிக்கிறதா என்பதை உறுதிப்படுத்திக்கொள்ளவும்.

உங்கள் சோதனைக்கு WebDriver Bidi ஐ இயக்க, உங்கள் திறன்களில் `webSocketUrl: true` அமைக்கப்பட்டிருப்பதை உறுதிப்படுத்திக்கொள்ளவும்.

:::

## ஜியோலொகேஷன்

உலாவியின் புவியிடத்தை ஒரு குறிப்பிட்ட பகுதிக்கு மாற்றவும், எ.கா:

```ts
await browser.emulate('geolocation', {
    latitude: 52.52,
    longitude: 13.39,
    accuracy: 100
})
await browser.url('https://www.google.com/maps')
await browser.$('aria/Show Your Location').click()
await browser.pause(5000)
console.log(await browser.getUrl()) // outputs: "https://www.google.com/maps/@52.52,13.39,16z?entry=ttu"
```

இது [`navigator.geolocation.getCurrentPosition`](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) எவ்வாறு செயல்படுகிறது என்பதை மாற்றி, நீங்கள் வழங்கிய இருப்பிடத்தை திருப்பி அனுப்பும்.

## வண்ண திட்டம்

உலாவியின் இயல்புநிலை வண்ண திட்டத்தை மாற்றவும்:

```ts
await browser.emulate('colorScheme', 'light')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // outputs: "#efefef"

await browser.emulate('colorScheme', 'dark')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // outputs: "#000000"
```

இது [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) எவ்வாறு செயல்படுகிறது என்பதை மாற்றும், நீங்கள் `(prefers-color-scheme: dark)` மூலம் வண்ண திட்டத்தை வினவும்போது.

## பயனர் முகவர்

உலாவியின் பயனர் முகவரை வேறு சரநிலைக்கு மாற்றவும்:

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

இது [`navigator.userAgent`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgent) இன் மதிப்பை மாற்றும். உலாவி வழங்குநர்கள் படிப்படியாக பயனர் முகவரை ஒழித்துக் கொண்டிருக்கிறார்கள் என்பதை கவனிக்கவும்.

## onLine பண்பு

உலாவியின் ஆன்லைன் நிலையை மாற்றவும்:

```ts
await browser.emulate('onLine', false)
```

இது உலாவிக்கும் இணையத்திற்கும் இடையிலான நெட்வொர்க் போக்குவரத்தை __நிறுத்தாது__ மற்றும் [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine) இன் திருப்ப மதிப்பை மட்டுமே மாற்றும். உலாவியின் நெட்வொர்க் திறன்களை மாற்றுவதில் நீங்கள் ஆர்வமாக இருந்தால், [`throttleNetwork`](/docs/api/browser/throttleNetwork) கட்டளையைப் பார்க்கவும்.

## கடிகாரம்

நீங்கள் [`emulate`](/docs/emulation) கட்டளையைப் பயன்படுத்தி உலாவியின் சிஸ்டம் கடிகாரத்தை மாற்றலாம். இது நேரம் தொடர்பான உள்ளார்ந்த உலகளாவிய செயல்பாடுகளை மேலெழுதுகிறது, அவற்றை `clock.tick()` அல்லது விளைவிக்கப்பட்ட கடிகார பொருள் மூலம் ஒத்திசைவாகக் கட்டுப்படுத்த அனுமதிக்கிறது. இதில் கட்டுப்படுத்துவது அடங்கும்:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

கடிகாரம் யுனிக்ஸ் எபாக் (0 நேர முத்திரை) இல் தொடங்குகிறது. இதன் பொருள், `emulate` கட்டளைக்கு வேறு எந்த விருப்பங்களையும் நீங்கள் அனுப்பவில்லை என்றால், உங்கள் பயன்பாட்டில் புதிய தேதியை நிறுவும்போது, ஜனவரி 1, 1970 என்ற நேரத்தைக் கொண்டிருக்கும்.

##### உதாரணம்

`browser.emulate('clock', { ... })` ஐ அழைக்கும்போது, அது உடனடியாக தற்போதைய பக்கம் மற்றும் அனைத்து அடுத்த பக்கங்களுக்கும் உலகளாவிய செயல்பாடுகளை மேலெழுதும், எ.கா:

```ts
const clock = await browser.emulate('clock', { now: new Date(1989, 7, 4) })

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://webdriverio')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)"

await clock.restore()

console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"

await browser.url('https://guinea-pig.webdriver.io/pointer.html')
console.log(await browser.execute(() => (new Date()).toString()))
// returns "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)"
```

நீங்கள் [`setSystemTime`](/docs/api/clock/setSystemTime) அல்லது [`tick`](/docs/api/clock/tick) ஐ அழைப்பதன் மூலம் சிஸ்டம் நேரத்தை மாற்றலாம்.

`FakeTimerInstallOpts` பொருளில் பின்வரும் பண்புகள் இருக்கலாம்:

```ts
interface FakeTimerInstallOpts {
    // Installs fake timers with the specified unix epoch
    // @default: 0
    now?: number | Date | undefined;

    // An array with names of global methods and APIs to fake. By default, WebdriverIO
    // does not replace `nextTick()` and `queueMicrotask()`. For instance,
    // `browser.emulate('clock', { toFake: ['setTimeout', 'nextTick'] })` will fake only
    // `setTimeout()` and `nextTick()`
    toFake?: FakeMethod[] | undefined;

    // The maximum number of timers that will be run when calling runAll() (default: 1000)
    loopLimit?: number | undefined;

    // Tells WebdriverIO to increment mocked time automatically based on the real system
    // time shift (e.g. the mocked time will be incremented by 20ms for every 20ms change
    // in the real system time)
    // @default false
    shouldAdvanceTime?: boolean | undefined;

    // Relevant only when using with shouldAdvanceTime: true. increment mocked time by
    // advanceTimeDelta ms every advanceTimeDelta ms change in the real system time
    // @default: 20
    advanceTimeDelta?: number | undefined;

    // Tells FakeTimers to clear 'native' (i.e. not fake) timers by delegating to their
    // respective handlers. These are not cleared by default, leading to potentially
    // unexpected behavior if timers existed prior to installing FakeTimers.
    // @default: false
    shouldClearNativeTimers?: boolean | undefined;
}
```

## சாதனம்

`emulate` கட்டளை விரிதிரை, சாதன அளவிடும் காரணி மற்றும் பயனர் முகவரை மாற்றுவதன் மூலம் ஒரு குறிப்பிட்ட மொபைல் அல்லது டெஸ்க்டாப் சாதனத்தை உருமாற்றுவதையும் ஆதரிக்கிறது. டெஸ்க்டாப் உலாவி இயந்திரங்கள் மொபைல் இயந்திரங்களிலிருந்து வேறுபடுவதால், இது எந்த வகையிலும் மொபைல் சோதனைக்குப் பயன்படுத்தப்படக்கூடாது. இது சிறிய விரிதிரை அளவுகளுக்கான குறிப்பிட்ட நடத்தையை உங்கள் பயன்பாடு வழங்கினால் மட்டுமே பயன்படுத்தப்பட வேண்டும்.

எடுத்துக்காட்டாக, பயனர் முகவர் மற்றும் விரிதிரையை iPhone 15 க்கு மாற்ற, இயக்கவும்:

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// test your application ...

// reset to original viewport and user agent
await restore()
```

WebdriverIO [வரையறுக்கப்பட்ட அனைத்து சாதனங்களின்](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts) நிலையான பட்டியலை பராமரிக்கிறது.