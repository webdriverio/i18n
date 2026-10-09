---
id: emulation
title: எமுலேஷன்
description: "emulate கட்டளையைப் பயன்படுத்தி புவிஇருப்பிடம், மீடியா அம்சங்கள், பயனர் முகவர், நெட்வொர்க், மொழிச்சூழல், நேர மண்டலம், திரை மற்றும் சாதனங்களை எமுலேட் செய்யுங்கள்."
---

WebdriverIO மூலம் [`emulate`](/docs/api/browser/emulate) கட்டளையைப் பயன்படுத்தி உலாவியின் நடத்தையை எமுலேட் செய்யலாம். இந்தக் கட்டளை தற்போதைய உயர்நிலை உலாவல் சூழலுக்கான [WebDriver BiDi emulation module](https://w3c.github.io/webdriver-bidi/#module-emulation)-ஐ இயக்குகிறது. மாற்றம் உடனடியாகப் பொருந்தும். நீங்கள் பக்கத்தை மீண்டும் ஏற்ற வேண்டியதில்லை. `clock` மட்டும் விதிவிலக்கு: BiDi-யில் clock கட்டளை இல்லை, எனவே அந்த scope இன்னும் போலி டைமர்களை நிறுவுகிறது.

<LiteYouTubeEmbed
    id="2bQXzIB_97M"
    title="WebdriverIO Tutorials: The Emulate Command - Emulate Web APIs at Runtime with WebdriverIO"
/>

:::info

இந்த அம்சத்திற்கு உலாவியில் WebDriver Bidi ஆதரவு தேவை. Chrome, Edge மற்றும் Firefox-இன் சமீபத்திய பதிப்புகளில் அத்தகைய ஆதரவு உள்ளது, ஆனால் Safari-யில் __இல்லை__. புதுப்பிப்புகளுக்கு [wpt.fyi](https://wpt.fyi/results/webdriver/tests/bidi/emulation?label=experimental&label=master&aligned)-ஐப் பின்தொடருங்கள். மேலும், உலாவிகளை இயக்க நீங்கள் கிளவுட் விற்பனையாளரைப் பயன்படுத்தினால், உங்கள் விற்பனையாளரும் WebDriver Bidi-ஐ ஆதரிக்கிறாரா என்பதை உறுதிப்படுத்திக் கொள்ளுங்கள்.

உங்கள் சோதனைக்கு WebDriver Bidi-ஐ இயக்க, உங்கள் capabilities-இல் `webSocketUrl: true` அமைக்கப்பட்டுள்ளதை உறுதிசெய்யுங்கள்.

ஒரு கட்டளையைச் செயல்படுத்தாத உலாவி, அந்த அழைப்பை தனது சொந்தப் பிழையான `unknown command` அல்லது `unsupported operation` மூலம் நிராகரிக்கும். WebdriverIO அந்தப் பிழையைத் திருப்பி அனுப்பும். அது preload script அல்லது CDP-க்கு மாற்றாகச் செல்லாது.

:::

`emulate` அந்த scope-ஐ அழிக்கும் ஒரு செயல்பாட்டை (function) திருப்பி அனுப்புகிறது. [`browser.restore()`](/docs/api/browser/restore) செயலில் உள்ள அனைத்து scope-களையும், அல்லது நீங்கள் பட்டியலிடும் scope-களை அழிக்கிறது.

## புவிஇருப்பிடம் (Geolocation)

உலாவியின் புவிஇருப்பிடத்தை ஒரு குறிப்பிட்ட பகுதிக்கு மாற்றவும், எ.கா.:

```ts
await browser.emulate('geolocation', {
    latitude: 52.52,
    longitude: 13.39,
    accuracy: 100
})
await browser.setPermissions({ name: 'geolocation' }, 'granted')
await browser.url('https://www.google.com/maps')
await browser.$('aria/Show Your Location').click()
await browser.pause(5000)
console.log(await browser.getUrl()) // வெளியீடு: "https://www.google.com/maps/@52.52,13.39,16z?entry=ttu"
```

இது `getCurrentPosition` மற்றும் `watchPosition` உட்பட உலாவியின் புவிஇருப்பிட அமைப்பைப் பயன்படுத்துகிறது. எடுத்துக்காட்டில் உள்ளது போல, ஒரு பக்கத்திற்கு இன்னும் புவிஇருப்பிட அனுமதி வழங்கப்பட வேண்டியிருக்கலாம். விருப்பத் தேர்வு புலங்கள் `accuracy`, `altitude`, `altitudeAccuracy`, `heading` மற்றும் `speed` ஆகும்.

பக்கம் ஒரு இருப்பிடத்தைப் படிக்கத் தவறச் செய்ய:

```ts
await browser.emulate('geolocation', { error: 'positionUnavailable' })
```

## வண்ணத் திட்டம் மற்றும் பிற மீடியா அம்சங்கள்

`prefers-color-scheme` மீடியா அம்சத்தை மாற்றவும்:

```ts
await browser.emulate('colorScheme', 'light')
await browser.url('https://webdriver.io')
const backgroundColor = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColor.parsed.hex) // வெளியீடு: "#efefef"

await browser.emulate('colorScheme', 'dark')
const backgroundColorDark = await browser.$('nav').getCSSProperty('background-color')
console.log(backgroundColorDark.parsed.hex) // வெளியீடு: "#000000"
```

இது CSS `@media (prefers-color-scheme)` மற்றும் [`window.matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) இரண்டையும் புதுப்பிக்கிறது. மீண்டும் ஏற்றுதல் தேவையில்லை.

`media` மீதமுள்ள மீடியா-அம்ச வரைபடத்தை (map) அமைக்கிறது, எடுத்துக்காட்டாக குறைக்கப்பட்ட இயக்கம்:

```ts
await browser.emulate('media', { prefersReducedMotion: 'reduce', hover: 'none' })
```

`colorScheme` மற்றும் `media` ஒரே வரைபடத்தைப் பகிர்ந்துகொள்கின்றன. BiDi கட்டளை முழு வரைபடத்தையும் மாற்றுகிறது, எனவே பிந்தைய அழைப்பே செல்லுபடியாகும். எந்த ஒரு scope-ஐ மீட்டமைத்தாலும் வரைபடம் அழிக்கப்படும்.

`forcedColors` என்பது வேறொரு கட்டளை. இது `forced-colors` மீடியா அம்சத்தை அல்ல, forced-colors தீமை (`'light'` அல்லது `'dark'`) அமைக்கிறது. அந்த மீடியா அம்சம் `media`-இல் `forcedColors: 'none' | 'active'` ஆகவே இருக்கும்.

## பயனர் முகவர் (User Agent)

உலாவியின் பயனர் முகவரை இவ்வாறு மாற்றவும்:

```ts
await browser.emulate('userAgent', 'Chrome/1.2.3.4 Safari/537.36')
```

இது உலாவியின் பயனர்-முகவர் மேலெழுதல் (override) ஆகும். இது மாற்றியமைக்கப்பட்ட `navigator.userAgent` பண்பு அல்ல. உலாவி விற்பனையாளர்கள் User Agent-ஐப் படிப்படியாக நீக்கி வருகின்றனர்.

## ஆன்லைன் நிலை

உலாவல் சூழலை ஆஃப்லைனுக்கு மாற்றவும்:

```ts
await browser.emulate('onLine', false)
```

`false` ஆனது `{ type: 'offline' }` உடன் `emulation.setNetworkConditions`-ஐ அனுப்புகிறது. Fetch, WebSocket மற்றும் WebTransport தோல்வியடையும், [`navigator.onLine`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine) அதைப் பின்தொடரும். `true`, மற்றும் scope-ஐ மீட்டமைத்தல், அந்த நிபந்தனையை அழிக்கும். செயல்திறன் (throughput) மற்றும் தாமதம் (latency) [`throttleNetwork`](/docs/api/browser/throttleNetwork)-இல் இருக்கும். BiDi நெட்வொர்க் நிபந்தனைகள் ஆஃப்லைனை மட்டுமே ஆதரிக்கின்றன.

## மொழிச்சூழல், நேர மண்டலம் மற்றும் தொடுதல்

```ts
await browser.emulate('locale', 'fr-FR')
await browser.emulate('timezone', 'Pacific/Honolulu')
await browser.emulate('touch', 1)
```

`locale` என்பது ஒரு BCP 47 குறிச்சொல். `timezone` என்பது ஒரு IANA பெயர் அல்லது `+02:00` போன்ற ஒரு offset. `touch` என்பது `maxTouchPoints` ஆகும், அது `>= 1` ஆன ஒரு முழு எண்ணாக இருக்க வேண்டும். `touch`-ஐ மீட்டமைத்தால் மேலெழுதல் அழிக்கப்படும். அதனால் `0`-ஐ அமைக்க முடியாது.

## திரை, திசையமைவு மற்றும் தளவமைப்பு

```ts
await browser.emulate('screen', { width: 390, height: 844 })
await browser.emulate('orientation', { natural: 'portrait', type: 'portrait-primary' })
await browser.emulate('viewportMeta', true)
await browser.emulate('textLayout', 'mobile')
await browser.emulate('scrollbar', 'overlay')
await browser.emulate('scripting', false)
```

`screen` என்பது வலைக்கு வெளிப்படுத்தப்படும் திரைப் பகுதி, viewport அல்ல. `orientation.natural` என்பது `'portrait'` அல்லது `'landscape'` ஆகும். `orientation.type` என்பது `'portrait-primary'`, `'portrait-secondary'`, `'landscape-primary'` அல்லது `'landscape-secondary'` ஆகும்.

`viewportMeta` `true`-ஐ மட்டுமே ஏற்கிறது. Spec மதிப்பு `true | null` என்பதால் `false` இல்லை. மீட்டமைத்தல் அதை அழிக்கிறது. `textLayout` `'mobile'`-ஐ மட்டுமே ஏற்கிறது. `scripting`-ஐ முடக்க மட்டுமே முடியும். Spec-ஆல் scripting-ஐ கட்டாயமாக இயக்க முடியாது. `scrollbar` என்பது `'classic'` அல்லது `'overlay'` ஆகும்.

## கடிகாரம் (Clock)

[`emulate`](/docs/emulation) கட்டளையைப் பயன்படுத்தி உலாவியின் கணினிக் கடிகாரத்தை மாற்றலாம். இது நேரம் தொடர்பான நேட்டிவ் உலகளாவிய செயல்பாடுகளை மேலெழுதி, அவற்றை `clock.tick()` அல்லது வழங்கப்படும் clock பொருள் மூலம் ஒத்திசைவாகக் கட்டுப்படுத்த அனுமதிக்கிறது. இதில் பின்வருவனவற்றைக் கட்டுப்படுத்துவது அடங்கும்:

- `setTimeout`
- `clearTimeout`
- `setInterval`
- `clearInterval`
- `Date Objects`

கடிகாரம் unix epoch-இல் (நேரமுத்திரை 0) தொடங்குகிறது. அதாவது, `emulate` கட்டளைக்கு வேறு எந்த விருப்பங்களையும் அனுப்பாவிட்டால், உங்கள் பயன்பாட்டில் புதிய Date-ஐ உருவாக்கும்போது, அது ஜனவரி 1, 1970 நேரத்தைக் கொண்டிருக்கும்.

##### எடுத்துக்காட்டு

`browser.emulate('clock', { ... })`-ஐ அழைக்கும்போது, அது தற்போதைய பக்கத்திற்கும் அதைத் தொடர்ந்து வரும் அனைத்துப் பக்கங்களுக்கும் உலகளாவிய செயல்பாடுகளை உடனடியாக மேலெழுதும், எ.கா.:

```ts
const clock = await browser.emulate('clock', { now: new Date(1989, 7, 4) })

console.log(await browser.execute(() => (new Date()).toString()))
// "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)" ஐத் திருப்பி அனுப்புகிறது

await browser.url('https://webdriverio')
console.log(await browser.execute(() => (new Date()).toString()))
// "Fri Aug 04 1989 00:00:00 GMT-0700 (Pacific Daylight Time)" ஐத் திருப்பி அனுப்புகிறது

await clock.restore()

console.log(await browser.execute(() => (new Date()).toString()))
// "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)" ஐத் திருப்பி அனுப்புகிறது

await browser.url('https://guinea-pig.webdriver.io/pointer.html')
console.log(await browser.execute(() => (new Date()).toString()))
// "Thu Aug 01 2024 17:59:59 GMT-0700 (Pacific Daylight Time)" ஐத் திருப்பி அனுப்புகிறது
```

[`setSystemTime`](/docs/api/clock/setSystemTime) அல்லது [`tick`](/docs/api/clock/tick)-ஐ அழைப்பதன் மூலம் கணினி நேரத்தை மாற்றலாம்.

`FakeTimerInstallOpts` பொருள் பின்வரும் பண்புகளைக் கொண்டிருக்கலாம்:

 ```ts
interface FakeTimerInstallOpts {
    // குறிப்பிட்ட unix epoch உடன் போலி டைமர்களை நிறுவுகிறது
    // @default: 0
    now?: number | Date | undefined;

    // போலியாக்க வேண்டிய உலகளாவிய முறைகள் மற்றும் API-களின் பெயர்களைக் கொண்ட ஒரு array. இயல்பாக, WebdriverIO
    // `nextTick()` மற்றும் `queueMicrotask()`-ஐ மாற்றாது. எடுத்துக்காட்டாக,
    // `browser.emulate('clock', { toFake: ['setTimeout', 'nextTick'] })` என்பது
    // `setTimeout()` மற்றும் `nextTick()`-ஐ மட்டுமே போலியாக்கும்
    toFake?: FakeMethod[] | undefined;

    // runAll()-ஐ அழைக்கும்போது இயக்கப்படும் அதிகபட்ச டைமர்களின் எண்ணிக்கை (இயல்புநிலை: 1000)
    loopLimit?: number | undefined;

    // உண்மையான கணினி நேர மாற்றத்தின் அடிப்படையில் போலி நேரத்தைத் தானாக அதிகரிக்க WebdriverIO-க்குச்
    // சொல்கிறது (எ.கா. உண்மையான கணினி நேரத்தில் ஒவ்வொரு 20ms மாற்றத்திற்கும் போலி நேரம்
    // 20ms அதிகரிக்கப்படும்)
    // @default false
    shouldAdvanceTime?: boolean | undefined;

    // shouldAdvanceTime: true உடன் பயன்படுத்தும்போது மட்டுமே பொருந்தும். உண்மையான கணினி நேரத்தில்
    // ஒவ்வொரு advanceTimeDelta ms மாற்றத்திற்கும் போலி நேரத்தை advanceTimeDelta ms அதிகரிக்கும்
    // @default: 20
    advanceTimeDelta?: number | undefined;

    // 'நேட்டிவ்' (அதாவது போலி அல்லாத) டைமர்களை அவற்றின் அந்தந்த handler-களுக்கு ஒப்படைப்பதன் மூலம்
    // அழிக்க FakeTimers-க்குச் சொல்கிறது. இவை இயல்பாக அழிக்கப்படுவதில்லை, FakeTimers-ஐ நிறுவுவதற்கு
    // முன்பே டைமர்கள் இருந்திருந்தால் எதிர்பாராத நடத்தைக்கு வழிவகுக்கலாம்.
    // @default: false
    shouldClearNativeTimers?: boolean | undefined;
}
```

## சாதனம்

`emulate` கட்டளை ஒரு குறிப்பிட்ட மொபைல் அல்லது டெஸ்க்டாப் சாதனத்தை எமுலேட் செய்வதையும் ஆதரிக்கிறது. டெஸ்க்டாப் உலாவி எஞ்சின்கள் மொபைல் எஞ்சின்களிலிருந்து வேறுபடுவதால், இதை எந்தச் சூழ்நிலையிலும் மொபைல் சோதனைக்குப் பயன்படுத்தக் கூடாது. உங்கள் பயன்பாடு சிறிய viewport அளவுகளுக்குக் குறிப்பிட்ட நடத்தையை வழங்கினால் மட்டுமே இதைப் பயன்படுத்த வேண்டும்.

ஒரு சாதனத்திற்கு, WebdriverIO:

- descriptor-இலிருந்து பயனர் முகவரை அமைக்கிறது
- viewport மற்றும் device scale factor-ஐ அமைக்கிறது
- descriptor-இல் தொடுதல் இருக்கும்போது `maxTouchPoints`-ஐ `1` ஆக அமைக்கிறது, இல்லையெனில் தொடுதலை அழிக்கிறது
- descriptor மொபைலாக இருக்கும்போது மொபைல் உரைத் தளவமைப்பையும் viewport meta குறிச்சொல்லையும் அமைக்கிறது, இல்லையெனில் அவற்றை அழிக்கிறது

இது சாதனப் பெயரிலிருந்து திரை அளவையோ திசையமைவையோ உருவாக்காது. Viewport என்பது `screen.width` அல்ல. அவற்றுக்கு `screen` மற்றும் `orientation` scope-களைப் பயன்படுத்துங்கள்.

`emulate` அழைக்கப்பட்டபோது நடப்பில் இருந்த உயர்நிலைச் சூழலுக்கு viewport மாற்றம் அனுப்பப்படுகிறது. வேறொரு சாளரத்திற்கு மாறிய பிறகும் கூட, சாதனத்தை மீட்டமைப்பது அந்தச் சூழலின் அளவை மாற்றுகிறது.

உலாவி அந்தக் கட்டளைகளில் ஒன்றை நிராகரித்தால், முந்தைய பயனர் முகவர், viewport, தொடுதல், உரைத் தளவமைப்பு மற்றும் viewport meta மீண்டும் அமைக்கப்பட்டு பிழை திருப்பி அனுப்பப்படும். தனிப்பயன் பயனர் முகவர் அல்லது `setViewport` அளவு இயல்புநிலையால் மாற்றப்படாது.

```ts
const restore = await browser.emulate('device', 'iPhone 15')
// உங்கள் பயன்பாட்டைச் சோதிக்கவும் ...

// பயனர் முகவர், viewport, தொடுதல், உரைத் தளவமைப்பு மற்றும் viewport meta-வை மீட்டமைக்கவும்
await restore()
```

WebdriverIO [வரையறுக்கப்பட்ட அனைத்து சாதனங்களின்](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/deviceDescriptorsSource.ts) நிலையான பட்டியலைப் பராமரிக்கிறது.