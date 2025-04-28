---
id: appium
title: اپیوم
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/appium.ts
---

## getAppiumContext
دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts) پیدا کنید.

##### استفاده

```js
driver.getAppiumContext()
```


##### خروجی‌ها

- **&lt;Context&gt;**
            **<code><var>context</var></code>:** یک رشته که نمایانگر context فعلی است یا null که نمایانگر 'بدون context' است


---

## switchAppiumContext
دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts) پیدا کنید.

##### استفاده

```js
driver.switchAppiumContext(name)
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
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>رشته‌ای که نمایانگر یک context در دسترس است</td>
    </tr>
  </tbody>
</table>



---

## getAppiumContexts
دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts) پیدا کنید.

##### استفاده

```js
driver.getAppiumContexts()
```


##### خروجی‌ها

- **&lt;Context[]&gt;**
            **<code><var>contexts</var></code>:** آرایه‌ای از رشته‌ها که نمایانگر context‌های در دسترس است، مانند 'WEBVIEW'، یا 'NATIVE'


---

## shake
اجرای یک عمل تکان دادن روی دستگاه.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/interactions/shake/) پیدا کنید.

##### استفاده

```js
driver.shake()
```




##### پشتیبانی

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## lock
قفل کردن دستگاه.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/interactions/lock/) پیدا کنید.

##### استفاده

```js
driver.lock(seconds)
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
      <td><code><var>seconds</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>number</td>
      <td>مدت زمان قفل ماندن صفحه (فقط iOS)</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## unlock
باز کردن قفل دستگاه.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/interactions/unlock/) پیدا کنید.

##### استفاده

```js
driver.unlock()
```




##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## isLocked
بررسی اینکه آیا دستگاه قفل است یا خیر.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/interactions/is-locked/) پیدا کنید.

##### استفاده

```js
driver.isLocked()
```


##### خروجی‌ها

- **&lt;boolean&gt;**
            **<code><var>isLocked</var></code>:** اگر دستگاه قفل باشد True و در غیر این صورت false

##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## startRecordingScreen
شروع ضبط صفحه نمایش.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/) پیدا کنید.

##### استفاده

```js
driver.startRecordingScreen(options)
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>object</td>
      <td>پارامترهای دستور که می‌تواند شامل کلیدهایی مانند: remotePath، username، password، method، forceRestart، timeLimit، videoType، videoQuality، videoFps، bitRate، videoSize، bugReport باشد (برای توضیحات بیشتر به مستندات Appium مراجعه کنید)</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## stopRecordingScreen
توقف ضبط صفحه نمایش<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/stop-recording-screen/) پیدا کنید.

##### استفاده

```js
driver.stopRecordingScreen(remotePath, username, password, method)
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
      <td><code><var>remotePath</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string</td>
      <td>مسیر مکان از راه دور که ویدیوی نتیجه باید آنجا آپلود شود. پروتکل‌های زیر پشتیبانی می‌شوند http/https، ftp. این گزینه فقط زمانی اثر دارد که فرآیند ضبط صفحه در حال انجام باشد و پارامتر forceRestart روی true تنظیم نشده باشد. مقدار null یا رشته خالی (تنظیم پیش‌فرض) به این معنی است که محتوای فایل نتیجه باید به صورت Base64 کدگذاری شود.</td>
    </tr>
    <tr>
      <td><code><var>username</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string</td>
      <td>نام کاربری برای احراز هویت از راه دور.</td>
    </tr>
    <tr>
      <td><code><var>password</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string</td>
      <td>رمز عبور برای احراز هویت از راه دور.</td>
    </tr>
    <tr>
      <td><code><var>method</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string</td>
      <td>نام روش آپلود multipart http. به طور پیش‌فرض از 'PUT' استفاده می‌شود.</td>
    </tr>
  </tbody>
</table>


##### خروجی‌ها

- **&lt;string&gt;**
            **<code><var>response</var></code>:** رشته کدگذاری شده با Base64. اگر remote_path تنظیم شده باشد، پاسخ یک رشته خالی است

##### پشتیبانی

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## getPerformanceDataTypes
انواع اطلاعات وضعیت سیستم را که پشتیبانی می‌شوند مانند cpu، حافظه، ترافیک شبکه و باتری برمی‌گرداند.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/performance-data-types/) پیدا کنید.

##### استفاده

```js
driver.getPerformanceDataTypes()
```


##### خروجی‌ها

- **&lt;string[]&gt;**
            **<code><var>performanceTypes</var></code>:** انواع داده‌های عملکرد در دسترس (cpuinfo|batteryinfo|networkinfo|memoryinfo)

##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getPerformanceData
اطلاعات وضعیت سیستم را که پشتیبانی می‌شوند مانند cpu، حافظه، ترافیک شبکه و باتری برمی‌گرداند.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/get-performance-data/) پیدا کنید.

##### استفاده

```js
driver.getPerformanceData(packageName, dataType, dataReadTimeout)
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
      <td><code><var>packageName</var></code></td>
      <td>string</td>
      <td>نام پکیج برنامه</td>
    </tr>
    <tr>
      <td><code><var>dataType</var></code></td>
      <td>string</td>
      <td>نوع وضعیت سیستم که می‌خواهید خوانده شود. باید یکی از انواع داده‌های عملکرد پشتیبانی شده باشد</td>
    </tr>
    <tr>
      <td><code><var>dataReadTimeout</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>number</td>
      <td>تعداد تلاش‌ها برای خواندن</td>
    </tr>
  </tbody>
</table>


##### خروجی‌ها

- **&lt;string[]&gt;**
            **<code><var>performanceData</var></code>:** نوع اطلاعات وضعیت سیستم که پشتیبانی می‌شود مانند cpu، حافظه، ترافیک شبکه و باتری

##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## pressKeyCode
فشردن یک کلید خاص روی دستگاه.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/keys/press-keycode/) پیدا کنید.

##### استفاده

```js
driver.pressKeyCode(keycode, metastate, flags)
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
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>کد کلید برای فشردن</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>number</td>
      <td>حالت متا برای فشردن کد کلید با آن</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>number</td>
      <td>پرچم‌ها برای فشردن کلید</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## longPressKeyCode
