---
id: mocksandspies
title: Mocks et espions de requêtes
---

WebdriverIO est livré avec une prise en charge intégrée pour la modification des réponses réseau, ce qui vous permet de concentrer vos tests sur votre application frontend sans avoir à configurer votre backend ou un serveur mock. Vous pouvez définir des réponses personnalisées pour les ressources web comme les requêtes d'API REST dans votre test et les modifier dynamiquement.

:::info

Notez que l'utilisation de la commande `mock` nécessite la prise en charge du protocole Chrome DevTools. Cette prise en charge est assurée si vous exécutez des tests localement dans un navigateur basé sur Chromium, via une Selenium Grid v4 ou supérieure, ou par l'intermédiaire d'un fournisseur cloud avec prise en charge du protocole Chrome DevTools (par exemple SauceLabs, BrowserStack, TestMu AI (anciennement LambdaTest)). La prise en charge complète multiplateforme sera disponible une fois que les primitives requises seront intégrées dans [Webdriver Bidi](https://wpt.fyi/results/webdriver/tests/bidi/network?label=experimental&label=master&aligned) et implémentées dans les navigateurs respectifs.

:::

## Créer un mock

Avant de pouvoir modifier des réponses, vous devez d'abord définir un mock. Ce mock est décrit par l'URL de la ressource et peut être filtré par la [méthode de requête](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) ou les [en-têtes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers). La ressource prend en charge les expressions glob via [minimatch](https://www.npmjs.com/package/minimatch) :

```js
// mocker toutes les ressources se terminant par "/users/list"
const userListMock = await browser.mock('**/users/list')

// ou vous pouvez spécifier le mock en filtrant les ressources par en-têtes ou
// code de statut, ne mocker que les requêtes réussies vers les ressources json
const strictMock = await browser.mock('**', {
    // mocker toutes les réponses json
    requestHeaders: { 'Content-Type': 'application/json' },
    // qui ont réussi
    statusCode: 200
})
```

## Spécifier des réponses personnalisées

Une fois que vous avez défini un mock, vous pouvez définir des réponses personnalisées pour celui-ci. Ces réponses personnalisées peuvent être soit un objet pour répondre en JSON, un fichier local pour répondre avec un fixture personnalisé, soit une ressource web pour remplacer la réponse par une ressource provenant d'internet.

### Mocker des requêtes API

Pour mocker des requêtes API où vous attendez une réponse JSON, il vous suffit d'appeler `respond` sur l'objet mock avec un objet arbitraire que vous souhaitez renvoyer, par exemple :

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
// affiche: "[ 'Injected (non) completed Todo', 'Injected completed Todo' ]"
```

Vous pouvez également modifier les en-têtes de réponse ainsi que le code de statut en passant certains paramètres de réponse mock comme suit :

```js
mock.respond({ ... }, {
    // répondre avec le code de statut 404
    statusCode: 404,
    // fusionner les en-têtes de réponse avec les en-têtes suivants
    headers: { 'x-custom-header': 'foobar' }
})
```

Si vous ne voulez pas que le mock appelle du tout le backend, vous pouvez passer `false` pour l'indicateur `fetchResponse`.

```js
mock.respond({ ... }, {
    // ne pas appeler le backend réel
    fetchResponse: false
})
```

Il est recommandé de stocker les réponses personnalisées dans des fichiers de fixture afin de pouvoir simplement les importer dans votre test comme suit :

```js
// nécessite Node.js v16.14.0 ou supérieur pour prendre en charge les assertions d'importation JSON
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### Mocker des ressources texte

Si vous souhaitez modifier des ressources texte comme des fichiers JavaScript, CSS ou d'autres ressources basées sur du texte, vous pouvez simplement fournir un chemin de fichier et WebdriverIO remplacera la ressource originale par celui-ci, par exemple :

```js
const scriptMock = await browser.mock('**/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// ou répondre avec votre JS personnalisé
scriptMock.respond('alert("I am a mocked resource")')
```

### Rediriger des ressources web

Vous pouvez également remplacer une ressource web par une autre ressource web si votre réponse souhaitée est déjà hébergée sur le web. Cela fonctionne aussi bien avec des ressources de page individuelles qu'avec une page web entière, par exemple :

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // renvoie "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### Réponses dynamiques

Si votre réponse mock dépend de la réponse de la ressource originale, vous pouvez également modifier dynamiquement la ressource en passant une fonction qui reçoit la réponse originale en paramètre et définit le mock en fonction de la valeur de retour, par exemple :

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // remplacer le contenu todo par leur numéro de liste
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

## Abandonner des mocks

Au lieu de renvoyer une réponse personnalisée, vous pouvez également simplement abandonner la requête avec l'une des erreurs HTTP suivantes :

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

Cela est très utile si vous voulez bloquer des scripts tiers de votre page qui ont une influence négative sur votre test fonctionnel. Vous pouvez abandonner un mock en appelant simplement `abort` ou `abortOnce`, par exemple :

```js
const mock = await browser.mock('https://www.google-analytics.com/**')
mock.abort('Failed')
```

## Espions

Chaque mock est automatiquement un espion qui compte le nombre de requêtes que le navigateur a effectuées vers cette ressource. Si vous n'appliquez pas de réponse personnalisée ou de raison d'abandon au mock, il continue avec la réponse par défaut que vous recevriez normalement. Cela vous permet de vérifier combien de fois le navigateur a effectué la requête, par exemple vers un certain point de terminaison API.

```js
const mock = await browser.mock('**/user', { method: 'post' })
console.log(mock.calls.length) // renvoie 0

// enregistrer l'utilisateur
await $('#username').setValue('randomUser')
await $('password').setValue('password123')
await $('password_repeat').setValue('password123')
await $('button[type="submit"]').click()

// vérifier si la requête API a été effectuée
expect(mock.calls.length).toBe(1)

// vérifier la réponse
expect(mock.calls[0].body).toEqual({ success: true })
```

Si vous devez attendre qu'une requête correspondante ait répondu, utilisez `mock.waitForResponse(options)`. Voir la référence API : [waitForResponse](/docs/api/mock/waitForResponse).