---
id: mocksandspies
title: Request-Mocks und Spies
description: "Mocken Sie Netzwerk-Requests und -Responses in Ihren Tests mit browser.mock, brechen Sie Requests ab und untersuchen Sie Aufrufe mit Spies."
---

WebdriverIO bietet integrierte Unterstützung für das Modifizieren von Netzwerk-Responses, sodass Sie sich auf das Testen Ihrer Frontend-Anwendung konzentrieren können, ohne Ihr Backend oder einen Mock-Server einrichten zu müssen. Sie können in Ihrem Test benutzerdefinierte Responses für Web-Ressourcen wie REST-API-Requests definieren und diese dynamisch modifizieren.

:::info

Beachten Sie, dass die Verwendung des `mock`-Befehls Unterstützung für WebDriver Bidi erfordert. Das ist in der Regel der Fall, wenn Sie Tests lokal in einem Chromium-basierten Browser oder in Firefox ausführen, sowie wenn Sie ein Selenium Grid v4 oder höher verwenden. Wenn Sie Tests in der Cloud ausführen, stellen Sie sicher, dass Ihr Cloud-Anbieter WebDriver Bidi unterstützt.

:::

## Einen Mock erstellen

Bevor Sie Responses modifizieren können, müssen Sie zunächst einen Mock definieren. Dieser Mock wird durch die Ressourcen-URL beschrieben und kann nach der [Request-Methode](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) oder nach [Headern](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) gefiltert werden. Die Ressource wird mithilfe eines [`URLPattern`](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern) abgeglichen, wobei `*` auf eine beliebige Zeichenfolge passt. Eine URL ohne Protokoll wird nur mit dem Pfad des Requests abgeglichen, sodass `*/users/list` auf diesen Pfad bei jedem Origin passt:

```js
// mock all resources ending with "/users/list"
const userListMock = await browser.mock('*/users/list')

// or you can specify the mock by filtering resources by headers or
// status code, only mock successful requests to json resources
const strictMock = await browser.mock('*', {
    // mock all json responses
    requestHeaders: { 'Content-Type': 'application/json' },
    // that were successful
    statusCode: 200
})

// instead of a string you can also pass in a `URLPattern`; the polyfill
// also works in runtimes without native URLPattern support
import { URLPattern } from 'urlpattern-polyfill'
const patternMock = await browser.mock(new URLPattern({ pathname: '/users/list' }))
```

:::warning

