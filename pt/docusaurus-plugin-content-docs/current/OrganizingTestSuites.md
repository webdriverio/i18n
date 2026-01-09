---
id: organizingsuites
title: Organizando Suítes de Teste
---

À medida que os projetos crescem, inevitavelmente mais e mais testes de integração são adicionados. Isso aumenta o tempo de compilação e diminui a produtividade.

Para evitar isso, você deve executar seus testes em paralelo. O WebdriverIO já testa cada spec (ou _feature file_ no Cucumber) em paralelo dentro de uma única sessão. Em geral, tente testar apenas uma única funcionalidade por arquivo de spec. Tente não ter muitos ou poucos testes em um arquivo. (No entanto, não há uma regra de ouro aqui.)

Quando seus testes tiverem vários arquivos de spec, você deve começar a executá-los simultaneamente. Para isso, ajuste a propriedade `maxInstances` em seu arquivo de configuração. O WebdriverIO permite executar seus testes com máxima concorrência—o que significa que não importa quantos arquivos e testes você tenha, todos podem ser executados em paralelo. (Isso ainda está sujeito a certos limites, como a CPU do seu computador, restrições de concorrência, etc.)

> Vamos supor que você tenha 3 diferentes capabilities (Chrome, Firefox e Safari) e tenha definido `maxInstances` como `1`. O executor de teste WDIO gerará 3 processos. Portanto, se você tiver 10 arquivos de spec e definir `maxInstances` como `10`, _todos_ os arquivos de spec serão testados simultaneamente, e 30 processos serão gerados.

Você pode definir a propriedade `maxInstances` globalmente para definir o atributo para todos os navegadores.

Se você executa seu próprio grid WebDriver, pode (por exemplo) ter mais capacidade para um navegador do que para outro. Nesse caso, você pode _limitar_ o `maxInstances` em seu objeto de capability:

```js
// wdio.conf.js
export const config = {
    // ...
    // set maxInstance for all browser
    maxInstances: 10,
    // ...
    capabilities: [{
        browserName: 'firefox'
    }, {
        // maxInstances can get overwritten per capability. So if you have an in-house WebDriver
        // grid with only 5 firefox instance available you can make sure that not more than
        // 5 instance gets started at a time.
        browserName: 'chrome'
    }],
    // ...
}
```

## Herdar do Arquivo de Configuração Principal

Se você executa sua suíte de testes em múltiplos ambientes (por exemplo, desenvolvimento e integração), pode ser útil usar múltiplos arquivos de configuração para manter as coisas gerenciáveis.

Semelhante ao [conceito de objetos de página](pageobjects), a primeira coisa que você precisa é de um arquivo de configuração principal. Ele contém todas as configurações que você compartilha entre ambientes.

Em seguida, crie outro arquivo de configuração para cada ambiente e complemente a configuração principal com as específicas do ambiente:

```js
// wdio.dev.config.js
import { deepmerge } from 'deepmerge-ts'
import wdioConf from './wdio.conf.js'

// have main config file as default but overwrite environment specific information
export const config = deepmerge(wdioConf.config, {
    capabilities: [
        // more caps defined here
        // ...
    ],

    // run tests on sauce instead locally
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    services: ['sauce']
}, { clone: false })

// add an additional reporter
config.reporters.push('allure')
```

## Agrupando Specs de Teste em Suítes

Você pode agrupar specs de teste em suítes e executar suítes específicas individuais em vez de todas elas.

Primeiro, defina suas suítes na sua configuração WDIO:

```js
// wdio.conf.js
export const config = {
    // define all tests
    specs: ['./test/specs/**/*.spec.js'],
    // ...
    // define specific suites
    suites: {
        login: [
            './test/specs/login.success.spec.js',
            './test/specs/login.failure.spec.js'
        ],
        otherFeature: [
            // ...
        ]
    },
    // ...
}
```

Agora, se você quiser executar apenas uma única suíte, pode passar o nome da suíte como um argumento CLI:

```sh
wdio wdio.conf.js --suite login
```

Ou execute várias suítes de uma vez:

```sh
wdio wdio.conf.js --suite login --suite otherFeature
```

## Agrupando Specs de Teste para Execução Sequencial

Como descrito acima, há benefícios em executar os testes simultaneamente. No entanto, existem casos em que seria benéfico agrupar testes para serem executados sequencialmente em uma única instância. Exemplos disso são principalmente onde há um grande custo de configuração, como transpilação de código ou provisionamento de instâncias na nuvem, mas também existem modelos de uso avançados que se beneficiam dessa capacidade.

