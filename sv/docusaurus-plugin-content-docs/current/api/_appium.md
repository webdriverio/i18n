---
id: appium
title: Appium
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/appium.ts
---

## getAppiumContext
Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### Användning

```js
driver.getAppiumContext()
```


##### Returnerar

- **&lt;Context&gt;**
            **<code><var>context</var></code>:** en sträng som representerar den aktuella kontexten eller null som representerar 'ingen kontext'


---

## switchAppiumContext
Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### Användning

```js
driver.switchAppiumContext(name)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>en sträng som representerar en tillgänglig kontext</td>
    </tr>
  </tbody>
</table>



---

## getAppiumContexts
Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### Användning

```js
driver.getAppiumContexts()
```


##### Returnerar

- **&lt;Context[]&gt;**
            **<code><var>contexts</var></code>:** en array av strängar som representerar tillgängliga kontexter, t.ex. 'WEBVIEW' eller 'NATIVE'


---

## shake
Utför en skakningsåtgärd på enheten.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/interactions/shake/).

##### Användning

```js
driver.shake()
```




##### Stöd

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## lock
Lås enheten.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/interactions/lock/).

##### Användning

```js
driver.lock(seconds)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>seconds</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>number</td>
      <td>hur länge skärmen ska låsas (endast iOS)</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## unlock
Lås upp enheten.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/interactions/unlock/).

##### Användning

```js
driver.unlock()
```




##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## isLocked
Kontrollera om enheten är låst eller inte.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/interactions/is-locked/).

##### Användning

```js
driver.isLocked()
```


##### Returnerar

- **&lt;boolean&gt;**
            **<code><var>isLocked</var></code>:** True om enheten är låst, false om inte

##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## startRecordingScreen
Börja spela in skärmen.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/).

##### Användning

```js
driver.startRecordingScreen(options)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>object</td>
      <td>kommandoparametrar som kan innehålla nycklar som: remotePath, username, password, method, forceRestart, timeLimit, videoType, videoQuality, videoFps, bitRate, videoSize, bugReport (se mer beskrivning i Appium-dokumentationen)</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## stopRecordingScreen
Avsluta skärminspelning<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/stop-recording-screen/).

##### Användning

```js
driver.stopRecordingScreen(remotePath, username, password, method)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>remotePath</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>string</td>
      <td>Sökvägen till fjärrplatsen, där den resulterande videon ska laddas upp. Följande protokoll stöds http/https, ftp. Detta alternativ har endast effekt om det finns en skärminspelningsprocess pågående och forceRestart-parametern inte är inställd på true. Null eller tom sträng värde (standardinställningen) betyder att innehållet i resultatfilen ska kodas som Base64.</td>
    </tr>
    <tr>
      <td><code><var>username</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>string</td>
      <td>Namnet på användaren för fjärrauthentisering.</td>
    </tr>
    <tr>
      <td><code><var>password</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>string</td>
      <td>Lösenordet för fjärrauthentisering.</td>
    </tr>
    <tr>
      <td><code><var>method</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>string</td>
      <td>HTTP-multipart uppladdningsmetodnamn. 'PUT' används som standard.</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Base64-kodad sträng. Om remote_path är inställt är svaret en tom sträng

##### Stöd

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## getPerformanceDataTypes
Returnerar informationstyper om systemets tillstånd som stöds för att läsa som cpu, minne, nätverkstrafik och batteri.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/performance-data-types/).

##### Användning

```js
driver.getPerformanceDataTypes()
```


##### Returnerar

- **&lt;string[]&gt;**
            **<code><var>performanceTypes</var></code>:** De tillgängliga prestandadatatyperna (cpuinfo|batteryinfo|networkinfo|memoryinfo)

##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getPerformanceData
Returnerar information om systemets tillstånd som stöds för att läsa som cpu, minne, nätverkstrafik och batteri.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/get-performance-data/).

##### Användning

