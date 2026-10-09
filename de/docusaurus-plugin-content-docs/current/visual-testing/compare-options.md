---
id: compare-options
title: Vergleichsoptionen
description: "Legen Sie fest, wie Screenshots verglichen werden – mit Optionen für visuelle Empfindlichkeit, pixelmatch, mobiles Ausblenden und Reporting für den Visual Service."
---

Vergleichsoptionen sind Optionen, die beeinflussen, wie der Vergleich ausgeführt wird.

:::info HINWEIS
Alle Vergleichsoptionen können bei der Instanziierung des Service oder für jeden einzelnen Aufruf von `checkElement`, `checkScreen` und `checkFullPageScreen` verwendet werden. Wenn eine Methodenoption denselben Schlüssel hat wie eine Option, die bei der Instanziierung des Service gesetzt wurde, überschreibt die Vergleichsoption der Methode den Wert der Vergleichsoption des Service.
:::

## Visuelle Empfindlichkeit

---

:::info Versionshistorie der `ignore*`-Optionen
Die `ignore*`-Presets haben ihr Verhalten einmal geändert, und zwar als Breaking Change, als die Vergleichs-Engine von ResembleJS auf Pixelmatch umgestellt wurde:

| Version | Engine | Hinweise |
| --- | --- | --- |
| v9 und älter | ResembleJS | Ursprüngliche `ignore*`-Semantik (RGB-/helligkeitsbasiert, eigene Preset-Reihenfolge von resemble). |
| v10 und neuer | Pixelmatch | `ignore*`-Presets werden auf pixelmatch-Schwellenwert-/AA-Einstellungen abgebildet. Aktuelle Standardwerte und das Verhalten sind unten pro Option dokumentiert; neue Features/Fixes darauf aufbauend werden bei der jeweiligen Option mit einem „Seit“-Hinweis gekennzeichnet. |

:::

**Reihenfolge „Letzter gewinnt“:** Wenn mehr als ein `ignore*`-Flag gleichzeitig aktiviert ist, wird tatsächlich nur ein Preset angewendet, und zwar nach dieser Reihenfolge (das spätere gewinnt): `ignoreAlpha` → `ignoreAntialiasing` → `ignoreColors` → `ignoreLess` → `ignoreNothing`. Es wird eine Warnung protokolliert, die angibt, welches Preset gewonnen hat.

### `ignoreColors`

<Option type="boolean" default="false" required="no">

-   **Anmerkung:** _Kann auch für `checkElement`, `checkScreen()` und `checkFullPageScreen()` verwendet werden. Es überschreibt die Plugin-Einstellung_
-   **Seit:** `v10.1.0`: reiner Helligkeitsvergleich unter Verwendung der Luma-Gewichtungen von resemble (`0.3/0.59/0.11`).

Vergleicht nur die Helligkeit und ignoriert Farbton-/Farbunterschiede. Preset: strenger Schwellenwert (~16/255), Anti-Aliasing wird nicht toleriert.

**Verwenden Sie dies, wenn** die Farbe selbst erwartungsgemäß variiert (z. B. themenfähige UI, Bilder, die sich je nach Umgebung umfärben), Sie aber dennoch Layout- oder Helligkeitsänderungen erkennen möchten.

</Option>
### `ignoreAlpha`

<Option type="boolean" default="false" required="no">

-   **Anmerkung:** _Kann auch für `checkElement`, `checkScreen()` und `checkFullPageScreen()` verwendet werden. Es überschreibt die Plugin-Einstellung_
-   **Seit:** `v10.1.0`: wendet seine eigene Schwellenwert-/AA-Regel unabhängig von anderen `ignore*`-Flags an.

Vergleicht Bilder und verwirft Unterschiede im Alphakanal. Preset: strenger Schwellenwert (~16/255), Anti-Aliasing wird nicht toleriert.

**Verwenden Sie dies, wenn** die Darstellung von Transparenz/Deckkraft unzuverlässig ist (z. B. Overlays, halbtransparente Elemente), die tatsächlichen Pixelfarben darunter aber wichtig sind.

</Option>
### `ignoreAntialiasing`

<Option type="boolean" default="true" required="no">

-   **Anmerkung:** _Kann auch für `checkElement`, `checkScreen()` und `checkFullPageScreen()` verwendet werden. Es überschreibt die Plugin-Einstellung_
-   **Seit:** `v10`: Standardwert auf `true` geändert (war `false` in v9 und älter).

Toleriert Pixel mit Anti-Aliasing beim Vergleich (gelockerter Schwellenwert ~32/255). Dies ist das einzige Preset, das Anti-Aliasing toleriert, und es ist standardmäßig aktiviert, damit Rauschen durch Subpixel-Rendering Vergleiche nicht von vornherein fehlschlagen lässt. Setzen Sie es auf `false` für einen strengen Vergleich, bei dem Pixel mit Anti-Aliasing als Abweichungen zählen sollen.

