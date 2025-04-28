---
id: scroll
title: scroll
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/scroll.ts
---

Skrolla inom webbläsarens vy. Observera att `x` och `y` koordinater är relativa till den nuvarande 
skrollpositionen, därför är `browser.scroll(0, 0)` en handling utan effekt.

##### Användning

```js
browser.scroll(x, y)
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
      <td><code><var>x=0</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`number`</td>
      <td>horisontell skrollposition (standard: `0`)</td>
    </tr>
    <tr>
      <td><code><var>y=0</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`number`</td>
      <td>vertikal skrollposition (standard: `0`)</td>
    </tr>
  </tbody>
</table>

##### Exempel

```js title="scroll.js"
it('should demonstrate the scroll command', async () => {
    await browser.url('https://webdriver.io')

    console.log(await browser.execute(() => window.scrollY)) // returns 0
    await browser.scroll(0, 200)
    console.log(await browser.execute(() => window.scrollY)) // returns 200
});
```