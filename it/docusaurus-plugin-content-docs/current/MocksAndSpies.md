---
id: mocksandspies
title: Mock e Spy delle Richieste
description: "Simula richieste e risposte di rete nei tuoi test con browser.mock, interrompi le richieste e ispeziona le chiamate con gli spy."
---

WebdriverIO include il supporto integrato per modificare le risposte di rete, consentendoti di concentrarti sul test della tua applicazione frontend senza dover configurare il backend o un server mock. Puoi definire risposte personalizzate per risorse web come le richieste REST API nel tuo test e modificarle dinamicamente.

:::info

Nota che l'utilizzo del comando `mock` richiede il supporto per WebDriver Bidi. Questo è solitamente il caso quando si eseguono test localmente in un browser basato su Chromium o su Firefox, così come se si utilizza un Selenium Grid v4 o superiore. Se esegui i test nel cloud, assicurati che il tuo provider cloud supporti WebDriver Bidi.

:::

## Creare un mock

Prima di poter modificare qualsiasi risposta, devi prima definire un mock. Questo mock è descritto dall'URL della risorsa e può essere filtrato in base al [metodo della richiesta](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) o agli [header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers). La risorsa viene confrontata utilizzando un [`URLPattern`](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern), dove `*` corrisponde a qualsiasi sequenza di caratteri. Un URL senza protocollo viene confrontato solo con il percorso della richiesta, quindi `*/users/list` corrisponde a quel percorso su qualsiasi origine:

```js
// simula tutte le risorse che terminano con "/users/list"
const userListMock = await browser.mock('*/users/list')

// oppure puoi specificare il mock filtrando le risorse per header o
// codice di stato, simulando solo le richieste riuscite verso risorse json
const strictMock = await browser.mock('*', {
    // simula tutte le risposte json
    requestHeaders: { 'Content-Type': 'application/json' },
    // che sono andate a buon fine
    statusCode: 200
})

// invece di una stringa puoi anche passare un `URLPattern`; il polyfill
// funziona anche in runtime senza supporto nativo per URLPattern
import { URLPattern } from 'urlpattern-polyfill'
const patternMock = await browser.mock(new URLPattern({ pathname: '/users/list' }))
```

:::warning

