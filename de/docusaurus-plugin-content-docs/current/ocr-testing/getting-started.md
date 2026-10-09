---
id: getting-started
title: Erste Schritte
description: "Installieren und konfigurieren Sie @wdio/ocr-service, richten Sie die TypeScript-Unterstützung ein und passen Sie die Optionen für Kontrast, Bildordner und Sprache an."
---

## Installation

Der einfachste Weg ist, `@wdio/ocr-service` als Abhängigkeit in Ihrer `package.json` zu führen.

```bash npm2yarn
npm install @wdio/ocr-service --save-dev
```

Anweisungen zur Installation von `WebdriverIO` finden Sie [hier.](../gettingstarted)

:::note
Dieses Modul verwendet Tesseract als OCR-Engine. Standardmäßig prüft es, ob Tesseract lokal auf Ihrem System installiert ist, und verwendet in diesem Fall diese Installation. Andernfalls wird das [Node.js Tesseract.js](https://github.com/naptha/tesseract.js)-Modul verwendet, das automatisch für Sie installiert wird.

Wenn Sie die Bildverarbeitung beschleunigen möchten, empfiehlt es sich, eine lokal installierte Version von Tesseract zu verwenden. Siehe auch [Testausführungszeit](./more-test-optimization#using-a-local-installation-of-tesseract).
:::

Anweisungen zur Installation von Tesseract als Systemabhängigkeit auf Ihrem lokalen System finden Sie [hier](https://tesseract-ocr.github.io/tessdoc/Installation.html).

:::caution
Bei Fragen/Fehlern zur Installation von Tesseract wenden Sie sich bitte an das
[Tesseract](https://github.com/tesseract-ocr/tesseract)-Projekt.
:::

## TypeScript-Unterstützung

Stellen Sie sicher, dass Sie `@wdio/ocr-service` zu Ihrer `tsconfig.json`-Konfigurationsdatei hinzufügen.

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/ocr-service"]
    }
}
```

## Konfiguration

Um den Service zu verwenden, müssen Sie `ocr` zu Ihrem Services-Array in `wdio.conf.ts` hinzufügen

```js
// wdio.conf.js
exports.config = {
    //...
    services: [
        // Ihre anderen Services
        [
            "ocr",
            {
                contrast: 0.25,
                imagesFolder: ".tmp/",
                language: "eng",
            },
        ],
    ],
};
```

### Konfigurationsoptionen

#### `contrast`

<Option type="number" default="0.25" required="No">

Je höher der Kontrast, desto dunkler das Bild und umgekehrt. Dies kann helfen, Text in einem Bild zu finden. Es werden Werte zwischen `-1` und `1` akzeptiert.

</Option>
#### `imagesFolder`

<Option type="string" default={`{project-root}/.tmp/ocr`} required="No">

Der Ordner, in dem die OCR-Ergebnisse gespeichert werden.

:::note
Wenn Sie einen benutzerdefinierten `imagesFolder` angeben, fügt der Service automatisch den Unterordner `ocr` hinzu.
:::

</Option>
#### `language`

<Option type="string" default="eng" required="No">

Die Sprache, die Tesseract erkennen soll. Weitere Informationen finden Sie [hier](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) und die unterstützten Sprachen finden Sie [hier](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
## Logs

Dieses Modul fügt den WebdriverIO-Logs automatisch zusätzliche Logs hinzu. Es schreibt in die `INFO`- und `WARN`-Logs mit dem Namen `@wdio/ocr-service`.
Beispiele finden Sie unten.

```log
...............
[0-0] 2024-05-24T06:55:12.739Z INFO @wdio/ocr-service: Adding commands to global browser
[0-0] 2024-05-24T06:55:12.750Z INFO @wdio/ocr-service: Adding browser command "ocrGetText" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrGetElementPositionByText" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrWaitForTextDisplayed" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrClickOnText" to browser object
[0-0] 2024-05-24T06:55:12.751Z INFO @wdio/ocr-service: Adding browser command "ocrSetValue" to browser object
...............
[0-0] 2024-05-24T06:55:13.667Z INFO @wdio/ocr-service:getData: Using system installed version of Tesseract
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:getData: It took '0.351s' to process the image.
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:getData: The following text was found through OCR:
[0-0]
[0-0] IQ Docs API Blog Contribute Community Sponsor Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:getData: OCR Image with found text can be found here:
[0-0]
[0-0] .tmp/ocr/desktop-1716533713585.png
[0-0] 2024-05-24T06:55:14.019Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "Get Started" and found one match "Started" with score "63.64
...............
```