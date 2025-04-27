---
id: timeouts
title: Timeouts
---

Cada comando no WebdriverIO é uma operação assíncrona. Uma requisição é enviada ao servidor Selenium (ou um serviço na nuvem como [Sauce Labs](https://saucelabs.com)), e sua resposta contém o resultado quando a ação foi concluída ou falhou.

Portanto, o tempo é um componente crucial em todo o processo de teste. Quando uma determinada ação depende do estado de uma ação diferente, você precisa garantir que elas sejam executadas na ordem correta. Os timeouts desempenham um papel importante ao lidar com essas questões.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## Timeouts do WebDriver

### Timeout de Script de Sessão

Uma sessão tem um timeout de script de sessão associado que especifica um tempo para aguardar a execução de scripts assíncronos. A menos que seja indicado o contrário, é de 30 segundos. Você pode definir este timeout assim:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.executeAsync((done) => {
    console.log('this should not fail')
    setTimeout(done, 59000)
})
```

### Timeout de Carregamento de Página de Sessão

Uma sessão tem um timeout de carregamento de página associado que especifica um tempo para aguardar o carregamento completo da página. A menos que seja indicado o contrário, é de 300.000 milissegundos.

Você pode definir este timeout assim:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> A palavra-chave `pageLoad` é parte da [especificação](https://www.w3.org/TR/webdriver/#set-timeouts) oficial do WebDriver, mas pode não ser [suportada](https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/687) para o seu navegador (o nome anterior é `page load`).

### Timeout de Espera Implícita de Sessão

Uma sessão tem um timeout de espera implícita associado. Isso especifica o tempo para aguardar pela estratégia de localização implícita de elementos ao localizar elementos usando os comandos [`findElement`](/docs/api/webdriver#findelement) ou [`findElements`](/docs/api/webdriver#findelements) ([`$`](/docs/api/browser/$) ou [`$$`](/docs/api/browser/$$), respectivamente, ao executar o WebdriverIO com ou sem o testrunner WDIO). A menos que seja indicado o contrário, é de 0 milissegundos.

Você pode definir este timeout via:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## Timeouts relacionados ao WebdriverIO

### Timeout `WaitFor*`

O WebdriverIO fornece vários comandos para esperar que os elementos atinjam um determinado estado (por exemplo, habilitado, visível, existente). Esses comandos aceitam um argumento de seletor e um número de timeout, que determina por quanto tempo a instância deve esperar para que o elemento atinja o estado. A opção `waitforTimeout` permite que você defina o timeout global para todos os comandos `waitFor*`, para que você não precise definir o mesmo timeout repetidamente. _(Observe o 'f' minúsculo!)_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

Em seus testes, agora você pode fazer isso:

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// você também pode sobrescrever o timeout padrão se necessário
await myElem.waitForDisplayed({ timeout: 10000 })
```

## Timeouts relacionados ao Framework

O framework de teste que você está usando com o WebdriverIO precisa lidar com timeouts, especialmente porque tudo é assíncrono. Ele garante que o processo de teste não fique travado se algo der errado.

Por padrão, o timeout é de 10 segundos, o que significa que um único teste não deve levar mais tempo que isso.

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

No Cucumber, o timeout se aplica a uma única definição de passo. No entanto, se você quiser aumentar o timeout porque seu teste leva mais tempo do que o valor padrão, você precisa defini-lo nas opções do framework.

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