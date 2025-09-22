---
id: method-options
title: خيارات الطريقة
---

خيارات الطرق هي الخيارات التي يمكن تعيينها لكل [طريقة](./methods). إذا كان الخيار له نفس المفتاح مثل خيار تم تعيينه أثناء تثبيت المكون الإضافي، فإن خيار الطريقة هذا سيتجاوز قيمة خيار المكون الإضافي.

:::info ملاحظة

-   يمكن استخدام جميع الخيارات من [خيارات الحفظ](#save-options) لطرق [المقارنة](#compare-check-options)
-   يمكن استخدام جميع خيارات المقارنة أثناء تثبيت الخدمة __أو__ لكل طريقة فحص فردية. إذا كان لخيار الطريقة نفس المفتاح مثل خيار تم تعيينه أثناء تثبيت الخدمة، فإن خيار مقارنة الطريقة سيتجاوز قيمة خيار مقارنة الخدمة.
- يمكن استخدام جميع الخيارات للسياقات التطبيقية أدناه ما لم يُذكر خلاف ذلك:
    - الويب
    - تطبيق هجين
    - تطبيق أصلي
- العينات أدناه هي مع طرق `save*`، ولكن يمكن استخدامها أيضًا مع طرق `check*`

:::

## خيارات الحفظ

### `disableBlinkingCursor`

- **النوع:** `boolean`
- **إلزامي:** لا
- **الافتراضي:** `false`
- **يستخدم مع:** جميع [الطرق](./methods)
- **سياقات التطبيق المدعومة:** الويب، تطبيق هجين (عرض الويب)

تمكين/تعطيل "وميض" المؤشر في عناصر `input` و `textarea` و `[contenteditable]` في التطبيق. إذا تم تعيينه إلى `true`، سيتم تعيين المؤشر إلى `transparent` قبل أخذ لقطة شاشة
وإعادة تعيينه عند الانتهاء.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableBlinkingCursor: true
    }
)
```

### `disableCSSAnimation`

- **النوع:** `boolean`
- **إلزامي:** لا
- **الافتراضي:** `false`
- **يستخدم مع:** جميع [الطرق](./methods)
- **سياقات التطبيق المدعومة:** الويب، تطبيق هجين (عرض الويب)

تمكين/تعطيل جميع رسوم CSS المتحركة في التطبيق. إذا تم تعيينه إلى `true`، سيتم تعطيل جميع الرسوم المتحركة قبل أخذ لقطة شاشة
وإعادة تعيينها عند الانتهاء

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableCSSAnimation: true
    }
)
```

### `enableLegacyScreenshotMethod`

- **النوع:** `boolean`
- **إلزامي:** لا
- **الافتراضي:** `false`
- **يستخدم مع:** جميع [الطرق](./methods)
- **سياقات التطبيق المدعومة:** الويب، تطبيق هجين (عرض الويب)

استخدم هذا الخيار للرجوع إلى طريقة لقطة الشاشة "القديمة" المستندة إلى بروتوكول W3C-WebDriver. يمكن أن يكون هذا مفيدًا إذا كانت اختباراتك تعتمد على صور أساسية موجودة أو إذا كنت تعمل في بيئات لا تدعم بشكل كامل لقطات الشاشة المستندة إلى BiDi الأحدث.
لاحظ أن تمكين هذا قد ينتج عنه لقطات شاشة بدقة أو جودة مختلفة قليلاً.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLegacyScreenshotMethod: true
    }
)
```

### `enableLayoutTesting`

- **النوع:** `boolean`
- **إلزامي:** لا
- **الافتراضي:** `false`
- **يستخدم مع:** جميع [الطرق](./methods)
- **سياقات التطبيق المدعومة:** الويب، تطبيق هجين (عرض الويب)

هذا سيخفي جميع النصوص على الصفحة بحيث يتم استخدام التخطيط فقط للمقارنة. سيتم إخفاء النص عن طريق إضافة النمط `'color': 'transparent !important'` إلى __كل__ عنصر.

للإخراج، انظر [إخراج الاختبار](./test-output#enablelayouttesting).

:::info
باستخدام هذا الخيار، سيحصل كل عنصر يحتوي على نص (ليس فقط `p, h1, h2, h3, h4, h5, h6, span, a, li`، ولكن أيضًا `div|button|..`) على هذه الخاصية. لا توجد __أي__ خيارات لتخصيص ذلك.
:::

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLayoutTesting: true
    }
)
```

### `hideScrollBars`

