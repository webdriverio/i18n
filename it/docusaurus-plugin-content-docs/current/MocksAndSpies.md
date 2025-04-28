---
id: mocksandspies
title: Mock e Spy per le Richieste
---

WebdriverIO è dotato di supporto integrato per modificare le risposte di rete che ti permette di concentrarti sul testing della tua applicazione frontend senza dover configurare il backend o un server mock. Puoi definire risposte personalizzate per risorse web come richieste REST API nel tuo test e modificarle dinamicamente.

:::info

Nota che l'utilizzo del comando `mock` richiede il supporto per il protocollo Chrome DevTools. Tale supporto è garantito se esegui i test localmente in un browser basato su Chromium, tramite Selenium Grid v4 o superiore, o attraverso un fornitore cloud con supporto per il protocollo Chrome DevTools (ad esempio SauceLabs, BrowserStack, LambdaTest). Il supporto completo cross-browser sarà disponibile una volta che le primitive necessarie saranno implementate in [Webdriver Bidi](https://wpt.fyi/results/webdriver/tests/bidi/network?label=experimental&label=master&aligned) e implementate nei rispettivi browser.

:::

## Creazione di un mock

Prima di poter modificare qualsiasi risposta, devi prima definire un mock. Questo mock è descritto dall'URL della risorsa e può essere filtrato per [metodo di richiesta](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) o [headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers). La risorsa supporta espressioni glob tramite [minimatch](https://www.npmjs.com/package/minimatch):

```js
// mock di tutte le risorse che terminano con "/users/list"
const userListMock = await browser.mock('**/users/list')

// oppure puoi specificare il mock filtrando le risorse per headers o
// codice di stato, solo mock di richieste riuscite a risorse json
const strictMock = await browser.mock('**', {
    // mock di tutte le risposte json
    requestHeaders: { 'Content-Type': 'application/json' },
    // che hanno avuto successo
    statusCode: 200
})
```

## Specificare risposte personalizzate

Una volta definito un mock, puoi definire risposte personalizzate per esso. Queste risposte personalizzate possono essere un oggetto per rispondere con un JSON, un file locale per rispondere con un fixture personalizzato o una risorsa web per sostituire la risposta con una risorsa da internet.

### Mock di richieste API

Per creare mock di richieste API dove ti aspetti una risposta JSON, tutto ciò che devi fare è chiamare `respond` sull'oggetto mock con un oggetto arbitrario che desideri restituire, ad esempio:

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

Puoi anche modificare le intestazioni di risposta e il codice di stato passando alcuni parametri di risposta mock come segue:

```js
mock.respond({ ... }, {
    // risponde con codice di stato 404
    statusCode: 404,
    // unisce le intestazioni di risposta con le seguenti intestazioni
    headers: { 'x-custom-header': 'foobar' }
})
```

Se non vuoi che il mock chiami affatto il backend, puoi passare `false` per il flag `fetchResponse`.

```js
mock.respond({ ... }, {
    // non chiamare il backend effettivo
    fetchResponse: false
})
```

Si consiglia di memorizzare le risposte personalizzate in file fixture in modo da poterli richiedere nel test come segue:

```js
// richiede Node.js v16.14.0 o superiore per supportare le asserzioni di importazione JSON
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### Mock di risorse testuali

Se desideri modificare risorse testuali come file JavaScript, CSS o altre risorse basate su testo, puoi semplicemente inserire un percorso di file e WebdriverIO sostituirà la risorsa originale con esso, ad esempio:

```js
const scriptMock = await browser.mock('**/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// o rispondi con il tuo JS personalizzato
scriptMock.respond('alert("I am a mocked resource")')
```

### Reindirizzamento di risorse web

Puoi anche sostituire una risorsa web con un'altra risorsa web se la risposta desiderata è già ospitata sul web. Questo funziona sia con risorse di pagina individuali sia con una pagina web stessa, ad esempio:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // returns "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### Risposte dinamiche

Se la tua risposta mock dipende dalla risposta della risorsa originale, puoi anche modificare dinamicamente la risorsa passando una funzione che riceve la risposta originale come parametro e imposta il mock in base al valore di ritorno, ad esempio:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // sostituisce il contenuto todo con il loro numero di lista
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

## Interruzione dei mock

Invece di restituire una risposta personalizzata, puoi anche interrompere la richiesta con uno dei seguenti errori HTTP:

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

Questo è molto utile se vuoi bloccare script di terze parti dalla tua pagina che hanno un'influenza negativa sul tuo test funzionale. Puoi interrompere un mock semplicemente chiamando `abort` o `abortOnce`, ad esempio:

```js
const mock = await browser.mock('https://www.google-analytics.com/**')
mock.abort('Failed')
```

## Spy

Ogni mock è automaticamente una spy che conta il numero di richieste che il browser ha effettuato a quella risorsa. Se non applichi una risposta personalizzata o un motivo di interruzione al mock, esso continua con la risposta predefinita che normalmente riceveresti. Ciò ti consente di verificare quante volte il browser ha effettuato la richiesta, ad esempio a un determinato endpoint API.

```js
const mock = await browser.mock('**/user', { method: 'post' })
console.log(mock.calls.length) // returns 0

// registra utente
await $('#username').setValue('randomUser')
await $('password').setValue('password123')
await $('password_repeat').setValue('password123')
await $('button[type="submit"]').click()

// verifica se è stata effettuata la richiesta API
expect(mock.calls.length).toBe(1)

// verifica la risposta
expect(mock.calls[0].body).toEqual({ success: true })
```