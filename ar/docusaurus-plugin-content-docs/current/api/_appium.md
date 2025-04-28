---
id: appium
title: أبيوم
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/appium.ts
---

## getAppiumContext
أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### الاستخدام

```js
driver.getAppiumContext()
```


##### العوائد

- **&lt;Context&gt;**
            **<code><var>context</var></code>:** سلسلة نصية تمثل السياق الحالي أو قيمة خالية تمثل 'لا سياق'


---

## switchAppiumContext
أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### الاستخدام

```js
driver.switchAppiumContext(name)
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
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>سلسلة نصية تمثل سياقًا متاحًا</td>
    </tr>
  </tbody>
</table>



---

## getAppiumContexts
أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### الاستخدام

```js
driver.getAppiumContexts()
```


##### العوائد

- **&lt;Context[]&gt;**
            **<code><var>contexts</var></code>:** مصفوفة من السلاسل النصية التي تمثل السياقات المتاحة، مثل 'WEBVIEW'، أو 'NATIVE'


---

## shake
إجراء حركة اهتزاز على الجهاز.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/interactions/shake/).

##### الاستخدام

```js
driver.shake()
```




##### الدعم

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## lock
قفل الجهاز.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/interactions/lock/).

##### الاستخدام

```js
driver.lock(seconds)
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
      <td><code><var>seconds</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>المدة الزمنية لقفل الشاشة (iOS فقط)</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## unlock
فتح قفل الجهاز.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/interactions/unlock/).

##### الاستخدام

```js
driver.unlock()
```




##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## isLocked
التحقق مما إذا كان الجهاز مقفلاً أم لا.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/interactions/is-locked/).

##### الاستخدام

```js
driver.isLocked()
```


##### العوائد

- **&lt;boolean&gt;**
            **<code><var>isLocked</var></code>:** صحيح إذا كان الجهاز مقفلاً، خطأ إذا لم يكن كذلك

##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## startRecordingScreen
بدء تسجيل الشاشة.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/).

##### الاستخدام

```js
driver.startRecordingScreen(options)
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>object</td>
      <td>معلمات الأمر التي يمكن أن تحتوي على مفاتيح مثل: remotePath، username، password، method، forceRestart، timeLimit، videoType، videoQuality، videoFps، bitRate، videoSize، bugReport (انظر المزيد من الوصف في وثائق Appium)</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## stopRecordingScreen
إيقاف تسجيل الشاشة<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/stop-recording-screen/).

##### الاستخدام

```js
driver.stopRecordingScreen(remotePath, username, password, method)
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
      <td><code><var>remotePath</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>المسار إلى الموقع البعيد، حيث يجب تحميل الفيديو الناتج. البروتوكولات المدعومة هي http/https و ftp. هذا الخيار له تأثير فقط إذا كانت هناك عملية تسجيل شاشة قيد التقدم وكانت معلمة forceRestart غير محددة بقيمة true. تعني القيمة الفارغة أو null (الإعداد الافتراضي) أنه يجب ترميز محتوى الملف الناتج كـ Base64.</td>
    </tr>
    <tr>
      <td><code><var>username</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>اسم المستخدم للمصادقة البعيدة.</td>
    </tr>
    <tr>
      <td><code><var>password</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>كلمة المرور للمصادقة البعيدة.</td>
    </tr>
    <tr>
      <td><code><var>method</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>اسم طريقة تحميل http متعدد الأجزاء. يتم استخدام 'PUT' بشكل افتراضي.</td>
    </tr>
  </tbody>
</table>


##### العوائد

- **&lt;string&gt;**
            **<code><var>response</var></code>:** سلسلة مشفرة بـ Base64. إذا تم تعيين remote_path، فستكون الاستجابة سلسلة فارغة

##### الدعم

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## getPerformanceDataTypes
إرجاع أنواع المعلومات لحالة النظام التي يدعم قراءتها مثل وحدة المعالجة المركزية والذاكرة وحركة الشبكة والبطارية.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/performance-data-types/).

##### الاستخدام

```js
driver.getPerformanceDataTypes()
```


##### العوائد

- **&lt;string[]&gt;**
            **<code><var>performanceTypes</var></code>:** أنواع بيانات الأداء المتاحة (cpuinfo|batteryinfo|networkinfo|memoryinfo)

##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getPerformanceData
إرجاع معلومات حالة النظام التي يدعم قراءتها مثل وحدة المعالجة المركزية والذاكرة وحركة الشبكة والبطارية.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/get-performance-data/).

##### الاستخدام

