---
id: lit
title: Lit
---

Lit to prosta biblioteka do budowania szybkich, lekkich komponentów webowych. Testowanie komponentów webowych Lit z WebdriverIO jest bardzo łatwe dzięki [selektorom Shadow DOM](/docs/selectors#deep-selectors) WebdriverIO, które pozwalają na odpytywanie zagnieżdżonych elementów w shadow roots za pomocą jednego polecenia.

## Konfiguracja

Aby skonfigurować WebdriverIO w projekcie Lit, postępuj zgodnie z [instrukcjami](/docs/component-testing#set-up) w naszej dokumentacji testowania komponentów. Dla Lit nie potrzebujesz presetu, ponieważ komponenty webowe Lit nie muszą przechodzić przez kompilator, są to czyste rozszerzenia komponentów webowych.

Po skonfigurowaniu możesz uruchomić testy, wykonując:

```sh
npx wdio run ./wdio.conf.js
```

## Pisanie Testów

Załóżmy, że masz następujący komponent Lit:

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

Aby przetestować komponent, musisz wyrenderować go na stronie testowej przed rozpoczęciem testu i upewnić się, że zostanie wyczyszczony po zakończeniu:

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

Pełny przykład zestawu testów komponentów WebdriverIO dla Lit znajdziesz w naszym [repozytorium przykładów](https://github.com/webdriverio/component-testing-examples/tree/main/lit-typescript-vite).