**Verwenden Sie dies, um** die häufigste Ursache für unzuverlässige visuelle Tests zu beheben: Text- und Formkanten, die zwischen Rechnern/Browsern mit leicht unterschiedlichem Anti-Aliasing gerendert werden, obwohl sich eigentlich nichts geändert hat.

</Option>
### `ignoreLess`

<Option type="boolean" default="false" required="no">

-   **Anmerkung:** _Kann auch für `checkElement`, `checkScreen()` und `checkFullPageScreen()` verwendet werden. Es überschreibt die Plugin-Einstellung_
-   **Seit:** `v10.1.0`: wendet seine eigene Schwellenwert-/AA-Regel unabhängig von anderen `ignore*`-Flags an.

Vergleicht Bilder mit einer gelockerten RGB-Toleranz (~16/255 pro Kanal im YIQ-Farbraum). Preset: strenger Schwellenwert, Anti-Aliasing wird nicht toleriert.

**Verwenden Sie dies, wenn** Sie etwas Spielraum für geringfügiges Rendering-Rauschen (Kompressionsartefakte im JPEG-Stil, leichte Farbrundungen) wünschen, ohne Anti-Aliasing zu tolerieren.

</Option>
### `ignoreNothing`

<Option type="boolean" default="false" required="no">

-   **Anmerkung:** _Kann auch für `checkElement`, `checkScreen()` und `checkFullPageScreen()` verwendet werden. Es überschreibt die Plugin-Einstellung_
-   **Seit:** `v10.1.0`: wendet seine eigene Schwellenwert-/AA-Regel unabhängig von anderen `ignore*`-Flags an.

Verwendet null Toleranz: Jeder Pixelunterschied zählt als Abweichung, einschließlich Anti-Aliasing.

**Verwenden Sie dies, wenn** Sie einen pixelgenauen Nachweis benötigen, dass sich überhaupt nichts geändert hat, z. B. um zu überprüfen, dass ein Fix keinerlei Regression eingeführt hat, so klein sie auch sein mag.

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

