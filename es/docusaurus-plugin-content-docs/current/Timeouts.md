---
id: timeouts
title: Tiempos de espera
---

Cada comando en WebdriverIO es una operación asíncrona. Se envía una solicitud al servidor de Selenium (o a un servicio en la nube como [Sauce Labs](https://saucelabs.com)), y su respuesta contiene el resultado una vez que la acción se ha completado o ha fallado.

Por lo tanto, el tiempo es un componente crucial en todo el proceso de prueba. Cuando una determinada acción depende del estado de una acción diferente, debes asegurarte de que se ejecuten en el orden correcto. Los tiempos de espera juegan un papel importante cuando se trata de estos problemas.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## Tiempos de espera de WebDriver

### Tiempo de espera de script de sesión

Una sesión tiene un tiempo de espera de script de sesión asociado que especifica un tiempo para esperar a que se ejecuten scripts asíncronos. A menos que se indique lo contrario, es de 30 segundos. Puedes configurar este tiempo de espera así:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.executeAsync((done) => {
    console.log('this should not fail')
    setTimeout(done, 59000)
})
```

### Tiempo de espera de carga de página de sesión

Una sesión tiene un tiempo de espera de carga de página de sesión asociado que especifica un tiempo para esperar a que se complete la carga de la página. A menos que se indique lo contrario, es de 300,000 milisegundos.

Puedes configurar este tiempo de espera así:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> La palabra clave `pageLoad` es parte de la [especificación](https://www.w3.org/TR/webdriver/#set-timeouts) oficial de WebDriver, pero podría no estar [soportada](https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/687) para tu navegador (el nombre anterior es `page load`).

### Tiempo de espera implícito de sesión

Una sesión tiene un tiempo de espera implícito de sesión asociado. Esto especifica el tiempo de espera para la estrategia de ubicación implícita de elementos al localizar elementos usando los comandos [`findElement`](/docs/api/webdriver#findelement) o [`findElements`](/docs/api/webdriver#findelements) ([`$`](/docs/api/browser/$) o [`$$`](/docs/api/browser/$$), respectivamente, cuando se ejecuta WebdriverIO con o sin el ejecutor de pruebas WDIO). A menos que se indique lo contrario, es de 0 milisegundos.

Puedes configurar este tiempo de espera a través de:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## Tiempos de espera relacionados con WebdriverIO

### Tiempo de espera `WaitFor*`

WebdriverIO proporciona múltiples comandos para esperar a que los elementos alcancen un cierto estado (por ejemplo, habilitado, visible, existente). Estos comandos toman un argumento selector y un número de tiempo de espera, que determina cuánto tiempo debe esperar la instancia para que ese elemento alcance el estado. La opción `waitforTimeout` te permite establecer el tiempo de espera global para todos los comandos `waitFor*`, por lo que no necesitas establecer el mismo tiempo de espera una y otra vez. _(¡Nota la 'f' minúscula!)_

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

El framework de pruebas que estás utilizando con WebdriverIO tiene que lidiar con tiempos de espera, especialmente porque todo es asíncrono. Asegura que el proceso de prueba no se quede atascado si algo sale mal.

Por defecto, el tiempo de espera es de 10 segundos, lo que significa que una sola prueba no debería tomar más tiempo que ese.

Una prueba individual en Mocha se ve así:

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

En Cucumber, el tiempo de espera se aplica a una sola definición de paso. Sin embargo, si deseas aumentar el tiempo de espera porque tu prueba toma más tiempo que el valor predeterminado, debes establecerlo en las opciones del framework.

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