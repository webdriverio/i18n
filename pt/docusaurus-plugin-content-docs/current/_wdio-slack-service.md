---
id: wdio-slack-service
title: Serviço Slack
custom_edit_url: https://github.com/carmenmitru/wdio-slack-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-slack-service é um pacote de terceiros, para mais informações, consulte [GitHub](https://github.com/carmenmitru/wdio-slack-service) | [npm](https://www.npmjs.com/package/wdio-slack-service)
Biblioteca Webdriverio para enviar resultados de testes como notificação/mensagem do Slack para canais

## Instalação

A maneira mais fácil é manter o `wdio-slack-service` como uma devDependency no seu `package.json`.

```json
{
  "devDependencies": {
    "wdio-slack-service": "2.0.8"
  }
}
```

Você pode simplesmente fazer isso com:

```bash
npm install wdio-slack-service --save-dev
```

Instruções sobre como instalar o `WebdriverIO` podem ser encontradas [aqui.](https://webdriver.io/docs/gettingstarted.html)

## Configuração

Primeiro, importe o serviço para o arquivo de configuração wdio `wdio.conf.js`

```js
// wdio.conf.js
const slack = require('wdio-slack-service');
```

Para usar o serviço, você precisa ter uma URL de webhook do Slack para enviar a notificação e precisa adicionar `slack` ao seu array de `services`

Exemplo:

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        [slack, {
            webHookUrl: "<SLACK_WEBHOOK_URL>", // Usado para postar notificação em um canal específico
            notifyOnlyOnFailure: true, // Enviar notificação apenas em caso de falha no teste
            messageTitle: "<NOTIFICATION_TITLE>" // Nome da notificação
        }]
]
```
## Recursos

- Enviar notificação independentemente dos resultados dos testes
- Enviar notificação apenas em caso de falha no teste
- Suporte para `mocha`, `jasmine` e `cucumber`
- Testes de retry/rerun serão registrados com informações adicionais
- Informações de duração do teste
- Detalhes de erro
- Relatório de cenário/etapa do Cucumber
- Informações sobre navegador e versão

## Como funciona
Para `mocha`/`jasmine`, a notificação será enviada no nível de especificação e para `cucumber`, será no nível de feature. Por exemplo, se você tiver 10 arquivos de spec/feature, receberá 10 notificações, pois é acionado no hook `after`

## Opções

Para enviar uma notificação, você deve ter a URL do webhook do Slack. Para saber como criar uma URL de webhook do Slack, consulte esta [página](https://api.slack.com/messaging/webhooks)

### webHookUrl

Esta URL é usada para identificar/autenticar a mensagem de postagem e enviá-la para um canal do Slack

Tipo: `String` <br/>
Opcional: `NÃO` <br/>
Padrão: `NA`

### notifyOnlyOnFailure

Se você quiser receber notificações do Slack apenas em caso de falha no teste, defina esta opção como `true`. Caso contrário, ele envia notificação para todas as execuções de teste, independentemente de passar/falhar

Tipo: `Boolean` <br/>
Opcional: `SIM` <br/>
Padrão: `false`

### messageTitle

Título da notificação

Tipo: `String` <br/>
Opcional: `SIM` <br/>
Padrão: `Webdriverio Slack Reporter`

## Capturas de tela

### Cucumber Pass/Fail

![Cucumber Pass/fail](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/Cucumber.PNG)

### Cucumber Retry

![Cucumber Retry](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/Cucumberretry.PNG)

### All Pass

![All Pass](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/allpass.PNG)

### Fail Pass

![Fail Pass](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/failpass.PNG)

### Retry Failed

![Retry Failed](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/retryfail.PNG)

### Retry Passed

![Retry Passed](https://github.com/carmenmitru/wdio-slack-service/blob/master//assets/retrypassed.PNG)

---

Para mais informações sobre o WebdriverIO, consulte a [homepage](https://webdriver.io).