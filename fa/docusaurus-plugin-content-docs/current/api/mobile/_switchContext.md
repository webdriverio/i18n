---
id: switchContext
title: تغییر زمینه
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/switchContext.ts
---

تغییر به یک زمینه خاص با استفاده از `name`، `title` یا `url` Webview مشخص.

این روش دستور پیش‌فرض `context` آپیوم را با ارائه انعطاف‌پذیری و دقت بیشتر برای جابجایی بین زمینه‌های بومی و وب‌ویو در برنامه‌های موبایل هیبریدی بهبود می‌بخشد.

### نحوه کارکرد زمینه‌ها
برای نمای کلی از برنامه‌های هیبریدی و وب‌ویوها، به [مستندات برنامه‌های هیبریدی](/docs/api/mobile#hybrid-apps) مراجعه کنید.
در زیر خلاصه‌ای از چگونگی پرداختن دستور `switchContext` به چالش‌های رایج آمده است:

#### چالش‌های اندروید
- وب‌ویوها اغلب شامل چندین صفحه (مشابه تب‌های مرورگر) هستند. شناسایی صفحه صحیح نیاز به متادیتای اضافی مانند `title` یا `url` دارد که توسط روش‌های پیش‌فرض آپیوم ارائه نمی‌شود.
- روش‌های پیش‌فرض آپیوم فقط نام‌های زمینه اصلی (مانند `WEBVIEW_{packageName}`) را بدون جزئیات در مورد محتوا یا صفحات درون وب‌ویو برمی‌گردانند.
- تغییر زمینه در اندروید شامل دو مرحله است که به صورت خودکار توسط این روش انجام می‌شود:
  1. تغییر به زمینه وب‌ویو با استفاده از `WEBVIEW_{packageName}`.
  2. انتخاب صفحه مناسب درون وب‌ویو با استفاده از روش `switchToWindow`.

#### چالش‌های iOS
- وب‌ویوها با شناسه‌های عمومی (مانند `WEBVIEW_{id}`) شناسایی می‌شوند که اطلاعاتی در مورد محتوا یا صفحه برنامه مربوطه ارائه نمی‌دهند.
- تعیین وب‌ویو صحیح برای تعامل اغلب نیاز به آزمون و خطا دارد.

روش `switchContext` این فرآیند را با بازیابی متادیتای دقیق (مانند `title`، `url` و قابلیت مشاهده) ساده می‌کند تا تغییر زمینه دقیق و قابل اعتماد تضمین شود.

### چرا از این روش استفاده کنیم؟
- **تغییر ساده‌شده**: اگر `title` یا `url` وب‌ویو مورد نظر را می‌دانید، این روش نیاز به فراخوانی‌های اضافی به `getContexts` یا ترکیب چندین روش مانند `switchContext({id})` و `getTitle()` را حذف می‌کند.
- **تطبیق خودکار زمینه**: بهترین تطابق برای یک زمینه را بر اساس موارد زیر پیدا می‌کند:
  - شناسه‌های مختص پلتفرم (`bundleId` برای iOS، `packageName` برای اندروید).
  - تطابق‌های دقیق یا جزئی برای `title` یا `url` (هم رشته‌ها و هم عبارات منظم را پشتیبانی می‌کند).
  - بررسی‌های مختص اندروید برای اطمینان از متصل و قابل مشاهده بودن وب‌ویوها.
- **کنترل دقیق**: فواصل تلاش مجدد و مهلت‌های سفارشی (فقط اندروید) به شما امکان می‌دهد تأخیر در راه‌اندازی وب‌ویو را مدیریت کنید.
- **دسترسی به روش پیش‌فرض آپیوم**: در صورت نیاز، می‌توانید از دستور پیش‌فرض آپیوم `switchContext` از طریق `driver.switchAppiumContext()` استفاده کنید.

:::info نکات و محدودیت‌ها

- اگر `title` یا `url` وب‌ویو مورد نظر شناخته شده باشد، این روش می‌تواند به طور خودکار زمینه منطبق را پیدا کند و بدون فراخوانی‌های اضافی `getContexts` به آن تغییر دهد.
- گزینه‌های مختص اندروید مانند `androidWebviewConnectionRetryTime` و `androidWebviewConnectTimeout` برای iOS قابل استفاده نیستند.
- دلایل شکست تطبیق زمینه را برای کمک به اشکال‌زدایی ثبت می‌کند.
- هنگام استفاده از یک شیء به عنوان ورودی، یا `title` یا `url` مورد نیاز است.

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
      <td><code><var>context</var></code></td>
      <td>`string, SwitchContextOptions`</td>
      <td>نام زمینه‌ای که باید به آن تغییر داده شود. یک شیء با گزینه‌های زمینه بیشتر می‌تواند ارائه شود.</td>
    </tr>
    <tr>
      <td><code><var>options</var></code></td>
      <td>`SwitchContextOptions`</td>
      <td>گزینه‌های دستور switchContext</td>
    </tr>
    <tr>
      <td><code><var>options.title</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`string, RegExp`</td>
      <td>عنوان صفحه‌ای که باید به آن تغییر داده شود. این محتوای تگ عنوان یک صفحه وب‌ویو خواهد بود. می‌توانید از یک رشته که باید کاملاً مطابقت داشته باشد یا یک عبارت منظم استفاده کنید.<br /><strong>مهم:</strong> هنگامی که از گزینه‌ها استفاده می‌کنید، یا خاصیت `title` یا `url` مورد نیاز است.</td>
    </tr>
    <tr>
      <td><code><var>options.url</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`string, RegExp`</td>
      <td>URL صفحه‌ای که باید به آن تغییر داده شود. این `url` یک صفحه وب‌ویو خواهد بود. می‌توانید از یک رشته که باید کاملاً مطابقت داشته باشد یا یک عبارت منظم استفاده کنید.<br /><strong>مهم:</strong> هنگامی که از گزینه‌ها استفاده می‌کنید، یا خاصیت `title` یا `url` مورد نیاز است.</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectionRetryTime</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>زمان به میلی‌ثانیه برای انتظار بین هر تلاش مجدد برای اتصال به وب‌ویو. پیش‌فرض `500` میلی‌ثانیه است (اختیاری). <br /><strong>فقط برای اندروید</strong> و فقط زمانی استفاده می‌شود که `title` یا `url` ارائه شده باشد.</td>
    </tr>
    <tr>
      <td><code><var>options.androidWebviewConnectTimeout</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`number`</td>
      <td>حداکثر مدت زمان به میلی‌ثانیه برای انتظار تشخیص صفحه وب‌ویو. پیش‌فرض `5000` میلی‌ثانیه است (اختیاری). <br /><strong>فقط برای اندروید</strong> و فقط زمانی استفاده می‌شود که `title` یا `url` ارائه شده باشد.</td>
    </tr>
  </tbody>
</table>

##### مثال‌ها

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