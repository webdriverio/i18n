---
id: mocksandspies
title: Mocks et espions de requêtes
description: "Simulez les requêtes et réponses réseau dans vos tests avec browser.mock, interrompez des requêtes et inspectez les appels avec des espions."
---

WebdriverIO intègre une prise en charge de la modification des réponses réseau qui vous permet de vous concentrer sur le test de votre application frontend sans avoir à configurer votre backend ou un serveur de mock. Vous pouvez définir des réponses personnalisées pour des ressources web comme des requêtes d'API REST dans votre test et les modifier dynamiquement.

:::info

Notez que l'utilisation de la commande `mock` nécessite la prise en charge de WebDriver Bidi. C'est généralement le cas lorsque vous exécutez des tests localement dans un navigateur basé sur Chromium ou sur Firefox, ainsi que si vous utilisez un Selenium Grid v4 ou supérieur. Si vous exécutez des tests dans le cloud, assurez-vous que votre fournisseur cloud prend en charge WebDriver Bidi.

:::

## Créer un mock

Avant de pouvoir modifier des réponses, vous devez d'abord définir un mock. Ce mock est décrit par l'url de la ressource et peut être filtré par la [méthode de requête](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) ou les [en-têtes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers). La ressource est mise en correspondance à l'aide d'un [`URLPattern`](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern), où `*` correspond à n'importe quelle séquence de caractères. Une url sans protocole est comparée uniquement au chemin de la requête, donc `*/users/list` correspond à ce chemin sur n'importe quelle origine :

```js
// simuler toutes les ressources se terminant par "/users/list"
const userListMock = await browser.mock('*/users/list')

// ou vous pouvez spécifier le mock en filtrant les ressources par en-têtes ou
// code de statut, ne simuler que les requêtes réussies vers des ressources json
const strictMock = await browser.mock('*', {
    // simuler toutes les réponses json
    requestHeaders: { 'Content-Type': 'application/json' },
    // qui ont réussi
    statusCode: 200
})

// au lieu d'une chaîne, vous pouvez aussi passer un `URLPattern` ; le polyfill
// fonctionne également dans les environnements sans prise en charge native de URLPattern
import { URLPattern } from 'urlpattern-polyfill'
const patternMock = await browser.mock(new URLPattern({ pathname: '/users/list' }))
```

:::warning

