---
id: ocr-get-element-position-by-text
title: ocrGetElementPositionByText
description: "Obtenha a posição de um texto na tela com ocrGetElementPositionByText, usando OCR e correspondência aproximada (fuzzy matching) para encontrá-lo."
---

Obtém a posição de um texto na tela. O comando procurará o texto fornecido e tentará encontrar uma correspondência com base na Lógica Fuzzy do [Fuse.js](https://fusejs.io/). Isso significa que, se você fornecer um seletor com um erro de digitação, ou se o texto encontrado não for uma correspondência 100% exata, ele ainda tentará retornar um elemento. Veja os [logs](#logs) abaixo.

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
# Ainda encontrando uma correspondência, mesmo tendo pesquisado por "Start3d" e o texto encontrado ter sido "Started"
[0-0] 2024-05-25T17:29:59.179Z INFO webdriver: COMMAND ocrGetElementPositionByText(<object>)
......................
[0-0] 2024-05-25T17:29:59.993Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

## Opções

### `text`

<Option type="string" required="yes">

O texto que você deseja procurar para clicar.

</Option>
#### Exemplo

```js
await browser.ocrGetElementPositionByText({ text: "WebdriverIO" });
```

### `contrast`

<Option type="number" default="0.25" required="no">

Quanto maior o contraste, mais escura a imagem e vice-versa. Isso pode ajudar a encontrar texto em uma imagem. Aceita valores entre `-1` e `1`.

</Option>
#### Exemplo

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Esta é a área de busca na tela onde o OCR precisa procurar o texto. Pode ser um elemento ou um retângulo contendo `x`, `y`, `width` e `height`

</Option>
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

<Option type="string" default="eng" required="No">

O idioma que o Tesseract reconhecerá. Mais informações podem ser encontradas [aqui](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) e os idiomas suportados podem ser encontrados [aqui](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
#### Exemplo

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    // Usar holandês como idioma
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

Você pode alterar a lógica fuzzy para encontrar texto com as seguintes opções. Isso pode ajudar a encontrar uma correspondência melhor

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Determina o quão próxima a correspondência deve estar da localização fuzzy (especificada por location). Uma correspondência exata de letra que esteja a distance caracteres de distância da localização fuzzy seria pontuada como uma não correspondência completa. Uma distance de 0 exige que a correspondência esteja na localização exata especificada. Uma distance de 1000 exigiria que uma correspondência perfeita estivesse dentro de 800 caracteres da localização para ser encontrada usando um threshold de 0.8.

</Option>
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

<Option type="number" default="0" required="no">

Determina aproximadamente em que parte do texto se espera que o padrão seja encontrado.

</Option>
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

<Option type="number" default="0.6" required="no">

Em que ponto o algoritmo de correspondência desiste. Um threshold de 0 exige uma correspondência perfeita (tanto de letras quanto de localização), um threshold de 1.0 corresponderia a qualquer coisa.

</Option>
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

<Option type="boolean" default="false" required="no">

Se a busca deve diferenciar maiúsculas de minúsculas.

</Option>
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

<Option type="number" default="2" required="no">

Apenas as correspondências cujo comprimento exceda este valor serão retornadas. (Por exemplo, se você quiser ignorar correspondências de um único caractere no resultado, defina-o como 2)

</Option>
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

<Option type="number" default="false" required="no">

Quando `true`, a função de correspondência continuará até o final de um padrão de busca, mesmo que uma correspondência perfeita já tenha sido localizada na string.

</Option>
##### Exemplo

```js
await browser.ocrGetElementPositionByText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```