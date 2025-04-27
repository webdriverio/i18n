---
id: appium
title: அப்பியம்
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/appium.ts
---

## getAppiumContext
அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts) காணலாம்.

##### பயன்பாடு

```js
driver.getAppiumContext()
```


##### திருப்பி அனுப்புகிறது

- **&lt;Context&gt;**
            **<code><var>context</var></code>:** தற்போதைய சூழலைக் குறிக்கும் சரம் அல்லது 'சூழல் இல்லை' என்பதைக் குறிக்கும் null


---

## switchAppiumContext
அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts) காணலாம்.

##### பயன்பாடு

```js
driver.switchAppiumContext(name)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>கிடைக்கக்கூடிய சூழலைக் குறிக்கும் சரம்</td>
    </tr>
  </tbody>
</table>



---

## getAppiumContexts
அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts) காணலாம்.

##### பயன்பாடு

```js
driver.getAppiumContexts()
```


##### திருப்பி அனுப்புகிறது

- **&lt;Context[]&gt;**
            **<code><var>contexts</var></code>:** கிடைக்கக்கூடிய சூழலைக் குறிக்கும் சரங்களின் வரிசை, எ.கா. 'WEBVIEW', அல்லது 'NATIVE'


---

## shake
சாதனத்தில் அசைவு செயலை நிகழ்த்து.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/interactions/shake/) காணலாம்.

##### பயன்பாடு

```js
driver.shake()
```




##### ஆதரவு

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## lock
சாதனத்தை பூட்டு.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/interactions/lock/) காணலாம்.

##### பயன்பாடு

```js
driver.lock(seconds)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>seconds</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>number</td>
      <td>திரையை எவ்வளவு நேரம் பூட்ட வேண்டும் (iOS மட்டும்)</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## unlock
சாதனத்தை திறக்கவும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/interactions/unlock/) காணலாம்.

##### பயன்பாடு

```js
driver.unlock()
```




##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## isLocked
சாதனம் பூட்டப்பட்டுள்ளதா இல்லையா என்பதைச் சரிபார்க்கவும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/interactions/is-locked/) காணலாம்.

##### பயன்பாடு

```js
driver.isLocked()
```


##### திருப்பி அனுப்புகிறது

- **&lt;boolean&gt;**
            **<code><var>isLocked</var></code>:** சாதனம் பூட்டப்பட்டிருந்தால் True, இல்லையெனில் false

##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## startRecordingScreen
திரையைப் பதிவுசெய்யத் தொடங்கு.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/) காணலாம்.

##### பயன்பாடு

```js
driver.startRecordingScreen(options)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>object</td>
      <td>remotePath, username, password, method, forceRestart, timeLimit, videoType, videoQuality, videoFps, bitRate, videoSize, bugReport போன்ற விசைகளைக் கொண்டிருக்கக்கூடிய கட்டளை அளவுருக்கள் (அப்பியம் ஆவணங்களில் மேலும் விளக்கம் காண்க)</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## stopRecordingScreen
திரைப் பதிவை நிறுத்து<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/stop-recording-screen/) காணலாம்.

##### பயன்பாடு

```js
driver.stopRecordingScreen(remotePath, username, password, method)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>remotePath</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>string</td>
      <td>தொலைநிலை இருப்பிடத்திற்கான பாதை, அங்கு விளைவு வீடியோ பதிவேற்றப்பட வேண்டும். http/https, ftp ஆகிய நெறிமுறைகள் ஆதரிக்கப்படுகின்றன. திரைப் பதிவு செயல்முறை முன்னேற்றத்தில் இருந்தால் மற்றும் forceRestart அளவுரு உண்மையாக அமைக்கப்படவில்லை என்றால் மட்டுமே இந்த விருப்பம் ஒரு விளைவைக் கொண்டிருக்கும். Null அல்லது வெற்று சரம் மதிப்பு (இயல்புநிலை அமைப்பு) விளைவு கோப்பின் உள்ளடக்கம் Base64 ஆக குறியாக்கப்பட வேண்டும் என்பதைக் குறிக்கிறது.</td>
    </tr>
    <tr>
      <td><code><var>username</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>string</td>
      <td>தொலைநிலை அங்கீகாரத்திற்கான பயனரின் பெயர்.</td>
    </tr>
    <tr>
      <td><code><var>password</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>string</td>
      <td>தொலைநிலை அங்கீகாரத்திற்கான கடவுச்சொல்.</td>
    </tr>
    <tr>
      <td><code><var>method</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>string</td>
      <td>http பல்பகுதி பதிவேற்ற முறை பெயர். 'PUT' முறை இயல்பாகப் பயன்படுத்தப்படுகிறது.</td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Base64 குறியாக்கப்பட்ட சரம். remote_path அமைக்கப்பட்டிருந்தால், பதில் வெற்று சரமாக இருக்கும்

##### ஆதரவு

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## getPerformanceDataTypes
cpu, memory, network traffic மற்றும் battery போன்றவற்றைப் படிக்க ஆதரிக்கப்படும் கணினி நிலையின் தகவல் வகைகளைத் திருப்பி அனுப்புகிறது.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/performance-data-types/) காணலாம்.

##### பயன்பாடு

```js
driver.getPerformanceDataTypes()
```


##### திருப்பி அனுப்புகிறது

- **&lt;string[]&gt;**
            **<code><var>performanceTypes</var></code>:** கிடைக்கக்கூடிய செயல்திறன் தரவு வகைகள் (cpuinfo|batteryinfo|networkinfo|memoryinfo)

##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getPerformanceData
cpu, memory, network traffic மற்றும் battery போன்றவற்றைப் படிக்க ஆதரிக்கப்படும் கணினி நிலையின் தகவல்களைத் திருப்பி அனுப்புகிறது.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/get-performance-data/) காணலாம்.

##### பயன்பாடு

```js
driver.getPerformanceData(packageName, dataType, dataReadTimeout)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>packageName</var></code></td>
      <td>string</td>
      <td>பயன்பாட்டின் பேக்கேஜ் பெயர்</td>
    </tr>
    <tr>
      <td><code><var>dataType</var></code></td>
      <td>string</td>
      <td>படிக்க விரும்பும் கணினி நிலையின் வகை. இது ஆதரிக்கப்படும் செயல்திறன் தரவு வகைகளில் ஒன்றாக இருக்க வேண்டும்</td>
    </tr>
    <tr>
      <td><code><var>dataReadTimeout</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>number</td>
      <td>படிக்க முயற்சிகளின் எண்ணிக்கை</td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;string[]&gt;**
            **<code><var>performanceData</var></code>:** cpu, memory, network traffic மற்றும் battery போன்றவற்றைப் படிக்க ஆதரிக்கப்படும் கணினி நிலையின் தகவல் வகை

##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## pressKeyCode
சாதனத்தில் குறிப்பிட்ட விசையை அழுத்தவும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/keys/press-keycode/) காணலாம்.

##### பயன்பாடு

```js
driver.pressKeyCode(keycode, metastate, flags)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>அழுத்த வேண்டிய விசை குறியீடு</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>number</td>
      <td>விசை குறியீட்டை அழுத்துவதற்கான மெட்டா நிலை</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>number</td>
      <td>விசையை அழுத்துவதற்கான கொடிகள்</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## longPressKeyCode
