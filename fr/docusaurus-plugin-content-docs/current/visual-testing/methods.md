---
id: methods
title: Méthodes
---

Les méthodes suivantes sont ajoutées à l'objet global WebdriverIO [`browser`](/docs/api/browser).

## Méthodes de sauvegarde

:::info CONSEIL
Utilisez les méthodes de sauvegarde uniquement lorsque vous **ne souhaitez pas** comparer des écrans, mais que vous voulez simplement avoir une capture d'écran d'un élément.
:::

### `saveElement`

Enregistre une image d'un élément.

#### Utilisation

```ts
await browser.saveElement(
    // element
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
- Applications hybrides mobiles
- Applications natives mobiles

#### Paramètres

-   **`element`:**
    -   **Obligatoire:** Oui
    -   **Type:** Élément WebdriverIO
-   **`tag`:**
    -   **Obligatoire:** Oui
    -   **Type:** string
-   **`saveElementOptions`:**
    -   **Obligatoire:** Non
    -   **Type:** un objet d'options, voir [Options de sauvegarde](./method-options#save-options)

#### Sortie:

Voir la page [Sortie de test](./test-output#savescreenelementfullpagescreen).

### `saveScreen`

Enregistre une image d'une fenêtre d'affichage.

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
- Applications hybrides mobiles
- Applications natives mobiles

#### Paramètres
-   **`tag`:**
    -   **Obligatoire:** Oui
    -   **Type:** string
-   **`saveScreenOptions`:**
    -   **Obligatoire:** Non
    -   **Type:** un objet d'options, voir [Options de sauvegarde](./method-options#save-options)

#### Sortie:

Voir la page [Sortie de test](./test-output#savescreenelementfullpagescreen).

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
-   **`tag`:**
    -   **Obligatoire:** Oui
    -   **Type:** string
-   **`saveFullPageScreenOptions`:**
    -   **Obligatoire:** Non
    -   **Type:** un objet d'options, voir [Options de sauvegarde](./method-options#save-options)

#### Sortie:

Voir la page [Sortie de test](./test-output#savescreenelementfullpagescreen).

### `saveTabbablePage`

Enregistre une image de l'écran complet avec les lignes et points tabulables.

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
-   **`tag`:**
    -   **Obligatoire:** Oui
    -   **Type:** string
-   **`saveTabbableOptions`:**
    -   **Obligatoire:** Non
    -   **Type:** un objet d'options, voir [Options de sauvegarde](./method-options#save-options)

#### Sortie:

Voir la page [Sortie de test](./test-output#savescreenelementfullpagescreen).

## Méthodes de vérification

:::info CONSEIL
Lorsque les méthodes `check` sont utilisées pour la première fois, vous verrez l'avertissement ci-dessous dans les journaux. Cela signifie que vous n'avez pas besoin de combiner les méthodes `save` et `check` si vous souhaitez créer votre référence.

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
    // element
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
- Applications hybrides mobiles
- Applications natives mobiles

#### Paramètres
-   **`element`:**
    -   **Obligatoire:** Oui
    -   **Type:** Élément WebdriverIO
-   **`tag`:**
    -   **Obligatoire:** Oui
    -   **Type:** string
-   **`checkElementOptions`:**
    -   **Obligatoire:** Non
    -   **Type:** un objet d'options, voir [Options de comparaison/vérification](./method-options#compare-check-options)

#### Sortie:

Voir la page [Sortie de test](./test-output#checkscreenelementfullpagescreen).

### `checkScreen`

Compare une image d'une fenêtre d'affichage à une image de référence.

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
- Applications hybrides mobiles
- Applications natives mobiles

#### Paramètres
-   **`tag`:**
    -   **Obligatoire:** Oui
    -   **Type:** string
-   **`checkScreenOptions`:**
    -   **Obligatoire:** Non
    -   **Type:** un objet d'options, voir [Options de comparaison/vérification](./method-options#compare-check-options)

#### Sortie:

Voir la page [Sortie de test](./test-output#checkscreenelementfullpagescreen).

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
-   **`tag`:**
    -   **Obligatoire:** Oui
    -   **Type:** string
-   **`checkFullPageOptions`:**
    -   **Obligatoire:** Non
    -   **Type:** un objet d'options, voir [Options de comparaison/vérification](./method-options#compare-check-options)

#### Sortie:

Voir la page [Sortie de test](./test-output#checkscreenelementfullpagescreen).

### `checkTabbablePage`

Compare une image de l'écran complet avec les lignes et points tabulables à une image de référence.

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
-   **`tag`:**
    -   **Obligatoire:** Oui
    -   **Type:** string
-   **`checkTabbableOptions`:**
    -   **Obligatoire:** Non
    -   **Type:** un objet d'options, voir [Options de comparaison/vérification](./method-options#compare-check-options)

#### Sortie:

Voir la page [Sortie de test](./test-output#checkscreenelementfullpagescreen).