Usa un singolo `*` per i caratteri jolly negli URL; corrisponde anche a `/`. Caratteri jolly consecutivi prima di un testo fisso, come `**/api/**` o `**/data.json`, possono causare un eccessivo backtracking delle regex su URL non correlati e bloccare un test. Vedi [issue #13548](https://github.com/webdriverio/webdriverio/issues/13548). Nei test dei componenti, usa anche un protocollo e un hostname fissi per mantenere il traffico del runner al di fuori dell'intercettazione; vedi [mock delle richieste nel component testing](/docs/component-testing/mocking#requests).

:::

## Specificare risposte personalizzate

Una volta definito un mock, puoi definire risposte personalizzate per esso. Queste risposte personalizzate possono essere un oggetto per rispondere con un JSON, un file locale per rispondere con una fixture personalizzata o una risorsa web per sostituire la risposta con una risorsa da internet.

### Simulare richieste API

Per simulare richieste API in cui ti aspetti una risposta JSON, tutto ciò che devi fare è chiamare `respond` sull'oggetto mock con un oggetto arbitrario che desideri restituire, ad esempio:

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

Puoi anche modificare gli header della risposta e il codice di stato passando alcuni parametri della risposta mock come segue:

```js
mock.respond({ ... }, {
    // rispondi con codice di stato 404
    statusCode: 404,
    // unisci gli header della risposta con i seguenti header
    headers: { 'x-custom-header': 'foobar' }
})
```

Se vuoi che il mock non chiami affatto il backend, puoi passare `false` per il flag `fetchResponse`.

```js
mock.respond({ ... }, {
    // non chiamare il backend reale
    fetchResponse: false
})
```

`fetchResponse: false` non chiama mai il backend. Un mock creato con un filtro `statusCode` o `responseHeaders` ha bisogno di quella risposta per decidere se c'è corrispondenza, quindi `respond()` e `respondOnce()` generano un errore se li combini. Rimuovi il filtro sulla risposta, oppure lascia `fetchResponse` non impostato in modo che il mock possa leggere la risposta del backend e poi sostituirla.

Si consiglia di memorizzare le risposte personalizzate in file fixture in modo da poterle semplicemente importare nel tuo test come segue:

```js
// richiede Node.js v16.14.0 o superiore per supportare le import assertion JSON
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### Simulare risorse di testo

Se desideri modificare risorse di testo come JavaScript, file CSS o altre risorse basate su testo, puoi semplicemente passare un percorso di file e WebdriverIO sostituirà la risorsa originale con esso, ad esempio:

```js
const scriptMock = await browser.mock('*/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// oppure rispondi con il tuo JS personalizzato
scriptMock.respond('alert("I am a mocked resource")')
```

### Reindirizzare risorse web

Puoi anche semplicemente sostituire una risorsa web con un'altra risorsa web se la risposta desiderata è già ospitata sul web. Questo funziona sia con singole risorse della pagina sia con una pagina web stessa, ad esempio:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // restituisce "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### Risposte dinamiche

Se la tua risposta mock dipende dalla risposta della risorsa originale, puoi anche modificare dinamicamente la risorsa passando una funzione che riceve la risposta originale come parametro e imposta il mock in base al valore restituito, ad esempio:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // sostituisci il contenuto dei todo con il loro numero nella lista
    return req.body.map((item, i) => ({ ...item, title: i }))
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li label').map((el) => el.getText()))
// restituisce
// [
//   '0',  '1',  '2',  '19', '20',
//   '21', '3',  '4',  '5',  '6',
//   '7',  '8',  '9',  '10', '11',
//   '12', '13', '14', '15', '16',
//   '17', '18', '22'
// ]
```

## Interrompere i mock

Invece di restituire una risposta personalizzata, puoi anche semplicemente interrompere la richiesta con uno dei seguenti errori HTTP:

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

Questo è molto utile se vuoi bloccare script di terze parti nella tua pagina che hanno un'influenza negativa sul tuo test funzionale. Puoi interrompere un mock semplicemente chiamando `abort` o `abortOnce`, ad esempio:

```js
const mock = await browser.mock('https://www.google-analytics.com/*')
mock.abort('Failed')
```

## Spy

Ogni mock è automaticamente uno spy che conta il numero di richieste che il browser ha effettuato verso quella risorsa. Se non applichi una risposta personalizzata o un motivo di interruzione al mock, questo prosegue con la risposta predefinita che riceveresti normalmente. Ciò ti consente di verificare quante volte il browser ha effettuato la richiesta, ad esempio verso un determinato endpoint API.

```js
const mock = await browser.mock('*/user', { method: 'post' })
console.log(mock.calls.length) // restituisce 0

// registra l'utente
await $('#username').setValue('randomUser')
await $('password').setValue('password123')
await $('password_repeat').setValue('password123')
await $('button[type="submit"]').click()

// verifica se la richiesta API è stata effettuata
expect(mock.calls.length).toBe(1)

// verifica la risposta
expect(mock.calls[0].body).toEqual({ success: true })
```

Se devi attendere finché una richiesta corrispondente non ha ricevuto risposta, usa `mock.waitForResponse(options)`. Consulta il riferimento API: [waitForResponse](/docs/api/mock/waitForResponse).

## Multi-remote

Su un browser [multi-remote](/docs/multiremote), `mock()` restituisce un `MultiRemoteMock` invece di un singolo `Mock`. Metodi come `respond()` e `restore()` vengono eseguiti su ogni istanza. `waitForResponse()` attende finché ogni istanza non ha una risposta corrispondente. Le richieste catturate rimangono sul mock di quel browser:

```ts
const mock = await browser.mock('*/user', { method: 'post' })
mock.respond({ success: true })

// registra un utente in ogni browser in modo che ogni sessione invii la richiesta
await browser.$('#username').setValue('randomUser')
await browser.$('#password').setValue('password123')
await browser.$('#password_repeat').setValue('password123')
await browser.$('button[type="submit"]').click()

await mock.waitForResponse()

expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
expect(mock.getInstance('myFirefoxBrowser').calls).toHaveLength(1)
```

`mock.instances` elenca quei nomi nell'ordine in cui i mock sono stati creati. `getInstance` genera l'errore `Multi-remote object has no instance named "<name>"` quando il nome non è presente in quella lista. Un mock creato da `browser.select('myFirefoxBrowser', 'myChromeBrowser')` elenca Firefox per primo, il che può differire da `browser.instances`.

Per simulare un solo browser, chiama `mock()` su quell'istanza:

```ts
const chromeOnly = await browser.getInstance('myChromeBrowser').mock('*/user')
```