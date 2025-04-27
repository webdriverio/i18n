---
id: appium
title: Appium
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/appium.ts
---

## getAppiumContext
Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### Verwendung

```js
driver.getAppiumContext()
```


##### Gibt zurück

- **&lt;Context&gt;**
            **<code><var>context</var></code>:** eine Zeichenfolge, die den aktuellen Kontext darstellt, oder null, was 'kein Kontext' bedeutet


---

## switchAppiumContext
Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### Verwendung

```js
driver.switchAppiumContext(name)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>eine Zeichenfolge, die einen verfügbaren Kontext darstellt</td>
    </tr>
  </tbody>
</table>



---

## getAppiumContexts
Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### Verwendung

```js
driver.getAppiumContexts()
```


##### Gibt zurück

- **&lt;Context[]&gt;**
            **<code><var>contexts</var></code>:** ein Array von Zeichenfolgen, die verfügbare Kontexte darstellen, z.B. 'WEBVIEW' oder 'NATIVE'


---

## shake
Führt eine Schüttelaktion auf dem Gerät aus.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/interactions/shake/).

##### Verwendung

```js
driver.shake()
```




##### Unterstützung

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## lock
Sperrt das Gerät.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/interactions/lock/).

##### Verwendung

```js
driver.lock(seconds)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>seconds</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>wie lange der Bildschirm gesperrt werden soll (nur iOS)</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## unlock
Entsperrt das Gerät.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/interactions/unlock/).

##### Verwendung

```js
driver.unlock()
```




##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## isLocked
Überprüft, ob das Gerät gesperrt ist oder nicht.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/interactions/is-locked/).

##### Verwendung

```js
driver.isLocked()
```


##### Gibt zurück

- **&lt;boolean&gt;**
            **<code><var>isLocked</var></code>:** True, wenn das Gerät gesperrt ist, sonst false

##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## startRecordingScreen
Startet die Bildschirmaufzeichnung.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/).

##### Verwendung

```js
driver.startRecordingScreen(options)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>Befehlsparameter, die Schlüssel wie remotePath, username, password, method, forceRestart, timeLimit, videoType, videoQuality, videoFps, bitRate, videoSize, bugReport enthalten können (weitere Beschreibungen in der Appium-Dokumentation)</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## stopRecordingScreen
Stoppt die Bildschirmaufzeichnung<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/stop-recording-screen/).

##### Verwendung

```js
driver.stopRecordingScreen(remotePath, username, password, method)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>remotePath</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Der Pfad zum Remote-Speicherort, wohin das resultierende Video hochgeladen werden soll. Die folgenden Protokolle werden unterstützt: http/https, ftp. Diese Option hat nur dann eine Auswirkung, wenn ein Bildschirmaufzeichnungsprozess läuft und der Parameter forceRestart nicht auf true gesetzt ist. Null oder leere Zeichenkette (Standardeinstellung) bedeutet, dass der Inhalt der resultierenden Datei als Base64 kodiert werden soll.</td>
    </tr>
    <tr>
      <td><code><var>username</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Der Name des Benutzers für die Remote-Authentifizierung.</td>
    </tr>
    <tr>
      <td><code><var>password</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Das Passwort für die Remote-Authentifizierung.</td>
    </tr>
    <tr>
      <td><code><var>method</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Der Name der HTTP-Multipart-Upload-Methode. Standardmäßig wird 'PUT' verwendet.</td>
    </tr>
  </tbody>
</table>


##### Gibt zurück

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Base64-kodierte Zeichenfolge. Wenn remote_path gesetzt ist, ist die Antwort eine leere Zeichenfolge

##### Unterstützung

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## getPerformanceDataTypes
Gibt die Informationstypen des Systemzustands zurück, die zum Lesen unterstützt werden, wie CPU, Speicher, Netzwerkverkehr und Batterie.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/performance-data-types/).

##### Verwendung

```js
driver.getPerformanceDataTypes()
```


##### Gibt zurück

- **&lt;string[]&gt;**
            **<code><var>performanceTypes</var></code>:** Die verfügbaren Performance-Datentypen (cpuinfo|batteryinfo|networkinfo|memoryinfo)

##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getPerformanceData
Gibt die Informationen des Systemzustands zurück, die zum Lesen unterstützt werden, wie CPU, Speicher, Netzwerkverkehr und Batterie.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/get-performance-data/).

##### Verwendung

