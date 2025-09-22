---
id: customcommands
title: 커스텀 명령
---

브라우저 인스턴스에 자신만의 명령 세트를 확장하고 싶다면, 브라우저 메서드 `addCommand`가 여기 있습니다. 명령을 비동기적인 방식으로 작성할 수 있으며, 이는 사양에서와 동일합니다.

## 매개변수

### 명령 이름

명령을 정의하고 브라우저 또는 요소 범위에 연결될 이름입니다.

타입: `String`

### 사용자 정의 함수

명령이 호출될 때 실행되는 함수입니다. `this` 범위는 명령이 브라우저 또는 요소 범위에 연결되는지에 따라 [`WebdriverIO.Browser`](/docs/api/browser) 또는 [`WebdriverIO.Element`](/docs/api/element)입니다.

타입: `Function`

### 옵션

사용자 정의 명령 동작을 수정하는 구성 옵션이 포함된 객체입니다.

#### 대상 범위

명령을 브라우저 또는 요소 범위에 연결할지 결정하는 플래그입니다. `true`로 설정하면 명령은 요소 명령이 됩니다.

옵션 이름: `attachToElement`
타입: `Boolean`<br />
기본값: `false`

#### implicitWait 비활성화

사용자 정의 명령을 호출하기 전에 요소가 존재하기를 암시적으로 기다릴지 여부를 결정하는 플래그입니다.

옵션 이름: `disableElementImplicitWait`
타입: `Boolean`<br />
기본값: `false`

## 예시

이 예시는 현재 URL과 제목을 하나의 결과로 반환하는 새 명령을 추가하는 방법을 보여줍니다. 범위(`this`)는 [`WebdriverIO.Browser`](/docs/api/browser) 객체입니다.

```js
browser.addCommand('getUrlAndTitle', async function (customVar) {
    // `this`는 `browser` 범위를 참조합니다
    return {
        url: await this.getUrl(),
        title: await this.getTitle(),
        customVar: customVar
    }
})
```

추가적으로, 마지막 인수로 `true`를 전달하여 요소 인스턴스를 자신만의 명령 세트로 확장할 수 있습니다. 이 경우 범위(`this`)는 [`WebdriverIO.Element`](/docs/api/element) 객체입니다.

```js
browser.addCommand("waitAndClick", async function () {
    // `this`는 $(selector)의 반환 값입니다
    await this.waitForDisplayed()
    await this.click()
}, { attachToElement: true })
```

기본적으로 요소 사용자 정의 명령은 사용자 정의 명령을 호출하기 전에 요소가 존재하기를 기다립니다. 대부분의 경우 이것이 원하는 동작이지만, 필요하지 않은 경우 `disableImplicitWait`로 비활성화할 수 있습니다:

```js
browser.addCommand("waitAndClick", async function () {
    // `this`는 $(selector)의 반환 값입니다
    await this.waitForExists()
    await this.click()
}, { attachToElement: true, disableElementImplicitWait: true })
```


사용자 정의 명령을 사용하면 자주 사용하는 특정 명령 시퀀스를 하나의 호출로 묶을 수 있는 기회를 제공합니다. 테스트 스위트의 어느 지점에서든 사용자 정의 명령을 정의할 수 있지만, 명령이 처음 사용되기 *전에* 정의되었는지 확인하세요. (`wdio.conf.js`의 `before` 훅은 명령을 생성하기 좋은 위치 중 하나입니다.)

정의되면 다음과 같이 사용할 수 있습니다:

```js
it('should use my custom command', async () => {
    await browser.url('http://www.github.com')
    const result = await browser.getUrlAndTitle('foobar')

    assert.strictEqual(result.url, 'https://github.com/')
    assert.strictEqual(result.title, 'GitHub · Where software is built')
    assert.strictEqual(result.customVar, 'foobar')
})
```

__참고:__ `browser` 범위에 사용자 정의 명령을 등록하면 해당 명령은 요소에서 액세스할 수 없습니다. 마찬가지로 요소 범위에 명령을 등록하면 `browser` 범위에서 액세스할 수 없습니다:

