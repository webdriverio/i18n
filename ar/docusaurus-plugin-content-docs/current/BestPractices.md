---
id: bestpractices
title: أفضل الممارسات
description: "اكتب اختبارات سريعة ومتينة باستخدام WebdriverIO من خلال استخدام محددات مستقرة، وتقليل استعلامات العناصر، والتأكيدات المدمجة، وتجنب التوقفات اليدوية."
---

# أفضل الممارسات

يهدف هذا الدليل إلى مشاركة أفضل ممارساتنا التي تساعدك على كتابة اختبارات عالية الأداء ومتينة.

## استخدم محددات متينة

باستخدام محددات متينة في مواجهة التغييرات في DOM، سيكون لديك عدد أقل من الاختبارات الفاشلة أو حتى لن تفشل أي اختبارات عندما تتم على سبيل المثال إزالة class من عنصر ما.

يمكن تطبيق الـ classes على عناصر متعددة ويجب تجنبها إن أمكن، إلا إذا كنت تريد عمداً جلب جميع العناصر التي تحمل ذلك الـ class.

```js
// 👎
await $('.button')
```

يجب أن تُرجع جميع هذه المحددات عنصراً واحداً.

```js
// 👍
await $('aria/Submit')
await $('[test-id="submit-button"]')
await $('#submit-button')
```

__ملاحظة:__ لمعرفة جميع المحددات الممكنة التي يدعمها WebdriverIO، راجع صفحة [المحددات](./Selectors.md) الخاصة بنا.

## قلّل عدد استعلامات العناصر

