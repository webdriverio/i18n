---
id: webdriver
title: Протокол WebDriver
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-protocols/src/protocols/webdriver.ts
---

## newSession
Команда New Session створює нову сесію WebDriver з кінцевою точкою вузла. Якщо створення не вдалося, повертається помилка про те, що сесія не створена.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-new-sessions).

##### Використання

```js
browser.newSession(capabilities)
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
      <td><code><var>capabilities</var></code></td>
      <td>object</td>
      <td>JSON-об'єкт, набір можливостей, які були об'єднані та співставлені в алгоритмі обробки можливостей</td>
    </tr>
  </tbody>
</table>


##### Повертає

- **&lt;Object&gt;**
            **<code><var>session</var></code>:** Об'єкт, що містить sessionId та можливості створеної сесії WebDriver.


---

## deleteSession
Команда Delete Session закриває будь-які контексти верхнього рівня, пов'язані з поточною сесією, завершує з'єднання і, нарешті, закриває поточну сесію.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-delete-session).

##### Використання

```js
browser.deleteSession(deleteSessionOpts)
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
      <td><code><var>deleteSessionOpts</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>object</td>
      <td>Об'єкт, що містить параметри для команди deleteSession, наприклад `{ shutdownDriver: boolean }`</td>
    </tr>
  </tbody>
</table>



---

## status
Команда Status повертає інформацію про те, чи знаходиться віддалений кінець у стані, в якому він може створювати нові сесії, і додатково може включати довільну метаінформацію, специфічну для реалізації.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-status).

##### Використання

```js
browser.status()
```

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L5-L16
```

##### Повертає

- **&lt;Object&gt;**
            **<code><var>status</var></code>:** Об'єкт, що містить статус драйвера.


---

## getTimeouts
Команда Get Timeouts отримує тривалість таймаутів, пов'язаних з поточною сесією.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-get-timeouts).

##### Використання

```js
browser.getTimeouts()
```

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L20-L24
```

##### Повертає

- **&lt;Object&gt;**
            **<code><var>timeouts</var></code>:** Об'єкт, що містить тривалість таймаутів для `script`, `pageLoad` та `implicit`.


---

## setTimeouts
Команда Set Timeouts встановлює тривалість таймаутів, пов'язаних з поточною сесією. Таймаути, якими можна керувати, перелічені в таблиці таймаутів сесії нижче.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-set-timeouts).

##### Використання

```js
browser.setTimeouts(implicit, pageLoad, script)
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
      <td><code><var>implicit</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>number</td>
      <td>ціле число в мс для неявного очікування сесії</td>
    </tr>
    <tr>
      <td><code><var>pageLoad</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>number</td>
      <td>ціле число в мс для таймауту завантаження сторінки сесії</td>
    </tr>
    <tr>
      <td><code><var>script</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>number</td>
      <td>ціле число в мс для таймауту скрипта сесії</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L28-L33
```




---

## getUrl
Команда Get Current URL повертає URL поточного контексту перегляду верхнього рівня.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-get-current-url).

##### Використання

```js
browser.getUrl()
```

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L39-L43
```

##### Повертає

- **&lt;string&gt;**
            **<code><var>url</var></code>:** URL документа активного документа поточного контексту перегляду верхнього рівня


---

## navigateTo
Команда navigateTo (go) використовується для того, щоб примусити агент користувача перейти в поточному контексті перегляду верхнього рівня на нове місце.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-navigate-to).

:::info

Ця команда протоколу вбудована в наступний зручний метод: [url](/docs/api/browser/url). Рекомендується використовувати цю команду замість протоколу.

:::


##### Використання

```js
browser.navigateTo(url)
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
      <td><code><var>url</var></code></td>
      <td>string</td>
      <td>рядок, що представляє абсолютний URL (починається з http(s)), можливо, включаючи фрагмент (#...), також може бути локальна схема (about: тощо)</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L47-L51
```




---

## back
Команда Back змушує браузер пройти один крок назад у об'єднаній історії сесії поточного контексту перегляду верхнього рівня. Це еквівалентно натисканню кнопки "назад" в інтерфейсі браузера або виклику `window.history.back`.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-back).

##### Використання

```js
browser.back()
```

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L55-L59
```




---

## forward
Команда Forward змушує браузер пройти один крок вперед у об'єднаній історії сесії поточного контексту перегляду верхнього рівня.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-forward).

##### Використання

```js
browser.forward()
```

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L63-L69
```




---

## refresh
Команда Refresh змушує браузер перезавантажити сторінку в поточному контексті перегляду верхнього рівня.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-refresh).

##### Використання

```js
browser.refresh()
```

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L73-L78
```




---

## getTitle
Команда Get Title повертає заголовок документа поточного контексту перегляду верхнього рівня, еквівалентно виклику `document.title`.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-get-title).

##### Використання

```js
browser.getTitle()
```

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L82-L86
```

##### Повертає

- **&lt;string&gt;**
            **<code><var>title</var></code>:** Повертає рядок, ідентичний `document.title` поточного контексту перегляду верхнього рівня.


---

## getWindowHandle
Команда Get Window Handle повертає ідентифікатор вікна для поточного контексту перегляду верхнього рівня. Його можна використовувати як аргумент для Switch To Window.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-get-window-handle).

##### Використання

```js
browser.getWindowHandle()
```

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L90-L93
```

##### Повертає

- **&lt;string&gt;**
            **<code><var>handle</var></code>:** Повертає рядок, який є ідентифікатором вікна для поточного контексту перегляду верхнього рівня.


---

## closeWindow
Команда Close Window закриває поточний контекст перегляду верхнього рівня. Після завершення, якщо більше немає відкритих контекстів перегляду верхнього рівня, сама сесія WebDriver закривається.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-close-window).

##### Використання

```js
browser.closeWindow()
```

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L97-L117
```




---

## switchToWindow
Команда Switch To Window використовується для вибору поточного контексту перегляду верхнього рівня для поточної сесії, тобто того, який буде використовуватися для обробки команд.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-switch-to-window).

:::info

Ця команда протоколу вбудована в наступний зручний метод: [switchWindow](/docs/api/browser/switchWindow). Рекомендується використовувати цю команду замість протоколу.

:::


##### Використання

```js
browser.switchToWindow(handle)
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
      <td><code><var>handle</var></code></td>
      <td>string</td>
      <td>рядок, що представляє ідентифікатор вікна, повинен бути одним із рядків, що були повернуті при виклику getWindowHandles</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L121-L130
