---
id: mocksandspies
title: Request-Mocks und Spies
description: "Mocken Sie Netzwerk-Requests und -Responses in Ihren Tests mit browser.mock, brechen Sie Requests ab und untersuchen Sie Aufrufe mit Spies."
---

WebdriverIO bietet integrierte Unterstützung für das Modifizieren von Netzwerk-Responses, sodass Sie sich auf das Testen Ihrer Frontend-Anwendung konzentrieren können, ohne Ihr Backend oder einen Mock-Server einrichten zu müssen. Sie können in Ihrem Test benutzerdefinierte Responses für Web-Ressourcen wie REST-API-Requests definieren und diese dynamisch modifizieren.

:::info

Beachten Sie, dass die Verwendung des `mock`-Befehls Unterstützung für WebDriver Bidi erfordert. Das ist normalerweise der Fall, wenn Tests lokal in einem Chromium-basierten Browser oder in Firefox ausgeführt werden, sowie wenn Sie ein Selenium Grid v4 oder höher verwenden. Wenn Sie Tests in der Cloud ausführen, stellen Sie sicher, dass Ihr Cloud-Anbieter WebDriver Bidi unterstützt.

:::

## Einen Mock erstellen

Bevor Sie Responses modifizieren können, müssen Sie zunächst einen Mock definieren. Dieser Mock wird durch die Ressourcen-URL beschrieben und kann nach der [Request-Methode](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) oder nach [Headern](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) gefiltert werden. Die Ressource wird mithilfe eines [`URLPattern`](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern) abgeglichen, wobei `*` auf eine beliebige Zeichenfolge passt. Eine URL ohne Protokoll wird nur mit dem Pfad des Requests abgeglichen, sodass `*/users/list` auf diesen Pfad bei jedem Origin passt:

```js
// mockt alle Ressourcen, die auf "/users/list" enden
const userListMock = await browser.mock('*/users/list')

// oder Sie können den Mock spezifizieren, indem Sie Ressourcen nach Headern oder
// Statuscode filtern, nur erfolgreiche Requests an JSON-Ressourcen mocken
const strictMock = await browser.mock('*', {
    // alle JSON-Responses mocken
    requestHeaders: { 'Content-Type': 'application/json' },
    // die erfolgreich waren
    statusCode: 200
})

// anstelle eines Strings können Sie auch ein `URLPattern` übergeben; das Polyfill
// funktioniert auch in Laufzeitumgebungen ohne native URLPattern-Unterstützung
import { URLPattern } from 'urlpattern-polyfill'
const patternMock = await browser.mock(new URLPattern({ pathname: '/users/list' }))
```

:::info

Ein einzelnes `*` passt auf beliebige Zeichen, einschließlich `/`. In einem String-Pattern wandelt WebdriverIO `**` in `*` um, sodass `'**/api/**'` dasselbe ist wie `'*/api/*'`.

Ein zweiter Mock mit demselben URL-Pattern und denselben Filteroptionen ersetzt den ersten: WebdriverIO stellt den ersten Mock wieder her, sodass dieser keine Requests mehr verändert oder Aufrufe aufzeichnet. Um beide Mocks zu behalten, geben Sie ihnen unterschiedliche Filteroptionen. Beispielsweise sind die Strings `'**/users'` und `'*/users'` derselbe Mock, während `'*/users'` und `'*/users'` mit `{ method: 'POST' }` zwei Mocks sind.

:::

:::warning

