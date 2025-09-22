---
id: method-options
title: گزینه‌های متد
---

گزینه‌های متد، گزینه‌هایی هستند که می‌توانند برای هر [متد](./methods) تنظیم شوند. اگر گزینه‌ای دارای کلید مشابه با گزینه‌ای باشد که در زمان ایجاد نمونه از افزونه تنظیم شده است، این گزینه متد، مقدار گزینه افزونه را بازنویسی خواهد کرد.

:::info نکته

-   تمام گزینه‌های [ذخیره‌سازی](#save-options) می‌توانند برای متدهای [مقایسه](#compare-check-options) استفاده شوند
-   تمام گزینه‌های مقایسه می‌توانند هم در زمان ایجاد نمونه سرویس __و__ هم برای هر متد بررسی استفاده شوند. اگر گزینه متد دارای کلید مشابه با گزینه‌ای باشد که در زمان ایجاد نمونه سرویس تنظیم شده است، آنگاه گزینه مقایسه متد، مقدار گزینه مقایسه سرویس را بازنویسی خواهد کرد.
- تمام گزینه‌ها می‌توانند برای زمینه‌های کاربردی زیر استفاده شوند مگر اینکه به طور خاص ذکر شده باشد:
    - وب
    - اپلیکیشن هیبریدی
    - اپلیکیشن بومی
- نمونه‌های زیر با متدهای `save*` هستند، اما می‌توانند با متدهای `check*` نیز استفاده شوند

:::

## گزینه‌های ذخیره‌سازی

### `disableBlinkingCursor`

- **نوع:** `boolean`
- **اجباری:** خیر
- **پیش‌فرض:** `false`
- **استفاده با:** همه [متدها](./methods)
- **زمینه‌های کاربردی پشتیبانی شده:** وب، اپلیکیشن هیبریدی (Webview)

فعال/غیرفعال کردن چشمک زدن نشانگر در تمام عناصر `input`، `textarea`، `[contenteditable]` در برنامه. اگر به `true` تنظیم شود، نشانگر قبل از گرفتن اسکرین‌شات به `transparent` تنظیم می‌شود و پس از اتمام، بازنشانی می‌گردد.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableBlinkingCursor: true
    }
)
```

### `disableCSSAnimation`

- **نوع:** `boolean`
- **اجباری:** خیر
- **پیش‌فرض:** `false`
- **استفاده با:** همه [متدها](./methods)
- **زمینه‌های کاربردی پشتیبانی شده:** وب، اپلیکیشن هیبریدی (Webview)

فعال/غیرفعال کردن تمام انیمیشن‌های CSS در برنامه. اگر به `true` تنظیم شود، تمام انیمیشن‌ها قبل از گرفتن اسکرین‌شات غیرفعال می‌شوند و پس از اتمام، بازنشانی می‌گردند.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableCSSAnimation: true
    }
)
```

### `enableLegacyScreenshotMethod`

- **نوع:** `boolean`
- **اجباری:** خیر
- **پیش‌فرض:** `false`
- **استفاده با:** همه [متدها](./methods)
- **زمینه‌های کاربردی پشتیبانی شده:** وب، اپلیکیشن هیبریدی (Webview)