```




---

## createWindow
Створює новий контекст перегляду верхнього рівня.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#new-window).

##### Використання

```js
browser.createWindow(type)
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
      <td>Встановіть значення 'tab', якщо новостворене вікно ділить вікно на рівні ОС з поточним контекстом перегляду, або 'window' в іншому випадку.</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L134-L136
```

##### Повертає

- **&lt;Object&gt;**
            **<code><var>window</var></code>:** Об'єкт нового вікна, що містить 'handle' зі значенням ідентифікатора та 'type' зі значенням типу створеного вікна


---

## getWindowHandles
Команда Get Window Handles повертає список ідентифікаторів вікон для кожного відкритого контексту перегляду верхнього рівня. Порядок, в якому повертаються ідентифікатори вікон, є довільним.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-get-window-handles).

##### Використання

```js
browser.getWindowHandles()
```

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L140-L143
```

##### Повертає

- **&lt;String[]&gt;**
            **<code><var>handles</var></code>:** Масив, який є списком ідентифікаторів вікон.


---

## printPage
Команда Print Page рендерить документ у пагінований PDF-документ. __Примітка:__ Chrome наразі підтримує це лише в [режимі headless](https://webdriver.io/docs/capabilities/#run-browser-headless), див. [`crbug753118`](https://bugs.chromium.org/p/chromium/issues/detail?id=753118)).<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#print-page).

##### Використання

```js
browser.printPage(orientation, scale, background, width, height, top, bottom, left, right, shrinkToFit, pageRanges)
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
      <td><code><var>orientation</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>string</td>
      <td>орієнтація сторінки. За замовчуванням: `portrait`</td>
    </tr>
    <tr>
      <td><code><var>scale</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>number</td>
      <td>масштаб сторінки. За замовчуванням: `1`</td>
    </tr>
    <tr>
      <td><code><var>background</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>boolean</td>
      <td>фон сторінки. За замовчуванням: `false`</td>
    </tr>
    <tr>
      <td><code><var>width</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>number</td>
      <td>ширина сторінки в см. За замовчуванням: `21.59` для сторінки</td>
    </tr>
    <tr>
      <td><code><var>height</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>number</td>
      <td>висота сторінки в см. За замовчуванням: `27.94` для сторінки</td>
    </tr>
    <tr>
      <td><code><var>top</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>number</td>
      <td>поля сторінки в см від верхнього краю. За замовчуванням: `1`</td>
    </tr>
    <tr>
      <td><code><var>bottom</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>number</td>
      <td>поля сторінки в см від нижнього краю. За замовчуванням: `1`</td>
    </tr>
    <tr>
      <td><code><var>left</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>number</td>
      <td>поля сторінки в см від лівого краю. За замовчуванням: `1`</td>
    </tr>
    <tr>
      <td><code><var>right</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>number</td>
      <td>поля сторінки в см від правого краю. За замовчуванням: `1`</td>
    </tr>
    <tr>
      <td><code><var>shrinkToFit</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>boolean</td>
      <td>зменшення pdf для підгонки до сторінки. За замовчуванням: `true`</td>
    </tr>
    <tr>
      <td><code><var>pageRanges</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>object[]</td>
      <td>діапазони сторінок. За замовчуванням `[]`</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L150-L151
```

##### Повертає

- **&lt;string&gt;**
            **<code><var>pdf</var></code>:** PDF-представлення пагінованого документа, закодоване в base64.


---

## switchToFrame
Команда Switch To Frame використовується для вибору поточного контексту перегляду верхнього рівня або дочірнього контексту перегляду поточного контексту як поточного контексту перегляду для наступних команд.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-switch-to-frame).
:::caution

Ця команда протоколу застаріла<br />Ця команда застаріла, і ми рекомендуємо усім використовувати `switchFrame` для перемикання у фрейми. Дізнайтеся більше про цю команду на https://webdriver.io/docs/api/browser/switchFrame.
:::

##### Використання

```js
browser.switchToFrame(id)
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
      <td><code><var>id</var></code></td>
      <td>number, object, null</td>
      <td>один з трьох можливих типів: null: представляє контекст перегляду верхнього рівня (тобто не iframe), число, що представляє індекс об'єкта вікна, відповідного фрейму, об'єкт Element, отриманий за допомогою `findElement`.</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L155-L168
```




---

## switchToParentFrame
Команда Switch to Parent Frame встановлює поточний контекст перегляду для майбутніх команд на батьківський контекст поточного контексту перегляду.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-switch-to-parent-frame).

##### Використання

```js
browser.switchToParentFrame()
```

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L172-L189
```




---

## getWindowRect
Команда Get Window Rect повертає розмір і позицію на екрані вікна операційної системи, що відповідає поточному контексту перегляду верхнього рівня.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-get-window-rect).

:::info

Ця команда протоколу вбудована в наступний зручний метод: [getWindowSize](/docs/api/browser/getWindowSize). Рекомендується використовувати цю команду замість протоколу.

:::


##### Використання

```js
browser.getWindowRect()
```

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L193-L196
```

##### Повертає

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** JSON-представлення об'єкта "вікно прямокутника". Це має 4 властивості: `x`, `y`, `width` та `height`.


---

## setWindowRect
Команда Set Window Rect змінює розмір та положення вікна операційної системи, що відповідає поточному контексту перегляду верхнього рівня.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-set-window-rect).

:::info

Ця команда протоколу вбудована в наступний зручний метод: [setWindowSize](/docs/api/browser/setWindowSize). Рекомендується використовувати цю команду замість протоколу.

:::


##### Використання

```js
browser.setWindowRect(x, y, width, height)
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
      <td>number, null</td>
      <td>атрибут screenX об'єкта вікна</td>
    </tr>
    <tr>
      <td><code><var>y</var></code></td>
      <td>number, null</td>
      <td>атрибут screenY об'єкта вікна</td>
    </tr>
    <tr>
      <td><code><var>width</var></code></td>
      <td>number, null</td>
      <td>ширина зовнішніх розмірів контексту перегляду верхнього рівня, включаючи елементи інтерфейсу браузера тощо...</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>number, null</td>
      <td>висота зовнішніх розмірів контексту перегляду верхнього рівня, включаючи елементи інтерфейсу браузера тощо...</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L200-L204
```