சாதனத்தில் ஒரு குறிப்பிட்ட விசை குறியீட்டை அழுத்தி பிடிக்கவும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/keys/long-press-keycode/) காணலாம்.

##### பயன்பாடு

```js
driver.longPressKeyCode(keycode, metastate, flags)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>சாதனத்தில் அழுத்த வேண்டிய விசை குறியீடு</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>number</td>
      <td>விசையை அழுத்துவதற்கான மெட்டாநிலை</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>number</td>
      <td>விசையை அழுத்துவதற்கான கொடிகள்</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendKeyEvent
சாதனத்திற்கு ஒரு விசை குறியீட்டை அனுப்பவும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints) காணலாம்.

##### பயன்பாடு

```js
driver.sendKeyEvent(keycode, metastate)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>keycode</var></code></td>
      <td>string</td>
      <td>அழுத்த வேண்டிய விசை குறியீடு</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>string</td>
      <td>விசை குறியீட்டை அழுத்துவதற்கான மெட்டா நிலை</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## rotateDevice
சாதனத்தை மூன்று பரிமாணங்களில் சுழற்றவும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-rotation) காணலாம்.

##### பயன்பாடு

```js
driver.rotateDevice(x, y, z)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>சுழற்சி சைகையின் மையத்திற்குப் பயன்படுத்த x ஆஃப்செட்</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>சுழற்சி சைகையின் மையத்திற்குப் பயன்படுத்த y ஆஃப்செட்</td>
    </tr>
    <tr>
      <td><code><var>z</var></code></td>
      <td>number</td>
      <td>சுழற்சி சைகையின் மையத்திற்குப் பயன்படுத்த z ஆஃப்செட்</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentActivity
தற்போதைய Android செயல்பாட்டின் பெயரைப் பெறுக.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-activity/) காணலாம்.

##### பயன்பாடு

```js
driver.getCurrentActivity()
```


##### திருப்பி அனுப்புகிறது

- **&lt;string&gt;**
            **<code><var>activity</var></code>:** தற்போதைய செயல்பாட்டின் பெயர்

##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentPackage
தற்போதைய Android தொகுப்பின் பெயரைப் பெறுக.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-package/) காணலாம்.

##### பயன்பாடு

```js
driver.getCurrentPackage()
```


##### திருப்பி அனுப்புகிறது

- **&lt;string&gt;**
            **<code><var>package</var></code>:** தற்போதைய தொகுப்பின் பெயர்

##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## installApp
கொடுக்கப்பட்ட பயன்பாட்டை சாதனத்தில் நிறுவவும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/app/install-app/) காணலாம்.

##### பயன்பாடு

```js
driver.installApp(appPath)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appPath</var></code></td>
      <td>string</td>
      <td>பயன்பாட்டின் .apk கோப்பிற்கான பாதை</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateApp
சாதனத்தில் கொடுக்கப்பட்ட பயன்பாட்டை செயல்படுத்து<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/app/activate-app/) காணலாம்.

##### பயன்பாடு

```js
driver.activateApp(appId)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>பயன்பாட்டு ஐடி (Android க்கான தொகுப்பு ஐடி, iOS க்கான பண்டில் ஐடி)</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## removeApp
சாதனத்திலிருந்து பயன்பாட்டை அகற்றவும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/app/remove-app/) காணலாம்.

##### பயன்பாடு

```js
driver.removeApp(appId)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>பயன்பாட்டு ஐடி (Android க்கான தொகுப்பு ஐடி, iOS க்கான பண்டில் ஐடி)</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## terminateApp
சாதனத்தில் கொடுக்கப்பட்ட பயன்பாட்டை முடிக்கவும்<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/app/terminate-app/) காணலாம்.

##### பயன்பாடு

```js
driver.terminateApp(appId, options)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>பயன்பாட்டு ஐடி (Android க்கான தொகுப்பு ஐடி, iOS க்கான பண்டில் ஐடி)</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>object</td>
      <td>கட்டளை விருப்பங்கள். எ.கா. "timeout": (Android மட்டுமே) பயன்பாட்டை முடிக்க மீண்டும் முயற்சிக்க நேரம் (அப்பியம் ஆவணங்களில் மேலும் காண்க)</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## isAppInstalled
குறிப்பிட்ட பயன்பாடு சாதனத்தில் நிறுவப்பட்டுள்ளதா என்பதைச் சரிபார்க்கவும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/app/is-app-installed/) காணலாம்.

##### பயன்பாடு

```js
driver.isAppInstalled(appId)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>பயன்பாட்டு ஐடி (Android க்கான தொகுப்பு ஐடி, iOS க்கான பண்டில் ஐடி)</td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;boolean&gt;**
            **<code><var>isAppInstalled</var></code>:** நிறுவப்பட்டிருந்தால் true, நிறுவப்படவில்லை எனில் false என்று திரும்ப அனுப்பு

##### ஆதரவு

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## queryAppState
சாதனத்தில் கொடுக்கப்பட்ட பயன்பாட்டு நிலையைப் பெறுக<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/app/app-state/) காணலாம்.

##### பயன்பாடு

```js
driver.queryAppState(appId)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>பயன்பாட்டு ஐடி (Android க்கான தொகுப்பு ஐடி, iOS க்கான பண்டில் ஐடி)</td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;number&gt;**
            **<code><var>appStatus</var></code>:** 0 என்பது நிறுவப்படவில்லை. 1 என்பது இயங்கவில்லை. 2 என்பது பின்னணியில் இயங்குகிறது அல்லது இடைநிறுத்தப்பட்டது. 3 என்பது பின்னணியில் இயங்குகிறது. 4 என்பது முன்னணியில் இயங்குகிறது

##### ஆதரவு

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## hideKeyboard
மென்மையான விசைப்பலகையை மறைக்கவும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/keys/hide-keyboard/) காணலாம்.

##### பயன்பாடு

```js
driver.hideKeyboard(strategy, key, keyCode, keyName)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>strategy</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>string</td>
      <td>விசைப்பலகை மறைக்கும் உத்தி (UIAutomation மட்டும்), கிடைக்கக்கூடிய உத்திகள் - 'press', 'pressKey', 'swipeDown', 'tapOut', 'tapOutside', 'default'</td>
    </tr>
    <tr>
      <td><code><var>key</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>string</td>
      <td>உத்தி 'pressKey' எனில் விசை மதிப்பு</td>
    </tr>
    <tr>
      <td><code><var>keyCode</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>string</td>
      <td>உத்தி 'pressKey' எனில் விசை குறியீடு</td>
    </tr>
    <tr>
      <td><code><var>keyName</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>string</td>
      <td>உத்தி 'pressKey' எனில் விசை பெயர்</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## isKeyboardShown
