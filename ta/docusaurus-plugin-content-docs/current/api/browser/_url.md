---
id: url
title: url
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/url.ts
---

`url` கட்டளை உலாவியில் ஒரு URL ஐ ஏற்றுகிறது. கட்டமைப்பில் baseUrl குறிப்பிடப்பட்டிருந்தால், அது node-இன் url.resolve() முறையைப் பயன்படுத்தி url அளவுருவுக்கு முன்னொட்டாக இணைக்கப்படும். கடைசி முறை போன்ற அதே url உடன் `browser.url('...')` அழைப்பது பக்கத்தை மீண்டும் ஏற்றும். இருப்பினும், url ஹாஷ் கொண்டிருந்தால், உலாவி புதிய வழிசெலுத்தலைத் தூண்டாது மற்றும் பயனர் ஒன்றைத் தூண்ட பக்கத்தை [refresh](/docs/api/webdriver#refresh) செய்ய வேண்டும்.

இந்த கட்டளை பக்க ஏற்றத்தின் கோரிக்கை மற்றும் பதில் தரவு பற்றிய தகவல்களைக் கொண்ட `WebdriverIO.Request` பொருளைத் திருப்பித் தருகிறது:

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

இந்த கட்டளை பின்வரும் விருப்பங்களை ஆதரிக்கிறது:

### wait
கோரப்பட்ட வளம் கட்டளையை முடிப்பதற்கு முன் இருக்க வேண்டிய விரும்பிய நிலை.
இது பின்வரும் நிலைகளை ஆதரிக்கிறது:

 - `none`: பக்க கோரிக்கை செய்யப்பட்டு பதில் பெறப்பட்ட பிறகு காத்திருக்க வேண்டாம்
 - `interactive`: பக்கம் ஊடாடக்கூடியதாக மாறும் வரை காத்திருக்கவும்
 - `complete`: பக்கத்தின் DOM மரம் முழுமையாக ஏற்றப்படும் வரை காத்திருக்கவும்
 - `networkIdle`: நிலுவையில் உள்ள நெட்வொர்க் கோரிக்கைகள் இல்லாத வரை காத்திருக்கவும்

### headers

கோரிக்கையுடன் அனுப்பப்பட வேண்டிய தலைப்புகள்.

__இயல்புநிலை:__ `{}`

### auth

அடிப்படை அங்கீகார சான்றுகள்.
குறிப்பு: இது `headers` விருப்பத்தில் வழங்கப்பட்டால், ஏற்கனவே உள்ள `Authorization` தலைப்பை மேலெழுதும்.

### timeout

எண்ணாக அமைக்கப்பட்டிருந்தால், கட்டளை திரும்புவதற்கு முன் பக்கம் அனைத்து பதில்களையும் ஏற்ற குறிப்பிட்ட மில்லிவினாடிகள் காத்திருக்கும்.

குறிப்பு: இது தாக்கத்தை ஏற்படுத்த, `wait` விருப்பம் `networkIdle` என அமைக்கப்பட வேண்டும்.

__இயல்புநிலை:__ `5000`

##### பயன்பாடு

```js
browser.url(url, { wait, timeout, onBeforeLoad, auth, headers })
```

##### அளவுருக்கள்

<table>
  <thead>
    <tr>
      <th>பெயர்</th><th>வகை</th><th>விவரங்கள்</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code><br /><span className="label labelWarning">விருப்பமானது</span></td>
      <td>`string`</td>
      <td>செல்ல வேண்டிய URL</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">விருப்பமானது</span></td>
      <td>`UrlOptions`</td>
      <td>வழிசெலுத்தல் விருப்பங்கள்</td>
    </tr>
    <tr>
      <td><code><var>options.wait</var></code><br /><span className="label labelWarning">விருப்பமானது</span></td>
      <td>`'none', 'interactive', 'networkIdle', 'complete'`</td>
      <td>கட்டளையை முடிப்பதற்கு முன் கோரப்பட்ட வளம் இருக்க வேண்டிய விரும்பிய நிலை. இயல்புநிலை: 'complete'</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">விருப்பமானது</span></td>
      <td>`number`</td>
      <td>எண்ணாக அமைக்கப்பட்டிருந்தால், கட்டளை திரும்புவதற்கு முன் பக்கம் அனைத்து பதில்களையும் ஏற்ற குறிப்பிட்ட மில்லிவினாடிகள் காத்திருக்கும். இயல்புநிலை: 5000</td>
    </tr>
    <tr>
      <td><code><var>options.onBeforeLoad</var></code><br /><span className="label labelWarning">விருப்பமானது</span></td>
      <td>`Function`</td>
      <td>உங்கள் பக்கம் அதன் அனைத்து வளங்களையும் ஏற்றுவதற்கு முன் அழைக்கப்படும் செயல்பாடு. இது சூழலை எளிதாக மாற்றியமைக்க அனுமதிக்கிறது, எ.கா. உங்கள் பயன்பாடு பயன்படுத்தும் வலை API களை மேலெழுதலாம்.</td>
    </tr>
    <tr>
      <td><code><var>options.auth</var></code><br /><span className="label labelWarning">விருப்பமானது</span></td>
      <td>`{user: string, pass: string}`</td>
      <td>அடிப்படை அங்கீகார சான்றுகள்</td>
    </tr>
    <tr>
      <td><code><var>options.headers</var></code><br /><span className="label labelWarning">விருப்பமானது</span></td>
      <td>`Record<string, string>`</td>
      <td>கோரிக்கையுடன் அனுப்பப்பட வேண்டிய தலைப்புகள்</td>
    </tr>
  </tbody>
</table>

##### உதாரணங்கள்

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

##### திரும்பப் பெறுபவை

- **&lt;WebdriverIO.Request&gt;**
            **<code><var>returns</var></code>:**  கோரிக்கை மற்றும் பதில் தரவு பற்றிய தகவலுடன் பக்க ஏற்றத்தின் கோரிக்கை பொருள்