##### Повертає

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** JSON-представлення об'єкта "вікно прямокутника" на основі нового стану вікна.


---

## maximizeWindow
Команда Maximize Window викликає специфічну для віконного менеджера операцію "максимізації", якщо така є, у вікні, що містить поточний контекст перегляду верхнього рівня. Зазвичай це збільшує вікно до максимально доступного розміру без переходу в повноекранний режим.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-maximize-window).

##### Використання

```js
browser.maximizeWindow()
```

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L208-L212
```

##### Повертає

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** JSON-представлення об'єкта "вікно прямокутника" на основі нового стану вікна.


---

## minimizeWindow
Команда Minimize Window викликає специфічну для віконного менеджера операцію "мінімізації", якщо така є, у вікні, що містить поточний контекст перегляду верхнього рівня. Зазвичай це приховує вікно в системному треї.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-minimize-window).

##### Використання

```js
browser.minimizeWindow()
```


##### Повертає

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** JSON-представлення об'єкта "вікно прямокутника" (нового) поточного контексту перегляду верхнього рівня.


---

## fullscreenWindow
Команда Fullscreen Window викликає специфічну для віконного менеджера операцію "повного екрана", якщо така є, у вікні, що містить поточний контекст перегляду верхнього рівня. Зазвичай це збільшує вікно до розміру фізичного дисплея і може приховувати елементи інтерфейсу браузера, такі як панелі інструментів.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-fullscreen-window).

##### Використання

```js
browser.fullscreenWindow()
```


##### Повертає

- **&lt;Object&gt;**
            **<code><var>windowRect</var></code>:** JSON-представлення об'єкта "вікно прямокутника" (нового) поточного контексту перегляду верхнього рівня.


---

## findElement
Команда Find Element використовується для пошуку елемента в поточному контексті перегляду, який можна використовувати для майбутніх команд. Ця команда повертає JSON-представлення елемента, яке можна передати до команди $ для перетворення посилання на розширений елемент WebdriverIO.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-find-element).

:::info

Ця команда протоколу вбудована в наступний зручний метод: [$](/docs/api/browser/$). Рекомендується використовувати цю команду замість протоколу.

:::


##### Використання

```js
browser.findElement(using, value)
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
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>дійсна стратегія розташування елемента</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>фактичний селектор, який буде використовуватися для пошуку елемента</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L226-L232
```

##### Повертає

- **&lt;object&gt;**
            **<code><var>element</var></code>:** JSON-представлення об'єкта елемента, наприклад, `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElementFromShadowRoot
Команда Find Element From Shadow Root використовується для пошуку елемента всередині тіньового кореня елемента, який можна використовувати для майбутніх команд. Ця команда повертає JSON-представлення елемента, яке можна передати до команди $ для перетворення посилання на розширений елемент WebdriverIO.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#find-element-from-shadow-root).

:::info

Ця команда протоколу вбудована в наступний зручний метод: [shadow$](/docs/api/element/shadow$). Рекомендується використовувати цю команду замість протоколу.

:::


##### Використання

```js
browser.findElementFromShadowRoot(shadowId, using, value)
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
      <td><code><var>shadowId</var></code></td>
      <td>String</td>
      <td>ідентифікатор елемента тіньового кореня</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>дійсна стратегія розташування елемента</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>фактичний селектор, який буде використовуватися для пошуку елемента</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L236-L248
```

##### Повертає

- **&lt;object&gt;**
            **<code><var>element</var></code>:** JSON-представлення об'єкта тіньового елемента, наприклад, `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElements
Команда Find Elements використовується для пошуку елементів у поточному контексті перегляду, які можна використовувати для майбутніх команд. Ця команда повертає масив JSON-представлень елементів, які можна передати команді $ для перетворення посилання на розширений елемент WebdriverIO (див. findElement).<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-find-elements).

:::info

Ця команда протоколу вбудована в наступний зручний метод: [$$](/docs/api/browser/$$). Рекомендується використовувати цю команду замість протоколу.

:::


##### Використання

```js
browser.findElements(using, value)
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
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>дійсна стратегія розташування елемента</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>фактичний селектор, який буде використовуватися для пошуку елемента</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L252-L254
```

##### Повертає

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** (Можливо пустий) JSON-список представлень об'єкта елемента, наприклад, `[{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }]`.


---

## findElementsFromShadowRoot
Команда Find Elements використовується для пошуку елементів всередині тіньового кореня елемента, які можна використовувати для майбутніх команд. Ця команда повертає масив JSON-представлень елементів, які можна передати команді $ для перетворення посилання на розширений елемент WebdriverIO (див. findElement).<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#find-elements-from-shadow-root).

:::info

Ця команда протоколу вбудована в наступний зручний метод: [shadow$$](/docs/api/element/shadow$$). Рекомендується використовувати цю команду замість протоколу.

:::


##### Використання

```js
browser.findElementsFromShadowRoot(shadowId, using, value)
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
      <td><code><var>shadowId</var></code></td>
      <td>String</td>
      <td>ідентифікатор елемента тіньового кореня</td>
    </tr>
    <tr>
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>дійсна стратегія розташування елемента</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>фактичний селектор, який буде використовуватися для пошуку елемента</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L258-L268
```

##### Повертає

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** (Можливо пустий) JSON-список представлень об'єкта елемента, наприклад, `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElementFromElement
Команда Find Element From Element використовується для пошуку елемента з веб-елемента в поточному контексті перегляду, який можна використовувати для майбутніх команд. Ця команда повертає JSON-представлення елемента, яке можна передати команді $ для перетворення посилання на розширений елемент WebdriverIO (див. findElement).<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-find-element-from-element).

:::info

Ця команда протоколу вбудована в наступний зручний метод: [$](/docs/api/element/$). Рекомендується використовувати цю команду замість протоколу.

:::


##### Використання

