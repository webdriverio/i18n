---
id: wdio-cucumberjs-json-reporter
title: CucumberJS JSON Reporter
custom_edit_url: https://github.com/wswebcreation/wdio-cucumberjs-json-reporter/edit/main/README.md
---


> wdio-cucumberjs-json-reporter ist ein Paket von Drittanbietern. Weitere Informationen finden Sie auf [GitHub](https://github.com/wswebcreation/wdio-cucumberjs-json-reporter) | [npm](https://nodei.co/npm/wdio-cucumberjs-json-reporter)

Ein WDIO-Reporter, der CucumberJS-JSON-Dateien für WebdriverIO v8 und höher erstellt.

[![NPM](https://nodei.co/npm/wdio-cucumberjs-json-reporter.png)](https://nodei.co/npm/wdio-cucumberjs-json-reporter/)

## Was macht es
Dieser Reporter generiert eine **Cucumber JSON-Datei** für jedes Feature, das getestet wird. Die JSON-Datei kann mit jedem beliebigen Bericht verwendet werden, den Sie verwenden möchten, wie zum Beispiel [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter).

Es fügt der Feature-Datei auch Metadaten über die laufende Instanz hinzu und bietet Ihnen nicht zuletzt die Möglichkeit, Anhänge zur JSON-Ausgabe hinzuzufügen.

## Installation
Am einfachsten ist es, `wdio-cucumberjs-json-reporter` als devDependency in Ihrer `package.json` zu behalten.

```json
{
  "devDependencies": {
    "wdio-cucumberjs-json-reporter": "^5.0.0"
  }
}
```

Sie können es einfach mit folgendem Befehl tun:

```bash
npm install wdio-cucumberjs-json-reporter --save-dev
```

so wird es automatisch zu Ihrer `package.json` hinzugefügt

Anweisungen zur Installation von `WebdriverIO` finden Sie [hier](https://webdriver.io/docs/gettingstarted).

## Konfiguration
Konfigurieren Sie das Ausgabeverzeichnis und die Sprache in Ihrer wdio.conf.js-Datei:

```js
export const config = {
    // ...
    reporters: [
        // So mit den Standardoptionen, siehe die Optionen unten
        'cucumberjs-json',

        // ODER so, wenn Sie den Ordner und die Sprache festlegen möchten
        [ 'cucumberjs-json', {
                jsonFolder: '.tmp/new/',
                language: 'en',
            },
        ],
    ],
  // ...
}
```

> VERWENDEN SIE NICHT BEIDE METHODEN ZUM HINZUFÜGEN DES REPORTERS, DIES IST NUR EIN BEISPIEL!

## Optionen
### `jsonFolder`
- **Typ:** `String`
- **Erforderlich:** Nein
- **Standard:** `.tmp/json/`

Das Verzeichnis, in dem die von diesem Bericht generierten JSON-Dateien gespeichert werden, relativ zu dem Ort, von dem aus das Skript gestartet wird.

**Hinweis:** Wenn Sie ein npm-Skript von der Kommandozeile aus verwenden, wie zum Beispiel `npm run test`, wird der `jsonFolder` relativ zu dem Pfad sein, von dem aus das Skript ausgeführt wird. Die Ausführung vom Stammverzeichnis Ihres Projekts aus erstellt den `jsonFolder` auch im Stammverzeichnis Ihres Projekts.

### `language`
- **Typ:** `String`
- **Erforderlich:** Nein
- **Standard:** `en`

Die Sprache, in der die Gherkin-Szenarien geschrieben sind (standardmäßig Englisch). Die Liste der Sprachcodes und ihrer Schlüsselwörter finden Sie [hier](https://cucumber.io/docs/gherkin/reference/#overview).

### `disableHooks`
- **Typ:** `boolean`
- **Erforderlich:** Nein
- **Standard:** `false`

Hook-Details werden nicht Teil der Generierung sein, wenn diese Eigenschaft auf `true` gesetzt ist.

### `reportFilePerRetry`
- **Typ:** `boolean`
- **Erforderlich:** Nein
- **Standard:** `true`

Wenn ein Spec wiederholt wird, wird der Bericht an die bestehende Berichtsdatei aus den vorherigen Versuchen angehängt, wenn diese Eigenschaft auf `false` gesetzt ist.

**Beispiel**:
`['cucumberjs-json', { jsonFolder: '.tmp/new/', language: 'en', disableHooks:true}]`

## Metadaten

> **Hinweis:**\
> Dies wird derzeit nicht unterstützt, wenn Sie WebdriverIO V6 verwenden. WebdriverIO V5 unterstützt dies weiterhin und WebdriverIO V7 unterstützt es wieder.

Wie bereits erwähnt, kann dieser Bericht automatisch die Metadaten des aktuellen Computers/Geräts speichern, auf dem das Feature ausgeführt wurde.

Um dies anzupassen, können Sie es hinzufügen, indem Sie das folgende Objekt zu Ihren `capabilities` hinzufügen

```js
// Beispiel wdio.conf.js
export const config = {
    //..
    capabilities: [
        {
            browserName: 'chrome',
            // Fügen Sie das hinzu
            'cjson:metadata': {
                // Für einen Browser
                browser: {
                    name: 'chrome',
                    version: '58',
                },
                // für eine App
                app: {
                  name: 'name.of.app.ipa',
                  version: '1.2.3',
                },
                device: 'MacBook Pro 15',
                platform: {
                    name: 'OSX',
                    version: '10.12.6'
                }
            },
        },
    ],
};
```

> Das Metadatenobjekt muss das Präfix `cjson` haben, sonst funktioniert es nicht!

### Metadatenwerte
#### `metadata.app.name`
- **Typ:** `string`

**z.B.:** Der Name der App.

#### `metadata.app.version`
- **Typ:** `string`

**z.B.:** Die Version der App.

#### `metadata.browser.name`
- **Typ:** `string`
- **Mögliche Werte:** `internet explorer | edge | chrome | firefox | safari`

#### `metadata.browser.version`
- **Typ:** `string`

**z.B.:** Die Version des Browsers. Diese kann manuell hinzugefügt oder während der Ausführung der Tests abgerufen werden, um die genaue Versionsnummer zu erhalten.

#### `metadata.device`
- **Typ:** `string`

**z.B.:** Ein Name, der den Gerätetyp repräsentiert. Wenn Sie es beispielsweise auf einer virtuellen Maschine ausführen, können Sie hier `Virtual Machine` angeben, oder den Namen des Mobilgeräts, wie zum Beispiel `iPhone 7 Plus`.

#### `metadata.platform.name`
- **Typ:** `string`
- **Mögliche Werte:** `windows | osx | linux | ubuntu | android | ios`

#### `metadata.platform.version`
- **Typ:** `string`

**z.B.:** Die Version der Plattform

> Wenn Sie das `browser`-Objekt in den Metadaten nicht angeben, ermittelt dieses Modul es automatisch für Sie. **Es wird es immer mit dem aktuellsten Wert überschreiben, den es ermitteln kann.**

> Wenn Sie das `device` und/oder das `platform`-Objekt nicht angeben, wird es standardmäßig auf `not known` gesetzt.

> Wenn Sie keinen `browser.name` oder eine `browser.version` angeben, versucht das Modul, dies automatisch zu ermitteln.

## Anhang
Sie haben die Möglichkeit, Daten an die JSON-Datei in all diesen Hooks/Schritten anzuhängen:

- Before(All)
- After(All)
- Given
- When
- Then
- And

Das Einzige, was Sie bereitstellen müssen, ist der folgende Code in Ihren Step-Dateien.

Für ES-Module (ESM)
```js
import cucumberJson from 'wdio-cucumberjs-json-reporter';

// Einen String anhängen (wenn kein Typ angegeben ist, wird automatisch 'text/plain' als Standard verwendet)
cucumberJson.attach('just a string');
cucumberJson.attach('just a second string', 'text/plain');

// JSON anhängen
cucumberJson.attach({"json-string": true}, 'application/json');

// Einen Screenshot in einem Before-Hook anhängen
cucumberJson.attach(await browser.takeScreenshot(), 'image/png');
```
Für CommonJS (CJS)
```js
const { attach } = require("wdio-cucumberjs-json-reporter");

// Einen String anhängen (wenn kein Typ angegeben ist, wird automatisch 'text/plain' als Standard verwendet)
attach('just a string');
attach('just a second string', 'text/plain');

// JSON anhängen
attach({"json-string": true}, 'application/json');

// Einen Screenshot in einem Before-Hook anhängen
attach(await browser.takeScreenshot(), 'image/png');
```

## Verwendung mit multiple-cucumber-html-reporter
Das vorherige Modul für WebdriverIO V4, [wdio-multiple-cucumber-html-reporter](https://github.com/webdriverio-community/wdio-multiple-cucumber-html-reporter),
hatte eine integrierte Verbindung mit dem [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter)-Modul. **Dies ist bei diesem Reporter nicht der Fall**, da die neue Einrichtung von WebdriverIO V5 auf einer Instanz basiert, die es mir nicht erlaubt, den `onPrepare`- und `onComplete`-Hook zu verwenden.

Wenn Sie weiterhin das [multiple-cucumber-html-reporter](https://github.com/wswebcreation/multiple-cucumber-html-reporter)-Modul verwenden möchten, können Sie Folgendes zu Ihrer Konfigurationsdatei hinzufügen.

- Installieren Sie das Modul mit

    ```bash
    npm install multiple-cucumber-html-reporter --save-dev
    ```

- Fügen Sie dies zu Ihrer Konfigurationsdatei hinzu

    ```js
    import fs from 'node:fs/promises'
    // Importieren Sie das Modul
    import { generate } from 'multiple-cucumber-html-reporter'

    // Beispiel wdio.conf.js
    export const config = {
      //..

      // =====
      // Hooks
      // =====
      /**
       * Wird einmal ausgeführt, bevor alle Worker gestartet werden.
       */
      onPrepare: () => {
        // Entfernen Sie den Ordner `.tmp/`, der die JSON- und Berichtsdateien enthält
        return fs.rm('.tmp/', { recursive: true });
      },
      /**
       * Wird ausgeführt, nachdem alle Worker heruntergefahren wurden und der Prozess beendet werden soll.
       */
      onComplete: () => {
        // Erzeugen Sie den Bericht, wenn alle Tests abgeschlossen sind
        generate({
          // Erforderlich
          // Dieser Teil muss der gleiche Pfad sein, in dem Sie die JSON-Dateien speichern
          // Standard = '.tmp/json/'
          jsonDir: '.tmp/json/',
          reportPath: '.tmp/report/',
          // Weitere Optionen finden Sie unter https://github.com/wswebcreation/multiple-cucumber-html-reporter#options
        });
      }
    }
    ```

## Ältere WebdriverIO-Versionen

> **DIESES MODUL KANN NUR MIT WebdriverIO V8+ FUNKTIONIEREN!**\
> **Für V6 überprüfen Sie bitte die Dokumentation [hier](https://github.com/webdriverio-community/wdio-cucumberjs-json-reporter/tree/v6) und verwenden Sie Version 2.0.4**\
> **Für V5 überprüfen Sie bitte die Dokumentation [hier](https://github.com/webdriverio-community/wdio-cucumberjs-json-reporter/tree/v5) und verwenden Sie Version 1.3.0**

> **DIESES MODUL IST KEIN ERSATZ FÜR [wdio-multiple-cucumber-html-reporter](https://github.com/wswebcreation/wdio-multiple-cucumber-html-reporter). DIESES MODUL UNTERSTÜTZT NUR WEBDRIVERIO V4 UND ERSTELLT AUCH EINEN BERICHT. DIESES MODUL ERSTELLT NUR EINE JSON, KEINEN BERICHT!!**