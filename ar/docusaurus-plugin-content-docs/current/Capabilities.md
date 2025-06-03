---
id: capabilities
title: القدرات
---

القدرة هي تعريف لواجهة بعيدة. تساعد WebdriverIO على فهم البيئة التي ترغب في تشغيل اختباراتك عليها، سواء كانت متصفح أو بيئة جوال. تعتبر القدرات أقل أهمية عند تطوير الاختبارات محليًا حيث تقوم بتشغيلها على واجهة بعيدة واحدة في معظم الأوقات، ولكنها تصبح أكثر أهمية عند تشغيل مجموعة كبيرة من اختبارات التكامل في CI/CD.

:::info

تم تعريف تنسيق كائن القدرة بشكل جيد بواسطة [مواصفات WebDriver](https://w3c.github.io/webdriver/#capabilities). سيفشل مشغل الاختبار WebdriverIO مبكرًا إذا كانت القدرات المحددة من قِبل المستخدم لا تلتزم بتلك المواصفات.

:::

## القدرات المخصصة

في حين أن عدد القدرات المحددة الثابتة منخفض جدًا، يمكن للجميع توفير وقبول قدرات مخصصة خاصة بمشغل الأتمتة أو الواجهة البعيدة:

### امتدادات القدرات الخاصة بالمتصفح

- `goog:chromeOptions`: امتدادات [Chromedriver](https://chromedriver.chromium.org/capabilities)، قابلة للتطبيق فقط للاختبار في Chrome
- `moz:firefoxOptions`: امتدادات [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)، قابلة للتطبيق فقط للاختبار في Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) لتحديد البيئة عند استخدام EdgeDriver لاختبار Chromium Edge

### امتدادات القدرات لموفري الخدمات السحابية

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- والعديد من الخيارات الأخرى...

### امتدادات القدرات لمحركات الأتمتة

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- والعديد من الخيارات الأخرى...

### قدرات WebdriverIO لإدارة خيارات مشغل المتصفح

تقوم WebdriverIO بإدارة تثبيت وتشغيل مشغل المتصفح نيابة عنك. تستخدم WebdriverIO قدرة مخصصة تسمح لك بتمرير معلمات إلى المشغل.

#### `wdio:chromedriverOptions`

خيارات محددة يتم تمريرها إلى Chromedriver عند بدء تشغيله.

#### `wdio:geckodriverOptions`

خيارات محددة يتم تمريرها إلى Geckodriver عند بدء تشغيله.

#### `wdio:edgedriverOptions`

خيارات محددة يتم تمريرها إلى Edgedriver عند بدء تشغيله.

#### `wdio:safaridriverOptions`

خيارات محددة يتم تمريرها إلى Safari عند بدء تشغيله.

#### `wdio:maxInstances`

الحد الأقصى لعدد العمال المتوازيين التي تعمل بشكل إجمالي للمتصفح/القدرة المحددة. يأخذ الأسبقية على [maxInstances](#configuration#maxInstances) و [maxInstancesPerCapability](configuration/#maxinstancespercapability).

النوع: `number`

#### `wdio:specs`

تحديد المواصفات لتنفيذ الاختبار لهذا المتصفح/القدرة. نفس [خيار التكوين العادي `specs`](configuration#specs)، ولكن محدد للمتصفح/القدرة. يأخذ الأسبقية على `specs`.

النوع: `(String | String[])[]`

#### `wdio:exclude`

استبعاد المواصفات من تنفيذ الاختبار لهذا المتصفح/القدرة. نفس [خيار التكوين العادي `exclude`](configuration#exclude)، ولكن محدد للمتصفح/القدرة. يأخذ الأسبقية على `exclude`.

النوع: `String[]`

#### `wdio:enforceWebDriverClassic`

بشكل افتراضي، تحاول WebdriverIO إنشاء جلسة WebDriver Bidi. إذا كنت لا تفضل ذلك، يمكنك تعيين هذه العلامة لتعطيل هذا السلوك.

النوع: `boolean`

#### خيارات المشغل الشائعة

في حين أن جميع المشغلات تقدم معلمات مختلفة للتكوين، هناك بعض الخيارات المشتركة التي تفهمها WebdriverIO وتستخدمها لإعداد المشغل أو المتصفح:

##### `cacheDir`

المسار إلى جذر دليل التخزين المؤقت. يستخدم هذا الدليل لتخزين جميع المشغلات التي يتم تنزيلها عند محاولة بدء جلسة.

النوع: `string`<br />
الافتراضي: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

المسار إلى ملف مشغل مخصص. إذا تم تعيينه، لن تحاول WebdriverIO تنزيل مشغل ولكنها ستستخدم المشغل المقدم بواسطة هذا المسار. تأكد من أن المشغل متوافق مع المتصفح الذي تستخدمه.

يمكنك توفير هذا المسار عبر متغيرات البيئة `CHROMEDRIVER_PATH` أو `GECKODRIVER_PATH` أو `EDGEDRIVER_PATH`.

النوع: `string`

:::caution

إذا تم تعيين `binary` للمشغل، فلن تحاول WebdriverIO تنزيل مشغل ولكنها ستستخدم المشغل المقدم بواسطة هذا المسار. تأكد من أن المشغل متوافق مع المتصفح الذي تستخدمه.

:::

#### خيارات المشغل الخاصة بالمتصفح

لنشر الخيارات إلى المشغل، يمكنك استخدام القدرات المخصصة التالية:

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
المنفذ الذي يجب أن يعمل عليه مشغل ADB.

مثال: `9515`

النوع: `number`

##### urlBase
بادئة مسار URL الأساسي للأوامر، مثل `wd/url`.

مثال: `/`

النوع: `string`

##### logPath
كتابة سجل الخادم إلى ملف بدلاً من stderr، يزيد مستوى السجل إلى `INFO`

النوع: `string`

##### logLevel
تعيين مستوى السجل. الخيارات الممكنة `ALL`، `DEBUG`، `INFO`، `WARNING`، `SEVERE`، `OFF`.

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
تسجيل مطول وعدم اقتطاع السلاسل الطويلة حتى يمكن إعادة تشغيل السجل (تجريبي).

النوع: `boolean`

##### readableTimestamp
إضافة طوابع زمنية قابلة للقراءة إلى السجل.

النوع: `boolean`

##### enableChromeLogs
إظهار سجلات من المتصفح (يتجاوز خيارات التسجيل الأخرى).

النوع: `boolean`

##### bidiMapperPath
مسار مخصص لخريطة bidi.

النوع: `string`

##### allowedIps
قائمة مسموح بها من عناوين IP البعيدة المسموح لها بالاتصال بـ EdgeDriver، مفصولة بفواصل.

النوع: `string[]`<br />
الافتراضي: `['']`

##### allowedOrigins
قائمة مسموح بها من أصول الطلبات المسموح لها بالاتصال بـ EdgeDriver، مفصولة بفواصل. استخدام `*` للسماح بأي أصل مضيف خطير!

النوع: `string[]`<br />
الافتراضي: `['*']`

##### spawnOpts
الخيارات التي سيتم تمريرها إلى عملية المشغل.

النوع: `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
الافتراضي: `undefined`

</TabItem>
<TabItem value="firefox">

راجع جميع خيارات Geckodriver في [حزمة المشغل](https://github.com/webdriverio-community/node-geckodriver#options) الرسمية.

</TabItem>
<TabItem value="msedge">

راجع جميع خيارات Edgedriver في [حزمة المشغل](https://github.com/webdriverio-community/node-edgedriver#options) الرسمية.

</TabItem>
<TabItem value="safari">

راجع جميع خيارات Safaridriver في [حزمة المشغل](https://github.com/webdriverio-community/node-safaridriver#options) الرسمية.

</TabItem>
</Tabs>

## قدرات خاصة لحالات استخدام محددة

هذه قائمة بالأمثلة التي توضح القدرات التي يجب تطبيقها لتحقيق حالة استخدام معينة.

### تشغيل المتصفح بوضع Headless

تشغيل المتصفح بوضع headless يعني تشغيل نسخة من المتصفح بدون نافذة أو واجهة مستخدم. يستخدم هذا غالبًا في بيئات CI/CD حيث لا يتم استخدام شاشة عرض. لتشغيل متصفح في وضع headless، قم بتطبيق القدرات التالية:

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

يبدو أن Safari [لا يدعم](https://discussions.apple.com/thread/251837694) التشغيل في وضع headless.

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

عند الاختبار على Chrome، ستقوم WebdriverIO تلقائيًا بتنزيل إصدار المتصفح والمشغل المطلوبين استنادًا إلى `browserVersion` المحدد، على سبيل المثال:

```ts
{
    browserName: 'chrome', // or 'chromium'
    browserVersion: '116' // or '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' or 'latest' (same as 'canary')
}
```

إذا كنت ترغب في اختبار متصفح تم تنزيله يدويًا، يمكنك توفير مسار ثنائي إلى المتصفح عبر:

```ts
{
    browserName: 'chrome',  // or 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

بالإضافة إلى ذلك، إذا كنت ترغب في استخدام مشغل تم تنزيله يدويًا، يمكنك توفير مسار ثنائي إلى المشغل عبر:

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

عند الاختبار على Firefox، ستقوم WebdriverIO تلقائيًا بتنزيل إصدار المتصفح والمشغل المطلوبين استنادًا إلى `browserVersion` المحدد، على سبيل المثال:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // or 'latest'
}
```

إذا كنت ترغب في اختبار إصدار تم تنزيله يدويًا، يمكنك توفير مسار ثنائي إلى المتصفح عبر:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

بالإضافة إلى ذلك، إذا كنت ترغب في استخدام مشغل تم تنزيله يدويًا، يمكنك توفير مسار ثنائي إلى المشغل عبر:

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

ستقوم WebdriverIO تلقائيًا بتنزيل إصدار المشغل المطلوب استنادًا إلى `browserVersion` المحدد، على سبيل المثال:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // or '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

بالإضافة إلى ذلك، إذا كنت ترغب في استخدام مشغل تم تنزيله يدويًا، يمكنك توفير مسار ثنائي إلى المشغل عبر:

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

عند الاختبار على Safari، تأكد من تثبيت [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) على جهازك. يمكنك توجيه WebdriverIO إلى ذلك الإصدار عبر:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## توسيع القدرات المخصصة

إذا كنت ترغب في تعريف مجموعتك الخاصة من القدرات، على سبيل المثال، لتخزين بيانات عشوائية لاستخدامها داخل الاختبارات لتلك القدرة المحددة، يمكنك القيام بذلك على سبيل المثال عن طريق تعيين:

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

يُنصح باتباع [بروتوكول W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) عندما يتعلق الأمر بتسمية القدرات، والذي يتطلب حرف `:` (نقطتان)، مما يشير إلى مساحة اسم خاصة بالتنفيذ. داخل اختباراتك، يمكنك الوصول إلى القدرة المخصصة من خلال، على سبيل المثال:

```ts
browser.capabilities['custom:caps']
```

لضمان سلامة النوع، يمكنك توسيع واجهة قدرات WebdriverIO عبر:

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