---
id: appium
title: Appium
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/appium.ts
---

## getAppiumContext
Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### Användning

```js
driver.getAppiumContext()
```


##### Returnerar

- **&lt;Context&gt;**
            **<code><var>context</var></code>:** en sträng som representerar nuvarande kontext eller null som representerar 'ingen kontext'


---

## switchAppiumContext
Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

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
Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### Användning

```js
driver.getAppiumContexts()
```


##### Returnerar

- **&lt;Context[]&gt;**
            **<code><var>contexts</var></code>:** en array av strängar som representerar tillgängliga kontexter, t.ex. 'WEBVIEW', eller 'NATIVE'


---

## shake
Utför en skakningsåtgärd på enheten.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/interactions/shake/).

##### Användning

```js
driver.shake()
```




##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## lock
Lås enheten.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/interactions/lock/).

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
      <td><code><var>seconds</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>number</td>
      <td>hur länge skärmen ska vara låst (endast iOS)</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## unlock
Lås upp enheten.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/interactions/unlock/).

##### Användning

```js
driver.unlock()
```




##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## isLocked
Kontrollera om enheten är låst eller inte.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/interactions/is-locked/).

##### Användning

```js
driver.isLocked()
```


##### Returnerar

- **&lt;boolean&gt;**
            **<code><var>isLocked</var></code>:** Sant om enheten är låst, falskt om inte

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## startRecordingScreen
Börja spela in skärmen.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/).

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
      <td><code><var>options</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>object</td>
      <td>kommandoparametrar som kan innehålla nycklar som: remotePath, username, password, method, forceRestart, timeLimit, videoType, videoQuality, videoFps, bitRate, videoSize, bugReport (se mer beskrivning i Appium-dokumentationen)</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## stopRecordingScreen
Stoppa inspelning av skärmen<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/stop-recording-screen/).

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
      <td><code><var>remotePath</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>string</td>
      <td>Sökvägen till den fjärrplatsen där den resulterande videon ska laddas upp. Följande protokoll stöds http/https, ftp. Detta alternativ har endast effekt om det finns en pågående skärminspelningsprocess och forceRestart-parametern inte är inställd på true. Null eller tom strängvärde (standardinställningen) innebär att innehållet i den resulterande filen ska kodas som Base64.</td>
    </tr>
    <tr>
      <td><code><var>username</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>string</td>
      <td>Namnet på användaren för fjärrauthentisering.</td>
    </tr>
    <tr>
      <td><code><var>password</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>string</td>
      <td>Lösenordet för fjärrauthentisering.</td>
    </tr>
    <tr>
      <td><code><var>method</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>string</td>
      <td>HTTP-metodens namn för multipart-uppladdning. 'PUT' används som standard.</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Base64-kodad sträng. Om remote_path är inställt är svaret en tom sträng

##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## getPerformanceDataTypes
Returnerar informationstyperna för systemtillståndet som stöds för läsning som till exempel CPU, minne, nätverkstrafik och batteri.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/performance-data-types/).

##### Användning

```js
driver.getPerformanceDataTypes()
```


##### Returnerar

- **&lt;string[]&gt;**
            **<code><var>performanceTypes</var></code>:** De tillgängliga prestandadatatyperna (cpuinfo|batteryinfo|networkinfo|memoryinfo)

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getPerformanceData
Returnerar information om systemtillståndet som stöds för läsning som till exempel CPU, minne, nätverkstrafik och batteri.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/get-performance-data/).

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
      <td>paketnamnet på applikationen</td>
    </tr>
    <tr>
      <td><code><var>dataType</var></code></td>
      <td>string</td>
      <td>typen av systemtillstånd som ska läsas. Det bör vara en av de stödda prestandadatatyperna</td>
    </tr>
    <tr>
      <td><code><var>dataReadTimeout</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>number</td>
      <td>antalet försök att läsa</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;string[]&gt;**
            **<code><var>performanceData</var></code>:** Informationstypen för systemtillståndet som stöds för läsning som till exempel CPU, minne, nätverkstrafik och batteri

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## pressKeyCode
Tryck på en specifik tangent på enheten.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/keys/press-keycode/).

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
      <td>keycode att trycka på</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>number</td>
      <td>meta-tillstånd att trycka på tangenten med</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>number</td>
      <td>flaggor för tangenttryckningen</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## longPressKeyCode
