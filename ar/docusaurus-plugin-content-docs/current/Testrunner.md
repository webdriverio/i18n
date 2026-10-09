---
id: testrunner
title: مُشغّل الاختبارات
description: "ثبّت مُشغّل اختبارات WDIO من @wdio/cli واستخدم أوامره config وrun وinstall وrepl وsession لإعداد مجموعات الاختبارات وتشغيلها."
---

يُشغّل مُشغّل اختبارات WebdriverIO مجموعة اختباراتك انطلاقًا من ملف إعدادات. فهو يبدأ عاملًا (worker) واحدًا لكل قدرة (capability)، ويربط إطار العمل والخدمات والمُبلِّغات (reporters) الخاصة بك، ويُشغّل ملفات المواصفات (specs) بالتوازي. استخدمه في كل مشروع اختبارات؛ ولا تستخدم [الوضع المستقل](/docs/setuptypes) إلا عندما تُضمِّن WebdriverIO في أدواتك الخاصة.

يأتي مُشغّل الاختبارات ضمن الحزمة `@wdio/cli`:

```sh npm2yarn
npm install --save-dev @wdio/cli
```

يُشغّل الأمر `npx wdio` واجهة سطر الأوامر نفسها عندما لا تكون `@wdio/cli` مثبتة بعد. إذ يثبّت npm الحزمة غير المُقيَّدة بنطاق [`wdio`](https://www.npmjs.com/package/wdio)، وتقوم تلك الحزمة بتشغيل `@wdio/cli`.

لإعداد مشروع جديد، شغّل معالج الإعدادات. يطرح عليك بعض الأسئلة، ويثبّت الحزم، ويكتب ملف `wdio.conf.ts`:

```sh
npx wdio config
```

ثم شغّل اختباراتك:

```sh
npx wdio run wdio.conf.ts
```

`run` هو الأمر الافتراضي، لذا فإن `npx wdio wdio.conf.ts` يؤدي الشيء نفسه. في ملفات المواصفات، استورد الجلسة من `@wdio/globals`:

```ts title="test/specs/example.e2e.ts"
import { browser, $, expect } from '@wdio/globals'

describe('webdriver.io', () => {
    it('has a title', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
    })
})
```

راجع [ملف الإعدادات](/docs/configurationfile) للاطلاع على جميع خيارات `wdio.conf.ts`.

## الأوامر

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

يطبع كل أمر خياراته الخاصة عند استخدام `--help`، مثل `npx wdio run --help`.

### `wdio config`

يُشغّل الأمر `config` معالج الإعدادات وينشئ ملف `wdio.conf.ts` (أو `wdio.conf.js`) بناءً على إجاباتك.

```sh
npx wdio config
```

مرّر `--yes` لاستخدام القيم الافتراضية (Mocha وChrome وكائنات الصفحات) دون أي مطالبات. ولكل سؤال في المعالج علامة (flag) مقابلة أيضًا، لذا يمكنك الإجابة عن بعضها أو جميعها من سطر الأوامر:

```sh
npx wdio config --yes --framework cucumber --no-typescript --reporters spec,junit
```

الخيارات:

```
-y, --yes      will fill in all config defaults without prompting
                                                      [boolean] [default: false]
-t, --npmTag   define NPM tag to use for WebdriverIO related packages
                                                    [string] [default: "latest"]
    --help     Show help, including a flag for every wizard question   [boolean]
```

يثبّت المعالج الحزم باستخدام مدير الحزم الذي يُشغّله: فالأمر `pnpm wdio config` يستخدم pnpm، و`yarn wdio config` يستخدم Yarn، و`npx` يستخدم npm.

يسرد الأمر `npx wdio config --help` علامات المعالج والقيم التي تقبلها. ويُعدّ استخدام علامة لسؤال لا يطرحه المعالج في إعدادك خطأً، وكذلك استخدام قيمة لا يعرضها. راجع [الإجابة عن المعالج باستخدام العلامات](/docs/gettingstarted#answer-the-wizard-with-flags) للاطلاع على أمثلة.

### `wdio run`

> هذا هو الأمر الافتراضي لتشغيل إعداداتك.

يحمّل الأمر `run` ملف الإعدادات الخاص بك ويُشغّل اختباراتك. وتتجاوز خيارات سطر الأوامر الخيارات المطابقة لها في ملف الإعدادات.

```sh
npx wdio run wdio.conf.ts --spec test/specs/login.e2e.ts
```

الخيارات:

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

أمثلة:

```sh
# تشغيل مجموعة اختبارات واحدة
npx wdio run wdio.conf.ts --suite login

# تشغيل الجزء الأول من أربعة أجزاء، مثلًا في مصفوفة CI
npx wdio run wdio.conf.ts --shard 1/4

# تشغيل جميع المتصفحات بدون واجهة، أو فرض الوضع المرئي
npx wdio run wdio.conf.ts --headless
npx wdio run wdio.conf.ts --headless=false

# تعيين خيارات إطار العمل باستخدام صيغة النقطة
npx wdio run wdio.conf.ts --mochaOpts.timeout 60000

# تشغيل سيناريو Cucumber حسب رقم السطر
npx wdio run wdio.conf.ts --spec ./features/login.feature:5

# استخدام ملف tsconfig.json مخصص
npx wdio run wdio.conf.ts --tsConfigPath=./configs/bdd-tsconfig.json

# إيقاف الاختبارات الفاشلة و browser.debug() مؤقتًا ليتمكن وكيل برمجة من فحصها
npx wdio run wdio.conf.ts --debug=agent
```

يتجاوز الخيار `--tsConfigPath` إعداد [`tsConfigPath`](/docs/configurationfile) في إعداداتك. راجع [TypeScript](/docs/typescript) لمعرفة كيف يُترجم WebdriverIO ملفات المواصفات باستخدام `tsx`.

### `wdio install`

يضيف الأمر `install` مُبلِّغًا أو خدمة أو إطار عمل أو إضافة أو مُشغّلًا إلى مشروع قائم. فهو يثبّت الحزمة، ويضيفها إلى ملف `package.json`، ويحدّث ملف الإعدادات الخاص بك.

```sh
npx wdio install service sauce        # installs @wdio/sauce-service
npx wdio install reporter dot         # installs @wdio/dot-reporter
npx wdio install framework mocha      # installs @wdio/mocha-framework
```

تُثبَّت الحزم باستخدام مدير الحزم الذي يُشغّل الأمر، لذا فإن `pnpm wdio install reporter dot` يثبّت باستخدام pnpm، و`yarn wdio install reporter dot` باستخدام Yarn. أما `npx` والاستدعاءات المباشرة فتستخدم npm.

إذا لم يكن ملف الإعدادات الخاص بك هو `wdio.conf.(js|ts|cjs|mjs)` في المجلد الحالي، فمرّر موقعه:

```sh
npx wdio install service sauce --config="./path/to/wdio.conf.ts"
```

يطبع الأمر `npx wdio install --help` جميع الحزم المدعومة مع أسمائها في npm.

#### قائمة الخدمات المدعومة

```
visual, ai, vite, nuxt, firefox-profile, gmail, sauce, testingbot,
browserstack, lighthouse, vscode, electron, tauri, tauri-plugin, dioxus,
appium, camera, eslinter, lambdatest, tvlabs, zafira-listener, reportportal,
docker, ui5, wiremock, ng-apimock, slack, cucumber-viewport-logger, intercept,
novus-visual-regression, rerun, winappdriver, ywinappdriver, performancetotal,
cleanuptotal, aws-device-farm, ms-teams, tesults, azure-devops, google-chat,
qmate-service, robonut, qunit, roku, obsidian, null-driver
```

#### قائمة المُبلِّغات المدعومة

```
spec, dot, junit, allure, sumologic, concise, json, reportportal, video,
cucumberjs-json, mochawesome, timeline, html-nice, slack, teamcity, delta,
testrail, light, jsonhtml
```

#### قائمة أطر العمل المدعومة

```
mocha, jasmine, cucumber
```

#### قائمة الإضافات والمُشغّلات المدعومة

```
plugin: wait-for, harness, testing-library
runner: local, browser
```

### `wdio repl`

يبدأ الأمر `repl` جلسة WebDriver ويفتح موجّهًا تفاعليًا تُشغّل فيه أوامر WebdriverIO. استخدمه لتجربة المحددات والأوامر دون كتابة ملف مواصفات. راجع [واجهة REPL](/docs/repl) لمزيد من المعلومات.

بدء متصفح Chrome محلي:

```sh
npx wdio repl chrome
```

التشغيل على سحابة Sauce Labs:

```sh
npx wdio repl chrome --user $SAUCE_USERNAME --key $SAUCE_ACCESS_KEY
```

استخدام قدرة من ملف الإعدادات الخاص بك، حسب الفهرس أو حسب اسمها في وضع التحكم المتعدد (multi-remote):

```sh
npx wdio repl ./wdio.conf.ts 0 -p 9515
```

الارتباط بجلسة [`wdio session`](/docs/session) قيد التشغيل بدلًا من بدء متصفح جديد:

```sh
npx wdio repl --session default
```

يقبل `repl` خيارات الاتصال الخاصة بـ[أمر run](#wdio-run) (`--hostname` و`--port` و`--path` و`--user` و`--key` و`--logLevel` و...) بالإضافة إلى خيارات الأجهزة المحمولة التالية. استخدم الصيغتين الطويلتين `--user` و`--udid`: إذ إن `-u` هو الاسم المختصر لكليهما.

```
-v, --platformVersion  Version of OS for mobile devices                 [string]
-d, --deviceName       Device name for mobile devices                   [string]
    --udid             UDID of real mobile devices                      [string]
-s, --session          Attach to a running `wdio session` instead of starting a
                       browser                                          [string]
```

### `wdio session`

يتحكم الأمر `session` في متصفح أو تطبيق جوال أو تطبيق سطح مكتب من سطر الأوامر، بأمر واحد في كل استدعاء. وهو مصمم لوكلاء البرمجة: إذ يفتحون جلسة، ويلتقطون لقطات، وينقرون ويكتبون، ثم يصدّرون ما قاموا به على هيئة اختبار. راجع [wdio session](/docs/session) للاطلاع على سير العمل، و[أوامر wdio session](/docs/session-commands) للاطلاع على جميع الإجراءات.

```sh
npx wdio session --help
```

## الخطوات التالية

- [ملف الإعدادات](/docs/configurationfile): جميع خيارات `wdio.conf.ts`
- [البدء](/docs/gettingstarted): إعداد مشروع باستخدام المعالج
- [واجهة REPL](/docs/repl): تصحيح الأوامر بشكل تفاعلي
- [wdio session](/docs/session): التحكم في متصفح من سطر الأوامر أو من خلال وكيل