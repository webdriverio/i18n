---
id: testrunner
title: اجراکننده تست
description: "اجراکننده تست WDIO را از @wdio/cli نصب کنید و از دستورات config، run، install، repl و session آن برای راه‌اندازی و اجرای مجموعه‌های تست استفاده کنید."
---

اجراکننده تست WebdriverIO مجموعه تست شما را بر اساس یک فایل پیکربندی اجرا می‌کند. این ابزار برای هر capability یک worker راه‌اندازی می‌کند، فریم‌ورک، سرویس‌ها و گزارش‌دهنده‌های شما را به هم متصل می‌کند و specها را به صورت موازی اجرا می‌کند. از آن برای همه پروژه‌های تست استفاده کنید؛ [حالت مستقل](/docs/setuptypes) را تنها زمانی به کار ببرید که WebdriverIO را درون ابزارهای خودتان جاسازی می‌کنید.

اجراکننده تست در بسته `@wdio/cli` ارائه می‌شود:

```sh npm2yarn
npm install --save-dev @wdio/cli
```

اگر `@wdio/cli` هنوز نصب نشده باشد، `npx wdio` همان CLI را اجرا می‌کند. npm بسته بدون scope یعنی [`wdio`](https://www.npmjs.com/package/wdio) را نصب می‌کند و آن بسته `@wdio/cli` را اجرا می‌کند.

برای راه‌اندازی یک پروژه جدید، ویزارد پیکربندی را اجرا کنید. این ویزارد چند سؤال می‌پرسد، بسته‌ها را نصب می‌کند و یک فایل `wdio.conf.ts` می‌نویسد:

```sh
npx wdio config
```

سپس تست‌های خود را اجرا کنید:

```sh
npx wdio run wdio.conf.ts
```

`run` دستور پیش‌فرض است، بنابراین `npx wdio wdio.conf.ts` نیز همین کار را انجام می‌دهد. در specهای خود، session را از `@wdio/globals` وارد کنید:

```ts title="test/specs/example.e2e.ts"
import { browser, $, expect } from '@wdio/globals'

describe('webdriver.io', () => {
    it('has a title', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
    })
})
```

برای مشاهده همه گزینه‌های `wdio.conf.ts` به [فایل پیکربندی](/docs/configurationfile) مراجعه کنید.

## دستورات

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

هر دستور گزینه‌های خود را با `--help` نمایش می‌دهد، برای مثال `npx wdio run --help`.

### `wdio config`

دستور `config` ویزارد پیکربندی را اجرا می‌کند و بر اساس پاسخ‌های شما یک فایل `wdio.conf.ts` (یا `wdio.conf.js`) ایجاد می‌کند.

```sh
npx wdio config
```

برای استفاده از مقادیر پیش‌فرض (Mocha، Chrome و page objectها) بدون پرسش، `--yes` را ارسال کنید. هر سؤال ویزارد یک فلگ متناظر نیز دارد، بنابراین می‌توانید به برخی یا همه آن‌ها در خط فرمان پاسخ دهید:

```sh
npx wdio config --yes --framework cucumber --no-typescript --reporters spec,junit
```

گزینه‌ها:

```
-y, --yes      will fill in all config defaults without prompting
                                                      [boolean] [default: false]
-t, --npmTag   define NPM tag to use for WebdriverIO related packages
                                                    [string] [default: "latest"]
    --help     Show help, including a flag for every wizard question   [boolean]
```

ویزارد بسته‌ها را با مدیر بسته‌ای نصب می‌کند که آن را اجرا کرده است: `pnpm wdio config` از pnpm استفاده می‌کند، `yarn wdio config` از Yarn و `npx` از npm.

`npx wdio config --help` فلگ‌های ویزارد و مقادیری را که می‌پذیرند فهرست می‌کند. استفاده از فلگی برای سؤالی که ویزارد در تنظیمات شما نمی‌پرسد خطا محسوب می‌شود، و همین‌طور مقداری که ویزارد ارائه نمی‌دهد. برای مثال‌ها به [پاسخ به ویزارد با فلگ‌ها](/docs/gettingstarted#answer-the-wizard-with-flags) مراجعه کنید.

### `wdio run`

> این دستور پیش‌فرض برای اجرای پیکربندی شماست.

دستور `run` فایل پیکربندی شما را بارگذاری کرده و تست‌هایتان را اجرا می‌کند. گزینه‌های خط فرمان، گزینه‌های متناظر در فایل پیکربندی را بازنویسی می‌کنند.

```sh
npx wdio run wdio.conf.ts --spec test/specs/login.e2e.ts
```

گزینه‌ها:

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

مثال‌ها:

```sh
# اجرای یک suite
npx wdio run wdio.conf.ts --suite login

# اجرای اولین shard از چهار shard، برای مثال در یک ماتریس CI
npx wdio run wdio.conf.ts --shard 1/4

# اجرای همه مرورگرها در حالت headless، یا اجبار به حالت headed
npx wdio run wdio.conf.ts --headless
npx wdio run wdio.conf.ts --headless=false

# تنظیم گزینه‌های فریم‌ورک با نماد نقطه
npx wdio run wdio.conf.ts --mochaOpts.timeout 60000

# اجرای یک سناریوی Cucumber بر اساس شماره خط
npx wdio run wdio.conf.ts --spec ./features/login.feature:5

# استفاده از یک tsconfig.json سفارشی
npx wdio run wdio.conf.ts --tsConfigPath=./configs/bdd-tsconfig.json

# توقف تست‌های ناموفق و browser.debug() تا یک عامل کدنویسی بتواند آن‌ها را بررسی کند
npx wdio run wdio.conf.ts --debug=agent
```

`--tsConfigPath` تنظیم [`tsConfigPath`](/docs/configurationfile) در پیکربندی شما را بازنویسی می‌کند. برای اینکه ببینید WebdriverIO چگونه specهای شما را با `tsx` کامپایل می‌کند، به [TypeScript](/docs/typescript) مراجعه کنید.

### `wdio install`

دستور `install` یک گزارش‌دهنده، سرویس، فریم‌ورک، پلاگین یا runner را به یک پروژه موجود اضافه می‌کند. این دستور بسته را نصب می‌کند، آن را به `package.json` شما اضافه می‌کند و فایل پیکربندی‌تان را به‌روزرسانی می‌کند.

```sh
npx wdio install service sauce        # installs @wdio/sauce-service
npx wdio install reporter dot         # installs @wdio/dot-reporter
npx wdio install framework mocha      # installs @wdio/mocha-framework
```

بسته‌ها با مدیر بسته‌ای نصب می‌شوند که دستور را اجرا کرده است، بنابراین `pnpm wdio install reporter dot` با pnpm و `yarn wdio install reporter dot` با Yarn نصب می‌کند. `npx` و فراخوانی‌های مستقیم از npm استفاده می‌کنند.

اگر فایل پیکربندی شما `wdio.conf.(js|ts|cjs|mjs)` در پوشه فعلی نیست، مسیر آن را ارسال کنید:

```sh
npx wdio install service sauce --config="./path/to/wdio.conf.ts"
```

`npx wdio install --help` همه بسته‌های پشتیبانی‌شده را همراه با نام npm آن‌ها نمایش می‌دهد.

#### فهرست سرویس‌های پشتیبانی‌شده

```
visual, ai, vite, nuxt, firefox-profile, gmail, sauce, testingbot,
browserstack, lighthouse, vscode, electron, tauri, tauri-plugin, dioxus,
appium, camera, eslinter, lambdatest, tvlabs, zafira-listener, reportportal,
docker, ui5, wiremock, ng-apimock, slack, cucumber-viewport-logger, intercept,
novus-visual-regression, rerun, winappdriver, ywinappdriver, performancetotal,
cleanuptotal, aws-device-farm, ms-teams, tesults, azure-devops, google-chat,
qmate-service, robonut, qunit, roku, obsidian, null-driver
```

#### فهرست گزارش‌دهنده‌های پشتیبانی‌شده

```
spec, dot, junit, allure, sumologic, concise, json, reportportal, video,
cucumberjs-json, mochawesome, timeline, html-nice, slack, teamcity, delta,
testrail, light, jsonhtml
```

#### فهرست فریم‌ورک‌های پشتیبانی‌شده

```
mocha, jasmine, cucumber
```

#### فهرست پلاگین‌ها و runnerهای پشتیبانی‌شده

```
plugin: wait-for, harness, testing-library
runner: local, browser
```

### `wdio repl`

دستور `repl` یک session وب‌درایور را آغاز کرده و یک prompt تعاملی باز می‌کند که در آن دستورات WebdriverIO را اجرا می‌کنید. از آن برای امتحان کردن selectorها و دستورات بدون نوشتن spec استفاده کنید. برای اطلاعات بیشتر به [رابط REPL](/docs/repl) مراجعه کنید.

اجرای یک Chrome محلی:

```sh
npx wdio repl chrome
```

اجرا در فضای ابری Sauce Labs:

```sh
npx wdio repl chrome --user $SAUCE_USERNAME --key $SAUCE_ACCESS_KEY
```

استفاده از یک capability از فایل پیکربندی، بر اساس اندیس یا نام multi-remote آن:

```sh
npx wdio repl ./wdio.conf.ts 0 -p 9515
```

اتصال به یک [`wdio session`](/docs/session) در حال اجرا به جای راه‌اندازی یک مرورگر جدید:

```sh
npx wdio repl --session default
```

`repl` گزینه‌های اتصال [دستور run](#wdio-run) (`--hostname`، `--port`، `--path`، `--user`، `--key`، `--logLevel` و ...) و این گزینه‌های موبایل را می‌پذیرد. از شکل‌های بلند `--user` و `--udid` استفاده کنید: `-u` نام مستعار کوتاه هر دو است.

```
-v, --platformVersion  Version of OS for mobile devices                 [string]
-d, --deviceName       Device name for mobile devices                   [string]
    --udid             UDID of real mobile devices                      [string]
-s, --session          Attach to a running `wdio session` instead of starting a
                       browser                                          [string]
```

### `wdio session`

دستور `session` یک مرورگر، اپلیکیشن موبایل یا اپلیکیشن دسکتاپ را از طریق shell کنترل می‌کند، با یک دستور در هر فراخوانی. این دستور برای عامل‌های کدنویسی ساخته شده است: آن‌ها یک session باز می‌کنند، snapshot می‌گیرند، کلیک و تایپ می‌کنند و کارهایی را که انجام داده‌اند به صورت یک تست خروجی می‌گیرند. برای گردش کار به [wdio session](/docs/session) و برای همه اقدامات به [دستورات wdio session](/docs/session-commands) مراجعه کنید.

```sh
npx wdio session --help
```

## گام‌های بعدی

- [فایل پیکربندی](/docs/configurationfile): همه گزینه‌های `wdio.conf.ts`
- [شروع به کار](/docs/gettingstarted): راه‌اندازی یک پروژه با ویزارد
- [رابط REPL](/docs/repl): اشکال‌زدایی دستورات به صورت تعاملی
- [wdio session](/docs/session): کنترل یک مرورگر از طریق shell یا یک عامل