- **النوع:** `boolean`
- **إلزامي:** لا
- **الافتراضي:** `true`
- **يستخدم مع:** جميع [الطرق](./methods)
- **سياقات التطبيق المدعومة:** الويب، تطبيق هجين (عرض الويب)

إخفاء أشرطة التمرير في التطبيق. إذا تم تعيينه إلى true، سيتم تعطيل جميع أشرطة التمرير قبل أخذ لقطة شاشة. يتم تعيين هذا افتراضيًا إلى `true` لمنع حدوث مشكلات إضافية.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideScrollBars: false
    }
)
```

### `hideElements`

- **النوع:** `array`
- **إلزامي:** لا
- **يستخدم مع:** جميع [الطرق](./methods)
- **سياقات التطبيق المدعومة:** الويب، تطبيق هجين (عرض الويب)

يمكن لهذه الطريقة إخفاء عنصر واحد أو عدة عناصر عن طريق إضافة خاصية `visibility: hidden` إليها من خلال توفير مصفوفة من العناصر.

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

### `removeElements`

- **النوع:** `array`
- **إلزامي:** لا
- **يستخدم مع:** جميع [الطرق](./methods)
- **سياقات التطبيق المدعومة:** الويب، تطبيق هجين (عرض الويب)

يمكن لهذه الطريقة _إزالة_ عنصر واحد أو عدة عناصر عن طريق إضافة خاصية `display: none` إليها من خلال توفير مصفوفة من العناصر.

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

### `resizeDimensions`

- **النوع:** `object`
- **إلزامي:** لا
- **الافتراضي:** `{ top: 0, right: 0, bottom: 0, left: 0}`
- **يستخدم مع:** فقط لـ [`saveElement`](./methods#saveelement) أو [`checkElement`](./methods#checkelement)
- **سياقات التطبيق المدعومة:** الويب، تطبيق هجين (عرض الويب)، تطبيق أصلي

كائن يحتاج إلى الاحتفاظ بمقدار البكسل `top`, `right`, `bottom` و `left` التي تحتاج إلى جعل قص العنصر أكبر.

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

### `userBasedFullPageScreenshot`

- **النوع:** `boolean`
- **إلزامي:** لا
- **الافتراضي:** `false`
- **يستخدم مع:** فقط لـ [`saveFullPageScreen`](./methods#savefullpagescreen), [`saveTabbablePage`](./methods#savetabbablepage), [`checkFullPageScreen`](./methods#checkfullpagescreen) أو [`checkTabbablePage`](./methods#checktabbablepage)
- **سياقات التطبيق المدعومة:** الويب، تطبيق هجين (عرض الويب)

عند تعيينه إلى `true`، يمكّن هذا الخيار **استراتيجية التمرير والتجميع** لالتقاط لقطات شاشة للصفحة الكاملة.
بدلاً من استخدام إمكانيات لقطة الشاشة الأصلية للمتصفح، فإنه يتمرر عبر الصفحة يدويًا ويجمع لقطات شاشة متعددة معًا.
هذه الطريقة مفيدة بشكل خاص للصفحات ذات **المحتوى الذي يتم تحميله بكسل** أو التخطيطات المعقدة التي تتطلب التمرير للعرض الكامل.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        userBasedFullPageScreenshot: true
    }
)
```

### `fullPageScrollTimeout`

- **النوع:** `number`
- **إلزامي:** لا
- **الافتراضي:** `1500`
- **يستخدم مع:** فقط لـ [`saveFullPageScreen`](./methods#savefullpagescreen) أو [`saveTabbablePage`](./methods#savetabbablepage)
- **سياقات التطبيق المدعومة:** الويب، تطبيق هجين (عرض الويب)

مهلة بالميلي ثانية للانتظار بعد التمرير. قد يساعد ذلك في تحديد الصفحات ذات التحميل البطيء.

> **ملاحظة:** يعمل هذا فقط عند تعيين `userBasedFullPageScreenshot` إلى `true`

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        fullPageScrollTimeout: 3 * 1000
    }
)
```

### `hideAfterFirstScroll`

- **النوع:** `array`
- **إلزامي:** لا
- **يستخدم مع:** فقط لـ [`saveFullPageScreen`](./methods#savefullpagescreen) أو [`saveTabbablePage`](./methods#savetabbablepage)
- **سياقات التطبيق المدعومة:** الويب، تطبيق هجين (عرض الويب)

ستخفي هذه الطريقة عنصرًا واحدًا أو عدة عناصر عن طريق إضافة خاصية `visibility: hidden` إليها من خلال توفير مصفوفة من العناصر.
سيكون هذا مفيدًا عندما تحتوي الصفحة على سبيل المثال على عناصر ثابتة ستتمرر مع الصفحة إذا تم تمرير الصفحة ولكنها ستعطي تأثيرًا مزعجًا عند عمل لقطة شاشة للصفحة الكاملة.

> **ملاحظة:** يعمل هذا فقط عند تعيين `userBasedFullPageScreenshot` إلى `true`

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

### `waitForFontsLoaded`

- **النوع:** `boolean`
- **إلزامي:** لا
- **الافتراضي:** `true`
- **يستخدم مع:** جميع [الطرق](./methods)
- **سياقات التطبيق المدعومة:** الويب، تطبيق هجين (عرض الويب)

يمكن تحميل الخطوط، بما في ذلك خطوط الطرف الثالث، بشكل متزامن أو غير متزامن. يعني التحميل غير المتزامن أن الخطوط قد تتحمل بعد أن يحدد WebdriverIO أن الصفحة قد تم تحميلها بالكامل. لمنع مشاكل عرض الخطوط، سينتظر هذا الوحدة، افتراضيًا، حتى يتم تحميل جميع الخطوط قبل التقاط لقطة شاشة.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        waitForFontsLoaded: true
    }
)
```

