---
id: appium
title: Appium
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/appium.ts
---

## getAppiumContext
Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### Використання

```js
driver.getAppiumContext()
```


##### Повертає

- **&lt;Context&gt;**
            **<code><var>context</var></code>:** рядок, що представляє поточний контекст, або null, що означає 'немає контексту'


---

## switchAppiumContext
Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### Використання

```js
driver.switchAppiumContext(name)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>рядок, що представляє доступний контекст</td>
    </tr>
  </tbody>
</table>



---

## getAppiumContexts
Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### Використання

```js
driver.getAppiumContexts()
```


##### Повертає

- **&lt;Context[]&gt;**
            **<code><var>contexts</var></code>:** масив рядків, що представляють доступні контексти, наприклад 'WEBVIEW' або 'NATIVE'


---

## shake
Виконати дію струшування на пристрої.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/interactions/shake/).

##### Використання

```js
driver.shake()
```




##### Підтримка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## lock
Заблокувати пристрій.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/interactions/lock/).

##### Використання

```js
driver.lock(seconds)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>seconds</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>number</td>
      <td>на скільки часу заблокувати екран (тільки iOS)</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## unlock
Розблокувати пристрій.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/interactions/unlock/).

##### Використання

```js
driver.unlock()
```




##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## isLocked
Перевірити, чи заблокований пристрій.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/interactions/is-locked/).

##### Використання

```js
driver.isLocked()
```


##### Повертає

- **&lt;boolean&gt;**
            **<code><var>isLocked</var></code>:** True, якщо пристрій заблокований, false, якщо ні

##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## startRecordingScreen
Почати запис екрану.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/).

##### Використання

```js
driver.startRecordingScreen(options)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>object</td>
      <td>параметри команди, які можуть містити ключі такі як: remotePath, username, password, method, forceRestart, timeLimit, videoType, videoQuality, videoFps, bitRate, videoSize, bugReport (докладніше в документації Appium)</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## stopRecordingScreen
Зупинити запис екрану<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/stop-recording-screen/).

##### Використання

```js
driver.stopRecordingScreen(remotePath, username, password, method)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>remotePath</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>string</td>
      <td>Шлях до віддаленого розташування, куди повинно бути завантажено отримане відео. Підтримуються такі протоколи: http/https, ftp. Цей параметр впливає лише в тому випадку, якщо існує процес запису екрану і параметр forceRestart не встановлено в значення true. Значення null або порожній рядок (за замовчуванням) означає, що вміст отриманого файлу має бути закодований у форматі Base64.</td>
    </tr>
    <tr>
      <td><code><var>username</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>string</td>
      <td>Ім'я користувача для віддаленої автентифікації.</td>
    </tr>
    <tr>
      <td><code><var>password</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>string</td>
      <td>Пароль для віддаленої автентифікації.</td>
    </tr>
    <tr>
      <td><code><var>method</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>string</td>
      <td>Назва методу завантаження http multipart. За замовчуванням використовується 'PUT'.</td>
    </tr>
  </tbody>
</table>


##### Повертає

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Рядок, закодований в Base64. Якщо встановлено remote_path, відповідь - порожній рядок

##### Підтримка

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## getPerformanceDataTypes
Повертає типи інформації про стан системи, які підтримуються для читання, такі як cpu, memory, network traffic і battery.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/performance-data-types/).

##### Використання

```js
driver.getPerformanceDataTypes()
```


##### Повертає

- **&lt;string[]&gt;**
            **<code><var>performanceTypes</var></code>:** Доступні типи даних продуктивності (cpuinfo|batteryinfo|networkinfo|memoryinfo)

##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getPerformanceData
Повертає інформацію про стан системи, яка підтримується для читання, такі як cpu, memory, network traffic і battery.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/get-performance-data/).

##### Використання

```js
driver.getPerformanceData(packageName, dataType, dataReadTimeout)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>packageName</var></code></td>
      <td>string</td>
      <td>назва пакету додатку</td>
    </tr>
    <tr>
      <td><code><var>dataType</var></code></td>
      <td>string</td>
      <td>тип стану системи, який потрібно прочитати. Повинен бути одним із підтримуваних типів даних продуктивності</td>
    </tr>
    <tr>
      <td><code><var>dataReadTimeout</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>number</td>
      <td>кількість спроб для зчитування</td>
    </tr>
  </tbody>
</table>


##### Повертає

- **&lt;string[]&gt;**
            **<code><var>performanceData</var></code>:** Тип інформації про стан системи, який підтримується для читання, такий як cpu, memory, network traffic і battery

##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## pressKeyCode
Натиснути певну клавішу на пристрої.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/keys/press-keycode/).

##### Використання

```js
driver.pressKeyCode(keycode, metastate, flags)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>код клавіші для натискання</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>number</td>
      <td>мета-стан для натискання коду клавіші</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>number</td>
      <td>прапорці для натискання клавіші</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## longPressKeyCode
