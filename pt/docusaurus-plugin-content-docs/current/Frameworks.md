---
id: frameworks
title: Frameworks
description: "Configure Mocha, Jasmine ou Cucumber.js como framework de testes para o testrunner do WDIO, ou integre frameworks de terceiros como o Serenity/JS."
---

O WebdriverIO Runner tem suporte nativo para [Mocha](http://mochajs.org/), [Jasmine](http://jasmine.github.io/) e [Cucumber.js](https://cucumber.io/). Você também pode integrá-lo com frameworks open-source de terceiros, como o [Serenity/JS](#using-serenityjs).

:::tip Integrando o WebdriverIO com frameworks de teste
Para integrar o WebdriverIO com um framework de teste, você precisa de um pacote adaptador disponível no NPM.
Observe que o pacote adaptador deve ser instalado no mesmo local onde o WebdriverIO está instalado.
Portanto, se você instalou o WebdriverIO globalmente, certifique-se de instalar o pacote adaptador globalmente também.
:::

Integrar o WebdriverIO com um framework de teste permite que você acesse a instância do WebDriver usando a variável global `browser`
nos seus arquivos de spec ou definições de steps.
Observe que o WebdriverIO também se encarrega de instanciar e encerrar a sessão do Selenium, então você não precisa fazer isso
por conta própria.

## Usando Mocha

Primeiro, instale o pacote adaptador do NPM:

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

Por padrão, o WebdriverIO fornece uma [biblioteca de asserções](assertion) integrada que você pode começar a usar imediatamente:

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

O WebdriverIO v10 inclui o [Mocha 12](https://mochajs.org/) e suporta as [interfaces](https://mochajs.org/#interfaces) `BDD` (padrão), `TDD` e `QUnit` do Mocha.

Se você preferir escrever suas specs no estilo TDD, defina a propriedade `ui` na sua configuração `mochaOpts` como `tdd`. Agora seus arquivos de teste devem ser escritos assim:

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Se você quiser definir outras configurações específicas do Mocha, pode fazê-lo com a chave `mochaOpts` no seu arquivo de configuração. Uma lista de todas as opções pode ser encontrada no [site do projeto Mocha](https://mochajs.org/api/mocha).

__Observação:__ O WebdriverIO não suporta o uso obsoleto de callbacks `done` no Mocha:

```js
it('should test something', (done) => {
    done() // lança "done is not a function"
})
```

### Opções do Mocha

As seguintes opções podem ser aplicadas no seu `wdio.conf.js` para configurar seu ambiente Mocha. __Observação:__ nem todas as opções do Mocha são suportadas. `parallel` ainda pertence ao pool de workers próprio do Mocha e gerará um erro aqui — o testrunner do WDIO já paraleliza as specs entre capabilities e workers. A CLI do Mocha 12 também deixou de usar o yargs e passou a usar o `util.parseArgs` do Node; isso afeta apenas uma invocação direta do `mocha`, não as `mochaOpts` passadas pelo `wdio`. Você pode passar essas opções do framework como argumentos, por exemplo:

```sh
wdio run wdio.conf.ts --mochaOpts.grep "my test" --mochaOpts.bail --no-mochaOpts.checkLeaks
```

Isso repassará as seguintes opções do Mocha:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

As seguintes opções do Mocha são suportadas:

#### require

<Option type="string|string[]" default="[]">

A opção `require` é útil quando você deseja adicionar ou estender alguma funcionalidade básica (opção do framework WebdriverIO).

</Option>

#### allowUncaught

<Option type="boolean" default="false">

Propagar erros não capturados.

</Option>

#### bail

<Option type="boolean" default="false">

Interromper após a primeira falha de teste.

</Option>

#### checkLeaks

<Option type="boolean" default="false">

Verificar vazamentos de variáveis globais.

</Option>

#### delay

<Option type="boolean" default="false">

Atrasar a execução da suíte raiz.

</Option>

#### failHookAffectedTests

<Option type="boolean" default="true">

Reportar cada teste ignorado por um hook `before` ou `beforeEach` com falha como uma falha. O WebdriverIO habilita isso para que um hook de setup quebrado fique visível em cada spec que ele ignorou. Defina como `false` para reportar apenas o hook.

</Option>

#### fgrep

<Option type="string" default="null">

Filtro de testes por string fornecida.

</Option>

#### forbidOnly

<Option type="boolean" default="false">

Testes marcados com `only` fazem a suíte falhar.

</Option>

#### forbidPending

<Option type="boolean" default="false">

Testes pendentes fazem a suíte falhar.

</Option>

#### fullTrace

<Option type="boolean" default="false">

Stacktrace completo em caso de falha.

</Option>

#### global

<Option type="string[]" default="[]">

Variáveis esperadas no escopo global.

</Option>

#### grep

<Option type="RegExp|string" default="null">

Filtro de testes por expressão regular fornecida. O Mocha 12 aceita flags modernas de RegExp neste filtro (por exemplo `s` ou `d`).

</Option>

#### invert

<Option type="boolean" default="false">

Inverter as correspondências do filtro de testes.

</Option>

#### retries

<Option type="number" default="0">

Número de vezes para tentar novamente testes que falharam.

</Option>

#### timeout

<Option type="number" default="30000">

Valor limite de timeout (em ms).

</Option>

## Usando Jasmine

Primeiro, instale o pacote adaptador do NPM:

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

Em seguida, você pode configurar seu ambiente Jasmine definindo uma propriedade `jasmineOpts` na sua configuração. Uma lista de todas as opções pode ser encontrada no [site do projeto Jasmine](https://jasmine.github.io/api/edge/Configuration.html).

### Opções do Jasmine

As seguintes opções podem ser aplicadas no seu `wdio.conf.js` para configurar seu ambiente Jasmine usando a propriedade `jasmineOpts`. Para mais informações sobre essas opções de configuração, consulte a [documentação do Jasmine](https://jasmine.github.io/api/edge/Configuration). Você pode passar essas opções do framework como argumentos, por exemplo:

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "my test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

Isso repassará as seguintes opções do Jasmine:

```ts
{
    grep: 'my test',
    failSpecWithNoExpectations: true,
    random: false
}
```

As seguintes opções do Jasmine são suportadas:

#### defaultTimeoutInterval

<Option type="number" default="60000">

Intervalo de timeout padrão para operações do Jasmine.

</Option>

#### helpers

<Option type="string[]" default="[]">

Array de caminhos de arquivos (e globs) relativos ao spec_dir a serem incluídos antes das specs do jasmine.

</Option>

#### requires

<Option type="string[]" default="[]">

A opção `requires` é útil quando você deseja adicionar ou estender alguma funcionalidade básica.

</Option>

#### random

<Option type="boolean" default="false">

Se a ordem de execução das specs deve ser aleatória. O padrão do próprio Jasmine é `true`, mas o WebdriverIO executa as specs em ordem, a menos que você defina esta opção.

</Option>

#### seed

<Option type="Function" default="null">

Seed a ser usada como base para a aleatorização. Null faz com que a seed seja determinada aleatoriamente no início da execução.

</Option>

#### failSpecWithNoExpectations

<Option type="boolean" default="false">

Se a spec deve falhar caso não execute nenhuma expectativa. Por padrão, uma spec que não executou nenhuma expectativa é reportada como aprovada. Definir isso como true fará com que essa spec seja reportada como falha.

</Option>

#### oneFailurePerSpec

<Option type="boolean" default="false">

Interromper uma spec na sua primeira expectativa com falha. Um matcher síncrono com falha interrompe a spec imediatamente, e um matcher assíncrono aguardado a interrompe quando sua promise é resolvida. As outras specs continuam a ser executadas.

</Option>

#### specFilter

<Option type="Function" default="(spec) => true">

Função a ser usada para filtrar specs.

</Option>

#### grep

<Option type="string|Regexp" default="null">

Executar apenas testes que correspondam a esta string ou regexp. (Aplicável apenas se nenhuma função `specFilter` personalizada estiver definida)

</Option>

#### invertGrep

<Option type="boolean" default="false">

Se true, inverte os testes correspondentes e executa apenas os testes que não correspondem à expressão usada em `grep`. (Aplicável apenas se nenhuma função `specFilter` personalizada estiver definida)

</Option>

#### stopOnSpecFailure

<Option type="boolean" default="false">

Interromper o arquivo de spec na sua primeira spec (`it`) com falha: as outras specs do arquivo não são executadas, inclusive em outros blocos `describe`. Outros arquivos de spec são executados em seus próprios workers e continuam.

</Option>

#### cleanStack

<Option type="boolean" default="true">

Remover as linhas de pacotes do `node_modules` dos stack traces das falhas.

</Option>

#### expectationResultHandler

<Option type="Function" default="null">

Chamada com `(passed, assertion)` para cada expectativa, por exemplo para tirar uma captura de tela quando uma expectativa falha. Se a função lançar um erro para uma expectativa aprovada, a expectativa falha com esse erro.

</Option>

### Asserções

Com o Jasmine, o `expect` global combina os matchers do Jasmine e os [matchers do WebdriverIO](/docs/api/expect-webdriverio):

- Os matchers do Jasmine (`toBe`, `toEqual`, `toHaveBeenCalled`, …) e os matchers que você adiciona com `jasmine.addMatchers` são síncronos. Eles retornam `undefined`, então você não precisa de `await`.
- Os matchers do WebdriverIO, os matchers assíncronos do Jasmine (`toBeResolved`, `toBeRejectedWith`, …) e os matchers que você adiciona com `jasmine.addAsyncMatchers` retornam uma promise. Sempre use `await` com eles.

Use `expect()` para ambos os tipos: ele envia cada matcher para o `expect` ou `expectAsync` do Jasmine para você. `await expectAsync($('#logo')).toBeDisplayed()` também funciona. Para TypeScript, `@wdio/jasmine-framework` em `types` também fornece os matchers do WebdriverIO para `expectAsync()`.

```js
it('checks the page', async () => {
    expect([1, 2]).toHaveSize(2)                                   // Jasmine, síncrono
    await expect($('#logo')).toHaveSize({ width: 32, height: 32 }) // WebdriverIO, assíncrono
    await expect(loadData()).toBeResolved()                        // matcher assíncrono do Jasmine
})
```

`toHaveSize` existe em ambas as bibliotecas. O matcher do WebdriverIO é executado em valores do WebdriverIO: um elemento, um array de elementos ou `Element[]` (por exemplo, o resultado de `$$().filter()`), um elemento multi-remote, um browser, um contexto de navegação, um mock, o wrapper `some()`, ou uma promise como um `$()` encadeável. O matcher do Jasmine é executado em todos os outros valores.

Os matchers assimétricos de ambas as bibliotecas funcionam, tanto no Jasmine quanto nos matchers do WebdriverIO: `jasmine.any()`, `jasmine.objectContaining()`, `jasmine.stringMatching()`, … e `expect.any()`, `expect.stringContaining()`, `expect.oneOf()`, `expect.multiRemote()`, `expect.not.stringContaining()`, …. Para usar `some()`, importe-o:

```js
import { some } from 'expect-webdriverio/api'

await expect(some($$('li'))).toHaveAttribute('data-state', 'on')
```

As partes do Jest do `expect` não estão disponíveis com o Jasmine: matchers exclusivos do Jest, como `toStrictEqual` ou `toHaveLength`, e `expect.soft()`. Para adicionar um matcher personalizado, use `expect.extend()` em um arquivo de spec ou no hook `before` (veja [Matchers Personalizados](/docs/custommatchers)), ou `jasmine.addMatchers` para um matcher síncrono e `jasmine.addAsyncMatchers` para um matcher assíncrono.

Para TypeScript, adicione `jasmine` a `types`, veja [Configuração do TypeScript](/docs/typescript).

## Usando Cucumber

Primeiro, instale o pacote adaptador do NPM:

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

Se você quiser usar o Cucumber, defina a propriedade `framework` como `cucumber` adicionando `framework: 'cucumber'` ao [arquivo de configuração](configurationfile).

As opções para o Cucumber podem ser fornecidas no arquivo de configuração com `cucumberOpts`. Confira a lista completa de opções [aqui](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options). O adaptador usa o Cucumber 13. `tagExpression` foi removido; filtre com `tags`. Veja o [guia de migração para v10](v10-migration#cucumber).

Para começar rapidamente com o Cucumber, dê uma olhada no nosso projeto [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate), que vem com todas as definições de steps de que você precisa para começar, e você estará escrevendo arquivos de feature imediatamente.

### Opções do Cucumber

As seguintes opções podem ser aplicadas no seu `wdio.conf.js` para configurar seu ambiente Cucumber usando a propriedade `cucumberOpts`:

:::tip Ajustando opções pela linha de comando
As `cucumberOpts`, como `tags` personalizadas para filtrar testes, podem ser especificadas pela linha de comando. Isso é feito usando o formato `cucumberOpts.{optionName}="value"`.

Por exemplo, se você quiser executar apenas os testes marcados com `@smoke`, pode usar o seguinte comando:

```sh
# Quando você quer executar apenas os testes que possuem a tag "@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="some scenario name" --cucumberOpts.failFast
```

Este comando define a opção `tags` em `cucumberOpts` como `@smoke`, garantindo que apenas os testes com essa tag sejam executados.

:::

#### backtrace

<Option type="Boolean" default="true">

Mostrar o backtrace completo para erros.

</Option>

#### requireModule

<Option type="string[]" default="[]">

Carregar módulos antes de carregar quaisquer arquivos de suporte.

</Option>
Exemplo:

```js
cucumberOpts: {
    requireModule: ['@babel/register']
    // ou
    requireModule: [
        [
            '@babel/register',
            {
                rootMode: 'upward',
                ignore: ['node_modules']
            }
        ]
    ]
 }
 ```

#### failFast

<Option type="boolean" default="false">

Abortar a execução na primeira falha.

</Option>

#### name

<Option type="RegExp[]" default="[]">

Executar apenas os cenários cujo nome corresponda à expressão (repetível).

</Option>

#### require

<Option type="string[]" default="[]">

Carregar arquivos contendo suas definições de steps antes de executar as features. Você também pode especificar um glob para suas definições de steps.

</Option>
Exemplo:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import

<Option type="String[]" default="[]">

Caminhos para onde está seu código de suporte, para ESM.

</Option>
Exemplo:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict

<Option type="boolean" default="false">

Falhar se houver quaisquer steps indefinidos ou pendentes.

</Option>

#### tags

<Option type="String" default="">

Executar apenas as features ou cenários com tags que correspondam à expressão.
Consulte a [documentação do Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions) para mais detalhes.

</Option>

#### timeout

<Option type="Number" default="30000">

Timeout em milissegundos para definições de steps.

</Option>

#### retry

<Option type="Number" default="0">

Especificar o número de vezes para tentar novamente casos de teste com falha.

</Option>

#### retryTagFilter

<Option type="RegExp">

Tenta novamente apenas as features ou cenários com tags que correspondam à expressão (repetível). Esta opção requer que '--retry' seja especificado.

</Option>

#### language

<Option type="String" default="en">

Idioma padrão para seus arquivos de feature

</Option>

#### order

<Option type="String" default="defined">

Executar testes em ordem definida / aleatória

</Option>

#### format

<Option type="string[]">

Nome e caminho do arquivo de saída do formatter a ser usado.
O WebdriverIO suporta principalmente apenas os [Formatters](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md) que escrevem a saída em um arquivo.

</Option>

#### formatOptions

<Option type="object">

Opções a serem fornecidas aos formatters

</Option>

#### tagsInTitle

<Option type="Boolean" default="false">

Adicionar tags do cucumber ao nome da feature ou do cenário

</Option>
***Observe que esta é uma opção específica do @wdio/cucumber-framework e não é reconhecida pelo próprio cucumber-js***<br/>

#### ignoreUndefinedDefinitions

<Option type="Boolean" default="false">

Tratar definições indefinidas como avisos.

</Option>
***Observe que esta é uma opção específica do @wdio/cucumber-framework e não é reconhecida pelo próprio cucumber-js***<br/>

#### failAmbiguousDefinitions

<Option type="Boolean" default="false">

Tratar definições ambíguas como erros.

</Option>
***Observe que esta é uma opção específica do @wdio/cucumber-framework e não é reconhecida pelo próprio cucumber-js***<br/>

#### profile

<Option type="string[]" default="[]">

Especificar o perfil a ser usado.

</Option>
***Observe que apenas valores específicos (worldParameters, name, retryTagFilter) são suportados dentro dos perfis, pois `cucumberOpts` tem precedência. Além disso, ao usar um perfil, certifique-se de que os valores mencionados não estejam declarados em `cucumberOpts`.***

### Ignorando testes no cucumber

Observe que, se você quiser ignorar um teste usando os recursos regulares de filtragem de testes do cucumber disponíveis em `cucumberOpts`, isso será feito para todos os navegadores e dispositivos configurados nas capabilities. Para poder ignorar cenários apenas para combinações específicas de capabilities sem que uma sessão seja iniciada quando não for necessário, o webdriverio fornece a seguinte sintaxe de tag específica para o cucumber:

`@skip([condition])`

onde condition é uma combinação opcional de propriedades de capabilities com seus valores que, quando **todas** corresponderem, farão com que o cenário ou feature marcado seja ignorado. É claro que você pode adicionar várias tags a cenários e features para ignorar testes sob várias condições diferentes.

Você também pode usar a anotação '@skip' para ignorar testes sem alterar `tags`. Nesse caso, os testes ignorados serão exibidos no relatório de testes.

Aqui estão alguns exemplos dessa sintaxe:
- `@skip` ou `@skip()`: sempre ignorará o item marcado
- `@skip(browserName="chrome")`: o teste não será executado em navegadores chrome.
- `@skip(browserName="firefox";platformName="linux")`: ignorará o teste em execuções do firefox no linux.
- `@skip(browserName=["chrome","firefox"])`: os itens marcados serão ignorados tanto para o navegador chrome quanto para o firefox.
- `@skip(browserName=/i.*explorer/)`: capabilities com navegadores que correspondam à regexp serão ignoradas (como `iexplorer`, `internet explorer`, `internet-explorer`, ...).

### Importar Helpers de Definição de Steps

Para usar helpers de definição de steps como `Given`, `When` ou `Then` ou hooks, você deve importá-los de `@cucumber/cucumber`, por exemplo assim:

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

Agora, se você já usa o Cucumber para outros tipos de testes não relacionados ao WebdriverIO, para os quais usa uma versão específica, você precisa importar esses helpers nos seus testes e2e a partir do pacote Cucumber do WebdriverIO, por exemplo:

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

Isso garante que você use os helpers corretos dentro do framework WebdriverIO e permite que você use uma versão independente do Cucumber para outros tipos de testes.

### Publicando Relatórios

O Cucumber oferece um recurso para publicar os relatórios das suas execuções de teste em `https://reports.cucumber.io/`, que pode ser controlado definindo a flag `publish` em `cucumberOpts` ou configurando a variável de ambiente `CUCUMBER_PUBLISH_TOKEN`. No entanto, quando você usa o `WebdriverIO` para a execução de testes, há uma limitação nessa abordagem. Ela atualiza os relatórios separadamente para cada arquivo de feature, dificultando a visualização de um relatório consolidado.

Para superar essa limitação, introduzimos um método baseado em promise chamado `publishCucumberReport` dentro do `@wdio/cucumber-framework`. Esse método deve ser chamado no hook `onComplete`, que é o local ideal para invocá-lo. `publishCucumberReport` requer como entrada o diretório onde os relatórios de mensagens do cucumber estão armazenados.

Você pode gerar relatórios `cucumber message` configurando a opção `format` em suas `cucumberOpts`. É altamente recomendável fornecer um nome de arquivo dinâmico dentro da opção de formato `cucumber message` para evitar a sobrescrita de relatórios e garantir que cada execução de teste seja registrada com precisão.

Antes de usar esta função, certifique-se de definir as seguintes variáveis de ambiente:
- CUCUMBER_PUBLISH_REPORT_URL: A URL onde você deseja publicar o relatório do Cucumber. Se não for fornecida, a URL padrão 'https://messages.cucumber.io/api/reports' será usada.
- CUCUMBER_PUBLISH_REPORT_TOKEN: O token de autorização necessário para publicar o relatório. Se esse token não estiver definido, a função será encerrada sem publicar o relatório.

Aqui está um exemplo das configurações necessárias e exemplos de código para implementação:

```javascript
import { v4 as uuidv4 } from 'uuid'
import { publishCucumberReport } from '@wdio/cucumber-framework';

export const config = {
    // ... Outras opções de configuração
    cucumberOpts: {
        // ... Configuração das opções do Cucumber
        format: [
            ['message', `./reports/${uuidv4()}.ndjson`],
            ['json', './reports/test-report.json']
        ]
    },
    async onComplete() {
        await publishCucumberReport('./reports');
    }
}
```

Observe que `./reports/` é o diretório onde os relatórios `cucumber message` serão armazenados.

## Usando Serenity/JS

O [Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) é um framework open-source projetado para tornar os testes de aceitação e de regressão de sistemas de software complexos mais rápidos, mais colaborativos e mais fáceis de escalar.

Para suítes de teste do WebdriverIO, o Serenity/JS oferece:
- [Relatórios Aprimorados](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) - Você pode usar o Serenity/JS
  como substituto direto de qualquer framework integrado do WebdriverIO para produzir relatórios detalhados de execução de testes e documentação viva do seu projeto.
- [APIs do Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - Para tornar seu código de teste portável e reutilizável entre projetos e equipes,
  o Serenity/JS oferece uma [camada de abstração](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io) opcional sobre as APIs nativas do WebdriverIO.
- [Bibliotecas de Integração](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) - Para suítes de teste que seguem o Screenplay Pattern,
  o Serenity/JS também fornece bibliotecas de integração opcionais para ajudar você a escrever [testes de API](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io),
  [gerenciar servidores locais](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io), [realizar asserções](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io) e muito mais!

![Serenity BDD Report Example](/img/serenity-bdd-reporter.png)

### Instalando o Serenity/JS

Para adicionar o Serenity/JS a um [projeto WebdriverIO existente](https://webdriver.io/docs/gettingstarted), instale os seguintes módulos do Serenity/JS a partir do NPM:

```sh npm2yarn
npm install @serenity-js/{core,web,webdriverio,assertions,console-reporter,serenity-bdd} --save-dev
```

Saiba mais sobre os módulos do Serenity/JS:
- [`@serenity-js/core`](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/web`](https://serenity-js.org/api/web/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/webdriverio`](https://serenity-js.org/api/webdriverio/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/assertions`](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/console-reporter`](https://serenity-js.org/api/console-reporter/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)

### Configurando o Serenity/JS

Para habilitar a integração com o Serenity/JS, configure o WebdriverIO da seguinte forma:

<Tabs>
<TabItem value="wdio-conf-typescript" label="TypeScript" default>

```typescript title="wdio.conf.ts"
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

export const config: WebdriverIOConfig = {

    // Diga ao WebdriverIO para usar o framework Serenity/JS
    framework: '@serenity-js/webdriverio',

    // Configuração do Serenity/JS
    serenity: {
        // Configure o Serenity/JS para usar o adaptador apropriado para o seu test runner
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Registre os serviços de relatório do Serenity/JS, também conhecidos como "stage crew"
        crew: [
            // Opcional, imprime os resultados da execução dos testes na saída padrão
            '@serenity-js/console-reporter',

            // Opcional, produz relatórios do Serenity BDD e documentação viva (HTML)
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // Opcional, captura automaticamente screenshots em caso de falha na interação
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Configure seu runner do Cucumber
    cucumberOpts: {
        // veja as opções de configuração do Cucumber abaixo
    },

    // ... ou o runner do Jasmine
    jasmineOpts: {
        // veja as opções de configuração do Jasmine abaixo
    },

    // ... ou o runner do Mocha
    mochaOpts: {
        // veja as opções de configuração do Mocha abaixo
    },

    runner: 'local',

    // Qualquer outra configuração do WebdriverIO
};
```

</TabItem>
<TabItem value="wdio-conf-javascript" label="JavaScript">

```typescript title="wdio.conf.js"
export const config = {

    // Diga ao WebdriverIO para usar o framework Serenity/JS
    framework: '@serenity-js/webdriverio',

    // Configuração do Serenity/JS
    serenity: {
        // Configure o Serenity/JS para usar o adaptador apropriado para o seu test runner
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Registre os serviços de relatório do Serenity/JS, também conhecidos como "stage crew"
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Configure seu runner do Cucumber
    cucumberOpts: {
        // veja as opções de configuração do Cucumber abaixo
    },

    // ... ou o runner do Jasmine
    jasmineOpts: {
        // veja as opções de configuração do Jasmine abaixo
    },

    // ... ou o runner do Mocha
    mochaOpts: {
        // veja as opções de configuração do Mocha abaixo
    },

    runner: 'local',

    // Qualquer outra configuração do WebdriverIO
};
```

</TabItem>
</Tabs>

Saiba mais sobre:
- [Opções de configuração do Cucumber no Serenity/JS](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Opções de configuração do Jasmine no Serenity/JS](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Opções de configuração do Mocha no Serenity/JS](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Arquivo de configuração do WebdriverIO](configurationfile)

### Produzindo relatórios do Serenity BDD e documentação viva

Os [relatórios do Serenity BDD e a documentação viva](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports) são gerados pelo [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli),
um programa Java baixado e gerenciado pelo módulo [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io).

Para produzir relatórios do Serenity BDD, sua suíte de testes deve:
- baixar o Serenity BDD CLI, chamando `serenity-bdd update`, que armazena em cache o `jar` do CLI localmente
- produzir relatórios intermediários `.json` do Serenity BDD, registrando o [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) conforme as [instruções de configuração](#configuring-serenityjs)
- invocar o Serenity BDD CLI quando quiser produzir o relatório, chamando `serenity-bdd run`

O padrão usado por todos os [Templates de Projeto do Serenity/JS](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio) depende
do uso de:
- um script NPM [`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order) para baixar o Serenity BDD CLI
- [`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe) para executar o processo de geração de relatórios mesmo que a própria suíte de testes tenha falhado (que é exatamente quando você mais precisa dos relatórios de teste...).
- [`rimraf`](https://www.npmjs.com/package/rimraf) como um método conveniente para remover quaisquer relatórios de teste remanescentes da execução anterior

```json title="package.json"
{
  "scripts": {
    "postinstall": "serenity-bdd update",
    "clean": "rimraf target",
    "test": "failsafe clean test:execute test:report",
    "test:execute": "wdio wdio.conf.ts",
    "test:report": "serenity-bdd run"
  }
}
```

Para saber mais sobre o `SerenityBDDReporter`, consulte:
- as instruções de instalação na [documentação do `@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io),
- os exemplos de configuração na [documentação da API do `SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io),
- os [exemplos do Serenity/JS no GitHub](https://github.com/serenity-js/serenity-js/tree/main/examples).

### Usando as APIs do Screenplay Pattern do Serenity/JS

O [Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) é uma abordagem inovadora e centrada no usuário para escrever testes de aceitação automatizados de alta qualidade. Ele orienta você para um uso eficaz de camadas de abstração,
ajuda seus cenários de teste a capturar o vocabulário de negócio do seu domínio e incentiva bons hábitos de teste e de engenharia de software na sua equipe.

Por padrão, quando você registra `@serenity-js/webdriverio` como o `framework` do WebdriverIO,
o Serenity/JS configura um [elenco](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io) padrão de [atores](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io),
onde cada ator pode:
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

Isso deve ser suficiente para ajudar você a começar a introduzir cenários de teste que seguem o Screenplay Pattern, mesmo em uma suíte de testes existente, por exemplo:

```typescript title="specs/example.spec.ts"
import { actorCalled } from '@serenity-js/core'
import { Navigate, Page } from '@serenity-js/web'
import { Ensure, equals } from '@serenity-js/assertions'

describe('My awesome website', () => {
    it('can have test scenarios that follow the Screenplay Pattern', async () => {
        await actorCalled('Alice').attemptsTo(
            Navigate.to(`https://webdriver.io`),
            Ensure.that(
                Page.current().title(),
                equals(`WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO`)
            ),
        )
    })

    it('can have non-Screenplay scenarios too', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser)
            .toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Para saber mais sobre o Screenplay Pattern, confira:
- [O Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Testes web com Serenity/JS](https://serenity-js.org/handbook/web-testing/?pk_campaign=wdio8&pk_source=webdriver.io)
- ["BDD in Action, Second Edition"](https://www.manning.com/books/bdd-in-action-second-edition)