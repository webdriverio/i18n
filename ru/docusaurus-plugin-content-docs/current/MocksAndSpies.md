---
id: mocksandspies
title: Моки и шпионы запросов
description: "Мокируйте сетевые запросы и ответы в своих тестах с помощью browser.mock, прерывайте запросы и проверяйте вызовы с помощью шпионов."
---

WebdriverIO поставляется со встроенной поддержкой изменения сетевых ответов, что позволяет сосредоточиться на тестировании фронтенд-приложения без необходимости настраивать бэкенд или мок-сервер. Вы можете определять пользовательские ответы для веб-ресурсов, таких как запросы к REST API, прямо в тесте и динамически изменять их.

:::info

Обратите внимание, что для использования команды `mock` требуется поддержка WebDriver Bidi. Как правило, она есть при локальном запуске тестов в браузере на базе Chromium или в Firefox, а также при использовании Selenium Grid v4 или выше. Если вы запускаете тесты в облаке, убедитесь, что ваш облачный провайдер поддерживает WebDriver Bidi.

:::

## Создание мока

Прежде чем изменять какие-либо ответы, необходимо сначала определить мок. Мок описывается URL ресурса и может быть отфильтрован по [методу запроса](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) или [заголовкам](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers). Сопоставление ресурса выполняется с помощью [`URLPattern`](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern), где `*` соответствует любой последовательности символов. URL без протокола сопоставляется только с путём запроса, поэтому `*/users/list` соответствует этому пути на любом источнике (origin):

```js
// мокировать все ресурсы, заканчивающиеся на "/users/list"
const userListMock = await browser.mock('*/users/list')

// или можно задать мок, фильтруя ресурсы по заголовкам или
// коду статуса, мокировать только успешные запросы к json-ресурсам
const strictMock = await browser.mock('*', {
    // мокировать все json-ответы
    requestHeaders: { 'Content-Type': 'application/json' },
    // которые были успешными
    statusCode: 200
})

// вместо строки можно также передать `URLPattern`; полифил
// работает и в средах выполнения без нативной поддержки URLPattern
import { URLPattern } from 'urlpattern-polyfill'
const patternMock = await browser.mock(new URLPattern({ pathname: '/users/list' }))
```

:::warning

