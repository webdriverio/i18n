---
id: appium-service
title: Serviço Appium
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-appium-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Gerenciar o servidor Appium está fora do escopo do projeto WebdriverIO atual. Este serviço ajuda você a executar o servidor Appium sem problemas ao executar testes com o [testrunner WDIO](https://webdriver.io/docs/clioptions). Ele inicia o [Servidor Appium](https://appium.github.io/appium.io/docs/en/about-appium/getting-started/index.html#starting-appium) em um processo filho.

## Instalação

A maneira mais fácil é manter `@wdio/appium-service` como uma devDependency em seu `package.json`, via:

```sh
npm install @wdio/appium-service --save-dev
```

Instruções sobre como instalar o `WebdriverIO` podem ser encontradas [aqui.](https://webdriver.io/docs/gettingstarted)

## Configuração

Para usar o serviço, você precisa adicionar `appium` ao seu array de serviços:

```js
// wdio.conf.js
export const config = {
    // ...
    port: 4723, // porta padrão do appium
    services: ['appium'],
    // ...
};
```

## Opções

As seguintes opções podem ser adicionadas ao arquivo wdio.conf.js. Para definir opções para o serviço, você precisa adicionar o serviço à lista `services` da seguinte maneira:

```js
// wdio.conf.js
export const config = {
    // ...
    port: 4723, // porta padrão do appium
    services: [
        ['appium', {
            // Opções do serviço Appium aqui
            // ...
        }]
    ],
    // ...
};
```

### logPath
O caminho onde todos os logs do servidor Appium devem ser armazenados.

Tipo: `String`

Exemplo:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            logPath : './'
        }]
    ],
    // ...
}
```

### command
Para usar sua instalação do Appium, por exemplo, instalado globalmente, especifique o comando que deve ser iniciado.

Tipo: `String`

Exemplo:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            command : 'appium'
        }]
    ],
    // ...
}
```

### args
Mapa de argumentos para o servidor Appium, passados diretamente para `appium`.

Veja [a documentação](https://github.com/appium/appium/blob/master/packages/appium/docs/en/cli/args.md) para possíveis argumentos.
Os argumentos são fornecidos em camel case minúsculo. Por exemplo, `debugLogSpacing: true` transforma-se em `--debug-log-spacing`, ou podem ser fornecidos conforme descrito na documentação do Appium.

Tipo: `Object`

Padrão: `{}`

Exemplo:
```js
export const config = {
    // ...
    services: [
        ['appium', {
            args: {
                // ...
                debugLogSpacing: true,
                platformName: 'iOS'
                // ...
            }
        }]
    ],
    // ...
}
```
**Nota:** A utilização de aliases é desencorajada e não suportada. Em vez disso, use o nome completo da propriedade em camel case minúsculo.

----

Para mais informações sobre o WebdriverIO, consulte a [página inicial](https://webdriver.io).