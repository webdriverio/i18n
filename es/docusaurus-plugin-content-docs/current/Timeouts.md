---
id: timeouts
title: Tiempos de espera
description: "Configura los tiempos de espera de sesión de WebDriver, los tiempos de espera waitfor de WebdriverIO y los tiempos de espera del framework de pruebas para mantener las pruebas fiables."
---

Cada comando en WebdriverIO es una operación asíncrona. Se envía una solicitud al servidor de Selenium (o a un servicio en la nube como [Sauce Labs](https://saucelabs.com)), y su respuesta contiene el resultado una vez que la acción se ha completado o ha fallado.

Por lo tanto, el tiempo es un componente crucial en todo el proceso de pruebas. Cuando una determinada acción depende del estado de otra acción, debes asegurarte de que se ejecuten en el orden correcto. Los tiempos de espera desempeñan un papel importante al abordar estos problemas.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## Tiempos de espera de WebDriver

### Tiempo de espera de scripts de sesión

Una sesión tiene asociado un tiempo de espera de scripts de sesión que especifica el tiempo de espera para la ejecución de scripts asíncronos. A menos que se indique lo contrario, es de 30 segundos. Puedes establecer este tiempo de espera de la siguiente manera:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.execute(async () => {
    console.log('this should not fail')
    await new Promise((resolve) => setTimeout(resolve, 59000))
})
```

### Tiempo de espera de carga de página de sesión

Una sesión tiene asociado un tiempo de espera de carga de página de sesión que especifica el tiempo de espera para que se complete la carga de la página. A menos que se indique lo contrario, es de 300.000 milisegundos.

Puedes establecer este tiempo de espera de la siguiente manera:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> `pageLoad` es el nombre de [timeouts](https://www.w3.org/TR/webdriver/#set-timeouts) de WebDriver. WebdriverIO v10 solo acepta esa clave.

### Tiempo de espera implícito de sesión

Una sesión tiene asociado un tiempo de espera implícito de sesión. Este especifica el tiempo de espera para la estrategia implícita de localización de elementos al localizar elementos mediante los comandos [`findElement`](/docs/api/webdriver#findelement) o [`findElements`](/docs/api/webdriver#findelements) ([`$`](/docs/api/browser/$) o [`$$`](/docs/api/browser/$$), respectivamente, al ejecutar WebdriverIO con o sin el testrunner de WDIO). A menos que se indique lo contrario, es de 0 milisegundos.

Puedes establecer este tiempo de espera mediante:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## Tiempos de espera relacionados con WebdriverIO

### Tiempo de espera `WaitFor*`

WebdriverIO proporciona múltiples comandos para esperar a que los elementos alcancen un determinado estado (p. ej., habilitado, visible, existente). Estos comandos reciben un argumento de selector y un número de tiempo de espera, que determina cuánto tiempo debe esperar la instancia a que ese elemento alcance el estado. La opción `waitforTimeout` te permite establecer el tiempo de espera global para todos los comandos `waitFor*`, de modo que no necesites establecer el mismo tiempo de espera una y otra vez. _(¡Fíjate en la `f` minúscula!)_

```js
// wdio.conf.js
export const config = {
    // ...
    waitforTimeout: 5000,
    // ...
}
```

En tus pruebas, ahora puedes hacer esto:

```js
const myElem = await $('#myElem')
await myElem.waitForDisplayed()

// también puedes sobrescribir el tiempo de espera predeterminado si es necesario
await myElem.waitForDisplayed({ timeout: 10000 })
```

## Tiempos de espera relacionados con el framework

El framework de pruebas que utilizas con WebdriverIO tiene que gestionar tiempos de espera, especialmente porque todo es asíncrono. Esto garantiza que el proceso de pruebas no se quede bloqueado si algo sale mal.

Por defecto, el tiempo de espera es de 10 segundos, lo que significa que una sola prueba no debería tardar más que eso.

Una sola prueba en Mocha tiene este aspecto:

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

En Cucumber, el tiempo de espera se aplica a una única definición de paso. Sin embargo, si deseas aumentar el tiempo de espera porque tu prueba tarda más que el valor predeterminado, debes establecerlo en las opciones del framework.

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