از این گزینه برای بازگشت به روش "قدیمی‌تر" اسکرین‌شات بر اساس پروتکل W3C-WebDriver استفاده کنید. این می‌تواند مفید باشد اگر آزمون‌های شما به تصاویر پایه موجود وابسته هستند یا اگر در محیط‌هایی اجرا می‌شوند که کاملاً از اسکرین‌شات‌های مبتنی بر BiDi پشتیبانی نمی‌کنند.
توجه داشته باشید که فعال‌سازی این گزینه ممکن است اسکرین‌شات‌هایی با وضوح یا کیفیت کمی متفاوت تولید کند.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLegacyScreenshotMethod: true
    }
)
```

### `enableLayoutTesting`

- **نوع:** `boolean`
- **اجباری:** خیر
- **پیش‌فرض:** `false`
- **استفاده با:** همه [متدها](./methods)
- **زمینه‌های کاربردی پشتیبانی شده:** وب، اپلیکیشن هیبریدی (Webview)

این گزینه تمام متن‌ها را در صفحه پنهان می‌کند تا فقط طرح‌بندی برای مقایسه استفاده شود. پنهان‌سازی با افزودن استایل `'color': 'transparent !important'` به __هر__ عنصر انجام می‌شود.

برای خروجی به [Test Output](./test-output#enablelayouttesting) مراجعه کنید.

:::info
با استفاده از این پرچم، هر عنصری که شامل متن است (نه فقط `p, h1, h2, h3, h4, h5, h6, span, a, li`، بلکه `div|button|..` نیز) این ویژگی را دریافت می‌کند. گزینه‌ای برای شخصی‌سازی این رفتار __وجود ندارد__.
:::

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLayoutTesting: true
    }
)
```

### `hideScrollBars`

- **نوع:** `boolean`
- **اجباری:** خیر
- **پیش‌فرض:** `true`
- **استفاده با:** همه [متدها](./methods)
- **زمینه‌های کاربردی پشتیبانی شده:** وب، اپلیکیشن هیبریدی (Webview)

پنهان کردن نوار(های) اسکرول در برنامه. اگر به `true` تنظیم شود، تمام نوار(های) اسکرول قبل از گرفتن اسکرین‌شات غیرفعال می‌شوند. این به صورت پیش‌فرض `true` تنظیم شده است تا از مشکلات اضافی جلوگیری شود.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideScrollBars: false
    }
)
```

### `hideElements`

- **نوع:** `array`
- **اجباری:** خیر
- **استفاده با:** همه [متدها](./methods)
- **زمینه‌های کاربردی پشتیبانی شده:** وب، اپلیکیشن هیبریدی (Webview)

این متد می‌تواند یک یا چند عنصر را با افزودن ویژگی `visibility: hidden` به آنها با ارائه آرایه‌ای از عناصر پنهان کند.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideElements: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

### `removeElements`

- **نوع:** `array`
- **اجباری:** خیر
- **استفاده با:** همه [متدها](./methods)
- **زمینه‌های کاربردی پشتیبانی شده:** وب، اپلیکیشن هیبریدی (Webview)

این متد می‌تواند یک یا چند عنصر را با افزودن ویژگی `display: none` به آنها با ارائه آرایه‌ای از عناصر _حذف_ کند.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        removeElements: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

### `resizeDimensions`

- **نوع:** `object`
- **اجباری:** خیر
- **پیش‌فرض:** `{ top: 0, right: 0, bottom: 0, left: 0}`
- **استفاده با:** فقط برای [`saveElement`](./methods#saveelement) یا [`checkElement`](./methods#checkelement)
- **زمینه‌های کاربردی پشتیبانی شده:** وب، اپلیکیشن هیبریدی (Webview)، اپلیکیشن بومی

یک شیء که باید مقادیر `top`، `right`، `bottom` و `left` پیکسل‌هایی را نگه دارد که باید برش عنصر را بزرگتر کنند.

```typescript
await browser.saveElement(
    'sample-tag',
    {
        resizeDimensions: {
            top: 50,
            left: 100,
            right: 10,
            bottom: 90,
        },
    }
)
```

### `userBasedFullPageScreenshot`

- **نوع:** `boolean`
- **اجباری:** خیر
- **پیش‌فرض:** `false`
- **استفاده با:** فقط برای [`saveFullPageScreen`](./methods#savefullpagescreen)، [`saveTabbablePage`](./methods#savetabbablepage)، [`checkFullPageScreen`](./methods#checkfullpagescreen) یا [`checkTabbablePage`](./methods#checktabbablepage)
- **زمینه‌های کاربردی پشتیبانی شده:** وب، اپلیکیشن هیبریدی (Webview)

وقتی به `true` تنظیم شود، این گزینه **استراتژی اسکرول و دوخت** را برای گرفتن اسکرین‌شات‌های صفحه کامل فعال می‌کند.
به جای استفاده از قابلیت‌های اسکرین‌شات بومی مرورگر، به طور دستی در صفحه اسکرول می‌کند و چندین اسکرین‌شات را به هم می‌دوزد.
این روش به ویژه برای صفحاتی با **محتوای تنبل بارگذاری شده** یا طرح‌بندی‌های پیچیده که نیاز به اسکرول برای رندر کامل دارند، مفید است.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        userBasedFullPageScreenshot: true
    }
)
```

