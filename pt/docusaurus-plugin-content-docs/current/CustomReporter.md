---
id: customreporter
title: Relator Personalizado
---

Você pode escrever seu próprio relator personalizado para o executor de testes WDIO que é adaptado às suas necessidades. E é fácil!

Tudo o que você precisa fazer é criar um módulo node que herda do pacote `@wdio/reporter`, para que possa receber mensagens do teste.

A configuração básica deve ser assim:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    constructor(options) {
        /*
         * make reporter to write to the output stream by default
         */
        options = Object.assign(options, { stdout: true })
        super(options)
    }

    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Para usar este relator, tudo o que você precisa fazer é atribuí-lo à propriedade `reporter` em sua configuração.


Seu arquivo `wdio.conf.js` deve se parecer com isto:

```js
import CustomReporter from './reporter/my.custom.reporter'

export const config = {
    // ...
    reporters: [
        /**
         * use imported reporter class
         */
        [CustomReporter, {
            someOption: 'foobar'
        }],
        /**
         * use absolute path to reporter
         */
        ['/path/to/reporter.js', {
            someOption: 'foobar'
        }]
    ],
    // ...
}
```

Você também pode publicar o relator no NPM para que todos possam usá-lo. Nomeie o pacote como outros relatores `wdio-<reportername>-reporter`, e marque-o com palavras-chave como `wdio` ou `wdio-reporter`.

## Manipulador de Eventos

Você pode registrar um manipulador de eventos para vários eventos que são acionados durante os testes. Todos os seguintes manipuladores receberão cargas úteis com informações úteis sobre o estado atual e progresso.

A estrutura desses objetos de carga útil depende do evento e são unificados entre os frameworks (Mocha, Jasmine e Cucumber). Uma vez que você implementa um relator personalizado, ele deve funcionar para todos os frameworks.

A lista a seguir contém todos os métodos possíveis que você pode adicionar à sua classe de relator:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onRunnerStart() {}
    onBeforeCommand() {}
    onAfterCommand() {}
    onSuiteStart() {}
    onHookStart() {}
    onHookEnd() {}
    onTestStart() {}
    onTestPass() {}
    onTestFail() {}
    onTestSkip() {}
    onTestEnd() {}
    onSuiteEnd() {}
    onRunnerEnd() {}
}
```

Os nomes dos métodos são bastante autoexplicativos.

Para imprimir algo em um determinado evento, use o método `this.write(...)`, que é fornecido pela classe pai `WDIOReporter`. Ele transmite o conteúdo para `stdout` ou para um arquivo de log (dependendo das opções do relator).

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Observe que você não pode adiar a execução do teste de forma alguma.

Todos os manipuladores de eventos devem executar rotinas síncronas (ou você encontrará condições de corrida).

Certifique-se de verificar a [seção de exemplos](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio) onde você pode encontrar um exemplo de relator personalizado que imprime o nome do evento para cada evento.

Se você implementou um relator personalizado que pode ser útil para a comunidade, não hesite em fazer um Pull Request para que possamos disponibilizar o relator para o público!

Além disso, se você executar o testrunner WDIO através da interface `Launcher`, você não pode aplicar um relator personalizado como função da seguinte forma:

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // this will NOT work, because CustomReporter is not serializable
    reporters: ['dot', CustomReporter]
})
```

## Esperar Até `isSynchronised`

Se o seu relator precisa executar operações assíncronas para relatar os dados (por exemplo, upload de arquivos de log ou outros ativos), você pode sobrescrever o método `isSynchronised` em seu relator personalizado para deixar o executor WebdriverIO esperar até que você tenha computado tudo. Um exemplo disso pode ser visto no [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts):

```js
export default class SumoLogicReporter extends WDIOReporter {
    constructor (options) {
        // ...
        this.unsynced = []
        this.interval = setInterval(::this.sync, this.options.syncInterval)
        // ...
    }

    /**
     * overwrite isSynchronised method
     */
    get isSynchronised () {
        return this.unsynced.length === 0
    }

    /**
     * sync log files
     */
    sync () {
        // ...
        request({
            method: 'POST',
            uri: this.options.sourceAddress,
            body: logLines
        }, (err, resp) => {
            // ...
            /**
             * remove transferred logs from log bucket
             */
            this.unsynced.splice(0, MAX_LINES)
            // ...
        }
    }
}
```

Desta forma, o executor aguardará até que todas as informações de log sejam carregadas.

## Publicar o Relator no NPM

Para tornar o relator mais fácil de consumir e descobrir pela comunidade WebdriverIO, siga estas recomendações:

* Os serviços devem usar esta convenção de nomenclatura: `wdio-*-reporter`
* Use palavras-chave NPM: `wdio-plugin`, `wdio-reporter`
* A entrada `main` deve `export` uma instância do relator
* Exemplo de relator: [`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

Seguir o padrão de nomenclatura recomendado permite que os serviços sejam adicionados por nome:

```js
// Add wdio-custom-reporter
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### Adicionar Serviço Publicado ao CLI WDIO e Docs

Nós realmente apreciamos cada novo plugin que possa ajudar outras pessoas a executar melhores testes! Se você criou um plugin assim, considere adicioná-lo ao nosso CLI e documentação para torná-lo mais fácil de ser encontrado.

Por favor, faça um pull request com as seguintes alterações:

- adicione seu serviço à lista de [relatores suportados](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)) no módulo CLI
- melhore a [lista de relatores](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/reporters.json) para adicionar sua documentação à página oficial do Webdriver.io