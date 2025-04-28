---
id: accept
title: zaakceptuj
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/dialog/accept.ts
---

Zwraca, gdy okno dialogowe zostało zaakceptowane.

##### Użycie

```js
await dialog.accept(promptText)
```

##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>promptText</var></code><br /><span className="label labelWarning">opcjonalny</span></td>
      <td>`string`</td>
      <td>Tekst do wprowadzenia w oknie prompt. Nie wywołuje żadnych efektów, jeśli typ okna dialogowego nie jest prompt.</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js title="dialogAccept.js"
await dialog.accept();
await dialog.accept(promptText);
```