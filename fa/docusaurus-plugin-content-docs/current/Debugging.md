---
id: debugging
title: اشکال زدایی
---

اشکال زدایی هنگامی که چندین فرآیند، ده‌ها آزمایش را در مرورگرهای مختلف اجرا می‌کنند، بسیار سخت‌تر می‌شود.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

برای شروع، بسیار مفید است که موازی‌سازی را با تنظیم `maxInstances` به `1` محدود کنید، و فقط آن مشخصات و مرورگرهایی را هدف قرار دهید که نیاز به اشکال‌زدایی دارند.

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

در بسیاری از موارد، می‌توانید از [`browser.debug()`](/docs/api/browser/debug) برای توقف آزمایش خود و بررسی مرورگر استفاده کنید.

رابط خط فرمان شما نیز به حالت REPL تغییر می‌کند. این حالت به شما اجازه می‌دهد با دستورات و عناصر صفحه کار کنید. در حالت REPL، می‌توانید به شیء `browser` یا توابع `$` و `$$` همانطور که در آزمایش‌های خود استفاده می‌کنید، دسترسی پیدا کنید.

هنگام استفاده از `browser.debug()`، احتمالاً باید مهلت زمانی (timeout) آزمایش‌کننده را افزایش دهید تا از شکست آزمایش به دلیل طولانی شدن زمان جلوگیری کنید. برای مثال:

در `wdio.conf`:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

برای اطلاعات بیشتر در مورد نحوه انجام این کار با استفاده از چارچوب‌های دیگر، به [timeouts](timeouts) مراجعه کنید.

برای ادامه آزمایش‌ها پس از اشکال‌زدایی، در پوسته از میانبر `^C` یا دستور `.exit` استفاده کنید.

## پیکربندی پویا

توجه داشته باشید که `wdio.conf.js` می‌تواند حاوی جاوااسکریپت باشد. از آنجا که احتمالاً نمی‌خواهید مقدار مهلت زمانی خود را به صورت دائمی به ۱ روز تغییر دهید، اغلب مفید است که این تنظیمات را از خط فرمان با استفاده از یک متغیر محیطی تغییر دهید.

با استفاده از این تکنیک، می‌توانید پیکربندی را به صورت پویا تغییر دهید:

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

سپس می‌توانید دستور `wdio` را با پرچم `debug` پیشوند کنید:

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...و فایل مشخصات خود را با DevTools اشکال‌زدایی کنید!

## اشکال‌زدایی با Visual Studio Code (VSCode)

اگر می‌خواهید آزمایش‌های خود را با نقاط توقف در آخرین نسخه VSCode اشکال‌زدایی کنید، دو گزینه برای شروع اشکال‌زدا دارید که گزینه ۱ آسان‌ترین روش است:
 1. متصل کردن خودکار اشکال‌زدا
 2. متصل کردن اشکال‌زدا با استفاده از فایل پیکربندی

### VSCode Toggle Auto Attach

می‌توانید اشکال‌زدا را به طور خودکار با دنبال کردن این مراحل در VSCode متصل کنید:
 - فشار دادن CMD + Shift + P (لینوکس و مک) یا CTRL + Shift + P (ویندوز)
 - تایپ "attach" در فیلد ورودی
 - انتخاب "Debug: Toggle Auto Attach"
 - انتخاب "Only With Flag"

 همین! حالا وقتی آزمایش‌های خود را اجرا می‌کنید (به یاد داشته باشید که نیاز به تنظیم پرچم --inspect در پیکربندی خود دارید، همانطور که قبلاً نشان داده شد) به طور خودکار اشکال‌زدا را شروع می‌کند و در اولین نقطه توقفی که به آن می‌رسد، متوقف می‌شود.

### فایل پیکربندی VSCode

امکان اجرای همه یا فایل(های) مشخصات انتخاب شده وجود دارد. پیکربندی(های) اشکال‌زدایی باید به `.vscode/launch.json` اضافه شوند، برای اشکال‌زدایی مشخصات انتخاب شده، پیکربندی زیر را اضافه کنید:

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