```js
driver.getPerformanceData(packageName, dataType, dataReadTimeout)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>packageName</var></code></td>
      <td>string</td>
      <td>paketnamnet för applikationen</td>
    </tr>
    <tr>
      <td><code><var>dataType</var></code></td>
      <td>string</td>
      <td>typen av systemtillstånd som ska läsas. Det bör vara en av de stödda prestandadatatyperna</td>
    </tr>
    <tr>
      <td><code><var>dataReadTimeout</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>number</td>
      <td>antalet försök att läsa</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;string[]&gt;**
            **<code><var>performanceData</var></code>:** Informationstypen för systemets tillstånd som stöds för att läsa som cpu, minne, nätverkstrafik och batteri

##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## pressKeyCode
Tryck på en särskild tangent på enheten.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/keys/press-keycode/).

##### Användning

```js
driver.pressKeyCode(keycode, metastate, flags)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>tangentbordskod att trycka på</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>number</td>
      <td>meta-tillstånd att trycka på tangentbordskoden med</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>number</td>
      <td>flaggor för knapptryckningen</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## longPressKeyCode
Tryck och håll en specifik tangentkod på enheten.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/keys/long-press-keycode/).

##### Användning

```js
driver.longPressKeyCode(keycode, metastate, flags)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>tangentkod att trycka på enheten</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>number</td>
      <td>metatillstånd för knapptryckningen</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>number</td>
      <td>flaggor för knapptryckningen</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendKeyEvent
Skicka en tangentkod till enheten.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Användning

```js
driver.sendKeyEvent(keycode, metastate)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>keycode</var></code></td>
      <td>string</td>
      <td>tangentkod att trycka på</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>string</td>
      <td>meta-tillstånd att trycka på tangentbordskoden med</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## rotateDevice
Rotera enheten i tre dimensioner.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-rotation).

##### Användning

```js
driver.rotateDevice(x, y, z)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>x-offset att använda för mitten av roteringsgestens centrum</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>y-offset att använda för mitten av roteringsgestens centrum</td>
    </tr>
    <tr>
      <td><code><var>z</var></code></td>
      <td>number</td>
      <td>z-offset att använda för mitten av roteringsgestens centrum</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentActivity
Hämta namnet på den aktuella Android-aktiviteten.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-activity/).

##### Användning

```js
driver.getCurrentActivity()
```


##### Returnerar

- **&lt;string&gt;**
            **<code><var>activity</var></code>:** Namn på den aktuella aktiviteten

##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentPackage
Hämta namnet på det aktuella Android-paketet.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-package/).

##### Användning

```js
driver.getCurrentPackage()
```


##### Returnerar

- **&lt;string&gt;**
            **<code><var>package</var></code>:** Namn på det aktuella paketet

##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## installApp
Installera den angivna appen på enheten.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/install-app/).

##### Användning

```js
driver.installApp(appPath)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appPath</var></code></td>
      <td>string</td>
      <td>sökväg till programfilen .apk</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateApp
Aktivera den givna appen på enheten<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/activate-app/).

##### Användning

```js
driver.activateApp(appId)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>App-ID (paket-ID för Android, bundle-ID för iOS)</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## removeApp
Ta bort en app från enheten.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/remove-app/).

##### Användning

```js
driver.removeApp(appId)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>App-ID (paket-ID för Android, bundle-ID för iOS)</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## terminateApp
Avsluta den angivna appen på enheten<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/terminate-app/).

##### Användning

```js
driver.terminateApp(appId, options)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>App-ID (paket-ID för Android, bundle-ID för iOS)</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>object</td>
      <td>Kommandoalternativ. T.ex. "timeout": (Endast Android) Timeout för att försöka avsluta appen igen (se mer i Appium-dokumentationen)</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## isAppInstalled
Kontrollera om den angivna appen är installerad på enheten.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/is-app-installed/).

##### Användning

```js
driver.isAppInstalled(appId)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>App-ID (paket-ID för Android, bundle-ID för iOS)</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;boolean&gt;**
            **<code><var>isAppInstalled</var></code>:** Returnerar true om installerad, false om inte

##### Stöd

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## queryAppState
Hämta den givna appens status på enheten<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/app-state/).

##### Användning

