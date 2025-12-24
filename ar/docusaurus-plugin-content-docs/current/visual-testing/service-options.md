---
id: service-options
title: خيارات الخدمة
---

خيارات الخدمة هي الخيارات التي يمكن تعيينها عند تهيئة الخدمة وستستخدم لكل استدعاء طريقة.

```js
// wdio.conf.(js|ts)
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // The options
            },
        ],
    ],
    // ...
};
```

## الخيارات الافتراضية

### `addressBarShadowPadding`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `6`
-   **سياقات التطبيق المدعومة:** ويب

الحشوة التي تحتاج إلى إضافتها إلى شريط العنوان على iOS وAndroid للقيام باقتطاع مناسب لمنفذ العرض.

### `autoElementScroll`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `true`
-   **سياقات التطبيق المدعومة:** ويب، تطبيق هجين (العرض الويب)

هذا الخيار يسمح لك بتعطيل التمرير التلقائي للعنصر إلى العرض عند إنشاء لقطة شاشة للعنصر.

### `addIOSBezelCorners`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `false`
-   **سياقات التطبيق المدعومة:** ويب، تطبيق هجين (العرض الويب)، تطبيق أصلي

إضافة زوايا إطار وشق/جزيرة ديناميكية إلى لقطة الشاشة لأجهزة iOS.

:::info ملاحظة
يمكن القيام بذلك فقط عندما **يمكن** تحديد اسم الجهاز تلقائيًا ويتطابق مع القائمة التالية من أسماء الأجهزة المعيارية. سيتم التطبيع بواسطة هذه الوحدة.
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
-   iPad Mini 6th Generation: `ipadmini`
-   iPad Air 4th Generation: `ipadair`
-   iPad Air 5th Generation: `ipadair`
-   iPad Pro (11-inch) 1st Generation: `ipadpro11`
-   iPad Pro (11-inch) 2nd Generation: `ipadpro11`
-   iPad Pro (11-inch) 3rd Generation: `ipadpro11`
-   iPad Pro (12.9-inch) 3rd Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 4th Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 5th Generation: `ipadpro129`
:::

### `autoSaveBaseline`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `true`
-   **سياقات التطبيق المدعومة:** ويب، تطبيق هجين (العرض الويب)، تطبيق أصلي

إذا لم يتم العثور على صورة أساسية خلال المقارنة، يتم نسخ الصورة تلقائيًا إلى مجلد الخط الأساسي.

### `alwaysSaveActualImage`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `true`
-   **سياقات التطبيق المدعومة:** الكل

عند تعيين هذا الخيار على `false` سيؤدي إلى:

- عدم حفظ الصورة الفعلية عندما لا يكون هناك فرق
- عدم تخزين ملف تقرير JSON عندما يتم تعيين `createJsonReportFiles` إلى `true`. سيظهر أيضًا تحذير في السجلات بأن `createJsonReportFiles` معطل

يجب أن يؤدي ذلك إلى أداء أفضل لأنه لا توجد ملفات تكتب إلى النظام ويجب أن يضمن عدم وجود الكثير من الضوضاء في مجلد `actual`.

### `baselineFolder`

-   **النوع:** `string|()=> string`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `.path/to/testfile/__snapshots__/`
-   **سياقات التطبيق المدعومة:** ويب، تطبيق هجين (العرض الويب)، تطبيق أصلي