```js
browser.findElementFromElement(elementId, using, value)
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
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>дійсна стратегія розташування елемента</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>фактичний селектор, який буде використовуватися для пошуку елемента</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L272-L279
```

##### Повертає

- **&lt;object&gt;**
            **<code><var>element</var></code>:** JSON-представлення об'єкта елемента, наприклад, `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## findElementsFromElement
Команда Find Elements From Element використовується для пошуку елементів з веб-елемента в поточному контексті перегляду, які можна використовувати для майбутніх команд. Ця команда повертає масив JSON-представлень елементів, які можна передати команді $ для перетворення посилання на розширений елемент WebdriverIO (див. findElement).<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-find-elements-from-element).

:::info

Ця команда протоколу вбудована в наступний зручний метод: [$$](/docs/api/element/$$). Рекомендується використовувати цю команду замість протоколу.

:::


##### Використання

```js
browser.findElementsFromElement(elementId, using, value)
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
      <td><code><var>using</var></code></td>
      <td>string</td>
      <td>дійсна стратегія розташування елемента</td>
    </tr>
    <tr>
      <td><code><var>value</var></code></td>
      <td>string</td>
      <td>фактичний селектор, який буде використовуватися для пошуку елемента</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L283-L290
```

##### Повертає

- **&lt;object[]&gt;**
            **<code><var>elements</var></code>:** (Можливо пустий) JSON-список представлень об'єкта елемента, наприклад, `[{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }]`.


---

## getElementShadowRoot
Отримати об'єкт тіньового кореня елемента. Результуючий об'єкт можна використовувати для отримання елементів у цьому тіньовому корені за допомогою, наприклад, findElementFromShadowRoots або findElementsFromShadowRoots.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-get-active-element).

:::info

Ця команда протоколу вбудована в наступний зручний метод: [shadow$](/docs/api/element/shadow$). Рекомендується використовувати цю команду замість протоколу.

:::


##### Використання

```js
browser.getElementShadowRoot(elementId)
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
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L294-L305
```

##### Повертає

- **&lt;string&gt;**
            **<code><var>shadowRoot</var></code>:** JSON-представлення тіньового кореня елемента, наприклад, `{ 'shadow-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## getActiveElement
Get Active Element повертає активний елемент елемента документа поточного контексту перегляду. Ця команда повертає JSON-представлення елемента, яке можна передати команді $ для перетворення посилання на розширений елемент WebdriverIO (див. findElement).<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-get-active-element).

##### Використання

```js
browser.getActiveElement()
```

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L309-L316
```

##### Повертає

- **&lt;string&gt;**
            **<code><var>element</var></code>:** JSON-представлення об'єкта елемента, наприклад, `{ 'element-6066-11e4-a52e-4f735466cecf': 'ELEMENT_1' }`.


---

## isElementSelected
Is Element Selected визначає, чи вибраний вказаний елемент чи ні. Ця операція має сенс лише для елементів вводу типу прапорець (Checkbox) і перемикач (Radio Button) або елементів опцій.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-is-element-selected).

:::info

Ця команда протоколу вбудована в наступний зручний метод: [isSelected](/docs/api/element/isSelected). Рекомендується використовувати цю команду замість протоколу.

:::


##### Використання

```js
browser.isElementSelected(elementId)
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
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L322-L325
```

##### Повертає

- **&lt;Boolean&gt;**
            **<code><var>isSelected</var></code>:** `true` або `false` на основі стану вибору.


---

## isElementDisplayed
Is Element Displayed визначає видимість елемента, яка керується тим, що сприймається людським оком. У цьому контексті відображення елемента не пов'язане з властивостями стилю `visibility` або `display`.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#element-displayedness).

:::info

Ця команда протоколу вбудована в наступний зручний метод: [isDisplayed](/docs/api/element/isDisplayed). Рекомендується використовувати цю команду замість протоколу.

:::


##### Використання

```js
browser.isElementDisplayed(elementId)
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
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L331-L333
```

##### Повертає

- **&lt;Boolean&gt;**
            **<code><var>isDisplayed</var></code>:** `true` або `false` на основі стану видимості.


---

## getElementAttribute
Команда Get Element Attribute поверне атрибут веб-елемента.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-get-element-attribute).

:::info

Ця команда протоколу вбудована в наступний зручний метод: [getAttribute](/docs/api/element/getAttribute). Рекомендується використовувати цю команду замість протоколу.

:::


##### Використання

```js
browser.getElementAttribute(elementId, name)
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
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>назва значення атрибута для отримання</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L339-L341
```

##### Повертає

- **&lt;string&gt;**
            **<code><var>attribute</var></code>:** Названий атрибут елемента.


---

## getElementProperty
Команда Get Element Property поверне результат отримання властивості елемента.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-get-element-property).

:::info

Ця команда протоколу вбудована в наступний зручний метод: [getProperty](/docs/api/element/getProperty). Рекомендується використовувати цю команду замість протоколу.

:::


##### Використання

```js
browser.getElementProperty(elementId, name)
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
      <td><code><var>name</var></code></td>
      <td>String</td>
      <td>назва властивості атрибута для отримання</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L347-L349
```

##### Повертає

- **&lt;string&gt;**
            **<code><var>property</var></code>:** Названа властивість елемента, доступна шляхом виклику GetOwnProperty на об'єкті елемента.


---

## getElementCSSValue
Команда Get Element CSS Value отримує обчислене значення заданої властивості CSS для даного веб-елемента.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-get-element-css-value).

:::info

Ця команда протоколу вбудована в наступний зручний метод: [getCSSProperty](/docs/api/element/getCSSProperty). Рекомендується використовувати цю команду замість протоколу.

:::


##### Використання

```js
browser.getElementCSSValue(elementId, propertyName)
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
      <td><code><var>propertyName</var></code></td>
      <td>String</td>
      <td>назва властивості CSS для отримання</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L355-L357
```

##### Повертає

- **&lt;string&gt;**
            **<code><var>cssValue</var></code>:** Обчислене значення параметра, відповідного імені властивості з декларацій стилю елемента (якщо тип документа не xml, в цьому випадку повертається просто порожній рядок).


---

## getElementText
Команда Get Element Text призначена для повернення тексту елемента "як відображається". Відображений текст елемента також використовується для пошуку елементів за текстом посилання та частковим текстом посилання.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-get-element-text).