மென்மையான விசைப்பலகை காட்டப்படுகிறதா இல்லையா.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/keys/is-keyboard-shown/) காணலாம்.

##### பயன்பாடு

```js
driver.isKeyboardShown()
```


##### திருப்பி அனுப்புகிறது

- **&lt;boolean&gt;**
            **<code><var>isKeyboardShown</var></code>:** விசைப்பலகை காட்டப்பட்டால் உண்மை

##### ஆதரவு

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pushFile
குறிப்பிட்ட இடத்தில் சாதனத்தில் ஒரு கோப்பை வைக்கவும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/files/push-file/) காணலாம்.

##### பயன்பாடு

```js
driver.pushFile(path, data)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>தரவை நிறுவுவதற்கான பாதை</td>
    </tr>
    <tr>
      <td><code><var>data</var></code></td>
      <td>string</td>
      <td>base64 இல் கோப்பின் உள்ளடக்கம்</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pullFile
சாதனத்தின் கோப்பு அமைப்பிலிருந்து ஒரு கோப்பைப் பெறவும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-file/) காணலாம்.

##### பயன்பாடு

```js
driver.pullFile(path)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>கோப்பை இழுக்க சாதனத்தில் உள்ள பாதை</td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;string&gt;**
            **<code><var>response</var></code>:** base64 இல் கோப்பின் உள்ளடக்கம்

##### ஆதரவு

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pullFolder
சாதனத்தின் கோப்பு அமைப்பிலிருந்து ஒரு கோப்புறையைப் பெறவும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-folder/) காணலாம்.

##### பயன்பாடு

```js
driver.pullFolder(path)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>சாதனத்தில் முழு கோப்புறைக்கான பாதை</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## toggleAirplaneMode
சாதனத்தில் விமான பயன்முறையை நிலைமாற்று.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-airplane-mode/) காணலாம்.

##### பயன்பாடு

```js
driver.toggleAirplaneMode()
```




##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleData
தரவு சேவையின் நிலையை மாற்றவும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-data/) காணலாம்.

##### பயன்பாடு

```js
driver.toggleData()
```




##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleWiFi
வைஃபை சேவையின் நிலையை மாற்றவும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-wifi/) காணலாம்.

##### பயன்பாடு

```js
driver.toggleWiFi()
```




##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleLocationServices
இருப்பிட சேவையின் நிலையை மாற்றவும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-location-services/) காணலாம்.

##### பயன்பாடு

```js
driver.toggleLocationServices()
```




##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleNetworkSpeed
நெட்வொர்க் வேகத்தை அமைக்கவும் (எமுலேட்டர் மட்டுமே)<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/network/network-speed/) காணலாம்.

##### பயன்பாடு

```js
driver.toggleNetworkSpeed(netspeed)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>netspeed</var></code></td>
      <td>string</td>
      <td>நெட்வொர்க் வகை - 'full', 'gsm', 'edge', 'hscsd', 'gprs', 'umts', 'hsdpa', 'lte', 'evdo'</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## openNotifications
Android அறிவிப்புகளைத் திறக்கவும் (எமுலேட்டர் மட்டுமே).<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/system/open-notifications/) காணலாம்.

##### பயன்பாடு

```js
driver.openNotifications()
```




##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## startActivity
தொகுப்பு பெயர் மற்றும் செயல்பாட்டு பெயரை வழங்குவதன் மூலம் Android செயல்பாட்டைத் தொடங்கவும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/activity/start-activity/) காணலாம்.

##### பயன்பாடு

```js
driver.startActivity(appPackage, appActivity, appWaitPackage, appWaitActivity, intentAction, intentCategory, intentFlags, optionalIntentArguments, dontStopAppOnReset)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appPackage</var></code></td>
      <td>string</td>
      <td>பயன்பாட்டின் பெயர்</td>
    </tr>
    <tr>
      <td><code><var>appActivity</var></code></td>
      <td>string</td>
      <td>செயல்பாட்டு பெயர்</td>
    </tr>
    <tr>
      <td><code><var>appWaitPackage</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>string</td>
      <td>காத்திருக்க வேண்டிய பயன்பாட்டின் பெயர்</td>
    </tr>
    <tr>
      <td><code><var>appWaitActivity</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>string</td>
      <td>காத்திருக்க வேண்டிய செயல்பாட்டு பெயர்</td>
    </tr>
    <tr>
      <td><code><var>intentAction=android.intent.action.MAIN</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>string</td>
      <td>செயல்பாட்டைத் தொடங்க பயன்படுத்தப்படும் நோக்க செயல்</td>
    </tr>
    <tr>
      <td><code><var>intentCategory=android.intent.category.LAUNCHER</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>string</td>
      <td>செயல்பாட்டைத் தொடங்க பயன்படுத்தப்படும் நோக்க வகை</td>
    </tr>
    <tr>
      <td><code><var>intentFlags=0x10200000</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>string</td>
      <td>செயல்பாட்டைத் தொடங்கப் பயன்படுத்தப்படும் கொடிகள்</td>
    </tr>
    <tr>
      <td><code><var>optionalIntentArguments</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>string</td>
      <td>செயல்பாட்டைத் தொடங்க பயன்படுத்தப்படும் கூடுதல் நோக்க வாதங்கள்</td>
    </tr>
    <tr>
      <td><code><var>dontStopAppOnReset</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>string</td>
      <td>adb ஐப் பயன்படுத்தி பயன்பாட்டைத் தொடங்குவதற்கு முன், சோதனையில் உள்ள பயன்பாட்டின் செயல்முறையை நிறுத்தாது</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSystemBars
நிலை மற்றும் வழிசெலுத்தல் பட்டிகளின் தெரிவுநிலை மற்றும் எல்லைகள் தகவலைப் பெறவும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/system/system-bars/) காணலாம்.

##### பயன்பாடு

```js
driver.getSystemBars()
```


##### திருப்பி அனுப்புகிறது

- **&lt;object[]&gt;**
            **<code><var>systemBars</var></code>:** நிலை மற்றும் வழிசெலுத்தல் பட்டியின் தெரிவுநிலை மற்றும் எல்லைகள் பற்றிய தகவல்

##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDeviceTime
சாதனத்தில் நேரத்தைப் பெறுக.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/system/system-time/) காணலாம்.

##### பயன்பாடு

```js
driver.getDeviceTime()
```


##### திருப்பி அனுப்புகிறது

- **&lt;string&gt;**
            **<code><var>time</var></code>:** சாதனத்தில் நேரம்

##### ஆதரவு

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDisplayDensity
சாதனத்திலிருந்து காட்சி அடர்த்தியைப் பெறுக.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints) காணலாம்.

##### பயன்பாடு

```js
driver.getDisplayDensity()
```


##### திருப்பி அனுப்புகிறது

- **&lt;*&gt;**


##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchId
[டச் ஐடி](https://support.apple.com/en-ca/ht201371) நிகழ்வை உருவகப்படுத்தவும் (iOS சிமுலேட்டர் மட்டுமே). இந்த அம்சத்தை இயக்க, `allowTouchIdEnroll` விரும்பிய திறன் true என அமைக்கப்பட வேண்டும் மற்றும் சிமுலேட்டர் [பதிவுசெய்யப்பட](https://support.apple.com/en-ca/ht201371) வேண்டும். allowTouchIdEnroll ஐ true என அமைக்கும்போது, அது இயல்பாக சிமுலேட்டரைப் பதிவுசெய்யும். பதிவு நிலையை [நிலைமாற்றலாம்](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/index.html). அப்பியம் செயலாக்கம் அல்லது அதன் முதன்மை பயன்பாடு (எ.கா. Terminal.app அல்லது Appium.app) Mac OS அணுகலுக்கு அணுகல் இருந்தால், System Preferences > Security & Privacy > Privacy > Accessibility பட்டியலில் இந்த அழைப்பு மட்டுமே செயல்படும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/simulator/touch-id/) காணலாம்.

##### பயன்பாடு

```js
driver.touchId(match)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>match</var></code></td>
      <td>boolean</td>
      <td>நாங்கள் வெற்றிகரமான தொடுதலை உருவகப்படுத்துகிறோமா (true) அல்லது தோல்வியுற்ற தொடுதலா (false)</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## toggleEnrollTouchId
