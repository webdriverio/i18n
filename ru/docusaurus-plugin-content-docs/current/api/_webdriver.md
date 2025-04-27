---
id: webdriver
title: Протокол WebDriver
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/webdriver.ts
---

## newSession
Команда New Session создает новую сессию WebDriver с конечной точкой узла. Если создание не удается, возвращается ошибка создания сессии.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-new-sessions).

##### Использование

```js
browser.newSession(capabilities)
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
      <td><code><var>capabilities</var></code></td>
      <td>object</td>
      <td>объект JSON, набор возможностей, которые были в конечном итоге объединены и соответствовали в алгоритме обработки возможностей</td>
    </tr>
  </tbody>
</table>


##### Возвращает

- **&lt;Object&gt;**
            **<code><var>session</var></code>:** Объект, содержащий sessionId и capabilities созданной сессии WebDriver.


---

## deleteSession
Команда Delete Session закрывает любые контексты верхнего уровня просмотра, связанные с текущей сессией, завершает соединение и, наконец, закрывает текущую сессию.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-delete-session).

##### Использование

```js
browser.deleteSession(deleteSessionOpts)
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
      <td><code><var>deleteSessionOpts</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object</td>
      <td>Объект, содержащий опции для команды deleteSession, например `{ shutdownDriver: boolean }`</td>
    </tr>
  </tbody>
</table>



---

## status
Команда Status возвращает информацию о том, находится ли удаленный конечный пункт в состоянии, в котором он может создавать новые сессии, и может дополнительно включать произвольную метаинформацию, которая специфична для реализации.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-status).

##### Использование

```js
browser.status()
```

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L5-L16
```

##### Возвращает

- **&lt;Object&gt;**
            **<code><var>status</var></code>:** Объект, содержащий статус драйвера.


---

## getTimeouts
Команда Get Timeouts получает значения таймаутов, связанные с текущей сессией.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-get-timeouts).

##### Использование

```js
browser.getTimeouts()
```

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L20-L24
```

##### Возвращает

- **&lt;Object&gt;**
            **<code><var>timeouts</var></code>:** Объект, содержащий продолжительность таймаутов для `script`, `pageLoad` и `implicit`.


---

## setTimeouts
Команда Set Timeouts устанавливает значения таймаутов, связанные с текущей сессией. Таймауты, которые можно контролировать, перечислены в таблице таймаутов сессии ниже.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-set-timeouts).

##### Использование

```js
browser.setTimeouts(implicit, pageLoad, script)
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
      <td><code><var>implicit</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>целое число в мс для неявного ожидания сессии</td>
    </tr>
    <tr>
      <td><code><var>pageLoad</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>целое число в мс для таймаута загрузки страницы сессии</td>
    </tr>
    <tr>
      <td><code><var>script</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>целое число в мс для таймаута скрипта сессии</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L28-L33
```




---

## getUrl
Команда Get Current URL возвращает URL текущего контекста просмотра верхнего уровня.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-get-current-url).

##### Использование

```js
browser.getUrl()
```

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L39-L43
```

##### Возвращает

- **&lt;string&gt;**
            **<code><var>url</var></code>:** URL документа активного документа текущего контекста просмотра верхнего уровня


---

## navigateTo
Команда navigateTo (go) используется для перемещения пользовательского агента в текущем контексте просмотра верхнего уровня на новое местоположение.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-navigate-to).

:::info

Эта команда протокола встроена в следующий удобный метод: [url](/docs/api/browser/url). Рекомендуется использовать эту команду вместо протокольной.

:::


##### Использование

```js
browser.navigateTo(url)
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
      <td><code><var>url</var></code></td>
      <td>string</td>
      <td>строка, представляющая абсолютный URL (начиная с http(s)), возможно, включая фрагмент (#...), также может быть локальная схема (about: и т.д.)</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L47-L51
```




---

## back
Команда Back заставляет браузер перейти на один шаг назад в объединенной истории сессии текущего контекста просмотра верхнего уровня. Это эквивалентно нажатию кнопки "назад" в chrome браузера или вызову `window.history.back`.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-back).

##### Использование

```js
browser.back()
```

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L55-L59
```




---

## forward
Команда Forward заставляет браузер перейти на один шаг вперед в объединенной истории сессии текущего контекста просмотра верхнего уровня.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-forward).

##### Использование

```js
browser.forward()
```

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L63-L69
```




---

## refresh
Команда Refresh заставляет браузер перезагрузить страницу в текущем контексте просмотра верхнего уровня.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-refresh).

##### Использование

```js
browser.refresh()
```

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L73-L78
```




---

## getTitle
Команда Get Title возвращает заголовок документа текущего контекста просмотра верхнего уровня, эквивалентно вызову `document.title`.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-get-title).

##### Использование

```js
browser.getTitle()
```

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L82-L86
```

##### Возвращает

- **&lt;string&gt;**
            **<code><var>title</var></code>:** Возвращает строку, которая совпадает с `document.title` текущего контекста просмотра верхнего уровня.


---

## getWindowHandle
Команда Get Window Handle возвращает дескриптор окна для текущего контекста просмотра верхнего уровня. Он может быть использован в качестве аргумента для Switch To Window.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-get-window-handle).

##### Использование

```js
browser.getWindowHandle()
```

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L90-L93
```

##### Возвращает

- **&lt;string&gt;**
            **<code><var>handle</var></code>:** Возвращает строку, которая является дескриптором окна для текущего контекста просмотра верхнего уровня.


---

## closeWindow
Команда Close Window закрывает текущий контекст просмотра верхнего уровня. После завершения, если больше нет открытых контекстов просмотра верхнего уровня, сама сессия WebDriver закрывается.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-close-window).

##### Использование

```js
browser.closeWindow()
```

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L97-L117
```




---

## switchToWindow
Команда Switch To Window используется для выбора текущего контекста просмотра верхнего уровня для текущей сессии, т.е. того, который будет использоваться для обработки команд.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-switch-to-window).

:::info

Эта команда протокола встроена в следующий удобный метод: [switchWindow](/docs/api/browser/switchWindow). Рекомендуется использовать эту команду вместо протокольной.

:::


##### Использование

```js
browser.switchToWindow(handle)
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
      <td><code><var>handle</var></code></td>
      <td>string</td>
      <td>строка, представляющая дескриптор окна, должна быть одной из строк, которые были возвращены при вызове getWindowHandles</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L121-L130
