---
id: lit
title: Lit
---

Lit은 빠르고 가벼운 웹 컴포넌트를 구축하기 위한 간단한 라이브러리입니다. WebdriverIO의 [shadow DOM 선택자](/docs/selectors#deep-selectors)를 사용하면 하나의 명령으로 중첩된 shadow root 요소를 쿼리할 수 있어, WebdriverIO로 Lit 웹 컴포넌트를 테스트하는 것은 매우 쉽습니다.

## 설정

WebdriverIO를 Lit 프로젝트에 설정하려면 컴포넌트 테스팅 문서의 [지침](/docs/component-testing#set-up)을 따르세요. Lit 웹 컴포넌트는 컴파일러를 통해 실행할 필요가 없는 순수한 웹 컴포넌트 확장이므로 프리셋이 필요하지 않습니다.

설정이 완료되면 다음 명령으로 테스트를 시작할 수 있습니다:

```sh
npx wdio run ./wdio.conf.js
```

## 테스트 작성하기

다음과 같은 Lit 컴포넌트가 있다고 가정해 봅시다:

```ts title="./components/Component.ts"
import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
    @property()
    name?: string = 'World'

    // Render the UI as a function of component state
    render() {
        return html`<p>Hello, ${this.name}!</p>`
    }
}
```

컴포넌트를 테스트하기 위해서는 테스트 시작 전에 테스트 페이지에 렌더링하고 테스트 후 정리되도록 해야 합니다:

```ts title="lit.test.js"
import expect from 'expect'
import { waitFor } from '@testing-library/dom'

// import Lit component
import './components/Component.ts'

describe('Lit Component testing', () => {
    let elem: HTMLElement

    beforeEach(() => {
        elem = document.createElement('simple-greeting')
    })

    it('should render component', async () => {
        elem.setAttribute('name', 'WebdriverIO')
        document.body.appendChild(elem)

        await waitFor(() => {
            expect(elem.shadowRoot.textContent).toBe('Hello, WebdriverIO!')
        })
    })

    afterEach(() => {
        elem.remove()
    })
})
```

Lit을 위한 WebdriverIO 컴포넌트 테스트 스위트의 전체 예제는 [예제 저장소](https://github.com/webdriverio/component-testing-examples/tree/main/lit-typescript-vite)에서 찾을 수 있습니다.