```js
browser.addCommand("myCustomBrowserCommand", () => { return 1 })
const elem = await $('body')
console.log(typeof browser.myCustomBrowserCommand) // "function" 출력
console.log(typeof elem.myCustomBrowserCommand()) // "undefined" 출력

browser.addCommand("myCustomElementCommand", () => { return 1 }, { attachToElement: true })
const elem2 = await $('body')
console.log(typeof browser.myCustomElementCommand) // "undefined" 출력
console.log(await elem2.myCustomElementCommand('foobar')) // "1" 출력

const elem3 = await $('body')
elem3.addCommand("myCustomElementCommand2", () => { return 2 })
console.log(typeof browser.myCustomElementCommand2) // "undefined" 출력
console.log(await elem3.myCustomElementCommand2('foobar')) // "2" 출력
```

__참고:__ 사용자 정의 명령을 체인으로 연결해야 하는 경우, 명령은 `$`로 끝나야 합니다.

```js
browser.addCommand("user$", (locator) => { return ele })
browser.addCommand("user$", (locator) => { return ele }, { attachToElement: true })
await browser.user$('foo').user$('bar').click()
```

너무 많은 사용자 정의 명령으로 `browser` 범위를 과부하하지 않도록 주의하세요.

사용자 정의 논리는 [페이지 객체](pageobjects)에 정의하여 특정 페이지에 바인딩하는 것이 좋습니다.

### 멀티리모트

`addCommand`는 멀티리모트에서도 비슷한 방식으로 작동하지만, 새 명령은 하위 인스턴스로 전파됩니다. 멀티리모트 `browser`와 그 하위 인스턴스는 다른 `this`를 가지고 있으므로 `this` 객체를 사용할 때 주의해야 합니다.

이 예시는 멀티리모트에 새 명령을 추가하는 방법을 보여줍니다.

```js
import { multiremotebrowser } from '@wdio/globals'

multiremotebrowser.addCommand('getUrlAndTitle', async function (this: WebdriverIO.MultiRemoteBrowser, customVar: any) {
    // `this`는 다음을 참조합니다:
    //      - 브라우저의 경우 MultiRemoteBrowser 범위
    //      - 인스턴스의 경우 Browser 범위
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

## 타입 정의 확장

TypeScript를 사용하면 WebdriverIO 인터페이스를 쉽게 확장할 수 있습니다. 다음과 같이 사용자 정의 명령에 타입을 추가하세요:

1. 타입 정의 파일 생성 (예: `./src/types/wdio.d.ts`)
2. a. 모듈 스타일 타입 정의 파일을 사용하는 경우(타입 정의 파일에서 import/export와 `declare global WebdriverIO` 사용), 파일 경로를 `tsconfig.json`의 `include` 속성에 포함시키세요.

   b. 환경 스타일 타입 정의 파일을 사용하는 경우(타입 정의 파일에 import/export가 없고 사용자 정의 명령에 `declare namespace WebdriverIO`를 사용), `tsconfig.json`에 `include` 섹션이 *없는지* 확인하세요. 이 섹션이 있으면 `include` 섹션에 나열되지 않은 모든 타입 정의 파일이 TypeScript에서 인식되지 않을 수 있습니다.

<Tabs
  defaultValue="modules"
  values={[
    {label: '모듈 (import/export 사용)', value: 'modules'},
    {label: '환경 타입 정의 (tsconfig include 없음)', value: 'ambient'},
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

3. 실행 모드에 따라 명령에 대한 정의를 추가하세요.

<Tabs
  defaultValue="modules"
  values={[
    {label: '모듈 (import/export 사용)', value: 'modules'},
    {label: '환경 타입 정의', value: 'ambient'},
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

## 서드파티 라이브러리 통합

프로미스를 지원하는 외부 라이브러리(예: 데이터베이스 호출)를 사용하는 경우, 사용자 정의 명령으로 특정 API 메서드를 래핑하는 것이 좋은 접근 방식입니다.

프로미스를 반환하면, WebdriverIO는 프로미스가 해결될 때까지 다음 명령으로 진행하지 않도록 보장합니다. 프로미스가 거부되면 명령은 오류를 던집니다.

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
    console.log(body) // 응답 본문을 반환합니다
})
```

**참고:** 사용자 정의 명령의 결과는 반환한 프로미스의 결과입니다.

## 명령 덮어쓰기

`overwriteCommand`를 사용하여 기본 명령을 덮어쓸 수도 있습니다.

이는 프레임워크의 예측할 수 없는 동작을 초래할 수 있으므로 권장되지 않습니다!

