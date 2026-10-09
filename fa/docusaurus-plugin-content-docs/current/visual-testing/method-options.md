---
id: method-options
title: گزینه‌های متد
description: "تنظیم گزینه‌های ذخیره، مقایسه و پوشه برای هر متد تست بصری که گزینه‌های سطح سرویس را بازنویسی می‌کنند."
---

گزینه‌های متد، گزینه‌هایی هستند که می‌توان آن‌ها را برای هر [متد](./methods) به‌صورت جداگانه تنظیم کرد. اگر یک گزینه همان کلیدی را داشته باشد که در زمان نمونه‌سازی پلاگین تنظیم شده است، این گزینه‌ی متد مقدار گزینه‌ی پلاگین را بازنویسی خواهد کرد.

:::info NOTE

-   تمام گزینه‌های [گزینه‌های ذخیره](#save-options) را می‌توان برای متدهای [مقایسه](#compare-check-options) استفاده کرد
-   تمام گزینه‌های مقایسه را می‌توان در زمان نمونه‌سازی سرویس __یا__ برای هر متد check به‌صورت جداگانه استفاده کرد. اگر یک گزینه‌ی متد همان کلیدی را داشته باشد که در زمان نمونه‌سازی سرویس تنظیم شده است، گزینه‌ی مقایسه‌ی متد مقدار گزینه‌ی مقایسه‌ی سرویس را بازنویسی خواهد کرد.
- تمام گزینه‌ها را می‌توان برای زمینه‌های برنامه‌ی زیر استفاده کرد، مگر اینکه خلاف آن ذکر شده باشد:
    - Web
    - Hybrid App
    - Native App
- نمونه‌های زیر با متدهای `save*` هستند، اما می‌توان آن‌ها را با متدهای `check*` نیز استفاده کرد

:::

# گزینه‌های ذخیره

## نمایش و رندر

---

### `hideScrollBars`

<Option type="boolean" default="true" required="No">

- **استفاده با:** تمام [متدها](./methods)
- **زمینه‌های برنامه‌ی پشتیبانی‌شده:** Web، Hybrid App (Webview)

پنهان کردن نوار(های) اسکرول در برنامه. اگر روی true تنظیم شود، تمام نوار(های) اسکرول قبل از گرفتن اسکرین‌شات غیرفعال می‌شوند. این گزینه به‌طور پیش‌فرض روی `true` تنظیم شده است تا از بروز مشکلات اضافی جلوگیری شود.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideScrollBars: false
    }
)
```

</Option>
### `disableBlinkingCursor`

<Option type="boolean" default="false" required="No">

- **استفاده با:** تمام [متدها](./methods)
- **زمینه‌های برنامه‌ی پشتیبانی‌شده:** Web، Hybrid App (Webview)

فعال/غیرفعال کردن «چشمک‌زدن» نشانگر (caret) در تمام `input`، `textarea` و `[contenteditable]` در برنامه. اگر روی `true` تنظیم شود، نشانگر قبل از گرفتن اسکرین‌شات روی `transparent` تنظیم می‌شود
و پس از اتمام بازنشانی می‌شود.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableBlinkingCursor: true
    }
)
```

</Option>
### `disableCSSAnimation`

<Option type="boolean" default="false" required="No">

- **استفاده با:** تمام [متدها](./methods)
- **زمینه‌های برنامه‌ی پشتیبانی‌شده:** Web، Hybrid App (Webview)

