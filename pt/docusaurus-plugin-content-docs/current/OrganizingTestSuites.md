---
id: organizingsuites
title: Organizando a Suíte de Testes
description: "Organize uma suíte de testes em crescimento compartilhando arquivos de configuração, agrupando specs em suítes, executando specs sequencialmente e incluindo ou excluindo testes."
---

À medida que os projetos crescem, inevitavelmente mais e mais testes de integração são adicionados. Isso aumenta o tempo de build e diminui a produtividade.

Para evitar isso, você deve executar seus testes em paralelo. O WebdriverIO já testa cada spec (ou _feature file_ no Cucumber) em paralelo dentro de uma única sessão. Em geral, tente testar apenas uma única funcionalidade por arquivo de spec. Tente não ter muitos ou poucos testes em um arquivo. (No entanto, não há uma regra de ouro aqui.)

Quando seus testes tiverem vários arquivos de spec, você deve começar a executá-los simultaneamente. Para isso, ajuste a propriedade `maxInstances` no seu arquivo de configuração. O WebdriverIO permite que você execute seus testes com concorrência máxima — o que significa que, não importa quantos arquivos e testes você tenha, todos eles podem ser executados em paralelo.  (Isso ainda está sujeito a certos limites, como a CPU do seu computador, restrições de concorrência, etc.)

> Digamos que você tenha 3 capabilities diferentes (Chrome, Firefox e Safari) e tenha definido `maxInstances` como `1`. O test runner do WDIO irá iniciar 3 processos. Portanto, se você tiver 10 arquivos de spec e definir `maxInstances` como `10`, _todos_ os arquivos de spec serão testados simultaneamente, e 30 processos serão iniciados.

Você pode definir a propriedade `maxInstances` globalmente para configurar o atributo para todos os navegadores.

Se você executa seu próprio grid WebDriver, pode (por exemplo) ter mais capacidade para um navegador do que para outro. Nesse caso, você pode _limitar_ o `maxInstances` no seu objeto de capability:

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
        // maxInstances pode ser sobrescrito por capability. Então, se você tem um grid
        // WebDriver interno com apenas 5 instâncias do firefox disponíveis, pode garantir que
        // não mais que 5 instâncias sejam iniciadas ao mesmo tempo.
        browserName: 'chrome'
    }],
    // ...
}
```

## Herdar do Arquivo de Configuração Principal

Se você executa sua suíte de testes em vários ambientes (por exemplo, dev e integração), pode ser útil usar vários arquivos de configuração para manter tudo gerenciável.

Semelhante ao [conceito de page object](pageobjects), a primeira coisa de que você precisará é um arquivo de configuração principal. Ele contém todas as configurações que você compartilha entre os ambientes.

Em seguida, crie outro arquivo de configuração para cada ambiente e complemente a configuração principal com as específicas de cada ambiente:

```js
// wdio.dev.config.js
import { deepmerge } from 'deepmerge-ts'
import wdioConf from './wdio.conf.js'

// usa o arquivo de configuração principal como padrão, mas sobrescreve informações específicas do ambiente
export const config = deepmerge(wdioConf.config, {
    capabilities: [
        // mais caps definidas aqui
        // ...
    ],

    // executa os testes no sauce em vez de localmente
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    services: ['sauce']
}, { clone: false })

