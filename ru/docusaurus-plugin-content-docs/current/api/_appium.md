---
id: appium
title: Appium
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/appium.ts
---

## getAppiumContext
Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### Использование

```js
driver.getAppiumContext()
```


##### Возвращает

- **&lt;Context&gt;**
            **<code><var>context</var></code>:** строка, представляющая текущий контекст, или null, означающий 'нет контекста'


---

## switchAppiumContext
Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### Использование

```js
driver.switchAppiumContext(name)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>name</var></code></td>
      <td>string</td>
      <td>строка, представляющая доступный контекст</td>
    </tr>
  </tbody>
</table>



---

## getAppiumContexts
Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#webviews-and-other-contexts).

##### Использование

```js
driver.getAppiumContexts()
```


##### Возвращает

- **&lt;Context[]&gt;**
            **<code><var>contexts</var></code>:** массив строк, представляющих доступные контексты, например 'WEBVIEW' или 'NATIVE'


---

## shake
Выполнить встряхивание устройства.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/interactions/shake/).

##### Использование

```js
driver.shake()
```




##### Поддержка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## lock
Заблокировать устройство.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/interactions/lock/).

##### Использование

```js
driver.lock(seconds)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>seconds</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>number</td>
      <td>как долго блокировать экран (только для iOS)</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## unlock
Разблокировать устройство.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/interactions/unlock/).

##### Использование

```js
driver.unlock()
```




##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## isLocked
Проверить, заблокировано ли устройство.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/interactions/is-locked/).

##### Использование

```js
driver.isLocked()
```


##### Возвращает

- **&lt;boolean&gt;**
            **<code><var>isLocked</var></code>:** True, если устройство заблокировано, false, если нет

##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## startRecordingScreen
Начать запись экрана.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/start-recording-screen/).

##### Использование

```js
driver.startRecordingScreen(options)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>object</td>
      <td>параметры команды, которые могут содержать ключи как: remotePath, username, password, method, forceRestart, timeLimit, videoType, videoQuality, videoFps, bitRate, videoSize, bugReport (дополнительное описание в документации Appium)</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## stopRecordingScreen
Остановить запись экрана<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/recording-screen/stop-recording-screen/).

##### Использование

```js
driver.stopRecordingScreen(remotePath, username, password, method)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>remotePath</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>string</td>
      <td>Путь к удаленному местоположению, куда должно быть загружено полученное видео. Поддерживаются следующие протоколы: http/https, ftp. Эта опция действует только если есть процесс записи экрана в прогрессе и параметр forceRestart не установлен в true. Значение null или пустая строка (настройка по умолчанию) означает, что содержимое полученного файла должно быть закодировано в Base64.</td>
    </tr>
    <tr>
      <td><code><var>username</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>string</td>
      <td>Имя пользователя для удаленной аутентификации.</td>
    </tr>
    <tr>
      <td><code><var>password</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>string</td>
      <td>Пароль для удаленной аутентификации.</td>
    </tr>
    <tr>
      <td><code><var>method</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>string</td>
      <td>Имя метода http multipart загрузки. По умолчанию используется 'PUT'.</td>
    </tr>
  </tbody>
</table>


##### Возвращает

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Строка, закодированная в Base64. Если установлен remote_path, ответ - пустая строка

##### Поддержка

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## getPerformanceDataTypes
Возвращает типы информации о состоянии системы, которые поддерживаются для чтения, например, cpu, memory, network traffic и battery.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/performance-data-types/).

##### Использование

```js
driver.getPerformanceDataTypes()
```


##### Возвращает

- **&lt;string[]&gt;**
            **<code><var>performanceTypes</var></code>:** Доступные типы данных о производительности (cpuinfo|batteryinfo|networkinfo|memoryinfo)

##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getPerformanceData
Возвращает информацию о состоянии системы, которая поддерживается для чтения, например, cpu, memory, network traffic и battery.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/performance-data/get-performance-data/).

##### Использование

```js
driver.getPerformanceData(packageName, dataType, dataReadTimeout)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>packageName</var></code></td>
      <td>string</td>
      <td>имя пакета приложения</td>
    </tr>
    <tr>
      <td><code><var>dataType</var></code></td>
      <td>string</td>
      <td>тип состояния системы, который необходимо прочитать. Должен быть одним из поддерживаемых типов данных о производительности</td>
    </tr>
    <tr>
      <td><code><var>dataReadTimeout</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>number</td>
      <td>количество попыток чтения</td>
    </tr>
  </tbody>
</table>


##### Возвращает

- **&lt;string[]&gt;**
            **<code><var>performanceData</var></code>:** Информационный тип состояния системы, который поддерживается для чтения, например cpu, memory, network traffic и battery

##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## pressKeyCode
Нажать определенную клавишу на устройстве.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/keys/press-keycode/).

##### Использование

```js
driver.pressKeyCode(keycode, metastate, flags)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>код клавиши для нажатия</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>number</td>
      <td>мета-состояние для нажатия кода клавиши</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>number</td>
      <td>флаги для нажатия клавиши</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## longPressKeyCode
