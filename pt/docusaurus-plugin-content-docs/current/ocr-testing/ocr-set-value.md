---
id: ocr-set-value
title: ocrSetValue
---

Enviar uma sequência de pressionamentos de teclas para um elemento. Isso irá:

-   detectar automaticamente o elemento
-   focar no campo clicando nele
-   definir o valor no campo

O comando irá buscar pelo texto fornecido e tentar encontrar uma correspondência baseada na Lógica Fuzzy do [Fuse.js](https://fusejs.io/). Isso significa que se você fornecer um seletor com erro de digitação, ou o texto encontrado pode não ser uma correspondência 100%, ele ainda tentará retornar um elemento. Veja os [logs](#logs) abaixo.

## Uso

```js
await brower.ocrSetValue({
    text: "docs",
    value: "specfileretries",
});
```

## Saída

### Logs

```log
[0-0] 2024-05-26T04:17:51.355Z INFO webdriver: COMMAND ocrSetValue(<object>)
......................
[0-0] 2024-05-26T04:17:52.356Z INFO @wdio/ocr-service:ocrGetElementPositionByText: We searched for the word "docs" and found one match "docs" with score "100%"
```

## Opções

### `text`

-   **Tipo:** `string`
-   **Obrigatório:** sim

O texto que você deseja procurar para clicar.

#### Exemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

-   **Tipo:** `string`
-   **Obrigatório:** sim

Valor a ser adicionado.

#### Exemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `submitValue`

-   **Tipo:** `boolean`
-   **Obrigatório:** não
-   **Padrão:** `false`

Se o valor também precisa ser enviado no campo de entrada. Isso significa que um "ENTER" será enviado no final da string.

#### Exemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

-   **Tipo:** `number`
-   **Obrigatório:** não
-   **Padrão:** `500` milissegundos

Esta é a duração do clique. Se quiser, você também pode criar um "clique longo" aumentando o tempo.

#### Exemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    clickDuration: 3000, // Isso é 3 segundos
});
```

### `contrast`

-   **Tipo:** `number`
-   **Obrigatório:** não
-   **Padrão:** `0.25`

Quanto maior o contraste, mais escura a imagem e vice-versa. Isso pode ajudar a encontrar texto em uma imagem. Aceita valores entre `-1` e `1`.

#### Exemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    contrast: 0.5,
});
```

### `haystack`

-   **Tipo:** `number`
-   **Obrigatório:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Esta é a área de busca na tela onde o OCR precisa procurar por texto. Isso pode ser um elemento ou um retângulo contendo `x`, `y`, `width` e `height`

#### Exemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: $("elementSelector"),
});

// OU
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    haystack: await $("elementSelector"),
});

// OU
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    // Use holandês como idioma
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

-   **Tipo:** `object`
-   **Obrigatório:** não

Você pode clicar na tela em relação ao elemento correspondente. Isso pode ser feito com base em pixels relativos `above`, `right`, `below` ou `left` do elemento correspondente.

:::note

As seguintes combinações são permitidas

-   propriedades individuais
-   `above` + `left` ou `above` + `right`
-   `below` + `left` ou `below` + `right`

As seguintes combinações **NÃO** são permitidas

-   `above` mais `below`
-   `left` mais `right`

:::

#### `relativePosition.above`

-   **Tipo:** `number`
-   **Obrigatório:** não

Clique x pixels `acima` do elemento correspondente.

##### Exemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        above: 100,
    },
});
```

#### `relativePosition.right`

-   **Tipo:** `number`
-   **Obrigatório:** não

Clique x pixels à `direita` do elemento correspondente.

##### Exemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        right: 100,
    },
});
```

#### `relativePosition.below`

-   **Tipo:** `number`
-   **Obrigatório:** não

Clique x pixels `abaixo` do elemento correspondente.

##### Exemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        below: 100,
    },
});
```

#### `relativePosition.left`

-   **Tipo:** `number`
-   **Obrigatório:** não

Clique x pixels à `esquerda` do elemento correspondente.

##### Exemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    relativePosition: {
        left: 100,
    },
});
```

### `fuzzyFindOptions`

Você pode alterar a lógica fuzzy para encontrar texto com as seguintes opções. Isso pode ajudar a encontrar uma correspondência melhor

#### `fuzzyFindOptions.distance`

-   **Tipo:** `number`
-   **Obrigatório:** não
-   **Padrão:** 100

Determina quão próxima a correspondência deve estar da localização fuzzy (especificada por location). Uma correspondência de letra exata que esteja à distância de caracteres da localização fuzzy seria classificada como uma incompatibilidade completa. Uma distância de 0 requer que a correspondência esteja na localização exata especificada. Uma distância de 1000 exigiria uma correspondência perfeita para estar dentro de 800 caracteres da localização a ser encontrada usando um limiar de 0,8.

##### Exemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
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
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        location: 20,
    },
});
```

#### `fuzzyFindOptions.threshold`

-   **Tipo:** `number`
-   **Obrigatório:** não
-   **Padrão:** 0.6

Em que ponto o algoritmo de correspondência desiste. Um limiar de 0 requer uma correspondência perfeita (tanto de letras quanto de localização), um limiar de 1.0 corresponderia a qualquer coisa.

##### Exemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        threshold: 0.8,
    },
});
```

#### `fuzzyFindOptions.isCaseSensitive`

-   **Tipo:** `boolean`
-   **Obrigatório:** não
-   **Padrão:** false

Se a pesquisa deve diferenciar maiúsculas de minúsculas.

##### Exemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

-   **Tipo:** `number`
-   **Obrigatório:** não
-   **Padrão:** 2

Apenas as correspondências cujo comprimento excede esse valor serão retornadas. (Por exemplo, se você quiser ignorar correspondências de caractere único no resultado, defina-o como 2)

##### Exemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        minMatchCharLength: 5,
    },
});
```

#### `fuzzyFindOptions.findAllMatches`

-   **Tipo:** `number`
-   **Obrigatório:** não
-   **Padrão:** false

Quando `true`, a função de correspondência continuará até o final de um padrão de pesquisa, mesmo que uma correspondência perfeita já tenha sido localizada na string.

##### Exemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```