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

durch den [`@wdio/visual-service`](https://www.npmjs.com/package/@wdio/visual-service), einen schlanken WebdriverIO-Service.

Damit können Sie:

-   **Bildschirme/Elemente/ganze Seiten** speichern oder mit einer Baseline vergleichen
-   automatisch **eine Baseline erstellen**, wenn noch keine vorhanden ist
-   **benutzerdefinierte Bereiche ausblenden** und sogar eine Status- und/oder Symbolleiste (nur mobil) während eines Vergleichs **automatisch ausschließen**
-   die Abmessungen von Element-Screenshots vergrößern
-   **Text ausblenden** während des Website-Vergleichs, um:
    -   **die Stabilität zu verbessern** und Instabilitäten durch Schriftdarstellung zu vermeiden
    -   sich nur auf das **Layout** einer Website zu konzentrieren
-   **verschiedene Vergleichsmethoden** und eine Reihe **zusätzlicher Matcher** für besser lesbare Tests verwenden
-   überprüfen, wie Ihre Website **das Tabben mit der Tastatur unterstützt)**, siehe auch [Tabbing durch eine Website](#tabbing-through-a-website)
-   und vieles mehr, siehe die [Service](./visual-testing/service-options)- und [Methoden](./visual-testing/method-options)-Optionen

Der Service ist ein schlankes Modul, um die benötigten Daten und Screenshots für alle Browser/Geräte abzurufen. Die Vergleichsleistung stammt von [Pixelmatch](https://github.com/mapbox/pixelmatch), einer schnellen und genauen Bibliothek für perzeptuellen Bildvergleich, die den YIQ-Farbraum verwendet. Bilder werden mit [fast-png](https://github.com/image-js/fast-png) verarbeitet, einem PNG-Codec ohne native Abhängigkeiten.

:::info HINWEIS für native/hybride Apps
Die Methoden `saveScreen`, `saveElement`, `checkScreen`, `checkElement` und die Matcher `toMatchScreenSnapshot` und `toMatchElementSnapshot` können für native Apps/Kontexte verwendet werden.

Bitte verwenden Sie die Eigenschaft `isHybridApp:true` in Ihren Service-Einstellungen, wenn Sie es für hybride Apps verwenden möchten.
:::

:::caution Upgrade von v9 (oder niedriger)?

`@wdio/visual-service` **v10** hat die Vergleichs-Engine von **ResembleJS** auf **[Pixelmatch](https://github.com/mapbox/pixelmatch)** umgestellt. Pixelmatch verwendet ein perzeptuelles (YIQ-)Farbmodell anstelle von reinem RGB, daher weichen die Abweichungsprozentsätze von v9 ab. Das bedeutet:

-   **Ihr Testcode muss nicht geändert werden.** Alle Methodennamen, Optionsnamen und Matcher sind identisch.
-   **Ihre Baseline-Bilder müssen möglicherweise aktualisiert werden.** Führen Sie nach dem Upgrade Ihre Testsuite aus und überprüfen Sie alle visuellen Unterschiede. Sie können einzelne fehlschlagende Baselines mit `--update-visual-baseline` aktualisieren oder Ihren gesamten Baseline-Ordner löschen und ihn von `autoSaveBaseline` neu erstellen lassen. Details finden Sie in den [FAQ](/docs/visual-testing/faq#my-visual-tests-fail-with-a-difference-how-can-i-update-my-baseline).

:::

## Installation

Am einfachsten ist es, `@wdio/visual-service` als Dev-Dependency in Ihrer `package.json` zu führen, über:

```sh
npm install --save-dev @wdio/visual-service
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

Sobald der Service in Ihrer WebdriverIO-Konfiguration eingerichtet ist, können Sie visuelle Assertions zu [Ihren Tests](/docs/visual-testing/writing-tests) hinzufügen.

### Capabilities
Um das Visual-Testing-Modul zu verwenden, **müssen Sie Ihren Capabilities keine zusätzlichen Optionen hinzufügen**. In einigen Fällen möchten Sie Ihren visuellen Tests jedoch möglicherweise zusätzliche Metadaten hinzufügen, z. B. einen `logName`.

Mit dem `logName` können Sie jeder Capability einen benutzerdefinierten Namen zuweisen, der dann in die Bilddateinamen aufgenommen werden kann. Dies ist besonders nützlich, um Screenshots zu unterscheiden, die in verschiedenen Browsern, auf verschiedenen Geräten oder mit verschiedenen Konfigurationen aufgenommen wurden.

Um dies zu aktivieren, können Sie `logName` im Abschnitt `capabilities` definieren und sicherstellen, dass die Option `formatImageName` im Visual-Testing-Service darauf verweist. So richten Sie es ein:

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

    - Weisen Sie im Abschnitt `capabilities` jedem Browser oder Gerät einen eindeutigen `logName` zu. Beispielsweise kennzeichnet `chrome-mac-15` Tests, die in Chrome unter macOS Version 15 ausgeführt werden.

2. Benutzerdefinierte Bildbenennung:

    - Die Option `formatImageName` integriert den `logName` in die Screenshot-Dateinamen. Wenn der `tag` beispielsweise homepage ist und die Auflösung `1920x1080` beträgt, könnte der resultierende Dateiname so aussehen:

        `homepage-chrome-mac-15-1920x1080.png`

3. Vorteile der benutzerdefinierten Benennung:

    - Die Unterscheidung zwischen Screenshots verschiedener Browser oder Geräte wird deutlich einfacher, insbesondere bei der Verwaltung von Baselines und der Fehlersuche bei Abweichungen.

4. Hinweis zu Standardwerten:

    -Wenn `logName` in den Capabilities nicht gesetzt ist, zeigt die Option `formatImageName` ihn als leeren String in den Dateinamen an (`homepage--15-1920x1080.png`)

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

Hier ist ein minimales Beispiel, wie Sie `@wdio/visual-service` über `remote`-Optionen verwenden:

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

Sie können überprüfen, ob eine Website mit der <kbd>TAB</kbd>-Taste der Tastatur zugänglich ist. Das Testen dieses Teils der Barrierefreiheit war schon immer eine zeitaufwändige (manuelle) Aufgabe und durch Automatisierung ziemlich schwer umzusetzen.
Mit den Methoden `saveTabbablePage` und `checkTabbablePage` können Sie jetzt Linien und Punkte auf Ihrer Website zeichnen, um die Tab-Reihenfolge zu überprüfen.

Beachten Sie, dass dies nur für Desktop-Browser nützlich ist und **NICHT\*\*** für mobile Geräte. Alle Desktop-Browser unterstützen diese Funktion.

:::note

Die Arbeit ist inspiriert von [Viv Richards](https://github.com/vivrichards600) und seinem Blogbeitrag über ["AUTOMATING PAGE TABABILITY (IS THAT A WORD?) WITH VISUAL TESTING"](https://vivrichards.co.uk/accessibility/automating-page-tab-flows-using-visual-testing-and-javascript).

Die Auswahl der tabbaren Elemente basiert auf dem Modul [tabbable](https://github.com/davidtheclark/tabbable). Falls es Probleme mit dem Tabbing gibt, lesen Sie bitte die [README.md](https://github.com/davidtheclark/tabbable/blob/master/README.md) und insbesondere den Abschnitt [More ](https://github.com/davidtheclark/tabbable/blob/master/README.md#more-details)Details.

:::

#### Wie funktioniert es

Beide Methoden erstellen ein `canvas`-Element auf Ihrer Website und zeichnen Linien und Punkte, um Ihnen zu zeigen, wohin Ihr TAB führen würde, wenn ein Endbenutzer ihn verwenden würde. Danach wird ein Screenshot der gesamten Seite erstellt, um Ihnen einen guten Überblick über den Ablauf zu geben.

:::important

**Verwenden Sie `saveTabbablePage` nur, wenn Sie einen Screenshot erstellen müssen und ihn NICHT mit einem **Baseline**-Bild vergleichen möchten.\*\*\*\*

:::

Wenn Sie den Tabbing-Ablauf mit einer Baseline vergleichen möchten, können Sie die Methode `checkTabbablePage` verwenden. Sie müssen die beiden Methoden **NICHT** zusammen verwenden. Wenn bereits ein Baseline-Bild erstellt wurde, was automatisch geschehen kann, indem Sie beim Instanziieren des Service `autoSaveBaseline: true` angeben,
erstellt `checkTabbablePage` zuerst das _aktuelle_ Bild und vergleicht es dann mit der Baseline.

##### Optionen

Beide Methoden verwenden dieselben Optionen wie `saveFullPageScreen` oder `compareFullPageScreen`.

#### Beispiel

Dies ist ein Beispiel dafür, wie das Tabbing auf unserer [Guinea-Pig-Website](https://guinea-pig.webdriver.io/image-compare.html) funktioniert:

![WDIO tabbing example](/img/visual/tabbable-chrome-latest-1366x768.png)

### Fehlgeschlagene visuelle Snapshots automatisch aktualisieren

Aktualisieren Sie die Baseline-Bilder über die Kommandozeile, indem Sie das Argument `--update-visual-baseline` hinzufügen. Dies wird

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
// Die Typdefinition importieren
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

Ab Version 10 hat dieses Modul keine zusätzlichen Systemabhängigkeiten über die allgemeinen [Projektanforderungen](/docs/gettingstarted#system-requirements) hinaus. Es verwendet [Pixelmatch](https://github.com/mapbox/pixelmatch) für den perzeptuellen Bildvergleich und [fast-png](https://github.com/image-js/fast-png) für die Bildkodierung/-dekodierung. Beide sind reines JavaScript ohne native Abhängigkeiten.

### Version 5 bis 9 (Legacy)

Die Versionen 5 bis 9 verwendeten [Jimp](https://github.com/jimp-dev/jimp), eine vollständig in JavaScript geschriebene Bildverarbeitungsbibliothek für Node ohne native Abhängigkeiten. Es waren keine zusätzlichen Systemabhängigkeiten erforderlich.

### Version 4 und niedriger

Für Version 4 und niedriger basiert dieses Modul auf [Canvas](https://github.com/Automattic/node-canvas), einer Canvas-Implementierung für Node.js. Canvas hängt von [Cairo](https://cairographics.org/) ab.

#### Installationsdetails

Standardmäßig werden Binärdateien für macOS, Linux und Windows während des `npm install` Ihres Projekts heruntergeladen. Wenn Sie kein unterstütztes Betriebssystem oder keine unterstützte Prozessorarchitektur haben, wird das Modul auf Ihrem System kompiliert. Dies erfordert mehrere Abhängigkeiten, darunter Cairo und Pango.

Detaillierte Installationsinformationen finden Sie im [node-canvas-Wiki](https://github.com/Automattic/node-canvas/wiki/_pages). Nachfolgend finden Sie einzeilige Installationsanweisungen für gängige Betriebssysteme. Beachten Sie, dass `libgif/giflib`, `librsvg` und `libjpeg` optional sind und nur für GIF-, SVG- bzw. JPEG-Unterstützung benötigt werden. Cairo v1.10.0 oder höher ist erforderlich.

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