---
id: testrunner
title: டெஸ்ட்ரன்னர்
---

WebdriverIO அதன் சொந்த டெஸ்ட் ரன்னருடன் வருகிறது, இது உங்களுக்கு விரைவாக சோதனை செய்ய உதவுகிறது. இது உங்களுக்காக எல்லா வேலைகளையும் செய்வதோடு, மூன்றாம் தரப்பு சேவைகளை ஒருங்கிணைக்க அனுமதிக்கிறது, மேலும் உங்கள் சோதனைகளை திறமையாக இயக்க உதவுகிறது.

WebdriverIO-இன் டெஸ்ட் ரன்னர் தனியாக `@wdio/cli` என்ற NPM தொகுப்பில் உள்ளது.

இதை இவ்வாறு நிறுவவும்:

```sh npm2yarn
npm install @wdio/cli
```

கட்டளை வரி இடைமுகத்தின் உதவியைப் பார்க்க, உங்கள் முனையத்தில் பின்வரும் கட்டளையை உள்ளிடவும்:

```sh
$ npx wdio --help

wdio <command>

Commands:
  wdio config                           Initialize WebdriverIO and setup configuration in
                                        your current project.
  wdio install <type> <name>            Add a `reporter`, `service`, or `framework` to
                                        your WebdriverIO project
  wdio repl <option> [capabilities]     Run WebDriver session in command line
  wdio run <configPath>                 Run your WDIO configuration file to initialize
                                        your tests.

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

அருமை! இப்போது உங்கள் சோதனைகள், திறன்கள் மற்றும் அமைப்புகள் பற்றிய எல்லா தகவல்களும் அமைக்கப்பட்டுள்ள ஒரு கட்டமைப்பு கோப்பை நீங்கள் வரையறுக்க வேண்டும். அந்த கோப்பு எப்படி இருக்க வேண்டும் என்பதைப் பார்க்க [கட்டமைப்பு கோப்பு](/docs/configuration) பிரிவுக்குச் செல்லவும்.

`wdio` கட்டமைப்பு உதவியாளருடன், உங்கள் கட்டமைப்பு கோப்பை உருவாக்குவது மிகவும் எளிது. இதை இயக்கவும்:

```sh
$ npx wdio config
```

...இது உதவி கருவியை துவக்குகிறது.

இது உங்களிடம் கேள்விகளைக் கேட்கும் மற்றும் ஒரு நிமிடத்திற்கும் குறைவாக உங்களுக்கு ஒரு கட்டமைப்பு கோப்பை உருவாக்கும்.

![WDIO கட்டமைப்பு கருவி](/img/config-utility.gif)

உங்கள் கட்டமைப்பு கோப்பை அமைத்தவுடன், நீங்கள் உங்கள் சோதனைகளை இவ்வாறு இயக்கலாம்:

```sh
npx wdio run wdio.conf.js
```

நீங்கள் `run` கட்டளை இல்லாமல் உங்கள் சோதனையை இயக்கலாம்:

```sh
npx wdio wdio.conf.js
```

அவ்வளவுதான்! இப்போது, நீங்கள் உலகளாவிய மாறி `browser` மூலம் செலினியம் உறுப்பை அணுகலாம்.

## கட்டளைகள்

### `wdio config`

`config` கட்டளை WebdriverIO கட்டமைப்பு உதவியாளரை இயக்குகிறது. இந்த உதவியாளர் உங்கள் WebdriverIO திட்டம் பற்றி சில கேள்விகளைக் கேட்கும் மற்றும் உங்கள் பதில்களின் அடிப்படையில் `wdio.conf.js` கோப்பை உருவாக்கும்.

உதாரணம்:

```sh
wdio config
```

விருப்பங்கள்:

```
--help            prints WebdriverIO help menu                                [boolean]
--npm             Wether to install the packages using NPM instead of yarn    [boolean]
```

### `wdio run`

> இது உங்கள் கட்டமைப்பை இயக்குவதற்கான இயல்புநிலை கட்டளையாகும்.

`run` கட்டளை உங்கள் WebdriverIO கட்டமைப்பு கோப்பை துவக்குகிறது மற்றும் உங்கள் சோதனைகளை இயக்குகிறது.

உதாரணம்:

```sh
wdio run ./wdio.conf.js --watch
```

விருப்பங்கள்:

```
--help                prints WebdriverIO help menu                   [boolean]
--version             prints WebdriverIO version                     [boolean]
--hostname, -h        automation driver host address                  [string]
--port, -p            automation driver port                          [number]
--user, -u            username if using a cloud service as automation backend
                                                                        [string]
