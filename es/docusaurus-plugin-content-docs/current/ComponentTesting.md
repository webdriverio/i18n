---
id: component-testing
title: Pruebas de Componentes
---

Con el [Browser Runner](/docs/runner#browser-runner) de WebdriverIO puedes ejecutar pruebas dentro de un navegador de escritorio o móvil real mientras usas WebdriverIO y el protocolo WebDriver para automatizar e interactuar con lo que se renderiza en la página. Este enfoque tiene [muchas ventajas](/docs/runner#browser-runner) en comparación con otros frameworks de pruebas que solo permiten probar contra [JSDOM](https://www.npmjs.com/package/jsdom).

## ¿Cómo funciona?

El Browser Runner utiliza [Vite](https://vitejs.dev/) para renderizar una página de prueba e inicializar un framework de pruebas para ejecutar tus pruebas en el navegador. Actualmente solo soporta Mocha, pero Jasmine y Cucumber están [en la hoja de ruta](https://github.com/orgs/webdriverio/projects/1). Esto permite probar cualquier tipo de componentes, incluso para proyectos que no utilizan Vite.

El servidor Vite es iniciado por el testrunner de WebdriverIO y configurado para que puedas usar todos los reporteros y servicios como solías hacer para pruebas e2e normales. Además, inicializa una instancia de [`browser`](/docs/api/browser) que te permite acceder a un subconjunto de la [API de WebdriverIO](/docs/api) para interactuar con cualquier elemento en la página. Similar a las pruebas e2e, puedes acceder a esa instancia a través de la variable `browser` adjunta al ámbito global o importándola desde `@wdio/globals` dependiendo de cómo esté configurado [`injectGlobals`](/docs/api/globals).

WebdriverIO tiene soporte integrado para los siguientes frameworks:

- [__Nuxt__](https://nuxt.com/): El testrunner de WebdriverIO detecta una aplicación Nuxt y configura automáticamente los composables de tu proyecto y ayuda a simular el backend de Nuxt, lee más en la [documentación de Nuxt](/docs/component-testing/vue#testing-vue-components-in-nuxt)
- [__TailwindCSS__](https://tailwindcss.com/): El testrunner de WebdriverIO detecta si estás usando TailwindCSS y carga el entorno correctamente en la página de prueba

## Configuración

Para configurar WebdriverIO para pruebas unitarias o de componentes en el navegador, inicia un nuevo proyecto WebdriverIO a través de:

```bash
npm init wdio@latest ./
# o
yarn create wdio ./
```

Una vez que comience el asistente de configuración, elige `browser` para ejecutar pruebas unitarias y de componentes y selecciona uno de los preajustes si lo deseas, de lo contrario, ve con _"Other"_ si solo quieres ejecutar pruebas unitarias básicas. También puedes configurar una configuración personalizada de Vite si ya usas Vite en tu proyecto. Para más información, consulta todas las [opciones del runner](/docs/runner#runner-options).

:::info

__Nota:__ WebdriverIO por defecto ejecutará pruebas de navegador en CI en modo headless, por ejemplo, si una variable de entorno `CI` está configurada como `'1'` o `'true'`. Puedes configurar manualmente este comportamiento usando la opción [`headless`](/docs/runner#headless) para el runner.

:::

Al final de este proceso, deberías encontrar un `wdio.conf.js` que contiene varias configuraciones de WebdriverIO, incluida una propiedad `runner`, por ejemplo:

```ts reference useHTTPS runmeRepository="git@github.com:webdriverio/example-recipes.git" runmeFileToOpen="component-testing%2FREADME.md"
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/wdio.comp.conf.js
```

Al definir diferentes [capabilities](/docs/configuration#capabilities), puedes ejecutar tus pruebas en diferentes navegadores, en paralelo si lo deseas.

Si aún no estás seguro de cómo funciona todo, mira el siguiente tutorial sobre cómo comenzar con las Pruebas de Componentes en WebdriverIO:

<LiteYouTubeEmbed
    id="5vp_3tGtnMc"
    title="Getting Started with Component Testing in WebdriverIO"
/>

## Entorno de Pruebas

Depende totalmente de ti lo que quieras ejecutar en tus pruebas y cómo te guste renderizar los componentes. Sin embargo, recomendamos usar [Testing Library](https://testing-library.com/) como framework de utilidades, ya que proporciona plugins para varios frameworks de componentes, como React, Preact, Svelte y Vue. Es muy útil para renderizar componentes en la página de prueba y limpia automáticamente estos componentes después de cada prueba.

Puedes mezclar primitivas de Testing Library con comandos de WebdriverIO como desees, por ejemplo:

```js reference useHTTPS
https://github.com/webdriverio/example-recipes/blob/fd54f94306ed8e7b40f967739164dfe4d6d76b41/component-testing/svelte-example.js
```

__Nota:__ usar métodos de renderizado de Testing Library ayuda a eliminar los componentes creados entre las pruebas. Si no usas Testing Library, asegúrate de adjuntar tus componentes de prueba a un contenedor que se limpie entre pruebas.

## Scripts de Configuración

Puedes configurar tus pruebas ejecutando scripts arbitrarios en Node.js o en el navegador, por ejemplo, inyectando estilos, simulando APIs del navegador o conectándote a un servicio de terceros. Los [hooks](/docs/configuration#hooks) de WebdriverIO se pueden usar para ejecutar código en Node.js, mientras que [`mochaOpts.require`](/docs/frameworks#require) te permite importar scripts al navegador antes de que se carguen las pruebas, por ejemplo:

```js wdio.conf.js
export const config = {
    // ...
    mochaOpts: {
        ui: 'tdd',
        // proporcionar un script de configuración para ejecutar en el navegador
        require: './__fixtures__/setup.js'
    },
    before: () => {
        // configurar el entorno de prueba en Node.js
    }
    // ...
}
```

Por ejemplo, si quieres simular todas las llamadas [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) en tu prueba con el siguiente script de configuración:

```js ./fixtures/setup.js
import { fn } from '@wdio/browser-runner'

// ejecutar código antes de que se carguen todas las pruebas
window.fetch = fn()

export const mochaGlobalSetup = () => {
    // ejecutar código después de que se carga el archivo de prueba
}

export const mochaGlobalTeardown = () => {
    // ejecutar código después de que se ejecuta el archivo de especificación
}

```

Ahora en tus pruebas puedes proporcionar valores de respuesta personalizados para todas las solicitudes del navegador. Lee más sobre fixtures globales en la [documentación de Mocha](https://mochajs.org/#global-fixtures).

## Observar Archivos de Prueba y Aplicación

Hay múltiples formas de depurar tus pruebas de navegador. La más fácil es iniciar el testrunner de WebdriverIO con la bandera `--watch`, por ejemplo:

```sh
$ npx wdio run ./wdio.conf.js --watch
```

Esto ejecutará todas las pruebas inicialmente y se detendrá una vez que todas se hayan ejecutado. Luego puedes hacer cambios en archivos individuales que se volverán a ejecutar individualmente. Si configuras [`filesToWatch`](/docs/configuration#filestowatch) apuntando a los archivos de tu aplicación, volverá a ejecutar todas las pruebas cuando se realicen cambios en tu aplicación.

## Depuración

Aunque (todavía) no es posible establecer puntos de interrupción en tu IDE y que sean reconocidos por el navegador remoto, puedes usar el comando [`debug`](/docs/api/browser/debug) para detener la prueba en cualquier punto. Esto te permite abrir DevTools para luego depurar la prueba estableciendo puntos de interrupción en la [pestaña de fuentes](https://buddy.works/tutorials/debugging-javascript-efficiently-with-chrome-devtools).

Cuando se llama al comando `debug`, también obtendrás una interfaz repl de Node.js en tu terminal, diciendo:

```
The execution has stopped!
You can now go into the browser or use the command line as REPL
(To exit, press ^C again or type .exit)
```

Presiona `Ctrl` o `Command` + `c` o ingresa `.exit` para continuar con la prueba.

## Ejecutar usando una Selenium Grid

Si tienes configurada una [Selenium Grid](https://www.selenium.dev/documentation/grid/) y ejecutas tu navegador a través de esa grid, debes establecer la opción `host` del browser runner para permitir que el navegador acceda al host correcto donde se están sirviendo los archivos de prueba, por ejemplo:

```ts title=wdio.conf.ts
export const config: WebdriverIO.Config = {
    runner: ['browser', {
        // IP de red de la máquina que ejecuta el proceso WebdriverIO
        host: 'http://172.168.0.2'
    }]
}
```

Esto asegurará que el navegador abra correctamente la instancia del servidor correcta alojada en la instancia que ejecuta las pruebas de WebdriverIO.

## Ejemplos

Puedes encontrar varios ejemplos para probar componentes usando frameworks de componentes populares en nuestro [repositorio de ejemplos](https://github.com/webdriverio/component-testing-examples).