Tryck och håll ned en specifik tangentkod på enheten.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/keys/long-press-keycode/).

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
      <td>keycode att trycka på enheten</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>number</td>
      <td>metastate för tangenttryckningen</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>number</td>
      <td>flaggor för tangenttryckningen</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendKeyEvent
Skicka en tangentkod till enheten.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

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
      <td>keycode att trycka på</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>string</td>
      <td>meta-tillstånd att trycka på tangenten med</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## rotateDevice
Rotera enheten i tre dimensioner.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-rotation).

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
      <td>x-offset att använda för centrum av rotationsgesten</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>y-offset att använda för centrum av rotationsgesten</td>
    </tr>
    <tr>
      <td><code><var>z</var></code></td>
      <td>number</td>
      <td>z-offset att använda för centrum av rotationsgesten</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentActivity
Hämta namnet på den aktuella Android-aktiviteten.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-activity/).

##### Användning

```js
driver.getCurrentActivity()
```


##### Returnerar

- **&lt;string&gt;**
            **<code><var>activity</var></code>:** Namn på den aktuella aktiviteten

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentPackage
Hämta namnet på det aktuella Android-paketet.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-package/).

##### Användning

```js
driver.getCurrentPackage()
```


##### Returnerar

- **&lt;string&gt;**
            **<code><var>package</var></code>:** Namn på det aktuella paketet

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## installApp
Installera den angivna appen på enheten.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/install-app/).

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
      <td>sökväg till applikationens .apk-fil</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateApp
Aktivera en given app på enheten<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/activate-app/).

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


##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## removeApp
Ta bort en app från enheten.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/remove-app/).

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


##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## terminateApp
Avsluta den angivna appen på enheten<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/terminate-app/).

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
      <td><code><var>options</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>object</td>
      <td>Kommandoalternativ. T.ex. "timeout": (Endast Android) Timeout för att försöka avsluta appen igen (se mer i Appium-dokumentation)</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## isAppInstalled
Kontrollera om den angivna appen är installerad på enheten.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/is-app-installed/).

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
            **<code><var>isAppInstalled</var></code>:** Returnera true om installerad, false om inte

##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## queryAppState
Hämta den givna appens status på enheten<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/app-state/).

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
            **<code><var>appStatus</var></code>:** 0 är inte installerad. 1 är inte igång. 2 körs i bakgrunden eller avstängd. 3 körs i bakgrunden. 4 körs i förgrunden

##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## hideKeyboard
Dölj mjukt tangentbord.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/keys/hide-keyboard/).

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
      <td><code><var>strategy</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>string</td>
      <td>dölj tangentbordsstrategi (endast UIAutomation), tillgängliga strategier - 'press', 'pressKey', 'swipeDown', 'tapOut', 'tapOutside', 'default'</td>
    </tr>
    <tr>
      <td><code><var>key</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>string</td>
      <td>tangentens värde om strategin är 'pressKey'</td>
    </tr>
    <tr>
      <td><code><var>keyCode</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>string</td>
      <td>tangentkod om strategin är 'pressKey'</td>
    </tr>
    <tr>
      <td><code><var>keyName</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>string</td>
      <td>tangentnamn om strategin är 'pressKey'</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## isKeyboardShown
Om det mjuka tangentbordet visas eller inte.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/keys/is-keyboard-shown/).

##### Användning

```js
driver.isKeyboardShown()
```


##### Returnerar

- **&lt;boolean&gt;**
            **<code><var>isKeyboardShown</var></code>:** True om tangentbordet visas

##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pushFile
Placera en fil på enheten på en särskild plats.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/files/push-file/).

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
      <td>sökväg dit datan ska installeras</td>
    </tr>
    <tr>
      <td><code><var>data</var></code></td>
      <td>string</td>
      <td>innehåll i filen i base64</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pullFile
Hämta en fil från enhetens filsystem.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-file/).

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

##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pullFolder
Hämta en mapp från enhetens filsystem.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-folder/).

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


##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## toggleAirplaneMode
Växla flygplansläge på enheten.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-airplane-mode/).

##### Användning

```js
driver.toggleAirplaneMode()
```




##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleData
Ändra tillståndet för datatjänsten.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-data/).

##### Användning

```js
driver.toggleData()
```




##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleWiFi
Ändra tillståndet för wifi-tjänsten.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-wifi/).

##### Användning

```js
driver.toggleWiFi()
```




##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleLocationServices
Ändra tillståndet för platstjänsten.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-location-services/).

##### Användning

```js
driver.toggleLocationServices()
```




