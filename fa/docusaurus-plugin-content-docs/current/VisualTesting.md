---
id: visual-testing
title: تست بصری
description: "مقایسه اسکرین‌شات‌های صفحه‌نمایش، المان‌ها یا صفحات کامل با تصاویر پایه (baseline) با استفاده از @wdio/visual-service، شامل نصب و نحوه استفاده."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## چه کارهایی می‌تواند انجام دهد؟

WebdriverIO امکان مقایسه تصویر را روی صفحه‌نمایش‌ها، المان‌ها یا یک صفحه کامل برای موارد زیر فراهم می‌کند:

-   🖥️ مرورگرهای دسکتاپ (Chrome / Firefox / Safari / Microsoft Edge)
-   📱 مرورگرهای موبایل / تبلت (Chrome روی شبیه‌سازهای Android / Safari روی شبیه‌سازهای iOS / شبیه‌سازها / دستگاه‌های واقعی) از طریق Appium
-   📱 اپلیکیشن‌های نیتیو (شبیه‌سازهای Android / شبیه‌سازهای iOS / دستگاه‌های واقعی) از طریق Appium (🌟 **جدید** 🌟)
-   📳 اپلیکیشن‌های هیبریدی از طریق Appium

این کار از طریق [`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service) انجام می‌شود که یک سرویس سبک WebdriverIO است.

این سرویس به شما امکان می‌دهد:

-   اسکرین‌شات‌های **صفحه‌نمایش/المان‌ها/صفحه کامل** را ذخیره کنید یا با یک تصویر پایه مقایسه کنید
-   در صورت نبود تصویر پایه، به‌طور خودکار **یک تصویر پایه ایجاد کنید**
-   **نواحی سفارشی را مسدود کنید** و حتی نوار وضعیت و/یا نوار ابزار (فقط موبایل) را در حین مقایسه **به‌طور خودکار مستثنی کنید**
-   ابعاد اسکرین‌شات‌های المان‌ها را افزایش دهید
-   در حین مقایسه وب‌سایت **متن را پنهان کنید** تا:
    -   **پایداری را بهبود دهید** و از ناپایداری ناشی از رندر فونت جلوگیری کنید
    -   فقط روی **چیدمان (layout)** وب‌سایت تمرکز کنید
-   از **روش‌های مقایسه مختلف** و مجموعه‌ای از **matcherهای اضافی** برای خوانایی بهتر تست‌ها استفاده کنید
-   بررسی کنید که وب‌سایت شما چگونه **از پیمایش با کلید Tab صفحه‌کلید پشتیبانی می‌کند)**، همچنین به [پیمایش با Tab در یک وب‌سایت](#tabbing-through-a-website) مراجعه کنید
-   و بسیاری موارد دیگر، گزینه‌های [سرویس](./visual-testing/service-options) و [متد](./visual-testing/method-options) را ببینید

این سرویس یک ماژول سبک برای دریافت داده‌ها و اسکرین‌شات‌های مورد نیاز برای همه مرورگرها/دستگاه‌ها است. قدرت مقایسه از [Pixelmatch](https://github.com/mapbox/pixelmatch) می‌آید، یک کتابخانه سریع و دقیق برای مقایسه ادراکی تصاویر. از نسخه v11، این کتابخانه تفاوت رنگ‌ها را در فضای رنگی OKLab با فاصله HyAB (pixelmatch 8) اندازه‌گیری می‌کند که به نحوه دیدن رنگ‌ها توسط انسان نزدیک‌تر است. تصاویر با [fast-png](https://github.com/image-js/fast-png) پردازش می‌شوند، یک کدک PNG بدون هیچ وابستگی نیتیو.

:::info نکته برای اپلیکیشن‌های نیتیو/هیبریدی
متدهای `saveScreen`، `saveElement`، `checkScreen`، `checkElement` و matcherهای `toMatchScreenSnapshot` و `toMatchElementSnapshot` را می‌توان برای اپلیکیشن‌ها/کانتکست نیتیو استفاده کرد.

لطفاً زمانی که می‌خواهید از آن برای اپلیکیشن‌های هیبریدی استفاده کنید، از ویژگی `isHybridApp:true` در تنظیمات سرویس خود استفاده کنید.
:::

:::caution ارتقا از v10؟

`@wdio/visual-service` **v11** فقط از **WebdriverIO v10** (و Node.js نسخه 22.19 یا بالاتر) پشتیبانی می‌کند. با WebdriverIO v9، روی `@wdio/visual-service@10` بمانید.

نسخه v11 رنگ‌ها را به جای YIQ با pixelmatch 8 (فضای رنگی OKLab، فاصله HyAB) مقایسه می‌کند. مقیاس آستانه (threshold) و پیش‌تنظیم‌های `ignore*` تغییری نکرده‌اند، اما **درصدهای عدم تطابق ممکن است برای تصاویر یکسان کمی با v10 متفاوت باشند**. کد تست شما نیازی به تغییر ندارد. اگر یک بررسی به درصد عدم تطابق دقیق یا تلورانس تنگ وابسته است، پس از ارتقا دوباره آن را بررسی کنید.

برخی اصلاحات در v11 نیز می‌توانند یک بار تصویر پایه را تغییر دهند:

-   **اسکرین‌شات‌های المان در iOS برای المان‌های بزرگ:** برای المانی که به‌طور کامل داخل viewport نبود، تصویر اندازه کل المان را داشت، اما بخش خارج از viewport سیاه بود ([appium/appium#22939](https://github.com/appium/appium/issues/22939)). اکنون تصویر فقط بخش قابل مشاهده المان را دارد، همانند Android.
-   **اسکرین‌شات‌های المان با `biDiOrigin: 'viewport'`:** در یک نشست WebDriver BiDi، اسکرین‌شات اکنون خود المان را برش می‌دهد، حتی زمانی که صفحه اسکرول شده باشد.
-   **اسکرول به عقب:** بررسی‌های المان (با `autoElementScroll`) و بررسی‌های صفحه کامل اکنون صفحه را به جایی که بود برمی‌گردانند. یک بررسی viewport که بلافاصله پس از آن‌ها اجرا شود، ممکن است تصویر متفاوتی بدهد.

برای مشاهده همه تغییرات، [راهنمای مهاجرت v11](https://github.com/webdriverio/visual-testing/blob/main/docs/v11-migration.md) را ببینید.

:::

:::caution ارتقا از v9 (یا پایین‌تر)؟

`@wdio/visual-service` **v10** موتور مقایسه را از **ResembleJS** به **[Pixelmatch](https://github.com/mapbox/pixelmatch)** تغییر داد. Pixelmatch به جای RGB خام از یک مدل رنگی ادراکی (YIQ) استفاده می‌کند، بنابراین درصدهای عدم تطابق با v9 متفاوت خواهند بود. این یعنی:

-   **کد تست شما نیازی به تغییر ندارد.** همه نام‌های متدها، نام‌های گزینه‌ها و matcherها یکسان هستند.
-   **ممکن است تصاویر پایه شما نیاز به به‌روزرسانی داشته باشند.** پس از ارتقا، مجموعه تست خود را اجرا کنید و هرگونه تفاوت بصری را بررسی کنید. می‌توانید تصاویر پایه ناموفق را به‌صورت جداگانه با `--update-visual-baseline` به‌روزرسانی کنید، یا کل پوشه تصاویر پایه را حذف کنید و اجازه دهید `autoSaveBaseline` آن را از ابتدا بازسازی کند. برای جزئیات، [پرسش‌های متداول](/docs/visual-testing/faq#my-visual-tests-fail-with-a-difference-how-can-i-update-my-baseline) را ببینید.

:::

## نصب

ساده‌ترین راه این است که `@wdio/visual-service` را به‌عنوان dev-dependency در `package.json` خود نگه دارید، از طریق:

```sh
npm install --save-dev @wdio/visual-service
```

این دستور نسخه v11 را نصب می‌کند که به WebdriverIO v10 نیاز دارد. برای یک پروژه WebdriverIO v9، نسخه v10 سرویس را نصب کنید:

```sh
npm install --save-dev @wdio/visual-service@10
```

## نحوه استفاده

`@wdio/visual-service` را می‌توان به‌عنوان یک سرویس معمولی استفاده کرد. می‌توانید آن را در فایل پیکربندی خود به صورت زیر تنظیم کنید:

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // برخی گزینه‌ها، برای موارد بیشتر مستندات را ببینید
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                formatImageName: "{tag}-{logName}-{width}x{height}",
                screenshotPath: path.join(process.cwd(), "tmp"),
                savePerInstance: true,
                // ... گزینه‌های بیشتر
            },
        ],
    ],
    // ...
};
```

گزینه‌های بیشتر سرویس را می‌توانید [اینجا](/docs/visual-testing/service-options) پیدا کنید.

پس از تنظیم در پیکربندی WebdriverIO، می‌توانید assertionهای بصری را به [تست‌های خود](/docs/visual-testing/writing-tests) اضافه کنید.

### Capabilities
برای استفاده از ماژول تست بصری، **نیازی به افزودن هیچ گزینه اضافی به capabilities خود ندارید**. با این حال، در برخی موارد ممکن است بخواهید متادیتای اضافی مانند `logName` را به تست‌های بصری خود اضافه کنید.

`logName` به شما امکان می‌دهد یک نام سفارشی به هر capability اختصاص دهید که سپس می‌تواند در نام فایل‌های تصاویر گنجانده شود. این به‌ویژه برای تمایز اسکرین‌شات‌های گرفته‌شده در مرورگرها، دستگاه‌ها یا پیکربندی‌های مختلف مفید است.

برای فعال‌سازی این قابلیت، می‌توانید `logName` را در بخش `capabilities` تعریف کنید و اطمینان حاصل کنید که گزینه `formatImageName` در سرویس تست بصری به آن ارجاع می‌دهد. نحوه تنظیم آن به این صورت است:

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Setup
    // =====
    capabilities: [
        {
            browserName: 'chrome',
            'wdio-ics:options': {
                logName: 'chrome-mac-15', // نام لاگ سفارشی برای Chrome
            },
        }
        {
            browserName: 'firefox',
            'wdio-ics:options': {
                logName: 'firefox-mac-15', // نام لاگ سفارشی برای Firefox
            },
        }
    ],
    services: [
        [
            "visual",
            {
                // برخی گزینه‌ها، برای موارد بیشتر مستندات را ببینید
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                screenshotPath: path.join(process.cwd(), "tmp"),
                // فرمت زیر از `logName` موجود در capabilities استفاده می‌کند
                formatImageName: "{tag}-{logName}-{width}x{height}",
                // ... گزینه‌های بیشتر
            },
        ],
    ],
    // ...
};
```

#### نحوه کار
1. تنظیم `logName`:

    - در بخش `capabilities`، یک `logName` منحصربه‌فرد به هر مرورگر یا دستگاه اختصاص دهید. برای مثال، `chrome-mac-15` تست‌هایی را مشخص می‌کند که روی Chrome در macOS نسخه 15 اجرا می‌شوند.

2. نام‌گذاری سفارشی تصاویر:

    - گزینه `formatImageName`، مقدار `logName` را در نام فایل‌های اسکرین‌شات ادغام می‌کند. برای مثال، اگر `tag` برابر homepage و رزولوشن `1920x1080` باشد، نام فایل حاصل ممکن است به این شکل باشد:

        `homepage-chrome-mac-15-1920x1080.png`

3. مزایای نام‌گذاری سفارشی:

    - تمایز بین اسکرین‌شات‌های مرورگرها یا دستگاه‌های مختلف بسیار آسان‌تر می‌شود، به‌ویژه هنگام مدیریت تصاویر پایه و اشکال‌زدایی ناهمخوانی‌ها.

4. نکته درباره مقادیر پیش‌فرض:

    -اگر `logName` در capabilities تنظیم نشده باشد، گزینه `formatImageName` آن را به‌صورت یک رشته خالی در نام فایل‌ها نشان می‌دهد (`homepage--15-1920x1080.png`)

### WebdriverIO multi-remote

ما همچنین از [multi-remote](https://webdriver.io/docs/multiremote/) پشتیبانی می‌کنیم. برای اینکه این قابلیت به درستی کار کند، مطمئن شوید که `wdio-ics:options` را همان‌طور که در زیر می‌بینید به
capabilities خود اضافه کرده‌اید. این کار تضمین می‌کند که هر اسکرین‌شات نام منحصربه‌فرد خود را داشته باشد.

[نوشتن تست‌های شما](/docs/visual-testing/writing-tests) در مقایسه با استفاده از [testrunner](https://webdriver.io/docs/testrunner) هیچ تفاوتی نخواهد داشت.

```js
// wdio.conf.js
export const config = {
    capabilities: {
        chromeBrowserOne: {
            capabilities: {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: ["disable-infobars"],
                },
                // این!!!
                "wdio-ics:options": {
                    logName: "chrome-latest-one",
                },
            },
        },
        chromeBrowserTwo: {
            capabilities: {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: ["disable-infobars"],
                },
                // این!!!
                "wdio-ics:options": {
                    logName: "chrome-latest-two",
                },
            },
        },
    },
};
```

### اجرای برنامه‌نویسی‌شده

در اینجا یک مثال حداقلی از نحوه استفاده از `@wdio/visual-service` از طریق گزینه‌های `remote` آورده شده است:

```js
import { remote } from "webdriverio";
import VisualService from "@wdio/visual-service";

