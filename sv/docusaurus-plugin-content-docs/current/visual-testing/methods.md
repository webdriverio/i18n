---
id: methods
title: Metoder
---

Följande metoder läggs till i det globala WebdriverIO [`browser`](/docs/api/browser)-objektet.

## Sparmetoder

:::info TIPS
Använd endast sparmetoderna när du **inte** vill jämföra skärmar, utan bara vill ha en element-/skärmbild.
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

#### Support

- Desktop Browsers
- Mobile Browsers
- Mobile Hybrid Apps
- Mobile Native Apps

#### Parametrar

-   **`element`:**
    -   **Obligatoriskt:** Ja
    -   **Typ:** WebdriverIO Element
-   **`tag`:**
    -   **Obligatoriskt:** Ja
    -   **Typ:** string
-   **`saveElementOptions`:**
    -   **Obligatoriskt:** Nej
    -   **Typ:** ett objekt med alternativ, se [Spara-alternativ](./method-options#save-options)

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

#### Support

- Desktop Browsers
- Mobile Browsers
- Mobile Hybrid Apps
- Mobile Native Apps

#### Parametrar
-   **`tag`:**
    -   **Obligatoriskt:** Ja
    -   **Typ:** string
-   **`saveScreenOptions`:**
    -   **Obligatoriskt:** Nej
    -   **Typ:** ett objekt med alternativ, se [Spara-alternativ](./method-options#save-options)

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

#### Support

- Desktop Browsers
- Mobile Browsers

#### Parametrar
-   **`tag`:**
    -   **Obligatoriskt:** Ja
    -   **Typ:** string
-   **`saveFullPageScreenOptions`:**
    -   **Obligatoriskt:** Nej
    -   **Typ:** ett objekt med alternativ, se [Spara-alternativ](./method-options#save-options)

#### Utdata:

Se sidan [Testutdata](./test-output#savescreenelementfullpagescreen).

### `saveTabbablePage`

Sparar en bild av hela skärmen med tabbara linjer och punkter.

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

#### Support

- Desktop Browsers

#### Parametrar
-   **`tag`:**
    -   **Obligatoriskt:** Ja
    -   **Typ:** string
-   **`saveTabbableOptions`:**
    -   **Obligatoriskt:** Nej
    -   **Typ:** ett objekt med alternativ, se [Spara-alternativ](./method-options#save-options)

#### Utdata:

Se sidan [Testutdata](./test-output#savescreenelementfullpagescreen).

## Kontrollmetoder

:::info TIPS
När `check`-metoderna används för första gången kommer du att se varningen nedan i loggarna. Detta betyder att du inte behöver kombinera `save`- och `check`-metoderna om du vill skapa din baseline.

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

Jämför en bild av ett element mot en baseline-bild.

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

#### Support

- Desktop Browsers
- Mobile Browsers
- Mobile Hybrid Apps
- Mobile Native Apps

#### Parametrar
-   **`element`:**
    -   **Obligatoriskt:** Ja
    -   **Typ:** WebdriverIO Element
-   **`tag`:**
    -   **Obligatoriskt:** Ja
    -   **Typ:** string
-   **`checkElementOptions`:**
    -   **Obligatoriskt:** Nej
    -   **Typ:** ett objekt med alternativ, se [Jämför/Kontrollera-alternativ](./method-options#compare-check-options)

#### Utdata:

Se sidan [Testutdata](./test-output#checkscreenelementfullpagescreen).

### `checkScreen`

Jämför en bild av en viewport mot en baseline-bild.

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

#### Support

- Desktop Browsers
- Mobile Browsers
- Mobile Hybrid Apps
- Mobile Native Apps

#### Parametrar
-   **`tag`:**
    -   **Obligatoriskt:** Ja
    -   **Typ:** string
-   **`checkScreenOptions`:**
    -   **Obligatoriskt:** Nej
    -   **Typ:** ett objekt med alternativ, se [Jämför/Kontrollera-alternativ](./method-options#compare-check-options)

#### Utdata:

Se sidan [Testutdata](./test-output#checkscreenelementfullpagescreen).

### `checkFullPageScreen`

Jämför en bild av hela skärmen mot en baseline-bild.

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

#### Support

- Desktop Browsers
- Mobile Browsers

#### Parametrar
-   **`tag`:**
    -   **Obligatoriskt:** Ja
    -   **Typ:** string
-   **`checkFullPageOptions`:**
    -   **Obligatoriskt:** Nej
    -   **Typ:** ett objekt med alternativ, se [Jämför/Kontrollera-alternativ](./method-options#compare-check-options)

#### Utdata:

Se sidan [Testutdata](./test-output#checkscreenelementfullpagescreen).

### `checkTabbablePage`

Jämför en bild av hela skärmen med tabbara linjer och punkter mot en baseline-bild.

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

#### Support

- Desktop Browsers

#### Parametrar
-   **`tag`:**
    -   **Obligatoriskt:** Ja
    -   **Typ:** string
-   **`checkTabbableOptions`:**
    -   **Obligatoriskt:** Nej
    -   **Typ:** ett objekt med alternativ, se [Jämför/Kontrollera-alternativ](./method-options#compare-check-options)

#### Utdata:

Se sidan [Testutdata](./test-output#checkscreenelementfullpagescreen).