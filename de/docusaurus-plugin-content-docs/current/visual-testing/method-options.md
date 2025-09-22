---
id: method-options
title: Methodenoptionen
---

Methodenoptionen sind die Optionen, die pro [Methode](./methods) festgelegt werden können. Wenn die Option den gleichen Schlüssel wie eine Option hat, die während der Instanziierung des Plugins festgelegt wurde, überschreibt diese Methodenoption den Wert der Plugin-Option.

:::info HINWEIS

-   Alle Optionen aus den [Speicheroptionen](#save-options) können für die [Vergleichs](#compare-check-options)-Methoden verwendet werden
-   Alle Vergleichsoptionen können während der Service-Instanziierung __oder__ für jede einzelne Prüfmethode verwendet werden. Wenn eine Methodenoption den gleichen Schlüssel wie eine Option hat, die während der Instanziierung des Service festgelegt wurde, überschreibt die Methoden-Vergleichsoption den Wert der Service-Vergleichsoption.
- Alle Optionen können für die folgenden Anwendungskontexte verwendet werden, sofern nicht anders angegeben:
    - Web
    - Hybrid App
    - Native App
- Die folgenden Beispiele verwenden die `save*`-Methoden, können aber auch mit den `check*`-Methoden verwendet werden

:::

## Save Options

### `disableBlinkingCursor`

- **Type:** `boolean`
- **Mandatory:** No
- **Default:** `false`
- **Used with:** All [methods](./methods)
- **Supported Application Contexts:** Web, Hybrid App (Webview)

Aktivieren/Deaktivieren des "Blinkens" des Cursors in allen `input`, `textarea`, `[contenteditable]` in der Anwendung. Bei `true` wird der Cursor vor dem Screenshot auf `transparent` gesetzt und danach wieder zurückgesetzt.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableBlinkingCursor: true
    }
)
```

### `disableCSSAnimation`

- **Type:** `boolean`
- **Mandatory:** No
- **Default:** `false`
- **Used with:** All [methods](./methods)
- **Supported Application Contexts:** Web, Hybrid App (Webview)

Aktivieren/Deaktivieren aller CSS-Animationen in der Anwendung. Bei `true` werden alle Animationen vor dem Screenshot deaktiviert und danach wieder aktiviert.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableCSSAnimation: true
    }
)
```

### `enableLegacyScreenshotMethod`

- **Type:** `boolean`
- **Mandatory:** No
- **Default:** `false`
- **Used with:** All [methods](./methods)
- **Supported Application Contexts:** Web, Hybrid App (Webview)

Verwenden Sie diese Option, um zur "älteren" Screenshot-Methode basierend auf dem W3C-WebDriver-Protokoll zurückzukehren. Dies kann hilfreich sein, wenn Ihre Tests auf vorhandenen Baseline-Bildern basieren oder wenn Sie in Umgebungen arbeiten, die die neueren BiDi-basierten Screenshots nicht vollständig unterstützen.
Beachten Sie, dass die Aktivierung zu Screenshots mit leicht unterschiedlicher Auflösung oder Qualität führen kann.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLegacyScreenshotMethod: true
    }
)
```

### `enableLayoutTesting`

- **Type:** `boolean`
- **Mandatory:** No
- **Default:** `false`
- **Used with:** All [methods](./methods)
- **Supported Application Contexts:** Web, Hybrid App (Webview)

Dies blendet allen Text auf einer Seite aus, sodass nur das Layout für den Vergleich verwendet wird. Das Ausblenden erfolgt durch Hinzufügen des Stils `'color': 'transparent !important'` zu __jedem__ Element.

Für die Ausgabe siehe [Test Output](./test-output#enablelayouttesting).

:::info
Bei Verwendung dieses Flags erhält jedes Element, das Text enthält (also nicht nur `p, h1, h2, h3, h4, h5, h6, span, a, li`, sondern auch `div|button|..`), diese Eigenschaft. Es gibt __keine__ Option, dies anzupassen.
:::

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLayoutTesting: true
    }
)
```

### `hideScrollBars`

- **Type:** `boolean`
- **Mandatory:** No
- **Default:** `true`
- **Used with:** All [methods](./methods)
- **Supported Application Contexts:** Web, Hybrid App (Webview)

