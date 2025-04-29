---
id: configuration
title: الإعدادات
---

بناءً على [نوع الإعداد](/docs/setuptypes) (مثلاً استخدام ارتباطات البروتوكول المباشرة، أو حزمة WebdriverIO المستقلة أو منصة اختبار WDIO) هناك مجموعة مختلفة من الخيارات المتاحة للتحكم في البيئة.

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

المنفذ الذي يعمل عليه خادم السائق.

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

اسم المستخدم لخدمة السحابة الخاصة بك (يعمل فقط مع حسابات [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) أو [LambdaTest](https://www.lambdatest.com)). إذا تم تعيينه، سيقوم WebdriverIO تلقائيًا بتعيين خيارات الاتصال لك. إذا كنت لا تستخدم مزودًا سحابيًا، يمكن استخدام هذا لمصادقة أي خادم WebDriver آخر.

النوع: `String`<br />
القيمة الافتراضية: `undefined`

### key

مفتاح الوصول أو المفتاح السري لخدمة السحابة الخاصة بك (يعمل فقط مع حسابات [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) أو [LambdaTest](https://www.lambdatest.com)). إذا تم تعيينه، سيقوم WebdriverIO تلقائيًا بتعيين خيارات الاتصال لك. إذا كنت لا تستخدم مزودًا سحابيًا، يمكن استخدام هذا لمصادقة أي خادم WebDriver آخر.

النوع: `String`<br />
القيمة الافتراضية: `undefined`

### capabilities

يحدد القدرات التي تريد تشغيلها في جلسة WebDriver الخاصة بك. راجع [بروتوكول WebDriver](https://w3c.github.io/webdriver/#capabilities) لمزيد من التفاصيل. إذا كنت تستخدم سائقًا قديمًا لا يدعم بروتوكول WebDriver، فستحتاج إلى استخدام [قدرات JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) لتشغيل جلسة بنجاح.

بالإضافة إلى القدرات المستندة إلى WebDriver، يمكنك تطبيق خيارات خاصة بالمتصفح والبائع تسمح بتكوين أعمق للمتصفح أو الجهاز البعيد. هذه موثقة في وثائق الموردين المقابلة، على سبيل المثال:

- `goog:chromeOptions`: لـ [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: لـ [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: لـ [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: لـ [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: لـ [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: لـ [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

بالإضافة إلى ذلك، هناك أداة مفيدة هي [مكون تكوين الاختبار الآلي](https://docs.saucelabs.com/basics/platform-configurator/) من Sauce Labs، والتي تساعدك على إنشاء هذا الكائن من خلال النقر على القدرات المطلوبة.

النوع: `Object`<br />
القيمة الافتراضية: `null`

**مثال:**

```js
{
    browserName: 'chrome', // الخيارات: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // إصدار المتصفح
    platformName: 'Windows 10' // منصة نظام التشغيل
}
```

إذا كنت تقوم بإجراء اختبارات ويب أو اختبارات أصلية على أجهزة محمولة، فإن `capabilities` تختلف عن بروتوكول WebDriver. راجع [وثائق Appium](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/) لمزيد من التفاصيل.

### logLevel

مستوى تفصيل السجلات.

النوع: `String`<br />
القيمة الافتراضية: `info`<br />
الخيارات: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

الدليل لتخزين جميع ملفات سجل منصة الاختبار (بما في ذلك سجلات المراسل وسجلات `wdio`). إذا لم يتم تعيينه، يتم بث جميع السجلات إلى `stdout`. نظرًا لأن معظم المراسلين مصممون للسجل في `stdout`، يوصى باستخدام هذا الخيار فقط لمراسلين محددين حيث يكون من المنطقي أكثر دفع التقرير إلى ملف (مثل مراسل `junit`).

عند التشغيل في الوضع المستقل، السجل الوحيد الذي يتم إنشاؤه بواسطة WebdriverIO سيكون سجل `wdio`.

النوع: `String`<br />
القيمة الافتراضية: `null`

### connectionRetryTimeout

المهلة الزمنية لأي طلب WebDriver إلى سائق أو شبكة.

النوع: `Number`<br />
القيمة الافتراضية: `120000`

### connectionRetryCount

الحد الأقصى لعدد إعادة محاولات الطلب إلى خادم Selenium.

النوع: `Number`<br />
القيمة الافتراضية: `3`

### agent

يسمح لك باستخدام وكيل `http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) مخصص لإجراء الطلبات.

النوع: `Object`<br />
القيمة الافتراضية:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

حدد `headers` مخصصة لتمريرها في كل طلب WebDriver. إذا كانت شبكة Selenium الخاصة بك تتطلب المصادقة الأساسية، نوصي بتمرير رأس `Authorization` من خلال هذا الخيار لمصادقة طلبات WebDriver الخاصة بك، على سبيل المثال:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// قراءة اسم المستخدم وكلمة المرور من متغيرات البيئة
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// دمج اسم المستخدم وكلمة المرور بفاصل نقطتي
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

دالة تعترض كائنات استجابة HTTP بعد وصول استجابة WebDriver. يتم تمرير الدالة كائن الاستجابة الأصلي كمعلمة أولى و`RequestOptions` المقابلة كمعلمة ثانية.

النوع: `(Response, RequestOptions) => Response`<br />
القيمة الافتراضية: *لا شيء*

### strictSSL

ما إذا كان لا يتطلب أن تكون شهادة SSL صالحة.
يمكن تعيينها عبر متغيرات بيئية مثل `STRICT_SSL` أو `strict_ssl`.

النوع: `Boolean`<br />
القيمة الافتراضية: `true`

### enableDirectConnect

ما إذا كان تمكين [ميزة الاتصال المباشر Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
لا يفعل شيئًا إذا لم تحتوي الاستجابة على المفاتيح المناسبة أثناء تمكين العلامة.

النوع: `Boolean`<br />
القيمة الافتراضية: `true`

### cacheDir

المسار إلى جذر دليل التخزين المؤقت. يستخدم هذا الدليل لتخزين جميع برامج التشغيل التي يتم تنزيلها عند محاولة بدء جلسة.

النوع: `String`<br />
القيمة الافتراضية: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

---

## WebdriverIO

يمكن استخدام الخيارات التالية (بما في ذلك تلك المذكورة أعلاه) مع WebdriverIO في الوضع المستقل:

### automationProtocol

حدد البروتوكول الذي تريد استخدامه لأتمتة المتصفح. حاليًا يتم دعم [`webdriver`](https://www.npmjs.com/package/webdriver) فقط، حيث أنه تقنية أتمتة المتصفح الرئيسية التي يستخدمها WebdriverIO.

إذا كنت تريد أتمتة المتصفح باستخدام تقنية أتمتة مختلفة، تأكد من تعيين هذه الخاصية إلى مسار يحل إلى وحدة تلتزم بالواجهة التالية:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * بدء جلسة أتمتة وإرجاع [أحادي](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts) WebdriverIO
     * مع أوامر الأتمتة المعنية. انظر حزمة [webdriver](https://www.npmjs.com/package/webdriver)
     * كتنفيذ مرجعي
     *
     * @param {Capabilities.RemoteConfig} options خيارات WebdriverIO
     * @param {Function} hook يسمح بتعديل العميل قبل إطلاقه من الدالة
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
     * يسمح للمستخدم بالاتصال بالجلسات الموجودة
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * يغير معرف جلسة النسخة وإمكانيات المتصفح للجلسة الجديدة
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
- إذا بدأت معلمة `url` بـ `/`، فسيتم إضافة `baseUrl` في البداية (باستثناء مسار `baseUrl`، إن وجد).
- إذا بدأت معلمة `url` بدون مخطط أو `/` (مثل `some/path`)، فسيتم إضافة `baseUrl` الكامل في البداية مباشرة.

النوع: `String`<br />
القيمة الافتراضية: `null`

### waitforTimeout

المهلة الافتراضية لجميع أوامر `waitFor*`. (لاحظ الحرف الصغير `f` في اسم الخيار.) تؤثر هذه المهلة __فقط__ على الأوامر التي تبدأ بـ `waitFor*` ووقت الانتظار الافتراضي الخاص بها.

لزيادة المهلة لـ _اختبار_، يرجى الاطلاع على وثائق الإطار.

النوع: `Number`<br />
القيمة الافتراضية: `5000`

### waitforInterval

الفاصل الزمني الافتراضي لجميع أوامر `waitFor*` للتحقق مما إذا كانت الحالة المتوقعة (مثل الرؤية) قد تغيرت.

النوع: `Number`<br />
القيمة الافتراضية: `100`

### region

إذا كنت تعمل على Sauce Labs، يمكنك اختيار تشغيل الاختبارات بين مراكز بيانات مختلفة: الولايات المتحدة أو الاتحاد الأوروبي.
لتغيير منطقتك إلى الاتحاد الأوروبي، أضف `region: 'eu'` إلى التكوين الخاص بك.

__ملاحظة:__ هذا يؤثر فقط إذا قدمت خيارات `user` و `key` المرتبطة بحساب Sauce Labs الخاص بك.

النوع: `String`<br />
القيمة الافتراضية: `us`

*(فقط للأجهزة الافتراضية و/أو المحاكيات)*

---

## خيارات منصة الاختبار

الخيارات التالية (بما في ذلك تلك المذكورة أعلاه) محددة فقط لتشغيل WebdriverIO مع منصة اختبار WDIO:

### specs

تحديد المواصفات لتنفيذ الاختبار. يمكنك إما تحديد نمط عام لمطابقة ملفات متعددة في وقت واحد أو تغليف نمط عام أو مجموعة من المسارات في مصفوفة لتشغيلها ضمن عملية عامل واحدة. يتم اعتبار جميع المسارات نسبية من مسار ملف التكوين.

النوع: `(String | String[])[]`<br />
القيمة الافتراضية: `[]`

### exclude

استبعاد المواصفات من تنفيذ الاختبار. يتم اعتبار جميع المسارات نسبية من مسار ملف التكوين.

النوع: `String[]`<br />
القيمة الافتراضية: `[]`

### suites

كائن يصف مجموعات مختلفة، والتي يمكنك بعد ذلك تحديدها باستخدام خيار `--suite` على واجهة سطر الأوامر `wdio`.

النوع: `Object`<br />
القيمة الافتراضية: `{}`

### capabilities

نفس قسم `capabilities` الموصوف أعلاه، باستثناء إمكانية تحديد إما كائن [`multiremote`](/docs/multiremote)، أو جلسات WebDriver متعددة في مصفوفة للتنفيذ المتوازي.

يمكنك تطبيق نفس القدرات الخاصة بالبائع والمتصفح كما هو محدد [أعلاه](/docs/configuration#capabilities).

النوع: `Object`|`Object[]`<br />
القيمة الافتراضية: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

الحد الأقصى لعدد العمال المتوازية التي تعمل بشكل إجمالي.

__ملاحظة:__ قد يكون هذا رقمًا يصل إلى `100` عندما يتم إجراء الاختبارات على بعض البائعين الخارجيين مثل آلات Sauce Labs. هناك، لا يتم اختبار الاختبارات على جهاز واحد، بل على العديد من الآلات الافتراضية. إذا كانت الاختبارات ستتم على جهاز تطوير محلي، فاستخدم رقمًا أكثر منطقية، مثل `3` أو `4` أو `5`. في الأساس، هذا هو عدد المتصفحات التي سيتم بدؤها بشكل متزامن وتشغيل اختباراتك في نفس الوقت، لذا فهو يعتمد على مقدار ذاكرة الوصول العشوائي (RAM) الموجودة على جهازك، وكم عدد التطبيقات الأخرى التي تعمل على جهازك.

يمكنك أيضًا تطبيق `maxInstances` داخل كائنات القدرة الخاصة بك باستخدام قدرة `wdio:maxInstances`. هذا سيحد من عدد الجلسات المتوازية لتلك القدرة المحددة.

النوع: `Number`<br />
القيمة الافتراضية: `100`

### maxInstancesPerCapability

الحد الأقصى لعدد العمال المتوازية التي تعمل لكل قدرة.

النوع: `Number`<br />
القيمة الافتراضية: `100`

### injectGlobals

يدخل متغيرات WebdriverIO العالمية (مثل `browser` و `$` و `$$`) في البيئة العالمية.
إذا قمت بتعيينها إلى `false`، يجب عليك الاستيراد من `@wdio/globals`، على سبيل المثال:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

ملاحظة: لا يتعامل WebdriverIO مع حقن المتغيرات العالمية الخاصة بإطار الاختبار.

النوع: `Boolean`<br />
القيمة الافتراضية: `true`

### bail

إذا كنت تريد إيقاف تشغيل الاختبار بعد عدد محدد من فشل الاختبارات، استخدم `bail`.
(القيمة الافتراضية هي `0`، والتي تشغل جميع الاختبارات بغض النظر عن النتيجة.) **ملاحظة:** الاختبار في هذا السياق هو جميع الاختبارات داخل ملف مواصفات واحد (عند استخدام Mocha أو Jasmine) أو جميع الخطوات داخل ملف ميزة (عند استخدام Cucumber). إذا كنت تريد التحكم في سلوك الإنهاء داخل اختبارات ملف اختبار واحد، فألق نظرة على خيارات [الإطار](frameworks) المتاحة.

النوع: `Number`<br />
القيمة الافتراضية: `0` (لا تتوقف؛ قم بتشغيل جميع الاختبارات)

### specFileRetries

عدد المرات لإعادة محاولة ملف المواصفات بالكامل عندما يفشل ككل.

النوع: `Number`<br />
القيمة الافتراضية: `0`

### specFileRetriesDelay

التأخير بالثواني بين محاولات إعادة ملف المواصفات

النوع: `Number`<br />
القيمة الافتراضية: `0`

### specFileRetriesDeferred

ما إذا كان يجب إعادة محاولة ملفات المواصفات المعاد تجربتها على الفور أو تأجيلها إلى نهاية قائمة الانتظار.

النوع: `Boolean`<br />
القيمة الافتراضية: `true`

### groupLogsByTestSpec

اختر عرض إخراج السجل.

إذا تم تعيينه على `false`، سيتم طباعة السجلات من ملفات الاختبار المختلفة في الوقت الفعلي. يرجى ملاحظة أن هذا قد يؤدي إلى خلط مخرجات السجل من ملفات مختلفة عند التشغيل بالتوازي.

إذا تم تعيينه على `true`، سيتم تجميع مخرجات السجل حسب المواصفات وطباعتها فقط عند اكتمال المواصفات.

بشكل افتراضي، يتم تعيينه على `false` بحيث يتم طباعة السجلات في الوقت الفعلي.

النوع: `Boolean`<br />
القيمة الافتراضية: `false`

### services

الخدمات تتولى مهمة محددة لا تريد الاهتمام بها. إنها تعزز إعداد الاختبار الخاص بك بجهد ضئيل تقريبًا.

النوع: `String[]|Object[]`<br />
القيمة الافتراضية: `[]`

### framework

يحدد إطار الاختبار الذي سيتم استخدامه بواسطة منصة اختبار WDIO.

النوع: `String`<br />
القيمة الافتراضية: `mocha`<br />
الخيارات: `mocha` | `jasmine`

### mochaOpts، jasmineOpts، وcucumberOpts

خيارات متعلقة بإطار عمل محدد. انظر وثائق محول الإطار حول الخيارات المتاحة. اقرأ المزيد حول هذا في [الأطر](frameworks).

النوع: `Object`<br />
القيمة الافتراضية: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

قائمة ميزات cucumber مع أرقام السطور (عند [استخدام إطار عمل cucumber](./Frameworks.md#using-cucumber)).

النوع: `String[]`
القيمة الافتراضية: `[]`

### reporters

قائمة المراسلين للاستخدام. يمكن أن يكون المراسل إما سلسلة أو مصفوفة من
`['reporterName', { /* reporter options */}]` حيث العنصر الأول هو سلسلة باسم المراسل والعنصر الثاني كائن مع خيارات المراسل.

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

يحدد الفاصل الزمني الذي يجب على المراسل التحقق فيه مما إذا كانوا متزامنين إذا كانوا يبلغون عن سجلاتهم بشكل غير متزامن (على سبيل المثال، إذا تم بث السجلات إلى بائع طرف ثالث).

النوع: `Number`<br />
القيمة الافتراضية: `100` (مللي ثانية)

### reporterSyncTimeout

يحدد الحد الأقصى للوقت الذي يستغرقه المراسلون لإنهاء تحميل جميع سجلاتهم حتى يتم إلقاء خطأ بواسطة منصة الاختبار.

النوع: `Number`<br />
القيمة الافتراضية: `5000` (مللي ثانية)

### execArgv

وسيطات Node لتحديدها عند إطلاق العمليات الفرعية.

النوع: `String[]`<br />
القيمة الافتراضية: `null`

### filesToWatch

قائمة أنماط سلسلة تدعم العلامات العامة التي تخبر منصة الاختبار بمراقبة ملفات أخرى إضافية، مثل ملفات التطبيق، عند تشغيلها مع العلامة `--watch`. بشكل افتراضي، تراقب منصة الاختبار بالفعل جميع ملفات المواصفات.

النوع: `String[]`<br />
القيمة الافتراضية: `[]`

### updateSnapshots

قم بتعيينه على "true" إذا كنت تريد تحديث اللقطات الخاصة بك. يستخدم بشكل مثالي كجزء من معلمة CLI، على سبيل المثال، `wdio run wdio.conf.js --s`.

النوع: `'new' | 'all' | 'none'`<br />
القيمة الافتراضية: `none` إذا لم يتم توفيره وتم تشغيل الاختبارات في CI، و`new` إذا لم يتم توفيره، وإلا ما تم توفيره

### resolveSnapshotPath

يتجاوز مسار اللقطة الافتراضي. على سبيل المثال، لتخزين اللقطات بجوار ملفات الاختبار.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

النوع: `(testPath: string, snapExtension: string) => string`<br />
القيمة الافتراضية: يخزن ملفات اللقطات في دليل `__snapshots__` بجوار ملف الاختبار

### tsConfigPath

يستخدم WDIO `tsx` لتجميع ملفات TypeScript. يتم اكتشاف TSConfig الخاص بك تلقائيًا من الدليل الحالي ولكن يمكنك تحديد مسار مخصص هنا أو عن طريق تعيين متغير البيئة TSX_TSCONFIG_PATH.

انظر وثائق `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

النوع: `String`<br />
القيمة الافتراضية: `null`<br />

## الخطافات (Hooks)

تسمح منصة اختبار WDIO بتعيين خطافات ليتم تشغيلها في أوقات محددة من دورة حياة الاختبار. يتيح ذلك إجراءات مخصصة (مثل التقاط لقطة شاشة إذا فشل الاختبار).

كل خطاف لديه كمعلمة معلومات محددة حول دورة الحياة (مثل معلومات حول مجموعة الاختبار أو الاختبار). اقرأ المزيد حول جميع خصائص الخطاف في [ملف التكوين المثالي](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**ملاحظة:** يتم تنفيذ بعض الخطافات (`onPrepare` و `onWorkerStart` و `onWorkerEnd` و `onComplete`) في عملية مختلفة وبالتالي لا يمكنها مشاركة أي بيانات عالمية مع الخطافات الأخرى الموجودة في عملية العامل.

### onPrepare

يتم تنفيذه مرة واحدة قبل إطلاق جميع العمال.

المعلمات:

- `config` (`object`): كائن تكوين WebdriverIO
- `param` (`object[]`): قائمة تفاصيل القدرات

### onWorkerStart

يتم تنفيذه قبل إنشاء عملية عامل ويمكن استخدامه لتهيئة خدمة محددة لذلك العامل وكذلك لتعديل بيئات التشغيل بطريقة غير متزامنة.

المعلمات:

- `cid` (`string`): معرف القدرة (مثل 0-0)
- `caps` (`object`): يحتوي على قدرات الجلسة التي سيتم إنشاؤها في عملية العامل
- `specs` (`string[]`): المواصفات التي سيتم تشغيلها في عملية العامل
- `args` (`object`): كائن سيتم دمجه مع التكوين الرئيسي بمجرد تهيئة العامل
- `execArgv` (`string[]`): قائمة وسيطات السلسلة الممررة إلى عملية العامل

### onWorkerEnd

يتم تنفيذه بعد خروج عملية عامل مباشرةً.

المعلمات:

- `cid` (`string`): معرف القدرة (مثل 0-0)
- `exitCode` (`number`): 0 - نجاح، 1 - فشل
- `specs` (`string[]`): المواصفات التي سيتم تشغيلها في عملية العامل
- `retries` (`number`): عدد إعادة محاولات مستوى المواصفات المستخدمة كما هو محدد في [_"إضافة إعادة المحاولات على أساس ملف المواصفات"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

يتم تنفيذه قبل تهيئة جلسة WebDriver وإطار الاختبار مباشرةً. يسمح لك بالتلاعب بالتكوينات اعتمادًا على القدرة أو المواصفات.

المعلمات:

- `config` (`object`): كائن تكوين WebdriverIO
- `caps` (`object`): يحتوي على قدرات الجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): المواصفات التي سيتم تشغيلها في عملية العامل

### before

يتم تنفيذه قبل بدء تنفيذ الاختبار. في هذه النقطة يمكنك الوصول إلى جميع المتغيرات العالمية مثل `browser`. إنه المكان المثالي لتحديد الأوامر المخصصة.

المعلمات:

- `caps` (`object`): يحتوي على قدرات الجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): المواصفات التي سيتم تشغيلها في عملية العامل
- `browser` (`object`): نسخة من جلسة المتصفح/الجهاز التي تم إنشاؤها

### beforeSuite

خطاف يتم تنفيذه قبل بدء المجموعة (في Mocha/Jasmine فقط)

المعلمات:

- `suite` (`object`): تفاصيل المجموعة

### beforeHook

خطاف يتم تنفيذه *قبل* خطاف داخل المجموعة يبدأ (على سبيل المثال يعمل قبل استدعاء beforeEach في Mocha)

المعلمات:

- `test` (`object`): تفاصيل الاختبار
- `context` (`object`): سياق الاختبار (يمثل كائن World في Cucumber)

### afterHook

خطاف يتم تنفيذه *بعد* انتهاء خطاف داخل المجموعة (على سبيل المثال يعمل بعد استدعاء afterEach في Mocha)

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
- `result.retries` (`Object`): معلومات حول إعادة محاولات الاختبار المفردة كما هو محدد لـ [Mocha و Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) وكذلك [Cucumber](./Retry.md#rerunning-in-cucumber)، مثل `{ attempts: 0, limit: 0 }`، انظر
- `result` (`object`): نتيجة الخطاف (تحتوي على خصائص `error`، `result`، `duration`، `passed`، `retries`)

### afterSuite

خطاف يتم تنفيذه بعد انتهاء المجموعة (في Mocha/Jasmine فقط)

المعلمات:

- `suite` (`object`): تفاصيل المجموعة

### after

يتم تنفيذه بعد الانتهاء من جميع الاختبارات. لا يزال لديك إمكانية الوصول إلى جميع المتغيرات العالمية من الاختبار.

المعلمات:

- `result` (`number`): 0 - نجاح الاختبار، 1 - فشل الاختبار
- `caps` (`object`): يحتوي على قدرات الجلسة التي تم إنشاؤها في العامل
- `specs` (`string[]`): المواصفات التي تم تشغيلها في عملية العامل

### afterSession

يتم تنفيذه بعد إنهاء جلسة WebDriver مباشرةً.

المعلمات:

- `config` (`object`): كائن تكوين WebdriverIO
- `caps` (`object`): يحتوي على قدرات الجلسة التي تم إنشاؤها في العامل
- `specs` (`string[]`): المواصفات التي تم تشغيلها في عملية العامل

### onComplete

يتم تنفيذه بعد إيقاف تشغيل جميع العمال وعلى وشك الخروج من العملية. سيؤدي الخطأ المطروح في خطاف onComplete إلى فشل تشغيل الاختبار.

المعلمات:

- `exitCode` (`number`): 0 - نجاح، 1 - فشل
- `config` (`object`): كائن تكوين WebdriverIO
- `caps` (`object`): يحتوي على قدرات الجلسة التي تم إنشاؤها في العامل
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

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): كائن عالم يحتوي على معلومات حول pickle وخطوة الاختبار
- `context` (`object`): كائن عالم Cucumber

### afterScenario

يعمل بعد سيناريو Cucumber.

المعلمات:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): كائن عالم يحتوي على معلومات حول pickle وخطوة الاختبار
- `result` (`object`): كائن النتائج الذي يحتوي على نتائج السيناريو
- `result.passed` (`boolean`): صحيح إذا نجح السيناريو
- `result.error` (`string`): مكدس الخطأ إذا فشل السيناريو
- `result.duration` (`number`): مدة السيناريو بالمللي ثانية
- `context` (`object`): كائن عالم Cucumber

### beforeStep

يعمل قبل خطوة Cucumber.

المعلمات:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): كائن خطوة Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): كائن سيناريو Cucumber
- `context` (`object`): كائن عالم Cucumber

### afterStep

يعمل بعد خطوة Cucumber.

المعلمات:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): كائن خطوة Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): كائن سيناريو Cucumber
- `result`: (`object`): كائن النتائج الذي يحتوي على نتائج الخطوة
- `result.passed` (`boolean`): صحيح إذا نجح السيناريو
- `result.error` (`string`): مكدس الخطأ إذا فشل السيناريو
- `result.duration` (`number`): مدة السيناريو بالمللي ثانية
- `context` (`object`): كائن عالم Cucumber

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