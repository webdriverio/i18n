---
id: chromium
title: کرومیوم
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/chromium.ts
---

## isAlertOpen
آیا یک دیالوگ ساده در حال حاضر باز است.<br /><br />دستور غیر رسمی و مستند نشده کرومیوم. اطلاعات بیشتر در مورد این دستور را می‌توانید [اینجا](https://github.com/bayandin/chromedriver/blob/v2.45/alert_commands.cc#L42-L49) پیدا کنید.

##### استفاده

```js
browser.isAlertOpen()
```

##### مثال


```js
console.log(browser.isAlertOpen()); // outputs: false
browser.execute('window.alert()');
console.log(browser.isAlertOpen()); // outputs: true
```


##### مقادیر بازگشتی

- **&lt;Boolean&gt;**
            **<code><var>isAlertOpen</var></code>:** `true` یا `false` بر اساس اینکه آیا دیالوگ ساده نمایش داده می‌شود یا خیر.


---

## isAutoReporting
آیا به صورت خودکار در لاگ‌های مرورگر خطا ایجاد می‌کند.<br /><br />دستور غیر رسمی و مستند نشده کرومیوم. اطلاعات بیشتر در مورد این دستور را می‌توانید [اینجا](https://codereview.chromium.org/101203012) پیدا کنید.

##### استفاده

```js
browser.isAutoReporting()
```


##### مقادیر بازگشتی

- **&lt;Boolean&gt;**
            **<code><var>isAutoReporting</var></code>:** `true` یا `false` بر اساس اینکه آیا گزارش‌دهی خودکار فعال است.


---

## setAutoReporting
تغییر وضعیت بازگرداندن پاسخ با خطای ناشناخته برای اولین خطای مرورگر (به عنوان مثال، عدم موفقیت در بارگذاری منبع به دلیل پاسخ 403/404) برای تمام دستورات بعدی (پس از فعال‌سازی).<br /><br />دستور غیر رسمی و مستند نشده کرومیوم. اطلاعات بیشتر در مورد این دستور را می‌توانید [اینجا](https://codereview.chromium.org/101203012) پیدا کنید.

##### استفاده

```js
browser.setAutoReporting(enabled)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>enabled</var></code></td>
      <td>boolean</td>
      <td>`true` اگر گزارش‌دهی خودکار باید فعال شود، از `false` برای غیرفعال کردن گزارش‌دهی خودکار فعال شده قبلی استفاده کنید.</td>
    </tr>
  </tbody>
</table>

##### مثال‌ها


```js
// Enable auto reporting first thing after session was initiated with empty browser logs
console.log(browser.setAutoReporting(true)); // outputs: null
// Upon requesting an non-existing resource it will abort execution due to thrown unknown error
browser.url('https://webdriver.io/img/404-does-not-exist.png');
```


```js
// During the session do some operations which populate the browser logs
browser.url('https://webdriver.io/img/404-does-not-exist.png');
browser.url('https://webdriver.io/403/no-access');
// Enable auto reporting which throws an unknown error for first browser log (404 response)
browser.setAutoReporting(true);
```


##### مقادیر بازگشتی

- **&lt;Object|Null&gt;**
            **<code><var>firstBrowserError</var></code>:** در صورتی که خطای مرورگر قبل از اجرای این دستور رخ داده باشد، یک خطای ناشناخته به عنوان پاسخ ارسال می‌شود که یک شیء با کلید 'message' است که اولین خطای مرورگر را توصیف می‌کند. در غیر این صورت، در صورت موفقیت‌آمیز بودن، `null` را برمی‌گرداند.


---

## isLoading
وضعیت بارگذاری پنجره فعال را تعیین می‌کند.<br /><br />دستور غیر رسمی و مستند نشده کرومیوم. اطلاعات بیشتر در مورد این دستور را می‌توانید [اینجا](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L783-L802) پیدا کنید.

##### استفاده

```js
browser.isLoading()
```

##### مثال


```js
console.log(browser.isLoading()); // outputs: false
browser.newWindow('https://webdriver.io');
console.log(browser.isLoading()); // outputs: true
```


##### مقادیر بازگشتی

- **&lt;Boolean&gt;**
            **<code><var>isLoading</var></code>:** `true` یا `false` بر اساس اینکه آیا پنجره فعال در حال بارگذاری است یا خیر.


---

## takeHeapSnapshot
از وضعیت فعلی حافظه در زمینه اجرای فعلی یک تصویر لحظه‌ای می‌گیرد.<br /><br />دستور غیر رسمی و مستند نشده کرومیوم. اطلاعات بیشتر در مورد این دستور را می‌توانید [اینجا](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/web_view.h#L198-L202) پیدا کنید.

##### استفاده

```js
browser.takeHeapSnapshot()
```


##### مقادیر بازگشتی

- **&lt;Object&gt;**
            **<code><var>heapSnapshot</var></code>:** یک نمایش JSON از تصویر لحظه‌ای حافظه. می‌توانید آن را با بارگذاری به عنوان فایل در Chrome DevTools بررسی کنید.


---

## getNetworkConnection
نوع اتصال را برای شبیه‌سازی شبکه دریافت می‌کند. این دستور فقط زمانی قابل استفاده است که انتهای کنترل از راه دور با قابلیت `networkConnectionEnabled` تنظیم شده به `true` پاسخ دهد.<br /><br />دستور غیر رسمی و مستند نشده کرومیوم. اطلاعات بیشتر در مورد این دستور را می‌توانید [اینجا](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes) پیدا کنید.

##### استفاده

```js
browser.getNetworkConnection()
```

##### مثال


```js
const browser = remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            // Network emulation requires device mode, which is only enabled when mobile emulation is on
            mobileEmulation: { deviceName: 'iPad' },
        },
    }
});
console.log(browser.getNetworkConnection()); // outputs: 6 (Both Wi-Fi and data)
```


##### مقادیر بازگشتی

- **&lt;Number&gt;**
            **<code><var>connectionType</var></code>:** یک ماسک بیتی برای نمایش نوع اتصال شبکه. حالت پرواز (`1`)، فقط Wi-Fi (`2`)، Wi-Fi و داده (`6`)، 4G (`8`)، 3G (`10`)، 2G (`20`). به صورت پیش‌فرض [Wi-Fi و داده فعال هستند](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/chrome_desktop_impl.cc#L36-L37).


---

## setNetworkConnection
تغییر نوع اتصال برای اتصال شبکه. این دستور فقط زمانی قابل استفاده است که انتهای کنترل از راه دور با قابلیت `networkConnectionEnabled` تنظیم شده به `true` پاسخ دهد.<br /><br />دستور غیر رسمی و مستند نشده کرومیوم. اطلاعات بیشتر در مورد این دستور را می‌توانید [اینجا](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes) پیدا کنید.

##### استفاده

```js
browser.setNetworkConnection(parameters)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>parameters</var></code></td>
      <td>object</td>
      <td>شیء حاوی ConnectionType، ماسک بیتی را به عنوان مقدار برای کلید `type` در شیء قرار دهید. حالت پرواز (`1`)، فقط Wi-Fi (`2`)، Wi-Fi و داده (`6`)، 4G (`8`)، 3G (`10`)، 2G (`20`).</td>
    </tr>
  </tbody>
