---
id: preact
title: Preact
description: "Configurez le browser runner de WebdriverIO pour un projet Preact avec le preset preact et écrivez des tests de composants avec Testing Library."
---

[Preact](https://preactjs.com/) est une alternative rapide de 3 ko à React avec la même API moderne. Vous pouvez tester les composants Preact directement dans un vrai navigateur en utilisant WebdriverIO et son [browser runner](/docs/runner#browser-runner).

## Configuration

Pour configurer WebdriverIO dans votre projet Preact, suivez les [instructions](/docs/component-testing#set-up) de notre documentation sur les tests de composants. Assurez-vous de sélectionner `preact` comme preset dans les options de votre runner, par exemple :

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'preact'
    }],
    // ...
}
```

:::info

Si vous utilisez déjà [Vite](https://vitejs.dev/) comme serveur de développement, vous pouvez également simplement réutiliser votre configuration de `vite.config.ts` dans votre configuration WebdriverIO. Pour plus d'informations, consultez `viteConfig` dans les [options du runner](/docs/runner#runner-options).

:::

Le preset Preact nécessite l'installation de `@preact/preset-vite`. Nous recommandons également d'utiliser [Testing Library](https://testing-library.com/) pour afficher le composant dans la page de test. Pour cela, vous devrez installer les dépendances supplémentaires suivantes :

```sh npm2yarn
npm install --save-dev @testing-library/preact @preact/preset-vite
```

Vous pouvez ensuite lancer les tests en exécutant :

```sh
npx wdio run ./wdio.conf.js
```

## Écrire des tests

Supposons que vous ayez le composant Preact suivant :

```tsx title="./components/Component.jsx"
import { h } from 'preact'
import { useState } from 'preact/hooks'

interface Props {
    initialCount: number
}

export function Counter({ initialCount }: Props) {
    const [count, setCount] = useState(initialCount)
    const increment = () => setCount(count + 1)

    return (
        <div>
            Current value: {count}
            <button onClick={increment}>Increment</button>
        </div>
    )
}

```

Dans votre test, utilisez la méthode `render` de `@testing-library/preact` pour attacher le composant à la page de test. Pour interagir avec le composant, nous recommandons d'utiliser les commandes WebdriverIO, car elles se comportent de manière plus proche des interactions réelles d'un utilisateur, par exemple :

```ts title="app.test.tsx"
import { expect } from 'expect'
import { render, screen } from '@testing-library/preact'

import { Counter } from './components/PreactComponent.js'

describe('Preact Component Testing', () => {
    it('should increment after "Increment" button is clicked', async () => {
        const component = await $(render(<Counter initialCount={5} />))
        await expect(component).toHaveText(expect.stringContaining('Current value: 5'))

        const incrElem = await $(screen.getByText('Increment'))
        await incrElem.click()
        await expect(component).toHaveText(expect.stringContaining('Current value: 6'))
    })
})
```

Vous trouverez un exemple complet de suite de tests de composants WebdriverIO pour Preact dans notre [dépôt d'exemples](https://github.com/webdriverio/component-testing-examples/tree/main/preact-typescript-vite).