---
id: wdio-novus-visual-regression-service
title: خدمة انحدار بصري نوفوس
custom_edit_url: https://github.com/Jnegrier/wdio-novus-visual-regression-service/edit/master/README.md
---


> wdio-novus-visual-regression-service هي حزمة من طرف ثالث، لمزيد من المعلومات يرجى الاطلاع على [GitHub](https://github.com/Jnegrier/wdio-novus-visual-regression-service) | [npm](https://www.npmjs.com/package/wdio-novus-visual-regression-service)

[![Build Status](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service.svg?branch=master)](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service)

> اختبار الانحدار البصري لـ WebdriverIO

مبني على عمل Jan-André Zinser في [wdio-visual-regression-service](https://github.com/zinserjan/wdio-visual-regression-service) و [wdio-screenshot](https://github.com/zinserjan/wdio-screenshot)

## التثبيت

يمكنك تثبيت wdio-novus-visual-regression-service عبر NPM كالمعتاد:

```sh
$ npm install wdio-novus-visual-regression-service --save-dev
```

يمكن العثور على تعليمات حول كيفية تثبيت `WebdriverIO` [هنا.](https://webdriver.io/docs/gettingstarted)

## الإعداد
قم بإعداد wdio-novus-visual-regression-service عن طريق إضافة `novus-visual-regression` إلى قسم الخدمة في تكوين WebdriverIO الخاص بك وحدد استراتيجية المقارنة المطلوبة في خيارات الخدمة.

```js
// wdio.conf.js

var path = require('path');
var VisualRegressionCompare = require('wdio-novus-visual-regression-service/compare');

function getScreenshotName(basePath) {
  return function(context) {
    var type = context.type;
    var testName = context.test.title;
    var browserVersion = parseInt(context.browser.version, 10);
    var browserName = context.browser.name;
    var browserViewport = context.meta.viewport;
    var browserWidth = browserViewport.width;
    var browserHeight = browserViewport.height;

    return path.join(basePath, `${testName}_${type}_${browserName}_v${browserVersion}_${browserWidth}x${browserHeight}.png`);
  };
}

exports.config = {
  // ...
  services: [
    [
      'novus-visual-regression',
      {
        compare: new VisualRegressionCompare.LocalCompare({
          referenceName: getScreenshotName(path.join(process.cwd(), 'screenshots/reference')),
          screenshotName: getScreenshotName(path.join(process.cwd(), 'screenshots/screen')),
          diffName: getScreenshotName(path.join(process.cwd(), 'screenshots/diff')),
          misMatchTolerance: 0.01,
        }),
        viewportChangePause: 300,
        viewports: [{ width: 320, height: 480 }, { width: 480, height: 320 }, { width: 1024, height: 768 }],
        orientations: ['landscape', 'portrait'],
      }
    ]
  ],
  // ...
};
```

### الخيارات
تحت المفتاح `visualRegression` في ملف wdio.config.js الخاص بك، يمكنك تمرير كائن تكوين بالهيكل التالي:

* **compare** `Object` <br />
طريقة مقارنة لقطة الشاشة، انظر [طرق المقارنة](#compare-methods)

* **viewportChangePause**  `Number`  ( الافتراضي: 100 ) <br />
انتظر عدد x من الميلي ثانية بعد تغيير منفذ العرض. قد يستغرق الأمر بعض الوقت حتى يعيد المتصفح الرسم. يمكن أن يؤدي هذا إلى مشاكل في العرض وينتج نتائج غير متسقة بين التشغيلات.

* **viewports** `Object[{ width: Number, height: Number }]`  ( الافتراضي: *[current-viewport]* ) (**للكمبيوتر فقط**)<br />
   سيتم التقاط جميع لقطات الشاشة بأبعاد منفذ عرض مختلفة (مثلاً لاختبارات التصميم المتجاوب)

* **orientations** `String[] {landscape, portrait}`  ( الافتراضي: *[current-orientation]* ) (**للموبايل فقط**)<br />
    سيتم التقاط جميع لقطات الشاشة باتجاهات شاشة مختلفة (مثلاً لاختبارات التصميم المتجاوب)

### طرق المقارنة
تسمح خدمة wdio-novus-visual-regression-service باستخدام طرق مختلفة لمقارنة لقطات الشاشة.

#### VisualRegressionCompare.LocalCompare
كما يوحي اسمها، تلتقط *LocalCompare* لقطات الشاشة محليًا على جهاز الكمبيوتر الخاص بك وتقارنها مع عمليات التشغيل السابقة.

يمكنك تمرير الخيارات التالية إلى المنشئ الخاص بها ككائن:

* **referenceName** `Function` <br />
قم بتمرير دالة تعيد اسم الملف للقطة الشاشة المرجعية. تتلقى الدالة كائن *context* كمعامل أول مع جميع المعلومات ذات الصلة حول الأمر.

* **screenshotName** `Function` <br />
قم بتمرير دالة تعيد اسم الملف للقطة الشاشة الحالية. تتلقى الدالة كائن *context* كمعامل أول مع جميع المعلومات ذات الصلة حول الأمر.

* **diffName** `Function` <br />
قم بتمرير دالة تعيد اسم الملف للقطة شاشة الاختلاف. تتلقى الدالة كائن *context* كمعامل أول مع جميع المعلومات ذات الصلة حول الأمر.

* **misMatchTolerance** `Number`  ( الافتراضي: 0.01 ) <br />
رقم بين 0 و 100 يحدد درجة عدم التطابق لاعتبار صورتين متطابقتين، زيادة هذه القيمة ستقلل من تغطية الاختبار.

* **ignoreComparison** `String`  ( الافتراضي: nothing ) <br />
قم بتمرير سلسلة بقيمة `nothing` أو `colors` أو `antialiasing` لضبط طريقة المقارنة.

للحصول على مثال لإنشاء أسماء ملفات لقطات الشاشة اعتمادًا على اسم الاختبار الحالي، يرجى الاطلاع على عينة الكود في [الإعداد](#configuration).

#### VisualRegressionCompare.SaveScreenshot
هذه الطريقة هي نسخة مبسطة من `VisualRegressionCompare.LocalCompare` لالتقاط لقطات الشاشة فقط. هذا مفيد جدًا عندما تريد فقط إنشاء لقطات شاشة مرجعية واستبدال السابقة دون مقارنة.

يمكنك تمرير الخيارات التالية إلى المنشئ الخاص بها ككائن:

* **screenshotName** `Function` <br />
قم بتمرير دالة تعيد اسم الملف للقطة الشاشة الحالية. تتلقى الدالة كائن *context* كمعامل أول مع جميع المعلومات ذات الصلة حول الأمر.

#### VisualRegressionCompare.Spectre
تستخدم هذه الطريقة لتحميل لقطات الشاشة إلى تطبيق الويب [Spectre](https://github.com/wearefriday/spectre).
Spectre هو واجهة مستخدم لاختبار الانحدار البصري. يخزن لقطات الشاشة ويقارنها مما يعد مفيدًا للتكامل المستمر.

يمكنك تمرير الخيارات التالية إلى المنشئ الخاص بها ككائن:

* **url** `String` <br />
قم بتمرير عنوان URL لخدمة ويب Spectre.

* **project** `String` <br />
قم بتمرير اسم لمشروعك.

* **suite** `String` <br />
قم بتمرير اسم لمجموعة الاختبار الخاصة بك. يمكن أن يحتوي المشروع الواحد على عدة مجموعات.

* **test** `Function` <br />
قم بتمرير دالة تعيد اسم الاختبار للقطة الشاشة. تتلقى الدالة كائن *context* كمعامل أول مع جميع المعلومات ذات الصلة حول الأمر.

* **browser** `Function` <br />
قم بتمرير دالة تعيد المتصفح للقطة الشاشة. تتلقى الدالة كائن *context* كمعامل أول مع جميع المعلومات ذات الصلة حول الأمر.

* **size** `Function` <br />
قم بتمرير دالة تعيد حجم لقطة الشاشة. تتلقى الدالة كائن *context* كمعامل أول مع جميع المعلومات ذات الصلة حول الأمر.

* **fuzzLevel** `Number`  ( الافتراضي: 30 ) <br />
رقم بين 0 و 100 يحدد عامل الضبابية لطريقة مقارنة الصور في Spectre. لمزيد من التفاصيل، يرجى الاطلاع على [توثيق Spectre](https://github.com/wearefriday/spectre).

**مثال**
```js
// wdio.conf.js

var path = require('path');
var VisualRegressionCompare = require('wdio-novus-visual-regression-service/compare');

exports.config = {
  // ...
  services: [
    [
      'novus-visual-regression',
      {
        compare: new VisualRegressionCompare.Spectre({
          url: 'http://localhost:3000',
          project: 'my project',
          suite: 'my test suite',
          test: function getTest(context) {
            return context.test.title;
          },
          browser: function getBrowser(context) {
            return context.browser.name;
          },
          size: function getSize(context) {
            return context.meta.viewport != null ? context.meta.viewport.width : context.meta.orientation;
          },
          fuzzLevel: 30
        }),
        viewportChangePause: 300,
        viewports: [{ width: 320, height: 480 }, { width: 480, height: 320 }, { width: 1024, height: 768 }],
        orientations: ['landscape', 'portrait'],
      }
    ]
  ],
  // ...
};
```

## الاستخدام
تعزز خدمة wdio-novus-visual-regression-service نسخة WebdriverIO بالأوامر التالية:
* `browser.checkViewport([{options}]);`
* `browser.checkDocument([{options}]);`
* `browser.checkElement(elementSelector, [{options}]);`


كل هذه توفر خيارات ستساعدك على التقاط لقطات شاشة بأبعاد مختلفة أو لاستبعاد أجزاء غير ذات صلة (مثل المحتوى). الخيارات التالية متاحة:


* **exclude** `String[]|Object[]` (**لم يتم تنفيذها بعد**)<br />
  استبعد الأجزاء التي تتغير بشكل متكرر من لقطة الشاشة، يمكنك إما تمرير جميع أنواع [استراتيجيات محدد WebdriverIO](http://webdriver.io/guide/usage/selectors.html) المختلفة
  التي تستعلم عن عنصر واحد أو عدة عناصر أو يمكنك تحديد قيم x و y التي تمتد مستطيلاً أو مضلعًا

* **hide** `Object[]`<br />
  يخفي جميع العناصر التي يتم الاستعلام عنها بواسطة جميع أنواع [استراتيجيات محدد WebdriverIO](http://webdriver.io/guide/usage/selectors.html) المختلفة (عبر `visibility: hidden`)

* **remove** `Object[]`<br />
  يزيل جميع العناصر التي يتم الاستعلام عنها بواسطة جميع أنواع [استراتيجيات محدد WebdriverIO](http://webdriver.io/guide/usage/selectors.html) المختلفة (عبر `display: none`)

* **viewports** `Object[{ width: Number, height: Number }]` (**للكمبيوتر فقط**)<br />
     يتجاوز قيمة *viewports* العالمية لهذا الأمر. سيتم التقاط جميع لقطات الشاشة بأبعاد منفذ عرض مختلفة (مثلاً لاختبارات التصميم المتجاوب)

* **orientations** `String[] {landscape, portrait}` (**للموبايل فقط**)<br />
    يتجاوز قيمة *orientations* العالمية لهذا الأمر. سيتم التقاط جميع لقطات الشاشة باتجاهات شاشة مختلفة (مثلاً لاختبارات التصميم المتجاوب)

* **misMatchTolerance** `Number` <br />
    يتجاوز قيمة *misMatchTolerance* العالمية لهذا الأمر. قم بتمرير رقم بين 0 و 100 يحدد درجة عدم التطابق لاعتبار صورتين متطابقتين.

* **fuzzLevel** `Number` <br />
    يتجاوز قيمة *fuzzLevel* العالمية لهذا الأمر. قم بتمرير رقم بين 0 و 100 يحدد عامل الضبابية لطريقة مقارنة الصور في Spectre.

* **ignoreComparison** `String` <br />
    يتجاوز قيمة *ignoreComparison* العالمية لهذا الأمر. قم بتمرير سلسلة بقيمة `nothing` أو `colors` أو `antialiasing` لضبط طريقة المقارنة.

* **viewportChangePause**  `Number` <br />
    يتجاوز قيمة *viewportChangePause* العالمية لهذا الأمر. انتظر عدد x من الميلي ثانية بعد تغيير منفذ العرض.

### الترخيص

MIT