---
id: service-options
title: گزینه‌های سرویس
---

گزینه‌های سرویس همان گزینه‌هایی هستند که هنگام راه‌اندازی سرویس می‌توانند تنظیم شوند و برای هر فراخوانی متد استفاده می‌شوند.

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
-   **بافت‌های برنامه پشتیبانی شده:** وب

پدینگی که باید به نوار آدرس در iOS و اندروید اضافه شود تا برش مناسبی از صفحه نمایش انجام شود.

### `autoElementScroll`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `true`
-   **بافت‌های برنامه پشتیبانی شده:** وب، اپلیکیشن هیبریدی (وبویو)

این گزینه به شما اجازه می‌دهد تا اسکرول خودکار عنصر به نمای قابل رویت را هنگام ایجاد اسکرین‌شات از عنصر غیرفعال کنید.

### `addIOSBezelCorners`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `false`
-   **بافت‌های برنامه پشتیبانی شده:** وب، اپلیکیشن هیبریدی (وبویو)، اپلیکیشن بومی

اضافه کردن گوشه‌های بزل و ناچ/دینامیک آیلند به اسکرین‌شات برای دستگاه‌های iOS.

:::info نکته
این فقط زمانی امکان‌پذیر است که نام دستگاه **می‌تواند** به طور خودکار تعیین شود و با لیست زیر از نام‌های نرمال‌شده دستگاه مطابقت داشته باشد. نرمال‌سازی توسط این ماژول انجام خواهد شد.
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
-   **بافت‌های برنامه پشتیبانی شده:** وب، اپلیکیشن هیبریدی (وبویو)، اپلیکیشن بومی

اگر در طول مقایسه هیچ تصویر پایه‌ای یافت نشود، تصویر به طور خودکار به پوشه پایه کپی می‌شود.

### `alwaysSaveActualImage`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `true`
-   **بافت‌های برنامه پشتیبانی شده:** همه

هنگام تنظیم این گزینه به `false`:

- تصویر واقعی را زمانی که تفاوتی **وجود ندارد** ذخیره نمی‌کند
- فایل گزارش JSON را هنگامی که `createJsonReportFiles` روی `true` تنظیم شده است، ذخیره نمی‌کند. همچنین هشداری در لاگ‌ها نشان می‌دهد که `createJsonReportFiles` غیرفعال است

این باید عملکرد بهتری ایجاد کند زیرا فایلی در سیستم نوشته نمی‌شود و باید اطمینان حاصل شود که نویز زیادی در پوشه `actual` وجود ندارد.

### `baselineFolder`

-   **نوع:** `string|()=> string`
-   **اجباری:** خیر
-   **پیش‌فرض:** `.path/to/testfile/__snapshots__/`
-   **بافت‌های برنامه پشتیبانی شده:** وب، اپلیکیشن هیبریدی (وبویو)، اپلیکیشن بومی

