---
id: timeouts
title: المهل الزمنية
---

كل أمر في WebdriverIO هو عملية غير متزامنة. يتم إرسال طلب إلى خادم Selenium (أو خدمة سحابية مثل [Sauce Labs](https://saucelabs.com))، واستجابته تحتوي على النتيجة بمجرد اكتمال الإجراء أو فشله.

لذلك، يعد الوقت عنصراً حاسماً في عملية الاختبار بأكملها. عندما يعتمد إجراء معين على حالة إجراء آخر، يجب التأكد من تنفيذها بالترتيب الصحيح. تلعب المهل الزمنية دوراً مهماً عند التعامل مع هذه المشكلات.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## مهل WebDriver الزمنية

### مهلة سكريبت الجلسة

تمتلك الجلسة مهلة زمنية مرتبطة لتنفيذ السكريبت تحدد الوقت المسموح به لانتظار تنفيذ السكريبت غير المتزامن. ما لم يُذكر خلاف ذلك، فإنها تكون 30 ثانية. يمكنك تعيين هذه المهلة الزمنية كما يلي:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.executeAsync((done) => {
    console.log('this should not fail')
    setTimeout(done, 59000)
})
```

### مهلة تحميل الصفحة للجلسة

تمتلك الجلسة مهلة زمنية مرتبطة لتحميل الصفحة تحدد الوقت المسموح به لانتظار اكتمال تحميل الصفحة. ما لم يُذكر خلاف ذلك، فإنها تكون 300,000 مللي ثانية.

يمكنك تعيين هذه المهلة الزمنية كما يلي:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> كلمة `pageLoad` هي جزء من [مواصفات](https://www.w3.org/TR/webdriver/#set-timeouts) WebDriver الرسمية، ولكن قد لا تكون [مدعومة](https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/687) في متصفحك (الاسم السابق هو `page load`).

### مهلة الانتظار الضمنية للجلسة

تمتلك الجلسة مهلة زمنية ضمنية مرتبطة للانتظار. تحدد هذه المهلة الوقت المسموح به للانتظار لاستراتيجية تحديد العناصر الضمنية عند البحث عن العناصر باستخدام أوامر [`findElement`](/docs/api/webdriver#findelement) أو [`findElements`](/docs/api/webdriver#findelements) ([`$`](/docs/api/browser/$) أو [`$$`](/docs/api/browser/$$)، على التوالي، عند تشغيل WebdriverIO مع أو بدون منصة اختبار WDIO). ما لم يُذكر خلاف ذلك، فإنها تكون 0 مللي ثانية.

يمكنك تعيين هذه المهلة الزمنية عبر:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## مهل WebdriverIO ذات الصلة

### مهلة `WaitFor*`

يوفر WebdriverIO أوامر متعددة للانتظار حتى تصل العناصر إلى حالة معينة (مثل التمكين، الرؤية، الوجود). تأخذ هذه الأوامر وسيط محدد ووقت مهلة، والذي يحدد المدة التي يجب أن تنتظرها المثيلة حتى يصل ذلك العنصر إلى الحالة. يتيح لك خيار `waitforTimeout` تعيين المهلة العامة لجميع أوامر `waitFor*`، بحيث لا تحتاج إلى تعيين نفس المهلة مراراً وتكراراً. _(لاحظ الحرف الصغير `f`!)_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

في اختباراتك، يمكنك الآن القيام بهذا:

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// يمكنك أيضًا تجاوز المهلة الافتراضية إذا لزم الأمر
await myElem.waitForDisplayed({ timeout: 10000 })
```

## مهل متعلقة بإطار العمل

يجب أن يتعامل إطار الاختبار الذي تستخدمه مع WebdriverIO مع المهل الزمنية، خاصة نظرًا لأن كل شيء غير متزامن. يضمن ذلك عدم توقف عملية الاختبار إذا حدث خطأ ما.

بشكل افتراضي، المهلة هي 10 ثوانٍ، وهذا يعني أن الاختبار الواحد يجب ألا يستغرق وقتًا أطول من ذلك.

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