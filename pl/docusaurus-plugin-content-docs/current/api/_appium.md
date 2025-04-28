---
id: appium
title: Appium
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/appium.ts
---

## getAppiumContext
Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### Użycie

```js
driver.getAppiumContext()
```


##### Zwraca

- **&lt;Context&gt;**
            **<code><var>context</var></code>:** ciąg znaków reprezentujący bieżący kontekst lub null oznaczający 'brak kontekstu'


---

## switchAppiumContext
Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### Użycie

```js
driver.switchAppiumContext(name)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>ciąg znaków reprezentujący dostępny kontekst</td>
    </tr>
  </tbody>
</table>



---

## getAppiumContexts
Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### Użycie

```js
driver.getAppiumContexts()
```


##### Zwraca

- **&lt;Context[]&gt;**
            **<code><var>contexts</var></code>:** tablica ciągów reprezentujących dostępne konteksty, np. 'WEBVIEW' lub 'NATIVE'


---

## shake
Wykonanie akcji potrząśnięcia na urządzeniu.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/interactions/shake/).

##### Użycie

```js
driver.shake()
```




##### Wsparcie

![Wsparcie dla XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## lock
Zablokuj urządzenie.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/interactions/lock/).

##### Użycie

```js
driver.lock(seconds)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>seconds</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>number</td>
      <td>jak długo blokować ekran (tylko iOS)</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)
![Wsparcie dla Windows (10+)](/img/icons/windows.svg)

---

## unlock
Odblokuj urządzenie.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/interactions/unlock/).

##### Użycie

```js
driver.unlock()
```




##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)
![Wsparcie dla Windows (10+)](/img/icons/windows.svg)

---

## isLocked
Sprawdź, czy urządzenie jest zablokowane czy nie.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/interactions/is-locked/).

##### Użycie

```js
driver.isLocked()
```


##### Zwraca

- **&lt;boolean&gt;**
            **<code><var>isLocked</var></code>:** Prawda, jeśli urządzenie jest zablokowane, fałsz jeśli nie

##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)
![Wsparcie dla Windows (10+)](/img/icons/windows.svg)

---

## startRecordingScreen
Rozpocznij nagrywanie ekranu.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/).

##### Użycie

```js
driver.startRecordingScreen(options)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>object</td>
      <td>parametry komendy, które mogą zawierać klucze jak: remotePath, username, password, method, forceRestart, timeLimit, videoType, videoQuality, videoFps, bitRate, videoSize, bugReport (więcej opisu w dokumentacji Appium)</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla XCUITest (9.3+)](/img/icons/ios.svg)
![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)
![Wsparcie dla Windows (10+)](/img/icons/windows.svg)

---

## stopRecordingScreen
Zatrzymaj nagrywanie ekranu<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/stop-recording-screen/).

##### Użycie

```js
driver.stopRecordingScreen(remotePath, username, password, method)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>remotePath</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>string</td>
      <td>Ścieżka do zdalnej lokalizacji, gdzie utworzone wideo powinno zostać przesłane. Obsługiwane są następujące protokoły: http/https, ftp. Ta opcja ma efekt tylko wtedy, gdy istnieje proces nagrywania ekranu i parametr forceRestart nie jest ustawiony na true. Wartość null lub pusty ciąg (ustawienie domyślne) oznacza, że zawartość wynikowego pliku powinna być zakodowana jako Base64.</td>
    </tr>
    <tr>
      <td><code><var>username</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>string</td>
      <td>Nazwa użytkownika do uwierzytelnienia zdalnego.</td>
    </tr>
    <tr>
      <td><code><var>password</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>string</td>
      <td>Hasło do uwierzytelnienia zdalnego.</td>
    </tr>
    <tr>
      <td><code><var>method</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>string</td>
      <td>Nazwa metody przesyłania wieloczęściowego HTTP. Domyślnie używana jest metoda 'PUT'.</td>
    </tr>
  </tbody>
</table>


##### Zwraca

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Ciąg zakodowany w Base64. Jeśli remote_path jest ustawiony, odpowiedź jest pustym ciągiem

##### Wsparcie

![Wsparcie dla XCUITest (9.3+)](/img/icons/ios.svg)
![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)
![Wsparcie dla Windows (10+)](/img/icons/windows.svg)

---

## getPerformanceDataTypes
Zwraca typy informacji o stanie systemu, które są obsługiwane do odczytu, takie jak cpu, memory, network traffic i battery.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/performance-data-types/).

##### Użycie

```js
driver.getPerformanceDataTypes()
```


##### Zwraca

- **&lt;string[]&gt;**
            **<code><var>performanceTypes</var></code>:** Dostępne typy danych wydajnościowych (cpuinfo|batteryinfo|networkinfo|memoryinfo)

##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## getPerformanceData
Zwraca informacje o stanie systemu, które są obsługiwane do odczytu, takie jak cpu, memory, network traffic i battery.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/get-performance-data/).

##### Użycie

