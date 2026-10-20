---
id: configuration
title: الإعدادات
description: "اطّلع على جميع خيارات الإعدادات الخاصة بـ WebDriver وWebdriverIO المستقل ومشغّل اختبارات WDIO، بما في ذلك جميع خطافات مشغّل الاختبارات."
---

بحسب [نوع الإعداد](/docs/setuptypes) (مثل استخدام روابط البروتوكول الأولية، أو WebdriverIO كحزمة مستقلة، أو مشغّل اختبارات WDIO)، تتوفر مجموعة مختلفة من الخيارات للتحكم في البيئة.

## خيارات WebDriver

الخيارات التالية مُعرّفة عند استخدام حزمة البروتوكول [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

<Option type="String" default="http">

البروتوكول المستخدم عند الاتصال بخادم المشغّل (driver server).

</Option>

### hostname

<Option type="String" default="0.0.0.0">

مضيف خادم المشغّل الخاص بك.

</Option>

### port

<Option type="Number" default="undefined">

المنفذ الذي يعمل عليه خادم المشغّل الخاص بك.

</Option>

### path

<Option type="String" default="/">

المسار إلى نقطة نهاية خادم المشغّل.

</Option>

### queryParams

<Option type="Object" default="undefined">

معاملات الاستعلام التي يتم تمريرها إلى خادم المشغّل.

</Option>

### user

<Option type="String" default="undefined">

اسم المستخدم الخاص بخدمتك السحابية (يعمل فقط مع حسابات [Sauce Labs](https://saucelabs.com) أو [Browserstack](https://www.browserstack.com) أو [TestingBot](https://testingbot.com) أو [TestMu AI](https://www.testmuai.com/)). إذا تم تعيينه، سيقوم WebdriverIO تلقائيًا بتعيين خيارات الاتصال نيابةً عنك. إذا كنت لا تستخدم مزوّد خدمة سحابية، فيمكن استخدامه للمصادقة مع أي واجهة WebDriver خلفية أخرى.

</Option>

### key

<Option type="String" default="undefined">

مفتاح الوصول أو المفتاح السري لخدمتك السحابية (يعمل فقط مع حسابات [Sauce Labs](https://saucelabs.com) أو [Browserstack](https://www.browserstack.com) أو [TestingBot](https://testingbot.com) أو [TestMu AI](https://www.testmuai.com/)). إذا تم تعيينه، سيقوم WebdriverIO تلقائيًا بتعيين خيارات الاتصال نيابةً عنك. إذا كنت لا تستخدم مزوّد خدمة سحابية، فيمكن استخدامه للمصادقة مع أي واجهة WebDriver خلفية أخرى.

</Option>

### capabilities

<Option type="Object" default="null">

يحدد القدرات (capabilities) التي تريد تشغيلها في جلسة WebDriver الخاصة بك. راجع [بروتوكول WebDriver](https://w3c.github.io/webdriver/#capabilities) لمزيد من التفاصيل.

إلى جانب القدرات المستندة إلى WebDriver، يمكنك تطبيق خيارات خاصة بالمتصفح والمزوّد تتيح إعدادًا أعمق للمتصفح أو الجهاز البعيد. هذه الخيارات موثقة في وثائق المزوّد المعني، على سبيل المثال:

- `goog:chromeOptions`: لـ [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: لـ [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: لـ [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: لـ [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: لـ [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: لـ [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

بالإضافة إلى ذلك، من الأدوات المفيدة [مُكوِّن الاختبارات المؤتمتة](https://docs.saucelabs.com/basics/platform-configurator/) من Sauce Labs، والذي يساعدك على إنشاء هذا الكائن عن طريق اختيار القدرات التي تريدها بالنقر.

</Option>
**مثال:**

```js
{
    browserName: 'chrome', // الخيارات: `chrome`، `edge`، `firefox`، `safari`
    browserVersion: '27.0', // إصدار المتصفح
    platformName: 'Windows 10' // منصة نظام التشغيل
}
```

إذا كنت تشغّل اختبارات ويب أو اختبارات أصلية على أجهزة محمولة، فإن `capabilities` تختلف عن بروتوكول WebDriver. راجع [وثائق Appium](https://appium.io/docs/en/latest/guides/caps/) لمزيد من التفاصيل.

### logLevel

<Option type="String" default="info" values="trace | debug | info | warn | error | silent">

مستوى تفصيل السجلات.

</Option>

### outputDir

<Option type="String" default="null">

المجلد الذي تُخزَّن فيه جميع ملفات سجلات مشغّل الاختبارات (بما في ذلك سجلات المُبلِّغين وسجلات `wdio`). إذا لم يتم تعيينه، يتم بث جميع السجلات إلى `stdout`. نظرًا لأن معظم المُبلِّغين مصممون للكتابة إلى `stdout`، يُوصى باستخدام هذا الخيار فقط مع مُبلِّغين محددين يكون من المنطقي فيهم دفع التقرير إلى ملف (مثل المُبلِّغ `junit`).

عند التشغيل في الوضع المستقل، سيكون السجل الوحيد الذي يُنشئه WebdriverIO هو سجل `wdio`.

</Option>

### connectionRetryTimeout

<Option type="Number" default="120000">

مهلة أي طلب WebDriver إلى مشغّل أو شبكة (grid).

</Option>

### connectionRetryCount

<Option type="Number" default="3">

الحد الأقصى لعدد مرات إعادة محاولة الطلب إلى خادم Selenium.

</Option>

### bidiResponseTimeout

<Option type="Number" default="180000">

المهلة (بالمللي ثانية) لتلقّي أمر WebDriver Bidi استجابةً من المتصفح. قم بزيادتها إذا كنت تشغّل أوامر، مثل [`execute`](/docs/api/browser/execute)، تستغرق بطبيعتها وقتًا أطول من القيمة الافتراضية لإنهائها، وإلا فسيتوقف WebdriverIO عن الانتظار قبل أن ينتهي المتصفح.

يتوقف `execute` أيضًا عند مهلة `script` الخاصة بالجلسة (30 ثانية افتراضيًا، راجع [`setTimeout`](/docs/api/browser/setTimeout)). للحصول على مهلة `script` أطول من `bidiResponseTimeout`، قم بزيادة كلتيهما.

</Option>

### bidiConnectTimeout

<Option type="Number" default="10000">

المهلة (بالمللي ثانية) لقبول المتصفح اتصال WebDriver Bidi. بعد انقضائها، تستمر الجلسة باستخدام WebDriver Classic، وتفشل الأوامر الخاصة بـ Bidi فقط مثل [`mock`](/docs/api/browser/mock). قم بزيادتها إذا كان المتصفح المشغول عند بدء التشغيل يقبل الاتصال متأخرًا، مثل عدة متصفحات تبدأ في الوقت نفسه على مُشغِّل CI.

ينطبق هذا الخيار على الجلسات في Node.js. أما في المتصفح، على سبيل المثال مع [مشغّل المتصفح](/docs/runner#browser-runner)، فينتظر الاتصال حتى يُفتح أو يفشل.

</Option>

### agent

<Option type="Object" default={`{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}`}>

يتيح لك استخدام [وكيل](https://www.npmjs.com/package/got#agent)` http`/`https`/`http2` مخصص لإجراء الطلبات.

</Option>

### headers

<Option type="Object" default={`{}`}>

حدد `headers` مخصصة لتمريرها في كل طلب WebDriver. إذا كانت شبكة Selenium Grid الخاصة بك تتطلب مصادقة أساسية (Basic Authentication)، فنوصي بتمرير ترويسة `Authorization` من خلال هذا الخيار لمصادقة طلبات WebDriver الخاصة بك، على سبيل المثال:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// قراءة اسم المستخدم وكلمة المرور من متغيرات البيئة
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// دمج اسم المستخدم وكلمة المرور مع فاصل النقطتين
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

</Option>

### transformRequest

<Option type="(RequestOptions) => RequestOptions" default="none">

دالة تعترض [خيارات طلب HTTP](https://github.com/sindresorhus/got#options) قبل إجراء طلب WebDriver

</Option>

### transformResponse

<Option type="(Response, RequestOptions) => Response" default="none">

دالة تعترض كائنات استجابة HTTP بعد وصول استجابة WebDriver. يتم تمرير كائن الاستجابة الأصلي إلى الدالة كوسيط أول، و`RequestOptions` المقابلة كوسيط ثانٍ.

</Option>

### strictSSL

<Option type="Boolean" default="true">

ما إذا كان لا يتطلب أن تكون شهادة SSL صالحة.
يمكن تعيينه عبر متغيرات البيئة `STRICT_SSL` أو `strict_ssl`.

</Option>

### enableDirectConnect

<Option type="Boolean" default="true">

ما إذا كان يتم تفعيل [ميزة الاتصال المباشر في Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
لا يفعل شيئًا إذا لم تحتوِ الاستجابة على المفاتيح المناسبة أثناء تفعيل هذه الخاصية.

</Option>

### cacheDir

<Option type="String" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

المسار إلى جذر مجلد التخزين المؤقت. يُستخدم هذا المجلد لتخزين جميع المشغّلات التي يتم تنزيلها عند محاولة بدء جلسة.

</Option>

### maskingPatterns

<Option type="String" default="undefined">

لتسجيل أكثر أمانًا، يمكن للتعابير النمطية المُعيَّنة باستخدام `maskingPatterns` إخفاء المعلومات الحساسة من السجل.
 - تنسيق السلسلة النصية هو تعبير نمطي مع أو بدون علامات (مثل `/.../i`)، ويُفصل بفواصل عند استخدام عدة تعابير نمطية.
 - لمزيد من التفاصيل حول أنماط الإخفاء، راجع [قسم أنماط الإخفاء في ملف README الخاص بـ WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

</Option>
**مثال:**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

## WebdriverIO

يمكن استخدام الخيارات التالية (بما في ذلك الخيارات المذكورة أعلاه) مع WebdriverIO في الوضع المستقل:

### automationProtocol

<Option type="String" default="webdriver">

حدد البروتوكول الذي تريد استخدامه لأتمتة المتصفح. حاليًا يتم دعم [`webdriver`](https://www.npmjs.com/package/webdriver) فقط، لأنه تقنية أتمتة المتصفح الرئيسية التي يستخدمها WebdriverIO.

إذا كنت تريد أتمتة المتصفح باستخدام تقنية أتمتة مختلفة، فتأكد من تعيين هذه الخاصية إلى مسار يشير إلى وحدة تلتزم بالواجهة التالية:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * بدء جلسة أتمتة وإرجاع [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts) خاص بـ WebdriverIO
     * مع أوامر الأتمتة المعنية. راجع حزمة [webdriver](https://www.npmjs.com/package/webdriver)
     * كتطبيق مرجعي
     *
     * @param {Capabilities.RemoteConfig} options خيارات WebdriverIO
     * @param {Function} hook يتيح تعديل العميل قبل إطلاقه من الدالة
     * @param {PropertyDescriptorMap} userPrototype يتيح للمستخدم إضافة أوامر بروتوكول مخصصة
     * @param {Function} customCommandWrapper يتيح تعديل تنفيذ الأمر
     * @returns نسخة عميل متوافقة مع WebdriverIO
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * يتيح للمستخدم الارتباط بجلسات موجودة
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * يغيّر معرّف جلسة النسخة وقدرات المتصفح للجلسة الجديدة
     * مباشرةً في كائن المتصفح المُمرَّر
     *
     * @optional
     * @param   {object} instance  الكائن الذي نحصل عليه من جلسة متصفح جديدة.
     * @returns {string}           معرّف الجلسة الجديد للمتصفح
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

</Option>

### baseUrl

<Option type="String" default="null">

اختصر استدعاءات الأمر `url` عن طريق تعيين عنوان URL أساسي.
- إذا كان المعامل `url` يبدأ بـ `/`، فستتم إضافة `baseUrl` في بدايته (باستثناء مسار `baseUrl`، إن وُجد).
- إذا كان المعامل `url` يبدأ بدون مخطط (scheme) أو `/` (مثل `some/path`)، فستتم إضافة `baseUrl` كاملًا في بدايته مباشرةً.

</Option>

### waitforTimeout

<Option type="Number" default="5000">

المهلة الافتراضية لجميع أوامر `waitFor*`. (لاحظ الحرف الصغير `f` في اسم الخيار.) تؤثر هذه المهلة __فقط__ على الأوامر التي تبدأ بـ `waitFor*` ووقت انتظارها الافتراضي.

لزيادة المهلة الخاصة بـ _اختبار_، يرجى مراجعة وثائق إطار العمل.

</Option>

### waitforInterval

<Option type="Number" default="100">

الفاصل الزمني الافتراضي لجميع أوامر `waitFor*` للتحقق مما إذا كانت الحالة المتوقعة (مثل الظهور) قد تغيّرت.

</Option>

### strictSelectors

<Option type="Boolean" default="true">

يجعل الأمر [`$`](/docs/api/browser/$) يرمي `StrictSelectorError` عندما يُطابق المُحدِّد المُعطى أكثر من عنصر واحد، بدلًا من استخدام أول تطابق بصمت. لا يتأثر `$$` بذلك.

يمكنك إلغاء هذا السلوك لاستعلام واحد بتمرير `{ strict: false }` كوسيط ثانٍ، مثل `$('button', { strict: false })`.

راجع دليل [المُحدِّدات](/docs/selectors#strict-mode) للتفاصيل.

</Option>

### maxSpyCollectedBodySize

<Option type="Number" default="10485760 (10MB)">

الحد الأقصى لحجم جسم الاستجابة (بالبايت) الذي يمكن إرجاعه عند استخدام الأمر [`mock`](/docs/api/browser/mock). استخدم `0` لتعطيل جمع بيانات الحمولة المُراقَبة.

</Option>

### region

<Option type="String" default="us" values="us | eu | us-west-1 | eu-central-1 | us-east-4 | asia-south-2 | staging">

إذا كنت تعمل على Sauce Labs، يمكنك اختيار تشغيل الاختبارات بين مراكز بيانات مختلفة.
استخدم معرّفات المناطق المختصرة `us` (الافتراضي، ويُقابل `us-west-1`) أو `eu` (ويُقابل `eu-central-1`)، أو أسماء المناطق الكاملة مباشرةً.

__ملاحظة:__ لهذا الخيار تأثير فقط إذا قدّمت خياري `user` و`key` المرتبطين بحسابك على Sauce Labs.

</Option>
*(فقط للأجهزة الافتراضية و/أو المحاكيات، باستثناء `us-east-4` و`asia-south-2` اللتين تستضيفان أجهزة حقيقية فقط)*

## خيارات مشغّل الاختبارات

الخيارات التالية (بما في ذلك الخيارات المذكورة أعلاه) مُعرّفة فقط لتشغيل WebdriverIO باستخدام مشغّل اختبارات WDIO:

### specs

<Option type="(String | String[])[]" default="[]">

حدد ملفات المواصفات (specs) لتنفيذ الاختبارات. يمكنك إما تحديد نمط glob لمطابقة عدة ملفات في آن واحد، أو تضمين نمط glob أو مجموعة من المسارات في مصفوفة لتشغيلها ضمن عملية عامل (worker) واحدة. تُعتبر جميع المسارات نسبية إلى مسار ملف الإعدادات.

</Option>

### exclude

<Option type="String[]" default="[]">

استبعاد ملفات المواصفات من تنفيذ الاختبارات. تُعتبر جميع المسارات نسبية إلى مسار ملف الإعدادات.

</Option>

### suites

<Option type="Object" default={`{}`}>

كائن يصف مجموعات اختبار متنوعة، يمكنك بعد ذلك تحديدها باستخدام الخيار `--suite` في واجهة سطر الأوامر `wdio`.

</Option>

### capabilities

<Option type="Object|Object[]" default={`[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`}>

مماثل لقسم `capabilities` الموضح أعلاه، مع إمكانية تحديد كائن [multi-remote](/docs/multiremote)، أو عدة جلسات WebDriver في مصفوفة للتنفيذ المتوازي.

يمكنك تطبيق نفس القدرات الخاصة بالمزوّد والمتصفح كما هو مُعرّف [أعلاه](/docs/configuration#capabilities).

</Option>

### maxInstances

<Option type="Number" default="100">

الحد الأقصى للعدد الإجمالي للعمّال (workers) العاملين بالتوازي.

__ملاحظة:__ قد يصل هذا العدد إلى `100` عندما تُجرى الاختبارات على أجهزة مزوّدين خارجيين مثل أجهزة Sauce Labs. هناك، لا تُختبر الاختبارات على جهاز واحد، بل على عدة أجهزة افتراضية. أما إذا كانت الاختبارات ستُشغَّل على جهاز تطوير محلي، فاستخدم عددًا أكثر معقولية، مثل `3` أو `4` أو `5`. في الأساس، هذا هو عدد المتصفحات التي سيتم تشغيلها بالتزامن لتنفيذ اختباراتك في الوقت نفسه، لذا فهو يعتمد على حجم ذاكرة RAM في جهازك، وعدد التطبيقات الأخرى التي تعمل عليه.

يمكنك أيضًا تطبيق `maxInstances` داخل كائنات القدرات باستخدام القدرة `wdio:maxInstances`. سيحدّ ذلك من عدد الجلسات المتوازية لتلك القدرة بعينها.

</Option>

### maxInstancesPerCapability

<Option type="Number" default="100">

الحد الأقصى للعدد الإجمالي للعمّال العاملين بالتوازي لكل قدرة.

</Option>

### injectGlobals

<Option type="Boolean" default="true">

يُدرج المتغيرات العامة الخاصة بـ WebdriverIO (مثل `browser` و`$` و`$$`) في البيئة العامة.
إذا عيّنته إلى `false`، فيجب عليك الاستيراد من `@wdio/globals`، على سبيل المثال:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

ملاحظة: لا يتولى WebdriverIO إدراج المتغيرات العامة الخاصة بإطار عمل الاختبار.

</Option>

### bail

<Option type="Number" default="0 (don't bail; run all tests)">

إذا كنت تريد أن يتوقف تشغيل اختباراتك بعد عدد محدد من حالات فشل الاختبارات، فاستخدم `bail`.
(القيمة الافتراضية هي `0`، والتي تشغّل جميع الاختبارات مهما حدث.) **ملاحظة:** يُقصد بالاختبار في هذا السياق جميع الاختبارات داخل ملف مواصفات واحد (عند استخدام Mocha أو Jasmine) أو جميع الخطوات داخل ملف ميزة (عند استخدام Cucumber). إذا كنت تريد التحكم في سلوك التوقف داخل اختبارات ملف اختبار واحد، فاطّلع على خيارات [إطار العمل](frameworks) المتاحة.

</Option>

### specFileRetries

<Option type="Number" default="0">

عدد مرات إعادة محاولة ملف المواصفات بالكامل عندما يفشل ككل.

</Option>

### specFileRetriesDelay

<Option type="Number" default="0">

التأخير بالثواني بين محاولات إعادة تشغيل ملف المواصفات

</Option>

### specFileRetriesDeferred

<Option type="Boolean" default="true">

ما إذا كان يجب إعادة محاولة ملفات المواصفات فورًا أو تأجيلها إلى نهاية قائمة الانتظار.

</Option>

### groupLogsByTestSpec

<Option type="Boolean" default="false">

اختر طريقة عرض مخرجات السجل.

إذا تم تعيينه إلى `false`، فستُطبع السجلات من ملفات الاختبار المختلفة في الوقت الفعلي. يرجى ملاحظة أن ذلك قد يؤدي إلى اختلاط مخرجات السجلات من ملفات مختلفة عند التشغيل بالتوازي.

إذا تم تعيينه إلى `true`، فستُجمَّع مخرجات السجل حسب ملف المواصفات (Test Spec) وتُطبع فقط عند اكتماله.

افتراضيًا، يتم تعيينه إلى `false` بحيث تُطبع السجلات في الوقت الفعلي.

</Option>

### autoAssertOnTestEnd

<Option type="Boolean" default="true">

يتحكم في ما إذا كان WebdriverIO يتحقق تلقائيًا من جميع التأكيدات المرنة (soft assertions) في نهاية كل اختبار. عند تعيينه إلى `true`، سيتم التحقق تلقائيًا من أي تأكيدات مرنة متراكمة، وسيفشل الاختبار إذا فشل أي منها. عند تعيينه إلى `false`، يجب عليك استدعاء دالة التأكيد يدويًا للتحقق من التأكيدات المرنة.

</Option>

### services

<Option type="String[]|Object[]" default="[]">

تتولى الخدمات مهمة محددة لا تريد الاهتمام بها بنفسك. فهي تُعزّز إعداد اختباراتك بجهد يكاد يكون معدومًا.

</Option>

### framework

<Option type="String" default="mocha" values="mocha | jasmine | cucumber">

يحدد إطار عمل الاختبار الذي سيستخدمه مشغّل اختبارات WDIO.

</Option>

### mochaOpts, jasmineOpts and cucumberOpts

<Option type="Object" default={`{ timeout: 10000 }`}>

خيارات خاصة بإطار العمل. راجع وثائق محوّل إطار العمل لمعرفة الخيارات المتاحة. اقرأ المزيد حول هذا في [أطر العمل](frameworks).

</Option>

### cucumberFeaturesWithLineNumbers

<Option type="String[]" default="[]">

قائمة بميزات cucumber مع أرقام الأسطر (عند [استخدام إطار عمل cucumber](./Frameworks.md#using-cucumber)).

</Option>

### reporters

<Option type="String[]|Object[]" default="[]">

قائمة المُبلِّغين المراد استخدامهم. يمكن أن يكون المُبلِّغ إما سلسلة نصية، أو مصفوفة على شكل
`['reporterName', { /* reporter options */}]` حيث يكون العنصر الأول سلسلة نصية باسم المُبلِّغ، والعنصر الثاني كائنًا يحتوي على خيارات المُبلِّغ.

</Option>
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

<Option type="Number" default="100 (ms)">

يحدد الفاصل الزمني الذي يجب أن يتحقق فيه المُبلِّغون مما إذا كانوا متزامنين، في حال كانوا يُبلّغون عن سجلاتهم بشكل غير متزامن (مثلًا إذا كانت السجلات تُبث إلى مزوّد خارجي).

</Option>

### reporterSyncTimeout

<Option type="Number" default="5000 (ms)">

يحدد الحد الأقصى للوقت المتاح للمُبلِّغين لإنهاء رفع جميع سجلاتهم قبل أن يرمي مشغّل الاختبارات خطأً.

</Option>

### execArgv

<Option type="String[]" default="null">

وسائط Node المراد تحديدها عند تشغيل العمليات الفرعية.

</Option>

### cpuProf

<Option type="Boolean" default="false">

تفعيل تحليل أداء وحدة المعالجة المركزية (CPU profiling) لعملية العامل. سيتم إنشاء ملف التحليل تلقائيًا عند خروج عملية العامل.

</Option>

### heapProf

<Option type="Boolean" default="false">

تفعيل تحليل الذاكرة (Heap profiling) لعملية العامل. سيتم إنشاء اللقطة تلقائيًا عند خروج عملية العامل (يستخدم محلل الذاكرة بأخذ العينات).

</Option>

### profileOutputDir

<Option type="String" default="./profiles">

المجلد الذي ستُحفظ فيه ملفات تحليل وحدة المعالجة المركزية (`.cpuprofile`) وملفات تحليل الذاكرة (`.heapprofile`).

</Option>

### filesToWatch

<Option type="String[]" default="[]">

قائمة بأنماط سلاسل نصية تدعم glob، تُخبر مشغّل الاختبارات بمراقبة ملفات أخرى إضافية، مثل ملفات التطبيق، عند تشغيله باستخدام الخيار `--watch`. افتراضيًا، يراقب مشغّل الاختبارات بالفعل جميع ملفات المواصفات.

</Option>

### updateSnapshots

<Option type="'new' | 'all' | 'none'" default="none if not provided and tests run in CI, new if not provided, otherwise what's been provided">

عيّنه إلى true إذا كنت تريد تحديث اللقطات (snapshots) الخاصة بك. يُفضّل استخدامه كجزء من معامل في واجهة سطر الأوامر، مثل `wdio run wdio.conf.js --s`.

</Option>

### resolveSnapshotPath

<Option type="(testPath: string, snapExtension: string) => string" default="stores snapshot files in __snapshots__ directory next to test file">

يتجاوز مسار اللقطات الافتراضي. على سبيل المثال، لتخزين اللقطات بجوار ملفات الاختبار.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

</Option>

### tsConfigPath

<Option type="String" default="null">

يستخدم WDIO أداة `tsx` لترجمة ملفات TypeScript. يتم اكتشاف ملف TSConfig الخاص بك تلقائيًا من مجلد العمل الحالي، ولكن يمكنك تحديد مسار مخصص هنا أو عن طريق تعيين متغير البيئة TSX_TSCONFIG_PATH.

راجع وثائق `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

</Option>

### displayServerEnabled

<Option type="Boolean" default="true">

بدء شاشة افتراضية للتشغيل على Linux عندما لا يكون أيٌّ من `DISPLAY` أو `WAYLAND_DISPLAY` مُعيَّنًا. عيّنه إلى `false` عندما تعمل في الوضع بدون واجهة (headless) أو فقط على خدمة سحابية أو شبكة بعيدة. يتحكم هذا الخيار فقط في ما إذا كان خادم العرض سيبدأ: فعند تعيين `WAYLAND_DISPLAY` فقط، يظل مشغّل الاختبارات يعيّن `XDG_SESSION_TYPE` و`GDK_BACKEND` و`ELECTRON_OZONE_PLATFORM_HINT` إلى `wayland` للتشغيل. راجع [Headless & Display Servers](/docs/headless-and-display-servers).

</Option>

### displayServer

<Option type="String" default="auto" values="auto | wayland | xvfb">

خادم العرض المراد تشغيله. يحاول `auto` تشغيل Weston ويعود إلى Xvfb عندما يكون Weston غير موجود أو يفشل في البدء. أما `wayland` و`xvfb` فيحاولان تشغيل ذلك الخادم فقط.

</Option>

### displayServerAutoInstall

<Option type="Boolean" default="false">

تثبيت خادم العرض المفقود باستخدام مدير حزم النظام عندما لا يبدأ أي خادم مُثبَّت.

</Option>

### displayServerAutoInstallMode

<Option type="String" default="sudo" values="root | sudo">

طريقة تشغيل التثبيت المدمج: يقوم `root` بالتثبيت فقط عند التشغيل كمستخدم root، ويستخدم `sudo` الأمر غير التفاعلي `sudo -n` عند عدم التشغيل كـ root، أو يقوم بالتثبيت بدونه عندما لا يكون `sudo` مُثبّتًا.

</Option>

### displayServerAutoInstallCommand

<Option type="String | String[]">

أمر يُشغَّل بدلًا من التثبيت المدمج، كما هو وبدون `sudo`. يعمل فقط مع `displayServerAutoInstall: true`. تُشغَّل السلسلة النصية داخل صدفة (shell)، بينما تُشغَّل المصفوفة بدونها. مع `auto`، يُشغَّل أولًا لـ Weston، ثم مرة أخرى لـ Xvfb فقط إذا ظل Weston غير متاح أو فشل في البدء، وكان Xvfb لا يزال مفقودًا. عيّن `displayServer` إلى الخادم الذي يثبّته الأمر لتخطي محاولة الخادم الآخر.

</Option>

### displayServerWidth

<Option type="Number" default="1920">

عرض شاشة العرض الافتراضية بالبكسل.

</Option>

### displayServerHeight

<Option type="Number" default="1080">

ارتفاع شاشة العرض الافتراضية بالبكسل.

</Option>

### displayServerDepth

<Option type="Number" default="24">

عمق الألوان لشاشة العرض الافتراضية. خاص بـ Xvfb فقط.

</Option>

## الخطافات (Hooks)

يتيح لك مشغّل اختبارات WDIO تعيين خطافات لتُفعَّل في أوقات محددة من دورة حياة الاختبار. وهذا يتيح تنفيذ إجراءات مخصصة (مثل التقاط لقطة شاشة عند فشل اختبار).

يحتوي كل خطاف على معلومات محددة حول دورة الحياة كمعامل (مثل معلومات عن مجموعة الاختبار أو الاختبار). اقرأ المزيد حول جميع خصائص الخطافات في [ملف الإعدادات النموذجي لدينا](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**ملاحظة:** يتم تنفيذ بعض الخطافات (`onPrepare` و`onWorkerStart` و`onWorkerEnd` و`onComplete`) في عملية مختلفة، وبالتالي لا يمكنها مشاركة أي بيانات عامة مع الخطافات الأخرى الموجودة في عملية العامل.

### onPrepare

يُنفَّذ مرة واحدة قبل تشغيل جميع العمّال.

المعاملات:

- `config` (`object`): كائن إعدادات WebdriverIO
- `param` (`object[]`): قائمة بتفاصيل القدرات

### onWorkerStart

يُنفَّذ قبل إنشاء عملية عامل، ويمكن استخدامه لتهيئة خدمة محددة لذلك العامل، وكذلك لتعديل بيئات التشغيل بشكل غير متزامن.

المعاملات:

- `cid` (`string`): معرّف القدرة (مثل 0-0)
- `caps` (`object`): يحتوي على القدرات الخاصة بالجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): ملفات المواصفات المراد تشغيلها في عملية العامل
- `args` (`object`): كائن سيتم دمجه مع الإعدادات الرئيسية بمجرد تهيئة العامل
- `execArgv` (`string[]`): قائمة بالوسائط النصية المُمرَّرة إلى عملية العامل

### onWorkerEnd

يُنفَّذ مباشرةً بعد خروج عملية عامل.

المعاملات:

- `cid` (`string`): معرّف القدرة (مثل 0-0)
- `exitCode` (`number`): ‏0 - نجاح، 1 - فشل. العامل الذي أُنهي بواسطة إشارة يُبلّغ بدلًا من ذلك عن `128` + رقم الإشارة، مثل `139` لإشارة `SIGSEGV`
- `specs` (`string[]`): ملفات المواصفات المراد تشغيلها في عملية العامل
- `retries` (`number`): عدد إعادات المحاولة المستخدمة على مستوى ملف المواصفات كما هو مُعرّف في [_"إضافة إعادات المحاولة على أساس كل ملف مواصفات"_](./Retry.md#add-retries-on-a-per-specfile-basis)
- `signal` (`string`): الإشارة التي أنهت العامل، مثل `SIGSEGV`، أو `null` إذا خرج من تلقاء نفسه

### beforeSession

يُنفَّذ قبل تهيئة جلسة webdriver وإطار عمل الاختبار مباشرةً. يتيح لك التعامل مع الإعدادات اعتمادًا على القدرة أو ملف المواصفات.

المعاملات:

- `config` (`object`): كائن إعدادات WebdriverIO
- `caps` (`object`): يحتوي على القدرات الخاصة بالجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): ملفات المواصفات المراد تشغيلها في عملية العامل

### before

يُنفَّذ قبل بدء تنفيذ الاختبار. في هذه المرحلة يمكنك الوصول إلى جميع المتغيرات العامة مثل `browser`. إنه المكان المثالي لتعريف الأوامر المخصصة.

المعاملات:

- `caps` (`object`): يحتوي على القدرات الخاصة بالجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): ملفات المواصفات المراد تشغيلها في عملية العامل
- `browser` (`object`): نسخة من جلسة المتصفح/الجهاز التي تم إنشاؤها

### beforeSuite

خطاف يُنفَّذ قبل بدء مجموعة الاختبار (في Mocha/Jasmine فقط)

المعاملات:

- `suite` (`object`): تفاصيل مجموعة الاختبار

### beforeHook

خطاف يُنفَّذ *قبل* بدء خطاف داخل مجموعة الاختبار (مثلًا يعمل قبل استدعاء beforeEach في Mocha)

المعاملات:

- `test` (`object`): تفاصيل الاختبار
- `context` (`object`): سياق الاختبار (يمثّل كائن World في Cucumber)

### afterHook

خطاف يُنفَّذ *بعد* انتهاء خطاف داخل مجموعة الاختبار (مثلًا يعمل بعد استدعاء afterEach في Mocha)

المعاملات:

- `test` (`object`): تفاصيل الاختبار
- `context` (`object`): سياق الاختبار (يمثّل كائن World في Cucumber)
- `result` (`object`): نتيجة الخطاف (تحتوي على الخصائص `error` و`result` و`duration` و`passed` و`retries`)

### beforeTest

دالة تُنفَّذ قبل الاختبار (في Mocha/Jasmine فقط).

المعاملات:

- `test` (`object`): تفاصيل الاختبار
- `context` (`object`): كائن النطاق الذي نُفِّذ به الاختبار

### beforeCommand

يعمل قبل تنفيذ أمر WebdriverIO. بالنسبة لأمر عنصر، يعمل قبل أن ينتظر WebdriverIO العنصر (راجع [الانتظار التلقائي](./AutoWait.md)).

المعاملات:

- `commandName` (`string`): اسم الأمر
- `args` (`*`): الوسائط التي سيتلقاها الأمر

### afterCommand

يعمل بعد تنفيذ أمر WebdriverIO. بالنسبة لأمر عنصر، يعمل بعد انتظار العنصر. عندما يعيد WebdriverIO محاولة أمر عنصر (على سبيل المثال بعد عنصر قديم stale)، يتلقى الخطاف نتيجة أو خطأ المحاولة الأخيرة.

المعاملات:

- `commandName` (`string`): اسم الأمر
- `args` (`*`): الوسائط التي سيتلقاها الأمر
- `result` (`*`): نتيجة الأمر
- `error` (`Error`): كائن الخطأ إن وُجد

### afterTest

دالة تُنفَّذ بعد انتهاء الاختبار (في Mocha/Jasmine). تعمل أيضًا بعد انتهاء مهلة الاختبار. مع Mocha، يبدأ الاختبار التالي بعد انتهاء هذا الخطاف (ينتظره Mocha حتى مهلة إضافية واحدة للاختبار، راجع [المهلات](./Timeouts.md#mocha-timeouts-and-the-webdriverio-hooks)).

المعاملات:

- `test` (`object`): تفاصيل الاختبار
- `context` (`object`): كائن النطاق الذي نُفِّذ به الاختبار
- `result.error` (`Error`): كائن الخطأ في حال فشل الاختبار، وإلا `undefined`
- `result.result` (`Any`): الكائن المُرجَع من دالة الاختبار
- `result.duration` (`Number`): مدة الاختبار
- `result.passed` (`Boolean`): true إذا نجح الاختبار، وإلا false
- `result.retries` (`Object`): معلومات حول إعادات المحاولة المتعلقة باختبار واحد كما هو مُعرّف لـ [Mocha وJasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) وكذلك [Cucumber](./Retry.md#rerunning-in-cucumber)، مثل `{ attempts: 0, limit: 0 }`، راجع
- `result` (`object`): نتيجة الخطاف (تحتوي على الخصائص `error` و`result` و`duration` و`passed` و`retries`)

### afterSuite

خطاف يُنفَّذ بعد انتهاء مجموعة الاختبار (في Mocha/Jasmine فقط)

المعاملات:

- `suite` (`object`): تفاصيل مجموعة الاختبار

### after

يُنفَّذ بعد انتهاء جميع الاختبارات. لا يزال بإمكانك الوصول إلى جميع المتغيرات العامة من الاختبار.

المعاملات:

- `result` (`number`): ‏0 - نجاح الاختبار، 1 - فشل الاختبار
- `caps` (`object`): يحتوي على القدرات الخاصة بالجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): ملفات المواصفات المراد تشغيلها في عملية العامل

### afterSession

يُنفَّذ مباشرةً بعد إنهاء جلسة webdriver.

المعاملات:

- `config` (`object`): كائن إعدادات WebdriverIO
- `caps` (`object`): يحتوي على القدرات الخاصة بالجلسة التي سيتم إنشاؤها في العامل
- `specs` (`string[]`): ملفات المواصفات المراد تشغيلها في عملية العامل

### onComplete

يُنفَّذ بعد إيقاف جميع العمّال وعندما تكون العملية على وشك الخروج. أي خطأ يُرمى في خطاف onComplete سيؤدي إلى فشل تشغيل الاختبارات.

المعاملات:

- `exitCode` (`number`): ‏0 - نجاح، 1 - فشل
- `config` (`object`): كائن إعدادات WebdriverIO
- `caps` (`object`): يحتوي على القدرات الخاصة بالجلسة التي سيتم إنشاؤها في العامل
- `result` (`object`): كائن النتائج الذي يحتوي على نتائج الاختبارات

### onReload

يُنفَّذ عند حدوث تحديث.

المعاملات:

- `oldSessionId` (`string`): معرّف الجلسة القديمة
- `newSessionId` (`string`): معرّف الجلسة الجديدة

### beforeFeature

يعمل قبل ميزة (Feature) في Cucumber.

المعاملات:

- `uri` (`string`): المسار إلى ملف الميزة
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): كائن ميزة Cucumber

### afterFeature

يعمل بعد ميزة (Feature) في Cucumber.

المعاملات:

- `uri` (`string`): المسار إلى ملف الميزة
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): كائن ميزة Cucumber

### beforeScenario

يعمل قبل سيناريو (Scenario) في Cucumber.

المعاملات:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): كائن world يحتوي على معلومات حول pickle وخطوة الاختبار
- `context` (`object`): كائن World في Cucumber

### afterScenario

يعمل بعد سيناريو (Scenario) في Cucumber.

المعاملات:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): كائن world يحتوي على معلومات حول pickle وخطوة الاختبار
- `result` (`object`): كائن النتائج الذي يحتوي على نتائج السيناريو
- `result.passed` (`boolean`): true إذا نجح السيناريو
- `result.error` (`string`): مكدس الخطأ إذا فشل السيناريو
- `result.duration` (`number`): مدة السيناريو بالمللي ثانية
- `context` (`object`): كائن World في Cucumber

### beforeStep

يعمل قبل خطوة (Step) في Cucumber.

المعاملات:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): كائن خطوة Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): كائن سيناريو Cucumber
- `context` (`object`): كائن World في Cucumber

### afterStep

يعمل بعد خطوة (Step) في Cucumber.

المعاملات:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): كائن خطوة Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): كائن سيناريو Cucumber
- `result`: (`object`): كائن النتائج الذي يحتوي على نتائج الخطوة
- `result.passed` (`boolean`): true إذا نجح السيناريو
- `result.error` (`string`): مكدس الخطأ إذا فشل السيناريو
- `result.duration` (`number`): مدة السيناريو بالمللي ثانية
- `context` (`object`): كائن World في Cucumber

### beforeAssertion

خطاف يُنفَّذ قبل حدوث تأكيد (assertion) في WebdriverIO.

المعاملات:

- `params`: معلومات التأكيد
- `params.matcherName` (`string`): اسم المُطابِق (matcher) الذي استدعاه الاختبار (مثل `toHaveTitle`). بالنسبة للاسم المستعار، يكون اسم الاسم المستعار (مثل `toBeExisting`، وليس `toExist`).
- `params.expectedValue`: القيمة المُمرَّرة إلى المُطابِق
- `params.options`: خيارات التأكيد

### afterAssertion

خطاف يُنفَّذ بعد حدوث تأكيد (assertion) في WebdriverIO.

المعاملات:

- `params`: معلومات التأكيد
- `params.matcherName` (`string`): اسم المُطابِق (matcher) الذي استدعاه الاختبار (مثل `toHaveTitle`). بالنسبة للاسم المستعار، يكون اسم الاسم المستعار (مثل `toBeExisting`، وليس `toExist`).
- `params.expectedValue`: القيمة المُمرَّرة إلى المُطابِق
- `params.options`: خيارات التأكيد
- `params.result` (`object`): نتيجة المُطابِق، مع `pass` (`boolean`) و`message()`. تكون `pass` مساوية لـ `true` عندما تتطابق القيمة مع القيمة المتوقعة، حتى مع `.not`: فمع `.not`، ينجح التأكيد عندما تكون `pass` مساوية لـ `false`.