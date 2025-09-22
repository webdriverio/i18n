---
id: service-options
title: گزینه‌های سرویس
---

گزینه‌های سرویس همان گزینه‌هایی هستند که هنگام ایجاد نمونه سرویس می‌توان تنظیم کرد و برای هر فراخوانی متد استفاده می‌شوند.

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
-   **مقدار پیش‌فرض:** `6`
-   **بسترهای کاربردی پشتیبانی‌شده:** وب

این پدینگ باید به نوار آدرس در iOS و Android اضافه شود تا برش مناسبی از نمای صفحه انجام شود.

### `autoElementScroll`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **مقدار پیش‌فرض:** `true`
-   **بسترهای کاربردی پشتیبانی‌شده:** وب، اپلیکیشن هیبرید (وب‌ویو)

این گزینه به شما امکان می‌دهد اسکرول خودکار عنصر به محدوده قابل مشاهده را هنگام ایجاد اسکرین‌شات از عنصر غیرفعال کنید.

### `addIOSBezelCorners`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **مقدار پیش‌فرض:** `false`
-   **بسترهای کاربردی پشتیبانی‌شده:** وب، اپلیکیشن هیبرید (وب‌ویو)، اپلیکیشن بومی

اضافه کردن گوشه‌های قاب و ناچ/دینامیک آیلند به اسکرین‌شات برای دستگاه‌های iOS.

:::info نکته
این عملیات فقط زمانی امکان‌پذیر است که نام دستگاه **بتواند** به صورت خودکار تشخیص داده شود و با لیست زیر از نام‌های نرمال‌سازی‌شده دستگاه‌ها مطابقت داشته باشد. نرمال‌سازی توسط این ماژول انجام می‌شود.
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
-   **مقدار پیش‌فرض:** `true`
-   **بسترهای کاربردی پشتیبانی‌شده:** وب، اپلیکیشن هیبرید (وب‌ویو)، اپلیکیشن بومی

اگر در طول مقایسه هیچ تصویر پایه‌ای پیدا نشود، تصویر به صورت خودکار در پوشه پایه کپی می‌شود.

### `baselineFolder`

-   **نوع:** `string|()=> string`
-   **اجباری:** خیر
-   **مقدار پیش‌فرض:** `.path/to/testfile/__snapshots__/`
-   **بسترهای کاربردی پشتیبانی‌شده:** وب، اپلیکیشن هیبرید (وب‌ویو)، اپلیکیشن بومی

