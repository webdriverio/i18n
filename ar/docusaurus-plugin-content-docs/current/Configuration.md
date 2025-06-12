---
id: configuration
title: التكوين
---

بناءً على [نوع الإعداد](/docs/setuptypes) (مثل استخدام ارتباطات البروتوكول الخام، أو WebdriverIO كحزمة مستقلة أو منفذ اختبارات WDIO)، هناك مجموعة مختلفة من الخيارات المتاحة للتحكم في البيئة.

## خيارات WebDriver

الخيارات التالية يتم تعريفها عند استخدام حزمة بروتوكول [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

البروتوكول المستخدم عند التواصل مع خادم السائق.

النوع: `String`<br />
الافتراضي: `http`

### hostname

مضيف خادم السائق الخاص بك.

النوع: `String`<br />
الافتراضي: `0.0.0.0`

### port

المنفذ الذي يعمل عليه خادم السائق الخاص بك.

النوع: `Number`<br />
الافتراضي: `undefined`

### path

المسار إلى نقطة نهاية خادم السائق.

النوع: `String`<br />
الافتراضي: `/`

### queryParams

معلمات الاستعلام التي يتم نشرها إلى خادم السائق.

النوع: `Object`<br />
الافتراضي: `undefined`

### user

اسم المستخدم لخدمة السحابة الخاصة بك (يعمل فقط مع حسابات [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) أو [LambdaTest](https://www.lambdatest.com)). إذا تم تعيينه، فسيقوم WebdriverIO تلقائيًا بتعيين خيارات الاتصال لك. إذا كنت لا تستخدم مزود سحابة، يمكن استخدام هذا للمصادقة على أي خلفية WebDriver أخرى.

النوع: `String`<br />
الافتراضي: `undefined`

### key

مفتاح الوصول أو المفتاح السري لخدمة السحابة الخاصة بك (يعمل فقط مع حسابات [Sauce Labs](https://saucelabs.com)، [Browserstack](https://www.browserstack.com)، [TestingBot](https://testingbot.com) أو [LambdaTest](https://www.lambdatest.com)). إذا تم تعيينه، فسيقوم WebdriverIO تلقائيًا بتعيين خيارات الاتصال لك. إذا كنت لا تستخدم مزود سحابة، يمكن استخدام هذا للمصادقة على أي خلفية WebDriver أخرى.

النوع: `String`<br />
الافتراضي: `undefined`

### capabilities

يحدد القدرات التي تريد تشغيلها في جلسة WebDriver الخاصة بك. راجع [بروتوكول WebDriver](https://w3c.github.io/webdriver/#capabilities) لمزيد من التفاصيل. إذا كنت تقوم بتشغيل سائق قديم لا يدعم بروتوكول WebDriver، فستحتاج إلى استخدام [قدرات JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) لتشغيل جلسة بنجاح.

بالإضافة إلى القدرات المستندة إلى WebDriver، يمكنك تطبيق خيارات محددة للمتصفح والبائع تسمح بتكوين أعمق للمتصفح أو الجهاز البعيد. هذه موثقة في وثائق البائع المقابلة، على سبيل المثال:

- `goog:chromeOptions`: لـ [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: لـ [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: لـ [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: لـ [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: لـ [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: لـ [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

بالإضافة إلى ذلك، هناك أداة مساعدة مفيدة وهي [مكون اختبارات Sauce Labs الآلي](https://docs.saucelabs.com/basics/platform-configurator/)، والذي يساعدك على إنشاء هذا الكائن من خلال النقر معًا على القدرات المطلوبة.

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

إذا كنت تقوم بإجراء اختبارات ويب أو أصلية على الأجهزة المحمولة، فإن `capabilities` تختلف عن بروتوكول WebDriver. راجع [وثائق Appium](https://appium.io/docs/en/latest/guides/caps/) لمزيد من التفاصيل.

### logLevel

مستوى تفصيل السجلات.

النوع: `String`<br />
الافتراضي: `info`<br />
الخيارات: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

الدليل لتخزين جميع ملفات سجل منفذ الاختبار (بما في ذلك سجلات المُبلغ وسجلات `wdio`). إذا لم يتم تعيينه، فسيتم بث جميع السجلات إلى `stdout`. نظرًا لأن معظم المُبلغين مصممون للتسجيل في `stdout`، يوصى باستخدام هذا الخيار فقط لمُبلغين محددين حيث يكون من المنطقي أكثر دفع التقرير إلى ملف (مثل مُبلغ `junit`، على سبيل المثال).

عند التشغيل في الوضع المستقل، السجل الوحيد الذي يتم إنشاؤه بواسطة WebdriverIO سيكون سجل `wdio`.

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
// قراءة اسم المستخدم وكلمة المرور من متغيرات البيئة
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// دمج اسم المستخدم وكلمة المرور بفاصل نقطتين
const credentials = `${username}:${password}`;
// تشفير بيانات الاعتماد باستخدام Base64
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

دالة تعترض كائنات استجابة HTTP بعد وصول استجابة WebDriver. يتم تمرير الدالة إلى كائن الاستجابة الأصلي كأول حجة و`RequestOptions` المقابلة كحجة ثانية.

النوع: `(Response, RequestOptions) => Response`<br />
الافتراضي: *لا شيء*

### strictSSL

ما إذا كان لا يتطلب أن تكون شهادة SSL صالحة.
يمكن تعيينها عبر متغيرات بيئية مثل `STRICT_SSL` أو `strict_ssl`.

النوع: `Boolean`<br />
الافتراضي: `true`

### enableDirectConnect

ما إذا كان تمكين [ميزة اتصال Appium المباشر](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
لا يفعل شيئًا إذا لم تحتوي الاستجابة على مفاتيح مناسبة بينما تم تمكين العلامة.

النوع: `Boolean`<br />
الافتراضي: `true`

### cacheDir

المسار إلى جذر دليل ذاكرة التخزين المؤقت. يتم استخدام هذا الدليل لتخزين جميع السائقين التي يتم تنزيلها عند محاولة بدء جلسة.

النوع: `String`<br />
الافتراضي: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

للحصول على تسجيل أكثر أمانًا، يمكن للتعبيرات النمطية المنتظمة المحددة بـ `maskingPatterns` إخفاء المعلومات الحساسة من السجل.
 - تنسيق السلسلة هو تعبير منتظم مع أو بدون أعلام (مثل `/.../i`) ومفصولة بفواصل للتعبيرات المنتظمة المتعددة.
 - لمزيد من التفاصيل حول أنماط التقنيع، راجع [قسم أنماط التقنيع في ملف README الخاص بـ WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

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

يمكن استخدام الخيارات التالية (بما في ذلك تلك المذكورة أعلاه) مع WebdriverIO في الوضع المستقل:

### automationProtocol

حدد البروتوكول الذي تريد استخدامه لأتمتة المتصفح الخاص بك. حاليًا يتم دعم [`webdriver`](https://www.npmjs.com/package/webdriver) فقط، حيث أنها تقنية أتمتة المتصفح الرئيسية التي يستخدمها WebdriverIO.

إذا كنت تريد أتمتة المتصفح باستخدام تقنية أتمتة مختلفة، تأكد من تعيين هذه الخاصية إلى مسار يحل إلى وحدة تلتزم بالواجهة التالية:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * ابدأ جلسة أتمتة وقم بإرجاع [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts) WebdriverIO
     * مع أوامر الأتمتة المعنية. انظر إلى حزمة [webdriver](https://www.npmjs.com/package/webdriver)
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
     * يسمح للمستخدم بالاتصال بالجلسات الموجودة
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

تقصير استدعاءات أمر `url` عن طريق تعيين عنوان URL أساسي.
- إذا كانت معلمة `url` الخاصة بك تبدأ بـ `/`، فسيتم إلحاق `baseUrl` قبلها (باستثناء مسار `baseUrl`، إذا كان لديه واحد).
- إذا كانت معلمة `url` الخاصة بك تبدأ بدون مخطط أو `/` (مثل `some/path`)، فسيتم إلحاق `baseUrl` الكامل مباشرةً قبلها.

النوع: `String`<br />
الافتراضي: `null`

### waitforTimeout

المهلة الافتراضية لجميع أوامر `waitFor*`. (لاحظ حرف `f` الصغير في اسم الخيار.) تؤثر هذه المهلة __فقط__ على الأوامر التي تبدأ بـ `waitFor*` ووقت الانتظار الافتراضي الخاص بها.

لزيادة المهلة لـ _اختبار_، يرجى الاطلاع على وثائق الإطار.

النوع: `Number`<br />
الافتراضي: `5000`

### waitforInterval

الفاصل الزمني الافتراضي لجميع أوامر `waitFor*` للتحقق مما إذا كانت الحالة المتوقعة (مثل الرؤية) قد تغيرت.

النوع: `Number`<br />
الافتراضي: `100`

### region

إذا كنت تعمل على Sauce Labs، يمكنك اختيار تشغيل الاختبارات بين مراكز بيانات مختلفة: الولايات المتحدة أو الاتحاد الأوروبي.
لتغيير منطقتك إلى الاتحاد الأوروبي، أضف `region: 'eu'` إلى التكوين الخاص بك.

__ملاحظة:__ هذا له تأثير فقط إذا قدمت خيارات `user` و `key` المرتبطة بحساب Sauce Labs الخاص بك.

النوع: `String`<br />
الافتراضي: `us`

*(فقط للأجهزة الافتراضية و/أو المحاكيات)*

---

## خيارات منفذ الاختبار

الخيارات التالية (بما في ذلك تلك المذكورة أعلاه) محددة فقط لتشغيل WebdriverIO مع منفذ اختبارات WDIO:

### specs

تحديد مواصفات لتنفيذ الاختبار. يمكنك إما تحديد نمط شامل لمطابقة ملفات متعددة في وقت واحد أو لف نمط شامل أو مجموعة من المسارات في مصفوفة لتشغيلها داخل عملية عامل واحدة. يتم اعتبار جميع المسارات نسبية من مسار ملف التكوين.

النوع: `(String | String[])[]`<br />
الافتراضي: `[]`

### exclude

استبعاد المواصفات من تنفيذ الاختبار. يتم اعتبار جميع المسارات نسبية من مسار ملف التكوين.

النوع: `String[]`<br />
الافتراضي: `[]`

### suites

كائن يصف مجموعات مختلفة، والتي يمكنك بعد ذلك تحديدها باستخدام خيار `--suite` في واجهة سطر أوامر `wdio`.

النوع: `Object`<br />
الافتراضي: `{}`

### capabilities

نفس قسم `capabilities` الموضح أعلاه، باستثناء إمكانية تحديد إما كائن [`multiremote`](/docs/multiremote)، أو جلسات WebDriver متعددة في مصفوفة للتنفيذ المتوازي.

يمكنك تطبيق نفس القدرات المحددة للبائع والمتصفح كما هو محدد [أعلاه](/docs/configuration#capabilities).

النوع: `Object`|`Object[]`<br />
الافتراضي: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

الحد الأقصى لعدد العمال المتوازية التي تعمل إجمالاً.

__ملاحظة:__ قد يكون هذا رقمًا مرتفعًا يصل إلى `100`، عندما يتم إجراء الاختبارات على بعض البائعين الخارجيين مثل أجهزة Sauce Labs. هناك، لا يتم اختبار الاختبارات على جهاز واحد، ولكن بدلاً من ذلك، على أجهزة افتراضية متعددة. إذا كان سيتم تشغيل الاختبارات على جهاز تطوير محلي، فاستخدم رقمًا أكثر معقولية، مثل `3` أو `4` أو `5`. في الأساس، هذا هو عدد المتصفحات التي سيتم بدء تشغيلها في وقت واحد وتشغيل اختباراتك في نفس الوقت، لذا فهو يعتمد على مقدار ذاكرة الوصول العشوائي (RAM) الموجودة على جهازك، وعدد التطبيقات الأخرى التي تعمل على جهازك.

يمكنك أيضًا تطبيق `maxInstances` داخل كائنات القدرات الخاصة بك باستخدام قدرة `wdio:maxInstances`. سيؤدي هذا إلى الحد من عدد الجلسات المتوازية لتلك القدرة المعينة.

النوع: `Number`<br />
الافتراضي: `100`

### maxInstancesPerCapability

الحد الأقصى لعدد العمال المتوازية التي تعمل لكل قدرة.

النوع: `Number`<br />
الافتراضي: `100`

### injectGlobals

يدخل عالميات WebdriverIO (مثل `browser` و `$` و `$$`) في البيئة العالمية.
إذا قمت بتعيينها إلى `false`، فيجب عليك الاستيراد من `@wdio/globals`، على سبيل المثال:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

ملاحظة: لا يتعامل WebdriverIO مع حقن العناصر العالمية الخاصة بإطار الاختبار.

النوع: `Boolean`<br />
الافتراضي: `true`

### bail

إذا كنت تريد أن يتوقف تشغيل الاختبار بعد عدد محدد من فشل الاختبارات، استخدم `bail`.
(الافتراضي هو `0`، والذي يقوم بتشغيل جميع الاختبارات بغض النظر عن النتيجة.) **ملاحظة:** الاختبار في هذا السياق هو جميع الاختبارات داخل ملف مواصفات واحد (عند استخدام Mocha أو Jasmine) أو جميع الخطوات داخل ملف ميزة (عند استخدام Cucumber). إذا كنت تريد التحكم في سلوك الإنهاء داخل الاختبارات لملف اختبار واحد، فألق نظرة على خيارات [الإطار](frameworks) المتاحة.

النوع: `Number`<br />
الافتراضي: `0` (لا تنتهي؛ قم بتشغيل جميع الاختبارات)

### specFileRetries

عدد المرات التي يتم فيها إعادة محاولة ملف مواصفات بأكمله عندما يفشل ككل.

النوع: `Number`<br />
الافتراضي: `0`

### specFileRetriesDelay

التأخير بالثواني بين محاولات إعادة ملف المواصفات

النوع: `Number`<br />
الافتراضي: `0`

### specFileRetriesDeferred

ما إذا كان يجب إعادة محاولة ملفات المواصفات المعادة فورًا أو تأجيلها إلى نهاية القائمة.

النوع: `Boolean`<br />
الافتراضي: `true`

### groupLogsByTestSpec

اختر عرض مخرجات السجل.

إذا تم تعيينه إلى `false`، فسيتم طباعة السجلات من ملفات الاختبار المختلفة في الوقت الفعلي. يرجى ملاحظة أن هذا قد يؤدي إلى خلط مخرجات السجل من ملفات مختلفة عند التشغيل بالتوازي.

إذا تم تعيينه إلى `true`، فسيتم تجميع مخرجات السجل حسب مواصفات الاختبار وطباعتها فقط عند اكتمال مواصفات الاختبار.

بشكل افتراضي، يتم تعيينه إلى `false` بحيث يتم طباعة السجلات في الوقت الفعلي.

النوع: `Boolean`<br />
الافتراضي: `false`

### autoAssertOnTestEnd

يتحكم في ما إذا كان WebdriverIO يتحقق تلقائيًا من جميع التأكيدات اللينة (soft assertions) في نهاية كل اختبار. عند تعيينه إلى `true`، سيتم التحقق تلقائيًا من أي تأكيدات لينة متراكمة وتسبب فشل الاختبار إذا فشلت أي تأكيدات. عند تعيينه إلى `false`، يجب عليك استدعاء طريقة التأكيد يدويًا للتحقق من التأكيدات اللينة.

النوع: `Boolean`<br />
الافتراضي: `true`

### services

تتولى الخدمات مهمة محددة لا تريد الاهتمام بها. إنها تعزز إعداد الاختبار الخاص بك بأقل جهد ممكن.

النوع: `String[]|Object[]`<br />
الافتراضي: `[]`

### framework

يحدد إطار الاختبار الذي سيتم استخدامه بواسطة منفذ اختبارات WDIO.

النوع: `String`<br />
الافتراضي: `mocha`<br />
الخيارات: `mocha` | `jasmine`

### mochaOpts, jasmineOpts and cucumberOpts

خيارات محددة متعلقة بالإطار. راجع وثائق محول الإطار لمعرفة الخيارات المتاحة. اقرأ المزيد عن هذا في [الأطر](frameworks).

النوع: `Object`<br />
الافتراضي: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

قائمة ميزات cucumber مع أرقام الأسطر (عند [استخدام إطار cucumber](./Frameworks.md#using-cucumber)).

النوع: `String[]`
الافتراضي: `[]`

### reporters

قائمة المُبلغين المراد استخدامها. يمكن أن يكون المُبلغ إما سلسلة، أو مصفوفة من
`['reporterName', { /* reporter options */}]` حيث العنصر الأول هو سلسلة مع اسم المُبلغ والعنصر الثاني كائن مع خيارات المُبلغ.

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

يحدد الفاصل الزمني الذي يجب أن يتحقق فيه المُبلغ مما إذا كانوا متزامنين إذا كانوا يبلغون عن سجلاتهم بشكل غير متزامن (على سبيل المثال، إذا كانت السجلات يتم بثها إلى بائع طرف ثالث).

النوع: `Number`<br />
الافتراضي: `100` (مللي ثانية)

### reporterSyncTimeout

يحدد الحد الأقصى للوقت الذي يجب أن يستغرقه المُبلغون لإنهاء تحميل جميع سجلاتهم حتى يتم إلقاء خطأ بواسطة منفذ الاختبار.

النوع: `Number`<br />
الافتراضي: `5000` (مللي ثانية)

### execArgv

وسيطات Node لتحديدها عند إطلاق العمليات الفرعية.

النوع: `String[]`<br />
الافتراضي: `null`

### filesToWatch

قائمة أنماط السلاسل التي تدعم glob والتي تخبر منفذ الاختبار بمراقبة ملفات أخرى، مثل ملفات التطبيق، عند تشغيله مع علامة `--watch`. بشكل افتراضي، يراقب منفذ الاختبار بالفعل جميع ملفات المواصفات.

النوع: `String[]`<br />
الافتراضي: `[]`

### updateSnapshots

قم بتعيينه إلى true إذا كنت تريد تحديث لقطاتك. من الناحية المثالية، يستخدم كجزء من معلمة CLI، على سبيل المثال `wdio run wdio.conf.js --s`.

النوع: `'new' | 'all' | 'none'`<br />
الافتراضي: `none` إذا لم يتم توفيره وتشغيل الاختبارات في CI، `new` إذا لم يتم توفيره، وإلا ما تم توفيره

### resolveSnapshotPath

تجاوز مسار اللقطة الافتراضي. على سبيل المثال، لتخزين اللقطات بجوار ملفات الاختبار.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

النوع: `(testPath: string, snapExtension: string) => string`<br />
الافتراضي: يخزن ملفات اللقطة في دليل `__snapshots__` بجوار ملف الاختبار

### tsConfigPath

يستخدم WDIO `tsx` لتجميع ملفات TypeScript. يتم اكتشاف TSConfig الخاص بك تلقائيًا من الدليل الحالي ولكن يمكنك تحديد مسار مخصص هنا أو عن طريق تعيين متغير البيئة TSX_TSCONFIG_PATH.

راجع وثائق `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

النوع: `String`<br />
الافتراضي: `null`<br />

## الخطافات

يسمح لك منفذ اختبارات WDIO بتعيين خطافات ليتم تشغيلها في أوقات محددة من دورة حياة الاختبار. هذا يسمح بإجراءات مخصصة (مثل التقاط لقطة شاشة إذا فشل الاختبار).

كل خطاف له كمعلمة معلومات محددة حول دورة الحياة (مثل معلومات حول مجموعة الاختبار أو الاختبار). اقرأ المزيد عن جميع خصائص الخطاف في [مثال التكوين الخاص بنا](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**ملاحظة:** بعض الخطافات (`onPrepare` و `onWorkerStart` و `onWorkerEnd` و `onComplete`) يتم تنفيذها في عملية مختلفة وبالتالي لا يمكنها مشاركة أي بيانات عالمية مع الخطافات الأخرى التي تعيش في عملية العامل.

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
- `retries` (`number`): عدد إعادة المحاولات على مستوى المواصفات المستخدمة كما هو محدد في [_"إضافة إعادة المحاولات على أساس ملف مواصفات"_](./Retry.md#add-retries-on-a-per-specfile-basis)

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
- `args` (`*`): الوسيطات التي سيتلقاها الأمر
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
- `caps` (`object`): يحتوي على قدرات للجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): المواصفات التي سيتم تشغيلها في عملية العامل

### afterSession

يتم تنفيذه بعد إنهاء جلسة webdriver مباشرة.

المعلمات:

- `config` (`object`): كائن تكوين WebdriverIO
- `caps` (`object`): يحتوي على قدرات للجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): المواصفات التي سيتم تشغيلها في عملية العامل

### onComplete

يتم تنفيذه بعد إيقاف تشغيل جميع العمال وعلى وشك الخروج من العملية. سيؤدي خطأ تم إلقاؤه في خطاف onComplete إلى فشل تشغيل الاختبار.

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

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): كائن العالم الذي يحتوي على معلومات عن pickle وخطوة الاختبار
- `context` (`object`): كائن Cucumber World

### afterScenario

يعمل بعد سيناريو Cucumber.

المعلمات:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): كائن العالم الذي يحتوي على معلومات عن pickle وخطوة الاختبار
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