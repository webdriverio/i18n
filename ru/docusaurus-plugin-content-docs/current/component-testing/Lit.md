---
id: lit
title: Lit
description: "Настройте браузерный раннер WebdriverIO для веб-компонентов Lit и пишите тесты, которые находят элементы внутри вложенных shadow root."
---

Lit — это простая библиотека для создания быстрых и легковесных веб-компонентов. Тестировать веб-компоненты Lit с помощью WebdriverIO очень просто благодаря [селекторам shadow DOM](/docs/selectors#deep-selectors) WebdriverIO: вы можете находить элементы, вложенные в shadow root, всего одной командой.

## Настройка

Чтобы настроить WebdriverIO в вашем проекте Lit, следуйте [инструкциям](/docs/component-testing#set-up) в нашей документации по тестированию компонентов. Для Lit не нужен пресет, поскольку веб-компоненты Lit не требуют обработки компилятором — они представляют собой чистые расширения веб-компонентов.

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

    // Отрисовка UI как функции от состояния компонента
    render() {
        return html`<p>Hello, ${this.name}!</p>`
    }
}
```

Чтобы протестировать компонент, необходимо отрисовать его на тестовой странице перед началом теста и убедиться, что после теста он будет удалён:

```ts title="lit.test.js"
import expect from 'expect'
import { waitFor } from '@testing-library/dom'

// импорт компонента Lit
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

Полный пример набора тестов компонентов WebdriverIO для Lit можно найти в нашем [репозитории с примерами](https://github.com/webdriverio/component-testing-examples/tree/main/lit-typescript-vite).