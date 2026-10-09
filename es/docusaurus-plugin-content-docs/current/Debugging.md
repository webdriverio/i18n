---
id: debugging
title: Depuración
description: "Depura pruebas de WebdriverIO con browser.debug, puntos de interrupción en VS Code o WebStorm, estrategias para pruebas inestables y perfilado de CPU y heap."
---

La depuración es significativamente más difícil cuando varios procesos generan docenas de pruebas en múltiples navegadores.

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

Para empezar, es extremadamente útil limitar el paralelismo estableciendo `maxInstances` en `1`, y apuntar solo a aquellas especificaciones y navegadores que necesitan ser depurados.

En `wdio.conf`:

```js
export const config = {
    // ...
    maxInstances: 1,
    specs: [
        '**/myspec.spec.js'
    ],
    capabilities: [{
        browserName: 'firefox'
    }],
    // ...
}
```

## El comando Debug

En muchos casos, puedes usar [`browser.debug()`](/docs/api/browser/debug) para pausar tu prueba e inspeccionar el navegador.

Tu interfaz de línea de comandos también cambiará al modo REPL. Este modo te permite experimentar con comandos y elementos en la página. En el modo REPL, puedes acceder al objeto `browser`&mdash;o a las funciones `$` y `$$`&mdash;tal como lo haces en tus pruebas.

Al usar `browser.debug()`, probablemente necesitarás aumentar el tiempo de espera del ejecutor de pruebas para evitar que este marque la prueba como fallida por tardar demasiado. Por ejemplo:

En `wdio.conf`:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

Consulta [timeouts](timeouts) para obtener más información sobre cómo hacerlo usando otros frameworks.

Para continuar con las pruebas después de depurar, en la terminal usa el atajo `^C` o el comando `.exit`.

### Pausa para un agente de programación (`--debug=agent`)

`wdio run --debug=agent` aumenta el tiempo de espera del framework a 24 horas y pausa el worker cuando una especificación llama a `await browser.debug()` o cuando una prueba falla. La ejecución imprime una línea como:

```text
Paused in cart.e2e.ts › adds a blue t-shirt. Inspect with `wdio session -s debug-0-0 snapshot`, continue with `wdio session -s debug-0-0 resume`.
```

Inspecciona el navegador pausado con [`wdio session`](/docs/session/debug) (`snapshot`, `exec`, …), luego usa `wdio session -s debug-0-0 resume` para continuar. `wdio session -s debug-0-0 close` hace fallar la prueba pausada con `Session closed from wdio session`. El nombre de la sesión es `debug-<cid>` (`debug-0-0` para el primer worker). El resto de ese flujo de trabajo se encuentra en la sección [WebdriverIO Session](/docs/session).
## Configuración dinámica

Ten en cuenta que `wdio.conf.js` puede contener Javascript. Como probablemente no quieras cambiar permanentemente tu valor de tiempo de espera a 1 día, a menudo puede ser útil cambiar estas configuraciones desde la línea de comandos usando una variable de entorno.

Usando esta técnica, puedes cambiar la configuración dinámicamente:

```js
const debug = process.env.DEBUG
const defaultCapabilities = ...
const defaultTimeoutInterval = ...
const defaultSpecs = ...

export const config = {
    // ...
    maxInstances: debug ? 1 : 100,
    capabilities: debug ? [{ browserName: 'chrome' }] : defaultCapabilities,
    execArgv: debug ? ['--inspect'] : [],
    jasmineOpts: {
      defaultTimeoutInterval: debug ? (24 * 60 * 60 * 1000) : defaultTimeoutInterval
    }
    // ...
}
```

Luego puedes anteponer al comando `wdio` el indicador `debug`:

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...¡y depurar tu archivo de especificación con las DevTools!

## Depuración con Visual Studio Code (VSCode)

Si quieres depurar tus pruebas con puntos de interrupción en la última versión de VSCode, tienes dos opciones para iniciar el depurador, de las cuales la opción 1 es el método más sencillo:
 1. adjuntar el depurador automáticamente
 2. adjuntar el depurador usando un archivo de configuración

### VSCode Toggle Auto Attach

Puedes adjuntar el depurador automáticamente siguiendo estos pasos en VSCode:
 - Presiona CMD + Shift + P (Linux y Macos) o CTRL + Shift + P (Windows)
 - Escribe "attach" en el campo de entrada
 - Selecciona "Debug: Toggle Auto Attach"
 - Selecciona "Only With Flag"

 ¡Eso es todo! Ahora, cuando ejecutes tus pruebas (recuerda que necesitarás tener el indicador --inspect establecido en tu configuración, como se mostró anteriormente), se iniciará automáticamente el depurador y se detendrá en el primer punto de interrupción que alcance.

### Archivo de configuración de VSCode