Нажать и удерживать определенный код клавиши на устройстве.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/keys/long-press-keycode/).

##### Использование

```js
driver.longPressKeyCode(keycode, metastate, flags)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>keycode</var></code></td>
      <td>number</td>
      <td>код клавиши для нажатия на устройстве</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>number</td>
      <td>мета-состояние для нажатия клавиши</td>
    </tr>
    <tr>
      <td><code><var>flags</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>number</td>
      <td>флаги для нажатия клавиши</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendKeyEvent
Отправить код клавиши на устройство.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Использование

```js
driver.sendKeyEvent(keycode, metastate)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>keycode</var></code></td>
      <td>string</td>
      <td>код клавиши для нажатия</td>
    </tr>
    <tr>
      <td><code><var>metastate</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>string</td>
      <td>мета-состояние для нажатия кода клавиши</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## rotateDevice
Повернуть устройство в трех измерениях.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-rotation).

##### Использование

```js
driver.rotateDevice(x, y, z)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>смещение x, используемое для центра жеста поворота</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>смещение y, используемое для центра жеста поворота</td>
    </tr>
    <tr>
      <td><code><var>z</var></code></td>
      <td>number</td>
      <td>смещение z, используемое для центра жеста поворота</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentActivity
Получить имя текущей активности Android.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-activity/).

##### Использование

```js
driver.getCurrentActivity()
```


##### Возвращает

- **&lt;string&gt;**
            **<code><var>activity</var></code>:** Имя текущей активности

##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getCurrentPackage
Получить имя текущего Android-пакета.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/activity/current-package/).

##### Использование

```js
driver.getCurrentPackage()
```


##### Возвращает

- **&lt;string&gt;**
            **<code><var>package</var></code>:** Имя текущего пакета

##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## installApp
Установить данное приложение на устройство.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/app/install-app/).

##### Использование

```js
driver.installApp(appPath)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appPath</var></code></td>
      <td>string</td>
      <td>путь к файлу приложения .apk</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateApp
Активировать данное приложение на устройстве<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/app/activate-app/).

##### Использование

```js
driver.activateApp(appId)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID приложения (ID пакета для Android, ID бандла для iOS)</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## removeApp
Удалить приложение с устройства.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/app/remove-app/).

##### Использование

```js
driver.removeApp(appId)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID приложения (ID пакета для Android, ID бандла для iOS)</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## terminateApp
Завершить данное приложение на устройстве<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/app/terminate-app/).

##### Использование

```js
driver.terminateApp(appId, options)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID приложения (ID пакета для Android, ID бандла для iOS)</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>object</td>
      <td>Опции команды. Например, "timeout": (Только для Android) Таймаут для повторной попытки завершения приложения (подробнее в документации Appium)</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## isAppInstalled
Проверить, установлено ли указанное приложение на устройстве.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/app/is-app-installed/).

##### Использование

```js
driver.isAppInstalled(appId)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID приложения (ID пакета для Android, ID бандла для iOS)</td>
    </tr>
  </tbody>
</table>


##### Возвращает

- **&lt;boolean&gt;**
            **<code><var>isAppInstalled</var></code>:** Возвращает true, если установлено, false, если нет

##### Поддержка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## queryAppState
Получить состояние данного приложения на устройстве<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/app/app-state/).

##### Использование

```js
driver.queryAppState(appId)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appId</var></code></td>
      <td>string</td>
      <td>ID приложения (ID пакета для Android, ID бандла для iOS)</td>
    </tr>
  </tbody>
</table>


##### Возвращает

- **&lt;number&gt;**
            **<code><var>appStatus</var></code>:** 0 - не установлено. 1 - не запущено. 2 - запущено в фоне или приостановлено. 3 - запущено в фоне. 4 - запущено на переднем плане

##### Поддержка

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## hideKeyboard
Скрыть экранную клавиатуру.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/keys/hide-keyboard/).

##### Использование

```js
driver.hideKeyboard(strategy, key, keyCode, keyName)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>strategy</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>string</td>
      <td>стратегия скрытия клавиатуры (только для UIAutomation), доступные стратегии - 'press', 'pressKey', 'swipeDown', 'tapOut', 'tapOutside', 'default'</td>
    </tr>
    <tr>
      <td><code><var>key</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>string</td>
      <td>значение клавиши, если стратегия 'pressKey'</td>
    </tr>
    <tr>
      <td><code><var>keyCode</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>string</td>
      <td>код клавиши, если стратегия 'pressKey'</td>
    </tr>
    <tr>
      <td><code><var>keyName</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>string</td>
      <td>имя клавиши, если стратегия 'pressKey'</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## isKeyboardShown