فشردن و نگه داشتن یک کد کلید خاص روی دستگاه.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/keys/long-press-keycode/) پیدا کنید.

##### استفاده

```js
driver.longPressKeyCode(keycode, metastate, flags)
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
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>کد کلید برای فشردن روی دستگاه</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>number</td>
      <td>متااستیت برای فشردن کلید</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>number</td>
      <td>پرچم‌ها برای فشردن کلید</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendKeyEvent
ارسال یک کد کلید به دستگاه.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints) پیدا کنید.

##### استفاده

```js
driver.sendKeyEvent(keycode, metastate)
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
      <td><code><var>keycode</var></code></td>
      <td>string</td>
      <td>کد کلید برای فشردن</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string</td>
      <td>حالت متا برای فشردن کد کلید با آن</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## rotateDevice
چرخاندن دستگاه در سه بعد.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-rotation) پیدا کنید.

##### استفاده

```js
driver.rotateDevice(x, y, z)
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
      <td>آفست x برای استفاده در مرکز حرکت چرخشی</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>آفست y برای استفاده در مرکز حرکت چرخشی</td>
    </tr>
    <tr>
      <td><code><var>z</var></code></td>
      <td>number</td>
      <td>آفست z برای استفاده در مرکز حرکت چرخشی</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentActivity
دریافت نام فعالیت فعلی در اندروید.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-activity/) پیدا کنید.

##### استفاده

```js
driver.getCurrentActivity()
```


##### خروجی‌ها

- **&lt;string&gt;**
            **<code><var>activity</var></code>:** نام فعالیت فعلی

##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentPackage
دریافت نام پکیج فعلی اندروید.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-package/) پیدا کنید.

##### استفاده

```js
driver.getCurrentPackage()
```


##### خروجی‌ها

- **&lt;string&gt;**
            **<code><var>package</var></code>:** نام پکیج فعلی

##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## installApp
نصب برنامه داده شده روی دستگاه.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/app/install-app/) پیدا کنید.

##### استفاده

```js
driver.installApp(appPath)
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
      <td><code><var>appPath</var></code></td>
      <td>string</td>
      <td>مسیر به فایل برنامه .apk</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateApp
فعال‌سازی برنامه داده شده روی دستگاه<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/app/activate-app/) پیدا کنید.

##### استفاده

```js
driver.activateApp(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>شناسه برنامه (شناسه پکیج برای اندروید، شناسه باندل برای iOS)</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## removeApp
حذف یک برنامه از دستگاه.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/app/remove-app/) پیدا کنید.

##### استفاده

```js
driver.removeApp(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>شناسه برنامه (شناسه پکیج برای اندروید، شناسه باندل برای iOS)</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## terminateApp
خاتمه دادن به برنامه مشخص شده روی دستگاه<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/app/terminate-app/) پیدا کنید.

##### استفاده

```js
driver.terminateApp(appId, options)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>شناسه برنامه (شناسه پکیج برای اندروید، شناسه باندل برای iOS)</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>object</td>
      <td>گزینه‌های دستور. مثلاً "timeout": (فقط اندروید) مهلت برای تلاش مجدد خاتمه دادن برنامه (برای اطلاعات بیشتر به مستندات Appium مراجعه کنید)</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## isAppInstalled
بررسی اینکه آیا برنامه مشخص شده روی دستگاه نصب شده است یا خیر.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/app/is-app-installed/) پیدا کنید.

##### استفاده

```js
driver.isAppInstalled(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>شناسه برنامه (شناسه پکیج برای اندروید، شناسه باندل برای iOS)</td>
    </tr>
  </tbody>
</table>


##### خروجی‌ها

- **&lt;boolean&gt;**
            **<code><var>isAppInstalled</var></code>:** اگر نصب شده باشد true و در غیر این صورت false برمی‌گرداند

##### پشتیبانی

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## queryAppState
دریافت وضعیت برنامه مشخص شده روی دستگاه<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/app/app-state/) پیدا کنید.

##### استفاده

```js
driver.queryAppState(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>شناسه برنامه (شناسه پکیج برای اندروید، شناسه باندل برای iOS)</td>
    </tr>
  </tbody>
</table>


##### خروجی‌ها

- **&lt;number&gt;**
            **<code><var>appStatus</var></code>:** 0 یعنی نصب نشده است. 1 یعنی در حال اجرا نیست. 2 یعنی در پس‌زمینه یا به حالت تعلیق در آمده است. 3 یعنی در پس‌زمینه در حال اجراست. 4 یعنی در پیش‌زمینه در حال اجراست

##### پشتیبانی

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## hideKeyboard
مخفی کردن صفحه کلید نرم.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/keys/hide-keyboard/) پیدا کنید.

##### استفاده

```js
driver.hideKeyboard(strategy, key, keyCode, keyName)
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
      <td><code><var>strategy</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string</td>
      <td>استراتژی مخفی کردن صفحه کلید (فقط UIAutomation)، استراتژی‌های در دسترس - 'press'، 'pressKey'، 'swipeDown'، 'tapOut'، 'tapOutside'، 'default'</td>
    </tr>
    <tr>
      <td><code><var>key</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string</td>
      <td>مقدار کلید اگر استراتژی 'pressKey' باشد</td>
    </tr>
    <tr>
      <td><code><var>keyCode</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string</td>
      <td>کد کلید اگر استراتژی 'pressKey' باشد</td>
    </tr>
    <tr>
      <td><code><var>keyName</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string</td>
      <td>نام کلید اگر استراتژی 'pressKey' باشد</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## isKeyboardShown