```js
driver.getPerformanceData(packageName, dataType, dataReadTimeout)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>packageName</var></code></td>
      <td>string</td>
      <td>der Paketname der Anwendung</td>
    </tr>
    <tr>
      <td><code><var>dataType</var></code></td>
      <td>string</td>
      <td>der Typ des Systemzustands, der gelesen werden soll. Es sollte einer der unterstützten Performance-Datentypen sein</td>
    </tr>
    <tr>
      <td><code><var>dataReadTimeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>die Anzahl der Leseversuche</td>
    </tr>
  </tbody>
</table>


##### Gibt zurück

- **&lt;string[]&gt;**
            **<code><var>performanceData</var></code>:** Der Informationstyp des Systemzustands, der zum Lesen unterstützt wird, wie CPU, Speicher, Netzwerkverkehr und Batterie

##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## pressKeyCode
Drückt eine bestimmte Taste auf dem Gerät.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/keys/press-keycode/).

##### Verwendung

```js
driver.pressKeyCode(keycode, metastate, flags)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>zu drückender Keycode</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>Metazustand, mit dem der Keycode gedrückt werden soll</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>Flags für den Tastendruck</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## longPressKeyCode
Drückt und hält einen bestimmten Keycode auf dem Gerät.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/keys/long-press-keycode/).

##### Verwendung

```js
driver.longPressKeyCode(keycode, metastate, flags)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>Keycode, der auf dem Gerät gedrückt werden soll</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>Metazustand für den Tastendruck</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>Flags für den Tastendruck</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendKeyEvent
Sendet einen Keycode an das Gerät.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Verwendung

```js
driver.sendKeyEvent(keycode, metastate)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>keycode</var></code></td>
      <td>string</td>
      <td>zu drückender Keycode</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Metazustand, mit dem der Keycode gedrückt werden soll</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## rotateDevice
Dreht das Gerät in drei Dimensionen.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-rotation).

##### Verwendung

```js
driver.rotateDevice(x, y, z)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>x-Offset, der für den Mittelpunkt der Drehgeste verwendet werden soll</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>y-Offset, der für den Mittelpunkt der Drehgeste verwendet werden soll</td>
    </tr>
    <tr>
      <td><code><var>z</var></code></td>
      <td>number</td>
      <td>z-Offset, der für den Mittelpunkt der Drehgeste verwendet werden soll</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentActivity
Ruft den Namen der aktuellen Android-Aktivität ab.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-activity/).

##### Verwendung

```js
driver.getCurrentActivity()
```


##### Gibt zurück

- **&lt;string&gt;**
            **<code><var>activity</var></code>:** Name der aktuellen Aktivität

##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentPackage
Ruft den Namen des aktuellen Android-Pakets ab.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-package/).

##### Verwendung

```js
driver.getCurrentPackage()
```


##### Gibt zurück

- **&lt;string&gt;**
            **<code><var>package</var></code>:** Name des aktuellen Pakets

##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## installApp
Installiert die angegebene App auf dem Gerät.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/install-app/).

##### Verwendung

```js
driver.installApp(appPath)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appPath</var></code></td>
      <td>string</td>
      <td>Pfad zur Anwendungs-.apk-Datei</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateApp
Aktiviert die angegebene App auf dem Gerät<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/activate-app/).

##### Verwendung

```js
driver.activateApp(appId)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>App ID (Paket-ID für Android, Bundle-ID für iOS)</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## removeApp
Entfernt eine App vom Gerät.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/remove-app/).

##### Verwendung

```js
driver.removeApp(appId)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>App ID (Paket-ID für Android, Bundle-ID für iOS)</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## terminateApp
Beendet die angegebene App auf dem Gerät<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/terminate-app/).

##### Verwendung

```js
driver.terminateApp(appId, options)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>App ID (Paket-ID für Android, Bundle-ID für iOS)</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>Befehlsoptionen. Z.B. "timeout": (Nur Android) Timeout für erneuten Versuch, die App zu beenden (weitere Informationen in der Appium-Dokumentation)</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## isAppInstalled
Überprüft, ob die angegebene App auf dem Gerät installiert ist.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/is-app-installed/).

##### Verwendung

```js
driver.isAppInstalled(appId)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>App ID (Paket-ID für Android, Bundle-ID für iOS)</td>
    </tr>
  </tbody>
</table>


##### Gibt zurück

- **&lt;boolean&gt;**
            **<code><var>isAppInstalled</var></code>:** Gibt true zurück, wenn installiert, false, wenn nicht

##### Unterstützung

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## queryAppState
Ruft den Status der angegebenen App auf dem Gerät ab<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/app-state/).

##### Verwendung

```js
driver.queryAppState(appId)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>App ID (Paket-ID für Android, Bundle-ID für iOS)</td>
    </tr>
  </tbody>
</table>


##### Gibt zurück

- **&lt;number&gt;**
            **<code><var>appStatus</var></code>:** 0 ist nicht installiert. 1 läuft nicht. 2 läuft im Hintergrund oder ist angehalten. 3 läuft im Hintergrund. 4 läuft im Vordergrund

##### Unterstützung

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## hideKeyboard
Blendet die Bildschirmtastatur aus.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/keys/hide-keyboard/).

##### Verwendung

```js
driver.hideKeyboard(strategy, key, keyCode, keyName)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>strategy</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Strategie zum Ausblenden der Tastatur (nur UIAutomation), verfügbare Strategien - 'press', 'pressKey', 'swipeDown', 'tapOut', 'tapOutside', 'default'</td>
    </tr>
    <tr>
      <td><code><var>key</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Tastenwert, wenn die Strategie 'pressKey' ist</td>
    </tr>
    <tr>
      <td><code><var>keyCode</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Tastencode, wenn die Strategie 'pressKey' ist</td>
    </tr>
    <tr>
      <td><code><var>keyName</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Tastenname, wenn die Strategie 'pressKey' ist</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## isKeyboardShown