Utilisez un seul `*` pour les caractères génériques d'URL ; il correspond également à `/`. Des caractères génériques consécutifs avant un texte fixe, comme `**/api/**` ou `**/data.json`, peuvent provoquer un retour arrière (backtracking) excessif des expressions régulières sur des URL sans rapport et bloquer un test. Voir l'[issue #13548](https://github.com/webdriverio/webdriverio/issues/13548). Dans les tests de composants, utilisez également un protocole et un nom d'hôte fixes pour garder le trafic du runner en dehors de l'interception ; voir [les mocks de requêtes dans les tests de composants](/docs/component-testing/mocking#requests).

:::

## Spécifier des réponses personnalisées

Une fois que vous avez défini un mock, vous pouvez définir des réponses personnalisées pour celui-ci. Ces réponses personnalisées peuvent être soit un objet pour répondre avec du JSON, soit un fichier local pour répondre avec une fixture personnalisée, soit une ressource web pour remplacer la réponse par une ressource provenant d'internet.

### Simuler des requêtes API

Pour simuler des requêtes API où vous attendez une réponse JSON, il vous suffit d'appeler `respond` sur l'objet mock avec un objet arbitraire que vous souhaitez renvoyer, par exemple :

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/')

mock.respond([{
    title: 'Injected (non) completed Todo',
    order: null,
    completed: false
}, {
    title: 'Injected completed Todo',
    order: null,
    completed: true
}], {
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    fetchResponse: false
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li').map(el => el.getText()))
// affiche : "[ 'Injected (non) completed Todo', 'Injected completed Todo' ]"
```

Vous pouvez également modifier les en-têtes de réponse ainsi que le code de statut en passant certains paramètres de réponse du mock comme suit :

```js
mock.respond({ ... }, {
    // répondre avec le code de statut 404
    statusCode: 404,
    // fusionner les en-têtes de réponse avec les en-têtes suivants
    headers: { 'x-custom-header': 'foobar' }
})
```

Si vous voulez que le mock n'appelle pas du tout le backend, vous pouvez passer `false` pour l'option `fetchResponse`.

```js
mock.respond({ ... }, {
    // ne pas appeler le backend réel
    fetchResponse: false
})
```

`fetchResponse: false` n'appelle jamais le backend. Un mock créé avec un filtre `statusCode` ou `responseHeaders` a besoin de cette réponse pour décider s'il correspond, donc `respond()` et `respondOnce()` lèvent une erreur si vous les combinez. Supprimez le filtre de réponse, ou laissez `fetchResponse` non défini afin que le mock puisse lire la réponse du backend puis la remplacer.

Il est recommandé de stocker les réponses personnalisées dans des fichiers de fixtures afin de pouvoir simplement les importer dans votre test comme suit :

```js
// nécessite Node.js v16.14.0 ou supérieur pour prendre en charge les assertions d'import JSON
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### Simuler des ressources texte

Si vous souhaitez modifier des ressources texte comme des fichiers JavaScript, CSS ou d'autres ressources textuelles, vous pouvez simplement passer un chemin de fichier et WebdriverIO remplacera la ressource originale par celui-ci, par exemple :

```js
const scriptMock = await browser.mock('*/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// ou répondre avec votre JS personnalisé
scriptMock.respond('alert("I am a mocked resource")')
```

### Rediriger des ressources web

Vous pouvez également simplement remplacer une ressource web par une autre ressource web si la réponse souhaitée est déjà hébergée sur le web. Cela fonctionne aussi bien avec des ressources individuelles d'une page qu'avec une page web elle-même, par exemple :

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // renvoie "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### Réponses dynamiques

Si la réponse de votre mock dépend de la réponse de la ressource originale, vous pouvez également modifier dynamiquement la ressource en passant une fonction qui reçoit la réponse originale en paramètre et définit le mock en fonction de la valeur de retour, par exemple :

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // remplacer le contenu des todos par leur numéro dans la liste
    return req.body.map((item, i) => ({ ...item, title: i }))
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li label').map((el) => el.getText()))
// renvoie
// [
//   '0',  '1',  '2',  '19', '20',
//   '21', '3',  '4',  '5',  '6',
//   '7',  '8',  '9',  '10', '11',
//   '12', '13', '14', '15', '16',
//   '17', '18', '22'
// ]
```

## Interrompre des mocks

Au lieu de renvoyer une réponse personnalisée, vous pouvez également simplement interrompre la requête avec l'une des erreurs HTTP suivantes :

- Failed
- Aborted
- TimedOut
- AccessDenied
- ConnectionClosed
- ConnectionReset
- ConnectionRefused
- ConnectionAborted
- ConnectionFailed
- NameNotResolved
- InternetDisconnected
- AddressUnreachable
- BlockedByClient
- BlockedByResponse

C'est très utile si vous souhaitez bloquer sur votre page des scripts tiers qui ont une influence négative sur votre test fonctionnel. Vous pouvez interrompre un mock en appelant simplement `abort` ou `abortOnce`, par exemple :

```js
const mock = await browser.mock('https://www.google-analytics.com/*')
mock.abort('Failed')
```

## Espions

Chaque mock est automatiquement un espion qui compte le nombre de requêtes que le navigateur a effectuées vers cette ressource. Si vous n'appliquez pas de réponse personnalisée ou de raison d'interruption au mock, il continue avec la réponse par défaut que vous recevriez normalement. Cela vous permet de vérifier combien de fois le navigateur a effectué la requête, par exemple vers un certain endpoint d'API.

```js
const mock = await browser.mock('*/user', { method: 'post' })
console.log(mock.calls.length) // renvoie 0

// inscrire l'utilisateur
await $('#username').setValue('randomUser')
await $('password').setValue('password123')
await $('password_repeat').setValue('password123')
await $('button[type="submit"]').click()

// vérifier si la requête API a été effectuée
expect(mock.calls.length).toBe(1)

// vérifier la réponse
expect(mock.calls[0].body).toEqual({ success: true })
```

Si vous devez attendre qu'une requête correspondante ait reçu une réponse, utilisez `mock.waitForResponse(options)`. Consultez la référence de l'API : [waitForResponse](/docs/api/mock/waitForResponse).

## Multi-remote

Sur un navigateur [multi-remote](/docs/multiremote), `mock()` renvoie un `MultiRemoteMock` plutôt qu'un seul `Mock`. Les méthodes telles que `respond()` et `restore()` s'exécutent sur chaque instance. `waitForResponse()` attend que chaque instance ait une réponse correspondante. Les requêtes capturées restent sur le mock de ce navigateur :

```ts
const mock = await browser.mock('*/user', { method: 'post' })
mock.respond({ success: true })

// inscrire un utilisateur dans chaque navigateur afin que chaque session envoie la requête
await browser.$('#username').setValue('randomUser')
await browser.$('#password').setValue('password123')
await browser.$('#password_repeat').setValue('password123')
await browser.$('button[type="submit"]').click()

await mock.waitForResponse()

expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
expect(mock.getInstance('myFirefoxBrowser').calls).toHaveLength(1)
```

`mock.instances` liste ces noms dans l'ordre dans lequel les mocks ont été créés. `getInstance` lève l'erreur `Multi-remote object has no instance named "<name>"` lorsque le nom ne figure pas dans cette liste. Un mock créé à partir de `browser.select('myFirefoxBrowser', 'myChromeBrowser')` liste Firefox en premier, ce qui peut différer de `browser.instances`.

Pour simuler un seul navigateur, appelez `mock()` sur cette instance :

```ts
const chromeOnly = await browser.getInstance('myChromeBrowser').mock('*/user')
```