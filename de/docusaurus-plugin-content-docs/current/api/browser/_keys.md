---
id: keys
title: Tasten
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/keys.ts
---

Sendet eine Folge von Tastenanschlägen an das "aktive" Element. Du kannst ein Eingabeelement aktiv machen, indem du einfach darauf klickst. Um Zeichen wie "Pfeil nach links" oder "Rücktaste" zu verwenden, importiere das `Key`-Objekt aus dem WebdriverIO-Paket.

Modifikatoren wie `Control`, `Shift`, `Alt` und `Command` bleiben gedrückt, sodass du sie erneut auslösen musst, um sie freizugeben. Um einen Klick zu modifizieren, musst du jedoch die WebDriver Actions API über die Methode [performActions](https://webdriver.io/docs/api/webdriver#performactions) verwenden.

:::info

Steuertasten unterscheiden sich je nach Betriebssystem, auf dem der Browser läuft, z.B. MacOS: `Command` und Windows: `Control`.
WebdriverIO bietet eine browserübergreifende Steuerungstaste namens `Ctrl` (siehe Beispiel unten).

:::

##### Verwendung

```js
browser.keys(value)
```

##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Type</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>value</var></code></td>
      <td>`String, String[]`</td>
      <td>Die Folge der zu tippenden Tasten. Ein Array oder eine Zeichenfolge muss bereitgestellt werden.</td>
    </tr>
  </tbody>
</table>

##### Beispiel

```js reference title="keys.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/355434bdef13d29608d6d5fbfbeaa034c8a2aa74/keys/keys.js#L1-L17
```