Ob die Bildschirmtastatur angezeigt wird oder nicht.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/keys/is-keyboard-shown/).

##### Verwendung

```js
driver.isKeyboardShown()
```


##### Gibt zurück

- **&lt;boolean&gt;**
            **<code><var>isKeyboardShown</var></code>:** True, wenn die Tastatur angezeigt wird

##### Unterstützung

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pushFile
Platziert eine Datei an einem bestimmten Ort auf dem Gerät.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/files/push-file/).

##### Verwendung

```js
driver.pushFile(path, data)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>Pfad, zu dem die Daten installiert werden sollen</td>
    </tr>
    <tr>
      <td><code><var>data</var></code></td>
      <td>string</td>
      <td>Inhalt der Datei in Base64</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pullFile
Ruft eine Datei vom Dateisystem des Geräts ab.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-file/).

##### Verwendung

```js
driver.pullFile(path)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>Pfad auf dem Gerät, von dem die Datei abgerufen werden soll</td>
    </tr>
  </tbody>
</table>


##### Gibt zurück

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Inhalt der Datei in Base64

##### Unterstützung

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pullFolder
Ruft einen Ordner vom Dateisystem des Geräts ab.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-folder/).

##### Verwendung

```js
driver.pullFolder(path)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>Pfad zu einem gesamten Ordner auf dem Gerät</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## toggleAirplaneMode
Schaltet den Flugmodus auf dem Gerät um.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-airplane-mode/).

##### Verwendung

```js
driver.toggleAirplaneMode()
```




##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleData
Schaltet den Zustand des Datendienstes um.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-data/).

##### Verwendung

```js
driver.toggleData()
```




##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleWiFi
Schaltet den Zustand des WLAN-Dienstes um.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-wifi/).

##### Verwendung

```js
driver.toggleWiFi()
```




##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleLocationServices
Schaltet den Zustand des Ortungsdienstes um.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-location-services/).

##### Verwendung

```js
driver.toggleLocationServices()
```




##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleNetworkSpeed
Stellt die Netzwerkgeschwindigkeit ein (nur Emulator)<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/network/network-speed/).

##### Verwendung

```js
driver.toggleNetworkSpeed(netspeed)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>netspeed</var></code></td>
      <td>string</td>
      <td>Netzwerktyp - 'full','gsm', 'edge', 'hscsd', 'gprs', 'umts', 'hsdpa', 'lte', 'evdo'</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## openNotifications
Öffnet Android-Benachrichtigungen (nur Emulator).<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/system/open-notifications/).

##### Verwendung

```js
driver.openNotifications()
```




##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## startActivity
Startet eine Android-Aktivität durch Angabe des Paketnamens und des Aktivitätsnamens.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/activity/start-activity/).

##### Verwendung

```js
driver.startActivity(appPackage, appActivity, appWaitPackage, appWaitActivity, intentAction, intentCategory, intentFlags, optionalIntentArguments, dontStopAppOnReset)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appPackage</var></code></td>
      <td>string</td>
      <td>Name der App</td>
    </tr>
    <tr>
      <td><code><var>appActivity</var></code></td>
      <td>string</td>
      <td>Name der Aktivität</td>
    </tr>
    <tr>
      <td><code><var>appWaitPackage</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Name der App, auf die gewartet werden soll</td>
    </tr>
    <tr>
      <td><code><var>appWaitActivity</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Name der Aktivität, auf die gewartet werden soll</td>
    </tr>
    <tr>
      <td><code><var>intentAction=android.intent.action.MAIN</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Intent-Aktion, die zum Starten der Aktivität verwendet wird</td>
    </tr>
    <tr>
      <td><code><var>intentCategory=android.intent.category.LAUNCHER</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Intent-Kategorie, die zum Starten der Aktivität verwendet wird</td>
    </tr>
    <tr>
      <td><code><var>intentFlags=0x10200000</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Flags, die zum Starten der Aktivität verwendet werden</td>
    </tr>
    <tr>
      <td><code><var>optionalIntentArguments</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>zusätzliche Intent-Argumente, die zum Starten der Aktivität verwendet werden</td>
    </tr>
    <tr>
      <td><code><var>dontStopAppOnReset</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>stoppt den Prozess der zu testenden App nicht, bevor die App über adb gestartet wird</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSystemBars
Ruft Sichtbarkeits- und Begrenzungsinformationen der Status- und Navigationsleisten ab.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/system/system-bars/).

##### Verwendung

```js
driver.getSystemBars()
```


##### Gibt zurück

- **&lt;object[]&gt;**
            **<code><var>systemBars</var></code>:** Informationen über Sichtbarkeit und Grenzen der Status- und Navigationsleiste

##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDeviceTime
Ruft die Zeit auf dem Gerät ab.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/system/system-time/).

##### Verwendung

```js
driver.getDeviceTime()
```


##### Gibt zurück

- **&lt;string&gt;**
            **<code><var>time</var></code>:** Zeit auf dem Gerät

##### Unterstützung

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDisplayDensity
Ruft die Anzeigedichte vom Gerät ab.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Verwendung

```js
driver.getDisplayDensity()
```


##### Gibt zurück

- **&lt;*&gt;**


##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchId
Simuliert ein [Touch-ID](https://support.apple.com/en-ca/ht201371)-Ereignis (nur iOS-Simulator). Um diese Funktion zu aktivieren, muss die gewünschte Capability `allowTouchIdEnroll` auf true gesetzt sein und der Simulator muss [registriert](https://support.apple.com/en-ca/ht201371) sein. Wenn Sie allowTouchIdEnroll auf true setzen, wird der Simulator standardmäßig registriert. Der Registrierungsstatus kann [umgeschaltet](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/index.html) werden. Dieser Aufruf funktioniert nur, wenn der Appium-Prozess oder seine übergeordnete Anwendung (z. B. Terminal.app oder Appium.app) Zugriff auf die Mac OS-Barrierefreiheit in Systemeinstellungen > Sicherheit & Datenschutz > Datenschutz > Barrierefreiheit hat.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/simulator/touch-id/).

##### Verwendung

```js
driver.touchId(match)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>match</var></code></td>
      <td>boolean</td>
      <td>simulieren wir einen erfolgreichen Touch (true) oder einen fehlgeschlagenen Touch (false)</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## toggleEnrollTouchId
