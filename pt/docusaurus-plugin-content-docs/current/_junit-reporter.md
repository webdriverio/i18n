---
id: junit-reporter
title: Relatório Junit
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-junit-reporter/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> Um reporter do WebdriverIO que cria relatórios JUnit em XML compatíveis com [Jenkins](http://jenkins-ci.org/)

## Instalação

A maneira mais fácil é manter o `@wdio/junit-reporter` como uma devDependency no seu `package.json`, via:

```sh
npm install @wdio/junit-reporter --save-dev
```

Instruções sobre como instalar o `WebdriverIO` podem ser encontradas [aqui](https://webdriver.io/docs/gettingstarted).

## Saída

Este reporter vai produzir um relatório para cada executor, então por sua vez você receberá um relatório xml para cada arquivo de especificação. Abaixo
estão exemplos de saída XML para diferentes cenários no arquivo de especificação.

### Bloco único de describe
```javascript
describe('a test suite', () => {
    it('a test case', function () {
      // do something
      // assert something
    });
});
```
se torna
```xml
<testsuites>
    <testsuite name="a test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
        <properties>
          <property name="specId" value="0"/>
          <property name="suiteName" value="a test suite"/>
          <property name="capabilities" value="chrome"/>
          <property name="file" value=".\test\specs\asuite.spec.js"/>
        </properties>
        <testcase classname="chrome.a_test_case" name="a_test_suite_a_test_case" time="11.706"/>
    </testsuite>
</testsuites>
```

### Bloco aninhado de describe
```javascript
describe('a test suite', () => {
    describe('a nested test suite', function() {
        it('a test case', function () {
          // do something
          // assert something
        });
    });
});
```
se torna
```xml
<testsuites>
    <testsuite name="a test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
    <properties>
      <property name="specId" value="0"/>
      <property name="suiteName" value="a test suite"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value=".\test\specs\asuite.spec.js"/>
    </properties>
  </testsuite>
  <testsuite name="a nested test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
    <properties>
      <property name="specId" value="0"/>
      <property name="suiteName" value="a nested test suite"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value=".\test\specs\asuite.spec.js"/>
    </properties>
    <testcase classname="chrome.a_test_case" name="a nested test suite a test case" time="11.706"/>
  </testsuite>
</testsuites>
```

### Múltiplos blocos de describe
```javascript
describe('a test suite', () => {
    it('a test case', function () {
      // do something
      // assert something
    });
});
describe('a second test suite', () => {
    it('a second test case', function () {
      // do something
      // assert something
    });
});
```
se torna
```xml
<testsuites>
    <testsuite name="a test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
    <properties>
      <property name="specId" value="0"/>
      <property name="suiteName" value="a test suite"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value=".\test\specs\asuite.spec.js"/>
      <testcase classname="chrome.a_test_case" name="a nested test suite a test case" time="11.706"/>
    </properties>
  </testsuite>
  <testsuite name="a second test suite" timestamp="2019-04-18T13:45:21" time="11.735" tests="0" failures="0" errors="0" skipped="0">
    <properties>
      <property name="specId" value="0"/>
      <property name="suiteName" value="a second test suite"/>
      <property name="capabilities" value="chrome"/>
      <property name="file" value=".\test\specs\asuite.spec.js"/>
    </properties>
    <testcase classname="chrome.a_second_test_case" name="a_second_test_suite_a_second_test_case" time="11.706"/>
  </testsuite>
</testsuites>
```

### Falhas e Erros
Todas as falhas de caso de teste são mapeadas como erros de caso de teste JUnit. Um caso de teste que falhou devido a falha de asserção ou erro será assim:

```xml
<testcase classname="chrome.a_test_case" name="a_test_suite_a_test_case" time="0.372">
  <failure message="Error: some error"/>
    <system-err>
        <![CDATA[
Error: some assertion failure
    at UserContext.<anonymous> (C:\repo\webdriver-example\test\specs/a_test_suite.spec.js:22:17)
]]>
  </system-err>
</testcase>
```

## Configuração

O código a seguir mostra a configuração padrão do test runner do WDIO. Basta adicionar `'junit'` como reporter
ao array. Para obter alguma saída durante o teste, você pode executar o [WDIO Dot Reporter](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-dot-reporter) e o WDIO JUnit Reporter ao mesmo tempo:

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            outputFileFormat: function(options) { // optional
                return `results-${options.cid}.${options.capabilities}.xml`
            }
        }]
    ],
    // ...
};
```

As seguintes opções são suportadas:

### outputDir
Defina um diretório onde seus arquivos xml devem ser armazenados.

Tipo: `String`<br />
Obrigatório

### outputFileFormat
Defina os arquivos xml criados após a execução do teste.

Tipo: `Object`<br />
Padrão: ``function (opts) { return `wdio-${this.cid}-${name}-reporter.log` }``

```
outputFileFormat: function (options) {
    return 'mycustomfilename.xml';
}
```

> Nota: `options.capabilities` são suas capacidades para esse executor, então especificar `${options.capabilities}` em sua string retornará [Object object]. Você deve especificar quais propriedades de capabilities deseja no nome do arquivo.

### suiteNameFormat

Dá a capacidade de fornecer regex personalizado para formatação do nome da suite de teste (por exemplo, no xml de saída).

Tipo: `Regex`,<br />
Padrão: `/[^a-zA-Z0-9@]+/`

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            suiteNameFormat: /[^a-zA-Z0-9@]+/
            outputFileFormat: function(options) { // optional
                return `results-${options.cid}.${options.capabilities}.xml`
            }
        }]
    ],
    // ...
};
```