Натиснути та утримувати певний код клавіші на пристрої.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/keys/long-press-keycode/).

##### Використання

```js
driver.longPressKeyCode(keycode, metastate, flags)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>код клавіші для натискання на пристрої</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>number</td>
      <td>мета-стан для натискання клавіші</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>number</td>
      <td>прапорці для натискання клавіші</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendKeyEvent
Надіслати код клавіші на пристрій.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Використання

```js
driver.sendKeyEvent(keycode, metastate)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>keycode</var></code></td>
      <td>string</td>
      <td>код клавіші для натискання</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>string</td>
      <td>мета-стан для натискання коду клавіші</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## rotateDevice
Обертати пристрій у трьох вимірах.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-rotation).

##### Використання

```js
driver.rotateDevice(x, y, z)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>x-зміщення для використання як центру обертового жесту</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>y-зміщення для використання як центру обертового жесту</td>
    </tr>
    <tr>
      <td><code><var>z</var></code></td>
      <td>number</td>
      <td>z-зміщення для використання як центру обертового жесту</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentActivity
Отримати назву поточної активності Android.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-activity/).

##### Використання

```js
driver.getCurrentActivity()
```


##### Повертає

- **&lt;string&gt;**
            **<code><var>activity</var></code>:** Назва поточної активності

##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentPackage
Отримати назву поточного пакету Android.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-package/).

##### Використання

```js
driver.getCurrentPackage()
```


##### Повертає

- **&lt;string&gt;**
            **<code><var>package</var></code>:** Назва поточного пакету

##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## installApp
Встановити вказаний додаток на пристрій.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/app/install-app/).

##### Використання

```js
driver.installApp(appPath)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appPath</var></code></td>
      <td>string</td>
      <td>шлях до файлу додатку .apk</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateApp
Активувати вказаний додаток на пристрої<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/app/activate-app/).

##### Використання

```js
driver.activateApp(appId)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID додатку (package ID для Android, bundle ID для iOS)</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## removeApp
Видалити додаток з пристрою.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/app/remove-app/).

##### Використання

```js
driver.removeApp(appId)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID додатку (package ID для Android, bundle ID для iOS)</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## terminateApp
Завершити вказаний додаток на пристрої<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/app/terminate-app/).

##### Використання

```js
driver.terminateApp(appId, options)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID додатку (package ID для Android, bundle ID для iOS)</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>object</td>
      <td>Параметри команди. Наприклад, "timeout": (Тільки Android) Час очікування для повторної спроби завершення додатку (детальніше в документації Appium)</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## isAppInstalled
Перевірити, чи встановлений вказаний додаток на пристрої.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/app/is-app-installed/).

##### Використання

```js
driver.isAppInstalled(appId)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID додатку (package ID для Android, bundle ID для iOS)</td>
    </tr>
  </tbody>
</table>


##### Повертає

- **&lt;boolean&gt;**
            **<code><var>isAppInstalled</var></code>:** Повертає true, якщо встановлено, false, якщо ні

##### Підтримка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## queryAppState
Отримати стан вказаного додатку на пристрої<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/app/app-state/).

##### Використання

```js
driver.queryAppState(appId)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID додатку (package ID для Android, bundle ID для iOS)</td>
    </tr>
  </tbody>
</table>


##### Повертає

- **&lt;number&gt;**
            **<code><var>appStatus</var></code>:** 0 - не встановлено. 1 - не запущено. 2 - працює у фоновому режимі або призупинено. 3 - працює у фоновому режимі. 4 - працює на передньому плані

##### Підтримка

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## hideKeyboard
Приховати екранну клавіатуру.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/keys/hide-keyboard/).

##### Використання

```js
driver.hideKeyboard(strategy, key, keyCode, keyName)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>strategy</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>string</td>
      <td>стратегія приховування клавіатури (тільки UIAutomation), доступні стратегії - 'press', 'pressKey', 'swipeDown', 'tapOut', 'tapOutside', 'default'</td>
    </tr>
    <tr>
      <td><code><var>key</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>string</td>
      <td>значення клавіші, якщо стратегія 'pressKey'</td>
    </tr>
    <tr>
      <td><code><var>keyCode</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>string</td>
      <td>код клавіші, якщо стратегія 'pressKey'</td>
    </tr>
    <tr>
      <td><code><var>keyName</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>string</td>
      <td>назва клавіші, якщо стратегія 'pressKey'</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## isKeyboardShown
