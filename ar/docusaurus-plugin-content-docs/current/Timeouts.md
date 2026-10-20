---
id: timeouts
title: المهل الزمنية
description: "قم بتكوين المهل الزمنية لجلسة WebDriver والمهل الزمنية لأوامر waitfor في WebdriverIO والمهل الزمنية لإطار الاختبار للحفاظ على موثوقية الاختبارات."
---

كل أمر في WebdriverIO هو عملية غير متزامنة. يتم إرسال طلب إلى خادم Selenium (أو خدمة سحابية مثل [Sauce Labs](https://saucelabs.com))، وتحتوي الاستجابة على النتيجة بمجرد اكتمال الإجراء أو فشله.

لذلك، يُعد الوقت عنصرًا حاسمًا في عملية الاختبار بأكملها. عندما يعتمد إجراء معين على حالة إجراء آخر، تحتاج إلى التأكد من تنفيذهما بالترتيب الصحيح. تلعب المهل الزمنية دورًا مهمًا عند التعامل مع هذه المشكلات.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## المهل الزمنية لـ WebDriver

### مهلة البرنامج النصي للجلسة

ترتبط بكل جلسة مهلة للبرامج النصية تحدد وقت الانتظار لتشغيل البرامج النصية غير المتزامنة. ما لم يُذكر خلاف ذلك، فهي 30 ثانية. يمكنك تعيين هذه المهلة على النحو التالي:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.execute(async () => {
    console.log('this should not fail')
    await new Promise((resolve) => setTimeout(resolve, 59000))
})
```

### مهلة تحميل الصفحة للجلسة

ترتبط بكل جلسة مهلة لتحميل الصفحة تحدد وقت الانتظار حتى يكتمل تحميل الصفحة. ما لم يُذكر خلاف ذلك، فهي 300,000 مللي ثانية.

يمكنك تعيين هذه المهلة على النحو التالي:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> `pageLoad` هو اسم [المهلة](https://www.w3.org/TR/webdriver/#set-timeouts) في WebDriver. يقبل WebdriverIO v10 هذا المفتاح فقط.

### مهلة الانتظار الضمني للجلسة

ترتبط بكل جلسة مهلة للانتظار الضمني. تحدد هذه المهلة وقت الانتظار لاستراتيجية تحديد موقع العنصر الضمنية عند تحديد موقع العناصر باستخدام الأوامر [`findElement`](/docs/api/webdriver#findelement) أو [`findElements`](/docs/api/webdriver#findelements) (أو [`$`](/docs/api/browser/$) أو [`$$`](/docs/api/browser/$$) على التوالي، عند تشغيل WebdriverIO مع أداة تشغيل الاختبارات WDIO أو بدونها). ما لم يُذكر خلاف ذلك، فهي 0 مللي ثانية.

يمكنك تعيين هذه المهلة عبر:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## المهل الزمنية المتعلقة بـ WebdriverIO

### مهلة `WaitFor*`

يوفر WebdriverIO أوامر متعددة للانتظار حتى تصل العناصر إلى حالة معينة (مثل: ممكّن، مرئي، موجود). تأخذ هذه الأوامر وسيطة محدد (selector) ورقمًا للمهلة، يحدد المدة التي يجب أن تنتظرها النسخة حتى يصل ذلك العنصر إلى الحالة المطلوبة. يتيح لك الخيار `waitforTimeout` تعيين المهلة العامة لجميع أوامر `waitFor*`، بحيث لا تحتاج إلى تعيين نفس المهلة مرارًا وتكرارًا. _(لاحظ حرف `f` الصغير!)_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

في اختباراتك، يمكنك الآن القيام بما يلي:

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// you can also overwrite the default timeout if needed
await myElem.waitForDisplayed({ timeout: 10000 })
```

### عنصر أزالته الصفحة

عندما تزيل الصفحة عنصرًا أو تعيد عرضه، يعثر عليه WebdriverIO مرة أخرى باستخدام المحدد الخاص به وينتظر حتى `waitforTimeout`. إذا كان موجودًا، يُنفَّذ الأمر عليه. وإذا لم يكن موجودًا، يفشل الأمر مع:

- `message`: `Can't call <command> on element with selector "<selector>" because element wasn't found` (لعنصر من `$$()`: `… "<selector>" at index <n> …`؛ ولعنصر أب تمت إزالته: تتعلق الرسالة بالعنصر الأب)
- `cause`: خطأ مرجع العنصر القديم (stale element reference) الخاص بالمشغّل

يفشل `waitUntil` و`waitForEnabled` مع الخطأ الخاص بكل منهما، والذي يكون هذا الخطأ هو `cause` له. لا ينتظر `isDisplayed` و`isExisting` للعنصر الذي تمت إزالته: بل يُرجعان `false`. أما بالنسبة لعنصر ابن لعنصر أب تمت إزالته، فإنهما ينتظران ثم يفشلان مع هذا الخطأ.

```ts title="test/specs/removed.e2e.ts"
import { $, browser, expect } from '@wdio/globals'

describe('a removed element', () => {
    it('gives the error of an element that was not found again', async () => {
        await browser.url('https://webdriver.io')
        const title = await $('h1')
        await browser.execute(() => document.querySelectorAll('h1').forEach((h1) => h1.remove()))

        const error = await title.getText().then(() => null, (err: Error) => err)
        expect(error?.message).toContain('because element wasn\'t found')
    })
})
```

## المهل الزمنية المتعلقة بإطار العمل

يجب على إطار الاختبار الذي تستخدمه مع WebdriverIO التعامل مع المهل الزمنية، خاصةً أن كل شيء غير متزامن. فهو يضمن عدم تعطل عملية الاختبار إذا حدث خطأ ما.

افتراضيًا، تكون المهلة 10 ثوانٍ، مما يعني أن الاختبار الواحد يجب ألا يستغرق أطول من ذلك.

يبدو الاختبار الواحد في Mocha كما يلي:

```js
it('should login into the application', async () => {
    await browser.url('/login')

    const form = await $('form')
    const username = await $('#username')
    const password = await $('#password')

    await username.setValue('userXY')
    await password.setValue('******')
    await form.submit()

    expect(await browser.getTitle()).to.be.equal('Admin Area')
})
```

في Cucumber، تنطبق المهلة على تعريف خطوة واحدة. ومع ذلك، إذا كنت ترغب في زيادة المهلة لأن اختبارك يستغرق وقتًا أطول من القيمة الافتراضية، فأنت بحاجة إلى تعيينها في خيارات إطار العمل.

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
    {label: 'Cucumber', value: 'cucumber'}
  ]
}>
<TabItem value="mocha">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'mocha',
    mochaOpts: {
        timeout: 20000
    },
    // ...
}
```

</TabItem>
<TabItem value="jasmine">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'jasmine',
    jasmineOpts: {
        defaultTimeoutInterval: 20000
    },
    // ...
}
```