</table>

##### مثال


```js
const browser = remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            // Network emulation requires device mode, which is only enabled when mobile emulation is on
            mobileEmulation: { deviceName: 'iPad' },
        },
    }
});
console.log(browser.setNetworkConnection({ type: 1 })); // outputs: 1 (Airplane Mode)
```


##### مقادیر بازگشتی

- **&lt;Number&gt;**
            **<code><var>connectionType</var></code>:** یک ماسک بیتی برای نمایش نوع اتصال شبکه. مقدار باید با `type` مشخص شده در شیء مطابقت داشته باشد، اما ممکن است دستگاه قادر به نوع اتصال شبکه درخواست شده نباشد.


---

## getNetworkConditions
شرایط فعلی شبکه مورد استفاده برای شبیه‌سازی را دریافت می‌کند.<br /><br />دستور غیر رسمی و مستند نشده کرومیوم. اطلاعات بیشتر در مورد این دستور را می‌توانید [اینجا](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L839-L859) پیدا کنید.

##### استفاده

```js
browser.getNetworkConditions()
```


##### مقادیر بازگشتی

- **&lt;Object&gt;**
            **<code><var>networkConditions</var></code>:** شیء حاوی شرایط شبکه برای `offline`، `latency`، `download_throughput` و `upload_throughput`. شرایط شبکه باید قبل از بازیابی تنظیم شود.


