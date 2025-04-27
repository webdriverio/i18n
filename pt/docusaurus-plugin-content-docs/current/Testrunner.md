---
id: testrunner
title: Testrunner
---

O WebdriverIO vem com seu próprio test runner para ajudá-lo a começar a testar o mais rápido possível. Ele é projetado para fazer todo o trabalho para você, permite integrar a serviços de terceiros e ajuda você a executar seus testes da maneira mais eficiente possível.

O testrunner do WebdriverIO é fornecido separadamente no pacote NPM `@wdio/cli`.

Instale-o assim:

```sh npm2yarn
npm install @wdio/cli
```

Para ver a ajuda da interface de linha de comando, digite o seguinte comando no seu terminal:

```sh
$ npx wdio --help

wdio <command>

Commands:
  wdio config                           Initialize WebdriverIO and setup configuration in
                                        your current project.
  wdio install <type> <name>            Add a `reporter`, `service`, or `framework` to
                                        your WebdriverIO project
  wdio repl <option> [capabilities]     Run WebDriver session in command line
  wdio run <configPath>                 Run your WDIO configuration file to initialize
                                        your tests.

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

Incrível! Agora você precisa definir um arquivo de configuração onde todas as informações sobre seus testes, capacidades e configurações são definidas. Vá para a seção [Configuration File](/docs/configuration) para ver como esse arquivo deve ser.

Com o assistente de configuração `wdio`, é super fácil gerar seu arquivo de configuração. Basta executar:

```sh
$ npx wdio config
```

...e ele inicia o utilitário de ajuda.

Ele fará perguntas e gerará um arquivo de configuração para você em menos de um minuto.

![WDIO configuration utility](/img/config-utility.gif)

Depois de configurar seu arquivo de configuração, você pode iniciar seus testes executando:

```sh
npx wdio run wdio.conf.js
```

Você também pode inicializar sua execução de teste sem o comando `run`:

```sh
npx wdio wdio.conf.js
```

É isso! Agora, você pode acessar a instância do selenium através da variável global `browser`.

## Comandos

### `wdio config`

O comando `config` executa o assistente de configuração do WebdriverIO. Este assistente fará algumas perguntas sobre seu projeto WebdriverIO e criará um arquivo `wdio.conf.js` com base em suas respostas.

Exemplo:

```sh
wdio config
```

Opções:

```
--help            mostra o menu de ajuda do WebdriverIO                        [boolean]
--npm             Se deve instalar os pacotes usando NPM em vez de yarn        [boolean]
```

### `wdio run`

> Este é o comando padrão para executar sua configuração.

O comando `run` inicializa seu arquivo de configuração WebdriverIO e executa seus testes.

Exemplo:

```sh
wdio run ./wdio.conf.js --watch
```

Opções:

```
--help                mostra o menu de ajuda do WebdriverIO         [boolean]
--version             mostra a versão do WebdriverIO                [boolean]
--hostname, -h        endereço do host do driver de automação        [string]
--port, -p            porta do driver de automação                   [number]
--user, -u            nome de usuário ao usar um serviço em nuvem como backend
                                                                      [string]
--key, -k             chave de acesso correspondente ao usuário      [string]
--watch               observar specs para alterações                [boolean]
--logLevel, -l        nível de detalhamento do log
                            [choices: "trace", "debug", "info", "warn", "error", "silent"]
--bail                parar o test runner após um número específico de testes
                        falharem                                      [number]
--baseUrl             encurta chamadas de comando de URL definindo uma URL base
                                                                      [string]
--waitforTimeout, -w  timeout para todos os comandos waitForXXX      [number]
--framework, -f       define o framework (Mocha, Jasmine ou Cucumber) para
                        executar os specs                             [string]
--reporters, -r       reporters para imprimir os resultados no stdout  [array]
--suite               substitui o atributo specs e executa a suite
                        definida                                       [array]
--spec                executa um determinado arquivo spec ou wildcards - substitui specs
                        canalizados de stdin                           [array]
--exclude             exclui arquivo(s) spec de uma execução - substitui specs
                        canalizados de stdin                           [array]
--repeat              Repete specs específicos e/ou suites N vezes    [number]
--mochaOpts           Opções do Mocha
--jasmineOpts         Opções do Jasmine
--cucumberOpts        Opções do Cucumber
```

> Nota: A autocompilação pode ser facilmente controlada com as variáveis de ambiente `tsx`. Veja também a [documentação TypeScript](/docs/typescript).

### `wdio install`
O comando `install` permite adicionar reporters e serviços aos seus projetos WebdriverIO via CLI.

Exemplo:

```sh
wdio install service sauce # instala @wdio/sauce-service
wdio install reporter dot # instala @wdio/dot-reporter
wdio install framework mocha # instala @wdio/mocha-framework
```

Se você quiser instalar os pacotes usando `yarn` em vez disso, pode passar a flag `--yarn` para o comando:

```sh
wdio install service sauce --yarn
```

Você também pode passar um caminho de configuração personalizado se seu arquivo de configuração WDIO não estiver na mesma pasta em que você está trabalhando:

```sh
wdio install service sauce --config="./path/to/wdio.conf.js"
```

#### Lista de serviços suportados

```
sauce
testingbot
firefox-profile
devtools
browserstack
appium
intercept
zafira-listener
reportportal
docker
wiremock
lambdatest
vite
nuxt
```

#### Lista de reporters suportados

```
dot
spec
junit
allure
sumologic
concise
reportportal
video
html
json
mochawesome
timeline
```

#### Lista de frameworks suportados

```
mocha
jasmine
cucumber
```

### `wdio repl`

O comando repl permite iniciar uma interface de linha de comando interativa para executar comandos WebdriverIO. Pode ser usado para fins de teste ou apenas para iniciar rapidamente uma sessão WebdriverIO.

Execute testes no chrome local:

```sh
wdio repl chrome
```

ou execute testes no Sauce Labs:

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

Você pode aplicar os mesmos argumentos que pode no [comando run](#wdio-run).