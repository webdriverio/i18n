---
id: getContext
title: دریافت زمینه
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContext.ts
---

دریافت زمینه (context) نشست فعلی.

این متد دستور پیش‌فرض Appium `context`/WebdriverIO `getContext` را با ارائه گزینه‌ای برای بازگرداندن اطلاعات زمینه دقیق‌تر بهبود می‌بخشد، که کار کردن با برنامه‌های هیبریدی که از webview استفاده می‌کنند را آسان‌تر می‌کند.

### نحوه کارکرد زمینه‌ها (Contexts)
به [مستندات برنامه‌های هیبریدی](/docs/api/mobile#hybrid-apps) برای اطلاعات بیشتر مراجعه کنید. در زیر توضیحاتی درباره چالش‌های مرتبط با دستور `getContext` آمده است:

#### برای اندروید:
- Webviewها می‌توانند شامل چندین صفحه (مانند تب‌های مرورگر) باشند و شناسایی صفحه صحیح نیاز به متادیتای اضافی 
  مانند `title` یا `url` دارد.
- روش‌های پیش‌فرض Appium فقط نام‌های زمینه اصلی (مثلاً `WEBVIEW_{packageName}`) را بدون اطلاعات دقیق
  درباره صفحات داخل webview ارائه می‌دهند.

#### برای iOS:
- هر webview با یک رشته عمومی `WEBVIEW_{id}` شناسایی می‌شود که محتوا یا صفحه برنامه‌ای که
  به آن تعلق دارد را نشان نمی‌دهد.

### چرا از این روش استفاده کنیم؟
- **رفتار پیش‌فرض**:
  - زمینه فعلی را به‌عنوان یک رشته برمی‌گرداند (مثلاً `NATIVE_APP` یا `WEBVIEW_{id}`).
- **زمینه دقیق**:
  - وقتی `returnDetailedContext` فعال است، متادیتا مانند موارد زیر را بازیابی می‌کند:
    - **اندروید**: `packageName`، `title`، `url` و `webviewPageId`.
    - **iOS**: `bundleId`، `title` و `url`.
- **گزینه‌های مخصوص اندروید**:
  - فواصل تلاش مجدد و زمان‌های انتظار را می‌توان برای مدیریت تأخیر در راه‌اندازی webview سفارشی کرد.

:::info نکات و محدودیت‌ها

- اگر `returnDetailedContext` فعال نباشد، این متد مانند متد پیش‌فرض Appium `getContext` عمل می‌کند.
- اگر می‌خواهید از متد "پیش‌فرض" Appium `context` استفاده کنید، می‌توانید از متد `driver.getAppiumContext()` استفاده کنید، همچنین
به دستور [Appium Contexts](/docs/api/appium#getappiumcontext) مراجعه کنید.
- **اندروید:** گزینه‌های مخصوص اندروید (`androidWebviewConnectionRetryTime` و `androidWebviewConnectTimeout`) تأثیری بر iOS ندارند.
- در صورت یافتن چندین یا هیچ زمینه دقیق، هشدارهایی را نمایش می‌دهد:
  - `ما بیش از ۱ زمینه دقیق برای زمینه فعلی '{context}' پیدا کردیم. زمینه اول را برمی‌گردانیم.`
  - `هیچ زمینه دقیقی برای زمینه فعلی '{context}' دریافت نکردیم. زمینه فعلی را به‌صورت یک رشته برمی‌گردانیم.`

:::

##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`GetContextsOptions`</td>
      <td>گزینه‌های `getContext` (اختیاری)</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContext</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`boolean`</td>
      <td>به‌طور پیش‌فرض، ما فقط نام زمینه را بر اساس API پیش‌فرض Appium `context` برمی‌گردانیم، که فقط یک رشته است. اگر می‌خواهید اطلاعات زمینه دقیق‌تر دریافت کنید، این را `true` تنظیم کنید. مقدار پیش‌فرض `false` است (اختیاری).</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>زمان به میلی‌ثانیه برای انتظار بین هر تلاش مجدد برای اتصال به webview. مقدار پیش‌فرض `500` میلی‌ثانیه است (اختیاری). <br /><strong>فقط-اندروید</strong></td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>حداکثر زمان به میلی‌ثانیه برای انتظار جهت تشخیص صفحه webview. مقدار پیش‌فرض `5000` میلی‌ثانیه است (اختیاری). <br /><strong>فقط-اندروید</strong></td>
    </tr>
  </tbody>
</table>

##### مثال‌ها

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