---
id: lit
title: Lit
---

Lit - это простая библиотека для создания быстрых, легких веб-компонентов. Тестирование веб-компонентов Lit с помощью WebdriverIO очень просто благодаря [селекторам теневого DOM](/docs/selectors#deep-selectors) в WebdriverIO, которые позволяют искать вложенные элементы в теневых корнях с помощью всего одной команды.

## Настройка

Чтобы настроить WebdriverIO в вашем проекте Lit, следуйте [инструкциям](/docs/component-testing#set-up) в нашей документации по тестированию компонентов. Для Lit вам не нужны пресеты, так как веб-компоненты Lit не требуют компиляции - они являются чистыми расширениями веб-компонентов.

После настройки вы можете запустить тесты, выполнив:

```sh
npx wdio run ./wdio.conf.js
```

## Написание тестов

Предположим, у вас есть следующий компонент Lit:

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

Чтобы протестировать компонент, вы должны отрендерить его на тестовой странице перед началом теста и убедиться, что он удаляется после:

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

Полный пример набора тестов компонентов WebdriverIO для Lit вы можете найти в нашем [репозитории примеров](https://github.com/webdriverio/component-testing-examples/tree/main/lit-typescript-vite).