WebdriverIO verändert ein `URLPattern`-Objekt nicht. Verwenden Sie in einem Objekt ein einzelnes `*`: Wiederholte Wildcards vor festem Text, wie etwa `{ pathname: '**/api/**' }`, können den Abgleich bei einer langen, nicht passenden URL sehr langsam machen und einen Test einfrieren lassen. Siehe [Issue #13548](https://github.com/webdriverio/webdriverio/issues/13548).

Verwenden Sie in Komponententests ein festes Protokoll und einen festen Hostnamen, um den Runner-Traffic außerhalb der Interception zu halten; siehe [Request-Mocks beim Komponententesten](/docs/component-testing/mocking#requests).

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
// gibt aus: "[ 'Injected (non) completed Todo', 'Injected completed Todo' ]"
```

Sie können auch die Response-Header sowie den Statuscode modifizieren, indem Sie wie folgt einige Mock-Response-Parameter übergeben:

```js
mock.respond({ ... }, {
    // mit Statuscode 404 antworten
    statusCode: 404,
    // Response-Header mit folgenden Headern zusammenführen
    headers: { 'x-custom-header': 'foobar' }
})
```

Wenn der Mock das Backend überhaupt nicht aufrufen soll, können Sie `false` für das `fetchResponse`-Flag übergeben.

```js
mock.respond({ ... }, {
    // das eigentliche Backend nicht aufrufen
    fetchResponse: false
})
```

`fetchResponse: false` ruft das Backend niemals auf. Ein Mock, der mit einem `statusCode`- oder `responseHeaders`-Filter erstellt wurde, benötigt diese Response, um zu entscheiden, ob er passt, daher werfen `respond()` und `respondOnce()` einen Fehler, wenn Sie beides kombinieren. Entfernen Sie den Response-Filter oder lassen Sie `fetchResponse` ungesetzt, damit der Mock die Backend-Response lesen und anschließend ersetzen kann.

Es wird empfohlen, benutzerdefinierte Responses in Fixture-Dateien zu speichern, sodass Sie diese in Ihrem Test einfach wie folgt einbinden können:

```js
// erfordert Node.js v16.14.0 oder höher zur Unterstützung von JSON-Import-Assertions
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### Text-Ressourcen mocken

Wenn Sie Text-Ressourcen wie JavaScript-, CSS-Dateien oder andere textbasierte Ressourcen modifizieren möchten, können Sie einfach einen Dateipfad übergeben, und WebdriverIO ersetzt die ursprüngliche Ressource damit, z. B.:

```js
const scriptMock = await browser.mock('*/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// oder mit Ihrem benutzerdefinierten JS antworten
scriptMock.respond('alert("I am a mocked resource")')
```

### Web-Ressourcen umleiten

Sie können eine Web-Ressource auch einfach durch eine andere Web-Ressource ersetzen, wenn Ihre gewünschte Response bereits im Web gehostet ist. Dies funktioniert sowohl mit einzelnen Seitenressourcen als auch mit einer Webseite selbst, z. B.:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // gibt "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js" zurück
```

### Dynamische Responses

Wenn Ihre Mock-Response von der ursprünglichen Ressourcen-Response abhängt, können Sie die Ressource auch dynamisch modifizieren, indem Sie eine Funktion übergeben, die die ursprüngliche Response als Parameter erhält und den Mock basierend auf dem Rückgabewert setzt, z. B.:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // Todo-Inhalt durch ihre Listennummer ersetzen
    return req.body.map((item, i) => ({ ...item, title: i }))
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li label').map((el) => el.getText()))
// gibt zurück
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

Jeder Mock ist automatisch ein Spy, der die Anzahl der Requests zählt, die der Browser an diese Ressource gesendet hat. Wenn Sie keine benutzerdefinierte Response oder keinen Abbruchgrund auf den Mock anwenden, wird mit der Standard-Response fortgefahren, die Sie normalerweise erhalten würden. Dadurch können Sie überprüfen, wie oft der Browser den Request gesendet hat, z. B. an einen bestimmten API-Endpunkt.

```js
const mock = await browser.mock('*/user', { method: 'post' })
console.log(mock.calls.length) // gibt 0 zurück

// Benutzer registrieren
await $('#username').setValue('randomUser')
await $('password').setValue('password123')
await $('password_repeat').setValue('password123')
await $('button[type="submit"]').click()

// prüfen, ob der API-Request gesendet wurde
expect(mock.calls.length).toBe(1)

// Response überprüfen
expect(mock.calls[0].body).toEqual({ success: true })
```

Wenn Sie warten müssen, bis ein passender Request beantwortet wurde, verwenden Sie `mock.waitForResponse(options)`. Siehe die API-Referenz: [waitForResponse](/docs/api/mock/waitForResponse).

## Multi-remote

Bei einem [Multi-remote](/docs/multiremote)-Browser gibt `mock()` einen `MultiRemoteMock` statt eines einzelnen `Mock` zurück. Methoden wie `respond()` und `restore()` werden auf jeder Instanz ausgeführt. `waitForResponse()` wartet, bis jede Instanz eine passende Response hat. Erfasste Requests verbleiben auf dem Mock des jeweiligen Browsers:

```ts
const mock = await browser.mock('*/user', { method: 'post' })
mock.respond({ success: true })

// in jedem Browser einen Benutzer registrieren, damit jede Session den Request sendet
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