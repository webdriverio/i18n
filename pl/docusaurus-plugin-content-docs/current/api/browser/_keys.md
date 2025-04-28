---
id: keys
title: klawisze
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/keys.ts
---

Wysyłanie sekwencji naciśnięć klawiszy do "aktywnego" elementu. Możesz aktywować element wejściowy po prostu klikając
na niego. Aby używać znaków takich jak "Strzałka w lewo" lub "Backspace", zaimportuj obiekt `Key` z pakietu WebdriverIO.

Modyfikatory jak `Control`, `Shift`, `Alt` i `Command` pozostaną wciśnięte, więc musisz nacisnąć je ponownie, aby je zwolnić.
Modyfikowanie kliknięcia jednak wymaga użycia WebDriver Actions API poprzez
metodę [performActions](https://webdriver.io/docs/api/webdriver#performactions).

:::info

Klawisze kontrolne różnią się w zależności od systemu operacyjnego, na którym działa przeglądarka, np. MacOS: `Command` i Windows: `Control`.
WebdriverIO zapewnia międzyprzeglądarkowy klawisz modyfikujący o nazwie `Ctrl` (patrz przykład poniżej).

:::

##### Użycie

```js
browser.keys(value)
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
      <td><code><var>value</var></code></td>
      <td>`String, String[]`</td>
      <td>Sekwencja klawiszy do wpisania. Musi być dostarczony ciąg znaków lub tablica.</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js reference title="keys.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/355434bdef13d29608d6d5fbfbeaa034c8a2aa74/keys/keys.js#L1-L17
```