##### Використання

```js
browser.getElementText(elementId)
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
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L363-L365
```

##### Повертає

- **&lt;string&gt;**
            **<code><var>text</var></code>:** Видимий текст елемента (включаючи дочірні елементи), відповідно до алгоритму, визначеного в Selenium Atoms для [`bot.dom.getVisibleText`](https://github.com/SeleniumHQ/selenium/blob/e09e28f016c9f53196cf68d6f71991c5af4a35d4/javascript/atoms/dom.js#L981).


---

## getElementTagName
Команда Get Element Tag Name повертає кваліфіковану назву елемента даного веб-елемента.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-get-element-tag-name).

:::info

Ця команда протоколу вбудована в наступний зручний метод: [getTagName](/docs/api/element/getTagName). Рекомендується використовувати цю команду замість протоколу.

:::


##### Використання

```js
browser.getElementTagName(elementId)
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
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L371-L373
```

##### Повертає

- **&lt;string&gt;**
            **<code><var>text</var></code>:** Атрибут tagName елемента.


---

## getElementRect
Команда Get Element Rect повертає розміри та координати даного веб-елемента.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-get-element-rect).

:::info

Ця команда протоколу вбудована в наступні зручні методи: [getSize](/docs/api/element/getSize), [getLocation](/docs/api/element/getLocation). Рекомендується використовувати ці команди замість протоколу.

:::


##### Використання

```js
browser.getElementRect(elementId)
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
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L379-L381
```

##### Повертає

- **&lt;Object&gt;**
            **<code><var>elementRect</var></code>:** JSON-об'єкт, що представляє позицію та обмежуючий прямокутник елемента.


---

## isElementEnabled
Is Element Enabled визначає, чи увімкнений вказаний елемент чи ні. Ця операція має сенс лише для елементів управління формою.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-is-element-enabled).

:::info

Ця команда протоколу вбудована в наступний зручний метод: [isEnabled](/docs/api/element/isEnabled). Рекомендується використовувати цю команду замість протоколу.

:::


##### Використання

```js
browser.isElementEnabled(elementId)
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
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L387-L390
```

##### Повертає

- **&lt;Boolean&gt;**
            **<code><var>isEnabled</var></code>:** Якщо елемент знаходиться в xml-документі або є вимкненим елементом управління формою: `false`, в іншому випадку, `true`.


---

## elementClick
Команда Element Click прокручує елемент у видиму область, якщо він ще не є доступним для вказівника, і клацає по його видимій центральній точці. Якщо центральна точка елемента закрита іншим елементом, повертається помилка "element click intercepted". Якщо елемент знаходиться за межами області перегляду, повертається помилка "element not interactable".<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-element-click).

:::info

Ця команда протоколу вбудована в наступний зручний метод: [click](/docs/api/element/click). Рекомендується використовувати цю команду замість протоколу.

:::


##### Використання

```js
browser.elementClick(elementId)
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
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L396-L398
```




---

## elementClear
Команда Element Clear прокручує у видиму область елемент, який можна редагувати або скидати, і потім намагається очистити його вибрані файли або текстовий вміст.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-element-clear).

:::info

Ця команда протоколу вбудована в наступний зручний метод: [clearValue](/docs/api/element/clearValue). Рекомендується використовувати цю команду замість протоколу.

:::


##### Використання

```js
browser.elementClear(elementId)
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
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L404-L407
```




---

## elementSendKeys
Команда Element Send Keys прокручує у видиму область елемент форми, а потім відправляє надані клавіші до елемента. У випадку, якщо елемент не доступний для клавіатури, повертається помилка "element not interactable".<br /><br />Стан введення клавіш може бути очищений у процесі "набору" шляхом відправки нульового ключа, який є U+E000 (NULL).<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-element-send-keys).

:::info

Ця команда протоколу вбудована в наступні зручні методи: [addValue](/docs/api/element/addValue), [setValue](/docs/api/element/setValue). Рекомендується використовувати ці команди замість протоколу.

:::


##### Використання

```js
browser.elementSendKeys(elementId, text)
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
      <td>рядок для відправки як натискання клавіш до елемента</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L413-L416
```




---

## getPageSource
Команда Get Page Source повертає рядкову серіалізацію DOM активного документа поточного контексту перегляду.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-get-page-source).

##### Використання

```js
browser.getPageSource()
```

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L420-L421
```

##### Повертає

- **&lt;string&gt;**
            **<code><var>pageSource</var></code>:** DOM активного документа поточного контексту перегляду


---

## executeScript
Команда Execute Script виконує функцію JavaScript у контексті поточного контексту перегляду та повертає значення, що повертається функцією.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-execute-script).

:::info

Ця команда протоколу вбудована в наступний зручний метод: [execute](/docs/api/browser/execute). Рекомендується використовувати цю команду замість протоколу.

:::


##### Використання

```js
browser.executeScript(script, args)
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
      <td>рядок, тіло функції Javascript, яку ви хочете виконати</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>string, object, number, boolean, null, undefined[]</td>
      <td>масив значень JSON, які будуть десеріалізовані та передані як аргументи до вашої функції</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L425-L426
```

##### Повертає

- **&lt;*&gt;**
            **<code><var>result</var></code>:** Або значення, що повертається вашим скриптом, або виконання Promise, поверненого вашим скриптом, або помилка, яка була причиною відхилення Promise, поверненого вашим скриптом.


---

## executeAsyncScript
Команда Execute Async Script змушує JavaScript виконуватися як анонімна функція. На відміну від команди Execute Script, результат функції ігнорується. Замість цього додатковий аргумент надається як останній аргумент функції. Це функція, яка при виклику повертає свій перший аргумент як відповідь.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-execute-async-script).

:::info

Ця команда протоколу вбудована в наступний зручний метод: [executeAsync](/docs/api/browser/executeAsync). Рекомендується використовувати цю команду замість протоколу.

:::


##### Використання

```js
browser.executeAsyncScript(script, args)
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
      <td>рядок, тіло функції Javascript, яку ви хочете виконати</td>
    </tr>
    <tr>
      <td><code><var>args</var></code></td>
      <td>string, object, number, boolean, null, undefined[]</td>
      <td>масив значень JSON, які будуть десеріалізовані та передані як аргументи до вашої функції</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L430-L434
