---
id: method-options
title: خيارات الطرق
description: "اضبط خيارات الحفظ والمقارنة والمجلدات لكل طريقة من طرق الاختبار المرئي، والتي تتجاوز الخيارات المحددة على مستوى الخدمة."
---

خيارات الطرق هي الخيارات التي يمكن ضبطها لكل [طريقة](./methods). إذا كان للخيار نفس المفتاح لخيار تم ضبطه أثناء إنشاء مثيل الإضافة، فإن خيار الطريقة هذا سيتجاوز قيمة خيار الإضافة.

:::info ملاحظة

-   يمكن استخدام جميع الخيارات من [خيارات الحفظ](#save-options) مع طرق [المقارنة](#compare-check-options)
-   يمكن استخدام جميع خيارات المقارنة أثناء إنشاء مثيل الخدمة __أو__ لكل طريقة فحص على حدة. إذا كان لخيار الطريقة نفس المفتاح لخيار تم ضبطه أثناء إنشاء مثيل الخدمة، فإن خيار المقارنة الخاص بالطريقة سيتجاوز قيمة خيار المقارنة الخاص بالخدمة.
- يمكن استخدام جميع الخيارات لسياقات التطبيقات أدناه ما لم يُذكر خلاف ذلك:
    - الويب
    - التطبيق الهجين
    - التطبيق الأصلي
- الأمثلة أدناه تستخدم طرق `save*`، ولكن يمكن استخدامها أيضاً مع طرق `check*`

:::

# خيارات الحفظ

## العرض والتصيير

---

### `hideScrollBars`

<Option type="boolean" default="true" required="No">

- **يُستخدم مع:** جميع [الطرق](./methods)
- **سياقات التطبيقات المدعومة:** الويب، التطبيق الهجين (Webview)

إخفاء شريط (أشرطة) التمرير في التطبيق. إذا تم ضبطه على true فسيتم تعطيل جميع أشرطة التمرير قبل التقاط لقطة الشاشة. القيمة الافتراضية هي `true` لتجنب حدوث مشكلات إضافية.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideScrollBars: false
    }
)
```

</Option>
### `disableBlinkingCursor`

<Option type="boolean" default="false" required="No">

- **يُستخدم مع:** جميع [الطرق](./methods)
- **سياقات التطبيقات المدعومة:** الويب، التطبيق الهجين (Webview)

تمكين/تعطيل "وميض" مؤشر الإدخال في جميع عناصر `input` و`textarea` و`[contenteditable]` في التطبيق. إذا تم ضبطه على `true` فسيتم ضبط المؤشر على `transparent` قبل التقاط لقطة الشاشة
وإعادة ضبطه عند الانتهاء.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableBlinkingCursor: true
    }
)
```

</Option>
### `disableCSSAnimation`

<Option type="boolean" default="false" required="No">

- **يُستخدم مع:** جميع [الطرق](./methods)
- **سياقات التطبيقات المدعومة:** الويب، التطبيق الهجين (Webview)

تمكين/تعطيل جميع رسوم CSS المتحركة في التطبيق. إذا تم ضبطه على `true` فسيتم تعطيل جميع الرسوم المتحركة قبل التقاط لقطة الشاشة
وإعادة ضبطها عند الانتهاء

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableCSSAnimation: true
    }
)
```

</Option>
### `enableLayoutTesting`

<Option type="boolean" default="false" required="No">

- **يُستخدم مع:** جميع [الطرق](./methods)
- **سياقات التطبيقات المدعومة:** الويب، التطبيق الهجين (Webview)

سيؤدي هذا إلى إخفاء جميع النصوص في الصفحة بحيث يتم استخدام التخطيط فقط للمقارنة. يتم الإخفاء عن طريق إضافة النمط `'color': 'transparent !important'` إلى __كل__ عنصر.

للاطلاع على المخرجات، راجع [مخرجات الاختبار](./test-output#enablelayouttesting).

:::info
باستخدام هذه العلامة، سيحصل كل عنصر يحتوي على نص (ليس فقط `p, h1, h2, h3, h4, h5, h6, span, a, li`، بل أيضاً `div|button|..`) على هذه الخاصية. __لا__ يوجد خيار لتخصيص ذلك.
:::

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLayoutTesting: true
    }
)
```

</Option>
### `enableLegacyScreenshotMethod`