### addFileAttribute

Adiciona um atributo de arquivo a cada caso de teste. Esta configuração é principalmente para CircleCI. Esta configuração fornece detalhes mais ricos, mas pode quebrar em outras plataformas de CI.

Tipo: `Boolean`,<br />
Padrão: `false`


### packageName

Você pode dividir pacotes por um nível adicional configurando `'packageName'`. Por exemplo, se você quisesse iterar sobre uma suíte de teste com diferentes variáveis de ambiente definidas:

Tipo: `String`<br />
Exemplo:

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            packageName: process.env.USER_ROLE // chrome.41 - administrator
        }]
    ]
    // ...
};
```

### errorOptions

Permite definir várias combinações de notificações de erro dentro do xml.<br />
Dado um teste Jasmine como `expect(true).toBe(false, 'my custom message')` você receberá este erro de teste:

```
{
    matcherName: 'toBe',
    message: 'Expected true to be false, \'my custom message\'.',
    stack: 'Error: Expected true to be false, \'my custom message\'.\n    at UserContext.it (/home/mcelotti/Workspace/WebstormProjects/forcebeatwio/test/marco/prova1.spec.js:3:22)',
    passed: false,
    expected: [ false, 'my custom message' ],
    actual: true
}
```

Portanto, você pode escolher *qual* chave será usada *onde*, veja o exemplo abaixo.

Tipo: `Object`,<br />
Padrão: `errorOptions: { error: "message" }`<br />
Exemplo:

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            errorOptions: {
                error: 'message',
                failure: 'message',
                stacktrace: 'stack'
            }
        }]
    ],
    // ...
};
```

### addWorkerLogs

Parâmetro opcional, defina este parâmetro como true para anexar logs do console do teste no relatório.

Tipo: `Boolean`<br />
Padrão: `false`<br />
Exemplo:

```js
// wdio.conf.js
module.exports = {
    // ...
    reporters: [
        'dot',
        ['junit', {
            outputDir: './',
            addWorkerLogs: true
        }]
    ],
    // ...
};
```

## Adicionando propriedades personalizadas aos casos de teste

Este plugin fornece uma função `addProperty(name, value)`. Esta função pode ser usada para adicionar propriedades adicionais do caso de teste junit à etapa de teste em execução no momento. Essas propriedades serão relatadas no xml resultante como `<property name="${name}" value="${value}" />`.

O caso de uso típico para isso é adicionar um link para um problema ou um caso de teste.


### Exemplo de uso

Um exemplo para mocha:

```js
import { addProperty } from '@wdio/junit-reporter'

describe('Suite', () => {
    it('Case', () => {
        addProperty('test_case', 'TC-1234')
    })
})
```

## Configuração do Jenkins

Por último, mas não menos importante, você precisa informar ao seu job de CI (por exemplo, Jenkins) onde ele pode encontrar o arquivo xml. Para isso, adicione uma ação pós-build ao seu job que é executada após o teste ter sido executado e aponte o Jenkins (ou seu sistema de CI desejado) para seus resultados de teste XML:

![Point Jenkins to XML files](https://webdriver.io/img/jenkins-postjob.png "Point Jenkins to XML files")

Se não houver tal etapa pós-construção em seu sistema de CI, provavelmente existe um plugin para isso em algum lugar na internet.

----

Para mais informações sobre o WebdriverIO, consulte a [página inicial](https://webdriver.io).