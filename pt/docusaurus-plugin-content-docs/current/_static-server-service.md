---
id: static-server-service
title: Serviço de Servidor Estático
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-static-server-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Alguns projetos são apenas ativos de front-end e não executam mais do que um servidor estático. Este serviço ajuda você a executar um servidor de arquivos estáticos durante os testes.

## Instalação

A maneira mais fácil é adicionar `@wdio/static-server-service` como uma `devDependency` no seu `package.json`, via:

```sh
npm install @wdio/static-server-service --save-dev
```

Instruções sobre como instalar o `WebdriverIO` podem ser encontradas [aqui](https://webdriver.io/docs/gettingstarted).

## Configuração

Para usar o serviço de servidor estático, adicione `static-server` ao seu array de serviços:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['static-server'],
    // ...
};
```

## Opções

### `folders` (obrigatório)

Array de caminhos de pastas e pontos de montagem.

Tipo: `Array<Object>`
Propriedades:
 - mount `{String}` - Endpoint de URL onde a pasta será montada.
 - path `{String}` - Caminho para a pasta a ser montada.

``` javascript
 // wdio.conf.js
 export const config = {
    // ...
    services: [
        ['static-server', {
            folders: [
                { mount: '/fixtures', path: './tests/fixtures' },
                { mount: '/dist', path: './dist' },
            ]
        }]
    ],
    // ...
 };
```

### `port`

Porta para vincular o servidor.

Tipo: `Number`

Padrão: `4567`

### `middleware`

Array de objetos middleware. Carregue e instancie estes na configuração e passe-os para o servidor estático usar.

Tipo: `Array<Object>`
Propriedades:
 - mount `{String}` - Endpoint de URL onde o middleware será montado.
 - middleware `<Object>` - Função de callback do middleware.

Padrão: `[]`

``` javascript
// wdio.conf.js
import middleware from 'middleware-package'

export const config = {
    // ...
    services: [
        ['static-server', {
            middleware: [{
                mount: '/',
                middleware: middleware(/* middleware options */),
            }],
        }]
    ],
    // ...
};
```

----

Para mais informações sobre WebdriverIO, consulte a [página inicial](http://webdriver.io).