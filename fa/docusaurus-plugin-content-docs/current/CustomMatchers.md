---
id: custommatchers
title: تطبیق‌دهنده‌های سفارشی
description: "ثبت تطبیق‌دهنده‌های سفارشی مرورگر و المنت با expect.extend و افزودن تایپ‌های TypeScript برای آن‌ها."
---

WebdriverIO از یک کتابخانه‌ی assertion به سبک Jest به نام [`expect`](https://webdriver.io/docs/api/expect-webdriverio) استفاده می‌کند که دارای ویژگی‌های خاص و تطبیق‌دهنده‌های (matchers) سفارشی مخصوص اجرای تست‌های وب و موبایل است. اگرچه کتابخانه‌ی تطبیق‌دهنده‌ها بزرگ است، اما قطعاً برای همه‌ی موقعیت‌های ممکن کافی نیست. بنابراین می‌توان تطبیق‌دهنده‌های موجود را با تطبیق‌دهنده‌های سفارشی که خودتان تعریف می‌کنید گسترش داد.

:::warning

اگرچه در حال حاضر هیچ تفاوتی در نحوه‌ی تعریف تطبیق‌دهنده‌هایی که مخصوص شیء [`browser`](/docs/api/browser) یا یک نمونه‌ی [element](/docs/api/element) هستند وجود ندارد، اما این موضوع ممکن است در آینده تغییر کند. برای اطلاعات بیشتر درباره‌ی این تغییرات، [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408) را دنبال کنید.

:::

:::info Jasmine

در فریمورک Jasmine، `expect.extend` را پیش از اجرای تست‌ها، در یک فایل spec یا در هوک `before` فراخوانی کنید. این تطبیق‌دهنده‌ها به تطبیق‌دهنده‌های async در Jasmine تبدیل می‌شوند، بنابراین باید آن‌ها را `await` کنید. تطبیق‌دهنده‌ای که هم‌نام با یکی از تطبیق‌دهنده‌های sync در Jasmine باشد، مانند تطبیق‌دهنده‌های WebdriverIO، فقط برای مقادیر WebdriverIO اجرا می‌شود. تطبیق‌دهنده‌های نامتقارن (asymmetric) سفارشی (`expect.myMatcher()`) در دسترس نیستند. همچنین می‌توانید از `jasmine.addMatchers` برای یک تطبیق‌دهنده‌ی sync یا از `jasmine.addAsyncMatchers` برای یک تطبیق‌دهنده‌ی async استفاده کنید؛ برای اطلاعات بیشتر [آموزش تطبیق‌دهنده‌های سفارشی Jasmine](https://jasmine.github.io/tutorials/custom_matchers) را ببینید.

:::

## تطبیق‌دهنده‌های سفارشی مرورگر

برای ثبت یک تطبیق‌دهنده‌ی سفارشی مرورگر، `extend` را روی شیء `expect` فراخوانی کنید؛ یا مستقیماً در فایل spec خود یا به عنوان بخشی از مثلاً هوک `before` در فایل `wdio.conf.js`:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

همان‌طور که در مثال نشان داده شده است، تابع تطبیق‌دهنده شیء مورد انتظار، مثلاً شیء browser یا element، را به عنوان پارامتر اول و مقدار مورد انتظار را به عنوان پارامتر دوم دریافت می‌کند. سپس می‌توانید از تطبیق‌دهنده به صورت زیر استفاده کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## تطبیق‌دهنده‌های سفارشی المنت

مشابه تطبیق‌دهنده‌های سفارشی مرورگر، تطبیق‌دهنده‌های المنت نیز تفاوتی ندارند. در اینجا مثالی از نحوه‌ی ایجاد یک تطبیق‌دهنده‌ی سفارشی برای بررسی aria-label یک المنت آورده شده است:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

این کار به شما امکان می‌دهد assertion را به صورت زیر فراخوانی کنید:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## پشتیبانی از TypeScript

اگر از TypeScript استفاده می‌کنید، یک مرحله‌ی دیگر برای اطمینان از ایمنی نوع (type safety) تطبیق‌دهنده‌های سفارشی شما لازم است. با گسترش اینترفیس `Matcher` با تطبیق‌دهنده‌های سفارشی خود، تمام مشکلات نوع برطرف می‌شوند:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

اگر یک [تطبیق‌دهنده‌ی نامتقارن](https://jestjs.io/docs/expect#expectextendmatchers) سفارشی ایجاد کرده‌اید، می‌توانید به طور مشابه تایپ‌های `expect` را به صورت زیر گسترش دهید:

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```