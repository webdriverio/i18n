---
id: lit
title: Lit
description: "Configurez le browser runner de WebdriverIO pour les composants web Lit et écrivez des tests qui interrogent des éléments à l'intérieur de shadow roots imbriqués."
---

Lit est une bibliothèque simple pour créer des composants web rapides et légers. Tester des composants web Lit avec WebdriverIO est très facile grâce aux [sélecteurs shadow DOM](/docs/selectors#deep-selectors) de WebdriverIO : vous pouvez interroger des éléments imbriqués dans des shadow roots avec une seule commande.

## Configuration

Pour configurer WebdriverIO dans votre projet Lit, suivez les [instructions](/docs/component-testing#set-up) de notre documentation sur les tests de composants. Pour Lit, vous n'avez pas besoin de preset, car les composants web Lit n'ont pas besoin de passer par un compilateur : ce sont de simples améliorations de composants web.

Une fois la configuration terminée, vous pouvez lancer les tests en exécutant :

```sh
npx wdio run ./wdio.conf.js
```

## Écrire des tests

Supposons que vous ayez le composant Lit suivant :

```ts title="./components/Component.ts"
import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('simple-greeting')
export class SimpleGreeting extends LitElement {
    @property()
    name?: string = 'World'

    // Affiche l'interface utilisateur en fonction de l'état du composant
    render() {
        return html`<p>Hello, ${this.name}!</p>`
    }
}
```

Pour tester le composant, vous devez l'afficher dans la page de test avant le démarrage du test et vous assurer qu'il est nettoyé ensuite :

```ts title="lit.test.js"
import expect from 'expect'
import { waitFor } from '@testing-library/dom'

// importer le composant Lit
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

Vous trouverez un exemple complet de suite de tests de composants WebdriverIO pour Lit dans notre [dépôt d'exemples](https://github.com/webdriverio/component-testing-examples/tree/main/lit-typescript-vite).