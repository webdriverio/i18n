---
id: modules
title: தொகுதிகள்
---

WebdriverIO பல தொகுதிகளை NPM மற்றும் பிற பதிவகங்களில் வெளியிடுகிறது, அவற்றைப் பயன்படுத்தி உங்கள் சொந்த தானியங்கி கட்டமைப்பை உருவாக்கலாம். WebdriverIO அமைப்பு வகைகள் பற்றிய மேலும் ஆவணங்களை [இங்கே](/docs/setuptypes) காணலாம்.

## `webdriver` மற்றும் `devtools`

நெறிமுறை தொகுப்புகள் ([`webdriver`](https://www.npmjs.com/package/webdriver) மற்றும் [`devtools`](https://www.npmjs.com/package/devtools)) அமர்வுகளைத் தொடங்க அனுமதிக்கும் பின்வரும் நிலையான செயல்பாடுகளுடன் இணைக்கப்பட்ட ஒரு வகுப்பை வெளிப்படுத்துகின்றன:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

குறிப்பிட்ட திறன்களுடன் ஒரு புதிய அமர்வைத் தொடங்குகிறது. அமர்வு பதிலின் அடிப்படையில் வெவ்வேறு நெறிமுறைகளிலிருந்து கட்டளைகள் வழங்கப்படும்.

##### அளவுருக்கள்

- `options`: [WebDriver விருப்பங்கள்](/docs/configuration#webdriver-options)
- `modifier`: client பிரதிநிதித்துவத்தை திருப்பித் தரப்படுவதற்கு முன் மாற்ற அனுமதிக்கும் செயல்பாடு
- `userPrototype`: நிகழ்வு மாதிரியை நீட்டிக்க அனுமதிக்கும் பண்புகள் பொருள்
- `customCommandWrapper`: செயல்பாடு அழைப்புகளைச் சுற்றி செயல்பாட்டை சுற்ற அனுமதிக்கும் செயல்பாடு

##### திருப்பி அனுப்புவது

- [Browser](/docs/api/browser) பொருள்

##### எடுத்துக்காட்டு

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

இயங்கும் WebDriver அல்லது DevTools அமர்வுடன் இணைக்கிறது.

##### அளவுருக்கள்

- `attachInstance`: ஒரு அமர்வுடன் இணைக்க பிரதிநிதித்துவம் அல்லது குறைந்தபட்சம் `sessionId` பண்புடன் ஒரு பொருள் (எ.கா. `{ sessionId: 'xxx' }`)
- `modifier`: client பிரதிநிதித்துவத்தை திருப்பித் தரப்படுவதற்கு முன் மாற்ற அனுமதிக்கும் செயல்பாடு
- `userPrototype`: நிகழ்வு மாதிரியை நீட்டிக்க அனுமதிக்கும் பண்புகள் பொருள்
- `customCommandWrapper`: செயல்பாடு அழைப்புகளைச் சுற்றி செயல்பாட்டை சுற்ற அனுமதிக்கும் செயல்பாடு

##### திருப்பி அனுப்புவது

- [Browser](/docs/api/browser) பொருள்

##### எடுத்துக்காட்டு

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

வழங்கப்பட்ட பிரதிநிதித்துவம் கொடுக்கப்பட்ட அமர்வை மீண்டும் ஏற்றுகிறது.

##### அளவுருக்கள்

- `instance`: மீண்டும் ஏற்ற தொகுப்பு பிரதிநிதித்துவம்

##### எடுத்துக்காட்டு

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

நெறிமுறை தொகுப்புகளைப் போலவே (`webdriver` மற்றும் `devtools`) நீங்கள் WebdriverIO தொகுப்பு APIகளைப் பயன்படுத்தி அமர்வுகளை நிர்வகிக்கலாம். APIகளை `import { remote, attach, multiremote } from 'webdriverio` பயன்படுத்தி இறக்குமதி செய்யலாம் மற்றும் பின்வரும் செயல்பாடுகளைக் கொண்டுள்ளன:

#### `remote(options, modifier)`

WebdriverIO அமர்வைத் தொடங்குகிறது. பிரதிநிதித்துவம் நெறிமுறை தொகுப்பைப் போலவே அனைத்து கட்டளைகளையும் கொண்டுள்ளது ஆனால் கூடுதல் உயர் வரிசை செயல்பாடுகளுடன், [API ஆவணங்களைப்](/docs/api) பார்க்கவும்.

##### அளவுருக்கள்

- `options`: [WebdriverIO விருப்பங்கள்](/docs/configuration#webdriverio)
- `modifier`: client பிரதிநிதித்துவத்தை திருப்பித் தரப்படுவதற்கு முன் மாற்ற அனுமதிக்கும் செயல்பாடு

##### திருப்பி அனுப்புவது

- [Browser](/docs/api/browser) பொருள்

##### எடுத்துக்காட்டு

```js
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: { browserName: 'chrome' }
})
```

#### `attach(attachOptions)`

இயங்கும் WebdriverIO அமர்வுடன் இணைக்கிறது.

##### அளவுருக்கள்

- `attachOptions`: ஒரு அமர்வுடன் இணைக்க பிரதிநிதித்துவம் அல்லது குறைந்தபட்சம் `sessionId` பண்புடன் ஒரு பொருள் (எ.கா. `{ sessionId: 'xxx' }`)

##### திருப்பி அனுப்புவது

- [Browser](/docs/api/browser) பொருள்

##### எடுத்துக்காட்டு

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiremote(multiremoteOptions)`

ஒரு multiremote பிரதிநிதித்துவத்தைத் தொடங்குகிறது, இது ஒரு பிரதிநிதித்துவத்திற்குள் பல அமர்வுகளைக் கட்டுப்படுத்த உங்களை அனுமதிக்கிறது. குறிப்பிட்ட பயன்பாட்டு வழக்குகளுக்கு எங்கள் [multiremote எடுத்துக்காட்டுகளை](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) சரிபார்க்கவும்.

##### அளவுருக்கள்

- `multiremoteOptions`: உலாவியின் பெயரைக் குறிக்கும் விசைகள் மற்றும் அவற்றின் [WebdriverIO விருப்பங்கள்](/docs/configuration#webdriverio) கொண்ட ஒரு பொருள்.

##### திருப்பி அனுப்புவது

- [Browser](/docs/api/browser) பொருள்

##### எடுத்துக்காட்டு

```js
import { multiremote } from 'webdriverio'

const matrix = await multiremote({
    myChromeBrowser: {
        capabilities: { browserName: 'chrome' }
    },
    myFirefoxBrowser: {
        capabilities: { browserName: 'firefox' }
    }
})
await matrix.url('http://json.org')
await matrix.getInstance('browserA').url('https://google.com')

console.log(await matrix.getTitle())
// returns ['Google', 'JSON']
```

## `@wdio/cli`

`wdio` கட்டளையை அழைப்பதற்குப் பதிலாக, நீங்கள் சோதனை ரன்னரை தொகுதியாகச் சேர்த்து அதை ஒரு தன்னிச்சையான சூழலில் இயக்கலாம். அதற்கு, நீங்கள் `@wdio/cli` தொகுப்பை தொகுதியாக தேவைப்படுத்த வேண்டும், இப்படி:

<Tabs
  defaultValue="esm"
  values={[
    {label: 'EcmaScript Modules', value: 'esm'},
    {label: 'CommonJS', value: 'cjs'}
  ]
}>
<TabItem value="esm">

```js
import Launcher from '@wdio/cli'
```

</TabItem>
<TabItem value="cjs">

```js
const Launcher = require('@wdio/cli').default
```

</TabItem>
</Tabs>

அதன் பிறகு, launcher பிரதிநிதித்துவத்தை உருவாக்கி, சோதனையை இயக்கவும்.

#### `Launcher(configPath, opts)`

`Launcher` வகுப்பு கட்டமைப்பாளர் கட்டமைப்பு கோப்புக்கான URL மற்றும் கட்டமைப்பில் உள்ளவற்றை மேலெழுதும் அமைப்புகளுடன் ஒரு `opts` பொருளை எதிர்பார்க்கிறது.

##### அளவுருக்கள்

- `configPath`: இயக்க `wdio.conf.js` இன் பாதை
- `opts`: கட்டமைப்பு கோப்பிலிருந்து மதிப்புகளை மேலெழுத வாதங்கள் ([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77))

##### எடுத்துக்காட்டு

```js
const wdio = new Launcher(
    '/path/to/my/wdio.conf.js',
    { spec: '/path/to/a/single/spec.e2e.js' }
)

wdio.run().then((exitCode) => {
    process.exit(exitCode)
}, (error) => {
    console.error('Launcher failed to start the test', error.stacktrace)
    process.exit(1)
})
```

`run` கட்டளை ஒரு [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) ஐ திருப்பி அனுப்புகிறது. சோதனைகள் வெற்றிகரமாக இயங்கினால் அல்லது தோல்வியுற்றால் அது தீர்க்கப்படுகிறது, மற்றும் launcher சோதனைகளை இயக்க முடியாவிட்டால் அது நிராகரிக்கப்படுகிறது.

## `@wdio/browser-runner`

WebdriverIO இன் [உலாவி ரன்னர்](/docs/runner#browser-runner) பயன்படுத்தி அலகு அல்லது கூறு சோதனைகளை இயக்கும்போது, நீங்கள் உங்கள் சோதனைகளுக்கான மாற்று பயன்பாடுகளை இறக்குமதி செய்யலாம், எ.கா.:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

பின்வரும் பெயரிடப்பட்ட ஏற்றுமதிகள் கிடைக்கின்றன:

#### `fn`

மாற்று செயல்பாடு, அதிகாரப்பூர்வ [Vitest ஆவணங்களில்](https://vitest.dev/api/mock.html#mock-functions) மேலும் காணலாம்.

#### `spyOn`

உளவு செயல்பாடு, அதிகாரப்பூர்வ [Vitest ஆவணங்களில்](https://vitest.dev/api/mock.html#mock-functions) மேலும் காணலாம்.

#### `mock`

கோப்பு அல்லது சார்பு தொகுதியை மாற்றுவதற்கான முறை.

##### அளவுருக்கள்

- `moduleName`: மாற்றப்பட வேண்டிய கோப்புக்கு தொடர்புடைய பாதை அல்லது தொகுதி பெயர்.
- `factory`: மாற்றப்பட்ட மதிப்பைத் திருப்பித் தரும் செயல்பாடு (விருப்பமானது)

##### எடுத்துக்காட்டு

```js
mock('../src/constants.ts', () => ({
    SOME_DEFAULT: 'mocked out'
}))

mock('lodash', (origModuleFactory) => {
    const origModule = await origModuleFactory()
    return {
        ...origModule,
        pick: fn()
    }
})
```

#### `unmock`

கையேடு மாற்று (`__mocks__`) கோப்பகத்தில் வரையறுக்கப்பட்டுள்ள சார்புநிலையை மாற்று நீக்கவும்.

##### அளவுருக்கள்

- `moduleName`: மாற்று நீக்க வேண்டிய தொகுதியின் பெயர்.

##### எடுத்துக்காட்டு

```js
unmock('lodash')
```