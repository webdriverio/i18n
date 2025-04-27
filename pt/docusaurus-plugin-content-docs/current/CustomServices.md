---
id: customservices
title: Serviços Personalizados
---

Você pode escrever seu próprio serviço personalizado para o executor de testes WDIO para se adequar às suas necessidades.

Serviços são complementos criados para lógica reutilizável, para simplificar testes, gerenciar sua suite de testes e integrar resultados. Os serviços têm acesso a todos os mesmos [hooks](/docs/configurationfile) disponíveis no `wdio.conf.js`.

Existem dois tipos de serviços que podem ser definidos: um serviço lançador (launcher) que só tem acesso aos hooks `onPrepare`, `onWorkerStart`, `onWorkerEnd` e `onComplete`, que são executados apenas uma vez por execução de teste, e um serviço de trabalhador (worker) que tem acesso a todos os outros hooks e é executado para cada trabalhador. Note que você não pode compartilhar variáveis (globais) entre os dois tipos de serviços, pois os serviços de trabalhador executam em um processo (worker) diferente.

Um serviço lançador pode ser definido da seguinte forma:

```js
export default class CustomLauncherService {
    // Se um hook retornar uma promise, o WebdriverIO aguardará até que essa promise seja resolvida para continuar.
    async onPrepare(config, capabilities) {
        // TODO: algo antes de todos os workers iniciarem
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: algo depois que os workers terminarem
    }

    // métodos de serviço personalizados ...
}
```

Enquanto um serviço de trabalhador deve ser assim:

```js
export default class CustomWorkerService {
    /**
     * `serviceOptions` contém todas as opções específicas do serviço
     * por exemplo, se definido da seguinte forma:
     *
     * ```
     * services: [['custom', { foo: 'bar' }]]
     * ```
     *
     * o parâmetro `serviceOptions` será: `{ foo: 'bar' }`
     */
    constructor (serviceOptions, capabilities, config) {
        this.options = serviceOptions
    }

    /**
     * este objeto browser é passado aqui pela primeira vez
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: algo antes de todos os testes serem executados, ex:
        await this.browser.setWindowSize(1024, 768)
    }

    after(exitCode, config, capabilities) {
        // TODO: algo depois que todos os testes forem executados
    }

    beforeTest(test, context) {
        // TODO: algo antes de cada teste Mocha/Jasmine
    }

    beforeScenario(test, context) {
        // TODO: algo antes de cada cenário Cucumber
    }

    // outros hooks ou métodos de serviço personalizados ...
}
```

É recomendado armazenar o objeto browser através do parâmetro passado no construtor. Por fim, exponha ambos os tipos de trabalhadores da seguinte forma:

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

Se você estiver usando TypeScript e quiser garantir que os parâmetros dos métodos de hook sejam tipados corretamente, você pode definir sua classe de serviço da seguinte forma:

```ts
import type { Capabilities, Options, Services } from '@wdio/types'

export default class CustomWorkerService implements Services.ServiceInstance {
    constructor (
        private _options: MyServiceOptions,
        private _capabilities: Capabilities.RemoteCapability,
        private _config: WebdriverIO.Config,
    ) {
        // ...
    }

    // ...
}
```

## Tratamento de Erros de Serviço

Um erro lançado durante um hook de serviço será registrado enquanto o executor continua. Se um hook em seu serviço for crítico para a configuração ou desmontagem do executor de teste, o `SevereServiceError` exposto pelo pacote `webdriverio` pode ser usado para interromper o executor.

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: algo crítico para a configuração antes que todos os workers iniciem

        throw new SevereServiceError('Algo deu errado.')
    }

    // métodos de serviço personalizados ...
}
```

## Importar Serviço de um Módulo

A única coisa a fazer agora para usar este serviço é atribuí-lo à propriedade `services`.

Modifique seu arquivo `wdio.conf.js` para que se pareça com isto:

```js
import CustomService from './service/my.custom.service'

export const config = {
    // ...
    services: [
        /**
         * usar classe de serviço importada
         */
        [CustomService, {
            someOption: true
        }],
        /**
         * usar caminho absoluto para o serviço
         */
        ['/path/to/service.js', {
            someOption: true
        }]
    ],
    // ...
}
```

## Publicar Serviço no NPM

Para tornar os serviços mais fáceis de consumir e descobrir pela comunidade WebdriverIO, siga estas recomendações:

* Os serviços devem usar esta convenção de nomenclatura: `wdio-*-service`
* Use palavras-chave do NPM: `wdio-plugin`, `wdio-service`
* A entrada `main` deve `export` uma instância do serviço
* Exemplos de serviços: [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

Seguindo o padrão de nomenclatura recomendado, os serviços podem ser adicionados pelo nome:

```js
// Adicionar wdio-custom-service
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### Adicionar Serviço Publicado ao CLI e Documentação do WDIO

Nós realmente apreciamos cada novo plugin que pode ajudar outras pessoas a executar melhores testes! Se você criou um plugin assim, considere adicioná-lo à nossa CLI e documentação para torná-lo mais fácil de ser encontrado.

Por favor, faça um pull request com as seguintes alterações:

- adicione seu serviço à lista de [serviços suportados](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)) no módulo CLI
- melhore a [lista de serviços](https://github.com/webdriverio/webdriverio/blob/main/scripts/docs-generation/3rd-party/services.json) para adicionar sua documentação à página oficial do Webdriver.io