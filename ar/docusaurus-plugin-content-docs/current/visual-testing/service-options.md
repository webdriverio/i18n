---
id: service-options
title: خيارات الخدمة
---

خيارات الخدمة هي الخيارات التي يمكن تعيينها عند إنشاء الخدمة وستستخدم لكل استدعاء للطريقة.

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
-   **الافتراضي:** `6`
-   **مدعوم:** ويب

الحشوة التي يجب إضافتها إلى شريط العنوان على iOS و Android للقيام بقطع مناسب لمنطقة العرض.

### `autoElementScroll`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **الافتراضي:** `true`
-   **مدعوم:** ويب، تطبيق هجين (واجهة ويب)

هذا الخيار يسمح لك بتعطيل التمرير التلقائي للعنصر في العرض عند إنشاء لقطة شاشة للعنصر.

### `addIOSBezelCorners`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **الافتراضي:** `false`
-   **مدعوم:** ويب، تطبيق هجين (واجهة ويب)، تطبيق أصلي

إضافة زوايا الإطار وشق/جزيرة ديناميكية إلى لقطة الشاشة لأجهزة iOS.

:::info ملاحظة
يمكن القيام بذلك فقط عندما **يمكن** تحديد اسم الجهاز تلقائيًا ويتطابق مع قائمة أسماء الأجهزة المعيارية التالية. سيتم التطبيع من قبل هذه الوحدة.
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
-   **الافتراضي:** `true`
-   **مدعوم:** ويب، تطبيق هجين (واجهة ويب)، تطبيق أصلي

إذا لم يتم العثور على صورة أساسية أثناء المقارنة، يتم نسخ الصورة تلقائيًا إلى مجلد الخط الأساسي.

### `baselineFolder`

-   **النوع:** `string|()=> string`
-   **إلزامي:** لا
-   **الافتراضي:** `.path/to/testfile/__snapshots__/`
-   **مدعوم:** ويب، تطبيق هجين (واجهة ويب)، تطبيق أصلي

