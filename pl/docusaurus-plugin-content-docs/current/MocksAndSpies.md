---
id: mocksandspies
title: Atrapy i szpiedzy żądań
---

WebdriverIO posiada wbudowane wsparcie do modyfikowania odpowiedzi sieciowych, co pozwala skupić się na testowaniu aplikacji frontendowej bez konieczności konfigurowania backendu lub serwera atrap. Możesz definiować niestandardowe odpowiedzi dla zasobów internetowych, takich jak żądania REST API w swoim teście i dynamicznie je modyfikować.

:::info

Należy pamiętać, że korzystanie z polecenia `mock` wymaga wsparcia dla protokołu Chrome DevTools. To wsparcie jest zapewnione, jeśli uruchamiasz testy lokalnie w przeglądarce opartej na Chromium, poprzez Selenium Grid v4 lub nowszej, lub przez dostawcę chmurowego z obsługą protokołu Chrome DevTools (np. SauceLabs, BrowserStack, TestMu AI (dawniej LambdaTest)). Pełne wsparcie dla różnych przeglądarek będzie dostępne, gdy wymagane elementy pojawią się w [Webdriver Bidi](https://wpt.fyi/results/webdriver/tests/bidi/network?label=experimental&label=master&aligned) i zostaną zaimplementowane w odpowiednich przeglądarkach.

:::

## Tworzenie atrapy

Zanim będziesz mógł modyfikować jakiekolwiek odpowiedzi, musisz najpierw zdefiniować atrapę. Ta atrapa jest opisana przez adres URL zasobu i może być filtrowana przez [metodę żądania](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) lub [nagłówki](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers). Zasób obsługuje wyrażenia glob za pomocą [minimatch](https://www.npmjs.com/package/minimatch):

```js
// atrapa wszystkich zasobów kończących się na "/users/list"
const userListMock = await browser.mock('**/users/list')

// lub możesz określić atrapę, filtrując zasoby według nagłówków lub
// kodu statusu, tylko odpowiedzi z sukcesem dla zasobów json
const strictMock = await browser.mock('**', {
    // atrapa wszystkich odpowiedzi json
    requestHeaders: { 'Content-Type': 'application/json' },
    // które zakończyły się sukcesem
    statusCode: 200
})
```

## Określanie niestandardowych odpowiedzi

Po zdefiniowaniu atrapy możesz zdefiniować dla niej niestandardowe odpowiedzi. Te niestandardowe odpowiedzi mogą być obiektem do odpowiedzi w formacie JSON, lokalnym plikiem do odpowiedzi z niestandardowym elementem lub zasobem internetowym, aby zastąpić odpowiedź zasobem z internetu.

### Atrapowanie żądań API

Aby stworzyć atrapę żądań API, gdzie oczekujesz odpowiedzi JSON, wystarczy wywołać `respond` na obiekcie atrapy z dowolnym obiektem, który chcesz zwrócić, np.:

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
// wynik: "[ 'Injected (non) completed Todo', 'Injected completed Todo' ]"
```

Możesz również modyfikować nagłówki odpowiedzi, a także kod statusu, przekazując parametry odpowiedzi atrapy w następujący sposób:

```js
mock.respond({ ... }, {
    // odpowiedz z kodem statusu 404
    statusCode: 404,
    // połącz nagłówki odpowiedzi z następującymi nagłówkami
    headers: { 'x-custom-header': 'foobar' }
})
```

Jeśli chcesz, aby atrapa w ogóle nie wywoływała backendu, możesz przekazać `false` dla flagi `fetchResponse`.

```js
mock.respond({ ... }, {
    // nie wywołuj faktycznego backendu
    fetchResponse: false
})
```

Zaleca się przechowywanie niestandardowych odpowiedzi w plikach fikstur, dzięki czemu możesz po prostu zaimportować je w swoim teście w następujący sposób:

```js
// wymaga Node.js v16.14.0 lub wyższej, aby obsługiwać asercje importu JSON
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### Atrapowanie zasobów tekstowych

Jeśli chcesz modyfikować zasoby tekstowe, takie jak pliki JavaScript, CSS lub inne zasoby oparte na tekście, możesz po prostu przekazać ścieżkę do pliku, a WebdriverIO zastąpi oryginalny zasób, np.:

```js
const scriptMock = await browser.mock('**/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// lub odpowiedz własnym JS
scriptMock.respond('alert("I am a mocked resource")')
```

### Przekierowanie zasobów internetowych

Możesz również zastąpić zasób internetowy innym zasobem internetowym, jeśli twoja pożądana odpowiedź jest już hostowana w internecie. Działa to z indywidualnymi zasobami strony, jak również z samą stroną internetową, np.:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // zwraca "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### Dynamiczne odpowiedzi

Jeśli twoja odpowiedź atrapy zależy od odpowiedzi oryginalnego zasobu, możesz również dynamicznie modyfikować zasób, przekazując funkcję, która otrzymuje oryginalną odpowiedź jako parametr i ustawia atrapę na podstawie wartości zwracanej, np.:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // zastąp treść todo ich numerem na liście
    return req.body.map((item, i) => ({ ...item, title: i }))
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li label').map((el) => el.getText()))
// zwraca
// [
//   '0',  '1',  '2',  '19', '20',
//   '21', '3',  '4',  '5',  '6',
//   '7',  '8',  '9',  '10', '11',
//   '12', '13', '14', '15', '16',
//   '17', '18', '22'
// ]
```

## Przerywanie atrap

Zamiast zwracać niestandardową odpowiedź, możesz również po prostu przerwać żądanie z jednym z następujących błędów HTTP:

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

Jest to bardzo przydatne, jeśli chcesz zablokować skrypty innych firm ze swojej strony, które mają negatywny wpływ na testy funkcjonalne. Możesz przerwać atrapę, wywołując po prostu `abort` lub `abortOnce`, np.:

```js
const mock = await browser.mock('https://www.google-analytics.com/**')
mock.abort('Failed')
```

## Szpiedzy

Każda atrapa jest automatycznie szpiegiem, który zlicza liczbę żądań, które przeglądarka wykonała do tego zasobu. Jeśli nie zastosujesz niestandardowej odpowiedzi lub przyczyny przerwania dla atrapy, kontynuuje ona z domyślną odpowiedzią, którą normalnie otrzymałbyś. Pozwala to sprawdzić, ile razy przeglądarka wykonała żądanie, np. do określonego punktu końcowego API.

```js
const mock = await browser.mock('**/user', { method: 'post' })
console.log(mock.calls.length) // zwraca 0

// zarejestruj użytkownika
await $('#username').setValue('randomUser')
await $('password').setValue('password123')
await $('password_repeat').setValue('password123')
await $('button[type="submit"]').click()

// sprawdź, czy żądanie API zostało wykonane
expect(mock.calls.length).toBe(1)

// sprawdź odpowiedź
expect(mock.calls[0].body).toEqual({ success: true })
```

Jeśli musisz poczekać, aż pasujące żądanie odpowie, użyj `mock.waitForResponse(options)`. Zobacz referencje API: [waitForResponse](/docs/api/mock/waitForResponse).