---
id: repl
title: رابط REPL
---

با نسخه `v4.5.0`، WebdriverIO یک رابط [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) را معرفی کرد که نه تنها به یادگیری API فریم‌ورک کمک می‌کند، بلکه برای اشکال‌زدایی و بررسی تست‌های شما نیز مفید است. این قابلیت به روش‌های مختلفی قابل استفاده است.

ابتدا می‌توانید آن را به عنوان دستور CLI با نصب `npm install -g @wdio/cli` استفاده کنید و یک جلسه WebDriver را از خط فرمان ایجاد کنید، مثلاً:

```sh
wdio repl chrome
```

این دستور یک مرورگر Chrome را باز می‌کند که می‌توانید با رابط REPL آن را کنترل کنید. مطمئن شوید که یک درایور مرورگر در پورت `4444` در حال اجراست تا بتوانید جلسه را آغاز کنید. اگر یک حساب کاربری [Sauce Labs](https://saucelabs.com) (یا سایر ارائه‌دهندگان ابری) دارید، می‌توانید مستقیماً مرورگر را از خط فرمان خود در فضای ابری اجرا کنید:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

اگر درایور روی پورت متفاوتی مانند 9515 در حال اجراست، می‌توان آن را با آرگومان خط فرمان --port یا به اختصار -p مشخص کرد

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

REPL همچنین می‌تواند با استفاده از قابلیت‌های تعریف شده در فایل پیکربندی webdriverIO اجرا شود. Wdio از اشیاء قابلیت پشتیبانی می‌کند؛ یا لیست قابلیت‌های چندگانه یا شیء multiremote.

اگر فایل پیکربندی از شیء قابلیت استفاده می‌کند، فقط مسیر فایل پیکربندی را ارسال کنید، در غیر این صورت اگر یک قابلیت multiremote است، مشخص کنید که کدام قابلیت از لیست یا multiremote با استفاده از آرگومان موقعیتی استفاده شود. توجه: برای لیست، ما شاخص صفر مبنا را در نظر می‌گیریم.

### مثال

WebdriverIO با آرایه قابلیت:

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

WebdriverIO با شیء قابلیت [multiremote](https://webdriver.io/docs/multiremote/):

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

یا اگر می‌خواهید تست‌های موبایلی محلی را با استفاده از Appium اجرا کنید:

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

این دستور یک جلسه Chrome/Safari را روی دستگاه/شبیه‌ساز متصل باز می‌کند. مطمئن شوید که Appium روی پورت `4444` در حال اجراست تا بتوانید جلسه را آغاز کنید.

```sh
wdio repl './path/to/your_app.apk'
```

این دستور یک جلسه اپلیکیشن را روی دستگاه/شبیه‌ساز متصل باز می‌کند. مطمئن شوید که Appium روی پورت `4444` در حال اجراست تا بتوانید جلسه را آغاز کنید.

قابلیت‌های مربوط به دستگاه iOS می‌توانند با آرگومان‌های زیر ارسال شوند:

* `-v`      - `platformVersion`: نسخه پلتفرم Android/iOS
* `-d`      - `deviceName`: نام دستگاه موبایل
* `-u`      - `udid`: udid برای دستگاه‌های واقعی

استفاده:

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

می‌توانید هر گزینه‌ای (به `wdio repl --help` مراجعه کنید) که برای جلسه REPL شما در دسترس است را اعمال کنید.

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

روش دیگر استفاده از REPL، استفاده داخل تست‌های خود از طریق دستور [`debug`](/docs/api/browser/debug) است. این دستور مرورگر را هنگام فراخوانی متوقف می‌کند و به شما امکان می‌دهد به برنامه (مثلاً به ابزارهای توسعه) وارد شوید یا مرورگر را از خط فرمان کنترل کنید. این برای زمانی مفید است که برخی دستورات یک عمل خاص را آنطور که انتظار دارید اجرا نمی‌کنند. با REPL، می‌توانید دستورات را امتحان کنید تا ببینید کدام‌یک قابل اعتمادتر هستند.