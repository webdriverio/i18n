---
id: react
title: React
description: "Configurez le browser runner de WebdriverIO pour un projet React avec le preset react et écrivez des tests de composants avec Testing Library."
---

[React](https://reactjs.org/) facilite la création d'interfaces utilisateur interactives. Concevez des vues simples pour chaque état de votre application, et React mettra à jour et affichera efficacement les bons composants lorsque vos données changeront. Vous pouvez tester les composants React directement dans un vrai navigateur en utilisant WebdriverIO et son [browser runner](/docs/runner#browser-runner).

## Configuration

Pour configurer WebdriverIO dans votre projet React, suivez les [instructions](/docs/component-testing#set-up) de notre documentation sur les tests de composants. Assurez-vous de sélectionner `react` comme preset dans les options de votre runner, par exemple :

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'react'
    }],
    // ...
}
```

:::info

Si vous utilisez déjà [Vite](https://vitejs.dev/) comme serveur de développement, vous pouvez également réutiliser votre configuration de `vite.config.ts` dans votre configuration WebdriverIO. Pour plus d'informations, consultez `viteConfig` dans les [options du runner](/docs/runner#runner-options).

:::

Le preset React nécessite que `@vitejs/plugin-react` soit installé. Nous recommandons également d'utiliser [Testing Library](https://testing-library.com/) pour afficher le composant dans la page de test. Vous devrez donc installer les dépendances supplémentaires suivantes :

```sh npm2yarn
npm install --save-dev @testing-library/react @vitejs/plugin-react
```

Vous pouvez ensuite lancer les tests en exécutant :

```sh
npx wdio run ./wdio.conf.js
```

## Écrire des tests

Supposons que vous ayez le composant React suivant :

```tsx title="./components/Component.jsx"
import React, { useState } from 'react'

function App() {
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(nextTheme)
    }

    return <button onClick={toggleTheme}>
        Current theme: {theme}
    </button>
}

export default App
```

Dans votre test, utilisez la méthode `render` de `@testing-library/react` pour attacher le composant à la page de test. Pour interagir avec le composant, nous recommandons d'utiliser les commandes WebdriverIO, car elles se comportent de manière plus proche des interactions réelles d'un utilisateur, par exemple :

```ts title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

import App from './components/Component.jsx'

describe('React Component Testing', () => {
    it('Test theme button toggle', async () => {
        render(<App />)
        const buttonEl = screen.getByText(/Current theme/i)

        await $(buttonEl).click()
        expect(buttonEl).toContainHTML('dark')
    })
})
```

Vous trouverez un exemple complet de suite de tests de composants WebdriverIO pour React dans notre [dépôt d'exemples](https://github.com/webdriverio/component-testing-examples/tree/main/react-typescript-vite).