---
id: selectors
title: انتخابگرها
---

پروتکل [WebDriver](https://w3c.github.io/webdriver/) چندین استراتژی انتخابگر برای پرس و جوی یک المان ارائه می‌دهد. WebdriverIO آن‌ها را ساده‌تر می‌کند تا انتخاب المان‌ها ساده باشد. لطفاً توجه داشته باشید که حتی اگر دستور برای پرس و جوی المان‌ها `$` و `$$` نامیده می‌شود، آن‌ها هیچ ارتباطی با jQuery یا [Sizzle Selector Engine](https://github.com/jquery/sizzle) ندارند.

با وجود این‌که انتخابگرهای مختلفی در دسترس هستند، تنها تعداد کمی از آن‌ها روشی قوی برای یافتن المان مناسب ارائه می‌دهند. به عنوان مثال، با توجه به دکمه زیر:

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

ما انتخابگرهای زیر را __توصیه می‌کنیم__ و __توصیه نمی‌کنیم__:

| انتخابگر | توصیه | یادداشت‌ها |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 هرگز | بدترین - بسیار کلی، بدون بافت. |
| `$('.btn.btn-large')` | 🚨 هرگز | بد. وابسته به استایل. به شدت در معرض تغییر. |
| `$('#main')` | ⚠️ به ندرت | بهتر. اما هنوز به استایل یا شنودگر رویداد JS وابسته است. |
| `$(() => document.queryElement('button'))` | ⚠️ به ندرت | پرس و جوی موثر، نوشتن پیچیده. |
| `$('button[name="submission"]')` | ⚠️ به ندرت | وابسته به ویژگی `name` که معناشناسی HTML دارد. |
| `$('button[data-testid="submit"]')` | ✅ خوب | نیاز به ویژگی اضافی دارد، به a11y متصل نیست. |
| `$('aria/Submit')` | ✅ خوب | خوب. شبیه به نحوه تعامل کاربر با صفحه است. توصیه می‌شود از فایل‌های ترجمه استفاده کنید تا آزمون‌های شما هنگام به‌روزرسانی ترجمه‌ها دچار مشکل نشوند. نکته: این انتخابگر می‌تواند در صفحات بزرگ کندتر از سایرین باشد. |
| `$('button=Submit')` | ✅ همیشه | بهترین. شبیه به نحوه تعامل کاربر با صفحه است و سریع است. توصیه می‌شود از فایل‌های ترجمه استفاده کنید تا آزمون‌های شما هنگام به‌روزرسانی ترجمه‌ها دچار مشکل نشوند. |

## انتخابگر پرس و جوی CSS

اگر به گونه‌ای دیگر مشخص نشده باشد، WebdriverIO المان‌ها را با استفاده از الگوی [انتخابگر CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors) پرس و جو می‌کند، به عنوان مثال:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## متن لینک

برای دریافت یک المان لنگر با متن خاص در آن، متن را با علامت مساوی (`=`) شروع کنید.

به عنوان مثال:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

می‌توانید این المان را با فراخوانی زیر پرس و جو کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## متن لینک جزئی

برای یافتن یک المان لنگر که متن قابل مشاهده آن به طور جزئی با مقدار جستجوی شما مطابقت دارد، با استفاده از `*=` در جلوی رشته پرس و جو (مثلاً `*=driver`) آن را پرس و جو کنید.

می‌توانید المان مثال بالا را با فراخوانی زیر نیز پرس و جو کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__نکته:__ نمی‌توانید چندین استراتژی انتخابگر را در یک انتخابگر ترکیب کنید. برای رسیدن به همان هدف، از چندین پرس و جوی المان زنجیره‌ای استفاده کنید، مثلاً:

```js
const elem = await $('header h1*=Welcome') // کار نمی‌کند!!!
// به جای آن از این استفاده کنید
const elem = await $('header').$('*=driver')
```

## المان با متن خاص

همین تکنیک را می‌توان برای المان‌ها نیز به کار برد. علاوه بر این، امکان انجام تطبیق غیرحساس به حروف بزرگ و کوچک با استفاده از `.=` یا `.*=` در پرس و جو نیز وجود دارد.

به عنوان مثال، در اینجا یک پرس و جو برای یک عنوان سطح 1 با متن "Welcome to my Page" وجود دارد:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

می‌توانید این المان را با فراخوانی زیر پرس و جو کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

یا با استفاده از پرس و جوی متن جزئی:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

همین کار برای نام‌های `id` و `class` نیز انجام می‌شود:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

می‌توانید این المان را با فراخوانی زیر پرس و جو کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__نکته:__ نمی‌توانید چندین استراتژی انتخابگر را در یک انتخابگر ترکیب کنید. برای رسیدن به همان هدف، از چندین پرس و جوی المان زنجیره‌ای استفاده کنید، مثلاً:

```js
const elem = await $('header h1*=Welcome') // کار نمی‌کند!!!
// به جای آن از این استفاده کنید
const elem = await $('header').$('h1*=Welcome')
```

## نام تگ

برای پرس و جوی المان با نام تگ خاص، از `<tag>` یا `<tag />` استفاده کنید.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

می‌توانید این المان را با فراخوانی زیر پرس و جو کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## ویژگی نام

برای پرس و جوی المان‌ها با ویژگی نام خاص، می‌توانید از یک انتخابگر معمولی CSS3 یا استراتژی نام ارائه شده توسط [JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol) با ارسال چیزی مانند [name="some-name"] به عنوان پارامتر انتخابگر استفاده کنید:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__نکته:__ این استراتژی انتخابگر منسوخ شده است و فقط در مرورگرهای قدیمی که توسط پروتکل JSONWireProtocol اجرا می‌شوند یا با استفاده از Appium کار می‌کند.

## xPath

همچنین امکان پرس و جوی المان‌ها از طریق [xPath](https://developer.mozilla.org/en-US/docs/Web/XPath) خاص وجود دارد.

یک انتخابگر xPath دارای فرمتی مانند `//body/div[6]/div[1]/span[1]` است.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

می‌توانید پاراگراف دوم را با فراخوانی زیر پرس و جو کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

می‌توانید از xPath برای پیمایش بالا و پایین درخت DOM نیز استفاده کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## انتخابگر نام قابل دسترسی

المان‌ها را با نام قابل دسترسی آنها پرس و جو کنید. نام قابل دسترسی آن چیزی است که توسط صفحه‌خوان هنگام دریافت تمرکز توسط آن المان اعلام می‌شود. مقدار نام قابل دسترسی می‌تواند هم محتوای بصری و هم متن‌های جایگزین پنهان باشد.

:::info

می‌توانید درباره این انتخابگر در [پست وبلاگ انتشار](/blog/2022/09/05/accessibility-selector) ما بیشتر بخوانید.

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

برای پرس و جوی المان‌ها بر اساس [نقش‌های ARIA](https://www.w3.org/TR/html-aria/#docconformance)، می‌توانید مستقیماً نقش المان را مانند `[role=button]` به عنوان پارامتر انتخابگر مشخص کنید:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## ویژگی شناسه

استراتژی مکان‌یاب "id" در پروتکل WebDriver پشتیبانی نمی‌شود، باید به جای آن از استراتژی‌های انتخابگر CSS یا xPath برای یافتن المان‌ها با استفاده از ID استفاده کنید.

با این حال، برخی درایورها (مانند [Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)) ممکن است هنوز از این انتخابگر [پشتیبانی](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies) کنند.

ترکیب‌های انتخابگر فعلی پشتیبانی شده برای ID عبارتند از:

```js
//css locator
const button = await $('#someid')
//xpath locator
const button = await $('//*[@id="someid"]')
//id strategy
// Note: works only in Appium or similar frameworks which supports locator strategy "ID"
const button = await $('id=resource-id/iosname')
```

## تابع JS

همچنین می‌توانید از توابع جاوا اسکریپت برای دریافت المان‌ها با استفاده از APIهای بومی وب استفاده کنید. البته، شما فقط می‌توانید این کار را در یک بافت وب (مثلاً `browser` یا بافت وب در موبایل) انجام دهید.

با توجه به ساختار HTML زیر:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

می‌توانید المان خواهر `#elem` را به شکل زیر پرس و جو کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L139-L143
```

## انتخابگرهای عمیق

:::warning

از نسخه `v9` WebdriverIO نیازی به این انتخابگر خاص نیست زیرا WebdriverIO به طور خودکار از Shadow DOM عبور می‌کند. توصیه می‌شود با حذف `>>>` از جلوی آن، از این انتخابگر دور شوید.

:::

بسیاری از برنامه‌های فرانت‌اند به شدت به المان‌های با [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) متکی هستند. از نظر فنی، پرس و جوی المان‌ها در shadow DOM بدون راه‌حل‌های جایگزین غیرممکن است. [`shadow$`](https://webdriver.io/docs/api/element/shadow$) و [`shadow$$`](https://webdriver.io/docs/api/element/shadow$$) چنین راه‌حل‌هایی بوده‌اند که [محدودیت‌های](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow) خود را داشتند. با انتخابگر عمیق، اکنون می‌توانید همه المان‌ها در هر shadow DOM را با استفاده از دستور پرس و جوی معمولی پرس و جو کنید.

با فرض اینکه برنامه‌ای با ساختار زیر داریم:

![مثال Chrome](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "مثال Chrome")

با این انتخابگر می‌توانید المان `<button />` که در shadow DOM دیگری قرار دارد را پرس و جو کنید، به عنوان مثال:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## انتخابگرهای موبایل

برای آزمایش موبایل هیبریدی، مهم است که سرور اتوماسیون در *بافت* صحیح قبل از اجرای دستورات قرار گیرد. برای اتوماسیون حرکات، درایور در حالت ایده‌آل باید روی بافت بومی تنظیم شود. اما برای انتخاب المان‌ها از DOM، درایور باید روی بافت وب‌ویو پلتفرم تنظیم شود. فقط *پس از آن* می‌توان از روش‌های ذکر شده در بالا استفاده کرد.

برای آزمایش موبایل بومی، تغییری بین بافت‌ها وجود ندارد، زیرا شما باید از استراتژی‌های موبایل استفاده کنید و مستقیماً از فناوری اتوماسیون دستگاه زیرین استفاده کنید. این به ویژه زمانی مفید است که یک آزمون به کنترل دقیق برای یافتن المان‌ها نیاز دارد.

### Android UiAutomator

چارچوب UI Automator اندروید چندین روش برای یافتن المان‌ها ارائه می‌دهد. می‌توانید از [API UI Automator](https://developer.android.com/tools/testing-support-library/index.html#uia-apis)، به ویژه [کلاس UiSelector](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector) برای پیدا کردن المان‌ها استفاده کنید. در Appium، کد Java را به عنوان یک رشته به سرور ارسال می‌کنید که آن را در محیط برنامه اجرا می‌کند و المان یا المان‌ها را برمی‌گرداند.

```js
const selector = 'new UiSelector().text("Cancel").className("android.widget.Button")'
const button = await $(`android=${selector}`)
await button.click()
```

### Android DataMatcher و ViewMatcher (فقط Espresso)

استراتژی DataMatcher اندروید روشی را برای یافتن المان‌ها با استفاده از [Data Matcher](https://developer.android.com/reference/android/support/test/espresso/DataInteraction) ارائه می‌دهد.

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"]
})
await menuItem.click()
```

و به همین ترتیب [View Matcher](https://developer.android.com/reference/android/support/test/espresso/ViewInteraction):

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"],
  "class": "androidx.test.espresso.matcher.ViewMatchers"
})
await menuItem.click()
```

### Android View Tag (فقط Espresso)

استراتژی برچسب نما روشی راحت برای یافتن المان‌ها با استفاده از [برچسب](https://developer.android.com/reference/android/support/test/espresso/matcher/ViewMatchers.html#withTagValue%28org.hamcrest.Matcher%3Cjava.lang.Object%3E%29) آنها ارائه می‌دهد.

```js
const elem = await $('-android viewtag:tag_identifier')
await elem.click()
```

### iOS UIAutomation

هنگام اتوماسیون یک برنامه iOS، می‌توان از [چارچوب UI Automation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) اپل برای یافتن المان‌ها استفاده کرد.

این [API](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771) جاوا اسکریپت دارای روش‌هایی برای دسترسی به نما و همه چیز روی آن است.

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

همچنین می‌توانید از جستجوی گزاره در iOS UI Automation در Appium برای پالایش بیشتر انتخاب المان استفاده کنید. برای جزئیات به [اینجا](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md) مراجعه کنید.

### رشته‌های گزاره و زنجیره‌های کلاس iOS XCUITest

با iOS 10 و بالاتر (با استفاده از درایور `XCUITest`)، می‌توانید از [رشته‌های گزاره](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules) استفاده کنید:

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

### شناسه قابل دسترسی

استراتژی مکان‌یاب `accessibility id` برای خواندن یک شناسه منحصر به فرد برای یک المان رابط کاربری طراحی شده است. این مزیت را دارد که در طول محلی‌سازی یا هر فرآیند دیگری که ممکن است متن را تغییر دهد، تغییر نمی‌کند. علاوه بر این، می‌تواند در ایجاد آزمون‌های چند پلتفرمی کمک کند، اگر المان‌هایی که از نظر عملکردی یکسان هستند، همان شناسه قابل دسترسی را داشته باشند.

- برای iOS این همان `accessibility identifier` طراحی شده توسط اپل [در اینجا](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html) است.
- برای اندروید `accessibility id` به `content-description` برای المان نگاشت می‌شود، همانطور که در [اینجا](https://developer.android.com/training/accessibility/accessible-app.html) توضیح داده شده است.

برای هر دو پلتفرم، دریافت یک المان (یا چندین المان) با `accessibility id` آنها معمولاً بهترین روش است. همچنین روش ترجیحی نسبت به استراتژی منسوخ شده `name` است.

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### نام کلاس

استراتژی `class name` یک `string` است که یک المان UI را در نمای فعلی نشان می‌دهد.

- برای iOS نام کامل یک [کلاس UIAutomation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) است و با `UIA-` شروع می‌شود، مانند `UIATextField` برای یک فیلد متنی. یک مرجع کامل را می‌توان در [اینجا](https://developer.apple.com/library/ios/navigation/#section=Frameworks&topic=UIAutomation) یافت.
- برای اندروید، نام کاملاً واجد شرایط یک [کلاس](https://developer.android.com/reference/android/widget/package-summary.html) [UI Automator](https://developer.android.com/tools/testing-support-library/index.html#UIAutomator) است، مانند `android.widget.EditText` برای یک فیلد متنی. یک مرجع کامل را می‌توان در [اینجا](https://developer.android.com/reference/android/widget/package-summary.html) یافت.
- برای Youi.tv نام کامل یک کلاس Youi.tv است و با `CYI-` شروع می‌شود، مانند `CYIPushButtonView` برای یک المان دکمه فشاری. یک مرجع کامل را می‌توان در [صفحه GitHub درایور You.i Engine](https://github.com/YOU-i-Labs/appium-youiengine-driver) یافت.

```js
// مثال iOS
await $('UIATextField').click()
// مثال اندروید
await $('android.widget.DatePicker').click()
// مثال Youi.tv
await $('CYIPushButtonView').click()
```

## انتخابگرهای زنجیره‌ای

اگر می‌خواهید در پرس و جوی خود دقیق‌تر باشید، می‌توانید انتخابگرها را زنجیر کنید تا المان مناسب را پیدا کنید. اگر قبل از دستور واقعی خود `element` را فراخوانی کنید، WebdriverIO پرس و جو را از آن المان شروع می‌کند.

به عنوان مثال، اگر یک ساختار DOM مانند زیر دارید:

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

با زنجیر کردن انتخابگر، این کار بسیار آسان‌تر است. به سادگی المان موردنظر را گام به گام محدود کنید:

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### انتخابگر تصویر Appium

با استفاده از استراتژی مکان‌یاب `-image`، امکان ارسال یک فایل تصویری به Appium وجود دارد که نشان دهنده المانی است که می‌خواهید به آن دسترسی پیدا کنید.

فرمت‌های فایل پشتیبانی شده `jpg,png,gif,bmp,svg`

مرجع کامل را می‌توان در [اینجا](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md) یافت.

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**نکته**: روشی که Appium با این انتخابگر کار می‌کند این است که داخلاً یک اسکرین‌شات (برنامه) تهیه می‌کند و از انتخابگر تصویر ارائه شده برای تأیید اینکه آیا المان را می‌توان در آن اسکرین‌شات (برنامه) پیدا کرد استفاده می‌کند.

آگاه باشید که Appium ممکن است اسکرین‌شات (برنامه) گرفته شده را تغییر اندازه دهد تا با اندازه CSS صفحه (برنامه) شما مطابقت داشته باشد (این اتفاق در iPhones و همچنین در دستگاه‌های Mac با نمایشگر Retina رخ می‌دهد زیرا DPR بزرگتر از 1 است). این منجر به عدم یافتن تطبیق می‌شود زیرا انتخابگر تصویر ارائه شده ممکن است از اسکرین‌شات اصلی گرفته شده باشد.
می‌توانید این مشکل را با به‌روزرسانی تنظیمات سرور Appium برطرف کنید، به [اسناد Appium](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings) برای تنظیمات و [این نظر](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579) برای توضیح دقیق مراجعه کنید.

## انتخابگرهای React

WebdriverIO روشی را برای انتخاب کامپوننت‌های React بر اساس نام کامپوننت ارائه می‌دهد. برای انجام این کار، شما می‌توانید از یکی از دو دستور انتخاب کنید: `react$` و `react$$`.

این دستورات به شما امکان می‌دهند کامپوننت‌ها را از [VirtualDOM React](https://reactjs.org/docs/faq-internals.html) انتخاب کنید و یک المان WebdriverIO یا آرایه‌ای از المان‌ها را (بسته به اینکه کدام تابع استفاده می‌شود) برگردانید.

**نکته**: دستورات `react$` و `react$$` از نظر عملکرد مشابه هستند، با این تفاوت که `react$$` *تمام* نمونه‌های مطابق را به عنوان آرایه‌ای از المان‌های WebdriverIO برمی‌گرداند، و `react$` اولین نمونه یافت شده را برمی‌گرداند.

#### مثال اساسی

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

در کد بالا یک نمونه ساده `MyComponent` در برنامه وجود دارد که React آن را داخل یک المان HTML با `id="root"` رندر می‌کند.

با دستور `browser.react$` می‌توانید یک نمونه از `MyComponent` را انتخاب کنید:

```js
const myCmp = await browser.react$('MyComponent')
```

اکنون که المان WebdriverIO را در متغیر `myCmp` ذخیره کرده‌اید، می‌توانید دستورات المان را روی آن اجرا کنید.

#### فیلتر کردن کامپوننت‌ها

کتابخانه‌ای که WebdriverIO داخلاً استفاده می‌کند به شما امکان می‌دهد انتخاب خود را بر اساس پراپس و/یا وضعیت کامپوننت فیلتر کنید. برای انجام این کار، باید آرگومان دوم را برای پراپس و/یا آرگومان سوم را برای وضعیت به دستور مرورگر ارسال کنید.

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

اگر می‌خواهید نمونه‌ای از `MyComponent` را انتخاب کنید که پراپ `name` آن `WebdriverIO` است، می‌توانید دستور را به این صورت اجرا کنید:

```js
const myCmp = await browser.react$('MyComponent', {
    props: { name: 'WebdriverIO' }
})
```

اگر می‌خواستید انتخاب خود را بر اساس وضعیت فیلتر کنید، دستور `browser` چیزی شبیه به این خواهد بود:

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

#### کار با `React.Fragment`

هنگام استفاده از دستور `react$` برای انتخاب [قطعه‌های](https://reactjs.org/docs/fragments.html) React، WebdriverIO اولین فرزند آن کامپوننت را به عنوان گره کامپوننت برمی‌گرداند. اگر از `react$$` استفاده می‌کنید، آرایه‌ای حاوی تمام گره‌های HTML داخل قطعه‌هایی که با انتخابگر مطابقت دارند دریافت خواهید کرد.

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

با توجه به مثال بالا، دستورات به این صورت کار می‌کنند:

```js
await browser.react$('MyComponent') // المان WebdriverIO را برای اولین <div /> برمی‌گرداند
await browser.react$$('MyComponent') // المان‌های WebdriverIO را برای آرایه [<div />, <div />] برمی‌گرداند
```

**نکته:** اگر چندین نمونه از `MyComponent` دارید و از `react$$` برای انتخاب این کامپوننت‌های قطعه استفاده می‌کنید، یک آرایه یک بعدی از تمام گره‌ها به شما برگردانده می‌شود. به عبارت دیگر، اگر 3 نمونه `<MyComponent />` داشته باشید، آرایه‌ای با شش المان WebdriverIO به شما برگردانده می‌شود.

## استراتژی‌های انتخابگر سفارشی


اگر برنامه شما به روش خاصی برای دریافت المان‌ها نیاز دارد، می‌توانید یک استراتژی انتخابگر سفارشی تعریف کنید که بتوانید از آن با `custom$` و `custom$$` استفاده کنید. برای این کار، استراتژی خود را یک بار در ابتدای آزمون ثبت کنید، به عنوان مثال در یک هوک `before`:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L3-L10
```

با توجه به قطعه HTML زیر:

```html reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/example.html#L8-L12
```

سپس با فراخوانی زیر از آن استفاده کنید:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L16-L19
```

**نکته:** این فقط در یک محیط وب کار می‌کند که در آن دستور [`execute`](/docs/api/browser/execute) بتواند اجرا شود.
