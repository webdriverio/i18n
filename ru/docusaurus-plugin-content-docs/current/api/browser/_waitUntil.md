---
id: waitUntil
title: waitUntil
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/waitUntil.ts
---

Эта команда ожидания — ваше универсальное оружие, если вам нужно чего-то дождаться. Она ожидает условие
и ждет, пока это условие не будет выполнено с возвращением истинного значения.

Типичный пример — ожидание, пока определенный элемент не будет содержать определенный текст (см. пример).

##### Использование

```js
browser.waitUntil(condition, { timeout, timeoutMsg, interval })
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
      <td><code><var>condition</var></code></td>
      <td>`Function`</td>
      <td>условие, которое нужно ожидать, пока оно не вернет истинное значение</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`WaitUntilOptions`</td>
      <td>опции команды</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`Number`</td>
      <td>время в мс (по умолчанию установлено на основе значения конфигурации [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`String`</td>
      <td>сообщение об ошибке, которое будет выброшено, когда waitUntil истечет</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`Number`</td>
      <td>интервал между проверками условия (по умолчанию установлено на основе значения конфигурации [`waitforInterval`](/docs/configuration#waitforinterval))</td>
    </tr>
  </tbody>
</table>

##### Примеры

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/index.html#L3-L8
```

```js reference title="waitUntilExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0c9252b0a4f7e18a34cece74e5798c1fe464c120/waitUntil/waitUntilExample.js#L16-L24
```

##### Возвращает

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true, если условие выполнено