آیا صفحه کلید نرم نمایش داده می‌شود یا خیر.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/keys/is-keyboard-shown/) پیدا کنید.

##### استفاده

```js
driver.isKeyboardShown()
```


##### خروجی‌ها

- **&lt;boolean&gt;**
            **<code><var>isKeyboardShown</var></code>:** اگر صفحه کلید نمایش داده شود، True

##### پشتیبانی

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pushFile
قرار دادن یک فایل روی دستگاه در مکان خاص.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/files/push-file/) پیدا کنید.

##### استفاده

```js
driver.pushFile(path, data)
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
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>مسیری که داده در آن نصب می‌شود</td>
    </tr>
    <tr>
      <td><code><var>data</var></code></td>
      <td>string</td>
      <td>محتوای فایل به صورت base64</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pullFile
بازیابی یک فایل از سیستم فایل دستگاه.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-file/) پیدا کنید.

##### استفاده

```js
driver.pullFile(path)
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
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>مسیر فایل روی دستگاه</td>
    </tr>
  </tbody>
</table>


##### خروجی‌ها

- **&lt;string&gt;**
            **<code><var>response</var></code>:** محتوای فایل به صورت base64

##### پشتیبانی

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pullFolder
بازیابی یک پوشه از سیستم فایل دستگاه.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-folder/) پیدا کنید.

##### استفاده

```js
driver.pullFolder(path)
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
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>مسیر به یک پوشه کامل روی دستگاه</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## toggleAirplaneMode
تغییر وضعیت حالت هواپیما روی دستگاه.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-airplane-mode/) پیدا کنید.

##### استفاده

```js
driver.toggleAirplaneMode()
```




##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleData
تغییر وضعیت سرویس داده.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-data/) پیدا کنید.

##### استفاده

```js
driver.toggleData()
```




##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleWiFi
تغییر وضعیت سرویس WiFi.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-wifi/) پیدا کنید.

##### استفاده

```js
driver.toggleWiFi()
```




##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleLocationServices
تغییر وضعیت سرویس موقعیت‌یابی.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-location-services/) پیدا کنید.

##### استفاده

```js
driver.toggleLocationServices()
```




##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleNetworkSpeed
تنظیم سرعت شبکه (فقط شبیه‌ساز)<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/network/network-speed/) پیدا کنید.

##### استفاده

```js
driver.toggleNetworkSpeed(netspeed)
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
      <td><code><var>netspeed</var></code></td>
      <td>string</td>
      <td>نوع شبکه - 'full','gsm', 'edge', 'hscsd', 'gprs', 'umts', 'hsdpa', 'lte', 'evdo'</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## openNotifications
باز کردن اعلانات اندروید (فقط شبیه‌ساز).<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/system/open-notifications/) پیدا کنید.

##### استفاده

```js
driver.openNotifications()
```




##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## startActivity
شروع یک فعالیت اندروید با ارائه نام پکیج و نام فعالیت.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/activity/start-activity/) پیدا کنید.

##### استفاده

```js
driver.startActivity(appPackage, appActivity, appWaitPackage, appWaitActivity, intentAction, intentCategory, intentFlags, optionalIntentArguments, dontStopAppOnReset)
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
      <td><code><var>appPackage</var></code></td>
      <td>string</td>
      <td>نام برنامه</td>
    </tr>
    <tr>
      <td><code><var>appActivity</var></code></td>
      <td>string</td>
      <td>نام فعالیت</td>
    </tr>
    <tr>
      <td><code><var>appWaitPackage</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string</td>
      <td>نام برنامه برای انتظار</td>
    </tr>
    <tr>
      <td><code><var>appWaitActivity</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string</td>
      <td>نام فعالیت برای انتظار</td>
    </tr>
    <tr>
      <td><code><var>intentAction=android.intent.action.MAIN</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string</td>
      <td>intent action که برای شروع فعالیت استفاده می‌شود</td>
    </tr>
    <tr>
      <td><code><var>intentCategory=android.intent.category.LAUNCHER</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string</td>
      <td>دسته intent که برای شروع فعالیت استفاده می‌شود</td>
    </tr>
    <tr>
      <td><code><var>intentFlags=0x10200000</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string</td>
      <td>پرچم‌هایی که برای شروع فعالیت استفاده می‌شوند</td>
    </tr>
    <tr>
      <td><code><var>optionalIntentArguments</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string</td>
      <td>آرگومان‌های intent اضافی که برای شروع فعالیت استفاده می‌شوند</td>
    </tr>
    <tr>
      <td><code><var>dontStopAppOnReset</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string</td>
      <td>قبل از شروع برنامه با استفاده از adb، فرآیند برنامه تحت آزمایش را متوقف نمی‌کند</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSystemBars
بازیابی اطلاعات نمایش و محدوده نوارهای وضعیت و ناوبری.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/system/system-bars/) پیدا کنید.

##### استفاده

```js
driver.getSystemBars()
```


##### خروجی‌ها

- **&lt;object[]&gt;**
            **<code><var>systemBars</var></code>:** اطلاعات درباره نمایش و محدوده نوارهای وضعیت و ناوبری

##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDeviceTime
دریافت زمان روی دستگاه.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/system/system-time/) پیدا کنید.

##### استفاده

```js
driver.getDeviceTime()
```


##### خروجی‌ها

- **&lt;string&gt;**
            **<code><var>time</var></code>:** زمان روی دستگاه

##### پشتیبانی

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDisplayDensity
دریافت تراکم نمایش از دستگاه.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints) پیدا کنید.

##### استفاده

```js
driver.getDisplayDensity()
```


##### خروجی‌ها

- **&lt;*&gt;**


##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchId
شبیه‌سازی یک رویداد [touch id](https://support.apple.com/en-ca/ht201371) (فقط شبیه‌ساز iOS). برای فعال‌سازی این ویژگی، ویژگی موردنیاز `allowTouchIdEnroll` باید روی true تنظیم شود و شبیه‌ساز باید [ثبت نام شده باشد](https://support.apple.com/en-ca/ht201371). وقتی allowTouchIdEnroll را روی true تنظیم می‌کنید، به طور پیش‌فرض شبیه‌ساز را ثبت خواهد کرد. وضعیت ثبت نام را می‌توان [تغییر داد](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/index.html). این فراخوانی فقط زمانی کار می‌کند که فرآیند Appium یا برنامه والد آن (مثلاً Terminal.app یا Appium.app) به دسترسی سیستم عامل Mac در System Preferences > Security & Privacy > Privacy > Accessibility دسترسی داشته باشد.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/simulator/touch-id/) پیدا کنید.

##### استفاده

```js
driver.touchId(match)
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
      <td><code><var>match</var></code></td>
      <td>boolean</td>
      <td>آیا ما یک لمس موفق را شبیه‌سازی می‌کنیم (true) یا یک لمس ناموفق (false)</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## toggleEnrollTouchId
