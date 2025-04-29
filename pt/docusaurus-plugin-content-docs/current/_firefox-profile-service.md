---
id: firefox-profile-service
title: Serviço de Perfil Firefox
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-firefox-profile-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Você deseja executar seu navegador Firefox com uma extensão específica ou precisa definir algumas preferências? O Selenium permite que você use um perfil para o navegador Firefox passando esse perfil como uma string `base64` para a propriedade `moz:firefoxOptions.profile` em suas capacidades desejadas. Isso requer a construção desse perfil e sua conversão em `base64`. Este serviço para o [wdio testrunner](https://webdriver.io/docs/clioptions) tira de suas mãos o trabalho de compilar o perfil e permite que você defina confortavelmente suas opções desejadas a partir do arquivo `wdio.conf.js`.

Para encontrar todas as opções possíveis, abra [about:config](about:config) em seu navegador Firefox ou visite o site [mozillaZine](http://kb.mozillazine.org/About:config_entries) para encontrar toda a documentação sobre cada configuração. Além disso, você pode definir extensões compiladas (como `*.xpi`) do Firefox que devem ser instaladas antes do início do teste.

## Instalação

A maneira mais fácil é manter o `@wdio/firefox-profile-service` como uma devDependency em seu `package.json`, via:

```sh
npm install @wdio/firefox-profile-service --save-dev
```

Instruções sobre como instalar o `WebdriverIO` podem ser encontradas [aqui.](https://webdriver.io/docs/gettingstarted)

## Configuração

Configure seu perfil adicionando o serviço `firefox-profile` à sua lista de serviços. Em seguida, defina suas configurações na propriedade `firefoxProfile` desta forma:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['firefox-profile', {
            extensions: [
                '/path/to/extensionA.xpi', // caminho para o arquivo .xpi
                '/path/to/extensionB' // ou caminho para a extensão Firefox descompactada
            ],
            'xpinstall.signatures.required': false,
            'browser.startup.homepage': 'https://webdriver.io',
            legacy: true // use apenas para firefox <= 55
        }]
    ],
    // ...
};
```

Se você criou uma extensão personalizada do Firefox que deseja instalar no navegador, certifique-se de definir `'xpinstall.signatures.required': false` como uma flag de perfil, pois as extensões do Firefox precisam ser [assinadas pela Mozilla](https://wiki.mozilla.org/Add-ons/Extension_Signing).

Para usar extensões personalizadas não assinadas, você também precisará usar o [Firefox Developer Edition](https://www.mozilla.org/en-GB/firefox/developer/) já que o Firefox regular 48 e mais recentes [não permitem isso](https://wiki.mozilla.org/Add-ons/Extension_Signing#Timeline).

## Opções

Contém todas as configurações como pares de chave-valor. Você pode encontrar todas as configurações disponíveis na página `about:config`.

### extensions

Adicione uma ou várias extensões à sessão do navegador. Todas as entradas podem ser um caminho absoluto para o arquivo `.xpi` ou o caminho para um diretório de extensão Firefox descompactado.

Tipo: `String[]`<br />
Padrão: `[]`

### profileDirectory

Crie um perfil Firefox baseado em um existente definindo um caminho absoluto para esse perfil.

Tipo: `String`<br />
Padrão: `null`

### proxy

Defina as configurações de proxy de rede. O parâmetro `proxy` é um hash cuja estrutura depende do valor da chave obrigatória `proxyType`, que assume um dos seguintes valores de string:

 * `direct` - conexão direta (sem proxy)
 * `system` - usar configurações de proxy do sistema operacional
 * `pac` - usar uma configuração de proxy automática baseada no valor da chave `autoconfigUrl`
 * `manual` - configurações de proxy manuais definidas separadamente para diferentes protocolos usando valores das seguintes chaves: `ftpProxy`, `httpProxy`, `sslProxy`, `socksProxy`

Tipo: `Object`<br />
Padrão: `null`<br />
Exemplo:

- Proxy Automático:
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'pac',
                    autoconfigUrl: 'http://myserver/proxy.pac'
                }
            }]
        ],
        // ...
    };
    ```

- Proxy HTTP Manual:
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'manual',
                    httpProxy: '127.0.0.1:8080'
                }
            }]
        ],
        // ...
    };
    ```

- Proxy HTTP e HTTPS Manual:
    ```js
    // wdio.conf.js
    export const config = {
        // ...
        services: [
            ['firefox-profile', {
                proxy: {
                    proxyType: 'manual',
                    httpProxy: '127.0.0.1:8080',
                    sslProxy: '127.0.0.1:8080'
                }
            }]
        ],
        // ...
    };
    ```

### legacy

Por favor, defina esta flag como `true` se você usar o Firefox v55 ou inferior.

Tipo: `Boolean`<br />
Padrão: `false`

----

Para mais informações sobre o WebdriverIO, consulte a [página inicial](https://webdriver.io).