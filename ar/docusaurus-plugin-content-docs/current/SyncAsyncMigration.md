---
id: async-migration
title: من التنفيذ المتزامن إلى غير المتزامن
description: "انقل اختبارات WebdriverIO من التنفيذ المتزامن للأوامر إلى التنفيذ غير المتزامن خطوة بخطوة، بما في ذلك حلقات forEach والتأكيدات وكائنات الصفحات المتزامنة."
---

بسبب التغييرات في V8، [أعلن](https://webdriver.io/blog/2021/07/28/sync-api-deprecation) فريق WebdriverIO عن إيقاف دعم التنفيذ المتزامن للأوامر بحلول أبريل 2023. وقد عمل الفريق بجد لجعل عملية الانتقال سهلة قدر الإمكان. في هذا الدليل نشرح كيف يمكنك ترحيل مجموعة اختباراتك تدريجيًا من التنفيذ المتزامن إلى غير المتزامن. وكمشروع مثال نستخدم [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate)، لكن النهج نفسه ينطبق على جميع المشاريع الأخرى أيضًا.

## الوعود (Promises) في JavaScript

السبب في شعبية التنفيذ المتزامن في WebdriverIO هو أنه يزيل تعقيد التعامل مع الوعود. وخاصةً إذا كنت قادمًا من لغات أخرى لا يوجد فيها هذا المفهوم بهذه الطريقة، فقد يكون الأمر مربكًا في البداية. ومع ذلك، تُعد الوعود أداة قوية جدًا للتعامل مع الشيفرة غير المتزامنة، وJavaScript الحديثة تجعل التعامل معها سهلًا في الواقع. إذا لم تعمل مع الوعود من قبل، فنوصيك بالاطلاع على [الدليل المرجعي في MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) الخاص بها، إذ إن شرحها هنا خارج نطاق هذا الدليل.

## الانتقال إلى التنفيذ غير المتزامن

يمكن لمشغل اختبارات WebdriverIO التعامل مع التنفيذ المتزامن وغير المتزامن ضمن مجموعة الاختبارات نفسها. وهذا يعني أنه يمكنك ترحيل اختباراتك وكائنات الصفحات (PageObjects) تدريجيًا خطوة بخطوة وبالوتيرة التي تناسبك. على سبيل المثال، يحتوي Cucumber Boilerplate على [مجموعة كبيرة من تعريفات الخطوات](https://github.com/webdriverio/cucumber-boilerplate/tree/main/src/support/action) لتنسخها إلى مشروعك. يمكننا المضي قدمًا وترحيل تعريف خطوة واحد أو ملف واحد في كل مرة.

:::tip

يوفر WebdriverIO أداة [codemod](https://github.com/webdriverio/codemod) تتيح تحويل شيفرتك المتزامنة إلى شيفرة غير متزامنة بشكل آلي بالكامل تقريبًا. شغّل أداة codemod كما هو موضح في التوثيق أولًا، واستخدم هذا الدليل للترحيل اليدوي عند الحاجة.

:::

في كثير من الحالات، كل ما يلزم فعله هو جعل الدالة التي تستدعي فيها أوامر WebdriverIO دالة `async` وإضافة `await` أمام كل أمر. بالنظر إلى أول ملف `clearInputField.ts` يجب تحويله في مشروع boilerplate، فإننا نحوّله من:

```ts
export default (selector: Selector) => {
    $(selector).clearValue();
};
```

إلى:

```ts
export default async (selector: Selector) => {
    await $(selector).clearValue();
};
```

هذا كل شيء. يمكنك رؤية الـ commit الكامل مع جميع أمثلة إعادة الكتابة هنا:

#### الـ Commits:

- _تحويل جميع تعريفات الخطوات_ [[af6625f]](https://github.com/webdriverio/cucumber-boilerplate/pull/481/commits/af6625fcd01dc087479e84562f237ecf38b3537d)

:::info
هذا الانتقال مستقل عن استخدامك لـ TypeScript من عدمه. إذا كنت تستخدم TypeScript، فتأكد فقط من تغيير خاصية `types` في ملف `tsconfig.json` في نهاية المطاف من `webdriverio/sync` إلى `@wdio/globals/types`. وتأكد أيضًا من أن هدف الترجمة (compile target) مضبوط على `ES2018` على الأقل.
:::

## حالات خاصة

هناك بالطبع دائمًا حالات خاصة تحتاج فيها إلى الانتباه أكثر قليلًا.

### حلقات ForEach

إذا كانت لديك حلقة `forEach`، على سبيل المثال للمرور على العناصر، فعليك التأكد من أن دالة الاستدعاء الخاصة بالمكرِّر تُعالَج بشكل صحيح بطريقة غير متزامنة، على سبيل المثال:

```js
const elems = $$('div')
elems.forEach((elem) => {
    elem.click()
})
```

الدالة التي نمررها إلى `forEach` هي دالة مكرِّر. في العالم المتزامن، ستنقر على جميع العناصر قبل أن تنتقل إلى الخطوة التالية. إذا حوّلنا هذا إلى شيفرة غير متزامنة، فعلينا التأكد من أننا ننتظر انتهاء تنفيذ كل دالة مكرِّر. بإضافة `async`/`await` ستُرجع دوال المكرِّر هذه وعدًا (promise) نحتاج إلى حلّه. وعندئذٍ لم تعد `forEach` مثالية للمرور على العناصر لأنها لا تُرجع نتيجة دالة المكرِّر، أي الوعد الذي نحتاج إلى انتظاره. لذلك نحتاج إلى استبدال `forEach` بـ `map` التي تُرجع ذلك الوعد. إن `map` وكذلك جميع دوال التكرار الأخرى الخاصة بالمصفوفات مثل `find` و`every` و`reduce` وغيرها مُنفَّذة بحيث تحترم الوعود داخل دوال المكرِّر، وبالتالي فهي مبسطة للاستخدام في سياق غير متزامن. يبدو المثال أعلاه بعد التحويل كما يلي:

```js
const elems = await $$('div')
await elems.forEach((elem) => {
    return elem.click()
})
```

على سبيل المثال، لجلب جميع عناصر `<h3 />` والحصول على محتواها النصي، يمكنك تشغيل:

```js
await browser.url('https://webdriver.io')

const h3Texts = await browser.$$('h3').map((img) => img.getText())
console.log(h3Texts);
/**
 * returns:
 * [
 *   'Extendable',
 *   'Compatible',
 *   'Feature Rich',
 *   'Who is using WebdriverIO?',
 *   'Support for Modern Web and Mobile Frameworks',
 *   'Google Lighthouse Integration',
 *   'Watch Talks about WebdriverIO',
 *   'Get Started With WebdriverIO within Minutes'
 * ]
 */
```

إذا بدا هذا معقدًا جدًا، فقد ترغب في التفكير في استخدام حلقات for بسيطة، على سبيل المثال:

```js
const elems = await $$('div')
for (const elem of elems) {
    await elem.click()
}
```

تُرجع `$$` كائنًا من نوع [`ElementArray`](/docs/api/browser/$$). يمكنك أيضًا المرور عليه قبل انتظار القائمة:

```js
for await (const elem of $$('div')) {
    await elem.click()
}
```

تُطلق `for (const elem of $$('div'))` خطأً إلى أن يتم حلّ القائمة، لأن الحلقة المتزامنة لا يمكنها انتظار الاستعلام. انتظر القائمة أولًا، كما في المثال أعلاه، أو استخدم `for await`.

### تأكيدات WebdriverIO

إذا كنت تستخدم أداة التأكيدات المساعدة في WebdriverIO [`expect-webdriverio`](https://webdriver.io/docs/api/expect-webdriverio)، فتأكد من وضع `await` أمام كل استدعاء لـ `expect`، على سبيل المثال:

```ts
expect($('input')).toHaveAttribute('class', expect.stringContaining('form'))
```

يجب تحويله إلى:

```ts
await expect($('input')).toHaveAttribute('class', expect.stringContaining('form'))
```

### دوال PageObject المتزامنة والاختبارات غير المتزامنة

إذا كنت تكتب كائنات الصفحات (PageObjects) في مجموعة اختباراتك بطريقة متزامنة، فلن تتمكن من استخدامها في الاختبارات غير المتزامنة بعد الآن. إذا كنت بحاجة إلى استخدام دالة PageObject في كل من الاختبارات المتزامنة وغير المتزامنة، فنوصي بتكرار الدالة وتوفيرها لكلتا البيئتين، على سبيل المثال:

```js
class MyPageObject extends Page {
    /**
     * تعريف العناصر
     */
    get btnStart () { return $('button=Start') }
    get loadedPage () { return $('#finish') }

    someMethod () {
        // شيفرة متزامنة
    }

    someMethodAsync () {
        // النسخة غير المتزامنة من MyPageObject.someMethod()
    }
}
```

بمجرد الانتهاء من الترحيل، يمكنك إزالة دوال PageObject المتزامنة وتنظيف التسميات.

إذا كنت لا ترغب في صيانة نسختين مختلفتين من دالة PageObject، يمكنك أيضًا ترحيل كائن PageObject بالكامل إلى التنفيذ غير المتزامن واستخدام [`browser.call`](https://webdriver.io/docs/api/browser/call) لتنفيذ الدالة في بيئة متزامنة، على سبيل المثال:

```js
// قبل:
// MyPageObject.someMethod()
// بعد:
browser.call(() => MyPageObject.someMethod())
```

سيتأكد الأمر `call` من حلّ الدالة غير المتزامنة `someMethod` قبل الانتقال إلى الأمر التالي.

## الخلاصة

كما ترى في [طلب الدمج (PR) الناتج عن إعادة الكتابة](https://github.com/webdriverio/cucumber-boilerplate/pull/481/files)، فإن إعادة الكتابة هذه سهلة إلى حد كبير. تذكّر أنه يمكنك إعادة كتابة تعريف خطوة واحد في كل مرة. فـ WebdriverIO قادر تمامًا على التعامل مع التنفيذ المتزامن وغير المتزامن في إطار عمل واحد.