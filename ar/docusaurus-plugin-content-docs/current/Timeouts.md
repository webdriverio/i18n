---
id: timeouts
title: المهل الزمنية
---

كل أمر في WebdriverIO هو عملية غير متزامنة. يتم إرسال طلب إلى خادم Selenium (أو خدمة سحابية مثل [Sauce Labs](https://saucelabs.com))، وتحتوي استجابته على النتيجة بمجرد اكتمال الإجراء أو فشله.

لذلك، يُعد الوقت مكونًا حاسمًا في عملية الاختبار بأكملها. عندما يعتمد إجراء معين على حالة إجراء آخر، عليك التأكد من تنفيذها بالترتيب الصحيح. تلعب المهل الزمنية دورًا مهمًا عند التعامل مع هذه المشكلات.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## مهل WebDriver الزمنية

### مهلة سكريبت الجلسة

تحتوي الجلسة على مهلة سكريبت مرتبطة بها تحدد وقت الانتظار لتشغيل السكريبتات غير المتزامنة. ما لم يُذكر خلاف ذلك، فإنها 30 ثانية. يمكنك تعيين هذه المهلة الزمنية على النحو التالي:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.executeAsync((done) => {
    console.log('this should not fail')
    setTimeout(done, 59000)
})
```

### مهلة تحميل صفحة الجلسة

تحتوي الجلسة على مهلة تحميل صفحة مرتبطة بها تحدد وقت الانتظار لاكتمال تحميل الصفحة. ما لم يُذكر خلاف ذلك، فإنها 300,000 مللي ثانية.

يمكنك تعيين هذه المهلة الزمنية على النحو التالي:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> مصطلح `pageLoad` هو جزء من [مواصفات](https://www.w3.org/TR/webdriver/#set-timeouts) WebDriver الرسمية، ولكنه قد لا يكون [مدعومًا](https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/687) لمتصفحك (الاسم السابق هو `page load`).

### مهلة الانتظار الضمني للجلسة

تحتوي الجلسة على مهلة انتظار ضمنية مرتبطة بها. تحدد هذه المهلة وقت الانتظار لاستراتيجية تحديد العناصر الضمنية عند تحديد العناصر باستخدام أوامر [`findElement`](/docs/api/webdriver#findelement) أو [`findElements`](/docs/api/webdriver#findelements) ([`$`](/docs/api/browser/$) أو [`$$`](/docs/api/browser/$$) على التوالي، عند تشغيل WebdriverIO مع أو بدون WDIO testrunner). ما لم يُذكر خلاف ذلك، فإنها 0 مللي ثانية.

يمكنك تعيين هذه المهلة الزمنية عبر:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## مهل WebdriverIO ذات الصلة

### مهلة `WaitFor*`

يوفر WebdriverIO أوامر متعددة للانتظار حتى تصل العناصر إلى حالة معينة (مثل التمكين، الظهور، الوجود). تأخذ هذه الأوامر وسيطة منتقي ورقم مهلة زمنية، والتي تحدد المدة التي يجب أن تنتظرها المثيلة حتى يصل ذلك العنصر إلى الحالة. يتيح لك خيار `waitforTimeout` تعيين المهلة العالمية لجميع أوامر `waitFor*`، بحيث لا تحتاج إلى تعيين نفس المهلة مرارًا وتكرارًا. _(لاحظ الحرف `f` الصغير!)_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

في اختباراتك، يمكنك الآن فعل هذا:

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// يمكنك أيضًا تجاوز المهلة الافتراضية إذا لزم الأمر
await myElem.waitForDisplayed({ timeout: 10000 })
```

## مهل الإطار ذات الصلة

يجب أن يتعامل إطار الاختبار الذي تستخدمه مع WebdriverIO مع المهل الزمنية، خاصة لأن كل شيء غير متزامن. وهذا يضمن أن عملية الاختبار لا تتعطل إذا حدث خطأ ما.

بشكل افتراضي، المهلة هي 10 ثوانٍ، مما يعني أن الاختبار الواحد يجب ألا يستغرق وقتًا أطول من ذلك.

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

في Cucumber، تنطبق المهلة الزمنية على تعريف خطوة واحدة. ومع ذلك، إذا كنت ترغب في زيادة المهلة لأن اختبارك يستغرق وقتًا أطول من القيمة الافتراضية، فأنت بحاجة إلى تعيينها في خيارات الإطار.

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