Отображается ли экранная клавиатура.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/keys/is-keyboard-shown/).

##### Использование

```js
driver.isKeyboardShown()
```


##### Возвращает

- **&lt;boolean&gt;**
            **<code><var>isKeyboardShown</var></code>:** True, если клавиатура отображается

##### Поддержка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pushFile
Разместить файл на устройстве в определенном месте.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/files/push-file/).

##### Использование

```js
driver.pushFile(path, data)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>путь для установки данных</td>
    </tr>
    <tr>
      <td><code><var>data</var></code></td>
      <td>string</td>
      <td>содержимое файла в base64</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pullFile
Получить файл с файловой системы устройства.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-file/).

##### Использование

```js
driver.pullFile(path)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>путь на устройстве, откуда берется файл</td>
    </tr>
  </tbody>
</table>


##### Возвращает

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Содержимое файла в base64

##### Поддержка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## pullFolder
Получить папку с файловой системы устройства.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/files/pull-folder/).

##### Использование

```js
driver.pullFolder(path)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>путь к целой папке на устройстве</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## toggleAirplaneMode
Переключить режим полета на устройстве.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-airplane-mode/).

##### Использование

```js
driver.toggleAirplaneMode()
```




##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleData
Переключить состояние службы передачи данных.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-data/).

##### Использование

```js
driver.toggleData()
```




##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleWiFi
Переключить состояние службы WiFi.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-wifi/).

##### Использование

```js
driver.toggleWiFi()
```




##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleLocationServices
Переключить состояние службы определения местоположения.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/network/toggle-location-services/).

##### Использование

```js
driver.toggleLocationServices()
```




##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## toggleNetworkSpeed
Установить скорость сети (только для эмулятора)<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/network/network-speed/).

##### Использование

```js
driver.toggleNetworkSpeed(netspeed)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>netspeed</var></code></td>
      <td>string</td>
      <td>Тип сети - 'full','gsm', 'edge', 'hscsd', 'gprs', 'umts', 'hsdpa', 'lte', 'evdo'</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## openNotifications
Открыть уведомления Android (только для эмулятора).<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/system/open-notifications/).

##### Использование

```js
driver.openNotifications()
```




##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## startActivity
Запустить активность Android, указав имя пакета и имя активности.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/activity/start-activity/).

##### Использование

```js
driver.startActivity(appPackage, appActivity, appWaitPackage, appWaitActivity, intentAction, intentCategory, intentFlags, optionalIntentArguments, dontStopAppOnReset)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>appPackage</var></code></td>
      <td>string</td>
      <td>имя приложения</td>
    </tr>
    <tr>
      <td><code><var>appActivity</var></code></td>
      <td>string</td>
      <td>имя активности</td>
    </tr>
    <tr>
      <td><code><var>appWaitPackage</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>string</td>
      <td>имя приложения для ожидания</td>
    </tr>
    <tr>
      <td><code><var>appWaitActivity</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>string</td>
      <td>имя активности для ожидания</td>
    </tr>
    <tr>
      <td><code><var>intentAction=android.intent.action.MAIN</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>string</td>
      <td>действие интента, которое будет использоваться для запуска активности</td>
    </tr>
    <tr>
      <td><code><var>intentCategory=android.intent.category.LAUNCHER</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>string</td>
      <td>категория интента, которая будет использоваться для запуска активности</td>
    </tr>
    <tr>
      <td><code><var>intentFlags=0x10200000</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>string</td>
      <td>флаги, которые будут использоваться для запуска активности</td>
    </tr>
    <tr>
      <td><code><var>optionalIntentArguments</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>string</td>
      <td>дополнительные аргументы интента, которые будут использоваться для запуска активности</td>
    </tr>
    <tr>
      <td><code><var>dontStopAppOnReset</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>string</td>
      <td>не останавливать процесс тестируемого приложения перед запуском приложения с помощью adb</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSystemBars
Получить информацию о видимости и границах строки состояния и панели навигации.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/system/system-bars/).

##### Использование

```js
driver.getSystemBars()
```


##### Возвращает

- **&lt;object[]&gt;**
            **<code><var>systemBars</var></code>:** Информация о видимости и границах строки состояния и панели навигации

##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDeviceTime
Получить время на устройстве.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/system/system-time/).

##### Использование

```js
driver.getDeviceTime()
```


##### Возвращает

- **&lt;string&gt;**
            **<code><var>time</var></code>:** Время на устройстве

##### Поддержка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getDisplayDensity
Получить плотность дисплея устройства.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Использование

```js
driver.getDisplayDensity()
```


##### Возвращает

- **&lt;*&gt;**


##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchId
Симуляция события [Touch ID](https://support.apple.com/en-ca/ht201371) (только для iOS Simulator). Для включения этой функции, опция `allowTouchIdEnroll` должна быть установлена в true, а симулятор должен быть [зарегистрирован](https://support.apple.com/en-ca/ht201371). Когда вы устанавливаете allowTouchIdEnroll в true, симулятор будет зарегистрирован по умолчанию. Состояние регистрации можно [переключать](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/index.html). Этот вызов будет работать только если процесс Appium или его родительское приложение (например, Terminal.app или Appium.app) имеет доступ к Mac OS accessibility в System Preferences > Security & Privacy > Privacy > Accessibility list.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/simulator/touch-id/).

##### Использование

```js
driver.touchId(match)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>match</var></code></td>
      <td>boolean</td>
      <td>симулируем ли успешное касание (true) или неудачное касание (false)</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## toggleEnrollTouchId