Übergibt Einstellungen direkt an [pixelmatch](https://github.com/mapbox/pixelmatch), anstatt ein `ignore*`-Preset zu verwenden. **Verwenden Sie dies, wenn die fünf `ignore*`-Presets zu grob sind:** Sie benötigen einen bestimmten Schwellenwert, den die Presets nicht bieten, oder ein Diff-Bild, das in Ihren Reports/Ihrer CI-Ausgabe tatsächlich lesbar ist, anstelle der standardmäßigen Magenta-Hervorhebung.

:::warning Gegenseitig ausschließend innerhalb desselben Optionsobjekts
Wenn ein beliebiger `ignore*`-Schlüssel und `pixelmatch` im **selben** Optionsobjekt angegeben werden, wird `CompareOptionsConflictError` ausgelöst, selbst wenn der `ignore*`-Wert `false` ist (siehe das ungültige Beispiel unten). Wählen Sie einen Modus pro Objekt: `ignore*`-Presets oder `pixelmatch`, niemals beides.

Dies gilt nur innerhalb eines Objekts. Die Service-Konfiguration und die Optionen eines Methodenaufrufs sind separate Objekte, daher **darf** ein `check*`-Aufruf einen anderen Modus als die Service-Konfiguration verwenden, z. B. verwendet der Service `ignore*`-Presets, aber ein Aufruf übergibt stattdessen `pixelmatch` (oder umgekehrt). In diesem Fall tritt kein Fehler auf, es wird lediglich eine Warnung protokolliert, die auf den Wechsel des Vergleichsmodus hinweist.
:::

| Feld | Typ | Standard | Wofür es gedacht ist |
| --- | --- | --- | --- |
| `threshold` | `number` | `0.1` | Empfindlichkeit von 0 (jeder Pixelunterschied schlägt fehl) bis 1 (fast nichts schlägt fehl). Verwenden Sie dies, um einen exakten Empfindlichkeitswert einzustellen, anstatt das nächstliegende `ignore*`-Preset zu wählen. |
| `includeAA` | `boolean` | `false` | `true` zählt Kantenpixel mit Anti-Aliasing als Abweichungen; `false` toleriert sie. Deaktivieren Sie dies, wenn Unterschiede beim Rendern von Schrift-/Formkanten zu unzuverlässigen Fehlschlägen führen. |
| `diffColor` | `[number, number, number]` | `[255, 0, 255]` (Magenta) | RGB-Farbe für abweichende Pixel im Diff-Bild. Ändern Sie sie, wenn Magenta mit Ihrer UI verschmilzt (z. B. bei einem pinkfarbenen/lila Theme) und Abweichungen schwer zu erkennen sind. |
| `aaColor` | `[number, number, number]` | `[255, 0, 255]` (Magenta) | RGB-Farbe für Pixel mit Anti-Aliasing, visuell getrennt von echten Abweichungen, sodass Sie „Rendering-Rauschen“ auf einen Blick von einem „tatsächlichen Bug“ unterscheiden können. |
| `diffColorAlt` | `[number, number, number]` | `[255, 0, 255]` (Magenta) | RGB-Farbe für Pixel, die hinzugefügt oder entfernt (nicht nur umgefärbt) wurden, nützlich, um Layoutverschiebungen von Farbänderungen zu unterscheiden. |
| `alpha` | `number` | `0.1` | Deckkraft des Diff-Overlays über dem eigentlichen Screenshot. Erhöhen Sie den Wert, damit Diffs in Reports stärker hervortreten; verringern Sie ihn, um die darunterliegende UI weiterhin klar zu sehen. Steht in keinem Zusammenhang mit dem `ignoreAlpha`-Preset. |
| `diffMask` | `boolean` | `false` | Setzen Sie `true`, um nur das reine Diff (transparenter Hintergrund) auszugeben, anstatt das Diff über Ihren Screenshot zu zeichnen, nützlich für den Aufbau eines eigenen Diff-Viewers/Reports. |
| `checkerboard` | `boolean` | `true` | Steuert, wie halbtransparente Pixel im Diff dargestellt werden. Deaktivieren Sie dies, wenn das Schachbrettmuster leicht mit echtem Inhalt in Ihren Screenshots verwechselt werden kann. |

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

**Methodenüberschreibung, wenn der Service `ignore*`-Presets verwendet:**

```js
await browser.checkScreen('homepage', {
    pixelmatch: { threshold: 0.05 },
})
```

**Methodenüberschreibung, wenn der Service `pixelmatch` verwendet:**

```js
await browser.checkScreen('homepage', {
    ignoreLess: true,
})
```

**Ungültig: löst `CompareOptionsConflictError` aus**

```js
compareOptions: {
    ignoreLess: false,
    pixelmatch: { threshold: 0.063 },
}
```

Siehe die [pixelmatch-Dokumentation](https://github.com/mapbox/pixelmatch) für die vollständige Semantik der Optionen.

</Option>
## Mobiles Ausblenden

---

### `blockOutStatusBar`

<Option type="boolean" default="true" required="no">

-   **Anmerkung:** _Kann auch für `checkElement`, `checkScreen()` und `checkFullPageScreen()` verwendet werden. Es überschreibt die Plugin-Einstellung. Dies gilt **nur für Mobilgeräte**_

Blendet die Status- und Adressleiste während Vergleichen automatisch aus. Dies verhindert Fehlschläge aufgrund von Uhrzeit, WLAN- oder Akkustatus.

</Option>
### `blockOutToolBar`

<Option type="boolean" default="true" required="no">

-   **Anmerkung:** _Kann auch für `checkElement`, `checkScreen()` und `checkFullPageScreen()` verwendet werden. Es überschreibt die Plugin-Einstellung. Dies gilt **nur für Mobilgeräte**_

Blendet die Symbolleiste automatisch aus.

</Option>
### `blockOutSideBar`

<Option type="boolean" default="true" required="no">

-   **Anmerkung:** _Kann nur für `checkScreen()` verwendet werden. Es überschreibt die Plugin-Einstellung. Dies gilt **nur für iPads**_

Blendet die Seitenleiste bei iPads im Querformat während Vergleichen automatisch aus. Dies verhindert Fehlschläge durch die native Tab-/Privat-/Lesezeichen-Komponente.

</Option>
## Ergebnisse & Reporting

---

### `rawMisMatchPercentage`

<Option type="boolean" default="false" required="no">

-   **Anmerkung:** _Kann auch für `checkElement`, `checkScreen()` und `checkFullPageScreen()` verwendet werden. Es überschreibt die Plugin-Einstellung_

Wenn true, wird der zurückgegebene Prozentsatz z. B. `0.12345678` lauten, standardmäßig ist er `0.12`

</Option>
### `returnAllCompareData`

<Option type="boolean" default="false" required="no">

-   **Anmerkung:** _Kann auch für `checkElement`, `checkScreen()` und `checkFullPageScreen()` verwendet werden. Es überschreibt die Plugin-Einstellung_

Dies gibt alle Vergleichsdaten zurück, nicht nur den Prozentsatz der Abweichung

</Option>
### `saveAboveTolerance`

<Option type="number" default="0" required="no">

-   **Anmerkung:** _Kann auch für `checkElement`, `checkScreen()` und `checkFullPageScreen()` verwendet werden. Es überschreibt die Plugin-Einstellung_

Zulässiger Wert von `misMatchPercentage`, der das Speichern von Bildern mit Unterschieden verhindert

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="no">

-   **Anmerkung:** _Kann auch für `checkElement`, `checkScreen()` und `checkFullPageScreen()` verwendet werden. Nur relevant, wenn [`createJsonReportFiles`](/docs/visual-testing/service-options#createjsonreportfiles) aktiviert ist._

Die Pixelnähe, die verwendet wird, um Diff-Pixel in JSON-Reports zu gruppieren. Höhere Werte fassen mehr Pixel in weniger Bounding Boxes zusammen; niedrigere Werte erzeugen genauere, aber zahlreichere Boxes.

</Option>