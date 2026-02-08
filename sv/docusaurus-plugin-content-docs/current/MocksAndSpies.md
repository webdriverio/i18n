---
id: mocksandspies
title: Förfrågnings-mockar och spioner
---

WebdriverIO kommer med inbyggt stöd för att modifiera nätverkssvar som gör att du kan fokusera på att testa din frontend-applikation utan att behöva konfigurera din backend eller en mock-server. Du kan definiera anpassade svar för webbresurser som REST API-förfrågningar i ditt test och modifiera dem dynamiskt.

:::info

Observera att användning av kommandot `mock` kräver stöd för Chrome DevTools-protokoll. Detta stöd finns om du kör tester lokalt i en Chromium-baserad webbläsare, via Selenium Grid v4 eller högre, eller genom en molnleverantör med stöd för Chrome DevTools-protokollet (t.ex. SauceLabs, BrowserStack, TestMu AI (tidigare LambdaTest)). Fullt stöd för olika webbläsare kommer att finnas tillgängligt när de nödvändiga primitiva funktionerna kommer till [Webdriver Bidi](https://wpt.fyi/results/webdriver/tests/bidi/network?label=experimental&label=master&aligned) och implementeras i respektive webbläsare.

:::

## Skapa en mock

Innan du kan modifiera några svar måste du först definiera en mock. Denna mock beskrivs av resursens URL och kan filtreras efter [förfrågningsmetod](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) eller [headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers). Resursen stöder glob-uttryck genom [minimatch](https://www.npmjs.com/package/minimatch):

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

## Specificera anpassade svar

När du har definierat en mock kan du definiera anpassade svar för den. Dessa anpassade svar kan antingen vara ett objekt för att svara med JSON, en lokal fil för att svara med en anpassad fixture eller en webbresurs för att ersätta svaret med en resurs från internet.

### Mocka API-förfrågningar

För att mocka API-förfrågningar där du förväntar dig ett JSON-svar behöver du bara anropa `respond` på mockobjektet med ett godtyckligt objekt som du vill returnera, t.ex.:

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

Du kan också modifiera svarshuvuden samt statuskoden genom att skicka in några mock-svarsparametrar enligt följande:

```js
mock.respond({ ... }, {
    // respond with status code 404
    statusCode: 404,
    // merge response headers with following headers
    headers: { 'x-custom-header': 'foobar' }
})
```

Om du inte vill att mocken ska anropa backend alls kan du skicka `false` för flaggan `fetchResponse`.

```js
mock.respond({ ... }, {
    // do not call the actual backend
    fetchResponse: false
})
```

Det rekommenderas att lagra anpassade svar i fixturefiler så att du bara kan kräva dem i ditt test enligt följande:

```js
// requires Node.js v16.14.0 or higher to support JSON import assertions
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### Mocka textresurser

Om du vill modifiera textresurser som JavaScript, CSS-filer eller andra textbaserade resurser kan du bara skicka in en filväg och WebdriverIO ersätter den ursprungliga resursen med den, t.ex.:

```js
const scriptMock = await browser.mock('**/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// or respond with your custom JS
scriptMock.respond('alert("I am a mocked resource")')
```

### Omdirigera webbresurser

Du kan också ersätta en webbresurs med en annan webbresurs om ditt önskade svar redan finns på webben. Detta fungerar både med enskilda sidresurser och med en webbsida själv, t.ex.:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // returns "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### Dynamiska svar

Om ditt mock-svar beror på den ursprungliga resursens svar kan du också dynamiskt modifiera resursen genom att skicka in en funktion som tar emot det ursprungliga svaret som parameter och ställer in mocken baserat på returvärdet, t.ex.:

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

## Avbryta mockar

Istället för att returnera ett anpassat svar kan du också bara avbryta förfrågan med ett av följande HTTP-fel:

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

Detta är mycket användbart om du vill blockera skript från tredje part på din sida som har en negativ inverkan på ditt funktionella test. Du kan avbryta en mock genom att bara anropa `abort` eller `abortOnce`, t.ex.:

```js
const mock = await browser.mock('https://www.google-analytics.com/**')
mock.abort('Failed')
```

## Spioner

Varje mock är automatiskt en spion som räknar antalet förfrågningar som webbläsaren gjorde till den resursen. Om du inte tillämpar ett anpassat svar eller avbrottsanledning på mocken fortsätter den med standardsvaret som du normalt skulle få. Detta gör att du kan kontrollera hur många gånger webbläsaren gjort förfrågan, t.ex. till en viss API-endpoint.

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

Om du behöver vänta tills en matchande förfrågan har svarat, använd `mock.waitForResponse(options)`. Se API-referensen: [waitForResponse](/docs/api/mock/waitForResponse).