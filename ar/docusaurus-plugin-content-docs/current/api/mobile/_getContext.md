---
id: getContext
title: الحصول على السياق
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContext.ts
---

استرجاع سياق الجلسة الحالية.

تعزز هذه الطريقة أمر Appium الافتراضي `context`/WebdriverIO `getContext` من خلال توفير خيار
لإرجاع معلومات سياق مفصلة، مما يجعل العمل مع التطبيقات الهجينة التي تستخدم عروض الويب أسهل.

### كيف تعمل السياقات
راجع [وثائق التطبيقات الهجينة](/docs/api/mobile#hybrid-apps) لمزيد من المعلومات. فيما يلي شرح للتحديات المرتبطة بأمر `getContext`:

#### بالنسبة لأندرويد:
- يمكن أن تحتوي عروض الويب على صفحات متعددة (مثل علامات تبويب المتصفح)، وتحديد الصفحة الصحيحة يتطلب بيانات وصفية إضافية
  مثل `title` أو `url`.
- توفر طرق Appium الافتراضية فقط أسماء سياق أساسية (مثل `WEBVIEW_{packageName}`) بدون معلومات مفصلة
  حول الصفحات داخل عرض الويب.

#### بالنسبة لنظام iOS:
- يتم تحديد كل عرض ويب بواسطة سلسلة عامة `WEBVIEW_{id}`، والتي لا تشير إلى محتوياتها أو شاشة التطبيق
  التي تنتمي إليها.

### لماذا تستخدم هذه الطريقة؟
- **السلوك الافتراضي**:
  - تُرجع السياق الحالي كسلسلة (مثل `NATIVE_APP` أو `WEBVIEW_{id}`).
- **السياق المفصل**:
  - عند تمكين `returnDetailedContext`، تسترجع البيانات الوصفية مثل:
    - **أندرويد**: `packageName` و `title` و `url` و `webviewPageId`.
    - **iOS**: `bundleId` و `title` و `url`.
- **خيارات خاصة بأندرويد**:
  - يمكن تخصيص فترات إعادة المحاولة والمهل الزمنية للتعامل مع التأخيرات في تهيئة عرض الويب.

:::info ملاحظات وقيود

- إذا لم يتم تمكين `returnDetailedContext`، فإن الطريقة تتصرف مثل طريقة Appium الافتراضية `getContext`.
- إذا كنت ترغب في استخدام طريقة Appium "الافتراضية" `context`، يمكنك استخدام طريقة `driver.getAppiumContext()`، انظر
أيضًا أمر [Appium Contexts](/docs/api/appium#getappiumcontext).
- **أندرويد:** الخيارات الخاصة بأندرويد (`androidWebviewConnectionRetryTime` و `androidWebviewConnectTimeout`) ليس لها تأثير على iOS.
- تسجل تحذيرات إذا تم العثور على سياقات مفصلة متعددة أو عدم وجودها:
  - `عثرنا على أكثر من سياق مفصل واحد للسياق الحالي '{context}'. سنقوم بإرجاع السياق الأول.`
  - `لم نحصل على أي سياق مفصل للسياق الحالي '{context}'. سنعيد السياق الحالي كسلسلة.`

:::

##### المعلمات

<table>
  <thead>
    <tr>
      <th>الاسم</th><th>النوع</th><th>التفاصيل</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`GetContextsOptions`</td>
      <td>خيارات `getContext` (اختياري)</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContext</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`boolean`</td>
      <td>بشكل افتراضي، نعيد فقط اسم السياق بناءً على واجهة برمجة التطبيقات الافتراضية لـ Appium `context`، وهي عبارة عن سلسلة فقط. إذا كنت ترغب في الحصول على معلومات سياق مفصلة، اضبط هذا على `true`. الافتراضي هو `false` (اختياري).</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>الوقت بالمللي ثانية للانتظار بين كل محاولة إعادة للاتصال بعرض الويب. الافتراضي هو `500` مللي ثانية (اختياري). <br /><strong>لنظام أندرويد فقط</strong></td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>الحد الأقصى للوقت بالمللي ثانية للانتظار حتى يتم اكتشاف صفحة عرض الويب. الافتراضي هو `5000` مللي ثانية (اختياري). <br /><strong>لنظام أندرويد فقط</strong></td>
    </tr>
  </tbody>
</table>

##### أمثلة

```js title="default.test.js"
it('should return the current context with the default Appium `context` method', async () => {
    // For Android
    await driver.getContext()
    // Returns 'WEBVIEW_com.wdiodemoapp' or 'NATIVE_APP'
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContext()
    // Returns 'WEBVIEW_94703.19' or 'NATIVE_APP'
})

```

```js title="detailed.test.js"
it('should return the context of the current session with more detailed information', async () => {
    // For Android
    await driver.getContext({ returnDetailedContext: true})
    // Returns or `NATIVE_APP`, or
    // {
    //   id: 'WEBVIEW_com.wdiodemoapp',
    //   title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //   url: 'https://webdriver.io/',
    //   packageName: 'com.wdiodemoapp',
    //   webviewPageId: '5C0425CF67E9B169245F48FF21172912'
    // }
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContext({ returnDetailedContext: true})
    // Returns or `NATIVE_APP`, or
    // {
    //   id: 'WEBVIEW_64981.1',
    //   title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //   url: 'https://webdriver.io/',
    //   bundleId: 'org.reactjs.native.example.wdiodemoapp'
    // }
})

```

```js title="customize.retry.test.js"
it('should be able to cusomize the retry intervals and timeouts to handle delayed webview initialization', async () => {
    // For Android
    await driver.getContext({
        returnDetailedContext: true,
        // NOTE: The following options are Android-specific
        // For Android we might need to wait a bit longer to connect to the webview, so we can provide some additional options
        androidWebviewConnectionRetryTime: 1*1000,  // Retry every 1 second
        androidWebviewConnectTimeout: 10*1000,      // Timeout after 10 seconds
    })
})
```