---
id: method-options
title: Methodenoptionen
description: "Legen Sie pro Methode Speicher-, Vergleichs- und Ordneroptionen für visuelle Testmethoden fest, die die Optionen auf Service-Ebene überschreiben."
---

Methodenoptionen sind die Optionen, die pro [Methode](./methods) festgelegt werden können. Wenn die Option denselben Schlüssel wie eine Option hat, die bei der Instanziierung des Plugins festgelegt wurde, überschreibt diese Methodenoption den Wert der Plugin-Option.

:::info HINWEIS

-   Alle Optionen aus den [Speicheroptionen](#save-options) können für die [Vergleichs](#compare-check-options)-Methoden verwendet werden
-   Alle Vergleichsoptionen können bei der Instanziierung des Service __oder__ für jede einzelne Check-Methode verwendet werden. Wenn eine Methodenoption denselben Schlüssel wie eine Option hat, die bei der Instanziierung des Service festgelegt wurde, überschreibt die Vergleichsoption der Methode den Wert der Vergleichsoption des Service.
- Alle Optionen können für die folgenden Anwendungskontexte verwendet werden, sofern nicht anders angegeben:
    - Web
    - Hybrid App
    - Native App
- Die folgenden Beispiele verwenden die `save*`-Methoden, können aber auch mit den `check*`-Methoden verwendet werden

:::

# Speicheroptionen

## Anzeige & Rendering

---

### `hideScrollBars`

<Option type="boolean" default="true" required="No">

- **Verwendet mit:** Allen [Methoden](./methods)
- **Unterstützte Anwendungskontexte:** Web, Hybrid App (Webview)

Blendet Scrollbalken in der Anwendung aus. Wenn auf true gesetzt, werden alle Scrollbalken vor dem Erstellen eines Screenshots deaktiviert. Dies ist standardmäßig auf `true` gesetzt, um zusätzliche Probleme zu vermeiden.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        hideScrollBars: false
    }
)
```

</Option>
### `disableBlinkingCursor`

<Option type="boolean" default="false" required="No">

- **Verwendet mit:** Allen [Methoden](./methods)
- **Unterstützte Anwendungskontexte:** Web, Hybrid App (Webview)

Aktiviert/deaktiviert das „Blinken“ des Cursors in allen `input`-, `textarea`- und `[contenteditable]`-Elementen der Anwendung. Wenn auf `true` gesetzt, wird der Cursor vor dem Erstellen eines Screenshots auf `transparent` gesetzt
und danach zurückgesetzt.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableBlinkingCursor: true
    }
)
```

</Option>
### `disableCSSAnimation`

<Option type="boolean" default="false" required="No">

- **Verwendet mit:** Allen [Methoden](./methods)
- **Unterstützte Anwendungskontexte:** Web, Hybrid App (Webview)

Aktiviert/deaktiviert alle CSS-Animationen in der Anwendung. Wenn auf `true` gesetzt, werden alle Animationen vor dem Erstellen eines Screenshots deaktiviert
und danach zurückgesetzt

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        disableCSSAnimation: true
    }
)
```

</Option>
### `enableLayoutTesting`

<Option type="boolean" default="false" required="No">

- **Verwendet mit:** Allen [Methoden](./methods)
- **Unterstützte Anwendungskontexte:** Web, Hybrid App (Webview)

Dadurch wird der gesamte Text auf einer Seite ausgeblendet, sodass nur das Layout für den Vergleich verwendet wird. Das Ausblenden erfolgt, indem __jedem__ Element der Stil `'color': 'transparent !important'` hinzugefügt wird.

Für die Ausgabe siehe [Testausgabe](./test-output#enablelayouttesting).

:::info
Durch die Verwendung dieses Flags erhält jedes Element, das Text enthält (also nicht nur `p, h1, h2, h3, h4, h5, h6, span, a, li`, sondern auch `div|button|..`), diese Eigenschaft. Es gibt __keine__ Möglichkeit, dies anzupassen.
:::

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLayoutTesting: true
    }
)
```

</Option>
### `enableLegacyScreenshotMethod`

