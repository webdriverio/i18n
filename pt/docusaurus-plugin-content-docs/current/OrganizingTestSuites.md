---
id: organizingsuites
title: Organizando Suite de Teste
---

À medida que os projetos crescem, inevitavelmente mais e mais testes de integração são adicionados. Isso aumenta o tempo de compilação e diminui a produtividade.

Para evitar isso, você deve executar seus testes em paralelo. O WebdriverIO já testa cada spec (ou _arquivo de feature_ no Cucumber) em paralelo dentro de uma única sessão. Em geral, tente testar apenas um único recurso por arquivo de spec. Tente não ter muitos ou poucos testes em um arquivo. (No entanto, não há uma regra de ouro aqui.)

Quando seus testes tiverem vários arquivos de spec, você deve começar a executar seus testes simultaneamente. Para fazer isso, ajuste a propriedade `maxInstances` no seu arquivo de configuração. O WebdriverIO permite que você execute seus testes com máxima concorrência - o que significa que não importa quantos arquivos e testes você tenha, todos podem ser executados em paralelo. (Isso ainda está sujeito a certos limites, como a CPU do seu computador, restrições de concorrência, etc.)

> Vamos supor que você tenha 3 recursos diferentes (Chrome, Firefox e Safari) e você definiu `maxInstances` como `1`. O executor de teste WDIO gerará 3 processos. Portanto, se você tiver 10 arquivos de spec e definir `maxInstances` como `10`, _todos_ os arquivos de spec serão testados simultaneamente, e 30 processos serão gerados.

Você pode definir a propriedade `maxInstances` globalmente para definir o atributo para todos os navegadores.

Se você executar sua própria grade WebDriver, pode (por exemplo) ter mais capacidade para um navegador do que para outro. Nesse caso, você pode _limitar_ o `maxInstances` em seu objeto de capacidade:

```js
// wdio.conf.js
export const config = {
    // ...
    // define maxInstance para todos os navegadores
    maxInstances: 10,
    // ...
    capabilities: [{
        browserName: 'firefox'
    }, {
        // maxInstances pode ser sobrescrito por capacidade. Então, se você tiver uma grade WebDriver interna
        // com apenas 5 instâncias do firefox disponíveis, você pode garantir que não mais do que
        // 5 instâncias sejam iniciadas ao mesmo tempo.
        browserName: 'chrome'
    }],
    // ...
}
```

## Herdar do Arquivo de Configuração Principal

Se você executar sua suíte de testes em vários ambientes (por exemplo, desenvolvimento e integração), pode ser útil usar vários arquivos de configuração para manter as coisas gerenciáveis.

Semelhante ao [conceito de objeto de página](pageobjects), a primeira coisa que você precisará é um arquivo de configuração principal. Ele contém todas as configurações que você compartilha entre os ambientes.

Em seguida, crie outro arquivo de configuração para cada ambiente e complemente a configuração principal com as específicas do ambiente:

```js
// wdio.dev.config.js
import { deepmerge } from 'deepmerge-ts'
import wdioConf from './wdio.conf.js'

// tenha o arquivo de configuração principal como padrão, mas substitua informações específicas do ambiente
export const config = deepmerge(wdioConf.config, {
    capabilities: [
        // mais capacidades definidas aqui
        // ...
    ],

    // execute testes no sauce em vez de localmente
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    services: ['sauce']
}, { clone: false })

// adicione um reporter adicional
config.reporters.push('allure')
```

## Agrupando Specs de Teste em Suítes

Você pode agrupar specs de teste em suítes e executar suítes específicas individuais em vez de todas elas.

Primeiro, defina suas suítes em sua configuração WDIO:

```js
// wdio.conf.js
export const config = {
    // define todos os testes
    specs: ['./test/specs/**/*.spec.js'],
    // ...
    // define suítes específicas
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

Agora, se você quiser executar apenas uma única suíte, você pode passar o nome da suíte como um argumento CLI:

```sh
wdio wdio.conf.js --suite login
```

Ou, execute várias suítes de uma vez:

```sh
wdio wdio.conf.js --suite login --suite otherFeature
```

## Agrupando Specs de Teste para Executar Sequencialmente

Como descrito acima, existem benefícios na execução de testes simultaneamente. No entanto, há casos em que seria benéfico agrupar testes para serem executados sequencialmente em uma única instância. Exemplos disso são principalmente onde há um grande custo de configuração, por exemplo, transpilação de código ou provisionamento de instâncias na nuvem, mas também existem modelos de uso avançados que se beneficiam desse recurso.

Para agrupar testes para serem executados em uma única instância, defina-os como uma matriz na definição de specs.

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

Também é possível agrupar specs definidas em suítes, então agora você também pode definir suítes assim:
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
e neste caso, todos os testes da suíte "end2end" seriam executados em uma única instância.

Ao executar testes sequencialmente usando um padrão, ele executará os arquivos de spec em ordem alfabética

```json
  "suites": {
    end2end: ["./test/specs/test_*.js"]
  },
```

Isso executará os arquivos que correspondem ao padrão acima na seguinte ordem:

```
  [
      "./test/specs/test_checkout.js",
      "./test/specs/test_login.js",
      "./test/specs/test_product_order.js"
  ]
```

## Executar Testes Selecionados

Em alguns casos, você pode querer executar apenas um único teste (ou subconjunto de testes) de suas suítes.

Com o parâmetro `--spec`, você pode especificar qual _suíte_ (Mocha, Jasmine) ou _feature_ (Cucumber) deve ser executada. O caminho é resolvido em relação ao seu diretório de trabalho atual.

Por exemplo, para executar apenas seu teste de login:

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

Ou execute vários specs de uma vez:

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

Se o valor de `--spec` não apontar para um arquivo de spec específico, ele será usado para filtrar os nomes de arquivos de spec definidos em sua configuração.

Para executar todos os specs com a palavra "dialog" nos nomes de arquivos de spec, você poderia usar:

```sh
wdio wdio.conf.js --spec dialog
```

Observe que cada arquivo de teste está sendo executado em um processo de execução de teste único. Como não escaneamos arquivos com antecedência (veja a próxima seção para informações sobre tubulação de nomes de arquivos para `wdio`), você _não pode_ usar (por exemplo) `describe.only` no topo do seu arquivo de spec para instruir o Mocha a executar apenas essa suíte.

Este recurso irá ajudá-lo a realizar o mesmo objetivo.

Quando a opção `--spec` é fornecida, ela substituirá quaisquer padrões definidos pelo parâmetro `specs` na configuração ou no nível de capacidade.

## Excluir Testes Selecionados

Quando necessário, se você precisar excluir arquivos de spec específicos de uma execução, você pode usar o parâmetro `--exclude` (Mocha, Jasmine) ou feature (Cucumber).

Por exemplo, para excluir seu teste de login da execução do teste:

```sh
wdio wdio.conf.js --exclude ./test/specs/e2e/login.js
```

Ou, exclua vários arquivos de spec:

 ```sh
