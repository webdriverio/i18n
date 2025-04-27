---
id: proxy
title: Configuração de Proxy
---

Você pode encaminhar dois tipos diferentes de solicitações através de um proxy:

- conexão entre seu script de teste e o navegador driver (ou endpoint WebDriver)
- conexão entre o navegador e a internet

## Proxy Entre o Driver e o Teste

Se sua empresa tem um proxy corporativo (por exemplo, em `http://my.corp.proxy.com:9090`) para todas as solicitações de saída, siga os passos abaixo para instalar e configurar o [undici](https://github.com/nodejs/undici).

### Instalar undici

```bash npm2yarn
npm install undici --save-dev
```

### Adicionar undici setGlobalDispatcher ao seu arquivo de configuração

Adicione a seguinte declaração de requisição no topo do seu arquivo de configuração.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy).toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

Informações adicionais sobre a configuração do proxy podem ser encontradas [aqui](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

Se você usa o [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5), inicie-o via:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## Proxy Entre o Navegador e a Internet

Para encaminhar a conexão entre o navegador e a internet, você pode configurar um proxy que pode ser útil para (por exemplo) capturar informações de rede e outros dados com ferramentas como [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy).

Os parâmetros de `proxy` podem ser aplicados através das capacidades padrão da seguinte maneira:

```js title="wdio.conf.js"
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        // ...
        proxy: {
            proxyType: "manual",
            httpProxy: "corporate.proxy:8080",
            socksUsername: "codeceptjs",
            socksPassword: "secret",
            noProxy: "127.0.0.1,localhost"
        },
        // ...
    }],
    // ...
}
```

Para mais informações, consulte a [especificação WebDriver](https://w3c.github.io/webdriver/#proxy).