<Option type="boolean" default="false" required="No">

- **Verwendet mit:** Allen [Methoden](./methods)
- **Unterstützte Anwendungskontexte:** Web, Hybrid App (Webview)

Verwenden Sie diese Option, um zur „älteren“ Screenshot-Methode auf Basis des W3C-WebDriver-Protokolls zurückzukehren. Dies kann hilfreich sein, wenn Ihre Tests auf vorhandenen Baseline-Bildern basieren oder wenn Sie in Umgebungen arbeiten, die die neueren BiDi-basierten Screenshots nicht vollständig unterstützen.
Beachten Sie, dass die Aktivierung dieser Option Screenshots mit leicht abweichender Auflösung oder Qualität erzeugen kann.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        enableLegacyScreenshotMethod: true
    }
)
```

</Option>
### `ignoreRegionPadding`

<Option type="number" default="1" required="No">

- **Verwendet mit:** Allen [Methoden](./methods)
- **Unterstützte Anwendungskontexte:** Web, Hybrid App (Webview)

Abstand in Gerätepixeln, der zu jeder Seite von Ignorier-Bereichen hinzugefügt wird, wodurch jeder Bereich um das 2-Fache dieses Wertes breiter und höher wird. Dies hilft, 1-px-Randabweichungen zu vermeiden, die auf Displays mit hohem DPR oder mit dem BiDi-Screenshot-Protokoll auftreten können. Auf `0` setzen, um dies zu deaktivieren.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        ignoreRegionPadding: 0
    }
)
```

</Option>
### `waitForFontsLoaded`

<Option type="boolean" default="true" required="No">

- **Verwendet mit:** Allen [Methoden](./methods)
- **Unterstützte Anwendungskontexte:** Web, Hybrid App (Webview)

