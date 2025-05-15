---
id: stencil
title: 스텐실
---

[Stencil](https://stenciljs.com/)은 재사용 가능하고 확장 가능한 컴포넌트 라이브러리를 구축하기 위한 라이브러리입니다. WebdriverIO와 [브라우저 러너](/docs/runner#browser-runner)를 사용하여 실제 브라우저에서 직접 Stencil 컴포넌트를 테스트할 수 있습니다.

## 설정

Stencil 프로젝트에서 WebdriverIO를 설정하려면 컴포넌트 테스팅 문서의 [지침](/docs/component-testing#set-up)을 따르세요. 러너 옵션에서 프리셋으로 `stencil`을 선택하세요. 예:

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'stencil'
    }],
    // ...
}
```

:::info

React나 Vue와 같은 프레임워크와 함께 Stencil을 사용하는 경우, 해당 프레임워크의 프리셋을 유지해야 합니다.

:::

다음 명령으로 테스트를 시작할 수 있습니다:

```sh
npx wdio run ./wdio.conf.ts
```

## 테스트 작성하기

다음과 같은 Stencil 컴포넌트가 있다고 가정해 봅시다:

```tsx title="./components/Component.tsx"
import { Component, Prop, h } from '@stencil/core'

@Component({
    tag: 'my-name',
    shadow: true
})
export class MyName {
    @Prop() name: string

    normalize(name: string): string {
        if (name) {
            return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase()
        }
        return ''
    }

    render() {
        return (
            <div class="text">
                <p>Hello! My name is {this.normalize(this.name)}.</p>
            </div>
        )
    }
}
```

### `render`

테스트에서 `@wdio/browser-runner/stencil`의 `render` 메서드를 사용하여 컴포넌트를 테스트 페이지에 연결합니다. 컴포넌트와 상호 작용하기 위해서는 실제 사용자 상호 작용에 더 가까운 WebdriverIO 명령을 사용하는 것이 좋습니다. 예:

```tsx title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from '@wdio/browser-runner/stencil'

import MyNameComponent from './components/Component.tsx'

describe('Stencil Component Testing', () => {
    it('should render component correctly', async () => {
        await render({
            components: [MyNameComponent],
            template: () => (
                <my-name name={'stencil'}></my-name>
            )
        })
        await expect($('.text')).toHaveText('Hello! My name is Stencil.')
    })
})
```

#### Render 옵션

`render` 메서드는 다음 옵션을 제공합니다:

##### `components`

테스트할 컴포넌트 배열입니다. 컴포넌트 클래스는 스펙 파일로 가져올 수 있으며, 그 레퍼런스는 테스트 전체에서 사용할 수 있도록 `component` 배열에 추가되어야 합니다.

__타입:__ `CustomElementConstructor[]`<br />
__기본값:__ `[]`

##### `flushQueue`

`false`이면 초기 테스트 설정에서 렌더 큐를 플러시하지 않습니다.

__타입:__ `boolean`<br />
__기본값:__ `true`

##### `template`

테스트를 생성하는 데 사용되는 초기 JSX입니다. HTML 속성 대신 컴포넌트의 속성을 사용하여 컴포넌트를 초기화하려면 `template`을 사용하세요. 지정된 템플릿(JSX)을 `document.body`에 렌더링합니다.

__타입:__ `JSX.Template`

##### `html`

테스트를 생성하는 데 사용되는 초기 HTML입니다. 이는 함께 작동하는 컴포넌트 모음을 구성하고 HTML 속성을 할당하는 데 유용할 수 있습니다.

__타입:__ `string`

##### `language`

`<html>`에 모의(mocked) `lang` 속성을 설정합니다.

__타입:__ `string`

##### `autoApplyChanges`

기본적으로 컴포넌트 속성 및 어트리뷰트에 대한 변경 사항은 업데이트를 테스트하기 위해 `env.waitForChanges()`가 필요합니다. 옵션으로 `autoApplyChanges`는 백그라운드에서 연속적으로 큐를 플러시합니다.

__타입:__ `boolean`<br />
__기본값:__ `false`

##### `attachStyles`

기본적으로 스타일은 DOM에 연결되지 않으며 직렬화된 HTML에 반영되지 않습니다. 이 옵션을 `true`로 설정하면 컴포넌트의 스타일이 직렬화 가능한 출력에 포함됩니다.

__타입:__ `boolean`<br />
__기본값:__ `false`

#### Render 환경

`render` 메서드는 컴포넌트의 환경을 관리하기 위한 특정 유틸리티 헬퍼를 제공하는 환경 객체를 반환합니다.

##### `flushAll`

속성이나 어트리뷰트 업데이트와 같이 컴포넌트에 변경이 이루어진 후, 테스트 페이지는 자동으로 변경 사항을 적용하지 않습니다. 업데이트를 기다리고 적용하려면 `await flushAll()`을 호출하세요.

__타입:__ `() => void`

##### `unmount`

DOM에서 컨테이너 요소를 제거합니다.

__타입:__ `() => void`

##### `styles`

컴포넌트에 의해 정의된 모든 스타일입니다.

__타입:__ `Record<string, string>`

##### `container`

템플릿이 렌더링되는 컨테이너 요소입니다.

__타입:__ `HTMLElement`

##### `$container`

WebdriverIO 요소로서의 컨테이너 요소입니다.

__타입:__ `WebdriverIO.Element`

##### `root`

템플릿의 루트 컴포넌트입니다.

__타입:__ `HTMLElement`

##### `$root`

WebdriverIO 요소로서의 루트 컴포넌트입니다.

__타입:__ `WebdriverIO.Element`

### `waitForChanges`

컴포넌트가 준비될 때까지 기다리는 헬퍼 메서드입니다.

```ts
import { render, waitForChanges } from '@wdio/browser-runner/stencil'
import { MyComponent } from './component.tsx'

const page = render({
    components: [MyComponent],
    html: '<my-component></my-component>'
})

expect(page.root.querySelector('div')).not.toBeDefined()
await waitForChanges()
expect(page.root.querySelector('div')).toBeDefined()
```

## 요소 업데이트

Stencil 컴포넌트에서 속성이나 상태를 정의하는 경우, 이러한 변경 사항이 컴포넌트에 적용되어 다시 렌더링되어야 하는 시점을 관리해야 합니다.


## 예제

WebdriverIO 컴포넌트 테스트 스위트의 전체 예제는 [예제 저장소](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter)에서 확인할 수 있습니다.