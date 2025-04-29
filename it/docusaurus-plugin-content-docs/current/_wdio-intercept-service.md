---
id: wdio-intercept-service
title: Servizio di Intercettazione
custom_edit_url: https://github.com/webdriverio-community/wdio-intercept-service/edit/main/README.md
---


> wdio-intercept-service è un pacchetto di terze parti, per maggiori informazioni consultare [GitHub](https://github.com/webdriverio-community/wdio-intercept-service) | [npm](https://www.npmjs.com/package/wdio-intercept-service)

🕸 Cattura e verifica le chiamate HTTP ajax in [webdriver.io](http://webdriver.io/)

[![Tests](https://github.com/webdriverio-community/wdio-intercept-service/actions/workflows/test.yaml/badge.svg)](https://github.com/webdriverio-community/wdio-intercept-service/actions/workflows/test.yaml) [![Join the chat on Discord](https://img.shields.io/discord/1097401827202445382?logo=discord&logoColor=FFFFFF&color=5865F2)](https://discord.webdriver.io/)

Questo è un plugin per [webdriver.io](http://webdriver.io/). Se non lo conosci ancora, dacci un'occhiata, è davvero interessante.

Sebbene selenium e webdriver siano utilizzati per test e2e e in particolare per i test dell'interfaccia utente, potresti voler valutare le richieste HTTP effettuate dal tuo codice client (ad esempio quando non hai un feedback immediato dell'interfaccia utente, come nelle metriche o nelle chiamate di tracciamento). Con wdio-intercept-service puoi intercettare le chiamate HTTP ajax avviate da un'azione dell'utente (ad esempio la pressione di un pulsante, ecc.) e fare delle asserzioni sulla richiesta e le relative risposte in seguito.

C'è però un problema: non puoi intercettare le chiamate HTTP che vengono avviate al caricamento della pagina (come nella maggior parte delle SPA), poiché richiede un lavoro di configurazione che può essere fatto solo dopo che la pagina è caricata (a causa delle limitazioni in selenium). **Ciò significa che puoi catturare solo le richieste che sono state avviate all'interno di un test.** Se questo non è un problema per te, questo plugin potrebbe fare al caso tuo, quindi continua a leggere.

## Prerequisiti

* webdriver.io **v5.x** o più recente.

**Attenzione! Se stai ancora usando webdriver.io v4, per favore usa il ramo v2.x di questo plugin!**

## Installazione

```shell
npm install wdio-intercept-service -D
```

## Utilizzo

### Utilizzo con WebDriver CLI

Dovrebbe essere facile come aggiungere wdio-intercept-service al tuo `wdio.conf.js`:

```javascript
exports.config = {
  // ...
  services: ['intercept']
  // ...
};
```

e sei pronto.

### Utilizzo con WebDriver Standalone

Quando si utilizza WebdriverIO Standalone, le funzioni `before` e `beforeTest` / `beforeScenario` devono essere chiamate manualmente.

```javascript
import { remote } from 'webdriverio';
import WebdriverAjax from 'wdio-intercept-service'

const WDIO_OPTIONS = {
  port: 9515,
  path: '/',
  capabilities: {
    browserName: 'chrome'
  },
}

let browser;
const interceptServiceLauncher = WebdriverAjax();

beforeAll(async () => {
  browser = await remote(WDIO_OPTIONS)
  interceptServiceLauncher.before(null, null, browser)
})

beforeEach(async () => {
  interceptServiceLauncher.beforeTest()
})

afterAll(async () => {
  await client.deleteSession()
});

describe('', async () => {
  ... // See example usage
});
```

Una volta inizializzato, alcune funzioni correlate vengono aggiunte alla tua catena di comandi del browser (vedi [API](#api)).

## Avvio rapido

Esempio di utilizzo:

```javascript
browser.url('http://foo.bar');
browser.setupInterceptor(); // capture ajax calls
browser.expectRequest('GET', '/api/foo', 200); // expect GET request to /api/foo with 200 statusCode
browser.expectRequest('POST', '/api/foo', 400); // expect POST request to /api/foo with 400 statusCode
browser.expectRequest('GET', /\/api\/foo/, 200); // can validate a URL with regex, too
browser.click('#button'); // button that initiates ajax request
browser.pause(1000); // maybe wait a bit until request is finished
browser.assertRequests(); // validate the requests
```

Ottieni dettagli sulle richieste:

```javascript
browser.url('http://foo.bar')
browser.setupInterceptor();
browser.click('#button')
browser.pause(1000);

var request = browser.getRequest(0);
assert.equal(request.method, 'GET');
assert.equal(request.response.headers['content-length'], '42');
```

## Browser supportati

Dovrebbe funzionare con versioni recenti di tutti i browser. Si prega di segnalare un problema se non sembra funzionare con il tuo.

## API

Consulta il file di dichiarazione TypeScript per la sintassi completa dei comandi personalizzati aggiunti all'oggetto browser WebdriverIO. In generale, qualsiasi metodo che accetta un oggetto "options" come parametro può essere chiamato senza quel parametro per ottenere il comportamento predefinito. Questi oggetti "optional options" sono seguiti da `?: = {}` e i valori predefiniti dedotti sono descritti per ogni metodo.

### Descrizione delle opzioni

Questa libreria offre una piccola quantità di configurazione quando si emettono comandi. Le opzioni di configurazione utilizzate da più metodi sono descritte qui (vedi la definizione di ciascun metodo per determinare il supporto specifico).

* `orderBy` (`'START' | 'END'`): Questa opzione controlla l'ordinamento delle richieste catturate dall'interceptor, quando vengono restituite al tuo test. Per compatibilità con le versioni esistenti di questa libreria, l'ordinamento predefinito è `'END'`, che corrisponde a quando la richiesta è stata completata. Se imposti l'opzione `orderBy` su `'START'`, le richieste verranno ordinate in base al momento in cui sono state avviate.
* `includePending` (`boolean`): Questa opzione controlla se le richieste non ancora completate verranno restituite. Per compatibilità con le versioni esistenti di questa libreria, il valore predefinito è `false`, e verranno restituite solo le richieste completate.

### browser.setupInterceptor()

Cattura le chiamate ajax nel browser. Devi sempre chiamare la funzione di setup per poter valutare le richieste in seguito.

### browser.disableInterceptor()

Impedisce l'ulteriore cattura di chiamate ajax nel browser. Tutte le informazioni di richiesta catturate vengono rimosse. La maggior parte degli utenti non avrà bisogno di disabilitare l'interceptor, ma se un test è particolarmente lungo o supera la capacità di archiviazione della sessione, la disabilitazione dell'interceptor può essere utile.

### `browser.excludeUrls(urlRegexes: (string | RegExp)[])`

Esclude le richieste da determinati URL dalla registrazione. Accetta un array di stringhe o espressioni regolari. Prima di scrivere nell'archiviazione, verifica l'URL della richiesta rispetto a ogni stringa o regex. Se corrisponde, la richiesta non viene scritta nell'archiviazione. Come disableInterceptor, può essere utile se si verificano problemi con il superamento della capacità di archiviazione della sessione.

### browser.expectRequest(method: string, url: string, statusCode: number)

Crea aspettative sulle richieste ajax che verranno avviate durante il test. Può (e dovrebbe) essere concatenato. L'ordine delle aspettative dovrebbe corrispondere all'ordine delle richieste effettuate.

* `method` (`String`): metodo http previsto. Può essere qualsiasi cosa che `xhr.open()` accetta come primo argomento.
* `url` (`String`|`RegExp`): URL esatto che viene chiamato nella richiesta come stringa o RegExp da abbinare
* `statusCode` (`Number`): codice di stato previsto della risposta

### browser.getExpectations()

Metodo di supporto. Restituisce tutte le aspettative create fino a quel momento

### browser.resetExpectations()

Metodo di supporto. Reimposta tutte le aspettative create fino a quel momento

### `browser.assertRequests({ orderBy?: 'START' | 'END' }?: = {})`

Chiama questo metodo quando tutte le richieste ajax previste sono terminate. Confronta le aspettative con le richieste effettivamente effettuate e verifica quanto segue:

- Conteggio delle richieste effettuate
- L'ordine delle richieste
- Il metodo, l'URL e lo statusCode dovrebbero corrispondere per ogni richiesta effettuata
- L'oggetto delle opzioni predefinito è `{ orderBy: 'END' }`, ovvero quando le richieste sono state completate, per essere coerente con il comportamento della v4.1.10 e precedenti. Quando l'opzione `orderBy` è impostata su `'START'`, le richieste verranno ordinate in base a quando sono state avviate dalla pagina.

### `browser.assertExpectedRequestsOnly({ inOrder?: boolean, orderBy?: 'START' | 'END' }?: = {})`

Simile a `browser.assertRequests`, ma convalida solo le richieste specificate nelle direttive `expectRequest`, senza dover mappare tutte le richieste di rete che potrebbero verificarsi. Se l'opzione `inOrder` è `true` (predefinito), le richieste dovrebbero essere trovate nello stesso ordine in cui sono state impostate con `expectRequest`.

### `browser.getRequest(index: number, { includePending?: boolean, orderBy?: 'START' | 'END' }?: = {})`

Per fare asserzioni più sofisticate su una richiesta specifica, puoi ottenere dettagli per una richiesta specifica. Devi fornire l'indice basato su 0 della richiesta a cui vuoi accedere, nell'ordine in cui le richieste sono state completate (predefinito) o avviate (passando l'opzione `orderBy: 'START'`).

* `index` (`number`): numero della richiesta a cui vuoi accedere
* `options` (`object`): Opzioni di configurazione
* `options.includePending` (`boolean`): Se le richieste non ancora completate dovrebbero essere restituite. Per impostazione predefinita, questo è false, per corrispondere al comportamento della libreria nella v4.1.10 e precedenti.
* `options.orderBy` (`'START' | 'END'`): Come dovrebbero essere ordinate le richieste. Per impostazione predefinita, questo è `'END'`, per corrispondere al comportamento della libreria nella v4.1.10 e precedenti. Se `'START'`, le richieste verranno ordinate in base al momento dell'avvio, anziché al momento del completamento della richiesta. (Poiché una richiesta in sospeso non è ancora stata completata, quando si ordina per `'END'` tutte le richieste in sospeso verranno dopo tutte le richieste completate).

**Restituisce** l'oggetto `request`:

* `request.url`: URL richiesto
* `request.method`: metodo HTTP utilizzato
* `request.body`: dati di payload/corpo utilizzati nella richiesta
* `request.headers`: intestazioni http della richiesta come oggetto JS
* `request.pending`: flag booleano che indica se questa richiesta è completa (cioè ha una proprietà `response`) o in corso.
* `request.response`: un oggetto JS che è presente solo se la richiesta è completata (cioè `request.pending === false`), contenente dati sulla risposta.
* `request.response?.headers`: intestazioni http della risposta come oggetto JS
* `request.response?.body`: corpo della risposta (sarà analizzato come JSON se possibile)
* `request.response?.statusCode`: codice di stato della risposta

**Una nota su `request.body`:** wdio-intercept-service cercherà di analizzare il corpo della richiesta come segue:

* string: Restituisce semplicemente la stringa (`'value'`)
* JSON: Analizza l'oggetto JSON usando `JSON.parse()` (`({ key: value })`)
* FormData: Mostrerà il FormData nel formato `{ key: [value1, value2, ...] }`
* ArrayBuffer: Cercherà di convertire il buffer in una stringa (sperimentale)
* Qualsiasi altra cosa: Userà un brutale `JSON.stringify()` sui tuoi dati. Buona fortuna!

**Per l'API `fetch`, supportiamo solo dati string e JSON!**

### `browser.getRequests({ includePending?: boolean, orderBy?: 'START' | 'END' }?: = {})`

Ottieni tutte le richieste catturate come array, supportando le stesse opzioni opzionali di `getRequest`.

**Restituisce** un array di oggetti `request`.

### browser.hasPendingRequests()

Un metodo di utilità che verifica se ci sono ancora richieste HTTP in sospeso. Può essere utilizzato dai test per garantire che tutte le richieste siano state completate entro un tempo ragionevole o per verificare che una chiamata a `getRequests()` o `assertRequests()` includerà tutte le richieste HTTP desiderate.

**Restituisce** boolean

## Supporto TypeScript

Questo plugin fornisce i propri tipi TS. Basta puntare il tuo tsconfig alle estensioni di tipo come menzionato [qui](https://webdriver.io/docs/typescript.html#framework-types):

```
"compilerOptions": {
    // ..
    "types": ["node", "webdriverio", "wdio-intercept-service"]
},
```

## Esecuzione dei test

Sono necessarie versioni recenti di Chrome e Firefox per eseguire i test localmente. Potrebbe essere necessario aggiornare le dipendenze `chromedriver` e `geckodriver` per farle corrispondere alla versione installata sul tuo sistema.

```shell
npm test
```

## Contribuire

Sono felice per ogni contributo. Basta aprire un issue o inviare direttamente una PR.  
Si prega di notare che questa libreria di intercettazione è scritta per funzionare con browser legacy come Internet Explorer. Di conseguenza, qualsiasi codice utilizzato in `lib/interceptor.js` deve essere almeno analizzabile dal runtime JavaScript di Internet Explorer.

## Licenza

MIT