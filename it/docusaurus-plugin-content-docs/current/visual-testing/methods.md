---
id: methods
title: Metodi
---

I seguenti metodi vengono aggiunti all'oggetto globale WebdriverIO [`browser`](/docs/api/browser).

## Metodi di Salvataggio

:::info SUGGERIMENTO
Utilizza i Metodi di Salvataggio solo quando **non** vuoi confrontare schermate, ma vuoi solo avere uno screenshot di un elemento.
:::

### `saveElement`

Salva un'immagine di un elemento.

#### Utilizzo

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

#### Supporto

- Browser Desktop
- Browser Mobile
- App Ibride Mobile
- App Native Mobile

#### Parametri

-   **`element`:**
    -   **Obbligatorio:** Sì
    -   **Tipo:** Elemento WebdriverIO
-   **`tag`:**
    -   **Obbligatorio:** Sì
    -   **Tipo:** string
-   **`saveElementOptions`:**
    -   **Obbligatorio:** No
    -   **Tipo:** un oggetto di opzioni, vedi [Opzioni di Salvataggio](./method-options#save-options)

#### Output:

Vedi la pagina [Output dei Test](./test-output#savescreenelementfullpagescreen).

### `saveScreen`

Salva un'immagine di una viewport.

#### Utilizzo

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

#### Supporto

- Browser Desktop
- Browser Mobile
- App Ibride Mobile
- App Native Mobile

#### Parametri
-   **`tag`:**
    -   **Obbligatorio:** Sì
    -   **Tipo:** string
-   **`saveScreenOptions`:**
    -   **Obbligatorio:** No
    -   **Tipo:** un oggetto di opzioni, vedi [Opzioni di Salvataggio](./method-options#save-options)

#### Output:

Vedi la pagina [Output dei Test](./test-output#savescreenelementfullpagescreen).

### `saveFullPageScreen`

#### Utilizzo

Salva un'immagine della schermata completa.

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

#### Supporto

- Browser Desktop
- Browser Mobile

#### Parametri
-   **`tag`:**
    -   **Obbligatorio:** Sì
    -   **Tipo:** string
-   **`saveFullPageScreenOptions`:**
    -   **Obbligatorio:** No
    -   **Tipo:** un oggetto di opzioni, vedi [Opzioni di Salvataggio](./method-options#save-options)

#### Output:

Vedi la pagina [Output dei Test](./test-output#savescreenelementfullpagescreen).

### `saveTabbablePage`

Salva un'immagine della schermata completa con le linee e i punti tabbabili.

#### Utilizzo

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

#### Supporto

- Browser Desktop

#### Parametri
-   **`tag`:**
    -   **Obbligatorio:** Sì
    -   **Tipo:** string
-   **`saveTabbableOptions`:**
    -   **Obbligatorio:** No
    -   **Tipo:** un oggetto di opzioni, vedi [Opzioni di Salvataggio](./method-options#save-options)

#### Output:

Vedi la pagina [Output dei Test](./test-output#savescreenelementfullpagescreen).

## Metodi di Verifica

:::info SUGGERIMENTO
Quando i metodi `check` vengono utilizzati per la prima volta, vedrai l'avviso seguente nei log. Questo significa che non è necessario combinare i metodi `save` e `check` se si desidera creare la propria baseline.

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

Confronta l'immagine di un elemento con un'immagine di riferimento.

#### Utilizzo

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

#### Supporto

- Browser Desktop
- Browser Mobile
- App Ibride Mobile
- App Native Mobile

#### Parametri
-   **`element`:**
    -   **Obbligatorio:** Sì
    -   **Tipo:** Elemento WebdriverIO
-   **`tag`:**
    -   **Obbligatorio:** Sì
    -   **Tipo:** string
-   **`checkElementOptions`:**
    -   **Obbligatorio:** No
    -   **Tipo:** un oggetto di opzioni, vedi [Opzioni di Confronto/Verifica](./method-options#compare-check-options)

#### Output:

Vedi la pagina [Output dei Test](./test-output#checkscreenelementfullpagescreen).

### `checkScreen`

Confronta l'immagine di una viewport con un'immagine di riferimento.

#### Utilizzo

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

#### Supporto

- Browser Desktop
- Browser Mobile
- App Ibride Mobile
- App Native Mobile

#### Parametri
-   **`tag`:**
    -   **Obbligatorio:** Sì
    -   **Tipo:** string
-   **`checkScreenOptions`:**
    -   **Obbligatorio:** No
    -   **Tipo:** un oggetto di opzioni, vedi [Opzioni di Confronto/Verifica](./method-options#compare-check-options)

#### Output:

Vedi la pagina [Output dei Test](./test-output#checkscreenelementfullpagescreen).

### `checkFullPageScreen`

Confronta l'immagine della schermata completa con un'immagine di riferimento.

#### Utilizzo

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

#### Supporto

- Browser Desktop
- Browser Mobile

#### Parametri
-   **`tag`:**
    -   **Obbligatorio:** Sì
    -   **Tipo:** string
-   **`checkFullPageOptions`:**
    -   **Obbligatorio:** No
    -   **Tipo:** un oggetto di opzioni, vedi [Opzioni di Confronto/Verifica](./method-options#compare-check-options)

#### Output:

Vedi la pagina [Output dei Test](./test-output#checkscreenelementfullpagescreen).

### `checkTabbablePage`

Confronta l'immagine della schermata completa con le linee e i punti tabbabili con un'immagine di riferimento.

#### Utilizzo

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

#### Supporto

- Browser Desktop

#### Parametri
-   **`tag`:**
    -   **Obbligatorio:** Sì
    -   **Tipo:** string
-   **`checkTabbableOptions`:**
    -   **Obbligatorio:** No
    -   **Tipo:** un oggetto di opzioni, vedi [Opzioni di Confronto/Verifica](./method-options#compare-check-options)

#### Output:

Vedi la pagina [Output dei Test](./test-output#checkscreenelementfullpagescreen).