Перевірити, чи відображається екранна клавіатура.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/keys/is-keyboard-shown/).

##### Використання

```js
driver.isKeyboardShown()
```


##### Повертає

- **&lt;boolean&gt;**
            **<code><var>isKeyboardShown</var></code>:** True, якщо клавіатура відображається

##### Підтримка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pushFile
Розмістити файл на пристрої у конкретному місці.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/files/push-file/).

##### Використання

```js
driver.pushFile(path, data)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>шлях для розміщення даних</td>
    </tr>
    <tr>
      <td><code><var>data</var></code></td>
      <td>string</td>
      <td>зміст файлу у форматі base64</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pullFile
Отримати файл з файлової системи пристрою.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-file/).

##### Використання

```js
driver.pullFile(path)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>шлях на пристрої, звідки потрібно отримати файл</td>
    </tr>
  </tbody>
</table>


##### Повертає

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Зміст файлу у форматі base64

##### Підтримка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pullFolder
Отримати папку з файлової системи пристрою.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-folder/).

##### Використання

```js
driver.pullFolder(path)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>шлях до всієї папки на пристрої</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## toggleAirplaneMode
Переключити режим польоту на пристрої.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-airplane-mode/).

##### Використання

```js
driver.toggleAirplaneMode()
```




##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleData
Перемкнути стан сервісу передачі даних.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-data/).

##### Використання

```js
driver.toggleData()
```




##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleWiFi
Перемкнути стан сервісу Wi-Fi.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-wifi/).

##### Використання

```js
driver.toggleWiFi()
```




##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleLocationServices
Перемкнути стан сервісу геолокації.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-location-services/).

##### Використання

```js
driver.toggleLocationServices()
```




##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleNetworkSpeed
Встановити швидкість мережі (тільки для емулятора)<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/network/network-speed/).

##### Використання

```js
driver.toggleNetworkSpeed(netspeed)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>netspeed</var></code></td>
      <td>string</td>
      <td>Тип мережі - 'full','gsm', 'edge', 'hscsd', 'gprs', 'umts', 'hsdpa', 'lte', 'evdo'</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## openNotifications
Відкрити сповіщення Android (тільки для емулятора).<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/system/open-notifications/).

##### Використання

```js
driver.openNotifications()
```




##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## startActivity
Запустити активність Android, вказавши назву пакету та назву активності.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/activity/start-activity/).

##### Використання

