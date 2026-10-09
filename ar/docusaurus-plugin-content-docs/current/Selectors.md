---
id: selectors
title: المحددات
description: "اعثر على العناصر باستخدام CSS والنص وXPath والاسم الوصولي (accessibility name) ودور ARIA وغيرها من استراتيجيات المحددات، وتعرّف على أكثرها موثوقية."
---

يوفر [بروتوكول WebDriver](https://w3c.github.io/webdriver/) عدة استراتيجيات للمحددات للاستعلام عن عنصر ما. يبسّطها WebdriverIO لإبقاء تحديد العناصر أمرًا سهلًا. يُرجى ملاحظة أنه على الرغم من أن أمرَي الاستعلام عن العناصر يُسمّيان `$` و`$$`، إلا أنهما لا علاقة لهما بـ jQuery أو [محرك المحددات Sizzle](https://github.com/jquery/sizzle).

على الرغم من توفر العديد من المحددات المختلفة، إلا أن القليل منها فقط يوفر طريقة موثوقة للعثور على العنصر الصحيح. على سبيل المثال، لنأخذ الزر التالي:

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

__نوصي__ و__لا نوصي__ بالمحددات التالية:

| المحدد | موصى به | ملاحظات |
| -------- | ----------- | ----- |
| `$('button')` | 🚨 أبدًا | الأسوأ - عام جدًا، بلا سياق. |
| `$('.btn.btn-large')` | 🚨 أبدًا | سيئ. مرتبط بالتنسيق. معرّض للتغيير بشدة. |
| `$('#main')` | ⚠️ باعتدال | أفضل. لكنه لا يزال مرتبطًا بالتنسيق أو بمستمعي أحداث JS. |
| `$(() => document.queryElement('button'))` | ⚠️ باعتدال | استعلام فعّال، لكنه معقد في الكتابة. |
| `$('button[name="submission"]')` | ⚠️ باعتدال | مرتبط بالسمة `name` التي لها دلالات في HTML. |
| `$('button[data-testid="submit"]')` | ✅ جيد | يتطلب سمة إضافية، وغير مرتبط بإمكانية الوصول (a11y). |
| `$('aria/Submit')` | ✅ جيد | جيد. يحاكي طريقة تفاعل المستخدم مع الصفحة. يُوصى باستخدام ملفات الترجمة حتى لا تتعطل اختباراتك عند تحديث الترجمات. في جلسات WebDriver BiDi يستخدم هذا شجرة إمكانية الوصول في المتصفح. أما في الجلسات الكلاسيكية فيعود إلى XPath وقد يكون أبطأ في الصفحات الكبيرة. |
| `$('button=Submit')` | ✅ دائمًا | الأفضل. يحاكي طريقة تفاعل المستخدم مع الصفحة وهو سريع. يُوصى باستخدام ملفات الترجمة حتى لا تتعطل اختباراتك عند تحديث الترجمات. |

## الوضع الصارم {#strict-mode}

اعتبارًا من الإصدار v10، أصبح الأمر [`$`](/docs/api/browser/$) __صارمًا__: فهو يمثل عنصرًا واحدًا بالضبط. إذا طابق المحدد أكثر من عنصر واحد، يرمي الأمر خطأ `StrictSelectorError` بدلًا من اختيار أول تطابق بصمت:

```js
// توجد 12 زرًا في الصفحة
await $('button').click()
// StrictSelectorError: strict mode violation: `$("button")` resolved to 12 elements, expected 1.
```

هذا هو السلوك نفسه الموجود في [محددات مواقع Playwright](https://playwright.dev/docs/locators#strictness). يختلف Cypress في ذلك: إذ قد تُرجع استعلاماته عدة عناصر، وأوامر الإجراءات مثل [`.click()`](https://docs.cypress.io/api/commands/click#Click-all-elements-with-id-starting-with-btn) هي التي ترفض افتراضيًا العمل على مجموعة متعددة العناصر. يكشف الوضع الصارم المحددات الواسعة جدًا، والتي كانت ستتفاعل بصمت مع العنصر الخاطئ بمجرد أن تكبر الصفحة.

تنطبق هذه القاعدة على كل خطوة من خطوات [السلسلة](#chain-selectors) وعلى كل نوع من أنواع المحددات التي يقبلها `$` — المحددات النصية (بما فيها تلك التي تخترق shadow DOM)، و[دوال JS](#js-function)، و[محددات الأجهزة المحمولة](#mobile-selectors)، ومراجع [الاستراتيجيات المخصصة](#custom-selector-strategies).

### ما لا يتأثر

- يستمر `$$` في إرجاع صفر أو أكثر من العناصر، على شكل [`ElementArray`](/docs/api/browser/$$). انتظر القائمة (أو خاصيتها `.length`) باستخدام await قبل قراءة العدد أو استخدام `for...of`. أما `for await` فتعمل على القائمة مباشرة.
- أوامر المساعدة المخصصة `custom$` و`shadow$` و`react$` ليست صارمة — فهي لا تزال تُرجع أول تطابق، وكذلك نظيراتها `$$`.
- المحدد الذي لا يطابق أي شيء لا يزال يُرجع عنصرًا يُحَلّ بشكل كسول (lazily)، لذا يبقى [`waitForExist`](/docs/api/element/waitForExist) وسلوك [الانتظار التلقائي](/docs/autowait) دون تغيير.
- تمرير مرجع لعنصر، مثل `$(await browser.getActiveElement())`، يشير دائمًا إلى عقدة واحدة ولا يخضع للتحقق أبدًا.

:::info الترحيل إلى v10

لمعرفة كيفية تدقيق مجموعة اختباراتك بحثًا عن انتهاكات الوضع الصارم، وتضييق نطاق استعلامات فردية أو استثنائها، وتعطيل الوضع الصارم على مستوى المشروع بأكمله، راجع [دليل الترحيل إلى v10](/docs/v10-migration).

:::

## محدد استعلام CSS

ما لم يُشَر إلى خلاف ذلك، سيستعلم WebdriverIO عن العناصر باستخدام نمط [محدد CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)، على سبيل المثال:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L7-L8
```

## نص الرابط

للحصول على عنصر رابط (anchor) يحتوي على نص محدد، استعلم عن النص مسبوقًا بعلامة المساواة (`=`).

على سبيل المثال:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L3
```

يمكنك الاستعلام عن هذا العنصر عن طريق استدعاء:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L16-L18
```

## نص الرابط الجزئي

للعثور على عنصر رابط يطابق نصه المرئي قيمة البحث جزئيًا،
استعلم عنه باستخدام `*=` قبل نص الاستعلام (مثل `*=driver`).

يمكنك أيضًا الاستعلام عن العنصر من المثال أعلاه عن طريق استدعاء:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L24-L26
```

__ملاحظة:__ لا يمكنك الجمع بين عدة استراتيجيات محددات في محدد واحد. استخدم عدة استعلامات عناصر متسلسلة لتحقيق الهدف نفسه، على سبيل المثال:

```js
const elem = await $('header h1*=Welcome') // لا يعمل!!!
// استخدم بدلًا من ذلك
const elem = await $('header').$('*=driver')
```

## عنصر يحتوي على نص معين

يمكن تطبيق التقنية نفسها على العناصر أيضًا. بالإضافة إلى ذلك، من الممكن أيضًا إجراء مطابقة غير حساسة لحالة الأحرف باستخدام `.=` أو `.*=` ضمن الاستعلام.

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

ينطبق الأمر نفسه على أسماء `id` و`class`:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L4
```

يمكنك الاستعلام عن هذا العنصر عن طريق استدعاء:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/13eddfac6f18a2a4812cc09ed7aa5e468f392060/selectors/example.js#L49-L67
```

__ملاحظة:__ لا يمكنك الجمع بين عدة استراتيجيات محددات في محدد واحد. استخدم عدة استعلامات عناصر متسلسلة لتحقيق الهدف نفسه، على سبيل المثال:

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

للاستعلام عن عناصر ذات سمة name محددة، استخدم محدد CSS مثل `[name="some-name"]`. في جلسة الأجهزة المحمولة، يُرسَل هذا الاختصار نفسه باستخدام استراتيجية تحديد المواقع `name` الخاصة بـ Appium:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.html#L6
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L68-L69
```

__ملاحظة:__ استراتيجية تحديد المواقع `name` هي محدد مواقع خاص بـ Appium. تُبقي جلسات سطح المكتب `[name="some-name"]` على استراتيجية CSS.

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

## محدد الاسم الوصولي

استعلم عن العناصر من خلال اسمها الوصولي (accessible name). الاسم الوصولي هو ما يُعلنه قارئ الشاشة عندما يتلقى ذلك العنصر التركيز. يمكن أن تكون قيمة الاسم الوصولي محتوى مرئيًا أو بدائل نصية مخفية.

في جلسات [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/) (Chrome وEdge وFirefox وغيرها من المتصفحات الداعمة لـ BiDi) يستخدم WebdriverIO أولًا [`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes) مع محدد مواقع لإمكانية الوصول. يستعلم ذلك عن شجرة إمكانية الوصول في المتصفح مباشرة، وعادة ما يكون أسرع بكثير من التقريب عبر XPath. إذا لم يعثر محدد مواقع إمكانية الوصول على أي شيء، يعود WebdriverIO إلى أسلوب XPath الكلاسيكي التقريبي حتى تستمر استعلامات `aria/` الحالية في المطابقة.

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

## محدد الدور {#role-selector}

استعلم عن العناصر من خلال دور ARIA الخاص بها واسمها الوصولي، بالطريقة التي يصفها بها قارئ الشاشة: "زر *Add to cart*". يستمر الجمع بين الدور والاسم في المطابقة عند تغيّر أسماء الفئات أو معرّفات الاختبار أو بنية DOM.

```js
await $('role/button[name="Add to cart"]').click()
await expect($('role/heading[name="Order summary"]')).toBeDisplayed()

// الدور فقط
const rows = await $$('role/row')

// محصور ضمن عنصر أب
const dialog = $('role/dialog[name="Checkout"]')
await dialog.$('role/button[name="Pay now"]').click()
```

الصيغة هي `role/<role>` أو `role/<role>[name="<accessible name>"]`. تعمل علامات الاقتباس المفردة أيضًا، ويتم تهريب علامة الاقتباس داخل الاسم بشرطة مائلة عكسية: `role/button[name="Say \"hi\""]`.

- يجب أن يطابق الاسم الاسم الوصولي بالكامل.
- يجب أن يكون الدور دور ARIA. يفشل الخطأ الإملائي مع اقتراح أقرب دور صالح، على سبيل المثال `"buton" is not an ARIA role. Did you mean "button"?`.
- `img` واسمه في ARIA 1.3 وهو `image` يمثلان الدور نفسه.
- يتبع المحدد [الوضع الصارم](#strict-mode) لـ `$` مثل أي محدد آخر.

في جلسة [WebDriver BiDi](https://w3c.github.io/webdriver-bidi/)، يمرر WebdriverIO الدور والاسم إلى [`browsingContext.locateNodes`](https://w3c.github.io/webdriver-bidi/#command-browsingContext-locateNodes). يحسب المتصفح كليهما بنفسه، بالطريقة نفسها التي ترى بها التقنيات المساعدة الصفحة. يتم العثور على العناصر داخل جذور الظل المفتوحة (open shadow roots) وداخل الإطارات، بما في ذلك الإطارات من أصل آخر. إذا لم يعثر المتصفح على أي عنصر، فلا يوجد رجوع إلى أسلوب تقريبي. لاحظ أن المتصفح هو من يقرر الدور: على سبيل المثال، قد يكون `<table>` بدون عناوين أو تسمية توضيحية جدول تخطيط، وعندها لا يكون لصفوفه الدور `row`.

في جلسة WebDriver الكلاسيكية، وعندما لا يدعم المتصفح محدد مواقع الدور، يحسب WebdriverIO الدور والاسم الوصولي داخل الصفحة باستخدام [`dom-accessibility-api`](https://github.com/eps1lon/dom-accessibility-api)، وهو التطبيق الذي تستخدمه Testing Library. يُسمّى حقل النص الذي لا يملك تسمية من خلال `placeholder` الخاص به، كما تفعل المتصفحات. محدد الدور غير متاح في سياق تطبيق محمول أصلي (native). استخدم [معرّف إمكانية الوصول](#accessibility-id) هناك.

## ARIA - سمة الدور

للاستعلام عن العناصر بناءً على [أدوار ARIA](https://www.w3.org/TR/html-aria/#docconformance)، يمكنك تحديد دور العنصر مباشرة مثل `[role=button]` كمعامل للمحدد. يقرّب هذا المحدد الدور من اسم العنصر وسماته. يُفضَّل استخدام [محدد الدور](#role-selector)، الذي يستخدم الدور الذي يحسبه المتصفح ويمكنه أيضًا مطابقة الاسم الوصولي:

```html reference
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/aria.html#L13
```

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L131-L132
```

## سمة المعرّف (ID)

استراتيجية تحديد المواقع "id" غير مدعومة في بروتوكول WebDriver، ويجب استخدام استراتيجيات محددات CSS أو xPath بدلًا منها للعثور على العناصر باستخدام المعرّف.

ومع ذلك، قد تظل بعض برامج التشغيل (مثل [Appium You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies)) [تدعم](https://github.com/YOU-i-Labs/appium-youiengine-driver#selector-strategies) هذا المحدد.

صيغ المحددات المدعومة حاليًا للمعرّف هي:

```js
//محدد مواقع css
const button = await $('#someid')
//محدد مواقع xpath
const button = await $('//*[@id="someid"]')
//استراتيجية id
// ملاحظة: تعمل فقط في Appium أو أطر العمل المشابهة التي تدعم استراتيجية تحديد المواقع "ID"
const button = await $('id=resource-id/iosname')
```

## دالة JS {#js-function}

يمكنك أيضًا استخدام دوال JavaScript لجلب العناصر باستخدام واجهات برمجة الويب الأصلية. بالطبع، لا يمكنك القيام بذلك إلا داخل سياق ويب (مثل `browser`، أو سياق الويب في الأجهزة المحمولة).

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

بدءًا من الإصدار `v9` من WebdriverIO، لم تعد هناك حاجة لهذا المحدد الخاص لأن WebdriverIO يخترق Shadow DOM تلقائيًا نيابة عنك. يُوصى بالتخلي عن هذا المحدد عن طريق إزالة `>>>` من أمامه.

:::

تعتمد العديد من تطبيقات الواجهة الأمامية بشكل كبير على عناصر ذات [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). من المستحيل تقنيًا الاستعلام عن العناصر داخل shadow DOM دون حلول بديلة. كان [`shadow$`](https://webdriver.io/docs/api/element/shadow$) و[`shadow$$`](https://webdriver.io/docs/api/element/shadow$$) من هذه الحلول البديلة التي كانت لها [قيودها](https://github.com/Georgegriff/query-selector-shadow-dom#how-is-this-different-to-shadow). باستخدام المحدد العميق، يمكنك الآن الاستعلام عن جميع العناصر داخل أي shadow DOM باستخدام أمر الاستعلام الشائع.

لنفترض أن لدينا تطبيقًا بالبنية التالية:

![Chrome Example](https://github.com/Georgegriff/query-selector-shadow-dom/raw/main/Chrome-example.png "Chrome Example")

باستخدام هذا المحدد، يمكنك الاستعلام عن العنصر `<button />` المتداخل داخل shadow DOM آخر، على سبيل المثال:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/selectors/example.js#L147-L149
```

## محددات الأجهزة المحمولة {#mobile-selectors}

لاختبار تطبيقات الأجهزة المحمولة الهجينة، من المهم أن يكون خادم الأتمتة في *السياق* الصحيح قبل تنفيذ الأوامر. لأتمتة الإيماءات، يجب ضبط برنامج التشغيل بشكل مثالي على السياق الأصلي (native). ولكن لتحديد العناصر من DOM، سيحتاج برنامج التشغيل إلى ضبطه على سياق webview الخاص بالمنصة. *عندها فقط* يمكن استخدام الطرق المذكورة أعلاه.

لاختبار تطبيقات الأجهزة المحمولة الأصلية، لا يوجد تبديل بين السياقات، إذ يجب عليك استخدام استراتيجيات الأجهزة المحمولة واستخدام تقنية أتمتة الجهاز الأساسية مباشرة. يكون هذا مفيدًا بشكل خاص عندما يحتاج الاختبار إلى تحكم دقيق في العثور على العناصر.

### Android UiAutomator

يوفر إطار عمل UI Automator في Android عددًا من الطرق للعثور على العناصر. يمكنك استخدام [واجهة برمجة UI Automator](https://developer.android.com/tools/testing-support-library/index.html#uia-apis)، وبالأخص [الفئة UiSelector](https://developer.android.com/reference/androidx/test/uiautomator/UiSelector) لتحديد مواقع العناصر. في Appium، ترسل شيفرة Java كسلسلة نصية إلى الخادم، الذي ينفذها في بيئة التطبيق، ويُرجع العنصر أو العناصر.

```js
const selector = 'new UiSelector().text("Cancel").className("android.widget.Button")'
const button = await $(`android=${selector}`)
await button.click()
```

### Android DataMatcher وViewMatcher (Espresso فقط)

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

### Android View Tag (Espresso فقط)

توفر استراتيجية view tag طريقة مريحة للعثور على العناصر من خلال [الوسم](https://developer.android.com/reference/android/support/test/espresso/matcher/ViewMatchers.html#withTagValue%28org.hamcrest.Matcher%3Cjava.lang.Object%3E%29) الخاص بها.

```js
const elem = await $('-android viewtag:tag_identifier')
await elem.click()
```

### iOS UIAutomation

عند أتمتة تطبيق iOS، يمكن استخدام [إطار عمل UI Automation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html) من Apple للعثور على العناصر.

تحتوي [واجهة البرمجة](https://developer.apple.com/library/ios/documentation/DeveloperTools/Reference/UIAutomationRef/index.html#//apple_ref/doc/uid/TP40009771) هذه المكتوبة بـ JavaScript على طرق للوصول إلى العرض (view) وكل ما عليه.

```js
const selector = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
const button = await $(`ios=${selector}`)
await button.click()
```

يمكنك أيضًا استخدام البحث بالشروط (predicate) ضمن iOS UI Automation في Appium لتحسين تحديد العناصر بشكل أكبر. راجع [هنا](https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/ios/ios-predicate.md) للتفاصيل.

### سلاسل الشروط وسلاسل الفئات في iOS XCUITest

مع iOS 10 وما فوق (باستخدام برنامج التشغيل `XCUITest`)، يمكنك استخدام [سلاسل الشروط (predicate strings)](https://github.com/facebook/WebDriverAgent/wiki/Predicate-Queries-Construction-Rules):

```js
const selector = `type == 'XCUIElementTypeSwitch' && name CONTAINS 'Allow'`
const switch = await $(`-ios predicate string:${selector}`)
await switch.click()
```

و[سلاسل الفئات (class chains)](https://github.com/facebook/WebDriverAgent/wiki/Class-Chain-Queries-Construction-Rules):

```js
const selector = '**/XCUIElementTypeCell[`name BEGINSWITH "D"`]/**/XCUIElementTypeButton'
const button = await $(`-ios class chain:${selector}`)
await button.click()
```

### معرّف إمكانية الوصول {#accessibility-id}

صُممت استراتيجية تحديد المواقع `accessibility id` لقراءة معرّف فريد لعنصر واجهة المستخدم. ميزة ذلك أنه لا يتغير أثناء الترجمة المحلية أو أي عملية أخرى قد تغيّر النص. بالإضافة إلى ذلك، يمكن أن يساعد في إنشاء اختبارات متعددة المنصات، إذا كانت العناصر المتطابقة وظيفيًا تمتلك معرّف إمكانية الوصول نفسه.

- في iOS، هذا هو `accessibility identifier` الذي حددته Apple [هنا](https://developer.apple.com/library/prerelease/ios/documentation/UIKit/Reference/UIAccessibilityIdentification_Protocol/index.html).
- في Android، يقابل `accessibility id` الخاصية `content-description` للعنصر، كما هو موضح [هنا](https://developer.android.com/training/accessibility/accessible-app.html).

على كلتا المنصتين، يُعد الحصول على عنصر (أو عدة عناصر) من خلال `accessibility id` الخاص بها عادةً الطريقة الأفضل. كما أنها الطريقة المفضلة بدلًا من استراتيجية `name` المهملة.

```js
const elem = await $('~my_accessibility_identifier')
await elem.click()
```

### اسم الفئة

استراتيجية `class name` هي `string` تمثل عنصر واجهة مستخدم في العرض الحالي.

- في iOS، هي الاسم الكامل لـ [فئة UIAutomation](https://developer.apple.com/library/prerelease/tvos/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/UIAutomation.html)، وتبدأ بـ `UIA-`، مثل `UIATextField` لحقل نصي. يمكن العثور على المرجع الكامل [هنا](https://developer.apple.com/library/ios/navigation/#section=Frameworks&topic=UIAutomation).
- في Android، هي الاسم المؤهل بالكامل لـ [فئة](https://developer.android.com/reference/android/widget/package-summary.html) [UI Automator](https://developer.android.com/tools/testing-support-library/index.html#UIAutomator)، مثل `android.widget.EditText` لحقل نصي. يمكن العثور على المرجع الكامل [هنا](https://developer.android.com/reference/android/widget/package-summary.html).
- في Youi.tv، هي الاسم الكامل لفئة Youi.tv، وتبدأ بـ `CYI-`، مثل `CYIPushButtonView` لعنصر زر ضغط. يمكن العثور على المرجع الكامل في [صفحة GitHub الخاصة بـ You.i Engine Driver](https://github.com/YOU-i-Labs/appium-youiengine-driver)

```js
// مثال iOS
await $('UIATextField').click()
// مثال Android
await $('android.widget.DatePicker').click()
// مثال Youi.tv
await $('CYIPushButtonView').click()
```

## سلسلة المحددات {#chain-selectors}

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

وأردت إضافة المنتج B إلى سلة التسوق، فسيكون من الصعب القيام بذلك باستخدام محدد CSS فقط.

مع تسلسل المحددات، يصبح الأمر أسهل بكثير. ما عليك سوى تضييق نطاق العنصر المطلوب خطوة بخطوة:

```js
await $('.row .entry:nth-child(2)').$('button*=Add').click()
```

### محدد الصور في Appium

باستخدام استراتيجية تحديد المواقع `-image`، من الممكن إرسال ملف صورة إلى Appium يمثل العنصر الذي تريد الوصول إليه.

صيغ الملفات المدعومة `jpg,png,gif,bmp,svg`

يمكن العثور على المرجع الكامل [هنا](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md)

```js
const elem = await $('./file/path/of/image/test.jpg')
await elem.click()
```

**ملاحظة**: الطريقة التي يعمل بها Appium مع هذا المحدد هي أنه سيلتقط داخليًا لقطة شاشة (للتطبيق) ويستخدم محدد الصورة المقدَّم
للتحقق مما إذا كان يمكن العثور على العنصر في لقطة الشاشة تلك.

انتبه إلى أن Appium قد يغيّر حجم لقطة الشاشة الملتقطة لتتطابق مع حجم CSS لشاشتك (أو شاشة التطبيق) (سيحدث هذا
على أجهزة iPhone وأيضًا على أجهزة Mac ذات شاشة Retina لأن DPR أكبر من 1). سيؤدي ذلك إلى عدم العثور على تطابق لأن
محدد الصورة المقدَّم ربما يكون قد التُقط من لقطة الشاشة الأصلية.
يمكنك إصلاح ذلك عن طريق تحديث إعدادات خادم Appium، راجع [وثائق Appium](https://github.com/appium/appium/blob/master/packages/images-plugin/docs/find-by-image.md#related-settings)
للاطلاع على الإعدادات و[هذا التعليق](https://github.com/webdriverio/webdriverio/issues/6097#issuecomment-726675579) للحصول على شرح مفصّل.

## محددات React

يوفر WebdriverIO طريقة لتحديد مكونات React بناءً على اسم المكون. للقيام بذلك، لديك خيار بين أمرين: `react$` و`react$$`.

تتيح لك هذه الأوامر تحديد المكونات من [React VirtualDOM](https://reactjs.org/docs/faq-internals.html) وإرجاع إما عنصر WebdriverIO واحد أو مصفوفة من العناصر (حسب الدالة المستخدمة).

**ملاحظة**: الأمران `react$` و`react$$` متشابهان في الوظيفة، باستثناء أن `react$$` سيُرجع *جميع* النسخ المطابقة كمصفوفة من عناصر WebdriverIO، بينما سيُرجع `react$` أول نسخة يعثر عليها.

تعمل الأوامر مع React من الإصدار 16 إلى 19، لتطبيق يبدأ باستخدام `createRoot` أو `ReactDOM.render`. وهي تقرأ مكونات عملية العرض الحالية، لذا تعثر أيضًا على المكونات التي أضافها تغيير في الحالة. إذا لم يكن React قد عرض جذرًا للصفحة بعد، فإنها تنتظر حتى 5 ثوانٍ لذلك.

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

في الشيفرة أعلاه توجد نسخة بسيطة من `MyComponent` داخل التطبيق، يعرضها React داخل عنصر HTML ذي `id="root"`.

باستخدام الأمر `browser.react$`، يمكنك تحديد نسخة من `MyComponent`:

```js
const myCmp = await browser.react$('MyComponent')
```

الآن بعد أن خزّنت عنصر WebdriverIO في المتغير `myCmp`، يمكنك تنفيذ أوامر العناصر عليه.

#### تصفية المكونات

يمكنك تصفية اختيارك حسب الخصائص (props) و/أو الحالة (state) للمكون. للقيام بذلك، مرّر `props` و/أو `state` في الوسيط الثاني للأمر.

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

إذا أردت تحديد نسخة `MyComponent` التي تمتلك الخاصية `name` بقيمة `WebdriverIO`، يمكنك تنفيذ الأمر على النحو التالي:

```js
const myCmp = await browser.react$('MyComponent', {
    props: { name: 'WebdriverIO' }
})
```

إذا أردت تصفية اختيارك حسب الحالة، سيبدو أمر `browser` على النحو التالي:

```js
const myCmp = await browser.react$('MyComponent', {
    state: { myState: 'some value' }
})
```

يتطابق المرشّح عندما يتطابق كل مفتاح من مفاتيحه الموجودة أيضًا لدى المكون. يتم تجاهل المفتاح غير الموجود لدى المكون. يتطابق الكائن المتداخل بالطريقة نفسها، وتتطابق المصفوفة عندما تشترك في قيمة واحدة مع مصفوفة المكون. تتطابق `null` و`false` و`0` مع القيمة نفسها. بالنسبة لمكون دالة يستخدم hooks، تكون الحالة هي حالة أول hook (`useState` أو `useReducer`): إذا كان أول hook من نوع آخر، مثل `useRef`، فلن يتطابق مرشّح الحالة. عند استخدام `props` و`state` معًا، يجب أن يتطابق المكون مع كليهما.

#### قواعد المحددات

- يطابق `*` حرفًا واحدًا أو أكثر: `browser.react$$('My*')` يعثر على `MyComponent` و`MyOtherComponent`.
- الأسماء المفصولة بمسافات تعثر على مكون داخل مكون آخر: `browser.react$$('List Item')` يعثر على كل `Item` داخل `List`.
- اسم المكون هو `displayName` الخاص به، وإلا فاسم دالته أو فئته. المكون المُنشأ باستخدام `React.memo` يحمل اسم دالته (كما يمنحه إصدار التطوير من React 17 أيضًا `displayName` الخاص بكائن memo). المكون المُنشأ باستخدام `React.forwardRef` ليس له اسم، ما لم يكن لديه `displayName`.
- بالنسبة لمكون عالي الرتبة (higher-order component) باسم مثل `withRouter(MyComponent)`، يُستخدم الاسم الموجود داخل الأقواس: `MyComponent`.
- بدون نطاق عنصر، تبحث الأوامر في جميع جذور React في الصفحة، بترتيب المستند، بما في ذلك الجذور داخل جذور أخرى والجذور داخل جذور الظل المفتوحة. يُرجع `react$` أول تطابق. للبحث في جذر واحد فقط، استدعِ الأمر على حاويته أو على عنصر من ذلك الجذر: `$('#other-root').react$$('MyComponent')`.
- تأتي النتائج جذرًا تلو الآخر. داخل الجذر، تأتي بترتيب شجرة المكونات، مستوى تلو الآخر، وليس بترتيب المستند. يُرجع `react$$` كل عقدة DOM مرة واحدة.
- لتطبيق داخل إطار، استدعِ الأمر على سياق التصفح الخاص بالإطار، أو على عنصر من الإطار: `(await page.frame({ selector: 'iframe' })).react$$('MyComponent')`.

القيود المعروفة:

- المكون الذي يعرض نصًا فقط يُنتج عقدة نصية. مع WebDriver الكلاسيكي، لا يمكن إرسال العقدة النصية مرة أخرى، ويفشل الأمر مع `javascript error: circular reference`.
- بينما يقوم React بعملية الترطيب (hydration) لحدود `Suspense` في صفحة معروضة من الخادم، لا تكون المكونات الموجودة داخلها موجودة بعد. انتظر حتى تنتهي الصفحة من عملية الترطيب.

#### التعامل مع `React.Fragment`

عند استخدام الأمر `react$` لتحديد [أجزاء (fragments)](https://reactjs.org/docs/fragments.html) React، سيُرجع WebdriverIO الابن الأول لذلك المكون كعقدة المكون. إذا استخدمت `react$$`، فستتلقى مصفوفة تحتوي على جميع عقد HTML داخل الأجزاء التي تطابق المحدد.

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

**ملاحظة:** إذا كانت لديك عدة نسخ من `MyComponent` واستخدمت `react$$` لتحديد مكونات الأجزاء هذه، فستُرجَع إليك مصفوفة أحادية البعد تحتوي على جميع العقد. بعبارة أخرى، إذا كانت لديك 3 نسخ من `<MyComponent />`، فستُرجَع إليك مصفوفة تحتوي على ستة عناصر WebdriverIO.

## استراتيجيات المحددات المخصصة {#custom-selector-strategies}


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