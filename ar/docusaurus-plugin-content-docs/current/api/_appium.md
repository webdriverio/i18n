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




##### النتائج

- **&lt;Context&gt;**
            **<code><var>context</var></code>:** سلسلة نصية تمثل السياق الحالي أو null تمثل 'لا يوجد سياق'    


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




##### النتائج

- **&lt;Context[]&gt;**
            **<code><var>contexts</var></code>:** مصفوفة من السلاسل النصية التي تمثل السياقات المتاحة، مثل 'WEBVIEW'، أو 'NATIVE'    


---
## shake
قم بإجراء حركة اهتزاز على الجهاز.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/interactions/shake/).



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
      <td>المدة التي يتم فيها قفل الشاشة (iOS فقط)</td>
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
التحقق مما إذا كان الجهاز مقفلًا أم لا.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/interactions/is-locked/).



##### الاستخدام

```js
driver.isLocked()
```




##### النتائج

- **&lt;boolean&gt;**
            **<code><var>isLocked</var></code>:** يعود True إذا كان الجهاز مقفلاً، وfalse إذا لم يكن كذلك    

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
      <td>معلمات الأمر التي يمكن أن تحتوي على مفاتيح مثل: remotePath, username, password, method, forceRestart, timeLimit, videoType, videoQuality, videoFps, bitRate, videoSize, bugReport (انظر المزيد من الوصف في وثائق Appium)</td>
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
      <td>المسار إلى الموقع البعيد الذي ينبغي رفع الفيديو الناتج إليه. البروتوكولات المدعومة هي http/https، ftp. هذا الخيار له تأثير فقط إذا كانت هناك عملية تسجيل للشاشة قيد التقدم ولم يتم تعيين معلمة forceRestart إلى true. القيمة الفارغة أو سلسلة فارغة (الإعداد الافتراضي) تعني أنه يجب ترميز محتوى الملف الناتج بتنسيق Base64.</td>
    </tr>
    <tr>
      <td><code><var>username</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>اسم المستخدم للمصادقة عن بُعد.</td>
    </tr>
    <tr>
      <td><code><var>password</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>كلمة المرور للمصادقة عن بُعد.</td>
    </tr>
    <tr>
      <td><code><var>method</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>اسم طريقة تحميل HTTP متعددة الأجزاء. يتم استخدام 'PUT' بشكل افتراضي.</td>
    </tr>
  </tbody>
</table>


##### النتائج

- **&lt;string&gt;**
            **<code><var>response</var></code>:** سلسلة مشفرة بتنسيق Base64. إذا تم تعيين remote_path، فإن الاستجابة تكون سلسلة فارغة    

##### الدعم

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---
## getPerformanceDataTypes
إرجاع أنواع المعلومات لحالة النظام المدعومة للقراءة مثل وحدة المعالجة المركزية (cpu)، والذاكرة (memory)، وحركة الشبكة (network traffic)، والبطارية (battery).<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/performance-data-types/).



##### الاستخدام

```js
driver.getPerformanceDataTypes()
```




##### النتائج

- **&lt;string[]&gt;**
            **<code><var>performanceTypes</var></code>:** أنواع بيانات الأداء المتاحة (cpuinfo|batteryinfo|networkinfo|memoryinfo)    

##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## getPerformanceData
إرجاع معلومات حالة النظام المدعومة للقراءة مثل وحدة المعالجة المركزية (cpu)، والذاكرة (memory)، وحركة الشبكة (network traffic)، والبطارية (battery).<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/get-performance-data/).



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
      <td>نوع حالة النظام الذي تريد قراءته. يجب أن يكون واحدًا من أنواع بيانات الأداء المدعومة</td>
    </tr>
    <tr>
      <td><code><var>dataReadTimeout</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>عدد محاولات القراءة</td>
    </tr>
  </tbody>
</table>


##### النتائج

- **&lt;string[]&gt;**
            **<code><var>performanceData</var></code>:** نوع المعلومات لحالة النظام المدعومة للقراءة مثل وحدة المعالجة المركزية (cpu)، والذاكرة (memory)، وحركة الشبكة (network traffic)، والبطارية (battery)    

