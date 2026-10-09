---
id: customservices
title: Serviços Personalizados
description: "Escreva um serviço personalizado de launcher ou de worker para o testrunner do WDIO usando os hooks do testrunner, trate erros de serviço e publique-o no NPM."
---

Você pode escrever seu próprio serviço personalizado para o test runner do WDIO para atender às suas necessidades.

Serviços são complementos criados para lógica reutilizável, a fim de simplificar testes, gerenciar sua suíte de testes e integrar resultados. Os serviços têm acesso a todos os mesmos [hooks](/docs/configurationfile) disponíveis no `wdio.conf.js`.

Existem dois tipos de serviços que podem ser definidos: um serviço de launcher, que só tem acesso aos hooks `onPrepare`, `onWorkerStart`, `onWorkerEnd` e `onComplete`, que são executados apenas uma vez por execução de testes, e um serviço de worker, que tem acesso a todos os outros hooks e é executado para cada worker. Observe que você não pode compartilhar variáveis (globais) entre os dois tipos de serviços, pois os serviços de worker são executados em um processo (worker) diferente.

Um serviço de launcher pode ser definido da seguinte forma:

```js
export default class CustomLauncherService {
    // Se um hook retornar uma promise, o WebdriverIO aguardará até que essa promise seja resolvida para continuar.
    async onPrepare(config, capabilities) {
        // TODO: algo antes de todos os workers serem iniciados
    }

    onComplete(exitCode, config, capabilities) {
        // TODO: algo após o encerramento dos workers
    }

    // métodos personalizados do serviço ...
}
```

Já um serviço de worker deve se parecer com isto:

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
     * o objeto browser é passado aqui pela primeira vez
     */
    async before(config, capabilities, browser) {
        this.browser = browser

        // TODO: algo antes de todos os testes serem executados, por exemplo:
        await this.browser.setWindowSize(1024, 768)
    }

    after(exitCode, config, capabilities) {
        // TODO: algo após todos os testes serem executados
    }

    beforeTest(test, context) {
        // TODO: algo antes de cada execução de teste Mocha/Jasmine
    }

    beforeScenario(test, context) {
        // TODO: algo antes de cada execução de cenário Cucumber
    }

    // outros hooks ou métodos personalizados do serviço ...
}
```

Recomenda-se armazenar o objeto browser por meio do parâmetro passado no construtor. Por fim, exponha ambos os tipos de workers da seguinte forma:

```js
import CustomLauncherService from './launcher'
import CustomWorkerService from './service'

export default CustomWorkerService
export const launcher = CustomLauncherService
```

Se você estiver usando TypeScript e quiser garantir que os parâmetros dos métodos de hook sejam type safe, você pode definir sua classe de serviço da seguinte forma:

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

## Serviços de Worker Condicionais

Um serviço pode decidir se seu código de worker é necessário para uma execução de testes ou para um worker específico. Existem duas verificações opcionais:

| Verificação | Onde é executada | Argumentos | Efeito de retornar `false` |
| --- | --- | --- | --- |
| Export nomeado do módulo `shouldLoad` | Processo do launcher, após importar o módulo do serviço | Configuração, todas as capabilities configuradas | O módulo do serviço não é importado em nenhum worker. Seu serviço de launcher ainda é executado. |
| Método estático do serviço de worker `shouldRun` | Processo do worker, antes de construir o serviço | Opções do serviço, capabilities desse worker, configuração | O serviço de worker não é construído, portanto nenhum de seus hooks é executado nesse worker. |

Use `shouldLoad(config, capabilities)` para módulos de serviço configurados por nome ou caminho. Esta é uma decisão para o pacote inteiro: se o mesmo serviço aparecer mais de uma vez com opções diferentes, o resultado se aplica a todas essas entradas. Por exemplo, um serviço personalizado que requer credenciais remotas poderia exportar:

```js
// wdio-custom-service/index.js
import CustomLauncherService from './launcher.js'
import CustomWorkerService from './service.js'

export function shouldLoad(config, capabilities) {
    return Boolean(config.user && config.key)
}