فعال/غیرفعال کردن تمام انیمیشن‌های CSS در برنامه. اگر روی `true` تنظیم شود، تمام انیمیشن‌ها قبل از گرفتن اسکرین‌شات غیرفعال می‌شوند
و پس از اتمام بازنشانی می‌شوند

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableCSSAnimation: true
    }
)
```

</Option>
### `enableLayoutTesting`

<Option type="boolean" default="false" required="No">

- **استفاده با:** تمام [متدها](./methods)
- **زمینه‌های برنامه‌ی پشتیبانی‌شده:** Web، Hybrid App (Webview)

این گزینه تمام متن‌های یک صفحه را پنهان می‌کند تا فقط چیدمان (layout) برای مقایسه استفاده شود. پنهان‌سازی با افزودن استایل `'color': 'transparent !important'` به __هر__ عنصر انجام می‌شود.

برای مشاهده‌ی خروجی، [خروجی تست](./test-output#enablelayouttesting) را ببینید.

:::info
با استفاده از این فلگ، هر عنصری که حاوی متن باشد (پس نه فقط `p, h1, h2, h3, h4, h5, h6, span, a, li`، بلکه `div|button|..` نیز) این ویژگی را دریافت خواهد کرد. __هیچ__ گزینه‌ای برای سفارشی‌سازی این رفتار وجود ندارد.
:::

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLayoutTesting: true
    }
)
```

</Option>
### `enableLegacyScreenshotMethod`

<Option type="boolean" default="false" required="No">

- **استفاده با:** تمام [متدها](./methods)
- **زمینه‌های برنامه‌ی پشتیبانی‌شده:** Web، Hybrid App (Webview)

از این گزینه برای بازگشت به روش «قدیمی‌تر» گرفتن اسکرین‌شات مبتنی بر پروتکل W3C-WebDriver استفاده کنید. این کار می‌تواند در مواردی مفید باشد که تست‌های شما به تصاویر baseline موجود وابسته هستند یا در محیط‌هایی اجرا می‌شوید که از اسکرین‌شات‌های جدیدتر مبتنی بر BiDi به‌طور کامل پشتیبانی نمی‌کنند.
توجه داشته باشید که فعال کردن این گزینه ممکن است اسکرین‌شات‌هایی با وضوح یا کیفیت کمی متفاوت تولید کند.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLegacyScreenshotMethod: true
    }
)
```

</Option>
### `ignoreRegionPadding`

<Option type="number" default="1" required="No">

- **استفاده با:** تمام [متدها](./methods)
- **زمینه‌های برنامه‌ی پشتیبانی‌شده:** Web، Hybrid App (Webview)

حاشیه‌ای (padding) بر حسب پیکسل‌های دستگاه که به هر طرف نواحی نادیده‌گرفته‌شده اضافه می‌شود و باعث می‌شود عرض و ارتفاع هر ناحیه به اندازه‌ی ۲ برابر این مقدار افزایش یابد. این کار به جلوگیری از تفاوت‌های ۱ پیکسلی در مرزها کمک می‌کند که ممکن است در نمایشگرهای با DPR بالا یا با پروتکل اسکرین‌شات BiDi ظاهر شوند. برای غیرفعال کردن، روی `0` تنظیم کنید.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        ignoreRegionPadding: 0
    }
)
```

</Option>
### `waitForFontsLoaded`

<Option type="boolean" default="true" required="No">

- **استفاده با:** تمام [متدها](./methods)
- **زمینه‌های برنامه‌ی پشتیبانی‌شده:** Web، Hybrid App (Webview)