Scrollleisten in der Anwendung ausblenden. Bei `true` werden alle Scrollleisten vor dem Screenshot deaktiviert. Standardmäßig ist dies auf `true` gesetzt, um zusätzliche Probleme zu vermeiden.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideScrollBars: false
    }
)
```

### `hideElements`

- **Type:** `array`
- **Mandatory:** No
- **Used with:** All [methods](./methods)
- **Supported Application Contexts:** Web, Hybrid App (Webview)

Diese Methode kann ein oder mehrere Elemente ausblenden, indem sie die Eigenschaft `visibility: hidden` zu ihnen hinzufügt, indem ein Array von Elementen bereitgestellt wird.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideElements: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

### `removeElements`

- **Type:** `array`
- **Mandatory:** No
- **Used with:** All [methods](./methods)
- **Supported Application Contexts:** Web, Hybrid App (Webview)

Diese Methode kann ein oder mehrere Elemente _entfernen_, indem sie die Eigenschaft `display: none` zu ihnen hinzufügt, indem ein Array von Elementen bereitgestellt wird.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        removeElements: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

### `resizeDimensions`

- **Type:** `object`
- **Mandatory:** No
- **Default:** `{ top: 0, right: 0, bottom: 0, left: 0}`
- **Used with:** Only for [`saveElement`](./methods#saveelement) or [`checkElement`](./methods#checkelement)
- **Supported Application Contexts:** Web, Hybrid App (Webview), Native App

Ein Objekt, das `top`, `right`, `bottom` und `left` Pixelwerte enthalten muss, die den Element-Ausschnitt vergrößern sollen.

```typescript
await browser.saveElement(
    'sample-tag',
    {
        resizeDimensions: {
            top: 50,
            left: 100,
            right: 10,
            bottom: 90,
        },
    }
)
```

### `userBasedFullPageScreenshot`

- **Type:** `boolean`
- **Mandatory:** No
- **Default:** `false`
- **Used with:** Only for [`saveFullPageScreen`](./methods#savefullpagescreen), [`saveTabbablePage`](./methods#savetabbablepage), [`checkFullPageScreen`](./methods#checkfullpagescreen) or [`checkTabbablePage`](./methods#checktabbablepage)
- **Supported Application Contexts:** Web, Hybrid App (Webview)

Wenn auf `true` gesetzt, aktiviert diese Option die **Scroll-and-Stitch-Strategie** zur Erfassung von Vollbild-Screenshots.
Anstatt die nativen Screenshot-Funktionen des Browsers zu verwenden, scrollt es manuell durch die Seite und fügt mehrere Screenshots zusammen.
Diese Methode ist besonders nützlich für Seiten mit **träge geladenen Inhalten** oder komplexen Layouts, die zum vollständigen Rendern ein Scrollen erfordern.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        userBasedFullPageScreenshot: true
    }
)
```

### `fullPageScrollTimeout`

- **Type:** `number`
- **Mandatory:** No
- **Default:** `1500`
- **Used with:** Only for [`saveFullPageScreen`](./methods#savefullpagescreen) or [`saveTabbablePage`](./methods#savetabbablepage)
- **Supported Application Contexts:** Web, Hybrid App (Webview)

Die Zeitüberschreitung in Millisekunden nach einem Scroll. Dies kann bei der Identifizierung von Seiten mit Lazy Loading helfen.

> **HINWEIS:** Dies funktioniert nur, wenn `userBasedFullPageScreenshot` auf `true` gesetzt ist

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        fullPageScrollTimeout: 3 * 1000
    }
)
```

### `hideAfterFirstScroll`

- **Type:** `array`
- **Mandatory:** No
- **Used with:** Only for [`saveFullPageScreen`](./methods#savefullpagescreen) or [`saveTabbablePage`](./methods#savetabbablepage)
- **Supported Application Contexts:** Web, Hybrid App (Webview)

Diese Methode blendet ein oder mehrere Elemente aus, indem sie die Eigenschaft `visibility: hidden` zu ihnen hinzufügt, indem ein Array von Elementen bereitgestellt wird.
Dies ist praktisch, wenn eine Seite beispielsweise fixierte Elemente enthält, die beim Scrollen mitgehen, aber beim Erstellen eines Vollbild-Screenshots einen störenden Effekt erzeugen würden.

> **HINWEIS:** Dies funktioniert nur, wenn `userBasedFullPageScreenshot` auf `true` gesetzt ist

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        hideAfterFirstScroll: [
            await $('#element-1'),
            await $('#element-2'),
        ]
    }
)
```

