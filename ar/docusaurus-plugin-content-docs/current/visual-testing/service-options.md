---
id: service-options
title: خيارات الخدمة
description: "اضبط الخيارات الافتراضية للخدمة المرئية، بما في ذلك التقاط لقطات الشاشة، ولقطات الشاشة للصفحة الكاملة، والصور المرجعية، والمجلدات، وإعداد التقارير."
---

خيارات الخدمة هي الخيارات التي يمكن تعيينها عند إنشاء مثيل الخدمة، وستُستخدم في كل استدعاء للدوال.

```js
// wdio.conf.(js|ts)
export const config = {
    // ...
    // =====
    // الإعداد
    // =====
    services: [
        [
            "visual",
            {
                // الخيارات
            },
        ],
    ],
    // ...
};
```

# الخيارات الافتراضية

## التقاط لقطات الشاشة

---

### `hideScrollBars`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

إخفاء أشرطة التمرير في التطبيق. إذا تم تعيينه إلى true فسيتم تعطيل جميع أشرطة التمرير قبل التقاط لقطة الشاشة. القيمة الافتراضية هي `true` لتجنب مشكلات إضافية.

</Option>
### `disableBlinkingCursor`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview)">

تفعيل/تعطيل "وميض" مؤشر الكتابة في جميع عناصر `input` و`textarea` و`[contenteditable]` في التطبيق. إذا تم تعيينه إلى `true` فسيتم ضبط المؤشر على `transparent` قبل التقاط لقطة الشاشة
وإعادة ضبطه عند الانتهاء

</Option>
### `disableCSSAnimation`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview)">

تفعيل/تعطيل جميع حركات CSS في التطبيق. إذا تم تعيينه إلى `true` فسيتم تعطيل جميع الحركات قبل التقاط لقطة الشاشة
وإعادة ضبطها عند الانتهاء

</Option>
### `enableLayoutTesting`

<Option type="boolean" default="false" required="No" contexts="Web">

سيؤدي هذا إلى إخفاء كل النصوص في الصفحة بحيث يُستخدم التخطيط فقط للمقارنة. يتم الإخفاء عن طريق إضافة النمط `'color': 'transparent !important'` إلى **كل** عنصر.

