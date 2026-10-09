---
id: ocr-set-value
title: ocrSetValue
description: "Digite em um campo de entrada localizado pelo seu texto visível com ocrSetValue, que encontra o campo usando OCR e correspondência aproximada (fuzzy matching)."
---

Envia uma sequência de pressionamentos de teclas para um elemento. Ele irá:

-   detectar automaticamente o elemento
-   colocar o foco no campo clicando nele
-   definir o valor no campo

O comando irá procurar o texto fornecido e tentar encontrar uma correspondência com base na Lógica Fuzzy do [Fuse.js](https://fusejs.io/). Isso significa que, se você fornecer um seletor com um erro de digitação, ou se o texto encontrado não for uma correspondência 100% exata, ele ainda tentará retornar um elemento. Veja os [logs](#logs) abaixo.

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

<Option type="string" required="yes">

O texto que você deseja procurar para clicar.

</Option>
#### Exemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `value`

<Option type="string" required="yes">

Valor a ser adicionado.

</Option>
#### Exemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
});
```

### `submitValue`

<Option type="boolean" default="false" required="no">

Se o valor também precisa ser enviado no campo de entrada. Isso significa que um "ENTER" será enviado ao final da string.

</Option>
#### Exemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    submitValue: true,
});
```

### `clickDuration`

<Option type="number" default="500 milliseconds" required="no">

Esta é a duração do clique. Se quiser, você também pode criar um "clique longo" aumentando o tempo.

</Option>
#### Exemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    clickDuration: 3000, // Isso equivale a 3 segundos
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

Quanto maior o contraste, mais escura a imagem e vice-versa. Isso pode ajudar a encontrar texto em uma imagem. Aceita valores entre `-1` e `1`.

</Option>
#### Exemplo

```js
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Esta é a área de busca na tela onde o OCR precisa procurar o texto. Pode ser um elemento ou um retângulo contendo `x`, `y`, `width` e `height`

</Option>
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

<Option type="string" default="eng" required="No">

O idioma que o Tesseract irá reconhecer. Mais informações podem ser encontradas [aqui](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) e os idiomas suportados podem ser encontrados [aqui](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

</Option>
#### Exemplo

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrSetValue({
    text: "WebdriverIO",
    value: "The Value",
    // Usar holandês como idioma
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `relativePosition`

<Option type="object" required="no">

Você pode clicar na tela em uma posição relativa ao elemento correspondente. Isso pode ser feito com base em pixels relativos `above` (acima), `right` (à direita), `below` (abaixo) ou `left` (à esquerda) do elemento correspondente

:::note

As seguintes combinações são permitidas

-   propriedades individuais
-   `above` + `left` ou `above` + `right`
-   `below` + `left` ou `below` + `right`

As seguintes combinações **NÃO** são permitidas

-   `above` mais `below`
-   `left` mais `right`

:::

</Option>
#### `relativePosition.above`

<Option type="number" required="no">

Clica x pixels `above` (acima) do elemento correspondente.

</Option>
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

<Option type="number" required="no">

Clica x pixels à `right` (direita) do elemento correspondente.

</Option>
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

<Option type="number" required="no">

Clica x pixels `below` (abaixo) do elemento correspondente.

</Option>
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

<Option type="number" required="no">

Clica x pixels à `left` (esquerda) do elemento correspondente.

</Option>
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

<Option type="number" default="100" required="no">

Determina o quão próxima a correspondência deve estar da localização fuzzy (especificada por location). Uma correspondência exata de letras que esteja a distance caracteres de distância da localização fuzzy seria pontuada como uma não correspondência completa. Uma distância de 0 exige que a correspondência esteja exatamente na localização especificada. Uma distância de 1000 exigiria que uma correspondência perfeita estivesse a até 800 caracteres da localização para ser encontrada usando um threshold de 0.8.

</Option>
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

<Option type="number" default="0" required="no">

Determina aproximadamente em que parte do texto se espera que o padrão seja encontrado.

</Option>
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

<Option type="number" default="0.6" required="no">

Em que ponto o algoritmo de correspondência desiste. Um threshold de 0 exige uma correspondência perfeita (tanto de letras quanto de localização), um threshold de 1.0 corresponderia a qualquer coisa.

</Option>
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

<Option type="boolean" default="false" required="no">

Se a busca deve diferenciar maiúsculas de minúsculas.

</Option>
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

<Option type="number" default="2" required="no">

Somente as correspondências cujo comprimento exceda este valor serão retornadas. (Por exemplo, se você quiser ignorar correspondências de um único caractere no resultado, defina como 2)

</Option>
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

<Option type="number" default="false" required="no">

Quando `true`, a função de correspondência continuará até o final de um padrão de busca, mesmo que uma correspondência perfeita já tenha sido localizada na string.

</Option>
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