டச்ஐடி ஏற்க சிமுலேட்டர் [பதிவுசெய்யப்பட்டதை](https://support.apple.com/en-ca/ht201371) நிலைமாற்றவும் (iOS சிமுலேட்டர் மட்டுமே). இந்த அம்சத்தை இயக்க, `allowTouchIdEnroll` விரும்பிய திறன் true என அமைக்கப்பட வேண்டும். `allowTouchIdEnroll` true என அமைக்கப்படும்போது, சிமுலேட்டர் இயல்பாக பதிவுசெய்யப்படும், மேலும் 'Toggle Touch ID Enrollment' பதிவு நிலையை மாற்றுகிறது. அப்பியம் செயல்முறை அல்லது அதன் பெற்றோர் பயன்பாடு (எ.கா., Terminal.app அல்லது Appium.app) System Preferences > Security & Privacy > Privacy > Accessibility பட்டியலில் Mac OS அணுகலுக்கு அணுகல் இருந்தால் மட்டுமே இந்த அழைப்பு செயல்படும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/) காணலாம்.

##### பயன்பாடு

```js
driver.toggleEnrollTouchId(enabled)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>enabled=true</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>boolean</td>
      <td>TouchID பதிவு இயக்கப்பட வேண்டுமானால் true க்கு சமம்</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## launchApp
சாதனத்தில் ஒரு பயன்பாட்டைத் தொடங்கவும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/app/launch-app/) காணலாம்.
:::caution

இந்த நெறிமுறை கட்டளை காலாவதியானது<br />iOS க்கு, `driver.execute('mobile: launchApp', { ... })` ஐப் பயன்படுத்தவும், மற்றும் Android க்கு, `driver.execute('mobile: activateApp', { ... })` ஐப் பயன்படுத்தவும்.
:::

##### பயன்பாடு

```js
driver.launchApp()
```




##### ஆதரவு

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## closeApp
சாதனத்தில் ஒரு பயன்பாட்டை மூடவும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/app/close-app/) காணலாம்.
:::caution

இந்த நெறிமுறை கட்டளை காலாவதியானது<br />இதற்கு பதிலாக `driver.execute('mobile: terminateApp', { ... })` ஐப் பயன்படுத்தவும்
:::

##### பயன்பாடு

```js
driver.closeApp()
```




##### ஆதரவு

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## background
இந்த அமர்வுக்கான தற்போது இயங்கும் பயன்பாட்டை பின்னணிக்கு அனுப்பவும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/app/background-app/) காணலாம்.
:::caution

இந்த நெறிமுறை கட்டளை காலாவதியானது<br />இதற்கு பதிலாக `driver.execute('mobile: backgroundApp', { ... })` ஐப் பயன்படுத்தவும்
:::

##### பயன்பாடு

```js
driver.background(seconds)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>seconds=null</var></code></td>
      <td>number, null</td>
      <td>பயன்பாட்டை மீட்டெடுக்க நேரம் காலாவதி, 'null' எனில் பயன்பாடு மீட்டெடுக்கப்படாது</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## endCoverage
சோதனை பாதுகாப்பு தரவைப் பெறுக.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/app/end-test-coverage/) காணலாம்.

##### பயன்பாடு

```js
driver.endCoverage(intent, path)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>intent</var></code></td>
      <td>string</td>
      <td>ஒளிபரப்புவதற்கான நோக்கம்</td>
    </tr>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>.ec கோப்பிற்கான பாதை</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getStrings
பயன்பாட்டு சரங்களைப் பெறுக.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/app/get-app-strings/) காணலாம்.

##### பயன்பாடு

```js
driver.getStrings(language, stringFile)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>language</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>string</td>
      <td>மொழி குறியீடு</td>
    </tr>
    <tr>
      <td><code><var>stringFile</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>string</td>
      <td>சரம் கோப்பிற்கான பாதை</td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;object&gt;**
            **<code><var>appStrings</var></code>:** குறிப்பிட்ட மொழி மற்றும் சரங்கள் கோப்புப்பெயருக்கான பயன்பாட்டிலிருந்து வரையறுக்கப்பட்ட அனைத்து சரங்களும்

##### ஆதரவு

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## setValueImmediate
அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints) காணலாம்.

##### பயன்பாடு

```js
driver.setValueImmediate(elementId, text)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>கூறுகளைக் கண்டறிய முந்தைய அழைப்பில் திரும்பப்பட்ட உறுப்பின் ஐடி</td>
    </tr>
    <tr>
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>ஒரு உறுப்புக்கு அமைக்க உரை</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## replaceValue
மதிப்பை நேரடியாக உறுப்புக்கு மாற்றவும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints) காணலாம்.

##### பயன்பாடு

```js
driver.replaceValue(elementId, value)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>கூறுகளைக் கண்டறிய முந்தைய அழைப்பில் திரும்பப்பட்ட உறுப்பின் ஐடி</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>உறுப்பில் மாற்ற வேண்டிய மதிப்பு</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSettings
சாதனத்தில் தற்போதைய அமைப்புகளைப் பெறுக.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/session/settings/get-settings/) காணலாம்.