--key, -k             corresponding access key to the user            [string]
--watch               watch specs for changes                        [boolean]
--logLevel, -l        level of logging verbosity
                            [choices: "trace", "debug", "info", "warn", "error", "silent"]
--bail                stop test runner after specific amount of tests have
                        failed                                          [number]
--baseUrl             shorten url command calls by setting a base url [string]
--waitforTimeout, -w  timeout for all waitForXXX commands             [number]
--framework, -f       defines the framework (Mocha, Jasmine or Cucumber) to
                        run the specs                                   [string]
--reporters, -r       reporters to print out the results on stdout      [array]
--suite               overwrites the specs attribute and runs the defined
                        suite                                            [array]
--spec                run a certain spec file or wildcards - overrides specs piped
                        from stdin                                       [array]
--exclude             exclude spec file(s) from a run - overrides specs piped
                        from stdin                                       [array]
--repeat              Repeat specific specs and/or suites N times        [number]
--mochaOpts           Mocha options
--jasmineOpts         Jasmine options
--cucumberOpts        Cucumber options
```

> குறிப்பு: தானியங்கு தொகுப்பு `tsx` ENV மாறிகளுடன் எளிதாக கட்டுப்படுத்தப்படலாம். [TypeScript ஆவணங்களை](/docs/typescript) பார்க்கவும்.

### `wdio install`
`install` கட்டளை நீங்கள் CLI மூலம் WebdriverIO திட்டங்களுக்கு அறிக்கையாளர்கள் மற்றும் சேவைகளைச் சேர்க்க அனுமதிக்கிறது.

உதாரணம்:

```sh
wdio install service sauce # installs @wdio/sauce-service
wdio install reporter dot # installs @wdio/dot-reporter
wdio install framework mocha # installs @wdio/mocha-framework
```

நீங்கள் `yarn` பயன்படுத்தி தொகுப்புகளை நிறுவ விரும்பினால், கட்டளைக்கு `--yarn` கொடியைச் சேர்க்கலாம்:

```sh
wdio install service sauce --yarn
```

உங்கள் WDIO கட்டமைப்பு கோப்பு நீங்கள் வேலை செய்யும் அதே கோப்புறையில் இல்லாவிட்டால், நீங்கள் தனிப்பயன் கட்டமைப்பு பாதையைக் கொடுக்கலாம்:

```sh
wdio install service sauce --config="./path/to/wdio.conf.js"
```

#### ஆதரிக்கப்படும் சேவைகளின் பட்டியல்

```
sauce
testingbot
firefox-profile
devtools
browserstack
appium
intercept
zafira-listener
reportportal
docker
wiremock
lambdatest
vite
nuxt
```

#### ஆதரிக்கப்படும் அறிக்கையாளர்களின் பட்டியல்

```
dot
spec
junit
allure
sumologic
concise
reportportal
video
html
json
mochawesome
timeline
```

#### ஆதரிக்கப்படும் கட்டமைப்புகளின் பட்டியல்

```
mocha
jasmine
cucumber
```

### `wdio repl`

repl கட்டளை WebdriverIO கட்டளைகளை இயக்குவதற்கு ஊடாடும் கட்டளை வரி இடைமுகத்தைத் தொடங்க அனுமதிக்கிறது. இது சோதனை நோக்கங்களுக்கு அல்லது WebdriverIO அமர்வை விரைவாகத் தொடங்க பயன்படுத்தப்படலாம்.

உள்ளூர் குரோமில் சோதனைகளை இயக்கவும்:

```sh
wdio repl chrome
```

அல்லது Sauce Labs-இல் சோதனைகளை இயக்கவும்:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

[run கட்டளையில்](#wdio-run) நீங்கள் பயன்படுத்தக்கூடிய அதே வாதங்களை நீங்கள் பயன்படுத்தலாம்.