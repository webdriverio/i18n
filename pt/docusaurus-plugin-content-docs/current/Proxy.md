---
id: proxy
title: Configuração de Proxy
---

Você pode encaminhar dois tipos diferentes de requisições através de um proxy:

- conexão entre seu script de teste e o driver do navegador (ou endpoint WebDriver)
- conexão entre o navegador e a internet

## Proxy Entre o Driver e o Teste

Se sua empresa tem um proxy corporativo (por exemplo, em `http://my.corp.proxy.com:9090`) para todas as requisições de saída, você tem duas opções para configurar o WebdriverIO para usar o proxy:

### Opção 1: Usando Variáveis de Ambiente (Recomendado)

A partir do WebdriverIO v9.12.0, você pode simplesmente definir as variáveis de ambiente padrão para proxy:

```bash
export HTTP_PROXY=http://my.corp.proxy.com:9090
export HTTPS_PROXY=http://my.corp.proxy.com:9090
# Opcional: ignorar proxy para certos hosts
export NO_PROXY=localhost,127.0.0.1,.internal.domain
```

Depois execute seus testes normalmente. O WebdriverIO usará automaticamente essas variáveis de ambiente para a configuração do proxy.

### Opção 2: Usando setGlobalDispatcher do undici

Para configurações de proxy mais avançadas ou se você precisar de controle programático, pode usar o método `setGlobalDispatcher` do undici:

#### Instale o undici

```bash npm2yarn
npm install undici --save-dev
```

#### Adicione o setGlobalDispatcher do undici ao seu arquivo de configuração

Adicione a seguinte declaração de importação no topo do seu arquivo de configuração.

```js title="wdio.conf.js"
import { setGlobalDispatcher, ProxyAgent } from 'undici';

const dispatcher = new ProxyAgent({ uri: new URL(process.env.https_proxy || 'http://my.corp.proxy.com:9090').toString() });
setGlobalDispatcher(dispatcher);

export const config = {
    // ...
}
```

Informações adicionais sobre a configuração do proxy podem ser encontradas [aqui](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md).

### Qual Método Devo Usar?

- **Use variáveis de ambiente** se quiser uma abordagem simples e padrão que funcione em diferentes ferramentas e não exija alterações no código.
- **Use setGlobalDispatcher** se precisar de recursos avançados de proxy como autenticação personalizada, diferentes configurações de proxy por ambiente, ou quiser controlar programaticamente o comportamento do proxy.

Ambos os métodos são totalmente suportados e o WebdriverIO verificará primeiro um dispatcher global antes de recorrer às variáveis de ambiente.

### Sauce Connect Proxy

Se você usa o [Sauce Connect Proxy](https://docs.saucelabs.com/secure-connections/sauce-connect-5), inicie-o via:

```sh
sc -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY --no-autodetect -p http://my.corp.proxy.com:9090
```

## Proxy Entre o Navegador e a Internet

Para encaminhar a conexão entre o navegador e a internet, você pode configurar um proxy, o que pode ser útil para (por exemplo) capturar informações de rede e outros dados com ferramentas como [BrowserMob Proxy](https://github.com/lightbody/browsermob-proxy).

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