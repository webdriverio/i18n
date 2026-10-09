---
id: capabilities
title: Capabilities
description: "Defina capabilities para escolher o navegador ou ambiente móvel em que seus testes serão executados, incluindo capabilities personalizadas de fornecedores e casos de uso especiais."
---

Uma capability é uma definição para uma interface remota. Ela ajuda o WebdriverIO a entender em qual navegador ou ambiente móvel você deseja executar seus testes. As capabilities são menos cruciais ao desenvolver testes localmente, já que na maioria das vezes você os executa em uma única interface remota, mas se tornam mais importantes ao executar um grande conjunto de testes de integração em CI/CD.

:::info

O formato de um objeto de capability é bem definido pela [especificação WebDriver](https://w3c.github.io/webdriver/#capabilities). O testrunner do WebdriverIO falhará logo no início se as capabilities definidas pelo usuário não estiverem de acordo com essa especificação.

:::

## Capabilities Personalizadas

Embora a quantidade de capabilities definidas de forma fixa seja muito pequena, qualquer um pode fornecer e aceitar capabilities personalizadas que são específicas do driver de automação ou da interface remota:

### Extensões de Capability Específicas de Navegadores

- `goog:chromeOptions`: extensões do [Chromedriver](https://chromedriver.chromium.org/capabilities), aplicáveis apenas para testes no Chrome
- `moz:firefoxOptions`: extensões do [Geckodriver](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html), aplicáveis apenas para testes no Firefox
- `ms:edgeOptions`: [EdgeOptions](https://learn.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options) para especificar o ambiente ao usar o EdgeDriver para testar o Chromium Edge

### Extensões de Capability de Fornecedores de Nuvem

- `sauce:options`: [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#w3c-webdriver-browser-capabilities--optional)
- `bstack:options`: [BrowserStack](https://www.browserstack.com/docs/automate/selenium/organize-tests)
- `tb:options`: [TestingBot](https://testingbot.com/support/other/test-options)
- `LT:Options`: [LambdaTest](https://www.lambdatest.com/support/docs/webdriverio-with-selenium-running-webdriverio-automation-scripts-on-lambdatest-selenium-grid/)
- e muitos outros...

### Extensões de Capability de Mecanismos de Automação

- `appium:xxx`: [Appium](https://appium.io/docs/en/latest/guides/caps/)
- `selenoid:xxx`: [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)
- e muitos outros...

### Capabilities do WebdriverIO para gerenciar opções do driver do navegador

O WebdriverIO gerencia a instalação e a execução do driver do navegador para você. O WebdriverIO usa uma capability personalizada que permite passar parâmetros para o driver.

#### `wdio:chromedriverOptions`

Opções específicas passadas para o Chromedriver ao iniciá-lo.

#### `wdio:geckodriverOptions`

Opções específicas passadas para o Geckodriver ao iniciá-lo.

#### `wdio:edgedriverOptions`

Opções específicas passadas para o Edgedriver ao iniciá-lo.

#### `wdio:safaridriverOptions`

Opções específicas passadas para o Safari ao iniciá-lo.

#### `wdio:maxInstances`

<Option type="number">

Número máximo total de workers executando em paralelo para o navegador/capability específico. Tem precedência sobre [maxInstances](#configuration#maxInstances) e [maxInstancesPerCapability](configuration/#maxinstancespercapability).

</Option>

#### `wdio:specs`

<Option type="(String | String[])[]">

Define specs para a execução de testes para aquele navegador/capability. Igual à [opção de configuração `specs` regular](configuration#specs), mas específica para o navegador/capability. Tem precedência sobre `specs`.

</Option>

#### `wdio:exclude`

<Option type="String[]">

Exclui specs da execução de testes para aquele navegador/capability. Igual à [opção de configuração `exclude` regular](configuration#exclude), mas específica para o navegador/capability. A exclusão ocorre após a aplicação da opção de configuração global `exclude`.

</Option>

#### `wdio:enforceWebDriverClassic`

<Option type="boolean">

Por padrão, o WebdriverIO tenta estabelecer uma sessão WebDriver Bidi. Se você não preferir isso, pode definir esta flag para desativar esse comportamento.

</Option>

#### `wdio:electronVersion`

<Option type="string">

Baixa o Chromedriver incluído nesta versão do Electron em vez daquele do Chrome for Testing, para testar um aplicativo Electron definido como `goog:chromeOptions.binary`. Se `browserVersion` também estiver definido, o WebdriverIO usa o Chromedriver dessa versão quando a versão do Electron não puder ser baixada ou quando `CHROMEDRIVER_CDNURL` estiver definido. As versões nightly vêm de [electron/nightlies](https://github.com/electron/nightlies/releases). O serviço do Electron define isso para você a partir da versão do Electron do aplicativo.

```ts
{
    browserName: 'chrome',
    'wdio:electronVersion': '33.2.1',
    // uma sessão BiDi substitui a janela do aplicativo por `data:,`
    'wdio:enforceWebDriverClassic': true,
    'goog:chromeOptions': {
        binary: './out/my-app-darwin-arm64/my-app.app/Contents/MacOS/my-app'
    }
}
```

</Option>

#### Opções Comuns de Driver

Embora todos os drivers ofereçam parâmetros diferentes de configuração, existem alguns comuns que o WebdriverIO entende e usa para configurar seu driver ou navegador:

##### `cacheDir`

<Option type="string" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

O caminho para a raiz do diretório de cache. Este diretório é usado para armazenar todos os drivers baixados ao tentar iniciar uma sessão.

</Option>

##### `binary`

<Option type="string">

Caminho para um binário de driver personalizado. Se definido, o WebdriverIO não tentará baixar um driver, mas usará o fornecido por este caminho. Certifique-se de que o driver seja compatível com o navegador que você está usando.

Você pode fornecer este caminho através das variáveis de ambiente `CHROMEDRIVER_PATH`, `GECKODRIVER_PATH` ou `EDGEDRIVER_PATH`.

</Option>
:::caution

Se o `binary` do driver estiver definido, o WebdriverIO não tentará baixar um driver, mas usará o fornecido por este caminho. Certifique-se de que o driver seja compatível com o navegador que você está usando.

:::

#### Host Personalizado para Download do Driver

Se as CDNs públicas dos drivers não estiverem acessíveis a partir do seu ambiente, por exemplo, porque você executa seus testes atrás de um proxy corporativo ou espelha os drivers em um registro interno de artefatos, você pode apontar o download para um host personalizado usando as seguintes variáveis de ambiente:

- Chrome: `CHROMEDRIVER_CDNURL`, padrão `https://storage.googleapis.com/chrome-for-testing-public`
- Microsoft Edge: `EDGEDRIVER_CDNURL`, padrão `https://msedgedriver.microsoft.com`

Espera-se que o espelho sirva os arquivos dos drivers nos mesmos caminhos da CDN original, por exemplo, para o Chrome:

```sh
CHROMEDRIVER_CDNURL=https://artifactory.company.com/chrome-for-testing npx wdio run wdio.conf.js
```

o que resolve o driver para `https://artifactory.company.com/chrome-for-testing/<buildId>/<platform>/chromedriver-<platform>.zip`, onde `<platform>` é um de `linux64`, `linux-arm64`, `mac-x64`, `mac-arm64`, `win32` ou `win64`, por exemplo `.../140.0.7339.207/mac-arm64/chromedriver-mac-arm64.zip`.

:::info Ambientes totalmente offline

Essas variáveis redirecionam apenas o download do driver. Para impedir completamente que o WebdriverIO acesse a internet pública, mais quatro condições precisam ser atendidas:

- **Um navegador precisa estar disponível localmente.** Se o WebdriverIO não encontrar um Chrome ou Firefox instalado, ele também baixa o navegador, e esse download não respeita essas variáveis. Instale o navegador na máquina ou aponte o WebdriverIO para ele via `goog:chromeOptions.binary` / `moz:firefoxOptions.binary`.
- **Use um número de versão completo.** Se `browserVersion` for omitido, o WebdriverIO lê a versão exata do navegador local e nenhuma consulta de versão é necessária. Se você defini-lo, use a versão completa de quatro partes, por exemplo `140.0.7339.207`. Um canal de lançamento (`stable`), um marco (`140`) ou uma versão parcial (`140.0.7339`) exige uma consulta de versão em um endpoint público do Google que não pode ser redirecionado.
- **O Chromedriver precisa vir do Chrome for Testing.** Para o Chrome anterior a `153.0.8001.0` no Linux ARM64, e com `wdio:electronVersion` mas sem `browserVersion`, o Chromedriver é baixado dos releases do Electron no GitHub, que essas variáveis não redirecionam.
- **Certifique-se de que o espelho realmente tenha a versão de que você precisa.** Se o driver não puder ser obtido do seu host — porque a versão não está espelhada, mas igualmente porque a url está errada ou as credenciais foram rejeitadas — o WebdriverIO registra um aviso e então procura a versão válida conhecida mais próxima, o que novamente consulta o endpoint público. Verifique no aviso o host que foi tentado caso uma execução acesse a internet inesperadamente ou escolha uma versão que você não solicitou.

:::

#### Opções de Driver Específicas de Navegadores

Para propagar opções para o driver, você pode usar as seguintes capabilities personalizadas:

- Chrome ou Chromium: `wdio:chromedriverOptions`
- Firefox: `wdio:geckodriverOptions`
- Microsoft Egde: `wdio:edgedriverOptions`
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

<Option type="number">

A porta na qual o driver ADB deve ser executado.

Exemplo: `9515`

</Option>

##### urlBase

<Option type="string">

Prefixo do caminho da URL base para comandos, por exemplo `wd/url`.

Exemplo: `/`

</Option>

##### logPath

<Option type="string">

Grava o log do servidor em arquivo em vez de stderr, aumenta o nível de log para `INFO`

</Option>

##### logLevel

<Option type="string">

Define o nível de log. Opções possíveis: `ALL`, `DEBUG`, `INFO`, `WARNING`, `SEVERE`, `OFF`.

</Option>

##### verbose

<Option type="boolean">

Log detalhado (equivalente a `--log-level=ALL`)

</Option>

##### silent

<Option type="boolean">

Não registra nada (equivalente a `--log-level=OFF`)

</Option>

##### appendLog

<Option type="boolean">

Acrescenta ao arquivo de log em vez de reescrevê-lo.

</Option>

##### replayable

<Option type="boolean">

Log detalhado sem truncar strings longas, para que o log possa ser reproduzido (experimental).

</Option>

##### readableTimestamp

<Option type="boolean">

Adiciona timestamps legíveis ao log.

</Option>

##### enableChromeLogs

<Option type="boolean">

Mostra os logs do navegador (substitui outras opções de log).

</Option>

##### bidiMapperPath

<Option type="string">

Caminho personalizado do bidi mapper.

</Option>

##### allowedIps

<Option type="string[]" default="['']">

Lista de permissões, separada por vírgulas, de endereços IP remotos que têm permissão para se conectar ao EdgeDriver.

</Option>

##### allowedOrigins

<Option type="string[]" default="['*']">

Lista de permissões, separada por vírgulas, de origens de requisição que têm permissão para se conectar ao EdgeDriver. Usar `*` para permitir qualquer origem de host é perigoso!

</Option>

##### spawnOpts

<Option type="SpawnOptionsWithoutStdio | SpawnOptionsWithStdioTuple<StdioOption, StdioOption, StdioOption>" default="undefined">

Opções a serem passadas para o processo do driver.

</Option>
</TabItem>
<TabItem value="firefox">

Veja todas as opções do Geckodriver no [pacote oficial do driver](https://github.com/webdriverio-community/node-geckodriver#options).

</TabItem>
<TabItem value="msedge">

Veja todas as opções do Edgedriver no [pacote oficial do driver](https://github.com/webdriverio-community/node-edgedriver#options).

</TabItem>
<TabItem value="safari">

Veja todas as opções do Safaridriver no [pacote oficial do driver](https://github.com/webdriverio-community/node-safaridriver#options).

</TabItem>
</Tabs>

## Capabilities Especiais para Casos de Uso Específicos

Esta é uma lista de exemplos que mostram quais capabilities precisam ser aplicadas para alcançar um determinado caso de uso.

### Executar o Navegador em Modo Headless

Executar um navegador headless significa executar uma instância do navegador sem janela ou interface. Isso é usado principalmente em ambientes de CI/CD onde nenhuma tela é utilizada. Para executar um navegador em modo headless, aplique as seguintes capabilities:

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

Parece que o Safari [não suporta](https://discussions.apple.com/thread/251837694) a execução em modo headless.

</TabItem>
</Tabs>

### Automatizar Diferentes Canais de Navegadores

Se você quiser testar uma versão do navegador que ainda não foi lançada como estável, por exemplo o Chrome Canary, pode fazê-lo definindo capabilities e apontando para o navegador que deseja iniciar, por exemplo:

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

Ao testar no Chrome, o WebdriverIO baixará automaticamente a versão desejada do navegador e do driver para você com base no `browserVersion` definido, por exemplo:

```ts
{
    browserName: 'chrome', // ou 'chromium'
    browserVersion: '116' // ou '116.0.5845.96', 'stable', 'dev', 'canary', 'beta' ou 'latest' (o mesmo que 'canary')
}
```

Se você quiser testar um navegador baixado manualmente, pode fornecer um caminho binário para o navegador via:

```ts
{
    browserName: 'chrome',  // ou 'chromium'
    'goog:chromeOptions': {
        binary: '/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary'
    }
}
```

Além disso, se você quiser usar um driver baixado manualmente, pode fornecer um caminho binário para o driver via:

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

Ao testar no Firefox, o WebdriverIO baixará automaticamente a versão desejada do navegador e do driver para você com base no `browserVersion` definido, por exemplo:

```ts
{
    browserName: 'firefox',
    browserVersion: '119.0a1' // ou 'latest'
}
```

Se você quiser testar uma versão baixada manualmente, pode fornecer um caminho binário para o navegador via:

```ts
{
    browserName: 'firefox',
    'moz:firefoxOptions': {
        binary: '/Applications/Firefox\ Nightly.app/Contents/MacOS/firefox'
    }
}
```

Além disso, se você quiser usar um driver baixado manualmente, pode fornecer um caminho binário para o driver via:

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

Ao testar no Microsoft Edge, certifique-se de ter a versão desejada do navegador instalada em sua máquina. Você pode apontar o WebdriverIO para o navegador a ser executado via:

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

Além disso, se você quiser usar um driver baixado manualmente, pode fornecer um caminho binário para o driver via:

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

Ao testar no Safari, certifique-se de ter o [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/) instalado em sua máquina. Você pode apontar o WebdriverIO para essa versão via:

```ts
{
    browserName: 'safari technology preview'
}
```

</TabItem>
</Tabs>

## Estender Capabilities Personalizadas

Se você quiser definir seu próprio conjunto de capabilities para, por exemplo, armazenar dados arbitrários a serem usados nos testes daquela capability específica, pode fazê-lo, por exemplo, definindo:

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

É recomendado seguir o [protocolo W3C](https://w3c.github.io/webdriver/#dfn-extension-capability) no que diz respeito à nomenclatura de capabilities, que exige um caractere `:` (dois-pontos), denotando um namespace específico da implementação. Dentro dos seus testes, você pode acessar sua capability personalizada, por exemplo, através de:

```ts
browser.capabilities['custom:caps']
```

Para garantir a segurança de tipos, você pode estender a interface de capabilities do WebdriverIO via:

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