```

##### Повертає

- **&lt;*&gt;**
            **<code><var>result</var></code>:** Або значення, що повертається вашим скриптом, або виконання Promise, поверненого вашим скриптом, або помилка, яка була причиною відхилення Promise, поверненого вашим скриптом.


---

## getAllCookies
Команда Get All Cookies повертає всі куки, пов'язані з адресою активного документа поточного контексту перегляду.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-get-all-cookies).

##### Використання

```js
browser.getAllCookies()
```

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L438-L455
```

##### Повертає

- **&lt;Object[]&gt;**
            **<code><var>cookies</var></code>:** Список серіалізованих кук. Кожна серіалізована кука має кілька необов'язкових полів, які можуть повертатися або не повертатися на додаток до `name` та `value`.


---

## addCookie
Команда Add Cookie додає одну куку до сховища кук, пов'язаного з адресою активного документа.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-adding-a-cookie).

##### Використання

```js
browser.addCookie(cookie)
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
      <td><code><var>cookie</var></code></td>
      <td>object</td>
      <td>JSON-об'єкт, що представляє куку. Він повинен мати принаймні поля name і value, та може мати більше, включаючи expiry-time тощо</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L459-L477
```




---

## deleteAllCookies
Команда Delete All Cookies дозволяє видалити всі куки, пов'язані з адресою активного документа.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-delete-all-cookies).

##### Використання

```js
browser.deleteAllCookies()
```

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L481-L485
```




---

## getNamedCookie
Команда Get Named Cookie повертає куку з вказаним ім'ям із пов'язаних кук у сховищі кук активного документа поточного контексту перегляду. Якщо кука не знайдена, повертається помилка "no such cookie".<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-get-named-cookie).

##### Використання

```js
browser.getNamedCookie(name)
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
      <td>String</td>
      <td>назва куки для отримання</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L489-L503
```

##### Повертає

- **&lt;Object&gt;**
            **<code><var>cookie</var></code>:** Серіалізована кука з полями name та value. Є ряд додаткових полів, таких як `path`, `domain` та `expiry-time`, які також можуть бути присутніми.


---

## deleteCookie
Команда Delete Cookie дозволяє видалити або одну куку за параметром name, або всі куки, пов'язані з адресою активного документа, якщо name не визначено.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-delete-cookie).

##### Використання

```js
browser.deleteCookie(name)
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
      <td>String</td>
      <td>назва куки для видалення</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L507-L512
```




---

## performActions
Команда Perform Actions використовується для виконання складних дій користувача. Детальніше дивіться [спецификацію](https://github.com/jlipps/simple-wd-spec#perform-actions).<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-perform-actions).

##### Використання

```js
browser.performActions(actions)
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
      <td>список об'єктів, кожен з яких представляє джерело введення та пов'язані з ним дії</td>
    </tr>
  </tbody>
</table>



---

## releaseActions
Команда Release Actions використовується для звільнення всіх клавіш та кнопок вказівника, які в даний момент натиснуті. Це призводить до виникнення подій, як якщо б стан був звільнений явною серією дій. Вона також очищає весь внутрішній стан віртуальних пристроїв.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-release-actions).

##### Використання

```js
browser.releaseActions()
```



---

## dismissAlert
Команда Dismiss Alert закриває простий діалог, якщо він є, в іншому випадку - помилка. Запит на відхилення сповіщення користувача, яке може не мати кнопки відхилення, має такий же ефект, як і прийняття його.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-dismiss-alert).

##### Використання

```js
browser.dismissAlert()
```

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L516-L517
```




---

## acceptAlert
Команда Accept Alert приймає простий діалог, якщо він є, в іншому випадку - помилка.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-accept-alert).

##### Використання

```js
browser.acceptAlert()
```



---

## getAlertText
Команда Get Alert Text повертає повідомлення поточного користувацького запиту. Якщо немає поточного запиту користувача, вона повертає помилку.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-get-alert-text).

##### Використання

```js
browser.getAlertText()
```

##### Приклад

```js reference title="examples.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/api/webdriver/examples.js#L521-L522
```

##### Повертає

- **&lt;string&gt;**
            **<code><var>alertText</var></code>:** Повідомлення запиту користувача.


---

## sendAlertText
Команда Send Alert Text встановлює текстове поле запиту користувача window.prompt на вказане значення.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-send-alert-text).

##### Використання

```js
browser.sendAlertText(text)
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
      <td><code><var>text</var></code></td>
      <td>string</td>
      <td>рядок для встановлення в запиті</td>
    </tr>
  </tbody>
</table>



---

## takeScreenshot
Команда Take Screenshot робить знімок екрана області перегляду контексту перегляду верхнього рівня.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-take-screenshot).

##### Використання

```js
browser.takeScreenshot()
```


##### Повертає

- **&lt;string&gt;**
            **<code><var>screenshot</var></code>:** Дані зображення PNG у форматі base64, що складають знімок екрана початкової області перегляду.


---

## takeElementScreenshot
Команда Take Element Screenshot робить знімок видимої області, охопленої обмежуючим прямокутником елемента.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#dfn-take-element-screenshot).

##### Використання

```js
browser.takeElementScreenshot(elementId, scroll)
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
      <td><code><var>scroll</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>boolean</td>
      <td>прокрутити до елемента. За замовчуванням: true</td>
    </tr>
  </tbody>
</table>


##### Повертає

- **&lt;string&gt;**
            **<code><var>screenshot</var></code>:** Дані зображення PNG у форматі base64, що складають знімок екрана видимої області обмежуючого прямокутника елемента після його прокрутки у видиму область.


---

## getElementComputedRole
Отримати обчислену роль WAI-ARIA елемента.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#get-computed-role).

##### Використання

```js
browser.getElementComputedRole(elementId)
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
  </tbody>
</table>


##### Повертає

- **&lt;string&gt;**
            **<code><var>role</var></code>:** Результат обчислення ролі WAI-ARIA елемента.


---

## getElementComputedLabel
Отримати доступне ім'я елемента.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/webdriver/#get-computed-label).

##### Використання

