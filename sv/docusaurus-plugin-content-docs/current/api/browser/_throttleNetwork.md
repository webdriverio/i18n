---
id: throttleNetwork
title: throttleNetwork
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleNetwork.ts
---

Begränsa nätverkskapaciteten för webbläsaren. Detta kan hjälpa till att
simulera vissa scenarier där en användare förlorar sin internetanslutning
och din applikation behöver hantera det.

Det finns många förinställningar tillgängliga med standardkonfigurationer för enkel användning.
De är `offline`, `GPRS`, `Regular2G`, `Good2G`, `Regular3G`, `Good3G`,
`Regular4G`, `DSL`, `WiFi`, `online`.

Du kan se värdena för dessa förinställningar [i källkoden](https://github.com/webdriverio/webdriverio/blob/6824e4eb118a8d20685f12f4bc42f13fd56f8a25/packages/webdriverio/src/commands/browser/throttleNetwork.js#L29).

:::info

Observera att användning av kommandot `throttleNetwork` kräver stöd för Chrome DevTools-protokollet och kan t.ex.
inte användas när automatiserade tester körs i molnet. Chrome DevTools-protokollet installeras inte som standard,
använd `npm install puppeteer-core` för att installera det.
Läs mer i avsnittet [Automation Protocols](/docs/automationProtocols).

:::

##### Användning

```js
browser.throttleNetwork({ offline, latency, downloadThroughput, uploadThroughput })
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
      <td><code><var>params</var></code></td>
      <td>`ThrottleOptions`</td>
      <td>parametrar för begränsning</td>
    </tr>
    <tr>
      <td><code><var>params.offline</var></code></td>
      <td>`boolean`</td>
      <td>True för att simulera internetfrånkoppling.</td>
    </tr>
    <tr>
      <td><code><var>params.latency</var></code></td>
      <td>`number`</td>
      <td>Minsta latens från begäran till mottagande av svarshuvud (ms).</td>
    </tr>
    <tr>
      <td><code><var>params.downloadThroughput</var></code></td>
      <td>`number`</td>
      <td>Maximal aggregerad nedladdningshastighet (bytes/sek). -1 inaktiverar nedladdningsbegränsning.</td>
    </tr>
    <tr>
      <td><code><var>params.uploadThroughput</var></code></td>
      <td>`number`</td>
      <td>Maximal aggregerad uppladdningshastighet (bytes/sek). -1 inaktiverar uppladdningsbegränsning.</td>
    </tr>
  </tbody>
</table>

##### Exempel

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