---
id: junit-reporter
title: گزارشگر Junit
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-junit-reporter/README.md
---


> یک گزارشگر WebdriverIO که گزارش‌های XML مبتنی بر JUnit سازگار با [Jenkins](http://jenkins-ci.org/) ایجاد می‌کند

## نصب

ساده‌ترین راه این است که `@wdio/junit-reporter` را به عنوان یک devDependency در `package.json` خود نگه دارید، از طریق:

```sh
npm install @wdio/junit-reporter --save-dev
```

دستورالعمل نحوه نصب `WebdriverIO` را می‌توان [اینجا](https://webdriver.io/docs/gettingstarted) پیدا کرد.

## خروجی

این گزارشگر برای هر اجرا‌کننده یک گزارش را خروجی می‌دهد، بنابراین شما به نوبه خود یک گزارش XML برای هر فایل spec دریافت خواهید کرد. در زیر
نمونه‌هایی از خروجی XML با توجه به سناریوهای مختلف در فایل spec وجود دارد.

### بلوک describe تکی
```javascript
describe('a test suite', () => {
    it('a test case', function () {
      // do something
      // assert something
    });
});
```
تبدیل می‌شود به
```xml
<testsuites>
    <testsuite name="a test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
        <properties>
          <property name="specId" value="0"/>
          <property name="suiteName" value="a test suite"/>
          <property name="capabilities" value="chrome"/>
          <property name="file" value=".\test\specs\asuite.spec.js"/>
        </properties>
        <testcase classname="chrome.a_test_case" name="a_test_suite_a_test_case" time="11.706"/>
    </testsuite>
</testsuites>
```

### بلوک describe تو در تو
```javascript
describe('a test suite', () => {
    describe('a nested test suite', function() {
        it('a test case', function () {
          // do something
          // assert something
        });
    });
});
```
تبدیل می‌شود به
```xml
<testsuites>
    <testsuite name="a test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
    <properties>
      <property name="specId" value="0"/>
      <property name="suiteName" value="a test suite"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value=".\test\specs\asuite.spec.js"/>
    </properties>
  </testsuite>
  <testsuite name="a nested test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
    <properties>
      <property name="specId" value="0"/>
      <property name="suiteName" value="a nested test suite"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value=".\test\specs\asuite.spec.js"/>
    </properties>
    <testcase classname="chrome.a_test_case" name="a nested test suite a test case" time="11.706"/>
  </testsuite>
</testsuites>
```

### چندین بلوک describe
```javascript
describe('a test suite', () => {
    it('a test case', function () {
      // do something
      // assert something
    });
});
describe('a second test suite', () => {
    it('a second test case', function () {
      // do something
      // assert something
    });
});
```
تبدیل می‌شود به
```xml
<testsuites>
    <testsuite name="a test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
    <properties>
      <property name="specId" value="0"/>
      <property name="suiteName" value="a test suite"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value=".\test\specs\asuite.spec.js"/>
      <testcase classname="chrome.a_test_case" name="a nested test suite a test case" time="11.706"/>
    </properties>
  </testsuite>
  <testsuite name="a second test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
    <properties>
      <property name="specId" value="0"/>
      <property name="suiteName" value="a second test suite"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value=".\test\specs\asuite.spec.js"/>
    </properties>
    <testcase classname="chrome.a_second_test_case" name="a_second_test_suite_a_second_test_case" time="11.706"/>
  </testsuite>
</testsuites>
```

### شکست‌ها و خطاها
تمام شکست‌های مورد تست به عنوان خطاهای مورد تست JUnit نگاشت می‌شوند. یک مورد تست شکست خورده به دلیل خطای اعتبارسنجی یا خطا به این شکل خواهد بود:

```xml
<testcase classname="chrome.a_test_case" name="a_test_suite_a_test_case" time="0.372">
  <failure message="Error: some error"/>
    <system-err>
        <![CDATA[
Error: some assertion failure
    at UserContext.<anonymous> (C:\repo\webdriver-example\test\specs/a_test_suite.spec.js:22:17)
]]>
  </system-err>
</testcase>
```

## پیکربندی

کد زیر پیکربندی پیش‌فرض اجراکننده تست wdio را نشان می‌دهد. فقط `'junit'` را به عنوان گزارشگر به آرایه اضافه کنید. برای دریافت خروجی در طول تست می‌توانید [WDIO Dot Reporter](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter) و WDIO JUnit Reporter را همزمان اجرا کنید:

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            outputFileFormat: function(options) { // optional
                return `results-${options.cid}.${options.capabilities}.xml`
            }
        }]
    ],
    // ...
};
```

گزینه‌های زیر پشتیبانی می‌شوند:

### outputDir
مسیری را تعریف کنید که فایل‌های xml شما باید در آن ذخیره شوند.

نوع: `String`<br />
الزامی

### outputFileFormat
فایل‌های xml ایجاد شده پس از اجرای تست را تعریف کنید.

نوع: `Object`<br />
پیش‌فرض: ``function (opts) { return `wdio-${this.cid}-${name}-reporter.log` }``

```
outputFileFormat: function (options) {
    return 'mycustomfilename.xml';
}
```

> نکته: `options.capabilities` شیء قابلیت‌های شما برای آن اجراکننده است، بنابراین مشخص کردن `${options.capabilities}` در رشته شما [Object object] برمی‌گرداند. باید مشخص کنید که کدام ویژگی‌های قابلیت‌ها را می‌خواهید در نام فایل خود داشته باشید.

### suiteNameFormat

امکان ارائه regex سفارشی برای قالب‌بندی نام مجموعه تست (به عنوان مثال در xml خروجی) را می‌دهد.

نوع: `Regex`,<br />
پیش‌فرض: `/[^a-zA-Z0-9@]+/`

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            suiteNameFormat: /[^a-zA-Z0-9@]+/
            outputFileFormat: function(options) { // optional
                return `results-${options.cid}.${options.capabilities}.xml`
            }
        }]
    ],
    // ...
};
```