Es posible ejecutar todos los archivos de especificación o solo los seleccionados. Las configuraciones de depuración deben agregarse a `.vscode/launch.json`; para depurar la especificación seleccionada, agrega la siguiente configuración:
```
{
    "name": "run select spec",
    "type": "node",
    "request": "launch",
    "args": ["wdio.conf.js", "--spec", "${file}"],
    "cwd": "${workspaceFolder}",
    "autoAttachChildProcesses": true,
    "program": "${workspaceRoot}/node_modules/@wdio/cli/bin/wdio.js",
    "console": "integratedTerminal",
    "skipFiles": [
        "${workspaceFolder}/node_modules/**/*.js",
        "${workspaceFolder}/lib/**/*.js",
        "<node_internals>/**/*.js"
    ]
},
```

Para ejecutar todos los archivos de especificación, elimina `"--spec", "${file}"` de `"args"`

Ejemplo: [.vscode/launch.json](https://github.com/mgrybyk/webdriverio-devtools/blob/master/.vscode/launch.json)

Información adicional: https://code.visualstudio.com/docs/nodejs/nodejs-debugging

## Repl dinámico con Atom

Si eres un hacker de [Atom](https://atom.io/), puedes probar [`wdio-repl`](https://github.com/kurtharriger/wdio-repl) de [@kurtharriger](https://github.com/kurtharriger), que es un repl dinámico que te permite ejecutar líneas de código individuales en Atom. Mira [este](https://www.youtube.com/watch?v=kdM05ChhLQE) video de YouTube para ver una demostración.

## Depuración con WebStorm / Intellij
Puedes crear una configuración de depuración de node.js como esta:
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
Mira este [video de YouTube](https://www.youtube.com/watch?v=Qcqnmle6Wu8) para obtener más información sobre cómo crear una configuración.

## Depuración de pruebas inestables

Las pruebas inestables pueden ser muy difíciles de depurar, así que aquí tienes algunos consejos sobre cómo puedes intentar reproducir localmente ese resultado inestable que obtuviste en tu CI.

### Red
Para depurar inestabilidad relacionada con la red, usa el comando [throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork).
```js
await browser.throttleNetwork('Regular3G')
```

### Velocidad de renderizado
Para depurar inestabilidad relacionada con la velocidad del dispositivo, usa el comando [throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU).
Esto hará que tus páginas se rendericen más lentamente, lo cual puede deberse a muchas cosas, como ejecutar múltiples procesos en tu CI que podrían estar ralentizando tus pruebas.
```js
await browser.throttleCPU(4)
```

### Velocidad de ejecución de pruebas

Si tus pruebas no parecen verse afectadas, es posible que WebdriverIO sea más rápido que la actualización del framework frontend / navegador. Esto sucede al usar aserciones síncronas, ya que WebdriverIO ya no tiene oportunidad de reintentar estas aserciones. Algunos ejemplos de código que pueden fallar por esto:
```js
expect(elementList.length).toEqual(7) // es posible que la lista no esté poblada en el momento de la aserción
expect(await elem.getText()).toEqual('this button was clicked 3 times') // es posible que el texto aún no se haya actualizado en el momento de la aserción, lo que resulta en un error ("this button was clicked 2 times" no coincide con el esperado "this button was clicked 3 times")
expect(await elem.isDisplayed()).toBe(true) // es posible que aún no se muestre
```
Para resolver este problema, se deben usar aserciones asíncronas en su lugar. Los ejemplos anteriores se verían así:
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
Usando estas aserciones, WebdriverIO esperará automáticamente hasta que se cumpla la condición. Al verificar texto, esto significa que el elemento debe existir y el texto debe ser igual al valor esperado.
Hablamos más sobre esto en nuestra [Guía de buenas prácticas](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions).

## Perfilado de rendimiento

WebdriverIO te permite capturar perfiles de rendimiento de tus pruebas para identificar cuellos de botella en la ejecución de tus pruebas o fugas de memoria. Esto utiliza las capacidades nativas de perfilado de Node.js.

### Perfilado de CPU

Para capturar un perfil de CPU, puedes usar el indicador de CLI `--cpu-prof` o establecer `cpuProf: true` en tu configuración.

```bash
npx wdio run wdio.conf.js --cpu-prof
```

Esto generará un archivo `.cpuprofile` en el directorio `./profiles` (por defecto) para cada proceso worker. Puedes cargar este archivo en **Chrome DevTools > Performance > Load Profile** para analizar la ejecución.

### Perfilado de heap

Para capturar un perfil de heap, usa el indicador de CLI `--heap-prof` o establece `heapProf: true` en tu configuración.

```bash
npx wdio run wdio.conf.js --heap-prof
```

Esto genera un archivo `.heapprofile` en el directorio `./profiles` (usa el perfilador de heap por muestreo). Puedes cargarlo en **Chrome DevTools > Memory > Load** para analizar el uso de memoria.

### Métricas de tiempo

Cuando el perfilado está habilitado, WebdriverIO también registra automáticamente métricas de tiempo para las fases de configuración, ejecución y desmontaje de tu prueba, ayudándote a entender en qué se está invirtiendo el tiempo.

```
📊 Performance Metrics:
────────────────────────────────────────
  Setup:     1.25s
  Execution: 3.42s
  Teardown:  0.15s
```