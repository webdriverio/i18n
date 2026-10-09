---
id: ocr-get-text
title: ocrGetText
description: "Leia o texto exibido na tela ou em uma área específica com ocrGetText do serviço OCR."
---

Obtém o texto em uma imagem.

### Uso

```js
const result = await browser.ocrGetText();

console.log("result = ", JSON.stringify(result, null, 2));
```

## Saída

### Resultado

```logs
result = "VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube"
```

### Logs

```log
[0-0] 2024-05-25T17:38:25.970Z INFO webdriver: COMMAND ocrGetText()
......................
[0-0] 2024-05-25T17:38:26.738Z INFO webdriver: RESULT VS docs API Blog Contribute Community Sponsor v8 *Engishy CV} Q OQ G asearch Next-gen browser and mobile automation Welcome! How can | help? i test framework for Node.js Get Started Why WebdriverI0? View on GitHub Watch on YouTube
```

## Opções

### `contrast`

<Option type="number" default="0.25" required="no">

Quanto maior o contraste, mais escura a imagem e vice-versa. Isso pode ajudar a encontrar texto em uma imagem. Aceita valores entre `-1` e `1`.

</Option>
#### Exemplo

```js
await browser.ocrGetText({ contrast: 0.5 });
```

### `haystack`

<Option type="number" required="WebdriverIO.Element | ChainablePromiseElement | Rectangle">

Esta é a área de busca na tela onde o OCR precisa procurar texto. Pode ser um elemento ou um retângulo contendo `x`, `y`, `width` e `height`

</Option>
#### Exemplo

```js
await browser.ocrGetText({ haystack: $("elementSelector") });

// OU
await browser.ocrGetText({ haystack: await $("elementSelector") });

// OU
await browser.ocrGetText({
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
await browser.ocrGetText({
    // Usar holandês como idioma
    language: SUPPORTED_OCR_LANGUAGES.DUTCH,
});
```