دایرکتوری که تمام تصاویر پایه مورد استفاده در مقایسه را نگه می‌دارد. اگر تنظیم نشود، مقدار پیش‌فرض استفاده می‌شود که فایل‌ها را در پوشه `__snapshots__/` کنار تست‌هایی که آزمون‌های بصری را اجرا می‌کنند، ذخیره می‌کند. تابعی که یک `string` برمی‌گرداند نیز می‌تواند برای تنظیم مقدار `baselineFolder` استفاده شود:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// یا
{
    baselineFolder: () => {
        // انجام بعضی از عملیات جادویی اینجا
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `false`
-   **بافت‌های برنامه پشتیبانی شده:** وب، اپلیکیشن هیبریدی (وبویو)، اپلیکیشن بومی

حذف پوشه زمان اجرا (`actual` و `diff`) در هنگام راه‌اندازی

:::info نکته
این فقط زمانی کار می‌کند که [`screenshotPath`](#screenshotpath) از طریق گزینه‌های پلاگین تنظیم شده باشد و **کار نخواهد کرد** وقتی پوشه‌ها را در متدها تنظیم می‌کنید
:::

### `createJsonReportFiles` **(جدید)**

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `false`

اکنون می‌توانید نتایج مقایسه را به یک فایل گزارش JSON صادر کنید. با ارائه گزینه `createJsonReportFiles: true`، برای هر تصویر که مقایسه می‌شود، یک گزارش در پوشه `actual`، کنار هر نتیجه تصویر `actual` ذخیره می‌شود. خروجی به این شکل خواهد بود:

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

پس از اجرای تمام آزمون‌ها، یک فایل JSON جدید با مجموعه مقایسه‌ها ایجاد می‌شود و می‌توان آن را در ریشه پوشه `actual` یافت. داده‌ها بر اساس موارد زیر گروه‌بندی می‌شوند:

-   `describe` برای Jasmine/Mocha یا `Feature` برای CucumberJS
-   `it` برای Jasmine/Mocha یا `Scenario` برای CucumberJS
    و سپس مرتب‌سازی بر اساس:
-   `commandName`، که نام‌های متد مقایسه استفاده شده برای مقایسه تصاویر هستند
-   `instanceData`، ابتدا مرورگر، سپس دستگاه، سپس پلتفرم
    به این شکل خواهد بود:

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

داده‌های گزارش این فرصت را به شما می‌دهد تا گزارش بصری خود را بدون انجام تمام جادو و جمع‌آوری داده‌ها به صورت دستی، ایجاد کنید.

:::info نکته
شما باید از نسخه `5.2.0` یا بالاتر `@wdio/visual-testing` استفاده کنید
:::

### `disableBlinkingCursor`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `false`
-   **بافت‌های برنامه پشتیبانی شده:** وب، اپلیکیشن هیبریدی (وبویو)

فعال/غیرفعال کردن چشمک زدن نشانگر در تمام عناصر `input`، `textarea`، `[contenteditable]` در برنامه. اگر روی `true` تنظیم شود، نشانگر قبل از گرفتن اسکرین‌شات به `transparent` تنظیم می‌شود و پس از اتمام کار بازنشانی می‌شود.

### `disableCSSAnimation`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `false`
-   **بافت‌های برنامه پشتیبانی شده:** وب، اپلیکیشن هیبریدی (وبویو)

فعال/غیرفعال کردن تمام انیمیشن‌های CSS در برنامه. اگر روی `true` تنظیم شود، تمام انیمیشن‌ها قبل از گرفتن اسکرین‌شات غیرفعال می‌شوند و پس از اتمام کار بازنشانی می‌شوند.

### `enableLayoutTesting`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `false`
-   **بافت‌های برنامه پشتیبانی شده:** وب

این گزینه تمام متن‌ها را در صفحه پنهان می‌کند تا فقط طرح‌بندی برای مقایسه استفاده شود. پنهان‌سازی با افزودن استایل `'color': 'transparent !important'` به **هر** عنصر انجام می‌شود.

برای مشاهده خروجی به [خروجی تست](/docs/visual-testing/test-output#enablelayouttesting) مراجعه کنید.

:::info
با استفاده از این پرچم، هر عنصری که حاوی متن است (نه فقط `p, h1, h2, h3, h4, h5, h6, span, a, li`، بلکه همچنین `div|button|..`) این ویژگی را دریافت می‌کند. هیچ گزینه‌ای برای سفارشی‌سازی این ویژگی وجود **ندارد**.
:::

### `formatImageName`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **بافت‌های برنامه پشتیبانی شده:** وب، اپلیکیشن هیبریدی (وبویو)، اپلیکیشن بومی

نام تصاویر ذخیره شده را می‌توان با ارسال پارامتر `formatImageName` با یک رشته قالب مانند زیر سفارشی کرد:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

متغیرهای زیر را می‌توان برای قالب‌بندی رشته ارسال کرد و به طور خودکار از قابلیت‌های نمونه خوانده می‌شوند.
اگر نتوانند تعیین شوند، مقادیر پیش‌فرض استفاده می‌شوند.

-   `browserName`: نام مرورگر در قابلیت‌های ارائه شده
-   `browserVersion`: نسخه مرورگر ارائه شده در قابلیت‌ها
-   `deviceName`: نام دستگاه از قابلیت‌ها
-   `dpr`: نسبت پیکسل دستگاه
-   `height`: ارتفاع صفحه نمایش
-   `logName`: نام لاگ از قابلیت‌ها
-   `mobile`: این `_app` یا نام مرورگر را پس از `deviceName` اضافه می‌کند تا اسکرین‌شات‌های برنامه از اسکرین‌شات‌های مرورگر متمایز شوند
-   `platformName`: نام پلتفرم در قابلیت‌های ارائه شده
-   `platformVersion`: نسخه پلتفرم ارائه شده در قابلیت‌ها
-   `tag`: برچسبی که در متدهای فراخوانی شده ارائه می‌شود
-   `width`: عرض صفحه نمایش

:::info

شما نمی‌توانید مسیرها/پوشه‌های سفارشی را در `formatImageName` ارائه دهید. اگر می‌خواهید مسیر را تغییر دهید، لطفا بررسی کنید که گزینه‌های زیر را تغییر دهید:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) برای هر متد

:::

### `fullPageScrollTimeout`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** `1500`
-   **بافت‌های برنامه پشتیبانی شده:** وب

مهلت زمانی به میلی‌ثانیه برای انتظار پس از اسکرول. این می‌تواند به شناسایی صفحات با بارگذاری تنبل کمک کند.

:::info

این فقط زمانی کار می‌کند که گزینه سرویس/متد `userBasedFullPageScreenshot` روی `true` تنظیم شده باشد، همچنین به [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot) مراجعه کنید.

:::

### `hideScrollBars`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `true`
-   **بافت‌های برنامه پشتیبانی شده:** وب، اپلیکیشن هیبریدی (وبویو)

پنهان کردن نوارهای اسکرول در برنامه. اگر روی true تنظیم شود، تمام نوارهای اسکرول قبل از گرفتن اسکرین‌شات غیرفعال می‌شوند. این به صورت پیش‌فرض `true` است تا از مشکلات اضافی جلوگیری شود.

### `logLevel`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** `info`
-   **بافت‌های برنامه پشتیبانی شده:** وب، اپلیکیشن هیبریدی (وبویو)، اپلیکیشن بومی

لاگ‌های اضافی اضافه می‌کند، گزینه‌ها عبارتند از `debug | info | warn | silent`

خطاها همیشه در کنسول ثبت می‌شوند.

### `savePerInstance`

-   **نوع:** `boolean`
-   **پیش‌فرض:** `false`
-   **اجباری:** خیر
-   **بافت‌های برنامه پشتیبانی شده:** وب، اپلیکیشن هیبریدی (وبویو)، اپلیکیشن بومی

ذخیره تصاویر به ازای هر نمونه در یک پوشه جداگانه، به عنوان مثال تمام اسکرین‌شات‌های Chrome در یک پوشه Chrome مانند `desktop_chrome` ذخیره می‌شوند.

### `screenshotPath`

-   **نوع:** `string | () => string`
-   **پیش‌فرض:** `.tmp/`
-   **اجباری:** خیر
-   **بافت‌های برنامه پشتیبانی شده:** وب، اپلیکیشن هیبریدی (وبویو)، اپلیکیشن بومی

دایرکتوری که تمام اسکرین‌شات‌های واقعی/متفاوت را نگه می‌دارد. اگر تنظیم نشود، مقدار پیش‌فرض استفاده می‌شود. تابعی که یک رشته برمی‌گرداند نیز می‌تواند برای تنظیم مقدار screenshotPath استفاده شود:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// یا
{
    screenshotPath: () => {
        // انجام بعضی از عملیات جادویی اینجا
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** `6` برای اندروید و `15` برای iOS (`6` به طور پیش‌فرض و `9` به طور خودکار برای نوار خانه احتمالی در آیفون‌های دارای ناچ یا آیپدهایی که دارای نوار خانه هستند اضافه می‌شود)
-   **بافت‌های برنامه پشتیبانی شده:** وب

پدینگی که باید به نوار ابزار در iOS و اندروید اضافه شود تا برش مناسبی از صفحه نمایش انجام شود.

### `userBasedFullPageScreenshot`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `false`
-   **بافت‌های برنامه پشتیبانی شده:** وب، اپلیکیشن هیبریدی (وبویو) **معرفی شده در visual-service@7.0.0**

به طور پیش‌فرض، اسکرین‌شات‌های تمام صفحه در وب دسکتاپ با استفاده از پروتکل WebDriver BiDi گرفته می‌شوند که امکان اسکرین‌شات‌های سریع، پایدار و سازگار بدون اسکرول را فراهم می‌کند.
وقتی userBasedFullPageScreenshot روی true تنظیم شود، فرآیند اسکرین‌شات یک کاربر واقعی را شبیه‌سازی می‌کند: اسکرول در صفحه، گرفتن اسکرین‌شات‌های به اندازه صفحه نمایش و ترکیب آن‌ها با هم. این روش برای صفحاتی با محتوای بارگذاری تنبل یا رندر پویا که به موقعیت اسکرول بستگی دارد، مفید است.

از این گزینه استفاده کنید اگر صفحه شما به بارگذاری محتوا هنگام اسکرول متکی است یا اگر می‌خواهید رفتار روش‌های قدیمی‌تر اسکرین‌شات را حفظ کنید.

### `waitForFontsLoaded`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **پیش‌فرض:** `true`
-   **بافت‌های برنامه پشتیبانی شده:** وب، اپلیکیشن هیبریدی (وبویو)

فونت‌ها، از جمله فونت‌های شخص ثالث، می‌توانند به صورت همزمان یا ناهمزمان بارگذاری شوند. بارگذاری ناهمزمان به این معنی است که فونت‌ها ممکن است پس از اینکه WebdriverIO تعیین کند که یک صفحه کاملاً بارگذاری شده است، بارگذاری شوند. برای جلوگیری از مشکلات رندر فونت، این ماژول به طور پیش‌فرض، قبل از گرفتن اسکرین‌شات، منتظر بارگذاری تمام فونت‌ها می‌ماند.

## گزینه‌های Tabbable

:::info نکته

این ماژول همچنین از ترسیم نحوه استفاده کاربر از صفحه کلید برای _tab_ زدن در وب‌سایت پشتیبانی می‌کند، با ترسیم خطوط و نقاط از عنصر tabbable به عنصر tabbable دیگر.<br/>
این کار الهام گرفته از پست وبلاگ [Viv Richards](https://github.com/vivrichards600) با عنوان ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript) است.<br/>
نحوه انتخاب عناصر tabbable بر اساس ماژول [tabbable](https://github.com/davidtheclark/tabbable) است. اگر مشکلی در مورد tab زدن وجود دارد، لطفا [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) و به ویژه بخش [جزئیات بیشتر](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details) را بررسی کنید.

:::

### `tabbableOptions`

-   **نوع:** `object`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **بافت‌های برنامه پشتیبانی شده:** وب

گزینه‌هایی که می‌توان برای خطوط و نقاط تغییر داد اگر از متدهای `{save|check}Tabbable` استفاده می‌کنید. گزینه‌ها در زیر توضیح داده شده‌اند.

#### `tabbableOptions.circle`

-   **نوع:** `object`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **بافت‌های برنامه پشتیبانی شده:** وب

گزینه‌های تغییر دایره.

##### `tabbableOptions.circle.backgroundColor`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **بافت‌های برنامه پشتیبانی شده:** وب

رنگ پس‌زمینه دایره.

##### `tabbableOptions.circle.borderColor`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **بافت‌های برنامه پشتیبانی شده:** وب

رنگ حاشیه دایره.

##### `tabbableOptions.circle.borderWidth`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **بافت‌های برنامه پشتیبانی شده:** وب

عرض حاشیه دایره.

##### `tabbableOptions.circle.fontColor`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **بافت‌های برنامه پشتیبانی شده:** وب

رنگ فونت متن در دایره. این فقط نشان داده می‌شود اگر [`showNumber`](./#tabbableoptionscircleshownumber) روی `true` تنظیم شده باشد.

##### `tabbableOptions.circle.fontFamily`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **بافت‌های برنامه پشتیبانی شده:** وب

خانواده فونت متن در دایره. این فقط نشان داده می‌شود اگر [`showNumber`](./#tabbableoptionscircleshownumber) روی `true` تنظیم شده باشد.

مطمئن شوید که فونت‌هایی تنظیم می‌کنید که توسط مرورگرها پشتیبانی می‌شوند.

##### `tabbableOptions.circle.fontSize`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **بافت‌های برنامه پشتیبانی شده:** وب

اندازه فونت متن در دایره. این فقط نشان داده می‌شود اگر [`showNumber`](./#tabbableoptionscircleshownumber) روی `true` تنظیم شده باشد.

##### `tabbableOptions.circle.size`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **بافت‌های برنامه پشتیبانی شده:** وب

اندازه دایره.

##### `tabbableOptions.circle.showNumber`

-   **نوع:** `showNumber`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **بافت‌های برنامه پشتیبانی شده:** وب

نمایش شماره توالی tab در دایره.

#### `tabbableOptions.line`

-   **نوع:** `object`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **بافت‌های برنامه پشتیبانی شده:** وب

گزینه‌های تغییر خط.

##### `tabbableOptions.line.color`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **بافت‌های برنامه پشتیبانی شده:** وب

رنگ خط.

##### `tabbableOptions.line.width`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **بافت‌های برنامه پشتیبانی شده:** وب

عرض خط.

## گزینه‌های مقایسه

### `compareOptions`

-   **نوع:** `object`
-   **اجباری:** خیر
-   **پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) را ببینید
-   **بافت‌های برنامه پشتیبانی شده:** وب، اپلیکیشن هیبریدی (وبویو)، اپلیکیشن بومی (برای اطلاعات بیشتر به [گزینه‌های مقایسه متد](./method-options#compare-check-options) مراجعه کنید)

گزینه‌های مقایسه همچنین می‌توانند به عنوان گزینه‌های سرویس تنظیم شوند، آن‌ها در [گزینه‌های مقایسه متد](/docs/visual-testing/method-options#compare-check-options) توضیح داده شده‌اند.