Schriftarten, einschließlich Schriftarten von Drittanbietern, können synchron oder asynchron geladen werden. Asynchrones Laden bedeutet, dass Schriftarten möglicherweise erst geladen werden, nachdem WebdriverIO festgestellt hat, dass eine Seite vollständig geladen ist. Um Probleme bei der Schriftdarstellung zu vermeiden, wartet dieses Modul standardmäßig, bis alle Schriftarten geladen sind, bevor ein Screenshot erstellt wird.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        waitForFontsLoaded: true
    }
)
```

</Option>
## Sichtbarkeit von Elementen

---

### `hideElements`

<Option type="array" required="No">

- **Verwendet mit:** Allen [Methoden](./methods)
- **Unterstützte Anwendungskontexte:** Web, Hybrid App (Webview)

Diese Methode kann ein oder mehrere Elemente ausblenden, indem ihnen die Eigenschaft `visibility: hidden` hinzugefügt wird, wobei ein Array von Elementen übergeben wird.

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

</Option>
### `removeElements`

<Option type="array" required="No">

- **Verwendet mit:** Allen [Methoden](./methods)
- **Unterstützte Anwendungskontexte:** Web, Hybrid App (Webview)

Diese Methode kann ein oder mehrere Elemente _entfernen_, indem ihnen die Eigenschaft `display: none` hinzugefügt wird, wobei ein Array von Elementen übergeben wird.

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

</Option>
## Elementspezifisch

---

### `resizeDimensions`

<Option type="object" default={`{ top: 0, right: 0, bottom: 0, left: 0}`} required="No">

- **Verwendet mit:** Nur für [`saveElement`](./methods#saveelement) oder [`checkElement`](./methods#checkelement)
- **Unterstützte Anwendungskontexte:** Web, Hybrid App (Webview), Native App

Ein Objekt, das eine Anzahl an Pixeln für `top`, `right`, `bottom` und `left` enthalten muss, um den Elementausschnitt zu vergrößern.

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

</Option>
### `biDiOrigin`

<Option type="'document' | 'viewport'" default="'document'" required="No">

- **Verwendet mit:** Nur für [`saveElement`](./methods#saveelement) oder [`checkElement`](./methods#checkelement)
- **Unterstützte Anwendungskontexte:** Web, Hybrid App (Webview)

Nur-BiDi-Option, die steuert, welcher Koordinatenursprung beim Erfassen von Element-Screenshots über das WebDriver-BiDi-Protokoll verwendet wird.

- `'document'` _(Standard)_: rendert das Dokumentlayout. Funktioniert für jede Elementposition, erfasst jedoch **keine** zusammengesetzten Ebenen (z. B. Scrollbalken, fixierte/sticky Overlays, `will-change`-Elemente).
- `'viewport'`: erfasst den zusammengesetzten Frame so, wie er gezeichnet wurde, einschließlich Scrollbalken und Overlays. Erfordert, dass das Element im Viewport **vollständig sichtbar** ist, und wirft einen aussagekräftigen Fehler, wenn sich das Element außerhalb des Viewports befindet oder größer als dieser ist.

```typescript
await browser.saveElement(
    await $('#my-element'),
    'sample-tag',
    {
        biDiOrigin: 'viewport'
    }
)
```

</Option>
## Ganzseitenspezifisch

---

### `userBasedFullPageScreenshot`

<Option type="boolean" default="false" required="No">

- **Verwendet mit:** Nur für [`saveFullPageScreen`](./methods#savefullpagescreen), [`saveTabbablePage`](./methods#savetabbablepage), [`checkFullPageScreen`](./methods#checkfullpagescreen) oder [`checkTabbablePage`](./methods#checktabbablepage)
- **Unterstützte Anwendungskontexte:** Web, Hybrid App (Webview)

Wenn auf `true` gesetzt, aktiviert diese Option die **Scroll-and-Stitch-Strategie** zur Erfassung ganzseitiger Screenshots.
Anstatt die nativen Screenshot-Funktionen des Browsers zu verwenden, scrollt sie manuell durch die Seite und setzt mehrere Screenshots zusammen.
Diese Methode ist besonders nützlich für Seiten mit **Lazy-Loading-Inhalten** oder komplexen Layouts, die Scrollen erfordern, um vollständig gerendert zu werden.

```typescript
await browser.saveScreen(
    'sample-tag',
    {
        userBasedFullPageScreenshot: true
    }
)
```

</Option>
### `fullPageScrollTimeout`

<Option type="number" default="1500" required="No">

- **Verwendet mit:** Nur für [`saveFullPageScreen`](./methods#savefullpagescreen) oder [`saveTabbablePage`](./methods#savetabbablepage)
- **Unterstützte Anwendungskontexte:** Web, Hybrid App (Webview)

Die Wartezeit in Millisekunden nach einem Scrollvorgang. Dies kann helfen, Seiten mit Lazy Loading zu erkennen.

> **HINWEIS:** Dies funktioniert nur, wenn `userBasedFullPageScreenshot` auf `true` gesetzt ist

```typescript
await browser.saveFullPageScreen(
    'sample-tag',
    {
        fullPageScrollTimeout: 3 * 1000
    }
)
```

</Option>
### `hideAfterFirstScroll`

<Option type="array" required="No">

- **Verwendet mit:** Nur für [`saveFullPageScreen`](./methods#savefullpagescreen) oder [`saveTabbablePage`](./methods#savetabbablepage)
- **Unterstützte Anwendungskontexte:** Web, Hybrid App (Webview)

Diese Methode blendet ein oder mehrere Elemente aus, indem ihnen die Eigenschaft `visibility: hidden` hinzugefügt wird, wobei ein Array von Elementen übergeben wird.
Dies ist praktisch, wenn eine Seite beispielsweise Sticky-Elemente enthält, die beim Scrollen mit der Seite mitscrollen, aber bei einem ganzseitigen Screenshot einen störenden Effekt verursachen

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

# Vergleichsoptionen (Check)

Vergleichsoptionen sind Optionen, die die Art und Weise beeinflussen, wie der Vergleich durchgeführt wird.

</Option>
## Visuelle Empfindlichkeit

---

:::info Versionsverlauf für `ignore*`-Optionen
Diese Voreinstellungen haben ihr Verhalten einmal als Breaking Change geändert, als die Vergleichs-Engine von ResembleJS (v9 und älter) auf Pixelmatch (v10 und neuer) umgestellt wurde. Details finden Sie in der [Versionsverlaufstabelle](./compare-options#visual-sensitivity) auf der Seite Vergleichsoptionen. Alles seit v10.0.0 ist bei der jeweiligen Option unten mit einem „Seit“-Hinweis gekennzeichnet.
:::

**Reihenfolge „Letzter gewinnt“:** Wenn mehr als ein `ignore*`-Flag gleichzeitig aktiviert ist, wird nur eine Voreinstellung angewendet, und zwar in folgender Reihenfolge (spätere gewinnt): `ignoreAlpha` → `ignoreAntialiasing` → `ignoreColors` → `ignoreLess` → `ignoreNothing`. Ab `v10.1.0` wird eine Warnung protokolliert, die angibt, welche Voreinstellung gewonnen hat.

### `ignoreColors`

<Option type="boolean" default="false" required="No">

- **Verwendet mit:** Allen [Check-Methoden](./methods#check-methods)
- **Unterstützte Anwendungskontexte:** Alle
- **Seit:** `v10.1.0`: reiner Helligkeitsvergleich unter Verwendung der Resemble-Luma-Gewichte (`0.3/0.59/0.11`).

Vergleicht nur die Helligkeit (Resemble-Luma-Gewichte `0.3/0.59/0.11`) und ignoriert Farbton-/Farbunterschiede. Verwenden Sie dies, wenn die Farbe selbst erwartungsgemäß variiert, Sie aber dennoch Layout- oder Helligkeitsänderungen erkennen möchten.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreColors: true
    }
)
```

