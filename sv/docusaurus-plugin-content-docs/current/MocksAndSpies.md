---
id: mocksandspies
title: Mockning och spioner för förfrågningar
description: "Mocka nätverksförfrågningar och svar i dina tester med browser.mock, avbryt förfrågningar och inspektera anrop med spioner."
---

WebdriverIO har inbyggt stöd för att modifiera nätverkssvar, vilket gör att du kan fokusera på att testa din frontend-applikation utan att behöva sätta upp din backend eller en mock-server. Du kan definiera anpassade svar för webbresurser som REST API-förfrågningar i ditt test och modifiera dem dynamiskt.

:::info

Observera att användning av kommandot `mock` kräver stöd för WebDriver Bidi. Det är vanligtvis fallet när du kör tester lokalt i en Chromium-baserad webbläsare eller i Firefox, samt om du använder Selenium Grid v4 eller senare. Om du kör tester i molnet, se till att din molnleverantör stöder WebDriver Bidi.

:::

## Skapa en mock

Innan du kan modifiera några svar måste du först definiera en mock. Denna mock beskrivs av resursens url och kan filtreras efter [förfrågningsmetod](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) eller [headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers). Resursen matchas med ett [`URLPattern`](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern), där `*` matchar vilken teckensekvens som helst. En url utan protokoll matchas endast mot förfrågans sökväg, så `*/users/list` matchar den sökvägen på vilken origin som helst:

```js
// mocka alla resurser som slutar med "/users/list"
const userListMock = await browser.mock('*/users/list')

// eller så kan du specificera mocken genom att filtrera resurser efter headers eller
// statuskod, mocka endast lyckade förfrågningar till json-resurser
const strictMock = await browser.mock('*', {
    // mocka alla json-svar
    requestHeaders: { 'Content-Type': 'application/json' },
    // som var lyckade
    statusCode: 200
})

// istället för en sträng kan du också skicka in ett `URLPattern`; polyfillen
// fungerar även i körmiljöer utan inbyggt stöd för URLPattern
import { URLPattern } from 'urlpattern-polyfill'
const patternMock = await browser.mock(new URLPattern({ pathname: '/users/list' }))
```

:::warning

