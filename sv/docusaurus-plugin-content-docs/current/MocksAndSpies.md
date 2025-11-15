---
id: mocksandspies
title: Mockning och spårning av förfrågningar
---

WebdriverIO har inbyggt stöd för att modifiera nätverkssvar som gör att du kan fokusera på att testa din frontend-applikation utan att behöva konfigurera din backend eller en mockserver. Du kan definiera anpassade svar för webbresurser som REST API-förfrågningar i ditt test och ändra dem dynamiskt.

:::info

Observera att användning av `mock`-kommandot kräver stöd för Chrome DevTools-protokollet. Det stödet finns om du kör tester lokalt i en Chromium-baserad webbläsare, via en Selenium Grid v4 eller högre, eller genom en molnleverantör med stöd för Chrome DevTools-protokollet (t.ex. SauceLabs, BrowserStack, LambdaTest). Fullständigt stöd för alla webbläsare kommer att finnas när de nödvändiga primitiven landar i [Webdriver Bidi](https://wpt.fyi/results/webdriver/tests/bidi/network?label=experimental&label=master&aligned) och implementeras i respektive webbläsare.

:::

## Skapa en mock

Innan du kan modifiera några svar måste du först definiera en mock. Denna mock beskrivs av resursens url och kan filtreras efter [förfrågningsmetod](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) eller [headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers). Resursen stöder glob-uttryck med [minimatch](https://www.npmjs.com/package/minimatch):

```js
// mock alla resurser som slutar med "/users/list"
const userListMock = await browser.mock('**/users/list')

// eller så kan du specificera mocken genom att filtrera resurser efter headers eller
// statuskod, mocka endast framgångsrika förfrågningar till json-resurser
const strictMock = await browser.mock('**', {
    // mocka alla json-svar
    requestHeaders: { 'Content-Type': 'application/json' },
    // som var framgångsrika
    statusCode: 200
})
```

## Specificera anpassade svar

När du har definierat en mock kan du definiera anpassade svar för den. Dessa anpassade svar kan antingen vara ett objekt för att svara med JSON, en lokal fil för att svara med en anpassad fixtur eller en webbresurs för att ersätta svaret med en resurs från internet.

### Mocka API-förfrågningar

För att mocka API-förfrågningar där du förväntar dig ett JSON-svar behöver du bara anropa `respond` på mock-objektet med ett godtyckligt objekt som du vill returnera, t.ex.:

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
// utskrift: "[ 'Injected (non) completed Todo', 'Injected completed Todo' ]"
```

Du kan också modifiera svarsheaders samt statuskoden genom att skicka in några mock-svarsparametrar enligt följande:

```js
mock.respond({ ... }, {
    // svara med statuskod 404
    statusCode: 404,
    // slå ihop svarsheaders med följande headers
    headers: { 'x-custom-header': 'foobar' }
})
```

Om du inte vill att mocken ska anropa backend alls kan du skicka `false` för flaggan `fetchResponse`.

```js
mock.respond({ ... }, {
    // anropa inte den faktiska backenden
    fetchResponse: false
})
```

Det rekommenderas att lagra anpassade svar i fixturfiler så att du enkelt kan inkludera dem i ditt test enligt följande:

```js
// kräver Node.js v16.14.0 eller högre för att stödja JSON import assertions
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### Mocka textresurser

Om du vill modifiera textresurser som JavaScript, CSS-filer eller andra textbaserade resurser kan du bara skicka in en filväg och WebdriverIO kommer att ersätta originalresursen med den, t.ex.:

```js
const scriptMock = await browser.mock('**/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// eller svara med din anpassade JS
scriptMock.respond('alert("I am a mocked resource")')
```

### Omdirigera webbresurser

Du kan också bara ersätta en webbresurs med en annan webbresurs om ditt önskade svar redan finns på webben. Detta fungerar med enskilda sidresurser såväl som med en webbsida själv, t.ex.:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // returnerar "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### Dynamiska svar

Om ditt mocksvar beror på originalresursens svar kan du också dynamiskt modifiera resursen genom att skicka in en funktion som tar emot originalsvaret som parameter och sätter mocken baserat på returvärdet, t.ex.:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // ersätt todo-innehåll med deras listnummer
    return req.body.map((item, i) => ({ ...item, title: i }))
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li label').map((el) => el.getText()))
// returnerar
// [
//   '0',  '1',  '2',  '19', '20',
//   '21', '3',  '4',  '5',  '6',
//   '7',  '8',  '9',  '10', '11',
//   '12', '13', '14', '15', '16',
//   '17', '18', '22'
// ]
```

## Avbryta mockar

Istället för att returnera ett anpassat svar kan du också bara avbryta begäran med ett av följande HTTP-fel:

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

Detta är mycket användbart om du vill blockera tredjepartsskript från din sida som har en negativ påverkan på ditt funktionella test. Du kan avbryta en mock genom att bara anropa `abort` eller `abortOnce`, t.ex.:

```js
const mock = await browser.mock('https://www.google-analytics.com/**')
mock.abort('Failed')
```

## Spårning

Varje mock är automatiskt en spårare som räknar antalet förfrågningar som webbläsaren gjorde till den resursen. Om du inte tillämpar ett anpassat svar eller avbrottsorsak på mocken fortsätter den med standardsvaret som du normalt skulle få. Detta gör det möjligt att kontrollera hur många gånger webbläsaren gjorde förfrågan, t.ex. till en viss API-endpoint.

```js
const mock = await browser.mock('**/user', { method: 'post' })
console.log(mock.calls.length) // returnerar 0

// registrera användare
await $('#username').setValue('randomUser')
await $('password').setValue('password123')
await $('password_repeat').setValue('password123')
await $('button[type="submit"]').click()

// kontrollera om API-förfrågan gjordes
expect(mock.calls.length).toBe(1)

// bekräfta svaret
expect(mock.calls[0].body).toEqual({ success: true })
```

Om du behöver vänta tills en matchande förfrågan har svarat, använd `mock.waitForResponse(options)`. Se API-referensen: [waitForResponse](/docs/api/mock/waitForResponse).