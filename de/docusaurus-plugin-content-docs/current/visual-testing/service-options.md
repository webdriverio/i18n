---
id: service-options
title: Service-Optionen
---

Service-Optionen sind die Optionen, die beim Instanziieren des Services festgelegt werden und für jeden Methodenaufruf verwendet werden.

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
                // Die Optionen
            },
        ],
    ],
    // ...
};
```

## Standard-Optionen

### `addressBarShadowPadding`

-   **Typ:** `number`
-   **Pflicht:** Nein
-   **Standard:** `6`
-   **Unterstützt:** Web

Das Padding, das zur Adressleiste auf iOS und Android hinzugefügt werden muss, um einen korrekten Ausschnitt des Viewports zu erstellen.

### `autoElementScroll`

-   **Typ:** `boolean`
-   **Pflicht:** Nein
-   **Standard:** `true`
-   **Unterstützt:** Web, Hybrid App (Webview)

Diese Option ermöglicht es Ihnen, das automatische Scrollen des Elements in die Ansicht zu deaktivieren, wenn ein Element-Screenshot erstellt wird.

### `addIOSBezelCorners`

-   **Typ:** `boolean`
-   **Pflicht:** Nein
-   **Standard:** `false`
-   **Unterstützt:** Web, Hybrid App (Webview), Native App

Fügt Bezel-Ecken und Notch/Dynamic Island zum Screenshot für iOS-Geräte hinzu.

:::info HINWEIS
Dies kann nur durchgeführt werden, wenn der Gerätename **AUTOMATISCH** bestimmt werden kann und mit der folgenden Liste normalisierter Gerätenamen übereinstimmt. Die Normalisierung wird von diesem Modul durchgeführt.
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
-   iPad Mini 6th Generation: `ipadmini`
-   iPad Air 4th Generation: `ipadair`
-   iPad Air 5th Generation: `ipadair`
-   iPad Pro (11-inch) 1st Generation: `ipadpro11`
-   iPad Pro (11-inch) 2nd Generation: `ipadpro11`
-   iPad Pro (11-inch) 3rd Generation: `ipadpro11`
-   iPad Pro (12.9-inch) 3rd Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 4th Generation: `ipadpro129`
-   iPad Pro (12.9-inch) 5th Generation: `ipadpro129`

:::

### `autoSaveBaseline`

-   **Typ:** `boolean`
-   **Pflicht:** Nein
-   **Standard:** `true`
-   **Unterstützt:** Web, Hybrid App (Webview), Native App

Wenn während des Vergleichs kein Baseline-Bild gefunden wird, wird das Bild automatisch in den Baseline-Ordner kopiert.

### `baselineFolder`

-   **Typ:** `string|()=> string`
-   **Pflicht:** Nein
-   **Standard:** `.path/to/testfile/__snapshots__/`
-   **Unterstützt:** Web, Hybrid App (Webview), Native App

Das Verzeichnis, das alle Baseline-Bilder enthält, die während des Vergleichs verwendet werden. Wenn nicht gesetzt, wird der Standardwert verwendet, der die Dateien in einem `__snapshots__/`-Ordner neben der Spec speichert, die die visuellen Tests ausführt. Eine Funktion, die einen `string` zurückgibt, kann auch verwendet werden, um den Wert von `baselineFolder` festzulegen:

```js
{
    baselineFolder: path.join(process.cwd(), 'foo', 'bar', 'baseline')
},
// ODER
{
    baselineFolder: () => {
        // Hier etwas Magie ausführen
        return path.join(process.cwd(), 'foo', 'bar', 'baseline');
    }
}
```

### `clearRuntimeFolder`

-   **Typ:** `boolean`
-   **Pflicht:** Nein
-   **Standard:** `false`
-   **Unterstützt:** Web, Hybrid App (Webview), Native App

Löscht den Runtime-Ordner (`actual` & `diff`) bei der Initialisierung

:::info HINWEIS
Dies funktioniert nur, wenn der [`screenshotPath`](#screenshotpath) über die Plugin-Optionen festgelegt wird und **FUNKTIONIERT NICHT**, wenn Sie die Ordner in den Methoden festlegen
:::

### `createJsonReportFiles` **(NEU)**

-   **Typ:** `boolean`
-   **Pflicht:** Nein
-   **Standard:** `false`

Sie haben jetzt die Möglichkeit, die Vergleichsergebnisse in eine JSON-Berichtsdatei zu exportieren. Durch die Option `createJsonReportFiles: true` wird für jedes verglichene Bild ein Bericht im Ordner `actual` neben jedem `actual`-Bildergebnis gespeichert. Die Ausgabe sieht wie folgt aus:

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

Nach Ausführung aller Tests wird eine neue JSON-Datei mit der Sammlung der Vergleiche generiert und im Stammverzeichnis Ihres `actual`-Ordners gespeichert. Die Daten sind gruppiert nach:

-   `describe` für Jasmine/Mocha oder `Feature` für CucumberJS
-   `it` für Jasmine/Mocha oder `Scenario` für CucumberJS
    und dann sortiert nach:
-   `commandName`, das sind die Vergleichsmethodennamen, die zum Vergleichen der Bilder verwendet werden
-   `instanceData`, zuerst Browser, dann Gerät, dann Plattform
    es wird wie folgt aussehen

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

Die Berichtsdaten geben Ihnen die Möglichkeit, Ihren eigenen visuellen Bericht zu erstellen, ohne die gesamte Magie und Datensammlung selbst durchführen zu müssen.

:::info HINWEIS
Sie müssen `@wdio/visual-testing` Version `5.2.0` oder höher verwenden
:::

### `disableBlinkingCursor`

-   **Typ:** `boolean`
-   **Pflicht:** Nein
-   **Standard:** `false`
-   **Unterstützt:** Web, Hybrid App (Webview)

Aktiviert/Deaktiviert das "Blinken" des Cursors in allen `input`, `textarea`, `[contenteditable]` in der Anwendung. Wenn auf `true` gesetzt, wird der Cursor vor dem Erstellen eines Screenshots auf `transparent` gesetzt und nach Abschluss zurückgesetzt

### `disableCSSAnimation`

-   **Typ:** `boolean`
-   **Pflicht:** Nein
-   **Standard:** `false`
-   **Unterstützt:** Web, Hybrid App (Webview)

Aktiviert/Deaktiviert alle CSS-Animationen in der Anwendung. Wenn auf `true` gesetzt, werden alle Animationen vor dem Erstellen eines Screenshots deaktiviert und nach Abschluss zurückgesetzt

### `enableLayoutTesting`

-   **Typ:** `boolean`
-   **Pflicht:** Nein
-   **Standard:** `false`
-   **Unterstützt:** Web

Dies blendet den gesamten Text auf einer Seite aus, sodass nur das Layout für den Vergleich verwendet wird. Das Ausblenden erfolgt durch Hinzufügen des Stils `'color': 'transparent !important'` zu **jedem** Element.

Für die Ausgabe siehe [Test-Ausgabe](/docs/visual-testing/test-output#enablelayouttesting)

:::info
Bei Verwendung dieses Flags erhält jedes Element, das Text enthält (also nicht nur `p, h1, h2, h3, h4, h5, h6, span, a, li`, sondern auch `div|button|..`), diese Eigenschaft. Es gibt **keine** Option, dies anzupassen.
:::

### `formatImageName`

-   **Typ:** `string`
-   **Pflicht:** Nein
-   **Standard:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **Unterstützt:** Web, Hybrid App (Webview), Native App

Der Name der gespeicherten Bilder kann angepasst werden, indem der Parameter `formatImageName` mit einer Formatzeichenfolge wie folgt übergeben wird:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

Die folgenden Variablen können zur Formatierung der Zeichenfolge übergeben werden und werden automatisch aus den Instanzfähigkeiten gelesen.
Wenn sie nicht bestimmt werden können, werden die Standardwerte verwendet.

-   `browserName`: Der Name des Browsers in den bereitgestellten Capabilities
-   `browserVersion`: Die Version des Browsers in den Capabilities
-   `deviceName`: Der Gerätename aus den Capabilities
-   `dpr`: Das Gerätepixelverhältnis
-   `height`: Die Höhe des Bildschirms
-   `logName`: Der logName aus den Capabilities
-   `mobile`: Dies fügt `_app` oder den Browsernamen nach dem `deviceName` hinzu, um App-Screenshots von Browser-Screenshots zu unterscheiden
-   `platformName`: Der Name der Plattform in den bereitgestellten Capabilities
-   `platformVersion`: Die Version der Plattform in den Capabilities
-   `tag`: Das Tag, das in den aufgerufenen Methoden bereitgestellt wird
-   `width`: Die Breite des Bildschirms

:::info

Sie können keine benutzerdefinierten Pfade/Ordner in `formatImageName` angeben. Wenn Sie den Pfad ändern möchten, überprüfen Sie bitte die Änderung der folgenden Optionen:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) pro Methode

:::

### `fullPageScrollTimeout`

-   **Typ:** `number`
-   **Pflicht:** Nein
-   **Standard:** `1500`
-   **Unterstützt:** Web

Das Timeout in Millisekunden, das nach einem Scroll gewartet werden soll. Dies kann helfen, Seiten mit Lazy Loading zu identifizieren.

:::info

Dies funktioniert nur, wenn die Service-/Methodenoption `userBasedFullPageScreenshot` auf `true` gesetzt ist, siehe auch [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **Typ:** `boolean`
-   **Pflicht:** Nein
-   **Standard:** `true`
-   **Unterstützt:** Web, Hybrid App (Webview)

Blendet Scrollbalken in der Anwendung aus. Wenn auf true gesetzt, werden alle Scrollbalken vor dem Erstellen eines