```js
driver.getPerformanceData(packageName, dataType, dataReadTimeout)
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
      <td><code><var>packageName</var></code></td>
      <td>string</td>
      <td>اسم حزمة التطبيق</td>
    </tr>
    <tr>
      <td><code><var>dataType</var></code></td>
      <td>string</td>
      <td>نوع حالة النظام الذي ترغب في قراءته. يجب أن يكون أحد أنواع بيانات الأداء المدعومة</td>
    </tr>
    <tr>
      <td><code><var>dataReadTimeout</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>عدد محاولات القراءة</td>
    </tr>
  </tbody>
</table>


##### العوائد

- **&lt;string[]&gt;**
            **<code><var>performanceData</var></code>:** نوع المعلومات لحالة النظام التي يدعم قراءتها مثل وحدة المعالجة المركزية والذاكرة وحركة الشبكة والبطارية

##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## pressKeyCode
ضغط مفتاح معين على الجهاز.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/keys/press-keycode/).

##### الاستخدام

```js
driver.pressKeyCode(keycode, metastate, flags)
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
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>رمز المفتاح للضغط</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>حالة meta للضغط على المفتاح</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>علامات لضغط المفتاح</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## longPressKeyCode
الضغط المطول على رمز مفتاح معين على الجهاز.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/keys/long-press-keycode/).

##### الاستخدام

```js
driver.longPressKeyCode(keycode, metastate, flags)
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
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>رمز المفتاح للضغط على الجهاز</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>حالة meta لضغط المفتاح</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>علامات لضغط المفتاح</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendKeyEvent
إرسال رمز مفتاح إلى الجهاز.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### الاستخدام

```js
driver.sendKeyEvent(keycode, metastate)
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
      <td><code><var>keycode</var></code></td>
      <td>string</td>
      <td>رمز المفتاح للضغط</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>حالة meta للضغط على المفتاح</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## rotateDevice
تدوير الجهاز في الأبعاد الثلاثة.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-rotation).

##### الاستخدام

```js
driver.rotateDevice(x, y, z)
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
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>إزاحة x لاستخدامها لمركز إيماءة التدوير</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>إزاحة y لاستخدامها لمركز إيماءة التدوير</td>
    </tr>
    <tr>
      <td><code><var>z</var></code></td>
      <td>number</td>
      <td>إزاحة z لاستخدامها لمركز إيماءة التدوير</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentActivity
الحصول على اسم النشاط الحالي في Android.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-activity/).

##### الاستخدام

```js
driver.getCurrentActivity()
```


##### العوائد

- **&lt;string&gt;**
            **<code><var>activity</var></code>:** اسم النشاط الحالي

##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentPackage
الحصول على اسم حزمة Android الحالية.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-package/).

##### الاستخدام

```js
driver.getCurrentPackage()
```


##### العوائد

- **&lt;string&gt;**
            **<code><var>package</var></code>:** اسم الحزمة الحالية

##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## installApp
تثبيت التطبيق المحدد على الجهاز.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/app/install-app/).

##### الاستخدام

```js
driver.installApp(appPath)
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
      <td><code><var>appPath</var></code></td>
      <td>string</td>
      <td>مسار إلى ملف التطبيق .apk</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateApp
تنشيط التطبيق المحدد على الجهاز<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/app/activate-app/).

##### الاستخدام

```js
driver.activateApp(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>معرف التطبيق (معرف الحزمة لنظام Android، معرف الحزمة لنظام iOS)</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## removeApp
إزالة تطبيق من الجهاز.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/app/remove-app/).

##### الاستخدام

```js
driver.removeApp(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>معرف التطبيق (معرف الحزمة لنظام Android، معرف الحزمة لنظام iOS)</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## terminateApp
إنهاء التطبيق المحدد على الجهاز<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/app/terminate-app/).

##### الاستخدام

```js
driver.terminateApp(appId, options)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>معرف التطبيق (معرف الحزمة لنظام Android، معرف الحزمة لنظام iOS)</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>object</td>
      <td>خيارات الأمر. مثل "timeout": (Android فقط) مهلة لإعادة محاولة إنهاء التطبيق (انظر المزيد في وثائق Appium)</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## isAppInstalled
التحقق مما إذا كان التطبيق المحدد مثبتًا على الجهاز.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/app/is-app-installed/).

##### الاستخدام

```js
driver.isAppInstalled(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>معرف التطبيق (معرف الحزمة لنظام Android، معرف الحزمة لنظام iOS)</td>
    </tr>
  </tbody>
</table>


##### العوائد

- **&lt;boolean&gt;**
            **<code><var>isAppInstalled</var></code>:** إرجاع صحيح إذا كان مثبتًا، خطأ إذا لم يكن

##### الدعم

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## queryAppState
الحصول على حالة التطبيق المحدد على الجهاز<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/app/app-state/).

##### الاستخدام

```js
driver.queryAppState(appId)
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
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>معرف التطبيق (معرف الحزمة لنظام Android، معرف الحزمة لنظام iOS)</td>
    </tr>
  </tbody>
</table>


##### العوائد

- **&lt;number&gt;**
            **<code><var>appStatus</var></code>:** 0 يعني غير مثبت. 1 يعني غير مشغل. 2 يعني يعمل في الخلفية أو معلق. 3 يعني يعمل في الخلفية. 4 يعني يعمل في المقدمة

##### الدعم

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## hideKeyboard
إخفاء لوحة المفاتيح الافتراضية.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/keys/hide-keyboard/).

##### الاستخدام

```js
driver.hideKeyboard(strategy, key, keyCode, keyName)
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
      <td><code><var>strategy</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>استراتيجية إخفاء لوحة المفاتيح (UIAutomation فقط)، الاستراتيجيات المتاحة - 'press'، 'pressKey'، 'swipeDown'، 'tapOut'، 'tapOutside'، 'default'</td>
    </tr>
    <tr>
      <td><code><var>key</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>قيمة المفتاح إذا كانت الاستراتيجية هي 'pressKey'</td>
    </tr>
    <tr>
      <td><code><var>keyCode</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>رمز المفتاح إذا كانت الاستراتيجية هي 'pressKey'</td>
    </tr>
    <tr>
      <td><code><var>keyName</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>اسم المفتاح إذا كانت الاستراتيجية هي 'pressKey'</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## isKeyboardShown