```js
driver.getPerformanceData(packageName, dataType, dataReadTimeout)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>packageName</var></code></td>
      <td>string</td>
      <td>nazwa pakietu aplikacji</td>
    </tr>
    <tr>
      <td><code><var>dataType</var></code></td>
      <td>string</td>
      <td>typ stanu systemu, który chcemy odczytać. Powinien to być jeden z obsługiwanych typów danych wydajnościowych</td>
    </tr>
    <tr>
      <td><code><var>dataReadTimeout</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>number</td>
      <td>liczba prób odczytu</td>
    </tr>
  </tbody>
</table>


##### Zwraca

- **&lt;string[]&gt;**
            **<code><var>performanceData</var></code>:** Typ informacji o stanie systemu, które są obsługiwane do odczytu, takie jak cpu, memory, network traffic i battery

##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## pressKeyCode
Naciśnij określony klawisz na urządzeniu.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/keys/press-keycode/).

##### Użycie

```js
driver.pressKeyCode(keycode, metastate, flags)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>kod klawisza do naciśnięcia</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>number</td>
      <td>stan meta do naciśnięcia z kodem klawisza</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>number</td>
      <td>flagi dla naciśnięcia klawisza</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## longPressKeyCode
Naciśnij i przytrzymaj określony kod klawisza na urządzeniu.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/keys/long-press-keycode/).

##### Użycie

```js
driver.longPressKeyCode(keycode, metastate, flags)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>kod klawisza do naciśnięcia na urządzeniu</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>number</td>
      <td>stan meta dla naciśnięcia klawisza</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>number</td>
      <td>flagi dla naciśnięcia klawisza</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendKeyEvent
Wyślij kod klawisza do urządzenia.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Użycie

```js
driver.sendKeyEvent(keycode, metastate)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>keycode</var></code></td>
      <td>string</td>
      <td>kod klawisza do naciśnięcia</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>string</td>
      <td>stan meta do naciśnięcia z kodem klawisza</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## rotateDevice
Obróć urządzenie w trzech wymiarach.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-rotation).

##### Użycie

```js
driver.rotateDevice(x, y, z)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>przesunięcie x do użycia dla środka gestu obrotu</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>przesunięcie y do użycia dla środka gestu obrotu</td>
    </tr>
    <tr>
      <td><code><var>z</var></code></td>
      <td>number</td>
      <td>przesunięcie z do użycia dla środka gestu obrotu</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentActivity
Pobierz nazwę bieżącej aktywności Androida.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-activity/).

##### Użycie

```js
driver.getCurrentActivity()
```


##### Zwraca

- **&lt;string&gt;**
            **<code><var>activity</var></code>:** Nazwa bieżącej aktywności

##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentPackage
Pobierz nazwę bieżącego pakietu Androida.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-package/).

##### Użycie

```js
driver.getCurrentPackage()
```


##### Zwraca

- **&lt;string&gt;**
            **<code><var>package</var></code>:** Nazwa bieżącego pakietu

##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## installApp
Zainstaluj daną aplikację na urządzeniu.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/app/install-app/).

##### Użycie

```js
driver.installApp(appPath)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appPath</var></code></td>
      <td>string</td>
      <td>ścieżka do pliku aplikacji .apk</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateApp
Aktywuj daną aplikację na urządzeniu<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/app/activate-app/).

##### Użycie

```js
driver.activateApp(appId)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID aplikacji (ID pakietu dla Androida, ID pakietu dla iOS)</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla XCUITest (9.3+)](/img/icons/ios.svg)
![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## removeApp
Usuń aplikację z urządzenia.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/app/remove-app/).

##### Użycie

```js
driver.removeApp(appId)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID aplikacji (ID pakietu dla Androida, ID pakietu dla iOS)</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## terminateApp
Zakończ daną aplikację na urządzeniu<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/app/terminate-app/).

##### Użycie

```js
driver.terminateApp(appId, options)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID aplikacji (ID pakietu dla Androida, ID pakietu dla iOS)</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>object</td>
      <td>Opcje komendy. Np. "timeout": (Tylko Android) Limit czasu na ponowne zakończenie aplikacji (więcej w dokumentacji Appium)</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla XCUITest (9.3+)](/img/icons/ios.svg)
![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## isAppInstalled
Sprawdź, czy określona aplikacja jest zainstalowana na urządzeniu.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/app/is-app-installed/).

##### Użycie

```js
driver.isAppInstalled(appId)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID aplikacji (ID pakietu dla Androida, ID pakietu dla iOS)</td>
    </tr>
  </tbody>
</table>


##### Zwraca

- **&lt;boolean&gt;**
            **<code><var>isAppInstalled</var></code>:** Zwraca true jeśli zainstalowane, false jeśli nie

##### Wsparcie

![Wsparcie dla XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## queryAppState
Pobierz status danej aplikacji na urządzeniu<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/app/app-state/).

##### Użycie

