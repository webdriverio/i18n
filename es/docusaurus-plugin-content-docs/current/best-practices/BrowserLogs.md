---
id: browser-logs
title: Registros del navegador
description: "Captura los registros de la consola del navegador durante una prueba con los eventos de registro de WebDriver Bidi y verifica los mensajes recopilados."
---

Al ejecutar pruebas, el navegador puede registrar información importante que te interese o sobre la que quieras hacer aserciones.

<Tabs
defaultValue="bidi"
values={[
    {label: 'Bidi', value: 'bidi'},
    {label: 'Classic (Deprecated)', value: 'classic'
}]
}>

<TabItem value='bidi'>

Al usar WebDriver Bidi, que es la forma predeterminada en que WebdriverIO automatiza el navegador, puedes suscribirte a los eventos que provienen del navegador. Para los eventos de registro, debes escuchar `log.entryAdded'`, por ejemplo:

```ts
await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * devuelve: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))
```

En una prueba, simplemente puedes agregar los eventos de registro a un array y hacer aserciones sobre ese array una vez que tu acción haya terminado, por ejemplo:

```ts
import type { local } from 'webdriver'

describe('should log when doing a certain action', () => {
    const logs: string[] = []

    function logEvents (event: local.LogEntry) {
        logs.push(event.text) // agrega el mensaje de registro al array
    }

    before(async () => {
        await browser.sessionSubscribe({ events: ['log.entryAdded'] })
        browser.on('log.entryAdded', logEvents)
    })

    it('should trigger the console event', () => {
        // hace que el navegador envíe un mensaje a la consola
        ...

        // verifica si se capturó el registro
        expect(logs).toContain('Hello Bidi')
    })

    // limpia el listener después
    after(() => {
        browser.off('log.entryAdded', logEvents)
    })
})
```

</TabItem>

<TabItem value='classic'>

Si Bidi está deshabilitado con la capability `'wdio:enforceWebDriverClassic': true`, las sesiones de Chromium aún pueden leer el búfer de registros del navegador con `getLogs`:

```ts
const logs = await browser.getLogs('browser')
const logMessage = logs.find((log) => log.message.includes('Hello Bidi'))
expect(logMessage).toBeTruthy()
```

Nota: el comando `getLogs` solo puede obtener los registros más recientes del navegador. Es posible que eventualmente elimine los mensajes de registro si se vuelven demasiado antiguos.
</TabItem>

</Tabs>

Ten en cuenta que puedes usar este método para obtener mensajes de error y verificar si tu aplicación ha encontrado algún error.