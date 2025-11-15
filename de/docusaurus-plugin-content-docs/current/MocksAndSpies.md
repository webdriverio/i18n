---
id: mocksandspies
title: Anfragenmocks und Spies
---

WebdriverIO kommt mit eingebauter Unterstützung für die Modifikation von Netzwerkantworten, die es Ihnen ermöglicht, sich auf das Testen Ihrer Frontend-Anwendung zu konzentrieren, ohne dass Sie Ihr Backend oder einen Mock-Server einrichten müssen. Sie können benutzerdefinierte Antworten für Webressourcen wie REST-API-Anfragen in Ihrem Test definieren und sie dynamisch ändern.

:::info

Beachten Sie, dass die Verwendung des `mock`-Befehls Unterstützung für das Chrome DevTools-Protokoll erfordert. Diese Unterstützung ist gegeben, wenn Sie Tests lokal in einem Chromium-basierten Browser, über ein Selenium Grid v4 oder höher oder über einen Cloud-Anbieter mit Unterstützung für das Chrome DevTools-Protokoll (z.B. SauceLabs, BrowserStack, LambdaTest) ausführen. Die vollständige browserübergreifende Unterstützung wird verfügbar sein, sobald die erforderlichen Primitiven in [Webdriver Bidi](https://wpt.fyi/results/webdriver/tests/bidi/network?label=experimental&label=master&aligned) implementiert und in den jeweiligen Browsern umgesetzt werden.

:::

## Erstellen eines Mocks

Bevor Sie Antworten ändern können, müssen Sie zuerst einen Mock definieren. Dieser Mock wird durch die Ressourcen-URL beschrieben und kann nach der [Anfragemethode](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) oder [Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) gefiltert werden. Die Ressource unterstützt Glob-Ausdrücke durch [minimatch](https://www.npmjs.com/package/minimatch):

```js
// mock all resources ending with "/users/list"
const userListMock = await browser.mock('**/users/list')

// or you can specify the mock by filtering resources by headers or
// status code, only mock successful requests to json resources
const strictMock = await browser.mock('**', {
    // mock all json responses
    requestHeaders: { 'Content-Type': 'application/json' },
    // that were successful
    statusCode: 200
})
```

## Angeben benutzerdefinierter Antworten

Sobald Sie einen Mock definiert haben, können Sie benutzerdefinierte Antworten dafür definieren. Diese benutzerdefinierten Antworten können entweder ein Objekt sein, um eine JSON-Antwort zu geben, eine lokale Datei, um mit einer benutzerdefinierten Fixture zu antworten, oder eine Webressource, um die Antwort mit einer Ressource aus dem Internet zu ersetzen.

### Mocking von API-Anfragen

Um API-Anfragen zu mocken, bei denen Sie eine JSON-Antwort erwarten, müssen Sie lediglich `respond` auf dem Mock-Objekt mit einem beliebigen Objekt aufrufen, das Sie zurückgeben möchten, z.B.:

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
// outputs: "[ 'Injected (non) completed Todo', 'Injected completed Todo' ]"
```

Sie können auch die Antwort-Header sowie den Statuscode ändern, indem Sie einige Mock-Antwortparameter wie folgt übergeben:

```js
mock.respond({ ... }, {
    // respond with status code 404
    statusCode: 404,
    // merge response headers with following headers
    headers: { 'x-custom-header': 'foobar' }
})
```

Wenn der Mock das Backend überhaupt nicht aufrufen soll, können Sie `false` für das Flag `fetchResponse` übergeben.

```js
mock.respond({ ... }, {
    // do not call the actual backend
    fetchResponse: false
})
```

Es wird empfohlen, benutzerdefinierte Antworten in Fixture-Dateien zu speichern, sodass Sie sie in Ihrem Test einfach importieren können:

```js
// requires Node.js v16.14.0 or higher to support JSON import assertions
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### Mocking von Textressourcen

Wenn Sie Textressourcen wie JavaScript, CSS-Dateien oder andere textbasierte Ressourcen ändern möchten, können Sie einfach einen Dateipfad übergeben, und WebdriverIO ersetzt die Originalressource damit, z.B.:

```js
const scriptMock = await browser.mock('**/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// or respond with your custom JS
scriptMock.respond('alert("I am a mocked resource")')
```

### Weiterleitung von Webressourcen

Sie können auch einfach eine Webressource durch eine andere Webressource ersetzen, wenn Ihre gewünschte Antwort bereits im Web gehostet wird. Dies funktioniert sowohl mit einzelnen Seitenressourcen als auch mit einer Webseite selbst, z.B.:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // returns "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### Dynamische Antworten

Wenn Ihre Mock-Antwort von der ursprünglichen Ressourcenantwort abhängt, können Sie die Ressource auch dynamisch ändern, indem Sie eine Funktion übergeben, die die ursprüngliche Antwort als Parameter erhält und den Mock auf Basis des Rückgabewerts setzt, z.B.:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // replace todo content with their list number
    return req.body.map((item, i) => ({ ...item, title: i }))
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li label').map((el) => el.getText()))
// returns
// [
//   '0',  '1',  '2',  '19', '20',
//   '21', '3',  '4',  '5',  '6',
//   '7',  '8',  '9',  '10', '11',
//   '12', '13', '14', '15', '16',
//   '17', '18', '22'
// ]
```

## Abbruch von Mocks

Anstatt eine benutzerdefinierte Antwort zurückzugeben, können Sie die Anfrage auch einfach mit einem der folgenden HTTP-Fehler abbrechen:

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

Dies ist sehr nützlich, wenn Sie Skripte von Drittanbietern von Ihrer Seite blockieren möchten, die einen negativen Einfluss auf Ihren Funktionstest haben. Sie können einen Mock abbrechen, indem Sie einfach `abort` oder `abortOnce` aufrufen, z.B.:

```js
const mock = await browser.mock('https://www.google-analytics.com/**')
mock.abort('Failed')
```

## Spies

Jeder Mock ist automatisch ein Spy, der die Anzahl der Anfragen zählt, die der Browser an diese Ressource gestellt hat. Wenn Sie keine benutzerdefinierte Antwort oder keinen Abbruchgrund auf den Mock anwenden, wird mit der Standardantwort fortgefahren, die Sie normalerweise erhalten würden. Dies ermöglicht es Ihnen zu überprüfen, wie oft der Browser die Anfrage gestellt hat, z.B. an einen bestimmten API-Endpunkt.

```js
const mock = await browser.mock('**/user', { method: 'post' })
console.log(mock.calls.length) // returns 0

// register user
await $('#username').setValue('randomUser')
await $('password').setValue('password123')
await $('password_repeat').setValue('password123')
await $('button[type="submit"]').click()

// check if API request was made
expect(mock.calls.length).toBe(1)

// assert response
expect(mock.calls[0].body).toEqual({ success: true })
```

Wenn Sie warten müssen, bis eine übereinstimmende Anfrage beantwortet wurde, verwenden Sie `mock.waitForResponse(options)`. Siehe die API-Referenz: [waitForResponse](/docs/api/mock/waitForResponse).