فونت‌ها، از جمله فونت‌های شخص ثالث، می‌توانند به‌صورت همگام یا ناهمگام بارگذاری شوند. بارگذاری ناهمگام به این معناست که فونت‌ها ممکن است پس از آنکه WebdriverIO تشخیص داد صفحه به‌طور کامل بارگذاری شده است، بارگذاری شوند. برای جلوگیری از مشکلات رندر فونت، این ماژول به‌طور پیش‌فرض قبل از گرفتن اسکرین‌شات منتظر بارگذاری تمام فونت‌ها می‌ماند.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        waitForFontsLoaded: true
    }
)
```

</Option>
## نمایان بودن عناصر

---

### `hideElements`

<Option type="array" required="No">

- **استفاده با:** تمام [متدها](./methods)
- **زمینه‌های برنامه‌ی پشتیبانی‌شده:** Web، Hybrid App (Webview)

این متد می‌تواند با ارائه‌ی آرایه‌ای از عناصر، یک یا چند عنصر را با افزودن ویژگی `visibility: hidden` به آن‌ها پنهان کند.

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

</Option>
### `removeElements`

<Option type="array" required="No">

- **استفاده با:** تمام [متدها](./methods)
- **زمینه‌های برنامه‌ی پشتیبانی‌شده:** Web، Hybrid App (Webview)

این متد می‌تواند با ارائه‌ی آرایه‌ای از عناصر، یک یا چند عنصر را با افزودن ویژگی `display: none` به آن‌ها _حذف_ کند.

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

</Option>
## مختص عنصر

---

### `resizeDimensions`

<Option type="object" default={`{ top: 0, right: 0, bottom: 0, left: 0}`} required="No">

- **استفاده با:** فقط برای [`saveElement`](./methods#saveelement) یا [`checkElement`](./methods#checkelement)
- **زمینه‌های برنامه‌ی پشتیبانی‌شده:** Web، Hybrid App (Webview)، Native App

یک شیء که باید مقادیر `top`، `right`، `bottom` و `left` را بر حسب پیکسل نگه دارد تا برش عنصر را بزرگ‌تر کند.

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

</Option>
### `biDiOrigin`

<Option type="'document' | 'viewport'" default="'document'" required="No">

- **استفاده با:** فقط برای [`saveElement`](./methods#saveelement) یا [`checkElement`](./methods#checkelement)
- **زمینه‌های برنامه‌ی پشتیبانی‌شده:** Web، Hybrid App (Webview)

گزینه‌ای مختص BiDi که مشخص می‌کند هنگام گرفتن اسکرین‌شات از عناصر از طریق پروتکل WebDriver BiDi، از کدام مبدأ مختصات استفاده شود.

- `'document'` _(پیش‌فرض)_: چیدمان سند را رندر می‌کند. برای هر موقعیتی از عنصر کار می‌کند اما لایه‌های ترکیبی (composited) را ثبت **نمی‌کند** (مانند نوارهای اسکرول، پوشش‌های fixed/sticky و عناصر `will-change`).
- `'viewport'`: فریم ترکیبی را همان‌طور که رسم شده است، شامل نوارهای اسکرول و پوشش‌ها، ثبت می‌کند. نیاز دارد که عنصر به‌طور **کامل در viewport قابل مشاهده** باشد و زمانی که عنصر خارج از viewport یا بزرگ‌تر از آن باشد، یک خطای توصیفی پرتاب می‌کند.

```typescript
await browser.saveElement(
    await $('#my-element'),
    'sample-tag',
    {
        biDiOrigin: 'viewport'
    }
)
```

</Option>
## مختص صفحه‌ی کامل

---

### `userBasedFullPageScreenshot`

<Option type="boolean" default="false" required="No">

- **استفاده با:** فقط برای [`saveFullPageScreen`](./methods#savefullpagescreen)، [`saveTabbablePage`](./methods#savetabbablepage)، [`checkFullPageScreen`](./methods#checkfullpagescreen) یا [`checkTabbablePage`](./methods#checktabbablepage)
- **زمینه‌های برنامه‌ی پشتیبانی‌شده:** Web، Hybrid App (Webview)

زمانی که روی `true` تنظیم شود، این گزینه **استراتژی اسکرول و چسباندن (scroll-and-stitch)** را برای گرفتن اسکرین‌شات‌های صفحه‌ی کامل فعال می‌کند.
به‌جای استفاده از قابلیت‌های بومی اسکرین‌شات مرورگر، صفحه را به‌صورت دستی اسکرول می‌کند و چندین اسکرین‌شات را به هم می‌چسباند.
این روش به‌ویژه برای صفحاتی با **محتوای بارگذاری تنبل (lazy-loaded)** یا چیدمان‌های پیچیده‌ای که برای رندر کامل نیاز به اسکرول دارند، مفید است.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        userBasedFullPageScreenshot: true
    }
)
```

</Option>
### `fullPageScrollTimeout`

<Option type="number" default="1500" required="No">