```




---

## createWindow
Создание нового контекста просмотра верхнего уровня.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#new-window).

##### Использование

```js
browser.createWindow(type)
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
      <td>Устанавливается в 'tab', если новое созданное окно разделяет окно уровня ОС с текущим контекстом просмотра, или 'window' в противном случае.</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L134-L136
```

##### Возвращает

- **&lt;Object&gt;**
            **<code><var>window</var></code>:** Новый объект окна, содержащий 'handle' со значением дескриптора и 'type' со значением созданного типа окна


---

## getWindowHandles
Команда Get Window Handles возвращает список дескрипторов окон для каждого открытого контекста просмотра верхнего уровня. Порядок, в котором возвращаются дескрипторы окон, произвольный.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-get-window-handles).

##### Использование

```js
browser.getWindowHandles()
```

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L140-L143
```

##### Возвращает

- **&lt;String[]&gt;**
            **<code><var>handles</var></code>:** Массив, который является списком дескрипторов окон.


---

## printPage
Команда Print Page отображает документ в виде разбитого на страницы PDF-документа. __Примечание:__ Chrome в настоящее время поддерживает это только в [безголовом режиме](https://webdriver.io/docs/capabilities/#run-browser-headless), см. [`crbug753118`](https://bugs.chromium.org/p/chromium/issues/detail?id=753118)).<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#print-page).

##### Использование

```js
browser.printPage(orientation, scale, background, width, height, top, bottom, left, right, shrinkToFit, pageRanges)
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
      <td><code><var>orientation</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>ориентация страницы. По умолчанию: `portrait`</td>
    </tr>
    <tr>
      <td><code><var>scale</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>масштаб страницы. По умолчанию: `1`</td>
    </tr>
    <tr>
      <td><code><var>background</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>фон страницы. По умолчанию: `false`</td>
    </tr>
    <tr>
      <td><code><var>width</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>ширина страницы в см. По умолчанию: `21.59` от страницы</td>
    </tr>
    <tr>
      <td><code><var>height</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>высота страницы в см. По умолчанию: `27.94` от страницы</td>
    </tr>
    <tr>
      <td><code><var>top</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>поле страницы в см от верхнего края. По умолчанию: `1`</td>
    </tr>
    <tr>
      <td><code><var>bottom</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>поле страницы в см от нижнего края. По умолчанию: `1`</td>
    </tr>
    <tr>
      <td><code><var>left</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>поле страницы в см от левого края. По умолчанию: `1`</td>
    </tr>
    <tr>
      <td><code><var>right</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>поле страницы в см от правого края. По умолчанию: `1`</td>
    </tr>
    <tr>
      <td><code><var>shrinkToFit</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>уменьшить pdf, чтобы он поместился на странице. По умолчанию: `true`</td>
    </tr>
    <tr>
      <td><code><var>pageRanges</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object[]</td>
      <td>диапазоны страниц. По умолчанию `[]`</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L150-L151
```

##### Возвращает

- **&lt;string&gt;**
            **<code><var>pdf</var></code>:** PDF-представление разбитого на страницы документа в кодировке base64.


---

## switchToFrame
Команда Switch To Frame используется для выбора текущего контекста просмотра верхнего уровня или дочернего контекста просмотра текущего контекста просмотра, который будет использоваться в качестве текущего контекста просмотра для последующих команд.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-switch-to-frame).
:::caution

Эта команда протокола устарела<br />Эта команда устарела, и мы рекомендуем всем использовать вместо нее `switchFrame` для переключения во фреймы. Подробнее об этой команде на странице https://webdriver.io/docs/api/browser/switchFrame.
:::

##### Использование

```js
browser.switchToFrame(id)
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
      <td><code><var>id</var></code></td>
      <td>number, object, null</td>
      <td>один из трех возможных типов: null: это представляет контекст просмотра верхнего уровня (т.е., не iframe), Number, представляющий индекс объекта окна, соответствующего фрейму, объект Element, полученный с помощью `findElement`.</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L155-L168
```




---

## switchToParentFrame
Команда Switch to Parent Frame устанавливает текущий контекст просмотра для будущих команд на родительский контекст текущего контекста просмотра.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-switch-to-parent-frame).

##### Использование

```js
browser.switchToParentFrame()
```

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L172-L189
```




---

## getWindowRect
Команда Get Window Rect возвращает размер и положение на экране окна операционной системы, соответствующего текущему контексту просмотра верхнего уровня.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-get-window-rect).

:::info

Эта команда протокола встроена в следующий удобный метод: [getWindowSize](/docs/api/browser/getWindowSize). Рекомендуется использовать эту команду вместо протокольной.

:::


##### Использование

```js
browser.getWindowRect()
```

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L193-L196
```

##### Возвращает

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** JSON-представление объекта "window rect". Он имеет 4 свойства: `x`, `y`, `width` и `height`.


---

## setWindowRect
Команда Set Window Rect изменяет размер и положение окна операционной системы, соответствующего текущему контексту просмотра верхнего уровня.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-set-window-rect).

:::info

Эта команда протокола встроена в следующий удобный метод: [setWindowSize](/docs/api/browser/setWindowSize). Рекомендуется использовать эту команду вместо протокольной.

:::


##### Использование

```js
browser.setWindowRect(x, y, width, height)
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
      <td>number, null</td>
      <td>атрибут screenX объекта окна</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number, null</td>
      <td>атрибут screenY объекта окна</td>
    </tr>
    <tr>
      <td><code><var>width</var></code></td>
      <td>number, null</td>
      <td>ширина внешних размеров контекста просмотра верхнего уровня, включая chrome браузера и т.д...</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>number, null</td>
      <td>высота внешних размеров контекста просмотра верхнего уровня, включая chrome браузера и т.д...</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L200-L204
```

