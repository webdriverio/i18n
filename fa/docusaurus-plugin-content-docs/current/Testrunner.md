---
id: testrunner
title: آزمون‌ساز
---

WebdriverIO با آزمون‌ساز خود ارائه می‌شود تا به شما کمک کند تا در سریع‌ترین زمان ممکن شروع به تست کردن کنید. این ابزار طراحی شده تا تمام کارها را برای شما انجام دهد، امکان ادغام با سرویس‌های شخص ثالث را فراهم می‌کند و به شما کمک می‌کند تا تست‌های خود را به صورت کارآمد اجرا کنید.

آزمون‌ساز WebdriverIO به صورت جداگانه در بسته NPM با نام `@wdio/cli` ارائه شده است.

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

عالی! حالا شما نیاز به تعریف یک فایل پیکربندی دارید که در آن همه اطلاعات مربوط به تست‌ها، قابلیت‌ها و تنظیمات شما مشخص شده است. به بخش [فایل پیکربندی](/docs/configuration) بروید تا ببینید این فایل باید چگونه باشد.

با کمک ابزار پیکربندی `wdio`، ایجاد فایل پیکربندی بسیار آسان است. کافیست دستور زیر را اجرا کنید:

```sh
$ npx wdio config
```

...و این ابزار کمکی را اجرا می‌کند.

از شما سوالاتی می‌پرسد و در کمتر از یک دقیقه یک فایل پیکربندی برای شما ایجاد می‌کند.

![ابزار پیکربندی WDIO](/img/config-utility.gif)

پس از تنظیم فایل پیکربندی خود، می‌توانید تست‌های خود را با اجرای دستور زیر شروع کنید:

```sh
npx wdio run wdio.conf.js
```

همچنین می‌توانید اجرای تست خود را بدون دستور `run` آغاز کنید:

```sh
npx wdio wdio.conf.js
```

همین! اکنون، می‌توانید از طریق متغیر جهانی `browser` به نمونه سلنیوم دسترسی پیدا کنید.

## دستورات

### `wdio config`

دستور `config` ابزار کمکی پیکربندی WebdriverIO را اجرا می‌کند. این ابزار چند سوال در مورد پروژه WebdriverIO شما می‌پرسد و بر اساس پاسخ‌های شما یک فایل `wdio.conf.js` ایجاد می‌کند.

مثال:

```sh
wdio config
```

گزینه‌ها:

```
--help            منوی راهنمای WebdriverIO را چاپ می‌کند                                [boolean]
--npm             بسته‌ها را با استفاده از NPM به جای yarn نصب می‌کند    [boolean]
```

### `wdio run`

> این دستور پیش‌فرض برای اجرای پیکربندی شماست.

دستور `run` فایل پیکربندی WebdriverIO شما را مقداردهی اولیه می‌کند و تست‌های شما را اجرا می‌کند.

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
--user, -u            نام کاربری درصورت استفاده از سرویس ابری به عنوان پشتیبان اتوماسیون
                                                                        [string]
--key, -k             کلید دسترسی مربوط به کاربر            [string]
--watch               تغییرات در مشخصات را تحت نظر بگیرد                        [boolean]
--logLevel, -l        سطح دقت گزارش‌دهی
                            [choices: "trace", "debug", "info", "warn", "error", "silent"]
--bail                بعد از تعداد مشخصی شکست، اجرای تست‌ها متوقف شود                                          [number]
--baseUrl             فراخوانی دستورات URL را با تنظیم یک URL پایه کوتاه کنید [string]
--waitforTimeout, -w  زمان انتظار برای تمام دستورات waitForXXX             [number]
--framework, -f       چارچوب (Mocha، Jasmine یا Cucumber) را برای اجرای مشخصات تعیین می‌کند                                   [string]
--reporters, -r       گزارشگرهایی که نتایج را در خروجی استاندارد چاپ می‌کنند      [array]
--suite               ویژگی specs را رونویسی کرده و مجموعه تعریف شده را اجرا می‌کند                                            [array]
--spec                اجرای یک فایل مشخصات خاص یا الگوهای وحشی - specs ارسال شده از stdin را رونویسی می‌کند                                       [array]
--exclude             فایل(های) مشخصات را از اجرا حذف می‌کند - specs ارسال شده از stdin را رونویسی می‌کند                                       [array]
--repeat              مشخصات و/یا مجموعه‌های خاص را N بار تکرار می‌کند        [number]
--mochaOpts           گزینه‌های Mocha
--jasmineOpts         گزینه‌های Jasmine
--cucumberOpts        گزینه‌های Cucumber
```

> توجه: کامپایل خودکار را می‌توان به راحتی با متغیرهای محیطی `tsx` کنترل کرد. همچنین به [مستندات TypeScript](/docs/typescript) مراجعه کنید.

### `wdio install`
دستور `install` به شما امکان می‌دهد تا گزارشگرها و سرویس‌ها را از طریق CLI به پروژه‌های WebdriverIO خود اضافه کنید.

مثال:

```sh
wdio install service sauce # @wdio/sauce-service را نصب می‌کند
wdio install reporter dot # @wdio/dot-reporter را نصب می‌کند
wdio install framework mocha # @wdio/mocha-framework را نصب می‌کند
```

اگر می‌خواهید بسته‌ها را با استفاده از `yarn` نصب کنید، می‌توانید پرچم `--yarn` را به دستور ارسال کنید:

```sh
wdio install service sauce --yarn
```

همچنین می‌توانید یک مسیر پیکربندی سفارشی را ارسال کنید اگر فایل پیکربندی WDIO شما در همان پوشه‌ای که روی آن کار می‌کنید، نباشد:

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

دستور repl امکان راه‌اندازی یک رابط خط فرمان تعاملی برای اجرای دستورات WebdriverIO را فراهم می‌کند. این می‌تواند برای اهداف تست یا صرفاً برای راه‌اندازی سریع یک جلسه WebdriverIO استفاده شود.

اجرای تست‌ها در کروم محلی:

```sh
wdio repl chrome
```

یا اجرای تست‌ها روی Sauce Labs:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

می‌توانید همان آرگومان‌هایی را که در [دستور run](#wdio-run) می‌توانید استفاده کنید، به کار ببرید.