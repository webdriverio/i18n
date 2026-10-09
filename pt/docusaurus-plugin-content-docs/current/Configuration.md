---
id: configuration
title: Configuração
description: "Consulte todas as opções de configuração para o WebDriver, o WebdriverIO standalone e o testrunner WDIO, incluindo todos os hooks do testrunner."
---

Com base no [tipo de configuração](/docs/setuptypes) (por exemplo, usando os bindings de protocolo brutos, o WebdriverIO como pacote standalone ou o testrunner WDIO), há um conjunto diferente de opções disponíveis para controlar o ambiente.

## Opções do WebDriver

As seguintes opções são definidas ao usar o pacote de protocolo [`webdriver`](https://www.npmjs.com/package/webdriver):

### protocol

<Option type="String" default="http">

Protocolo a ser usado na comunicação com o servidor do driver.

</Option>

### hostname

<Option type="String" default="0.0.0.0">

Host do seu servidor do driver.

</Option>

### port

<Option type="Number" default="undefined">

Porta em que o seu servidor do driver está.

</Option>

### path

<Option type="String" default="/">

Caminho para o endpoint do servidor do driver.

</Option>

### queryParams

<Option type="Object" default="undefined">

Parâmetros de consulta que são propagados para o servidor do driver.

</Option>

### user

<Option type="String" default="undefined">

Seu nome de usuário do serviço em nuvem (funciona apenas para contas [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) ou [TestMu AI](https://www.testmuai.com/)). Se definido, o WebdriverIO configurará automaticamente as opções de conexão para você. Se você não usa um provedor de nuvem, isso pode ser usado para autenticar qualquer outro backend WebDriver.

</Option>

### key

<Option type="String" default="undefined">

Sua chave de acesso ou chave secreta do serviço em nuvem (funciona apenas para contas [Sauce Labs](https://saucelabs.com), [Browserstack](https://www.browserstack.com), [TestingBot](https://testingbot.com) ou [TestMu AI](https://www.testmuai.com/)). Se definido, o WebdriverIO configurará automaticamente as opções de conexão para você. Se você não usa um provedor de nuvem, isso pode ser usado para autenticar qualquer outro backend WebDriver.

</Option>

### capabilities

<Option type="Object" default="null">

Define as capabilities que você deseja executar na sua sessão WebDriver. Confira o [Protocolo WebDriver](https://w3c.github.io/webdriver/#capabilities) para mais detalhes.

Além das capabilities baseadas no WebDriver, você pode aplicar opções específicas do navegador e do fornecedor que permitem uma configuração mais aprofundada do navegador ou dispositivo remoto. Elas estão documentadas na documentação do respectivo fornecedor, por exemplo:

- `goog:chromeOptions`: para o [Google Chrome](https://chromedriver.chromium.org/capabilities#h.p_ID_106)
- `moz:firefoxOptions`: para o [Mozilla Firefox](https://firefox-source-docs.mozilla.org/testing/geckodriver/Capabilities.html)
- `ms:edgeOptions`: para o [Microsoft Edge](https://docs.microsoft.com/en-us/microsoft-edge/webdriver-chromium/capabilities-edge-options#using-the-edgeoptions-class)
- `sauce:options`: para a [Sauce Labs](https://docs.saucelabs.com/dev/test-configuration-options/#desktop-and-mobile-capabilities-sauce-specific--optional)
- `bstack:options`: para a [BrowserStack](https://www.browserstack.com/automate/capabilities?tag=selenium-4#)
- `selenoid:options`: para o [Selenoid](https://github.com/aerokube/selenoid/blob/master/docs/special-capabilities.adoc)

Além disso, uma ferramenta útil é o [Automated Test Configurator](https://docs.saucelabs.com/basics/platform-configurator/) da Sauce Labs, que ajuda você a criar esse objeto selecionando as capabilities desejadas com cliques.

</Option>
**Exemplo:**

```js
{
    browserName: 'chrome', // opções: `chrome`, `edge`, `firefox`, `safari`
    browserVersion: '27.0', // versão do navegador
    platformName: 'Windows 10' // plataforma do SO
}
```

Se você estiver executando testes web ou nativos em dispositivos móveis, `capabilities` difere do protocolo WebDriver. Consulte a [Documentação do Appium](https://appium.io/docs/en/latest/guides/caps/) para mais detalhes.

### logLevel

<Option type="String" default="info" values="trace | debug | info | warn | error | silent">

Nível de verbosidade do log.

</Option>

### outputDir

<Option type="String" default="null">

Diretório para armazenar todos os arquivos de log do testrunner (incluindo logs de reporters e logs do `wdio`). Se não for definido, todos os logs são transmitidos para `stdout`. Como a maioria dos reporters é feita para registrar logs em `stdout`, recomenda-se usar esta opção apenas para reporters específicos em que faz mais sentido enviar o relatório para um arquivo (como o reporter `junit`, por exemplo).

Ao executar no modo standalone, o único log gerado pelo WebdriverIO será o log do `wdio`.

</Option>

### connectionRetryTimeout

<Option type="Number" default="120000">

Timeout para qualquer requisição WebDriver a um driver ou grid.

</Option>

### connectionRetryCount

<Option type="Number" default="3">

Número máximo de novas tentativas de requisição ao servidor Selenium.

</Option>

### bidiResponseTimeout

<Option type="Number" default="180000">

Timeout (em ms) para um comando WebDriver Bidi receber uma resposta do navegador. Aumente esse valor se você executar comandos, por exemplo [`execute`](/docs/api/browser/execute), que legitimamente levam mais tempo do que o padrão para serem resolvidos; caso contrário, o WebdriverIO desiste de esperar antes que o navegador termine.

</Option>

### agent

<Option type="Object" default={`{
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true })
}`}>

Permite que você use um [agent](https://www.npmjs.com/package/got#agent) personalizado` http`/`https`/`http2` para fazer requisições.

</Option>

### headers

<Option type="Object" default={`{}`}>

Especifique `headers` personalizados para serem passados em cada requisição WebDriver. Se o seu Selenium Grid exigir Autenticação Básica, recomendamos passar um header `Authorization` por meio desta opção para autenticar suas requisições WebDriver, por exemplo:

```ts wdio.conf.ts
import { Buffer } from 'buffer';
// Lê o nome de usuário e a senha a partir de variáveis de ambiente
const username = process.env.SELENIUM_GRID_USERNAME;
const password = process.env.SELENIUM_GRID_PASSWORD;

// Combina o nome de usuário e a senha com um separador de dois-pontos
const credentials = `${username}:${password}`;
// Codifica as credenciais usando Base64
const encodedCredentials = Buffer.from(credentials).toString('base64');

export const config: WebdriverIO.Config = {
    // ...
    headers: {
        Authorization: `Basic ${encodedCredentials}`
    }
    // ...
}
```

</Option>

### transformRequest

<Option type="(RequestOptions) => RequestOptions" default="none">

Função que intercepta as [opções de requisição HTTP](https://github.com/sindresorhus/got#options) antes que uma requisição WebDriver seja feita

</Option>

### transformResponse

<Option type="(Response, RequestOptions) => Response" default="none">

Função que intercepta objetos de resposta HTTP após a chegada de uma resposta WebDriver. A função recebe o objeto de resposta original como primeiro argumento e o `RequestOptions` correspondente como segundo argumento.

</Option>

### strictSSL

<Option type="Boolean" default="true">

Define se não é necessário que o certificado SSL seja válido.
Pode ser definido por meio das variáveis de ambiente `STRICT_SSL` ou `strict_ssl`.

</Option>

### enableDirectConnect

<Option type="Boolean" default="true">

Define se o [recurso de conexão direta do Appium](https://appiumpro.com/editions/86-connecting-directly-to-appium-hosts-in-distributed-environments) deve ser habilitado.
Não faz nada se a resposta não tiver as chaves adequadas enquanto a flag estiver habilitada.

</Option>

### cacheDir

<Option type="String" default="process.env.WEBDRIVER_CACHE_DIR || os.tmpdir()">

O caminho para a raiz do diretório de cache. Este diretório é usado para armazenar todos os drivers que são baixados ao tentar iniciar uma sessão.

</Option>

### maskingPatterns

<Option type="String" default="undefined">

Para um registro de logs mais seguro, expressões regulares definidas com `maskingPatterns` podem ocultar informações sensíveis do log.
 - O formato da string é uma expressão regular com ou sem flags (por exemplo, `/.../i`) e separada por vírgulas para múltiplas expressões regulares.
 - Para mais detalhes sobre padrões de mascaramento, consulte a [seção Masking Patterns no README do WDIO Logger](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-logger/README.md#masking-patterns).

</Option>
**Exemplo:**

```js
{
    maskingPatterns: '/--key=([^ ]*)/i,/RESULT (.*)/'
}
```

## WebdriverIO

As seguintes opções (incluindo as listadas acima) podem ser usadas com o WebdriverIO no modo standalone:

### automationProtocol

<Option type="String" default="webdriver">

Define o protocolo que você deseja usar para a automação do navegador. Atualmente, apenas [`webdriver`](https://www.npmjs.com/package/webdriver) é suportado, pois é a principal tecnologia de automação de navegador que o WebdriverIO utiliza.

Se você quiser automatizar o navegador usando uma tecnologia de automação diferente, certifique-se de definir esta propriedade como um caminho que resolva para um módulo que siga a seguinte interface:

```ts
import type { Capabilities } from '@wdio/types';
import type { Client, AttachOptions } from 'webdriver';

export default class YourAutomationLibrary {
    /**
     * Inicia uma sessão de automação e retorna uma [monad](https://github.com/webdriverio/webdriverio/blob/940cd30939864bdbdacb2e94ee6e8ada9b1cc74c/packages/wdio-utils/src/monad.ts) do WebdriverIO
     * com os respectivos comandos de automação. Veja o pacote [webdriver](https://www.npmjs.com/package/webdriver)
     * como implementação de referência
     *
     * @param {Capabilities.RemoteConfig} options opções do WebdriverIO
     * @param {Function} hook que permite modificar o cliente antes de ele ser liberado pela função
     * @param {PropertyDescriptorMap} userPrototype permite que o usuário adicione comandos de protocolo personalizados
     * @param {Function} customCommandWrapper permite modificar a execução do comando
     * @returns uma instância de cliente compatível com o WebdriverIO
     */
    static newSession(
        options: Capabilities.RemoteConfig,
        modifier?: (...args: any[]) => any,
        userPrototype?: PropertyDescriptorMap,
        customCommandWrapper?: (...args: any[]) => any
    ): Promise<Client>;

    /**
     * permite que o usuário se conecte a sessões existentes
     * @optional
     */
    static attachToSession(
        options?: AttachOptions,
        modifier?: (...args: any[]) => any, userPrototype?: {},
        commandWrapper?: (...args: any[]) => any
    ): Client;

    /**
     * Altera o id da sessão da instância e as capabilities do navegador para a nova sessão
     * diretamente no objeto browser passado
     *
     * @optional
     * @param   {object} instance  o objeto que obtemos de uma nova sessão do navegador.
     * @returns {string}           o novo id de sessão do navegador
     */
    static reloadSession(
        instance: Client,
        newCapabilities?: WebdriverIO.Capabilitie
    ): Promise<string>;
}
```

</Option>

### baseUrl

<Option type="String" default="null">

Encurte as chamadas do comando `url` definindo uma URL base.
- Se o seu parâmetro `url` começar com `/`, então a `baseUrl` é adicionada no início (exceto o caminho da `baseUrl`, se houver um).
- Se o seu parâmetro `url` começar sem um esquema ou `/` (como `some/path`), então a `baseUrl` completa é adicionada diretamente no início.

</Option>

### waitforTimeout

<Option type="Number" default="5000">

Timeout padrão para todos os comandos `waitFor*`. (Observe o `f` minúsculo no nome da opção.) Este timeout afeta __apenas__ os comandos que começam com `waitFor*` e seu tempo de espera padrão.

Para aumentar o timeout de um _teste_, consulte a documentação do framework.

</Option>

### waitforInterval

<Option type="Number" default="100">

Intervalo padrão para todos os comandos `waitFor*` verificarem se um estado esperado (por exemplo, visibilidade) foi alterado.

</Option>

### strictSelectors

<Option type="Boolean" default="true">

Faz com que o comando [`$`](/docs/api/browser/$) lance um `StrictSelectorError` quando o seletor fornecido resolver para mais de um elemento, em vez de usar silenciosamente a primeira correspondência. `$$` não é afetado.

Você pode desativar isso para uma única consulta passando `{ strict: false }` como segundo argumento, por exemplo `$('button', { strict: false })`.

Consulte o guia de [Seletores](/docs/selectors#strict-mode) para mais detalhes.

</Option>

### maxSpyCollectedBodySize

<Option type="Number" default="10485760 (10MB)">

Tamanho máximo do corpo da resposta (em bytes) que pode ser retornado ao usar o comando [`mock`](/docs/api/browser/mock). Use `0` para desabilitar a coleta de dados do payload monitorado.

</Option>

### region

<Option type="String" default="us" values="us | eu | us-west-1 | eu-central-1 | us-east-4 | asia-south-2 | staging">

Se estiver executando na Sauce Labs, você pode optar por executar os testes em diferentes data centers.
Use os identificadores curtos de região `us` (padrão, mapeia para `us-west-1`) ou `eu` (mapeia para `eu-central-1`), ou os nomes completos das regiões diretamente.

__Observação:__ Isso só tem efeito se você fornecer as opções `user` e `key` vinculadas à sua conta Sauce Labs.

</Option>
*(apenas para vm e/ou em/simuladores, exceto `us-east-4` e `asia-south-2`, que hospedam apenas dispositivos reais)*

## Opções do Testrunner

As seguintes opções (incluindo as listadas acima) são definidas apenas para executar o WebdriverIO com o testrunner WDIO:

### specs

<Option type="(String | String[])[]" default="[]">

Define as specs para a execução dos testes. Você pode especificar um padrão glob para corresponder a vários arquivos de uma vez ou envolver um glob ou conjunto de caminhos em um array para executá-los em um único processo worker. Todos os caminhos são considerados relativos ao caminho do arquivo de configuração.

</Option>

### exclude

<Option type="String[]" default="[]">

Exclui specs da execução dos testes. Todos os caminhos são considerados relativos ao caminho do arquivo de configuração.

</Option>

### suites

<Option type="Object" default={`{}`}>

Um objeto que descreve várias suítes, que você pode então especificar com a opção `--suite` na CLI do `wdio`.

</Option>

### capabilities

<Option type="Object|Object[]" default={`[{ 'wdio:maxInstances': 5, browserName: 'firefox' }]`}>

O mesmo que a seção `capabilities` descrita acima, exceto com a opção de especificar um objeto [multi-remote](/docs/multiremote) ou várias sessões WebDriver em um array para execução paralela.

Você pode aplicar as mesmas capabilities específicas do fornecedor e do navegador definidas [acima](/docs/configuration#capabilities).

</Option>

### maxInstances

<Option type="Number" default="100">

Número máximo total de workers executando em paralelo.

__Observação:__ pode ser um número tão alto quanto `100` quando os testes estão sendo executados em fornecedores externos, como as máquinas da Sauce Labs. Lá, os testes não são executados em uma única máquina, mas sim em várias VMs. Se os testes forem executados em uma máquina de desenvolvimento local, use um número mais razoável, como `3`, `4` ou `5`. Essencialmente, este é o número de navegadores que serão iniciados simultaneamente e executarão seus testes ao mesmo tempo, então depende de quanta RAM há na sua máquina e de quantos outros aplicativos estão em execução nela.

Você também pode aplicar `maxInstances` dentro dos seus objetos de capability usando a capability `wdio:maxInstances`. Isso limitará a quantidade de sessões paralelas para aquela capability específica.

</Option>

### maxInstancesPerCapability

<Option type="Number" default="100">

Número máximo total de workers executando em paralelo por capability.

</Option>

### injectGlobals

<Option type="Boolean" default="true">

Insere as variáveis globais do WebdriverIO (por exemplo, `browser`, `$` e `$$`) no ambiente global.
Se você definir como `false`, deverá importar de `@wdio/globals`, por exemplo:

```ts
import { browser, $, $$, expect } from '@wdio/globals'
```

Observação: o WebdriverIO não lida com a injeção de variáveis globais específicas do framework de testes.

</Option>

### bail

<Option type="Number" default="0 (don't bail; run all tests)">

Se você quiser que a execução dos testes pare após um número específico de falhas, use `bail`.
(O padrão é `0`, que executa todos os testes independentemente do resultado.) **Observação:** Um teste, neste contexto, corresponde a todos os testes dentro de um único arquivo de spec (ao usar Mocha ou Jasmine) ou a todos os passos dentro de um arquivo de feature (ao usar Cucumber). Se você quiser controlar o comportamento de bail dentro dos testes de um único arquivo de teste, dê uma olhada nas opções de [framework](frameworks) disponíveis.

</Option>

### specFileRetries

<Option type="Number" default="0">

O número de vezes para tentar novamente um arquivo de spec inteiro quando ele falha como um todo.

</Option>

### specFileRetriesDelay

<Option type="Number" default="0">

Atraso em segundos entre as tentativas de reexecução do arquivo de spec

</Option>

### specFileRetriesDeferred

<Option type="Boolean" default="true">

Define se os arquivos de spec reexecutados devem ser tentados novamente imediatamente ou adiados para o final da fila.

</Option>

### groupLogsByTestSpec

<Option type="Boolean" default="false">

Escolha a visualização da saída de logs.

Se definido como `false`, os logs de diferentes arquivos de teste serão impressos em tempo real. Observe que isso pode resultar na mistura de saídas de log de arquivos diferentes ao executar em paralelo.

Se definido como `true`, as saídas de log serão agrupadas por Test Spec e impressas apenas quando o Test Spec for concluído.

Por padrão, é definido como `false`, para que os logs sejam impressos em tempo real.

</Option>

### autoAssertOnTestEnd

<Option type="Boolean" default="true">

Controla se o WebdriverIO verifica automaticamente todas as soft assertions ao final de cada teste. Quando definido como `true`, quaisquer soft assertions acumuladas serão verificadas automaticamente e farão o teste falhar se alguma asserção tiver falhado. Quando definido como `false`, você deve chamar manualmente o método assert para verificar as soft assertions.

</Option>

### services

<Option type="String[]|Object[]" default="[]">

Os serviços assumem uma tarefa específica da qual você não quer cuidar. Eles aprimoram sua configuração de testes quase sem esforço.

</Option>

### framework

<Option type="String" default="mocha" values="mocha | jasmine | cucumber">

Define o framework de testes a ser usado pelo testrunner WDIO.

</Option>

### mochaOpts, jasmineOpts and cucumberOpts

<Option type="Object" default={`{ timeout: 10000 }`}>

Opções específicas relacionadas ao framework. Consulte a documentação do adaptador do framework para saber quais opções estão disponíveis. Leia mais sobre isso em [Frameworks](frameworks).

</Option>

### cucumberFeaturesWithLineNumbers

<Option type="String[]" default="[]">

Lista de features do cucumber com números de linha (ao [usar o framework cucumber](./Frameworks.md#using-cucumber)).

</Option>

### reporters

<Option type="String[]|Object[]" default="[]">

Lista de reporters a serem usados. Um reporter pode ser uma string ou um array de
`['reporterName', { /* reporter options */}]`, em que o primeiro elemento é uma string com o nome do reporter e o segundo elemento é um objeto com as opções do reporter.

</Option>
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

<Option type="Number" default="100 (ms)">

Determina em qual intervalo o reporter deve verificar se está sincronizado, caso registre seus logs de forma assíncrona (por exemplo, se os logs forem transmitidos para um fornecedor terceiro).

</Option>

### reporterSyncTimeout

<Option type="Number" default="5000 (ms)">

Determina o tempo máximo que os reporters têm para terminar de enviar todos os seus logs até que um erro seja lançado pelo testrunner.

</Option>

### execArgv

<Option type="String[]" default="null">

Argumentos do Node a serem especificados ao iniciar processos filhos.

</Option>

### cpuProf

<Option type="Boolean" default="false">

Habilita o profiling de CPU para o processo worker. O perfil será gerado automaticamente quando o processo worker for encerrado.

</Option>

### heapProf

<Option type="Boolean" default="false">

Habilita o profiling de Heap para o processo worker. O snapshot será gerado automaticamente quando o processo worker for encerrado (usa o sampling heap profiler).

</Option>

### profileOutputDir

<Option type="String" default="./profiles">

Diretório onde os perfis de CPU (`.cpuprofile`) e os perfis de Heap (`.heapprofile`) serão salvos.

</Option>

### filesToWatch

<Option type="String[]" default="[]">

Uma lista de padrões de string com suporte a glob que instruem o testrunner a observar adicionalmente outros arquivos, por exemplo, arquivos da aplicação, ao executá-lo com a flag `--watch`. Por padrão, o testrunner já observa todos os arquivos de spec.

</Option>

### updateSnapshots

<Option type="'new' | 'all' | 'none'" default="none if not provided and tests run in CI, new if not provided, otherwise what's been provided">

Defina como true se você quiser atualizar seus snapshots. Idealmente usado como parte de um parâmetro da CLI, por exemplo `wdio run wdio.conf.js --s`.

</Option>

### resolveSnapshotPath

<Option type="(testPath: string, snapExtension: string) => string" default="stores snapshot files in __snapshots__ directory next to test file">

Substitui o caminho padrão dos snapshots. Por exemplo, para armazenar os snapshots ao lado dos arquivos de teste.

```ts title="wdio.conf.ts"
export const config: WebdriverIO.Config = {
    resolveSnapshotPath: (testPath, snapExtension) => testPath + snapExtension,
}
```

</Option>

### tsConfigPath

<Option type="String" default="null">

O WDIO usa o `tsx` para compilar arquivos TypeScript. Seu TSConfig é detectado automaticamente a partir do diretório de trabalho atual, mas você pode especificar um caminho personalizado aqui ou definindo a variável de ambiente TSX_TSCONFIG_PATH.

Consulte a documentação do `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path

</Option>

### displayServerEnabled

<Option type="Boolean" default="true">

Inicia um display virtual para a execução no Linux quando nem `DISPLAY` nem `WAYLAND_DISPLAY` estão definidos. Defina como `false` quando você executar em modo headless ou apenas em um serviço em nuvem ou grid remoto. Isso controla apenas se um servidor de display é iniciado: com apenas `WAYLAND_DISPLAY` definido, o testrunner ainda define `XDG_SESSION_TYPE`, `GDK_BACKEND` e `ELECTRON_OZONE_PLATFORM_HINT` como `wayland` para a execução. Consulte [Headless & Display Servers](/docs/headless-and-display-servers).

</Option>

### displayServer

<Option type="String" default="auto" values="auto | wayland | xvfb">

Qual servidor de display iniciar. `auto` tenta o Weston e recorre ao Xvfb quando o Weston não está presente ou falha ao iniciar. `wayland` e `xvfb` tentam apenas esse servidor.

</Option>

### displayServerAutoInstall

<Option type="Boolean" default="false">

Instala um servidor de display ausente com o gerenciador de pacotes do sistema quando nenhum dos instalados consegue iniciar.

</Option>

### displayServerAutoInstallMode

<Option type="String" default="sudo" values="root | sudo">

Como a instalação integrada é executada: `root` instala apenas quando executado como root; `sudo` usa `sudo -n` não interativo quando não é root, ou instala sem ele quando o `sudo` não está instalado.

</Option>

### displayServerAutoInstallCommand

<Option type="String | String[]">

Um comando a ser executado em vez da instalação integrada, como está e sem `sudo`. Ele só é executado com `displayServerAutoInstall: true`. Uma string é executada em um shell; um array é executado sem shell. Com `auto`, ele é executado primeiro para o Weston e novamente para o Xvfb apenas se o Weston ainda não estiver disponível ou falhar ao iniciar, e o Xvfb ainda estiver ausente. Defina `displayServer` como o servidor que ele instala para pular a tentativa do outro servidor.

</Option>

### displayServerWidth

<Option type="Number" default="1920">

Largura da tela do display virtual em pixels.

</Option>

### displayServerHeight

<Option type="Number" default="1080">

Altura da tela do display virtual em pixels.

</Option>

### displayServerDepth

<Option type="Number" default="24">

Profundidade de cor do display virtual. Apenas Xvfb.

</Option>

## Hooks

O testrunner WDIO permite que você defina hooks a serem disparados em momentos específicos do ciclo de vida dos testes. Isso permite ações personalizadas (por exemplo, tirar uma captura de tela se um teste falhar).

Cada hook recebe como parâmetro informações específicas sobre o ciclo de vida (por exemplo, informações sobre a suíte de testes ou o teste). Leia mais sobre todas as propriedades dos hooks em [nossa configuração de exemplo](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js#L183-L326).

**Observação:** Alguns hooks (`onPrepare`, `onWorkerStart`, `onWorkerEnd` e `onComplete`) são executados em um processo diferente e, portanto, não podem compartilhar nenhum dado global com os outros hooks que residem no processo worker.

### onPrepare

É executado uma vez antes de todos os workers serem iniciados.

Parâmetros:

- `config` (`object`): objeto de configuração do WebdriverIO
- `param` (`object[]`): lista de detalhes das capabilities

### onWorkerStart

É executado antes de um processo worker ser criado e pode ser usado para inicializar um serviço específico para aquele worker, bem como modificar ambientes de execução de forma assíncrona.

Parâmetros:

- `cid` (`string`): id da capability (por exemplo, 0-0)
- `caps` (`object`): contém as capabilities da sessão que será criada no worker
- `specs` (`string[]`): specs a serem executadas no processo worker
- `args` (`object`): objeto que será mesclado com a configuração principal assim que o worker for inicializado
- `execArgv` (`string[]`): lista de argumentos em string passados para o processo worker

### onWorkerEnd

É executado logo após um processo worker ser encerrado.

Parâmetros:

- `cid` (`string`): id da capability (por exemplo, 0-0)
- `exitCode` (`number`): 0 - sucesso, 1 - falha. Um worker que foi encerrado por um sinal informa `128` + o número do sinal, por exemplo `139` para um `SIGSEGV`
- `specs` (`string[]`): specs a serem executadas no processo worker
- `retries` (`number`): número de novas tentativas no nível de spec utilizadas, conforme definido em [_"Adicionar novas tentativas por arquivo de spec"_](./Retry.md#add-retries-on-a-per-specfile-basis)
- `signal` (`string`): sinal que encerrou o worker, por exemplo `SIGSEGV`, ou `null` se ele foi encerrado por conta própria

### beforeSession

É executado logo antes de inicializar a sessão webdriver e o framework de testes. Permite manipular configurações dependendo da capability ou da spec.

Parâmetros:

- `config` (`object`): objeto de configuração do WebdriverIO
- `caps` (`object`): contém as capabilities da sessão que será criada no worker
- `specs` (`string[]`): specs a serem executadas no processo worker

### before

É executado antes do início da execução dos testes. Neste ponto, você pode acessar todas as variáveis globais, como `browser`. É o lugar perfeito para definir comandos personalizados.

Parâmetros:

- `caps` (`object`): contém as capabilities da sessão que será criada no worker
- `specs` (`string[]`): specs a serem executadas no processo worker
- `browser` (`object`): instância da sessão de navegador/dispositivo criada

### beforeSuite

Hook que é executado antes do início da suíte (apenas no Mocha/Jasmine)

Parâmetros:

- `suite` (`object`): detalhes da suíte

### beforeHook

Hook que é executado *antes* do início de um hook dentro da suíte (por exemplo, é executado antes de chamar beforeEach no Mocha)

Parâmetros:

- `test` (`object`): detalhes do teste
- `context` (`object`): contexto do teste (representa o objeto World no Cucumber)

### afterHook

Hook que é executado *após* o término de um hook dentro da suíte (por exemplo, é executado após chamar afterEach no Mocha)

Parâmetros:

- `test` (`object`): detalhes do teste
- `context` (`object`): contexto do teste (representa o objeto World no Cucumber)
- `result` (`object`): resultado do hook (contém as propriedades `error`, `result`, `duration`, `passed`, `retries`)

### beforeTest

Função a ser executada antes de um teste (apenas no Mocha/Jasmine).

Parâmetros:

- `test` (`object`): detalhes do teste
- `context` (`object`): objeto de escopo com o qual o teste foi executado

### beforeCommand

É executado antes de um comando do WebdriverIO ser executado.

Parâmetros:

- `commandName` (`string`): nome do comando
- `args` (`*`): argumentos que o comando receberia

### afterCommand

É executado após um comando do WebdriverIO ser executado.

Parâmetros:

- `commandName` (`string`): nome do comando
- `args` (`*`): argumentos que o comando receberia
- `result` (`*`): resultado do comando
- `error` (`Error`): objeto de erro, se houver

### afterTest

Função a ser executada após o término de um teste (no Mocha/Jasmine).

Parâmetros:

- `test` (`object`): detalhes do teste
- `context` (`object`): objeto de escopo com o qual o teste foi executado
- `result.error` (`Error`): objeto de erro caso o teste falhe, caso contrário `undefined`
- `result.result` (`Any`): objeto de retorno da função de teste
- `result.duration` (`Number`): duração do teste
- `result.passed` (`Boolean`): true se o teste passou, caso contrário false
- `result.retries` (`Object`): informações sobre novas tentativas relacionadas a um único teste, conforme definido para [Mocha e Jasmine](./Retry.md#rerun-single-tests-in-jasmine-or-mocha), bem como para [Cucumber](./Retry.md#rerunning-in-cucumber), por exemplo `{ attempts: 0, limit: 0 }`, veja
- `result` (`object`): resultado do hook (contém as propriedades `error`, `result`, `duration`, `passed`, `retries`)

### afterSuite

Hook que é executado após o término da suíte (apenas no Mocha/Jasmine)

Parâmetros:

- `suite` (`object`): detalhes da suíte

### after

É executado após a conclusão de todos os testes. Você ainda tem acesso a todas as variáveis globais do teste.

Parâmetros:

- `result` (`number`): 0 - teste passou, 1 - teste falhou
- `caps` (`object`): contém as capabilities da sessão que será criada no worker
- `specs` (`string[]`): specs a serem executadas no processo worker

### afterSession

É executado logo após o encerramento da sessão webdriver.

Parâmetros:

- `config` (`object`): objeto de configuração do WebdriverIO
- `caps` (`object`): contém as capabilities da sessão que será criada no worker
- `specs` (`string[]`): specs a serem executadas no processo worker

### onComplete

É executado após todos os workers serem encerrados e o processo estar prestes a terminar. Um erro lançado no hook onComplete fará com que a execução dos testes falhe.

Parâmetros:

- `exitCode` (`number`): 0 - sucesso, 1 - falha
- `config` (`object`): objeto de configuração do WebdriverIO
- `caps` (`object`): contém as capabilities da sessão que será criada no worker
- `result` (`object`): objeto de resultados contendo os resultados dos testes

### onReload

É executado quando ocorre uma atualização.

Parâmetros:

- `oldSessionId` (`string`): ID da sessão antiga
- `newSessionId` (`string`): ID da nova sessão

### beforeFeature

É executado antes de uma Feature do Cucumber.

Parâmetros:

- `uri` (`string`): caminho para o arquivo de feature
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): objeto de feature do Cucumber

### afterFeature

É executado após uma Feature do Cucumber.

Parâmetros:

- `uri` (`string`): caminho para o arquivo de feature
- `feature` ([`GherkinDocument.IFeature`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/json-to-messages/javascript/src/cucumber-generic/JSONSchema.ts#L8-L17)): objeto de feature do Cucumber

### beforeScenario

É executado antes de um Scenario do Cucumber.

Parâmetros:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): objeto world contendo informações sobre o pickle e o passo de teste
- `context` (`object`): objeto World do Cucumber

### afterScenario

É executado após um Scenario do Cucumber.

Parâmetros:

- `world` ([`ITestCaseHookParameter`](https://github.com/cucumber/cucumber-js/blob/ac124f7b2be5fa54d904c7feac077a2657b19440/src/support_code_library_builder/types.ts#L10-L15)): objeto world contendo informações sobre o pickle e o passo de teste
- `result` (`object`): objeto de resultados contendo os resultados do cenário
- `result.passed` (`boolean`): true se o cenário passou
- `result.error` (`string`): stack de erro se o cenário falhou
- `result.duration` (`number`): duração do cenário em milissegundos
- `context` (`object`): objeto World do Cucumber

### beforeStep

É executado antes de um Step do Cucumber.

Parâmetros:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): objeto de step do Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): objeto de cenário do Cucumber
- `context` (`object`): objeto World do Cucumber

### afterStep

É executado após um Step do Cucumber.

Parâmetros:

- `step` ([`Pickle.IPickleStep`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L20-L49)): objeto de step do Cucumber
- `scenario` ([`IPickle`](https://github.com/cucumber/common/blob/b94ce625967581de78d0fc32d84c35b46aa5a075/messages/jsonschema/Pickle.json#L137-L175)): objeto de cenário do Cucumber
- `result`: (`object`): objeto de resultados contendo os resultados do step
- `result.passed` (`boolean`): true se o cenário passou
- `result.error` (`string`): stack de erro se o cenário falhou
- `result.duration` (`number`): duração do cenário em milissegundos
- `context` (`object`): objeto World do Cucumber

### beforeAssertion

Hook que é executado antes de uma asserção do WebdriverIO acontecer.

Parâmetros:

- `params`: informações da asserção
- `params.matcherName` (`string`): nome do matcher que o teste chamou (por exemplo, `toHaveTitle`). Para um alias, é o nome do alias (por exemplo, `toBeExisting`, e não `toExist`).
- `params.expectedValue`: valor que é passado para o matcher
- `params.options`: opções da asserção

### afterAssertion

Hook que é executado após uma asserção do WebdriverIO ter acontecido.

Parâmetros:

- `params`: informações da asserção
- `params.matcherName` (`string`): nome do matcher que o teste chamou (por exemplo, `toHaveTitle`). Para um alias, é o nome do alias (por exemplo, `toBeExisting`, e não `toExist`).
- `params.expectedValue`: valor que é passado para o matcher
- `params.options`: opções da asserção
- `params.result` (`object`): resultado do matcher, com `pass` (`boolean`) e `message()`. `pass` é `true` quando o valor corresponde ao valor esperado, também com `.not`: com `.not`, a asserção passa quando `pass` é `false`.