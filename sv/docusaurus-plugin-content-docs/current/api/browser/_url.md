---
id: url
title: url
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/url.ts
---

Kommandot `url` laddar en URL i webbläsaren. Om en baseUrl är specificerad i konfigurationen,
kommer den att läggas till i url-parametern med hjälp av node's url.resolve()-metod. Att anropa
`browser.url('...')` med samma url som tidigare kommer att utlösa en siduppdatering. Men
om url:en innehåller en hash kommer webbläsaren inte att utlösa en ny navigering och användaren
måste [uppdatera](/docs/api/webdriver#refresh) sidan för att utlösa en.

Kommandot returnerar ett `WebdriverIO.Request`-objekt som innehåller information om
begäran och svarsdata för sidladdningen:

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

Kommandot stöder följande alternativ:

### wait
Det önskade tillstånd som den begärda resursen ska befinna sig i innan kommandot avslutas.
Det stöder följande tillstånd:

 - `none`: ingen väntan efter att sidbegäran gjorts och svaret mottagits
 - `interactive`: vänta tills sidan är interaktiv
 - `complete`: vänta tills DOM-trädet för sidan är fullt laddat
 - `networkIdle`: vänta tills det inte finns några pågående nätverksbegäranden

### headers

Headers som ska skickas med begäran.

__Standard:__ `{}`

### auth

Grundläggande autentiseringsuppgifter.
Obs: detta kommer att skriva över den befintliga `Authorization`-headern om den tillhandahålls i alternativet `headers`.

### timeout

Om inställt på ett nummer kommer kommandot att vänta det angivna antalet millisekunder på att sidan ska ladda
alla svar innan det returnerar.

Obs: för att detta ska ha effekt krävs att alternativet `wait` är inställt på `networkIdle`.

__Standard:__ `5000`

##### Användning

```js
browser.url(url, { wait, timeout, onBeforeLoad, auth, headers })
```

##### Parametrar

<table>
  <thead>
    <tr>
      <th>Namn</th><th>Typ</th><th>Detaljer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`string`</td>
      <td>URL:en att navigera till</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`UrlOptions`</td>
      <td>navigeringsalternativ</td>
    </tr>
    <tr>
      <td><code><var>options.wait</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`'none', 'interactive', 'networkIdle', 'complete'`</td>
      <td>Det önskade tillstånd som den begärda resursen ska befinna sig i innan kommandot avslutas. Standard: 'complete'</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`number`</td>
      <td>Om inställt på ett nummer kommer kommandot att vänta det angivna antalet millisekunder på att sidan ska ladda
alla svar innan det returnerar. Standard: 5000</td>
    </tr>
    <tr>
      <td><code><var>options.onBeforeLoad</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Function`</td>
      <td>En funktion som anropas innan din sida har laddat alla resurser. Det låter dig enkelt
simulera miljön, t.ex. skriva över webbAPI:er som din applikation använder.</td>
    </tr>
    <tr>
      <td><code><var>options.auth</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`{user: string, pass: string}`</td>
      <td>grundläggande autentiseringsuppgifter</td>
    </tr>
    <tr>
      <td><code><var>options.headers</var></code><br /><span className="label labelWarning">valfri</span></td>
      <td>`Record<string, string>`</td>
      <td>headers som ska skickas med begäran</td>
    </tr>
  </tbody>
</table>

##### Exempel

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

##### Returnerar

- **&lt;WebdriverIO.Request&gt;**
            **<code><var>returns</var></code>:**  ett förfrågningsobjekt för sidladdningen med information om förfrågnings- och svarsdata