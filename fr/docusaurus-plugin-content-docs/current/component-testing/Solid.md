---
id: solid
title: SolidJS
---

[SolidJS](https://www.solidjs.com/) est un framework pour construire des interfaces utilisateur avec une réactivité simple et performante. Vous pouvez tester les composants SolidJS directement dans un navigateur réel en utilisant WebdriverIO et son [exécuteur de navigateur](/docs/runner#browser-runner).

## Configuration

Pour configurer WebdriverIO dans votre projet SolidJS, suivez les [instructions](/docs/component-testing#set-up) dans notre documentation de test de composants. Assurez-vous de sélectionner `solid` comme préréglage dans vos options d'exécuteur, par exemple :

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

Si vous utilisez déjà [Vite](https://vitejs.dev/) comme serveur de développement, vous pouvez également réutiliser votre configuration dans `vite.config.ts` au sein de votre configuration WebdriverIO. Pour plus d'informations, consultez `viteConfig` dans les [options d'exécuteur](/docs/runner#runner-options).

:::

Le préréglage SolidJS nécessite l'installation de `vite-plugin-solid` :

```sh npm2yarn
npm install --save-dev vite-plugin-solid
```

Vous pouvez ensuite démarrer les tests en exécutant :

```sh
npx wdio run ./wdio.conf.js
```

## Écriture de tests

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

Dans votre test, utilisez la méthode `render` de `solid-js/web` pour attacher le composant à la page de test. Pour interagir avec le composant, nous recommandons d'utiliser les commandes WebdriverIO car elles se comportent de manière plus proche des interactions utilisateur réelles, par exemple :

```ts title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from 'solid-js/web'

import App from './components/Component.jsx'

describe('Solid Component Testing', () => {
    /**
     * ensure we render the component for every test in a
     * new root container
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

Vous pouvez trouver un exemple complet d'une suite de tests de composants WebdriverIO pour SolidJS dans notre [dépôt d'exemples](https://github.com/webdriverio/component-testing-examples/tree/main/solidjs-typescript-vite).