برای اجرای همه فایل‌های مشخصات، `"--spec", "${file}"` را از `"args"` حذف کنید

مثال: [.vscode/launch.json](https://github.com/mgrybyk/webdriverio-devtools/blob/master/.vscode/launch.json)

اطلاعات اضافی: https://code.visualstudio.com/docs/nodejs/nodejs-debugging

## Repl پویا با Atom

اگر از [Atom](https://atom.io/) استفاده می‌کنید، می‌توانید [`wdio-repl`](https://github.com/kurtharriger/wdio-repl) ساخته [@kurtharriger](https://github.com/kurtharriger) را امتحان کنید که یک repl پویا است و به شما اجازه می‌دهد خطوط کد منفرد را در Atom اجرا کنید. برای دیدن نمایش، [این](https://www.youtube.com/watch?v=kdM05ChhLQE) ویدیوی یوتیوب را تماشا کنید.

## اشکال‌زدایی با WebStorm / Intellij
می‌توانید یک پیکربندی اشکال‌زدایی node.js مانند این ایجاد کنید:
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
برای اطلاعات بیشتر در مورد نحوه ایجاد پیکربندی، این [ویدیوی یوتیوب](https://www.youtube.com/watch?v=Qcqnmle6Wu8) را تماشا کنید.

## اشکال‌زدایی آزمایش‌های ناپایدار

اشکال‌زدایی آزمایش‌های ناپایدار می‌تواند واقعاً سخت باشد، بنابراین در اینجا نکاتی وجود دارد که چگونه می‌توانید نتیجه ناپایداری را که در CI خود مشاهده کرده‌اید، به صورت محلی بازتولید کنید.

### شبکه
برای اشکال‌زدایی ناپایداری مربوط به شبکه، از دستور [throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork) استفاده کنید.
```js
await browser.throttleNetwork('Regular3G')
```

### سرعت رندرینگ
برای اشکال‌زدایی ناپایداری مربوط به سرعت دستگاه، از دستور [throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU) استفاده کنید.
این باعث می‌شود صفحات شما آهسته‌تر رندر شوند که می‌تواند به دلایل مختلفی مانند اجرای چندین فرآیند در CI شما باشد که می‌تواند آزمایش‌های شما را کند کند.
```js
await browser.throttleCPU(4)
```

### سرعت اجرای آزمایش

اگر آزمایش‌های شما تحت تأثیر قرار نمی‌گیرند، ممکن است WebdriverIO سریع‌تر از به‌روزرسانی از فریم‌ورک/مرورگر فرانت‌اند باشد. این زمانی اتفاق می‌افتد که از تأییدهای همزمان استفاده می‌کنید، زیرا WebdriverIO دیگر فرصتی برای تلاش مجدد این تأییدها ندارد. برخی نمونه‌های کدی که ممکن است به این دلیل خراب شوند:
```js
expect(elementList.length).toEqual(7) // لیست ممکن است در زمان تأیید هنوز پر نشده باشد
expect(await elem.getText()).toEqual('this button was clicked 3 times') // متن ممکن است هنوز در زمان تأیید به روز نشده باشد که منجر به خطا می‌شود ("this button was clicked 2 times" با مقدار مورد انتظار "this button was clicked 3 times" مطابقت ندارد)
expect(await elem.isDisplayed()).toBe(true) // ممکن است هنوز نمایش داده نشده باشد
```
برای حل این مشکل، باید از تأییدهای ناهمزمان استفاده کرد. مثال‌های بالا به این صورت خواهند بود:
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
با استفاده از این تأییدها، WebdriverIO به طور خودکار صبر می‌کند تا شرط مطابقت پیدا کند. هنگام تأیید متن، این به این معنی است که عنصر باید وجود داشته باشد و متن باید با مقدار مورد انتظار برابر باشد.
ما بیشتر در مورد این موضوع در [راهنمای بهترین روش‌ها](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions) صحبت می‌کنیم.