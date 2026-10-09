---
id: gettingstarted
title: தொடங்குதல்
description: npm init wdio@latest மூலம் ஒரு WebdriverIO திட்டத்தை உருவாக்கி, உங்கள் முதல் சோதனையை இயக்கி, உங்கள் தளத்திற்கான அடுத்த வழிகாட்டியைக் கண்டறியுங்கள்.
---

ஒரே கட்டளையில் ஏற்கனவே உள்ள அல்லது புதிய திட்டத்தில் WebdriverIO-வை அமைத்து, உங்கள் முதல் சோதனையை இயக்குங்கள். நீங்கள் எதைச் சோதிக்க விரும்புகிறீர்கள் (web, mobile, desktop அல்லது VS Code extensions), எந்த framework மற்றும் reporters-ஐப் பயன்படுத்த வேண்டும் என்று கட்டமைப்பு வழிகாட்டி (configuration wizard) கேட்டு, அனைத்தையும் உங்களுக்காக நிறுவுகிறது.

:::info
இவை WebdriverIO __v10__-க்கான ஆவணங்கள். இன்னும் v9-இல் இருக்கிறீர்களா? [v9 ஆவணங்களைப்](https://v9.webdriver.io) பயன்படுத்துங்கள் அல்லது [v10 இடம்பெயர்வு வழிகாட்டியைப்](/docs/v10-migration) பின்பற்றுங்கள்.
:::

:::tip Coding agent-ஐப் பயன்படுத்துகிறீர்களா?
அதை [`https://webdriver.io/llms.txt`](https://webdriver.io/llms.txt)-க்கு சுட்டுங்கள் அல்லது `https://webdriver.io/mcp`-இல் உள்ள docs MCP server-உடன் இணைக்கவும். [Coding Agents-க்கான WebdriverIO](/docs/ai-agents)-ஐப் பார்க்கவும்.
:::

## WebdriverIO அமைப்பைத் தொடங்குதல்

[WebdriverIO Starter Toolkit](https://www.npmjs.com/package/create-wdio) ஏற்கனவே உள்ள அல்லது புதிய திட்டத்தில் முழுமையான WebdriverIO அமைப்பைச் சேர்க்கிறது. ஏற்கனவே உள்ள திட்டத்தின் root கோப்பகத்தில், இதை இயக்கவும்:

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'},
    {label: 'bun', value: 'bun'},
  ]
}>
<TabItem value="npm">

```sh
npm init wdio@latest .
```

அல்லது நீங்கள் புதிய திட்டத்தை உருவாக்க விரும்பினால்:

```sh
npm init wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio .
```

அல்லது நீங்கள் புதிய திட்டத்தை உருவாக்க விரும்பினால்:

```sh
yarn create wdio ./path/to/new/project
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest .
```

அல்லது நீங்கள் புதிய திட்டத்தை உருவாக்க விரும்பினால்:

```sh
pnpm create wdio@latest ./path/to/new/project
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest .
```

அல்லது நீங்கள் புதிய திட்டத்தை உருவாக்க விரும்பினால்:

```sh
bun create wdio@latest ./path/to/new/project
```

</TabItem>
</Tabs>

இந்த ஒற்றைக் கட்டளை WebdriverIO CLI கருவியைப் பதிவிறக்கி, உங்கள் test suite-ஐக் கட்டமைக்க உதவும் ஒரு கட்டமைப்பு வழிகாட்டியை இயக்குகிறது.

<CreateProjectAnimation />

அமைப்பின் வழியாக உங்களை வழிநடத்தும் தொடர் கேள்விகளை வழிகாட்டி கேட்கும். [Page Object](https://martinfowler.com/bliki/PageObject.html) pattern-ஐப் பயன்படுத்தி Chrome உடன் Mocha-வைப் பயன்படுத்தும் இயல்புநிலை அமைப்பைத் தேர்ந்தெடுக்க `--yes` அளவுருவை அனுப்பலாம்.

<Tabs
  defaultValue="npm"
  values={[
    {label: 'NPM', value: 'npm'},
    {label: 'Yarn', value: 'yarn'},
    {label: 'pnpm', value: 'pnpm'},
    {label: 'bun', value: 'bun'},
  ]
}>
<TabItem value="npm">

```sh
npm init wdio@latest . -- --yes
```

</TabItem>
<TabItem value="yarn">

```sh
yarn create wdio . --yes
```

</TabItem>
<TabItem value="pnpm">

```sh
pnpm create wdio@latest . --yes
```

</TabItem>
<TabItem value="bun">

```sh
bun create wdio@latest . --yes
```

</TabItem>
</Tabs>

### Flags மூலம் வழிகாட்டிக்குப் பதிலளித்தல்

வழிகாட்டியில் உள்ள ஒவ்வொரு கேள்விக்கும் ஒரு command line flag உள்ளது. ஒரு flag அதன் கேள்விக்குப் பதிலளிக்கிறது, மீதமுள்ளவற்றை மட்டுமே வழிகாட்டி கேட்கும். `--yes` உடன் சேர்த்துப் பயன்படுத்தும்போது, வழிகாட்டி மீதமுள்ளவற்றுக்கு இயல்புநிலைகளைப் பயன்படுத்துகிறது, ஒருபோதும் கேள்வி கேட்காது; இதுவே ஒரு coding agent அல்லது CI job-க்குத் தேவையானது:

```sh
# JavaScript-இல் Cucumber, spec மற்றும் JUnit reporters உடன்
npm init wdio@latest . -- --yes --framework cucumber --no-typescript --reporters spec,junit

# Chrome-க்குப் பதிலாக Firefox மற்றும் Edge
npm init wdio@latest . -- --yes --browsers firefox,edge

# Appium உடன் ஒரு Android செயலி
npm init wdio@latest . -- --yes --mobile-environment android

# React component சோதனைகள்
npm init wdio@latest . -- --yes --runner component --preset react

# config-ஐ எழுதவும், ஆனால் dependencies-ஐ நீங்களே நிறுவவும்
npm init wdio@latest . -- --yes --no-npm-install
```

Yarn, pnpm மற்றும் bun உடன், `--` பிரிப்பான் இல்லாமல் flags-ஐ அனுப்பவும், எ.கா. `pnpm create wdio@latest . --yes --framework cucumber`.

மிகவும் பொதுவான flags:

| Flag | மதிப்புகள் |
| --- | --- |
| `--runner` | `e2e` (இயல்புநிலை), `component`, `desktop`, `vscode`, `roku` |
| `--framework` | `mocha` (இயல்புநிலை), `jasmine`, `cucumber`, `serenity-mocha`, `serenity-jasmine`, `serenity-cucumber` |
| `--typescript` / `--no-typescript` | திட்டத்தில் `tsconfig.json` இருக்கும்போது TypeScript இயல்புநிலையாகும் |
| `--browsers` | `chrome` (இயல்புநிலை), `firefox`, `safari`, `edge` ஆகியவற்றின் காற்புள்ளியால் பிரிக்கப்பட்ட பட்டியல் |
| `--mobile-environment` | `android`, `ios` |
| `--backend` | `local` (இயல்புநிலை), `saucelabs`, `browserstack`, `experitest`, `grid`, `other` |
| `--preset` | `lit`, `vue`, `svelte`, `solid`, `stencil`, `react`, `preact`, `other`, `--runner component` உடன் |
| `--desktop-framework` | `electron`, `tauri`, `dioxus`, `macos`, `--runner desktop` உடன் |
| `--reporters`, `--services`, `--plugins` | காற்புள்ளியால் பிரிக்கப்பட்ட சுருக்கப் பெயர்கள், எ.கா. `--reporters spec,junit --services visual` |
| `--agent-support` / `--no-agent-support` | `AGENTS.md` பகுதியையும் `wdio-session` skill-ஐயும் எழுதுகிறது (இயல்பாக இயக்கத்தில்) |
| `--npm-install` / `--no-npm-install` | Dependencies-ஐ நிறுவுகிறது (இயல்பாக இயக்கத்தில்) |

`npm init wdio@latest -- --help` ஒவ்வொரு flag-ஐயும், அது ஏற்கும் மதிப்புகளையும், அது பதிலளிக்கும் கேள்வியையும் பட்டியலிடுகிறது. Boolean flags `--no-` முன்னொட்டை ஏற்கின்றன. அதே flags `npx wdio config` உடனும் செயல்படும்.

வழிகாட்டி ஒவ்வொரு flag-ஐயும் உங்கள் அமைப்புக்கு எதிராகச் சரிபார்க்கிறது. அறியப்படாத மதிப்பு, அது கேட்காத கேள்விக்கான flag, அல்லது உங்கள் அமைப்புக்கு அது வழங்காத மதிப்பு இருந்தால், எந்தக் கோப்பையும் எழுதுவதற்கு முன் exit code 2 உடன் அது நின்றுவிடும்:

```
Error: --preset does not apply to this setup. UI framework of your components (with --runner component).
```

## CLI-ஐ கைமுறையாக நிறுவுதல்

CLI package-ஐ உங்கள் திட்டத்தில் கைமுறையாகவும் இவ்வாறு சேர்க்கலாம்:

```sh
npm i --save-dev @wdio/cli
npx wdio --version # எ.கா. `8.13.10` என அச்சிடும்

# கட்டமைப்பு வழிகாட்டியை இயக்கவும்
npx wdio config
```

## சோதனையை இயக்குதல்

`run` கட்டளையைப் பயன்படுத்தி, நீங்கள் இப்போது உருவாக்கிய WebdriverIO config-ஐச் சுட்டுவதன் மூலம் உங்கள் test suite-ஐத் தொடங்கலாம்:

```sh
npx wdio run ./wdio.conf.js
```

குறிப்பிட்ட சோதனைக் கோப்புகளை இயக்க விரும்பினால் `--spec` அளவுருவைச் சேர்க்கலாம்:

```sh
npx wdio run ./wdio.conf.js --spec example.e2e.js
```

அல்லது உங்கள் config கோப்பில் suites-ஐ வரையறுத்து, ஒரு suite-இல் வரையறுக்கப்பட்ட சோதனைக் கோப்புகளை மட்டும் இயக்கலாம்:

```sh
npx wdio run ./wdio.conf.js --suite exampleSuiteName
```

## ஒரு script-இல் இயக்குதல்

ஒரு Node.JS script-க்குள் [Standalone Mode](/docs/setuptypes#standalone-mode)-இல் WebdriverIO-வை ஒரு automation engine ஆகப் பயன்படுத்த விரும்பினால், WebdriverIO-வை நேரடியாக நிறுவி ஒரு package ஆகவும் பயன்படுத்தலாம், எ.கா. ஒரு இணையதளத்தின் screenshot-ஐ உருவாக்க:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fc362f2f8dd823d294b9bb5f92bd5991339d4591/getting-started/run-in-script.js#L2-L19
```

__குறிப்பு:__ அனைத்து WebdriverIO கட்டளைகளும் asynchronous ஆனவை, அவற்றை [`async/await`](https://javascript.info/async-await) பயன்படுத்தி முறையாகக் கையாள வேண்டும்.

## சோதனைகளைப் பதிவுசெய்தல்

திரையில் உங்கள் சோதனைச் செயல்களைப் பதிவுசெய்து, WebdriverIO test scripts-ஐத் தானாக உருவாக்குவதன் மூலம் நீங்கள் தொடங்க உதவும் கருவிகளை WebdriverIO வழங்குகிறது. மேலும் தகவலுக்கு [Chrome DevTools Recorder மூலம் சோதனைகளைப் பதிவுசெய்தல்](/docs/record)-ஐப் பார்க்கவும்.

## கணினித் தேவைகள்

உங்களுக்கு [Node.js](http://nodejs.org) நிறுவப்பட்டிருக்க வேண்டும்.

- குறைந்தபட்சம் v22.19.0 அல்லது அதற்கு மேற்பட்டதை நிறுவவும், ஏனெனில் இதுவே ஆதரிக்கப்படும் மிகப் பழைய LTS பதிப்பாகும்
- LTS வெளியீடாக உள்ள அல்லது ஆகவிருக்கும் வெளியீடுகள் மட்டுமே அதிகாரப்பூர்வமாக ஆதரிக்கப்படுகின்றன

உங்கள் கணினியில் தற்போது Node நிறுவப்படவில்லை என்றால், பல செயலில் உள்ள Node.js பதிப்புகளை நிர்வகிக்க உதவ [NVM](https://github.com/creationix/nvm) அல்லது [Volta](https://volta.sh/) போன்ற கருவியைப் பயன்படுத்த பரிந்துரைக்கிறோம். NVM ஒரு பிரபலமான தேர்வு, Volta-வும் ஒரு நல்ல மாற்றாகும்.

## அறிமுகத்தைப் பாருங்கள்

<LiteYouTubeEmbed
    id="rA4IFNyW54c"
    title="Getting Started with WebdriverIO"
/>

மேலும் வீடியோக்கள் [அதிகாரப்பூர்வ YouTube சேனலில்](https://youtube.com/@webdriverio) உள்ளன.

## அடுத்த படிகள்

- உங்கள் தளத்தைத் தேர்ந்தெடுக்கவும்: [Web Browsers](/docs/platforms/web), [Mobile Apps](/docs/platforms/mobile), [Desktop Apps](/docs/platforms/desktop) அல்லது [Extensions & Editors](/docs/platforms/apps-and-extensions)
- [elements-ஐத் தேர்ந்தெடுப்பது](/docs/selectors) மற்றும் [assertions](/docs/assertion) எழுதுவது எப்படி என்று கற்றுக்கொள்ளுங்கள்
- [`wdio.conf.ts`](/docs/configurationfile)-இல் test runner-ஐக் கட்டமைக்கவும்
- [Discord](https://discord.webdriver.io)-இல் உதவி பெறுங்கள்