Para agrupar testes para execução em uma única instância, defina-os como uma matriz dentro da definição de specs.

```json
    "specs": [
        [
            "./test/specs/test_login.js",
            "./test/specs/test_product_order.js",
            "./test/specs/test_checkout.js"
        ],
        "./test/specs/test_b*.js",
    ],
```
No exemplo acima, os testes 'test_login.js', 'test_product_order.js' e 'test_checkout.js' serão executados sequencialmente em uma única instância e cada um dos testes "test_b*" será executado simultaneamente em instâncias individuais.

Também é possível agrupar specs definidas em suítes, então você agora também pode definir suítes assim:
```json
    "suites": {
        end2end: [
            [
                "./test/specs/test_login.js",
                "./test/specs/test_product_order.js",
                "./test/specs/test_checkout.js"
            ]
        ],
        allb: ["./test/specs/test_b*.js"]
},
```
e neste caso todos os testes da suíte "end2end" seriam executados em uma única instância.

Ao executar testes sequencialmente usando um padrão, ele executará os arquivos spec em ordem alfabética

```json
  "suites": {
    end2end: ["./test/specs/test_*.js"]
  },
```

Isso executará os arquivos correspondentes ao padrão acima na seguinte ordem:

```
  [
      "./test/specs/test_checkout.js",
      "./test/specs/test_login.js",
      "./test/specs/test_product_order.js"
  ]
```

## Executar Testes Selecionados

Em alguns casos, você pode querer executar apenas um único teste (ou subconjunto de testes) de suas suítes.

Com o parâmetro `--spec`, você pode especificar qual _suite_ (Mocha, Jasmine) ou _feature_ (Cucumber) deve ser executada. O caminho é resolvido relativamente a partir do seu diretório de trabalho atual.

Por exemplo, para executar apenas seu teste de login:

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

Ou execute vários specs de uma vez:

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

Se o valor de `--spec` não apontar para um arquivo spec específico, ele será usado para filtrar os nomes de arquivo spec definidos em sua configuração.

Para executar todos os specs com a palavra "dialog" nos nomes de arquivo spec, você poderia usar:

```sh
wdio wdio.conf.js --spec dialog
```

Observe que cada arquivo de teste está sendo executado em um único processo de execução de teste. Como não escaneamos os arquivos antecipadamente (veja a próxima seção para informações sobre como canalizar nomes de arquivos para `wdio`), você _não pode_ usar (por exemplo) `describe.only` no topo do seu arquivo spec para instruir o Mocha a executar apenas essa suíte.

Este recurso ajudará você a alcançar o mesmo objetivo.

Quando a opção `--spec` é fornecida, ela substituirá quaisquer padrões definidos pelo parâmetro `specs` do nível de configuração ou capacidade.

## Excluir Testes Selecionados

Quando necessário, se você precisar excluir arquivos spec específicos de uma execução, poderá usar o parâmetro `--exclude` (Mocha, Jasmine) ou feature (Cucumber).

Por exemplo, para excluir seu teste de login da execução do teste:

```sh
wdio wdio.conf.js --exclude ./test/specs/e2e/login.js
```

Ou exclua vários arquivos spec:

 ```sh
wdio wdio.conf.js --exclude ./test/specs/signup.js --exclude ./test/specs/forgot-password.js
```

Ou exclua um arquivo spec ao filtrar usando uma suíte:

```sh
wdio wdio.conf.js --suite login --exclude ./test/specs/e2e/login.js
```

Se o valor `--exclude` não apontar para um arquivo spec específico, ele será usado para filtrar os nomes de arquivo spec definidos em sua configuração.

Para excluir todos os specs com a palavra "dialog" nos nomes de arquivo spec, você poderia usar:

```sh
wdio wdio.conf.js --exclude dialog
```

### Excluir uma Suíte Inteira

Você também pode excluir uma suíte inteira pelo nome. Se o valor de exclusão corresponder a um nome de suíte definido em sua configuração e não parecer um caminho de arquivo, toda a suíte será ignorada:

```sh
wdio wdio.conf.js --suite login --suite checkout --exclude login
```

Isso executará apenas a suíte `checkout`, ignorando completamente a suíte `login`.

Exclusões mistas (suítes e padrões de spec) funcionam como esperado:

```sh
wdio wdio.conf.js --suite login --exclude dialog --exclude signup
```

Neste exemplo, se `signup` for um nome de suíte definido, essa suíte será excluída. O padrão `dialog` filtrará quaisquer arquivos spec que contenham "dialog" em seu nome de arquivo.

:::note
Se você especificar tanto `--suite X` quanto `--exclude X`, a exclusão terá precedência e a suíte `X` não será executada.
:::

