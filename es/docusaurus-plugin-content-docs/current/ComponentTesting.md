---
id: component-testing
title: Pruebas de componentes
description: "Ejecuta pruebas unitarias y de componentes en navegadores reales con el browser runner de WebdriverIO, impulsado por Vite, incluyendo configuración, entorno de pruebas y depuración."
---

Con el [Browser Runner](/docs/runner#browser-runner) de WebdriverIO puedes ejecutar pruebas dentro de un navegador real de escritorio o móvil mientras usas WebdriverIO y el protocolo WebDriver para automatizar e interactuar con lo que se renderiza en la página. Este enfoque tiene [muchas ventajas](/docs/runner#browser-runner) en comparación con otros frameworks de pruebas que solo permiten probar contra [JSDOM](https://www.npmjs.com/package/jsdom).

## Compatibilidad con navegadores

El browser runner ejecuta el paquete de pruebas en el navegador. Ese paquete se ejecuta en Chrome 90, Edge 90, Firefox 90 y Safari 14.1, y en versiones posteriores de esos navegadores.

Las pruebas end-to-end se ejecutan en Node.js. En cambio, el código pasado a [`browser.execute`](/docs/api/browser/execute) se ejecuta en el navegador automatizado, que puede ser más antiguo que las versiones anteriores. Mantén ese código en ES2021.

## ¿Cómo funciona?

El Browser Runner utiliza [Vite](https://vitejs.dev/) para renderizar una página de prueba e inicializar un framework de pruebas para ejecutar tus pruebas en el navegador. Actualmente solo es compatible con Mocha, pero Jasmine y Cucumber están [en la hoja de ruta](https://github.com/orgs/webdriverio/projects/1). Esto permite probar cualquier tipo de componentes, incluso en proyectos que no usan Vite.

El servidor de Vite es iniciado por el testrunner de WebdriverIO y configurado para que puedas usar todos los reporters y servicios como lo hacías en las pruebas e2e normales. Además, inicializa una instancia de [`browser`](/docs/api/browser) que te permite acceder a un subconjunto de la [API de WebdriverIO](/docs/api) para interactuar con cualquier elemento de la página. Al igual que en las pruebas e2e, puedes acceder a esa instancia a través de la variable `browser` adjunta al ámbito global o importándola desde `@wdio/globals`, dependiendo de cómo esté configurado [`injectGlobals`](/docs/api/globals).

WebdriverIO tiene soporte integrado para los siguientes frameworks:

- [__Nuxt__](https://nuxt.com/): El testrunner de WebdriverIO detecta una aplicación Nuxt y configura automáticamente los composables de tu proyecto y ayuda a simular el backend de Nuxt; lee más en la [documentación de Nuxt](/docs/component-testing/vue#testing-vue-components-in-nuxt)
- [__TailwindCSS__](https://tailwindcss.com/): El testrunner de WebdriverIO detecta si estás usando TailwindCSS y carga el entorno correctamente en la página de prueba

## Configuración

Para configurar WebdriverIO para pruebas unitarias o de componentes en el navegador, inicia un nuevo proyecto de WebdriverIO mediante:

```bash
npm init wdio@latest ./
# o
yarn create wdio ./
```

Una vez que se inicie el asistente de configuración, elige `browser` para ejecutar pruebas unitarias y de componentes y selecciona uno de los presets si lo deseas; de lo contrario, elige _"Other"_ si solo quieres ejecutar pruebas unitarias básicas. También puedes configurar una configuración personalizada de Vite si ya usas Vite en tu proyecto. Para más información, consulta todas las [opciones del runner](/docs/runner#runner-options).

:::info

__Nota:__ WebdriverIO, por defecto, ejecutará las pruebas del navegador en CI en modo headless, p. ej., cuando una variable de entorno `CI` esté establecida en `'1'` o `'true'`. Puedes configurar manualmente este comportamiento usando la opción [`headless`](/docs/runner#headless) del runner.

:::

Al final de este proceso deberías encontrar un `wdio.conf.js` que contiene varias configuraciones de WebdriverIO, incluida una propiedad `runner`, p. ej.:

```ts reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

Al definir diferentes [capabilities](/docs/configuration#capabilities) puedes ejecutar tus pruebas en diferentes navegadores, en paralelo si lo deseas.

Si todavía no estás seguro de cómo funciona todo, mira el siguiente tutorial sobre cómo empezar con las pruebas de componentes en WebdriverIO:

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## Entorno de pruebas

Depende totalmente de ti qué quieres ejecutar en tus pruebas y cómo prefieres renderizar los componentes. Sin embargo, recomendamos usar [Testing Library](https://testing-library.com/) como framework de utilidades, ya que proporciona plugins para varios frameworks de componentes, como React, Preact, Svelte y Vue. Es muy útil para renderizar componentes en la página de prueba y limpia automáticamente estos componentes después de cada prueba.

Puedes combinar las primitivas de Testing Library con los comandos de WebdriverIO como desees, p. ej.:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__Nota:__ usar los métodos de renderizado de Testing Library ayuda a eliminar los componentes creados entre las pruebas. Si no usas Testing Library, asegúrate de adjuntar tus componentes de prueba a un contenedor que se limpie entre pruebas.

## Scripts de configuración

Puedes preparar tus pruebas ejecutando scripts arbitrarios en Node.js o en el navegador, p. ej., inyectando estilos, simulando APIs del navegador o conectándote a un servicio de terceros. Los [hooks](/docs/configuration#hooks) de WebdriverIO se pueden usar para ejecutar código en Node.js, mientras que [`mochaOpts.require`](/docs/frameworks#require) te permite importar scripts en el navegador antes de que se carguen las pruebas, p. ej.:

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // proporciona un script de configuración para ejecutar en el navegador
        require: './__fixtures__/setup.js'
    },
    before: () => {
        // configura el entorno de pruebas en Node.js
    }
    // ...
}
```

Por ejemplo, si quieres simular todas las llamadas a [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) en tu prueba con el siguiente script de configuración:

```js ./fixtures/setup.js
import { fn } from '@wdio/browser-runner'

// ejecuta código antes de que se carguen todas las pruebas
window.fetch = fn()

export const mochaGlobalSetup = () => {
    // ejecuta código después de que se cargue el archivo de prueba
}

export const mochaGlobalTeardown = () => {
    // ejecuta código después de que se haya ejecutado el archivo spec
}

```

Ahora, en tus pruebas puedes proporcionar valores de respuesta personalizados para todas las solicitudes del navegador. Lee más sobre los fixtures globales en la [documentación de Mocha](https://mochajs.org/#global-fixtures).

## Observar archivos de prueba y de la aplicación

Hay varias formas de depurar tus pruebas del navegador. La más sencilla es iniciar el testrunner de WebdriverIO con la flag `--watch`, p. ej.:

```sh
$ npx wdio run ./wdio.conf.js --watch
```

Esto ejecutará inicialmente todas las pruebas y se detendrá una vez que todas se hayan ejecutado. Después puedes hacer cambios en archivos individuales, que se volverán a ejecutar de forma individual. Si estableces un [`filesToWatch`](/docs/configuration#filestowatch) que apunte a los archivos de tu aplicación, se volverán a ejecutar todas las pruebas cuando se realicen cambios en tu aplicación.

## Depuración

Aunque (todavía) no es posible establecer puntos de interrupción en tu IDE y que el navegador remoto los reconozca, puedes usar el comando [`debug`](/docs/api/browser/debug) para detener la prueba en cualquier punto. Esto te permite abrir DevTools para luego depurar la prueba estableciendo puntos de interrupción en la [pestaña de fuentes](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools).

Cuando se llama al comando `debug`, también obtendrás una interfaz repl de Node.js en tu terminal, que dice:

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

Presiona `Ctrl` o `Command` + `c` o escribe `.exit` para continuar con la prueba.

## Ejecutar usando un Selenium Grid

Si tienes configurado un [Selenium Grid](https://www.selenium.dev/documentation/grid/) y ejecutas tu navegador a través de ese grid, tienes que establecer la opción `host` del browser runner para permitir que el navegador acceda al host correcto donde se sirven los archivos de prueba, p. ej.:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // IP de red de la máquina que ejecuta el proceso de WebdriverIO
        host: 'http://172.168.0.2'
    }]
}
```

Esto garantizará que el navegador abra correctamente la instancia de servidor adecuada alojada en la instancia que ejecuta las pruebas de WebdriverIO.

## Ejemplos

Puedes encontrar varios ejemplos de pruebas de componentes usando frameworks de componentes populares en nuestro [repositorio de ejemplos](https://github.com/webdriverio/component-testing-examples).