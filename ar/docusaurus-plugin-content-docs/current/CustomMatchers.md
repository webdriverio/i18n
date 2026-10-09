---
id: custommatchers
title: المطابقات المخصصة
description: "سجّل مطابقات مخصصة للمتصفح والعناصر باستخدام expect.extend وأضف أنواع TypeScript الخاصة بها."
---

يستخدم WebdriverIO مكتبة تأكيدات [`expect`](https://webdriver.io/docs/api/expect-webdriverio) بأسلوب Jest، تأتي مع ميزات خاصة ومطابقات (matchers) مخصصة لتشغيل اختبارات الويب والهاتف المحمول. ورغم أن مكتبة المطابقات كبيرة، فإنها بالتأكيد لا تغطي جميع الحالات الممكنة. لذلك يمكنك توسيع المطابقات الموجودة بمطابقات مخصصة تُعرّفها بنفسك.

:::warning

رغم أنه لا يوجد حاليًا أي اختلاف في طريقة تعريف المطابقات الخاصة بكائن [`browser`](/docs/api/browser) أو بنسخة من [عنصر](/docs/api/element)، فقد يتغير هذا بالتأكيد في المستقبل. تابع [`webdriverio/expect-webdriverio#1408`](https://github.com/webdriverio/expect-webdriverio/issues/1408) للحصول على مزيد من المعلومات حول هذا التطوير.

:::

:::info Jasmine

مع إطار عمل Jasmine، استدعِ `expect.extend` في ملف المواصفات (spec) أو في خطاف `before`، قبل تشغيل الاختبارات. تصبح المطابقات مطابقات Jasmine غير متزامنة، لذا استخدم `await` معها. المطابق الذي يحمل اسم مطابق Jasmine متزامن يعمل مع قيم WebdriverIO فقط، مثل مطابقات WebdriverIO. المطابقات غير المتماثلة المخصصة (`expect.myMatcher()`) غير متاحة. يمكنك أيضًا استخدام `jasmine.addMatchers` لمطابق متزامن أو `jasmine.addAsyncMatchers` لمطابق غير متزامن، راجع [دليل المطابقات المخصصة في Jasmine](https://jasmine.github.io/tutorials/custom_matchers).

:::

## مطابقات المتصفح المخصصة

لتسجيل مطابق متصفح مخصص، استدعِ `extend` على كائن `expect` إما في ملف المواصفات مباشرةً أو كجزء من خطاف `before` مثلًا في ملف `wdio.conf.js` الخاص بك:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L3-L18
```

كما هو موضح في المثال، تأخذ دالة المطابق الكائن المتوقع، مثل كائن المتصفح أو العنصر، كمعامل أول والقيمة المتوقعة كمعامل ثانٍ. يمكنك بعد ذلك استخدام المطابق على النحو التالي:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L50-L52
```

## مطابقات العناصر المخصصة

على غرار مطابقات المتصفح المخصصة، لا تختلف مطابقات العناصر. إليك مثالًا على كيفية إنشاء مطابق مخصص للتحقق من قيمة aria-label لعنصر ما:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L20-L38
```

يتيح لك هذا استدعاء التأكيد على النحو التالي:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L54-L57
```

## دعم TypeScript

إذا كنت تستخدم TypeScript، فهناك خطوة إضافية مطلوبة لضمان أمان الأنواع لمطابقاتك المخصصة. من خلال توسيع واجهة `Matcher` بمطابقاتك المخصصة، تختفي جميع مشكلات الأنواع:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e719632df8f241f923c8d9301aab6bccee5cb109/customMatchers/example.ts#L40-L47
```

إذا أنشأت [مطابقًا غير متماثل](https://jestjs.io/docs/expect#expectextendmatchers) مخصصًا، فيمكنك بالمثل توسيع أنواع `expect` على النحو التالي:

```ts
declare global {
  namespace ExpectWebdriverIO {
    interface AsymmetricMatchers {
      myCustomMatcher(value: string): ExpectWebdriverIO.PartialMatcher;
    }
  }
}
```