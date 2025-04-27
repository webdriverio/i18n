---
id: svelte
title: Svelte
---

[Svelte](https://svelte.dev/) est une approche radicalement nouvelle pour construire des interfaces utilisateur. Alors que les frameworks traditionnels comme React et Vue effectuent l'essentiel de leur travail dans le navigateur, Svelte déplace ce travail dans une étape de compilation qui se produit lors de la construction de votre application. Vous pouvez tester les composants Svelte directement dans un navigateur réel en utilisant WebdriverIO et son [exécuteur de navigateur](/docs/runner#browser-runner).

## Configuration

Pour configurer WebdriverIO dans votre projet Svelte, suivez les [instructions](/docs/component-testing#set-up) dans notre documentation de test de composants. Assurez-vous de sélectionner `svelte` comme préréglage dans vos options d'exécuteur, par exemple :

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'svelte'
    }],
    // ...
}
```

:::info

Si vous utilisez déjà [Vite](https://vitejs.dev/) comme serveur de développement, vous pouvez également réutiliser votre configuration dans `vite.config.ts` au sein de votre configuration WebdriverIO. Pour plus d'informations, consultez `viteConfig` dans les [options d'exécuteur](/docs/runner#runner-options).

:::

Le préréglage Svelte nécessite l'installation de `@sveltejs/vite-plugin-svelte`. Nous recommandons également d'utiliser [Testing Library](https://testing-library.com/) pour rendre le composant dans la page de test. Pour cela, vous devrez installer les dépendances supplémentaires suivantes :

```sh npm2yarn
npm install --save-dev @testing-library/svelte @sveltejs/vite-plugin-svelte
```

Vous pouvez ensuite démarrer les tests en exécutant :

```sh
npx wdio run ./wdio.conf.js
```

## Écriture de tests

Supposons que vous ayez le composant Svelte suivant :

```html title="./components/Component.svelte"
<script>
    export let name

    let buttonText = 'Button'

    function handleClick() {
      buttonText = 'Button Clicked'
    }
</script>

<h1>Hello {name}!</h1>
<button on:click="{handleClick}">{buttonText}</button>
```

Dans votre test, utilisez la méthode `render` de `@testing-library/svelte` pour attacher le composant à la page de test. Pour interagir avec le composant, nous recommandons d'utiliser les commandes WebdriverIO car elles se comportent de manière plus proche des interactions utilisateur réelles, par exemple :

```ts title="svelte.test.js"
import expect from 'expect'

import { render, fireEvent, screen } from '@testing-library/svelte'
import '@testing-library/jest-dom'

import Component from './components/Component.svelte'

describe('Svelte Component Testing', () => {
    it('changes button text on click', async () => {
        render(Component, { name: 'World' })
        const button = await $('button')
        await expect(button).toHaveText('Button')
        await button.click()
        await expect(button).toHaveText('Button Clicked')
    })
})
```

Vous pouvez trouver un exemple complet d'une suite de tests de composants WebdriverIO pour Svelte dans notre [dépôt d'exemples](https://github.com/webdriverio/component-testing-examples/tree/main/svelte-typescript-vite).