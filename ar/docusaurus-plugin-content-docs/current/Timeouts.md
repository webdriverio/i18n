---
id: timeouts
title: المهلات الزمنية
description: "قم بتكوين مهلات جلسة WebDriver ومهلات waitfor في WebdriverIO ومهلات إطار عمل الاختبار للحفاظ على موثوقية الاختبارات."
---

كل أمر في WebdriverIO هو عملية غير متزامنة. يتم إرسال طلب إلى خادم Selenium (أو خدمة سحابية مثل [Sauce Labs](https://saucelabs.com))، وتحتوي استجابته على النتيجة بمجرد اكتمال الإجراء أو فشله.

لذلك، يُعد الوقت عنصراً حاسماً في عملية الاختبار بأكملها. عندما يعتمد إجراء معين على حالة إجراء آخر، يجب عليك التأكد من تنفيذهما بالترتيب الصحيح. تلعب المهلات الزمنية دوراً مهماً عند التعامل مع هذه المشكلات.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## مهلات WebDriver الزمنية

### مهلة البرنامج النصي للجلسة

ترتبط بكل جلسة مهلة للبرامج النصية تحدد الوقت اللازم لانتظار تشغيل البرامج النصية غير المتزامنة. ما لم يُذكر خلاف ذلك، تكون 30 ثانية. يمكنك تعيين هذه المهلة على النحو التالي:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.execute(async () => {
    console.log('this should not fail')
    await new Promise((resolve) => setTimeout(resolve, 59000))
})
```

### مهلة تحميل الصفحة للجلسة

ترتبط بكل جلسة مهلة لتحميل الصفحة تحدد الوقت اللازم لانتظار اكتمال تحميل الصفحة. ما لم يُذكر خلاف ذلك، تكون 300,000 مللي ثانية.

يمكنك تعيين هذه المهلة على النحو التالي:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> `pageLoad` هو الاسم المعتمد في [مهلات](https://www.w3.org/TR/webdriver/#set-timeouts) WebDriver. يقبل WebdriverIO v10 هذا المفتاح فقط.

### مهلة الانتظار الضمني للجلسة

ترتبط بكل جلسة مهلة انتظار ضمني. تحدد هذه المهلة الوقت اللازم للانتظار في استراتيجية تحديد موقع العناصر الضمنية عند تحديد موقع العناصر باستخدام الأمرين [`findElement`](/docs/api/webdriver#findelement) أو [`findElements`](/docs/api/webdriver#findelements) ([`$`](/docs/api/browser/$) أو [`$$`](/docs/api/browser/$$) على التوالي، عند تشغيل WebdriverIO مع مشغل اختبارات WDIO أو بدونه). ما لم يُذكر خلاف ذلك، تكون 0 مللي ثانية.

يمكنك تعيين هذه المهلة عبر:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## المهلات الزمنية المتعلقة بـ WebdriverIO

### مهلة `WaitFor*`

يوفر WebdriverIO أوامر متعددة للانتظار حتى تصل العناصر إلى حالة معينة (مثل: مُفعّل، مرئي، موجود). تأخذ هذه الأوامر وسيطة محدد ورقماً للمهلة، والذي يحدد المدة التي يجب أن تنتظرها النسخة حتى يصل ذلك العنصر إلى الحالة المطلوبة. يتيح لك خيار `waitforTimeout` تعيين المهلة العامة لجميع أوامر `waitFor*`، حتى لا تحتاج إلى تعيين نفس المهلة مراراً وتكراراً. _(لاحظ الحرف الصغير `f`!)_

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

// يمكنك أيضاً تجاوز المهلة الافتراضية إذا لزم الأمر
await myElem.waitForDisplayed({ timeout: 10000 })
```

## المهلات الزمنية المتعلقة بإطار العمل

يتعين على إطار عمل الاختبار الذي تستخدمه مع WebdriverIO التعامل مع المهلات الزمنية، خاصةً أن كل شيء يتم بشكل غير متزامن. فهو يضمن عدم توقف عملية الاختبار إذا حدث خطأ ما.

افتراضياً، تكون المهلة 10 ثوانٍ، مما يعني أن الاختبار الواحد يجب ألا يستغرق وقتاً أطول من ذلك.

يبدو الاختبار الواحد في Mocha على النحو التالي:

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

في Cucumber، تنطبق المهلة على تعريف خطوة واحدة. ومع ذلك، إذا كنت ترغب في زيادة المهلة لأن اختبارك يستغرق وقتاً أطول من القيمة الافتراضية، فأنت بحاجة إلى تعيينها في خيارات إطار العمل.

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