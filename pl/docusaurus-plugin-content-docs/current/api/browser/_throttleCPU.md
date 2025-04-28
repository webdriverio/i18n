---
id: throttleCPU
title: throttleCPU
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleCPU.ts
---

Ogranicza moc procesora, aby symulować wolniejszy procesor.

:::info

Pamiętaj, że korzystanie z polecenia `throttleCPU` wymaga obsługi protokołu Chrome DevTools i np.
nie może być używane podczas uruchamiania automatycznych testów w chmurze. Protokół Chrome DevTools nie jest instalowany domyślnie,
użyj `npm install puppeteer-core`, aby go zainstalować.
Dowiedz się więcej w sekcji [Protokoły Automatyzacji](/docs/automationProtocols).

:::

##### Użycie

```js
browser.throttleCPU(factor)
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
      <td><code><var>factor</var></code></td>
      <td>`number`</td>
      <td>współczynnik spowolnienia (1 to brak ograniczenia, 2 to spowolnienie 2x, itd.)</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js title="throttleCPU.js"
it('should throttle the CPU', async () => {
    await browser.throttleCPU(2) // 2x slowdown
});
```