<Option type="boolean" default="false" required="No">

- **يُستخدم مع:** جميع [الطرق](./methods)
- **سياقات التطبيقات المدعومة:** الويب، التطبيق الهجين (Webview)

استخدم هذا الخيار للعودة إلى طريقة التقاط لقطات الشاشة "الأقدم" المعتمدة على بروتوكول W3C-WebDriver. قد يكون هذا مفيداً إذا كانت اختباراتك تعتمد على صور أساسية موجودة مسبقاً، أو إذا كنت تعمل في بيئات لا تدعم بشكل كامل لقطات الشاشة الأحدث المعتمدة على BiDi.
لاحظ أن تمكين هذا الخيار قد ينتج لقطات شاشة بدقة أو جودة مختلفة قليلاً.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLegacyScreenshotMethod: true
    }
)
```

</Option>
### `ignoreRegionPadding`

<Option type="number" default="1" required="No">

- **يُستخدم مع:** جميع [الطرق](./methods)
- **سياقات التطبيقات المدعومة:** الويب، التطبيق الهجين (Webview)

حشوة بوحدات بكسل الجهاز تُضاف إلى كل جانب من جوانب مناطق التجاهل، مما يجعل كل منطقة أعرض وأطول بمقدار ضعفي هذه القيمة. يساعد هذا في تجنب الاختلافات الحدودية بمقدار 1 بكسل التي قد تظهر على الشاشات ذات DPR العالي أو مع بروتوكول لقطات الشاشة BiDi. اضبطه على `0` للتعطيل.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        ignoreRegionPadding: 0
    }
)
```

</Option>
### `waitForFontsLoaded`

<Option type="boolean" default="true" required="No">

- **يُستخدم مع:** جميع [الطرق](./methods)
- **سياقات التطبيقات المدعومة:** الويب، التطبيق الهجين (Webview)

يمكن تحميل الخطوط، بما في ذلك خطوط الجهات الخارجية، بشكل متزامن أو غير متزامن. التحميل غير المتزامن يعني أن الخطوط قد تُحمَّل بعد أن يحدد WebdriverIO أن الصفحة قد اكتمل تحميلها. لمنع مشكلات عرض الخطوط، ستنتظر هذه الوحدة افتراضياً حتى يتم تحميل جميع الخطوط قبل التقاط لقطة الشاشة.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        waitForFontsLoaded: true
    }
)
```

</Option>
## ظهور العناصر

---

### `hideElements`

<Option type="array" required="No">

- **يُستخدم مع:** جميع [الطرق](./methods)
- **سياقات التطبيقات المدعومة:** الويب، التطبيق الهجين (Webview)

يمكن لهذه الطريقة إخفاء عنصر واحد أو عدة عناصر عن طريق إضافة الخاصية `visibility: hidden` إليها، وذلك بتوفير مصفوفة من العناصر.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideElements: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

</Option>
### `removeElements`

<Option type="array" required="No">

- **يُستخدم مع:** جميع [الطرق](./methods)
- **سياقات التطبيقات المدعومة:** الويب، التطبيق الهجين (Webview)

يمكن لهذه الطريقة _إزالة_ عنصر واحد أو عدة عناصر عن طريق إضافة الخاصية `display: none` إليها، وذلك بتوفير مصفوفة من العناصر.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        removeElements: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

</Option>
## خاص بالعناصر

---

### `resizeDimensions`

<Option type="object" default={`{ top: 0, right: 0, bottom: 0, left: 0}`} required="No">

- **يُستخدم مع:** فقط مع [`saveElement`](./methods#saveelement) أو [`checkElement`](./methods#checkelement)
- **سياقات التطبيقات المدعومة:** الويب، التطبيق الهجين (Webview)، التطبيق الأصلي

كائن يجب أن يحتوي على عدد البكسلات `top` و`right` و`bottom` و`left` اللازمة لتكبير منطقة قص العنصر.

```typescript
await browser.saveElement(
    'sample-tag',
    {
        resizeDimensions: {
            top: 50,
            left: 100,
            right: 10,
            bottom: 90,
        },
    }
)
```

</Option>
### `biDiOrigin`

<Option type="'document' | 'viewport'" default="'document'" required="No">

- **يُستخدم مع:** فقط مع [`saveElement`](./methods#saveelement) أو [`checkElement`](./methods#checkelement)
- **سياقات التطبيقات المدعومة:** الويب، التطبيق الهجين (Webview)

خيار خاص بـ BiDi فقط يتحكم في أصل الإحداثيات المستخدم عند التقاط لقطات شاشة العناصر عبر بروتوكول WebDriver BiDi.

- `'document'` _(افتراضي)_: يقوم بتصيير تخطيط المستند. يعمل مع أي موضع للعنصر لكنه **لا** يلتقط الطبقات المركّبة (مثل أشرطة التمرير، والتراكبات الثابتة/اللاصقة، وعناصر `will-change`).
- `'viewport'`: يلتقط الإطار المركّب كما تم رسمه، بما في ذلك أشرطة التمرير والتراكبات. يتطلب أن يكون العنصر **مرئياً بالكامل** في منفذ العرض، ويطلق خطأً وصفياً عندما يكون العنصر خارج منفذ العرض أو أكبر منه.

```typescript
await browser.saveElement(
    await $('#my-element'),
    'sample-tag',
    {
        biDiOrigin: 'viewport'
    }
)
```

</Option>
## خاص بالصفحة الكاملة

---

### `userBasedFullPageScreenshot`

<Option type="boolean" default="false" required="No">

- **يُستخدم مع:** فقط مع [`saveFullPageScreen`](./methods#savefullpagescreen) أو [`saveTabbablePage`](./methods#savetabbablepage) أو [`checkFullPageScreen`](./methods#checkfullpagescreen) أو [`checkTabbablePage`](./methods#checktabbablepage)
- **سياقات التطبيقات المدعومة:** الويب، التطبيق الهجين (Webview)

عند ضبطه على `true`، يُمكّن هذا الخيار **استراتيجية التمرير والدمج** لالتقاط لقطات شاشة للصفحة الكاملة.
بدلاً من استخدام إمكانيات التقاط الشاشة الأصلية للمتصفح، يقوم بالتمرير عبر الصفحة يدوياً ودمج عدة لقطات شاشة معاً.
هذه الطريقة مفيدة بشكل خاص للصفحات ذات **المحتوى المحمّل بشكل كسول** أو التخطيطات المعقدة التي تتطلب التمرير ليتم عرضها بالكامل.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        userBasedFullPageScreenshot: true
    }
)
```

