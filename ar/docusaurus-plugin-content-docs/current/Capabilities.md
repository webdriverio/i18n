---
id: capabilities
title: القدرات
---

القدرة هي تعريف لواجهة عن بعد. تساعد WebdriverIO على فهم البيئة التي ترغب في تشغيل اختباراتك عليها، سواء كانت متصفح أو بيئة جوال. تعتبر القدرات أقل أهمية عند تطوير الاختبارات محليًا لأنك غالبًا ما تقوم بتشغيلها على واجهة عن بعد واحدة معظم الوقت، ولكنها تصبح أكثر أهمية عند تشغيل مجموعة كبيرة من اختبارات التكامل في CI/CD.

:::info

تم تعريف تنسيق كائن القدرة بشكل جيد من قبل [مواصفات WebDriver](https://w3c.github.io/webdriver/#capabilities). سيفشل مشغل اختبار WebdriverIO مبكرًا إذا لم تلتزم القدرات المحددة من قبل المستخدم بتلك المواصفات.

:::

## القدرات المخصصة

في حين أن عدد القدرات المحددة بشكل ثابت منخفض جدًا، يمكن للجميع توفير وقبول قدرات مخصصة خاصة بمشغل الأتمتة أو الواجهة عن بعد:

### امتدادات القدرات الخاصة بالمتصفح

- `goog:chromeOptions`: امتدادات [Chromedriver](https://chromedriver.chromium.org/capabilities)، قابلة للتطبيق فقط للاختبار في Chrome
- `moz:firefoxOptions`: امتدادات [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)، قابلة للتطبيق فقط للاختبار في Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) لتحديد البيئة عند استخدام EdgeDriver لاختبار Chromium Edge

### امتدادات القدرات لمزودي الخدمات السحابية

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- والعديد من الخيارات الأخرى...

### امتدادات القدرات لمحركات الأتمتة

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- والعديد من الخيارات الأخرى...

### قدرات WebdriverIO لإدارة خيارات مشغل المتصفح

تقوم WebdriverIO بإدارة تثبيت وتشغيل مشغل المتصفح نيابة عنك. تستخدم WebdriverIO قدرة مخصصة تتيح لك تمرير معلمات إلى المشغل.

#### `wdio:chromedriverOptions`

خيارات محددة يتم تمريرها إلى Chromedriver عند بدء تشغيله.

#### `wdio:geckodriverOptions`

خيارات محددة يتم تمريرها إلى Geckodriver عند بدء تشغيله.

#### `wdio:edgedriverOptions`

خيارات محددة يتم تمريرها إلى Edgedriver عند بدء تشغيله.

#### `wdio:safaridriverOptions`

خيارات محددة يتم تمريرها إلى Safari عند بدء تشغيله.

#### `wdio:maxInstances`

الحد الأقصى لعدد العمال المتوازية الإجمالية للمتصفح/القدرة المحددة. لها الأولوية على [maxInstances](#configuration#maxInstances) و [maxInstancesPerCapability](configuration/#maxinstancespercapability).

النوع: `number`

#### `wdio:specs`

تحديد المواصفات لتنفيذ الاختبار لذلك المتصفح/القدرة. مماثل لخيار التكوين العادي [`specs`](configuration#specs)، ولكنه خاص بالمتصفح/القدرة. له الأولوية على `specs`.

النوع: `(String | String[])[]`

#### `wdio:exclude`

استبعاد المواصفات من تنفيذ الاختبار لذلك المتصفح/القدرة. مماثل لخيار التكوين العادي [`exclude`](configuration#exclude)، ولكنه خاص بالمتصفح/القدرة. يتم الاستبعاد بعد تطبيق خيار التكوين العام `exclude`.

النوع: `String[]`

#### `wdio:enforceWebDriverClassic`

بشكل افتراضي، تحاول WebdriverIO إنشاء جلسة WebDriver Bidi. إذا كنت لا تفضل ذلك، يمكنك تعيين هذه العلامة لتعطيل هذا السلوك.

النوع: `boolean`

#### خيارات المشغل الشائعة

بينما تقدم جميع المشغلات معلمات مختلفة للتكوين، هناك بعض المعلمات المشتركة التي تفهمها WebdriverIO وتستخدمها لإعداد المشغل أو المتصفح الخاص بك:

##### `cacheDir`

المسار إلى جذر دليل التخزين المؤقت. يتم استخدام هذا الدليل لتخزين جميع المشغلات التي يتم تنزيلها عند محاولة بدء جلسة.

النوع: `string`<br />
الافتراضي: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

المسار إلى ملف ثنائي للمشغل المخصص. إذا تم تعيينه، فلن تحاول WebdriverIO تنزيل مشغل ولكنها ستستخدم المشغل المقدم بواسطة هذا المسار. تأكد من أن المشغل متوافق مع المتصفح الذي تستخدمه.

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
تسجيل مطول وعدم اقتطاع السلاسل النصية الطويلة بحيث يمكن إعادة تشغيل السجل (تجريبي).

النوع: `boolean`

##### readableTimestamp
إضافة طوابع زمنية مقروءة إلى السجل.

النوع: `boolean`

##### enableChromeLogs
عرض السجلات من المتصفح (يتجاوز خيارات التسجيل الأخرى).

النوع: `boolean`

##### bidiMapperPath
مسار مخصص لمخطط bidi.

النوع: `string`

##### allowedIps
قائمة مسموح بها مفصولة بفواصل لعناوين IP البعيدة المسموح لها بالاتصال بـ EdgeDriver.

النوع: `string[]`<br />
الافتراضي: `['']`

##### allowedOrigins
قائمة مسموح بها مفصولة بفواصل لأصول الطلبات المسموح لها بالاتصال بـ EdgeDriver. استخدام `*` للسماح بأي أصل مضيف يعتبر خطيرًا!

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

### تشغيل المتصفح بدون واجهة

يعني تشغيل متصفح بدون واجهة تشغيل نسخة من المتصفح بدون نافذة أو واجهة مستخدم. يستخدم هذا في الغالب في بيئات CI/CD حيث لا يتم استخدام شاشة عرض. لتشغيل متصفح في وضع بدون واجهة، قم بتطبيق القدرات التالية:

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
    browserName: 'chrome',   // أو 'chromium'
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

يبدو أن Safari [لا يدعم](https://discussions.apple.com/thread/251837694) التشغيل في وضع بدون واجهة.

</TabItem>
</Tabs>

### أتمتة قنوات متصفح مختلفة

إذا كنت ترغب في اختبار إصدار متصفح لم يتم إصداره بعد كإصدار مستقر، مثل Chrome Canary، يمكنك القيام بذلك عن طريق تعيين القدرات والإشارة إلى المتصفح الذي ترغب في بدئه، على سبيل المثال:

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

عند الاختبار على Chrome، ستقوم WebdriverIO تلقائيًا بتنزيل إصدار المتصفح والمشغل المطلوبين لك بناءً على `browserVersion` المحدد، على سبيل المثال:

```ts
{
    browserName: 'chrome', // أو 'chromium'
    browserVersion: '116' // أو '116.0.5845.96'، 'stable'، 'dev'، 'canary'، 'beta' أو 'latest' (نفس 'canary')
}
```

إذا كنت ترغب في اختبار متصفح تم تنزيله يدويًا، يمكنك توفير مسار ثنائي للمتصفح عبر:

```ts
{
    browserName: 'chrome',  // أو 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

بالإضافة إلى ذلك، إذا كنت ترغب في استخدام مشغل تم تنزيله يدويًا، يمكنك توفير مسار ثنائي للمشغل عبر:

```ts
{
    browserName: 'chrome', // أو 'chromium'
    'wdio:chromedriverOptions': {
        binary: '/path/to/chromdriver'
    }
}
```

</TabItem>
<TabItem value="firefox">

عند الاختبار على Firefox، ستقوم WebdriverIO تلقائيًا بتنزيل إصدار المتصفح والمشغل المطلوبين لك بناءً على `browserVersion` المحدد، على سبيل المثال:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // أو 'latest'
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

بالإضافة إلى ذلك، إذا كنت ترغب في استخدام مشغل تم تنزيله يدويًا، يمكنك توفير مسار ثنائي للمشغل عبر:

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

عند الاختبار على Microsoft Edge، تأكد من تثبيت إصدار المتصفح المطلوب على جهازك. يمكنك توجيه WebdriverIO إلى المتصفح المراد تنفيذه عبر:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

ستقوم WebdriverIO تلقائيًا بتنزيل إصدار المشغل المطلوب لك بناءً على `browserVersion` المحدد، على سبيل المثال:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // أو '109.0.1467.0'، 'stable'، 'dev'، 'canary'، 'beta'
}
```

بالإضافة إلى ذلك، إذا كنت ترغب في استخدام مشغل تم تنزيله يدويًا، يمكنك توفير مسار ثنائي للمشغل عبر:

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

إذا كنت ترغب في تعريف مجموعتك الخاصة من القدرات من أجل تخزين بيانات عشوائية لاستخدامها داخل الاختبارات لتلك القدرة المحددة، يمكنك القيام بذلك عن طريق تعيين:

```js title=wdio.conf.ts
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'custom:caps': {
            // التكوينات المخصصة
        }
    }]
}
```

يُنصح باتباع [بروتوكول W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) عندما يتعلق الأمر بتسمية القدرة التي تتطلب حرف `:` (نقطتين)، والذي يشير إلى مساحة اسم خاصة بالتنفيذ. داخل اختباراتك، يمكنك الوصول إلى قدرتك المخصصة من خلال:

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