let visualService = new VisualService({
    autoSaveBaseline: true,
});

const browser = await remote({
    logLevel: "silent",
    capabilities: {
        browserName: "chrome",
    },
});

// سرویس را "راه‌اندازی" کنید تا دستورات سفارشی به `browser` اضافه شوند
visualService.remoteSetup(browser);

await browser.url("https://webdriver.io/");

// یا از این برای «فقط» ذخیره یک اسکرین‌شات استفاده کنید
await browser.saveFullPageScreen("examplePaged", {});

// یا از این برای اعتبارسنجی استفاده کنید. نیازی به ترکیب هر دو متد نیست، پرسش‌های متداول را ببینید
await browser.checkFullPageScreen("examplePaged", {});

await browser.deleteSession();
```

### پیمایش با Tab در یک وب‌سایت

می‌توانید با استفاده از کلید <kbd>TAB</kbd> صفحه‌کلید بررسی کنید که آیا یک وب‌سایت دسترس‌پذیر است یا خیر. تست این بخش از دسترس‌پذیری همیشه کاری زمان‌بر (دستی) و انجام آن از طریق خودکارسازی بسیار دشوار بوده است.
با متدهای `saveTabbablePage` و `checkTabbablePage`، اکنون می‌توانید خطوط و نقاطی روی وب‌سایت خود رسم کنید تا ترتیب پیمایش با Tab را تأیید کنید.

توجه داشته باشید که این فقط برای مرورگرهای دسکتاپ مفید است و **نه\*\*** برای دستگاه‌های موبایل. همه مرورگرهای دسکتاپ از این قابلیت پشتیبانی می‌کنند.

:::note

این کار از پست وبلاگ [Viv Richards](https://github.com/vivrichards600) با عنوان ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript) الهام گرفته شده است.

نحوه انتخاب المان‌های قابل پیمایش با Tab بر اساس ماژول [tabbable](https://github.com/davidtheclark/tabbable) است. اگر مشکلی در رابطه با پیمایش با Tab وجود دارد، لطفاً [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) و به‌ویژه بخش [More ](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details)Details را بررسی کنید.

:::

#### نحوه کار

هر دو متد یک المان `canvas` روی وب‌سایت شما ایجاد می‌کنند و خطوط و نقاطی رسم می‌کنند تا به شما نشان دهند اگر کاربر نهایی از کلید TAB استفاده کند، به کجا می‌رود. پس از آن، یک اسکرین‌شات صفحه کامل ایجاد می‌کنند تا دید کلی خوبی از جریان پیمایش به شما بدهند.

:::important

**از `saveTabbablePage` فقط زمانی استفاده کنید که نیاز به ایجاد یک اسکرین‌شات دارید و نمی‌خواهید آن را **با یک تصویر **پایه** مقایسه کنید.\*\*\*\*

:::

زمانی که می‌خواهید جریان پیمایش با Tab را با یک تصویر پایه مقایسه کنید، می‌توانید از متد `checkTabbablePage` استفاده کنید. شما **نیازی** به استفاده همزمان از این دو متد **ندارید**. اگر از قبل یک تصویر پایه ایجاد شده باشد، که می‌تواند به‌طور خودکار با ارائه `autoSaveBaseline: true` هنگام نمونه‌سازی سرویس انجام شود،
متد `checkTabbablePage` ابتدا تصویر _واقعی_ را ایجاد می‌کند و سپس آن را با تصویر پایه مقایسه می‌کند.

##### گزینه‌ها

هر دو متد از همان گزینه‌های `saveFullPageScreen` یا `compareFullPageScreen` استفاده می‌کنند.

#### مثال

این مثالی از نحوه کار پیمایش با Tab در [وب‌سایت آزمایشی (guinea pig)](https://guinea-pig.webdriver.io/image-compare.html) ما است:

![WDIO tabbing example](/img/visual/tabbable-chrome-latest-1366x768.png)

### به‌روزرسانی خودکار اسنپ‌شات‌های بصری ناموفق

تصاویر پایه را از طریق خط فرمان با افزودن آرگومان `--update-visual-baseline` به‌روزرسانی کنید. این کار:

-   به‌طور خودکار اسکرین‌شات واقعی گرفته‌شده را کپی کرده و در پوشه تصاویر پایه قرار می‌دهد
-   اگر تفاوت‌هایی وجود داشته باشد، اجازه می‌دهد تست موفق شود زیرا تصویر پایه به‌روزرسانی شده است

**نحوه استفاده:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

هنگام اجرا در حالت لاگ info/debug، لاگ‌های زیر را مشاهده خواهید کرد

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

## پشتیبانی از Typescript

این ماژول شامل پشتیبانی از TypeScript است که به شما امکان می‌دهد هنگام استفاده از سرویس تست بصری از تکمیل خودکار، ایمنی نوع (type safety) و تجربه توسعه‌دهنده بهتر بهره‌مند شوید.

### مرحله 1: افزودن تعاریف نوع
برای اطمینان از اینکه TypeScript انواع ماژول را تشخیص می‌دهد، ورودی زیر را به فیلد types در tsconfig.json خود اضافه کنید:

```json
{
    "compilerOptions": {
        "types": ["@wdio/visual-service"]
    }
}
```

### مرحله 2: فعال‌سازی ایمنی نوع برای گزینه‌های سرویس
برای اعمال بررسی نوع روی گزینه‌های سرویس، پیکربندی WebdriverIO خود را به‌روزرسانی کنید:

```ts
// wdio.conf.ts
import { join } from 'node:path';
// وارد کردن تعریف نوع
import type { VisualServiceOptions } from '@wdio/visual-service';

