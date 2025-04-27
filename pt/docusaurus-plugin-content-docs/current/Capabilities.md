---
id: capabilities
title: Capacidades
---

Uma capacidade é uma definição para uma interface remota. Ela ajuda o WebdriverIO a entender em qual ambiente de navegador ou móvel você deseja executar seus testes. As capacidades são menos cruciais ao desenvolver testes localmente, já que geralmente você os executa em uma única interface remota na maior parte do tempo, mas se tornam mais importantes ao executar um grande conjunto de testes de integração em CI/CD.

:::info

O formato de um objeto de capacidade é bem definido pela [especificação WebDriver](https://w3c.github.io/webdriver/#capabilities). O testrunner do WebdriverIO falhará rapidamente se as capacidades definidas pelo usuário não estiverem em conformidade com essa especificação.

:::

## Capacidades Personalizadas

Embora a quantidade de capacidades definidas fixas seja muito baixa, qualquer pessoa pode fornecer e aceitar capacidades personalizadas que são específicas para o driver de automação ou interface remota:

### Extensões de Capacidades Específicas do Navegador

- `goog:chromeOptions`: extensões do [Chromedriver](https://chromedriver.chromium.org/capabilities), aplicáveis apenas para testes no Chrome
- `moz:firefoxOptions`: extensões do [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html), aplicáveis apenas para testes no Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) para especificar o ambiente ao usar EdgeDriver para testar o Edge Chromium

### Extensões de Capacidades de Fornecedores em Nuvem

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- e muitos outros...

### Extensões de Capacidades do Motor de Automação

- `appium:xxx`: [Appium](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- e muitos outros...

### Capacidades do WebdriverIO para gerenciar opções do driver do navegador

O WebdriverIO gerencia a instalação e execução do driver do navegador para você. O WebdriverIO usa uma capacidade personalizada que permite passar parâmetros para o driver.

#### `wdio:chromedriverOptions`

Opções específicas passadas para o Chromedriver ao iniciá-lo.

#### `wdio:geckodriverOptions`

Opções específicas passadas para o Geckodriver ao iniciá-lo.

#### `wdio:edgedriverOptions`

Opções específicas passadas para o Edgedriver ao iniciá-lo.

#### `wdio:safaridriverOptions`

Opções específicas passadas para o Safari ao iniciá-lo.

#### `wdio:maxInstances`

Número máximo de trabalhadores paralelos em execução para o navegador/capacidade específica. Tem precedência sobre [maxInstances](#configuration#maxInstances) e [maxInstancesPerCapability](configuration/#maxinstancespercapability).

Tipo: `number`

#### `wdio:specs`

Define as especificações para execução de teste para aquele navegador/capacidade. Igual à [opção de configuração regular `specs`](configuration#specs), mas específica para o navegador/capacidade. Tem precedência sobre `specs`.

Tipo: `(String | String[])[]`

#### `wdio:exclude`

Exclui especificações da execução de teste para aquele navegador/capacidade. Igual à [opção de configuração regular `exclude`](configuration#exclude), mas específica para o navegador/capacidade. Tem precedência sobre `exclude`.

Tipo: `String[]`

#### `wdio:enforceWebDriverClassic`

Por padrão, o WebdriverIO tenta estabelecer uma sessão WebDriver Bidi. Se você não prefere isso, pode definir este sinalizador para desativar esse comportamento.

Tipo: `boolean`

#### Opções Comuns do Driver

Embora todos os drivers ofereçam diferentes parâmetros para configuração, existem alguns comuns que o WebdriverIO entende e usa para configurar seu driver ou navegador:

##### `cacheDir`

O caminho para a raiz do diretório de cache. Este diretório é usado para armazenar todos os drivers que são baixados ao tentar iniciar uma sessão.

Tipo: `string`<br />
Padrão: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

##### `binary`

Caminho para um binário de driver personalizado. Se definido, o WebdriverIO não tentará baixar um driver, mas usará o fornecido por este caminho. Certifique-se de que o driver seja compatível com o navegador que você está usando.

Você pode fornecer esse caminho através das variáveis de ambiente `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` ou `EDGEDRIVER_PATH`.

Tipo: `string`

:::caution

Se o `binary` do driver estiver definido, o WebdriverIO não tentará baixar um driver, mas usará o fornecido por este caminho. Certifique-se de que o driver seja compatível com o navegador que você está usando.

:::

#### Opções de Driver Específicas do Navegador

Para propagar opções para o driver, você pode usar as seguintes capacidades personalizadas:

- Chrome ou Chromium: `wdio:chromedriverOptions`
- Firefox: `wdio:geckodriverOptions`
- Microsoft Edge: `wdio:edgedriverOptions`
- Safari: `wdio:safaridriverOptions`

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'wdio:chromedriverOptions', value: 'chrome'},
    {label: 'wdio:geckodriverOptions', value: 'firefox'},
    {label: 'wdio:edgedriverOptions', value: 'msedge'},
    {label: 'wdio:safaridriverOptions', value: 'safari'},
  ]
}>
<TabItem value="chrome">

##### adbPort
A porta na qual o driver ADB deve ser executado.

Exemplo: `9515`

Tipo: `number`

##### urlBase
Prefixo do caminho URL base para comandos, p.ex. `wd/url`.

Exemplo: `/`

Tipo: `string`

##### logPath
Escreve o log do servidor em um arquivo em vez de stderr, aumenta o nível de log para `INFO`

Tipo: `string`

##### logLevel
Define o nível de log. Opções possíveis `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

Tipo: `string`

##### verbose
Log detalhado (equivalente a `--log-level=ALL`)

Tipo: `boolean`

##### silent
Sem log (equivalente a `--log-level=OFF`)

Tipo: `boolean`

##### appendLog
Anexa ao arquivo de log em vez de reescrevê-lo.

Tipo: `boolean`

##### replayable
Log detalhado e não trunca strings longas para que o log possa ser reproduzido (experimental).

Tipo: `boolean`

##### readableTimestamp
Adiciona carimbos de data/hora legíveis ao log.

Tipo: `boolean`

##### enableChromeLogs
Mostra logs do navegador (substitui outras opções de log).

Tipo: `boolean`

##### bidiMapperPath
Caminho do mapeador bidi personalizado.

Tipo: `string`

##### allowedIps
Lista de permissões separada por vírgulas de endereços IP remotos que têm permissão para se conectar ao EdgeDriver.

Tipo: `string[]`<br />
Padrão: `['']`

##### allowedOrigins
Lista de permissões separada por vírgulas de origens de solicitação que têm permissão para se conectar ao EdgeDriver. Usar `*` para permitir qualquer origem de host é perigoso!

Tipo: `string[]`<br />
Padrão: `['*']`

##### spawnOpts
Opções a serem passadas para o processo do driver.

Tipo: `SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>`<br />
Padrão: `undefined`

</TabItem>
<TabItem value="firefox">

Veja todas as opções do Geckodriver no [pacote de driver](https://github.com/webdriverio-community/node-geckodriver#options) oficial.

</TabItem>
<TabItem value="msedge">

Veja todas as opções do Edgedriver no [pacote de driver](https://github.com/webdriverio-community/node-edgedriver#options) oficial.

</TabItem>
<TabItem value="safari">

Veja todas as opções do Safaridriver no [pacote de driver](https://github.com/webdriverio-community/node-safaridriver#options) oficial.

</TabItem>
</Tabs>

## Capacidades Especiais para Casos de Uso Específicos

Esta é uma lista de exemplos que mostram quais capacidades precisam ser aplicadas para alcançar um determinado caso de uso.

### Executar Navegador em Modo Headless

Executar um navegador em modo headless significa executar uma instância do navegador sem janela ou interface do usuário. Isso é usado principalmente em ambientes CI/CD onde nenhum display é utilizado. Para executar um navegador em modo headless, aplique as seguintes capacidades:

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

```ts
{
    browserName: 'chrome',   // ou 'chromium'
    'goog:chromeOptions': {
        args: ['headless', 'disable-gpu']
    }
}
```

</TabItem>
<TabItem value="firefox">

```ts
    browserName: 'firefox',
    'moz:firefoxOptions': {
        args: ['-headless']
    }
```

</TabItem>
<TabItem value="msedge">

```ts
    browserName: 'msedge',
    'ms:edgeOptions': {
        args: ['--headless']
    }
```

</TabItem>
<TabItem value="safari">

Parece que o Safari [não suporta](https://discussions.apple.com/thread/251837694) execução em modo headless.

</TabItem>
</Tabs>

### Automatizar Diferentes Canais de Navegadores

Se você deseja testar uma versão de navegador que ainda não foi lançada como estável, por exemplo, Chrome Canary, você pode fazer isso definindo capacidades e apontando para o navegador que deseja iniciar, por exemplo:

<Tabs
  defaultValue="chrome"
  values={[
    {label: 'Chrome', value: 'chrome'},
    {label: 'Firefox', value: 'firefox'},
    {label: 'Microsoft Edge', value: 'msedge'},
    {label: 'Safari', value: 'safari'},
  ]
}>
<TabItem value="chrome">

Ao testar no Chrome, o WebdriverIO baixará automaticamente a versão desejada do navegador e driver para você com base no `browserVersion` definido, por exemplo:

```ts
{
    browserName: 'chrome', // ou 'chromium'
    browserVersion: '116' // ou '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' ou 'latest' (mesmo que 'canary')
}
```

Se você deseja testar um navegador baixado manualmente, pode fornecer um caminho binário para o navegador via:

```ts
{
    browserName: 'chrome',  // ou 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

Além disso, se você deseja usar um driver baixado manualmente, pode fornecer um caminho binário para o driver via:

```ts
{
    browserName: 'chrome', // ou 'chromium'
    'wdio:chromedriverOptions': {
        binary: '/path/to/chromdriver'
    }
}
```

</TabItem>
<TabItem value="firefox">

Ao testar no Firefox, o WebdriverIO baixará automaticamente a versão desejada do navegador e driver para você com base no `browserVersion` definido, por exemplo:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // ou 'latest'
}
```

Se você deseja testar uma versão baixada manualmente, pode fornecer um caminho binário para o navegador via:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

Além disso, se você deseja usar um driver baixado manualmente, pode fornecer um caminho binário para o driver via:

```ts
{
    browserName: 'firefox',
    'wdio:geckodriverOptions': {
        binary: '/path/to/geckodriver'
    }
}
```

</TabItem>
<TabItem value="msedge">

Ao testar no Microsoft Edge, certifique-se de ter a versão desejada do navegador instalada em sua máquina. Você pode direcionar o WebdriverIO para o navegador a ser executado via:

```ts
{
    browserName: 'msedge',
    'ms:edgeOptions': {
        binary: '/Applications/Microsoft\ Edge\ Canary.app/Contents/MacOS/Microsoft\ Edge\ Canary'
    }
}
```

O WebdriverIO baixará automaticamente a versão desejada do driver para você com base no `browserVersion` definido, por exemplo:

```ts
{
    browserName: 'msedge',
    browserVersion: '109' // ou '109.0.1467.0', 'stable', 'dev', 'canary', 'beta'
}
```

Além disso, se você deseja usar um driver baixado manualmente, pode fornecer um caminho binário para o driver via:

```ts
{
    browserName: 'msedge',
    'wdio:edgedriverOptions': {
        binary: '/path/to/msedgedriver'
    }
}
```

</TabItem>
<TabItem value="safari">

Ao testar no Safari, certifique-se de ter o [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) instalado em sua máquina. Você pode direcionar o WebdriverIO para essa versão via:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Estender Capacidades Personalizadas

Se você deseja definir seu próprio conjunto de capacidades para, por exemplo, armazenar dados arbitrários a serem usados dentro dos testes para essa capacidade específica, você pode fazer isso definindo:

```js title=wdio.conf.ts
export const config = {
    // ...
    capabilities: [{
        browserName: 'chrome',
        'custom:caps': {
            // configurações personalizadas
        }
    }]
}
```

É recomendado seguir o [protocolo W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) quando se trata de nomenclatura de capacidades, que requer um caractere `:` (dois-pontos), denotando um namespace específico de implementação. Dentro de seus testes, você pode acessar sua capacidade personalizada através de, por exemplo:

```ts
browser.capabilities['custom:caps']
```

Para garantir a segurança de tipos, você pode estender a interface de capacidade do WebdriverIO via:

```ts
declare global {
    namespace WebdriverIO {
        interface Capabilities {
            'custom:caps': {
                // ...
            }
        }
    }
}
```