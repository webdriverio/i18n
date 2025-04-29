---
id: wdio-nuxt-service
title: Serviço Nuxt Service
custom_edit_url: https://github.com/webdriverio-community/wdio-nuxt-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-nuxt-service é um pacote de terceiros, para mais informações, consulte [GitHub](https://github.com/webdriverio-community/wdio-nuxt-service) | [npm](https://www.npmjs.com/package/wdio-nuxt-service)

Este serviço ajuda você a iniciar sua aplicação quando utiliza [Nuxt](https://nuxt.com/) como ferramenta de build. Ele inicia automaticamente o servidor Nuxt usando seu `nuxt.conf.js` antes de iniciar o teste.

## Instalação

Se você está começando com WebdriverIO, pode usar o assistente de configuração para configurar tudo:

```sh
npm init wdio@latest .
```

Ele detectará seu projeto como um projeto Nuxt e instalará todos os plugins necessários para você. Se você estiver adicionando este serviço em uma configuração existente, sempre pode instalá-lo via:

```bash
npm install wdio-nuxt-service --save-dev
```

## Configuração

Para habilitar o serviço, basta adicioná-lo à sua lista de `services` em seu arquivo `wdio.conf.js`, ex.:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['nuxt'],
    // ...
};
```

Você pode aplicar opções de serviço passando uma matriz com um objeto de configuração, ex.:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['nuxt', {
            rootDir: './packages/nuxt'
        }]
    ],
    // ...
};
```

## Uso

Se sua configuração estiver configurada adequadamente, o serviço definirá a opção [`baseUrl`](https://webdriver.io/docs/configuration#baseurl) para apontar para sua aplicação. Você pode navegar até ela via comando [`url`](https://webdriver.io/docs/api/browser/url), ex.:

```ts
await browser.url('/')
await expect(browser).toHaveTitle('Welcome to Nuxt!')
await expect($('aria/Welcome to Nuxt!')).toBePresent()
```

## Opções

### `rootDir`

Diretório raiz do projeto.

Tipo: `string`<br />
Padrão: `process.cwd()`

### `dotenv`

Arquivo de ambiente a ser carregado antes do servidor iniciar.

Tipo: `string`<br />
Padrão: `.env`

### `hostname`

Hostname no qual iniciar o servidor.

Tipo: `string`<br />
Padrão: `localhost`

### `port`

Porta na qual iniciar o servidor.

Tipo: `number`<br />
Padrão: `process.env.NUXT_PORT || config.devServer.port`

### `https`

Defina como verdadeiro se o servidor de teste deve ser iniciado em https (os certificados precisam ser configurados na configuração do Nuxt).

Tipo: `boolean`<br />
Padrão: `false`

### `sslCert`

Certificado SSL a ser usado para iniciar o servidor em https.

Tipo: `string`

### `sslKey`

Chave SSL a ser usada para iniciar o servidor em https.

Tipo: `string`

----

Para mais informações sobre WebdriverIO, consulte a [página inicial](https://webdriver.io).