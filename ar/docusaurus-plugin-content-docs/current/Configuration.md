---
id: configuration
title: التكوين
---

بناءً على [نوع الإعداد](/docs/setuptypes) (مثل استخدام روابط البروتوكول الخام، أو WebdriverIO كحزمة مستقلة أو مشغل اختبار WDIO) هناك مجموعة مختلفة من الخيارات المتاحة للتحكم في البيئة.

## خيارات WebDriver

الخيارات التالية محددة عند استخدام حزمة بروتوكول [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

البروتوكول المستخدم عند التواصل مع خادم السائق.

النوع: `String`<br />
القيمة الافتراضية: `http`

### hostname

مضيف خادم السائق الخاص بك.

النوع: `String`<br />
القيمة الافتراضية: `0.0.0.0`

### port

المنفذ الذي يعمل عليه خادم السائق الخاص بك.

النوع: `Number`<br />
القيمة الافتراضية: `undefined`

### path

المسار إلى نقطة نهاية خادم السائق.

النوع: `String`<br />
القيمة الافتراضية: `/`

### queryParams

معلمات الاستعلام التي يتم تمريرها إلى خادم السائق.

النوع: `Object`<br />
القيمة الافتراضية: `undefined`

### user

اسم المستخدم الخاص بخدمة السحابة الخاصة بك (يعمل فقط مع حسابات [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) أو [LambdaTest](https://www.lambdatest.com)). إذا تم تعيينه، سيقوم WebdriverIO بتعيين خيارات الاتصال تلقائيًا لك. إذا كنت لا تستخدم مزود سحابة، يمكن استخدام هذا للمصادقة على أي واجهة WebDriver خلفية أخرى.

النوع: `String`<br />
القيمة الافتراضية: `undefined`

### key

مفتاح الوصول أو المفتاح السري لخدمة السحابة الخاصة بك (يعمل فقط مع حسابات [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) أو [LambdaTest](https://www.lambdatest.com)). إذا تم تعيينه، سيقوم WebdriverIO بتعيين خيارات الاتصال تلقائيًا لك. إذا كنت لا تستخدم مزود سحابة، يمكن استخدام هذا للمصادقة على أي واجهة WebDriver خلفية أخرى.

النوع: `String`<br />
القيمة الافتراضية: `undefined`

### capabilities

يحدد القدرات التي تريد تشغيلها في جلسة WebDriver الخاصة بك. راجع [بروتوكول WebDriver](https://w3c.github.io/webdriver/#capabilities) لمزيد من التفاصيل. إذا كنت تقوم بتشغيل سائق أقدم لا يدعم بروتوكول WebDriver، فستحتاج إلى استخدام [قدرات JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) لتشغيل جلسة بنجاح.

بالإضافة إلى القدرات المستندة إلى WebDriver، يمكنك تطبيق خيارات محددة للمتصفح والبائع تسمح بتكوين أعمق للمتصفح أو الجهاز عن بُعد. هذه موثقة في وثائق البائع المقابلة، على سبيل المثال:

- `goog:chromeOptions`: لـ [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: لـ [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: لـ [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: لـ [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: لـ [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: لـ [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

بالإضافة إلى ذلك، هناك أداة مساعدة مفيدة وهي [مكون تكوين الاختبار الآلي](https://docs.saucelabs.com/basics/platform-configurator/) من Sauce Labs، والتي تساعدك على إنشاء هذا الكائن من خلال النقر معًا على القدرات المطلوبة.

النوع: `Object`<br />
القيمة الافتراضية: `null`

**مثال:**

```js
{
    browserName: 'chrome', // الخيارات: `chrome`، `edge`، `firefox`، `safari`
    browserVersion: '27.0', // إصدار المتصفح
    platformName: 'Windows 10' // منصة نظام التشغيل
}
```

إذا كنت تقوم بإجراء اختبارات ويب أو أصلية على أجهزة محمولة، فإن `capabilities` تختلف عن بروتوكول WebDriver. راجع [وثائق Appium](https://appium.io/docs/en/latest/guides/caps/) لمزيد من التفاصيل.

### logLevel

مستوى تفصيل السجلات.

النوع: `String`<br />
القيمة الافتراضية: `info`<br />
الخيارات: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

الدليل لتخزين جميع ملفات سجل مشغل الاختبار (بما في ذلك سجلات المراسل وسجلات `wdio`). إذا لم يتم تعيينه، يتم بث جميع السجلات إلى `stdout`. نظرًا لأن معظم المراسلين مصممون للتسجيل في `stdout`، يوصى باستخدام هذا الخيار فقط لمراسلين محددين حيث يكون من المنطقي أكثر دفع التقرير إلى ملف (مثل مراسل `junit`، على سبيل المثال).

عند التشغيل في الوضع المستقل، فإن السجل الوحيد الذي ينشئه WebdriverIO هو سجل `wdio`.

النوع: `String`<br />
القيمة الافتراضية: `null`

### connectionRetryTimeout

المهلة لأي طلب WebDriver إلى سائق أو شبكة.

النوع: `Number`<br />
القيمة الافتراضية: `120000`

### connectionRetryCount

الحد الأقصى لعدد إعادة محاولات الطلب إلى خادم Selenium.

النوع: `Number`<br />
القيمة الافتراضية: `3`

### agent

يسمح لك باستخدام وكيل `http`/`https`/`http2` مخصص [agent](https://www.npmjs.com/package/got#agent) لإجراء الطلبات.

النوع: `Object`<br />
القيمة الافتراضية:

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
القيمة الافتراضية: `{}`

### transformRequest

دالة تعترض [خيارات طلب HTTP](https://github.com/sindresorhus/got#options) قبل إجراء طلب WebDriver

النوع: `(RequestOptions) => RequestOptions`<br />
القيمة الافتراضية: *لا شيء*

### transformResponse

دالة تعترض كائنات استجابة HTTP بعد وصول استجابة WebDriver. يتم تمرير الدالة لكائن الاستجابة الأصلي كالأول و `RequestOptions` المقابل كالوسيط الثاني.

النوع: `(Response, RequestOptions) => Response`<br />
القيمة الافتراضية: *لا شيء*

### strictSSL

ما إذا كان لا يتطلب أن تكون شهادة SSL صالحة.
يمكن تعيينه عبر متغيرات البيئة مثل `STRICT_SSL` أو `strict_ssl`.

النوع: `Boolean`<br />
القيمة الافتراضية: `true`

### enableDirectConnect

ما إذا كان يتم تمكين [ميزة اتصال Appium المباشر](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
لا يفعل شيئًا إذا لم تحتوي الاستجابة على المفاتيح المناسبة أثناء تمكين العلامة.

النوع: `Boolean`<br />
القيمة الافتراضية: `true`

### cacheDir

المسار إلى جذر دليل ذاكرة التخزين المؤقت. يتم استخدام هذا الدليل لتخزين جميع برامج التشغيل التي يتم تنزيلها عند محاولة بدء جلسة.

النوع: `String`<br />
القيمة الافتراضية: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

للحصول على تسجيل أكثر أمانًا، يمكن أن تخفي التعبيرات العادية المعينة باستخدام `maskingPatterns` المعلومات الحساسة من السجل.
 - تنسيق السلسلة هو تعبير عادي مع أو بدون أعلام (مثل `/.../i`) ومفصولة بفواصل للتعبيرات العادية المتعددة.
 - لمزيد من التفاصيل حول أنماط التقنيع، راجع [قسم أنماط التقنيع في ملف README الخاص بـ WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

النوع: `String`<br />
القيمة الافتراضية: `undefined`

**مثال:**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

---

## WebdriverIO

يمكن استخدام الخيارات التالية (بما في ذلك تلك المذكورة أعلاه) مع WebdriverIO بشكل مستقل:

### automationProtocol

حدد البروتوكول الذي تريد استخدامه لأتمتة المتصفح الخاص بك. حاليًا [`webdriver`](https://www.npmjs.com/package/webdriver) فقط مدعوم، حيث أنه تقنية أتمتة المتصفح الرئيسية التي يستخدمها WebdriverIO.

إذا كنت ترغب في أتمتة المتصفح باستخدام تقنية أتمتة مختلفة، تأكد من تعيين هذه الخاصية إلى مسار يحل إلى وحدة تلتزم بالواجهة التالية:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * ابدأ جلسة أتمتة وأعد WebdriverIO [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * مع أوامر الأتمتة المعنية. انظر حزمة [webdriver](https://www.npmjs.com/package/webdriver)
     * كتنفيذ مرجعي
     *
     * @param {Capabilities.RemoteConfig} options خيارات WebdriverIO
     * @param {Function} hook يسمح بتعديل العميل قبل إطلاقه من الوظيفة
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
     * يسمح للمستخدم بالارتباط بجلسات موجودة
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
القيمة الافتراضية: `webdriver`

### baseUrl

اختصر استدعاءات أمر `url` عن طريق تعيين عنوان URL أساسي.
- إذا كان معلمة `url` الخاصة بك تبدأ بـ `/`، فسيتم إضافة `baseUrl` في بداية العنوان (باستثناء مسار `baseUrl`، إذا كان له مسار).
- إذا كانت معلمة `url` الخاصة بك تبدأ بدون مخطط أو `/` (مثل `some/path`)، فسيتم إضافة `baseUrl` الكامل مباشرة في البداية.

النوع: `String`<br />
القيمة الافتراضية: `null`

### waitforTimeout

المهلة الافتراضية لجميع أوامر `waitFor*`. (لاحظ الحرف الصغير `f` في اسم الخيار.) تؤثر هذه المهلة __فقط__ على الأوامر التي تبدأ بـ `waitFor*` ووقت الانتظار الافتراضي الخاص بها.

لزيادة المهلة لـ _اختبار_، يرجى الاطلاع على وثائق الإطار.

النوع: `Number`<br />
القيمة الافتراضية: `5000`

### waitforInterval

الفاصل الزمني الافتراضي لجميع أوامر `waitFor*` للتحقق مما إذا تم تغيير حالة متوقعة (مثل الرؤية).

النوع: `Number`<br />
القيمة الافتراضية: `100`

### region

إذا كنت تعمل على Sauce Labs، يمكنك اختيار تشغيل الاختبارات بين مراكز بيانات مختلفة: الولايات المتحدة أو الاتحاد الأوروبي.
لتغيير منطقتك إلى الاتحاد الأوروبي، أضف `region: 'eu'` إلى التكوين الخاص بك.

__ملاحظة:__ هذا له تأثير فقط إذا قمت بتوفير خيارات `user` و `key` المرتبطة بحساب Sauce Labs الخاص بك.

النوع: `String`<br />
القيمة الافتراضية: `us`

*(فقط للأجهزة الافتراضية و/أو المحاكيات)*

---

## خيارات Testrunner

يتم تحديد الخيارات التالية (بما في ذلك تلك المذكورة أعلاه) فقط لتشغيل WebdriverIO مع مشغل اختبار WDIO:

### specs

تحديد مواصفات لتنفيذ الاختبار. يمكنك إما تحديد نمط شامل لمطابقة ملفات متعددة في وقت واحد أو لف نمط شامل أو مجموعة من المسارات في مصفوفة لتشغيلها داخل عملية عامل واحدة. تعتبر جميع المسارات نسبية من مسار ملف التكوين.

النوع: `(String | String[])[]`<br />
القيمة الافتراضية: `[]`

### exclude

استبعاد المواصفات من تنفيذ الاختبار. تعتبر جميع المسارات نسبية من مسار ملف التكوين.

النوع: `String[]`<br />
القيمة الافتراضية: `[]`

### suites

كائن يصف مجموعات مختلفة، والتي يمكنك بعد ذلك تحديدها باستخدام خيار `--suite` على واجهة سطر أوامر `wdio`.

النوع: `Object`<br />
القيمة الافتراضية: `{}`

### capabilities

نفس قسم `capabilities` الموصوف أعلاه، باستثناء وجود خيار لتحديد إما كائن [`multiremote`](/docs/multiremote)، أو جلسات WebDriver متعددة في مصفوفة للتنفيذ المتوازي.

يمكنك تطبيق نفس القدرات الخاصة بالبائع والمتصفح كما هو محدد [أعلاه](/docs/configuration#capabilities).

النوع: `Object`|`Object[]`<br />
القيمة الافتراضية: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

الحد الأقصى لعدد العمال المتوازية التي تعمل بشكل عام.

__ملاحظة:__ قد يكون هذا الرقم عاليًا مثل `100`، عندما يتم إجراء الاختبارات على بعض البائعين الخارجيين مثل آلات Sauce Labs. هناك، لا يتم اختبار الاختبارات على جهاز واحد، بل على أجهزة ظاهرية متعددة. إذا كان يتم تشغيل الاختبارات على جهاز تطوير محلي، فاستخدم رقمًا أكثر معقولية، مثل `3` أو `4` أو `5`. في الأساس، هذا هو عدد المتصفحات التي سيتم بدء تشغيلها في وقت واحد وتشغيل اختباراتك في نفس الوقت، لذا فهو يعتمد على مقدار ذاكرة الوصول العشوائي (RAM) الموجودة على جهازك، وعدد التطبيقات الأخرى التي تعمل على جهازك.

يمكنك أيضًا تطبيق `maxInstances` داخل كائنات القدرات باستخدام قدرة `wdio:maxInstances`. سيؤدي هذا إلى الحد من عدد الجلسات المتوازية لتلك القدرة المعينة.

النوع: `Number`<br />
القيمة الافتراضية: `100`

### maxInstancesPerCapability

الحد الأقصى لعدد العمال المتوازية التي تعمل لكل قدرة.

النوع: `Number`<br />
القيمة الافتراضية: `100`

### injectGlobals

يدخل عناصر WebdriverIO العالمية (مثل `browser` و `$` و `$$`) في البيئة العالمية.
إذا قمت بتعيينها إلى `false`، يجب عليك الاستيراد من `@wdio/globals`، على سبيل المثال:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

ملاحظة: لا يتعامل WebdriverIO مع حقن العناصر العالمية الخاصة بإطار الاختبار.

النوع: `Boolean`<br />
القيمة الافتراضية: `true`

### bail

إذا كنت تريد أن يتوقف تشغيل الاختبار بعد عدد محدد من حالات فشل الاختبار، استخدم `bail`.
(القيمة الافتراضية هي `0`، مما يعني تشغيل جميع الاختبارات بغض النظر عن النتيجة.) **ملاحظة:** الاختبار في هذا السياق هو جميع الاختبارات داخل ملف مواصفات واحد (عند استخدام Mocha أو Jasmine) أو جميع الخطوات داخل ملف ميزة (عند استخدام Cucumber). إذا كنت تريد التحكم في سلوك الخروج داخل اختبارات ملف اختبار واحد، فألق نظرة على خيارات [الإطار](frameworks) المتاحة.

النوع: `Number`<br />
القيمة الافتراضية: `0` (لا تخرج؛ قم بتشغيل جميع الاختبارات)

### specFileRetries

عدد مرات إعادة محاولة ملف مواصفات بأكمله عندما يفشل ككل.

النوع: `Number`<br />
القيمة الافتراضية: `0`

### specFileRetriesDelay

التأخير بالثواني بين محاولات إعادة ملف المواصفات

النوع: `Number`<br />
القيمة الافتراضية: `0`

### specFileRetriesDeferred

ما إذا كان يجب إعادة محاولة ملفات المواصفات المعاد محاولتها على الفور أو تأجيلها إلى نهاية القائمة.

النوع: `Boolean`<br />
القيمة الافتراضية: `true`

### groupLogsByTestSpec

اختر عرض إخراج السجل.

إذا تم تعيينه إلى `false`، فسيتم طباعة السجلات من ملفات الاختبار المختلفة في الوقت الفعلي. يرجى ملاحظة أن هذا قد يؤدي إلى اختلاط مخرجات السجل من ملفات مختلفة عند التشغيل بالتوازي.

إذا تم تعيينه إلى `true`، فسيتم تجميع مخرجات السجل حسب مواصفات الاختبار وطباعتها فقط عند اكتمال مواصفات الاختبار.

بشكل افتراضي، يتم تعيينه إلى `false` بحيث يتم طباعة السجلات في الوقت الفعلي.

النوع: `Boolean`<br />
القيمة الافتراضية: `false`

### services

الخدمات تتولى مهمة محددة لا تريد الاهتمام بها. فهي تعزز إعداد الاختبار الخاص بك بأقل جهد تقريبًا.

النوع: `String[]|Object[]`<br />
القيمة الافتراضية: `[]`

### framework

يحدد إطار الاختبار الذي سيتم استخدامه بواسطة مشغل اختبار WDIO.

النوع: `String`<br />
القيمة الافتراضية: `mocha`<br />
الخيارات: `mocha` | `jasmine`

### mochaOpts, jasmineOpts and cucumberOpts

خيارات محددة متعلقة بالإطار. راجع وثائق محول الإطار لمعرفة الخيارات المتاحة. اقرأ المزيد عن هذا في [الأطر](frameworks).

النوع: `Object`<br />
القيمة الافتراضية: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

قائمة ميزات cucumber مع أرقام الأسطر (عند [استخدام إطار cucumber](./Frameworks.md#using-cucumber)).

النوع: `String[]`
القيمة الافتراضية: `[]`

### reporters

قائمة المراسلين المراد استخدامها. يمكن أن يكون المراسل إما سلسلة، أو مصفوفة من
`['reporterName', { /* reporter options */}]` حيث العنصر الأول هو سلسلة باسم المراسل والعنصر الثاني كائن به خيارات المراسل.

النوع: `String[]|Object[]`<br />
القيمة الافتراضية: `[]`

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

يحدد الفاصل الزمني الذي يجب على المراسل أن يتحقق فيه مما إذا كانوا متزامنين إذا كانوا يبلغون عن سجلاتهم بشكل غير متزامن (على سبيل المثال، إذا كانت السجلات يتم بثها إلى بائع طرف ثالث).

النوع: `Number`<br />
القيمة الافتراضية: `100` (مللي ثانية)

### reporterSyncTimeout

يحدد الحد الأقصى للوقت الذي يجب أن يكون لدى المراسلين لإنهاء رفع جميع سجلاتهم حتى يتم إلقاء خطأ بواسطة مشغل الاختبار.

النوع: `Number`<br />
القيمة الافتراضية: `5000` (مللي ثانية)

### execArgv

وسيطات Node المراد تحديدها عند إطلاق العمليات الفرعية.

النوع: `String[]`<br />
القيمة الافتراضية: `null`

### filesToWatch

قائمة من أنماط السلاسل التي تدعم glob التي تخبر مشغل الاختبار بمراقبة ملفات أخرى، مثل ملفات التطبيق، عند تشغيله مع علامة `--watch`. بشكل افتراضي، يراقب مشغل الاختبار بالفعل جميع ملفات المواصفات.

النوع: `String[]`<br />
القيمة الافتراضية: `[]`

### updateSnapshots

قم بتعيينه إلى true إذا كنت تريد تحديث لقطاتك. يُستخدم بشكل مثالي كجزء من معلمة CLI، على سبيل المثال `wdio run wdio.conf.js --s`.

النوع: `'new' | 'all' | 'none'`<br />
القيمة الافتراضية: `none` إذا لم يتم توفيره وتشغيل الاختبارات في CI، و `new` إذا لم يتم توفيره، وإلا ما تم توفيره

### resolveSnapshotPath

يتجاوز مسار اللقطة الافتراضي. على سبيل المثال، لتخزين اللقطات بجوار ملفات الاختبار.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

النوع: `(testPath: string, snapExtension: string) => string`<br />
القيمة الافتراضية: يخزن ملفات اللقطة في دليل `__snapshots__` بجوار ملف الاختبار

### tsConfigPath

يستخدم WDIO `tsx` لتجميع ملفات TypeScript. يتم اكتشاف TSConfig الخاص بك تلقائيًا من الدليل الحالي ولكن يمكنك تحديد مسار مخصص هنا أو عن طريق تعيين متغير البيئة TSX_TSCONFIG_PATH.

راجع وثائق `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

النوع: `String`<br />
القيمة الافتراضية: `null`<br />

## الخطافات

يسمح لك مشغل اختبار WDIO بتعيين خطافات ليتم تشغيلها في أوقات محددة من دورة حياة الاختبار. هذا يسمح بإجراءات مخصصة (مثل التقاط لقطة شاشة إذا فشل الاختبار).

كل خطاف له كمعلمة معلومات محددة عن دورة الحياة (مثل معلومات حول مجموعة الاختبار أو الاختبار). اقرأ المزيد عن جميع خصائص الخطاف في [ملف التكوين المثال](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**ملاحظة:** بعض الخطافات (`onPrepare`، `onWorkerStart`، `onWorkerEnd` و `onComplete`) يتم تنفيذها في عملية مختلفة وبالتالي لا يمكنها مشاركة أي بيانات عالمية مع الخطافات الأخرى التي تعيش في عملية العامل.

### onPrepare

يتم تنفيذه مرة واحدة قبل إطلاق جميع العمال.

المعلمات:

- `config` (`object`): كائن تكوين WebdriverIO
- `param` (`object[]`): قائمة تفاصيل القدرات

### onWorkerStart

يتم تنفيذه قبل إنشاء عملية عامل ويمكن استخدامه لتهيئة خدمة محددة لذلك العامل وكذلك تعديل بيئات التشغيل بطريقة غير متزامنة.

المعلمات:

- `cid` (`string`): معرف القدرة (مثل 0-0)
- `caps` (`object`): يحتوي على قدرات للجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): المواصفات التي سيتم تشغيلها في عملية العامل
- `args` (`object`): كائن سيتم دمجه مع التكوين الرئيسي بمجرد تهيئة العامل
- `execArgv` (`string[]`): قائمة وسيطات السلسلة الممررة إلى عملية العامل

### onWorkerEnd

يتم تنفيذه بعد خروج عملية العامل مباشرة.

المعلمات:

- `cid` (`string`): معرف القدرة (مثل 0-0)
- `exitCode` (`number`): 0 - نجاح، 1 - فشل
- `specs` (`string[]`): المواصفات التي سيتم تشغيلها في عملية العامل
- `retries` (`number`): عدد إعادة المحاولات على مستوى المواصفات المستخدمة كما هو محدد في [_"إضافة إعادة المحاولات على أساس ملف المواصفات"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

يتم تنفيذه قبل تهيئة جلسة webdriver وإطار الاختبار مباشرة. يسمح لك بالتلاعب بالتكوينات اعتمادًا على القدرة أو المواصفات.

المعلمات:

- `config` (`object`): كائن تكوين WebdriverIO
- `caps` (`object`): يحتوي على قدرات للجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): المواصفات التي سيتم تشغيلها في عملية العامل

### before

يتم تنفيذه قبل بدء تنفيذ الاختبار. في هذه النقطة يمكنك الوصول إلى جميع المتغيرات العالمية مثل `browser`. إنه المكان المثالي لتحديد الأوامر المخصصة.

المعلمات:

- `caps` (`object`): يحتوي على قدرات للجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): المواصفات التي سيتم تشغيلها في عملية العامل
- `browser` (`object`): نسخة من جلسة المتصفح/الجهاز التي تم إنشاؤها

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
- `result` (`object`): نتيجة الخطاف (تحتوي على خصائص `error`، `result`، `duration`، `passed`، `retries`)

### beforeTest

دالة يتم تنفيذها قبل اختبار (في Mocha/Jasmine فقط).

المعلمات:

- `test` (`object`): تفاصيل الاختبار
- `context` (`object`): كائن النطاق الذي تم تنفيذ الاختبار معه

### beforeCommand

يعمل قبل تنفيذ أمر WebdriverIO.

المعلمات:

- `commandName` (`string`): اسم الأمر
- `args` (`*`): الوسيطات التي سيتلقاها الأمر

### afterCommand

يعمل بعد تنفيذ أمر WebdriverIO.

المعلمات:

- `commandName` (`string`): اسم الأمر
- `args` (`*`): الوسيطات التي سيتلقاها الأمر
- `result` (`number`): 0 - نجاح الأمر، 1 - خطأ في الأمر
- `error` (`Error`): كائن الخطأ إن وجد

### afterTest

دالة يتم تنفيذها بعد انتهاء اختبار (في Mocha/Jasmine).

المعلمات:

- `test` (`object`): تفاصيل الاختبار
- `context` (`object`): كائن النطاق الذي تم تنفيذ الاختبار معه
- `result.error` (`Error`): كائن الخطأ في حالة فشل الاختبار، وإلا `undefined`
- `result.result` (`Any`): كائن إرجاع دالة الاختبار
- `result.duration` (`Number`): مدة الاختبار
- `result.passed` (`Boolean`): صحيح إذا نجح الاختبار، وإلا خطأ
- `result.retries` (`Object`): معلومات حول إعادة المحاولات المتعلقة باختبار واحد كما هو محدد لـ [Mocha و Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) وكذلك [Cucumber](./Retry.md#rerunning-in-cucumber)، مثل `{ attempts: 0, limit: 0 }`، انظر
- `result` (`object`): نتيجة الخطاف (تحتوي على خصائص `error`، `result`، `duration`، `passed`، `retries`)

### afterSuite

خطاف يتم تنفيذه بعد انتهاء المجموعة (في Mocha/Jasmine فقط)

المعلمات:

- `suite` (`object`): تفاصيل المجموعة

### after

يتم تنفيذه بعد الانتهاء من جميع الاختبارات. لا يزال لديك إمكانية الوصول إلى جميع المتغيرات العالمية من الاختبار.

المعلمات:

- `result` (`number`): 0 - نجاح الاختبار، 1 - فشل الاختبار
- `caps` (`object`): يحتوي على قدرات للجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): المواصفات التي سيتم تشغيلها في عملية العامل

### afterSession

يتم تنفيذه بعد إنهاء جلسة webdriver مباشرة.

المعلمات:

- `config` (`object`): كائن تكوين WebdriverIO
- `caps` (`object`): يحتوي على قدرات للجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): المواصفات التي سيتم تشغيلها في عملية العامل

### onComplete

يتم تنفيذه بعد إغلاق جميع العمال وعملية على وشك الخروج. سيؤدي الخطأ المطروح في خطاف onComplete إلى فشل تشغيل الاختبار.

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

- `uri` (`string`): مسار ملف الميزة
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): كائن ميزة Cucumber

### afterFeature

يعمل بعد ميزة Cucumber.

المعلمات:

- `uri` (`string`): مسار ملف الميزة
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): كائن ميزة Cucumber

### beforeScenario

يعمل قبل سيناريو Cucumber.

المعلمات:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): كائن عالمي يحتوي على معلومات حول الاختيار وخطوة الاختبار
- `context` (`object`): كائن Cucumber World

### afterScenario

يعمل بعد سيناريو Cucumber.

المعلمات:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): كائن عالمي يحتوي على معلومات حول الاختيار وخطوة الاختبار
- `result` (`object`): كائن النتائج الذي يحتوي على نتائج السيناريو
- `result.passed` (`boolean`): صحيح إذا نجح السيناريو
- `result.error` (`string`): كومة الخطأ إذا فشل السيناريو
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
- `result.error` (`string`): كومة الخطأ إذا فشل السيناريو
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