---
id: ocr-testing
title: Testes de OCR
---

Testes automatizados em aplicativos nativos para dispositivos móveis e sites para desktop podem ser particularmente desafiadores quando lidamos com elementos que não possuem identificadores únicos. Os [seletores padrão do WebdriverIO](https://webdriver.io/docs/selectors) nem sempre podem ajudá-lo. Entre no mundo do `@wdio/ocr-service`, um serviço poderoso que aproveita o OCR ([Reconhecimento Óptico de Caracteres](https://en.wikipedia.org/wiki/Optical_character_recognition)) para pesquisar, aguardar e interagir com elementos na tela com base em seu **texto visível**.

Os seguintes comandos personalizados serão fornecidos e adicionados ao objeto `browser/driver` para que você tenha o conjunto de ferramentas certo para fazer seu trabalho.

-   [`await browser.ocrGetText`](./ocr-get-text.md)
-   [`await browser.ocrGetElementPositionByText`](./ocr-get-element-position-by-text.md)
-   [`await browser.ocrWaitForTextDisplayed`](./ocr-wait-for-text-displayed.md)
-   [`await browser.ocrClickOnText`](./ocr-click-on-text.md)
-   [`await browser.ocrSetValue`](./ocr-set-value.md)

### Como funciona

Este serviço irá

1. criar uma captura de tela da sua tela/dispositivo. (Se necessário, você pode fornecer um haystack, que pode ser um elemento ou um objeto retângulo, para identificar uma área específica. Consulte a documentação de cada comando.)
1. otimizar o resultado para OCR transformando a captura de tela em preto/branco com uma captura de tela de alto contraste (o alto contraste é necessário para evitar muito ruído de fundo na imagem. Isso pode ser personalizado por comando.)
1. usa [Reconhecimento Óptico de Caracteres](https://en.wikipedia.org/wiki/Optical_character_recognition) do [Tesseract.js](https://github.com/naptha/tesseract.js)/[Tesseract](https://github.com/tesseract-ocr/tesseract) para obter todo o texto da tela e destacar todo o texto encontrado em uma imagem. Ele pode suportar vários idiomas que podem ser encontrados [aqui.](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html)
1. usa Lógica Fuzzy do [Fuse.js](https://fusejs.io/) para encontrar strings que são _aproximadamente iguais_ a um padrão específico (em vez de exatamente). Isso significa, por exemplo, que o valor de pesquisa `Username` também pode encontrar o texto `Usename` ou vice-versa.
1. Fornece um assistente de linha de comando (`npx ocr-service`) para validar suas imagens e recuperar texto através do seu terminal

Um exemplo das etapas 1, 2 e 3 pode ser encontrado nesta imagem

![Etapas do processo](/img/ocr/processing-steps.jpg)

Funciona com **ZERO** dependências do sistema (além do que o WebdriverIO usa), mas, se necessário, também pode funcionar com uma instalação local do [Tesseract](https://tesseract-ocr.github.io/tessdoc/), o que reduzirá drasticamente o tempo de execução! (Veja também a [Otimização da Execução de Testes](#test-execution-optimization) sobre como acelerar seus testes.)

Entusiasmado? Comece a usá-lo hoje seguindo o guia [Primeiros Passos](./getting-started).

:::caution Importante
Existem várias razões pelas quais você pode não obter uma saída de boa qualidade do Tesseract. Uma das maiores razões que pode estar relacionada ao seu aplicativo e a este módulo pode ser o fato de não haver uma distinção adequada de cores entre o texto que precisa ser encontrado e o fundo. Por exemplo, texto branco em um fundo escuro pode ser _facilmente_ encontrado, mas texto claro em um fundo branco ou texto escuro em um fundo escuro dificilmente pode ser encontrado.

Veja também [esta página](https://tesseract-ocr.github.io/tessdoc/ImproveQuality) para mais informações do Tesseract.

Não se esqueça também de ler o [FAQ](./ocr-faq).
:::