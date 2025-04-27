---
id: url
title: url
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/url.ts
---

Der Befehl `url` lädt eine URL im Browser. Wenn eine baseUrl in der Konfiguration angegeben ist,
wird diese der URL mit Hilfe der url.resolve() Methode von Node vorangestellt. Ein Aufruf von
`browser.url('...')` mit derselben URL wie beim letzten Mal wird ein Neuladen der Seite auslösen. Wenn
die URL jedoch einen Hash enthält, wird der Browser keine neue Navigation auslösen und der Benutzer
muss die Seite [aktualisieren](/docs/api/webdriver#refresh), um eine neue Navigation auszulösen.

Der Befehl gibt ein `WebdriverIO.Request` Objekt zurück, das Informationen über die
Anfrage- und Antwortdaten des Seitenladevorgangs enthält:

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

Der Befehl unterstützt die folgenden Optionen:

### wait
Der gewünschte Zustand, in dem sich die angeforderte Ressource befinden soll, bevor der Befehl abgeschlossen wird.
Es unterstützt die folgenden Zustände:

 - `none`: kein Warten nach der Seitenanfrage und dem Empfang der Antwort
 - `interactive`: warten, bis die Seite interaktiv ist
 - `complete`: warten, bis der DOM-Baum der Seite vollständig geladen ist
 - `networkIdle`: warten, bis keine ausstehenden Netzwerkanfragen mehr vorhanden sind

### headers

Header, die mit der Anfrage gesendet werden sollen.

__Standard:__ `{}`

### auth

Anmeldeinformationen für die Basisauthentifizierung.
Hinweis: Dies überschreibt den vorhandenen `Authorization`-Header, wenn er in der Option `headers` angegeben ist.

### timeout

Wenn auf eine Zahl gesetzt, wartet der Befehl die angegebene Anzahl von Millisekunden, bis die Seite alle Antworten geladen hat, bevor er zurückkehrt.

Hinweis: Damit dies wirksam wird, muss die Option `wait` auf `networkIdle` gesetzt sein.

__Standard:__ `5000`

##### Verwendung

```js
browser.url(url, { wait, timeout, onBeforeLoad, auth, headers })
```

##### Parameter

<table>
  <thead>
    <tr>
      <th>Name</th><th>Typ</th><th>Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`string`</td>
      <td>die URL, zu der navigiert werden soll</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`UrlOptions`</td>
      <td>Navigationsoptionen</td>
    </tr>
    <tr>
      <td><code><var>options.wait</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`'none', 'interactive', 'networkIdle', 'complete'`</td>
      <td>Der gewünschte Zustand, in dem sich die angeforderte Ressource befinden soll, bevor der Befehl abgeschlossen wird. Standard: 'complete'</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`number`</td>
      <td>Wenn auf eine Zahl gesetzt, wartet der Befehl die angegebene Anzahl von Millisekunden, bis die Seite alle Antworten geladen hat, bevor er zurückkehrt. Standard: 5000</td>
    </tr>
    <tr>
      <td><code><var>options.onBeforeLoad</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Function`</td>
      <td>Eine Funktion, die aufgerufen wird, bevor Ihre Seite alle Ressourcen geladen hat. Dies ermöglicht es Ihnen, die Umgebung leicht zu mocken, z.B. Web-APIs zu überschreiben, die Ihre Anwendung verwendet.</td>
    </tr>
    <tr>
      <td><code><var>options.auth</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`{user: string, pass: string}`</td>
      <td>Anmeldedaten für die Basisauthentifizierung</td>
    </tr>
    <tr>
      <td><code><var>options.headers</var></code><br /><span className="label labelWarning">optional</span></td>
      <td>`Record<string, string>`</td>
      <td>Header, die mit der Anfrage gesendet werden sollen</td>
    </tr>
  </tbody>
</table>

##### Beispiele

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

##### Rückgabewert

- **&lt;WebdriverIO.Request&gt;**
            **<code><var>returns</var></code>:**  ein Anfrageobjekt des Seitenladevorgangs mit Informationen über die Anfrage- und Antwortdaten