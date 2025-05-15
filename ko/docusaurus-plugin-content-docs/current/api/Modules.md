---
id: modules
title: 모듈
---

WebdriverIO는 여러 모듈을 NPM 및 기타 레지스트리에 게시하며 이를 활용하여 자체 자동화 프레임워크를 구축할 수 있습니다. WebdriverIO 설정 유형에 대한 자세한 설명은 [여기](/docs/setuptypes)에서 확인하세요.

## `webdriver` 및 `devtools`

프로토콜 패키지([`webdriver`](https://www.npmjs.com/package/webdriver) 및 [`devtools`](https://www.npmjs.com/package/devtools))는 세션을 시작할 수 있는 다음 정적 함수가 첨부된 클래스를 제공합니다:

#### `newSession(options, modifier, userPrototype, customCommandWrapper)`

특정 기능으로 새 세션을 시작합니다. 세션 응답에 따라 다양한 프로토콜의 명령이 제공됩니다.

##### 매개변수

- `options`: [WebDriver 옵션](/docs/configuration#webdriver-options)
- `modifier`: 반환되기 전에 클라이언트 인스턴스를 수정할 수 있는 함수
- `userPrototype`: 인스턴스 프로토타입을 확장할 수 있는 속성 객체
- `customCommandWrapper`: 함수 호출 주변에 기능을 래핑할 수 있는 함수

##### 반환값

- [Browser](/docs/api/browser) 객체

##### 예제

```js
const client = await WebDriver.newSession({
    capabilities: { browserName: 'chrome' }
})
```

#### `attachToSession(attachInstance, modifier, userPrototype, customCommandWrapper)`

실행 중인 WebDriver 또는 DevTools 세션에 연결합니다.

##### 매개변수

- `attachInstance`: 세션에 연결할 인스턴스 또는 최소한 `sessionId` 속성이 있는 객체(예: `{ sessionId: 'xxx' }`)
- `modifier`: 반환되기 전에 클라이언트 인스턴스를 수정할 수 있는 함수
- `userPrototype`: 인스턴스 프로토타입을 확장할 수 있는 속성 객체
- `customCommandWrapper`: 함수 호출 주변에 기능을 래핑할 수 있는 함수

##### 반환값

- [Browser](/docs/api/browser) 객체

##### 예제

```js
const client = await WebDriver.newSession({...})
const clonedClient = await WebDriver.attachToSession(client)
```

#### `reloadSession(instance)`

제공된 인스턴스의 세션을 다시 로드합니다.

##### 매개변수

- `instance`: 다시 로드할 패키지 인스턴스

##### 예제

```js
const client = await WebDriver.newSession({...})
await WebDriver.reloadSession(client)
```

## `webdriverio`

프로토콜 패키지(`webdriver` 및 `devtools`)와 마찬가지로 WebdriverIO 패키지 API를 사용하여 세션을 관리할 수 있습니다. API는 `import { remote, attach, multiremote } from 'webdriverio'`를 사용하여 가져올 수 있으며 다음 기능을 포함합니다:

#### `remote(options, modifier)`

WebdriverIO 세션을 시작합니다. 인스턴스는 프로토콜 패키지의 모든 명령을 포함하지만 추가적인 고차 함수를 제공합니다. [API 문서](/docs/api)를 참조하세요.

##### 매개변수

- `options`: [WebdriverIO 옵션](/docs/configuration#webdriverio)
- `modifier`: 반환되기 전에 클라이언트 인스턴스를 수정할 수 있는 함수

##### 반환값

- [Browser](/docs/api/browser) 객체

##### 예제

```js
import { remote } from 'webdriverio'

const browser = await remote({
    capabilities: { browserName: 'chrome' }
})
```

#### `attach(attachOptions)`

실행 중인 WebdriverIO 세션에 연결합니다.

##### 매개변수

- `attachOptions`: 세션에 연결할 인스턴스 또는 최소한 `sessionId` 속성이 있는 객체(예: `{ sessionId: 'xxx' }`)

##### 반환값

- [Browser](/docs/api/browser) 객체

##### 예제

```js
import { remote, attach } from 'webdriverio'

const browser = await remote({...})
const newBrowser = await attach(browser)
```

#### `multiremote(multiremoteOptions)`

단일 인스턴스 내에서 여러 세션을 제어할 수 있는 multiremote 인스턴스를 시작합니다. 구체적인 사용 사례는 [multiremote 예제](https://github.com/webdriverio/webdriverio/tree/main/examples/multiremote)를 확인하세요.

##### 매개변수

- `multiremoteOptions`: 브라우저 이름을 키로 하고 각 키에 [WebdriverIO 옵션](/docs/configuration#webdriverio)을 값으로 하는 객체

##### 반환값

- [Browser](/docs/api/browser) 객체

##### 예제

```js
import { multiremote } from 'webdriverio'

const matrix = await multiremote({
    myChromeBrowser: {
        capabilities: { browserName: 'chrome' }
    },
    myFirefoxBrowser: {
        capabilities: { browserName: 'firefox' }
    }
})
await matrix.url('http://json.org')
await matrix.getInstance('browserA').url('https://google.com')

console.log(await matrix.getTitle())
// returns ['Google', 'JSON']
```

## `@wdio/cli`

`wdio` 명령을 호출하는 대신, 테스트 러너를 모듈로 포함하여 임의의 환경에서 실행할 수도 있습니다. 이를 위해, `@wdio/cli` 패키지를 모듈로 가져와야 합니다:

<Tabs
  defaultValue="esm"
  values={[
    {label: 'EcmaScript Modules', value: 'esm'},
    {label: 'CommonJS', value: 'cjs'}
  ]
}>
<TabItem value="esm">

```js
import Launcher from '@wdio/cli'
```

</TabItem>
<TabItem value="cjs">

```js
const Launcher = require('@wdio/cli').default
```

</TabItem>
</Tabs>

그런 다음, 런처의 인스턴스를 생성하고 테스트를 실행합니다.

#### `Launcher(configPath, opts)`

`Launcher` 클래스 생성자는 설정 파일의 URL과 설정에서 값을 덮어쓸 `opts` 객체를 예상합니다.

##### 매개변수

- `configPath`: 실행할 `wdio.conf.js` 경로
- `opts`: 설정 파일의 값을 덮어쓸 인수([`<RunCommandArguments>`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/types.ts#L51-L77))

##### 예제

```js
const wdio = new Launcher(
    '/path/to/my/wdio.conf.js',
    { spec: '/path/to/a/single/spec.e2e.js' }
)

wdio.run().then((exitCode) => {
    process.exit(exitCode)
}, (error) => {
    console.error('Launcher failed to start the test', error.stacktrace)
    process.exit(1)
})
```

`run` 명령은 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)를 반환합니다. 테스트가 성공적으로 실행되거나 실패하면 해결되고, 런처가 테스트 실행을 시작할 수 없으면 거부됩니다.

## `@wdio/browser-runner`

WebdriverIO의 [브라우저 러너](/docs/runner#browser-runner)를 사용하여 단위 또는 컴포넌트 테스트를 실행할 때 테스트용 모킹 유틸리티를 가져올 수 있습니다:

```ts
import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'
```

다음과 같은 명명된 내보내기를 사용할 수 있습니다:

#### `fn`

모의 함수, 자세한 내용은 공식 [Vitest 문서](https://vitest.dev/api/mock.html#mock-functions)를 참조하세요.

#### `spyOn`

스파이 함수, 자세한 내용은 공식 [Vitest 문서](https://vitest.dev/api/mock.html#mock-functions)를 참조하세요.

#### `mock`

파일 또는 종속성 모듈을 모의하는 메서드입니다.

##### 매개변수

- `moduleName`: 모의할 파일의 상대 경로 또는 모듈 이름
- `factory`: 모의된 값을 반환하는 함수(선택 사항)

##### 예제

```js
mock('../src/constants.ts', () => ({
    SOME_DEFAULT: 'mocked out'
}))

mock('lodash', (origModuleFactory) => {
    const origModule = await origModuleFactory()
    return {
        ...origModule,
        pick: fn()
    }
})
```

#### `unmock`

수동 모의(`__mocks__`) 디렉토리 내에 정의된 종속성의 모킹을 해제합니다.

##### 매개변수

- `moduleName`: 모킹을 해제할 모듈의 이름

##### 예제

```js
unmock('lodash')
```