---
id: methods
title: Methoden
description: "Verwenden Sie die Save- und Check-Methoden des Visual Service, um Screenshots zu erstellen und Bildschirme, Elemente und ganze Seiten mit Baselines zu vergleichen."
---

Die folgenden Methoden werden dem globalen WebdriverIO [`browser`](/docs/api/browser)-Objekt hinzugefügt.

## Save-Methoden

:::info TIPP
Verwenden Sie die Save-Methoden nur, wenn Sie Bildschirme **nicht** vergleichen, sondern lediglich einen Element-Screenshot bzw. Screenshot erhalten möchten.
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
- Mobile Hybrid-Apps
- Mobile Native Apps

#### Parameter

-   **`element`:**
    -   **Erforderlich:** Ja
    -   **Typ:** WebdriverIO Element
-   **`tag`:**
    -   **Erforderlich:** Ja
    -   **Typ:** string
-   **`saveElementOptions`:**
    -   **Erforderlich:** Nein
    -   **Typ:** ein Objekt mit Optionen, siehe [Save-Optionen](./method-options#save-options)

#### Ausgabe:

Siehe die Seite [Testausgabe](./test-output#savescreenelementfullpagescreen).

### `saveScreen`

Speichert ein Bild des Viewports.

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
- Mobile Hybrid-Apps
- Mobile Native Apps

#### Parameter
-   **`tag`:**
    -   **Erforderlich:** Ja
    -   **Typ:** string
-   **`saveScreenOptions`:**
    -   **Erforderlich:** Nein
    -   **Typ:** ein Objekt mit Optionen, siehe [Save-Optionen](./method-options#save-options)

#### Ausgabe:

Siehe die Seite [Testausgabe](./test-output#savescreenelementfullpagescreen).

### `saveFullPageScreen`

#### Verwendung

Speichert ein Bild des vollständigen Bildschirms.

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
    -   **Erforderlich:** Ja
    -   **Typ:** string
-   **`saveFullPageScreenOptions`:**
    -   **Erforderlich:** Nein
    -   **Typ:** ein Objekt mit Optionen, siehe [Save-Optionen](./method-options#save-options)

#### Ausgabe:

Siehe die Seite [Testausgabe](./test-output#savescreenelementfullpagescreen).

### `saveTabbablePage`

Speichert ein Bild des vollständigen Bildschirms mit den Tabbable-Linien und -Punkten.

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
    -   **Erforderlich:** Ja
    -   **Typ:** string
-   **`saveTabbableOptions`:**
    -   **Erforderlich:** Nein
    -   **Typ:** ein Objekt mit Optionen, siehe [Save-Optionen](./method-options#save-options)

#### Ausgabe:

Siehe die Seite [Testausgabe](./test-output#savescreenelementfullpagescreen).

## Check-Methoden

:::info TIPP
Wenn die `check`-Methoden zum ersten Mal verwendet werden, sehen Sie die folgende Warnung in den Logs. Das bedeutet, dass Sie die `save`- und `check`-Methoden nicht kombinieren müssen, wenn Sie Ihre Baseline erstellen möchten.

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
- Mobile Hybrid-Apps
- Mobile Native Apps

#### Parameter
-   **`element`:**
    -   **Erforderlich:** Ja
    -   **Typ:** WebdriverIO Element
-   **`tag`:**
    -   **Erforderlich:** Ja
    -   **Typ:** string
-   **`checkElementOptions`:**
    -   **Erforderlich:** Nein
    -   **Typ:** ein Objekt mit Optionen, siehe [Compare/Check-Optionen](./method-options#compare-check-options)

#### Ausgabe:

Siehe die Seite [Testausgabe](./test-output#checkscreenelementfullpagescreen).

### `checkScreen`

Vergleicht ein Bild des Viewports mit einem Baseline-Bild.

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
- Mobile Hybrid-Apps
- Mobile Native Apps

#### Parameter
-   **`tag`:**
    -   **Erforderlich:** Ja
    -   **Typ:** string
-   **`checkScreenOptions`:**
    -   **Erforderlich:** Nein
    -   **Typ:** ein Objekt mit Optionen, siehe [Compare/Check-Optionen](./method-options#compare-check-options)

#### Ausgabe:

Siehe die Seite [Testausgabe](./test-output#checkscreenelementfullpagescreen).

### `checkFullPageScreen`

Vergleicht ein Bild des vollständigen Bildschirms mit einem Baseline-Bild.

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
    -   **Erforderlich:** Ja
    -   **Typ:** string
-   **`checkFullPageOptions`:**
    -   **Erforderlich:** Nein
    -   **Typ:** ein Objekt mit Optionen, siehe [Compare/Check-Optionen](./method-options#compare-check-options)

#### Ausgabe:

Siehe die Seite [Testausgabe](./test-output#checkscreenelementfullpagescreen).

### `checkTabbablePage`

Vergleicht ein Bild des vollständigen Bildschirms mit den Tabbable-Linien und -Punkten mit einem Baseline-Bild.

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
    -   **Erforderlich:** Ja
    -   **Typ:** string
-   **`checkTabbableOptions`:**
    -   **Erforderlich:** Nein
    -   **Typ:** ein Objekt mit Optionen, siehe [Compare/Check-Optionen](./method-options#compare-check-options)

#### Ausgabe:

Siehe die Seite [Testausgabe](./test-output#checkscreenelementfullpagescreen).