Используйте одиночный `*` для подстановочных знаков в URL; он также соответствует `/`. Последовательные подстановочные знаки перед фиксированным текстом, такие как `**/api/**` или `**/data.json`, могут вызывать чрезмерный возврат (backtracking) регулярных выражений на посторонних URL и приводить к зависанию теста. См. [issue #13548](https://github.com/webdriverio/webdriverio/issues/13548). В компонентных тестах также используйте фиксированные протокол и имя хоста, чтобы трафик раннера не попадал под перехват; см. [моки запросов в компонентном тестировании](/docs/component-testing/mocking#requests).

:::

## Задание пользовательских ответов

После того как мок определён, для него можно задать пользовательские ответы. Пользовательским ответом может быть объект для ответа в формате JSON, локальный файл для ответа пользовательской фикстурой или веб-ресурс для замены ответа ресурсом из интернета.

### Мокирование API-запросов

Чтобы мокировать API-запросы, от которых ожидается JSON-ответ, достаточно вызвать `respond` у объекта мока, передав произвольный объект, который нужно вернуть, например:

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

Также можно изменить заголовки ответа и код статуса, передав параметры мок-ответа следующим образом:

```js
mock.respond({ ... }, {
    // ответить с кодом статуса 404
    statusCode: 404,
    // объединить заголовки ответа со следующими заголовками
    headers: { 'x-custom-header': 'foobar' }
})
```

Если вы хотите, чтобы мок вообще не обращался к бэкенду, передайте `false` во флаг `fetchResponse`.

```js
mock.respond({ ... }, {
    // не обращаться к реальному бэкенду
    fetchResponse: false
})
```

`fetchResponse: false` никогда не обращается к бэкенду. Моку, созданному с фильтром `statusCode` или `responseHeaders`, нужен этот ответ, чтобы определить, подходит ли запрос, поэтому `respond()` и `respondOnce()` выбрасывают ошибку, если их совместить. Уберите фильтр по ответу или не задавайте `fetchResponse`, чтобы мок мог прочитать ответ бэкенда, а затем заменить его.

Рекомендуется хранить пользовательские ответы в файлах фикстур, чтобы их можно было просто подключить в тесте следующим образом:

```js
// требуется Node.js v16.14.0 или выше для поддержки JSON import assertions
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### Мокирование текстовых ресурсов

Если вы хотите изменить текстовые ресурсы, такие как JavaScript, CSS-файлы или другие текстовые ресурсы, можно просто передать путь к файлу, и WebdriverIO заменит им исходный ресурс, например:

```js
const scriptMock = await browser.mock('*/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// или ответить собственным JS-кодом
scriptMock.respond('alert("I am a mocked resource")')
```

### Перенаправление веб-ресурсов

Также можно просто заменить один веб-ресурс другим, если нужный ответ уже размещён в интернете. Это работает как с отдельными ресурсами страницы, так и с самой веб-страницей, например:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // возвращает "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js"
```

### Динамические ответы

Если ваш мок-ответ зависит от исходного ответа ресурса, можно также динамически изменять ресурс, передав функцию, которая получает исходный ответ в качестве параметра и задаёт мок на основе возвращаемого значения, например:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // заменить содержимое задач их номером в списке
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

Вместо возврата пользовательского ответа можно также просто прервать запрос с одной из следующих HTTP-ошибок:

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

Это очень полезно, если нужно заблокировать на странице сторонние скрипты, которые негативно влияют на ваш функциональный тест. Прервать мок можно, просто вызвав `abort` или `abortOnce`, например:

```js
const mock = await browser.mock('https://www.google-analytics.com/*')
mock.abort('Failed')
```

## Шпионы

Каждый мок автоматически является шпионом, который подсчитывает количество запросов, сделанных браузером к этому ресурсу. Если вы не задали для мока пользовательский ответ или причину прерывания, он продолжает работу со стандартным ответом, который вы бы получили в обычном случае. Это позволяет проверить, сколько раз браузер выполнил запрос, например, к определённому эндпоинту API.

```js
const mock = await browser.mock('*/user', { method: 'post' })
console.log(mock.calls.length) // возвращает 0

// регистрация пользователя
await $('#username').setValue('randomUser')
await $('password').setValue('password123')
await $('password_repeat').setValue('password123')
await $('button[type="submit"]').click()

// проверить, был ли выполнен API-запрос
expect(mock.calls.length).toBe(1)

// проверить ответ
expect(mock.calls[0].body).toEqual({ success: true })
```

Если нужно дождаться, пока на подходящий запрос придёт ответ, используйте `mock.waitForResponse(options)`. См. справочник API: [waitForResponse](/docs/api/mock/waitForResponse).

## Multi-remote

В браузере [multi-remote](/docs/multiremote) `mock()` возвращает `MultiRemoteMock`, а не один `Mock`. Такие методы, как `respond()` и `restore()`, выполняются на каждом экземпляре. `waitForResponse()` ожидает, пока каждый экземпляр не получит подходящий ответ. Перехваченные запросы сохраняются в моке для соответствующего браузера:

```ts
const mock = await browser.mock('*/user', { method: 'post' })
mock.respond({ success: true })

// зарегистрировать пользователя в каждом браузере, чтобы каждая сессия отправила запрос
await browser.$('#username').setValue('randomUser')
await browser.$('#password').setValue('password123')
await browser.$('#password_repeat').setValue('password123')
await browser.$('button[type="submit"]').click()

await mock.waitForResponse()

expect(mock.getInstance('myChromeBrowser').calls).toHaveLength(1)
expect(mock.getInstance('myFirefoxBrowser').calls).toHaveLength(1)
```

`mock.instances` перечисляет эти имена в том порядке, в котором были созданы моки. `getInstance` выбрасывает ошибку `Multi-remote object has no instance named "<name>"`, если имени нет в этом списке. Мок, созданный из `browser.select('myFirefoxBrowser', 'myChromeBrowser')`, указывает Firefox первым, что может отличаться от `browser.instances`.

Чтобы подменить ответы только для одного браузера, вызовите `mock()` на этом экземпляре:

```ts
const chromeOnly = await browser.getInstance('myChromeBrowser').mock('*/user')
```