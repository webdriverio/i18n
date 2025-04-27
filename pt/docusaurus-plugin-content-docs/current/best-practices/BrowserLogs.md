---
id: browser-logs
title: Logs do Navegador
description: Logs do Navegador
---

Ao executar testes, o navegador pode registrar informações importantes que você pode ter interesse ou queira verificar.

<Tabs
defaultValue="bidi"
values={[
    {label: 'Bidi', value: 'bidi'},
    {label: 'Classic (Deprecated)', value: 'classic'
}]
}>

<TabItem value='bidi'>

Ao usar o WebDriver Bidi, que é a forma padrão como o WebdriverIO automatiza o navegador, você pode se inscrever em eventos vindos do navegador. Para eventos de log, você deve escutar `log.entryAdded'`, por exemplo:

```ts
await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * returns: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))
```

Em um teste, você pode simplesmente enviar os eventos de log para um array e verificar esse array quando sua ação for concluída, por exemplo:

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

Se você ainda usa o WebDriver Classic ou desabilitou o uso do Bidi através da capacidade `'wdio:enforceWebDriverClassic': true`, você pode usar o comando JSONWire `getLogs` para buscar os logs mais recentes. Como o WebdriverIO removeu esses comandos obsoletos, você precisará usar o [JSONWP Service](https://github.com/webdriverio-community/wdio-jsonwp-service) para adicionar o comando de volta à sua instância do navegador.

Depois de adicionar ou iniciar o serviço, você pode buscar logs via:

```ts
const logs = await browser.getLogs('browser')
const logMessage = logs.find((log) => log.message.includes('Hello Bidi'))
expect(logMessage).toBeTruthy()
```

Nota: o comando `getLogs` só pode buscar os logs mais recentes do navegador. Ele pode limpar as mensagens de log eventualmente se elas ficarem muito antigas.
</TabItem>

</Tabs>

Observe que você pode usar este método para recuperar mensagens de erro e verificar se sua aplicação encontrou algum erro.