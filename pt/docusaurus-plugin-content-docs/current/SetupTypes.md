---
id: setuptypes
title: Tipos de Configuração
---

WebdriverIO pode ser usado para diversos propósitos. Ele implementa a API do protocolo WebDriver e pode executar um navegador de forma automatizada. O framework foi projetado para funcionar em qualquer ambiente arbitrário e para qualquer tipo de tarefa. É independente de frameworks de terceiros e requer apenas Node.js para ser executado.

## Vinculações de Protocolo

Para interações básicas com o WebDriver e outros protocolos de automação, o WebdriverIO usa suas próprias vinculações de protocolo baseadas no pacote NPM [`webdriver`](https://www.npmjs.com/package/webdriver):

<Tabs
  defaultValue="webdriver"
  values={[
    {label: 'WebDriver', value: 'webdriver'},
    {label: 'Chrome DevTools', value: 'devtools'},
  ]
}>
<TabItem value="webdriver">

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/webdriver.js#L5-L20
```

</TabItem>
<TabItem value="devtools">

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/devtools.js#L2-L17
```

</TabItem>
</Tabs>

Todos os [comandos de protocolo](api/webdriver) retornam a resposta bruta do driver de automação. O pacote é muito leve e __não__ há lógica inteligente como auto-waits para simplificar a interação com o uso do protocolo.

Os comandos de protocolo aplicados à instância dependem da resposta da sessão inicial do driver. Por exemplo, se a resposta indica que uma sessão móvel foi iniciada, o pacote aplica todos os comandos do protocolo Appium e Mobile JSON Wire ao protótipo da instância.

Você pode executar o mesmo conjunto de comandos (exceto os móveis) usando o protocolo Chrome DevTools ao importar o pacote NPM [`devtools`](https://www.npmjs.com/package/devtools). Ele tem a mesma interface que o pacote `webdriver`, mas executa sua automação baseada em [Puppeteer](https://pptr.dev/).

Para mais informações sobre essas interfaces de pacotes, veja [Modules API](/docs/api/modules).

## Modo Standalone

Para simplificar a interação com o protocolo WebDriver, o pacote `webdriverio` implementa uma variedade de comandos em cima do protocolo (por exemplo, o comando [`dragAndDrop`](api/element/dragAndDrop)) e conceitos centrais como [seletores inteligentes](selectors) ou [auto-waits](autowait). O exemplo acima pode ser simplificado assim:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/standalone.js#L2-L19
```

Usar o WebdriverIO no modo standalone ainda dá acesso a todos os comandos de protocolo, mas fornece um superconjunto de comandos adicionais que proporcionam uma interação de nível superior com o navegador. Ele permite que você integre essa ferramenta de automação em seu próprio projeto (de teste) para criar uma nova biblioteca de automação. Exemplos populares incluem [Oxygen](https://github.com/oxygenhq/oxygen) ou [CodeceptJS](http://codecept.io). Você também pode escrever scripts Node simples para extrair conteúdo da web (ou qualquer outra coisa que exija um navegador em execução).

Se nenhuma opção específica for definida, o WebdriverIO sempre tentará baixar e configurar o driver de navegador que corresponde à propriedade `browserName` em suas capabilities. No caso do Chrome e Firefox, ele também pode instalá-los dependendo se consegue encontrar o navegador correspondente na máquina.

Para mais informações sobre as interfaces do pacote `webdriverio`, veja [Modules API](/docs/api/modules).

## O Testrunner WDIO

O principal objetivo do WebdriverIO, no entanto, é realizar testes end-to-end em larga escala. Por isso, implementamos um test runner que ajuda a construir uma suíte de testes confiável, fácil de ler e manter.

O test runner cuida de muitos problemas que são comuns ao trabalhar com bibliotecas de automação simples. Por um lado, ele organiza suas execuções de teste e divide as especificações de teste para que seus testes possam ser executados com máxima concorrência. Ele também gerencia sessões e fornece muitos recursos para ajudar a depurar problemas e encontrar erros em seus testes.

Aqui está o mesmo exemplo de cima, escrito como uma especificação de teste e executado pelo WDIO:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/e8b147e88e7a38351b0918b4f7efbd9ae292201d/setup/testrunner.js
```

O test runner é uma abstração de frameworks de teste populares como Mocha, Jasmine ou Cucumber. Para executar seus testes usando o test runner WDIO, consulte a seção [Primeiros Passos](gettingstarted) para mais informações.

Para mais informações sobre a interface do pacote testrunner `@wdio/cli`, veja [Modules API](/docs/api/modules).