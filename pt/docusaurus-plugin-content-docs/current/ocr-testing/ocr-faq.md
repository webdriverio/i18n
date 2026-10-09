---
id: ocr-faq
title: Perguntas Frequentes
description: "Encontre respostas para perguntas comuns sobre testes de OCR lentos, texto que não é encontrado e como combinar comandos de OCR com seletores comuns."
---

## Meus testes estão muito lentos

Quando você usa este `@wdio/ocr-service`, não é para acelerar seus testes, mas sim porque você tem dificuldade em localizar elementos no seu aplicativo web/mobile e deseja uma maneira mais fácil de localizá-los. E, esperamos que todos saibam que, quando você ganha algo, perde outra coisa. **Mas...**, existe uma maneira de fazer o `@wdio/ocr-service` executar mais rápido do que o normal. Mais informações sobre isso podem ser encontradas [aqui](./more-test-optimization).

## Posso usar os comandos deste serviço com os comandos/seletores padrão do WebdriverIO?

Sim, você pode combinar os comandos para tornar seu script ainda mais poderoso! A recomendação é usar os comandos/seletores padrão do WebdriverIO o máximo possível e usar este serviço apenas quando não conseguir encontrar um seletor único, ou quando seu seletor se tornar muito frágil.

## Meu texto não foi encontrado, como isso é possível?

Primeiro, é importante entender como funciona o processo de OCR neste módulo, então leia [esta](./ocr-testing) página. Se ainda assim não conseguir encontrar seu texto, você pode tentar as seguintes coisas.

### A área da imagem é muito grande

Quando o módulo precisa processar uma área grande da captura de tela, ele pode não encontrar o texto. Você pode fornecer uma área menor informando um haystack ao usar um comando. Consulte os [comandos](./ocr-click-on-text) para ver quais deles suportam o uso de um haystack.

### O contraste entre o texto e o fundo não está correto

Isso significa que você pode ter um texto claro sobre um fundo branco ou um texto escuro sobre um fundo escuro. Isso pode fazer com que o texto não seja encontrado. Nos exemplos abaixo, você pode ver que o texto `Why WebdriverIO?` é branco e cercado por um botão cinza. Nesse caso, o texto `Why WebdriverIO?` não será encontrado. Ao aumentar o contraste para o comando específico, ele encontra o texto e consegue clicar nele, veja a segunda imagem.

```js
await driver.ocrClickOnText({
    haystack: { height: 44, width: 1108, x: 129, y: 590 },
    text: "WebdriverIO?",
    // // Com o contraste padrão de 0.25, o texto não é encontrado
    contrast: 1,
});
```

![Contrast issues](/img/ocr/increased-contrast.jpg)

## Por que meu elemento é clicado, mas o teclado nos meus dispositivos móveis nunca aparece?

Isso pode acontecer em alguns campos de texto em que o clique é considerado longo demais e interpretado como um toque longo (long tap). Você pode usar a opção `clickDuration` em [`ocrClickOnText`](./ocr-click-on-text) e [`ocrSetValue`](./ocr-set-value) para amenizar isso. Veja [aqui](./ocr-click-on-text#options).

## Este módulo pode retornar vários elementos, como o WebdriverIO normalmente faz?

Não, isso atualmente não é possível. Se o módulo encontrar vários elementos que correspondam ao seletor fornecido, ele automaticamente escolherá o elemento com a maior pontuação de correspondência.

## Posso automatizar completamente meu aplicativo com os comandos de OCR fornecidos por este serviço?

Eu nunca fiz isso, mas, em teoria, deveria ser possível. Por favor, nos avise se você conseguir ☺️.

## Vejo um arquivo extra chamado `{languageCode}.traineddata` sendo adicionado, o que é isso?

`{languageCode}.traineddata` é um arquivo de dados de idioma usado pelo Tesseract. Ele contém os dados de treinamento para o idioma selecionado, que incluem as informações necessárias para que o Tesseract reconheça caracteres e palavras em inglês de forma eficaz.

### Conteúdo do `{languageCode}.traineddata`

O arquivo geralmente contém:

1. **Dados do Conjunto de Caracteres:** Informações sobre os caracteres do idioma inglês.
1. **Modelo de Linguagem:** Um modelo estatístico de como os caracteres formam palavras e as palavras formam frases.
1. **Extratores de Características:** Dados sobre como extrair características de imagens para o reconhecimento de caracteres.
1. **Dados de Treinamento:** Dados derivados do treinamento do Tesseract em um grande conjunto de imagens de texto em inglês.

### Por que o `{languageCode}.traineddata` é importante?

1. **Reconhecimento de Idioma:** O Tesseract depende desses arquivos de dados treinados para reconhecer e processar com precisão o texto em um idioma específico. Sem o `{languageCode}.traineddata`, o Tesseract não conseguiria reconhecer texto em inglês.
1. **Desempenho:** A qualidade e a precisão do OCR estão diretamente relacionadas à qualidade dos dados de treinamento. Usar o arquivo de dados treinados correto garante que o processo de OCR seja o mais preciso possível.
1. **Compatibilidade:** Garantir que o arquivo `{languageCode}.traineddata` esteja incluído no seu projeto facilita a replicação do ambiente de OCR em diferentes sistemas ou nas máquinas dos membros da equipe.

### Versionamento do `{languageCode}.traineddata`

Incluir o `{languageCode}.traineddata` no seu sistema de controle de versão é recomendado pelos seguintes motivos:

1. **Consistência:** Garante que todos os membros da equipe ou ambientes de implantação usem exatamente a mesma versão dos dados de treinamento, resultando em resultados de OCR consistentes em diferentes ambientes.
1. **Reprodutibilidade:** Armazenar este arquivo no controle de versão facilita a reprodução dos resultados ao executar o processo de OCR em uma data posterior ou em uma máquina diferente.
1. **Gerenciamento de Dependências:** Incluí-lo no sistema de controle de versão ajuda no gerenciamento de dependências e garante que qualquer configuração ou ambiente inclua os arquivos necessários para que o projeto funcione corretamente.

## Existe uma maneira fácil de ver qual texto é encontrado na minha tela sem executar um teste?

Sim, você pode usar nosso assistente de CLI para isso. A documentação pode ser encontrada [aqui](./cli-wizard)