Schaltet den Simulator um, damit er [registriert](https://support.apple.com/en-ca/ht201371) ist, um TouchID zu akzeptieren (nur iOS-Simulator). Um diese Funktion zu aktivieren, muss die gewünschte Capability `allowTouchIdEnroll` auf true gesetzt sein. Wenn `allowTouchIdEnroll` auf true gesetzt ist, wird der Simulator standardmäßig registriert, und 'Toggle Touch ID Enrollment' ändert den Registrierungsstatus. Dieser Aufruf funktioniert nur, wenn der Appium-Prozess oder seine übergeordnete Anwendung (z. B. Terminal.app oder Appium.app) Zugriff auf die Mac OS-Barrierefreiheit in Systemeinstellungen > Sicherheit & Datenschutz > Datenschutz > Barrierefreiheit hat.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/).

##### Verwendung

```js
driver.toggleEnrollTouchId(enabled)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>enabled=true</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>entspricht true, wenn TouchID-Registrierung aktiviert werden soll</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## launchApp
Startet eine App auf dem Gerät.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/launch-app/).
:::caution

Dieser Protokollbefehl ist veraltet<br />Verwenden Sie für iOS `driver.execute('mobile: launchApp', { ... })` und für Android `driver.execute('mobile: activateApp', { ... })`.
:::

##### Verwendung

```js
driver.launchApp()
```




##### Unterstützung

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## closeApp
Schließt eine App auf dem Gerät.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/close-app/).
:::caution

Dieser Protokollbefehl ist veraltet<br />Verwenden Sie stattdessen `driver.execute('mobile: terminateApp', { ... })`
:::

##### Verwendung

```js
driver.closeApp()
```




##### Unterstützung

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## background
Sendet die derzeit laufende App für diese Sitzung in den Hintergrund.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/background-app/).
:::caution

Dieser Protokollbefehl ist veraltet<br />Verwenden Sie stattdessen `driver.execute('mobile: backgroundApp', { ... })`
:::

##### Verwendung

```js
driver.background(seconds)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>seconds=null</var></code></td>
      <td>number, null</td>
      <td>Timeout zum Wiederherstellen der App, bei 'null' wird die App nicht wiederhergestellt</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## endCoverage
Ruft Testabdeckungsdaten ab.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/end-test-coverage/).

##### Verwendung

```js
driver.endCoverage(intent, path)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>intent</var></code></td>
      <td>string</td>
      <td>zu sendender Intent</td>
    </tr>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>Pfad zur .ec-Datei</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getStrings
Ruft App-Strings ab.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/app/get-app-strings/).

##### Verwendung

```js
driver.getStrings(language, stringFile)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>language</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Sprachcode</td>
    </tr>
    <tr>
      <td><code><var>stringFile</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Pfad zur String-Datei</td>
    </tr>
  </tbody>
</table>


##### Gibt zurück

- **&lt;object&gt;**
            **<code><var>appStrings</var></code>:** alle definierten Strings einer App für die angegebene Sprache und den angegebenen Dateinamen

##### Unterstützung

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## setValueImmediate
Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Verwendung

