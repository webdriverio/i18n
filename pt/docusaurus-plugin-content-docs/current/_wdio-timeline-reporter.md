---
id: wdio-timeline-reporter
title: Relatório Cronológico
custom_edit_url: https://github.com/QualityOps/wdio-timeline-reporter/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-timeline-reporter é um pacote de terceiros, para mais informações consulte [GitHub](https://github.com/QualityOps/wdio-timeline-reporter) | [npm](https://www.npmjs.com/package/wdio-timeline-reporter)


> Uma solução completa de relatório para WebdriverIO para uma visualização agregada dos seus resultados de teste porque "Ver para crer"

![example.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/example.png)

## Por quê

Porque gastamos muito tempo depurando testes com falha, alternando entre a saída do terminal e visualizando capturas de tela de erro, etc. Este relator agrega todas as informações típicas que você precisará em um relatório. Execute testes e tenha uma boa linha do tempo de eventos que você pode consultar para verificar se tudo parece OK.

#### Os recursos incluem:

- Funciona muito bem com frameworks Mocha e Jasmine. Também funciona com Cucumber, mas cada etapa será relatada como um teste
- Resumo claro dos resultados de teste.
- Detalhes de cada execução de teste, incluindo todas as capturas de tela capturadas durante a execução do teste.
- Filtragem de resultados de teste. Ótimo para focar em testes que falharam
- Rastreamento de pilha de erros anexado ao teste.
- Capacidade de adicionar informações adicionais ao teste em tempo de execução.
- Não é necessário pós-processamento. Ao concluir o processo de teste wdio, um arquivo de relatório html estático será gerado.
- Serviço de linha do tempo para gerenciar a captura de screenshots, incluindo o redimensionamento das imagens.

Um exemplo de relatório html pode ser encontrado [aqui](http://htmlpreview.github.io/?https://github.com/QualityOps/wdio-timeline-reporter/blob/master/images/example-timeline-report.html)

Instruções sobre como instalar o `WebdriverIO` podem ser encontradas [aqui](http://webdriver.io/guide/getstarted/install.html).

## Instalação

**PARA VERSÃO COMPATÍVEL COM WEBDRIVERIO V4 VEJA [AQUI](https://github.com/QualityOps/wdio-timeline-reporter/tree/v4)**

```shell
npm install --save wdio-timeline-reporter
```

Uma dependência será adicionada ao seu `package.json`

```json
{
  "dependencies": {
    "wdio-timeline-reporter": "^5.1.0"
  }
}
```

### Uso

Adicione `timeline` ao array de relatores em seu arquivo de configuração wdio.

Também importe e adicione `TimelineService` de wdio-timeline-reporter.

O serviço é obrigatório para combinar relatórios e criar html, pois os relatores agora são inicializados por instância de executor no webdriverio 5. [Veja a discussão aberta no webdriverio](https://github.com/webdriverio/webdriverio/issues/3780)

O TimelineService também pode gerenciar a captura de screenshots durante a execução dos testes. Você tem a opção de reduzir o tamanho e a qualidade das imagens e incorporar as imagens no relatório como base64. Estes são configuráveis usando as [opções do repórter.](#reporter-options)

```js
// wdio.conf.js
const { TimelineService } = require('wdio-timeline-reporter/timeline-service');
exports.config = {
  // ...
  reporters: [['timeline', { outputDir: './desired_location' }]],
  // ...
  services: [[TimelineService]]
};
```

### Opções do Repórter

Se você deseja substituir a configuração padrão do repórter, adicione um objeto literal reporterOptions ao array timeline em reporters, conforme mostrado abaixo.

![reporter-options.png](https://github.com/QualityOps/wdio-timeline-reporter/blob/master/./images/reporter-options.png)

| índice | descrição                                                                                                                                                                                             |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.    | Diretório onde o arquivo html e as capturas de tela serão criados. Opção obrigatória                                                                                                                  |
| 2.    | Nome do arquivo de relatório html. O valor padrão é `timeline-report.html`                                                                                                                             |
| 3.    | Incorporar imagens como base64 no arquivo html. O valor padrão é `false`                                                                                                                               |
| 4.    | Opções de objeto para manipulação de imagem                                                                                                                                                            |
| 5.    | Definir qualidade JPEG. Relevante apenas se a opção `resize` for `true`. Quanto menor o valor, menor será o tamanho e a qualidade da imagem. O valor padrão é `70`. O valor máximo permitido é `100`   |
| 6.    | Redimensionar imagem. O valor padrão é `false`                                                                                                                                                        |
| 7.    | valor para diminuir o número total de pixels. Relevante apenas se a opção `resize` for verdadeira. O padrão é `1` Valores válidos `1 - 5`                                                              |
| 8.    | com que frequência tirar capturas de tela. Os valores suportados são `on:error`, `before:click`, `none`. O padrão é `none`. `before:click` é uma ótima opção para criar uma linha do tempo de capturas de tela do aplicativo em teste. |

### Adicionar informações adicionais ao contexto de teste

É possível adicionar informações adicionais a um teste usando o método estático `addContext`. Isso pode ser útil para adicionar informações importantes que podem ajudar na depuração de testes com falha, por exemplo, um usuário criado durante a execução do teste com um nome de usuário dinâmico

#### Uso básico

O método estático `TimelineReporter.addContext` aceita um parâmetro de string ou um objeto literal com duas propriedades `title` e `value`, por exemplo

```js
{ title: 'sessionId', value: 'b59bb9ec-ab15-475e-9ce6-de8a14ca0cd3' }
```

o valor também pode ser um link

##### Exemplo Mocha

```js
const TimelineReporter = require('wdio-timeline-reporter').default;

describe('Suite', function() {
  it('Test', function() {
    // objeto literal como parâmetro
    TimelineReporter.addContext({
      title: 'Test User',
      value: 'user id created during the test'
    });

    // valor como tag âncora
    TimelineReporter.addContext({
      title: 'Dynamic link',
      value: '<a href="">Some important link related to test</a>'
    });

    // parâmetro string
    TimelineReporter.addContext('This test might be flaky');
  });
});
```

## Agradecimento

Gostaria de dar um agradecimento especial aos autores e mantenedores do [wdio-json-reporter](https://github.com/fijijavis/wdio-json-reporter). Passar por sua solução v5 ajudou a acelerar meu trabalho