---

## setNetworkConditions
تنظیم شرایط شبکه مورد استفاده برای شبیه‌سازی با محدود کردن اتصال.<br /><br />دستور غیر رسمی و مستند نشده کرومیوم. اطلاعات بیشتر در مورد این دستور را می‌توانید [اینجا](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1663-L1722) پیدا کنید.

##### استفاده

```js
browser.setNetworkConditions(network_conditions, network_name)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>network_conditions</var></code></td>
      <td>object</td>
      <td>شیء حاوی شرایط شبکه که شامل `latency`، `throughput` (یا `download_throughput`/`upload_throughput`) و `offline` (اختیاری) است.</td>
    </tr>
    <tr>
      <td><code><var>network_name</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>نام [پیش‌تنظیم محدودیت شبکه](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/network_list.cc#L12-L25). `GPRS`، `Regular 2G`، `Good 2G`، `Regular 3G`، `Good 3G`، `Regular 4G`، `DSL`، `WiFi` یا `No throttling` برای غیرفعال کردن. وقتی پیش‌تنظیم مشخص شده است، مقادیر ارسال شده در آرگومان اول در نظر گرفته نمی‌شوند.</td>
    </tr>
  </tbody>
</table>

##### مثال‌ها


```js
// Use different download (25kb/s) and upload (50kb/s) throughput values for throttling with a latency of 1000ms
browser.setNetworkConditions({ latency: 1000, download_throughput: 25600, upload_throughput: 51200 });
```


```js
// Force disconnected from network by setting 'offline' to true
browser.setNetworkConditions({ latency: 0, throughput: 0, offline: true });
```


```js
// When preset name (e.g. 'DSL') is specified it does not respect values in object (e.g. 'offline')
browser.setNetworkConditions({ latency: 0, throughput: 0, offline: true }, 'DSL');
```


```js
// Best practice for specifying network throttling preset is to use an empty object
browser.setNetworkConditions({}, 'Good 3G');
```



---

## deleteNetworkConditions
هر محدودیت شبکه‌ای که ممکن است تنظیم شده باشد را غیرفعال می‌کند. معادل تنظیم پیش‌تنظیم `No throttling`.<br /><br />دستور غیر رسمی و مستند نشده کرومیوم. اطلاعات بیشتر در مورد این دستور را می‌توانید [اینجا](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1724-L1745) پیدا کنید.

##### استفاده

```js
browser.deleteNetworkConditions()
```



---

## sendCommand
ارسال یک دستور به دیباگر DevTools.<br />برای لیستی از دستورات موجود و پارامترهای آنها به [Chrome DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/) مراجعه کنید.<br /><br />دستور غیر رسمی و مستند نشده کرومیوم. اطلاعات بیشتر در مورد این دستور را می‌توانید [اینجا](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1290-L1304) پیدا کنید.

##### استفاده

```js
browser.sendCommand(cmd, params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>cmd</var></code></td>
      <td>string</td>
      <td>نام دستور (مانند [`Browser.close`](https://chromedevtools.github.io/devtools-protocol/1-3/Browser#method-close)).</td>
    </tr>
    <tr>
      <td><code><var>params</var></code></td>
      <td>object</td>
      <td>پارامترهای دستور. در صورتی که دستور نیازی به پارامتر ندارد، یک شیء خالی مشخص کنید.</td>
    </tr>
  </tbody>
</table>



---

## sendCommandAndGetResult
ارسال یک دستور به دیباگر DevTools و منتظر ماندن برای نتیجه.<br />برای لیستی از دستورات موجود و پارامترهای آنها به [Chrome DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/) مراجعه کنید.<br /><br />دستور غیر رسمی و مستند نشده کرومیوم. اطلاعات بیشتر در مورد این دستور را می‌توانید [اینجا](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1306-L1320) پیدا کنید.

##### استفاده

```js
browser.sendCommandAndGetResult(cmd, params)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>cmd</var></code></td>
      <td>string</td>
      <td>نام دستوری که یک نتیجه را برمی‌گرداند (مانند [`Network.getAllCookies`](https://chromedevtools.github.io/devtools-protocol/1-3/Network#method-getAllCookies)).</td>
    </tr>
    <tr>
      <td><code><var>params</var></code></td>
      <td>object</td>
      <td>پارامترهای دستور. در صورتی که دستور نیازی به پارامتر ندارد، یک شیء خالی مشخص کنید.</td>
    </tr>
  </tbody>
</table>


##### مقادیر بازگشتی

- **&lt;*&gt;**
            **<code><var>result</var></code>:** مقدار بازگشتی دستور شما یا خطایی که دلیل شکست دستور شما بود.


---

## file
آپلود یک فایل به دستگاه راه دور که مرورگر روی آن در حال اجراست.<br /><br />دستور غیر رسمی و مستند نشده کرومیوم. اطلاعات بیشتر در مورد این دستور را می‌توانید [اینجا](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L1037-L1065) پیدا کنید.

##### استفاده

```js
browser.file(file)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>file</var></code></td>
      <td>string</td>
      <td>آرشیو zip با کدگذاری base64 که حاوی __یک__ فایل برای آپلود است. در صورتی که داده‌های کدگذاری شده با base64 یک آرشیو zip نباشد یا آرشیو حاوی بیش از یک فایل باشد، یک خطای ناشناخته ایجاد می‌شود.</td>
    </tr>
  </tbody>
</table>


##### مقادیر بازگشتی

- **&lt;String&gt;**
            **<code><var>path</var></code>:** مسیر مطلق فایل آپلود شده روی دستگاه راه دور.


---

## launchChromeApp
یک برنامه Chrome را با شناسه مشخص شده اجرا می‌کند.<br /><br />دستور غیر رسمی و مستند نشده کرومیوم. اطلاعات بیشتر در مورد این دستور را می‌توانید [اینجا](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L521-L539) پیدا کنید.

##### استفاده

```js
browser.launchChromeApp(id)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>id</var></code></td>
      <td>string</td>
      <td>شناسه افزونه برنامه که باید اجرا شود، همانطور که در chrome://extensions تعریف شده است.</td>
    </tr>
  </tbody>
</table>

##### مثال


```js
import fs from 'fs'
const browser = remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            // Install upon starting browser in order to launch it
            extensions: [
              // Entry should be a base64-encoded packed Chrome app (.crx)
              fs.readFileSync('/absolute/path/app.crx').toString('base64')
            ]
        }
    }
});
browser.launchChromeApp('aohghmighlieiainnegkcijnfilokake')); // Google Docs (https://chrome.google.com/webstore/detail/docs/aohghmighlieiainnegkcijnfilokake)
```



---

## getElementValue
مقدار یک عنصر کنترل فرم مشخص را بازیابی می‌کند.<br /><br />دستور غیر رسمی و مستند نشده کرومیوم. اطلاعات بیشتر در مورد این دستور را می‌توانید [اینجا](https://github.com/bayandin/chromedriver/blob/v2.45/element_commands.cc#L431-L443) پیدا کنید.

##### استفاده

```js
browser.getElementValue(elementId)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>شناسه عنصری که می‌خواهید مقدار آن را دریافت کنید</td>
    </tr>
  </tbody>