wdio wdio.conf.js --exclude ./test/specs/signup.js --exclude ./test/specs/forgot-password.js
```

Ou, exclua um arquivo de spec ao filtrar usando uma suíte:

```sh
wdio wdio.conf.js --suite login --exclude ./test/specs/e2e/login.js
```

Se o valor de `--exclude` não apontar para um arquivo de spec específico, ele será usado para filtrar os nomes de arquivos de spec definidos em sua configuração.

Para excluir todos os specs com a palavra "dialog" nos nomes de arquivos de spec, você poderia usar:

```sh
wdio wdio.conf.js --exclude dialog
```

Quando a opção `--exclude` é fornecida, ela substituirá quaisquer padrões definidos pelo parâmetro `exclude` na configuração ou no nível de capacidade.

## Executar Suítes e Specs de Teste

Execute uma suíte inteira junto com specs individuais.

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## Executar Múltiplos Specs de Teste Específicos

Às vezes é necessário — no contexto de integração contínua ou não — especificar vários conjuntos de specs para serem executados. O utilitário de linha de comando `wdio` do WebdriverIO aceita nomes de arquivos por pipe (de `find`, `grep` ou outros).

Os nomes de arquivos recebidos por pipe substituem a lista de padrões globais ou nomes de arquivos especificados na lista `spec` da configuração.

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**Nota:** Isso_ não _substituirá a flag `--spec` para executar um único spec._

## Executando Testes Específicos com MochaOpts

Você também pode filtrar quais `suite|describe` e/ou `it|test` específicos deseja executar passando um argumento específico do mocha: `--mochaOpts.grep` para a CLI wdio.

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**Nota:** O Mocha filtrará os testes após o executor de teste WDIO criar as instâncias, então você pode ver várias instâncias sendo geradas, mas não realmente executadas._

## Excluir Testes Específicos com MochaOpts

Você também pode filtrar quais `suite|describe` e/ou `it|test` específicos deseja excluir passando um argumento específico do mocha: `--mochaOpts.invert` para a CLI wdio. `--mochaOpts.invert` realiza o oposto de `--mochaOpts.grep`

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**Nota:** O Mocha filtrará os testes após o executor de teste WDIO criar as instâncias, então você pode ver várias instâncias sendo geradas, mas não realmente executadas._

## Parar de testar após falha

Com a opção `bail`, você pode dizer ao WebdriverIO para parar de testar após qualquer falha no teste.

Isso é útil com suítes de teste grandes quando você já sabe que sua construção será interrompida, mas você quer evitar a longa espera de uma execução completa de teste.

A opção `bail` espera um número, que especifica quantas falhas de teste podem ocorrer antes que o WebDriver pare toda a execução de teste. O padrão é `0`, o que significa que ele sempre executa todos os specs de teste que pode encontrar.

Consulte a [Página de Opções](configuration) para obter informações adicionais sobre a configuração de bail.
## Hierarquia de opções de execução

Ao declarar quais specs executar, existe uma certa hierarquia que define qual padrão terá precedência. Atualmente, é assim que funciona, da prioridade mais alta para a mais baixa:

> Argumento CLI `--spec` > padrão de `specs` de capacidade > padrão de `specs` de configuração
> Argumento CLI `--exclude` > padrão `exclude` de configuração > padrão `exclude` de capacidade

Se apenas o parâmetro de configuração for fornecido, ele será usado para todas as capacidades. No entanto, se o padrão for definido no nível de capacidade, ele será usado em vez do padrão de configuração. Finalmente, qualquer padrão de spec definido na linha de comando substituirá todos os outros padrões fornecidos.

### Usando padrões de spec definidos por capacidade

Quando você define um padrão de spec no nível de capacidade, ele substituirá quaisquer padrões definidos no nível de configuração. Isso é útil quando há necessidade de separar testes com base em recursos de dispositivos diferenciados. Nesses casos, é mais útil usar um padrão de spec genérico no nível de configuração e padrões mais específicos no nível de capacidade.

Por exemplo, digamos que você tenha dois diretórios, um para testes Android e outro para testes iOS.

Seu arquivo de configuração pode definir o padrão da seguinte forma, para testes de dispositivos não específicos:

```js
{
    specs: ['tests/general/**/*.js']
}
```

mas então, você terá diferentes capacidades para seus dispositivos Android e iOS, onde os padrões poderiam ser assim:

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

Se você precisar de ambas essas capacidades em seu arquivo de configuração, então o dispositivo Android executará apenas os testes sob o namespace "android", e os testes iOS executarão apenas os testes sob o namespace "ios"!

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
            //specs de nível de configuração serão usadas
        }
    ]
}
```