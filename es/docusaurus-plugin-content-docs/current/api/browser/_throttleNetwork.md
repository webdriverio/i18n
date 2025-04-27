---
id: throttleNetwork
title: throttleNetwork
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/throttleNetwork.ts
---

Limita las capacidades de red del navegador. Esto puede ayudar a
emular ciertos escenarios donde un usuario pierde su conexión a internet
y tu aplicación necesita abordar esa situación.

Hay muchos preajustes disponibles con configuraciones predeterminadas para facilitar su uso.
Estos son `offline`, `GPRS`, `Regular2G`, `Good2G`, `Regular3G`, `Good3G`,
`Regular4G`, `DSL`, `WiFi`, `online`.

Puedes ver los valores para estos preajustes [en el código fuente](https://github.com/webdriverio/webdriverio/blob/6824e4eb118a8d20685f12f4bc42f13fd56f8a25/packages/webdriverio/src/commands/browser/throttleNetwork.js#L29).

:::info

Ten en cuenta que usar el comando `throttleNetwork` requiere soporte para el protocolo Chrome DevTools y, por ejemplo,
no se puede usar cuando se ejecutan pruebas automatizadas en la nube. El protocolo Chrome DevTools no está instalado por defecto,
usa `npm install puppeteer-core` para instalarlo.
Obtén más información en la sección [Protocolos de Automatización](/docs/automationProtocols).

:::

##### Uso

```js
browser.throttleNetwork({ offline, latency, downloadThroughput, uploadThroughput })
```

##### Parámetros

<table>
  <thead>
    <tr>
      <th>Nombre</th><th>Tipo</th><th>Detalles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>params</var></code></td>
      <td>`ThrottleOptions`</td>
      <td>parámetros para la limitación</td>
    </tr>
    <tr>
      <td><code><var>params.offline</var></code></td>
      <td>`boolean`</td>
      <td>True para emular la desconexión de internet.</td>
    </tr>
    <tr>
      <td><code><var>params.latency</var></code></td>
      <td>`number`</td>
      <td>Latencia mínima desde el envío de la solicitud hasta la recepción de los encabezados de respuesta (ms).</td>
    </tr>
    <tr>
      <td><code><var>params.downloadThroughput</var></code></td>
      <td>`number`</td>
      <td>Rendimiento máximo de descarga agregado (bytes/seg). -1 desactiva la limitación de descarga.</td>
    </tr>
    <tr>
      <td><code><var>params.uploadThroughput</var></code></td>
      <td>`number`</td>
      <td>Rendimiento máximo de carga agregado (bytes/seg). -1 desactiva la limitación de carga.</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

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