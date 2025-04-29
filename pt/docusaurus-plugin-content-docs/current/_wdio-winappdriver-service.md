---
id: wdio-winappdriver-service
title: Serviço winappdriver
custom_edit_url: https://github.com/licanhua/wdio-winappdriver-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-winappdriver-service é um pacote de terceiros, para mais informações consulte [GitHub](https://github.com/licanhua/wdio-winappdriver-service) | [npm](https://www.npmjs.com/package/wdio-winappdriver-service)

Este serviço ajuda você a executar o servidor WinAppDriver perfeitamente ao executar testes com o [WDIO testrunner](https://webdriver.io/guide/testrunner/gettingstarted.html). Ele inicia o [WinAppDriver](https://github.com/Microsoft/WinAppDriver) em um processo filho.

## Instalação

```bash
npm install wdio-winappdriver-service --save-dev
```

Instruções sobre como instalar o `WebdriverIO` podem ser encontradas [aqui.](https://webdriver.io/docs/gettingstarted.html)

## Configuração

Para usar o serviço, você precisa adicionar `winappdriver` ao seu array de serviços:

```js
// wdio.conf.js
export.config = {
    // ...
    services: ['winappdriver'],
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
        ['winappdriver', {
            // Opções do serviço WinAppDriver aqui
            // ...
        }]
    ],
    // ...
};
```

### logPath

Caminho onde todos os logs do servidor winappdriver devem ser armazenados.

Tipo: `String`

Exemplo:

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command

Para usar sua própria instalação do WinAppDriver, por exemplo, instalado globalmente, especifique o comando que deve ser iniciado.

Tipo: `String`

Exemplo:

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            command : 'c:\\Program Files (x86)\\Windows Application Driver\\WinAppDriver.exe'
        }]
    ],
    // ...
}
```

### args

Lista de argumentos passados diretamente para o `WinAppDriver`.

Veja [a documentação](https://github.com/Microsoft/WinAppDriver) para possíveis argumentos.

Tipo: `Array`

Padrão: `[]`

Exemplo:

```js
export.config = {
    // ...
    services: [
        ['winappdriver', {
            args: ['10.0.0.10', '4723/wd/hub']
        }]
    ],
    // ...
}
```