- **استفاده با:** فقط برای [`saveFullPageScreen`](./methods#savefullpagescreen) یا [`saveTabbablePage`](./methods#savetabbablepage)
- **زمینه‌های برنامه‌ی پشتیبانی‌شده:** Web، Hybrid App (Webview)

مدت زمان انتظار بر حسب میلی‌ثانیه پس از هر اسکرول. این کار ممکن است به شناسایی صفحاتی با بارگذاری تنبل کمک کند.

> **توجه:** این گزینه فقط زمانی کار می‌کند که `userBasedFullPageScreenshot` روی `true` تنظیم شده باشد

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        fullPageScrollTimeout: 3 * 1000
    }
)
```

</Option>
### `hideAfterFirstScroll`

<Option type="array" required="No">

- **استفاده با:** فقط برای [`saveFullPageScreen`](./methods#savefullpagescreen) یا [`saveTabbablePage`](./methods#savetabbablepage)
- **زمینه‌های برنامه‌ی پشتیبانی‌شده:** Web، Hybrid App (Webview)

این متد با ارائه‌ی آرایه‌ای از عناصر، یک یا چند عنصر را با افزودن ویژگی `visibility: hidden` به آن‌ها پنهان می‌کند.
این گزینه زمانی مفید است که یک صفحه، برای مثال، دارای عناصر چسبان (sticky) باشد که هنگام اسکرول صفحه همراه با آن اسکرول می‌شوند، اما هنگام گرفتن اسکرین‌شات صفحه‌ی کامل اثر آزاردهنده‌ای ایجاد می‌کنند

> **توجه:** این گزینه فقط زمانی کار می‌کند که `userBasedFullPageScreenshot` روی `true` تنظیم شده باشد

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

# گزینه‌های مقایسه (Check)

گزینه‌های مقایسه، گزینه‌هایی هستند که بر نحوه‌ی اجرای مقایسه تأثیر می‌گذارند.

</Option>
## حساسیت بصری

---

:::info تاریخچه‌ی نسخه‌ها برای گزینه‌های `ignore*`
رفتار این پیش‌تنظیم‌ها یک بار، به‌صورت یک تغییر ناسازگار (breaking change)، زمانی تغییر کرد که موتور مقایسه از ResembleJS (نسخه‌ی 9 و پایین‌تر) به Pixelmatch (نسخه‌ی 10 و بالاتر) تغییر یافت. برای جزئیات، [جدول تاریخچه‌ی نسخه‌ها](./compare-options#visual-sensitivity) را در صفحه‌ی گزینه‌های مقایسه ببینید. هر چیزی از نسخه‌ی v10.0.0 به بعد، با یادداشت «از نسخه‌ی» در گزینه‌ی مربوطه در ادامه مشخص شده است.
:::

**ترتیب «آخری برنده است»:** زمانی که بیش از یک فلگ `ignore*` به‌طور هم‌زمان فعال باشد، فقط یک پیش‌تنظیم اعمال می‌شود که از این ترتیب پیروی می‌کند (موارد بعدی برنده‌اند): `ignoreAlpha` → `ignoreAntialiasing` → `ignoreColors` → `ignoreLess` → `ignoreNothing`. از نسخه‌ی `v10.1.0`، هشداری ثبت می‌شود که نام پیش‌تنظیم برنده را اعلام می‌کند.

### `ignoreColors`

<Option type="boolean" default="false" required="No">

- **استفاده با:** تمام [متدهای Check](./methods#check-methods)
- **زمینه‌های برنامه‌ی پشتیبانی‌شده:** همه
- **از نسخه‌ی:** `v10.1.0`: مقایسه‌ی فقط روشنایی با استفاده از وزن‌های luma در resemble (`0.3/0.59/0.11`).

فقط روشنایی را مقایسه می‌کند (وزن‌های luma در resemble `0.3/0.59/0.11`) و تفاوت‌های رنگ/فام را نادیده می‌گیرد. زمانی از این گزینه استفاده کنید که انتظار می‌رود خودِ رنگ متغیر باشد اما همچنان می‌خواهید تغییرات چیدمان یا روشنایی را تشخیص دهید.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreColors: true
    }
)
```

