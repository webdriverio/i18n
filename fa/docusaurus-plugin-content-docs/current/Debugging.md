---
id: debugging
title: خطایابی
---

خطایابی زمانی که چندین فرآیند ده‌ها آزمایش را در مرورگرهای متعدد اجرا می‌کنند، بسیار دشوارتر می‌شود.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

برای شروع، محدود کردن موازی سازی با تنظیم `maxInstances` به `1` و هدف قرار دادن تنها آن مشخصات و مرورگرهایی که نیاز به خطایابی دارند، بسیار مفید است.

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

## دستور خطایابی (Debug)

در بسیاری از موارد، می‌توانید از [`browser.debug()`](/docs/api/browser/debug) برای متوقف کردن آزمایش خود و بررسی مرورگر استفاده کنید.

رابط خط فرمان شما نیز به حالت REPL تغییر می‌کند. این حالت به شما امکان می‌دهد با دستورات و عناصر در صفحه کار کنید. در حالت REPL، می‌توانید به شیء `browser` یا توابع `$` و `$$` دسترسی داشته باشید، همانطور که در آزمایش‌های خود می‌توانید.

هنگام استفاده از `browser.debug()`، احتمالاً نیاز دارید مدت زمان انتظار اجرای آزمون را افزایش دهید تا از شکست آزمون به دلیل طولانی شدن زمان جلوگیری کنید. برای مثال:

در `wdio.conf`:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

برای اطلاعات بیشتر در مورد نحوه انجام این کار با استفاده از فریم‌ورک‌های دیگر، به [timeouts](timeouts) مراجعه کنید.

برای ادامه آزمایش‌ها پس از خطایابی، در پوسته از میانبر `^C` یا دستور `.exit` استفاده کنید.

## پیکربندی پویا

توجه داشته باشید که `wdio.conf.js` می‌تواند شامل جاوااسکریپت باشد. از آنجایی که احتمالاً نمی‌خواهید مقدار مهلت زمانی خود را به طور دائم به ۱ روز تغییر دهید، اغلب مفید است که این تنظیمات را از خط فرمان با استفاده از یک متغیر محیطی تغییر دهید.

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

...و فایل مشخصات خود را با DevTools دیباگ کنید!

## خطایابی با Visual Studio Code (VSCode)

اگر می‌خواهید آزمایش‌های خود را با نقاط توقف در آخرین نسخه VSCode دیباگ کنید، دو گزینه برای شروع خطایاب دارید که گزینه ۱ ساده‌ترین روش است:
 1. اتصال خودکار خطایاب
 2. اتصال خطایاب با استفاده از فایل پیکربندی

### VSCode Toggle Auto Attach

می‌توانید خطایاب را با دنبال کردن این مراحل در VSCode به طور خودکار متصل کنید:
 - دکمه CMD + Shift + P (لینوکس و مک) یا CTRL + Shift + P (ویندوز) را فشار دهید
 - «attach» را در فیلد ورودی تایپ کنید
 - «Debug: Toggle Auto Attach» را انتخاب کنید
 - «Only With Flag» را انتخاب کنید

 همین! اکنون وقتی آزمایش‌های خود را اجرا می‌کنید (به یاد داشته باشید که باید پرچم --inspect را در پیکربندی خود همانطور که قبلا نشان داده شد تنظیم کنید) خطایاب به طور خودکار شروع می‌شود و در اولین نقطه توقفی که به آن می‌رسد، متوقف می‌شود.

### فایل پیکربندی VSCode

امکان اجرای همه یا فایل(های) مشخصات انتخاب شده وجود دارد. پیکربندی(های) دیباگ باید به `.vscode/launch.json` اضافه شود، برای دیباگ مشخصات انتخابی پیکربندی زیر را اضافه کنید:
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

اگر هکر [Atom](https://atom.io/) هستید، می‌توانید [`wdio-repl`](https://github.com/kurtharriger/wdio-repl) را که توسط [@kurtharriger](https://github.com/kurtharriger) ساخته شده امتحان کنید. این ابزار یک repl پویا است که به شما اجازه می‌دهد خطوط کد تکی را در Atom اجرا کنید. برای دیدن یک نمایش، [این](https://www.youtube.com/watch?v=kdM05ChhLQE) ویدیو یوتیوب را تماشا کنید.

## خطایابی با WebStorm / Intellij
می‌توانید یک پیکربندی دیباگ node.js به این شکل ایجاد کنید:
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
برای اطلاعات بیشتر در مورد نحوه ایجاد یک پیکربندی، این [ویدیوی یوتیوب](https://www.youtube.com/watch?v=Qcqnmle6Wu8) را تماشا کنید.

## دیباگ تست‌های ناپایدار

تست‌های ناپایدار می‌توانند بسیار سخت برای خطایابی باشند، بنابراین در اینجا چند نکته برای چگونگی تلاش برای بازتولید نتیجه ناپایدار که در CI خود دریافت کرده‌اید به صورت محلی آورده شده است.

### شبکه
برای دیباگ ناپایداری‌های مرتبط با شبکه از دستور [throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork) استفاده کنید.
```js
await browser.throttleNetwork('Regular3G')
```

### سرعت رندر
برای دیباگ ناپایداری‌های مرتبط با سرعت دستگاه از دستور [throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU) استفاده کنید.
این باعث می‌شود صفحات شما کندتر رندر شوند که می‌تواند به دلایل مختلفی مانند اجرای چندین فرآیند در CI که می‌تواند تست‌های شما را کند کند، رخ دهد.
```js
await browser.throttleCPU(4)
```

### سرعت اجرای تست

اگر به نظر نمی‌رسد آزمایش‌های شما تحت تأثیر قرار گرفته باشند، ممکن است WebdriverIO سریع‌تر از به‌روزرسانی فریم‌ورک فرانت‌اند/مرورگر باشد. این اتفاق زمانی می‌افتد که از تاییدیه‌های همزمان استفاده می‌کنید زیرا WebdriverIO دیگر فرصتی برای تلاش مجدد این تاییدیه‌ها ندارد. برخی از نمونه‌های کدی که ممکن است به دلیل این مشکل شکست بخورند:
```js
expect(elementList.length).toEqual(7) // ممکن است لیست در زمان تأیید هنوز پر نشده باشد
expect(await elem.getText()).toEqual('this button was clicked 3 times') // ممکن است متن در زمان تأیید هنوز به‌روز نشده باشد و منجر به خطا شود ("این دکمه ۲ بار کلیک شده است" با مقدار مورد انتظار "این دکمه ۳ بار کلیک شده است" مطابقت ندارد)
expect(await elem.isDisplayed()).toBe(true) // ممکن است هنوز نمایش داده نشده باشد
```
برای حل این مشکل، باید از تاییدیه‌های غیرهمزمان استفاده کرد. مثال‌های بالا به این شکل خواهند بود:
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
با استفاده از این تاییدیه‌ها، WebdriverIO به طور خودکار منتظر می‌ماند تا شرط مطابقت داشته باشد. هنگام تأیید متن، این به این معنی است که عنصر باید وجود داشته باشد و متن باید با مقدار مورد انتظار برابر باشد.
ما در مورد این موضوع در [راهنمای بهترین روش‌ها](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions) بیشتر صحبت می‌کنیم.