```js
driver.queryAppState(appId)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID aplikacji (ID pakietu dla Androida, ID pakietu dla iOS)</td>
    </tr>
  </tbody>
</table>


##### Zwraca

- **&lt;number&gt;**
            **<code><var>appStatus</var></code>:** 0 oznacza niezainstalowaną. 1 oznacza nie uruchomioną. 2 oznacza uruchomioną w tle lub zawieszoną. 3 oznacza uruchomioną w tle. 4 oznacza uruchomioną na pierwszym planie

##### Wsparcie

![Wsparcie dla XCUITest (9.3+)](/img/icons/ios.svg)
![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## hideKeyboard
Ukryj klawiaturę ekranową.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/keys/hide-keyboard/).

##### Użycie

```js
driver.hideKeyboard(strategy, key, keyCode, keyName)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>strategy</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>string</td>
      <td>strategia ukrywania klawiatury (tylko UIAutomation), dostępne strategie - 'press', 'pressKey', 'swipeDown', 'tapOut', 'tapOutside', 'default'</td>
    </tr>
    <tr>
      <td><code><var>key</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>string</td>
      <td>wartość klawisza jeśli strategia to 'pressKey'</td>
    </tr>
    <tr>
      <td><code><var>keyCode</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>string</td>
      <td>kod klawisza jeśli strategia to 'pressKey'</td>
    </tr>
    <tr>
      <td><code><var>keyName</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>string</td>
      <td>nazwa klawisza jeśli strategia to 'pressKey'</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)
![Wsparcie dla Windows (10+)](/img/icons/windows.svg)

---

## isKeyboardShown
Czy klawiatura ekranowa jest wyświetlana.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/keys/is-keyboard-shown/).

##### Użycie

```js
driver.isKeyboardShown()
```


##### Zwraca

- **&lt;boolean&gt;**
            **<code><var>isKeyboardShown</var></code>:** Prawda, jeśli klawiatura jest wyświetlana

##### Wsparcie

![Wsparcie dla XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)
![Wsparcie dla Windows (10+)](/img/icons/windows.svg)

---

## pushFile
Umieść plik na urządzeniu w określonym miejscu.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/files/push-file/).

##### Użycie

```js
driver.pushFile(path, data)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>ścieżka do zainstalowania danych</td>
    </tr>
    <tr>
      <td><code><var>data</var></code></td>
      <td>string</td>
      <td>zawartość pliku w base64</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)
![Wsparcie dla Windows (10+)](/img/icons/windows.svg)

---

## pullFile
Pobierz plik z systemu plików urządzenia.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-file/).

##### Użycie

```js
driver.pullFile(path)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>ścieżka na urządzeniu, z której pobrać plik</td>
    </tr>
  </tbody>
</table>


##### Zwraca

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Zawartość pliku w base64

##### Wsparcie

![Wsparcie dla XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)
![Wsparcie dla Windows (10+)](/img/icons/windows.svg)

---

## pullFolder
Pobierz folder z systemu plików urządzenia.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-folder/).

##### Użycie

```js
driver.pullFolder(path)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>ścieżka do całego folderu na urządzeniu</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)
![Wsparcie dla Windows (10+)](/img/icons/windows.svg)

---

## toggleAirplaneMode
Przełącz tryb samolotowy na urządzeniu.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-airplane-mode/).

##### Użycie

```js
driver.toggleAirplaneMode()
```




##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleData
Przełącz stan usługi danych.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-data/).

##### Użycie

```js
driver.toggleData()
```




##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleWiFi
Przełącz stan usługi wifi.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-wifi/).

##### Użycie

```js
driver.toggleWiFi()
```




##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleLocationServices
Przełącz stan usługi lokalizacji.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-location-services/).

##### Użycie

```js
driver.toggleLocationServices()
```




##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleNetworkSpeed
Ustaw prędkość sieci (tylko Emulator)<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/network/network-speed/).

##### Użycie

```js
driver.toggleNetworkSpeed(netspeed)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>netspeed</var></code></td>
      <td>string</td>
      <td>Typ sieci - 'full','gsm', 'edge', 'hscsd', 'gprs', 'umts', 'hsdpa', 'lte', 'evdo'</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## openNotifications
Otwórz powiadomienia Androida (tylko Emulator).<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/system/open-notifications/).

##### Użycie

```js
driver.openNotifications()
```




##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## startActivity
Uruchom aktywność Androida podając nazwę pakietu i nazwę aktywności.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/activity/start-activity/).

##### Użycie

