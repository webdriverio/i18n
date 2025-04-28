---
id: url
title: رابط
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/url.ts
---

أمر `url` يقوم بتحميل رابط URL في المتصفح. إذا تم تحديد رابط أساسي (baseUrl) في الإعدادات،
سيتم إضافته قبل معلمة الرابط باستخدام طريقة node's url.resolve(). استدعاء
`browser.url('...')` بنفس الرابط كالمرة السابقة سيؤدي إلى إعادة تحميل الصفحة. ومع ذلك،
إذا كان الرابط يحتوي على علامة التجزئة (#)، لن يؤدي المتصفح إلى تنقل جديد ويجب على المستخدم
أن [يقوم بالتحديث](/docs/api/webdriver#refresh) للصفحة لتنفيذ ذلك.

يعيد الأمر كائن `WebdriverIO.Request` الذي يحتوي على معلومات حول
بيانات الطلب والاستجابة لتحميل الصفحة:

```ts
interface WebdriverIO.Request {
  id?: string
  url: string
  timestamp: number
  navigation?: string
  redirectChain?: string[],
  headers: Record<string, string>
  cookies?: NetworkCookie[]
  \/**
   * Error message if request failed
   *\/
  error?: string
  response?: {
      fromCache: boolean
      headers: Record<string, string>
      mimeType: string
      status: number
  },
  /**
   * List of all requests that were made due to the main request.
   * Note: the list may be incomplete and does not contain request that were
   * made after the command has finished.
   *
   * The property will be undefined if the request is not a document request
   * that was initiated by the browser.
   *\/
  children?: Request[]
}
```

يدعم الأمر الخيارات التالية:

### wait
الحالة المطلوبة التي يجب أن يكون فيها المورد المطلوب قبل إنهاء الأمر.
يدعم الحالات التالية:

 - `none`: لا انتظار بعد إجراء طلب الصفحة واستلام الاستجابة
 - `interactive`: انتظار حتى تصبح الصفحة تفاعلية
 - `complete`: انتظار حتى يتم تحميل شجرة DOM للصفحة بالكامل
 - `networkIdle`: انتظار حتى لا تكون هناك طلبات شبكة معلقة

### headers

الترويسات التي سيتم إرسالها مع الطلب.

__القيمة الافتراضية:__ `{}`

### auth

بيانات اعتماد المصادقة الأساسية.
ملاحظة: هذا سيؤدي إلى استبدال ترويسة `Authorization` الموجودة إذا تم توفيرها في خيار `headers`.

### timeout

إذا تم تعيينه إلى رقم، سينتظر الأمر لعدد الميلي ثانية المحدد لتحميل الصفحة
لجميع الاستجابات قبل العودة.

ملاحظة: لكي يكون لهذا تأثير، يتطلب تعيين خيار `wait` إلى `networkIdle`.

__القيمة الافتراضية:__ `5000`

##### الاستخدام

```js
browser.url(url, { wait, timeout, onBeforeLoad, auth, headers })
```

##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`string`</td>
      <td>الرابط URL للانتقال إليه</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`UrlOptions`</td>
      <td>خيارات التنقل</td>
    </tr>
    <tr>
      <td><code><var>options.wait</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`'none', 'interactive', 'networkIdle', 'complete'`</td>
      <td>الحالة المطلوبة التي يجب أن يكون فيها المورد المطلوب قبل إنهاء الأمر. القيمة الافتراضية: 'complete'</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>إذا تم تعيينه إلى رقم، سينتظر الأمر لعدد الميلي ثانية المحدد لتحميل الصفحة لجميع الاستجابات قبل العودة. القيمة الافتراضية: 5000</td>
    </tr>
    <tr>
      <td><code><var>options.onBeforeLoad</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Function`</td>
      <td>دالة يتم استدعاؤها قبل أن تقوم صفحتك بتحميل جميع مواردها. يسمح لك بمحاكاة البيئة بسهولة، مثل تغيير واجهات برمجة الويب التي يستخدمها تطبيقك.</td>
    </tr>
    <tr>
      <td><code><var>options.auth</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`{user: string, pass: string}`</td>
      <td>بيانات اعتماد المصادقة الأساسية</td>
    </tr>
    <tr>
      <td><code><var>options.headers</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`Record<string, string>`</td>
      <td>الترويسات التي سيتم إرسالها مع الطلب</td>
    </tr>
  </tbody>
</table>

##### أمثلة

```js title="url.js"
// navigate to a new URL
const request = await browser.url('https://webdriver.io');
// log url
console.log(request.url); // outputs: "https://webdriver.io"
console.log(request.response?.status); // outputs: 200
console.log(request.response?.headers); // outputs: { 'content-type': 'text/html; charset=UTF-8' }

```

```js title="baseUrlResolutions.js"
// With a base URL of http://example.com/site, the following url parameters resolve as such:
// When providing a scheme:
// https://webdriver.io
await browser.url('https://webdriver.io');

// When not starting with a slash, the URL resolves relative to the baseUrl
// http://example.com/site/relative
await browser.url('relative');

// When starting with a slash, the URL resolves relative to the root path of the baseUrl
// http://example.com/rootRelative
await browser.url('/rootRelative');

```

```js title="basicAuth.js"
// navigate to a URL with basic authentication
await browser.url('https://the-internet.herokuapp.com/basic_auth', {
    auth: {
        user
        pass
    }
});
await expect($('p=Congratulations! You must have the proper credentials.').toBeDisplayed();

```

```js title="onBeforeLoad.js"
// navigate to a URL and mock the battery API
await browser.url('https://pazguille.github.io/demo-battery-api/', {
    onBeforeLoad (win) {
        // mock "navigator.battery" property
        // returning mock charge object
        win.navigator.getBattery = () => Promise.resolve({
            level: 0.5,
            charging: false,
            chargingTime: Infinity,
            dischargingTime: 3600, // seconds
        })
    }
})
// now we can assert actual text - we are charged at 50%
await expect($('.battery-percentage')).toHaveText('50%')
// and has enough juice for 1 hour
await expect($('.battery-remaining')).toHaveText('01:00)
```

##### العائد

- **&lt;WebdriverIO.Request&gt;**
            **<code><var>returns</var></code>:**  كائن طلب لتحميل الصفحة مع معلومات حول بيانات الطلب والاستجابة