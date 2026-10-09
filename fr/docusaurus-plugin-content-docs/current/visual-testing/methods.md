---
id: methods
title: Méthodes
description: "Utilisez les méthodes save et check du service visuel pour capturer des captures d'écran et comparer des écrans, des éléments et des pages complètes à des images de référence."
---

Les méthodes suivantes sont ajoutées à l'objet global WebdriverIO [`browser`](/docs/api/browser).

## Méthodes de sauvegarde

:::info ASTUCE
N'utilisez les méthodes de sauvegarde que lorsque vous **ne** souhaitez **pas** comparer des écrans, mais seulement obtenir une capture d'écran ou une image d'un élément.
:::

### `saveElement`

Enregistre une image d'un élément.

#### Utilisation

```ts
await browser.saveElement(
    // élément
    await $('#element-selector'),
    // tag
    'your-reference',
    // saveElementOptions
    {
        // ...
    }
);
```

#### Support

- Navigateurs de bureau
- Navigateurs mobiles
- Applications mobiles hybrides
- Applications mobiles natives

#### Paramètres

-   **`element` :**
    -   **Obligatoire :** Oui
    -   **Type :** Élément WebdriverIO
-   **`tag` :**
    -   **Obligatoire :** Oui
    -   **Type :** string
-   **`saveElementOptions` :**
    -   **Obligatoire :** Non
    -   **Type :** un objet d'options, voir [Options de sauvegarde](./method-options#save-options)

#### Sortie :

Consultez la page [Sortie des tests](./test-output#savescreenelementfullpagescreen).

### `saveScreen`

Enregistre une image d'une zone d'affichage (viewport).

#### Utilisation

```ts
await browser.saveScreen(
    // tag
    'your-reference',
    // saveScreenOptions
    {
        // ...
    }
);
```

#### Support

- Navigateurs de bureau
- Navigateurs mobiles
- Applications mobiles hybrides
- Applications mobiles natives

#### Paramètres
-   **`tag` :**
    -   **Obligatoire :** Oui
    -   **Type :** string
-   **`saveScreenOptions` :**
    -   **Obligatoire :** Non
    -   **Type :** un objet d'options, voir [Options de sauvegarde](./method-options#save-options)

#### Sortie :

Consultez la page [Sortie des tests](./test-output#savescreenelementfullpagescreen).

### `saveFullPageScreen`

#### Utilisation

Enregistre une image de l'écran complet.

```ts
await browser.saveFullPageScreen(
    // tag
    'your-reference',
    // saveFullPageScreenOptions
    {
        // ...
    }
);
```

#### Support

- Navigateurs de bureau
- Navigateurs mobiles

#### Paramètres
-   **`tag` :**
    -   **Obligatoire :** Oui
    -   **Type :** string
-   **`saveFullPageScreenOptions` :**
    -   **Obligatoire :** Non
    -   **Type :** un objet d'options, voir [Options de sauvegarde](./method-options#save-options)

#### Sortie :

Consultez la page [Sortie des tests](./test-output#savescreenelementfullpagescreen).

### `saveTabbablePage`

Enregistre une image de l'écran complet avec les lignes et les points de tabulation.

#### Utilisation

```ts
await browser.saveTabbablePage(
    // tag
    'your-reference',
    // saveTabbableOptions
    {
        // ...
    }
);
```

#### Support

- Navigateurs de bureau

#### Paramètres
-   **`tag` :**
    -   **Obligatoire :** Oui
    -   **Type :** string
-   **`saveTabbableOptions` :**
    -   **Obligatoire :** Non
    -   **Type :** un objet d'options, voir [Options de sauvegarde](./method-options#save-options)

#### Sortie :

Consultez la page [Sortie des tests](./test-output#savescreenelementfullpagescreen).

## Méthodes de vérification

:::info ASTUCE
Lorsque les méthodes `check` sont utilisées pour la première fois, vous verrez l'avertissement ci-dessous dans les logs. Cela signifie que vous n'avez pas besoin de combiner les méthodes `save` et `check` si vous souhaitez créer votre image de référence.

```shell
#####################################################################################
 Baseline image not found, save the actual image manually to the baseline.
 The image can be found here:
 /Users/wswebcreation/project/.tmp/actual/desktop_chrome/examplePage-chrome-latest-1366x768.png
 If you want the module to auto save a non existing image to the baseline you
 can provide 'autoSaveBaseline: true' to the options.
#####################################################################################
```

:::

### `checkElement`

Compare une image d'un élément à une image de référence.

#### Utilisation

```ts
await browser.checkElement(
    // élément
    '#element-selector',
    // tag
    'your-reference',
    // checkElementOptions
    {
        // ...
    }
);
```

#### Support

- Navigateurs de bureau
- Navigateurs mobiles
- Applications mobiles hybrides
- Applications mobiles natives

#### Paramètres
-   **`element` :**
    -   **Obligatoire :** Oui
    -   **Type :** Élément WebdriverIO
-   **`tag` :**
    -   **Obligatoire :** Oui
    -   **Type :** string
-   **`checkElementOptions` :**
    -   **Obligatoire :** Non
    -   **Type :** un objet d'options, voir [Options de comparaison/vérification](./method-options#compare-check-options)

#### Sortie :

Consultez la page [Sortie des tests](./test-output#checkscreenelementfullpagescreen).

### `checkScreen`

Compare une image d'une zone d'affichage (viewport) à une image de référence.

#### Utilisation

```ts
await browser.checkScreen(
    // tag
    'your-reference',
    // checkScreenOptions
    {
        // ...
    }
);
```

#### Support

- Navigateurs de bureau
- Navigateurs mobiles
- Applications mobiles hybrides
- Applications mobiles natives

#### Paramètres
-   **`tag` :**
    -   **Obligatoire :** Oui
    -   **Type :** string
-   **`checkScreenOptions` :**
    -   **Obligatoire :** Non
    -   **Type :** un objet d'options, voir [Options de comparaison/vérification](./method-options#compare-check-options)

#### Sortie :

Consultez la page [Sortie des tests](./test-output#checkscreenelementfullpagescreen).

### `checkFullPageScreen`

Compare une image de l'écran complet à une image de référence.

#### Utilisation

```ts
await browser.checkFullPageScreen(
    // tag
    'your-reference',
    // checkFullPageOptions
    {
        // ...
    }
);
```

#### Support

- Navigateurs de bureau
- Navigateurs mobiles

#### Paramètres
-   **`tag` :**
    -   **Obligatoire :** Oui
    -   **Type :** string
-   **`checkFullPageOptions` :**
    -   **Obligatoire :** Non
    -   **Type :** un objet d'options, voir [Options de comparaison/vérification](./method-options#compare-check-options)

#### Sortie :

Consultez la page [Sortie des tests](./test-output#checkscreenelementfullpagescreen).

### `checkTabbablePage`

Compare une image de l'écran complet avec les lignes et les points de tabulation à une image de référence.

#### Utilisation

```ts
await browser.checkTabbablePage(
    // tag
    'your-reference',
    // checkTabbableOptions
    {
        // ...
    }
);
```

#### Support

- Navigateurs de bureau

#### Paramètres
-   **`tag` :**
    -   **Obligatoire :** Oui
    -   **Type :** string
-   **`checkTabbableOptions` :**
    -   **Obligatoire :** Non
    -   **Type :** un objet d'options, voir [Options de comparaison/vérification](./method-options#compare-check-options)

#### Sortie :

Consultez la page [Sortie des tests](./test-output#checkscreenelementfullpagescreen).