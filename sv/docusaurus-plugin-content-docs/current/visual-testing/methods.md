---
id: methods
title: Metoder
---

Följande metoder läggs till i det globala WebdriverIO [`browser`](/docs/api/browser)-objektet.

## Sparmetoder

:::info TIPS
Använd endast Sparmetoderna när du **inte** vill jämföra skärmar, utan bara vill ha en element-/skärmbild.
:::

### `saveElement`

Sparar en bild av ett element.

#### Användning

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

#### Stöd

- Desktop-webbläsare
- Mobila webbläsare
- Mobila hybridappar
- Mobila nativa appar

#### Parametrar

-   **`element`:**
    -   **Obligatorisk:** Ja
    -   **Typ:** WebdriverIO Element
-   **`tag`:**
    -   **Obligatorisk:** Ja
    -   **Typ:** string
-   **`saveElementOptions`:**
    -   **Obligatorisk:** Nej
    -   **Typ:** ett objekt med alternativ, se [Spara alternativ](./method-options#save-options)

#### Output:

Se sidan [Testresultat](./test-output#savescreenelementfullpagescreen).

### `saveScreen`

Sparar en bild av en viewport.

#### Användning

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

#### Stöd

- Desktop-webbläsare
- Mobila webbläsare
- Mobila hybridappar
- Mobila nativa appar

#### Parametrar
-   **`tag`:**
    -   **Obligatorisk:** Ja
    -   **Typ:** string
-   **`saveScreenOptions`:**
    -   **Obligatorisk:** Nej
    -   **Typ:** ett objekt med alternativ, se [Spara alternativ](./method-options#save-options)

#### Output:

Se sidan [Testresultat](./test-output#savescreenelementfullpagescreen).

### `saveFullPageScreen`

#### Användning

Sparar en bild av hela skärmen.

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

#### Stöd

- Desktop-webbläsare
- Mobila webbläsare

#### Parametrar
-   **`tag`:**
    -   **Obligatorisk:** Ja
    -   **Typ:** string
-   **`saveFullPageScreenOptions`:**
    -   **Obligatorisk:** Nej
    -   **Typ:** ett objekt med alternativ, se [Spara alternativ](./method-options#save-options)

#### Output:

Se sidan [Testresultat](./test-output#savescreenelementfullpagescreen).

### `saveTabbablePage`

Sparar en bild av hela skärmen med tabbningsbara linjer och punkter.

#### Användning

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

#### Stöd

- Desktop-webbläsare

#### Parametrar
-   **`tag`:**
    -   **Obligatorisk:** Ja
    -   **Typ:** string
-   **`saveTabbableOptions`:**
    -   **Obligatorisk:** Nej
    -   **Typ:** ett objekt med alternativ, se [Spara alternativ](./method-options#save-options)

#### Output:

Se sidan [Testresultat](./test-output#savescreenelementfullpagescreen).

## Kontrollmetoder

:::info TIPS
När `check`-metoderna används för första gången kommer du att se varningen nedan i loggarna. Detta betyder att du inte behöver kombinera `save`- och `check`-metoderna om du vill skapa din baslinje.

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

Jämför en bild av ett element mot en baslinjesbild.

#### Användning

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

#### Stöd

- Desktop-webbläsare
- Mobila webbläsare
- Mobila hybridappar
- Mobila nativa appar

#### Parametrar
-   **`element`:**
    -   **Obligatorisk:** Ja
    -   **Typ:** WebdriverIO Element
-   **`tag`:**
    -   **Obligatorisk:** Ja
    -   **Typ:** string
-   **`checkElementOptions`:**
    -   **Obligatorisk:** Nej
    -   **Typ:** ett objekt med alternativ, se [Jämför/Kontrollera alternativ](./method-options#compare-check-options)

#### Output:

Se sidan [Testresultat](./test-output#checkscreenelementfullpagescreen).

### `checkScreen`

Jämför en bild av en viewport mot en baslinjesbild.

#### Användning

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

#### Stöd

- Desktop-webbläsare
- Mobila webbläsare
- Mobila hybridappar
- Mobila nativa appar

#### Parametrar
-   **`tag`:**
    -   **Obligatorisk:** Ja
    -   **Typ:** string
-   **`checkScreenOptions`:**
    -   **Obligatorisk:** Nej
    -   **Typ:** ett objekt med alternativ, se [Jämför/Kontrollera alternativ](./method-options#compare-check-options)

#### Output:

Se sidan [Testresultat](./test-output#checkscreenelementfullpagescreen).

### `checkFullPageScreen`

Jämför en bild av hela skärmen mot en baslinjesbild.

#### Användning

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

#### Stöd

- Desktop-webbläsare
- Mobila webbläsare

#### Parametrar
-   **`tag`:**
    -   **Obligatorisk:** Ja
    -   **Typ:** string
-   **`checkFullPageOptions`:**
    -   **Obligatorisk:** Nej
    -   **Typ:** ett objekt med alternativ, se [Jämför/Kontrollera alternativ](./method-options#compare-check-options)

#### Output:

Se sidan [Testresultat](./test-output#checkscreenelementfullpagescreen).

### `checkTabbablePage`

Jämför en bild av hela skärmen med tabbningsbara linjer och punkter mot en baslinjesbild.

#### Användning

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

#### Stöd

- Desktop-webbläsare

#### Parametrar
-   **`tag`:**
    -   **Obligatorisk:** Ja
    -   **Typ:** string
-   **`checkTabbableOptions`:**
    -   **Obligatorisk:** Nej
    -   **Typ:** ett objekt med alternativ, se [Jämför/Kontrollera alternativ](./method-options#compare-check-options)

#### Output:

Se sidan [Testresultat](./test-output#checkscreenelementfullpagescreen).