```js
driver.startActivity(appPackage, appActivity, appWaitPackage, appWaitActivity, intentAction, intentCategory, intentFlags, optionalIntentArguments, dontStopAppOnReset)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appPackage</var></code></td>
      <td>string</td>
      <td>nazwa aplikacji</td>
    </tr>
    <tr>
      <td><code><var>appActivity</var></code></td>
      <td>string</td>
      <td>nazwa aktywności</td>
    </tr>
    <tr>
      <td><code><var>appWaitPackage</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>string</td>
      <td>nazwa aplikacji, na którą należy czekać</td>
    </tr>
    <tr>
      <td><code><var>appWaitActivity</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>string</td>
      <td>nazwa aktywności, na którą należy czekać</td>
    </tr>
    <tr>
      <td><code><var>intentAction=android.intent.action.MAIN</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>string</td>
      <td>akcja intencji, która zostanie użyta do uruchomienia aktywności</td>
    </tr>
    <tr>
      <td><code><var>intentCategory=android.intent.category.LAUNCHER</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>string</td>
      <td>kategoria intencji, która zostanie użyta do uruchomienia aktywności</td>
    </tr>
    <tr>
      <td><code><var>intentFlags=0x10200000</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>string</td>
      <td>flagi, które będą używane do uruchomienia aktywności</td>
    </tr>
    <tr>
      <td><code><var>optionalIntentArguments</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>string</td>
      <td>dodatkowe argumenty intencji, które będą używane do uruchomienia aktywności</td>
    </tr>
    <tr>
      <td><code><var>dontStopAppOnReset</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>string</td>
      <td>nie zatrzymuje procesu testowanej aplikacji przed uruchomieniem aplikacji za pomocą adb</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSystemBars
Pobierz informacje o widoczności i granicach pasków stanu i nawigacji.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/system/system-bars/).

##### Użycie

```js
driver.getSystemBars()
```


##### Zwraca

- **&lt;object[]&gt;**
            **<code><var>systemBars</var></code>:** Informacje o widoczności i granicach paska stanu i nawigacji

##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDeviceTime
Pobierz czas z urządzenia.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/system/system-time/).

##### Użycie

```js
driver.getDeviceTime()
```


##### Zwraca

- **&lt;string&gt;**
            **<code><var>time</var></code>:** Czas na urządzeniu

##### Wsparcie

![Wsparcie dla XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDisplayDensity
Pobierz gęstość wyświetlacza z urządzenia.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Użycie

```js
driver.getDisplayDensity()
```


##### Zwraca

- **&lt;*&gt;**


##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchId
Symuluj zdarzenie [touch id](https://support.apple.com/en-ca/ht201371) (tylko Symulator iOS). Aby włączyć tę funkcję, opcja `allowTouchIdEnroll` musi być ustawiona na true, a Symulator musi być [zarejestrowany](https://support.apple.com/en-ca/ht201371). Gdy ustawisz allowTouchIdEnroll na true, Symulator będzie domyślnie zarejestrowany. Stan rejestracji można [przełączać](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/index.html). To wywołanie będzie działać tylko wtedy, gdy proces Appium lub jego aplikacja nadrzędna (np. Terminal.app lub Appium.app) ma dostęp do dostępności systemu Mac OS w Preferencje systemowe > Bezpieczeństwo i prywatność > Prywatność > Dostępność.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/simulator/touch-id/).

##### Użycie

```js
driver.touchId(match)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>match</var></code></td>
      <td>boolean</td>
      <td>czy symulujemy udane dotknięcie (true) czy nieudane dotknięcie (false)</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla XCUITest (9.3+)](/img/icons/ios.svg)

---

## toggleEnrollTouchId
Przełączanie rejestracji symulatora do akceptowania touchId (tylko Symulator iOS). Aby włączyć tę funkcję, opcja `allowTouchIdEnroll` musi być ustawiona na true. Gdy `allowTouchIdEnroll` jest ustawiona na true, Symulator będzie zarejestrowany domyślnie, a 'Toggle Touch ID Enrollment' zmienia stan rejestracji. To wywołanie będzie działać tylko wtedy, gdy proces Appium lub jego aplikacja nadrzędna (np. Terminal.app lub Appium.app) ma dostęp do dostępności systemu Mac OS w Preferencje systemowe > Bezpieczeństwo i prywatność > Prywatność > Dostępność.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/).

##### Użycie

```js
driver.toggleEnrollTouchId(enabled)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>enabled=true</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>boolean</td>
      <td>równa się true, jeśli rejestracja TouchID powinna być włączona</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla XCUITest (9.3+)](/img/icons/ios.svg)

---

## launchApp
Uruchom aplikację na urządzeniu.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/app/launch-app/).
:::caution

Ta komenda protokołu jest przestarzała<br />Dla iOS, użyj `driver.execute('mobile: launchApp', { ... })`, a dla Androida, użyj `driver.execute('mobile: activateApp', { ... })`.
:::

##### Użycie

```js
driver.launchApp()
```




##### Wsparcie

![Wsparcie dla XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## closeApp
Zamknij aplikację na urządzeniu.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/app/close-app/).
:::caution

Ta komenda protokołu jest przestarzała<br />Użyj `driver.execute('mobile: terminateApp', { ... })` zamiast tego
:::

##### Użycie

```js
driver.closeApp()
```




##### Wsparcie

![Wsparcie dla XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## background
Wyślij aktualnie uruchomioną aplikację dla tej sesji w tło.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/app/background-app/).
:::caution

Ta komenda protokołu jest przestarzała<br />Użyj `driver.execute('mobile: backgroundApp', { ... })` zamiast tego
:::

##### Użycie

```js
driver.background(seconds)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>seconds=null</var></code></td>
      <td>number, null</td>
      <td>limit czasu na przywrócenie aplikacji, jeśli 'null', aplikacja nie zostanie przywrócona</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## endCoverage
Pobierz dane pokrycia testowego.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/app/end-test-coverage/).

##### Użycie

```js
driver.endCoverage(intent, path)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>intent</var></code></td>
      <td>string</td>
      <td>intencja do rozgłoszenia</td>
    </tr>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>ścieżka do pliku .ec</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## getStrings
Pobierz ciągi aplikacji.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/app/get-app-strings/).

##### Użycie

```js
driver.getStrings(language, stringFile)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>language</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>string</td>
      <td>kod języka</td>
    </tr>
    <tr>
      <td><code><var>stringFile</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>string</td>
      <td>ścieżka do pliku ciągów</td>
    </tr>
  </tbody>
</table>


##### Zwraca

