---
id: configuration
title: التكوين
---

بناءً على [نوع الإعداد](/docs/setuptypes) (مثل استخدام ربط البروتوكول الخام، أو WebdriverIO كحزمة مستقلة أو WDIO testrunner) هناك مجموعة مختلفة من الخيارات المتاحة للتحكم في البيئة.

## خيارات WebDriver

الخيارات التالية محددة عند استخدام حزمة بروتوكول [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

البروتوكول المستخدم عند التواصل مع خادم السائق.

النوع: `String`<br />
الإفتراضي: `http`

### hostname

مضيف خادم السائق الخاص بك.

النوع: `String`<br />
الإفتراضي: `0.0.0.0`

### port

المنفذ الذي يعمل عليه خادم السائق الخاص بك.

النوع: `Number`<br />
الإفتراضي: `undefined`

### path

المسار إلى نقطة نهاية خادم السائق.

النوع: `String`<br />
الإفتراضي: `/`

### queryParams

معلمات الاستعلام التي يتم نقلها إلى خادم السائق.

النوع: `Object`<br />
الإفتراضي: `undefined`

### user

اسم المستخدم الخاص بخدمة السحابة الخاصة بك (يعمل فقط لحسابات [Sauce Labs](https://saucelabs.com) و [Browserstack](https://www.browserstack.com) و [TestingBot](https://testingbot.com) أو [LambdaTest](https://www.lambdatest.com)). إذا تم تعيينه، فسيقوم WebdriverIO تلقائيًا بتعيين خيارات الاتصال لك. إذا كنت لا تستخدم مزود سحابة، يمكن استخدام هذا للمصادقة على أي خلفية WebDriver أخرى.

النوع: `String`<br />
الإفتراضي: `undefined`

### key

مفتاح الوصول أو المفتاح السري لخدمة السحابة الخاصة بك (يعمل فقط لحسابات [Sauce Labs](https://saucelabs.com) و [Browserstack](https://www.browserstack.com) و [TestingBot](https://testingbot.com) أو [LambdaTest](https://www.lambdatest.com)). إذا تم تعيينه، فسيقوم WebdriverIO تلقائيًا بتعيين خيارات الاتصال لك. إذا كنت لا تستخدم مزود سحابة، يمكن استخدام هذا للمصادقة على أي خلفية WebDriver أخرى.

النوع: `String`<br />
الإفتراضي: `undefined`

### capabilities

يحدد القدرات التي تريد تشغيلها في جلسة WebDriver الخاصة بك. راجع [بروتوكول WebDriver](https://w3c.github.io/webdriver/#capabilities) لمزيد من التفاصيل. إذا كنت تقوم بتشغيل برنامج تشغيل أقدم لا يدعم بروتوكول WebDriver، فستحتاج إلى استخدام [قدرات JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) لتشغيل جلسة بنجاح.

إلى جانب القدرات المستندة إلى WebDriver، يمكنك تطبيق خيارات محددة للمتصفح والبائع تسمح بتكوين أعمق للمتصفح أو الجهاز البعيد. هذه موثقة في مستندات البائع المقابلة، على سبيل المثال:

- `goog:chromeOptions`: لـ [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: لـ [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: لـ [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: لـ [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: لـ [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: لـ [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

بالإضافة إلى ذلك، هناك أداة مفيدة وهي [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) من Sauce Labs، والتي تساعدك في إنشاء هذا الكائن عن طريق النقر معًا على القدرات المطلوبة.

النوع: `Object`<br />
الإفتراضي: `null`

**مثال:**

```js
{
    browserName: 'chrome', // الخيارات: `chrome`، `edge`، `firefox`، `safari`
    browserVersion: '27.0', // إصدار المتصفح
    platformName: 'Windows 10' // منصة نظام التشغيل
}
```

إذا كنت تقوم بتشغيل اختبارات ويب أو محلية على أجهزة محمولة، فإن `capabilities` تختلف عن بروتوكول WebDriver. راجع [وثائق Appium](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/) لمزيد من التفاصيل.

### logLevel

مستوى التسجيل.

النوع: `String`<br />
الإفتراضي: `info`<br />
الخيارات: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

دليل لتخزين جميع ملفات سجل testrunner (بما في ذلك سجلات المراسل وسجلات `wdio`). إذا لم يتم تعيينها، فسيتم بث جميع السجلات إلى `stdout`. نظرًا لأن معظم المراسلين مصممة للتسجيل في `stdout`، يوصى باستخدام هذا الخيار فقط لمراسلين محددين حيث يكون من المنطقي أكثر دفع التقرير إلى ملف (مثل مراسل `junit`، على سبيل المثال).

عند التشغيل في الوضع المستقل، السجل الوحيد الذي ينشئه WebdriverIO هو سجل `wdio`.

النوع: `String`<br />
الإفتراضي: `null`

### connectionRetryTimeout

مهلة لأي طلب WebDriver إلى سائق أو شبكة.

النوع: `Number`<br />
الإفتراضي: `120000`

### connectionRetryCount

الحد الأقصى لعدد إعادة محاولات الطلب إلى خادم Selenium.

النوع: `Number`<br />
الإفتراضي: `3`

### agent

يسمح لك باستخدام وكيل [agent](https://www.npmjs.com/package/got#agent) مخصص لـ `http`/`https`/`http2` لتقديم الطلبات.

النوع: `Object`<br />
الإفتراضي:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

حدد `headers` مخصصة لتمريرها في كل طلب WebDriver. إذا كانت شبكة Selenium الخاصة بك تتطلب مصادقة أساسية، فإننا نوصي بتمرير رأس `Authorization` من خلال هذا الخيار لمصادقة طلبات WebDriver الخاصة بك، على سبيل المثال:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// قراءة اسم المستخدم وكلمة المرور من متغيرات البيئة
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// دمج اسم المستخدم وكلمة المرور مع فاصل نقطتين
const credentials = `${username}:${password}`;
// ترميز بيانات الاعتماد باستخدام Base64
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

النوع: `Object`<br />
الإفتراضي: `{}`

### transformRequest

وظيفة تعترض [خيارات طلب HTTP](https://github.com/sindresorhus/got#options) قبل إجراء طلب WebDriver

النوع: `(RequestOptions) => RequestOptions`<br />
الإفتراضي: *لا شيء*

### transformResponse

وظيفة تعترض كائنات استجابة HTTP بعد وصول استجابة WebDriver. يتم تمرير الوظيفة إلى كائن الاستجابة الأصلي كالأول و `RequestOptions` المقابل كوسيطة ثانية.

النوع: `(Response, RequestOptions) => Response`<br />
الإفتراضي: *لا شيء*

### strictSSL

ما إذا كان لا يتطلب أن تكون شهادة SSL صالحة.
يمكن تعيينها عبر متغيرات بيئية مثل `STRICT_SSL` أو `strict_ssl`.

النوع: `Boolean`<br />
الإفتراضي: `true`

### enableDirectConnect

ما إذا كان تمكين [ميزة اتصال Appium المباشر](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
لا يفعل شيئًا إذا لم يكن للاستجابة مفاتيح مناسبة أثناء تمكين العلامة.

النوع: `Boolean`<br />
الإفتراضي: `true`

### cacheDir

المسار إلى جذر دليل التخزين المؤقت. يستخدم هذا الدليل لتخزين جميع برامج التشغيل التي يتم تنزيلها عند محاولة بدء جلسة.

النوع: `String`<br />
الإفتراضي: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

---

## WebdriverIO

يمكن استخدام الخيارات التالية (بما في ذلك تلك المذكورة أعلاه) مع WebdriverIO بشكل مستقل:

### automationProtocol

حدد البروتوكول الذي تريد استخدامه لأتمتة المتصفح الخاص بك. حاليًا يتم دعم [`webdriver`](https://www.npmjs.com/package/webdriver) فقط، حيث أنها تقنية أتمتة المتصفح الرئيسية التي يستخدمها WebdriverIO.

إذا كنت تريد أتمتة المتصفح باستخدام تقنية أتمتة مختلفة، تأكد من تعيين هذه الخاصية إلى مسار يحل إلى وحدة تلتزم بالواجهة التالية:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * ابدأ جلسة أتمتة وقم بإرجاع أحادية WebdriverIO [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * مع أوامر الأتمتة المناسبة. انظر حزمة [webdriver](https://www.npmjs.com/package/webdriver)
     * كتطبيق مرجعي
     *
     * @param {Capabilities.RemoteConfig} options خيارات WebdriverIO
     * @param {Function} hook الذي يسمح بتعديل العميل قبل إطلاقه من الوظيفة
     * @param {PropertyDescriptorMap} userPrototype يسمح للمستخدم بإضافة أوامر بروتوكول مخصصة
     * @param {Function} customCommandWrapper يسمح بتعديل تنفيذ الأمر
     * @returns نسخة عميل متوافقة مع WebdriverIO
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * يسمح للمستخدم بالارتباط بالجلسات الموجودة
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * يغير معرف جلسة المثيل وقدرات المتصفح للجلسة الجديدة
     * مباشرة في كائن المتصفح الممرر
     *
     * @optional
     * @param   {object} instance  الكائن الذي نحصل عليه من جلسة متصفح جديدة.
     * @returns {string}           معرف الجلسة الجديد للمتصفح
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

النوع: `String`<br />
الإفتراضي: `webdriver`

### baseUrl

اختصر استدعاءات أمر `url` عن طريق تعيين URL أساسي.
- إذا بدأ معلمة `url` الخاصة بك بـ `/`، فسيتم إلحاق `baseUrl` في البداية (باستثناء مسار `baseUrl`، إذا كان له مسار).
- إذا بدأت معلمة `url` الخاصة بك بدون مخطط أو `/` (مثل `some/path`)، فسيتم إلحاق `baseUrl` الكامل مباشرة في البداية.

النوع: `String`<br />
الإفتراضي: `null`

### waitforTimeout

المهلة الافتراضية لجميع أوامر `waitFor*`. (لاحظ الحرف الصغير `f` في اسم الخيار.) تؤثر هذه المهلة __فقط__ على الأوامر التي تبدأ بـ `waitFor*` ووقت الانتظار الافتراضي الخاص بها.

لزيادة مهلة _الاختبار_، يرجى الاطلاع على وثائق الإطار.

النوع: `Number`<br />
الإفتراضي: `5000`

### waitforInterval

الفاصل الزمني الافتراضي لجميع أوامر `waitFor*` للتحقق مما إذا كانت الحالة المتوقعة (مثل الرؤية) قد تغيرت.

النوع: `Number`<br />
الإفتراضي: `100`

### region

إذا كنت تعمل على Sauce Labs، يمكنك اختيار تشغيل الاختبارات بين مراكز بيانات مختلفة: الولايات المتحدة أو الاتحاد الأوروبي.
لتغيير منطقتك إلى الاتحاد الأوروبي، أضف `region: 'eu'` إلى التكوين الخاص بك.

__ملاحظة:__ هذا له تأثير فقط إذا قمت بتوفير خيارات `user` و `key` المتصلة بحساب Sauce Labs الخاص بك.

النوع: `String`<br />
الإفتراضي: `us`

*(فقط للأجهزة الافتراضية و/أو محاكيات em/simulators)*

---

## خيارات Testrunner

الخيارات التالية (بما في ذلك تلك المذكورة أعلاه) محددة فقط لتشغيل WebdriverIO باستخدام WDIO testrunner:

### specs

حدد مواصفات لتنفيذ الاختبار. يمكنك إما تحديد نمط glob لمطابقة ملفات متعددة في وقت واحد أو لف glob أو مجموعة من المسارات في مصفوفة لتشغيلها ضمن عملية عامل واحدة. تُعتبر جميع المسارات نسبية من مسار ملف التكوين.

النوع: `(String | String[])[]`<br />
الإفتراضي: `[]`

### exclude

استبعاد المواصفات من تنفيذ الاختبار. تُعتبر جميع المسارات نسبية من مسار ملف التكوين.

النوع: `String[]`<br />
الإفتراضي: `[]`

### suites

كائن يصف مجموعات مختلفة من الاختبارات، والتي يمكنك بعد ذلك تحديدها باستخدام خيار `--suite` على واجهة سطر الأوامر `wdio`.

النوع: `Object`<br />
الإفتراضي: `{}`

### capabilities

نفس قسم `capabilities` الموضح أعلاه، باستثناء خيار تحديد إما كائن [`multiremote`](/docs/multiremote)، أو جلسات WebDriver متعددة في مصفوفة للتنفيذ المتوازي.

يمكنك تطبيق نفس القدرات المحددة للبائع والمتصفح كما هو محدد [أعلاه](/docs/configuration#capabilities).

النوع: `Object`|`Object[]`<br />
الإفتراضي: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

الحد الأقصى لعدد العمال المتوازية الإجمالية.

__ملاحظة:__ قد يكون هذا الرقم مرتفعًا يصل إلى `100`، عندما يتم إجراء الاختبارات على بعض البائعين الخارجيين مثل آلات Sauce Labs. هناك، لا يتم اختبار الاختبارات على جهاز واحد، بل على أجهزة افتراضية متعددة. إذا كان يجب تشغيل الاختبارات على جهاز تطوير محلي، فاستخدم رقمًا أكثر معقولية، مثل `3` أو `4` أو `5`. في الأساس، هذا هو عدد المتصفحات التي سيتم بدء تشغيلها وتشغيل اختباراتك في وقت واحد، لذلك يعتمد ذلك على مقدار ذاكرة الوصول العشوائي (RAM) الموجودة على جهازك، وعدد التطبيقات الأخرى التي تعمل على جهازك.

يمكنك أيضًا تطبيق `maxInstances` داخل كائنات القدرات الخاصة بك باستخدام قدرة `wdio:maxInstances`. سيحد هذا من كمية الجلسات المتوازية لتلك القدرة المعينة.

النوع: `Number`<br />
الإفتراضي: `100`

### maxInstancesPerCapability

الحد الأقصى لعدد العمال المتوازية الإجمالية لكل قدرة.

النوع: `Number`<br />
الإفتراضي: `100`

### injectGlobals

يدخل عناصر WebdriverIO العالمية (مثل `browser` و `$` و `$$`) في البيئة العالمية.
إذا قمت بتعيينها إلى `false`، يجب عليك الاستيراد من `@wdio/globals`، على سبيل المثال:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

ملاحظة: لا يتعامل WebdriverIO مع حقن العناصر العالمية الخاصة بإطار الاختبار.

النوع: `Boolean`<br />
الإفتراضي: `true`

### bail

إذا كنت تريد أن يتوقف تشغيل الاختبار الخاص بك بعد عدد معين من فشل الاختبارات، استخدم `bail`.
(الإفتراضي هو `0`، والذي يشغل جميع الاختبارات بغض النظر عن النتيجة.) **ملاحظة:** الاختبار في هذا السياق هو جميع الاختبارات داخل ملف مواصفات واحد (عند استخدام Mocha أو Jasmine) أو جميع الخطوات داخل ملف ميزة (عند استخدام Cucumber). إذا كنت تريد التحكم في سلوك الإيقاف ضمن اختبارات ملف اختبار واحد، فألق نظرة على خيارات [الإطار](frameworks) المتاحة.

النوع: `Number`<br />
الإفتراضي: `0` (لا توقف؛ قم بتشغيل جميع الاختبارات)

### specFileRetries

عدد المرات لإعادة محاولة ملف مواصفات بأكمله عندما يفشل ككل.

النوع: `Number`<br />
الإفتراضي: `0`

### specFileRetriesDelay

التأخير بالثواني بين محاولات إعادة ملف المواصفات

النوع: `Number`<br />
الإفتراضي: `0`

### specFileRetriesDeferred

ما إذا كان يجب إعادة محاولة ملفات المواصفات المعاد محاولتها على الفور أو تأجيلها إلى نهاية الطابور.

النوع: `Boolean`<br />
الإفتراضي: `true`

### groupLogsByTestSpec

اختر عرض إخراج السجل.

إذا تم تعيينه على `false`، فسيتم طباعة السجلات من ملفات الاختبار المختلفة في الوقت الفعلي. يرجى ملاحظة أن هذا قد يؤدي إلى اختلاط مخرجات السجل من ملفات مختلفة عند التشغيل بالتوازي.

إذا تم تعيينه على `true`، فسيتم تجميع مخرجات السجل حسب مواصفات الاختبار وطباعتها فقط عند اكتمال مواصفات الاختبار.

بشكل افتراضي، يتم تعيينه على `false` بحيث يتم طباعة السجلات في الوقت الفعلي.

النوع: `Boolean`<br />
الإفتراضي: `false`

### services

تتولى الخدمات مهمة معينة لا تريد الاهتمام بها. فهي تعزز إعداد الاختبار الخاص بك بجهد ضئيل تقريبًا.

النوع: `String[]|Object[]`<br />
الإفتراضي: `[]`

### framework

يحدد إطار الاختبار الذي سيستخدمه WDIO testrunner.

النوع: `String`<br />
الإفتراضي: `mocha`<br />
الخيارات: `mocha` | `jasmine`

### mochaOpts و jasmineOpts و cucumberOpts

خيارات خاصة بإطار معين. راجع وثائق محول الإطار حول الخيارات المتاحة. اقرأ المزيد عن هذا في [Frameworks](frameworks).

النوع: `Object`<br />
الإفتراضي: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

قائمة ميزات cucumber مع أرقام الأسطر (عند [استخدام إطار cucumber](./Frameworks.md#using-cucumber)).

النوع: `String[]`
الإفتراضي: `[]`

### reporters

قائمة المراسلين المراد استخدامها. يمكن أن يكون المراسل إما سلسلة، أو مصفوفة من
`['reporterName', { /* reporter options */}]` حيث العنصر الأول هو سلسلة بها اسم المراسل والعنصر الثاني كائن بخيارات المراسل.

النوع: `String[]|Object[]`<br />
الإفتراضي: `[]`

مثال:

```js
reporters: [
    'dot',
    'spec'
    ['junit', {
        outputDir: `${__dirname}/reports`,
        otherOption: 'foobar'
    }]
]
```

### reporterSyncInterval

يحدد الفاصل الزمني الذي يجب على المراسل التحقق فيه مما إذا كانوا متزامنين إذا أبلغوا عن سجلاتهم بشكل غير متزامن (على سبيل المثال، إذا تم بث السجلات إلى بائع خارجي).

النوع: `Number`<br />
الإفتراضي: `100` (مللي ثانية)

### reporterSyncTimeout

يحدد الحد الأقصى للوقت الذي يتعين على المراسلين إنهاء تحميل جميع سجلاتهم حتى يتم طرح خطأ بواسطة testrunner.

النوع: `Number`<br />
الإفتراضي: `5000` (مللي ثانية)

### execArgv

وسيطات Node المراد تحديدها عند تشغيل العمليات الفرعية.

النوع: `String[]`<br />
الإفتراضي: `null`

### filesToWatch

قائمة من أنماط السلاسل الداعمة لـ glob التي تخبر testrunner بمراقبة ملفات إضافية أخرى، مثل ملفات التطبيق، عند تشغيلها باستخدام علامة `--watch`. بشكل افتراضي، يراقب testrunner بالفعل جميع ملفات المواصفات.

النوع: `String[]`<br />
الإفتراضي: `[]`

### updateSnapshots

قم بتعيينه على true إذا كنت تريد تحديث لقطاتك. يُستخدم بشكل مثالي كجزء من معلمة CLI، على سبيل المثال `wdio run wdio.conf.js --s`.

النوع: `'new' | 'all' | 'none'`<br />
الإفتراضي: `none` إذا لم يتم توفيره وتشغيل الاختبارات في CI، `new` إذا لم يتم توفيره، وإلا ما تم توفيره

### resolveSnapshotPath

يتجاوز مسار اللقطة الافتراضي. على سبيل المثال، لتخزين اللقطات بجانب ملفات الاختبار.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

النوع: `(testPath: string, snapExtension: string) => string`<br />
الإفتراضي: يخزن ملفات اللقطة في دليل `__snapshots__` بجانب ملف الاختبار

### tsConfigPath

يستخدم WDIO `tsx` لتجميع ملفات TypeScript. يتم اكتشاف TSConfig الخاص بك تلقائيًا من دليل العمل الحالي ولكن يمكنك تحديد مسار مخصص هنا أو عن طريق تعيين متغير البيئة TSX_TSCONFIG_PATH.

راجع وثائق `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

النوع: `String`<br />
الإفتراضي: `null`<br />

## الخطافات

يسمح لك WDIO testrunner بتعيين خطافات ليتم تشغيلها في أوقات محددة من دورة حياة الاختبار. هذا يسمح بإجراءات مخصصة (مثل التقاط لقطة شاشة إذا فشل الاختبار).

كل خطاف له معلومات محددة حول دورة الحياة (مثل معلومات حول مجموعة الاختبارات أو الاختبار). اقرأ المزيد حول جميع خصائص الخطاف في [مثال التكوين الخاص بنا](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**ملاحظة:** بعض الخطافات (`onPrepare` و `onWorkerStart` و `onWorkerEnd` و `onComplete`) يتم تنفيذها في عملية مختلفة وبالتالي لا يمكنها مشاركة أي بيانات عالمية مع الخطافات الأخرى التي تعيش في عملية العامل.

### onPrepare

يتم تنفيذه مرة واحدة قبل إطلاق جميع العمال.

المعلمات:

- `config` (`object`): كائن تكوين WebdriverIO
- `param` (`object[]`): قائمة تفاصيل القدرات

### onWorkerStart

يتم تنفيذه قبل إنشاء عملية عامل ويمكن استخدامه لتهيئة خدمة معينة لذلك العامل وكذلك لتعديل بيئات التشغيل بطريقة غير متزامنة.

المعلمات:

- `cid` (`string`): معرّف القدرة (مثل 0-0)
- `caps` (`object`): يحتوي على قدرات للجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): المواصفات المراد تشغيلها في عملية العامل
- `args` (`object`): كائن سيتم دمجه مع التكوين الرئيسي بمجرد تهيئة العامل
- `execArgv` (`string[]`): قائمة وسائط السلسلة الممررة إلى عملية العامل

### onWorkerEnd

يتم تنفيذه بعد خروج عملية العامل مباشرةً.

المعلمات:

- `cid` (`string`): معرّف القدرة (مثل 0-0)
- `exitCode` (`number`): 0 - نجاح، 1 - فشل
- `specs` (`string[]`): المواصفات المراد تشغيلها في عملية العامل
- `retries` (`number`): عدد إعادة المحاولات على مستوى المواصفات المستخدمة كما هو محدد في [_"إضافة إعادة المحاولات على أساس ملف المواصفات"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

يتم تنفيذه قبل تهيئة جلسة webdriver وإطار الاختبار مباشرةً. يتيح لك التلاعب بالتكوينات اعتمادًا على القدرة أو المواصفات.

المعلمات:

- `config` (`object`): كائن تكوين WebdriverIO
- `caps` (`object`): يحتوي على قدرات للجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): المواصفات المراد تشغيلها في عملية العامل

### before

يتم تنفيذه قبل بدء تنفيذ الاختبار. في هذه النقطة يمكنك الوصول إلى جميع المتغيرات العالمية مثل `browser`. إنه المكان المثالي لتحديد الأوامر المخصصة.

المعلمات:

- `caps` (`object`): يحتوي على قدرات للجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): المواصفات المراد تشغيلها في عملية العامل
- `browser` (`object`): مثيل جلسة المتصفح/الجهاز التي تم إنشاؤها

### beforeSuite

خطاف يتم تنفيذه قبل بدء المجموعة (في Mocha/Jasmine فقط)

المعلمات:

- `suite` (`object`): تفاصيل المجموعة

### beforeHook

خطاف يتم تنفيذه *قبل* خطاف داخل المجموعة يبدأ (على سبيل المثال، يعمل قبل استدعاء beforeEach في Mocha)

المعلمات:

- `test` (`object`): تفاصيل الاختبار
- `context` (`object`): سياق الاختبار (يمثل كائن World في Cucumber)

### afterHook

خطاف يتم تنفيذه *بعد* انتهاء خطاف داخل المجموعة (على سبيل المثال، يعمل بعد استدعاء afterEach في Mocha)

المعلمات:

- `test` (`object`): تفاصيل الاختبار
- `context` (`object`): سياق الاختبار (يمثل كائن World في Cucumber)
- `result` (`object`): نتيجة الخطاف (تحتوي على خصائص `error` و `result` و `duration` و `passed` و `retries`)

### beforeTest

وظيفة يتم تنفيذها قبل الاختبار (في Mocha/Jasmine فقط).

المعلمات:

- `test` (`object`): تفاصيل الاختبار
- `context` (`object`): كائن النطاق الذي تم تنفيذ الاختبار به

### beforeCommand

يعمل قبل تنفيذ أمر WebdriverIO.

المعلمات:

- `commandName` (`string`): اسم الأمر
- `args` (`*`): الوسائط التي سيتلقاها الأمر

### afterCommand

يعمل بعد تنفيذ أمر WebdriverIO.

المعلمات:

- `commandName` (`string`): اسم الأمر
- `args` (`*`): الوسائط التي سيتلقاها الأمر
- `result` (`number`): 0 - نجاح الأمر، 1 - خطأ في الأمر
- `error` (`Error`): كائن الخطأ إن وجد

### afterTest

وظيفة يتم تنفيذها بعد انتهاء اختبار (في Mocha/Jasmine).

المعلمات:

- `test` (`object`): تفاصيل الاختبار
- `context` (`object`): كائن النطاق الذي تم تنفيذ الاختبار به
- `result.error` (`Error`): كائن الخطأ في حالة فشل الاختبار، وإلا فهو `undefined`
- `result.result` (`Any`): كائن إرجاع وظيفة الاختبار
- `result.duration` (`Number`): مدة الاختبار
- `result.passed` (`Boolean`): صحيح إذا نجح الاختبار، وإلا فهو خطأ
- `result.retries` (`Object`): معلومات حول إعادة المحاولات المتعلقة باختبار واحد كما هو محدد لـ [Mocha و Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) وكذلك [Cucumber](./Retry.md#rerunning-in-cucumber)، على سبيل المثال `{ attempts: 0, limit: 0 }`، انظر
- `result` (`object`): نتيجة الخطاف (تحتوي على خصائص `error` و `result` و `duration` و `passed` و `retries`)

### afterSuite

خطاف يتم تنفيذه بعد انتهاء المجموعة (في Mocha/Jasmine فقط)

المعلمات:

- `suite` (`object`): تفاصيل المجموعة

### after

يتم تنفيذه بعد اكتمال جميع الاختبارات. لا يزال لديك إمكانية الوصول إلى جميع المتغيرات العالمية من الاختبار.

المعلمات:

- `result` (`number`): 0 - نجاح الاختبار، 1 - فشل الاختبار
- `caps` (`object`): يحتوي على قدرات للجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): المواصفات المراد تشغيلها في عملية العامل

### afterSession

يتم تنفيذه مباشرة بعد إنهاء جلسة webdriver.

المعلمات:

- `config` (`object`): كائن تكوين WebdriverIO
- `caps` (`object`): يحتوي على قدرات للجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): المواصفات المراد تشغيلها في عملية العامل

### onComplete

يتم تنفيذه بعد إغلاق جميع العمال والعملية على وشك الخروج. سيؤدي الخطأ المطروح في خطاف onComplete إلى فشل تشغيل الاختبار.

المعلمات:

- `exitCode` (`number`): 0 - نجاح، 1 - فشل
- `config` (`object`): كائن تكوين WebdriverIO
- `caps` (`object`): يحتوي على قدرات للجلسة التي سيتم إنشاؤها في العامل
- `result` (`object`): كائن النتائج الذي يحتوي على نتائج الاختبار

### onReload

يتم تنفيذه عند حدوث تحديث.

المعلمات:

- `oldSessionId` (`string`): معرف الجلسة للجلسة القديمة
- `newSessionId` (`string`): معرف الجلسة للجلسة الجديدة

### beforeFeature

يعمل قبل ميزة Cucumber.

المعلمات:

- `uri` (`string`): المسار إلى ملف الميزة
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): كائن ميزة Cucumber

### afterFeature

يعمل بعد ميزة Cucumber.

المعلمات:

- `uri` (`string`): المسار إلى ملف الميزة
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): كائن ميزة Cucumber

### beforeScenario

يعمل قبل سيناريو Cucumber.

المعلمات:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): كائن عالمي يحتوي على معلومات عن pickle وخطوة الاختبار
- `context` (`object`): كائن Cucumber World

### afterScenario

يعمل بعد سيناريو Cucumber.

المعلمات:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): كائن عالمي يحتوي على معلومات عن pickle وخطوة الاختبار
- `result` (`object`): كائن النتائج الذي يحتوي على نتائج السيناريو
- `result.passed` (`boolean`): صحيح إذا نجح السيناريو
- `result.error` (`string`): كومة الأخطاء إذا فشل السيناريو
- `result.duration` (`number`): مدة السيناريو بالمللي ثانية
- `context` (`object`): كائن Cucumber World

### beforeStep

يعمل قبل خطوة Cucumber.

المعلمات:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): كائن خطوة Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): كائن سيناريو Cucumber
- `context` (`object`): كائن Cucumber World

### afterStep

يعمل بعد خطوة Cucumber.

المعلمات:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): كائن خطوة Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): كائن سيناريو Cucumber
- `result`: (`object`): كائن النتائج الذي يحتوي على نتائج الخطوة
- `result.passed` (`boolean`): صحيح إذا نجح السيناريو
- `result.error` (`string`): كومة الأخطاء إذا فشل السيناريو
- `result.duration` (`number`): مدة السيناريو بالمللي ثانية
- `context` (`object`): كائن Cucumber World

### beforeAssertion

خطاف يتم تنفيذه قبل حدوث تأكيد WebdriverIO.

المعلمات:

- `params`: معلومات التأكيد
- `params.matcherName` (`string`): اسم المطابق (مثل `toHaveTitle`)
- `params.expectedValue`: القيمة التي يتم تمريرها إلى المطابق
- `params.options`: خيارات التأكيد

### afterAssertion

خطاف يتم تنفيذه بعد حدوث تأكيد WebdriverIO.

المعلمات:

- `params`: معلومات التأكيد
- `params.matcherName` (`string`): اسم المطابق (مثل `toHaveTitle`)
- `params.expectedValue`: القيمة التي يتم تمريرها إلى المطابق
- `params.options`: خيارات التأكيد
- `params.result`: نتائج التأكيد