##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## pressKeyCode
اضغط على مفتاح معين على الجهاز.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/keys/press-keycode/).



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
      <td>رمز المفتاح للضغط عليه</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>حالة ميتا للضغط على رمز المفتاح معها</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>أعلام للضغط على المفتاح</td>
    </tr>
  </tbody>
</table>




##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## longPressKeyCode
اضغط باستمرار على رمز مفتاح معين على الجهاز.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/keys/long-press-keycode/).



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
      <td>رمز المفتاح للضغط عليه على الجهاز</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>حالة ميتا للضغط على المفتاح</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>أعلام للضغط على المفتاح</td>
    </tr>
  </tbody>
</table>




##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## sendKeyEvent
أرسل رمز مفتاح إلى الجهاز.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).



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
      <td>رمز المفتاح للضغط عليه</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>حالة ميتا للضغط على رمز المفتاح معها</td>
    </tr>
  </tbody>
</table>




##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## rotateDevice
قم بتدوير الجهاز في ثلاثة أبعاد.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-rotation).



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
      <td>إزاحة x للاستخدام كمركز لإيماءة الدوران</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>إزاحة y للاستخدام كمركز لإيماءة الدوران</td>
    </tr>
    <tr>
      <td><code><var>z</var></code></td>
      <td>number</td>
      <td>إزاحة z للاستخدام كمركز لإيماءة الدوران</td>
    </tr>
  </tbody>
</table>




##### الدعم

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## getCurrentActivity
احصل على اسم النشاط الحالي لأندرويد.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-activity/).



##### الاستخدام

```js
driver.getCurrentActivity()
```




##### النتائج

- **&lt;string&gt;**
            **<code><var>activity</var></code>:** اسم النشاط الحالي    

##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## getCurrentPackage
احصل على اسم حزمة أندرويد الحالية.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-package/).



##### الاستخدام

```js
driver.getCurrentPackage()
```




##### النتائج

- **&lt;string&gt;**
            **<code><var>package</var></code>:** اسم الحزمة الحالية    

##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## installApp
قم بتثبيت التطبيق المحدد على الجهاز.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/app/install-app/).



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
      <td>المسار إلى ملف التطبيق .apk</td>
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
      <td>معرف التطبيق (معرف الحزمة لأندرويد، معرف الحزمة لـ iOS)</td>
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
      <td>معرف التطبيق (معرف الحزمة لأندرويد، معرف الحزمة لـ iOS)</td>
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
      <td>معرف التطبيق (معرف الحزمة لأندرويد، معرف الحزمة لـ iOS)</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>object</td>
      <td>خيارات الأمر. مثلاً "timeout": (أندرويد فقط) مهلة لإعادة محاولة إنهاء التطبيق (انظر المزيد في وثائق Appium)</td>
    </tr>
  </tbody>
</table>




##### الدعم

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## isAppInstalled
تحقق مما إذا كان التطبيق المحدد مثبتًا على الجهاز.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/app/is-app-installed/).



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
      <td>معرف التطبيق (معرف الحزمة لأندرويد، معرف الحزمة لـ iOS)</td>
    </tr>
  </tbody>
</table>


##### النتائج

- **&lt;boolean&gt;**
            **<code><var>isAppInstalled</var></code>:** تعيد true إذا كان مثبتًا، وfalse إذا لم يكن كذلك    

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
      <td>معرف التطبيق (معرف الحزمة لأندرويد، معرف الحزمة لـ iOS)</td>
    </tr>
  </tbody>
</table>


##### النتائج

- **&lt;number&gt;**
            **<code><var>appStatus</var></code>:** 0 يعني غير مثبت. 1 يعني غير مشغل. 2 يعني يعمل في الخلفية أو معلق. 3 يعني يعمل في الخلفية. 4 يعني يعمل في المقدمة    