##### பயன்பாடு

```js
driver.getSettings()
```


##### திருப்பி அனுப்புகிறது

- **&lt;object&gt;**
            **<code><var>settings</var></code>:** தற்போது குறிப்பிடப்பட்ட அனைத்து அமைப்புகளின் JSON அகராதி, அமைப்புகள் API ஐப் பார்க்கவும்

##### ஆதரவு

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## updateSettings
சாதனத்தில் தற்போதைய அமைப்பைப் புதுப்பிக்கவும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/session/settings/update-settings/) காணலாம்.

##### பயன்பாடு

```js
driver.updateSettings(settings)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>settings</var></code></td>
      <td>object</td>
      <td>புதுப்பிக்க வேண்டிய அமைப்புகளுடன் விசை/மதிப்பு பொருள்</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## receiveAsyncResponse
ஜாவாஸ்கிரிப்டை ஒத்திசைவற்ற செயலாக்கத்திற்கான கால்பேக் url.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints) காணலாம்.

##### பயன்பாடு

```js
driver.receiveAsyncResponse(response)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>response</var></code></td>
      <td>object</td>
      <td>சாதனத்தில் பெற வேண்டிய பதில்</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## gsmCall
GSM அழைப்பைச் செய்யவும் (எமுலேட்டர் மட்டுமே).<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-call/) காணலாம்.

##### பயன்பாடு

```js
driver.gsmCall(phoneNumber, action)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>அழைக்க வேண்டிய தொலைபேசி எண்</td>
    </tr>
    <tr>
      <td><code><var>action</var></code></td>
      <td>string</td>
      <td>செயல் - 'call', 'accept', 'cancel', 'hold'</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmSignal
GSM சிக்னல் வலிமையை அமைக்கவும் (எமுலேட்டர் மட்டுமே).<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-signal/) காணலாம்.

##### பயன்பாடு

```js
driver.gsmSignal(signalStrength, signalStrengh)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>signalStrength</var></code></td>
      <td>string</td>
      <td>சிக்னல் வலிமை [0, 4] வரம்பில்</td>
    </tr>
    <tr>
      <td><code><var>signalStrengh</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>string</td>
      <td>சிக்னல் வலிமை [0, 4] வரம்பில். Appium v1.11.0 அல்லது குறைவானதைப் பயன்படுத்தினால் இந்த அளவுருவை அதே மதிப்புடன் அமைக்கவும் (https://github.com/appium/appium/issues/12234 ஐப் பார்க்கவும்).</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerCapacity
பேட்டரி சதவீதத்தை அமைக்கவும் (எமுலேட்டர் மட்டுமே).<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_capacity/) காணலாம்.

##### பயன்பாடு

```js
driver.powerCapacity(percent)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>percent</var></code></td>
      <td>number</td>
      <td>[0, 100] வரம்பில் சதவீத மதிப்பு</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerAC
பேட்டரி சார்ஜரின் நிலையை இணைக்கப்பட்டதா அல்லது இல்லையா என்பதை அமைக்கவும் (எமுலேட்டர் மட்டுமே).<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_ac/) காணலாம்.

##### பயன்பாடு

```js
driver.powerAC(state)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>நிலையை அமைக்கவும். on அல்லது off</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmVoice
GSM குரல் நிலையை அமைக்கவும் (எமுலேட்டர் மட்டுமே).<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-voice/) காணலாம்.

##### பயன்பாடு

```js
driver.gsmVoice(state)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>GSM குரலின் நிலை - 'unregistered', 'home', 'roaming', 'searching', 'denied', 'off', 'on'</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendSms
SMS செய்தியை உருவகப்படுத்தவும் (எமுலேட்டர் மட்டுமே).<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/network/send-sms/) காணலாம்.

##### பயன்பாடு

```js
driver.sendSms(phoneNumber, message)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>SMS அனுப்ப வேண்டிய தொலைபேசி எண்</td>
    </tr>
    <tr>
      <td><code><var>message</var></code></td>
      <td>string</td>
      <td>SMS செய்தி</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## fingerPrint
ஆதரிக்கப்படும் எமுலேட்டர்களில் பயனர்களின் விரல் ரேகை ஸ்கேன்களைப் பயன்படுத்தி அங்கீகரிக்கவும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/authentication/finger-print/) காணலாம்.

##### பயன்பாடு

```js
driver.fingerPrint(fingerprintId)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>fingerprintId</var></code></td>
      <td>number</td>
      <td>Android Keystore அமைப்பில் சேமிக்கப்பட்ட விரல் ரேகைகள் (1 முதல் 10 வரை)</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## setClipboard
கணினி கிளிப்போர்டின் உள்ளடக்கத்தை அமைக்கவும்<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/set-clipboard/) காணலாம்.

##### பயன்பாடு

```js
driver.setClipboard(content, contentType, label)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>content</var></code></td>
      <td>string</td>
      <td>உண்மையான base64 குறியாக்கப்பட்ட கிளிப்போர்டு உள்ளடக்கம்</td>
    </tr>
    <tr>
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>string</td>
      <td>பெற உள்ளடக்கத்தின் வகை. Plaintext, Image, URL. Android plaintext மட்டுமே ஆதரிக்கிறது</td>
    </tr>
    <tr>
      <td><code><var>label</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>string</td>
      <td>Android க்கான கிளிப்போர்டு தரவு லேபிள்</td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;string&gt;**
            **<code><var>response</var></code>:** அப்பியம் சேவையகத்திலிருந்து பதில்

##### ஆதரவு

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getClipboard
கணினி கிளிப்போர்டின் உள்ளடக்கத்தைப் பெறுக<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/get-clipboard/) காணலாம்.

##### பயன்பாடு