ما إذا كانت لوحة المفاتيح الافتراضية معروضة أم لا.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/keys/is-keyboard-shown/).

##### الاستخدام

```js
driver.isKeyboardShown()
```


##### العوائد

- **&lt;boolean&gt;**
            **<code><var>isKeyboardShown</var></code>:** صحيح إذا كانت لوحة المفاتيح معروضة

##### الدعم

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pushFile
وضع ملف على الجهاز في مكان محدد.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/files/push-file/).

##### الاستخدام

```js
driver.pushFile(path, data)
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
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>المسار لتثبيت البيانات عليه</td>
    </tr>
    <tr>
      <td><code><var>data</var></code></td>
      <td>string</td>
      <td>محتويات الملف بتنسيق base64</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pullFile
استرجاع ملف من نظام ملفات الجهاز.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-file/).

##### الاستخدام

```js
driver.pullFile(path)
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
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>المسار على الجهاز لسحب الملف منه</td>
    </tr>
  </tbody>
</table>


##### العوائد

- **&lt;string&gt;**
            **<code><var>response</var></code>:** محتويات الملف بتنسيق base64

##### الدعم

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pullFolder
استرجاع مجلد من نظام ملفات الجهاز.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-folder/).

##### الاستخدام

```js
driver.pullFolder(path)
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
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>المسار إلى مجلد كامل على الجهاز</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## toggleAirplaneMode
تبديل وضع الطيران على الجهاز.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-airplane-mode/).

##### الاستخدام

```js
driver.toggleAirplaneMode()
```




##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleData
تبديل حالة خدمة البيانات.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-data/).

##### الاستخدام

```js
driver.toggleData()
```




##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleWiFi
تبديل حالة خدمة الواي فاي.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-wifi/).

##### الاستخدام

```js
driver.toggleWiFi()
```




##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleLocationServices
تبديل حالة خدمة الموقع.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-location-services/).

##### الاستخدام

```js
driver.toggleLocationServices()
```




##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleNetworkSpeed
تعيين سرعة الشبكة (المحاكي فقط)<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/network/network-speed/).

##### الاستخدام

```js
driver.toggleNetworkSpeed(netspeed)
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
      <td><code><var>netspeed</var></code></td>
      <td>string</td>
      <td>نوع الشبكة - 'full'، 'gsm'، 'edge'، 'hscsd'، 'gprs'، 'umts'، 'hsdpa'، 'lte'، 'evdo'</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## openNotifications
فتح إشعارات Android (المحاكي فقط).<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/system/open-notifications/).

##### الاستخدام

```js
driver.openNotifications()
```




##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## startActivity
بدء نشاط Android عن طريق توفير اسم الحزمة واسم النشاط.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/activity/start-activity/).

##### الاستخدام

