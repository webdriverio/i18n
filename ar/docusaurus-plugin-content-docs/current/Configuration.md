---
id: configuration
title: التكوين
---

استنادًا إلى [نوع الإعداد](/docs/setuptypes) (مثل استخدام ارتباطات البروتوكول الخام، أو WebdriverIO كحزمة مستقلة أو مشغل اختبار WDIO)، هناك مجموعة مختلفة من الخيارات المتاحة للتحكم في البيئة.

## خيارات WebDriver

الخيارات التالية يتم تعريفها عند استخدام حزمة بروتوكول [`webdriver`](https://www.npmjs.com/package/webdriver):

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

معلمات الاستعلام التي يتم تمريرها إلى خادم التشغيل.

النوع: `Object`<br />
الافتراضي: `undefined`

### user

اسم المستخدم لخدمة السحابة الخاصة بك (يعمل فقط مع حسابات [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) أو [LambdaTest](https://www.lambdatest.com)). إذا تم تعيينه، سيقوم WebdriverIO تلقائيًا بتعيين خيارات الاتصال لك. إذا كنت لا تستخدم مزود سحابة، يمكن استخدام هذا للمصادقة مع أي خلفية WebDriver أخرى.

النوع: `String`<br />
الافتراضي: `undefined`

### key

مفتاح الوصول أو المفتاح السري لخدمة السحابة الخاصة بك (يعمل فقط مع حسابات [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) أو [LambdaTest](https://www.lambdatest.com)). إذا تم تعيينه، سيقوم WebdriverIO تلقائيًا بتعيين خيارات الاتصال لك. إذا كنت لا تستخدم مزود سحابة، يمكن استخدام هذا للمصادقة مع أي خلفية WebDriver أخرى.

النوع: `String`<br />
الافتراضي: `undefined`

### capabilities

يحدد القدرات التي تريد تشغيلها في جلسة WebDriver الخاصة بك. تحقق من [بروتوكول WebDriver](https://w3c.github.io/webdriver/#capabilities) لمزيد من التفاصيل. إذا كنت تقوم بتشغيل برنامج تشغيل أقدم لا يدعم بروتوكول WebDriver، فستحتاج إلى استخدام [قدرات JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) لتشغيل جلسة بنجاح.

إلى جانب القدرات المستندة إلى WebDriver، يمكنك تطبيق خيارات خاصة بالمتصفح والبائع تسمح بتكوين أعمق للمتصفح البعيد أو الجهاز. هذه موثقة في وثائق البائع المقابلة، على سبيل المثال:

- `goog:chromeOptions`: لـ [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: لـ [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: لـ [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: لـ [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: لـ [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: لـ [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

بالإضافة إلى ذلك، هناك أداة مفيدة وهي [مكوّن الاختبار الآلي من Sauce Labs](https://docs.saucelabs.com/basics/platform-configurator/)، الذي يساعدك على إنشاء هذا الكائن من خلال النقر معًا على القدرات المطلوبة.

النوع: `Object`<br />
الافتراضي: `null`

**مثال:**

```js
{
    browserName: 'chrome', // الخيارات: `chrome`، `edge`، `firefox`، `safari`
    browserVersion: '27.0', // إصدار المتصفح
    platformName: 'Windows 10' // منصة نظام التشغيل
}
```

إذا كنت تقوم بإجراء اختبارات ويب أو اختبارات أصلية على أجهزة محمولة، فإن `capabilities` تختلف عن بروتوكول WebDriver. انظر [وثائق Appium](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/) لمزيد من التفاصيل.

### logLevel

مستوى التفصيل في السجلات.

النوع: `String`<br />
الافتراضي: `info`<br />
الخيارات: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

الدليل لتخزين جميع ملفات سجل مشغل الاختبار (بما في ذلك سجلات المراسل وسجلات `wdio`). إذا لم يتم تعيينه، فسيتم بث جميع السجلات إلى `stdout`. نظرًا لأن معظم المراسلين مصممون للتسجيل في `stdout`، فمن المستحسن استخدام هذا الخيار فقط لمراسلين محددين حيث يكون من المنطقي أكثر دفع التقرير إلى ملف (مثل مراسل `junit`، على سبيل المثال).

عند التشغيل في الوضع المستقل، السجل الوحيد الذي يولده WebdriverIO هو سجل `wdio`.

النوع: `String`<br />
الافتراضي: `null`

### connectionRetryTimeout

المهلة لأي طلب WebDriver إلى برنامج تشغيل أو شبكة.

النوع: `Number`<br />
الافتراضي: `120000`

### connectionRetryCount

الحد الأقصى لعدد إعادة محاولات الطلب إلى خادم Selenium.

النوع: `Number`<br />
الافتراضي: `3`

### agent

يسمح لك باستخدام وكيل مخصص `http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) لإجراء الطلبات.

النوع: `Object`<br />
الافتراضي:

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
// Read the username and password from environment variables
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Combine the username and password with a colon separator
const credentials = `${username}:${password}`;
// Encode the credentials using Base64
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

وظيفة تعترض [خيارات طلب HTTP](https://github.com/sindresorhus/got#options) قبل إجراء طلب WebDriver

النوع: `(RequestOptions) => RequestOptions`<br />
الافتراضي: *لا شيء*

### transformResponse

وظيفة تعترض كائنات استجابة HTTP بعد وصول استجابة WebDriver. يتم تمرير الوظيفة إلى كائن الاستجابة الأصلي كأول معامل و`RequestOptions` المقابل كمعامل ثانٍ.

النوع: `(Response, RequestOptions) => Response`<br />
الافتراضي: *لا شيء*

### strictSSL

ما إذا كان لا يتطلب أن تكون شهادة SSL صالحة.
يمكن تعيينها عبر متغيرات البيئة مثل `STRICT_SSL` أو `strict_ssl`.

النوع: `Boolean`<br />
الافتراضي: `true`

### enableDirectConnect

ما إذا كان يتم تمكين [ميزة اتصال Appium المباشر](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
لا تفعل شيئًا إذا لم تحتوِ الاستجابة على المفاتيح المناسبة بينما يتم تمكين العلامة.

النوع: `Boolean`<br />
الافتراضي: `true`

### cacheDir

المسار إلى جذر دليل ذاكرة التخزين المؤقت. يستخدم هذا الدليل لتخزين جميع برامج التشغيل التي يتم تنزيلها عند محاولة بدء جلسة.

النوع: `String`<br />
الافتراضي: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

للحصول على تسجيل أكثر أمانًا، يمكن للتعبيرات النمطية المعينة باستخدام `maskingPatterns` إخفاء المعلومات الحساسة من السجل.
 - تنسيق السلسلة هو تعبير منتظم مع أو بدون أعلام (مثل `/.../i`) ومفصولة بفواصل لتعبيرات منتظمة متعددة.
 - لمزيد من التفاصيل حول أنماط التقنيع، راجع [قسم أنماط التقنيع في ملف README لـ WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

إذا كنت تريد أتمتة المتصفح باستخدام تقنية أتمتة مختلفة، تأكد من تعيين هذه الخاصية إلى مسار يتم حله إلى وحدة تلتزم بالواجهة التالية:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Start a automation session and return a WebdriverIO [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * with respective automation commands. See the [webdriver](https://www.npmjs.com/package/webdriver) package
     * as a reference implementation
     *
     * @param {Capabilities.RemoteConfig} options WebdriverIO options
     * @param {Function} hook that allows to modify the client before it gets released from the function
     * @param {PropertyDescriptorMap} userPrototype allows user to add custom protocol commands
     * @param {Function} customCommandWrapper allows to modify the command execution
     * @returns a WebdriverIO compatible client instance
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * allows user to attach to existing sessions
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * Changes The instance session id and browser capabilities for the new session
     * directly into the passed in browser object
     *
     * @optional
     * @param   {object} instance  the object we get from a new browser session.
     * @returns {string}           the new session id of the browser
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

تقصير استدعاءات أمر `url` عن طريق تعيين عنوان URL أساسي.
- إذا كانت معلمة `url` الخاصة بك تبدأ بـ `/`، فسيتم إضافة `baseUrl` في البداية (باستثناء مسار `baseUrl`، إذا كان له مسار).
- إذا كانت معلمة `url` الخاصة بك تبدأ بدون مخطط أو `/` (مثل `some/path`)، فسيتم إضافة `baseUrl` الكامل مباشرة في البداية.

النوع: `String`<br />
الافتراضي: `null`

### waitforTimeout

المهلة الافتراضية لجميع أوامر `waitFor*`. (لاحظ الحرف الصغير `f` في اسم الخيار.) تؤثر هذه المهلة __فقط__ على الأوامر التي تبدأ بـ `waitFor*` ووقت الانتظار الافتراضي الخاص بها.

لزيادة المهلة لـ _اختبار_، يرجى الاطلاع على وثائق الإطار.

النوع: `Number`<br />
الافتراضي: `5000`

### waitforInterval

الفاصل الزمني الافتراضي لجميع أوامر `waitFor*` للتحقق مما إذا كانت حالة متوقعة (مثل الرؤية) قد تغيرت.

النوع: `Number`<br />
الافتراضي: `100`

### region

إذا كنت تعمل على Sauce Labs، يمكنك اختيار تشغيل الاختبارات بين مراكز بيانات مختلفة: الولايات المتحدة أو الاتحاد الأوروبي.
لتغيير منطقتك إلى الاتحاد الأوروبي، أضف `region: 'eu'` إلى التكوين الخاص بك.

__ملاحظة:__ هذا له تأثير فقط إذا قمت بتوفير خيارات `user` و `key` المرتبطة بحساب Sauce Labs الخاص بك.

النوع: `String`<br />
الافتراضي: `us`

*(فقط للآلات الافتراضية و/أو المحاكيات/أجهزة المحاكاة)*

---

## خيارات مشغل الاختبار

الخيارات التالية (بما في ذلك تلك المذكورة أعلاه) محددة فقط لتشغيل WebdriverIO باستخدام مشغل اختبار WDIO:

### specs

تحديد ملفات الاختبار للتنفيذ. يمكنك إما تحديد نمط glob لمطابقة ملفات متعددة في وقت واحد أو لف نمط glob أو مجموعة من المسارات في مصفوفة لتشغيلها ضمن عملية عامل واحدة. يتم اعتبار جميع المسارات نسبية من مسار ملف التكوين.

النوع: `(String | String[])[]`<br />
الافتراضي: `[]`

### exclude

استبعاد ملفات من تنفيذ الاختبار. يتم اعتبار جميع المسارات نسبية من مسار ملف التكوين.

النوع: `String[]`<br />
الافتراضي: `[]`

### suites

كائن يصف مجموعات مختلفة، والتي يمكنك بعد ذلك تحديدها باستخدام خيار `--suite` على واجهة سطر الأوامر `wdio`.

النوع: `Object`<br />
الافتراضي: `{}`

### capabilities

نفس قسم `capabilities` الموصوف أعلاه، باستثناء خيار تحديد إما كائن [`multiremote`](/docs/multiremote)، أو جلسات WebDriver متعددة في مصفوفة للتنفيذ المتوازي.

يمكنك تطبيق نفس القدرات الخاصة بالبائع والمتصفح كما هو محدد [أعلاه](/docs/configuration#capabilities).

النوع: `Object`|`Object[]`<br />
الافتراضي: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

الحد الأقصى لعدد العمال المتوازية الإجمالية.

__ملاحظة:__ قد يكون رقمًا يصل إلى `100`، عندما يتم إجراء الاختبارات على بعض البائعين الخارجيين مثل آلات Sauce Labs. هناك، لا يتم اختبار الاختبارات على جهاز واحد، بل على آلات افتراضية متعددة. إذا كان من المقرر تشغيل الاختبارات على جهاز تطوير محلي، فاستخدم رقمًا أكثر معقولية، مثل `3` أو `4` أو `5`. في الأساس، هذا هو عدد المتصفحات التي سيتم بدؤها بالتزامن وتشغيل اختباراتك في نفس الوقت، لذلك يعتمد ذلك على مقدار ذاكرة الوصول العشوائي الموجودة على جهازك، وعدد التطبيقات الأخرى التي تعمل على جهازك.

يمكنك أيضًا تطبيق `maxInstances` ضمن كائنات القدرات الخاصة بك باستخدام قدرة `wdio:maxInstances`. سيحد هذا من عدد الجلسات المتوازية لتلك القدرة المعينة.

النوع: `Number`<br />
الافتراضي: `100`

### maxInstancesPerCapability

الحد الأقصى لعدد العمال المتوازية الإجمالية لكل قدرة.

النوع: `Number`<br />
الافتراضي: `100`

### injectGlobals

يُدخِل متغيرات WebdriverIO العالمية (مثل `browser` و `$` و `$$`) في البيئة العالمية.
إذا قمت بتعيينها إلى `false`، يجب عليك الاستيراد من `@wdio/globals`، على سبيل المثال:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

ملاحظة: لا يتعامل WebdriverIO مع حقن متغيرات عالمية خاصة بإطار الاختبار.

النوع: `Boolean`<br />
الافتراضي: `true`

### bail

إذا كنت تريد أن يتوقف تشغيل الاختبار الخاص بك بعد عدد معين من فشل الاختبارات، استخدم `bail`.
(الافتراضي هو `0`، مما يؤدي إلى تشغيل جميع الاختبارات بغض النظر عن النتيجة.) **ملاحظة:** الاختبار في هذا السياق هو جميع الاختبارات ضمن ملف مواصفات واحد (عند استخدام Mocha أو Jasmine) أو جميع الخطوات ضمن ملف ميزة (عند استخدام Cucumber). إذا كنت ترغب في التحكم في سلوك الإيقاف داخل اختبارات ملف اختبار واحد، فألقِ نظرة على خيارات [إطار العمل](frameworks) المتاحة.

النوع: `Number`<br />
الافتراضي: `0` (لا تتوقف؛ قم بتشغيل جميع الاختبارات)

### specFileRetries

عدد المرات التي يجب فيها إعادة محاولة ملف مواصفات بأكمله عندما يفشل ككل.

النوع: `Number`<br />
الافتراضي: `0`

### specFileRetriesDelay

التأخير بالثواني بين محاولات إعادة ملف المواصفات

النوع: `Number`<br />
الافتراضي: `0`

### specFileRetriesDeferred

ما إذا كان يجب إعادة محاولة ملفات المواصفات التي تمت إعادة المحاولة فورًا أو تأجيلها إلى نهاية قائمة الانتظار.

النوع: `Boolean`<br />
الافتراضي: `true`

### groupLogsByTestSpec

اختر عرض إخراج السجل.

إذا تم تعيينه على `false`، فسيتم طباعة السجلات من ملفات الاختبار المختلفة في الوقت الفعلي. يرجى ملاحظة أن هذا قد يؤدي إلى خلط مخرجات السجل من ملفات مختلفة عند التشغيل بالتوازي.

إذا تم تعيينه على `true`، فسيتم تجميع مخرجات السجل حسب مواصفات الاختبار وطباعتها فقط عند اكتمال مواصفات الاختبار.

بشكل افتراضي، يتم تعيينه على `false` بحيث يتم طباعة السجلات في الوقت الفعلي.

النوع: `Boolean`<br />
الافتراضي: `false`

### services

الخدمات تتولى مهمة محددة لا تريد الاهتمام بها. فهي تعزز إعداد الاختبار الخاص بك بجهد ضئيل تقريبًا.

النوع: `String[]|Object[]`<br />
الافتراضي: `[]`

### framework

يحدد إطار الاختبار الذي سيستخدمه مشغل اختبار WDIO.

النوع: `String`<br />
الافتراضي: `mocha`<br />
الخيارات: `mocha` | `jasmine`

### mochaOpts, jasmineOpts and cucumberOpts

خيارات محددة متعلقة بإطار العمل. راجع وثائق محول إطار العمل حول الخيارات المتاحة. اقرأ المزيد عن هذا في [أطر العمل](frameworks).

النوع: `Object`<br />
الافتراضي: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

قائمة ميزات cucumber مع أرقام الأسطر (عند [استخدام إطار cucumber](./Frameworks.md#using-cucumber)).

النوع: `String[]`
الافتراضي: `[]`

### reporters

قائمة المراسلين للاستخدام. يمكن أن يكون المراسل إما سلسلة، أو مصفوفة من
`['reporterName', { /* reporter options */}]` حيث العنصر الأول هو سلسلة باسم المراسل والعنصر الثاني كائن بخيارات المراسل.

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

يحدد الفاصل الزمني الذي يجب أن يتحقق فيه المراسل مما إذا كانوا متزامنين إذا كانوا يبلغون عن سجلاتهم بشكل غير متزامن (على سبيل المثال، إذا تم بث السجلات إلى بائع طرف ثالث).

النوع: `Number`<br />
الافتراضي: `100` (مللي ثانية)

### reporterSyncTimeout

يحدد الحد الأقصى للوقت الذي يتمتع به المراسلون لإنهاء تحميل جميع سجلاتهم حتى يتم إلقاء خطأ بواسطة مشغل الاختبار.

النوع: `Number`<br />
الافتراضي: `5000` (مللي ثانية)

### execArgv

وسيطات Node لتحديدها عند إطلاق العمليات الفرعية.

النوع: `String[]`<br />
الافتراضي: `null`

### filesToWatch

قائمة من أنماط السلاسل التي تدعم glob والتي تخبر مشغل الاختبار بمراقبة ملفات أخرى إضافيًا، مثل ملفات التطبيق، عند تشغيلها باستخدام علامة `--watch`. بشكل افتراضي، يراقب مشغل الاختبار بالفعل جميع ملفات المواصفات.

النوع: `String[]`<br />
الافتراضي: `[]`

### updateSnapshots

قم بالتعيين على true إذا كنت تريد تحديث لقطاتك. يُستخدم بشكل مثالي كجزء من معلمة واجهة سطر الأوامر، على سبيل المثال `wdio run wdio.conf.js --s`.

النوع: `'new' | 'all' | 'none'`<br />
الافتراضي: `none` إذا لم يتم توفيره وتشغيل الاختبارات في CI، `new` إذا لم يتم توفيره، وإلا ما تم توفيره

### resolveSnapshotPath

تجاوز مسار اللقطة الافتراضي. على سبيل المثال، لتخزين اللقطات بجانب ملفات الاختبار.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

النوع: `(testPath: string, snapExtension: string) => string`<br />
الافتراضي: يخزن ملفات اللقطة في دليل `__snapshots__` بجانب ملف الاختبار

### tsConfigPath

يستخدم WDIO `tsx` لتجميع ملفات TypeScript. يتم اكتشاف ملف TSConfig الخاص بك تلقائيًا من الدليل الحالي ولكن يمكنك تحديد مسار مخصص هنا أو عن طريق تعيين متغير البيئة TSX_TSCONFIG_PATH.

انظر وثائق `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

النوع: `String`<br />
الافتراضي: `null`<br />

## الخطافات

يتيح لك مشغل اختبار WDIO تعيين خطافات ليتم تشغيلها في أوقات محددة من دورة حياة الاختبار. هذا يسمح بإجراءات مخصصة (مثل التقاط لقطة شاشة إذا فشل الاختبار).

كل خطاف له كمعلمة معلومات محددة حول دورة الحياة (مثل معلومات حول مجموعة الاختبار أو الاختبار). اقرأ المزيد حول جميع خصائص الخطاف في [مثال التكوين الخاص بنا](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**ملاحظة:** بعض الخطافات (`onPrepare` و `onWorkerStart` و `onWorkerEnd` و `onComplete`) يتم تنفيذها في عملية مختلفة وبالتالي لا يمكنها مشاركة أي بيانات عالمية مع الخطافات الأخرى التي تعيش في عملية العامل.

### onPrepare

يتم تنفيذه مرة واحدة قبل إطلاق جميع العمال.

المعلمات:

- `config` (`object`): كائن تكوين WebdriverIO
- `param` (`object[]`): قائمة تفاصيل القدرات

### onWorkerStart

يتم تنفيذه قبل إنشاء عملية عامل ويمكن استخدامه لتهيئة خدمة معينة لذلك العامل وكذلك تعديل بيئات التشغيل بطريقة غير متزامنة.

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
- `specs` (`string[]`): المواصفات التي تم تشغيلها في عملية العامل
- `retries` (`number`): عدد إعادة المحاولات على مستوى المواصفات المستخدمة كما هو محدد في [_"إضافة إعادة المحاولات على أساس ملف المواصفات"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

يتم تنفيذه قبل تهيئة جلسة webdriver وإطار الاختبار مباشرة. يسمح لك بالتلاعب بالتكوينات اعتمادًا على القدرة أو المواصفات.

المعلمات:

- `config` (`object`): كائن تكوين WebdriverIO
- `caps` (`object`): يحتوي على قدرات للجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): المواصفات التي سيتم تشغيلها في عملية العامل

### before

يتم تنفيذه قبل بدء تنفيذ الاختبار. في هذه المرحلة، يمكنك الوصول إلى جميع المتغيرات العالمية مثل `browser`. إنه المكان المثالي لتعريف الأوامر المخصصة.

المعلمات:

- `caps` (`object`): يحتوي على قدرات للجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): المواصفات التي سيتم تشغيلها في عملية العامل
- `browser` (`object`): مثيل جلسة المتصفح/الجهاز التي تم إنشاؤها

### beforeSuite

خطاف يتم تنفيذه قبل بدء المجموعة (في Mocha/Jasmine فقط)

المعلمات:

- `suite` (`object`): تفاصيل المجموعة

### beforeHook

خطاف يتم تنفيذه *قبل* بدء خطاف داخل المجموعة (على سبيل المثال، يعمل قبل استدعاء beforeEach في Mocha)

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

وظيفة يتم تنفيذها قبل اختبار (في Mocha/Jasmine فقط).

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
- `args` (`*`): الوسيطات التي تلقاها الأمر
- `result` (`number`): 0 - نجاح الأمر، 1 - خطأ في الأمر
- `error` (`Error`): كائن الخطأ إن وجد

### afterTest

وظيفة يتم تنفيذها بعد انتهاء اختبار (في Mocha/Jasmine).

المعلمات:

- `test` (`object`): تفاصيل الاختبار
- `context` (`object`): كائن النطاق الذي تم تنفيذ الاختبار معه
- `result.error` (`Error`): كائن الخطأ في حالة فشل الاختبار، وإلا `undefined`
- `result.result` (`Any`): كائن إرجاع وظيفة الاختبار
- `result.duration` (`Number`): مدة الاختبار
- `result.passed` (`Boolean`): صحيح إذا نجح الاختبار، وإلا خطأ
- `result.retries` (`Object`): معلومات حول إعادة المحاولات المتعلقة باختبار واحد كما هو محدد لـ [Mocha و Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) وكذلك [Cucumber](./Retry.md#rerunning-in-cucumber)، مثل `{ attempts: 0, limit: 0 }`، انظر
- `result` (`object`): نتيجة الخطاف (تحتوي على خصائص `error` و `result` و `duration` و `passed` و `retries`)

### afterSuite

خطاف يتم تنفيذه بعد انتهاء المجموعة (في Mocha/Jasmine فقط)

المعلمات:

- `suite` (`object`): تفاصيل المجموعة

### after

يتم تنفيذه بعد الانتهاء من جميع الاختبارات. لا يزال لديك حق الوصول إلى جميع المتغيرات العالمية من الاختبار.

المعلمات:

- `result` (`number`): 0 - نجاح الاختبار، 1 - فشل الاختبار
- `caps` (`object`): يحتوي على قدرات للجلسة التي تم إنشاؤها في العامل
- `specs` (`string[]`): المواصفات التي تم تشغيلها في عملية العامل

### afterSession

يتم تنفيذه بعد إنهاء جلسة webdriver مباشرة.

المعلمات:

- `config` (`object`): كائن تكوين WebdriverIO
- `caps` (`object`): يحتوي على قدرات للجلسة التي تم إنشاؤها في العامل
- `specs` (`string[]`): المواصفات التي تم تشغيلها في عملية العامل

### onComplete

يتم تنفيذه بعد إيقاف تشغيل جميع العمال وعلى وشك إنهاء العملية. سيؤدي خطأ تم إلقاؤه في خطاف onComplete إلى فشل تشغيل الاختبار.

المعلمات:

- `exitCode` (`number`): 0 - نجاح، 1 - فشل
- `config` (`object`): كائن تكوين WebdriverIO
- `caps` (`object`): يحتوي على قدرات للجلسة التي تم إنشاؤها في العامل
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

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): كائن عالمي يحتوي على معلومات حول المخلل وخطوة الاختبار
- `context` (`object`): كائن Cucumber World

### afterScenario

يعمل بعد سيناريو Cucumber.

المعلمات:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): كائن عالمي يحتوي على معلومات حول المخلل وخطوة الاختبار
- `result` (`object`): كائن النتائج الذي يحتوي على نتائج السيناريو
- `result.passed` (`boolean`): صحيح إذا نجح السيناريو
- `result.error` (`string`): مكدس الخطأ إذا فشل السيناريو
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
- `result.error` (`string`): مكدس الخطأ إذا فشل السيناريو
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