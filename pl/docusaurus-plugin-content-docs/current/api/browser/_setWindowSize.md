---
id: setWindowSize
title: setWindowSize
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/setWindowSize.ts
---

Zmienia rozmiar okna przeglądarki zgodnie z podaną szerokością i wysokością. W zależności od systemu operacyjnego, niektóre przeglądarki mogą nie pozwalać na ustawienie mniejszej szerokości niż `500px`. Jeśli chcesz naśladować viewport np. iPhone'a, powinieneś rozważyć użycie komendy `setViewport`.

##### Użycie

```js
browser.setWindowSize(width, height)
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
      <td><code><var>width</var></code></td>
      <td>`number`</td>
      <td>przeglądarka zostanie zmieniona do podanej szerokości</td>
    </tr>
    <tr>
      <td><code><var>height</var></code></td>
      <td>`number`</td>
      <td>przeglądarka zostanie zmieniona do podanej wysokości</td>
    </tr>
  </tbody>
</table>

##### Zwraca

- **&lt;Null|Object&gt;**
            **<code><var>return</var></code>:**  Null dla przeglądarek *NO*W3C i Object `{x, y, width, height}` dla przeglądarek W3C