```js
driver.startActivity(appPackage, appActivity, appWaitPackage, appWaitActivity, intentAction, intentCategory, intentFlags, optionalIntentArguments, dontStopAppOnReset)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appPackage</var></code></td>
      <td>string</td>
      <td>назва додатку</td>
    </tr>
    <tr>
      <td><code><var>appActivity</var></code></td>
      <td>string</td>
      <td>назва активності</td>
    </tr>
    <tr>
      <td><code><var>appWaitPackage</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>string</td>
      <td>назва додатку для очікування</td>
    </tr>
    <tr>
      <td><code><var>appWaitActivity</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>string</td>
      <td>назва активності для очікування</td>
    </tr>
    <tr>
      <td><code><var>intentAction=android.intent.action.MAIN</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>string</td>
      <td>дія наміру, яка буде використана для запуску активності</td>
    </tr>
    <tr>
      <td><code><var>intentCategory=android.intent.category.LAUNCHER</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>string</td>
      <td>категорія наміру, яка буде використана для запуску активності</td>
    </tr>
    <tr>
      <td><code><var>intentFlags=0x10200000</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>string</td>
      <td>прапорці, які будуть використовуватися для запуску активності</td>
    </tr>
    <tr>
      <td><code><var>optionalIntentArguments</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>string</td>
      <td>додаткові аргументи наміру, які будуть використані для запуску активності</td>
    </tr>
    <tr>
      <td><code><var>dontStopAppOnReset</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>string</td>
      <td>не зупиняє процес додатку під тестом перед запуском додатку за допомогою adb</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSystemBars
Отримати інформацію про видимість та межі рядка стану та панелі навігації.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/system/system-bars/).

##### Використання

```js
driver.getSystemBars()
```


##### Повертає

- **&lt;object[]&gt;**
            **<code><var>systemBars</var></code>:** Інформація про видимість та межі рядка стану та панелі навігації

##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDeviceTime
Отримати час на пристрої.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/system/system-time/).

##### Використання

```js
driver.getDeviceTime()
```


##### Повертає

- **&lt;string&gt;**
            **<code><var>time</var></code>:** Час на пристрої

##### Підтримка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDisplayDensity
Отримати щільність дисплея з пристрою.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Використання

```js
driver.getDisplayDensity()
```


##### Повертає

- **&lt;*&gt;**


##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchId
Симулювати подію [touch id](https://support.apple.com/en-ca/ht201371) (тільки для симулятора iOS). Щоб увімкнути цю функцію, бажана можливість `allowTouchIdEnroll` повинна бути встановлена на true, і симулятор повинен бути [зареєстрований](https://support.apple.com/en-ca/ht201371). Коли ви встановлюєте allowTouchIdEnroll на true, це за замовчуванням налаштує симулятор як зареєстрований. Стан реєстрації можна [перемикати](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/index.html). Цей виклик працюватиме, тільки якщо процес Appium або його батьківський додаток (наприклад, Terminal.app або Appium.app) має доступ до доступності Mac OS у System Preferences > Security & Privacy > Privacy > Accessibility list.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/simulator/touch-id/).

##### Використання

```js
driver.touchId(match)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>match</var></code></td>
      <td>boolean</td>
      <td>ми симулюємо успішний дотик (true) чи невдалий дотик (false)</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## toggleEnrollTouchId
Перемкнути [реєстрацію](https://support.apple.com/en-ca/ht201371) симулятора для прийняття touchId (тільки для симулятора iOS). Щоб увімкнути цю функцію, бажана можливість `allowTouchIdEnroll` повинна бути встановлена на true. Коли `allowTouchIdEnroll` встановлено на true, симулятор буде зареєстрований за замовчуванням, і 'Toggle Touch ID Enrollment' змінює стан реєстрації. Цей виклик працюватиме, тільки якщо процес Appium або його батьківський додаток (наприклад, Terminal.app або Appium.app) має доступ до доступності Mac OS у System Preferences > Security & Privacy > Privacy > Accessibility list.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/).

##### Використання

```js
driver.toggleEnrollTouchId(enabled)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>enabled=true</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>boolean</td>
      <td>дорівнює true, якщо реєстрація TouchID повинна бути увімкнена</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## launchApp
Запустити додаток на пристрої.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/app/launch-app/).
:::caution

Ця команда протоколу застаріла<br />Для iOS використовуйте `driver.execute('mobile: launchApp', { ... })`, а для Android використовуйте `driver.execute('mobile: activateApp', { ... })`.
:::

##### Використання

```js
driver.launchApp()
```




##### Підтримка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## closeApp
Закрити додаток на пристрої.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/app/close-app/).
:::caution

Ця команда протоколу застаріла<br />Використовуйте `driver.execute('mobile: terminateApp', { ... })` натомість
:::

##### Використання

```js
driver.closeApp()
```




##### Підтримка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## background
Відправити поточний запущений додаток для цієї сесії у фоновий режим.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/app/background-app/).
:::caution

Ця команда протоколу застаріла<br />Використовуйте `driver.execute('mobile: backgroundApp', { ... })` натомість
:::

##### Використання

```js
driver.background(seconds)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>seconds=null</var></code></td>
      <td>number, null</td>
      <td>час очікування для відновлення додатку, якщо 'null', додаток не буде відновлено</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## endCoverage
Отримати дані про покриття тестами.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/app/end-test-coverage/).

##### Використання

```js
driver.endCoverage(intent, path)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>intent</var></code></td>
      <td>string</td>
      <td>намір для трансляції</td>
    </tr>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>шлях до файлу .ec</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getStrings
Отримати рядки додатку.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/app/get-app-strings/).

##### Використання

```js
driver.getStrings(language, stringFile)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>language</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>string</td>
      <td>код мови</td>
    </tr>
    <tr>
      <td><code><var>stringFile</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>string</td>
      <td>шлях до файлу рядків</td>
    </tr>
  </tbody>
</table>


##### Повертає

