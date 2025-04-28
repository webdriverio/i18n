---
id: custommatchers
title: مطابقات مخصصة
---

يستخدم WebdriverIO مكتبة تأكيد [`expect`](https://webdriver.io/docs/api/expect-webdriverio) بأسلوب Jest والتي تأتي مع ميزات خاصة ومطابقات مخصصة محددة لتشغيل اختبارات الويب والجوال. على الرغم من أن مكتبة المطابقات كبيرة، إلا أنها بالتأكيد لا تناسب جميع المواقف الممكنة. لذلك، من الممكن توسيع المطابقات الموجودة بمطابقات مخصصة تحددها أنت.

:::warning

في حين أنه لا يوجد حاليًا اختلاف في كيفية تعريف المطابقات الخاصة بكائن [`browser`](/docs/api/browser) أو نسخة [element](/docs/api/element)، فإن هذا قد يتغير بالتأكيد في المستقبل. تابع [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408) للحصول على مزيد من المعلومات حول هذا التطوير.

:::

## مطابقات المتصفح المخصصة

لتسجيل مطابق متصفح مخصص، استدعِ `extend` على كائن `expect` إما في ملف المواصفات الخاص بك مباشرةً أو كجزء من مثلاً تعليق `before` في ملف `wdio.conf.js` الخاص بك:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

كما هو موضح في المثال، تأخذ دالة المطابقة الكائن المتوقع، مثل المتصفح أو كائن العنصر، كمعلمة أولى والقيمة المتوقعة كمعلمة ثانية. يمكنك بعد ذلك استخدام المطابق كما يلي:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## مطابقات العناصر المخصصة

على غرار مطابقات المتصفح المخصصة، لا تختلف مطابقات العناصر. إليك مثالاً على كيفية إنشاء مطابق مخصص للتأكد من aria-label لعنصر:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

هذا يسمح لك باستدعاء التأكيد كما يلي:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## دعم TypeScript

إذا كنت تستخدم TypeScript، فهناك خطوة إضافية مطلوبة لضمان سلامة نوع المطابقات المخصصة الخاصة بك. من خلال توسيع واجهة `Matcher` بمطابقاتك المخصصة، تختفي جميع مشكلات النوع:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

إذا قمت بإنشاء [مطابق غير متماثل](https://jestjs.io/docs/expect#expectextendmatchers) مخصص، يمكنك بالمثل توسيع أنواع `expect` كما يلي:

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```