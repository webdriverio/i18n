---
id: wdio-video-reporter
title: Relatório de Vídeo
custom_edit_url: https://github.com/presidenten/wdio-video-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-video-reporter é um pacote de terceiros, para mais informações, consulte [GitHub](https://github.com/presidenten/wdio-video-reporter) | [npm](https://www.npmjs.com/package/wdio-video-reporter)

![Logo](https://raw.githubusercontent.com/presidenten/wdio-video-reporter-example-report/master/wdio-video-reporter.png)

Este é um relator para [Webdriver IO v6 e superior](https://webdriver.io/) que gera vídeos de suas execuções de teste wdio. Se você usar o allure, os casos de teste serão automaticamente decorados com os vídeos também. (Para Webdriver IO v5, use a versão wdio-video-reporter ^2.0.0.)

Os vídeos acabam em `wdio.config.outputDir`

Confira o exemplo de relatório Allure com vídeos incluídos em testes com falha aqui:
https://presidenten.github.io/wdio-video-reporter-example-report/

![exemplo-relatório-allure](https://media.giphy.com/media/7Fgle7bHGrxR3zY6Gw/giphy.gif)

Prós:
- Vídeos agradáveis em seus relatórios allure
- Vídeos com velocidade humana agradável, mesmo que os testes sejam rápidos
- Funciona com a grade Selenium
- Funciona com todos os navegadores que suportam `saveScreenshot`
- Verificado nos seguintes navegadores de desktop usando Selenium 3.141.59:
  - Chrome
  - Firefox
  - Safari
  - Internet Explorer 11
  - Microsoft Edge
- Verificado nos seguintes dispositivos iOS e Android com [Appium](http://appium.io/docs/en/about-appium/getting-started/) 1.13.0-beta3:
  - iPhone 8
  - iPad Gen 6
  - Samsung Galaxy S9
  - Samsung Galaxy Tab A10

Contras:
- Funciona tirando capturas de tela após "ações", o que torna os testes um pouco mais lentos. Isso é mitigado escolhendo cuidadosamente quais mensagens [jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol) que devem resultar em uma captura de tela
- Os drivers Selenium não incluem caixas de alerta e pop-ups nas capturas de tela, então eles não são visíveis nos vídeos


Início Rápido
===========

Confira o modelo simples em [wdio-template](https://github.com/presidenten/wdio-template) para começar rapidamente.

Clone um dos repositórios e instale as dependências com `yarn` ou `npm install`. Em seguida, execute `yarn e2e` ou `npm run e2e` no diretório de demonstração e finalmente `yarn report` ou `npm run report` para ver o relatório de allure.


Instalação
============

Instale o relator
--------------------

`yarn add wdio-video-reporter`
ou
`npm install wdio-video-reporter`


Adicione o relator à configuração
--------------------------

No topo do arquivo `wdio.conf.js`, importe a biblioteca:
```
const video = require('wdio-video-reporter');
```

Em seguida, adicione o relator de vídeo à configuração na propriedade reporters:

```
 reporters: [
    [video, {
      saveAllVideos: false,       // Se verdadeiro, também salva vídeos para casos de teste bem-sucedidos
      videoSlowdownMultiplier: 3, // Maior para obter vídeos mais lentos, menor para vídeos mais rápidos [Valor 1-100]
    }],
  ],
```


Usando com Allure
-----------------

Adicionar o relator Allure também atualiza automaticamente os relatórios com vídeos sem necessidade de configurar nada :-)

```
 reporters: [
    [video, {
      saveAllVideos: false,       // Se verdadeiro, também salva vídeos para casos de teste bem-sucedidos
      videoSlowdownMultiplier: 3, // Maior para obter vídeos mais lentos, menor para vídeos mais rápidos [Valor 1-100]
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
    }],
  ],
```


Configuração
=============

Parâmetros de configuração normais
-------------------------------

A maioria dos usuários pode querer definir estes

- `saveAllVideos` Defina como verdadeiro para salvar vídeos para testes que passam. `Padrão: false`
- `videoSlowdownMultiplier` Inteiro entre [1-100]. Aumente se os vídeos estiverem sendo reproduzidos muito rapidamente. `Padrão: 3`
- `videoRenderTimeout` Máximo de segundos para aguardar a renderização de um vídeo. `Padrão: 5`
- `outputDir` Se não estiver definido, usa wdio.config.outputDir. `Padrão: undefined`
- `outputDir` Se não estiver definido, usa wdio.config.outputDir. `Padrão: undefined`
- `maxTestNameCharacters` Comprimento máximo do nome do teste. `Padrão: 250`

Parâmetros de configuração avançados
---------------------------------

Usuários avançados que desejam alterar quando o mecanismo faz uma captura de tela podem editar estes. Esses arrays podem ser preenchidos com a última palavra de uma mensagem [jsonWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/JsonWireProtocol), ou seja, /session/:sessionId/`buttondown`.

- `addExcludedActions` Adicione ações onde capturas de tela são desnecessárias. `Padrão: []`
- `addJsonWireActions` Adicione ações onde faltam capturas de tela. `Padrão: []`
- `recordAllActions` Ignore a filtragem e capture tudo. (Não recomendado) `Padrão: false`

Para ver mensagens processadas, defina `wdio.config.logLevel: 'debug'` e verifique `outputDir/wdio-X-Y-Video-reporter.log`. Isso também deixará o diretório de saída de capturas de tela intacto para revisão

Para evitar completamente o registro extra e obter apenas os arquivos de vídeo, defina `wdio.config.logLevel: 'silent'`.

Suporte ao Cucumber
----------------

Se você estiver usando o relator Allure, você precisa garantir o seguinte:

- Use `chai` em vez de usar as asserções incorporadas do node, caso contrário, os testes com falha serão relatados como quebrados em suas definições de etapas
- Adicione `useCucumberStepReporter: true` à opção Allure no arquivo `wdio.conf.js`, uma configuração típica seria assim:
```
  reporters: [
    [video, {
      saveAllVideos: false,       // Se verdadeiro, também salva vídeos para casos de teste bem-sucedidos
      videoSlowdownMultiplier: 3, // Maior para obter vídeos mais lentos, menor para vídeos mais rápidos [Valor 1-100]
    }],
    ['allure', {
      outputDir: './_results_/allure-raw',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: true,
      useCucumberStepReporter: true
    }],
  ],
```
Para um exemplo completo, confira a ramificação do cucumber em [wdio-template](https://github.com/presidenten/wdio-template/tree/cucumber)


Configuração do Appium
------------

Desde o `wdio-video-reporter` v1.2.4, há suporte para ajudar o Allure a diferenciar entre navegadores safari e chrome em desktops e dispositivos.
O relator usa a propriedade personalizada `deviceType` para identificar os diferentes dispositivos.
Os valores recomendados são `phone` e `tablet`.
É recomendável incluir `browserVersion` também para _todos_ os navegadores para evitar um bug no webdriver do Chrome ao usar dispositivos na mesma grade Selenium que os navegadores Chrome desktop.

Os arquivos de vídeo gerados também terão `deviceType` adicionado ao nome do navegador.

Exemplo de configuração de appium:
```
  "capabilities": [
    {
      ...
      "deviceType": "phone",
      "browserVersion": "73.0-phone-1",
      ...
    }
  ],
```

E `wdio-config.json`:
```
  "capabilities": [
    {
      ...
      "appium:deviceType": "phone",
      "browserVersion": "73.0-phone-1",
      ...
    },
  ],
```


Contribuindo
============

Faça um fork, faça alterações, escreva alguns testes, linte, execute os testes, construa e verifique na demonstração se as alterações funcionam como deveriam, depois faça um PR.

A pasta de demonstração funciona com a versão construída da biblioteca, então certifique-se de construir se você adicionou novos recursos e quer experimentá-los.


Agradecimentos
======

Obrigado a [Johnson E](https://github.com/jonn-set) por consertar o suporte ao Cucumber, que muitos usuários pediram.