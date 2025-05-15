---
id: customcommands
title: 커스텀 명령어
---

브라우저 인스턴스를 자신만의 명령어 세트로 확장하고 싶다면, 브라우저 메서드 `addCommand`가 있습니다. 스펙에서처럼 비동기 방식으로 명령어를 작성할 수 있습니다.

## 매개변수

### 명령어 이름

명령어를 정의하고 브라우저나 요소 스코프에 추가될 이름입니다.

타입: `String`

### 커스텀 함수

명령어가 호출될 때 실행되는 함수입니다. `this` 스코프는 명령어가 브라우저 스코프에 추가되는지 요소 스코프에 추가되는지에 따라 [`WebdriverIO.Browser`](/docs/api/browser) 또는 [`WebdriverIO.Element`](/docs/api/element)입니다.

타입: `Function`

### 대상 스코프

명령어를 브라우저 스코프에 추가할지 요소 스코프에 추가할지 결정하는 플래그입니다. `true`로 설정하면 명령어는 요소 명령어가 됩니다.

타입: `Boolean`<br />
기본값: `false`

## 예제

이 예제는 현재 URL과 제목을 하나의 결과로 반환하는 새 명령어를 추가하는 방법을 보여줍니다. 스코프(`this`)는 [`WebdriverIO.Browser`](/docs/api/browser) 객체입니다.

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this`는 `browser` 스코프를 참조합니다
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

또한 마지막 인수로 `true`를 전달하여 요소 인스턴스를 자신만의 명령어 세트로 확장할 수 있습니다. 이 경우 스코프(`this`)는 [`WebdriverIO.Element`](/docs/api/element) 객체입니다.

```js
browser.addCommand("waitAndClick", async function () {
    // `this`는 $(selector)의 반환값입니다
    await this.waitForDisplayed()
    await this.click()
}, true)
```

커스텀 명령어를 사용하면 자주 사용하는 특정 명령어 시퀀스를 단일 호출로 묶을 수 있습니다. 테스트 스위트의 어느 시점에서든 커스텀 명령어를 정의할 수 있습니다. 단, 명령어가 첫 번째 사용 *전에* 정의되었는지 확인하세요. (`wdio.conf.js`의 `before` 훅은 커스텀 명령어를 생성하기에 좋은 장소입니다.)

정의한 후에는 다음과 같이 사용할 수 있습니다:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__참고:__ `browser` 스코프에 커스텀 명령어를 등록하면 해당 명령어는 요소에서 접근할 수 없습니다. 마찬가지로 요소 스코프에 명령어를 등록하면 `browser` 스코프에서 접근할 수 없습니다:

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // "function" 출력
console.log(typeof elem.myCustomBrowserCommand()) // "undefined" 출력

browser.addCommand("myCustomElementCommand", () => { return 1 }, true)
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // "undefined" 출력
console.log(await elem2.myCustomElementCommand('foobar')) // "1" 출력

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // "undefined" 출력
console.log(await elem3.myCustomElementCommand2('foobar')) // "2" 출력
```

__참고:__ 커스텀 명령어를 체인으로 연결해야 하는 경우, 명령어는 `$`로 끝나야 합니다.

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, true)
await browser.user$('foo').user$('bar').click()
```

너무 많은 커스텀 명령어로 `browser` 스코프를 과부하하지 않도록 주의하세요.

우리는 [페이지 객체](pageobjects)에서 커스텀 로직을 정의하여 특정 페이지에 바인딩하는 것을 권장합니다.

### 멀티리모트

`addCommand`는 멀티리모트에서도 비슷한 방식으로 작동하지만, 새 명령어가 하위 인스턴스로 전파됩니다. 멀티리모트 `browser`와 그 하위 인스턴스는 서로 다른 `this`를 가지고 있으므로 `this` 객체를 사용할 때 주의해야 합니다.

다음 예제는 멀티리모트용 새 명령어를 추가하는 방법을 보여줍니다.

```js
import { multiremotebrowser } from '@wdio/globals'

multiremotebrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this`는 다음을 참조합니다:
    //      - browser의 경우 MultiRemoteBrowser 스코프
    //      - 인스턴스의 경우 Browser 스코프
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})

multiremotebrowser.getUrlAndTitle()
/*
{
    url: [ 'https://webdriver.io/', 'https://webdriver.io/' ],
    title: [
        'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
        'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO'
    ],
    customVar: undefined
}
*/

multiremotebrowser.getInstance('browserA').getUrlAndTitle()
/*
{
    url: 'https://webdriver.io/',
    title: 'WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO',
    customVar: undefined
}
*/
```