Переключить [регистрацию](https://support.apple.com/en-ca/ht201371) симулятора для приема touchId (только для iOS Simulator). Для включения этой функции опция `allowTouchIdEnroll` должна быть установлена в true. Когда `allowTouchIdEnroll` установлен в true, симулятор будет зарегистрирован по умолчанию, и команда 'Toggle Touch ID Enrollment' изменяет состояние регистрации. Этот вызов будет работать только если процесс Appium или его родительское приложение (например, Terminal.app или Appium.app) имеет доступ к Mac OS accessibility в System Preferences > Security & Privacy > Privacy > Accessibility list.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/simulator/toggle-touch-id-enrollment/).

##### Использование

```js
driver.toggleEnrollTouchId(enabled)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>enabled=true</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>boolean</td>
      <td>равно true, если регистрация TouchID должна быть включена</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## launchApp
Запустить приложение на устройстве.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/app/launch-app/).
:::caution

Эта команда протокола устарела<br />Для iOS используйте `driver.execute('mobile: launchApp', { ... })`, а для Android используйте `driver.execute('mobile: activateApp', { ... })`.
:::

##### Использование

```js
driver.launchApp()
```




##### Поддержка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## closeApp
Закрыть приложение на устройстве.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/app/close-app/).
:::caution

Эта команда протокола устарела<br />Используйте `driver.execute('mobile: terminateApp', { ... })` вместо этого
:::

##### Использование

```js
driver.closeApp()
```




##### Поддержка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## background
Отправить текущее запущенное приложение для этой сессии в фоновый режим.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/app/background-app/).
:::caution

Эта команда протокола устарела<br />Используйте `driver.execute('mobile: backgroundApp', { ... })` вместо этого
:::

##### Использование

```js
driver.background(seconds)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>seconds=null</var></code></td>
      <td>number, null</td>
      <td>время до восстановления приложения, если 'null', приложение не будет восстановлено</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## endCoverage
Получить данные о покрытии тестами.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/app/end-test-coverage/).

##### Использование

```js
driver.endCoverage(intent, path)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>intent</var></code></td>
      <td>string</td>
      <td>интент для трансляции</td>
    </tr>
    <tr>
      <td><code><var>path</var></code></td>
      <td>string</td>
      <td>путь к файлу .ec</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getStrings
Получить строки приложения.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/app/get-app-strings/).

##### Использование

```js
driver.getStrings(language, stringFile)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>language</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>string</td>
      <td>код языка</td>
    </tr>
    <tr>
      <td><code><var>stringFile</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>string</td>
      <td>путь к файлу строк</td>
    </tr>
  </tbody>
</table>


##### Возвращает

- **&lt;object&gt;**
            **<code><var>appStrings</var></code>:** все определенные строки из приложения для указанного языка и имени файла строк

##### Поддержка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## setValueImmediate
Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Использование