##### Возвращает

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** JSON-представление объекта "window rect" на основе нового состояния окна.


---

## maximizeWindow
Команда Maximize Window вызывает специфическую для оконного менеджера операцию "максимизировать", если таковая имеется, для окна, содержащего текущий контекст просмотра верхнего уровня. Обычно это увеличивает окно до максимально доступного размера без перехода в полноэкранный режим.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-maximize-window).

##### Использование

```js
browser.maximizeWindow()
```

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L208-L212
```

##### Возвращает

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** JSON-представление объекта "window rect" на основе нового состояния окна.


---

## minimizeWindow
Команда Minimize Window вызывает специфическую для оконного менеджера операцию "минимизировать", если таковая имеется, для окна, содержащего текущий контекст просмотра верхнего уровня. Обычно это скрывает окно в системном трее.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-minimize-window).

##### Использование

```js
browser.minimizeWindow()
```


##### Возвращает

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** JSON-представление объекта "window rect" (нового) текущего контекста просмотра верхнего уровня.


---

## fullscreenWindow
Команда Fullscreen Window вызывает специфическую для оконного менеджера операцию "полный экран", если таковая имеется, для окна, содержащего текущий контекст просмотра верхнего уровня. Обычно это увеличивает окно до размера физического дисплея и может скрывать элементы chrome браузера, такие как панели инструментов.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-fullscreen-window).

##### Использование

```js
browser.fullscreenWindow()
```


##### Возвращает

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** JSON-представление объекта "window rect" (нового) текущего контекста просмотра верхнего уровня.


---

## findElement
Команда Find Element используется для поиска элемента в текущем контексте просмотра, который может быть использован для будущих команд. Эта команда возвращает JSON-представление элемента, которое может быть передано команде $ для преобразования ссылки в расширенный элемент WebdriverIO.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-find-element).

:::info

Эта команда протокола встроена в следующий удобный метод: [$](/docs/api/browser/$). Рекомендуется использовать эту команду вместо протокольной.

:::


##### Использование

```js
browser.findElement(using, value)
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
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>действительная стратегия определения местоположения элемента</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>фактический селектор, который будет использоваться для поиска элемента</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L226-L232
```

##### Возвращает

- **&lt;object&gt;**
            **<code><var>element</var></code>:** JSON-представление объекта элемента, например `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElementFromShadowRoot
Команда Find Element From Shadow Root используется для поиска элемента в пределах shadow root элемента, который может быть использован для будущих команд. Эта команда возвращает JSON-представление элемента, которое может быть передано команде $ для преобразования ссылки в расширенный элемент WebdriverIO.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#find-element-from-shadow-root).

:::info

Эта команда протокола встроена в следующий удобный метод: [shadow$](/docs/api/element/shadow$). Рекомендуется использовать эту команду вместо протокольной.

:::


##### Использование

```js
browser.findElementFromShadowRoot(shadowId, using, value)
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
      <td><code><var>shadowId</var></code></td>
      <td>String</td>
      <td>идентификатор элемента shadow root</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>действительная стратегия определения местоположения элемента</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>фактический селектор, который будет использоваться для поиска элемента</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L236-L248
```

##### Возвращает

- **&lt;object&gt;**
            **<code><var>element</var></code>:** JSON-представление объекта shadow элемента, например `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElements
Команда Find Elements используется для поиска элементов в текущем контексте просмотра, которые могут быть использованы для будущих команд. Эта команда возвращает массив JSON-представлений элементов, которые могут быть переданы команде $ для преобразования ссылки в расширенный элемент WebdriverIO (См. findElement).<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-find-elements).

:::info

Эта команда протокола встроена в следующий удобный метод: [$$](/docs/api/browser/$$). Рекомендуется использовать эту команду вместо протокольной.

:::


##### Использование

```js
browser.findElements(using, value)
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
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>действительная стратегия определения местоположения элемента</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>фактический селектор, который будет использоваться для поиска элемента</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L252-L254
```

##### Возвращает

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** JSON-список (возможно пустой) представлений объекта элемента, например `[{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }]`.


---

## findElementsFromShadowRoot
Команда Find Elements используется для поиска элементов в пределах shadow root элемента, которые могут быть использованы для будущих команд. Эта команда возвращает массив JSON-представлений элементов, которые могут быть переданы команде $ для преобразования ссылки в расширенный элемент WebdriverIO (См. findElement).<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#find-elements-from-shadow-root).

:::info

Эта команда протокола встроена в следующий удобный метод: [shadow$$](/docs/api/element/shadow$$). Рекомендуется использовать эту команду вместо протокольной.

:::


##### Использование

```js
browser.findElementsFromShadowRoot(shadowId, using, value)
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
      <td><code><var>shadowId</var></code></td>
      <td>String</td>
      <td>идентификатор элемента shadow root</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>действительная стратегия определения местоположения элемента</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>фактический селектор, который будет использоваться для поиска элемента</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L258-L268
```

##### Возвращает

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** JSON-список (возможно пустой) представлений объекта элемента, например `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElementFromElement
Команда Find Element From Element используется для поиска элемента из веб-элемента в текущем контексте просмотра, который может быть использован для будущих команд. Эта команда возвращает JSON-представление элемента, которое может быть передано команде $ для преобразования ссылки в расширенный элемент WebdriverIO (См. findElement).<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-find-element-from-element).

:::info

Эта команда протокола встроена в следующий удобный метод: [$](/docs/api/element/$). Рекомендуется использовать эту команду вместо протокольной.

:::


##### Использование

```js
browser.findElementFromElement(elementId, using, value)
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
      <td>идентификатор элемента, возвращенный в предыдущем вызове Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>действительная стратегия определения местоположения элемента</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>фактический селектор, который будет использоваться для поиска элемента</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L272-L279
```

##### Возвращает

