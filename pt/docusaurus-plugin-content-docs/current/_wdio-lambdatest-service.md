---
id: wdio-lambdatest-service
title: Serviço LambdaTest
custom_edit_url: https://github.com/LambdaTest/wdio-lambdatest-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-lambdatest-service is a 3rd party package, for more information please see [GitHub](https://github.com/LambdaTest/wdio-lambdatest-service) | [npm](https://www.npmjs.com/package/wdio-lambdatest-service)

[![WDIO health check](https://github.com/LambdaTest/wdio-lambdatest-service/actions/workflows/healthcheck.yml/badge.svg?branch=master)](https://github.com/LambdaTest/wdio-lambdatest-service/actions/workflows/healthcheck.yml)

> Um serviço WebdriverIO que gerencia túnel e metadados de trabalho para usuários do LambdaTest.

## Instalação

```bash
npm i wdio-lambdatest-service --save-dev
```

Instruções sobre como instalar o `WebdriverIO` podem ser encontradas [aqui.](https://webdriver.io/docs/gettingstarted.html)


## Configuração

WebdriverIO tem suporte para LambdaTest integrado. Você deve simplesmente definir `user` e `key` no seu arquivo `wdio.conf.js`. Para ativar o recurso para automação de aplicativos, defina `product: 'appAutomation'` no seu arquivo `wdio.conf.js`. Este plugin de serviço fornece suporte para [LambdaTest Tunnel](https://www.lambdatest.com/support/docs/troubleshooting-lambda-tunnel/). Defina também `tunnel: true` para ativar este recurso.

```js
// wdio.conf.js
exports.config = {
    // ...
    user: process.env.LT_USERNAME,
    key: process.env.LT_ACCESS_KEY,
    logFile : './logDir/api.log',
    product : 'appAutomation',
    services: [
        ['lambdatest', {
            tunnel: true
        }]
    ],
    // ...
};
```

### Para obter observações de erro de teste no painel de automação
Para obter observações de erro de teste no painel de automação, simplesmente adicione `ltErrorRemark: true` no seu `wdio.conf.js`.


### Para fazer upload de aplicativo localmente ou por URL
Faça upload de aplicativos `android` ou `ios` a partir de URL local ou hospedada adicionando esta configuração necessária em seu `wdio.conf.js`. Para usar o aplicativo carregado para testes junto na mesma execução, defina `enableCapability = true`, isso definirá o valor da URL do aplicativo nas capacidades.

```js
// wdio.conf.js
services: [
    [
        "lambdatest",
        {
        tunnel: true,
        app_upload: true, 
        app:{
            app_name : "xyz", //provide your desired app name
            app_path : "/path/to/your/app/file", //provide the local app location
            // or
            app_url : "https://example.test_android.apk", //provide the url where your app is horsted or stored
            custom_id : "12345", //provide your desired custom id
            enableCapability : true
        }
    }
    ]
]
```

## Opções

Para se autenticar no serviço LambdaTest, sua configuração precisa conter as opções [`user`](https://webdriver.io/docs/options.html#user) e [`key`](https://webdriver.io/docs/options.html#key).

### tunnel
Defina como true para permitir o roteamento de conexões da nuvem LambdaTest através do seu computador. Você também precisará definir `tunnel` como true nas capacidades do navegador.

Tipo: `Boolean`<br />
Padrão: `false`

### lambdatestOpts
Opções especificadas serão passadas para o LambdaTest Tunnel.

Tipo: `Object`<br />
Padrão: `{}`

A seguir está uma lista completa de todas as opções disponíveis:

#### tunnelName
Especifica o nome personalizado do LambdaTest Tunnel a ser usado.

**Exemplo:**
```json
{"tunnelName": "my_custom_tunnel"}
```

#### port
Porta para o LambdaTest Tunnel ativar.

**Exemplo:**
```json
{"port": 33000}
```
#### user
Nome de usuário do LambdaTest.

**Exemplo:**
```json
{"user": "your_username"}
```

#### key
Chave de acesso do LambdaTest.

**Exemplo:**
```json
{"key": "your_access_key"}
```

#### verbose
Se cada solicitação de proxy deve ser registrada no stdout.

**Exemplo:**
```json
{"verbose": true}
```

#### logFile
Localização do arquivo de log do LambdaTest Tunnel.

**Exemplo:**
```json
{"logFile": "/path/to/log/file"}
```

#### config

Caminho do arquivo de configuração a ser usado.
**Exemplo:**
```json
{"config": "/path/to/config/file"}
```

#### dir
Especifique o diretório local que será servido por um servidor de arquivos na porta do Tunnel.

**Exemplo:**
```json
{"dir": "/path/to/local/directory"}
```


#### proxyHost
Especifica o nome do host da porta do proxy do Tunnel.

**Exemplo:**
```json
{"proxyHost": "proxy.example.com"}
```
#### proxyUser
Especifica o nome de usuário da porta do proxy do Tunnel.

**Exemplo:**
```json
{"proxyUser": "your_proxy_username"}
```

#### proxyPass
Especifica a senha da porta do proxy do Tunnel.

**Exemplo:**
```json
{"proxyPass": "your_proxy_password"}
```

#### proxyPort
Especifica o número da porta onde o proxy do Tunnel será ativado.

**Exemplo:**
```json
{"proxyPort": 8080}
```

#### egressOnly
Usa configurações de proxy apenas para solicitações de saída.

**Exemplo:**
```json
{"egressOnly": true}
```


#### ingressOnly
Roteia apenas o tráfego de entrada via proxy especificado.

**Exemplo:**
```json
{"ingressOnly": true}
```


#### pacfile
Para usar PAC (Proxy Auto-Configuration) em testes locais, forneça
o caminho de um arquivo PAC.

**Exemplo:**
```json
{"pacfile": "/path/to/pacfile"}
```

#### loadBalanced
Ativa o [Balanceamento de Carga](https://www.lambdatest.com/support/docs/load-balancing-in-lambda-tunnel/) para o LambdaTest Tunnel.

**Exemplo:**
```json
{"loadBalanced": true}
```

#### mode
Especifica em qual modo o túnel deve ser executado "ssh" ou "ws". (padrão "ssh").

**Exemplo:**
```json
{"mode": "ssh"}
```

#### sshConnType
Especifique o tipo de conexão ssh (over_22, over_443, over_ws). Para usar –sshConnType, especifique a flag ––mode ssh primeiro.

**Exemplo:**
```json
{"sshConnType": "over_22"}
```

#### maxSSHConnections
Aumente a conexão SSH do Cliente Tunnel para o Servidor Tunnel. O valor máximo permitido é 30.

**Exemplo:**
```json
{"maxSSHConnections": 2}
```

#### sharedTunnel
Compartilhamento do Tunnel entre membros da equipe.

**Exemplo:**
```json
{"sharedTunnel": true}
```

#### env
O ambiente no qual o LambdaTest Tunnel será executado.

**Exemplo:**
```json
{"env": "production"}
```


#### infoAPIPort
Expõe a [API de Informações do Tunnel](https://www.lambdatest.com/support/docs/advanced-tunnel-features/#tunnelinfoapis) na porta especificada.

**Exemplo:**
```json
{"infoAPIPort": 8080}
```

#### callbackURL
URL de retorno para o status do túnel.

**Exemplo:**
```json
{"callbackURL": "https://example.com/callback"}
```


#### allowHosts
Lista separada por vírgulas de hosts para rotear via túnel. Todo o resto será roteado pela Internet.

**Exemplo:**
```json
{"allowHosts": "example.com,anotherexample.com"}
```

#### bypassHosts
Lista separada por vírgulas de hosts para contornar pelo túnel. Estes serão roteados pela internet.

**Exemplo:**
```json
{"bypassHosts": "example.com,anotherexample.com"}
```



#### clientCert
Caminho do arquivo de Certificado de Cliente mTLS.

**Exemplo:**
```json
{"clientCert": "/path/to/client_certificate"}
```

#### clientKey
Caminho do arquivo de Chave do Cliente mTLS.

**Exemplo:**
```json
{"clientKey": "/path/to/client_key"}
```

#### mTLSHosts
Lista separada por vírgulas de hosts mTLS.

**Exemplo:**
```json
{"mTLSHosts": "example.com,anotherexample.com"}
```


#### dns
Lista separada por vírgulas de Servidores DNS.

**Exemplo:**
```json
{"dns": "8.8.8.8,8.8.4.4"}
```


#### mitm
Ative o modo [MITM (Man-in-the-middle)](https://www.lambdatest.com/support/docs/advanced-tunnel-features/#mitmlocaltesting) para o LambdaTest Tunnel.

**Exemplo:**
```json
{"mitm": true}
```

#### ntlm
Para usar a autenticação Microsoft NTLM (Windows NT LAN Manager) para fins de comunicação ou transporte.

**Exemplo:**
```json
{"ntlm": true}
```

#### pidfile
Caminho do arquivo pid, onde o ID do processo será escrito.

**Exemplo:**
```json
{"pidfile": "/path/to/pidfile"}
```


#### usePrivateIp
Define o endereço remoto para um IP interno da máquina cliente.

**Exemplo:**
```json
{"usePrivateIp": true}
```

Você pode encontrar mais sobre essas opções [aqui](https://www.lambdatest.com/support/docs/lambda-tunnel-modifiers/).

### preferScenarioName
Somente Cucumber. Defina o nome da sessão como o nome do Cenário se apenas um único Cenário for executado.
Útil ao executar em paralelo com [wdio-cucumber-parallel-execution](https://github.com/SimitTomar/wdio-cucumber-parallel-execution).

Tipo: `Boolean`<br />
Padrão: `false`

### sessionNameFormat
Personalize o formato do nome da sessão.

Tipo: `Function`<br />
Padrão (Cucumber/Jasmine): `(config, capabilities, suiteTitle) => suiteTitle`<br />
Padrão (Mocha): `(config, capabilities, suiteTitle, testTitle) => suiteTitle + ' - ' + testTitle`

### sessionNameOmitTestTitle
Somente Mocha. Não anexe o título do teste ao nome da sessão.

Tipo: `Boolean`<br />
Padrão: `false`

### sessionNamePrependTopLevelSuiteTitle
Somente Mocha. Coloque o título da suíte de nível superior antes do nome da sessão.

Tipo: `Boolean`<br />
Padrão: `false`

### setSessionName
Defina automaticamente o nome da sessão.

Tipo: `Boolean`<br />
Padrão: `true`

### setSessionStatus
Definir automaticamente o status da sessão (aprovado/falhou).

Tipo: `Boolean`<br />
Padrão: `true`


### ignoreTestCountInName
Ignore a contagem de repetições de um teste no nome

Tipo: `Boolean`<br />
Padrão: `false`


### useScenarioName
Para obter nomes de testes como nomes de cenários para testes específicos do cucumber, basta adicionar `useScenarioName: true` no seu `wdio.conf.js`.

## Passos para compilar e publicar
1. Clone este repositório git.
2. Execute "npm install"
3. Execute "npm run build"
4. Passos para publicar: execute "npm login"
5. Execute "npm publish --access public"

----

Para mais informações sobre WebdriverIO, veja a [página inicial](https://webdriver.io).