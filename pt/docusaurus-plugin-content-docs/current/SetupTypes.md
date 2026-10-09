---
id: setuptypes
title: Tipos de Configuração
description: "Compare as formas de usar o WebdriverIO, desde as bindings de protocolo puras até o modo standalone e o testrunner WDIO, e escolha a mais adequada."
---

O WebdriverIO pode ser usado para diversos propósitos. Ele implementa a API do protocolo WebDriver e pode executar um navegador de forma automatizada. O framework foi projetado para funcionar em qualquer ambiente e para qualquer tipo de tarefa. Ele é independente de quaisquer frameworks de terceiros e requer apenas o Node.js para ser executado.

## Bindings de Protocolo

Para interações básicas com o protocolo WebDriver, o WebdriverIO usa suas próprias bindings de protocolo baseadas no pacote NPM [`webdriver`](https://www.npmjs.com/package/webdriver):

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/webdriver.js#L5-L20
```

Todos os [comandos de protocolo](api/webdriver) retornam a resposta bruta do driver de automação. O pacote é muito leve e __não__ há lógica inteligente, como esperas automáticas, para simplificar a interação com o uso do protocolo.

Os comandos de protocolo aplicados à instância dependem da resposta inicial da sessão do driver. Por exemplo, se a resposta indicar que uma sessão mobile foi iniciada, o pacote aplica os comandos do Appium ao protótipo da instância.

Para mais informações sobre a interface do pacote `webdriver`, consulte [API de Módulos](/docs/api/modules).

O [WebdriverIO DevTools](/docs/devtools) não é um protocolo de automação. É a interface de depuração para acompanhar uma execução ao vivo e reproduzir traces posteriormente.

## Modo Standalone

Para simplificar a interação com o protocolo WebDriver, o pacote `webdriverio` implementa uma variedade de comandos sobre o protocolo (por exemplo, o comando [`dragAndDrop`](api/element/dragAndDrop)) e conceitos centrais como [seletores inteligentes](selectors) ou [esperas automáticas](autowait). O exemplo acima pode ser simplificado assim:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/standalone.js#L2-L19
```

Usar o WebdriverIO no modo standalone ainda lhe dá acesso a todos os comandos de protocolo, mas fornece um superconjunto de comandos adicionais que oferecem uma interação de mais alto nível com o navegador. Isso permite integrar essa ferramenta de automação ao seu próprio projeto (de testes) para criar uma nova biblioteca de automação. Exemplos populares incluem [Oxygen](https://github.com/oxygenhq/oxygen) ou [CodeceptJS](http://codecept.io). Você também pode escrever scripts Node simples para extrair conteúdo da web (ou qualquer outra coisa que exija um navegador em execução).

Se nenhuma opção específica for definida, o WebdriverIO sempre tentará baixar e configurar o driver do navegador que corresponde à propriedade `browserName` nas suas capabilities. No caso do Chrome e do Firefox, ele também pode instalá-los, dependendo de conseguir ou não encontrar o navegador correspondente na máquina.

Para mais informações sobre as interfaces do pacote `webdriverio`, consulte [API de Módulos](/docs/api/modules).

## O Testrunner WDIO

O principal propósito do WebdriverIO, porém, é o teste end-to-end em grande escala. Por isso, implementamos um test runner que ajuda você a construir uma suíte de testes confiável, fácil de ler e de manter.

O test runner cuida de muitos problemas comuns ao trabalhar com bibliotecas de automação simples. Por um lado, ele organiza suas execuções de teste e divide as specs de teste para que seus testes possam ser executados com o máximo de concorrência. Ele também lida com o gerenciamento de sessões e fornece diversos recursos para ajudar você a depurar problemas e encontrar erros nos seus testes.

Aqui está o mesmo exemplo acima, escrito como uma spec de teste e executado pelo WDIO:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/testrunner.js
```

O test runner é uma abstração de frameworks de teste populares como Mocha, Jasmine ou Cucumber. Para executar seus testes usando o test runner WDIO, confira a seção [Primeiros Passos](gettingstarted) para mais informações.

Para mais informações sobre a interface do pacote testrunner `@wdio/cli`, consulte [API de Módulos](/docs/api/modules).