```js
driver.startActivity(appPackage, appActivity, appWaitPackage, appWaitActivity, intentAction, intentCategory, intentFlags, optionalIntentArguments, dontStopAppOnReset)
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
      <td><code><var>appPackage</var></code></td>
      <td>string</td>
      <td>اسم التطبيق</td>
    </tr>
    <tr>
      <td><code><var>appActivity</var></code></td>
      <td>string</td>
      <td>اسم النشاط</td>
    </tr>
    <tr>
      <td><code><var>appWaitPackage</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>اسم التطبيق للانتظار</td>
    </tr>
    <tr>
      <td><code><var>appWaitActivity</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>اسم النشاط للانتظار</td>
    </tr>
    <tr>
      <td><code><var>intentAction=android.intent.action.MAIN</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>إجراء القصد الذي سيتم استخدامه لبدء النشاط</td>
    </tr>
    <tr>
      <td><code><var>intentCategory=android.intent.category.LAUNCHER</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>فئة القصد التي سيتم استخدامها لبدء النشاط</td>
    </tr>
    <tr>
      <td><code><var>intentFlags=0x10200000</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>العلامات التي سيتم استخدامها لبدء النشاط</td>
    </tr>
    <tr>
      <td><code><var>optionalIntentArguments</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>وسائط القصد الإضافية التي سيتم استخدامها لبدء النشاط</td>
    </tr>
    <tr>
      <td><code><var>dontStopAppOnReset</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>لا يوقف عملية التطبيق قيد الاختبار، قبل بدء التطبيق باستخدام adb</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSystemBars
استرجاع معلومات الرؤية والحدود لشريط الحالة وأشرطة التنقل.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/system/system-bars/).

##### الاستخدام

```js
driver.getSystemBars()
```


##### العوائد

- **&lt;object[]&gt;**
            **<code><var>systemBars</var></code>:** معلومات حول رؤية وحدود شريط الحالة وشريط التنقل

##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDeviceTime
الحصول على الوقت على الجهاز.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/system/system-time/).

##### الاستخدام

```js
driver.getDeviceTime()
```


##### العوائد

- **&lt;string&gt;**
            **<code><var>time</var></code>:** الوقت على الجهاز

##### الدعم

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDisplayDensity
الحصول على كثافة العرض من الجهاز.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### الاستخدام

```js
driver.getDisplayDensity()
```


##### العوائد

- **&lt;*&gt;**


##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchId
محاكاة حدث [touch id](https://support.apple.com/en-ca/ht201371) (محاكي iOS فقط). لتمكين هذه الميزة، يجب تعيين القدرة المرغوبة allowTouchIdEnroll إلى true ويجب [تسجيل](https://support.apple.com/en-ca/ht201371) المحاكي. عندما تضبط allowTouchIdEnroll على true، سيتم ضبط المحاكي ليكون مسجلاً بشكل افتراضي. يمكن [تبديل](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/index.html) حالة التسجيل. ستعمل هذه المكالمة فقط إذا كان لعملية Appium أو تطبيقها الأصلي (مثل Terminal.app أو Appium.app) حق الوصول إلى إمكانية الوصول في نظام Mac OS في تفضيلات النظام > الأمان والخصوصية > الخصوصية > إمكانية الوصول.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/simulator/touch-id/).

##### الاستخدام

```js
driver.touchId(match)
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
      <td><code><var>match</var></code></td>
      <td>boolean</td>
      <td>هل نحن نحاكي لمسة ناجحة (صحيح) أم لمسة فاشلة (خطأ)</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## toggleEnrollTouchId
تبديل المحاكي بين كونه [مسجلاً](https://support.apple.com/en-ca/ht201371) لقبول بصمة الإصبع (محاكي iOS فقط). لتمكين هذه الميزة، يجب تعيين القدرة المرغوبة `allowTouchIdEnroll` إلى true. عندما يتم تعيين `allowTouchIdEnroll` إلى true سيتم تسجيل المحاكي بشكل افتراضي، ويغير 'Toggle Touch ID Enrollment' حالة التسجيل. ستعمل هذه المكالمة فقط إذا كان لعملية Appium أو تطبيقها الأصلي (مثل Terminal.app أو Appium.app) حق الوصول إلى إمكانية الوصول في نظام Mac OS في تفضيلات النظام > الأمان والخصوصية > الخصوصية > إمكانية الوصول.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/).

##### الاستخدام

```js
driver.toggleEnrollTouchId(enabled)
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
      <td><code><var>enabled=true</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>boolean</td>
      <td>يساوي true إذا كان يجب تمكين تسجيل بصمة الإصبع</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## launchApp
إطلاق تطبيق على الجهاز.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/app/launch-app/).
:::caution

أمر البروتوكول هذا مهمل<br />بالنسبة لنظام iOS، استخدم `driver.execute('mobile: launchApp', { ... })`، وبالنسبة لنظام Android، استخدم `driver.execute('mobile: activateApp', { ... })`.
:::

##### الاستخدام

```js
driver.launchApp()
```




##### الدعم

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## closeApp
إغلاق تطبيق على الجهاز.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/app/close-app/).
:::caution

أمر البروتوكول هذا مهمل<br />استخدم `driver.execute('mobile: terminateApp', { ... })` بدلاً من ذلك
:::

##### الاستخدام

```js
driver.closeApp()
```




##### الدعم

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## background
إرسال التطبيق الحالي قيد التشغيل لهذه الجلسة إلى الخلفية.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/app/background-app/).
:::caution

أمر البروتوكول هذا مهمل<br />استخدم `driver.execute('mobile: backgroundApp', { ... })` بدلاً من ذلك
:::

##### الاستخدام

```js
driver.background(seconds)
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
      <td><code><var>seconds=null</var></code></td>
      <td>number, null</td>
      <td>مهلة لاستعادة التطبيق، إذا كانت 'null' فلن تتم استعادة التطبيق</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## endCoverage
الحصول على بيانات تغطية الاختبار.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/app/end-test-coverage/).

##### الاستخدام

```js
driver.endCoverage(intent, path)
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
      <td><code><var>intent</var></code></td>
      <td>string</td>
      <td>القصد للبث</td>
    </tr>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>المسار إلى ملف .ec</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getStrings
الحصول على سلاسل التطبيق.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/app/get-app-strings/).

##### الاستخدام

```js
driver.getStrings(language, stringFile)
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
      <td><code><var>language</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>رمز اللغة</td>
    </tr>
    <tr>
      <td><code><var>stringFile</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>المسار إلى ملف السلاسل النصية</td>
    </tr>
  </tbody>
</table>


##### العوائد

- **&lt;object&gt;**
            **<code><var>appStrings</var></code>:** جميع السلاسل النصية المحددة من تطبيق للغة المحددة واسم ملف السلاسل

