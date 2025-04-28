---
id: url
title: url
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/url.ts
---

Il comando `url` carica un URL nel browser. Se nella configurazione è specificato un baseUrl, questo verrà preposto al parametro url utilizzando il metodo url.resolve() di node. Chiamare `browser.url('...')` con lo stesso url dell'ultima volta provocherà un ricaricamento della pagina. Tuttavia, se l'url contiene un hash, il browser non attiverà una nuova navigazione e l'utente dovrà [aggiornare](/docs/api/webdriver#refresh) la pagina per attivarne una.

Il comando restituisce un oggetto `WebdriverIO.Request` che contiene informazioni sulla richiesta e sui dati di risposta del caricamento della pagina:

```ts
interface WebdriverIO.Request {
  id?: string
  url: string
  timestamp: number
  navigation?: string
  redirectChain?: string[],
  headers: Record<string, string>
  cookies?: NetworkCookie[]
  \/**
   * Error message if request failed
   *\/
  error?: string
  response?: {
      fromCache: boolean
      headers: Record<string, string>
      mimeType: string
      status: number
  },
  /**
   * List of all requests that were made due to the main request.
   * Note: the list may be incomplete and does not contain request that were
   * made after the command has finished.
   *
   * The property will be undefined if the request is not a document request
   * that was initiated by the browser.
   *\/
  children?: Request[]
}
```

Il comando supporta le seguenti opzioni:

### wait
Lo stato desiderato in cui dovrebbe trovarsi la risorsa richiesta prima di completare il comando.
Supporta i seguenti stati:

 - `none`: nessuna attesa dopo l'invio della richiesta di pagina e la ricezione della risposta
 - `interactive`: attende finché la pagina non è interattiva
 - `complete`: attende finché l'albero DOM della pagina non è completamente caricato
 - `networkIdle`: attende finché non ci sono richieste di rete in sospeso

### headers

Intestazioni da inviare con la richiesta.

__Default:__ `{}`

### auth

Credenziali di autenticazione di base.
Nota: questo sovrascriverà l'intestazione `Authorization` esistente se fornita nell'opzione `headers`.

### timeout

Se impostato su un numero, il comando attenderà la quantità specificata di millisecondi affinché la pagina carichi tutte le risposte prima di restituire un risultato.

Nota: perché questo abbia un impatto, è necessario che l'opzione `wait` sia impostata su `networkIdle`.

__Default:__ `5000`

##### Utilizzo

```js
browser.url(url, { wait, timeout, onBeforeLoad, auth, headers })
```

##### Parametri

<table>
  <thead>
    <tr>
      <th>Nome</th><th>Tipo</th><th>Dettagli</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`string`</td>
      <td>l'URL a cui navigare</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`UrlOptions`</td>
      <td>opzioni di navigazione</td>
    </tr>
    <tr>
      <td><code><var>options.wait</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`'none', 'interactive', 'networkIdle', 'complete'`</td>
      <td>Lo stato desiderato in cui dovrebbe trovarsi la risorsa richiesta prima di completare il comando. Default: 'complete'</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`number`</td>
      <td>Se impostato su un numero, il comando attenderà la quantità specificata di millisecondi affinché la pagina carichi tutte le risposte prima di restituire un risultato. Default: 5000</td>
    </tr>
    <tr>
      <td><code><var>options.onBeforeLoad</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Function`</td>
      <td>Una funzione che viene chiamata prima che la pagina abbia caricato tutte le sue risorse. Consente di simulare facilmente l'ambiente, ad esempio sovrascrivere le API Web utilizzate dall'applicazione.</td>
    </tr>
    <tr>
      <td><code><var>options.auth</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`{user: string, pass: string}`</td>
      <td>credenziali di autenticazione di base</td>
    </tr>
    <tr>
      <td><code><var>options.headers</var></code><br /><span className="label labelWarning">opzionale</span></td>
      <td>`Record<string, string>`</td>
      <td>intestazioni da inviare con la richiesta</td>
    </tr>
  </tbody>
</table>

##### Esempi

```js title="url.js"
// navigate to a new URL
const request = await browser.url('https://webdriver.io');
// log url
console.log(request.url); // outputs: "https://webdriver.io"
console.log(request.response?.status); // outputs: 200
console.log(request.response?.headers); // outputs: { 'content-type': 'text/html; charset=UTF-8' }

```

```js title="baseUrlResolutions.js"
// With a base URL of http://example.com/site, the following url parameters resolve as such:
// When providing a scheme:
// https://webdriver.io
await browser.url('https://webdriver.io');

// When not starting with a slash, the URL resolves relative to the baseUrl
// http://example.com/site/relative
await browser.url('relative');

// When starting with a slash, the URL resolves relative to the root path of the baseUrl
// http://example.com/rootRelative
await browser.url('/rootRelative');

```

```js title="basicAuth.js"
// navigate to a URL with basic authentication
await browser.url('https://the-internet.herokuapp.com/basic_auth', {
    auth: {
        user
        pass
    }
});
await expect($('p=Congratulations! You must have the proper credentials.').toBeDisplayed();

```

```js title="onBeforeLoad.js"
// navigate to a URL and mock the battery API
await browser.url('https://pazguille.github.io/demo-battery-api/', {
    onBeforeLoad (win) {
        // mock "navigator.battery" property
        // returning mock charge object
        win.navigator.getBattery = () => Promise.resolve({
            level: 0.5,
            charging: false,
            chargingTime: Infinity,
            dischargingTime: 3600, // seconds
        })
    }
})
// now we can assert actual text - we are charged at 50%
await expect($('.battery-percentage')).toHaveText('50%')
// and has enough juice for 1 hour
await expect($('.battery-remaining')).toHaveText('01:00)
```

##### Restituisce

- **&lt;WebdriverIO.Request&gt;**
            **<code><var>returns</var></code>:**  un oggetto di richiesta del caricamento della pagina con informazioni sui dati della richiesta e della risposta