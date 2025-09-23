---
id: testrunner
title: تست‌ران‌نر
---

WebdriverIO با تست‌ران‌نر اختصاصی خود همراه است تا به شما کمک کند تا آزمایش را به سرعت شروع کنید. این ابزار قصد دارد تمام کارها را برای شما انجام دهد، به شما اجازه می‌دهد با سرویس‌های شخص ثالث یکپارچه شوید و به شما کمک می‌کند آزمون‌های خود را به طور موثر اجرا کنید.

تست‌ران‌نر WebdriverIO به صورت جداگانه در بسته NPM با نام `@wdio/cli` بسته‌بندی شده است.

آن را به این صورت نصب کنید:

```sh npm2yarn
npm install @wdio/cli
```

برای مشاهده راهنمای رابط خط فرمان، دستور زیر را در ترمینال خود وارد کنید:

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

عالیه! حالا باید یک فایل پیکربندی تعریف کنید که تمام اطلاعات مربوط به آزمون‌ها، قابلیت‌ها و تنظیمات شما در آن تنظیم شده است. به بخش [فایل پیکربندی](/docs/configuration) بروید تا ببینید آن فایل چگونه باید باشد.

با ابزار کمکی پیکربندی `wdio`، ایجاد فایل پیکربندی بسیار آسان است. فقط اجرا کنید:

```sh
$ npx wdio config
```

... و این کار ابزار کمکی را راه‌اندازی می‌کند.

از شما سوالاتی می‌پرسد و در کمتر از یک دقیقه یک فایل پیکربندی برای شما تولید می‌کند.

![ابزار پیکربندی WDIO](/img/config-utility.gif)

پس از تنظیم فایل پیکربندی، می‌توانید با اجرای دستور زیر آزمایش‌های خود را شروع کنید:

```sh
npx wdio run wdio.conf.js
```

همچنین می‌توانید بدون دستور `run` اجرای آزمون خود را شروع کنید:

```sh
npx wdio wdio.conf.js
```

همین است! اکنون می‌توانید از طریق متغیر جهانی `browser` به نمونه سلنیوم دسترسی پیدا کنید.

## دستورات

### `wdio config`

دستور `config` ابزار کمکی پیکربندی WebdriverIO را اجرا می‌کند. این ابزار کمکی چند سوال در مورد پروژه WebdriverIO شما می‌پرسد و بر اساس پاسخ‌های شما یک فایل `wdio.conf.js` ایجاد می‌کند.

مثال:

```sh
wdio config
```

گزینه‌ها:

```
--help            منوی راهنمای WebdriverIO را چاپ می‌کند                              [boolean]
--npm             آیا بسته‌ها با استفاده از NPM به جای yarn نصب شوند                  [boolean]
```

### `wdio run`

> این دستور پیش‌فرض برای اجرای پیکربندی شما است.

دستور `run` فایل پیکربندی WebdriverIO شما را راه‌اندازی کرده و آزمون‌های شما را اجرا می‌کند.

مثال:

```sh
wdio run ./wdio.conf.js --watch
```

گزینه‌ها:

```
--help                منوی راهنمای WebdriverIO را چاپ می‌کند                [boolean]
--version             نسخه WebdriverIO را چاپ می‌کند                       [boolean]
--hostname, -h        آدرس میزبان درایور اتوماسیون                          [string]
--port, -p            پورت درایور اتوماسیون                                [number]
--user, -u            نام کاربری در صورت استفاده از سرویس ابری به عنوان پشتیبانی اتوماسیون
                                                                          [string]
--key, -k             کلید دسترسی مربوط به کاربر                           [string]
--watch               نظارت بر تغییرات مشخصات                             [boolean]
--logLevel, -l        سطح گزارش‌دهی
                            [choices: "trace", "debug", "info", "warn", "error", "silent"]
--bail                متوقف کردن تست‌ران‌نر پس از شکست تعداد مشخصی از آزمون‌ها  [number]
--baseUrl             کوتاه کردن فراخوانی‌های دستور url با تنظیم یک url پایه  [string]
--waitforTimeout, -w  زمان انتظار برای تمام دستورات waitForXXX               [number]
--framework, -f       فریم‌ورکی را تعریف می‌کند (Mocha، Jasmine یا Cucumber) برای
                        اجرای مشخصات                                         [string]
--reporters, -r       گزارش‌دهنده‌ها برای چاپ نتایج روی stdout                  [array]
--suite               ویژگی مشخصات را لغو می‌کند و مجموعه تعریف شده را اجرا می‌کند  [array]
--spec                اجرای یک فایل مشخصات خاص یا الگوهای وحشی - جایگزین مشخصات از stdin  [array]
--exclude             حذف فایل(های) مشخصات از یک اجرا - جایگزین مشخصات از stdin   [array]
--repeat              تکرار مشخصات و/یا مجموعه‌های خاص به تعداد N بار         [number]
--mochaOpts           گزینه‌های Mocha
--jasmineOpts         گزینه‌های Jasmine
--cucumberOpts        گزینه‌های Cucumber
--tsConfigPath        مسیر سفارشی برای `tsconfig.json` یا استفاده از [تنظیمات tsConfigPath](/docs/configurationfile) در پیکربندی wdio
```

> نکته: کامپایل خودکار را می‌توان به راحتی با متغیرهای محیطی `tsx` کنترل کرد. همچنین به [مستندات TypeScript](/docs/typescript) مراجعه کنید.

### `wdio install`
دستور `install` به شما اجازه می‌دهد گزارش‌دهنده‌ها و سرویس‌ها را از طریق CLI به پروژه‌های WebdriverIO خود اضافه کنید.

مثال:

```sh
wdio install service sauce # @wdio/sauce-service را نصب می‌کند
wdio install reporter dot # @wdio/dot-reporter را نصب می‌کند
wdio install framework mocha # @wdio/mocha-framework را نصب می‌کند
```

اگر می‌خواهید بسته‌ها را با استفاده از `yarn` نصب کنید، می‌توانید پرچم `--yarn` را به دستور اضافه کنید:

```sh
wdio install service sauce --yarn
```

همچنین می‌توانید یک مسیر پیکربندی سفارشی را منتقل کنید اگر فایل پیکربندی WDIO شما در همان پوشه‌ای که روی آن کار می‌کنید، نیست:

```sh
wdio install service sauce --config="./path/to/wdio.conf.js"
```

#### لیست سرویس‌های پشتیبانی شده

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

#### لیست گزارش‌دهنده‌های پشتیبانی شده

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

#### لیست فریم‌ورک‌های پشتیبانی شده

```
mocha
jasmine
cucumber
```

### `wdio repl`

دستور repl اجازه می‌دهد یک رابط خط فرمان تعاملی برای اجرای دستورات WebdriverIO راه‌اندازی کنید. می‌توان از آن برای اهداف آزمایشی یا فقط برای راه‌اندازی سریع یک جلسه WebdriverIO استفاده کرد.

اجرای آزمون‌ها در کروم محلی:

```sh
wdio repl chrome
```

یا اجرای آزمون‌ها روی Sauce Labs:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

شما می‌توانید همان آرگومان‌هایی را که در [دستور run](#wdio-run) می‌توانید استفاده کنید، اعمال کنید.