```js
driver.getClipboard(contentType)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>string</td>
      <td>பெற வேண்டிய உள்ளடக்கத்தின் வகை. Plaintext, Image, URL. Android plaintext மட்டுமே ஆதரிக்கிறது</td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;string&gt;**
            **<code><var>response</var></code>:** கிளிப்போர்டு உள்ளடக்கம் base64-குறியாக்கப்பட்ட சரமாக அல்லது கிளிப்போர்டு காலியாக இருந்தால் வெற்று சரமாகும்

##### ஆதரவு

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchPerform
இந்த செயல்பாடு ஒரு சுதேச சூழலிலிருந்து மட்டுமே கிடைக்கும். 'தொடுதல் செயல்படுத்து' மற்ற தனிப்பட்ட தொடுதல் தொடர்புகளைப் போலவே செயல்படுகிறது, ஆனால் இது ஒரு கட்டளையாக ஒன்றுக்கும் மேற்பட்ட தொடுதல் செயல்களை இணைக்க உங்களை அனுமதிக்கிறது. அப்பியம் கட்டளைகள் நெட்வொர்க் வழியாக அனுப்பப்படுவதால் மற்றும் கட்டளைகளுக்கு இடையில் தாமதம் இருப்பதால் இது பயனுள்ளதாக இருக்கும். இந்த தாமதம் சில தொடு தொடர்புகளை சாத்தியமற்றதாக்கலாம், ஏனெனில் சில தொடர்புகள் ஒரு வரிசையில் செயல்பட வேண்டும். செங்குத்து, எடுத்துக்காட்டாக, அழுத்துதல், வேறு y ஆயத்திற்கு நகர்த்துதல், பின்னர் விடுவித்தல் ஆகியவற்றைக் கொண்டிருக்கும். இது வேலை செய்ய, தொடர்புகளுக்கு இடையில் தாமதம் இருக்க முடியாது.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/touch-perform/) காணலாம்.

##### பயன்பாடு

```js
driver.touchPerform(actions)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>செய்ய வேண்டிய செயலின் வகை (எ.கா. moveTo, release, press, tap, wait)</td>
    </tr>
  </tbody>
</table>

##### உதாரணம்


```js
// சதவீதத்தால் கிடைமட்ட ஸ்வைப் செய்யவும்
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


##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## multiTouchPerform
இந்த செயல்பாடு ஒரு சுதேச சூழலிலிருந்து மட்டுமே கிடைக்கும். பல தொடுதல் செயல் வரிசையை செயல்படுத்தவும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/multi-touch-perform/) காணலாம்.

##### பயன்பாடு

```js
driver.multiTouchPerform(actions)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>செய்ய வேண்டிய செயலின் வகை (எ.கா. moveTo, release, press, tap, wait)</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## executeDriverScript
இந்த கட்டளை உங்களை WebdriverIO ஸ்கிரிப்டை சரமாக குறிப்பிட்டு அப்பியம் சர்வருக்கு உள்ளூர் செயலாக்கத்திற்காக பரிமாற்றம் செய்ய அனுமதிக்கிறது. இந்த அணுகுமுறை ஒவ்வொரு கட்டளையுடனும் தொடர்புடைய சாத்தியமான தாமதத்தைக் குறைக்க உதவுகிறது. ***இந்த கட்டளையை அப்பியம் 2.0 உடன் பயன்படுத்த, [`execute-driver-plugin`](https://github.com/appium/appium/tree/master/packages/execute-driver-plugin) செருகுநிரலை நிறுவியிருக்க வேண்டும்.***<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/appium/appium/blob/master/docs/en/commands/session/execute-driver.md) காணலாம்.

##### பயன்பாடு

```js
driver.executeDriverScript(script, type, timeout)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>செயல்படுத்த வேண்டிய ஸ்கிரிப்ட். தற்போதைய சர்வருடன் இணைக்கப்பட்ட WebdriverIO அமர்வைக் குறிக்கும் 'driver' பொருளுக்கு அணுகல் உள்ளது.</td>
    </tr>
    <tr>
      <td><code><var>type</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>string</td>
      <td>ஸ்கிரிப்டில் பயன்படுத்தப்படும் மொழி/கட்டமைப்பு. தற்போது, 'webdriverio' மட்டுமே ஆதரிக்கப்படுகிறது மற்றும் அது இயல்புநிலையாகும்.</td>
    </tr>
    <tr>
      <td><code><var>timeout</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>number</td>
      <td>அப்பியம் சர்வரால் கொல்லப்படுவதற்கு முன் ஸ்கிரிப்ட் இயங்க அனுமதிக்கப்பட வேண்டிய மில்லிவினாடிகளின் எண்ணிக்கை. 1 மணிநேரத்திற்கு சமமான இயல்புநிலை அமைப்பு.</td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;object&gt;**
            **<code><var>result</var></code>:** இரண்டு புலங்களைக் கொண்ட பொருள்: 'result', இது ஸ்கிரிப்டின் திருப்பி மதிப்பு, மற்றும் 'logs', இது 3 உள் புலங்களைக் கொண்டுள்ளது, 'log', 'warn', மற்றும் 'error', ஸ்கிரிப்டின் செயலாக்கத்தில் console.log, console.warn, மற்றும் console.error மூலம் பதிவு செய்யப்பட்ட சரங்களின் வரிசையைக் கொண்டிருக்கிறது.


---

## getEvents
அப்பியம் சர்வரில் சேமிக்கப்பட்ட நிகழ்வுகளைப் பெறுக.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/get-events.md) காணலாம்.

##### பயன்பாடு

```js
driver.getEvents(type)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string[]</td>
      <td>வகை வழங்கப்பட்டால் அந்த வகையுடன் வடிகட்டப்பட்ட நிகழ்வுகளைப் பெறுக.</td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;object&gt;**
            **<code><var>result</var></code>:** `{'commands' => [{'cmd' => 123455, ....}], 'startTime' => 1572954894127, }` போன்ற நிகழ்வுகளின் JSON அகராதி.

##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## logEvent
ஒரு விருப்ப நிகழ்வைச் சேமிக்கவும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/log-event.md) காணலாம்.

##### பயன்பாடு

```js
driver.logEvent(vendor, event)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>vendor</var></code></td>
      <td>string</td>
      <td>விற்பனையாளரின் பெயர். இது `vendor:event` இல் `vendor` ஆக இருக்கும்.</td>
    </tr>
    <tr>
      <td><code><var>event</var></code></td>
      <td>string</td>
      <td>நிகழ்வின் பெயர். இது `vendor:event` இல் `event` ஆக இருக்கும்.</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## compareImages
இந்த அம்சம் OpenCV கட்டமைப்பின் திறன்களைப் பயன்படுத்தி படங்களை ஒப்பிடுகிறது. இந்த செயல்பாடு செயல்பட, OpenCV கட்டமைப்பு மற்றும் opencv4nodejs தொகுதி ஆகிய இரண்டும் அப்பியம் சர்வர் இயங்கும் எந்திரத்தில் நிறுவப்பட வேண்டும் என்பதை நினைவில் கொள்ளவும். ***மேலும், அப்பியம் 2.0 உடன் இந்த அம்சத்தைப் பயன்படுத்த [`images-plugin`](https://github.com/appium/appium/tree/master/packages/images-plugin) செருகுநிரலை நிறுவியிருக்க வேண்டும்.***<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://appium.github.io/appium.io/docs/en/writing-running-appium/image-comparison/) காணலாம்.

##### பயன்பாடு

```js
driver.compareImages(mode, firstImage, secondImage, options)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mode=matchFeatures</var></code></td>
      <td>string</td>
      <td>சாத்தியமான ஒப்பீட்டு முறைகளில் ஒன்று: 'matchFeatures', 'getSimilarity', 'matchTemplate'. 'matchFeatures' இயல்பாக உள்ளது.</td>
    </tr>
    <tr>
      <td><code><var>firstImage</var></code></td>
      <td>string</td>
      <td>படத் தரவு. OpenCV நூலகம் தானாகவே ஏற்றுக்கொள்ளும் அனைத்து பட வடிவங்களும் ஆதரிக்கப்படுகின்றன.</td>
    </tr>
    <tr>
      <td><code><var>secondImage</var></code></td>
      <td>string</td>
      <td>படத் தரவு. OpenCV நூலகம் தானாகவே ஏற்றுக்கொள்ளும் அனைத்து பட வடிவங்களும் ஆதரிக்கப்படுகின்றன.</td>
    </tr>
    <tr>
      <td><code><var>options=[object Object]</var></code></td>
      <td>object</td>
      <td>இந்த அகராதியின் உள்ளடக்கம் உண்மையான `mode` மதிப்பைப் பொறுத்தது. மேலும் விவரங்களுக்கு `appium-support` தொகுதியின் ஆவணங்களைப் பார்க்கவும். </td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;object&gt;**
            **<code><var>result</var></code>:** விளைவு அகராதியின் உள்ளடக்கம் உண்மையான `mode` மற்றும் `options` மதிப்புகளைப் பொறுத்தது. மேலும் விவரங்களுக்கு `appium-support` தொகுதியின் ஆவணங்களைப் பார்க்கவும்.


