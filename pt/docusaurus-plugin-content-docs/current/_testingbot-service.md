---
id: testingbot-service
title: Serviço Testingbot
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-testingbot-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Serviço WebdriverIO que fornece uma melhor integração com o TestingBot. Ele atualiza os metadados do trabalho ('name', 'passed', 'tags', 'public', 'build', 'extra') e executa o TestingBot Tunnel, se desejado.

## Instalação

A maneira mais fácil é manter o `@wdio/testingbot-service` como uma devDependency no seu arquivo `package.json`, via:

```sh
npm install @wdio/testingbot-service --save-dev
```

Instruções sobre como instalar o `WebdriverIO` podem ser encontradas [aqui.](https://webdriver.io/docs/gettingstarted)

## Configuração

Para usar o serviço, você precisa definir `user` e `key` no seu arquivo `wdio.conf.js`, e configurar a opção `hostname` para `hub.testingbot.com`. Se você quiser usar o [TestingBot Tunnel](https://testingbot.com/support/other/tunnel)
você precisa definir `tbTunnel: true`.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.TB_KEY,
    key: process.env.TB_SECRET,
    services: [
        ['testingbot', {
            tbTunnel: true
        }]
    ],
    // ...
};
```

## Opções

Para autorizar o serviço TestingBot, sua configuração precisa conter as opções [`user`](https://webdriver.io/docs/options#user) e [`key`](https://webdriver.io/docs/options#key).

### tbTunnel
Se verdadeiro, executa o TestingBot Tunnel e abre uma conexão segura entre uma Máquina Virtual TestingBot executando seus testes de navegador.

Tipo: `Boolean`<br />
Padrão: `false`

### tbTunnelOpts
Aplique opções do TestingBot Tunnel (por exemplo, para alterar as configurações de número de porta ou arquivo de log). Veja [esta lista](https://github.com/testingbot/testingbot-tunnel-launcher) para mais informações.

Tipo: `Object`<br />
Padrão: `{}`