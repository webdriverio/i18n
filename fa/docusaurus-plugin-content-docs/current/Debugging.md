---
id: debugging
title: اشکال‌زدایی
description: "اشکال‌زدایی تست‌های WebdriverIO با browser.debug، نقاط توقف (breakpoint) در VS Code یا WebStorm، راهکارهایی برای تست‌های ناپایدار (flaky) و پروفایل‌گیری CPU و heap."
---

اشکال‌زدایی زمانی که چندین فرآیند ده‌ها تست را در چندین مرورگر اجرا می‌کنند، به‌طور قابل‌توجهی دشوارتر است.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

برای شروع، بسیار مفید است که موازی‌سازی را با تنظیم `maxInstances` روی `1` محدود کنید و فقط آن specها و مرورگرهایی را هدف قرار دهید که نیاز به اشکال‌زدایی دارند.

در `wdio.conf`:

```js
export const config = {
    // ...
    maxInstances: 1,
    specs: [
        '**/myspec.spec.js'
    ],
    capabilities: [{
        browserName: 'firefox'
    }],
    // ...
}
```

## دستور Debug

در بسیاری از موارد، می‌توانید از [`browser.debug()`](/docs/api/browser/debug) برای متوقف کردن تست و بررسی مرورگر استفاده کنید.

رابط خط فرمان شما نیز به حالت REPL تغییر می‌کند. این حالت به شما امکان می‌دهد با دستورات و عناصر صفحه کار و آزمایش کنید. در حالت REPL، می‌توانید به شیء `browser`&mdash;یا توابع `$` و `$$`&mdash;همان‌طور که در تست‌هایتان دسترسی دارید، دسترسی داشته باشید.

هنگام استفاده از `browser.debug()`، احتمالاً باید timeout اجراکننده تست را افزایش دهید تا اجراکننده تست به دلیل طولانی شدن زمان، تست را ناموفق اعلام نکند. برای مثال:

در `wdio.conf`:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

برای اطلاعات بیشتر درباره نحوه انجام این کار با استفاده از فریم‌ورک‌های دیگر، [timeouts](timeouts) را ببینید.

برای ادامه تست‌ها پس از اشکال‌زدایی، در shell از میان‌بر `^C` یا دستور `.exit` استفاده کنید.

### توقف برای یک عامل کدنویسی (`--debug=agent`)

`wdio run --debug=agent` مقدار timeout فریم‌ورک را به ۲۴ ساعت افزایش می‌دهد و هنگامی که یک spec دستور `await browser.debug()` را فراخوانی می‌کند یا یک تست ناموفق می‌شود، worker را متوقف می‌کند. اجرا خطی مانند این چاپ می‌کند:

```text
Paused in cart.e2e.ts › adds a blue t-shirt. Inspect with `wdio session -s debug-0-0 snapshot`, continue with `wdio session -s debug-0-0 resume`.
```

مرورگر متوقف‌شده را با [`wdio session`](/docs/session/debug) (`snapshot`، `exec`، …) بررسی کنید، سپس با `wdio session -s debug-0-0 resume` ادامه دهید. `wdio session -s debug-0-0 close` تست متوقف‌شده را با پیام `Session closed from wdio session` ناموفق می‌کند. نام session به صورت `debug-<cid>` است (`debug-0-0` برای اولین worker). بقیه این روند کاری در بخش [WebdriverIO Session](/docs/session) آمده است.
## پیکربندی پویا

توجه داشته باشید که `wdio.conf.js` می‌تواند شامل کد Javascript باشد. از آنجا که احتمالاً نمی‌خواهید مقدار timeout خود را به‌طور دائمی به ۱ روز تغییر دهید، اغلب مفید است که این تنظیمات را از خط فرمان و با استفاده از یک متغیر محیطی تغییر دهید.

با استفاده از این تکنیک، می‌توانید پیکربندی را به‌صورت پویا تغییر دهید:

```js
const debug = process.env.DEBUG
const defaultCapabilities = ...
const defaultTimeoutInterval = ...
const defaultSpecs = ...

export const config = {
    // ...
    maxInstances: debug ? 1 : 100,
    capabilities: debug ? [{ browserName: 'chrome' }] : defaultCapabilities,
    execArgv: debug ? ['--inspect'] : [],
    jasmineOpts: {
      defaultTimeoutInterval: debug ? (24 * 60 * 60 * 1000) : defaultTimeoutInterval
    }
    // ...
}
```

