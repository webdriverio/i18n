---
id: wdio-rerun-service
title: Serviço de Re-execução
custom_edit_url: https://github.com/jwplayer/wdio-rerun-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-rerun-service é um pacote de terceiros, para mais informações, consulte [GitHub](https://github.com/jwplayer/wdio-rerun-service) | [npm](https://www.npmjs.com/package/wdio-rerun-service)

[![wdio-rerun-service CI](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml/badge.svg)](https://github.com/webdriverio-community/wdio-rerun-service/actions/workflows/node.js.yml)
![npm](https://img.shields.io/npm/dm/wdio-rerun-service)
![npm bundle size](https://img.shields.io/bundlephobia/min/wdio-rerun-service)
![GitHub issues](https://img.shields.io/github/issues/webdriverio-community/wdio-rerun-service)

Este serviço monitora testes Mocha ou Jasmine com falha e cenários Cucumber executados dentro do framework de teste [WebdriverIO](https://webdriver.io). Ele permitirá que testes ou cenários com falha ou instáveis sejam executados novamente.

_NOTA_: Usuários do Framework Cucumber que executam as versões WebdriverIO `5.x` e `6.x` devem usar a versão `1.6.x`. Se você estiver na versão principal mais recente `7.x`, use a versão mais recente `1.7.x` deste serviço.

## Re-execução vs. Repetição

A lógica de `retry` incorporada no WebdriverIO para Cucumber e Mocha/Jasmine é útil para lidar com etapas instáveis em Cucumber e Mocha/Jasmine. A repetição em cada framework tem ressalvas:
* Cucumber: Não leva em conta que algumas etapas podem não ser capazes de serem repetidas no meio de um teste. Executar uma etapa duas vezes pode quebrar o resto do Cenário ou pode não ser possível no contexto do teste.
* Mocha/Jasmine: A lógica de `retry` pode ser aplicada a um teste individual, no entanto, isso ainda é feito em tempo real e talvez não leve em conta problemas temporais ou problemas de conectividade de rede.

As principais distinções do `re-run`:
* Irá executar novamente um Cenário Cucumber inteiro e não apenas uma única etapa
* Permite que um arquivo de especificação inteiro seja executado novamente após a conclusão da execução do teste principal
* Pode ser copiado e executado localmente (`retry` não pode)
* Ainda pode ser usado em conjunto com métodos de `retry`
* Não requer nenhuma alteração de código para aplicar a lógica de `retry` a testes instáveis ou problemáticos

Recomenda-se dedicar algum tempo para avaliar as opções disponíveis. Uma solução híbrida pode ser a melhor solução para fornecer os melhores resultados de teste reais e acionáveis.

## Instalação

A maneira mais fácil é adicionar `wdio-rerun-service` às `devDependencies` no seu `package.json`.

```json
{
    "devDependencies": {
        "wdio-rerun-service": "^1.6.2"
    }
}
```

Pode ser instalado usando `npm`:

```bash
npm install wdio-rerun-service
```

Após a conclusão da instalação do pacote, adicione-o ao array `services` em `wdio.conf.js`:

```js
// wdio.conf.js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [RerunService, {
        // ...
    }]
};
```

Instruções sobre como instalar o `WebdriverIO` podem ser encontradas [aqui.](https://webdriver.io/docs/gettingstarted.html)

## Configuração

As seguintes opções podem ser adicionadas ao arquivo wdio.conf.js. Para definir opções para o serviço, você precisa adicionar o serviço à lista `services` da seguinte maneira:

```js
// wdio.conf.js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            // Opções do serviço de re-execução aqui...
        }]
    ],
    // ...
};
```

### rerunDataDir
Diretório onde todos os dados JSON de re-execução serão mantidos durante a execução.

Tipo: `String`

Padrão: `./results/rerun`

Exemplo:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            rerunDataDir: './custom-rerun-directory'
        }]
    ],
    // ...
}
```

### rerunScriptPath
Caminho para escrever o script Bash de re-execução.

Tipo: `String`

Padrão: `./rerun.sh`

Exemplo:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            rerunScriptPath: './custom-path-for-rerun.sh'
        }]
    ],
    // ...
}
```

### ignoredTags
(Apenas Cucumber) Conjunto de tags Cucumber para excluir. Se o cenário contiver uma tag, o serviço de re-execução ignorará a análise.

Tipo: `Array`

Padrão: `[]`

Exemplo:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            ignoredTags: ['@known_bug']
        }]
    ],
    // ...
}
```

### commandPrefix
Prefixo que será adicionado ao comando de re-execução que é gerado.

Tipo: `String`

Padrão: `''`

Exemplo:
```js
const RerunService = require('wdio-rerun-service');
export.config = {
    // ...
    services: [
        [RerunService, {
            commandPrefix: "VARIABLE=true"
        }]
    ],
    // ...
}
```
----