---
id: ocr-click-on-text
title: ocrClickOnText
---

Clique em um elemento com base nos textos fornecidos. O comando procurará o texto fornecido e tentará encontrar uma correspondência com base na Lógica Fuzzy do [Fuse.js](https://fusejs.io/). Isso significa que se você fornecer um seletor com um erro de digitação, ou o texto encontrado pode não ser uma correspondência 100%, ele ainda tentará retornar um elemento. Veja os [logs](#logs) abaixo.

## Usage

```js
await browser.ocrClickOnText({ text: "Start3d" });
```

## Output

### Logs

```log
# Still finding a match even though we searched for "Start3d" and the found text was "Started"
[0-0] 2024-05-25T05:05:20.096Z INFO webdriver: COMMAND ocrClickOnText(<object>)
......................
[0-0] 2024-05-25T05:05:21.022Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "Start3d". The match "Started" with score "85.71%" will be used.
```

### Image

Você encontrará uma imagem na sua pasta (padrão)[`imagesFolder`](./getting-started#imagesfolder) com um alvo para mostrar onde o módulo clicou.

![Process steps](/img/ocr/ocr-click-on-text-target.jpg)

## Options

### `text`

-   **Type:** `string`
-   **Mandatory:** yes

O texto que você deseja procurar para clicar.

#### Example

```js
await browser.ocrClickOnText({ text: "WebdriverIO" });
```

### `clickDuration`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** `500` milliseconds

Esta é a duração do clique. Se desejar, você também pode criar um "clique longo" aumentando o tempo.

#### Example

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    clickDuration: 3000, // This is 3 seconds
});
```

### `contrast`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** `0.25`

Quanto maior o contraste, mais escura a imagem e vice-versa. Isso pode ajudar a encontrar texto em uma imagem. Aceita valores entre `-1` e `1`.

#### Example

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    contrast: 0.5,
});
```

### `haystack`

-   **Type:** `number`
-   **Mandatory:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Esta é a área de busca na tela onde o OCR precisa procurar texto. Pode ser um elemento ou um retângulo contendo `x`, `y`, `width` e `height`

#### Example

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: $("elementSelector"),
});

// OR
await browser.ocrClickOnText({
    text: "WebdriverIO",
    haystack: await $("elementSelector"),
});

// OR
await browser.ocrClickOnText({
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

-   **Type:** `string`
-   **Mandatory:** No
-   **Default:** `eng`

O idioma que o Tesseract reconhecerá. Mais informações podem ser encontradas [aqui](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) e os idiomas suportados podem ser encontrados [aqui](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Example

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrClickOnText({
    text: "WebdriverIO",
    // Use Dutch as a language
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **Type:** `object`
-   **Mandatory:** no

Você pode clicar na tela em relação ao elemento correspondente. Isso pode ser feito com base em pixels relativos `above`, `right`, `below` ou `left` do elemento correspondente.

:::note

As seguintes combinações são permitidas

-   propriedades únicas
-   `above` + `left` ou `above` + `right`
-   `below` + `left` ou `below` + `right`

As seguintes combinações **NÃO** são permitidas

-   `above` mais `below`
-   `left` mais `right`

:::

#### `relativePosition.above`

-   **Type:** `number`
-   **Mandatory:** no

Clique x pixels `acima` do elemento correspondente.

##### Example

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        above: 100,
    },
});
```

#### `relativePosition.right`

-   **Type:** `number`
-   **Mandatory:** no

Clique x pixels à `direita` do elemento correspondente.

##### Example

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        right: 100,
    },
});
```

#### `relativePosition.below`

-   **Type:** `number`
-   **Mandatory:** no

Clique x pixels `abaixo` do elemento correspondente.

##### Example

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        below: 100,
    },
});
```

#### `relativePosition.left`

-   **Type:** `number`
-   **Mandatory:** no

Clique x pixels à `esquerda` do elemento correspondente.

##### Example

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    relativePosition: {
        left: 100,
    },
});
```

### `fuzzyFindOptions`

Você pode alterar a lógica fuzzy para encontrar texto com as seguintes opções. Isso pode ajudar a encontrar uma correspondência melhor

#### `fuzzyFindOptions.distance`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** 100

Determina o quão próxima deve ser a correspondência em relação à localização fuzzy (especificada por location). Uma correspondência exata de letra que esteja a uma distância de caracteres da localização fuzzy seria pontuada como uma incompatibilidade completa. Uma distância de 0 requer que a correspondência esteja na localização exata especificada. Uma distância de 1000 exigiria uma correspondência perfeita para estar dentro de 800 caracteres da localização a ser encontrada usando um limiar de 0,8.

##### Example

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** 0

Determina aproximadamente onde no texto espera-se encontrar o padrão.

##### Example

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** 0.6

Em que ponto o algoritmo de correspondência desiste. Um limiar de 0 requer uma correspondência perfeita (tanto de letras quanto de localização), um limiar de 1.0 corresponderia a qualquer coisa.

##### Example

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

-   **Type:** `boolean`
-   **Mandatory:** no
-   **Default:** false

Se a pesquisa deve diferenciar maiúsculas de minúsculas.

##### Example

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** 2

Apenas as correspondências cujo comprimento exceda este valor serão retornadas. (Por exemplo, se você quiser ignorar correspondências de caracteres únicos no resultado, defina como 2)

##### Example

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

-   **Type:** `number`
-   **Mandatory:** no
-   **Default:** false

Quando `true`, a função de correspondência continuará até o final de um padrão de pesquisa, mesmo que uma correspondência perfeita já tenha sido localizada na string.

##### Example

```js
await browser.ocrClickOnText({
    text: "WebdriverIO",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```
```