```js
driver.queryAppState(appId)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>App-ID (paket-ID för Android, bundle-ID för iOS)</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;number&gt;**
            **<code><var>appStatus</var></code>:** 0 är inte installerad. 1 är inte igång. 2 körs i bakgrunden eller suspenderad. 3 körs i bakgrunden. 4 körs i förgrunden

##### Stöd

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## hideKeyboard
Dölj tangentbordet.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/keys/hide-keyboard/).

##### Användning

```js
driver.hideKeyboard(strategy, key, keyCode, keyName)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>strategy</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>string</td>
      <td>dölj tangentbordsstrategi (endast UIAutomation), tillgängliga strategier - 'press', 'pressKey', 'swipeDown', 'tapOut', 'tapOutside', 'default'</td>
    </tr>
    <tr>
      <td><code><var>key</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>string</td>
      <td>nyckelvärde om strategin är 'pressKey'</td>
    </tr>
    <tr>
      <td><code><var>keyCode</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>string</td>
      <td>nyckelkod om strategin är 'pressKey'</td>
    </tr>
    <tr>
      <td><code><var>keyName</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>string</td>
      <td>nyckelnamn om strategin är 'pressKey'</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## isKeyboardShown
Om det mjuka tangentbordet visas eller inte.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/keys/is-keyboard-shown/).

##### Användning

```js
driver.isKeyboardShown()
```


##### Returnerar

- **&lt;boolean&gt;**
            **<code><var>isKeyboardShown</var></code>:** True om tangentbordet visas

##### Stöd

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pushFile
Placera en fil på enheten på en särskild plats.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/files/push-file/).

##### Användning

```js
driver.pushFile(path, data)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>sökväg för att installera datan till</td>
    </tr>
    <tr>
      <td><code><var>data</var></code></td>
      <td>string</td>
      <td>innehållet i filen i base64</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pullFile
Hämta en fil från enhetens filsystem.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-file/).

##### Användning

```js
driver.pullFile(path)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>sökväg på enheten att hämta fil från</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Innehåll i filen i base64

##### Stöd

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pullFolder
Hämta en mapp från enhetens filsystem.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-folder/).

##### Användning

```js
driver.pullFolder(path)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>sökväg till en hel mapp på enheten</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## toggleAirplaneMode
Växla flygplansläge på enheten.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-airplane-mode/).

##### Användning

```js
driver.toggleAirplaneMode()
```




##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleData
Växla tillståndet för datatjänsten.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-data/).

##### Användning

```js
driver.toggleData()
```




##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleWiFi
Växla tillståndet för WiFi-tjänsten.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-wifi/).

##### Användning

```js
driver.toggleWiFi()
```




##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleLocationServices
Växla tillståndet för platstjänsten.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-location-services/).

##### Användning

```js
driver.toggleLocationServices()
```




##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleNetworkSpeed
Ställ in nätverkshastighet (endast emulator)<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/network/network-speed/).

##### Användning

```js
driver.toggleNetworkSpeed(netspeed)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>netspeed</var></code></td>
      <td>string</td>
      <td>Nätverkstyp - 'full','gsm', 'edge', 'hscsd', 'gprs', 'umts', 'hsdpa', 'lte', 'evdo'</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## openNotifications
Öppna Android-aviseringar (endast emulator).<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/system/open-notifications/).

##### Användning

```js
driver.openNotifications()
```




##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## startActivity
Starta en Android-aktivitet genom att ange paketnamn och aktivitetsnamn.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/activity/start-activity/).

##### Användning