- **&lt;object&gt;**
            **<code><var>appStrings</var></code>:** всі визначені рядки з додатку для вказаної мови та назви файлу рядків

##### Підтримка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## setValueImmediate
Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Використання

```js
driver.setValueImmediate(elementId, text)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ідентифікатор елемента, повернений у попередньому виклику Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>текст для встановлення для елемента</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## replaceValue
Замінити значення елемента безпосередньо.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Використання

```js
driver.replaceValue(elementId, value)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ідентифікатор елемента, повернений у попередньому виклику Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>значення для заміни на елементі</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSettings
Отримати поточні налаштування на пристрої.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/session/settings/get-settings/).

##### Використання

```js
driver.getSettings()
```


##### Повертає

- **&lt;object&gt;**
            **<code><var>settings</var></code>:** JSON хеш всіх поточно вказаних налаштувань, див. API налаштувань

##### Підтримка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## updateSettings
Оновити поточні налаштування на пристрої.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/session/settings/update-settings/).

##### Використання

```js
driver.updateSettings(settings)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>settings</var></code></td>
      <td>object</td>
      <td>об'єкт з парами ключ/значення налаштувань для оновлення</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## receiveAsyncResponse
URL для зворотного виклику для асинхронного виконання JavaScript.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Використання

```js
driver.receiveAsyncResponse(response)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>response</var></code></td>
      <td>object</td>
      <td>відповідь для отримання на пристрої</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## gsmCall
Зробити GSM-дзвінок (тільки для емулятора).<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-call/).

##### Використання

```js
driver.gsmCall(phoneNumber, action)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>номер телефону для дзвінка</td>
    </tr>
    <tr>
      <td><code><var>action</var></code></td>
      <td>string</td>
      <td>Дія - 'call', 'accept', 'cancel', 'hold'</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmSignal
Встановити силу сигналу GSM (тільки для емулятора).<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-signal/).

##### Використання

```js
driver.gsmSignal(signalStrength, signalStrengh)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>signalStrength</var></code></td>
      <td>string</td>
      <td>сила сигналу в діапазоні [0, 4]</td>
    </tr>
    <tr>
      <td><code><var>signalStrengh</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>string</td>
      <td>сила сигналу в діапазоні [0, 4]. Будь ласка, також встановіть цей параметр з тим самим значенням, якщо ви використовуєте Appium v1.11.0 або нижче (див. https://github.com/appium/appium/issues/12234).</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerCapacity
Встановити відсоток заряду батареї (тільки для емулятора).<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_capacity/).

##### Використання

```js
driver.powerCapacity(percent)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>percent</var></code></td>
      <td>number</td>
      <td>значення відсотка в діапазоні [0, 100]</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerAC
Встановити стан зарядного пристрою батареї на підключений або ні (тільки для емулятора).<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_ac/).

##### Використання

```js
driver.powerAC(state)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>встановити стан. on або off</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmVoice
Встановити стан голосового зв'язку GSM (тільки для емулятора).<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-voice/).

##### Використання

```js
driver.gsmVoice(state)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>стан голосового зв'язку GSM - 'unregistered', 'home', 'roaming', 'searching', 'denied', 'off', 'on'</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendSms
Симулювати SMS-повідомлення (тільки для емулятора).<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/network/send-sms/).

##### Використання

```js
driver.sendSms(phoneNumber, message)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>номер телефону, на який слід надіслати SMS</td>
    </tr>
    <tr>
      <td><code><var>message</var></code></td>
      <td>string</td>
      <td>SMS-повідомлення</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## fingerPrint
Автентифікувати користувачів за допомогою сканування відбитків пальців на підтримуваних емуляторах.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/authentication/finger-print/).

##### Використання

```js
driver.fingerPrint(fingerprintId)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>fingerprintId</var></code></td>
      <td>number</td>
      <td>відбитки пальців, що зберігаються в системі ключів Android (від 1 до 10)</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## setClipboard
Встановити вміст системного буфера обміну<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/set-clipboard/).

##### Використання

```js
driver.setClipboard(content, contentType, label)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>content</var></code></td>
      <td>string</td>
      <td>Фактичний вміст буфера обміну, кодований у base64</td>
    </tr>
    <tr>
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>string</td>
      <td>Тип вмісту для отримання. Plaintext, Image, URL. Android підтримує лише plaintext</td>
    </tr>
    <tr>
      <td><code><var>label</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>string</td>
      <td>Мітка даних буфера обміну для Android</td>
    </tr>
  </tbody>