```js
driver.setValueImmediate(elementId, text)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>id элемента, возвращенный в предыдущем вызове Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>текст для установки в элемент</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## replaceValue
Заменить значение элемента напрямую.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Использование

```js
driver.replaceValue(elementId, value)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>id элемента, возвращенный в предыдущем вызове Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>значение для замены в элементе</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getSettings
Получить текущие настройки на устройстве.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/session/settings/get-settings/).

##### Использование

```js
driver.getSettings()
```


##### Возвращает

- **&lt;object&gt;**
            **<code><var>settings</var></code>:** JSON-хэш всех текущих указанных настроек, см. API настроек

##### Поддержка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## updateSettings
Обновить текущие настройки на устройстве.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/session/settings/update-settings/).

##### Использование

```js
driver.updateSettings(settings)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>settings</var></code></td>
      <td>object</td>
      <td>объект ключ/значение с настройками для обновления</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## receiveAsyncResponse
URL-обратный вызов для асинхронного выполнения JavaScript.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md#appium-extension-endpoints).

##### Использование

```js
driver.receiveAsyncResponse(response)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>response</var></code></td>
      <td>object</td>
      <td>ответ для получения на устройстве</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)

---

## gsmCall
Сделать GSM-вызов (только для эмулятора).<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-call/).

##### Использование

```js
driver.gsmCall(phoneNumber, action)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>номер телефона для вызова</td>
    </tr>
    <tr>
      <td><code><var>action</var></code></td>
      <td>string</td>
      <td>Действие - 'call', 'accept', 'cancel', 'hold'</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmSignal
Установить силу GSM-сигнала (только для эмулятора).<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-signal/).

##### Использование

```js
driver.gsmSignal(signalStrength, signalStrengh)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>signalStrength</var></code></td>
      <td>string</td>
      <td>сила сигнала в диапазоне [0, 4]</td>
    </tr>
    <tr>
      <td><code><var>signalStrengh</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>string</td>
      <td>сила сигнала в диапазоне [0, 4]. Пожалуйста, также установите этот параметр с тем же значением, если вы используете Appium v1.11.0 или ниже (см. https://github.com/appium/appium/issues/12234).</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerCapacity
Установить процент заряда батареи (только для эмулятора).<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_capacity/).

##### Использование

```js
driver.powerCapacity(percent)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>percent</var></code></td>
      <td>number</td>
      <td>процентное значение в диапазоне [0, 100]</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## powerAC
Установить состояние зарядки батареи на подключенное или отключенное (только для эмулятора).<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/emulator/power_ac/).

##### Использование

```js
driver.powerAC(state)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>установить состояние. on или off</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## gsmVoice
Установить состояние GSM-голоса (только для эмулятора).<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/network/gsm-voice/).

##### Использование

```js
driver.gsmVoice(state)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>состояние GSM-голоса - 'unregistered', 'home', 'roaming', 'searching', 'denied', 'off', 'on'</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## sendSms
Симулировать SMS-сообщение (только для эмулятора).<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/network/send-sms/).

##### Использование

```js
driver.sendSms(phoneNumber, message)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>phoneNumber</var></code></td>
      <td>string</td>
      <td>номер телефона для отправки SMS</td>
    </tr>
    <tr>
      <td><code><var>message</var></code></td>
      <td>string</td>
      <td>SMS сообщение</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## fingerPrint
Аутентифицировать пользователей с помощью сканирования отпечатков пальцев на поддерживаемых эмуляторах.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/authentication/finger-print/).

##### Использование

```js
driver.fingerPrint(fingerprintId)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>fingerprintId</var></code></td>
      <td>number</td>
      <td>отпечатки пальцев, хранящиеся в системе Android Keystore (от 1 до 10)</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## setClipboard
Установить содержимое системного буфера обмена<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/set-clipboard/).

##### Использование

```js
driver.setClipboard(content, contentType, label)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>content</var></code></td>
      <td>string</td>
      <td>Фактическое содержимое буфера обмена, закодированное в base64</td>
    </tr>
    <tr>
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>string</td>
      <td>Тип содержимого для получения. Plaintext, Image, URL. Android поддерживает только plaintext</td>
    </tr>
    <tr>
      <td><code><var>label</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>string</td>
      <td>Метка данных буфера обмена для Android</td>
    </tr>
  </tbody>
</table>


##### Возвращает

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Ответ от сервера Appium

##### Поддержка

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getClipboard
Получить содержимое системного буфера обмена<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/device/clipboard/get-clipboard/).

##### Использование

