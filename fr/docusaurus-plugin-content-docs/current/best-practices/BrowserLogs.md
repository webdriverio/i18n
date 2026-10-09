---
id: browser-logs
title: Journaux du navigateur
description: "Capturez les journaux de la console du navigateur pendant un test grâce aux événements de log WebDriver Bidi et effectuez des assertions sur les messages collectés."
---

Lors de l'exécution des tests, le navigateur peut journaliser des informations importantes qui vous intéressent ou sur lesquelles vous souhaitez effectuer des assertions.

<Tabs
defaultValue="bidi"
values={[
    {label: 'Bidi', value: 'bidi'},
    {label: 'Classic (Deprecated)', value: 'classic'
}]
}>

<TabItem value='bidi'>

Lorsque vous utilisez WebDriver Bidi, qui est la manière par défaut dont WebdriverIO automatise le navigateur, vous pouvez vous abonner aux événements provenant du navigateur. Pour les événements de log, vous devez écouter `log.entryAdded'`, par exemple :

```ts
await browser.sessionSubscribe({ events: ['log.entryAdded'] })

/**
 * returns: {"type":"console","method":"log","realm":null,"args":[{"type":"string","value":"Hello Bidi"}],"level":"info","text":"Hello Bidi","timestamp":1657282076037}
 */
browser.on('log.entryAdded', (entryAdded) => console.log('received %s', entryAdded))
```

Dans un test, vous pouvez simplement ajouter les événements de log à un tableau et effectuer une assertion sur ce tableau une fois votre action terminée, par exemple :

```ts
import type { local } from 'webdriver'

describe('should log when doing a certain action', () => {
    const logs: string[] = []

    function logEvents (event: local.LogEntry) {
        logs.push(event.text) // ajoute le message de log au tableau
    }

    before(async () => {
        await browser.sessionSubscribe({ events: ['log.entryAdded'] })
        browser.on('log.entryAdded', logEvents)
    })

    it('should trigger the console event', () => {
        // déclenche l'envoi d'un message à la console par le navigateur
        ...

        // vérifie si le log a été capturé
        expect(logs).toContain('Hello Bidi')
    })

    // nettoie l'écouteur par la suite
    after(() => {
        browser.off('log.entryAdded', logEvents)
    })
})
```

</TabItem>

<TabItem value='classic'>

Si Bidi est désactivé avec la capability `'wdio:enforceWebDriverClassic': true`, les sessions Chromium peuvent toujours lire le tampon de logs du navigateur avec `getLogs` :

```ts
const logs = await browser.getLogs('browser')
const logMessage = logs.find((log) => log.message.includes('Hello Bidi'))
expect(logMessage).toBeTruthy()
```

Remarque : la commande `getLogs` ne peut récupérer que les logs les plus récents du navigateur. Elle peut finir par supprimer des messages de log s'ils deviennent trop anciens.
</TabItem>

</Tabs>

Veuillez noter que vous pouvez utiliser cette méthode pour récupérer les messages d'erreur et vérifier si votre application a rencontré des erreurs.