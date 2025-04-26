---
id: browser-logs
title: Registros del Navegador
---

Cuando se ejecutan pruebas, el navegador puede registrar información importante que te interesa o contra la que quieres hacer aserciones.

<Tabs
defaultValue="bidi"
values={[
    {label: 'Bidi', value: 'bidi'},
    {label: 'Classic (Deprecated)', value: 'classic'
}]
}>

<TabItem value='bidi'>

Cuando utilizas WebDriver Bidi, que es la forma predeterminada en que WebdriverIO automatiza el navegador, puedes suscribirte a eventos provenientes del navegador. Para eventos de registro, debes escuchar `log.entryAdded'`, por ejemplo:

```ts
await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * returns: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))
```

En una prueba, puedes simplemente enviar eventos de registro a un array y hacer aserciones sobre ese array una vez que tu acción haya terminado, por ejemplo:

```ts
import type { local } from 'webdriver'

describe('should log when doing a certain action', () => {
    const logs: string[] = []

    function logEvents (event: local.LogEntry) {
        logs.push(event.text) // add log message to the array
    }

    before(async () => {
        await browser.sessionSubscribe({ events: ['log.entryAdded'] })
        browser.on('log.entryAdded', logEvents)
    })

    it('should trigger the console event', () => {
        // trigger the browser send a message to the console
        ...

        // assert if log was captured
        expect(logs).toContain('Hello Bidi')
    })

    // clean up listener afterwards
    after(() => {
        browser.off('log.entryAdded', logEvents)
    })
})
```

</TabItem>

<TabItem value='classic'>

Si todavía utilizas WebDriver Classic o has desactivado el uso de Bidi a través de la capacidad `'wdio:enforceWebDriverClassic': true`, puedes usar el comando JSONWire `getLogs` para obtener los registros más recientes. Dado que WebdriverIO ha eliminado estos comandos obsoletos, tendrás que usar el [JSONWP Service](https://github.com/webdriverio-community/wdio-jsonwp-service) para volver a agregar el comando a tu instancia del navegador.

Después de haber agregado o iniciado el servicio, puedes obtener registros mediante:

```ts
const logs = await browser.getLogs('browser')
const logMessage = logs.find((log) => log.message.includes('Hello Bidi'))
expect(logMessage).toBeTruthy()
```

Nota: el comando `getLogs` solo puede obtener los registros más recientes del navegador. Eventualmente puede limpiar los mensajes de registro si se vuelven demasiado antiguos.
</TabItem>

</Tabs>

Ten en cuenta que puedes usar este método para recuperar mensajes de error y verificar si tu aplicación ha encontrado algún error.