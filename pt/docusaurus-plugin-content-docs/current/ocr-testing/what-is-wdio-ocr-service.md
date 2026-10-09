---
id: ocr-testing
title: Testes com OCR
description: "Localize e interaja com elementos pelo seu texto visível em aplicativos web e mobile com o serviço de OCR quando os seletores comuns não forem suficientes."
---

Testes automatizados em aplicativos nativos mobile e sites desktop podem ser particularmente desafiadores ao lidar com elementos que não possuem identificadores únicos. Os [seletores padrão do WebdriverIO](https://webdriver.io/docs/selectors) nem sempre podem ajudar você. Entre no mundo do `@wdio/ocr-service`, um serviço poderoso que utiliza OCR ([Reconhecimento Óptico de Caracteres](https://en.wikipedia.org/wiki/Optical_character_recognition)) para pesquisar, aguardar e interagir com elementos na tela com base em seu **texto visível**.

Os seguintes comandos personalizados serão fornecidos e adicionados ao objeto `browser/driver` para que você tenha o conjunto de ferramentas certo para fazer seu trabalho.

-   [`await browser.ocrGetText`](./ocr-get-text.md)
-   [`await browser.ocrGetElementPositionByText`](./ocr-get-element-position-by-text.md)
-   [`await browser.ocrWaitForTextDisplayed`](./ocr-wait-for-text-displayed.md)
-   [`await browser.ocrClickOnText`](./ocr-click-on-text.md)
-   [`await browser.ocrSetValue`](./ocr-set-value.md)

### Como funciona

Este serviço irá

1. criar uma captura de tela da sua tela/dispositivo. (Se necessário, você pode fornecer um haystack, que pode ser um elemento ou um objeto retângulo, para delimitar uma área específica. Consulte a documentação de cada comando.)
1. otimizar o resultado para OCR transformando a captura de tela em preto/branco com alto contraste (o alto contraste é necessário para evitar muito ruído de fundo na imagem. Isso pode ser personalizado por comando.)
1. usar o [Reconhecimento Óptico de Caracteres](https://en.wikipedia.org/wiki/Optical_character_recognition) do [Tesseract.js](https://github.com/naptha/tesseract.js)/[Tesseract](https://github.com/tesseract-ocr/tesseract) para obter todo o texto da tela e destacar todo o texto encontrado em uma imagem. Ele suporta vários idiomas, que podem ser encontrados [aqui.](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html)
1. usar Lógica Fuzzy do [Fuse.js](https://fusejs.io/) para encontrar strings que são _aproximadamente iguais_ a um determinado padrão (em vez de exatamente iguais). Isso significa, por exemplo, que o valor de pesquisa `Username` também pode encontrar o texto `Usename` ou vice-versa.
1. Fornecer um assistente de CLI (`npx ocr-service`) para validar suas imagens e recuperar texto através do seu terminal

Um exemplo das etapas 1, 2 e 3 pode ser encontrado nesta imagem

![Process steps](/img/ocr/processing-steps.jpg)

Ele funciona com **ZERO** dependências de sistema (além das que o WebdriverIO usa), mas, se necessário, também pode funcionar com uma instalação local do [Tesseract](https://tesseract-ocr.github.io/tessdoc/), o que reduzirá drasticamente o tempo de execução! (Veja também a seção [Otimização da Execução de Testes](#test-execution-optimization) sobre como acelerar seus testes.)

Animado? Comece a usá-lo hoje seguindo o guia [Primeiros Passos](./getting-started).

:::caution Importante
Há vários motivos pelos quais você pode não obter uma saída de boa qualidade do Tesseract. Um dos maiores motivos que pode estar relacionado ao seu aplicativo e a este módulo é o fato de não haver uma distinção de cores adequada entre o texto que precisa ser encontrado e o fundo. Por exemplo, texto branco em um fundo escuro pode ser encontrado _facilmente_, mas texto claro em um fundo branco ou texto escuro em um fundo escuro dificilmente pode ser encontrado.

Veja também [esta página](https://tesseract-ocr.github.io/tessdoc/ImproveQuality) para mais informações do Tesseract.

Também não se esqueça de ler o [FAQ](./ocr-faq).
:::