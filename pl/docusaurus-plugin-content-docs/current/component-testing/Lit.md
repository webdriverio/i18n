---
id: lit
title: Lit
description: "Skonfiguruj WebdriverIO browser runner dla komponentów webowych Lit i pisz testy, które wyszukują elementy wewnątrz zagnieżdżonych shadow roots."
---

Lit to prosta biblioteka do tworzenia szybkich, lekkich komponentów webowych. Testowanie komponentów webowych Lit za pomocą WebdriverIO jest bardzo łatwe dzięki [selektorom shadow DOM](/docs/selectors#deep-selectors) w WebdriverIO, za pomocą których możesz wyszukiwać elementy zagnieżdżone w shadow roots przy użyciu zaledwie jednego polecenia.

## Konfiguracja

Aby skonfigurować WebdriverIO w swoim projekcie Lit, postępuj zgodnie z [instrukcjami](/docs/component-testing#set-up) w naszej dokumentacji dotyczącej testowania komponentów. W przypadku Lit nie potrzebujesz presetu, ponieważ komponenty webowe Lit nie muszą przechodzić przez kompilator – są czystymi rozszerzeniami komponentów webowych.

Po zakończeniu konfiguracji możesz uruchomić testy, wykonując:

```sh
npx wdio run ./wdio.conf.js
```

## Pisanie testów

Załóżmy, że masz następujący komponent Lit:

```ts title="./components/Component.ts"
import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
    @property()
    name?: string = 'World'

    // Renderuj UI jako funkcję stanu komponentu
    render() {
        return html`<p>Hello, ${this.name}!</p>`
    }
}
```

Aby przetestować komponent, musisz wyrenderować go na stronie testowej przed rozpoczęciem testu i upewnić się, że zostanie on później usunięty:

```ts title="lit.test.js"
import expect from 'expect'
import { waitFor } from '@testing-library/dom'

// importuj komponent Lit
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