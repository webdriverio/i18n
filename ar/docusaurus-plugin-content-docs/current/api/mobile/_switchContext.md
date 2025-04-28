---
id: switchContext
title: التبديل بين السياقات
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/switchContext.ts
---

التبديل إلى سياق محدد باستخدام `name` أو `title` أو `url` خاص بـ Webview.

تعزز هذه الطريقة من أمر `context` الافتراضي في Appium من خلال تقديم مرونة ودقة أكبر 
للتبديل بين السياقات الأصلية وسياقات webview في تطبيقات الهاتف المحمول الهجينة.

### كيف تعمل السياقات
للحصول على نظرة عامة على التطبيقات الهجينة و webviews، يرجى الرجوع إلى [وثائق التطبيقات الهجينة](/docs/api/mobile#hybrid-apps).
فيما يلي ملخص لكيفية معالجة أمر `switchContext` للتحديات الشائعة:

#### تحديات أندرويد
- غالبًا ما تحتوي Webviews على صفحات متعددة (مشابهة لعلامات تبويب المتصفح). يتطلب تحديد الصفحة الصحيحة بيانات وصفية إضافية
  مثل `title` أو `url`، والتي لا توفرها طرق Appium الافتراضية.
- تُرجع طرق Appium الافتراضية أسماء السياق الأساسية فقط (مثل `WEBVIEW_{packageName}`) دون تفاصيل حول
  المحتوى أو الصفحات داخل webview.
- يتضمن تبديل السياقات على Android خطوتين، يتم التعامل معهما تلقائيًا بواسطة هذه الطريقة:
  1. التبديل إلى سياق Webview باستخدام `WEBVIEW_{packageName}`.
  2. اختيار الصفحة المناسبة داخل Webview باستخدام طريقة `switchToWindow`.

#### تحديات iOS
- يتم تحديد Webviews بواسطة معرفات عامة (مثل `WEBVIEW_{id}`)، والتي لا توفر معلومات حول المحتوى
  أو شاشة التطبيق التي تتوافق معها.
- غالبًا ما يتطلب تحديد webview الصحيح للتفاعل المحاولة والخطأ.

تبسط طريقة `switchContext` هذه العملية عن طريق استرداد البيانات الوصفية التفصيلية (مثل `title` و`url` والرؤية)
لضمان تبديل السياق بدقة وموثوقية.

### لماذا تستخدم هذه الطريقة؟
- **تبديل مبسط**: إذا كنت تعرف `title` أو `url` لـ webview المطلوب، فإن هذه الطريقة تلغي الحاجة إلى
  مكالمات إضافية لـ `getContexts` أو دمج طرق متعددة مثل `switchContext({id})` و `getTitle()`.
- **مطابقة السياق التلقائية**: يجد أفضل تطابق للسياق بناءً على:
  - المعرفات الخاصة بالمنصة (`bundleId` لنظام iOS، `packageName` لنظام Android).
  - تطابق دقيق أو جزئي لـ `title` أو `url` (يدعم كل من السلاسل النصية والتعبيرات النمطية).
  - التحققات الخاصة بـ Android للتأكد من أن webviews متصلة ومرئية.
- **تحكم دقيق**: تتيح فترات إعادة المحاولة المخصصة والمهل الزمنية (Android فقط) التعامل مع تأخيرات في تهيئة webview.
- **الوصول إلى طريقة Appium الافتراضية**: إذا لزم الأمر، يمكنك استخدام أمر Appium الافتراضي `switchContext` عبر `driver.switchAppiumContext()`.

:::info ملاحظات وقيود

- إذا كان `title` أو `url` الخاص بـ webview المطلوب معروفًا، فيمكن لهذه الطريقة تحديد السياق المطابق والتبديل إليه تلقائيًا دون مكالمات إضافية لـ `getContexts`.
- الخيارات الخاصة بـ Android مثل `androidWebviewConnectionRetryTime` و `androidWebviewConnectTimeout` لا تنطبق على iOS.
- تسجل أسباب فشل مطابقة السياق للمساعدة في التصحيح.
- عند استخدام كائن كمدخل، يكون إما `title` أو `url` مطلوبًا.

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
      <td><code><var>context</var></code></td>
      <td>`string, SwitchContextOptions`</td>
      <td>اسم السياق للتبديل إليه. يمكن توفير كائن بخيارات سياق أكثر.</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`SwitchContextOptions`</td>
      <td>خيارات أمر switchContext</td>
    </tr>
    <tr>
      <td><code><var>options.title</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`string, RegExp`</td>
      <td>عنوان الصفحة المراد التبديل إليها. سيكون هذا محتوى علامة العنوان لصفحة webview. يمكنك استخدام سلسلة نصية تحتاج إلى تطابق كامل أو تعبير منتظم.<br /><strong>مهم:</strong> عند استخدام الخيارات، فإما خاصية `title` أو `url` مطلوبة.</td>
    </tr>
    <tr>
      <td><code><var>options.url</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`string, RegExp`</td>
      <td>عنوان URL للصفحة المراد التبديل إليها. سيكون هذا `url` لصفحة webview. يمكنك استخدام سلسلة نصية تحتاج إلى تطابق كامل أو تعبير منتظم.<br /><strong>مهم:</strong> عند استخدام الخيارات، فإما خاصية `title` أو `url` مطلوبة.</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>الوقت بالمللي ثانية للانتظار بين كل محاولة للاتصال بـ webview. الافتراضي هو `500` مللي ثانية (اختياري). <br /><strong>Android فقط</strong> وسيتم استخدامه فقط عند توفير `title` أو `url`.</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>الحد الأقصى للوقت بالمللي ثانية للانتظار حتى يتم اكتشاف صفحة web view. الافتراضي هو `5000` مللي ثانية (اختياري). <br /><strong>Android فقط</strong> وسيتم استخدامه فقط عند توفير `title` أو `url`.</td>
    </tr>
  </tbody>
</table>

##### أمثلة

```js title="example.test.js"
it('should switch to a webview by name and uses the default Appium `context`-method', async () => {
    // For Android, the context will be '`WEBVIEW_{packageName}`'
    await driver.switchContext('WEBVIEW_com.wdiodemoapp')
    // For iOS, the context will be 'WEBVIEW_{number}'
    await driver.switchContext('WEBVIEW_94703.19')
})

```

```js title="exact.title.test.js"
it('should switch to a webview and match a webview based on an EXACT match of the `title` of the webview', async () => {
    await driver.switchContext({
        // In this case the title needs to be an exact match
        title: 'Webview Title',
    })
})

```

```js title="exact.url.test.js"
it('should switch to a webview and match a webview based on an EXACT match of the `title` of the webview', async () => {
    await driver.switchContext({
        // In this case the url needs to be an exact match
        url: 'https://webdriver.io',
    })
})

```

```js title="regex.title.url.test.js"
it('should switch to a webview and match a webview based on regex match of the `title` and `url` of the webview', async () => {
    await driver.switchContext({
        // The title should NOT end with 'foo'
        title: /^(?!.*foo$)/,
        // Matches any string that contains the substring `docs/api/mobile/switchContext`
        url: /.*docs\/api\/mobile\/switchContext/,
    })
})

```

```js title="android.context.waits.test.js"
it('should switch to a webview for Android but wait longer to connect and find a webview based on provided options', async () => {
    await driver.switchContext({
        // In this case the title need to be an exact match
        title: 'Webview Title',
        // For Android we might need to wait a bit longer to connect to the webview, so we can provide some additional options
        androidWebviewConnectionRetryTime: 1*1000,  // Retry every 1 second
        androidWebviewConnectTimeout: 10*1000,      // Timeout after 10 seconds
    })
})
```