---
id: allure-reporter
title: Relatório Allure
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-allure-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Um plugin de reporter para WebdriverIO para criar [Relatórios de Teste Allure](https://allurereport.org/docs/webdriverio/).

![Exemplo de Relatório Allure](/img/allure.png)

## Instalação

A maneira mais fácil é incluir `@wdio/allure-reporter` como uma devDependency no seu `package.json`.

```json
{
  "devDependencies": {
    "@wdio/allure-reporter": "^7.0.0"
  }
}
```

Você pode simplesmente fazer isso com:

```sh
npm install @wdio/allure-reporter --save-dev
```

## Configuração

Configure o diretório de saída no seu arquivo wdio.conf.js:

```js
export const config = {
    // ...
    reporters: [['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: true,
    }]],
    // ...
}
```
- `outputDir` por padrão é `./allure-results`. Após a conclusão de uma execução de teste, você encontrará este diretório populado com um arquivo `.xml` para cada spec, além de vários arquivos `.txt` e `.png` e outros anexos.
- `disableWebdriverStepsReporting` - parâmetro opcional (`false` por padrão), para registrar apenas etapas personalizadas no relatório.
- `issueLinkTemplate` - parâmetro opcional, para especificar o padrão de link para problemas. O reporter substituirá o espaço reservado `{}` pelo valor especificado na chamada do parâmetro `addIssue(value)`. A mesma lógica é aplicada se o Cucumber for usado e a tag `issue` for definida em qualquer nível, ela será convertida no link no relatório. Exemplo de valor do parâmetro:
  ```
  https://example.org/issue/{}
  ```
- `tmsLinkTemplate` - parâmetro opcional, para especificar o padrão de link do TMS (Sistema de Gerenciamento de Testes). O reporter substituirá o espaço reservado `{}` pelo valor especificado na chamada do parâmetro `addTestId(value)`. A mesma lógica é aplicada se o Cucumber for usado e a tag `testId` for definida em qualquer nível, ela será convertida no link no relatório. Exemplo de valor do parâmetro:
  ```
  https://example.org/tms/{}
  ```
- `disableWebdriverScreenshotsReporting` - parâmetro opcional (`false` por padrão), para não anexar capturas de tela ao relatório.
- `useCucumberStepReporter` - parâmetro opcional (`false` por padrão), defina como true para alterar a hierarquia do relatório ao usar o cucumber. Teste você mesmo para ver como fica.
- `disableMochaHooks` - parâmetro opcional (`false` por padrão), defina como true para não incluir os hooks `before/after` stacktrace/screenshot/result no Relatório Allure.
- `addConsoleLogs` - parâmetro opcional (`false` por padrão), defina como true para anexar logs do console da etapa ao relatório.
- `reportedEnvironmentVars` (**tipo:** `Record<string, string>`) - Defina esta opção para exibir as variáveis de ambiente no relatório. Observe que configurar isso não modifica as variáveis de ambiente reais.

## API Allure Suportada
* `addLabel(name, value)` - atribuir um rótulo personalizado ao teste
* `addFeature(featureName)` – atribuir recursos ao teste
* `addStory(storyName)` – atribuir história de usuário ao teste
* `addSeverity(value)` – atribuir gravidade ao teste, aceita um destes valores: blocker, critical, normal, minor, trivial
* `addTag(value)` – atribuir um rótulo de tag ao teste
* `addEpic(value)` – atribuir um rótulo de épico ao teste
* `addOwner(value)` – atribuir um rótulo de proprietário ao teste
* `addSuite(value)` – atribuir um rótulo de suite ao teste
* `addSubSuite(value)` – atribuir um rótulo de sub suite ao teste
* `addParentSuite(value)` – atribuir um rótulo de suite pai ao teste
* `addIssue(value)` – atribuir ID de problema ao teste
* `addAllureId(value)` – atribuir rótulo de ID de teste Allure ops ao teste
* `addTestId(value)` – atribuir ID de teste TMS ao teste
* ~~`addEnvironment(name, value)` ~~ – uma função obsoleta que não funciona mais. Use `reportedEnvironmentVars` em vez disso
* `addAttachment(name, content, [type])` – salvar anexo no teste.
    * `name` (*String*) - nome do anexo.
    * `content` – conteúdo do anexo.
    * `type` (*String*, opcional) – MIME-type do anexo, `text/plain` por padrão
* `addArgument(name, value)` - adicionar um argumento adicional ao teste
* `addDescription(description, [type])` – adicionar descrição ao teste.
    * `description` (*String*) - descrição do teste.
    * `type` (*String*, opcional) – tipo de descrição, `text` por padrão. Valores ['text', 'html','markdown']
* `addStep(title, [{content, name = 'attachment'}], [status])` - adicionar etapa ao teste.
    * `title` (*String*) - nome da etapa.
    * `content` (*String*, opcional) - anexo da etapa
    * `name` (*String*, opcional) - nome do anexo da etapa, `attachment` por padrão.
    * `status` (*String*, opcional) - status da etapa, `passed` por padrão. Deve ser "failed", "passed" ou "broken"
* `startStep(title)` - iniciar com uma etapa
    * `title` (*String*) - nome da etapa.
* `endStep(status)` - finalizar com uma etapa
    * `status` (*String*, opcional) - status da etapa, `passed` por padrão. Deve ser "failed", "passed" ou "broken"
* `step(name, body)` - inicia a etapa com função de conteúdo dentro. Permite criar etapas com hierarquia infinita
    * `body` (*Function*) - a função assíncrona do corpo da etapa

### Uso
A API Allure pode ser acessada usando:

CJS

```js
const allureReporter = require('@wdio/allure-reporter').default
```

ESM

```js
import allureReporter from '@wdio/allure-reporter'
```

Exemplo Mocha

```js
describe('Suite', () => {
    it('Case', () => {
        allureReporter.addFeature('Feature')
    })
})
```

#### Cucumber

Exemplo básico do Cucumber:

```js
Given('I include feature and story name', () => {
    allureReporter.addFeature('Feature_name');
    allureReporter.addStory('Story_name');
})
```

#### Etapas personalizadas

O método `step` simplifica o tratamento de etapas porque cada etapa é apresentada como uma função assíncrona com qualquer conteúdo dentro.
O primeiro argumento da função é a etapa atual, que possui a maioria dos métodos da API allure (como `label`, `epic`, `attach` etc):

```js
allureReporter.step('my step name', async (s1) => {
    s1.label('foo', 'bar')
    await s1.step('my child step name', async (s2) => {
        // você pode adicionar qualquer combinação de etapas na função do corpo
    })
})
```

##### Tags do Cucumber

Tags do Cucumber com nomes especiais (`issue` e `testId`) são convertidas em links (os modelos de link correspondentes devem ser configurados anteriormente):
```gherkin
@issue=BUG-1
@testId=TST-2
Feature: This is a feature with global tags that will be converted to Allure links

  @issue=BUG-3
  @testId=TST-4
  Scenario: This is a scenario with tags that will be converted to Allure links
    Given I do something
```

Tags do Cucumber com nomes especiais (`feature`) são mapeadas para rótulos Allure:

```gherkin
Feature: Test user role

  @feature=login
  Scenario: Login
    Given I test login
```

## Exibindo o relatório

Os resultados podem ser consumidos por qualquer uma das [ferramentas de relatório](https://allurereport.org/) oferecidas pelo Allure. Por exemplo:

### Linha de comando

Instale a [ferramenta de linha de comando Allure](https://www.npmjs.com/package/allure-commandline) e processe o diretório de resultados:

```sh
allure generate [allure_output_dir] && allure open
```

Isso gerará um relatório (por padrão em `./allure-report`) e o abrirá no seu navegador.

### Geração automática de relatório

Você também pode gerar automaticamente o relatório usando a ferramenta de linha de comando Allure programaticamente. Para isso, instale o pacote em seu projeto:

```sh
npm i allure-commandline
```

Em seguida, adicione ou estenda seu hook `onComplete` ou crie um [serviço personalizado](/docs/customservices) para isso:

```js
// wdio.conf.js
const allure = require('allure-commandline')

export const config = {
    // ...
    onComplete: function() {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    }
    // ...
}
```

### Jenkins

Instale e configure o [plugin Jenkins do Allure](https://allurereport.org/docs/integrations-jenkins/)

## Adicionar Capturas de Tela

Capturas de tela podem ser anexadas ao relatório usando a função `takeScreenshot` do WebDriverIO no hook `afterTest` para Mocha e Jasmine ou hook `afterStep` para Cucumber.
Primeiro, defina `disableWebdriverScreenshotsReporting: false` nas opções do reporter, depois adicione no hook afterStep:

### Mocha / Jasmine

```js title="wdio.conf.js"
afterTest: async function(test, context, { error, result, duration, passed, retries }) {
    if (error) {
        await browser.takeScreenshot();
    }
}
```

### Cucumber

```js title="wdio.conf.js"
afterStep: async function (step, scenario, { error, duration, passed }, context) {
  if (error) {
    await browser.takeScreenshot();
  }
}
```

Como mostrado no exemplo acima, quando essa função é chamada, uma imagem de captura de tela será anexada ao relatório do allure.