##### الدعم

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## hideKeyboard
إخفاء لوحة المفاتيح الظاهرة.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/keys/hide-keyboard/).



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
      <td>استراتيجية إخفاء لوحة المفاتيح (UIAutomation فقط)، الاستراتيجيات المتاحة - 'press', 'pressKey', 'swipeDown', 'tapOut', 'tapOutside', 'default'</td>
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
ما إذا كانت لوحة المفاتيح الظاهرة معروضة أم لا.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/keys/is-keyboard-shown/).



##### الاستخدام

```js
driver.isKeyboardShown()
```




##### النتائج

- **&lt;boolean&gt;**
            **<code><var>isKeyboardShown</var></code>:** True إذا كانت لوحة المفاتيح معروضة    

##### الدعم

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---
## pushFile
وضع ملف على الجهاز في مكان معين.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/files/push-file/).



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
      <td>المسار لتثبيت البيانات فيه</td>
    </tr>
    <tr>
      <td><code><var>data</var></code></td>
      <td>string</td>
      <td>محتويات الملف في تنسيق base64</td>
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


##### النتائج

- **&lt;string&gt;**
            **<code><var>response</var></code>:** محتويات الملف في تنسيق base64    

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
تبديل حالة خدمة WiFi.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-wifi/).



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
ضبط سرعة الشبكة (محاكي فقط)<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/network/network-speed/).



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
      <td>نوع الشبكة - 'full','gsm', 'edge', 'hscsd', 'gprs', 'umts', 'hsdpa', 'lte', 'evdo'</td>
    </tr>
  </tbody>
</table>




##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## openNotifications
فتح إشعارات أندرويد (محاكي فقط).<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/system/open-notifications/).



##### الاستخدام

```js
driver.openNotifications()
```






##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## startActivity
بدء نشاط أندرويد من خلال توفير اسم الحزمة واسم النشاط.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/activity/start-activity/).



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
      <td>اسم التطبيق للانتظار له</td>
    </tr>
    <tr>
      <td><code><var>appWaitActivity</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>اسم النشاط للانتظار له</td>
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
      <td>وسيطات القصد الإضافية التي سيتم استخدامها لبدء النشاط</td>
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
استرجاع معلومات الظهور والحدود لشريط الحالة وشريط التنقل.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/system/system-bars/).



##### الاستخدام

```js
driver.getSystemBars()
```




##### النتائج

- **&lt;object[]&gt;**
            **<code><var>systemBars</var></code>:** معلومات حول ظهور وحدود شريط الحالة وشريط التنقل    

##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## getDeviceTime
الحصول على الوقت على الجهاز.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/system/system-time/).



##### الاستخدام

```js
driver.getDeviceTime()
```




##### النتائج

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




##### النتائج

- **&lt;*&gt;**
    

##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## touchId
محاكاة حدث [touch id](https://support.apple.com/en-ca/ht201371) (محاكي iOS فقط). لتمكين هذه الميزة، يجب تعيين قدرة allowTouchIdEnroll إلى true ويجب [تسجيل](https://support.apple.com/en-ca/ht201371) المحاكي. عندما تقوم بتعيين allowTouchIdEnroll إلى true، فإنه سيقوم بتسجيل المحاكي بشكل افتراضي. يمكن [تبديل](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/index.html) حالة التسجيل. هذا الاستدعاء سيعمل فقط إذا كانت عملية Appium أو تطبيقها الأصلي (مثل Terminal.app أو Appium.app) لديها حق الوصول إلى إمكانية وصول Mac OS في تفضيلات النظام > الأمان والخصوصية > الخصوصية > إمكانية الوصول.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/simulator/touch-id/).



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
      <td>هل نحن نحاكي لمسة ناجحة (true) أم لمسة فاشلة (false)</td>
    </tr>
  </tbody>
</table>




##### الدعم

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---
## toggleEnrollTouchId
تبديل حالة تسجيل المحاكي [المسجل](https://support.apple.com/en-ca/ht201371) لقبول touchId (محاكي iOS فقط). لتمكين هذه الميزة، يجب تعيين قدرة `allowTouchIdEnroll` إلى true. عندما يتم تعيين `allowTouchIdEnroll` إلى true، فإن المحاكي سيكون مسجلاً بشكل افتراضي، و'تبديل تسجيل Touch ID' يغير حالة التسجيل. هذا الاستدعاء سيعمل فقط إذا كانت عملية Appium أو تطبيقها الأصلي (مثلاً، Terminal.app أو Appium.app) لديه حق الوصول إلى إمكانية وصول Mac OS في تفضيلات النظام > الأمان والخصوصية > الخصوصية > إمكانية الوصول.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/).



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
      <td>يساوي true إذا كان يجب تمكين تسجيل TouchID</td>
    </tr>
  </tbody>
</table>




##### الدعم

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---
## launchApp
تشغيل تطبيق على الجهاز.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/app/launch-app/).
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
إرسال التطبيق الذي يعمل حالياً لهذه الجلسة إلى الخلفية.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/app/background-app/).
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
      <td>المسار إلى ملف السلاسل</td>
    </tr>
  </tbody>