</Option>
### `ignoreAlpha`

<Option type="boolean" default="false" required="No">

- **Verwendet mit:** Allen [Check-Methoden](./methods#check-methods)
- **Unterstützte Anwendungskontexte:** Alle
- **Seit:** `v10.1.0`: wendet seine eigene Schwellenwert-/AA-Regel unabhängig von anderen `ignore*`-Flags an.

Vergleicht Bilder und verwirft Unterschiede im Alphakanal. Verwenden Sie dies, wenn die Darstellung von Transparenz/Deckkraft unzuverlässig ist, die darunterliegenden Pixelfarben aber relevant sind.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAlpha: true
    }
)
```

</Option>
### `ignoreAntialiasing`

<Option type="boolean" default="true" required="No">

- **Verwendet mit:** Allen [Check-Methoden](./methods#check-methods)
- **Unterstützte Anwendungskontexte:** Alle
- **Seit:** `v10`: Standardwert auf `true` geändert (war `false` in v9 und älter).

Toleriert Anti-Aliasing-Pixel beim Vergleich. Auf `false` setzen für einen strikten Vergleich, bei dem Anti-Aliasing-Pixel als Abweichungen zählen sollen. Dies behebt die häufigste Ursache für instabile visuelle Tests: Text-/Formkanten, die auf verschiedenen Rechnern mit leicht unterschiedlichem Anti-Aliasing gerendert werden, obwohl sich nichts geändert hat.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreAntialiasing: true
    }
)
```

</Option>
### `ignoreLess`

<Option type="boolean" default="false" required="No">

- **Verwendet mit:** Allen [Check-Methoden](./methods#check-methods)
- **Unterstützte Anwendungskontexte:** Alle
- **Seit:** `v10.1.0`: wendet seine eigene Schwellenwert-/AA-Regel unabhängig von anderen `ignore*`-Flags an.

Vergleicht Bilder mit einer gelockerten RGB-Toleranz (~16/255 pro Kanal im YIQ-Farbraum). Anti-Aliasing wird nicht toleriert. Verwenden Sie dies für etwas Spielraum bei Rendering-Rauschen (Kompressionsartefakte, Farbrundungen), ohne Anti-Aliasing zu tolerieren.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreLess: true
    }
)
```

</Option>
### `ignoreNothing`

<Option type="boolean" default="false" required="No">

- **Verwendet mit:** Allen [Check-Methoden](./methods#check-methods)
- **Unterstützte Anwendungskontexte:** Alle
- **Seit:** `v10.1.0`: wendet seine eigene Schwellenwert-/AA-Regel unabhängig von anderen `ignore*`-Flags an.

Verwendet keinerlei Toleranz: Jeder Pixelunterschied zählt als Abweichung, einschließlich Anti-Aliasing. Verwenden Sie dies, wenn Sie einen pixelgenauen Nachweis benötigen, dass sich überhaupt nichts geändert hat.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        ignoreNothing: true
    }
)
```

