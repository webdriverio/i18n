---
id: mocking
title: 목킹
---

테스트를 작성할 때 내부 또는 외부 서비스의 "가짜" 버전을 만들어야 할 필요가 있습니다. 이것을 일반적으로 목킹이라고 합니다. WebdriverIO는 이를 돕기 위한 유틸리티 함수를 제공합니다. `import { fn, spyOn, mock, unmock } from '@wdio/browser-runner'`를 통해 접근할 수 있습니다. 사용 가능한 목킹 유틸리티에 대한 자세한 정보는 [API 문서](/docs/api/modules#wdiobrowser-runner)에서 확인할 수 있습니다.

## 함수

컴포넌트 테스트의 일부로 특정 함수 핸들러가 호출되었는지 검증하기 위해, `@wdio/browser-runner` 모듈은 이러한 함수가 호출되었는지 테스트할 수 있는 목킹 기본 요소를 제공합니다. 다음과 같이 이러한 메서드를 가져올 수 있습니다:

```js
import { fn, spyOn } from '@wdio/browser-runner'
```

`fn`을 가져오면 실행을 추적하기 위한 스파이 함수(목)를 만들 수 있고, `spyOn`으로 이미 생성된 객체의 메서드를 추적할 수 있습니다.

<Tabs
  defaultValue="mocks"
  values={[
    {label: 'Mocks', value: 'mocks'},
    {label: 'Spies', value: 'spies'}
  ]
}>
<TabItem value="mocks">

전체 예제는 [Component Testing Example](https://github.com/webdriverio/component-testing-examples/blob/main/react-typescript-vite/src/tests/LoginForm.test.tsx) 저장소에서 찾을 수 있습니다.

```ts
import React from 'react'
import { $, expect } from '@wdio/globals'
import { fn } from '@wdio/browser-runner'
import { Key } from 'webdriverio'
import { render } from '@testing-library/react'

import LoginForm from '../components/LoginForm'

describe('LoginForm', () => {
    it('should call onLogin handler if username and password was provided', async () => {
        const onLogin = fn()
        render(<LoginForm onLogin={onLogin} />)
        await $('input[name="username"]').setValue('testuser123')
        await $('input[name="password"]').setValue('s3cret')
        await browser.keys(Key.Enter)

        /**
         * verify the handler was called
         */
        expect(onLogin).toBeCalledTimes(1)
        expect(onLogin).toBeCalledWith(expect.equal({
            username: 'testuser123',
            password: 's3cret'
        }))
    })
})
```

</TabItem>
<TabItem value="spies">

전체 예제는 [examples](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio/browser-runner/lit.test.js) 디렉토리에서 찾을 수 있습니다.

```js
import { expect, $ } from '@wdio/globals'
import { spyOn } from '@wdio/browser-runner'
import { html, render } from 'lit'
import { SimpleGreeting } from './components/LitComponent.ts'

const getQuestionFn = spyOn(SimpleGreeting.prototype, 'getQuestion')

describe('Lit Component testing', () => {
    it('should render component', async () => {
        render(
            html`<simple-greeting name="WebdriverIO" />`,
            document.body
        )

        const innerElem = await $('simple-greeting').$('p')
        expect(await innerElem.getText()).toBe('Hello, WebdriverIO! How are you today?')
    })

    it('should render with mocked component function', async () => {
        getQuestionFn.mockReturnValue('Does this work?')
        render(
            html`<simple-greeting name="WebdriverIO" />`,
            document.body
        )

        const innerElem = await $('simple-greeting').$('p')
        expect(await innerElem.getText()).toBe('Hello, WebdriverIO! Does this work?')
    })
})
```

</TabItem>
</Tabs>

WebdriverIO는 여기서 [`@vitest/spy`](https://www.npmjs.com/package/@vitest/spy)를 다시 내보냅니다. 이것은 WebdriverIO의 [`expect`](/docs/api/expect-webdriverio) 매처와 함께 사용할 수 있는 가벼운 Jest 호환 스파이 구현입니다. 이러한 목 함수에 대한 자세한 설명은 [Vitest 프로젝트 페이지](https://vitest.dev/api/mock.html)에서 찾을 수 있습니다.

물론 브라우저 환경을 지원하는 한 [SinonJS](https://sinonjs.org/)와 같은 다른 스파이 프레임워크를 설치하고 가져올 수도 있습니다.

## 모듈

로컬 모듈을 모의하거나 다른 코드에서 호출되는 타사 라이브러리를 관찰하여 인수, 출력을 테스트하거나 구현을 재정의할 수 있습니다.

함수를 모의하는 두 가지 방법이 있습니다: 테스트 코드에서 사용할 모의 함수를 만들거나 모듈 종속성을 재정의하는 수동 모의를 작성하는 것입니다.

### 파일 임포트 모킹

컴포넌트가 클릭을 처리하기 위해 파일에서 유틸리티 메서드를 가져온다고 상상해 봅시다.

```js title=utils.js
export function handleClick () {
    // handler implementation
}
```

우리 컴포넌트에서 클릭 핸들러는 다음과 같이 사용됩니다:

```ts title=LitComponent.js
import { handleClick } from './utils.js'

@customElement('simple-button')
export class SimpleButton extends LitElement {
    render() {
        return html`<button @click="${handleClick}">Click me!</button>`
    }
}
```

`utils.js`에서 `handleClick`을 모의하기 위해 테스트에서 `mock` 메서드를 다음과 같이 사용할 수 있습니다:

```js title=LitComponent.test.js
import { expect, $ } from '@wdio/globals'
import { mock, fn } from '@wdio/browser-runner'
import { html, render } from 'lit'

import { SimpleButton } from './LitComponent.ts'
import { handleClick } from './utils.js'

/**
 * mock named export "handleClick" of `utils.ts` file
 */
mock('./utils.ts', () => ({
    handleClick: fn()
}))

describe('Simple Button Component Test', () => {
    it('call click handler', async () => {
        render(html`<simple-button />`, document.body)
        await $('simple-button').$('button').click()
        expect(handleClick).toHaveBeenCalledTimes(1)
    })
})
```

### 종속성 모킹

API에서 사용자를 가져오는 클래스가 있다고 가정해 봅시다. 이 클래스는 API를 호출하기 위해 [`axios`](https://github.com/axios/axios)를 사용한 다음 모든 사용자를 포함하는 데이터 속성을 반환합니다:

```js title=users.js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data)
  }
}

export default Users
```

이제 실제로 API를 호출하지 않고(느리고 취약한 테스트를 만드는 것을 방지하기 위해) 이 메서드를 테스트하기 위해 `mock(...)` 함수를 사용하여 axios 모듈을 자동으로 모의할 수 있습니다.

모듈을 모의한 후에는 테스트가 검증하려는 데이터를 반환하는 `.get`에 대한 [`mockResolvedValue`](https://vitest.dev/api/mock.html#mockresolvedvalue)를 제공할 수 있습니다. 효과적으로 `axios.get('/users.json')`가 가짜 응답을 반환하기를 원한다고 말하는 것입니다.

```js title=users.test.js
import axios from 'axios'; // imports defined mock
import { mock, fn } from '@wdio/browser-runner'

import Users from './users.js'

/**
 * mock default export of `axios` dependency
 */
mock('axios', () => ({
    default: {
        get: fn()
    }
}))

describe('User API', () => {
    it('should fetch users', async () => {
        const users = [{name: 'Bob'}]
        const resp = {data: users}
        axios.get.mockResolvedValue(resp)

        // or you could use the following depending on your use case:
        // axios.get.mockImplementation(() => Promise.resolve(resp))

        const data = await Users.all()
        expect(data).toEqual(users)
    })
})
```

## 부분적 모킹

모듈의 일부만 모의하고 나머지는 실제 구현을 유지할 수 있습니다:

```js title=foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

원본 모듈이 모의 팩토리에 전달되어 예를 들어 종속성의 일부를 모의할 수 있습니다:

```js
import { mock, fn } from '@wdio/browser-runner'
import defaultExport, { bar, foo } from './foo-bar-baz.js';

mock('./foo-bar-baz.js', async (originalModule) => {
    // Mock the default export and named export 'foo'
    // and propagate named export from the original module
    return {
        __esModule: true,
        ...originalModule,
        default: fn(() => 'mocked baz'),
        foo: 'mocked foo',
    }
})

describe('partial mock', () => {
    it('should do a partial mock', () => {
        const defaultExportResult = defaultExport();
        expect(defaultExportResult).toBe('mocked baz');
        expect(defaultExport).toHaveBeenCalled();

        expect(foo).toBe('mocked foo');
        expect(bar()).toBe('bar');
    })
})
```

## 수동 모킹

수동 모의는 `__mocks__/` (`automockDir` 옵션 참조) 하위 디렉토리에 모듈을 작성하여 정의됩니다. 모의하려는 모듈이 Node 모듈인 경우(예: `lodash`), 모의는 `__mocks__` 디렉토리에 배치되어야 하며 자동으로 모의됩니다. 명시적으로 `mock('module_name')`을 호출할 필요가 없습니다.

스코프가 지정된 모듈(스코프가 지정된 패키지라고도 함)은 스코프가 지정된 모듈 이름과 일치하는 디렉토리 구조에 파일을 만들어 모의할 수 있습니다. 예를 들어 `@scope/project-name`이라는 스코프가 지정된 모듈을 모의하려면 `__mocks__/@scope/project-name.js` 경로에 파일을 만들고 그에 따라 `@scope/` 디렉토리를 만듭니다.

```
.
├── config
├── __mocks__
│   ├── axios.js
│   ├── lodash.js
│   └── @scope
│       └── project-name.js
├── node_modules
└── views
```

주어진 모듈에 대한 수동 모의가 존재하면 WebdriverIO는 명시적으로 `mock('moduleName')`을 호출할 때 해당 모듈을 사용합니다. 그러나 automock이 true로 설정되면 `mock('moduleName')`이 호출되지 않더라도 자동으로 생성된 모의 대신 수동 모의 구현이 사용됩니다. 이 동작을 거부하려면 실제 모듈 구현을 사용해야 하는 테스트에서 명시적으로 `unmock('moduleName')`을 호출해야 합니다. 예:

```js
import { unmock } from '@wdio/browser-runner'

unmock('lodash')
```

## 호이스팅

브라우저에서 모킹이 작동하도록 하기 위해 WebdriverIO는 테스트 파일을 다시 작성하고 모든 것 위에 모의 호출을 호이스트합니다(Jest에서의 호이스팅 문제에 대한 [이 블로그 포스트](https://www.coolcomputerclub.com/posts/jest-hoist-await/) 참조). 이것은 모의 리졸버에 변수를 전달하는 방식을 제한합니다, 예:

```js title=component.test.js
import dep from 'dependency'
const variable = 'foobar'

/**
 * ❌ this fails as `dep` and `variable` are not defined inside the mock resolver
 */
mock('./some/module.ts', () => ({
    exportA: dep,
    exportB: variable
}))
```

이를 해결하려면 리졸버 내에서 사용된 모든 변수를 정의해야 합니다, 예:

```js title=component.test.js
/**
 * ✔️ this works as all variables are defined within the resolver
 */
mock('./some/module.ts', async () => {
    const dep = await import('dependency')
    const variable = 'foobar'

    return {
        exportA: dep,
        exportB: variable
    }
})
```

## 요청

브라우저 요청(예: API 호출)을 모의하는 방법을 찾고 있다면, [Request Mock and Spies](/docs/mocksandspies) 섹션을 참조하세요.