---
id: service-options
title: گزینه‌های سرویس
---

گزینه‌های سرویس، تنظیماتی هستند که می‌توانند هنگام ایجاد سرویس تنظیم شوند و برای هر فراخوانی روش استفاده خواهند شد.

```js
// wdio.conf.(js|ts)
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // The options
            },
        ],
    ],
    // ...
};
```

## گزینه‌های پیش‌فرض

### `addressBarShadowPadding`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** `6`
-   **پشتیبانی شده:** وب

پدینگی که باید به نوار آدرس در iOS و Android اضافه شود تا یک برش درست از viewport انجام شود.

### `autoElementScroll`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `true`
-   **پشتیبانی شده:** وب، اپلیکیشن هیبرید (Webview)

این گزینه به شما امکان می‌دهد اسکرول خودکار عنصر به نما را هنگام ایجاد یک اسکرین‌شات از عنصر غیرفعال کنید.

### `addIOSBezelCorners`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `false`
-   **پشتیبانی شده:** وب، اپلیکیشن هیبرید (Webview)، اپلیکیشن بومی

گوشه‌های قاب و بریدگی/ناحیه پویا را به اسکرین‌شات برای دستگاه‌های iOS اضافه می‌کند.

:::info نکته
این فقط هنگامی می‌تواند انجام شود که نام دستگاه **بتواند** به طور خودکار تعیین شود و با لیست زیر از نام‌های نرمال‌سازی شده دستگاه مطابقت داشته باشد. نرمال‌سازی توسط این ماژول انجام خواهد شد.
**iPhone:**

-   iPhone X: `iphonex`
-   iPhone XS: `iphonexs`
-   iPhone XS Max: `iphonexsmax`
-   iPhone XR: `iphonexr`
-   iPhone 11: `iphone11`
-   iPhone 11 Pro: `iphone11pro`
-   iPhone 11 Pro Max: `iphone11promax`
-   iPhone 12: `iphone12`
-   iPhone 12 Mini: `iphone12mini`
-   iPhone 12 Pro: `iphone12pro`
-   iPhone 12 Pro Max: `iphone12promax`
-   iPhone 13: `iphone13`
-   iPhone 13 Mini: `iphone13mini`
-   iPhone 13 Pro: `iphone13pro`
-   iPhone 13 Pro Max: `iphone13promax`
-   iPhone 14: `iphone14`
-   iPhone 14 Plus: `iphone14plus`
-   iPhone 14 Pro: `iphone14pro`
-   iPhone 14 Pro Max: `iphone14promax`
    **iPads:**
-   iPad Mini 6th Generation: `ipadmini`
-   iPad Air 4th Generation: `ipadair`
-   iPad Air 5th Generation: `ipadair`
-   iPad Pro (11-inch) 1st Generation: `ipadpro11`
-   iPad Pro (11-inch) 2nd Generation: `ipadpro11`
-   iPad Pro (11-inch) 3rd Generation: `ipadpro11`
-   iPad Pro (12.9-inch) 3rd Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 4th Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 5th Generation: `ipadpro129`

:::

### `autoSaveBaseline`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `true`
-   **پشتیبانی شده:** وب، اپلیکیشن هیبرید (Webview)، اپلیکیشن بومی

اگر هیچ تصویر پایه‌ای در طول مقایسه یافت نشود، تصویر به صورت خودکار به پوشه پایه کپی می‌شود.

### `baselineFolder`

-   **نوع:** `string|()=> string`
-   **اجباری:** خیر
-   **پیش‌فرض:** `.path/to/testfile/__snapshots__/`
-   **پشتیبانی شده:** وب، اپلیکیشن هیبرید (Webview)، اپلیکیشن بومی