تغییر وضعیت شبیه‌ساز برای [ثبت نام](https://support.apple.com/en-ca/ht201371) و پذیرش touchId (فقط شبیه‌ساز iOS). برای فعال‌سازی این ویژگی، ویژگی موردنیاز `allowTouchIdEnroll` باید روی true تنظیم شود. وقتی `allowTouchIdEnroll` روی true تنظیم شود، شبیه‌ساز به طور پیش‌فرض ثبت نام خواهد شد، و 'Toggle Touch ID Enrollment' وضعیت ثبت نام را تغییر می‌دهد. این فراخوانی فقط زمانی کار می‌کند که فرآیند Appium یا برنامه والد آن (مثلاً Terminal.app یا Appium.app) به دسترسی سیستم عامل Mac در System Preferences > Security & Privacy > Privacy > Accessibility دسترسی داشته باشد.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/) پیدا کنید.

##### استفاده

```js
driver.toggleEnrollTouchId(enabled)
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
      <td><code><var>enabled=true</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>boolean</td>
      <td>اگر ثبت نام TouchID باید فعال شود، برابر با true است</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## launchApp
راه‌اندازی یک برنامه روی دستگاه.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/app/launch-app/) پیدا کنید.
:::caution

این دستور پروتکل منسوخ شده است<br />برای iOS، از `driver.execute('mobile: launchApp', { ... })` استفاده کنید، و برای اندروید، از `driver.execute('mobile: activateApp', { ... })` استفاده کنید.
:::

##### استفاده

```js
driver.launchApp()
```




##### پشتیبانی

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## closeApp
بستن یک برنامه روی دستگاه.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/app/close-app/) پیدا کنید.
:::caution

این دستور پروتکل منسوخ شده است<br />به جای آن از `driver.execute('mobile: terminateApp', { ... })` استفاده کنید
:::

##### استفاده

```js
driver.closeApp()
```




##### پشتیبانی

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## background
ارسال برنامه در حال اجرای فعلی برای این جلسه به پس‌زمینه.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/app/background-app/) پیدا کنید.
:::caution

این دستور پروتکل منسوخ شده است<br />به جای آن از `driver.execute('mobile: backgroundApp', { ... })` استفاده کنید
:::

##### استفاده

```js
driver.background(seconds)
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
      <td><code><var>seconds=null</var></code></td>
      <td>number, null</td>
      <td>مهلت برای بازگرداندن برنامه، اگر 'null' باشد برنامه بازگردانده نمی‌شود</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## endCoverage
دریافت داده‌های پوشش آزمون.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/app/end-test-coverage/) پیدا کنید.

##### استفاده

```js
driver.endCoverage(intent, path)
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
      <td><code><var>intent</var></code></td>
      <td>string</td>
      <td>intent برای پخش</td>
    </tr>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>مسیر به فایل .ec</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getStrings
دریافت رشته‌های برنامه.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/app/get-app-strings/) پیدا کنید.

##### استفاده

```js
driver.getStrings(language, stringFile)
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
      <td><code><var>language</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string</td>
      <td>کد زبان</td>
    </tr>
    <tr>
      <td><code><var>stringFile</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string</td>
      <td>مسیر به فایل رشته</td>
    </tr>
  </tbody>
</table>


##### خروجی‌ها

- **&lt;object&gt;**
            **<code><var>appStrings</var></code>:** تمام رشته‌های تعریف شده از یک برنامه برای زبان و نام فایل رشته‌های مشخص شده

##### پشتیبانی

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## setValueImmediate
دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints) پیدا کنید.

##### استفاده

```js
driver.setValueImmediate(elementId, text)
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
      <td>شناسه یک عنصر که در یک فراخوانی قبلی Find Element(s) برگردانده شده است</td>
    </tr>
    <tr>
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>متنی که باید در عنصر تنظیم شود</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## replaceValue
جایگزینی مقدار با عنصر به طور مستقیم.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints) پیدا کنید.

##### استفاده

```js
driver.replaceValue(elementId, value)
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
      <td>شناسه یک عنصر که در یک فراخوانی قبلی Find Element(s) برگردانده شده است</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>مقدار برای جایگزینی در عنصر</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSettings
بازیابی تنظیمات فعلی روی دستگاه.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/session/settings/get-settings/) پیدا کنید.

##### استفاده

```js
driver.getSettings()
```


##### خروجی‌ها

- **&lt;object&gt;**
            **<code><var>settings</var></code>:** هش JSON از تمام تنظیمات مشخص شده فعلی، به API تنظیمات مراجعه کنید

##### پشتیبانی

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## updateSettings
به‌روزرسانی تنظیمات فعلی روی دستگاه.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/session/settings/update-settings/) پیدا کنید.

##### استفاده

```js
driver.updateSettings(settings)
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
      <td><code><var>settings</var></code></td>
      <td>object</td>
      <td>شیء key/value با تنظیماتی که باید به‌روزرسانی شوند</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## receiveAsyncResponse
URL کال‌بک برای اجرای ناهمگام JavaScript.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints) پیدا کنید.

##### استفاده

```js
driver.receiveAsyncResponse(response)
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
      <td><code><var>response</var></code></td>
      <td>object</td>
      <td>پاسخی که روی دستگاه دریافت می‌شود</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## gsmCall
برقراری تماس GSM (فقط شبیه‌ساز).<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-call/) پیدا کنید.

##### استفاده

```js
driver.gsmCall(phoneNumber, action)
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
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>شماره تلفنی که می‌خواهید با آن تماس بگیرید</td>
    </tr>
    <tr>
      <td><code><var>action</var></code></td>
      <td>string</td>
      <td>عمل - 'call'، 'accept'، 'cancel'، 'hold'</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmSignal
تنظیم قدرت سیگنال GSM (فقط شبیه‌ساز).<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-signal/) پیدا کنید.

##### استفاده

```js
driver.gsmSignal(signalStrength, signalStrengh)
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
      <td><code><var>signalStrength</var></code></td>
      <td>string</td>
      <td>قدرت سیگنال در محدوده [0، 4]</td>
    </tr>
    <tr>
      <td><code><var>signalStrengh</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string</td>
      <td>قدرت سیگنال در محدوده [0، 4]. لطفاً اگر از Appium نسخه v1.11.0 یا پایین‌تر استفاده می‌کنید، این پارامتر را نیز با همان مقدار تنظیم کنید (به https://github.com/appium/appium/issues/12234 مراجعه کنید).</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerCapacity
تنظیم درصد باتری (فقط شبیه‌ساز).<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_capacity/) پیدا کنید.

##### استفاده

```js
driver.powerCapacity(percent)
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
      <td><code><var>percent</var></code></td>
      <td>number</td>
      <td>مقدار درصد در محدوده [0، 100]</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerAC
تنظیم وضعیت شارژر باتری به متصل یا غیرمتصل (فقط شبیه‌ساز).<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_ac/) پیدا کنید.

##### استفاده

```js
driver.powerAC(state)
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
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>تنظیم وضعیت. on یا off</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmVoice
تنظیم وضعیت صدای GSM (فقط شبیه‌ساز).<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-voice/) پیدا کنید.

##### استفاده

```js
driver.gsmVoice(state)
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
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>وضعیت صدای GSM - 'unregistered'، 'home'، 'roaming'، 'searching'، 'denied'، 'off'، 'on'</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendSms
شبیه‌سازی یک پیام SMS (فقط شبیه‌ساز).<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/network/send-sms/) پیدا کنید.

##### استفاده

```js
driver.sendSms(phoneNumber, message)
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
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>شماره تلفنی که می‌خواهید SMS را به آن ارسال کنید</td>
    </tr>
    <tr>
      <td><code><var>message</var></code></td>
      <td>string</td>
      <td>پیام SMS</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## fingerPrint
احراز هویت کاربران با استفاده از اسکن اثر انگشت آنها در شبیه‌سازهای پشتیبانی شده.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/authentication/finger-print/) پیدا کنید.

##### استفاده

```js
driver.fingerPrint(fingerprintId)
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
      <td><code><var>fingerprintId</var></code></td>
      <td>number</td>
      <td>اثر انگشت‌های ذخیره شده در سیستم Keystore اندروید (از 1 تا 10)</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## setClipboard
تنظیم محتوای کلیپ‌بورد سیستم<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/set-clipboard/) پیدا کنید.

##### استفاده

```js
driver.setClipboard(content, contentType, label)
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
      <td><code><var>content</var></code></td>
      <td>string</td>
      <td>محتوای واقعی کلیپ‌بورد کدگذاری شده با base64</td>
    </tr>
    <tr>
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string</td>
      <td>نوع محتوا برای دریافت. Plaintext، Image، URL. اندروید فقط از plaintext پشتیبانی می‌کند</td>
    </tr>
    <tr>
      <td><code><var>label</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string</td>
      <td>برچسب داده کلیپ‌بورد برای اندروید</td>
    </tr>
  </tbody>
</table>


##### خروجی‌ها

- **&lt;string&gt;**
            **<code><var>response</var></code>:** پاسخ از سرور Appium

##### پشتیبانی

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getClipboard
دریافت محتوای کلیپ‌بورد سیستم<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/get-clipboard/) پیدا کنید.

##### استفاده

