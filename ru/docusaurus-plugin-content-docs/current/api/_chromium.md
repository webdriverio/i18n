---
id: chromium
title: Chromium
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/chromium.ts
---

## isAlertOpen
Проверяет, открыт ли простой диалог в данный момент.<br /><br />Неофициальная и недокументированная команда Chromium. Дополнительную информацию об этой команде можно найти [здесь](https://github.com/bayandin/chromedriver/blob/v2.45/alert_commands.cc#L42-L49).

##### Использование

```js
browser.isAlertOpen()
```

##### Пример


```js
console.log(browser.isAlertOpen()); // выводит: false
browser.execute('window.alert()');
console.log(browser.isAlertOpen()); // выводит: true
```


##### Возвращает

- **&lt;Boolean&gt;**
            **<code><var>isAlertOpen</var></code>:** `true` или `false` в зависимости от того, присутствует ли простой диалог или нет.


---

## isAutoReporting
Проверяет, автоматически ли генерируются ошибки в логах браузера.<br /><br />Неофициальная и недокументированная команда Chromium. Дополнительную информацию об этой команде можно найти [здесь](https://codereview.chromium.org/101203012).

##### Использование

```js
browser.isAutoReporting()
```


##### Возвращает

- **&lt;Boolean&gt;**
            **<code><var>isAutoReporting</var></code>:** `true` или `false` в зависимости от того, включено ли автоматическое оповещение.


---

## setAutoReporting
Переключает, возвращать ли ответ с неизвестной ошибкой при первой ошибке браузера (например, не удалось загрузить ресурс из-за ответа 403/404) для всех последующих команд (после включения).<br /><br />Неофициальная и недокументированная команда Chromium. Дополнительную информацию об этой команде можно найти [здесь](https://codereview.chromium.org/101203012).

##### Использование

```js
browser.setAutoReporting(enabled)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>enabled</var></code></td>
      <td>boolean</td>
      <td>`true`, если автоматическое оповещение должно быть включено, используйте `false` для отключения ранее включенного автоматического оповещения.</td>
    </tr>
  </tbody>
</table>

##### Примеры


```js
// Включить автоматическое оповещение сразу после инициализации сессии с пустыми логами браузера
console.log(browser.setAutoReporting(true)); // выводит: null
// При запросе несуществующего ресурса выполнение прервется из-за выброшенной неизвестной ошибки
browser.url('https://webdriver.io/img/404-does-not-exist.png');
```


```js
// В течение сессии выполнить некоторые операции, которые заполняют логи браузера
browser.url('https://webdriver.io/img/404-does-not-exist.png');
browser.url('https://webdriver.io/403/no-access');
// Включить автоматическое оповещение, которое выбрасывает неизвестную ошибку для первой ошибки браузера (ответ 404)
browser.setAutoReporting(true);
```


##### Возвращает

- **&lt;Object|Null&gt;**
            **<code><var>firstBrowserError</var></code>:** В случае, если первая ошибка браузера уже произошла до выполнения этой команды, будет выброшена неизвестная ошибка в ответе, которая представляет собой объект с ключом 'message', описывающим первую ошибку браузера. В противном случае возвращает `null` в случае успеха.


---

## isLoading
Определяет статус загрузки для активного окна.<br /><br />Неофициальная и недокументированная команда Chromium. Дополнительную информацию об этой команде можно найти [здесь](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L783-L802).

##### Использование

```js
browser.isLoading()
```

##### Пример


```js
console.log(browser.isLoading()); // выводит: false
browser.newWindow('https://webdriver.io');
console.log(browser.isLoading()); // выводит: true
```


##### Возвращает

- **&lt;Boolean&gt;**
            **<code><var>isLoading</var></code>:** `true` или `false` в зависимости от того, загружается ли активное окно или нет.


---

## takeHeapSnapshot
Делает снимок кучи текущего контекста выполнения.<br /><br />Неофициальная и недокументированная команда Chromium. Дополнительную информацию об этой команде можно найти [здесь](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/web_view.h#L198-L202).

##### Использование

```js
browser.takeHeapSnapshot()
```


##### Возвращает

- **&lt;Object&gt;**
            **<code><var>heapSnapshot</var></code>:** JSON-представление снимка кучи. Его можно проверить, загрузив как файл в Chrome DevTools.


---

## getNetworkConnection
Получает тип соединения для эмуляции сети. Эта команда применима только в том случае, если удаленный конец отвечает с возможностью `networkConnectionEnabled`, установленной в `true`.<br /><br />Неофициальная и недокументированная команда Chromium. Дополнительную информацию об этой команде можно найти [здесь](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).

##### Использование

```js
browser.getNetworkConnection()
```

##### Пример


```js
const browser = remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            // Эмуляция сети требует режима устройства, который включается только при включенной эмуляции мобильного устройства
            mobileEmulation: { deviceName: 'iPad' },
        },
    }
});
console.log(browser.getNetworkConnection()); // выводит: 6 (Как Wi-Fi, так и мобильные данные)
```


##### Возвращает

- **&lt;Number&gt;**
            **<code><var>connectionType</var></code>:** Битовая маска для представления типа сетевого соединения. Режим полета (`1`), только Wi-Fi (`2`), Wi-Fi и данные (`6`), 4G (`8`), 3G (`10`), 2G (`20`). По умолчанию [Wi-Fi и данные включены](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/chrome_desktop_impl.cc#L36-L37).


---

## setNetworkConnection
Изменить тип соединения для сетевого соединения. Эта команда применима только в том случае, если удаленный конец отвечает с возможностью `networkConnectionEnabled`, установленной в `true`.<br /><br />Неофициальная и недокументированная команда Chromium. Дополнительную информацию об этой команде можно найти [здесь](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md#device-modes).

##### Использование

```js
browser.setNetworkConnection(parameters)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>parameters</var></code></td>
      <td>object</td>
      <td>Объект, содержащий ConnectionType, установите битовую маску в качестве значения для ключа `type` в объекте. Режим полета (`1`), только Wi-Fi (`2`), Wi-Fi и данные (`6`), 4G (`8`), 3G (`10`), 2G (`20`).</td>
    </tr>
  </tbody>
