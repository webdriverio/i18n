---
id: retry
title: Reintentar Pruebas Inestables
---

Puedes volver a ejecutar ciertas pruebas con el testrunner de WebdriverIO que resultan ser inestables debido a cosas como una red inestable o condiciones de carrera. (Sin embargo, ¡no se recomienda simplemente aumentar la tasa de reintento si las pruebas se vuelven inestables!)

## Volver a ejecutar suites en Mocha

Desde la versión 3 de Mocha, puedes volver a ejecutar suites de pruebas completas (todo dentro de un bloque `describe`). Si usas Mocha, deberías favorecer este mecanismo de reintento en lugar de la implementación de WebdriverIO que solo te permite volver a ejecutar ciertos bloques de prueba (todo dentro de un bloque `it`). Para usar el método `this.retries()`, el bloque de suite `describe` debe usar una función sin vincular `function(){}` en lugar de una función de flecha `() => {}`, como se describe en [la documentación de Mocha](https://mochajs.org/#arrow-functions). Usando Mocha también puedes establecer un contador de reintentos para todas las especificaciones usando `mochaOpts.retries` en tu `wdio.conf.js`.

Aquí hay un ejemplo:

```js
describe('retries', function () {
    // Reintentar todas las pruebas en esta suite hasta 4 veces
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

Para volver a ejecutar un cierto bloque de prueba, puedes simplemente aplicar el número de reintentos como último parámetro después de la función del bloque de prueba:

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
     * spec que se ejecuta máximo 4 veces (1 ejecución real + 3 reintentos)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // devuelve el número de reintentos
        // ...
    }, 3)
})
```

Lo mismo funciona para los hooks también:

```js
describe('my flaky app', () => {
    /**
     * hook que se ejecuta máximo 2 veces (1 ejecución real + 1 reintento)
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
     * spec que se ejecuta máximo 4 veces (1 ejecución real + 3 reintentos)
     */
    it('should rerun a test at least 3 times', async function () {
        console.log(this.wdioRetries) // devuelve el número de reintentos
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 3)
})
```

Lo mismo funciona para los hooks también:

```js
describe('my flaky app', () => {
    /**
     * hook que se ejecuta máximo 2 veces (1 ejecución real + 1 reintento)
     */
    beforeEach(async () => {
        // ...
    }, jasmine.DEFAULT_TIMEOUT_INTERVAL, 1)

    // ...
})
```

Si estás usando Jasmine, el segundo parámetro está reservado para el tiempo de espera. Para aplicar un parámetro de reintento, debes establecer el tiempo de espera en su valor predeterminado `jasmine.DEFAULT_TIMEOUT_INTERVAL` y luego aplicar tu recuento de reintentos.

</TabItem>
</Tabs>

Este mecanismo de reintento solo permite reintentar hooks o bloques de prueba individuales. Si tu prueba está acompañada de un hook para configurar tu aplicación, este hook no se ejecuta. [Mocha ofrece](https://mochajs.org/#retry-tests) reintentos de prueba nativos que proporcionan este comportamiento, mientras que Jasmine no. Puedes acceder al número de reintentos ejecutados en el hook `afterTest`.

## Reintentando en Cucumber

### Volver a ejecutar suites completas en Cucumber

Para cucumber >=6 puedes proporcionar la opción de configuración [`retry`](https://github.com/cucumber/cucumber-js/blob/master/docs/cli.md#retry-failing-tests) junto con un parámetro opcional `retryTagFilter` para que todos o algunos de tus escenarios fallidos obtengan reintentos adicionales hasta tener éxito. Para que esta característica funcione, debes establecer `scenarioLevelReporter` en `true`.

### Volver a ejecutar definiciones de pasos en Cucumber

Para definir una tasa de reintento para ciertas definiciones de pasos, simplemente aplica una opción de reintento, como:

```js
export default function () {
    /**
     * definición de paso que se ejecuta máximo 3 veces (1 ejecución real + 2 reintentos)
     */
    this.Given(/^some step definition$/, { wrapperOptions: { retry: 2 } }, async () => {
        // ...
    })
    // ...
})
```

Los reintentos solo se pueden definir en tu archivo de definiciones de pasos, nunca en tu archivo de características.

## Agregar reintentos por archivo de especificación

Anteriormente, solo estaban disponibles los reintentos a nivel de prueba y suite, lo que está bien en la mayoría de los casos.

Pero en cualquier prueba que involucre estado (como en un servidor o en una base de datos), el estado puede quedar inválido después del primer fallo de la prueba. Cualquier reintento posterior puede no tener ninguna posibilidad de pasar, debido al estado inválido con el que comenzarían.

Se crea una nueva instancia de `browser` para cada archivo de especificación, lo que lo convierte en un lugar ideal para conectar y configurar cualquier otro estado (servidor, bases de datos). Los reintentos en este nivel significan que todo el proceso de configuración simplemente se repetirá, tal como si fuera para un nuevo archivo de especificación.

```js title="wdio.conf.js"
export const config = {
    // ...
    /**
     * El número de veces para reintentar todo el archivo de especificación cuando falla en su totalidad
     */
    specFileRetries: 1,
    /**
     * Retraso en segundos entre los intentos de reintento del archivo de especificación
     */
    specFileRetriesDelay: 0,
    /**
     * Los archivos de especificación reintentados se insertan al principio de la cola y se reintentan inmediatamente
     */
    specFileRetriesDeferred: false
}
```

## Ejecutar una prueba específica varias veces

Esto es para ayudar a prevenir que se introduzcan pruebas inestables en una base de código. Al agregar la opción cli `--repeat`, ejecutará las especificaciones o suites especificadas N veces. Cuando se usa esta bandera cli, también se debe especificar la bandera `--spec` o `--suite`.

Al agregar nuevas pruebas a una base de código, especialmente a través de un proceso de CI/CD, las pruebas podrían pasar y fusionarse pero volverse inestables más adelante. Esta inestabilidad podría provenir de varias cosas como problemas de red, carga del servidor, tamaño de la base de datos, etc. Usar la bandera `--repeat` en tu proceso de CD/CD puede ayudar a detectar estas pruebas inestables antes de que se fusionen con una base de código principal.

Una estrategia a utilizar es ejecutar tus pruebas como de costumbre en tu proceso de CI/CD, pero si estás introduciendo una nueva prueba, puedes ejecutar otro conjunto de pruebas con la nueva especificación especificada en `--spec` junto con `--repeat` para que ejecute la nueva prueba x número de veces. Si la prueba falla en cualquiera de esas veces, entonces la prueba no se fusionará y será necesario examinar por qué falló.

```sh
# Esto ejecutará la especificación example.e2e.js 5 veces
npx wdio run ./wdio.conf.js --spec example.e2e.js --repeat 5
```