الدليل الذي سيحتوي على جميع صور الخط الأساسي التي تستخدم أثناء المقارنة. إذا لم يتم التعيين، سيتم استخدام القيمة الافتراضية التي ستخزن الملفات في مجلد `__snapshots__/` بجانب الاختبار الذي ينفذ اختبارات بصرية. يمكن أيضًا استخدام دالة تعيد `string` لتعيين قيمة `baselineFolder`:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// أو
{
    baselineFolder: () => {
        // قم ببعض السحر هنا
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **الافتراضي:** `false`
-   **مدعوم:** ويب، تطبيق هجين (واجهة ويب)، تطبيق أصلي

حذف مجلد وقت التشغيل (`actual` و `diff`) عند التهيئة

:::info ملاحظة
هذا سيعمل فقط عندما يتم تعيين [`screenshotPath`](#screenshotpath) من خلال خيارات البرنامج المساعد، و **لن يعمل** عندما تقوم بتعيين المجلدات في الطرق
:::

### `createJsonReportFiles` **(جديد)**

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **الافتراضي:** `false`

لديك الآن خيار تصدير نتائج المقارنة إلى ملف تقرير JSON. من خلال توفير الخيار `createJsonReportFiles: true`، ستنشئ كل صورة يتم مقارنتها تقريرًا مخزنًا في مجلد `actual`، بجانب كل نتيجة صورة `actual`. سيبدو الناتج كما يلي:

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

عند تنفيذ جميع الاختبارات، سيتم إنشاء ملف JSON جديد يحتوي على مجموعة المقارنات ويمكن العثور عليه في جذر مجلد `actual` الخاص بك. يتم تجميع البيانات حسب:

-   `describe` لـ Jasmine/Mocha أو `Feature` لـ CucumberJS
-   `it` لـ Jasmine/Mocha أو `Scenario` لـ CucumberJS
    ثم يتم ترتيبها حسب:
-   `commandName`، وهي أسماء طرق المقارنة المستخدمة لمقارنة الصور
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

ستوفر لك بيانات التقرير الفرصة لبناء تقريرك البصري الخاص دون القيام بكل السحر وجمع البيانات بنفسك.

:::info ملاحظة
تحتاج إلى استخدام `@wdio/visual-testing` الإصدار `5.2.0` أو أعلى
:::

### `disableBlinkingCursor`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **الافتراضي:** `false`
-   **مدعوم:** ويب، تطبيق هجين (واجهة ويب)

تمكين/تعطيل جميع "وميض" المؤشر في `input` و `textarea` و `[contenteditable]` في التطبيق. إذا تم تعيينه على `true`، سيتم تعيين المؤشر على `transparent` قبل التقاط لقطة شاشة
وإعادة تعيينه عند الانتهاء

### `disableCSSAnimation`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **الافتراضي:** `false`
-   **مدعوم:** ويب، تطبيق هجين (واجهة ويب)

تمكين/تعطيل جميع رسوم CSS المتحركة في التطبيق. إذا تم تعيينه على `true`، سيتم تعطيل جميع الرسوم المتحركة قبل التقاط لقطة شاشة
وإعادة تعيينها عند الانتهاء

### `enableLayoutTesting`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **الافتراضي:** `false`
-   **مدعوم:** ويب

سيؤدي هذا إلى إخفاء كل النص في الصفحة بحيث يتم استخدام التخطيط فقط للمقارنة. سيتم الإخفاء عن طريق إضافة النمط `'color': 'transparent !important'` إلى **كل** عنصر.

للحصول على المخرجات، انظر [مخرجات الاختبار](/docs/visual-testing/test-output#enablelayouttesting)

:::info
باستخدام هذه العلامة، سيحصل كل عنصر يحتوي على نص (وليس فقط `p, h1, h2, h3, h4, h5, h6, span, a, li`، ولكن أيضًا `div|button|..`) على هذه الخاصية. لا يوجد خيار **لتخصيص** هذا.
:::

### `formatImageName`

-   **النوع:** `string`
-   **إلزامي:** لا
-   **الافتراضي:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **مدعوم:** ويب، تطبيق هجين (واجهة ويب)، تطبيق أصلي

يمكن تخصيص اسم الصور المحفوظة عن طريق تمرير المعلمة `formatImageName` مع سلسلة تنسيق مثل:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

يمكن تمرير المتغيرات التالية لتنسيق السلسلة وسيتم قراءتها تلقائيًا من قدرات المثيل.
إذا لم يكن من الممكن تحديدها، سيتم استخدام القيم الافتراضية.

-   `browserName`: اسم المتصفح في القدرات المقدمة
-   `browserVersion`: إصدار المتصفح المقدم في القدرات
-   `deviceName`: اسم الجهاز من القدرات
-   `dpr`: نسبة بكسل الجهاز
-   `height`: ارتفاع الشاشة
-   `logName`: اسم السجل من القدرات
-   `mobile`: سيضيف هذا `_app`، أو اسم المتصفح بعد `deviceName` للتمييز بين لقطات شاشة التطبيق ولقطات شاشة المتصفح
-   `platformName`: اسم المنصة في القدرات المقدمة
-   `platformVersion`: إصدار المنصة المقدم في القدرات
-   `tag`: العلامة التي يتم توفيرها في الطرق التي يتم استدعاؤها
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
-   **الافتراضي:** `1500`
-   **مدعوم:** ويب

المهلة بالميلي ثانية للانتظار بعد التمرير. قد يساعد هذا في تحديد الصفحات ذات التحميل البطيء.

:::info

هذا سيعمل فقط عندما يتم تعيين خيار الخدمة/الطريقة `userBasedFullPageScreenshot` على `true`، انظر أيضًا [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **الافتراضي:** `true`
-   **مدعوم:** ويب، تطبيق هجين (واجهة ويب)

إخفاء أشرطة التمرير في التطبيق. إذا تم تعيينه على true، سيتم تعطيل جميع أشرطة التمرير قبل التقاط لقطة شاشة. هذا معين افتراضيًا على `true` لمنع مشاكل إضافية.

### `logLevel`

-   **النوع:** `string`
-   **إلزامي:** لا
-   **الافتراضي:** `info`
-   **مدعوم:** ويب، تطبيق هجين (واجهة ويب)، تطبيق أصلي

يضيف سجلات إضافية، الخيارات هي `debug | info | warn | silent`

يتم دائمًا تسجيل الأخطاء في وحدة التحكم.

### `savePerInstance`

-   **النوع:** `boolean`
-   **الافتراضي:** `false`
-   **إلزامي:** لا
-   **مدعوم:** ويب، تطبيق هجين (واجهة ويب)، تطبيق أصلي

حفظ الصور لكل مثيل في مجلد منفصل، على سبيل المثال، سيتم حفظ جميع لقطات شاشة Chrome في مجلد Chrome مثل `desktop_chrome`.

### `screenshotPath`

-   **النوع:** `string | () => string`
-   **الافتراضي:** `.tmp/`
-   **إلزامي:** لا
-   **مدعوم:** ويب، تطبيق هجين (واجهة ويب)، تطبيق أصلي

الدليل الذي سيحتوي على جميع لقطات الشاشة الفعلية/المختلفة. إذا لم يتم تعيين، سيتم استخدام القيمة الافتراضية. يمكن أيضًا استخدام دالة
تعيد سلسلة لتعيين قيمة screenshotPath:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// أو
{
    screenshotPath: () => {
        // قم ببعض السحر هنا
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **الافتراضي:** `6` لـ Android و `15` لـ iOS (`6` افتراضيًا و `9` سيتم إضافتها تلقائيًا للشريط الرئيسي المحتمل على أجهزة iPhone ذات شق أو أجهزة iPad التي تحتوي على شريط رئيسي)
-   **مدعوم:** ويب

الحشوة التي يجب إضافتها إلى شريط الأدوات على iOS و Android للقيام بقطع مناسب لمنطقة العرض.

### `userBasedFullPageScreenshot`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **الافتراضي:** `false`
-   **مدعوم:** ويب، تطبيق هجين (واجهة ويب) **تم تقديمه في visual-service@7.0.0**

بشكل افتراضي، يتم التقاط لقطات الشاشة للصفحة الكاملة على سطح المكتب باستخدام بروتوكول WebDriver BiDi، مما يتيح لقطات شاشة سريعة ومستقرة ومتسقة دون تمرير.
عندما يتم تعيين userBasedFullPageScreenshot على true، تقوم عملية لقطة الشاشة بمحاكاة مستخدم حقيقي: التمرير عبر الصفحة، والتقاط لقطات شاشة بحجم نافذة العرض، وتجميعها معًا. هذه الطريقة مفيدة للصفحات ذات المحتوى الذي يتم تحميله بشكل متأخر أو العرض الديناميكي الذي يعتمد على موضع التمرير.

استخدم هذا الخيار إذا كانت صفحتك تعتمد على تحميل المحتوى أثناء التمرير أو إذا كنت ترغب في الحفاظ على سلوك طرق لقطة الشاشة القديمة.

### `waitForFontsLoaded`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **الافتراضي:** `true`
-   **مدعوم:** ويب، تطبيق هجين (واجهة ويب)

يمكن تحميل الخطوط، بما في ذلك خطوط الطرف الثالث، بشكل متزامن أو غير متزامن. يعني التحميل غير المتزامن أنه قد يتم تحميل الخطوط بعد أن يحدد WebdriverIO أن الصفحة قد تم تحميلها بالكامل. لمنع مشاكل عرض الخط، ستنتظر هذه الوحدة، بشكل افتراضي، تحميل جميع الخطوط قبل التقاط لقطة شاشة.

## خيارات Tabbable

:::info ملاحظة

تدعم هذه الوحدة أيضًا رسم الطريقة التي سيستخدم بها المستخدم لوحة المفاتيح للتنقل _باستخدام مفتاح التبويب_ عبر موقع الويب من خلال رسم خطوط ونقاط من عنصر قابل للتبويب إلى آخر.<br/>
العمل مستوحى من منشور مدونة [Viv Richards](https://github.com/vivrichards600) حول ["أتمتة قابلية تبويب الصفحة (هل هذه كلمة؟) باستخدام الاختبار البصري"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
تستند طريقة اختيار العناصر القابلة للتبويب على وحدة [tabbable](https://github.com/davidtheclark/tabbable). إذا كانت هناك أي مشكلات تتعلق بالتبويب، يرجى التحقق من [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) وخاصة [قسم المزيد من التفاصيل](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

-   **النوع:** `object`
-   **إلزامي:** لا
-   **الافتراضي:** راجع [هنا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) لجميع القيم الافتراضية
-   **مدعوم:** ويب

الخيارات التي يمكن تغييرها للخطوط والنقاط إذا كنت تستخدم طرق `{save|check}Tabbable`. الخيارات موضحة أدناه.

#### `tabbableOptions.circle`

-   **النوع:** `object`
-   **إلزامي:** لا
-   **الافتراضي:** راجع [هنا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) لجميع القيم الافتراضية
-   **مدعوم:** ويب

الخيارات لتغيير الدائرة.

##### `tabbableOptions.circle.backgroundColor`

-   **النوع:** `string`
-   **إلزامي:** لا
-   **الافتراضي:** راجع [هنا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) لجميع القيم الافتراضية
-   **مدعوم:** ويب

لون خلفية الدائرة.

##### `tabbableOptions.circle.borderColor`

-   **النوع:** `string`
-   **إلزامي:** لا
-   **الافتراضي:** راجع [هنا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) لجميع القيم الافتراضية
-   **مدعوم:** ويب

لون حدود الدائرة.

##### `tabbableOptions.circle.borderWidth`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **الافتراضي:** راجع [هنا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) لجميع القيم الافتراضية
-   **مدعوم:** ويب

عرض حدود الدائرة.

##### `tabbableOptions.circle.fontColor`

-   **النوع:** `string`
-   **إلزامي:** لا
-   **الافتراضي:** راجع [هنا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) لجميع القيم الافتراضية
-   **مدعوم:** ويب

لون خط النص في الدائرة. سيظهر هذا فقط إذا تم تعيين [`showNumber`](./#tabbableoptionscircleshownumber) على `true`.

##### `tabbableOptions.circle.fontFamily`

-   **النوع:** `string`
-   **إلزامي:** لا
-   **الافتراضي:** راجع [هنا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) لجميع القيم الافتراضية
-   **مدعوم:** ويب

عائلة خط النص في الدائرة. سيظهر هذا فقط إذا تم تعيين [`showNumber`](./#tabbableoptionscircleshownumber) على `true`.

تأكد من تعيين الخطوط التي تدعمها المتصفحات.

##### `tabbableOptions.circle.fontSize`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **الافتراضي:** راجع [هنا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) لجميع القيم الافتراضية
-   **مدعوم:** ويب

حجم خط النص في الدائرة. سيظهر هذا فقط إذا تم تعيين [`showNumber`](./#tabbableoptionscircleshownumber) على `true`.

##### `tabbableOptions.circle.size`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **الافتراضي:** راجع [هنا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) لجميع القيم الافتراضية
-   **مدعوم:** ويب

حجم الدائرة.

##### `tabbableOptions.circle.showNumber`

-   **النوع:** `showNumber`
-   **إلزامي:** لا
-   **الافتراضي:** راجع [هنا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) لجميع القيم الافتراضية
-   **مدعوم:** ويب

إظهار رقم تسلسل التبويب في الدائرة.

#### `tabbableOptions.line`

-   **النوع:** `object`
-   **إلزامي:** لا
-   **الافتراضي:** راجع [هنا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) لجميع القيم الافتراضية
-   **مدعوم:** ويب

الخيارات لتغيير الخط.

##### `tabbableOptions.line.color`

-   **النوع:** `string`
-   **إلزامي:** لا
-   **الافتراضي:** راجع [هنا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) لجميع القيم الافتراضية
-   **مدعوم:** ويب

لون الخط.

##### `tabbableOptions.line.width`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **الافتراضي:** راجع [هنا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) لجميع القيم الافتراضية
-   **مدعوم:** ويب

عرض الخط.

## خيارات المقارنة

### `compareOptions`

-   **النوع:** `object`
-   **إلزامي:** لا
-   **الافتراضي:** راجع [هنا](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) لجميع القيم الافتراضية
-   **مدعوم:** ويب، تطبيق هجين (واجهة ويب)، تطبيق أصلي (انظر [خيارات مقارنة الطريقة](./method-options#compare-check-options) لمزيد من المعلومات)

يمكن أيضًا تعيين خيارات المقارنة كخيارات خدمة، وهي موصوفة في [خيارات مقارنة الطريقة](/docs/visual-testing/method-options#compare-check-options)