##### الدعم

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## setValueImmediate
أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### الاستخدام

```js
driver.setValueImmediate(elementId, text)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>معرف عنصر تم إرجاعه في استدعاء سابق لـ Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>النص المراد تعيينه للعنصر</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## replaceValue
استبدال القيمة في العنصر مباشرة.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### الاستخدام

```js
driver.replaceValue(elementId, value)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>معرف عنصر تم إرجاعه في استدعاء سابق لـ Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>القيمة المراد استبدالها في العنصر</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSettings
استرجاع الإعدادات الحالية على الجهاز.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/session/settings/get-settings/).

##### الاستخدام

```js
driver.getSettings()
```


##### العوائد

- **&lt;object&gt;**
            **<code><var>settings</var></code>:** هاش JSON لجميع الإعدادات المحددة حالياً، انظر واجهة برمجة تطبيقات الإعدادات

##### الدعم

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## updateSettings
تحديث الإعداد الحالي على الجهاز.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/session/settings/update-settings/).

##### الاستخدام

```js
driver.updateSettings(settings)
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
      <td><code><var>settings</var></code></td>
      <td>object</td>
      <td>كائن مفتاح/قيمة مع الإعدادات المراد تحديثها</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## receiveAsyncResponse
عنوان URL رد الاتصال للتنفيذ غير المتزامن لـ JavaScript.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### الاستخدام

```js
driver.receiveAsyncResponse(response)
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
      <td><code><var>response</var></code></td>
      <td>object</td>
      <td>الاستجابة المراد استلامها على الجهاز</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## gsmCall
إجراء مكالمة GSM (المحاكي فقط).<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-call/).

##### الاستخدام

```js
driver.gsmCall(phoneNumber, action)
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
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>رقم الهاتف للاتصال به</td>
    </tr>
    <tr>
      <td><code><var>action</var></code></td>
      <td>string</td>
      <td>الإجراء - 'call'، 'accept'، 'cancel'، 'hold'</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmSignal
تعيين قوة إشارة GSM (المحاكي فقط).<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-signal/).

##### الاستخدام

```js
driver.gsmSignal(signalStrength, signalStrengh)
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
      <td><code><var>signalStrength</var></code></td>
      <td>string</td>
      <td>قوة الإشارة في النطاق [0، 4]</td>
    </tr>
    <tr>
      <td><code><var>signalStrengh</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>قوة الإشارة في النطاق [0، 4]. يرجى أيضاً تعيين هذه المعلمة بنفس القيمة إذا كنت تستخدم Appium v1.11.0 أو أقل (انظر https://github.com/appium/appium/issues/12234).</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerCapacity
تعيين نسبة البطارية (المحاكي فقط).<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_capacity/).

##### الاستخدام

```js
driver.powerCapacity(percent)
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
      <td><code><var>percent</var></code></td>
      <td>number</td>
      <td>قيمة النسبة المئوية في النطاق [0، 100]</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerAC
تعيين حالة شاحن البطارية على متصل أو غير متصل (المحاكي فقط).<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_ac/).

##### الاستخدام

```js
driver.powerAC(state)
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
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>تعيين الحالة. on أو off</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmVoice
تعيين حالة صوت GSM (المحاكي فقط).<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-voice/).

##### الاستخدام

```js
driver.gsmVoice(state)
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
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>حالة صوت GSM - 'unregistered'، 'home'، 'roaming'، 'searching'، 'denied'، 'off'، 'on'</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendSms
محاكاة رسالة SMS (المحاكي فقط).<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/network/send-sms/).

##### الاستخدام

```js
driver.sendSms(phoneNumber, message)
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
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>رقم الهاتف لإرسال الرسالة القصيرة إليه</td>
    </tr>
    <tr>
      <td><code><var>message</var></code></td>
      <td>string</td>
      <td>رسالة SMS</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## fingerPrint
مصادقة المستخدمين باستخدام مسح بصمات أصابعهم على أجهزة المحاكاة المدعومة.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/authentication/finger-print/).

##### الاستخدام

```js
driver.fingerPrint(fingerprintId)
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
      <td><code><var>fingerprintId</var></code></td>
      <td>number</td>
      <td>بصمات الأصابع المخزنة في نظام Android Keystore (من 1 إلى 10)</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## setClipboard
تعيين محتوى الحافظة النظامية<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/set-clipboard/).

##### الاستخدام

```js
driver.setClipboard(content, contentType, label)
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
      <td><code><var>content</var></code></td>
      <td>string</td>
      <td>محتوى الحافظة الفعلي المشفر بنظام base64</td>
    </tr>
    <tr>
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>نوع المحتوى للحصول عليه. Plaintext أو Image أو URL. يدعم Android النص العادي فقط</td>
    </tr>
    <tr>
      <td><code><var>label</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>تسمية بيانات الحافظة لنظام Android</td>
    </tr>
  </tbody>
</table>


##### العوائد

- **&lt;string&gt;**
            **<code><var>response</var></code>:** الاستجابة من خادم Appium