</Option>
### `ignoreAlpha`

<Option type="boolean" default="false" required="No">

- **استفاده با:** تمام [متدهای Check](./methods#check-methods)
- **زمینه‌های برنامه‌ی پشتیبانی‌شده:** همه
- **از نسخه‌ی:** `v10.1.0`: قانون threshold/AA مخصوص به خود را مستقل از سایر فلگ‌های `ignore*` اعمال می‌کند.

تصاویر را مقایسه کرده و تفاوت‌های کانال آلفا را نادیده می‌گیرد. زمانی از این گزینه استفاده کنید که رندر شفافیت/opacity ناپایدار است اما رنگ پیکسل‌های زیرین اهمیت دارند.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAlpha: true
    }
)
```

</Option>
### `ignoreAntialiasing`

<Option type="boolean" default="true" required="No">

- **استفاده با:** تمام [متدهای Check](./methods#check-methods)
- **زمینه‌های برنامه‌ی پشتیبانی‌شده:** همه
- **از نسخه‌ی:** `v10`: مقدار پیش‌فرض به `true` تغییر کرد (در نسخه‌ی 9 و پایین‌تر `false` بود).

پیکسل‌های anti-aliased را در طول مقایسه نادیده می‌گیرد. برای مقایسه‌ی سخت‌گیرانه که در آن پیکسل‌های anti-aliased باید به‌عنوان عدم تطابق شمرده شوند، روی `false` تنظیم کنید. این گزینه رایج‌ترین منبع ناپایداری تست‌های بصری را حل می‌کند: رندر شدن لبه‌های متن/اشکال با anti-aliasing کمی متفاوت روی ماشین‌های مختلف، حتی زمانی که هیچ چیزی تغییر نکرده است.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAntialiasing: true
    }
)
```

</Option>
### `ignoreLess`

<Option type="boolean" default="false" required="No">

- **استفاده با:** تمام [متدهای Check](./methods#check-methods)
- **زمینه‌های برنامه‌ی پشتیبانی‌شده:** همه
- **از نسخه‌ی:** `v10.1.0`: قانون threshold/AA مخصوص به خود را مستقل از سایر فلگ‌های `ignore*` اعمال می‌کند.

تصاویر را با استفاده از یک تلرانس RGB آسان‌گیرانه (حدود ۱۶/۲۵۵ برای هر کانال در فضای YIQ) مقایسه می‌کند. Anti-aliasing نادیده گرفته نمی‌شود. از این گزینه برای ایجاد کمی فضای تنفس در برابر نویز رندر (آرتیفکت‌های فشرده‌سازی، گرد کردن رنگ) بدون نادیده گرفتن anti-aliasing استفاده کنید.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreLess: true
    }
)
```

</Option>
### `ignoreNothing`

<Option type="boolean" default="false" required="No">

- **استفاده با:** تمام [متدهای Check](./methods#check-methods)
- **زمینه‌های برنامه‌ی پشتیبانی‌شده:** همه
- **از نسخه‌ی:** `v10.1.0`: قانون threshold/AA مخصوص به خود را مستقل از سایر فلگ‌های `ignore*` اعمال می‌کند.

از تلرانس صفر استفاده می‌کند: هر تفاوت پیکسلی، از جمله anti-aliasing، به‌عنوان عدم تطابق شمرده می‌شود. زمانی از این گزینه استفاده کنید که به اثباتی دقیق در سطح پیکسل نیاز دارید که هیچ چیزی تغییر نکرده است.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreNothing: true
    }
)
```

</Option>
### `pixelmatch`

<Option type="object" default="undefined" required="No">

