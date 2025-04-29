---
id: component-testing
title: கூறு சோதனை
---

WebdriverIOs [Browser Runner](/docs/runner#browser-runner) மூலம் நீங்கள் உண்மையான டெஸ்க்டாப் அல்லது மொபைல் உலாவியில் சோதனைகளை இயக்கலாம். இதற்கு WebdriverIO மற்றும் WebDriver நெறிமுறையைப் பயன்படுத்தி பக்கத்தில் காட்டப்படும் விஷயங்களை தானியங்கி முறையில் இயக்க முடியும். மற்ற சோதனை கட்டமைப்புகளை விட இந்த அணுகுமுறை [பல நன்மைகளை](/docs/runner#browser-runner) கொண்டுள்ளது, இவை [JSDOM](https://www.npmjs.com/package/jsdom) மட்டுமே சோதிக்க அனுமதிக்கின்றன.

## இது எவ்வாறு செயல்படுகிறது?

Browser Runner, [Vite](https://vitejs.dev/) ஐப் பயன்படுத்தி ஒரு சோதனைப் பக்கத்தை உருவாக்கி, உலாவியில் உங்கள் சோதனைகளை இயக்க சோதனை கட்டமைப்பை துவக்குகிறது. தற்போது Mocha மட்டுமே ஆதரிக்கப்படுகிறது, ஆனால் Jasmine மற்றும் Cucumber [திட்டமிடப்பட்டுள்ளன](https://github.com/orgs/webdriverio/projects/1). இது Vite ஐப் பயன்படுத்தாத திட்டங்களுக்கும் எந்த வகையான கூறுகளையும் சோதிக்க அனுமதிக்கிறது.

Vite சேவையகம் WebdriverIO சோதனை இயக்கியால் தொடங்கப்பட்டு, வழக்கமான e2e சோதனைகளுக்கு நீங்கள் பயன்படுத்திய அனைத்து அறிக்கையாளர்களையும் சேவைகளையும் பயன்படுத்தும் வகையில் கட்டமைக்கப்படுகிறது. மேலும் இது ஒரு [`browser`](/docs/api/browser) உறுப்பை உருவாக்குகிறது, இது பக்கத்தில் உள்ள எந்த கூறுகளுடனும் தொடர்புகொள்ள [WebdriverIO API](/docs/api) இன் ஒரு துணைக்குழுவை அணுக அனுமதிக்கிறது. e2e சோதனைகளைப் போலவே, நீங்கள் அந்த உறுப்பை உலகளாவிய நோக்கில் இணைக்கப்பட்ட `browser` மாறியின் மூலம் அல்லது [`injectGlobals`](/docs/api/globals) எவ்வாறு அமைக்கப்பட்டுள்ளது என்பதைப் பொறுத்து `@wdio/globals` இலிருந்து இறக்குமதி செய்வதன் மூலம் அணுகலாம்.

WebdriverIO பின்வரும் கட்டமைப்புகளுக்கு உள்ளமைந்த ஆதரவைக் கொண்டுள்ளது:

- [__Nuxt__](https://nuxt.com/): WebdriverIO சோதனை இயக்கி ஒரு Nuxt பயன்பாட்டைக் கண்டறிந்து, உங்கள் திட்ட composables ஐத் தானாகவே அமைத்து, Nuxt பின்னணியை மாதிரியாக்க உதவுகிறது, [Nuxt ஆவணங்களில்](/docs/component-testing/vue#testing-vue-components-in-nuxt) மேலும் படிக்கவும்
- [__TailwindCSS__](https://tailwindcss.com/): WebdriverIO சோதனை இயக்கி நீங்கள் TailwindCSS ஐப் பயன்படுத்துகிறீர்களா என்பதைக் கண்டறிந்து, சூழலை சோதனைப் பக்கத்தில் சரியாக ஏற்றுகிறது

## அமைப்பு

உலாவியில் யூனிட் அல்லது கூறு சோதனைக்காக WebdriverIO ஐ அமைக்க, புதிய WebdriverIO திட்டத்தை இவ்வாறு தொடங்கவும்:

```bash
npm init wdio@latest ./
# or
yarn create wdio ./
```

கட்டமைப்பு வழிகாட்டி தொடங்கியவுடன், யூனிட் மற்றும் கூறு சோதனைகளை இயக்குவதற்கு `browser` ஐத் தேர்வுசெய்து, விருப்பமான முன்அமைவுகளைத் தேர்வுசெய்யவும். அல்லது அடிப்படை யூனிட் சோதனைகளை மட்டும் இயக்க விரும்பினால் _"Other"_ ஐத் தேர்வுசெய்யவும். உங்கள் திட்டத்தில் ஏற்கனவே Vite ஐப் பயன்படுத்தினால், தனிப்பயன் Vite கட்டமைப்பையும் கட்டமைக்கலாம். மேலும் தகவலுக்கு [ரன்னர் விருப்பங்கள்](/docs/runner#runner-options) அனைத்தையும் பார்க்கவும்.

:::info

__குறிப்பு:__ WebdriverIO இயல்பாக CI சூழலில் உலாவி சோதனைகளை headlessly இயக்கும், எ.க. `CI` சூழல் மாறி `'1'` அல்லது `'true'` என அமைக்கப்பட்டிருந்தால். [`headless`](/docs/runner#headless) விருப்பத்தைப் பயன்படுத்தி இந்த நடத்தையை கைமுறையாக கட்டமைக்கலாம்.

:::

இந்த செயல்முறையின் முடிவில் நீங்கள் ஒரு `wdio.conf.js` ஐக் காணலாம், இதில் பல்வேறு WebdriverIO கட்டமைப்புகள் உள்ளன, இதில் `runner` பண்பும் அடங்கும், எ.க.:

```ts reference useHTTPS runmeRepository="git@github.com:webdriverio/example-recipes.git" runmeFileToOpen="component-testing%2FREADME.md"
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

வெவ்வேறு [திறன்களை](/docs/configuration#capabilities) வரையறுப்பதன் மூலம், உங்கள் சோதனைகளை வெவ்வேறு உலாவிகளில், விரும்பினால் இணையாக இயக்கலாம்.

எல்லாம் எப்படி வேலை செய்கிறது என்பதில் இன்னும் தெளிவில்லை என்றால், WebdriverIO இல் கூறு சோதனையைத் தொடங்குவதற்கான பின்வரும் பயிற்சிக் காணொளியைப் பார்க்கவும்:

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## சோதனை ஹார்னெஸ்

உங்கள் சோதனைகளில் என்ன இயக்க வேண்டும் மற்றும் கூறுகளை எவ்வாறு காட்ட விரும்புகிறீர்கள் என்பது முற்றிலும் உங்களைப் பொறுத்தது. இருப்பினும், [Testing Library](https://testing-library.com/) ஐ பயன்பாட்டு கட்டமைப்பாகப் பயன்படுத்த பரிந்துரைக்கிறோம், ஏனெனில் இது React, Preact, Svelte மற்றும் Vue போன்ற பல்வேறு கூறு கட்டமைப்புகளுக்கான செருகுநிரல்களை வழங்குகிறது. இது சோதனைப் பக்கத்தில் கூறுகளைக் காட்டுவதற்கு மிகவும் பயனுள்ளதாக உள்ளது, மேலும் இது ஒவ்வொரு சோதனைக்குப் பிறகும் இந்தக் கூறுகளைத் தானாகவே சுத்தம் செய்கிறது.

நீங்கள் Testing Library அடிப்படைகளை WebdriverIO கட்டளைகளுடன் விரும்பியபடி கலக்கலாம், எ.க.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__குறிப்பு:__ Testing Library இலிருந்து ரெண்டர் முறைகளைப் பயன்படுத்துவது சோதனைகளுக்கு இடையில் உருவாக்கப்பட்ட கூறுகளை அகற்ற உதவுகிறது. நீங்கள் Testing Library ஐப் பயன்படுத்தவில்லை என்றால், உங்கள் சோதனைக் கூறுகளை சோதனைகளுக்கு இடையில் சுத்தம் செய்யப்படும் ஒரு கொள்கலனுடன் இணைக்கவும்.

## அமைப்பு ஸ்கிரிப்ட்கள்

நீங்கள் Node.js அல்லது உலாவியில் தன்னிச்சையான ஸ்கிரிப்ட்களை இயக்குவதன் மூலம் உங்கள் சோதனைகளை அமைக்கலாம், எ.க. ஸ்டைல்களைச் செருகுதல், உலாவி API களை மாதிரியாக்குதல் அல்லது மூன்றாம் தரப்பு சேவையுடன் இணைத்தல். WebdriverIO [hooks](/docs/configuration#hooks) Node.js இல் குறியீட்டை இயக்கப் பயன்படுத்தலாம், அதே நேரத்தில் [`mochaOpts.require`](/docs/frameworks#require) சோதனைகள் ஏற்றப்படுவதற்கு முன் ஸ்கிரிப்ட்களை உலாவிக்கு இறக்குமதி செய்ய அனுமதிக்கிறது, எ.க.:

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // provide a setup script to run in the browser
        require: './__fixtures__/setup.js'
    },
    before: () => {
        // set up test environment in Node.js
    }
    // ...
}
```

எடுத்துக்காட்டாக, பின்வரும் அமைப்பு ஸ்கிரிப்ட்டைக் கொண்டு உங்கள் சோதனையில் உள்ள அனைத்து [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) அழைப்புகளையும் மாற்றியமைக்க விரும்பினால்:

```js ./fixtures/setup.js
import { fn } from '@wdio/browser-runner'

// run code before all tests are loaded
window.fetch = fn()

export const mochaGlobalSetup = () => {
    // run code after test file is loaded
}

export const mochaGlobalTeardown = () => {
    // run code after spec file was executed
}

```

இப்போது உங்கள் சோதனைகளில் நீங்கள் அனைத்து உலாவி கோரிக்கைகளுக்கும் தனிப்பயன் பதில் மதிப்புகளை வழங்கலாம். உலகளாவிய பிக்ஸ்ச்சர்கள் பற்றி [Mocha ஆவணங்களில்](https://mochajs.org/#global-fixtures) மேலும் படிக்கவும்.

## கண்காணிப்பு சோதனை மற்றும் பயன்பாட்டு கோப்புகள்

உங்கள் உலாவி சோதனைகளை பிழைதிருத்தும் பல வழிகள் உள்ளன. மிக எளிதான வழி WebdriverIO சோதனை இயக்கியை `--watch` கொடியுடன் தொடங்குவது, எ.க.:

```sh
$ npx wdio run ./wdio.conf.js --watch
```

இது ஆரம்பத்தில் அனைத்து சோதனைகளையும் இயக்கி, அனைத்தும் இயக்கப்பட்டவுடன் நிறுத்தப்படும். பின்னர் நீங்கள் தனிப்பட்ட கோப்புகளில் மாற்றங்களைச் செய்யலாம், அதன்பின் அவை தனித்தனியாக மீண்டும் இயக்கப்படும். உங்கள் பயன்பாட்டுக் கோப்புகளைக் குறிக்கும் [`filesToWatch`](/docs/configuration#filestowatch) ஐ அமைத்தால், உங்கள் பயன்பாட்டில் மாற்றங்கள் செய்யப்படும்போது அது அனைத்து சோதனைகளையும் மீண்டும் இயக்கும்.

## பிழைதிருத்தம்

உங்கள் IDE இல் நிறுத்தப் புள்ளிகளை அமைத்து தொலைநிலை உலாவியால் அவற்றை அங்கீகரிக்க முடியவில்லை என்றாலும், எந்த இடத்திலும் சோதனையை நிறுத்த [`debug`](/docs/api/browser/debug) கட்டளையைப் பயன்படுத்தலாம். இது DevTools ஐத் திறந்து [sources tab](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools) இல் நிறுத்தப் புள்ளிகளை அமைப்பதன் மூலம் சோதனையைப் பிழைதிருத்த உங்களை அனுமதிக்கிறது.

`debug` கட்டளை அழைக்கப்படும்போது, உங்கள் முனையத்தில் Node.js repl இடைமுகத்தையும் பெறுவீர்கள்:

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

சோதனையைத் தொடர `Ctrl` அல்லது `Command` + `c` ஐ அழுத்தவும் அல்லது `.exit` ஐ உள்ளிடவும்.

## செலினியம் கிரிட் பயன்படுத்தி இயக்குதல்

உங்களிடம் [Selenium Grid](https://www.selenium.dev/documentation/grid/) அமைக்கப்பட்டு, அந்த கிரிட் வழியாக உங்கள் உலாவியை இயக்கினால், சோதனைக் கோப்புகள் சேவையாக வழங்கப்படும் சரியான ஹோஸ்ட்டை உலாவி அணுக அனுமதிக்க `host` browser runner விருப்பத்தை அமைக்க வேண்டும், எ.க.:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // network IP of the machine that runs the WebdriverIO process
        host: 'http://172.168.0.2'
    }]
}
```

இது உலாவி WebdriverIO சோதனைகளை இயக்கும் நிறுவனத்தில் ஹோஸ்ட் செய்யப்படும் சரியான சேவையக நிகழ்வைத் திறப்பதை உறுதி செய்யும்.

## உதாரணங்கள்

எங்கள் [உதாரண களஞ்சியத்தில்](https://github.com/webdriverio/component-testing-examples) பிரபலமான கூறு கட்டமைப்புகளைப் பயன்படுத்தி கூறுகளைச் சோதிப்பதற்கான பல்வேறு உதாரணங்களைக் காணலாம்.