##### الدعم

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getClipboard
الحصول على محتوى الحافظة النظامية<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/get-clipboard/).

##### الاستخدام

```js
driver.getClipboard(contentType)
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
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>نوع المحتوى للحصول عليه. Plaintext أو Image أو URL. يدعم Android النص العادي فقط</td>
    </tr>
  </tbody>
</table>


##### العوائد

- **&lt;string&gt;**
            **<code><var>response</var></code>:** محتوى الحافظة كسلسلة مشفرة بنظام base64 أو سلسلة فارغة إذا كانت الحافظة فارغة

##### الدعم

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchPerform
هذه الوظيفة متاحة فقط من داخل سياق أصلي. يعمل 'Touch Perform' بطريقة مماثلة لتفاعلات اللمس الفردية الأخرى، باستثناء أن هذا يسمح لك بربط أكثر من إجراء لمس واحد كأمر واحد. هذا مفيد لأنه يتم إرسال أوامر Appium عبر الشبكة وهناك تأخر بين الأوامر. يمكن أن يجعل هذا التأخير بعض تفاعلات اللمس مستحيلة لأن بعض التفاعلات تحتاج إلى أن تتم في تسلسل واحد. يتطلب الوضع العمودي، على سبيل المثال، الضغط لأسفل، والانتقال إلى إحداثي y مختلف، ثم التحرير. لكي يعمل، لا يمكن أن يكون هناك تأخير بين التفاعلات.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/touch-perform/).

##### الاستخدام

```js
driver.touchPerform(actions)
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
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>نوع الإجراء المراد تنفيذه (مثل moveTo، release، press، tap، wait)</td>
    </tr>
  </tbody>
</table>

##### مثال


```js
// do a horizontal swipe by percentage
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


##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## multiTouchPerform
هذه الوظيفة متاحة فقط من داخل سياق أصلي. تنفيذ تسلسل إجراءات اللمس المتعدد.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/multi-touch-perform/).

##### الاستخدام

```js
driver.multiTouchPerform(actions)
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
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>نوع الإجراء المراد تنفيذه (مثل moveTo، release، press، tap، wait)</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## executeDriverScript
يتيح لك هذا الأمر تحديد نص WebdriverIO كسلسلة ونقله إلى خادم Appium للتنفيذ المحلي على الخادم نفسه. يساعد هذا النهج في تقليل التأخير المحتمل المرتبط بكل أمر. ***لاستخدام هذا الأمر مع Appium 2.0، يجب أن يكون لديك مكون [`execute-driver-plugin`](https://github.com/appium/appium/tree/master/packages/execute-driver-plugin) مثبت.***<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/docs/en/commands/session/execute-driver.md).

##### الاستخدام

```js
driver.executeDriverScript(script, type, timeout)
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
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>النص المراد تنفيذه. لديه إمكانية الوصول إلى كائن 'driver' الذي يمثل جلسة WebdriverIO مرتبطة بالخادم الحالي.</td>
    </tr>
    <tr>
      <td><code><var>type</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>اللغة/الإطار المستخدم في النص. حاليًا، فقط 'webdriverio' مدعوم وهو الافتراضي.</td>
    </tr>
    <tr>
      <td><code><var>timeout</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>عدد المللي ثانية التي يجب أن يُسمح للنص بالتشغيل قبل أن يتم إنهاؤه بواسطة خادم Appium. الافتراضي هو ما يعادل ساعة واحدة.</td>
    </tr>
  </tbody>
</table>


##### العوائد

- **&lt;object&gt;**
            **<code><var>result</var></code>:** كائن يحتوي على حقلين: 'result'، وهو قيمة العودة للنص نفسه، و'logs'، الذي يحتوي على 3 حقول داخلية، 'log'، 'warn'، و'error'، التي تحتوي على مصفوفة من السلاسل المسجلة بواسطة console.log، console.warn، وconsole.error في تنفيذ النص.


---

## getEvents
الحصول على الأحداث المخزنة في خادم appium.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/get-events.md).

##### الاستخدام

```js
driver.getEvents(type)
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
      <td><code><var>type</var></code></td>
      <td>string[]</td>
      <td>الحصول على الأحداث التي تمت تصفيتها بالنوع إذا تم توفير النوع.</td>
    </tr>
  </tbody>
</table>


##### العوائد

- **&lt;object&gt;**
            **<code><var>result</var></code>:** هاش JSON للأحداث مثل `{'commands' => [{'cmd' => 123455, ....}], 'startTime' => 1572954894127, }`.

##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## logEvent
تخزين حدث مخصص.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/log-event.md).

##### الاستخدام