للاطلاع على المخرجات، راجع [مخرجات الاختبار](/docs/visual-testing/test-output#enablelayouttesting)

:::info
باستخدام هذه الراية، سيحصل كل عنصر يحتوي على نص (أي ليس فقط `p, h1, h2, h3, h4, h5, h6, span, a, li`، بل أيضًا `div|button|..`) على هذه الخاصية. **لا** يوجد خيار لتخصيص ذلك.
:::

</Option>
### `ignoreRegionPadding`

<Option type="number" default="1" required="No" contexts="Web, Hybrid App (Webview)">

حشوة بوحدة بكسلات الجهاز تُضاف إلى كل جانب من جوانب مناطق التجاهل، مما يجعل كل منطقة أعرض وأطول بمقدار ضعفي هذه القيمة. يساعد ذلك على تجنب الاختلافات الحدودية بمقدار 1 بكسل التي قد تظهر على الشاشات ذات DPR العالي أو مع بروتوكول لقطات الشاشة BiDi. اضبطه على `0` للتعطيل.

</Option>
### `waitForFontsLoaded`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

يمكن تحميل الخطوط، بما في ذلك خطوط الجهات الخارجية، بشكل متزامن أو غير متزامن. يعني التحميل غير المتزامن أن الخطوط قد تُحمَّل بعد أن يحدد WebdriverIO أن الصفحة قد اكتمل تحميلها. لمنع مشكلات عرض الخطوط، ستنتظر هذه الوحدة افتراضيًا تحميل جميع الخطوط قبل التقاط لقطة الشاشة.

</Option>
## لقطات الشاشة للصفحة الكاملة

---

### `userBasedFullPageScreenshot`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview) **Introduced in visual-service@7.0.0">

افتراضيًا، يتم التقاط لقطات الشاشة للصفحة الكاملة على الويب المكتبي باستخدام بروتوكول WebDriver BiDi، الذي يتيح لقطات شاشة سريعة ومستقرة ومتسقة دون الحاجة إلى التمرير.
عند تعيين userBasedFullPageScreenshot إلى true، تحاكي عملية التقاط الشاشة مستخدمًا حقيقيًا: التمرير عبر الصفحة، والتقاط لقطات بحجم منفذ العرض، ثم دمجها معًا. هذه الطريقة مفيدة للصفحات ذات المحتوى المحمَّل بشكل كسول أو العرض الديناميكي الذي يعتمد على موضع التمرير.

استخدم هذا الخيار إذا كانت صفحتك تعتمد على تحميل المحتوى أثناء التمرير أو إذا كنت تريد الحفاظ على سلوك طرق التقاط الشاشة القديمة.

</Option>
### `fullPageScrollTimeout`

<Option type="number" default="1500" required="No" contexts="Web">

مهلة الانتظار بالمللي ثانية بعد كل عملية تمرير. قد يساعد ذلك في التعامل مع الصفحات ذات التحميل الكسول.

:::info

لن يعمل هذا إلا عند تعيين خيار الخدمة/الدالة `userBasedFullPageScreenshot` إلى `true`، راجع أيضًا [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedfullpagescreenshot)

:::

</Option>
## الأجهزة المحمولة والأجهزة

---

### `isHybridApp`

<Option type="boolean" default="false" required="No" contexts="Hybrid App (Webview)">

اضبط هذا على `true` عند اختبار تطبيق هجين (غلاف أصلي يحتوي على عرض ويب مضمَّن واحد أو أكثر). يضبط هذا كيفية تعامل الوحدة مع اقتطاع شريط الحالة وشريط العنوان للشاشات القائمة على عرض الويب، مع الرجوع إلى قيم افتراضية آمنة عندما لا تتوفر بيانات مستطيل الجهاز الأصلية.

</Option>
### `addIOSBezelCorners`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview), Native App">

إضافة زوايا الإطار والنتوء/الجزيرة الديناميكية إلى لقطة الشاشة لأجهزة iOS.

:::info ملاحظة
لا يمكن القيام بذلك إلا عندما **يمكن** تحديد اسم الجهاز تلقائيًا ويتطابق مع القائمة التالية من أسماء الأجهزة الموحَّدة. ستقوم هذه الوحدة بعملية التوحيد.
**iPhone:**

-   iPhone X: `iphonex`
-   iPhone XS: `iphonexs`
-   iPhone XS Max: `iphonexsmax`
-   iPhone XR: `iphonexr`
-   iPhone 11: `iphone11`
-   iPhone 11 Pro: `iphone11pro`
-   iPhone 11 Pro Max: `iphone11promax`
-   iPhone 12: `iphone12`
-   iPhone 12 Mini: `iphone12mini`
-   iPhone 12 Pro: `iphone12pro`
-   iPhone 12 Pro Max: `iphone12promax`
-   iPhone 13: `iphone13`
-   iPhone 13 Mini: `iphone13mini`
-   iPhone 13 Pro: `iphone13pro`
-   iPhone 13 Pro Max: `iphone13promax`
-   iPhone 14: `iphone14`
-   iPhone 14 Plus: `iphone14plus`
-   iPhone 14 Pro: `iphone14pro`
-   iPhone 14 Pro Max: `iphone14promax`
    **iPads:**
-   iPad Mini الجيل السادس: `ipadmini`
-   iPad Air الجيل الرابع: `ipadair`
-   iPad Air الجيل الخامس: `ipadair`
-   iPad Pro (11 بوصة) الجيل الأول: `ipadpro11`
-   iPad Pro (11 بوصة) الجيل الثاني: `ipadpro11`
-   iPad Pro (11 بوصة) الجيل الثالث: `ipadpro11`
-   iPad Pro (12.9 بوصة) الجيل الثالث: `ipadpro129`
-   iPad Pro (12.9 بوصة) الجيل الرابع: `ipadpro129`
-   iPad Pro (12.9 بوصة) الجيل الخامس: `ipadpro129`
:::

</Option>
### `addressBarShadowPadding`

<Option type="number" default="6" required="No" contexts="Web">

الحشوة التي يجب إضافتها إلى شريط العنوان على iOS وAndroid لإجراء اقتطاع صحيح لمنفذ العرض.

</Option>
### `toolBarShadowPadding`

<Option type="number" default={`6 for Android and \`15\` for iOS (\`6\` by default and \`9\` will be added automatically for the possible home bar on iPhones with a notch or iPads that have a home bar)`} required="No" contexts="Web">

الحشوة التي يجب إضافتها إلى شريط الأدوات على iOS وAndroid لإجراء اقتطاع صحيح لمنفذ العرض.

</Option>
## إدارة الملفات والمجلدات

---

### `baselineFolder`

<Option type="string|()=> string" default=".path/to/testfile/__snapshots__/" required="No" contexts="Web, Hybrid App (Webview), Native App">

المجلد الذي سيحتوي على جميع الصور المرجعية المستخدمة أثناء المقارنة. إذا لم يتم تعيينه، فستُستخدم القيمة الافتراضية التي ستخزن الملفات في مجلد `__snapshots__/` بجوار ملف المواصفات الذي ينفذ الاختبارات المرئية. يمكن أيضًا استخدام دالة تُرجع `string` لتعيين قيمة `baselineFolder`:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// أو
{
    baselineFolder: () => {
        // نفّذ بعض السحر هنا
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

</Option>
### `screenshotPath`

<Option type="string | () => string" default=".tmp/" required="no" contexts="Web, Hybrid App (Webview), Native App">

المجلد الذي سيحتوي على جميع لقطات الشاشة الفعلية/المختلفة. إذا لم يتم تعيينه، فستُستخدم القيمة الافتراضية. يمكن أيضًا استخدام دالة
تُرجع سلسلة نصية لتعيين قيمة screenshotPath:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// أو
{
    screenshotPath: () => {
        // نفّذ بعض السحر هنا
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

</Option>
### `clearRuntimeFolder`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview), Native App">

حذف مجلد وقت التشغيل (`actual` و `diff) عند التهيئة

:::info ملاحظة
لن يعمل هذا إلا عند تعيين [`screenshotPath`](#screenshotpath) من خلال خيارات الإضافة، و**لن يعمل** عند تعيين المجلدات في الدوال
:::

</Option>
### `savePerInstance`

<Option type="boolean" default="false" required="no" contexts="Web, Hybrid App (Webview), Native App">

حفظ الصور لكل مثيل في مجلد منفصل، فعلى سبيل المثال سيتم حفظ جميع لقطات شاشة Chrome في مجلد خاص بـ Chrome مثل `desktop_chrome`.

</Option>
### `formatImageName`

<Option type="string" default={`{tag}-{browserName}-{width}x{height}-dpr-{dpr}`} required="No" contexts="Web, Hybrid App (Webview), Native App">

يمكن تخصيص اسم الصور المحفوظة عن طريق تمرير المعامل `formatImageName` مع سلسلة تنسيق مثل:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

يمكن تمرير المتغيرات التالية لتنسيق السلسلة، وستُقرأ تلقائيًا من قدرات المثيل.
إذا تعذر تحديدها، فستُستخدم القيم الافتراضية.

-   `browserName`: اسم المتصفح في القدرات المقدمة
-   `browserVersion`: إصدار المتصفح المقدم في القدرات
-   `deviceName`: اسم الجهاز من القدرات
-   `dpr`: نسبة بكسلات الجهاز
-   `height`: ارتفاع الشاشة
-   `logName`: قيمة logName من القدرات
-   `mobile`: سيضيف هذا `_app` أو اسم المتصفح بعد `deviceName` لتمييز لقطات شاشة التطبيق عن لقطات شاشة المتصفح
-   `platformName`: اسم المنصة في القدرات المقدمة
-   `platformVersion`: إصدار المنصة المقدم في القدرات
-   `tag`: الوسم المقدم في الدوال التي يتم استدعاؤها
-   `width`: عرض الشاشة

:::info

لا يمكنك تقديم مسارات/مجلدات مخصصة في `formatImageName`. إذا كنت تريد تغيير المسار، فيرجى مراجعة تغيير الخيارات التالية:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) لكل دالة

:::

</Option>
## سلوك الصور المرجعية والحفظ

---

### `autoSaveBaseline`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview), Native App">

إذا لم يتم العثور على صورة مرجعية أثناء المقارنة، فسيتم نسخ الصورة تلقائيًا إلى مجلد الصور المرجعية.

</Option>
### `autoElementScroll`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

يتيح لك هذا الخيار تعطيل التمرير التلقائي للعنصر إلى منطقة العرض عند إنشاء لقطة شاشة لعنصر.

</Option>
### `alwaysSaveActualImage`

<Option type="boolean" default="true" required="No" contexts="All">

عند تعيين هذا الخيار إلى `false` فإنه:

- لن يحفظ الصورة الفعلية عندما **لا** يوجد اختلاف
- لن يخزن ملف تقرير JSON عند تعيين `createJsonReportFiles` إلى `true`. كما سيُظهر تحذيرًا في السجلات بأن `createJsonReportFiles` معطَّل

من المفترض أن يؤدي هذا إلى أداء أفضل لأنه لا تتم كتابة أي ملفات إلى النظام، ويضمن عدم وجود الكثير من الضوضاء في مجلد `actual`.

</Option>
## إعداد التقارير

---

### `createJsonReportFiles` **(جديد)**

<Option type="boolean" default="false" required="No">

أصبح لديك الآن خيار تصدير نتائج المقارنة إلى ملف تقرير JSON. من خلال توفير الخيار `createJsonReportFiles: true`، ستُنشئ كل صورة تتم مقارنتها تقريرًا مخزنًا في مجلد `actual`، بجوار كل نتيجة صورة `actual`. ستبدو المخرجات كما يلي:

```json
{
    "parent": "check methods",
    "test": "should fail comparing with a baseline",
    "tag": "examplePageFail",
    "instanceData": {
        "browser": {
            "name": "chrome-headless-shell",
            "version": "126.0.6478.183"
        },
        "platform": {
            "name": "mac",
            "version": "not-known"
        }
    },
    "commandName": "checkScreen",
    "boundingBoxes": {
        "diffBoundingBoxes": [
            {
                "left": 1088,
                "top": 717,
                "right": 1186,
                "bottom": 730
            }
            //....
        ],
        "ignoredBoxes": [
            {
                "left": 159,
                "top": 652,
                "right": 356,
                "bottom": 703
            }
            //...
        ]
    },
    "fileData": {
        "actualFilePath": "/Users/wdio/visual-testing/.tmp/actual/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "baselineFilePath": "/Users/wdio/visual-testing/localBaseline/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "diffFilePath": "/Users/wdio/visual-testing/.tmp/diff/desktop_chrome-headless-shell/examplePageFail-local-chrome-latest-1366x768png",
        "fileName": "examplePageFail-local-chrome-latest-1366x768.png",
        "size": {
            "actual": {
                "height": 768,
                "width": 1366
            },
            "baseline": {
                "height": 768,
                "width": 1366
            },
            "diff": {
                "height": 768,
                "width": 1366
            }
        }
    },
    "misMatchPercentage": "12.90",
    "rawMisMatchPercentage": 12.900729014153246
}
```

عند تنفيذ جميع الاختبارات، سيتم إنشاء ملف JSON جديد يحتوي على مجموعة المقارنات، ويمكن العثور عليه في جذر مجلد `actual` الخاص بك. يتم تجميع البيانات حسب:

-   `describe` لـ Jasmine/Mocha أو `Feature` لـ CucumberJS
-   `it` لـ Jasmine/Mocha أو `Scenario` لـ CucumberJS
    ثم يتم فرزها حسب:
-   `commandName`، وهي أسماء دوال المقارنة المستخدمة لمقارنة الصور
-   `instanceData`، المتصفح أولًا، ثم الجهاز، ثم المنصة
    وستبدو كما يلي

```json
[
    {
        "description": "check methods",
        "data": [
            {
                "test": "should fail comparing with a baseline",
                "data": [
                    {
                        "tag": "examplePageFail",
                        "instanceData": {},
                        "commandName": "checkScreen",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "14.34",
                        "rawMisMatchPercentage": 14.335403703025868
                    },
                    {
                        "tag": "exampleElementFail",
                        "instanceData": {},
                        "commandName": "checkElement",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "1.34",
                        "rawMisMatchPercentage": 1.335403703025868
                    }
                ]
            }
        ]
    }
]
```

ستمنحك بيانات التقرير الفرصة لبناء تقريرك المرئي الخاص دون الحاجة إلى القيام بكل السحر وجمع البيانات بنفسك.

:::info ملاحظة
تحتاج إلى استخدام `@wdio/visual-testing` الإصدار `5.2.0` أو أعلى
:::

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="No" contexts="Web, Hybrid App (Webview), Native App">

مدى التقارب بالبكسل المستخدم لتجميع بكسلات الاختلاف معًا في تقرير JSON الذي يُنشئه [`createJsonReportFiles`](#createjsonreportfiles). القيم الأعلى تجمع المزيد من البكسلات في عدد أقل من المربعات المحيطة؛ والقيم الأقل تنتج مربعات أكثر دقة ولكن بعدد أكبر.

</Option>
## عام

---

### `logLevel`

<Option type="string" default="info" required="No" contexts="Web, Hybrid App (Webview), Native App">

يضيف سجلات إضافية، والخيارات هي `debug | info | warn | silent`

يتم دائمًا تسجيل الأخطاء في وحدة التحكم.

</Option>
## خيارات التنقل بمفتاح Tab

:::info ملاحظة

تدعم هذه الوحدة أيضًا رسم الطريقة التي يستخدم بها المستخدم لوحة المفاتيح للتنقل بمفتاح _tab_ عبر الموقع، وذلك برسم خطوط ونقاط من عنصر قابل للتنقل إلى عنصر آخر قابل للتنقل.<br/>
هذا العمل مستوحى من منشور مدونة [Viv Richards](https://github.com/vivrichards600) حول ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
تعتمد طريقة تحديد العناصر القابلة للتنقل على الوحدة [tabbable](https://github.com/davidtheclark/tabbable). إذا كانت هناك أي مشكلات تتعلق بالتنقل، فيرجى مراجعة [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) وخاصة [قسم المزيد من التفاصيل](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

الخيارات التي يمكن تغييرها للخطوط والنقاط إذا كنت تستخدم دوال `{save|check}Tabbable`. الخيارات موضحة أدناه.

</Option>
#### `tabbableOptions.circle`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

خيارات تغيير الدائرة.

</Option>
##### `tabbableOptions.circle.backgroundColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

لون خلفية الدائرة.

</Option>
##### `tabbableOptions.circle.borderColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

لون حد الدائرة.

</Option>
##### `tabbableOptions.circle.borderWidth`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

عرض حد الدائرة.

</Option>
##### `tabbableOptions.circle.fontColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

لون خط النص داخل الدائرة. لن يظهر هذا إلا إذا تم تعيين [`showNumber`](./#tabbableoptionscircleshownumber) إلى `true`.

</Option>
##### `tabbableOptions.circle.fontFamily`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

عائلة خط النص داخل الدائرة. لن يظهر هذا إلا إذا تم تعيين [`showNumber`](./#tabbableoptionscircleshownumber) إلى `true`.

تأكد من تعيين خطوط تدعمها المتصفحات.

</Option>
##### `tabbableOptions.circle.fontSize`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

حجم خط النص داخل الدائرة. لن يظهر هذا إلا إذا تم تعيين [`showNumber`](./#tabbableoptionscircleshownumber) إلى `true`.

</Option>
##### `tabbableOptions.circle.size`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

حجم الدائرة.

</Option>
##### `tabbableOptions.circle.showNumber`

<Option type="showNumber" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

إظهار رقم تسلسل التنقل داخل الدائرة.

</Option>
#### `tabbableOptions.line`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

خيارات تغيير الخط.

</Option>
##### `tabbableOptions.line.color`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

لون الخط.

</Option>
##### `tabbableOptions.line.width`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

عرض الخط.

</Option>
## خيارات المقارنة

### `compareOptions`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) for all default values" required="No" contexts="Web, Hybrid App (Webview), Native App (See [Method Compare options](./method-options#compare-check-options) for more information)">

يمكن أيضًا تعيين خيارات المقارنة كخيارات للخدمة، وهي موضحة في [خيارات المقارنة للدوال](/docs/visual-testing/method-options#compare-check-options)

</Option>