---
id: async-migration
title: من المتزامن إلى غير المتزامن
---

نظرًا للتغييرات في V8، أعلن فريق WebdriverIO عن [إلغاء](https://webdriver.io/blog/2021/07/28/sync-api-deprecation) دعم التنفيذ المتزامن للأوامر بحلول أبريل 2023. عمل الفريق بجد لجعل الانتقال سهلاً قدر الإمكان. في هذا الدليل نشرح كيف يمكنك الانتقال ببطء باختبارك من المتزامن إلى غير المتزامن. كمشروع مثال، نستخدم [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate) ولكن النهج هو نفسه مع جميع المشاريع الأخرى أيضًا.

## الوعود في جافا سكريبت

السبب وراء شعبية التنفيذ المتزامن في WebdriverIO هو أنه يزيل تعقيد التعامل مع الوعود (Promises). خاصة إذا كنت قادمًا من لغات أخرى حيث لا يوجد هذا المفهوم بهذه الطريقة، يمكن أن يكون مربكًا في البداية. ومع ذلك، فإن الوعود هي أداة قوية جدًا للتعامل مع الكود غير المتزامن، وتجعل لغة جافا سكريبت اليوم التعامل معها سهلاً. إذا لم تعمل أبدًا مع الوعود، فإننا نوصي بمراجعة [دليل MDN المرجعي](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) حيث سيكون خارج نطاق شرحه هنا.

## الانتقال إلى غير المتزامن

يمكن لمشغل اختبار WebdriverIO التعامل مع التنفيذ المتزامن وغير المتزامن داخل نفس مجموعة الاختبار. هذا يعني أنه يمكنك الانتقال ببطء باختباراتك وكائنات الصفحة خطوة بخطوة وفقًا لوتيرتك. على سبيل المثال، يحتوي Cucumber Boilerplate على [مجموعة كبيرة من تعريفات الخطوات](https://github.com/webdriverio/cucumber-boilerplate/tree/main/src/support/action) يمكنك نسخها إلى مشروعك. يمكننا المضي قدمًا وترحيل تعريف خطوة واحد أو ملف واحد في كل مرة.

:::tip

يوفر WebdriverIO [codemod](https://github.com/webdriverio/codemod) الذي يسمح بتحويل الكود المتزامن إلى كود غير متزامن بشكل شبه آلي. قم بتشغيل codemod كما هو موضح في الوثائق أولاً واستخدم هذا الدليل للترحيل اليدوي إذا لزم الأمر.

:::

في كثير من الحالات، كل ما يلزم القيام به هو جعل الدالة التي تستدعي فيها أوامر WebdriverIO `async` وإضافة `await` أمام كل أمر. بالنظر إلى الملف الأول `clearInputField.ts` للتحويل في مشروع النموذج، نقوم بالتحويل من:

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

هذا كل شيء. يمكنك رؤية الكوميت الكامل مع جميع أمثلة إعادة الكتابة هنا:

#### الكوميتات:

- _تحويل جميع تعريفات الخطوات_ [[af6625f]](https://github.com/webdriverio/cucumber-boilerplate/pull/481/commits/af6625fcd01dc087479e84562f237ecf38b3537d)

:::info
هذا الانتقال مستقل عما إذا كنت تستخدم TypeScript أم لا. إذا كنت تستخدم TypeScript، تأكد من تغيير خاصية `types` في ملف `tsconfig.json` الخاص بك من `webdriverio/sync` إلى `@wdio/globals/types`. تأكد أيضًا من أن هدف التجميع الخاص بك معين على الأقل إلى `ES2018`.
:::

## حالات خاصة

بالطبع هناك دائمًا حالات خاصة حيث تحتاج إلى الانتباه قليلاً أكثر.

### حلقات ForEach

إذا كان لديك حلقة `forEach`، على سبيل المثال للتكرار على العناصر، فأنت بحاجة إلى التأكد من معالجة وظيفة رد الاتصال بشكل صحيح بطريقة غير متزامنة، على سبيل المثال:

```js
const elems = $$('div')
elems.forEach((elem) => {
    elem.click()
})
```

الدالة التي نمررها إلى `forEach` هي دالة تكرار. في عالم متزامن، ستنقر على جميع العناصر قبل المتابعة. إذا قمنا بتحويل هذا إلى كود غير متزامن، يجب علينا التأكد من أننا ننتظر انتهاء كل دالة تكرار من التنفيذ. بإضافة `async`/`await` ستعيد دوال التكرار وعدًا يجب علينا حله. الآن، `forEach` ليست مثالية للتكرار على العناصر لأنها لا تعيد نتيجة دالة التكرار، الوعد الذي نحتاج أن ننتظره. لذلك نحتاج إلى استبدال `forEach` بـ `map` التي تعيد ذلك الوعد. تم تنفيذ `map` وكذلك جميع طرق التكرار الأخرى للمصفوفات مثل `find` و `every` و `reduce` وغيرها بحيث تحترم الوعود داخل دوال التكرار وبالتالي تبسيطها للاستخدام في سياق غير متزامن. المثال أعلاه يبدو بعد التحويل كالتالي:

```js
const elems = await $$('div')
await elems.forEach((elem) => {
    return elem.click()
})
```

على سبيل المثال، من أجل جلب جميع عناصر `<h3 />` والحصول على محتوى النص الخاص بها، يمكنك تشغيل:

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

إذا بدا هذا معقدًا جدًا، فقد ترغب في التفكير في استخدام حلقات for البسيطة، على سبيل المثال:

```js
const elems = await $$('div')
for (const elem of elems) {
    await elem.click()
}
```

### تأكيدات WebdriverIO

إذا كنت تستخدم مساعد تأكيد WebdriverIO [`expect-webdriverio`](https://webdriver.io/docs/api/expect-webdriverio)، تأكد من وضع `await` أمام كل استدعاء `expect`، على سبيل المثال:

```ts
expect($('input')).toHaveAttributeContaining('class', 'form')
```

يجب تحويله إلى:

```ts
await expect($('input')).toHaveAttributeContaining('class', 'form')
```

### طرق PageObject المتزامنة والاختبارات غير المتزامنة

إذا كنت تكتب كائنات الصفحة في مجموعة الاختبار الخاصة بك بطريقة متزامنة، فلن تتمكن من استخدامها في الاختبارات غير المتزامنة بعد الآن. إذا كنت بحاجة إلى استخدام طريقة PageObject في كل من الاختبارات المتزامنة وغير المتزامنة، نوصي بتكرار الطريقة وتوفيرها لكلا البيئتين، على سبيل المثال:

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

إذا كنت لا ترغب في الاحتفاظ بإصدارين مختلفين من طريقة PageObject، يمكنك أيضًا ترحيل PageObject بالكامل إلى غير متزامن واستخدام [`browser.call`](https://webdriver.io/docs/api/browser/call) لتنفيذ الطريقة في بيئة متزامنة، على سبيل المثال:

```js
// before:
// MyPageObject.someMethod()
// after:
browser.call(() => MyPageObject.someMethod())
```

سيتأكد أمر `call` من حل `someMethod` غير المتزامن قبل الانتقال إلى الأمر التالي.

## الخلاصة

كما ترى في [PR إعادة الكتابة الناتج](https://github.com/webdriverio/cucumber-boilerplate/pull/481/files)، فإن تعقيد إعادة الكتابة هذه سهل نسبيًا. تذكر أنه يمكنك إعادة كتابة تعريف خطوة واحدة في كل مرة. WebdriverIO قادر تمامًا على التعامل مع التنفيذ المتزامن وغير المتزامن في إطار عمل واحد.