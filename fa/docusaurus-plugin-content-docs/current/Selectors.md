---
id: selectors
title: انتخابگرها
description: "یافتن عناصر با CSS، متن، XPath، نام دسترسی‌پذیری، نقش ARIA و سایر راهبردهای انتخابگر، و آشنایی با اینکه کدام‌یک پایدارترند."
---

[پروتکل WebDriver](https://w3c.github.io/webdriver/) چندین راهبرد انتخابگر برای پیدا کردن یک عنصر ارائه می‌دهد. WebdriverIO این راهبردها را ساده‌سازی می‌کند تا انتخاب عناصر ساده بماند. لطفاً توجه داشته باشید که با وجود اینکه دستورات پیدا کردن عناصر `$` و `$$` نام دارند، هیچ ارتباطی با jQuery یا [موتور انتخابگر Sizzle](https://github.com/jquery/sizzle) ندارند.

با اینکه انتخابگرهای بسیار متنوعی در دسترس است، تنها تعداد کمی از آن‌ها روشی پایدار برای یافتن عنصر درست فراهم می‌کنند. برای مثال، دکمه‌ی زیر را در نظر بگیرید:

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

ما انتخابگرهای زیر را __توصیه می‌کنیم__ یا __توصیه نمی‌کنیم__:

| انتخابگر | توصیه‌شده | نکات |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 هرگز | بدترین - بیش از حد کلی، بدون زمینه. |
| `$('.btn.btn-large')` | 🚨 هرگز | بد. وابسته به استایل‌دهی. به شدت در معرض تغییر. |
| `$('#main')` | ⚠️ به ندرت | بهتر. اما همچنان وابسته به استایل‌دهی یا شنونده‌های رویداد JS. |
| `$(() => document.queryElement('button'))` | ⚠️ به ندرت | جستجوی مؤثر، اما نوشتن آن پیچیده است. |
| `$('button[name="submission"]')` | ⚠️ به ندرت | وابسته به ویژگی `name` که معنای HTML دارد. |
| `$('button[data-testid="submit"]')` | ✅ خوب | نیازمند ویژگی اضافی است و به a11y مرتبط نیست. |
| `$('aria/Submit')` | ✅ خوب | خوب. شبیه نحوه‌ی تعامل کاربر با صفحه است. توصیه می‌شود از فایل‌های ترجمه استفاده کنید تا تست‌هایتان با به‌روزرسانی ترجمه‌ها خراب نشوند. در نشست‌های WebDriver BiDi این انتخابگر از درخت دسترسی‌پذیری مرورگر استفاده می‌کند. در نشست‌های Classic به XPath بازمی‌گردد و ممکن است در صفحات بزرگ کندتر باشد. |
| `$('button=Submit')` | ✅ همیشه | بهترین. شبیه نحوه‌ی تعامل کاربر با صفحه است و سریع است. توصیه می‌شود از فایل‌های ترجمه استفاده کنید تا تست‌هایتان با به‌روزرسانی ترجمه‌ها خراب نشوند. |

## حالت سخت‌گیرانه (Strict Mode)

از نسخه‌ی v10، دستور [`$`](/docs/api/browser/$) __سخت‌گیرانه__ است: دقیقاً نمایانگر یک عنصر است. اگر انتخابگر با بیش از یک عنصر مطابقت داشته باشد، دستور به جای اینکه بی‌صدا اولین تطابق را انتخاب کند، خطای `StrictSelectorError` پرتاب می‌کند:

```js
// ۱۲ دکمه در صفحه وجود دارد
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
```

این همان رفتار [لوکیتورهای Playwright](https://playwright.dev/docs/locators#strictness) است. Cypress متفاوت است: پرس‌وجوهای آن ممکن است به چند عنصر منجر شوند و این دستورات عملیاتی مانند [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn) هستند که به طور پیش‌فرض یک موضوع چندعنصری را رد می‌کنند. حالت سخت‌گیرانه انتخابگرهایی را که بیش از حد گسترده‌اند آشکار می‌کند؛ انتخابگرهایی که در غیر این صورت به محض بزرگ‌تر شدن صفحه، بی‌صدا با عنصر اشتباه تعامل می‌کردند.

این قانون بر هر مرحله از یک [زنجیره](#chain-selectors) و بر هر نوع انتخابگری که `$` می‌پذیرد اعمال می‌شود — انتخابگرهای رشته‌ای (از جمله آن‌هایی که از shadow DOM عبور می‌کنند)، [توابع JS](#js-function)، [انتخابگرهای موبایل](#mobile-selectors) و ارجاع به [راهبردهای سفارشی](#custom-selector-strategies).

### چه چیزهایی تحت تأثیر قرار نمی‌گیرند

- `$$` همچنان صفر یا چند عنصر را به صورت یک [`ElementArray`](/docs/api/browser/$$) برمی‌گرداند. پیش از خواندن تعداد یا استفاده از `for...of`، روی لیست (یا `.length` آن) await کنید. `for await` مستقیماً روی لیست کار می‌کند.
- دستورات کمکی اختصاصی `custom$`، `shadow$` و `react$` سخت‌گیرانه نیستند — آن‌ها همچنان اولین تطابق خود را برمی‌گردانند، همان‌طور که همتایان `$$` آن‌ها نیز چنین هستند.
- انتخابگری که با هیچ چیز مطابقت ندارد همچنان یک عنصر با حل‌شدن تنبل (lazily-resolved) برمی‌گرداند، بنابراین رفتار [`waitForExist`](/docs/api/element/waitForExist) و [انتظار خودکار](/docs/autowait) بدون تغییر باقی می‌ماند.
- ارسال یک ارجاع به عنصر، مثلاً `$(await browser.getActiveElement())`، همیشه به یک گره‌ی واحد اشاره دارد و هرگز بررسی نمی‌شود.

:::info مهاجرت به v10

برای اطلاع از نحوه‌ی بررسی مجموعه‌ی تست خود از نظر نقض حالت سخت‌گیرانه، محدود کردن یا انصراف از پرس‌وجوهای منفرد، و غیرفعال کردن حالت سخت‌گیرانه در کل پروژه، [راهنمای مهاجرت v10](/docs/v10-migration) را ببینید.

:::

## انتخابگر پرس‌وجوی CSS

اگر خلاف آن مشخص نشده باشد، WebdriverIO عناصر را با استفاده از الگوی [انتخابگر CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) جستجو می‌کند، به عنوان مثال:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## متن پیوند

برای به دست آوردن یک عنصر anchor که متن مشخصی در آن وجود دارد، متن را با یک علامت مساوی (`=`) در ابتدای آن جستجو کنید.

برای مثال:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

می‌توانید این عنصر را با فراخوانی زیر جستجو کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## بخشی از متن پیوند

برای یافتن یک عنصر anchor که متن قابل مشاهده‌ی آن به طور جزئی با مقدار جستجوی شما مطابقت دارد،
آن را با استفاده از `*=` در ابتدای رشته‌ی پرس‌وجو جستجو کنید (مثلاً `*=driver`).

می‌توانید عنصر مثال بالا را با فراخوانی زیر نیز جستجو کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__توجه:__ نمی‌توانید چند راهبرد انتخابگر را در یک انتخابگر ترکیب کنید. برای رسیدن به همان هدف از چند پرس‌وجوی زنجیره‌ای عنصر استفاده کنید، به عنوان مثال:

```js
const elem = await $('header h1*=Welcome') // کار نمی‌کند!!!
// به جای آن از این استفاده کنید
const elem = await $('header').$('*=driver')
```

## عنصر با متن مشخص

همین تکنیک را می‌توان برای عناصر نیز به کار برد. علاوه بر این، امکان تطابق بدون حساسیت به حروف کوچک و بزرگ با استفاده از `.=` یا `.*=` در پرس‌وجو نیز وجود دارد.

برای مثال، این یک پرس‌وجو برای یک عنوان سطح ۱ با متن "Welcome to my Page" است:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

می‌توانید این عنصر را با فراخوانی زیر جستجو کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

یا با استفاده از جستجوی بخشی از متن:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

همین روش برای نام‌های `id` و `class` نیز کار می‌کند:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

می‌توانید این عنصر را با فراخوانی زیر جستجو کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__توجه:__ نمی‌توانید چند راهبرد انتخابگر را در یک انتخابگر ترکیب کنید. برای رسیدن به همان هدف از چند پرس‌وجوی زنجیره‌ای عنصر استفاده کنید، به عنوان مثال:

```js
const elem = await $('header h1*=Welcome') // کار نمی‌کند!!!
// به جای آن از این استفاده کنید
const elem = await $('header').$('h1*=Welcome')
```

## نام تگ

برای جستجوی یک عنصر با نام تگ مشخص، از `<tag>` یا `<tag />` استفاده کنید.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

می‌توانید این عنصر را با فراخوانی زیر جستجو کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## ویژگی Name

برای جستجوی عناصر با یک ویژگی name مشخص، از یک انتخابگر CSS مانند `[name="some-name"]` استفاده کنید. در یک نشست موبایل، همین شکل کوتاه با راهبرد لوکیتور `name` در Appium ارسال می‌شود:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__توجه:__ راهبرد لوکیتور `name` یک لوکیتور Appium است. نشست‌های دسکتاپ، `[name="some-name"]` را روی راهبرد CSS نگه می‌دارند.

## xPath

امکان جستجوی عناصر از طریق یک [xPath](https://developer.mozilla.org/en-US/docs/Web/XPath) مشخص نیز وجود دارد.

یک انتخابگر xPath قالبی مانند `//body/div[6]/div[1]/span[1]` دارد.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

می‌توانید پاراگراف دوم را با فراخوانی زیر جستجو کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

همچنین می‌توانید از xPath برای پیمایش به بالا و پایین درخت DOM استفاده کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## انتخابگر نام دسترسی‌پذیری

عناصر را بر اساس نام دسترسی‌پذیر (accessible name) آن‌ها جستجو کنید. نام دسترسی‌پذیر چیزی است که هنگام دریافت فوکوس توسط آن عنصر، صفحه‌خوان اعلام می‌کند. مقدار نام دسترسی‌پذیر می‌تواند هم محتوای بصری باشد و هم جایگزین‌های متنی پنهان.

در نشست‌های [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/) (کروم، اج، فایرفاکس و سایر مرورگرهای دارای قابلیت BiDi)، WebdriverIO ابتدا از [`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes) با یک لوکیتور دسترسی‌پذیری استفاده می‌کند. این روش مستقیماً درخت دسترسی‌پذیری مرورگر را جستجو می‌کند و معمولاً بسیار سریع‌تر از تقریب XPath است. اگر لوکیتور دسترسی‌پذیری چیزی پیدا نکند، WebdriverIO به روش اکتشافی XPath نسخه‌ی Classic بازمی‌گردد تا پرس‌وجوهای موجود `aria/` همچنان تطابق داشته باشند.

:::info

می‌توانید درباره‌ی این انتخابگر در [پست وبلاگ انتشار](/blog/2022/09/05/accessibility-selector) ما بیشتر بخوانید

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

## انتخابگر نقش

عناصر را بر اساس نقش ARIA و نام دسترسی‌پذیر آن‌ها جستجو کنید، همان‌طور که یک صفحه‌خوان آن‌ها را توصیف می‌کند: «دکمه‌ی *Add to cart*». ترکیب یک نقش با یک نام، حتی هنگام تغییر نام کلاس‌ها، شناسه‌های تست یا ساختار DOM نیز همچنان تطابق خواهد داشت.

```js
await $('role/button[name="Add to cart"]').click()
await expect($('role/heading[name="Order summary"]')).toBeDisplayed()

// فقط نقش
const rows = await $$('role/row')

// محدود به یک عنصر والد
const dialog = $('role/dialog[name="Checkout"]')
await dialog.$('role/button[name="Pay now"]').click()
```

نحو آن `role/<role>` یا `role/<role>[name="<accessible name>"]` است. نقل‌قول تکی نیز کار می‌کند، و یک نقل‌قول درون نام با یک بک‌اسلش escape می‌شود: `role/button[name="Say \"hi\""]`.

- نام باید با کل نام دسترسی‌پذیر مطابقت داشته باشد.
- نقش باید یک نقش ARIA باشد. یک اشتباه تایپی با نزدیک‌ترین نقش معتبر شکست می‌خورد، برای مثال `"buton" is not an ARIA role. Did you mean "button"?`.
- `img` و نام ARIA 1.3 آن یعنی `image` یک نقش یکسان هستند.
- این انتخابگر مانند هر انتخابگر دیگری از [حالت سخت‌گیرانه](#strict-mode)ی `$` پیروی می‌کند.

در یک نشست [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/)، WebdriverIO نقش و نام را به [`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes) ارسال می‌کند. مرورگر هر دو را خودش محاسبه می‌کند، به همان روشی که فناوری‌های کمکی صفحه را می‌بینند. عناصر درون shadow rootهای باز و درون فریم‌ها، از جمله فریم‌هایی از مبدأ دیگر، پیدا می‌شوند. اگر مرورگر هیچ عنصری پیدا نکند، هیچ بازگشتی به یک روش اکتشافی وجود ندارد. توجه داشته باشید که مرورگر نقش را تعیین می‌کند: برای مثال، یک `<table>` بدون سرستون یا عنوان می‌تواند یک جدول چیدمان (layout table) باشد و در این صورت ردیف‌های آن نقش `row` ندارند.

در یک نشست WebDriver Classic، و زمانی که مرورگر از لوکیتور نقش پشتیبانی نمی‌کند، WebdriverIO نقش و نام دسترسی‌پذیر را درون صفحه با [`dom-accessibility-api`](https://github.com/eps1lon/dom-accessibility-api) محاسبه می‌کند، همان پیاده‌سازی‌ای که Testing Library استفاده می‌کند. یک فیلد متنی بدون برچسب، مانند رفتار مرورگرها، با `placeholder` خود نام‌گذاری می‌شود. انتخابگر نقش در زمینه‌ی برنامه‌ی بومی موبایل در دسترس نیست. در آنجا از یک [accessibility id](#accessibility-id) استفاده کنید.

## ARIA - ویژگی Role

برای جستجوی عناصر بر اساس [نقش‌های ARIA](https://www.w3.org/TR/html-aria/#docconformance)، می‌توانید نقش عنصر را مستقیماً مانند `[role=button]` به عنوان پارامتر انتخابگر مشخص کنید. این انتخابگر نقش را از نام عنصر و ویژگی‌های آن تقریب می‌زند. [انتخابگر نقش](#role-selector) را ترجیح دهید، که از نقشی که مرورگر محاسبه می‌کند استفاده می‌کند و می‌تواند نام دسترسی‌پذیر را نیز تطبیق دهد:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## ویژگی ID

راهبرد لوکیتور "id" در پروتکل WebDriver پشتیبانی نمی‌شود؛ برای یافتن عناصر با استفاده از ID باید به جای آن از راهبردهای انتخابگر CSS یا xPath استفاده کرد.

با این حال برخی درایورها (مثلاً [Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)) ممکن است همچنان از این انتخابگر [پشتیبانی](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies) کنند.

نحوهای انتخابگر پشتیبانی‌شده‌ی فعلی برای ID عبارت‌اند از:

```js
//لوکیتور css
const button = await $('#someid')
//لوکیتور xpath
const button = await $('//*[@id="someid"]')
//راهبرد id
// توجه: فقط در Appium یا فریم‌ورک‌های مشابهی که از راهبرد لوکیتور "ID" پشتیبانی می‌کنند کار می‌کند
const button = await $('id=resource-id/iosname')
```

## تابع JS

همچنین می‌توانید از توابع جاوااسکریپت برای دریافت عناصر با استفاده از APIهای بومی وب استفاده کنید. البته، این کار را فقط می‌توانید درون یک زمینه‌ی وب انجام دهید (مثلاً `browser`، یا زمینه‌ی وب در موبایل).

ساختار HTML زیر را در نظر بگیرید:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

می‌توانید عنصر هم‌نیای `#elem` را به صورت زیر جستجو کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L139-L143
```

## انتخابگرهای عمیق

:::warning

از نسخه‌ی `v9` در WebdriverIO دیگر نیازی به این انتخابگر ویژه نیست، زیرا WebdriverIO به طور خودکار از Shadow DOM برای شما عبور می‌کند. توصیه می‌شود با حذف `>>>` از ابتدای آن، استفاده از این انتخابگر را کنار بگذارید.

:::

بسیاری از برنامه‌های فرانت‌اند به شدت به عناصری با [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) متکی هستند. از نظر فنی، جستجوی عناصر درون shadow DOM بدون راه‌حل‌های جایگزین غیرممکن است. [`shadow$`](https://webdriver.io/docs/api/element/shadow$) و [`shadow$$`](https://webdriver.io/docs/api/element/shadow$$) چنین راه‌حل‌هایی بوده‌اند که [محدودیت‌های](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow) خود را داشتند. با انتخابگر عمیق اکنون می‌توانید تمام عناصر درون هر shadow DOM را با استفاده از دستور پرس‌وجوی رایج جستجو کنید.

فرض کنید برنامه‌ای با ساختار زیر داریم:

![Chrome Example](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "Chrome Example")

با این انتخابگر می‌توانید عنصر `<button />` را که درون یک shadow DOM دیگر تودرتو شده است جستجو کنید، به عنوان مثال:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## انتخابگرهای موبایل

برای تست موبایل هیبریدی، مهم است که سرور خودکارسازی پیش از اجرای دستورات در *زمینه‌ی* درست قرار داشته باشد. برای خودکارسازی حرکات (gestures)، درایور در حالت ایده‌آل باید روی زمینه‌ی بومی (native) تنظیم شود. اما برای انتخاب عناصر از DOM، درایور باید روی زمینه‌ی webview پلتفرم تنظیم شود. *تنها در آن صورت* می‌توان از روش‌های ذکرشده در بالا استفاده کرد.

برای تست موبایل بومی، جابه‌جایی بین زمینه‌ها وجود ندارد، زیرا باید از راهبردهای موبایل استفاده کنید و مستقیماً از فناوری خودکارسازی زیربنایی دستگاه بهره ببرید. این امر به‌ویژه زمانی مفید است که یک تست به کنترل دقیق بر یافتن عناصر نیاز دارد.

### Android UiAutomator

فریم‌ورک UI Automator اندروید روش‌های متعددی برای یافتن عناصر فراهم می‌کند. می‌توانید از [UI Automator API](https://developer.android.com/tools/testing-support-library/index.html#uia-apis)، به‌ویژه [کلاس UiSelector](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector) برای یافتن عناصر استفاده کنید. در Appium شما کد جاوا را به صورت یک رشته به سرور ارسال می‌کنید، که آن را در محیط برنامه اجرا کرده و عنصر یا عناصر را برمی‌گرداند.

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

و به طور مشابه [View Matcher](https://developer.android.com/reference/android/support/test/espresso/ViewInteraction)

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

هنگام خودکارسازی یک برنامه‌ی iOS، می‌توان از [فریم‌ورک UI Automation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) اپل برای یافتن عناصر استفاده کرد.

این [API](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771) جاوااسکریپتی متدهایی برای دسترسی به view و هر چیزی که روی آن قرار دارد دارد.

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

همچنین می‌توانید از جستجوی predicate درون iOS UI Automation در Appium برای دقیق‌تر کردن انتخاب عناصر استفاده کنید. برای جزئیات [اینجا](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md) را ببینید.

### رشته‌های predicate و class chainهای iOS XCUITest

در iOS 10 و بالاتر (با استفاده از درایور `XCUITest`)، می‌توانید از [رشته‌های predicate](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules) استفاده کنید:

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

راهبرد لوکیتور `accessibility id` برای خواندن یک شناسه‌ی منحصربه‌فرد برای یک عنصر رابط کاربری طراحی شده است. مزیت آن این است که در طول بومی‌سازی یا هر فرایند دیگری که ممکن است متن را تغییر دهد، تغییر نمی‌کند. علاوه بر این، اگر عناصری که از نظر عملکردی یکسان هستند accessibility id یکسانی داشته باشند، می‌تواند در ایجاد تست‌های چندسکویی کمک کند.

- برای iOS این همان `accessibility identifier` است که اپل [اینجا](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html) شرح داده است.
- برای اندروید، `accessibility id` به `content-description` عنصر نگاشت می‌شود، همان‌طور که [اینجا](https://developer.android.com/training/accessibility/accessible-app.html) توضیح داده شده است.

برای هر دو پلتفرم، دریافت یک عنصر (یا چند عنصر) بر اساس `accessibility id` آن‌ها معمولاً بهترین روش است. همچنین روش ترجیحی نسبت به راهبرد منسوخ‌شده‌ی `name` است.

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### Class Name

راهبرد `class name` یک `string` است که نمایانگر یک عنصر رابط کاربری در view فعلی است.

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

## انتخابگرهای زنجیره‌ای

اگر می‌خواهید در پرس‌وجوی خود دقیق‌تر باشید، می‌توانید انتخابگرها را زنجیره کنید تا عنصر درست را
پیدا کنید. اگر `element` را پیش از دستور اصلی خود فراخوانی کنید، WebdriverIO پرس‌وجو را از آن عنصر آغاز می‌کند.

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

و بخواهید محصول B را به سبد خرید اضافه کنید، انجام این کار تنها با استفاده از انتخابگر CSS دشوار خواهد بود.

با زنجیره کردن انتخابگرها، کار بسیار آسان‌تر است. کافی است عنصر مورد نظر را گام به گام محدود کنید:

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### انتخابگر تصویر Appium

با استفاده از راهبرد لوکیتور `-image`، می‌توان یک فایل تصویری را که نمایانگر عنصر مورد نظر شما برای دسترسی است به Appium ارسال کرد.

قالب‌های فایل پشتیبانی‌شده `jpg,png,gif,bmp,svg`

مرجع کامل را می‌توانید [اینجا](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md) بیابید

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**توجه**: نحوه‌ی کار Appium با این انتخابگر این است که به صورت داخلی یک اسکرین‌شات (از برنامه) می‌گیرد و از انتخابگر تصویر ارائه‌شده
برای بررسی اینکه آیا عنصر در آن اسکرین‌شات (برنامه) یافت می‌شود یا نه استفاده می‌کند.

به این واقعیت آگاه باشید که Appium ممکن است اندازه‌ی اسکرین‌شات (برنامه)ی گرفته‌شده را تغییر دهد تا با اندازه‌ی CSS صفحه‌ی (برنامه)ی شما مطابقت داشته باشد (این اتفاق
در آیفون‌ها و همچنین در دستگاه‌های مک با نمایشگر Retina رخ می‌دهد، زیرا DPR بزرگ‌تر از ۱ است). این امر منجر به یافت نشدن تطابق می‌شود، زیرا
ممکن است انتخابگر تصویر ارائه‌شده از اسکرین‌شات اصلی گرفته شده باشد.
می‌توانید این مشکل را با به‌روزرسانی تنظیمات سرور Appium برطرف کنید؛ برای تنظیمات، [مستندات Appium](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings)
و برای توضیح دقیق، [این نظر](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579) را ببینید.

## انتخابگرهای React

WebdriverIO روشی برای انتخاب کامپوننت‌های React بر اساس نام کامپوننت فراهم می‌کند. برای این کار، دو دستور در اختیار دارید: `react$` و `react$$`.

این دستورات به شما امکان می‌دهند کامپوننت‌ها را از [React VirtualDOM](https://reactjs.org/docs/faq-internals.html) انتخاب کنید و بسته به تابعی که استفاده می‌شود، یا یک عنصر WebdriverIO واحد یا آرایه‌ای از عناصر را برگردانید.

**توجه**: دستورات `react$` و `react$$` از نظر عملکرد مشابه هستند، با این تفاوت که `react$$` *تمام* نمونه‌های منطبق را به صورت آرایه‌ای از عناصر WebdriverIO برمی‌گرداند و `react$` اولین نمونه‌ی یافت‌شده را برمی‌گرداند.

این دستورات با React 16 تا 19 کار می‌کنند، برای برنامه‌ای که با `createRoot` یا با `ReactDOM.render` آغاز می‌شود. آن‌ها کامپوننت‌های رندر فعلی را می‌خوانند، بنابراین کامپوننت‌هایی را که یک تغییر state اضافه کرده نیز پیدا می‌کنند. اگر React هنوز یک ریشه از صفحه را رندر نکرده باشد، تا ۵ ثانیه برای آن صبر می‌کنند.

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

در کد بالا یک نمونه‌ی ساده‌ی `MyComponent` درون برنامه وجود دارد که React آن را درون یک عنصر HTML با `id="root"` رندر می‌کند.

با دستور `browser.react$` می‌توانید یک نمونه از `MyComponent` را انتخاب کنید:

```js
const myCmp = await browser.react$('MyComponent')
```

اکنون که عنصر WebdriverIO را در متغیر `myCmp` ذخیره کرده‌اید، می‌توانید دستورات عنصر را روی آن اجرا کنید.

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

اگر می‌خواهید نمونه‌ای از `MyComponent` را انتخاب کنید که prop `name` آن برابر `WebdriverIO` است، می‌توانید دستور را به این شکل اجرا کنید:

```js
const myCmp = await browser.react$('MyComponent', {
    props: { name: 'WebdriverIO' }
})
```

اگر می‌خواستید انتخاب خود را بر اساس state فیلتر کنید، دستور `browser` چیزی شبیه به این خواهد بود:

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

یک فیلتر زمانی تطابق دارد که هر یک از کلیدهای آن که کامپوننت نیز دارد، تطابق داشته باشد. کلیدی که کامپوننت آن را ندارد نادیده گرفته می‌شود. یک شیء تودرتو به همین روش تطابق دارد، و یک آرایه زمانی تطابق دارد که یک مقدار مشترک با آرایه‌ی کامپوننت داشته باشد. `null`، `false` و `0` با همان مقدار تطابق دارند. برای یک کامپوننت تابعی با hookها، state همان state اولین hook (`useState` یا `useReducer`) است: اگر اولین hook، hook دیگری باشد، برای مثال `useRef`، فیلتر state تطابق نخواهد داشت. با وجود هر دوی `props` و `state`، کامپوننت باید با هر دو تطابق داشته باشد.

#### قوانین انتخابگر

- `*` با یک یا چند کاراکتر تطابق دارد: `browser.react$$('My*')`، `MyComponent` و `MyOtherComponent` را پیدا می‌کند.
- نام‌هایی که با فاصله از هم جدا شده‌اند، یک کامپوننت را درون کامپوننت دیگر پیدا می‌کنند: `browser.react$$('List Item')` هر `Item` درون یک `List` را پیدا می‌کند.
- نام یک کامپوننت `displayName` آن است، یا در غیر این صورت نام تابع یا کلاس آن. یک کامپوننت `React.memo` نام تابع خود را دارد (نسخه‌ی توسعه‌ی React 17 نیز `displayName` شیء memo را به آن می‌دهد). یک کامپوننت `React.forwardRef` نامی ندارد، مگر اینکه یک `displayName` داشته باشد.
- برای یک کامپوننت مرتبه‌بالاتر با نامی مانند `withRouter(MyComponent)`، نام درون پرانتز استفاده می‌شود: `MyComponent`.
- بدون محدوده‌ی عنصر، دستورات تمام ریشه‌های React صفحه را به ترتیب سند جستجو می‌کنند، از جمله ریشه‌های درون ریشه‌های دیگر و ریشه‌های درون shadow rootهای باز. `react$` اولین تطابق را برمی‌گرداند. برای جستجو فقط در یک ریشه، دستور را روی کانتینر آن یا روی یکی از عناصر آن ریشه فراخوانی کنید: `$('#other-root').react$$('MyComponent')`.
- نتایج ریشه به ریشه می‌آیند. در یک ریشه، به ترتیب درخت کامپوننت، سطح به سطح می‌آیند، نه به ترتیب سند. `react$$` هر گره‌ی DOM را یک بار برمی‌گرداند.
- برای برنامه‌ای که در یک فریم است، دستور را روی browsing context فریم یا روی یکی از عناصر فریم فراخوانی کنید: `(await page.frame({ selector: 'iframe' })).react$$('MyComponent')`.

محدودیت‌های شناخته‌شده:

- کامپوننتی که فقط متن رندر می‌کند یک گره‌ی متنی برمی‌گرداند. با WebDriver Classic، یک گره‌ی متنی قابل بازگرداندن نیست و دستور با خطای `javascript error: circular reference` شکست می‌خورد.
- در حالی که React یک مرز `Suspense` از یک صفحه‌ی رندرشده در سرور را hydrate می‌کند، کامپوننت‌های درون آن هنوز وجود ندارند. صبر کنید تا hydrate شدن صفحه به پایان برسد.

#### کار با `React.Fragment`

هنگام استفاده از دستور `react$` برای انتخاب [fragmentهای](https://reactjs.org/docs/fragments.html) React، WebdriverIO اولین فرزند آن کامپوننت را به عنوان گره‌ی کامپوننت برمی‌گرداند. اگر از `react$$` استفاده کنید، آرایه‌ای حاوی تمام گره‌های HTML درون fragmentهایی که با انتخابگر تطابق دارند دریافت خواهید کرد.

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

با توجه به مثال بالا، دستورات به این شکل کار می‌کنند:

```js
await browser.react$('MyComponent') // عنصر WebdriverIO مربوط به اولین <div /> را برمی‌گرداند
await browser.react$$('MyComponent') // عناصر WebdriverIO مربوط به آرایه‌ی [<div />, <div />] را برمی‌گرداند
```

**توجه:** اگر چند نمونه از `MyComponent` داشته باشید و از `react$$` برای انتخاب این کامپوننت‌های fragment استفاده کنید، آرایه‌ای یک‌بعدی از تمام گره‌ها به شما برگردانده می‌شود. به عبارت دیگر، اگر ۳ نمونه‌ی `<MyComponent />` داشته باشید، آرایه‌ای با شش عنصر WebdriverIO به شما برگردانده می‌شود.

## راهبردهای انتخابگر سفارشی


اگر برنامه‌ی شما به روش خاصی برای دریافت عناصر نیاز دارد، می‌توانید خودتان یک راهبرد انتخابگر سفارشی تعریف کنید که بتوانید با `custom$` و `custom$$` از آن استفاده کنید. برای این کار، راهبرد خود را یک بار در ابتدای تست ثبت کنید، مثلاً در یک هوک `before`:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L3-L10
```

قطعه‌ی HTML زیر را در نظر بگیرید:

```html reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/example.html#L8-L12
```

سپس با فراخوانی زیر از آن استفاده کنید:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L16-L19
```

**توجه:** این فقط در یک محیط وب کار می‌کند که در آن دستور [`execute`](/docs/api/browser/execute) قابل اجرا باشد.