### `fullPageScrollTimeout`

- **نوع:** `number`
- **اجباری:** خیر
- **پیش‌فرض:** `1500`
- **استفاده با:** فقط برای [`saveFullPageScreen`](./methods#savefullpagescreen) یا [`saveTabbablePage`](./methods#savetabbablepage)
- **زمینه‌های کاربردی پشتیبانی شده:** وب، اپلیکیشن هیبریدی (Webview)

زمان تاخیر برحسب میلی‌ثانیه پس از هر اسکرول. این می‌تواند به شناسایی صفحات با بارگذاری تنبل کمک کند.

> **نکته:** این فقط زمانی کار می‌کند که `userBasedFullPageScreenshot` به `true` تنظیم شده باشد

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        fullPageScrollTimeout: 3 * 1000
    }
)
```

### `hideAfterFirstScroll`

- **نوع:** `array`
- **اجباری:** خیر
- **استفاده با:** فقط برای [`saveFullPageScreen`](./methods#savefullpagescreen) یا [`saveTabbablePage`](./methods#savetabbablepage)
- **زمینه‌های کاربردی پشتیبانی شده:** وب، اپلیکیشن هیبریدی (Webview)

این متد یک یا چند عنصر را با افزودن ویژگی `visibility: hidden` به آنها با ارائه آرایه‌ای از عناصر پنهان می‌کند.
این زمانی مفید خواهد بود که یک صفحه برای مثال دارای عناصر چسبنده باشد که هنگام اسکرول صفحه با آن اسکرول می‌کنند اما هنگام گرفتن اسکرین‌شات صفحه کامل اثر آزاردهنده‌ای ایجاد می‌کنند.

> **نکته:** این فقط زمانی کار می‌کند که `userBasedFullPageScreenshot` به `true` تنظیم شده باشد

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        hideAfterFirstScroll: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

### `waitForFontsLoaded`

- **نوع:** `boolean`
- **اجباری:** خیر
- **پیش‌فرض:** `true`
- **استفاده با:** همه [متدها](./methods)
- **زمینه‌های کاربردی پشتیبانی شده:** وب، اپلیکیشن هیبریدی (Webview)

فونت‌ها، از جمله فونت‌های شخص ثالث، می‌توانند به صورت همزمان یا ناهمزمان بارگذاری شوند. بارگذاری ناهمزمان به این معنی است که فونت‌ها ممکن است پس از اینکه WebdriverIO تعیین کند که یک صفحه کاملاً بارگذاری شده است، بارگذاری شوند. برای جلوگیری از مشکلات رندرینگ فونت، این ماژول به طور پیش‌فرض قبل از گرفتن اسکرین‌شات منتظر بارگذاری تمام فونت‌ها می‌ماند.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        waitForFontsLoaded: true
    }
)
```

## گزینه‌های مقایسه (بررسی)

