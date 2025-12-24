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
                // The options
            },
        ],
    ],
    // ...
};
```

## Standard-Optionen

### `addressBarShadowPadding`

-   **Typ:** `number`
-   **Pflichtfeld:** Nein
-   **Standard:** `6`
-   **Unterstützte Anwendungskontexte:** Web

Das Padding, das zur Adressleiste auf iOS und Android hinzugefügt werden muss, um einen korrekten Ausschnitt des Viewports zu erstellen.

### `autoElementScroll`

-   **Typ:** `boolean`
-   **Pflichtfeld:** Nein
-   **Standard:** `true`
-   **Unterstützte Anwendungskontexte:** Web, Hybrid App (Webview)

Mit dieser Option können Sie das automatische Scrollen des Elements in die Ansicht deaktivieren, wenn ein Element-Screenshot erstellt wird.

### `addIOSBezelCorners`

-   **Typ:** `boolean`
-   **Pflichtfeld:** Nein
-   **Standard:** `false`
-   **Unterstützte Anwendungskontexte:** Web, Hybrid App (Webview), Native App

Fügt Blendrahmenecken und Notch/Dynamic Island zum Screenshot für iOS-Geräte hinzu.

:::info HINWEIS
Dies kann nur erfolgen, wenn der Gerätename **AUTOMATISCH** bestimmt werden kann und mit der folgenden Liste normalisierter Gerätenamen übereinstimmt. Die Normalisierung wird von diesem Modul durchgeführt.
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

### `autoSaveBaseline`

-   **Typ:** `boolean`
-   **Pflichtfeld:** Nein
-   **Standard:** `true`
-   **Unterstützte Anwendungskontexte:** Web, Hybrid App (Webview), Native App

Wenn während des Vergleichs kein Baseline-Bild gefunden wird, wird das Bild automatisch in den Baseline-Ordner kopiert.

### `alwaysSaveActualImage`

-   **Typ:** `boolean`
-   **Pflichtfeld:** Nein
-   **Standard:** `true`
-   **Unterstützte Anwendungskontexte:** Alle

Wenn diese Option auf `false` gesetzt wird:

- wird das aktuelle Bild nicht gespeichert, wenn es **keinen** Unterschied gibt
- wird die jsonreport-Datei nicht gespeichert, wenn `createJsonReportFiles` auf `true` gesetzt ist. Es wird auch eine Warnung in den Logs angezeigt, dass `createJsonReportFiles` deaktiviert ist

Dies sollte zu einer besseren Leistung führen, da keine Dateien in das System geschrieben werden, und sollte sicherstellen, dass es nicht zu viel Rauschen im Ordner `actual` gibt.

### `baselineFolder`

-   **Typ:** `string|()=> string`
-   **Pflichtfeld:** Nein
-   **Standard:** `.path/to/testfile/__snapshots__/`
-   **Unterstützte Anwendungskontexte:** Web, Hybrid App (Webview), Native App

Das Verzeichnis, das alle Baseline-Bilder enthält, die während des Vergleichs verwendet werden. Wenn nicht gesetzt, wird der Standardwert verwendet, der die Dateien in einem `__snapshots__/`-Ordner neben der Spezifikation speichert, die die visuellen Tests ausführt. Eine Funktion, die einen `string` zurückgibt, kann auch verwendet werden, um den Wert von `baselineFolder` zu setzen:

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
-   **Pflichtfeld:** Nein
-   **Standard:** `false`
-   **Unterstützte Anwendungskontexte:** Web, Hybrid App (Webview), Native App

Löscht den Runtime-Ordner (`actual` & `diff`) bei der Initialisierung

:::info HINWEIS
Dies funktioniert nur, wenn der [`screenshotPath`](#screenshotpath) über die Plugin-Optionen festgelegt wird, und **FUNKTIONIERT NICHT**, wenn Sie die Ordner in den Methoden festlegen
:::

### `createJsonReportFiles` **(NEU)**

-   **Typ:** `boolean`
-   **Pflichtfeld:** Nein
-   **Standard:** `false`

Sie haben jetzt die Möglichkeit, die Vergleichsergebnisse in eine JSON-Berichtsdatei zu exportieren. Wenn Sie die Option `createJsonReportFiles: true` angeben, wird für jedes verglichene Bild ein Bericht erstellt, der im Ordner `actual` neben jedem `actual`-Bildergebnis gespeichert wird. Die Ausgabe sieht so aus:

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

Nach Abschluss aller Tests wird eine neue JSON-Datei mit der Sammlung der Vergleiche generiert und im Stammverzeichnis Ihres Ordners `actual` abgelegt. Die Daten sind gruppiert nach:

-   `describe` für Jasmine/Mocha oder `Feature` für CucumberJS
-   `it` für Jasmine/Mocha oder `Scenario` für CucumberJS
    und dann sortiert nach:
-   `commandName`, dies sind die Vergleichsmethodennamen, die zum Vergleich der Bilder verwendet werden
-   `instanceData`, zuerst Browser, dann Gerät, dann Plattform
    es wird so aussehen

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

Die Berichtsdaten bieten Ihnen die Möglichkeit, Ihren eigenen visuellen Bericht zu erstellen, ohne die gesamte Magie und Datensammlung selbst durchführen zu müssen.

:::info HINWEIS
Sie benötigen `@wdio/visual-testing` Version `5.2.0` oder höher
:::

### `disableBlinkingCursor`

-   **Typ:** `boolean`
-   **Pflichtfeld:** Nein
-   **Standard:** `false`
-   **Unterstützte Anwendungskontexte:** Web, Hybrid App (Webview)

Aktivieren/Deaktivieren des "Blinkens" des Cursors in allen `input`, `textarea`, `[contenteditable]` in der Anwendung. Wenn auf `true` gesetzt, wird der Cursor vor dem Aufnehmen eines Screenshots auf `transparent` gesetzt und zurückgesetzt, wenn fertig

### `disableCSSAnimation`

-   **Typ:** `boolean`
-   **Pflichtfeld:** Nein
-   **Standard:** `false`
-   **Unterstützte Anwendungskontexte:** Web, Hybrid App (Webview)

Aktivieren/Deaktivieren aller CSS-Animationen in der Anwendung. Wenn auf `true` gesetzt, werden alle Animationen vor dem Aufnehmen eines Screenshots deaktiviert und zurückgesetzt, wenn fertig

### `enableLayoutTesting`

-   **Typ:** `boolean`
-   **Pflichtfeld:** Nein
-   **Standard:** `false`
-   **Unterstützte Anwendungskontexte:** Web

Dies verbirgt den gesamten Text auf einer Seite, so dass nur das Layout für den Vergleich verwendet wird. Das Verbergen erfolgt durch Hinzufügen des Stils `'color': 'transparent !important'` zu **jedem** Element.

Für die Ausgabe siehe [Test-Ausgabe](/docs/visual-testing/test-output#enablelayouttesting)

:::info
Durch die Verwendung dieses Flags erhält jedes Element, das Text enthält (also nicht nur `p, h1, h2, h3, h4, h5, h6, span, a, li`, sondern auch `div|button|..`), diese Eigenschaft. Es gibt **keine** Option, dies anzupassen.
:::

### `formatImageName`

-   **Typ:** `string`
-   **Pflichtfeld:** Nein
-   **Standard:** `{tag}-{browserName}-{width}x{height}-dpr-{dpr}`
-   **Unterstützte Anwendungskontexte:** Web, Hybrid App (Webview), Native App

Der Name der gespeicherten Bilder kann angepasst werden, indem der Parameter `formatImageName` mit einem Formatstring wie:

```sh
{tag}-{browserName}-{width}x{height}-dpr-{dpr}
```

Die folgenden Variablen können übergeben werden, um den String zu formatieren, und werden automatisch aus den Instanzfähigkeiten gelesen.
Wenn sie nicht bestimmt werden können, werden die Standardwerte verwendet.

-   `browserName`: Der Name des Browsers in den bereitgestellten Capabilities
-   `browserVersion`: Die Version des Browsers, die in den Capabilities angegeben ist
-   `deviceName`: Der Gerätename aus den Capabilities
-   `dpr`: Das Gerätepixelverhältnis
-   `height`: Die Höhe des Bildschirms
-   `logName`: Der logName aus den Capabilities
-   `mobile`: Dies fügt `_app` oder den Browser-Namen nach dem `deviceName` hinzu, um App-Screenshots von Browser-Screenshots zu unterscheiden
-   `platformName`: Der Name der Plattform in den bereitgestellten Capabilities
-   `platformVersion`: Die Version der Plattform, die in den Capabilities angegeben ist
-   `tag`: Das Tag, das in den aufgerufenen Methoden angegeben wird
-   `width`: Die Breite des Bildschirms

:::info

Sie können keine benutzerdefinierten Pfade/Ordner im `formatImageName` angeben. Wenn Sie den Pfad ändern möchten, überprüfen Sie bitte die Änderung der folgenden Optionen:

- [`baselineFolder`](/docs/visual-testing/service-options#baselinefolder)
- [`screenshotPath`](/docs/visual-testing/service-options#screenshotpath)
- [`folderOptions`](/docs/visual-testing/method-options#folder-options) pro Methode

:::

### `fullPageScrollTimeout`

-   **Typ:** `number`
-   **Pflichtfeld:** Nein
-   **Standard:** `1500`
-   **Unterstützte Anwendungskontexte:** Web

Die Timeout-Zeit in Millisekunden nach einem Scroll. Dies kann bei der Identifizierung von Seiten mit Lazy Loading helfen.

:::info

Dies funktioniert nur, wenn die Service/Methoden-Option `userBasedFullPageScreenshot` auf `true` gesetzt ist, siehe auch [`userBasedFullPageScreenshot`](/docs/visual-testing/service-options#userbasedbullpagescreenshot)

:::

### `hideScrollBars`

-   **Typ:** `boolean`
-   **Pflichtfeld:** Nein
-   **Standard:** `true`
-   **Unterstützte Anwendungskontexte:** Web, Hybrid App (Webview)

Scrollbars in der Anwendung ausblenden. Wenn auf true gesetzt, werden alle Scrollbars vor dem Aufnehmen eines Screenshots deaktiviert. Dies ist standardmäßig auf `true` gesetzt, um zusätzliche Probleme zu vermeiden.

### `logLevel`

-   **Typ:** `string`
-   **Pflichtfeld:** Nein
-   **Standard:** `info`
-   **Unterstützte Anwendungskontexte:** Web, Hybrid App (Webview), Native App

Fügt zusätzliche Logs hinzu, Optionen sind `debug | info | warn | silent`

Fehler werden immer in der Konsole protokolliert.

### `savePerInstance`

-   **Typ:** `boolean`
-   **Standard:** `false`
-   **Pflichtfeld:** nein
-   **Unterstützte Anwendungskontexte:** Web, Hybrid App (Webview), Native App

Speichern der Bilder pro Instanz in einem separaten Ordner, sodass z.B. alle Chrome-Screenshots in einem Chrome-Ordner wie `desktop_chrome` gespeichert werden.

### `screenshotPath`

-   **Typ:** `string | () => string`
-   **Standard:** `.tmp/`
-   **Pflichtfeld:** nein
-   **Unterstützte Anwendungskontexte:** Web, Hybrid App (Webview), Native App

Das Verzeichnis, das alle tatsächlichen/unterschiedlichen Screenshots enthält. Wenn nicht gesetzt, wird der Standardwert verwendet. Eine Funktion, die einen String zurückgibt, kann auch verwendet werden, um den screenshotPath-Wert zu setzen:

```js
{
    screenshotPath: path.join(process.cwd(), 'foo', 'bar', 'screenshotPath')
},
// ODER
{
    screenshotPath: () => {
        // Hier etwas Magie ausführen
        return path.join(process.cwd(), 'foo', 'bar', 'screenshotPath');
    }
}
```

### `toolBarShadowPadding`

-   **Typ:** `number`
-   **Pflichtfeld:** Nein
-   **Standard:** `6` für Android und `15` für iOS (`6` standardmäßig und `9` wird automatisch für die mögliche Home-Leiste auf iPhones mit einer Notch oder iPads, die eine Home-Leiste haben, hinzugefügt)
-   **Unterstützte Anwendungskontexte:** Web

Das Padding, das zur Toolbar auf iOS und Android hinzugefügt werden muss, um einen korrekten Ausschnitt des Viewports zu erstellen.

### `userBasedFullPageScreenshot`

-   **Typ:** `boolean`
-   **Pflichtfeld:** Nein
-   **Standard:** `false`
-   **Unterstützte Anwendungskontexte:** Web, Hybrid App (Webview) **Eingeführt in visual-service@7.0.0**

Standardmäßig werden Vollseiten-Screenshots auf Desktop-Web mithilfe des WebDriver BiDi-Protokolls erfasst, das schnelle, stabile und konsistente Screenshots ohne Scrollen ermöglicht.
Wenn userBasedFullPageScreenshot auf true gesetzt ist, simuliert der Screenshot-Prozess einen echten Benutzer: Er scrollt durch die Seite, erfasst Viewport-große Screenshots und fügt sie zusammen. Diese Methode ist nützlich für Seiten mit Lazy-Loading-Inhalten oder dynamischem Rendering, das von der Scrollposition abhängt.

Verwenden Sie diese Option, wenn Ihre Seite auf Inhalte angewiesen ist, die während des Scrollens geladen werden, oder wenn Sie das Verhalten älterer Screenshot-Methoden beibehalten möchten.

### `waitForFontsLoaded`

-   **Typ:** `boolean`
-   **Pflichtfeld:** Nein
-   **Standard:** `true`
-   **Unterstützte Anwendungskontexte:** Web, Hybrid App (Webview)

Schriften, einschließlich Drittanbieter-Schriften, können synchron oder asynchron geladen werden. Asynchrones Laden bedeutet, dass Schriften möglicherweise geladen werden, nachdem WebdriverIO festgestellt hat, dass eine Seite vollständig geladen wurde. Um Probleme bei der Schriftdarstellung zu vermeiden, wartet dieses Modul standardmäßig, bis alle Schriften geladen sind, bevor ein Screenshot aufgenommen wird.

## Tabbable-Optionen

:::info HINWEIS

Dieses Modul unterstützt auch das Zeichnen der Art und Weise, wie ein Benutzer seine Tastatur verwenden würde, um durch die Website zu _tabben_, indem Linien und Punkte von tabbable Element zu tabbable Element gezeichnet werden.<br/>
Die Arbeit ist inspiriert von [Viv Richards](https://github.com/vivrichards600) seinem Blogbeitrag über ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).<br/>
Die Art und Weise, wie tabbable Elemente ausgewählt werden, basiert auf dem Modul [tabbable](https://github.com/davidtheclark/tabbable). Wenn es Probleme bezüglich des Tabbens gibt, überprüfen Sie bitte die [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) und besonders den Abschnitt [More details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

### `tabbableOptions`

-   **Typ:** `object`
-   **Pflichtfeld:** Nein
-   **Standard:** Siehe [hier](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) für alle Standardwerte
-   **Unterstützte Anwendungskontexte:** Web

Die Optionen, die für die Linien und Punkte geändert werden können, wenn Sie die `{save|check}Tabbable`-Methoden verwenden. Die Optionen werden unten erklärt.

#### `tabbableOptions.circle`

-   **Typ:** `object`
-   **Pflichtfeld:** Nein
-   **Standard:** Siehe [hier](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) für alle Standardwerte
-   **Unterstützte Anwendungskontexte:** Web

Die Optionen zur Änderung des Kreises.

##### `tabbableOptions.circle.backgroundColor`

-   **Typ:** `string`
-   **Pflichtfeld:** Nein
-   **Standard:** Siehe [hier](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) für alle Standardwerte
-   **Unterstützte Anwendungskontexte:** Web

Die Hintergrundfarbe des Kreises.

##### `tabbableOptions.circle.borderColor`

-   **Typ:** `string`
-   **Pflichtfeld:** Nein
-   **Standard:** Siehe [hier](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) für alle Standardwerte
-   **Unterstützte Anwendungskontexte:** Web

Die Randfarbe des Kreises.

##### `tabbableOptions.circle.borderWidth`

-   **Typ:** `number`
-   **Pflichtfeld:** Nein
-   **Standard:** Siehe [hier](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) für alle Standardwerte
-   **Unterstützte Anwendungskontexte:** Web

Die Randbreite des Kreises.

##### `tabbableOptions.circle.fontColor`

-   **Typ:** `string`
-   **Pflichtfeld:** Nein
-   **Standard:** Siehe [hier](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) für alle Standardwerte
-   **Unterstützte Anwendungskontexte:** Web

Die Farbe der Schrift des Textes im Kreis. Dies wird nur angezeigt, wenn [`showNumber`](./#tabbableoptionscircleshownumber) auf `true` gesetzt ist.

##### `tabbableOptions.circle.fontFamily`

-   **Typ:** `string`
-   **Pflichtfeld:** Nein
-   **Standard:** Siehe [hier](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) für alle Standardwerte
-   **Unterstützte Anwendungskontexte:** Web

Die Familie der Schrift des Textes im Kreis. Dies wird nur angezeigt, wenn [`showNumber`](./#tabbableoptionscircleshownumber) auf `true` gesetzt ist.

Stellen Sie sicher, dass Sie Schriften festlegen, die von den Browsern unterstützt werden.

##### `tabbableOptions.circle.fontSize`

-   **Typ:** `number`
-   **Pflichtfeld:** Nein
-   **Standard:** Siehe [hier](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) für alle Standardwerte
-   **Unterstützte Anwendungskontexte:** Web

Die Größe der Schrift des Textes im Kreis. Dies wird nur angezeigt, wenn [`showNumber`](./#tabbableoptionscircleshownumber) auf `true` gesetzt ist.

##### `tabbableOptions.circle.size`

-   **Typ:** `number`
-   **Pflichtfeld:** Nein
-   **Standard:** Siehe [hier](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) für alle Standardwerte
-   **Unterstützte Anwendungskontexte:** Web

Die Größe des Kreises.

##### `tabbableOptions.circle.showNumber`

-   **Typ:** `showNumber`
-   **Pflichtfeld:** Nein
-   **Standard:** Siehe [hier](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) für alle Standardwerte
-   **Unterstützte Anwendungskontexte:** Web

Zeigt die Tab-Sequenznummer im Kreis an.

#### `tabbableOptions.line`

-   **Typ:** `object`
-   **Pflichtfeld:** Nein
-   **Standard:** Siehe [hier](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) für alle Standardwerte
-   **Unterstützte Anwendungskontexte:** Web

Die Optionen zur Änderung der Linie.

##### `tabbableOptions.line.color`

-   **Typ:** `string`
-   **Pflichtfeld:** Nein
-   **Standard:** Siehe [hier](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) für alle Standardwerte
-   **Unterstützte Anwendungskontexte:** Web

Die Farbe der Linie.

##### `tabbableOptions.line.width`

-   **Typ:** `number`
-   **Pflichtfeld:** Nein
-   **Standard:** Siehe [hier](https://github.com/webdriverio/visual-testing/blob/%40wdio/image-comparison-core%401.0.0/packages/image-comparison-core/src/helpers/options.ts#L27-L86) für alle Standardwerte
-   **Unterstützte Anwendungskontexte:** Web

Die Breite der Linie.

## Vergleichsoptionen

### `compareOptions`

-   **Typ:** `object`
-   **Pflichtfeld:** Nein
-   **Standard:** Siehe [hier](https://github.com/webdriverio/visual-testing/blob/6a988808c9adc58f58c5a66cd74296ae5c1ad6dc/packages/webdriver-image-comparison/src/helpers/options.ts#L46-L60) für alle Standardwerte
-   **Unterstützte Anwendungskontexte:** Web, Hybrid App (Webview), Native App (Siehe [Methoden-Vergleichsoptionen](./method-options#compare-check-options) für weitere Informationen)

Die Vergleichsoptionen können auch als Service-Optionen festgelegt werden, sie werden in den [Methoden-Vergleichsoptionen](/docs/visual-testing/method-options#compare-check-options) beschrieben