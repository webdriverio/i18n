---
id: url
title: url
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/url.ts
---

Команда `url` завантажує URL у браузері. Якщо в конфігурації вказано baseUrl, він буде доданий на початку параметра url, використовуючи метод url.resolve() з Node.js. Виклик `browser.url('...')` з тим самим url, що й минулого разу, спричинить перезавантаження сторінки. Однак, якщо url містить хеш, браузер не запустить нову навігацію, і користувачу доведеться [оновити](/docs/api/webdriver#refresh) сторінку, щоб запустити навігацію.

Команда повертає об'єкт `WebdriverIO.Request`, який містить інформацію про запит та дані відповіді при завантаженні сторінки:

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

Команда підтримує наступні опції:

### wait
Бажаний стан, у якому повинен бути запитуваний ресурс перед завершенням команди.
Підтримує наступні стани:

 - `none`: немає очікування після запиту сторінки та отримання відповіді
 - `interactive`: очікувати, поки сторінка не стане інтерактивною
 - `complete`: очікувати, поки DOM-дерево сторінки не буде повністю завантажено
 - `networkIdle`: очікувати, поки не залишиться незавершених мережевих запитів

### headers

Заголовки, які будуть надіслані з запитом.

__За замовчуванням:__ `{}`

### auth

Облікові дані для базової аутентифікації.
Примітка: це перезапише існуючий заголовок `Authorization`, якщо він наданий в опції `headers`.

### timeout

Якщо встановлено числове значення, команда буде чекати вказану кількість мілісекунд для завантаження всіх відповідей на сторінці перед поверненням.

Примітка: для того, щоб це мало вплив, потрібно встановити опцію `wait` на `networkIdle`.

__За замовчуванням:__ `5000`

##### Використання

```js
browser.url(url, { wait, timeout, onBeforeLoad, auth, headers })
```

##### Параметри

<table>
  <thead>
    <tr>
      <th>Назва</th><th>Тип</th><th>Деталі</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code><br /><span className="label labelWarning">необов'язковий</span></td>
      <td>`string`</td>
      <td>URL для навігації</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">необов'язковий</span></td>
      <td>`UrlOptions`</td>
      <td>опції навігації</td>
    </tr>
    <tr>
      <td><code><var>options.wait</var></code><br /><span className="label labelWarning">необов'язковий</span></td>
      <td>`'none', 'interactive', 'networkIdle', 'complete'`</td>
      <td>Бажаний стан, у якому повинен бути запитуваний ресурс перед завершенням команди. За замовчуванням: 'complete'</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">необов'язковий</span></td>
      <td>`number`</td>
      <td>Якщо встановлено числове значення, команда чекатиме вказану кількість мілісекунд для завантаження всіх відповідей на сторінці перед поверненням. За замовчуванням: 5000</td>
    </tr>
    <tr>
      <td><code><var>options.onBeforeLoad</var></code><br /><span className="label labelWarning">необов'язковий</span></td>
      <td>`Function`</td>
      <td>Функція, яка викликається перед тим, як ваша сторінка завантажить всі свої ресурси. Це дозволяє легко імітувати середовище, наприклад, перевизначити Web API, які використовує ваш додаток.</td>
    </tr>
    <tr>
      <td><code><var>options.auth</var></code><br /><span className="label labelWarning">необов'язковий</span></td>
      <td>`{user: string, pass: string}`</td>
      <td>облікові дані для базової аутентифікації</td>
    </tr>
    <tr>
      <td><code><var>options.headers</var></code><br /><span className="label labelWarning">необов'язковий</span></td>
      <td>`Record<string, string>`</td>
      <td>заголовки, які будуть надіслані з запитом</td>
    </tr>
  </tbody>
</table>

##### Приклади

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

##### Повертає

- **&lt;WebdriverIO.Request&gt;**
            **<code><var>returns</var></code>:**  об'єкт запиту завантаження сторінки з інформацією про дані запиту та відповіді