Quando a opção `--exclude` é fornecida, ela substituirá quaisquer padrões definidos pelo parâmetro `exclude` do nível de configuração ou capacidade.

## Executar Suítes e Specs de Teste

Execute uma suíte inteira junto com specs individuais.

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## Executar Múltiplos Specs de Teste Específicos

Às vezes é necessário—no contexto de integração contínua e outros—especificar múltiplos conjuntos de specs para execução. O utilitário de linha de comando `wdio` do WebdriverIO aceita nomes de arquivo canalizados (de `find`, `grep` ou outros).

Os nomes de arquivo canalizados substituem a lista de padrões globais ou nomes de arquivo especificados na lista `spec` da configuração.

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**Nota:** Isso_ não _substituirá a flag `--spec` para execução de um único spec._

## Executando Testes Específicos com MochaOpts

Você também pode filtrar quais `suite|describe` específicos e/ou `it|test` você deseja executar passando um argumento específico do mocha: `--mochaOpts.grep` para a CLI wdio.

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**Nota:** O Mocha filtrará os testes após o executor de teste WDIO criar as instâncias, então você pode ver várias instâncias sendo geradas mas não realmente executadas._

## Excluir Testes Específicos com MochaOpts

Você também pode filtrar quais `suite|describe` específicos e/ou `it|test` você deseja excluir passando um argumento específico do mocha: `--mochaOpts.invert` para a CLI wdio. `--mochaOpts.invert` executa o oposto de `--mochaOpts.grep`

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**Nota:** O Mocha filtrará os testes após o executor de teste WDIO criar as instâncias, então você pode ver várias instâncias sendo geradas mas não realmente executadas._

## Parar os testes após falha

Com a opção `bail`, você pode dizer ao WebdriverIO para parar de testar após qualquer falha nos testes.

Isso é útil com grandes conjuntos de testes quando você já sabe que sua build vai falhar, mas deseja evitar a longa espera de uma execução de teste completa.

A opção `bail` espera um número, que especifica quantas falhas de teste podem ocorrer antes que o WebDriver pare toda a execução de teste. O padrão é `0`, o que significa que ele sempre executa todos os specs de teste que pode encontrar.

Consulte a [Página de Opções](configuration) para obter informações adicionais sobre a configuração de bail.
## Hierarquia de opções de execução

Ao declarar quais specs executar, existe uma certa hierarquia que define qual padrão terá precedência. Atualmente, é assim que funciona, da prioridade mais alta para a mais baixa:

> Argumento CLI `--spec` > padrão `specs` da capability > padrão `specs` da configuração
> Argumento CLI `--exclude` > padrão `exclude` da configuração > padrão `exclude` da capability

Se apenas o parâmetro de configuração for fornecido, ele será usado para todas as capabilities. No entanto, ao definir o padrão no nível da capability, ele será usado em vez do padrão de configuração. Finalmente, qualquer padrão de spec definido na linha de comando substituirá todos os outros padrões fornecidos.

### Usando padrões de spec definidos por capability

Quando você define um padrão de spec no nível da capability, ele substituirá quaisquer padrões definidos no nível de configuração. Isso é útil quando é necessário separar testes com base em capacidades diferenciadas de dispositivos. Nesses casos, é mais útil usar um padrão de spec genérico no nível de configuração e padrões mais específicos no nível de capability.

Por exemplo, digamos que você tenha dois diretórios, um para testes Android e outro para testes iOS.

Seu arquivo de configuração pode definir o padrão da seguinte forma, para testes de dispositivos não específicos:

```js
{
    specs: ['tests/general/**/*.js']
}
```

mas então, você terá diferentes capabilities para seus dispositivos Android e iOS, onde os padrões poderiam ser assim:

```json
{
  "platformName": "Android",
  "specs": [
    "tests/android/**/*.js"
  ]
}
```

```json
{
  "platformName": "iOS",
  "specs": [
    "tests/ios/**/*.js"
  ]
}
```

Se você precisar de ambas essas capabilities em seu arquivo de configuração, então o dispositivo Android executará apenas os testes sob o namespace "android", e os testes iOS executarão apenas os testes sob o namespace "ios"!

```js
//wdio.conf.js
export const config = {
    "specs": [
        "tests/general/**/*.js"
    ],
    "capabilities": [
        {
            platformName: "Android",
            specs: ["tests/android/**/*.js"],
            //...
        },
        {
            platformName: "iOS",
            specs: ["tests/ios/**/*.js"],
            //...
        },
        {
            platformName: "Chrome",
            //config level specs will be used
        }
    ]
}
```