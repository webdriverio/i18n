---
id: custommatchers
title: تطبیق‌دهنده‌های سفارشی
---

WebdriverIO از یک کتابخانه تأیید [`expect`](https://webdriver.io/docs/api/expect-webdriverio) به سبک Jest استفاده می‌کند که با ویژگی‌های ویژه و تطبیق‌دهنده‌های سفارشی مخصوص اجرای آزمون‌های وب و موبایل همراه است. در حالی که کتابخانه تطبیق‌دهنده‌ها بزرگ است، مطمئناً نمی‌تواند همه موقعیت‌های ممکن را پوشش دهد. بنابراین امکان گسترش تطبیق‌دهنده‌های موجود با تطبیق‌دهنده‌های سفارشی تعریف شده توسط شما وجود دارد.

:::warning

اگرچه در حال حاضر تفاوتی در نحوه تعریف تطبیق‌دهنده‌هایی که مختص شیء [`browser`](/docs/api/browser) یا یک نمونه [element](/docs/api/element) هستند وجود ندارد، اما این ممکن است در آینده تغییر کند. برای اطلاعات بیشتر در مورد این توسعه، مشکل [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408) را دنبال کنید.

:::

## تطبیق‌دهنده‌های سفارشی مرورگر

برای ثبت یک تطبیق‌دهنده سفارشی مرورگر، `extend` را روی شیء `expect` فراخوانی کنید، یا مستقیماً در فایل spec خود یا به عنوان بخشی از هوک، مثلاً `before` در `wdio.conf.js` خود:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

همانطور که در مثال نشان داده شده است، تابع تطبیق‌دهنده، شیء مورد انتظار، مثلاً مرورگر یا شیء element را به عنوان پارامتر اول و مقدار مورد انتظار را به عنوان پارامتر دوم می‌گیرد. سپس می‌توانید از تطبیق‌دهنده به شرح زیر استفاده کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## تطبیق‌دهنده‌های سفارشی عنصر

مشابه تطبیق‌دهنده‌های سفارشی مرورگر، تطبیق‌دهنده‌های عنصر تفاوتی ندارند. در اینجا مثالی از نحوه ایجاد یک تطبیق‌دهنده سفارشی برای تأیید aria-label یک عنصر آمده است:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

این به شما امکان می‌دهد تأیید را به شرح زیر فراخوانی کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## پشتیبانی از TypeScript

اگر از TypeScript استفاده می‌کنید، یک مرحله دیگر برای اطمینان از ایمنی نوع تطبیق‌دهنده‌های سفارشی شما لازم است. با گسترش رابط `Matcher` با تطبیق‌دهنده‌های سفارشی خود، تمام مشکلات نوع از بین می‌روند:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

اگر یک [تطبیق‌دهنده نامتقارن](https://jestjs.io/docs/expect#expectextendmatchers) سفارشی ایجاد کرده‌اید، می‌توانید به طور مشابه انواع `expect` را به شرح زیر گسترش دهید:

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```