---
id: visual-testing
title: Visuelles Testen
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Was kann es tun?

WebdriverIO bietet Bildvergleiche auf Bildschirmen, Elementen oder einer vollständigen Seite für

-   🖥️ Desktop-Browser (Chrome / Firefox / Safari / Microsoft Edge)
-   📱 Mobile / Tablet-Browser (Chrome auf Android-Emulatoren / Safari auf iOS-Simulatoren / Simulatoren / echte Geräte) über Appium
-   📱 Native Apps (Android-Emulatoren / iOS-Simulatoren / echte Geräte) über Appium (🌟 **NEU** 🌟)
-   📳 Hybrid-Apps über Appium

durch den [`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service), der ein leichtgewichtiger WebdriverIO-Service ist.

Dies ermöglicht es Ihnen:

-   **Bildschirme/Elemente/Vollbild**-Aufnahmen zu speichern oder mit einer Baseline zu vergleichen
-   automatisch eine **Baseline zu erstellen**, wenn keine vorhanden ist
-   **benutzerdefinierte Regionen auszublenden** und sogar **automatisch Status- und/oder Symbolleisten (nur mobil)** während eines Vergleichs auszuschließen
-   die Elementdimensionen von Screenshots zu vergrößern
-   **Text auszublenden** während des Website-Vergleichs, um:
    -   die **Stabilität zu verbessern** und flackernde Schriftartendarstellung zu verhindern
    -   sich nur auf das **Layout** einer Website zu konzentrieren
-   **verschiedene Vergleichsmethoden** und eine Reihe von **zusätzlichen Matchern** für besser lesbare Tests zu verwenden
-   zu überprüfen, wie Ihre Website das **Tabben mit Ihrer Tastatur unterstützt**, siehe auch [Durch eine Website tabben](#tabbing-through-a-website)
-   und vieles mehr, siehe die [Service](./visual-testing/service-options)- und [Methoden](./visual-testing/method-options)-Optionen

Der Service ist ein leichtgewichtiges Modul, um die benötigten Daten und Screenshots für alle Browser/Geräte abzurufen. Die Vergleichsstärke kommt von [ResembleJS](https://github.com/Huddle/Resemble.js). Wenn Sie Bilder online vergleichen möchten, können Sie das [Online-Tool](http://rsmbl.github.io/Resemble.js/) überprüfen.

:::info HINWEIS für Native/Hybrid-Apps
Die Methoden `saveScreen`, `saveElement`, `checkScreen`, `checkElement` und die Matcher `toMatchScreenSnapshot` und `toMatchElementSnapshot` können für Native Apps/Kontext verwendet werden.

Bitte verwenden Sie die Eigenschaft `isHybridApp:true` in Ihren Service-Einstellungen, wenn Sie sie für Hybrid-Apps verwenden möchten.
:::

## Installation

Der einfachste Weg ist, `@wdio/visual-service` als Dev-Dependency in Ihrer `package.json` zu behalten, über:

```sh
npm install --save-dev @wdio/visual-service
```

## Verwendung

`@wdio/visual-service` kann als normaler Service verwendet werden. Sie können ihn in Ihrer Konfigurationsdatei mit Folgendem einrichten:

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
                // Einige Optionen, siehe die Dokumentation für mehr
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

Sobald Sie es in Ihrer WebdriverIO-Konfiguration eingerichtet haben, können Sie visuelle Assertions zu [Ihren Tests](/docs/visual-testing/writing-tests) hinzufügen.

### Capabilities
Um das Visual Testing-Modul zu verwenden, **müssen Sie keine zusätzlichen Optionen zu Ihren Capabilities hinzufügen**. In einigen Fällen möchten Sie jedoch möglicherweise zusätzliche Metadaten zu Ihren visuellen Tests hinzufügen, wie z.B. einen `logName`.

Der `logName` ermöglicht es Ihnen, jeder Capability einen benutzerdefinierten Namen zuzuweisen, der dann in die Bildnamen aufgenommen werden kann. Dies ist besonders nützlich, um Screenshots zu unterscheiden, die mit verschiedenen Browsern, Geräten oder Konfigurationen aufgenommen wurden.

Um dies zu aktivieren, können Sie `logName` im Abschnitt `capabilities` definieren und sicherstellen, dass die Option `formatImageName` im Visual Testing Service darauf verweist. So können Sie es einrichten:

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
                // Einige Optionen, siehe die Dokumentation für mehr
                baselineFolder: path.join(process.cwd(), "tests", "baseline"),
                screenshotPath: path.join(process.cwd(), "tmp"),
                // Das Format unten verwendet den `logName` aus den Capabilities
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

    - Im Abschnitt `capabilities` weisen Sie jedem Browser oder Gerät einen eindeutigen `logName` zu. Zum Beispiel identifiziert `chrome-mac-15` Tests, die auf Chrome unter macOS Version 15 laufen.

2. Benutzerdefinierte Bildbenennung:

    - Die Option `formatImageName` integriert den `logName` in die Screenshot-Dateinamen. Wenn beispielsweise der `tag` homepage und die Auflösung `1920x1080` ist, könnte der resultierende Dateiname so aussehen:

        `homepage-chrome-mac-15-1920x1080.png`

3. Vorteile der benutzerdefinierten Benennung:

    - Die Unterscheidung zwischen Screenshots von verschiedenen Browsern oder Geräten wird wesentlich einfacher, besonders bei der Verwaltung von Baselines und dem Debuggen von Abweichungen.

4. Hinweis zu Standardwerten:

    - Wenn `logName` nicht in den Capabilities gesetzt ist, zeigt die Option `formatImageName` ihn als leeren String in den Dateinamen an (`homepage--15-1920x1080.png`)

### WebdriverIO MultiRemote

Wir unterstützen auch [MultiRemote](https://webdriver.io/docs/multiremote/). Um dies richtig zum Laufen zu bringen, stellen Sie sicher, dass Sie `wdio-ics:options` zu Ihren
Capabilities hinzufügen, wie Sie unten sehen können. Dies stellt sicher, dass jeder Screenshot seinen eigenen eindeutigen Namen hat.

[Das Schreiben Ihrer Tests](/docs/visual-testing/writing-tests) wird sich nicht vom [Testrunner](https://webdriver.io/docs/testrunner) unterscheiden.

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
                // DIES!!!
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
                // DIES!!!
                "wdio-ics:options": {
                    logName: "chrome-latest-two",
                },
            },
        },
    },
};
```

### Programmatische Ausführung

Hier ist ein minimales Beispiel für die Verwendung von `@wdio/visual-service` über `remote`-Optionen:

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

// "Starten" Sie den Service, um die benutzerdefinierten Befehle zum `browser` hinzuzufügen
visualService.remoteSetup(browser);

await browser.url("https://webdriver.io/");

// oder verwenden Sie dies NUR zum Speichern eines Screenshots
await browser.saveFullPageScreen("examplePaged", {});

// oder verwenden Sie dies für die Validierung. Beide Methoden müssen nicht kombiniert werden, siehe FAQ
await browser.checkFullPageScreen("examplePaged", {});

await browser.deleteSession();
```

### Durch eine Website tabben

Sie können überprüfen, ob eine Website mit der Tastatur-<kbd>TAB</kbd>-Taste zugänglich ist. Das Testen dieses Teils der Barrierefreiheit war immer eine zeitaufwändige (manuelle) Arbeit und ziemlich schwer durch Automatisierung zu bewerkstelligen.
Mit den Methoden `saveTabbablePage` und `checkTabbablePage` können Sie jetzt Linien und Punkte auf Ihrer Website zeichnen, um die Tab-Reihenfolge zu überprüfen.

Beachten Sie, dass dies nur für Desktop-Browser nützlich ist und **NICHT** für mobile Geräte. Alle Desktop-Browser unterstützen diese Funktion.

:::note

Die Arbeit wurde von [Viv Richards](https://github.com/vivrichards600) in seinem Blogbeitrag ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript) inspiriert.

Die Art und Weise, wie tabbable Elemente ausgewählt werden, basiert auf dem Modul [tabbable](https://github.com/davidtheclark/tabbable). Wenn es Probleme mit dem Tabbing gibt, überprüfen Sie bitte die [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) und insbesondere den Abschnitt [More Details](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details).

:::

#### Wie funktioniert es

Beide Methoden erstellen ein `canvas`-Element auf Ihrer Website und zeichnen Linien und Punkte, um Ihnen zu zeigen, wohin Ihr TAB führen würde, wenn ein Endbenutzer es verwenden würde. Danach wird ein Screenshot der gesamten Seite erstellt, um Ihnen einen guten Überblick über den Ablauf zu geben.

:::important

**Verwenden Sie `saveTabbablePage` nur, wenn Sie einen Screenshot erstellen müssen und ihn NICHT mit einem Baseline-Bild vergleichen wollen.**

:::

Wenn Sie den Tabbing-Ablauf mit einer Baseline vergleichen möchten, können Sie die Methode `checkTabbablePage` verwenden. Sie müssen die beiden Methoden **NICHT** zusammen verwenden. Wenn bereits ein Baseline-Bild erstellt wurde, was automatisch durch Angabe von `autoSaveBaseline: true` bei der Instanziierung des Services erfolgen kann,
erstellt `checkTabbablePage` zuerst das _aktuelle_ Bild und vergleicht es dann mit der Baseline.

##### Optionen

Beide Methoden verwenden die gleichen Optionen wie `saveFullPageScreen` oder `compareFullPageScreen`.

#### Beispiel

Dies ist ein Beispiel dafür, wie das Tabbing auf unserer [Guinea-Pig-Website](https://guinea-pig.webdriver.io/image-compare.html) funktioniert:

![WDIO tabbing example](/img/visual/tabbable-chrome-latest-1366x768.png)

### Automatische Aktualisierung fehlgeschlagener visueller Snapshots

Aktualisieren Sie die Baseline-Bilder über die Kommandozeile, indem Sie das Argument `--update-visual-baseline` hinzufügen. Dies wird

-   automatisch den tatsächlich aufgenommenen Screenshot kopieren und in den Baseline-Ordner legen
-   wenn es Unterschiede gibt, den Test bestehen lassen, da die Baseline aktualisiert wurde

**Verwendung:**

```sh
npm run test.local.desktop  --update-visual-baseline
```

Bei der Ausführung im Info/Debug-Modus werden die folgenden Protokolle hinzugefügt

```logs
[0-0] ..............
[0-0] #####################################################################################
[0-0]  INFO:
[0-0]  Updated the actual image to
[0-0]  /Users/wswebcreation/Git/wdio/visual-testing/localBaseline/chromel/demo-chrome-1366x768.png
[0-0] #####################################################################################
[0-0] ..........
```

## Typescript-Unterstützung

Dieses Modul enthält TypeScript-Unterstützung, sodass Sie von Auto-Vervollständigung, Typsicherheit und verbesserter Entwicklererfahrung bei der Verwendung des Visual Testing-Service profitieren können.

### Schritt 1: Typendefinitionen hinzufügen
Um sicherzustellen, dass TypeScript die Modultypen erkennt, fügen Sie den folgenden Eintrag zum Feld types in Ihrer tsconfig.json hinzu:

```json
{
    "compilerOptions": {
        "types": ["@wdio/visual-service"]
    }
}
```

### Schritt 2: Typsicherheit für Service-Optionen aktivieren
Um die Typüberprüfung für die Service-Optionen zu erzwingen, aktualisieren Sie Ihre WebdriverIO-Konfiguration:

```ts
// wdio.conf.ts
import { join } from 'node:path';
// Importieren Sie die Typdefinition
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

### Version 5 und höher

Für Version 5 und höher ist dieses Modul ein rein JavaScript-basiertes Modul ohne zusätzliche Systemabhängigkeiten jenseits der allgemeinen [Projektanforderungen](/docs/gettingstarted#system-requirements). Es verwendet [Jimp](https://github.com/jimp-dev/jimp), eine Bildverarbeitungsbibliothek für Node, die vollständig in JavaScript geschrieben ist, ohne native Abhängigkeiten.

### Version 4 und niedriger

Für Version 4 und niedriger verlässt sich dieses Modul auf [Canvas](https://github.com/Automattic/node-canvas), eine Canvas-Implementierung für Node.js. Canvas hängt von [Cairo](https://cairographics.org/) ab.

#### Installationsdetails

Standardmäßig werden Binärdateien für macOS, Linux und Windows während der `npm install` Ihres Projekts heruntergeladen. Wenn Sie kein unterstütztes Betriebssystem oder keine unterstützte Prozessorarchitektur haben, wird das Modul auf Ihrem System kompiliert. Dies erfordert mehrere Abhängigkeiten, einschließlich Cairo und Pango.

Detaillierte Installationsinformationen finden Sie im [node-canvas Wiki](https://github.com/Automattic/node-canvas/wiki/_pages). Nachfolgend finden Sie Einzeilen-Installationsanweisungen für gängige Betriebssysteme. Beachten Sie, dass `libgif/giflib`, `librsvg` und `libjpeg` optional sind und nur für GIF-, SVG- bzw. JPEG-Unterstützung benötigt werden. Cairo v1.10.0 oder höher ist erforderlich.

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

    **Mac OS X v10.11+:** Wenn Sie kürzlich auf Mac OS X v10.11+ aktualisiert haben und Probleme beim Kompilieren haben, führen Sie den folgenden Befehl aus: `xcode-select --install`. Lesen Sie mehr über das Problem [auf Stack Overflow](http://stackoverflow.com/a/32929012/148072).
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