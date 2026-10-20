---
id: compare-options
title: Vergleichsoptionen
description: "Stimme ab, wie Screenshots verglichen werden – mit visueller Empfindlichkeit, pixelmatch, mobilen Block-outs und Reporting-Optionen für den Visual Service."
---

Vergleichsoptionen sind Optionen, die beeinflussen, wie der Vergleich ausgeführt wird.

:::info HINWEIS
Alle Vergleichsoptionen können bei der Instanziierung des Service oder für jedes einzelne `checkElement`, `checkScreen` und `checkFullPageScreen` verwendet werden. Wenn eine Methodenoption denselben Schlüssel hat wie eine Option, die bei der Instanziierung des Service gesetzt wurde, überschreibt die Vergleichsoption der Methode den Wert der Vergleichsoption des Service.
:::

## Visuelle Empfindlichkeit

---

:::info Versionshistorie für `ignore*`-Optionen
Die `ignore*`-Presets haben ihr Verhalten einmal als Breaking Change geändert, als die Vergleichs-Engine von ResembleJS auf Pixelmatch umgestellt wurde:

| Version | Engine | Hinweise |
| --- | --- | --- |
| v9 und darunter | ResembleJS | Ursprüngliche `ignore*`-Semantik (RGB-/helligkeitsbasiert, resembles eigene Preset-Reihenfolge). |
| v10 und höher | Pixelmatch | `ignore*`-Presets werden auf pixelmatch-Threshold-/AA-Einstellungen abgebildet. Aktuelle Standardwerte und das Verhalten sind unten pro Option dokumentiert; neue Features/Fixes darauf aufbauend sind mit einem „Seit"-Hinweis bei der jeweiligen Option gekennzeichnet. |
| v11 und höher | Pixelmatch 8 | Farben werden im OKLab-Farbraum mit der HyAB-Distanz verglichen (vorher: YIQ). Die Threshold-Skala und die `ignore*`-Presets haben sich nicht geändert, aber die Abweichungsprozentsätze können sich leicht von v10 unterscheiden. |

:::

**Last-wins-Reihenfolge:** Wenn mehr als ein `ignore*`-Flag gleichzeitig aktiviert ist, wird nur ein Preset tatsächlich angewendet, und zwar in folgender Reihenfolge (das spätere gewinnt): `ignoreAlpha` → `ignoreAntialiasing` → `ignoreColors` → `ignoreLess` → `ignoreNothing`. Es wird eine Warnung protokolliert, die angibt, welches Preset gewonnen hat.

### `ignoreColors`

<Option type="boolean" default="false" required="no">

-   **Anmerkung:** _Kann auch für `checkElement`, `checkScreen()` und `checkFullPageScreen()` verwendet werden. Es überschreibt die Plugin-Einstellung_
-   **Seit:** `v10.1.0`: Vergleich nur der Helligkeit mithilfe der Luma-Gewichte von resemble (`0.3/0.59/0.11`).

Vergleicht nur die Helligkeit und ignoriert Farbton-/Farbunterschiede. Preset: strenger Threshold (~16/255), Anti-Aliasing wird nicht toleriert.

**Verwende dies, wenn** die Farbe selbst erwartungsgemäß variiert (z. B. themefähige UI, Bilder, die sich je nach Umgebung umfärben), du aber trotzdem Layout- oder Helligkeitsänderungen erkennen möchtest.

</Option>
### `ignoreAlpha`

<Option type="boolean" default="false" required="no">

-   **Anmerkung:** _Kann auch für `checkElement`, `checkScreen()` und `checkFullPageScreen()` verwendet werden. Es überschreibt die Plugin-Einstellung_
-   **Seit:** `v10.1.0`: wendet seine eigene Threshold-/AA-Regel unabhängig von anderen `ignore*`-Flags an.

Vergleicht Bilder und verwirft Unterschiede im Alphakanal. Preset: strenger Threshold (~16/255), Anti-Aliasing wird nicht toleriert.

