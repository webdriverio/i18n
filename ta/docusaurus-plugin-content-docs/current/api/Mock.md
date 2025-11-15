---
id: mock
title: மாக் ஆப்ஜெக்ட்
---

மாக் ஆப்ஜெக்ட் என்பது ஒரு நெட்வொர்க் மாக்கை பிரதிநிதித்துவப்படுத்தும் ஒரு பொருள் மற்றும் கொடுக்கப்பட்ட `url` மற்றும் `filterOptions` பொருந்தும் கோரிக்கைகள் பற்றிய தகவல்களைக் கொண்டுள்ளது. இது [`mock`](/docs/api/browser/mock) கட்டளையைப் பயன்படுத்தி பெறப்படலாம்.

:::info

`mock` கட்டளையைப் பயன்படுத்துவதற்கு Chrome DevTools protocol ஆதரவு தேவை என்பதை கவனிக்கவும்.
இந்த ஆதரவு உங்கள் சோதனைகளை Chromium அடிப்படையிலான உலாவியில் உள்ளாக இயக்கும்போது அல்லது
Selenium Grid v4 அல்லது அதற்கு மேற்பட்ட பதிப்பைப் பயன்படுத்தும்போது கிடைக்கிறது. இந்த கட்டளையை கிளவுடில் தானியங்கி சோதனைகளை இயக்கும்போது பயன்படுத்த __முடியாது__. [Automation Protocols](/docs/automationProtocols) பிரிவில் மேலும் அறியவும்.

:::

WebdriverIO-இல் கோரிக்கைகளையும் பதில்களையும் மாக் செய்வது பற்றி எங்கள் [Mocks and Spies](/docs/mocksandspies) வழிகாட்டியில் மேலும் படிக்கலாம்.

## பண்புகள்

ஒரு மாக் ஆப்ஜெக்ட் பின்வரும் பண்புகளைக் கொண்டுள்ளது:

| பெயர் | வகை | விவரங்கள் |
| ---- | ---- | ------- |
| `url` | `String` | மாக் கட்டளையில் அனுப்பப்பட்ட url |
| `filterOptions` | `Object` | மாக் கட்டளையில் அனுப்பப்பட்ட வள வடிகட்டி விருப்பங்கள் |
| `browser` | `Object` | மாக் ஆப்ஜெக்ட்டை பெற பயன்படுத்தப்படும் [Browser Object](/docs/api/browser). |
| `calls` | `Object[]` | பொருத்தமான உலாவி கோரிக்கைகளைப் பற்றிய தகவல்கள், `url`, `method`, `headers`, `initialPriority`, `referrerPolic`, `statusCode`, `responseHeaders` மற்றும் `body` போன்ற பண்புகளைக் கொண்டுள்ளது |

## முறைகள்

மாக் ஆப்ஜெக்ட்கள் பல்வேறு கட்டளைகளை வழங்குகின்றன, `mock` பிரிவில் பட்டியலிடப்பட்டுள்ளன, இவை பயனர்கள் கோரிக்கை அல்லது பதிலின் நடத்தையை மாற்ற அனுமதிக்கின்றன.

- [`abort`](/docs/api/mock/abort)
- [`abortOnce`](/docs/api/mock/abortOnce)
- [`clear`](/docs/api/mock/clear)
- [`request`](/docs/api/mock/request)
- [`requestOnce`](/docs/api/mock/requestOnce)
- [`respond`](/docs/api/mock/respond)
- [`respondOnce`](/docs/api/mock/respondOnce)
- [`restore`](/docs/api/mock/restore)
- [`waitForResponse`](/docs/api/mock/waitForResponse)

## நிகழ்வுகள்

மாக் ஆப்ஜெக்ட் ஒரு EventEmitter ஆகும், மேலும் உங்கள் பயன்பாட்டு வழக்குகளுக்காக சில நிகழ்வுகள் வெளியிடப்படுகின்றன.

இதோ நிகழ்வுகளின் பட்டியல்.

### `request`

இந்த நிகழ்வு மாக் வடிவங்களுடன் பொருந்தும் ஒரு நெட்வொர்க் கோரிக்கையை தொடங்கும்போது வெளியிடப்படுகிறது. கோரிக்கை நிகழ்வு கால்பேக்கில் அனுப்பப்படுகிறது.

Request இடைமுகம்:
```ts
interface RequestEvent {
    requestId: number
    request: Matches
    responseStatusCode: number
    responseHeaders: Record<string, string>
}
```

### `overwrite`

இந்த நிகழ்வு நெட்வொர்க் பதில் [`respond`](/docs/api/mock/respond) அல்லது [`respondOnce`](/docs/api/mock/respondOnce) மூலம் மேலெழுதப்படும்போது வெளியிடப்படுகிறது. பதில் நிகழ்வு கால்பேக்கில் அனுப்பப்படுகிறது.