### `waitForFontsLoaded`

- **Type:** `boolean`
- **Mandatory:** No
- **Default:** `true`
- **Used with:** All [methods](./methods)
- **Supported Application Contexts:** Web, Hybrid App (Webview)

Schriften, einschließlich Schriften von Drittanbietern, können synchron oder asynchron geladen werden. Asynchrones Laden bedeutet, dass Schriften möglicherweise geladen werden, nachdem WebdriverIO festgestellt hat, dass eine Seite vollständig geladen wurde. Um Probleme mit der Schriftdarstellung zu vermeiden, wartet dieses Modul standardmäßig darauf, dass alle Schriften geladen sind, bevor ein Screenshot gemacht wird.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        waitForFontsLoaded: true
    }
)
```

## Compare (Check) Options

Vergleichsoptionen sind Optionen, die die Art und Weise beeinflussen, wie der Vergleich durch [ResembleJS](https://github.com/Huddle/Resemble.js) ausgeführt wird.

### `ignoreAlpha`

- **Type:** `boolean`
- **Default:** `false`
- **Mandatory:** No
- **Used with:** All [Check methods](./methods#check-methods)
- **Supported Application Contexts:** All

Vergleicht Bilder und ignoriert den Alpha-Kanal.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAlpha: true
    }
)
```

### `blockOutSideBar`

- **Type:** `boolean`
- **Default:** `true`
- **Mandatory:** No
- **Used with:** _Can only be used for `checkScreen()`. This is **iPad only**_
- **Supported Application Contexts:** All

Blockiert automatisch die Seitenleiste für iPads im Querformat während der Vergleiche. Dies verhindert Fehler auf der nativen Tab/Privat/Lesezeichen-Komponente.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutSideBar: true
    }
)
```

### `blockOutStatusBar`

- **Type:** `boolean`
- **Default:** `true`
- **Mandatory:** No
- **Used with:** _This is **Mobile only**_
- **Supported Application Contexts:** Hybrid (native part) and Native Apps

Blockiert automatisch die Status- und Adressleiste während der Vergleiche. Dies verhindert Fehler bei Zeit-, WLAN- oder Batteriestatus.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutStatusBar: true
    }
)
```

### `blockOutToolBar`

- **Type:** `boolean`
- **Default:** `true`
- **Mandatory:** No
- **Used with:** _This is **Mobile only**_
- **Supported Application Contexts:** Hybrid (native part) and Native Apps

Blockiert automatisch die Werkzeugleiste.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutToolBar: true
    }
)
```

### `ignoreAntialiasing`

- **Type:** `boolean`
- **Default:** `false`
- **Mandatory:** No
- **Used with:** All [Check methods](./methods#check-methods)
- **Supported Application Contexts:** All

Vergleicht Bilder und ignoriert Anti-Aliasing.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAntialiasing: true
    }
)
```

### `ignoreColors`

- **Type:** `boolean`
- **Default:** `false`
- **Mandatory:** No
- **Used with:** All [Check methods](./methods#check-methods)
- **Supported Application Contexts:** All

Obwohl die Bilder farbig sind, vergleicht der Vergleich 2 Schwarzweiß-Bilder.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreColors: true
    }
)
```

### `ignoreLess`

- **Type:** `boolean`
- **Default:** `false`
- **Mandatory:** No
- **Used with:** All [Check methods](./methods#check-methods)
- **Supported Application Contexts:** All

Vergleicht Bilder mit den Einstellungen `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreLess: true
    }
)
```

### `ignoreNothing`

- **Type:** `boolean`
- **Default:** `false`
- **Mandatory:** No
- **Used with:** All [Check methods](./methods#check-methods)
- **Supported Application Contexts:** All

Vergleicht Bilder mit den Einstellungen `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreNothing: true
    }
)
```

### `rawMisMatchPercentage`

- **Type:** `boolean`
- **Default:** `false`
- **Mandatory:** No
- **Used with:** All [Check methods](./methods#check-methods)
- **Supported Application Contexts:** All

Bei `true` wird der Rückgabeprozentsatz wie `0.12345678` sein, Standard ist `0.12`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        rawMisMatchPercentage: true
    }
)
```

