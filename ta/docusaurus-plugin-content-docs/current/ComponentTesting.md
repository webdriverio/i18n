---
id: component-testing
title: காம்போனென்ட் சோதனை
description: "Vite மூலம் இயங்கும் WebdriverIO browser runner-ஐப் பயன்படுத்தி உண்மையான பிரவுசர்களில் யூனிட் மற்றும் காம்போனென்ட் சோதனைகளை இயக்குங்கள், அமைப்பு, test harness மற்றும் பிழைத்திருத்தம் உட்பட."
---

WebdriverIO-வின் [Browser Runner](/docs/runner#browser-runner) மூலம், பக்கத்தில் ரெண்டர் செய்யப்படுவதை தானியங்குபடுத்தவும் அதனுடன் தொடர்பு கொள்ளவும் WebdriverIO மற்றும் WebDriver protocol-ஐப் பயன்படுத்தும் அதே வேளையில், உண்மையான டெஸ்க்டாப் அல்லது மொபைல் பிரவுசரில் சோதனைகளை இயக்கலாம். [JSDOM](https://www.npmjs.com/package/jsdom)-க்கு எதிராக மட்டுமே சோதிக்க அனுமதிக்கும் பிற சோதனை framework-களுடன் ஒப்பிடும்போது இந்த அணுகுமுறைக்கு [பல நன்மைகள்](/docs/runner#browser-runner) உள்ளன.

## பிரவுசர் ஆதரவு

Browser runner சோதனை bundle-ஐ பிரவுசரில் இயக்குகிறது. அந்த bundle Chrome 90, Edge 90, Firefox 90 மற்றும் Safari 14.1 ஆகியவற்றிலும், அந்த பிரவுசர்களின் பிந்தைய பதிப்புகளிலும் இயங்கும்.

End-to-end சோதனைகள் Node.js-இல் இயங்குகின்றன. [`browser.execute`](/docs/api/browser/execute)-க்கு அனுப்பப்படும் code அதற்குப் பதிலாக தானியங்குபடுத்தப்பட்ட பிரவுசரில் இயங்குகிறது, அது மேலே உள்ள பதிப்புகளை விட பழையதாக இருக்கலாம். அந்த code-ஐ ES2021 அளவில் வைத்திருங்கள்.

## இது எப்படி வேலை செய்கிறது?

Browser Runner, ஒரு சோதனைப் பக்கத்தை ரெண்டர் செய்யவும், உங்கள் சோதனைகளை பிரவுசரில் இயக்க ஒரு சோதனை framework-ஐ துவக்கவும் [Vite](https://vitejs.dev/)-ஐப் பயன்படுத்துகிறது. தற்போது இது Mocha-வை மட்டுமே ஆதரிக்கிறது, ஆனால் Jasmine மற்றும் Cucumber [roadmap-இல் உள்ளன](https://github.com/orgs/webdriverio/projects/1). இது Vite-ஐப் பயன்படுத்தாத திட்டங்களுக்கும் கூட எந்த வகையான காம்போனென்ட்களையும் சோதிக்க அனுமதிக்கிறது.

Vite server, WebdriverIO testrunner-ஆல் தொடங்கப்பட்டு, சாதாரண e2e சோதனைகளுக்கு நீங்கள் பயன்படுத்தியது போலவே அனைத்து reporter மற்றும் services-ஐயும் பயன்படுத்தக்கூடிய வகையில் கட்டமைக்கப்படுகிறது. மேலும், பக்கத்தில் உள்ள எந்த elements-உடனும் தொடர்பு கொள்ள [WebdriverIO API](/docs/api)-இன் ஒரு பகுதியை அணுக அனுமதிக்கும் ஒரு [`browser`](/docs/api/browser) instance-ஐ இது துவக்குகிறது. e2e சோதனைகளைப் போலவே, [`injectGlobals`](/docs/api/globals) எவ்வாறு அமைக்கப்பட்டுள்ளது என்பதைப் பொறுத்து, global scope-உடன் இணைக்கப்பட்ட `browser` variable மூலமாகவோ அல்லது `@wdio/globals`-இலிருந்து import செய்வதன் மூலமாகவோ அந்த instance-ஐ அணுகலாம்.

WebdriverIO பின்வரும் framework-களுக்கு உள்ளமைந்த ஆதரவைக் கொண்டுள்ளது:

- [__Nuxt__](https://nuxt.com/): WebdriverIO-வின் testrunner ஒரு Nuxt application-ஐக் கண்டறிந்து, உங்கள் project composables-ஐ தானாகவே அமைத்து, Nuxt backend-ஐ mock செய்ய உதவுகிறது, மேலும் [Nuxt ஆவணங்களில்](/docs/component-testing/vue#testing-vue-components-in-nuxt) படிக்கவும்
- [__TailwindCSS__](https://tailwindcss.com/): நீங்கள் TailwindCSS-ஐப் பயன்படுத்துகிறீர்களா என்பதை WebdriverIO-வின் testrunner கண்டறிந்து, சூழலை சோதனைப் பக்கத்தில் சரியாக ஏற்றுகிறது

## அமைப்பு

பிரவுசரில் யூனிட் அல்லது காம்போனென்ட் சோதனைக்காக WebdriverIO-வை அமைக்க, பின்வருவதன் மூலம் புதிய WebdriverIO திட்டத்தைத் தொடங்குங்கள்:

```bash
npm init wdio@latest ./
# or
yarn create wdio ./
```

Configuration wizard தொடங்கியதும், யூனிட் மற்றும் காம்போனென்ட் சோதனையை இயக்க `browser`-ஐத் தேர்ந்தெடுத்து, விரும்பினால் presets-இல் ஒன்றைத் தேர்ந்தெடுக்கவும், இல்லையெனில் அடிப்படை யூனிட் சோதனைகளை மட்டும் இயக்க விரும்பினால் _"Other"_ என்பதைத் தேர்வு செய்யவும். உங்கள் திட்டத்தில் ஏற்கனவே Vite-ஐப் பயன்படுத்தினால், தனிப்பயன் Vite configuration-ஐயும் கட்டமைக்கலாம். மேலும் தகவலுக்கு அனைத்து [runner options](/docs/runner#runner-options)-ஐயும் பார்க்கவும்.

:::info

__குறிப்பு:__ WebdriverIO இயல்பாக CI-இல் பிரவுசர் சோதனைகளை headless முறையில் இயக்கும், எ.கா. `CI` environment variable `'1'` அல்லது `'true'` என அமைக்கப்பட்டிருக்கும்போது. Runner-க்கான [`headless`](/docs/runner#headless) option-ஐப் பயன்படுத்தி இந்த நடத்தையை நீங்கள் கைமுறையாக கட்டமைக்கலாம்.

:::

இந்த செயல்முறையின் முடிவில், `runner` property உட்பட பல்வேறு WebdriverIO configurations-ஐக் கொண்ட ஒரு `wdio.conf.js`-ஐ நீங்கள் காண்பீர்கள், எ.கா.:

```ts reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

வெவ்வேறு [capabilities](/docs/configuration#capabilities)-ஐ வரையறுப்பதன் மூலம், உங்கள் சோதனைகளை வெவ்வேறு பிரவுசர்களில், விரும்பினால் இணையாக இயக்கலாம்.

எல்லாம் எப்படி வேலை செய்கிறது என்பதில் உங்களுக்கு இன்னும் உறுதியில்லை என்றால், WebdriverIO-வில் காம்போனென்ட் சோதனையை எவ்வாறு தொடங்குவது என்பது குறித்த பின்வரும் பயிற்சியைப் பாருங்கள்:

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## Test Harness

உங்கள் சோதனைகளில் எதை இயக்க விரும்புகிறீர்கள், காம்போனென்ட்களை எப்படி ரெண்டர் செய்ய விரும்புகிறீர்கள் என்பது முற்றிலும் உங்களைப் பொறுத்தது. இருப்பினும், React, Preact, Svelte மற்றும் Vue போன்ற பல்வேறு காம்போனென்ட் framework-களுக்கான plugins-ஐ வழங்குவதால், [Testing Library](https://testing-library.com/)-ஐ utility framework-ஆகப் பயன்படுத்த பரிந்துரைக்கிறோம். காம்போனென்ட்களை சோதனைப் பக்கத்தில் ரெண்டர் செய்வதற்கு இது மிகவும் பயனுள்ளதாக உள்ளது, மேலும் ஒவ்வொரு சோதனைக்குப் பிறகும் இந்த காம்போனென்ட்களை தானாகவே சுத்தம் செய்கிறது.

நீங்கள் விரும்பியபடி Testing Library primitives-ஐ WebdriverIO commands-உடன் கலந்து பயன்படுத்தலாம், எ.கா.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__குறிப்பு:__ Testing Library-இலிருந்து render methods-ஐப் பயன்படுத்துவது, சோதனைகளுக்கு இடையே உருவாக்கப்பட்ட காம்போனென்ட்களை அகற்ற உதவுகிறது. நீங்கள் Testing Library-ஐப் பயன்படுத்தவில்லை என்றால், சோதனைகளுக்கு இடையே சுத்தம் செய்யப்படும் ஒரு container-உடன் உங்கள் சோதனை காம்போனென்ட்களை இணைப்பதை உறுதிசெய்யவும்.

## Setup Scripts

Node.js-இலோ அல்லது பிரவுசரிலோ தன்னிச்சையான scripts-ஐ இயக்குவதன் மூலம் உங்கள் சோதனைகளை அமைக்கலாம், எ.கா. styles-ஐ inject செய்தல், browser APIs-ஐ mock செய்தல் அல்லது மூன்றாம் தரப்பு சேவையுடன் இணைத்தல். Node.js-இல் code-ஐ இயக்க WebdriverIO [hooks](/docs/configuration#hooks)-ஐப் பயன்படுத்தலாம், அதே நேரத்தில் [`mochaOpts.require`](/docs/frameworks#require), சோதனைகள் ஏற்றப்படுவதற்கு முன் scripts-ஐ பிரவுசரில் import செய்ய உங்களை அனுமதிக்கிறது, எ.கா.:

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // பிரவுசரில் இயக்க ஒரு setup script-ஐ வழங்கவும்
        require: './__fixtures__/setup.js'
    },
    before: () => {
        // Node.js-இல் சோதனை சூழலை அமைக்கவும்
    }
    // ...
}
```

உதாரணமாக, பின்வரும் set-up script மூலம் உங்கள் சோதனையில் உள்ள அனைத்து [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) அழைப்புகளையும் mock செய்ய விரும்பினால்:

```js ./fixtures/setup.js
import { fn } from '@wdio/browser-runner'

// அனைத்து சோதனைகளும் ஏற்றப்படுவதற்கு முன் code-ஐ இயக்கவும்
window.fetch = fn()

export const mochaGlobalSetup = () => {
    // சோதனை கோப்பு ஏற்றப்பட்ட பிறகு code-ஐ இயக்கவும்
}

export const mochaGlobalTeardown = () => {
    // spec கோப்பு இயக்கப்பட்ட பிறகு code-ஐ இயக்கவும்
}

```

இப்போது உங்கள் சோதனைகளில் அனைத்து பிரவுசர் requests-க்கும் தனிப்பயன் response மதிப்புகளை வழங்கலாம். Global fixtures பற்றி மேலும் [Mocha ஆவணங்களில்](https://mochajs.org/#global-fixtures) படிக்கவும்.

## சோதனை மற்றும் Application கோப்புகளைக் கண்காணித்தல்

உங்கள் பிரவுசர் சோதனைகளை பிழைத்திருத்தம் செய்ய பல வழிகள் உள்ளன. எளிதான வழி, WebdriverIO testrunner-ஐ `--watch` flag-உடன் தொடங்குவது, எ.கா.:

```sh
$ npx wdio run ./wdio.conf.js --watch
```

இது ஆரம்பத்தில் அனைத்து சோதனைகளையும் இயக்கி, அனைத்தும் இயக்கப்பட்டவுடன் நின்றுவிடும். பின்னர் நீங்கள் தனிப்பட்ட கோப்புகளில் மாற்றங்களைச் செய்யலாம், அவை தனித்தனியாக மீண்டும் இயக்கப்படும். உங்கள் application கோப்புகளைக் குறிக்கும் [`filesToWatch`](/docs/configuration#filestowatch)-ஐ அமைத்தால், உங்கள் app-இல் மாற்றங்கள் செய்யப்படும்போது அது அனைத்து சோதனைகளையும் மீண்டும் இயக்கும்.

## பிழைத்திருத்தம்

உங்கள் IDE-இல் breakpoints-ஐ அமைத்து அவற்றை remote பிரவுசர் அங்கீகரிக்கச் செய்வது (இன்னும்) சாத்தியமில்லை என்றாலும், எந்த இடத்திலும் சோதனையை நிறுத்த [`debug`](/docs/api/browser/debug) command-ஐப் பயன்படுத்தலாம். இது DevTools-ஐத் திறந்து, [sources tab](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools)-இல் breakpoints-ஐ அமைப்பதன் மூலம் சோதனையை பிழைத்திருத்தம் செய்ய உங்களை அனுமதிக்கிறது.

`debug` command அழைக்கப்படும்போது, உங்கள் terminal-இல் பின்வருமாறு கூறும் ஒரு Node.js repl interface-ஐயும் பெறுவீர்கள்:

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

சோதனையைத் தொடர `Ctrl` அல்லது `Command` + `c` அழுத்தவும் அல்லது `.exit` என உள்ளிடவும்.

## Selenium Grid-ஐப் பயன்படுத்தி இயக்குதல்

உங்களிடம் ஒரு [Selenium Grid](https://www.selenium.dev/documentation/grid/) அமைக்கப்பட்டு, அந்த grid மூலம் உங்கள் பிரவுசரை இயக்கினால், சோதனை கோப்புகள் வழங்கப்படும் சரியான host-ஐ பிரவுசர் அணுக அனுமதிக்க, `host` browser runner option-ஐ அமைக்க வேண்டும், எ.கா.:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // WebdriverIO process-ஐ இயக்கும் கணினியின் network IP
        host: 'http://172.168.0.2'
    }]
}
```

WebdriverIO சோதனைகளை இயக்கும் instance-இல் host செய்யப்பட்ட சரியான server instance-ஐ பிரவுசர் சரியாகத் திறப்பதை இது உறுதி செய்யும்.

## எடுத்துக்காட்டுகள்

பிரபலமான காம்போனென்ட் framework-களைப் பயன்படுத்தி காம்போனென்ட்களைச் சோதிப்பதற்கான பல்வேறு எடுத்துக்காட்டுகளை எங்கள் [example repository](https://github.com/webdriverio/component-testing-examples)-இல் காணலாம்.