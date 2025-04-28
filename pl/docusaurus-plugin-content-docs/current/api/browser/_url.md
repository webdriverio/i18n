---
id: url
title: url
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/url.ts
---

Polecenie `url` ładuje adres URL w przeglądarce. Jeśli w konfiguracji określono baseUrl, 
zostanie on dodany na początku parametru url przy użyciu metody url.resolve() węzła. Wywołanie
`browser.url('...')` z tym samym adresem url co ostatnio spowoduje przeładowanie strony. Jednak
jeśli adres url zawiera hash, przeglądarka nie wywoła nowej nawigacji i użytkownik
musi [odświeżyć](/docs/api/webdriver#refresh) stronę, aby ją uruchomić.

Polecenie zwraca obiekt `WebdriverIO.Request`, który zawiera informacje o
żądaniu i dane odpowiedzi podczas ładowania strony:

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

Polecenie obsługuje następujące opcje:

### wait
Pożądany stan, w którym żądany zasób powinien się znajdować przed zakończeniem polecenia.
Obsługuje następujące stany:

 - `none`: brak oczekiwania po wykonaniu żądania strony i otrzymaniu odpowiedzi
 - `interactive`: czeka, aż strona będzie interaktywna
 - `complete`: czeka, aż drzewo DOM strony zostanie w pełni załadowane
 - `networkIdle`: czeka, aż nie będzie oczekujących żądań sieciowych

### headers

Nagłówki do wysłania wraz z żądaniem.

__Domyślnie:__ `{}`

### auth

Poświadczenia uwierzytelniania podstawowego.
Uwaga: spowoduje to nadpisanie istniejącego nagłówka `Authorization`, jeśli został podany w opcji `headers`.

### timeout

Jeśli ustawiono na liczbę, polecenie będzie czekać określoną ilość milisekund na załadowanie strony
wszystkich odpowiedzi przed zwróceniem.

Uwaga: aby to miało wpływ, wymaga ustawienia opcji `wait` na `networkIdle`.

__Domyślnie:__ `5000`

##### Użycie

```js
browser.url(url, { wait, timeout, onBeforeLoad, auth, headers })
```

##### Parametry

<table>
  <thead>
    <tr>
      <th>Nazwa</th><th>Typ</th><th>Szczegóły</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code><br /><span className="label labelWarning">opcjonalnie</span></td>
      <td>`string`</td>
      <td>URL do nawigacji</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">opcjonalnie</span></td>
      <td>`UrlOptions`</td>
      <td>opcje nawigacji</td>
    </tr>
    <tr>
      <td><code><var>options.wait</var></code><br /><span className="label labelWarning">opcjonalnie</span></td>
      <td>`'none', 'interactive', 'networkIdle', 'complete'`</td>
      <td>Pożądany stan, w którym żądany zasób powinien się znajdować przed zakończeniem polecenia. Domyślnie: 'complete'</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">opcjonalnie</span></td>
      <td>`number`</td>
      <td>Jeśli ustawiono na liczbę, polecenie będzie czekać określoną ilość milisekund na załadowanie strony
wszystkich odpowiedzi przed zwróceniem. Domyślnie: 5000</td>
    </tr>
    <tr>
      <td><code><var>options.onBeforeLoad</var></code><br /><span className="label labelWarning">opcjonalnie</span></td>
      <td>`Function`</td>
      <td>Funkcja, która jest wywoływana zanim Twoja strona załaduje wszystkie swoje zasoby. Pozwala to łatwo
symulować środowisko, np. nadpisywać interfejsy API, z których korzysta Twoja aplikacja.</td>
    </tr>
    <tr>
      <td><code><var>options.auth</var></code><br /><span className="label labelWarning">opcjonalnie</span></td>
      <td>`{user: string, pass: string}`</td>
      <td>podstawowe poświadczenia uwierzytelniania</td>
    </tr>
    <tr>
      <td><code><var>options.headers</var></code><br /><span className="label labelWarning">opcjonalnie</span></td>
      <td>`Record<string, string>`</td>
      <td>nagłówki do wysłania wraz z żądaniem</td>
    </tr>
  </tbody>
</table>

##### Przykłady

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

##### Zwraca

- **&lt;WebdriverIO.Request&gt;**
            **<code><var>returns</var></code>:**  obiekt żądania ładowania strony z informacjami o danych żądania i odpowiedzi