- **&lt;object&gt;**
            **<code><var>element</var></code>:** JSON-представление объекта элемента, например `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElementsFromElement
Команда Find Elements From Element используется для поиска элементов из веб-элемента в текущем контексте просмотра, которые могут быть использованы для будущих команд. Эта команда возвращает массив JSON-представлений элементов, которые могут быть переданы команде $ для преобразования ссылки в расширенный элемент WebdriverIO (См. findElement).<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-find-elements-from-element).

:::info

Эта команда протокола встроена в следующий удобный метод: [$$](/docs/api/element/$$). Рекомендуется использовать эту команду вместо протокольной.

:::


##### Использование

```js
browser.findElementsFromElement(elementId, using, value)
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
      <td>идентификатор элемента, возвращенный в предыдущем вызове Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>действительная стратегия определения местоположения элемента</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>фактический селектор, который будет использоваться для поиска элемента</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L283-L290
```

##### Возвращает

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** JSON-список (возможно пустой) представлений объекта элемента, например `[{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }]`.


---

## getElementShadowRoot
Получение объекта shadow root элемента. Результирующий объект может быть использован для извлечения элементов в этом shadow root с помощью, например, findElementFromShadowRoots или findElementsFromShadowRoots.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-get-active-element).

:::info

Эта команда протокола встроена в следующий удобный метод: [shadow$](/docs/api/element/shadow$). Рекомендуется использовать эту команду вместо протокольной.

:::


##### Использование

```js
browser.getElementShadowRoot(elementId)
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
      <td>идентификатор элемента, возвращенный в предыдущем вызове Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L294-L305
```

##### Возвращает

- **&lt;string&gt;**
            **<code><var>shadowRoot</var></code>:** JSON-представление shadow root элемента, например `{ 'shadow-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## getActiveElement
Get Active Element возвращает активный элемент элемента документа текущего контекста просмотра. Эта команда возвращает JSON-представление элемента, которое может быть передано команде $ для преобразования ссылки в расширенный элемент WebdriverIO (См. findElement).<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-get-active-element).

##### Использование

```js
browser.getActiveElement()
```

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L309-L316
```

##### Возвращает

- **&lt;string&gt;**
            **<code><var>element</var></code>:** JSON-представление объекта элемента, например `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## isElementSelected
Is Element Selected определяет, выбран ли указанный элемент или нет. Эта операция имеет смысл только для элементов ввода состояний Checkbox и Radio Button или элементов option.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-is-element-selected).

:::info

Эта команда протокола встроена в следующий удобный метод: [isSelected](/docs/api/element/isSelected). Рекомендуется использовать эту команду вместо протокольной.

:::


##### Использование

```js
browser.isElementSelected(elementId)
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
      <td>идентификатор элемента, возвращенный в предыдущем вызове Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L322-L325
```

##### Возвращает

- **&lt;Boolean&gt;**
            **<code><var>isSelected</var></code>:** `true` или `false` в зависимости от состояния выбора.


---

## isElementDisplayed
Is Element Displayed определяет видимость элемента, что определяется тем, что визуально видно человеческому глазу. В этом контексте отображение элемента не связано со свойствами стиля `visibility` или `display`.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#element-displayedness).

:::info

Эта команда протокола встроена в следующий удобный метод: [isDisplayed](/docs/api/element/isDisplayed). Рекомендуется использовать эту команду вместо протокольной.

:::


##### Использование

```js
browser.isElementDisplayed(elementId)
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
      <td>идентификатор элемента, возвращенный в предыдущем вызове Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L331-L333
```

##### Возвращает

- **&lt;Boolean&gt;**
            **<code><var>isDisplayed</var></code>:** `true` или `false` в зависимости от видимого состояния.


---

## getElementAttribute
Команда Get Element Attribute возвращает атрибут веб-элемента.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-get-element-attribute).

:::info

Эта команда протокола встроена в следующий удобный метод: [getAttribute](/docs/api/element/getAttribute). Рекомендуется использовать эту команду вместо протокольной.

:::


##### Использование

```js
browser.getElementAttribute(elementId, name)
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
      <td>идентификатор элемента, возвращенный в предыдущем вызове Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>имя атрибута для получения</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L339-L341
```

##### Возвращает

- **&lt;string&gt;**
            **<code><var>attribute</var></code>:** Именованный атрибут элемента.


---

## getElementProperty
Команда Get Element Property возвращает результат получения свойства элемента.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-get-element-property).

:::info

Эта команда протокола встроена в следующий удобный метод: [getProperty](/docs/api/element/getProperty). Рекомендуется использовать эту команду вместо протокольной.

:::


##### Использование

```js
browser.getElementProperty(elementId, name)
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
      <td>идентификатор элемента, возвращенный в предыдущем вызове Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>имя свойства атрибута для получения</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L347-L349
```

##### Возвращает

- **&lt;string&gt;**
            **<code><var>property</var></code>:** Именованное свойство элемента, доступ к которому осуществляется путем вызова GetOwnProperty на объекте элемента.


---

## getElementCSSValue
Команда Get Element CSS Value получает вычисленное значение заданного CSS-свойства данного веб-элемента.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-get-element-css-value).

:::info

Эта команда протокола встроена в следующий удобный метод: [getCSSProperty](/docs/api/element/getCSSProperty). Рекомендуется использовать эту команду вместо протокольной.

:::


##### Использование

```js
browser.getElementCSSValue(elementId, propertyName)
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
      <td>идентификатор элемента, возвращенный в предыдущем вызове Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>propertyName</var></code></td>
      <td>String</td>
      <td>имя CSS-свойства для получения</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L355-L357
```

##### Возвращает

- **&lt;string&gt;**
            **<code><var>cssValue</var></code>:** Вычисленное значение параметра, соответствующего имени свойства из объявлений стиля элемента (если только тип документа не xml, в этом случае возвращаемое значение просто пустая строка).


---

## getElementText
Команда Get Element Text предназначена для возврата текста элемента "как отображается". Отображаемый текст элемента также используется для поиска элементов по тексту ссылки и частичному тексту ссылки.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-get-element-text).

##### Использование

```js
browser.getElementText(elementId)
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
      <td>идентификатор элемента, возвращенный в предыдущем вызове Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L363-L365
```

##### Возвращает

