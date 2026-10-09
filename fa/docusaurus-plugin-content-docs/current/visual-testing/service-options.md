---
id: service-options
title: گزینه‌های سرویس
description: "پیکربندی گزینه‌های پیش‌فرض سرویس بصری، شامل ثبت اسکرین‌شات، اسکرین‌شات‌های تمام‌صفحه، تصاویر مرجع (baseline)، پوشه‌ها و گزارش‌دهی."
---

گزینه‌های سرویس، گزینه‌هایی هستند که هنگام نمونه‌سازی سرویس تنظیم می‌شوند و برای هر فراخوانی متد مورد استفاده قرار می‌گیرند.

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

# گزینه‌های پیش‌فرض

## ثبت اسکرین‌شات

---

### `hideScrollBars`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

پنهان کردن نوارهای اسکرول در برنامه. اگر روی true تنظیم شود، تمام نوارهای اسکرول قبل از گرفتن اسکرین‌شات غیرفعال می‌شوند. این گزینه به‌طور پیش‌فرض روی `true` تنظیم شده است تا از بروز مشکلات اضافی جلوگیری شود.

</Option>
### `disableBlinkingCursor`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview)">

فعال/غیرفعال کردن «چشمک زدن» نشانگر (caret) در تمام `input`، `textarea` و `[contenteditable]` های برنامه. اگر روی `true` تنظیم شود، نشانگر قبل از گرفتن اسکرین‌شات روی `transparent` تنظیم می‌شود
و پس از اتمام کار به حالت قبل بازمی‌گردد

</Option>
### `disableCSSAnimation`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview)">

فعال/غیرفعال کردن تمام انیمیشن‌های CSS در برنامه. اگر روی `true` تنظیم شود، تمام انیمیشن‌ها قبل از گرفتن اسکرین‌شات غیرفعال می‌شوند
و پس از اتمام کار به حالت قبل بازمی‌گردند

</Option>
### `enableLayoutTesting`

<Option type="boolean" default="false" required="No" contexts="Web">

این گزینه تمام متن‌های صفحه را پنهان می‌کند تا فقط چیدمان (layout) برای مقایسه استفاده شود. پنهان‌سازی با افزودن استایل `'color': 'transparent !important'` به **هر** عنصر انجام می‌شود.

