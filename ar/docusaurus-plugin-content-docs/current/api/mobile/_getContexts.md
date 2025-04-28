---
id: getContexts
title: الحصول على السياقات
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContexts.ts
---

طريقة WebdriverIO `getContexts` هي نسخة محسنة من أمر Appium الافتراضي `contexts`
(وأمر WebdriverIO السابق `getContexts`). توفر معلومات مفصلة وقابلة للتنفيذ
حول السياقات المتاحة في جلسة تطبيق جوال، مع معالجة قيود طرق Appium الافتراضية.

### كيف تعمل العروض الويب (Webviews) ولماذا تساعد هذه الطريقة
لمزيد من التفاصيل، راجع [وثائق التطبيقات الهجينة](/docs/api/mobile#hybrid-apps). فيما يلي ملخص للتحديات التي يعالجها أمر `getContexts`:

#### تحديات أندرويد
- قد يحتوي عرض ويب واحد (مثل `WEBVIEW_{packageName}`) على صفحات متعددة (مماثلة لعلامات تبويب المتصفح).
- لا تتضمن طرق Appium الافتراضية تفاصيل حول هذه الصفحات، مثل `title` أو `url` أو الرؤية،
  مما يجعل من الصعب تحديد الصفحة الصحيحة ويؤدي إلى احتمالية عدم الاستقرار.

#### تحديات iOS
- تُرجع طريقة Appium الافتراضية فقط معرفات عرض الويب العامة (مثل `WEBVIEW_{id}`) دون أي بيانات وصفية إضافية.
- هذا يجعل من الصعب تحديد أي عرض ويب يتوافق مع شاشة التطبيق المستهدفة.

تحل طريقة `getContexts` المحسّنة هذه المشكلات من خلال إرجاع كائنات سياق مفصلة، والتي تشمل:
- **لأندرويد:** `title` و`url` و`packageName` و`webviewPageId` وتفاصيل التخطيط (`screenX` و`screenY` و`width` و`height`).
- **لـ iOS:** `bundleId` و`title` و`url`.

هذه التحسينات تجعل تصحيح الأخطاء والتفاعل مع التطبيقات الهجينة أكثر موثوقية.

### لماذا تستخدم هذه الطريقة؟
بشكل افتراضي، ترجع طريقة Appium `contexts` فقط مصفوفة من السلاسل النصية التي تمثل السياقات المتاحة:
- **لأندرويد:** `['NATIVE_APP', 'WEBVIEW_com.wdiodemoapp', ...]`
- **لـ iOS:** `['NATIVE_APP', 'WEBVIEW_84392.1', ...]`

بينما تكون كافية للسيناريوهات البسيطة، فإن هذه الاستجابات الافتراضية تفتقر إلى بيانات وصفية حاسمة لاختبار التطبيقات الهجينة:
- **لأندرويد:** يجعل نقص البيانات الوصفية الخاصة بالصفحة من الصعب التفاعل مع عرض الويب الصحيح.
- **لـ iOS:** لا توفر معرفات عرض الويب العامة أي رؤية للمحتوى أو شاشة التطبيق التي تمثلها.

توفر طريقة `getContexts` المحسنة:
- بيانات وصفية مفصلة لكل من أندرويد و iOS.
- خيارات لتصفية وتخصيص السياقات المرجعة للاستهداف والتفاعل بشكل أفضل.

:::info ملاحظات وقيود

- طريقة `getContexts` المحسنة تعمل على منصتي أندرويد و iOS. ومع ذلك، قد تختلف البيانات المرجعة اعتمادًا على المنصة والتطبيق قيد الاختبار.
- إذا لم تحدد خيار `returnDetailedContexts`، فإن الطريقة تتصرف مثل طريقة Appium الافتراضية `contexts`، وترجع مصفوفة سياق بسيطة.
- لاستخدام طريقة Appium "الافتراضية" `contexts`، استخدم `driver.getAppiumContexts()`. لمزيد من المعلومات، انظر [وثائق Appium Contexts](/docs/api/appium#getappiumcontexts).

#### عروض الويب في أندرويد:
- البيانات الوصفية مثل `androidWebviewData` متوفرة فقط عندما يكون `returnAndroidDescriptionData` بقيمة `true`.
- استخدام طريقة `getContexts` على متصفح Chrome قد يُرجع في بعض الأحيان بيانات غير كاملة بسبب عدم تطابق إصدارات المتصفح/عرض الويب/ChromeDriver. في مثل هذه الحالات، قد يتم إرجاع قيم افتراضية أو `webviewPageId` غير صحيح (مثل `0`).

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
      <td>خيارات `getContexts` (اختياري)</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContexts</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`boolean`</td>
      <td>بشكل افتراضي، نعيد فقط أسماء السياق بناءً على واجهة برمجة تطبيقات Appium الافتراضية `contexts`. إذا كنت تريد الحصول على جميع البيانات، يمكنك تعيين هذا إلى `true`. الافتراضي هو `false` (اختياري).</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>الوقت بالميلي ثانية للانتظار بين كل محاولة إعادة للاتصال بعرض الويب. الافتراضي هو `500` مللي ثانية (اختياري). <br /><strong>أندرويد فقط</strong></td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>الحد الأقصى للوقت بالميلي ثانية للانتظار حتى يتم اكتشاف صفحة عرض ويب. الافتراضي هو `5000` مللي ثانية (اختياري). <br /><strong>أندرويد فقط</strong></td>
    </tr>
    <tr>
      <td><code><var>options.filterByCurrentAndroidApp</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`boolean`</td>
      <td>بشكل افتراضي، نعيد جميع عروض الويب. إذا كنت تريد تصفية عروض الويب حسب تطبيق أندرويد الحالي المفتوح، يمكنك تعيين هذا إلى `true`. الافتراضي هو `false` (اختياري). <br /><strong>ملاحظة:</strong> كن على علم بأنك قد لا تجد أي عرض ويب بناءً على هذا "القيد". <br /><strong>أندرويد فقط</strong></td>
    </tr>
    <tr>
      <td><code><var>options.isAndroidWebviewVisible</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`boolean`</td>
      <td>بشكل افتراضي، نعيد فقط عروض الويب المرفقة والمرئية. إذا كنت تريد الحصول على جميع عروض الويب، يمكنك تعيين هذا إلى `false` (اختياري). الافتراضي هو `true`. <br /><strong>أندرويد فقط</strong></td>
    </tr>
    <tr>
      <td><code><var>options.returnAndroidDescriptionData</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`boolean`</td>
      <td>بشكل افتراضي، لا توجد بيانات وصف لعرض ويب أندرويد (Chrome). إذا كنت تريد الحصول على جميع البيانات، يمكنك تعيين هذا إلى `true`. الافتراضي هو `false` (اختياري). <br />من خلال تمكين هذا الخيار ستحصل على بيانات إضافية في الاستجابة، راجع `description.data.test.js` لمزيد من المعلومات. <br /><strong>أندرويد فقط</strong></td>
    </tr>
  </tbody>
</table>

##### أمثلة

```js title="example.test.js"
it('should return all contexts in the current session with the default Appium `contexts`-method.', async () => {
    // For Android
    await driver.getContexts()
    // Returns ['NATIVE_APP', 'WEBVIEW_com.wdiodemoapp', ...]
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContexts()
    // Returns [ 'NATIVE_APP', 'WEBVIEW_84392.1', ... ]
})

```

```js title="detailed.test.js"
it('should return all contexts in the current session with detailed info.', async () => {
    // For Android
    await driver.getContexts({returnDetailedContexts: true})
    // Returns [
    //   { id: 'NATIVE_APP' },
    //   {
    //       id: 'WEBVIEW_com.wdiodemoapp',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       packageName: 'com.wdiodemoapp',
    //       webviewPageId: '58B0AA2DBBBBBE9008C35AE42385BB0D'
    //   },
    //   {
    //       id: 'WEBVIEW_chrome',
    //       title: 'Android | Get more done with Google on Android-phones and devices',
    //       url: 'https://www.android.com/',
    //       packageName: 'com.android.chrome',
    //       webviewPageId: '0'
    //   }
    // ]
    //
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.getContexts({returnDetailedContexts: true})
    // Returns: [
    //   { id: 'NATIVE_APP' },
    //   {
    //       id: 'WEBVIEW_86150.1',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       bundleId: 'org.reactjs.native.example.wdiodemoapp'
    //   },
    //   {
    //       id: 'WEBVIEW_86152.1',
    //       title: 'Apple',
    //       url: 'https://www.apple.com/',
    //       bundleId: 'com.apple.mobilesafari'
    //   }
    // ]
})

```

```js title="description.data.test.js"
it('should return Android description data for the webview', async () => {
    // For Android
    await driver.getContexts({returnDetailedContexts: true, returnAndroidDescriptionData: true})
    // Returns [
    //   { id: 'NATIVE_APP' },
    //   {
    //       androidWebviewData: {
    //          // Indicates whether the web page is currently attached to a web view.
    //          // `true` means the page is attached and likely active, `false` indicates it is not.
    //          attached: true,
    //          // Indicates whether the web page is empty or not. An empty page typically means that
    //          // there is no significant content loaded in it. `true` indicates the page is empty,
    //          // `false` indicates it has content.
    //          empty: false,
    //          // Indicates whether the page has never been attached to a web view. If `true`, the
    //          // page has never been attached, which could indicate a new or unused page. If `false`,
    //          // the page has been attached at some point.
    //          neverAttached: false,
    //          // Indicates whether the web page is visible on the screen. `true` means the page is
    //          // visible to the user, `false` means it is not.
    //          visible: true,
    //          // This data can be super useful to determine where on the screen the webview is located
    //          // and can come in handy when you want to interact with elements on the screen based on
    //          // coordinates based on the top-left corner of the screen
    //          screenX: 0,
    //          screenY: 151,
    //          height: 2589,
    //          width: 1344
    //       },
    //       id: 'WEBVIEW_com.wdiodemoapp',
    //       title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    //       url: 'https://webdriver.io/',
    //       packageName: 'com.wdiodemoapp',
    //       webviewPageId: '58B0AA2DBBBBBE9008C35AE42385BB0D'
    //   }
    // ]
})
```