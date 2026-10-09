---
id: methods
title: Metodi
description: "Usa i metodi save e check del servizio visivo per acquisire screenshot e confrontare schermate, elementi e pagine intere con le baseline."
---

I seguenti metodi vengono aggiunti all'oggetto globale WebdriverIO [`browser`](/docs/api/browser).

## Metodi di salvataggio

:::info SUGGERIMENTO
Usa i metodi di salvataggio solo quando **non** vuoi confrontare le schermate, ma desideri solo ottenere uno screenshot di un elemento o della schermata.
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

- Browser desktop
- Browser mobile
- App ibride mobile
- App native mobile

#### Parametri

-   **`element`:**
    -   **Obbligatorio:** Sì
    -   **Tipo:** WebdriverIO Element
-   **`tag`:**
    -   **Obbligatorio:** Sì
    -   **Tipo:** string
-   **`saveElementOptions`:**
    -   **Obbligatorio:** No
    -   **Tipo:** un oggetto di opzioni, vedi [Opzioni di salvataggio](./method-options#save-options)

#### Output:

Vedi la pagina [Output dei test](./test-output#savescreenelementfullpagescreen).

### `saveScreen`

Salva un'immagine del viewport.

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

- Browser desktop
- Browser mobile
- App ibride mobile
- App native mobile

#### Parametri
-   **`tag`:**
    -   **Obbligatorio:** Sì
    -   **Tipo:** string
-   **`saveScreenOptions`:**
    -   **Obbligatorio:** No
    -   **Tipo:** un oggetto di opzioni, vedi [Opzioni di salvataggio](./method-options#save-options)

#### Output:

Vedi la pagina [Output dei test](./test-output#savescreenelementfullpagescreen).

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

- Browser desktop
- Browser mobile

#### Parametri
-   **`tag`:**
    -   **Obbligatorio:** Sì
    -   **Tipo:** string
-   **`saveFullPageScreenOptions`:**
    -   **Obbligatorio:** No
    -   **Tipo:** un oggetto di opzioni, vedi [Opzioni di salvataggio](./method-options#save-options)

#### Output:

Vedi la pagina [Output dei test](./test-output#savescreenelementfullpagescreen).

### `saveTabbablePage`

Salva un'immagine della schermata completa con le linee e i punti degli elementi raggiungibili tramite tabulazione.

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

- Browser desktop

#### Parametri
-   **`tag`:**
    -   **Obbligatorio:** Sì
    -   **Tipo:** string
-   **`saveTabbableOptions`:**
    -   **Obbligatorio:** No
    -   **Tipo:** un oggetto di opzioni, vedi [Opzioni di salvataggio](./method-options#save-options)

#### Output:

Vedi la pagina [Output dei test](./test-output#savescreenelementfullpagescreen).

## Metodi di verifica

:::info SUGGERIMENTO
Quando i metodi `check` vengono utilizzati per la prima volta, vedrai il seguente avviso nei log. Ciò significa che non è necessario combinare i metodi `save` e `check` se vuoi creare la tua baseline.

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

Confronta un'immagine di un elemento con un'immagine baseline.

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

- Browser desktop
- Browser mobile
- App ibride mobile
- App native mobile

#### Parametri
-   **`element`:**
    -   **Obbligatorio:** Sì
    -   **Tipo:** WebdriverIO Element
-   **`tag`:**
    -   **Obbligatorio:** Sì
    -   **Tipo:** string
-   **`checkElementOptions`:**
    -   **Obbligatorio:** No
    -   **Tipo:** un oggetto di opzioni, vedi [Opzioni di confronto/verifica](./method-options#compare-check-options)

#### Output:

Vedi la pagina [Output dei test](./test-output#checkscreenelementfullpagescreen).

### `checkScreen`

Confronta un'immagine del viewport con un'immagine baseline.

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

- Browser desktop
- Browser mobile
- App ibride mobile
- App native mobile

#### Parametri
-   **`tag`:**
    -   **Obbligatorio:** Sì
    -   **Tipo:** string
-   **`checkScreenOptions`:**
    -   **Obbligatorio:** No
    -   **Tipo:** un oggetto di opzioni, vedi [Opzioni di confronto/verifica](./method-options#compare-check-options)

#### Output:

Vedi la pagina [Output dei test](./test-output#checkscreenelementfullpagescreen).

### `checkFullPageScreen`

Confronta un'immagine della schermata completa con un'immagine baseline.

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

- Browser desktop
- Browser mobile

#### Parametri
-   **`tag`:**
    -   **Obbligatorio:** Sì
    -   **Tipo:** string
-   **`checkFullPageOptions`:**
    -   **Obbligatorio:** No
    -   **Tipo:** un oggetto di opzioni, vedi [Opzioni di confronto/verifica](./method-options#compare-check-options)

#### Output:

Vedi la pagina [Output dei test](./test-output#checkscreenelementfullpagescreen).

### `checkTabbablePage`

Confronta un'immagine della schermata completa, con le linee e i punti degli elementi raggiungibili tramite tabulazione, con un'immagine baseline.

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

- Browser desktop

#### Parametri
-   **`tag`:**
    -   **Obbligatorio:** Sì
    -   **Tipo:** string
-   **`checkTabbableOptions`:**
    -   **Obbligatorio:** No
    -   **Tipo:** un oggetto di opzioni, vedi [Opzioni di confronto/verifica](./method-options#compare-check-options)

#### Output:

Vedi la pagina [Output dei test](./test-output#checkscreenelementfullpagescreen).