---
id: visual-testing
title: Visuelles Testen
description: "Vergleichen Sie Screenshots von Bildschirmen, Elementen oder ganzen Seiten mit Baselines mithilfe des @wdio/visual-service, einschließlich Installation und Verwendung."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Was kann es?

WebdriverIO bietet Bildvergleiche von Bildschirmen, Elementen oder ganzen Seiten für

-   🖥️ Desktop-Browser (Chrome / Firefox / Safari / Microsoft Edge)
-   📱 Mobile / Tablet-Browser (Chrome auf Android-Emulatoren / Safari auf iOS-Simulatoren / Simulatoren / echten Geräten) über Appium
-   📱 Native Apps (Android-Emulatoren / iOS-Simulatoren / echte Geräte) über Appium (🌟 **NEU** 🌟)
-   📳 Hybride Apps über Appium

durch den [`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service), einen leichtgewichtigen WebdriverIO-Service.

Damit können Sie:

-   **Bildschirme/Elemente/ganze Seiten** speichern oder mit einer Baseline vergleichen
-   automatisch **eine Baseline erstellen**, wenn keine vorhanden ist
-   **benutzerdefinierte Bereiche ausblenden** und sogar eine Status- und/oder Symbolleiste (nur mobil) während eines Vergleichs **automatisch ausschließen**
-   die Abmessungen von Element-Screenshots vergrößern
-   **Text ausblenden** während des Website-Vergleichs, um:
    -   die **Stabilität zu verbessern** und Unregelmäßigkeiten beim Schrift-Rendering zu vermeiden
    -   sich nur auf das **Layout** einer Website zu konzentrieren
-   **verschiedene Vergleichsmethoden** und eine Reihe **zusätzlicher Matcher** für besser lesbare Tests verwenden
-   überprüfen, wie Ihre Website **die Navigation mit der Tabulatortaste unterstützt)**, siehe auch [Tabbing durch eine Website](#tabbing-through-a-website)
-   und vieles mehr, siehe die [Service](./visual-testing/service-options)- und [Methoden](./visual-testing/method-options)-Optionen

Der Service ist ein leichtgewichtiges Modul, um die benötigten Daten und Screenshots für alle Browser/Geräte abzurufen. Die Vergleichsleistung stammt von [Pixelmatch](https://github.com/mapbox/pixelmatch), einer schnellen und genauen Bibliothek für wahrnehmungsbasierte Bildvergleiche. Seit v11 misst sie Farbunterschiede im OKLab-Farbraum mit der HyAB-Distanz (pixelmatch 8), was näher daran ist, wie Menschen Farben sehen. Bilder werden mit [fast-png](https://github.com/image-js/fast-png) verarbeitet, einem PNG-Codec ohne native Abhängigkeiten.

:::info HINWEIS für native/hybride Apps
Die Methoden `saveScreen`, `saveElement`, `checkScreen`, `checkElement` und die Matcher `toMatchScreenSnapshot` und `toMatchElementSnapshot` können für native Apps/Kontexte verwendet werden.

Bitte verwenden Sie die Eigenschaft `isHybridApp:true` in Ihren Service-Einstellungen, wenn Sie es für hybride Apps verwenden möchten.
:::

:::caution Upgrade von v10?

`@wdio/visual-service` **v11** unterstützt nur **WebdriverIO v10** (und Node.js 22.19 oder höher). Mit WebdriverIO v9 bleiben Sie bei `@wdio/visual-service@10`.

v11 vergleicht Farben mit pixelmatch 8 (OKLab-Farbraum, HyAB-Distanz) statt mit YIQ. Die Schwellenwertskala und die `ignore*`-Voreinstellungen haben sich nicht geändert, aber **Abweichungsprozentsätze können sich für dieselben Bilder leicht von v10 unterscheiden**. Ihr Testcode muss nicht geändert werden. Wenn eine Prüfung von einem exakten Abweichungsprozentsatz oder einer engen Toleranz abhängt, überprüfen Sie diese nach dem Upgrade erneut.

Einige Korrekturen in v11 können eine Baseline auch einmalig ändern:

-   **iOS-Element-Screenshots großer Elemente:** Bei einem Element, das sich nicht vollständig im Viewport befand, hatte das Bild die Größe des gesamten Elements, aber der Teil außerhalb des Viewports war schwarz ([appium/appium#22939](https://github.com/appium/appium/issues/22939)). Das Bild enthält jetzt nur den sichtbaren Teil des Elements, wie bei Android.
-   **Element-Screenshots mit `biDiOrigin: 'viewport'`:** In einer WebDriver-BiDi-Sitzung schneidet der Screenshot jetzt das Element selbst aus, auch wenn die Seite gescrollt ist.
-   **Zurückscrollen:** Element-Prüfungen (mit `autoElementScroll`) und Ganzseiten-Prüfungen scrollen die Seite jetzt dorthin zurück, wo sie war. Eine Viewport-Prüfung, die direkt danach ausgeführt wird, kann ein anderes Bild ergeben.

Alle Änderungen finden Sie im [v11-Migrationsleitfaden](https://github.com/webdriverio/visual-testing/blob/main/docs/v11-migration.md).

:::

:::caution Upgrade von v9 (oder niedriger)?

`@wdio/visual-service` **v10** hat die Vergleichs-Engine von **ResembleJS** auf **[Pixelmatch](https://github.com/mapbox/pixelmatch)** umgestellt. Pixelmatch verwendet ein wahrnehmungsbasiertes (YIQ) Farbmodell anstelle von reinem RGB, daher unterscheiden sich die Abweichungsprozentsätze von v9. Das bedeutet:

-   **Ihr Testcode muss nicht geändert werden.** Alle Methodennamen, Optionsnamen und Matcher sind identisch.
-   **Ihre Baseline-Bilder müssen möglicherweise aktualisiert werden.** Führen Sie nach dem Upgrade Ihre Testsuite aus und überprüfen Sie alle visuellen Unterschiede. Sie können einzelne fehlschlagende Baselines mit `--update-visual-baseline` aktualisieren oder Ihren gesamten Baseline-Ordner löschen und `autoSaveBaseline` ihn von Grund auf neu erstellen lassen. Details finden Sie in den [FAQ](/docs/visual-testing/faq#my-visual-tests-fail-with-a-difference-how-can-i-update-my-baseline).

:::

## Installation

Am einfachsten ist es, `@wdio/visual-service` als Dev-Dependency in Ihrer `package.json` zu führen, über:

```sh
npm install --save-dev @wdio/visual-service
```

Dies installiert v11, das WebdriverIO v10 benötigt. Für ein WebdriverIO-v9-Projekt installieren Sie v10 des Service:

```sh
npm install --save-dev @wdio/visual-service@10
```

## Verwendung

`@wdio/visual-service` kann als normaler Service verwendet werden. Sie können ihn in Ihrer Konfigurationsdatei wie folgt einrichten:

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // Einige Optionen, siehe die Dokumentation für weitere
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                formatImageName: "{tag}-{logName}-{width}x{height}",
                screenshotPath: path.join(process.cwd(), "tmp"),
                savePerInstance: true,
                // ... weitere Optionen
            },
        ],
    ],
    // ...
};
```

Weitere Service-Optionen finden Sie [hier](/docs/visual-testing/service-options).

Sobald dies in Ihrer WebdriverIO-Konfiguration eingerichtet ist, können Sie visuelle Assertions zu [Ihren Tests](/docs/visual-testing/writing-tests) hinzufügen.

### Capabilities
Um das Visual-Testing-Modul zu verwenden, **müssen Sie Ihren Capabilities keine zusätzlichen Optionen hinzufügen**. In einigen Fällen möchten Sie jedoch möglicherweise zusätzliche Metadaten zu Ihren visuellen Tests hinzufügen, wie z. B. einen `logName`.

Mit `logName` können Sie jeder Capability einen benutzerdefinierten Namen zuweisen, der dann in die Bilddateinamen aufgenommen werden kann. Dies ist besonders nützlich, um Screenshots zu unterscheiden, die in verschiedenen Browsern, auf verschiedenen Geräten oder mit verschiedenen Konfigurationen aufgenommen wurden.

Um dies zu aktivieren, können Sie `logName` im Abschnitt `capabilities` definieren und sicherstellen, dass die Option `formatImageName` im Visual-Testing-Service darauf verweist. So können Sie es einrichten:

```js
import path from "node:path";

// wdio.conf.ts
export const config = {
    // ...
    // =====
    // Setup
    // =====
    capabilities: [
        {
            browserName: 'chrome',
            'wdio-ics:options': {
                logName: 'chrome-mac-15', // Benutzerdefinierter Log-Name für Chrome
            },
        }
        {
            browserName: 'firefox',
            'wdio-ics:options': {
                logName: 'firefox-mac-15', // Benutzerdefinierter Log-Name für Firefox
            },
        }
    ],
    services: [
        [
            "visual",
            {
                // Einige Optionen, siehe die Dokumentation für weitere
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                screenshotPath: path.join(process.cwd(), "tmp"),
                // Das folgende Format verwendet den `logName` aus den Capabilities
                formatImageName: "{tag}-{logName}-{width}x{height}",
                // ... weitere Optionen
            },
        ],
    ],
    // ...
};
```

#### Wie es funktioniert
1. Einrichten des `logName`:

    - Weisen Sie im Abschnitt `capabilities` jedem Browser oder Gerät einen eindeutigen `logName` zu. Zum Beispiel identifiziert `chrome-mac-15` Tests, die in Chrome auf macOS Version 15 laufen.

2. Benutzerdefinierte Bildbenennung:

    - Die Option `formatImageName` integriert den `logName` in die Screenshot-Dateinamen. Wenn beispielsweise der `tag` homepage ist und die Auflösung `1920x1080` beträgt, könnte der resultierende Dateiname so aussehen:

        `homepage-chrome-mac-15-1920x1080.png`

3. Vorteile der benutzerdefinierten Benennung:

    - Die Unterscheidung zwischen Screenshots aus verschiedenen Browsern oder Geräten wird viel einfacher, insbesondere beim Verwalten von Baselines und beim Debuggen von Abweichungen.

4. Hinweis zu Standardwerten:

    -Wenn `logName` nicht in den Capabilities gesetzt ist, zeigt die Option `formatImageName` ihn als leeren String in den Dateinamen an (`homepage--15-1920x1080.png`)

### WebdriverIO Multi-Remote

Wir unterstützen auch [Multi-Remote](https://webdriver.io/docs/multiremote/). Damit dies ordnungsgemäß funktioniert, stellen Sie sicher, dass Sie `wdio-ics:options` zu Ihren
Capabilities hinzufügen, wie Sie unten sehen können. Dadurch wird sichergestellt, dass jeder Screenshot einen eigenen eindeutigen Namen erhält.

[Das Schreiben Ihrer Tests](/docs/visual-testing/writing-tests) unterscheidet sich nicht von der Verwendung des [Testrunners](https://webdriver.io/docs/testrunner)

```js
// wdio.conf.js
export const config = {
    capabilities: {
        chromeBrowserOne: {
            capabilities: {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: ["disable-infobars"],
                },
                // DAS HIER!!!
                "wdio-ics:options": {
                    logName: "chrome-latest-one",
                },
            },
        },
        chromeBrowserTwo: {
            capabilities: {
                browserName: "chrome",
                "goog:chromeOptions": {
                    args: ["disable-infobars"],
                },
                // DAS HIER!!!
                "wdio-ics:options": {
                    logName: "chrome-latest-two",
                },
            },
        },
    },
};
```

### Programmatische Ausführung

Hier ist ein minimales Beispiel, wie Sie `@wdio/visual-service` über `remote`-Optionen verwenden können:

```js
import { remote } from "webdriverio";
import VisualService from "@wdio/visual-service";

let visualService = new VisualService({
    autoSaveBaseline: true,
});

const browser = await remote({
    logLevel: "silent",
    capabilities: {
        browserName: "chrome",
    },
});

// Den Service "starten", um die benutzerdefinierten Befehle zum `browser` hinzuzufügen
visualService.remoteSetup(browser);

await browser.url("https://webdriver.io/");

// oder verwenden Sie dies NUR zum Speichern eines Screenshots
await browser.saveFullPageScreen("examplePaged", {});

// oder verwenden Sie dies zur Validierung. Beide Methoden müssen nicht kombiniert werden, siehe die FAQ
await browser.checkFullPageScreen("examplePaged", {});

await browser.deleteSession();
```

### Tabbing durch eine Website

Sie können prüfen, ob eine Website mit der <kbd>TAB</kbd>-Taste der Tastatur zugänglich ist. Das Testen dieses Teils der Barrierefreiheit war schon immer eine zeitaufwändige (manuelle) Aufgabe und durch Automatisierung ziemlich schwer umzusetzen.
Mit den Methoden `saveTabbablePage` und `checkTabbablePage` können Sie jetzt Linien und Punkte auf Ihrer Website zeichnen, um die Tab-Reihenfolge zu überprüfen.

Beachten Sie, dass dies nur für Desktop-Browser nützlich ist und **NICHT\*\*** für mobile Geräte. Alle Desktop-Browser unterstützen diese Funktion.

:::note

Die Arbeit ist inspiriert von [Viv Richards](https://github.com/vivrichards600) und seinem Blogbeitrag über ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).

Die Art und Weise, wie tabbable Elemente ausgewählt werden, basiert auf dem Modul [tabbable](https://github.com/davidtheclark/tabbable). Wenn es Probleme mit dem Tabbing gibt, lesen Sie bitte die [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) und insbesondere den Abschnitt [More ](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details)Details.

:::

#### Wie funktioniert es

Beide Methoden erstellen ein `canvas`-Element auf Ihrer Website und zeichnen Linien und Punkte, um Ihnen zu zeigen, wohin Ihr TAB gehen würde, wenn ein Endbenutzer ihn verwenden würde. Danach wird ein Ganzseiten-Screenshot erstellt, um Ihnen einen guten Überblick über den Ablauf zu geben.

:::important

**Verwenden Sie `saveTabbablePage` nur, wenn Sie einen Screenshot erstellen müssen und ihn NICHT **mit einem **Baseline**-Bild vergleichen möchten.\*\*\*\*

:::

Wenn Sie den Tabbing-Ablauf mit einer Baseline vergleichen möchten, können Sie die Methode `checkTabbablePage` verwenden. Sie müssen die beiden Methoden **NICHT** zusammen verwenden. Wenn bereits ein Baseline-Bild erstellt wurde, was automatisch geschehen kann, indem Sie beim Instanziieren des Service `autoSaveBaseline: true` angeben,
erstellt `checkTabbablePage` zuerst das _tatsächliche_ Bild und vergleicht es dann mit der Baseline.

##### Optionen

Beide Methoden verwenden dieselben Optionen wie `saveFullPageScreen` oder `compareFullPageScreen`.

#### Beispiel

Dies ist ein Beispiel dafür, wie das Tabbing auf unserer [Guinea-Pig-Website](https://guinea-pig.webdriver.io/image-compare.html) funktioniert:

![WDIO tabbing example](/img/visual/tabbable-chrome-latest-1366x768.png)

### Fehlgeschlagene visuelle Snapshots automatisch aktualisieren

Aktualisieren Sie die Baseline-Bilder über die Befehlszeile, indem Sie das Argument `--update-visual-baseline` hinzufügen. Dies wird

-   automatisch den tatsächlich aufgenommenen Screenshot kopieren und in den Baseline-Ordner legen
-   bei Unterschieden den Test bestehen lassen, da die Baseline aktualisiert wurde

**Verwendung:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Wenn Sie im Log-Modus info/debug ausführen, sehen Sie die folgenden hinzugefügten Logs

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

## TypeScript-Unterstützung

Dieses Modul enthält TypeScript-Unterstützung, sodass Sie bei der Verwendung des Visual-Testing-Service von Autovervollständigung, Typsicherheit und einer verbesserten Entwicklererfahrung profitieren.

### Schritt 1: Typdefinitionen hinzufügen
Damit TypeScript die Modultypen erkennt, fügen Sie den folgenden Eintrag zum Feld types in Ihrer tsconfig.json hinzu:

```json
{
    "compilerOptions": {
        "types": ["@wdio/visual-service"]
    }
}
```

### Schritt 2: Typsicherheit für Service-Optionen aktivieren
Um die Typprüfung der Service-Optionen zu erzwingen, aktualisieren Sie Ihre WebdriverIO-Konfiguration:

```ts
// wdio.conf.ts
import { join } from 'node:path';
// Typdefinition importieren
import type { VisualServiceOptions } from '@wdio/visual-service';

export const config = {
    // ...
    // =====
    // Setup
    // =====
    services: [
        [
            "visual",
            {
                // Service-Optionen
                baselineFolder: join(process.cwd(), './__snapshots__/'),
                formatImageName: '{tag}-{logName}-{width}x{height}',
                screenshotPath: join(process.cwd(), '.tmp/'),
            } satisfies VisualServiceOptions, // Stellt Typsicherheit sicher
        ],
    ],
    // ...
};
```

## Systemanforderungen

### Version 10 und höher (aktuell)

Ab Version 10 hat dieses Modul keine zusätzlichen Systemabhängigkeiten über die allgemeinen [Projektanforderungen](/docs/gettingstarted#system-requirements) hinaus. Es verwendet [Pixelmatch](https://github.com/mapbox/pixelmatch) für wahrnehmungsbasierte Bildvergleiche und [fast-png](https://github.com/image-js/fast-png) für die Bildkodierung/-dekodierung. Beide sind reines JavaScript ohne native Abhängigkeiten.

Version 11 benötigt WebdriverIO v10 und Node.js 22.19 oder höher. Version 10 funktioniert mit WebdriverIO v9 (9.29.1 oder höher) und v10.

### Version 5 bis 9 (Legacy)

Die Versionen 5 bis 9 verwendeten [Jimp](https://github.com/jimp-dev/jimp), eine Bildverarbeitungsbibliothek für Node, die vollständig in JavaScript geschrieben ist und keine nativen Abhängigkeiten hat. Es waren keine zusätzlichen Systemabhängigkeiten erforderlich.

### Version 4 und niedriger

Für Version 4 und niedriger basiert dieses Modul auf [Canvas](https://github.com/Automattic/node-canvas), einer Canvas-Implementierung für Node.js. Canvas hängt von [Cairo](https://cairographics.org/) ab.

#### Installationsdetails

Standardmäßig werden während des `npm install` Ihres Projekts Binärdateien für macOS, Linux und Windows heruntergeladen. Wenn Sie kein unterstütztes Betriebssystem oder keine unterstützte Prozessorarchitektur haben, wird das Modul auf Ihrem System kompiliert. Dies erfordert mehrere Abhängigkeiten, darunter Cairo und Pango.

Detaillierte Installationsinformationen finden Sie im [node-canvas-Wiki](https://github.com/Automattic/node-canvas/wiki/_pages). Nachfolgend finden Sie einzeilige Installationsanweisungen für gängige Betriebssysteme. Beachten Sie, dass `libgif/giflib`, `librsvg` und `libjpeg` optional sind und nur für die Unterstützung von GIF, SVG bzw. JPEG benötigt werden. Cairo v1.10.0 oder höher ist erforderlich.

<Tabs
defaultValue="osx"
values={[
{label: 'OS', value: 'osx'},
{label: 'Ubuntu', value: 'ubuntu'},
{label: 'Fedora', value: 'fedora'},
{label: 'Solaris', value: 'solaris'},
{label: 'OpenBSD', value: 'openbsd'},
{label: 'Window', value: 'windows'},
{label: 'Others', value: 'others'},
]}

> <TabItem value="osx">

     Mit [Homebrew](https://brew.sh/):

     ```sh
     brew install pkg-config cairo pango libpng jpeg giflib librsvg pixman
     ```

    **Mac OS X v10.11+:** Wenn Sie kürzlich auf Mac OS X v10.11+ aktualisiert haben und Probleme beim Kompilieren auftreten, führen Sie den folgenden Befehl aus: `xcode-select --install`. Lesen Sie mehr über das Problem [auf Stack Overflow](http://stackoverflow.com/a/32929012/148072).
    Wenn Sie Xcode 10.0 oder höher installiert haben, benötigen Sie zum Erstellen aus dem Quellcode NPM 6.4.1 oder höher.

</TabItem>
<TabItem value="ubuntu">

    ```sh
    sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
    ```

</TabItem>
<TabItem value="fedora">

    ```sh
    sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel
    ```

</TabItem>
<TabItem value="solaris">

    ```sh
    pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto
    ```

</TabItem>
<TabItem value="openbsd">

    ```sh
    doas pkg_add cairo pango png jpeg giflib
    ```

</TabItem>
<TabItem value="windows">

    Siehe das [Wiki](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows)

</TabItem>
<TabItem value="others">

    Siehe das [Wiki](https://github.com/Automattic/node-canvas/wiki)

</TabItem>
</Tabs>