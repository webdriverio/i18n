---
id: stencil
title: Stencil
description: "Configurez le browser runner de WebdriverIO pour les composants Stencil, effectuez leur rendu avec l'utilitaire render et attendez les mises à jour des éléments."
---

[Stencil](https://stenciljs.com/) est une bibliothèque permettant de créer des bibliothèques de composants réutilisables et évolutives. Vous pouvez tester les composants Stencil directement dans un vrai navigateur en utilisant WebdriverIO et son [browser runner](/docs/runner#browser-runner).

## Configuration

Pour configurer WebdriverIO dans votre projet Stencil, suivez les [instructions](/docs/component-testing#set-up) de notre documentation sur les tests de composants. Assurez-vous de sélectionner `stencil` comme preset dans les options de votre runner, par exemple :

```js
// wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: 'stencil'
    }],
    // ...
}
```

:::info

Si vous utilisez Stencil avec un framework comme React ou Vue, vous devez conserver le preset de ces frameworks.

:::

Vous pouvez ensuite lancer les tests en exécutant :

```sh
npx wdio run ./wdio.conf.ts
```

## Écrire des tests

Supposons que vous disposiez des composants Stencil suivants :

```tsx title="./components/Component.tsx"
import { Component, Prop, h } from '@stencil/core'

@Component({
    tag: 'my-name',
    shadow: true
})
export class MyName {
    @Prop() name: string

    normalize(name: string): string {
        if (name) {
            return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase()
        }
        return ''
    }

    render() {
        return (
            <div class="text">
                <p>Hello! My name is {this.normalize(this.name)}.</p>
            </div>
        )
    }
}
```

### `render`

Dans votre test, utilisez la méthode `render` de `@wdio/browser-runner/stencil` pour attacher le composant à la page de test. Pour interagir avec le composant, nous recommandons d'utiliser les commandes WebdriverIO, car elles se comportent de manière plus proche des interactions réelles d'un utilisateur, par exemple :

```tsx title="app.test.tsx"
import { expect } from '@wdio/globals'
import { render } from '@wdio/browser-runner/stencil'

import MyNameComponent from './components/Component.tsx'

describe('Stencil Component Testing', () => {
    it('should render component correctly', async () => {
        await render({
            components: [MyNameComponent],
            template: () => (
                <my-name name={'stencil'}></my-name>
            )
        })
        await expect($('.text')).toHaveText('Hello! My name is Stencil.')
    })
})
```

#### Options de rendu

La méthode `render` propose les options suivantes :

##### `components`

Un tableau de composants à tester. Les classes de composants peuvent être importées dans le fichier de spécification, puis leur référence doit être ajoutée au tableau `component` afin d'être utilisée tout au long du test.

__Type :__ `CustomElementConstructor[]`<br />
__Par défaut :__ `[]`

##### `flushQueue`

Si `false`, la file d'attente de rendu n'est pas vidée lors de la configuration initiale du test.

__Type :__ `boolean`<br />
__Par défaut :__ `true`

##### `template`

Le JSX initial utilisé pour générer le test. Utilisez `template` lorsque vous souhaitez initialiser un composant à l'aide de ses propriétés plutôt que de ses attributs HTML. Le template (JSX) spécifié sera rendu dans `document.body`.

__Type :__ `JSX.Template`

##### `html`

Le HTML initial utilisé pour générer le test. Cela peut être utile pour construire un ensemble de composants fonctionnant ensemble et pour attribuer des attributs HTML.

__Type :__ `string`

##### `language`

Définit l'attribut `lang` simulé sur `<html>`.

__Type :__ `string`

##### `autoApplyChanges`

Par défaut, toute modification des propriétés et attributs d'un composant nécessite `env.waitForChanges()` pour tester les mises à jour. En option, `autoApplyChanges` vide continuellement la file d'attente en arrière-plan.

__Type :__ `boolean`<br />
__Par défaut :__ `false`

##### `attachStyles`

Par défaut, les styles ne sont pas attachés au DOM et ne sont pas reflétés dans le HTML sérialisé. Définir cette option sur `true` inclura les styles du composant dans la sortie sérialisable.

__Type :__ `boolean`<br />
__Par défaut :__ `false`

#### Environnement de rendu

La méthode `render` renvoie un objet d'environnement qui fournit certains utilitaires pour gérer l'environnement du composant.

##### `flushAll`

Après que des modifications ont été apportées à un composant, comme la mise à jour d'une propriété ou d'un attribut, la page de test n'applique pas automatiquement les changements. Pour attendre et appliquer la mise à jour, appelez `await flushAll()`

__Type :__ `() => void`

##### `unmount`

Supprime l'élément conteneur du DOM.

__Type :__ `() => void`

##### `styles`

Tous les styles définis par les composants.

__Type :__ `Record<string, string>`

##### `container`

L'élément conteneur dans lequel le template est rendu.

__Type :__ `HTMLElement`

##### `$container`

L'élément conteneur en tant qu'élément WebdriverIO.

__Type :__ `WebdriverIO.Element`

##### `root`

Le composant racine du template.

__Type :__ `HTMLElement`

##### `$root`

Le composant racine en tant qu'élément WebdriverIO.

__Type :__ `WebdriverIO.Element`

### `waitForChanges`

Méthode utilitaire permettant d'attendre que le composant soit prêt.

```ts
import { render, waitForChanges } from '@wdio/browser-runner/stencil'
import { MyComponent } from './component.tsx'

const page = render({
    components: [MyComponent],
    html: '<my-component></my-component>'
})

expect(page.root.querySelector('div')).not.toBeDefined()
await waitForChanges()
expect(page.root.querySelector('div')).toBeDefined()
```

## Mises à jour des éléments

Si vous définissez des propriétés ou des états dans votre composant Stencil, vous devez gérer le moment où ces changements doivent être appliqués au composant pour qu'il soit rendu à nouveau.


## Exemples

Vous trouverez un exemple complet d'une suite de tests de composants WebdriverIO pour Stencil dans notre [dépôt d'exemples](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter).