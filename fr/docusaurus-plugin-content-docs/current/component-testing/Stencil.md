---
id: stencil
title: Stencil
---

[Stencil](https://stenciljs.com/) est une bibliothèque pour créer des bibliothèques de composants réutilisables et évolutives. Vous pouvez tester les composants Stencil directement dans un navigateur réel en utilisant WebdriverIO et son [exécuteur de navigateur](/docs/runner#browser-runner).

## Configuration

Pour configurer WebdriverIO dans votre projet Stencil, suivez les [instructions](/docs/component-testing#set-up) dans notre documentation sur les tests de composants. Assurez-vous de sélectionner `stencil` comme préréglage dans vos options d'exécution, par exemple :

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

Si vous utilisez Stencil avec un framework comme React ou Vue, vous devriez conserver le préréglage pour ces frameworks.

:::

Vous pouvez ensuite démarrer les tests en exécutant :

```sh
npx wdio run ./wdio.conf.ts
```

## Écriture des tests

Supposons que vous ayez les composants Stencil suivants :

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

Dans votre test, utilisez la méthode `render` de `@wdio/browser-runner/stencil` pour attacher le composant à la page de test. Pour interagir avec le composant, nous recommandons d'utiliser les commandes WebdriverIO car elles se comportent plus comme des interactions utilisateur réelles, par exemple :

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

La méthode `render` fournit les options suivantes :

##### `components`

Un tableau de composants à tester. Les classes de composants peuvent être importées dans le fichier de spécification, puis leur référence doit être ajoutée au tableau `component` pour être utilisée tout au long du test.

__Type:__ `CustomElementConstructor[]`<br />
__Défaut:__ `[]`

##### `flushQueue`

Si `false`, ne vide pas la file d'attente de rendu lors de la configuration initiale du test.

__Type:__ `boolean`<br />
__Défaut:__ `true`

##### `template`

Le JSX initial utilisé pour générer le test. Utilisez `template` lorsque vous souhaitez initialiser un composant en utilisant ses propriétés, au lieu de ses attributs HTML. Il rendra le modèle spécifié (JSX) dans `document.body`.

__Type:__ `JSX.Template`

##### `html`

Le HTML initial utilisé pour générer le test. Cela peut être utile pour construire une collection de composants fonctionnant ensemble et attribuer des attributs HTML.

__Type:__ `string`

##### `language`

Définit l'attribut `lang` simulé sur `<html>`.

__Type:__ `string`

##### `autoApplyChanges`

Par défaut, toute modification des propriétés et attributs du composant doit utiliser `env.waitForChanges()` pour tester les mises à jour. En option, `autoApplyChanges` vide continuellement la file d'attente en arrière-plan.

__Type:__ `boolean`<br />
__Défaut:__ `false`

##### `attachStyles`

Par défaut, les styles ne sont pas attachés au DOM et ne sont pas reflétés dans le HTML sérialisé. La définition de cette option sur `true` inclura les styles du composant dans la sortie sérialisable.

__Type:__ `boolean`<br />
__Défaut:__ `false`

#### Environnement de rendu

La méthode `render` renvoie un objet d'environnement qui fournit certains utilitaires pour gérer l'environnement du composant.

##### `flushAll`

Après que des modifications ont été apportées à un composant, comme une mise à jour d'une propriété ou d'un attribut, la page de test n'applique pas automatiquement les modifications. Pour attendre et appliquer la mise à jour, appelez `await flushAll()`

__Type:__ `() => void`

##### `unmount`

Supprime l'élément conteneur du DOM.

__Type:__ `() => void`

##### `styles`

Tous les styles définis par les composants.

__Type:__ `Record<string, string>`

##### `container`

Élément conteneur dans lequel le modèle est rendu.

__Type:__ `HTMLElement`

##### `$container`

L'élément conteneur en tant qu'élément WebdriverIO.

__Type:__ `WebdriverIO.Element`

##### `root`

Le composant racine du modèle.

__Type:__ `HTMLElement`

##### `$root`

Le composant racine en tant qu'élément WebdriverIO.

__Type:__ `WebdriverIO.Element`

### `waitForChanges`

Méthode d'aide pour attendre que le composant soit prêt.

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

Si vous définissez des propriétés ou des états dans votre composant Stencil, vous devez gérer quand ces changements doivent être appliqués au composant pour être re-rendu.


## Exemples

Vous pouvez trouver un exemple complet d'une suite de tests de composants WebdriverIO pour Stencil dans notre [dépôt d'exemples](https://github.com/webdriverio/component-testing-examples/tree/main/stencil-component-starter).