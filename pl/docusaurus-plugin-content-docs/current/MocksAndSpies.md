---
id: mocksandspies
title: Mocki żądań i szpiedzy
description: "Mockuj żądania i odpowiedzi sieciowe w swoich testach za pomocą browser.mock, przerywaj żądania i sprawdzaj wywołania za pomocą szpiegów."
---

WebdriverIO ma wbudowaną obsługę modyfikowania odpowiedzi sieciowych, co pozwala skupić się na testowaniu aplikacji frontendowej bez konieczności konfigurowania backendu lub serwera mock. Możesz definiować niestandardowe odpowiedzi dla zasobów sieciowych, takich jak żądania REST API, w swoim teście i dynamicznie je modyfikować.

:::info

Pamiętaj, że użycie polecenia `mock` wymaga obsługi WebDriver Bidi. Zazwyczaj tak jest podczas uruchamiania testów lokalnie w przeglądarce opartej na Chromium lub w Firefoksie, a także w przypadku korzystania z Selenium Grid w wersji 4 lub nowszej. Jeśli uruchamiasz testy w chmurze, upewnij się, że Twój dostawca chmury obsługuje WebDriver Bidi.

:::

## Tworzenie mocka

Zanim będziesz mógł modyfikować jakiekolwiek odpowiedzi, musisz najpierw zdefiniować mock. Ten mock jest opisany przez URL zasobu i może być filtrowany według [metody żądania](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) lub [nagłówków](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers). Zasób jest dopasowywany za pomocą [`URLPattern`](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern), gdzie `*` pasuje do dowolnego ciągu znaków. URL bez protokołu jest dopasowywany tylko do ścieżki żądania, więc `*/users/list` pasuje do tej ścieżki w dowolnym originie:

```js
// mockuj wszystkie zasoby kończące się na "/users/list"
const userListMock = await browser.mock('*/users/list')

// lub możesz określić mock, filtrując zasoby według nagłówków lub
// kodu statusu, mockuj tylko udane żądania do zasobów json
const strictMock = await browser.mock('*', {
    // mockuj wszystkie odpowiedzi json
    requestHeaders: { 'Content-Type': 'application/json' },
    // które zakończyły się sukcesem
    statusCode: 200
})

// zamiast ciągu znaków możesz również przekazać `URLPattern`; polyfill
// działa także w środowiskach bez natywnej obsługi URLPattern
import { URLPattern } from 'urlpattern-polyfill'
const patternMock = await browser.mock(new URLPattern({ pathname: '/users/list' }))
```

:::warning

Używaj pojedynczego `*` jako symbolu wieloznacznego w URL; pasuje on również do `/`. Kolejne symbole wieloznaczne przed stałym tekstem, takie jak `**/api/**` lub `**/data.json`, mogą powodować nadmierny backtracking wyrażeń regularnych na niepowiązanych adresach URL i zawiesić test. Zobacz [issue #13548](https://github.com/webdriverio/webdriverio/issues/13548). W testach komponentów używaj także stałego protokołu i nazwy hosta, aby ruch runnera pozostawał poza przechwytywaniem; zobacz [mocki żądań w testowaniu komponentów](/docs/component-testing/mocking#requests).

:::

## Określanie niestandardowych odpowiedzi

Po zdefiniowaniu mocka możesz zdefiniować dla niego niestandardowe odpowiedzi. Te niestandardowe odpowiedzi mogą być obiektem, aby odpowiedzieć JSON-em, lokalnym plikiem, aby odpowiedzieć niestandardową fixturą, lub zasobem sieciowym, aby zastąpić odpowiedź zasobem z internetu.

### Mockowanie żądań API

Aby zamockować żądania API, w których oczekujesz odpowiedzi JSON, wystarczy wywołać `respond` na obiekcie mocka z dowolnym obiektem, który chcesz zwrócić, np.:

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
// wypisuje: "[ 'Injected (non) completed Todo', 'Injected completed Todo' ]"
```

Możesz także zmodyfikować nagłówki odpowiedzi oraz kod statusu, przekazując parametry odpowiedzi mocka w następujący sposób:

```js
mock.respond({ ... }, {
    // odpowiedz kodem statusu 404
    statusCode: 404,
    // scal nagłówki odpowiedzi z następującymi nagłówkami
    headers: { 'x-custom-header': 'foobar' }
})
```

Jeśli chcesz, aby mock w ogóle nie wywoływał backendu, możesz przekazać `false` dla flagi `fetchResponse`.

```js
mock.respond({ ... }, {
    // nie wywołuj rzeczywistego backendu
    fetchResponse: false
})
```

`fetchResponse: false` nigdy nie wywołuje backendu. Mock utworzony z filtrem `statusCode` lub `responseHeaders` potrzebuje tej odpowiedzi, aby zdecydować, czy pasuje, dlatego `respond()` i `respondOnce()` zgłaszają błąd, jeśli je połączysz. Usuń filtr odpowiedzi lub pozostaw `fetchResponse` nieustawione, aby mock mógł odczytać odpowiedź backendu, a następnie ją zastąpić.

Zaleca się przechowywanie niestandardowych odpowiedzi w plikach fixture, aby można było po prostu zaimportować je w teście w następujący sposób:

```js
// wymaga Node.js w wersji 16.14.0 lub nowszej do obsługi asercji importu JSON
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### Mockowanie zasobów tekstowych

Jeśli chcesz modyfikować zasoby tekstowe, takie jak JavaScript, pliki CSS lub inne zasoby tekstowe, możesz po prostu przekazać ścieżkę do pliku, a WebdriverIO zastąpi nim oryginalny zasób, np.:

```js
const scriptMock = await browser.mock('*/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// lub odpowiedz własnym kodem JS
scriptMock.respond('alert("I am a mocked resource")')
```

### Przekierowywanie zasobów sieciowych

Możesz także po prostu zastąpić zasób sieciowy innym zasobem sieciowym, jeśli żądana odpowiedź jest już hostowana w sieci. Działa to zarówno z pojedynczymi zasobami strony, jak i z samą stroną internetową, np.:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // zwraca "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### Dynamiczne odpowiedzi

Jeśli odpowiedź mocka zależy od oryginalnej odpowiedzi zasobu, możesz także dynamicznie modyfikować zasób, przekazując funkcję, która otrzymuje oryginalną odpowiedź jako parametr i ustawia mock na podstawie zwracanej wartości, np.:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // zastąp treść zadań ich numerem na liście
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

## Przerywanie mocków

Zamiast zwracać niestandardową odpowiedź, możesz także po prostu przerwać żądanie jednym z następujących błędów HTTP:

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

Jest to bardzo przydatne, jeśli chcesz zablokować na swojej stronie skrypty firm trzecich, które mają negatywny wpływ na Twój test funkcjonalny. Możesz przerwać mock, po prostu wywołując `abort` lub `abortOnce`, np.:

```js
const mock = await browser.mock('https://www.google-analytics.com/*')
mock.abort('Failed')
```

## Szpiedzy

Każdy mock jest automatycznie szpiegiem, który zlicza liczbę żądań wysłanych przez przeglądarkę do danego zasobu. Jeśli nie zastosujesz do mocka niestandardowej odpowiedzi ani powodu przerwania, będzie on kontynuował z domyślną odpowiedzią, którą normalnie byś otrzymał. Pozwala to sprawdzić, ile razy przeglądarka wysłała żądanie, np. do określonego endpointu API.

```js
const mock = await browser.mock('*/user', { method: 'post' })
console.log(mock.calls.length) // zwraca 0

// zarejestruj użytkownika
await $('#username').setValue('randomUser')
await $('password').setValue('password123')
await $('password_repeat').setValue('password123')
await $('button[type="submit"]').click()

// sprawdź, czy żądanie API zostało wysłane
expect(mock.calls.length).toBe(1)

// zweryfikuj odpowiedź
expect(mock.calls[0].body).toEqual({ success: true })
```

Jeśli musisz poczekać, aż pasujące żądanie otrzyma odpowiedź, użyj `mock.waitForResponse(options)`. Zobacz dokumentację API: [waitForResponse](/docs/api/mock/waitForResponse).

## Multi-remote

W przeglądarce [multi-remote](/docs/multiremote) `mock()` zwraca `MultiRemoteMock` zamiast pojedynczego `Mock`. Metody takie jak `respond()` i `restore()` są wykonywane na każdej instancji. `waitForResponse()` czeka, aż każda instancja otrzyma pasującą odpowiedź. Przechwycone żądania pozostają w mocku danej przeglądarki:

```ts
const mock = await browser.mock('*/user', { method: 'post' })
mock.respond({ success: true })

// zarejestruj użytkownika w każdej przeglądarce, aby każda sesja wysłała żądanie
await browser.$('#username').setValue('randomUser')
await browser.$('#password').setValue('password123')
await browser.$('#password_repeat').setValue('password123')
await browser.$('button[type="submit"]').click()

await mock.waitForResponse()

expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
expect(mock.getInstance('myFirefoxBrowser').calls).toHaveLength(1)
```

`mock.instances` wymienia te nazwy w kolejności, w jakiej mocki zostały utworzone. `getInstance` zgłasza błąd `Multi-remote object has no instance named "<name>"`, gdy nazwy nie ma na tej liście. Mock utworzony z `browser.select('myFirefoxBrowser', 'myChromeBrowser')` wymienia Firefoksa jako pierwszego, co może różnić się od `browser.instances`.

Aby zastąpić odpowiedzi tylko w jednej przeglądarce, wywołaj `mock()` na tej instancji:

```ts
const chromeOnly = await browser.getInstance('myChromeBrowser').mock('*/user')
```