```js
driver.startActivity(appPackage, appActivity, appWaitPackage, appWaitActivity, intentAction, intentCategory, intentFlags, optionalIntentArguments, dontStopAppOnReset)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appPackage</var></code></td>
      <td>string</td>
      <td>appens namn</td>
    </tr>
    <tr>
      <td><code><var>appActivity</var></code></td>
      <td>string</td>
      <td>aktivitetens namn</td>
    </tr>
    <tr>
      <td><code><var>appWaitPackage</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>string</td>
      <td>namn på app att vänta på</td>
    </tr>
    <tr>
      <td><code><var>appWaitActivity</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>string</td>
      <td>namn på aktivitet att vänta på</td>
    </tr>
    <tr>
      <td><code><var>intentAction=android.intent.action.MAIN</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>string</td>
      <td>intent-åtgärd som används för att starta aktiviteten</td>
    </tr>
    <tr>
      <td><code><var>intentCategory=android.intent.category.LAUNCHER</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>string</td>
      <td>intent-kategori som används för att starta aktiviteten</td>
    </tr>
    <tr>
      <td><code><var>intentFlags=0x10200000</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>string</td>
      <td>flaggor som används för att starta aktiviteten</td>
    </tr>
    <tr>
      <td><code><var>optionalIntentArguments</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>string</td>
      <td>ytterligare intent-argument som används för att starta aktiviteten</td>
    </tr>
    <tr>
      <td><code><var>dontStopAppOnReset</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>string</td>
      <td>stoppar inte processen för appen som testas, innan appen startas med adb</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSystemBars
Hämta synlighets- och begränsningsinformation för status- och navigeringsfälten.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/system/system-bars/).

##### Användning

```js
driver.getSystemBars()
```


##### Returnerar

- **&lt;object[]&gt;**
            **<code><var>systemBars</var></code>:** Information om synlighet och gränser för status- och navigeringsfält

##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDeviceTime
Hämta tiden på enheten.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/system/system-time/).

##### Användning

```js
driver.getDeviceTime()
```


##### Returnerar

- **&lt;string&gt;**
            **<code><var>time</var></code>:** Tid på enheten

##### Stöd

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDisplayDensity
Hämta skärmens densitet från enheten.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Användning

```js
driver.getDisplayDensity()
```


##### Returnerar

- **&lt;*&gt;**


##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchId
Simulera en [touch id](https://support.apple.com/en-ca/ht201371)-händelse (endast iOS Simulator). För att aktivera denna funktion måste desired capability `allowTouchIdEnroll` vara inställd på true och Simulatorn måste vara [registrerad](https://support.apple.com/en-ca/ht201371). När du ställer in allowTouchIdEnroll till true, kommer det att sätta Simulatorn till att vara registrerad som standard. Registreringstillståndet kan [växlas](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/index.html). Detta anrop fungerar endast om Appium-processen eller dess föräldraapplikation (t.ex. Terminal.app eller Appium.app) har tillgång till Mac OS-tillgänglighet i Systeminställningar > Säkerhet och integritet > Integritet > Tillgänglighet-listan.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/simulator/touch-id/).

##### Användning

```js
driver.touchId(match)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>match</var></code></td>
      <td>boolean</td>
      <td>simulerar vi en lyckad touch (true) eller en misslyckad touch (false)</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## toggleEnrollTouchId
Växla simulatorn mellan att vara [registrerad](https://support.apple.com/en-ca/ht201371) för att acceptera touchId (endast iOS Simulator). För att aktivera denna funktion måste desired capability `allowTouchIdEnroll` vara inställd på true. När `allowTouchIdEnroll` är inställd på true kommer Simulatorn att registreras som standard, och 'Toggle Touch ID Enrollment' ändrar registreringstillståndet. Detta anrop fungerar endast om Appium-processen eller dess föräldraapplikation (t.ex. Terminal.app eller Appium.app) har tillgång till Mac OS-tillgänglighet i Systeminställningar > Säkerhet och integritet > Integritet > Tillgänglighet-listan.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/).

##### Användning

```js
driver.toggleEnrollTouchId(enabled)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>enabled=true</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>boolean</td>
      <td>lika med true om TouchID-registrering ska aktiveras</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## launchApp
Starta en app på enheten.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/launch-app/).
:::caution

Detta protokollkommando är föråldrat<br />För iOS, använd `driver.execute('mobile: launchApp', { ... })`, och för Android, använd `driver.execute('mobile: activateApp', { ... })`.
:::

##### Användning

```js
driver.launchApp()
```




##### Stöd

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## closeApp
Stäng en app på enheten.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/close-app/).
:::caution

Detta protokollkommando är föråldrat<br />Använd `driver.execute('mobile: terminateApp', { ... })` istället
:::

##### Användning

```js
driver.closeApp()
```




##### Stöd

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## background
Skicka den för närvarande körande appen för denna session till bakgrunden.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/background-app/).
:::caution

Detta protokollkommando är föråldrat<br />Använd `driver.execute('mobile: backgroundApp', { ... })` istället
:::

##### Användning

```js
driver.background(seconds)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>seconds=null</var></code></td>
      <td>number, null</td>
      <td>timeout för att återställa appen, om 'null' kommer appen inte att återställas</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## endCoverage
Hämta testens täckningsdata.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/end-test-coverage/).

##### Användning

```js
driver.endCoverage(intent, path)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>intent</var></code></td>
      <td>string</td>
      <td>intent att sända</td>
    </tr>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>sökväg till .ec-fil</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getStrings
Hämta app-strängar.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/get-app-strings/).

##### Användning

```js
driver.getStrings(language, stringFile)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>language</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>string</td>
      <td>språkkod</td>
    </tr>
    <tr>
      <td><code><var>stringFile</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>string</td>
      <td>sökväg till strängfilen</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;object&gt;**
            **<code><var>appStrings</var></code>:** alla definierade strängar från en app för det angivna språket och strängfilnamnet