// adiciona um reporter adicional
config.reporters.push('allure')
```

## Agrupando Specs de Teste em Suítes

Você pode agrupar specs de teste em suítes e executar suítes específicas em vez de todas elas.

Primeiro, defina suas suítes na sua configuração do WDIO:

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

Agora, se você quiser executar apenas uma única suíte, pode passar o nome da suíte como argumento da CLI:

```sh
wdio wdio.conf.js --suite login
```

Ou executar várias suítes de uma vez:

```sh
wdio wdio.conf.js --suite login --suite otherFeature
```

## Agrupando Specs de Teste para Execução Sequencial

Como descrito acima, há benefícios em executar os testes simultaneamente. No entanto, há casos em que seria vantajoso agrupar testes para serem executados sequencialmente em uma única instância. Exemplos disso são principalmente casos em que há um grande custo de preparação, como transpilar código ou provisionar instâncias na nuvem, mas também existem modelos de uso avançados que se beneficiam dessa capacidade.

Para agrupar testes para serem executados em uma única instância, defina-os como um array dentro da definição de specs.

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
e, nesse caso, todos os testes da suíte "end2end" seriam executados em uma única instância.

Ao executar testes sequencialmente usando um padrão, os arquivos de spec serão executados em ordem alfabética

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

Em alguns casos, você pode querer executar apenas um único teste (ou um subconjunto de testes) das suas suítes.

Com o parâmetro `--spec`, você pode especificar qual _suíte_ (Mocha, Jasmine) ou _feature_ (Cucumber) deve ser executada. O caminho é resolvido de forma relativa ao seu diretório de trabalho atual.

Por exemplo, para executar apenas seu teste de login:

```sh
wdio wdio.conf.js --spec ./test/specs/e2e/login.js
```

Ou executar várias specs de uma vez:

```sh
wdio wdio.conf.js --spec ./test/specs/signup.js --spec ./test/specs/forgot-password.js
```

Se o valor de `--spec` não apontar para um arquivo de spec específico, ele será usado para filtrar os nomes dos arquivos de spec definidos na sua configuração.

Para executar todas as specs com a palavra "dialog" nos nomes dos arquivos, você pode usar:

```sh
wdio wdio.conf.js --spec dialog
```

Observe que cada arquivo de teste é executado em um único processo do test runner. Como não escaneamos os arquivos antecipadamente (veja a próxima seção para informações sobre como redirecionar nomes de arquivos via pipe para o `wdio`), você _não pode_ usar (por exemplo) `describe.only` no topo do seu arquivo de spec para instruir o Mocha a executar apenas aquela suíte.

Este recurso ajudará você a atingir o mesmo objetivo.

Quando a opção `--spec` é fornecida, ela sobrescreve quaisquer padrões definidos pelo `specs` da configuração ou pelo `wdio:specs` de uma capability.

## Excluir Testes Selecionados

Quando necessário, se você precisar excluir arquivo(s) de spec específico(s) de uma execução, pode usar o parâmetro `--exclude` (Mocha, Jasmine) ou feature (Cucumber).

Por exemplo, para excluir seu teste de login da execução:

```sh
wdio wdio.conf.js --exclude ./test/specs/e2e/login.js
```

Ou excluir vários arquivos de spec:

 ```sh