##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleNetworkSpeed
Ställ in nätverkshastighet (endast Emulator)<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/network/network-speed/).

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


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## openNotifications
Öppna Android-notifikationer (endast Emulator).<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/system/open-notifications/).

##### Användning

```js
driver.openNotifications()
```




##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## startActivity
Starta en Android-aktivitet genom att ange paketnamn och aktivitetsnamn.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/activity/start-activity/).

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
      <td>namn på app</td>
    </tr>
    <tr>
      <td><code><var>appActivity</var></code></td>
      <td>string</td>
      <td>namn på aktivitet</td>
    </tr>
    <tr>
      <td><code><var>appWaitPackage</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>string</td>
      <td>namn på app att vänta på</td>
    </tr>
    <tr>
      <td><code><var>appWaitActivity</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>string</td>
      <td>namn på aktivitet att vänta på</td>
    </tr>
    <tr>
      <td><code><var>intentAction=android.intent.action.MAIN</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>string</td>
      <td>intent action som kommer att användas för att starta aktiviteten</td>
    </tr>
    <tr>
      <td><code><var>intentCategory=android.intent.category.LAUNCHER</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>string</td>
      <td>intent-kategori som kommer att användas för att starta aktiviteten</td>
    </tr>
    <tr>
      <td><code><var>intentFlags=0x10200000</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>string</td>
      <td>flaggor som kommer att användas för att starta aktiviteten</td>
    </tr>
    <tr>
      <td><code><var>optionalIntentArguments</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>string</td>
      <td>ytterligare intent-argument som kommer att användas för att starta aktiviteten</td>
    </tr>
    <tr>
      <td><code><var>dontStopAppOnReset</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>string</td>
      <td>stoppar inte processen i testappen innan du startar appen med adb</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSystemBars
Hämta information om synlighet och gränser för status- och navigeringsfält.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/system/system-bars/).

##### Användning

```js
driver.getSystemBars()
```


##### Returnerar

- **&lt;object[]&gt;**
            **<code><var>systemBars</var></code>:** Information om synlighet och gränser för status- och navigeringsfält

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDeviceTime
Hämta tiden på enheten.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/system/system-time/).

##### Användning

```js
driver.getDeviceTime()
```


##### Returnerar

- **&lt;string&gt;**
            **<code><var>time</var></code>:** Tid på enheten

##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDisplayDensity
Hämta skärmtäthet från enhet.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Användning

```js
driver.getDisplayDensity()
```


##### Returnerar

- **&lt;*&gt;**


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchId
Simulera en [touch id](https://support.apple.com/en-ca/ht201371)-händelse (endast iOS-simulator). För att aktivera denna funktion måste desired capability 'allowTouchIdEnroll' vara inställd på true och simulatorn måste vara [registrerad](https://support.apple.com/en-ca/ht201371). När du ställer in allowTouchIdEnroll till true kommer den att ställa in simulatorn på att vara registrerad som standard. Registreringstillståndet kan [växlas](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/index.html). Detta anrop fungerar endast om Appium-processen eller dess förälderapplikation (t.ex. Terminal.app eller Appium.app) har tillgång till Mac OS-tillgänglighet i Systeminställningar > Säkerhet och integritet > Integritet > Tillgänglighet-listan.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/simulator/touch-id/).

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
      <td>simulerar vi en lyckad beröring (true) eller en misslyckad beröring (false)</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## toggleEnrollTouchId
Växla simulatorn mellan att vara [registrerad](https://support.apple.com/en-ca/ht201371) att acceptera touchId (endast iOS Simulator). För att aktivera denna funktion måste desired capability 'allowTouchIdEnroll' vara inställd på true. När 'allowTouchIdEnroll' är inställd på true kommer simulatorn att vara registrerad som standard, och 'Toggle Touch ID Enrollment' ändrar registreringstillståndet. Detta anrop fungerar endast om Appium-processen eller dess förälderapplikation (t.ex. Terminal.app eller Appium.app) har tillgång till Mac OS-tillgänglighet i Systeminställningar > Säkerhet och integritet > Integritet > Tillgänglighet-listan.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/).

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
      <td><code><var>enabled=true</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>boolean</td>
      <td>är lika med true om TouchID-registrering ska aktiveras</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## launchApp
Starta en app på enheten.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/launch-app/).
:::caution

Detta protokollkommando är föråldrat<br />För iOS, använd `driver.execute('mobile: launchApp', { ... })` och för Android, använd `driver.execute('mobile: activateApp', { ... })`.
:::

##### Användning

```js
driver.launchApp()
```




##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## closeApp
Stäng en app på enheten.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/close-app/).
:::caution