## 타입 정의 확장하기

TypeScript를 사용하면 WebdriverIO 인터페이스를 쉽게 확장할 수 있습니다. 다음과 같이 커스텀 명령어에 타입을 추가하세요:

1. 타입 정의 파일 생성(예: `./src/types/wdio.d.ts`)
2. a. 모듈 스타일 타입 정의 파일(타입 정의 파일에서 import/export와 `declare global WebdriverIO` 사용)을 사용하는 경우, `tsconfig.json`의 `include` 속성에 파일 경로를 포함해야 합니다.

   b. 앰비언트 스타일 타입 정의 파일(타입 정의 파일에서 import/export 없음, 커스텀 명령어에 `declare namespace WebdriverIO` 사용)을 사용하는 경우, `tsconfig.json`에 `include` 섹션이 포함되어 있지 *않아야* 합니다. 포함되어 있으면 `include` 섹션에 나열되지 않은 모든 타입 정의 파일이 typescript에 의해 인식되지 않습니다.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Modules (using import/export)', value: 'modules'},
    {label: 'Ambient Type Definitions (no tsconfig include)', value: 'ambient'},
  ]
}>
<TabItem value="modules">

```json title="tsconfig.json"
{
    "compilerOptions": { ... },
    "include": [
        "./test/**/*.ts",
        "./src/types/**/*.ts"
    ]
}
```

</TabItem>
<TabItem value="ambient">

```json title="tsconfig.json"
{
    "compilerOptions": { ... }
}
```

</TabItem>
</Tabs>

3. 실행 모드에 따라 명령어에 대한 정의를 추가하세요.

<Tabs
  defaultValue="modules"
  values={[
    {label: 'Modules (using import/export)', value: 'modules'},
    {label: 'Ambient Type Definitions', value: 'ambient'},
  ]
}>
<TabItem value="modules">

```typescript
declare global {
    namespace WebdriverIO {
        interface Browser {
            browserCustomCommand: (arg: any) => Promise<void>
        }

        interface MultiRemoteBrowser {
            browserCustomCommand: (arg: any) => Promise<void>
        }

        interface Element {
            elementCustomCommand: (arg: any) => Promise<number>
        }
    }
}
```

</TabItem>
<TabItem value="ambient">

```typescript
declare namespace WebdriverIO {
    interface Browser {
        browserCustomCommand: (arg: any) => Promise<void>
    }

    interface MultiRemoteBrowser {
        browserCustomCommand: (arg: any) => Promise<void>
    }

    interface Element {
        elementCustomCommand: (arg: any) => Promise<number>
    }
}
```

</TabItem>
</Tabs>

## 써드파티 라이브러리 통합하기

프로미스를 지원하는 외부 라이브러리(예: 데이터베이스 호출을 위한)를 사용하는 경우, 특정 API 메서드를 커스텀 명령어로 래핑하는 것이 좋은 접근 방식입니다.

프로미스를 반환하면 WebdriverIO는 프로미스가 해결될 때까지 다음 명령어로 진행하지 않도록 합니다. 프로미스가 거부되면 명령어는 오류를 발생시킵니다.

```js
browser.addCommand('makeRequest', async (url) => {
    const response = await fetch(url)
    return await response.json()
})
```

그런 다음 WDIO 테스트 스펙에서 다음과 같이 사용하세요:

```js
it('execute external library in a sync way', async () => {
    await browser.url('...')
    const body = await browser.makeRequest('http://...')
    console.log(body) // 응답 본문 반환
})
```

**참고:** 커스텀 명령어의 결과는 반환하는 프로미스의 결과입니다.

## 명령어 덮어쓰기

`overwriteCommand`를 사용하여
 기본 명령어를 덮어쓸 수도 있습니다.

이는 프레임워크의 예측할 수 없는 동작을 초래할 수 있으므로 권장하지 않습니다!

전체적인 접근 방식은 `addCommand`와 유사하며, 유일한 차이점은 명령어 함수의 첫 번째 인수가 덮어쓰려는 원래 함수라는 것입니다. 아래 예제를 참조하세요.

### 브라우저 명령어 덮어쓰기