</table>


##### النتائج

- **&lt;object&gt;**
            **<code><var>appStrings</var></code>:** جميع السلاسل المعرفة من تطبيق للغة المحددة واسم ملف السلاسل    

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
      <td>معرف العنصر الذي تم إرجاعه في مكالمة سابقة لـ Find Element(s)</td>
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
      <td>معرف العنصر الذي تم إرجاعه في مكالمة سابقة لـ Find Element(s)</td>
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




##### النتائج

- **&lt;object&gt;**
            **<code><var>settings</var></code>:** JSON بجميع الإعدادات المحددة حالياً، انظر واجهة برمجة تطبيقات الإعدادات    

##### الدعم

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---
## updateSettings
تحديث الإعدادات الحالية على الجهاز.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/session/settings/update-settings/).



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
رد عنوان URL للتنفيذ غير المتزامن لـ JavaScript.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).



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
      <td>الرد لتلقيه على الجهاز</td>
    </tr>
  </tbody>
</table>




##### الدعم

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---
## gsmCall
إجراء مكالمة GSM (محاكي فقط).<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-call/).



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
      <td>الإجراء - 'call', 'accept', 'cancel', 'hold'</td>
    </tr>
  </tbody>
</table>




##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## gsmSignal
ضبط قوة إشارة GSM (محاكي فقط).<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-signal/).



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
      <td>قوة الإشارة في النطاق [0, 4]</td>
    </tr>
    <tr>
      <td><code><var>signalStrengh</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>قوة الإشارة في النطاق [0, 4]. يرجى أيضًا تعيين هذه المعلمة بنفس القيمة إذا كنت تستخدم Appium v1.11.0 أو أقل (انظر https://github.com/appium/appium/issues/12234).</td>
    </tr>
  </tbody>
</table>




##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## powerCapacity
ضبط نسبة البطارية (محاكي فقط).<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_capacity/).



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
      <td>قيمة النسبة المئوية في النطاق [0, 100]</td>
    </tr>
  </tbody>
</table>




##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## powerAC
ضبط حالة شاحن البطارية إلى متصل أو غير متصل (محاكي فقط).<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_ac/).



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
      <td>ضبط الحالة. on أو off</td>
    </tr>
  </tbody>
</table>




##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## gsmVoice
ضبط حالة صوت GSM (محاكي فقط).<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-voice/).



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
      <td>حالة صوت GSM - 'unregistered', 'home', 'roaming', 'searching', 'denied', 'off', 'on'</td>
    </tr>
  </tbody>
</table>




##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## sendSms
محاكاة رسالة SMS (محاكي فقط).<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/network/send-sms/).



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
المصادقة على المستخدمين باستخدام مسح بصمات أصابعهم على المحاكيات المدعومة.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/authentication/finger-print/).



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
      <td>بصمات الأصابع المخزنة في نظام مخزن مفاتيح Android (من 1 إلى 10)</td>
    </tr>
  </tbody>
</table>