</Option>
### `fullPageScrollTimeout`

<Option type="number" default="1500" required="No">

- **يُستخدم مع:** فقط مع [`saveFullPageScreen`](./methods#savefullpagescreen) أو [`saveTabbablePage`](./methods#savetabbablepage)
- **سياقات التطبيقات المدعومة:** الويب، التطبيق الهجين (Webview)

مهلة الانتظار بالمللي ثانية بعد كل عملية تمرير. قد يساعد هذا في التعامل مع الصفحات ذات التحميل الكسول.

> **ملاحظة:** يعمل هذا فقط عند ضبط `userBasedFullPageScreenshot` على `true`

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        fullPageScrollTimeout: 3 * 1000
    }
)
```

</Option>
### `hideAfterFirstScroll`

<Option type="array" required="No">

- **يُستخدم مع:** فقط مع [`saveFullPageScreen`](./methods#savefullpagescreen) أو [`saveTabbablePage`](./methods#savetabbablepage)
- **سياقات التطبيقات المدعومة:** الويب، التطبيق الهجين (Webview)

ستقوم هذه الطريقة بإخفاء عنصر واحد أو عدة عناصر عن طريق إضافة الخاصية `visibility: hidden` إليها، وذلك بتوفير مصفوفة من العناصر.
سيكون هذا مفيداً عندما تحتوي الصفحة مثلاً على عناصر لاصقة تتحرك مع الصفحة عند تمريرها، لكنها تُحدث تأثيراً مزعجاً عند التقاط لقطة شاشة للصفحة الكاملة

> **ملاحظة:** يعمل هذا فقط عند ضبط `userBasedFullPageScreenshot` على `true`

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        hideAfterFirstScroll: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

# خيارات المقارنة (الفحص)

خيارات المقارنة هي الخيارات التي تؤثر على طريقة تنفيذ المقارنة.

</Option>
## الحساسية المرئية

---

:::info سجل الإصدارات لخيارات `ignore*`
تغيّر سلوك هذه الإعدادات المسبقة مرة واحدة، كتغيير جذري، عندما انتقل محرك المقارنة من ResembleJS (الإصدار v9 وما قبله) إلى Pixelmatch (الإصدار v10 وما بعده). راجع [جدول سجل الإصدارات](./compare-options#visual-sensitivity) في صفحة خيارات المقارنة للاطلاع على التفاصيل. أي تغيير منذ الإصدار v10.0.0 مُشار إليه بملاحظة "منذ" في الخيار المعني أدناه.
:::

**ترتيب الأولوية للأخير:** عند تمكين أكثر من علامة `ignore*` في الوقت نفسه، يتم تطبيق إعداد مسبق واحد فقط، وفقاً لهذا الترتيب (الأخير يفوز): `ignoreAlpha` ← `ignoreAntialiasing` ← `ignoreColors` ← `ignoreLess` ← `ignoreNothing`. اعتباراً من الإصدار `v10.1.0` يتم تسجيل تحذير يذكر الإعداد المسبق الذي فاز.

### `ignoreColors`

<Option type="boolean" default="false" required="No">

- **يُستخدم مع:** جميع [طرق الفحص](./methods#check-methods)
- **سياقات التطبيقات المدعومة:** الكل
- **منذ:** `v10.1.0`: مقارنة السطوع فقط باستخدام أوزان luma الخاصة بـ resemble (`0.3/0.59/0.11`).

يقارن السطوع فقط (أوزان luma الخاصة بـ resemble `0.3/0.59/0.11`)، متجاهلاً اختلافات درجة اللون/اللون. استخدم هذا عندما يكون من المتوقع أن يختلف اللون نفسه، لكنك لا تزال ترغب في رصد تغييرات التخطيط أو السطوع.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreColors: true
    }
)
```

