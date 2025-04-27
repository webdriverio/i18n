---
id: browser-logs
title: Journaux du Navigateur
---

Lors de l'exécution des tests, le navigateur peut enregistrer des informations importantes qui vous intéressent ou contre lesquelles vous souhaitez effectuer des assertions.

<Tabs
defaultValue="bidi"
values={[
    {label: 'Bidi', value: 'bidi'},
    {label: 'Classic (Deprecated)', value: 'classic'
}]
}>

<TabItem value='bidi'>

Lorsque vous utilisez WebDriver Bidi, qui est la méthode par défaut utilisée par WebdriverIO pour automatiser le navigateur, vous pouvez vous abonner aux événements provenant du navigateur. Pour les événements de journal, vous devez écouter `log.entryAdded'`, par exemple :

```ts
await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * returns: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))
```

Dans un test, vous pouvez simplement ajouter les événements de journal à un tableau et vérifier ce tableau une fois votre action terminée, par exemple :

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

Si vous utilisez toujours WebDriver Classic ou si vous avez désactivé l'utilisation de Bidi via la capacité `'wdio:enforceWebDriverClassic': true`, vous pouvez utiliser la commande JSONWire `getLogs` pour récupérer les derniers journaux. Comme WebdriverIO a supprimé ces commandes obsolètes, vous devrez utiliser le [JSONWP Service](https://github.com/webdriverio-community/wdio-jsonwp-service) pour ajouter la commande à votre instance de navigateur.

Après avoir ajouté ou initialisé le service, vous pouvez récupérer les journaux via :

```ts
const logs = await browser.getLogs('browser')
const logMessage = logs.find((log) => log.message.includes('Hello Bidi'))
expect(logMessage).toBeTruthy()
```

Remarque : la commande `getLogs` ne peut récupérer que les journaux les plus récents du navigateur. Elle peut éventuellement nettoyer les messages de journal s'ils deviennent trop anciens.
</TabItem>

</Tabs>

Veuillez noter que vous pouvez utiliser cette méthode pour récupérer les messages d'erreur et vérifier si votre application a rencontré des erreurs.