في كل مرة تستخدم فيها الأمر [`$`](https://webdriver.io/docs/api/browser/$) أو [`$$`](https://webdriver.io/docs/api/browser/$$) (ويشمل ذلك ربطها بشكل متسلسل)، يحاول WebdriverIO تحديد موقع العنصر في DOM. هذه الاستعلامات مكلفة، لذا يجب أن تحاول تقليلها قدر الإمكان.

يستعلم عن ثلاثة عناصر.

```js
// 👎
await $('table').$('tr').$('td')
```

يستعلم عن عنصر واحد فقط.

``` js
// 👍
await $('table tr td')
```

الحالة الوحيدة التي يجب أن تستخدم فيها الربط المتسلسل هي عندما تريد الجمع بين [استراتيجيات محددات](https://webdriver.io/docs/selectors/#custom-selector-strategies) مختلفة.
في المثال نستخدم [المحددات العميقة](https://webdriver.io/docs/selectors#deep-selectors)، وهي استراتيجية للدخول إلى shadow DOM الخاص بعنصر ما.

``` js
// 👍
await $('custom-datepicker').$('#calendar').$('aria/Select')
```

### فضّل تحديد موقع عنصر واحد بدلاً من أخذ واحد من قائمة

ليس من الممكن دائماً القيام بذلك، ولكن باستخدام CSS pseudo-classes مثل [:nth-child](https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child) يمكنك مطابقة العناصر بناءً على فهارسها في قائمة العناصر الفرعية لعناصرها الأب.

يستعلم عن جميع صفوف الجدول.

```js
// 👎
await $$('table tr')[15]
```

يستعلم عن صف واحد من الجدول.

```js
// 👍
await $('table tr:nth-child(15)')
```

## استخدم التأكيدات المدمجة

لا تستخدم التأكيدات اليدوية التي لا تنتظر تلقائياً تطابق النتائج، لأن ذلك سيتسبب في اختبارات غير مستقرة.

```js
// 👎
expect(await button.isDisplayed()).toBe(true)
```

باستخدام التأكيدات المدمجة، سينتظر WebdriverIO تلقائياً حتى تتطابق النتيجة الفعلية مع النتيجة المتوقعة، مما ينتج عنه اختبارات متينة.
ويحقق ذلك من خلال إعادة محاولة التأكيد تلقائياً حتى ينجح أو تنتهي المهلة.

```js
// 👍
await expect(button).toBeDisplayed()
```

## التحميل الكسول وربط الـ promises

يمتلك WebdriverIO بعض الحيل عندما يتعلق الأمر بكتابة كود نظيف، إذ يمكنه تحميل العنصر بشكل كسول (lazy load)، مما يسمح لك بربط الـ promises بشكل متسلسل ويقلل من عدد `await`. كما يسمح لك هذا بتمرير العنصر كـ ChainablePromiseElement بدلاً من Element ويسهّل الاستخدام مع page objects.

إذن متى يجب عليك استخدام `await`؟
يجب عليك دائماً استخدام `await` باستثناء الأمرين `$` و `$$`.

```js
// 👎
const div = await $('div')
const button = await div.$('button')
await button.click()
// or
await (await (await $('div')).$('button')).click()
```

```js
// 👍
const button = $('div').$('button')
await button.click()
// or
await $('div').$('button').click()
```

## لا تُفرط في استخدام الأوامر والتأكيدات

عند استخدام expect.toBeDisplayed فإنك تنتظر ضمنياً أيضاً وجود العنصر. لا حاجة لاستخدام أوامر waitForXXX عندما يكون لديك بالفعل تأكيد يقوم بنفس الشيء.

```js
// 👎
await button.waitForExist()
await expect(button).toBeDisplayed()

// 👎
await button.waitForDisplayed()
await expect(button).toBeDisplayed()

// 👍
await expect(button).toBeDisplayed()
```

لا حاجة لانتظار وجود عنصر أو ظهوره عند التفاعل معه أو عند التأكد من شيء ما مثل نصه، إلا إذا كان من الممكن أن يكون العنصر غير مرئي بشكل صريح (opacity: 0 على سبيل المثال) أو يمكن أن يكون معطلاً بشكل صريح (السمة disabled على سبيل المثال)، ففي هذه الحالة يكون انتظار ظهور العنصر منطقياً.

```js
// 👎
await expect(button).toBeExisting()
await expect(button).toHaveText('Submit')

// 👎
await expect(button).toBeDisplayed()
await expect(button).toHaveText('Submit')

// 👎
await expect(button).toBeDisplayed()
await button.click()
```

```js
// 👍
await button.click()

// 👍
await expect(button).toHaveText('Submit')
```

## الاختبارات الديناميكية

استخدم متغيرات البيئة لتخزين بيانات الاختبار الديناميكية، مثل بيانات الاعتماد السرية، داخل بيئتك بدلاً من كتابتها بشكل ثابت في الاختبار. توجه إلى صفحة [تحديد معاملات الاختبارات](parameterize-tests) لمزيد من المعلومات حول هذا الموضوع.

## افحص الكود الخاص بك

باستخدام eslint لفحص الكود الخاص بك، يمكنك اكتشاف الأخطاء مبكراً، استخدم [قواعد الفحص](https://www.npmjs.com/package/eslint-plugin-wdio) الخاصة بنا للتأكد من تطبيق بعض أفضل الممارسات دائماً.

## لا تستخدم التوقف المؤقت

قد يكون من المغري استخدام الأمر pause، لكن استخدامه فكرة سيئة لأنه ليس متيناً وسيتسبب فقط في اختبارات غير مستقرة على المدى الطويل.

```js
// 👎
await nameInput.setValue('Bob')
await browser.pause(200) // wait for submit button to enable
await submitFormButton.click()

// 👍
await nameInput.setValue('Bob')
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

## الحلقات غير المتزامنة

عندما يكون لديك كود غير متزامن تريد تكراره، من المهم أن تعرف أنه ليست كل الحلقات قادرة على ذلك.
على سبيل المثال، دالة forEach الخاصة بالمصفوفات لا تسمح باستدعاءات راجعة (callbacks) غير متزامنة، كما يمكن قراءته على [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

__ملاحظة:__ لا يزال بإمكانك استخدامها عندما لا تحتاج إلى أن تكون العملية غير متزامنة كما هو موضح في هذا المثال `console.log(await $$('h1').map((h1) => h1.getText()))`.

فيما يلي بعض الأمثلة على ما يعنيه ذلك.

ما يلي لن يعمل لأن الاستدعاءات الراجعة غير المتزامنة غير مدعومة.

```js
// 👎
const characters = 'this is some example text that should be put in order'
characters.forEach(async (character) => {
    await browser.keys(character)
})
```

ما يلي سيعمل.

```js
// 👍
const characters = 'this is some example text that should be put in order'
for (const character of characters) {
    await browser.keys(character)
}
```

## اجعل الأمر بسيطاً

نرى أحياناً مستخدمينا يقومون بتعيين (map) بيانات مثل النصوص أو القيم. غالباً ما لا يكون هذا ضرورياً وغالباً ما يكون مؤشراً على كود سيئ (code smell)، راجع الأمثلة أدناه لمعرفة سبب ذلك.

```js
// 👎 معقد جداً، تأكيد متزامن، استخدم التأكيدات المدمجة لتجنب الاختبارات غير المستقرة
const headerText = ['Products', 'Prices']
const texts = await $$('th').map(e => e.getText());
expect(texts).toBe(headerText)

// 👎 معقد جداً
const headerText = ['Products', 'Prices']
const columns = await $$('th');
await expect(columns).toBeElementsArrayOfSize(2);
for (let i = 0; i < columns.length; i++) {
    await expect(columns[i]).toHaveText(headerText[i]);
}

// 👎 يجد العناصر من خلال نصها لكنه لا يأخذ في الاعتبار موضع العناصر
await expect($('th=Products')).toExist();
await expect($('th=Prices')).toExist();
```

```js
// 👍 استخدم معرّفات فريدة (غالباً ما تُستخدم للعناصر المخصصة)
await expect($('[data-testid="Products"]')).toHaveText('Products');
// 👍 أسماء إمكانية الوصول (غالباً ما تُستخدم لعناصر html الأصلية)
await expect($('aria/Product Prices')).toHaveText('Prices');
```

شيء آخر نراه أحياناً هو أن الأشياء البسيطة لها حلول معقدة بشكل مفرط.

```js
// 👎
class BadExample {
    public async selectOptionByValue(value: string) {
        await $('select').click();
        await $$('option')
            .map(async function (element) {
                const hasValue = (await element.getValue()) === value;
                if (hasValue) {
                    await $(element).click();
                }
                return hasValue;
            });
    }

    public async selectOptionByText(text: string) {
        await $('select').click();
        await $$('option')
            .map(async function (element) {
                const hasText = (await element.getText()) === text;
                if (hasText) {
                    await $(element).click();
                }
                return hasText;
            });
    }
}
```

```js
// 👍
class BetterExample {
    public async selectOptionByValue(value: string) {
        await $('select').click();
        await $(`option[value=${value}]`).click();
    }

    public async selectOptionByText(text: string) {
        await $('select').click();
        await $(`option=${text}]`).click();
    }
}
```

## تنفيذ الكود بشكل متوازٍ

إذا كنت لا تهتم بالترتيب الذي يتم به تشغيل بعض الكود، يمكنك استخدام [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) لتسريع التنفيذ.

__ملاحظة:__ نظراً لأن هذا يجعل الكود أصعب في القراءة، يمكنك تجريده باستخدام page object أو دالة، على الرغم من أنه يجب عليك أيضاً التساؤل عما إذا كانت الفائدة في الأداء تستحق التضحية بسهولة القراءة.

```js
// 👎
await name.setValue('Bob')
await email.setValue('bob@webdriver.io')
await age.setValue('50')
await submitFormButton.waitForEnabled()
await submitFormButton.click()

// 👍
await Promise.all([
    name.setValue('Bob'),
    email.setValue('bob@webdriver.io'),
    age.setValue('50'),
])
await submitFormButton.waitForEnabled()
await submitFormButton.click()
```

إذا تم تجريده، فقد يبدو شيئاً مثل ما يلي، حيث يتم وضع المنطق في دالة تسمى submitWithDataOf ويتم استرجاع البيانات بواسطة الـ class المسمى Person.

```js
// 👍
await form.submitData(new Person('bob@webdriver.io'))
```