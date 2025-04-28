---
id: saveScreenshot
title: saveScreenshot
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/saveScreenshot.ts
---

Zapisz zrzut ekranu elementu do pliku PNG na swoim systemie operacyjnym.

##### Użycie

```js
$(selector).saveScreenshot(filename)
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
      <td><code><var>filename</var></code></td>
      <td>`String`</td>
      <td>ścieżka do wygenerowanego obrazu (wymagane rozszerzenie `.png`) względem katalogu wykonania</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js title="saveScreenshot.js"
it('should save a screenshot of the browser view', async () => {
    const elem = await $('#someElem');
    await elem.saveScreenshot('./some/path/elemScreenshot.png');
});
```

##### Zwraca

- **&lt;Buffer&gt;**
            **<code><var>return</var></code>:**             bufor zrzutu ekranu