전체적인 접근 방식은 `addCommand`와 유사하지만, 명령 함수의 첫 번째 인수가 덮어쓰려는 원래 함수라는 점만 다릅니다. 아래에서 몇 가지 예를 참조하세요.

### 브라우저 명령 덮어쓰기

```js
/**
 * pause 전에 밀리초를 출력하고 그 값을 반환합니다.
 * 
 * @param pause - 덮어쓸 명령의 이름
 * @param this of func - 함수가 호출된 원래 브라우저 인스턴스
 * @param originalPauseFunction of func - 원래 pause 함수
 * @param ms of func - 실제로 전달된 매개변수
  */
browser.overwriteCommand('pause', async function (this, originalPauseFunction, ms) {
    console.log(`sleeping for ${ms}`)
    await originalPauseFunction(ms)
    return ms
})

// 이전과 같이 사용
console.log(`was sleeping for ${await browser.pause(1000)}`)
```

### 요소 명령 덮어쓰기

요소 레벨에서 명령을 덮어쓰는 것은 거의 동일합니다. `overwriteCommand`에 세 번째 인수로 `true`를 전달하기만 하면 됩니다:

```js
/**
 * 요소가 클릭 가능하지 않은 경우 요소로 스크롤을 시도합니다.
 * { force: true }를 전달하여 요소가 보이지 않거나 클릭할 수 없는 경우에도 JS로 클릭합니다.
 * 원래 함수 인수 타입을 `options?: ClickOptions`와 함께 유지할 수 있음을 보여줍니다.
 *
 * @param this of func - 원래 함수가 호출된 요소
 * @param originalClickFunction of func - 원래 pause 함수
 * @param options of func - 실제로 전달된 매개변수
 */
browser.overwriteCommand(
    'click',
    async function (this, originalClickFunction, options?: ClickOptions & { force?: boolean }) {
        const { force, ...restOptions } = options || {}
        if (!force) {
            try {
                // 클릭 시도
                await originalClickFunction(options)
                return
            } catch (err) {
                if ((err as Error).message.includes('not clickable at point')) {
                    console.warn('WARN: Element', this.selector, 'is not clickable.', 'Scrolling to it before clicking again.')

                    // 요소로 스크롤하고 다시 클릭
                    await this.scrollIntoView()
                    return originalClickFunction(options)
                }
                throw err
            }
        }

        // js로 클릭
        console.warn('WARN: Using force click for', this.selector)
        await browser.execute((el) => {
            el.click()
        }, this)
    },
    { attachToElement: true }, // 요소에 연결하는 것을 잊지 마세요
)

// 이전과 같이 사용
const elem = await $('body')
await elem.click()

// 또는 매개변수 전달
await elem.click({ force: true })
```

## 더 많은 WebDriver 명령 추가

WebDriver 프로토콜을 사용하고 [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols)의 프로토콜 정의에 정의되지 않은 추가 명령을 지원하는 플랫폼에서 테스트를 실행하는 경우, `addCommand` 인터페이스를 통해 수동으로 추가할 수 있습니다. `webdriver` 패키지는 이러한 새 엔드포인트를 다른 명령과 동일한 방식으로 등록할 수 있는 명령 래퍼를 제공하며, 동일한 매개변수 검사와 오류 처리를 제공합니다. 이 새 엔드포인트를 등록하려면 명령 래퍼를 가져와서 다음과 같이 새 명령을 등록하세요:

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

잘못된 매개변수로 이 명령을 호출하면 사전 정의된 프로토콜 명령과 동일한 오류 처리가 발생합니다. 예:

```js
// 필수 url 매개변수와 페이로드 없이 명령 호출
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

명령을 올바르게 호출하면, 예를 들어 `browser.myNewCommand('foo', 'bar')`는 `http://localhost:4444/session/7bae3c4c55c3bf82f54894ddc83c5f31/foobar/foo`와 같은 URL로 WebDriver 요청을 올바르게 만들고, `{ foo: 'bar' }`와 같은 페이로드를 전송합니다.

:::note
`:sessionId` URL 매개변수는 WebDriver 세션의 세션 ID로 자동으로 대체됩니다. 다른 URL 매개변수를 적용할 수 있지만 `variables` 내에 정의해야 합니다.
:::

프로토콜 명령을 정의하는 방법의 예는 [`@wdio/protocols`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-protocols/src/protocols) 패키지를 참조하세요.