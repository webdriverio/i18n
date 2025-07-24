---
id: visual-testing
title: تست بصری
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## چه کاری می‌تواند انجام دهد؟

WebdriverIO قابلیت مقایسه تصاویر را در صفحه‌ها، المان‌ها یا کل صفحه برای موارد زیر فراهم می‌کند:

-   🖥️ مرورگرهای دسکتاپ (کروم / فایرفاکس / سافاری / مایکروسافت اج)
-   📱 مرورگرهای موبایل / تبلت (کروم در شبیه‌سازهای اندروید / سافاری در شبیه‌سازهای iOS / دستگاه‌های واقعی) از طریق Appium
-   📱 اپلیکیشن‌های بومی (شبیه‌سازهای اندروید / شبیه‌سازهای iOS / دستگاه‌های واقعی) از طریق Appium (🌟 **جدید** 🌟)
-   📳 اپلیکیشن‌های هیبریدی از طریق Appium

از طریق [`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service) که یک سرویس سبک WebdriverIO است.

این به شما امکان می‌دهد:

-   ذخیره یا مقایسه **صفحه‌ها/المان‌ها/کل صفحه** با یک خط پایه
-   به طور خودکار **ایجاد یک خط پایه** زمانی که خط پایه‌ای وجود ندارد
-   **مسدود کردن منطقه‌های سفارشی** و حتی **به طور خودکار استثنا قرار دادن** نوار وضعیت و یا نوار ابزار (فقط موبایل) در هنگام مقایسه
-   افزایش ابعاد اسکرین‌شات‌های المان
-   **مخفی کردن متن** در هنگام مقایسه وب‌سایت برای:
    -   **بهبود ثبات** و جلوگیری از رندرینگ متزلزل فونت
    -   تمرکز فقط بر روی **طرح بندی** وب‌سایت
-   استفاده از **روش‌های مقایسه مختلف** و مجموعه‌ای از **تطبیق‌دهنده‌های اضافی** برای تست‌های خواناتر
-   بررسی چگونگی **پشتیبانی وب‌سایت شما از حرکت با کلید Tab)** صفحه کلید، همچنین ببینید [حرکت با Tab در یک وب‌سایت](#tabbing-through-a-website)
-   و موارد بیشتر، گزینه‌های [سرویس](./visual-testing/service-options) و [متد](./visual-testing/method-options) را ببینید

این سرویس یک ماژول سبک برای بازیابی داده‌های مورد نیاز و اسکرین‌شات‌ها برای تمامی مرورگرها/دستگاه‌ها است. قدرت مقایسه از [ResembleJS](https://github.com/Huddle/Resemble.js) می‌آید. اگر می‌خواهید تصاویر را به صورت آنلاین مقایسه کنید، می‌توانید [ابزار آنلاین](http://rsmbl.github.io/Resemble.js/) را بررسی کنید.

:::info نکته برای اپلیکیشن‌های بومی/هیبریدی
متدهای `saveScreen`، `saveElement`، `checkScreen`، `checkElement` و تطبیق‌دهنده‌های `toMatchScreenSnapshot` و `toMatchElementSnapshot` می‌توانند برای اپلیکیشن‌های بومی/محتوا استفاده شوند.

لطفاً از ویژگی `isHybridApp:true` در تنظیمات سرویس خود استفاده کنید وقتی می‌خواهید آن را برای اپلیکیشن‌های هیبریدی استفاده کنید.
:::

## نصب

ساده‌ترین راه این است که `@wdio/visual-service` را به عنوان یک وابستگی توسعه در `package.json` خود نگه دارید، از طریق:

```sh
npm install --save-dev @wdio/visual-service
```

## استفاده

`@wdio/visual-service` می‌تواند به عنوان یک سرویس معمولی استفاده شود. می‌توانید آن را در فایل پیکربندی خود با موارد زیر تنظیم کنید:

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
                // برخی گزینه‌ها، برای اطلاعات بیشتر به اسناد مراجعه کنید
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

گزینه‌های سرویس بیشتر را می‌توانید [اینجا](/docs/visual-testing/service-options) پیدا کنید.

پس از تنظیم در پیکربندی WebdriverIO خود، می‌توانید ادامه دهید و تأییدیه‌های بصری را به [تست‌های خود](/docs/visual-testing/writing-tests) اضافه کنید.

### قابلیت‌ها
برای استفاده از ماژول تست بصری، **نیازی به افزودن گزینه‌های اضافی به قابلیت‌های خود ندارید**. با این حال، در برخی موارد، ممکن است بخواهید داده‌های متا اضافی به تست‌های بصری خود اضافه کنید، مانند `logName`.

`logName` به شما امکان می‌دهد یک نام سفارشی به هر قابلیت اختصاص دهید، که سپس می‌تواند در نام‌های فایل تصویر گنجانده شود. این به ویژه برای تمایز اسکرین‌شات‌های گرفته شده در مرورگرها، دستگاه‌ها یا پیکربندی‌های مختلف مفید است.

برای فعال کردن این، می‌توانید `logName` را در بخش `capabilities` تعریف کنید و اطمینان حاصل کنید که گزینه `formatImageName` در سرویس تست بصری به آن اشاره می‌کند. نحوه تنظیم آن به شرح زیر است:

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
                logName: 'chrome-mac-15', // نام سفارشی لاگ برای کروم
            },
        }
        {
            browserName: 'firefox',
            'wdio-ics:options': {
                logName: 'firefox-mac-15', // نام سفارشی لاگ برای فایرفاکس
            },
        }
    ],
    services: [
        [
            "visual",
            {
                // برخی گزینه‌ها، برای اطلاعات بیشتر به اسناد مراجعه کنید
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                screenshotPath: path.join(process.cwd(), "tmp"),
                // فرمت زیر از `logName` از قابلیت‌ها استفاده می‌کند
                formatImageName: "{tag}-{logName}-{width}x{height}",
                // ... گزینه‌های بیشتر
            },
        ],
    ],
    // ...
};
```

#### چگونه کار می‌کند
1. تنظیم `logName`:

    - در بخش `capabilities`، یک `logName` منحصر به فرد به هر مرورگر یا دستگاه اختصاص دهید. به عنوان مثال، `chrome-mac-15` تست‌های اجرا شده روی کروم در macOS نسخه 15 را شناسایی می‌کند.

2. نام‌گذاری سفارشی تصویر:

    - گزینه `formatImageName` نام `logName` را در نام‌های فایل اسکرین‌شات ادغام می‌کند. به عنوان مثال، اگر `tag` صفحه اصلی و وضوح `1920x1080` باشد، نام فایل حاصل ممکن است به این شکل باشد:

        `homepage-chrome-mac-15-1920x1080.png`

3. مزایای نام‌گذاری سفارشی:

    - تمایز بین اسکرین‌شات‌ها از مرورگرها یا دستگاه‌های مختلف بسیار آسان‌تر می‌شود، به ویژه هنگام مدیریت خطوط پایه و اشکال‌زدایی اختلافات.

4. نکته در مورد پیش‌فرض‌ها:

    - اگر `logName` در قابلیت‌ها تنظیم نشده باشد، گزینه `formatImageName` آن را به عنوان یک رشته خالی در نام‌های فایل نشان می‌دهد (`homepage--15-1920x1080.png`)

### WebdriverIO MultiRemote

ما همچنین از [MultiRemote](https://webdriver.io/docs/multiremote/) پشتیبانی می‌کنیم. برای اینکه این به درستی کار کند، مطمئن شوید که `wdio-ics:options` را به قابلیت‌های خود اضافه کرده‌اید
همانطور که در زیر مشاهده می‌کنید. این اطمینان حاصل می‌کند که هر اسکرین‌شات نام منحصر به فرد خود را خواهد داشت.

[نوشتن تست‌های شما](/docs/visual-testing/writing-tests) با استفاده از [testrunner](https://webdriver.io/docs/testrunner) تفاوتی نخواهد داشت

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

### اجرای برنامه‌ای

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

// "شروع" سرویس برای افزودن دستورات سفارشی به `browser`
visualService.remoteSetup(browser);

await browser.url("https://webdriver.io/");

// یا از این برای ذخیره اسکرین‌شات استفاده کنید
await browser.saveFullPageScreen("examplePaged", {});

// یا از این برای اعتبارسنجی استفاده کنید. هر دو روش نیازی به ترکیب ندارند، به سوالات متداول مراجعه کنید
await browser.checkFullPageScreen("examplePaged", {});

await browser.deleteSession();
```

### حرکت با Tab در یک وب‌سایت

شما می‌توانید بررسی کنید که آیا وب‌سایت با استفاده از کلید <kbd>TAB</kbd> صفحه کلید قابل دسترسی است. تست این بخش از دسترس‌پذیری همیشه یک کار (دستی) زمان‌بر و از طریق اتوماسیون بسیار سخت بوده است.
با متدهای `saveTabbablePage` و `checkTabbablePage`، اکنون می‌توانید خطوط و نقاط را روی وب‌سایت خود بکشید تا ترتیب حرکت با tab را تأیید کنید.

توجه داشته باشید که این فقط برای مرورگرهای دسکتاپ مفید است و **برای** دستگاه‌های موبایل نیست. همه مرورگرهای دسکتاپ از این ویژگی پشتیبانی می‌کنند.

:::note

این کار از پست وبلاگ [Viv Richards](https://github.com/vivrichards600) درباره ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript) الهام گرفته شده است.

نحوه انتخاب عناصر قابل حرکت با tab بر اساس ماژول [tabbable](https://github.com/davidtheclark/tabbable) است. اگر مشکلی در مورد حرکت با tab وجود دارد، لطفاً [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) و به ویژه بخش [More Details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details) را بررسی کنید.

:::

#### چگونه کار می‌کند

هر دو روش یک عنصر `canvas` در وب‌سایت شما ایجاد می‌کنند و خطوط و نقاط را می‌کشند تا به شما نشان دهند که TAB شما به کجا می‌رود اگر یک کاربر نهایی از آن استفاده کند. پس از آن، یک اسکرین‌شات کامل صفحه ایجاد می‌کند تا دید خوبی از جریان به شما بدهد.

:::important

**از `saveTabbablePage` فقط زمانی استفاده کنید که به ایجاد اسکرین‌شات نیاز دارید و نمی‌خواهید آن را **با تصویر **خط پایه** مقایسه کنید.\*\*\*\*

:::

وقتی می‌خواهید جریان حرکت با tab را با یک خط پایه مقایسه کنید، می‌توانید از متد `checkTabbablePage` استفاده کنید. **نیازی نیست** از هر دو روش با هم استفاده کنید. اگر قبلاً یک تصویر خط پایه ایجاد شده باشد، که می‌تواند با ارائه `autoSaveBaseline: true` هنگام راه‌اندازی سرویس به طور خودکار انجام شود،
`checkTabbablePage` ابتدا تصویر _واقعی_ را ایجاد می‌کند و سپس آن را با خط پایه مقایسه می‌کند.

##### گزینه‌ها

هر دو روش از همان گزینه‌های `saveFullPageScreen` یا `compareFullPageScreen` استفاده می‌کنند.

#### مثال

این یک مثال از نحوه کار حرکت با tab در [وب‌سایت خوکچه هندی](https://guinea-pig.webdriver.io/image-compare.html) ما است:

![WDIO tabbing example](/img/visual/tabbable-chrome-latest-1366x768.png)

### به‌روزرسانی خودکار عکس‌های بصری ناموفق

به‌روزرسانی تصاویر خط پایه از طریق خط فرمان با افزودن آرگومان `--update-visual-baseline`. این عمل

-   به طور خودکار اسکرین‌شات گرفته شده را کپی می‌کند و آن را در پوشه خط پایه قرار می‌دهد
-   اگر تفاوت‌هایی وجود داشته باشد، اجازه می‌دهد تست موفق شود زیرا خط پایه به‌روز شده است

**استفاده:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

هنگام اجرا در حالت اطلاعات/اشکال‌زدایی، شما لاگ‌های زیر را مشاهده خواهید کرد

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

## پشتیبانی از تایپ اسکریپت

این ماژول شامل پشتیبانی از TypeScript است که به شما امکان می‌دهد از تکمیل خودکار، ایمنی نوع و تجربه توسعه‌دهنده بهبود یافته هنگام استفاده از سرویس تست بصری بهره‌مند شوید.

### مرحله 1: افزودن تعاریف نوع
برای اطمینان از اینکه TypeScript انواع ماژول را تشخیص می‌دهد، ورودی زیر را به فیلد types در tsconfig.json خود اضافه کنید:

```json
{
    "compilerOptions": {
        "types": ["@wdio/visual-service"]
    }
}
```

### مرحله 2: فعال کردن ایمنی نوع برای گزینه‌های سرویس
برای اعمال بررسی نوع در گزینه‌های سرویس، پیکربندی WebdriverIO خود را به‌روزرسانی کنید:

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
            } satisfies VisualServiceOptions, // اطمینان از ایمنی نوع
        ],
    ],
    // ...
};
```

## نیازمندی‌های سیستم

### نسخه 5 و بالاتر

برای نسخه 5 و بالاتر، این ماژول یک ماژول کاملاً مبتنی بر جاوااسکریپت است که نیازمندی‌های سیستمی اضافی فراتر از [نیازمندی‌های پروژه](/docs/gettingstarted#system-requirements) عمومی ندارد. از [Jimp](https://github.com/jimp-dev/jimp) استفاده می‌کند که یک کتابخانه پردازش تصویر برای Node است که کاملاً در جاوااسکریپت نوشته شده و بدون وابستگی‌های بومی است.

### نسخه 4 و پایین‌تر

برای نسخه 4 و پایین‌تر، این ماژول به [Canvas](https://github.com/Automattic/node-canvas) وابسته است که یک پیاده‌سازی canvas برای Node.js است. Canvas به [Cairo](https://cairographics.org/) وابسته است.

#### جزئیات نصب

به طور پیش‌فرض، باینری‌ها برای macOS، لینوکس و ویندوز در طول `npm install` پروژه شما دانلود می‌شوند. اگر سیستم عامل یا معماری پردازنده پشتیبانی شده ندارید، ماژول در سیستم شما کامپایل می‌شود. این نیازمند چندین وابستگی از جمله Cairo و Pango است.

برای اطلاعات نصب دقیق، به [ویکی node-canvas](https://github.com/Automattic/node-canvas/wiki/_pages) مراجعه کنید. در زیر دستورالعمل‌های نصب یک خطی برای سیستم‌های عامل رایج آورده شده است. توجه داشته باشید که `libgif/giflib`، `librsvg` و `libjpeg` اختیاری هستند و فقط برای پشتیبانی از GIF، SVG و JPEG مورد نیاز هستند. Cairo نسخه 1.10.0 یا بالاتر مورد نیاز است.

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

    **Mac OS X v10.11+:** اگر اخیراً به Mac OS X v10.11+ به‌روزرسانی کرده‌اید و هنگام کامپایل مشکل دارید، دستور زیر را اجرا کنید: `xcode-select --install`. درباره مشکل بیشتر [در Stack Overflow](http://stackoverflow.com/a/32929012/148072) بخوانید.
    اگر Xcode 10.0 یا بالاتر نصب دارید، برای ساخت از منبع به NPM 6.4.1 یا بالاتر نیاز دارید.

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

    به [ویکی](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows) مراجعه کنید

</TabItem>
<TabItem value="others">

    به [ویکی](https://github.com/Automattic/node-canvas/wiki) مراجعه کنید

</TabItem>
</Tabs>