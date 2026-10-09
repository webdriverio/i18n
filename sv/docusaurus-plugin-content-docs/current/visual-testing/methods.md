---
id: methods
title: Metoder
description: "Använd save- och check-metoderna i den visuella tjänsten för att ta skärmdumpar och jämföra skärmar, element och helsidor mot baslinjer."
---

Följande metoder läggs till i det globala WebdriverIO-objektet [`browser`](/docs/api/browser).

## Save-metoder

:::info TIPS
Använd endast Save-metoderna när du **inte** vill jämföra skärmar, utan bara vill ha en element-/skärmdump.
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

- Webbläsare för dator
- Mobila webbläsare
- Mobila hybridappar
- Mobila native-appar

#### Parametrar

-   **`element`:**
    -   **Obligatorisk:** Ja
    -   **Typ:** WebdriverIO Element
-   **`tag`:**
    -   **Obligatorisk:** Ja
    -   **Typ:** string
-   **`saveElementOptions`:**
    -   **Obligatorisk:** Nej
    -   **Typ:** ett objekt med alternativ, se [Save-alternativ](./method-options#save-options)

#### Utdata:

Se sidan [Testutdata](./test-output#savescreenelementfullpagescreen).

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

- Webbläsare för dator
- Mobila webbläsare
- Mobila hybridappar
- Mobila native-appar

#### Parametrar
-   **`tag`:**
    -   **Obligatorisk:** Ja
    -   **Typ:** string
-   **`saveScreenOptions`:**
    -   **Obligatorisk:** Nej
    -   **Typ:** ett objekt med alternativ, se [Save-alternativ](./method-options#save-options)

#### Utdata:

Se sidan [Testutdata](./test-output#savescreenelementfullpagescreen).

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

- Webbläsare för dator
- Mobila webbläsare

#### Parametrar
-   **`tag`:**
    -   **Obligatorisk:** Ja
    -   **Typ:** string
-   **`saveFullPageScreenOptions`:**
    -   **Obligatorisk:** Nej
    -   **Typ:** ett objekt med alternativ, se [Save-alternativ](./method-options#save-options)

#### Utdata:

Se sidan [Testutdata](./test-output#savescreenelementfullpagescreen).

### `saveTabbablePage`

Sparar en bild av hela skärmen med tabbningslinjerna och punkterna.

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

- Webbläsare för dator

#### Parametrar
-   **`tag`:**
    -   **Obligatorisk:** Ja
    -   **Typ:** string
-   **`saveTabbableOptions`:**
    -   **Obligatorisk:** Nej
    -   **Typ:** ett objekt med alternativ, se [Save-alternativ](./method-options#save-options)

#### Utdata:

Se sidan [Testutdata](./test-output#savescreenelementfullpagescreen).

## Check-metoder

:::info TIPS
När `check`-metoderna används för första gången kommer du att se varningen nedan i loggarna. Det innebär att du inte behöver kombinera `save`- och `check`-metoderna om du vill skapa din baslinje.

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

Jämför en bild av ett element mot en baslinjebild.

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

- Webbläsare för dator
- Mobila webbläsare
- Mobila hybridappar
- Mobila native-appar

#### Parametrar
-   **`element`:**
    -   **Obligatorisk:** Ja
    -   **Typ:** WebdriverIO Element
-   **`tag`:**
    -   **Obligatorisk:** Ja
    -   **Typ:** string
-   **`checkElementOptions`:**
    -   **Obligatorisk:** Nej
    -   **Typ:** ett objekt med alternativ, se [Compare/Check-alternativ](./method-options#compare-check-options)

#### Utdata:

Se sidan [Testutdata](./test-output#checkscreenelementfullpagescreen).

### `checkScreen`

Jämför en bild av en viewport mot en baslinjebild.

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

- Webbläsare för dator
- Mobila webbläsare
- Mobila hybridappar
- Mobila native-appar

#### Parametrar
-   **`tag`:**
    -   **Obligatorisk:** Ja
    -   **Typ:** string
-   **`checkScreenOptions`:**
    -   **Obligatorisk:** Nej
    -   **Typ:** ett objekt med alternativ, se [Compare/Check-alternativ](./method-options#compare-check-options)

#### Utdata:

Se sidan [Testutdata](./test-output#checkscreenelementfullpagescreen).

### `checkFullPageScreen`

Jämför en bild av hela skärmen mot en baslinjebild.

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

- Webbläsare för dator
- Mobila webbläsare

#### Parametrar
-   **`tag`:**
    -   **Obligatorisk:** Ja
    -   **Typ:** string
-   **`checkFullPageOptions`:**
    -   **Obligatorisk:** Nej
    -   **Typ:** ett objekt med alternativ, se [Compare/Check-alternativ](./method-options#compare-check-options)

#### Utdata:

Se sidan [Testutdata](./test-output#checkscreenelementfullpagescreen).

### `checkTabbablePage`

Jämför en bild av hela skärmen med tabbningslinjerna och punkterna mot en baslinjebild.

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

- Webbläsare för dator

#### Parametrar
-   **`tag`:**
    -   **Obligatorisk:** Ja
    -   **Typ:** string
-   **`checkTabbableOptions`:**
    -   **Obligatorisk:** Nej
    -   **Typ:** ett objekt med alternativ, se [Compare/Check-alternativ](./method-options#compare-check-options)

#### Utdata:

Se sidan [Testutdata](./test-output#checkscreenelementfullpagescreen).