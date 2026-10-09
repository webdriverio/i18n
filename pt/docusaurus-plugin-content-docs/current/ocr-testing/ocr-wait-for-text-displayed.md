---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
description: "Aguarde até que um texto específico seja exibido na tela com ocrWaitForTextDisplayed do serviço OCR."
---

Aguarda até que um texto específico seja exibido na tela.

## Uso

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
});
```

## Saída

### Logs

```log
[0-0] 2024-05-26T04:32:52.005Z INFO webdriver: COMMAND ocrWaitForTextDisplayed(<object>)
......................
# ocrWaitForTextDisplayed usa ocrGetElementPositionByText internamente, é por isso que você vê o comando ocrGetElementPositionByText nos logs
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## Opções

### `text`

<Option type="string" required="yes">

O texto que você deseja procurar para clicar.

</Option>
#### Exemplo

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

<Option type="number" default="18000 (18 seconds)" required="no">

Tempo em milissegundos. Esteja ciente de que o processo de OCR pode levar algum tempo, então não defina um valor muito baixo.

</Option>
#### Exemplo

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // aguarda por 25 segundos
});
```

### `timeoutMsg`

<Option type="string" default={`Could not find the text "{selector}" within the requested time.`} required="no">

Substitui a mensagem de erro padrão.

</Option>
#### Exemplo

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

<Option type="number" default="0.25" required="no">

Quanto maior o contraste, mais escura a imagem e vice-versa. Isso pode ajudar a encontrar texto em uma imagem. Aceita valores entre `-1` e `1`.

</Option>
#### Exemplo

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Esta é a área de busca na tela onde o OCR precisa procurar o texto. Pode ser um elemento ou um retângulo contendo `x`, `y`, `width` e `height`

</Option>
#### Exemplo

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: $("elementSelector"),
});

// OU
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    haystack: await $("elementSelector"),
});

// OU
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
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
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    // Usa holandês como idioma
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```

### `fuzzyFindOptions`

Você pode alterar a lógica difusa (fuzzy) para encontrar texto com as seguintes opções. Isso pode ajudar a encontrar uma correspondência melhor

#### `fuzzyFindOptions.distance`

<Option type="number" default="100" required="no">

Determina quão próxima a correspondência deve estar da localização difusa (especificada por location). Uma correspondência exata de letras que esteja a uma distância de distance caracteres da localização difusa seria pontuada como uma não correspondência completa. Uma distância de 0 exige que a correspondência esteja na localização exata especificada. Uma distância de 1000 exigiria que uma correspondência perfeita estivesse dentro de 800 caracteres da localização para ser encontrada usando um threshold de 0.8.

</Option>
##### Exemplo

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        distance: 20,
    },
});
```

#### `fuzzyFindOptions.location`

<Option type="number" default="0" required="no">

Determina aproximadamente onde no texto se espera que o padrão seja encontrado.

</Option>
##### Exemplo

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
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
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
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
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        isCaseSensitive: true,
    },
});
```

#### `fuzzyFindOptions.minMatchCharLength`

<Option type="number" default="2" required="no">

Apenas as correspondências cujo comprimento exceda este valor serão retornadas. (Por exemplo, se você quiser ignorar correspondências de um único caractere no resultado, defina como 2)

</Option>
##### Exemplo

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
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
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```