</table>

##### Пример


```js
const browser = remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            // Эмуляция сети требует режима устройства, который включается только при включенной эмуляции мобильного устройства
            mobileEmulation: { deviceName: 'iPad' },
        },
    }
});
console.log(browser.setNetworkConnection({ type: 1 })); // выводит: 1 (Режим полета)
```


##### Возвращает

- **&lt;Number&gt;**
            **<code><var>connectionType</var></code>:** Битовая маска для представления типа сетевого соединения. Значение должно соответствовать указанному `type` в объекте, однако устройство может не поддерживать запрошенный тип сетевого соединения.


---

## getNetworkConditions
Получает текущие сетевые условия, используемые для эмуляции.<br /><br />Неофициальная и недокументированная команда Chromium. Дополнительную информацию об этой команде можно найти [здесь](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L839-L859).

##### Использование

```js
browser.getNetworkConditions()
```


##### Возвращает

- **&lt;Object&gt;**
            **<code><var>networkConditions</var></code>:** Объект, содержащий сетевые условия для `offline`, `latency`, `download_throughput` и `upload_throughput`. Сетевые условия должны быть установлены до того, как их можно будет получить.


---

## setNetworkConditions
Устанавливает сетевые условия, используемые для эмуляции, путем регулирования соединения.<br /><br />Неофициальная и недокументированная команда Chromium. Дополнительную информацию об этой команде можно найти [здесь](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1663-L1722).

##### Использование