```js
driver.getClipboard(contentType)
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
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string</td>
      <td>نوع محتوا برای دریافت. Plaintext، Image، URL. اندروید فقط از plaintext پشتیبانی می‌کند</td>
    </tr>
  </tbody>
</table>


##### خروجی‌ها

- **&lt;string&gt;**
            **<code><var>response</var></code>:** محتوای کلیپ‌بورد به صورت رشته کدگذاری شده با base64 یا یک رشته خالی اگر کلیپ‌بورد خالی باشد

##### پشتیبانی

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchPerform
این قابلیت فقط از درون یک context بومی در دسترس است. 'Touch Perform' مشابه سایر تعاملات لمسی تکی عمل می‌کند، با این تفاوت که این به شما اجازه می‌دهد بیش از یک عمل لمسی را به عنوان یک دستور زنجیر کنید. این مفید است زیرا دستورات Appium از طریق شبکه ارسال می‌شوند و بین دستورات تأخیر وجود دارد. این تأخیر می‌تواند برخی از تعاملات لمسی را غیرممکن سازد زیرا برخی از تعاملات نیاز به انجام در یک توالی دارند. برای مثال، حرکت عمودی نیاز به فشردن، حرکت به یک مختصات y متفاوت و سپس رها کردن دارد. برای اینکه کار کند، نمی‌تواند بین تعاملات تأخیر وجود داشته باشد.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/touch-perform/) پیدا کنید.

##### استفاده

```js
driver.touchPerform(actions)
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
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>نوع عملی که باید انجام شود (مانند moveTo، release، press، tap، wait)</td>
    </tr>
  </tbody>
</table>

##### مثال


```js
// انجام یک swipe افقی با درصد
const startPercentage = 10;
const endPercentage = 90;
const anchorPercentage = 50;

const { width, height } = driver.getWindowSize();
const anchor = height * anchorPercentage / 100;
const startPoint = width * startPercentage / 100;
const endPoint = width * endPercentage / 100;
driver.touchPerform([
  {
    action: 'press',
    options: {
      x: startPoint,
      y: anchor,
    },
  },
  {
    action: 'wait',
    options: {
      ms: 100,
    },
  },
  {
    action: 'moveTo',
    options: {
      x: endPoint,
      y: anchor,
    },
  },
  {
    action: 'release',
    options: {},
  },
]);
```


##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## multiTouchPerform
این قابلیت فقط از درون یک context بومی در دسترس است. انجام یک توالی عمل لمسی چندگانه.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/multi-touch-perform/) پیدا کنید.

##### استفاده

```js
driver.multiTouchPerform(actions)
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
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>نوع عملی که باید انجام شود (مانند moveTo، release، press، tap، wait)</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## executeDriverScript
این دستور به شما امکان می‌دهد یک اسکریپت WebdriverIO را به صورت یک رشته مشخص کنید و آن را به سرور Appium برای اجرای محلی در خود سرور ارسال کنید. این رویکرد به کاهش تأخیر احتمالی مرتبط با هر دستور کمک می‌کند. ***برای استفاده از این دستور با Appium 2.0، باید افزونه [`execute-driver-plugin`](https://github.com/appium/appium/tree/master/packages/execute-driver-plugin) را نصب کرده باشید.***<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium/blob/master/docs/en/commands/session/execute-driver.md) پیدا کنید.

##### استفاده

```js
driver.executeDriverScript(script, type, timeout)
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
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>اسکریپتی که باید اجرا شود. دسترسی به یک شیء 'driver' دارد که یک جلسه WebdriverIO متصل به سرور فعلی را نشان می‌دهد.</td>
    </tr>
    <tr>
      <td><code><var>type</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string</td>
      <td>زبان/چارچوب استفاده شده در اسکریپت. در حال حاضر، فقط 'webdriverio' پشتیبانی می‌شود و پیش‌فرض است.</td>
    </tr>
    <tr>
      <td><code><var>timeout</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>number</td>
      <td>تعداد میلی‌ثانیه‌ای که اسکریپت باید قبل از کشته شدن توسط سرور Appium اجازه اجرا داشته باشد. به طور پیش‌فرض معادل 1 ساعت است.</td>
    </tr>
  </tbody>
</table>


##### خروجی‌ها

- **&lt;object&gt;**
            **<code><var>result</var></code>:** یک شیء شامل دو فیلد: 'result'، که مقدار بازگشتی خود اسکریپت است، و 'logs'، که شامل 3 فیلد داخلی 'log'، 'warn' و 'error' است که آرایه‌ای از رشته‌هایی هستند که توسط console.log، console.warn و console.error در اجرای اسکریپت ثبت شده‌اند.


---

## getEvents
دریافت رویدادهای ذخیره شده در سرور appium.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/get-events.md) پیدا کنید.

##### استفاده

```js
driver.getEvents(type)
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
      <td>string[]</td>
      <td>دریافت رویدادهایی که با نوع فیلتر شده‌اند اگر نوع ارائه شده باشد.</td>
    </tr>
  </tbody>
</table>


##### خروجی‌ها

- **&lt;object&gt;**
            **<code><var>result</var></code>:** یک هش JSON از رویدادها مانند `{'commands' => [{'cmd' => 123455, ....}], 'startTime' => 1572954894127, }`.

##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## logEvent
ذخیره یک رویداد سفارشی.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/log-event.md) پیدا کنید.

##### استفاده

```js
driver.logEvent(vendor, event)
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
      <td><code><var>vendor</var></code></td>
      <td>string</td>
      <td>نام فروشنده. در `vendor:event` به صورت `vendor` خواهد بود.</td>
    </tr>
    <tr>
      <td><code><var>event</var></code></td>
      <td>string</td>
      <td>نام رویداد. در `vendor:event` به صورت `event` خواهد بود.</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## compareImages