</TabItem>
<TabItem value="cucumber">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'cucumber',
    cucumberOpts: {
        timeout: 20000
    },
    // ...
}
```

</TabItem>
</Tabs>

### المهل الزمنية في Mocha وخطافات WebdriverIO

يمكن لاختبار أو خطاف (hook) في Mocha تغيير مهلته الخاصة باستخدام `this.timeout(ms)`. استخدم `function` وليس دالة سهمية (arrow function) للحصول على `this`. يتبع WebdriverIO هذا التغيير، بما في ذلك `this.timeout(0)` الذي يعطّل المهلة. مع `mochaOpts.parallelMode`، يُطبَّق `mochaOpts.timeout` فقط: يؤدي استدعاء `this.timeout()` في اختبار أو خطاف إلى رمي خطأ، ويتم تجاهل مهلة المجموعة (suite) أو مهلة `it(...).timeout()` مع إظهار تحذير. راجع [الاختبارات المتوازية في ملف مواصفات](./ParallelTests.md#hooks-and-timeouts).

تتضمن مهلة الاختبار وقت خطاف `beforeTest` الخاص به، إذ يبدأ Mocha المؤقت قبل الخطاف. مع [خيار إعادة المحاولة](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) في WebdriverIO، تتشارك جميع محاولات الاختبار مهلة واحدة.

عندما تنتهي مهلة اختبار أو خطاف، يشغّل WebdriverIO الخطاف `afterTest` (أو `afterHook`) قبل أن يبدأ Mocha الاختبار التالي، بحيث لا يمكن تشغيل ذلك الخطاف في نفس وقت تشغيل الاختبار التالي. ينتظر Mocha هذه الخطافات لمدة تصل إلى مهلة إضافية واحدة للاختبار.