---
id: retry
title: Tentar Novamente Testes Instáveis
---

Você pode executar novamente certos testes com o testrunner do WebdriverIO que se mostrem instáveis devido a coisas como uma rede instável ou condições de corrida. (No entanto, não é recomendado simplesmente aumentar a taxa de repetição se os testes se tornarem instáveis!)

## Executar novamente suítes no Mocha

Desde a versão 3 do Mocha, você pode executar novamente suítes de teste inteiras (tudo dentro de um bloco `describe`). Se você usa o Mocha, deve favorecer esse mecanismo de repetição em vez da implementação do WebdriverIO, que só permite repetir certos blocos de teste (tudo dentro de um bloco `it`). Para usar o método `this.retries()`, o bloco da suíte `describe` deve usar uma função não vinculada `function(){}` em vez de uma função de seta `() => {}`, conforme descrito na [documentação do Mocha](https://mochajs.org/#arrow-functions). Usando o Mocha, você também pode definir uma contagem de repetições para todas as especificações usando `mochaOpts.retries` no seu arquivo `wdio.conf.js`.

Aqui está um exemplo:

```js
describe('retries', function () {
    // Retry all tests in this suite up to 4 times
    this.retries(4)

    beforeEach(async () => {
        await browser.url('http://www.yahoo.com')
    })

    it('should succeed on the 3rd try', async function () {
        // Specify this test to only retry up to 2 times
        this.retries(2)
        console.log('run')
        await expect($('.foo')).toBeDisplayed()
    })
})
```

## Executar novamente testes individuais no Jasmine ou Mocha

Para executar novamente um determinado bloco de teste, você pode simplesmente aplicar o número de repetições como último parâmetro após a função do bloco de teste:

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
     * spec that runs max 4 times (1 actual run + 3 reruns)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // returns number of retries
        // ...
    }, 3)
})
```

O mesmo funciona para hooks também:

```js
describe('my flaky app', () => {
    /**
     * hook that runs max 2 times (1 actual run + 1 rerun)
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
     * spec that runs max 4 times (1 actual run + 3 reruns)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // returns number of retries
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 3)
})
```

O mesmo funciona para hooks também:

```js
describe('my flaky app', () => {
    /**
     * hook that runs max 2 times (1 actual run + 1 rerun)
     */
    beforeEach(async () => {
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 1)

    // ...
})
```

Se você estiver usando o Jasmine, o segundo parâmetro é reservado para timeout. Para aplicar um parâmetro de repetição, você precisa definir o timeout para seu valor padrão `jasmine.DEFAULT_TIMEOUT_INTERVAL` e então aplicar sua contagem de repetições.

</TabItem>
</Tabs>

Este mecanismo de repetição permite apenas repetir hooks ou blocos de teste individuais. Se o seu teste é acompanhado por um hook para configurar sua aplicação, este hook não está sendo executado. O [Mocha oferece](https://mochajs.org/#retry-tests) repetições de teste nativas que fornecem esse comportamento, enquanto o Jasmine não. Você pode acessar o número de repetições executadas no hook `afterTest`.

## Repetição no Cucumber

### Executar novamente suítes completas no Cucumber

Para o cucumber >=6, você pode fornecer a opção de configuração [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) junto com um parâmetro opcional `retryTagFilter` para que todos ou alguns de seus cenários com falha recebam tentativas adicionais até terem sucesso. Para que esse recurso funcione, você precisa definir o `scenarioLevelReporter` como `true`.

### Repetir Definições de Etapas no Cucumber

Para definir uma taxa de repetição para certas definições de etapas, basta aplicar uma opção de repetição a ela, como:

```js
export default function () {
    /**
     * step definition that runs max 3 times (1 actual run + 2 reruns)
     */
    this.Given(/^some step definition$/, { wrapperOptions: { retry: 2 } }, async () => {
        // ...
    })
    // ...
})
```

As repetições só podem ser definidas no seu arquivo de definições de etapas, nunca no seu arquivo de recurso.

## Adicionar repetições com base em arquivos de especificação

Anteriormente, apenas repetições em nível de teste e suíte estavam disponíveis, o que é adequado na maioria dos casos.

Mas em quaisquer testes que envolvam estado (como em um servidor ou em um banco de dados), o estado pode ser deixado inválido após a primeira falha do teste. Quaisquer repetições subsequentes podem não ter chance de passar, devido ao estado inválido com o qual começariam.

Uma nova instância de `browser` é criada para cada arquivo de especificação, o que torna este um lugar ideal para conectar e configurar quaisquer outros estados (servidor, bancos de dados). Repetições neste nível significam que todo o processo de configuração será simplesmente repetido, assim como seria para um novo arquivo de especificação.

```js title="wdio.conf.js"
export const config = {
    // ...
    /**
     * The number of times to retry the entire specfile when it fails as a whole
     */
    specFileRetries: 1,
    /**
     * Delay in seconds between the spec file retry attempts
     */
    specFileRetriesDelay: 0,
    /**
     * Retried specfiles are inserted at the beginning of the queue and retried immediately
     */
    specFileRetriesDeferred: false
}
```

## Executar um teste específico várias vezes

Isso é para ajudar a evitar que testes instáveis sejam introduzidos em uma base de código. Ao adicionar a opção cli `--repeat`, ele executará as especificações ou suítes especificadas N vezes. Ao usar essa flag cli, a flag `--spec` ou `--suite` também deve ser especificada.

Ao adicionar novos testes a uma base de código, especialmente através de um processo de CI/CD, os testes podem passar e ser mesclados, mas podem se tornar instáveis posteriormente. Essa instabilidade pode vir de várias coisas, como problemas de rede, carga do servidor, tamanho do banco de dados, etc. Usar a flag `--repeat` no seu processo CD/CD pode ajudar a capturar esses testes instáveis antes que eles sejam mesclados a uma base de código principal.

Uma estratégia a ser usada é executar seus testes normalmente em seu processo de CI/CD, mas se você estiver introduzindo um novo teste, pode executar outro conjunto de testes com a nova especificação especificada em `--spec` junto com `--repeat` para que ele execute o novo teste x número de vezes. Se o teste falhar em qualquer uma dessas vezes, o teste não será mesclado e será necessário analisar o motivo da falha.

```sh
# This will run the example.e2e.js spec 5 times
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```