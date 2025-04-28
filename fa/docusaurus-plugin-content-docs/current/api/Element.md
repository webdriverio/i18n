---
id: element
title: شیء المنت (Element)
---

شیء المنت یک آبجکت است که نشان‌دهنده یک عنصر در عامل کاربر راه دور است، مانند [DOM Node](https://developer.mozilla.org/en-US/docs/Web/API/Element) هنگام اجرای یک جلسه در مرورگر یا [یک عنصر موبایل](https://developer.apple.com/documentation/swift/sequence/element) برای موبایل. این شیء می‌تواند با استفاده از یکی از دستورات متعدد جستجوی عنصر دریافت شود، مانند [`$`](/docs/api/element/$)، [`custom$`](/docs/api/element/custom$)، [`react$`](/docs/api/element/react$) یا [`shadow$`](/docs/api/element/shadow$).

## خصوصیات

یک شیء المنت دارای خصوصیات زیر است:

| نام | نوع | جزئیات |
| ---- | ---- | ------- |
| `sessionId` | `String` | شناسه جلسه تعیین شده از سرور راه دور. |
| `elementId` | `String` | [مرجع عنصر وب](https://w3c.github.io/webdriver/#elements) مرتبط که می‌تواند برای تعامل با عنصر در سطح پروتکل استفاده شود |
| `selector` | `String` | [انتخابگر](/docs/selectors) مورد استفاده برای جستجوی عنصر. |
| `parent` | `Object` | یا [شیء مرورگر](/docs/api/browser) هنگامی که عنصر از آن دریافت می‌شود (مثلا `const elem = browser.$('selector')`) یا یک [شیء المنت](/docs/api/element) اگر از محدوده یک عنصر دریافت شده باشد (مثلا `elem.$('selector')`) |
| `options` | `Object` | [گزینه‌های](/docs/configuration) WebdriverIO بسته به اینکه شیء مرورگر چگونه ایجاد شده است. برای اطلاعات بیشتر [انواع راه‌اندازی](/docs/setuptypes) را ببینید. |

## متدها
یک شیء المنت تمام متدها را از بخش پروتکل ارائه می‌دهد، مانند پروتکل [WebDriver](/docs/api/webdriver) و همچنین دستوراتی که در بخش عنصر فهرست شده‌اند. دستورات پروتکل موجود به نوع جلسه بستگی دارد. اگر یک جلسه مرورگر خودکار را اجرا کنید، هیچ یک از دستورات [Appium](/docs/api/appium) در دسترس نخواهد بود و برعکس.

علاوه بر این، دستورات زیر در دسترس هستند:

| نام | پارامترها | جزئیات |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (نوع: `String`)<br />- `fn` (نوع: `Function`) | امکان تعریف دستورات سفارشی را می‌دهد که می‌تواند از شیء مرورگر برای اهداف ترکیبی فراخوانی شود. اطلاعات بیشتر را در راهنمای [دستور سفارشی](/docs/customcommands) بخوانید. |
| `overwriteCommand` | - `commandName` (نوع: `String`)<br />- `fn` (نوع: `Function`) | امکان بازنویسی هر دستور مرورگر با عملکرد سفارشی را می‌دهد. با احتیاط استفاده کنید زیرا ممکن است کاربران فریم‌ورک را گیج کند. اطلاعات بیشتر را در راهنمای [دستور سفارشی](/docs/customcommands#overwriting-native-commands) بخوانید. |

## نکات

### زنجیره المنت

هنگام کار با عناصر، WebdriverIO نحو خاصی را ارائه می‌دهد تا جستجوی آنها و ترکیب جستجوهای پیچیده عناصر تو در تو را ساده‌تر کند. از آنجا که اشیای عنصر به شما امکان می‌دهند عناصر را در شاخه درختی خود با استفاده از روش‌های معمول جستجو پیدا کنید، کاربران می‌توانند عناصر تو در تو را به شکل زیر بازیابی کنند:

```js
const header = await $('#header')
const headline = await header.$('#headline')
console.log(await headline.getText()) // outputs "I am a headline"
```

با ساختارهای تو در توی عمیق، اختصاص هر عنصر تو در تو به یک آرایه برای استفاده از آن می‌تواند بسیار طولانی باشد. بنابراین WebdriverIO مفهوم جستجوهای زنجیره‌ای عنصر را دارد که امکان بازیابی عناصر تو در تو را به این شکل فراهم می‌کند:

```js
console.log(await $('#header').$('#headline').getText())
```

این همچنین هنگام بازیابی مجموعه‌ای از عناصر نیز کار می‌کند، مانند:

```js
// get the text of the 3rd headline within the 2nd header
console.log(await $$('#header')[1].$$('#headline')[2].getText())
```

هنگام کار با مجموعه‌ای از عناصر، این می‌تواند به ویژه هنگام تلاش برای تعامل با آنها مفید باشد، بنابراین به جای انجام:

```js
const elems = await $$('div')
const locations = await Promise.all(
    elems.map((el) => el.getLocation())
)
```

شما می‌توانید مستقیماً متدهای آرایه را در زنجیره عنصر فراخوانی کنید، مانند:

```js
const location = await $$('div').map((el) => el.getLocation())
```

مشابه:

```js
const divs = await $$('div')
const location = await divs.map((el) => el.getLocation())
```

WebdriverIO از یک پیاده‌سازی سفارشی استفاده می‌کند که از تکرارکننده‌های غیرهمزمان پشتیبانی می‌کند، بنابراین تمام دستورات از API آنها نیز برای این موارد استفاده پشتیبانی می‌شوند.

__نکته:__ تمام تکرارکننده‌های غیرهمزمان حتی اگر callback شما یک promise برنگرداند، یک promise برمی‌گردانند، مانند:

```ts
const divs = await $$('div')
console.log(divs.map((div) => div.selector)) // ❌ returns "Promise<string>[]"
console.log(await divs.map((div) => div.selector)) // ✅ returns "string[]"
```

### دستورات سفارشی

شما می‌توانید دستورات سفارشی را در محدوده مرورگر تنظیم کنید تا گردش‌کارهایی را که معمولاً استفاده می‌شوند، انتزاعی کنید. برای اطلاعات بیشتر، راهنمای ما در مورد [دستورات سفارشی](/docs/customcommands#adding-custom-commands) را بررسی کنید.