سپس می‌توانید فلگ `debug` را به ابتدای دستور `wdio` اضافه کنید:

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...و فایل spec خود را با DevTools اشکال‌زدایی کنید!

## اشکال‌زدایی با Visual Studio Code (VSCode)

اگر می‌خواهید تست‌های خود را با نقاط توقف (breakpoint) در آخرین نسخه VSCode اشکال‌زدایی کنید، دو گزینه برای راه‌اندازی دیباگر دارید که گزینه ۱ ساده‌ترین روش است:
 1. متصل کردن خودکار دیباگر
 2. متصل کردن دیباگر با استفاده از یک فایل پیکربندی

### VSCode Toggle Auto Attach

می‌توانید با دنبال کردن این مراحل در VSCode، دیباگر را به‌طور خودکار متصل کنید:
 - کلیدهای CMD + Shift + P (لینوکس و macOS) یا CTRL + Shift + P (ویندوز) را فشار دهید
 - عبارت "attach" را در فیلد ورودی تایپ کنید
 - گزینه "Debug: Toggle Auto Attach" را انتخاب کنید
 - گزینه "Only With Flag" را انتخاب کنید

 همین! اکنون وقتی تست‌های خود را اجرا می‌کنید (به یاد داشته باشید که همان‌طور که قبلاً نشان داده شد، باید فلگ --inspect را در پیکربندی خود تنظیم کنید) دیباگر به‌طور خودکار شروع به کار می‌کند و روی اولین نقطه توقفی که به آن می‌رسد، متوقف می‌شود.

### فایل پیکربندی VSCode

امکان اجرای همه یا فایل(های) spec انتخاب‌شده وجود دارد. پیکربندی(های) اشکال‌زدایی باید به `.vscode/launch.json` اضافه شوند. برای اشکال‌زدایی spec انتخاب‌شده، پیکربندی زیر را اضافه کنید:
```
{
    "name": "run select spec",
    "type": "node",
    "request": "launch",
    "args": ["wdio.conf.js", "--spec", "${file}"],
    "cwd": "${workspaceFolder}",
    "autoAttachChildProcesses": true,
    "program": "${workspaceRoot}/node_modules/@wdio/cli/bin/wdio.js",
    "console": "integratedTerminal",
    "skipFiles": [
        "${workspaceFolder}/node_modules/**/*.js",
        "${workspaceFolder}/lib/**/*.js",
        "<node_internals>/**/*.js"
    ]
},
```

برای اجرای همه فایل‌های spec، `"--spec", "${file}"` را از `"args"` حذف کنید

