---
id: capabilities
title: القدرات
---

القدرة هي تعريف لواجهة التحكم عن بعد. وهي تساعد WebdriverIO على فهم البيئة المتصفحية أو المحمولة التي ترغب في تشغيل اختباراتك عليها. تعتبر القدرات أقل أهمية عند تطوير الاختبارات محليًا لأنك تقوم بتشغيلها على واجهة تحكم واحدة في معظم الأوقات، لكنها تصبح أكثر أهمية عند تشغيل مجموعة كبيرة من اختبارات التكامل في CI/CD.

:::info

تم تحديد تنسيق كائن القدرة بشكل جيد بواسطة [مواصفات WebDriver](https://w3c.github.io/webdriver/#capabilities). سيفشل testrunner الخاص بـ WebdriverIO مبكرًا إذا لم تلتزم القدرات التي يحددها المستخدم بهذه المواصفات.

:::

## القدرات المخصصة

بينما يكون عدد القدرات المحددة الثابتة منخفضًا جدًا، يمكن للجميع توفير وقبول قدرات مخصصة خاصة بسائق الأتمتة أو واجهة التحكم عن بعد:

### امتدادات القدرات الخاصة بالمتصفح

- `goog:chromeOptions`: امتدادات [Chromedriver](https://chromedriver.chromium.org/capabilities)، قابلة للتطبيق فقط للاختبار في Chrome
- `moz:firefoxOptions`: امتدادات [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)، قابلة للتطبيق فقط للاختبار في Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) لتحديد البيئة عند استخدام EdgeDriver لاختبار Chromium Edge

### امتدادات قدرات مزودي الخدمات السحابية

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- `LT:Options`: [LambdaTest](https://www.lambdatest.com/support/docs/webdriverio-with-selenium-running-webdriverio-automation-scripts-on-lambdatest-selenium-grid/)
- والعديد غيرها...

### امتدادات قدرات محرك الأتمتة

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- والعديد غيرها...

### قدرات WebdriverIO لإدارة خيارات سائق المتصفح

يدير WebdriverIO تثبيت وتشغيل سائق المتصفح نيابة عنك. يستخدم WebdriverIO قدرة مخصصة تسمح لك بتمرير معلمات إلى السائق.

#### `wdio:chromedriverOptions`

خيارات محددة تمرر إلى Chromedriver عند بدء تشغيله.

#### `wdio:geckodriverOptions`

خيارات محددة تمرر إلى Geckodriver عند بدء تشغيله.

#### `wdio:edgedriverOptions`

خيارات محددة تمرر إلى Edgedriver عند بدء تشغيله.

#### `wdio:safaridriverOptions`

خيارات محددة تمرر إلى Safari عند بدء تشغيله.

#### `wdio:maxInstances`

الحد الأقصى لعدد العمليات المتوازية الإجمالية للمتصفح/القدرة المحددة. يأخذ الأسبقية على [maxInstances](#configuration#maxInstances) و [maxInstancesPerCapability](configuration/#maxinstancespercapability).

النوع: `number`

#### `wdio:specs`

تحديد المواصفات لتنفيذ الاختبار لذلك المتصفح/القدرة. مثل [خيار التكوين العادي `specs`](configuration#specs)، ولكن خاص بالمتصفح/القدرة. يأخذ الأسبقية على `specs`.

النوع: `(String | String[])[]`

#### `wdio:exclude`

استبعاد المواصفات من تنفيذ الاختبار لذلك المتصفح/القدرة. مثل [خيار التكوين العادي `exclude`](configuration#exclude)، ولكن خاص بالمتصفح/القدرة. يتم الاستبعاد بعد تطبيق خيار التكوين العام `exclude`.

النوع: `String[]`

#### `wdio:enforceWebDriverClassic`

افتراضيًا، يحاول WebdriverIO إنشاء جلسة WebDriver Bidi. إذا كنت لا تفضل ذلك، يمكنك تعيين هذه العلامة لتعطيل هذا السلوك.

النوع: `boolean`

#### خيارات السائق الشائعة

بينما تقدم جميع برامج التشغيل معلمات مختلفة للتكوين، هناك بعض الخيارات المشتركة التي يفهمها WebdriverIO ويستخدمها لإعداد برنامج التشغيل أو المتصفح الخاص بك:

##### `cacheDir`

المسار إلى جذر دليل التخزين المؤقت. يستخدم هذا الدليل لتخزين جميع برامج التشغيل التي يتم تنزيلها عند محاولة بدء جلسة.

النوع: `string`<br />
الافتراضي: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

المسار إلى ملف ثنائي لبرنامج تشغيل مخصص. إذا تم تعيينه، لن يحاول WebdriverIO تنزيل برنامج تشغيل ولكنه سيستخدم البرنامج الذي يوفره هذا المسار. تأكد من أن برنامج التشغيل متوافق مع المتصفح الذي تستخدمه.

يمكنك توفير هذا المسار عبر متغيرات البيئة `CHROMEDRIVER_PATH` أو `GECKODRIVER_PATH` أو `EDGEDRIVER_PATH`.

النوع: `string`

:::caution

إذا تم تعيين `binary` لبرنامج التشغيل، فلن يحاول WebdriverIO تنزيل برنامج تشغيل ولكنه سيستخدم البرنامج الذي يوفره هذا المسار. تأكد من أن برنامج التشغيل متوافق مع المتصفح الذي تستخدمه.

:::

#### خيارات برنامج التشغيل الخاصة بالمتصفح

لنشر الخيارات إلى برنامج التشغيل، يمكنك استخدام القدرات المخصصة التالية:

- Chrome أو Chromium: `wdio:chromedriverOptions`
- Firefox: `wdio:geckodriverOptions`
- Microsoft Edge: `wdio:edgedriverOptions`
- Safari: `wdio:safaridriverOptions`

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'wdio:chromedriverOptions', value: 'chrome'},
    {label: 'wdio:geckodriverOptions', value: 'firefox'},
    {label: 'wdio:edgedriverOptions', value: 'msedge'},
    {label: 'wdio:safaridriverOptions', value: 'safari'},
  ]
}>
<TabItem value="chrome">

##### adbPort
المنفذ الذي يجب أن يعمل عليه برنامج تشغيل ADB.

مثال: `9515`

النوع: `number`

##### urlBase
بادئة مسار URL الأساسي للأوامر، مثل `wd/url`.

مثال: `/`

النوع: `string`

##### logPath
كتابة سجل الخادم إلى ملف بدلاً من stderr، يزيد من مستوى السجل إلى `INFO`

النوع: `string`

##### logLevel
تعيين مستوى السجل. الخيارات الممكنة هي `ALL` و`DEBUG` و`INFO` و`WARNING` و`SEVERE` و`OFF`.

النوع: `string`

##### verbose
تسجيل مطول (مكافئ لـ `--log-level=ALL`)

النوع: `boolean`

##### silent
عدم تسجيل أي شيء (مكافئ لـ `--log-level=OFF`)

النوع: `boolean`

##### appendLog
إضافة ملف السجل بدلاً من إعادة كتابته.

النوع: `boolean`

##### replayable
تسجيل مطول وعدم اقتطاع السلاسل الطويلة بحيث يمكن إعادة تشغيل السجل (تجريبي).

النوع: `boolean`

##### readableTimestamp
إضافة طوابع زمنية قابلة للقراءة إلى السجل.

النوع: `boolean`

##### enableChromeLogs
عرض السجلات من المتصفح (يلغي خيارات التسجيل الأخرى).

النوع: `boolean`

##### bidiMapperPath
مسار مخصص لخريطة bidi.

النوع: `string`

##### allowedIps
قائمة مسموح بها مفصولة بفواصل من عناوين IP البعيدة التي يُسمح لها بالاتصال بـ EdgeDriver.

النوع: `string[]`<br />
الافتراضي: `['']`

##### allowedOrigins
قائمة مسموح بها مفصولة بفواصل من أصول الطلب التي يُسمح لها بالاتصال بـ EdgeDriver. استخدام `*` للسماح بأي أصل مضيف أمر خطير!

النوع: `string[]`<br />
الافتراضي: `['*']`

##### spawnOpts
الخيارات التي سيتم تمريرها إلى عملية برنامج التشغيل.

النوع: `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
الافتراضي: `undefined`

</TabItem>
<TabItem value="firefox">

راجع جميع خيارات Geckodriver في [حزمة برنامج التشغيل](https://github.com/webdriverio-community/node-geckodriver#options) الرسمية.

</TabItem>
<TabItem value="msedge">

راجع جميع خيارات Edgedriver في [حزمة برنامج التشغيل](https://github.com/webdriverio-community/node-edgedriver#options) الرسمية.

</TabItem>
<TabItem value="safari">

راجع جميع خيارات Safaridriver في [حزمة برنامج التشغيل](https://github.com/webdriverio-community/node-safaridriver#options) الرسمية.

</TabItem>
</Tabs>

## القدرات الخاصة لحالات الاستخدام المحددة

هذه قائمة بالأمثلة التي توضح القدرات التي يجب تطبيقها لتحقيق حالة استخدام معينة.

### تشغيل المتصفح بدون واجهة رسومية

تشغيل متصفح بدون واجهة رسومية يعني تشغيل نسخة من المتصفح بدون نافذة أو واجهة مستخدم. يتم استخدام هذا غالبًا في بيئات CI/CD حيث لا يتم استخدام شاشة عرض. لتشغيل متصفح في وضع بدون واجهة رسومية، قم بتطبيق القدرات التالية:

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

```ts
{
    browserName: 'chrome',   // or 'chromium'
    'goog:chromeOptions': {
        args: ['headless', 'disable-gpu']
    }
}
```

</TabItem>
<TabItem value="firefox">

```ts
    browserName: 'firefox',
    'moz:firefoxOptions': {
        args: ['-headless']
    }
```

</TabItem>
<TabItem value="msedge">

```ts
    browserName: 'msedge',
    'ms:edgeOptions': {
        args: ['--headless']
    }
```

</TabItem>
<TabItem value="safari">

يبدو أن Safari [لا يدعم](https://discussions.apple.com/thread/251837694) التشغيل في وضع بدون واجهة رسومية.

</TabItem>
</Tabs>

### أتمتة قنوات المتصفح المختلفة

إذا كنت ترغب في اختبار إصدار متصفح لم يتم إصداره بعد كإصدار مستقر، مثل Chrome Canary، يمكنك القيام بذلك عن طريق تعيين القدرات والإشارة إلى المتصفح الذي ترغب في بدء تشغيله، على سبيل المثال:

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

عند الاختبار على Chrome، سيقوم WebdriverIO تلقائيًا بتنزيل إصدار المتصفح وبرنامج التشغيل المطلوبين لك بناءً على `browserVersion` المحدد، على سبيل المثال:

```ts
{
    browserName: 'chrome', // or 'chromium'
    browserVersion: '116' // or '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' or 'latest' (same as 'canary')
}
```

إذا كنت ترغب في اختبار متصفح تم تنزيله يدويًا، يمكنك توفير مسار ثنائي للمتصفح عبر:

```ts
{
    browserName: 'chrome',  // or 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

بالإضافة إلى ذلك، إذا كنت ترغب في استخدام برنامج تشغيل تم تنزيله يدويًا، يمكنك توفير مسار ثنائي لبرنامج التشغيل عبر:

```ts
{
    browserName: 'chrome', // or 'chromium'
    'wdio:chromedriverOptions': {
        binary: '/path/to/chromdriver'
    }
}
```

</TabItem>
<TabItem value="firefox">

عند الاختبار على Firefox، سيقوم WebdriverIO تلقائيًا بتنزيل إصدار المتصفح وبرنامج التشغيل المطلوبين لك بناءً على `browserVersion` المحدد، على سبيل المثال:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // or 'latest'
}
```

إذا كنت ترغب في اختبار إصدار تم تنزيله يدويًا، يمكنك توفير مسار ثنائي للمتصفح عبر:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

بالإضافة إلى ذلك، إذا كنت ترغب في استخدام برنامج تشغيل تم تنزيله يدويًا، يمكنك توفير مسار ثنائي لبرنامج التشغيل عبر:

```ts
{
    browserName: 'firefox',
    'wdio:geckodriverOptions': {
        binary: '/path/to/geckodriver'
    }
}
```

</TabItem>
<TabItem value="msedge">

عند الاختبار على Microsoft Edge، تأكد من تثبيت إصدار المتصفح المطلوب على جهازك. يمكنك توجيه WebdriverIO إلى المتصفح لتنفيذه عبر:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

سيقوم WebdriverIO تلقائيًا بتنزيل إصدار برنامج التشغيل المطلوب لك بناءً على `browserVersion` المحدد، على سبيل المثال:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // or '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

بالإضافة إلى ذلك، إذا كنت ترغب في استخدام برنامج تشغيل تم تنزيله يدويًا، يمكنك توفير مسار ثنائي لبرنامج التشغيل عبر:

```ts
{
    browserName: 'msedge',
    'wdio:edgedriverOptions': {
        binary: '/path/to/msedgedriver'
    }
}
```

</TabItem>
<TabItem value="safari">

عند الاختبار على Safari، تأكد من تثبيت [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) على جهازك. يمكنك توجيه WebdriverIO إلى هذا الإصدار عبر:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## توسيع القدرات المخصصة

إذا كنت ترغب في تحديد مجموعتك الخاصة من القدرات من أجل، على سبيل المثال، تخزين بيانات عشوائية لاستخدامها داخل الاختبارات لتلك القدرة المحددة، يمكنك القيام بذلك عن طريق تعيين:

```js title=wdio.conf.ts
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'custom:caps': {
            // custom configurations
        }
    }]
}
```

يُنصح باتباع [بروتوكول W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) عندما يتعلق الأمر بتسمية القدرات، والذي يتطلب حرف `:` (نقطتين)، مشيرًا إلى مساحة اسم خاصة بالتنفيذ. ضمن اختباراتك يمكنك الوصول إلى القدرة المخصصة الخاصة بك من خلال:

```ts
browser.capabilities['custom:caps']
```

لضمان سلامة النوع، يمكنك توسيع واجهة قدرة WebdriverIO عبر:

```ts
declare global {
    namespace WebdriverIO {
        interface Capabilities {
            'custom:caps': {
                // ...
            }
        }
    }
}
```