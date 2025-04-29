---
id: shared-store-service
title: Serviço de Armazenamento Compartilhado
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-shared-store-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Troque dados entre o processo principal e os workers (specs).

## Instalação

A maneira mais fácil é manter o `@wdio/shared-store-service` como uma dependência de desenvolvimento no seu `package.json`, via:

```sh
npm install @wdio/shared-store-service --save-dev
```

Instruções sobre como instalar o `WebdriverIO` podem ser encontradas [aqui.](https://webdriver.io/docs/gettingstarted)

## Uso

Obtenha/defina um valor (um objeto simples) para/do armazenamento por chave (string). A chave pode ser qualquer string arbitrária, exceto `*`, que é reservada, pois permite que você busque todo o armazenamento.

### Definir Valores

Para definir valores no armazenamento, chame:

```js
await browser.sharedStore.set('key', 'foobar123')
```

### Obter Valores

Para obter valores do armazenamento, chame:

```js
const value = await browser.sharedStore.get('key')
console.log(value) // retorna "foobar123"
```

Você também pode buscar todos os valores de chave usando a chave `*`:

```js
const store = await browser.sharedStore.get('*')
console.log(value) // retorna `{ key: "foobar" }`
```

### Acessar o Armazenamento nos Hooks do WDIO

Você também pode acessar diretamente os manipuladores assíncronos `setValue` e `getValue`.
Certifique-se de chamá-los corretamente com a palavra-chave `await`.

```js
// wdio.conf.js
import { setValue, getValue } from '@wdio/shared-store-service'

export const config = {
    // ...
    onPrepare: [async function (config, capabilities) {
        await setValue('foo', 'bar')
    }],
    // ...
    after: async () => {
        const value = await getValue('foo')
        // ...
    }
```

IMPORTANTE! Cada arquivo de especificação deve ser atômico e isolado das especificações de outros.
A ideia do serviço é lidar com problemas de configuração de ambiente muito específicos.
Por favor, evite compartilhar dados de execução de teste!

### Pools de Recursos

Se os threads de trabalho estiverem competindo por recursos que devem ser atribuídos a cada worker, você pode usar a API de Pool de Recursos:

```js
// wdio.conf.js
import { setResourcePool, getValueFromPool, addValueToPool } from '@wdio/shared-store-service'

export const config = {
    maxInstances: 2,
    // ...
    onPrepare: async function (config, capabilities) {
        await setResourcePool('availableUrls', ['url01.com', 'url02.com'])
    },
    // ...
    beforeSession: async (conf) => {
        conf.baseUrl = await getValueFromPool('availableUrls');
    },
    // ...
    afterSession: async (conf) => {
        // worker returns the used resource for next workers to use
        await addValueToPool('availableUrls', conf.baseUrl);
    }
```

Este exemplo garante que ambos os workers nunca usem o mesmo `baseUrl`. Uma URL única é atribuída apenas a um worker até que seja liberada por ele.

## Configuração

Adicione `shared-store` à lista de serviços e o objeto `sharedStore` estará acessível a você no [escopo do `browser`](https://webdriver.io/docs/api/browser) em seu teste.

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['shared-store'],
    // ...
};
```

Se você estiver usando typescript, certifique-se de adicionar `@wdio/shared-store-service` ao seu `compilerOptions.types`:

```js
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/shared-store-service"],
    }
}
```