```js
driver.logEvent(vendor, event)
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
      <td><code><var>vendor</var></code></td>
      <td>string</td>
      <td>اسم البائع. سيكون `vendor` في `vendor:event`.</td>
    </tr>
    <tr>
      <td><code><var>event</var></code></td>
      <td>string</td>
      <td>اسم الحدث. سيكون `event` في `vendor:event`.</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## compareImages
تقوم هذه الميزة بإجراء مقارنات للصور باستخدام قدرات إطار عمل OpenCV. يرجى ملاحظة أنه لكي تعمل هذه الوظيفة، يجب تثبيت كل من إطار عمل OpenCV ووحدة opencv4nodejs على الجهاز الذي يعمل عليه خادم Appium. ***بالإضافة إلى ذلك، ستحتاج إلى تثبيت المكون [`images-plugin`](https://github.com/appium/appium/tree/master/packages/images-plugin) لاستخدام هذه الميزة مع Appium 2.0.***<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/writing-running-appium/image-comparison/).

##### الاستخدام

```js
driver.compareImages(mode, firstImage, secondImage, options)
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
      <td><code><var>mode=matchFeatures</var></code></td>
      <td>string</td>
      <td>أحد أوضاع المقارنة الممكنة: 'matchFeatures'، 'getSimilarity'، 'matchTemplate'. 'matchFeatures' هو الافتراضي.</td>
    </tr>
    <tr>
      <td><code><var>firstImage</var></code></td>
      <td>string</td>
      <td>بيانات الصورة. جميع تنسيقات الصور، التي تقبلها مكتبة OpenCV نفسها، مدعومة.</td>
    </tr>
    <tr>
      <td><code><var>secondImage</var></code></td>
      <td>string</td>
      <td>بيانات الصورة. جميع تنسيقات الصور، التي تقبلها مكتبة OpenCV نفسها، مدعومة.</td>
    </tr>
    <tr>
      <td><code><var>options=[object Object]</var></code></td>
      <td>object</td>
      <td>يعتمد محتوى هذا القاموس على قيمة `mode` الفعلية. انظر وثائق وحدة `appium-support` لمزيد من التفاصيل. </td>
    </tr>
  </tbody>
</table>


##### العوائد

- **&lt;object&gt;**
            **<code><var>result</var></code>:** يعتمد محتوى القاموس الناتج على قيم `mode` و `options` الفعلية. انظر وثائق وحدة `appium-support` لمزيد من التفاصيل.


---

## implicitWait
تعيين مقدار الوقت الذي يجب أن ينتظره السائق عند البحث عن العناصر. عند البحث عن عنصر واحد، يجب على السائق استطلاع الصفحة حتى يتم العثور على عنصر أو تنتهي المهلة، أيهما يحدث أولاً. عند البحث عن عناصر متعددة، يجب على السائق استطلاع الصفحة حتى يتم العثور على عنصر واحد على الأقل أو تنتهي المهلة، وعندها يجب أن يُرجع قائمة فارغة. إذا لم يتم إرسال هذا الأمر أبدًا، يجب أن يكون الانتظار الضمني الافتراضي للسائق 0 مللي ثانية.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### الاستخدام

