---
id: switchContext
title: switchContext
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/switchContext.ts
---

التبديل إلى سياق محدد باستخدام اسم عرض ويب (`name`) أو عنوان (`title`) أو رابط URL (`url`) معين.

تعزز هذه الطريقة أمر Appium الافتراضي `context` من خلال توفير مرونة ودقة أكبر
للتبديل بين السياقات الأصلية وسياقات عرض الويب في تطبيقات الجوال الهجينة.

### كيف تعمل السياقات
للحصول على نظرة عامة حول التطبيقات الهجينة وعروض الويب، راجع [وثائق التطبيقات الهجينة](/docs/api/mobile#hybrid-apps).
فيما يلي ملخص لكيفية معالجة أمر `switchContext` للتحديات الشائعة:

#### تحديات أندرويد
- غالبًا ما تحتوي عروض الويب على صفحات متعددة (مشابهة لعلامات تبويب المتصفح). يتطلب تحديد الصفحة الصحيحة بيانات وصفية إضافية
  مثل `title` أو `url`، وهو ما لا توفره طرق Appium الافتراضية.
- تُرجع طرق Appium الافتراضية أسماء سياق أساسية فقط (مثل `WEBVIEW_{packageName}`) دون تفاصيل حول
  المحتوى أو الصفحات داخل عرض الويب.
- يتضمن تبديل السياقات على أندرويد خطوتين، يتم التعامل معهما تلقائيًا بواسطة هذه الطريقة:
  1. التبديل إلى سياق عرض الويب باستخدام `WEBVIEW_{packageName}`.
  2. تحديد الصفحة المناسبة داخل عرض الويب باستخدام طريقة `switchToWindow`.

#### تحديات iOS
- يتم تحديد عروض الويب بواسطة معرفات عامة (مثل `WEBVIEW_{id}`)، والتي لا توفر معلومات حول المحتوى
  أو شاشة التطبيق التي تتوافق معها.
- غالبًا ما يتطلب تحديد عرض الويب الصحيح للتفاعل المحاولة والخطأ.

تبسط طريقة `switchContext` هذه العملية من خلال استرداد البيانات الوصفية المفصلة (مثل `title` و`url` والرؤية)
لضمان تبديل السياق بدقة وموثوقية.

### لماذا تستخدم هذه الطريقة؟
- **تبديل مبسط**: إذا كنت تعرف `title` أو `url` لعرض الويب المطلوب، تلغي هذه الطريقة الحاجة إلى
  استدعاءات إضافية لـ `getContexts` أو دمج طرق متعددة مثل `switchContext({id})` و `getTitle()`.
- **مطابقة السياق التلقائية**: تجد أفضل تطابق للسياق بناءً على:
  - معرفات خاصة بالمنصة (`bundleId` لـ iOS، `packageName` لـ Android).
  - تطابقات دقيقة أو جزئية لـ `title` أو `url` (يدعم كلاً من السلاسل النصية والتعبيرات العادية).
  - فحوصات خاصة بنظام Android للتأكد من أن عروض الويب مرفقة ومرئية.
- **تحكم دقيق**: تتيح فترات إعادة المحاولة المخصصة والمهل الزمنية (Android فقط) التعامل مع التأخيرات في تهيئة عرض الويب.
- **الوصول إلى طريقة Appium الافتراضية**: إذا لزم الأمر، يمكنك استخدام أمر Appium الافتراضي `switchContext` عبر `driver.switchAppiumContext()`.

:::info ملاحظات وقيود

- إذا كان `title` أو `url` لعرض الويب المطلوب معروفًا، يمكن لهذه الطريقة تحديد السياق المطابق والتبديل إليه تلقائيًا دون استدعاءات إضافية لـ `getContexts`.
- الخيارات الخاصة بنظام Android مثل `androidWebviewConnectionRetryTime` و `androidWebviewConnectTimeout` لا تنطبق على iOS.
- تسجل أسباب فشل مطابقة السياق للمساعدة في تصحيح الأخطاء.
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
      <td>اسم السياق المراد التبديل إليه. يمكن توفير كائن بخيارات سياق إضافية.</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`SwitchContextOptions`</td>
      <td>خيارات أمر switchContext</td>
    </tr>
    <tr>
      <td><code><var>options.title</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`string, RegExp`</td>
      <td>عنوان الصفحة المراد التبديل إليها. سيكون هذا محتوى علامة العنوان لصفحة عرض الويب. يمكنك استخدام سلسلة نصية تحتاج إلى تطابق كامل أو تعبير منتظم.<br /><strong>مهم:</strong> عند استخدام الخيارات، يكون إما خاصية `title` أو `url` مطلوبة.</td>
    </tr>
    <tr>
      <td><code><var>options.url</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`string, RegExp`</td>
      <td>رابط URL للصفحة المراد التبديل إليها. سيكون هذا `url` لصفحة عرض الويب. يمكنك استخدام سلسلة نصية تحتاج إلى تطابق كامل أو تعبير منتظم.<br /><strong>مهم:</strong> عند استخدام الخيارات، يكون إما خاصية `title` أو `url` مطلوبة.</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>الوقت بالميلي ثانية للانتظار بين كل محاولة إعادة الاتصال بعرض الويب. الافتراضي هو `500` ميلي ثانية (اختياري). <br /><strong>لنظام ANDROID فقط</strong> وسيتم استخدامه فقط عند توفير `title` أو `url`.</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>`number`</td>
      <td>الحد الأقصى للوقت بالميلي ثانية للانتظار حتى يتم اكتشاف صفحة عرض الويب. الافتراضي هو `5000` ميلي ثانية (اختياري). <br /><strong>لنظام ANDROID فقط</strong> وسيتم استخدامه فقط عند توفير `title` أو `url`.</td>
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