---
id: element
title: شیء المنت
---

یک شیء المنت، شیء‌ای است که نمایانگر یک عنصر در عامل کاربر از راه دور است، مانند [DOM Node](https://developer.mozilla.org/en-US/docs/Web/API/Element) هنگام اجرای یک جلسه در مرورگر یا [a mobile element](https://developer.apple.com/documentation/swift/sequence/element) برای موبایل. می‌توان آن را با استفاده از یکی از دستورات پرس و جوی المنت دریافت کرد، مانند [`$`](/docs/api/element/$)، [`custom$`](/docs/api/element/custom$)، [`react$`](/docs/api/element/react$) یا [`shadow$`](/docs/api/element/shadow$).

## ویژگی‌ها

یک شیء المنت دارای ویژگی‌های زیر است:

| نام | نوع | جزئیات |
| ---- | ---- | ------- |
| `sessionId` | `String` | شناسه جلسه اختصاص داده شده از سرور راه دور. |
| `elementId` | `String` | [مرجع عنصر وب](https://w3c.github.io/webdriver/#elements) مرتبط که می‌تواند برای تعامل با المنت در سطح پروتکل استفاده شود |
| `selector` | `String` | [انتخابگر](/docs/selectors) مورد استفاده برای پرس و جوی المنت. |
| `parent` | `Object` | یا [شیء مرورگر](/docs/api/browser) زمانی که المنت از آن بازیابی شده است (مثلاً `const elem = browser.$('selector')`) یا یک [شیء المنت](/docs/api/element) اگر از محدوده یک المنت بازیابی شده است (مثلاً `elem.$('selector')`) |
| `options` | `Object` | [گزینه‌های](/docs/configuration) WebdriverIO بسته به اینکه شیء مرورگر چگونه ایجاد شده است. برای اطلاعات بیشتر [انواع راه‌اندازی](/docs/setuptypes) را ببینید. |

## متدها
یک شیء المنت تمام متدهای بخش پروتکل را ارائه می‌دهد، مانند پروتکل [WebDriver](/docs/api/webdriver) و همچنین دستوراتی که در بخش المنت فهرست شده‌اند. دستورات پروتکل موجود به نوع جلسه بستگی دارد. اگر یک جلسه مرورگر خودکار را اجرا کنید، هیچ یک از دستورات [Appium](/docs/api/appium) در دسترس نخواهند بود و برعکس.

علاوه بر این، دستورات زیر نیز در دسترس هستند:

| نام | پارامترها | جزئیات |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (نوع: `String`)<br />- `fn` (نوع: `Function`) | اجازه می‌دهد دستورات سفارشی تعریف کنید که می‌توانند از شیء مرورگر برای اهداف ترکیبی فراخوانی شوند. اطلاعات بیشتر را در راهنمای [دستور سفارشی](/docs/customcommands) بخوانید. |
| `overwriteCommand` | - `commandName` (نوع: `String`)<br />- `fn` (نوع: `Function`) | اجازه می‌دهد هر دستور مرورگر را با قابلیت سفارشی بازنویسی کنید. با دقت استفاده کنید زیرا ممکن است کاربران فریم‌ورک را سردرگم کند. اطلاعات بیشتر را در راهنمای [دستور سفارشی](/docs/customcommands#overwriting-native-commands) بخوانید. |

## توضیحات

### زنجیره المنت

هنگام کار با المنت‌ها، WebdriverIO نحو ویژه‌ای را برای ساده‌سازی پرس و جوی آنها و ترکیب جستجوهای پیچیده المنت‌های تودرتو ارائه می‌دهد. از آنجا که اشیاء المنت به شما اجازه می‌دهند المنت‌ها را درون شاخه درختی خود با استفاده از روش‌های پرس و جوی متداول پیدا کنید، کاربران می‌توانند المنت‌های تودرتو را به شرح زیر بازیابی کنند:

```js
const header = await $('#header')
const headline = await header.$('#headline')
console.log(await headline.getText()) // outputs "I am a headline"
```

با ساختارهای عمیق تودرتو، اختصاص هر المنت تودرتو به یک آرایه برای استفاده از آن می‌تواند بسیار طولانی باشد. بنابراین WebdriverIO مفهوم پرس و جوهای زنجیره‌ای المنت را دارد که اجازه می‌دهد المنت‌های تودرتو را به این صورت بازیابی کنید:

```js
console.log(await $('#header').$('#headline').getText())
```

این همچنین هنگام بازیابی مجموعه‌ای از المنت‌ها نیز کار می‌کند، به عنوان مثال:

```js
// get the text of the 3rd headline within the 2nd header
console.log(await $$('#header')[1].$$('#headline')[2].getText())
```

هنگام کار با مجموعه‌ای از المنت‌ها، این می‌تواند به ویژه هنگام تلاش برای تعامل با آنها مفید باشد، بنابراین به جای انجام:

```js
const elems = await $$('div')
const locations = await Promise.all(
    elems.map((el) => el.getLocation())
)
```

شما می‌توانید مستقیماً روش‌های آرایه را روی زنجیره المنت فراخوانی کنید، به عنوان مثال:

```js
const location = await $$('div').map((el) => el.getLocation())
```

یا همچنین:

```js
const divs = await $$('div')
const location = await divs.map((el) => el.getLocation())
```

WebdriverIO از پیاده‌سازی سفارشی استفاده می‌کند که از تکرارکننده‌های ناهمگام در پس زمینه پشتیبانی می‌کند، بنابراین تمام دستورات از API آنها نیز برای این موارد استفاده پشتیبانی می‌شوند.

__نکته:__ همه تکرارکننده‌های ناهمگام یک promise را برمی‌گردانند، حتی اگر تابع callback شما یکی را برنگرداند، مثلاً:

```ts
const divs = await $$('div')
console.log(divs.map((div) => div.selector)) // ❌ returns "Promise<string>[]"
console.log(await divs.map((div) => div.selector)) // ✅ returns "string[]"
```

### دستورات سفارشی

شما می‌توانید دستورات سفارشی را در محدوده مرورگر تنظیم کنید تا جریان‌های کاری را که معمولاً استفاده می‌شوند، انتزاعی کنید. برای اطلاعات بیشتر، راهنمای ما در مورد [دستورات سفارشی](/docs/customcommands#adding-custom-commands) را بررسی کنید.