---
id: mocksandspies
title: Моки и шпионы запросов
---

WebdriverIO поставляется со встроенной поддержкой для модификации сетевых ответов, что позволяет сосредоточиться на тестировании вашего фронтенд-приложения без необходимости настраивать бэкенд или сервер-заглушку. Вы можете определить пользовательские ответы для веб-ресурсов, таких как запросы REST API, в вашем тесте и динамически изменять их.

:::info

Обратите внимание, что использование команды `mock` требует поддержки протокола Chrome DevTools. Такая поддержка предоставляется, если вы запускаете тесты локально в браузере на основе Chromium, через Selenium Grid v4 или выше, или через облачного поставщика с поддержкой протокола Chrome DevTools (например, SauceLabs, BrowserStack, LambdaTest). Полная кросс-браузерная поддержка будет доступна, когда необходимые примитивы появятся в [Webdriver Bidi](https://wpt.fyi/results/webdriver/tests/bidi/network?label=experimental&label=master&aligned) и будут реализованы в соответствующих браузерах.

:::

## Создание мока

Прежде чем вы сможете изменять любые ответы, вы должны сначала определить мок. Этот мок описывается URL-адресом ресурса и может быть отфильтрован по [методу запроса](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) или [заголовкам](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers). Ресурс поддерживает glob-выражения от [minimatch](https://www.npmjs.com/package/minimatch):

```js
// мокировать все ресурсы, оканчивающиеся на "/users/list"
const userListMock = await browser.mock('**/users/list')

// или вы можете указать мок, фильтруя ресурсы по заголовкам или
// коду статуса, мокировать только успешные запросы к json-ресурсам
const strictMock = await browser.mock('**', {
    // мокировать все json-ответы
    requestHeaders: { 'Content-Type': 'application/json' },
    // которые были успешными
    statusCode: 200
})
```

## Указание пользовательских ответов

После определения мока вы можете определить для него пользовательские ответы. Эти пользовательские ответы могут быть объектом для ответа в формате JSON, локальным файлом для ответа с пользовательским фикстурой или веб-ресурсом для замены ответа ресурсом из Интернета.

### Мокирование API-запросов

Чтобы мокировать API-запросы, где вы ожидаете JSON-ответ, все, что вам нужно сделать, это вызвать `respond` на объекте мок с произвольным объектом, который вы хотите вернуть, например:

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
// выводит: "[ 'Injected (non) completed Todo', 'Injected completed Todo' ]"
```

Вы также можете изменить заголовки ответа, а также код состояния, передав некоторые параметры мок-ответа следующим образом:

```js
mock.respond({ ... }, {
    // ответить с кодом состояния 404
    statusCode: 404,
    // объединить заголовки ответа со следующими заголовками
    headers: { 'x-custom-header': 'foobar' }
})
```

Если вы не хотите, чтобы мок вообще обращался к бэкенду, вы можете передать `false` для флага `fetchResponse`.

```js
mock.respond({ ... }, {
    // не вызывать реальный бэкенд
    fetchResponse: false
})
```

Рекомендуется хранить пользовательские ответы в файлах фикстур, чтобы вы могли просто импортировать их в своем тесте следующим образом:

```js
// требуется Node.js v16.14.0 или выше для поддержки утверждений импорта JSON
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### Мокирование текстовых ресурсов

Если вы хотите изменить текстовые ресурсы, такие как файлы JavaScript, CSS или другие текстовые ресурсы, вы можете просто передать путь к файлу, и WebdriverIO заменит исходный ресурс им, например:

```js
const scriptMock = await browser.mock('**/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// или ответить своим пользовательским JS
scriptMock.respond('alert("I am a mocked resource")')
```

### Перенаправление веб-ресурсов

Вы также можете просто заменить веб-ресурс другим веб-ресурсом, если ваш желаемый ответ уже размещен в Интернете. Это работает как с отдельными ресурсами страницы, так и с самой веб-страницей, например:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // возвращает "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### Динамические ответы

Если ваш мок-ответ зависит от ответа исходного ресурса, вы также можете динамически изменять ресурс, передав функцию, которая получает исходный ответ в качестве параметра и устанавливает мок на основе возвращаемого значения, например:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // заменить содержимое задачи на их порядковый номер
    return req.body.map((item, i) => ({ ...item, title: i }))
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li label').map((el) => el.getText()))
// возвращает
// [
//   '0',  '1',  '2',  '19', '20',
//   '21', '3',  '4',  '5',  '6',
//   '7',  '8',  '9',  '10', '11',
//   '12', '13', '14', '15', '16',
//   '17', '18', '22'
// ]
```

## Прерывание моков

Вместо возврата пользовательского ответа вы также можете просто прервать запрос с одной из следующих ошибок HTTP:

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

Это очень полезно, если вы хотите заблокировать сторонние скрипты с вашей страницы, которые имеют отрицательное влияние на ваш функциональный тест. Вы можете прервать мок, просто вызвав `abort` или `abortOnce`, например:

```js
const mock = await browser.mock('https://www.google-analytics.com/**')
mock.abort('Failed')
```

## Шпионы

Каждый мок автоматически является шпионом, который подсчитывает количество запросов, которые браузер сделал к этому ресурсу. Если вы не применяете пользовательский ответ или причину прерывания к моку, он продолжает с использованием ответа по умолчанию, который вы обычно получаете. Это позволяет проверить, сколько раз браузер делал запрос, например, к определенной конечной точке API.

```js
const mock = await browser.mock('**/user', { method: 'post' })
console.log(mock.calls.length) // возвращает 0

// регистрация пользователя
await $('#username').setValue('randomUser')
await $('password').setValue('password123')
await $('password_repeat').setValue('password123')
await $('button[type="submit"]').click()

// проверить, был ли сделан API-запрос
expect(mock.calls.length).toBe(1)

// проверить ответ
expect(mock.calls[0].body).toEqual({ success: true })
```