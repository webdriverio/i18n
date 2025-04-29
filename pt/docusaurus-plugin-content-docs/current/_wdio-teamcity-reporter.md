---
id: wdio-teamcity-reporter
title: Reporter do Teamcity
custom_edit_url: https://github.com/webdriverio-community/wdio-teamcity-reporter/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-teamcity-reporter é um pacote de terceiros, para mais informações, consulte [GitHub](https://github.com/webdriverio-community/wdio-teamcity-reporter) | [npm](https://www.npmjs.com/package/wdio-teamcity-reporter)

Reporter do WebdriverIO para Teamcity que torna possível exibir resultados de testes em tempo real, disponibilizando informações dos testes na aba Tests da página de Resultados da Build.


## Instalação

```bash
npm install wdio-teamcity-reporter --save-dev
```

Instruções sobre como instalar o WebdriverIO podem ser encontradas aqui: https://webdriver.io/docs/gettingstarted


## Configuração

Adicione o reporter no seu arquivo [wdio.conf.js](http://webdriver.io/guide/testrunner/configurationfile.html):

```javascript
exports.config = {
  // ...
  reporters: [
    [
      'teamcity',
      {
        captureStandardOutput: false, // opcional
        flowId: true, // opcional
        message: '[title]', // opcional
      }
    ]
  ],
  // ...
}
```

### Opções

- `captureStandardOutput (boolean)` — se `true`, todas as mensagens de saída padrão (e erro padrão) recebidas entre as mensagens `testStarted` e `testFinished` serão consideradas como saída de teste. O valor padrão é `false` e assume o uso de mensagens de serviço testStdOut e testStdErr para reportar a saída do teste. Padrão `false`.
- `flowId (boolean)` — se `true`, a propriedade `flowId` será adicionada a todas as mensagens. O rastreamento de fluxo é necessário, por exemplo, para distinguir processos separados executando em paralelo. Padrão `true`.
- `message (string)` — possibilidade de fornecer um formato específico para a propriedade name. Chaves possíveis: `[browser]`, `[title]`. Exemplo, `[browser] / [title]`. Padrão `[title]`.


## Links

- Referência para a documentação do Teamcity sobre mensagens de relatório: https://confluence.jetbrains.com/display/TCD65/Build+Script+Interaction+with+TeamCity
- Teamcity testdrive: https://blog.jetbrains.com/teamcity/2019/08/getting-started-with-teamcity-testdrive/


## Licença

> The MIT License