</Option>
### `pixelmatch`

<Option type="object" default="undefined" required="No">

- **Verwendet mit:** Allen [Check-Methoden](./methods#check-methods)
- **Unterstützte Anwendungskontexte:** Alle
- **Hinzugefügt in:** `v10.1.0`

Überschreibt den Vergleichsmodus für einen einzelnen `check*`-Aufruf mit direkten [pixelmatch](https://github.com/mapbox/pixelmatch)-Einstellungen (`threshold`, `includeAA`, `diffColor`, `aaColor`, `diffColorAlt`, `alpha`, `diffMask`, `checkerboard`) anstelle einer `ignore*`-Voreinstellung. Verwenden Sie dies, wenn die Voreinstellungen für einen bestimmten Test zu grob sind, z. B. wenn er einen eigenen Schwellenwert benötigt oder eine Diff-Farbe, die in Ihrem Bericht tatsächlich hervorsticht. Unter [Direkte pixelmatch-Steuerung](./compare-options#direct-pixelmatch-control) finden Sie die vollständige Feldreferenz und welches Problem jedes Feld löst.

Kann nicht mit `ignore*`-Optionen im selben Optionsobjekt eines Aufrufs kombiniert werden: Dies wirft einen `CompareOptionsConflictError`. Es kann jedoch eine Service-Konfiguration überschreiben, die `ignore*`-Voreinstellungen verwendet (oder umgekehrt); es wird eine Warnung protokolliert, wenn ein Methodenaufruf den Vergleichsmodus auf diese Weise wechselt.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        pixelmatch: { threshold: 0.05 }
    }
)
```

</Option>
### `scaleImagesToSameSize`

<Option type="boolean" default="false" required="No">

- **Verwendet mit:** Allen [Check-Methoden](./methods#check-methods)
- **Unterstützte Anwendungskontexte:** Alle

Skaliert 2 Bilder vor der Durchführung des Vergleichs auf dieselbe Größe. Es wird dringend empfohlen, `ignoreAntialiasing` und `ignoreAlpha` zu aktivieren

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        scaleImagesToSameSize: true
    }
)
```

</Option>
## Mobile Ausblendungen

---

### `blockOutStatusBar`

<Option type="boolean" default="true" required="No">

- **Verwendet mit:** _Dies ist **nur für Mobilgeräte**_
- **Unterstützte Anwendungskontexte:** Hybrid (nativer Teil) und Native Apps

Blendet die Status- und Adressleiste bei Vergleichen automatisch aus. Dies verhindert Fehler aufgrund von Uhrzeit, WLAN- oder Akkustatus.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutStatusBar: true
    }
)
```

</Option>
### `blockOutToolBar`

<Option type="boolean" default="true" required="No">

- **Verwendet mit:** _Dies ist **nur für Mobilgeräte**_
- **Unterstützte Anwendungskontexte:** Hybrid (nativer Teil) und Native Apps

Blendet die Symbolleiste automatisch aus.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutToolBar: true
    }
)
```

</Option>
### `blockOutSideBar`

<Option type="boolean" default="true" required="No">

- **Verwendet mit:** _Kann nur für `checkScreen()` verwendet werden. Dies ist **nur für iPads**_
- **Unterstützte Anwendungskontexte:** Alle

