---
id: debug
title: depuração
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/debug.ts
---

Este comando ajuda você a depurar seus testes de integração. Ele para o navegador em execução e dá a você tempo para interagir com ele e verificar o estado da sua aplicação (por exemplo, usando ferramentas de desenvolvedor).
Seu terminal se transforma em uma interface [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) que permitirá que você experimente certos comandos, encontre elementos e teste ações neles.

[![WebdriverIO REPL](https://webdriver.io/img/repl.gif)](https://webdriver.io/img/repl.gif)

Se você estiver executando o testrunner WDIO, certifique-se de aumentar a propriedade de timeout do framework de teste que você está usando (por exemplo, Mocha ou Jasmine) para evitar a finalização do teste devido a um timeout. Também evite executar o comando com múltiplas capabilities rodando ao mesmo tempo.

<iframe width="560" height="315" src="https://www.youtube.com/embed/xWwP-3B_YyE" frameborder="0" allowFullScreen></iframe>

##### Uso

```js
browser.debug()
```

##### Exemplo

```js title="debug.js"
it('should demonstrate the debug command', async () => {
    await $('#input').setValue('FOO')
    await browser.debug() // jumping into the browser and change value of #input to 'BAR'
    const value = await $('#input').getValue()
    console.log(value) // outputs: "BAR"
})
```