export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // گزینه‌های سرویس
                baselineFolder: join(process.cwd(), './__snapshots__/'),
                formatImageName: '{tag}-{logName}-{width}x{height}',
                screenshotPath: join(process.cwd(), '.tmp/'),
            } satisfies VisualServiceOptions, // ایمنی نوع را تضمین می‌کند
        ],
    ],
    // ...
};
```

## نیازمندی‌های سیستم

### نسخه 10 و بالاتر (فعلی)

برای نسخه 10 و بالاتر، این ماژول هیچ وابستگی سیستمی اضافی فراتر از [نیازمندی‌های عمومی پروژه](/docs/gettingstarted#system-requirements) ندارد. این ماژول از [Pixelmatch](https://github.com/mapbox/pixelmatch) برای مقایسه ادراکی تصاویر و از [fast-png](https://github.com/image-js/fast-png) برای رمزگذاری/رمزگشایی تصاویر استفاده می‌کند. هر دو به‌طور کامل با JavaScript نوشته شده‌اند و هیچ وابستگی نیتیو ندارند.

نسخه 11 به WebdriverIO v10 و Node.js نسخه 22.19 یا بالاتر نیاز دارد، همانند WebdriverIO v10. نسخه 10 با WebdriverIO v9 (نسخه 9.29.1 یا بالاتر) و v10 کار می‌کند.

### نسخه 5 تا 9 (قدیمی)

نسخه‌های 5 تا 9 از [Jimp](https://github.com/jimp-dev/jimp) استفاده می‌کردند، یک کتابخانه پردازش تصویر برای Node که به‌طور کامل با JavaScript نوشته شده و هیچ وابستگی نیتیو ندارد. هیچ وابستگی سیستمی اضافی مورد نیاز نبود.

### نسخه 4 و پایین‌تر

برای نسخه 4 و پایین‌تر، این ماژول به [Canvas](https://github.com/Automattic/node-canvas) متکی است، یک پیاده‌سازی canvas برای Node.js. Canvas به [Cairo](https://cairographics.org/) وابسته است.

#### جزئیات نصب

به‌طور پیش‌فرض، فایل‌های باینری برای macOS، Linux و Windows در حین `npm install` پروژه شما دانلود می‌شوند. اگر سیستم‌عامل یا معماری پردازنده پشتیبانی‌شده‌ای ندارید، ماژول روی سیستم شما کامپایل خواهد شد. این کار به چندین وابستگی از جمله Cairo و Pango نیاز دارد.

برای اطلاعات دقیق نصب، [ویکی node-canvas](https://github.com/Automattic/node-canvas/wiki/_pages) را ببینید. در زیر دستورالعمل‌های نصب تک‌خطی برای سیستم‌عامل‌های رایج آمده است. توجه داشته باشید که `libgif/giflib`، `librsvg` و `libjpeg` اختیاری هستند و به ترتیب فقط برای پشتیبانی از GIF، SVG و JPEG مورد نیاز هستند. Cairo نسخه v1.10.0 یا بالاتر الزامی است.

<Tabs
defaultValue="osx"
values={[
{label: 'OS', value: 'osx'},
{label: 'Ubuntu', value: 'ubuntu'},
{label: 'Fedora', value: 'fedora'},
{label: 'Solaris', value: 'solaris'},
{label: 'OpenBSD', value: 'openbsd'},
{label: 'Window', value: 'windows'},
{label: 'Others', value: 'others'},
]}

> <TabItem value="osx">

     با استفاده از [Homebrew](https://brew.sh/):

     ```sh
     brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
     ```

    **Mac OS X v10.11+:** اگر اخیراً به Mac OS X v10.11+ به‌روزرسانی کرده‌اید و هنگام کامپایل با مشکل مواجه می‌شوید، دستور زیر را اجرا کنید: `xcode-select --install`. درباره این مشکل [در Stack Overflow](http://stackoverflow.com/a/32929012/148072) بیشتر بخوانید.
    اگر Xcode نسخه 10.0 یا بالاتر نصب دارید، برای ساخت از سورس به NPM نسخه 6.4.1 یا بالاتر نیاز دارید.

</TabItem>
<TabItem value="ubuntu">

    ```sh
    sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
    ```

</TabItem>
<TabItem value="fedora">

    ```sh
    sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel
    ```

</TabItem>
<TabItem value="solaris">

    ```sh
    pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto
    ```

</TabItem>
<TabItem value="openbsd">

    ```sh
    doas pkg_add cairo pango png jpeg giflib
    ```

</TabItem>
<TabItem value="windows">

    [ویکی](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows) را ببینید

</TabItem>
<TabItem value="others">

    [ویکی](https://github.com/Automattic/node-canvas/wiki) را ببینید

</TabItem>
</Tabs>