---
id: mock
title: Об'єкт Mock
---

Об'єкт mock є об'єктом, який представляє мережевий мок і містить інформацію про запити, які відповідали заданому `url` та `filterOptions`. Його можна отримати за допомогою команди [`mock`](/docs/api/browser/mock).

:::info

Зверніть увагу, що використання команди `mock` вимагає підтримки протоколу Chrome DevTools.
Ця підтримка надається, якщо ви запускаєте тести локально в браузері на основі Chromium або якщо
ви використовуєте Selenium Grid v4 або вище. Ця команда __не__ може бути використана при запуску
автоматизованих тестів у хмарі. Дізнайтеся більше в розділі [Протоколи автоматизації](/docs/automationProtocols).

:::

Ви можете дізнатися більше про мокування запитів і відповідей у WebdriverIO в нашому посібнику [Моки та шпигуни](/docs/mocksandspies).

## Властивості

Об'єкт mock містить наступні властивості:

| Назва | Тип | Деталі |
| ---- | ---- | ------- |
| `url` | `String` | URL, переданий у команду mock |
| `filterOptions` | `Object` | Опції фільтра ресурсів, передані в команду mock |
| `browser` | `Object` | [Об'єкт браузера](/docs/api/browser), використаний для отримання об'єкта mock. |
| `calls` | `Object[]` | Інформація про відповідні запити браузера, що містить такі властивості, як `url`, `method`, `headers`, `initialPriority`, `referrerPolic`, `statusCode`, `responseHeaders` і `body` |

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

## Події

Об'єкт mock є EventEmitter, і для ваших випадків використання емітуються кілька подій.

Ось список подій.

### `request`

Ця подія емітується при запуску мережевого запиту, який відповідає шаблонам mock. Запит передається в функцію зворотного виклику події.

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

Ця подія емітується, коли мережева відповідь перезаписується за допомогою [`respond`](/docs/api/mock/respond) або [`respondOnce`](/docs/api/mock/respondOnce). Відповідь передається в функцію зворотного виклику події.

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

Ця подія емітується, коли мережевий запит переривається за допомогою [`abort`](/docs/api/mock/abort) або [`abortOnce`](/docs/api/mock/abortOnce). Помилка передається в функцію зворотного виклику події.

Інтерфейс помилки:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

Ця подія емітується, коли додається новий збіг, перед `continue` або `overwrite`. Збіг передається в функцію зворотного виклику події.

Інтерфейс збігу:
```ts
interface MatchEvent {
    url: string // URL запиту (без фрагмента).
    urlFragment?: string // Фрагмент запитуваного URL, починаючи з хеша, якщо він присутній.
    method: string // Метод HTTP-запиту.
    headers: Record<string, string> // Заголовки HTTP-запиту.
    postData?: string // Дані HTTP POST запиту.
    hasPostData?: boolean // True, коли запит має дані POST.
    mixedContentType?: MixedContentType // Тип змішаного контенту запиту.
    initialPriority: ResourcePriority // Пріоритет запиту ресурсу на момент відправлення запиту.
    referrerPolicy: ReferrerPolicy // Політика реферера запиту, як визначено в https://www.w3.org/TR/referrer-policy/
    isLinkPreload?: boolean // Чи завантажено через попереднє завантаження посилання.
    body: string | Buffer | JsonCompatible // Тіло відповіді фактичного ресурсу.
    responseHeaders: Record<string, string> // Заголовки HTTP-відповіді.
    statusCode: number // Код статусу HTTP-відповіді.
    mockedResponse?: string | Buffer // Якщо мок, що емітує подію, також модифікував свою відповідь.
}
```

### `continue`

Ця подія емітується, коли мережева відповідь не була ні перезаписана, ні перервана, або якщо відповідь вже була відправлена іншим моком. `requestId` передається в функцію зворотного виклику події.

## Приклади

Отримання кількості очікуваних запитів:

```js
let pendingRequests = 0
const mock = await browser.mock('**') // важливо знайти всі запити, інакше результуюче значення може бути дуже заплутаним.
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

    // очікування тут, тому що деякі запити можуть ще очікувати на відповідь
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

У цьому прикладі `firstMock` був визначений першим і має один виклик `respondOnce`, тому значення відповіді `secondMock` не буде використано для першого запиту, але буде використано для решти запитів.