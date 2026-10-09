---
id: service-options
title: Service-Optionen
description: "Konfigurieren Sie die Standardoptionen für den Visual Service, einschließlich Screenshot-Erfassung, Ganzseiten-Screenshots, Baselines, Ordnern und Reporting."
---

Service-Optionen sind die Optionen, die beim Instanziieren des Service festgelegt werden können und für jeden Methodenaufruf verwendet werden.

```js
// wdio.conf.(js|ts)
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // The options
            },
        ],
    ],
    // ...
};
```

# Standardoptionen

## Screenshot-Erfassung

---

### `hideScrollBars`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

Blendet Scrollbalken in der Anwendung aus. Wenn auf true gesetzt, werden alle Scrollbalken vor dem Erstellen eines Screenshots deaktiviert. Dies ist standardmäßig auf `true` gesetzt, um zusätzliche Probleme zu vermeiden.

</Option>
### `disableBlinkingCursor`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview)">

Aktiviert/deaktiviert das „Blinken“ des Cursors in allen `input`-, `textarea`- und `[contenteditable]`-Elementen der Anwendung. Wenn auf `true` gesetzt, wird der Cursor vor dem Erstellen eines Screenshots auf `transparent` gesetzt
und danach wieder zurückgesetzt

</Option>
### `disableCSSAnimation`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview)">

Aktiviert/deaktiviert alle CSS-Animationen in der Anwendung. Wenn auf `true` gesetzt, werden alle Animationen vor dem Erstellen eines Screenshots deaktiviert
und danach wieder zurückgesetzt

</Option>
### `enableLayoutTesting`

<Option type="boolean" default="false" required="No" contexts="Web">

Dadurch wird der gesamte Text auf einer Seite ausgeblendet, sodass nur das Layout für den Vergleich verwendet wird. Das Ausblenden erfolgt, indem der Style `'color': 'transparent !important'` zu **jedem** Element hinzugefügt wird.

