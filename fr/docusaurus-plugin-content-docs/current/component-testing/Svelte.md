---
id: svelte
title: Svelte
description: "Configurez le browser runner de WebdriverIO pour un projet Svelte avec le preset svelte et écrivez des tests de composants avec Testing Library."
---

[Svelte](https://svelte.dev/) est une nouvelle approche radicale pour construire des interfaces utilisateur. Alors que les frameworks traditionnels comme React et Vue effectuent l'essentiel de leur travail dans le navigateur, Svelte déplace ce travail vers une étape de compilation qui a lieu lorsque vous construisez votre application. Vous pouvez tester les composants Svelte directement dans un vrai navigateur en utilisant WebdriverIO et son [browser runner](/docs/runner#browser-runner).

## Configuration

Pour configurer WebdriverIO dans votre projet Svelte, suivez les [instructions](/docs/component-testing#set-up) de notre documentation sur les tests de composants. Assurez-vous de sélectionner `svelte` comme preset dans les options de votre runner, par exemple :

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

Si vous utilisez déjà [Vite](https://vitejs.dev/) comme serveur de développement, vous pouvez également simplement réutiliser votre configuration de `vite.config.ts` dans votre configuration WebdriverIO. Pour plus d'informations, consultez `viteConfig` dans les [options du runner](/docs/runner#runner-options).

:::

Le preset Svelte nécessite l'installation de `@sveltejs/vite-plugin-svelte`. Nous recommandons également d'utiliser [Testing Library](https://testing-library.com/) pour afficher le composant dans la page de test. Vous devrez donc installer les dépendances supplémentaires suivantes :

```sh npm2yarn
npm install --save-dev @testing-library/svelte @sveltejs/vite-plugin-svelte
```

Vous pouvez ensuite lancer les tests en exécutant :

```sh
npx wdio run ./wdio.conf.js
```

## Écrire des tests

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

Dans votre test, utilisez la méthode `render` de `@testing-library/svelte` pour attacher le composant à la page de test. Pour interagir avec le composant, nous recommandons d'utiliser les commandes WebdriverIO, car elles se comportent de manière plus proche des interactions réelles d'un utilisateur, par exemple :

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

Vous trouverez un exemple complet d'une suite de tests de composants WebdriverIO pour Svelte dans notre [dépôt d'exemples](https://github.com/webdriverio/component-testing-examples/tree/main/svelte-typescript-vite).