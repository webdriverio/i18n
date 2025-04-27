---
id: waitForClickable
title: waitForClickable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForClickable.ts
---

Ожидание указанного времени в миллисекундах, пока элемент станет кликабельным или некликабельным.

:::info

В отличие от других команд для элементов, WebdriverIO не будет ожидать существования элемента для выполнения
этой команды.

:::

##### Использование

```js
$(selector).waitForClickable({ timeout, reverse, timeoutMsg, interval })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`WaitForOptions`</td>
      <td>опции waitForEnabled (опционально)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`Number`</td>
      <td>время в мс (по умолчанию установлено на основе конфигурации [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`Boolean`</td>
      <td>если true, ожидает противоположного условия (по умолчанию: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`String`</td>
      <td>если указано, переопределяет сообщение об ошибке по умолчанию</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`Number`</td>
      <td>интервал между проверками (по умолчанию: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### Пример

```js title="waitForClickable.js"
it('should detect when element is clickable', async () => {
    const elem = await $('#elem')
    await elem.waitForClickable({ timeout: 3000 });
});
it('should detect when element is no longer clickable', async () => {
    const elem = await $('#elem')
    await elem.waitForClickable({ reverse: true });
});
```

##### Возвращает

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  `true` если элемент кликабелен (или нет, если установлен флаг)