Verwenden Sie ein einzelnes `*` als URL-Wildcard; es passt auch auf `/`. Aufeinanderfolgende Wildcards vor festem Text, wie z. B. `**/api/**` oder `**/data.json`, können bei nicht zusammenhängenden URLs zu übermäßigem Regex-Backtracking führen und einen Test einfrieren lassen. Siehe [Issue #13548](https://github.com/webdriverio/webdriverio/issues/13548). Verwenden Sie in Komponententests außerdem ein festes Protokoll und einen festen Hostnamen, damit der Datenverkehr des Runners nicht abgefangen wird; siehe [Request-Mocks beim Komponententesten](/docs/component-testing/mocking#requests).

:::

## Benutzerdefinierte Responses festlegen

Sobald Sie einen Mock definiert haben, können Sie benutzerdefinierte Responses dafür festlegen. Diese benutzerdefinierten Responses können entweder ein Objekt sein, um mit JSON zu antworten, eine lokale Datei, um mit einer benutzerdefinierten Fixture zu antworten, oder eine Web-Ressource, um die Response durch eine Ressource aus dem Internet zu ersetzen.

### API-Requests mocken

Um API-Requests zu mocken, bei denen Sie eine JSON-Response erwarten, müssen Sie lediglich `respond` auf dem Mock-Objekt mit einem beliebigen Objekt aufrufen, das Sie zurückgeben möchten, z. B.:

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

Sie können auch die Response-Header sowie den Statuscode ändern, indem Sie wie folgt einige Mock-Response-Parameter übergeben:

```js
mock.respond({ ... }, {
    // respond with status code 404
    statusCode: 404,
    // merge response headers with following headers
    headers: { 'x-custom-header': 'foobar' }
})
```

Wenn der Mock das Backend überhaupt nicht aufrufen soll, können Sie `false` für das `fetchResponse`-Flag übergeben.

```js
mock.respond({ ... }, {
    // do not call the actual backend
    fetchResponse: false
})
```

`fetchResponse: false` ruft das Backend niemals auf. Ein Mock, der mit einem `statusCode`- oder `responseHeaders`-Filter erstellt wurde, benötigt diese Response, um zu entscheiden, ob er zutrifft. Daher werfen `respond()` und `respondOnce()` einen Fehler, wenn Sie beides kombinieren. Entfernen Sie den Response-Filter oder lassen Sie `fetchResponse` ungesetzt, damit der Mock die Backend-Response lesen und anschließend ersetzen kann.

Es wird empfohlen, benutzerdefinierte Responses in Fixture-Dateien zu speichern, sodass Sie diese in Ihrem Test einfach wie folgt einbinden können:

```js
// requires Node.js v16.14.0 or higher to support JSON import assertions
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### Text-Ressourcen mocken

Wenn Sie Text-Ressourcen wie JavaScript- oder CSS-Dateien oder andere textbasierte Ressourcen modifizieren möchten, können Sie einfach einen Dateipfad übergeben, und WebdriverIO ersetzt die ursprüngliche Ressource damit, z. B.:

```js
const scriptMock = await browser.mock('*/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// or respond with your custom JS
scriptMock.respond('alert("I am a mocked resource")')
```

### Web-Ressourcen umleiten

Sie können eine Web-Ressource auch einfach durch eine andere Web-Ressource ersetzen, wenn Ihre gewünschte Response bereits im Web gehostet wird. Dies funktioniert sowohl mit einzelnen Seitenressourcen als auch mit einer Webseite selbst, z. B.:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // returns "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### Dynamische Responses

Wenn Ihre Mock-Response von der ursprünglichen Ressourcen-Response abhängt, können Sie die Ressource auch dynamisch modifizieren, indem Sie eine Funktion übergeben, die die ursprüngliche Response als Parameter erhält und den Mock anhand des Rückgabewerts festlegt, z. B.:

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

## Mocks abbrechen

Anstatt eine benutzerdefinierte Response zurückzugeben, können Sie den Request auch einfach mit einem der folgenden HTTP-Fehler abbrechen:

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

Dies ist sehr nützlich, wenn Sie Skripte von Drittanbietern auf Ihrer Seite blockieren möchten, die einen negativen Einfluss auf Ihren funktionalen Test haben. Sie können einen Mock abbrechen, indem Sie einfach `abort` oder `abortOnce` aufrufen, z. B.:

```js
const mock = await browser.mock('https://www.google-analytics.com/*')
mock.abort('Failed')
```

## Spies

Jeder Mock ist automatisch ein Spy, der die Anzahl der Requests zählt, die der Browser an diese Ressource gesendet hat. Wenn Sie dem Mock keine benutzerdefinierte Response oder keinen Abbruchgrund zuweisen, fährt er mit der Standard-Response fort, die Sie normalerweise erhalten würden. Dadurch können Sie überprüfen, wie oft der Browser den Request gesendet hat, z. B. an einen bestimmten API-Endpunkt.

```js
const mock = await browser.mock('*/user', { method: 'post' })
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

Wenn Sie warten müssen, bis ein passender Request beantwortet wurde, verwenden Sie `mock.waitForResponse(options)`. Siehe die API-Referenz: [waitForResponse](/docs/api/mock/waitForResponse).

## Multi-Remote

Bei einem [Multi-Remote](/docs/multiremote)-Browser gibt `mock()` einen `MultiRemoteMock` statt eines einzelnen `Mock` zurück. Methoden wie `respond()` und `restore()` werden auf jeder Instanz ausgeführt. `waitForResponse()` wartet, bis jede Instanz eine passende Response hat. Erfasste Requests verbleiben auf dem Mock des jeweiligen Browsers:

```ts
const mock = await browser.mock('*/user', { method: 'post' })
mock.respond({ success: true })

// register a user in every browser so each session sends the request
await browser.$('#username').setValue('randomUser')
await browser.$('#password').setValue('password123')
await browser.$('#password_repeat').setValue('password123')
await browser.$('button[type="submit"]').click()

await mock.waitForResponse()

expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
expect(mock.getInstance('myFirefoxBrowser').calls).toHaveLength(1)
```

`mock.instances` listet diese Namen in der Reihenfolge auf, in der die Mocks erstellt wurden. `getInstance` wirft `Multi-remote object has no instance named "<name>"`, wenn der Name nicht in dieser Liste enthalten ist. Ein Mock, der aus `browser.select('myFirefoxBrowser', 'myChromeBrowser')` erstellt wurde, listet Firefox zuerst auf, was von `browser.instances` abweichen kann.

Um nur einen Browser zu stubben, rufen Sie `mock()` auf dieser Instanz auf:

```ts
const chromeOnly = await browser.getInstance('myChromeBrowser').mock('*/user')
```