Response இடைமுகம்:
```ts
interface OverwriteEvent {
    requestId: number
    responseCode: number
    responseHeaders: Record<string, string>
    body?: string | Record<string, any>
}
```

### `fail`

இந்த நிகழ்வு நெட்வொர்க் கோரிக்கை [`abort`](/docs/api/mock/abort) அல்லது [`abortOnce`](/docs/api/mock/abortOnce) மூலம் ரத்து செய்யப்படும்போது வெளியிடப்படுகிறது. தோல்வி நிகழ்வு கால்பேக்கில் அனுப்பப்படுகிறது.

Fail இடைமுகம்:
```ts
interface FailEvent {
    requestId: number
    errorReason: Protocol.Network.ErrorReason
}
```

### `match`

இந்த நிகழ்வு புதிய பொருத்தம் சேர்க்கப்படும்போது, `continue` அல்லது `overwrite`-க்கு முன் வெளியிடப்படுகிறது. பொருத்தம் நிகழ்வு கால்பேக்கில் அனுப்பப்படுகிறது.

Match இடைமுகம்:
```ts
interface MatchEvent {
    url: string // Request URL (without fragment).
    urlFragment?: string // Fragment of the requested URL starting with hash, if present.
    method: string // HTTP request method.
    headers: Record<string, string> // HTTP request headers.
    postData?: string // HTTP POST request data.
    hasPostData?: boolean // True when the request has POST data.
    mixedContentType?: MixedContentType // The mixed content export type of the request.
    initialPriority: ResourcePriority // Priority of the resource request at the time request is sent.
    referrerPolicy: ReferrerPolicy // The referrer policy of the request, as defined in https://www.w3.org/TR/referrer-policy/
    isLinkPreload?: boolean // Whether is loaded via link preload.
    body: string | Buffer | JsonCompatible // Body response of actual resource.
    responseHeaders: Record<string, string> // HTTP response headers.
    statusCode: number // HTTP response status code.
    mockedResponse?: string | Buffer // If mock, emitting the event, also modified it's response.
}
```

### `continue`

இந்த நிகழ்வு நெட்வொர்க் பதில் மேலெழுதப்படாமலோ அல்லது குறுக்கிடப்படாமலோ இருக்கும்போது, அல்லது பதில் ஏற்கனவே வேறொரு மாக் மூலம் அனுப்பப்பட்டிருந்தால் வெளியிடப்படுகிறது. நிகழ்வு கால்பேக்கில் `requestId` அனுப்பப்படுகிறது.

## எடுத்துக்காட்டுகள்

நிலுவையில் உள்ள கோரிக்கைகளின் எண்ணிக்கையைப் பெறுதல்:

```js
let pendingRequests = 0
const mock = await browser.mock('**') // it is important to match all requests otherwise, the resulting value can be very confusing.
mock.on('request', ({request}) => {
    pendingRequests++
    console.log(`matched request to ${request.url}, pending ${pendingRequests} requests`)
})
mock.on('match', ({url}) => {
    pendingRequests--
    console.log(`resolved request to ${url}, pending ${pendingRequests} requests`)
})
```

404 நெட்வொர்க் தோல்வியில் பிழை எறிதல்:

```js
browser.addCommand('loadPageWithout404', (url, {selector, predicate}) => new Promise(async (resolve, reject) => {
    const mock = await this.mock('**')

    mock.on('match', ({url, statusCode}) => {
        if (statusCode === 404) {
            reject(new Error(`request to ${url} failed with "Not Found"`))
        }
    })

    await this.url(url).catch(reject)

    // waiting here, because some requests can still be pending
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

மாக் பதில் மதிப்பு பயன்படுத்தப்பட்டதா என்பதை தீர்மானித்தல்:

```js
const firstMock = await browser.mock('**/foo/**')
const secondMock = await browser.mock('**/foo/bar/**')

firstMock.respondOnce({id: 3, title: 'three'})
secondMock.respond({id: 4, title: 'four'})

firstMock.on('overwrite', () => {
    // triggers for first request to '**/foo/**'
}).on('continue', () => {
    // triggers for rest requests to '**/foo/**'
})

secondMock.on('continue', () => {
    // triggers for first request to '**/foo/bar/**'
}).on('overwrite', () => {
    // triggers for rest requests to '**/foo/bar/**'
})
```

இந்த எடுத்துக்காட்டில், `firstMock` முதலில் வரையறுக்கப்பட்டது மற்றும் ஒரு `respondOnce` அழைப்பைக் கொண்டுள்ளது, எனவே முதல் கோரிக்கைக்கு `secondMock` பதில் மதிப்பு பயன்படுத்தப்படாது, ஆனால் மீதமுள்ள அனைத்திற்கும் பயன்படுத்தப்படும்.