</table>


##### مقادیر بازگشتی

- **&lt;String|Null&gt;**
            **<code><var>value</var></code>:** مقدار فعلی عنصر. در صورتی که عنصر مشخص شده یک عنصر کنترل فرم نباشد، `null` را برمی‌گرداند.


---

## elementHover
فعال کردن حالت hover برای یک عنصر، که در تعامل بعدی ریست می‌شود.<br /><br />دستور غیر رسمی و مستند نشده کرومیوم. اطلاعات بیشتر در مورد این دستور را می‌توانید [اینجا](https://github.com/bayandin/chromedriver/blob/v2.45/element_commands.cc#L126-L146) پیدا کنید.

##### استفاده

```js
browser.elementHover(elementId)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>شناسه عنصری که می‌خواهید روی آن hover کنید</td>
    </tr>
  </tbody>
</table>



---

## touchPinch
فعال کردن یک اثر زوم پینچ.<br /><br />دستور غیر رسمی و مستند نشده کرومیوم. اطلاعات بیشتر در مورد این دستور را می‌توانید [اینجا](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L813-L827) پیدا کنید.

##### استفاده

```js
browser.touchPinch(x, y, scale)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>موقعیت x برای pinch</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>موقعیت y برای pinch</td>
    </tr>
    <tr>
      <td><code><var>scale</var></code></td>
      <td>number</td>
      <td>مقیاس زوم pinch</td>
    </tr>
  </tbody>
</table>



---

## freeze
صفحه فعلی را منجمد می‌کند. گسترش برای [Page Lifecycle API](https://developers.google.com/web/updates/2018/07/page-lifecycle-api).<br /><br />دستور غیر رسمی و مستند نشده کرومیوم. اطلاعات بیشتر در مورد این دستور را می‌توانید [اینجا](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L625-L633) پیدا کنید.

##### استفاده

```js
browser.freeze()
```



---

## resume
صفحه فعلی را از حالت انجماد خارج می‌کند. گسترش برای [Page Lifecycle API](https://developers.google.com/web/updates/2018/07/page-lifecycle-api).<br /><br />دستور غیر رسمی و مستند نشده کرومیوم. اطلاعات بیشتر در مورد این دستور را می‌توانید [اینجا](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L635-L645) پیدا کنید.

##### استفاده

```js
browser.resume()
```



---

## getCastSinks
لیست سینک‌های cast (دستگاه‌های Cast) موجود برای مسیریاب رسانه Chrome را برمی‌گرداند.<br /><br />دستور غیر رسمی و مستند نشده کرومیوم. اطلاعات بیشتر در مورد این دستور را می‌توانید [اینجا](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#748) پیدا کنید.

##### استفاده

```js
browser.getCastSinks()
```


##### مقادیر بازگشتی

- **&lt;string[]&gt;**
            **<code><var>sinks</var></code>:** لیست سینک‌های موجود.


---

## selectCastSink
یک سینک cast (دستگاه Cast) را به عنوان گیرنده مقاصد مسیریاب رسانه (اتصال یا پخش) انتخاب می‌کند.<br /><br />دستور غیر رسمی و مستند نشده کرومیوم. اطلاعات بیشتر در مورد این دستور را می‌توانید [اینجا](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#737) پیدا کنید.

##### استفاده

```js
browser.selectCastSink(sinkName)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>نام دستگاه هدف.</td>
    </tr>
  </tbody>
</table>



---

## startCastTabMirroring
آینه‌سازی تب را برای تب فعلی مرورگر روی دستگاه مشخص شده آغاز می‌کند.<br /><br />دستور غیر رسمی و مستند نشده کرومیوم. اطلاعات بیشتر در مورد این دستور را می‌توانید [اینجا](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#741) پیدا کنید.

##### استفاده

```js
browser.startCastTabMirroring(sinkName)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>نام دستگاه هدف.</td>
    </tr>
  </tbody>
</table>



---

## getCastIssueMessage
در صورت وجود هرگونه مشکل در جلسه Cast، پیام خطا را برمی‌گرداند.<br /><br />دستور غیر رسمی و مستند نشده کرومیوم. اطلاعات بیشتر در مورد این دستور را می‌توانید [اینجا](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#751) پیدا کنید.

##### استفاده

```js
browser.getCastIssueMessage()
```


##### مقادیر بازگشتی

- **&lt;String&gt;**
            **<code><var>message</var></code>:** پیام خطا، در صورت وجود.


---

## stopCasting
ارسال از مسیریاب رسانه به دستگاه مشخص شده را در صورت اتصال متوقف می‌کند.<br /><br />دستور غیر رسمی و مستند نشده کرومیوم. اطلاعات بیشتر در مورد این دستور را می‌توانید [اینجا](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#744) پیدا کنید.

##### استفاده

```js
browser.stopCasting(sinkName)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>نام دستگاه هدف.</td>
    </tr>
  </tbody>
</table>



---

## shutdown
خاموش کردن فرآیند ChromeDriver و در نتیجه پایان دادن به تمام جلسات فعال.<br /><br />دستور غیر رسمی و مستند نشده کرومیوم. اطلاعات بیشتر در مورد این دستور را می‌توانید [اینجا](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L489-L498) پیدا کنید.

##### استفاده

```js
browser.shutdown()
```



---

## takeElementScreenshot
فرمان Take Element Screenshot یک اسکرین‌شات از ناحیه قابل مشاهده محصور در مستطیل محاط کننده یک عنصر می‌گیرد.<br /><br />دستور غیر رسمی و مستند نشده کرومیوم. اطلاعات بیشتر در مورد این دستور را می‌توانید [اینجا](https://w3c.github.io/webdriver/#dfn-take-element-screenshot) پیدا کنید.

##### استفاده

```js
browser.takeElementScreenshot(elementId, scroll)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>شناسه عنصری که در فراخوانی قبلی Find Element(s) برگردانده شده است</td>
    </tr>
    <tr>
      <td><code><var>scroll</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>اسکرول به نمای عنصر. پیش‌فرض: true</td>
    </tr>
  </tbody>
</table>


##### مقادیر بازگشتی

- **&lt;String&gt;**
            **<code><var>screenshot</var></code>:** داده‌های تصویر PNG با کدگذاری base64 که شامل اسکرین‌شات از ناحیه قابل مشاهده مستطیل محاط کننده یک عنصر پس از اسکرول به نمای آن است.


---

## getLogTypes
دریافت انواع لاگ موجود.<br /><br />دستور غیر رسمی و مستند نشده کرومیوم. اطلاعات بیشتر در مورد این دستور را می‌توانید [اینجا](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlogtypes) پیدا کنید.

##### استفاده

```js
browser.getLogTypes()
```


##### مقادیر بازگشتی

- **&lt;String[]&gt;**
            **<code><var>logTypes</var></code>:** لیست انواع لاگ موجود، مثال: browser، driver.


---

## getLogs
دریافت لاگ برای یک نوع لاگ خاص. بافر لاگ پس از هر درخواست بازنشانی می‌شود.<br /><br />دستور غیر رسمی و مستند نشده کرومیوم. اطلاعات بیشتر در مورد این دستور را می‌توانید [اینجا](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlog) پیدا کنید.

##### استفاده

```js
browser.getLogs(type)
```


##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>نوع لاگ</td>
    </tr>
  </tbody>
</table>


##### مقادیر بازگشتی

- **&lt;Object[]&gt;**
            **<code><var>logs</var></code>:** لیست ورودی‌های لاگ.