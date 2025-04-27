---
id: waitForEnabled
title: waitForEnabled
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/waitForEnabled.ts
---

Чекати, поки елемент (вибраний за допомогою css-селектора) буде (де)активованим протягом вказаної кількості мілісекунд. Якщо запит повертає кілька елементів за заданим селектором, команда повертає true, якщо хоча б один елемент є (де)активованим.

:::info

На відміну від інших команд елементів, WebdriverIO не чекатиме існування елемента для виконання цієї команди.

:::

##### Використання

```js
$(selector).waitForEnabled({ timeout, reverse, timeoutMsg, interval })
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
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`WaitForOptions`</td>
      <td>опції waitForEnabled (необов'язково)</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>час у мс (за замовчуванням встановлюється на основі значення конфігурації [`waitforTimeout`](/docs/configuration#waitfortimeout))</td>
    </tr>
    <tr>
      <td><code><var>options.reverse</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Boolean`</td>
      <td>якщо true, то очікується протилежний результат (за замовчуванням: false)</td>
    </tr>
    <tr>
      <td><code><var>options.timeoutMsg</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`String`</td>
      <td>якщо існує, то перевизначає повідомлення про помилку за замовчуванням</td>
    </tr>
    <tr>
      <td><code><var>options.interval</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Number`</td>
      <td>інтервал між перевірками (за замовчуванням: `waitforInterval`)</td>
    </tr>
  </tbody>
</table>

##### Приклади

```html title="index.html"
<input type="text" id="username" value="foobar" disabled="disabled"></input>
<script type="text/javascript">
    setTimeout(() => {
        document.getElementById('username').disabled = false
    }, 2000);
</script>
```

```js title="waitForEnabledExample.js"
it('should detect when element is enabled', async () => {
    await $('#username').waitForEnabled({ timeout: 3000 });
});

it('should detect when element is disabled', async () => {
    elem = await $('#username');
    await elem.waitForEnabled({ reverse: true })
});
```

##### Повертає

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true, якщо елемент (де)активований