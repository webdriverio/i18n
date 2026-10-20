---
id: selectors
title: انتخاب‌گرها
description: "عناصر را با CSS، متن، XPath، نام دسترس‌پذیری، نقش ARIA و دیگر راهبردهای انتخاب‌گر پیدا کنید و بیاموزید کدام‌یک پایدارترند."
---

[پروتکل WebDriver](https://w3c.github.io/webdriver/) چندین راهبرد انتخاب‌گر برای جست‌وجوی یک عنصر فراهم می‌کند. WebdriverIO آن‌ها را ساده‌سازی می‌کند تا انتخاب عناصر ساده باقی بماند. لطفاً توجه داشته باشید که با اینکه دستورهای جست‌وجوی عناصر `$` و `$$` نام دارند، هیچ ارتباطی با jQuery یا [موتور انتخاب‌گر Sizzle](https://github.com/jquery/sizzle) ندارند.

با اینکه انتخاب‌گرهای بسیار متنوعی در دسترس هستند، تنها تعداد کمی از آن‌ها روشی پایدار برای یافتن عنصر درست فراهم می‌کنند. برای مثال، دکمه‌ی زیر را در نظر بگیرید:

```html
<button
  id="main"
  class="btn btn-large"
  name="submission"
  role="button"
  data-testid="submit"
>
  Submit
</button>
```

ما انتخاب‌گرهای زیر را __توصیه می‌کنیم__ یا __توصیه نمی‌کنیم__:

| انتخاب‌گر | توصیه‌شده | نکات |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 هرگز | بدترین - بیش از حد عمومی، بدون زمینه. |
| `$('.btn.btn-large')` | 🚨 هرگز | بد. وابسته به استایل‌دهی. به‌شدت در معرض تغییر. |
| `$('#main')` | ⚠️ با احتیاط | بهتر. اما همچنان وابسته به استایل‌دهی یا شنونده‌های رویداد JS. |
| `$(() => document.queryElement('button'))` | ⚠️ با احتیاط | جست‌وجوی مؤثر، اما نوشتن آن پیچیده است. |
| `$('button[name="submission"]')` | ⚠️ با احتیاط | وابسته به ویژگی `name` که معنای HTML دارد. |
| `$('button[data-testid="submit"]')` | ✅ خوب | نیازمند ویژگی اضافی است، به دسترس‌پذیری (a11y) مرتبط نیست. |
| `$('aria/Submit')` | ✅ خوب | خوب. شبیه نحوه‌ی تعامل کاربر با صفحه است. توصیه می‌شود از فایل‌های ترجمه استفاده کنید تا با به‌روزرسانی ترجمه‌ها تست‌هایتان از کار نیفتند. در جلسات WebDriver BiDi این انتخاب‌گر از درخت دسترس‌پذیری مرورگر استفاده می‌کند. در جلسات Classic به XPath بازمی‌گردد و ممکن است در صفحات بزرگ کندتر باشد. |
| `$('button=Submit')` | ✅ همیشه | بهترین. شبیه نحوه‌ی تعامل کاربر با صفحه است و سریع است. توصیه می‌شود از فایل‌های ترجمه استفاده کنید تا با به‌روزرسانی ترجمه‌ها تست‌هایتان از کار نیفتند. |

## حالت سخت‌گیرانه

از نسخه‌ی v10، دستور [`$`](/docs/api/browser/$) __سخت‌گیرانه__ است: این دستور دقیقاً یک عنصر را نمایش می‌دهد. اگر انتخاب‌گر با بیش از یک عنصر مطابقت داشته باشد، دستور به‌جای انتخاب بی‌صدای اولین مورد مطابق، خطای `StrictSelectorError` پرتاب می‌کند:

```js
// ۱۲ دکمه در صفحه وجود دارد
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
```

این همان رفتار [locatorهای Playwright](https://playwright.dev/docs/locators#strictness) است. Cypress متفاوت است: کوئری‌های آن ممکن است به چندین عنصر برسند، و این دستورهای عملیاتی مانند [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn) هستند که به‌طور پیش‌فرض یک موضوع چندعنصری را رد می‌کنند. حالت سخت‌گیرانه انتخاب‌گرهایی را که بیش از حد گسترده هستند آشکار می‌کند؛ انتخاب‌گرهایی که در غیر این صورت به محض بزرگ‌تر شدن صفحه، بی‌صدا با عنصر اشتباه تعامل می‌کردند.

این قاعده برای هر مرحله از یک [زنجیره](#chain-selectors) و برای هر نوع انتخاب‌گری که `$` می‌پذیرد اعمال می‌شود — انتخاب‌گرهای رشته‌ای (از جمله آن‌هایی که به shadow DOM نفوذ می‌کنند)، [توابع JS](#js-function)، [انتخاب‌گرهای موبایل](#mobile-selectors) و ارجاع‌های [راهبرد سفارشی](#custom-selector-strategies).

### آنچه تحت تأثیر قرار نمی‌گیرد

- `$$` همچنان صفر یا چند عنصر را به‌صورت یک [`ElementArray`](/docs/api/browser/$$) برمی‌گرداند. پیش از خواندن تعداد یا استفاده از `for...of`، فهرست (یا `.length` آن) را await کنید. `for await` مستقیماً روی فهرست کار می‌کند.
- دستورهای کمکی اختصاصی `custom$`، `shadow$` و `react$` سخت‌گیرانه نیستند — آن‌ها همچنان اولین مورد مطابق را برمی‌گردانند، همان‌طور که همتاهای `$$` آن‌ها نیز چنین می‌کنند.
- انتخاب‌گری که با هیچ چیز مطابقت ندارد همچنان یک عنصر با تفکیک تنبل (lazily-resolved) برمی‌گرداند، بنابراین رفتار [`waitForExist`](/docs/api/element/waitForExist) و [انتظار خودکار](/docs/autowait) تغییری نمی‌کند.
- ارسال یک ارجاع عنصر، مثلاً `$(await browser.getActiveElement())`، همیشه به یک گره‌ی واحد اشاره دارد و هرگز بررسی نمی‌شود.

:::info مهاجرت به v10

برای اینکه بدانید چگونه مجموعه‌ی تست خود را از نظر نقض حالت سخت‌گیرانه بررسی کنید، کوئری‌های جداگانه را محدودتر کنید یا آن‌ها را از این حالت خارج کنید، و حالت سخت‌گیرانه را در کل پروژه غیرفعال کنید، [راهنمای مهاجرت v10](/docs/v10-migration) را ببینید.

:::

## انتخاب‌گر کوئری CSS

اگر خلاف آن مشخص نشده باشد، WebdriverIO عناصر را با استفاده از الگوی [انتخاب‌گر CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) جست‌وجو می‌کند، برای مثال:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## متن پیوند

برای دریافت یک عنصر anchor که متن مشخصی دارد، متن را با یک علامت مساوی (`=`) در ابتدای آن جست‌وجو کنید.

برای مثال:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

می‌توانید این عنصر را با فراخوانی زیر جست‌وجو کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## متن جزئی پیوند

برای یافتن یک عنصر anchor که متن قابل مشاهده‌ی آن به‌طور جزئی با مقدار جست‌وجوی شما مطابقت دارد،
آن را با استفاده از `*=` در ابتدای رشته‌ی کوئری جست‌وجو کنید (مثلاً `*=driver`).

همچنین می‌توانید عنصر مثال بالا را با فراخوانی زیر جست‌وجو کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__نکته:__ نمی‌توانید چندین راهبرد انتخاب‌گر را در یک انتخاب‌گر ترکیب کنید. برای رسیدن به همان هدف از چندین کوئری عنصر زنجیره‌ای استفاده کنید، برای مثال:

```js
const elem = await $('header h1*=Welcome') // کار نمی‌کند!!!
// به‌جای آن از این استفاده کنید
const elem = await $('header').$('*=driver')
```

## عنصر با متن مشخص

همین تکنیک را می‌توان برای عناصر نیز به کار برد. علاوه بر این، امکان تطبیق بدون حساسیت به بزرگی و کوچکی حروف با استفاده از `.=` یا `.*=` در کوئری نیز وجود دارد.

برای مثال، این کوئری برای یک سرعنوان سطح ۱ با متن "Welcome to my Page" است:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

می‌توانید این عنصر را با فراخوانی زیر جست‌وجو کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

یا با استفاده از کوئری متن جزئی:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

همین روش برای نام‌های `id` و `class` نیز کار می‌کند:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

می‌توانید این عنصر را با فراخوانی زیر جست‌وجو کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__نکته:__ نمی‌توانید چندین راهبرد انتخاب‌گر را در یک انتخاب‌گر ترکیب کنید. برای رسیدن به همان هدف از چندین کوئری عنصر زنجیره‌ای استفاده کنید، برای مثال:

```js
const elem = await $('header h1*=Welcome') // کار نمی‌کند!!!
// به‌جای آن از این استفاده کنید
const elem = await $('header').$('h1*=Welcome')
```

## نام تگ

برای جست‌وجوی عنصری با نام تگ مشخص، از `<tag>` یا `<tag />` استفاده کنید.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

می‌توانید این عنصر را با فراخوانی زیر جست‌وجو کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## ویژگی Name

برای جست‌وجوی عناصری با ویژگی name مشخص، از یک انتخاب‌گر CSS مانند `[name="some-name"]` استفاده کنید. در یک جلسه‌ی موبایل، همین شکل کوتاه با راهبرد locator `name` در Appium ارسال می‌شود:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__نکته:__ راهبرد locator `name` یک locator مخصوص Appium است. جلسات دسکتاپ `[name="some-name"]` را روی راهبرد CSS نگه می‌دارند.

## xPath

همچنین می‌توان عناصر را از طریق یک [xPath](https://developer.mozilla.org/en-US/docs/Web/XPath) مشخص جست‌وجو کرد.

یک انتخاب‌گر xPath قالبی مانند `//body/div[6]/div[1]/span[1]` دارد.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

می‌توانید پاراگراف دوم را با فراخوانی زیر جست‌وجو کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

همچنین می‌توانید از xPath برای پیمایش رو به بالا و رو به پایین درخت DOM استفاده کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## انتخاب‌گر نام دسترس‌پذیری

عناصر را بر اساس نام دسترس‌پذیر (accessible name) آن‌ها جست‌وجو کنید. نام دسترس‌پذیر همان چیزی است که هنگام دریافت فوکوس توسط آن عنصر، صفحه‌خوان اعلام می‌کند. مقدار نام دسترس‌پذیر می‌تواند هم محتوای بصری و هم جایگزین‌های متنی پنهان باشد.

در جلسات [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/) (Chrome، Edge، Firefox و دیگر مرورگرهای دارای قابلیت BiDi)، WebdriverIO ابتدا از [`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes) با یک locator دسترس‌پذیری استفاده می‌کند. این روش مستقیماً درخت دسترس‌پذیری مرورگر را جست‌وجو می‌کند و معمولاً بسیار سریع‌تر از تقریب XPath است. اگر locator دسترس‌پذیری چیزی پیدا نکند، WebdriverIO به روش ابتکاری XPath کلاسیک بازمی‌گردد تا کوئری‌های `aria/` موجود همچنان مطابقت داشته باشند.

:::info

می‌توانید در [پست وبلاگ انتشار](/blog/2022/09/05/accessibility-selector) ما درباره‌ی این انتخاب‌گر بیشتر بخوانید

:::

### دریافت بر اساس `aria-label`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L1
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L86-L87
```

### دریافت بر اساس `aria-labelledby`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L2-L3
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L93-L94
```

### دریافت بر اساس محتوا

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L4
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L100-L101
```

### دریافت بر اساس عنوان

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L5
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L107-L108
```

### دریافت بر اساس ویژگی `alt`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L114-L115
```

## انتخاب‌گر نقش

عناصر را بر اساس نقش ARIA و نام دسترس‌پذیرشان جست‌وجو کنید، همان‌گونه که یک صفحه‌خوان آن‌ها را توصیف می‌کند: «دکمه‌ی *Add to cart*». ترکیب یک نقش و یک نام، حتی با تغییر نام‌های کلاس، شناسه‌های تست یا ساختار DOM همچنان مطابقت دارد.

```js
await $('role/button[name="Add to cart"]').click()
await expect($('role/heading[name="Order summary"]')).toBeDisplayed()

// فقط نقش
const rows = await $$('role/row')

// محدود به یک عنصر والد
const dialog = $('role/dialog[name="Checkout"]')
await dialog.$('role/button[name="Pay now"]').click()
```

نحو آن `role/<role>` یا `role/<role>[name="<accessible name>"]` است. نقل‌قول تکی نیز کار می‌کند، و یک علامت نقل‌قول داخل نام با یک بک‌اسلش escape می‌شود: `role/button[name="Say \"hi\""]`.

- نام باید با کل نام دسترس‌پذیر مطابقت داشته باشد.
- نقش باید یک نقش ARIA باشد. یک غلط تایپی با پیشنهاد نزدیک‌ترین نقش معتبر شکست می‌خورد، برای مثال `"buton" is not an ARIA role. Did you mean "button"?`.
- `img` و نام ARIA 1.3 آن یعنی `image` نقش یکسانی هستند.
- این انتخاب‌گر مانند هر انتخاب‌گر دیگری از [حالت سخت‌گیرانه](#strict-mode)ی `$` پیروی می‌کند.

در یک جلسه‌ی [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/)، WebdriverIO نقش و نام را به [`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes) ارسال می‌کند. مرورگر خودش هر دو را محاسبه می‌کند، به همان روشی که فناوری‌های کمکی صفحه را می‌بینند. عناصر داخل shadow rootهای باز و داخل فریم‌ها، از جمله فریم‌هایی از مبدأ دیگر، پیدا می‌شوند. اگر مرورگر هیچ عنصری پیدا نکند، هیچ بازگشتی به یک روش ابتکاری وجود ندارد. توجه داشته باشید که مرورگر نقش را تعیین می‌کند: برای مثال، یک `<table>` بدون سرستون یا caption می‌تواند یک جدول چیدمان (layout table) باشد و در این صورت ردیف‌های آن نقش `row` ندارند.

در یک جلسه‌ی WebDriver Classic، و زمانی که مرورگر از locator نقش پشتیبانی نمی‌کند، WebdriverIO نقش و نام دسترس‌پذیر را در صفحه با [`dom-accessibility-api`](https://github.com/eps1lon/dom-accessibility-api) محاسبه می‌کند؛ همان پیاده‌سازی‌ای که Testing Library از آن استفاده می‌کند. یک فیلد متنی بدون برچسب، همانند رفتار مرورگرها، با `placeholder` خود نام‌گذاری می‌شود. انتخاب‌گر نقش در زمینه‌ی اپلیکیشن بومی موبایل در دسترس نیست. در آنجا از [accessibility id](#accessibility-id) استفاده کنید.

## ARIA - ویژگی Role

برای جست‌وجوی عناصر بر اساس [نقش‌های ARIA](https://www.w3.org/TR/html-aria/#docconformance)، می‌توانید مستقیماً نقش عنصر را مانند `[role=button]` به‌عنوان پارامتر انتخاب‌گر مشخص کنید. این انتخاب‌گر نقش را از روی نام عنصر و ویژگی‌های آن تقریب می‌زند. [انتخاب‌گر نقش](#role-selector) را ترجیح دهید، که از نقشی که مرورگر محاسبه می‌کند استفاده می‌کند و می‌تواند نام دسترس‌پذیر را نیز تطبیق دهد:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## ویژگی ID

راهبرد locator «id» در پروتکل WebDriver پشتیبانی نمی‌شود؛ به‌جای آن باید از راهبردهای انتخاب‌گر CSS یا xPath برای یافتن عناصر با استفاده از ID استفاده کرد.

با این حال، برخی درایورها (مانند [Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)) ممکن است همچنان از این انتخاب‌گر [پشتیبانی](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies) کنند.

نحوهای انتخاب‌گر پشتیبانی‌شده‌ی فعلی برای ID عبارتند از:

```js
//locator مبتنی بر css
const button = await $('#someid')
//locator مبتنی بر xpath
const button = await $('//*[@id="someid"]')
//راهبرد id
// نکته: فقط در Appium یا فریم‌ورک‌های مشابهی کار می‌کند که از راهبرد locator «ID» پشتیبانی می‌کنند
const button = await $('id=resource-id/iosname')
```

## تابع JS

همچنین می‌توانید از توابع جاوااسکریپت برای دریافت عناصر با استفاده از APIهای بومی وب استفاده کنید. البته، این کار را فقط می‌توانید در یک زمینه‌ی وب (مثلاً `browser` یا زمینه‌ی وب در موبایل) انجام دهید.

با فرض ساختار HTML زیر:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

می‌توانید عنصر هم‌سطح `#elem` را به این صورت جست‌وجو کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L139-L143
```

## انتخاب‌گرهای عمیق

:::warning

از نسخه‌ی `v9` در WebdriverIO دیگر نیازی به این انتخاب‌گر ویژه نیست، زیرا WebdriverIO به‌طور خودکار برای شما به درون Shadow DOM نفوذ می‌کند. توصیه می‌شود با حذف `>>>` از ابتدای این انتخاب‌گر، استفاده از آن را کنار بگذارید.

:::

در یک جلسه‌ی WebDriver BiDi، `$` و `$$` درون هر shadow root باز را جست‌وجو می‌کنند: rootهایی که با `attachShadow()` ایجاد شده‌اند و shadow rootهای اعلانی (`<template shadowrootmode="open">`) که صفحه یا `setHTMLUnsafe()` به سند اضافه می‌کند. آن‌ها درون یک shadow root اعلانی بسته، یا درون یک shadow root اعلانی که `setHTMLUnsafe()` در عنصری ایجاد می‌کند که هنوز در سند نیست، را جست‌وجو نمی‌کنند. برای این موارد، از [`shadow$`](https://webdriver.io/docs/api/element/shadow$) روی عنصر میزبان استفاده کنید.

بسیاری از اپلیکیشن‌های فرانت‌اند به‌شدت به عناصری با [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) متکی هستند. از نظر فنی جست‌وجوی عناصر درون shadow DOM بدون راه‌حل‌های جایگزین غیرممکن است. [`shadow$`](https://webdriver.io/docs/api/element/shadow$) و [`shadow$$`](https://webdriver.io/docs/api/element/shadow$$) چنین راه‌حل‌هایی بوده‌اند که [محدودیت‌های](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow) خود را داشتند. با انتخاب‌گر عمیق اکنون می‌توانید همه‌ی عناصر درون هر shadow DOM را با استفاده از دستور کوئری معمول جست‌وجو کنید.

فرض کنید اپلیکیشنی با ساختار زیر داریم:

![Chrome Example](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "Chrome Example")

با این انتخاب‌گر می‌توانید عنصر `<button />` را که درون shadow DOM دیگری تودرتو قرار دارد جست‌وجو کنید، برای مثال:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## انتخاب‌گرهای موبایل

برای تست موبایل هیبریدی، مهم است که سرور اتوماسیون پیش از اجرای دستورها در *زمینه‌ی* (context) درست باشد. برای خودکارسازی ژست‌ها، درایور در حالت ایده‌آل باید روی زمینه‌ی بومی تنظیم شود. اما برای انتخاب عناصر از DOM، درایور باید روی زمینه‌ی webview پلتفرم تنظیم شود. *فقط در این صورت* می‌توان از روش‌های ذکرشده در بالا استفاده کرد.

برای تست موبایل بومی، جابه‌جایی بین زمینه‌ها وجود ندارد، زیرا باید از راهبردهای موبایل استفاده کنید و مستقیماً از فناوری اتوماسیون دستگاه زیربنایی بهره ببرید. این به‌ویژه زمانی مفید است که یک تست به کنترل دقیقی بر یافتن عناصر نیاز دارد.

### Android UiAutomator

فریم‌ورک UI Automator اندروید روش‌های متعددی برای یافتن عناصر فراهم می‌کند. می‌توانید از [UI Automator API](https://developer.android.com/tools/testing-support-library/index.html#uia-apis)، به‌ویژه [کلاس UiSelector](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector) برای مکان‌یابی عناصر استفاده کنید. در Appium شما کد جاوا را به‌صورت یک رشته به سرور ارسال می‌کنید، که آن را در محیط اپلیکیشن اجرا کرده و عنصر یا عناصر را برمی‌گرداند.

```js
const selector = 'new UiSelector().text("Cancel").className("android.widget.Button")'
const button = await $(`android=${selector}`)
await button.click()
```

### Android DataMatcher و ViewMatcher (فقط Espresso)

راهبرد DataMatcher اندروید روشی برای یافتن عناصر با [Data Matcher](https://developer.android.com/reference/android/support/test/espresso/DataInteraction) فراهم می‌کند

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"]
})
await menuItem.click()
```

و به‌طور مشابه [View Matcher](https://developer.android.com/reference/android/support/test/espresso/ViewInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"],
  "class": "androidx.test.espresso.matcher.ViewMatchers"
})
await menuItem.click()
```

### Android View Tag (فقط Espresso)

راهبرد view tag روشی راحت برای یافتن عناصر بر اساس [tag](https://developer.android.com/reference/android/support/test/espresso/matcher/ViewMatchers.html#withTagValue%28org.hamcrest.Matcher%3Cjava.lang.Object%3E%29) آن‌ها فراهم می‌کند.

```js
const elem = await $('-android viewtag:tag_identifier')
await elem.click()
```

### iOS UIAutomation

هنگام خودکارسازی یک اپلیکیشن iOS، می‌توان از [فریم‌ورک UI Automation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) اپل برای یافتن عناصر استفاده کرد.

این [API](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771) جاوااسکریپت متدهایی برای دسترسی به view و هر چیزی که روی آن است دارد.

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

همچنین می‌توانید از جست‌وجوی predicate در iOS UI Automation در Appium برای دقیق‌تر کردن انتخاب عناصر استفاده کنید. برای جزئیات [اینجا](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md) را ببینید.

### رشته‌های predicate و class chainهای iOS XCUITest

با iOS 10 و بالاتر (با استفاده از درایور `XCUITest`)، می‌توانید از [رشته‌های predicate](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules) استفاده کنید:

```js
const selector = `type == 'XCUIElementTypeSwitch' && name CONTAINS 'Allow'`
const switch = await $(`-ios predicate string:${selector}`)
await switch.click()
```

و [class chainها](https://github.com/facebook/WebDriverAgent/wiki/Class-Chain-Queries-Construction-Rules):

```js
const selector = '**/XCUIElementTypeCell[`name BEGINSWITH "D"`]/**/XCUIElementTypeButton'
const button = await $(`-ios class chain:${selector}`)
await button.click()
```

### Accessibility ID

راهبرد locator `accessibility id` برای خواندن یک شناسه‌ی یکتا برای یک عنصر UI طراحی شده است. مزیت آن این است که در طول بومی‌سازی یا هر فرایند دیگری که ممکن است متن را تغییر دهد، تغییر نمی‌کند. علاوه بر این، اگر عناصری که از نظر عملکردی یکسان هستند accessibility id یکسانی داشته باشند، می‌تواند به ایجاد تست‌های چندسکویی کمک کند.

- برای iOS این همان `accessibility identifier` است که اپل [اینجا](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html) شرح داده است.
- برای اندروید، `accessibility id` به `content-description` عنصر نگاشت می‌شود، همان‌طور که [اینجا](https://developer.android.com/training/accessibility/accessible-app.html) توضیح داده شده است.

برای هر دو پلتفرم، دریافت یک عنصر (یا چند عنصر) بر اساس `accessibility id` آن‌ها معمولاً بهترین روش است. همچنین این روش نسبت به راهبرد منسوخ‌شده‌ی `name` ترجیح داده می‌شود.

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### نام کلاس

راهبرد `class name` یک `string` است که یک عنصر UI را در view فعلی نمایش می‌دهد.

- برای iOS این نام کامل یک [کلاس UIAutomation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) است و با `UIA-` آغاز می‌شود، مانند `UIATextField` برای یک فیلد متنی. مرجع کامل را می‌توانید [اینجا](https://developer.apple.com/library/ios/navigation/#section=Frameworks&topic=UIAutomation) بیابید.
- برای اندروید این نام کاملاً واجد شرایط یک [کلاس](https://developer.android.com/reference/android/widget/package-summary.html) [UI Automator](https://developer.android.com/tools/testing-support-library/index.html#UIAutomator) است، مانند `android.widget.EditText` برای یک فیلد متنی. مرجع کامل را می‌توانید [اینجا](https://developer.android.com/reference/android/widget/package-summary.html) بیابید.
- برای Youi.tv این نام کامل یک کلاس Youi.tv است و با `CYI-` آغاز می‌شود، مانند `CYIPushButtonView` برای یک عنصر دکمه‌ی فشاری. مرجع کامل را می‌توانید در [صفحه‌ی GitHub درایور You.i Engine](https://github.com/YOU-i-Labs/appium-youiengine-driver) بیابید

```js
// مثال iOS
await $('UIATextField').click()
// مثال اندروید
await $('android.widget.DatePicker').click()
// مثال Youi.tv
await $('CYIPushButtonView').click()
```

## انتخاب‌گرهای زنجیره‌ای

اگر می‌خواهید در کوئری خود دقیق‌تر باشید، می‌توانید انتخاب‌گرها را زنجیره‌وار به هم متصل کنید تا عنصر درست را پیدا کنید.
اگر `element` را پیش از دستور اصلی خود فراخوانی کنید، WebdriverIO کوئری را از آن عنصر آغاز می‌کند.

برای مثال، اگر ساختار DOM مانند زیر داشته باشید:

```html
<div class="row">
  <div class="entry">
    <label>Product A</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product B</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product C</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
</div>
```

و بخواهید محصول B را به سبد خرید اضافه کنید، انجام این کار تنها با استفاده از انتخاب‌گر CSS دشوار خواهد بود.

با زنجیره‌سازی انتخاب‌گرها، کار بسیار آسان‌تر است. کافی است عنصر مورد نظر را گام‌به‌گام محدود کنید:

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### انتخاب‌گر تصویر Appium

با استفاده از راهبرد locator `-image`، می‌توان یک فایل تصویری را که نمایانگر عنصری است که می‌خواهید به آن دسترسی داشته باشید، به Appium ارسال کرد.

قالب‌های فایل پشتیبانی‌شده: `jpg,png,gif,bmp,svg`

مرجع کامل را می‌توانید [اینجا](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md) بیابید

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**نکته**: نحوه‌ی کار Appium با این انتخاب‌گر به این صورت است که به‌طور داخلی یک اسکرین‌شات (از اپ) می‌گیرد و از انتخاب‌گر تصویر ارائه‌شده استفاده می‌کند
تا بررسی کند آیا عنصر در آن اسکرین‌شات (اپ) یافت می‌شود یا خیر.

به این نکته توجه داشته باشید که Appium ممکن است اندازه‌ی اسکرین‌شات (اپ) گرفته‌شده را تغییر دهد تا با اندازه‌ی CSS صفحه‌ی (اپ) شما مطابقت داشته باشد (این اتفاق
در آیفون‌ها و همچنین در دستگاه‌های Mac با نمایشگر Retina رخ می‌دهد، زیرا DPR بزرگ‌تر از ۱ است). این باعث می‌شود مطابقتی یافت نشود، زیرا
انتخاب‌گر تصویر ارائه‌شده ممکن است از اسکرین‌شات اصلی گرفته شده باشد.
می‌توانید این مشکل را با به‌روزرسانی تنظیمات سرور Appium برطرف کنید؛ برای تنظیمات، [مستندات Appium](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings)
و برای توضیح مفصل، [این نظر](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579) را ببینید.

## انتخاب‌گرهای React

WebdriverIO روشی برای انتخاب کامپوننت‌های React بر اساس نام کامپوننت فراهم می‌کند. برای این کار، دو دستور در اختیار دارید: `react$` و `react$$`.

این دستورها به شما امکان می‌دهند کامپوننت‌ها را از [React VirtualDOM](https://reactjs.org/docs/faq-internals.html) انتخاب کنید و یا یک Element واحد WebdriverIO یا آرایه‌ای از عناصر را (بسته به تابع مورد استفاده) برگردانید.

**نکته**: دستورهای `react$` و `react$$` از نظر عملکرد مشابه هستند، با این تفاوت که `react$$` *همه‌ی* نمونه‌های مطابق را به‌صورت آرایه‌ای از عناصر WebdriverIO برمی‌گرداند و `react$` اولین نمونه‌ی یافت‌شده را برمی‌گرداند.

این دستورها با React 16 تا 19 کار می‌کنند، برای اپلیکیشنی که با `createRoot` یا با `ReactDOM.render` آغاز می‌شود. آن‌ها کامپوننت‌های رندر فعلی را می‌خوانند، بنابراین کامپوننت‌هایی را که یک تغییر state اضافه کرده نیز پیدا می‌کنند. اگر React هنوز یک root از صفحه را رندر نکرده باشد، تا ۵ ثانیه برای آن منتظر می‌مانند.

#### مثال پایه

```jsx
// index.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'

function MyComponent() {
    return (
        <div>
            MyComponent
        </div>
    )
}

function App() {
    return (<MyComponent />)
}

createRoot(document.querySelector('#root')).render(<App />)
```

در کد بالا یک نمونه‌ی ساده از `MyComponent` درون اپلیکیشن وجود دارد که React آن را درون یک عنصر HTML با `id="root"` رندر می‌کند.

با دستور `browser.react$` می‌توانید یک نمونه از `MyComponent` را انتخاب کنید:

```js
const myCmp = await browser.react$('MyComponent')
```

اکنون که عنصر WebdriverIO را در متغیر `myCmp` ذخیره کرده‌اید، می‌توانید دستورهای عنصر را روی آن اجرا کنید.

#### فیلتر کردن کامپوننت‌ها

می‌توانید انتخاب خود را بر اساس props و/یا state کامپوننت فیلتر کنید. برای این کار، `props` و/یا `state` را در آرگومان دوم دستور ارسال کنید.

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent(props) {
    return (
        <div>
            Hello { props.name || 'World' }!
        </div>
    )
}

function App() {
    return (
        <div>
            <MyComponent name="WebdriverIO" />
            <MyComponent />
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

اگر بخواهید نمونه‌ای از `MyComponent` را انتخاب کنید که prop `name` آن برابر `WebdriverIO` است، می‌توانید دستور را به این صورت اجرا کنید:

```js
const myCmp = await browser.react$('MyComponent', {
    props: { name: 'WebdriverIO' }
})
```

اگر بخواهید انتخاب خود را بر اساس state فیلتر کنید، دستور `browser` چیزی شبیه به این خواهد بود:

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

یک فیلتر زمانی مطابقت دارد که هر یک از کلیدهای آن که کامپوننت نیز دارد، مطابقت داشته باشد. کلیدی که کامپوننت ندارد نادیده گرفته می‌شود. یک شیء تودرتو به همان روش مطابقت دارد، و یک آرایه زمانی مطابقت دارد که یک مقدار مشترک با آرایه‌ی کامپوننت داشته باشد. `null`، `false` و `0` با همان مقدار مطابقت دارند. برای یک کامپوننت تابعی با hookها، state همان state اولین hook (`useState` یا `useReducer`) است: اگر اولین hook، hook دیگری باشد، برای مثال `useRef`، فیلتر state مطابقت نخواهد داشت. با وجود هر دوی `props` و `state`، کامپوننت باید با هر دو مطابقت داشته باشد.

#### قواعد انتخاب‌گر

- `*` با یک یا چند کاراکتر مطابقت دارد: `browser.react$$('My*')` کامپوننت‌های `MyComponent` و `MyOtherComponent` را پیدا می‌کند.
- نام‌هایی که با فاصله از هم جدا شده‌اند، کامپوننتی را درون کامپوننت دیگر پیدا می‌کنند: `browser.react$$('List Item')` هر `Item` درون یک `List` را پیدا می‌کند.
- نام یک کامپوننت، `displayName` آن است، یا در غیر این صورت نام تابع یا کلاس آن. کامپوننتی از `React.memo` نام تابع خود را دارد (نسخه‌ی development در React 17 همچنین `displayName` شیء memo را به آن می‌دهد). کامپوننتی از `React.forwardRef` نامی ندارد، مگر اینکه `displayName` داشته باشد.
- برای یک کامپوننت مرتبه‌بالا (higher-order component) با نامی مانند `withRouter(MyComponent)`، نام درون پرانتز استفاده می‌شود: `MyComponent`.
- بدون محدوده‌ی عنصر، دستورها همه‌ی rootهای React صفحه را به ترتیب سند جست‌وجو می‌کنند، از جمله rootهای درون rootهای دیگر و rootهای درون shadow rootهای باز. `react$` اولین مورد مطابق را برمی‌گرداند. برای جست‌وجو فقط در یک root، دستور را روی container آن یا روی عنصری از آن root فراخوانی کنید: `$('#other-root').react$$('MyComponent')`.
- نتایج root به root می‌آیند. درون یک root، به ترتیب درخت کامپوننت و سطح به سطح می‌آیند، نه به ترتیب سند. `react$$` هر گره‌ی DOM را یک بار برمی‌گرداند.
- برای اپلیکیشنی درون یک فریم، دستور را روی browsing context فریم یا روی عنصری از فریم فراخوانی کنید: `(await page.frame({ selector: 'iframe' })).react$$('MyComponent')`.

محدودیت‌های شناخته‌شده:

- کامپوننتی که فقط متن رندر می‌کند، یک گره‌ی متنی برمی‌گرداند. با WebDriver Classic، یک گره‌ی متنی قابل بازگرداندن نیست و دستور با خطای `javascript error: circular reference` شکست می‌خورد.
- در حالی که React در حال hydrate کردن یک مرز `Suspense` از یک صفحه‌ی رندرشده در سرور است، کامپوننت‌های درون آن هنوز وجود ندارند. منتظر بمانید تا hydrate شدن صفحه به پایان برسد.

#### کار با `React.Fragment`

هنگام استفاده از دستور `react$` برای انتخاب [fragmentهای](https://reactjs.org/docs/fragments.html) React، WebdriverIO اولین فرزند آن کامپوننت را به‌عنوان گره‌ی کامپوننت برمی‌گرداند. اگر از `react$$` استفاده کنید، آرایه‌ای حاوی همه‌ی گره‌های HTML درون fragmentهایی که با انتخاب‌گر مطابقت دارند دریافت خواهید کرد.

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent() {
    return (
        <React.Fragment>
            <div>
                MyComponent
            </div>
            <div>
                MyComponent
            </div>
        </React.Fragment>
    )
}

function App() {
    return (<MyComponent />)
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

با توجه به مثال بالا، دستورها به این صورت کار می‌کنند:

```js
await browser.react$('MyComponent') // Element مربوط به WebdriverIO را برای اولین <div /> برمی‌گرداند
await browser.react$$('MyComponent') // Elementهای WebdriverIO را برای آرایه‌ی [<div />, <div />] برمی‌گرداند
```

**نکته:** اگر چندین نمونه از `MyComponent` داشته باشید و از `react$$` برای انتخاب این کامپوننت‌های fragment استفاده کنید، یک آرایه‌ی یک‌بعدی از همه‌ی گره‌ها به شما برگردانده می‌شود. به عبارت دیگر، اگر ۳ نمونه‌ی `<MyComponent />` داشته باشید، آرایه‌ای با شش عنصر WebdriverIO به شما برگردانده می‌شود.

## راهبردهای انتخاب‌گر سفارشی


اگر اپلیکیشن شما به روش خاصی برای دریافت عناصر نیاز دارد، می‌توانید خودتان یک راهبرد انتخاب‌گر سفارشی تعریف کنید که بتوانید با `custom$` و `custom$$` از آن استفاده کنید. برای این کار، راهبرد خود را یک بار در ابتدای تست ثبت کنید، مثلاً در یک hook `before`:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L3-L10
```

با فرض قطعه‌کد HTML زیر:

```html reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/example.html#L8-L12
```

سپس با فراخوانی زیر از آن استفاده کنید:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L16-L19
```

**نکته:** این فقط در محیط وبی کار می‌کند که در آن دستور [`execute`](/docs/api/browser/execute) قابل اجرا باشد.