wdio wdio.conf.js --exclude ./test/specs/signup.js --exclude ./test/specs/forgot-password.js
```

Ou excluir um arquivo de spec ao filtrar usando uma suíte:

```sh
wdio wdio.conf.js --suite login --exclude ./test/specs/e2e/login.js
```

Se o valor de `--exclude` não apontar para um arquivo de spec específico, ele será usado para filtrar os nomes dos arquivos de spec definidos na sua configuração.

Para excluir todas as specs com a palavra "dialog" nos nomes dos arquivos, você pode usar:

```sh
wdio wdio.conf.js --exclude dialog
```

### Excluir uma Suíte Inteira

Você também pode excluir uma suíte inteira pelo nome. Se o valor de exclusão corresponder a um nome de suíte definido na sua configuração e não parecer um caminho de arquivo, a suíte inteira será ignorada:

```sh
wdio wdio.conf.js --suite login --suite checkout --exclude login
```

Isso executará apenas a suíte `checkout`, ignorando completamente a suíte `login`.

Exclusões mistas (suítes e padrões de spec) funcionam como esperado:

```sh
wdio wdio.conf.js --suite login --exclude dialog --exclude signup
```

Neste exemplo, se `signup` for um nome de suíte definido, essa suíte será excluída. O padrão `dialog` filtrará quaisquer arquivos de spec que contenham "dialog" no nome.

:::note
Se você especificar tanto `--suite X` quanto `--exclude X`, a exclusão tem precedência e a suíte `X` não será executada.
:::

Quando a opção `--exclude` é fornecida, ela sobrescreve quaisquer padrões definidos pelo `exclude` da configuração ou pelo `wdio:exclude` de uma capability.

## Executar Suítes e Specs de Teste

Execute uma suíte inteira junto com specs individuais.

```sh
wdio wdio.conf.js --suite login --spec ./test/specs/signup.js
```

## Executar Várias Specs de Teste Específicas

Às vezes é necessário&mdash;no contexto de integração contínua e em outros&mdash;especificar vários conjuntos de specs para executar. O utilitário de linha de comando `wdio` do WebdriverIO aceita nomes de arquivos recebidos via pipe (de `find`, `grep` ou outros).

Nomes de arquivos recebidos via pipe sobrescrevem a lista de globs ou nomes de arquivos especificados na lista `spec` da configuração.

```sh
grep -r -l --include "*.js" "myText" | wdio wdio.conf.js
```

_**Observação:** Isso_ não _sobrescreve a flag `--spec` para executar uma única spec._

## Executando Testes Específicos com MochaOpts

Você também pode filtrar qual `suite|describe` e/ou `it|test` específico deseja executar passando um argumento específico do mocha: `--mochaOpts.grep` para a CLI do wdio.

```sh
wdio wdio.conf.js --mochaOpts.grep myText
wdio wdio.conf.js --mochaOpts.grep "Text with spaces"
```

_**Observação:** O Mocha filtrará os testes depois que o test runner do WDIO criar as instâncias, então você pode ver várias instâncias sendo iniciadas, mas não realmente executadas._

## Excluir Testes Específicos com MochaOpts

Você também pode filtrar qual `suite|describe` e/ou `it|test` específico deseja excluir passando um argumento específico do mocha: `--mochaOpts.invert` para a CLI do wdio. `--mochaOpts.invert` faz o oposto de `--mochaOpts.grep`

```sh
wdio wdio.conf.js --mochaOpts.grep "string|regex" --mochaOpts.invert
wdio wdio.conf.js --spec ./test/specs/e2e/login.js --mochaOpts.grep "string|regex" --mochaOpts.invert
```

_**Observação:** O Mocha filtrará os testes depois que o test runner do WDIO criar as instâncias, então você pode ver várias instâncias sendo iniciadas, mas não realmente executadas._

## Parar os testes após uma falha

Com a opção `bail`, você pode dizer ao WebdriverIO para parar os testes após qualquer teste falhar.

Isso é útil em grandes suítes de testes quando você já sabe que seu build vai quebrar, mas quer evitar a longa espera de uma execução completa dos testes.

A opção `bail` espera um número, que especifica quantas falhas de teste podem ocorrer antes que o WebDriver interrompa toda a execução dos testes. O padrão é `0`, o que significa que ele sempre executa todas as specs de teste que encontrar.

Consulte a [Página de Opções](configuration) para informações adicionais sobre a configuração bail.
## Hierarquia das opções de execução

Ao declarar quais specs executar, existe uma certa hierarquia que define qual padrão terá precedência. Atualmente, é assim que funciona, da maior prioridade para a menor:

> Argumento `--spec` da CLI > `wdio:specs` da capability > `specs` da configuração
> Argumento `--exclude` da CLI > `exclude` da configuração > `wdio:exclude` da capability

Se apenas o parâmetro da configuração for fornecido, ele será usado para todas as capabilities. No entanto, se o padrão for definido no nível da capability, ele será usado em vez do padrão da configuração. Por fim, qualquer padrão de spec definido na linha de comando sobrescreverá todos os outros padrões fornecidos.

### Usando padrões de spec definidos na capability

Quando você define um padrão de spec no nível da capability, ele sobrescreve quaisquer padrões definidos no nível da configuração. Isso é útil quando é necessário separar testes com base em capabilities de dispositivos diferentes. Em casos como esse, é mais útil usar um padrão de spec genérico no nível da configuração e padrões mais específicos no nível da capability.

Por exemplo, digamos que você tenha dois diretórios, um para testes Android e outro para testes iOS.

Seu arquivo de configuração pode definir o padrão da seguinte forma, para testes não específicos de dispositivo:

```js
{
    specs: ['tests/general/**/*.js']
}
```

mas então, você terá capabilities diferentes para seus dispositivos Android e iOS, onde os padrões poderiam ser assim:

```json
{
  "platformName": "Android",
  "wdio:specs": [
    "tests/android/**/*.js"
  ]
}
```

```json
{
  "platformName": "iOS",
  "wdio:specs": [
    "tests/ios/**/*.js"
  ]
}
```

Se você precisar de ambas as capabilities no seu arquivo de configuração, o dispositivo Android executará apenas os testes sob o namespace "android", e o iOS executará apenas os testes sob o namespace "ios"!

```js
//wdio.conf.js
export const config = {
    "specs": [
        "tests/general/**/*.js"
    ],
    "capabilities": [
        {
            platformName: "Android",
            "wdio:specs": ["tests/android/**/*.js"],
            //...
        },
        {
            platformName: "iOS",
            "wdio:specs": ["tests/ios/**/*.js"],
            //...
        },
        {
            platformName: "Chrome",
            //as specs do nível da configuração serão usadas
        }
    ]
}
```