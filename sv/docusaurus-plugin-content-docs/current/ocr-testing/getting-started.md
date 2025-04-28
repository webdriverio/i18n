---
id: getting-started
title: Kom igång
---

## Installation

Det enklaste sättet är att behålla `@wdio/ocr-service` som en beroende i din `package.json` via.

```bash npm2yarn
npm install @wdio/ocr-service --save-dev
```

Instruktioner om hur man installerar `WebdriverIO` finns [här.](../gettingstarted)

:::note
Denna modul använder Tesseract som OCR-motor. Som standard kommer den att kontrollera om du har en lokal installation av Tesseract installerad på ditt system, om så är fallet, kommer den att använda den. Om inte, kommer den att använda [Node.js Tesseract.js](https://github.com/naptha/tesseract.js) modulen som automatiskt installeras för dig.

Om du vill påskynda bildbehandlingen så är rådet att använda en lokalt installerad version av Tesseract. Se även [Testkörningshastighet](./more-test-optimization#using-a-local-installation-of-tesseract).
:::

Instruktioner om hur man installerar Tesseract som ett systemberoende på ditt lokala system finns [här](https://tesseract-ocr.github.io/tessdoc/Installation.html).

:::caution
För installationsfrågor/fel med Tesseract, vänligen hänvisa till
[Tesseract](https://github.com/tesseract-ocr/tesseract) projektet.
:::

## Typescript-stöd

Se till att du lägger till `@wdio/ocr-service` i din `tsconfig.json` konfigurationsfil.

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/ocr-service"]
    }
}
```

## Konfiguration

För att använda tjänsten behöver du lägga till `ocr` i din tjänstearray i `wdio.conf.ts`

```js
// wdio.conf.js
exports.config = {
    //...
    services: [
        // your other services
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

### Konfigurationsalternativ

#### `contrast`

-   **Typ:** `number`
-   **Obligatorisk:** Nej
-   **Standard:** `0.25`

Ju högre kontrast, desto mörkare blir bilden och vice versa. Detta kan hjälpa till att hitta text i en bild. Den accepterar värden mellan `-1` och `1`.

#### `imagesFolder`

-   **Typ:** `string`
-   **Obligatorisk:** Nej
-   **Standard:** `{project-root}/.tmp/ocr`

Mappen där OCR-resultaten lagras.

:::note
Om du anger en anpassad `imagesFolder`, kommer tjänsten automatiskt att lägga till undermappen `ocr` till den.
:::

#### `language`

-   **Typ:** `string`
-   **Obligatorisk:** Nej
-   **Standard:** `eng`

Språket som Tesseract kommer att känna igen. Mer information finns [här](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) och de språk som stöds kan hittas [här](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

## Loggar

Denna modul kommer automatiskt att lägga till extra loggar i WebdriverIO-loggarna. Den skriver till `INFO` och `WARN`-loggar med namnet `@wdio/ocr-service`.
Exempel finns nedan.

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