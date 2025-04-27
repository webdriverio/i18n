---
id: frameworks
title: Frameworks
---

O WebdriverIO Runner tem suporte integrado para [Mocha](http://mochajs.org/), [Jasmine](http://jasmine.github.io/) e [Cucumber.js](https://cucumber.io/). Você também pode integrá-lo com frameworks de código aberto de terceiros, como [Serenity/JS](#using-serenityjs).

:::tip Integrando WebdriverIO com frameworks de teste
Para integrar o WebdriverIO com um framework de teste, você precisa de um pacote adaptador disponível no NPM.
Observe que o pacote adaptador deve ser instalado no mesmo local onde o WebdriverIO está instalado.
Portanto, se você instalou o WebdriverIO globalmente, certifique-se de instalar o pacote adaptador globalmente também.
:::

Integrar o WebdriverIO com um framework de teste permite que você acesse a instância do WebDriver usando a variável global `browser`
em seus arquivos de especificação ou definições de passos.
Observe que o WebdriverIO também cuidará de instanciar e encerrar a sessão do Selenium, para que você não precise fazer isso
por conta própria.

## Usando Mocha

Primeiro, instale o pacote adaptador do NPM:

```bash npm2yarn
npm install @wdio/mocha-framework --save-dev
```

Por padrão, o WebdriverIO fornece uma [biblioteca de asserções](assertion) que está integrada e que você pode começar a usar imediatamente:

```js
describe('my awesome website', () => {
    it('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

O WebdriverIO suporta as interfaces `BDD` (padrão), `TDD` e `QUnit` do Mocha [interfaces](https://mochajs.org/#interfaces).

Se você gosta de escrever suas especificações no estilo TDD, defina a propriedade `ui` em sua configuração `mochaOpts` como `tdd`. Agora seus arquivos de teste devem ser escritos assim:

```js
suite('my awesome website', () => {
    test('should do some assertions', async () => {
        await browser.url('https://webdriver.io')
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO')
    })
})
```

Se você quiser definir outras configurações específicas do Mocha, pode fazê-lo com a chave `mochaOpts` em seu arquivo de configuração. Uma lista de todas as opções pode ser encontrada no [site do projeto Mocha](https://mochajs.org/api/mocha).

__Nota:__ O WebdriverIO não suporta o uso obsoleto de callbacks `done` no Mocha:

```js
it('should test something', (done) => {
    done() // lança "done is not a function"
})
```

### Opções do Mocha

As seguintes opções podem ser aplicadas em seu `wdio.conf.js` para configurar seu ambiente Mocha. __Nota:__ nem todas as opções são suportadas, por exemplo, aplicar a opção `parallel` causará um erro pois o testrunner WDIO tem sua própria maneira de executar testes em paralelo. Você pode passar essas opções de framework como argumentos, por exemplo:

```sh
wdio run wdio.conf.ts --mochaOpts.grep "my test" --mochaOpts.bail --no-mochaOpts.checkLeaks
```

Isso passará as seguintes opções do Mocha:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

As seguintes opções do Mocha são suportadas:

#### require
A opção `require` é útil quando você deseja adicionar ou estender alguma funcionalidade básica (opção do framework WebdriverIO).

Type: `string|string[]`<br />
Default: `[]`

#### compilers
Use os módulos fornecidos para compilar arquivos. Os compiladores serão incluídos antes dos requires (opção do framework WebdriverIO).

Type: `string[]`<br />
Default: `[]`

#### allowUncaught
Propaga erros não capturados.

Type: `boolean`<br />
Default: `false`

#### bail
Interrompe após a primeira falha de teste.

Type: `boolean`<br />
Default: `false`

#### checkLeaks
Verifica se há vazamentos de variáveis globais.

Type: `boolean`<br />
Default: `false`

#### delay
Atrasa a execução da suíte raiz.

Type: `boolean`<br />
Default: `false`

#### fgrep
Filtro de teste pela string fornecida.

Type: `string`<br />
Default: `null`

#### forbidOnly
Testes marcados com `only` falham na suíte.

Type: `boolean`<br />
Default: `false`

#### forbidPending
Testes pendentes falham na suíte.

Type: `boolean`<br />
Default: `false`

#### fullTrace
Rastreamento completo da pilha em caso de falha.

Type: `boolean`<br />
Default: `false`

#### global
Variáveis esperadas no escopo global.

Type: `string[]`<br />
Default: `[]`

#### grep
Filtro de teste pela expressão regular fornecida.

Type: `RegExp|string`<br />
Default: `null`

#### invert
Inverte as correspondências do filtro de teste.

Type: `boolean`<br />
Default: `false`

#### retries
Número de vezes para tentar novamente testes com falha.

Type: `number`<br />
Default: `0`

#### timeout
Valor limite de tempo limite (em ms).

Type: `number`<br />
Default: `30000`

## Usando Jasmine

Primeiro, instale o pacote adaptador do NPM:

```bash npm2yarn
npm install @wdio/jasmine-framework --save-dev
```

Você pode então configurar seu ambiente Jasmine definindo uma propriedade `jasmineOpts` em sua configuração. Uma lista de todas as opções pode ser encontrada no [site do projeto Jasmine](https://jasmine.github.io/api/3.5/Configuration.html).

### Opções do Jasmine

As seguintes opções podem ser aplicadas em seu `wdio.conf.js` para configurar seu ambiente Jasmine usando a propriedade `jasmineOpts`. Para mais informações sobre essas opções de configuração, consulte a [documentação do Jasmine](https://jasmine.github.io/api/edge/Configuration). Você pode passar essas opções de framework como argumentos, por exemplo:

```sh
wdio run wdio.conf.ts --jasmineOpts.grep "my test" --jasmineOpts.failSpecWithNoExpectations --no-jasmineOpts.random
```

Isso passará as seguintes opções do Mocha:

```ts
{
    grep: ['my-test'],
    bail: true
    checkLeacks: false
}
```

As seguintes opções do Jasmine são suportadas:

#### defaultTimeoutInterval
Intervalo de Tempo Limite Padrão para operações do Jasmine.

Type: `number`<br />
Default: `60000`

#### helpers
Matriz de caminhos de arquivo (e globs) relativos a spec_dir para incluir antes das especificações do jasmine.

Type: `string[]`<br />
Default: `[]`

#### requires
A opção `requires` é útil quando você deseja adicionar ou estender alguma funcionalidade básica.

Type: `string[]`<br />
Default: `[]`

#### random
Se deve randomizar a ordem de execução de especificações.

Type: `boolean`<br />
Default: `true`

#### seed
Semente a ser usada como base para randomização. Nulo faz com que a semente seja determinada aleatoriamente no início da execução.

Type: `Function`<br />
Default: `null`

#### failSpecWithNoExpectations
Se deve falhar a especificação se ela não executou nenhuma expectativa. Por padrão, uma especificação que não executou nenhuma expectativa é relatada como aprovada. Definir isso como true relatará tal especificação como uma falha.

Type: `boolean`<br />
Default: `false`

#### oneFailurePerSpec
Se deve fazer com que as especificações tenham apenas uma falha de expectativa.

Type: `boolean`<br />
Default: `false`

#### specFilter
Função a ser usada para filtrar especificações.

Type: `Function`<br />
Default: `(spec) => true`

#### grep
Execute apenas testes que correspondam a esta string ou expressão regular. (Aplicável apenas se nenhuma função personalizada `specFilter` for definida)

Type: `string|Regexp`<br />
Default: `null`

#### invertGrep
Se verdadeiro, inverte os testes correspondentes e executa apenas testes que não correspondam à expressão usada em `grep`. (Aplicável apenas se nenhuma função personalizada `specFilter` for definida)

Type: `boolean`<br />
Default: `false`

## Usando Cucumber

Primeiro, instale o pacote adaptador do NPM:

```bash npm2yarn
npm install @wdio/cucumber-framework --save-dev
```

Se você deseja usar o Cucumber, defina a propriedade `framework` como `cucumber` adicionando `framework: 'cucumber'` ao [arquivo de configuração](configurationfile).

As opções para o Cucumber podem ser definidas no arquivo de configuração com `cucumberOpts`. Confira a lista completa de opções [aqui](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-cucumber-framework#cucumberopts-options).

Para começar rapidamente com o Cucumber, dê uma olhada em nosso projeto [`cucumber-boilerplate`](https://github.com/webdriverio/cucumber-boilerplate) que vem com todas as definições de passos necessárias para começar, e você estará escrevendo arquivos de recursos imediatamente.

### Opções do Cucumber

As seguintes opções podem ser aplicadas em seu `wdio.conf.js` para configurar seu ambiente Cucumber usando a propriedade `cucumberOpts`:

:::tip Ajustando opções pela linha de comando
As `cucumberOpts`, como as `tags` personalizadas para filtrar testes, podem ser especificadas pela linha de comando. Isso é feito usando o formato `cucumberOpts.{optionName}="value"`.

Por exemplo, se você quiser executar apenas os testes que possuem a tag `@smoke`, pode usar o seguinte comando:

```sh
# Quando você só deseja executar testes que possuem a tag "@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.tags="@smoke"
npx wdio run ./wdio.conf.js --cucumberOpts.name="nome de algum cenário" --cucumberOpts.failFast
```

Este comando define a opção `tags` em `cucumberOpts` como `@smoke`, garantindo que apenas os testes com esta tag sejam executados.

:::

#### backtrace
Mostrar rastreamento completo para erros.

Type: `Boolean`<br />
Default: `true`

#### requireModule
Requer módulos antes de exigir quaisquer arquivos de suporte.

Type: `string[]`<br />
Default: `[]`<br />
Example:

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
Aborta a execução na primeira falha.

Type: `boolean`<br />
Default: `false`

#### name
Execute apenas os cenários com nome correspondente à expressão (repetível).

Type: `RegExp[]`<br />
Default: `[]`

#### require
Requer arquivos contendo suas definições de etapas antes de executar features. Você também pode especificar um glob para suas definições de etapas.

Type: `string[]`<br />
Default: `[]`
Example:

```js
cucumberOpts: {
    require: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### import
Caminhos para onde está seu código de suporte, para ESM.

Type: `String[]`<br />
Default: `[]`
Example:

```js
cucumberOpts: {
    import: [path.join(__dirname, 'step-definitions', 'my-steps.js')]
}
```

#### strict
Falha se houver etapas indefinidas ou pendentes.

Type: `boolean`<br />
Default: `false`

#### tags
Execute apenas as features ou cenários com tags correspondentes à expressão.
Consulte a [documentação do Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions) para mais detalhes.

Type: `String`<br />
Default: ``

#### timeout
Tempo limite em milissegundos para definições de etapas.

Type: `Number`<br />
Default: `30000`

#### retry
Especifique o número de vezes para tentar novamente casos de teste com falha.

Type: `Number`<br />
Default: `0`

#### retryTagFilter
Apenas tenta novamente as features ou cenários com tags correspondentes à expressão (repetível). Esta opção requer '--retry' para ser especificada.

Type: `RegExp`

#### language
Idioma padrão para seus arquivos de feature

Type: `String`<br />
Default: `en`

#### order
Execute testes em ordem definida / aleatória

Type: `String`<br />
Default: `defined`

#### format
Nome e caminho do arquivo de saída do formatador a ser usado.
O WebdriverIO suporta principalmente apenas os [Formatadores](https://github.com/cucumber/cucumber-js/blob/main/docs/formatters.md) que escrevem saída para um arquivo.

Type: `string[]`<br />

#### formatOptions
Opções a serem fornecidas aos formatadores

Type: `object`<br />

#### tagsInTitle
Adiciona tags do cucumber ao nome da feature ou cenário

Type: `Boolean`<br />
Default: `false`

***Observe que esta é uma opção específica do @wdio/cucumber-framework e não reconhecida pelo próprio cucumber-js***<br/>

#### ignoreUndefinedDefinitions
Trata definições não definidas como avisos.

Type: `Boolean`<br />
Default: `false`

***Observe que esta é uma opção específica do @wdio/cucumber-framework e não reconhecida pelo próprio cucumber-js***<br/>

#### failAmbiguousDefinitions
Trata definições ambíguas como erros.

Type: `Boolean`<br />
Default: `false`

***Observe que esta é uma opção específica do @wdio/cucumber-framework e não reconhecida pelo próprio cucumber-js***<br/>

#### tagExpression
Execute apenas as features ou cenários com tags correspondentes à expressão.
Consulte a [documentação do Cucumber](https://docs.cucumber.io/cucumber/api/#tag-expressions) para mais detalhes.

Type: `String`<br />
Default: ``

***Observe que esta opção será descontinuada no futuro. Use a propriedade de configuração [`tags`](#tags) em vez disso***

#### profile
Especifique o perfil a ser usado.

Type: `string[]`<br />
Default: `[]`

***Observe que apenas valores específicos (worldParameters, name, retryTagFilter) são suportados dentro de perfis, pois `cucumberOpts` tem precedência. Além disso, ao usar um perfil, certifique-se de que os valores mencionados não estejam declarados dentro de `cucumberOpts`.***

### Pulando testes no cucumber

Observe que se você quiser pular um teste usando as capacidades regulares de filtragem de testes do cucumber disponíveis em `cucumberOpts`, você fará isso para todos os navegadores e dispositivos configurados nas capabilities. Para poder pular cenários apenas para combinações específicas de capabilities sem ter uma sessão iniciada se não for necessário, o webdriverio fornece a seguinte sintaxe de tag específica para cucumber:

`@skip([condition])`

onde a condição é uma combinação opcional de propriedades de capabilities com seus valores que, quando **todos** corresponderem com a causa, o cenário ou feature marcada será pulado. Claro que você pode adicionar várias tags a cenários e features para pular um teste sob várias condições diferentes.

Você também pode usar a anotação '@skip' para pular testes sem alterar `tagExpression'. Neste caso, os testes pulados serão exibidos no relatório de teste.

Aqui você tem alguns exemplos dessa sintaxe:
- `@skip` ou `@skip()`: sempre pulará o item marcado
- `@skip(browserName="chrome")`: o teste não será executado em navegadores chrome.
- `@skip(browserName="firefox";platformName="linux")`: pulará o teste em execuções de firefox sobre linux.
- `@skip(browserName=["chrome","firefox"])`: itens marcados serão pulados para navegadores chrome e firefox.
- `@skip(browserName=/i.*explorer/)`: capabilities com navegadores correspondentes à regexp serão pulados (como `iexplorer`, `internet explorer`, `internet-explorer`, ...).

### Importar Auxiliar de Definição de Passos

Para usar o auxiliar de definição de etapas como `Given`, `When` ou `Then` ou hooks, você deve importá-los do `@cucumber/cucumber`, por exemplo, assim:

```js
import { Given, When, Then } from '@cucumber/cucumber'
```

Agora, se você já usa o Cucumber para outros tipos de testes não relacionados ao WebdriverIO para os quais usa uma versão específica, você precisa importar esses auxiliares em seus testes e2e do pacote WebdriverIO Cucumber, por exemplo:

```js
import { Given, When, Then, world, context } from '@wdio/cucumber-framework'
```

Isso garante que você use os auxiliares corretos dentro do framework WebdriverIO e permite que você use uma versão independente do Cucumber para outros tipos de testes.

### Publicando Relatório

O Cucumber fornece um recurso para publicar os relatórios de execução de seus testes em `https://reports.cucumber.io/`, que pode ser controlado definindo a flag `publish` em `cucumberOpts` ou configurando a variável de ambiente `CUCUMBER_PUBLISH_TOKEN`. No entanto, quando você usa o `WebdriverIO` para execução de teste, existe uma limitação com essa abordagem. Ele atualiza os relatórios separadamente para cada arquivo de feature, dificultando a visualização de um relatório consolidado.

Para superar essa limitação, introduzimos um método baseado em promessa chamado `publishCucumberReport` dentro do `@wdio/cucumber-framework`. Este método deve ser chamado no hook `onComplete`, que é o local ideal para invocá-lo. `publishCucumberReport` requer a entrada do diretório de relatório onde os relatórios de mensagem do cucumber são armazenados.

Você pode gerar relatórios de `mensagem cucumber` configurando a opção `format` em seu `cucumberOpts`. É altamente recomendável fornecer um nome de arquivo dinâmico dentro da opção de formato de `mensagem cucumber` para evitar a substituição de relatórios e garantir que cada execução de teste seja registrada com precisão.

Antes de usar esta função, certifique-se de definir as seguintes variáveis de ambiente:
- CUCUMBER_PUBLISH_REPORT_URL: A URL onde você deseja publicar o relatório Cucumber. Se não fornecido, a URL padrão 'https://messages.cucumber.io/api/reports' será usada.
- CUCUMBER_PUBLISH_REPORT_TOKEN: O token de autorização necessário para publicar o relatório. Se este token não estiver definido, a função sairá sem publicar o relatório.

Aqui está um exemplo das configurações necessárias e amostras de código para implementação:

```javascript
import { v4 as uuidv4 } from 'uuid'
import { publishCucumberReport } from '@wdio/cucumber-framework';

export const config = {
    // ... Outras Opções de Configuração
    cucumberOpts: {
        // ... Configuração de Opções do Cucumber
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

Observe que `./reports/` é o diretório onde os relatórios de `mensagem cucumber` serão armazenados.

## Usando Serenity/JS

[Serenity/JS](https://serenity-js.org?pk_campaign=wdio8&pk_source=webdriver.io) é um framework de código aberto projetado para tornar os testes de aceitação e regressão de sistemas de software complexos mais rápidos, mais colaborativos e mais fáceis de escalar.

Para suítes de teste WebdriverIO, Serenity/JS oferece:
- [Relatórios Aprimorados](https://serenity-js.org/handbook/reporting/?pk_campaign=wdio8&pk_source=webdriver.io) - Você pode usar Serenity/JS
  como um substituto direto de qualquer framework WebdriverIO integrado para produzir relatórios de execução de testes detalhados e documentação viva do seu projeto.
- [APIs de Padrão Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) - Para tornar seu código de teste portátil e reutilizável entre projetos e equipes,
  Serenity/JS oferece uma [camada de abstração](https://serenity-js.org/api/webdriverio?pk_campaign=wdio8&pk_source=webdriver.io) opcional sobre as APIs nativas do WebdriverIO.
- [Bibliotecas de Integração](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io) - Para suítes de teste que seguem o Padrão Screenplay,
  Serenity/JS também fornece bibliotecas de integração opcionais para ajudá-lo a escrever [testes de API](https://serenity-js.org/api/rest/?pk_campaign=wdio8&pk_source=webdriver.io),
  [gerenciar servidores locais](https://serenity-js.org/api/local-server/?pk_campaign=wdio8&pk_source=webdriver.io), [realizar asserções](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io), e mais!

![Exemplo de Relatório Serenity BDD](/img/serenity-bdd-reporter.png)

### Instalando Serenity/JS

Para adicionar Serenity/JS a um [projeto WebdriverIO existente](https://webdriver.io/docs/gettingstarted), instale os seguintes módulos Serenity/JS do NPM:

```sh npm2yarn
npm install @serenity-js/{core,web,webdriverio,assertions,console-reporter,serenity-bdd} --save-dev
```

Saiba mais sobre os módulos Serenity/JS:
- [`@serenity-js/core`](https://serenity-js.org/api/core/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/web`](https://serenity-js.org/api/web/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/webdriverio`](https://serenity-js.org/api/webdriverio/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/assertions`](https://serenity-js.org/api/assertions/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/console-reporter`](https://serenity-js.org/api/console-reporter/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io)

### Configurando Serenity/JS

Para habilitar a integração com Serenity/JS, configure o WebdriverIO da seguinte forma:

<Tabs>
<TabItem value="wdio-conf-typescript" label="TypeScript" default>

```typescript title="wdio.conf.ts"
import { WebdriverIOConfig } from '@serenity-js/webdriverio';

export const config: WebdriverIOConfig = {

    // Diga ao WebdriverIO para usar o framework Serenity/JS
    framework: '@serenity-js/webdriverio',

    // Configuração do Serenity/JS
    serenity: {
        // Configure o Serenity/JS para usar o adaptador apropriado para seu executor de teste
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Registre os serviços de relatório do Serenity/JS, também conhecidos como "equipe de palco"
        crew: [
            // Opcional, imprime os resultados da execução do teste para a saída padrão
            '@serenity-js/console-reporter',

            // Opcional, produz relatórios Serenity BDD e documentação viva (HTML)
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],

            // Opcional, captura automaticamente screenshots após falha de interação
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Configure seu executor Cucumber
    cucumberOpts: {
        // veja as opções de configuração do Cucumber abaixo
    },


    // ... ou executor Jasmine
    jasmineOpts: {
        // veja as opções de configuração do Jasmine abaixo
    },

    // ... ou executor Mocha
    mochaOpts: {
        // veja as opções de configuração do Mocha abaixo
    },

    runner: 'local',

    // Qualquer outra configuração WebdriverIO
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
        // Configure o Serenity/JS para usar o adaptador apropriado para seu executor de teste
        runner: 'cucumber',
        // runner: 'mocha',
        // runner: 'jasmine',

        // Registre os serviços de relatório do Serenity/JS, também conhecidos como "equipe de palco"
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfFailures' } ],
        ]
    },

    // Configure seu executor Cucumber
    cucumberOpts: {
        // veja as opções de configuração do Cucumber abaixo
    },


    // ... ou executor Jasmine
    jasmineOpts: {
        // veja as opções de configuração do Jasmine abaixo
    },

    // ... ou executor Mocha
    mochaOpts: {
        // veja as opções de configuração do Mocha abaixo
    },

    runner: 'local',

    // Qualquer outra configuração WebdriverIO
};
```

</TabItem>
</Tabs>

Saiba mais sobre:
- [Opções de configuração Serenity/JS Cucumber](https://serenity-js.org/api/cucumber-adapter/interface/CucumberConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Opções de configuração Serenity/JS Jasmine](https://serenity-js.org/api/jasmine-adapter/interface/JasmineConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Opções de configuração Serenity/JS Mocha](https://serenity-js.org/api/mocha-adapter/interface/MochaConfig/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Arquivo de configuração WebdriverIO](configurationfile)

### Produzindo relatórios Serenity BDD e documentação viva

[Relatórios e documentação viva Serenity BDD](https://serenity-bdd.github.io/docs/reporting/the_serenity_reports) são gerados pelo [Serenity BDD CLI](https://github.com/serenity-bdd/serenity-core/tree/main/serenity-cli),
um programa Java baixado e gerenciado pelo módulo [`@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io).

Para produzir relatórios Serenity BDD, sua suíte de teste deve:
- baixar o Serenity BDD CLI, chamando `serenity-bdd update` que armazena o CLI `jar` localmente em cache
- produzir relatórios intermediários Serenity BDD `.json`, registrando [`SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io) conforme as [instruções de configuração](#configurando-serenityjs)
- invocar o Serenity BDD CLI quando você quiser produzir o relatório, chamando `serenity-bdd run`

O padrão usado por todos os [Modelos de Projeto Serenity/JS](https://serenity-js.org/handbook/project-templates/?pk_campaign=wdio8&pk_source=webdriver.io#webdriverio) depende
do uso de:
- um script NPM [`postinstall`](https://docs.npmjs.com/cli/v9/using-npm/scripts#life-cycle-operation-order) para baixar o Serenity BDD CLI
- [`npm-failsafe`](https://www.npmjs.com/package/npm-failsafe) para executar o processo de relatório mesmo que a própria suíte de teste tenha falhado (que é precisamente quando você mais precisa de relatórios de teste...).
- [`rimraf`](https://www.npmjs.com/package/rimraf) como um método conveniente para remover quaisquer relatórios de teste deixados da execução anterior

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
- instruções de instalação na [documentação do `@serenity-js/serenity-bdd`](https://serenity-js.org/api/serenity-bdd/?pk_campaign=wdio8&pk_source=webdriver.io),
- exemplos de configuração nos [documentos da API do `SerenityBDDReporter`](https://serenity-js.org/api/serenity-bdd/class/SerenityBDDReporter/?pk_campaign=wdio8&pk_source=webdriver.io),
- [exemplos de Serenity/JS no GitHub](https://github.com/serenity-js/serenity-js/tree/main/examples).

### Usando APIs de Padrão Screenplay do Serenity/JS

O [Padrão Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io) é uma abordagem inovadora e centrada no usuário para escrever testes de aceitação automatizados de alta qualidade. Ele orienta você para um uso eficaz das camadas de abstração,
ajuda seus cenários de teste a capturar a linguagem comercial do seu domínio e incentiva bons hábitos de teste e engenharia de software em sua equipe.

Por padrão, quando você registra `@serenity-js/webdriverio` como seu `framework` WebdriverIO,
Serenity/JS configura um [elenco](https://serenity-js.org/api/core/class/Cast/?pk_campaign=wdio8&pk_source=webdriver.io) padrão de [atores](https://serenity-js.org/api/core/class/Actor/?pk_campaign=wdio8&pk_source=webdriver.io),
onde cada ator pode:
- [`BrowseTheWebWithWebdriverIO`](https://serenity-js.org/api/webdriverio/class/BrowseTheWebWithWebdriverIO/?pk_campaign=wdio8&pk_source=webdriver.io)
- [`TakeNotes.usingAnEmptyNotepad()`](https://serenity-js.org/api/core/class/TakeNotes/?pk_campaign=wdio8&pk_source=webdriver.io)

Isso deve ser suficiente para ajudá-lo a começar a introduzir cenários de teste que seguem o Padrão Screenplay mesmo em uma suíte de teste existente, por exemplo:

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

Para saber mais sobre o Padrão Screenplay, confira:
- [O Padrão Screenplay](https://serenity-js.org/handbook/design/screenplay-pattern/?pk_campaign=wdio8&pk_source=webdriver.io)
- [Teste web com Serenity/JS](https://serenity-js.org/handbook/web-testing/?pk_campaign=wdio8&pk_source=webdriver.io)
- ["BDD em Ação, Segunda Edição"](https://www.manning.com/books/bdd-in-action-second-edition)