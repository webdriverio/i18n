---
id: throttleCPU
title: throttleCPU
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleCPU.ts
---

Drosselt die CPU, um einen langsameren Prozessor zu emulieren.

:::info

Beachten Sie, dass die Verwendung des `throttleCPU`-Befehls Unterstützung für das Chrome DevTools-Protokoll erfordert und z.B.
nicht verwendet werden kann, wenn automatisierte Tests in der Cloud ausgeführt werden. Das Chrome DevTools-Protokoll ist nicht standardmäßig installiert,
verwenden Sie `npm install puppeteer-core`, um es zu installieren.
Erfahren Sie mehr im Abschnitt [Automation Protocols](/docs/automationProtocols).

:::

##### Verwendung

```js
browser.throttleCPU(factor)
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
      <td><code><var>factor</var></code></td>
      <td>`number`</td>
      <td>Verlangsamungsfaktor (1 bedeutet keine Drosselung, 2 ist 2x Verlangsamung, usw.)</td>
    </tr>
  </tbody>
</table>

##### Beispiel

```js title="throttleCPU.js"
it('should throttle the CPU', async () => {
    await browser.throttleCPU(2) // 2x slowdown
});
```