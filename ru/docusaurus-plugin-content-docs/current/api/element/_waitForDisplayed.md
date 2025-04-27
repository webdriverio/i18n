---
id: waitForDisplayed
title: waitForDisplayed
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForDisplayed.ts
---

Ожидает отображения или скрытия элемента в течение указанного количества миллисекунд.

:::info

В отличие от других команд элемента, WebdriverIO не будет ждать существования элемента для выполнения
этой команды.

:::

##### Использование

```js
$(selector).waitForDisplayed({ timeout, reverse, timeoutMsg, interval, withinViewport })
```

##### Параметры

<table>
  <thead>
    <tr>
      <th>Название</th><th>Тип</th><th>Детали</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`WaitForOptions`</td>
      <td>опции waitForDisplayed (опционально)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`Number`</td>
      <td>время в мс (по умолчанию устанавливается на основе значения конфигурации [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`Boolean`</td>
      <td>если true, ожидает противоположного (по умолчанию: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`String`</td>
      <td>если существует, переопределяет сообщение об ошибке по умолчанию</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`Number`</td>
      <td>интервал между проверками (по умолчанию: `waitforInterval`)</td>
    </tr>
    <tr>
      <td><code><var>options.withinViewport</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`Boolean`</td>
      <td>установите в `true`, чтобы ждать, пока элемент не будет отображаться в области просмотра (по умолчанию: `false`)</td>
    </tr>
  </tbody>
</table>

##### Примеры

```html reference title="index.html" useHTTPS
https://github.com/webdriverio/example-recipes/blob/0bfb2b8d212b627a2659b10f4449184b657e1d59/waitForDisplayed/index.html#L3-L8
```

```js reference title="waitForDisplayedExample.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/9ac16b4d4cf4bc8ec87f6369439a2d0bcaae4483/waitForDisplayed/waitForDisplayedExample.js#L6-L14
```

##### Возвращает

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true    если элемент отображается (или нет, если установлен флаг)