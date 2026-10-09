---
id: retry
title: Reintentar pruebas inestables
description: "Reintenta pruebas inestables en Mocha, Jasmine o Cucumber, vuelve a ejecutar archivos spec completos y ejecuta una prueba específica varias veces para detectar inestabilidad."
---

Puedes volver a ejecutar con el testrunner de WebdriverIO ciertas pruebas que resulten ser inestables debido a cosas como una red poco fiable o condiciones de carrera. (Sin embargo, ¡no se recomienda simplemente aumentar la tasa de reejecución si las pruebas se vuelven inestables!)

## Volver a ejecutar suites en Mocha

Desde la versión 3 de Mocha, puedes volver a ejecutar suites de pruebas completas (todo lo que está dentro de un bloque `describe`). Si usas Mocha, deberías preferir este mecanismo de reintento en lugar de la implementación de WebdriverIO, que solo te permite volver a ejecutar ciertos bloques de prueba (todo lo que está dentro de un bloque `it`). Para usar el método `this.retries()`, el bloque de suite `describe` debe usar una función no vinculada `function(){}` en lugar de una función flecha `() => {}`, como se describe en la [documentación de Mocha](https://mochajs.org/#arrow-functions). Con Mocha también puedes establecer un número de reintentos para todas las specs usando `mochaOpts.retries` en tu `wdio.conf.js`.

Aquí tienes un ejemplo:

```js
describe('retries', function () {
    // Reintentar todas las pruebas de esta suite hasta 4 veces
    this.retries(4)

    beforeEach(async () => {
        await browser.url('http://www.yahoo.com')
    })

    it('should succeed on the 3rd try', async function () {
        // Especificar que esta prueba solo se reintente hasta 2 veces
        this.retries(2)
        console.log('run')
        await expect($('.foo')).toBeDisplayed()
    })
})
```

## Volver a ejecutar pruebas individuales en Jasmine o Mocha

Para volver a ejecutar un bloque de prueba determinado, simplemente puedes indicar el número de reejecuciones como último parámetro después de la función del bloque de prueba:

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
     * spec que se ejecuta como máximo 4 veces (1 ejecución real + 3 reejecuciones)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // devuelve el número de reintentos
        // ...
    }, 3)
})
```

Lo mismo funciona también para los hooks:

```js
describe('my flaky app', () => {
    /**
     * hook que se ejecuta como máximo 2 veces (1 ejecución real + 1 reejecución)
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
     * spec que se ejecuta como máximo 4 veces (1 ejecución real + 3 reejecuciones)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // devuelve el número de reintentos
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 3)
})
```

Lo mismo funciona también para los hooks:

```js
describe('my flaky app', () => {
    /**
     * hook que se ejecuta como máximo 2 veces (1 ejecución real + 1 reejecución)
     */
    beforeEach(async () => {
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 1)

    // ...
})
```

Si usas Jasmine, el segundo parámetro está reservado para el timeout. Para aplicar un parámetro de reintento, necesitas establecer el timeout a su valor predeterminado `jasmine.DEFAULT_TIMEOUT_INTERVAL` y luego indicar tu número de reintentos.

</TabItem>
</Tabs>

Este mecanismo de reintento solo permite reintentar hooks o bloques de prueba individuales. Si tu prueba va acompañada de un hook para configurar tu aplicación, este hook no se ejecuta. [Mocha ofrece](https://mochajs.org/#retry-tests) reintentos de pruebas nativos que proporcionan este comportamiento, mientras que Jasmine no. Puedes acceder al número de reintentos ejecutados en el hook `afterTest`.

## Volver a ejecutar en Cucumber

### Volver a ejecutar suites completas en Cucumber

Para cucumber >=6 puedes proporcionar la opción de configuración [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) junto con un parámetro opcional `retryTagFilter` para que todos o algunos de tus escenarios fallidos obtengan reintentos adicionales hasta que tengan éxito. Para que esta funcionalidad funcione, necesitas establecer `scenarioLevelReporter` a `true`.

### Volver a ejecutar definiciones de pasos en Cucumber

Para definir una tasa de reejecución para ciertas definiciones de pasos, simplemente aplícales una opción de reintento, por ejemplo:

```js
export default function () {
    /**
     * definición de paso que se ejecuta como máximo 3 veces (1 ejecución real + 2 reejecuciones)
     */
    this.Given(/^some step definition$/, { wrapperOptions: { retry: 2 } }, async () => {
        // ...
    })
    // ...
})
```

Las reejecuciones solo se pueden definir en tu archivo de definiciones de pasos, nunca en tu archivo feature.

## Añadir reintentos por archivo spec

Anteriormente, solo estaban disponibles los reintentos a nivel de prueba y de suite, que son suficientes en la mayoría de los casos.

Pero en cualquier prueba que implique estado (como en un servidor o en una base de datos), el estado puede quedar inválido después del primer fallo de la prueba. Es posible que los reintentos posteriores no tengan ninguna posibilidad de pasar, debido al estado inválido con el que comenzarían.

Se crea una nueva instancia de `browser` para cada archivo spec, lo que lo convierte en un lugar ideal para engancharse y configurar cualquier otro estado (servidor, bases de datos). Los reintentos a este nivel significan que todo el proceso de configuración simplemente se repetirá, igual que si se tratara de un nuevo archivo spec.

```js title="wdio.conf.js"
export const config = {
    // ...
    /**
     * Número de veces que se reintenta el archivo spec completo cuando falla en su conjunto
     */
    specFileRetries: 1,
    /**
     * Retraso en segundos entre los intentos de reintento del archivo spec
     */
    specFileRetriesDelay: 0,
    /**
     * Los archivos spec reintentados se insertan al principio de la cola y se reintentan inmediatamente
     */
    specFileRetriesDeferred: false
}
```

## Ejecutar una prueba específica varias veces

Esto sirve para ayudar a evitar que se introduzcan pruebas inestables en una base de código. Al añadir la opción de cli `--repeat`, se ejecutarán las specs o suites especificadas N veces. Al usar este flag de cli, también se debe especificar el flag `--spec` o `--suite`.

Al añadir nuevas pruebas a una base de código, especialmente a través de un proceso de CI/CD, las pruebas podrían pasar y fusionarse, pero volverse inestables más adelante. Esta inestabilidad podría deberse a varias cosas, como problemas de red, carga del servidor, tamaño de la base de datos, etc. Usar el flag `--repeat` en tu proceso de CD/CD puede ayudar a detectar estas pruebas inestables antes de que se fusionen en la base de código principal.

Una estrategia a utilizar es ejecutar tus pruebas de forma normal en tu proceso de CI/CD, pero si estás introduciendo una nueva prueba, puedes ejecutar otro conjunto de pruebas con la nueva spec especificada en `--spec` junto con `--repeat` para que ejecute la nueva prueba x número de veces. Si la prueba falla en cualquiera de esas veces, no se fusionará y será necesario investigar por qué falló.

```sh
# Esto ejecutará la spec example.e2e.js 5 veces
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```