</table>


##### Повертає

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Відповідь від сервера Appium

##### Підтримка

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getClipboard
Отримати вміст системного буфера обміну<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/get-clipboard/).

##### Використання

```js
driver.getClipboard(contentType)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>string</td>
      <td>Тип вмісту для отримання. Plaintext, Image, URL. Android підтримує лише plaintext</td>
    </tr>
  </tbody>
</table>


##### Повертає

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Вміст буфера обміну як рядок, кодований у base64, або порожній рядок, якщо буфер обміну порожній

##### Підтримка

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchPerform
Ця функціональність доступна лише в нативному контексті. 'Touch Perform' працює подібно до інших сингулярних взаємодій дотику, за винятком того, що це дозволяє об'єднати разом більше ніж одну дотикову дію як одну команду. Це корисно, оскільки команди Appium надсилаються через мережу і між командами є затримка. Ця затримка може зробити певні дотикові взаємодії неможливими, оскільки деякі взаємодії повинні виконуватися в одній послідовності. Вертикальний рух, наприклад, вимагає натискання, переміщення до іншої координати y, а потім відпускання. Щоб це працювало, не може бути затримки між взаємодіями.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/touch-perform/).

##### Використання

```js
driver.touchPerform(actions)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>Тип дії для виконання (наприклад, moveTo, release, press, tap, wait)</td>
    </tr>
  </tbody>
</table>

##### Приклад


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


##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## multiTouchPerform
Ця функціональність доступна лише в нативному контексті. Виконати послідовність дій мультидотику.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/multi-touch-perform/).

##### Використання

```js
driver.multiTouchPerform(actions)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>Тип дії для виконання (наприклад, moveTo, release, press, tap, wait)</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## executeDriverScript
Ця команда дозволяє вам вказати скрипт WebdriverIO як рядок і передати його на сервер Appium для локального виконання на самому сервері. Цей підхід допомагає мінімізувати потенційну затримку, пов'язану з кожною командою. ***Щоб використовувати цю команду з Appium 2.0, ви повинні мати встановлений плагін [`execute-driver-plugin`](https://github.com/appium/appium/tree/master/packages/execute-driver-plugin).***<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium/blob/master/docs/en/commands/session/execute-driver.md).

##### Використання

```js
driver.executeDriverScript(script, type, timeout)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>Скрипт для виконання. Він має доступ до об'єкта 'driver', який представляє сесію WebdriverIO, приєднану до поточного сервера.</td>
    </tr>
    <tr>
      <td><code><var>type</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>string</td>
      <td>Мова/фреймворк, використаний у скрипті. В даний час підтримується лише 'webdriverio', який є за замовчуванням.</td>
    </tr>
    <tr>
      <td><code><var>timeout</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>number</td>
      <td>Кількість мілісекунд, протягом яких скрипт повинен бути дозволений запуститися, перш ніж буде вбитий сервером Appium. За замовчуванням це еквівалентно 1 годині.</td>
    </tr>
  </tbody>
</table>


##### Повертає

- **&lt;object&gt;**
            **<code><var>result</var></code>:** Об'єкт, що містить два поля: 'result', який є поверненим значенням самого скрипту, і 'logs', який містить 3 внутрішніх поля, 'log', 'warn' і 'error', які містять масив рядків, зареєстрованих console.log, console.warn і console.error при виконанні скрипту.


---

## getEvents
Отримати події, збережені на сервері appium.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/get-events.md).

##### Використання

```js
driver.getEvents(type)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string[]</td>
      <td>Отримати події, які фільтруються за типом, якщо тип вказано.</td>
    </tr>
  </tbody>
</table>


##### Повертає

- **&lt;object&gt;**
            **<code><var>result</var></code>:** JSON-хеш подій, наприклад `{'commands' => [{'cmd' => 123455, ....}], 'startTime' => 1572954894127, }`.

##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## logEvent
Зберегти користувацьку подію.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/log-event.md).

##### Використання

```js
driver.logEvent(vendor, event)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>vendor</var></code></td>
      <td>string</td>
      <td>Назва постачальника. Це буде `vendor` у `vendor:event`.</td>
    </tr>
    <tr>
      <td><code><var>event</var></code></td>
      <td>string</td>
      <td>Назва події. Це буде `event` у `vendor:event`.</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## compareImages