- **&lt;object&gt;**
            **<code><var>appStrings</var></code>:** wszystkie zdefiniowane ciągi z aplikacji dla określonego języka i nazwy pliku ciągów

##### Wsparcie

![Wsparcie dla XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## setValueImmediate
Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Użycie

```js
driver.setValueImmediate(elementId, text)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>identyfikator elementu zwrócony w poprzednim wywołaniu Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>tekst do ustawienia w elemencie</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla XCUITest (9.3+)](/img/icons/ios.svg)
![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## replaceValue
Zastąp wartość elementu bezpośrednio.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Użycie

```js
driver.replaceValue(elementId, value)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>identyfikator elementu zwrócony w poprzednim wywołaniu Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>wartość do zastąpienia w elemencie</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSettings
Pobierz bieżące ustawienia z urządzenia.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/session/settings/get-settings/).

##### Użycie

```js
driver.getSettings()
```


##### Zwraca

- **&lt;object&gt;**
            **<code><var>settings</var></code>:** Tablica JSON ze wszystkimi aktualnie określonymi ustawieniami, patrz API Ustawień

##### Wsparcie

![Wsparcie dla XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)
![Wsparcie dla Windows (10+)](/img/icons/windows.svg)

---

## updateSettings
Zaktualizuj bieżące ustawienie na urządzeniu.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/session/settings/update-settings/).

##### Użycie

```js
driver.updateSettings(settings)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>settings</var></code></td>
      <td>object</td>
      <td>obiekt klucz/wartość z ustawieniami do aktualizacji</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)
![Wsparcie dla Windows (10+)](/img/icons/windows.svg)

---

## receiveAsyncResponse
Adres URL wywołania zwrotnego dla asynchronicznego wykonania JavaScript.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Użycie

```js
driver.receiveAsyncResponse(response)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>response</var></code></td>
      <td>object</td>
      <td>odpowiedź do odebrania na urządzeniu</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## gsmCall
Wykonaj połączenie GSM (tylko Emulator).<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-call/).

##### Użycie

```js
driver.gsmCall(phoneNumber, action)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>numer telefonu do zadzwonienia</td>
    </tr>
    <tr>
      <td><code><var>action</var></code></td>
      <td>string</td>
      <td>Akcja - 'call', 'accept', 'cancel', 'hold'</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmSignal
Ustaw siłę sygnału GSM (tylko Emulator).<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-signal/).

##### Użycie

```js
driver.gsmSignal(signalStrength, signalStrengh)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>signalStrength</var></code></td>
      <td>string</td>
      <td>siła sygnału w zakresie [0, 4]</td>
    </tr>
    <tr>
      <td><code><var>signalStrengh</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>string</td>
      <td>siła sygnału w zakresie [0, 4]. Ustaw również ten parametr z tą samą wartością, jeśli używasz Appium w wersji 1.11.0 lub niższej (patrz https://github.com/appium/appium/issues/12234).</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerCapacity
Ustaw procent baterii (tylko Emulator).<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_capacity/).

##### Użycie

```js
driver.powerCapacity(percent)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>percent</var></code></td>
      <td>number</td>
      <td>wartość procentowa w zakresie [0, 100]</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerAC
Ustaw stan ładowarki baterii na podłączony lub nie (tylko Emulator).<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_ac/).

##### Użycie

```js
driver.powerAC(state)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>ustaw stan. on lub off</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmVoice
Ustaw stan głosu GSM (tylko Emulator).<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-voice/).

##### Użycie

```js
driver.gsmVoice(state)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>stan głosu GSM - 'unregistered', 'home', 'roaming', 'searching', 'denied', 'off', 'on'</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendSms
Symuluj wiadomość SMS (tylko Emulator).<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/network/send-sms/).

##### Użycie

```js
driver.sendSms(phoneNumber, message)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>numer telefonu, na który ma zostać wysłana wiadomość SMS</td>
    </tr>
    <tr>
      <td><code><var>message</var></code></td>
      <td>string</td>
      <td>wiadomość SMS</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## fingerPrint
Uwierzytelniaj użytkowników za pomocą skanów odcisków palców na obsługiwanych emulatorach.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/authentication/finger-print/).

##### Użycie

```js
driver.fingerPrint(fingerprintId)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>fingerprintId</var></code></td>
      <td>number</td>
      <td>odciski palców przechowywane w systemie Android Keystore (od 1 do 10)</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## setClipboard
Ustaw zawartość schowka systemowego<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/set-clipboard/).

##### Użycie

```js
driver.setClipboard(content, contentType, label)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>content</var></code></td>
      <td>string</td>
      <td>Rzeczywista zawartość schowka zakodowana w base64</td>
    </tr>
    <tr>
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>string</td>
      <td>Typ zawartości do pobrania. Plaintext, Image, URL. Android obsługuje tylko plaintext</td>
    </tr>
    <tr>
      <td><code><var>label</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>string</td>
      <td>Etykieta danych schowka dla Androida</td>
    </tr>
  </tbody>
</table>


##### Zwraca

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Odpowiedź z serwera Appium

##### Wsparcie

![Wsparcie dla XCUITest (9.3+)](/img/icons/ios.svg)
![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## getClipboard
Pobierz zawartość schowka systemowego<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/get-clipboard/).

##### Użycie

