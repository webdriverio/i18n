---
id: throttleCPU
title: throttleCPU
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleCPU.ts
---

Limita la CPU per emulare un processore più lento.

:::info

Nota che l'utilizzo del comando `throttleCPU` richiede il supporto per il protocollo Chrome DevTools e, ad esempio,
non può essere utilizzato quando si eseguono test automatizzati nel cloud. Il protocollo Chrome DevTools non è installato per impostazione predefinita,
usa `npm install puppeteer-core` per installarlo.
Scopri di più nella sezione [Protocolli di automazione](/docs/automationProtocols).

:::

##### Utilizzo

```js
browser.throttleCPU(factor)
```

##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>factor</var></code></td>
      <td>`number`</td>
      <td>fattore di rallentamento (1 significa nessun throttling, 2 è un rallentamento 2x, ecc.)</td>
    </tr>
  </tbody>
</table>

##### Esempio

```js title="throttleCPU.js"
it('should throttle the CPU', async () => {
    await browser.throttleCPU(2) // 2x slowdown
});
```