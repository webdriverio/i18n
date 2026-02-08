---
id: configurationfile
title: Arquivo de Configuração
---

O arquivo de configuração contém todas as informações necessárias para executar sua suíte de testes. É um módulo NodeJS que exporta um JSON.

Aqui está um exemplo de configuração com todas as propriedades suportadas e informações adicionais:

```js
export const config = {

    // ==================================
    // Onde seus testes devem ser lançados
    // ==================================
    //
    runner: 'local',
    //
    // =====================
    // Configurações do Servidor
    // =====================
    // Endereço do host do servidor Selenium em execução. Esta informação geralmente é obsoleta, pois
    // WebdriverIO se conecta automaticamente ao localhost. Além disso, se você estiver usando um dos
    // serviços em nuvem suportados como Sauce Labs, Browserstack, Testing Bot ou TestMu AI (Anteriormente LambdaTest), você também não
    // precisa definir informações de host e porta (porque o WebdriverIO pode descobrir isso
    // a partir de suas informações de usuário e chave). No entanto, se você estiver usando um backend Selenium
    // privado, você deve definir o `hostname`, `port` e `path` aqui.
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
    // WebdriverIO suporta Sauce Labs, Browserstack, Testing Bot e TestMu AI (Anteriormente LambdaTest). (Outros provedores em nuvem
    // também devem funcionar.) Estes serviços definem valores específicos de `user` e `key` (ou chave de acesso)
    // que você deve colocar aqui, para se conectar a esses serviços.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Se você executa seus testes no Sauce Labs, você pode especificar a região onde deseja executar seus testes
    // através da propriedade `region`. Os identificadores curtos disponíveis para regiões são `us` (padrão) e `eu`.
    // Essas regiões são usadas para o VM cloud do Sauce Labs e para o Sauce Labs Real Device Cloud.
    // Se você não fornecer a região, ela será `us` por padrão.
    region: 'us',
    //
    // Sauce Labs fornece uma [oferta headless](https://saucelabs.com/products/web-testing/sauce-headless-testing)
    // que permite executar testes Chrome e Firefox em modo headless.
    //
    headless: false,
    //
    // ==================
    // Especificar Arquivos de Teste
    // ==================
    // Defina quais especificações de teste devem ser executadas. O padrão é relativo ao diretório
    // do arquivo de configuração sendo executado.
    //
    // As especificações são definidas como um array de arquivos de especificação (opcionalmente usando wildcards
    // que serão expandidos). O teste para cada arquivo de especificação será executado em um processo
    // de trabalho separado. Para ter um grupo de arquivos de especificação executados no mesmo processo
    // de trabalho, inclua-os em um array dentro do array specs.
    //
    // O caminho dos arquivos de especificação será resolvido relativamente ao diretório do
    // arquivo de configuração, a menos que seja absoluto.
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
    // Capacidades
    // ============
    // Defina suas capacidades aqui. WebdriverIO pode executar várias capacidades ao mesmo
    // tempo. Dependendo do número de capacidades, WebdriverIO inicia várias sessões
    // de teste. Dentro de suas `capabilities`, você pode sobrescrever as opções `spec` e `exclude`
    // a fim de agrupar especificações específicas para uma capacidade específica.
    //
    // Primeiro, você pode definir quantas instâncias devem ser iniciadas ao mesmo tempo. Vamos
    // dizer que você tem 3 capacidades diferentes (Chrome, Firefox e Safari) e você tem
    // definido `maxInstances` como 1. wdio irá gerar 3 processos.
    //
    // Portanto, se você tiver 10 arquivos de especificação e definir `maxInstances` como 10, todos os arquivos de especificação
    // serão testados ao mesmo tempo e 30 processos serão gerados.
    //
    // A propriedade controla quantas capacidades do mesmo teste devem executar testes.
    //
    maxInstances: 10,
    //
    // Ou defina um limite para executar testes com uma capacidade específica.
    maxInstancesPerCapability: 10,
    //
    // Insere os globais do WebdriverIO (por exemplo, `browser`, `$` e `$$`) no ambiente global.
    // Se você definir como `false`, deve importar de `@wdio/globals`. Nota: WebdriverIO não
    // lida com a injeção de globais específicos do framework de teste.
    //
    injectGlobals: true,
    //
    // Se você estiver tendo problemas para obter todas as capacidades importantes juntas, confira o
    // configurador de plataforma do Sauce Labs - uma ótima ferramenta para configurar suas capacidades:
    // https://docs.saucelabs.com/basics/platform-configurator
    //
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
        // para executar o chrome headless, as seguintes flags são necessárias
        // (veja https://developers.google.com/web/updates/2017/04/headless-chrome)
        // args: ['--headless', '--disable-gpu'],
        }
        //
        // Parâmetro para ignorar algumas ou todas as flags padrão
        // - se o valor for true: ignora todas as 'flags padrão' do DevTools e 'argumentos padrão' do Puppeteer
        // - se o valor for um array: DevTools filtra os argumentos padrão fornecidos
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstances pode ser sobrescrito por capacidade. Então, se você tiver um Selenium
        // grid interno com apenas 5 instâncias de firefox disponíveis, você pode garantir que não mais do que
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
        // Se outputDir for fornecido, WebdriverIO pode capturar logs de sessão do driver
        // é possível configurar quais logTypes excluir.
        // excludeDriverLogs: ['*'], // passe '*' para excluir todos os logs de sessão do driver
        excludeDriverLogs: ['bugreport', 'server'],
        //
        // Parâmetro para ignorar alguns ou todos os argumentos padrão do Puppeteer
        // ignoreDefaultArgs: ['-foreground'], // defina o valor como true para ignorar todos os argumentos padrão
    }],
    //
    // Lista adicional de argumentos do node para usar ao iniciar processos filhos
    execArgv: [],
    //
    // ===================
    // Configurações de Teste
    // ===================
    // Defina todas as opções relevantes para a instância WebdriverIO aqui
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
    // Defina o diretório para armazenar todos os logs
    outputDir: __dirname,
    //
    // Se você só quiser executar seus testes até que uma quantidade específica de testes falhe, use
    // bail (o padrão é 0 - sem bail, executar todos os testes).
    bail: 0,
    //
    // Defina uma URL base para encurtar chamadas de comando `url()`. Se o seu parâmetro `url` começa
    // com `/`, o `baseUrl` é adicionado, não incluindo a parte do caminho de `baseUrl`.
    //
    // Se o seu parâmetro `url` começa sem um esquema ou `/` (como `some/path`), o `baseUrl`
    // é adicionado diretamente.
    baseUrl: 'http://localhost:8080',
    //
    // Tempo limite padrão para todos os comandos waitForXXX.
    waitforTimeout: 1000,
    //
    // Adicione arquivos para assistir (por exemplo, código da aplicação ou objetos de página) ao executar o comando `wdio`
    // com a flag `--watch`. O globbing é suportado.
    filesToWatch: [
        // por exemplo, executar testes novamente se eu alterar meu código de aplicação
        // './app/**/*.js'
    ],
    //
    // Framework que você deseja usar para executar suas especificações.
    // Os seguintes são suportados: 'mocha', 'jasmine' e 'cucumber'
    // Veja também: https://webdriver.io/docs/frameworks.html
    //
    // Certifique-se de ter o pacote adaptador wdio para o framework específico instalado antes de executar qualquer teste.
    framework: 'mocha',
    //
    // O número de vezes para repetir todo o arquivo de especificação quando ele falha como um todo
    specFileRetries: 1,
    // Atraso em segundos entre as tentativas de repetição do arquivo de especificação
    specFileRetriesDelay: 0,
    // Se os arquivos de especificação repetidos devem ser repetidos imediatamente ou adiados para o final da fila
    specFileRetriesDeferred: false,
    //
    // Reporter de teste para stdout.
    // O único suportado por padrão é 'dot'
    // Veja também: https://webdriver.io/docs/dot-reporter.html, e clique em "Reporters" na coluna esquerda
    reporters: [
        'dot',
        ['allure', {
            //
            // Se você estiver usando o reporter "allure", deve definir o diretório onde
            // WebdriverIO deve salvar todos os relatórios allure.
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
        // Tempo limite padrão do Jasmine
        defaultTimeoutInterval: 5000,
        //
        // O framework Jasmine permite interceptar cada asserção para registrar o estado da aplicação
        // ou site dependendo do resultado. Por exemplo, é bastante útil tirar uma screenshot sempre que
        // uma asserção falha.
        expectationResultHandler: function(passed, assertion) {
            // faça algo
        },
        //
        // Use a funcionalidade grep específica do Jasmine
        grep: null,
        invertGrep: null
    },
    //
    // Se você estiver usando Cucumber, você precisa especificar onde suas definições de etapa estão localizadas.
    // Veja também: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (arquivo/dir) requer arquivos antes de executar features
        backtrace: false,   // <boolean> mostrar backtrace completo para erros
        compiler: [],       // <string[]> ("extensão:módulo") requer arquivos com a EXTENSÃO fornecida após requerer MÓDULO (repetível)
        dryRun: false,      // <boolean> invocar formatadores sem executar etapas
        failFast: false,    // <boolean> abortar a execução no primeiro falha
        snippets: true,     // <boolean> ocultar trechos de definição de etapa para etapas pendentes
        source: true,       // <boolean> ocultar URIs de origem
        strict: false,      // <boolean> falhar se houver etapas indefinidas ou pendentes
        tagExpression: '',  // <string> (expressão) executar apenas as features ou cenários com tags que correspondam à expressão
        timeout: 20000,     // <number> tempo limite para definições de etapa
        ignoreUndefinedDefinitions: false, // <boolean> Ative esta configuração para tratar definições indefinidas como avisos.
        scenarioLevelReporter: false // Ative isso para fazer o webdriver.io se comportar como se cenários e não etapas fossem os testes.
    },
    // Especifique um caminho personalizado de tsconfig - WDIO usa `tsx` para compilar arquivos TypeScript
    // Seu TSConfig é automaticamente detectado no diretório de trabalho atual
    // mas você pode especificar um caminho personalizado aqui ou definindo a variável de ambiente TSX_TSCONFIG_PATH
    // Veja os documentos do `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    //
    // Nota: Esta configuração será sobrescrita pela variável de ambiente TSX_TSCONFIG_PATH e/ou pelo argumento de cli --tsConfigPath se eles forem especificados.
    // Esta configuração será ignorada se o node não conseguir analisar seu arquivo wdio.conf.ts sem ajuda do tsx, por exemplo, se você tiver
    // aliases de caminho configurados no tsconfig.json e você usar esses aliases de caminho dentro do seu arquivo wdio.config.ts.
    // Use isso apenas se estiver usando um arquivo de configuração .js ou se seu arquivo de configuração .ts for JavaScript válido.
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO fornece vários hooks que você pode usar para interferir no processo de teste a fim de aprimorá-lo
    // e construir serviços ao seu redor. Você pode aplicar uma única função a ele ou um array de
    // métodos. Se um deles retornar com uma promessa, WebdriverIO esperará até que essa promessa seja
    // resolvida para continuar.
    //
    /**
     * É executado uma vez antes de todos os workers serem lançados.
     * @param {object} config objeto de configuração wdio
     * @param {Array.<Object>} capabilities lista de detalhes de capacidades
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * É executado antes que um processo worker seja gerado e pode ser usado para inicializar serviços específicos
     * para esse worker, bem como modificar ambientes de tempo de execução de forma assíncrona.
     * @param  {string} cid      id da capacidade (por exemplo, 0-0)
     * @param  {object} caps     objeto contendo capacidades para a sessão que será gerada no worker
     * @param  {object} specs    especificações a serem executadas no processo worker
     * @param  {object} args     objeto que será mesclado com a configuração principal quando o worker for inicializado
     * @param  {object} execArgv lista de argumentos de string passados para o processo worker
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * É executado após um processo worker ter saído.
     * @param  {string} cid      id da capacidade (por exemplo, 0-0)
     * @param  {number} exitCode 0 - sucesso, 1 - falha
     * @param  {object} specs    especificações a serem executadas no processo worker
     * @param  {number} retries  número de tentativas usadas
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * É executado antes de inicializar a sessão do webdriver e o framework de teste. Permite que você
     * manipule configurações dependendo da capacidade ou especificação.
     * @param {object} config objeto de configuração wdio
     * @param {Array.<Object>} capabilities lista de detalhes de capacidades
     * @param {Array.<String>} specs Lista de caminhos de arquivo de especificação que serão executados
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * É executado antes do início da execução do teste. Neste ponto, você pode acessar todas as variáveis
     * globais como `browser`. É o lugar perfeito para definir comandos personalizados.
     * @param {Array.<Object>} capabilities lista de detalhes de capacidades
     * @param {Array.<String>} specs        Lista de caminhos de arquivo de especificação que serão executados
     * @param {object}         browser      instância da sessão do navegador/dispositivo criada
     */
    before: function (capabilities, specs, browser) {
    },
    /**
     * É executado antes do início da suíte (apenas em Mocha/Jasmine).
     * @param {object} suite detalhes da suíte
     */
    beforeSuite: function (suite) {
    },
    /**
     * Este hook é executado _antes_ de cada hook dentro da suíte começar.
     * (Por exemplo, isso é executado antes de chamar `before`, `beforeEach`, `after`, `afterEach` no Mocha.). No Cucumber, `context` é o objeto World.
     *
     */
    beforeHook: function (test, context, hookName) {
    },
    /**
     * Hook que é executado _após_ cada hook dentro da suíte terminar.
     * (Por exemplo, isso é executado após chamar `before`, `beforeEach`, `after`, `afterEach` no Mocha.). No Cucumber, `context` é o objeto World.
     */
    afterHook: function (test, context, { error, result, duration, passed, retries }, hookName) {
    },
    /**
     * Função a ser executada antes de um teste (apenas em Mocha/Jasmine)
     * @param {object} test    objeto de teste
     * @param {object} context objeto de escopo com o qual o teste foi executado
     */
    beforeTest: function (test, context) {
    },
    /**
     * É executado antes da execução de um comando WebdriverIO.
     * @param {string} commandName nome do comando do hook
     * @param {Array} args argumentos que o comando receberia
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * É executado após a execução de um comando WebdriverIO
     * @param {string} commandName nome do comando do hook
     * @param {Array} args argumentos que o comando receberia
     * @param {*} result resultado do comando
     * @param {Error} error objeto de erro, se houver
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * Função a ser executada após um teste (apenas em Mocha/Jasmine)
     * @param {object}  test             objeto de teste
     * @param {object}  context          objeto de escopo com o qual o teste foi executado
     * @param {Error}   result.error     objeto de erro caso o teste falhe, caso contrário `undefined`
     * @param {*}       result.result    objeto de retorno da função de teste
     * @param {number}  result.duration  duração do teste
     * @param {boolean} result.passed    verdadeiro se o teste passou, caso contrário falso
     * @param {object}  result.retries   informações sobre tentativas relacionadas à especificação, por exemplo, `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * Hook que é executado após a suíte ter terminado (apenas em Mocha/Jasmine).
     * @param {object} suite detalhes da suíte
     */
    afterSuite: function (suite) {
    },
    /**
     * É executado após todos os testes serem concluídos. Você ainda tem acesso a todas as variáveis globais do
     * teste.
     * @param {number} result 0 - teste passou, 1 - teste falhou
     * @param {Array.<Object>} capabilities lista de detalhes de capacidades
     * @param {Array.<String>} specs Lista de caminhos de arquivo de especificação que foram executados
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * É executado logo após o encerramento da sessão do webdriver.
     * @param {object} config objeto de configuração wdio
     * @param {Array.<Object>} capabilities lista de detalhes de capacidades
     * @param {Array.<String>} specs Lista de caminhos de arquivo de especificação que foram executados
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * É executado após todos os workers terem sido encerrados e o processo estiver prestes a sair.
     * Um erro lançado no hook `onComplete` resultará na falha da execução do teste.
     * @param {object} exitCode 0 - sucesso, 1 - falha
     * @param {object} config objeto de configuração wdio
     * @param {Array.<Object>} capabilities lista de detalhes de capacidades
     * @param {<Object>} results objeto contendo resultados de teste
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
    * É executado quando ocorre uma atualização.
    * @param {string} oldSessionId ID da sessão antiga
    * @param {string} newSessionId ID da nova sessão
    */
    onReload: function(oldSessionId, newSessionId) {
    },
    /**
     * Hooks do Cucumber
     *
     * É executado antes de uma Feature do Cucumber.
     * @param {string}                   uri      caminho para o arquivo de feature
     * @param {GherkinDocument.IFeature} feature  objeto de feature do Cucumber
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * É executado antes de um Cenário do Cucumber.
     * @param {ITestCaseHookParameter} world    objeto world contendo informações sobre pickle e etapa de teste
     * @param {object}                 context  objeto World do Cucumber
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * É executado antes de uma Etapa do Cucumber.
     * @param {Pickle.IPickleStep} step     dados da etapa
     * @param {IPickle}            scenario pickle do cenário
     * @param {object}             context  objeto World do Cucumber
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * É executado após uma Etapa do Cucumber.
     * @param {Pickle.IPickleStep} step             dados da etapa
     * @param {IPickle}            scenario         pickle do cenário
     * @param {object}             result           objeto de resultados contendo resultados do cenário
     * @param {boolean}            result.passed    verdadeiro se o cenário passou
     * @param {string}             result.error     pilha de erros se o cenário falhou
     * @param {number}             result.duration  duração do cenário em milissegundos
     * @param {object}             context          objeto World do Cucumber
     */
    afterStep: function (step, scenario, result, context) {
    },
    /**
     *
     * É executado após um Cenário do Cucumber.
     * @param {ITestCaseHookParameter} world            objeto world contendo informações sobre pickle e etapa de teste
     * @param {object}                 result           objeto de resultados contendo resultados do cenário `{passed: boolean, error: string, duration: number}`
     * @param {boolean}                result.passed    verdadeiro se o cenário passou
     * @param {string}                 result.error     pilha de erros se o cenário falhou
     * @param {number}                 result.duration  duração do cenário em milissegundos
     * @param {object}                 context          objeto World do Cucumber
     */
    afterScenario: function (world, result, context) {
    },
    /**
     *
     * É executado após uma Feature do Cucumber.
     * @param {string}                   uri      caminho para o arquivo de feature
     * @param {GherkinDocument.IFeature} feature  objeto de feature do Cucumber
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * É executado antes que uma biblioteca de asserção do WebdriverIO faça uma asserção.
     * @param commandName nome do comando
     * @param args        argumentos que o comando receberia
     */
    beforeAssertion: function (params) {
    },
    /**
     * É executado após a execução de um comando WebdriverIO
     * @param commandName  nome do comando
     * @param args         argumentos que o comando receberia
     * @param result       resultado do comando
     * @param error        erro caso algo tenha dado errado
     */
    afterAssertion: function (params) {
    }
}
```

Você também pode encontrar um arquivo com todas as opções e variações possíveis na [pasta de exemplos](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js).