این ویژگی مقایسه‌های تصویری را با استفاده از قابلیت‌های چارچوب OpenCV انجام می‌دهد. لطفاً توجه داشته باشید که برای کار کردن این قابلیت، هم چارچوب OpenCV و هم ماژول opencv4nodejs باید روی ماشینی که سرور Appium در آن فعال است نصب شوند. ***علاوه بر این، برای استفاده از این ویژگی با Appium 2.0، نیاز به نصب افزونه [`images-plugin`](https://github.com/appium/appium/tree/master/packages/images-plugin) دارید.***<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://appium.github.io/appium.io/docs/en/writing-running-appium/image-comparison/) پیدا کنید.

##### استفاده

```js
driver.compareImages(mode, firstImage, secondImage, options)
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
      <td><code><var>mode=matchFeatures</var></code></td>
      <td>string</td>
      <td>یکی از حالت‌های مقایسه ممکن: 'matchFeatures'، 'getSimilarity'، 'matchTemplate'. 'matchFeatures' به طور پیش‌فرض است.</td>
    </tr>
    <tr>
      <td><code><var>firstImage</var></code></td>
      <td>string</td>
      <td>داده تصویر. همه فرمت‌های تصویری که خود کتابخانه OpenCV می‌پذیرد، پشتیبانی می‌شوند.</td>
    </tr>
    <tr>
      <td><code><var>secondImage</var></code></td>
      <td>string</td>
      <td>داده تصویر. همه فرمت‌های تصویری که خود کتابخانه OpenCV می‌پذیرد، پشتیبانی می‌شوند.</td>
    </tr>
    <tr>
      <td><code><var>options=[object Object]</var></code></td>
      <td>object</td>
      <td>محتوای این دیکشنری به مقدار واقعی `mode` بستگی دارد. برای جزئیات بیشتر به مستندات ماژول `appium-support` مراجعه کنید. </td>
    </tr>
  </tbody>
</table>


##### خروجی‌ها

- **&lt;object&gt;**
            **<code><var>result</var></code>:** محتوای دیکشنری نتیجه به مقادیر واقعی `mode` و `options` بستگی دارد. برای جزئیات بیشتر به مستندات ماژول `appium-support` مراجعه کنید.


---

## implicitWait
تنظیم مدت زمانی که راننده باید هنگام جستجوی عناصر صبر کند. هنگام جستجوی یک عنصر، راننده باید صفحه را پیمایش کند تا یک عنصر پیدا شود یا زمان انتظار به پایان برسد، هر کدام که زودتر رخ دهد. هنگام جستجوی چندین عنصر، راننده باید صفحه را پیمایش کند تا حداقل یک عنصر پیدا شود یا زمان انتظار به پایان برسد، در این نقطه باید یک لیست خالی را برگرداند. اگر این دستور هرگز ارسال نشود، راننده باید به طور پیش‌فرض یک انتظار ضمنی 0 میلی‌ثانیه‌ای داشته باشد.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) پیدا کنید.

##### استفاده

```js
driver.implicitWait(ms)
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
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>مدت زمانی، به میلی‌ثانیه، برای انتظار روی یک عنصر.</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLocationInView
تعیین موقعیت یک عنصر روی صفحه پس از اینکه به داخل نما اسکرول شده است.<br /><br />__نکته:__ این به عنوان یک دستور داخلی در نظر گرفته می‌شود و باید فقط برای تعیین موقعیت یک عنصر برای تولید صحیح رویدادهای بومی استفاده شود.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) پیدا کنید.

##### استفاده

```js
driver.getLocationInView(elementId)
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
      <td>شناسه عنصری که دستور به آن مسیردهی می‌شود</td>
    </tr>
  </tbody>
</table>


##### خروجی‌ها

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** مختصات X و Y برای عنصر در صفحه.

##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## sendKeys
ارسال یک توالی از ضربات کلید به عنصر فعال<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) پیدا کنید.

##### استفاده

```js
driver.sendKeys(value)
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
      <td><code><var>value</var></code></td>
      <td>string[]</td>
      <td>توالی کلیدهایی که باید تایپ شوند. باید یک آرایه ارائه شود.</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## availableIMEEngines
لیست تمام موتورهای موجود روی دستگاه. برای استفاده از یک موتور، باید در این لیست موجود باشد.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) پیدا کنید.

##### استفاده

```js
driver.availableIMEEngines()
```


##### خروجی‌ها

- **&lt;String[]&gt;**
            **<code><var>engines</var></code>:** لیست موتورهای در دسترس

##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getActiveIMEEngine
دریافت نام موتور IME فعال. رشته نام بستگی به پلتفرم دارد.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) پیدا کنید.

##### استفاده

```js
driver.getActiveIMEEngine()
```


##### خروجی‌ها

- **&lt;String&gt;**
            **<code><var>engine</var></code>:** نام موتور IME فعال

##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## isIMEActivated
نشان می‌دهد که آیا ورودی IME در حال حاضر فعال است یا خیر<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) پیدا کنید.

##### استفاده

```js
driver.isIMEActivated()
```


##### خروجی‌ها

- **&lt;Boolean&gt;**
            **<code><var>isActive</var></code>:** اگر ورودی IME در دسترس و در حال حاضر فعال است true، در غیر این صورت false

##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## deactivateIMEEngine
غیرفعال کردن موتور IME فعال فعلی.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) پیدا کنید.

##### استفاده

```js
driver.deactivateIMEEngine()
```




##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateIMEEngine
فعال کردن موتوری که در دسترس است<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) پیدا کنید.

##### استفاده

```js
driver.activateIMEEngine(engine)
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
      <td><code><var>engine</var></code></td>
      <td>string</td>
      <td>نام موتور برای فعال‌سازی</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## asyncScriptTimeout
تنظیم مدت زمان، به میلی‌ثانیه، که اسکریپت‌های ناهمگام اجرا شده توسط `/session/:sessionId/execute_async` مجاز به اجرا هستند قبل از اینکه قطع شوند و یک خطای `Timeout` به کلاینت برگردانده شود.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) پیدا کنید.

##### استفاده

```js
driver.asyncScriptTimeout(ms)
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
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>مدت زمان، به میلی‌ثانیه، که دستورات محدود به زمان مجاز به اجرا هستند</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## submit
ارسال یک عنصر فرم.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) پیدا کنید.

