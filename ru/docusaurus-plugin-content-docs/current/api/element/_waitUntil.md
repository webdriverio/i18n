---
id: waitUntil
title: waitUntil
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitUntil.ts
---

Эта команда ожидания является вашим универсальным оружием, если вы хотите на что-то подождать. Она ожидает условие и ждет, пока это условие не будет выполнено с истинным значением.

:::info

В отличие от других команд элементов, WebdriverIO не будет ждать существования элемента для выполнения этой команды.

:::

Распространенный пример - подождать, пока определенный элемент не будет содержать определенный текст (см. пример).

##### Использование

```js
$(selector).waitUntil(condition, { timeout, timeoutMsg, interval })
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
      <td>условие для ожидания</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`WaitUntilOptions`</td>
      <td>опции команды</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>время в мс (по умолчанию устанавливается на основе значения конфигурации [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>сообщение об ошибке при истечении времени ожидания</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>интервал между проверками условий (по умолчанию устанавливается на основе значения конфигурации [`waitforInterval`](/docs/configuration#waitforinterval))</td>
    </tr>
  </tbody>
</table>

##### Примеры

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/index.html#L3-L8
```

```js reference title="waitUntilExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitUntil/waitUntilExample.js#L6-L14
```

##### Возвращает

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:** true если условие выполнено