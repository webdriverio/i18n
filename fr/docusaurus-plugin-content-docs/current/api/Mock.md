---
id: mock
title: L'objet Mock
---

L'objet mock est un objet qui représente un mock réseau et contient des informations sur les requêtes qui correspondaient aux `url` et `filterOptions` donnés. Il peut être obtenu à l'aide de la commande [`mock`](/docs/api/browser/mock).

:::info

Notez que l'utilisation de la commande `mock` nécessite la prise en charge du protocole Chrome DevTools.
Cette prise en charge est assurée si vous exécutez des tests localement dans un navigateur basé sur Chromium ou si
vous utilisez une Selenium Grid v4 ou supérieure. Cette commande ne peut __pas__ être utilisée lors de l'exécution
de tests automatisés dans le cloud. Pour en savoir plus, consultez la section [Protocoles d'automatisation](/docs/automationProtocols).

:::

Vous pouvez en savoir plus sur le mock des requêtes et des réponses dans WebdriverIO dans notre guide [Mocks et Spies](/docs/mocksandspies).

## Multi-remote

Sur un navigateur [multi-remote](/docs/multiremote), [`browser.mock()`](/docs/api/browser/mock) renvoie un `MultiRemoteMock` au lieu de cet objet. `instances` liste les noms des navigateurs, et `getInstance(name)` renvoie le `Mock` pour ce navigateur. `respond()`, `restore()` et les autres méthodes ci-dessous s'exécutent sur chaque instance. `calls` reste sur le mock de chaque instance : `mock.getInstance('myChromeBrowser').calls`.

`getInstance` lève l'erreur `Multi-remote object has no instance named "<name>"` lorsque `name` ne fait pas partie de `instances`.

## Propriétés

Un objet mock contient les propriétés suivantes :

| Nom | Type | Détails |
| ---- | ---- | ------- |
| `url` | `String` | L'url passée à la commande mock |
| `filterOptions` | `Object` | Les options de filtre de ressources passées à la commande mock |
| `browser` | `Object` | L'[objet Browser](/docs/api/browser) utilisé pour obtenir l'objet mock. |
| `calls` | `Object[]` | Informations sur les requêtes du navigateur correspondantes, contenant des propriétés telles que `url`, `method`, `headers`, `initialPriority`, `referrerPolic`, `statusCode`, `responseHeaders` et `body` |

## Méthodes

Les objets mock fournissent diverses commandes, listées dans la section `mock`, qui permettent aux utilisateurs de modifier le comportement de la requête ou de la réponse.

- [`abort`](/docs/api/mock/abort)
- [`abortOnce`](/docs/api/mock/abortOnce)
- [`clear`](/docs/api/mock/clear)
- [`request`](/docs/api/mock/request)
- [`requestOnce`](/docs/api/mock/requestOnce)
- [`respond`](/docs/api/mock/respond)
- [`respondOnce`](/docs/api/mock/respondOnce)
- [`restore`](/docs/api/mock/restore)
- [`waitForResponse`](/docs/api/mock/waitForResponse)

## Événements

L'objet mock est un EventEmitter et quelques événements sont émis pour vos cas d'utilisation.

Voici une liste des événements.

### `request`

Cet événement est émis lors du lancement d'une requête réseau qui correspond aux motifs du mock. La requête est passée dans le callback de l'événement.

Interface de la requête :
```ts
interface RequestEvent {
    requestId: number
    request: Matches
    responseStatusCode: number
    responseHeaders: Record<string, string>
}
```

### `overwrite`

Cet événement est émis lorsque la réponse réseau est écrasée avec [`respond`](/docs/api/mock/respond) ou [`respondOnce`](/docs/api/mock/respondOnce). La réponse est passée dans le callback de l'événement.

Interface de la réponse :
```ts
interface OverwriteEvent {
    requestId: number
    responseCode: number
    responseHeaders: Record<string, string>
    body?: string | Record<string, any>
}
```

### `fail`

Cet événement est émis lorsque la requête réseau est interrompue avec [`abort`](/docs/api/mock/abort) ou [`abortOnce`](/docs/api/mock/abortOnce). L'échec est passé dans le callback de l'événement.

Interface de l'échec :
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

Cet événement est émis lorsqu'une nouvelle correspondance est ajoutée, avant `continue` ou `overwrite`. La correspondance est passée dans le callback de l'événement.

Interface de la correspondance :
```ts
interface MatchEvent {
    url: string // URL de la requête (sans fragment).
    urlFragment?: string // Fragment de l'URL demandée commençant par un dièse, s'il est présent.
    method: string // Méthode de la requête HTTP.
    headers: Record<string, string> // En-têtes de la requête HTTP.
    postData?: string // Données de la requête HTTP POST.
    hasPostData?: boolean // True lorsque la requête contient des données POST.
    mixedContentType?: MixedContentType // Le type de contenu mixte de la requête.
    initialPriority: ResourcePriority // Priorité de la requête de ressource au moment où la requête est envoyée.
    referrerPolicy: ReferrerPolicy // La politique de référent de la requête, telle que définie dans https://www.w3.org/TR/referrer-policy/
    isLinkPreload?: boolean // Indique si la ressource est chargée via un link preload.
    body: string | Buffer | JsonCompatible // Corps de la réponse de la ressource réelle.
    responseHeaders: Record<string, string> // En-têtes de la réponse HTTP.
    statusCode: number // Code de statut de la réponse HTTP.
    mockedResponse?: string | Buffer // Si le mock qui émet l'événement a également modifié sa réponse.
}
```

### `continue`

Cet événement est émis lorsque la réponse réseau n'a été ni écrasée ni interrompue, ou si la réponse a déjà été envoyée par un autre mock. `requestId` est passé dans le callback de l'événement.

## Exemples

Obtenir le nombre de requêtes en attente :

```js
let pendingRequests = 0
const mock = await browser.mock('**') // il est important de faire correspondre toutes les requêtes, sinon la valeur obtenue peut être très déroutante.
mock.on('request', ({request}) => {
    pendingRequests++
    console.log(`matched request to ${request.url}, pending ${pendingRequests} requests`)
})
mock.on('match', ({url}) => {
    pendingRequests--
    console.log(`resolved request to ${url}, pending ${pendingRequests} requests`)
})
```

Lever une erreur en cas d'échec réseau 404 :

```js
browser.addCommand('loadPageWithout404', (url, {selector, predicate}) => new Promise(async (resolve, reject) => {
    const mock = await this.mock('**')

    mock.on('match', ({url, statusCode}) => {
        if (statusCode === 404) {
            reject(new Error(`request to ${url} failed with "Not Found"`))
        }
    })

    await this.url(url).catch(reject)

    // on attend ici, car certaines requêtes peuvent encore être en attente
    if (selector) {
        await this.$(selector).waitForExist().catch(reject)
    }

    if (predicate) {
        await this.waitUntil(predicate).catch(reject)
    }

    resolve()
}))

await browser.loadPageWithout404(browser, 'some/url', { selector: 'main' })
```

Déterminer si la valeur de réponse du mock a été utilisée :

```js
const firstMock = await browser.mock('**/foo/**')
const secondMock = await browser.mock('**/foo/bar/**')

firstMock.respondOnce({id: 3, title: 'three'})
secondMock.respond({id: 4, title: 'four'})

firstMock.on('overwrite', () => {
    // se déclenche pour la première requête vers '**/foo/**'
}).on('continue', () => {
    // se déclenche pour les requêtes suivantes vers '**/foo/**'
})

secondMock.on('continue', () => {
    // se déclenche pour la première requête vers '**/foo/bar/**'
}).on('overwrite', () => {
    // se déclenche pour les requêtes suivantes vers '**/foo/bar/**'
})
```

Dans cet exemple, `firstMock` a été défini en premier et possède un appel `respondOnce`, donc la valeur de réponse de `secondMock` ne sera pas utilisée pour la première requête, mais sera utilisée pour toutes les suivantes.