```js
driver.setValueImmediate(elementId, text)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>die ID eines Elements, die in einem vorherigen Aufruf von Find Element(s) zurückgegeben wurde</td>
    </tr>
    <tr>
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>auf ein Element zu setzender Text</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## replaceValue
Ersetzt den Wert direkt im Element.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Verwendung

```js
driver.replaceValue(elementId, value)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>die ID eines Elements, die in einem vorherigen Aufruf von Find Element(s) zurückgegeben wurde</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>Wert, der im Element ersetzt werden soll</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSettings
Ruft die aktuellen Einstellungen auf dem Gerät ab.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/session/settings/get-settings/).

##### Verwendung

```js
driver.getSettings()
```


##### Gibt zurück

- **&lt;object&gt;**
            **<code><var>settings</var></code>:** JSON-Hash aller aktuell angegebenen Einstellungen, siehe Settings API

##### Unterstützung

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## updateSettings
Aktualisiert die aktuelle Einstellung auf dem Gerät.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/session/settings/update-settings/).

##### Verwendung

```js
driver.updateSettings(settings)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>settings</var></code></td>
      <td>object</td>
      <td>Schlüssel/Wert-Objekt mit zu aktualisierenden Einstellungen</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## receiveAsyncResponse
Callback-URL für asynchrone Ausführung von JavaScript.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Verwendung

```js
driver.receiveAsyncResponse(response)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>response</var></code></td>
      <td>object</td>
      <td>auf dem Gerät zu empfangende Antwort</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## gsmCall
Tätigt GSM-Anruf (nur Emulator).<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-call/).

##### Verwendung

```js
driver.gsmCall(phoneNumber, action)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>die anzurufende Telefonnummer</td>
    </tr>
    <tr>
      <td><code><var>action</var></code></td>
      <td>string</td>
      <td>Die Aktion - 'call', 'accept', 'cancel', 'hold'</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmSignal
Stellt die GSM-Signalstärke ein (nur Emulator).<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-signal/).

##### Verwendung

```js
driver.gsmSignal(signalStrength, signalStrengh)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>signalStrength</var></code></td>
      <td>string</td>
      <td>Signalstärke im Bereich [0, 4]</td>
    </tr>
    <tr>
      <td><code><var>signalStrengh</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Signalstärke im Bereich [0, 4]. Bitte setzen Sie diesen Parameter mit dem gleichen Wert, wenn Sie Appium v1.11.0 oder niedriger verwenden (siehe https://github.com/appium/appium/issues/12234).</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerCapacity
Stellt den Batterieladezustand ein (nur Emulator).<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_capacity/).

##### Verwendung

```js
driver.powerCapacity(percent)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>percent</var></code></td>
      <td>number</td>
      <td>Prozentwert im Bereich [0, 100]</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerAC
Stellt den Zustand des Batterieladegeräts auf verbunden oder nicht ein (nur Emulator).<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_ac/).

##### Verwendung

```js
driver.powerAC(state)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>Stellt den Zustand ein. on oder off</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmVoice
Stellt den GSM-Sprachzustand ein (nur Emulator).<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-voice/).

##### Verwendung

```js
driver.gsmVoice(state)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>Zustand der GSM-Sprache - 'unregistered', 'home', 'roaming', 'searching', 'denied', 'off', 'on'</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendSms
Simuliert eine SMS-Nachricht (nur Emulator).<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/network/send-sms/).

##### Verwendung

```js
driver.sendSms(phoneNumber, message)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>die Telefonnummer, an die die SMS gesendet werden soll</td>
    </tr>
    <tr>
      <td><code><var>message</var></code></td>
      <td>string</td>
      <td>die SMS-Nachricht</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## fingerPrint
Authentifiziert Benutzer durch Verwendung ihrer Fingerabdruckscans auf unterstützten Emulatoren.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/authentication/finger-print/).

##### Verwendung

```js
driver.fingerPrint(fingerprintId)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>fingerprintId</var></code></td>
      <td>number</td>
      <td>im Android Keystore-System gespeicherte Fingerabdrücke (von 1 bis 10)</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## setClipboard
Setzt den Inhalt der Systemzwischenablage<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/set-clipboard/).

##### Verwendung

```js
driver.setClipboard(content, contentType, label)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>content</var></code></td>
      <td>string</td>
      <td>Der tatsächliche Base64-kodierte Inhalt der Zwischenablage</td>
    </tr>
    <tr>
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Der Typ des zu holenden Inhalts. Plaintext, Image, URL. Android unterstützt nur Plaintext</td>
    </tr>
    <tr>
      <td><code><var>label</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Beschriftung der Zwischenablagedaten für Android</td>
    </tr>
  </tbody>
</table>


##### Gibt zurück

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Antwort vom Appium-Server

##### Unterstützung

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getClipboard
Ruft den Inhalt der Systemzwischenablage ab<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/get-clipboard/).

##### Verwendung

