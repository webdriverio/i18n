---
id: method-options
title: Methoden-Optionen
---

Methoden-Optionen sind die Optionen, die pro [Methode](./methods) festgelegt werden können. Wenn die Option den gleichen Schlüssel hat wie eine Option, die während der Instanziierung des Plugins festgelegt wurde, überschreibt diese Methoden-Option den Wert der Plugin-Option.

## Speicher-Optionen

### `disableBlinkingCursor`

-   **Typ:** `boolean`
-   **Pflichtfeld:** Nein
-   **Standard:** `false`
-   **Unterstützt:** Web, Hybrid App (Webview)

Aktiviert/Deaktiviert das "Blinken" des Cursors in allen `input`, `textarea`, `[contenteditable]` Elementen in der Anwendung. Wenn auf `true` gesetzt, wird der Cursor auf `transparent` gesetzt, bevor ein Screenshot gemacht wird, und danach zurückgesetzt.

### `disableCSSAnimation`

-   **Typ:** `boolean`
-   **Pflichtfeld:** Nein
-   **Standard:** `false`
-   **Unterstützt:** Web, Hybrid App (Webview)

Aktiviert/Deaktiviert alle CSS-Animationen in der Anwendung. Wenn auf `true` gesetzt, werden alle Animationen deaktiviert, bevor ein Screenshot gemacht wird, und danach zurückgesetzt.

### `enableLayoutTesting`

-   **Typ:** `boolean`
-   **Pflichtfeld:** Nein
-   **Standard:** `false`
-   **Verwendet mit:** Allen [Methoden](./methods)
-   **Unterstützt:** Web

Dies blendet den gesamten Text auf einer Seite aus, sodass nur das Layout für den Vergleich verwendet wird. Das Ausblenden erfolgt durch Hinzufügen des Stils `'color': 'transparent !important'` zu __jedem__ Element.

