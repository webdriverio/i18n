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
-   **القيمة الافتراضية:** `6`
-   **مدعوم:** الويب

الحشوة التي يجب إضافتها إلى شريط العناوين على iOS و Android لإجراء قطع مناسب للعرض.

### `autoElementScroll`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `true`
-   **مدعوم:** الويب، تطبيق هجين (Webview)

يتيح لك هذا الخيار تعطيل التمرير التلقائي للعنصر في العرض عند إنشاء لقطة للعنصر.

### `addIOSBezelCorners`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `false`
-   **مدعوم:** الويب، تطبيق هجين (Webview)، تطبيق أصلي

إضافة حواف الإطار والنوتش/الجزيرة الديناميكية إلى لقطة الشاشة لأجهزة iOS.

:::info ملاحظة
يمكن القيام بذلك فقط عندما **يمكن** تحديد اسم الجهاز تلقائيًا ويطابق قائمة أسماء الأجهزة المُعيارية التالية. سيتم التطبيع بواسطة هذه الوحدة.
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
-   **مدعوم:** الويب، تطبيق هجين (Webview)، تطبيق أصلي

إذا لم يتم العثور على صورة أساسية أثناء المقارنة، يتم نسخ الصورة تلقائيًا إلى مجلد الخط الأساسي.

### `baselineFolder`

-   **النوع:** `string|()=> string`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `.path/to/testfile/__snapshots__/`
-   **مدعوم:** الويب، تطبيق هجين (Webview)، تطبيق أصلي

