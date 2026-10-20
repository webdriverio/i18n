---
id: timeouts
title: Tiempos de espera
description: "Configura los tiempos de espera de sesión de WebDriver, los tiempos de espera waitfor de WebdriverIO y los tiempos de espera del framework de pruebas para mantener las pruebas fiables."
---

Cada comando en WebdriverIO es una operación asíncrona. Se envía una solicitud al servidor Selenium (o a un servicio en la nube como [Sauce Labs](https://saucelabs.com)), y su respuesta contiene el resultado una vez que la acción se ha completado o ha fallado.

Por lo tanto, el tiempo es un componente crucial en todo el proceso de pruebas. Cuando una determinada acción depende del estado de otra acción, necesitas asegurarte de que se ejecuten en el orden correcto. Los tiempos de espera juegan un papel importante al tratar con estos problemas.

<LiteYouTubeEmbed
    id="5oI37h4qxEw"
    title="Timeouts"
/>

## Tiempos de espera de WebDriver

### Tiempo de espera de script de sesión

Una sesión tiene asociado un tiempo de espera de script de sesión que especifica el tiempo de espera para que se ejecuten los scripts asíncronos. A menos que se indique lo contrario, es de 30 segundos. Puedes establecer este tiempo de espera así:

```js
await browser.setTimeout({ 'script': 60000 })
await browser.execute(async () => {
    console.log('this should not fail')
    await new Promise((resolve) => setTimeout(resolve, 59000))
})
```

### Tiempo de espera de carga de página de sesión

Una sesión tiene asociado un tiempo de espera de carga de página de sesión que especifica el tiempo de espera para que se complete la carga de la página. A menos que se indique lo contrario, es de 300.000 milisegundos.

Puedes establecer este tiempo de espera así:

```js
await browser.setTimeout({ 'pageLoad': 10000 })
```

> `pageLoad` es el nombre de [timeouts](https://www.w3.org/TR/webdriver/#set-timeouts) de WebDriver. WebdriverIO v10 solo acepta esa clave.

### Tiempo de espera implícito de sesión

Una sesión tiene asociado un tiempo de espera implícito de sesión. Este especifica el tiempo de espera para la estrategia de localización implícita de elementos al localizar elementos usando los comandos [`findElement`](/docs/api/webdriver#findelement) o [`findElements`](/docs/api/webdriver#findelements) ([`$`](/docs/api/browser/$) o [`$$`](/docs/api/browser/$$), respectivamente, al ejecutar WebdriverIO con o sin el testrunner de WDIO). A menos que se indique lo contrario, es de 0 milisegundos.

Puedes establecer este tiempo de espera mediante:

```js
await browser.setTimeout({ 'implicit': 5000 })
```

## Tiempos de espera relacionados con WebdriverIO

### Tiempo de espera `WaitFor*`

WebdriverIO proporciona múltiples comandos para esperar a que los elementos alcancen un determinado estado (p. ej., habilitado, visible, existente). Estos comandos reciben un argumento selector y un número de tiempo de espera, que determina cuánto tiempo debe esperar la instancia a que ese elemento alcance el estado. La opción `waitforTimeout` te permite establecer el tiempo de espera global para todos los comandos `waitFor*`, para que no necesites establecer el mismo tiempo de espera una y otra vez. _(¡Observa la `f` minúscula!)_

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

// you can also overwrite the default timeout if needed
await myElem.waitForDisplayed({ timeout: 10000 })
```

### Un elemento que la página eliminó

Cuando la página elimina o vuelve a renderizar un elemento, WebdriverIO lo busca de nuevo con su selector y espera hasta `waitforTimeout`. Si está ahí, el comando se ejecuta sobre él. Si no, el comando falla con:

- `message`: `Can't call <command> on element with selector "<selector>" because element wasn't found` (un elemento de `$$()`: `… "<selector>" at index <n> …`; un padre eliminado: el mensaje trata sobre el padre)
- `cause`: el error de referencia de elemento obsoleto (stale element reference) del driver

`waitUntil` y `waitForEnabled` fallan con su propio error, que tiene este error como `cause`. `isDisplayed` e `isExisting` del elemento eliminado no esperan: devuelven `false`. Para un hijo de un padre eliminado, esperan y fallan con este error.

```ts title="test/specs/removed.e2e.ts"
import { $, browser, expect } from '@wdio/globals'

describe('a removed element', () => {
    it('gives the error of an element that was not found again', async () => {
        await browser.url('https://webdriver.io')
        const title = await $('h1')
        await browser.execute(() => document.querySelectorAll('h1').forEach((h1) => h1.remove()))

        const error = await title.getText().then(() => null, (err: Error) => err)
        expect(error?.message).toContain('because element wasn\'t found')
    })
})
```

## Tiempos de espera relacionados con el framework

El framework de pruebas que estás usando con WebdriverIO tiene que lidiar con tiempos de espera, especialmente porque todo es asíncrono. Esto garantiza que el proceso de pruebas no se quede atascado si algo sale mal.

Por defecto, el tiempo de espera es de 10 segundos, lo que significa que una sola prueba no debería tardar más que eso.

Una sola prueba en Mocha se ve así:

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

En Cucumber, el tiempo de espera se aplica a una sola definición de paso. Sin embargo, si quieres aumentar el tiempo de espera porque tu prueba tarda más que el valor predeterminado, necesitas establecerlo en las opciones del framework.

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

### Tiempos de espera de Mocha y los hooks de WebdriverIO

Una prueba o hook de Mocha puede cambiar su propio tiempo de espera con `this.timeout(ms)`. Usa una `function`, no una función flecha, para obtener `this`. WebdriverIO sigue el cambio, también `this.timeout(0)`, que desactiva el tiempo de espera. Con `mochaOpts.parallelMode`, solo se aplica `mochaOpts.timeout`: `this.timeout()` en una prueba o hook lanza un error, y un tiempo de espera de una suite o de `it(...).timeout()` se ignora, con una advertencia. Consulta [Pruebas en paralelo en un archivo de especificación](./ParallelTests.md#hooks-and-timeouts).

El tiempo de espera de una prueba incluye el tiempo de su hook `beforeTest`, ya que Mocha inicia el temporizador antes del hook. Con la [opción de reintento](./Retry.md#rerun-single-tests-in-jasmine-or-mocha) de WebdriverIO, todos los intentos de una prueba comparten un mismo tiempo de espera.

Cuando una prueba o hook excede su tiempo de espera, WebdriverIO ejecuta `afterTest` (o `afterHook`) antes de que Mocha inicie la siguiente prueba, para que ese hook no pueda ejecutarse al mismo tiempo que la siguiente prueba. Mocha espera a estos hooks hasta un tiempo de espera adicional de la prueba.