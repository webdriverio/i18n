---
id: react
title: React
---

[React](https://reactjs.org/) permet de créer des interfaces utilisateur interactives sans effort. Concevez des vues simples pour chaque état de votre application, et React mettra à jour et rendra efficacement les composants appropriés lorsque vos données changent. Vous pouvez tester les composants React directement dans un navigateur réel en utilisant WebdriverIO et son [exécuteur de navigateur](/docs/runner#browser-runner).

## Configuration

Pour configurer WebdriverIO dans votre projet React, suivez les [instructions](/docs/component-testing#set-up) dans notre documentation de test de composants. Assurez-vous de sélectionner `react` comme préréglage dans vos options d'exécution, par exemple :

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

Si vous utilisez déjà [Vite](https://vitejs.dev/) comme serveur de développement, vous pouvez également réutiliser votre configuration dans `vite.config.ts` au sein de votre configuration WebdriverIO. Pour plus d'informations, consultez `viteConfig` dans les [options d'exécution](/docs/runner#runner-options).

:::

Le préréglage React nécessite l'installation de `@vitejs/plugin-react`. Nous recommandons également d'utiliser [Testing Library](https://testing-library.com/) pour rendre le composant dans la page de test. Pour cela, vous devrez installer les dépendances supplémentaires suivantes :

```sh npm2yarn
npm install --save-dev @testing-library/react @vitejs/plugin-react
```

Vous pouvez ensuite démarrer les tests en exécutant :

```sh
npx wdio run ./wdio.conf.js
```

## Écriture des tests

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

Dans votre test, utilisez la méthode `render` de `@testing-library/react` pour attacher le composant à la page de test. Pour interagir avec le composant, nous recommandons d'utiliser les commandes WebdriverIO car elles se comportent de manière plus proche des interactions réelles des utilisateurs, par exemple :

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

Vous pouvez trouver un exemple complet d'une suite de tests de composants WebdriverIO pour React dans notre [dépôt d'exemples](https://github.com/webdriverio/component-testing-examples/tree/main/react-typescript-vite).