---
id: qajonatasmartins-wdio-google-chat-service
title: Serviço do Google Chat
custom_edit_url: https://github.com/qajonatasmartins/wdio-google-chat-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> @qajonatasmartins/wdio-google-chat-service é um pacote de terceiros, para mais informações, consulte [GitHub](https://github.com/qajonatasmartins/wdio-google-chat-service) | [npm](https://www.npmjs.com/package/wdio-google-chat-service)

Biblioteca Webdriverio para enviar resultados de testes como notificação/mensagem para espaços do Google Chat.

## Instalação

`npm install wdio-google-chat-service --save-dev`

ou

`yarn add wdio-google-chat-service`

## Configurações

Primeiro, importe o serviço no arquivo de configuração wdio `wdio.conf.js`

```
// wdio.conf.js
const GoogleChatService = require('wdio-google-chat-service');
```

Para usar o serviço, você precisa ter a URL do webhook do Google Chat para enviar a notificação e adicionar a URL em 'webhook'

Exemplo:

```
services: [[GoogleChatService, {
            webhookUrl: 'https://chat.googleapis.com/v1/spaces/xxxxxxxxx/messages?key=xxxxxxxx&token=xxxxxxxxx',
            notifyOnlyOnFailure: false //Enviar notificação apenas em caso de falha no teste
        }]
],
```

## Obtendo o webhook do Google Chat

Nota: O Google Chat só tem o webhook para contas empresariais. Se você usar uma conta pessoal, provavelmente não terá a opção de webhook.

1. Crie um espaço no Google Chat
2. Clique na seta no nome do espaço de chat
3. Clique em [Gerenciar Webhooks]
4. Adicione ou copie a URL do webhook apresentada.
5. Cole a URL do webhook no serviço dentro da opção 'webhookUrl' como no exemplo acima.

## Recursos

- Suporte para o executor mocha
- Detalhes de erro
- Enviar notificação apenas em caso de falha no teste

## Resultados

![Teste aprovado e falha](https://github.com/qajonatasmartins/wdio-google-chat-service/blob/main/./img/testPassAndFail.png)