- **استفاده با:** تمام [متدهای Check](./methods#check-methods)
- **زمینه‌های برنامه‌ی پشتیبانی‌شده:** همه
- **اضافه‌شده در:** `v10.1.0`

حالت مقایسه را برای یک فراخوانی `check*` با تنظیمات مستقیم [pixelmatch](https://github.com/mapbox/pixelmatch) (`threshold`، `includeAA`، `diffColor`، `aaColor`، `diffColorAlt`، `alpha`، `diffMask`، `checkerboard`) به‌جای یک پیش‌تنظیم `ignore*` بازنویسی می‌کند. زمانی از این گزینه استفاده کنید که پیش‌تنظیم‌ها برای یک تست خاص بیش از حد کلی هستند، برای مثال زمانی که تست به مقدار threshold مخصوص به خود نیاز دارد، یا به رنگ تفاوتی که واقعاً در گزارش شما متمایز باشد. برای مرجع کامل فیلدها و اینکه هر فیلد چه مشکلی را حل می‌کند، [کنترل مستقیم pixelmatch](./compare-options#direct-pixelmatch-control) را ببینید.

نمی‌توان آن را با گزینه‌های `ignore*` در شیء گزینه‌های یک فراخوانی ترکیب کرد: این کار خطای `CompareOptionsConflictError` را پرتاب می‌کند. با این حال، می‌تواند پیکربندی سرویسی را که از پیش‌تنظیم‌های `ignore*` استفاده می‌کند بازنویسی کند (یا برعکس)؛ زمانی که یک فراخوانی متد حالت مقایسه را به این شکل تغییر می‌دهد، هشداری ثبت می‌شود.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        pixelmatch: { threshold: 0.05 }
    }
)
```

</Option>
### `scaleImagesToSameSize`

<Option type="boolean" default="false" required="No">

- **استفاده با:** تمام [متدهای Check](./methods#check-methods)
- **زمینه‌های برنامه‌ی پشتیبانی‌شده:** همه

دو تصویر را قبل از اجرای مقایسه به یک اندازه مقیاس‌بندی می‌کند. فعال کردن `ignoreAntialiasing` و `ignoreAlpha` به‌شدت توصیه می‌شود

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        scaleImagesToSameSize: true
    }
)
```

</Option>
## پوشاندن نواحی در موبایل

---

### `blockOutStatusBar`

<Option type="boolean" default="true" required="No">

- **استفاده با:** _این گزینه **فقط برای موبایل** است_
- **زمینه‌های برنامه‌ی پشتیبانی‌شده:** Hybrid (بخش native) و Native Apps

به‌طور خودکار نوار وضعیت و نوار آدرس را در طول مقایسه‌ها می‌پوشاند. این کار از شکست‌ها به دلیل وضعیت زمان، وای‌فای یا باتری جلوگیری می‌کند.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutStatusBar: true
    }
)
```

</Option>
### `blockOutToolBar`

<Option type="boolean" default="true" required="No">

- **استفاده با:** _این گزینه **فقط برای موبایل** است_
- **زمینه‌های برنامه‌ی پشتیبانی‌شده:** Hybrid (بخش native) و Native Apps

به‌طور خودکار نوار ابزار را می‌پوشاند.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutToolBar: true
    }
)
```

</Option>
### `blockOutSideBar`

<Option type="boolean" default="true" required="No">

- **استفاده با:** _فقط می‌توان آن را برای `checkScreen()` استفاده کرد. این گزینه **فقط برای iPad** است_
- **زمینه‌های برنامه‌ی پشتیبانی‌شده:** همه

به‌طور خودکار نوار کناری را برای iPadها در حالت افقی (landscape) در طول مقایسه‌ها می‌پوشاند. این کار از شکست‌ها به دلیل کامپوننت native تب/خصوصی/نشانک جلوگیری می‌کند.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutSideBar: true
    }
)
```

</Option>
## مدیریت نواحی

---

### `blockOut`

<Option type="array" required="No">

- **استفاده با:** تمام [متدهای Check](./methods#check-methods)
- **زمینه‌های برنامه‌ی پشتیبانی‌شده:** همه

آرایه‌ای از نواحی مستطیلی که قبل از مقایسه پوشانده می‌شوند. هر ورودی باید یک شیء با مقادیر `x`، `y`، `width` و `height` (بر حسب پیکسل) باشد. نواحی پوشانده‌شده قبل از محاسبه‌ی تفاوت رنگ‌آمیزی می‌شوند و از تأثیر آن نواحی بر درصد عدم تطابق جلوگیری می‌کنند.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOut: [
            { x: 0, y: 0, width: 100, height: 50 },
            { x: 300, y: 200, width: 80, height: 80 },
        ]
    }
)
```