الدليل الذي سيحتوي على جميع الصور الأساسية التي تستخدم أثناء المقارنة. إذا لم يتم تعيينه، سيتم استخدام القيمة الافتراضية التي ستخزن الملفات في مجلد `__snapshots__/` بجوار الملف الذي ينفذ اختبارات المرئية. يمكن أيضًا استخدام دالة تعيد `string` لتعيين قيمة `baselineFolder`:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// أو
{
    baselineFolder: () => {
        // افعل بعض السحر هنا
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `false`
-   **سياقات التطبيق المدعومة:** ويب، تطبيق هجين (العرض الويب)، تطبيق أصلي

حذف مجلد وقت التشغيل (`actual` و`diff`) عند التهيئة

:::info ملاحظة
سيعمل هذا فقط عندما يتم تعيين [`screenshotPath`](#screenshotpath) من خلال خيارات البرنامج المساعد، و**لن يعمل** عندما تقوم بتعيين المجلدات في الطرق
:::

### `createJsonReportFiles` **(جديد)**

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `false`

لديك الآن خيار تصدير نتائج المقارنة إلى ملف تقرير JSON. من خلال توفير الخيار `createJsonReportFiles: true`، ستنشئ كل صورة يتم مقارنتها تقريرًا مخزنًا في مجلد `actual`، بجوار كل نتيجة صورة `actual`. سيبدو الإخراج كما يلي:

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

عند تنفيذ جميع الاختبارات، سيتم إنشاء ملف JSON جديد مع مجموعة المقارنات ويمكن العثور عليه في جذر مجلد `actual`. يتم تجميع البيانات حسب:

-   `describe` لـ Jasmine/Mocha أو `Feature` لـ CucumberJS
-   `it` لـ Jasmine/Mocha أو `Scenario` لـ CucumberJS
    ثم يتم فرزها حسب:
-   `commandName`، وهي أسماء طريقة المقارنة المستخدمة لمقارنة الصور
-   `instanceData`، المتصفح أولاً، ثم الجهاز، ثم المنصة
    سيبدو كما يلي

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

ستتيح لك بيانات التقرير فرصة بناء تقريرك المرئي الخاص بدون القيام بكل السحر وجمع البيانات بنفسك.

:::info ملاحظة
تحتاج إلى استخدام `@wdio/visual-testing` الإصدار `5.2.0` أو أعلى
:::

### `disableBlinkingCursor`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `false`
-   **سياقات التطبيق المدعومة:** ويب، تطبيق هجين (العرض الويب)

تمكين/تعطيل جميع وميض المؤشر في `input`, `textarea`, `[contenteditable]` في التطبيق. إذا تم تعيينه على `true`، سيتم تعيين المؤشر إلى `transparent` قبل التقاط لقطة شاشة وإعادة تعيينه عند الانتهاء

### `disableCSSAnimation`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `false`
-   **سياقات التطبيق المدعومة:** ويب، تطبيق هجين (العرض الويب)

تمكين/تعطيل جميع رسوم CSS المتحركة في التطبيق. إذا تم تعيينه على `true`، سيتم تعطيل جميع الرسوم المتحركة قبل التقاط لقطة شاشة وإعادة تعيينها عند الانتهاء

### `enableLayoutTesting`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `false`
-   **سياقات التطبيق المدعومة:** ويب

هذا سيخفي جميع النصوص في الصفحة بحيث يتم استخدام التخطيط فقط للمقارنة. سيتم إخفاء النصوص عن طريق إضافة النمط `'color': 'transparent !important'` إلى **كل** عنصر.

لمشاهدة الإخراج، انظر [مخرجات الاختبار](/docs/visual-testing/test-output#enablelayouttesting)

:::info
باستخدام هذه العلامة، سيحصل كل عنصر يحتوي على نص (ليس فقط `p, h1, h2, h3, h4, h5, h6, span, a, li`، ولكن أيضًا `div|button|..`) على هذه الخاصية. لا يوجد خيار لتخصيص هذا.
:::

### `formatImageName`

-   **النوع:** `string`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **سياقات التطبيق المدعومة:** ويب، تطبيق هجين (العرض الويب)، تطبيق أصلي

يمكن تخصيص اسم الصور المحفوظة عن طريق تمرير المعلمة `formatImageName` مع سلسلة تنسيق مثل:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

يمكن تمرير المتغيرات التالية لتنسيق السلسلة وسيتم قراءتها تلقائيًا من قدرات المثيل.
إذا لم يمكن تحديدها، سيتم استخدام القيم الافتراضية.

-   `browserName`: اسم المتصفح في القدرات المقدمة
-   `browserVersion`: إصدار المتصفح المقدم في القدرات
-   `deviceName`: اسم الجهاز من القدرات
-   `dpr`: نسبة بكسل الجهاز
-   `height`: ارتفاع الشاشة
-   `logName`: اسم السجل من القدرات
-   `mobile`: سيضيف هذا `_app`، أو اسم المتصفح بعد `deviceName` للتمييز بين لقطات شاشة التطبيق ولقطات شاشة المتصفح
-   `platformName`: اسم المنصة في القدرات المقدمة
-   `platformVersion`: إصدار المنصة المقدم في القدرات
-   `tag`: العلامة المقدمة في الطرق التي يتم استدعاؤها
-   `width`: عرض الشاشة

:::info

لا يمكنك توفير مسارات/مجلدات مخصصة في `formatImageName`. إذا كنت ترغب في تغيير المسار، فيرجى التحقق من تغيير الخيارات التالية:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) لكل طريقة

:::

### `fullPageScrollTimeout`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `1500`
-   **سياقات التطبيق المدعومة:** ويب

المهلة بالميلي ثانية للانتظار بعد التمرير. قد يساعد هذا في تحديد الصفحات ذات التحميل الكسول.

:::info

سيعمل هذا فقط عندما يتم تعيين خيار الخدمة/الطريقة `userBasedFullPageScreenshot` إلى `true`، انظر أيضًا [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `true`
-   **سياقات التطبيق المدعومة:** ويب، تطبيق هجين (العرض الويب)

إخفاء أشرطة التمرير في التطبيق. إذا تم تعيينه على true، سيتم تعطيل جميع أشرطة التمرير قبل التقاط لقطة شاشة. يتم تعيين هذا على `true` افتراضيًا لمنع المشكلات الإضافية.

### `logLevel`

-   **النوع:** `string`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `info`
-   **سياقات التطبيق المدعومة:** ويب، تطبيق هجين (العرض الويب)، تطبيق أصلي

يضيف سجلات إضافية، الخيارات هي `debug | info | warn | silent`

يتم دائمًا تسجيل الأخطاء في وحدة التحكم.

### `savePerInstance`

-   **النوع:** `boolean`
-   **القيمة الافتراضية:** `false`
-   **إلزامي:** لا
-   **سياقات التطبيق المدعومة:** ويب، تطبيق هجين (العرض الويب)، تطبيق أصلي

حفظ الصور لكل مثيل في مجلد منفصل، على سبيل المثال، سيتم حفظ جميع لقطات شاشة Chrome في مجلد Chrome مثل `desktop_chrome`.

### `screenshotPath`

-   **النوع:** `string | () => string`
-   **القيمة الافتراضية:** `.tmp/`
-   **إلزامي:** لا
-   **سياقات التطبيق المدعومة:** ويب، تطبيق هجين (العرض الويب)، تطبيق أصلي

الدليل الذي سيحتفظ بجميع لقطات الشاشة الفعلية/المختلفة. إذا لم يتم تعيينه، سيتم استخدام القيمة الافتراضية. يمكن أيضًا استخدام دالة تعيد سلسلة لتعيين قيمة screenshotPath:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// أو
{
    screenshotPath: () => {
        // افعل بعض السحر هنا
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `6` لـ Android و `15` لـ iOS (`6` افتراضيًا و `9` سيتم إضافتها تلقائيًا للشريط الرئيسي المحتمل على أجهزة iPhone ذات النتوء أو أجهزة iPad التي تحتوي على شريط رئيسي)
-   **سياقات التطبيق المدعومة:** ويب

الحشوة التي تحتاج إلى إضافتها إلى شريط الأدوات على iOS وAndroid للقيام باقتطاع مناسب لمنفذ العرض.

### `userBasedFullPageScreenshot`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `false`
-   **سياقات التطبيق المدعومة:** ويب، تطبيق هجين (العرض الويب) **تم تقديمه في visual-service@7.0.0**

بشكل افتراضي، يتم التقاط لقطات شاشة للصفحة الكاملة على الويب المكتبي باستخدام بروتوكول WebDriver BiDi، مما يتيح لقطات شاشة سريعة ومستقرة ومتسقة دون تمرير.
عند تعيين userBasedFullPageScreenshot إلى true، تحاكي عملية لقطة الشاشة مستخدمًا حقيقيًا: التمرير عبر الصفحة والتقاط لقطات شاشة بحجم منفذ العرض وتجميعها معًا. هذه الطريقة مفيدة للصفحات ذات المحتوى المحمّل بكسل أو العرض الديناميكي الذي يعتمد على موضع التمرير.

استخدم هذا الخيار إذا كانت صفحتك تعتمد على تحميل المحتوى أثناء التمرير أو إذا كنت ترغب في الحفاظ على سلوك طرق لقطة الشاشة القديمة.

### `waitForFontsLoaded`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `true`
-   **سياقات التطبيق المدعومة:** ويب، تطبيق هجين (العرض الويب)

يمكن تحميل الخطوط، بما في ذلك خطوط الطرف الثالث، بشكل متزامن أو غير متزامن. يعني التحميل غير المتزامن أن الخطوط قد تُحمّل بعد أن تحدد WebdriverIO أن الصفحة قد تم تحميلها بالكامل. لمنع مشاكل عرض الخطوط، ستنتظر هذه الوحدة، بشكل افتراضي، تحميل جميع الخطوط قبل التقاط لقطة شاشة.

## خيارات التنقل بالتاب

:::info ملاحظة

تدعم هذه الوحدة أيضًا رسم الطريقة التي يستخدمها المستخدم لوحة المفاتيح للتنقل بمفتاح _tab_ عبر الموقع عن طريق رسم خطوط ونقاط من عنصر يمكن التنقل إليه بالتاب إلى آخر.<br/>
العمل مستوحى من منشور [Viv Richards](https://github.com/vivrichards600) على المدونة حول ["أتمتة قابلية التنقل بالتاب في الصفحة (هل هذه كلمة؟) باستخدام الاختبار المرئي"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
تستند طريقة اختيار العناصر القابلة للتنقل بالتاب على وحدة [tabbable](https://github.com/davidtheclark/tabbable). إذا كانت هناك أي مشاكل تتعلق بالتنقل بالتاب، يرجى التحقق من [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) وخاصة [قسم المزيد من التفاصيل](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

-   **النوع:** `object`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** انظر [هنا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) لجميع القيم الافتراضية
-   **سياقات التطبيق المدعومة:** ويب

الخيارات التي يمكن تغييرها للخطوط والنقاط إذا كنت تستخدم طرق `{save|check}Tabbable`. الخيارات موضحة أدناه.

#### `tabbableOptions.circle`

-   **النوع:** `object`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** انظر [هنا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) لجميع القيم الافتراضية
-   **سياقات التطبيق المدعومة:** ويب

خيارات تغيير الدائرة.

##### `tabbableOptions.circle.backgroundColor`

-   **النوع:** `string`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** انظر [هنا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) لجميع القيم الافتراضية
-   **سياقات التطبيق المدعومة:** ويب

لون خلفية الدائرة.

##### `tabbableOptions.circle.borderColor`

-   **النوع:** `string`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** انظر [هنا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) لجميع القيم الافتراضية
-   **سياقات التطبيق المدعومة:** ويب

لون حدود الدائرة.

##### `tabbableOptions.circle.borderWidth`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** انظر [هنا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) لجميع القيم الافتراضية
-   **سياقات التطبيق المدعومة:** ويب

عرض حدود الدائرة.

##### `tabbableOptions.circle.fontColor`

-   **النوع:** `string`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** انظر [هنا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) لجميع القيم الافتراضية
-   **سياقات التطبيق المدعومة:** ويب

لون خط النص في الدائرة. سيظهر هذا فقط إذا تم تعيين [`showNumber`](./#tabbableoptionscircleshownumber) إلى `true`.

##### `tabbableOptions.circle.fontFamily`

-   **النوع:** `string`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** انظر [هنا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) لجميع القيم الافتراضية
-   **سياقات التطبيق المدعومة:** ويب

عائلة خط النص في الدائرة. سيظهر هذا فقط إذا تم تعيين [`showNumber`](./#tabbableoptionscircleshownumber) إلى `true`.

تأكد من تعيين الخطوط المدعومة من قبل المتصفحات.

##### `tabbableOptions.circle.fontSize`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** انظر [هنا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) لجميع القيم الافتراضية
-   **سياقات التطبيق المدعومة:** ويب

حجم خط النص في الدائرة. سيظهر هذا فقط إذا تم تعيين [`showNumber`](./#tabbableoptionscircleshownumber) إلى `true`.

##### `tabbableOptions.circle.size`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** انظر [هنا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) لجميع القيم الافتراضية
-   **سياقات التطبيق المدعومة:** ويب

حجم الدائرة.

##### `tabbableOptions.circle.showNumber`

-   **النوع:** `showNumber`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** انظر [هنا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) لجميع القيم الافتراضية
-   **سياقات التطبيق المدعومة:** ويب

إظهار رقم تسلسل التاب في الدائرة.

#### `tabbableOptions.line`

-   **النوع:** `object`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** انظر [هنا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) لجميع القيم الافتراضية
-   **سياقات التطبيق المدعومة:** ويب

خيارات تغيير الخط.

##### `tabbableOptions.line.color`

-   **النوع:** `string`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** انظر [هنا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) لجميع القيم الافتراضية
-   **سياقات التطبيق المدعومة:** ويب

لون الخط.

##### `tabbableOptions.line.width`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** انظر [هنا](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) لجميع القيم الافتراضية
-   **سياقات التطبيق المدعومة:** ويب

عرض الخط.

## خيارات المقارنة

### `compareOptions`

-   **النوع:** `object`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** انظر [هنا](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) لجميع القيم الافتراضية
-   **سياقات التطبيق المدعومة:** ويب، تطبيق هجين (العرض الويب)، تطبيق أصلي (انظر [خيارات مقارنة الطريقة](./method-options#compare-check-options) لمزيد من المعلومات)

يمكن أيضًا تعيين خيارات المقارنة كخيارات خدمة، وهي موضحة في [خيارات مقارنة الطريقة](/docs/visual-testing/method-options#compare-check-options)