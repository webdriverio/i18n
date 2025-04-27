---
id: configuration
title: Configuração
---

Com base no [tipo de configuração](/docs/setuptypes) (por exemplo, usando as vinculações de protocolo básico, WebdriverIO como pacote independente ou o testrunner WDIO), há um conjunto diferente de opções disponíveis para controlar o ambiente.

## Opções do WebDriver

As seguintes opções são definidas ao usar o pacote de protocolo [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

Protocolo a ser usado ao se comunicar com o servidor do driver.

Tipo: `String`<br />
Padrão: `http`

### hostname

Host do seu servidor de driver.

Tipo: `String`<br />
Padrão: `0.0.0.0`

### port

Porta em que seu servidor de driver está.

Tipo: `Number`<br />
Padrão: `undefined`

### path

Caminho para o endpoint do servidor do driver.

Tipo: `String`<br />
Padrão: `/`

### queryParams

Parâmetros de consulta que são propagados para o servidor do driver.

Tipo: `Object`<br />
Padrão: `undefined`

### user

Seu nome de usuário do serviço na nuvem (funciona apenas para contas [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) ou [LambdaTest](https://www.lambdatest.com)). Se definido, o WebdriverIO configurará automaticamente as opções de conexão para você. Se você não usar um provedor de nuvem, isso pode ser usado para autenticar qualquer outro backend WebDriver.

Tipo: `String`<br />
Padrão: `undefined`

### key

Sua chave de acesso ou chave secreta do serviço na nuvem (funciona apenas para contas [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) ou [LambdaTest](https://www.lambdatest.com)). Se definido, o WebdriverIO configurará automaticamente as opções de conexão para você. Se você não usar um provedor de nuvem, isso pode ser usado para autenticar qualquer outro backend WebDriver.

Tipo: `String`<br />
Padrão: `undefined`

### capabilities

Define as capacidades que você deseja executar em sua sessão WebDriver. Consulte o [Protocolo WebDriver](https://w3c.github.io/webdriver/#capabilities) para mais detalhes. Se você executar um driver mais antigo que não suporta o protocolo WebDriver, você precisará usar as [capacidades do JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) para executar uma sessão com sucesso.

Além das capacidades baseadas no WebDriver, você pode aplicar opções específicas de navegador e fornecedor que permitem uma configuração mais profunda do navegador remoto ou dispositivo. Estas são documentadas nas documentações dos fornecedores correspondentes, por exemplo:

- `goog:chromeOptions`: para [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: para [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: para [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: para [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: para [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: para [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Além disso, um utilitário útil é o [Configurador de Teste Automatizado](https://docs.saucelabs.com/basics/platform-configurator/) do Sauce Labs, que ajuda você a criar este objeto clicando em suas capacidades desejadas.

Tipo: `Object`<br />
Padrão: `null`

**Exemplo:**

```js
{
    browserName: 'chrome', // opções: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // versão do navegador
    platformName: 'Windows 10' // plataforma do SO
}
```

Se você estiver executando testes da web ou nativos em dispositivos móveis, `capabilities` difere do protocolo WebDriver. Consulte a [Documentação do Appium](https://appium.github.io/appium.io/docs/en/writing-running-appium/caps/) para mais detalhes.

### logLevel

Nível de verbosidade de registro.

Tipo: `String`<br />
Padrão: `info`<br />
Opções: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Diretório para armazenar todos os arquivos de log do testrunner (incluindo logs de relatórios e logs `wdio`). Se não for definido, todos os logs são transmitidos para `stdout`. Como a maioria dos relatórios é feita para fazer log em `stdout`, é recomendável usar esta opção apenas para relatórios específicos onde faz mais sentido enviar o relatório para um arquivo (como o relatório `junit`, por exemplo).

Ao executar no modo independente, o único log gerado pelo WebdriverIO será o log `wdio`.

Tipo: `String`<br />
Padrão: `null`

### connectionRetryTimeout

Tempo limite para qualquer solicitação WebDriver a um driver ou grid.

Tipo: `Number`<br />
Padrão: `120000`

### connectionRetryCount

Contagem máxima de repetições de solicitação para o servidor Selenium.

Tipo: `Number`<br />
Padrão: `3`

### agent

Permite que você use um `http`/`https`/`http2` [agente](https://www.npmjs.com/package/got#agent) personalizado para fazer solicitações.

Tipo: `Object`<br />
Padrão:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

Especifique `headers` personalizados para passar em cada solicitação WebDriver. Se o seu Selenium Grid requer autenticação básica, recomendamos passar um cabeçalho `Authorization` através desta opção para autenticar suas solicitações WebDriver, por exemplo:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Read the username and password from environment variables
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Combine the username and password with a colon separator
const credentials = `${username}:${password}`;
// Encode the credentials using Base64
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

Tipo: `Object`<br />
Padrão: `{}`

### transformRequest

Função que intercepta [opções de solicitação HTTP](https://github.com/sindresorhus/got#options) antes que uma solicitação WebDriver seja feita

Tipo: `(RequestOptions) => RequestOptions`<br />
Padrão: *nenhum*

### transformResponse

Função que intercepta objetos de resposta HTTP após a chegada de uma resposta WebDriver. A função recebe o objeto de resposta original como primeiro argumento e as `RequestOptions` correspondentes como segundo argumento.

Tipo: `(Response, RequestOptions) => Response`<br />
Padrão: *nenhum*

### strictSSL

Se não requer que o certificado SSL seja válido.
Pode ser definido por meio de variáveis de ambiente como `STRICT_SSL` ou `strict_ssl`.

Tipo: `Boolean`<br />
Padrão: `true`

### enableDirectConnect

Se deve habilitar o [recurso de conexão direta do Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
Não faz nada se a resposta não tiver as chaves adequadas enquanto a flag estiver habilitada.

Tipo: `Boolean`<br />
Padrão: `true`

### cacheDir

O caminho para a raiz do diretório de cache. Este diretório é usado para armazenar todos os drivers que são baixados ao tentar iniciar uma sessão.

Tipo: `String`<br />
Padrão: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

---

## WebdriverIO

As seguintes opções (incluindo as listadas acima) podem ser usadas com o WebdriverIO de forma independente:

### automationProtocol

Defina o protocolo que você deseja usar para automação do navegador. Atualmente, apenas [`webdriver`](https://www.npmjs.com/package/webdriver) é suportado, pois é a principal tecnologia de automação de navegador que o WebdriverIO usa.

Se você quiser automatizar o navegador usando uma tecnologia de automação diferente, defina esta propriedade para um caminho que resolva para um módulo que adere à seguinte interface:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Start a automation session and return a WebdriverIO [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts)
     * with respective automation commands. See the [webdriver](https://www.npmjs.com/package/webdriver) package
     * as a reference implementation
     *
     * @param {Capabilities.RemoteConfig} options WebdriverIO options
     * @param {Function} hook that allows to modify the client before it gets released from the function
     * @param {PropertyDescriptorMap} userPrototype allows user to add custom protocol commands
     * @param {Function} customCommandWrapper allows to modify the command execution
     * @returns a WebdriverIO compatible client instance
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * allows user to attach to existing sessions
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * Changes The instance session id and browser capabilities for the new session
     * directly into the passed in browser object
     *
     * @optional
     * @param   {object} instance  the object we get from a new browser session.
     * @returns {string}           the new session id of the browser
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

Tipo: `String`<br />
Padrão: `webdriver`

### baseUrl

Encurte chamadas de comando `url` definindo uma URL base.
- Se seu parâmetro `url` começar com `/`, então `baseUrl` é prefixado (exceto o caminho `baseUrl`, se tiver um).
- Se seu parâmetro `url` começar sem um esquema ou `/` (como `some/path`), então o `baseUrl` completo é prefixado diretamente.

Tipo: `String`<br />
Padrão: `null`

### waitforTimeout

Tempo limite padrão para todos os comandos `waitFor*`. (Observe o "f" minúsculo no nome da opção.) Este tempo limite __apenas__ afeta comandos que começam com `waitFor*` e seu tempo de espera padrão.

Para aumentar o tempo limite para um _teste_, consulte a documentação do framework.

Tipo: `Number`<br />
Padrão: `5000`

### waitforInterval

Intervalo padrão para todos os comandos `waitFor*` para verificar se um estado esperado (por exemplo, visibilidade) foi alterado.

Tipo: `Number`<br />
Padrão: `100`

### region

Se estiver executando no Sauce Labs, você pode escolher executar testes entre diferentes data centers: US ou EU.
Para alterar sua região para EU, adicione `region: 'eu'` à sua configuração.

__Nota:__ Isso só tem efeito se você fornecer opções `user` e `key` que estão conectadas à sua conta do Sauce Labs.

Tipo: `String`<br />
Padrão: `us`

*(apenas para vm e/ou em/simuladores)*

---

## Opções do Testrunner

As seguintes opções (incluindo as listadas acima) são definidas apenas para executar WebdriverIO com o testrunner WDIO:

### specs

Define especificações para execução de teste. Você pode especificar um padrão glob para corresponder a vários arquivos de uma vez ou agrupar um glob ou conjunto de caminhos em uma matriz para executá-los dentro de um único processo de trabalho. Todos os caminhos são vistos como relativos ao caminho do arquivo de configuração.

Tipo: `(String | String[])[]`<br />
Padrão: `[]`

### exclude

Exclui especificações da execução do teste. Todos os caminhos são vistos como relativos ao caminho do arquivo de configuração.

Tipo: `String[]`<br />
Padrão: `[]`

### suites

Um objeto descrevendo várias suítes, que você pode então especificar com a opção `--suite` na CLI `wdio`.

Tipo: `Object`<br />
Padrão: `{}`

### capabilities

O mesmo que a seção `capabilities` descrita acima, exceto com a opção de especificar um objeto [`multiremote`](/docs/multiremote) ou várias sessões WebDriver em uma matriz para execução paralela.

Você pode aplicar as mesmas capacidades específicas de fornecedor e navegador conforme definido [acima](/docs/configuration#capabilities).

Tipo: `Object`|`Object[]`<br />
Padrão: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Número máximo total de trabalhadores em execução paralela.

__Nota:__ que pode ser um número tão alto quanto `100`, quando os testes estão sendo realizados em alguns fornecedores externos, como máquinas do Sauce Labs. Lá, os testes não são testados em uma única máquina, mas sim em várias VMs. Se os testes serão executados em uma máquina de desenvolvimento local, use um número mais razoável, como `3`, `4` ou `5`. Essencialmente, este é o número de navegadores que serão iniciados simultaneamente e executando seus testes ao mesmo tempo, portanto, depende da quantidade de RAM que existe em sua máquina e quantos outros aplicativos estão sendo executados em sua máquina.

Você também pode aplicar `maxInstances` dentro de seus objetos de capacidade usando a capacidade `wdio:maxInstances`. Isso limitará a quantidade de sessões paralelas para essa capacidade específica.

Tipo: `Number`<br />
Padrão: `100`

### maxInstancesPerCapability

Número máximo de trabalhadores em execução paralela por capacidade.

Tipo: `Number`<br />
Padrão: `100`

### injectGlobals

Insere os globais do WebdriverIO (por exemplo, `browser`, `$` e `$$`) no ambiente global.
Se você definir como `false`, deverá importar de `@wdio/globals`, por exemplo:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Nota: O WebdriverIO não lida com a injeção de globais específicos do framework de teste.

Tipo: `Boolean`<br />
Padrão: `true`

### bail

Se você quiser que sua execução de teste pare após um número específico de falhas de teste, use `bail`.
(O padrão é `0`, que executa todos os testes, não importa o quê.) **Nota:** Um teste neste contexto são todos os testes dentro de um único arquivo de especificação (ao usar Mocha ou Jasmine) ou todas as etapas dentro de um arquivo de recurso (ao usar Cucumber). Se você quiser controlar o comportamento de bail dentro dos testes de um único arquivo de teste, dê uma olhada nas opções de [framework](frameworks) disponíveis.

Tipo: `Number`<br />
Padrão: `0` (não interromper; executar todos os testes)

### specFileRetries

O número de vezes para tentar novamente um arquivo de especificação inteiro quando ele falha como um todo.

Tipo: `Number`<br />
Padrão: `0`

### specFileRetriesDelay

Atraso em segundos entre as tentativas de repetição do arquivo de especificação

Tipo: `Number`<br />
Padrão: `0`

### specFileRetriesDeferred

Se os arquivos de especificação repetidos devem ser repetidos imediatamente ou adiados para o final da fila.

Tipo: `Boolean`<br />
Padrão: `true`

### groupLogsByTestSpec

Escolha a visualização de saída do log.

Se definido como `false`, os logs de diferentes arquivos de teste serão impressos em tempo real. Observe que isso pode resultar na mistura de saídas de log de diferentes arquivos ao executar em paralelo.

Se definido como `true`, as saídas de log serão agrupadas por Especificação de Teste e impressas somente quando a Especificação de Teste for concluída.

Por padrão, é definido como `false` para que os logs sejam impressos em tempo real.

Tipo: `Boolean`<br />
Padrão: `false`

### services

Os serviços assumem um trabalho específico que você não quer cuidar. Eles aprimoram sua configuração de teste com quase nenhum esforço.

Tipo: `String[]|Object[]`<br />
Padrão: `[]`

### framework

Define o framework de teste a ser usado pelo testrunner WDIO.

Tipo: `String`<br />
Padrão: `mocha`<br />
Opções: `mocha` | `jasmine`

### mochaOpts, jasmineOpts e cucumberOpts

Opções específicas relacionadas ao framework. Consulte a documentação do adaptador do framework sobre quais opções estão disponíveis. Leia mais sobre isso em [Frameworks](frameworks).

Tipo: `Object`<br />
Padrão: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

Lista de recursos do cucumber com números de linha (ao [usar o framework cucumber](./Frameworks.md#using-cucumber)).

Tipo: `String[]`
Padrão: `[]`

### reporters

Lista de repórteres a serem usados. Um repórter pode ser uma string ou uma matriz de
`['reporterName', { /* reporter options */}]` onde o primeiro elemento é uma string com o nome do repórter e o segundo elemento é um objeto com opções do repórter.

Tipo: `String[]|Object[]`<br />
Padrão: `[]`

Exemplo:

```js
reporters: [
    'dot',
    'spec'
    ['junit', {
        outputDir: `${__dirname}/reports`,
        otherOption: 'foobar'
    }]
]
```

### reporterSyncInterval

Determina em qual intervalo o repórter deve verificar se eles estão sincronizados se relatarem seus logs de forma assíncrona (por exemplo, se os logs forem transmitidos para um fornecedor terceirizado).

Tipo: `Number`<br />
Padrão: `100` (ms)

### reporterSyncTimeout

Determina o tempo máximo que os repórteres têm para concluir o upload de todos os seus logs até que um erro seja lançado pelo testrunner.

Tipo: `Number`<br />
Padrão: `5000` (ms)

### execArgv

Argumentos do Node para especificar ao iniciar processos filho.

Tipo: `String[]`<br />
Padrão: `null`

### filesToWatch

Uma lista de padrões de string com suporte a glob que informam ao testrunner para observar outros arquivos, por exemplo, arquivos de aplicativos, ao executá-lo com a flag `--watch`. Por padrão, o testrunner já observa todos os arquivos de especificação.

Tipo: `String[]`<br />
Padrão: `[]`

### updateSnapshots

Defina como true se você quiser atualizar seus snapshots. Idealmente usado como parte de um parâmetro CLI, por exemplo, `wdio run wdio.conf.js --s`.

Tipo: `'new' | 'all' | 'none'`<br />
Padrão: `none` se não fornecido e os testes são executados no CI, `new` se não fornecido, caso contrário o que foi fornecido

### resolveSnapshotPath

Substitui o caminho padrão do snapshot. Por exemplo, para armazenar snapshots ao lado dos arquivos de teste.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

Tipo: `(testPath: string, snapExtension: string) => string`<br />
Padrão: armazena arquivos de snapshot no diretório `__snapshots__` ao lado do arquivo de teste

### tsConfigPath

WDIO usa `tsx` para compilar arquivos TypeScript. Seu TSConfig é automaticamente detectado a partir do diretório de trabalho atual, mas você pode especificar um caminho personalizado aqui ou definindo a variável de ambiente TSX_TSCONFIG_PATH.

Veja a documentação do `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

Tipo: `String`<br />
Padrão: `null`<br />

## Hooks

O testrunner WDIO permite que você defina hooks para serem acionados em momentos específicos do ciclo de vida do teste. Isso permite ações personalizadas (por exemplo, tirar uma captura de tela se um teste falhar).

Cada hook tem como parâmetro informações específicas sobre o ciclo de vida (por exemplo, informações sobre a suíte de testes ou teste). Leia mais sobre todas as propriedades do hook em [nossa configuração de exemplo](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Nota:** Alguns hooks (`onPrepare`, `onWorkerStart`, `onWorkerEnd` e `onComplete`) são executados em um processo diferente e, portanto, não podem compartilhar dados globais com os outros hooks que vivem no processo do trabalhador.

### onPrepare

É executado uma vez antes de todos os trabalhadores serem iniciados.

Parâmetros:

- `config` (`object`): objeto de configuração WebdriverIO
- `param` (`object[]`): lista de detalhes de capacidades

### onWorkerStart

É executado antes que um processo de trabalhador seja gerado e pode ser usado para inicializar serviços específicos para esse trabalhador, bem como modificar ambientes de tempo de execução de forma assíncrona.

Parâmetros:

- `cid` (`string`): id da capacidade (por exemplo, 0-0)
- `caps` (`object`): contendo capacidades para a sessão que será gerada no trabalhador
- `specs` (`string[]`): especificações a serem executadas no processo de trabalhador
- `args` (`object`): objeto que será mesclado com a configuração principal quando o trabalhador for inicializado
- `execArgv` (`string[]`): lista de argumentos de string passados para o processo de trabalhador

### onWorkerEnd

É executado logo após um processo de trabalhador ter sido encerrado.

Parâmetros:

- `cid` (`string`): id da capacidade (por exemplo, 0-0)
- `exitCode` (`number`): 0 - sucesso, 1 - falha
- `specs` (`string[]`): especificações a serem executadas no processo de trabalhador
- `retries` (`number`): número de tentativas de nível de especificação usadas conforme definido em [_"Adicionar tentativas com base em arquivos de especificação"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

É executado logo antes de inicializar a sessão webdriver e o framework de teste. Permite manipular configurações dependendo da capacidade ou especificação.

Parâmetros:

- `config` (`object`): objeto de configuração WebdriverIO
- `caps` (`object`): contendo capacidades para a sessão que será gerada no trabalhador
- `specs` (`string[]`): especificações a serem executadas no processo de trabalhador

### before

É executado antes do início da execução do teste. Neste ponto, você pode acessar todas as variáveis globais como `browser`. É o lugar perfeito para definir comandos personalizados.

Parâmetros:

- `caps` (`object`): contendo capacidades para a sessão que será gerada no trabalhador
- `specs` (`string[]`): especificações a serem executadas no processo de trabalhador
- `browser` (`object`): instância da sessão de navegador/dispositivo criada

### beforeSuite

Hook que é executado antes do início da suíte (apenas em Mocha/Jasmine)

Parâmetros:

- `suite` (`object`): detalhes da suíte

### beforeHook

Hook que é executado *antes* de um hook dentro da suíte começar (por exemplo, é executado antes de chamar beforeEach no Mocha)

Parâmetros:

- `test` (`object`): detalhes do teste
- `context` (`object`): contexto do teste (representa o objeto World no Cucumber)

### afterHook

Hook que é executado *depois* que um hook dentro da suíte termina (por exemplo, é executado depois de chamar afterEach no Mocha)

Parâmetros:

- `test` (`object`): detalhes do teste
- `context` (`object`): contexto do teste (representa o objeto World no Cucumber)
- `result` (`object`): resultado do hook (contém propriedades `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Função a ser executada antes de um teste (apenas em Mocha/Jasmine).

Parâmetros:

- `test` (`object`): detalhes do teste
- `context` (`object`): objeto de escopo com o qual o teste foi executado

### beforeCommand

Executa antes que um comando WebdriverIO seja executado.

Parâmetros:

- `commandName` (`string`): nome do comando
- `args` (`*`): argumentos que o comando receberia

### afterCommand

Executa depois que um comando WebdriverIO é executado.

Parâmetros:

- `commandName` (`string`): nome do comando
- `args` (`*`): argumentos que o comando receberia
- `result` (`number`): 0 - comando bem-sucedido, 1 - erro de comando
- `error` (`Error`): objeto de erro, se houver

### afterTest

Função a ser executada após um teste (em Mocha/Jasmine) terminar.

Parâmetros:

- `test` (`object`): detalhes do teste
- `context` (`object`): objeto de escopo com o qual o teste foi executado
- `result.error` (`Error`): objeto de erro em caso de falha no teste, caso contrário `undefined`
- `result.result` (`Any`): objeto de retorno da função de teste
- `result.duration` (`Number`): duração do teste
- `result.passed` (`Boolean`): verdadeiro se o teste foi aprovado, caso contrário falso
- `result.retries` (`Object`): informações sobre tentativas relacionadas a testes individuais conforme definido para [Mocha e Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) e também [Cucumber](./Retry.md#rerunning-in-cucumber), por exemplo, `{ attempts: 0, limit: 0 }`, veja
- `result` (`object`): resultado do hook (contém propriedades `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Hook que é executado após o término da suíte (apenas em Mocha/Jasmine)

Parâmetros:

- `suite` (`object`): detalhes da suíte

### after

É executado após a conclusão de todos os testes. Você ainda tem acesso a todas as variáveis globais do teste.

Parâmetros:

- `result` (`number`): 0 - teste passou, 1 - teste falhou
- `caps` (`object`): contendo capacidades para a sessão que será gerada no trabalhador
- `specs` (`string[]`): especificações a serem executadas no processo de trabalhador

### afterSession

É executado logo após o encerramento da sessão webdriver.

Parâmetros:

- `config` (`object`): objeto de configuração WebdriverIO
- `caps` (`object`): contendo capacidades para a sessão que será gerada no trabalhador
- `specs` (`string[]`): especificações a serem executadas no processo de trabalhador

### onComplete

É executado após todos os trabalhadores serem desligados e o processo estiver prestes a sair. Um erro lançado no hook onComplete resultará na falha da execução do teste.

Parâmetros:

- `exitCode` (`number`): 0 - sucesso, 1 - falha
- `config` (`object`): objeto de configuração WebdriverIO
- `caps` (`object`): contendo capacidades para a sessão que será gerada no trabalhador
- `result` (`object`): objeto de resultados contendo resultados de teste

### onReload

É executado quando ocorre uma atualização.

Parâmetros:

- `oldSessionId` (`string`): ID da sessão antiga
- `newSessionId` (`string`): ID da sessão nova

### beforeFeature

Executa antes de um Recurso Cucumber.

Parâmetros:

- `uri` (`string`): caminho para o arquivo de recurso
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): objeto de recurso Cucumber

### afterFeature

Executa após um Recurso Cucumber.

Parâmetros:

- `uri` (`string`): caminho para o arquivo de recurso
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): objeto de recurso Cucumber

### beforeScenario

Executa antes de um Cenário Cucumber.

Parâmetros:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): objeto world contendo informações sobre pickle e etapa de teste
- `context` (`object`): objeto World do Cucumber

### afterScenario

Executa após um Cenário Cucumber.

Parâmetros:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): objeto world contendo informações sobre pickle e etapa de teste
- `result` (`object`): objeto de resultados contendo os resultados do cenário
- `result.passed` (`boolean`): verdadeiro se o cenário foi aprovado
- `result.error` (`string`): pilha de erros se o cenário falhou
- `result.duration` (`number`): duração do cenário em milissegundos
- `context` (`object`): objeto World do Cucumber

### beforeStep

Executa antes de uma Etapa Cucumber.

Parâmetros:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): objeto de etapa Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): objeto de cenário Cucumber
- `context` (`object`): objeto World do Cucumber

### afterStep

Executa após uma Etapa Cucumber.

Parâmetros:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): objeto de etapa Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): objeto de cenário Cucumber
- `result`: (`object`): objeto de resultados contendo resultados da etapa
- `result.passed` (`boolean`): verdadeiro se o cenário foi aprovado
- `result.error` (`string`): pilha de erros se o cenário falhou
- `result.duration` (`number`): duração do cenário em milissegundos
- `context` (`object`): objeto World do Cucumber

### beforeAssertion

Hook que é executado antes de uma asserção WebdriverIO acontecer.

Parâmetros:

- `params`: informações de asserção
- `params.matcherName` (`string`): nome do matcher (por exemplo, `toHaveTitle`)
- `params.expectedValue`: valor que é passado para o matcher
- `params.options`: opções de asserção

### afterAssertion

Hook que é executado após uma asserção WebdriverIO acontecer.

Parâmetros:

- `params`: informações de asserção
- `params.matcherName` (`string`): nome do matcher (por exemplo, `toHaveTitle`)
- `params.expectedValue`: valor que é passado para o matcher
- `params.options`: opções de asserção
- `params.result`: resultados da asserção