مثال: [.vscode/launch.json](https://github.com/mgrybyk/webdriverio-devtools/blob/master/.vscode/launch.json)

اطلاعات بیشتر: https://code.visualstudio.com/docs/nodejs/nodejs-debugging

## Repl پویا با Atom

اگر از کاربران حرفه‌ای [Atom](https://atom.io/) هستید، می‌توانید [`wdio-repl`](https://github.com/kurtharriger/wdio-repl) ساخته [@kurtharriger](https://github.com/kurtharriger) را امتحان کنید که یک repl پویا است و به شما امکان می‌دهد خطوط تکی کد را در Atom اجرا کنید. برای دیدن یک نمونه، [این](https://www.youtube.com/watch?v=kdM05ChhLQE) ویدیوی YouTube را تماشا کنید.

## اشکال‌زدایی با WebStorm / Intellij
می‌توانید یک پیکربندی اشکال‌زدایی node.js مانند این ایجاد کنید:
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
برای اطلاعات بیشتر درباره نحوه ایجاد پیکربندی، این [ویدیوی YouTube](https://www.youtube.com/watch?v=Qcqnmle6Wu8) را تماشا کنید.

## اشکال‌زدایی تست‌های ناپایدار (flaky)

اشکال‌زدایی تست‌های ناپایدار می‌تواند بسیار دشوار باشد، بنابراین در اینجا چند نکته آورده شده است که چگونه می‌توانید نتیجه ناپایداری را که در CI خود دریافت کرده‌اید، به‌صورت محلی بازتولید کنید.

### شبکه
برای اشکال‌زدایی ناپایداری‌های مرتبط با شبکه، از دستور [throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork) استفاده کنید.
```js
await browser.throttleNetwork('Regular3G')
```

### سرعت رندر
برای اشکال‌زدایی ناپایداری‌های مرتبط با سرعت دستگاه، از دستور [throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU) استفاده کنید.
این کار باعث می‌شود صفحات شما کندتر رندر شوند؛ وضعیتی که می‌تواند به دلایل زیادی ایجاد شود، مانند اجرای چندین فرآیند در CI که ممکن است تست‌های شما را کند کند.
```js
await browser.throttleCPU(4)
```

### سرعت اجرای تست

اگر به نظر می‌رسد تست‌های شما تحت تأثیر قرار نگرفته‌اند، ممکن است WebdriverIO سریع‌تر از به‌روزرسانی فریم‌ورک frontend / مرورگر باشد. این اتفاق هنگام استفاده از assertionهای همگام (synchronous) رخ می‌دهد، زیرا WebdriverIO دیگر فرصتی برای تلاش مجدد این assertionها ندارد. چند نمونه از کدهایی که ممکن است به همین دلیل خراب شوند:
```js
expect(elementList.length).toEqual(7) // list might not be populated at the time of the assertion
expect(await elem.getText()).toEqual('this button was clicked 3 times') // text might not be updated yet at the time of assertion resulting in an error ("this button was clicked 2 times" does not match the expected "this button was clicked 3 times")
expect(await elem.isDisplayed()).toBe(true) // might not be displayed yet
```
برای حل این مشکل، باید به‌جای آن از assertionهای ناهمگام (asynchronous) استفاده شود. مثال‌های بالا به این شکل خواهند بود:
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
با استفاده از این assertionها، WebdriverIO به‌طور خودکار صبر می‌کند تا شرط برقرار شود. هنگام بررسی متن، این به آن معناست که عنصر باید وجود داشته باشد و متن باید با مقدار مورد انتظار برابر باشد.
در [راهنمای بهترین شیوه‌ها](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions) بیشتر درباره این موضوع صحبت کرده‌ایم.

## پروفایل‌گیری عملکرد

WebdriverIO به شما امکان می‌دهد از تست‌های خود پروفایل عملکرد بگیرید تا گلوگاه‌های اجرای تست یا نشت‌های حافظه را شناسایی کنید. این قابلیت از امکانات بومی پروفایل‌گیری Node.js استفاده می‌کند.

### پروفایل‌گیری CPU

برای گرفتن پروفایل CPU، می‌توانید از فلگ CLI `--cpu-prof` استفاده کنید یا `cpuProf: true` را در پیکربندی خود تنظیم کنید.

```bash
npx wdio run wdio.conf.js --cpu-prof
```

این کار برای هر فرآیند worker یک فایل `.cpuprofile` در دایرکتوری `./profiles` (پیش‌فرض) ایجاد می‌کند. می‌توانید این فایل را در **Chrome DevTools > Performance > Load Profile** بارگذاری کنید تا اجرا را تحلیل کنید.

### پروفایل‌گیری Heap

برای گرفتن پروفایل Heap، از فلگ CLI `--heap-prof` استفاده کنید یا `heapProf: true` را در پیکربندی خود تنظیم کنید.

```bash
npx wdio run wdio.conf.js --heap-prof
```

این کار یک فایل `.heapprofile` در دایرکتوری `./profiles` ایجاد می‌کند (از sampling heap profiler استفاده می‌کند). می‌توانید آن را در **Chrome DevTools > Memory > Load** بارگذاری کنید تا مصرف حافظه را تحلیل کنید.

### معیارهای زمان‌بندی

هنگامی که پروفایل‌گیری فعال است، WebdriverIO همچنین به‌طور خودکار معیارهای زمان‌بندی را برای مراحل راه‌اندازی، اجرا و پایان تست شما ثبت می‌کند تا به شما کمک کند بفهمید زمان صرف چه بخش‌هایی می‌شود.

```
📊 Performance Metrics:
────────────────────────────────────────
  Setup:     1.25s
  Execution: 3.42s
  Teardown:  0.15s
```