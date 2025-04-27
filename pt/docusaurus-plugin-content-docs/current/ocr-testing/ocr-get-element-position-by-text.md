---
id: ocr-get-element-position-by-text
title: ocrGetElementPositionByText
---

Obtenha a posição de um texto na tela. O comando procurará o texto fornecido e tentará encontrar uma correspondência baseada na Lógica Fuzzy do [Fuse.js](https://fusejs.io/). Isso significa que se você fornecer um seletor com um erro de digitação, ou o texto encontrado não for 100% igual, ele ainda tentará retornar um elemento. Veja os [logs](#logs) abaixo.

## Uso

```js
const result = await browser.ocrGetElementPositionByText("Username");

console.log("result = ", JSON.stringify(result, null, 2));
```

## Saída

### Resultado

```logs
result = {
  "dprPosition": {
    "left": 373,
    "top": 606,
    "right": 439,
    "bottom": 620
  },
  "filePath": ".tmp/ocr/desktop-1716658199410.png",
  "matchedString": "Started",
  "originalPosition": {
    "left": 373,
    "top": 606,
    "right": 439,
    "bottom": 620
  },
  "score": 85.71,
  "searchValue": "Start3d"
}
```

### Logs

```log
# Still finding a match even though we searched for "Start3d" and the found text was "Started"
[0-0] 2024-05-25T17:29:59.179Z INFO webdriver: COMMAND ocrGetElementPositionByText(<object>)
......................
[0-0] 2024-05-25T17:29:59.993Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

## Opções

### `text`

-   **Tipo:** `string`
-   **Obrigatório:** sim

O texto que você deseja procurar para clicar.

#### Exemplo

```js
await browser.ocrGetElementPositionByText({ text: "WebdriverIO" });
```

### `contrast`

-   **Tipo:** `number`
-   **Obrigatório:** não
-   **Padrão:** `0.25`

Quanto maior o contraste, mais escura a imagem e vice-versa. Isso pode ajudar a encontrar texto em uma imagem. Aceita valores entre `-1` e `1`.

#### Exemplo

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

-   **Tipo:** `number`
-   **Obrigatório:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Esta é a área de busca na tela onde o OCR precisa procurar por texto. Pode ser um elemento ou um retângulo contendo `x`, `y`, `width` e `height`

#### Exemplo

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// OU
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// OU
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    haystack: {
        x: 10,
        y: 50,
        width: 300,
        height: 75,
    },
});
```

### `language`

-   **Tipo:** `string`
-   **Obrigatório:** Não
-   **Padrão:** `eng`

O idioma que o Tesseract reconhecerá. Mais informações podem ser encontradas [aqui](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) e os idiomas suportados podem ser encontrados [aqui](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Exemplo

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    // Use Dutch as a language
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

Você pode alterar a lógica fuzzy para encontrar texto com as seguintes opções. Isso pode ajudar a encontrar uma correspondência melhor

#### `fuzzyFindOptions.distance`

-   **Tipo:** `number`
-   **Obrigatório:** não
-   **Padrão:** 100

Determina quão próxima a correspondência deve estar da localização fuzzy (especificada por location). Uma correspondência exata de letra que está a caracteres de distância da localização fuzzy pontuaria como uma incompatibilidade completa. Uma distância de 0 requer que a correspondência esteja na localização exata especificada. Uma distância de 1000 exigiria uma correspondência perfeita para estar dentro de 800 caracteres da localização a ser encontrada usando um limite de 0.8.

##### Exemplo

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

-   **Tipo:** `number`
-   **Obrigatório:** não
-   **Padrão:** 0

Determina aproximadamente onde no texto espera-se encontrar o padrão.

##### Exemplo

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

-   **Tipo:** `number`
-   **Obrigatório:** não
-   **Padrão:** 0.6

Em que ponto o algoritmo de correspondência desiste. Um limite de 0 requer uma correspondência perfeita (tanto de letras quanto de localização), um limite de 1.0 corresponderia a qualquer coisa.

##### Exemplo

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

-   **Tipo:** `boolean`
-   **Obrigatório:** não
-   **Padrão:** false

Se a busca deve ser sensível a maiúsculas e minúsculas.

##### Exemplo

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

-   **Tipo:** `number`
-   **Obrigatório:** não
-   **Padrão:** 2

Apenas as correspondências cujo comprimento exceder este valor serão retornadas. (Por exemplo, se você quiser ignorar correspondências de caracteres únicos no resultado, defina como 2)

##### Exemplo

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

-   **Tipo:** `number`
-   **Obrigatório:** não
-   **Padrão:** false

Quando `true`, a função de correspondência continuará até o final de um padrão de busca, mesmo se uma correspondência perfeita já tiver sido localizada na string.

##### Exemplo

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```