الدليل الذي سيحتوي على جميع صور الخط الأساسي التي تستخدم أثناء المقارنة. إذا لم يتم تعيينه، سيتم استخدام القيمة الافتراضية التي ستخزن الملفات في مجلد `__snapshots__/` بجوار ملف المواصفات الذي ينفذ اختبارات المرئيات. يمكن أيضًا استخدام دالة تُرجع `string` لتعيين قيمة `baselineFolder`:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// OR
{
    baselineFolder: () => {
        // Do some magic here
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `false`
-   **مدعوم:** الويب، تطبيق هجين (Webview)، تطبيق أصلي

حذف مجلد وقت التشغيل (`actual` و `diff`) عند التهيئة

:::info ملاحظة
سيعمل هذا فقط عندما يتم تعيين [`screenshotPath`](#screenshotpath) من خلال خيارات البرنامج المساعد، **ولن يعمل** عند تعيين المجلدات في الطرق
:::

### `createJsonReportFiles` **(جديد)**

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `false`

لديك الآن خيار تصدير نتائج المقارنة إلى ملف تقرير JSON. من خلال توفير الخيار `createJsonReportFiles: true`، كل صورة يتم مقارنتها ستنشئ تقريرًا مخزنًا في مجلد `actual`، بجانب كل نتيجة صورة `actual`. سيبدو الإخراج كما يلي:

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

عند اكتمال جميع الاختبارات، سيتم إنشاء ملف JSON جديد مع مجموعة المقارنات ويمكن العثور عليه في جذر مجلد `actual` الخاص بك. يتم تجميع البيانات حسب:

-   `describe` لـ Jasmine/Mocha أو `Feature` لـ CucumberJS
-   `it` لـ Jasmine/Mocha أو `Scenario` لـ CucumberJS
    ومن ثم يتم ترتيبها حسب:
-   `commandName`، وهي أسماء طرق المقارنة المستخدمة لمقارنة الصور
-   `instanceData`، المتصفح أولاً، ثم الجهاز، ثم المنصة
    سيبدو الأمر كما يلي

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

ستتيح لك بيانات التقرير فرصة بناء تقريرك المرئي الخاص دون القيام بكل السحر وجمع البيانات بنفسك.

:::info ملاحظة
تحتاج إلى استخدام إصدار `@wdio/visual-testing` 5.2.0 أو أعلى
:::

### `disableBlinkingCursor`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `false`
-   **مدعوم:** الويب، تطبيق هجين (Webview)

تمكين/تعطيل جميع "وميض" مؤشر `input`، `textarea`، `[contenteditable]` في التطبيق. إذا تم تعيينه على `true`، سيتم تعيين المؤشر على `transparent` قبل التقاط لقطة شاشة وإعادة تعيينه عند الانتهاء

### `disableCSSAnimation`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `false`
-   **مدعوم:** الويب، تطبيق هجين (Webview)

تمكين/تعطيل جميع رسوم متحركة CSS في التطبيق. إذا تم تعيينه على `true`، سيتم تعطيل جميع الرسوم المتحركة قبل التقاط لقطة شاشة وإعادة تعيينها عند الانتهاء

### `enableLayoutTesting`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `false`
-   **مدعوم:** الويب

سيؤدي هذا إلى إخفاء كل النص في الصفحة بحيث يتم استخدام التخطيط فقط للمقارنة. سيتم الإخفاء عن طريق إضافة النمط `'color': 'transparent !important'` إلى **كل** عنصر.

للمخرجات، انظر [مخرجات الاختبار](/docs/visual-testing/test-output#enablelayouttesting)

:::info
باستخدام هذه العلامة، سيحصل كل عنصر يحتوي على نص (وليس فقط `p, h1, h2, h3, h4, h5, h6, span, a, li`، ولكن أيضًا `div|button|..`) على هذه الخاصية. لا يوجد خيار **لتخصيص** هذا.
:::

### `formatImageName`

-   **النوع:** `string`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **مدعوم:** الويب، تطبيق هجين (Webview)، تطبيق أصلي

يمكن تخصيص اسم الصور المحفوظة عن طريق تمرير المعلمة `formatImageName` مع سلسلة تنسيق مثل:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

يمكن تمرير المتغيرات التالية لتنسيق السلسلة وستتم قراءتها تلقائيًا من إمكانيات المثيل.
إذا تعذر تحديدها، سيتم استخدام القيم الافتراضية.

-   `browserName`: اسم المتصفح في الإمكانيات المقدمة
-   `browserVersion`: إصدار المتصفح المقدم في الإمكانيات
-   `deviceName`: اسم الجهاز من الإمكانيات
-   `dpr`: نسبة بكسل الجهاز
-   `height`: ارتفاع الشاشة
-   `logName`: اسم السجل من الإمكانيات
-   `mobile`: سيضيف هذا `_app`، أو اسم المتصفح بعد `deviceName` للتمييز بين لقطات شاشة التطبيق ولقطات شاشة المتصفح
-   `platformName`: اسم المنصة في الإمكانيات المقدمة
-   `platformVersion`: إصدار المنصة المقدمة في الإمكانيات
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
-   **مدعوم:** الويب

المهلة بالميلي ثانية للانتظار بعد التمرير. قد يساعد هذا في تحديد الصفحات ذات التحميل البطيء.

:::info

سيعمل هذا فقط عندما يتم تعيين خيار الخدمة/الطريقة `userBasedFullPageScreenshot` على `true`، انظر أيضًا [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `true`
-   **مدعوم:** الويب، تطبيق هجين (Webview)

إخفاء أشرطة التمرير في التطبيق. إذا تم تعيينه على true، سيتم تعطيل جميع أشرطة التمرير قبل التقاط لقطة شاشة. يتم تعيين هذا افتراضيًا على `true` لمنع المشكلات الإضافية.

### `logLevel`

-   **النوع:** `string`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `info`
-   **مدعوم:** الويب، تطبيق هجين (Webview)، تطبيق أصلي

يضيف سجلات إضافية، الخيارات هي `debug | info | warn | silent`

يتم دائمًا تسجيل الأخطاء في وحدة التحكم.

### `savePerInstance`

-   **النوع:** `boolean`
-   **القيمة الافتراضية:** `false`
-   **إلزامي:** لا
-   **مدعوم:** الويب، تطبيق هجين (Webview)، تطبيق أصلي

حفظ الصور لكل مثيل في مجلد منفصل، على سبيل المثال، سيتم حفظ جميع لقطات شاشة Chrome في مجلد Chrome مثل `desktop_chrome`.

### `screenshotPath`

-   **النوع:** `string | () => string`
-   **القيمة الافتراضية:** `.tmp/`
-   **إلزامي:** لا
-   **مدعوم:** الويب، تطبيق هجين (Webview)، تطبيق أصلي

الدليل الذي سيحتوي على جميع لقطات الشاشة الفعلية/المختلفة. إذا لم يتم تعيينه، سيتم استخدام القيمة الافتراضية. يمكن أيضًا استخدام دالة تُرجع سلسلة نصية لتعيين قيمة screenshotPath:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// OR
{
    screenshotPath: () => {
        // Do some magic here
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `6` لـ Android و `15` لـ iOS (`6` افتراضيًا و `9` سيتم إضافتها تلقائيًا للشريط الرئيسي المحتمل على أجهزة iPhone ذات النوتش أو أجهزة iPad التي تحتوي على شريط رئيسي)
-   **مدعوم:** الويب

الحشوة التي يجب إضافتها إلى شريط الأدوات على iOS و Android لإجراء قطع مناسب للعرض.

### `userBasedFullPageScreenshot`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `false`
-   **مدعوم:** الويب، تطبيق هجين (Webview) **تم تقديمه في visual-service@7.0.0**

بشكل افتراضي، يتم التقاط لقطات شاشة كاملة الصفحة على سطح المكتب باستخدام بروتوكول WebDriver BiDi، مما يمكّن من التقاط لقطات شاشة سريعة ومستقرة ومتسقة دون تمرير.
عندما يتم تعيين userBasedFullPageScreenshot على true، تحاكي عملية لقطة الشاشة مستخدمًا حقيقيًا: التمرير عبر الصفحة، والتقاط لقطات شاشة بحجم العرض، وخياطتها معًا. هذه الطريقة مفيدة للصفحات ذات المحتوى المحمّل بشكل كسول أو العرض الديناميكي الذي يعتمد على موضع التمرير.

استخدم هذا الخيار إذا كانت صفحتك تعتمد على تحميل المحتوى أثناء التمرير أو إذا كنت ترغب في الحفاظ على سلوك طرق لقطة الشاشة القديمة.

### `waitForFontsLoaded`

-   **النوع:** `boolean`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** `true`
-   **مدعوم:** الويب، تطبيق هجين (Webview)

يمكن تحميل الخطوط، بما في ذلك خطوط الأطراف الثالثة، بشكل متزامن أو غير متزامن. يعني التحميل غير المتزامن أن الخطوط قد تحمل بعد أن يحدد WebdriverIO أن الصفحة قد تم تحميلها بالكامل. لمنع مشاكل عرض الخطوط، ستنتظر هذه الوحدة، بشكل افتراضي، حتى تحميل جميع الخطوط قبل التقاط لقطة شاشة.

## خيارات Tabbable

:::info ملاحظة

تدعم هذه الوحدة أيضًا رسم الطريقة التي يستخدم بها المستخدم لوحة المفاتيح للتنقل _tab_ عبر موقع الويب عن طريق رسم خطوط ونقاط من عنصر tabbable إلى آخر.<br/>
العمل مستوحى من منشور مدونة [Viv Richards](https://github.com/vivrichards600) حول ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
تستند طريقة اختيار العناصر القابلة للتنقل على وحدة [tabbable](https://github.com/davidtheclark/tabbable). إذا كانت هناك أي مشكلات تتعلق بالتنقل، يرجى التحقق من [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) وخاصة [قسم المزيد من التفاصيل](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

-   **النوع:** `object`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** انظر [هنا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) لجميع القيم الافتراضية
-   **مدعوم:** الويب

الخيارات التي يمكن تغييرها للخطوط والنقاط إذا كنت تستخدم طرق `{save|check}Tabbable`. الخيارات موضحة أدناه.

#### `tabbableOptions.circle`

-   **النوع:** `object`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** انظر [هنا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) لجميع القيم الافتراضية
-   **مدعوم:** الويب

الخيارات لتغيير الدائرة.

##### `tabbableOptions.circle.backgroundColor`

-   **النوع:** `string`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** انظر [هنا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) لجميع القيم الافتراضية
-   **مدعوم:** الويب

لون خلفية الدائرة.

##### `tabbableOptions.circle.borderColor`

-   **النوع:** `string`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** انظر [هنا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) لجميع القيم الافتراضية
-   **مدعوم:** الويب

لون حدود الدائرة.

##### `tabbableOptions.circle.borderWidth`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** انظر [هنا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) لجميع القيم الافتراضية
-   **مدعوم:** الويب

عرض حدود الدائرة.

##### `tabbableOptions.circle.fontColor`

-   **النوع:** `string`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** انظر [هنا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) لجميع القيم الافتراضية
-   **مدعوم:** الويب

لون خط النص في الدائرة. سيتم عرض هذا فقط إذا تم تعيين [`showNumber`](./#tabbableoptionscircleshownumber) على `true`.

##### `tabbableOptions.circle.fontFamily`

-   **النوع:** `string`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** انظر [هنا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) لجميع القيم الافتراضية
-   **مدعوم:** الويب

عائلة خط النص في الدائرة. سيتم عرض هذا فقط إذا تم تعيين [`showNumber`](./#tabbableoptionscircleshownumber) على `true`.

تأكد من تعيين الخطوط المدعومة من قبل المتصفحات.

##### `tabbableOptions.circle.fontSize`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** انظر [هنا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) لجميع القيم الافتراضية
-   **مدعوم:** الويب

حجم خط النص في الدائرة. سيتم عرض هذا فقط إذا تم تعيين [`showNumber`](./#tabbableoptionscircleshownumber) على `true`.

##### `tabbableOptions.circle.size`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** انظر [هنا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) لجميع القيم الافتراضية
-   **مدعوم:** الويب

حجم الدائرة.

##### `tabbableOptions.circle.showNumber`

-   **النوع:** `showNumber`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** انظر [هنا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) لجميع القيم الافتراضية
-   **مدعوم:** الويب

عرض رقم تسلسل علامة التبويب في الدائرة.

#### `tabbableOptions.line`

-   **النوع:** `object`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** انظر [هنا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) لجميع القيم الافتراضية
-   **مدعوم:** الويب

الخيارات لتغيير الخط.

##### `tabbableOptions.line.color`

-   **النوع:** `string`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** انظر [هنا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) لجميع القيم الافتراضية
-   **مدعوم:** الويب

لون الخط.

##### `tabbableOptions.line.width`

-   **النوع:** `number`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** انظر [هنا](https://github.com/webdriverio/visual-testing/blob/b7d66afadc88f03f09646c28806a687d2ae46000/packages/webdriver-image-comparison/src/helpers/options.ts#L6-L68) لجميع القيم الافتراضية
-   **مدعوم:** الويب

عرض الخط.

## خيارات المقارنة

### `compareOptions`

-   **النوع:** `object`
-   **إلزامي:** لا
-   **القيمة الافتراضية:** انظر [هنا](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) لجميع القيم الافتراضية
-   **مدعوم:** الويب، تطبيق هجين (Webview)، تطبيق أصلي (انظر [خيارات المقارنة للطريقة](./method-options#compare-check-options) لمزيد من المعلومات)

يمكن أيضًا تعيين خيارات المقارنة كخيارات للخدمة، وهي موصوفة في [خيارات المقارنة للطريقة](/docs/visual-testing/method-options#compare-check-options)