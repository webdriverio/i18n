---
id: service-options
title: گزینه‌های سرویس
---

گزینه‌های سرویس، تنظیماتی هستند که هنگام راه‌اندازی سرویس تعیین می‌شوند و برای هر فراخوانی متد مورد استفاده قرار می‌گیرند.

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

فاصله‌ای که باید به نوار آدرس در iOS و Android اضافه شود تا برش مناسبی از صفحه نمایش ایجاد شود.

### `autoElementScroll`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `true`
-   **پشتیبانی شده:** وب، اپلیکیشن هیبریدی (Webview)

این گزینه به شما امکان می‌دهد اسکرول خودکار عنصر به نمایشگاه را هنگام ایجاد اسکرین‌شات از یک عنصر غیرفعال کنید.

### `addIOSBezelCorners`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `false`
-   **پشتیبانی شده:** وب، اپلیکیشن هیبریدی (Webview)، اپلیکیشن بومی

افزودن گوشه‌های قاب و بریدگی/جزیره پویا به اسکرین‌شات برای دستگاه‌های iOS.

:::info نکته
این فقط زمانی امکان‌پذیر است که نام دستگاه **بتواند** به صورت خودکار تشخیص داده شود و با لیست زیر از نام‌های نرمال‌سازی شده دستگاه مطابقت داشته باشد. نرمال‌سازی توسط این ماژول انجام می‌شود.
**آیفون:**

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
    **آیپد:**
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
-   **پشتیبانی شده:** وب، اپلیکیشن هیبریدی (Webview)، اپلیکیشن بومی

اگر در طول مقایسه تصویر پایه یافت نشود، تصویر به صورت خودکار در پوشه پایه کپی می‌شود.

### `baselineFolder`

-   **نوع:** `string|()=> string`
-   **اجباری:** خیر
-   **پیش‌فرض:** `.path/to/testfile/__snapshots__/`
-   **پشتیبانی شده:** وب، اپلیکیشن هیبریدی (Webview)، اپلیکیشن بومی

