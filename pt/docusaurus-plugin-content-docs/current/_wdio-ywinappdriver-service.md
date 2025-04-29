---
id: wdio-ywinappdriver-service
title: Serviço ywinappdriver
custom_edit_url: https://github.com/licanhua/wdio-ywinappdriver-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-ywinappdriver-service é um pacote de terceiros, para mais informações, consulte [GitHub](https://github.com/licanhua/wdio-ywinappdriver-service) | [npm](https://www.npmjs.com/package/wdio-ywinappdriver-service)

Este serviço ajuda você a executar o servidor ywinappdriver de forma transparente ao executar testes com o [WDIO testrunner](https://webdriver.io/guide/testrunner/gettingstarted.html). Ele inicia o [ywinappdriver](https://github.com/licanhua/YWinAppDriver) em um processo filho.

## Instalação

```bash
npm install wdio-ywinappdriver-service --save-dev
```

Instruções sobre como instalar o `WebdriverIO` podem ser encontradas [aqui.](https://webdriver.io/docs/gettingstarted.html)

## Configuração

Para usar o serviço, você precisa adicionar `ywinappdriver` ao seu array de serviços:

```js
// wdio.conf.js
export.config = {
    // ...
    services: ['ywinappdriver'],
    // ...
};
```

## Opções

As seguintes opções podem ser adicionadas ao arquivo wdio.conf.js. Para definir opções para o serviço, você precisa adicionar o serviço à lista `services` da seguinte maneira:

```js
// wdio.conf.js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            // opções do serviço ywinappdriver aqui
            // ...
        }]
    ],
    // ...
};
```

### logPath

Caminho onde todos os logs do servidor ywinappdriver devem ser armazenados.

Tipo: `String`

Exemplo:

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command

Para usar sua própria instalação do winappdriver, por exemplo, instalado globalmente, especifique o comando que deve ser iniciado.

Tipo: `String`

Exemplo:

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            command : 'c:\\xx\\ywinappdriver.exe'
        }]
    ],
    // ...
}
```

### args

Lista de argumentos passados diretamente para o `ywinappdriver`.

Veja [a documentação](https://github.com/licanhua/ywinappdriver) para possíveis argumentos.

Tipo: `Array`

Padrão: `[]`

Exemplo:

```js
export.config = {
    // ...
    services: [
        ['ywinappdriver', {
            args: ['--urls' 'http://127.0.0.1:4723' '--basepath' '/wd/hub']
        }]
    ],
    // ...
}
```