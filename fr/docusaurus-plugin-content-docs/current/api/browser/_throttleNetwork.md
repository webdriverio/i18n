---
id: throttleNetwork
title: throttleNetwork
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleNetwork.ts
---

Limitez les capacités réseau du navigateur. Cela peut aider à
simuler certains scénarios où un utilisateur perd sa connexion internet
et votre application doit y faire face.

De nombreux préréglages sont disponibles avec des configurations par défaut pour faciliter l'utilisation.
Il s'agit de `offline`, `GPRS`, `Regular2G`, `Good2G`, `Regular3G`, `Good3G`,
`Regular4G`, `DSL`, `WiFi`, `online`.

Vous pouvez voir les valeurs de ces préréglages [dans le code source](https://github.com/webdriverio/webdriverio/blob/6824e4eb118a8d20685f12f4bc42f13fd56f8a25/packages/webdriverio/src/commands/browser/throttleNetwork.js#L29).

:::info

Notez que l'utilisation de la commande `throttleNetwork` nécessite la prise en charge du protocole Chrome DevTools et, par exemple,
ne peut pas être utilisée lors de l'exécution de tests automatisés dans le cloud. Chrome DevTools protocol n'est pas installé par défaut,
utilisez `npm install puppeteer-core` pour l'installer.
En savoir plus dans la section [Protocoles d'automatisation](/docs/automationProtocols).

:::

##### Utilisation

```js
browser.throttleNetwork({ offline, latency, downloadThroughput, uploadThroughput })
```

##### Paramètres

<table>
  <thead>
    <tr>
      <th>Nom</th><th>Type</th><th>Détails</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`ThrottleOptions`</td>
      <td>paramètres pour la limitation</td>
    </tr>
    <tr>
      <td><code><var>params.offline</var></code></td>
      <td>`boolean`</td>
      <td>Vrai pour simuler une déconnexion internet.</td>
    </tr>
    <tr>
      <td><code><var>params.latency</var></code></td>
      <td>`number`</td>
      <td>Latence minimale entre l'envoi de la requête et la réception des en-têtes de réponse (ms).</td>
    </tr>
    <tr>
      <td><code><var>params.downloadThroughput</var></code></td>
      <td>`number`</td>
      <td>Débit de téléchargement agrégé maximal (octets/sec). -1 désactive la limitation du téléchargement.</td>
    </tr>
    <tr>
      <td><code><var>params.uploadThroughput</var></code></td>
      <td>`number`</td>
      <td>Débit d'envoi agrégé maximal (octets/sec). -1 désactive la limitation de l'envoi.</td>
    </tr>
  </tbody>
</table>

##### Exemple

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