برای مشاهده خروجی، [خروجی تست](/docs/visual-testing/test-output#enablelayouttesting) را ببینید

:::info
با استفاده از این پرچم، هر عنصری که حاوی متن باشد (یعنی نه فقط `p, h1, h2, h3, h4, h5, h6, span, a, li`، بلکه `div|button|..` نیز) این ویژگی را دریافت خواهد کرد. **هیچ** گزینه‌ای برای سفارشی‌سازی این رفتار وجود ندارد.
:::

</Option>
### `ignoreRegionPadding`

<Option type="number" default="1" required="No" contexts="Web, Hybrid App (Webview)">

فاصله (padding) بر حسب پیکسل دستگاه که به هر طرف نواحی نادیده‌گرفته‌شده اضافه می‌شود و باعث می‌شود هر ناحیه به اندازه ۲ برابر این مقدار عریض‌تر و بلندتر شود. این کار به جلوگیری از تفاوت‌های مرزی ۱ پیکسلی کمک می‌کند که ممکن است در نمایشگرهای با DPR بالا یا با پروتکل اسکرین‌شات BiDi ظاهر شوند. برای غیرفعال کردن، مقدار را روی `0` تنظیم کنید.

</Option>
### `waitForFontsLoaded`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

فونت‌ها، از جمله فونت‌های شخص ثالث، می‌توانند به‌صورت همزمان یا ناهمزمان بارگذاری شوند. بارگذاری ناهمزمان به این معناست که فونت‌ها ممکن است پس از آنکه WebdriverIO تشخیص داد صفحه به‌طور کامل بارگذاری شده است، بارگذاری شوند. برای جلوگیری از مشکلات رندر فونت، این ماژول به‌طور پیش‌فرض قبل از گرفتن اسکرین‌شات منتظر بارگذاری تمام فونت‌ها می‌ماند.

</Option>
## اسکرین‌شات‌های تمام‌صفحه

---

### `userBasedFullPageScreenshot`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview) **Introduced in visual-service@7.0.0">

به‌طور پیش‌فرض، اسکرین‌شات‌های تمام‌صفحه در وب دسکتاپ با استفاده از پروتکل WebDriver BiDi گرفته می‌شوند که امکان گرفتن اسکرین‌شات‌های سریع، پایدار و یکنواخت را بدون نیاز به اسکرول فراهم می‌کند.
هنگامی که userBasedFullPageScreenshot روی true تنظیم شود، فرآیند گرفتن اسکرین‌شات رفتار یک کاربر واقعی را شبیه‌سازی می‌کند: اسکرول در طول صفحه، گرفتن اسکرین‌شات‌هایی به اندازه viewport و چسباندن آن‌ها به یکدیگر. این روش برای صفحاتی با محتوای lazy-load یا رندر پویا که به موقعیت اسکرول وابسته است، مفید است.

اگر صفحه شما به بارگذاری محتوا در حین اسکرول متکی است یا می‌خواهید رفتار روش‌های قدیمی‌تر گرفتن اسکرین‌شات را حفظ کنید، از این گزینه استفاده کنید.

</Option>
### `fullPageScrollTimeout`

<Option type="number" default="1500" required="No" contexts="Web">

مدت زمان انتظار بر حسب میلی‌ثانیه پس از هر اسکرول. این گزینه ممکن است به شناسایی صفحاتی با بارگذاری تنبل (lazy loading) کمک کند.

:::info

این گزینه فقط زمانی کار می‌کند که گزینه سرویس/متد `userBasedFullPageScreenshot` روی `true` تنظیم شده باشد، همچنین [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedfullpagescreenshot) را ببینید

:::

</Option>
## موبایل و دستگاه

---

### `isHybridApp`

<Option type="boolean" default="false" required="No" contexts="Hybrid App (Webview)">

هنگام تست یک برنامه هیبریدی (یک پوسته نیتیو با یک یا چند webview تعبیه‌شده) این گزینه را روی `true` تنظیم کنید. این کار نحوه مدیریت برش نوار وضعیت و نوار آدرس را برای صفحات مبتنی بر webview تنظیم می‌کند و زمانی که داده‌های مستطیل نیتیو دستگاه در دسترس نباشد، به مقادیر پیش‌فرض امن بازمی‌گردد.

</Option>
### `addIOSBezelCorners`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview), Native App">

افزودن گوشه‌های قاب (bezel) و ناچ/dynamic island به اسکرین‌شات برای دستگاه‌های iOS.

:::info NOTE
این کار فقط زمانی امکان‌پذیر است که نام دستگاه به‌طور خودکار **قابل** تشخیص باشد و با فهرست زیر از نام‌های نرمال‌شده دستگاه‌ها مطابقت داشته باشد. نرمال‌سازی توسط این ماژول انجام می‌شود.
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
-   iPad Mini نسل ششم: `ipadmini`
-   iPad Air نسل چهارم: `ipadair`
-   iPad Air نسل پنجم: `ipadair`
-   iPad Pro (۱۱ اینچ) نسل اول: `ipadpro11`
-   iPad Pro (۱۱ اینچ) نسل دوم: `ipadpro11`
-   iPad Pro (۱۱ اینچ) نسل سوم: `ipadpro11`
-   iPad Pro (۱۲.۹ اینچ) نسل سوم: `ipadpro129`
-   iPad Pro (۱۲.۹ اینچ) نسل چهارم: `ipadpro129`
-   iPad Pro (۱۲.۹ اینچ) نسل پنجم: `ipadpro129`
:::

</Option>
### `addressBarShadowPadding`

<Option type="number" default="6" required="No" contexts="Web">

فاصله‌ای (padding) که باید به نوار آدرس در iOS و Android اضافه شود تا برش صحیحی از viewport انجام شود.

</Option>
### `toolBarShadowPadding`

<Option type="number" default={`6 for Android and \`15\` for iOS (\`6\` by default and \`9\` will be added automatically for the possible home bar on iPhones with a notch or iPads that have a home bar)`} required="No" contexts="Web">

فاصله‌ای (padding) که باید به نوار ابزار در iOS و Android اضافه شود تا برش صحیحی از viewport انجام شود.

</Option>
## مدیریت فایل و پوشه

---

### `baselineFolder`

<Option type="string|()=> string" default=".path/to/testfile/__snapshots__/" required="No" contexts="Web, Hybrid App (Webview), Native App">

پوشه‌ای که تمام تصاویر مرجع (baseline) مورد استفاده در مقایسه را در خود نگه می‌دارد. اگر تنظیم نشود، از مقدار پیش‌فرض استفاده می‌شود که فایل‌ها را در یک پوشه `__snapshots__/` در کنار فایل spec اجراکننده تست‌های بصری ذخیره می‌کند. برای تنظیم مقدار `baselineFolder` می‌توان از تابعی که یک `string` برمی‌گرداند نیز استفاده کرد:

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

</Option>
### `screenshotPath`

<Option type="string | () => string" default=".tmp/" required="no" contexts="Web, Hybrid App (Webview), Native App">

پوشه‌ای که تمام اسکرین‌شات‌های واقعی (actual) و تفاوت (diff) را در خود نگه می‌دارد. اگر تنظیم نشود، از مقدار پیش‌فرض استفاده می‌شود. برای تنظیم مقدار screenshotPath می‌توان از تابعی
که یک رشته برمی‌گرداند نیز استفاده کرد:

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

</Option>
### `clearRuntimeFolder`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview), Native App">

حذف پوشه زمان اجرا (`actual` و `diff`) هنگام راه‌اندازی

:::info NOTE
این گزینه فقط زمانی کار می‌کند که [`screenshotPath`](#screenshotpath) از طریق گزینه‌های پلاگین تنظیم شده باشد و در صورتی که پوشه‌ها را در متدها تنظیم کنید **کار نخواهد کرد**
:::

</Option>
### `savePerInstance`

<Option type="boolean" default="false" required="no" contexts="Web, Hybrid App (Webview), Native App">

ذخیره تصاویر هر نمونه (instance) در یک پوشه جداگانه؛ به‌عنوان مثال، تمام اسکرین‌شات‌های Chrome در یک پوشه Chrome مانند `desktop_chrome` ذخیره می‌شوند.

</Option>
### `formatImageName`

<Option type="string" default={`{tag}-{browserName}-{width}x{height}-dpr-{dpr}`} required="No" contexts="Web, Hybrid App (Webview), Native App">

نام تصاویر ذخیره‌شده را می‌توان با ارسال پارامتر `formatImageName` همراه با یک رشته قالب مانند زیر سفارشی کرد:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

متغیرهای زیر را می‌توان برای قالب‌بندی رشته ارسال کرد و به‌طور خودکار از capabilities نمونه خوانده می‌شوند.
اگر قابل تشخیص نباشند، از مقادیر پیش‌فرض استفاده می‌شود.

-   `browserName`: نام مرورگر در capabilities ارائه‌شده
-   `browserVersion`: نسخه مرورگر ارائه‌شده در capabilities
-   `deviceName`: نام دستگاه از capabilities
-   `dpr`: نسبت پیکسل دستگاه (device pixel ratio)
-   `height`: ارتفاع صفحه نمایش
-   `logName`: مقدار logName از capabilities
-   `mobile`: این متغیر `_app` یا نام مرورگر را پس از `deviceName` اضافه می‌کند تا اسکرین‌شات‌های برنامه از اسکرین‌شات‌های مرورگر متمایز شوند
-   `platformName`: نام پلتفرم در capabilities ارائه‌شده
-   `platformVersion`: نسخه پلتفرم ارائه‌شده در capabilities
-   `tag`: برچسبی (tag) که در متد فراخوانی‌شده ارائه می‌شود
-   `width`: عرض صفحه نمایش

:::info

شما نمی‌توانید مسیرها/پوشه‌های سفارشی را در `formatImageName` ارائه دهید. اگر می‌خواهید مسیر را تغییر دهید، لطفاً تغییر گزینه‌های زیر را بررسی کنید:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) برای هر متد

:::

</Option>
## رفتار تصویر مرجع و ذخیره‌سازی

---

### `autoSaveBaseline`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview), Native App">

اگر در طول مقایسه هیچ تصویر مرجعی (baseline) یافت نشود، تصویر به‌طور خودکار در پوشه baseline کپی می‌شود.

</Option>
### `autoElementScroll`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

این گزینه به شما اجازه می‌دهد اسکرول خودکار عنصر به داخل دید را هنگام ایجاد اسکرین‌شات از یک عنصر غیرفعال کنید.

</Option>
### `alwaysSaveActualImage`

<Option type="boolean" default="true" required="No" contexts="All">

هنگامی که این گزینه روی `false` تنظیم شود:

- در صورتی که **هیچ** تفاوتی وجود نداشته باشد، تصویر واقعی (actual) را ذخیره نمی‌کند
- در صورتی که `createJsonReportFiles` روی `true` تنظیم شده باشد، فایل گزارش JSON را ذخیره نمی‌کند. همچنین یک هشدار در لاگ‌ها نمایش می‌دهد مبنی بر اینکه `createJsonReportFiles` غیرفعال شده است

این کار باید عملکرد بهتری ایجاد کند، زیرا هیچ فایلی در سیستم نوشته نمی‌شود و اطمینان حاصل می‌کند که پوشه `actual` شلوغ نشود.

</Option>
## گزارش‌دهی

---

### `createJsonReportFiles` **(جدید)**

<Option type="boolean" default="false" required="No">

اکنون این امکان را دارید که نتایج مقایسه را در یک فایل گزارش JSON صادر کنید. با ارائه گزینه `createJsonReportFiles: true`، برای هر تصویری که مقایسه می‌شود یک گزارش ایجاد شده و در پوشه `actual`، در کنار نتیجه هر تصویر `actual` ذخیره می‌شود. خروجی به این شکل خواهد بود:

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

پس از اجرای تمام تست‌ها، یک فایل JSON جدید شامل مجموعه مقایسه‌ها تولید می‌شود که در ریشه پوشه `actual` شما قابل دسترسی است. داده‌ها بر اساس موارد زیر گروه‌بندی می‌شوند:

-   `describe` برای Jasmine/Mocha یا `Feature` برای CucumberJS
-   `it` برای Jasmine/Mocha یا `Scenario` برای CucumberJS
    و سپس بر اساس موارد زیر مرتب می‌شوند:
-   `commandName`، که نام متدهای مقایسه‌ای است که برای مقایسه تصاویر استفاده می‌شوند
-   `instanceData`، ابتدا مرورگر، سپس دستگاه و سپس پلتفرم
    که به این شکل خواهد بود

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

داده‌های گزارش این فرصت را به شما می‌دهند که گزارش بصری خود را بسازید، بدون اینکه خودتان تمام کارهای پیچیده و جمع‌آوری داده‌ها را انجام دهید.

:::info NOTE
شما باید از `@wdio/visual-testing` نسخه `5.2.0` یا بالاتر استفاده کنید
:::

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="No" contexts="Web, Hybrid App (Webview), Native App">

میزان مجاورت پیکسلی که برای گروه‌بندی پیکسل‌های متفاوت در گزارش JSON تولیدشده توسط [`createJsonReportFiles`](#createjsonreportfiles) استفاده می‌شود. مقادیر بالاتر پیکسل‌های بیشتری را در کادرهای محدودکننده (bounding box) کمتری گروه‌بندی می‌کنند؛ مقادیر پایین‌تر کادرهای دقیق‌تر اما بیشتری تولید می‌کنند.

</Option>
## عمومی

---

### `logLevel`

<Option type="string" default="info" required="No" contexts="Web, Hybrid App (Webview), Native App">

لاگ‌های اضافی اضافه می‌کند، گزینه‌ها عبارتند از `debug | info | warn | silent`

خطاها همیشه در کنسول ثبت می‌شوند.

</Option>
## گزینه‌های Tabbable

:::info NOTE

این ماژول همچنین از ترسیم مسیری که یک کاربر با استفاده از صفحه‌کلید برای _tab_ کردن در وب‌سایت طی می‌کند پشتیبانی می‌کند؛ این کار با کشیدن خطوط و نقاط از یک عنصر قابل tab به عنصر قابل tab دیگر انجام می‌شود.<br/>
این کار از پست وبلاگ [Viv Richards](https://github.com/vivrichards600) با عنوان ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript) الهام گرفته شده است.<br/>
نحوه انتخاب عناصر قابل tab بر اساس ماژول [tabbable](https://github.com/davidtheclark/tabbable) است. اگر مشکلی در رابطه با tab کردن وجود دارد، لطفاً [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) و به‌ویژه [بخش More details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details) را بررسی کنید.

:::

### `tabbableOptions`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

گزینه‌هایی که در صورت استفاده از متدهای `{save|check}Tabbable` می‌توان برای خطوط و نقاط تغییر داد. این گزینه‌ها در ادامه توضیح داده شده‌اند.

</Option>
#### `tabbableOptions.circle`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

گزینه‌های تغییر دایره.

</Option>
##### `tabbableOptions.circle.backgroundColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

رنگ پس‌زمینه دایره.

</Option>
##### `tabbableOptions.circle.borderColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

رنگ حاشیه دایره.

</Option>
##### `tabbableOptions.circle.borderWidth`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

ضخامت حاشیه دایره.

</Option>
##### `tabbableOptions.circle.fontColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

رنگ فونت متن داخل دایره. این مورد فقط در صورتی نمایش داده می‌شود که [`showNumber`](./#tabbableoptionscircleshownumber) روی `true` تنظیم شده باشد.

</Option>
##### `tabbableOptions.circle.fontFamily`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

خانواده فونت متن داخل دایره. این مورد فقط در صورتی نمایش داده می‌شود که [`showNumber`](./#tabbableoptionscircleshownumber) روی `true` تنظیم شده باشد.

مطمئن شوید فونت‌هایی را تنظیم می‌کنید که توسط مرورگرها پشتیبانی می‌شوند.

</Option>
##### `tabbableOptions.circle.fontSize`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

اندازه فونت متن داخل دایره. این مورد فقط در صورتی نمایش داده می‌شود که [`showNumber`](./#tabbableoptionscircleshownumber) روی `true` تنظیم شده باشد.

</Option>
##### `tabbableOptions.circle.size`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

اندازه دایره.

</Option>
##### `tabbableOptions.circle.showNumber`

<Option type="showNumber" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

نمایش شماره ترتیب tab در داخل دایره.

</Option>
#### `tabbableOptions.line`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

گزینه‌های تغییر خط.

</Option>
##### `tabbableOptions.line.color`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

رنگ خط.

</Option>
##### `tabbableOptions.line.width`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

ضخامت خط.

</Option>
## گزینه‌های مقایسه

### `compareOptions`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) for all default values" required="No" contexts="Web, Hybrid App (Webview), Native App (See [Method Compare options](./method-options#compare-check-options) for more information)">

گزینه‌های مقایسه را می‌توان به‌عنوان گزینه‌های سرویس نیز تنظیم کرد؛ این گزینه‌ها در [گزینه‌های مقایسه متد](/docs/visual-testing/method-options#compare-check-options) توضیح داده شده‌اند

</Option>