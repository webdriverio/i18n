---
id: url
title: url
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/url.ts
---

Команда `url` загружает URL в браузере. Если в конфигурации указан baseUrl, он будет добавлен к параметру url с использованием метода url.resolve() из Node.js. Вызов `browser.url('...')` с тем же URL, что и в последний раз, вызовет перезагрузку страницы. Однако, если URL содержит хэш, браузер не запустит новую навигацию, и пользователю необходимо [обновить](/docs/api/webdriver#refresh) страницу, чтобы запустить новую.

Команда возвращает объект `WebdriverIO.Request`, который содержит информацию о запросе и данных ответа при загрузке страницы:

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

Команда поддерживает следующие опции:

### wait
Желаемое состояние запрашиваемого ресурса перед завершением команды.
Поддерживает следующие состояния:

 - `none`: без ожидания после выполнения запроса страницы и получения ответа
 - `interactive`: ожидание до тех пор, пока страница не станет интерактивной
 - `complete`: ожидание до полной загрузки DOM-дерева страницы
 - `networkIdle`: ожидание до тех пор, пока не останется ожидающих сетевых запросов

### headers

Заголовки, которые будут отправлены с запросом.

__По умолчанию:__ `{}`

### auth

Учетные данные для базовой аутентификации.
Примечание: это перезапишет существующий заголовок `Authorization`, если он предоставлен в опции `headers`.

### timeout

Если задано числовое значение, команда будет ждать указанное количество миллисекунд для загрузки всех ответов страницы перед возвратом.

Примечание: чтобы это имело эффект, требуется установить опцию `wait` в значение `networkIdle`.

__По умолчанию:__ `5000`

##### Использование

```js
browser.url(url, { wait, timeout, onBeforeLoad, auth, headers })
```

##### Параметры

<table>
  <thead>
    <tr>
      <th>Имя</th><th>Тип</th><th>Подробности</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>url</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`string`</td>
      <td>URL для навигации</td>
    </tr>
    <tr>
      <td><code><var>options</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`UrlOptions`</td>
      <td>опции навигации</td>
    </tr>
    <tr>
      <td><code><var>options.wait</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`'none', 'interactive', 'networkIdle', 'complete'`</td>
      <td>Желаемое состояние запрашиваемого ресурса перед завершением команды. По умолчанию: 'complete'</td>
    </tr>
    <tr>
      <td><code><var>options.timeout</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`number`</td>
      <td>Если задано числовое значение, команда будет ждать указанное количество миллисекунд для загрузки всех ответов страницы перед возвратом. По умолчанию: 5000</td>
    </tr>
    <tr>
      <td><code><var>options.onBeforeLoad</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`Function`</td>
      <td>Функция, которая вызывается до того, как ваша страница загрузит все свои ресурсы. Она позволяет легко изменить окружение, например, переопределить Web API, которые использует ваше приложение.</td>
    </tr>
    <tr>
      <td><code><var>options.auth</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`{user: string, pass: string}`</td>
      <td>учетные данные для базовой аутентификации</td>
    </tr>
    <tr>
      <td><code><var>options.headers</var></code><br /><span className="label labelWarning">необязательно</span></td>
      <td>`Record<string, string>`</td>
      <td>заголовки, которые будут отправлены с запросом</td>
    </tr>
  </tbody>
</table>

##### Примеры

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

##### Возвращает

- **&lt;WebdriverIO.Request&gt;**
            **<code><var>returns</var></code>:**  объект запроса загрузки страницы с информацией о данных запроса и ответа    