```js
browser.setNetworkConditions(network_conditions, network_name)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>network_conditions</var></code></td>
      <td>object</td>
      <td>Объект, содержащий сетевые условия, которые представляют собой `latency`, `throughput` (или `download_throughput`/`upload_throughput`) и `offline` (опционально).</td>
    </tr>
    <tr>
      <td><code><var>network_name</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Название [пресета регулирования сети](https://github.com/bayandin/chromedriver/blob/v2.45/chrome/network_list.cc#L12-L25). `GPRS`, `Regular 2G`, `Good 2G`, `Regular 3G`, `Good 3G`, `Regular 4G`, `DSL`, `WiFi` или `No throttling` для отключения. Когда пресет указан, значения, переданные в первом аргументе, не учитываются.</td>
    </tr>
  </tbody>
</table>

##### Примеры


```js
// Использовать разные значения скорости загрузки (25 кб/с) и выгрузки (50 кб/с) для регулирования с задержкой 1000 мс
browser.setNetworkConditions({ latency: 1000, download_throughput: 25600, upload_throughput: 51200 });
```


```js
// Принудительно отключиться от сети, установив 'offline' в true
browser.setNetworkConditions({ latency: 0, throughput: 0, offline: true });
```


```js
// Когда указано название пресета (например, 'DSL'), он не учитывает значения в объекте (например, 'offline')
browser.setNetworkConditions({ latency: 0, throughput: 0, offline: true }, 'DSL');
```


```js
// Лучшая практика для указания пресета регулирования сети - использовать пустой объект
browser.setNetworkConditions({}, 'Good 3G');
```



---

## deleteNetworkConditions
Отключает любое регулирование сети, которое могло быть установлено. Эквивалентно установке пресета `No throttling`.<br /><br />Неофициальная и недокументированная команда Chromium. Дополнительную информацию об этой команде можно найти [здесь](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1724-L1745).

##### Использование

```js
browser.deleteNetworkConditions()
```



---

## sendCommand
Отправляет команду отладчику DevTools.<br />Список доступных команд и их параметров можно найти в [Chrome DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/).<br /><br />Неофициальная и недокументированная команда Chromium. Дополнительную информацию об этой команде можно найти [здесь](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1290-L1304).

##### Использование

```js
browser.sendCommand(cmd, params)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>cmd</var></code></td>
      <td>string</td>
      <td>Название команды (например, [`Browser.close`](https://chromedevtools.github.io/devtools-protocol/1-3/Browser#method-close)).</td>
    </tr>
    <tr>
      <td><code><var>params</var></code></td>
      <td>object</td>
      <td>Параметры команды. Если у команды нет параметров, укажите пустой объект.</td>
    </tr>
  </tbody>
</table>



---

## sendCommandAndGetResult
Отправляет команду отладчику DevTools и ожидает результат.<br />Список доступных команд и их параметров можно найти в [Chrome DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/).<br /><br />Неофициальная и недокументированная команда Chromium. Дополнительную информацию об этой команде можно найти [здесь](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L1306-L1320).

##### Использование

```js
browser.sendCommandAndGetResult(cmd, params)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>cmd</var></code></td>
      <td>string</td>
      <td>Название команды, которая возвращает результат (например, [`Network.getAllCookies`](https://chromedevtools.github.io/devtools-protocol/1-3/Network#method-getAllCookies)).</td>
    </tr>
    <tr>
      <td><code><var>params</var></code></td>
      <td>object</td>
      <td>Параметры команды. Если у команды нет параметров, укажите пустой объект.</td>
    </tr>
  </tbody>
</table>


##### Возвращает

- **&lt;*&gt;**
            **<code><var>result</var></code>:** Либо возвращаемое значение вашей команды, либо ошибка, которая была причиной сбоя вашей команды.


---

## file
Загружает файл на удаленную машину, на которой запущен браузер.<br /><br />Неофициальная и недокументированная команда Chromium. Дополнительную информацию об этой команде можно найти [здесь](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L1037-L1065).

##### Использование

```js
browser.file(file)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>file</var></code></td>
      <td>string</td>
      <td>Base64-кодированный ZIP-архив, содержащий __один__ файл для загрузки. Если base64-кодированные данные не представляют собой ZIP-архив или архив содержит более одного файла, будет выброшена неизвестная ошибка.</td>
    </tr>
  </tbody>
</table>


##### Возвращает

- **&lt;String&gt;**
            **<code><var>path</var></code>:** Абсолютный путь загруженного файла на удаленной машине.


---

## launchChromeApp
Запускает приложение Chrome по указанному идентификатору.<br /><br />Неофициальная и недокументированная команда Chromium. Дополнительную информацию об этой команде можно найти [здесь](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L521-L539).

##### Использование

```js
browser.launchChromeApp(id)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>id</var></code></td>
      <td>string</td>
      <td>Идентификатор расширения приложения, которое нужно запустить, как определено в chrome://extensions.</td>
    </tr>
  </tbody>
</table>

##### Пример


```js
import fs from 'fs'
const browser = remote({
    capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
            // Установить при запуске браузера для возможности запуска
            extensions: [
              // Запись должна быть упакованным приложением Chrome (.crx) в формате base64
              fs.readFileSync('/absolute/path/app.crx').toString('base64')
            ]
        }
    }
});
browser.launchChromeApp('aohghmighlieiainnegkcijnfilokake')); // Google Docs (https://chrome.google.com/webstore/detail/docs/aohghmighlieiainnegkcijnfilokake)
```



---

## getElementValue
Получает значение данного элемента управления формы.<br /><br />Неофициальная и недокументированная команда Chromium. Дополнительную информацию об этой команде можно найти [здесь](https://github.com/bayandin/chromedriver/blob/v2.45/element_commands.cc#L431-L443).

##### Использование

```js
browser.getElementValue(elementId)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>идентификатор элемента, из которого получать значение</td>
    </tr>
  </tbody>
