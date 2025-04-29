---
id: modules
title: தொகுதிகள்
---

WebdriverIO பல தொகுதிகளை NPM மற்றும் பிற பதிவகங்களில் வெளியிடுகிறது, இவற்றை நீங்கள் உங்கள் சொந்த தானியங்கி கட்டமைப்பை உருவாக்க பயன்படுத்தலாம். WebdriverIO அமைவு வகைகள் பற்றிய மேலும் ஆவணங்களை [இங்கே](/docs/setuptypes) காணலாம்.

## `webdriver` மற்றும் `devtools`

நெறிமுறை தொகுப்புகள் ([`webdriver`](https://www.npmjs.com/package/webdriver) மற்றும் [`devtools`](https://www.npmjs.com/package/devtools)) அமர்வுகளைத் தொடங்க அனுமதிக்கும் பின்வரும் நிலையான செயல்பாடுகளுடன் ஒரு வகுப்பை வெளிப்படுத்துகின்றன:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

குறிப்பிட்ட திறன்களுடன் ஒரு புதிய அமர்வைத் தொடங்குகிறது. அமர்வு பதிலின் அடிப்படையில் வெவ்வேறு நெறிமுறைகளில் இருந்து கட்டளைகள் வழங்கப்படும்.

##### அளவுருக்கள்

- `options`: [WebDriver விருப்பங்கள்](/docs/configuration#webdriver-options)
- `modifier`: வாடிக்கையாளர் அமைப்பை திருப்பி அனுப்புவதற்கு முன் அதை மாற்ற அனுமதிக்கும் செயல்பாடு
- `userPrototype`: அமைப்பு வரைமுறையை விரிவுபடுத்த அனுமதிக்கும் பண்புகள் பொருள்
- `customCommandWrapper`: செயல்பாட்டு அழைப்புகளைச் சுற்றி செயல்பாட்டை சுற்ற அனுமதிக்கும் செயல்பாடு

##### திருப்பி அனுப்புகிறது

- [உலாவி](/docs/api/browser) பொருள்

##### எடுத்துக்காட்டு

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

இயங்கும் WebDriver அல்லது DevTools அமர்வுடன் இணைக்கிறது.

##### அளவுருக்கள்

- `attachInstance`: அமர்வை இணைக்க அமைப்பு அல்லது குறைந்தபட்சம் `sessionId` பண்புடன் ஒரு பொருள் (எ.கா. `{ sessionId: 'xxx' }`)
- `modifier`: வாடிக்கையாளர் அமைப்பை திருப்பி அனுப்புவதற்கு முன் அதை மாற்ற அனுமதிக்கும் செயல்பாடு
- `userPrototype`: அமைப்பு வரைமுறையை விரிவுபடுத்த அனுமதிக்கும் பண்புகள் பொருள்
- `customCommandWrapper`: செயல்பாட்டு அழைப்புகளைச் சுற்றி செயல்பாட்டை சுற்ற அனுமதிக்கும் செயல்பாடு

##### திருப்பி அனுப்புகிறது

- [உலாவி](/docs/api/browser) பொருள்

##### எடுத்துக்காட்டு

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

வழங்கப்பட்ட அமைப்பிற்கு அமர்வை மீண்டும் ஏற்றுகிறது.

##### அளவுருக்கள்

- `instance`: மீண்டும் ஏற்ற தொகுப்பு அமைப்பு

##### எடுத்துக்காட்டு

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

நெறிமுறை தொகுப்புகளைப் போலவே (`webdriver` மற்றும் `devtools`) WebdriverIO தொகுப்பு API களைப் பயன்படுத்தி அமர்வுகளை நிர்வகிக்கலாம். API களை `import { remote, attach, multiremote } from 'webdriverio` பயன்படுத்தி இறக்குமதி செய்யலாம் மற்றும் பின்வரும் செயல்பாடுகளைக் கொண்டுள்ளன:

#### `remote(options, modifier)`

WebdriverIO அமர்வைத் தொடங்குகிறது. அமைப்பில் நெறிமுறை தொகுப்பைப் போலவே அனைத்து கட்டளைகளும் உள்ளன, ஆனால் கூடுதல் உயர் வரிசை செயல்பாடுகளுடன், [API ஆவணங்களைப்](/docs/api) பார்க்கவும்.

##### அளவுருக்கள்

- `options`: [WebdriverIO விருப்பங்கள்](/docs/configuration#webdriverio)
- `modifier`: வாடிக்கையாளர் அமைப்பை திருப்பி அனுப்புவதற்கு முன் அதை மாற்ற அனுமதிக்கும் செயல்பாடு

##### திருப்பி அனுப்புகிறது

- [உலாவி](/docs/api/browser) பொருள்

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

- `attachOptions`: அமர்வை இணைக்க அமைப்பு அல்லது குறைந்தபட்சம் `sessionId` பண்புடன் ஒரு பொருள் (எ.கா. `{ sessionId: 'xxx' }`)

##### திருப்பி அனுப்புகிறது

- [உலாவி](/docs/api/browser) பொருள்

##### எடுத்துக்காட்டு

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiremote(multiremoteOptions)`

ஒற்றை அமைப்பிற்குள் பல அமர்வுகளை கட்டுப்படுத்த அனுமதிக்கும் மல்டிரிமோட் அமைப்பைத் தொடங்குகிறது. குறிப்பிட்ட பயன்பாட்டு வழக்குகளுக்கு எங்கள் [மல்டிரிமோட் எடுத்துக்காட்டுகளைப்](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote) பார்க்கவும்.

##### அளவுருக்கள்

- `multiremoteOptions`: உலாவியின் பெயரைக் குறிக்கும் திறவுகள் மற்றும் அவற்றின் [WebdriverIO விருப்பங்கள்](/docs/configuration#webdriverio) கொண்ட ஒரு பொருள்.

##### திருப்பி அனுப்புகிறது

- [உலாவி](/docs/api/browser) பொருள்

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

`wdio` கட்டளையை அழைப்பதற்குப் பதிலாக, சோதனை இயக்கியை தொகுதியாகச் சேர்க்கலாம் மற்றும் அதை ஒரு தன்னிச்சையான சூழலில் இயக்கலாம். அதற்கு, நீங்கள் `@wdio/cli` தொகுப்பை தொகுதியாகத் தேவைப்படுத்த வேண்டும், இவ்வாறு:

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

அதன் பிறகு, ஏவியின் நிகழ்வை உருவாக்கி, சோதனையை இயக்கவும்.

#### `Launcher(configPath, opts)`

`Launcher` வகுப்பு கட்டமைப்பாளர் கட்டமைப்பு கோப்பிற்கான URL ஐயும், கட்டமைப்பில் உள்ளவற்றை மேலெழுதும் அமைப்புகளைக் கொண்ட `opts` பொருளையும் எதிர்பார்க்கிறது.

##### அளவுருக்கள்

- `configPath`: இயக்க `wdio.conf.js` க்கான பாதை
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

`run` கட்டளை ஒரு [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) ஐ திருப்பி அனுப்புகிறது. சோதனைகள் வெற்றிகரமாக நடந்தால் அல்லது தோல்வியடைந்தால் அது தீர்க்கப்படுகிறது, மேலும் ஏவி சோதனைகளை இயக்க முடியவில்லை என்றால் அது நிராகரிக்கப்படுகிறது.

## `@wdio/browser-runner`

WebdriverIO இன் [உலாவி இயக்கி](/docs/runner#browser-runner) ஐப் பயன்படுத்தி அலகு அல்லது கூறு சோதனைகளை இயக்கும் போது, உங்கள் சோதனைகளுக்கான மாற்று உபயோகிப்புகளை இறக்குமதி செய்யலாம், எ.கா.:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

பின்வரும் பெயரிடப்பட்ட ஏற்றுமதிகள் கிடைக்கின்றன:

#### `fn`

போலி செயல்பாடு, அதிகாரப்பூர்வ [Vitest ஆவணங்களில்](https://vitest.dev/api/mock.html#mock-functions) மேலும் காணலாம்.

#### `spyOn`

உளவு செயல்பாடு, அதிகாரப்பூர்வ [Vitest ஆவணங்களில்](https://vitest.dev/api/mock.html#mock-functions) மேலும் காணலாம்.

#### `mock`

கோப்பு அல்லது சார்பு தொகுதியை மாற்றுவதற்கான முறை.

##### அளவுருக்கள்

- `moduleName`: மாற்றப்பட வேண்டிய கோப்பிற்கு சார்புடைய பாதை அல்லது தொகுதி பெயர்.
- `factory`: மாற்றப்பட்ட மதிப்பைத் திருப்பி அனுப்ப செயல்பாடு (விருப்பத்தேர்வு)

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

கைமுறை போலி (`__mocks__`) கோப்பகத்தில் வரையறுக்கப்பட்டுள்ள சார்பை unmock செய்யவும்.

##### அளவுருக்கள்

- `moduleName`: மாற்றப்படாத தொகுதியின் பெயர்.

##### எடுத்துக்காட்டு

```js
unmock('lodash')
```