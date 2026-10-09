---
id: repl
title: رابط REPL
description: "از REPL در WebdriverIO برای امتحان کردن دستورات و دیباگ تعاملی تست‌ها از طریق خط فرمان یا از درون یک تست در حال اجرا استفاده کنید."
---

با نسخه `v4.5.0`، WebdriverIO یک رابط [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) معرفی کرد که نه تنها به شما در یادگیری API فریم‌ورک کمک می‌کند، بلکه امکان دیباگ و بررسی تست‌هایتان را نیز فراهم می‌کند. این رابط به روش‌های مختلفی قابل استفاده است.

اول، می‌توانید با نصب `npm install -g @wdio/cli` از آن به عنوان دستور CLI استفاده کنید و یک نشست WebDriver را از خط فرمان ایجاد کنید، برای مثال:

```sh
wdio repl chrome
```

این دستور یک مرورگر Chrome باز می‌کند که می‌توانید آن را با رابط REPL کنترل کنید. برای شروع نشست، مطمئن شوید که یک درایور مرورگر روی پورت `4444` در حال اجرا است. اگر حساب [Sauce Labs](https://saucelabs.com) (یا ارائه‌دهنده ابری دیگری) دارید، می‌توانید مرورگر را مستقیماً از خط فرمان خود در فضای ابری اجرا کنید:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

اگر درایور روی پورت دیگری در حال اجرا است، مثلاً 9515، می‌توان آن را با آرگومان خط فرمان --port یا نام مستعار -p ارسال کرد

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

REPL همچنین می‌تواند با استفاده از capabilities موجود در فایل پیکربندی WebdriverIO اجرا شود. Wdio از شیء capabilities، یا لیست یا شیء capability از نوع multi-remote پشتیبانی می‌کند.

اگر فایل پیکربندی از شیء capabilities استفاده می‌کند، کافی است مسیر فایل پیکربندی را ارسال کنید، در غیر این صورت اگر capability از نوع multi-remote است، با استفاده از آرگومان موقعیتی مشخص کنید که کدام capability از لیست یا multi-remote استفاده شود. توجه: برای لیست، اندیس را از صفر در نظر می‌گیریم.

### مثال

WebdriverIO با آرایه capability:

```ts title="wdio.conf.ts example"
export const config = {
    // ...
    capabilities:[{
        browserName: 'chrome', // options: `chrome`, `edge`, `firefox`, `safari`, `chromium`
        browserVersion: '27.0', // browser version
        platformName: 'Windows 10' // OS platform
    }]
}
```

```sh
wdio repl "./path/to/wdio.config.js" 0 -p 9515
```

WebdriverIO با شیء capability از نوع [multi-remote](https://webdriver.io/docs/multiremote/):

```ts title="wdio.conf.ts example"
export const config = {
    // ...
    capabilities: {
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }
}
```

```sh
wdio repl "./path/to/wdio.config.js" "myChromeBrowser" -p 9515
```

یا اگر می‌خواهید تست‌های موبایل محلی را با استفاده از Appium اجرا کنید:

<Tabs
  defaultValue="android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'}
  ]
}>
<TabItem value="android">

```sh
wdio repl android
```

</TabItem>
<TabItem value="ios">

```sh
wdio repl ios
```

</TabItem>
</Tabs>

این دستور یک نشست Chrome/Safari روی دستگاه/امولاتور/شبیه‌ساز متصل باز می‌کند. برای شروع نشست، مطمئن شوید که Appium روی پورت `4444` در حال اجرا است.

```sh
wdio repl './path/to/your_app.apk'
```

این دستور یک نشست اپلیکیشن روی دستگاه/امولاتور/شبیه‌ساز متصل باز می‌کند. برای شروع نشست، مطمئن شوید که Appium روی پورت `4444` در حال اجرا است.

capabilities برای دستگاه iOS را می‌توان با آرگومان‌های زیر ارسال کرد:

* `-v`      - `platformVersion`: نسخه پلتفرم Android/iOS
* `-d`      - `deviceName`: نام دستگاه موبایل
* `-u`      - `udid`: شناسه udid برای دستگاه‌های واقعی

نحوه استفاده:

<Tabs
  defaultValue="long"
  values={[
    {label: 'Long Parameter Names', value: 'long'},
    {label: 'Short Parameter Names', value: 'short'}
  ]
}>
<TabItem value="long">

```sh
wdio repl ios --platformVersion 11.3 --deviceName 'iPhone 7' --udid 123432abc
```

</TabItem>
<TabItem value="short">

```sh
wdio repl ios -v 11.3 -d 'iPhone 7' -u 123432abc
```

</TabItem>
</Tabs>

می‌توانید هر گزینه‌ای را (به `wdio repl --help` مراجعه کنید) که برای نشست REPL شما در دسترس است، اعمال کنید.

### اتصال به یک `wdio session`

دستور `wdio repl --session <name>` (نام مستعار `-s`) مرورگری را راه‌اندازی نمی‌کند. این دستور REPL را به نشستی متصل می‌کند که [`wdio session`](/docs/session) قبلاً باز کرده است، و جدا شدن از آن، نشست را در حال اجرا باقی می‌گذارد. متوقف کردن موقت اجرای تست در [دیباگ یک تست با یک نشست](/docs/session/debug) توضیح داده شده است:

```sh
npx wdio session open chrome https://webdriver.io
npx wdio repl --session default
```

در REPL، هر خط به صورت `wdio session exec` اجرا می‌شود. دستور `.exit` پیام `Detached from "default" (still running)` را چاپ می‌کند.

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

روش دیگر استفاده از REPL، درون تست‌هایتان از طریق دستور [`debug`](/docs/api/browser/debug) است. این دستور هنگام فراخوانی، مرورگر را متوقف می‌کند و به شما امکان می‌دهد وارد اپلیکیشن شوید (مثلاً به ابزارهای توسعه‌دهنده) یا مرورگر را از خط فرمان کنترل کنید. این قابلیت زمانی مفید است که برخی دستورات یک عمل خاص را آن‌طور که انتظار می‌رود اجرا نمی‌کنند. با REPL، می‌توانید دستورات را امتحان کنید تا ببینید کدام‌یک با بیشترین اطمینان کار می‌کنند.