Blendet bei Vergleichen die Seitenleiste auf iPads im Querformat automatisch aus. Dies verhindert Fehler durch die native Tab-/Privat-/Lesezeichen-Komponente.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOutSideBar: true
    }
)
```

</Option>
## Behandlung von Bereichen

---

### `blockOut`

<Option type="array" required="No">

- **Verwendet mit:** Allen [Check-Methoden](./methods#check-methods)
- **Unterstützte Anwendungskontexte:** Alle

Ein Array rechteckiger Bereiche, die vor dem Vergleich ausgeblendet werden sollen. Jeder Eintrag muss ein Objekt mit den Werten `x`, `y`, `width` und `height` (in Pixeln) sein. Die ausgeblendeten Bereiche werden übermalt, bevor die Differenz berechnet wird, sodass diese Bereiche nicht zum Abweichungsprozentsatz beitragen.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        blockOut: [
            { x: 0, y: 0, width: 100, height: 50 },
            { x: 300, y: 200, width: 80, height: 80 },
        ]
    }
)
```

</Option>
### `ignore`

<Option type="array" required="No">

- **Verwendet mit:** Nur mit der `checkScreen`-Methode, **NICHT** mit der `checkElement`-Methode
- **Unterstützte Anwendungskontexte:** Native App

Diese Methode blendet automatisch Elemente oder einen Bereich auf einem Bildschirm aus, basierend auf einem Array von Elementen oder einem Objekt mit `x|y|width|height`.

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

</Option>
## Ergebnisse & Berichte

---

### `rawMisMatchPercentage`

<Option type="boolean" default="false" required="No">

- **Verwendet mit:** Allen [Check-Methoden](./methods#check-methods)
- **Unterstützte Anwendungskontexte:** Alle

Wenn true, wird der zurückgegebene Prozentsatz wie `0.12345678` aussehen, standardmäßig ist er `0.12`

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        rawMisMatchPercentage: true
    }
)
```

</Option>
### `returnAllCompareData`

<Option type="boolean" default="false" required="No">

- **Verwendet mit:** Allen [Check-Methoden](./methods#check-methods)
- **Unterstützte Anwendungskontexte:** Alle

Dies gibt alle Vergleichsdaten zurück, nicht nur den Abweichungsprozentsatz, siehe auch [Konsolenausgabe](./test-output#console-output-1)

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        returnAllCompareData: true
    }
)
```

</Option>
### `saveAboveTolerance`

<Option type="number" default="0" required="No">

- **Verwendet mit:** Allen [Check-Methoden](./methods#check-methods)
- **Unterstützte Anwendungskontexte:** Alle

Zulässiger Wert von `misMatchPercentage`, der das Speichern von Bildern mit Unterschieden verhindert

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        saveAboveTolerance: 0.25
    }
)
```

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="No">

- **Verwendet mit:** Allen [Check-Methoden](./methods#check-methods)
- **Unterstützte Anwendungskontexte:** Alle

Die Pixelnähe, die verwendet wird, um Diff-Pixel in JSON-Berichten zu gruppieren. Höhere Werte fassen mehr Pixel in weniger Begrenzungsrahmen zusammen; niedrigere Werte erzeugen genauere, aber zahlreichere Rahmen. Nur relevant, wenn [`createJsonReportFiles`](/docs/visual-testing/service-options#createjsonreportfiles) aktiviert ist.

```typescript
await browser.checkScreen(
    'sample-tag',
    {
        diffPixelBoundingBoxProximity: 10
    }
)
```

# Ordneroptionen

---

Der Baseline-Ordner und die Screenshot-Ordner (actual, diff) sind Optionen, die bei der Instanziierung des Plugins oder der Methode festgelegt werden können. Um die Ordneroptionen für eine bestimmte Methode festzulegen, übergeben Sie die Ordneroptionen an das Optionsobjekt der Methode. Dies kann verwendet werden für:

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

// Sie können dies für alle Methoden verwenden
await expect(
    await browser.checkFullPageScreen("checkFullPage", methodOptions)
).toEqual(0)
```

</Option>
### `actualFolder`

<Option type="string" required="No" contexts="All">

Ordner für den Snapshot, der im Test erfasst wurde.

</Option>
### `baselineFolder`

<Option type="string" required="No" contexts="All">

Ordner für das Baseline-Bild, mit dem verglichen wird.

</Option>
### `diffFolder`

<Option type="string" required="No" contexts="All">

Ordner für das beim Vergleich gerenderte Differenzbild.

</Option>