---
id: selectors
title: المحددات
description: "اعثر على العناصر باستخدام CSS والنص وXPath واسم إمكانية الوصول ودور ARIA وغيرها من استراتيجيات المحددات، وتعرّف على أكثرها ثباتًا."
---

يوفر [بروتوكول WebDriver](https://w3c.github.io/webdriver/) عدة استراتيجيات للمحددات للاستعلام عن عنصر ما. يبسّطها WebdriverIO ليبقى تحديد العناصر سهلًا. يرجى ملاحظة أنه على الرغم من أن أمرَي الاستعلام عن العناصر يُسمَّيان `$` و`$$`، فلا علاقة لهما بـ jQuery أو بـ [محرك المحددات Sizzle](https://github.com/jquery/sizzle).

على الرغم من توفر العديد من المحددات المختلفة، فإن القليل منها فقط يوفر طريقة ثابتة للعثور على العنصر الصحيح. على سبيل المثال، لنأخذ الزر التالي:

```html
<button
  id="main"
  class="btn btn-large"
  name="submission"
  role="button"
  data-testid="submit"
>
  Submit
</button>
```

نحن __نوصي__ و__لا نوصي__ بالمحددات التالية:

| المحدد | موصى به | ملاحظات |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 أبدًا | الأسوأ - عام جدًا، بلا سياق. |
| `$('.btn.btn-large')` | 🚨 أبدًا | سيئ. مرتبط بالتنسيق. معرّض للتغيير بشدة. |
| `$('#main')` | ⚠️ باعتدال | أفضل. لكنه لا يزال مرتبطًا بالتنسيق أو بمستمعي أحداث JS. |
| `$(() => document.queryElement('button'))` | ⚠️ باعتدال | استعلام فعّال، لكنه معقد في الكتابة. |
| `$('button[name="submission"]')` | ⚠️ باعتدال | مرتبط بالسمة `name` التي لها دلالات HTML. |
| `$('button[data-testid="submit"]')` | ✅ جيد | يتطلب سمة إضافية، وغير مرتبط بإمكانية الوصول (a11y). |
| `$('aria/Submit')` | ✅ جيد | جيد. يحاكي طريقة تفاعل المستخدم مع الصفحة. يُوصى باستخدام ملفات الترجمة حتى لا تتعطل اختباراتك عند تحديث الترجمات. في جلسات WebDriver BiDi يستخدم هذا شجرة إمكانية الوصول في المتصفح. أما في الجلسات الكلاسيكية فيرجع إلى XPath وقد يكون أبطأ في الصفحات الكبيرة. |
| `$('button=Submit')` | ✅ دائمًا | الأفضل. يحاكي طريقة تفاعل المستخدم مع الصفحة وهو سريع. يُوصى باستخدام ملفات الترجمة حتى لا تتعطل اختباراتك عند تحديث الترجمات. |

## الوضع الصارم

اعتبارًا من الإصدار v10، أصبح الأمر [`$`](/docs/api/browser/$) __صارمًا__: فهو يمثل عنصرًا واحدًا بالضبط. إذا طابق المحدد أكثر من عنصر، يُطلق الأمر خطأ `StrictSelectorError` بدلًا من اختيار أول تطابق بصمت:

```js
// هناك 12 زرًا في الصفحة
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
```

هذا هو السلوك نفسه لـ [محددات المواقع في Playwright](https://playwright.dev/docs/locators#strictness). أما Cypress فيختلف: إذ قد تُرجع استعلاماته عدة عناصر، وأوامر الإجراءات مثل [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn) هي التي ترفض افتراضيًا موضوعًا متعدد العناصر. يكشف الوضع الصارم المحددات الواسعة جدًا، والتي كانت ستتفاعل بصمت مع العنصر الخطأ بمجرد أن تكبر الصفحة.

تنطبق القاعدة على كل خطوة من خطوات [السلسلة](#chain-selectors) وعلى كل نوع من أنواع المحددات التي يقبلها `$` — المحددات النصية (بما فيها تلك التي تخترق shadow DOM)، و[دوال JS](#js-function)، و[محددات الهاتف المحمول](#mobile-selectors)، والمراجع إلى [الاستراتيجيات المخصصة](#custom-selector-strategies).

### ما الذي لا يتأثر

- يستمر `$$` في إرجاع صفر أو أكثر من العناصر، على شكل [`ElementArray`](/docs/api/browser/$$). انتظر القائمة (أو خاصيتها `.length`) باستخدام await قبل قراءة العدد أو استخدام `for...of`. أما `for await` فيعمل على القائمة مباشرة.
- أوامر المساعدة المخصصة `custom$` و`shadow$` و`react$` ليست صارمة — فهي لا تزال تُرجع أول تطابق، وكذلك نظيراتها من `$$`.
- المحدد الذي لا يطابق شيئًا لا يزال يُرجع عنصرًا يُحَل بشكل كسول، لذا يبقى [`waitForExist`](/docs/api/element/waitForExist) وسلوك [الانتظار التلقائي](/docs/autowait) دون تغيير.
- تمرير مرجع لعنصر، مثل `$(await browser.getActiveElement())`، يشير دائمًا إلى عقدة واحدة ولا يُفحص أبدًا.

:::info الترحيل إلى v10

لمعرفة كيفية فحص مجموعة اختباراتك بحثًا عن انتهاكات الوضع الصارم، وتضييق الاستعلامات الفردية أو استثنائها، وتعطيل الوضع الصارم على مستوى المشروع بأكمله، راجع [دليل الترحيل إلى v10](/docs/v10-migration).

:::

## محدد استعلام CSS

ما لم يُذكر خلاف ذلك، سيستعلم WebdriverIO عن العناصر باستخدام نمط [محدد CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)، على سبيل المثال:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## نص الرابط

للحصول على عنصر رابط (anchor) يحتوي على نص محدد، استعلم عن النص بحيث يبدأ بعلامة يساوي (`=`).

على سبيل المثال:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

يمكنك الاستعلام عن هذا العنصر عن طريق استدعاء:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## نص الرابط الجزئي

للعثور على عنصر رابط يطابق نصه المرئي جزئيًا قيمة البحث الخاصة بك،
استعلم عنه باستخدام `*=` قبل نص الاستعلام (مثل `*=driver`).

يمكنك الاستعلام عن العنصر من المثال أعلاه أيضًا عن طريق استدعاء:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__ملاحظة:__ لا يمكنك مزج عدة استراتيجيات للمحددات في محدد واحد. استخدم عدة استعلامات عناصر متسلسلة لتحقيق الهدف نفسه، على سبيل المثال:

```js
const elem = await $('header h1*=Welcome') // لا يعمل!!!
// استخدم بدلًا من ذلك
const elem = await $('header').$('*=driver')
```

## عنصر يحتوي على نص معين

يمكن تطبيق الأسلوب نفسه على العناصر أيضًا. بالإضافة إلى ذلك، من الممكن أيضًا إجراء مطابقة غير حساسة لحالة الأحرف باستخدام `.=` أو `.*=` داخل الاستعلام.

على سبيل المثال، إليك استعلامًا عن عنوان من المستوى الأول يحتوي على النص "Welcome to my Page":

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L2
```

يمكنك الاستعلام عن هذا العنصر عن طريق استدعاء:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L35C1-L38
```

أو باستخدام الاستعلام بنص جزئي:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L44C9-L47
```

ويعمل الأمر نفسه مع أسماء `id` و`class`:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

يمكنك الاستعلام عن هذا العنصر عن طريق استدعاء:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__ملاحظة:__ لا يمكنك مزج عدة استراتيجيات للمحددات في محدد واحد. استخدم عدة استعلامات عناصر متسلسلة لتحقيق الهدف نفسه، على سبيل المثال:

```js
const elem = await $('header h1*=Welcome') // لا يعمل!!!
// استخدم بدلًا من ذلك
const elem = await $('header').$('h1*=Welcome')
```

## اسم الوسم

للاستعلام عن عنصر باسم وسم محدد، استخدم `<tag>` أو `<tag />`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L5
```

يمكنك الاستعلام عن هذا العنصر عن طريق استدعاء:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L61-L62
```

## سمة الاسم

للاستعلام عن عناصر ذات سمة name محددة، استخدم محدد CSS مثل `[name="some-name"]`. في جلسة الهاتف المحمول، يُرسَل الاختصار نفسه باستخدام استراتيجية المحدد `name` الخاصة بـ Appium:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__ملاحظة:__ استراتيجية المحدد `name` هي محدد خاص بـ Appium. أما جلسات سطح المكتب فتُبقي `[name="some-name"]` على استراتيجية CSS.

## xPath

من الممكن أيضًا الاستعلام عن العناصر عبر [xPath](https://developer.mozilla.org/en-US/docs/Web/XPath) محدد.

يكون لمحدد xPath تنسيق مثل `//body/div[6]/div[1]/span[1]`.

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/xpath.html
```

يمكنك الاستعلام عن الفقرة الثانية عن طريق استدعاء:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L75-L76
```

يمكنك أيضًا استخدام xPath للتنقل صعودًا ونزولًا في شجرة DOM:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L78-L79
```

## محدد اسم إمكانية الوصول

استعلم عن العناصر من خلال اسمها القابل للوصول. الاسم القابل للوصول هو ما يعلنه قارئ الشاشة عندما يتلقى ذلك العنصر التركيز. يمكن أن تكون قيمة الاسم القابل للوصول محتوى مرئيًا أو بدائل نصية مخفية.

في جلسات [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/) (‏Chrome وEdge وFirefox وغيرها من المتصفحات الداعمة لـ BiDi)، يستخدم WebdriverIO أولًا [`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes) مع محدد إمكانية الوصول. يستعلم ذلك عن شجرة إمكانية الوصول في المتصفح مباشرة، وعادةً ما يكون أسرع بكثير من التقريب عبر XPath. إذا لم يعثر محدد إمكانية الوصول على شيء، يرجع WebdriverIO إلى أسلوب XPath الكلاسيكي التقريبي بحيث تستمر استعلامات `aria/` الحالية في المطابقة.

:::info

يمكنك قراءة المزيد عن هذا المحدد في [منشور المدونة الخاص بالإصدار](/blog/2022/09/05/accessibility-selector)

:::

### الجلب حسب `aria-label`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L1
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L86-L87
```

### الجلب حسب `aria-labelledby`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L2-L3
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L93-L94
```

### الجلب حسب المحتوى

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L4
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L100-L101
```

### الجلب حسب العنوان

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L5
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L107-L108
```

### الجلب حسب الخاصية `alt`

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L114-L115
```

## محدد الدور

استعلم عن العناصر من خلال دور ARIA الخاص بها واسمها القابل للوصول، بالطريقة التي يصفها بها قارئ الشاشة: "الزر *Add to cart*". يستمر الدور مع الاسم في المطابقة عند تغيّر أسماء الفئات أو معرّفات الاختبار أو بنية DOM.

```js
await $('role/button[name="Add to cart"]').click()
await expect($('role/heading[name="Order summary"]')).toBeDisplayed()

// الدور فقط
const rows = await $$('role/row')

// محصور في عنصر أب
const dialog = $('role/dialog[name="Checkout"]')
await dialog.$('role/button[name="Pay now"]').click()
```

الصيغة هي `role/<role>` أو `role/<role>[name="<accessible name>"]`. تعمل علامات الاقتباس المفردة أيضًا، ويُهرَّب أي اقتباس داخل الاسم بشرطة مائلة عكسية: `role/button[name="Say \"hi\""]`.

- يجب أن يطابق الاسم الاسم القابل للوصول بالكامل.
- يجب أن يكون الدور دور ARIA. يفشل الخطأ الإملائي مع اقتراح أقرب دور صالح، على سبيل المثال `"buton" is not an ARIA role. Did you mean "button"?`.
- `img` واسمه في ARIA 1.3 ‏`image` هما الدور نفسه.
- يتبع المحدد [الوضع الصارم](#strict-mode) الخاص بـ `$` مثل أي محدد آخر.

في جلسة [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/)، يمرر WebdriverIO الدور والاسم إلى [`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes). يحسب المتصفح كليهما بنفسه، بالطريقة نفسها التي ترى بها التقنيات المساعدة الصفحة. يُعثر على العناصر الموجودة داخل جذور الظل المفتوحة (open shadow roots) وداخل الإطارات، بما في ذلك الإطارات ذات الأصل المختلف. إذا لم يعثر المتصفح على أي عنصر، فلا يوجد رجوع إلى أسلوب تقريبي. لاحظ أن المتصفح هو من يقرر الدور: على سبيل المثال، قد يكون `<table>` بلا ترويسات أو تسمية توضيحية جدولَ تخطيط، وعندها لا يكون لصفوفه الدور `row`.

في جلسة WebDriver الكلاسيكية، وعندما لا يدعم المتصفح محدد الدور، يحسب WebdriverIO الدور والاسم القابل للوصول داخل الصفحة باستخدام [`dom-accessibility-api`](https://github.com/eps1lon/dom-accessibility-api)، وهو التطبيق الذي تستخدمه Testing Library. يُسمّى حقل النص الذي لا يحتوي على تسمية بقيمة `placeholder` الخاصة به، كما تفعل المتصفحات. محدد الدور غير متاح في سياق تطبيق الهاتف المحمول الأصلي. استخدم [معرّف إمكانية الوصول](#accessibility-id) هناك.

## ARIA - سمة الدور

للاستعلام عن العناصر استنادًا إلى [أدوار ARIA](https://www.w3.org/TR/html-aria/#docconformance)، يمكنك تحديد دور العنصر مباشرة مثل `[role=button]` كمعامل للمحدد. يقرّب هذا المحدد الدور من اسم العنصر وسماته. فضّل استخدام [محدد الدور](#role-selector)، الذي يستخدم الدور الذي يحسبه المتصفح ويمكنه أيضًا مطابقة الاسم القابل للوصول:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## سمة المعرّف (ID)

استراتيجية المحدد "id" غير مدعومة في بروتوكول WebDriver، وينبغي استخدام استراتيجية محددات CSS أو xPath بدلًا منها للعثور على العناصر باستخدام المعرّف.

ومع ذلك، قد لا تزال بعض برامج التشغيل (مثل [Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)) [تدعم](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies) هذا المحدد.

صيغ المحددات المدعومة حاليًا للمعرّف هي:

```js
//محدد css
const button = await $('#someid')
//محدد xpath
const button = await $('//*[@id="someid"]')
//استراتيجية id
// ملاحظة: تعمل فقط في Appium أو أطر العمل المشابهة التي تدعم استراتيجية المحدد "ID"
const button = await $('id=resource-id/iosname')
```

## دالة JS

يمكنك أيضًا استخدام دوال JavaScript لجلب العناصر باستخدام واجهات برمجة الويب الأصلية. بالطبع، لا يمكنك فعل ذلك إلا داخل سياق ويب (مثل `browser`، أو سياق الويب في الهاتف المحمول).

بالنظر إلى بنية HTML التالية:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/js.html
```

يمكنك الاستعلام عن العنصر الشقيق لـ `#elem` على النحو التالي:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L139-L143
```

## المحددات العميقة

:::warning

بدءًا من الإصدار `v9` من WebdriverIO، لا حاجة لهذا المحدد الخاص لأن WebdriverIO يخترق Shadow DOM تلقائيًا نيابةً عنك. يُوصى بالانتقال بعيدًا عن هذا المحدد بإزالة `>>>` من أمامه.

:::

في جلسة WebDriver BiDi، يبحث `$` و`$$` في كل جذر ظل مفتوح: الجذور المُنشأة باستخدام `attachShadow()` وجذور الظل التصريحية (`<template shadowrootmode="open">`) التي تضيفها الصفحة أو `setHTMLUnsafe()` إلى المستند. ولا يبحثان في جذر ظل تصريحي مغلق، أو في جذر ظل تصريحي يُنشئه `setHTMLUnsafe()` في عنصر غير موجود في المستند بعد. لهذه الحالات، استخدم [`shadow$`](https://webdriver.io/docs/api/element/shadow$) على العنصر المضيف.

تعتمد العديد من تطبيقات الواجهة الأمامية بشكل كبير على عناصر ذات [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). من المستحيل تقنيًا الاستعلام عن العناصر داخل shadow DOM دون حلول بديلة. كان [`shadow$`](https://webdriver.io/docs/api/element/shadow$) و[`shadow$$`](https://webdriver.io/docs/api/element/shadow$$) من هذه الحلول البديلة التي كانت لها [قيودها](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow). باستخدام المحدد العميق، يمكنك الآن الاستعلام عن جميع العناصر داخل أي shadow DOM باستخدام أمر الاستعلام المعتاد.

لنفترض أن لدينا تطبيقًا بالبنية التالية:

![Chrome Example](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "Chrome Example")

باستخدام هذا المحدد يمكنك الاستعلام عن العنصر `<button />` المتداخل داخل shadow DOM آخر، على سبيل المثال:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## محددات الهاتف المحمول

بالنسبة لاختبار تطبيقات الهاتف المحمول الهجينة، من المهم أن يكون خادم الأتمتة في *السياق* الصحيح قبل تنفيذ الأوامر. لأتمتة الإيماءات، ينبغي ضبط برنامج التشغيل على السياق الأصلي (native) في الحالة المثالية. ولكن لتحديد العناصر من DOM، سيحتاج برنامج التشغيل إلى ضبطه على سياق webview الخاص بالمنصة. *عندها فقط* يمكن استخدام الطرق المذكورة أعلاه.

بالنسبة لاختبار تطبيقات الهاتف المحمول الأصلية، لا يوجد تبديل بين السياقات، إذ عليك استخدام استراتيجيات الهاتف المحمول واستخدام تقنية أتمتة الجهاز الأساسية مباشرة. وهذا مفيد بشكل خاص عندما يحتاج الاختبار إلى تحكم دقيق في العثور على العناصر.

### Android UiAutomator

يوفر إطار عمل UI Automator في Android عددًا من الطرق للعثور على العناصر. يمكنك استخدام [واجهة برمجة UI Automator](https://developer.android.com/tools/testing-support-library/index.html#uia-apis)، وبالأخص [فئة UiSelector](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector) لتحديد مواقع العناصر. في Appium، ترسل كود Java كسلسلة نصية إلى الخادم، الذي ينفذه في بيئة التطبيق، ويُرجع العنصر أو العناصر.

```js
const selector = 'new UiSelector().text("Cancel").className("android.widget.Button")'
const button = await $(`android=${selector}`)
await button.click()
```

### Android DataMatcher وViewMatcher (‏Espresso فقط)

توفر استراتيجية DataMatcher في Android طريقة للعثور على العناصر باستخدام [Data Matcher](https://developer.android.com/reference/android/support/test/espresso/DataInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"]
})
await menuItem.click()
```

وبالمثل [View Matcher](https://developer.android.com/reference/android/support/test/espresso/ViewInteraction)

```js
const menuItem = await $({
  "name": "hasEntry",
  "args": ["title", "ViewTitle"],
  "class": "androidx.test.espresso.matcher.ViewMatchers"
})
await menuItem.click()
```

### Android View Tag (‏Espresso فقط)

توفر استراتيجية view tag طريقة ملائمة للعثور على العناصر من خلال [الوسم](https://developer.android.com/reference/android/support/test/espresso/matcher/ViewMatchers.html#withTagValue%28org.hamcrest.Matcher%3Cjava.lang.Object%3E%29) الخاص بها.

```js
const elem = await $('-android viewtag:tag_identifier')
await elem.click()
```

### iOS UIAutomation

عند أتمتة تطبيق iOS، يمكن استخدام [إطار عمل UI Automation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) من Apple للعثور على العناصر.

تحتوي [واجهة برمجة](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771) JavaScript هذه على طرق للوصول إلى العرض وكل ما فيه.

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

يمكنك أيضًا استخدام البحث بالمسندات (predicate) داخل iOS UI Automation في Appium لتحسين تحديد العناصر بشكل أكبر. راجع [هنا](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md) للتفاصيل.

### سلاسل المسندات وسلاسل الفئات في iOS XCUITest

مع iOS 10 وما فوق (باستخدام برنامج التشغيل `XCUITest`)، يمكنك استخدام [سلاسل المسندات](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules):

```js
const selector = `type == 'XCUIElementTypeSwitch' && name CONTAINS 'Allow'`
const switch = await $(`-ios predicate string:${selector}`)
await switch.click()
```

و[سلاسل الفئات](https://github.com/facebook/WebDriverAgent/wiki/Class-Chain-Queries-Construction-Rules):

```js
const selector = '**/XCUIElementTypeCell[`name BEGINSWITH "D"`]/**/XCUIElementTypeButton'
const button = await $(`-ios class chain:${selector}`)
await button.click()
```

### معرّف إمكانية الوصول

صُممت استراتيجية المحدد `accessibility id` لقراءة معرّف فريد لعنصر واجهة المستخدم. ويتميز ذلك بأنه لا يتغير أثناء التوطين أو أي عملية أخرى قد تغير النص. بالإضافة إلى ذلك، يمكن أن يساعد في إنشاء اختبارات متعددة المنصات، إذا كانت العناصر المتماثلة وظيفيًا تحمل معرّف إمكانية الوصول نفسه.

- بالنسبة لـ iOS، هذا هو `accessibility identifier` الذي حددته Apple [هنا](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html).
- بالنسبة لـ Android، يُقابل `accessibility id` الخاصية `content-description` للعنصر، كما هو موضح [هنا](https://developer.android.com/training/accessibility/accessible-app.html).

بالنسبة لكلتا المنصتين، يكون الحصول على عنصر (أو عدة عناصر) من خلال `accessibility id` عادةً أفضل طريقة. كما أنها الطريقة المفضلة على استراتيجية `name` المهملة.

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### اسم الفئة

استراتيجية `class name` هي `string` يمثل عنصر واجهة مستخدم في العرض الحالي.

- بالنسبة لـ iOS، هي الاسم الكامل لـ [فئة UIAutomation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html)، وستبدأ بـ `UIA-`، مثل `UIATextField` لحقل نص. يمكن العثور على مرجع كامل [هنا](https://developer.apple.com/library/ios/navigation/#section=Frameworks&topic=UIAutomation).
- بالنسبة لـ Android، هي الاسم المؤهل بالكامل لـ [فئة](https://developer.android.com/reference/android/widget/package-summary.html) [UI Automator](https://developer.android.com/tools/testing-support-library/index.html#UIAutomator)، مثل `android.widget.EditText` لحقل نص. يمكن العثور على مرجع كامل [هنا](https://developer.android.com/reference/android/widget/package-summary.html).
- بالنسبة لـ Youi.tv، هي الاسم الكامل لفئة Youi.tv، وستبدأ بـ `CYI-`، مثل `CYIPushButtonView` لعنصر زر ضغط. يمكن العثور على مرجع كامل في [صفحة GitHub الخاصة بـ You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver)

```js
// مثال iOS
await $('UIATextField').click()
// مثال Android
await $('android.widget.DatePicker').click()
// مثال Youi.tv
await $('CYIPushButtonView').click()
```

## سلسلة المحددات

إذا كنت تريد أن تكون أكثر تحديدًا في استعلامك، يمكنك ربط المحددات بشكل متسلسل حتى تعثر على العنصر
الصحيح. إذا استدعيت `element` قبل أمرك الفعلي، يبدأ WebdriverIO الاستعلام من ذلك العنصر.

على سبيل المثال، إذا كانت لديك بنية DOM مثل:

```html
<div class="row">
  <div class="entry">
    <label>Product A</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product B</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
  <div class="entry">
    <label>Product C</label>
    <button>Add to cart</button>
    <button>More Information</button>
  </div>
</div>
```

وأردت إضافة المنتج B إلى سلة التسوق، فسيكون من الصعب فعل ذلك باستخدام محدد CSS فقط.

مع ربط المحددات بشكل متسلسل، يصبح الأمر أسهل بكثير. ما عليك سوى تضييق نطاق العنصر المطلوب خطوة بخطوة:

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### محدد الصور في Appium

باستخدام استراتيجية المحدد `-image`، من الممكن إرسال ملف صورة إلى Appium يمثل العنصر الذي تريد الوصول إليه.

تنسيقات الملفات المدعومة `jpg,png,gif,bmp,svg`

يمكن العثور على المرجع الكامل [هنا](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md)

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**ملاحظة**: طريقة عمل Appium مع هذا المحدد هي أنه سيلتقط داخليًا لقطة شاشة (للتطبيق) ويستخدم محدد الصورة المقدم
للتحقق مما إذا كان يمكن العثور على العنصر في لقطة الشاشة تلك.

انتبه إلى أن Appium قد يغير حجم لقطة الشاشة الملتقطة لتتطابق مع حجم CSS لشاشتك (أو شاشة التطبيق) (سيحدث هذا
على أجهزة iPhone وكذلك على أجهزة Mac ذات شاشة Retina لأن DPR أكبر من 1). سيؤدي ذلك إلى عدم العثور على تطابق لأن
محدد الصورة المقدم ربما أُخذ من لقطة الشاشة الأصلية.
يمكنك إصلاح ذلك بتحديث إعدادات خادم Appium، راجع [وثائق Appium](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings)
للإعدادات و[هذا التعليق](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579) للحصول على شرح مفصل.

## محددات React

يوفر WebdriverIO طريقة لتحديد مكونات React استنادًا إلى اسم المكون. للقيام بذلك، لديك خيار بين أمرين: `react$` و`react$$`.

تتيح لك هذه الأوامر تحديد المكونات من [React VirtualDOM](https://reactjs.org/docs/faq-internals.html) وإرجاع إما عنصر WebdriverIO واحد أو مصفوفة من العناصر (حسب الدالة المستخدمة).

**ملاحظة**: الأمران `react$` و`react$$` متشابهان في الوظيفة، باستثناء أن `react$$` سيُرجع *جميع* النسخ المطابقة كمصفوفة من عناصر WebdriverIO، بينما سيُرجع `react$` أول نسخة يُعثر عليها.

تعمل الأوامر مع React من الإصدار 16 إلى 19، لتطبيق يبدأ باستخدام `createRoot` أو `ReactDOM.render`. وهي تقرأ مكونات التصيير الحالي، لذا تعثر أيضًا على المكونات التي أضافها تغيير في الحالة. إذا لم يكن React قد صيّر جذرًا للصفحة بعد، فإنها تنتظر حتى 5 ثوانٍ لذلك.

#### مثال أساسي

```jsx
// index.jsx
import React from 'react'
import { createRoot } from 'react-dom/client'

function MyComponent() {
    return (
        <div>
            MyComponent
        </div>
    )
}

function App() {
    return (<MyComponent />)
}

createRoot(document.querySelector('#root')).render(<App />)
```

في الكود أعلاه توجد نسخة بسيطة من `MyComponent` داخل التطبيق، يصيّرها React داخل عنصر HTML بالسمة `id="root"`.

باستخدام الأمر `browser.react$`، يمكنك تحديد نسخة من `MyComponent`:

```js
const myCmp = await browser.react$('MyComponent')
```

الآن بعد أن خزّنت عنصر WebdriverIO في المتغير `myCmp`، يمكنك تنفيذ أوامر العناصر عليه.

#### تصفية المكونات

يمكنك تصفية اختيارك حسب الخصائص (props) و/أو الحالة (state) للمكون. للقيام بذلك، مرّر `props` و/أو `state` في المعامل الثاني للأمر.

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent(props) {
    return (
        <div>
            Hello { props.name || 'World' }!
        </div>
    )
}

function App() {
    return (
        <div>
            <MyComponent name="WebdriverIO" />
            <MyComponent />
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

إذا أردت تحديد نسخة `MyComponent` التي تحمل الخاصية `name` بقيمة `WebdriverIO`، يمكنك تنفيذ الأمر هكذا:

```js
const myCmp = await browser.react$('MyComponent', {
    props: { name: 'WebdriverIO' }
})
```

إذا أردت تصفية اختيارنا حسب الحالة، فسيبدو أمر `browser` على هذا النحو:

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

يتطابق المرشح عندما يتطابق كل مفتاح من مفاتيحه الموجود أيضًا لدى المكون. ويُتجاهل المفتاح غير الموجود لدى المكون. يتطابق الكائن المتداخل بالطريقة نفسها، وتتطابق المصفوفة عندما تشترك في قيمة واحدة مع مصفوفة المكون. تتطابق `null` و`false` و`0` مع القيمة نفسها. بالنسبة لمكون دالي يستخدم الخطافات (hooks)، تكون الحالة هي حالة الخطاف الأول (`useState` أو `useReducer`): إذا كان الخطاف الأول خطافًا آخر، مثل `useRef`، فلن يتطابق مرشح الحالة. عند استخدام `props` و`state` معًا، يجب أن يتطابق المكون مع كليهما.

#### قواعد المحددات

- يطابق `*` حرفًا واحدًا أو أكثر: يعثر `browser.react$$('My*')` على `MyComponent` و`MyOtherComponent`.
- الأسماء المفصولة بمسافات تعثر على مكون داخل مكون آخر: يعثر `browser.react$$('List Item')` على كل `Item` داخل `List`.
- اسم المكون هو `displayName` الخاص به، وإلا فاسم الدالة أو الفئة الخاصة به. يحمل مكون `React.memo` اسم دالته (كما يمنحه إصدار التطوير من React 17 قيمة `displayName` لكائن memo). لا يحمل مكون `React.forwardRef` اسمًا، ما لم يكن لديه `displayName`.
- بالنسبة لمكون عالي الرتبة (higher-order component) باسم مثل `withRouter(MyComponent)`، يُستخدم الاسم الموجود داخل الأقواس: `MyComponent`.
- بدون نطاق عنصر، تبحث الأوامر في جميع جذور React في الصفحة، بترتيب المستند، بما في ذلك الجذور داخل جذور أخرى والجذور في جذور الظل المفتوحة. يُرجع `react$` أول تطابق. للبحث في جذر واحد فقط، استدعِ الأمر على حاويته أو على عنصر من ذلك الجذر: `$('#other-root').react$$('MyComponent')`.
- تأتي النتائج جذرًا تلو الآخر. وداخل الجذر، تأتي بترتيب شجرة المكونات، مستوى تلو الآخر، وليس بترتيب المستند. يُرجع `react$$` كل عقدة DOM مرة واحدة.
- بالنسبة لتطبيق داخل إطار، استدعِ الأمر على سياق التصفح الخاص بالإطار، أو على عنصر من الإطار: `(await page.frame({ selector: 'iframe' })).react$$('MyComponent')`.

القيود المعروفة:

- المكون الذي يصيّر نصًا فقط يُنتج عقدة نصية. مع WebDriver الكلاسيكي، لا يمكن إرجاع عقدة نصية، ويفشل الأمر بالخطأ `javascript error: circular reference`.
- أثناء قيام React بترطيب (hydrate) حدود `Suspense` لصفحة مصيّرة على الخادم، لا تكون المكونات بداخلها موجودة بعد. انتظر حتى تنتهي الصفحة من الترطيب.

#### التعامل مع `React.Fragment`

عند استخدام الأمر `react$` لتحديد [الأجزاء (fragments)](https://reactjs.org/docs/fragments.html) في React، سيُرجع WebdriverIO الابن الأول لذلك المكون كعقدة للمكون. إذا استخدمت `react$$`، فستتلقى مصفوفة تحتوي على جميع عقد HTML داخل الأجزاء التي تطابق المحدد.

```jsx
// index.jsx
import React from 'react'
import ReactDOM from 'react-dom'

function MyComponent() {
    return (
        <React.Fragment>
            <div>
                MyComponent
            </div>
            <div>
                MyComponent
            </div>
        </React.Fragment>
    )
}

function App() {
    return (<MyComponent />)
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

بالنظر إلى المثال أعلاه، هكذا ستعمل الأوامر:

```js
await browser.react$('MyComponent') // يُرجع عنصر WebdriverIO لأول <div />
await browser.react$$('MyComponent') // يُرجع عناصر WebdriverIO للمصفوفة [<div />, <div />]
```

**ملاحظة:** إذا كانت لديك عدة نسخ من `MyComponent` واستخدمت `react$$` لتحديد مكونات الأجزاء هذه، فستُرجَع لك مصفوفة أحادية البعد تضم جميع العقد. بعبارة أخرى، إذا كانت لديك 3 نسخ من `<MyComponent />`، فستُرجَع لك مصفوفة تحتوي على ستة عناصر WebdriverIO.

## استراتيجيات المحددات المخصصة


إذا كان تطبيقك يتطلب طريقة محددة لجلب العناصر، يمكنك تعريف استراتيجية محددات مخصصة بنفسك لاستخدامها مع `custom$` و`custom$$`. لذلك، سجّل استراتيجيتك مرة واحدة في بداية الاختبار، على سبيل المثال في خطاف `before`:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L3-L10
```

بالنظر إلى مقتطف HTML التالي:

```html reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/example.html#L8-L12
```

ثم استخدمها عن طريق استدعاء:

```js reference
https://github.com/webdriverio/example-recipes/blob/38f70a694d3b47d7f87d1d8ebda2b540809b0c04/queryElements/customStrategy.js#L16-L19
```

**ملاحظة:** يعمل هذا فقط في بيئة ويب يمكن فيها تشغيل الأمر [`execute`](/docs/api/browser/execute).