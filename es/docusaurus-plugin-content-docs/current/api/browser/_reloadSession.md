---
id: reloadSession
title: reloadSession
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/reloadSession.ts
---

Crea una nueva sesión de Selenium con tus capacidades actuales. Esto es útil si estás
probando aplicaciones altamente estatales donde necesitas limpiar la sesión del navegador entre
las pruebas en tu archivo de especificaciones para evitar crear cientos de archivos de prueba individuales con WDIO.
Sin embargo, ten cuidado, este comando afecta enormemente el tiempo de prueba ya que generar
nuevas sesiones de Selenium consume mucho tiempo, especialmente cuando se utilizan servicios en la nube.

Los parámetros de conexión como hostname, puerto, protocolo, etc. pueden añadirse junto con
browserName cuando quieres conectarte a un servicio remoto diferente. Esto es útil
en una situación, por ejemplo, donde comienzas una prueba en una aplicación nativa y necesitas verificar
datos en una aplicación web.

Si comienzas desde un servicio remoto, puedes pasar 0.0.0.0 como hostname si quieres
cambiar a controladores locales.

##### Uso

```js
browser.reloadSession(newCapabilities)
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
      <td><code><var>newCapabilities</var></code><br /><span className="label labelWarning">opcional</span></td>
      <td>`WebdriverIO.Capabilities`</td>
      <td>nuevas capacidades para crear una sesión</td>
    </tr>
  </tbody>
</table>

##### Ejemplo

```js title="reloadSync.js"
it('should reload my session with current capabilities', async () => {
    console.log(browser.sessionId) // outputs: e042b3f3cd5a479da4e171825e96e655
    await browser.reloadSession()
    console.log(browser.sessionId) // outputs: 9a0d9bf9d4864160aa982c50cf18a573
})

it('should reload my session with new capabilities', async () => {
    console.log(browser.capabilities.browserName) // outputs: chrome
    await browser.reloadSession({
        browserName: 'firefox'
    })
    console.log(browser.capabilities.browserName) // outputs: firefox
})

it('should reload my session with new remote', async () => {
    console.log(browser.capabilities.browserName) // outputs: chrome
    await browser.reloadSession({
        protocol: 'https',
        host: '0.0.0.1',
        port: 4444,
        path: '/wd/hub',
        browserName: 'firefox'
    })
    console.log(browser.capabilities.browserName) // outputs: firefox
})
```