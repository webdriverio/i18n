---
id: configuration
title: التكوين
---

اعتمادًا على [نوع الإعداد](/docs/setuptypes) (مثل استخدام ارتباطات البروتوكول الأساسية، WebdriverIO كحزمة مستقلة أو اختبار WDIO)، هناك مجموعة مختلفة من الخيارات المتاحة للتحكم في البيئة.

## خيارات WebDriver

الخيارات التالية محددة عند استخدام حزمة بروتوكول [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

البروتوكول المستخدم عند التواصل مع خادم السائق.

النوع: `String`<br />
الافتراضي: `http`

### hostname

مضيف خادم السائق الخاص بك.

النوع: `String`<br />
الافتراضي: `0.0.0.0`

### port

المنفذ الذي يستخدمه خادم السائق الخاص بك.

النوع: `Number`<br />
الافتراضي: `undefined`

### path

المسار إلى نقطة نهاية خادم السائق.

النوع: `String`<br />
الافتراضي: `/`

### queryParams

معلمات الاستعلام التي يتم نقلها إلى خادم السائق.

النوع: `Object`<br />
الافتراضي: `undefined`

### user

اسم المستخدم الخاص بخدمة السحابة الخاصة بك (يعمل فقط لحسابات [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) أو [TestMu AI](https://www.testmuai.com/)). إذا تم تعيينه، سيقوم WebdriverIO تلقائيًا بتعيين خيارات الاتصال لك. إذا كنت لا تستخدم مزود سحابة، يمكن استخدام هذا للمصادقة مع أي خلفية WebDriver أخرى.

النوع: `String`<br />
الافتراضي: `undefined`

### key

مفتاح الوصول لخدمة السحابة الخاصة بك أو المفتاح السري (يعمل فقط لحسابات [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) أو [TestMu AI](https://www.testmuai.com/)). إذا تم تعيينه، سيقوم WebdriverIO تلقائيًا بتعيين خيارات الاتصال لك. إذا كنت لا تستخدم مزود سحابة، يمكن استخدام هذا للمصادقة مع أي خلفية WebDriver أخرى.

النوع: `String`<br />
الافتراضي: `undefined`

### capabilities

يحدد القدرات التي تريد تشغيلها في جلسة WebDriver الخاصة بك. تحقق من [بروتوكول WebDriver](https://w3c.github.io/webdriver/#capabilities) للمزيد من التفاصيل. إذا كنت تقوم بتشغيل سائق أقدم لا يدعم بروتوكول WebDriver، فستحتاج إلى استخدام [قدرات JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) لتشغيل جلسة بنجاح.

بالإضافة إلى القدرات المستندة إلى WebDriver، يمكنك تطبيق خيارات خاصة بالمتصفح والبائع تسمح بتكوين أعمق للمتصفح البعيد أو الجهاز. هذه موثقة في وثائق البائع المقابلة، على سبيل المثال:

- `goog:chromeOptions`: لـ [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: لـ [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: لـ [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: لـ [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: لـ [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: لـ [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

بالإضافة إلى ذلك، أداة مفيدة هي [مكون اختبار آلي من Sauce Labs](https://docs.saucelabs.com/basics/platform-configurator/)، والذي يساعدك على إنشاء هذا الكائن بالنقر معًا على القدرات المطلوبة.

النوع: `Object`<br />
الافتراضي: `null`

**مثال:**

```js
{
    browserName: 'chrome', // خيارات: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // إصدار المتصفح
    platformName: 'Windows 10' // منصة نظام التشغيل
}
```

إذا كنت تقوم بتشغيل اختبارات ويب أو اختبارات أصلية على الأجهزة المحمولة، فإن `capabilities` تختلف عن بروتوكول WebDriver. راجع [وثائق Appium](https://appium.io/docs/en/latest/guides/caps/) للحصول على مزيد من التفاصيل.

### logLevel

مستوى التفصيل في السجلات.

النوع: `String`<br />
الافتراضي: `info`<br />
الخيارات: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

دليل لتخزين جميع ملفات سجل اختبار المشغل (بما في ذلك سجلات المراسل وسجلات `wdio`). إذا لم يتم تعيينه، فسيتم توجيه جميع السجلات إلى `stdout`. نظرًا لأن معظم المراسلين مصممة للسجل إلى `stdout`، يوصى باستخدام هذا الخيار فقط لمراسلين محددين حيث يكون من المنطقي أكثر دفع التقرير إلى ملف (مثل مراسل `junit`، على سبيل المثال).

عند التشغيل في وضع مستقل، السجل الوحيد الذي يتم إنشاؤه بواسطة WebdriverIO هو سجل `wdio`.

النوع: `String`<br />
الافتراضي: `null`

### connectionRetryTimeout

مهلة لأي طلب WebDriver إلى سائق أو شبكة.

النوع: `Number`<br />
الافتراضي: `120000`

### connectionRetryCount

العدد الأقصى لإعادة محاولات الطلب إلى خادم Selenium.

النوع: `Number`<br />
الافتراضي: `3`

### agent

يسمح لك باستخدام وكيل مخصص `http`/`https`/`http2` [وكيل](https://www.npmjs.com/package/got#agent) لإرسال الطلبات.

النوع: `Object`<br />
الافتراضي:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

حدد رؤوس `headers` مخصصة لتمريرها في كل طلب WebDriver. إذا كانت شبكة Selenium الخاصة بك تتطلب المصادقة الأساسية، نوصي بتمرير رأس `Authorization` من خلال هذا الخيار لمصادقة طلبات WebDriver الخاصة بك، على سبيل المثال:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// قراءة اسم المستخدم وكلمة المرور من متغيرات البيئة
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// دمج اسم المستخدم وكلمة المرور بفاصل نقطتان
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
الافتراضي: `{}`

### transformRequest

دالة تعترض [خيارات طلب HTTP](https://github.com/sindresorhus/got#options) قبل إجراء طلب WebDriver

النوع: `(RequestOptions) => RequestOptions`<br />
الافتراضي: *لا شيء*

### transformResponse

دالة تعترض كائنات استجابة HTTP بعد وصول استجابة WebDriver. يتم تمرير الدالة كائن الاستجابة الأصلي كأول وسيط و`RequestOptions` المقابلة كثاني وسيط.

النوع: `(Response, RequestOptions) => Response`<br />
الافتراضي: *لا شيء*

### strictSSL

ما إذا كان لا يتطلب أن تكون شهادة SSL صالحة.
يمكن تعيينها عبر متغيرات بيئية مثل `STRICT_SSL` أو `strict_ssl`.

النوع: `Boolean`<br />
الافتراضي: `true`

### enableDirectConnect

ما إذا كان تمكين [ميزة الاتصال المباشر من Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
لا يفعل شيئًا إذا لم يكن للاستجابة مفاتيح مناسبة أثناء تمكين العلامة.

النوع: `Boolean`<br />
الافتراضي: `true`

### cacheDir

المسار إلى جذر دليل ذاكرة التخزين المؤقت. يستخدم هذا الدليل لتخزين جميع برامج التشغيل التي يتم تنزيلها عند محاولة بدء جلسة.

النوع: `String`<br />
الافتراضي: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

للحصول على سجل أكثر أمانًا، يمكن للتعبيرات العادية المعينة بـ `maskingPatterns` إخفاء المعلومات الحساسة من السجل.
 - تنسيق السلسلة هو تعبير عادي مع أو بدون أعلام (مثل `/.../i`) وتفصل بفواصل للتعبيرات المتعددة.
 - لمزيد من التفاصيل حول أنماط التقنيع، راجع [قسم أنماط التقنيع في README الخاص بـ WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

النوع: `String`<br />
الافتراضي: `undefined`

**مثال:**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

---

## WebdriverIO

يمكن استخدام الخيارات التالية (بما في ذلك الخيارات المذكورة أعلاه) مع WebdriverIO بشكل مستقل:

### automationProtocol

حدد البروتوكول الذي تريد استخدامه لأتمتة المتصفح. حاليًا يتم دعم [`webdriver`](https://www.npmjs.com/package/webdriver) فقط، لأنه تقنية أتمتة المتصفح الرئيسية التي يستخدمها WebdriverIO.

إذا كنت تريد أتمتة المتصفح باستخدام تقنية أتمتة مختلفة، تأكد من تعيين هذه الخاصية إلى مسار يحل إلى وحدة تلتزم بالواجهة التالية:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * بدء جلسة أتمتة وإرجاع أحادي WebdriverIO [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * مع أوامر الأتمتة المعنية. انظر حزمة [webdriver](https://www.npmjs.com/package/webdriver)
     * كتنفيذ مرجعي
     *
     * @param {Capabilities.RemoteConfig} options خيارات WebdriverIO
     * @param {Function} hook يسمح بتعديل العميل قبل إطلاقه من الوظيفة
     * @param {PropertyDescriptorMap} userPrototype يسمح للمستخدم بإضافة أوامر بروتوكول مخصصة
     * @param {Function} customCommandWrapper يسمح بتعديل تنفيذ الأمر
     * @returns مثيل عميل متوافق مع WebdriverIO
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * يسمح للمستخدم بالاتصال بجلسات موجودة
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
الافتراضي: `webdriver`

### baseUrl

اختصر استدعاءات أمر `url` عن طريق تعيين URL أساسي.
- إذا بدأ معلمة `url` الخاصة بك بـ `/`، فسيتم إضافة `baseUrl` في المقدمة (باستثناء مسار `baseUrl`، إذا كان لديه مسار).
- إذا بدأ معلمة `url` الخاصة بك بدون نظام أو `/` (مثل `some/path`)، فسيتم إضافة `baseUrl` الكامل مباشرة في المقدمة.

النوع: `String`<br />
الافتراضي: `null`

### waitforTimeout

المهلة الافتراضية لجميع أوامر `waitFor*`. (لاحظ الحرف الصغير `f` في اسم الخيار.) هذه المهلة تؤثر __فقط__ على الأوامر التي تبدأ بـ `waitFor*` ووقت الانتظار الافتراضي الخاص بها.

لزيادة مهلة _الاختبار_، يرجى الاطلاع على وثائق الإطار.

النوع: `Number`<br />
الافتراضي: `5000`

### waitforInterval

الفاصل الزمني الافتراضي لجميع أوامر `waitFor*` للتحقق مما إذا كانت حالة متوقعة (على سبيل المثال، الرؤية) قد تغيرت.

النوع: `Number`<br />
الافتراضي: `100`

### region

إذا كنت تعمل على Sauce Labs، يمكنك اختيار تشغيل الاختبارات بين مراكز بيانات مختلفة: الولايات المتحدة أو الاتحاد الأوروبي.
لتغيير منطقتك إلى الاتحاد الأوروبي، أضف `region: 'eu'` إلى التكوين الخاص بك.

__ملاحظة:__ هذا له تأثير فقط إذا قدمت خيارات `user` و `key` المرتبطة بحساب Sauce Labs الخاص بك.

النوع: `String`<br />
الافتراضي: `us`

*(فقط للأجهزة الافتراضية و/أو المحاكاة)*

---

## خيارات Testrunner

الخيارات التالية (بما في ذلك الخيارات المذكورة أعلاه) محددة فقط لتشغيل WebdriverIO مع مشغل اختبار WDIO:

### specs

تحديد المواصفات لتنفيذ الاختبار. يمكنك إما تحديد نمط glob لمطابقة ملفات متعددة في وقت واحد أو تضمين glob أو مجموعة من المسارات في مصفوفة لتشغيلها ضمن عملية عامل واحدة. يتم اعتبار جميع المسارات نسبية من مسار ملف التكوين.

النوع: `(String | String[])[]`<br />
الافتراضي: `[]`

### exclude

استبعاد مواصفات من تنفيذ الاختبار. يتم اعتبار جميع المسارات نسبية من مسار ملف التكوين.

النوع: `String[]`<br />
الافتراضي: `[]`

### suites

كائن يصف مجموعات مختلفة، والتي يمكنك بعد ذلك تحديدها باستخدام خيار `--suite` على واجهة سطر الأوامر `wdio`.

النوع: `Object`<br />
الافتراضي: `{}`

### capabilities

نفس قسم `capabilities` الموضح أعلاه، باستثناء خيار تحديد إما كائن [`multiremote`](/docs/multiremote)، أو جلسات WebDriver متعددة في مصفوفة للتنفيذ المتوازي.

يمكنك تطبيق نفس القدرات الخاصة بالبائع والمتصفح كما هو محدد [أعلاه](/docs/configuration#capabilities).

النوع: `Object`|`Object[]`<br />
الافتراضي: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

الحد الأقصى لعدد العمال المتوازيين الإجمالي.

__ملاحظة:__ أنه قد يكون رقمًا مرتفعًا مثل `100`، عندما يتم إجراء الاختبارات على بعض البائعين الخارجيين مثل آلات Sauce Labs. هناك، لا يتم اختبار الاختبارات على جهاز واحد، بل على أجهزة افتراضية متعددة. إذا كان سيتم تشغيل الاختبارات على جهاز تطوير محلي، استخدم رقمًا أكثر معقولية، مثل `3` أو `4` أو `5`. في الأساس، هذا هو عدد المتصفحات التي سيتم بدء تشغيلها وتشغيل اختباراتك في نفس الوقت، لذلك يعتمد ذلك على مقدار ذاكرة الوصول العشوائي (RAM) الموجودة على جهازك، وعدد التطبيقات الأخرى التي تعمل على جهازك.

يمكنك أيضًا تطبيق `maxInstances` داخل كائنات القدرة الخاصة بك باستخدام قدرة `wdio:maxInstances`. سيؤدي ذلك إلى الحد من كمية الجلسات المتوازية لتلك القدرة المعينة.

النوع: `Number`<br />
الافتراضي: `100`

### maxInstancesPerCapability

الحد الأقصى لعدد العمال المتوازيين الإجمالي لكل قدرة.

النوع: `Number`<br />
الافتراضي: `100`

### injectGlobals

يدرج العناصر العالمية لـ WebdriverIO (مثل `browser` و `$` و `$$`) في البيئة العالمية.
إذا قمت بتعيينها إلى `false`، يجب عليك الاستيراد من `@wdio/globals`، على سبيل المثال:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

ملاحظة: لا يتعامل WebdriverIO مع حقن المتغيرات العالمية الخاصة بإطار الاختبار.

النوع: `Boolean`<br />
الافتراضي: `true`

### bail

إذا كنت تريد أن يتوقف تشغيل الاختبار بعد عدد معين من فشل الاختبار، استخدم `bail`.
(الإعداد الافتراضي هو `0`، مما يشغل جميع الاختبارات بغض النظر.) **ملاحظة:** الاختبار في هذا السياق هو جميع الاختبارات داخل ملف مواصفات واحد (عند استخدام Mocha أو Jasmine) أو جميع الخطوات داخل ملف الميزات (عند استخدام Cucumber). إذا كنت تريد التحكم في سلوك الإيقاف داخل اختبارات ملف اختبار واحد، ألق نظرة على خيارات [إطار العمل](frameworks) المتاحة.

النوع: `Number`<br />
الافتراضي: `0` (لا تتوقف؛ قم بتشغيل جميع الاختبارات)

### specFileRetries

عدد مرات إعادة محاولة ملف المواصفات بالكامل عندما يفشل ككل.

النوع: `Number`<br />
الافتراضي: `0`

### specFileRetriesDelay

التأخير بالثواني بين محاولات إعادة ملف المواصفات

النوع: `Number`<br />
الافتراضي: `0`

### specFileRetriesDeferred

ما إذا كان يجب إعادة محاولة ملفات المواصفات المعاد محاولتها على الفور أو تأجيلها إلى نهاية الطابور.

النوع: `Boolean`<br />
الافتراضي: `true`

### groupLogsByTestSpec

اختر عرض مخرجات السجل.

إذا تم تعيينه إلى `false`، سيتم طباعة السجلات من ملفات اختبار مختلفة في الوقت الفعلي. يرجى ملاحظة أن هذا قد يؤدي إلى اختلاط مخرجات السجل من ملفات مختلفة عند التشغيل بالتوازي.

إذا تم تعيينه إلى `true`، سيتم تجميع مخرجات السجل حسب مواصفات الاختبار وطباعتها فقط عند اكتمال مواصفات الاختبار.

بشكل افتراضي، يتم تعيينه إلى `false` بحيث يتم طباعة السجلات في الوقت الفعلي.

النوع: `Boolean`<br />
الافتراضي: `false`

### autoAssertOnTestEnd

يتحكم فيما إذا كان WebdriverIO يتحقق تلقائيًا من جميع التوكيدات اللينة في نهاية كل اختبار. عند التعيين إلى `true`، سيتم التحقق تلقائيًا من أي توكيدات لينة متراكمة وتسبب فشل الاختبار إذا فشلت أي من التوكيدات. عند التعيين إلى `false`، يجب عليك استدعاء طريقة التأكيد يدويًا للتحقق من التوكيدات اللينة.

النوع: `Boolean`<br />
الافتراضي: `true`

### services

الخدمات تتولى وظيفة محددة لا تريد الاهتمام بها. إنها تعزز إعداد الاختبار الخاص بك بأقل جهد ممكن.

النوع: `String[]|Object[]`<br />
الافتراضي: `[]`

### framework

يحدد إطار الاختبار الذي سيستخدمه مشغل اختبار WDIO.

النوع: `String`<br />
الافتراضي: `mocha`<br />
الخيارات: `mocha` | `jasmine`

### mochaOpts, jasmineOpts و cucumberOpts

خيارات محددة متعلقة بالإطار. راجع وثائق محول الإطار لمعرفة الخيارات المتاحة. اقرأ المزيد عن هذا في [الأطر](frameworks).

النوع: `Object`<br />
الافتراضي: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

قائمة ميزات خيار مع أرقام الأسطر (عند [استخدام إطار cucumber](./Frameworks.md#using-cucumber)).

النوع: `String[]`
الافتراضي: `[]`

### reporters

قائمة المراسلين المراد استخدامها. يمكن أن يكون المراسل إما سلسلة أو مصفوفة من
`['reporterName', { /* reporter options */}]` حيث العنصر الأول عبارة عن سلسلة باسم المراسل والعنصر الثاني كائن به خيارات المراسل.

النوع: `String[]|Object[]`<br />
الافتراضي: `[]`

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

يحدد الفاصل الزمني الذي يجب على المراسل التحقق فيه مما إذا كانوا متزامنين إذا كانوا يبلغون عن سجلاتهم بشكل غير متزامن (على سبيل المثال، إذا تم بث السجلات إلى بائع من طرف ثالث).

النوع: `Number`<br />
الافتراضي: `100` (مللي ثانية)

### reporterSyncTimeout

يحدد الحد الأقصى للوقت الذي يتمتع به المراسلون لإنهاء تحميل جميع سجلاتهم حتى يتم إلقاء خطأ من قبل مشغل الاختبار.

النوع: `Number`<br />
الافتراضي: `5000` (مللي ثانية)

### execArgv

وسيطات Node لتحديدها عند إطلاق العمليات الفرعية.

النوع: `String[]`<br />
الافتراضي: `null`

### filesToWatch

قائمة من أنماط السلاسل التي تدعم glob والتي تخبر مشغل الاختبار بمراقبة ملفات أخرى، مثل ملفات التطبيق، عند تشغيلها باستخدام العلامة `--watch`. بشكل افتراضي، يراقب مشغل الاختبار بالفعل جميع ملفات المواصفات.

النوع: `String[]`<br />
الافتراضي: `[]`

### updateSnapshots

اضبط على true إذا كنت تريد تحديث لقطاتك. يفضل استخدامه كجزء من معلمة CLI، على سبيل المثال `wdio run wdio.conf.js --s`.

النوع: `'new' | 'all' | 'none'`<br />
الافتراضي: `none` إذا لم يتم توفيره وتشغيل الاختبارات في CI، `new` إذا لم يتم توفيره، وإلا ما تم توفيره

### resolveSnapshotPath

يتجاوز مسار اللقطة الافتراضي. على سبيل المثال، لتخزين اللقطات بجوار ملفات الاختبار.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

النوع: `(testPath: string, snapExtension: string) => string`<br />
الافتراضي: يخزن ملفات اللقطة في دليل `__snapshots__` بجوار ملف الاختبار

### tsConfigPath

يستخدم WDIO `tsx` لتجميع ملفات TypeScript. يتم اكتشاف TSConfig الخاص بك تلقائيًا من دليل العمل الحالي ولكن يمكنك تحديد مسار مخصص هنا أو عن طريق تعيين متغير البيئة TSX_TSCONFIG_PATH.

راجع وثائق `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

النوع: `String`<br />
الافتراضي: `null`<br />

## الخطافات

يتيح لك مشغل اختبار WDIO تعيين خطافات ليتم تشغيلها في أوقات محددة من دورة حياة الاختبار. وهذا يسمح بإجراءات مخصصة (مثل التقاط لقطة شاشة إذا فشل الاختبار).

كل خطاف له كمعلمة معلومات محددة عن دورة الحياة (مثل معلومات حول مجموعة الاختبار أو الاختبار). اقرأ المزيد حول جميع خصائص الخطاف في [ملف التكوين المثالي](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**ملاحظة:** بعض الخطافات (`onPrepare` و `onWorkerStart` و `onWorkerEnd` و `onComplete`) يتم تنفيذها في عملية مختلفة وبالتالي لا يمكن مشاركة أي بيانات عالمية مع الخطافات الأخرى التي تعيش في عملية العامل.

### onPrepare

يتم تنفيذه مرة واحدة قبل إطلاق جميع العمال.

المعلمات:

- `config` (`object`): كائن تكوين WebdriverIO
- `param` (`object[]`): قائمة بتفاصيل القدرات

### onWorkerStart

يتم تنفيذه قبل إنشاء عملية عامل ويمكن استخدامه لتهيئة خدمة محددة لذلك العامل بالإضافة إلى تعديل بيئات التشغيل بطريقة غير متزامنة.

المعلمات:

- `cid` (`string`): معرف القدرة (مثل 0-0)
- `caps` (`object`): يحتوي على قدرات الجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): المواصفات ليتم تشغيلها في عملية العامل
- `args` (`object`): كائن سيتم دمجه مع التكوين الرئيسي بمجرد تهيئة العامل
- `execArgv` (`string[]`): قائمة بوسيطات السلسلة التي تم تمريرها إلى عملية العامل

### onWorkerEnd

يتم تنفيذه بعد خروج عملية العامل مباشرة.

المعلمات:

- `cid` (`string`): معرف القدرة (مثل 0-0)
- `exitCode` (`number`): 0 - نجاح، 1 - فشل
- `specs` (`string[]`): المواصفات ليتم تشغيلها في عملية العامل
- `retries` (`number`): عدد إعادة محاولات مستوى المواصفات المستخدمة كما هو محدد في [_"إضافة إعادة محاولات على أساس ملف مواصفات"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

يتم تنفيذه قبل تهيئة جلسة webdriver وإطار الاختبار مباشرةً. يسمح لك بالتلاعب بالتكوين اعتمادًا على القدرة أو المواصفات.

المعلمات:

- `config` (`object`): كائن تكوين WebdriverIO
- `caps` (`object`): يحتوي على قدرات الجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): المواصفات ليتم تشغيلها في عملية العامل

### before

يتم تنفيذه قبل بدء تنفيذ الاختبار. في هذه المرحلة يمكنك الوصول إلى جميع المتغيرات العالمية مثل `browser`. إنه المكان المثالي لتحديد الأوامر المخصصة.

المعلمات:

- `caps` (`object`): يحتوي على قدرات الجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): المواصفات ليتم تشغيلها في عملية العامل
- `browser` (`object`): مثيل جلسة المتصفح/الجهاز التي تم إنشاؤها

### beforeSuite

خطاف يتم تنفيذه قبل بدء المجموعة (في Mocha/Jasmine فقط)

المعلمات:

- `suite` (`object`): تفاصيل المجموعة

### beforeHook

خطاف يتم تنفيذه *قبل* خطاف داخل المجموعة يبدأ (على سبيل المثال، يتم تشغيله قبل استدعاء beforeEach في Mocha)

المعلمات:

- `test` (`object`): تفاصيل الاختبار
- `context` (`object`): سياق الاختبار (يمثل كائن World في Cucumber)

### afterHook

خطاف يتم تنفيذه *بعد* انتهاء خطاف داخل المجموعة (على سبيل المثال، يتم تشغيله بعد استدعاء afterEach في Mocha)

المعلمات:

- `test` (`object`): تفاصيل الاختبار
- `context` (`object`): سياق الاختبار (يمثل كائن World في Cucumber)
- `result` (`object`): نتيجة الخطاف (تحتوي على خصائص `error` و `result` و `duration` و `passed` و `retries`)

### beforeTest

دالة يتم تنفيذها قبل اختبار (في Mocha/Jasmine فقط).

المعلمات:

- `test` (`object`): تفاصيل الاختبار
- `context` (`object`): كائن النطاق الذي تم تنفيذ الاختبار به

### beforeCommand

يتم تشغيله قبل تنفيذ أمر WebdriverIO.

المعلمات:

- `commandName` (`string`): اسم الأمر
- `args` (`*`): الوسيطات التي سيتلقاها الأمر

### afterCommand

يتم تشغيله بعد تنفيذ أمر WebdriverIO.

المعلمات:

- `commandName` (`string`): اسم الأمر
- `args` (`*`): الوسيطات التي سيتلقاها الأمر
- `result` (`*`): نتيجة الأمر
- `error` (`Error`): كائن الخطأ إذا وجد

### afterTest

دالة يتم تنفيذها بعد انتهاء اختبار (في Mocha/Jasmine).

المعلمات:

- `test` (`object`): تفاصيل الاختبار
- `context` (`object`): كائن النطاق الذي تم تنفيذ الاختبار به
- `result.error` (`Error`): كائن الخطأ في حالة فشل الاختبار، وإلا `undefined`
- `result.result` (`Any`): كائن إرجاع دالة الاختبار
- `result.duration` (`Number`): مدة الاختبار
- `result.passed` (`Boolean`): صحيح إذا نجح الاختبار، وإلا خطأ
- `result.retries` (`Object`): معلومات حول إعادة المحاولات المتعلقة بالاختبار الفردي كما هو محدد لـ [Mocha و Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) بالإضافة إلى [Cucumber](./Retry.md#rerunning-in-cucumber)، على سبيل المثال `{ attempts: 0, limit: 0 }`، انظر
- `result` (`object`): نتيجة الخطاف (تحتوي على خصائص `error` و `result` و `duration` و `passed` و `retries`)

### afterSuite

خطاف يتم تنفيذه بعد انتهاء المجموعة (في Mocha/Jasmine فقط)

المعلمات:

- `suite` (`object`): تفاصيل المجموعة

### after

يتم تنفيذه بعد اكتمال جميع الاختبارات. لا يزال لديك وصول إلى جميع المتغيرات العالمية من الاختبار.

المعلمات:

- `result` (`number`): 0 - اجتياز الاختبار، 1 - فشل الاختبار
- `caps` (`object`): يحتوي على قدرات الجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): المواصفات ليتم تشغيلها في عملية العامل

### afterSession

يتم تنفيذه بعد إنهاء جلسة webdriver مباشرة.

المعلمات:

- `config` (`object`): كائن تكوين WebdriverIO
- `caps` (`object`): يحتوي على قدرات الجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): المواصفات ليتم تشغيلها في عملية العامل

### onComplete

يتم تنفيذه بعد إيقاف تشغيل جميع العمال وعلى وشك الخروج من العملية. سيؤدي خطأ تم إلقاؤه في خطاف onComplete إلى فشل تشغيل الاختبار.

المعلمات:

- `exitCode` (`number`): 0 - نجاح، 1 - فشل
- `config` (`object`): كائن تكوين WebdriverIO
- `caps` (`object`): يحتوي على قدرات الجلسة التي سيتم إنشاؤها في العامل
- `result` (`object`): كائن النتائج يحتوي على نتائج الاختبار

### onReload

يتم تنفيذه عند حدوث تحديث.

المعلمات:

- `oldSessionId` (`string`): معرف الجلسة للجلسة القديمة
- `newSessionId` (`string`): معرف الجلسة للجلسة الجديدة

### beforeFeature

يتم تشغيله قبل ميزة Cucumber.

المعلمات:

- `uri` (`string`): مسار ملف الميزة
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): كائن ميزة Cucumber

### afterFeature

يتم تشغيله بعد ميزة Cucumber.

المعلمات:

- `uri` (`string`): مسار ملف الميزة
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): كائن ميزة Cucumber

### beforeScenario

يتم تشغيله قبل سيناريو Cucumber.

المعلمات:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): كائن عالمي يحتوي على معلومات حول البيكل وخطوة الاختبار
- `context` (`object`): كائن Cucumber World

### afterScenario

يتم تشغيله بعد سيناريو Cucumber.

المعلمات:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): كائن عالمي يحتوي على معلومات حول البيكل وخطوة الاختبار
- `result` (`object`): كائن النتائج يحتوي على نتائج السيناريو
- `result.passed` (`boolean`): صحيح إذا نجح السيناريو
- `result.error` (`string`): مكدس الأخطاء إذا فشل السيناريو
- `result.duration` (`number`): مدة السيناريو بالمللي ثانية
- `context` (`object`): كائن Cucumber World

### beforeStep

يتم تشغيله قبل خطوة Cucumber.

المعلمات:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): كائن خطوة Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): كائن سيناريو Cucumber
- `context` (`object`): كائن Cucumber World

### afterStep

يتم تشغيله بعد خطوة Cucumber.

المعلمات:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): كائن خطوة Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): كائن سيناريو Cucumber
- `result`: (`object`): كائن النتائج يحتوي على نتائج الخطوة
- `result.passed` (`boolean`): صحيح إذا نجح السيناريو
- `result.error` (`string`): مكدس الأخطاء إذا فشل السيناريو
- `result.duration` (`number`): مدة السيناريو بالمللي ثانية
- `context` (`object`): كائن Cucumber World

### beforeAssertion

خطاف يتم تنفيذه قبل حدوث توكيد WebdriverIO.

المعلمات:

- `params`: معلومات التوكيد
- `params.matcherName` (`string`): اسم المطابق (مثل `toHaveTitle`)
- `params.expectedValue`: القيمة التي يتم تمريرها إلى المطابق
- `params.options`: خيارات التوكيد

### afterAssertion

خطاف يتم تنفيذه بعد حدوث توكيد WebdriverIO.

المعلمات:

- `params`: معلومات التوكيد
- `params.matcherName` (`string`): اسم المطابق (مثل `toHaveTitle`)
- `params.expectedValue`: القيمة التي يتم تمريرها إلى المطابق
- `params.options`: خيارات التوكيد
- `params.result`: نتائج التوكيد