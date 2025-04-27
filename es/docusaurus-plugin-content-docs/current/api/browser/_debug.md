---
id: debug
title: depurar
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/debug.ts
---

Este comando te ayuda a depurar tus pruebas de integración. Detiene el navegador en ejecución y te da 
tiempo para acceder a él y verificar el estado de tu aplicación (por ejemplo, usando herramientas de desarrollo).
Tu terminal se transforma en una interfaz [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)
que te permitirá probar ciertos comandos, encontrar elementos y probar acciones en
ellos.

[![WebdriverIO REPL](https://webdriver.io/img/repl.gif)](https://webdriver.io/img/repl.gif)

Si ejecutas el testrunner de WDIO asegúrate de aumentar la propiedad timeout del marco de pruebas
que estás utilizando (por ejemplo, Mocha o Jasmine) para evitar la terminación de la prueba debido a un timeout.
También evita ejecutar el comando con múltiples capabilities ejecutándose al mismo tiempo.

<iframe width="560" height="315" src="https://www.youtube.com/embed/xWwP-3B_YyE" frameborder="0" allowFullScreen></iframe>

##### Uso

```js
browser.debug()
```

##### Ejemplo

```js title="debug.js"
it('should demonstrate the debug command', async () => {
    await $('#input').setValue('FOO')
    await browser.debug() // jumping into the browser and change value of #input to 'BAR'
    const value = await $('#input').getValue()
    console.log(value) // outputs: "BAR"
})
```