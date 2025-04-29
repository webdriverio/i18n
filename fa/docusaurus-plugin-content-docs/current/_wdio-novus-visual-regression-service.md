---
id: wdio-novus-visual-regression-service
title: سرویس رگرسیون تصویری Novus
custom_edit_url: https://github.com/Jnegrier/wdio-novus-visual-regression-service/edit/master/README.md
---


> wdio-novus-visual-regression-service یک پکیج شخص ثالث است، برای اطلاعات بیشتر لطفا به [GitHub](https://github.com/Jnegrier/wdio-novus-visual-regression-service) | [npm](https://www.npmjs.com/package/wdio-novus-visual-regression-service) مراجعه کنید

[![Build Status](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service.svg?branch=master)](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service)

> تست رگرسیون تصویری برای WebdriverIO

بر اساس کار Jan-André Zinser روی [wdio-visual-regression-service](https://github.com/zinserjan/wdio-visual-regression-service) و [wdio-screenshot](https://github.com/zinserjan/wdio-screenshot)

## نصب

شما می‌توانید wdio-novus-visual-regression-service را به صورت معمول از طریق NPM نصب کنید:

```sh
$ npm install wdio-novus-visual-regression-service --save-dev
```

دستورالعمل‌های نحوه نصب `WebdriverIO` را می‌توانید [اینجا](https://webdriver.io/docs/gettingstarted) پیدا کنید.

## پیکربندی
برای راه‌اندازی wdio-novus-visual-regression-service، `novus-visual-regression` را به بخش سرویس فایل پیکربندی WebdriverIO خود اضافه کنید و استراتژی مقایسه مورد نظر خود را در گزینه‌های سرویس تعریف کنید.

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

### گزینه‌ها
در کلید `visualRegression` در فایل wdio.config.js خود، می‌توانید یک شیء پیکربندی با ساختار زیر را ارسال کنید:

* **compare** `Object` <br />
روش مقایسه اسکرین‌شات، به [روش‌های مقایسه](#compare-methods) مراجعه کنید

* **viewportChangePause**  `Number`  ( پیش‌فرض: 100 ) <br />
بعد از تغییر viewport، x میلی‌ثانیه صبر کنید. ممکن است مرورگر برای رسم مجدد مدتی طول بکشد. این می‌تواند منجر به مشکلات رندرینگ شود و نتایج ناسازگار بین اجراها تولید کند.

* **viewports** `Object[{ width: Number, height: Number }]`  ( پیش‌فرض: *[viewport-کنونی]* ) (**فقط دسکتاپ**)<br />
تمام اسکرین‌شات‌ها در ابعاد viewport مختلف گرفته می‌شوند (مثلاً برای تست‌های طراحی واکنش‌گرا)

* **orientations** `String[] {landscape, portrait}`  ( پیش‌فرض: *[جهت-کنونی]* ) (**فقط موبایل**)<br />
تمام اسکرین‌شات‌ها در جهت‌های صفحه نمایش مختلف گرفته می‌شوند (مثلاً برای تست‌های طراحی واکنش‌گرا)

### روش‌های مقایسه
wdio-novus-visual-regression-service استفاده از روش‌های مختلف مقایسه اسکرین‌شات را امکان‌پذیر می‌کند.

#### VisualRegressionCompare.LocalCompare
همانطور که از نامش پیداست، *LocalCompare* اسکرین‌شات‌ها را به صورت محلی روی کامپیوتر شما می‌گیرد و آن‌ها را با اجراهای قبلی مقایسه می‌کند.

می‌توانید گزینه‌های زیر را به صورت یک شیء به سازنده آن ارسال کنید:

* **referenceName** `Function` <br />
تابعی را ارسال کنید که نام فایل را برای اسکرین‌شات مرجع برمی‌گرداند. تابع یک شیء *context* را به عنوان اولین پارامتر با تمام اطلاعات مربوط به دستور دریافت می‌کند.

* **screenshotName** `Function` <br />
تابعی را ارسال کنید که نام فایل را برای اسکرین‌شات فعلی برمی‌گرداند. تابع یک شیء *context* را به عنوان اولین پارامتر با تمام اطلاعات مربوط به دستور دریافت می‌کند.

* **diffName** `Function` <br />
تابعی را ارسال کنید که نام فایل را برای اسکرین‌شات تفاوت برمی‌گرداند. تابع یک شیء *context* را به عنوان اولین پارامتر با تمام اطلاعات مربوط به دستور دریافت می‌کند.

* **misMatchTolerance** `Number`  ( پیش‌فرض: 0.01 ) <br />
عددی بین 0 و 100 که درجه عدم تطابق برای در نظر گرفتن دو تصویر به عنوان یکسان را تعریف می‌کند. افزایش این مقدار پوشش تست را کاهش می‌دهد.

* **ignoreComparison** `String`  ( پیش‌فرض: nothing ) <br />
یک رشته با مقدار `nothing`، `colors` یا `antialiasing` برای تنظیم روش مقایسه ارسال کنید.

برای مثالی از تولید نام‌های فایل اسکرین‌شات بر اساس نام تست فعلی، به کد نمونه [پیکربندی](#پیکربندی) نگاه کنید.

#### VisualRegressionCompare.SaveScreenshot
این روش یک نسخه ساده‌شده از `VisualRegressionCompare.LocalCompare` برای گرفتن فقط اسکرین‌شات‌ها است. این زمانی مفید است که می‌خواهید فقط اسکرین‌شات‌های مرجع ایجاد کنید و بدون مقایسه، آن‌ها را بازنویسی کنید.

می‌توانید گزینه‌های زیر را به صورت یک شیء به سازنده آن ارسال کنید:

* **screenshotName** `Function` <br />
تابعی را ارسال کنید که نام فایل را برای اسکرین‌شات فعلی برمی‌گرداند. تابع یک شیء *context* را به عنوان اولین پارامتر با تمام اطلاعات مربوط به دستور دریافت می‌کند.

#### VisualRegressionCompare.Spectre
این روش برای آپلود اسکرین‌شات‌ها به برنامه وب [Spectre](https://github.com/wearefriday/spectre) استفاده می‌شود.
Spectre یک رابط کاربری برای تست رگرسیون تصویری است. اسکرین‌شات‌ها را ذخیره و مقایسه می‌کند که برای Integration مداوم بسیار مفید است.

می‌توانید گزینه‌های زیر را به صورت یک شیء به سازنده آن ارسال کنید:

* **url** `String` <br />
یک URL سرویس وب Spectre را ارسال کنید.

* **project** `String` <br />
یک نام برای پروژه خود ارسال کنید.

* **suite** `String` <br />
یک نام برای مجموعه تست خود ارسال کنید. یک پروژه می‌تواند شامل چندین مجموعه باشد.

* **test** `Function` <br />
تابعی را ارسال کنید که نام تست را برای اسکرین‌شات برمی‌گرداند. تابع یک شیء *context* را به عنوان اولین پارامتر با تمام اطلاعات مربوط به دستور دریافت می‌کند.

* **browser** `Function` <br />
تابعی را ارسال کنید که مرورگر را برای اسکرین‌شات برمی‌گرداند. تابع یک شیء *context* را به عنوان اولین پارامتر با تمام اطلاعات مربوط به دستور دریافت می‌کند.

* **size** `Function` <br />
تابعی را ارسال کنید که اندازه را برای اسکرین‌شات برمی‌گرداند. تابع یک شیء *context* را به عنوان اولین پارامتر با تمام اطلاعات مربوط به دستور دریافت می‌کند.

* **fuzzLevel** `Number`  ( پیش‌فرض: 30 ) <br />
عددی بین 0 و 100 که ضریب fuzz روش مقایسه تصویر Spectre را تعریف می‌کند. برای جزئیات بیشتر لطفاً به [مستندات Spectre](https://github.com/wearefriday/spectre) مراجعه کنید.

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

## استفاده
wdio-novus-visual-regression-service یک نمونه WebdriverIO را با دستورات زیر تقویت می‌کند:
* `browser.checkViewport([{options}]);`
* `browser.checkDocument([{options}]);`
* `browser.checkElement(elementSelector, [{options}]);`


تمام این‌ها گزینه‌هایی را ارائه می‌دهند که به شما کمک می‌کنند اسکرین‌شات‌ها را در ابعاد مختلف بگیرید یا بخش‌های غیر مرتبط (مثلاً محتوا) را مستثنی کنید. گزینه‌های زیر در دسترس هستند:


* **exclude** `String[]|Object[]` (**هنوز پیاده‌سازی نشده**)<br />
  بخش‌هایی از اسکرین‌شات خود را که به طور مکرر تغییر می‌کنند مستثنی کنید. می‌توانید انواع مختلف [استراتژی‌های انتخابگر WebdriverIO](http://webdriver.io/guide/usage/selectors.html) را ارسال کنید که یک یا چند عنصر را پرس و جو می‌کند یا می‌توانید مقادیر x و y را تعریف کنید که یک مستطیل یا چندضلعی را می‌کشند

* **hide** `Object[]`<br />
  تمام عناصری که توسط انواع مختلف [استراتژی‌های انتخابگر WebdriverIO](http://webdriver.io/guide/usage/selectors.html) پرس و جو می‌شوند را پنهان می‌کند (با استفاده از `visibility: hidden`)

* **remove** `Object[]`<br />
  تمام عناصری که توسط انواع مختلف [استراتژی‌های انتخابگر WebdriverIO](http://webdriver.io/guide/usage/selectors.html) پرس و جو می‌شوند را حذف می‌کند (با استفاده از `display: none`)

* **viewports** `Object[{ width: Number, height: Number }]` (**فقط دسکتاپ**)<br />
     مقدار جهانی *viewports* را برای این دستور نادیده می‌گیرد. تمام اسکرین‌شات‌ها در ابعاد viewport مختلف گرفته می‌شوند (مثلاً برای تست‌های طراحی واکنش‌گرا)

* **orientations** `String[] {landscape, portrait}` (**فقط موبایل**)<br />
    مقدار جهانی *orientations* را برای این دستور نادیده می‌گیرد. تمام اسکرین‌شات‌ها در جهت‌های صفحه نمایش مختلف گرفته می‌شوند (مثلاً برای تست‌های طراحی واکنش‌گرا)

* **misMatchTolerance** `Number` <br />
    مقدار جهانی *misMatchTolerance* را برای این دستور نادیده می‌گیرد. عددی بین 0 و 100 را ارسال کنید که درجه عدم تطابق برای در نظر گرفتن دو تصویر به عنوان یکسان را تعریف می‌کند.

* **fuzzLevel** `Number` <br />
    مقدار جهانی *fuzzLevel* را برای این دستور نادیده می‌گیرد. عددی بین 0 و 100 را ارسال کنید که ضریب fuzz روش مقایسه تصویر Spectre را تعریف می‌کند.

* **ignoreComparison** `String` <br />
    مقدار جهانی *ignoreComparison* را برای این دستور نادیده می‌گیرد. یک رشته با مقدار `nothing`، `colors` یا `antialiasing` برای تنظیم روش مقایسه ارسال کنید.

* **viewportChangePause**  `Number` <br />
    مقدار جهانی *viewportChangePause* را برای این دستور نادیده می‌گیرد. بعد از تغییر viewport، x میلی‌ثانیه صبر کنید.

### مجوز

MIT