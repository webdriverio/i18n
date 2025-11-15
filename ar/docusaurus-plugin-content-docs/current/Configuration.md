---
id: configuration
title: التكوين
---

بناءً على [نوع الإعداد](/docs/setuptypes) (مثل استخدام ارتباطات البروتوكول الخام، WebdriverIO كحزمة مستقلة أو مشغل اختبار WDIO) هناك مجموعة مختلفة من الخيارات المتاحة للتحكم في البيئة.

## خيارات WebDriver

الخيارات التالية محددة عند استخدام حزمة بروتوكول [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

البروتوكول المستخدم عند التواصل مع خادم التشغيل.

النوع: `String`<br />
الافتراضي: `http`

### hostname

مضيف خادم التشغيل الخاص بك.

النوع: `String`<br />
الافتراضي: `0.0.0.0`

### port

المنفذ الذي يعمل عليه خادم التشغيل الخاص بك.

النوع: `Number`<br />
الافتراضي: `undefined`

### path

المسار إلى نقطة نهاية خادم التشغيل.

النوع: `String`<br />
الافتراضي: `/`

### queryParams

معلمات الاستعلام التي يتم نقلها إلى خادم التشغيل.

النوع: `Object`<br />
الافتراضي: `undefined`

### user

اسم المستخدم الخاص بخدمة السحابة (يعمل فقط مع حسابات [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) أو [LambdaTest](https://www.lambdatest.com)). إذا تم تعيينه، سيقوم WebdriverIO تلقائيًا بتعيين خيارات الاتصال لك. إذا كنت لا تستخدم مزود سحابة، يمكن استخدام هذا للمصادقة على أي خلفية WebDriver أخرى.

النوع: `String`<br />
الافتراضي: `undefined`

### key

مفتاح الوصول أو المفتاح السري لخدمة السحابة الخاصة بك (يعمل فقط مع حسابات [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) أو [LambdaTest](https://www.lambdatest.com)). إذا تم تعيينه، سيقوم WebdriverIO تلقائيًا بتعيين خيارات الاتصال لك. إذا كنت لا تستخدم مزود سحابة، يمكن استخدام هذا للمصادقة على أي خلفية WebDriver أخرى.

النوع: `String`<br />
الافتراضي: `undefined`

### capabilities

يحدد القدرات التي تريد تشغيلها في جلسة WebDriver الخاصة بك. راجع [بروتوكول WebDriver](https://w3c.github.io/webdriver/#capabilities) للمزيد من التفاصيل. إذا كنت تقوم بتشغيل سائق أقدم لا يدعم بروتوكول WebDriver، فستحتاج إلى استخدام [قدرات JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) لتشغيل جلسة بنجاح.

بجانب قدرات WebDriver، يمكنك تطبيق خيارات خاصة بالمتصفح والبائع تسمح بتكوين أعمق للمتصفح البعيد أو الجهاز. هذه موثقة في وثائق البائع المقابل، على سبيل المثال:

- `goog:chromeOptions`: لـ [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: لـ [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: لـ [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: لـ [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: لـ [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: لـ [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

بالإضافة إلى ذلك، هناك أداة مساعدة مفيدة وهي [مكون اختبار آلي من Sauce Labs](https://docs.saucelabs.com/basics/platform-configurator/)، الذي يساعدك في إنشاء هذا الكائن من خلال النقر معًا على القدرات المطلوبة.

النوع: `Object`<br />
الافتراضي: `null`

**مثال:**

```js
{
    browserName: 'chrome', // الخيارات: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // إصدار المتصفح
    platformName: 'Windows 10' // نظام التشغيل
}
```

إذا كنت تقوم بإجراء اختبارات ويب أو أصلية على الأجهزة المحمولة، فإن `capabilities` تختلف عن بروتوكول WebDriver. راجع [وثائق Appium](https://appium.io/docs/en/latest/guides/caps/) للحصول على مزيد من التفاصيل.

### logLevel

مستوى تفصيل السجل.

النوع: `String`<br />
الافتراضي: `info`<br />
الخيارات: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

دليل لتخزين كافة ملفات سجل مشغل الاختبار (بما في ذلك سجلات المراسل وسجلات `wdio`). إذا لم يتم تعيينه، يتم بث جميع السجلات إلى `stdout`. نظرًا لأن معظم المراسلين مصممين للسجل إلى `stdout`، يوصى باستخدام هذا الخيار فقط لمراسلين معينين حيث يكون من الأكثر منطقية دفع التقرير إلى ملف (مثل مراسل `junit`، على سبيل المثال).

عند التشغيل في الوضع المستقل، السجل الوحيد الذي تم إنشاؤه بواسطة WebdriverIO سيكون سجل `wdio`.

النوع: `String`<br />
الافتراضي: `null`

### connectionRetryTimeout

مهلة لأي طلب WebDriver إلى سائق أو شبكة.

النوع: `Number`<br />
الافتراضي: `120000`

### connectionRetryCount

الحد الأقصى لعدد إعادة محاولات الطلب إلى خادم Selenium.

النوع: `Number`<br />
الافتراضي: `3`

### agent

يسمح لك باستخدام وكيل `http`/`https`/`http2` [مخصص](https://www.npmjs.com/package/got#agent) لإجراء الطلبات.

النوع: `Object`<br />
الافتراضي:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

تحديد `headers` مخصصة لتمريرها في كل طلب WebDriver. إذا كانت شبكة Selenium الخاصة بك تتطلب المصادقة الأساسية، فإننا نوصي بتمرير رأس `Authorization` من خلال هذا الخيار لمصادقة طلبات WebDriver الخاصة بك، على سبيل المثال:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// قراءة اسم المستخدم وكلمة المرور من متغيرات البيئة
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// دمج اسم المستخدم وكلمة المرور بفاصل نقطتين
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
الافتراضي: *بلا*

### transformResponse

دالة تعترض كائنات استجابة HTTP بعد وصول استجابة WebDriver. يتم تمرير الدالة إلى كائن الاستجابة الأصلي كالأول و`RequestOptions` المقابلة كالمعطى الثاني.

النوع: `(Response, RequestOptions) => Response`<br />
الافتراضي: *بلا*

### strictSSL

ما إذا كان لا يتطلب أن تكون شهادة SSL صالحة.
يمكن تعيينه عبر متغيرات بيئية مثل `STRICT_SSL` أو `strict_ssl`.

النوع: `Boolean`<br />
الافتراضي: `true`

### enableDirectConnect

ما إذا كان يتم تمكين [ميزة اتصال Appium المباشر](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
لا يفعل شيئًا إذا لم تكن الاستجابة تحتوي على المفاتيح المناسبة بينما تم تمكين العلم.

النوع: `Boolean`<br />
الافتراضي: `true`

### cacheDir

المسار إلى جذر دليل ذاكرة التخزين المؤقت. يستخدم هذا الدليل لتخزين جميع السائقين التي يتم تنزيلها عند محاولة بدء جلسة.

النوع: `String`<br />
الافتراضي: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

للحصول على تسجيل أكثر أمانًا، يمكن للتعبيرات العادية المعينة بـ `maskingPatterns` إخفاء المعلومات الحساسة من السجل.
 - تنسيق السلسلة هو تعبير عادي مع أو بدون أعلام (على سبيل المثال `/.../i`) ومفصولة بفواصل للتعبيرات العادية المتعددة.
 - لمزيد من التفاصيل حول أنماط الإخفاء، انظر [قسم أنماط الإخفاء في ملف README الخاص بمسجل WDIO](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

يمكن استخدام الخيارات التالية (بما في ذلك تلك المذكورة أعلاه) مع WebdriverIO بشكل مستقل:

### automationProtocol

حدد البروتوكول الذي تريد استخدامه لأتمتة المتصفح الخاص بك. حاليًا يتم دعم [`webdriver`](https://www.npmjs.com/package/webdriver) فقط، حيث أنها تقنية أتمتة المتصفح الرئيسية التي يستخدمها WebdriverIO.

إذا كنت تريد أتمتة المتصفح باستخدام تقنية أتمتة مختلفة، تأكد من تعيين هذه الخاصية إلى مسار يتم تحليله إلى وحدة تلتزم بالواجهة التالية:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * ابدأ جلسة أتمتة وأعد monad WebdriverIO [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * مع أوامر الأتمتة المعنية. انظر حزمة [webdriver](https://www.npmjs.com/package/webdriver)
     * كتنفيذ مرجعي
     *
     * @param {Capabilities.RemoteConfig} options خيارات WebdriverIO
     * @param {Function} hook يسمح بتعديل العميل قبل إصداره من الدالة
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
     * يسمح للمستخدم بالاتصال بالجلسات الموجودة
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * تغيير معرف جلسة المثيل وقدرات المتصفح للجلسة الجديدة
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

تقصير استدعاءات أمر `url` عن طريق تعيين URL أساسي.
- إذا كان معلمة `url` الخاصة بك تبدأ بـ `/`، فسيتم إرفاق `baseUrl` في المقدمة (باستثناء مسار `baseUrl`، إذا كان له مسار).
- إذا كان معلمة `url` الخاصة بك تبدأ بدون مخطط أو `/` (مثل `some/path`)، فسيتم إرفاق `baseUrl` الكامل مباشرة في المقدمة.

النوع: `String`<br />
الافتراضي: `null`

### waitforTimeout

المهلة الافتراضية لجميع أوامر `waitFor*`. (لاحظ حرف `f` الصغير في اسم الخيار.) هذه المهلة __فقط__ تؤثر على الأوامر التي تبدأ بـ `waitFor*` ووقت الانتظار الافتراضي الخاص بها.

لزيادة المهلة لـ _اختبار_، يرجى الاطلاع على وثائق الإطار.

النوع: `Number`<br />
الافتراضي: `5000`

### waitforInterval

الفاصل الزمني الافتراضي لجميع أوامر `waitFor*` للتحقق مما إذا كانت الحالة المتوقعة (على سبيل المثال، الرؤية) قد تغيرت.

النوع: `Number`<br />
الافتراضي: `100`

### region

إذا كنت تعمل على Sauce Labs، يمكنك اختيار تشغيل الاختبارات بين مراكز البيانات المختلفة: الولايات المتحدة أو الاتحاد الأوروبي.
لتغيير المنطقة الخاصة بك إلى الاتحاد الأوروبي، أضف `region: 'eu'` إلى التكوين الخاص بك.

__ملاحظة:__ هذا يؤثر فقط إذا قدمت خيارات `user` و`key` المرتبطة بحساب Sauce Labs الخاص بك.

النوع: `String`<br />
الافتراضي: `us`

*(فقط للآلات الافتراضية و/أو المحاكاة)*

---

## خيارات Testrunner

الخيارات التالية (بما في ذلك تلك المذكورة أعلاه) محددة فقط لتشغيل WebdriverIO مع مشغل اختبار WDIO:

### specs

تحديد المواصفات لتنفيذ الاختبار. يمكنك إما تحديد نمط شامل لمطابقة ملفات متعددة في وقت واحد أو لف نمط شامل أو مجموعة من المسارات في مصفوفة لتشغيلها ضمن عملية عامل واحدة. تعتبر جميع المسارات نسبية من مسار ملف التكوين.

النوع: `(String | String[])[]`<br />
الافتراضي: `[]`

### exclude

استبعاد المواصفات من تنفيذ الاختبار. تعتبر جميع المسارات نسبية من مسار ملف التكوين.

النوع: `String[]`<br />
الافتراضي: `[]`

### suites

كائن يصف مجموعات مختلفة، والتي يمكنك بعد ذلك تحديدها باستخدام خيار `--suite` على واجهة سطر أوامر `wdio`.

النوع: `Object`<br />
الافتراضي: `{}`

### capabilities

نفس قسم `capabilities` الموضح أعلاه، باستثناء خيار تحديد إما كائن [`multiremote`](/docs/multiremote)، أو جلسات WebDriver متعددة في مصفوفة للتنفيذ المتوازي.

يمكنك تطبيق نفس القدرات الخاصة بالبائع والمتصفح كما هو محدد [أعلاه](/docs/configuration#capabilities).

النوع: `Object`|`Object[]`<br />
الافتراضي: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

الحد الأقصى لعدد العمال المتوازية التي تعمل بالكامل.

__ملاحظة:__ قد يكون رقمًا يصل إلى `100`، عندما يتم إجراء الاختبارات على بعض البائعين الخارجيين مثل آلات Sauce Labs. هناك، لا يتم اختبار الاختبارات على جهاز واحد، بل على آلات افتراضية متعددة. إذا كان يجب تشغيل الاختبارات على جهاز تطوير محلي، فاستخدم رقمًا أكثر معقولية، مثل `3` أو `4` أو `5`. في الأساس، هذا هو عدد المتصفحات التي سيتم بدء تشغيلها في وقت واحد وتشغيل اختباراتك في نفس الوقت، لذلك يعتمد على مقدار ذاكرة الوصول العشوائي (RAM) على جهازك، وكم عدد التطبيقات الأخرى التي تعمل على جهازك.

يمكنك أيضًا تطبيق `maxInstances` داخل كائنات القدرات الخاصة بك باستخدام قدرة `wdio:maxInstances`. هذا سيحد من عدد الجلسات المتوازية لتلك القدرة المحددة.

النوع: `Number`<br />
الافتراضي: `100`

### maxInstancesPerCapability

الحد الأقصى لعدد العمال المتوازية التي تعمل بالكامل لكل قدرة.

النوع: `Number`<br />
الافتراضي: `100`

### injectGlobals

يدرج عناصر WebdriverIO العالمية (مثل `browser` و`$` و`$$`) في البيئة العالمية.
إذا قمت بتعيينها على `false`، يجب عليك الاستيراد من `@wdio/globals`، على سبيل المثال:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

ملاحظة: WebdriverIO لا يتعامل مع حقن عناصر عالمية خاصة بإطار الاختبار.

النوع: `Boolean`<br />
الافتراضي: `true`

### bail

إذا كنت تريد أن يتوقف تشغيل الاختبار بعد عدد محدد من فشل الاختبارات، استخدم `bail`.
(يكون الافتراضي `0`، مما يعني تشغيل جميع الاختبارات بغض النظر عن النتيجة.) **ملاحظة:** الاختبار في هذا السياق هو جميع الاختبارات ضمن ملف مواصفات واحد (عند استخدام Mocha أو Jasmine) أو جميع الخطوات ضمن ملف ميزة (عند استخدام Cucumber). إذا كنت تريد التحكم في سلوك الإلغاء ضمن اختبارات ملف اختبار واحد، فألق نظرة على خيارات [الإطار](frameworks) المتاحة.

النوع: `Number`<br />
الافتراضي: `0` (لا إلغاء؛ تشغيل جميع الاختبارات)

### specFileRetries

عدد مرات إعادة محاولة ملف المواصفات بأكمله عندما يفشل ككل.

النوع: `Number`<br />
الافتراضي: `0`

### specFileRetriesDelay

التأخير بالثواني بين محاولات إعادة ملف المواصفات

النوع: `Number`<br />
الافتراضي: `0`

### specFileRetriesDeferred

ما إذا كان يجب إعادة محاولة ملفات المواصفات المعاد محاولتها على الفور أو تأجيلها إلى نهاية قائمة الانتظار.

النوع: `Boolean`<br />
الافتراضي: `true`

### groupLogsByTestSpec

اختر عرض مخرجات السجل.

إذا تم تعيينه على `false`، ستتم طباعة السجلات من ملفات اختبار مختلفة في الوقت الفعلي. يرجى ملاحظة أن هذا قد يؤدي إلى خلط مخرجات السجل من ملفات مختلفة عند التشغيل بالتوازي.

إذا تم تعيينه على `true`، سيتم تجميع مخرجات السجل حسب مواصفات الاختبار وطباعتها فقط عند اكتمال مواصفات الاختبار.

بشكل افتراضي، يتم تعيينه على `false` بحيث يتم طباعة السجلات في الوقت الفعلي.

النوع: `Boolean`<br />
الافتراضي: `false`

### autoAssertOnTestEnd

يتحكم في ما إذا كان WebdriverIO يتحقق تلقائيًا من جميع التأكيدات اللينة في نهاية كل اختبار. عند تعيينه على `true`، سيتم التحقق تلقائيًا من أي تأكيدات لينة متراكمة وستتسبب في فشل الاختبار إذا فشلت أي تأكيدات. عند تعيينه على `false`، يجب عليك استدعاء طريقة assert يدويًا للتحقق من التأكيدات اللينة.

النوع: `Boolean`<br />
الافتراضي: `true`

### services

تتولى الخدمات وظيفة محددة لا تريد أن تعتني بها. فهي تعزز إعداد الاختبار الخاص بك بأقل جهد.

النوع: `String[]|Object[]`<br />
الافتراضي: `[]`

### framework

يحدد إطار الاختبار الذي سيستخدمه مشغل اختبار WDIO.

النوع: `String`<br />
الافتراضي: `mocha`<br />
الخيارات: `mocha` | `jasmine`

### mochaOpts و jasmineOpts و cucumberOpts

خيارات خاصة بالإطار. راجع وثائق محول الإطار لمعرفة الخيارات المتاحة. اقرأ المزيد عن هذا في [الأطر](frameworks).

النوع: `Object`<br />
الافتراضي: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

قائمة ميزات الخيار مع أرقام الأسطر (عند [استخدام إطار cucumber](./Frameworks.md#using-cucumber)).

النوع: `String[]`
الافتراضي: `[]`

### reporters

قائمة المراسلين المراد استخدامها. يمكن أن يكون المراسل إما سلسلة، أو مصفوفة من
`['reporterName', { /* reporter options */}]` حيث العنصر الأول هو سلسلة باسم المراسل والعنصر الثاني هو كائن بخيارات المراسل.

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

يحدد الفاصل الزمني الذي يجب على المراسل التحقق فيه مما إذا كانوا متزامنين إذا كانوا يبلغون عن سجلاتهم بشكل غير متزامن (على سبيل المثال، إذا تم بث السجلات إلى بائع طرف ثالث).

النوع: `Number`<br />
الافتراضي: `100` (ميلي ثانية)

### reporterSyncTimeout

يحدد الحد الأقصى للوقت الذي يتمتع به المراسلون لإنهاء تحميل جميع سجلاتهم حتى يتم رمي خطأ من قبل مشغل الاختبار.

النوع: `Number`<br />
الافتراضي: `5000` (ميلي ثانية)

### execArgv

وسيطات Node لتحديدها عند بدء العمليات الفرعية.

النوع: `String[]`<br />
الافتراضي: `null`

### filesToWatch

قائمة بأنماط السلسلة التي تدعم glob والتي تخبر مشغل الاختبار بمراقبة ملفات أخرى، مثل ملفات التطبيق، عند تشغيله باستخدام علامة `--watch`. بشكل افتراضي، يراقب مشغل الاختبار بالفعل جميع ملفات المواصفات.

النوع: `String[]`<br />
الافتراضي: `[]`

### updateSnapshots

قم بتعيينها على true إذا كنت تريد تحديث لقطاتك. يُستخدم بشكل مثالي كجزء من معلمة CLI، على سبيل المثال `wdio run wdio.conf.js --s`.

النوع: `'new' | 'all' | 'none'`<br />
الافتراضي: `none` إذا لم يتم توفيره وتشغيل الاختبارات في CI، `new` إذا لم يتم توفيره، وإلا ما تم توفيره

### resolveSnapshotPath

يتجاوز مسار اللقطة الافتراضي. على سبيل المثال، لتخزين اللقطات بجانب ملفات الاختبار.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

النوع: `(testPath: string, snapExtension: string) => string`<br />
الافتراضي: يخزن ملفات اللقطات في دليل `__snapshots__` بجانب ملف الاختبار

### tsConfigPath

يستخدم WDIO `tsx` لتجميع ملفات TypeScript. يتم اكتشاف TSConfig الخاص بك تلقائيًا من الدليل العمل الحالي ولكن يمكنك تحديد مسار مخصص هنا أو عن طريق تعيين متغير البيئة TSX_TSCONFIG_PATH.

انظر وثائق `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

النوع: `String`<br />
الافتراضي: `null`<br />

## الخطافات

يسمح لك مشغل اختبار WDIO بتعيين خطافات ليتم تشغيلها في أوقات محددة من دورة حياة الاختبار. هذا يسمح بإجراءات مخصصة (مثل التقاط لقطة شاشة إذا فشل الاختبار).

كل خطاف لديه كمعلمة معلومات محددة عن دورة الحياة (مثل معلومات عن مجموعة الاختبار أو الاختبار). اقرأ المزيد عن جميع خصائص الخطافات في [مثال التكوين لدينا](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**ملاحظة:** يتم تنفيذ بعض الخطافات (`onPrepare`, `onWorkerStart`, `onWorkerEnd` و `onComplete`) في عملية مختلفة وبالتالي لا يمكن مشاركة أي بيانات عالمية مع الخطافات الأخرى التي تعيش في عملية العامل.

### onPrepare

يتم تنفيذها مرة واحدة قبل بدء تشغيل جميع العمال.

المعلمات:

- `config` (`object`): كائن تكوين WebdriverIO
- `param` (`object[]`): قائمة بتفاصيل القدرات

### onWorkerStart

يتم تنفيذها قبل إنشاء عملية عامل ويمكن استخدامها لتهيئة خدمة محددة لذلك العامل وكذلك تعديل بيئات وقت التشغيل بطريقة غير متزامنة.

المعلمات:

- `cid` (`string`): معرف القدرة (مثل 0-0)
- `caps` (`object`): يحتوي على قدرات الجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): المواصفات التي سيتم تشغيلها في عملية العامل
- `args` (`object`): كائن سيتم دمجه مع التكوين الرئيسي بمجرد تهيئة العامل
- `execArgv` (`string[]`): قائمة وسيطات السلسلة الممررة إلى عملية العامل

### onWorkerEnd

يتم تنفيذها بعد خروج عملية العامل مباشرة.

المعلمات:

- `cid` (`string`): معرف القدرة (مثل 0-0)
- `exitCode` (`number`): 0 - نجاح، 1 - فشل
- `specs` (`string[]`): المواصفات التي سيتم تشغيلها في عملية العامل
- `retries` (`number`): عدد إعادة المحاولات على مستوى المواصفات المستخدمة كما هو محدد في [_"إضافة إعادة المحاولات على أساس ملف مواصفات"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

يتم تنفيذها قبل تهيئة جلسة webdriver وإطار الاختبار مباشرة. تسمح لك بالتلاعب بالتكوينات اعتمادًا على القدرة أو المواصفات.

المعلمات:

- `config` (`object`): كائن تكوين WebdriverIO
- `caps` (`object`): يحتوي على قدرات الجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): المواصفات التي سيتم تشغيلها في عملية العامل

### before

يتم تنفيذها قبل بدء تنفيذ الاختبار. في هذه النقطة يمكنك الوصول إلى جميع المتغيرات العالمية مثل `browser`. إنه المكان المثالي لتحديد الأوامر المخصصة.

المعلمات:

- `caps` (`object`): يحتوي على قدرات الجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): المواصفات التي سيتم تشغيلها في عملية العامل
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
- `result` (`object`): نتيجة الخطاف (تحتوي على خصائص `error`، `result`، `duration`، `passed`، `retries`)

### beforeTest

دالة يتم تنفيذها قبل اختبار (في Mocha/Jasmine فقط).

المعلمات:

- `test` (`object`): تفاصيل الاختبار
- `context` (`object`): كائن النطاق الذي تم تنفيذ الاختبار معه

### beforeCommand

تعمل قبل تنفيذ أمر WebdriverIO.

المعلمات:

- `commandName` (`string`): اسم الأمر
- `args` (`*`): الوسيطات التي سيتلقاها الأمر

### afterCommand

تعمل بعد تنفيذ أمر WebdriverIO.

المعلمات:

- `commandName` (`string`): اسم الأمر
- `args` (`*`): الوسيطات التي سيتلقاها الأمر
- `result` (`*`): نتيجة الأمر
- `error` (`Error`): كائن الخطأ إن وجد

### afterTest

دالة يتم تنفيذها بعد انتهاء اختبار (في Mocha/Jasmine).

المعلمات:

- `test` (`object`): تفاصيل الاختبار
- `context` (`object`): كائن النطاق الذي تم تنفيذ الاختبار معه
- `result.error` (`Error`): كائن الخطأ في حالة فشل الاختبار، وإلا `undefined`
- `result.result` (`Any`): كائن إرجاع دالة الاختبار
- `result.duration` (`Number`): مدة الاختبار
- `result.passed` (`Boolean`): true إذا نجح الاختبار، وإلا false
- `result.retries` (`Object`): معلومات حول إعادة المحاولات المتعلقة باختبار واحد كما هو محدد لـ [Mocha و Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) وكذلك [Cucumber](./Retry.md#rerunning-in-cucumber)، على سبيل المثال `{ attempts: 0, limit: 0 }`، انظر
- `result` (`object`): نتيجة الخطاف (تحتوي على خصائص `error`، `result`، `duration`، `passed`، `retries`)

### afterSuite

خطاف يتم تنفيذه بعد انتهاء المجموعة (في Mocha/Jasmine فقط)

المعلمات:

- `suite` (`object`): تفاصيل المجموعة

### after

يتم تنفيذها بعد اكتمال جميع الاختبارات. لا يزال لديك حق الوصول إلى جميع المتغيرات العالمية من الاختبار.

المعلمات:

- `result` (`number`): 0 - نجاح الاختبار، 1 - فشل الاختبار
- `caps` (`object`): يحتوي على قدرات الجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): المواصفات التي سيتم تشغيلها في عملية العامل

### afterSession

يتم تنفيذها بعد إنهاء جلسة webdriver مباشرة.

المعلمات:

- `config` (`object`): كائن تكوين WebdriverIO
- `caps` (`object`): يحتوي على قدرات الجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): المواصفات التي سيتم تشغيلها في عملية العامل

### onComplete

يتم تنفيذها بعد إغلاق جميع العمال وعلى وشك خروج العملية. خطأ مطروح في خطاف onComplete سيؤدي إلى فشل تشغيل الاختبار.

المعلمات:

- `exitCode` (`number`): 0 - نجاح، 1 - فشل
- `config` (`object`): كائن تكوين WebdriverIO
- `caps` (`object`): يحتوي على قدرات الجلسة التي سيتم إنشاؤها في العامل
- `result` (`object`): كائن النتائج الذي يحتوي على نتائج الاختبار

### onReload

يتم تنفيذها عند حدوث تحديث.

المعلمات:

- `oldSessionId` (`string`): معرف الجلسة للجلسة القديمة
- `newSessionId` (`string`): معرف الجلسة للجلسة الجديدة

### beforeFeature

تعمل قبل ميزة Cucumber.

المعلمات:

- `uri` (`string`): المسار إلى ملف الميزة
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): كائن ميزة Cucumber

### afterFeature

تعمل بعد ميزة Cucumber.

المعلمات:

- `uri` (`string`): المسار إلى ملف الميزة
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): كائن ميزة Cucumber

### beforeScenario

تعمل قبل سيناريو Cucumber.

المعلمات:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): كائن العالم الذي يحتوي على معلومات حول pickle وخطوة الاختبار
- `context` (`object`): كائن Cucumber World

### afterScenario

تعمل بعد سيناريو Cucumber.

المعلمات:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): كائن العالم الذي يحتوي على معلومات حول pickle وخطوة الاختبار
- `result` (`object`): كائن النتائج الذي يحتوي على نتائج السيناريو
- `result.passed` (`boolean`): صحيح إذا نجح السيناريو
- `result.error` (`string`): مكدس الخطأ إذا فشل السيناريو
- `result.duration` (`number`): مدة السيناريو بالميلي ثانية
- `context` (`object`): كائن Cucumber World

### beforeStep

تعمل قبل خطوة Cucumber.

المعلمات:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): كائن خطوة Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): كائن سيناريو Cucumber
- `context` (`object`): كائن Cucumber World

### afterStep

تعمل بعد خطوة Cucumber.

المعلمات:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): كائن خطوة Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): كائن سيناريو Cucumber
- `result`: (`object`): كائن النتائج الذي يحتوي على نتائج الخطوة
- `result.passed` (`boolean`): صحيح إذا نجح السيناريو
- `result.error` (`string`): مكدس الخطأ إذا فشل السيناريو
- `result.duration` (`number`): مدة السيناريو بالميلي ثانية
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