##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## setClipboard
ضبط محتوى الحافظة النظامية<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/set-clipboard/).



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
      <td>محتوى الحافظة الفعلي المشفر بتنسيق base64</td>
    </tr>
    <tr>
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>نوع المحتوى للحصول عليه. Plaintext، Image، URL. يدعم Android النص العادي فقط</td>
    </tr>
    <tr>
      <td><code><var>label</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>تسمية بيانات الحافظة لنظام Android</td>
    </tr>
  </tbody>
</table>


##### النتائج

- **&lt;string&gt;**
            **<code><var>response</var></code>:** الرد من خادم Appium    

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
      <td>نوع المحتوى للحصول عليه. Plaintext، Image، URL. يدعم Android النص العادي فقط</td>
    </tr>
  </tbody>
</table>


##### النتائج

- **&lt;string&gt;**
            **<code><var>response</var></code>:** محتوى الحافظة كسلسلة مشفرة بالنظام الأساسي 64 أو سلسلة فارغة إذا كانت الحافظة فارغة    

##### الدعم

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## touchPerform
هذه الوظيفة متاحة فقط من داخل السياق الأصلي. يعمل 'Touch Perform' بشكل مشابه لتفاعلات اللمس الفردية الأخرى، باستثناء أن هذا يسمح لك بربط أكثر من إجراء لمس واحد معًا كأمر واحد. هذا مفيد لأن أوامر Appium يتم إرسالها عبر الشبكة وهناك تأخير بين الأوامر. يمكن أن يجعل هذا التأخير بعض تفاعلات اللمس مستحيلة لأن بعض التفاعلات تحتاج إلى أن تتم في تسلسل واحد. على سبيل المثال، يتطلب السحب الرأسي الضغط لأسفل، والانتقال إلى إحداثي y مختلف، ثم التحرير. لكي يعمل، لا يمكن أن يكون هناك تأخير بين التفاعلات.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/touch-perform/).



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
هذه الوظيفة متاحة فقط داخل سياق أصلي. قم بتنفيذ تسلسل إجراءات اللمس المتعدد.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/multi-touch-perform/).



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
يتيح لك هذا الأمر تحديد سكريبت WebdriverIO كسلسلة نصية ونقله إلى خادم Appium للتنفيذ المحلي على الخادم نفسه. يساعد هذا النهج في تقليل التأخير المحتمل المرتبط بكل أمر. ***لاستخدام هذا الأمر مع Appium 2.0، يجب أن يكون لديك مكون [`execute-driver-plugin`](https://github.com/appium/appium/tree/master/packages/execute-driver-plugin) مثبتًا.***<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/docs/en/commands/session/execute-driver.md).



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
      <td>السكريبت المراد تنفيذه. لديه وصول إلى كائن 'driver' الذي يمثل جلسة WebdriverIO متصلة بالخادم الحالي.</td>
    </tr>
    <tr>
      <td><code><var>type</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>اللغة/الإطار المستخدم في السكريبت. حاليًا، يتم دعم 'webdriverio' فقط وهو الافتراضي.</td>
    </tr>
    <tr>
      <td><code><var>timeout</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>عدد الميلي ثانية التي يجب أن يُسمح للسكريبت بالتشغيل قبل أن يتم إيقافه بواسطة خادم Appium. الافتراضي هو ما يعادل ساعة واحدة.</td>
    </tr>
  </tbody>
</table>


##### النتائج

- **&lt;object&gt;**
            **<code><var>result</var></code>:** كائن يحتوي على حقلين: 'result'، وهو القيمة المرجعة للسكريبت نفسه، و'logs'، الذي يحتوي على 3 حقول داخلية، 'log'، 'warn'، و'error'، والتي تحتوي على مصفوفة من السلاسل النصية التي تم تسجيلها بواسطة console.log، console.warn، و console.error في تنفيذ السكريبت.    


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


##### النتائج

- **&lt;object&gt;**
            **<code><var>result</var></code>:** تجزئة JSON للأحداث مثل `{'commands' => [{'cmd' => 123455, ....}], 'startTime' => 1572954894127, }`.    

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
      <td>اسم البائع. سيكون 'vendor' في 'vendor:event'.</td>
    </tr>
    <tr>
      <td><code><var>event</var></code></td>
      <td>string</td>
      <td>اسم الحدث. سيكون 'event' في 'vendor:event'.</td>
    </tr>
  </tbody>
</table>




##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---
## compareImages
تقوم هذه الميزة بإجراء مقارنات للصور باستخدام إمكانيات إطار OpenCV. يرجى ملاحظة أنه لكي تعمل هذه الوظيفة، يجب تثبيت كل من إطار OpenCV ووحدة opencv4nodejs على الجهاز الذي يعمل عليه خادم Appium. ***علاوة على ذلك، ستحتاج إلى تثبيت مكون [`images-plugin`](https://github.com/appium/appium/tree/master/packages/images-plugin) لاستخدام هذه الميزة مع Appium 2.0.***<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://appium.github.io/appium.io/docs/en/writing-running-appium/image-comparison/).



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
      <td>واحد من أوضاع المقارنة الممكنة: 'matchFeatures'، 'getSimilarity'، 'matchTemplate'. 'matchFeatures' هو الافتراضي.</td>
    </tr>
    <tr>
      <td><code><var>firstImage</var></code></td>
      <td>string</td>
      <td>بيانات الصورة. يتم دعم جميع تنسيقات الصور التي تقبلها مكتبة OpenCV نفسها.</td>
    </tr>
    <tr>
      <td><code><var>secondImage</var></code></td>
      <td>string</td>
      <td>بيانات الصورة. يتم دعم جميع تنسيقات الصور التي تقبلها مكتبة OpenCV نفسها.</td>
    </tr>
    <tr>
      <td><code><var>options=[object Object]</var></code></td>
      <td>object</td>
      <td>يعتمد محتوى هذا القاموس على قيمة `mode` الفعلية. انظر الوثائق على وحدة `appium-support` للحصول على مزيد من التفاصيل. </td>
    </tr>
  </tbody>
</table>


##### النتائج

- **&lt;object&gt;**
            **<code><var>result</var></code>:** يعتمد محتوى القاموس الناتج على قيم `mode` و `options` الفعلية. انظر الوثائق على وحدة `appium-support` للحصول على مزيد من التفاصيل.    


---
## implicitWait
ضبط المدة التي يجب أن ينتظرها السائق عند البحث عن العناصر. عند البحث عن عنصر واحد، يجب على السائق أن يقوم بفحص الصفحة حتى يتم العثور على عنصر أو حتى ينتهي المهلة، أيهما يحدث أولاً. عند البحث عن عناصر متعددة، يجب على السائق أن يقوم بفحص الصفحة حتى يتم العثور على عنصر واحد على الأقل أو حتى ينتهي المهلة، وفي هذه النقطة يجب أن يعيد قائمة فارغة. إذا لم يتم إرسال هذا الأمر أبدًا، يجب على السائق أن يتعامل بشكل افتراضي مع انتظار ضمني قدره 0 مللي ثانية.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



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
تحديد موقع العنصر على الشاشة بمجرد تمرير الشاشة لعرضه.<br /><br />__ملاحظة:__ يعتبر هذا أمرًا داخليًا ويجب استخدامه فقط لتحديد موقع عنصر لتوليد الأحداث الأصلية بشكل صحيح.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



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
      <td>معرف العنصر الذي سيتم توجيه الأمر إليه</td>
    </tr>
  </tbody>
</table>


##### النتائج

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** إحداثيات X و Y للعنصر على الصفحة.    

##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---
## sendKeys
إرسال تسلسل ضربات المفاتيح إلى العنصر النشط<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



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
      <td>تسلسل المفاتيح لكتابته. يجب توفير مصفوفة.</td>
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




##### النتائج

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




##### النتائج

- **&lt;String&gt;**
            **<code><var>engine</var></code>:** اسم محرك IME النشط    

##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## isIMEActivated
يشير إلى ما إذا كان إدخال IME نشطًا في الوقت الحالي<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



##### الاستخدام

```js
driver.isIMEActivated()
```




##### النتائج

- **&lt;Boolean&gt;**
            **<code><var>isActive</var></code>:** true إذا كان إدخال IME متاحًا ونشطًا حاليًا، false في غير ذلك    

##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## deactivateIMEEngine
يقوم بإلغاء تنشيط محرك IME النشط حاليًا.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



##### الاستخدام

```js
driver.deactivateIMEEngine()
```






##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## activateIMEEngine
جعل المحرك متاحًا<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



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
      <td>اسم المحرك لتنشيطه</td>
    </tr>
  </tbody>
</table>




##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## asyncScriptTimeout
ضبط المدة، بالمللي ثانية، التي يُسمح للنصوص البرمجية غير المتزامنة التي يتم تنفيذها بواسطة `/session/:sessionId/execute_async` بالتشغيل قبل إلغائها وإرجاع خطأ `Timeout` إلى العميل.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



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
      <td>مقدار الوقت، بالمللي ثانية، الذي يُسمح للأوامر محدودة الوقت بالتشغيل</td>
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
تحديد حجم العنصر بالبكسل. سيتم إرجاع الحجم ككائن JSON مع خصائص `width` و `height`.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



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
      <td>معرف العنصر الذي سيتم توجيه الأمر إليه</td>
    </tr>
  </tbody>
</table>


##### النتائج

- **&lt;Object&gt;**
            **<code><var>size</var></code>:** عرض وارتفاع العنصر، بالبكسل.    

##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---
## getElementLocation
تحديد موقع العنصر على الصفحة. تشير النقطة `(0, 0)` إلى الزاوية العلوية اليسرى من الصفحة. يتم إرجاع إحداثيات العنصر ككائن JSON بخصائص `x` و `y`.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



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
      <td>معرف العنصر الذي سيتم توجيه الأمر إليه</td>
    </tr>
  </tbody>
</table>


##### النتائج

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** إحداثيات X و Y للعنصر على الصفحة.    

##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---
## touchClick
نقرة واحدة على الجهاز الذي يدعم اللمس.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



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
      <td>معرف العنصر للنقر عليه مرة واحدة.</td>
    </tr>
  </tbody>
</table>




##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---
## touchDown
الإصبع لأسفل على الشاشة.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



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
الإصبع لأعلى على الشاشة.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



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
الضغط المطول على شاشة اللمس باستخدام أحداث حركة الإصبع.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



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
      <td>معرف العنصر للضغط المطول عليه</td>
    </tr>
  </tbody>
</table>




##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---
## touchFlick
النقر على شاشة اللمس باستخدام أحداث حركة الإصبع. يبدأ أمر النقر هذا في موقع معين على الشاشة.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



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
      <td>إزاحة x بالبكسل للنقر بها</td>
    </tr>
    <tr>
      <td><code><var>yoffset</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>إزاحة y بالبكسل للنقر بها</td>
    </tr>
    <tr>
      <td><code><var>element</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>string</td>
      <td>معرف العنصر الذي يبدأ منه النقر</td>
    </tr>
    <tr>
      <td><code><var>speed</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>السرعة بالبكسل في الثانية</td>
    </tr>
    <tr>
      <td><code><var>xspeed</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>سرعة x بالبكسل في الثانية</td>
    </tr>
    <tr>
      <td><code><var>yspeed</var></code><br /><span className="label labelWarning">اختياري</span></td>
      <td>number</td>
      <td>سرعة y بالبكسل في الثانية</td>
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




##### النتائج

- **&lt;String&gt;**
            **<code><var>orientation</var></code>:** الاتجاه الحالي المطابق لقيمة محددة في ScreenOrientation: `LANDSCAPE|PORTRAIT`.    

##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---
## setOrientation
ضبط اتجاه الجهاز<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



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
الحصول على السجل لنوع سجل معين. يتم إعادة ضبط مخزن السجل بعد كل طلب.<br /><br />أمر أبيوم. يمكن العثور على مزيد من التفاصيل في [وثائق البروتوكول الرسمية](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).



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


##### النتائج

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




##### النتائج

- **&lt;String[]&gt;**
            **<code><var>logTypes</var></code>:** قائمة أنواع السجلات المتاحة.    

##### الدعم

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)