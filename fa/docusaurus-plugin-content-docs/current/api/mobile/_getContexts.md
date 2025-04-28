---
id: getContexts
title: دریافت زمینه‌ها
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/getContexts.ts
---

متد `getContexts` در WebdriverIO نسخه بهبود یافته‌ای از دستور پیش‌فرض Appium یعنی `contexts` (و دستور قبلی WebdriverIO به نام `getContexts`) است. این متد اطلاعات دقیق و قابل استفاده درباره زمینه‌های موجود در یک نشست اپلیکیشن موبایل ارائه می‌دهد و محدودیت‌های روش‌های پیش‌فرض Appium را برطرف می‌کند.

### نحوه کارکرد Webview‌ها و چرایی کمک این متد
برای جزئیات بیشتر، به [مستندات برنامه‌های هیبریدی](/docs/api/mobile#hybrid-apps) مراجعه کنید. در زیر خلاصه‌ای از چالش‌هایی که توسط دستور `getContexts` برطرف می‌شود آمده است:

#### چالش‌های اندروید
- یک webview واحد (مثلاً `WEBVIEW_{packageName}`) ممکن است شامل چندین صفحه (مشابه تب‌های مرورگر) باشد.
- روش‌های پیش‌فرض Appium شامل جزئیات این صفحات مانند `title`، `url` یا قابلیت مشاهده نیستند،
  که شناسایی صفحه درست را دشوار می‌کند و می‌تواند منجر به ناپایداری بالقوه شود.

#### چالش‌های iOS
- روش پیش‌فرض Appium فقط شناسه‌های عمومی webview (مثلاً `WEBVIEW_{id}`) را بدون هیچ متادیتای اضافی برمی‌گرداند.
- این امر تشخیص اینکه کدام webview مربوط به صفحه هدف برنامه است را دشوار می‌کند.

متد بهبود یافته `getContexts` این مشکلات را با برگرداندن اشیاء زمینه‌ای دقیق حل می‌کند که شامل:
- **برای اندروید:** `title`، `url`، `packageName`، `webviewPageId` و جزئیات طرح‌بندی (`screenX`، `screenY`، `width` و `height`).
- **برای iOS:** `bundleId`، `title` و `url`.

این بهبودها اشکال‌زدایی و تعامل با برنامه‌های هیبریدی را قابل اعتمادتر می‌کند.

### چرا از این متد استفاده کنیم؟
به طور پیش‌فرض، متد `contexts` در Appium فقط آرایه‌ای از رشته‌ها را که نشان‌دهنده زمینه‌های موجود است برمی‌گرداند:
- **برای اندروید:** `['NATIVE_APP', 'WEBVIEW_com.wdiodemoapp', ...]`
- **برای iOS:** `['NATIVE_APP', 'WEBVIEW_84392.1', ...]`

اگرچه برای سناریوهای ساده کافی است، این پاسخ‌های پیش‌فرض فاقد متادیتای حیاتی برای تست برنامه‌های هیبریدی هستند:
- **برای اندروید:** فقدان متادیتای خاص صفحه، تعامل با webview صحیح را چالش‌برانگیز می‌کند.
- **برای iOS:** شناسه‌های عمومی webview هیچ بینشی درباره محتوا یا صفحه برنامه‌ای که نمایش می‌دهند، ارائه نمی‌کنند.

متد بهبودیافته `getContexts` ارائه می‌کند:
- متادیتای دقیق برای هر دو پلتفرم اندروید و iOS.
- گزینه‌های فیلتر کردن و سفارشی‌سازی زمینه‌های برگردانده شده برای هدف‌گیری و تعامل بهتر.

:::info نکات و محدودیت‌ها

- متد بهبودیافته `getContexts` روی هر دو پلتفرم اندروید و iOS کار می‌کند. با این حال، داده‌های برگردانده شده ممکن است بسته به پلتفرم و برنامه تحت آزمایش متفاوت باشد.
- اگر گزینه `returnDetailedContexts` را مشخص نکنید، این متد مانند متد پیش‌فرض Appium یعنی `contexts` عمل می‌کند و آرایه زمینه ساده را برمی‌گرداند.
- برای استفاده از متد "پیش‌فرض" Appium یعنی `contexts`، از `driver.getAppiumContexts()` استفاده کنید. برای اطلاعات بیشتر، [مستندات Appium Contexts](/docs/api/appium#getappiumcontexts) را ببینید.

#### Webview‌های اندروید:
- متادیتا مانند `androidWebviewData` فقط زمانی در دسترس است که `returnAndroidDescriptionData` برابر با `true` باشد.
- استفاده از متد `getContexts` روی مرورگر Chrome ممکن است گاهی به دلیل عدم تطابق نسخه‌های مرورگر/Webview/ChromeDriver داده‌های ناقص برگرداند. در چنین مواردی، مقادیر پیش‌فرض یا یک `webviewPageId` نادرست (مثلاً `0`) ممکن است برگردانده شود.

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
      <td>گزینه‌های `getContexts` (اختیاری)</td>
    </tr>
    <tr>
      <td><code><var>options.returnDetailedContexts</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`boolean`</td>
      <td>به طور پیش‌فرض، ما فقط نام‌های زمینه را بر اساس API پیش‌فرض Appium یعنی `contexts` برمی‌گردانیم. اگر می‌خواهید تمام داده‌ها را دریافت کنید، می‌توانید این را `true` قرار دهید. مقدار پیش‌فرض `false` است (اختیاری).</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>زمان به میلی‌ثانیه برای انتظار بین هر تلاش مجدد برای اتصال به webview. مقدار پیش‌فرض `500` میلی‌ثانیه است (اختیاری). <br /><strong>فقط برای اندروید</strong></td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>حداکثر زمان به میلی‌ثانیه برای انتظار جهت تشخیص یک صفحه webview. مقدار پیش‌فرض `5000` میلی‌ثانیه است (اختیاری). <br /><strong>فقط برای اندروید</strong></td>
    </tr>
    <tr>
      <td><code><var>options.filterByCurrentAndroidApp</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`boolean`</td>
      <td>به طور پیش‌فرض، ما تمام webview‌ها را برمی‌گردانیم. اگر می‌خواهید webview‌ها را بر اساس برنامه اندروید فعلی که باز شده است فیلتر کنید، می‌توانید این را `true` قرار دهید. مقدار پیش‌فرض `false` است (اختیاری). <br /><strong>توجه:</strong> آگاه باشید که ممکن است بر اساس این "محدودیت" هیچ Webview پیدا نکنید. <br /><strong>فقط برای اندروید</strong></td>
    </tr>
    <tr>
      <td><code><var>options.isAndroidWebviewVisible</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`boolean`</td>
      <td>به طور پیش‌فرض، ما فقط webview‌هایی را برمی‌گردانیم که متصل و قابل مشاهده هستند. اگر می‌خواهید تمام webview‌ها را دریافت کنید، می‌توانید این را `false` قرار دهید (اختیاری). مقدار پیش‌فرض `true` است. <br /><strong>فقط برای اندروید</strong></td>
    </tr>
    <tr>
      <td><code><var>options.returnAndroidDescriptionData</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`boolean`</td>
      <td>به طور پیش‌فرض، هیچ داده توضیحی برای Webview اندروید (Chrome) وجود ندارد. اگر می‌خواهید تمام داده‌ها را دریافت کنید، می‌توانید این را `true` قرار دهید. مقدار پیش‌فرض `false` است (اختیاری). <br />با فعال کردن این گزینه، داده‌های اضافی در پاسخ دریافت خواهید کرد، برای اطلاعات بیشتر به `description.data.test.js` مراجعه کنید. <br /><strong>فقط برای اندروید</strong></td>
    </tr>
  </tbody>
</table>

##### مثال‌ها

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