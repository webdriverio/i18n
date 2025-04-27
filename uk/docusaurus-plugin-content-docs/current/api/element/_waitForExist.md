---
id: waitForExist
title: waitForExist
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForExist.ts
---

Очікування елемента протягом вказаної
кількості мілісекунд для того, щоб він був присутній в DOM. Повертає true, якщо селектор
відповідає принаймні одному елементу, який існує в DOM, інакше викидає
помилку. Якщо прапорець reverse встановлено на true, команда натомість поверне true,
якщо селектор не відповідає жодному елементу.

:::info

На відміну від інших команд елемента, WebdriverIO не буде чекати
існування елемента для виконання цієї команди.

:::

##### Використання

```js
$(selector).waitForExist({ timeout, reverse, timeoutMsg, interval })
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
      <td>`WaitForOptions`</td>
      <td>опції waitForEnabled (опціонально)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>`Number`</td>
      <td>час у мс (за замовчуванням встановлено на основі конфігураційного значення [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>`Boolean`</td>
      <td>якщо true, очікується протилежне (за замовчуванням: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>`String`</td>
      <td>якщо існує, перевизначає стандартне повідомлення про помилку</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">опціонально</span></td>
      <td>`Number`</td>
      <td>інтервал між перевірками (за замовчуванням: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### Приклад

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

##### Повертає

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true     якщо елемент існує (або не існує, якщо встановлено прапорець)