```js
driver.getClipboard(contentType)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>string</td>
      <td>Typ zawartości do pobrania. Plaintext, Image, URL. Android obsługuje tylko plaintext</td>
    </tr>
  </tbody>
</table>


##### Zwraca

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Zawartość schowka jako ciąg zakodowany w base64 lub pusty ciąg, jeśli schowek jest pusty

##### Wsparcie

![Wsparcie dla XCUITest (9.3+)](/img/icons/ios.svg)
![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchPerform
Ta funkcjonalność jest dostępna tylko w kontekście natywnym. 'Touch Perform' działa podobnie do innych pojedynczych interakcji dotykowych, z wyjątkiem tego, że pozwala łączyć więcej niż jedną akcję dotykową jako jedną komendę. Jest to przydatne, ponieważ komendy Appium są wysyłane przez sieć i występuje opóźnienie między komendami. To opóźnienie może uniemożliwić niektóre interakcje dotykowe, ponieważ niektóre interakcje muszą być wykonywane w jednej sekwencji. Vertical, na przykład, wymaga naciśnięcia, przesunięcia do innej współrzędnej y, a następnie zwolnienia. Aby to zadziałało, nie może być opóźnienia między interakcjami.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/touch-perform/).

##### Użycie

```js
driver.touchPerform(actions)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>Typ akcji do wykonania (np. moveTo, release, press, tap, wait)</td>
    </tr>
  </tbody>
</table>

##### Przykład


```js
// wykonaj poziome przesunięcie procentowo
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


##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)
![Wsparcie dla XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Wsparcie dla Windows (10+)](/img/icons/windows.svg)

---

## multiTouchPerform
Ta funkcjonalność jest dostępna tylko w kontekście natywnym. Wykonaj sekwencję akcji multi-touch.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/multi-touch-perform/).

##### Użycie

```js
driver.multiTouchPerform(actions)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>Typ akcji do wykonania (np. moveTo, release, press, tap, wait)</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)
![Wsparcie dla XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Wsparcie dla Windows (10+)](/img/icons/windows.svg)

---

## executeDriverScript
Ta komenda umożliwia określenie skryptu WebdriverIO jako ciągu znaków i przesłanie go do serwera Appium w celu lokalnego wykonania na samym serwerze. To podejście pomaga zminimalizować potencjalne opóźnienia związane z każdą komendą. ***Aby korzystać z tej komendy z Appium 2.0, musisz mieć zainstalowany plugin [`execute-driver-plugin`](https://github.com/appium/appium/tree/master/packages/execute-driver-plugin).***<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium/blob/master/docs/en/commands/session/execute-driver.md).

##### Użycie

```js
driver.executeDriverScript(script, type, timeout)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>Skrypt do wykonania. Ma dostęp do obiektu 'driver', który reprezentuje sesję WebdriverIO dołączoną do bieżącego serwera.</td>
    </tr>
    <tr>
      <td><code><var>type</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>string</td>
      <td>Język/framework użyty w skrypcie. Obecnie obsługiwany jest tylko 'webdriverio' i jest to domyślna wartość.</td>
    </tr>
    <tr>
      <td><code><var>timeout</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>number</td>
      <td>Liczba milisekund, przez które skrypt powinien móc działać przed zabiciem przez serwer Appium. Domyślnie równowartość 1 godziny.</td>
    </tr>
  </tbody>
</table>


##### Zwraca

- **&lt;object&gt;**
            **<code><var>result</var></code>:** Obiekt zawierający dwa pola: 'result', który jest wartością zwracaną samego skryptu, oraz 'logs', który zawiera 3 wewnętrzne pola, 'log', 'warn' i 'error', które zawierają tablicę ciągów znaków zarejestrowanych przez console.log, console.warn i console.error podczas wykonywania skryptu.


---

## getEvents
Pobierz zdarzenia przechowywane na serwerze appium.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/get-events.md).

##### Użycie

```js
driver.getEvents(type)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string[]</td>
      <td>Pobierz zdarzenia, które są filtrowane według typu, jeśli typ jest podany.</td>
    </tr>
  </tbody>
</table>


##### Zwraca

- **&lt;object&gt;**
            **<code><var>result</var></code>:** Tablica JSON ze zdarzeniami, jak `{'commands' => [{'cmd' => 123455, ....}], 'startTime' => 1572954894127, }`.

##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)
![Wsparcie dla XCUITest (9.3+)](/img/icons/ios.svg)

---

## logEvent
Zapisz niestandardowe zdarzenie.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/log-event.md).

##### Użycie

