---
id: wdio-cucumber-viewport-logger-service
title: Serviço de Logger de Viewport para Cucumber
custom_edit_url: https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-cucumber-viewport-logger-service é um pacote de terceiros, para mais informações visite [GitHub](https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service) | [npm](https://www.npmjs.com/package/wdio-cucumber-viewport-logger-service)
## Serviço de Logger de Viewport para Cucumber no WebdriverIO

Este serviço adiciona a possibilidade de registrar seus passos do Cucumber e outras informações de depuração diretamente na janela do seu navegador em
sua solução baseada em WebdriverIO. Isso pode ser especialmente útil em casos que usam dispositivos ou máquinas virtuais sem acesso
*físico* direto a eles e a possibilidade de configurar uma sessão interativa para depuração profunda de seus testes e2e.

![demo](https://github.com/viktor-silakov/wdio-cucumber-viewport-logger-service/raw/main/img/demo.gif)

### Início Rápido

Instale o pacote:

```bash
npm install wdio-cucumber-viewport-logger-service --save-dev
```

Adicione o serviço à seção `services` da sua configuração, por exemplo:

```js
  services: [
    //...
    'cucumber-viewport-logger',
    //...
]
```

### Opções do serviço

| Opção  | Descrição | Tipo | Valor padrão |
| --- | --- | --- | --- |
| `numberOfSteps`  | o número de passos que estarão presentes no viewport  | number | 3 |
| `enabled`  | ativar/desativar o serviço | boolean | true |
| `styles`  | Estilos CSS para o wrapper do logger, *palavra-chave do passo* e *texto do passo*, veja o exemplo abaixo  | object | {} |

```js
// wdio.conf.js
exports.config = {
    // ...
    services: [
        ['cucumber-viewport-logger', {
            numberOfSteps: 5,
            enabled: process.env.VP_LOGGER === '1', // o serviço será ativado apenas quando você definir a variável de ambiente `VP_LOGGER` como `1`
            // defina estilos CSS personalizados para elementos específicos
            styles: {
                wrapper: { backgroundColor: 'white' },
                keyword: { color: 'red' },
                text: {
                    fontSize: '30px',
                    color: 'green',
                },
                closeButton: {
                    color: 'red',
                },
            },
        },]
    ]
    // ...
};
```

### API

> `logToViewport(message, styles)` - renderiza uma mensagem personalizada com estilo CSS personalizado (não obrigatório), você pode usar isso em suas definições de passos
por exemplo:
>```js
>When(/^I render message: "([^"]*)"$/, { timeout: 120000 }, function (message) {
>    browser.logToViewport(message, { text: { color: 'green' } });
>});
>```


> `removeViewportLogMessage()` - remove a seção de mensagens do viewport, pode ser útil, por exemplo, para fazer uma verificação visual

### pointerEvents: 'none'

Por padrão, todos os eventos de mouse (cliques, hover, etc.) passam pela seção de mensagens, por exemplo: em vez de clicar na seção de mensagens, seu clique "passa" para o elemento próximo à mensagem (o elemento do seu app), se você deseja alterar esse comportamento, defina a opção de estilo do wrapper 'pointerEvents' como 'auto', por exemplo:
```js

/ wdio.conf.js
exports.config = {
    // ...
    services: [
        ['cucumber-viewport-logger', {
     
            styles: {
                wrapper: { pointerEvents: 'auto' },
            },
        },]
    ]
    // ...
};
```