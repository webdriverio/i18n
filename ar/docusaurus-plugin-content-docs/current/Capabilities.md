---
id: capabilities
title: القدرات
description: "حدّد القدرات لاختيار بيئة المتصفح أو الجوال التي تعمل فيها اختباراتك، بما في ذلك قدرات المورّدين المخصصة وحالات الاستخدام الخاصة."
---

القدرة (capability) هي تعريف لواجهة بعيدة. تساعد WebdriverIO على فهم المتصفح أو بيئة الجوال التي ترغب في تشغيل اختباراتك عليها. تكون القدرات أقل أهمية عند تطوير الاختبارات محليًا لأنك تشغلها على واجهة بعيدة واحدة في معظم الأحيان، لكنها تصبح أكثر أهمية عند تشغيل مجموعة كبيرة من اختبارات التكامل في CI/CD.

:::info

تنسيق كائن القدرة محدد بشكل جيد في [مواصفات WebDriver](https://w3c.github.io/webdriver/#capabilities). سيفشل مشغل اختبارات WebdriverIO مبكرًا إذا لم تلتزم القدرات التي يحددها المستخدم بتلك المواصفات.

:::

## القدرات المخصصة

بينما يكون عدد القدرات المعرّفة الثابتة منخفضًا جدًا، يمكن لأي شخص توفير وقبول قدرات مخصصة خاصة بمشغل الأتمتة أو الواجهة البعيدة:

### امتدادات القدرات الخاصة بالمتصفح

- `goog:chromeOptions`: امتدادات [Chromedriver](https://chromedriver.chromium.org/capabilities)، قابلة للتطبيق فقط للاختبار في Chrome
- `moz:firefoxOptions`: امتدادات [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)، قابلة للتطبيق فقط للاختبار في Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) لتحديد البيئة عند استخدام EdgeDriver لاختبار Chromium Edge

### امتدادات القدرات الخاصة بمورّدي الخدمات السحابية

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- `LT:Options`: [LambdaTest](https://www.lambdatest.com/support/docs/webdriverio-with-selenium-running-webdriverio-automation-scripts-on-lambdatest-selenium-grid/)
- وغيرها الكثير...

### امتدادات القدرات الخاصة بمحركات الأتمتة

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- وغيرها الكثير...

### قدرات WebdriverIO لإدارة خيارات مشغل المتصفح

تتولى WebdriverIO تثبيت مشغل المتصفح وتشغيله نيابةً عنك. تستخدم WebdriverIO قدرة مخصصة تتيح لك تمرير معاملات إلى المشغل.

#### `wdio:chromedriverOptions`

خيارات محددة تُمرَّر إلى Chromedriver عند بدء تشغيله.

#### `wdio:geckodriverOptions`

خيارات محددة تُمرَّر إلى Geckodriver عند بدء تشغيله.

#### `wdio:edgedriverOptions`

خيارات محددة تُمرَّر إلى Edgedriver عند بدء تشغيله.

#### `wdio:safaridriverOptions`

خيارات محددة تُمرَّر إلى Safari عند بدء تشغيله.

#### `wdio:maxInstances`

<Option type="number">

الحد الأقصى لإجمالي العمّال (workers) الذين يعملون بالتوازي للمتصفح/القدرة المحددة. له الأولوية على [maxInstances](#configuration#maxInstances) و[maxInstancesPerCapability](configuration/#maxinstancespercapability).

</Option>

#### `wdio:specs`

<Option type="(String | String[])[]">

حدّد ملفات المواصفات (specs) لتنفيذ الاختبارات لذلك المتصفح/القدرة. مماثل [لخيار التكوين `specs` العادي](configuration#specs)، لكنه خاص بالمتصفح/القدرة. له الأولوية على `specs`.

</Option>

#### `wdio:exclude`

<Option type="String[]">

استبعد ملفات المواصفات من تنفيذ الاختبارات لذلك المتصفح/القدرة. مماثل [لخيار التكوين `exclude` العادي](configuration#exclude)، لكنه خاص بالمتصفح/القدرة. يتم الاستبعاد بعد تطبيق خيار التكوين العام `exclude`.

</Option>

#### `wdio:enforceWebDriverClassic`

<Option type="boolean">

افتراضيًا، تحاول WebdriverIO إنشاء جلسة WebDriver Bidi. إذا كنت لا تفضل ذلك، يمكنك تعيين هذه العلامة لتعطيل هذا السلوك.

</Option>

#### `wdio:electronVersion`

<Option type="string">

ينزّل Chromedriver المضمّن مع إصدار Electron هذا بدلًا من ذلك الموجود في Chrome for Testing، وذلك لاختبار تطبيق Electron المعيّن كـ `goog:chromeOptions.binary`. إذا تم تعيين `browserVersion` أيضًا، فستستخدم WebdriverIO بدلًا من ذلك Chromedriver الخاص بذلك الإصدار عندما يتعذر تنزيل إصدار Electron أو عند تعيين `CHROMEDRIVER_CDNURL`. تأتي الإصدارات الليلية (Nightly) من [electron/nightlies](https://github.com/electron/nightlies/releases). تقوم خدمة Electron بتعيينه لك بناءً على إصدار Electron الخاص بالتطبيق.

```ts
{
    browserName: 'chrome',
    'wdio:electronVersion': '33.2.1',
    // جلسة BiDi تستبدل نافذة التطبيق بـ `data:,`
    'wdio:enforceWebDriverClassic': true,
    'goog:chromeOptions': {
        binary: './out/my-app-darwin-arm64/my-app.app/Contents/MacOS/my-app'
    }
}
```

</Option>

#### خيارات المشغل الشائعة

بينما توفر جميع المشغلات معاملات مختلفة للتكوين، هناك بعض المعاملات الشائعة التي تفهمها WebdriverIO وتستخدمها لإعداد المشغل أو المتصفح:

##### `cacheDir`

<Option type="string" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

المسار إلى جذر دليل ذاكرة التخزين المؤقت. يُستخدم هذا الدليل لتخزين جميع المشغلات التي يتم تنزيلها عند محاولة بدء جلسة.

</Option>

##### `binary`

<Option type="string">

المسار إلى ملف تنفيذي مخصص للمشغل. إذا تم تعيينه، فلن تحاول WebdriverIO تنزيل مشغل بل ستستخدم المشغل الموجود في هذا المسار. تأكد من أن المشغل متوافق مع المتصفح الذي تستخدمه.

يمكنك توفير هذا المسار عبر متغيرات البيئة `CHROMEDRIVER_PATH` أو `GECKODRIVER_PATH` أو `EDGEDRIVER_PATH`.

</Option>
:::caution

إذا تم تعيين `binary` للمشغل، فلن تحاول WebdriverIO تنزيل مشغل بل ستستخدم المشغل الموجود في هذا المسار. تأكد من أن المشغل متوافق مع المتصفح الذي تستخدمه.

:::

#### مضيف مخصص لتنزيل المشغل

إذا تعذّر الوصول إلى شبكات CDN العامة للمشغلات من بيئتك، على سبيل المثال لأنك تشغّل اختباراتك خلف وكيل (proxy) خاص بالشركة أو تنسخ المشغلات في سجل عناصر (artifact registry) داخلي، يمكنك توجيه التنزيل إلى مضيف مخصص باستخدام متغيرات البيئة التالية:

- Chrome: `CHROMEDRIVER_CDNURL`، القيمة الافتراضية `https://storage.googleapis.com/chrome-for-testing-public`
- Microsoft Edge: `EDGEDRIVER_CDNURL`، القيمة الافتراضية `https://msedgedriver.microsoft.com`

يُتوقع أن تقدّم النسخة المرآة (mirror) أرشيفات المشغل تحت نفس المسارات الموجودة في شبكة CDN الأصلية، على سبيل المثال لـ Chrome:

```sh
CHROMEDRIVER_CDNURL=https://artifactory.company.com/chrome-for-testing npx wdio run wdio.conf.js
```

والذي يحدد موقع المشغل على `https://artifactory.company.com/chrome-for-testing/<buildId>/<platform>/chromedriver-<platform>.zip`، حيث `<platform>` هي إحدى القيم `linux64` أو `linux-arm64` أو `mac-x64` أو `mac-arm64` أو `win32` أو `win64`، على سبيل المثال `.../140.0.7339.207/mac-arm64/chromedriver-mac-arm64.zip`.

:::info البيئات غير المتصلة بالإنترنت بالكامل

تعيد هذه المتغيرات توجيه تنزيل المشغل فقط. لمنع WebdriverIO من الوصول إلى الإنترنت العام نهائيًا، يجب استيفاء أربعة شروط إضافية:

- **يجب أن يكون المتصفح متاحًا محليًا.** إذا لم تتمكن WebdriverIO من العثور على Chrome أو Firefox مثبت، فإنها تنزّل المتصفح أيضًا، وهذا التنزيل لا يلتزم بهذه المتغيرات. إما أن تثبّت المتصفح على الجهاز أو توجّه WebdriverIO إليه عبر `goog:chromeOptions.binary` / `moz:firefoxOptions.binary`.
- **استخدم رقم إصدار كامل.** إذا تم حذف `browserVersion`، تقرأ WebdriverIO الإصدار الدقيق من المتصفح المحلي ولا حاجة للبحث عن الإصدار. إذا قمت بتعيينه، فاستخدم الإصدار الكامل المكوّن من أربعة أجزاء، على سبيل المثال `140.0.7339.207`. تتطلب قناة الإصدار (`stable`) أو الإصدار الرئيسي (`140`) أو الإصدار الجزئي (`140.0.7339`) البحث عن الإصدار عبر نقطة نهاية عامة تابعة لـ Google لا يمكن إعادة توجيهها.
- **يجب أن يأتي Chromedriver من Chrome for Testing.** بالنسبة لإصدارات Chrome الأقدم من `153.0.8001.0` على Linux ARM64، وعند استخدام `wdio:electronVersion` بدون `browserVersion`، يتم تنزيل Chromedriver من إصدارات Electron على GitHub، والتي لا تعيد هذه المتغيرات توجيهها.
- **تأكد من أن النسخة المرآة تحتوي فعلًا على الإصدار الذي تحتاجه.** إذا تعذّر جلب المشغل من مضيفك — لأن الإصدار غير منسوخ، أو بالقدر نفسه لأن عنوان URL خاطئ أو تم رفض بيانات الاعتماد — تسجّل WebdriverIO تحذيرًا ثم تبحث عن أقرب إصدار معروف وصالح، وهو ما يستعلم مجددًا من نقطة النهاية العامة. تحقق من التحذير لمعرفة المضيف الذي تمت محاولة الوصول إليه إذا وصل التشغيل إلى الإنترنت بشكل غير متوقع أو اختار إصدارًا لم تطلبه.

:::

#### خيارات المشغل الخاصة بالمتصفح

لتمرير الخيارات إلى المشغل، يمكنك استخدام القدرات المخصصة التالية:

- Chrome أو Chromium: `wdio:chromedriverOptions`
- Firefox: `wdio:geckodriverOptions`
- Microsoft Egde: `wdio:edgedriverOptions`
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

<Option type="number">

المنفذ الذي يجب أن يعمل عليه مشغل ADB.

مثال: `9515`

</Option>

##### urlBase

<Option type="string">

بادئة مسار URL الأساسي للأوامر، على سبيل المثال `wd/url`.

مثال: `/`

</Option>

##### logPath

<Option type="string">

كتابة سجل الخادم إلى ملف بدلًا من stderr، ويرفع مستوى السجل إلى `INFO`

</Option>

##### logLevel

<Option type="string">

تعيين مستوى السجل. الخيارات الممكنة `ALL` و`DEBUG` و`INFO` و`WARNING` و`SEVERE` و`OFF`.

</Option>

##### verbose

<Option type="boolean">

تسجيل مفصّل (مكافئ لـ `--log-level=ALL`)

</Option>

##### silent

<Option type="boolean">

عدم تسجيل أي شيء (مكافئ لـ `--log-level=OFF`)

</Option>

##### appendLog

<Option type="boolean">

الإلحاق بملف السجل بدلًا من إعادة كتابته.

</Option>

##### replayable

<Option type="boolean">

تسجيل مفصّل وعدم اقتطاع السلاسل النصية الطويلة بحيث يمكن إعادة تشغيل السجل (تجريبي).

</Option>

##### readableTimestamp

<Option type="boolean">

إضافة طوابع زمنية قابلة للقراءة إلى السجل.

</Option>

##### enableChromeLogs

<Option type="boolean">

عرض السجلات من المتصفح (يتجاوز خيارات التسجيل الأخرى).

</Option>

##### bidiMapperPath

<Option type="string">

مسار مخصص لـ bidi mapper.

</Option>

##### allowedIps

<Option type="string[]" default="['']">

قائمة سماح مفصولة بفواصل لعناوين IP البعيدة المسموح لها بالاتصال بـ EdgeDriver.

</Option>

##### allowedOrigins

<Option type="string[]" default="['*']">

قائمة سماح مفصولة بفواصل لأصول الطلبات المسموح لها بالاتصال بـ EdgeDriver. استخدام `*` للسماح بأي أصل مضيف أمر خطير!

</Option>

##### spawnOpts

<Option type="SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>" default="undefined">

خيارات تُمرَّر إلى عملية المشغل.

</Option>
</TabItem>
<TabItem value="firefox">

اطلع على جميع خيارات Geckodriver في [حزمة المشغل](https://github.com/webdriverio-community/node-geckodriver#options) الرسمية.

</TabItem>
<TabItem value="msedge">

اطلع على جميع خيارات Edgedriver في [حزمة المشغل](https://github.com/webdriverio-community/node-edgedriver#options) الرسمية.

</TabItem>
<TabItem value="safari">

اطلع على جميع خيارات Safaridriver في [حزمة المشغل](https://github.com/webdriverio-community/node-safaridriver#options) الرسمية.

</TabItem>
</Tabs>

## قدرات خاصة لحالات استخدام محددة

هذه قائمة بالأمثلة التي توضح القدرات التي يجب تطبيقها لتحقيق حالة استخدام معينة.

### تشغيل المتصفح بدون واجهة (Headless)

تشغيل متصفح بدون واجهة يعني تشغيل نسخة من المتصفح بدون نافذة أو واجهة مستخدم. يُستخدم هذا غالبًا في بيئات CI/CD حيث لا تُستخدم شاشة عرض. لتشغيل متصفح في الوضع بدون واجهة، طبّق القدرات التالية:

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

يبدو أن Safari [لا يدعم](https://discussions.apple.com/thread/251837694) التشغيل في الوضع بدون واجهة.

</TabItem>
</Tabs>

### أتمتة قنوات المتصفح المختلفة

إذا كنت ترغب في اختبار إصدار متصفح لم يُطلق بعد كإصدار مستقر، مثل Chrome Canary، يمكنك القيام بذلك عن طريق تعيين القدرات والإشارة إلى المتصفح الذي ترغب في تشغيله، على سبيل المثال:

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
    browserVersion: '116' // أو '116.0.5845.96' أو 'stable' أو 'dev' أو 'canary' أو 'beta' أو 'latest' (مماثل لـ 'canary')
}
```

إذا كنت ترغب في اختبار متصفح تم تنزيله يدويًا، يمكنك توفير مسار الملف التنفيذي للمتصفح عبر:

```ts
{
    browserName: 'chrome',  // أو 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

بالإضافة إلى ذلك، إذا كنت ترغب في استخدام مشغل تم تنزيله يدويًا، يمكنك توفير مسار الملف التنفيذي للمشغل عبر:

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

إذا كنت ترغب في اختبار إصدار تم تنزيله يدويًا، يمكنك توفير مسار الملف التنفيذي للمتصفح عبر:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

بالإضافة إلى ذلك، إذا كنت ترغب في استخدام مشغل تم تنزيله يدويًا، يمكنك توفير مسار الملف التنفيذي للمشغل عبر:

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

عند الاختبار على Microsoft Edge، تأكد من تثبيت إصدار المتصفح المطلوب على جهازك. يمكنك توجيه WebdriverIO إلى المتصفح المراد تشغيله عبر:

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
    browserVersion: '109' // أو '109.0.1467.0' أو 'stable' أو 'dev' أو 'canary' أو 'beta'
}
```

بالإضافة إلى ذلك، إذا كنت ترغب في استخدام مشغل تم تنزيله يدويًا، يمكنك توفير مسار الملف التنفيذي للمشغل عبر:

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

إذا كنت ترغب في تعريف مجموعتك الخاصة من القدرات، على سبيل المثال لتخزين بيانات عشوائية لاستخدامها داخل الاختبارات لتلك القدرة المحددة، يمكنك القيام بذلك على سبيل المثال عن طريق تعيين:

```js title=wdio.conf.ts
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'custom:caps': {
            // تكوينات مخصصة
        }
    }]
}
```

يُنصح باتباع [بروتوكول W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) فيما يتعلق بتسمية القدرات، والذي يتطلب حرف `:` (النقطتان)، للدلالة على مساحة أسماء خاصة بالتنفيذ. داخل اختباراتك، يمكنك الوصول إلى قدرتك المخصصة من خلال، على سبيل المثال:

```ts
browser.capabilities['custom:caps']
```

لضمان أمان الأنواع (type safety)، يمكنك توسيع واجهة القدرات الخاصة بـ WebdriverIO عبر:

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