```js
driver.getClipboard(contentType)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>contentType</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>string</td>
      <td>Тип содержимого для получения. Plaintext, Image, URL. Android поддерживает только plaintext</td>
    </tr>
  </tbody>
</table>


##### Возвращает

- **&lt;string&gt;**
            **<code><var>response</var></code>:** Содержимое буфера обмена как строка в кодировке base64 или пустая строка, если буфер обмена пуст

##### Поддержка

![Support for XCUITest (9.3+)](/img/icons/ios.svg)
![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchPerform
Эта функциональность доступна только из нативного контекста. 'Touch Perform' работает аналогично другим единичным сенсорным взаимодействиям, за исключением того, что это позволяет объединить несколько сенсорных действий в одну команду. Это полезно, потому что команды Appium отправляются по сети, и между командами есть задержка. Эта задержка может сделать некоторые сенсорные взаимодействия невозможными, потому что некоторые взаимодействия должны выполняться одной последовательностью. Вертикальное, например, требует нажатия, перемещения на другую координату y, а затем отпускания. Чтобы это сработало, между взаимодействиями не должно быть задержки.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/touch-perform/).

##### Использование

```js
driver.touchPerform(actions)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>Тип действия для выполнения (например, moveTo, release, press, tap, wait)</td>
    </tr>
  </tbody>
</table>

##### Пример


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


##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## multiTouchPerform
Эта функциональность доступна только из нативного контекста. Выполнить последовательность мультитач-действий.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/commands/interactions/touch/multi-touch-perform/).

##### Использование

```js
driver.multiTouchPerform(actions)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>actions</var></code></td>
      <td>object[]</td>
      <td>Тип действия для выполнения (например, moveTo, release, press, tap, wait)</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+), UIAutomation (8.0 to 9.3)](/img/icons/ios.svg)
![Support for Windows (10+)](/img/icons/windows.svg)

---

## executeDriverScript
Эта команда позволяет вам указать скрипт WebdriverIO в виде строки и передать его на сервер Appium для локального выполнения на самом сервере. Этот подход помогает минимизировать потенциальную задержку, связанную с каждой командой. ***Для использования этой команды с Appium 2.0 у вас должен быть установлен плагин [`execute-driver-plugin`](https://github.com/appium/appium/tree/master/packages/execute-driver-plugin).***<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/appium/appium/blob/master/docs/en/commands/session/execute-driver.md).

##### Использование

```js
driver.executeDriverScript(script, type, timeout)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>script</var></code></td>
      <td>string</td>
      <td>Скрипт для выполнения. Он имеет доступ к объекту 'driver', который представляет сессию WebdriverIO, подключенную к текущему серверу.</td>
    </tr>
    <tr>
      <td><code><var>type</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>string</td>
      <td>Язык/фреймворк, используемый в скрипте. В настоящее время поддерживается только 'webdriverio', и это значение по умолчанию.</td>
    </tr>
    <tr>
      <td><code><var>timeout</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>number</td>
      <td>Количество миллисекунд, в течение которых скрипту разрешено выполняться, прежде чем он будет завершен сервером Appium. По умолчанию эквивалентно 1 часу.</td>
    </tr>
  </tbody>
</table>


##### Возвращает

- **&lt;object&gt;**
            **<code><var>result</var></code>:** Объект, содержащий два поля: 'result', который является возвращаемым значением самого скрипта, и 'logs', который содержит 3 внутренних поля, 'log', 'warn' и 'error', которые содержат массив строк, записанных с помощью console.log, console.warn и console.error в процессе выполнения скрипта.


---

## getEvents
Получить события, хранящиеся на сервере appium.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/get-events.md).

##### Использование

```js
driver.getEvents(type)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string[]</td>
      <td>Получить события, отфильтрованные по типу, если тип предоставлен.</td>
    </tr>
  </tbody>
</table>


##### Возвращает

- **&lt;object&gt;**
            **<code><var>result</var></code>:** JSON-хэш событий вида `{'commands' => [{'cmd' => 123455, ....}], 'startTime' => 1572954894127, }`.

##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## logEvent
Сохранить пользовательское событие.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/appium/appium/blob/master/docs/en/commands/session/events/log-event.md).

##### Использование

```js
driver.logEvent(vendor, event)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>vendor</var></code></td>
      <td>string</td>
      <td>Название поставщика. Это будет `vendor` в `vendor:event`.</td>
    </tr>
    <tr>
      <td><code><var>event</var></code></td>
      <td>string</td>
      <td>Название события. Это будет `event` в `vendor:event`.</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## compareImages
