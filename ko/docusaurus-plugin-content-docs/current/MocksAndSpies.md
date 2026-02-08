---
id: mocksandspies
title: 요청 모의 및 스파이
---

WebdriverIO는 백엔드 설정이나 모의 서버를 설정하지 않고도 프론트엔드 애플리케이션 테스트에 집중할 수 있게 해주는 네트워크 응답 수정 기능을 내장하고 있습니다. 테스트에서 REST API 요청과 같은 웹 리소스에 대한 사용자 정의 응답을 정의하고 동적으로 수정할 수 있습니다.

:::info

`mock` 명령을 사용하려면 Chrome DevTools 프로토콜 지원이 필요합니다. 이러한 지원은 Chromium 기반 브라우저에서 로컬로 테스트를 실행하거나, Selenium Grid v4 이상을 통해, 또는 Chrome DevTools 프로토콜을 지원하는 클라우드 공급업체(예: SauceLabs, BrowserStack, TestMu AI(이전의 LambdaTest))를 통해 제공됩니다. 필요한 기본 요소가 [Webdriver Bidi](https://wpt.fyi/results/webdriver/tests/bidi/network?label=experimental&label=master&aligned)에 구현되고 각 브라우저에 구현되면 전체 크로스 브라우저 지원이 가능해질 것입니다.

:::

## 모의 생성하기

응답을 수정하기 전에 먼저 모의를 정의해야 합니다. 이 모의는 리소스 URL로 설명되며 [요청 메소드](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) 또는 [헤더](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)로 필터링할 수 있습니다. 리소스는 [minimatch](https://www.npmjs.com/package/minimatch)에 의한 글로브 표현식을 지원합니다:

```js
// "/users/list"로 끝나는 모든 리소스를 모의
const userListMock = await browser.mock('**/users/list')

// 또는 헤더나 상태 코드로 리소스를 필터링하여 모의를 지정할 수 있으며,
// json 리소스에 대한 성공적인 요청만 모의
const strictMock = await browser.mock('**', {
    // 모든 json 응답을 모의
    requestHeaders: { 'Content-Type': 'application/json' },
    // 성공적인 요청만
    statusCode: 200
})
```

## 사용자 정의 응답 지정하기

모의를 정의한 후에는 그에 대한 사용자 정의 응답을 정의할 수 있습니다. 이러한 사용자 정의 응답은 JSON 응답을 위한 객체, 사용자 정의 픽스처로 응답하기 위한 로컬 파일, 또는 인터넷에서 리소스로 응답을 교체하는 웹 리소스일 수 있습니다.

### API 요청 모의하기

JSON 응답을 예상하는 API 요청을 모의하려면 모의 객체에서 `respond`를 호출하고 반환하려는 임의의 객체를 전달하면 됩니다:

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
// 출력: "[ 'Injected (non) completed Todo', 'Injected completed Todo' ]"
```

다음과 같이 모의 응답 매개변수를 전달하여 응답 헤더와 상태 코드를 수정할 수도 있습니다:

```js
mock.respond({ ... }, {
    // 상태 코드 404로 응답
    statusCode: 404,
    // 응답 헤더를 다음 헤더와 병합
    headers: { 'x-custom-header': 'foobar' }
})
```

모의가 백엔드를 전혀 호출하지 않게 하려면 `fetchResponse` 플래그에 `false`를 전달할 수 있습니다.

```js
mock.respond({ ... }, {
    // 실제 백엔드를 호출하지 않음
    fetchResponse: false
})
```

사용자 정의 응답을 픽스처 파일에 저장하여 다음과 같이 테스트에서 가져오는 것이 좋습니다:

```js
// JSON import assertions를 지원하려면 Node.js v16.14.0 이상이 필요합니다
import responseFixture from './__fixtures__/apiResponse.json' assert { type: 'json' }
mock.respond(responseFixture)
```

### 텍스트 리소스 모의하기

JavaScript, CSS 파일 또는 기타 텍스트 기반 리소스와 같은 텍스트 리소스를 수정하려면 파일 경로를 전달하면 WebdriverIO가 원본 리소스를 해당 파일로 대체합니다:

```js
const scriptMock = await browser.mock('**/script.min.js')
scriptMock.respond('./tests/fixtures/script.js')

// 또는 사용자 정의 JS로 응답
scriptMock.respond('alert("I am a mocked resource")')
```

### 웹 리소스 리디렉션

원하는 응답이 이미 웹에 호스팅되어 있는 경우 웹 리소스를 다른 웹 리소스로 대체할 수도 있습니다. 이는 개별 페이지 리소스뿐만 아니라 웹페이지 자체에서도 작동합니다:

```js
const pageMock = await browser.mock('https://google.com/')
await pageMock.respond('https://webdriver.io')
await browser.url('https://google.com')
console.log(await browser.getTitle()) // "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js" 반환
```

### 동적 응답

모의 응답이 원본 리소스 응답에 따라 달라지는 경우, 원본 응답을 매개변수로 받고 반환 값에 따라 모의를 설정하는 함수를 전달하여 리소스를 동적으로 수정할 수도 있습니다:

```js
const mock = await browser.mock('https://todo-backend-express-knex.herokuapp.com/', {
    method: 'get'
})

mock.respond((req) => {
    // todo 내용을 목록 번호로 대체
    return req.body.map((item, i) => ({ ...item, title: i }))
})

await browser.url('https://todobackend.com/client/index.html?https://todo-backend-express-knex.herokuapp.com/')

await $('#todo-list li').waitForExist()
console.log(await $$('#todo-list li label').map((el) => el.getText()))
// 반환
// [
//   '0',  '1',  '2',  '19', '20',
//   '21', '3',  '4',  '5',  '6',
//   '7',  '8',  '9',  '10', '11',
//   '12', '13', '14', '15', '16',
//   '17', '18', '22'
// ]
```

## 모의 중단하기

사용자 정의 응답을 반환하는 대신 다음과 같은 HTTP 오류 중 하나로 요청을 중단할 수도 있습니다:

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

이는 기능 테스트에 부정적인 영향을 미치는 페이지의 타사 스크립트를 차단하려는 경우에 매우 유용합니다. 다음과 같이 `abort` 또는 `abortOnce`를 호출하여 모의를 중단할 수 있습니다:

```js
const mock = await browser.mock('https://www.google-analytics.com/**')
mock.abort('Failed')
```

## 스파이

모든 모의는 자동으로 브라우저가 해당 리소스에 대해 만든 요청의 수를 계산하는 스파이입니다. 모의에 사용자 정의 응답이나 중단 이유를 적용하지 않으면 일반적으로 받게 되는 기본 응답으로 계속 진행됩니다. 이를 통해 브라우저가 특정 API 엔드포인트 등에 몇 번 요청을 했는지 확인할 수 있습니다.

```js
const mock = await browser.mock('**/user', { method: 'post' })
console.log(mock.calls.length) // 0 반환

// 사용자 등록
await $('#username').setValue('randomUser')
await $('password').setValue('password123')
await $('password_repeat').setValue('password123')
await $('button[type="submit"]').click()

// API 요청이 이루어졌는지 확인
expect(mock.calls.length).toBe(1)

// 응답 확인
expect(mock.calls[0].body).toEqual({ success: true })
```

일치하는 요청이 응답될 때까지 기다려야 하는 경우 `mock.waitForResponse(options)`를 사용하세요. API 참조 확인: [waitForResponse](/docs/api/mock/waitForResponse).