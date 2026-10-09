---
id: browser-logs
title: Logs do Navegador
description: "Capture os logs do console do navegador durante um teste com eventos de log do WebDriver Bidi e faça asserções sobre as mensagens coletadas."
---

Ao executar testes, o navegador pode registrar informações importantes nas quais você está interessado ou sobre as quais deseja fazer asserções.

<Tabs
defaultValue="bidi"
values={[
    {label: 'Bidi', value: 'bidi'},
    {label: 'Classic (Descontinuado)', value: 'classic'
}]
}>

<TabItem value='bidi'>

Ao usar o WebDriver Bidi, que é a forma padrão como o WebdriverIO automatiza o navegador, você pode se inscrever em eventos vindos do navegador. Para eventos de log, você deve escutar `log.entryAdded'`, por exemplo:

```ts
await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * retorna: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))
```

Em um teste, você pode simplesmente adicionar os eventos de log a um array e fazer asserções sobre esse array assim que sua ação for concluída, por exemplo:

```ts
import type { local } from 'webdriver'

describe('should log when doing a certain action', () => {
    const logs: string[] = []

    function logEvents (event: local.LogEntry) {
        logs.push(event.text) // adiciona a mensagem de log ao array
    }

    before(async () => {
        await browser.sessionSubscribe({ events: ['log.entryAdded'] })
        browser.on('log.entryAdded', logEvents)
    })

    it('should trigger the console event', () => {
        // faz o navegador enviar uma mensagem para o console
        ...

        // verifica se o log foi capturado
        expect(logs).toContain('Hello Bidi')
    })

    // remove o listener depois
    after(() => {
        browser.off('log.entryAdded', logEvents)
    })
})
```

</TabItem>

<TabItem value='classic'>

Se o Bidi estiver desativado com a capability `'wdio:enforceWebDriverClassic': true`, sessões Chromium ainda podem ler o buffer de logs do navegador com `getLogs`:

```ts
const logs = await browser.getLogs('browser')
const logMessage = logs.find((log) => log.message.includes('Hello Bidi'))
expect(logMessage).toBeTruthy()
```

Observação: o comando `getLogs` só consegue obter os logs mais recentes do navegador. Ele pode eventualmente descartar mensagens de log se elas ficarem muito antigas.
</TabItem>

</Tabs>

Observe que você pode usar este método para recuperar mensagens de erro e verificar se sua aplicação encontrou algum erro.