```js
driver.getClipboard(contentType)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Der Typ des zu holenden Inhalts. Plaintext, Image, URL. Android unterstützt nur Plaintext</td>
    </tr>
  </tbody>
</table>


##### Gibt zurück

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Zwischenablageinhalt als Base64-kodierte Zeichenfolge oder eine leere Zeichenfolge, wenn die Zwischenablage leer ist

##### Unterstützung

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchPerform
Diese Funktionalität ist nur innerhalb eines nativen Kontexts verfügbar. 'Touch Perform' funktioniert ähnlich wie die anderen einzelnen Touch-Interaktionen, mit dem Unterschied, dass Sie hier mehr als eine Touch-Aktion als einen Befehl verketten können. Dies ist nützlich, da Appium-Befehle über das Netzwerk gesendet werden und es Latenzzeiten zwischen den Befehlen gibt. Diese Latenz kann bestimmte Touch-Interaktionen unmöglich machen, da einige Interaktionen in einer Sequenz ausgeführt werden müssen. Vertikal erfordert beispielsweise das Drücken, Bewegen zu einer anderen y-Koordinate und dann das Loslassen. Damit es funktioniert, darf es keine Verzögerung zwischen den Interaktionen geben.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/touch-perform/).

##### Verwendung

```js
driver.touchPerform(actions)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>Die Art der auszuführenden Aktion (z.B. moveTo, release, press, tap, wait)</td>
    </tr>
  </tbody>
</table>

##### Beispiel


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


##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## multiTouchPerform
Diese Funktionalität ist nur innerhalb eines nativen Kontexts verfügbar. Führt eine Mehrfach-Touch-Aktionssequenz aus.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/multi-touch-perform/).

##### Verwendung

```js
driver.multiTouchPerform(actions)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>Die Art der auszuführenden Aktion (z.B. moveTo, release, press, tap, wait)</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## executeDriverScript
Mit diesem Befehl können Sie ein WebdriverIO-Skript als Zeichenfolge angeben und es zur lokalen Ausführung auf dem Server selbst an den Appium-Server übertragen. Dieser Ansatz hilft, potenzielle Latenzzeiten im Zusammenhang mit jedem Befehl zu minimieren. ***Um diesen Befehl mit Appium 2.0 zu verwenden, müssen Sie das [`execute-driver-plugin`](https://github.com/appium/appium/tree/master/packages/execute-driver-plugin) Plugin installiert haben.***<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium/blob/master/docs/en/commands/session/execute-driver.md).

##### Verwendung

```js
driver.executeDriverScript(script, type, timeout)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>Das auszuführende Skript. Es hat Zugriff auf ein 'driver'-Objekt, das eine WebdriverIO-Sitzung darstellt, die mit dem aktuellen Server verbunden ist.</td>
    </tr>
    <tr>
      <td><code><var>type</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Die im Skript verwendete Sprache/Framework. Derzeit wird nur 'webdriverio' unterstützt und ist der Standard.</td>
    </tr>
    <tr>
      <td><code><var>timeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>Die Anzahl der Millisekunden, die das Skript ausgeführt werden darf, bevor es vom Appium-Server beendet wird. Standardmäßig entspricht es einer Stunde.</td>
    </tr>
  </tbody>
</table>


##### Gibt zurück

- **&lt;object&gt;**
            **<code><var>result</var></code>:** Ein Objekt, das zwei Felder enthält: 'result', den Rückgabewert des Skripts selbst, und 'logs', das 3 innere Felder enthält, 'log', 'warn' und 'error', die ein Array von Zeichenketten enthalten, die von console.log, console.warn und console.error bei der Ausführung des Skripts protokolliert wurden.


---

## getEvents
Ruft im Appium-Server gespeicherte Ereignisse ab.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/get-events.md).

##### Verwendung

```js
driver.getEvents(type)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string[]</td>
      <td>Holt Ereignisse, die mit dem Typ gefiltert werden, wenn der Typ angegeben ist.</td>
    </tr>
  </tbody>
</table>


##### Gibt zurück

- **&lt;object&gt;**
            **<code><var>result</var></code>:** Ein JSON-Hash von Ereignissen wie `{'commands' => [{'cmd' => 123455, ....}], 'startTime' => 1572954894127, }`.

##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## logEvent
Speichert ein benutzerdefiniertes Ereignis.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/log-event.md).

##### Verwendung

```js
driver.logEvent(vendor, event)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>vendor</var></code></td>
      <td>string</td>
      <td>Der Name des Anbieters. Es wird 'vendor' in 'vendor:event' sein.</td>
    </tr>
    <tr>
      <td><code><var>event</var></code></td>
      <td>string</td>
      <td>Der Name des Ereignisses. Es wird 'event' in 'vendor:event' sein.</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## compareImages