### addFileAttribute

یک ویژگی فایل به هر مورد تست اضافه می‌کند. این پیکربندی عمدتاً برای CircleCI است. این تنظیم جزئیات غنی‌تری را ارائه می‌دهد اما ممکن است در سایر پلتفرم‌های CI خراب شود.

نوع: `Boolean`,<br />
پیش‌فرض: `false`


### packageName

می‌توانید بسته‌ها را با تنظیم `'packageName'` در یک سطح اضافی تقسیم کنید. به عنوان مثال، اگر می‌خواهید یک مجموعه تست را با متغیر محیطی مختلف تکرار کنید:

نوع: `String`<br />
مثال:

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            packageName: process.env.USER_ROLE // chrome.41 - administrator
        }]
    ]
    // ...
};
```

### errorOptions

به شما امکان می‌دهد ترکیب‌های مختلفی از اعلان‌های خطا را در xml تنظیم کنید.<br />
با توجه به یک تست Jasmine مانند `expect(true).toBe(false, 'my custom message')` این خطای تست را دریافت خواهید کرد:

```
{
    matcherName: 'toBe',
    message: 'Expected true to be false, \'my custom message\'.',
    stack: 'Error: Expected true to be false, \'my custom message\'.\n    at UserContext.it (/home/mcelotti/Workspace/WebstormProjects/forcebeatwio/test/marco/prova1.spec.js:3:22)',
    passed: false,
    expected: [ false, 'my custom message' ],
    actual: true
}
```

بنابراین می‌توانید انتخاب کنید *کدام* کلید *کجا* استفاده شود، به مثال زیر توجه کنید.

نوع: `Object`,<br />
پیش‌فرض: `errorOptions: { error: "message" }`<br />
مثال:

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            errorOptions: {
                error: 'message',
                failure: 'message',
                stacktrace: 'stack'
            }
        }]
    ],
    // ...
};
```

### addWorkerLogs

پارامتر اختیاری، این پارامتر را روی true تنظیم کنید تا لاگ‌های کنسول از تست در گزارشگر پیوست شوند.

نوع: `Boolean`<br />
پیش‌فرض: `false`<br />
مثال:

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            addWorkerLogs: true
        }]
    ],
    // ...
};
```

## افزودن ویژگی‌های سفارشی به موارد تست

این پلاگین تابع `addProperty(name, value)` را ارائه می‌دهد. از این تابع می‌توان برای اضافه کردن ویژگی‌های مورد تست junit اضافی به مرحله تست در حال اجرا استفاده کرد. این ویژگی‌ها در xml نتیجه به صورت `<property name="${name}" value="${value}" />` گزارش خواهند شد.

مورد استفاده معمول برای این، اضافه کردن پیوند به یک مشکل یا مورد تست است.


### مثال استفاده

یک مثال برای mocha:

```js
import { addProperty } from '@wdio/junit-reporter'

describe('Suite', () => {
    it('Case', () => {
        addProperty('test_case', 'TC-1234')
    })
})
```

## تنظیم Jenkins

در آخر باید به کار CI خود (مثلاً Jenkins) بگویید که فایل xml را کجا می‌تواند پیدا کند. برای انجام این کار، یک اقدام پس از ساخت به کار خود اضافه کنید که پس از اجرای تست اجرا می‌شود و Jenkins (یا سیستم CI مورد نظر شما) را به نتایج تست XML خود هدایت کنید:

![Jenkins را به فایل‌های XML هدایت کنید](https://webdriver.io/img/jenkins-postjob.png "Jenkins را به فایل‌های XML هدایت کنید")

اگر چنین مرحله پس از ساختی در سیستم CI شما وجود ندارد، احتمالاً یک پلاگین برای آن در جایی در اینترنت وجود دارد.

----

برای اطلاعات بیشتر در مورد WebdriverIO به [صفحه اصلی](https://webdriver.io) مراجعه کنید.