```js
driver.logEvent(vendor, event)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>vendor</var></code></td>
      <td>string</td>
      <td>Nazwa dostawcy. Będzie to `vendor` w `vendor:event`.</td>
    </tr>
    <tr>
      <td><code><var>event</var></code></td>
      <td>string</td>
      <td>Nazwa zdarzenia. Będzie to `event` w `vendor:event`.</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)
![Wsparcie dla XCUITest (9.3+)](/img/icons/ios.svg)

---

## compareImages
Ta funkcja przeprowadza porównania obrazów wykorzystując możliwości frameworku OpenCV. Należy pamiętać, że do działania tej funkcji zarówno framework OpenCV, jak i moduł opencv4nodejs muszą być zainstalowane na maszynie, na której działa serwer Appium. ***Ponadto, musisz mieć zainstalowany plugin [`images-plugin`](https://github.com/appium/appium/tree/master/packages/images-plugin), aby korzystać z tej funkcji z Appium 2.0.***<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://appium.github.io/appium.io/docs/en/writing-running-appium/image-comparison/).

##### Użycie

```js
driver.compareImages(mode, firstImage, secondImage, options)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mode=matchFeatures</var></code></td>
      <td>string</td>
      <td>Jeden z możliwych trybów porównania: 'matchFeatures', 'getSimilarity', 'matchTemplate'. Domyślnie 'matchFeatures'.</td>
    </tr>
    <tr>
      <td><code><var>firstImage</var></code></td>
      <td>string</td>
      <td>Dane obrazu. Wszystkie formaty obrazów, które sama biblioteka OpenCV akceptuje, są obsługiwane.</td>
    </tr>
    <tr>
      <td><code><var>secondImage</var></code></td>
      <td>string</td>
      <td>Dane obrazu. Wszystkie formaty obrazów, które sama biblioteka OpenCV akceptuje, są obsługiwane.</td>
    </tr>
    <tr>
      <td><code><var>options=[object Object]</var></code></td>
      <td>object</td>
      <td>Zawartość tego słownika zależy od rzeczywistej wartości `mode`. Zobacz dokumentację modułu `appium-support`, aby uzyskać więcej szczegółów. </td>
    </tr>
  </tbody>
</table>


##### Zwraca

- **&lt;object&gt;**
            **<code><var>result</var></code>:** Zawartość wynikowego słownika zależy od rzeczywistych wartości `mode` i `options`. Zobacz dokumentację modułu `appium-support`, aby uzyskać więcej szczegółów.


---

## implicitWait
Ustaw ilość czasu, przez który sterownik powinien czekać podczas wyszukiwania elementów. Podczas wyszukiwania pojedynczego elementu sterownik powinien odpytywać stronę, aż zostanie znaleziony element lub upłynie limit czasu, w zależności od tego, co nastąpi wcześniej. Podczas wyszukiwania wielu elementów sterownik powinien odpytywać stronę, aż znajdzie co najmniej jeden element lub upłynie limit czasu, w którym to momencie powinien zwrócić pustą listę. Jeśli ta komenda nigdy nie zostanie wysłana, sterownik powinien domyślnie ustawić niejawne oczekiwanie na 0 ms.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Użycie

```js
driver.implicitWait(ms)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>Ilość czasu w milisekundach, przez którą należy czekać na element.</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)
![Wsparcie dla XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLocationInView
Określ lokalizację elementu na ekranie po przewinięciu go do widoku.<br /><br />__Uwaga:__ Jest to uznawane za komendę wewnętrzną i powinno być używane tylko do określania lokalizacji elementu w celu poprawnego generowania zdarzeń natywnych.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Użycie

```js
driver.getLocationInView(elementId)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID elementu, do którego kierowana jest komenda</td>
    </tr>
  </tbody>
</table>


##### Zwraca

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** Współrzędne X i Y elementu na stronie.

##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)
![Wsparcie dla XCUITest (9.3+)](/img/icons/ios.svg)

---

## sendKeys
Wyślij sekwencję naciśnięć klawiszy do aktywnego elementu<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Użycie

```js
driver.sendKeys(value)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string[]</td>
      <td>Sekwencja klawiszy do wprowadzenia. Musi być podana tablica.</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)
![Wsparcie dla XCUITest (9.3+)](/img/icons/ios.svg)

---

## availableIMEEngines
Wylistuj wszystkie dostępne silniki na maszynie. Aby użyć silnika, musi być on obecny na tej liście.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Użycie

```js
driver.availableIMEEngines()
```


##### Zwraca

- **&lt;String[]&gt;**
            **<code><var>engines</var></code>:** Lista dostępnych silników

##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## getActiveIMEEngine
Pobierz nazwę aktywnego silnika IME. Ciąg nazwy jest specyficzny dla platformy.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Użycie

```js
driver.getActiveIMEEngine()
```


##### Zwraca

- **&lt;String&gt;**
            **<code><var>engine</var></code>:** Nazwa aktywnego silnika IME

##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## isIMEActivated
Wskazuje, czy wprowadzanie IME jest aktywne w danym momencie<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Użycie

```js
driver.isIMEActivated()
```


##### Zwraca

- **&lt;Boolean&gt;**
            **<code><var>isActive</var></code>:** Prawda, jeśli wprowadzanie IME jest dostępne i aktualnie aktywne, fałsz w przeciwnym razie

##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## deactivateIMEEngine
Dezaktywuje aktualnie aktywny silnik IME.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Użycie

```js
driver.deactivateIMEEngine()
```




##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateIMEEngine
Aktywuj silnik, który jest dostępny<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Użycie

```js
driver.activateIMEEngine(engine)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>engine</var></code></td>
      <td>string</td>
      <td>nazwa silnika do aktywacji</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## asyncScriptTimeout
Ustaw ilość czasu w milisekundach, przez którą asynchroniczne skrypty wykonywane przez `/session/:sessionId/execute_async` mogą działać przed przerwaniem i zwróceniem błędu `Timeout` do klienta.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Użycie

