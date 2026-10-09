---
id: getting-started
title: Primeiros Passos
description: "Instale o WebdriverIO DevTools e execute seu primeiro teste no modo live ou no modo trace para reproduzir o DOM, capturas de tela, rede e saída do console."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

O WebdriverIO DevTools oferece aos seus testes de navegador end-to-end uma interface de ferramentas de desenvolvedor para executar, depurar e inspecionar a automação — reprodução do DOM, capturas de tela por comando, captura de rede e console, e screencasts da sessão. Ele funciona em dois modos. O **modo live** abre um [dashboard](/docs/devtools/dashboard) interativo em uma janela do navegador enquanto seus testes são executados, para que você possa acompanhá-los e executá-los novamente em tempo real. O **modo trace** dispensa a interface e grava um [artefato de trace](/docs/devtools/wdio/trace-mode) portátil e offline (`trace.zip`) que você pode abrir depois no player `show-trace` — ideal para CI. Esta página coloca você no modo live rapidamente; o modo trace está a apenas uma opção de distância.

## Instalação e primeira execução

Escolha seu adaptador, instale-o e adicione a configuração mínima abaixo. Execute seus testes normalmente — o dashboard do DevTools abre automaticamente em uma nova janela do navegador.

<Tabs
defaultValue="wdio"
values={[
{label: 'WebdriverIO', value: 'wdio'},
{label: 'Selenium', value: 'selenium'},
{label: 'Nightwatch', value: 'nightwatch'},
]}
>
<TabItem value="wdio">

Instale o serviço:

```sh
npm install @wdio/devtools-service --save-dev
```

Adicione-o à configuração do seu test runner:

```ts
// wdio.conf.ts
export const config = {
  services: ['devtools'],
}
```

Execute seus testes WebdriverIO normalmente — a interface do DevTools abre automaticamente e os testes começam a ser visualizados imediatamente.

</TabItem>
<TabItem value="selenium">

Funciona com Mocha, Jest, Cucumber ou um script `node` simples — o plugin detecta o runner automaticamente. Instale-o:

```bash
npm install @wdio/selenium-devtools
```

Adicione um único import e uma chamada `configure` no topo do seu arquivo de teste (exemplo com Mocha):

```js
// tests/example.test.js
import { Builder, By, until } from 'selenium-webdriver'
import { DevTools } from '@wdio/selenium-devtools'

DevTools.configure({
  screencast: { enabled: true, quality: 70, maxWidth: 1280, maxHeight: 720 }
})

describe('smoke test', function () {
  let driver

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build()
  })

  after(async function () {
    if (driver) {
      await driver.quit()
    }
  })

  it('loads example.com', async function () {
    await driver.get('https://example.com')
    await driver.wait(until.elementLocated(By.css('h1')), 10000)
  })
})
```

Execute-o — a interface do DevTools abre em uma nova janela do Chrome:

```bash
mocha --timeout 60000 tests/example.test.js
```

Consulte a [página do Selenium](/docs/devtools/selenium) para as configurações com Jest, Cucumber e Node simples.

</TabItem>
<TabItem value="nightwatch">

Instale o adaptador:

```bash
npm install @wdio/nightwatch-devtools
```

Integre-o à sua configuração do Nightwatch via `globals` — nenhuma alteração nos arquivos de teste é necessária:

```js
// nightwatch.conf.cjs
const nightwatchDevtools = require('@wdio/nightwatch-devtools').default

module.exports = {
  src_folders: ['tests'],

  test_settings: {
    default: {
      desiredCapabilities: {
        browserName: 'chrome',
        // Necessário para a captura de requisições de rede
        'goog:loggingPrefs': { performance: 'ALL' }
      },
      globals: nightwatchDevtools({ port: 3000 })
    }
  }
}
```

Execute seus testes normalmente — a interface do DevTools abre automaticamente:

```bash
nightwatch
```

Consulte a [página do Nightwatch](/docs/devtools/nightwatch) para a configuração com Cucumber/BDD.

</TabItem>
</Tabs>

## Próximos passos

- **[Modo Trace](/docs/devtools/wdio/trace-mode)** — defina `mode: 'trace'` para dispensar a interface e gerar um artefato de trace portátil e offline para CI.
- **[Referência de Configuração](/docs/devtools/reference)** — todas as opções dos três adaptadores.
- **Frameworks** — guias completos por adaptador: [WebdriverIO](/docs/devtools/wdio), [Selenium](/docs/devtools/selenium), [Nightwatch](/docs/devtools/nightwatch).