گزینه‌های مقایسه، گزینه‌هایی هستند که بر نحوه اجرای مقایسه توسط [ResembleJS](https://github.com/Huddle/Resemble.js) تأثیر می‌گذارند.

### `ignoreAlpha`

- **نوع:** `boolean`
- **پیش‌فرض:** `false`
- **اجباری:** خیر
- **استفاده با:** همه [متدهای Check](./methods#check-methods)
- **زمینه‌های کاربردی پشتیبانی شده:** همه

مقایسه تصاویر و نادیده گرفتن آلفا.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAlpha: true
    }
)
```

### `blockOutSideBar`

- **نوع:** `boolean`
- **پیش‌فرض:** `true`
- **اجباری:** خیر
- **استفاده با:** _فقط می‌تواند با `checkScreen()` استفاده شود. این **فقط برای iPad** است_
- **زمینه‌های کاربردی پشتیبانی شده:** همه

به طور خودکار نوار کناری را برای آیپدها در حالت افقی در طول مقایسه‌ها مسدود می‌کند. این از شکست در مؤلفه بومی زبانه/خصوصی/نشانک جلوگیری می‌کند.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutSideBar: true
    }
)
```

### `blockOutStatusBar`

- **نوع:** `boolean`
- **پیش‌فرض:** `true`
- **اجباری:** خیر
- **استفاده با:** _این **فقط برای موبایل** است_
- **زمینه‌های کاربردی پشتیبانی شده:** هیبریدی (بخش بومی) و اپلیکیشن‌های بومی

به طور خودکار نوار وضعیت و آدرس را در طول مقایسه‌ها مسدود می‌کند. این از شکست در زمان، وای‌فای یا وضعیت باتری جلوگیری می‌کند.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutStatusBar: true
    }
)
```

### `blockOutToolBar`

- **نوع:** `boolean`
- **پیش‌فرض:** `true`
- **اجباری:** خیر
- **استفاده با:** _این **فقط برای موبایل** است_
- **زمینه‌های کاربردی پشتیبانی شده:** هیبریدی (بخش بومی) و اپلیکیشن‌های بومی

به طور خودکار نوار ابزار را مسدود می‌کند.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutToolBar: true
    }
)
```

### `ignoreAntialiasing`

- **نوع:** `boolean`
- **پیش‌فرض:** `false`
- **اجباری:** خیر
- **استفاده با:** همه [متدهای Check](./methods#check-methods)
- **زمینه‌های کاربردی پشتیبانی شده:** همه

مقایسه تصاویر و نادیده گرفتن آنتی‌آلیاسینگ.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAntialiasing: true
    }
)
```

### `ignoreColors`

- **نوع:** `boolean`
- **پیش‌فرض:** `false`
- **اجباری:** خیر
- **استفاده با:** همه [متدهای Check](./methods#check-methods)
- **زمینه‌های کاربردی پشتیبانی شده:** همه

حتی اگر تصاویر رنگی باشند، مقایسه، 2 تصویر سیاه و سفید را مقایسه می‌کند.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreColors: true
    }
)
```

### `ignoreLess`

