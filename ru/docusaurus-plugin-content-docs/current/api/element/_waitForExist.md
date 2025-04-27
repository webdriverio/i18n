---
id: waitForExist
title: waitForExist
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForExist.ts
---

Ожидает появления элемента в DOM в течение указанного количества
миллисекунд. Возвращает true, если селектор
соответствует хотя бы одному элементу, существующему в DOM, иначе выбрасывает
ошибку. Если флаг reverse установлен в true, команда вернет true,
если селектор не соответствует ни одному элементу.

:::info

В отличие от других команд элементов, WebdriverIO не будет ждать
существования элемента для выполнения этой команды.

:::

##### Использование

```js
$(selector).waitForExist({ timeout, reverse, timeoutMsg, interval })
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
      <td>если задано, переопределяет сообщение об ошибке по умолчанию</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">опционально</span></td>
      <td>`Number`</td>
      <td>интервал между проверками (по умолчанию: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### Пример

```js title="waitForExistSyncExample.js"
it('should display a notification message after successful form submit', async () => {
    const form = await $('form');
    const notification = await $('.notification');
    await form.$(".send").click();
    await notification.waitForExist({ timeout: 5000 });
    expect(await notification.getText()).to.be.equal('Data transmitted successfully!')
});
it('should remove a message after successful form submit', async () => {
    const form = await $('form');
    const message = await $('.message');
    await form.$(".send").click();
    await message.waitForExist({ reverse: true });
});
```

##### Возвращает

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true     если элемент существует (или не существует, если флаг установлен)