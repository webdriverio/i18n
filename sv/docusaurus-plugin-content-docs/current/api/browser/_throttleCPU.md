---
id: throttleCPU
title: throttleCPU
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleCPU.ts
---

Begränsar CPU för att simulera en långsammare processor.

:::info

Observera att användning av `throttleCPU`-kommandot kräver stöd för Chrome DevTools-protokollet och kan t.ex.
inte användas när automatiserade tester körs i molnet. Chrome DevTools-protokollet installeras inte som standard,
använd `npm install puppeteer-core` för att installera det.
Läs mer i avsnittet [Automation Protocols](/docs/automationProtocols).

:::

##### Användning

```js
browser.throttleCPU(factor)
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
      <td><code><var>factor</var></code></td>
      <td>`number`</td>
      <td>fördröjningsfaktor (1 är ingen begränsning, 2 är 2x långsammare, osv)</td>
    </tr>
  </tbody>
</table>

##### Exempel

```js title="throttleCPU.js"
it('should throttle the CPU', async () => {
    await browser.throttleCPU(2) // 2x slowdown
});
```