- **&lt;string&gt;**
            **<code><var>text</var></code>:** Видимый текст элемента (включая дочерние элементы), следуя алгоритму, определенному в Selenium Atoms для [`bot.dom.getVisibleText`](https://github.com/SeleniumHQ/selenium/blob/e09e28f016c9f53196cf68d6f71991c5af4a35d4/javascript/atoms/dom.js#L981).


---

## getElementTagName
Команда Get Element Tag Name возвращает квалифицированное имя элемента для данного веб-элемента.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-get-element-tag-name).

:::info

Эта команда протокола встроена в следующий удобный метод: [getTagName](/docs/api/element/getTagName). Рекомендуется использовать эту команду вместо протокольной.

:::


##### Использование

```js
browser.getElementTagName(elementId)
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
      <td>идентификатор элемента, возвращенный в предыдущем вызове Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L371-L373
```

##### Возвращает

- **&lt;string&gt;**
            **<code><var>text</var></code>:** Атрибут tagName элемента.


---

## getElementRect
Команда Get Element Rect возвращает размеры и координаты данного веб-элемента.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-get-element-rect).

:::info

Эта команда протокола встроена в следующие удобные методы: [getSize](/docs/api/element/getSize), [getLocation](/docs/api/element/getLocation). Рекомендуется использовать эти команды вместо протокольной.

:::


##### Использование

```js
browser.getElementRect(elementId)
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
      <td>идентификатор элемента, возвращенный в предыдущем вызове Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L379-L381
```

##### Возвращает

- **&lt;Object&gt;**
            **<code><var>elementRect</var></code>:** JSON-объект, представляющий положение и ограничивающий прямоугольник элемента.


---

## isElementEnabled
Is Element Enabled определяет, включен ли указанный элемент или нет. Эта операция имеет смысл только для элементов формы.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-is-element-enabled).

:::info

Эта команда протокола встроена в следующий удобный метод: [isEnabled](/docs/api/element/isEnabled). Рекомендуется использовать эту команду вместо протокольной.

:::


##### Использование

```js
browser.isElementEnabled(elementId)
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
      <td>идентификатор элемента, возвращенный в предыдущем вызове Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L387-L390
```

##### Возвращает

- **&lt;Boolean&gt;**
            **<code><var>isEnabled</var></code>:** Если элемент находится в xml документе или является отключенным элементом управления формы: `false`, в противном случае, `true`.


---

## elementClick
Команда Element Click прокручивает элемент в видимую область, если он еще не доступен для взаимодействия с указателем, и щелкает его видимую центральную точку. Если центральная точка элемента закрыта другим элементом, возвращается ошибка перехвата щелчка элемента. Если элемент находится вне области просмотра, возвращается ошибка элемента, не доступного для взаимодействия.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-element-click).

:::info

Эта команда протокола встроена в следующий удобный метод: [click](/docs/api/element/click). Рекомендуется использовать эту команду вместо протокольной.

:::


##### Использование

```js
browser.elementClick(elementId)
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
      <td>идентификатор элемента, возвращенный в предыдущем вызове Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L396-L398
```




---

## elementClear
Команда Element Clear прокручивает в область видимости редактируемый или сбрасываемый элемент, а затем пытается очистить его выбранные файлы или текстовое содержимое.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-element-clear).

:::info

Эта команда протокола встроена в следующий удобный метод: [clearValue](/docs/api/element/clearValue). Рекомендуется использовать эту команду вместо протокольной.

:::


##### Использование

```js
browser.elementClear(elementId)
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
      <td>идентификатор элемента, возвращенный в предыдущем вызове Find Element(s)</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L404-L407
```




---

## elementSendKeys
Команда Element Send Keys прокручивает в область видимости элемент управления формой, а затем отправляет предоставленные ключи элементу. В случае, если элемент не доступен для взаимодействия с клавиатурой, возвращается ошибка элемента, не доступного для взаимодействия.<br /><br />Состояние ввода ключа, используемое для ввода, может быть очищено в середине "набора текста" путем отправки нулевого ключа, который является U+E000 (NULL).<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-element-send-keys).

:::info

Эта команда протокола встроена в следующие удобные методы: [addValue](/docs/api/element/addValue), [setValue](/docs/api/element/setValue). Рекомендуется использовать эти команды вместо протокольной.

:::


##### Использование

```js
browser.elementSendKeys(elementId, text)
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
      <td>идентификатор элемента, возвращенный в предыдущем вызове Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>строка для отправки в качестве нажатий клавиш элементу</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L413-L416
```




---

## getPageSource
Команда Get Page Source возвращает строковую сериализацию DOM активного документа текущего контекста просмотра.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-get-page-source).

##### Использование

```js
browser.getPageSource()
```

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L420-L421
```

##### Возвращает

- **&lt;string&gt;**
            **<code><var>pageSource</var></code>:** DOM активного документа текущего контекста просмотра


---

## executeScript
Команда Execute Script выполняет функцию JavaScript в контексте текущего контекста просмотра и возвращает возвращаемое значение функции.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-execute-script).

:::info

Эта команда протокола встроена в следующий удобный метод: [execute](/docs/api/browser/execute). Рекомендуется использовать эту команду вместо протокольной.

:::


##### Использование

```js
browser.executeScript(script, args)
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
      <td>строка, тело функции Javascript, которую вы хотите выполнить</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>string, object, number, boolean, null, undefined[]</td>
      <td>массив значений JSON, которые будут десериализованы и переданы в качестве аргументов вашей функции</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L425-L426
```

##### Возвращает

- **&lt;*&gt;**
            **<code><var>result</var></code>:** Либо возвращаемое значение вашего скрипта, либо выполнение Promise, возвращенного вашим скриптом, либо ошибка, которая была причиной отклонения Promise, возвращенного вашим скриптом.


---

## executeAsyncScript
Команда Execute Async Script заставляет JavaScript выполняться как анонимная функция. В отличие от команды Execute Script, результат функции игнорируется. Вместо этого в качестве последнего аргумента функции предоставляется дополнительный аргумент. Это функция, которая при вызове возвращает свой первый аргумент в качестве ответа.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-execute-async-script).

:::info

Эта команда протокола встроена в следующий удобный метод: [executeAsync](/docs/api/browser/executeAsync). Рекомендуется использовать эту команду вместо протокольной.

:::


##### Использование

```js
browser.executeAsyncScript(script, args)
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
      <td>строка, тело функции Javascript, которую вы хотите выполнить</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>string, object, number, boolean, null, undefined[]</td>
      <td>массив значений JSON, которые будут десериализованы и переданы в качестве аргументов вашей функции</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L430-L434
