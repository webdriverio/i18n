---
id: wdio-electron-service
title: Serviço Electron
custom_edit_url: https://github.com/webdriverio-community/wdio-electron-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-electron-service é um pacote de terceiros, para mais informações consulte [GitHub](https://github.com/webdriverio-community/wdio-electron-service) | [npm](https://www.npmjs.com/package/wdio-electron-service)

<a href="https://www.npmjs.com/package/wdio-electron-service" alt="NPM Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service/v/lts" alt="NPM LTS Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service/lts" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service/v/next" alt="NPM Next Version">
  <img src="https://img.shields.io/npm/v/wdio-electron-service/next" /></a>
<a href="https://www.npmjs.com/package/wdio-electron-service" alt="NPM Downloads">
  <img src="https://img.shields.io/npm/dw/wdio-electron-service" /></a>

<br />

**Serviço WebdriverIO para testar aplicações Electron**

Permite testes E2E multiplataforma de aplicativos Electron através do extenso ecossistema WebdriverIO.

Sucessor espiritual do [Spectron](https://github.com/electron-userland/spectron) ([RIP](https://github.com/electron-userland/spectron/issues/1045)).

### Recursos

Facilita o teste de aplicações Electron através de:

- 🚗 configuração automática do Chromedriver necessário (para Electron v26 e superior)
- 📦 detecção automática do caminho da sua aplicação Electron
  - suporta [Electron Forge](https://www.electronforge.io/), [Electron Builder](https://www.electron.build/) e aplicações não empacotadas
- 🧩 acesso às APIs do Electron dentro dos seus testes
- 🕵️ simulação de APIs do Electron através de uma API semelhante ao Vitest

## Instalação

Você precisará instalar o `WebdriverIO`, as instruções podem ser encontradas [aqui](https://webdriver.io/docs/gettingstarted).

## Início Rápido

A maneira recomendada para começar rapidamente é usar o [assistente de configuração WDIO](https://webdriver.io/docs/gettingstarted#initiate-a-webdriverio-setup).

### Início Rápido Manual

Para começar sem usar o assistente de configuração, você precisará instalar o serviço e o `@wdio/cli`:

```bash
npm install --dev @wdio/cli wdio-electron-service
```

Ou use seu gerenciador de pacotes preferido - pnpm, yarn, etc.

Em seguida, crie seu arquivo de configuração WDIO. Se precisar de inspiração, há uma configuração funcional no [diretório de exemplos](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./example/wdio.conf.ts) deste repositório, bem como na [página de referência de configuração WDIO](https://webdriver.io/docs/configuration).

Você precisará adicionar `electron` ao seu array de serviços e definir uma capacidade Electron, por exemplo:

_`wdio.conf.ts`_

```ts
export const config = {
  // ...
  services: ['electron'],
  capabilities: [
    {
      browserName: 'electron',
    },
  ],
  // ...
};
```

Finalmente, [execute alguns testes](https://webdriver.io/docs/gettingstarted#run-test) usando seu arquivo de configuração.

Isso iniciará uma instância do seu aplicativo da mesma forma que o WDIO lida com navegadores como Chrome ou Firefox. O serviço funciona com [WDIO (parallel) multiremote](https://webdriver.io/docs/multiremote) se você precisar executar instâncias adicionais simultaneamente, por exemplo, várias instâncias do seu aplicativo ou diferentes combinações do seu aplicativo e um navegador Web.

Se você usa [Electron Forge](https://www.electronforge.io/) ou [Electron Builder](https://www.electron.build/) para empacotar seu aplicativo, o serviço tentará automaticamente encontrar o caminho para seu aplicativo Electron empacotado. Você pode fornecer um caminho personalizado para o binário através de capacidades de serviço personalizadas, por exemplo:

_`wdio.conf.ts`_

```ts
export const config = {
  // ...
  capabilities: [
    {
      'browserName': 'electron',
      'wdio:electronServiceOptions': {
        appBinaryPath: './path/to/built/electron/app.exe',
        appArgs: ['foo', 'bar=baz'],
      },
    },
  ],
  // ...
};
```

Veja a [documentação de configuração](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/service-configuration.md#appbinarypath) para saber como encontrar o valor de `appBinaryPath` para os diferentes sistemas operacionais suportados pelo Electron.

Alternativamente, você pode direcionar o serviço para um aplicativo não empacotado fornecendo o caminho para o script `main.js`. O Electron precisará estar instalado em seu `node_modules`. É recomendável agrupar aplicativos não empacotados usando um bundler como Rollup, Parcel, Webpack, etc.

_`wdio.conf.ts`_

```ts
export const config = {
  // ...
  capabilities: [
    {
      'browserName': 'electron',
      'wdio:electronServiceOptions': {
        appEntryPoint: './path/to/bundled/electron/main.bundle.js',
        appArgs: ['foo', 'bar=baz'],
      },
    },
  ],
  // ...
};
```

## Configuração do Chromedriver

**Se seu aplicativo usa uma versão do Electron anterior à v26, você precisará [configurar manualmente o Chromedriver](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/chromedriver-configuration.md#user-managed).**

Isso ocorre porque o WDIO usa o Chrome for Testing para baixar o Chromedriver, que fornece apenas versões do Chromedriver v115 ou mais recentes.

## Documentação

**[Configuração do Serviço](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/service-configuration.md)** \
**[Configuração do Chromedriver](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/configuration/chromedriver-configuration.md)** \
**[Acessando APIs do Electron](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/electron-apis/accessing-apis.md)** \
**[Simulando APIs do Electron](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/electron-apis/mocking-apis.md)** \
**[Gerenciamento de Janelas](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/window-management.md)** \
**[Modo Standalone](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/standalone-mode.md)** \
**[Desenvolvimento](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/development.md)** \
**[Problemas Comuns e Depuração](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/common-issues-debugging.md)**

## Desenvolvimento

Leia a [documentação de desenvolvimento](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/development.md) se estiver interessado em contribuir.

## Exemplos de Integrações

Confira nosso projeto [Electron boilerplate](https://github.com/webdriverio/electron-boilerplate) que demonstra como integrar o WebdriverIO em um aplicativo de exemplo. Você também pode dar uma olhada nos diretórios [Example Apps](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./apps/) e [E2Es](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./e2e/) neste repositório.

## Suporte

Se você estiver tendo problemas para executar o WDIO com o serviço, você deve verificar os [Problemas Comuns](https://github.com/webdriverio-community/wdio-electron-service/blob/main/./docs/common-issues.md) documentados em primeira instância, depois abra uma discussão no [fórum principal do WDIO](https://github.com/webdriverio/webdriverio/discussions).

O fórum de discussão do serviço Electron é muito menos ativo que o do WDIO, mas se o problema que você está enfrentando é específico do Electron ou do uso do serviço, você pode abrir uma discussão [aqui](https://github.com/webdriverio-community/wdio-electron-service/discussions).