export default CustomWorkerService
export const launcher = CustomLauncherService
```

Use `static shouldRun(options, capabilities, config)` para decidir separadamente para cada entrada de serviço e cada worker. Isso também funciona com classes de serviço personalizadas passadas diretamente em `services`. Por exemplo, este serviço pode restringir seus hooks a um navegador configurado:

```js
// wdio-custom-service/service.js
export default class CustomWorkerService {
    static shouldRun(options, capabilities, config) {
        return !options.browserName || options.browserName === capabilities.browserName
    }

    before(capabilities, specs, browser) {
        // Executado apenas em workers que passaram em shouldRun.
    }
}
```

Com `services: [['custom', { browserName: 'chrome' }]]`, este serviço de worker é construído apenas para capabilities do Chrome, desde que a verificação `shouldLoad` do pacote também permita. O worker precisa importar o módulo do serviço para chamar `shouldRun`; retornar `false` deste método não impede essa importação nem afeta o serviço de launcher.

Ambas as verificações podem retornar um boolean ou uma promise de um boolean. O WebdriverIO aguarda cada resultado, e apenas `false` desabilita o carregamento ou a construção. Serviços sem essas verificações mantêm seu comportamento existente. Objetos de serviço já construídos contendo hooks permanecem inalterados.

Se qualquer uma das verificações lançar um erro ou for rejeitada, a inicialização do serviço falha com um erro que identifica o serviço. Isso difere dos erros lançados por hooks de serviço, descritos abaixo.

## Tratamento de Erros de Serviço

Um Error lançado durante um hook de serviço será registrado no log enquanto o runner continua. Se um hook do seu serviço for crítico para a configuração ou finalização do test runner, o `SevereServiceError` exposto pelo pacote `webdriverio` pode ser usado para interromper o runner.

```js
import { SevereServiceError } from 'webdriverio'

export default class CustomServiceLauncher {
    async onPrepare(config, capabilities) {
        // TODO: algo crítico para a configuração antes de todos os workers serem iniciados

        throw new SevereServiceError('Something went wrong.')
    }

    // métodos personalizados do serviço ...
}
```

## Importar Serviço de um Módulo

A única coisa a fazer agora para usar este serviço é atribuí-lo à propriedade `services`.

Modifique seu arquivo `wdio.conf.js` para que fique assim:

```js
import CustomService from './service/my.custom.service'

export const config = {
    // ...
    services: [
        /**
         * usar a classe de serviço importada
         */
        [CustomService, {
            someOption: true
        }],
        /**
         * usar o caminho absoluto para o serviço
         */
        ['/path/to/service.js', {
            someOption: true
        }]
    ],
    // ...
}
```

## Publicar Serviço no NPM

Para tornar os serviços mais fáceis de usar e de serem descobertos pela comunidade WebdriverIO, siga estas recomendações:

* Os serviços devem usar esta convenção de nomenclatura: `wdio-*-service`
* Use as palavras-chave do NPM: `wdio-plugin`, `wdio-service`
* A entrada `main` deve fazer `export` de uma instância do serviço
* Exemplos de serviços: [`@wdio/sauce-service`](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-sauce-service)

Seguir o padrão de nomenclatura recomendado permite que os serviços sejam adicionados pelo nome:

```js
// Adicionar wdio-custom-service
export const config = {
    // ...
    services: ['custom'],
    // ...
}
```

### Adicionar Serviço Publicado à CLI e à Documentação do WDIO

Agradecemos muito cada novo plugin que possa ajudar outras pessoas a executar testes melhores! Se você criou um plugin assim, considere adicioná-lo à nossa CLI e à documentação para torná-lo mais fácil de ser encontrado.

Abra um pull request com as seguintes alterações:

- adicione seu serviço à lista de [serviços suportados](https://github.com/webdriverio/webdriverio/blob/main/packages/wdio-cli/src/constants.ts#L92-L128)) no módulo da CLI
- amplie a [lista de serviços](https://github.com/webdriverio/webdriverio/blob/main/infra/docs/src/3rd-party/services.json) para adicionar sua documentação à página oficial do Webdriver.io