```

##### Возвращает

- **&lt;*&gt;**
            **<code><var>result</var></code>:** Либо возвращаемое значение вашего скрипта, либо выполнение Promise, возвращенного вашим скриптом, либо ошибка, которая была причиной отклонения Promise, возвращенного вашим скриптом.


---

## getAllCookies
Команда Get All Cookies возвращает все куки, связанные с адресом активного документа текущего контекста просмотра.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-get-all-cookies).

##### Использование

```js
browser.getAllCookies()
```

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L438-L455
```

##### Возвращает

- **&lt;Object[]&gt;**
            **<code><var>cookies</var></code>:** Список сериализованных куков. Каждый сериализованный кук имеет ряд необязательных полей, которые могут быть или не быть возвращены в дополнение к `name` и `value`.


---

## addCookie
Команда Add Cookie добавляет один кук в хранилище куков, связанное с адресом активного документа.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-adding-a-cookie).

##### Использование

```js
browser.addCookie(cookie)
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
      <td><code><var>cookie</var></code></td>
      <td>object</td>
      <td>JSON-объект, представляющий кук. Он должен иметь как минимум поля name и value и может иметь больше, включая время истечения срока действия и так далее</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L459-L477
```




---

## deleteAllCookies
Команда Delete All Cookies позволяет удалить все куки, связанные с адресом активного документа.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-delete-all-cookies).

##### Использование

```js
browser.deleteAllCookies()
```

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L481-L485
```




---

## getNamedCookie
Команда Get Named Cookie возвращает кук с запрошенным именем из связанных куков в хранилище куков активного документа текущего контекста просмотра. Если кук не найден, возвращается ошибка "такого кука нет".<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-get-named-cookie).

##### Использование

```js
browser.getNamedCookie(name)
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
      <td>String</td>
      <td>имя кука для получения</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L489-L503
```

##### Возвращает

- **&lt;Object&gt;**
            **<code><var>cookie</var></code>:** Сериализованный кук с полями name и value. Есть ряд необязательных полей, таких как `path`, `domain` и `expiry-time`, которые также могут присутствовать.


---

## deleteCookie
Команда Delete Cookie позволяет удалить либо один кук по имени параметра, либо все куки, связанные с адресом активного документа, если имя не определено.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-delete-cookie).

##### Использование

```js
browser.deleteCookie(name)
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
      <td>String</td>
      <td>имя кука для удаления</td>
    </tr>
  </tbody>
</table>

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L507-L512
```




---

## performActions
Команда Perform Actions используется для выполнения сложных действий пользователя. См. [спецификацию](https://github.com/jlipps/simple-wd-spec#perform-actions) для получения дополнительной информации.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-perform-actions).

##### Использование

```js
browser.performActions(actions)
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
      <td>список объектов, каждый из которых представляет источник ввода и связанные с ним действия</td>
    </tr>
  </tbody>
</table>



---

## releaseActions
Команда Release Actions используется для освобождения всех клавиш и кнопок указателя, которые в настоящее время нажаты. Это вызывает события, как если бы состояние было освобождено явной серией действий. Она также очищает все внутреннее состояние виртуальных устройств.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-release-actions).

##### Использование

```js
browser.releaseActions()
```



---

## dismissAlert
Команда Dismiss Alert закрывает простой диалог, если он присутствует, иначе выдает ошибку. Запрос на закрытие предупреждения пользователя, у которого может не быть кнопки закрытия, имеет тот же эффект, что и его принятие.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-dismiss-alert).

##### Использование

```js
browser.dismissAlert()
```

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L516-L517
```




---

## acceptAlert
Команда Accept Alert принимает простой диалог, если он присутствует, иначе выдает ошибку.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-accept-alert).

##### Использование

```js
browser.acceptAlert()
```



---

## getAlertText
Команда Get Alert Text возвращает сообщение текущего запроса пользователя. Если нет текущего запроса пользователя, она возвращает ошибку.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-get-alert-text).

##### Использование

```js
browser.getAlertText()
```

##### Пример

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L521-L522
```

##### Возвращает

- **&lt;string&gt;**
            **<code><var>alertText</var></code>:** Сообщение запроса пользователя.


---

## sendAlertText
Команда Send Alert Text устанавливает текстовое поле запроса пользователя window.prompt на заданное значение.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-send-alert-text).

##### Использование

```js
browser.sendAlertText(text)
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
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>строка для установки в запрос</td>
    </tr>
  </tbody>
</table>



---

## takeScreenshot
Команда Take Screenshot делает снимок области просмотра контекста просмотра верхнего уровня.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-take-screenshot).

##### Использование

```js
browser.takeScreenshot()
```


##### Возвращает

- **&lt;string&gt;**
            **<code><var>screenshot</var></code>:** Данные изображения PNG в кодировке base64, составляющие снимок экрана исходной области просмотра.


---

## takeElementScreenshot
Команда Take Element Screenshot делает снимок видимой области, охватываемой ограничивающим прямоугольником элемента.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#dfn-take-element-screenshot).

##### Использование

```js
browser.takeElementScreenshot(elementId, scroll)
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
      <td>идентификатор элемента, возвращенный в предыдущем вызове Find Element(s)</td>
    </tr>
    <tr>
      <td><code><var>scroll</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>прокручивать до элемента. По умолчанию: true</td>
    </tr>
  </tbody>
</table>


##### Возвращает

- **&lt;string&gt;**
            **<code><var>screenshot</var></code>:** Данные изображения PNG в кодировке base64, составляющие снимок экрана видимой области ограничивающего прямоугольника элемента после его прокрутки в область просмотра.


---

## getElementComputedRole
Получение вычисленной роли WAI-ARIA элемента.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#get-computed-role).

##### Использование

