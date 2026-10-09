---
id: mock
title: Объект Mock
---

Объект mock — это объект, который представляет сетевой мок и содержит информацию о запросах, соответствующих заданным `url` и `filterOptions`. Его можно получить с помощью команды [`mock`](/docs/api/browser/mock).

:::info

Обратите внимание, что для использования команды `mock` требуется поддержка протокола Chrome DevTools.
Такая поддержка есть, если вы запускаете тесты локально в браузере на основе Chromium или
используете Selenium Grid версии 4 или выше. Эту команду __нельзя__ использовать при запуске
автоматизированных тестов в облаке. Подробнее читайте в разделе [Протоколы автоматизации](/docs/automationProtocols).

:::

Подробнее о мокировании запросов и ответов в WebdriverIO можно прочитать в нашем руководстве [Моки и шпионы](/docs/mocksandspies).

## Multi-remote

В браузере [multi-remote](/docs/multiremote) метод [`browser.mock()`](/docs/api/browser/mock) возвращает `MultiRemoteMock` вместо этого объекта. `instances` содержит список имён браузеров, а `getInstance(name)` возвращает `Mock` для указанного браузера. `respond()`, `restore()` и другие методы, перечисленные ниже, выполняются на каждом экземпляре. `calls` остаётся на моке каждого экземпляра: `mock.getInstance('myChromeBrowser').calls`.

`getInstance` выбрасывает ошибку `Multi-remote object has no instance named "<name>"`, если `name` не входит в `instances`.

## Свойства

Объект mock содержит следующие свойства:

| Имя | Тип | Подробности |
| ---- | ---- | ------- |
| `url` | `String` | URL, переданный в команду mock |
| `filterOptions` | `Object` | Параметры фильтрации ресурсов, переданные в команду mock |
| `browser` | `Object` | [Объект Browser](/docs/api/browser), использованный для получения объекта mock. |
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
- [`waitForResponse`](/docs/api/mock/waitForResponse)

## События

Объект mock является EventEmitter, и для ваших сценариев использования генерируется несколько событий.

Ниже приведён список событий.

### `request`

Это событие генерируется при запуске сетевого запроса, который соответствует шаблонам мока. Запрос передаётся в колбэк события.

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

Это событие генерируется, когда сетевой ответ перезаписывается с помощью [`respond`](/docs/api/mock/respond) или [`respondOnce`](/docs/api/mock/respondOnce). Ответ передаётся в колбэк события.

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

Это событие генерируется, когда сетевой запрос прерывается с помощью [`abort`](/docs/api/mock/abort) или [`abortOnce`](/docs/api/mock/abortOnce). Информация о сбое передаётся в колбэк события.

Интерфейс сбоя:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

Это событие генерируется при добавлении нового совпадения, перед `continue` или `overwrite`. Совпадение передаётся в колбэк события.

Интерфейс совпадения:
```ts
interface MatchEvent {
    url: string // URL запроса (без фрагмента).
    urlFragment?: string // Фрагмент запрошенного URL, начинающийся с решётки, если он есть.
    method: string // Метод HTTP-запроса.
    headers: Record<string, string> // Заголовки HTTP-запроса.
    postData?: string // Данные HTTP POST-запроса.
    hasPostData?: boolean // True, если запрос содержит POST-данные.
    mixedContentType?: MixedContentType // Тип смешанного содержимого запроса.
    initialPriority: ResourcePriority // Приоритет запроса ресурса на момент отправки запроса.
    referrerPolicy: ReferrerPolicy // Политика реферера запроса, как определено в https://www.w3.org/TR/referrer-policy/
    isLinkPreload?: boolean // Загружается ли через link preload.
    body: string | Buffer | JsonCompatible // Тело ответа фактического ресурса.
    responseHeaders: Record<string, string> // Заголовки HTTP-ответа.
    statusCode: number // Код состояния HTTP-ответа.
    mockedResponse?: string | Buffer // Если мок, генерирующий событие, также изменил его ответ.
}
```

### `continue`

Это событие генерируется, когда сетевой ответ не был ни перезаписан, ни прерван, или если ответ уже был отправлен другим моком. `requestId` передаётся в колбэк события.

## Примеры

Получение количества ожидающих запросов:

```js
let pendingRequests = 0
const mock = await browser.mock('**') // важно сопоставлять все запросы, иначе итоговое значение может сильно запутать.
mock.on('request', ({request}) => {
    pendingRequests++
    console.log(`matched request to ${request.url}, pending ${pendingRequests} requests`)
})
mock.on('match', ({url}) => {
    pendingRequests--
    console.log(`resolved request to ${url}, pending ${pendingRequests} requests`)
})
```

Выброс ошибки при сетевом сбое 404:

```js
browser.addCommand('loadPageWithout404', (url, {selector, predicate}) => new Promise(async (resolve, reject) => {
    const mock = await this.mock('**')

    mock.on('match', ({url, statusCode}) => {
        if (statusCode === 404) {
            reject(new Error(`request to ${url} failed with "Not Found"`))
        }
    })

    await this.url(url).catch(reject)

    // ожидаем здесь, потому что некоторые запросы всё ещё могут быть в ожидании
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

Определение того, было ли использовано значение ответа мока:

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

В этом примере `firstMock` был определён первым и имеет один вызов `respondOnce`, поэтому значение ответа `secondMock` не будет использовано для первого запроса, но будет использовано для всех остальных.