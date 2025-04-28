---
id: expect-webdriverio
title: توقع
custom_edit_url: https://github.com/webdriverio/expect-webdriverio/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


عند كتابة الاختبارات، غالبًا ما تحتاج إلى التحقق من أن القيم تلبي شروطًا معينة. يوفر لك `expect` الوصول إلى عدد من "المطابقات" التي تتيح لك التحقق من أشياء مختلفة على كائن `browser` أو `element` أو `mock`.

## الخيارات الافتراضية

خيارات الافتراضية أدناه مرتبطة بخيارات [`waitforTimeout`](https://webdriver.io/docs/options#waitfortimeout) و [`waitforInterval`](https://webdriver.io/docs/options#waitforinterval) المحددة في التكوين.

قم بتعيين الخيارات أدناه فقط إذا كنت ترغب في الانتظار لمهلات محددة لتأكيداتك.

```js
{
    wait: 2000, // ميلي ثانية للانتظار حتى ينجح التوقع
    interval: 100, // الفاصل الزمني بين المحاولات
}
```

إذا كنت ترغب في اختيار مهل زمنية وفترات مختلفة، فقم بتعيين هذه الخيارات على النحو التالي:

```js
// wdio.conf.js
import { setOptions } from 'expect-webdriverio'

export const config = {
    // ...
    before () {
        setOptions({ wait: 5000 })
    },
    // ...
}
```

### خيارات المطابقة

يمكن لكل مطابقة أن تأخذ عدة خيارات تسمح لك بتعديل التأكيد:

##### خيارات الأمر

| الاسم | النوع | التفاصيل |
| ---- | ---- | ------- |
| <code><var>wait</var></code> | number | الوقت بالميلي ثانية للانتظار حتى ينجح التوقع. الافتراضي: `3000` |
| <code><var>interval</var></code> | number | الفاصل الزمني بين المحاولات. الافتراضي: `100` |
| <code><var>beforeAssertion</var></code> | function | دالة يتم استدعاؤها قبل إجراء التأكيد |
| <code><var>afterAssertion</var></code> | function | دالة يتم استدعاؤها بعد إجراء التأكيد تحتوي على نتائج التأكيد |
| <code><var>message</var></code> | string | رسالة المستخدم لإضافتها قبل خطأ التأكيد |

##### خيارات النص

يمكن تطبيق هذا الخيار بالإضافة إلى خيارات الأمر عند التأكد من النصوص.

| الاسم | النوع | التفاصيل |
| ---- | ---- | ------- |
| <code><var>ignoreCase</var></code> | boolean | تطبيق `toLowerCase` على كل من القيم الفعلية والمتوقعة |
| <code><var>trim</var></code> | boolean | تطبيق `trim` على القيمة الفعلية |
| <code><var>replace</var></code> | Replacer \| Replacer[] | استبدال أجزاء من القيمة الفعلية التي تطابق النص/التعبير النمطي. يمكن أن يكون المستبدل نصًا أو دالة.
| <code><var>containing</var></code> | boolean | توقع أن تحتوي القيمة الفعلية على القيمة المتوقعة، وإلا يكون التساوي صارمًا. |
| <code><var>asString</var></code> | boolean | قد يكون مفيدًا لإجبار تحويل قيمة الخاصية إلى نص |
| <code><var>atStart</var></code> | boolean | توقع أن تبدأ القيمة الفعلية بالقيمة المتوقعة |
| <code><var>atEnd</var></code> | boolean | توقع أن تنتهي القيمة الفعلية بالقيمة المتوقعة |
| <code><var>atIndex</var></code> | number | توقع أن تحتوي القيمة الفعلية على القيمة المتوقعة في الفهرس المحدد |

##### خيارات الرقم

يمكن تطبيق هذا الخيار بالإضافة إلى خيارات الأمر عند التأكد من الأرقام.

| الاسم | النوع | التفاصيل |
| ---- | ---- | ------- |
| <code><var>eq</var></code> | number | يساوي |
| <code><var>lte</var></code> | number | أقل من أو يساوي |
| <code><var>gte</var></code> | number | أكبر من أو يساوي |

### التعامل مع كيانات HTML

كيان HTML عبارة عن قطعة من النص ("سلسلة") تبدأ بعلامة أمبرساند (`&`) وتنتهي بفاصلة منقوطة (`;`). تُستخدم الكيانات بشكل متكرر لعرض الأحرف المحجوزة (التي قد يتم تفسيرها على أنها كود HTML)، والأحرف غير المرئية (مثل المسافات غير القابلة للكسر، مثل `&nbsp;`).

للعثور على مثل هذا العنصر أو التفاعل معه، استخدم المكافئ اليونيكود للكيان. على سبيل المثال:

```html
<div data="Some&nbsp;Value">Some&nbsp;Text</div>
```

```js
const myElem = await $('div[data="Some\u00a0Value"]')
await expect(myElem).toHaveAttribute('data', 'div[Some\u00a0Value')
await expect(myElem).toHaveText('Some\u00a0Text')
```

يمكنك العثور على جميع مراجع اليونيكود في [مواصفات HTML](https://html.spec.whatwg.org/multipage/named-characters.html#named-character-references).

**ملاحظة:** اليونيكود غير حساس لحالة الأحرف، وبالتالي فإن كلا من `\u00a0` و `\u00A0` يعملان. للعثور على العنصر في فحص المتصفح، قم بإزالة `u` من اليونيكود على سبيل المثال: `div[data="Some\00a0Value"]`

## مطابقات المتصفح

### toHaveUrl

يتحقق مما إذا كان المتصفح على صفحة معينة.

##### الاستخدام

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveUrl('https://webdriver.io')
```

##### الاستخدام

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveUrl(expect.stringContaining('webdriver'))
```

### toHaveTitle

يتحقق مما إذا كان للموقع عنوان محدد.

##### الاستخدام

```js
await browser.url('https://webdriver.io/')
await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js')
await expect(browser).toHaveTitle(expect.stringContaining('WebdriverIO'))
```

### toHaveClipboardText

يتحقق مما إذا كان لدى المتصفح نص محدد مخزن في الحافظة.

##### الاستخدام

```js
import { Key } from 'webdriverio'

await browser.keys([Key.Ctrl, 'a'])
await browser.keys([Key.Ctrl, 'c'])
await expect(browser).toHaveClipboardText('some clipboard text')
await expect(browser).toHaveClipboardText(expect.stringContaining('clipboard text'))
```

## مطابقات العنصر

### toBeDisplayed

يستدعي [`isDisplayed`](https://webdriver.io/docs/api/element/isDisplayed/) على العنصر المعطى.

##### الاستخدام

```js
const elem = await $('#someElem')
await expect(elem).toBeDisplayed()
```

### toExist

يستدعي [`isExisting`](https://webdriver.io/docs/api/element/isExisting) على العنصر المعطى.

##### الاستخدام

```js
const elem = await $('#someElem')
await expect(elem).toExist()
```

### toBePresent

نفس `toExist`.

##### الاستخدام

```js
const elem = await $('#someElem')
await expect(elem).toBePresent()
```

### toBeExisting

نفس `toExist`.

##### الاستخدام

```js
const elem = await $('#someElem')
await expect(elem).toBeExisting()
```

### toBeFocused

يتحقق مما إذا كان العنصر له تركيز. يعمل هذا التأكيد فقط في سياق الويب.

##### الاستخدام

```js
const elem = await $('#someElem')
await expect(elem).toBeFocused()
```

### toHaveAttribute

يتحقق مما إذا كان للعنصر سمة معينة بقيمة محددة.

##### الاستخدام

```js
const myInput = await $('input')
await expect(myInput).toHaveAttribute('class', 'form-control')
await expect(myInput).toHaveAttribute('class', expect.stringContaining('control'))
```

### toHaveAttr

نفس `toHaveAttribute`.

##### الاستخدام

```js
const myInput = await $('input')
await expect(myInput).toHaveAttr('class', 'form-control')
await expect(myInput).toHaveAttr('class', expect.stringContaining('control'))
```

### toHaveElementClass

يتحقق مما إذا كان للعنصر اسم فئة واحد. يمكن أيضًا استدعاؤه بمصفوفة كوسيط عندما يكون للعنصر أسماء فئات متعددة.

##### الاستخدام

```js
const myInput = await $('input')
await expect(myInput).toHaveElementClass('form-control', { message: 'Not a form control!' })
await expect(myInput).toHaveElementClass(['form-control' , 'w-full'], { message: 'not full width' })
await expect(myInput).toHaveElementClass(expect.stringContaining('form'), { message: 'Not a form control!' })
```

### toHaveElementProperty

يتحقق مما إذا كان للعنصر خاصية معينة.

##### الاستخدام

```js
const elem = await $('#elem')
await expect(elem).toHaveElementProperty('height', 23)
await expect(elem).not.toHaveElementProperty('height', 0)
```

### toHaveValue

يتحقق مما إذا كان لعنصر الإدخال قيمة معينة.

##### الاستخدام

```js
const myInput = await $('input')
await expect(myInput).toHaveValue('admin-user', { ignoreCase: true })
await expect(myInput).toHaveValue(expect.stringContaining('user'), { ignoreCase: true })
```

### toBeClickable

يتحقق مما إذا كان من الممكن النقر على عنصر عن طريق استدعاء [`isClickable`](https://webdriver.io/docs/api/element/isClickable) على العنصر.

##### الاستخدام

```js
const elem = await $('#elem')
await expect(elem).toBeClickable()
```

### toBeDisabled

يتحقق مما إذا كان العنصر معطلاً عن طريق استدعاء [`isEnabled`](https://webdriver.io/docs/api/element/isEnabled) على العنصر.

##### الاستخدام

```js
const elem = await $('#elem')
await expect(elem).toBeDisabled()
// same as
await expect(elem).not.toBeEnabled()
```

### toBeEnabled

يتحقق مما إذا كان العنصر ممكنًا عن طريق استدعاء [`isEnabled`](https://webdriver.io/docs/api/element/isEnabled) على العنصر.

##### الاستخدام

```js
const elem = await $('#elem')
await expect(elem).toBeEnabled()
// same as
await expect(elem).not.toBeDisabled()
```

### toBeSelected

يتحقق مما إذا كان العنصر ممكنًا عن طريق استدعاء [`isSelected`](https://webdriver.io/docs/api/element/isSelected) على العنصر.

##### الاستخدام

```js
const elem = await $('#elem')
await expect(elem).toBeSelected()
```

### toBeChecked

نفس `toBeSelected`.

##### الاستخدام

```js
const elem = await $('#elem')
await expect(elem).toBeChecked()
```

### toHaveComputedLabel

يتحقق مما إذا كان العنصر له تسمية WAI-ARIA محسوبة محددة. يمكن أيضًا استدعاؤه بمصفوفة كوسيط في حالة وجود تسميات مختلفة للعنصر.

##### الاستخدام

```js
await browser.url('https://webdriver.io/')
const elem = await $('a[href="https://github.com/webdriverio/webdriverio"]')
await expect(elem).toHaveComputedLabel('GitHub repository')
await expect(elem).toHaveComputedLabel(expect.stringContaining('repository'))
```

##### الاستخدام

```js
await browser.url('https://webdriver.io/')
const elem = await $('a[href="https://github.com/webdriverio/webdriverio"]')
await expect(elem).toHaveComputedLabel(['GitHub repository', 'Private repository'])
await expect(elem).toHaveComputedLabel([expect.stringContaining('GitHub'), expect.stringContaining('Private')])
```

### toHaveComputedRole

يتحقق مما إذا كان العنصر له دور WAI-ARIA محسوب محدد. يمكن أيضًا استدعاؤه بمصفوفة كوسيط في حالة وجود تسميات مختلفة للعنصر.

##### الاستخدام

```js
await browser.url('https://webdriver.io/')
const elem = await $('[aria-label="Skip to main content"]')
await expect(elem).toHaveComputedRole('region')
await expect(elem).toHaveComputedRole(expect.stringContaining('ion'))
```

##### الاستخدام

```js
await browser.url('https://webdriver.io/')
const elem = await $('[aria-label="Skip to main content"]')
await expect(elem).toHaveComputedRole(['region', 'section'])
await expect(elem).toHaveComputedRole([expect.stringContaining('reg'), expect.stringContaining('sec')])
```

### toHaveHref

يتحقق مما إذا كان عنصر الرابط له هدف رابط محدد.

##### الاستخدام

```js
const link = await $('a')
await expect(link).toHaveHref('https://webdriver.io')
await expect(link).toHaveHref(expect.stringContaining('webdriver.io'))
```

### toHaveLink

نفس `toHaveHref`.

##### الاستخدام

```js
const link = await $('a')
await expect(link).toHaveLink('https://webdriver.io')
await expect(link).toHaveLink(expect.stringContaining('webdriver.io'))
```

### toHaveId

يتحقق مما إذا كان للعنصر سمة `id` محددة.

##### الاستخدام

```js
const elem = await $('#elem')
await expect(elem).toHaveId('elem')
```

### toHaveText

يتحقق مما إذا كان للعنصر نص محدد. يمكن أيضًا استدعاؤه بمصفوفة كوسيط في حالة وجود نصوص مختلفة للعنصر.

##### الاستخدام

```js
await browser.url('https://webdriver.io/')
const elem = await $('.container')
await expect(elem).toHaveText('Next-gen browser and mobile automation test framework for Node.js')
await expect(elem).toHaveText(expect.stringContaining('test framework for Node.js'))
await expect(elem).toHaveText(['Next-gen browser and mobile automation test framework for Node.js', 'Get Started'])
await expect(elem).toHaveText([expect.stringContaining('test framework for Node.js'), expect.stringContaining('Started')])
```

في حالة وجود قائمة من العناصر في الـ div أدناه:

```
<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>
```

يمكنك التأكد منها باستخدام مصفوفة:

```js
const elem = await $$('ul > li')
await expect(elem).toHaveText(['Coffee', 'Tea', 'Milk'])
```

### toHaveHTML

يتحقق مما إذا كان للعنصر نص محدد. يمكن أيضًا استدعاؤه بمصفوفة كوسيط في حالة وجود نصوص مختلفة للعنصر.

##### الاستخدام

```js
await browser.url('https://webdriver.io/')
const elem = await $('.hero__subtitle')
await expect(elem).toHaveHTML('<p class="hero__subtitle">Next-gen browser and mobile automation test framework for Node.js</p>')
await expect(elem).toHaveHTML(expect.stringContaining('Next-gen browser and mobile automation test framework for Node.js'))
await expect(elem).toHaveHTML('Next-gen browser and mobile automation test framework for Node.js', { includeSelectorTag: false })
```

##### الاستخدام

```js
await browser.url('https://webdriver.io/')
const elem = await $('.hero__subtitle')
await expect(elem).toHaveHTML(['Next-gen browser and mobile automation test framework for Node.js', 'Get Started'], { includeSelectorTag: false })
await expect(elem).toHaveHTML([expect.stringContaining('automation test framework for Node.js'), expect.stringContaining('Started')], { includeSelectorTag: false })
```

### toBeDisplayedInViewport

يتحقق مما إذا كان العنصر ضمن نطاق الرؤية عن طريق استدعاء [`isDisplayedInViewport`](https://webdriver.io/docs/api/element/isDisplayedInViewport) على العنصر.

##### الاستخدام

```js
const elem = await $('#elem')
await expect(elem).toBeDisplayedInViewport()
```

### toHaveChildren

يتحقق من عدد أطفال العنصر المجلوب عن طريق استدعاء أمر `element.$('./*')`.

##### الاستخدام

```js
const list = await $('ul')
await expect(list).toHaveChildren() // القائمة لديها عنصر واحد على الأقل
// نفس
await expect(list).toHaveChildren({ gte: 1 })

await expect(list).toHaveChildren(3) // القائمة لديها 3 عناصر
// نفس 
await expect(list).toHaveChildren({ eq: 3 })
```

### toHaveWidth

يتحقق مما إذا كان للعنصر عرض محدد.

##### الاستخدام

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveWidth(32)
```

### toHaveHeight

يتحقق مما إذا كان للعنصر ارتفاع محدد.

##### الاستخدام

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveHeight(32)
```

### toHaveSize

يتحقق مما إذا كان للعنصر حجم محدد.

##### الاستخدام

```js
await browser.url('http://github.com')
const logo = await $('.octicon-mark-github')
await expect(logo).toHaveSize({ width: 32, height: 32 })
```

### toBeElementsArrayOfSize

يتحقق من عدد العناصر التي تم جلبها باستخدام أمر [`$$`](https://webdriver.io/docs/api/element/$).

**ملاحظة:** سيقوم هذا المطابق بتحديث المصفوفة الممررة بأحدث العناصر إذا نجح التأكيد. ومع ذلك، إذا كنت قد أعدت تعيين المتغير، فستحتاج إلى جلب العناصر مرة أخرى.

##### الاستخدام

```js
const listItems = await $$('ul>li')
await expect(listItems).toBeElementsArrayOfSize(5) // 5 عناصر في القائمة

await expect(listItems).toBeElementsArrayOfSize({ lte: 10 })
// نفس
assert.ok(listItems.length <= 10)
```

## مطابقات الشبكة

### toBeRequested

يتحقق من أن المحاكاة قد تم استدعاؤها

##### الاستخدام

```js
const mock = browser.mock('**/api/todo*')
await expect(mock).toBeRequested()
```

### toBeRequestedTimes

يتحقق من أن المحاكاة قد تم استدعاؤها للعدد المتوقع من المرات

##### الاستخدام

```js
const mock = browser.mock('**/api/todo*')
await expect(mock).toBeRequestedTimes(2) // await expect(mock).toBeRequestedTimes({ eq: 2 })

await expect(mock).toBeRequestedTimes({ gte: 5, lte: 10 }) // تم استدعاء الطلب على الأقل 5 مرات ولكن أقل من 11
```

### toBeRequestedWith

يتحقق من أن المحاكاة قد تم استدعاؤها وفقًا للخيارات المتوقعة.

معظم الخيارات تدعم مطابقات expect/jasmine الجزئية مثل [expect.objectContaining](https://jestjs.io/docs/en/expect#expectobjectcontainingobject)

##### الاستخدام

```js
const mock = browser.mock('**/api/todo*', { method: 'POST' })

await expect(mock).toBeRequestedWith({
    url: 'http://localhost:8080/api/todo',          // [اختياري] نص | دالة | مطابق مخصص
    method: 'POST',                                 // [اختياري] نص | مصفوفة
    statusCode: 200,                                // [اختياري] رقم | مصفوفة
    requestHeaders: { Authorization: 'foo' },       // [اختياري] كائن | دالة | مطابق مخصص
    responseHeaders: { Authorization: 'bar' },      // [اختياري] كائن | دالة | مطابق مخصص
    postData: { title: 'foo', description: 'bar' }, // [اختياري] كائن | دالة | مطابق مخصص
    response: { success: true },                    // [اختياري] كائن | دالة | مطابق مخصص
})

await expect(mock).toBeRequestedWith({
    url: expect.stringMatching(/.*\/api\/.*/i),
    method: ['POST', 'PUT'], // إما POST أو PUT
    statusCode: [401, 403],  // إما 401 أو 403
    requestHeaders: headers => headers.Authorization.startsWith('Bearer '),
    postData: expect.objectContaining({ released: true, title: expect.stringContaining('foobar') }),
    response: r => Array.isArray(r) && r.data.items.length === 20
})
```

## مطابق اللقطة

يدعم WebdriverIO اختبارات اللقطة الأساسية وكذلك اختبار لقطة DOM.

### toMatchSnapshot

يتحقق مما إذا كان أي كائن عشوائي يطابق قيمة معينة. إذا قمت بتمرير [`WebdriverIO.Element`](https://webdriver.io/docs/api/element) فسيقوم تلقائيًا بالتقاط لقطة لحالة [`outerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML).

##### الاستخدام

```js
// لقطة كائنات عشوائية (لا حاجة إلى "await" هنا)
expect({ foo: 'bar' }).toMatchSnapshot()
// لقطة `outerHTML` لـ WebdriverIO.Element (لقطة DOM، تتطلب "await")
await expect($('elem')).toMatchSnapshot()
// لقطة نتيجة أمر العنصر
await expect($('elem').getCSSProperty('background-color')).toMatchSnapshot()
```

### toMatchInlineSnapshot

وبالمثل، يمكنك استخدام `toMatchInlineSnapshot()` لتخزين اللقطة مباشرةً داخل ملف الاختبار. على سبيل المثال، نظرًا لـ:

```js
await expect($('img')).toMatchInlineSnapshot()
```

بدلاً من إنشاء ملف لقطة، سيقوم WebdriverIO بتعديل ملف الاختبار مباشرةً لتحديث اللقطة كسلسلة:

```js
await expect($('img')).toMatchInlineSnapshot(`"<img src="/public/apple-touch-icon-precomposed.png">"`)
```

## مطابقات اللقطة المرئية

<!--
    هذه المطابقات ليست مُنفذة في مشروع `expect-webdriverio` ويمكن العثور عليها
    هنا: https://github.com/webdriverio-community/visual-testing/blob/e10f7005c1533f5b06811888a9cbb9020e6e765e/packages/service/src/matcher.ts
-->

المطابقات التالية مُنفذة كجزء من مكون إضافي `@wdio/visual-service` ومتاحة فقط عند إعداد الخدمة. تأكد من اتباع [تعليمات الإعداد](https://webdriver.io/docs/visual-testing) وفقًا لذلك.

### toMatchElementSnapshot

يتحقق مما إذا كان العنصر المحدد يتطابق مع لقطة خط الأساس.

##### الاستخدام

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot('wdioLogo', 0, {
    // خيارات
})
```

النتيجة المتوقعة هي `0` افتراضيًا، لذا يمكنك كتابة نفس التأكيد على النحو التالي:

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot('wdioLogo', {
    // خيارات
})
```

أو عدم تمرير أي خيارات على الإطلاق:

```js
await expect($('.hero__title-logo')).toMatchElementSnapshot()
```

### toMatchScreenSnapshot

يتحقق مما إذا كانت الشاشة الحالية تتطابق مع لقطة خط الأساس.

##### الاستخدام

```js
await expect(browser).toMatchScreenSnapshot('partialPage', 0, {
    // خيارات
})
```

النتيجة المتوقعة هي `0` افتراضيًا، لذا يمكنك كتابة نفس التأكيد على النحو التالي:

```js
await expect(browser).toMatchScreenSnapshot('partialPage', {
    // خيارات
})
```

أو عدم تمرير أي خيارات على الإطلاق:

```js
await expect(browser).toMatchScreenSnapshot('partialPage')
```

### toMatchFullPageSnapshot

يتحقق مما إذا كانت لقطة الشاشة للصفحة كاملة تتطابق مع لقطة خط الأساس.

##### الاستخدام

```js
await expect(browser).toMatchFullPageSnapshot('fullPage', 0, {
    // خيارات
})
```

النتيجة المتوقعة هي `0` افتراضيًا، لذا يمكنك كتابة نفس التأكيد على النحو التالي:

```js
await expect(browser).toMatchFullPageSnapshot('fullPage', {
    // خيارات
})
```

أو عدم تمرير أي خيارات على الإطلاق:

```js
await expect(browser).toMatchFullPageSnapshot('fullPage')
```

### toMatchTabbablePageSnapshot

يتحقق مما إذا كانت لقطة الشاشة للصفحة كاملة بما في ذلك علامات التبويب تتطابق مع لقطة خط الأساس.

##### الاستخدام

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable', 0, {
    // خيارات
})
```

النتيجة المتوقعة هي `0` افتراضيًا، لذا يمكنك كتابة نفس التأكيد على النحو التالي:

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable', {
    // خيارات
})
```

أو عدم تمرير أي خيارات على الإطلاق:

```js
await expect(browser).toMatchTabbablePageSnapshot('tabbable')
```

## استخدام التعبيرات النمطية

يمكنك أيضًا استخدام التعبيرات النمطية مباشرة لجميع المطابقات التي تقوم بمقارنة النص.

##### الاستخدام

```js
await browser.url('https://webdriver.io/')
const elem = await $('.container')
await expect(elem).toHaveText(/node\.js/i)
await expect(elem).toHaveText([/node\.js/i, 'Get Started'])
await expect(browser).toHaveTitle(/webdriverio/i)
await expect(browser).toHaveUrl(/webdriver\.io/)
await expect(elem).toHaveElementClass(/Container/i)
```

## المطابقات الافتراضية

بالإضافة إلى مطابقات `expect-webdriverio`، يمكنك استخدام تأكيدات Jest المدمجة [expect](https://jestjs.io/docs/en/expect) أو [expect/expectAsync](https://jasmine.github.io/api/3.5/global.html#expect) لـ Jasmine.

## المطابقات غير المتماثلة

يدعم WebdriverIO استخدام المطابقات غير المتماثلة أينما تقارن قيم النص، على سبيل المثال:

```ts
await expect(browser).toHaveTitle(expect.stringContaining('some title'))
```

أو

```ts
await expect(browser).toHaveTitle(expect.not.stringContaining('some title'))
```

## TypeScript

إذا كنت تستخدم [WDIO Testrunner](https://webdriver.io/docs/clioptions)، فسيتم إعداد كل شيء تلقائيًا. ما عليك سوى اتباع [دليل الإعداد](https://webdriver.io/docs/typescript#framework-setup) من الوثائق. ومع ذلك، إذا كنت تشغل WebdriverIO باستخدام منصة اختبار مختلفة أو في نص Node.js بسيط، فستحتاج إلى إضافة `expect-webdriverio` إلى `types` في `tsconfig.json`.

- `"expect-webdriverio"` للجميع باستثناء مستخدمي Jasmine/Jest.
- `"expect-webdriverio/jasmine"` لـ Jasmine
- `"expect-webdriverio/jest"` لـ Jest

## JavaScript (VSCode)

من الضروري إنشاء `jsconfig.json` في جذر المشروع والإشارة إلى تعريفات النوع لجعل الإكمال التلقائي يعمل في JavaScript البسيط.

```json
{
  "include": [
    "**/*.js",
    "**/*.json",
    "node_modules/expect-webdriverio"
  ]
}
```

## إضافة المطابقات الخاصة بك

بطريقة مماثلة لكيفية توسيع `expect-webdriverio` لمطابقات Jasmine/Jest، من الممكن إضافة مطابقات مخصصة.

- Jasmine انظر وثائق [المطابقات المخصصة](https://jasmine.github.io/2.5/custom_matcher.html)
- للآخرين انظر إلى [expect.extend](https://jestjs.io/docs/en/expect#expectextendmatchers) من Jest

يجب إضافة المطابقات المخصصة في خطاف `before` من wdio

```js
// wdio.conf.js
{
    async before () {
        const { addCustomMatchers } = await import('./myMatchers')
        addCustomMatchers()
    }
}
```

```js
// myMatchers.js - مثال Jest
export function addCustomMatchers () {
    if (global.expect.expect !== undefined) { // حل مؤقت. انظر https://github.com/webdriverio/expect-webdriverio/issues/835
        global.expect = global.expect.expect;
    }

    expect.extend({
        myMatcher (actual, expected) {
            return { pass: actual === expected, message: () => 'some message' }
        }
    })
}
```