</Option>
### `ignoreAlpha`

<Option type="boolean" default="false" required="No">

- **يُستخدم مع:** جميع [طرق الفحص](./methods#check-methods)
- **سياقات التطبيقات المدعومة:** الكل
- **منذ:** `v10.1.0`: يطبّق قاعدة العتبة/AA الخاصة به بشكل مستقل عن علامات `ignore*` الأخرى.

يقارن الصور ويتجاهل اختلافات قناة ألفا. استخدم هذا عندما يكون عرض الشفافية/العتامة غير مستقر، لكن ألوان البكسلات الأساسية مهمة.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAlpha: true
    }
)
```

</Option>
### `ignoreAntialiasing`

<Option type="boolean" default="true" required="No">

- **يُستخدم مع:** جميع [طرق الفحص](./methods#check-methods)
- **سياقات التطبيقات المدعومة:** الكل
- **منذ:** `v10`: تغيّرت القيمة الافتراضية إلى `true` (كانت `false` في الإصدار v9 وما قبله).

يتسامح مع البكسلات المنعّمة (anti-aliased) أثناء المقارنة. اضبطه على `false` لإجراء مقارنة صارمة يجب فيها احتساب البكسلات المنعّمة كعدم تطابق. يحل هذا المصدر الأكثر شيوعاً لعدم استقرار الاختبارات المرئية: عرض حواف النصوص/الأشكال بتنعيم مختلف قليلاً عبر الأجهزة رغم عدم تغيّر أي شيء.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAntialiasing: true
    }
)
```

</Option>
### `ignoreLess`

<Option type="boolean" default="false" required="No">

- **يُستخدم مع:** جميع [طرق الفحص](./methods#check-methods)
- **سياقات التطبيقات المدعومة:** الكل
- **منذ:** `v10.1.0`: يطبّق قاعدة العتبة/AA الخاصة به بشكل مستقل عن علامات `ignore*` الأخرى.

يقارن الصور باستخدام تفاوت RGB مخفف (~16/255 لكل قناة في فضاء YIQ). لا يتم التسامح مع التنعيم. استخدم هذا لإتاحة هامش بسيط لضوضاء العرض (تشوهات الضغط، تقريب الألوان) دون التسامح مع التنعيم.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreLess: true
    }
)
```

</Option>
### `ignoreNothing`

<Option type="boolean" default="false" required="No">

- **يُستخدم مع:** جميع [طرق الفحص](./methods#check-methods)
- **سياقات التطبيقات المدعومة:** الكل
- **منذ:** `v10.1.0`: يطبّق قاعدة العتبة/AA الخاصة به بشكل مستقل عن علامات `ignore*` الأخرى.

استخدام تفاوت صفري: أي اختلاف في البكسلات يُحتسب كعدم تطابق، بما في ذلك التنعيم. استخدم هذا عندما تحتاج إلى إثبات دقيق على مستوى البكسل بأن شيئاً لم يتغير على الإطلاق.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreNothing: true
    }
)
```

