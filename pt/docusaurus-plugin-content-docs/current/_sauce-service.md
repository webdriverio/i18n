---
id: sauce-service
title: Serviço Sauce
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sauce-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Serviço WebdriverIO que fornece uma melhor integração com o Sauce Labs. Este serviço pode ser usado para:

- a Nuvem de Máquinas Virtuais do Sauce Labs (Desktop Web/Emulador/Simulador)
- a Nuvem de Dispositivos Reais do Sauce Labs (iOS e Android)

Ele pode atualizar os metadados do job ('name'*, 'passed', 'tags', 'public', 'build', 'custom-data') e executa o Sauce Connect se desejado.

O que mais este serviço fará por você:

- Por padrão, o Sauce Service atualizará o 'name' do job quando o job iniciar. Isso lhe dará a opção de atualizar o nome a qualquer momento.
- Você pode definir um parâmetro `setJobName` e personalizar o nome do job de acordo com suas capabilities, opções e título da suite
- O Sauce Service também enviará a pilha de erros de um teste falho para a aba de comandos do Sauce Labs
- Ele permitirá que você configure e inicie automaticamente o [Sauce Connect](https://docs.saucelabs.com/secure-connections/)
- E ele definirá pontos de contexto na sua lista de comandos para identificar quais comandos foram executados em qual teste

## Instalação

A maneira mais fácil é manter `@wdio/sauce-service` como uma devDependency no seu `package.json`, via:

```sh
npm install @wdio/sauce-service --save-dev
```

Instruções sobre como instalar o `WebdriverIO` podem ser encontradas [aqui.](https://webdriver.io/docs/gettingstarted)

## Configuração

Para usar o serviço para Máquina Virtual Desktop/Emulador/Simulador e nuvem de Dispositivos Reais, você precisa definir `user` e `key` no seu arquivo `wdio.conf.js`. Ele usará automaticamente o Sauce Labs para executar seus testes de integração. Se você executar seus testes no Sauce Labs, poderá especificar a região onde deseja executar seus testes através da propriedade `region`. Os códigos curtos disponíveis para regiões são `us` (padrão) e `eu`. Essas regiões são usadas para a nuvem VM do Sauce Labs e a Nuvem de Dispositivos Reais do Sauce Labs. Se você não fornecer a região, o padrão será `us`.

Se você quiser que o WebdriverIO inicie automaticamente um túnel [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy), você precisa definir `sauceConnect: true`. Se você quiser mudar o centro de dados para UE, adicione `region:'eu'`, pois o centro de dados dos EUA é definido como padrão.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    region: 'us', // ou 'eu'
    services: [
        ['sauce', {
            sauceConnect: true,
            sauceConnectOpts: {
                // ...
            }
        }]
    ],
    // ...
};
```

Se você quiser usar um túnel Sauce Connect existente, só precisa fornecer um `tunnelName`. Se você estiver usando um túnel compartilhado e não for o usuário que criou o túnel, deve identificar o usuário do Sauce Labs que criou o túnel para poder usá-lo em seu teste. Inclua o `tunnelOwner` nas capabilities assim:

<Tabs
  defaultValue="tunnelname"
  values={[
    {label: 'Tunnel Name', value: 'tunnelname'},
    {label: 'Tunnel Owner', value: 'tunnelowner'}
  ]
}>
<TabItem value="tunnelname">

```js
export const config = {
    // ...
    {
        browserName: 'chrome',
        platformName: 'Windows 10',
        browserVersion: 'latest',
        // Sauce options can be found here https://docs.saucelabs.com/dev/test-configuration-options/
        'sauce:options': {
            tunnelName: 'YourTunnelName',

            // Example options
            build: 'your-build-name',
            screenResolution: '1600x1200',
            // ...
        },
    },
    // ...
};
```

</TabItem>
<TabItem value="tunnelowner">

```js
export const config = {
    // ...
    {
        browserName: 'chrome',
        platformName: 'Windows 10',
        browserVersion: 'latest',
        // Sauce options can be found here https://docs.saucelabs.com/dev/test-configuration-options/
        'sauce:options': {
            tunnelName: 'TunnelName',
            tunnelOwner: '<username of owner>,

            // Example options
            build: 'your-build-name',
            screenResolution: '1600x1200',
            // ...
        },
    },
    // ...
};
```

</TabItem>
</Tabs>

## Opções do Sauce Service

Para autorizar o serviço Sauce Labs, sua configuração precisa conter as opções [`user`](https://webdriver.io/docs/options#user) e [`key`](https://webdriver.io/docs/options#key).

### maxErrorStackLength

Este serviço enviará automaticamente a pilha de erros para o Sauce Labs quando um teste falhar. Por padrão, ele enviará apenas as primeiras 5 linhas, mas se necessário, isso pode ser alterado. Esteja ciente de que mais linhas resultarão em mais chamadas WebDriver, o que pode retardar a execução.

Tipo: `number`<br />
Padrão: `5`

### sauceConnect

Se `true`, executa o Sauce Connect e abre uma conexão segura entre uma máquina virtual do Sauce Labs executando seus testes de navegador.

Tipo: `Boolean`<br />
Padrão: `false`

### sauceConnectOpts

Aplique opções do Sauce Connect (por exemplo, para alterar as configurações de número de porta ou arquivo de log). Veja [esta lista](https://docs.saucelabs.com/dev/cli/sauce-connect-5/run/) para mais informações.

NOTA: Ao especificar as opções, o `--` deve ser omitido. Também pode ser transformado em camelCase (por exemplo, `shared-tunnel` ou `sharedTunnel`).

Tipo: `Object`<br />
Padrão: `{ }`

### uploadLogs

Se `true`, esta opção carrega todos os arquivos de log do WebdriverIO para a plataforma Sauce Labs para inspeção adicional. Certifique-se de ter [`outputDir`](https://webdriver.io/docs/options#outputdir) definido em sua configuração wdio para gravar logs em arquivos, caso contrário, os dados serão transmitidos para stdout e não poderão ser carregados.

Tipo: `Boolean`<br />
Padrão: `true`

### setJobName

Permite aos usuários definir dinamicamente o nome do job com base em parâmetros do worker, como configuração do WebdriverIO, capabilities usadas e o título original da suite.

Tipo: `Function`<br />
Padrão: `(config, capabilities, suiteTitle) => suiteTitle`

----

## Substituindo metadados de nome gerados

O serviço gera automaticamente um nome para cada teste a partir do nome da suite, nome do navegador e outras informações.

Você pode substituir isso fornecendo um valor para a capability `name` desejada, mas isso terá o efeito colateral de dar a todos os testes o mesmo nome.

----

Para mais informações sobre o WebdriverIO, consulte a [página inicial](https://webdriver.io).