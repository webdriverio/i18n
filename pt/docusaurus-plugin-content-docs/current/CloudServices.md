---
id: cloudservices
title: Usando Serviços em Nuvem
description: "Execute testes WebdriverIO no Sauce Labs, BrowserStack, TestingBot, TestMu AI (anteriormente LambdaTest), Perfecto e outros provedores de nuvem."
---

Usar serviços sob demanda como Sauce Labs, Browserstack, TestingBot, TestMu AI (anteriormente LambdaTest) ou Perfecto com o WebdriverIO é bastante simples. Tudo o que você precisa fazer é definir o `user` e a `key` do seu serviço nas suas opções.

Opcionalmente, você também pode parametrizar seu teste definindo capabilities específicas da nuvem, como `build`. Se você quiser executar serviços em nuvem apenas no Travis, pode usar a variável de ambiente `CI` para verificar se está no Travis e modificar a configuração de acordo.

```js
// wdio.conf.js
export let config = {...}
if (process.env.CI) {
    config.user = process.env.SAUCE_USERNAME
    config.key = process.env.SAUCE_ACCESS_KEY
}
```

## Sauce Labs

Você pode configurar seus testes para serem executados remotamente no [Sauce Labs](https://saucelabs.com).

O único requisito é definir o `user` e a `key` na sua configuração (seja exportada pelo `wdio.conf.js` ou passada para `webdriverio.remote(...)`) com seu nome de usuário e chave de acesso do Sauce Labs.

Você também pode passar qualquer [opção de configuração de teste](https://docs.saucelabs.com/dev/test-configuration-options/) opcional como chave/valor nas capabilities de qualquer navegador.

### Sauce Connect

Se você quiser executar testes em um servidor que não está acessível pela Internet (como em `localhost`), precisará usar o [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy).

Está fora do escopo do WebdriverIO oferecer suporte a isso, então você terá que iniciá-lo por conta própria.

Se você estiver usando o testrunner do WDIO, baixe e configure o [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service) no seu `wdio.conf.js`. Ele ajuda a colocar o Sauce Connect em execução e vem com recursos adicionais que integram melhor seus testes ao serviço Sauce.

### Com Travis CI

O Travis CI, no entanto, [oferece suporte](http://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect) para iniciar o Sauce Connect antes de cada teste, então seguir as instruções deles é uma opção.

Se você fizer isso, deve definir a opção de configuração de teste `tunnel-identifier` nas `capabilities` de cada navegador. Por padrão, o Travis define isso com a variável de ambiente `TRAVIS_JOB_NUMBER`.

Além disso, se você quiser que o Sauce Labs agrupe seus testes por número de build, pode definir o `build` como `TRAVIS_BUILD_NUMBER`.

Por fim, se você definir `name`, isso altera o nome deste teste no Sauce Labs para este build. Se você estiver usando o testrunner do WDIO combinado com o [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service), o WebdriverIO define automaticamente um nome adequado para o teste.

Exemplo de `capabilities`:

```javascript
browserName: 'chrome',
version: '27.0',
platform: 'XP',
'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
name: 'integration',
build: process.env.TRAVIS_BUILD_NUMBER
```

### Timeouts

Como você está executando seus testes remotamente, pode ser necessário aumentar alguns timeouts.

Você pode alterar o [idle timeout](https://docs.saucelabs.com/dev/test-configuration-options/#idletimeout) passando `idle-timeout` como uma opção de configuração de teste. Isso controla quanto tempo o Sauce aguardará entre comandos antes de fechar a conexão.

## BrowserStack

O WebdriverIO também possui uma integração com o [Browserstack](https://www.browserstack.com) embutida.

O único requisito é definir o `user` e a `key` na sua configuração (seja exportada pelo `wdio.conf.js` ou passada para `webdriverio.remote(...)`) com seu nome de usuário e chave de acesso do Browserstack Automate.

Você também pode passar qualquer uma das [capabilities suportadas](https://www.browserstack.com/automate/capabilities) opcionais como chave/valor nas capabilities de qualquer navegador. Se você definir `browserstack.debug` como `true`, será gravado um screencast da sessão, o que pode ser útil.

### Testes Locais

Se você quiser executar testes em um servidor que não está acessível pela Internet (como em `localhost`), precisará usar o [Local Testing](https://www.browserstack.com/local-testing#command-line).

Está fora do escopo do WebdriverIO oferecer suporte a isso, então você deve iniciá-lo por conta própria.

Se você usar o local, deve definir `browserstack.local` como `true` nas suas capabilities.

Se você estiver usando o testrunner do WDIO, baixe e configure o [`@wdio/browserstack-service`](https://github.com/browserstack/wdio-browserstack-service) no seu `wdio.conf.js`. Ele ajuda a colocar o BrowserStack em execução e vem com recursos adicionais que integram melhor seus testes ao serviço BrowserStack.

### Com Travis CI

Se você quiser adicionar o Local Testing no Travis, terá que iniciá-lo por conta própria.

O script a seguir fará o download e o iniciará em segundo plano. Você deve executá-lo no Travis antes de iniciar os testes.

```sh
wget https://www.browserstack.com/browserstack-local/BrowserStackLocal-linux-x64.zip
unzip BrowserStackLocal-linux-x64.zip
./BrowserStackLocal -v -onlyAutomate -forcelocal $BROWSERSTACK_ACCESS_KEY &
sleep 3
```

Além disso, você pode querer definir o `build` como o número de build do Travis.

Exemplo de `capabilities`:

```javascript
browserName: 'chrome',
project: 'myApp',
version: '44.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'browserstack.local': 'true',
'browserstack.debug': 'true'
```

## TestingBot

O único requisito é definir o `user` e a `key` na sua configuração (seja exportada pelo `wdio.conf.js` ou passada para `webdriverio.remote(...)`) com seu nome de usuário e chave secreta do [TestingBot](https://testingbot.com).

Você também pode passar qualquer uma das [capabilities suportadas](https://testingbot.com/support/other/test-options) opcionais como chave/valor nas capabilities de qualquer navegador.

### Testes Locais

Se você quiser executar testes em um servidor que não está acessível pela Internet (como em `localhost`), precisará usar o [Local Testing](https://testingbot.com/support/other/tunnel). O TestingBot fornece um túnel baseado em Java para permitir que você teste sites não acessíveis pela internet.

A página de suporte do túnel deles contém as informações necessárias para colocá-lo em funcionamento.

Se você estiver usando o testrunner do WDIO, baixe e configure o [`@wdio/testingbot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-testingbot-service) no seu `wdio.conf.js`. Ele ajuda a colocar o TestingBot em execução e vem com recursos adicionais que integram melhor seus testes ao serviço TestingBot.

## TestMu AI (Anteriormente LambdaTest)

A integração com o [TestMu AI](https://www.testmuai.com/) também é embutida.

O único requisito é definir o `user` e a `key` na sua configuração (seja exportada pelo `wdio.conf.js` ou passada para `webdriverio.remote(...)`) com o nome de usuário e a chave de acesso da sua conta TestMu AI.

Você também pode passar qualquer uma das [capabilities suportadas](https://www.testmuai.com/capabilities-generator/) opcionais como chave/valor nas capabilities de qualquer navegador. Se você definir `visual` como `true`, será gravado um screencast da sessão, o que pode ser útil.

### Túnel para testes locais

Se você quiser executar testes em um servidor que não está acessível pela Internet (como em `localhost`), precisará usar o [Local Testing](https://www.testmuai.com/support/docs/testing-locally-hosted-pages/).

Está fora do escopo do WebdriverIO oferecer suporte a isso, então você deve iniciá-lo por conta própria.

Se você usar o local, deve definir `tunnel` como `true` nas suas capabilities.

Se você estiver usando o testrunner do WDIO, baixe e configure o [`wdio-lambdatest-service`](https://github.com/LambdaTest/wdio-lambdatest-service) no seu `wdio.conf.js`. Ele ajuda a colocar o TestMu AI em execução e vem com recursos adicionais que integram melhor seus testes ao serviço TestMu AI.

### Com Travis CI

Se você quiser adicionar o Local Testing no Travis, terá que iniciá-lo por conta própria.

O script a seguir fará o download e o iniciará em segundo plano. Você deve executá-lo no Travis antes de iniciar os testes.

```sh
wget http://downloads.lambdatest.com/tunnel/linux/64bit/LT_Linux.zip
unzip LT_Linux.zip
./LT -user $LT_USERNAME -key $LT_ACCESS_KEY -cui &
sleep 3
```

Além disso, você pode querer definir o `build` como o número de build do Travis.

Exemplo de `capabilities`:

```javascript
platform: 'Windows 10',
browserName: 'chrome',
version: '79.0',
build: `myApp #${process.env.TRAVIS_BUILD_NUMBER}.${process.env.TRAVIS_JOB_NUMBER}`,
'tunnel': 'true',
'visual': 'true'
```

## Perfecto

Ao usar o wdio com o [`Perfecto`](https://www.perfecto.io), você precisa criar um token de segurança para cada usuário e adicioná-lo na estrutura de capabilities (além de outras capabilities), da seguinte forma:

```js
export const config = {
  capabilities: [{
    // ...
    securityToken: "your security token"
  }],
```

Além disso, você precisa adicionar a configuração da nuvem, da seguinte forma:

```js
  hostname: "your_cloud_name.perfectomobile.com",
  path: "/nexperience/perfectomobile/wd/hub",
  port: 443,
  protocol: "https",
```

## RobotActions

O [RobotActions](https://robotactions.com) fornece dispositivos Android e iOS reais junto com nós de navegador por trás de um único endpoint. Ele autentica com um token de API em vez de um par `user` e `key`. Envie o token como um cabeçalho bearer:

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: '/',
  headers: {
    Authorization: `Bearer ${process.env.RA_API_TOKEN}`
  },
  capabilities: [{
    browserName: 'chrome'
  }]
}
```

Alternativamente, passe o token como um prefixo de caminho, que o grid remove antes de encaminhar a requisição:

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: `/t/${process.env.RA_API_TOKEN}/`,
  capabilities: [{
    browserName: 'chrome'
  }]
}
```

O grid também aceita credenciais incorporadas na URL (`https://user:token@host`) para outros clientes WebDriver, mas essa forma não pode ser usada a partir do WebdriverIO: ele é baseado em fetch, e o Node.js rejeita credenciais incorporadas na URL.

Para executar em um dispositivo real, passe o navegador como uma capability do Appium junto com qualquer um dos estilos de conexão acima:

```js
export const config = {
  protocol: 'https',
  hostname: 'grid.robotactions.com',
  port: 443,
  path: '/',
  headers: {
    Authorization: `Bearer ${process.env.RA_API_TOKEN}`
  },
  capabilities: [{
    platformName: 'Android',
    'appium:browserName': 'chrome',
    'appium:automationName': 'UiAutomator2'
  }]
}
```