```js
browser.getElementComputedLabel(elementId)
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
  </tbody>
</table>


##### Повертає

- **&lt;string&gt;**
            **<code><var>label</var></code>:** Результат обчислення доступного імені та опису для доступного імені елемента.


---

## setPermissions
Симулює модифікацію користувачем стану дозволу PermissionDescriptor. __Примітка:__ ця функція ще не впроваджена у всіх браузерах.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/permissions/#set-permission-command).

##### Використання

```js
browser.setPermissions(descriptor, state, oneRealm)
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
      <td><code><var>descriptor</var></code></td>
      <td>object</td>
      <td>Кожна потужна функція має один або більше аспектів, для доступу до яких веб-сайти можуть запитувати дозвіл. Для опису цих аспектів кожна функція визначає підтип PermissionDescriptor як свій тип дескриптора дозволу. __Примітка:__ ця функція ще не впроваджена у всіх браузерах.</td>
    </tr>
    <tr>
      <td><code><var>state</var></code></td>
      <td>string</td>
      <td>Визначає, чи дозвіл надано, відхилено або запитано.</td>
    </tr>
    <tr>
      <td><code><var>oneRealm</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>boolean</td>
      <td>Чи застосовувати дозволи до всіх контекстів виконання.</td>
    </tr>
  </tbody>
</table>

##### Приклади


```js
// встановити дозволи midi
browser.setPermissions(
  { name: 'midi', sysex: true },
  'granted' // може бути також "denied" або "prompt"
);
```


```js
// встановити дозволи буфера обміну
browser.setPermissions({ name: 'clipboard-read' }, 'granted');
// тепер ви можете читати буфер обміну через, наприклад
const clipboardText = await browser.execute(() => navigator.clipboard.readText());
```



---

