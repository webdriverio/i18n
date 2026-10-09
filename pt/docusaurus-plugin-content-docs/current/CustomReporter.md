---
id: customreporter
title: Reporter Personalizado
description: "Crie um reporter personalizado para o testrunner do WDIO com base em @wdio/reporter, trate os eventos do runner e publique-o no NPM."
---

Você pode escrever seu próprio reporter personalizado para o test runner do WDIO, adaptado às suas necessidades. E é fácil!

Tudo o que você precisa fazer é criar um módulo node que herde do pacote `@wdio/reporter`, para que ele possa receber mensagens do teste.

A configuração básica deve ser assim:

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    constructor(options) {
        /*
         * faz o reporter escrever no fluxo de saída por padrão
         */
        options = Object.assign(options, { stdout: true })
        super(options)
    }

    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Para usar este reporter, tudo o que você precisa fazer é atribuí-lo à propriedade `reporter` na sua configuração.


Seu arquivo `wdio.conf.js` deve ficar assim:

```js
import CustomReporter from './reporter/my.custom.reporter'

export const config = {
    // ...
    reporters: [
        /**
         * usa a classe de reporter importada
         */
        [CustomReporter, {
            someOption: 'foobar'
        }],
        /**
         * usa o caminho absoluto para o reporter
         */
        ['/path/to/reporter.js', {
            someOption: 'foobar'
        }]
    ],
    // ...
}
```

Você também pode publicar o reporter no NPM para que todos possam usá-lo. Nomeie o pacote como os outros reporters, `wdio-<reportername>-reporter`, e marque-o com palavras-chave como `wdio` ou `wdio-reporter`.

## Manipulador de Eventos

Você pode registrar um manipulador de eventos para vários eventos que são disparados durante os testes. Todos os manipuladores a seguir receberão payloads com informações úteis sobre o estado e o progresso atuais.

A estrutura desses objetos de payload depende do evento e é unificada entre os frameworks (Mocha, Jasmine e Cucumber). Depois de implementar um reporter personalizado, ele deve funcionar para todos os frameworks.

A lista a seguir contém todos os métodos possíveis que você pode adicionar à sua classe de reporter:

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

Para imprimir algo em um determinado evento, use o método `this.write(...)`, que é fornecido pela classe pai `WDIOReporter`. Ele transmite o conteúdo para o `stdout` ou para um arquivo de log (dependendo das opções do reporter).

```js
import WDIOReporter from '@wdio/reporter'

export default class CustomReporter extends WDIOReporter {
    onTestPass(test) {
        this.write(`Congratulations! Your test "${test.title}" passed 👏`)
    }
}
```

Observe que você não pode adiar a execução do teste de forma alguma.

Todos os manipuladores de eventos devem executar rotinas síncronas (ou você terá condições de corrida).

Não deixe de conferir a [seção de exemplos](https://github.com/webdriverio/webdriverio/tree/main/examples/wdio), onde você pode encontrar um exemplo de reporter personalizado que imprime o nome de cada evento.

Se você implementou um reporter personalizado que possa ser útil para a comunidade, não hesite em fazer um Pull Request para que possamos disponibilizar o reporter publicamente!

Além disso, se você executar o testrunner do WDIO por meio da interface `Launcher`, não poderá aplicar um reporter personalizado como função da seguinte forma:

```js
import Launcher from '@wdio/cli'

import CustomReporter from './reporter/my.custom.reporter'

const launcher = new Launcher('/path/to/config.file.js', {
    // isso NÃO funcionará, porque CustomReporter não é serializável
    reporters: ['dot', CustomReporter]
})
```

## Aguardar até `isSynchronised`

Se o seu reporter precisar executar operações assíncronas para reportar os dados (por exemplo, upload de arquivos de log ou outros recursos), você pode sobrescrever o método `isSynchronised` no seu reporter personalizado para fazer o runner do WebdriverIO aguardar até que você tenha processado tudo. Um exemplo disso pode ser visto no [`@wdio/sumologic-reporter`](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-sumologic-reporter/src/index.ts):

```js
export default class SumoLogicReporter extends WDIOReporter {
    constructor (options) {
        // ...
        this.unsynced = []
        this.interval = setInterval(::this.sync, this.options.syncInterval)
        // ...
    }

    /**
     * sobrescreve o método isSynchronised
     */
    get isSynchronised () {
        return this.unsynced.length === 0
    }

    /**
     * sincroniza os arquivos de log
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
             * remove os logs transferidos do bucket de logs
             */
            this.unsynced.splice(0, MAX_LINES)
            // ...
        }
    }
}
```

Dessa forma, o runner aguardará até que todas as informações de log sejam enviadas.

## Publicar o Reporter no NPM

Para tornar o reporter mais fácil de usar e de ser descoberto pela comunidade WebdriverIO, siga estas recomendações:

* Os serviços devem usar esta convenção de nomenclatura: `wdio-*-reporter`
* Use as palavras-chave do NPM: `wdio-plugin`, `wdio-reporter`
* A entrada `main` deve fazer `export` de uma instância do reporter
* Exemplo de reporter: [`@wdio/dot-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter)

Seguir o padrão de nomenclatura recomendado permite que os serviços sejam adicionados pelo nome:

```js
// Adiciona wdio-custom-reporter
export const config = {
    // ...
    reporter: ['custom'],
    // ...
}
```

### Adicionar o Serviço Publicado ao WDIO CLI e à Documentação

Agradecemos muito cada novo plugin que possa ajudar outras pessoas a executar testes melhores! Se você criou um plugin assim, considere adicioná-lo ao nosso CLI e à documentação para facilitar que ele seja encontrado.

Abra um pull request com as seguintes alterações:

- adicione seu serviço à lista de [reporters suportados](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L74-L91)) no módulo do CLI
- amplie a [lista de reporters](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/reporters.json) para adicionar sua documentação à página oficial do Webdriver.io