##### Stöd

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## setValueImmediate
Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Användning

```js
driver.setValueImmediate(elementId, text)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID för ett element som returnerades i ett tidigare anrop till Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>text att ange för ett element</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## replaceValue
Ersätt värdet för elementet direkt.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Användning

```js
driver.replaceValue(elementId, value)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID för ett element som returnerades i ett tidigare anrop till Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>värde att ersätta på elementet</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSettings
Hämta de aktuella inställningarna på enheten.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/session/settings/get-settings/).

##### Användning

```js
driver.getSettings()
```


##### Returnerar

- **&lt;object&gt;**
            **<code><var>settings</var></code>:** JSON-hash av alla för närvarande specificerade inställningar, se Settings API

##### Stöd

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## updateSettings
Uppdatera den aktuella inställningen på enheten.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/session/settings/update-settings/).

##### Användning

```js
driver.updateSettings(settings)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>settings</var></code></td>
      <td>object</td>
      <td>nyckel/värde-objekt med inställningar att uppdatera</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## receiveAsyncResponse
Callback-url för asynkron körning av JavaScript.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Användning

```js
driver.receiveAsyncResponse(response)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>response</var></code></td>
      <td>object</td>
      <td>svar att ta emot på enheten</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## gsmCall
Gör GSM-samtal (endast emulator).<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-call/).

##### Användning

```js
driver.gsmCall(phoneNumber, action)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>telefonnumret att ringa till</td>
    </tr>
    <tr>
      <td><code><var>action</var></code></td>
      <td>string</td>
      <td>Åtgärden - 'call', 'accept', 'cancel', 'hold'</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmSignal
Ställ in GSM-signalstyrka (endast emulator).<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-signal/).

##### Användning

```js
driver.gsmSignal(signalStrength, signalStrengh)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>signalStrength</var></code></td>
      <td>string</td>
      <td>signalstyrka i intervallet [0, 4]</td>
    </tr>
    <tr>
      <td><code><var>signalStrengh</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>string</td>
      <td>signalstyrka i intervallet [0, 4]. Vänligen sätt även denna parameter med samma värde om du använder Appium v1.11.0 eller lägre (se https://github.com/appium/appium/issues/12234).</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerCapacity
Ställ in batteriprocenten (endast emulator).<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_capacity/).

##### Användning

```js
driver.powerCapacity(percent)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>percent</var></code></td>
      <td>number</td>
      <td>procentvärde i intervallet [0, 100]</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerAC
Ställ in tillståndet för batteriladdaren till ansluten eller inte (endast emulator).<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_ac/).

##### Användning

```js
driver.powerAC(state)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>ange tillståndet. on eller off</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmVoice
Ställ in GSM-rösttillstånd (endast emulator).<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-voice/).

##### Användning

```js
driver.gsmVoice(state)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>tillstånd för GSM-röst - 'unregistered', 'home', 'roaming', 'searching', 'denied', 'off', 'on'</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendSms
Simulera ett SMS-meddelande (endast emulator).<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/network/send-sms/).

##### Användning

```js
driver.sendSms(phoneNumber, message)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>telefonnumret att skicka SMS till</td>
    </tr>
    <tr>
      <td><code><var>message</var></code></td>
      <td>string</td>
      <td>SMS-meddelandet</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## fingerPrint
Autentisera användare genom att använda deras fingeravtrycksskanningar på stödda emulatorer.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/authentication/finger-print/).

##### Användning

```js
driver.fingerPrint(fingerprintId)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>fingerprintId</var></code></td>
      <td>number</td>
      <td>fingeravtryck lagrade i Android Keystore-systemet (från 1 till 10)</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## setClipboard
Ställ in innehållet i systemets urklipp<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/set-clipboard/).

##### Användning

```js
driver.setClipboard(content, contentType, label)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>content</var></code></td>
      <td>string</td>
      <td>Det faktiska Base64-kodade urklippsinnehållet</td>
    </tr>
    <tr>
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>string</td>
      <td>Typen av innehåll att hämta. Plaintext, Image, URL. Android stöder endast plaintext</td>
    </tr>
    <tr>
      <td><code><var>label</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>string</td>
      <td>Etiketten för urklippsdata för Android</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Svar från Appium-servern

