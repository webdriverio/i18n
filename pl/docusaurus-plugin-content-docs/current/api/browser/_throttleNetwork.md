---
id: throttleNetwork
title: throttleNetwork
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleNetwork.ts
---

Ograniczanie możliwości sieciowych przeglądarki. Może to pomóc w
symulowaniu określonych scenariuszy, w których użytkownik traci połączenie internetowe
i Twoja aplikacja musi się do tego dostosować.

Dostępnych jest wiele predefiniowanych ustawień z domyślnymi konfiguracjami dla ułatwienia użytkowania.
Są to `offline`, `GPRS`, `Regular2G`, `Good2G`, `Regular3G`, `Good3G`,
`Regular4G`, `DSL`, `WiFi`, `online`.

Możesz zobaczyć wartości dla tych predefiniowanych ustawień [w kodzie źródłowym](https://github.com/webdriverio/webdriverio/blob/6824e4eb118a8d20685f12f4bc42f13fd56f8a25/packages/webdriverio/src/commands/browser/throttleNetwork.js#L29).

:::info

Zauważ, że korzystanie z polecenia `throttleNetwork` wymaga wsparcia dla protokołu Chrome DevTools i np.
nie może być używane podczas uruchamiania zautomatyzowanych testów w chmurze. Chrome DevTools protocol nie jest instalowany domyślnie,
użyj `npm install puppeteer-core`, aby go zainstalować.
Dowiedz się więcej w sekcji [Protokoły automatyzacji](/docs/automationProtocols).

:::

##### Użycie

```js
browser.throttleNetwork({ offline, latency, downloadThroughput, uploadThroughput })
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
      <td><code><var>params</var></code></td>
      <td>`ThrottleOptions`</td>
      <td>parametry do ograniczania</td>
    </tr>
    <tr>
      <td><code><var>params.offline</var></code></td>
      <td>`boolean`</td>
      <td>Wartość true, aby symulować odłączenie od internetu.</td>
    </tr>
    <tr>
      <td><code><var>params.latency</var></code></td>
      <td>`number`</td>
      <td>Minimalne opóźnienie od wysłania żądania do otrzymania nagłówków odpowiedzi (ms).</td>
    </tr>
    <tr>
      <td><code><var>params.downloadThroughput</var></code></td>
      <td>`number`</td>
      <td>Maksymalna zagregowana przepustowość pobierania (bajty/sek). -1 wyłącza ograniczanie pobierania.</td>
    </tr>
    <tr>
      <td><code><var>params.uploadThroughput</var></code></td>
      <td>`number`</td>
      <td>Maksymalna zagregowana przepustowość wysyłania (bajty/sek). -1 wyłącza ograniczanie wysyłania.</td>
    </tr>
  </tbody>
</table>

##### Przykład

```js title="throttleNetwork.js"
it('should throttle the network', async () => {
    // via static string preset
    await browser.throttleNetwork('Regular3G')

    // via custom values
    await browser.throttleNetwork({
        offline: false,
        downloadThroughput: 200 * 1024 / 8,
        uploadThroughput: 200 * 1024 / 8,
        latency: 20
    })
});
```