```js
driver.implicitWait(ms)
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
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>مقدار الوقت، بالمللي ثانية، للانتظار على عنصر.</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLocationInView
تحديد موقع عنصر على الشاشة بعد تمرير الشاشة إليه.<br /><br />__ملاحظة:__ يعتبر هذا أمرًا داخليًا ويجب استخدامه فقط لتحديد موقع عنصر لتوليد أحداث أصلية بشكل صحيح.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### الاستخدام

```js
driver.getLocationInView(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>معرف العنصر لتوجيه الأمر إليه</td>
    </tr>
  </tbody>
</table>


##### العوائد

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** إحداثيات X و Y للعنصر على الصفحة.

##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## sendKeys
إرسال سلسلة من ضربات المفاتيح إلى العنصر النشط<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### الاستخدام

```js
driver.sendKeys(value)
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
      <td><code><var>value</var></code></td>
      <td>string[]</td>
      <td>تسلسل المفاتيح للكتابة. يجب توفير مصفوفة.</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## availableIMEEngines
سرد جميع المحركات المتاحة على الجهاز. لاستخدام محرك، يجب أن يكون موجودًا في هذه القائمة.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### الاستخدام

```js
driver.availableIMEEngines()
```


##### العوائد

- **&lt;String[]&gt;**
            **<code><var>engines</var></code>:** قائمة المحركات المتاحة

##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getActiveIMEEngine
الحصول على اسم محرك IME النشط. سلسلة الاسم خاصة بالمنصة.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### الاستخدام

```js
driver.getActiveIMEEngine()
```


##### العوائد

- **&lt;String&gt;**
            **<code><var>engine</var></code>:** اسم محرك IME النشط

##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## isIMEActivated
يشير إلى ما إذا كان إدخال IME نشطًا في هذه اللحظة<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### الاستخدام

```js
driver.isIMEActivated()
```


##### العوائد

- **&lt;Boolean&gt;**
            **<code><var>isActive</var></code>:** صحيح إذا كان إدخال IME متاحًا ونشطًا حاليًا، خطأ بخلاف ذلك

##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## deactivateIMEEngine
إلغاء تنشيط محرك IME النشط حاليًا.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### الاستخدام

```js
driver.deactivateIMEEngine()
```




##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateIMEEngine
جعل محرك متاح<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### الاستخدام

```js
driver.activateIMEEngine(engine)
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
      <td><code><var>engine</var></code></td>
      <td>string</td>
      <td>اسم المحرك للتنشيط</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## asyncScriptTimeout
تعيين مقدار الوقت، بالمللي ثانية، الذي يُسمح للنصوص غير المتزامنة التي يتم تنفيذها بواسطة `/session/:sessionId/execute_async` بالتشغيل قبل إيقافها وإرجاع خطأ `Timeout` إلى العميل.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### الاستخدام

```js
driver.asyncScriptTimeout(ms)
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
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>مقدار الوقت، بالمللي ثانية، الذي يُسمح للأوامر المحدودة زمنيًا بالتشغيل</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## submit
إرسال عنصر نموذج.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### الاستخدام

```js
driver.submit(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>معرف عنصر النموذج المراد إرساله</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementSize
تحديد حجم عنصر بالبكسل. سيتم إرجاع الحجم ككائن JSON مع خصائص `width` و `height`.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### الاستخدام

```js
driver.getElementSize(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>معرف العنصر لتوجيه الأمر إليه</td>
    </tr>
  </tbody>
</table>


##### العوائد

- **&lt;Object&gt;**
            **<code><var>size</var></code>:** عرض وارتفاع العنصر، بالبكسل.

##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementLocation
تحديد موقع عنصر على الصفحة. تشير النقطة `(0، 0)` إلى الزاوية العلوية اليسرى من الصفحة. يتم إرجاع إحداثيات العنصر ككائن JSON مع خصائص `x` و `y`.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### الاستخدام

```js
driver.getElementLocation(elementId)
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
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>معرف العنصر لتوجيه الأمر إليه</td>
    </tr>
  </tbody>
</table>


##### العوائد

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** إحداثيات X و Y للعنصر على الصفحة.

##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchClick
نقرة فردية على الجهاز الذي يدعم اللمس.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### الاستخدام

```js
driver.touchClick(element)
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
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>معرف العنصر للنقر فردياً عليه.</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchDown
وضع الإصبع لأسفل على الشاشة.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### الاستخدام

```js
driver.touchDown(x, y)
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
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>إحداثي x على الشاشة</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>إحداثي y على الشاشة</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchUp
رفع الإصبع على الشاشة.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### الاستخدام

```js
driver.touchUp(x, y)
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
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>إحداثي x على الشاشة</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>إحداثي y على الشاشة</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchMove
تحريك الإصبع على الشاشة.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### الاستخدام

```js
driver.touchMove(x, y)
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
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>إحداثي x على الشاشة</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>إحداثي y على الشاشة</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchLongClick
الضغط الطويل على شاشة اللمس باستخدام أحداث حركة الإصبع.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### الاستخدام

```js
driver.touchLongClick(element)
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
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>معرف العنصر للضغط الطويل عليه</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchFlick
النقر على شاشة اللمس باستخدام أحداث حركة الإصبع. يبدأ أمر النقر هذا في موقع شاشة معين.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### الاستخدام

```js
driver.touchFlick(xoffset, yoffset, element, speed, xspeed, yspeed)
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
      <td><code><var>xoffset</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>الإزاحة x بالبكسل للنقر</td>
    </tr>
    <tr>
      <td><code><var>yoffset</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>الإزاحة y بالبكسل للنقر</td>
    </tr>
    <tr>
      <td><code><var>element</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>معرف العنصر حيث يبدأ النقر</td>
    </tr>
    <tr>
      <td><code><var>speed</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>السرعة بالبكسل في الثانية</td>
    </tr>
    <tr>
      <td><code><var>xspeed</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>السرعة x بالبكسل في الثانية</td>
    </tr>
    <tr>
      <td><code><var>yspeed</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>السرعة y بالبكسل في الثانية</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getOrientation
الحصول على اتجاه الجهاز الحالي.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### الاستخدام

```js
driver.getOrientation()
```


##### العوائد

- **&lt;String&gt;**
            **<code><var>orientation</var></code>:** الاتجاه الحالي المقابل لقيمة محددة في ScreenOrientation: `LANDSCAPE|PORTRAIT`.

##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## setOrientation
تعيين اتجاه الجهاز<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### الاستخدام

```js
driver.setOrientation(orientation)
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
      <td><code><var>orientation</var></code></td>
      <td>string</td>
      <td>اتجاه المتصفح الجديد كما هو محدد في ScreenOrientation: `LANDSCAPE|PORTRAIT`</td>
    </tr>
  </tbody>
</table>


##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogs
الحصول على السجل لنوع سجل معين. يتم إعادة تعيين مخزن السجل بعد كل طلب.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### الاستخدام

```js
driver.getLogs(type)
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
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>نوع السجل</td>
    </tr>
  </tbody>
</table>


##### العوائد

- **&lt;Object[]&gt;**
            **<code><var>logs</var></code>:** قائمة إدخالات السجل.

##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogTypes
الحصول على أنواع السجلات المتاحة.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### الاستخدام

```js
driver.getLogTypes()
```


##### العوائد

- **&lt;String[]&gt;**
            **<code><var>logTypes</var></code>:** قائمة أنواع السجلات المتاحة.

##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)