---

## implicitWait
உறுப்புகளைத் தேடும்போது இயக்கி காத்திருக்க வேண்டிய நேரத்தை அமைக்கவும். ஒற்றை உறுப்பைத் தேடும்போது, ஒரு உறுப்பு கிடைக்கும் வரை அல்லது நேரம் முடிவடையும் வரை, எது முதலில் நிகழ்ந்தாலும், இயக்கி பக்கத்தை வினவ வேண்டும். பல உறுப்புகளைத் தேடும்போது, குறைந்தபட்சம் ஒரு உறுப்பு கிடைக்கும் வரை அல்லது நேரம் முடிவடையும் வரை இயக்கி பக்கத்தை வினவ வேண்டும், அந்த நேரத்தில் வெற்று பட்டியலைத் திருப்பி அனுப்ப வேண்டும். இந்த கட்டளை ஒருபோதும் அனுப்பப்படவில்லை என்றால், இயக்கி 0ms மறைமுக காத்திருப்புக்கு இயல்புநிலையாக இருக்க வேண்டும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) காணலாம்.

##### பயன்பாடு

```js
driver.implicitWait(ms)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>ஒரு உறுப்பில் காத்திருக்க வேண்டிய மில்லிவினாடிகளின் அளவு.</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLocationInView
திரையில் உள்ள ஒரு உறுப்பு உருளப்பட்ட பிறகு அதன் இருப்பிடத்தைத் தீர்மானிக்கவும்.<br /><br />__குறிப்பு:__ இது ஒரு உள் கட்டளையாகக் கருதப்படுகிறது மற்றும் சரியான சுதேச நிகழ்வுகளை உருவாக்க ஒரு உறுப்பின் இருப்பிடத்தைத் தீர்மானிக்க மட்டுமே பயன்படுத்தப்பட வேண்டும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) காணலாம்.

##### பயன்பாடு

```js
driver.getLocationInView(elementId)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>கட்டளையை வழிநடத்த உறுப்பின் ID</td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** பக்கத்தில் உறுப்புக்கான X மற்றும் Y ஆயங்கள்.

##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## sendKeys
செயலில் உள்ள உறுப்புக்கு விசை அடிகளின் வரிசையை அனுப்பவும்<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) காணலாம்.

##### பயன்பாடு

```js
driver.sendKeys(value)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string[]</td>
      <td>தட்டச்சு செய்ய வேண்டிய விசைகளின் வரிசை. வரிசை வழங்கப்பட வேண்டும்.</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## availableIMEEngines
எந்திரத்தில் உள்ள அனைத்து இயந்திரங்களின் பட்டியலிடுங்கள். ஒரு இயந்திரத்தைப் பயன்படுத்த, அது இந்த பட்டியலில் இருக்க வேண்டும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) காணலாம்.

##### பயன்பாடு

```js
driver.availableIMEEngines()
```


##### திருப்பி அனுப்புகிறது

- **&lt;String[]&gt;**
            **<code><var>engines</var></code>:** கிடைக்கக்கூடிய இயந்திரங்களின் பட்டியல்

##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getActiveIMEEngine
செயலில் உள்ள IME இயந்திரத்தின் பெயரைப் பெறுக. பெயர் சரம் தளம் குறிப்பிட்டது.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) காணலாம்.

##### பயன்பாடு

```js
driver.getActiveIMEEngine()
```


##### திருப்பி அனுப்புகிறது

- **&lt;String&gt;**
            **<code><var>engine</var></code>:** செயலில் உள்ள IME இயந்திரத்தின் பெயர்

##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## isIMEActivated
IME உள்ளீடு தற்போது செயலில் உள்ளதா என்பதைக் குறிக்கிறது<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) காணலாம்.

##### பயன்பாடு

```js
driver.isIMEActivated()
```


##### திருப்பி அனுப்புகிறது

- **&lt;Boolean&gt;**
            **<code><var>isActive</var></code>:** IME உள்ளீடு கிடைக்கிறது மற்றும் தற்போது செயலில் இருந்தால் true, இல்லையெனில் false

##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## deactivateIMEEngine
தற்போது செயலில் உள்ள IME இயந்திரத்தை செயலிழக்கச் செய்கிறது.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) காணலாம்.

##### பயன்பாடு

```js
driver.deactivateIMEEngine()
```




##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateIMEEngine
கிடைக்கக்கூடிய இயந்திரத்தை உருவாக்குங்கள்<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) காணலாம்.

##### பயன்பாடு

```js
driver.activateIMEEngine(engine)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>engine</var></code></td>
      <td>string</td>
      <td>செயல்படுத்த வேண்டிய இயந்திரத்தின் பெயர்</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## asyncScriptTimeout
`/session/:sessionId/execute_async` மூலம் செயல்படுத்தப்படும் ஒத்திசைவற்ற ஸ்கிரிப்ட்கள் நிறுத்தப்படுவதற்கும் கிளையண்டுக்கு `டைம்அவுட்` பிழை திருப்பப்படுவதற்கும் முன் நடைமுறைப்படுத்த அனுமதிக்கப்படும் மில்லிவினாடிகளில் நேரத்தின் அளவை அமைக்கவும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) காணலாம்.

##### பயன்பாடு

