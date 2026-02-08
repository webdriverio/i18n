---
id: configuration
title: Configuração
---

Com base no [tipo de configuração](/docs/setuptypes) (por exemplo, usando as ligações de protocolo brutas, WebdriverIO como pacote independente ou o testador WDIO), há um conjunto diferente de opções disponíveis para controlar o ambiente.

## Opções do WebDriver

As seguintes opções são definidas ao usar o pacote de protocolo [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

Protocolo a ser usado ao comunicar-se com o servidor do driver.

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

Caminho para o endpoint do servidor de driver.

Tipo: `String`<br />
Padrão: `/`

### queryParams

Parâmetros de consulta que são propagados para o servidor de driver.

Tipo: `Object`<br />
Padrão: `undefined`

### user

Seu nome de usuário do serviço na nuvem (só funciona para contas [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) ou [TestMu AI](https://www.testmuai.com/)). Se definido, o WebdriverIO configurará automaticamente as opções de conexão para você. Se você não usa um provedor de nuvem, isso pode ser usado para autenticar qualquer outro backend WebDriver.

Tipo: `String`<br />
Padrão: `undefined`

### key

Sua chave de acesso ou chave secreta do serviço na nuvem (só funciona para contas [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) ou [TestMu AI](https://www.testmuai.com/)). Se definido, o WebdriverIO configurará automaticamente as opções de conexão para você. Se você não usa um provedor de nuvem, isso pode ser usado para autenticar qualquer outro backend WebDriver.

Tipo: `String`<br />
Padrão: `undefined`

### capabilities

Define as capacidades que você deseja executar em sua sessão WebDriver. Confira o [Protocolo WebDriver](https://w3c.github.io/webdriver/#capabilities) para mais detalhes. Se você executa um driver mais antigo que não suporta o protocolo WebDriver, você precisará usar as [capacidades do JSONWireProtocol](https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities) para executar com sucesso uma sessão.

Além das capacidades baseadas em WebDriver, você pode aplicar opções específicas do navegador e do fornecedor que permitem uma configuração mais profunda no navegador remoto ou dispositivo. Estas são documentadas nos docs correspondentes dos fornecedores, por exemplo:

- `goog:chromeOptions`: para [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: para [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: para [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: para [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: para [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: para [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Além disso, uma utilidade útil é o [Configurador de Teste Automatizado](https://docs.saucelabs.com/basics/platform-configurator/) do Sauce Labs, que ajuda você a criar esse objeto clicando em conjunto suas capacidades desejadas.

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

Se você estiver executando testes web ou nativos em dispositivos móveis, `capabilities` difere do protocolo WebDriver. Veja a [Documentação do Appium](https://appium.io/docs/en/latest/guides/caps/) para mais detalhes.

### logLevel

Nível de detalhamento dos logs.

Tipo: `String`<br />
Padrão: `info`<br />
Opções: `trace` | `debug` | `info` | `warn` | `error` | `silent`

### outputDir

Diretório para armazenar todos os arquivos de log do testrunner (incluindo logs do reporter e logs do `wdio`). Se não definido, todos os logs são transmitidos para o `stdout`. Como a maioria dos reporters é feita para registrar no `stdout`, é recomendável usar essa opção apenas para reporters específicos onde faz mais sentido enviar o relatório para um arquivo (como o reporter `junit`, por exemplo).

Ao executar no modo standalone, o único log gerado pelo WebdriverIO será o log `wdio`.

Tipo: `String`<br />
Padrão: `null`

### connectionRetryTimeout

Tempo limite para qualquer requisição WebDriver a um driver ou grid.

Tipo: `Number`<br />
Padrão: `120000`

### connectionRetryCount

Contagem máxima de tentativas de requisição ao servidor Selenium.

Tipo: `Number`<br />
Padrão: `3`

### agent

Permite usar um agente personalizado `http`/`https`/`http2` [agent](https://www.npmjs.com/package/got#agent) para fazer requisições.

Tipo: `Object`<br />
Padrão:

```js
{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}
```

### headers

Especifica `headers` personalizados para passar em cada requisição WebDriver. Se o seu Grid Selenium exigir Autenticação Básica, recomendamos passar um cabeçalho `Authorization` através desta opção para autenticar suas requisições WebDriver, por exemplo:

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

Função que intercepta [opções de requisição HTTP](https://github.com/sindresorhus/got#options) antes que uma requisição WebDriver seja feita

Tipo: `(RequestOptions) => RequestOptions`<br />
Padrão: *nenhum*

### transformResponse

Função que intercepta objetos de resposta HTTP após a chegada de uma resposta WebDriver. A função recebe o objeto de resposta original como o primeiro argumento e as correspondentes `RequestOptions` como o segundo argumento.

Tipo: `(Response, RequestOptions) => Response`<br />
Padrão: *nenhum*

### strictSSL

Se não é necessário que o certificado SSL seja válido.
Pode ser definido através de variáveis de ambiente como `STRICT_SSL` ou `strict_ssl`.

Tipo: `Boolean`<br />
Padrão: `true`

### enableDirectConnect

Se habilita o [recurso de conexão direta do Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments).
Não faz nada se a resposta não tiver as chaves adequadas enquanto a flag estiver habilitada.

Tipo: `Boolean`<br />
Padrão: `true`

### cacheDir

O caminho para a raiz do diretório de cache. Este diretório é usado para armazenar todos os drivers que são baixados ao tentar iniciar uma sessão.

Tipo: `String`<br />
Padrão: `process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()`

### maskingPatterns

Para logs mais seguros, expressões regulares definidas com `maskingPatterns` podem ofuscar informações sensíveis do log.
 - O formato de string é uma expressão regular com ou sem flags (por exemplo, `/.../i`) e separada por vírgulas para múltiplas expressões regulares.
 - Para mais detalhes sobre padrões de mascaramento, veja a [seção Padrões de Mascaramento no README do WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

Tipo: `String`<br />
Padrão: `undefined`

**Exemplo:**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

---

## WebdriverIO

As seguintes opções (incluindo as listadas acima) podem ser usadas com o WebdriverIO em modo standalone:

### automationProtocol

Define o protocolo que você deseja usar para sua automação de navegador. Atualmente, apenas [`webdriver`](https://www.npmjs.com/package/webdriver) é suportado, pois é a principal tecnologia de automação de navegador que o WebdriverIO usa.

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

Encurta chamadas de comando `url` definindo uma URL base.
- Se o seu parâmetro `url` começar com `/`, então `baseUrl` é adicionado antes (exceto o caminho `baseUrl`, se ele tiver um).
- Se o seu parâmetro `url` começar sem um esquema ou `/` (como `some/path`), então o `baseUrl` completo é adicionado diretamente antes.

Tipo: `String`<br />
Padrão: `null`

### waitforTimeout

Tempo limite padrão para todos os comandos `waitFor*`. (Note o "f" minúsculo no nome da opção.) Este tempo limite __apenas__ afeta comandos que começam com `waitFor*` e seu tempo de espera padrão.

Para aumentar o tempo limite para um _teste_, consulte a documentação do framework.

Tipo: `Number`<br />
Padrão: `5000`

### waitforInterval

Intervalo padrão para todos os comandos `waitFor*` para verificar se um estado esperado (por exemplo, visibilidade) foi alterado.

Tipo: `Number`<br />
Padrão: `100`

### region

Se estiver executando no Sauce Labs, você pode escolher executar testes entre diferentes centros de dados: EUA ou UE.
Para alterar sua região para UE, adicione `region: 'eu'` à sua configuração.

__Nota:__ Isso só tem efeito se você fornecer opções `user` e `key` que estejam conectadas à sua conta Sauce Labs.

Tipo: `String`<br />
Padrão: `us`

*(apenas para vm e ou em/simuladores)*

---

## Opções do Testrunner

As seguintes opções (incluindo as listadas acima) são definidas apenas para executar o WebdriverIO com o testrunner WDIO:

### specs

Define specs para execução de testes. Você pode especificar um padrão glob para corresponder a vários arquivos de uma vez ou agrupar um glob ou conjunto de caminhos em uma matriz para executá-los dentro de um único processo de trabalho. Todos os caminhos são vistos como relativos ao caminho do arquivo de configuração.

Tipo: `(String | String[])[]`<br />
Padrão: `[]`

### exclude

Exclui specs da execução de testes. Todos os caminhos são vistos como relativos ao caminho do arquivo de configuração.

Tipo: `String[]`<br />
Padrão: `[]`

### suites

Um objeto descrevendo várias suítes, que você pode então especificar com a opção `--suite` na CLI `wdio`.

Tipo: `Object`<br />
Padrão: `{}`

### capabilities

O mesmo que a seção `capabilities` descrita acima, exceto com a opção de especificar um objeto [`multiremote`](/docs/multiremote), ou várias sessões WebDriver em uma matriz para execução paralela.

Você pode aplicar as mesmas capacidades específicas do fornecedor e do navegador conforme definido [acima](/docs/configuration#capabilities).

Tipo: `Object`|`Object[]`<br />
Padrão: `[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`

### maxInstances

Número máximo total de trabalhadores paralelos em execução.

__Nota:__ Pode ser um número tão alto quanto `100`, quando os testes estão sendo executados em alguns fornecedores externos, como as máquinas do Sauce Labs. Lá, os testes não são testados em uma única máquina, mas sim em várias VMs. Se os testes devem ser executados em uma máquina de desenvolvimento local, use um número mais razoável, como `3`, `4` ou `5`. Essencialmente, este é o número de navegadores que serão iniciados simultaneamente e executando seus testes ao mesmo tempo, portanto, depende de quanta RAM existe em sua máquina e quantos outros aplicativos estão rodando em sua máquina.

Você também pode aplicar `maxInstances` dentro de seus objetos de capacidade usando a capacidade `wdio:maxInstances`. Isso limitará a quantidade de sessões paralelas para essa capacidade específica.

Tipo: `Number`<br />
Padrão: `100`

### maxInstancesPerCapability

Número máximo total de trabalhadores paralelos em execução por capacidade.

Tipo: `Number`<br />
Padrão: `100`

### injectGlobals

Insere os globais do WebdriverIO (por exemplo, `browser`, `$` e `$$`) no ambiente global.
Se você definir como `false`, deverá importar de `@wdio/globals`, por exemplo:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Nota: WebdriverIO não lida com a injeção de globais específicos do framework de teste.

Tipo: `Boolean`<br />
Padrão: `true`

### bail

Se você quiser que sua execução de teste pare após um número específico de falhas de teste, use `bail`.
(Por padrão é `0`, o que executa todos os testes independentemente do resultado.) **Nota:** Um teste neste contexto são todos os testes dentro de um único arquivo de especificação (quando usando Mocha ou Jasmine) ou todas as etapas dentro de um arquivo de recurso (quando usando Cucumber). Se você deseja controlar o comportamento de bail dentro de testes de um único arquivo de teste, dê uma olhada nas opções disponíveis do [framework](frameworks).

Tipo: `Number`<br />
Padrão: `0` (não interrompe; executa todos os testes)

### specFileRetries

O número de vezes para repetir um arquivo de especificação inteiro quando ele falha como um todo.

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

Escolha a visualização de saída de log.

Se definido como `false`, os logs de diferentes arquivos de teste serão impressos em tempo real. Observe que isso pode resultar na mistura de saídas de log de arquivos diferentes quando executados em paralelo.

Se definido como `true`, as saídas de log serão agrupadas por Spec de Teste e impressas somente quando o Spec de Teste for concluído.

Por padrão, é definido como `false`, então os logs são impressos em tempo real.

Tipo: `Boolean`<br />
Padrão: `false`

### autoAssertOnTestEnd

Controla se o WebdriverIO verifica automaticamente todas as asserções suaves no final de cada teste. Quando definido como `true`, quaisquer asserções suaves acumuladas serão verificadas automaticamente e farão com que o teste falhe se alguma asserção falhar. Quando definido como `false`, você deve chamar manualmente o método assert para verificar as asserções suaves.

Tipo: `Boolean`<br />
Padrão: `true`

### services

Serviços assumem um trabalho específico que você não quer cuidar. Eles aprimoram sua configuração de teste com quase nenhum esforço.

Tipo: `String[]|Object[]`<br />
Padrão: `[]`

### framework

Define o framework de teste a ser usado pelo testrunner WDIO.

Tipo: `String`<br />
Padrão: `mocha`<br />
Opções: `mocha` | `jasmine`

### mochaOpts, jasmineOpts e cucumberOpts

Opções específicas relacionadas ao framework. Veja a documentação do adaptador do framework sobre quais opções estão disponíveis. Leia mais sobre isso em [Frameworks](frameworks).

Tipo: `Object`<br />
Padrão: `{ timeout: 10000 }`

### cucumberFeaturesWithLineNumbers

Lista de recursos do cucumber com números de linha (ao [usar o framework cucumber](./Frameworks.md#using-cucumber)).

Tipo: `String[]`
Padrão: `[]`

### reporters

Lista de reporters a serem usados. Um reporter pode ser uma string ou um array de
`['reporterName', { /* reporter options */}]` onde o primeiro elemento é uma string com o nome do reporter e o segundo elemento é um objeto com opções do reporter.

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

Determina em qual intervalo o reporter deve verificar se eles estão sincronizados se relatarem seus logs de forma assíncrona (por exemplo, se os logs forem transmitidos para um fornecedor terceirizado).

Tipo: `Number`<br />
Padrão: `100` (ms)

### reporterSyncTimeout

Determina o tempo máximo que os reporters têm para terminar de fazer upload de todos os seus logs até que um erro seja lançado pelo testrunner.

Tipo: `Number`<br />
Padrão: `5000` (ms)

### execArgv

Argumentos do Node para especificar ao lançar processos filho.

Tipo: `String[]`<br />
Padrão: `null`

### filesToWatch

Uma lista de padrões de string com suporte a glob que informa ao testrunner para observar outros arquivos adicionalmente, por exemplo, arquivos de aplicativo, ao executá-lo com a flag `--watch`. Por padrão, o testrunner já observa todos os arquivos de especificação.

Tipo: `String[]`<br />
Padrão: `[]`

### updateSnapshots

Defina como true se você quiser atualizar seus snapshots. Idealmente usado como parte de um parâmetro CLI, por exemplo, `wdio run wdio.conf.js --s`.

Tipo: `'new' | 'all' | 'none'`<br />
Padrão: `none` se não fornecido e os testes rodarem em CI, `new` se não fornecido, caso contrário, o que foi fornecido

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

O testrunner WDIO permite definir hooks para serem acionados em momentos específicos do ciclo de vida do teste. Isso permite ações personalizadas (por exemplo, tirar uma captura de tela se um teste falhar).

Cada hook tem como parâmetro informações específicas sobre o ciclo de vida (por exemplo, informações sobre a suite de teste ou teste). Leia mais sobre todas as propriedades do hook em [nossa configuração de exemplo](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Nota:** Alguns hooks (`onPrepare`, `onWorkerStart`, `onWorkerEnd` e `onComplete`) são executados em um processo diferente e, portanto, não podem compartilhar dados globais com os outros hooks que residem no processo de trabalho.

### onPrepare

É executado uma vez antes de todos os trabalhadores serem lançados.

Parâmetros:

- `config` (`object`): objeto de configuração do WebdriverIO
- `param` (`object[]`): lista de detalhes das capacidades

### onWorkerStart

É executado antes de um processo de trabalho ser criado e pode ser usado para inicializar um serviço específico para esse trabalhador, bem como modificar ambientes de execução de forma assíncrona.

Parâmetros:

- `cid` (`string`): id da capacidade (por exemplo, 0-0)
- `caps` (`object`): contendo capacidades para a sessão que será criada no trabalhador
- `specs` (`string[]`): specs a serem executadas no processo de trabalho
- `args` (`object`): objeto que será mesclado com a configuração principal quando o trabalhador for inicializado
- `execArgv` (`string[]`): lista de argumentos de string passados para o processo de trabalho

### onWorkerEnd

É executado logo após um processo de trabalho terminar.

Parâmetros:

- `cid` (`string`): id da capacidade (por exemplo, 0-0)
- `exitCode` (`number`): 0 - sucesso, 1 - falha
- `specs` (`string[]`): specs a serem executadas no processo de trabalho
- `retries` (`number`): número de tentativas de nível de spec usadas conforme definido em [_"Adicionar tentativas com base em arquivo de spec"_](./Retry.md#add-retries-on-a-per-specfile-basis)

### beforeSession

É executado logo antes de inicializar a sessão do webdriver e o framework de teste. Permite manipular configurações dependendo da capacidade ou spec.

Parâmetros:

- `config` (`object`): objeto de configuração do WebdriverIO
- `caps` (`object`): contendo capacidades para a sessão que será criada no trabalhador
- `specs` (`string[]`): specs a serem executadas no processo de trabalho

### before

É executado antes do início da execução do teste. Neste ponto, você pode acessar todas as variáveis globais como `browser`. É o local perfeito para definir comandos personalizados.

Parâmetros:

- `caps` (`object`): contendo capacidades para a sessão que será criada no trabalhador
- `specs` (`string[]`): specs a serem executadas no processo de trabalho
- `browser` (`object`): instância da sessão do navegador/dispositivo criada

### beforeSuite

Hook que é executado antes do início da suite (apenas em Mocha/Jasmine)

Parâmetros:

- `suite` (`object`): detalhes da suite

### beforeHook

Hook que é executado *antes* de um hook dentro da suite iniciar (por exemplo, executa antes de chamar beforeEach no Mocha)

Parâmetros:

- `test` (`object`): detalhes do teste
- `context` (`object`): contexto do teste (representa o objeto World no Cucumber)

### afterHook

Hook que é executado *após* um hook dentro da suite terminar (por exemplo, executa após chamar afterEach no Mocha)

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

Executa antes de um comando WebdriverIO ser executado.

Parâmetros:

- `commandName` (`string`): nome do comando
- `args` (`*`): argumentos que o comando receberia

### afterCommand

Executa após um comando WebdriverIO ser executado.

Parâmetros:

- `commandName` (`string`): nome do comando
- `args` (`*`): argumentos que o comando receberia
- `result` (`*`): resultado do comando
- `error` (`Error`): objeto de erro, se houver

### afterTest

Função a ser executada após um teste (em Mocha/Jasmine) terminar.

Parâmetros:

- `test` (`object`): detalhes do teste
- `context` (`object`): objeto de escopo com o qual o teste foi executado
- `result.error` (`Error`): objeto de erro caso o teste falhe, caso contrário `undefined`
- `result.result` (`Any`): objeto de retorno da função de teste
- `result.duration` (`Number`): duração do teste
- `result.passed` (`Boolean`): verdadeiro se o teste passou, caso contrário falso
- `result.retries` (`Object`): informações sobre tentativas de testes únicos conforme definido para [Mocha e Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) bem como [Cucumber](./Retry.md#rerunning-in-cucumber), por exemplo `{ attempts: 0, limit: 0 }`, veja
- `result` (`object`): resultado do hook (contém propriedades `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Hook que é executado após o término da suite (apenas em Mocha/Jasmine)

Parâmetros:

- `suite` (`object`): detalhes da suite

### after

É executado após todos os testes terminarem. Você ainda tem acesso a todas as variáveis globais do teste.

Parâmetros:

- `result` (`number`): 0 - teste passou, 1 - teste falhou
- `caps` (`object`): contendo capacidades para a sessão que será criada no trabalhador
- `specs` (`string[]`): specs a serem executadas no processo de trabalho

### afterSession

É executado logo após encerrar a sessão do webdriver.

Parâmetros:

- `config` (`object`): objeto de configuração do WebdriverIO
- `caps` (`object`): contendo capacidades para a sessão que será criada no trabalhador
- `specs` (`string[]`): specs a serem executadas no processo de trabalho

### onComplete

É executado após todos os trabalhadores serem encerrados e o processo estiver prestes a terminar. Um erro lançado no hook onComplete resultará na falha da execução do teste.

Parâmetros:

- `exitCode` (`number`): 0 - sucesso, 1 - falha
- `config` (`object`): objeto de configuração do WebdriverIO
- `caps` (`object`): contendo capacidades para a sessão que será criada no trabalhador
- `result` (`object`): objeto de resultados contendo resultados de teste

### onReload

É executado quando ocorre uma atualização.

Parâmetros:

- `oldSessionId` (`string`): ID da sessão antiga
- `newSessionId` (`string`): ID da nova sessão

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
- `context` (`object`): objeto Cucumber World

### afterScenario

Executa após um Cenário Cucumber.

Parâmetros:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): objeto world contendo informações sobre pickle e etapa de teste
- `result` (`object`): objeto de resultados contendo resultados do cenário
- `result.passed` (`boolean`): verdadeiro se o cenário passou
- `result.error` (`string`): stack de erro se o cenário falhou
- `result.duration` (`number`): duração do cenário em milissegundos
- `context` (`object`): objeto Cucumber World

### beforeStep

Executa antes de um Passo Cucumber.

Parâmetros:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): objeto de passo Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): objeto de cenário Cucumber
- `context` (`object`): objeto Cucumber World

### afterStep

Executa após um Passo Cucumber.

Parâmetros:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): objeto de passo Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): objeto de cenário Cucumber
- `result`: (`object`): objeto de resultados contendo resultados do passo
- `result.passed` (`boolean`): verdadeiro se o cenário passou
- `result.error` (`string`): stack de erro se o cenário falhou
- `result.duration` (`number`): duração do cenário em milissegundos
- `context` (`object`): objeto Cucumber World

### beforeAssertion

Hook que é executado antes de uma asserção WebdriverIO ocorrer.

Parâmetros:

- `params`: informações da asserção
- `params.matcherName` (`string`): nome do matcher (por exemplo, `toHaveTitle`)
- `params.expectedValue`: valor passado para o matcher
- `params.options`: opções de asserção

### afterAssertion

Hook que é executado após uma asserção WebdriverIO ocorrer.

Parâmetros:

- `params`: informações da asserção
- `params.matcherName` (`string`): nome do matcher (por exemplo, `toHaveTitle`)
- `params.expectedValue`: valor passado para o matcher
- `params.options`: opções de asserção
- `params.result`: resultados da asserção