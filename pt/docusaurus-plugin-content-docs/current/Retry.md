---
id: retry
title: Repetir Testes Instáveis
description: "Repita testes instáveis no Mocha, Jasmine ou Cucumber, execute novamente arquivos de spec inteiros e execute um teste específico várias vezes para detectar instabilidade."
---

Você pode executar novamente certos testes com o testrunner do WebdriverIO que se mostram instáveis devido a coisas como uma rede instável ou condições de corrida. (No entanto, não é recomendado simplesmente aumentar a taxa de repetição se os testes se tornarem instáveis!)

## Executar novamente suites no Mocha

Desde a versão 3 do Mocha, você pode executar novamente suites de teste inteiras (tudo dentro de um bloco `describe`). Se você usa o Mocha, deve preferir este mecanismo de repetição em vez da implementação do WebdriverIO, que só permite executar novamente determinados blocos de teste (tudo dentro de um bloco `it`). Para usar o método `this.retries()`, o bloco de suite `describe` deve usar uma função não vinculada `function(){}` em vez de uma arrow function `() => {}`, conforme descrito na [documentação do Mocha](https://mochajs.org/#arrow-functions). Usando o Mocha, você também pode definir uma contagem de repetições para todas as specs usando `mochaOpts.retries` no seu `wdio.conf.js`.

Aqui está um exemplo:

```js
describe('retries', function () {
    // Repete todos os testes desta suite até 4 vezes
    this.retries(4)

    beforeEach(async () => {
        await browser.url('http://www.yahoo.com')
    })

    it('should succeed on the 3rd try', async function () {
        // Especifica que este teste deve ser repetido apenas até 2 vezes
        this.retries(2)
        console.log('run')
        await expect($('.foo')).toBeDisplayed()
    })
})
```

## Executar novamente testes individuais no Jasmine ou Mocha

Para executar novamente um determinado bloco de teste, basta aplicar o número de repetições como último parâmetro após a função do bloco de teste:

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
  ]
}>
<TabItem value="mocha">

```js
describe('my flaky app', () => {
    /**
     * spec que é executada no máximo 4 vezes (1 execução real + 3 repetições)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // retorna o número de repetições
        // ...
    }, 3)
})
```

O mesmo funciona para hooks também:

```js
describe('my flaky app', () => {
    /**
     * hook que é executado no máximo 2 vezes (1 execução real + 1 repetição)
     */
    beforeEach(async () => {
        // ...
    }, 1)

    // ...
})
```

</TabItem>
<TabItem value="jasmine">

```js
describe('my flaky app', () => {
    /**
     * spec que é executada no máximo 4 vezes (1 execução real + 3 repetições)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // retorna o número de repetições
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 3)
})
```

O mesmo funciona para hooks também:

```js
describe('my flaky app', () => {
    /**
     * hook que é executado no máximo 2 vezes (1 execução real + 1 repetição)
     */
    beforeEach(async () => {
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 1)

    // ...
})
```

Se você estiver usando o Jasmine, o segundo parâmetro é reservado para o timeout. Para aplicar um parâmetro de repetição, você precisa definir o timeout com seu valor padrão `jasmine.DEFAULT_TIMEOUT_INTERVAL` e então aplicar sua contagem de repetições.

</TabItem>
</Tabs>

Este mecanismo de repetição só permite repetir hooks ou blocos de teste individuais. Se o seu teste for acompanhado de um hook para configurar sua aplicação, esse hook não será executado. O [Mocha oferece](https://mochajs.org/#retry-tests) repetições de teste nativas que fornecem esse comportamento, enquanto o Jasmine não. Você pode acessar o número de repetições executadas no hook `afterTest`.

## Executando novamente no Cucumber

### Executar novamente suites completas no Cucumber

Para o cucumber >=6, você pode fornecer a opção de configuração [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) junto com um parâmetro opcional `retryTagFilter` para que todos ou alguns dos seus cenários com falha recebam repetições adicionais até serem bem-sucedidos. Para que este recurso funcione, você precisa definir `scenarioLevelReporter` como `true`.

### Executar novamente Step Definitions no Cucumber

Para definir uma taxa de repetição para determinadas step definitions, basta aplicar uma opção de repetição a elas, como:

```js
export default function () {
    /**
     * step definition que é executada no máximo 3 vezes (1 execução real + 2 repetições)
     */
    this.Given(/^some step definition$/, { wrapperOptions: { retry: 2 } }, async () => {
        // ...
    })
    // ...
})
```

As repetições só podem ser definidas no seu arquivo de step definitions, nunca no seu arquivo de feature.

## Adicionar repetições por arquivo de spec

Anteriormente, apenas repetições em nível de teste e de suite estavam disponíveis, o que é adequado na maioria dos casos.

Mas em quaisquer testes que envolvam estado (como em um servidor ou em um banco de dados), o estado pode ficar inválido após a primeira falha do teste. Quaisquer repetições subsequentes podem não ter chance de passar, devido ao estado inválido com o qual começariam.

Uma nova instância de `browser` é criada para cada arquivo de spec, o que torna este um lugar ideal para fazer hook e configurar quaisquer outros estados (servidor, bancos de dados). Repetições neste nível significam que todo o processo de configuração será simplesmente repetido, como se fosse para um novo arquivo de spec.

```js title="wdio.conf.js"
export const config = {
    // ...
    /**
     * O número de vezes para repetir o arquivo de spec inteiro quando ele falha como um todo
     */
    specFileRetries: 1,
    /**
     * Atraso em segundos entre as tentativas de repetição do arquivo de spec
     */
    specFileRetriesDelay: 0,
    /**
     * Arquivos de spec repetidos são inseridos no início da fila e repetidos imediatamente
     */
    specFileRetriesDeferred: false
}
```

## Executar um teste específico várias vezes

Isso serve para ajudar a evitar que testes instáveis sejam introduzidos em uma base de código. Ao adicionar a opção de cli `--repeat`, as specs ou suites especificadas serão executadas N vezes. Ao usar esta flag de cli, a flag `--spec` ou `--suite` também deve ser especificada.

Ao adicionar novos testes a uma base de código, especialmente por meio de um processo de CI/CD, os testes podem passar e ser mesclados, mas se tornar instáveis mais tarde. Essa instabilidade pode vir de várias coisas, como problemas de rede, carga do servidor, tamanho do banco de dados etc. Usar a flag `--repeat` no seu processo de CD/CD pode ajudar a detectar esses testes instáveis antes que sejam mesclados a uma base de código principal.

Uma estratégia a ser usada é executar seus testes normalmente no seu processo de CI/CD, mas, se você estiver introduzindo um novo teste, pode então executar outro conjunto de testes com a nova spec especificada em `--spec` junto com `--repeat`, para que o novo teste seja executado x vezes. Se o teste falhar em qualquer uma dessas vezes, ele não será mesclado e será necessário investigar por que falhou.

```sh
# Isso executará a spec example.e2e.js 5 vezes
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```