```js
/**
 * pause 전에 밀리초를 출력하고 그 값을 반환합니다.
 */
// 'pause'            - 덮어쓸 명령어 이름
// origPauseFunction  - 원래 pause 함수
browser.overwriteCommand('pause', async (origPauseFunction, ms) => {
    console.log(`sleeping for ${ms}`)
    await origPauseFunction(ms)
    return ms
})

// 이전과 같이 사용
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### 요소 명령어 덮어쓰기

요소 수준에서 명령어를 덮어쓰는 것은 거의 동일합니다. `overwriteCommand`의 세 번째 인수로 `true`를 전달하기만 하면 됩니다:

```js
/**
 * 요소가 클릭 가능하지 않은 경우 스크롤을 시도합니다.
 * 요소가 보이지 않거나 클릭할 수 없더라도 JS로 클릭하려면 { force: true }를 전달하세요.
 */
// 'click'            - 덮어쓸 명령어 이름
// origClickFunction  - 원래 click 함수
browser.overwriteCommand('click', async function (origClickFunction, { force = false } = {}) {
    if (!force) {
        try {
            // 클릭 시도
            await origClickFunction()
            return null
        } catch (err) {
            if (err.message.includes('not clickable at point')) {
                console.warn('WARN: Element', this.selector, 'is not clickable.',
                    'Scrolling to it before clicking again.')

                // 요소로 스크롤하고 다시 클릭
                await this.scrollIntoView()
                return origClickFunction()
            }
            throw err
        }
    }

    // js로 클릭
    console.warn('WARN: Using force click for', this.selector)
    await browser.execute((el) => {
        el.click()
    }, this)
}, true) // 3번째 인수로 `true`를 전달하는 것을 잊지 마세요

// 이전과 같이 사용
const elem = await $('body')
await elem.click()

// 또는 매개변수 전달
await elem.click({ force: true })
```

## 더 많은 WebDriver 명령어 추가하기

WebDriver 프로토콜을 사용하고 [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols)의 프로토콜 정의에 정의되지 않은 추가 명령어를 지원하는 플랫폼에서 테스트를 실행하는 경우, `addCommand` 인터페이스를 통해 수동으로 명령어를 추가할 수 있습니다. `webdriver` 패키지는 명령어 래퍼를 제공하여 다른 명령어와 동일한 방식으로 이러한 새 엔드포인트를 등록할 수 있게 해주며, 동일한 매개변수 검사와 오류 처리를 제공합니다. 이 새 엔드포인트를 등록하려면 명령어 래퍼를 가져와서 다음과 같이 새 명령어를 등록하세요:

```js
import { command } from 'webdriver'

browser.addCommand('myNewCommand', command('POST', '/session/:sessionId/foobar/:someId', {
    command: 'myNewCommand',
    description: 'a new WebDriver command',
    ref: 'https://vendor.com/commands/#myNewCommand',
    variables: [{
        name: 'someId',
        description: 'some id to something'
    }],
    parameters: [{
        name: 'foo',
        type: 'string',
        description: 'a valid parameter',
        required: true
    }]
}))
```

유효하지 않은 매개변수로 이 명령어를 호출하면 사전 정의된 프로토콜 명령어와 동일한 오류 처리가 발생합니다. 예:

```js
// 필요한 url 매개변수와 페이로드 없이 명령어 호출
await browser.myNewCommand()

/**
 * 다음과 같은 오류가 발생합니다:
 * Error: Wrong parameters applied for myNewCommand
 * Usage: myNewCommand(someId, foo)
 *
 * Property Description:
 *   "someId" (string): some id to something
 *   "foo" (string): a valid parameter
 *
 * For more info see https://my-api.com
 *    at Browser.protocolCommand (...)
 *    ...
 */
```

명령어를 올바르게 호출하면(예: `browser.myNewCommand('foo', 'bar')`), 예를 들어 `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo`에 대한 WebDriver 요청이 `{ foo: 'bar' }` 같은 페이로드와 함께 올바르게 수행됩니다.

:::note
`:sessionId` url 매개변수는 WebDriver 세션의 세션 ID로 자동 대체됩니다. 다른 url 매개변수도 적용할 수 있지만 `variables` 내에서 정의해야 합니다.
:::

프로토콜 명령어가 정의되는 방법의 예는 [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) 패키지를 참조하세요.