Ця функція проводить порівняння зображень, використовуючи можливості фреймворку OpenCV. Зверніть увагу, що для роботи цієї функції як фреймворк OpenCV, так і модуль opencv4nodejs повинні бути встановлені на машині, де працює сервер Appium. ***Крім того, вам потрібно мати встановлений плагін [`images-plugin`](https://github.com/appium/appium/tree/master/packages/images-plugin), щоб використовувати цю функцію з Appium 2.0.***<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://appium.github.io/appium.io/docs/en/writing-running-appium/image-comparison/).

##### Використання

```js
driver.compareImages(mode, firstImage, secondImage, options)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mode=matchFeatures</var></code></td>
      <td>string</td>
      <td>Один з можливих режимів порівняння: 'matchFeatures', 'getSimilarity', 'matchTemplate'. За замовчуванням - 'matchFeatures'.</td>
    </tr>
    <tr>
      <td><code><var>firstImage</var></code></td>
      <td>string</td>
      <td>Дані зображення. Підтримуються всі формати зображень, які приймає сама бібліотека OpenCV.</td>
    </tr>
    <tr>
      <td><code><var>secondImage</var></code></td>
      <td>string</td>
      <td>Дані зображення. Підтримуються всі формати зображень, які приймає сама бібліотека OpenCV.</td>
    </tr>
    <tr>
      <td><code><var>options=[object Object]</var></code></td>
      <td>object</td>
      <td>Вміст цього словника залежить від фактичного значення `mode`. Див. документацію на модуль `appium-support` для отримання більш детальної інформації. </td>
    </tr>
  </tbody>
</table>


##### Повертає

- **&lt;object&gt;**
            **<code><var>result</var></code>:** Вміст результуючого словника залежить від фактичних значень `mode` та `options`. Див. документацію на модуль `appium-support` для отримання більш детальної інформації.


---

## implicitWait
Встановити кількість часу, який драйвер повинен чекати при пошуку елементів. При пошуку одного елемента драйвер повинен опитувати сторінку, доки елемент не буде знайдений або не закінчиться час очікування, залежно від того, що настане раніше. При пошуку кількох елементів драйвер повинен опитувати сторінку, доки не буде знайдено хоча б один елемент або не закінчиться час очікування, після чого він повинен повернути порожній список. Якщо ця команда ніколи не відправляється, драйвер повинен за замовчуванням використовувати неявне очікування 0 мс.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Використання

```js
driver.implicitWait(ms)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>Кількість часу в мілісекундах для очікування елемента.</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLocationInView
Визначити розташування елемента на екрані після його прокрутки в зону видимості.<br /><br />__Примітка:__ Це вважається внутрішньою командою і повинно використовуватися лише для визначення розташування елемента для правильного генерування нативних подій.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Використання

```js
driver.getLocationInView(elementId)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID елемента для маршрутизації команди</td>
    </tr>
  </tbody>
</table>


##### Повертає

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** Координати X та Y для елемента на сторінці.

##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## sendKeys
Надіслати послідовність натискань клавіш на активний елемент<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Використання

```js
driver.sendKeys(value)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string[]</td>
      <td>Послідовність клавіш для вводу. Повинен бути наданий масив.</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## availableIMEEngines
Перелічити всі доступні движки на машині. Щоб використовувати движок, він повинен бути присутній у цьому списку.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Використання

```js
driver.availableIMEEngines()
```


##### Повертає

- **&lt;String[]&gt;**
            **<code><var>engines</var></code>:** Список доступних движків

##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getActiveIMEEngine
Отримати назву активного IME движка. Рядок назви залежить від платформи.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Використання

```js
driver.getActiveIMEEngine()
```


##### Повертає

- **&lt;String&gt;**
            **<code><var>engine</var></code>:** Назва активного IME движка

##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## isIMEActivated
Вказує, чи активне введення IME на даний момент<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Використання

```js
driver.isIMEActivated()
```


##### Повертає

- **&lt;Boolean&gt;**
            **<code><var>isActive</var></code>:** true, якщо введення IME доступне та активне на даний момент, false в іншому випадку

##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## deactivateIMEEngine
Деактивує поточно активний IME движок.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Використання

```js
driver.deactivateIMEEngine()
```




##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateIMEEngine
Зробити движок доступним<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Використання

```js
driver.activateIMEEngine(engine)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>engine</var></code></td>
      <td>string</td>
      <td>назва движка для активації</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## asyncScriptTimeout
Встановити кількість часу в мілісекундах, протягом якого асинхронні скрипти, виконані за допомогою `/session/:sessionId/execute_async`, можуть виконуватися до того, як вони будуть перервані і клієнту буде повернена помилка `Timeout`.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Використання

```js
driver.asyncScriptTimeout(ms)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>Кількість часу в мілісекундах, протягом якого команди з обмеженням часу можуть виконуватися</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## submit
Відправити елемент форми.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Використання

```js
driver.submit(elementId)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID елемента форми для відправки</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementSize
Визначити розмір елемента в пікселях. Розмір буде повернутий як JSON-об'єкт з властивостями `width` і `height`.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Використання

```js
driver.getElementSize(elementId)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID елемента для маршрутизації команди</td>
    </tr>
  </tbody>
</table>


##### Повертає

- **&lt;Object&gt;**
            **<code><var>size</var></code>:** Ширина та висота елемента в пікселях.

##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementLocation
Визначити розташування елемента на сторінці. Точка `(0, 0)` відноситься до верхнього лівого кута сторінки. Координати елемента повертаються як JSON-об'єкт з властивостями `x` і `y`.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Використання

```js
driver.getElementLocation(elementId)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID елемента для маршрутизації команди</td>
    </tr>
  </tbody>
</table>


##### Повертає

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** Координати X та Y для елемента на сторінці.

##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchClick
Одинарне натискання на сенсорному пристрої.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Використання

```js
driver.touchClick(element)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>ID елемента для одинарного натискання.</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchDown
Палець вниз на екрані.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Використання

```js
driver.touchDown(x, y)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>x-координата на екрані</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>y-координата на екрані</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchUp
Палець вгору на екрані.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Використання

```js
driver.touchUp(x, y)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>x-координата на екрані</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>y-координата на екрані</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchMove
Рух пальця по екрану.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Використання

```js
driver.touchMove(x, y)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>x-координата на екрані</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>y-координата на екрані</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchLongClick
Довге натискання на сенсорному екрані за допомогою подій руху пальця.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Використання

```js
driver.touchLongClick(element)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>ID елемента для довгого натискання</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchFlick
Швидке проведення на сенсорному екрані за допомогою подій руху пальця. Ця команда швидкого проведення починається в певному місці екрану.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Використання

```js
driver.touchFlick(xoffset, yoffset, element, speed, xspeed, yspeed)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>xoffset</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>number</td>
      <td>зміщення x в пікселях для швидкого проведення</td>
    </tr>
    <tr>
      <td><code><var>yoffset</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>number</td>
      <td>зміщення y в пікселях для швидкого проведення</td>
    </tr>
    <tr>
      <td><code><var>element</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>string</td>
      <td>ID елемента, де починається швидке проведення</td>
    </tr>
    <tr>
      <td><code><var>speed</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>number</td>
      <td>швидкість у пікселях за секунду</td>
    </tr>
    <tr>
      <td><code><var>xspeed</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>number</td>
      <td>швидкість x у пікселях за секунду</td>
    </tr>
    <tr>
      <td><code><var>yspeed</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>number</td>
      <td>швидкість y у пікселях за секунду</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getOrientation
Отримати поточну орієнтацію пристрою.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Використання

```js
driver.getOrientation()
```


##### Повертає

- **&lt;String&gt;**
            **<code><var>orientation</var></code>:** Поточна орієнтація, що відповідає значенню, визначеному в ScreenOrientation: `LANDSCAPE|PORTRAIT`.

##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## setOrientation
Встановити орієнтацію пристрою<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Використання

```js
driver.setOrientation(orientation)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>orientation</var></code></td>
      <td>string</td>
      <td>нова орієнтація браузера, як визначено в ScreenOrientation: `LANDSCAPE|PORTRAIT`</td>
    </tr>
  </tbody>
</table>


##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogs
Отримати журнал для заданого типу журналу. Буфер журналу скидається після кожного запиту.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Використання

```js
driver.getLogs(type)
```


##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>тип журналу</td>
    </tr>
  </tbody>
</table>


##### Повертає

- **&lt;Object[]&gt;**
            **<code><var>logs</var></code>:** Список записів журналу.

##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogTypes
Отримати доступні типи журналів.<br /><br />Команда Appium. Більше деталей можна знайти в [офіційній документації протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Використання

```js
driver.getLogTypes()
```


##### Повертає

- **&lt;String[]&gt;**
            **<code><var>logTypes</var></code>:** Список доступних типів журналів.

##### Підтримка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)
