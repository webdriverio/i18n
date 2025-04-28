---
id: async-migration
title: من المتزامن إلى غير المتزامن
---

بسبب التغييرات في V8، أعلن فريق WebdriverIO عن [إيقاف دعم](https://webdriver.io/blog/2021/07/28/sync-api-deprecation) تنفيذ الأوامر المتزامنة بحلول أبريل 2023. عمل الفريق بجد لجعل الانتقال سهلًا قدر الإمكان. في هذا الدليل نشرح كيف يمكنك الانتقال ببطء من اختباراتك المتزامنة إلى غير المتزامنة. كمثال على المشروع، نستخدم [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate) ولكن النهج هو نفسه مع جميع المشاريع الأخرى أيضًا.

## الوعود (Promises) في جافا سكريبت

السبب الذي جعل التنفيذ المتزامن شائعًا في WebdriverIO هو أنه يزيل تعقيد التعامل مع الوعود. خاصة إذا كنت تأتي من لغات أخرى حيث لا يوجد هذا المفهوم بهذه الطريقة، يمكن أن يكون مربكًا في البداية. ومع ذلك، فإن الوعود هي أداة قوية جدًا للتعامل مع التعليمات البرمجية غير المتزامنة، وجافا سكريبت اليوم تجعل التعامل معها سهلًا فعليًا. إذا لم تعمل أبدًا مع الوعود، فإننا نوصي بالاطلاع على [دليل مرجع MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) حيث يكون خارج نطاق شرحه هنا.

## الانتقال إلى غير المتزامن

يمكن لـ WebdriverIO testrunner التعامل مع التنفيذ المتزامن وغير المتزامن ضمن نفس مجموعة الاختبار. هذا يعني أنه يمكنك الانتقال ببطء باختباراتك وكائنات الصفحة (PageObjects) خطوة بخطوة بالوتيرة التي تناسبك. على سبيل المثال، يحتوي Cucumber Boilerplate على [مجموعة كبيرة من تعريفات الخطوات](https://github.com/webdriverio/cucumber-boilerplate/tree/main/src/support/action) لنسخها إلى مشروعك. يمكننا المضي قدمًا وترحيل تعريف خطوة واحد أو ملف واحد في كل مرة.

:::tip

يوفر WebdriverIO [codemod](https://github.com/webdriverio/codemod) يسمح بتحويل التعليمات البرمجية المتزامنة إلى تعليمات برمجية غير متزامنة بشكل شبه تلقائي بالكامل. قم بتشغيل codemod كما هو موضح في المستندات أولاً واستخدم هذا الدليل للترحيل اليدوي إذا لزم الأمر.

:::

في كثير من الحالات، كل ما يلزم القيام به هو جعل الدالة التي تستدعي فيها أوامر WebdriverIO `async` وإضافة `await` أمام كل أمر. بالنظر إلى أول ملف `clearInputField.ts` للتحويل في مشروع boilerplate، نقوم بالتحويل من:

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

هذا كل شيء. يمكنك رؤية الالتزام الكامل مع جميع أمثلة إعادة الكتابة هنا:

#### الالتزامات:

- _تحويل جميع تعريفات الخطوات_ [[af6625f]](https://github.com/webdriverio/cucumber-boilerplate/pull/481/commits/af6625fcd01dc087479e84562f237ecf38b3537d)

:::info
هذا الانتقال مستقل عما إذا كنت تستخدم TypeScript أم لا. إذا كنت تستخدم TypeScript، فتأكد من أنك في النهاية تغير خاصية `types` في `tsconfig.json` من `webdriverio/sync` إلى `@wdio/globals/types`. تأكد أيضًا من أن هدف التجميع محدد على الأقل على `ES2018`.
:::

## حالات خاصة

بالطبع هناك دائمًا حالات خاصة حيث تحتاج إلى إيلاء المزيد من الاهتمام.

### حلقات ForEach

إذا كان لديك حلقة `forEach`، على سبيل المثال للتكرار على العناصر، فأنت بحاجة إلى التأكد من أن استدعاء التكرار يتم معالجته بشكل صحيح بطريقة غير متزامنة، على سبيل المثال:

```js
const elems = $$('div')
elems.forEach((elem) => {
    elem.click()
})
```

الدالة التي نمررها إلى `forEach` هي دالة التكرار. في عالم متزامن، ستنقر على جميع العناصر قبل أن تنتقل. إذا قمنا بتحويل هذا إلى تعليمات برمجية غير متزامنة، فيجب علينا التأكد من أننا ننتظر كل دالة تكرار لإنهاء التنفيذ. من خلال إضافة `async`/`await`، ستعيد دوال التكرار هذه وعدًا نحتاج إلى حله. الآن، `forEach` ليست مثالية للتكرار على العناصر بعد الآن لأنها لا تُرجع نتيجة دالة التكرار، الوعد الذي نحتاج إلى انتظاره. لذلك نحتاج إلى استبدال `forEach` بـ `map` التي تُرجع هذا الوعد. تم تنفيذ `map` وجميع طرق التكرار الأخرى للمصفوفات مثل `find` و `every` و `reduce` وغيرها بحيث تحترم الوعود ضمن دوال التكرار وبالتالي تم تبسيطها لاستخدامها في سياق غير متزامن. يبدو المثال أعلاه محولًا كما يلي:

```js
const elems = await $$('div')
await elems.forEach((elem) => {
    return elem.click()
})
```

على سبيل المثال، للحصول على جميع عناصر `<h3 />` والحصول على محتوى النص الخاص بهم، يمكنك تشغيل:

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

إذا بدا هذا معقدًا للغاية، فقد ترغب في التفكير في استخدام حلقات for البسيطة، على سبيل المثال:

```js
const elems = await $$('div')
for (const elem of elems) {
    await elem.click()
}
```

### تأكيدات WebdriverIO

إذا كنت تستخدم مساعد تأكيدات WebdriverIO [`expect-webdriverio`](https://webdriver.io/docs/api/expect-webdriverio)، فتأكد من وضع `await` أمام كل استدعاء `expect`، على سبيل المثال:

```ts
expect($('input')).toHaveAttributeContaining('class', 'form')
```

يجب تحويله إلى:

```ts
await expect($('input')).toHaveAttributeContaining('class', 'form')
```

### طرق PageObject المتزامنة والاختبارات غير المتزامنة

إذا كنت تكتب كائنات الصفحة (PageObjects) في مجموعة الاختبار الخاصة بك بطريقة متزامنة، فلن تتمكن من استخدامها في اختبارات غير متزامنة بعد الآن. إذا كنت بحاجة إلى استخدام طريقة PageObject في كل من الاختبارات المتزامنة وغير المتزامنة، فإننا نوصي بتكرار الطريقة وتقديمها لكلا البيئتين، على سبيل المثال:

```js
class MyPageObject extends Page {
    /**
     * define elements
     */
    get btnStart () { return $('button=Start') }
    get loadedPage () { return $('#finish') }

    someMethod () {
        // sync code
    }

    someMethodAsync () {
        // async version of MyPageObject.someMethod()
    }
}
```

بمجرد الانتهاء من الترحيل، يمكنك إزالة طرق PageObject المتزامنة وتنظيف التسمية.

إذا كنت لا ترغب في الحفاظ على إصدارين مختلفين من طريقة PageObject، يمكنك أيضًا ترحيل كائن الصفحة بالكامل إلى غير متزامن واستخدام [`browser.call`](https://webdriver.io/docs/api/browser/call) لتنفيذ الطريقة في بيئة متزامنة، على سبيل المثال:

```js
// before:
// MyPageObject.someMethod()
// after:
browser.call(() => MyPageObject.someMethod())
```

سيتأكد أمر `call` من حل الطريقة `someMethod` غير المتزامنة قبل الانتقال إلى الأمر التالي.

## الخلاصة

كما ترى في [PR إعادة الكتابة الناتج](https://github.com/webdriverio/cucumber-boilerplate/pull/481/files)، فإن تعقيد إعادة الكتابة هذه سهل نسبيًا. تذكر أنه يمكنك إعادة كتابة تعريف خطوة واحدة في كل مرة. WebdriverIO قادر تمامًا على التعامل مع التنفيذ المتزامن وغير المتزامن في إطار عمل واحد.