دایرکتوری که تمام تصاویر پایه مورد استفاده در مقایسه را نگهداری می‌کند. اگر تنظیم نشود، مقدار پیش‌فرض استفاده خواهد شد که فایل‌ها را در پوشه `__snapshots__/` در کنار فایل تست اجرا شده ذخیره می‌کند. یک تابع که یک `string` را برمی‌گرداند نیز می‌تواند برای تنظیم مقدار `baselineFolder` استفاده شود:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// یا
{
    baselineFolder: () => {
        // انجام برخی عملیات جادویی اینجا
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `false`
-   **پشتیبانی شده:** وب، اپلیکیشن هیبریدی (Webview)، اپلیکیشن بومی

حذف پوشه‌های زمان اجرا (`actual` و `diff`) در هنگام راه‌اندازی

:::info نکته
این فقط زمانی کار می‌کند که [`screenshotPath`](#screenshotpath) از طریق گزینه‌های افزونه تنظیم شده باشد، و **کار نخواهد کرد** اگر پوشه‌ها را در متدها تنظیم کنید
:::

### `createJsonReportFiles` **(جدید)**

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `false`

اکنون می‌توانید نتایج مقایسه را به یک فایل گزارش JSON صادر کنید. با ارائه گزینه `createJsonReportFiles: true`، برای هر تصویر که مقایسه می‌شود، یک گزارش در پوشه `actual` در کنار هر نتیجه تصویر `actual` ذخیره می‌شود. خروجی به این شکل خواهد بود:

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

وقتی تمام تست‌ها اجرا شوند، یک فایل JSON جدید با مجموعه مقایسه‌ها ایجاد می‌شود و می‌توان آن را در ریشه پوشه `actual` یافت. داده‌ها به این صورت گروه‌بندی می‌شوند:

-   `describe` برای Jasmine/Mocha یا `Feature` برای CucumberJS
-   `it` برای Jasmine/Mocha یا `Scenario` برای CucumberJS
    و سپس به ترتیب زیر مرتب می‌شوند:
-   `commandName`، که نام‌های متد مقایسه مورد استفاده برای مقایسه تصاویر هستند
-   `instanceData`، ابتدا مرورگر، سپس دستگاه، سپس پلتفرم
    به شکل زیر خواهد بود

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

داده‌های گزارش به شما این امکان را می‌دهد که گزارش بصری خود را بدون نیاز به انجام تمام عملیات جادویی و جمع‌آوری داده‌ها بسازید.

:::info نکته
شما نیاز به استفاده از نسخه `5.2.0` یا بالاتر از `@wdio/visual-testing` دارید
:::

### `disableBlinkingCursor`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `false`
-   **پشتیبانی شده:** وب، اپلیکیشن هیبریدی (Webview)

فعال/غیرفعال کردن "چشمک زدن" نشانگر در تمام عناصر `input`، `textarea`، `[contenteditable]` در برنامه. اگر به `true` تنظیم شود، نشانگر قبل از گرفتن اسکرین‌شات به `transparent` تنظیم می‌شود و پس از اتمام بازنشانی می‌شود

### `disableCSSAnimation`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `false`
-   **پشتیبانی شده:** وب، اپلیکیشن هیبریدی (Webview)

فعال/غیرفعال کردن تمام انیمیشن‌های CSS در برنامه. اگر به `true` تنظیم شود، تمام انیمیشن‌ها قبل از گرفتن اسکرین‌شات غیرفعال می‌شوند و پس از اتمام بازنشانی می‌شوند

### `enableLayoutTesting`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `false`
-   **پشتیبانی شده:** وب

این گزینه تمام متن‌های صفحه را مخفی می‌کند تا فقط طرح‌بندی برای مقایسه استفاده شود. مخفی‌سازی با افزودن استایل `'color': 'transparent !important'` به **هر** عنصر انجام می‌شود.

برای مشاهده خروجی به [خروجی تست](/docs/visual-testing/test-output#enablelayouttesting) مراجعه کنید

:::info
با استفاده از این پرچم، هر عنصری که شامل متن است (نه فقط `p, h1, h2, h3, h4, h5, h6, span, a, li`، بلکه همچنین `div|button|..`) این ویژگی را دریافت می‌کند. گزینه‌ای برای سفارشی‌سازی این رفتار وجود **ندارد**.
:::

### `formatImageName`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **پشتیبانی شده:** وب، اپلیکیشن هیبریدی (Webview)، اپلیکیشن بومی

نام تصاویر ذخیره شده را می‌توان با ارسال پارامتر `formatImageName` با یک رشته فرمت مانند زیر سفارشی کرد:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

متغیرهای زیر می‌توانند برای فرمت دادن به رشته ارسال شوند و به طور خودکار از قابلیت‌های نمونه خوانده می‌شوند.
اگر نتوانند تعیین شوند، مقادیر پیش‌فرض استفاده خواهند شد.

-   `browserName`: نام مرورگر در قابلیت‌های ارائه شده
-   `browserVersion`: نسخه مرورگر ارائه شده در قابلیت‌ها
-   `deviceName`: نام دستگاه از قابلیت‌ها
-   `dpr`: نسبت پیکسل دستگاه
-   `height`: ارتفاع صفحه نمایش
-   `logName`: نام لاگ از قابلیت‌ها
-   `mobile`: این `_app` یا نام مرورگر را پس از `deviceName` اضافه می‌کند تا اسکرین‌شات‌های برنامه را از اسکرین‌شات‌های مرورگر متمایز کند
-   `platformName`: نام پلتفرم در قابلیت‌های ارائه شده
-   `platformVersion`: نسخه پلتفرم ارائه شده در قابلیت‌ها
-   `tag`: برچسبی که در متدهای فراخوانی شده ارائه می‌شود
-   `width`: عرض صفحه نمایش

:::info

شما نمی‌توانید مسیرها/پوشه‌های سفارشی را در `formatImageName` ارائه دهید. اگر می‌خواهید مسیر را تغییر دهید، لطفاً گزینه‌های زیر را بررسی کنید:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) برای هر متد

:::

### `fullPageScrollTimeout`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** `1500`
-   **پشتیبانی شده:** وب

مهلت زمانی به میلی‌ثانیه برای انتظار پس از اسکرول. این ممکن است به شناسایی صفحاتی با بارگذاری تنبل کمک کند.

:::info

این فقط زمانی کار می‌کند که گزینه سرویس/متد `userBasedFullPageScreenshot` به `true` تنظیم شده باشد، همچنین نگاه کنید به [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `true`
-   **پشتیبانی شده:** وب، اپلیکیشن هیبریدی (Webview)

مخفی کردن نوارهای اسکرول در برنامه. اگر به true تنظیم شود، تمام نوارهای اسکرول قبل از گرفتن اسکرین‌شات غیرفعال می‌شوند. این به صورت پیش‌فرض `true` تنظیم شده است تا از مشکلات اضافی جلوگیری شود.

### `logLevel`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** `info`
-   **پشتیبانی شده:** وب، اپلیکیشن هیبریدی (Webview)، اپلیکیشن بومی

لاگ‌های اضافی را اضافه می‌کند، گزینه‌ها عبارتند از `debug | info | warn | silent`

خطاها همیشه در کنسول ثبت می‌شوند.

### `savePerInstance`

-   **نوع:** `boolean`
-   **پیش‌فرض:** `false`
-   **اجباری:** خیر
-   **پشتیبانی شده:** وب، اپلیکیشن هیبریدی (Webview)، اپلیکیشن بومی

ذخیره تصاویر برای هر نمونه در پوشه جداگانه، به عنوان مثال تمام اسکرین‌شات‌های Chrome در یک پوشه Chrome مانند `desktop_chrome` ذخیره می‌شوند.

### `screenshotPath`

-   **نوع:** `string | () => string`
-   **پیش‌فرض:** `.tmp/`
-   **اجباری:** خیر
-   **پشتیبانی شده:** وب، اپلیکیشن هیبریدی (Webview)، اپلیکیشن بومی

دایرکتوری که تمام اسکرین‌شات‌های واقعی/متفاوت را نگهداری می‌کند. اگر تنظیم نشود، مقدار پیش‌فرض استفاده خواهد شد. تابعی که
یک رشته را برمی‌گرداند نیز می‌تواند برای تنظیم مقدار screenshotPath استفاده شود:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// یا
{
    screenshotPath: () => {
        // انجام برخی عملیات جادویی اینجا
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** `6` برای Android و `15` برای iOS (`6` به صورت پیش‌فرض و `9` به صورت خودکار برای نوار خانه احتمالی در آیفون‌های دارای بریدگی یا آیپدهایی که نوار خانه دارند اضافه می‌شود)
-   **پشتیبانی شده:** وب

فاصله‌ای که باید به نوار ابزار در iOS و Android اضافه شود تا برش مناسبی از صفحه نمایش ایجاد شود.

### `userBasedFullPageScreenshot`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `false`
-   **پشتیبانی شده:** وب، اپلیکیشن هیبریدی (Webview) **معرفی شده در visual-service@7.0.0**

به طور پیش‌فرض، اسکرین‌شات‌های تمام صفحه در وب دسکتاپ با استفاده از پروتکل WebDriver BiDi گرفته می‌شوند که اسکرین‌شات‌های سریع، پایدار و یکنواخت را بدون اسکرول امکان‌پذیر می‌سازد.
وقتی userBasedFullPageScreenshot به true تنظیم شود، فرآیند اسکرین‌شات یک کاربر واقعی را شبیه‌سازی می‌کند: اسکرول کردن صفحه، گرفتن اسکرین‌شات‌های به اندازه ویوپورت و متصل کردن آنها به یکدیگر. این روش برای صفحاتی با محتوای با بارگذاری تنبل یا رندرینگ پویا که به موقعیت اسکرول بستگی دارد مفید است.

از این گزینه استفاده کنید اگر صفحه شما به بارگذاری محتوا هنگام اسکرول متکی است یا اگر می‌خواهید رفتار روش‌های قدیمی‌تر اسکرین‌شات را حفظ کنید.

### `waitForFontsLoaded`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `true`
-   **پشتیبانی شده:** وب، اپلیکیشن هیبریدی (Webview)

فونت‌ها، از جمله فونت‌های شخص ثالث، می‌توانند به صورت همزمان یا ناهمزمان بارگذاری شوند. بارگذاری ناهمزمان بدین معناست که فونت‌ها ممکن است پس از اینکه WebdriverIO تشخیص دهد یک صفحه کاملاً بارگذاری شده است، بارگذاری شوند. برای جلوگیری از مشکلات رندرینگ فونت، این ماژول به طور پیش‌فرض قبل از گرفتن اسکرین‌شات منتظر بارگذاری تمام فونت‌ها می‌ماند.

## گزینه‌های Tabbable

:::info نکته

این ماژول همچنین از ترسیم مسیری که یک کاربر با استفاده از کلید Tab صفحه کلید از طریق وب‌سایت حرکت می‌کند، با ترسیم خطوط و نقاط از عنصر قابل انتخاب با Tab به عنصر بعدی پشتیبانی می‌کند.<br/>
این کار از پست وبلاگ [Viv Richards](https://github.com/vivrichards600) با عنوان ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript) الهام گرفته شده است.<br/>
روش انتخاب عناصر قابل انتخاب با Tab بر اساس ماژول [tabbable](https://github.com/davidtheclark/tabbable) است. اگر مشکلی در مورد Tab زدن وجود دارد، لطفاً [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) و به ویژه بخش [جزئیات بیشتر](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details) را بررسی کنید.

:::

### `tabbableOptions`

-   **نوع:** `object`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **پشتیبانی شده:** وب

گزینه‌هایی که می‌توانند برای خطوط و نقاط تغییر داده شوند اگر از متدهای `{save|check}Tabbable` استفاده می‌کنید. گزینه‌ها در زیر توضیح داده شده‌اند.

#### `tabbableOptions.circle`

-   **نوع:** `object`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **پشتیبانی شده:** وب

گزینه‌های تغییر دایره.

##### `tabbableOptions.circle.backgroundColor`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **پشتیبانی شده:** وب

رنگ پس‌زمینه دایره.

##### `tabbableOptions.circle.borderColor`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **پشتیبانی شده:** وب

رنگ مرز دایره.

##### `tabbableOptions.circle.borderWidth`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **پشتیبانی شده:** وب

عرض مرز دایره.

##### `tabbableOptions.circle.fontColor`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **پشتیبانی شده:** وب

رنگ فونت متن در دایره. این فقط زمانی نمایش داده می‌شود که [`showNumber`](./#tabbableoptionscircleshownumber) به `true` تنظیم شده باشد.

##### `tabbableOptions.circle.fontFamily`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **پشتیبانی شده:** وب

خانواده فونت متن در دایره. این فقط زمانی نمایش داده می‌شود که [`showNumber`](./#tabbableoptionscircleshownumber) به `true` تنظیم شده باشد.

مطمئن شوید فونت‌هایی را تنظیم کنید که توسط مرورگرها پشتیبانی می‌شوند.

##### `tabbableOptions.circle.fontSize`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **پشتیبانی شده:** وب

اندازه فونت متن در دایره. این فقط زمانی نمایش داده می‌شود که [`showNumber`](./#tabbableoptionscircleshownumber) به `true` تنظیم شده باشد.

##### `tabbableOptions.circle.size`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **پشتیبانی شده:** وب

اندازه دایره.

##### `tabbableOptions.circle.showNumber`

-   **نوع:** `showNumber`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **پشتیبانی شده:** وب

نمایش شماره ترتیب Tab در دایره.

#### `tabbableOptions.line`

-   **نوع:** `object`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **پشتیبانی شده:** وب

گزینه‌های تغییر خط.

##### `tabbableOptions.line.color`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **پشتیبانی شده:** وب

رنگ خط.

##### `tabbableOptions.line.width`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **پشتیبانی شده:** وب

عرض خط.

## گزینه‌های مقایسه

### `compareOptions`

-   **نوع:** `object`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) را ببینید
-   **پشتیبانی شده:** وب، اپلیکیشن هیبریدی (Webview)، اپلیکیشن بومی (برای اطلاعات بیشتر به [گزینه‌های مقایسه متد](./method-options#compare-check-options) مراجعه کنید)

گزینه‌های مقایسه همچنین می‌توانند به عنوان گزینه‌های سرویس تنظیم شوند، آنها در [گزینه‌های مقایسه متد](/docs/visual-testing/method-options#compare-check-options) توضیح داده شده‌اند