**Verwende dies, wenn** das Rendering von Transparenz/Deckkraft unzuverlässig ist (z. B. Overlays, halbtransparente Elemente), die tatsächlichen Pixelfarben darunter aber wichtig sind.

</Option>
### `ignoreAntialiasing`

<Option type="boolean" default="true" required="no">

-   **Anmerkung:** _Kann auch für `checkElement`, `checkScreen()` und `checkFullPageScreen()` verwendet werden. Es überschreibt die Plugin-Einstellung_
-   **Seit:** `v10`: Standardwert auf `true` geändert (war `false` in v9 und darunter).

Toleriert Anti-Aliasing-Pixel beim Vergleich (gelockerter Threshold ~32/255). Dies ist das einzige Preset, das Anti-Aliasing toleriert, und es ist standardmäßig aktiviert, damit Subpixel-Rendering-Rauschen Vergleiche nicht von vornherein fehlschlagen lässt. Setze es auf `false` für einen strengen Vergleich, bei dem Anti-Aliasing-Pixel als Abweichungen zählen sollen.

**Verwende dies, um** die häufigste Ursache für instabile visuelle Tests zu beheben: Text- und Formkanten, die zwischen Maschinen/Browsern mit leicht unterschiedlichem Anti-Aliasing gerendert werden, obwohl sich tatsächlich nichts geändert hat.

</Option>
### `ignoreLess`

<Option type="boolean" default="false" required="no">

-   **Anmerkung:** _Kann auch für `checkElement`, `checkScreen()` und `checkFullPageScreen()` verwendet werden. Es überschreibt die Plugin-Einstellung_
-   **Seit:** `v10.1.0`: wendet seine eigene Threshold-/AA-Regel unabhängig von anderen `ignore*`-Flags an.

Vergleicht Bilder mit einer gelockerten RGB-Toleranz (~16/255 pro Kanal im YIQ-Raum). Preset: strenger Threshold, Anti-Aliasing wird nicht toleriert.

**Verwende dies, wenn** du etwas Spielraum für geringes Rendering-Rauschen (JPEG-artige Kompressionsartefakte, leichte Farbrundungen) möchtest, ohne Anti-Aliasing zu tolerieren.

</Option>
### `ignoreNothing`

<Option type="boolean" default="false" required="no">

-   **Anmerkung:** _Kann auch für `checkElement`, `checkScreen()` und `checkFullPageScreen()` verwendet werden. Es überschreibt die Plugin-Einstellung_
-   **Seit:** `v10.1.0`: wendet seine eigene Threshold-/AA-Regel unabhängig von anderen `ignore*`-Flags an.

Verwendet null Toleranz: Jeder Pixelunterschied zählt als Abweichung, einschließlich Anti-Aliasing.

**Verwende dies, wenn** du einen pixelgenauen Nachweis benötigst, dass sich überhaupt nichts geändert hat, z. B. um zu überprüfen, dass ein Fix keine noch so kleine Regression eingeführt hat.

</Option>
### `scaleImagesToSameSize`

<Option type="boolean" default="false" required="no">

-   **Anmerkung:** _Kann auch für `checkElement`, `checkScreen()` und `checkFullPageScreen()` verwendet werden. Es überschreibt die Plugin-Einstellung_

Skaliert 2 Bilder vor der Ausführung des Vergleichs auf dieselbe Größe. Es wird dringend empfohlen, `ignoreAntialiasing` und `ignoreAlpha` zu aktivieren

</Option>
## Direkte pixelmatch-Steuerung

---

:::info Hinzugefügt in v10.1.0
`compareOptions.pixelmatch` hat kein Äquivalent in v9 (ResembleJS). Es ist eine völlig neue Möglichkeit, die Vergleichs-Engine direkt zu steuern, anstatt ein `ignore*`-Preset zu verwenden.
:::

### `compareOptions.pixelmatch`

<Option type="object" default="undefined" required="no">

-   **Anmerkung:** _Kann auch für `checkElement`, `checkScreen()` und `checkFullPageScreen()` verwendet werden. Es überschreibt die Plugin-Einstellung für die jeweils verwendete Methode_
-   **Hinzugefügt in:** `v10.1.0`

