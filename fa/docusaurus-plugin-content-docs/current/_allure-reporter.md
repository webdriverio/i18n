---
id: allure-reporter
title: گزارشگر آلور
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-allure-reporter/README.md
---


> یک پلاگین گزارشگر WebdriverIO برای ایجاد [گزارش‌های تست آلور](https://allurereport.org/docs/webdriverio/).

![Allure Reporter Example](/img/allure.png)

## نصب

ساده‌ترین راه افزودن `@wdio/allure-reporter` به عنوان یک devDependency در فایل `package.json` شماست.

```json
{
  "devDependencies": {
    "@wdio/allure-reporter": "^7.0.0"
  }
}
```

شما می‌توانید به سادگی با دستور زیر آن را نصب کنید:

```sh
npm install @wdio/allure-reporter --save-dev
```

## پیکربندی

دایرکتوری خروجی را در فایل wdio.conf.js خود پیکربندی کنید:

```js
export const config = {
    // ...
    reporters: [['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
    }]],
    // ...
}
```
- `outputDir` به طور پیش‌فرض برابر با `./allure-results` است. پس از اتمام اجرای تست، خواهید دید که این دایرکتوری با فایل‌های `.xml` برای هر مشخصه، به همراه تعدادی فایل `.txt` و `.png` و سایر پیوست‌ها پر شده است.
- `disableWebdriverStepsReporting` - پارامتر اختیاری (به طور پیش‌فرض `false`)، برای ثبت فقط مراحل سفارشی در گزارشگر.
- `issueLinkTemplate` - پارامتر اختیاری، برای مشخص کردن الگوی پیوند مشکل. گزارشگر مقدار `{}` را با مقدار مشخص شده در پارامتر فراخوانی `addIssue(value)` جایگزین می‌کند. همین منطق اگر Cucumber استفاده شود و برچسب `issue` در هر سطحی تنظیم شود، اعمال می‌شود، و به پیوند در گزارش تبدیل خواهد شد. مثال مقدار پارامتر:
  ```
  https://example.org/issue/{}
  ```
- `tmsLinkTemplate` - پارامتر اختیاری، برای مشخص کردن الگوی پیوند TMS (سیستم مدیریت تست). گزارشگر مقدار `{}` را با مقدار مشخص شده در پارامتر فراخوانی `addTestId(value)` جایگزین می‌کند. همین منطق اگر Cucumber استفاده شود و برچسب `testId` در هر سطحی تنظیم شود، اعمال می‌شود، و به پیوند در گزارش تبدیل خواهد شد. مثال مقدار پارامتر:
  ```
  https://example.org/tms/{}
  ```
- `disableWebdriverScreenshotsReporting` - پارامتر اختیاری (به طور پیش‌فرض `false`)، برای عدم پیوست تصاویر به گزارشگر.
- `useCucumberStepReporter` - پارامتر اختیاری (به طور پیش‌فرض `false`)، آن را به true تنظیم کنید تا سلسله مراتب گزارش هنگام استفاده از cucumber تغییر کند. خودتان امتحان کنید و ببینید چگونه به نظر می‌رسد.
- `disableMochaHooks` - پارامتر اختیاری (به طور پیش‌فرض `false`)، آن را به true تنظیم کنید تا هوک‌های `before/after` برای ردیابی/عکس‌برداری/نتیجه به گزارشگر آلور اضافه نشوند.
- `addConsoleLogs` - پارامتر اختیاری (به طور پیش‌فرض `false`)، آن را به true تنظیم کنید تا گزارش‌های کنسول از مرحله به گزارشگر پیوست شوند.
- `reportedEnvironmentVars` (**نوع:** `Record<string, string>`) - این گزینه را تنظیم کنید تا متغیرهای محیطی در گزارش نمایش داده شوند. توجه کنید که تنظیم این گزینه، متغیرهای محیطی واقعی را تغییر نمی‌دهد.

## API های آلور پشتیبانی شده
* `addLabel(name, value)` - اختصاص یک برچسب سفارشی به تست
* `addFeature(featureName)` – اختصاص ویژگی‌ها به تست
* `addStory(storyName)` – اختصاص داستان کاربر به تست
* `addSeverity(value)` – اختصاص شدت به تست، یکی از این مقادیر را می‌پذیرد: blocker، critical، normal، minor، trivial
* `addTag(value)` – اختصاص یک برچسب تگ به تست
* `addEpic(value)` – اختصاص یک برچسب حماسه به تست
* `addOwner(value)` – اختصاص یک برچسب مالک به تست
* `addSuite(value)` – اختصاص یک برچسب مجموعه به تست
* `addSubSuite(value)` – اختصاص یک برچسب زیر مجموعه به تست
* `addParentSuite(value)` – اختصاص یک برچسب مجموعه والد به تست
* `addIssue(value)` – اختصاص شناسه مشکل به تست
* `addAllureId(value)` – اختصاص برچسب شناسه عملیات تست آلور به تست
* `addTestId(value)` – اختصاص شناسه تست TMS به تست
* ~~`addEnvironment(name, value)` ~~ – تابع منسوخ شده که دیگر کار نمی‌کند. به جای آن از `reportedEnvironmentVars` استفاده کنید
* `addAttachment(name, content, [type])` – ذخیره پیوست در تست.
    * `name` (*String*) - نام پیوست.
    * `content` – محتوای پیوست.
    * `type` (*String*، اختیاری) – نوع MIME پیوست، به طور پیش‌فرض `text/plain`
* `addArgument(name, value)` - افزودن یک آرگومان اضافی به تست
* `addDescription(description, [type])` – افزودن توضیحات به تست.
    * `description` (*String*) - توضیحات تست.
    * `type` (*String*، اختیاری) – نوع توضیحات، به طور پیش‌فرض `text`. مقادیر ['text', 'html','markdown']
* `addStep(title, [{content, name = 'attachment'}], [status])` - افزودن مرحله به تست.
    * `title` (*String*) - نام مرحله.
    * `content` (*String*، اختیاری) - پیوست مرحله
    * `name` (*String*، اختیاری) - نام پیوست مرحله، به طور پیش‌فرض `attachment`.
    * `status` (*String*، اختیاری) - وضعیت مرحله، به طور پیش‌فرض `passed`. باید "failed"، "passed" یا "broken" باشد
* `startStep(title)` - شروع با یک مرحله
    * `title` (*String*) - نام مرحله.
* `endStep(status)` - پایان با یک مرحله
    * `status` (*String*، اختیاری) - وضعیت مرحله، به طور پیش‌فرض `passed`. باید "failed"، "passed" یا "broken" باشد
* `step(name, body)` - مرحله را با تابع محتوای داخلی شروع می‌کند. اجازه می‌دهد مراحلی با سلسله‌مراتب بی‌نهایت ایجاد کنید
    * `body` (*Function*) - تابع async بدنه مرحله

### استفاده
به API آلور می‌توان با استفاده از موارد زیر دسترسی پیدا کرد:

CJS

```js
const allureReporter = require('@wdio/allure-reporter').default
```

ESM

```js
import allureReporter from '@wdio/allure-reporter'
```

مثال Mocha

```js
describe('Suite', () => {
    it('Case', () => {
        allureReporter.addFeature('Feature')
    })
})
```

#### Cucumber

مثال اولیه Cucumber:

```js
Given('I include feature and story name', () => {
    allureReporter.addFeature('Feature_name');
    allureReporter.addStory('Story_name');
})
```

#### مراحل سفارشی

متد `step` کار با مراحل را ساده‌تر می‌کند زیرا هر مرحله به عنوان یک تابع async با هر محتوایی در داخل آن ارائه می‌شود.
اولین آرگومان تابع، مرحله فعلی است که دارای اکثر متدهای API آلور (مانند `label`، `epic`، `attach` و غیره) است:

```js
allureReporter.step('my step name', async (s1) => {
    s1.label('foo', 'bar')
    await s1.step('my child step name', async (s2) => {
        // you can add any combination of steps in the body function
    })
})
```

##### تگ‌های Cucumber

تگ‌های Cucumber با نام‌های خاص (`issue` و `testId`) به پیوندها تبدیل می‌شوند (الگوی پیوند مربوطه باید از قبل پیکربندی شده باشد):
```gherkin
@issue=BUG-1
@testId=TST-2
Feature: This is a feature with global tags that will be converted to Allure links

  @issue=BUG-3
  @testId=TST-4
  Scenario: This is a scenario with tags that will be converted to Allure links
    Given I do something
```

تگ‌های Cucumber با نام‌های خاص (`feature`) به برچسب‌های آلور نگاشت می‌شوند:

```gherkin
Feature: Test user role

  @feature=login
  Scenario: Login
    Given I test login
```

## نمایش گزارش

نتایج می‌توانند توسط هر یک از [ابزارهای گزارش‌دهی](https://allurereport.org/) ارائه شده توسط آلور مصرف شوند. به عنوان مثال:

### خط فرمان

[ابزار خط فرمان آلور](https://www.npmjs.com/package/allure-commandline) را نصب کنید و دایرکتوری نتایج را پردازش کنید:

```sh
allure generate [allure_output_dir] && allure open
```

این کار یک گزارش تولید می‌کند (به طور پیش‌فرض در `./allure-report`) و آن را در مرورگر شما باز می‌کند.

### تولید خودکار گزارش

شما همچنین می‌توانید با استفاده از ابزار خط فرمان آلور به صورت برنامه‌ای، گزارش را به صورت خودکار تولید کنید. برای این کار بسته را در پروژه خود با دستور زیر نصب کنید:

```sh
npm i allure-commandline
```

سپس هوک `onComplete` خود را اضافه یا گسترش دهید یا یک [سرویس سفارشی](/docs/customservices) برای این کار ایجاد کنید:

```js
// wdio.conf.js
const allure = require('allure-commandline')

export const config = {
    // ...
    onComplete: function() {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    }
    // ...
}
```

### Jenkins

[پلاگین Jenkins آلور](https://allurereport.org/docs/integrations-jenkins/) را نصب و پیکربندی کنید

## افزودن تصاویر صفحه

تصاویر صفحه می‌توانند با استفاده از تابع `takeScreenshot` از WebDriverIO در هوک `afterTest` برای Mocha و Jasmine یا هوک `afterStep` برای Cucumber به گزارش پیوست شوند.
ابتدا `disableWebdriverScreenshotsReporting: false` را در گزینه‌های گزارشگر تنظیم کنید، سپس در هوک afterStep اضافه کنید:

### Mocha / Jasmine

```js title="wdio.conf.js"
afterTest: async function(test, context, { error, result, duration, passed, retries }) {
    if (error) {
        await browser.takeScreenshot();
    }
}
```

### Cucumber

```js title="wdio.conf.js"
afterStep: async function (step, scenario, { error, duration, passed }, context) {
  if (error) {
    await browser.takeScreenshot();
  }
}
```

همانطور که در مثال بالا نشان داده شده است، هنگامی که این تابع فراخوانی می‌شود، یک تصویر از صفحه به گزارش آلور پیوست می‌شود.