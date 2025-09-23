---
id: testrunner
title: टेस्टरनर
---

WebdriverIO अपने खुद के टेस्ट रनर के साथ आता है जिससे आप जल्द से जल्द परीक्षण शुरू कर सकते हैं। यह आपके लिए सभी काम करने के लिए बनाया गया है, तीसरे पक्ष की सेवाओं को एकीकृत करने की अनुमति देता है, और आपको अपने परीक्षणों को अधिक से अधिक कुशलता से चलाने में मदद करता है।

WebdriverIO का टेस्टरनर NPM पैकेज `@wdio/cli` में अलग से बंडल किया गया है।

इसे इस प्रकार इंस्टॉल करें:

```sh npm2yarn
npm install @wdio/cli
```

कमांड लाइन इंटरफेस मदद देखने के लिए, अपने टर्मिनल में निम्न कमांड टाइप करें:

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

बढ़िया! अब आपको एक कॉन्फिगरेशन फाइल को परिभाषित करने की आवश्यकता है जहां आपके टेस्ट, क्षमताओं और सेटिंग्स के बारे में सभी जानकारी सेट की गई है। यह फाइल कैसी दिखनी चाहिए, यह देखने के लिए [Configuration File](/docs/configuration) सेक्शन पर जाएं।

`wdio` कॉन्फिगरेशन हेल्पर के साथ, अपनी कॉन्फिग फाइल जेनरेट करना बहुत आसान है। बस चलाएं:

```sh
$ npx wdio config
```

...और यह हेल्पर यूटिलिटी लॉन्च करता है।

यह आपसे कुछ प्रश्न पूछेगा और एक मिनट से भी कम समय में आपके लिए एक कॉन्फिग फाइल जेनरेट करेगा।

![WDIO configuration utility](/img/config-utility.gif)

एक बार आपका कॉन्फिगरेशन फाइल सेट हो जाने के बाद, आप अपने टेस्ट इस तरह शुरू कर सकते हैं:

```sh
npx wdio run wdio.conf.js
```

आप `run` कमांड के बिना भी अपना टेस्ट रन इनिशियलाइज़ कर सकते हैं:

```sh
npx wdio wdio.conf.js
```

बस इतना ही! अब आप ग्लोबल वेरिएबल `browser` के माध्यम से सेलेनियम इंस्टेंस तक पहुंच सकते हैं।

## कमांड्स

### `wdio config`

`config` कमांड WebdriverIO कॉन्फिगरेशन हेल्पर चलाता है। यह हेल्पर आपसे आपके WebdriverIO प्रोजेक्ट के बारे में कुछ प्रश्न पूछेगा और आपके उत्तरों के आधार पर `wdio.conf.js` फाइल बनाएगा।

उदाहरण:

```sh
wdio config
```

विकल्प:

```
--help            prints WebdriverIO help menu                                [boolean]
--npm             Wether to install the packages using NPM instead of yarn    [boolean]
```

### `wdio run`

> यह आपके कॉन्फिगरेशन को चलाने के लिए डिफॉल्ट कमांड है।

`run` कमांड आपकी WebdriverIO कॉन्फिगरेशन फाइल को इनिशियलाइज़ करता है और आपके टेस्ट चलाता है।

उदाहरण:

```sh
wdio run ./wdio.conf.js --watch
```

विकल्प:

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
--tsConfigPath        Custom path for `tsconfig.json` or use wdio config's [tsConfigPath setting](/docs/configurationfile)
```

> नोट: ऑटोकंपाइलिंग को `tsx` ENV वेरिएबल्स के साथ आसानी से नियंत्रित किया जा सकता है। [TypeScript documentation](/docs/typescript) भी देखें।

### `wdio install`
`install` कमांड आपको CLI के माध्यम से अपने WebdriverIO प्रोजेक्ट्स में रिपोर्टर और सर्विसेज़ जोड़ने की अनुमति देता है।

उदाहरण:

```sh
wdio install service sauce # installs @wdio/sauce-service
wdio install reporter dot # installs @wdio/dot-reporter
wdio install framework mocha # installs @wdio/mocha-framework
```

यदि आप `yarn` का उपयोग करके पैकेज इंस्टॉल करना चाहते हैं, तो आप कमांड को `--yarn` फ्लैग पास कर सकते हैं:

```sh
wdio install service sauce --yarn
```

आप एक कस्टम कॉन्फिगरेशन पाथ भी पास कर सकते हैं अगर आपकी WDIO कॉन्फिग फाइल उसी फोल्डर में नहीं है जिस पर आप काम कर रहे हैं:

```sh
wdio install service sauce --config="./path/to/wdio.conf.js"
```

#### समर्थित सेवाओं की सूची

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

#### समर्थित रिपोर्टर्स की सूची

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

#### समर्थित फ्रेमवर्क्स की सूची

```
mocha
jasmine
cucumber
```

### `wdio repl`

repl कमांड WebdriverIO कमांड्स चलाने के लिए एक इंटरैक्टिव कमांड लाइन इंटरफेस शुरू करने की अनुमति देता है। इसका उपयोग परीक्षण उद्देश्यों के लिए किया जा सकता है या बस जल्दी से WebdriverIO सेशन शुरू करने के लिए किया जा सकता है।

लोकल क्रोम में टेस्ट चलाएं:

```sh
wdio repl chrome
```

या Sauce Labs पर टेस्ट चलाएं:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

आप वही आर्ग्यूमेंट्स लागू कर सकते हैं जो आप [run command](#wdio-run) में कर सकते हैं।