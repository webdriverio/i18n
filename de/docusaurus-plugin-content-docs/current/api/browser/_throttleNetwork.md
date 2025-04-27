---
id: throttleNetwork
title: throttleNetwork
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleNetwork.ts
---

Drosseln Sie die Netzwerkfähigkeiten des Browsers. Dies kann helfen, 
bestimmte Szenarien zu simulieren, in denen ein Benutzer seine Internetverbindung 
verliert und Ihre App darauf reagieren muss.

Es stehen viele Voreinstellungen mit Standardkonfigurationen zur einfachen Verwendung zur Verfügung.
Diese sind `offline`, `GPRS`, `Regular2G`, `Good2G`, `Regular3G`, `Good3G`,
`Regular4G`, `DSL`, `WiFi`, `online`.

Sie können die Werte für diese Voreinstellungen [im Quellcode einsehen](https://github.com/webdriverio/webdriverio/blob/6824e4eb118a8d20685f12f4bc42f13fd56f8a25/packages/webdriverio/src/commands/browser/throttleNetwork.js#L29).

:::info

Beachten Sie, dass die Verwendung des `throttleNetwork`-Befehls Unterstützung für das Chrome DevTools-Protokoll erfordert und z.B.
nicht verwendet werden kann, wenn automatisierte Tests in der Cloud ausgeführt werden. Chrome DevTools-Protokoll ist nicht standardmäßig installiert,
verwenden Sie `npm install puppeteer-core`, um es zu installieren.
Erfahren Sie mehr im Abschnitt [Automatisierungsprotokolle](/docs/automationProtocols).

:::

##### Verwendung

```js
browser.throttleNetwork({ offline, latency, downloadThroughput, uploadThroughput })
```

##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`ThrottleOptions`</td>
      <td>Parameter für die Drosselung</td>
    </tr>
    <tr>
      <td><code><var>params.offline</var></code></td>
      <td>`boolean`</td>
      <td>True, um eine Internetunterbrechung zu emulieren.</td>
    </tr>
    <tr>
      <td><code><var>params.latency</var></code></td>
      <td>`number`</td>
      <td>Minimale Latenz vom Senden der Anfrage bis zum Empfang der Antwort-Header (ms).</td>
    </tr>
    <tr>
      <td><code><var>params.downloadThroughput</var></code></td>
      <td>`number`</td>
      <td>Maximaler aggregierter Download-Durchsatz (Bytes/Sek). -1 deaktiviert die Download-Drosselung.</td>
    </tr>
    <tr>
      <td><code><var>params.uploadThroughput</var></code></td>
      <td>`number`</td>
      <td>Maximaler aggregierter Upload-Durchsatz (Bytes/Sek). -1 deaktiviert die Upload-Drosselung.</td>
    </tr>
  </tbody>
</table>

##### Beispiel

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