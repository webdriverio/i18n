---
id: lit
title: Lit
---

Lit - це проста бібліотека для створення швидких, легких веб-компонентів. Тестування веб-компонентів Lit з WebdriverIO дуже просте завдяки [селекторам тіньового DOM](/docs/selectors#deep-selectors) WebdriverIO, за допомогою яких ви можете запитувати вкладені елементи в тіньових коренях лише однією командою.

## Налаштування

Щоб налаштувати WebdriverIO у вашому проєкті Lit, дотримуйтесь [інструкцій](/docs/component-testing#set-up) у нашій документації з тестування компонентів. Для Lit вам не потрібен пресет, оскільки веб-компоненти Lit не потребують компілятора, вони є чистими вдосконаленнями веб-компонентів.

Після налаштування ви можете запустити тести, виконавши:

```sh
npx wdio run ./wdio.conf.js
```

## Написання тестів

Припустимо, у вас є наступний компонент Lit:

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

Щоб протестувати компонент, ви повинні відрендерити його на тестовій сторінці перед початком тесту та забезпечити його очищення після:

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

Повний приклад набору тестів компонентів WebdriverIO для Lit можна знайти в нашому [репозиторії прикладів](https://github.com/webdriverio/component-testing-examples/tree/main/lit-typescript-vite).