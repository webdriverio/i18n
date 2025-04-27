---
id: ocr-wait-for-text-displayed
title: ocrWaitForTextDisplayed
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
# ocrWaitForTextDisplayed uses ocrGetElementPositionByText under the hood, that is why you see the command ocrGetElementPositionByText in the logs
[0-0] 2024-05-26T04:32:52.735Z INFO @wdio/ocr-service:ocrGetElementPositionByText: Multiple matches were found based on the word "specFileRetries". The match "specFileRetries" with score "100%" will be used.
```

## Opções

### `text`

-   **Tipo:** `string`
-   **Obrigatório:** sim

O texto que você deseja procurar para clicar.

#### Exemplo

```js
await browser.ocrWaitForTextDisplayed({ text: "specFileRetries" });
```

### `timeout`

-   **Tipo:** `number`
-   **Obrigatório:** não
-   **Padrão:** 18000 (18 segundos)

Tempo em milissegundos. Esteja ciente de que o processo de OCR pode levar algum tempo, então não defina um valor muito baixo.

#### Exemplo

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeout: 25000 // esperar por 25 segundos
});
```

### `timeoutMsg`

-   **Tipo:** `string`
-   **Obrigatório:** não
-   **Padrão:** `Could not find the text "{selector}" within the requested time.`

Substitui a mensagem de erro padrão.

#### Exemplo

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries"
    timeoutMsg: "My new timeout message."
});
```

### `contrast`

-   **Tipo:** `number`
-   **Obrigatório:** não
-   **Padrão:** `0.25`

Quanto maior o contraste, mais escura a imagem e vice-versa. Isso pode ajudar a encontrar texto em uma imagem. Aceita valores entre `-1` e `1`.

#### Exemplo

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    contrast: 0.5,
});
```

### `haystack`

-   **Tipo:** `number`
-   **Obrigatório:** `WebdriverIO.Element | ChainablePromiseElement | Rectangle`

Esta é a área de busca na tela onde o OCR precisa procurar texto. Pode ser um elemento ou um retângulo contendo `x`, `y`, `width` e `height`

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

-   **Tipo:** `string`
-   **Obrigatório:** Não
-   **Padrão:** `eng`

O idioma que o Tesseract reconhecerá. Mais informações podem ser encontradas [aqui](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions) e os idiomas suportados podem ser encontrados [aqui](https://github.com/webdriverio/visual-testing/blob/main/packages/ocr-service/src/utils/constants.ts).

#### Exemplo

```js
import { SUPPORTED_OCR_LANGUAGES } from "@wdio/ocr-service";
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
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

Determina o quão próxima deve ser a correspondência da localização fuzzy (especificada por location). Uma correspondência exata de letra que esteja a "distance" caracteres de distância da localização fuzzy seria pontuada como uma incompatibilidade completa. Uma distância de 0 requer que a correspondência esteja no local exato especificado. Uma distância de 1000 exigiria uma correspondência perfeita para estar dentro de 800 caracteres da localização a ser encontrada usando um limiar de 0,8.

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

-   **Tipo:** `number`
-   **Obrigatório:** não
-   **Padrão:** 0

Determina aproximadamente onde no texto espera-se encontrar o padrão.

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

-   **Tipo:** `number`
-   **Obrigatório:** não
-   **Padrão:** 0.6

Em que ponto o algoritmo de correspondência desiste. Um limiar de 0 requer uma correspondência perfeita (tanto de letras quanto de localização), um limiar de 1.0 corresponderia a qualquer coisa.

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

-   **Tipo:** `boolean`
-   **Obrigatório:** não
-   **Padrão:** false

Se a busca deve diferenciar maiúsculas de minúsculas.

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

-   **Tipo:** `number`
-   **Obrigatório:** não
-   **Padrão:** 2

Somente as correspondências cujo comprimento exceda este valor serão retornadas. (Por exemplo, se você quiser ignorar correspondências de caracteres únicos no resultado, defina como 2)

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

-   **Tipo:** `number`
-   **Obrigatório:** não
-   **Padrão:** false

Quando `true`, a função de correspondência continuará até o final de um padrão de pesquisa, mesmo que uma correspondência perfeita já tenha sido localizada na string.

##### Exemplo

```js
await browser.ocrWaitForTextDisplayed({
    text: "specFileRetries",
    fuzzyFindOptions: {
        findAllMatches: 100,
    },
});
```