</Option>
### `pixelmatch`

<Option type="object" default="undefined" required="No">

- **يُستخدم مع:** جميع [طرق الفحص](./methods#check-methods)
- **سياقات التطبيقات المدعومة:** الكل
- **أُضيف في:** `v10.1.0`

يتجاوز وضع المقارنة لاستدعاء `check*` واحد باستخدام إعدادات [pixelmatch](https://github.com/mapbox/pixelmatch) مباشرة (`threshold`، `includeAA`، `diffColor`، `aaColor`، `diffColorAlt`، `alpha`، `diffMask`، `checkerboard`)، بدلاً من إعداد مسبق من نوع `ignore*`. استخدم هذا عندما تكون الإعدادات المسبقة غير دقيقة بما يكفي لاختبار معين، على سبيل المثال عندما يحتاج إلى قيمة عتبة خاصة به، أو لون اختلاف يبرز فعلاً في تقريرك. راجع [التحكم المباشر في pixelmatch](./compare-options#direct-pixelmatch-control) للاطلاع على المرجع الكامل للحقول وما يحله كل حقل.

لا يمكن دمجه مع خيارات `ignore*` في كائن الخيارات الخاص بالاستدعاء نفسه: إذ يؤدي ذلك إلى إطلاق `CompareOptionsConflictError`. لكن يمكنه تجاوز إعدادات خدمة تستخدم إعدادات `ignore*` المسبقة (أو العكس)؛ ويتم تسجيل تحذير عندما يغيّر استدعاء الطريقة وضع المقارنة بهذه الطريقة.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        pixelmatch: { threshold: 0.05 }
    }
)
```

</Option>
### `scaleImagesToSameSize`

<Option type="boolean" default="false" required="No">

- **يُستخدم مع:** جميع [طرق الفحص](./methods#check-methods)
- **سياقات التطبيقات المدعومة:** الكل

يغيّر حجم صورتين إلى الحجم نفسه قبل تنفيذ المقارنة. يُوصى بشدة بتمكين `ignoreAntialiasing` و`ignoreAlpha`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        scaleImagesToSameSize: true
    }
)
```

</Option>
## حجب عناصر الأجهزة المحمولة

---

### `blockOutStatusBar`

<Option type="boolean" default="true" required="No">

- **يُستخدم مع:** _هذا **للأجهزة المحمولة فقط**_
- **سياقات التطبيقات المدعومة:** التطبيقات الهجينة (الجزء الأصلي) والتطبيقات الأصلية

حجب شريط الحالة وشريط العنوان تلقائياً أثناء المقارنات. يمنع هذا حدوث إخفاقات بسبب الوقت أو حالة الواي فاي أو البطارية.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutStatusBar: true
    }
)
```

</Option>
### `blockOutToolBar`

<Option type="boolean" default="true" required="No">

- **يُستخدم مع:** _هذا **للأجهزة المحمولة فقط**_
- **سياقات التطبيقات المدعومة:** التطبيقات الهجينة (الجزء الأصلي) والتطبيقات الأصلية

حجب شريط الأدوات تلقائياً.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutToolBar: true
    }
)
```

</Option>
### `blockOutSideBar`

<Option type="boolean" default="true" required="No">

- **يُستخدم مع:** _يمكن استخدامه فقط مع `checkScreen()`. هذا **لأجهزة iPad فقط**_
- **سياقات التطبيقات المدعومة:** الكل

حجب الشريط الجانبي تلقائياً لأجهزة iPad في الوضع الأفقي أثناء المقارنات. يمنع هذا حدوث إخفاقات بسبب المكوّن الأصلي للتبويبات/التصفح الخاص/الإشارات المرجعية.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutSideBar: true
    }
)
```

</Option>
## التعامل مع المناطق

---

### `blockOut`

<Option type="array" required="No">

- **يُستخدم مع:** جميع [طرق الفحص](./methods#check-methods)
- **سياقات التطبيقات المدعومة:** الكل

مصفوفة من المناطق المستطيلة المراد حجبها قبل المقارنة. يجب أن يكون كل إدخال كائناً يحتوي على قيم `x` و`y` و`width` و`height` (بالبكسل). يتم طلاء المناطق المحجوبة قبل حساب الاختلاف، مما يمنع تلك المناطق من المساهمة في نسبة عدم التطابق.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOut: [
            { x: 0, y: 0, width: 100, height: 50 },
            { x: 300, y: 200, width: 80, height: 80 },
        ]
    }
)
```