Übergibt Einstellungen direkt an [pixelmatch](https://github.com/mapbox/pixelmatch), anstatt ein `ignore*`-Preset zu verwenden. **Verwende dies, wenn die fünf `ignore*`-Presets zu grob sind:** Du benötigst einen bestimmten Threshold-Wert, den die Presets nicht bieten, oder ein Diff-Bild, das in deinen Reports/deiner CI-Ausgabe tatsächlich lesbar ist, statt der standardmäßigen Magenta-Hervorhebung.

:::warning Gegenseitig ausschließend innerhalb desselben Options-Objekts
Wenn ein beliebiger `ignore*`-Schlüssel und `pixelmatch` im **selben** Options-Objekt angegeben werden, wird `CompareOptionsConflictError` geworfen, selbst wenn der `ignore*`-Wert `false` ist (siehe das ungültige Beispiel unten). Wähle einen Modus pro Objekt: `ignore*`-Presets oder `pixelmatch`, niemals beides.

Dies gilt nur innerhalb eines Objekts. Die Service-Konfiguration und die Optionen eines Methodenaufrufs sind separate Objekte, daher **darf** ein `check*`-Aufruf einen anderen Modus als die Service-Konfiguration verwenden, z. B. verwendet der Service `ignore*`-Presets, aber ein Aufruf übergibt stattdessen `pixelmatch` (oder umgekehrt). In diesem Fall gibt es keinen Fehler, nur eine protokollierte Warnung, die auf den Wechsel des Vergleichsmodus hinweist.
:::

| Feld | Typ | Standard | Wofür es ist |
| --- | --- | --- | --- |
| `threshold` | `number` | `0.1` | Empfindlichkeit von 0 (jeder Pixelunterschied schlägt fehl) bis 1 (fast nichts schlägt fehl). Verwende dies, um einen exakten Empfindlichkeitswert einzustellen, anstatt das nächstliegende `ignore*`-Preset zu wählen. |
| `includeAA` | `boolean` | `false` | `true` zählt Anti-Aliasing-Kantenpixel als Abweichungen; `false` toleriert sie. Deaktiviere dies, wenn Unterschiede beim Rendering von Schrift-/Formkanten instabile Fehlschläge verursachen. |
| `diffColor` | `[number, number, number]` | `[255, 0, 255]` (Magenta) | RGB-Farbe für abweichende Pixel im Diff-Bild. Ändere sie, wenn Magenta mit deiner UI verschmilzt (z. B. ein Pink-/Lila-Theme) und Abweichungen schwer zu erkennen sind. |
| `aaColor` | `[number, number, number]` | `[255, 0, 255]` (Magenta) | RGB-Farbe für Anti-Aliasing-Pixel, visuell getrennt von echten Abweichungen, sodass du „Rendering-Rauschen" auf einen Blick von einem „echten Bug" unterscheiden kannst. |
| `diffColorAlt` | `[number, number, number]` | `[255, 0, 255]` (Magenta) | RGB-Farbe für Pixel, die hinzugefügt oder entfernt (nicht nur umgefärbt) wurden – nützlich, um Layoutverschiebungen von Farbänderungen zu unterscheiden. |
| `alpha` | `number` | `0.1` | Deckkraft des Diff-Overlays über dem eigentlichen Screenshot. Erhöhe sie, damit Diffs in Reports stärker hervortreten; verringere sie, um die darunterliegende UI weiterhin deutlich zu sehen. Steht in keinem Zusammenhang mit dem `ignoreAlpha`-Preset. |
| `diffMask` | `boolean` | `false` | Setze `true`, um nur das reine Diff (transparenter Hintergrund) statt des über deinen Screenshot gezeichneten Diffs auszugeben – nützlich, um einen eigenen Diff-Viewer/Report zu erstellen. |
| `checkerboard` | `boolean` | `true` | Steuert, wie halbtransparente Pixel im Diff dargestellt werden. Deaktiviere dies, wenn das Schachbrettmuster leicht mit echten Inhalten in deinen Screenshots verwechselt werden kann. |

**Service-Konfiguration:**

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['visual', {
            compareOptions: {
                pixelmatch: {
                    threshold: 0.063,
                    includeAA: true,
                },
            },
        }],
    ],
}
```

**Überschreiben in der Methode, wenn der Service `ignore*`-Presets verwendet:**

```js
await browser.checkScreen('homepage', {
    pixelmatch: { threshold: 0.05 },
})
```

**Überschreiben in der Methode, wenn der Service `pixelmatch` verwendet:**

```js
await browser.checkScreen('homepage', {
    ignoreLess: true,
})
```

**Ungültig: wirft `CompareOptionsConflictError`**

```js
compareOptions: {
    ignoreLess: false,
    pixelmatch: { threshold: 0.063 },
}
```

Siehe die [pixelmatch-Dokumentation](https://github.com/mapbox/pixelmatch) für die vollständige Semantik der Optionen.

</Option>
## Mobile Block-outs

---

### `blockOutStatusBar`

<Option type="boolean" default="true" required="no">

-   **Anmerkung:** _Kann auch für `checkElement`, `checkScreen()` und `checkFullPageScreen()` verwendet werden. Es überschreibt die Plugin-Einstellung. Dies gilt **nur für Mobile**_

Blendet die Status- und Adressleiste bei Vergleichen automatisch aus. Dies verhindert Fehlschläge aufgrund von Uhrzeit, WLAN- oder Akkustatus.

</Option>
### `blockOutToolBar`

<Option type="boolean" default="true" required="no">

-   **Anmerkung:** _Kann auch für `checkElement`, `checkScreen()` und `checkFullPageScreen()` verwendet werden. Es überschreibt die Plugin-Einstellung. Dies gilt **nur für Mobile**_

Blendet die Toolbar automatisch aus.

</Option>
### `blockOutSideBar`

<Option type="boolean" default="true" required="no">

-   **Anmerkung:** _Kann nur für `checkScreen()` verwendet werden. Es überschreibt die Plugin-Einstellung. Dies gilt **nur für iPads**_

Blendet die Seitenleiste bei iPads im Querformat bei Vergleichen automatisch aus. Dies verhindert Fehlschläge aufgrund der nativen Tab-/Privat-/Lesezeichen-Komponente.

</Option>
## Ergebnisse & Reporting

---

### `rawMisMatchPercentage`

<Option type="boolean" default="false" required="no">

-   **Anmerkung:** _Kann auch für `checkElement`, `checkScreen()` und `checkFullPageScreen()` verwendet werden. Es überschreibt die Plugin-Einstellung_

Wenn true, wird der zurückgegebene Prozentsatz wie `0.12345678` aussehen, standardmäßig ist er `0.12`

</Option>
### `returnAllCompareData`

<Option type="boolean" default="false" required="no">

-   **Anmerkung:** _Kann auch für `checkElement`, `checkScreen()` und `checkFullPageScreen()` verwendet werden. Es überschreibt die Plugin-Einstellung_

Dies gibt alle Vergleichsdaten zurück, nicht nur den Abweichungsprozentsatz

</Option>
### `saveAboveTolerance`

<Option type="number" default="0" required="no">

-   **Anmerkung:** _Kann auch für `checkElement`, `checkScreen()` und `checkFullPageScreen()` verwendet werden. Es überschreibt die Plugin-Einstellung_

Zulässiger Wert von `misMatchPercentage`, der das Speichern von Bildern mit Unterschieden verhindert

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="no">

-   **Anmerkung:** _Kann auch für `checkElement`, `checkScreen()` und `checkFullPageScreen()` verwendet werden. Nur relevant, wenn [`createJsonReportFiles`](/docs/visual-testing/service-options#createjsonreportfiles) aktiviert ist._

Die Pixelnähe, die verwendet wird, um Diff-Pixel in JSON-Reports zu gruppieren. Höhere Werte fassen mehr Pixel in weniger Bounding Boxes zusammen; niedrigere Werte erzeugen genauere, aber zahlreichere Boxen.

</Option>