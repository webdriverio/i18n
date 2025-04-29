---
id: browserstack-service
title: Serviço Browserstack
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-browserstack-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Um serviço WebdriverIO que gerencia o túnel local e metadados de trabalho para usuários do BrowserStack.

## Instalação


A maneira mais fácil é manter o `@wdio/browserstack-service` como uma devDependency no seu `package.json`, via:

```sh
npm install @wdio/browserstack-service --save-dev
```

Instruções sobre como instalar o `WebdriverIO` podem ser encontradas [aqui.](https://webdriver.io/docs/gettingstarted)


## Configuração

O WebdriverIO tem suporte ao BrowserStack integrado. Você deve definir `user` e `key` no seu arquivo `wdio.conf.js`. Este plugin de serviço fornece suporte para [BrowserStack Tunnel](https://www.browserstack.com/docs/automate/selenium/getting-started/nodejs/local-testing). Defina também `browserstackLocal: true` para ativar este recurso.
O relatório do status da sessão no BrowserStack respeitará a configuração `strict` das opções do Cucumber.

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    services: [
        ['browserstack', {
            testObservability: true,
            testObservabilityOptions: {
                projectName: "Your project name goes here",
                buildName: "The static build job name goes here e.g. Nightly regression"
            },
            browserstackLocal: true
        }]
    ],
    // ...
};
```

## Opções

Para autorizar no serviço BrowserStack, sua configuração precisa conter as opções [`user`](https://webdriver.io/docs/options#user) e [`key`](https://webdriver.io/docs/options#key).

### testObservability

O Test Observability é uma ferramenta avançada de relatórios de testes que fornece insights para melhorar seus testes de automação e ajuda a depurar mais rapidamente. Está habilitado por padrão definindo a flag `testObservability` como `true` para todos os usuários do browserstack-service. Você pode desativar isso definindo a flag `testObservability` como `false`.

Depois que seus testes terminarem, você pode visitar [Test Observability](https://observability.browserstack.com/) para depurar suas builds com insights adicionais como Análise de Erros Únicos, Detecção Automática de Testes Instáveis e muito mais.

Você pode usar o Test Observability mesmo se não executar seus testes na infraestrutura do BrowserStack. Mesmo que você execute seus testes em um CI, em uma máquina local ou até mesmo em outros provedores de serviços em nuvem, o Test Observability ainda pode gerar relatórios de teste inteligentes e análises avançadas dos seus testes.

Se você quiser usar o Test Observability sem executar seus testes na infraestrutura do BrowserStack, você pode definir sua configuração da seguinte forma:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['browserstack', {
            testObservability: true,
            testObservabilityOptions: {
                user: process.env.BROWSERSTACK_USERNAME,
                key: process.env.BROWSERSTACK_ACCESS_KEY,
                projectName: "Your project name goes here",
                buildName: "The static build job name goes here e.g. Nightly regression"
            }
        }]
    ],
    // ...
};
```

Você pode explorar todos os recursos do Test Observability neste [sandbox](https://observability-demo.browserstack.com/) ou ler mais sobre isso [aqui](https://www.browserstack.com/docs/test-observability/overview/what-is-test-observability).

### browserstackLocal
Defina como true para habilitar o roteamento de conexões da nuvem BrowserStack através do seu computador.

Tipo: `Boolean`<br />
Padrão: `false`

### forcedStop
Defina como true para matar o processo BrowserStack Local ao completar, sem esperar que o callback de parada do BrowserStack Local seja chamado. Isso é experimental e não deve ser usado por todos. Principalmente necessário como uma solução para [este problema](https://github.com/browserstack/browserstack-local-nodejs/issues/41).

Tipo: `Boolean`<br />
Padrão: `false`

### app

[Appium](https://appium.io/) defina isso com o caminho do arquivo do aplicativo disponível localmente na sua máquina para usar o aplicativo como [aplicativo em teste](https://www.browserstack.com/docs/app-automate/appium/set-up-tests/specify-app) para sessões do Appium.

Tipo: `String` ou `JsonObject`<br />
Padrão: `undefined`

Lista de valores disponíveis para app:

#### path
Use o caminho do arquivo do aplicativo disponível localmente como um aplicativo em teste para o Appium.

```js
services: [
  ['browserstack', {
    app: '/path/to/local/app.apk'
    // OU
    app: {
      path: '/path/to/local/app.apk'
    }
  }]
]
```

Passe custom_id durante o upload do aplicativo.

```js
services: [
  ['browserstack', {
    app: {
      path: '/path/to/local/app.apk',
      custom_id: 'custom_id'
    }
  }]
]
```

#### id
Use a URL do aplicativo retornada após o upload do aplicativo para o BrowserStack.

```js
services: [
  ['browserstack', {
    app: 'bs://<app-id>'
    // OU
    app: {
      id: 'bs://<app-id>'
    }
  }]
]
```

#### custom_id

use custom_id de aplicativos já carregados

```js
services: [
  ['browserstack', {
    app: 'custom_id'
    // OU
    app: {
      custom_id: 'custom_id'
    }
  }]
]
```

#### shareable_id

use shareable_id de aplicativos já carregados

```js
services: [
  ['browserstack', {
    app: 'username/custom_id'
    // OU
    app: {
      shareable_id: 'username/custom_id'
    }
  }]
]
```

### preferScenarioName

Apenas Cucumber. Define o nome da sessão do BrowserStack Automate para o nome do Cenário se apenas um único Cenário for executado.
Útil ao executar em paralelo com [wdio-cucumber-parallel-execution](https://github.com/SimitTomar/wdio-cucumber-parallel-execution).

Tipo: `Boolean`<br />
Padrão: `false`

### sessionNameFormat

Personalize o formato do nome da sessão do BrowserStack Automate.

Tipo: `Function`<br />
Padrão (Cucumber/Jasmine): `(config, capabilities, suiteTitle) => suiteTitle`<br />
Padrão (Mocha): `(config, capabilities, suiteTitle, testTitle) => suiteTitle + ' - ' + testTitle`

### sessionNameOmitTestTitle

Apenas Mocha. Não anexe o título do teste ao nome da sessão do BrowserStack Automate.

Tipo: `Boolean`<br />
Padrão: `false`

### sessionNamePrependTopLevelSuiteTitle

Apenas Mocha. Precede o título da suíte de nível superior ao nome da sessão do BrowserStack Automate.

Tipo: `Boolean`<br />
Padrão: `false`

### setSessionName

Define automaticamente o nome da sessão do BrowserStack Automate.

Tipo: `Boolean`<br />
Padrão: `true`

### setSessionStatus

Define automaticamente o status da sessão do BrowserStack Automate (passou/falhou).

Tipo: `Boolean`<br />
Padrão: `true`

### buildIdentifier

**buildIdentifier** é um id único para diferenciar cada execução que é anexado ao buildName. Escolha seu formato de buildIdentifier entre as expressões disponíveis:
* `BUILD_NUMBER`: Gera um contador incremental com cada execução
* `DATE_TIME`: Gera um timestamp com cada execução. Ex: 05-Nov-19:30

```js
services: [
  ['browserstack', {
    buildIdentifier: '#${BUILD_NUMBER}'
  }]
]
```
O Build Identifier suporta o uso de uma ou ambas as expressões junto com quaisquer outros caracteres, permitindo opções de formatação personalizadas.

### opts

Opções do BrowserStack Local.

Tipo: `Object`<br />
Padrão: `{}`

Lista de modificadores de teste local disponíveis para serem passados como opts:

#### Local Identifier

Se estiver fazendo várias conexões de teste local simultâneas, defina isso exclusivamente para diferentes processos -

```js
opts = { localIdentifier: "randomstring" };
```

#### Verbose Logging

Para habilitar o registro detalhado -

```js
opts = { verbose: "true" };
```

Nota - Os valores possíveis para o modificador 'verbose' são '1', '2', '3' e 'true'

#### Force Local

Para rotear todo o tráfego via máquina local (sua) -

```js
opts = { forceLocal: "true" };
```

#### Folder Testing

Para testar a pasta local em vez do servidor interno, forneça o caminho para a pasta como valor desta opção -

```js
opts = { f: "/my/awesome/folder" };
```

#### Force Start

Para matar outras instâncias do BrowserStack Local em execução -

```js
opts = { force: "true" };
```

#### Only Automate

Para desabilitar o teste local para Live e Screenshots, e habilitar apenas o Automate -

```js
opts = { onlyAutomate: "true" };
```

#### Proxy

Para usar um proxy para testes locais -

- proxyHost: Hostname/IP do proxy, as opções restantes do proxy são ignoradas se esta opção estiver ausente
- proxyPort: Porta para o proxy, o padrão é 3128 quando -proxyHost é usado
- proxyUser: Nome de usuário para se conectar ao proxy (apenas autenticação básica)
- proxyPass: Senha para USERNAME, será ignorada se USERNAME estiver vazio ou não especificado

```js
opts = {
  proxyHost: "127.0.0.1",
  proxyPort: "8000",
  proxyUser: "user",
  proxyPass: "password",
};
```

#### Local Proxy

Para usar proxy local em testes locais -

- localProxyHost: Hostname/IP do proxy, as opções restantes do proxy são ignoradas se esta opção estiver ausente
- localProxyPort: Porta para o proxy, o padrão é 8081 quando -localProxyHost é usado
- localProxyUser: Nome de usuário para se conectar ao proxy (apenas autenticação básica)
- localProxyPass: Senha para USERNAME, será ignorada se USERNAME estiver vazio ou não especificado

```js
opts = {
  localProxyHost: "127.0.0.1",
  localProxyPort: "8000",
  localProxyUser: "user",
  localProxyPass: "password",
};
```

#### PAC (Proxy Auto-Configuration)

Para usar PAC (Proxy Auto-Configuration) em testes locais -

- pac-file: Caminho absoluto do arquivo PAC (Proxy Auto-Configuration)

```js
opts = { "pac-file": "<pac_file_abs_path>" };
```

#### Binary Path

Por padrão, os wrappers locais do BrowserStack tentam baixar e executar a versão mais recente do binário do BrowserStack em ~/.browserstack ou no diretório de trabalho atual ou na pasta tmp por ordem. Mas você pode substituir isso passando o argumento -binarypath.
Caminho para especificar o caminho binário local -

```js
opts = { binarypath: "/path/to/binary" };
```

#### Logfile

Para salvar os logs em um arquivo ao executar com o argumento '-v', você pode especificar o caminho do arquivo. Por padrão, os logs são salvos no arquivo local.log no diretório de trabalho atual.
Para especificar o caminho para o arquivo onde os logs serão salvos -

```js
opts = { verbose: "true", logFile: "./local.log" };
```

----

Para mais informações sobre o WebdriverIO, consulte a [página inicial](https://webdriver.io).