## generateTestReport
Генерує звіт для тестування. Розширення для [Reporting API](https://developers.google.com/web/updates/2018/09/reportingapi). __Примітка:__ ця функція ще не впроваджена у всіх браузерах.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/reporting/#automation).

##### Використання

```js
browser.generateTestReport(message, group)
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
      <td><code><var>message</var></code></td>
      <td>string</td>
      <td>Повідомлення, яке буде відображатися у звіті.</td>
    </tr>
    <tr>
      <td><code><var>group</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>string</td>
      <td>Визначає групу кінцевих точок для доставки звіту.</td>
    </tr>
  </tbody>
</table>



---

## createMockSensor
Створює фіктивний сенсор для емуляції сенсорів, таких як датчик освітлення навколишнього середовища. __Примітка:__ ця функція ще не впроваджена у всіх браузерах.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/sensors/#create-mock-sensor-command).

##### Використання

```js
browser.createMockSensor(mockSensorType, maxSamplingFrequency, minSamplingFrequency)
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
      <td><code><var>mockSensorType</var></code></td>
      <td>string</td>
      <td>Тип API сенсора для фіктивної емуляції, наприклад, 'ambient-light'</td>
    </tr>
    <tr>
      <td><code><var>maxSamplingFrequency</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>number</td>
      <td>Подвійне число, що представляє частоту в Гц, яке використовується для встановлення максимальної підтримуваної частоти вибірки для пов'язаного фіктивного сенсора.</td>
    </tr>
    <tr>
      <td><code><var>minSamplingFrequency</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>number</td>
      <td>Подвійне число, що представляє частоту в Гц, яке використовується для встановлення мінімальної підтримуваної частоти вибірки для пов'язаного фіктивного сенсора.</td>
    </tr>
  </tbody>
</table>



---

## getMockSensor
Отримує інформацію про даний тип фіктивного сенсора. __Примітка:__ ця функція ще не впроваджена у всіх браузерах.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/sensors/#get-mock-sensor-command).

##### Використання

```js
browser.getMockSensor(type)
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
      <td>String</td>
      <td>Тип фіктивного сенсора для отримання інформації.</td>
    </tr>
  </tbody>
</table>


##### Повертає

- **&lt;object&gt;**
            **<code><var>sensorReading</var></code>:** Значення показів фіктивного сенсора.


---

## updateMockSensor
Оновлює тип фіктивного сенсора. __Примітка:__ ця функція ще не впроваджена у всіх браузерах.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/sensors/#update-mock-sensor-reading-command).

##### Використання

```js
browser.updateMockSensor(type, mockSensorType, maxSamplingFrequency, minSamplingFrequency)
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
      <td>String</td>
      <td>Тип фіктивного сенсора для оновлення інформації.</td>
    </tr>
    <tr>
      <td><code><var>mockSensorType</var></code></td>
      <td>string</td>
      <td>Тип API сенсора для фіктивної емуляції, наприклад, 'ambient-light'</td>
    </tr>
    <tr>
      <td><code><var>maxSamplingFrequency</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>number</td>
      <td>Подвійне число, що представляє частоту в Гц, яке використовується для встановлення максимальної підтримуваної частоти вибірки для пов'язаного фіктивного сенсора.</td>
    </tr>
    <tr>
      <td><code><var>minSamplingFrequency</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>number</td>
      <td>Подвійне число, що представляє частоту в Гц, яке використовується для встановлення мінімальної підтримуваної частоти вибірки для пов'язаного фіктивного сенсора.</td>
    </tr>
  </tbody>
</table>



---

## deleteMockSensor
Команда Delete Session закриває будь-які контексти перегляду верхнього рівня, пов'язані з поточною сесією, завершує з'єднання і, нарешті, закриває поточну сесію. __Примітка:__ ця функція ще не впроваджена у всіх браузерах.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/sensors/#delete-mock-sensor-command).

##### Використання

```js
browser.deleteMockSensor(type)
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
      <td>String</td>
      <td>Тип фіктивного сенсора для видалення.</td>
    </tr>
  </tbody>
</table>



---

## setTimeZone
Симулює зміну часового поясу для цілей тестування. __Примітка:__ ця функція ще не впроваджена у всіх браузерах.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://w3c.github.io/sensors/#create-mock-sensor-command).

##### Використання

```js
browser.setTimeZone(time_zone)
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
      <td><code><var>time_zone</var></code></td>
      <td>string</td>
      <td>Назва часового поясу, наприклад, Asia/Tokyo</td>
    </tr>
  </tbody>
</table>



---

## addVirtualAuthenticator
Створює програмний [Віртуальний Аутентифікатор](https://www.w3.org/TR/webauthn-2/#virtual-authenticators).<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://www.w3.org/TR/webauthn-2/#sctn-automation-add-virtual-authenticator).

##### Використання

```js
browser.addVirtualAuthenticator(protocol, transport, hasResidentKey, hasUserVerification, isUserConsenting, isUserVerified, extensions, uvm)
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
      <td><code><var>protocol</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>string</td>
      <td>Допустимі значення: 'ctap1/u2f', 'ctap2', 'ctap2_1'.</td>
    </tr>
    <tr>
      <td><code><var>transport</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>string</td>
      <td>Допустимі значення: 'usb', 'nfc', 'ble' або 'internal'.</td>
    </tr>
    <tr>
      <td><code><var>hasResidentKey</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>boolean</td>
      <td>Допустимі значення: true, false.</td>
    </tr>
    <tr>
      <td><code><var>hasUserVerification</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>boolean</td>
      <td>Допустимі значення: true, false.</td>
    </tr>
    <tr>
      <td><code><var>isUserConsenting</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>boolean</td>
      <td>Допустимі значення: true, false.</td>
    </tr>
    <tr>
      <td><code><var>isUserVerified</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>boolean</td>
      <td>Допустимі значення: масив, що містить ідентифікатори розширень.</td>
    </tr>
    <tr>
      <td><code><var>extensions</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>string[]</td>
      <td>Допустимі значення: До 3 записів методу перевірки користувача.</td>
    </tr>
    <tr>
      <td><code><var>uvm</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>object[]</td>
      <td></td>
    </tr>
  </tbody>
</table>


##### Повертає

- **&lt;string&gt;**
            **<code><var>authenticatorId</var></code>:** Повертає рядковий ідентифікатор автентифікатора.


---

## removeVirtualAuthenticator
Видаляє попередньо створений віртуальний аутентифікатор.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-virtual-authenticator).

##### Використання

```js
browser.removeVirtualAuthenticator(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>ідентифікатор автентифікатора</td>
    </tr>
  </tbody>
</table>



---

## addCredential
Впроваджує джерело публічного ключа облікових даних в існуючий віртуальний аутентифікатор.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://www.w3.org/TR/webauthn-2/#sctn-automation-add-credential).

##### Використання

```js
browser.addCredential(authenticatorId, credentialId, isResidentCredential, rpId, privateKey, userHandle, signCount, largeBlob)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>Ідентифікатор автентифікатора</td>
    </tr>
    <tr>
      <td><code><var>credentialId</var></code></td>
      <td>string</td>
      <td>Ідентифікатор облікових даних, закодований за допомогою кодування Base64url.</td>
    </tr>
    <tr>
      <td><code><var>isResidentCredential</var></code></td>
      <td>boolean</td>
      <td>Якщо встановлено значення true, створюється облікові дані, які можна виявити на стороні клієнта. Якщо встановлено значення false, замість цього створюються облікові дані на стороні сервера.</td>
    </tr>
    <tr>
      <td><code><var>rpId</var></code></td>
      <td>string</td>
      <td>Ідентифікатор довіряючої сторони, до якої обмежені облікові дані.</td>
    </tr>
    <tr>
      <td><code><var>privateKey</var></code></td>
      <td>string</td>
      <td>Пакет асиметричного ключа, що містить один приватний ключ відповідно до [RFC5958], закодований з використанням кодування Base64url.</td>
    </tr>
    <tr>
      <td><code><var>userHandle</var></code></td>
      <td>string</td>
      <td>Ідентифікатор користувача, пов'язаний з обліковими даними, закодований за допомогою кодування Base64url. Ця властивість може бути не визначена.</td>
    </tr>
    <tr>
      <td><code><var>signCount</var></code></td>
      <td>number</td>
      <td>Початкове значення лічильника підписів, пов'язаного з джерелом публічного ключа облікових даних.</td>
    </tr>
    <tr>
      <td><code><var>largeBlob</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>string</td>
      <td>Великий BLOB, пов'язаний з джерелом публічного ключа облікових даних, закодований за допомогою кодування Base64url. Ця властивість може бути не визначена.</td>
    </tr>
  </tbody>
</table>



---

## getCredentials
Повертає один об'єкт параметрів облікових даних для кожного джерела публічного ключа облікових даних, збереженого у віртуальному аутентифікаторі, незалежно від того, чи вони були збережені за допомогою Add Credential або `navigator.credentials.create()`.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://www.w3.org/TR/webauthn-2/#sctn-automation-get-credentials).

##### Використання

```js
browser.getCredentials(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>ідентифікатор автентифікатора</td>
    </tr>
  </tbody>
</table>


##### Повертає

- **&lt;object[]&gt;**
            **<code><var>credentials</var></code>:** Повертає масив облікових даних.


---

## removeAllCredentials
Видаляє всі джерела публічного ключа облікових даних, збережені у віртуальному аутентифікаторі.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-all-credentials).

##### Використання

```js
browser.removeAllCredentials(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>ідентифікатор автентифікатора</td>
    </tr>
  </tbody>
</table>



---

## removeCredential
Видаляє джерело публічного ключа облікових даних, збережене у віртуальному аутентифікаторі.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://www.w3.org/TR/webauthn-2/#sctn-automation-remove-credential).

##### Використання

```js
browser.removeCredential(authenticatorId, credentialId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>ідентифікатор автентифікатора</td>
    </tr>
    <tr>
      <td><code><var>credentialId</var></code></td>
      <td>String</td>
      <td>ідентифікатор облікових даних</td>
    </tr>
  </tbody>
</table>



---

## setUserVerified
Команда розширення Set User Verified встановлює властивість isUserVerified на віртуальному аутентифікаторі.<br /><br />Команда протоколу WebDriver. Більше деталей можна знайти в [офіційній документації протоколу](https://www.w3.org/TR/webauthn-2/#sctn-automation-set-user-verified).

##### Використання

```js
browser.setUserVerified(authenticatorId)
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
      <td><code><var>authenticatorId</var></code></td>
      <td>String</td>
      <td>ідентифікатор автентифікатора</td>
    </tr>
  </tbody>
</table>


