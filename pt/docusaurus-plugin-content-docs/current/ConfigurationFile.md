---
id: configurationfile
title: Arquivo de Configuração
description: "Navegue por um exemplo comentado de wdio.conf.js que lista todas as opções, capabilities e hooks suportados pelo testrunner, com explicações."
---

O arquivo de configuração contém todas as informações necessárias para executar sua suíte de testes. É um módulo NodeJS que exporta um JSON.

Aqui está um exemplo de configuração com todas as propriedades suportadas e informações adicionais:

```js
export const config = {

    // ==================================
    // Onde seu teste deve ser iniciado
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // Configurações do Servidor
    // =====================
    // Endereço do host do servidor Selenium em execução. Esta informação geralmente é obsoleta, pois
    // o WebdriverIO se conecta automaticamente ao localhost. Além disso, se você estiver usando um dos
    // serviços em nuvem suportados, como Sauce Labs, Browserstack, Testing Bot ou TestMu AI (anteriormente LambdaTest), você também não
    // precisa definir informações de host e porta (porque o WebdriverIO consegue descobri-las
    // a partir das suas informações de usuário e chave). No entanto, se você estiver usando um backend
    // Selenium privado, deve definir `hostname`, `port` e `path` aqui.
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // Protocolo: http | https
    // protocol: 'http',
    //
    // =================
    // Provedores de Serviço
    // =================
    // O WebdriverIO suporta Sauce Labs, Browserstack, Testing Bot e TestMu AI (anteriormente LambdaTest). (Outros provedores de nuvem
    // também devem funcionar.) Esses serviços definem valores específicos de `user` e `key` (ou chave de acesso)
    // que você deve colocar aqui para se conectar a esses serviços.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Se você executar seus testes no Sauce Labs, pode especificar a região onde deseja executar seus testes
    // por meio da propriedade `region`. Os identificadores curtos disponíveis para regiões são `us` (padrão) e `eu`.
    // Essas regiões são usadas para a nuvem de VMs do Sauce Labs e para a Sauce Labs Real Device Cloud.
    // Se você não fornecer a região, o padrão será `us`.
    region: 'us',
    //
    // O Sauce Labs oferece uma [solução headless](https://saucelabs.com/products/web-testing/sauce-headless-testing)
    // que permite executar testes no Chrome e Firefox em modo headless.
    //
    headless: false,
    //
    // ==================
    // Especificar Arquivos de Teste
    // ==================
    // Defina quais specs de teste devem ser executados. O padrão é relativo ao diretório
    // do arquivo de configuração que está sendo executado.
    //
    // Os specs são definidos como um array de arquivos de spec (opcionalmente usando curingas
    // que serão expandidos). O teste de cada arquivo de spec será executado em um processo
    // worker separado. Para que um grupo de arquivos de spec seja executado no mesmo processo
    // worker, coloque-os em um array dentro do array de specs.
    //
    // O caminho dos arquivos de spec será resolvido em relação ao diretório
    // do arquivo de configuração, a menos que seja absoluto.
    //
    specs: [
        'test/spec/**',
        ['group/spec/**']
    ],
    // Padrões a serem excluídos.
    exclude: [
        'test/spec/multibrowser/**',
        'test/spec/mobile/**'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Defina suas capabilities aqui. O WebdriverIO pode executar várias capabilities ao mesmo
    // tempo. Dependendo do número de capabilities, o WebdriverIO inicia várias sessões
    // de teste. Dentro das suas `capabilities`, você pode sobrescrever quais arquivos são executados com
    // `wdio:specs` e `wdio:exclude` para agrupar specs específicos em uma capability específica.
    //
    // Primeiro, você pode definir quantas instâncias devem ser iniciadas ao mesmo tempo. Digamos
    // que você tenha 3 capabilities diferentes (Chrome, Firefox e Safari) e tenha
    // definido `maxInstances` como 1. O wdio criará 3 processos.
    //
    // Portanto, se você tiver 10 arquivos de spec e definir `maxInstances` como 10, todos os arquivos de spec
    // serão testados ao mesmo tempo e 30 processos serão criados.
    //
    // A propriedade controla quantas capabilities do mesmo teste devem executar testes.
    //
    maxInstances: 10,
    //
    // Ou defina um limite para executar testes com uma capability específica.
    maxInstancesPerCapability: 10,
    //
    // Insere os globais do WebdriverIO (por exemplo, `browser`, `$` e `$$`) no ambiente global.
    // Se você definir como `false`, deve importá-los de `@wdio/globals`. Observação: o WebdriverIO não
    // lida com a injeção de globais específicos do framework de teste.
    //
    injectGlobals: true,
    //
    // Se você tiver dificuldades para reunir todas as capabilities importantes, confira o
    // configurador de plataforma do Sauce Labs - uma ótima ferramenta para configurar suas capabilities:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // para executar o chrome em modo headless, as seguintes flags são necessárias
        // (veja https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // Parâmetro para ignorar algumas ou todas as flags padrão
        // - se o valor for true: ignora todas as 'flags padrão' do DevTools e os 'argumentos padrão' do Puppeteer
        // - se o valor for um array: o DevTools filtra os argumentos padrão fornecidos
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstances pode ser sobrescrito por capability. Assim, se você tiver um grid Selenium
        // interno com apenas 5 instâncias do firefox disponíveis, pode garantir que no máximo
        // 5 instâncias sejam iniciadas ao mesmo tempo.
        'wdio:maxInstances': 5,
        browserName: 'firefox',
        'wdio:specs': [
            'test/ffOnly/*'
        ],
        'moz:firefoxOptions': {
          // flag para ativar o modo headless do Firefox (veja https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities para mais detalhes sobre moz:firefoxOptions)
          // args: ['-headless']
        },
        // Se outputDir for fornecido, o WebdriverIO pode capturar os logs da sessão do driver
        // é possível configurar quais logTypes devem ser excluídos.
        // excludeDriverLogs: ['*'], // passe '*' para excluir todos os logs da sessão do driver
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // Parâmetro para ignorar alguns ou todos os argumentos padrão do Puppeteer
        // ignoreDefaultArgs: ['-foreground'], // defina o valor como true para ignorar todos os argumentos padrão
    }],
    //
    // Lista adicional de argumentos do node a serem usados ao iniciar processos filhos
    execArgv: [],
    //
    // ===================
    // Configurações de Teste
    // ===================
    // Defina aqui todas as opções relevantes para a instância do WebdriverIO
    //
    // Nível de verbosidade do log: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Defina níveis de log específicos por logger
    // use o nível 'silent' para desativar o logger
    logLevels: {
        webdriver: 'info',
        '@wdio/appium-service': 'info'
    },
    //
    // Defina o diretório onde todos os logs serão armazenados
    outputDir: __dirname,
    //
    // Se você quiser executar seus testes apenas até que uma quantidade específica de testes tenha falhado, use
    // bail (o padrão é 0 - não interrompe, executa todos os testes).
    bail: 0,
    //
    // Defina uma URL base para encurtar as chamadas do comando `url()`. Se o seu parâmetro `url` começar
    // com `/`, a `baseUrl` é adicionada no início, sem incluir a parte do caminho da `baseUrl`.
    //
    // Se o seu parâmetro `url` começar sem um esquema ou `/` (como `some/path`), a `baseUrl`
    // é adicionada diretamente no início.
    baseUrl: 'http://localhost:8080',
    //
    // Timeout padrão para todos os comandos waitForXXX.
    waitforTimeout: 1000,
    //
    // Adicione arquivos a serem observados (por exemplo, código da aplicação ou page objects) ao executar o comando `wdio`
    // com a flag `--watch`. Globbing é suportado.
    filesToWatch: [
        // por exemplo, reexecutar os testes se eu alterar o código da minha aplicação
        // './app/**/*.js'
    ],
    //
    // Framework com o qual você deseja executar seus specs.
    // Os seguintes são suportados: 'mocha', 'jasmine' e 'cucumber'
    // Veja também: https://webdriver.io/docs/frameworks.html
    //
    // Certifique-se de ter o pacote adaptador wdio do framework específico instalado antes de executar qualquer teste.
    framework: 'mocha',
    //
    // O número de vezes para tentar novamente o arquivo de spec inteiro quando ele falha como um todo
    specFileRetries: 1,
    // Atraso em segundos entre as tentativas de reexecução do arquivo de spec
    specFileRetriesDelay: 0,
    // Se os arquivos de spec reexecutados devem ser reexecutados imediatamente ou adiados para o final da fila
    specFileRetriesDeferred: false,
    //
    // Reporter de teste para stdout.
    // O único suportado por padrão é 'dot'
    // Veja também: https://webdriver.io/docs/dot-reporter.html e clique em "Reporters" na coluna da esquerda
    reporters: [
        'dot',
        ['allure', {
            //
            // Se você estiver usando o reporter "allure", deve definir o diretório onde
            // o WebdriverIO deve salvar todos os relatórios do allure.
            outputDir: './'
        }]
    ],
    //
    // Opções a serem passadas para o Mocha.
    // Veja a lista completa em: http://mochajs.org
    mochaOpts: {
        ui: 'bdd'
    },
    //
    // Opções a serem passadas para o Jasmine.
    // Veja também: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-jasmine-framework#jasmineopts-options
    jasmineOpts: {
        //
        // Timeout padrão do Jasmine
        defaultTimeoutInterval: 5000,
        //
        // O framework Jasmine permite interceptar cada asserção para registrar o estado da aplicação
        // ou do site dependendo do resultado. Por exemplo, é bastante útil tirar uma captura de tela toda vez
        // que uma asserção falha.
        expectationResultHandler: function(passed, assertion) {
            // faça algo
        },
        //
        // Utilize a funcionalidade de grep específica do Jasmine
        grep: null,
        invertGrep: null
    },
    //
    // Se você estiver usando o Cucumber, precisa especificar onde suas definições de steps estão localizadas.
    // Veja também: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (arquivo/dir) carrega arquivos antes de executar as features
        backtrace: false,   // <boolean> mostra o backtrace completo para erros
        compiler: [],       // <string[]> ("extension:module") carrega arquivos com a EXTENSION fornecida após carregar o MODULE (repetível)
        dryRun: false,      // <boolean> invoca os formatadores sem executar os steps
        failFast: false,    // <boolean> aborta a execução na primeira falha
        snippets: true,     // <boolean> oculta snippets de definição de steps para steps pendentes
        source: true,       // <boolean> oculta URIs de origem
        strict: false,      // <boolean> falha se houver steps indefinidos ou pendentes
        tags: '',           // <string> (expressão) executa apenas as features ou cenários com tags que correspondam à expressão
        timeout: 20000,     // <number> timeout para definições de steps
        ignoreUndefinedDefinitions: false, // <boolean> Ative esta configuração para tratar definições indefinidas como avisos.
        scenarioLevelReporter: false // Ative isto para fazer o webdriver.io se comportar como se os cenários, e não os steps, fossem os testes.
    },
    // Especifique um caminho personalizado para o tsconfig - o WDIO usa `tsx` para compilar arquivos TypeScript
    // Seu TSConfig é detectado automaticamente a partir do diretório de trabalho atual,
    // mas você pode especificar um caminho personalizado aqui ou definindo a variável de ambiente TSX_TSCONFIG_PATH
    // Veja a documentação do `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // Observação: esta configuração será sobrescrita pela variável de ambiente TSX_TSCONFIG_PATH e/ou pelo argumento --tsConfigPath da cli, se forem especificados.
    // Esta configuração será ignorada se o node não conseguir interpretar seu arquivo wdio.conf.ts sem a ajuda do tsx, por exemplo, se você tiver
    // aliases de caminho configurados no tsconfig.json e usar esses aliases de caminho dentro do seu arquivo wdio.config.ts.
    // Use isto apenas se você estiver usando um arquivo de configuração .js ou se o seu arquivo de configuração .ts for JavaScript válido.
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // Hooks
    // =====
    // O WebdriverIO fornece vários hooks que você pode usar para interferir no processo de teste a fim de aprimorá-lo
    // e construir serviços em torno dele. Você pode aplicar uma única função ou um array de
    // métodos. Se um deles retornar uma promise, o WebdriverIO aguardará até que essa promise seja
    // resolvida para continuar.
    //
    /**
     * É executado uma vez antes de todos os workers serem iniciados.
     * @param {object} config objeto de configuração do wdio
     * @param {Array.<Object>} capabilities lista de detalhes das capabilities
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * É executado antes de um processo worker ser criado e pode ser usado para inicializar um serviço específico
     * para esse worker, bem como modificar ambientes de execução de forma assíncrona.
     * @param  {string} cid      id da capability (ex.: 0-0)
     * @param  {object} caps     objeto contendo as capabilities da sessão que será criada no worker
     * @param  {object} specs    specs a serem executados no processo worker
     * @param  {object} args     objeto que será mesclado com a configuração principal assim que o worker for inicializado
     * @param  {object} execArgv lista de argumentos string passados para o processo worker
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * É executado após um processo worker ter sido encerrado.
     * @param  {string} cid      id da capability (ex.: 0-0)
     * @param  {number} exitCode 0 - sucesso, 1 - falha
     * @param  {object} specs    specs a serem executados no processo worker
     * @param  {number} retries  número de tentativas utilizadas
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * É executado antes de inicializar a sessão do webdriver e o framework de teste. Permite
     * manipular configurações dependendo da capability ou do spec.
     * @param {object} config objeto de configuração do wdio
     * @param {Array.<Object>} capabilities lista de detalhes das capabilities
     * @param {Array.<String>} specs Lista de caminhos dos arquivos de spec que serão executados
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * É executado antes do início da execução dos testes. Neste ponto, você pode acessar todas as variáveis
     * globais, como `browser`. É o lugar perfeito para definir comandos personalizados.
     * @param {Array.<Object>} capabilities lista de detalhes das capabilities
     * @param {Array.<String>} specs        Lista de caminhos dos arquivos de spec que serão executados
     * @param {object}         browser      instância da sessão de navegador/dispositivo criada
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * É executado antes do início da suíte (apenas no Mocha/Jasmine).
     * @param {object} suite detalhes da suíte
     */
    beforeSuite: function (suite) {
    },
    /**
     * Este hook é executado _antes_ do início de cada hook dentro da suíte.
     * (Por exemplo, ele é executado antes de chamar `before`, `beforeEach`, `after`, `afterEach` no Mocha.). No Cucumber, `context` é o objeto World.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * Hook que é executado _após_ o término de cada hook dentro da suíte.
     * (Por exemplo, ele é executado após chamar `before`, `beforeEach`, `after`, `afterEach` no Mocha.). No Cucumber, `context` é o objeto World.
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * Função a ser executada antes de um teste (apenas no Mocha/Jasmine)
     * @param {object} test    objeto do teste
     * @param {object} context objeto de escopo com o qual o teste foi executado
     */
    beforeTest: function (test, context) {
    },
    /**
     * É executado antes de um comando do WebdriverIO ser executado.
     * @param {string} commandName nome do comando do hook
     * @param {Array} args argumentos que o comando receberia
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * É executado após um comando do WebdriverIO ser executado
     * @param {string} commandName nome do comando do hook
     * @param {Array} args argumentos que o comando receberia
     * @param {*} result resultado do comando
     * @param {Error} error objeto de erro, se houver
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * Função a ser executada após um teste (apenas no Mocha/Jasmine)
     * @param {object}  test             objeto do teste
     * @param {object}  context          objeto de escopo com o qual o teste foi executado
     * @param {Error}   result.error     objeto de erro caso o teste falhe, caso contrário `undefined`
     * @param {*}       result.result    objeto de retorno da função de teste
     * @param {number}  result.duration  duração do teste
     * @param {boolean} result.passed    true se o teste passou, caso contrário false
     * @param {object}  result.retries   informações sobre as tentativas relacionadas ao spec, ex.: `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * Hook que é executado após o término da suíte (apenas no Mocha/Jasmine).
     * @param {object} suite detalhes da suíte
     */
    afterSuite: function (suite) {
    },
    /**
     * É executado após todos os testes terem sido concluídos. Você ainda tem acesso a todas as variáveis globais
     * do teste.
     * @param {number} result 0 - teste passou, 1 - teste falhou
     * @param {Array.<Object>} capabilities lista de detalhes das capabilities
     * @param {Array.<String>} specs Lista de caminhos dos arquivos de spec que foram executados
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * É executado logo após encerrar a sessão do webdriver.
     * @param {object} config objeto de configuração do wdio
     * @param {Array.<Object>} capabilities lista de detalhes das capabilities
     * @param {Array.<String>} specs Lista de caminhos dos arquivos de spec que foram executados
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * É executado após todos os workers terem sido encerrados e o processo estar prestes a terminar.
     * Um erro lançado no hook `onComplete` fará com que a execução dos testes falhe.
     * @param {object} exitCode 0 - sucesso, 1 - falha
     * @param {object} config objeto de configuração do wdio
     * @param {Array.<Object>} capabilities lista de detalhes das capabilities
     * @param {<Object>} results objeto contendo os resultados dos testes
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * É executado quando ocorre uma atualização (refresh).
    * @param {string} oldSessionId ID da sessão antiga
    * @param {string} newSessionId ID da nova sessão
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * Hooks do Cucumber
     *
     * É executado antes de uma Feature do Cucumber.
     * @param {string}                   uri      caminho para o arquivo da feature
     * @param {GherkinDocument.IFeature} feature  objeto da feature do Cucumber
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * É executado antes de um Cenário do Cucumber.
     * @param {ITestCaseHookParameter} world    objeto world contendo informações sobre o pickle e o step de teste
     * @param {object}                 context  objeto World do Cucumber
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * É executado antes de um Step do Cucumber.
     * @param {Pickle.IPickleStep} step     dados do step
     * @param {IPickle}            scenario pickle do cenário
     * @param {object}             context  objeto World do Cucumber
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * É executado após um Step do Cucumber.
     * @param {Pickle.IPickleStep} step             dados do step
     * @param {IPickle}            scenario         pickle do cenário
     * @param {object}             result           objeto de resultados contendo os resultados do cenário
     * @param {boolean}            result.passed    true se o cenário passou
     * @param {string}             result.error     stack de erro se o cenário falhou
     * @param {number}             result.duration  duração do cenário em milissegundos
     * @param {object}             context          objeto World do Cucumber
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * É executado após um Cenário do Cucumber.
     * @param {ITestCaseHookParameter} world            objeto world contendo informações sobre o pickle e o step de teste
     * @param {object}                 result           objeto de resultados contendo os resultados do cenário `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    true se o cenário passou
     * @param {string}                 result.error     stack de erro se o cenário falhou
     * @param {number}                 result.duration  duração do cenário em milissegundos
     * @param {object}                 context          objeto World do Cucumber
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * É executado após uma Feature do Cucumber.
     * @param {string}                   uri      caminho para o arquivo da feature
     * @param {GherkinDocument.IFeature} feature  objeto da feature do Cucumber
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * É executado antes que a biblioteca de asserções do WebdriverIO faça uma asserção.
     * @param {object} params                 informações da asserção
     * @param {string} params.matcherName     nome do matcher que o teste chamou (para um alias, o nome do alias)
     * @param {*}      params.expectedValue   valor que é passado para o matcher
     * @param {object} params.options         opções da asserção
     */
    beforeAssertion: function (params) {
    },
    /**
     * É executado após a biblioteca de asserções do WebdriverIO fazer uma asserção.
     * @param {object} params                 informações da asserção, as mesmas de `beforeAssertion`
     * @param {object} params.result          resultado do matcher, com `pass` (boolean) e `message()`.
     *                                        `pass` é true quando o valor corresponde, também com `.not`
     */
    afterAssertion: function (params) {
    }
}
```

Você também pode encontrar um arquivo com todas as opções e variações possíveis na [pasta de exemplos](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js).