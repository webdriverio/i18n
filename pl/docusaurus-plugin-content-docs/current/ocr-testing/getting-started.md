---
id: getting-started
title: Pierwsze kroki
description: "Zainstaluj i skonfiguruj @wdio/ocr-service, skonfiguruj obsługę TypeScript oraz dostosuj opcje kontrastu, folderu obrazów i języka."
---

## Instalacja

Najprostszym sposobem jest dodanie `@wdio/ocr-service` jako zależności w pliku `package.json`.

```bash npm2yarn
npm install @wdio/ocr-service --save-dev
```

Instrukcje dotyczące instalacji `WebdriverIO` można znaleźć [tutaj.](../gettingstarted)

:::note
Ten moduł używa Tesseract jako silnika OCR. Domyślnie sprawdzi, czy masz lokalną instalację Tesseract w swoim systemie, a jeśli tak, to jej użyje. Jeśli nie, użyje modułu [Node.js Tesseract.js](https://github.com/naptha/tesseract.js), który jest instalowany automatycznie.

Jeśli chcesz przyspieszyć przetwarzanie obrazów, zalecamy użycie lokalnie zainstalowanej wersji Tesseract. Zobacz także [Czas wykonywania testów](./more-test-optimization#using-a-local-installation-of-tesseract).
:::

Instrukcje dotyczące instalacji Tesseract jako zależności systemowej w lokalnym systemie można znaleźć [tutaj](https://tesseract-ocr.github.io/tessdoc/Installation.html).

:::caution
W przypadku pytań lub błędów związanych z instalacją Tesseract prosimy o kontakt z projektem
[Tesseract](https://github.com/tesseract-ocr/tesseract).
:::

## Obsługa TypeScript

Upewnij się, że dodałeś `@wdio/ocr-service` do pliku konfiguracyjnego `tsconfig.json`.

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/ocr-service"]
    }
}
```

## Konfiguracja

Aby użyć tej usługi, musisz dodać `ocr` do tablicy services w `wdio.conf.ts`

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

### Opcje konfiguracji

#### `contrast`

<Option type="number" default="0.25" required="No">

Im wyższy kontrast, tym ciemniejszy obraz i odwrotnie. Może to pomóc w znalezieniu tekstu na obrazie. Przyjmuje wartości z zakresu od `-1` do `1`.

</Option>
#### `imagesFolder`

<Option type="string" default={`{project-root}/.tmp/ocr`} required="No">

Folder, w którym przechowywane są wyniki OCR.

:::note
Jeśli podasz własny `imagesFolder`, usługa automatycznie doda do niego podfolder `ocr`.
:::

</Option>
#### `language`

<Option type="string" default="eng" required="No">

Język, który będzie rozpoznawany przez Tesseract. Więcej informacji można znaleźć [tutaj](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions), a obsługiwane języki można znaleźć [tutaj](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
## Logi

Ten moduł automatycznie dodaje dodatkowe logi do logów WebdriverIO. Zapisuje je w logach `INFO` i `WARN` pod nazwą `@wdio/ocr-service`.
Przykłady można znaleźć poniżej.

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