Эта функция проводит сравнение изображений, используя возможности фреймворка OpenCV. Обратите внимание, что для работы этой функциональности как фреймворк OpenCV, так и модуль opencv4nodejs должны быть установлены на машине, где работает сервер Appium. ***Кроме того, вам необходимо установить плагин [`images-plugin`](https://github.com/appium/appium/tree/master/packages/images-plugin) для использования этой функции с Appium 2.0.***<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://appium.github.io/appium.io/docs/en/writing-running-appium/image-comparison/).

##### Использование

```js
driver.compareImages(mode, firstImage, secondImage, options)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>mode=matchFeatures</var></code></td>
      <td>string</td>
      <td>Один из возможных режимов сравнения: 'matchFeatures', 'getSimilarity', 'matchTemplate'. По умолчанию 'matchFeatures'.</td>
    </tr>
    <tr>
      <td><code><var>firstImage</var></code></td>
      <td>string</td>
      <td>Данные изображения. Поддерживаются все форматы изображений, которые принимает сама библиотека OpenCV.</td>
    </tr>
    <tr>
      <td><code><var>secondImage</var></code></td>
      <td>string</td>
      <td>Данные изображения. Поддерживаются все форматы изображений, которые принимает сама библиотека OpenCV.</td>
    </tr>
    <tr>
      <td><code><var>options=[object Object]</var></code></td>
      <td>object</td>
      <td>Содержимое этого словаря зависит от фактического значения `mode`. См. документацию по модулю `appium-support` для получения дополнительной информации. </td>
    </tr>
  </tbody>
</table>


##### Возвращает

- **&lt;object&gt;**
            **<code><var>result</var></code>:** Содержимое результирующего словаря зависит от фактических значений `mode` и `options`. См. документацию по модулю `appium-support` для получения дополнительной информации.


---

## implicitWait
Установить количество времени, которое драйвер должен ждать при поиске элементов. При поиске одного элемента драйвер должен опрашивать страницу до тех пор, пока элемент не будет найден или не истечет время ожидания, в зависимости от того, что произойдет раньше. При поиске нескольких элементов драйвер должен опрашивать страницу до тех пор, пока не будет найден хотя бы один элемент или не истечет время ожидания, после чего он должен вернуть пустой список. Если эта команда никогда не отправляется, драйвер должен по умолчанию использовать неявное ожидание 0 мс.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Использование

```js
driver.implicitWait(ms)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>Количество времени в миллисекундах для ожидания элемента.</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLocationInView
Определить расположение элемента на экране после его прокрутки в область видимости.<br /><br />__Примечание:__ Это считается внутренней командой и должно использоваться только для определения местоположения элемента для правильной генерации нативных событий.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Использование

```js
driver.getLocationInView(elementId)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID элемента, куда направить команду</td>
    </tr>
  </tbody>
</table>


##### Возвращает

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** Координаты X и Y для элемента на странице.

##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## sendKeys
Отправить последовательность нажатий клавиш активному элементу<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Использование

```js
driver.sendKeys(value)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string[]</td>
      <td>Последовательность клавиш для ввода. Должен быть предоставлен массив.</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## availableIMEEngines
Список всех доступных движков на машине. Чтобы использовать движок, он должен присутствовать в этом списке.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Использование

```js
driver.availableIMEEngines()
```


##### Возвращает

- **&lt;String[]&gt;**
            **<code><var>engines</var></code>:** Список доступных движков

##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getActiveIMEEngine
Получить имя активного движка IME. Строка имени зависит от платформы.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Использование

```js
driver.getActiveIMEEngine()
```


##### Возвращает

- **&lt;String&gt;**
            **<code><var>engine</var></code>:** Имя активного движка IME

##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## isIMEActivated
Указывает, активен ли ввод IME в данный момент<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Использование

```js
driver.isIMEActivated()
```


##### Возвращает

- **&lt;Boolean&gt;**
            **<code><var>isActive</var></code>:** true, если ввод IME доступен и активен в данный момент, false в противном случае

##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## deactivateIMEEngine
Деактивирует текущий активный движок IME.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Использование

```js
driver.deactivateIMEEngine()
```




##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## activateIMEEngine
Сделать доступный движок активным<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Использование

```js
driver.activateIMEEngine(engine)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>engine</var></code></td>
      <td>string</td>
      <td>название движка для активации</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## asyncScriptTimeout
Установить количество времени в миллисекундах, в течение которого асинхронным скриптам, выполняемым с помощью `/session/:sessionId/execute_async`, разрешено выполняться, прежде чем они будут прерваны и возвращена ошибка `Timeout` клиенту.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Использование

```js
driver.asyncScriptTimeout(ms)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>ms</var></code></td>
      <td>number</td>
      <td>Количество времени в миллисекундах, в течение которого командам с ограничением по времени разрешено выполняться</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## submit
Отправить элемент формы.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Использование

```js
driver.submit(elementId)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID элемента формы, который должен быть отправлен</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementSize
Определить размер элемента в пикселях. Размер будет возвращен в виде объекта JSON с свойствами `width` и `height`.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Использование

```js
driver.getElementSize(elementId)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID элемента, куда направить команду</td>
    </tr>
  </tbody>
</table>


##### Возвращает

- **&lt;Object&gt;**
            **<code><var>size</var></code>:** Ширина и высота элемента в пикселях.

##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getElementLocation
Определить расположение элемента на странице. Точка `(0, 0)` относится к верхнему левому углу страницы. Координаты элемента возвращаются в виде объекта JSON со свойствами `x` и `y`.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Использование

```js
driver.getElementLocation(elementId)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>ID элемента, куда направить команду</td>
    </tr>
  </tbody>
</table>


##### Возвращает

- **&lt;Object&gt;**
            **<code><var>location</var></code>:** Координаты X и Y элемента на странице.

##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchClick
Одиночное нажатие на устройстве с сенсорным экраном.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Использование

```js
driver.touchClick(element)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>ID элемента для одиночного нажатия.</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## touchDown
Палец вниз на экране.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Использование

```js
driver.touchDown(x, y)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>координата x на экране</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>координата y на экране</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchUp
Палец вверх на экране.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Использование

```js
driver.touchUp(x, y)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>координата x на экране</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>координата y на экране</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchMove
Движение пальцем по экрану.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Использование

```js
driver.touchMove(x, y)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>координата x на экране</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>координата y на экране</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchLongClick
Долгое нажатие на сенсорном экране с использованием событий движения пальца.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Использование

```js
driver.touchLongClick(element)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>element</var></code></td>
      <td>string</td>
      <td>ID элемента для долгого нажатия</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## touchFlick
Быстрое скольжение на сенсорном экране с использованием событий движения пальца. Эта команда скольжения начинается из определенного места на экране.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Использование

```js
driver.touchFlick(xoffset, yoffset, element, speed, xspeed, yspeed)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>xoffset</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>number</td>
      <td>смещение x в пикселях для скольжения</td>
    </tr>
    <tr>
      <td><code><var>yoffset</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>number</td>
      <td>смещение y в пикселях для скольжения</td>
    </tr>
    <tr>
      <td><code><var>element</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>string</td>
      <td>ID элемента, с которого начинается скольжение</td>
    </tr>
    <tr>
      <td><code><var>speed</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>number</td>
      <td>скорость в пикселях в секунду</td>
    </tr>
    <tr>
      <td><code><var>xspeed</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>number</td>
      <td>скорость x в пикселях в секунду</td>
    </tr>
    <tr>
      <td><code><var>yspeed</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>number</td>
      <td>скорость y в пикселях в секунду</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)

---

## getOrientation
Получить текущую ориентацию устройства.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Использование

```js
driver.getOrientation()
```


##### Возвращает

- **&lt;String&gt;**
            **<code><var>orientation</var></code>:** Текущая ориентация, соответствующая значению, определенному в ScreenOrientation: `LANDSCAPE|PORTRAIT`.

##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## setOrientation
Установить ориентацию устройства<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Использование

```js
driver.setOrientation(orientation)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>orientation</var></code></td>
      <td>string</td>
      <td>новая ориентация браузера, как определено в ScreenOrientation: `LANDSCAPE|PORTRAIT`</td>
    </tr>
  </tbody>
</table>


##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogs
Получить лог для данного типа лога. Буфер логов сбрасывается после каждого запроса.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Использование

```js
driver.getLogs(type)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>type</var></code></td>
      <td>string</td>
      <td>тип лога</td>
    </tr>
  </tbody>
</table>


##### Возвращает

- **&lt;Object[]&gt;**
            **<code><var>logs</var></code>:** Список записей лога.

##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)

---

## getLogTypes
Получить доступные типы логов.<br /><br />Команда Appium. Подробнее в [официальной документации по протоколу](https://github.com/appium/appium/blob/master/packages/base-driver/docs/mjsonwp/protocol-methods.md#webdriver-endpoints).

##### Использование

```js
driver.getLogTypes()
```


##### Возвращает

- **&lt;String[]&gt;**
            **<code><var>logTypes</var></code>:** Список доступных типов логов.

##### Поддержка

![Support for UiAutomator (4.2+)](/img/icons/android.svg)
![Support for XCUITest (9.3+)](/img/icons/ios.svg)
