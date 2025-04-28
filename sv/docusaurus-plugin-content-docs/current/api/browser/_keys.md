---
id: keys
title: tangenter
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/keys.ts
---

Skicka en sekvens av tangenttryckningar till det "aktiva" elementet. Du kan göra ett input-element aktivt genom att klicka på det. För att använda tecken som "Vänster pil" eller "Backspace", importera `Key`-objektet från WebdriverIO-paketet.

Modifieringstangenter som `Control`, `Shift`, `Alt` och `Command` förblir nedtryckta så du behöver trycka på dem igen för att släppa dem. Att modifiera ett klick kräver dock att du använder WebDriver Actions API genom metoden [performActions](https://webdriver.io/docs/api/webdriver#performactions).

:::info

Kontrolltangenter skiljer sig beroende på vilket operativsystem webbläsaren körs på, t.ex. MacOS: `Command` och Windows: `Control`.
WebdriverIO tillhandahåller en plattformsoberoende modifieringstangent kallad `Ctrl` (se exempel nedan).

:::

##### Användning

```js
browser.keys(value)
```

##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>value</var></code></td>
      <td>`String, String[]`</td>
      <td>Sekvensen av tangenter att skriva. En array eller sträng måste tillhandahållas.</td>
    </tr>
  </tbody>
</table>

##### Exempel

```js reference title="keys.js" useHTTPS
https://github.com/webdriverio/example-recipes/blob/355434bdef13d29608d6d5fbfbeaa034c8a2aa74/keys/keys.js#L1-L17
```