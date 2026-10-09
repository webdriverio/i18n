---
id: timeouts
title: Timeouts
description: "Configure os timeouts de sessão do WebDriver, os timeouts de waitFor do WebdriverIO e os timeouts do framework de testes para manter os testes confiáveis."
---

Cada comando no WebdriverIO é uma operação assíncrona. Uma requisição é enviada ao servidor Selenium (ou a um serviço em nuvem como o [Sauce Labs](https://saucelabs.com)), e sua resposta contém o resultado assim que a ação é concluída ou falha.

Portanto, o tempo é um componente crucial em todo o processo de teste. Quando uma determinada ação depende do estado de outra ação, você precisa garantir que elas sejam executadas na ordem correta. Os timeouts desempenham um papel importante ao lidar com essas questões.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## Timeouts do WebDriver

### Timeout de Script da Sessão

Uma sessão possui um timeout de script associado que especifica o tempo de espera para a execução de scripts assíncronos. Salvo indicação em contrário, ele é de 30 segundos. Você pode definir esse timeout assim:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.execute(async () => {
    console.log('this should not fail')
    await new Promise((resolve) => setTimeout(resolve, 59000))
})
```

### Timeout de Carregamento de Página da Sessão

Uma sessão possui um timeout de carregamento de página associado que especifica o tempo de espera para que o carregamento da página seja concluído. Salvo indicação em contrário, ele é de 300.000 milissegundos.

Você pode definir esse timeout assim:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> `pageLoad` é o nome do [timeout](https://www.w3.org/TR/webdriver/#set-timeouts) do WebDriver. O WebdriverIO v10 aceita apenas essa chave.

### Timeout de Espera Implícita da Sessão

Uma sessão possui um timeout de espera implícita associado. Ele especifica o tempo de espera para a estratégia implícita de localização de elementos ao localizar elementos usando os comandos [`findElement`](/docs/api/webdriver#findelement) ou [`findElements`](/docs/api/webdriver#findelements) ([`$`](/docs/api/browser/$) ou [`$$`](/docs/api/browser/$$), respectivamente, ao executar o WebdriverIO com ou sem o testrunner WDIO). Salvo indicação em contrário, ele é de 0 milissegundos.

Você pode definir esse timeout via:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## Timeouts relacionados ao WebdriverIO

### Timeout `WaitFor*`

O WebdriverIO fornece vários comandos para aguardar que os elementos atinjam um determinado estado (por exemplo, habilitado, visível, existente). Esses comandos recebem um argumento seletor e um número de timeout, que determina por quanto tempo a instância deve esperar até que o elemento atinja esse estado. A opção `waitforTimeout` permite definir o timeout global para todos os comandos `waitFor*`, para que você não precise definir o mesmo timeout repetidamente. _(Observe o `f` minúsculo!)_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

Nos seus testes, agora você pode fazer isto:

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// você também pode sobrescrever o timeout padrão, se necessário
await myElem.waitForDisplayed({ timeout: 10000 })
```

## Timeouts relacionados ao framework

O framework de testes que você está usando com o WebdriverIO precisa lidar com timeouts, especialmente porque tudo é assíncrono. Isso garante que o processo de teste não fique travado se algo der errado.

Por padrão, o timeout é de 10 segundos, o que significa que um único teste não deve demorar mais do que isso.

Um único teste no Mocha se parece com:

```js
it('should login into the application', async () => {
    await browser.url('/login')

    const form = await $('form')
    const username = await $('#username')
    const password = await $('#password')

    await username.setValue('userXY')
    await password.setValue('******')
    await form.submit()

    expect(await browser.getTitle()).to.be.equal('Admin Area')
})
```

No Cucumber, o timeout se aplica a uma única definição de step. No entanto, se você quiser aumentar o timeout porque seu teste demora mais do que o valor padrão, é necessário defini-lo nas opções do framework.

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
    {label: 'Cucumber', value: 'cucumber'}
  ]
}>
<TabItem value="mocha">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'mocha',
    mochaOpts: {
        timeout: 20000
    },
    // ...
}
```

</TabItem>
<TabItem value="jasmine">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'jasmine',
    jasmineOpts: {
        defaultTimeoutInterval: 20000
    },
    // ...
}
```

</TabItem>
<TabItem value="cucumber">

```js
// wdio.conf.js
export const config = {
    // ...
    framework: 'cucumber',
    cucumberOpts: {
        timeout: 20000
    },
    // ...
}
```

</TabItem>
</Tabs>