```js
browser.getElementComputedRole(elementId)
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
      <td>идентификатор элемента, возвращенный в предыдущем вызове Find Element(s)</td>
    </tr>
  </tbody>
</table>


##### Возвращает

- **&lt;string&gt;**
            **<code><var>role</var></code>:** Результат вычисления роли WAI-ARIA элемента.


---

## getElementComputedLabel
Получение доступного имени элемента.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/webdriver/#get-computed-label).

##### Использование

```js
browser.getElementComputedLabel(elementId)
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
      <td>идентификатор элемента, возвращенный в предыдущем вызове Find Element(s)</td>
    </tr>
  </tbody>
</table>


##### Возвращает

- **&lt;string&gt;**
            **<code><var>label</var></code>:** Результат вычисления Доступного Имени и Описания для Доступного Имени элемента.


---

## setPermissions
Имитирует изменение пользователем состояния разрешения PermissionDescriptor. __Примечание:__ эта функция еще не реализована во всех браузерах.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/permissions/#set-permission-command).

##### Использование

```js
browser.setPermissions(descriptor, state, oneRealm)
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
      <td><code><var>descriptor</var></code></td>
      <td>object</td>
      <td>Каждая мощная функция имеет один или несколько аспектов, доступ к которым веб-сайты могут запросить разрешение. Для описания этих аспектов каждая функция определяет подтип PermissionDescriptor как свой тип дескриптора разрешения. __Примечание:__ эта функция еще не реализована во всех браузерах.</td>
    </tr>
    <tr>
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>Определяет, предоставлено ли разрешение, отклонено или запрашивается.</td>
    </tr>
    <tr>
      <td><code><var>oneRealm</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>Применять ли разрешения ко всем контекстам выполнения.</td>
    </tr>
  </tbody>
</table>

##### Примеры


```js
// установка разрешений midi
browser.setPermissions(
  { name: 'midi', sysex: true },
  'granted' // может быть также "denied" или "prompt"
);
```


```js
// установка разрешений буфера обмена
browser.setPermissions({ name: 'clipboard-read' }, 'granted');
// теперь вы можете читать буфер обмена, например
const clipboardText = await browser.execute(() => navigator.clipboard.readText());
```



---

## generateTestReport
Генерирует отчет для тестирования. Расширение для [Reporting API](https://developers.google.com/web/updates/2018/09/reportingapi). __Примечание:__ эта функция еще не реализована во всех браузерах.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/reporting/#automation).

##### Использование

```js
browser.generateTestReport(message, group)
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
      <td><code><var>message</var></code></td>
      <td>string</td>
      <td>Сообщение для отображения в отчете.</td>
    </tr>
    <tr>
      <td><code><var>group</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Определяет группу конечных точек для доставки отчета.</td>
    </tr>
  </tbody>
</table>



---

## createMockSensor
Создает имитационный датчик для эмуляции датчиков, таких как датчик окружающего света. __Примечание:__ эта функция еще не реализована во всех браузерах.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/sensors/#create-mock-sensor-command).

##### Использование

```js
browser.createMockSensor(mockSensorType, maxSamplingFrequency, minSamplingFrequency)
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
      <td><code><var>mockSensorType</var></code></td>
      <td>string</td>
      <td>Тип API датчика для имитации, например 'ambient-light'</td>
    </tr>
    <tr>
      <td><code><var>maxSamplingFrequency</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>Двойное число, представляющее частоту в Гц, которое используется для установки максимальной поддерживаемой частоты дискретизации для связанного имитационного датчика.</td>
    </tr>
    <tr>
      <td><code><var>minSamplingFrequency</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>Двойное число, представляющее частоту в Гц, которое используется для установки минимальной поддерживаемой частоты дискретизации для связанного имитационного датчика.</td>
    </tr>
  </tbody>
</table>



---

## getMockSensor
Получает информацию о данном типе имитационного датчика. __Примечание:__ эта функция еще не реализована во всех браузерах.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/sensors/#get-mock-sensor-command).

##### Использование

```js
browser.getMockSensor(type)
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
      <td>String</td>
      <td>Тип имитационного датчика для получения информации.</td>
    </tr>
  </tbody>
</table>


##### Возвращает

- **&lt;object&gt;**
            **<code><var>sensorReading</var></code>:** Значения показаний имитационного датчика.


---

## updateMockSensor
Обновляет тип имитационного датчика. __Примечание:__ эта функция еще не реализована во всех браузерах.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/sensors/#update-mock-sensor-reading-command).

##### Использование

```js
browser.updateMockSensor(type, mockSensorType, maxSamplingFrequency, minSamplingFrequency)
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
      <td>String</td>
      <td>Тип имитационного датчика для обновления информации.</td>
    </tr>
    <tr>
      <td><code><var>mockSensorType</var></code></td>
      <td>string</td>
      <td>Тип API датчика для имитации, например 'ambient-light'</td>
    </tr>
    <tr>
      <td><code><var>maxSamplingFrequency</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>Двойное число, представляющее частоту в Гц, которое используется для установки максимальной поддерживаемой частоты дискретизации для связанного имитационного датчика.</td>
    </tr>
    <tr>
      <td><code><var>minSamplingFrequency</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>number</td>
      <td>Двойное число, представляющее частоту в Гц, которое используется для установки минимальной поддерживаемой частоты дискретизации для связанного имитационного датчика.</td>
    </tr>
  </tbody>
</table>



---

## deleteMockSensor
Команда Delete Session закрывает любые контексты просмотра верхнего уровня, связанные с текущей сессией, завершает соединение и, наконец, закрывает текущую сессию. __Примечание:__ эта функция еще не реализована во всех браузерах.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/sensors/#delete-mock-sensor-command).

##### Использование

```js
browser.deleteMockSensor(type)
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
      <td>String</td>
      <td>Тип имитационного датчика для удаления.</td>
    </tr>
  </tbody>
</table>



---

## setTimeZone
Имитирует изменение часового пояса для целей тестирования. __Примечание:__ эта функция еще не реализована во всех браузерах.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://w3c.github.io/sensors/#create-mock-sensor-command).

