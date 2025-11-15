---
id: mock
title: Об'єкт Mock
---

Об'єкт mock — це об'єкт, що представляє мережевий макет і містить інформацію про запити, які відповідають заданому `url` і `filterOptions`. Його можна отримати за допомогою команди [`mock`](/docs/api/browser/mock).

:::info

Зауважте, що використання команди `mock` вимагає підтримки протоколу Chrome DevTools.
Ця підтримка надається, якщо ви запускаєте тести локально в браузері на основі Chromium або якщо
ви використовуєте Selenium Grid версії 4 або вище. Цю команду __неможливо__ використовувати при запуску
автоматизованих тестів у хмарі. Дізнайтеся більше в розділі [Протоколи автоматизації](/docs/automationProtocols).

:::

Ви можете прочитати більше про імітацію запитів та відповідей у WebdriverIO в нашому посібнику [Макети та шпигуни](/docs/mocksandspies).

## Властивості

Об'єкт mock містить такі властивості:

| Назва | Тип | Деталі |
| ---- | ---- | ------- |
| `url` | `String` | URL, переданий у команду mock |
| `filterOptions` | `Object` | Параметри фільтрації ресурсів, передані в команду mock |
| `browser` | `Object` | [Об'єкт браузера](/docs/api/browser), використаний для отримання об'єкта mock. |
| `calls` | `Object[]` | Інформація про відповідні запити браузера, що містить властивості, такі як `url`, `method`, `headers`, `initialPriority`, `referrerPolic`, `statusCode`, `responseHeaders` і `body` |

## Методи

Об'єкти mock надають різні команди, перелічені в розділі `mock`, які дозволяють користувачам змінювати поведінку запиту або відповіді.

- [`abort`](/docs/api/mock/abort)
- [`abortOnce`](/docs/api/mock/abortOnce)
- [`clear`](/docs/api/mock/clear)
- [`request`](/docs/api/mock/request)
- [`requestOnce`](/docs/api/mock/requestOnce)
- [`respond`](/docs/api/mock/respond)
- [`respondOnce`](/docs/api/mock/respondOnce)
- [`restore`](/docs/api/mock/restore)
- [`waitForResponse`](/docs/api/mock/waitForResponse)

## Події

Об'єкт mock є EventEmitter, і для ваших випадків використання видається кілька подій.

Ось список подій.

### `request`

Ця подія видається при запуску мережевого запиту, який відповідає шаблонам mock. Запит передається у зворотному виклику події.

Інтерфейс запиту:
```ts
interface RequestEvent {
    requestId: number
    request: Matches
    responseStatusCode: number
    responseHeaders: Record<string, string>
}
```

### `overwrite`

Ця подія видається, коли мережева відповідь перезаписується за допомогою [`respond`](/docs/api/mock/respond) або [`respondOnce`](/docs/api/mock/respondOnce). Відповідь передається у зворотному виклику події.

Інтерфейс відповіді:
```ts
interface OverwriteEvent {
    requestId: number
    responseCode: number
    responseHeaders: Record<string, string>
    body?: string | Record<string, any>
}
```

### `fail`

Ця подія видається, коли мережевий запит перервано за допомогою [`abort`](/docs/api/mock/abort) або [`abortOnce`](/docs/api/mock/abortOnce). Помилка передається у зворотному виклику події.

Інтерфейс помилки:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

Ця подія видається, коли додається нове співпадіння, перед `continue` або `overwrite`. Співпадіння передається у зворотному виклику події.

Інтерфейс співпадіння:
```ts
interface MatchEvent {
    url: string // URL запиту (без фрагмента).
    urlFragment?: string // Фрагмент запитуваного URL, що починається з хешу, якщо присутній.
    method: string // Метод HTTP-запиту.
    headers: Record<string, string> // Заголовки HTTP-запиту.
    postData?: string // Дані HTTP POST-запиту.
    hasPostData?: boolean // True, коли запит має дані POST.
    mixedContentType?: MixedContentType // Тип експорту змішаного вмісту запиту.
    initialPriority: ResourcePriority // Пріоритет запиту ресурсу на момент відправлення запиту.
    referrerPolicy: ReferrerPolicy // Політика реферера запиту, як визначено в https://www.w3.org/TR/referrer-policy/
    isLinkPreload?: boolean // Чи завантажується через попереднє завантаження посилання.
    body: string | Buffer | JsonCompatible // Тіло відповіді фактичного ресурсу.
    responseHeaders: Record<string, string> // Заголовки HTTP-відповіді.
    statusCode: number // Код статусу HTTP-відповіді.
    mockedResponse?: string | Buffer // Якщо mock, що видає подію, також змінив свою відповідь.
}
```

### `continue`

Ця подія видається, коли мережева відповідь не була ні перезаписана, ні перервана, або якщо відповідь уже була відправлена іншим макетом. У зворотному виклику події передається `requestId`.

## Приклади

Отримання кількості очікуючих запитів:

```js
let pendingRequests = 0
const mock = await browser.mock('**') // важливо відповідати всім запитам, інакше результуюче значення може бути дуже заплутаним.
mock.on('request', ({request}) => {
    pendingRequests++
    console.log(`matched request to ${request.url}, pending ${pendingRequests} requests`)
})
mock.on('match', ({url}) => {
    pendingRequests--
    console.log(`resolved request to ${url}, pending ${pendingRequests} requests`)
})
```

Викидання помилки при мережевій помилці 404:

```js
browser.addCommand('loadPageWithout404', (url, {selector, predicate}) => new Promise(async (resolve, reject) => {
    const mock = await this.mock('**')

    mock.on('match', ({url, statusCode}) => {
        if (statusCode === 404) {
            reject(new Error(`request to ${url} failed with "Not Found"`))
        }
    })

    await this.url(url).catch(reject)

    // очікуємо тут, оскільки деякі запити можуть все ще очікувати
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

Визначення, чи було використано значення відповіді mock:

```js
const firstMock = await browser.mock('**/foo/**')
const secondMock = await browser.mock('**/foo/bar/**')

firstMock.respondOnce({id: 3, title: 'three'})
secondMock.respond({id: 4, title: 'four'})

firstMock.on('overwrite', () => {
    // спрацьовує для першого запиту до '**/foo/**'
}).on('continue', () => {
    // спрацьовує для решти запитів до '**/foo/**'
})

secondMock.on('continue', () => {
    // спрацьовує для першого запиту до '**/foo/bar/**'
}).on('overwrite', () => {
    // спрацьовує для решти запитів до '**/foo/bar/**'
})
```

У цьому прикладі `firstMock` був визначений першим і має один виклик `respondOnce`, тому значення відповіді `secondMock` не буде використовуватися для першого запиту, але буде використовуватися для всіх інших.