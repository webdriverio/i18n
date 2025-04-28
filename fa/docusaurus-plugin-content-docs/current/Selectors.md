---
id: selectors
title: انتخابگرها
---

[پروتکل WebDriver](https://w3c.github.io/webdriver/) چندین استراتژی انتخابگر را برای پرس و جوی یک عنصر فراهم می‌کند. WebdriverIO آنها را ساده می‌کند تا انتخاب عناصر ساده باشد. لطفاً توجه داشته باشید که حتی اگر دستور برای پرس و جوی عناصر `$` و `$$` نامیده می‌شود، آنها هیچ ارتباطی با jQuery یا [Sizzle Selector Engine](https://github.com/jquery/sizzle) ندارند.

در حالی که انتخابگرهای مختلفی در دسترس هستند، تنها تعداد کمی از آنها روشی انعطاف‌پذیر برای یافتن عنصر مناسب ارائه می‌دهند. به عنوان مثال، با توجه به دکمه زیر:

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

ما **توصیه می‌کنیم** و **توصیه نمی‌کنیم** انتخابگرهای زیر را:

| انتخابگر | توصیه شده | یادداشت‌ها |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 هرگز | بدترین - خیلی عمومی، بدون زمینه. |
| `$('.btn.btn-large')` | 🚨 هرگز | بد. مرتبط با استایل. شدیداً مستعد تغییر. |
| `$('#main')` | ⚠️ به ندرت | بهتر. اما هنوز مرتبط با استایل یا شنوندگان رویداد JS. |
| `$(() => document.queryElement('button'))` | ⚠️ به ندرت | پرس و جوی موثر، پیچیده برای نوشتن. |
| `$('button[name="submission"]')` | ⚠️ به ندرت | مرتبط با ویژگی `name` که دارای معنای HTML است. |
| `$('button[data-testid="submit"]')` | ✅ خوب | نیاز به ویژگی اضافی دارد، به a11y متصل نیست. |
| `$('aria/Submit')` یا `$('button=Submit')` | ✅ همیشه | بهترین. شبیه به نحوه تعامل کاربر با صفحه است. توصیه می‌شود از فایل‌های ترجمه فرانت‌اند خود استفاده کنید تا آزمون‌های شما هرگز هنگام به‌روزرسانی ترجمه‌ها با خطا مواجه نشوند |

## انتخابگر پرس و جوی CSS

اگر به گونه دیگری مشخص نشده باشد، WebdriverIO عناصر را با استفاده از الگوی [انتخابگر CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) پرس و جو می‌کند، به عنوان مثال:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## متن لینک

برای دریافت یک عنصر لنگر با متن خاصی در آن، متن را با علامت مساوی (`=`) شروع کنید.

به عنوان مثال:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

شما می‌توانید این عنصر را با فراخوانی زیر پرس و جو کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## متن لینک جزئی

برای یافتن یک عنصر لنگر که متن قابل مشاهده آن به طور جزئی با مقدار جستجوی شما مطابقت دارد،
آن را با استفاده از `*=` در جلوی رشته پرس و جو (مثلاً `*=driver`) پرس و جو کنید.

شما می‌توانید عنصر را از مثال بالا با فراخوانی زیر نیز پرس و جو کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__نکته:__ شما نمی‌توانید چندین استراتژی انتخابگر را در یک انتخابگر ترکیب کنید. برای رسیدن به همان هدف، از چندین پرس و جوی عنصر زنجیره‌ای استفاده کنید، مثلاً:

```js
const elem = await $('header h1*=Welcome') // کار نمی‌کند!!!
// به جای آن از این استفاده کنید
const elem = await $('header').$('*=driver')
```

## عنصر با متن خاص

همین تکنیک را می‌توان برای عناصر نیز به کار برد. علاوه بر این، امکان انجام تطبیق بدون توجه به حروف بزرگ و کوچک با استفاده از `.=` یا `.*=` در پرس و جو نیز وجود دارد.

به عنوان مثال، اینجا یک پرس و جو برای یک عنوان سطح 1 با متن "Welcome to my Page" است:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

شما می‌توانید این عنصر را با فراخوانی زیر پرس و جو کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

یا با استفاده از پرس و جوی متن جزئی:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

همین موضوع برای نام‌های `id` و `class` نیز صادق است:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

شما می‌توانید این عنصر را با فراخوانی زیر پرس و جو کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__نکته:__ شما نمی‌توانید چندین استراتژی انتخابگر را در یک انتخابگر ترکیب کنید. برای رسیدن به همان هدف، از چندین پرس و جوی عنصر زنجیره‌ای استفاده کنید، مثلاً:

```js
const elem = await $('header h1*=Welcome') // کار نمی‌کند!!!
// به جای آن از این استفاده کنید
const elem = await $('header').$('h1*=Welcome')
```

## نام تگ

برای پرس و جوی یک عنصر با نام تگ خاص، از `<tag>` یا `<tag />` استفاده کنید.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

شما می‌توانید این عنصر را با فراخوانی زیر پرس و جو کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## ویژگی نام

برای پرس و جوی عناصر با ویژگی نام خاص، می‌توانید از یک انتخابگر CSS3 معمولی یا استراتژی نام ارائه شده از [JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol) با ارسال چیزی مانند [name="some-name"] به عنوان پارامتر انتخابگر استفاده کنید:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__نکته:__ این استراتژی انتخابگر منسوخ شده است و فقط در مرورگرهای قدیمی که توسط پروتکل JSONWireProtocol اجرا می‌شوند یا با استفاده از Appium کار می‌کند.

## xPath

همچنین امکان پرس و جوی عناصر از طریق یک [xPath](https://developer.mozilla.org/en-US/docs/Web/XPath) خاص وجود دارد.

یک انتخابگر xPath فرمتی مانند `//body/div[6]/div[1]/span[1]` دارد.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

شما می‌توانید پاراگراف دوم را با فراخوانی زیر پرس و جو کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

شما می‌توانید از xPath برای پیمایش به بالا و پایین درخت DOM نیز استفاده کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## انتخابگر نام دسترسی‌پذیری

پرس و جوی عناصر براساس نام دسترسی‌پذیری آنها. نام دسترسی‌پذیری چیزی است که توسط یک صفحه‌خوان هنگامی که آن عنصر تمرکز دریافت می‌کند، اعلام می‌شود. مقدار نام دسترسی‌پذیری می‌تواند هم محتوای بصری و هم متن‌های جایگزین پنهان باشد.

:::info

شما می‌توانید درباره این انتخابگر در [پست وبلاگ انتشار](/blog/2022/09/05/accessibility-selector) ما بیشتر بخوانید

:::

### دریافت با `aria-label`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L1
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L86-L87
```

### دریافت با `aria-labelledby`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L2-L3
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L93-L94
```

### دریافت با محتوا

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L4
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L100-L101
```

### دریافت با عنوان

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L5
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L107-L108
```

### دریافت با ویژگی `alt`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L114-L115
```

## ARIA - ویژگی نقش

برای پرس و جوی عناصر بر اساس [نقش‌های ARIA](https://www.w3.org/TR/html-aria/#docconformance)، می‌توانید مستقیماً نقش عنصر را مانند `[role=button]` به عنوان پارامتر انتخابگر مشخص کنید:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## ویژگی ID

استراتژی مکان‌یاب "id" در پروتکل WebDriver پشتیبانی نمی‌شود، باید از استراتژی‌های انتخابگر CSS یا xPath به جای آن برای یافتن عناصر با استفاده از ID استفاده کرد.

با این حال، برخی از درایورها (مانند [Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)) ممکن است هنوز از این انتخابگر [پشتیبانی](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies) کنند.

نحوه نوشتار فعلی پشتیبانی شده برای ID عبارتند از:

```js
//مکان‌یاب css
const button = await $('#someid')
//مکان‌یاب xpath
const button = await $('//*[@id="someid"]')
//استراتژی id
// نکته: فقط در Appium یا چارچوب‌های مشابه که از استراتژی مکان‌یاب "ID" پشتیبانی می‌کنند، کار می‌کند
const button = await $('id=resource-id/iosname')
```

## تابع JS

شما همچنین می‌توانید از توابع JavaScript برای دریافت عناصر با استفاده از APIهای بومی وب استفاده کنید. البته، فقط می‌توانید این کار را در یک زمینه وب (مثلاً `browser`، یا زمینه وب در موبایل) انجام دهید.

با توجه به ساختار HTML زیر:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

شما می‌توانید عنصر همسایه `#elem` را به صورت زیر پرس و جو کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L139-L143
```

## انتخابگرهای عمیق

:::warning

از نسخه `v9` WebdriverIO، نیازی به این انتخابگر خاص نیست زیرا WebdriverIO به طور خودکار از Shadow DOM عبور می‌کند. توصیه می‌شود با حذف `>>>` از جلوی آن، از این انتخابگر مهاجرت کنید.

:::

بسیاری از برنامه‌های فرانت‌اند به شدت به عناصر با [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) متکی هستند. پرس و جوی عناصر درون shadow DOM بدون راه‌حل‌های موقت از لحاظ فنی غیرممکن است. [`shadow$`](https://webdriver.io/docs/api/element/shadow$) و [`shadow$$`](https://webdriver.io/docs/api/element/shadow$$) چنین راه‌حل‌های موقتی بودند که [محدودیت‌های](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow) خود را داشتند. با انتخابگر عمیق، اکنون می‌توانید همه عناصر درون هر shadow DOM را با استفاده از دستور پرس و جوی معمولی، پرس و جو کنید.

با فرض اینکه برنامه‌ای با ساختار زیر داریم:

![Chrome Example](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "Chrome Example")

با این انتخابگر می‌توانید عنصر `<button />` را که در shadow DOM دیگری قرار دارد، پرس و جو کنید، مثلاً:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## انتخابگرهای موبایل

برای آزمایش موبایل هیبریدی، مهم است که سرور اتوماسیون قبل از اجرای دستورات در *زمینه* صحیح باشد. برای خودکارسازی حرکات، درایور در حالت ایده‌آل باید در زمینه بومی تنظیم شود. اما برای انتخاب عناصر از DOM، درایور باید در زمینه webview پلتفرم تنظیم شود. فقط *سپس* می‌توان از روش‌های ذکر شده در بالا استفاده کرد.

برای آزمایش موبایل بومی، تغییری بین زمینه‌ها وجود ندارد، زیرا باید از استراتژی‌های موبایل استفاده کنید و مستقیماً از فناوری خودکارسازی دستگاه اصلی استفاده کنید. این به ویژه زمانی مفید است که یک آزمون به کنترل دقیق در یافتن عناصر نیاز دارد.

### Android UiAutomator

چارچوب UI Automator اندروید چندین روش برای یافتن عناصر ارائه می‌دهد. شما می‌توانید از [UI Automator API](https://developer.android.com/tools/testing-support-library/index.html#uia-apis)، به ویژه از کلاس [UiSelector](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector) برای مکان‌یابی عناصر استفاده کنید. در Appium، شما کد جاوا را به عنوان یک رشته به سرور ارسال می‌کنید، که آن را در محیط برنامه اجرا می‌کند و عنصر یا عناصر را برمی‌گرداند.

```js
const selector = 'new UiSelector().text("Cancel").className("android.widget.Button")'
const button = await $(`android=${selector}`)
await button.click()
```

### Android DataMatcher و ViewMatcher (فقط Espresso)

استراتژی DataMatcher اندروید روشی برای یافتن عناصر با [Data Matcher](https://developer.android.com/reference/android/support/test/espresso/DataInteraction) ارائه می‌دهد

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

استراتژی view tag روشی مناسب برای یافتن عناصر با [تگ](https://developer.android.com/reference/android/support/test/espresso/matcher/ViewMatchers.html#withTagValue%28org.hamcrest.Matcher%3Cjava.lang.Object%3E%29) آنها ارائه می‌دهد.

```js
const elem = await $('-android viewtag:tag_identifier')
await elem.click()
```

### iOS UIAutomation

هنگام خودکارسازی یک برنامه iOS، می‌توان از چارچوب [UI Automation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) اپل برای یافتن عناصر استفاده کرد.

این [API](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771) جاوااسکریپت روش‌هایی برای دسترسی به نما و همه چیز روی آن ارائه می‌دهد.

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

همچنین می‌توانید از جستجوی predicate در iOS UI Automation در Appium برای بهبود بیشتر انتخاب عناصر استفاده کنید. برای جزئیات بیشتر [اینجا](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md) را ببینید.

### رشته‌های predicate و زنجیره‌های کلاس iOS XCUITest

با iOS 10 و بالاتر (با استفاده از درایور `XCUITest`)، می‌توانید از [رشته‌های predicate](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules) استفاده کنید:

```js
const selector = `type == 'XCUIElementTypeSwitch' && name CONTAINS 'Allow'`
const switch = await $(`-ios predicate string:${selector}`)
await switch.click()
```

و [زنجیره‌های کلاس](https://github.com/facebook/WebDriverAgent/wiki/Class-Chain-Queries-Construction-Rules):

```js
const selector = '**/XCUIElementTypeCell[`name BEGINSWITH "D"`]/**/XCUIElementTypeButton'
const button = await $(`-ios class chain:${selector}`)
await button.click()
```

### Accessibility ID

استراتژی مکان‌یاب `accessibility id` برای خواندن یک شناسه منحصر به فرد برای یک عنصر UI طراحی شده است. این مزیت را دارد که در طول محلی‌سازی یا هر فرآیند دیگری که ممکن است متن را تغییر دهد، تغییر نمی‌کند. علاوه بر این، می‌تواند در ایجاد آزمون‌های چند پلتفرمی کمک کند، اگر عناصری که از نظر عملکردی یکسان هستند، همان شناسه دسترسی‌پذیری را داشته باشند.

- برای iOS این `accessibility identifier` است که توسط اپل [اینجا](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html) تعیین شده است.
- برای اندروید `accessibility id` به `content-description` برای عنصر نگاشت می‌شود، همانطور که [اینجا](https://developer.android.com/training/accessibility/accessible-app.html) توضیح داده شده است.

برای هر دو پلتفرم، دریافت یک عنصر (یا چندین عنصر) با `accessibility id` آنها معمولاً بهترین روش است. همچنین روش ترجیحی نسبت به استراتژی `name` منسوخ شده است.

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### نام کلاس

استراتژی `class name` یک `string` است که یک عنصر UI را در نمای فعلی نشان می‌دهد.

- برای iOS، نام کامل یک [کلاس UIAutomation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) است و با `UIA-` شروع می‌شود، مانند `UIATextField` برای یک فیلد متنی. مرجع کامل را می‌توان [اینجا](https://developer.apple.com/library/ios/navigation/#section=Frameworks&topic=UIAutomation) یافت.
- برای اندروید، نام کاملاً واجد شرایط یک [UI Automator](https://developer.android.com/tools/testing-support-library/index.html#UIAutomator) [class](https://developer.android.com/reference/android/widget/package-summary.html) است، مانند `android.widget.EditText` برای یک فیلد متنی. مرجع کامل را می‌توان [اینجا](https://developer.android.com/reference/android/widget/package-summary.html) یافت.
- برای Youi.tv، نام کامل یک کلاس Youi.tv است و با `CYI-` شروع می‌شود، مانند `CYIPushButtonView` برای یک عنصر دکمه فشاری. مرجع کامل را می‌توان در [صفحه GitHub درایور You.i Engine](https://github.com/YOU-i-Labs/appium-youiengine-driver) یافت.

```js
// مثال iOS
await $('UIATextField').click()
// مثال اندروید
await $('android.widget.DatePicker').click()
// مثال Youi.tv
await $('CYIPushButtonView').click()
```

## انتخابگرهای زنجیره‌ای

اگر می‌خواهید در پرس و جوی خود دقیق‌تر باشید، می‌توانید انتخابگرها را زنجیر کنید تا عنصر مناسب را پیدا کنید. اگر قبل از دستور واقعی خود `element` را فراخوانی کنید، WebdriverIO پرس و جو را از آن عنصر شروع می‌کند.

به عنوان مثال، اگر ساختار DOM مانند زیر دارید:

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

و می‌خواهید محصول B را به سبد خرید اضافه کنید، انجام این کار فقط با استفاده از انتخابگر CSS دشوار خواهد بود.

با زنجیره‌سازی انتخابگر، این کار بسیار آسان‌تر است. به سادگی عنصر مورد نظر را قدم به قدم محدود کنید:

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### انتخابگر تصویر Appium

با استفاده از استراتژی مکان‌یابی `-image`، امکان ارسال یک فایل تصویری به Appium که نشان‌دهنده عنصری است که می‌خواهید به آن دسترسی پیدا کنید، وجود دارد.

فرمت‌های فایل پشتیبانی شده `jpg,png,gif,bmp,svg`

مرجع کامل را می‌توان [اینجا](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md) یافت

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**نکته**: نحوه کار Appium با این انتخابگر این است که به طور داخلی یک (app)screenshot می‌گیرد و از انتخابگر تصویر ارائه شده برای تأیید اینکه آیا عنصر می‌تواند در آن (app)screenshot یافت شود، استفاده می‌کند.

توجه داشته باشید که Appium ممکن است (app)screenshot گرفته شده را تغییر اندازه دهد تا با اندازه CSS صفحه (app) شما مطابقت داشته باشد (این اتفاق در آیفون‌ها و همچنین در دستگاه‌های Mac با نمایشگر Retina رخ می‌دهد زیرا DPR بزرگتر از 1 است). این باعث می‌شود که تطابقی پیدا نشود زیرا انتخابگر تصویر ارائه شده ممکن است از screenshot اصلی گرفته شده باشد.
شما می‌توانید این مشکل را با به‌روزرسانی تنظیمات سرور Appium برطرف کنید، به [مستندات Appium](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings) برای تنظیمات و [این نظر](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579) برای توضیحات دقیق مراجعه کنید.

## انتخابگرهای React

WebdriverIO روشی برای انتخاب کامپوننت‌های React بر اساس نام کامپوننت ارائه می‌دهد. برای انجام این کار، شما می‌توانید از دو دستور انتخاب کنید: `react$` و `react$$`.

این دستورات به شما امکان می‌دهند کامپوننت‌ها را از [React VirtualDOM](https://reactjs.org/docs/faq-internals.html) انتخاب کنید و یا یک عنصر WebdriverIO منفرد یا آرایه‌ای از عناصر را (بسته به اینکه از کدام تابع استفاده می‌کنید) برگردانید.

**نکته**: دستورات `react$` و `react$$` از نظر عملکرد مشابه هستند، با این تفاوت که `react$$` *همه* نمونه‌های مطابق را به عنوان آرایه‌ای از عناصر WebdriverIO برمی‌گرداند، و `react$` اولین نمونه یافت شده را برمی‌گرداند.

#### مثال پایه

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

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

ReactDOM.render(<App />, document.querySelector('#root'))
```

در کد بالا یک نمونه ساده `MyComponent` درون برنامه وجود دارد، که React آن را درون یک عنصر HTML با `id="root"` رندر می‌کند.

با دستور `browser.react$`، می‌توانید یک نمونه از `MyComponent` را انتخاب کنید:

```js
const myCmp = await browser.react$('MyComponent')
```

حالا که عنصر WebdriverIO را در متغیر `myCmp` ذخیره کرده‌اید، می‌توانید دستورات عنصر را در مقابل آن اجرا کنید.

#### فیلتر کردن کامپوننت‌ها

کتابخانه‌ای که WebdriverIO به صورت داخلی استفاده می‌کند، امکان فیلتر کردن انتخاب شما را بر اساس props و/یا state کامپوننت فراهم می‌کند. برای انجام این کار، باید یک آرگومان دوم برای props و/یا یک آرگومان سوم برای state به دستور مرورگر ارسال کنید.

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

اگر می‌خواهید نمونه `MyComponent` را که دارای prop `name` با مقدار `WebdriverIO` است انتخاب کنید، می‌توانید دستور را به صورت زیر اجرا کنید:

```js
const myCmp = await browser.react$('MyComponent', {
    props: { name: 'WebdriverIO' }
})
```

اگر می‌خواهید انتخاب خود را بر اساس state فیلتر کنید، دستور `browser` به شکل زیر خواهد بود:

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

#### استفاده از `React.Fragment`

هنگام استفاده از دستور `react$` برای انتخاب [قطعات](https://reactjs.org/docs/fragments.html) React، WebdriverIO اولین فرزند آن کامپوننت را به عنوان گره کامپوننت برمی‌گرداند. اگر از `react$$` استفاده کنید، آرایه‌ای شامل تمام گره‌های HTML درون قطعات که با انتخابگر مطابقت دارند دریافت خواهید کرد.

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

با توجه به مثال بالا، نحوه کار دستورات به این صورت است:

```js
await browser.react$('MyComponent') // عنصر WebdriverIO را برای اولین <div /> برمی‌گرداند
await browser.react$$('MyComponent') // عناصر WebdriverIO را برای آرایه [<div />, <div />] برمی‌گرداند
```

**نکته:** اگر چندین نمونه از `MyComponent` دارید و از `react$$` برای انتخاب این کامپوننت‌های قطعه استفاده می‌کنید، یک آرایه یک بعدی از تمام گره‌ها برای شما برگردانده می‌شود. به عبارت دیگر، اگر 3 نمونه از `<MyComponent />` داشته باشید، یک آرایه با شش عنصر WebdriverIO برای شما برگردانده می‌شود.

## استراتژی‌های انتخابگر سفارشی


اگر برنامه شما به روش خاصی برای واکشی عناصر نیاز دارد، می‌توانید یک استراتژی انتخابگر سفارشی تعریف کنید که بتوانید از آن با `custom$` و `custom$$` استفاده کنید. برای این منظور، استراتژی خود را یک بار در ابتدای آزمون ثبت کنید، مثلاً در یک هوک `before`:

```js reference
https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/customStrategy.js#L2-L11
```

با توجه به قطعه HTML زیر:

```html reference
https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/example.html#L8-L12
```

سپس از آن با فراخوانی زیر استفاده کنید:

```js reference
https://github.com/webdriverio/example-recipes/blob/f5730428ec3605e856e90bf58be17c9c9da891de/queryElements/customStrategy.js#L16-L19
```

**نکته:** این فقط در محیطی وب کار می‌کند که در آن دستور [`execute`](/docs/api/browser/execute) قابل اجرا باشد.