</Option>
### `ignore`

<Option type="array" required="No">

- **يُستخدم مع:** فقط مع طريقة `checkScreen`، و**ليس** مع طريقة `checkElement`
- **سياقات التطبيقات المدعومة:** التطبيق الأصلي

ستقوم هذه الطريقة بحجب العناصر أو منطقة على الشاشة تلقائياً بناءً على مصفوفة من العناصر أو كائن يحتوي على `x|y|width|height`.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignore: [
            $('~element-1'),
            await $('~element-2'),
            {
                x: 150,
                y: 250,
                width: 100,
                height: 100,
            }
        ]
    }
)
```

</Option>
## النتائج والتقارير

---

### `rawMisMatchPercentage`

<Option type="boolean" default="false" required="No">

- **يُستخدم مع:** جميع [طرق الفحص](./methods#check-methods)
- **سياقات التطبيقات المدعومة:** الكل

إذا كانت القيمة true فستكون النسبة المُرجعة مثل `0.12345678`، والقيمة الافتراضية هي `0.12`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        rawMisMatchPercentage: true
    }
)
```

</Option>
### `returnAllCompareData`

<Option type="boolean" default="false" required="No">

- **يُستخدم مع:** جميع [طرق الفحص](./methods#check-methods)
- **سياقات التطبيقات المدعومة:** الكل

سيُرجع هذا جميع بيانات المقارنة، وليس فقط نسبة عدم التطابق، راجع أيضاً [مخرجات وحدة التحكم](./test-output#console-output-1)

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        returnAllCompareData: true
    }
)
```

</Option>
### `saveAboveTolerance`

<Option type="number" default="0" required="No">

- **يُستخدم مع:** جميع [طرق الفحص](./methods#check-methods)
- **سياقات التطبيقات المدعومة:** الكل

القيمة المسموح بها لـ `misMatchPercentage` التي تمنع حفظ الصور التي تحتوي على اختلافات

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        saveAboveTolerance: 0.25
    }
)
```

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="No">

- **يُستخدم مع:** جميع [طرق الفحص](./methods#check-methods)
- **سياقات التطبيقات المدعومة:** الكل

مدى قرب البكسلات المستخدم لتجميع بكسلات الاختلاف معاً في تقارير JSON. القيم الأعلى تجمع المزيد من البكسلات في عدد أقل من المربعات المحيطة؛ والقيم الأقل تنتج مربعات أكثر دقة لكن بعدد أكبر. يكون ذا صلة فقط عند تمكين [`createJsonReportFiles`](/docs/visual-testing/service-options#createjsonreportfiles).

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        diffPixelBoundingBoxProximity: 10
    }
)
```

# خيارات المجلدات

---

مجلد الصور الأساسية ومجلدات لقطات الشاشة (الفعلية، الاختلافات) هي خيارات يمكن ضبطها أثناء إنشاء مثيل الإضافة أو الطريقة. لضبط خيارات المجلدات على طريقة معينة، مرّر خيارات المجلدات إلى كائن خيارات الطريقة. يمكن استخدام ذلك مع:

- الويب
- التطبيق الهجين
- التطبيق الأصلي

```ts
import path from 'node:path'

const methodOptions = {
    actualFolder: path.join(process.cwd(), 'customActual'),
    baselineFolder: path.join(process.cwd(), 'customBaseline'),
    diffFolder: path.join(process.cwd(), 'customDiff'),
}

// يمكنك استخدام هذا مع جميع الطرق
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

</Option>
### `actualFolder`

<Option type="string" required="No" contexts="All">

مجلد اللقطة التي تم التقاطها في الاختبار.

</Option>
### `baselineFolder`

<Option type="string" required="No" contexts="All">

مجلد الصورة الأساسية المستخدمة للمقارنة بها.

</Option>
### `diffFolder`

<Option type="string" required="No" contexts="All">

مجلد صورة الاختلاف الناتجة أثناء المقارنة.

</Option>