```js
driver.asyncScriptTimeout(ms)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>நேரம் வரம்பிட்ட கட்டளைகள் இயங்க அனுமதிக்கப்படும் மில்லிவினாடிகளில் நேரத்தின் அளவு</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## submit
படிவ உறுப்பைச் சமர்ப்பிக்கவும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) காணலாம்.

##### பயன்பாடு

```js
driver.submit(elementId)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>சமர்ப்பிக்க வேண்டிய படிவ உறுப்பின் ID</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementSize
பிக்சல்களில் ஒரு உறுப்பின் அளவைத் தீர்மானிக்கவும். அளவு `width` மற்றும் `height` பண்புகளுடன் JSON பொருளாக திருப்பப்படும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) காணலாம்.

##### பயன்பாடு

```js
driver.getElementSize(elementId)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>கட்டளையை வழிநடத்த உறுப்பின் ID</td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;Object&gt;**
            **<code><var>size</var></code>:** பிக்சல்களில் உறுப்பின் அகலம் மற்றும் உயரம்.

##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementLocation
பக்கத்தில் ஒரு உறுப்பின் இருப்பிடத்தைத் தீர்மானிக்கவும். புள்ளி `(0, 0)` பக்கத்தின் மேல் இடது மூலையைக் குறிக்கிறது. உறுப்பின் ஆயத்தொலைவுகள் `x` மற்றும் `y` பண்புகளுடன் JSON பொருளாக திருப்பப்படும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) காணலாம்.

##### பயன்பாடு

```js
driver.getElementLocation(elementId)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>கட்டளையை வழிநடத்த உறுப்பின் ID</td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** பக்கத்தில் உறுப்புக்கான X மற்றும் Y ஆயங்கள்.

##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchClick
தொடுதல் இயக்கப்பட்ட சாதனத்தில் ஒற்றை தட்டு.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) காணலாம்.

##### பயன்பாடு

```js
driver.touchClick(element)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>ஒற்றை தட்டு செய்ய வேண்டிய உறுப்பின் ID.</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchDown
திரையில் விரல் கீழே.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) காணலாம்.

##### பயன்பாடு

```js
driver.touchDown(x, y)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>திரையில் x ஆயத்தொலைவு</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>திரையில் y ஆயத்தொலைவு</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchUp
திரையில் விரல் மேலே.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) காணலாம்.

##### பயன்பாடு

```js
driver.touchUp(x, y)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>திரையில் x ஆயத்தொலைவு</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>திரையில் y ஆயத்தொலைவு</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchMove
திரையில் விரல் நகருங்கள்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) காணலாம்.

##### பயன்பாடு

```js
driver.touchMove(x, y)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>திரையில் x ஆயத்தொலைவு</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>திரையில் y ஆயத்தொலைவு</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchLongClick
விரல் அசைவு நிகழ்வுகளைப் பயன்படுத்தி தொடு திரையில் நீண்ட நேரம் அழுத்தவும்.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) காணலாம்.

##### பயன்பாடு

```js
driver.touchLongClick(element)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>நீண்ட நேரம் அழுத்த வேண்டிய உறுப்பின் ID</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchFlick
விரல் அசைவு நிகழ்வுகளைப் பயன்படுத்தி தொடு திரையில் துடிக்கவும். இந்த ஃப்ளிக் கட்டளை ஒரு குறிப்பிட்ட திரை இருப்பிடத்தில் தொடங்குகிறது.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) காணலாம்.

##### பயன்பாடு

```js
driver.touchFlick(xoffset, yoffset, element, speed, xspeed, yspeed)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>xoffset</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>number</td>
      <td>டான்ட்லி வேகமாக அசைய வேண்டிய பிக்சல்களில் x ஆஃப்செட்</td>
    </tr>
    <tr>
      <td><code><var>yoffset</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>number</td>
      <td>டான்ட்லி வேகமாக அசைய வேண்டிய பிக்சல்களில் y ஆஃப்செட்</td>
    </tr>
    <tr>
      <td><code><var>element</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>string</td>
      <td>வேகமாக அசைதல் தொடங்கும் உறுப்பின் ID</td>
    </tr>
    <tr>
      <td><code><var>speed</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>number</td>
      <td>வினாடிக்கு பிக்சல்களில் வேகம்</td>
    </tr>
    <tr>
      <td><code><var>xspeed</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>number</td>
      <td>வினாடிக்கு பிக்சல்களில் x வேகம்</td>
    </tr>
    <tr>
      <td><code><var>yspeed</var></code><br /><span className="label labelWarning">விருப்பத்தேர்வு</span></td>
      <td>number</td>
      <td>வினாடிக்கு பிக்சல்களில் y வேகம்</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getOrientation
தற்போதைய சாதன திசை அமைப்பைப் பெறுக.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) காணலாம்.

##### பயன்பாடு

```js
driver.getOrientation()
```


##### திருப்பி அனுப்புகிறது

- **&lt;String&gt;**
            **<code><var>orientation</var></code>:** ScreenOrientation இல் வரையறுக்கப்பட்ட மதிப்பிற்கு ஏற்ப தற்போதைய திசை அமைப்பு: `LANDSCAPE|PORTRAIT`.

##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## setOrientation
சாதன திசை அமைப்பை அமைக்கவும்<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) காணலாம்.

##### பயன்பாடு

```js
driver.setOrientation(orientation)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>orientation</var></code></td>
      <td>string</td>
      <td>ScreenOrientation இல் வரையறுக்கப்பட்ட புதிய உலாவி திசை அமைப்பு: `LANDSCAPE|PORTRAIT`</td>
    </tr>
  </tbody>
</table>


##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogs
கொடுக்கப்பட்ட பதிவு வகைக்கான பதிவைப் பெறுங்கள். ஒவ்வொரு கோரிக்கைக்குப் பிறகும் பதிவு பஃபர் மீட்டமைக்கப்படுகிறது.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) காணலாம்.

##### பயன்பாடு

```js
driver.getLogs(type)
```


##### அளபுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>பதிவு வகை</td>
    </tr>
  </tbody>
</table>


##### திருப்பி அனுப்புகிறது

- **&lt;Object[]&gt;**
            **<code><var>logs</var></code>:** பதிவு உள்ளீடுகளின் பட்டியல்.

##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogTypes
கிடைக்கக்கூடிய பதிவு வகைகளைப் பெறுக.<br /><br />அப்பியம் கட்டளை. மேலும் விவரங்கள் [அதிகாரப்பூர்வ நெறிமுறை ஆவணங்களில்](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints) காணலாம்.

##### பயன்பாடு

```js
driver.getLogTypes()
```


##### திருப்பி அனுப்புகிறது

- **&lt;String[]&gt;**
            **<code><var>logTypes</var></code>:** கிடைக்கக்கூடிய பதிவு வகைகளின் பட்டியல்.

##### ஆதரவு

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)