Für die Ausgabe siehe [Test-Ausgabe](./test-output#enablelayouttesting)

:::info
Bei Verwendung dieses Flags erhält jedes Element, das Text enthält (also nicht nur `p, h1, h2, h3, h4, h5, h6, span, a, li`, sondern auch `div|button|..`), diese Eigenschaft. Es gibt __keine__ Möglichkeit, dies anzupassen.
:::

### `hideScrollBars`

-   **Typ:** `boolean`
-   **Pflichtfeld:** Nein
-   **Standard:** `true`
-   **Verwendet mit:** Allen [Methoden](./methods)
-   **Unterstützt:** Web, Hybrid App (Webview)

Blendet Scrollbalken in der Anwendung aus. Wenn auf true gesetzt, werden alle Scrollbalken vor dem Erstellen eines Screenshots deaktiviert. Dies ist standardmäßig auf `true` gesetzt, um zusätzliche Probleme zu vermeiden.

### `hideElements`

-   **Typ:** `array`
-   **Pflichtfeld:** nein
-   **Verwendet mit:** Allen [Methoden](./methods)
-   **Unterstützt:** Web, Hybrid App (Webview), Native App

Diese Methode kann ein oder mehrere Elemente ausblenden, indem die Eigenschaft `visibility: hidden` hinzugefügt wird, indem ein Array von Elementen bereitgestellt wird.

### `removeElements`

-   **Typ:** `array`
-   **Pflichtfeld:** nein
-   **Verwendet mit:** Allen [Methoden](./methods)
-   **Unterstützt:** Web, Hybrid App (Webview), Native App

Diese Methode kann ein oder mehrere Elemente _entfernen_, indem die Eigenschaft `display: none` hinzugefügt wird, indem ein Array von Elementen bereitgestellt wird.

### `resizeDimensions`

-   **Typ:** `object`
-   **Pflichtfeld:** nein
-   **Standard:** `{ top: 0, right: 0, bottom: 0, left: 0}`
-   **Verwendet mit:** Nur für [`saveElement`](./methods#saveelement) oder [`checkElement`](./methods#checkelement)
-   **Unterstützt:** Web, Hybrid App (Webview), Native App

Ein Objekt, das `top`, `right`, `bottom` und `left` Pixelwerte enthalten muss, die den Elementausschnitt vergrößern sollen.

### `fullPageScrollTimeout`

-   **Typ:** `number`
-   **Pflichtfeld:** Nein
-   **Standard:** `1500`
-   **Verwendet mit:** Nur für [`saveFullPageScreen`](./methods#savefullpagescreen) oder [`saveTabbablePage`](./methods#savetabbablepage)
-   **Unterstützt:** Web

Das Timeout in Millisekunden, das nach einem Scroll gewartet werden soll. Dies kann bei der Identifizierung von Seiten mit Lazy Loading helfen.

### `hideAfterFirstScroll`

-   **Typ:** `array`
-   **Pflichtfeld:** nein
-   **Verwendet mit:** Nur für [`saveFullPageScreen`](./methods#savefullpagescreen) oder [`saveTabbablePage`](./methods#savetabbablepage)
-   **Unterstützt:** Web

Diese Methode blendet ein oder mehrere Elemente aus, indem die Eigenschaft `visibility: hidden` hinzugefügt wird, indem ein Array von Elementen bereitgestellt wird.
Dies ist praktisch, wenn eine Seite beispielsweise sticky Elemente enthält, die beim Scrollen der Seite mitscrollt, aber einen störenden Effekt erzeugt, wenn ein Vollbild-Screenshot erstellt wird.

### `waitForFontsLoaded`

-   **Typ:** `boolean`
-   **Pflichtfeld:** Nein
-   **Standard:** `true`
-   **Verwendet mit:** Allen [Methoden](./methods)
-   **Unterstützt:** Web, Hybrid App (Webview)

Schriftarten, einschließlich Drittanbieter-Schriftarten, können synchron oder asynchron geladen werden. Asynchrones Laden bedeutet, dass Schriftarten möglicherweise geladen werden, nachdem WebdriverIO festgestellt hat, dass eine Seite vollständig geladen wurde. Um Probleme bei der Schriftartendarstellung zu vermeiden, wartet dieses Modul standardmäßig, bis alle Schriftarten geladen sind, bevor ein Screenshot erstellt wird.

## Vergleichs-Optionen

Vergleichsoptionen sind Optionen, die die Art und Weise beeinflussen, wie der Vergleich durch [ResembleJS](https://github.com/Huddle/Resemble.js) ausgeführt wird.

:::info HINWEIS

-   Alle Optionen aus den [Speicher-Optionen](#save-options) können für die Vergleichsmethoden verwendet werden
-   Alle Vergleichsoptionen können während der Service-Instanziierung __oder__ für jede einzelne Prüfmethode verwendet werden. Wenn eine Methodenoption den gleichen Schlüssel hat wie eine Option, die während der Instanziierung des Services festgelegt wurde, dann überschreibt die Methoden-Vergleichsoption den Wert der Service-Vergleichsoption.
- Alle Optionen können verwendet werden für:
    - Web
    - Hybrid App
    - Native App

:::

### `ignoreAlpha`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Pflichtfeld:** nein

Vergleicht Bilder und verwirft Alpha.

### `blockOutSideBar`

-   **Typ:** `boolean`
-   **Standard:** `true`
-   **Pflichtfeld:** nein
-   **Bemerkung:** _Kann nur für `checkScreen()` verwendet werden. Dies ist **nur für iPad**_

Blockiert automatisch die Seitenleiste für iPads im Querformat während der Vergleiche. Dies verhindert Fehler bei der nativen Tab/Privat/Lesezeichen-Komponente.

### `blockOutStatusBar`

-   **Typ:** `boolean`
-   **Standard:** `true`
-   **Pflichtfeld:** nein
-   **Bemerkung:** _Dies ist **nur für Mobile**_

Blockiert automatisch die Status- und Adressleiste während der Vergleiche. Dies verhindert Fehler bei Zeit-, WLAN- oder Batteriestatus.

### `blockOutToolBar`

-   **Typ:** `boolean`
-   **Standard:** `true`
-   **Pflichtfeld:** nein
-   **Bemerkung:** _Dies ist **nur für Mobile**_

Blockiert automatisch die Symbolleiste.

### `ignoreAntialiasing`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Pflichtfeld:** nein

Vergleicht Bilder und verwirft Anti-Aliasing.

### `ignoreColors`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Pflichtfeld:** nein

Auch wenn die Bilder farbig sind, vergleicht der Vergleich 2 Schwarz-Weiß-Bilder.

### `ignoreLess`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Pflichtfeld:** nein

Vergleicht Bilder mit `red = 16, green = 16, blue = 16, alpha = 16, minBrightness=16, maxBrightness=240`

### `ignoreNothing`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Pflichtfeld:** nein

Vergleicht Bilder mit `red = 0, green = 0, blue = 0, alpha = 0, minBrightness=0, maxBrightness=255`

### `rawMisMatchPercentage`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Pflichtfeld:** nein

Wenn true, wird der Rückgabeprozentsatz wie `0.12345678` sein, Standard ist `0.12`

### `returnAllCompareData`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Pflichtfeld:** nein

Dies gibt alle Vergleichsdaten zurück, nicht nur den Mismatch-Prozentsatz.

### `saveAboveTolerance`

-   **Typ:** `number`
-   **Standard:** `0`
-   **Pflichtfeld:** nein

Zulässiger Wert von `misMatchPercentage`, der das Speichern von Bildern mit Unterschieden verhindert.

### `largeImageThreshold`

-   **Typ:** `number`
-   **Standard:** `0`
-   **Pflichtfeld:** nein

Der Vergleich großer Bilder kann zu Leistungsproblemen führen.
Wenn hier eine Zahl für die Anzahl der Pixel angegeben wird (höher als 0), überspringt der Vergleichsalgorithmus Pixel, wenn die Bildbreite oder -höhe größer als `largeImageThreshold` Pixel ist.

### `scaleImagesToSameSize`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Pflichtfeld:** nein

Skaliert 2 Bilder auf die gleiche Größe vor der Ausführung des Vergleichs. Es wird dringend empfohlen, `ignoreAntialiasing` und `ignoreAlpha` zu aktivieren.

## Ordner-Optionen

Der Baseline-Ordner und die Screenshot-Ordner (actual, diff) sind Optionen, die während der Instanziierung des Plugins oder der Methode festgelegt werden können. Um die Ordneroptionen für eine bestimmte Methode festzulegen, übergeben Sie Ordneroptionen an das Optionsobjekt der Methode. Dies kann verwendet werden für:

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

-   **Typ:** `string`
-   **Pflichtfeld:** nein

Ordner für den Snapshot, der im Test aufgenommen wurde.

### `baselineFolder`

-   **Typ:** `string`
-   **Pflichtfeld:** nein

Ordner für das Baseline-Bild, das zum Vergleich verwendet wird.

### `diffFolder`

-   **Typ:** `string`
-   **Pflichtfeld:** nein

Ordner für die von ResembleJS gerenderte Bilddifferenz.