---
id: custommatchers
title: تطبیق‌دهنده‌های سفارشی
description: "ثبت تطبیق‌دهنده‌های سفارشی برای مرورگر و عناصر با expect.extend و افزودن انواع TypeScript برای آن‌ها."
---

WebdriverIO از یک کتابخانه ادعا (assertion) به سبک Jest به نام [`expect`](https://webdriver.io/docs/api/expect-webdriverio) استفاده می‌کند که دارای ویژگی‌های خاص و تطبیق‌دهنده‌های (matchers) سفارشی مختص اجرای تست‌های وب و موبایل است. با اینکه کتابخانه تطبیق‌دهنده‌ها بزرگ است، قطعاً برای همه موقعیت‌های ممکن مناسب نیست. بنابراین امکان گسترش تطبیق‌دهنده‌های موجود با تطبیق‌دهنده‌های سفارشی تعریف‌شده توسط شما وجود دارد.

:::warning

در حال حاضر تفاوتی در نحوه تعریف تطبیق‌دهنده‌هایی که مختص شیء [`browser`](/docs/api/browser) یا یک نمونه [element](/docs/api/element) هستند وجود ندارد، اما این موضوع ممکن است در آینده تغییر کند. برای کسب اطلاعات بیشتر درباره این تغییرات، [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408) را دنبال کنید.

:::

:::info Jasmine

در فریم‌ورک Jasmine، تابع `expect.extend` را در یک فایل spec یا در هوک `before`، پیش از اجرای تست‌ها فراخوانی کنید. تطبیق‌دهنده‌ها به تطبیق‌دهنده‌های async در Jasmine تبدیل می‌شوند، بنابراین باید آن‌ها را `await` کنید. تطبیق‌دهنده‌ای که هم‌نام با یک تطبیق‌دهنده sync در Jasmine باشد، مانند تطبیق‌دهنده‌های WebdriverIO، فقط برای مقادیر WebdriverIO اجرا می‌شود. تطبیق‌دهنده‌های نامتقارن سفارشی (`expect.myMatcher()`) در دسترس نیستند. همچنین می‌توانید از `jasmine.addMatchers` برای یک تطبیق‌دهنده sync یا از `jasmine.addAsyncMatchers` برای یک تطبیق‌دهنده async استفاده کنید؛ به [آموزش تطبیق‌دهنده‌های سفارشی Jasmine](https://jasmine.github.io/tutorials/custom_matchers) مراجعه کنید.

:::

## تطبیق‌دهنده‌های سفارشی مرورگر

برای ثبت یک تطبیق‌دهنده سفارشی مرورگر، تابع `extend` را روی شیء `expect` یا مستقیماً در فایل spec خود یا به عنوان بخشی از مثلاً هوک `before` در فایل `wdio.conf.js` فراخوانی کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

همان‌طور که در مثال نشان داده شده است، تابع تطبیق‌دهنده شیء مورد انتظار، مثلاً شیء browser یا element، را به عنوان پارامتر اول و مقدار مورد انتظار را به عنوان پارامتر دوم دریافت می‌کند. سپس می‌توانید از تطبیق‌دهنده به شکل زیر استفاده کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## تطبیق‌دهنده‌های سفارشی عنصر

مشابه تطبیق‌دهنده‌های سفارشی مرورگر، تطبیق‌دهنده‌های عنصر تفاوتی ندارند. در اینجا نمونه‌ای از نحوه ایجاد یک تطبیق‌دهنده سفارشی برای بررسی aria-label یک عنصر آمده است:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

این امکان را به شما می‌دهد که ادعا را به شکل زیر فراخوانی کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## پشتیبانی از TypeScript

اگر از TypeScript استفاده می‌کنید، یک مرحله دیگر برای اطمینان از ایمنی نوع (type safety) تطبیق‌دهنده‌های سفارشی شما لازم است. با گسترش رابط `Matcher` با تطبیق‌دهنده‌های سفارشی خود، همه مشکلات مربوط به نوع‌ها برطرف می‌شوند:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

اگر یک [تطبیق‌دهنده نامتقارن](https://jestjs.io/docs/expect#expectextendmatchers) سفارشی ایجاد کرده‌اید، می‌توانید به طور مشابه انواع `expect` را به شکل زیر گسترش دهید:

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher<string>;
    }
  }
}
```