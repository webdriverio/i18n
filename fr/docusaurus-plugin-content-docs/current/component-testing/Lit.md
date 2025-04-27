---
id: lit
title: Lit
---

Lit est une bibliothèque simple pour créer des composants web rapides et légers. Tester les composants web Lit avec WebdriverIO est très facile grâce aux [sélecteurs de shadow DOM](/docs/selectors#deep-selectors) de WebdriverIO qui vous permettent d'interroger les éléments imbriqués dans les shadow roots avec une seule commande.

## Configuration

Pour configurer WebdriverIO dans votre projet Lit, suivez les [instructions](/docs/component-testing#set-up) dans notre documentation sur les tests de composants. Pour Lit, vous n'avez pas besoin d'un preset car les composants web Lit n'ont pas besoin d'être compilés, ce sont de simples améliorations de composants web.

Une fois configuré, vous pouvez démarrer les tests en exécutant :

```sh
npx wdio run ./wdio.conf.js
```

## Écriture des tests

Supposons que vous ayez le composant Lit suivant :

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

Pour tester le composant, vous devez le rendre dans la page de test avant que le test ne commence et vous assurer qu'il est nettoyé après :

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

Vous pouvez trouver un exemple complet d'une suite de tests de composants WebdriverIO pour Lit dans notre [dépôt d'exemples](https://github.com/webdriverio/component-testing-examples/tree/main/lit-typescript-vite).