دایرکتوری که تمام تصاویر پایه‌ای که در طول مقایسه استفاده می‌شوند را نگهداری می‌کند. اگر تنظیم نشود، مقدار پیش‌فرض استفاده می‌شود که فایل‌ها را در پوشه‌ی `__snapshots__/` در کنار اسپک‌هایی که تست‌های بصری را اجرا می‌کنند ذخیره می‌کند. تابعی که یک `string` برمی‌گرداند نیز می‌تواند برای تنظیم مقدار `baselineFolder` استفاده شود:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// OR
{
    baselineFolder: () => {
        // Do some magic here
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **مقدار پیش‌فرض:** `false`
-   **بسترهای کاربردی پشتیبانی‌شده:** وب، اپلیکیشن هیبرید (وب‌ویو)، اپلیکیشن بومی

حذف پوشه زمان اجرا (`actual` و `diff`) در زمان راه‌اندازی

:::info نکته
این فقط زمانی کار می‌کند که [`screenshotPath`](#screenshotpath) از طریق گزینه‌های افزونه تنظیم شده باشد، و **کار نخواهد کرد** زمانی که پوشه‌ها را در متدها تنظیم کنید
:::

### `createJsonReportFiles` **(جدید)**

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **مقدار پیش‌فرض:** `false`

اکنون می‌توانید نتایج مقایسه را به یک فایل گزارش JSON صادر کنید. با ارائه گزینه `createJsonReportFiles: true`، برای هر تصویری که مقایسه می‌شود یک گزارش در پوشه `actual` در کنار هر نتیجه تصویر `actual` ذخیره می‌شود. خروجی به این شکل خواهد بود:

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

پس از اجرای تمام تست‌ها، یک فایل JSON جدید با مجموعه‌ای از مقایسه‌ها ایجاد می‌شود و در ریشه پوشه `actual` شما قرار می‌گیرد. داده‌ها بر اساس موارد زیر گروه‌بندی می‌شوند:

-   `describe` برای Jasmine/Mocha یا `Feature` برای CucumberJS
-   `it` برای Jasmine/Mocha یا `Scenario` برای CucumberJS
    و سپس بر اساس موارد زیر مرتب‌سازی می‌شوند:
-   `commandName`، که نام‌های متد مقایسه‌ای هستند که برای مقایسه تصاویر استفاده می‌شوند
-   `instanceData`، اول مرورگر، سپس دستگاه و بعد پلتفرم
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

داده‌های گزارش به شما این امکان را می‌دهد تا بدون انجام تمام جادو و جمع‌آوری داده‌ها به تنهایی، گزارش بصری خود را بسازید.

:::info نکته
شما باید از نسخه `5.2.0` یا بالاتر `@wdio/visual-testing` استفاده کنید
:::

### `disableBlinkingCursor`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **مقدار پیش‌فرض:** `false`
-   **بسترهای کاربردی پشتیبانی‌شده:** وب، اپلیکیشن هیبرید (وب‌ویو)

فعال/غیرفعال کردن "چشمک زدن" نشانگر همه `input`، `textarea`، `[contenteditable]` در برنامه. اگر `true` تنظیم شود، نشانگر قبل از گرفتن اسکرین‌شات به `transparent` تنظیم می‌شود و پس از اتمام، تنظیمات بازنشانی می‌شوند.

### `disableCSSAnimation`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **مقدار پیش‌فرض:** `false`
-   **بسترهای کاربردی پشتیبانی‌شده:** وب، اپلیکیشن هیبرید (وب‌ویو)

فعال/غیرفعال کردن تمام انیمیشن‌های CSS در برنامه. اگر `true` تنظیم شود، همه انیمیشن‌ها قبل از گرفتن اسکرین‌شات غیرفعال می‌شوند و پس از اتمام، تنظیمات بازنشانی می‌شوند.

### `enableLayoutTesting`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **مقدار پیش‌فرض:** `false`
-   **بسترهای کاربردی پشتیبانی‌شده:** وب

این گزینه تمام متن‌ها در صفحه را پنهان می‌کند تا فقط طرح‌بندی برای مقایسه استفاده شود. پنهان‌سازی با افزودن سبک `'color': 'transparent !important'` به **هر** عنصر انجام می‌شود.

برای مشاهده خروجی به [خروجی تست](/docs/visual-testing/test-output#enablelayouttesting) مراجعه کنید.

:::info
با استفاده از این پرچم، هر عنصری که شامل متن است (نه فقط `p, h1, h2, h3, h4, h5, h6, span, a, li`، بلکه `div|button|..` نیز) این ویژگی را دریافت می‌کند. هیچ گزینه‌ای برای سفارشی‌سازی این موضوع وجود **ندارد**.
:::

### `formatImageName`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **مقدار پیش‌فرض:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **بسترهای کاربردی پشتیبانی‌شده:** وب، اپلیکیشن هیبرید (وب‌ویو)، اپلیکیشن بومی

نام تصاویر ذخیره‌شده را می‌توان با ارسال پارامتر `formatImageName` با یک رشته فرمت مانند زیر سفارشی‌سازی کرد:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

متغیرهای زیر را می‌توان برای فرمت دادن رشته استفاده کرد که به صورت خودکار از قابلیت‌های نمونه خوانده می‌شوند.
اگر نتوان آنها را تعیین کرد، مقادیر پیش‌فرض استفاده خواهند شد.

-   `browserName`: نام مرورگر در قابلیت‌های ارائه شده
-   `browserVersion`: نسخه مرورگر ارائه شده در قابلیت‌ها
-   `deviceName`: نام دستگاه از قابلیت‌ها
-   `dpr`: نسبت پیکسل دستگاه
-   `height`: ارتفاع صفحه
-   `logName`: نام گزارش از قابلیت‌ها
-   `mobile`: این `_app` یا نام مرورگر را بعد از `deviceName` اضافه می‌کند تا اسکرین‌شات‌های برنامه از اسکرین‌شات‌های مرورگر متمایز شوند
-   `platformName`: نام پلتفرم در قابلیت‌های ارائه شده
-   `platformVersion`: نسخه پلتفرم ارائه شده در قابلیت‌ها
-   `tag`: برچسبی که در متدهای فراخوانی‌شده ارائه می‌شود
-   `width`: عرض صفحه

:::info

شما نمی‌توانید مسیرها/پوشه‌های سفارشی را در `formatImageName` ارائه دهید. اگر می‌خواهید مسیر را تغییر دهید، لطفاً گزینه‌های زیر را بررسی کنید:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) برای هر متد

:::

### `fullPageScrollTimeout`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **مقدار پیش‌فرض:** `1500`
-   **بسترهای کاربردی پشتیبانی‌شده:** وب

مهلت زمانی به میلی‌ثانیه برای انتظار پس از یک اسکرول. این ممکن است به شناسایی صفحات با بارگذاری تنبل کمک کند.

:::info

این تنها زمانی کار خواهد کرد که گزینه سرویس/متد `userBasedFullPageScreenshot` به `true` تنظیم شده باشد، همچنین ببینید [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **مقدار پیش‌فرض:** `true`
-   **بسترهای کاربردی پشتیبانی‌شده:** وب، اپلیکیشن هیبرید (وب‌ویو)

پنهان کردن نوارهای اسکرول در برنامه. اگر به `true` تنظیم شود، همه نوارهای اسکرول قبل از گرفتن اسکرین‌شات غیرفعال می‌شوند. این به طور پیش‌فرض `true` تنظیم شده است تا از مشکلات اضافی جلوگیری شود.

### `logLevel`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **مقدار پیش‌فرض:** `info`
-   **بسترهای کاربردی پشتیبانی‌شده:** وب، اپلیکیشن هیبرید (وب‌ویو)، اپلیکیشن بومی

لاگ‌های اضافی، گزینه‌ها `debug | info | warn | silent` هستند.

خطاها همیشه در کنسول لاگ می‌شوند.

### `savePerInstance`

-   **نوع:** `boolean`
-   **مقدار پیش‌فرض:** `false`
-   **اجباری:** خیر
-   **بسترهای کاربردی پشتیبانی‌شده:** وب، اپلیکیشن هیبرید (وب‌ویو)، اپلیکیشن بومی

ذخیره تصاویر به ازای هر نمونه در پوشه‌ای جداگانه، به عنوان مثال تمام اسکرین‌شات‌های Chrome در پوشه Chrome مانند `desktop_chrome` ذخیره می‌شوند.

### `screenshotPath`

-   **نوع:** `string | () => string`
-   **مقدار پیش‌فرض:** `.tmp/`
-   **اجباری:** خیر
-   **بسترهای کاربردی پشتیبانی‌شده:** وب، اپلیکیشن هیبرید (وب‌ویو)، اپلیکیشن بومی

دایرکتوری که تمام اسکرین‌شات‌های واقعی/متفاوت را نگهداری می‌کند. اگر تنظیم نشود، مقدار پیش‌فرض استفاده خواهد شد. تابعی که یک رشته برمی‌گرداند نیز می‌تواند برای تنظیم مقدار screenshotPath استفاده شود:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// OR
{
    screenshotPath: () => {
        // Do some magic here
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **مقدار پیش‌فرض:** `6` برای Android و `15` برای iOS (`6` به صورت پیش‌فرض و `9` به صورت خودکار برای نوار خانه احتمالی در آیفون‌های دارای ناچ یا آیپدهایی که نوار خانه دارند اضافه می‌شود)
-   **بسترهای کاربردی پشتیبانی‌شده:** وب

پدینگی که باید به نوار ابزار در iOS و Android اضافه شود تا برش مناسبی از viewport انجام شود.

### `userBasedFullPageScreenshot`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **مقدار پیش‌فرض:** `false`
-   **بسترهای کاربردی پشتیبانی‌شده:** وب، اپلیکیشن هیبرید (وب‌ویو) **معرفی شده در visual-service@7.0.0**

به طور پیش‌فرض، اسکرین‌شات‌های تمام صفحه در دسکتاپ وب با استفاده از پروتکل WebDriver BiDi گرفته می‌شوند، که اسکرین‌شات‌های سریع، پایدار و سازگار را بدون اسکرول کردن امکان‌پذیر می‌کند.
وقتی userBasedFullPageScreenshot روی true تنظیم می‌شود، فرآیند اسکرین‌شات یک کاربر واقعی را شبیه‌سازی می‌کند: اسکرول کردن صفحه، گرفتن اسکرین‌شات‌های با اندازه viewport، و اتصال آنها به یکدیگر. این روش برای صفحاتی که محتوای lazy-loaded دارند یا رندر پویایی که به موقعیت اسکرول بستگی دارد مفید است.

از این گزینه اگر صفحه شما به بارگذاری محتوا هنگام اسکرول متکی است یا اگر می‌خواهید رفتار روش‌های قدیمی‌تر اسکرین‌شات را حفظ کنید، استفاده کنید.

### `waitForFontsLoaded`

-   **نوع:** `boolean`
-   **اجباری:** خیر
-   **مقدار پیش‌فرض:** `true`
-   **بسترهای کاربردی پشتیبانی‌شده:** وب، اپلیکیشن هیبرید (وب‌ویو)

فونت‌ها، از جمله فونت‌های شخص ثالث، می‌توانند به صورت همگام یا ناهمگام بارگذاری شوند. بارگذاری ناهمگام به این معنی است که فونت‌ها ممکن است پس از اینکه WebdriverIO تعیین کرده که یک صفحه کاملاً بارگذاری شده است، بارگذاری شوند. برای جلوگیری از مشکلات رندر فونت، این ماژول به طور پیش‌فرض قبل از گرفتن اسکرین‌شات منتظر بارگذاری تمام فونت‌ها می‌ماند.

## گزینه‌های Tabbable

:::info نکته

این ماژول همچنین ترسیم مسیری که یک کاربر با استفاده از کلید Tab صفحه کلید از طریق وب‌سایت حرکت می‌کند را با کشیدن خطوط و نقاط از عنصر قابل تب به عنصر قابل تب بعدی پشتیبانی می‌کند.<br/>
این کار الهام گرفته از مقاله وبلاگ [Viv Richards](https://github.com/vivrichards600) با عنوان ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript) است.<br/>
نحوه انتخاب عناصر قابل تب بر اساس ماژول [tabbable](https://github.com/davidtheclark/tabbable) است. اگر مشکلی در رابطه با تب‌بندی وجود دارد، لطفاً [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) و به ویژه بخش [More details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details) را بررسی کنید.

:::

### `tabbableOptions`

-   **نوع:** `object`
-   **اجباری:** خیر
-   **مقدار پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **بسترهای کاربردی پشتیبانی‌شده:** وب

گزینه‌هایی که می‌توان برای خطوط و نقاط تغییر داد اگر از متدهای `{save|check}Tabbable` استفاده می‌کنید. گزینه‌ها در زیر توضیح داده شده‌اند.

#### `tabbableOptions.circle`

-   **نوع:** `object`
-   **اجباری:** خیر
-   **مقدار پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **بسترهای کاربردی پشتیبانی‌شده:** وب

گزینه‌های تغییر دایره.

##### `tabbableOptions.circle.backgroundColor`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **مقدار پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **بسترهای کاربردی پشتیبانی‌شده:** وب

رنگ پس‌زمینه دایره.

##### `tabbableOptions.circle.borderColor`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **مقدار پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **بسترهای کاربردی پشتیبانی‌شده:** وب

رنگ حاشیه دایره.

##### `tabbableOptions.circle.borderWidth`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **مقدار پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **بسترهای کاربردی پشتیبانی‌شده:** وب

عرض حاشیه دایره.

##### `tabbableOptions.circle.fontColor`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **مقدار پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **بسترهای کاربردی پشتیبانی‌شده:** وب

رنگ فونت متن در دایره. این تنها در صورتی نشان داده می‌شود که [`showNumber`](./#tabbableoptionscircleshownumber) به `true` تنظیم شده باشد.

##### `tabbableOptions.circle.fontFamily`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **مقدار پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **بسترهای کاربردی پشتیبانی‌شده:** وب

خانواده فونت متن در دایره. این تنها در صورتی نشان داده می‌شود که [`showNumber`](./#tabbableoptionscircleshownumber) به `true` تنظیم شده باشد.

مطمئن شوید فونت‌هایی را تنظیم کنید که توسط مرورگرها پشتیبانی می‌شوند.

##### `tabbableOptions.circle.fontSize`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **مقدار پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **بسترهای کاربردی پشتیبانی‌شده:** وب

اندازه فونت متن در دایره. این تنها در صورتی نشان داده می‌شود که [`showNumber`](./#tabbableoptionscircleshownumber) به `true` تنظیم شده باشد.

##### `tabbableOptions.circle.size`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **مقدار پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **بسترهای کاربردی پشتیبانی‌شده:** وب

اندازه دایره.

##### `tabbableOptions.circle.showNumber`

-   **نوع:** `showNumber`
-   **اجباری:** خیر
-   **مقدار پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **بسترهای کاربردی پشتیبانی‌شده:** وب

نمایش شماره توالی تب در دایره.

#### `tabbableOptions.line`

-   **نوع:** `object`
-   **اجباری:** خیر
-   **مقدار پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **بسترهای کاربردی پشتیبانی‌شده:** وب

گزینه‌های تغییر خط.

##### `tabbableOptions.line.color`

-   **نوع:** `string`
-   **اجباری:** خیر
-   **مقدار پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **بسترهای کاربردی پشتیبانی‌شده:** وب

رنگ خط.

##### `tabbableOptions.line.width`

-   **نوع:** `number`
-   **اجباری:** خیر
-   **مقدار پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) را ببینید
-   **بسترهای کاربردی پشتیبانی‌شده:** وب

عرض خط.

## گزینه‌های مقایسه

### `compareOptions`

-   **نوع:** `object`
-   **اجباری:** خیر
-   **مقدار پیش‌فرض:** برای تمام مقادیر پیش‌فرض [اینجا](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) را ببینید
-   **بسترهای کاربردی پشتیبانی‌شده:** وب، اپلیکیشن هیبرید (وب‌ویو)، اپلیکیشن بومی (برای اطلاعات بیشتر به [گزینه‌های مقایسه متد](./method-options#compare-check-options) مراجعه کنید)

گزینه‌های مقایسه همچنین می‌توانند به عنوان گزینه‌های سرویس تنظیم شوند، آنها در [گزینه‌های مقایسه متد](/docs/visual-testing/method-options#compare-check-options) توضیح داده شده‌اند.