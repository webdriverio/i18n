---
id: mock
title: L'Objet Mock
---

L'objet mock est un objet qui représente une simulation de réseau et contient des informations sur les requêtes correspondant à une `url` et des `filterOptions` données. Il peut être obtenu en utilisant la commande [`mock`](/docs/api/browser/mock).

:::info

Notez que l'utilisation de la commande `mock` nécessite la prise en charge du protocole Chrome DevTools.
Cette prise en charge est assurée si vous exécutez des tests localement dans un navigateur basé sur Chromium ou si
vous utilisez Selenium Grid v4 ou supérieur. Cette commande __ne peut pas__ être utilisée lors de l'exécution
de tests automatisés dans le cloud. Pour en savoir plus, consultez la section [Protocoles d'automatisation](/docs/automationProtocols).

:::

Vous pouvez en savoir plus sur la simulation des requêtes et des réponses dans WebdriverIO dans notre guide [Mocks et Spies](/docs/mocksandspies).

## Propriétés

Un objet mock contient les propriétés suivantes :

| Nom | Type | Détails |
| ---- | ---- | ------- |
| `url` | `String` | L'URL passée à la commande mock |
| `filterOptions` | `Object` | Les options de filtrage de ressources passées à la commande mock |
| `browser` | `Object` | L'[Objet Browser](/docs/api/browser) utilisé pour obtenir l'objet mock. |
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

## Événements

L'objet mock est un EventEmitter et plusieurs événements sont émis pour vos cas d'utilisation.

Voici une liste des événements.

### `request`

Cet événement est émis lors du lancement d'une requête réseau qui correspond aux modèles de mock. La requête est transmise dans le callback de l'événement.

Interface de requête :
```ts
interface RequestEvent {
    requestId: number
    request: Matches
    responseStatusCode: number
    responseHeaders: Record<string, string>
}
```

### `overwrite`

Cet événement est émis lorsque la réponse réseau est remplacée avec [`respond`](/docs/api/mock/respond) ou [`respondOnce`](/docs/api/mock/respondOnce). La réponse est transmise dans le callback de l'événement.

Interface de réponse :
```ts
interface OverwriteEvent {
    requestId: number
    responseCode: number
    responseHeaders: Record<string, string>
    body?: string | Record<string, any>
}
```

### `fail`

Cet événement est émis lorsque la requête réseau est interrompue avec [`abort`](/docs/api/mock/abort) ou [`abortOnce`](/docs/api/mock/abortOnce). L'échec est transmis dans le callback de l'événement.

Interface d'échec :
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

Cet événement est émis lorsqu'une nouvelle correspondance est ajoutée, avant `continue` ou `overwrite`. La correspondance est transmise dans le callback de l'événement.

Interface de correspondance :
```ts
interface MatchEvent {
    url: string // URL de la requête (sans fragment).
    urlFragment?: string // Fragment de l'URL demandée commençant par un hash, si présent.
    method: string // Méthode de requête HTTP.
    headers: Record<string, string> // En-têtes de requête HTTP.
    postData?: string // Données de requête HTTP POST.
    hasPostData?: boolean // Vrai lorsque la requête a des données POST.
    mixedContentType?: MixedContentType // Le type d'export de contenu mixte de la requête.
    initialPriority: ResourcePriority // Priorité de la requête de ressource au moment où la requête est envoyée.
    referrerPolicy: ReferrerPolicy // La politique de référent de la requête, telle que définie dans https://www.w3.org/TR/referrer-policy/
    isLinkPreload?: boolean // Si elle est chargée via un préchargement de lien.
    body: string | Buffer | JsonCompatible // Corps de réponse de la ressource réelle.
    responseHeaders: Record<string, string> // En-têtes de réponse HTTP.
    statusCode: number // Code d'état de réponse HTTP.
    mockedResponse?: string | Buffer // Si le mock émettant l'événement a également modifié sa réponse.
}
```

### `continue`

Cet événement est émis lorsque la réponse réseau n'a été ni remplacée ni interrompue, ou si la réponse a déjà été envoyée par un autre mock. `requestId` est transmis dans le callback de l'événement.

## Exemples

Obtenir le nombre de requêtes en attente :

```js
let pendingRequests = 0
const mock = await browser.mock('**') // il est important de correspondre à toutes les requêtes, sinon la valeur résultante peut être très déroutante.
mock.on('request', ({request}) => {
    pendingRequests++
    console.log(`requête correspondante vers ${request.url}, ${pendingRequests} requêtes en attente`)
})
mock.on('match', ({url}) => {
    pendingRequests--
    console.log(`requête résolue vers ${url}, ${pendingRequests} requêtes en attente`)
})
```

Lancer une erreur sur un échec réseau 404 :

```js
browser.addCommand('loadPageWithout404', (url, {selector, predicate}) => new Promise(async (resolve, reject) => {
    const mock = await this.mock('**')

    mock.on('match', ({url, statusCode}) => {
        if (statusCode === 404) {
            reject(new Error(`la requête vers ${url} a échoué avec "Not Found"`))
        }
    })

    await this.url(url).catch(reject)

    // attente ici, car certaines requêtes peuvent encore être en attente
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
    // se déclenche pour les requêtes restantes vers '**/foo/**'
})

secondMock.on('continue', () => {
    // se déclenche pour la première requête vers '**/foo/bar/**'
}).on('overwrite', () => {
    // se déclenche pour les requêtes restantes vers '**/foo/bar/**'
})
```

Dans cet exemple, `firstMock` a été défini en premier et a un appel `respondOnce`, donc la valeur de réponse de `secondMock` ne sera pas utilisée pour la première requête, mais sera utilisée pour le reste des requêtes.