##### Stöd

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getClipboard
Hämta innehållet i systemets urklipp<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/get-clipboard/).

##### Användning

```js
driver.getClipboard(contentType)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>string</td>
      <td>Typen av innehåll att hämta. Plaintext, Image, URL. Android stöder endast plaintext</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Urklippsinnehåll som base64-kodad sträng eller en tom sträng om urklippet är tomt

##### Stöd

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchPerform
Denna funktionalitet är endast tillgänglig från en ursprunglig kontext. 'Touch Perform' fungerar liknande som de andra enskilda beröringsfunktionerna, förutom att detta låter dig kedja ihop mer än en beröringshändelse som ett kommando. Detta är användbart eftersom Appium-kommandon skickas över nätverket och det finns latens mellan kommandon. Denna latens kan göra vissa beröringsfunktioner omöjliga eftersom vissa interaktioner behöver utföras i en sekvens. Vertikal, till exempel, kräver att du trycker ner, flyttar till en annan y-koordinat och sedan släpper. För att det ska fungera får det inte finnas någon fördröjning mellan interaktionerna.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/touch-perform/).

##### Användning

```js
driver.touchPerform(actions)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>Typen av åtgärd att utföra (t.ex. moveTo, release, press, tap, wait)</td>
    </tr>
  </tbody>
</table>

##### Exempel


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


##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## multiTouchPerform
Denna funktionalitet är endast tillgänglig från en ursprunglig kontext. Utför en multiberöringssekvens.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/multi-touch-perform/).

##### Användning

```js
driver.multiTouchPerform(actions)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>Typen av åtgärd att utföra (t.ex. moveTo, release, press, tap, wait)</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## executeDriverScript
Detta kommando gör det möjligt för dig att ange ett WebdriverIO-skript som en sträng och överföra det till Appium-servern för lokal körning på själva servern. Detta tillvägagångssätt hjälper till att minimera potentiell latens associerad med varje kommando. ***För att använda detta kommando med Appium 2.0 måste du ha [`execute-driver-plugin`](https://github.com/appium/appium/tree/master/packages/execute-driver-plugin) pluginen installerad.***<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/docs/en/commands/session/execute-driver.md).

##### Användning

```js
driver.executeDriverScript(script, type, timeout)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>Skriptet att köra. Det har tillgång till ett 'driver' objekt som representerar en WebdriverIO-session ansluten till den aktuella servern.</td>
    </tr>
    <tr>
      <td><code><var>type</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>string</td>
      <td>Språket/ramverket som används i skriptet. För närvarande stöds endast 'webdriverio' och är standard.</td>
    </tr>
    <tr>
      <td><code><var>timeout</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>number</td>
      <td>Antalet millisekunder som skriptet ska tillåtas köra innan det avslutas av Appium-servern. Standardvärdet är motsvarande 1 timme.</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;object&gt;**
            **<code><var>result</var></code>:** Ett objekt som innehåller två fält: 'result', som är returvärdet för själva skriptet, och 'logs', som innehåller 3 inre fält, 'log', 'warn' och 'error', som innehåller en array av strängar loggade av console.log, console.warn och console.error i skriptets körning.


---

## getEvents
Hämta händelser lagrade i Appium-servern.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/get-events.md).

##### Användning

```js
driver.getEvents(type)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string[]</td>
      <td>Hämta händelser som filtreras med typen om typen är angiven.</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;object&gt;**
            **<code><var>result</var></code>:** En JSON-hash av händelser som `{'commands' => [{'cmd' => 123455, ....}], 'startTime' => 1572954894127, }`.

##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## logEvent
Lagra en anpassad händelse.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/log-event.md).

##### Användning

```js
driver.logEvent(vendor, event)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>vendor</var></code></td>
      <td>string</td>
      <td>Namnet på leverantören. Det kommer att vara `vendor` i `vendor:event`.</td>
    </tr>
    <tr>
      <td><code><var>event</var></code></td>
      <td>string</td>
      <td>Namnet på händelsen. Det kommer att vara `event` i `vendor:event`.</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## compareImages
