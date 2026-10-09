---
id: testrunner
title: टेस्टरनर
description: "@wdio/cli से WDIO टेस्टरनर इंस्टॉल करें और टेस्ट सूट सेट अप करने और चलाने के लिए इसके config, run, install, repl और session कमांड का उपयोग करें।"
---

WebdriverIO टेस्टरनर आपके टेस्ट सूट को एक कॉन्फ़िगरेशन फ़ाइल से चलाता है। यह प्रत्येक capability के लिए एक वर्कर शुरू करता है, आपके फ्रेमवर्क, सर्विसेज़ और रिपोर्टर्स को जोड़ता है, और specs को समानांतर में चलाता है। हर टेस्ट प्रोजेक्ट के लिए इसका उपयोग करें; [स्टैंडअलोन मोड](/docs/setuptypes) का उपयोग केवल तभी करें जब आप WebdriverIO को अपनी स्वयं की टूलिंग में एम्बेड करते हैं।

टेस्टरनर `@wdio/cli` पैकेज में आता है:

```sh npm2yarn
npm install --save-dev @wdio/cli
```

जब `@wdio/cli` अभी तक इंस्टॉल नहीं है, तब भी `npx wdio` वही CLI चलाता है। npm बिना स्कोप वाला [`wdio`](https://www.npmjs.com/package/wdio) पैकेज इंस्टॉल करता है, और वह पैकेज `@wdio/cli` को शुरू करता है।

एक नया प्रोजेक्ट सेट अप करने के लिए, कॉन्फ़िगरेशन विज़ार्ड चलाएँ। यह कुछ प्रश्न पूछता है, पैकेज इंस्टॉल करता है और एक `wdio.conf.ts` लिखता है:

```sh
npx wdio config
```

फिर अपने टेस्ट चलाएँ:

```sh
npx wdio run wdio.conf.ts
```

`run` डिफ़ॉल्ट कमांड है, इसलिए `npx wdio wdio.conf.ts` भी यही करता है। अपने specs में, `@wdio/globals` से सेशन इम्पोर्ट करें:

```ts title="test/specs/example.e2e.ts"
import { browser, $, expect } from '@wdio/globals'

describe('webdriver.io', () => {
    it('has a title', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
    })
})
```

`wdio.conf.ts` के हर विकल्प के लिए [कॉन्फ़िगरेशन फ़ाइल](/docs/configurationfile) देखें।

## कमांड्स

```sh
$ npx wdio --help

wdio [command]

Commands:
  wdio config                           Initialize WebdriverIO and setup
                                        configuration in your current project.
  wdio install <type> <name>            Add a `reporter`, `service`, or
                                        `framework` to your WebdriverIO project.
  wdio repl [option] [capabilities]     Run WebDriver session in command line
  wdio run <configPath>                 Run your WDIO configuration file to
                                        initialize your tests. (default)
  wdio session [action..]               Drive a browser, mobile app or desktop
                                        app from the shell

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```

हर कमांड `--help` के साथ अपने स्वयं के विकल्प प्रिंट करता है, उदाहरण के लिए `npx wdio run --help`।

### `wdio config`

`config` कमांड कॉन्फ़िगरेशन विज़ार्ड चलाता है और आपके उत्तरों के आधार पर एक `wdio.conf.ts` (या `wdio.conf.js`) बनाता है।

```sh
npx wdio config
```

बिना पूछे डिफ़ॉल्ट (Mocha, Chrome और पेज ऑब्जेक्ट्स) का उपयोग करने के लिए `--yes` पास करें। हर विज़ार्ड प्रश्न के लिए एक फ़्लैग भी है, इसलिए आप उनमें से कुछ या सभी का उत्तर कमांड लाइन पर दे सकते हैं:

```sh
npx wdio config --yes --framework cucumber --no-typescript --reporters spec,junit
```

विकल्प:

```
-y, --yes      will fill in all config defaults without prompting
                                                      [boolean] [default: false]
-t, --npmTag   define NPM tag to use for WebdriverIO related packages
                                                    [string] [default: "latest"]
    --help     Show help, including a flag for every wizard question   [boolean]
```

विज़ार्ड उसी पैकेज मैनेजर से पैकेज इंस्टॉल करता है जो इसे चलाता है: `pnpm wdio config` pnpm का उपयोग करता है, `yarn wdio config` Yarn का उपयोग करता है, और `npx` npm का उपयोग करता है।

`npx wdio config --help` विज़ार्ड फ़्लैग्स और उनके द्वारा स्वीकार किए जाने वाले मानों को सूचीबद्ध करता है। किसी ऐसे प्रश्न के लिए फ़्लैग जो विज़ार्ड आपके सेटअप के लिए नहीं पूछता, एक त्रुटि है, और ऐसा मान भी त्रुटि है जो यह प्रदान नहीं करता। उदाहरणों के लिए [फ़्लैग्स के साथ विज़ार्ड का उत्तर दें](/docs/gettingstarted#answer-the-wizard-with-flags) देखें।

### `wdio run`

> यह आपके कॉन्फ़िगरेशन को चलाने के लिए डिफ़ॉल्ट कमांड है।

`run` कमांड आपकी कॉन्फ़िगरेशन फ़ाइल लोड करता है और आपके टेस्ट चलाता है। कमांड लाइन विकल्प कॉन्फ़िगरेशन फ़ाइल में मेल खाने वाले विकल्पों को ओवरराइड करते हैं।

```sh
npx wdio run wdio.conf.ts --spec test/specs/login.e2e.ts
```

विकल्प:

```
    --watch            Run WebdriverIO in watch mode                   [boolean]
-h, --hostname         automation driver host address                   [string]
-p, --port             automation driver port                           [number]
    --path             path to WebDriver endpoints (default "/")        [string]
-u, --user             username if using a cloud service as automation backend
                                                                        [string]
-k, --key              corresponding access key to the user             [string]
-l, --logLevel         level of logging verbosity
                [choices: "trace", "debug", "info", "warn", "error", "silent"]
    --bail             stop test runner after specific amount of tests have
                       failed                                           [number]
    --baseUrl          shorten url command calls by setting a base url  [string]
-w, --waitforTimeout   timeout for all waitForXXX commands              [number]
-s, --updateSnapshots  update DOM, image or test snapshots              [string]
-f, --framework        defines the framework (Mocha, Jasmine or Cucumber) to
                       run the specs                                    [string]
-r, --reporters        reporters to print out the results on stdout      [array]
    --suite            overwrites the specs attribute and runs the defined
                       suite                                             [array]
    --spec             run only a certain spec file or wildcard - overrides
                       specs piped from stdin                            [array]
    --exclude          exclude certain spec file or wildcard from the test run
                       - overrides exclude piped from stdin              [array]
    --repeat           Repeat specific specs and/or suites N times      [number]
    --mochaOpts        Mocha options
    --jasmineOpts      Jasmine options
    --cucumberOpts     Cucumber options
    --coverage         Enable coverage for browser runner
    --headless         run all browser instances in headless mode, overrides
                       capability settings in wdio.conf.js             [boolean]
    --shard            Shard tests and execute only the selected shard.
                       Specify in the one-based form like `--shard x/y`, where
                       x is the current and y the total shard.
    --cpuProf          Enable Node.js CPU profiling for worker processes
                       (--cpu-prof)                                    [boolean]
    --heapProf         Enable Node.js heap profiling for worker processes
                       (--heap-prof)                                   [boolean]
    --debug            Pause failing tests and browser.debug() in an agent
                       session. Only `agent` is supported
                                                   [string] [choices: "agent"]
    --tsConfigPath     custom path for `tsconfig.json`                  [string]
```

उदाहरण:

```sh
# एक सूट चलाएँ
npx wdio run wdio.conf.ts --suite login

# चार शार्ड्स में से पहला चलाएँ, उदाहरण के लिए CI मैट्रिक्स में
npx wdio run wdio.conf.ts --shard 1/4

# सभी ब्राउज़र headless चलाएँ, या headed मोड को बाध्य करें
npx wdio run wdio.conf.ts --headless
npx wdio run wdio.conf.ts --headless=false

# डॉट नोटेशन के साथ फ्रेमवर्क विकल्प सेट करें
npx wdio run wdio.conf.ts --mochaOpts.timeout 60000

# लाइन नंबर द्वारा एक Cucumber परिदृश्य चलाएँ
npx wdio run wdio.conf.ts --spec ./features/login.feature:5

# एक कस्टम tsconfig.json का उपयोग करें
npx wdio run wdio.conf.ts --tsConfigPath=./configs/bdd-tsconfig.json

# विफल टेस्ट और browser.debug() को रोकें ताकि एक कोडिंग एजेंट उनका निरीक्षण कर सके
npx wdio run wdio.conf.ts --debug=agent
```

`--tsConfigPath` आपके कॉन्फ़िगरेशन की [`tsConfigPath`](/docs/configurationfile) सेटिंग को ओवरराइड करता है। WebdriverIO आपके specs को `tsx` के साथ कैसे कंपाइल करता है, इसके लिए [TypeScript](/docs/typescript) देखें।

### `wdio install`

`install` कमांड किसी मौजूदा प्रोजेक्ट में एक रिपोर्टर, सर्विस, फ्रेमवर्क, प्लगइन या रनर जोड़ता है। यह पैकेज इंस्टॉल करता है, इसे आपके `package.json` में जोड़ता है और आपकी कॉन्फ़िगरेशन फ़ाइल को अपडेट करता है।

```sh
npx wdio install service sauce        # @wdio/sauce-service इंस्टॉल करता है
npx wdio install reporter dot         # @wdio/dot-reporter इंस्टॉल करता है
npx wdio install framework mocha      # @wdio/mocha-framework इंस्टॉल करता है
```

पैकेज उसी पैकेज मैनेजर से इंस्टॉल किए जाते हैं जो कमांड चलाता है, इसलिए `pnpm wdio install reporter dot` pnpm से इंस्टॉल करता है और `yarn wdio install reporter dot` Yarn से। `npx` और सीधे कॉल npm का उपयोग करते हैं।

यदि आपकी कॉन्फ़िगरेशन फ़ाइल वर्तमान फ़ोल्डर में `wdio.conf.(js|ts|cjs|mjs)` नहीं है, तो उसका स्थान पास करें:

```sh
npx wdio install service sauce --config="./path/to/wdio.conf.ts"
```

`npx wdio install --help` हर समर्थित पैकेज को उसके npm नाम के साथ प्रिंट करता है।

#### समर्थित सर्विसेज़ की सूची

```
visual, ai, vite, nuxt, firefox-profile, gmail, sauce, testingbot,
browserstack, lighthouse, vscode, electron, tauri, tauri-plugin, dioxus,
appium, camera, eslinter, lambdatest, tvlabs, zafira-listener, reportportal,
docker, ui5, wiremock, ng-apimock, slack, cucumber-viewport-logger, intercept,
novus-visual-regression, rerun, winappdriver, ywinappdriver, performancetotal,
cleanuptotal, aws-device-farm, ms-teams, tesults, azure-devops, google-chat,
qmate-service, robonut, qunit, roku, obsidian, null-driver
```

#### समर्थित रिपोर्टर्स की सूची

```
spec, dot, junit, allure, sumologic, concise, json, reportportal, video,
cucumberjs-json, mochawesome, timeline, html-nice, slack, teamcity, delta,
testrail, light, jsonhtml
```

#### समर्थित फ्रेमवर्क की सूची

```
mocha, jasmine, cucumber
```

#### समर्थित प्लगइन्स और रनर्स की सूची

```
plugin: wait-for, harness, testing-library
runner: local, browser
```

### `wdio repl`

`repl` कमांड एक WebDriver सेशन शुरू करता है और एक इंटरैक्टिव प्रॉम्प्ट खोलता है जहाँ आप WebdriverIO कमांड चलाते हैं। बिना spec लिखे सेलेक्टर्स और कमांड्स को आज़माने के लिए इसका उपयोग करें। अधिक जानकारी के लिए [REPL इंटरफ़ेस](/docs/repl) देखें।

एक लोकल Chrome शुरू करें:

```sh
npx wdio repl chrome
```

Sauce Labs क्लाउड में चलाएँ:

```sh
npx wdio repl chrome --user $SAUCE_USERNAME --key $SAUCE_ACCESS_KEY
```

अपनी कॉन्फ़िगरेशन फ़ाइल से एक capability का उपयोग करें, इंडेक्स द्वारा या उसके multi-remote नाम द्वारा:

```sh
npx wdio repl ./wdio.conf.ts 0 -p 9515
```

नया ब्राउज़र शुरू करने के बजाय एक चल रहे [`wdio session`](/docs/session) से जुड़ें:

```sh
npx wdio repl --session default
```

`repl` [run कमांड](#wdio-run) के कनेक्शन विकल्प (`--hostname`, `--port`, `--path`, `--user`, `--key`, `--logLevel`, ...) और ये मोबाइल विकल्प स्वीकार करता है। लंबे `--user` और `--udid` रूपों का उपयोग करें: `-u` दोनों का छोटा उपनाम है।

```
-v, --platformVersion  Version of OS for mobile devices                 [string]
-d, --deviceName       Device name for mobile devices                   [string]
    --udid             UDID of real mobile devices                      [string]
-s, --session          Attach to a running `wdio session` instead of starting a
                       browser                                          [string]
```

### `wdio session`

`session` कमांड शेल से एक ब्राउज़र, मोबाइल ऐप या डेस्कटॉप ऐप को चलाता है, प्रति कॉल एक कमांड। यह कोडिंग एजेंट्स के लिए बनाया गया है: वे एक सेशन खोलते हैं, स्नैपशॉट लेते हैं, क्लिक और टाइप करते हैं, और जो उन्होंने किया उसे एक टेस्ट के रूप में एक्सपोर्ट करते हैं। वर्कफ़्लो के लिए [wdio session](/docs/session) और हर एक्शन के लिए [wdio session कमांड्स](/docs/session-commands) देखें।

```sh
npx wdio session --help
```

## अगले चरण

- [कॉन्फ़िगरेशन फ़ाइल](/docs/configurationfile): `wdio.conf.ts` का हर विकल्प
- [शुरुआत करें](/docs/gettingstarted): विज़ार्ड के साथ एक प्रोजेक्ट सेट अप करें
- [REPL इंटरफ़ेस](/docs/repl): कमांड्स को इंटरैक्टिव रूप से डीबग करें
- [wdio session](/docs/session): शेल या एक एजेंट से ब्राउज़र चलाएँ