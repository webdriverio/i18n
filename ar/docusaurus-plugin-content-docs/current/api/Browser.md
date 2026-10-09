---
id: browser
title: كائن المتصفح
---

__يمتد من:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

كائن المتصفح هو نسخة الجلسة التي تستخدمها للتحكم في المتصفح أو الجهاز المحمول. إذا كنت تستخدم مشغل اختبار WDIO، يمكنك الوصول إلى نسخة WebDriver من خلال الكائن العام `browser` أو `driver` أو استيراده باستخدام [`@wdio/globals`](/docs/api/globals). إذا كنت تستخدم WebdriverIO في الوضع المستقل، فسيتم إرجاع كائن المتصفح بواسطة طريقة [`remote`](/docs/api/modules#remoteoptions-modifier).

تتم تهيئة الجلسة بواسطة مشغل الاختبار. وينطبق الأمر نفسه على إنهاء الجلسة، إذ تتم هذه العملية أيضًا بواسطة عملية مشغل الاختبار.

## الخصائص

يحتوي كائن المتصفح على الخصائص التالية:

| الاسم | النوع | التفاصيل |
| ---- | ---- | ------- |
| `capabilities` | `Object` | القدرات المخصصة من الخادم البعيد.<br /><b>مثال:</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | القدرات المطلوبة من الخادم البعيد.<br /><b>مثال:</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | معرّف الجلسة المخصص من الخادم البعيد. |
| `options` | `Object` | [خيارات](/docs/configuration) WebdriverIO بناءً على كيفية إنشاء كائن المتصفح. اطلع على المزيد حول [أنواع الإعداد](/docs/setuptypes). |
| `commandList` | `String[]` | قائمة بالأوامر المسجلة لنسخة المتصفح |
| `isChrome` | `Boolean` | يشير إلى ما إذا كانت هذه نسخة Chrome |
| `isFirefox` | `Boolean` | يشير إلى ما إذا كانت هذه نسخة Firefox |
| `isBidi` | `Boolean` | يشير إلى ما إذا كانت هذه الجلسة تستخدم Bidi |
| `isSauce` | `Boolean` | يشير إلى ما إذا كانت هذه الجلسة تعمل على Sauce Labs |
| `isMacApp` | `Boolean` | يشير إلى ما إذا كانت هذه الجلسة تعمل لتطبيق Mac أصلي |
| `isWindowsApp` | `Boolean` | يشير إلى ما إذا كانت هذه الجلسة تعمل لتطبيق Windows أصلي |
| `isMobile` | `Boolean` | يشير إلى جلسة على جهاز محمول. اطلع على المزيد في [علامات الأجهزة المحمولة](#mobile-flags). |
| `isIOS` | `Boolean` | يشير إلى جلسة iOS. اطلع على المزيد في [علامات الأجهزة المحمولة](#mobile-flags). |
| `isAndroid` | `Boolean` | يشير إلى جلسة Android. اطلع على المزيد في [علامات الأجهزة المحمولة](#mobile-flags). |
| `isNativeContext` | `Boolean`  | يشير إلى ما إذا كان الجهاز المحمول في سياق `NATIVE_APP`. اطلع على المزيد في [علامات الأجهزة المحمولة](#mobile-flags). |
| `mobileContext` | `string`  | يوفر السياق **الحالي** الذي يوجد فيه برنامج التشغيل، على سبيل المثال `NATIVE_APP`، أو `WEBVIEW_<packageName>` لنظام Android أو `WEBVIEW_<pid>` لنظام iOS. سيوفر عليك استدعاء WebDriver إضافيًا لـ `driver.getContext()`. اطلع على المزيد في [علامات الأجهزة المحمولة](#mobile-flags). |


## الطرق

بناءً على واجهة الأتمتة الخلفية المستخدمة لجلستك، يحدد WebdriverIO أي [أوامر البروتوكول](/docs/api/protocols) سيتم إرفاقها بـ [كائن المتصفح](/docs/api/browser). على سبيل المثال، إذا قمت بتشغيل جلسة آلية في Chrome، فستتمكن من الوصول إلى أوامر خاصة بـ Chromium مثل [`elementHover`](/docs/api/chromium#elementhover) ولكن ليس إلى أي من [أوامر Appium](/docs/api/appium).

علاوة على ذلك، يوفر WebdriverIO مجموعة من الطرق الملائمة التي يوصى باستخدامها للتفاعل مع [المتصفح](/docs/api/browser) أو [العناصر](/docs/api/element) الموجودة في الصفحة.

بالإضافة إلى ذلك، تتوفر الأوامر التالية:

| الاسم | المعلمات | التفاصيل |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (النوع: `String`)<br />- `fn` (النوع: `Function`)<br />- `attachToElement` (النوع: `boolean`) | يسمح بتعريف أوامر مخصصة يمكن استدعاؤها من كائن المتصفح لأغراض التركيب. اقرأ المزيد في دليل [الأوامر المخصصة](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (النوع: `String`)<br />- `fn` (النوع: `Function`)<br />- `attachToElement` (النوع: `boolean`) | يسمح بالكتابة فوق أي أمر من أوامر المتصفح بوظائف مخصصة. استخدمه بحذر لأنه قد يربك مستخدمي إطار العمل. اقرأ المزيد في دليل [الأوامر المخصصة](/docs/customcommands#overwriting-native-commands). |
| `addLocatorStrategy` | - `strategyName` (النوع: `String`)<br />- `fn` (النوع: `Function`) | يسمح بتعريف استراتيجية محدد مخصصة، اقرأ المزيد في دليل [المحددات](/docs/selectors#custom-selector-strategies). |

## ملاحظات

### علامات الأجهزة المحمولة

إذا كنت بحاجة إلى تعديل اختبارك بناءً على ما إذا كانت جلستك تعمل على جهاز محمول أم لا، فيمكنك الوصول إلى علامات الأجهزة المحمولة للتحقق من ذلك.

على سبيل المثال، بالنظر إلى هذا الإعداد:

```js
// wdio.conf.js
export const config = {
    // ...
    capabilities: \\{
        platformName: 'iOS',
        app: 'net.company.SafariLauncher',
        udid: '123123123123abc',
        deviceName: 'iPhone',
        // ...
    }
    // ...
}
```

يمكنك الوصول إلى هذه العلامات في اختبارك على النحو التالي:

```js
// ملاحظة: `driver` مكافئ لكائن `browser` لكنه أكثر صحة من الناحية الدلالية
// يمكنك اختيار المتغير العام الذي تريد استخدامه
console.log(driver.isMobile) // المخرجات: true
console.log(driver.isIOS) // المخرجات: true
console.log(driver.isAndroid) // المخرجات: false
```

قد يكون هذا مفيدًا إذا كنت تريد، على سبيل المثال، تعريف المحددات في [كائنات الصفحة](../pageobjects) الخاصة بك بناءً على نوع الجهاز، مثل هذا:

```js
// mypageobject.page.js
import Page from './page'

class LoginPage extends Page {
    // ...
    get username() {
        const selectorAndroid = 'new UiSelector().text("Cancel").className("android.widget.Button")'
        const selectorIOS = 'UIATarget.localTarget().frontMostApp().mainWindow().buttons()[0]'
        const selectorType = driver.isAndroid ? 'android' : 'ios'
        const selector = driver.isAndroid ? selectorAndroid : selectorIOS
        return $(`${selectorType}=${selector}`)
    }
    // ...
}
```

يمكنك أيضًا استخدام هذه العلامات لتشغيل اختبارات معينة فقط لأنواع معينة من الأجهزة:

```js
// mytest.e2e.js
describe('my test', () => {
    // ...
    // تشغيل الاختبار فقط مع أجهزة Android
    if (driver.isAndroid) {
        it('tests something only for Android', () => {
            // ...
        })
    }
    // ...
})
```

### الأحداث
كائن المتصفح هو EventEmitter، ويتم إطلاق عدد من الأحداث لحالات الاستخدام الخاصة بك.

فيما يلي قائمة بالأحداث. ضع في اعتبارك أن هذه ليست القائمة الكاملة للأحداث المتاحة بعد.
لا تتردد في المساهمة في تحديث المستند بإضافة أوصاف لمزيد من الأحداث هنا.

#### `command`

يتم إطلاق هذا الحدث كلما أرسل WebdriverIO أمرًا من أوامر WebDriver Classic. ويحتوي على المعلومات التالية:

- `command`: اسم الأمر، على سبيل المثال `navigateTo`
- `method`: طريقة HTTP المستخدمة لإرسال طلب الأمر، على سبيل المثال `POST`
- `endpoint`: نقطة نهاية الأمر، على سبيل المثال `/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body`: حمولة الأمر، على سبيل المثال `{ url: 'https://webdriver.io' }`

#### `result`

يتم إطلاق هذا الحدث كلما تلقى WebdriverIO نتيجة أمر من أوامر WebDriver Classic. ويحتوي على نفس المعلومات الموجودة في حدث `command` بالإضافة إلى المعلومات التالية:

- `result`: نتيجة الأمر

#### `bidiCommand`

يتم إطلاق هذا الحدث كلما أرسل WebdriverIO أمرًا من أوامر WebDriver Bidi إلى برنامج تشغيل المتصفح. ويحتوي على معلومات حول:

- `method`: طريقة أمر WebDriver Bidi
- `params`: معلمة الأمر المرتبطة (انظر [API](/docs/api/webdriverBidi))

#### `bidiResult`

في حالة التنفيذ الناجح للأمر، ستكون حمولة الحدث:

- `type`: `success`
- `id`: معرّف الأمر
- `result`: نتيجة الأمر (انظر [API](/docs/api/webdriverBidi))

في حالة حدوث خطأ في الأمر، ستكون حمولة الحدث:

- `type`: `error`
- `id`: معرّف الأمر
- `error`: رمز الخطأ، على سبيل المثال `invalid argument`
- `message`: تفاصيل حول الخطأ
- `stacktrace`: تتبع المكدس

#### `request.start`
يتم إطلاق هذا الحدث قبل إرسال طلب WebDriver إلى برنامج التشغيل. ويحتوي على معلومات حول الطلب وحمولته.

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
يتم إطلاق هذا الحدث بمجرد تلقي الطلب المرسل إلى برنامج التشغيل استجابةً. يحتوي كائن الحدث إما على نص الاستجابة كنتيجة أو على خطأ إذا فشل أمر WebDriver.

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
يمكن لحدث إعادة المحاولة إعلامك عندما يحاول WebdriverIO إعادة تشغيل الأمر، على سبيل المثال بسبب مشكلة في الشبكة. ويحتوي على معلومات حول الخطأ الذي تسبب في إعادة المحاولة وعدد المحاولات التي تمت بالفعل.

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
هذا حدث لقياس العمليات على مستوى WebDriver. كلما أرسل WebdriverIO طلبًا إلى الواجهة الخلفية لـ WebDriver، سيتم إطلاق هذا الحدث مع بعض المعلومات المفيدة:

- `durationMillisecond`: المدة الزمنية للطلب بالمللي ثانية.
- `error`: كائن الخطأ إذا فشل الطلب.
- `request`: كائن الطلب. يمكنك العثور على عنوان URL والطريقة والترويسات وغيرها.
- `retryCount`: إذا كانت القيمة `0`، فإن الطلب كان المحاولة الأولى. وستزداد القيمة عندما يعيد WebDriverIO المحاولة في الخلفية.
- `success`: قيمة منطقية تمثل ما إذا كان الطلب قد نجح أم لا. إذا كانت `false`، فسيتم توفير الخاصية `error` أيضًا.

مثال على حدث:
```js
Object {
  "durationMillisecond": 0.01770925521850586,
  "error": [Error: Timeout],
  "request": Object { ... },
  "retryCount": 0,
  "success": false,
},
```

### الأوامر المخصصة

يمكنك تعيين أوامر مخصصة على نطاق المتصفح لتجريد سير العمل الشائع الاستخدام. اطلع على دليلنا حول [الأوامر المخصصة](/docs/customcommands#adding-custom-commands) لمزيد من المعلومات.