```js
driver.asyncScriptTimeout(ms)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>Ilość czasu w milisekundach, przez którą polecenia z ograniczeniem czasowym mogą działać</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla XCUITest (9.3+)](/img/icons/ios.svg)

---

## submit
Prześlij element formularza.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Użycie

```js
driver.submit(elementId)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID elementu formularza do przesłania</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementSize
Określ rozmiar elementu w pikselach. Rozmiar zostanie zwrócony jako obiekt JSON z właściwościami `width` i `height`.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Użycie

```js
driver.getElementSize(elementId)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID elementu, do którego kierowana jest komenda</td>
    </tr>
  </tbody>
</table>


##### Zwraca

- **&lt;Object&gt;**
            **<code><var>size</var></code>:** Szerokość i wysokość elementu w pikselach.

##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)
![Wsparcie dla XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementLocation
Określ lokalizację elementu na stronie. Punkt `(0, 0)` odnosi się do lewego górnego rogu strony. Współrzędne elementu są zwracane jako obiekt JSON z właściwościami `x` i `y`.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Użycie

```js
driver.getElementLocation(elementId)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID elementu, do którego kierowana jest komenda</td>
    </tr>
  </tbody>
</table>


##### Zwraca

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** Współrzędne X i Y elementu na stronie.

##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)
![Wsparcie dla XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchClick
Pojedyncze dotknięcie na urządzeniu z obsługą dotyku.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Użycie

```js
driver.touchClick(element)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>ID elementu do pojedynczego dotknięcia.</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)
![Wsparcie dla XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchDown
Palec w dół na ekranie.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Użycie

```js
driver.touchDown(x, y)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>współrzędna x na ekranie</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>współrzędna y na ekranie</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchUp
Palec w górę na ekranie.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Użycie

```js
driver.touchUp(x, y)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>współrzędna x na ekranie</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>współrzędna y na ekranie</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchMove
Ruch palcem na ekranie.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Użycie

```js
driver.touchMove(x, y)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>współrzędna x na ekranie</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>współrzędna y na ekranie</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchLongClick
Długie naciśnięcie na ekranie dotykowym za pomocą zdarzeń ruchu palców.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Użycie

```js
driver.touchLongClick(element)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>ID elementu do długiego naciśnięcia</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchFlick
Szybki ruch na ekranie dotykowym za pomocą zdarzeń ruchu palców. Ta komenda flick rozpoczyna się w określonym miejscu na ekranie.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Użycie

```js
driver.touchFlick(xoffset, yoffset, element, speed, xspeed, yspeed)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>xoffset</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>number</td>
      <td>przesunięcie x w pikselach, o które należy wykonać flick</td>
    </tr>
    <tr>
      <td><code><var>yoffset</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>number</td>
      <td>przesunięcie y w pikselach, o które należy wykonać flick</td>
    </tr>
    <tr>
      <td><code><var>element</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>string</td>
      <td>ID elementu, gdzie rozpoczyna się flick</td>
    </tr>
    <tr>
      <td><code><var>speed</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>number</td>
      <td>prędkość w pikselach na sekundę</td>
    </tr>
    <tr>
      <td><code><var>xspeed</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>number</td>
      <td>prędkość x w pikselach na sekundę</td>
    </tr>
    <tr>
      <td><code><var>yspeed</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>number</td>
      <td>prędkość y w pikselach na sekundę</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)

---

## getOrientation
Pobierz bieżącą orientację urządzenia.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Użycie

```js
driver.getOrientation()
```


##### Zwraca

- **&lt;String&gt;**
            **<code><var>orientation</var></code>:** Bieżąca orientacja odpowiadająca wartości zdefiniowanej w ScreenOrientation: `LANDSCAPE|PORTRAIT`.

##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)
![Wsparcie dla XCUITest (9.3+)](/img/icons/ios.svg)

---

## setOrientation
Ustaw orientację urządzenia<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Użycie

```js
driver.setOrientation(orientation)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>orientation</var></code></td>
      <td>string</td>
      <td>nowa orientacja przeglądarki zgodnie z definicją w ScreenOrientation: `LANDSCAPE|PORTRAIT`</td>
    </tr>
  </tbody>
</table>


##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)
![Wsparcie dla XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogs
Pobierz dziennik dla danego typu dziennika. Bufor dziennika jest resetowany po każdym żądaniu.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Użycie

```js
driver.getLogs(type)
```


##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>typ dziennika</td>
    </tr>
  </tbody>
</table>


##### Zwraca

- **&lt;Object[]&gt;**
            **<code><var>logs</var></code>:** Lista wpisów dziennika.

##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)
![Wsparcie dla XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogTypes
Pobierz dostępne typy dzienników.<br /><br />Komenda Appium. Więcej szczegółów można znaleźć w [oficjalnej dokumentacji protokołu](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Użycie

```js
driver.getLogTypes()
```


##### Zwraca

- **&lt;String[]&gt;**
            **<code><var>logTypes</var></code>:** Lista dostępnych typów dzienników.

##### Wsparcie

![Wsparcie dla UiAutomator (4.2+)](/img/icons/android.svg)
![Wsparcie dla XCUITest (9.3+)](/img/icons/ios.svg)
