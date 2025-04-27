---
id: accept
title: прийняти
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/accept.ts
---

Повертає результат, коли діалогове вікно було прийнято.

##### Використання

```js
await dialog.accept(promptText)
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
      <td><code><var>promptText</var></code><br /><span className="label labelWarning">необов'язково</span></td>
      <td>`string`</td>
      <td>Текст для введення в запит. Не має жодного ефекту, якщо тип діалогового вікна не є запитом.</td>
    </tr>
  </tbody>
</table>

##### Приклад

```js title="dialogAccept.js"
await dialog.accept();
await dialog.accept(promptText);
```