Diese Funktion führt Bildvergleiche unter Verwendung der Fähigkeiten des OpenCV-Frameworks durch. Bitte beachten Sie, dass für diese Funktionalität sowohl das OpenCV-Framework als auch das opencv4nodejs-Modul auf dem Computer installiert sein müssen, auf dem der Appium-Server betrieben wird. ***Darüber hinaus müssen Sie das [`images-plugin`](https://github.com/appium/appium/tree/master/packages/images-plugin) Plugin installiert haben, um diese Funktion mit Appium 2.0 zu verwenden.***<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://appium.github.io/appium.io/docs/en/writing-running-appium/image-comparison/).

##### Verwendung

```js
driver.compareImages(mode, firstImage, secondImage, options)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mode=matchFeatures</var></code></td>
      <td>string</td>
      <td>Einer der möglichen Vergleichsmodi: 'matchFeatures', 'getSimilarity', 'matchTemplate'. 'matchFeatures' ist standardmäßig.</td>
    </tr>
    <tr>
      <td><code><var>firstImage</var></code></td>
      <td>string</td>
      <td>Bilddaten. Alle Bildformate, die die OpenCV-Bibliothek selbst akzeptiert, werden unterstützt.</td>
    </tr>
    <tr>
      <td><code><var>secondImage</var></code></td>
      <td>string</td>
      <td>Bilddaten. Alle Bildformate, die die OpenCV-Bibliothek selbst akzeptiert, werden unterstützt.</td>
    </tr>
    <tr>
      <td><code><var>options=[object Object]</var></code></td>
      <td>object</td>
      <td>Der Inhalt dieses Wörterbuchs hängt vom tatsächlichen `mode`-Wert ab. Weitere Details finden Sie in der Dokumentation zum `appium-support`-Modul. </td>
    </tr>
  </tbody>
</table>


##### Gibt zurück

- **&lt;object&gt;**
            **<code><var>result</var></code>:** Der Inhalt des resultierenden Wörterbuchs hängt von den tatsächlichen `mode`- und `options`-Werten ab. Weitere Details finden Sie in der Dokumentation zum `appium-support`-Modul.


---

## implicitWait
Legt fest, wie lange der Treiber beim Suchen nach Elementen warten soll. Bei der Suche nach einem einzelnen Element sollte der Treiber die Seite abfragen, bis ein Element gefunden wird oder das Timeout abläuft, je nachdem, was zuerst eintritt. Bei der Suche nach mehreren Elementen sollte der Treiber die Seite abfragen, bis mindestens ein Element gefunden wird oder das Timeout abläuft, an diesem Punkt sollte eine leere Liste zurückgegeben werden. Wenn dieser Befehl niemals gesendet wird, sollte der Treiber standardmäßig eine implizite Wartezeit von 0 ms verwenden.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Verwendung

```js
driver.implicitWait(ms)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>Die Anzahl von Millisekunden, die auf ein Element gewartet werden soll.</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLocationInView
Bestimmt die Position eines Elements auf dem Bildschirm, nachdem es in die Ansicht gescrollt wurde.<br /><br />__Hinweis:__ Dies wird als interner Befehl betrachtet und sollte nur verwendet werden, um die Position eines Elements für die korrekte Generierung nativer Ereignisse zu bestimmen.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Verwendung

```js
driver.getLocationInView(elementId)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID des Elements, an das der Befehl weitergeleitet werden soll</td>
    </tr>
  </tbody>
</table>


##### Gibt zurück

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** Die X- und Y-Koordinaten für das Element auf der Seite.

##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## sendKeys
Sendet eine Folge von Tastendrücken an das aktive Element<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Verwendung

```js
driver.sendKeys(value)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string[]</td>
      <td>Die Tastenfolge zum Eingeben. Ein Array muss bereitgestellt werden.</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## availableIMEEngines
Listet alle verfügbaren Engines auf dem Computer auf. Um eine Engine zu verwenden, muss sie in dieser Liste vorhanden sein.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Verwendung

```js
driver.availableIMEEngines()
```


##### Gibt zurück

- **&lt;String[]&gt;**
            **<code><var>engines</var></code>:** Eine Liste verfügbarer Engines

##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getActiveIMEEngine
Ruft den Namen der aktiven IME-Engine ab. Die Namenszeichenfolge ist plattformspezifisch.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Verwendung

```js
driver.getActiveIMEEngine()
```


##### Gibt zurück

- **&lt;String&gt;**
            **<code><var>engine</var></code>:** Der Name der aktiven IME-Engine

##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## isIMEActivated
Gibt an, ob die IME-Eingabe im Moment aktiv ist<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Verwendung

```js
driver.isIMEActivated()
```


##### Gibt zurück

- **&lt;Boolean&gt;**
            **<code><var>isActive</var></code>:** true, wenn IME-Eingabe verfügbar und derzeit aktiv ist, andernfalls false

##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## deactivateIMEEngine
Deaktiviert die derzeit aktive IME-Engine.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Verwendung

```js
driver.deactivateIMEEngine()
```




##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateIMEEngine
Aktiviert eine verfügbare Engine<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Verwendung

```js
driver.activateIMEEngine(engine)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>engine</var></code></td>
      <td>string</td>
      <td>Name der zu aktivierenden Engine</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## asyncScriptTimeout
Legt die Zeit in Millisekunden fest, die asynchrone Skripte, die von `/session/:sessionId/execute_async` ausgeführt werden, ausgeführt werden dürfen, bevor sie abgebrochen und ein `Timeout`-Fehler an den Client zurückgegeben wird.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Verwendung

```js
driver.asyncScriptTimeout(ms)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>Die Zeit in Millisekunden, die zeitlich begrenzte Befehle ausgeführt werden dürfen</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## submit
Sendet ein Formularelement ab.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Verwendung

```js
driver.submit(elementId)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID des Formularelements, das abgesendet werden soll</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementSize
Bestimmt die Größe eines Elements in Pixeln. Die Größe wird als JSON-Objekt mit den Eigenschaften `width` und `height` zurückgegeben.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Verwendung

```js
driver.getElementSize(elementId)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID des Elements, an das der Befehl weitergeleitet werden soll</td>
    </tr>
  </tbody>
</table>


##### Gibt zurück

- **&lt;Object&gt;**
            **<code><var>size</var></code>:** Die Breite und Höhe des Elements in Pixeln.

##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementLocation
Bestimmt die Position eines Elements auf der Seite. Der Punkt `(0, 0)` bezieht sich auf die obere linke Ecke der Seite. Die Koordinaten des Elements werden als JSON-Objekt mit den Eigenschaften `x` und `y` zurückgegeben.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Verwendung

```js
driver.getElementLocation(elementId)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID des Elements, an das der Befehl weitergeleitet werden soll</td>
    </tr>
  </tbody>
</table>


##### Gibt zurück

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** Die X- und Y-Koordinaten für das Element auf der Seite.

##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchClick
Einzelner Tipp auf dem berührungsempfindlichen Gerät.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Verwendung

```js
driver.touchClick(element)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>ID des Elements, das mit einem Tipp berührt werden soll.</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchDown
Finger nach unten auf dem Bildschirm.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Verwendung

```js
driver.touchDown(x, y)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>x-Koordinate auf dem Bildschirm</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>y-Koordinate auf dem Bildschirm</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchUp
Finger hoch vom Bildschirm.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Verwendung

```js
driver.touchUp(x, y)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>x-Koordinate auf dem Bildschirm</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>y-Koordinate auf dem Bildschirm</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchMove
Fingerbewegung auf dem Bildschirm.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Verwendung

```js
driver.touchMove(x, y)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>x-Koordinate auf dem Bildschirm</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>y-Koordinate auf dem Bildschirm</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchLongClick
Langer Druck auf dem Touchscreen mit Fingerbewegungsereignissen.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Verwendung

```js
driver.touchLongClick(element)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>ID des Elements, auf das lange gedrückt werden soll</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchFlick
Wischen auf dem Touchscreen mit Fingerbewegungsereignissen. Dieser Wischbefehl beginnt an einer bestimmten Bildschirmposition.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Verwendung

```js
driver.touchFlick(xoffset, yoffset, element, speed, xspeed, yspeed)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>xoffset</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>der x-Offset in Pixeln, um den gewischt werden soll</td>
    </tr>
    <tr>
      <td><code><var>yoffset</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>der y-Offset in Pixeln, um den gewischt werden soll</td>
    </tr>
    <tr>
      <td><code><var>element</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>ID des Elements, an dem der Wisch beginnt</td>
    </tr>
    <tr>
      <td><code><var>speed</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>die Geschwindigkeit in Pixeln pro Sekunde</td>
    </tr>
    <tr>
      <td><code><var>xspeed</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>die x-Geschwindigkeit in Pixeln pro Sekunde</td>
    </tr>
    <tr>
      <td><code><var>yspeed</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>die y-Geschwindigkeit in Pixeln pro Sekunde</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getOrientation
Ruft die aktuelle Geräteausrichtung ab.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Verwendung

```js
driver.getOrientation()
```


##### Gibt zurück

- **&lt;String&gt;**
            **<code><var>orientation</var></code>:** Die aktuelle Ausrichtung entsprechend einem in ScreenOrientation definierten Wert: `LANDSCAPE|PORTRAIT`.

##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## setOrientation
Legt die Geräteausrichtung fest<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Verwendung

```js
driver.setOrientation(orientation)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>orientation</var></code></td>
      <td>string</td>
      <td>die neue Browser-Ausrichtung wie in ScreenOrientation definiert: `LANDSCAPE|PORTRAIT`</td>
    </tr>
  </tbody>
</table>


##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogs
Ruft das Protokoll für einen bestimmten Protokolltyp ab. Der Protokollpuffer wird nach jeder Anfrage zurückgesetzt.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Verwendung

```js
driver.getLogs(type)
```


##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>der Protokolltyp</td>
    </tr>
  </tbody>
</table>


##### Gibt zurück

- **&lt;Object[]&gt;**
            **<code><var>logs</var></code>:** Die Liste der Protokolleinträge.

##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogTypes
Ruft verfügbare Protokolltypen ab.<br /><br />Appium-Befehl. Weitere Details finden Sie in der [offiziellen Protokolldokumentation](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Verwendung

```js
driver.getLogTypes()
```


##### Gibt zurück

- **&lt;String[]&gt;**
            **<code><var>logTypes</var></code>:** Die Liste der verfügbaren Protokolltypen.

##### Unterstützung

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)
