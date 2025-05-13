---
id: method-options
title: گزینه‌های متد
---

گزینه‌های متد، گزینه‌هایی هستند که می‌توانند برای هر [متد](./methods) تنظیم شوند. اگر گزینه دارای کلید مشابه با گزینه‌ای باشد که در زمان نمونه‌سازی افزونه تنظیم شده است، این گزینه متد، مقدار گزینه افزونه را لغو خواهد کرد.

## Save Options

### `disableBlinkingCursor`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported:** Web, Hybrid App (Webview)

فعال/غیرفعال کردن چشمک زدن نشانگر در تمام `input`، `textarea`، `[contenteditable]` در برنامه. اگر روی `true` تنظیم شود، نشانگر قبل از گرفتن اسکرین‌شات روی `transparent` تنظیم می‌شود
و پس از اتمام کار به حالت اول برمی‌گردد

### `disableCSSAnimation`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported:** Web, Hybrid App (Webview)

فعال/غیرفعال کردن تمام انیمیشن‌های CSS در برنامه. اگر روی `true` تنظیم شود، تمام انیمیشن‌ها قبل از گرفتن اسکرین‌شات غیرفعال می‌شوند
و پس از اتمام کار به حالت اول برمی‌گردند

### `enableLegacyScreenshotMethod`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Supported:** Web, Hybrid App (Webview)

از این گزینه برای بازگشت به روش "قدیمی‌تر" اسکرین‌شات مبتنی بر پروتکل W3C-WebDriver استفاده کنید. این می‌تواند در مواردی که تست‌های شما به تصاویر پایه موجود متکی هستند یا اگر در محیط‌هایی اجرا می‌شوید که از اسکرین‌شات‌های مبتنی بر BiDi جدیدتر به طور کامل پشتیبانی نمی‌کنند، مفید باشد.
توجه داشته باشید که فعال کردن این گزینه ممکن است اسکرین‌شات‌هایی با وضوح یا کیفیت کمی متفاوت تولید کند.

### `enableLayoutTesting`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `false`
-   **Used with:** All [methods](./methods)
-   **Supported:** Web

این گزینه تمام متن‌ها را در صفحه پنهان می‌کند تا فقط از طرح‌بندی برای مقایسه استفاده شود. پنهان‌سازی با اضافه کردن استایل `'color': 'transparent !important'` به __هر__ عنصر انجام می‌شود.

