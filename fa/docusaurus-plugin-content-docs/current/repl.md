---
id: repl
title: رابط REPL
---

با `v4.5.0`، WebdriverIO یک رابط [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) را معرفی کرد که به شما کمک می‌کند نه تنها API فریم‌ورک را یاد بگیرید، بلکه تست‌های خود را اشکال‌زدایی و بررسی کنید. می‌توان از آن به روش‌های مختلفی استفاده کرد.

ابتدا می‌توانید از آن به عنوان دستور CLI با نصب `npm install -g @wdio/cli` استفاده کنید و یک جلسه WebDriver را از خط فرمان اجرا کنید، مثلاً:

```sh
wdio repl chrome
```

این یک مرورگر Chrome را باز می‌کند که می‌توانید با رابط REPL آن را کنترل کنید. مطمئن شوید که یک درایور مرورگر روی پورت `4444` در حال اجراست تا بتوانید جلسه را آغاز کنید. اگر یک حساب [Sauce Labs](https://saucelabs.com) (یا سایر فروشندگان ابری) دارید، همچنین می‌توانید مستقیماً مرورگر را از خط فرمان خود در ابر اجرا کنید:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

اگر درایور روی پورت متفاوتی مثل: 9515 در حال اجراست، می‌توان آن را با آرگومان خط فرمان --port یا مخفف -p ارسال کرد

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

Repl همچنین می‌تواند با استفاده از قابلیت‌های فایل پیکربندی webdriverIO اجرا شود. Wdio از شی قابلیت‌ها پشتیبانی می‌کند؛ یا لیست قابلیت multiremote یا شی.

اگر فایل پیکربندی از شی قابلیت‌ها استفاده می‌کند، فقط مسیر فایل پیکربندی را ارسال کنید، در غیر این صورت اگر یک قابلیت multiremote است، مشخص کنید کدام قابلیت از لیست یا multiremote را با استفاده از آرگومان موقعیتی استفاده کنید. توجه: برای لیست، ما از ایندکس صفر-محور استفاده می‌کنیم.

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

WebdriverIO با شی قابلیت [multiremote](https://webdriver.io/docs/multiremote/):

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

این یک جلسه Chrome/Safari را روی دستگاه/شبیه‌ساز متصل باز می‌کند. مطمئن شوید Appium روی پورت `4444` در حال اجراست تا بتوانید جلسه را آغاز کنید.

```sh
wdio repl './path/to/your_app.apk'
```

این یک جلسه برنامه را روی دستگاه/شبیه‌ساز متصل باز می‌کند. مطمئن شوید Appium روی پورت `4444` در حال اجراست تا بتوانید جلسه را آغاز کنید.

قابلیت‌ها برای دستگاه iOS می‌تواند با آرگومان‌ها ارسال شود:

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

شما می‌توانید هر گزینه‌ای (به `wdio repl --help` مراجعه کنید) که برای جلسه REPL شما در دسترس است را اعمال کنید.

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

روش دیگر استفاده از REPL در داخل تست‌های شما از طریق دستور [`debug`](/docs/api/browser/debug) است. این باعث توقف مرورگر هنگام فراخوانی می‌شود و به شما امکان می‌دهد به برنامه (مثلاً ابزارهای توسعه) وارد شوید یا مرورگر را از خط فرمان کنترل کنید. این وقتی مفید است که برخی دستورات یک عمل خاص را به صورت مورد انتظار فعال نمی‌کنند. با REPL، می‌توانید دستورات را امتحان کنید تا ببینید کدام یک بیشترین قابلیت اطمینان را دارند.