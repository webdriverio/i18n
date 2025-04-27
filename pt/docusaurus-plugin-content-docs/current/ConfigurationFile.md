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
    // o WebdriverIO conecta-se automaticamente ao localhost. Além disso, se você estiver usando um dos
    // serviços em nuvem suportados como Sauce Labs, Browserstack, Testing Bot ou LambdaTest, você também não
    // precisa definir informações de host e porta (porque o WebdriverIO pode descobrir isso
    // a partir de suas informações de usuário e chave). No entanto, se você estiver usando um Selenium
    // de backend privado, você deve definir o `hostname`, `port` e `path` aqui.
    //
    hostname: 'localhost',
    port: 4444,
    path: '/',
    // Protocol: http | https
    // protocol: 'http',
    //
    // =================
    // Provedores de Serviço
    // =================
    // WebdriverIO suporta Sauce Labs, Browserstack, Testing Bot e LambdaTest. (Outros provedores de nuvem
    // também devem funcionar.) Esses serviços definem valores específicos de `user` e `key` (ou chave de acesso)
    // que você deve colocar aqui, para se conectar a esses serviços.
    //
    user: 'webdriverio',
    key:  'xxxxxxxxxxxxxxxx-xxxxxx-xxxxx-xxxxxxxxx',

    // Se você executar seus testes no Sauce Labs, você pode especificar a região onde deseja executar seus testes
    // através da propriedade `region`. Os identificadores curtos disponíveis para regiões são `us` (padrão) e `eu`.
    // Essas regiões são usadas para o Sauce Labs VM cloud e o Sauce Labs Real Device Cloud.
    // Se você não fornecer a região, o padrão será `us`.
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
    // Defina quais specs de teste devem ser executados. O padrão é relativo ao diretório
    // do arquivo de configuração que está sendo executado.
    //
    // As specs são definidas como uma matriz de arquivos de spec (opcionalmente usando curingas
    // que serão expandidos). O teste para cada arquivo de spec será executado em um processo
    // de trabalho separado. Para ter um grupo de arquivos de spec executados no mesmo processo
    // de trabalho, coloque-os em uma matriz dentro do array specs.
    //
    // O caminho dos arquivos de spec será resolvido relativamente ao diretório
    // do arquivo de configuração, a menos que seja absoluto.
    //
    specs: [
        'test/spec/**',
        ['group/spec/**']
    ],
    // Padrões para excluir.
    exclude: [
        'test/spec/multibrowser/**',
        'test/spec/mobile/**'
    ],
    //
    // ============
    // Capacidades
    // ============
    // Defina suas capacidades aqui. O WebdriverIO pode executar várias capacidades ao mesmo
    // tempo. Dependendo do número de capacidades, o WebdriverIO inicia várias sessões de teste.
    // Dentro de suas `capabilities`, você pode substituir as opções `spec` e `exclude`
    // para agrupar specs específicos para uma capacidade específica.
    //
    // Primeiro, você pode definir quantas instâncias devem ser iniciadas ao mesmo tempo. Digamos
    // que você tenha 3 capacidades diferentes (Chrome, Firefox e Safari) e você tenha
    // definido `maxInstances` como 1. O wdio irá gerar 3 processos.
    //
    // Portanto, se você tiver 10 arquivos de spec e definir `maxInstances` como 10, todos os arquivos de spec
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
    // Se você definir como `false`, deverá importar de `@wdio/globals`. Nota: o WebdriverIO não
    // lida com a injeção de globais específicos do framework de teste.
    //
    injectGlobals: true,
    //
    // Se você tiver problemas para reunir todas as capacidades importantes, verifique o
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
        // - se o valor for uma matriz: o DevTools filtra os argumentos padrão fornecidos
        // 'wdio:devtoolsOptions': {
        //    ignoreDefaultArgs: true,
        //    ignoreDefaultArgs: ['--disable-sync', '--disable-extensions'],
        // }
    }, {
        // maxInstances pode ser sobrescrito por capacidade. Então, se você tiver um Selenium interno
        // grid com apenas 5 instâncias de firefox disponíveis, você pode garantir que não mais que
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
        // Se outputDir for fornecido, o WebdriverIO pode capturar logs de sessão do driver
        // é possível configurar quais logTypes excluir.
        excludeDriverLogs: ['bugreport', 'server'], // passe '*' para excluir todos os logs de sessão do driver
        //
        // Parâmetro para ignorar alguns ou todos os argumentos padrão do Puppeteer
        // ignoreDefaultArgs: ['-foreground'], // defina o valor como verdadeiro para ignorar todos os argumentos padrão
    }],
    //
    // Lista adicional de argumentos do node para usar ao iniciar processos filhos
    execArgv: [],
    //
    // ===================
    // Configurações de Teste
    // ===================
    // Defina todas as opções relevantes para a instância do WebdriverIO aqui
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
    // bail (o padrão é 0 - não interromper, executar todos os testes).
    bail: 0,
    //
    // Defina uma URL base para encurtar chamadas de comando `url()`. Se seu parâmetro `url` começa
    // com `/`, o `baseUrl` é prefixado, não incluindo a parte do caminho de `baseUrl`.
    //
    // Se o seu parâmetro `url` começa sem um esquema ou `/` (como `some/path`), o `baseUrl`
    // é prefixado diretamente.
    baseUrl: 'http://localhost:8080',
    //
    // Timeout padrão para todos os comandos waitForXXX.
    waitforTimeout: 1000,
    //
    // Adicione arquivos a serem observados (por exemplo, código de aplicativo ou objetos de página) ao executar o comando `wdio`
    // com a flag `--watch`. Globbing é suportado.
    filesToWatch: [
        // por exemplo, executar testes novamente se eu mudar meu código de aplicativo
        // './app/**/*.js'
    ],
    //
    // Framework com o qual você deseja executar seus specs.
    // Os seguintes são suportados: 'mocha', 'jasmine' e 'cucumber'
    // Veja também: https://webdriver.io/docs/frameworks.html
    //
    // Certifique-se de ter o pacote adaptador wdio para o framework específico instalado antes de executar qualquer teste.
    framework: 'mocha',
    //
    // O número de vezes para tentar novamente todo o arquivo de spec quando ele falha como um todo
    specFileRetries: 1,
    // Atraso em segundos entre as tentativas de arquivo de spec
    specFileRetriesDelay: 0,
    // Se os arquivos de spec repetidos devem ser repetidos imediatamente ou adiados para o final da fila
    specFileRetriesDeferred: false,
    //
    // Relatório de teste para stdout.
    // O único suportado por padrão é 'dot'
    // Veja também: https://webdriver.io/docs/dot-reporter.html , e clique em "Reporters" na coluna da esquerda
    reporters: [
        'dot',
        ['allure', {
            //
            // Se você estiver usando o reporter "allure", você deve definir o diretório onde
            // o WebdriverIO deve salvar todos os relatórios allure.
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
        // ou website dependendo do resultado. Por exemplo, é muito útil tirar uma captura de tela toda vez
        // que uma asserção falha.
        expectationResultHandler: function(passed, assertion) {
            // faça algo
        },
        //
        // Utilize a funcionalidade grep específica do Jasmine
        grep: null,
        invertGrep: null
    },
    //
    // Se você estiver usando o Cucumber, você precisa especificar onde suas definições de etapa estão localizadas.
    // Veja também: https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options
    cucumberOpts: {
        require: [],        // <string[]> (arquivo/dir) requer arquivos antes de executar recursos
        backtrace: false,   // <boolean> mostra backtrace completo para erros
        compiler: [],       // <string[]> ("extensão:módulo") requer arquivos com a EXTENSÃO dada após requerer o MÓDULO (repetível)
        dryRun: false,      // <boolean> invoca formatadores sem executar etapas
        failFast: false,    // <boolean> aborta a execução na primeira falha
        snippets: true,     // <boolean> oculta snippets de definição de etapa para etapas pendentes
        source: true,       // <boolean> oculta URIs de origem
        strict: false,      // <boolean> falha se houver etapas indefinidas ou pendentes
        tagExpression: '',  // <string> (expressão) executa apenas os recursos ou cenários com tags que correspondem à expressão
        timeout: 20000,     // <number> timeout para definições de etapa
        ignoreUndefinedDefinitions: false, // <boolean> Ative isso para tratar definições indefinidas como avisos.
        scenarioLevelReporter: false // Ative isso para fazer com que o webdriver.io se comporte como se os cenários e não os passos fossem os testes.
    },
    // Especifique um caminho de tsconfig personalizado - WDIO usa `tsx` para compilar arquivos TypeScript
    // Seu TSConfig é automaticamente detectado do diretório de trabalho atual
    // mas você pode especificar um caminho personalizado aqui ou definindo a variável de ambiente TSX_TSCONFIG_PATH
    // Veja a documentação do `tsx`: https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path
    tsConfigPath: 'path/to/tsconfig.json',
    //
    // =====
    // Hooks
    // =====
    // O WebdriverIO fornece vários hooks que você pode usar para interferir no processo de teste a fim de aprimorá-lo
    // e construir serviços ao seu redor. Você pode aplicar uma única função ou uma matriz de
    // métodos. Se um deles retornar com uma promessa, o WebdriverIO aguardará até que essa promessa seja
    // resolvida para continuar.
    //
    /**
     * É executado uma vez antes que todos os workers sejam lançados.
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
     * @param  {object} specs    specs a serem executados no processo worker
     * @param  {object} args     objeto que será mesclado com a configuração principal quando o worker for inicializado
     * @param  {object} execArgv lista de argumentos de string passados para o processo worker
     */
    onWorkerStart: function (cid, caps, specs, args, execArgv) {
    },
    /**
     * É executado após um processo worker ter saído.
     * @param  {string} cid      id da capacidade (por exemplo, 0-0)
     * @param  {number} exitCode 0 - sucesso, 1 - falha
     * @param  {object} specs    specs a serem executados no processo worker
     * @param  {number} retries  número de retentativas usadas
     */
    onWorkerEnd: function (cid, exitCode, specs, retries) {
    },
    /**
     * É executado antes de inicializar a sessão do webdriver e o framework de teste. Permite
     * manipular configurações dependendo da capacidade ou spec.
     * @param {object} config objeto de configuração wdio
     * @param {Array.<Object>} capabilities lista de detalhes de capacidades
     * @param {Array.<String>} specs Lista de caminhos de arquivos de spec que serão executados
     */
    beforeSession: function (config, capabilities, specs) {
    },
    /**
     * É executado antes do início da execução do teste. Neste ponto, você pode acessar todas as variáveis globais
     * como `browser`. É o lugar perfeito para definir comandos personalizados.
     * @param {Array.<Object>} capabilities lista de detalhes de capacidades
     * @param {Array.<String>} specs        Lista de caminhos de arquivos de spec que serão executados
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
     * Executado antes de um comando WebdriverIO ser executado.
     * @param {string} commandName nome do comando hook
     * @param {Array} args argumentos que o comando receberia
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * Executado após um comando WebdriverIO ser executado
     * @param {string} commandName nome do comando hook
     * @param {Array} args argumentos que o comando receberia
     * @param {number} result 0 - comando bem-sucedido, 1 - erro de comando
     * @param {object} error objeto de erro, se houver
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
     * @param {object}  result.retries   informações sobre tentativas relacionadas ao spec, por exemplo, `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
    },
    /**
     * Hook que é executado após o término da suíte (apenas em Mocha/Jasmine).
     * @param {object} suite detalhes da suíte
     */
    afterSuite: function (suite) {
    },
    /**
     * É executado após a conclusão de todos os testes. Você ainda tem acesso a todas as variáveis globais do
     * teste.
     * @param {number} result 0 - teste aprovado, 1 - teste falhou
     * @param {Array.<Object>} capabilities lista de detalhes de capacidades
     * @param {Array.<String>} specs Lista de caminhos de arquivos de spec que foram executados
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * É executado logo após o término da sessão do webdriver.
     * @param {object} config objeto de configuração wdio
     * @param {Array.<Object>} capabilities lista de detalhes de capacidades
     * @param {Array.<String>} specs Lista de caminhos de arquivos de spec que foram executados
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
     * Executado antes de um Recurso do Cucumber.
     * @param {string}                   uri      caminho para o arquivo de recurso
     * @param {GherkinDocument.IFeature} feature  objeto de recurso do Cucumber
     */
    beforeFeature: function (uri, feature) {
    },
    /**
     *
     * Executado antes de um Cenário do Cucumber.
     * @param {ITestCaseHookParameter} world    objeto world contendo informações sobre pickle e etapa de teste
     * @param {object}                 context  objeto World do Cucumber
     */
    beforeScenario: function (world, context) {
    },
    /**
     *
     * Executado antes de uma Etapa do Cucumber.
     * @param {Pickle.IPickleStep} step     dados da etapa
     * @param {IPickle}            scenario pickle do cenário
     * @param {object}             context  objeto World do Cucumber
     */
    beforeStep: function (step, scenario, context) {
    },
    /**
     *
     * Executado após uma Etapa do Cucumber.
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
     * Executado após um Cenário do Cucumber.
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
     * Executado após um Recurso do Cucumber.
     * @param {string}                   uri      caminho para o arquivo de recurso
     * @param {GherkinDocument.IFeature} feature  objeto de recurso do Cucumber
     */
    afterFeature: function (uri, feature) {
    },
    /**
     * Executado antes que uma biblioteca de asserção do WebdriverIO faça uma asserção.
     * @param commandName nome do comando
     * @param args        argumentos que o comando receberia
     */
    beforeAssertion: function (params) {
    },
    /**
     * Executado após a execução de um comando WebdriverIO
     * @param commandName  nome do comando
     * @param args         argumentos que o comando receberia
     * @param result       resultado do comando
     * @param error        erro caso algo dê errado
     */
    afterAssertion: function (params) {
    }
}
```

Você também pode encontrar um arquivo com todas as opções e variações possíveis na [pasta de exemplos](https://github.com/webdriverio/webdriverio/blob/main/examples/wdio.conf.js).