## خيارات المقارنة (الفحص)

خيارات المقارنة هي خيارات تؤثر على طريقة تنفيذ المقارنة بواسطة [ResembleJS](https://github.com/Huddle/Resemble.js).

### `ignoreAlpha`

- **النوع:** `boolean`
- **الافتراضي:** `false`
- **إلزامي:** لا
- **يستخدم مع:** جميع [طرق الفحص](./methods#check-methods)
- **سياقات التطبيق المدعومة:** الكل

قارن الصور وتجاهل قناة ألفا.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAlpha: true
    }
)
```

### `blockOutSideBar`

- **النوع:** `boolean`
- **الافتراضي:** `true`
- **إلزامي:** لا
- **يستخدم مع:** _يمكن استخدامه فقط مع `checkScreen()`. هذا **للأيباد فقط**_
- **سياقات التطبيق المدعومة:** الكل

حجب الشريط الجانبي تلقائيًا للأيباد في وضع أفقي أثناء المقارنات. يمنع هذا الفشل في مكون علامة التبويب/الخاص/الإشارة المرجعية الأصلي.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutSideBar: true
    }
)
```

### `blockOutStatusBar`

- **النوع:** `boolean`
- **الافتراضي:** `true`
- **إلزامي:** لا
- **يستخدم مع:** _هذا **للجوال فقط**_
- **سياقات التطبيق المدعومة:** تطبيقات هجينة (الجزء الأصلي) وتطبيقات أصلية

حجب شريط الحالة وشريط العنوان تلقائيًا أثناء المقارنات. يمنع هذا الفشل في الوقت أو الواي فاي أو حالة البطارية.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutStatusBar: true
    }
)
```

### `blockOutToolBar`

- **النوع:** `boolean`
- **الافتراضي:** `true`
- **إلزامي:** لا
- **يستخدم مع:** _هذا **للجوال فقط**_
- **سياقات التطبيق المدعومة:** تطبيقات هجينة (الجزء الأصلي) وتطبيقات أصلية

حجب شريط الأدوات تلقائيًا.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutToolBar: true
    }
)
```

### `ignoreAntialiasing`

- **النوع:** `boolean`
- **الافتراضي:** `false`
- **إلزامي:** لا
- **يستخدم مع:** جميع [طرق الفحص](./methods#check-methods)
- **سياقات التطبيق المدعومة:** الكل

قارن الصور وتجاهل تقنية تنعيم الحواف.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAntialiasing: true
    }
)
```

### `ignoreColors`

- **النوع:** `boolean`
- **الافتراضي:** `false`
- **إلزامي:** لا
- **يستخدم مع:** جميع [طرق الفحص](./methods#check-methods)
- **سياقات التطبيق المدعومة:** الكل

على الرغم من أن الصور ملونة، ستقارن المقارنة صورتين بالأبيض والأسود.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreColors: true
    }
)
```

### `ignoreLess`

