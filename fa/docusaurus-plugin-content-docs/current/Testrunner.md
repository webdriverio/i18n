---
id: testrunner
title: اجراکننده تست
---

WebdriverIO با اجراکننده تست خود همراه است تا به شما کمک کند به سرعت تست‌ها را شروع کنید. این ابزار طراحی شده تا تمام کارها را برای شما انجام دهد، امکان ادغام با سرویس‌های شخص ثالث را فراهم کند و به شما کمک کند تست‌های خود را به صورت کارآمد اجرا کنید.

اجراکننده تست WebdriverIO به صورت جداگانه در بسته NPM با نام `@wdio/cli` ارائه شده است.

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

عالی! حالا شما نیاز دارید یک فایل پیکربندی تعریف کنید که تمام اطلاعات مربوط به تست‌ها، قابلیت‌ها و تنظیمات شما در آن قرار داده شود. به بخش [فایل پیکربندی](/docs/configuration) مراجعه کنید تا ببینید این فایل چگونه باید باشد.

با کمک ابزار پیکربندی `wdio`، ایجاد فایل پیکربندی بسیار آسان است. فقط اجرا کنید:

```sh
$ npx wdio config
```

...و ابزار کمکی راه‌اندازی می‌شود.

از شما سوالاتی پرسیده و یک فایل پیکربندی در کمتر از یک دقیقه برای شما تولید می‌کند.

![ابزار پیکربندی WDIO](/img/config-utility.gif)

وقتی فایل پیکربندی خود را تنظیم کردید، می‌توانید تست‌های خود را با اجرای دستور زیر شروع کنید:

```sh
npx wdio run wdio.conf.js
```

همچنین می‌توانید بدون دستور `run` نیز تست خود را راه‌اندازی کنید:

```sh
npx wdio wdio.conf.js
```

همین! حالا می‌توانید از طریق متغیر جهانی `browser` به نمونه selenium دسترسی داشته باشید.

## دستورات

### `wdio config`

دستور `config` ابزار کمکی پیکربندی WebdriverIO را اجرا می‌کند. این ابزار کمکی چند سوال در مورد پروژه WebdriverIO شما می‌پرسد و بر اساس پاسخ‌های شما یک فایل `wdio.conf.js` ایجاد می‌کند.

مثال:

```sh
wdio config
```

گزینه‌ها:

```
--help            منوی راهنمای WebdriverIO را چاپ می‌کند                                [boolean]
--npm             آیا بسته‌ها با استفاده از NPM به جای yarn نصب شوند                    [boolean]
```

### `wdio run`

> این دستور پیش‌فرض برای اجرای پیکربندی شما است.

دستور `run` فایل پیکربندی WebdriverIO شما را راه‌اندازی کرده و تست‌های شما را اجرا می‌کند.

مثال:

```sh
wdio run ./wdio.conf.js --watch
```

گزینه‌ها:

```
--help                منوی راهنمای WebdriverIO را چاپ می‌کند                   [boolean]
--version             نسخه WebdriverIO را چاپ می‌کند                     [boolean]
--hostname, -h        آدرس میزبان درایور اتوماسیون                  [string]
--port, -p            پورت درایور اتوماسیون                          [number]
--user, -u            نام کاربری در صورت استفاده از یک سرویس ابری به عنوان پشتیبان اتوماسیون
                                                                        [string]
--key, -k             کلید دسترسی مربوط به کاربر            [string]
--watch               نظارت بر تغییرات در فایل‌های تست                        [boolean]
--logLevel, -l        سطح جزئیات گزارش‌ها
                            [choices: "trace", "debug", "info", "warn", "error", "silent"]
--bail                توقف اجراکننده تست پس از شکست تعداد مشخصی از تست‌ها          [number]
--baseUrl             کوتاه کردن فراخوانی‌های دستور url با تنظیم یک url پایه [string]
--waitforTimeout, -w  مهلت برای تمام دستورات waitForXXX             [number]
--framework, -f       چارچوب (Mocha، Jasmine یا Cucumber) را برای اجرای تست‌ها تعیین می‌کند 
                                                                            [string]
--reporters, -r       گزارشگرهایی که نتایج را در خروجی استاندارد چاپ می‌کنند      [array]
--suite               ویژگی specs را بازنویسی می‌کند و مجموعه تعریف شده را اجرا می‌کند
                                                                            [array]
--spec                اجرای یک فایل تست خاص یا الگوهای وحشی - specs ارسال شده از stdin را
                        بازنویسی می‌کند                                       [array]
--exclude             فایل(های) تست را از اجرا مستثنی می‌کند - specs ارسال شده از stdin را 
                        بازنویسی می‌کند                                       [array]
--repeat              تکرار تست‌ها و/یا مجموعه‌های خاص به تعداد N بار        [number]
--mochaOpts           گزینه‌های Mocha
--jasmineOpts         گزینه‌های Jasmine
--cucumberOpts        گزینه‌های Cucumber
```

> نکته: کامپایل خودکار را می‌توان به راحتی با متغیرهای محیطی `tsx` کنترل کرد. همچنین به [مستندات TypeScript](/docs/typescript) مراجعه کنید.

### `wdio install`
دستور `install` به شما امکان می‌دهد گزارشگرها و سرویس‌ها را از طریق CLI به پروژه‌های WebdriverIO خود اضافه کنید.

مثال:

```sh
wdio install service sauce # نصب @wdio/sauce-service
wdio install reporter dot # نصب @wdio/dot-reporter
wdio install framework mocha # نصب @wdio/mocha-framework
```

اگر می‌خواهید بسته‌ها را با استفاده از `yarn` نصب کنید، می‌توانید پرچم `--yarn` را به دستور اضافه کنید:

```sh
wdio install service sauce --yarn
```

همچنین می‌توانید یک مسیر پیکربندی سفارشی را مشخص کنید اگر فایل پیکربندی WDIO شما در پوشه‌ای که در آن کار می‌کنید نیست:

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

#### لیست گزارشگرهای پشتیبانی شده

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

#### لیست چارچوب‌های پشتیبانی شده

```
mocha
jasmine
cucumber
```

### `wdio repl`

دستور repl امکان راه‌اندازی یک رابط خط فرمان تعاملی برای اجرای دستورات WebdriverIO را فراهم می‌کند. می‌توان از آن برای اهداف تست یا صرفاً برای راه‌اندازی سریع یک جلسه WebdriverIO استفاده کرد.

اجرای تست‌ها در کروم محلی:

```sh
wdio repl chrome
```

یا اجرای تست‌ها در Sauce Labs:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

می‌توانید همان آرگومان‌هایی را که در [دستور run](#wdio-run) استفاده می‌کنید، اعمال کنید.