Detta protokollkommando är föråldrat<br />Använd `driver.execute('mobile: terminateApp', { ... })` istället
:::

##### Användning

```js
driver.closeApp()
```




##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## background
Skicka den app som för närvarande körs för denna session till bakgrunden.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/background-app/).
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


##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## endCoverage
Hämta testets täckningsdata.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/end-test-coverage/).

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


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getStrings
Hämta app-strängar.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/get-app-strings/).

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
      <td><code><var>language</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>string</td>
      <td>språkkod</td>
    </tr>
    <tr>
      <td><code><var>stringFile</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>string</td>
      <td>sökväg till strängfilen</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;object&gt;**
            **<code><var>appStrings</var></code>:** alla definierade strängar från en app för det angivna språket och strängfilnamnet

##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## setValueImmediate
Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

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
      <td>id på ett element som returnerats i ett tidigare anrop till Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>text att ställa in för ett element</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## replaceValue
Ersätt värdet på elementet direkt.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

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
      <td>id på ett element som returnerats i ett tidigare anrop till Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>värde att ersätta på elementet</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSettings
Hämta de aktuella inställningarna på enheten.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/session/settings/get-settings/).

##### Användning

```js
driver.getSettings()
```


##### Returnerar

- **&lt;object&gt;**
            **<code><var>settings</var></code>:** JSON-hash av alla nuvarande angivna inställningar, se Settings API

##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## updateSettings
Uppdatera den aktuella inställningen på enheten.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/session/settings/update-settings/).

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
      <td>nyckel/värde objekt med inställningar att uppdatera</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## receiveAsyncResponse
Callback-url för asynkron körning av JavaScript.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

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


##### Support

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## gsmCall
Ring GSM-samtal (endast Emulator).<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-call/).

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


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmSignal
Ställ in GSM-signalstyrka (endast Emulator).<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-signal/).

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
      <td><code><var>signalStrengh</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>string</td>
      <td>signalstyrka i intervallet [0, 4]. Vänligen ställ även in denna parameter med samma värde om du använder Appium v1.11.0 eller lägre (se https://github.com/appium/appium/issues/12234).</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerCapacity
Ställ in batteriprocenten (endast Emulator).<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_capacity/).

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


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerAC
Ställ in tillståndet för batteriladdaren till ansluten eller inte (endast Emulator).<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_ac/).

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
      <td>ställ in tillståndet. on eller off</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmVoice
Ställ in GSM-rösttillstånd (endast Emulator).<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-voice/).

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


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendSms
Simulera ett SMS-meddelande (endast Emulator).<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/network/send-sms/).

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


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## fingerPrint
Autentisera användare genom att använda deras fingeravtrycksskanningar på stödda emulatorer.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/authentication/finger-print/).

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


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## setClipboard
Ställ in innehållet i systemets urklipp<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/set-clipboard/).

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
      <td>Det faktiska base64-kodade urklippsinnehållet</td>
    </tr>
    <tr>
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>string</td>
      <td>Typen av innehåll att få. Plaintext, Image, URL. Android stöder endast plaintext</td>
    </tr>
    <tr>
      <td><code><var>label</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>string</td>
      <td>Urklippsdataetikett för Android</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Svar från Appium-servern

##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getClipboard
Hämta innehållet i systemets urklipp<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/get-clipboard/).

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
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>string</td>
      <td>Typen av innehåll att få. Plaintext, Image, URL. Android stöder endast plaintext</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Urklippsinnehåll som base64-kodad sträng eller en tom sträng om urklippet är tomt