##### استفاده

```js
driver.submit(elementId)
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
      <td>شناسه عنصر فرمی که باید ارسال شود</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementSize
تعیین اندازه یک عنصر به پیکسل. اندازه به صورت یک شیء JSON با ویژگی‌های `width` و `height` برگردانده می‌شود.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) پیدا کنید.

##### استفاده

```js
driver.getElementSize(elementId)
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
      <td>شناسه عنصری که دستور به آن مسیردهی می‌شود</td>
    </tr>
  </tbody>
</table>


##### خروجی‌ها

- **&lt;Object&gt;**
            **<code><var>size</var></code>:** عرض و ارتفاع عنصر، به پیکسل.

##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementLocation
تعیین موقعیت یک عنصر در صفحه. نقطه `(0, 0)` به گوشه بالا سمت چپ صفحه اشاره دارد. مختصات عنصر به صورت یک شیء JSON با ویژگی‌های `x` و `y` برگردانده می‌شود.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) پیدا کنید.

##### استفاده

```js
driver.getElementLocation(elementId)
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
      <td>شناسه عنصری که دستور به آن مسیردهی می‌شود</td>
    </tr>
  </tbody>
</table>


##### خروجی‌ها

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** مختصات X و Y برای عنصر در صفحه.

##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchClick
تک ضربه روی دستگاه لمسی.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) پیدا کنید.

##### استفاده

```js
driver.touchClick(element)
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
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>شناسه عنصری که باید روی آن تک ضربه زد.</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchDown
انگشت پایین روی صفحه.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) پیدا کنید.

##### استفاده

```js
driver.touchDown(x, y)
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
      <td>مختصات x روی صفحه</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>مختصات y روی صفحه</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchUp
انگشت بالا روی صفحه.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) پیدا کنید.

##### استفاده

```js
driver.touchUp(x, y)
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
      <td>مختصات x روی صفحه</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>مختصات y روی صفحه</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchMove
حرکت انگشت روی صفحه.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) پیدا کنید.

##### استفاده

```js
driver.touchMove(x, y)
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
      <td>مختصات x روی صفحه</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>مختصات y روی صفحه</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchLongClick
فشار طولانی روی صفحه لمسی با استفاده از رویدادهای حرکت انگشت.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) پیدا کنید.

##### استفاده

```js
driver.touchLongClick(element)
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
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>شناسه عنصری که باید روی آن فشار طولانی اعمال کرد</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchFlick
ضربه سریع روی صفحه لمسی با استفاده از رویدادهای حرکت انگشت. این دستور ضربه سریع از یک مکان خاص صفحه شروع می‌شود.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) پیدا کنید.

##### استفاده

```js
driver.touchFlick(xoffset, yoffset, element, speed, xspeed, yspeed)
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
      <td><code><var>xoffset</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>number</td>
      <td>آفست x به پیکسل برای ضربه زدن</td>
    </tr>
    <tr>
      <td><code><var>yoffset</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>number</td>
      <td>آفست y به پیکسل برای ضربه زدن</td>
    </tr>
    <tr>
      <td><code><var>element</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>string</td>
      <td>شناسه عنصری که ضربه سریع از آنجا شروع می‌شود</td>
    </tr>
    <tr>
      <td><code><var>speed</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>number</td>
      <td>سرعت به پیکسل در ثانیه</td>
    </tr>
    <tr>
      <td><code><var>xspeed</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>number</td>
      <td>سرعت x به پیکسل در ثانیه</td>
    </tr>
    <tr>
      <td><code><var>yspeed</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>number</td>
      <td>سرعت y به پیکسل در ثانیه</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getOrientation
دریافت جهت فعلی دستگاه.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) پیدا کنید.

##### استفاده

```js
driver.getOrientation()
```


##### خروجی‌ها

- **&lt;String&gt;**
            **<code><var>orientation</var></code>:** جهت فعلی مطابق با مقدار تعریف شده در ScreenOrientation: `LANDSCAPE|PORTRAIT`.

##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## setOrientation
تنظیم جهت دستگاه<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) پیدا کنید.

##### استفاده

```js
driver.setOrientation(orientation)
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
      <td><code><var>orientation</var></code></td>
      <td>string</td>
      <td>جهت جدید مرورگر به صورت تعریف شده در ScreenOrientation: `LANDSCAPE|PORTRAIT`</td>
    </tr>
  </tbody>
</table>


##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogs
دریافت گزارش برای یک نوع گزارش مشخص. بافر گزارش پس از هر درخواست بازنشانی می‌شود.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) پیدا کنید.

##### استفاده

```js
driver.getLogs(type)
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
      <td>نوع گزارش</td>
    </tr>
  </tbody>
</table>


##### خروجی‌ها

- **&lt;Object[]&gt;**
            **<code><var>logs</var></code>:** لیست ورودی‌های گزارش.

##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogTypes
دریافت انواع گزارش‌های در دسترس.<br /><br />دستور Appium. جزئیات بیشتر را می‌توانید در [مستندات رسمی پروتکل](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) پیدا کنید.

##### استفاده

```js
driver.getLogTypes()
```


##### خروجی‌ها

- **&lt;String[]&gt;**
            **<code><var>logTypes</var></code>:** لیست انواع گزارش‌های در دسترس.

##### پشتیبانی

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)