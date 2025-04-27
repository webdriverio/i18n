---
id: action
title: action
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/action.ts
---

La commande action est une interface de bas niveau permettant de fournir des actions d'entrée virtualisées au navigateur web.

En plus des commandes de haut niveau comme `scrollIntoView`, `doubleClick`, l'API Actions fournit un contrôle granulaire
sur ce que les périphériques d'entrée désignés peuvent faire. WebdriverIO fournit une interface pour 3 types de sources
d'entrée:

- une entrée clavier pour les périphériques de type clavier
- une entrée pointeur pour les périphériques de souris, stylet ou tactiles
- et des entrées de molette pour les périphériques à molette de défilement

Chaque chaîne de commandes d'action doit être complétée en appelant `perform` afin de déclencher l'ensemble des actions. Cela
provoque la [libération des actions](https://w3c.github.io/webdriver/#release-actions) et le déclenchement des événements. Vous pouvez
ignorer cela en passant `true` (par exemple `browser.actions(...).perform(true)`).

:::info

La prise en charge de cette commande et des actions spécifiques peut varier selon l'environnement. Les progrès du développement
peuvent être suivis sur [wpt.fyi](https://wpt.fyi/results/webdriver/tests/perform_actions?label=experimental&label=master&aligned).
Pour les mobiles, vous pourriez vouloir utiliser les commandes de geste spécifiques à Appium sur [iOS](https://github.com/appium/appium-xcuitest-driver#mobile-pinch)
et [Android](https://github.com/appium/appium-uiautomator2-driver#mobile-gesture-commands).

:::

### Source d'entrée clavier

Une source d'entrée clavier est une source d'entrée associée à un périphérique de type clavier. Elle peut être déclenchée
en utilisant le paramètre de type `key`. Par exemple:

```ts
browser.action('key')
```

Cela renvoie un objet `KeyAction` qui prend en charge les actions suivantes:

- `down(value: string)`: génère une action d'appui sur une touche
- `up(value: string)`: génère une action de relâchement d'une touche
- `pause(ms: number)`: indique qu'une source d'entrée ne fait rien pendant un instant particulier

#### Caractères spéciaux

Si vous souhaitez utiliser des caractères spéciaux comme `Control`, `Page Up` ou `Shift`, assurez-vous d'importer
l'objet [`Key`](https://github.com/webdriverio/webdriverio/blob/main/packages/webdriverio/src/constants.ts#L352-L417)
depuis le package `webdriverio` comme ceci:

```ts
import { Key } from 'webdriverio'
```

Cet objet vous permet d'accéder à la représentation unicode du caractère spécial souhaité.

### Source d'entrée pointeur

Une source d'entrée pointeur est une source d'entrée associée à un périphérique de type pointeur. Le type peut être
spécifié lors de l'invocation de la commande `action`, par exemple:

```ts
browser.action('pointer', {
    parameters: { pointerType: 'mouse' } // "mouse" est la valeur par défaut, aussi possible: "pen" ou "touch"
})
```

Cela renvoie un objet `PointerAction` qui prend en charge les actions suivantes:

- `down (button: 'left' | 'middle' | 'right')`: crée une action pour appuyer sur un seul bouton
- `down (params: PointerActionParams)`: crée une action pour appuyer sur un seul bouton avec des paramètres détaillés
- `move (x: number, y: number)`: crée une action pour déplacer le pointeur de `x` et `y` pixels depuis la fenêtre d'affichage
- `move (params: PointerActionMoveParams)`: crée une action pour déplacer le pointeur de `x` et `y` pixels depuis
  l'`origin` spécifiée. L'`origin` peut être définie comme la position actuelle du pointeur (ex: "pointer"), la fenêtre d'affichage
  (ex: "viewport") ou le centre d'un élément spécifique.
- `up (button: 'left' | 'middle' | 'right')`: crée une action pour relâcher un seul bouton
- `up (params: PointerActionUpParams)`: crée une action pour relâcher un seul bouton avec des paramètres détaillés
- `cancel()`: une action qui annule l'entrée actuelle de ce pointeur.
- `pause(ms: number)`: indique qu'une source d'entrée ne fait rien pendant un instant particulier

Vous pouvez trouver des informations détaillées sur les types de paramètres [`PointerActionParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L35), [`PointerActionMoveParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L20-L42) et [`PointerActionUpParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/pointer.ts#L13-L19)
dans la définition de type du projet.

### Source d'entrée molette

Une source d'entrée molette est une source d'entrée associée à un périphérique de type molette.

```ts
browser.action('wheel')
```

Cela renvoie un objet `WheelAction` qui prend en charge les actions suivantes:

- `scroll (params: ScrollParams)`: fait défiler une page vers des coordonnées ou une origine données
- `pause(ms: number)`: indique qu'une source d'entrée ne fait rien pendant un instant particulier

Vous pouvez trouver des informations détaillées sur le type de paramètre [`ScrollParams`](https://github.com/webdriverio/webdriverio/blob/8ca026c75bf7c27ef9d574f0ec48d8bc13658602/packages/webdriverio/src/utils/actions/wheel.ts#L4-L29) dans la définition de type du projet.

##### Utilisation

```js
browser.action()
```

##### Exemples

```js title="pointer-action.js"
it('drag and drop using pointer action command', async () => {
    const origin = await $('#source')
    const targetOrigin = await $('#target')

    return browser.action('pointer')
        .move({ duration: 0, origin, x: 0, y: 0 })
        .down({ button: 0 }) // left button
        .pause(10)
        .move({ duration: 0, origin: targetOrigin })
        .up({ button: 0 })
        .perform()
});
```

```js title="key-action.js"
import { Key } from 'webdriverio'

it('should emit key events using key action commands', async () => {
    const elem = await $('input')
    await elem.click() // make element active

    await browser.action('key')
        .down('f')
        .down('o')
        .down('o')
        .up('f')
        .up('o')
        .up('o')
        .perform()

    console.log(await elem.getValue()) // returns "foo"

    // copy value out of input element
    await browser.action('key')
        .down(Key.Ctrl).down('c')
        .pause(10)
        .up(Key.Ctrl).up('c')
        .perform()
})
```

```js title="wheel-action.js"
it('should scroll using wheel action commands', async () => {
    console.log(await browser.execute(() => window.scrollY)) // returns 0
    await browser.action('wheel').scroll({
        deltaX: 0,
        deltaY: 500,
        duration: 200
    }).perform()
    console.log(await browser.execute(() => window.scrollY)) // returns 500
})
```