---
id: custommatchers
title: مچرهای سفارشی
---

WebdriverIO از یک کتابخانه اعتبارسنجی [`expect`](https://webdriver.io/docs/api/expect-webdriverio) با سبک Jest استفاده می‌کند که دارای ویژگی‌های خاص و مچرهای سفارشی مخصوص اجرای تست‌های وب و موبایل است. اگرچه کتابخانه مچرها بزرگ است، اما قطعاً برای تمام موقعیت‌های ممکن مناسب نیست. بنابراین، امکان گسترش مچرهای موجود با مچرهای سفارشی تعریف شده توسط شما وجود دارد.

:::warning

در حال حاضر تفاوتی در نحوه تعریف مچرهایی که مختص شیء [`browser`](/docs/api/browser) یا نمونه [element](/docs/api/element) هستند وجود ندارد، اما این موضوع ممکن است در آینده تغییر کند. برای اطلاعات بیشتر در مورد این توسعه، [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408) را دنبال کنید.

:::

## مچرهای سفارشی مرورگر

برای ثبت یک مچر سفارشی مرورگر، از تابع `extend` روی شیء `expect` استفاده کنید. این کار را می‌توانید مستقیماً در فایل spec خود یا به عنوان بخشی از هوک مانند `before` در فایل `wdio.conf.js` انجام دهید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

همانطور که در مثال نشان داده شده، تابع مچر، شیء مورد انتظار (مثلاً مرورگر یا شیء المنت) را به عنوان پارامتر اول و مقدار مورد انتظار را به عنوان پارامتر دوم دریافت می‌کند. سپس می‌توانید از مچر به شکل زیر استفاده کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## مچرهای سفارشی المنت

مشابه مچرهای سفارشی مرورگر، مچرهای المنت تفاوتی ندارند. در اینجا نمونه‌ای از نحوه ایجاد یک مچر سفارشی برای اعتبارسنجی aria-label یک المنت آمده است:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

این به شما امکان می‌دهد اعتبارسنجی را به شکل زیر فراخوانی کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## پشتیبانی از TypeScript

اگر از TypeScript استفاده می‌کنید، یک مرحله دیگر برای اطمینان از امنیت نوع مچرهای سفارشی شما لازم است. با گسترش رابط `Matcher` با مچرهای سفارشی خود، تمام مشکلات مربوط به نوع برطرف می‌شوند:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

اگر یک [مچر نامتقارن](https://jestjs.io/docs/expect#expectextendmatchers) سفارشی ایجاد کرده‌اید، می‌توانید به طور مشابه انواع `expect` را به شکل زیر گسترش دهید:

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```