##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchPerform
Denna funktionalitet är endast tillgänglig från en inhemsk kontext. 'Touch Perform' fungerar på liknande sätt som de andra enskilda beröringsinstruktionerna, förutom att detta tillåter dig att länka ihop mer än en touchaktion som ett kommando. Detta är användbart eftersom Appium-kommandon skickas över nätverket och det finns latens mellan kommandon. Denna latens kan göra vissa touchinteraktioner omöjliga eftersom vissa interaktioner måste utföras i en sekvens. Vertikalt, till exempel, kräver att trycka ner, flytta till en annan y-koordinat och sedan släppa. För att det ska fungera kan det inte vara någon fördröjning mellan interaktionerna.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/touch-perform/).

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


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## multiTouchPerform
Denna funktionalitet är endast tillgänglig från en inhemsk kontext. Utför en multitouchaktionssekvens.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/multi-touch-perform/).

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


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## executeDriverScript
Detta kommando låter dig specificera ett WebdriverIO-skript som en sträng och överföra det till Appium-servern för lokal körning på själva servern. Detta tillvägagångssätt hjälper till att minimera potentiell latens kopplad till varje kommando. ***För att använda detta kommando med Appium 2.0 måste du ha installerat [`execute-driver-plugin`](https://github.com/appium/appium/tree/master/packages/execute-driver-plugin) pluginet.***<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/docs/en/commands/session/execute-driver.md).

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
      <td>Skriptet som ska köras. Det har tillgång till ett 'driver'-objekt som representerar en WebdriverIO-session kopplad till den aktuella servern.</td>
    </tr>
    <tr>
      <td><code><var>type</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>string</td>
      <td>Språket/ramverket som används i skriptet. För närvarande stöds endast 'webdriverio' och det är standard.</td>
    </tr>
    <tr>
      <td><code><var>timeout</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>number</td>
      <td>Antal millisekunder som skriptet ska tillåtas köra innan det dödas av Appium-servern. Standardvärdet är motsvarande 1 timme.</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;object&gt;**
            **<code><var>result</var></code>:** Ett objekt som innehåller två fält: 'result', som är returvärdet från själva skriptet, och 'logs', som innehåller 3 inre fält, 'log', 'warn' och 'error', som innehåller en array av strängar loggade av console.log, console.warn och console.error i skriptets körning.


---

## getEvents
Hämta händelser lagrade i Appium-servern.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/get-events.md).

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

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## logEvent
Lagra en anpassad händelse.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/log-event.md).

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


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## compareImages
Denna funktion utför bildjämförelser med hjälp av OpenCV-ramverkets funktioner. Observera att för att denna funktionalitet ska fungera, måste både OpenCV-ramverket och opencv4nodejs-modulen vara installerade på den maskin där Appium-servern körs. ***Dessutom behöver du ha [`images-plugin`](https://github.com/appium/appium/tree/master/packages/images-plugin)-pluginet installerat för att använda denna funktion med Appium 2.0.***<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://appium.github.io/appium.io/docs/en/writing-running-appium/image-comparison/).

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
      <td>Bilddata. Alla bildformat som OpenCV-biblioteket i sig accepterar stöds.</td>
    </tr>
    <tr>
      <td><code><var>secondImage</var></code></td>
      <td>string</td>
      <td>Bilddata. Alla bildformat som OpenCV-biblioteket i sig accepterar stöds.</td>
    </tr>
    <tr>
      <td><code><var>options=[object Object]</var></code></td>
      <td>object</td>
      <td>Innehållet i denna ordbok beror på det faktiska `mode`-värdet. Se dokumentationen om `appium-support`-modulen för mer detaljer. </td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;object&gt;**
            **<code><var>result</var></code>:** Innehållet i den resulterande ordboken beror på de faktiska `mode`- och `options`-värdena. Se dokumentationen om `appium-support`-modulen för mer detaljer.


---

## implicitWait
Ställ in hur lång tid drivrutinen ska vänta när den söker efter element. Vid sökning efter ett enskilt element bör drivrutinen söka igenom sidan tills ett element hittas eller tidsfristen löper ut, beroende på vilket som inträffar först. Vid sökning efter flera element bör drivrutinen söka igenom sidan tills minst ett element hittas eller tidsfristen löper ut, då den ska returnera en tom lista. Om detta kommando aldrig skickas, bör drivrutinen som standard ha en implicit väntan på 0 ms.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

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
      <td>Mängden tid, i millisekunder, att vänta på ett element.</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLocationInView
Bestäm ett elements position på skärmen när det har scrollats in i vyn.<br /><br />__Obs:__ Detta betraktas som ett internt kommando och bör endast användas för att bestämma ett elements position för att korrekt generera inhemska händelser.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

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
      <td>ID på elementet att dirigera kommandot till</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** X- och Y-koordinaterna för elementet på sidan.

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## sendKeys
Skicka en sekvens av tangenttryckningar till det aktiva elementet<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

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
      <td>Sekvensen av tangenter som ska skrivas. En array måste tillhandahållas.</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## availableIMEEngines
Lista alla tillgängliga motorer på maskinen. För att använda en motor måste den finnas i denna lista.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Användning

```js
driver.availableIMEEngines()
```


##### Returnerar

- **&lt;String[]&gt;**
            **<code><var>engines</var></code>:** En lista över tillgängliga motorer

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getActiveIMEEngine
Hämta namnet på den aktiva IME-motorn. Namnsträngen är plattformsspecifik.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Användning

```js
driver.getActiveIMEEngine()
```


##### Returnerar

- **&lt;String&gt;**
            **<code><var>engine</var></code>:** Namnet på den aktiva IME-motorn

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## isIMEActivated
Indikerar om IME-inmatning är aktiv för tillfället<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Användning

```js
driver.isIMEActivated()
```


##### Returnerar

- **&lt;Boolean&gt;**
            **<code><var>isActive</var></code>:** True om IME-inmatning är tillgänglig och för närvarande aktiv, false annars

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## deactivateIMEEngine
Inaktiverar den för närvarande aktiva IME-motorn.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Användning

```js
driver.deactivateIMEEngine()
```




##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateIMEEngine
Gör en motor som är tillgänglig<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

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


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## asyncScriptTimeout
Ställ in hur lång tid, i millisekunder, som asynkrona skript som körs av `/session/:sessionId/execute_async` tillåts köra innan de avbryts och ett `Timeout`-fel skickas till klienten.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

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


##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## submit
Skicka in ett formulärelement.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

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
      <td>ID på formulerelementet som ska skickas in</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementSize
Bestäm ett elements storlek i pixlar. Storleken returneras som ett JSON-objekt med egenskaper för `width` (bredd) och `height` (höjd).<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

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
      <td>ID på elementet att dirigera kommandot till</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;Object&gt;**
            **<code><var>size</var></code>:** Bredden och höjden på elementet, i pixlar.

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementLocation
Bestäm ett elements position på sidan. Punkten `(0, 0)` hänvisar till sidans övre vänstra hörn. Elementets koordinater returneras som ett JSON-objekt med egenskaper för `x` och `y`.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

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
      <td>ID på elementet att dirigera kommandot till</td>
    </tr>
  </tbody>
</table>


##### Returnerar

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** X- och Y-koordinaterna för elementet på sidan.

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchClick
Enkelt tryck på den pekskärmsenhet.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

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
      <td>ID på elementet att enkelttrycka på.</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchDown
Finger ner på skärmen.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

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


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchUp
Finger upp från skärmen.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

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


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchMove
Finger rörelse på skärmen.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

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


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchLongClick
Långt tryck på pekskärmen med hjälp av fingerrörelsehändelser.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

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
      <td>ID på elementet att långtrycka på</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchFlick
Snärta på pekskärmen med hjälp av fingerrörelsehändelser. Denna snärt-kommando börjar på en särskild skärmplats.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

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
      <td><code><var>xoffset</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>number</td>
      <td>x-offset i pixlar att snärta med</td>
    </tr>
    <tr>
      <td><code><var>yoffset</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>number</td>
      <td>y-offset i pixlar att snärta med</td>
    </tr>
    <tr>
      <td><code><var>element</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>string</td>
      <td>ID på elementet där snärten börjar</td>
    </tr>
    <tr>
      <td><code><var>speed</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>number</td>
      <td>hastigheten i pixlar per sekund</td>
    </tr>
    <tr>
      <td><code><var>xspeed</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>number</td>
      <td>x-hastigheten i pixlar per sekund</td>
    </tr>
    <tr>
      <td><code><var>yspeed</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>number</td>
      <td>y-hastigheten i pixlar per sekund</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getOrientation
Hämta enhetens nuvarande orientering.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Användning

```js
driver.getOrientation()
```


##### Returnerar

- **&lt;String&gt;**
            **<code><var>orientation</var></code>:** Den aktuella orienteringen motsvarande ett värde definierat i ScreenOrientation: `LANDSCAPE|PORTRAIT`.

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## setOrientation
Ställ in enhetens orientering<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

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
      <td>den nya webbläsarorienteringen som definierats i ScreenOrientation: `LANDSCAPE|PORTRAIT`</td>
    </tr>
  </tbody>
</table>


##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogs
Hämta loggen för en given loggtyp. Loggbufferten återställs efter varje begäran.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

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

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogTypes
Hämta tillgängliga loggtyper.<br /><br />Appium-kommando. Mer information finns i [officiell protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Användning

```js
driver.getLogTypes()
```


##### Returnerar

- **&lt;String[]&gt;**
            **<code><var>logTypes</var></code>:** Listan över tillgängliga loggtyper.

##### Support

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)
