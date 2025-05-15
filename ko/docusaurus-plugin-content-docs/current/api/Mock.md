---
id: mock
title: Mock 객체
---

mock 객체는 네트워크 목(mock)을 나타내는 객체로, 주어진 `url`과 `filterOptions`에 일치하는 요청에 대한 정보를 포함합니다. 이 객체는 [`mock`](/docs/api/browser/mock) 명령을 사용하여 얻을 수 있습니다.

:::info

`mock` 명령을 사용하려면 Chrome DevTools 프로토콜 지원이 필요합니다.
이 지원은 Chromium 기반 브라우저에서 로컬로 테스트를 실행하거나
Selenium Grid v4 이상을 사용할 때 제공됩니다. 이 명령은 클라우드에서 자동화된 
테스트를 실행할 때 사용할 __수 없습니다__. 자세한 내용은 [자동화 프로토콜](/docs/automationProtocols) 섹션을 참조하세요.

:::

WebdriverIO에서 요청 및 응답 모킹에 대한 자세한 내용은 [Mocks and Spies](/docs/mocksandspies) 가이드에서 확인할 수 있습니다.

## 속성

mock 객체는 다음과 같은 속성을 포함합니다:

| 이름 | 타입 | 세부 정보 |
| ---- | ---- | ------- |
| `url` | `String` | mock 명령에 전달된 URL |
| `filterOptions` | `Object` | mock 명령에 전달된 리소스 필터 옵션 |
| `browser` | `Object` | mock 객체를 얻는 데 사용된 [브라우저 객체](/docs/api/browser) |
| `calls` | `Object[]` | 일치하는 브라우저 요청에 대한 정보로, `url`, `method`, `headers`, `initialPriority`, `referrerPolic`, `statusCode`, `responseHeaders` 및 `body`와 같은 속성을 포함 |

## 메서드

mock 객체는 `mock` 섹션에 나열된 다양한 명령을 제공하며, 사용자가 요청이나 응답의 동작을 수정할 수 있게 합니다.

- [`abort`](/docs/api/mock/abort)
- [`abortOnce`](/docs/api/mock/abortOnce)
- [`clear`](/docs/api/mock/clear)
- [`request`](/docs/api/mock/request)
- [`requestOnce`](/docs/api/mock/requestOnce)
- [`respond`](/docs/api/mock/respond)
- [`respondOnce`](/docs/api/mock/respondOnce)
- [`restore`](/docs/api/mock/restore)

## 이벤트

mock 객체는 EventEmitter이며 사용 사례에 맞게 여러 이벤트가 발생합니다.

다음은 이벤트 목록입니다.

### `request`

이 이벤트는 mock 패턴과 일치하는 네트워크 요청을 시작할 때 발생합니다. 요청은 이벤트 콜백으로 전달됩니다.

Request 인터페이스:
```ts
interface RequestEvent {
    requestId: number
    request: Matches
    responseStatusCode: number
    responseHeaders: Record<string, string>
}
```

### `overwrite`

이 이벤트는 [`respond`](/docs/api/mock/respond) 또는 [`respondOnce`](/docs/api/mock/respondOnce)로 네트워크 응답이 덮어쓰기될 때 발생합니다. 응답은 이벤트 콜백으로 전달됩니다.

Response 인터페이스:
```ts
interface OverwriteEvent {
    requestId: number
    responseCode: number
    responseHeaders: Record<string, string>
    body?: string | Record<string, any>
}
```

### `fail`

이 이벤트는 [`abort`](/docs/api/mock/abort) 또는 [`abortOnce`](/docs/api/mock/abortOnce)로 네트워크 요청이 중단될 때 발생합니다. 실패는 이벤트 콜백으로 전달됩니다.

Fail 인터페이스:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

이 이벤트는 새 일치 항목이 추가될 때 `continue` 또는 `overwrite` 전에 발생합니다. 일치 항목은 이벤트 콜백으로 전달됩니다.

Match 인터페이스:
```ts
interface MatchEvent {
    url: string // 요청 URL(프래그먼트 제외).
    urlFragment?: string // 해시로 시작하는 요청된 URL의 프래그먼트(있는 경우).
    method: string // HTTP 요청 메서드.
    headers: Record<string, string> // HTTP 요청 헤더.
    postData?: string // HTTP POST 요청 데이터.
    hasPostData?: boolean // 요청에 POST 데이터가 있으면 true.
    mixedContentType?: MixedContentType // 요청의 혼합 콘텐츠 내보내기 유형.
    initialPriority: ResourcePriority // 요청 전송 시 리소스 요청의 우선순위.
    referrerPolicy: ReferrerPolicy // https://www.w3.org/TR/referrer-policy/에 정의된 요청의 참조자 정책.
    isLinkPreload?: boolean // 링크 프리로드를 통해 로드되는지 여부.
    body: string | Buffer | JsonCompatible // 실제 리소스의 본문 응답.
    responseHeaders: Record<string, string> // HTTP 응답 헤더.
    statusCode: number // HTTP 응답 상태 코드.
    mockedResponse?: string | Buffer // mock이 이벤트를 발생시키면 응답도 수정합니다.
}
```

### `continue`

이 이벤트는 네트워크 응답이 덮어쓰기되거나 중단되지 않았거나, 응답이 이미 다른 mock에 의해 전송된 경우 발생합니다. `requestId`는 이벤트 콜백으로 전달됩니다.

## 예제

대기 중인 요청 수 가져오기:

```js
let pendingRequests = 0
const mock = await browser.mock('**') // 모든 요청과 일치시키는 것이 중요합니다. 그렇지 않으면 결과 값이 매우 혼란스러울 수 있습니다.
mock.on('request', ({request}) => {
    pendingRequests++
    console.log(`matched request to ${request.url}, pending ${pendingRequests} requests`)
})
mock.on('match', ({url}) => {
    pendingRequests--
    console.log(`resolved request to ${url}, pending ${pendingRequests} requests`)
})
```

404 네트워크 실패 시 오류 발생:

```js
browser.addCommand('loadPageWithout404', (url, {selector, predicate}) => new Promise(async (resolve, reject) => {
    const mock = await this.mock('**')

    mock.on('match', ({url, statusCode}) => {
        if (statusCode === 404) {
            reject(new Error(`request to ${url} failed with "Not Found"`))
        }
    })

    await this.url(url).catch(reject)

    // 일부 요청이 여전히 대기 중일 수 있으므로 여기서 대기
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

mock 응답 값이 사용되었는지 확인:

```js
const firstMock = await browser.mock('**/foo/**')
const secondMock = await browser.mock('**/foo/bar/**')

firstMock.respondOnce({id: 3, title: 'three'})
secondMock.respond({id: 4, title: 'four'})

firstMock.on('overwrite', () => {
    // '**/foo/**'에 대한 첫 번째 요청에 대해 트리거됨
}).on('continue', () => {
    // '**/foo/**'에 대한 나머지 요청에 대해 트리거됨
})

secondMock.on('continue', () => {
    // '**/foo/bar/**'에 대한 첫 번째 요청에 대해 트리거됨
}).on('overwrite', () => {
    // '**/foo/bar/**'에 대한 나머지 요청에 대해 트리거됨
})
```

이 예제에서 `firstMock`은 먼저 정의되었으며 하나의 `respondOnce` 호출이 있어서, 첫 번째 요청에 대해서는 `secondMock` 응답 값이 사용되지 않지만 나머지 요청에는 사용됩니다.