Denna funktion genomför bildjämförelser med hjälp av kapaciteterna i OpenCV-ramverket. Observera att för att denna funktionalitet ska fungera måste både OpenCV-ramverket och opencv4nodejs-modulen vara installerade på den maskin där Appium-servern är i drift. ***Dessutom behöver du ha [`images-plugin`](https://github.com/appium/appium/tree/master/packages/images-plugin) pluginen installerad för att använda denna funktion med Appium 2.0.***<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/writing-running-appium/image-comparison/).

##### Användning

```js
driver.compareImages(mode, firstImage, secondImage, options)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mode=matchFeatures</var></code></td>
      <td>string</td>
      <td>En av möjliga jämförelselägen: 'matchFeatures', 'getSimilarity', 'matchTemplate'. 'matchFeatures' är standard.</td>
    </tr>
    <tr>
      <td><code><var>firstImage</var></code></td>
      <td>string</td>
      <td>En bilddata. Alla bildformat som OpenCV-biblioteket själv accepterar stöds.</td>
    </tr>
    <tr>
      <td><code><var>secondImage</var></code></td>
      <td>string</td>
      <td>En bilddata. Alla bildformat som OpenCV-biblioteket själv accepterar stöds.</td>
    </tr>
    <tr>
      <td><code><var>options=[object Object]</var></code></td>
      <td>object</td>
      <td>Innehållet i denna ordbok beror på det faktiska `mode`-värdet. Se dokumentationen för `appium-support`-modulen för mer detaljer. </td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;object&gt;**
            **<code><var>result</var></code>:** Innehållet i den resulterande ordboken beror på de faktiska värdena för `mode` och `options`. Se dokumentationen för `appium-support`-modulen för mer detaljer.


---

## implicitWait
Ange den tid som drivrutinen ska vänta vid sökning efter element. Vid sökning efter ett enskilt element bör drivrutinen avsöka sidan tills ett element hittas eller tidsfristen går ut, beroende på vilket som inträffar först. Vid sökning efter flera element bör drivrutinen avsöka sidan tills minst ett element hittas eller tidsfristen går ut, då den bör returnera en tom lista. Om detta kommando aldrig skickas bör drivrutinen som standard ha en implicit väntan på 0 ms.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Användning

```js
driver.implicitWait(ms)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>Mängden tid i millisekunder att vänta på ett element.</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLocationInView
Bestäm ett elements position på skärmen efter att det har rullats in i vyn.<br /><br />__Obs:__ Detta betraktas som ett internt kommando och bör endast användas för att bestämma ett elements position för att korrekt generera ursprungliga händelser.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Användning

```js
driver.getLocationInView(elementId)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID för elementet att dirigera kommandot till</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** X- och Y-koordinaterna för elementet på sidan.

##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## sendKeys
Skicka en sekvens av tangenttryckningar till det aktiva elementet<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Användning

```js
driver.sendKeys(value)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string[]</td>
      <td>Sekvensen av tangenter att skriva. En array måste tillhandahållas.</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## availableIMEEngines
Lista alla tillgängliga motorer på maskinen. För att använda en motor måste den finnas i denna lista.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Användning

```js
driver.availableIMEEngines()
```


##### Returnerar

- **&lt;String[]&gt;**
            **<code><var>engines</var></code>:** En lista över tillgängliga motorer

##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getActiveIMEEngine
Hämta namnet på den aktiva IME-motorn. Namnsträngen är plattformsspecifik.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Användning

```js
driver.getActiveIMEEngine()
```


##### Returnerar

- **&lt;String&gt;**
            **<code><var>engine</var></code>:** Namnet på den aktiva IME-motorn

##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## isIMEActivated
Indikerar om IME-inmatning är aktiv för tillfället<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Användning

```js
driver.isIMEActivated()
```


##### Returnerar

- **&lt;Boolean&gt;**
            **<code><var>isActive</var></code>:** Sant om IME-inmatning är tillgänglig och för närvarande aktiv, falskt annars

##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## deactivateIMEEngine
Avaktiverar den för närvarande aktiva IME-motorn.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Användning

```js
driver.deactivateIMEEngine()
```




##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateIMEEngine
Aktivera en tillgänglig motor<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Användning

```js
driver.activateIMEEngine(engine)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>engine</var></code></td>
      <td>string</td>
      <td>namn på motorn att aktivera</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## asyncScriptTimeout
Ange mängden tid, i millisekunder, som asynkrona skript som körs av `/session/:sessionId/execute_async` tillåts köra innan de avbryts och ett `Timeout`-fel returneras till klienten.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Användning

```js
driver.asyncScriptTimeout(ms)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>Mängden tid, i millisekunder, som tidsbegränsade kommandon tillåts köra</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## submit
Skicka in ett formulärelement.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Användning

```js
driver.submit(elementId)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID för formulärelementet som ska skickas in</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementSize
Bestäm ett elements storlek i pixlar. Storleken returneras som ett JSON-objekt med `width` och `height` egenskaper.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Användning

```js
driver.getElementSize(elementId)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID för elementet att dirigera kommandot till</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;Object&gt;**
            **<code><var>size</var></code>:** Bredden och höjden på elementet, i pixlar.

##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementLocation
Bestäm ett elements position på sidan. Punkten `(0, 0)` hänvisar till sidans övre vänstra hörn. Elementets koordinater returneras som ett JSON-objekt med `x` och `y` egenskaper.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Användning

```js
driver.getElementLocation(elementId)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID för elementet att dirigera kommandot till</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** X- och Y-koordinaterna för elementet på sidan.

##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchClick
Enkel touch på den touch-aktiverade enheten.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Användning

```js
driver.touchClick(element)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>ID för elementet att göra en enkel touch på.</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchDown
Finger ner på skärmen.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Användning

```js
driver.touchDown(x, y)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>x-koordinat på skärmen</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>y-koordinat på skärmen</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchUp
Finger upp från skärmen.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Användning

```js
driver.touchUp(x, y)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>x-koordinat på skärmen</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>y-koordinat på skärmen</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchMove
Finger flytta på skärmen.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Användning

```js
driver.touchMove(x, y)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>x-koordinat på skärmen</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>y-koordinat på skärmen</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchLongClick
Långt tryck på pekskärmen med fingerhändelser.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Användning

```js
driver.touchLongClick(element)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>ID för elementet att göra långt tryck på</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchFlick
Snabbt svep på pekskärmen med fingerhändelser. Detta snabbsvepskommando börjar på en viss skärmposition.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Användning

```js
driver.touchFlick(xoffset, yoffset, element, speed, xspeed, yspeed)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>xoffset</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>number</td>
      <td>x-offset i pixlar att svepa med</td>
    </tr>
    <tr>
      <td><code><var>yoffset</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>number</td>
      <td>y-offset i pixlar att svepa med</td>
    </tr>
    <tr>
      <td><code><var>element</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>string</td>
      <td>ID för elementet där svepet börjar</td>
    </tr>
    <tr>
      <td><code><var>speed</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>number</td>
      <td>hastigheten i pixlar per sekund</td>
    </tr>
    <tr>
      <td><code><var>xspeed</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>number</td>
      <td>x-hastigheten i pixlar per sekund</td>
    </tr>
    <tr>
      <td><code><var>yspeed</var></code><br /><span className="label labelWarning">frivillig</span></td>
      <td>number</td>
      <td>y-hastigheten i pixlar per sekund</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getOrientation
Hämta den aktuella enhetsorienteringen.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Användning

```js
driver.getOrientation()
```


##### Returnerar

- **&lt;String&gt;**
            **<code><var>orientation</var></code>:** Den aktuella orienteringen motsvarande ett värde definierat i ScreenOrientation: `LANDSCAPE|PORTRAIT`.

##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## setOrientation
Ställ in enhetsorienteringen<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Användning

```js
driver.setOrientation(orientation)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>orientation</var></code></td>
      <td>string</td>
      <td>den nya webbläsarorienteringen som definieras i ScreenOrientation: `LANDSCAPE|PORTRAIT`</td>
    </tr>
  </tbody>
</table>


##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogs
Hämta loggen för en given loggtyp. Loggbufferten återställs efter varje begäran.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Användning

```js
driver.getLogs(type)
```


##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>loggtypen</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;Object[]&gt;**
            **<code><var>logs</var></code>:** Listan över loggposter.

##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogTypes
Hämta tillgängliga loggtyper.<br /><br />Appium-kommando. Mer detaljer finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Användning

```js
driver.getLogTypes()
```


##### Returnerar

- **&lt;String[]&gt;**
            **<code><var>logTypes</var></code>:** Listan över tillgängliga loggtyper.

##### Stöd

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)
