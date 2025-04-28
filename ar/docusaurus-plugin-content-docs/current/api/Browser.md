---
id: browser
title: كائن المتصفح
---

__يمتد:__ [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

كائن المتصفح هو مثيل الجلسة الذي تستخدمه للتحكم في المتصفح أو الجهاز المحمول. إذا كنت تستخدم مشغل اختبار WDIO، يمكنك الوصول إلى مثيل WebDriver من خلال الكائن العالمي `browser` أو `driver` أو استيراده باستخدام [`@wdio/globals`](/docs/api/globals). إذا كنت تستخدم WebdriverIO في الوضع المستقل، يتم إرجاع كائن المتصفح بواسطة طريقة [`remote`](/docs/api/modules#remoteoptions-modifier).

يتم تهيئة الجلسة بواسطة مشغل الاختبار. وينطبق الشيء نفسه على إنهاء الجلسة. يتم ذلك أيضًا بواسطة عملية مشغل الاختبار.

## الخصائص

يحتوي كائن المتصفح على الخصائص التالية:

| الاسم | النوع | التفاصيل |
| ---- | ---- | ------- |
| `capabilities` | `Object` | الإمكانات المعينة من الخادم البعيد.<br /><b>مثال:</b><pre>\{<br />  acceptInsecureCerts: false,<br />  browserName: 'chrome',<br />  browserVersion: '105.0.5195.125',<br />  chrome: \{<br />    chromedriverVersion: '105.0.5195.52',<br />    userDataDir: '/var/folders/3_/pzc_f56j15vbd9z3r0j050sh0000gn/T/.com.google.Chrome.76HD3S'<br />  \},<br />  'goog:chromeOptions': \{ debuggerAddress: 'localhost:64679' \},<br />  networkConnectionEnabled: false,<br />  pageLoadStrategy: 'normal',<br />  platformName: 'mac os x',<br />  proxy: \{},<br />  setWindowRect: true,<br />  strictFileInteractability: false,<br />  timeouts: \{ implicit: 0, pageLoad: 300000, script: 30000 \},<br />  unhandledPromptBehavior: 'dismiss and notify',<br />  'webauthn:extension:credBlob': true,<br />  'webauthn:extension:largeBlob': true,<br />  'webauthn:virtualAuthenticators': true<br />\}</pre> |
| `requestedCapabilities` | `Object` | الإمكانات المطلوبة من الخادم البعيد.<br /><b>مثال:</b><pre>\{ browserName: 'chrome' \}</pre>
| `sessionId` | `String` | معرف الجلسة المعين من الخادم البعيد. |
| `options` | `Object` | خيارات WebdriverIO [options](/docs/configuration) تعتمد على كيفية إنشاء كائن المتصفح. انظر المزيد في [أنواع الإعداد](/docs/setuptypes). |
| `commandList` | `String[]` | قائمة بالأوامر المسجلة لمثيل المتصفح |
| `isW3C` | `Boolean` | يشير إلى ما إذا كانت هذه جلسة W3C |
| `isChrome` | `Boolean` | يشير إلى ما إذا كان هذا مثيل Chrome |
| `isFirefox` | `Boolean` | يشير إلى ما إذا كان هذا مثيل Firefox |
| `isBidi` | `Boolean` | يشير إلى ما إذا كانت هذه الجلسة تستخدم Bidi |
| `isSauce` | `Boolean` | يشير إلى ما إذا كانت هذه الجلسة تعمل على Sauce Labs |
| `isMacApp` | `Boolean` | يشير إلى ما إذا كانت هذه الجلسة تعمل لتطبيق Mac أصلي |
| `isWindowsApp` | `Boolean` | يشير إلى ما إذا كانت هذه الجلسة تعمل لتطبيق Windows أصلي |
| `isMobile` | `Boolean` | يشير إلى جلسة الجوال. انظر المزيد تحت [علامات الجوال](#mobile-flags). |
| `isIOS` | `Boolean` | يشير إلى جلسة iOS. انظر المزيد تحت [علامات الجوال](#mobile-flags). |
| `isAndroid` | `Boolean` | يشير إلى جلسة Android. انظر المزيد تحت [علامات الجوال](#mobile-flags). |
| `isNativeContext` | `Boolean`  | يشير إلى ما إذا كان الجوال في سياق `NATIVE_APP`. انظر المزيد تحت [علامات الجوال](#mobile-flags). |
| `mobileContext` | `string`  | سيوفر السياق **الحالي** الذي يوجد فيه برنامج التشغيل، على سبيل المثال `NATIVE_APP`، `WEBVIEW_<packageName>` لأندرويد أو `WEBVIEW_<pid>` لـ iOS. سيوفر WebDriver إضافي لـ `driver.getContext()`. انظر المزيد تحت [علامات الجوال](#mobile-flags). |


## الطرق

بناءً على خلفية الأتمتة المستخدمة لجلستك، يحدد WebdriverIO [أوامر البروتوكول](/docs/api/protocols) التي سيتم إرفاقها بـ [كائن المتصفح](/docs/api/browser). على سبيل المثال، إذا قمت بتشغيل جلسة آلية في Chrome، ستتمكن من الوصول إلى أوامر Chromium المحددة مثل [`elementHover`](/docs/api/chromium#elementhover) ولكن ليس أي من [أوامر Appium](/docs/api/appium).

علاوة على ذلك، يوفر WebdriverIO مجموعة من الطرق المريحة التي يوصى باستخدامها للتفاعل مع [المتصفح](/docs/api/browser) أو [العناصر](/docs/api/element) في الصفحة.

بالإضافة إلى ذلك، تتوفر الأوامر التالية:

| الاسم | المعلمات | التفاصيل |
| ---- | ---------- | ------- |
| `addCommand` | - `commandName` (النوع: `String`)<br />- `fn` (النوع: `Function`)<br />- `attachToElement` (النوع: `boolean`) | يسمح بتعريف أوامر مخصصة يمكن استدعاؤها من كائن المتصفح لأغراض التكوين. اقرأ المزيد في دليل [الأوامر المخصصة](/docs/customcommands). |
| `overwriteCommand` | - `commandName` (النوع: `String`)<br />- `fn` (النوع: `Function`)<br />- `attachToElement` (النوع: `boolean`) | يسمح بالكتابة فوق أي أمر متصفح بوظائف مخصصة. استخدمه بحذر لأنه قد يربك مستخدمي الإطار. اقرأ المزيد في دليل [الأوامر المخصصة](/docs/customcommands#overwriting-native-commands). |
| `addLocatorStrategy` | - `strategyName` (النوع: `String`)<br />- `fn` (النوع: `Function`) | يسمح بتعريف استراتيجية محدد مخصصة، اقرأ المزيد في دليل [المحددات](/docs/selectors#custom-selector-strategies). |

## ملاحظات

### علامات الجوال

إذا كنت بحاجة إلى تعديل اختبارك بناءً على ما إذا كانت جلستك تعمل على جهاز محمول أم لا، يمكنك الوصول إلى علامات الجوال للتحقق.

على سبيل المثال، بالنظر إلى هذا التكوين:

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
// ملاحظة: `driver` هو المكافئ للكائن `browser` ولكنه أكثر دقة من الناحية الدلالية
// يمكنك اختيار أي متغير عالمي تريد استخدامه
console.log(driver.isMobile) // المخرجات: true
console.log(driver.isIOS) // المخرجات: true
console.log(driver.isAndroid) // المخرجات: false
```

يمكن أن يكون هذا مفيدًا إذا كنت تريد، على سبيل المثال، تحديد المحددات في [كائنات الصفحة](../pageobjects) بناءً على نوع الجهاز، مثل هذا:

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
    // قم بتشغيل الاختبار فقط مع أجهزة Android
    if (driver.isAndroid) {
        it('tests something only for Android', () => {
            // ...
        })
    }
    // ...
})
```

### الأحداث
كائن المتصفح هو EventEmitter ويتم إصدار مجموعة من الأحداث لحالات الاستخدام الخاصة بك.

فيما يلي قائمة بالأحداث. ضع في اعتبارك أن هذه ليست القائمة الكاملة للأحداث المتاحة بعد.
لا تتردد في المساهمة لتحديث المستند بإضافة أوصاف لمزيد من الأحداث هنا.

#### `command`

يتم إصدار هذا الحدث كلما أرسل WebdriverIO أمر WebDriver الكلاسيكي. يحتوي على المعلومات التالية:

- `command`: اسم الأمر، مثل `navigateTo`
- `method`: طريقة HTTP المستخدمة لإرسال طلب الأمر، مثل `POST`
- `endpoint`: نقطة نهاية الأمر، مثل `/session/fc8dbda381a8bea36a225bd5fd0c069b/url`
- `body`: حمولة الأمر، مثل `{ url: 'https://webdriver.io' }`

#### `result`

يتم إصدار هذا الحدث كلما تلقى WebdriverIO نتيجة أمر WebDriver الكلاسيكي. يحتوي على نفس المعلومات الموجودة في حدث `command` بالإضافة إلى المعلومات التالية:

- `result`: نتيجة الأمر

#### `bidiCommand`

يتم إصدار هذا الحدث كلما أرسل WebdriverIO أمر WebDriver Bidi إلى برنامج تشغيل المتصفح. يحتوي على معلومات حول:

- `method`: طريقة أمر WebDriver Bidi
- `params`: معلمة الأمر المرتبطة (انظر [API](/docs/api/webdriverBidi))

#### `bidiResult`

في حالة نجاح تنفيذ الأمر، سيكون حمولة الحدث:

- `type`: `success`
- `id`: معرف الأمر
- `result`: نتيجة الأمر (انظر [API](/docs/api/webdriverBidi))

في حالة حدوث خطأ في الأمر، ستكون حمولة الحدث:

- `type`: `error`
- `id`: معرف الأمر
- `error`: رمز الخطأ، مثل `invalid argument`
- `message`: تفاصيل حول الخطأ
- `stacktrace`: تتبع المكدس

#### `request.start`
يتم إطلاق هذا الحدث قبل إرسال طلب WebDriver إلى برنامج التشغيل. يحتوي على معلومات حول الطلب وحمولته.

```ts
browser.on('request.start', (ev: RequestInit) => {
    // ...
})
```

#### `request.end`
يتم إطلاق هذا الحدث بمجرد تلقي الطلب المرسل إلى برنامج التشغيل استجابة. يحتوي كائن الحدث إما على نص الاستجابة كنتيجة أو خطأ إذا فشل أمر WebDriver.

```ts
browser.on('request.end', (ev: { result: unknown, error?: Error }) => {
    // ...
})
```

#### `request.retry`
يمكن أن يخطرك حدث إعادة المحاولة عندما يحاول WebdriverIO إعادة تشغيل الأمر، على سبيل المثال بسبب مشكلة في الشبكة. يحتوي على معلومات حول الخطأ الذي تسبب في إعادة المحاولة وعدد المحاولات التي تم إجراؤها بالفعل.

```ts
browser.on('request.retry', (ev: { error: Error, retryCount: number }) => {
    // ...
})
```

#### `request.performance`
هذا حدث لقياس عمليات مستوى WebDriver. كلما أرسل WebdriverIO طلبًا إلى خلفية WebDriver، سيتم إصدار هذا الحدث مع بعض المعلومات المفيدة:

- `durationMillisecond`: المدة الزمنية للطلب بالمللي ثانية.
- `error`: كائن الخطأ إذا فشل الطلب.
- `request`: كائن الطلب. يمكنك العثور على عنوان URL والطريقة والرؤوس وما إلى ذلك.
- `retryCount`: إذا كان `0`، فإن الطلب كان المحاولة الأولى. سيزداد عندما يعيد WebDriverIO المحاولة في الخلفية.
- `success`: قيمة منطقية لتمثيل نجاح الطلب أم لا. إذا كانت `false`، فسيتم توفير خاصية `error` أيضًا.

مثال على الحدث:
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

يمكنك تعيين أوامر مخصصة في نطاق المتصفح لتجريد سير العمل المستخدم بشكل شائع. تحقق من دليلنا حول [الأوامر المخصصة](/docs/customcommands#adding-custom-commands) للحصول على مزيد من المعلومات.