### `returnAllCompareData`

- **Type:** `boolean`
- **Default:** `false`
- **Mandatory:** No
- **Used with:** All [Check methods](./methods#check-methods)
- **Supported Application Contexts:** All

Gibt alle Vergleichsdaten zurück, nicht nur den Abweichungsprozentsatz, siehe auch [Console Output](./test-output#console-output-1)

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        returnAllCompareData: true
    }
)
```

### `saveAboveTolerance`

- **Type:** `number`
- **Default:** `0`
- **Mandatory:** No
- **Used with:** All [Check methods](./methods#check-methods)
- **Supported Application Contexts:** All

Zulässiger Wert von `misMatchPercentage`, der das Speichern von Bildern mit Unterschieden verhindert.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        saveAboveTolerance: 0.25
    }
)
```

### `largeImageThreshold`

- **Type:** `number`
- **Default:** `0`
- **Mandatory:** No
- **Used with:** All [Check methods](./methods#check-methods)
- **Supported Application Contexts:** All

Der Vergleich großer Bilder kann zu Leistungsproblemen führen.
Wenn hier eine Zahl für die Anzahl der Pixel angegeben wird (höher als 0), überspringt der Vergleichsalgorithmus Pixel, wenn die Bildbreite oder -höhe größer als `largeImageThreshold` Pixel ist.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        largeImageThreshold: 1500
    }
)
```

### `scaleImagesToSameSize`

- **Type:** `boolean`
- **Default:** `false`
- **Mandatory:** No
- **Used with:** All [Check methods](./methods#check-methods)
- **Supported Application Contexts:** All

Skaliert 2 Bilder auf dieselbe Größe vor der Ausführung des Vergleichs. Es wird dringend empfohlen, `ignoreAntialiasing` und `ignoreAlpha` zu aktivieren.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        scaleImagesToSameSize: true
    }
)
```

### `ignore`

- **Type:** `array`
- **Mandatory:** No
- **Used with:** Only with the `checkScreen`-method, **NOT** with the `checkElement`-method
- **Supported Application Contexts:** Native App

Diese Methode blockiert automatisch Elemente oder einen Bereich auf einem Bildschirm basierend auf einem Array von Elementen oder einem Objekt mit `x|y|width|height`.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignore: [
            $('~element-1'),
            await $('~element-2'),
            {
                x: 150,
                y: 250,
                width: 100,
                height: 100,
            }
        ]
    }
)
```

## Folder options

Die Baseline-Ordner und Screenshot-Ordner (aktuell, diff) sind Optionen, die während der Instanziierung des Plugins oder der Methode festgelegt werden können. Um die Ordneroptionen für eine bestimmte Methode festzulegen, übergeben Sie die Ordneroptionen an das Methodenoptionsobjekt. Dies kann verwendet werden für:

- Web
- Hybrid App
- Native App

```ts
import path from 'node:path'

const methodOptions = {
    actualFolder: path.join(process.cwd(), 'customActual'),
    baselineFolder: path.join(process.cwd(), 'customBaseline'),
    diffFolder: path.join(process.cwd(), 'customDiff'),
}

// You can use this for all methods
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

### `actualFolder`

- **Type:** `string`
- **Mandatory:** No
- **Supported Application Contexts:** All

Ordner für den Snapshot, der im Test aufgenommen wurde.

### `baselineFolder`

- **Type:** `string`
- **Mandatory:** No
- **Supported Application Contexts:** All

Ordner für das Baseline-Bild, das zum Vergleich verwendet wird.

### `diffFolder`

- **Type:** `string`
- **Mandatory:** No
- **Supported Application Contexts:** All

Ordner für die von ResembleJS gerenderte Bilddifferenz.