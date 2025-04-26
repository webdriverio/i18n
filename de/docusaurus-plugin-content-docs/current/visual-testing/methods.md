---
id: methods
title: Methoden
---

Die folgenden Methoden werden dem globalen WebdriverIO [`browser`](/docs/api/browser)-Objekt hinzugefügt.

## Speichermethoden

:::info TIPP
Verwenden Sie die Speichermethoden nur, wenn Sie Bildschirme **nicht** vergleichen möchten, sondern nur ein Element-/Screenshot haben möchten.
:::

### `saveElement`

Speichert ein Bild eines Elements.

#### Verwendung

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

#### Unterstützung

- Desktop-Browser
- Mobile Browser
- Mobile Hybrid Apps
- Mobile Native Apps

#### Parameter

-   **`element`:**
    -   **Pflichtfeld:** Ja
    -   **Typ:** WebdriverIO Element
-   **`tag`:**
    -   **Pflichtfeld:** Ja
    -   **Typ:** string
-   **`saveElementOptions`:**
    -   **Pflichtfeld:** Nein
    -   **Typ:** ein Objekt mit Optionen, siehe [Speicheroptionen](./method-options#save-options)

#### Ausgabe:

Siehe die Seite [Testausgabe](./test-output#savescreenelementfullpagescreen).

### `saveScreen`

Speichert ein Bild eines Viewports.

#### Verwendung

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

#### Unterstützung

- Desktop-Browser
- Mobile Browser
- Mobile Hybrid Apps
- Mobile Native Apps

#### Parameter
-   **`tag`:**
    -   **Pflichtfeld:** Ja
    -   **Typ:** string
-   **`saveScreenOptions`:**
    -   **Pflichtfeld:** Nein
    -   **Typ:** ein Objekt mit Optionen, siehe [Speicheroptionen](./method-options#save-options)

#### Ausgabe:

Siehe die Seite [Testausgabe](./test-output#savescreenelementfullpagescreen).

### `saveFullPageScreen`

#### Verwendung

Speichert ein Bild des kompletten Bildschirms.

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

#### Unterstützung

- Desktop-Browser
- Mobile Browser

#### Parameter
-   **`tag`:**
    -   **Pflichtfeld:** Ja
    -   **Typ:** string
-   **`saveFullPageScreenOptions`:**
    -   **Pflichtfeld:** Nein
    -   **Typ:** ein Objekt mit Optionen, siehe [Speicheroptionen](./method-options#save-options)

#### Ausgabe:

Siehe die Seite [Testausgabe](./test-output#savescreenelementfullpagescreen).

### `saveTabbablePage`

Speichert ein Bild des kompletten Bildschirms mit den tabulierbaren Linien und Punkten.

#### Verwendung

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

#### Unterstützung

- Desktop-Browser

#### Parameter
-   **`tag`:**
    -   **Pflichtfeld:** Ja
    -   **Typ:** string
-   **`saveTabbableOptions`:**
    -   **Pflichtfeld:** Nein
    -   **Typ:** ein Objekt mit Optionen, siehe [Speicheroptionen](./method-options#save-options)

#### Ausgabe:

Siehe die Seite [Testausgabe](./test-output#savescreenelementfullpagescreen).

## Prüfmethoden

:::info TIPP
Wenn die `check`-Methoden zum ersten Mal verwendet werden, sehen Sie die folgende Warnung in den Logs. Dies bedeutet, dass Sie die `save`- und `check`-Methoden nicht kombinieren müssen, wenn Sie Ihre Baseline erstellen möchten.

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

Vergleicht ein Bild eines Elements mit einem Baseline-Bild.

#### Verwendung

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

#### Unterstützung

- Desktop-Browser
- Mobile Browser
- Mobile Hybrid Apps
- Mobile Native Apps

#### Parameter
-   **`element`:**
    -   **Pflichtfeld:** Ja
    -   **Typ:** WebdriverIO Element
-   **`tag`:**
    -   **Pflichtfeld:** Ja
    -   **Typ:** string
-   **`checkElementOptions`:**
    -   **Pflichtfeld:** Nein
    -   **Typ:** ein Objekt mit Optionen, siehe [Vergleichs-/Prüfoptionen](./method-options#compare-check-options)

#### Ausgabe:

Siehe die Seite [Testausgabe](./test-output#checkscreenelementfullpagescreen).

### `checkScreen`

Vergleicht ein Bild eines Viewports mit einem Baseline-Bild.

#### Verwendung

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

#### Unterstützung

- Desktop-Browser
- Mobile Browser
- Mobile Hybrid Apps
- Mobile Native Apps

#### Parameter
-   **`tag`:**
    -   **Pflichtfeld:** Ja
    -   **Typ:** string
-   **`checkScreenOptions`:**
    -   **Pflichtfeld:** Nein
    -   **Typ:** ein Objekt mit Optionen, siehe [Vergleichs-/Prüfoptionen](./method-options#compare-check-options)

#### Ausgabe:

Siehe die Seite [Testausgabe](./test-output#checkscreenelementfullpagescreen).

### `checkFullPageScreen`

Vergleicht ein Bild des kompletten Bildschirms mit einem Baseline-Bild.

#### Verwendung

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

#### Unterstützung

- Desktop-Browser
- Mobile Browser

#### Parameter
-   **`tag`:**
    -   **Pflichtfeld:** Ja
    -   **Typ:** string
-   **`checkFullPageOptions`:**
    -   **Pflichtfeld:** Nein
    -   **Typ:** ein Objekt mit Optionen, siehe [Vergleichs-/Prüfoptionen](./method-options#compare-check-options)

#### Ausgabe:

Siehe die Seite [Testausgabe](./test-output#checkscreenelementfullpagescreen).

### `checkTabbablePage`

Vergleicht ein Bild des kompletten Bildschirms mit den tabulierbaren Linien und Punkten mit einem Baseline-Bild.

#### Verwendung

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

#### Unterstützung

- Desktop-Browser

#### Parameter
-   **`tag`:**
    -   **Pflichtfeld:** Ja
    -   **Typ:** string
-   **`checkTabbableOptions`:**
    -   **Pflichtfeld:** Nein
    -   **Typ:** ein Objekt mit Optionen, siehe [Vergleichs-/Prüfoptionen](./method-options#compare-check-options)

#### Ausgabe:

Siehe die Seite [Testausgabe](./test-output#checkscreenelementfullpagescreen).