Für die Ausgabe siehe [Test Output](/docs/visual-testing/test-output#enablelayouttesting)

:::info
Durch die Verwendung dieses Flags erhält jedes Element, das Text enthält (also nicht nur `p, h1, h2, h3, h4, h5, h6, span, a, li`, sondern auch `div|button|..`), diese Eigenschaft. Es gibt **keine** Möglichkeit, dies anzupassen.
:::

</Option>
### `ignoreRegionPadding`

<Option type="number" default="1" required="No" contexts="Web, Hybrid App (Webview)">

Padding in Gerätepixeln, das an jeder Seite von Ignore-Regionen hinzugefügt wird, wodurch jede Region um das 2-Fache dieses Wertes breiter und höher wird. Dies hilft, Abweichungen von 1 px an den Rändern zu vermeiden, die auf Displays mit hoher DPR oder beim BiDi-Screenshot-Protokoll auftreten können. Auf `0` setzen, um dies zu deaktivieren.

</Option>
### `waitForFontsLoaded`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

Schriftarten, einschließlich Schriftarten von Drittanbietern, können synchron oder asynchron geladen werden. Asynchrones Laden bedeutet, dass Schriftarten möglicherweise erst geladen werden, nachdem WebdriverIO festgestellt hat, dass eine Seite vollständig geladen ist. Um Probleme bei der Schriftdarstellung zu vermeiden, wartet dieses Modul standardmäßig, bis alle Schriftarten geladen sind, bevor ein Screenshot erstellt wird.

</Option>
## Ganzseiten-Screenshots

---

### `userBasedFullPageScreenshot`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview) **Introduced in visual-service@7.0.0">

Standardmäßig werden Ganzseiten-Screenshots im Desktop-Web mit dem WebDriver-BiDi-Protokoll erstellt, das schnelle, stabile und konsistente Screenshots ohne Scrollen ermöglicht.
Wenn userBasedFullPageScreenshot auf true gesetzt ist, simuliert der Screenshot-Prozess einen echten Benutzer: Es wird durch die Seite gescrollt, es werden Screenshots in Viewport-Größe erstellt und diese anschließend zusammengefügt. Diese Methode ist nützlich für Seiten mit Lazy-Loading-Inhalten oder dynamischem Rendering, das von der Scrollposition abhängt.

Verwenden Sie diese Option, wenn Ihre Seite darauf angewiesen ist, dass Inhalte beim Scrollen geladen werden, oder wenn Sie das Verhalten älterer Screenshot-Methoden beibehalten möchten.

</Option>
### `fullPageScrollTimeout`

<Option type="number" default="1500" required="No" contexts="Web">

Das Timeout in Millisekunden, das nach einem Scrollvorgang gewartet wird. Dies kann helfen, Seiten mit Lazy Loading zu erkennen.

:::info

Dies funktioniert nur, wenn die Service-/Methodenoption `userBasedFullPageScreenshot` auf `true` gesetzt ist, siehe auch [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedfullpagescreenshot)

:::

</Option>
## Mobil & Gerät

---

### `isHybridApp`

<Option type="boolean" default="false" required="No" contexts="Hybrid App (Webview)">

Setzen Sie dies auf `true`, wenn Sie eine Hybrid-App testen (eine native Hülle mit einem oder mehreren eingebetteten Webviews). Dadurch wird angepasst, wie das Modul die Ausschnitte für Statusleiste und Adressleiste bei Webview-basierten Bildschirmen behandelt, wobei auf sichere Standardwerte zurückgegriffen wird, wenn keine nativen Daten zum Geräterechteck verfügbar sind.

</Option>
### `addIOSBezelCorners`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview), Native App">

Fügt dem Screenshot bei iOS-Geräten Rahmenecken und Notch/Dynamic Island hinzu.

:::info HINWEIS
Dies ist nur möglich, wenn der Gerätename automatisch ermittelt werden **KANN** und mit der folgenden Liste normalisierter Gerätenamen übereinstimmt. Die Normalisierung wird von diesem Modul durchgeführt.
**iPhone:**

-   iPhone X: `iphonex`
-   iPhone XS: `iphonexs`
-   iPhone XS Max: `iphonexsmax`
-   iPhone XR: `iphonexr`
-   iPhone 11: `iphone11`
-   iPhone 11 Pro: `iphone11pro`
-   iPhone 11 Pro Max: `iphone11promax`
-   iPhone 12: `iphone12`
-   iPhone 12 Mini: `iphone12mini`
-   iPhone 12 Pro: `iphone12pro`
-   iPhone 12 Pro Max: `iphone12promax`
-   iPhone 13: `iphone13`
-   iPhone 13 Mini: `iphone13mini`
-   iPhone 13 Pro: `iphone13pro`
-   iPhone 13 Pro Max: `iphone13promax`
-   iPhone 14: `iphone14`
-   iPhone 14 Plus: `iphone14plus`
-   iPhone 14 Pro: `iphone14pro`
-   iPhone 14 Pro Max: `iphone14promax`
    **iPads:**
-   iPad Mini 6. Generation: `ipadmini`
-   iPad Air 4. Generation: `ipadair`
-   iPad Air 5. Generation: `ipadair`
-   iPad Pro (11 Zoll) 1. Generation: `ipadpro11`
-   iPad Pro (11 Zoll) 2. Generation: `ipadpro11`
-   iPad Pro (11 Zoll) 3. Generation: `ipadpro11`
-   iPad Pro (12,9 Zoll) 3. Generation: `ipadpro129`
-   iPad Pro (12,9 Zoll) 4. Generation: `ipadpro129`
-   iPad Pro (12,9 Zoll) 5. Generation: `ipadpro129`
:::

</Option>
### `addressBarShadowPadding`

<Option type="number" default="6" required="No" contexts="Web">

Das Padding, das unter iOS und Android zur Adressleiste hinzugefügt werden muss, um einen korrekten Ausschnitt des Viewports zu erstellen.

</Option>
### `toolBarShadowPadding`

<Option type="number" default={`6 for Android and \`15\` for iOS (\`6\` by default and \`9\` will be added automatically for the possible home bar on iPhones with a notch or iPads that have a home bar)`} required="No" contexts="Web">

Das Padding, das unter iOS und Android zur Symbolleiste hinzugefügt werden muss, um einen korrekten Ausschnitt des Viewports zu erstellen.

</Option>
## Datei- & Ordnerverwaltung

---

### `baselineFolder`

<Option type="string|()=> string" default=".path/to/testfile/__snapshots__/" required="No" contexts="Web, Hybrid App (Webview), Native App">

Das Verzeichnis, das alle Baseline-Bilder enthält, die beim Vergleich verwendet werden. Wenn nicht gesetzt, wird der Standardwert verwendet, wodurch die Dateien in einem `__snapshots__/`-Ordner neben der Spec gespeichert werden, die die visuellen Tests ausführt. Eine Funktion, die einen `string` zurückgibt, kann ebenfalls verwendet werden, um den Wert von `baselineFolder` festzulegen:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// OR
{
    baselineFolder: () => {
        // Do some magic here
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

</Option>
### `screenshotPath`

<Option type="string | () => string" default=".tmp/" required="no" contexts="Web, Hybrid App (Webview), Native App">

Das Verzeichnis, das alle aktuellen/abweichenden Screenshots enthält. Wenn nicht gesetzt, wird der Standardwert verwendet. Eine Funktion, die
einen String zurückgibt, kann ebenfalls verwendet werden, um den Wert von screenshotPath festzulegen:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// OR
{
    screenshotPath: () => {
        // Do some magic here
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

</Option>
### `clearRuntimeFolder`

<Option type="boolean" default="false" required="No" contexts="Web, Hybrid App (Webview), Native App">

Löscht den Laufzeitordner (`actual` & `diff) bei der Initialisierung

:::info HINWEIS
Dies funktioniert nur, wenn der [`screenshotPath`](#screenshotpath) über die Plugin-Optionen gesetzt wird, und **FUNKTIONIERT NICHT**, wenn Sie die Ordner in den Methoden festlegen
:::

</Option>
### `savePerInstance`

<Option type="boolean" default="false" required="no" contexts="Web, Hybrid App (Webview), Native App">

Speichert die Bilder pro Instanz in einem separaten Ordner, sodass beispielsweise alle Chrome-Screenshots in einem Chrome-Ordner wie `desktop_chrome` gespeichert werden.

</Option>
### `formatImageName`

<Option type="string" default={`{tag}-{browserName}-{width}x{height}-dpr-{dpr}`} required="No" contexts="Web, Hybrid App (Webview), Native App">

Der Name der gespeicherten Bilder kann angepasst werden, indem der Parameter `formatImageName` mit einem Format-String wie diesem übergeben wird:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

Die folgenden Variablen können übergeben werden, um den String zu formatieren, und werden automatisch aus den Capabilities der Instanz ausgelesen.
Wenn sie nicht ermittelt werden können, werden die Standardwerte verwendet.

-   `browserName`: Der Name des Browsers in den angegebenen Capabilities
-   `browserVersion`: Die in den Capabilities angegebene Version des Browsers
-   `deviceName`: Der Gerätename aus den Capabilities
-   `dpr`: Das Device Pixel Ratio
-   `height`: Die Höhe des Bildschirms
-   `logName`: Der logName aus den Capabilities
-   `mobile`: Fügt `_app` oder den Browsernamen nach dem `deviceName` hinzu, um App-Screenshots von Browser-Screenshots zu unterscheiden
-   `platformName`: Der Name der Plattform in den angegebenen Capabilities
-   `platformVersion`: Die in den Capabilities angegebene Version der Plattform
-   `tag`: Der Tag, der in den aufgerufenen Methoden angegeben wird
-   `width`: Die Breite des Bildschirms

:::info

Sie können im `formatImageName` keine benutzerdefinierten Pfade/Ordner angeben. Wenn Sie den Pfad ändern möchten, prüfen Sie bitte die Anpassung der folgenden Optionen:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) pro Methode

:::

</Option>
## Baseline- & Speicherverhalten

---

### `autoSaveBaseline`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview), Native App">

Wenn beim Vergleich kein Baseline-Bild gefunden wird, wird das Bild automatisch in den Baseline-Ordner kopiert.

</Option>
### `autoElementScroll`

<Option type="boolean" default="true" required="No" contexts="Web, Hybrid App (Webview)">

Mit dieser Option können Sie das automatische Scrollen des Elements in den sichtbaren Bereich deaktivieren, wenn ein Element-Screenshot erstellt wird.

</Option>
### `alwaysSaveActualImage`

<Option type="boolean" default="true" required="No" contexts="All">

Wenn diese Option auf `false` gesetzt wird, wird:

- das aktuelle Bild nicht gespeichert, wenn es **keinen** Unterschied gibt
- die JSON-Report-Datei nicht gespeichert, wenn `createJsonReportFiles` auf `true` gesetzt ist. Außerdem wird in den Logs eine Warnung angezeigt, dass `createJsonReportFiles` deaktiviert ist

Dies sollte zu einer besseren Performance führen, da keine Dateien in das System geschrieben werden, und sollte sicherstellen, dass sich im `actual`-Ordner nicht zu viel Ballast ansammelt.

</Option>
## Reporting

---

### `createJsonReportFiles` **(NEU)**

<Option type="boolean" default="false" required="No">

Sie haben jetzt die Möglichkeit, die Vergleichsergebnisse in eine JSON-Report-Datei zu exportieren. Durch Angabe der Option `createJsonReportFiles: true` erstellt jedes verglichene Bild einen Report, der im `actual`-Ordner neben jedem `actual`-Bildergebnis gespeichert wird. Die Ausgabe sieht folgendermaßen aus:

```json
{
    "parent": "check methods",
    "test": "should fail comparing with a baseline",
    "tag": "examplePageFail",
    "instanceData": {
        "browser": {
            "name": "chrome-headless-shell",
            "version": "126.0.6478.183"
        },
        "platform": {
            "name": "mac",
            "version": "not-known"
        }
    },
    "commandName": "checkScreen",
    "boundingBoxes": {
        "diffBoundingBoxes": [
            {
                "left": 1088,
                "top": 717,
                "right": 1186,
                "bottom": 730
            }
            //....
        ],
        "ignoredBoxes": [
            {
                "left": 159,
                "top": 652,
                "right": 356,
                "bottom": 703
            }
            //...
        ]
    },
    "fileData": {
        "actualFilePath": "/Users/wdio/visual-testing/.tmp/actual/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "baselineFilePath": "/Users/wdio/visual-testing/localBaseline/desktop_chrome-headless-shellexamplePageFail-local-chrome-latest-1366x768.png",
        "diffFilePath": "/Users/wdio/visual-testing/.tmp/diff/desktop_chrome-headless-shell/examplePageFail-local-chrome-latest-1366x768png",
        "fileName": "examplePageFail-local-chrome-latest-1366x768.png",
        "size": {
            "actual": {
                "height": 768,
                "width": 1366
            },
            "baseline": {
                "height": 768,
                "width": 1366
            },
            "diff": {
                "height": 768,
                "width": 1366
            }
        }
    },
    "misMatchPercentage": "12.90",
    "rawMisMatchPercentage": 12.900729014153246
}
```

Wenn alle Tests ausgeführt wurden, wird eine neue JSON-Datei mit der Sammlung der Vergleiche erstellt, die sich im Stammverzeichnis Ihres `actual`-Ordners befindet. Die Daten sind gruppiert nach:

-   `describe` für Jasmine/Mocha oder `Feature` für CucumberJS
-   `it` für Jasmine/Mocha oder `Scenario` für CucumberJS
    und anschließend sortiert nach:
-   `commandName`, das sind die Namen der Vergleichsmethoden, die zum Vergleichen der Bilder verwendet werden
-   `instanceData`, zuerst Browser, dann Gerät, dann Plattform
    es sieht folgendermaßen aus

```json
[
    {
        "description": "check methods",
        "data": [
            {
                "test": "should fail comparing with a baseline",
                "data": [
                    {
                        "tag": "examplePageFail",
                        "instanceData": {},
                        "commandName": "checkScreen",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "14.34",
                        "rawMisMatchPercentage": 14.335403703025868
                    },
                    {
                        "tag": "exampleElementFail",
                        "instanceData": {},
                        "commandName": "checkElement",
                        "framework": "mocha",
                        "boundingBoxes": {
                            "diffBoundingBoxes": [],
                            "ignoredBoxes": []
                        },
                        "fileData": {},
                        "misMatchPercentage": "1.34",
                        "rawMisMatchPercentage": 1.335403703025868
                    }
                ]
            }
        ]
    }
]
```

Die Report-Daten geben Ihnen die Möglichkeit, Ihren eigenen visuellen Report zu erstellen, ohne die ganze Magie und Datensammlung selbst erledigen zu müssen.

:::info HINWEIS
Sie benötigen `@wdio/visual-testing` in Version `5.2.0` oder höher
:::

</Option>
### `diffPixelBoundingBoxProximity`

<Option type="number" default="5" required="No" contexts="Web, Hybrid App (Webview), Native App">

Die Pixelnähe, die verwendet wird, um Diff-Pixel im durch [`createJsonReportFiles`](#createjsonreportfiles) erzeugten JSON-Report zu gruppieren. Höhere Werte fassen mehr Pixel in weniger Bounding Boxes zusammen; niedrigere Werte erzeugen genauere, aber zahlreichere Boxen.

</Option>
## Allgemein

---

### `logLevel`

<Option type="string" default="info" required="No" contexts="Web, Hybrid App (Webview), Native App">

Fügt zusätzliche Logs hinzu, Optionen sind `debug | info | warn | silent`

Fehler werden immer in der Konsole protokolliert.

</Option>
## Tabbable-Optionen

:::info HINWEIS

Dieses Modul unterstützt auch das Zeichnen der Art und Weise, wie ein Benutzer mit seiner Tastatur durch die Website _tabben_ würde, indem Linien und Punkte von einem tabbable Element zum nächsten gezeichnet werden.<br/>
Die Arbeit ist inspiriert von dem Blogbeitrag von [Viv Richards](https://github.com/vivrichards600) über ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
Die Auswahl der tabbable Elemente basiert auf dem Modul [tabbable](https://github.com/davidtheclark/tabbable). Bei Problemen bezüglich des Tabbings prüfen Sie bitte die [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) und insbesondere den [More details section](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Die Optionen, die für die Linien und Punkte geändert werden können, wenn Sie die `{save|check}Tabbable`-Methoden verwenden. Die Optionen werden unten erläutert.

</Option>
#### `tabbableOptions.circle`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Die Optionen zum Ändern des Kreises.

</Option>
##### `tabbableOptions.circle.backgroundColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Die Hintergrundfarbe des Kreises.

</Option>
##### `tabbableOptions.circle.borderColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Die Rahmenfarbe des Kreises.

</Option>
##### `tabbableOptions.circle.borderWidth`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Die Rahmenbreite des Kreises.

</Option>
##### `tabbableOptions.circle.fontColor`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Die Schriftfarbe des Textes im Kreis. Dies wird nur angezeigt, wenn [`showNumber`](./#tabbableoptionscircleshownumber) auf `true` gesetzt ist.

</Option>
##### `tabbableOptions.circle.fontFamily`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Die Schriftfamilie des Textes im Kreis. Dies wird nur angezeigt, wenn [`showNumber`](./#tabbableoptionscircleshownumber) auf `true` gesetzt ist.

Stellen Sie sicher, dass Sie Schriftarten festlegen, die von den Browsern unterstützt werden.

</Option>
##### `tabbableOptions.circle.fontSize`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Die Schriftgröße des Textes im Kreis. Dies wird nur angezeigt, wenn [`showNumber`](./#tabbableoptionscircleshownumber) auf `true` gesetzt ist.

</Option>
##### `tabbableOptions.circle.size`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Die Größe des Kreises.

</Option>
##### `tabbableOptions.circle.showNumber`

<Option type="showNumber" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Zeigt die Nummer der Tab-Reihenfolge im Kreis an.

</Option>
#### `tabbableOptions.line`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Die Optionen zum Ändern der Linie.

</Option>
##### `tabbableOptions.line.color`

<Option type="string" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Die Farbe der Linie.

</Option>
##### `tabbableOptions.line.width`

<Option type="number" default="See [here](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%402.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) for all default values" required="No" contexts="Web">

Die Breite der Linie.

</Option>
## Vergleichsoptionen

### `compareOptions`

<Option type="object" default="See [here](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) for all default values" required="No" contexts="Web, Hybrid App (Webview), Native App (See [Method Compare options](./method-options#compare-check-options) for more information)">

Die Vergleichsoptionen können auch als Service-Optionen festgelegt werden. Sie werden in den [Method Compare options](/docs/visual-testing/method-options#compare-check-options) beschrieben.

</Option>