- **نوع:** `boolean`
- **پیش‌فرض:** `false`
- **اجباری:** خیر
- **استفاده با:** همه [متدهای Check](./methods#check-methods)
- **زمینه‌های کاربردی پشتیبانی شده:** همه

مقایسه تصاویر با `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreLess: true
    }
)
```

### `ignoreNothing`

- **نوع:** `boolean`
- **پیش‌فرض:** `false`
- **اجباری:** خیر
- **استفاده با:** همه [متدهای Check](./methods#check-methods)
- **زمینه‌های کاربردی پشتیبانی شده:** همه

مقایسه تصاویر با `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreNothing: true
    }
)
```

### `rawMisMatchPercentage`

- **نوع:** `boolean`
- **پیش‌فرض:** `false`
- **اجباری:** خیر
- **استفاده با:** همه [متدهای Check](./methods#check-methods)
- **زمینه‌های کاربردی پشتیبانی شده:** همه

اگر `true` باشد، درصد بازگشتی مانند `0.12345678` خواهد بود، پیش‌فرض `0.12` است

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        rawMisMatchPercentage: true
    }
)
```

### `returnAllCompareData`

- **نوع:** `boolean`
- **پیش‌فرض:** `false`
- **اجباری:** خیر
- **استفاده با:** همه [متدهای Check](./methods#check-methods)
- **زمینه‌های کاربردی پشتیبانی شده:** همه

این تمام داده‌های مقایسه را برمی‌گرداند، نه فقط درصد عدم تطابق، همچنین ببینید [Console Output](./test-output#console-output-1)

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        returnAllCompareData: true
    }
)
```

### `saveAboveTolerance`

- **نوع:** `number`
- **پیش‌فرض:** `0`
- **اجباری:** خیر
- **استفاده با:** همه [متدهای Check](./methods#check-methods)
- **زمینه‌های کاربردی پشتیبانی شده:** همه

مقدار مجاز `misMatchPercentage` که از ذخیره تصاویر با تفاوت‌ها جلوگیری می‌کند

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        saveAboveTolerance: 0.25
    }
)
```

### `largeImageThreshold`

- **نوع:** `number`
- **پیش‌فرض:** `0`
- **اجباری:** خیر
- **استفاده با:** همه [متدهای Check](./methods#check-methods)
- **زمینه‌های کاربردی پشتیبانی شده:** همه

مقایسه تصاویر بزرگ می‌تواند منجر به مشکلات عملکردی شود.
هنگام ارائه عددی برای تعداد پیکسل‌ها در اینجا (بیشتر از 0)، الگوریتم مقایسه پیکسل‌ها را رد می‌کند هنگامی که عرض یا ارتفاع تصویر بزرگتر از `largeImageThreshold` پیکسل باشد.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        largeImageThreshold: 1500
    }
)
```

### `scaleImagesToSameSize`

- **نوع:** `boolean`
- **پیش‌فرض:** `false`
- **اجباری:** خیر
- **استفاده با:** همه [متدهای Check](./methods#check-methods)
- **زمینه‌های کاربردی پشتیبانی شده:** همه

دو تصویر را قبل از اجرای مقایسه به همان اندازه مقیاس‌بندی می‌کند. به شدت توصیه می‌شود `ignoreAntialiasing` و `ignoreAlpha` را فعال کنید

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        scaleImagesToSameSize: true
    }
)
```

### `ignore`

- **نوع:** `array`
- **اجباری:** خیر
- **استفاده با:** فقط با متد `checkScreen`، **نه** با متد `checkElement`
- **زمینه‌های کاربردی پشتیبانی شده:** اپلیکیشن بومی

این متد به طور خودکار عناصر یا ناحیه‌ای را در صفحه بر اساس آرایه‌ای از عناصر یا شیء `x|y|width|height` مسدود می‌کند.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignore: [
            $('~element-1'),
            await $('~element-2'),
            {
                x: 150,
                y: 250,
                width: 100,
                height: 100,
            }
        ]
    }
)
```

## گزینه‌های پوشه

پوشه پایه و پوشه‌های اسکرین‌شات (واقعی، تفاوت) گزینه‌هایی هستند که می‌توانند در زمان ایجاد نمونه افزونه یا متد تنظیم شوند. برای تنظیم گزینه‌های پوشه در یک متد خاص، گزینه‌های پوشه را به شیء گزینه‌های متد منتقل کنید. این می‌تواند برای موارد زیر استفاده شود:

- وب
- اپلیکیشن هیبریدی
- اپلیکیشن بومی

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

- **نوع:** `string`
- **اجباری:** خیر
- **زمینه‌های کاربردی پشتیبانی شده:** همه

پوشه برای اسنپ‌شاتی که در آزمون گرفته شده است.

### `baselineFolder`

- **نوع:** `string`
- **اجباری:** خیر
- **زمینه‌های کاربردی پشتیبانی شده:** همه

پوشه برای تصویر پایه که برای مقایسه استفاده می‌شود.

### `diffFolder`

- **نوع:** `string`
- **اجباری:** خیر
- **زمینه‌های کاربردی پشتیبانی شده:** همه

پوشه برای تصویر تفاوت رندر شده توسط ResembleJS.