دایرکتوری که تمام تصاویر پایه مورد استفاده در مقایسه را نگهداری می‌کند. اگر تنظیم نشود، مقدار پیش‌فرض استفاده خواهد شد که فایل‌ها را در پوشه `__snapshots__/` در کنار فایل مشخصاتی که آزمون‌های بصری را اجرا می‌کند، ذخیره می‌کند. تابعی که یک `string` برمی‌گرداند نیز می‌تواند برای تنظیم مقدار `baselineFolder` استفاده شود:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// یا
{
    baselineFolder: () => {
        // انجام برخی جادوها در اینجا
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `false`
-   **پشتیبانی شده:** وب، اپلیکیشن هیبرید (Webview)، اپلیکیشن بومی

حذف پوشه زمان اجرا (`actual` و `diff`) در هنگام راه‌اندازی

:::info نکته
این فقط هنگامی کار می‌کند که [`screenshotPath`](#screenshotpath) از طریق گزینه‌های افزونه تنظیم شده باشد و **کار نخواهد کرد** وقتی پوشه‌ها را در روش‌ها تنظیم می‌کنید
:::

### `createJsonReportFiles` **(جدید)**

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `false`

اکنون شما گزینه صدور نتایج مقایسه به یک فایل گزارش JSON را دارید. با ارائه گزینه `createJsonReportFiles: true`، هر تصویری که مقایسه می‌شود گزارشی ایجاد می‌کند که در پوشه `actual`، در کنار هر نتیجه تصویر `actual` ذخیره می‌شود. خروجی به این شکل خواهد بود:

```json
{
    "parent": "check methods",
    "test": "should fail comparing with a baseline",
    "tag": "examplePageFail",
    "instanceData": {
        "browser": {
            "name": "chrome-headless-shell",
            "version": "126.0.6478.183"
        },
        "platform": {
            "name": "mac",
            "version": "not-known"
        }
    },
    "commandName": "checkScreen",
    "boundingBoxes": {
        "diffBoundingBoxes": [
            {
                "left": 1088,
                "top": 717,
                "right": 1186,
                "bottom": 730
            }
            //....
        ],
        "ignoredBoxes": [
            {
                "left": 159,
                "top": 652,
                "right": 356,
                "bottom": 703
            }
            //...
        ]
    },
    "fileData": {
        "actualFilePath": "/Users/wdio/visual-testing/.tmp/actual/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "baselineFilePath": "/Users/wdio/visual-testing/localBaseline/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "diffFilePath": "/Users/wdio/visual-testing/.tmp/diff/desktop_chrome-headless-shell/examplePageFail-local-chrome-latest-1366x768png",
        "fileName": "examplePageFail-local-chrome-latest-1366x768.png",
        "size": {
            "actual": {
                "height": 768,
                "width": 1366
            },
            "baseline": {
                "height": 768,
                "width": 1366
            },
            "diff": {
                "height": 768,
                "width": 1366
            }
        }
    },
    "misMatchPercentage": "12.90",
    "rawMisMatchPercentage": 12.900729014153246
}
```

وقتی تمام آزمون‌ها اجرا شوند، یک فایل JSON جدید با مجموعه مقایسه‌ها ایجاد خواهد شد و می‌تواند در ریشه پوشه `actual` شما یافت شود. داده‌ها گروه‌بندی شده‌اند توسط:

-   `describe` برای Jasmine/Mocha یا `Feature` برای CucumberJS
-   `it` برای Jasmine/Mocha یا `Scenario` برای CucumberJS
    و سپس مرتب شده توسط:
-   `commandName`، که نام‌های روش مقایسه استفاده شده برای مقایسه تصاویر هستند
-   `instanceData`، ابتدا مرورگر، سپس دستگاه، سپس پلتفرم
    به این شکل خواهد بود

```json
[
    {
        "description": "check methods",
        "data": [
            {
                "test": "should fail comparing with a baseline",
                "data": [
                    {
                        "tag": "examplePageFail",
                        "instanceData": {},
                        "commandName": "checkScreen",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "14.34",
                        "rawMisMatchPercentage": 14.335403703025868
                    },
                    {
                        "tag": "exampleElementFail",
                        "instanceData": {},
                        "commandName": "checkElement",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "1.34",
                        "rawMisMatchPercentage": 1.335403703025868
                    }
                ]
            }
        ]
    }
]
```

داده‌های گزارش به شما فرصت ساخت گزارش بصری خود را بدون انجام تمام جادو و جمع‌آوری داده‌ها توسط خودتان می‌دهد.

:::info نکته
شما نیاز به استفاده از `@wdio/visual-testing` نسخه `5.2.0` یا بالاتر دارید
:::

### `disableBlinkingCursor`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `false`
-   **پشتیبانی شده:** وب، اپلیکیشن هیبرید (Webview)

فعال/غیرفعال کردن "چشمک زدن" مکان‌نما در تمام `input`، `textarea`، `[contenteditable]` در برنامه. اگر روی `true` تنظیم شود، مکان‌نما قبل از گرفتن اسکرین‌شات به `transparent` تنظیم می‌شود و پس از اتمام بازنشانی می‌شود

### `disableCSSAnimation`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `false`
-   **پشتیبانی شده:** وب، اپلیکیشن هیبرید (Webview)

فعال/غیرفعال کردن تمام انیمیشن‌های CSS در برنامه. اگر روی `true` تنظیم شود، تمام انیمیشن‌ها قبل از گرفتن اسکرین‌شات غیرفعال می‌شوند و پس از اتمام بازنشانی می‌شوند

### `enableLayoutTesting`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `false`
-   **پشتیبانی شده:** وب

این تمام متن‌ها را در صفحه پنهان می‌کند تا فقط طرح‌بندی برای مقایسه استفاده شود. پنهان‌سازی با اضافه کردن سبک `'color': 'transparent !important'` به **هر** عنصر انجام می‌شود.

برای خروجی به [Test Output](/docs/visual-testing/test-output#enablelayouttesting) مراجعه کنید

:::info
با استفاده از این پرچم، هر عنصری که شامل متن است (نه فقط `p, h1, h2, h3, h4, h5, h6, span, a, li`، بلکه همچنین `div|button|..`) این ویژگی را دریافت می‌کند. هیچ گزینه‌ای برای تنظیم این وجود **ندارد**.
:::

### `formatImageName`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **پشتیبانی شده:** وب، اپلیکیشن هیبرید (Webview)، اپلیکیشن بومی

نام تصاویر ذخیره شده می‌تواند با ارسال پارامتر `formatImageName` با یک رشته قالب‌بندی مانند:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

متغیرهای زیر می‌توانند برای قالب‌بندی رشته ارسال شوند و به صورت خودکار از قابلیت‌های نمونه خوانده می‌شوند.
اگر نتوانند تعیین شوند، مقادیر پیش‌فرض استفاده خواهند شد.

-   `browserName`: نام مرورگر در قابلیت‌های ارائه شده
-   `browserVersion`: نسخه مرورگر ارائه شده در قابلیت‌ها
-   `deviceName`: نام دستگاه از قابلیت‌ها
-   `dpr`: نسبت پیکسل دستگاه
-   `height`: ارتفاع صفحه
-   `logName`: logName از قابلیت‌ها
-   `mobile`: این `_app` یا نام مرورگر را پس از `deviceName` اضافه می‌کند تا اسکرین‌شات‌های برنامه را از اسکرین‌شات‌های مرورگر متمایز کند
-   `platformName`: نام پلتفرم در قابلیت‌های ارائه شده
-   `platformVersion`: نسخه پلتفرم ارائه شده در قابلیت‌ها
-   `tag`: برچسبی که در روش‌های فراخوانی شده ارائه می‌شود
-   `width`: عرض صفحه

:::info

شما نمی‌توانید مسیرها/پوشه‌های سفارشی را در `formatImageName` ارائه دهید. اگر می‌خواهید مسیر را تغییر دهید، لطفاً تغییر گزینه‌های زیر را بررسی کنید:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) برای هر روش

:::

### `fullPageScrollTimeout`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** `1500`
-   **پشتیبانی شده:** وب

مهلت به میلی‌ثانیه برای انتظار پس از اسکرول. این ممکن است به شناسایی صفحات با بارگذاری تنبل کمک کند.

:::info

این فقط هنگامی کار می‌کند که گزینه سرویس/روش `userBasedFullPageScreenshot` روی `true` تنظیم شده باشد، همچنین ببینید [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `true`
-   **پشتیبانی شده:** وب، اپلیکیشن هیبرید (Webview)

مخفی کردن نوارهای اسکرول در برنامه. اگر روی true تنظیم شود، تمام نوارهای اسکرول قبل از گرفتن اسکرین‌شات غیرفعال می‌شوند. این به طور پیش‌فرض روی `true` تنظیم شده است تا از مشکلات اضافی جلوگیری شود.

### `logLevel`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** `info`
-   **پشتیبانی شده:** وب، اپلیکیشن هیبرید (Webview)، اپلیکیشن بومی

لاگ‌های اضافی اضافه می‌کند، گزینه‌ها عبارتند از `debug | info | warn | silent`

خطاها همیشه در کنسول ثبت می‌شوند.

### `savePerInstance`

-   **نوع:** `boolean`
-   **پیش‌فرض:** `false`
-   **اجباری:** خیر
-   **پشتیبانی شده:** وب، اپلیکیشن هیبرید (Webview)، اپلیکیشن بومی

ذخیره تصاویر به ازای هر نمونه در یک پوشه جداگانه، بنابراین به عنوان مثال تمام اسکرین‌شات‌های Chrome در یک پوشه Chrome مانند `desktop_chrome` ذخیره می‌شوند.

### `screenshotPath`

-   **نوع:** `string | () => string`
-   **پیش‌فرض:** `.tmp/`
-   **اجباری:** خیر
-   **پشتیبانی شده:** وب، اپلیکیشن هیبرید (Webview)، اپلیکیشن بومی

دایرکتوری که تمام اسکرین‌شات‌های واقعی/متفاوت را نگهداری می‌کند. اگر تنظیم نشود، مقدار پیش‌فرض استفاده خواهد شد. یک تابع که
یک رشته را برمی‌گرداند نیز می‌تواند برای تنظیم مقدار screenshotPath استفاده شود:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// یا
{
    screenshotPath: () => {
        // انجام برخی جادوها در اینجا
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** `6` برای Android و `15` برای iOS (`6` به طور پیش‌فرض و `9` به طور خودکار برای نوار خانه احتمالی در iPhone‌های با بریدگی یا iPad‌هایی که یک نوار خانه دارند اضافه می‌شود)
-   **پشتیبانی شده:** وب

پدینگی که باید به نوار ابزار در iOS و Android اضافه شود تا یک برش درست از viewport انجام شود.

### `userBasedFullPageScreenshot`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `false`
-   **پشتیبانی شده:** وب، اپلیکیشن هیبرید (Webview) **معرفی شده در visual-service@7.0.0**

به طور پیش‌فرض، اسکرین‌شات‌های صفحه کامل در وب دسکتاپ با استفاده از پروتکل WebDriver BiDi گرفته می‌شوند، که اسکرین‌شات‌های سریع، پایدار و سازگار را بدون اسکرول کردن امکان‌پذیر می‌سازد.
وقتی userBasedFullPageScreenshot روی true تنظیم می‌شود، فرآیند اسکرین‌شات یک کاربر واقعی را شبیه‌سازی می‌کند: اسکرول کردن صفحه، گرفتن اسکرین‌شات‌های به اندازه viewport، و اتصال آنها به هم. این روش برای صفحاتی با محتوای با بارگذاری تنبل یا رندر پویا که به موقعیت اسکرول بستگی دارد مفید است.

از این گزینه استفاده کنید اگر صفحه شما به بارگذاری محتوا هنگام اسکرول متکی است یا اگر می‌خواهید رفتار روش‌های اسکرین‌شات قدیمی‌تر را حفظ کنید.

### `waitForFontsLoaded`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `true`
-   **پشتیبانی شده:** وب، اپلیکیشن هیبرید (Webview)

فونت‌ها، از جمله فونت‌های شخص ثالث، می‌توانند به صورت همزمان یا ناهمزمان بارگذاری شوند. بارگذاری ناهمزمان به این معنی است که فونت‌ها ممکن است پس از اینکه WebdriverIO تشخیص دهد یک صفحه کاملاً بارگذاری شده است، بارگذاری شوند. برای جلوگیری از مشکلات رندر فونت، این ماژول، به طور پیش‌فرض، قبل از گرفتن اسکرین‌شات منتظر بارگذاری تمام فونت‌ها می‌ماند.

## گزینه‌های Tabbable

:::info نکته

این ماژول همچنین از ترسیم روشی که یک کاربر از صفحه کلید خود برای _tab_ کردن از طریق وب‌سایت استفاده می‌کند، با ترسیم خطوط و نقاط از عنصر قابل tab به عنصر قابل tab دیگر پشتیبانی می‌کند.<br/>
این کار الهام گرفته از نوشته [Viv Richards](https://github.com/vivrichards600) در مقاله وبلاگ او درباره ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript) است.<br/>
روش انتخاب عناصر قابل tab بر اساس ماژول [tabbable](https://github.com/davidtheclark/tabbable) است. اگر مشکلی در مورد tab کردن وجود دارد، لطفاً [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) و به خصوص بخش [More details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details) را بررسی کنید.

:::

### `tabbableOptions`

-   **نوع:** `object`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای همه مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) را ببینید
-   **پشتیبانی شده:** وب

گزینه‌هایی که می‌توانند برای خطوط و نقاط تغییر داده شوند اگر از روش‌های `{save|check}Tabbable` استفاده می‌کنید. گزینه‌ها در زیر توضیح داده شده‌اند.

#### `tabbableOptions.circle`

-   **نوع:** `object`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای همه مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) را ببینید
-   **پشتیبانی شده:** وب

گزینه‌های تغییر دایره.

##### `tabbableOptions.circle.backgroundColor`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای همه مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) را ببینید
-   **پشتیبانی شده:** وب

رنگ پس‌زمینه دایره.

##### `tabbableOptions.circle.borderColor`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای همه مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) را ببینید
-   **پشتیبانی شده:** وب

رنگ حاشیه دایره.

##### `tabbableOptions.circle.borderWidth`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای همه مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) را ببینید
-   **پشتیبانی شده:** وب

عرض حاشیه دایره.

##### `tabbableOptions.circle.fontColor`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای همه مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) را ببینید
-   **پشتیبانی شده:** وب

رنگ فونت متن در دایره. این فقط زمانی نشان داده می‌شود که [`showNumber`](./#tabbableoptionscircleshownumber) روی `true` تنظیم شده باشد.

##### `tabbableOptions.circle.fontFamily`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای همه مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) را ببینید
-   **پشتیبانی شده:** وب

خانواده فونت متن در دایره. این فقط زمانی نشان داده می‌شود که [`showNumber`](./#tabbableoptionscircleshownumber) روی `true` تنظیم شده باشد.

مطمئن شوید فونت‌هایی را تنظیم کنید که توسط مرورگرها پشتیبانی می‌شوند.

##### `tabbableOptions.circle.fontSize`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای همه مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) را ببینید
-   **پشتیبانی شده:** وب

اندازه فونت متن در دایره. این فقط زمانی نشان داده می‌شود که [`showNumber`](./#tabbableoptionscircleshownumber) روی `true` تنظیم شده باشد.

##### `tabbableOptions.circle.size`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای همه مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) را ببینید
-   **پشتیبانی شده:** وب

اندازه دایره.

##### `tabbableOptions.circle.showNumber`

-   **نوع:** `showNumber`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای همه مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) را ببینید
-   **پشتیبانی شده:** وب

نمایش شماره توالی tab در دایره.

#### `tabbableOptions.line`

-   **نوع:** `object`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای همه مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) را ببینید
-   **پشتیبانی شده:** وب

گزینه‌های تغییر خط.

##### `tabbableOptions.line.color`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای همه مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) را ببینید
-   **پشتیبانی شده:** وب

رنگ خط.

##### `tabbableOptions.line.width`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای همه مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) را ببینید
-   **پشتیبانی شده:** وب

عرض خط.

## گزینه‌های مقایسه

### `compareOptions`

-   **نوع:** `object`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای همه مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) را ببینید
-   **پشتیبانی شده:** وب، اپلیکیشن هیبرید (Webview)، اپلیکیشن بومی (برای اطلاعات بیشتر [گزینه‌های مقایسه روش](./method-options#compare-check-options) را ببینید)

گزینه‌های مقایسه همچنین می‌توانند به عنوان گزینه‌های سرویس تنظیم شوند، آنها در [گزینه‌های مقایسه روش](/docs/visual-testing/method-options#compare-check-options) توضیح داده شده‌اند