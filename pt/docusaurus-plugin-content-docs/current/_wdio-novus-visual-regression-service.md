---
id: wdio-novus-visual-regression-service
title: Serviço de Regressão Visual Novus
custom_edit_url: https://github.com/Jnegrier/wdio-novus-visual-regression-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-novus-visual-regression-service é um pacote de terceiros, para mais informações consulte [GitHub](https://github.com/Jnegrier/wdio-novus-visual-regression-service) | [npm](https://www.npmjs.com/package/wdio-novus-visual-regression-service)

[![Build Status](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service.svg?branch=master)](https://travis-ci.com/Jnegrier/wdio-novus-visual-regression-service)

> Teste de regressão visual para WebdriverIO

Baseado no trabalho de Jan-André Zinser em [wdio-visual-regression-service](https://github.com/zinserjan/wdio-visual-regression-service) e [wdio-screenshot](https://github.com/zinserjan/wdio-screenshot)

## Instalação

Você pode instalar o wdio-novus-visual-regression-service via NPM como de costume:

```sh
$ npm install wdio-novus-visual-regression-service --save-dev
```

Instruções sobre como instalar o `WebdriverIO` podem ser encontradas [aqui.](https://webdriver.io/docs/gettingstarted)

## Configuração
Configure o wdio-novus-visual-regression-service adicionando `novus-visual-regression` à seção de serviços da sua configuração WebdriverIO e defina sua estratégia de comparação desejada nas opções de serviço.

```js
// wdio.conf.js

var path = require('path');
var VisualRegressionCompare = require('wdio-novus-visual-regression-service/compare');

function getScreenshotName(basePath) {
  return function(context) {
    var type = context.type;
    var testName = context.test.title;
    var browserVersion = parseInt(context.browser.version, 10);
    var browserName = context.browser.name;
    var browserViewport = context.meta.viewport;
    var browserWidth = browserViewport.width;
    var browserHeight = browserViewport.height;

    return path.join(basePath, `${testName}_${type}_${browserName}_v${browserVersion}_${browserWidth}x${browserHeight}.png`);
  };
}

exports.config = {
  // ...
  services: [
    [
      'novus-visual-regression',
      {
        compare: new VisualRegressionCompare.LocalCompare({
          referenceName: getScreenshotName(path.join(process.cwd(), 'screenshots/reference')),
          screenshotName: getScreenshotName(path.join(process.cwd(), 'screenshots/screen')),
          diffName: getScreenshotName(path.join(process.cwd(), 'screenshots/diff')),
          misMatchTolerance: 0.01,
        }),
        viewportChangePause: 300,
        viewports: [{ width: 320, height: 480 }, { width: 480, height: 320 }, { width: 1024, height: 768 }],
        orientations: ['landscape', 'portrait'],
      }
    ]
  ],
  // ...
};
```

### Opções
Sob a chave `visualRegression` em seu wdio.config.js você pode passar um objeto de configuração com a seguinte estrutura:

* **compare** `Object` <br />
método de comparação de screenshots, veja [Métodos de Comparação](#compare-methods)

* **viewportChangePause**  `Number`  ( padrão: 100 ) <br />
espere x milissegundos após a mudança de viewport. Pode levar algum tempo para o navegador repintar. Isso pode levar a problemas de renderização e produzir resultados inconsistentes entre execuções.

* **viewports** `Object[{ width: Number, height: Number }]`  ( padrão: *[viewport-atual]* ) (**apenas desktop**)<br />
   todos os screenshots serão tirados em diferentes dimensões de viewport (ex: para testes de design responsivo)

* **orientations** `String[] {landscape, portrait}`  ( padrão: *[orientação-atual]* ) (**apenas móvel**)<br />
    todos os screenshots serão tirados em diferentes orientações de tela (ex: para testes de design responsivo)

### Métodos de Comparação
wdio-novus-visual-regression-service permite o uso de diferentes métodos de comparação de screenshots.

#### VisualRegressionCompare.LocalCompare
Como o nome sugere, *LocalCompare* captura screenshots localmente no seu computador e os compara com execuções anteriores.

Você pode passar as seguintes opções para o construtor como objeto:

* **referenceName** `Function` <br />
passe uma função que retorna o nome do arquivo para o screenshot de referência. A função recebe um objeto *context* como primeiro parâmetro com todas as informações relevantes sobre o comando.

* **screenshotName** `Function` <br />
passe uma função que retorna o nome do arquivo para o screenshot atual. A função recebe um objeto *context* como primeiro parâmetro com todas as informações relevantes sobre o comando.

* **diffName** `Function` <br />
passe uma função que retorna o nome do arquivo para o screenshot de diferença. A função recebe um objeto *context* como primeiro parâmetro com todas as informações relevantes sobre o comando.

* **misMatchTolerance** `Number`  ( padrão: 0.01 ) <br />
número entre 0 e 100 que define o grau de diferença para considerar duas imagens como idênticas, aumentar esse valor diminuirá a cobertura de teste.

* **ignoreComparison** `String`  ( padrão: nothing ) <br />
passe uma string com valor de `nothing`, `colors` ou `antialiasing` para ajustar o método de comparação.

Para um exemplo de geração de nomes de arquivos de screenshot dependendo do nome do teste atual, veja o código de exemplo na seção [Configuração](#configuration).

#### VisualRegressionCompare.SaveScreenshot
Este método é uma variante simplificada de `VisualRegressionCompare.LocalCompare` para capturar apenas screenshots. Isso é bastante útil quando você deseja apenas criar screenshots de referência e sobrescrever os anteriores sem fazer comparações.

Você pode passar as seguintes opções para o construtor como objeto:

* **screenshotName** `Function` <br />
passe uma função que retorna o nome do arquivo para o screenshot atual. A função recebe um objeto *context* como primeiro parâmetro com todas as informações relevantes sobre o comando.

#### VisualRegressionCompare.Spectre
Este método é usado para enviar screenshots para a aplicação web [Spectre](https://github.com/wearefriday/spectre).
Spectre é uma interface para testes de regressão visual. Ele armazena os screenshots e os compara, o que é bastante útil para Integração Contínua.

Você pode passar as seguintes opções para o construtor como objeto:

* **url** `String` <br />
passe uma URL do serviço web Spectre.

* **project** `String` <br />
passe um nome para o seu projeto.

* **suite** `String` <br />
passe um nome para sua suite de testes. Um projeto pode conter várias suites.

* **test** `Function` <br />
passe uma função que retorna o nome do teste para o screenshot. A função recebe um objeto *context* como primeiro parâmetro com todas as informações relevantes sobre o comando.

* **browser** `Function` <br />
passe uma função que retorna o navegador para o screenshot. A função recebe um objeto *context* como primeiro parâmetro com todas as informações relevantes sobre o comando.

* **size** `Function` <br />
passe uma função que retorna o tamanho para o screenshot. A função recebe um objeto *context* como primeiro parâmetro com todas as informações relevantes sobre o comando.

* **fuzzLevel** `Number`  ( padrão: 30 ) <br />
número entre 0 e 100 que define o fator de fuzz do método de comparação de imagem do Spectre. Para mais detalhes, consulte a [documentação do Spectre](https://github.com/wearefriday/spectre).

**Exemplo**
```js
// wdio.conf.js

var path = require('path');
var VisualRegressionCompare = require('wdio-novus-visual-regression-service/compare');

exports.config = {
  // ...
  services: [
    [
      'novus-visual-regression',
      {
        compare: new VisualRegressionCompare.Spectre({
          url: 'http://localhost:3000',
          project: 'my project',
          suite: 'my test suite',
          test: function getTest(context) {
            return context.test.title;
          },
          browser: function getBrowser(context) {
            return context.browser.name;
          },
          size: function getSize(context) {
            return context.meta.viewport != null ? context.meta.viewport.width : context.meta.orientation;
          },
          fuzzLevel: 30
        }),
        viewportChangePause: 300,
        viewports: [{ width: 320, height: 480 }, { width: 480, height: 320 }, { width: 1024, height: 768 }],
        orientations: ['landscape', 'portrait'],
      }
    ]
  ],
  // ...
};
```

## Uso
wdio-novus-visual-regression-service aprimora uma instância WebdriverIO com os seguintes comandos:
* `browser.checkViewport([{options}]);`
* `browser.checkDocument([{options}]);`
* `browser.checkElement(elementSelector, [{options}]);`


Todos esses fornecem opções que ajudarão você a capturar screenshots em diferentes dimensões ou excluir partes irrelevantes (por exemplo, conteúdo). As seguintes opções estão disponíveis:


* **exclude** `String[]|Object[]` (**ainda não implementado**)<br />
  exclua partes do seu screenshot que mudam frequentemente, você pode passar todos os tipos de diferentes [estratégias de seletor WebdriverIO](http://webdriver.io/guide/usage/selectors.html)
  que consultam um ou vários elementos ou você pode definir valores x e y que formam um retângulo ou polígono

* **hide** `Object[]`<br />
  oculta todos os elementos consultados por todos os tipos de diferentes [estratégias de seletor WebdriverIO](http://webdriver.io/guide/usage/selectors.html) (via `visibility: hidden`)

* **remove** `Object[]`<br />
  remove todos os elementos consultados por todos os tipos de diferentes [estratégias de seletor WebdriverIO](http://webdriver.io/guide/usage/selectors.html) (via `display: none`)

* **viewports** `Object[{ width: Number, height: Number }]` (**apenas desktop**)<br />
     Substitui o valor global *viewports* para este comando. Todos os screenshots serão tirados em diferentes dimensões de viewport (ex: para testes de design responsivo)

* **orientations** `String[] {landscape, portrait}` (**apenas móvel**)<br />
    Substitui o valor global *orientations* para este comando. Todos os screenshots serão tirados em diferentes orientações de tela (ex: para testes de design responsivo)

* **misMatchTolerance** `Number` <br />
    Substitui o valor global *misMatchTolerance* para este comando. Passe um número entre 0 e 100 que define o grau de diferença para considerar duas imagens como idênticas.

* **fuzzLevel** `Number` <br />
    Substitui o valor global *fuzzLevel* para este comando. Passe um número entre 0 e 100 que define o fator de fuzz do método de comparação de imagem do Spectre.

* **ignoreComparison** `String` <br />
    Substitui o valor global *ignoreComparison* para este comando. Passe uma string com valor de `nothing`, `colors` ou `antialiasing` para ajustar o método de comparação.

* **viewportChangePause**  `Number` <br />
    Substitui o valor global *viewportChangePause* para este comando. Espere x milissegundos após a mudança de viewport.

### Licença

MIT