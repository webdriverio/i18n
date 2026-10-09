---
id: solid
title: SolidJS
description: "Configurez le browser runner de WebdriverIO pour un projet SolidJS avec le preset solid et écrivez des tests de composants qui s'affichent dans la page."
---

[SolidJS](https://www.solidjs.com/) est un framework permettant de créer des interfaces utilisateur avec une réactivité simple et performante. Vous pouvez tester les composants SolidJS directement dans un vrai navigateur en utilisant WebdriverIO et son [browser runner](/docs/runner#browser-runner).

## Configuration

Pour configurer WebdriverIO dans votre projet SolidJS, suivez les [instructions](/docs/component-testing#set-up) de notre documentation sur les tests de composants. Assurez-vous de sélectionner `solid` comme preset dans les options de votre runner, par exemple :

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'solid'
    }],
    // ...
}
```

:::info

Si vous utilisez déjà [Vite](https://vitejs.dev/) comme serveur de développement, vous pouvez également réutiliser votre configuration de `vite.config.ts` dans votre configuration WebdriverIO. Pour plus d'informations, consultez `viteConfig` dans les [options du runner](/docs/runner#runner-options).

:::

Le preset SolidJS nécessite l'installation de `vite-plugin-solid` :

```sh npm2yarn
npm install --save-dev vite-plugin-solid
```

Vous pouvez ensuite lancer les tests en exécutant :

```sh
npx wdio run ./wdio.conf.js
```

## Écrire des tests

Supposons que vous ayez le composant SolidJS suivant :

```html title="./components/Component.tsx"
import { createSignal } from 'solid-js'

function App() {
    const [theme, setTheme] = createSignal('light')

    const toggleTheme = () => {
        const nextTheme = theme() === 'light' ? 'dark' : 'light'
        setTheme(nextTheme)
    }

    return <button onClick={toggleTheme}>
        Current theme: {theme()}
    </button>
}

export default App
```

Dans votre test, utilisez la méthode `render` de `solid-js/web` pour attacher le composant à la page de test. Pour interagir avec le composant, nous recommandons d'utiliser les commandes WebdriverIO, car elles se comportent de manière plus proche des interactions réelles d'un utilisateur, par exemple :

```ts title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from 'solid-js/web'

import App from './components/Component.jsx'

describe('Solid Component Testing', () => {
    /**
     * s'assurer que le composant est rendu pour chaque test dans un
     * nouveau conteneur racine
     */
    let root: Element
    beforeEach(() => {
        if (root) {
            root.remove()
        }

        root = document.createElement('div')
        document.body.appendChild(root)
    })

    it('Test theme button toggle', async () => {
        render(<App />, root)
        const buttonEl = await $('button')

        await buttonEl.click()
        expect(buttonEl).toContainHTML('dark')
    })
})
```

Vous trouverez un exemple complet d'une suite de tests de composants WebdriverIO pour SolidJS dans notre [dépôt d'exemples](https://github.com/webdriverio/component-testing-examples/tree/main/solidjs-typescript-vite).