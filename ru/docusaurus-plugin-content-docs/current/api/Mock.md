---
id: mock
title: Объект Mock
---

Объект mock - это объект, представляющий сетевой мок и содержащий информацию о запросах, соответствующих заданному `url` и `filterOptions`. Его можно получить с помощью команды [`mock`](/docs/api/browser/mock).

:::info

Обратите внимание, что использование команды `mock` требует поддержки протокола Chrome DevTools.
Эта поддержка доступна при локальном запуске тестов в браузере на базе Chromium или при
использовании Selenium Grid версии 4 или выше. Эта команда __не может__ быть использована при запуске
автоматизированных тестов в облаке. Узнайте больше в разделе [Протоколы автоматизации](/docs/automationProtocols).

:::

Вы можете узнать больше о мокировании запросов и ответов в WebdriverIO в нашем руководстве [Моки и шпионы](/docs/mocksandspies).

## Свойства

Объект mock содержит следующие свойства:

| Имя | Тип | Детали |
| ---- | ---- | ------- |
| `url` | `String` | URL, переданный в команду mock |
| `filterOptions` | `Object` | Параметры фильтра ресурсов, переданные в команду mock |
| `browser` | `Object` | [Объект Browser](/docs/api/browser), используемый для получения объекта mock. |
| `calls` | `Object[]` | Информация о соответствующих запросах браузера, содержащая такие свойства, как `url`, `method`, `headers`, `initialPriority`, `referrerPolic`, `statusCode`, `responseHeaders` и `body` |

## Методы

Объекты mock предоставляют различные команды, перечисленные в разделе `mock`, которые позволяют пользователям изменять поведение запроса или ответа.

- [`abort`](/docs/api/mock/abort)
- [`abortOnce`](/docs/api/mock/abortOnce)
- [`clear`](/docs/api/mock/clear)
- [`request`](/docs/api/mock/request)
- [`requestOnce`](/docs/api/mock/requestOnce)
- [`respond`](/docs/api/mock/respond)
- [`respondOnce`](/docs/api/mock/respondOnce)
- [`restore`](/docs/api/mock/restore)

## События

Объект mock является EventEmitter, и для ваших сценариев использования генерируется несколько событий.

Вот список событий.

### `request`

Это событие генерируется при запуске сетевого запроса, соответствующего шаблонам мока. Запрос передается в обратный вызов события.

Интерфейс запроса:
```ts
interface RequestEvent {
    requestId: number
    request: Matches
    responseStatusCode: number
    responseHeaders: Record<string, string>
}
```

### `overwrite`

Это событие генерируется, когда сетевой ответ перезаписывается с помощью [`respond`](/docs/api/mock/respond) или [`respondOnce`](/docs/api/mock/respondOnce). Ответ передается в обратный вызов события.

Интерфейс ответа:
```ts
interface OverwriteEvent {
    requestId: number
    responseCode: number
    responseHeaders: Record<string, string>
    body?: string | Record<string, any>
}
```

### `fail`

Это событие генерируется, когда сетевой запрос прерывается с помощью [`abort`](/docs/api/mock/abort) или [`abortOnce`](/docs/api/mock/abortOnce). Отказ передается в обратный вызов события.

Интерфейс отказа:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

Это событие генерируется при добавлении нового совпадения, перед `continue` или `overwrite`. Совпадение передается в обратный вызов события.

Интерфейс совпадения:
```ts
interface MatchEvent {
    url: string // URL запроса (без фрагмента).
    urlFragment?: string // Фрагмент запрашиваемого URL, начинающийся с хэша, если он присутствует.
    method: string // Метод HTTP-запроса.
    headers: Record<string, string> // Заголовки HTTP-запроса.
    postData?: string // Данные HTTP POST-запроса.
    hasPostData?: boolean // True, когда запрос имеет данные POST.
    mixedContentType?: MixedContentType // Тип экспорта смешанного содержимого запроса.
    initialPriority: ResourcePriority // Приоритет запроса ресурса на момент отправки запроса.
    referrerPolicy: ReferrerPolicy // Политика реферера запроса, как определено в https://www.w3.org/TR/referrer-policy/
    isLinkPreload?: boolean // Загружается ли через предварительную загрузку ссылки.
    body: string | Buffer | JsonCompatible // Тело ответа фактического ресурса.
    responseHeaders: Record<string, string> // Заголовки HTTP-ответа.
    statusCode: number // Код состояния HTTP-ответа.
    mockedResponse?: string | Buffer // Если мок, генерирующий событие, также изменил свой ответ.
}
```

### `continue`

Это событие генерируется, когда сетевой ответ не был ни перезаписан, ни прерван, или если ответ уже был отправлен другим моком. `requestId` передается в обратный вызов события.

## Примеры

Получение количества ожидающих запросов:

```js
let pendingRequests = 0
const mock = await browser.mock('**') // важно соответствовать всем запросам, иначе результирующее значение может быть очень запутанным.
mock.on('request', ({request}) => {
    pendingRequests++
    console.log(`matched request to ${request.url}, pending ${pendingRequests} requests`)
})
mock.on('match', ({url}) => {
    pendingRequests--
    console.log(`resolved request to ${url}, pending ${pendingRequests} requests`)
})
```

Вызов ошибки при сетевом сбое 404:

```js
browser.addCommand('loadPageWithout404', (url, {selector, predicate}) => new Promise(async (resolve, reject) => {
    const mock = await this.mock('**')

    mock.on('match', ({url, statusCode}) => {
        if (statusCode === 404) {
            reject(new Error(`request to ${url} failed with "Not Found"`))
        }
    })

    await this.url(url).catch(reject)

    // ожидание здесь, потому что некоторые запросы могут все еще ожидать
    if (selector) {
        await this.$(selector).waitForExist().catch(reject)
    }

    if (predicate) {
        await this.waitUntil(predicate).catch(reject)
    }

    resolve()
}))

await browser.loadPageWithout404(browser, 'some/url', { selector: 'main' })
```

Определение, использовалось ли значение ответа мока:

```js
const firstMock = await browser.mock('**/foo/**')
const secondMock = await browser.mock('**/foo/bar/**')

firstMock.respondOnce({id: 3, title: 'three'})
secondMock.respond({id: 4, title: 'four'})

firstMock.on('overwrite', () => {
    // срабатывает для первого запроса к '**/foo/**'
}).on('continue', () => {
    // срабатывает для остальных запросов к '**/foo/**'
})

secondMock.on('continue', () => {
    // срабатывает для первого запроса к '**/foo/bar/**'
}).on('overwrite', () => {
    // срабатывает для остальных запросов к '**/foo/bar/**'
})
```

В этом примере `firstMock` был определен первым и имеет один вызов `respondOnce`, поэтому значение ответа `secondMock` не будет использоваться для первого запроса, но будет использоваться для остальных.