</table>


##### Возвращает

- **&lt;String|Null&gt;**
            **<code><var>value</var></code>:** Текущее значение элемента. Если указанный элемент не является элементом управления формы, будет возвращено `null`.


---

## elementHover
Включает состояние наведения для элемента, которое сбрасывается при следующем взаимодействии.<br /><br />Неофициальная и недокументированная команда Chromium. Дополнительную информацию об этой команде можно найти [здесь](https://github.com/bayandin/chromedriver/blob/v2.45/element_commands.cc#L126-L146).

##### Использование

```js
browser.elementHover(elementId)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>идентификатор элемента, на который нужно навести курсор</td>
    </tr>
  </tbody>
</table>



---

## touchPinch
Вызывает эффект масштабирования щипком.<br /><br />Неофициальная и недокументированная команда Chromium. Дополнительную информацию об этой команде можно найти [здесь](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L813-L827).

##### Использование

```js
browser.touchPinch(x, y, scale)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>x</var></code></td>
      <td>number</td>
      <td>x-координата для щипка</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number</td>
      <td>y-координата для щипка</td>
    </tr>
    <tr>
      <td><code><var>scale</var></code></td>
      <td>number</td>
      <td>масштаб увеличения щипком</td>
    </tr>
  </tbody>
</table>



---

## freeze
Замораживает текущую страницу. Расширение для [Page Lifecycle API](https://developers.google.com/web/updates/2018/07/page-lifecycle-api).<br /><br />Неофициальная и недокументированная команда Chromium. Дополнительную информацию об этой команде можно найти [здесь](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L625-L633).

##### Использование

```js
browser.freeze()
```



---

## resume
Возобновляет работу текущей страницы. Расширение для [Page Lifecycle API](https://developers.google.com/web/updates/2018/07/page-lifecycle-api).<br /><br />Неофициальная и недокументированная команда Chromium. Дополнительную информацию об этой команде можно найти [здесь](https://github.com/bayandin/chromedriver/blob/v2.45/window_commands.cc#L635-L645).

##### Использование

```js
browser.resume()
```



---

## getCastSinks
Возвращает список приемников Cast (устройств Cast), доступных медиа-маршрутизатору Chrome.<br /><br />Неофициальная и недокументированная команда Chromium. Дополнительную информацию об этой команде можно найти [здесь](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#748).

##### Использование

```js
browser.getCastSinks()
```


##### Возвращает

- **&lt;string[]&gt;**
            **<code><var>sinks</var></code>:** Список доступных приемников.


---

## selectCastSink
Выбирает приемник Cast (устройство Cast) в качестве получателя намерений медиа-маршрутизатора (подключение или воспроизведение).<br /><br />Неофициальная и недокументированная команда Chromium. Дополнительную информацию об этой команде можно найти [здесь](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#737).

##### Использование

```js
browser.selectCastSink(sinkName)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>Имя целевого устройства.</td>
    </tr>
  </tbody>
</table>



---

## startCastTabMirroring
Инициирует зеркальное отображение вкладки для текущей вкладки браузера на указанном устройстве.<br /><br />Неофициальная и недокументированная команда Chromium. Дополнительную информацию об этой команде можно найти [здесь](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#741).

##### Использование

```js
browser.startCastTabMirroring(sinkName)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>Имя целевого устройства.</td>
    </tr>
  </tbody>
</table>



---

## getCastIssueMessage
Возвращает сообщение об ошибке, если есть какая-либо проблема в сессии Cast.<br /><br />Неофициальная и недокументированная команда Chromium. Дополнительную информацию об этой команде можно найти [здесь](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#751).

##### Использование

```js
browser.getCastIssueMessage()
```


##### Возвращает

- **&lt;String&gt;**
            **<code><var>message</var></code>:** Сообщение об ошибке, если таковое имеется.


---

## stopCasting
Останавливает трансляцию с медиа-маршрутизатора на указанное устройство, если подключено.<br /><br />Неофициальная и недокументированная команда Chromium. Дополнительную информацию об этой команде можно найти [здесь](https://chromium.googlesource.com/chromium/src/+/refs/tags/73.0.3683.121/chrome/test/chromedriver/server/http_handler.cc#744).

##### Использование

```js
browser.stopCasting(sinkName)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>sinkName</var></code></td>
      <td>string</td>
      <td>Имя целевого устройства.</td>
    </tr>
  </tbody>
</table>



---

## shutdown
Завершение процесса ChromeDriver и, как следствие, прекращение всех активных сессий.<br /><br />Неофициальная и недокументированная команда Chromium. Дополнительную информацию об этой команде можно найти [здесь](https://github.com/bayandin/chromedriver/blob/v2.45/session_commands.cc#L489-L498).

##### Использование

```js
browser.shutdown()
```



---

## takeElementScreenshot
Команда Take Element Screenshot делает снимок видимой области, охватываемой ограничивающим прямоугольником элемента.<br /><br />Неофициальная и недокументированная команда Chromium. Дополнительную информацию об этой команде можно найти [здесь](https://w3c.github.io/webdriver/#dfn-take-element-screenshot).

##### Использование

```js
browser.takeElementScreenshot(elementId, scroll)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Описание</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>elementId</var></code></td>
      <td>String</td>
      <td>идентификатор элемента, возвращенный в предыдущем вызове Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>scroll</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>прокрутить в вид элемент. По умолчанию: true</td>
    </tr>
  </tbody>
</table>


##### Возвращает

- **&lt;String&gt;**
            **<code><var>screenshot</var></code>:** Данные изображения PNG в кодировке base64, составляющие снимок видимой области ограничивающего прямоугольника элемента после того, как он был прокручен в поле зрения.


---

## getLogTypes
Получает доступные типы логов.<br /><br />Неофициальная и недокументированная команда Chromium. Дополнительную информацию об этой команде можно найти [здесь](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlogtypes).

##### Использование

```js
browser.getLogTypes()
```


##### Возвращает

- **&lt;String[]&gt;**
            **<code><var>logTypes</var></code>:** Список доступных типов логов, например: browser, driver.


---

## getLogs
Получает лог для заданного типа лога. Буфер лога сбрасывается после каждого запроса.<br /><br />Неофициальная и недокументированная команда Chromium. Дополнительную информацию об этой команде можно найти [здесь](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol#sessionsessionidlog).

##### Использование

```js
browser.getLogs(type)
```


##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Описание</th>
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