- **النوع:** `boolean`
- **الافتراضي:** `false`
- **إلزامي:** لا
- **يستخدم مع:** جميع [طرق الفحص](./methods#check-methods)
- **سياقات التطبيق المدعومة:** الكل

قارن الصور وقارن مع `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreLess: true
    }
)
```

### `ignoreNothing`

- **النوع:** `boolean`
- **الافتراضي:** `false`
- **إلزامي:** لا
- **يستخدم مع:** جميع [طرق الفحص](./methods#check-methods)
- **سياقات التطبيق المدعومة:** الكل

قارن الصور وقارن مع `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreNothing: true
    }
)
```

### `rawMisMatchPercentage`

- **النوع:** `boolean`
- **الافتراضي:** `false`
- **إلزامي:** لا
- **يستخدم مع:** جميع [طرق الفحص](./methods#check-methods)
- **سياقات التطبيق المدعومة:** الكل

إذا كانت القيمة `true` ستكون النسبة المئوية المُرجعة مثل `0.12345678`، الافتراضي هو `0.12`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        rawMisMatchPercentage: true
    }
)
```

### `returnAllCompareData`

- **النوع:** `boolean`
- **الافتراضي:** `false`
- **إلزامي:** لا
- **يستخدم مع:** جميع [طرق الفحص](./methods#check-methods)
- **سياقات التطبيق المدعومة:** الكل

سيعيد هذا جميع بيانات المقارنة، وليس فقط النسبة المئوية للتطابق، انظر أيضًا [إخراج وحدة التحكم](./test-output#console-output-1)

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        returnAllCompareData: true
    }
)
```

### `saveAboveTolerance`

- **النوع:** `number`
- **الافتراضي:** `0`
- **إلزامي:** لا
- **يستخدم مع:** جميع [طرق الفحص](./methods#check-methods)
- **سياقات التطبيق المدعومة:** الكل

القيمة المسموح بها لـ `misMatchPercentage` التي تمنع حفظ الصور مع الاختلافات

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        saveAboveTolerance: 0.25
    }
)
```

### `largeImageThreshold`

- **النوع:** `number`
- **الافتراضي:** `0`
- **إلزامي:** لا
- **يستخدم مع:** جميع [طرق الفحص](./methods#check-methods)
- **سياقات التطبيق المدعومة:** الكل

مقارنة الصور الكبيرة يمكن أن تؤدي إلى مشاكل في الأداء.
عند توفير رقم لعدد البكسلات هنا (أعلى من 0)، ستتخطى خوارزمية المقارنة البكسلات عندما يكون عرض الصورة أو ارتفاعها أكبر من `largeImageThreshold` بكسل.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        largeImageThreshold: 1500
    }
)
```

### `scaleImagesToSameSize`

- **النوع:** `boolean`
- **الافتراضي:** `false`
- **إلزامي:** لا
- **يستخدم مع:** جميع [طرق الفحص](./methods#check-methods)
- **سياقات التطبيق المدعومة:** الكل

يقوم بتغيير حجم صورتين إلى نفس الحجم قبل تنفيذ المقارنة. يوصى بشدة بتمكين `ignoreAntialiasing` و `ignoreAlpha`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        scaleImagesToSameSize: true
    }
)
```

### `ignore`

- **النوع:** `array`
- **إلزامي:** لا
- **يستخدم مع:** فقط مع طريقة `checkScreen`، **وليس** مع طريقة `checkElement`
- **سياقات التطبيق المدعومة:** تطبيق أصلي

ستحجب هذه الطريقة تلقائيًا العناصر أو منطقة على الشاشة بناءً على مصفوفة من العناصر أو كائن من `x|y|width|height`.

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

## خيارات المجلدات

مجلد الخط الأساسي ومجلدات لقطة الشاشة (الفعلية، الفرق) هي خيارات يمكن تعيينها أثناء تثبيت المكون الإضافي أو الطريقة. لتعيين خيارات المجلد على طريقة معينة، قم بتمرير خيارات المجلد إلى كائن خيارات الطرق. يمكن استخدام هذا لـ:

- الويب
- تطبيق هجين
- تطبيق أصلي

```ts
import path from 'node:path'

const methodOptions = {
    actualFolder: path.join(process.cwd(), 'customActual'),
    baselineFolder: path.join(process.cwd(), 'customBaseline'),
    diffFolder: path.join(process.cwd(), 'customDiff'),
}

// يمكنك استخدام هذا لجميع الطرق
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

### `actualFolder`

- **النوع:** `string`
- **إلزامي:** لا
- **سياقات التطبيق المدعومة:** الكل

مجلد للقطة الشاشة التي تم التقاطها في الاختبار.

### `baselineFolder`

- **النوع:** `string`
- **إلزامي:** لا
- **سياقات التطبيق المدعومة:** الكل

مجلد للصورة الأساسية التي يتم استخدامها للمقارنة.

### `diffFolder`

- **النوع:** `string`
- **إلزامي:** لا
- **سياقات التطبيق المدعومة:** الكل

مجلد للاختلاف في الصور الذي يتم عرضه بواسطة ResembleJS.