Använd en enda `*` för URL-jokertecken; den matchar även `/`. Flera jokertecken i följd före fast text, såsom `**/api/**` eller `**/data.json`, kan orsaka överdriven regex-backtracking på orelaterade URL:er och få ett test att frysa. Se [issue #13548](https://github.com/webdriverio/webdriverio/issues/13548). I komponenttester bör du även använda ett fast protokoll och värdnamn för att hålla runner-trafiken utanför avlyssningen; se [mockning av förfrågningar vid komponenttestning](/docs/component-testing/mocking#requests).

:::

## Specificera anpassade svar

När du har definierat en mock kan du definiera anpassade svar för den. Dessa anpassade svar kan vara antingen ett objekt för att svara med JSON, en lokal fil för att svara med en anpassad fixture, eller en webbresurs för att ersätta svaret med en resurs från internet.

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
// skriver ut: "[ 'Injected (non) completed Todo', 'Injected completed Todo' ]"
```

Du kan också modifiera svarets headers samt statuskoden genom att skicka in några parametrar för mock-svaret enligt följande:

```js
mock.respond({ ... }, {
    // svara med statuskod 404
    statusCode: 404,
    // slå samman svarets headers med följande headers
    headers: { 'x-custom-header': 'foobar' }
})
```

Om du vill att mocken inte ska anropa backend alls kan du skicka `false` för flaggan `fetchResponse`.

```js
mock.respond({ ... }, {
    // anropa inte den faktiska backend
    fetchResponse: false
})
```

`fetchResponse: false` anropar aldrig backend. En mock som skapats med ett `statusCode`- eller `responseHeaders`-filter behöver det svaret för att avgöra om den matchar, så `respond()` och `respondOnce()` kastar ett fel om du kombinerar dem. Ta bort svarsfiltret, eller lämna `fetchResponse` oinställt så att mocken kan läsa backend-svaret och sedan ersätta det.

Det rekommenderas att lagra anpassade svar i fixture-filer så att du enkelt kan importera dem i ditt test enligt följande:

```js
// kräver Node.js v16.14.0 eller senare för att stödja JSON import assertions
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### Mocka textresurser

Om du vill modifiera textresurser som JavaScript, CSS-filer eller andra textbaserade resurser kan du helt enkelt skicka in en filsökväg så ersätter WebdriverIO den ursprungliga resursen med den, t.ex.:

```js
const scriptMock = await browser.mock('*/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// eller svara med din egen JS
scriptMock.respond('alert("I am a mocked resource")')
```

### Omdirigera webbresurser

Du kan också helt enkelt ersätta en webbresurs med en annan webbresurs om ditt önskade svar redan finns på webben. Detta fungerar både med enskilda sidresurser och med en webbsida i sig, t.ex.:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // returnerar "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### Dynamiska svar

Om ditt mock-svar beror på den ursprungliga resursens svar kan du också modifiera resursen dynamiskt genom att skicka in en funktion som tar emot det ursprungliga svaret som parameter och sätter mocken baserat på returvärdet, t.ex.:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // ersätt todo-innehållet med deras listnummer
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

Istället för att returnera ett anpassat svar kan du också helt enkelt avbryta förfrågan med ett av följande HTTP-fel:

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

Detta är mycket användbart om du vill blockera tredjepartsskript på din sida som har en negativ inverkan på ditt funktionella test. Du kan avbryta en mock genom att helt enkelt anropa `abort` eller `abortOnce`, t.ex.:

```js
const mock = await browser.mock('https://www.google-analytics.com/*')
mock.abort('Failed')
```

## Spioner

Varje mock är automatiskt en spion som räknar antalet förfrågningar som webbläsaren gjort till den resursen. Om du inte tillämpar ett anpassat svar eller en avbrottsorsak på mocken fortsätter den med det standardsvar du normalt skulle få. Detta gör att du kan kontrollera hur många gånger webbläsaren gjorde förfrågan, t.ex. till en viss API-endpoint.

```js
const mock = await browser.mock('*/user', { method: 'post' })
console.log(mock.calls.length) // returnerar 0

// registrera användare
await $('#username').setValue('randomUser')
await $('password').setValue('password123')
await $('password_repeat').setValue('password123')
await $('button[type="submit"]').click()

// kontrollera om API-förfrågan gjordes
expect(mock.calls.length).toBe(1)

// verifiera svaret
expect(mock.calls[0].body).toEqual({ success: true })
```

Om du behöver vänta tills en matchande förfrågan har besvarats, använd `mock.waitForResponse(options)`. Se API-referensen: [waitForResponse](/docs/api/mock/waitForResponse).

## Multi-remote

I en [multi-remote](/docs/multiremote)-webbläsare returnerar `mock()` en `MultiRemoteMock` istället för en enskild `Mock`. Metoder som `respond()` och `restore()` körs på varje instans. `waitForResponse()` väntar tills varje instans har ett matchande svar. Fångade förfrågningar stannar på mocken för den webbläsaren:

```ts
const mock = await browser.mock('*/user', { method: 'post' })
mock.respond({ success: true })

// registrera en användare i varje webbläsare så att varje session skickar förfrågan
await browser.$('#username').setValue('randomUser')
await browser.$('#password').setValue('password123')
await browser.$('#password_repeat').setValue('password123')
await browser.$('button[type="submit"]').click()

await mock.waitForResponse()

expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
expect(mock.getInstance('myFirefoxBrowser').calls).toHaveLength(1)
```

`mock.instances` listar dessa namn i den ordning mockarna skapades. `getInstance` kastar `Multi-remote object has no instance named "<name>"` när namnet inte finns i listan. En mock som skapats från `browser.select('myFirefoxBrowser', 'myChromeBrowser')` listar Firefox först, vilket kan skilja sig från `browser.instances`.

För att stubba endast en webbläsare, anropa `mock()` på den instansen:

```ts
const chromeOnly = await browser.getInstance('myChromeBrowser').mock('*/user')
```