برای مشاهده خروجی به [Test Output](./test-output#enablelayouttesting) مراجعه کنید

:::info
با استفاده از این پرچم، هر عنصری که حاوی متن است (نه فقط `p, h1, h2, h3, h4, h5, h6, span, a, li` بلکه همچنین `div|button|..`) این ویژگی را دریافت خواهد کرد. __هیچ__ گزینه‌ای برای سفارشی‌سازی این مورد وجود ندارد.
:::

### `hideScrollBars`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Used with:** All [methods](./methods)
-   **Supported:** Web, Hybrid App (Webview)

پنهان کردن نوار(های) اسکرول در برنامه. اگر روی true تنظیم شود، تمام نوار(های) اسکرول قبل از گرفتن اسکرین‌شات غیرفعال می‌شوند. این گزینه به طور پیش‌فرض `true` تنظیم شده است تا از مشکلات اضافی جلوگیری شود.

### `hideElements`

-   **Type:** `array`
-   **Mandatory:** no
-   **Used with:** All [methods](./methods)
-   **Supported:** Web, Hybrid App (Webview), Native App

این متد می‌تواند یک یا چند عنصر را با اضافه کردن ویژگی `visibility: hidden` به آنها با ارائه آرایه‌ای از عناصر پنهان کند.

### `removeElements`

-   **Type:** `array`
-   **Mandatory:** no
-   **Used with:** All [methods](./methods)
-   **Supported:** Web, Hybrid App (Webview), Native App

این متد می‌تواند یک یا چند عنصر را با اضافه کردن ویژگی `display: none` به آنها با ارائه آرایه‌ای از عناصر _حذف_ کند.

### `resizeDimensions`

-   **Type:** `object`
-   **Mandatory:** no
-   **Default:** `{ top: 0, right: 0, bottom: 0, left: 0}`
-   **Used with:** Only for [`saveElement`](./methods#saveelement) or [`checkElement`](./methods#checkelement)
-   **Supported:** Web, Hybrid App (Webview), Native App

شیء‌ای که باید مقدار پیکسل‌های `top`، `right`، `bottom` و `left` را نگه دارد که باعث می‌شود برش عنصر بزرگتر شود.

### `userBasedFullPageScreenshot`

* **Type:** `boolean`
* **Mandatory:** No
* **Default:** `false`
* **Supported:** Web, Hybrid App (Webview)

وقتی روی `true` تنظیم شود، این گزینه **استراتژی اسکرول و ترکیب** را برای گرفتن اسکرین‌شات‌های صفحه کامل فعال می‌کند.
به جای استفاده از قابلیت‌های اسکرین‌شات بومی مرورگر، به صورت دستی در صفحه اسکرول می‌کند و چندین اسکرین‌شات را به هم متصل می‌کند.
این روش به ویژه برای صفحاتی با **محتوای تنبل-بارگذاری شده** یا طرح‌بندی‌های پیچیده که برای رندر کامل نیاز به اسکرول دارند، مفید است.

### `fullPageScrollTimeout`

-   **Type:** `number`
-   **Mandatory:** No
-   **Default:** `1500`
-   **Used with:** Only for [`saveFullPageScreen`](./methods#savefullpagescreen) or [`saveTabbablePage`](./methods#savetabbablepage)
-   **Supported:** Web

زمان انتظار بر حسب میلی‌ثانیه پس از اسکرول. این می‌تواند به شناسایی صفحات با بارگذاری تنبل کمک کند.

> **توجه:** این فقط زمانی کار می‌کند که `userBasedFullPageScreenshot` روی `true` تنظیم شده باشد

### `hideAfterFirstScroll`

-   **Type:** `array`
-   **Mandatory:** no
-   **Used with:** Only for [`saveFullPageScreen`](./methods#savefullpagescreen) or [`saveTabbablePage`](./methods#savetabbablepage)
-   **Supported:** Web

این متد یک یا چند عنصر را با اضافه کردن ویژگی `visibility: hidden` به آنها با ارائه آرایه‌ای از عناصر پنهان می‌کند.
این زمانی مفید خواهد بود که صفحه برای مثال دارای عناصر چسبنده‌ای باشد که با اسکرول صفحه اسکرول می‌کنند اما هنگام گرفتن اسکرین‌شات صفحه کامل، تأثیر آزاردهنده‌ای ایجاد می‌کنند

> **توجه:** این فقط زمانی کار می‌کند که `userBasedFullPageScreenshot` روی `true` تنظیم شده باشد

### `waitForFontsLoaded`

-   **Type:** `boolean`
-   **Mandatory:** No
-   **Default:** `true`
-   **Used with:** All [methods](./methods)
-   **Supported:** Web, Hybrid App (Webview)

فونت‌ها، از جمله فونت‌های شخص ثالث، می‌توانند به صورت همزمان یا ناهمزمان بارگذاری شوند. بارگذاری ناهمزمان به این معنی است که فونت‌ها ممکن است پس از اینکه WebdriverIO تشخیص دهد که صفحه کاملاً بارگذاری شده است، بارگذاری شوند. برای جلوگیری از مشکلات رندر فونت، این ماژول به طور پیش‌فرض، قبل از گرفتن اسکرین‌شات، منتظر بارگذاری همه فونت‌ها می‌ماند.

## Compare (Check) Options

گزینه‌های مقایسه، گزینه‌هایی هستند که روش مقایسه توسط [ResembleJS](https://github.com/Huddle/Resemble.js) را تحت تأثیر قرار می‌دهند.

:::info توجه

-   تمام گزینه‌های [Save Options](#save-options) می‌توانند برای متدهای Compare استفاده شوند
-   تمام گزینه‌های مقایسه می‌توانند در هنگام راه‌اندازی سرویس __یا__ برای هر متد بررسی استفاده شوند. اگر گزینه متد دارای کلید مشابه با گزینه‌ای باشد که در زمان راه‌اندازی سرویس تنظیم شده است، گزینه مقایسه متد، مقدار گزینه مقایسه سرویس را لغو خواهد کرد.
- تمام گزینه‌ها می‌توانند برای موارد زیر استفاده شوند:
    - Web
    - Hybrid App
    - Native App

:::

### `ignoreAlpha`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

مقایسه تصاویر و نادیده گرفتن آلفا.

### `blockOutSideBar`

-   **Type:** `boolean`
-   **Default:** `true`
-   **Mandatory:** no
-   **Remark:** _Can only be used for `checkScreen()`. This is **iPad only**_

به طور خودکار نوار کناری را برای آیپدها در حالت افقی در طول مقایسه‌ها مسدود می‌کند. این از شکست‌ها در اجزای بومی تب/خصوصی/بوکمارک جلوگیری می‌کند.

### `blockOutStatusBar`

-   **Type:** `boolean`
-   **Default:** `true`
-   **Mandatory:** no
-   **Remark:** _This is **Mobile only**_

به طور خودکار نوار وضعیت و نوار آدرس را در طول مقایسه‌ها مسدود می‌کند. این از شکست‌ها در زمان، وای‌فای یا وضعیت باتری جلوگیری می‌کند.

### `blockOutToolBar`

-   **Type:** `boolean`
-   **Default:** `true`
-   **Mandatory:** no
-   **Remark:** _This is **Mobile only**_

به طور خودکار نوار ابزار را مسدود می‌کند.

### `ignoreAntialiasing`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

مقایسه تصاویر و نادیده گرفتن آنتی‌آلیاسینگ.

### `ignoreColors`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

حتی اگر تصاویر رنگی باشند، مقایسه دو تصویر سیاه و سفید را مقایسه خواهد کرد

### `ignoreLess`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

مقایسه تصاویر و مقایسه با `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

### `ignoreNothing`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

مقایسه تصاویر و مقایسه با `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

### `rawMisMatchPercentage`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

اگر true باشد، درصد بازگشتی به صورت `0.12345678` خواهد بود، پیش‌فرض `0.12` است

### `returnAllCompareData`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

این همه داده‌های مقایسه را برمی‌گرداند، نه فقط درصد عدم تطابق

### `saveAboveTolerance`

-   **Type:** `number`
-   **Default:** `0`
-   **Mandatory:** no

مقدار مجاز `misMatchPercentage` که از ذخیره تصاویر با تفاوت‌ها جلوگیری می‌کند

### `largeImageThreshold`

-   **Type:** `number`
-   **Default:** `0`
-   **Mandatory:** no

مقایسه تصاویر بزرگ می‌تواند منجر به مشکلات عملکردی شود.
هنگام ارائه یک عدد برای تعداد پیکسل‌ها در اینجا (بالاتر از 0)، الگوریتم مقایسه پیکسل‌ها را رد می‌کند وقتی عرض یا ارتفاع تصویر بزرگتر از `largeImageThreshold` پیکسل باشد.

### `scaleImagesToSameSize`

-   **Type:** `boolean`
-   **Default:** `false`
-   **Mandatory:** no

2 تصویر را قبل از اجرای مقایسه به همان اندازه مقیاس می‌کند. بسیار توصیه می‌شود که `ignoreAntialiasing` و `ignoreAlpha` را فعال کنید

## Folder options

پوشه پایه و پوشه‌های اسکرین‌شات (واقعی، تفاوت) گزینه‌هایی هستند که می‌توانند در هنگام راه‌اندازی افزونه یا متد تنظیم شوند. برای تنظیم گزینه‌های پوشه در یک متد خاص، گزینه‌های پوشه را به شیء گزینه‌های متد ارسال کنید. این می‌تواند برای موارد زیر استفاده شود:

- Web
- Hybrid App
- Native App

```ts
import path from 'node:path'

const methodOptions = {
    actualFolder: path.join(process.cwd(), 'customActual'),
    baselineFolder: path.join(process.cwd(), 'customBaseline'),
    diffFolder: path.join(process.cwd(), 'customDiff'),
}

// You can use this for all methods
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

### `actualFolder`

-   **Type:** `string`
-   **Mandatory:** no

پوشه برای اسنپ‌شاتی که در تست گرفته شده است.

### `baselineFolder`

-   **Type:** `string`
-   **Mandatory:** no

پوشه برای تصویر پایه که برای مقایسه استفاده می‌شود.

### `diffFolder`

-   **Type:** `string`
-   **Mandatory:** no

پوشه برای تفاوت تصویر رندر شده توسط ResembleJS.