</Option>
### `ignore`

<Option type="array" required="No">

- **استفاده با:** فقط با متد `checkScreen`، **نه** با متد `checkElement`
- **زمینه‌های برنامه‌ی پشتیبانی‌شده:** Native App

این متد به‌طور خودکار عناصر یا ناحیه‌ای از صفحه را بر اساس آرایه‌ای از عناصر یا شیئی از `x|y|width|height` می‌پوشاند.

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

</Option>
## نتایج و گزارش‌دهی

---

### `rawMisMatchPercentage`

<Option type="boolean" default="false" required="No">

- **استفاده با:** تمام [متدهای Check](./methods#check-methods)
- **زمینه‌های برنامه‌ی پشتیبانی‌شده:** همه

اگر true باشد، درصد بازگشتی به شکل `0.12345678` خواهد بود، مقدار پیش‌فرض `0.12` است

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        rawMisMatchPercentage: true
    }
)
```

</Option>
### `returnAllCompareData`

<Option type="boolean" default="false" required="No">

- **استفاده با:** تمام [متدهای Check](./methods#check-methods)
- **زمینه‌های برنامه‌ی پشتیبانی‌شده:** همه

این گزینه تمام داده‌های مقایسه را برمی‌گرداند، نه فقط درصد عدم تطابق را؛ همچنین [خروجی کنسول](./test-output#console-output-1) را ببینید

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        returnAllCompareData: true
    }
)
```

</Option>
### `saveAboveTolerance`

<Option type="number" default="0" required="No">

- **استفاده با:** تمام [متدهای Check](./methods#check-methods)
- **زمینه‌های برنامه‌ی پشتیبانی‌شده:** همه

مقدار مجاز `misMatchPercentage` که از ذخیره‌ی تصاویر دارای تفاوت جلوگیری می‌کند

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        saveAboveTolerance: 0.25
    }
)
```

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="No">

- **استفاده با:** تمام [متدهای Check](./methods#check-methods)
- **زمینه‌های برنامه‌ی پشتیبانی‌شده:** همه

میزان نزدیکی پیکسلی که برای گروه‌بندی پیکسل‌های متفاوت در گزارش‌های JSON استفاده می‌شود. مقادیر بالاتر پیکسل‌های بیشتری را در کادرهای محدودکننده‌ی (bounding box) کمتری گروه‌بندی می‌کنند؛ مقادیر پایین‌تر کادرهای دقیق‌تر اما بیشتری تولید می‌کنند. فقط زمانی کاربرد دارد که [`createJsonReportFiles`](/docs/visual-testing/service-options#createjsonreportfiles) فعال باشد.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        diffPixelBoundingBoxProximity: 10
    }
)
```

# گزینه‌های پوشه

---

پوشه‌ی baseline و پوشه‌های اسکرین‌شات (actual، diff) گزینه‌هایی هستند که می‌توان آن‌ها را در زمان نمونه‌سازی پلاگین یا متد تنظیم کرد. برای تنظیم گزینه‌های پوشه روی یک متد خاص، گزینه‌های پوشه را به شیء گزینه‌های متد ارسال کنید. این کار را می‌توان برای موارد زیر استفاده کرد:

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

</Option>
### `actualFolder`

<Option type="string" required="No" contexts="All">

پوشه‌ای برای اسنپ‌شاتی که در تست گرفته شده است.

</Option>
### `baselineFolder`

<Option type="string" required="No" contexts="All">

پوشه‌ای برای تصویر baseline که برای مقایسه استفاده می‌شود.

</Option>
### `diffFolder`

<Option type="string" required="No" contexts="All">

پوشه‌ای برای تصویر تفاوت که در طول مقایسه رندر می‌شود.

</Option>