##### Использование

```js
browser.setTimeZone(time_zone)
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
      <td><code><var>time_zone</var></code></td>
      <td>string</td>
      <td>Название часового пояса, например Asia/Tokyo</td>
    </tr>
  </tbody>
</table>



---

## addVirtualAuthenticator
Создает программный [Виртуальный Аутентификатор](https://www.w3.org/TR/webauthn-2/#virtual-authenticators).<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://www.w3.org/TR/webauthn-2/#sctn-automation-add-virtual-authenticator).

##### Использование

```js
browser.addVirtualAuthenticator(protocol, transport, hasResidentKey, hasUserVerification, isUserConsenting, isUserVerified, extensions, uvm)
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
      <td><code><var>protocol</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Допустимые значения: 'ctap1/u2f', 'ctap2', 'ctap2_1'.</td>
    </tr>
    <tr>
      <td><code><var>transport</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Допустимые значения: 'usb', 'nfc', 'ble' или 'internal'.</td>
    </tr>
    <tr>
      <td><code><var>hasResidentKey</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>Допустимые значения: true, false.</td>
    </tr>
    <tr>
      <td><code><var>hasUserVerification</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>Допустимые значения: true, false.</td>
    </tr>
    <tr>
      <td><code><var>isUserConsenting</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>Допустимые значения: true, false.</td>
    </tr>
    <tr>
      <td><code><var>isUserVerified</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>boolean</td>
      <td>Допустимые значения: Массив, содержащий идентификаторы расширений.</td>
    </tr>
    <tr>
      <td><code><var>extensions</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string[]</td>
      <td>Допустимые значения: До 3 записей Метода Проверки Пользователя.</td>
    </tr>
    <tr>
      <td><code><var>uvm</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>object[]</td>
      <td></td>
    </tr>
  </tbody>
</table>


##### Возвращает

- **&lt;string&gt;**
            **<code><var>authenticatorId</var></code>:** Возвращает строковый идентификатор аутентификатора.


---

## removeVirtualAuthenticator
Удаляет ранее созданный Виртуальный Аутентификатор.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-virtual-authenticator).

##### Использование

```js
browser.removeVirtualAuthenticator(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>идентификатор аутентификатора</td>
    </tr>
  </tbody>
</table>



---

## addCredential
Внедряет Источник Учетных Данных Открытого Ключа в существующий Виртуальный Аутентификатор.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://www.w3.org/TR/webauthn-2/#sctn-automation-add-credential).

##### Использование

```js
browser.addCredential(authenticatorId, credentialId, isResidentCredential, rpId, privateKey, userHandle, signCount, largeBlob)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>ID аутентификатора</td>
    </tr>
    <tr>
      <td><code><var>credentialId</var></code></td>
      <td>string</td>
      <td>ID учетных данных, закодированный с использованием Base64url Encoding.</td>
    </tr>
    <tr>
      <td><code><var>isResidentCredential</var></code></td>
      <td>boolean</td>
      <td>Если установлено в true, создаются учетные данные, обнаруживаемые на стороне клиента. Если установлено в false, вместо этого создаются учетные данные на стороне сервера.</td>
    </tr>
    <tr>
      <td><code><var>rpId</var></code></td>
      <td>string</td>
      <td>ID доверяющей стороны, к которому привязаны учетные данные.</td>
    </tr>
    <tr>
      <td><code><var>privateKey</var></code></td>
      <td>string</td>
      <td>Пакет асимметричного ключа, содержащий один приватный ключ согласно [RFC5958], закодированный с использованием Base64url Encoding.</td>
    </tr>
    <tr>
      <td><code><var>userHandle</var></code></td>
      <td>string</td>
      <td>userHandle, связанный с учетными данными, закодированный с использованием Base64url Encoding. Это свойство может быть не определено.</td>
    </tr>
    <tr>
      <td><code><var>signCount</var></code></td>
      <td>number</td>
      <td>Начальное значение счетчика подписи, связанного с источником учетных данных открытого ключа.</td>
    </tr>
    <tr>
      <td><code><var>largeBlob</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>string</td>
      <td>Большой blob, связанный с источником учетных данных открытого ключа, закодированный с использованием Base64url Encoding. Это свойство может быть не определено.</td>
    </tr>
  </tbody>
</table>



---

## getCredentials
Возвращает один объект Параметров Учетных Данных для каждого Источника Учетных Данных Открытого Ключа, хранящегося в Виртуальном Аутентификаторе, независимо от того, хранились ли они с помощью Add Credential или `navigator.credentials.create()`.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://www.w3.org/TR/webauthn-2/#sctn-automation-get-credentials).

##### Использование

```js
browser.getCredentials(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>идентификатор аутентификатора</td>
    </tr>
  </tbody>
</table>


##### Возвращает

- **&lt;object[]&gt;**
            **<code><var>credentials</var></code>:** Возвращает массив учетных данных.


---

## removeAllCredentials
Удаляет все Источники Учетных Данных Открытого Ключа, хранящиеся в Виртуальном Аутентификаторе.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-all-credentials).

##### Использование

```js
browser.removeAllCredentials(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>идентификатор аутентификатора</td>
    </tr>
  </tbody>
</table>



---

## removeCredential
Удаляет Источник Учетных Данных Открытого Ключа, хранящийся в Виртуальном Аутентификаторе.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-credential).

##### Использование

```js
browser.removeCredential(authenticatorId, credentialId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>идентификатор аутентификатора</td>
    </tr>
    <tr>
      <td><code><var>credentialId</var></code></td>
      <td>String</td>
      <td>идентификатор учетных данных</td>
    </tr>
  </tbody>
</table>



---

## setUserVerified
Команда расширения Set User Verified устанавливает свойство isUserVerified на Виртуальном Аутентификаторе.<br /><br />Команда протокола WebDriver. Более подробную информацию можно найти в [официальной документации протокола](https://www.w3.org/TR/webauthn-2/#sctn-automation-set-user-verified).

##### Использование

```js
browser.setUserVerified(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>идентификатор аутентификатора</td>
    </tr>
  </tbody>
</table>


